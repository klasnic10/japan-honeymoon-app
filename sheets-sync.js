"use strict";

(() => {
  const config = window.APP_CONFIG || {};
  const TOKEN_SCOPE = "https://www.googleapis.com/auth/drive.file";
  const SELECTED_FILE_KEY = "japon2026.selectedSpreadsheet.v1";
  let accessToken = "";
  let tokenClient = null;
  let selectedSpreadsheetId = localStorage.getItem(SELECTED_FILE_KEY) || "";
  let rowById = new Map();
  let onStatus = () => {};
  let onExpenses = () => {};

  const configured = () => Boolean(config.googleClientId && config.googleApiKey && config.googleAppId && config.spreadsheetId);
  const connected = () => Boolean(accessToken && selectedSpreadsheetId === config.spreadsheetId);
  const status = (state, message) => onStatus({state, message, configured:configured(), connected:connected()});

  function serialToIso(value){
    if(typeof value === "number") return new Date(Date.UTC(1899,11,30) + value * 86400000).toISOString().slice(0,10);
    if(/^\d{4}-\d{2}-\d{2}$/.test(String(value||""))) return String(value);
    const match=String(value||"").match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    return match?`${match[3]}-${match[2].padStart(2,"0")}-${match[1].padStart(2,"0")}`:new Date().toISOString().slice(0,10);
  }
  function isoToSheetDate(value){
    const [year,month,day]=String(value).split("-");
    return `${day}/${month}/${year}`;
  }
  function expenseFromRow(row, index){
    return {
      id:String(row[0]||`sheet-${index+2}`),
      date:serialToIso(row[1]),
      description:String(row[2]||"Sin concepto"),
      category:String(row[3]||"Otros"),
      amount:Number(row[4])||0,
      currency:row[5]==="EUR"?"EUR":"JPY",
      paid:row[6]===true||String(row[6]).toUpperCase()==="TRUE",
      payer:String(row[7]||"Común"),
      method:String(row[8]||"Otro"),
      notes:String(row[9]||""),
      fixed:String(row[10]||"")==="Inicial"
    };
  }
  function rowFromExpense(expense){
    return [
      expense.id,
      isoToSheetDate(expense.date),
      expense.description,
      expense.category,
      Number(expense.amount)||0,
      expense.currency,
      Boolean(expense.paid),
      expense.payer||"Común",
      expense.method||"Otro",
      expense.notes||"",
      expense.fixed?"Inicial":"App",
      new Date().toISOString()
    ];
  }
  async function googleFetch(path, options={}){
    const response=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}${path}`,{
      ...options,
      headers:{authorization:`Bearer ${accessToken}`,"content-type":"application/json",...(options.headers||{})}
    });
    if(response.status===401){accessToken="";status("disconnected","La sesión de Google ha caducado. Conecta de nuevo.");}
    if(!response.ok){const detail=await response.text();throw new Error(`Google Sheets ${response.status}: ${detail}`);}
    return response.status===204?null:response.json();
  }
  async function loadExpenses(){
    if(!connected())return [];
    status("syncing","Leyendo gastos de Google Sheets…");
    const range=encodeURIComponent(`${config.expenseSheetName}!A2:L1000`);
    const data=await googleFetch(`/values/${range}?valueRenderOption=UNFORMATTED_VALUE&dateTimeRenderOption=SERIAL_NUMBER`);
    const rows=data.values||[];
    rowById=new Map();
    const expenses=rows.filter(row=>row.some(value=>value!=="")).map((row,index)=>{
      const expense=expenseFromRow(row,index);
      rowById.set(expense.id,index+2);
      return expense;
    });
    onExpenses(expenses);
    status("connected",`Sincronizado · ${expenses.length} gastos`);
    return expenses;
  }
  async function extendTableTo(rowNumber){
    if(!config.expenseTableId)return;
    await googleFetch(":batchUpdate",{method:"POST",body:JSON.stringify({requests:[{updateTable:{table:{tableId:config.expenseTableId,range:{sheetId:Number(config.expenseSheetId),startRowIndex:0,endRowIndex:rowNumber,startColumnIndex:0,endColumnIndex:12}},fields:"range"}}]})});
  }
  async function upsert(expense){
    if(!connected())return false;
    status("syncing","Guardando en Google Sheets…");
    const values=[rowFromExpense(expense)];
    const existingRow=rowById.get(expense.id);
    if(existingRow){
      const range=encodeURIComponent(`${config.expenseSheetName}!A${existingRow}:L${existingRow}`);
      await googleFetch(`/values/${range}?valueInputOption=USER_ENTERED`,{method:"PUT",body:JSON.stringify({range:`${config.expenseSheetName}!A${existingRow}:L${existingRow}`,majorDimension:"ROWS",values})});
    }else{
      const range=encodeURIComponent(`${config.expenseSheetName}!A:L`);
      const result=await googleFetch(`/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",body:JSON.stringify({majorDimension:"ROWS",values})});
      const rowNumber=Number(result?.updates?.updatedRange?.match(/A(\d+):/)?.[1]);
      if(rowNumber)await extendTableTo(rowNumber);
    }
    await loadExpenses();
    return true;
  }
  async function remove(id){
    if(!connected())return false;
    const rowNumber=rowById.get(id);
    if(!rowNumber)return true;
    status("syncing","Eliminando de Google Sheets…");
    await googleFetch(":batchUpdate",{method:"POST",body:JSON.stringify({requests:[{deleteDimension:{range:{sheetId:Number(config.expenseSheetId),dimension:"ROWS",startIndex:rowNumber-1,endIndex:rowNumber}}}]})});
    await loadExpenses();
    return true;
  }
  function loadPicker(){
    return new Promise((resolve,reject)=>{
      if(!window.gapi)return reject(new Error("Google Picker no está disponible"));
      window.gapi.load("picker",{callback:resolve,onerror:()=>reject(new Error("No se ha podido cargar Google Picker"))});
    });
  }
  async function chooseSpreadsheet(){
    await loadPicker();
    return new Promise((resolve,reject)=>{
      const view=new google.picker.DocsView(google.picker.ViewId.SPREADSHEETS).setIncludeFolders(false).setMode(google.picker.DocsViewMode.LIST);
      const picker=new google.picker.PickerBuilder()
        .setAppId(config.googleAppId)
        .setDeveloperKey(config.googleApiKey)
        .setOAuthToken(accessToken)
        .setOrigin(location.origin)
        .addView(view)
        .setCallback(data=>{
          if(data.action===google.picker.Action.PICKED)return resolve(data.docs[0].id);
          if(data.action===google.picker.Action.CANCEL)return reject(new Error("Selección cancelada"));
        }).build();
      picker.setVisible(true);
    });
  }
  async function connect(){
    if(!configured()){status("setup","Falta configurar Google OAuth para este despliegue.");return false;}
    if(!window.google?.accounts?.oauth2){status("error","No se ha cargado Google Identity Services.");return false;}
    status("connecting","Conectando con Google…");
    const token=await new Promise((resolve,reject)=>{
      tokenClient=tokenClient||google.accounts.oauth2.initTokenClient({client_id:config.googleClientId,scope:TOKEN_SCOPE,callback:response=>response.error?reject(new Error(response.error)):resolve(response.access_token)});
      tokenClient.callback=response=>response.error?reject(new Error(response.error)):resolve(response.access_token);
      tokenClient.requestAccessToken({prompt:"consent"});
    });
    accessToken=token;
    if(selectedSpreadsheetId===config.spreadsheetId){
      try{await loadExpenses();return true;}
      catch{status("connecting","Selecciona de nuevo la hoja compartida.");}
    }
    const pickedId=await chooseSpreadsheet();
    if(pickedId!==config.spreadsheetId){accessToken="";status("error","Selecciona la hoja “Viaje Japón 2026”.");return false;}
    selectedSpreadsheetId=pickedId;
    localStorage.setItem(SELECTED_FILE_KEY,pickedId);
    await loadExpenses();
    return true;
  }
  function init(callbacks={}){
    onStatus=callbacks.onStatus||onStatus;
    onExpenses=callbacks.onExpenses||onExpenses;
    status(configured()?"disconnected":"setup",configured()?"Conecta Google para sincronizar los gastos.":"Google OAuth todavía no está configurado.");
  }
  window.sheetExpenseStore={init,connect,loadExpenses,upsert,remove,isConnected:connected,isConfigured:configured};
})();
