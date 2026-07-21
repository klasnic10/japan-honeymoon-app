"use strict";

const TRIP_START = new Date("2026-11-02T00:00:00+01:00");
const TRIP_END = new Date("2026-11-21T23:59:00+01:00");
const STORAGE_KEY = "japon2026.expenses.v1";
const RATE_KEY = "japon2026.exchangeRate.v1";
const RATE_DATE_KEY = "japon2026.exchangeRateDate.v1";
const DISPLAY_CURRENCY_KEY = "japon2026.displayCurrency.v1";
const PENDING_SYNC_KEY = "japon2026.pendingSheetSync.v1";
const GUIDE_KEY = "japon2026.guideData.v1";
const TODAY_PREVIEW_KEY = "japon2026.todayPreview.v1";
const RATE_ENDPOINT = "https://api.frankfurter.dev/v2/rate/EUR/JPY?providers=ECB";

const gmail = id => `https://mail.google.com/mail/#all/${id}`;
const mapsSearch = query => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
const mapsNavigate = (destination, mode = "transit") => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=${mode}`;

const {days, bookings: seedBookings, seedExpenses} = window.TRIP_DATA;

const categories = {
  "Vuelos":"✈️", "Alojamiento":"🏨", "Tren y bus":"🚄", "Taxi":"🚕", "Restaurantes":"🍜",
  "Entradas":"🎟️", "Compras":"🛍️", "Otros":"•"
};

let expenses = loadExpenses();
let routeFilter = "Todos";
let bookingFilter = "all";
let expenseCategoryFilter = "all";
let expenseStatusFilter = "all";
let expenseDisplayCurrency = localStorage.getItem(DISPLAY_CURRENCY_KEY)==="JPY"?"JPY":"EUR";
let guideData = loadGuideData();
let routeMode = "days";
let guideTab = "Frase";
let deferredInstallPrompt = null;
let selectedPlaceId = "";
let todayPlanMode = "normal";
let todayWeather = null;
let weatherRequestKey = "";
let todayPreviewDate = localStorage.getItem(TODAY_PREVIEW_KEY)||"";
let converterSource = "EUR";

function emptyGuideData(){return {routes:[],places:[],placeGuides:[],recommendations:[],practical:[],checklist:[],notes:[],bookings:[],luggage:[]};}

function loadExpenses(){
  try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); return Array.isArray(saved) ? saved : structuredClone(seedExpenses); }
  catch { return structuredClone(seedExpenses); }
}
function loadGuideData(){try{const saved=JSON.parse(localStorage.getItem(GUIDE_KEY));return saved&&Array.isArray(saved.routes)?{...emptyGuideData(),...saved}:emptyGuideData();}catch{return emptyGuideData();}}
function saveGuideData(data){guideData={...emptyGuideData(),...data};localStorage.setItem(GUIDE_KEY,JSON.stringify(guideData));renderHome();renderRoute();renderBookings();renderGuide();openPlaceFromHash();}
function saveExpenses(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses)); renderExpenses(); renderHome(); }
function loadPendingSync(){try{const value=JSON.parse(localStorage.getItem(PENDING_SYNC_KEY));return Array.isArray(value)?value:[];}catch{return [];}}
function queueSheetSync(operation){
  const pending=loadPendingSync().filter(item=>item.id!==operation.id);
  pending.push(operation);localStorage.setItem(PENDING_SYNC_KEY,JSON.stringify(pending));
}
function mergePendingSync(remoteExpenses){
  const merged=new Map(remoteExpenses.map(expense=>[expense.id,expense]));
  loadPendingSync().forEach(operation=>operation.type==="delete"?merged.delete(operation.id):merged.set(operation.id,operation.expense));
  return [...merged.values()];
}
async function flushPendingSync(){
  if(!window.sheetExpenseStore?.isConnected())return;
  let pending=loadPendingSync();
  for(const operation of [...pending]){
    if(operation.type==="delete")await window.sheetExpenseStore.remove(operation.id);
    else await window.sheetExpenseStore.upsert(operation.expense);
    pending=pending.filter(item=>item.id!==operation.id);
    localStorage.setItem(PENDING_SYNC_KEY,JSON.stringify(pending));
  }
  await window.sheetExpenseStore.loadExpenses();
}
function fmtDate(iso, options={day:"numeric",month:"short"}){ return new Intl.DateTimeFormat("es-ES",options).format(new Date(`${iso}T12:00:00`)); }
function fmtMoney(amount,currency){ return new Intl.NumberFormat("es-ES",{style:"currency",currency,maximumFractionDigits:currency==="JPY"?0:2}).format(amount); }
function escapeHtml(value=""){ return String(value).replace(/[&<>'"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch])); }
function safeUrl(value){try{const url=new URL(String(value));return ["http:","https:"].includes(url.protocol)?url.href:"";}catch{return "";}}
function statusLabel(status){const value=normalized(status);if(value.includes("confirm"))return "Confirmada";if(value.includes("pagad"))return "Pagada";if(value.includes("disfrut"))return "Disfrutada";return status||"Pendiente";}
function normalized(value=""){return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();}
function richGuideFor(place){return (guideData.placeGuides||[]).find(item=>item.date===place.date&&normalized(item.title)===normalized(place.title));}
function recommendationsFor(guideId){return (guideData.recommendations||[]).filter(item=>item.placeId===guideId);}
function detailTextMarkup(value){
  const parts=String(value||"").split(/\n+/).map(item=>item.replace(/^\s*[•*-]\s*/,"").trim()).filter(Boolean);
  if(!parts.length)return "";
  return parts.length===1?`<p>${escapeHtml(parts[0])}</p>`:`<ul>${parts.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function navigate(view){
  document.querySelectorAll(".view").forEach(section=>section.classList.toggle("active",section.dataset.view===view));
  document.querySelectorAll(".bottom-nav [data-nav]").forEach(button=>button.classList.toggle("active",button.dataset.nav===view));
  window.scrollTo({top:0,behavior:"smooth"}); document.getElementById("mainContent").focus({preventScroll:true});
}

function appToday(){return todayPreviewDate||japanToday();}

function activeBookings(){
  if((guideData.bookings||[]).length)return guideData.bookings;
  return seedBookings.map(item=>({id:item.id,kind:item.kind,title:item.title,detail:item.subtitle,startDate:"",endDate:"",origin:item.from,destination:item.to,status:item.status,payment:item.detail,time:item.dates,link:item.emailId?gmail(item.emailId):item.url||"",map:item.map||"",alternative:"",notes:item.detail}));
}
function bookingIsPending(booking){const state=normalized(booking.status);return !state.includes("confirm")&&!state.includes("pagad")&&!state.includes("disfrut");}
function bookingGroup(kind){const value=normalized(kind);if(value.includes("vuelo")||value==="flight")return "flight";if(value.includes("hotel")||value.includes("aloj")||value==="hotel")return "hotel";if(value.includes("entrada")||value==="entry")return "entry";if(value.includes("rest"))return "restaurant";return "transport";}
function bookingIcon(kind){return {flight:"✈️",hotel:"🏨",transport:"🚄",entry:"🎟️",restaurant:"🍜"}[bookingGroup(kind)]||"▣";}
function dateDistance(fromIso,toIso){return Math.round((new Date(`${toIso}T12:00:00Z`)-new Date(`${fromIso}T12:00:00Z`))/86400000);}
function sortedAlerts(todayIso){
  const alerts=[];
  (guideData.checklist||[]).filter(item=>!item.done&&item.dueDate).forEach(item=>alerts.push({date:item.dueDate,title:item.task,meta:[item.priority,item.owner].filter(Boolean).join(" · "),target:"checklist"}));
  activeBookings().filter(bookingIsPending).forEach(item=>{
    if(item.saleOpen)alerts.push({date:item.saleOpen,title:`Abre la reserva: ${item.title}`,meta:item.time||item.detail,target:"bookings"});
    if(item.cancellation)alerts.push({date:item.cancellation,title:`Fin de cancelación: ${item.title}`,meta:"Revisar antes de esta fecha",target:"bookings"});
  });
  return alerts.filter(item=>item.date>=todayIso).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,5);
}
function weatherLabel(code){if(code===0)return ["☀️","Despejado"];if(code<=3)return ["🌤️","Parcialmente nuboso"];if(code<=48)return ["🌫️","Niebla"];if(code<=67)return ["🌧️","Lluvia"];if(code<=77)return ["🌨️","Nieve"];if(code<=82)return ["🌦️","Chubascos"];return ["⛈️","Tormentas"];}
const weatherCities={"Tokio":[35.6762,139.6503],"Kanazawa":[36.5613,136.6562],"Takayama":[36.1461,137.2522],"Okuhida":[36.191,137.553],"Kioto":[35.0116,135.7681]};
async function loadTodayWeather(day,todayIso){
  const coords=weatherCities[day?.city],distance=day?dateDistance(todayIso,day.date):999;
  if(!coords||distance<0||distance>15)return;
  const key=`${day.date}-${day.city}`;if(weatherRequestKey===key)return;weatherRequestKey=key;
  try{
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=16`;
    const response=await fetch(url);if(!response.ok)throw new Error();const data=await response.json(),index=data.daily?.time?.indexOf(day.date);
    if(index>=0)todayWeather={key,code:data.daily.weather_code[index],max:data.daily.temperature_2m_max[index],min:data.daily.temperature_2m_min[index],rain:data.daily.precipitation_probability_max[index]};
  }catch{todayWeather={key,error:true};}
  renderHome();
}
function weatherMarkup(day,todayIso){
  if(!day||!weatherCities[day.city])return "";
  const distance=dateDistance(todayIso,day.date),key=`${day.date}-${day.city}`;
  if(distance>15)return `<div class="today-weather muted"><span>☁️</span><div><strong>Previsión todavía no disponible</strong><small>Aparecerá 16 días antes.</small></div></div>`;
  if(todayWeather?.key===key&&!todayWeather.error){const [icon,label]=weatherLabel(todayWeather.code);return `<div class="today-weather"><span>${icon}</span><div><strong>${label} · ${todayWeather.min}–${todayWeather.max} °C</strong><small>${todayWeather.rain}% de probabilidad de lluvia</small></div></div>`;}
  if(todayWeather?.key===key&&todayWeather.error)return `<div class="today-weather muted"><span>☁️</span><div><strong>Previsión no disponible</strong><small>Se conserva el resto del día para consultarlo sin conexión.</small></div></div>`;
  return `<div class="today-weather muted"><span>☁️</span><div><strong>Consultando previsión…</strong><small>Se actualizará con datos del día.</small></div></div>`;
}
function todayPlanMarkup(day){
  if(!day)return "";
  const places=(guideData.places||[]).filter(item=>item.date===day.date),legs=(guideData.routes||[]).filter(item=>item.date===day.date).sort((a,b)=>a.order-b.order);
  if(todayPlanMode==="rain"){
    const rain=places.map(place=>({place,guide:richGuideFor(place)})).filter(item=>item.guide?.rainPlan);
    return rain.length?rain.map(item=>`<button class="today-step" type="button" data-place-id="${escapeHtml(item.place.id)}"><span>☔</span><div><strong>${escapeHtml(item.place.title)}</strong><small>${escapeHtml(item.guide.rainPlan)}</small></div><b>›</b></button>`).join(""):`<div class="today-empty">No hay un plan de lluvia específico para este día. Conservad las visitas interiores y reducid los paseos largos.</div>`;
  }
  const selected=todayPlanMode==="light"?(places.filter(place=>/imprescindible|muy recomendable/i.test(place.priority)).slice(0,3).length?places.filter(place=>/imprescindible|muy recomendable/i.test(place.priority)).slice(0,3):places.slice(0,2)):places;
  if(selected.length)return selected.map(place=>placeMarkup(place)).join("");
  const slots=todayPlanMode==="light"?day.slots.slice(0,2):day.slots;
  return slots.map(slot=>`<article class="today-step"><span>•</span><div><strong>${escapeHtml(slot.title)}</strong><small>${escapeHtml([slot.time,slot.desc].filter(Boolean).join(" · "))}</small></div></article>`).join("")+(legs[0]?`<a class="today-route-link" href="${safeUrl(legs[0].map)}" target="_blank" rel="noreferrer">Abrir el primer trayecto</a>`:"");
}
function renderHome(){
  const now = new Date(),realTodayIso=japanToday(),todayIso=appToday(); const countdown = document.getElementById("countdown");
  if(todayPreviewDate)countdown.textContent=`Vista simulada del ${fmtDate(todayIso,{weekday:"long",day:"numeric",month:"long"})}.`;
  else if(now < TRIP_START){ const daysLeft=Math.ceil((TRIP_START-now)/86400000); countdown.textContent=`Faltan ${daysLeft} días para despegar hacia Tokio.`; }
  else if(now <= TRIP_END) countdown.textContent="Ya estáis en Japón. Aquí tenéis lo siguiente, sin rebuscar.";
  else countdown.textContent="El viaje terminó, pero la ruta y los gastos siguen aquí.";

  const tripDay = days.find(day=>day.date===todayIso);
  const previewDay=tripDay||(todayIso<days[0].date?days[0]:null),displayDay=tripDay||previewDay;
  const card=document.getElementById("todayCard");
  if(tripDay){const todayBooking=activeBookings().find(item=>item.startDate===tripDay.date);card.innerHTML=`<p class="eyebrow">${todayPreviewDate?"Día simulado":"Hoy"} · ${escapeHtml(fmtDate(tripDay.date,{weekday:"long",day:"numeric",month:"long"}))}</p><h2>${escapeHtml(tripDay.title)}</h2><p>${escapeHtml(tripDay.slots[0]?.title||"")} · ${escapeHtml(tripDay.slots[0]?.time||"")}</p>${weatherMarkup(tripDay,realTodayIso)}<div class="today-meta"><span class="chip">📍 ${escapeHtml(tripDay.city)}</span><span class="chip">🛏️ ${escapeHtml(tripDay.sleep)}</span><span class="chip">${navigator.onLine?"● Online":"○ Copia offline"}</span></div><div class="action-row"><button class="primary-button" data-nav="route">Ver ruta completa</button>${todayBooking?`<button class="secondary-button" data-nav="bookings">Ver reserva</button>`:""}<a class="secondary-button" href="${mapsSearch(tripDay.map)}" target="_blank" rel="noreferrer">Mapa</a></div>`;}
  else if(now < TRIP_START){const alerts=sortedAlerts(todayIso),next=alerts[0];card.innerHTML=`<p class="eyebrow">Próximo paso</p><h2>${escapeHtml(next?.title||"Preparar el viaje")}</h2><p>${next?`${fmtDate(next.date,{day:"numeric",month:"long"})}${next.meta?` · ${escapeHtml(next.meta)}`:""}`:"Conecta Google para cargar reservas y tareas compartidas."}</p><div class="today-meta"><span class="chip pending">${alerts.length} avisos próximos</span><span class="chip">${(guideData.checklist||[]).filter(item=>item.done).length}/${(guideData.checklist||[]).length} tareas</span></div><div class="action-row"><button class="primary-button" data-open-target="${next?.target||"checklist"}">Abrir pendiente</button><button class="secondary-button" data-nav="bookings">Reservas</button></div>`;}
  else card.innerHTML=`<p class="eyebrow">Recuerdo del viaje</p><h2>Japón, del 2 al 21 de noviembre</h2><p>Podéis consultar la ruta, cerrar el presupuesto y exportar todos los gastos.</p><div class="action-row"><button class="primary-button" data-nav="expenses">Ver gastos</button></div>`;

  const alerts=sortedAlerts(todayIso);
  document.getElementById("pendingList").innerHTML=alerts.length?alerts.map(item=>`<button class="pending-item" type="button" data-open-target="${item.target}"><span class="status-dot"></span><div><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(fmtDate(item.date,{day:"numeric",month:"long"}))}${item.meta?` · ${escapeHtml(item.meta)}`:""}</small></div><b>›</b></button>`).join(""):`<div class="panel empty">${guideData.loadedAt?"No hay avisos próximos.":"Conecta Google para cargar los avisos compartidos."}</div>`;
  const planSection=document.getElementById("todayPlanSection");planSection.classList.toggle("hidden",!displayDay);
  if(displayDay){document.querySelectorAll("[data-today-plan]").forEach(button=>button.classList.toggle("active",button.dataset.todayPlan===todayPlanMode));document.getElementById("todayPlanTitle").textContent=tripDay?"Plan de hoy":`Vista previa · ${fmtDate(displayDay.date,{day:"numeric",month:"long"})}`;document.getElementById("todayPlan").innerHTML=todayPlanMarkup(displayDay);loadTodayWeather(displayDay,realTodayIso);}
  const tasks=(guideData.checklist||[]).filter(item=>!item.done&&(tripDay?(item.dueDate===todayIso||normalized(item.phase).includes("cada dia")):true)).sort((a,b)=>(a.dueDate||"9999").localeCompare(b.dueDate||"9999")).slice(0,5);
  document.getElementById("todayTasks").innerHTML=tasks.length?tasks.map(item=>`<label class="check-item compact"><input type="checkbox" data-checklist-id="${escapeHtml(item.id)}"><span><strong>${escapeHtml(item.task)}</strong><small>${escapeHtml([item.dueDate?fmtDate(item.dueDate):"",item.priority,item.owner].filter(Boolean).join(" · "))}</small></span></label>`).join(""):`<div class="panel empty">No hay tareas inmediatas.</div>`;
  const totals = expenses.reduce((a,e)=>(a[e.currency]+=Number(e.amount)||0,a),{EUR:0,JPY:0});
  const rate=Number(document.getElementById("exchangeRate").value)||Number(localStorage.getItem(RATE_KEY))||0;
  document.getElementById("expenseQuickSummary").textContent=rate?`${fmtMoney(totals.EUR+totals.JPY/rate,"EUR")} en total`:`${fmtMoney(totals.EUR,"EUR")} · falta cambio`;
}

function routeLegMarkup(leg){
  const icons={"A pie":"🚶","Metro":"Ⓜ️","Tren":"🚆","Bus":"🚌","Taxi":"🚕"};
  const map=safeUrl(leg.map),source=safeUrl(leg.source);
  return `<article class="route-leg"><div class="route-leg-icon">${icons[leg.type]||"➜"}</div><div class="route-leg-copy"><div class="route-leg-head"><strong>${escapeHtml(leg.origin)} → ${escapeHtml(leg.destination)}</strong><span class="chip ${leg.status==="Validado"?"confirmed":"pending"}">${escapeHtml(leg.status)}</span></div><p>${escapeHtml(leg.instruction)}</p>${leg.line?`<small><b>${escapeHtml(leg.line)}</b>${leg.stops?` · ${escapeHtml(leg.stops)}`:""}${leg.duration?` · ${escapeHtml(leg.duration)}`:""}</small>`:""}${leg.notes?`<small class="route-warning">${escapeHtml(leg.notes)}</small>`:""}<div class="mini-actions">${map?`<a href="${map}" target="_blank" rel="noreferrer">Abrir trayecto</a>`:""}${source?`<a href="${source}" target="_blank" rel="noreferrer">Fuente</a>`:""}</div></div></article>`;
}
function placeMarkup(place){
  const guide=richGuideFor(place),summary=guide?.summary||place.description;
  return `<button class="place-guide-card" type="button" data-place-id="${escapeHtml(place.id)}"><span class="place-guide-icon">📖</span><span class="place-guide-copy"><small>${escapeHtml(guide?.neighborhood||place.zone||place.slot)}</small><strong>${escapeHtml(place.title||place.zone)}</strong><span>${escapeHtml(summary)}</span><em>${escapeHtml([place.time,place.duration].filter(Boolean).join(" · "))}</em></span><b aria-hidden="true">›</b></button>`;
}
function routeContextFor(place){
  const guide=richGuideFor(place),legs=(guideData.routes||[]).filter(item=>item.date===place.date).sort((a,b)=>a.order-b.order);
  const arrivalIndex=guide?.arrivalRouteId?legs.findIndex(leg=>leg.id===guide.arrivalRouteId):-1;
  const companions=(guideData.places||[]).filter(candidate=>candidate.date===place.date&&richGuideFor(candidate)?.arrivalRouteId===guide?.arrivalRouteId);
  const companionIndex=companions.findIndex(candidate=>candidate.id===place.id),hasGuideAfter=companionIndex>=0&&companionIndex<companions.length-1;
  return {arrival:arrivalIndex>=0?legs[arrivalIndex]:null,next:arrivalIndex>=0&&!hasGuideAfter?legs[arrivalIndex+1]||null:null};
}
function journeyMarkup(places,legs){
  const enriched=places.map(place=>({place,guide:richGuideFor(place)}));
  const mapped=enriched.filter(item=>item.guide?.arrivalRouteId&&legs.some(leg=>leg.id===item.guide.arrivalRouteId));
  const canInterleave=mapped.length>0;
  if(!canInterleave){
    return `${places.length?`<section class="day-section"><h3>Guía de las visitas</h3><div class="place-guide-list">${places.map(placeMarkup).join("")}</div></section>`:""}${legs.length?`<section class="day-section"><h3>Cómo moveros</h3>${legs.map(routeLegMarkup).join("")}</section>`:`<div class="guide-placeholder">Conecta Google para ver los trayectos paso a paso.</div>`}`;
  }
  const placesByRoute=new Map();
  mapped.forEach(item=>placesByRoute.set(item.guide.arrivalRouteId,[...(placesByRoute.get(item.guide.arrivalRouteId)||[]),item.place]));
  return `<section class="day-section journey-section"><h3>Plan paso a paso</h3><p class="journey-hint">Cada trayecto termina en la visita que viene justo después.</p><div class="journey-flow">${legs.map(leg=>`${routeLegMarkup(leg)}${(placesByRoute.get(leg.id)||[]).map(placeMarkup).join("")}`).join("")}</div></section>`;
}
function renderRoute(){
  const cities=["Todos",...new Set(days.map(day=>day.city))];
  document.getElementById("cityFilters").innerHTML=cities.map(city=>`<button class="${routeFilter===city?"active":""}" data-city="${escapeHtml(city)}">${escapeHtml(city)}</button>`).join("");
  const selected=routeFilter==="Todos"?days:days.filter(day=>day.city===routeFilter);
  const hasActiveDay=selected.some(day=>isToday(day.date));
  document.getElementById("routeList").innerHTML=selected.map((day,index)=>{
    const d=new Date(`${day.date}T12:00:00`),month=new Intl.DateTimeFormat("es-ES",{month:"short"}).format(d),weekday=new Intl.DateTimeFormat("es-ES",{weekday:"long"}).format(d);
    const legs=guideData.routes.filter(item=>item.date===day.date).sort((a,b)=>a.order-b.order);
    const places=guideData.places.filter(item=>item.date===day.date);
    return `<details class="day-card" ${isToday(day.date)||(!hasActiveDay&&index===0)?"open":""}><summary><div class="date-tile"><strong>${d.getDate()}</strong><small>${month}</small></div><div><h2>${escapeHtml(day.title)}</h2><p>${escapeHtml(weekday)} · ${escapeHtml(day.city)} · duerme en ${escapeHtml(day.sleep)}</p></div><span>›</span></summary><div class="day-detail">${day.slots.map(slot=>`<div class="slot"><time>${escapeHtml(slot.label)}<br>${escapeHtml(slot.time)}</time><div><strong>${escapeHtml(slot.title)}</strong><p>${escapeHtml(slot.desc)}</p></div></div>`).join("")}${day.transport?`<div class="transport-note"><strong>Desplazamiento:</strong> ${escapeHtml(day.transport)}</div>`:""}${journeyMarkup(places,legs)}<div class="day-actions"><a href="${mapsSearch(day.map)}" target="_blank" rel="noreferrer">📍 Ver la zona</a></div></div></details>`;
  }).join("");
  renderNow();
}
function japanToday(){return new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());}
function isToday(iso){ return appToday()===iso; }
function renderNow(){
  const panel=document.getElementById("routeNowPanel");if(!panel)return;
  const today=appToday();let day=days.find(item=>item.date===today);
  const phase=today<days[0].date?"before":today>days.at(-1).date?"after":"during";
  if(!day)day=phase==="before"?days[0]:days.at(-1);
  const places=guideData.places.filter(item=>item.date===day.date),legs=guideData.routes.filter(item=>item.date===day.date).sort((a,b)=>a.order-b.order);
  const nowHour=Number(new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Tokyo",hour:"2-digit",hour12:false}).format(new Date()));
  const current=places.find(item=>{const hour=Number(String(item.time).match(/\d{1,2}/)?.[0]);return Number.isFinite(hour)&&hour>=nowHour;})||places[0];
  panel.innerHTML=`<section class="now-card panel"><p class="eyebrow">${phase==="during"?"En Japón ahora":"Vista previa"}</p><h2>${escapeHtml(day.title)}</h2><p>${phase==="before"?`El viaje todavía no ha empezado. Este será el primer día.`:phase==="after"?"El viaje ya ha terminado. Este fue el último día.":`Hoy es ${escapeHtml(fmtDate(day.date,{weekday:"long",day:"numeric",month:"long"}))}.`}</p>${current?`<button class="now-focus" type="button" data-place-id="${escapeHtml(current.id)}"><small>Siguiente visita</small><strong>${escapeHtml(current.title)}</strong><p>${escapeHtml(current.description)}</p><span>Ver guía completa ›</span></button>`:""}${legs.length?`<div class="day-section"><h3>Trayectos de hoy</h3>${legs.map(routeLegMarkup).join("")}</div>`:`<div class="guide-placeholder">Conecta Google para cargar los trayectos del día.</div>`}</section>`;
}

function placeGuideDialogMarkup(place){
  const guide=richGuideFor(place)||{},recommendations=recommendationsFor(guide.id);
  const {next}=routeContextFor(place),nextMap=next?safeUrl(next.map):"";
  const source=safeUrl(guide.source||place.source),map=safeUrl(guide.map)||mapsSearch(`${place.title} ${guide.city||place.zone||"Japón"}`);
  const overview=guide.summary||place.description;
  return `<div class="place-dialog-hero"><p class="eyebrow">${escapeHtml(guide.neighborhood||place.zone||"Guía de visita")}</p><h2 id="placeDialogTitle">${escapeHtml(place.title||place.zone)}</h2><div class="place-dialog-meta"><span>${escapeHtml(place.time||"")}</span><span>${escapeHtml(guide.duration||place.duration||"")}</span></div><p>${escapeHtml(overview)}</p></div>
    ${guide.history?`<section class="place-dialog-section"><h3>Historia en un minuto</h3>${detailTextMarkup(guide.history)}</section>`:""}
    ${guide.highlights?`<details class="place-dialog-section" open><summary>Qué merece la pena mirar <span>＋</span></summary>${detailTextMarkup(guide.highlights)}</details>`:""}
    ${guide.route?`<details class="place-dialog-section" open><summary>Cómo recorrerlo <span>＋</span></summary>${detailTextMarkup(guide.route)}</details>`:""}
    ${(guide.tips||place.tips||place.reservation)?`<details class="place-dialog-section"><summary>Consejos prácticos <span>＋</span></summary>${detailTextMarkup([guide.tips||place.tips,place.reservation?`Reserva: ${place.reservation}`:""].filter(Boolean).join("\n"))}</details>`:""}
    ${(guide.rainPlan||place.tips)?`<details class="place-dialog-section"><summary>Plan B <span>＋</span></summary>${detailTextMarkup(guide.rainPlan||place.tips)}</details>`:""}
    ${next?`<section class="place-dialog-section next-leg"><p class="eyebrow">Al salir · siguiente trayecto</p><h3>${escapeHtml(next.origin)} → ${escapeHtml(next.destination)}</h3><p>${escapeHtml(next.instruction)}</p>${next.line?`<small><b>${escapeHtml(next.line)}</b>${next.duration?` · ${escapeHtml(next.duration)}`:""}</small>`:""}${nextMap?`<a href="${nextMap}" target="_blank" rel="noreferrer">Abrir esta ruta en Google Maps</a>`:""}</section>`:""}
    ${recommendations.length?`<section class="place-dialog-section"><h3>Comer y descubrir cerca</h3><div class="recommendation-list">${recommendations.map(item=>{const itemMap=safeUrl(item.map)||mapsSearch(`${item.name} ${item.area}`),itemSource=safeUrl(item.source);return `<article class="recommendation-card"><span>${escapeHtml(item.type)}</span><div><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.reason)}</p><small>${escapeHtml([item.area,item.price].filter(Boolean).join(" · "))}</small><div class="mini-actions"><a href="${itemMap}" target="_blank" rel="noreferrer">Mapa</a>${itemSource?`<a href="${itemSource}" target="_blank" rel="noreferrer">Web</a>`:""}</div></div></article>`;}).join("")}</div><p class="verification-note">Recomendaciones revisadas el ${escapeHtml(guide.verified||"—")}. Conviene confirmar horarios antes de ir.</p></section>`:""}
    <div class="place-dialog-actions"><a class="primary-button" href="${map}" target="_blank" rel="noreferrer">Abrir en Google Maps</a>${source?`<a class="secondary-button" href="${source}" target="_blank" rel="noreferrer">Fuente oficial</a>`:""}</div>`;
}
function findPlaceGuideTarget(id){return guideData.places.find(place=>place.id===id||richGuideFor(place)?.id===id);}
function openPlaceGuide(id,{push=true}={}){
  const place=findPlaceGuideTarget(id);if(!place)return false;
  const dialog=document.getElementById("placeDialog"),guide=richGuideFor(place),hashId=guide?.id||place.id;
  selectedPlaceId=place.id;document.getElementById("placeDialogContent").innerHTML=placeGuideDialogMarkup(place);
  if(!dialog.open)dialog.showModal();
  if(push&&location.hash!==`#place=${encodeURIComponent(hashId)}`)history.pushState({placeGuide:hashId},"",`#place=${encodeURIComponent(hashId)}`);
  document.getElementById("closePlaceDialog").focus({preventScroll:true});return true;
}
function closePlaceDialogOnly(){const dialog=document.getElementById("placeDialog");if(dialog.open)dialog.close();selectedPlaceId="";}
function closePlaceGuide(){if(history.state?.placeGuide)history.back();else{closePlaceDialogOnly();if(location.hash.startsWith("#place="))history.replaceState(null,"",location.pathname+location.search);}}
function openPlaceFromHash(){const match=location.hash.match(/^#place=(.+)$/);if(match)openPlaceGuide(decodeURIComponent(match[1]),{push:false});}

function renderBookings(){
  const filters=[{id:"all",label:"Todas"},{id:"hotel",label:"Hoteles"},{id:"flight",label:"Vuelos"},{id:"transport",label:"Trenes y buses"},{id:"entry",label:"Entradas"},{id:"pending",label:"Pendientes"}];
  document.getElementById("bookingFilters").innerHTML=filters.map(f=>`<button class="${bookingFilter===f.id?"active":""}" data-booking-filter="${f.id}">${f.label}</button>`).join("");
  const selected=activeBookings().filter(b=>bookingFilter==="all"||bookingGroup(b.kind)===bookingFilter||(bookingFilter==="pending"&&bookingIsPending(b)));
  document.getElementById("bookingList").innerHTML=selected.length?selected.map(b=>{
    const statusClass=bookingIsPending(b)?"pending":"confirmed",link=safeUrl(b.link),map=safeUrl(b.map)|| (b.map?mapsSearch(b.map):""),dates=b.startDate?[fmtDate(b.startDate,{day:"numeric",month:"short"}),b.endDate&&b.endDate!==b.startDate?fmtDate(b.endDate,{day:"numeric",month:"short"}):""].filter(Boolean).join(" → "):b.time;
    return `<article class="booking-card"><div class="booking-top"><div><span class="booking-type">${bookingIcon(b.kind)}</span><h2>${escapeHtml(b.title)}</h2><p class="sub">${escapeHtml(b.detail||b.notes)}</p></div><span class="chip ${statusClass}">${escapeHtml(statusLabel(b.status))}</span></div><div class="booking-info"><div><small>Fecha / horario</small><strong>${escapeHtml([dates,b.time].filter((item,index,list)=>item&&list.indexOf(item)===index).join(" · ")||"Por definir")}</strong></div><div><small>Trayecto</small><strong>${escapeHtml([b.origin,b.destination].filter(Boolean).join(" → ")||b.payment||"—")}</strong></div>${b.amount?`<div><small>Importe</small><strong>${fmtMoney(b.amount,b.currency||"JPY")} · ${escapeHtml(b.payment||"")}</strong></div>`:""}${b.saleOpen?`<div><small>Apertura de venta</small><strong>${fmtDate(b.saleOpen,{day:"numeric",month:"long"})}</strong></div>`:""}${b.cancellation?`<div><small>Cancelar gratis hasta</small><strong>${fmtDate(b.cancellation,{day:"numeric",month:"long"})}</strong></div>`:""}</div>${b.alternative?`<div class="booking-alternative"><strong>Plan alternativo</strong><p>${escapeHtml(b.alternative)}</p></div>`:""}<div class="booking-links">${link?`<a href="${link}" target="_blank" rel="noreferrer">${bookingIsPending(b)?"Abrir reserva":"Ver confirmación"}</a>`:""}${map?`<a class="secondary" href="${map}" target="_blank" rel="noreferrer">Google Maps</a>`:""}</div></article>`;
  }).join(""):`<div class="panel empty">No hay reservas con este filtro.</div>`;
}

function practicalMarkup(item){
  const link=safeUrl(item.link),source=safeUrl(item.source);
  return `<article class="guide-card"><span class="guide-context">${escapeHtml(item.context||item.type)}</span><h2>${escapeHtml(item.title)}</h2>${item.japanese?`<div class="japanese"><strong>${escapeHtml(item.japanese)}</strong><small>${escapeHtml(item.pronunciation)}</small></div>`:""}<p>${escapeHtml(item.content)}</p>${item.detail?`<p class="guide-detail">${escapeHtml(item.detail)}</p>`:""}<div class="mini-actions">${link?`<a href="${link}" target="_blank" rel="noreferrer">Abrir mapa</a>`:""}${source?`<a href="${source}" target="_blank" rel="noreferrer">Fuente oficial</a>`:""}</div></article>`;
}
function renderGuide(){
  const content=document.getElementById("guideContent");if(!content)return;
  document.querySelectorAll("[data-guide-tab]").forEach(button=>button.classList.toggle("active",button.dataset.guideTab===guideTab));
  if(guideTab==="Checklist"){
    const items=guideData.checklist||[];
    content.innerHTML=items.length?`<div class="guide-summary panel"><strong>${items.filter(item=>item.done).length}/${items.length}</strong><span>tareas completadas</span></div><div class="checklist-list">${items.map(item=>{const link=safeUrl(item.link);return `<label class="check-item ${item.done?"done":""}"><input type="checkbox" data-checklist-id="${escapeHtml(item.id)}" ${item.done?"checked":""}><span><strong>${escapeHtml(item.task)}</strong><small>${escapeHtml([item.dueDate?fmtDate(item.dueDate,{day:"numeric",month:"long"}):"",item.priority,item.phase,item.category,item.owner,item.notes].filter(Boolean).join(" · "))}</small>${item.dependency?`<em>Depende de: ${escapeHtml(item.dependency)}</em>`:""}${link?`<a href="${link}" target="_blank" rel="noreferrer">Abrir enlace</a>`:""}</span></label>`;}).join("")}</div>`:`<div class="panel empty">Conecta Google para cargar el checklist compartido.</div>`;
    return;
  }
  if(guideTab==="Equipaje"){
    const items=(guideData.luggage||[]).sort((a,b)=>(a.actionDate||"").localeCompare(b.actionDate||""));
    content.innerHTML=items.length?`<div class="luggage-list">${items.map(item=>`<article class="guide-card luggage-card"><span class="guide-context">${escapeHtml(item.status||"Planificado")}</span><h2>${escapeHtml(item.item)}</h2><p><strong>${escapeHtml(item.origin)} → ${escapeHtml(item.destination)}</strong></p><div class="luggage-meta"><span>📅 ${item.actionDate?fmtDate(item.actionDate,{day:"numeric",month:"long"}):"Por confirmar"}</span>${item.deliveryDate?`<span>📦 Entrega ${fmtDate(item.deliveryDate,{day:"numeric",month:"long"})}</span>`:""}${item.company?`<span>🏷️ ${escapeHtml(item.company)}</span>`:""}</div>${item.carry?`<p class="guide-detail"><strong>En la mochila:</strong> ${escapeHtml(item.carry)}</p>`:""}${item.confirmWith?`<p class="guide-detail"><strong>Confirmar con:</strong> ${escapeHtml(item.confirmWith)}</p>`:""}${item.notes?`<p class="guide-detail">${escapeHtml(item.notes)}</p>`:""}</article>`).join("")}</div><p class="verification-note">Los envíos marcados “Por confirmar” son propuestas: comprobadlos con el hotel antes de entregar las maletas.</p>`:`<div class="panel empty">Conecta Google para cargar el plan de equipaje.</div>`;
    return;
  }
  if(guideTab==="Notas"){
    const notes=(guideData.notes||[]).sort((a,b)=>String(b.updated).localeCompare(String(a.updated)));
    content.innerHTML=`<div class="guide-toolbar"><p>Lo que escribáis aquí se guarda en la hoja compartida.</p><button class="primary-button" id="openNoteForm" type="button">＋ Nota</button></div><div class="notes-list">${notes.map(note=>`<article class="note-card"><div><small>${escapeHtml([note.date?fmtDate(note.date):"",note.place,note.author].filter(Boolean).join(" · "))}</small><p>${escapeHtml(note.text)}</p></div>${note.id!=="note-welcome"?`<button type="button" data-delete-note="${escapeHtml(note.id)}" aria-label="Eliminar nota">×</button>`:""}</article>`).join("")||`<div class="panel empty">Todavía no hay notas.</div>`}</div>`;
    return;
  }
  const selected=(guideData.practical||[]).filter(item=>item.type===guideTab);
  content.innerHTML=selected.length?selected.map(practicalMarkup).join(""):`<div class="panel empty">Conecta Google para cargar esta parte de la guía.</div>`;
}

function renderExpenses(){
  const rate=Number(document.getElementById("exchangeRate").value)||0;
  const statusFilters=[{id:"all",label:"Todos"},{id:"paid",label:"Pagados"},{id:"pending",label:"Pendientes"}];
  document.getElementById("expenseStatusFilters").innerHTML=statusFilters.map(f=>`<button class="${expenseStatusFilter===f.id?"active":""}" data-expense-status="${f.id}">${f.label}</button>`).join("");
  const categoryFilters=[{id:"all",label:"Todas"},...Object.entries(categories).map(([id,icon])=>({id,label:`${icon} ${id}`}))];
  document.getElementById("expenseCategoryFilters").innerHTML=categoryFilters.map(f=>`<button class="${expenseCategoryFilter===f.id?"active":""}" data-expense-category="${escapeHtml(f.id)}">${escapeHtml(f.label)}</button>`).join("");
  document.querySelectorAll("[data-expense-currency]").forEach(button=>button.classList.toggle("active",button.dataset.expenseCurrency===expenseDisplayCurrency));

  const filtered=expenses.filter(e=>(expenseCategoryFilter==="all"||e.category===expenseCategoryFilter)&&(expenseStatusFilter==="all"||(expenseStatusFilter==="paid"&&e.paid)||(expenseStatusFilter==="pending"&&!e.paid))).sort((a,b)=>b.date.localeCompare(a.date));
  const convert=(expense,target)=>{
    const amount=Number(expense.amount)||0;
    if(expense.currency===target)return amount;
    if(!rate)return null;
    return target==="EUR"?amount/rate:amount*rate;
  };
  const totalEur=filtered.reduce((sum,e)=>sum+(convert(e,"EUR")??0),0);
  const totalJpy=filtered.reduce((sum,e)=>sum+(convert(e,"JPY")??0),0);
  document.getElementById("totalEur").textContent=fmtMoney(totalEur,"EUR");
  document.getElementById("totalJpy").textContent=fmtMoney(totalJpy,"JPY");
  document.getElementById("convertedTotal").textContent=rate?`1 € = ${new Intl.NumberFormat("es-ES",{maximumFractionDigits:2}).format(rate)} ¥`:"Introduce un cambio";
  document.getElementById("converterRateMeta").textContent=rate?`1 € = ${new Intl.NumberFormat("es-ES",{maximumFractionDigits:2}).format(rate)} ¥`:"Falta el cambio";
  updateConverter(converterSource);

  const byCategory={}; filtered.forEach(e=>{const amount=convert(e,expenseDisplayCurrency);if(amount!==null)byCategory[e.category]=(byCategory[e.category]||0)+amount;});
  const max=Math.max(...Object.values(byCategory),1);
  document.getElementById("categoryBreakdown").innerHTML=Object.entries(byCategory).sort((a,b)=>b[1]-a[1]).map(([category,total])=>`<div class="bar-row"><span>${categories[category]||"•"} ${escapeHtml(category)}</span><div class="bar-track"><i style="width:${Math.max(3,total/max*100)}%"></i></div><strong>${fmtMoney(total,expenseDisplayCurrency)}</strong></div>`).join("")||`<div class="empty">Aún no hay gastos.</div>`;

  document.getElementById("expenseList").innerHTML=filtered.length?filtered.map(e=>{const shown=convert(e,expenseDisplayCurrency);const original=e.currency!==expenseDisplayCurrency?` · Original: ${fmtMoney(Number(e.amount),e.currency)}`:"";return `<article class="expense-row"><div class="expense-icon">${categories[e.category]||"•"}</div><div><h3>${escapeHtml(e.description)}</h3><p>${fmtDate(e.date,{day:"numeric",month:"short",year:"numeric"})} · ${escapeHtml(e.category)} · ${escapeHtml(e.payer||"Común")} · ${escapeHtml(e.method||"Otro")}</p></div><div class="expense-value"><strong>${shown===null?fmtMoney(Number(e.amount),e.currency):fmtMoney(shown,expenseDisplayCurrency)}</strong><small>${e.paid?"Pagado":"Pendiente"}${original}</small></div><div class="expense-actions"><button data-edit-expense="${e.id}">Editar</button>${e.fixed?"":`<button class="delete" data-delete-expense="${e.id}">Eliminar</button>`}</div></article>`;}).join(""):`<div class="panel empty">No hay gastos con estos filtros.</div>`;
}

function updateConverter(source="EUR"){
  converterSource=source;const rate=Number(document.getElementById("exchangeRate").value)||0,eur=document.getElementById("converterEur"),jpy=document.getElementById("converterJpy");
  if(!rate){if(source==="EUR")jpy.value="";else eur.value="";return;}
  if(source==="EUR"){const amount=Number(eur.value);jpy.value=Number.isFinite(amount)?String(Math.round(amount*rate)):"";}
  else{const amount=Number(jpy.value);eur.value=Number.isFinite(amount)?String(Math.round(amount/rate*100)/100):"";}
}

function populateExpenseSelects(){
  const options=Object.keys(categories).map(c=>`<option value="${c}">${categories[c]} ${c}</option>`).join("");
  document.getElementById("expenseCategory").innerHTML=options;
}
function closeExpense(){
  const dialog=document.getElementById("expenseDialog");
  if(dialog.open) dialog.close();
}
function openExpense(id=null){
  const e=id?expenses.find(item=>item.id===id):null;
  document.getElementById("expenseDialogTitle").textContent=e?"Editar gasto":"Añadir gasto";
  document.getElementById("expenseId").value=e?.id||"";
  document.getElementById("expenseDescription").value=e?.description||"";
  document.getElementById("expenseAmount").value=e?.amount||"";
  document.getElementById("expenseCurrency").value=e?.currency||"JPY";
  document.getElementById("expenseCategory").value=e?.category||"Restaurantes";
  document.getElementById("expenseDate").value=e?.date||new Date().toISOString().slice(0,10);
  document.getElementById("expensePayer").value=e?.payer||"Común";
  document.getElementById("expenseMethod").value=e?.method||"Tarjeta";
  document.getElementById("expensePaid").checked=e?.paid??true;
  document.getElementById("expenseNotes").value=e?.notes||"";
  document.getElementById("expenseDialog").showModal();
}
async function submitExpense(event){
  event.preventDefault(); const form=event.currentTarget;if(!form.reportValidity())return;
  const id=document.getElementById("expenseId").value||`expense-${Date.now()}`;
  const existing=expenses.find(e=>e.id===id);
  const updated={id,fixed:existing?.fixed||false,date:document.getElementById("expenseDate").value,description:document.getElementById("expenseDescription").value.trim(),amount:Number(document.getElementById("expenseAmount").value),currency:document.getElementById("expenseCurrency").value,category:document.getElementById("expenseCategory").value,payer:document.getElementById("expensePayer").value,method:document.getElementById("expenseMethod").value,paid:document.getElementById("expensePaid").checked,notes:document.getElementById("expenseNotes").value.trim()};
  expenses=existing?expenses.map(e=>e.id===id?updated:e):[...expenses,updated];
  saveExpenses(); document.getElementById("expenseDialog").close();
  if(window.sheetExpenseStore?.isConnected()){
    try{await window.sheetExpenseStore.upsert(updated);toast(existing?"Gasto actualizado en Sheets":"Gasto añadido a Sheets");}
    catch(error){console.error(error);queueSheetSync({type:"upsert",id,expense:updated});toast("Guardado; se sincronizará al reconectar");}
  }else{queueSheetSync({type:"upsert",id,expense:updated});toast(existing?"Actualizado; pendiente de sincronizar":"Guardado; pendiente de sincronizar");}
}
async function deleteExpense(id){
  const expense=expenses.find(e=>e.id===id);if(!expense||expense.fixed)return;
  if(!confirm(`¿Eliminar “${expense.description}”?`))return;
  expenses=expenses.filter(e=>e.id!==id);saveExpenses();
  if(window.sheetExpenseStore?.isConnected()){
    try{await window.sheetExpenseStore.remove(id);toast("Gasto eliminado de Sheets");}
    catch(error){console.error(error);queueSheetSync({type:"delete",id});toast("Eliminado; se sincronizará al reconectar");}
  }else{queueSheetSync({type:"delete",id});toast("Eliminado; pendiente de sincronizar");}
}

function updateSyncUi({state,message,configured,connected}){
  const panel=document.querySelector("#view-expenses .sync-panel"),button=document.getElementById("connectGoogle"),routePanel=document.querySelector(".route-sync-panel"),routeButton=document.getElementById("connectRouteGoogle"),browserRequired=window.sheetExpenseStore?.needsBrowser?.()||state==="browser";
  panel.dataset.state=state;routePanel.dataset.state=state;
  document.getElementById("syncTitle").textContent=connected?"Google Sheets conectado":configured?"Gastos en este dispositivo":"Falta configurar Google";
  document.getElementById("syncStatus").textContent=message;
  button.textContent=connected?"Sincronizar":"Conectar Google";
  button.disabled=["connecting","syncing"].includes(state);
  document.getElementById("routeSyncStatus").textContent=connected?(guideData.loadedAt?`Rutas actualizadas · ${fmtDate(guideData.loadedAt.slice(0,10),{day:"numeric",month:"short"})}`:"Google Sheets conectado"):message;
  routeButton.textContent=connected?"Actualizar":"Conectar";
  routeButton.disabled=["connecting","syncing"].includes(state);
  button.classList.toggle("hidden",browserRequired&&!connected);routeButton.classList.toggle("hidden",browserRequired&&!connected);
  document.getElementById("openExpensesInBrowser").classList.toggle("hidden",!browserRequired||connected);
  document.getElementById("openRouteInBrowser").classList.toggle("hidden",!browserRequired||connected);
}
function setupSheetSync(){
  if(!window.sheetExpenseStore)return updateSyncUi({state:"error",message:"No se ha cargado el conector de Google.",configured:false,connected:false});
  window.sheetExpenseStore.init({
    onStatus:updateSyncUi,
    onExpenses:remoteExpenses=>{expenses=mergePendingSync(remoteExpenses);saveExpenses();},
    onGuideData:saveGuideData
  });
}

async function connectAndSync(){
  try{
    if(window.sheetExpenseStore?.isConnected())await window.sheetExpenseStore.loadAll();
    else await window.sheetExpenseStore?.connect();
    await flushPendingSync();
  }catch(error){console.error(error);updateSyncUi({state:error.state||"error",message:error.message||"No se ha podido conectar con Google.",configured:true,connected:false});toast(error.state==="browser"?"Abre la app en Safari o Chrome":"No se ha podido sincronizar");}
}

async function refreshExchangeRate({announce=false}={}){
  const meta=document.getElementById("exchangeRateMeta");
  meta.textContent="Actualizando cambio del BCE…";
  try{
    const response=await fetch(RATE_ENDPOINT,{headers:{accept:"application/json"}});
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    const data=await response.json();
    if(!Number.isFinite(Number(data.rate))) throw new Error("Cambio no válido");
    document.getElementById("exchangeRate").value=data.rate;
    localStorage.setItem(RATE_KEY,String(data.rate));
    localStorage.setItem(RATE_DATE_KEY,data.date||"");
    meta.textContent=`BCE · ${data.date?fmtDate(data.date,{day:"numeric",month:"long",year:"numeric"}):"último día hábil"}`;
    renderExpenses();renderHome();
    if(announce) toast("Cambio actualizado");
  }catch{
    const cachedDate=localStorage.getItem(RATE_DATE_KEY);
    meta.textContent=localStorage.getItem(RATE_KEY)?`Sin conexión · último cambio${cachedDate?` del ${fmtDate(cachedDate)}`:" guardado"}`:"Sin conexión · introduce el cambio manualmente";
    renderExpenses();renderHome();
    if(announce) toast("No se ha podido actualizar el cambio");
  }
}

function exportFile(filename,content,type){ const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),500); }
function exportCsv(){
  const headers=["Fecha","Concepto","Categoría","Importe","Moneda","Estado","Pagado por","Método","Notas"];
  const quote=v=>`"${String(v??"").replaceAll('"','""')}"`;
  const rows=expenses.map(e=>[e.date,e.description,e.category,e.amount,e.currency,e.paid?"Pagado":"Pendiente",e.payer,e.method,e.notes].map(quote).join(";"));
  exportFile("gastos-japon-2026.csv","\ufeff"+[headers.map(quote).join(";"),...rows].join("\n"),"text/csv;charset=utf-8");
}
function exportBackup(){ exportFile("japon-2026-backup.json",JSON.stringify({version:1,exportedAt:new Date().toISOString(),exchangeRate:document.getElementById("exchangeRate").value,expenses},null,2),"application/json"); }
async function importBackup(file){ try{const data=JSON.parse(await file.text());if(!Array.isArray(data.expenses))throw new Error();expenses=data.expenses;localStorage.setItem(RATE_KEY,data.exchangeRate||"");document.getElementById("exchangeRate").value=data.exchangeRate||"";saveExpenses();toast("Copia restaurada");}catch{alert("No se ha podido leer esta copia de seguridad.");} }
function toast(message){ const el=document.getElementById("toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2200); }

function openNote(){
  if(!window.sheetExpenseStore?.isConnected()){toast("Conecta Google antes de añadir una nota");return;}
  document.getElementById("noteDate").value=(japanToday()>=days[0].date&&japanToday()<=days.at(-1).date)?japanToday():"";
  document.getElementById("notePlace").value="";document.getElementById("noteText").value="";document.getElementById("noteDialog").showModal();
}
function closeNote(){const dialog=document.getElementById("noteDialog");if(dialog.open)dialog.close();}
async function submitNote(event){
  event.preventDefault();if(!event.currentTarget.reportValidity())return;
  const note={id:`note-${Date.now()}`,date:document.getElementById("noteDate").value,place:document.getElementById("notePlace").value.trim(),text:document.getElementById("noteText").value.trim(),author:document.getElementById("noteAuthor").value};
  try{await window.sheetExpenseStore.addNote(note);closeNote();toast("Nota compartida");}catch(error){console.error(error);toast(error.message||"No se ha podido guardar");}
}

function bindEvents(){
  document.addEventListener("click",event=>{
    const nav=event.target.closest("[data-nav]");if(nav){navigate(nav.dataset.nav);return;}
    const target=event.target.closest("[data-open-target]");if(target){const value=target.dataset.openTarget;if(value==="bookings")navigate("bookings");else{guideTab=value==="emergency"?"Emergencia":"Checklist";navigate("more");renderGuide();}return;}
    const plan=event.target.closest("[data-today-plan]");if(plan){todayPlanMode=plan.dataset.todayPlan;renderHome();return;}
    const place=event.target.closest("[data-place-id]");if(place){openPlaceGuide(place.dataset.placeId);return;}
    const city=event.target.closest("[data-city]");if(city){routeFilter=city.dataset.city;renderRoute();return;}
    const mode=event.target.closest("[data-route-mode]");if(mode){routeMode=mode.dataset.routeMode;document.querySelectorAll("[data-route-mode]").forEach(button=>button.classList.toggle("active",button===mode));document.getElementById("routeDaysPanel").classList.toggle("hidden",routeMode!=="days");document.getElementById("routeNowPanel").classList.toggle("hidden",routeMode!=="now");renderNow();return;}
    const tab=event.target.closest("[data-guide-tab]");if(tab){guideTab=tab.dataset.guideTab;renderGuide();return;}
    const openNoteButton=event.target.closest("#openNoteForm");if(openNoteButton){openNote();return;}
    const deleteNoteButton=event.target.closest("[data-delete-note]");if(deleteNoteButton){if(confirm("¿Eliminar esta nota compartida?"))window.sheetExpenseStore.removeNote(deleteNoteButton.dataset.deleteNote).then(()=>toast("Nota eliminada")).catch(error=>toast(error.message));return;}
    const checklist=event.target.closest("[data-checklist-id]");if(checklist){const done=checklist.checked;if(!window.sheetExpenseStore?.isConnected()){checklist.checked=!done;toast("Conecta Google para actualizar el checklist");return;}checklist.disabled=true;window.sheetExpenseStore.setChecklist(checklist.dataset.checklistId,done).then(()=>toast(done?"Tarea completada":"Tarea reabierta")).catch(error=>{checklist.checked=!done;checklist.disabled=false;toast(error.message||"Conecta Google para actualizarla");});return;}
    const booking=event.target.closest("[data-booking-filter]");if(booking){bookingFilter=booking.dataset.bookingFilter;renderBookings();return;}
    const expenseStatus=event.target.closest("[data-expense-status]");if(expenseStatus){expenseStatusFilter=expenseStatus.dataset.expenseStatus;renderExpenses();return;}
    const expenseCategory=event.target.closest("[data-expense-category]");if(expenseCategory){expenseCategoryFilter=expenseCategory.dataset.expenseCategory;renderExpenses();return;}
    const expenseCurrency=event.target.closest("[data-expense-currency]");if(expenseCurrency){expenseDisplayCurrency=expenseCurrency.dataset.expenseCurrency;localStorage.setItem(DISPLAY_CURRENCY_KEY,expenseDisplayCurrency);renderExpenses();return;}
    const edit=event.target.closest("[data-edit-expense]");if(edit){openExpense(edit.dataset.editExpense);return;}
    const del=event.target.closest("[data-delete-expense]");if(del){deleteExpense(del.dataset.deleteExpense);}
  });
  document.getElementById("todayPreviewDate").addEventListener("change",event=>{todayPreviewDate=event.target.value;todayWeather=null;weatherRequestKey="";if(todayPreviewDate)localStorage.setItem(TODAY_PREVIEW_KEY,todayPreviewDate);else localStorage.removeItem(TODAY_PREVIEW_KEY);renderHome();renderRoute();});
  document.getElementById("openExpenseForm").addEventListener("click",()=>openExpense());
  document.getElementById("expenseForm").addEventListener("submit",submitExpense);
  document.getElementById("closeExpenseDialog").addEventListener("click",closeExpense);
  document.getElementById("cancelExpenseDialog").addEventListener("click",closeExpense);
  document.getElementById("expenseDialog").addEventListener("click",event=>{if(event.target===event.currentTarget)closeExpense();});
  document.getElementById("routeList").addEventListener("click",event=>{const summary=event.target.closest("summary");if(!summary||!summary.parentElement.matches(".day-card"))return;const current=summary.parentElement;document.querySelectorAll("#routeList .day-card[open]").forEach(card=>{if(card!==current)card.removeAttribute("open");});});
  document.getElementById("exchangeRate").addEventListener("input",event=>{localStorage.setItem(RATE_KEY,event.target.value);localStorage.removeItem(RATE_DATE_KEY);document.getElementById("exchangeRateMeta").textContent="Cambio introducido manualmente";renderExpenses();});
  document.getElementById("converterEur").addEventListener("input",()=>updateConverter("EUR"));
  document.getElementById("converterJpy").addEventListener("input",()=>updateConverter("JPY"));
  document.getElementById("refreshRate").addEventListener("click",()=>refreshExchangeRate({announce:true}));
  document.getElementById("connectGoogle").addEventListener("click",connectAndSync);
  document.getElementById("connectRouteGoogle").addEventListener("click",connectAndSync);
  document.getElementById("noteForm").addEventListener("submit",submitNote);
  document.getElementById("closeNoteDialog").addEventListener("click",closeNote);
  document.getElementById("cancelNoteDialog").addEventListener("click",closeNote);
  document.getElementById("noteDialog").addEventListener("click",event=>{if(event.target===event.currentTarget)closeNote();});
  document.getElementById("closePlaceDialog").addEventListener("click",closePlaceGuide);
  document.getElementById("placeDialog").addEventListener("cancel",event=>{event.preventDefault();closePlaceGuide();});
  window.addEventListener("popstate",()=>{if(location.hash.startsWith("#place="))openPlaceFromHash();else closePlaceDialogOnly();});
  document.getElementById("exportCsv").addEventListener("click",exportCsv);
  document.getElementById("exportBackup").addEventListener("click",exportBackup);
  document.getElementById("importBackup").addEventListener("change",event=>event.target.files[0]&&importBackup(event.target.files[0]));
  document.getElementById("resetExpenses").addEventListener("click",async()=>{
    if(!confirm("¿Restaurar los gastos iniciales? Se eliminarán los que hayas añadido manualmente."))return;
    const manualIds=expenses.filter(expense=>!expense.fixed).map(expense=>expense.id);
    expenses=structuredClone(seedExpenses);saveExpenses();
    if(window.sheetExpenseStore?.isConnected()){
      try{
        for(const id of manualIds)await window.sheetExpenseStore.remove(id);
        for(const expense of seedExpenses)await window.sheetExpenseStore.upsert(expense);
        toast("Gastos restaurados en Sheets");
      }catch(error){console.error(error);manualIds.forEach(id=>queueSheetSync({type:"delete",id}));seedExpenses.forEach(expense=>queueSheetSync({type:"upsert",id:expense.id,expense}));toast("Restaurados; sincronización pendiente");}
    }else{
      manualIds.forEach(id=>queueSheetSync({type:"delete",id}));seedExpenses.forEach(expense=>queueSheetSync({type:"upsert",id:expense.id,expense}));toast("Restaurados; sincronización pendiente");
    }
  });
  window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();deferredInstallPrompt=event;document.getElementById("installButton").classList.remove("hidden");});
  window.addEventListener("online",renderHome);window.addEventListener("offline",renderHome);
  document.getElementById("installButton").addEventListener("click",async()=>{if(!deferredInstallPrompt)return;deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;document.getElementById("installButton").classList.add("hidden");});
}

function init(){
  populateExpenseSelects(); document.getElementById("exchangeRate").value=localStorage.getItem(RATE_KEY)||"";
  document.getElementById("todayPreviewDate").innerHTML=`<option value="">Fecha real</option>${days.map((day,index)=>`<option value="${day.date}">Día ${index+1} · ${fmtDate(day.date,{weekday:"short",day:"numeric",month:"short"})} · ${escapeHtml(day.city)}</option>`).join("")}`;document.getElementById("todayPreviewDate").value=todayPreviewDate;
  bindEvents(); setupSheetSync(); renderHome(); renderRoute(); renderBookings(); renderExpenses(); renderGuide(); openPlaceFromHash();
  refreshExchangeRate();
  if("serviceWorker" in navigator){
    const isLocal=["localhost","127.0.0.1","::1"].includes(location.hostname);
    if(isLocal) navigator.serviceWorker.getRegistrations().then(registrations=>registrations.forEach(registration=>registration.unregister())).catch(()=>{});
    else if(location.protocol==="https:") navigator.serviceWorker.register("./sw.js").catch(()=>{});
  }
}
document.addEventListener("DOMContentLoaded",init);
