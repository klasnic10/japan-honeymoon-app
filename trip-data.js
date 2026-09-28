"use strict";

// Copia normalizada de “Viaje Japón 2026”.
// Fuente: Resumen, Detalle del viaje y Transportes y reservas.
// Última sincronización manual: 2026-07-20.
window.TRIP_DATA = {
  source: {
    spreadsheetId: "18hY04omi7OXIXVbWBiuDK10Jn0kbM_OPNQpeBMrvFL8",
    updatedAt: "2026-09-28T15:05:00Z"
  },
  days: [
    {date:"2026-11-02",city:"Vuelo",sleep:"Avión",title:"Barcelona → Doha",map:"Barcelona Airport Terminal 1",slots:[
      {label:"Noche",time:"22:15",title:"QR142 · Salida de Barcelona",desc:"Terminal 1. Llegar con 3–3,5 h de margen. Vuelo de 6 h a Doha."}
    ],transport:"BCN 22:15 → DOH 06:15 (+1). Equipaje facturado: 25 kg por adulto."},
    {date:"2026-11-03",city:"Tokio",sleep:"Tokio · hotel pendiente",title:"Doha → Tokio",map:"Haneda Airport Terminal 3",slots:[
      {label:"Mañana",time:"07:25",title:"QR812 · Salida de Doha",desc:"Horario actualizado por Qatar Airways. Conexión en Doha y vuelo a Haneda."},
      {label:"Noche",time:"22:55",title:"Llegada a Haneda",desc:"Terminal 3. Inmigración, equipaje y taxi al Airbnb aLATO Hatsudai c02."}
    ],transport:"DOH 07:25 → HND 22:55. Horario actualizado por Qatar Airways el 11/08/2026."},
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
    {date:"2026-11-11",city:"Takayama",sleep:"Hotel Wood Takayama",title:"Kanazawa → Shirakawa-go → Takayama en coche",map:"Shirakawa-go",slots:[
      {label:"Mañana",time:"08:00",title:"Recogida del coche en Kanazawa",desc:"Toyota Rent a Car · salida este de Kanazawa Station. Corolla Sport Hybrid C3, AT y 2WD. Revisar el coche y familiarizarse unos minutos con la conducción por la izquierda."},
      {label:"Mañana-mediodía",time:"09:30–12:30",title:"Shirakawa-go",desc:"Llegada en coche, aparcar y visitar el mirador Shiroyama, el pueblo y las casas gassho-zukuri. Comer antes de salir."},
      {label:"Mediodía-tarde",time:"13:00",title:"Shirakawa-go → Takayama",desc:"Continuar en coche hasta Takayama. Check-in y primera vuelta por Sanmachi con la tarde libre."}
    ],transport:"Toyota Rent a Car reservado del 11/11 08:00 al 14/11 17:00. ETC incluida. Neumáticos de invierno pendientes de confirmar."},
    {date:"2026-11-12",city:"Takayama",sleep:"Hotel Wood Takayama",title:"Takayama sin prisas",map:"Miyagawa Morning Market",slots:[
      {label:"Mañana",time:"08:00",title:"Mercados matinales",desc:"Miyagawa y, si apetece, Jinya-mae. Desayuno y productos locales."},
      {label:"Media mañana",time:"10:00",title:"Takayama Jinya",desc:"Antiguo edificio administrativo, almacenes y salas de tatami."},
      {label:"Tarde",time:"14:00",title:"Hida no Sato o paseo libre",desc:"Excursión opcional o tarde tranquila en el centro."}
    ]},
    {date:"2026-11-13",city:"Okuhida",sleep:"Mozumo Ryokan",title:"Kamikōchi y ryokan con coche",map:"Mozumo Okuhida",slots:[
      {label:"Muy temprano",time:"07:00",title:"Takayama → Hirayu / Akandana",desc:"Salir en coche hacia Okuhida. Aparcar en Hirayu o Akandana; los coches particulares no entran en Kamikōchi."},
      {label:"Mañana",time:"09:00–13:00",title:"Paseo corto por Kamikōchi",desc:"Subir en bus desde Hirayu/Akandana. Taishō-ike, Tashiro Pond y Kappa Bridge. No alargar hasta Myōjin si compromete el regreso."},
      {label:"Tarde",time:"15:00",title:"Check-in en Mozumo",desc:"Recoger el coche, trayecto corto hasta Mozumo, onsen privado, descanso y cena kaiseki."}
    ],transport:"Coche Takayama → Hirayu/Akandana; bus local obligatorio para entrar en Kamikōchi. Neumáticos de invierno pendientes de confirmar con Toyota."},
    {date:"2026-11-14",city:"Kioto",sleep:"Apartment Hotel 11 Gion",title:"Okuhida → Takayama → Kioto",map:"Apartment Hotel 11 Gion Kyoto",slots:[
      {label:"Mañana",time:"08:00",title:"Mozumo → Takayama en coche",desc:"Desayuno, último onsen, check-out y regreso tranquilo a Takayama."},
      {label:"Media mañana",time:"10:30",title:"Devolver el coche en Takayama Station",desc:"Toyota permite devolverlo hasta las 17:00, pero conviene entregarlo por la mañana para aprovechar Kioto. Repostar antes de la devolución salvo que uséis el sistema de combustible de Toyota."},
      {label:"Mediodía-tarde",time:"11:30–16:00",title:"Takayama → Nagoya → Kioto",desc:"Limited Express Hida y conexión con Tokaido Shinkansen. Dejar 25–35 min en Nagoya."},
      {label:"Tarde-noche",time:"16:30",title:"Gion y cena",desc:"Check-in y paseo suave por Gion, Shirakawa y Hanamikoji."}
    ],transport:"Coche reservado hasta las 17:00, aunque el plan es devolverlo antes. Después, Limited Express Hida + Tokaido Shinkansen."},
    {date:"2026-11-15",city:"Kioto",sleep:"Apartment Hotel 11 Gion",title:"Higashiyama y Camino del Filósofo",map:"Kiyomizu-dera",slots:[
      {label:"Muy temprano",time:"07:00",title:"Kiyomizu-dera, Sannenzaka y Ninenzaka",desc:"Empezar pronto y bajar hacia Gion. El paseo es el protagonista."},
      {label:"Media mañana",time:"10:30",title:"Gion y Yasaka",desc:"Kōdai-ji exterior, Maruyama Park, Yasaka Shrine y Gion."},
      {label:"Tarde",time:"13:30",title:"Camino del Filósofo",desc:"Ginkaku-ji, Eikan-dō y Nanzen-ji, priorizando según la luz y la energía."},
      {label:"Noche",time:"18:00",title:"Pontocho",desc:"Río Kamo y cena por Pontocho o Kawaramachi."}
    ]},
    {date:"2026-11-16",city:"Kioto",sleep:"Apartment Hotel 11 Gion",title:"Fushimi Inari y Nara",map:"Fushimi Inari Taisha",slots:[
      {label:"Muy temprano",time:"06:45",title:"Fushimi Inari",desc:"Torii hasta Yotsutsuji o vuelta antes. No hace falta alcanzar la cima."},
      {label:"Mañana-tarde",time:"10:30–16:30",title:"Nara",desc:"Parque, Tōdai-ji, Nigatsu-dō y Naramachi si queda energía."},
      {label:"Tarde-noche",time:"16:30",title:"Regreso a Kioto",desc:"Cena tranquila cerca del hotel. No añadir más visitas."}
    ],transport:"JR Nara Line; sin reserva, usando IC card."},
    {date:"2026-11-17",city:"Osaka",sleep:"Apartment Hotel 11 Gion",title:"Osaka de día completo",map:"Dotonbori Osaka",slots:[
      {label:"Mañana",time:"08:15",title:"Gion → Kuromon Market",desc:"Salir desde Gion y entrar en Osaka por Keihan/metro. Empezar en Kuromon con mercado, desayuno tardío y primeras calles de Namba/Nipponbashi."},
      {label:"Mediodía",time:"11:30",title:"Shinsekai y comida",desc:"Bajar a Shinsekai para ver la Osaka más retro y comer kushikatsu, okonomiyaki o lo que apetezca sin reservar demasiado."},
      {label:"Tarde",time:"14:30",title:"Amerikamura y Shinsaibashi",desc:"Subir hacia Amerikamura, Triangle Park y las calles laterales de Shinsaibashi. Umeda queda opcional si queréis arquitectura/centros comerciales."},
      {label:"Atardecer-noche",time:"17:30–22:00",title:"Dōtonbori y Namba",desc:"Canal, Hozenji Yokocho, neones, takoyaki y cena. Volver a Gion después de cenar sin apurar el último tren."}
    ],transport:"Excursión de día completo desde Gion. No requiere tren reservado: usar IC card y elegir Keihan/Hankyu según el trayecto del día."},
    {date:"2026-11-18",city:"Kioto",sleep:"Apartment Hotel 11 Gion",title:"Nishiki, Nijō y Palacio Imperial",map:"Nijo Castle Kyoto",slots:[
      {label:"Mañana",time:"09:30",title:"Nishiki Market",desc:"Brunch de mercado, té, encurtidos, dulces y tiendas tradicionales."},
      {label:"Mediodía",time:"12:00",title:"Castillo de Nijō",desc:"Palacio Ninomaru y jardines. Una visita histórica distinta a los templos."},
      {label:"Tarde",time:"14:45",title:"Palacio Imperial y Kyoto Gyoen",desc:"Visita autoguiada y paseo por el parque imperial."},
      {label:"Tarde-noche",time:"17:00",title:"Teramachi / Shinkyogoku / Gion",desc:"Compras, café y tarde ligera cerca del apartamento."}
    ],transport:"Día compacto en el centro de Kioto, sin grandes desplazamientos."},
    {date:"2026-11-19",city:"Kioto",sleep:"Apartment Hotel 11 Gion",title:"Arashiyama, Kinkaku-ji y última noche en Kioto",map:"Arashiyama Bamboo Forest",slots:[
      {label:"Muy temprano",time:"07:00",title:"Arashiyama",desc:"Bosque de bambú, Tenryū-ji opcional, río y puente Togetsukyō antes de las multitudes."},
      {label:"Mediodía",time:"11:30",title:"Comida y traslado a Kinkaku-ji",desc:"Comer pronto en Arashiyama o cerca de Kinkaku-ji y trasladarse en taxi para ahorrar tiempo."},
      {label:"Tarde",time:"14:30",title:"Kinkaku-ji",desc:"Recorrer el circuito del Pabellón Dorado y sus jardines."},
      {label:"Noche",time:"17:00",title:"Última tarde y cena en Gion/Pontocho",desc:"Volver al apartamento, compras finales si queda algo y última cena en Kioto. Preparar maletas para el Shinkansen del día 20."}
    ],transport:"Arashiyama y Kinkaku-ji ocupan el último día completo; taxi entre ambos es la opción más cómoda. Última noche en Apartment Hotel 11 Gion."},
    {date:"2026-11-20",city:"Tokio",sleep:"Avión",title:"Kioto → Tokio y últimas horas antes de Haneda",map:"Shinagawa Station Tokyo",slots:[
      {label:"Mañana",time:"08:00",title:"Check-out y Shinkansen a Tokio",desc:"Salir del apartamento con las maletas, taxi a Kyoto Station y tomar un Nozomi de mañana. Objetivo: llegar a Shinagawa alrededor de las 11:00–11:30."},
      {label:"Mediodía-tarde",time:"11:30–17:00",title:"Últimas horas: Ginza y Marunouchi",desc:"Dejar el equipaje en consigna en Shinagawa y hacer un último bloque fácil de compras, comida y paseo por Ginza/Marunouchi/Tokyo Station."},
      {label:"Tarde-noche",time:"17:00–19:30",title:"Cena temprana y recoger equipaje",desc:"Cena sin sobremesa larga y regreso a Shinagawa para recoger las maletas."},
      {label:"Noche",time:"19:45–20:30",title:"Shinagawa → Haneda",desc:"Keikyu directo a Haneda Terminal 3. Llegar alrededor de las 20:30 deja margen holgado para el QR813 de las 00:25."}
    ],transport:"Kioto → Shinagawa en Tokaido Shinkansen. Guardar equipaje en Shinagawa y volver allí antes de ir a Haneda en Keikyu."},
    {date:"2026-11-21",city:"Vuelo",sleep:"Barcelona",title:"Tokio → Doha → Barcelona",map:"Haneda Airport Terminal 3",slots:[
      {label:"Madrugada",time:"00:25",title:"QR813 · Haneda → Doha",desc:"Horario actualizado por Qatar Airways: salida 00:25 y llegada a Doha 06:50."},
      {label:"Mañana",time:"08:25",title:"QR145 · Doha → Barcelona",desc:"Conexión de 1 h 45 min. Llegada a Barcelona T1 a las 13:25."}
    ],transport:"Equipaje facturado: 25 kg por adulto."}
  ],
  bookings: [
    {id:"flight",kind:"flight",icon:"✈️",status:"confirmed",title:"Qatar Airways · Ida y vuelta",subtitle:"2 pasajeros · Economy · 25 kg por adulto",from:"BCN",to:"HND",dates:"2–21 nov",detail:"QR142 + QR812 · QR813 + QR145",emailId:"19ed47ac996354f5",map:"Haneda Airport Terminal 3"},
    {id:"tokyo1",kind:"hotel",icon:"🏨",status:"pending",title:"Hotel en Tokio · primera estancia",subtitle:"Zona por decidir · 6 noches",from:"Entrada",to:"Salida",dates:"3–9 nov",detail:"Pendiente de reservar",map:"Tokyo"},
    {id:"kanazawa",kind:"hotel",icon:"🏨",status:"confirmed",title:"Daiwa Roynet Kanazawa Eki Nishiguchi",subtitle:"2 noches · Doble Superior, 2 camas",from:"Entrada 14:00",to:"Salida 11:00",dates:"9–11 nov",detail:"Cargo automático pendiente · ¥49.438",emailId:"19f7b84b3f161740",map:"Daiwa Roynet Hotel Kanazawa Eki Nishiguchi"},
    {id:"takayama",kind:"hotel",icon:"🏨",status:"confirmed",title:"Hotel Wood Takayama",subtitle:"2 noches · Doble Estándar, 2 camas",from:"Entrada 15:00",to:"Salida 10:00",dates:"11–13 nov",detail:"Cargo automático pendiente · ¥54.000",emailId:"19f7b8e42677b352",map:"HOTEL WOOD TAKAYAMA"},
    {id:"mozumo",kind:"hotel",icon:"♨️",status:"confirmed",title:"Mozumo Ryokan",subtitle:"1 noche · llegada prevista 15:00",from:"Entrada",to:"Salida",dates:"13–14 nov",detail:"Pagado · ¥84.000",emailId:"19f5816e7a7d5474",map:"Mozumo Okuhida"},
    {id:"kyoto",kind:"hotel",icon:"🏨",status:"confirmed",title:"Apartment Hotel 11 Gion",subtitle:"6 noches · Habitación Familiar Deluxe · cocina",from:"Entrada desde 16:00",to:"Salida hasta 10:00",dates:"14–20 nov",detail:"Pendiente de pago · ¥225.738 · cancelación gratis hasta 08/11",emailId:"1a0e8668fca5f3ea",map:"Apartment Hotel 11 Gion Kyoto"},
    {id:"tokyokanazawa",kind:"transport",icon:"🚄",status:"pending",title:"Tokyo → Kanazawa",subtitle:"Hokuriku Shinkansen · Kagayaki/Hakutaka",from:"Tokyo",to:"Kanazawa",dates:"9 nov",detail:"Comprar al abrir la venta",url:"https://www.eki-net.com/en/jreast-train-reservation/Top/Index"},
    {id:"rentalcar",kind:"transport",icon:"🚗",status:"confirmed",title:"Toyota Rent a Car · Corolla Sport Hybrid",subtitle:"C3 · AT · 2WD · ETC + JAF · franquicia y NOC cubiertos",from:"Kanazawa",to:"Takayama",dates:"11–14 nov",detail:"Recogida 11/11 08:00 · devolución hasta 14/11 17:00 · ¥74.459 · neumáticos de invierno por confirmar",emailId:"1a0e71d0f15b0180",map:"Toyota Rent a Car Kanazawa Station East Exit"},
    {id:"kamikochi",kind:"transport",icon:"🚌",status:"pending",title:"Hirayu / Akandana → Kamikōchi",subtitle:"Aparcar el coche y continuar en bus local obligatorio",from:"Hirayu",to:"Kamikōchi",dates:"13 nov",detail:"Confirmar horarios de cierre de temporada; compra local",url:"https://www.nouhibus.co.jp/route_bus/kamikochi-line-en/"},
    {id:"kyototrain",kind:"transport",icon:"🚄",status:"pending",title:"Takayama → Nagoya → Kioto",subtitle:"Limited Express Hida + Tokaido Shinkansen",from:"Takayama",to:"Kioto",dates:"14 nov",detail:"Reservar al abrir la venta",url:"https://smart-ex.jp/en/"},
    {id:"osakaday",kind:"transport",icon:"🚆",status:"pending",title:"Kioto → Osaka → Kioto",subtitle:"Keihan/Hankyu · excursión de día completo",from:"Kioto",to:"Osaka",dates:"17 nov",detail:"Sin reserva; pagar con IC card",url:"https://www.hankyu.co.jp/global/en/"},
    {id:"tokyoreturn",kind:"transport",icon:"🚄",status:"pending",title:"Kioto → Tokio",subtitle:"Tokaido Shinkansen · salida por la mañana",from:"Kioto",to:"Tokio",dates:"20 nov",detail:"Reservar en SmartEX al abrir la venta",url:"https://smart-ex.jp/en/"}
  ],
  seedExpenses: [
    {id:"seed-flight",fixed:true,date:"2026-06-17",description:"Vuelos Qatar Airways · 2 personas",amount:1584.36,currency:"EUR",category:"Vuelos",payer:"Común",method:"Tarjeta",paid:true,notes:"BCN–DOH–HND ida y vuelta"},
    {id:"seed-kanazawa",fixed:true,date:"2026-11-09",description:"Daiwa Roynet Kanazawa · 2 noches",amount:49438,currency:"JPY",category:"Alojamiento",payer:"Común",method:"Tarjeta",paid:false,notes:"Cargo automático pendiente"},
    {id:"seed-takayama",fixed:true,date:"2026-11-11",description:"Hotel Wood Takayama · 2 noches",amount:54000,currency:"JPY",category:"Alojamiento",payer:"Común",method:"Tarjeta",paid:false,notes:"Cargo automático pendiente"},
    {id:"seed-mozumo",fixed:true,date:"2026-07-13",description:"Mozumo Ryokan · 1 noche",amount:84000,currency:"JPY",category:"Alojamiento",payer:"Común",method:"Tarjeta",paid:true,notes:"Pagado al reservar"},
    {id:"seed-rentalcar",fixed:true,date:"2026-09-28",description:"Toyota Rent a Car · Corolla Sport Hybrid C3",amount:74459,currency:"JPY",category:"Transporte",payer:"Común",method:"Tarjeta",paid:false,notes:"Reserva confirmada · pago online (cargo puede aplicarse antes de la salida) · Kanazawa 11/11 08:00 → Takayama 14/11 hasta 17:00 · one-way · ETC + JAF · franquicia/NOC cubiertos · neumáticos de invierno por confirmar"},
    {id:"seed-kyoto",fixed:true,date:"2026-11-14",description:"Apartment Hotel 11 Gion · 6 noches",amount:225738,currency:"JPY",category:"Alojamiento",payer:"Común",method:"Tarjeta",paid:false,notes:"Booking.com · Habitación Familiar Deluxe con cocina · pendiente de pago · cancelación gratis hasta 08/11"}
  ]
};
