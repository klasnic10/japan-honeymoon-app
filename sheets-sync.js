"use strict";

(() => {
  const config = window.APP_CONFIG || {};
  const TOKEN_SCOPE = "https://www.googleapis.com/auth/drive.file";
  const SELECTED_FILE_KEY = "japon2026.selectedSpreadsheet.v1";
  let accessToken = "";
  let tokenClient = null;
  let selectedSpreadsheetId = localStorage.getItem(SELECTED_FILE_KEY) || "";
  let expenseRowById = new Map();
  let checklistRowById = new Map();
  let noteRowById = new Map();
  let onStatus = () => {};
  let onExpenses = () => {};
  let onGuideData = () => {};

  const configured = () => Boolean(config.googleClientId && config.googleApiKey && config.googleAppId && config.spreadsheetId);
  const connected = () => Boolean(accessToken && selectedSpreadsheetId === config.spreadsheetId);
  const standalone = () => window.matchMedia?.("(display-mode: standalone)").matches || navigator.standalone === true;
  const embeddedBrowser = () => /(?:FBAN|FBAV|Instagram|Line\/|; wv\)|GSA\/)/i.test(navigator.userAgent||"");
  const needsBrowser = () => standalone() || embeddedBrowser();
  const status = (state, message) => onStatus({state, message, configured:configured(), connected:connected()});
  const truthy = value => value === true || String(value).toUpperCase() === "TRUE";

  function serialToIso(value){
    if(typeof value === "number") return new Date(Date.UTC(1899,11,30) + value * 86400000).toISOString().slice(0,10);
    if(/^\d{4}-\d{2}-\d{2}$/.test(String(value||""))) return String(value);
    const match=String(value||"").match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    return match?`${match[3]}-${match[2].padStart(2,"0")}-${match[1].padStart(2,"0")}`:"";
  }
  function isoToSheetDate(value){
    const [year,month,day]=String(value).split("-");
    return year&&month&&day?`${day}/${month}/${year}`:"";
  }
  function expenseFromRow(row, index){
    return {id:String(row[0]||`sheet-${index+2}`),date:serialToIso(row[1])||new Date().toISOString().slice(0,10),description:String(row[2]||"Sin concepto"),category:String(row[3]||"Otros"),amount:Number(row[4])||0,currency:row[5]==="EUR"?"EUR":"JPY",paid:truthy(row[6]),payer:String(row[7]||"Común"),method:String(row[8]||"Otro"),notes:String(row[9]||""),fixed:String(row[10]||"")==="Inicial"};
  }
  function rowFromExpense(expense){
    return [expense.id,isoToSheetDate(expense.date),expense.description,expense.category,Number(expense.amount)||0,expense.currency,Boolean(expense.paid),expense.payer||"Común",expense.method||"Otro",expense.notes||"",expense.fixed?"Inicial":"App",new Date().toISOString()];
  }
  async function googleFetch(path, options={}){
    const response=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}${path}`,{...options,headers:{authorization:`Bearer ${accessToken}`,"content-type":"application/json",...(options.headers||{})}});
    if(response.status===401){accessToken="";status("disconnected","La sesión de Google ha caducado. Conecta de nuevo.");}
    if(!response.ok){const detail=await response.text();throw new Error(`Google Sheets ${response.status}: ${detail}`);}
    return response.status===204?null:response.json();
  }
  async function readRange(sheetRange){
    const range=encodeURIComponent(sheetRange);
    const data=await googleFetch(`/values/${range}?valueRenderOption=UNFORMATTED_VALUE&dateTimeRenderOption=SERIAL_NUMBER`);
    return data.values||[];
  }
  async function loadExpenses(){
    if(!connected())return [];
    status("syncing","Leyendo Google Sheets…");
    const rows=await readRange(`${config.expenseSheetName}!A2:L1000`);
    expenseRowById=new Map();
    const expenses=rows.filter(row=>row.some(value=>value!=="")).map((row,index)=>{const expense=expenseFromRow(row,index);expenseRowById.set(expense.id,index+2);return expense;});
    onExpenses(expenses);
    status("connected",`Sincronizado · ${expenses.length} gastos`);
    return expenses;
  }
  async function loadGuideData(){
    if(!connected())return null;
    status("syncing","Cargando rutas y guía…");
    const ranges=["Rutas!A2:O250","'Detalle del viaje'!A2:N150",`${config.placeGuideSheetName||"Lugares"}!A2:P250`,`${config.recommendationSheetName||"Recomendaciones"}!A2:J500`,"'Guía práctica'!A2:J250","Checklist!A2:G250","Notas!A2:F500"];
    const query=ranges.map(range=>`ranges=${encodeURIComponent(range)}`).join("&");
    const data=await googleFetch(`/values:batchGet?${query}&valueRenderOption=UNFORMATTED_VALUE&dateTimeRenderOption=SERIAL_NUMBER`);
    const [routeRows=[],detailRows=[],placeGuideRows=[],recommendationRows=[],practicalRows=[],checklistRows=[],noteRows=[]]=(data.valueRanges||[]).map(item=>item.values||[]);
    const routes=routeRows.filter(row=>row[0]).map(row=>({id:String(row[0]),date:serialToIso(row[1]),order:Number(row[2])||0,slot:String(row[3]||""),origin:String(row[4]||""),destination:String(row[5]||""),type:String(row[6]||""),instruction:String(row[7]||""),line:String(row[8]||""),stops:String(row[9]||""),duration:String(row[10]||""),map:String(row[11]||""),status:String(row[12]||"Orientativo"),notes:String(row[13]||""),source:String(row[14]||"")}));
    const places=detailRows.filter(row=>serialToIso(row[0])).map((row,index)=>({id:`place-${index+2}`,date:serialToIso(row[0]),day:String(row[1]||""),slot:String(row[2]||""),time:String(row[3]||""),zone:String(row[4]||""),title:String(row[5]||""),description:String(row[6]||""),food:String(row[7]||""),transport:String(row[8]||""),duration:String(row[9]||""),priority:String(row[10]||""),reservation:String(row[11]||""),tips:String(row[12]||""),source:String(row[13]||"")}));
    const placeGuides=placeGuideRows.filter(row=>row[0]).map(row=>({id:String(row[0]),date:serialToIso(row[1]),title:String(row[2]||""),neighborhood:String(row[3]||""),city:String(row[4]||""),summary:String(row[5]||""),history:String(row[6]||""),highlights:String(row[7]||""),route:String(row[8]||""),tips:String(row[9]||""),duration:String(row[10]||""),rainPlan:String(row[11]||""),map:String(row[12]||""),source:String(row[13]||""),verified:String(row[14]||""),arrivalRouteId:String(row[15]||"")}));
    const recommendations=recommendationRows.filter(row=>row[0]).map(row=>({id:String(row[0]),placeId:String(row[1]||""),type:String(row[2]||""),name:String(row[3]||""),reason:String(row[4]||""),area:String(row[5]||""),price:String(row[6]||""),map:String(row[7]||""),source:String(row[8]||""),verified:String(row[9]||"")}));
    const practical=practicalRows.filter(row=>row[0]).map(row=>({id:String(row[0]),type:String(row[1]||""),context:String(row[2]||""),title:String(row[3]||""),content:String(row[4]||""),detail:String(row[5]||""),japanese:String(row[6]||""),pronunciation:String(row[7]||""),link:String(row[8]||""),source:String(row[9]||"")}));
    checklistRowById=new Map();
    const checklist=checklistRows.filter(row=>row[0]).map((row,index)=>{const item={id:String(row[0]),phase:String(row[1]||""),category:String(row[2]||""),task:String(row[3]||""),owner:String(row[4]||"Común"),done:truthy(row[5]),notes:String(row[6]||"")};checklistRowById.set(item.id,index+2);return item;});
    noteRowById=new Map();
    const notes=noteRows.filter(row=>row[0]).map((row,index)=>{const item={id:String(row[0]),date:serialToIso(row[1]),place:String(row[2]||""),text:String(row[3]||""),author:String(row[4]||""),updated:String(row[5]||"")};noteRowById.set(item.id,index+2);return item;});
    const guideData={routes,places,placeGuides,recommendations,practical,checklist,notes,loadedAt:new Date().toISOString()};
    onGuideData(guideData);
    status("connected",`Guía sincronizada · ${routes.length} trayectos`);
    return guideData;
  }
  async function loadAll(){await loadExpenses();return loadGuideData();}
  async function updateTableRange(tableId,sheetId,rowNumber,columnCount){
    if(!tableId)return;
    await googleFetch(":batchUpdate",{method:"POST",body:JSON.stringify({requests:[{updateTable:{table:{tableId,range:{sheetId:Number(sheetId),startRowIndex:0,endRowIndex:rowNumber,startColumnIndex:0,endColumnIndex:columnCount}},fields:"range"}}]})});
  }
  async function upsert(expense){
    if(!connected())return false;
    status("syncing","Guardando gasto en Google Sheets…");
    const values=[rowFromExpense(expense)],existingRow=expenseRowById.get(expense.id);
    if(existingRow){
      const range=encodeURIComponent(`${config.expenseSheetName}!A${existingRow}:L${existingRow}`);
      await googleFetch(`/values/${range}?valueInputOption=USER_ENTERED`,{method:"PUT",body:JSON.stringify({majorDimension:"ROWS",values})});
    }else{
      const range=encodeURIComponent(`${config.expenseSheetName}!A:L`);
      const result=await googleFetch(`/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",body:JSON.stringify({majorDimension:"ROWS",values})});
      const rowNumber=Number(result?.updates?.updatedRange?.match(/A(\d+):/)?.[1]);
      if(rowNumber)await updateTableRange(config.expenseTableId,config.expenseSheetId,rowNumber,12);
    }
    await loadExpenses();return true;
  }
  async function remove(id){
    if(!connected())return false;
    const rowNumber=expenseRowById.get(id);if(!rowNumber)return true;
    status("syncing","Eliminando de Google Sheets…");
    await googleFetch(":batchUpdate",{method:"POST",body:JSON.stringify({requests:[{deleteDimension:{range:{sheetId:Number(config.expenseSheetId),dimension:"ROWS",startIndex:rowNumber-1,endIndex:rowNumber}}}]})});
    await loadExpenses();return true;
  }
  async function setChecklist(id, done){
    if(!connected())throw new Error("Conecta Google para actualizar el checklist.");
    const row=checklistRowById.get(id);if(!row)throw new Error("No se ha encontrado la tarea.");
    const range=encodeURIComponent(`Checklist!F${row}`);
    await googleFetch(`/values/${range}?valueInputOption=USER_ENTERED`,{method:"PUT",body:JSON.stringify({values:[[Boolean(done)]],majorDimension:"ROWS"})});
    return loadGuideData();
  }
  async function addNote(note){
    if(!connected())throw new Error("Conecta Google para compartir la nota.");
    const values=[[note.id,isoToSheetDate(note.date),note.place,note.text,note.author,new Date().toISOString()]];
    const range=encodeURIComponent("Notas!A:F");
    const result=await googleFetch(`/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",body:JSON.stringify({majorDimension:"ROWS",values})});
    const rowNumber=Number(result?.updates?.updatedRange?.match(/A(\d+):/)?.[1]);
    if(rowNumber)await updateTableRange(config.notesTableId,config.notesSheetId,rowNumber,6);
    return loadGuideData();
  }
  async function removeNote(id){
    if(!connected())throw new Error("Conecta Google para eliminar la nota.");
    const row=noteRowById.get(id);if(!row)return;
    await googleFetch(":batchUpdate",{method:"POST",body:JSON.stringify({requests:[{deleteDimension:{range:{sheetId:Number(config.notesSheetId),dimension:"ROWS",startIndex:row-1,endIndex:row}}}]})});
    return loadGuideData();
  }
  function loadPicker(){return new Promise((resolve,reject)=>{if(!window.gapi)return reject(new Error("Google Picker no está disponible"));window.gapi.load("picker",{callback:resolve,onerror:()=>reject(new Error("No se ha podido cargar Google Picker"))});});}
  async function chooseSpreadsheet(){
    await loadPicker();
    return new Promise((resolve,reject)=>{const view=new google.picker.DocsView(google.picker.ViewId.SPREADSHEETS).setIncludeFolders(false).setMode(google.picker.DocsViewMode.LIST);new google.picker.PickerBuilder().setAppId(config.googleAppId).setDeveloperKey(config.googleApiKey).setOAuthToken(accessToken).setOrigin(location.origin).addView(view).setCallback(data=>{if(data.action===google.picker.Action.PICKED)return resolve(data.docs[0].id);if(data.action===google.picker.Action.CANCEL)return reject(new Error("Selección cancelada"));}).build().setVisible(true);});
  }
  async function connect(){
    if(!configured()){status("setup","Falta configurar Google OAuth para este despliegue.");return false;}
    if(!window.google?.accounts?.oauth2){status("error","No se ha cargado Google Identity Services.");return false;}
    if(needsBrowser()){
      const error=new Error("Abre la app directamente en Safari o Chrome para conectar Google; la ventana instalada o integrada no puede devolver la autorización.");
      error.state="browser";status("browser",error.message);throw error;
    }
    status("connecting","Conectando con Google…");
    accessToken=await new Promise((resolve,reject)=>{
      let settled=false;
      const finish=(fn,value)=>{if(settled)return;settled=true;clearTimeout(timer);fn(value);};
      const callback=response=>{
        if(response.error)return finish(reject,new Error(`Google no ha autorizado el acceso: ${response.error}`));
        if(!response.access_token)return finish(reject,new Error("Google no ha devuelto un token de acceso."));
        finish(resolve,response.access_token);
      };
      const errorCallback=detail=>{
        const messages={popup_failed_to_open:"El navegador ha bloqueado la ventana de Google.",popup_closed:"La ventana de Google se cerró antes de devolver la autorización."};
        const error=new Error(messages[detail?.type]||"No se ha podido completar la ventana de autorización de Google.");
        error.state="browser";finish(reject,error);
      };
      const timer=setTimeout(()=>{const error=new Error("Google no ha podido devolver la autorización a esta pestaña. Ábrela directamente en Safari o Chrome.");error.state="browser";finish(reject,error);},60000);
      tokenClient=google.accounts.oauth2.initTokenClient({client_id:config.googleClientId,scope:TOKEN_SCOPE,callback,error_callback:errorCallback});
      tokenClient.requestAccessToken({prompt:"select_account"});
    });
    status("connecting","Cuenta autorizada · comprobando la hoja compartida…");
    selectedSpreadsheetId=config.spreadsheetId;
    try{
      await loadAll();
      localStorage.setItem(SELECTED_FILE_KEY,config.spreadsheetId);
      return true;
    }catch(error){
      if(!/Google Sheets 403/.test(error.message||""))throw error;
      selectedSpreadsheetId="";
      status("connecting","Google necesita que selecciones la hoja una vez.");
    }
    const pickedId=await chooseSpreadsheet();
    if(pickedId!==config.spreadsheetId){accessToken="";status("error","Selecciona la hoja “Viaje Japón 2026”.");return false;}
    selectedSpreadsheetId=pickedId;localStorage.setItem(SELECTED_FILE_KEY,pickedId);await loadAll();return true;
  }
  function init(callbacks={}){onStatus=callbacks.onStatus||onStatus;onExpenses=callbacks.onExpenses||onExpenses;onGuideData=callbacks.onGuideData||onGuideData;status(configured()?"disconnected":"setup",configured()?"Conecta Google para sincronizar gastos, rutas y guía.":"Google OAuth todavía no está configurado.");}
  window.sheetExpenseStore={init,connect,loadAll,loadExpenses,loadGuideData,upsert,remove,setChecklist,addNote,removeNote,isConnected:connected,isConfigured:configured,needsBrowser};
})();
