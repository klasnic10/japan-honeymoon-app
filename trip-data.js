"use strict";

// Copia normalizada de “Viaje Japón 2026”.
// Fuente: Resumen, Detalle del viaje y Transportes y reservas.
// Última sincronización manual: 2026-07-20.
window.TRIP_DATA = {
  source: {
    spreadsheetId: "18hY04omi7OXIXVbWBiuDK10Jn0kbM_OPNQpeBMrvFL8",
    updatedAt: "2026-07-20T07:21:57.945Z"
  },
  days: [
    {date:"2026-11-02",city:"Vuelo",sleep:"Avión",title:"Barcelona → Doha",map:"Barcelona Airport Terminal 1",slots:[
      {label:"Noche",time:"22:15",title:"QR142 · Salida de Barcelona",desc:"Terminal 1. Llegar con 3–3,5 h de margen. Vuelo de 6 h a Doha."}
    ],transport:"BCN 22:15 → DOH 06:15 (+1). Equipaje facturado: 25 kg por adulto."},
    {date:"2026-11-03",city:"Tokio",sleep:"Tokio · hotel pendiente",title:"Doha → Tokio",map:"Haneda Airport Terminal 3",slots:[
      {label:"Mañana",time:"07:45",title:"QR812 · Salida de Doha",desc:"Conexión de 1 h 30 min. Vuelo de 10 h 10 min."},
      {label:"Noche",time:"23:55",title:"Llegada a Haneda",desc:"Terminal 3. Inmigración, equipaje y traslado al hotel de Tokio, aún pendiente de reservar."}
    ],transport:"DOH 07:45 → HND 23:55. Revisar el acceso nocturno al hotel cuando se reserve."},
    {date:"2026-11-04",city:"Tokio",sleep:"Tokio",title:"Tokio tradicional y popular",map:"Senso-ji Tokyo",slots:[
      {label:"Mañana",time:"08:30",title:"Asakusa y Sensō-ji",desc:"Kaminarimon, Nakamise-dori, templo y paseo junto al río Sumida."},
      {label:"Mediodía",time:"12:00",title:"Ueno y Ameyoko",desc:"Mercado-calle, comida picando y paseo por el parque, adaptable al jet lag."},
      {label:"Tarde-noche",time:"16:00",title:"Akihabara",desc:"Electrónica, recreativos y cultura pop. Cena informal en la zona."}
    ]},
    {date:"2026-11-05",city:"Tokio",sleep:"Tokio",title:"Tokio moderno",map:"Meiji Jingu",slots:[
      {label:"Mañana",time:"08:30",title:"Meiji Jingū y Harajuku",desc:"Bosque y santuario; después Takeshita, Cat Street y Omotesandō."},
      {label:"Tarde",time:"13:30",title:"Shibuya",desc:"Cruce, Hachikō, Parco y Miyashita Park. Shibuya Sky al atardecer."},
      {label:"Noche",time:"19:00",title:"Shinjuku",desc:"Omoide Yokochō, Kabukichō y Golden Gai. Evitar captadores."}
    ],transport:"Reservar Shibuya Sky en cuanto abra la venta."},
    {date:"2026-11-06",city:"Tokio",sleep:"Tokio",title:"Mercado, centro elegante y skyline",map:"Tsukiji Outer Market",slots:[
      {label:"Mañana",time:"08:30",title:"Tsukiji y Ginza",desc:"Mercado exterior, desayuno, Chuo-dori e Itoya si os apetece."},
      {label:"Mediodía",time:"12:45",title:"Yurakucho y Marunouchi",desc:"Comida bajo las vías o en Marunouchi."},
      {label:"Tarde-noche",time:"14:00",title:"Tokyo Station y Roppongi/Azabudai",desc:"Fachada de Marunouchi, exteriores del Palacio y vistas de Tokyo Tower."}
    ]},
    {date:"2026-11-07",city:"Tokio",sleep:"Tokio",title:"Tokio cotidiano",map:"Yanaka Ginza",slots:[
      {label:"Mañana",time:"09:30",title:"Yanaka y Sendagi",desc:"Nippori, cementerio, callejones residenciales y comercios de Yanaka Ginza."},
      {label:"Tarde",time:"14:30",title:"Kiyosumi-Shirakawa",desc:"Cafés, canales y jardín Kiyosumi opcional."},
      {label:"Tarde-noche",time:"17:30",title:"Monzen-Nakachō",desc:"Santuario, shotengai, izakayas y supermercado de barrio."}
    ]},
    {date:"2026-11-08",city:"Tokio",sleep:"Tokio",title:"Día colchón",map:"Daikanyama Tokyo",slots:[
      {label:"Mañana",time:"Sin alarma",title:"Desayuno tranquilo",desc:"Decidir según energía y lo que os haya gustado más."},
      {label:"Opción A",time:"11:30",title:"Daikanyama y Nakameguro",desc:"Tiendas, librerías, cafés y paseo junto al canal. Opción preferida."},
      {label:"Opción B",time:"11:00",title:"Kagurazaka",desc:"Callejones, comercios y cafés. Por la tarde, repetir vuestro barrio favorito."}
    ]},
    {date:"2026-11-09",city:"Kanazawa",sleep:"Daiwa Roynet Kanazawa",title:"Tokio → Kanazawa",map:"Daiwa Roynet Hotel Kanazawa Eki Nishiguchi",slots:[
      {label:"Mañana",time:"07:30–12:00",title:"Hokuriku Shinkansen",desc:"Tokyo Station → Kanazawa en Kagayaki o Hakutaka directo. Comprar ekiben y reservar juntos."},
      {label:"Mediodía",time:"12:00",title:"Mercado Ōmichō",desc:"Dejar maletas y comer pescado, marisco o kaisendon."},
      {label:"Tarde",time:"14:00",title:"Higashi Chaya y Kazue-machi",desc:"Casas de té, artesanía, pan de oro y paseo junto al río."}
    ],transport:"Shinkansen directo, aprox. 2 h 30–3 h. Venta normalmente un mes antes."},
    {date:"2026-11-10",city:"Kanazawa",sleep:"Daiwa Roynet Kanazawa",title:"Jardines y barrio samurái",map:"Kenroku-en",slots:[
      {label:"Mañana",time:"08:00",title:"Kenroku-en y castillo",desc:"Entrar pronto al jardín y cruzar después al recinto del castillo."},
      {label:"Tarde",time:"13:30",title:"Nagamachi y Casa Nomura",desc:"Barrio samurái, canales y muros de tierra."},
      {label:"Última tarde",time:"16:30",title:"Museo o centro",desc:"Museo del Siglo XXI, artesanía o paseo tranquilo por el centro."}
    ]},
    {date:"2026-11-11",city:"Takayama",sleep:"Hotel Wood Takayama",title:"Shirakawa-go y Takayama",map:"Shirakawa-go Bus Terminal",slots:[
      {label:"Mañana",time:"07:30",title:"Bus Kanazawa → Shirakawa-go",desc:"Bus reservado desde Kanazawa Station. Presentarse 20–30 min antes."},
      {label:"Mañana-mediodía",time:"09:00–13:00",title:"Shirakawa-go",desc:"Consigna, mirador Shiroyama, pueblo, casas gassho-zukuri y comida temprana."},
      {label:"Mediodía",time:"13:30",title:"Bus a Takayama",desc:"Trayecto de unos 50 min. Check-in y primera vuelta por Sanmachi."}
    ],transport:"Reservar los dos tramos aproximadamente un mes antes y dejar 3–4 h para visitar el pueblo."},
    {date:"2026-11-12",city:"Takayama",sleep:"Hotel Wood Takayama",title:"Takayama sin prisas",map:"Miyagawa Morning Market",slots:[
      {label:"Mañana",time:"08:00",title:"Mercados matinales",desc:"Miyagawa y, si apetece, Jinya-mae. Desayuno y productos locales."},
      {label:"Media mañana",time:"10:00",title:"Takayama Jinya",desc:"Antiguo edificio administrativo, almacenes y salas de tatami."},
      {label:"Tarde",time:"14:00",title:"Hida no Sato o paseo libre",desc:"Excursión opcional o tarde tranquila en el centro."}
    ]},
    {date:"2026-11-13",city:"Okuhida",sleep:"Mozumo Ryokan",title:"Kamikōchi y ryokan",map:"Mozumo Okuhida",slots:[
      {label:"Muy temprano",time:"06:45",title:"Takayama → Hirayu",desc:"Bus local a Hirayu, dejar equipaje en Mozumo solo si está confirmado y continuar hacia Kamikōchi."},
      {label:"Mañana",time:"09:30–13:00",title:"Paseo corto por Kamikōchi",desc:"Taishō-ike, Tashiro Pond y Kappa Bridge. No alargar hasta Myōjin si compromete el regreso."},
      {label:"Tarde",time:"15:00",title:"Check-in en Mozumo",desc:"Onsen privado, descanso y cena kaiseki."}
    ],transport:"Horarios estacionales por confirmar. Objetivo: regresar a Hirayu entre 14:00 y 14:30."},
    {date:"2026-11-14",city:"Kioto",sleep:"Hotel Resol Trinity Kyoto",title:"Okuhida → Kioto",map:"Hotel Resol Trinity Kyoto",slots:[
      {label:"Mañana",time:"08:00",title:"Mozumo → Hirayu → Takayama",desc:"Desayuno, último onsen, check-out y bus hacia Takayama."},
      {label:"Media mañana-tarde",time:"10:30–15:30",title:"Takayama → Nagoya → Kioto",desc:"Limited Express Hida y conexión con Tokaido Shinkansen. Dejar 25–35 min en Nagoya."},
      {label:"Tarde-noche",time:"16:00",title:"Gion y cena",desc:"Check-in y paseo suave por Gion, Shirakawa y Hanamikoji."}
    ],transport:"El trayecto completo ronda 4–5 h. Reservar Hida y Shinkansen al abrir la venta."},
    {date:"2026-11-15",city:"Kioto",sleep:"Hotel Resol Trinity Kyoto",title:"Higashiyama y Camino del Filósofo",map:"Kiyomizu-dera",slots:[
      {label:"Muy temprano",time:"07:00",title:"Kiyomizu-dera, Sannenzaka y Ninenzaka",desc:"Empezar pronto y bajar hacia Gion. El paseo es el protagonista."},
      {label:"Media mañana",time:"10:30",title:"Gion y Yasaka",desc:"Kōdai-ji exterior, Maruyama Park, Yasaka Shrine y Gion."},
      {label:"Tarde",time:"13:30",title:"Camino del Filósofo",desc:"Ginkaku-ji, Eikan-dō y Nanzen-ji, priorizando según la luz y la energía."},
      {label:"Noche",time:"18:00",title:"Pontocho",desc:"Río Kamo y cena por Pontocho o Kawaramachi."}
    ]},
    {date:"2026-11-16",city:"Kioto",sleep:"Hotel Resol Trinity Kyoto",title:"Fushimi Inari y Nara",map:"Fushimi Inari Taisha",slots:[
      {label:"Muy temprano",time:"06:45",title:"Fushimi Inari",desc:"Torii hasta Yotsutsuji o vuelta antes. No hace falta alcanzar la cima."},
      {label:"Mañana-tarde",time:"10:30–16:30",title:"Nara",desc:"Parque, Tōdai-ji, Nigatsu-dō y Naramachi si queda energía."},
      {label:"Tarde-noche",time:"16:30",title:"Regreso a Kioto",desc:"Cena tranquila cerca del hotel. No añadir más visitas."}
    ],transport:"JR Nara Line; sin reserva, usando IC card."},
    {date:"2026-11-17",city:"Kioto",sleep:"Hotel Resol Trinity Kyoto",title:"Arashiyama y Pabellón Dorado",map:"Arashiyama Bamboo Forest",slots:[
      {label:"Muy temprano",time:"07:00",title:"Arashiyama",desc:"Bosque de bambú, Tenryū-ji opcional, río y puente Togetsukyō."},
      {label:"Mediodía",time:"11:30",title:"Comida en Arashiyama",desc:"Comer pronto antes del traslado."},
      {label:"Tarde",time:"13:00",title:"Traslado a Kinkaku-ji",desc:"Taxi práctico o Randen + bus; no volver al centro para cambiar."},
      {label:"Tarde",time:"15:00",title:"Kinkaku-ji",desc:"Recorrer el circuito del jardín y disfrutar del Pabellón Dorado."}
    ]},
    {date:"2026-11-18",city:"Kioto",sleep:"Hotel Resol Trinity Kyoto",title:"Nishiki y tarde-noche en Osaka",map:"Dotonbori Osaka",slots:[
      {label:"Mañana",time:"09:30",title:"Nishiki Market",desc:"Brunch de mercado, té, encurtidos, dulces y tiendas tradicionales."},
      {label:"Tarde",time:"14:00",title:"Osaka: Umeda o Shinsaibashi",desc:"Elegir Umeda o ir directamente a Amerikamura y Shinsaibashi."},
      {label:"Atardecer-noche",time:"17:00–22:00",title:"Dōtonbori y Namba",desc:"Neones, Hozenji Yokocho, takoyaki y okonomiyaki."},
      {label:"Noche",time:"22:00",title:"Regreso a Kioto",desc:"Volver en Hankyu o JR sin apurar el último tren."}
    ],transport:"Osaka es una excursión desde Kioto; no requiere reserva y se paga con IC card."},
    {date:"2026-11-19",city:"Tokio",sleep:"Tokio · hotel pendiente",title:"Kioto → Tokio",map:"Tokyo Station",slots:[
      {label:"Mañana",time:"09:00",title:"Kioto flexible",desc:"Nijō, compras, Palacio Imperial o repetir algo, sin alejarse demasiado."},
      {label:"Mediodía-tarde",time:"13:00",title:"Shinkansen a Tokio",desc:"Nozomi o Hikari directo. Elegir Tokyo o Shinagawa según el hotel final."},
      {label:"Tarde-noche",time:"17:00",title:"Cena libre en Tokio",desc:"Repetir conscientemente un barrio favorito; sin gran visita."}
    ],transport:"Reservar en SmartEX cuando abra la venta."},
    {date:"2026-11-20",city:"Tokio",sleep:"Avión",title:"Último día y Haneda",map:"Haneda Airport Terminal 3",slots:[
      {label:"Mañana",time:"Sin alarma",title:"Última mañana flexible",desc:"Compras finales o paseo por el barrio favorito. Dejar equipaje en el hotel."},
      {label:"Tarde",time:"12:00–18:00",title:"Un único plan",desc:"No alejarse, incluir una pausa larga y dejar energía para el viaje."},
      {label:"Tarde-noche",time:"18:00",title:"Cena final y equipaje",desc:"Cena temprana, recoger maletas y comprobar el trayecto."},
      {label:"Noche",time:"21:30",title:"Traslado a Haneda",desc:"Llegar unas 2,5–3 h antes del vuelo de la 01:25."}
    ],transport:"Keikyu, Tokyo Monorail o traslado directo según la ubicación del hotel."},
    {date:"2026-11-21",city:"Vuelo",sleep:"Barcelona",title:"Tokio → Doha → Barcelona",map:"Haneda Airport Terminal 3",slots:[
      {label:"Madrugada",time:"01:25",title:"QR813 · Haneda → Doha",desc:"Vuelo de 11 h 15 min. Llegada a Doha a las 06:40."},
      {label:"Mañana",time:"08:25",title:"QR145 · Doha → Barcelona",desc:"Conexión de 1 h 45 min. Llegada a Barcelona T1 a las 13:25."}
    ],transport:"Equipaje facturado: 25 kg por adulto."}
  ],
  bookings: [
    {id:"flight",kind:"flight",icon:"✈️",status:"confirmed",title:"Qatar Airways · Ida y vuelta",subtitle:"2 pasajeros · Economy · 25 kg por adulto",from:"BCN",to:"HND",dates:"2–21 nov",detail:"QR142 + QR812 · QR813 + QR145",emailId:"19ed47ac996354f5",map:"Haneda Airport Terminal 3"},
    {id:"tokyo1",kind:"hotel",icon:"🏨",status:"pending",title:"Hotel en Tokio · primera estancia",subtitle:"Zona por decidir · 6 noches",from:"Entrada",to:"Salida",dates:"3–9 nov",detail:"Pendiente de reservar",map:"Tokyo"},
    {id:"kanazawa",kind:"hotel",icon:"🏨",status:"confirmed",title:"Daiwa Roynet Kanazawa Eki Nishiguchi",subtitle:"2 noches · Doble Superior, 2 camas",from:"Entrada 14:00",to:"Salida 11:00",dates:"9–11 nov",detail:"Cargo automático pendiente · ¥49.438",emailId:"19f7b84b3f161740",map:"Daiwa Roynet Hotel Kanazawa Eki Nishiguchi"},
    {id:"takayama",kind:"hotel",icon:"🏨",status:"confirmed",title:"Hotel Wood Takayama",subtitle:"2 noches · Doble Estándar, 2 camas",from:"Entrada 15:00",to:"Salida 10:00",dates:"11–13 nov",detail:"Cargo automático pendiente · ¥54.000",emailId:"19f7b8e42677b352",map:"HOTEL WOOD TAKAYAMA"},
    {id:"mozumo",kind:"hotel",icon:"♨️",status:"confirmed",title:"Mozumo Ryokan",subtitle:"1 noche · llegada prevista 15:00",from:"Entrada",to:"Salida",dates:"13–14 nov",detail:"Pagado · ¥84.000",emailId:"19f5816e7a7d5474",map:"Mozumo Okuhida"},
    {id:"kyoto",kind:"hotel",icon:"🏨",status:"confirmed",title:"Hotel Resol Trinity Kyoto",subtitle:"5 noches · Habitación Doble Grande",from:"Entrada 15:00",to:"Salida 11:00",dates:"14–19 nov",detail:"Cargo automático pendiente · ¥172.525",emailId:"19f7ba12dc5b1898",map:"Hotel Resol Trinity Kyoto"},
    {id:"tokyo2",kind:"hotel",icon:"🏨",status:"pending",title:"Hotel en Tokio · última noche",subtitle:"Ubicación según estación y acceso a Haneda",from:"Entrada",to:"Salida",dates:"19–20 nov",detail:"Pendiente de reservar",map:"Tokyo"},
    {id:"tokyokanazawa",kind:"transport",icon:"🚄",status:"pending",title:"Tokyo → Kanazawa",subtitle:"Hokuriku Shinkansen · Kagayaki/Hakutaka",from:"Tokyo",to:"Kanazawa",dates:"9 nov",detail:"Comprar al abrir la venta",url:"https://www.eki-net.com/en/jreast-train-reservation/Top/Index"},
    {id:"shirakawa",kind:"transport",icon:"🚌",status:"pending",title:"Kanazawa → Shirakawa-go → Takayama",subtitle:"Buses Nohi/Hokutetsu · dejar 3–4 h en Shirakawa-go",from:"Kanazawa",to:"Takayama",dates:"11 nov",detail:"Reserva necesaria",url:"https://japanbusonline.com/en/CourseSearch/11900040002"},
    {id:"kamikochi",kind:"transport",icon:"🚌",status:"pending",title:"Takayama → Hirayu → Kamikōchi",subtitle:"Buses locales de temporada",from:"Takayama",to:"Kamikōchi",dates:"13 nov",detail:"Confirmar horarios; compra local",url:"https://www.nouhibus.co.jp/route_bus/kamikochi-line-en/"},
    {id:"kyototrain",kind:"transport",icon:"🚄",status:"pending",title:"Takayama → Nagoya → Kioto",subtitle:"Limited Express Hida + Tokaido Shinkansen",from:"Takayama",to:"Kioto",dates:"14 nov",detail:"Reservar al abrir la venta",url:"https://smart-ex.jp/en/"},
    {id:"osakaday",kind:"transport",icon:"🚆",status:"pending",title:"Kioto → Osaka → Kioto",subtitle:"Hankyu o JR · excursión desde Kioto",from:"Kioto",to:"Osaka",dates:"18 nov",detail:"Sin reserva; pagar con IC card",url:"https://www.hankyu.co.jp/global/en/"},
    {id:"tokyoreturn",kind:"transport",icon:"🚄",status:"pending",title:"Kioto → Tokio",subtitle:"Tokaido Shinkansen",from:"Kioto",to:"Tokio",dates:"19 nov",detail:"Reservar en SmartEX",url:"https://smart-ex.jp/en/"}
  ],
  seedExpenses: [
    {id:"seed-flight",fixed:true,date:"2026-06-17",description:"Vuelos Qatar Airways · 2 personas",amount:1584.36,currency:"EUR",category:"Vuelos",payer:"Común",method:"Tarjeta",paid:true,notes:"BCN–DOH–HND ida y vuelta"},
    {id:"seed-kanazawa",fixed:true,date:"2026-11-09",description:"Daiwa Roynet Kanazawa · 2 noches",amount:49438,currency:"JPY",category:"Alojamiento",payer:"Común",method:"Tarjeta",paid:false,notes:"Cargo automático pendiente"},
    {id:"seed-takayama",fixed:true,date:"2026-11-11",description:"Hotel Wood Takayama · 2 noches",amount:54000,currency:"JPY",category:"Alojamiento",payer:"Común",method:"Tarjeta",paid:false,notes:"Cargo automático pendiente"},
    {id:"seed-mozumo",fixed:true,date:"2026-07-13",description:"Mozumo Ryokan · 1 noche",amount:84000,currency:"JPY",category:"Alojamiento",payer:"Común",method:"Tarjeta",paid:true,notes:"Pagado al reservar"},
    {id:"seed-kyoto",fixed:true,date:"2026-11-14",description:"Hotel Resol Trinity Kyoto · 5 noches",amount:172525,currency:"JPY",category:"Alojamiento",payer:"Común",method:"Tarjeta",paid:false,notes:"Cargo automático pendiente"}
  ]
};
