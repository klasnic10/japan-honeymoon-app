"use strict";
// Live Tokyo itinerary correction, verified against Webket confirmation on 2026-11-05.
// Loaded after trip-data.js and before app.js, so existing bookings and other trip data stay intact.
(function () {
  const trip=window.TRIP_DATA;
  if (!trip) return;
  const ticketMail="https://mail.google.com/mail/u/?authuser=jorge.sanchez704%40gmail.com#all/1a1a9cfd2fcc6c7f";
  const slot=(label,time,title,desc)=>({label,time,title,desc});
  const thu=trip.days.find(day=>day.date==="2026-11-05");
  if(thu){
    thu.title="Toyosu, Harajuku, Omotesandō, Shibuya y Shinjuku";
    thu.map="Harajuku Station";
    thu.slots=[
      slot("Madrugada","05:30–08:00 · realizado","Subasta de atún en Toyosu","Subasta y mercado ya visitados, con desayuno."),
      slot("Media mañana","08:30–12:00 · flexible","Traslado, descanso o café en Harajuku","Recuperar fuerzas tras el madrugón y salir hacia Harajuku según os apetezca."),
      slot("Mediodía","12:00–15:00","Harajuku, Takeshita, Cat Street y Omotesandō","Tiendas, arquitectura y cafeterías; alternar interiores por lluvia. Meiji se reserva para el sábado."),
      slot("Tarde","15:00–18:00","Shibuya PARCO, Nintendo, Pokémon, Hands/LOFT y cruce","Desde Omotesandō a Shibuya para visitar PARCO y tiendas; Hachikō y cruce entre chaparrones."),
      slot("Noche","18:30–21:30","Shinjuku, Omoide Yokochō y Golden Gai","Cena, neones y callejones, recortando si hay cansancio.")
    ];
    thu.transport="Toyosu ya realizado → hoy Harajuku/Omotesandō → Shibuya PARCO y tiendas → Shinjuku de noche. Shibuya Sky jueves cancelado gratis.";
  }
  const sat=trip.days.find(day=>day.date==="2026-11-07");
  if(sat){
    sat.title="Meiji, Parque Yoyogi, Shibuya Sky, Yanaka y Kanda/Chiyoda";
    sat.map="Yoyogi Park";
    delete sat.alternatives;
    sat.slots=[
      slot("Mañana","08:00–09:00","Santuario Meiji y bosque","Visitar el santuario, sus torii y el bosque; después ir al parque de Yoyogi, no a la estación como destino."),
      slot("Media mañana","09:05–10:00","Parque Yoyogi · paseo","Paseo por el parque contiguo a Meiji. Es el lugar a visitar, no Harajuku Station."),
      slot("Media mañana","10:00–11:15","Café y camino hacia Shibuya","Desayuno y traslado tranquilo a Shibuya. Harajuku y Omotesandō ya los habéis visto el jueves."),
      slot("Mediodía","11:15–12:20","Comida temprana y acceso a Shibuya Sky","Llegar a Shibuya Scramble Square, planta 14, alrededor de las 12:20."),
      {...slot("Mediodía","12:40–14:00","Shibuya Sky · ENTRADA CONFIRMADA","Sábado 7 de noviembre: acceso 12:40–12:59, dos adultos, 5.400 yenes pagados. Ver Tokio de día y salir sobre las 14:00."),reservation:"Confirmada",tips:"Abrir los dos QR NUEVOS del correo Webket, no los cancelados del jueves.",link:ticketMail},
      slot("Tarde","14:50–17:00","Yanaka Ginza y calles tradicionales","JR hasta Nippori sólo como acceso al barrio. Pasear por Yanaka Ginza, Yūyake Dandan, callejones y cementerio si da tiempo."),
      slot("Tarde-noche","17:15–20:30","Kanda y Chiyoda · Ochanomizu y Jimbochō","Tras Yanaka ir a Kanda Myōjin, Ochanomizu y Jimbochō; cenar por Kanda. El Palacio Imperial y sus jardines cierran antes, no planificarlos de noche.")
    ];
    sat.transport="Santuario Meiji 08:00 → Parque Yoyogi 09:05 → Shibuya Sky CONFIRMADO 12:40–12:59 → Yanaka Ginza vía Nippori sobre 14:50 → Kanda/Chiyoda 17:15–20:30. La estación Nippori es sólo el enlace, no el destino turístico. Nikkō descartado.";
  }
  const overrides=trip.guideOverrides||(trip.guideOverrides={});
  overrides.date="2026-11-07";
  const original=(overrides.bookings||[]).find(booking=>booking.id==="shibuya-sky");
  if(original){
    original.status="cancelled";
    original.detail="Reserva original jueves 5 noviembre CANCELADA gratuitamente; reemplazada por nueva compra sábado 7 12:40–12:59.";
    original.notes="No utilizar los QR antiguos del jueves, ya cancelados.";
  }
  overrides.bookings=(overrides.bookings||[]).filter(booking=>booking.id!=="shibuya-sky-nueva");
  overrides.bookings.push({
    id:"shibuya-sky-nueva",kind:"entry",title:"Shibuya Sky · sábado 7 noviembre · CONFIRMADA",
    detail:"Entrada Webket para 2 adultos, acceso 12:40–12:59 JST",startDate:"2026-11-07",endDate:"2026-11-07",
    origin:"Shibuya",destination:"Shibuya Sky",status:"confirmed",payment:"Pagado · ¥5.400",amount:5400,currency:"JPY",
    time:"12:40–12:59 JST · llegar alrededor de las 12:20",link:ticketMail,map:"Shibuya Sky",
    notes:"Confirmación y los DOS códigos QR adjuntos al correo de Webket. Compra nueva; no usar entradas canceladas del jueves.",
    documents:[{label:"Confirmación y los dos QR nuevos · Gmail",url:ticketMail}]
  });
  overrides.routes=[
    {id:"2026-11-05-01",origin:"Toyosu Market",destination:"Harajuku Station",instruction:"Tras Toyosu, ir a Harajuku y Omotesandō para tiendas y cafés; después Shibuya por la tarde."},
    {id:"2026-11-05-02",origin:"Harajuku Station",destination:"Omotesando / Cat Street",instruction:"Takeshita, Cat Street y Omotesandō, con comida y pausa bajo techo si llueve."},
    {id:"2026-11-05-03",origin:"Omotesando",destination:"Shibuya PARCO",instruction:"De Harajuku hacia Shibuya ~15:00: PARCO Nintendo/Pokémon, Hands/LOFT y cruce; Shinjuku por la noche."},
    {id:"2026-11-07-00",origin:"Meiji Jingu",destination:"Yoyogi Park",instruction:"Después del santuario, pasear por el Parque Yoyogi de 09:05 a 10:00; no es una visita a la estación."},
    {id:"2026-11-07-01",origin:"Yoyogi Park",destination:"Shibuya Scramble Square",instruction:"Café y comida temprana; llegar a la planta 14 de Shibuya Sky sobre las 12:20."},
    {id:"2026-11-07-02",origin:"Shibuya Scramble Square",destination:"Shibuya Sky",instruction:"Entrada CONFIRMADA sábado 12:40–12:59, mostrar los QR nuevos de Webket."},
    {id:"2026-11-07-03",origin:"Shibuya Sky",destination:"Yanaka Ginza",instruction:"Sobre las 14:00, JR Yamanote hasta Nippori (sólo estación de acceso); paseo a Yanaka Ginza, visita 14:50–17:00."},
    {id:"2026-11-07-04",origin:"Yanaka Ginza",destination:"Kanda Myojin",instruction:"Tras Yanaka, volver a Nippori y tomar JR hacia Akihabara. Subir a Kanda Myōjin y pasear por Ochanomizu."},
    {id:"2026-11-07-05",origin:"Kanda Myojin",destination:"Jimbocho",instruction:"Recorrer las calles de Kanda/Chiyoda y cenar por la zona. Los jardines del Palacio Imperial ya habrán cerrado."}
  ];
  overrides.placeGuides=[
    {id:"harajuku-omotesando",tips:"HOY jueves 5: Harajuku/Omotesandō mediodía, antes de Shibuya. Meiji queda sábado."},
    {id:"shibuya-core",route:"Jueves, después de Harajuku/Omotesandō, tiendas PARCO Nintendo/Pokémon, Hands/LOFT y cruce.",tips:"Shibuya Sky del jueves CANCELADO."},
    {id:"shibuya-sky",summary:"Entrada NUEVA CONFIRMADA sábado 7 a las 12:40–12:59 para dos adultos, pagados ¥5.400.",route:"Llegar a Scramble Square ~12:20; visitar mirador de día hasta ~14:00 y trasladarse a Yanaka.",tips:"Los dos códigos QR nuevos están en el correo de Webket; los anteriores del jueves están cancelados."},
    {id:"yanaka-sendagi",tips:"Sábado 7 hacia 15:00–17:00 tras Shibuya Sky: priorizar calle Yanaka Ginza y tiendas antes del cierre."},
    {id:"kiyosumi",tips:"Kiyosumi-Shirakawa queda fuera del plan del sábado; se prioriza Kanda y Chiyoda."}
  ];
  overrides.checklist=(overrides.checklist||[]).map(item=>item.id==="pre-02"?{...item,done:true,notes:"Compra original jueves cancelada gratis; NUEVA entrada sábado 7 a las 12:40 confirmada y pagada ¥5.400. QR nuevos en correo Webket.",link:ticketMail}:item);
})();
