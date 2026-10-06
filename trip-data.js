"use strict";

// Copia normalizada de “Viaje Japón 2026”.
// Fuente: Resumen, Detalle del viaje y Transportes y reservas.
// Última sincronización manual: 2026-07-20.
window.TRIP_DATA = {
  source: {
    spreadsheetId: "18hY04omi7OXIXVbWBiuDK10Jn0kbM_OPNQpeBMrvFL8",
    updatedAt: "2026-10-06T07:40:00Z"
  },
  days: [
    {date:"2026-11-02",city:"Vuelo",sleep:"Avión",title:"Barcelona → Doha",map:"Barcelona Airport Terminal 1",slots:[
      {label:"Noche",time:"22:15",title:"QR142 · Salida de Barcelona",desc:"Terminal 1. Llegar con 3–3,5 h de margen. Vuelo de 6 h a Doha."}
    ],transport:"BCN 22:15 → DOH 06:15 (+1). Equipaje facturado: 25 kg por adulto."},
    {date:"2026-11-03",city:"Tokio",sleep:"Airbnb aLATO Hatsudai c02",title:"Doha → Tokio",map:"Haneda Airport Terminal 3",slots:[
      {label:"Mañana",time:"07:25",title:"QR812 · Salida de Doha",desc:"Horario actualizado por Qatar Airways. Conexión en Doha y vuelo a Haneda."},
      {label:"Noche",time:"22:55",title:"Llegada a Haneda",desc:"Terminal 3. Inmigración, equipaje y taxi al Airbnb aLATO Hatsudai c02."}
    ],transport:"DOH 07:25 → HND 22:55. Horario actualizado por Qatar Airways el 11/08/2026."},
    {date:"2026-11-04",city:"Tokio",sleep:"Airbnb aLATO Hatsudai c02",title:"Asakusa, Kappabashi, Ueno y Akihabara",map:"Kappabashi Dougu Street Tokyo",slots:[
      {label:"Mañana",time:"08:30–10:30",title:"Sensō-ji y entorno",desc:"Entrar por Kaminarimon, recorrer Nakamise-dori, visitar el templo y pasear por las calles laterales."},
      {label:"Media mañana",time:"10:30–11:30",title:"Paseo junto al río Sumida",desc:"Paseo fluvial con vistas de Tokyo Skytree y contraste entre Asakusa y el Tokio moderno."},
      {label:"Media mañana",time:"11:30–12:30",title:"Primer vistazo a Kappabashi",desc:"Primera pasada por tiendas de vajilla, cuchillos, cristalería y utensilios. Marcar favoritos para volver el día 8."},
      {label:"Mediodía",time:"13:00–14:30",title:"Mercado-calle Ameyoko",desc:"Puestos de comida, pescado, snacks, ropa y tiendas populares. Comer aquí o picar por el mercado."},
      {label:"Tarde",time:"14:30–15:30",title:"Parque de Ueno y alrededores",desc:"Paseo por el parque, estanques y zona cultural; bloque fácil de recortar si pesa el jet lag."},
      {label:"Tarde-noche",time:"16:00–20:00",title:"Electrónica, recreativos y cultura pop",desc:"Recorrer Akihabara, entrar en recreativos y elegir unas pocas tiendas de electrónica, manga o coleccionismo."}
    ]},
    {date:"2026-11-05",city:"Tokio",sleep:"Airbnb aLATO Hatsudai c02",title:"Meiji Jingū, Harajuku, Shibuya y Shinjuku",map:"Meiji Jingu",slots:[
      {label:"Mañana",time:"08:30–10:30",title:"Bosque y santuario Meiji",desc:"Entrar por Harajuku y recorrer con calma el bosque hasta el santuario principal."},
      {label:"Media mañana",time:"10:30–13:00",title:"Takeshita-dori, calles laterales y Omotesandō",desc:"Harajuku, Cat Street y Omotesandō, priorizando calles laterales frente a colas virales."},
      {label:"Tarde",time:"13:30–17:00",title:"Cruce, Hachikō, Parco y Miyashita Park",desc:"Recorrer el núcleo de Shibuya antes del mirador."},
      {label:"Atardecer",time:"17:00–18:30",title:"Shibuya Sky",desc:"Subida al mirador para ver el cambio de luz y la ciudad encendiéndose."},
      {label:"Noche",time:"19:00–23:00",title:"Omoide Yokochō, Kabukichō y Golden Gai",desc:"Cena, neones y callejones de Shinjuku; evitar captadores."}
    ],transport:"Reservar Shibuya Sky en cuanto abra la venta."},
    {date:"2026-11-06",city:"Tokio",sleep:"Airbnb aLATO Hatsudai c02",title:"Tsukiji, Ginza, Marunouchi y Roppongi",map:"Tsukiji Outer Market",slots:[
      {label:"Mañana",time:"08:30–10:30",title:"Mercado exterior de Tsukiji",desc:"Desayuno y recorrido por puestos de comida, pescado y productos de cocina."},
      {label:"Media mañana",time:"10:45–12:30",title:"Paseo por Ginza",desc:"Chuo-dori, Ginza Six e Itoya si os apetece."},
      {label:"Mediodía",time:"12:45–14:00",title:"Comida bajo las vías o zona Marunouchi",desc:"Elegir entre ambiente popular en Yurakucho o una comida más tranquila en Marunouchi."},
      {label:"Tarde",time:"14:00–16:30",title:"Estación de Tokio y exteriores del Palacio Imperial",desc:"Fachada Marunouchi, distrito financiero y jardines exteriores del Palacio."},
      {label:"Atardecer-noche",time:"17:00–21:30",title:"Roppongi Hills, Azabudai Hills y vistas de Tokyo Tower",desc:"Arquitectura moderna, vistas de Tokyo Tower y cena por la zona."}
    ]},
    {date:"2026-11-07",city:"Tokio",sleep:"Airbnb aLATO Hatsudai c02",title:"Yanaka, Kiyosumi-Shirakawa y Monzen-Nakachō",map:"Yanaka Ginza",slots:[
      {label:"Mañana",time:"09:30–12:30",title:"Tokio de barrio: Yanaka, cementerio y Yanaka Ginza",desc:"Nippori, cementerio, callejones residenciales y comercios de Yanaka Ginza."},
      {label:"Mediodía",time:"12:30–14:00",title:"Comida local",desc:"Soba, curry, tonkatsu o menú del día por Yanaka/Sendagi."},
      {label:"Tarde",time:"14:30–17:30",title:"Cafés, canales y jardín Kiyosumi",desc:"Paseo por Kiyosumi-Shirakawa, café de especialidad y jardín opcional."},
      {label:"Tarde-noche",time:"17:30–21:00",title:"Santuario, shotengai e izakayas",desc:"Monzen-Nakachō, Tomioka Hachimangū, calles comerciales y cena local."},
      {label:"Extra",time:"19:00–19:30",title:"Entrar en un supermercado grande",desc:"Ver preparados, pescados, productos de temporada y descuentos de última hora."}
    ]},
    {date:"2026-11-08",city:"Tokio",sleep:"Airbnb aLATO Hatsudai c02",title:"Kappabashi: compras grandes y tarde flexible",map:"Kappabashi Dougu Street Tokyo",slots:[
      {label:"Mañana",time:"10:00–14:00",title:"Compras para casa en Kappabashi",desc:"Volver a los favoritos del día 4 y comprar vajilla, cuchillos, cristalería y utensilios con calma."},
      {label:"Mediodía",time:"14:00–15:00",title:"Dejar las compras y reorganizar equipaje",desc:"Taxi al apartamento, guardar lo frágil y revisar espacio en las maletas."},
      {label:"Tarde",time:"15:30–19:00",title:"Paseo opcional después de las compras",desc:"Daikanyama y Nakameguro si queda energía; si Kappabashi se alarga, se elimina sin problema."},
      {label:"Noche",time:"19:00–21:30",title:"Cena y preparar salida a Kanazawa",desc:"Cena tranquila y maletas listas para el Shinkansen del día 9."}
    ],transport:"Kappabashi es la prioridad del día. El día 4 comprobad qué tiendas favoritas abren el domingo 8."},
    {date:"2026-11-09",city:"Kanazawa",sleep:"Daiwa Roynet Hotel Kanazawa Eki Nishiguchi",title:"Hokuriku Shinkansen y primera tarde en Kanazawa",map:"Daiwa Roynet Hotel Kanazawa Eki Nishiguchi",slots:[
      {label:"Mañana",time:"07:30–12:00",title:"Hokuriku Shinkansen",desc:"Check-out, traslado a Tokyo Station y Kagayaki/Hakutaka directo a Kanazawa."},
      {label:"Mediodía",time:"12:00–14:00",title:"Llegada, maletas y mercado Omicho",desc:"Dejar equipaje y comer pescado, marisco o donburi en Omicho."},
      {label:"Tarde",time:"14:00–17:30",title:"Higashi Chaya y Kazue-machi",desc:"Casas de té, artesanía, pan de oro y paseo junto al río."},
      {label:"Noche",time:"18:00–21:00",title:"Cena y paseo nocturno",desc:"Cena tranquila y paseo breve por el centro."}
    ],transport:"Hokuriku Shinkansen directo a Kanazawa. Reservar cuando abra la venta."},
    {date:"2026-11-10",city:"Kanazawa",sleep:"Daiwa Roynet Hotel Kanazawa Eki Nishiguchi",title:"Kenroku-en, castillo y Nagamachi",map:"Kenroku-en",slots:[
      {label:"Mañana",time:"08:00–11:30",title:"Kenroku-en y castillo",desc:"Entrar pronto en Kenroku-en y cruzar después al recinto del castillo."},
      {label:"Mediodía",time:"11:45–13:15",title:"Comida",desc:"Comer cerca del jardín, en Korinbo o volver a Omicho si quedó pendiente."},
      {label:"Tarde",time:"13:30–16:30",title:"Nagamachi y Casa Nomura",desc:"Barrio samurái, canales y muros de tierra."},
      {label:"Última tarde",time:"16:30–18:30",title:"Museo del Siglo XXI o centro",desc:"Arte contemporáneo, artesanía o paseo tranquilo."},
      {label:"Noche",time:"18:30–21:30",title:"Cena final en Kanazawa",desc:"Cena y preparar el día siguiente con documentación y equipaje del coche."}
    ]},
    {date:"2026-11-11",city:"Takayama",sleep:"Hotel Wood Takayama",title:"Toyota, Shirakawa-go y primera tarde en Takayama",map:"Shirakawa-go",slots:[
      {label:"Mañana",time:"08:00–09:30",title:"Recogida del Toyota y salida",desc:"Check-out, caminar a Toyota Rent a Car, recoger el Corolla Sport Hybrid y salir hacia Shirakawa-go."},
      {label:"Mañana-mediodía",time:"09:30–12:30",title:"Pueblo y mirador",desc:"Aparcar, subir a Shiroyama y recorrer el pueblo y las casas gassho-zukuri."},
      {label:"Mediodía",time:"13:00–14:00",title:"Conducción a Takayama",desc:"Salir de Shirakawa-go y conducir hasta Takayama."},
      {label:"Tarde",time:"14:30–18:00",title:"Check-in y primera vuelta por Sanmachi",desc:"Dejar maletas y recorrer el casco antiguo con calma."},
      {label:"Noche",time:"18:00–21:30",title:"Cena de Hida beef",desc:"Yakiniku, sukiyaki o restaurante especializado en carne de Hida."}
    ],transport:"Toyota Rent a Car reservado. ETC incluida. Neumáticos de invierno pendientes de confirmar."},
    {date:"2026-11-12",city:"Takayama",sleep:"Hotel Wood Takayama",title:"Mercados, Takayama Jinya y casco antiguo",map:"Miyagawa Morning Market",slots:[
      {label:"Mañana",time:"08:00–10:00",title:"Mercados matinales",desc:"Miyagawa y, si apetece, Jinya-mae. Desayuno y productos locales."},
      {label:"Media mañana",time:"10:00–12:00",title:"Takayama Jinya",desc:"Antiguo edificio administrativo, almacenes y salas de tatami."},
      {label:"Mediodía",time:"12:00–14:00",title:"Casco antiguo y comida",desc:"Sanmachi, bodegas de sake y comida por el centro."},
      {label:"Tarde",time:"14:00–17:00",title:"Hida no Sato o paseo libre",desc:"Excursión opcional o tarde tranquila en Takayama."},
      {label:"Noche",time:"17:30–21:00",title:"Cena temprana y preparación",desc:"Cena y preparar la salida temprana hacia Kamikōchi."}
    ]},
    {date:"2026-11-13",city:"Okuhida",sleep:"Mozumo Ryokan",title:"Kamikōchi y Mozumo Ryokan",map:"Mozumo Okuhida",slots:[
      {label:"Muy temprano",time:"07:00–08:15",title:"Conducción hacia Kamikōchi",desc:"Salir de Takayama en coche hacia Hirayu/Akandana con todo el equipaje."},
      {label:"Mañana",time:"08:15–09:00",title:"Aparcar y preparar el bus",desc:"Dejar el coche y llevar solo mochila pequeña."},
      {label:"Mañana",time:"09:00–09:30",title:"Bus de montaña",desc:"Bus local hacia Kamikōchi; bajar en Taishō-ike si el servicio lo permite."},
      {label:"Mañana-mediodía",time:"09:30–13:00",title:"Paseo corto por el valle",desc:"Taishō-ike, Tashiro Pond y Kappa Bridge."},
      {label:"Mediodía",time:"13:00–14:00",title:"Regreso al coche",desc:"Bus local de vuelta a Hirayu/Akandana."},
      {label:"Tarde-noche",time:"14:15 en adelante",title:"Coche, check-in, onsen y cena kaiseki",desc:"Recoger el coche, conducir a Mozumo y dedicar el resto del día al ryokan."}
    ],transport:"Coche hasta Hirayu/Akandana; bus local obligatorio para entrar en Kamikōchi."},
    {date:"2026-11-14",city:"Kioto",sleep:"Apartment Hotel 11 Gion",title:"Mozumo, devolución del coche y llegada a Kioto",map:"Apartment Hotel 11 Gion Kyoto",slots:[
      {label:"Mañana",time:"08:00–10:30",title:"Desayuno, check-out y regreso en coche",desc:"Desayuno, último onsen y regreso a Takayama para devolver el coche."},
      {label:"Media mañana-tarde",time:"11:00–16:00",title:"Limited Express Hida + Tokaido Shinkansen",desc:"Takayama → Nagoya en Hida y conexión con Shinkansen a Kioto."},
      {label:"Tarde-noche",time:"16:00–21:00",title:"Check-in en Apartment Hotel 11 Gion y paseo",desc:"Taxi desde Kyoto Station, check-in y paseo suave por Gion."}
    ],transport:"Devolver el Toyota por la mañana. Después Hida a Nagoya + Tokaido Shinkansen a Kioto."},
    {date:"2026-11-15",city:"Kioto",sleep:"Apartment Hotel 11 Gion",title:"Higashiyama sur y norte",map:"Kiyomizu-dera",slots:[
      {label:"Muy temprano",time:"07:00–10:30",title:"Kiyomizu-dera, Sannenzaka y Ninenzaka",desc:"Templo y descenso a pie por las calles históricas de Higashiyama."},
      {label:"Media mañana",time:"10:30–12:30",title:"Kōdai-ji exterior, Maruyama y Gion",desc:"Continuar a pie por Maruyama, Yasaka y Gion."},
      {label:"Tarde",time:"13:30–17:30",title:"Ginkaku-ji, Camino del Filósofo, Eikan-dō y Nanzen-ji",desc:"Recorrido de norte a sur priorizando según luz y energía."},
      {label:"Noche",time:"18:00–21:30",title:"Paseo y cena",desc:"Pontocho/Kawaramachi para terminar el día junto al Kamo."}
    ]},
    {date:"2026-11-16",city:"Kioto",sleep:"Apartment Hotel 11 Gion",title:"Fushimi Inari y Nara",map:"Fushimi Inari Taisha",slots:[
      {label:"Muy temprano",time:"06:45–09:15",title:"Sendero de torii",desc:"Subir por Fushimi Inari hasta Yotsutsuji y regresar."},
      {label:"Mañana",time:"09:30–10:30",title:"Tren a Nara",desc:"JR Nara Line hasta JR Nara."},
      {label:"Mañana-tarde",time:"10:30–16:30",title:"Parque, Tōdai-ji, Nigatsu-dō y Naramachi",desc:"Recorrido a pie por los grandes imprescindibles de Nara."},
      {label:"Tarde-noche",time:"16:30–19:00",title:"Regreso y cena tranquila",desc:"Volver a Kioto y cenar cerca del apartamento."}
    ],transport:"JR Nara Line; sin reserva, usando IC card."},
    {date:"2026-11-17",city:"Osaka",sleep:"Apartment Hotel 11 Gion",title:"Kuromon, Shinsekai y Minami de día completo",map:"Dotonbori Osaka",slots:[
      {label:"Mañana",time:"08:15–11:30",title:"Salida desde Gion + Kuromon Market",desc:"Entrar en Osaka por Keihan + metro y empezar en Kuromon/Nippombashi."},
      {label:"Mediodía",time:"11:30–14:00",title:"Barrio retro y comida",desc:"Shinsekai, Janjan Yokocho y comida por la zona."},
      {label:"Tarde",time:"14:30–17:30",title:"Calles, tiendas y ambiente urbano",desc:"Amerikamura, Triangle Park y Shinsaibashi."},
      {label:"Atardecer-noche",time:"17:30–22:00",title:"Neones, Hozenji y cena",desc:"Dōtonbori, Hozenji Yokocho y Namba."},
      {label:"Noche",time:"22:00–23:15",title:"Regreso a Kioto",desc:"Metro + Keihan o Hankyu de vuelta a Gion."}
    ],transport:"Excursión de día completo; sin reserva, usando IC card."},
    {date:"2026-11-18",city:"Kioto",sleep:"Apartment Hotel 11 Gion",title:"Nishiki, Nijō y Palacio Imperial",map:"Nijo Castle Kyoto",slots:[
      {label:"Mañana",time:"09:30–11:30",title:"Nishiki Market",desc:"Mercado, brunch y tiendas tradicionales."},
      {label:"Mediodía",time:"12:00–14:15",title:"Castillo de Nijō",desc:"Palacio Ninomaru y jardines."},
      {label:"Tarde",time:"14:45–16:45",title:"Palacio Imperial de Kioto",desc:"Visita autoguiada y paseo por Kyoto Gyoen."},
      {label:"Tarde-noche",time:"17:00–19:30",title:"Compras y paseo",desc:"Teramachi y Shinkyogoku."},
      {label:"Noche",time:"19:30–21:30",title:"Cena tranquila",desc:"Gion/Pontocho/Kawaramachi y regreso a pie."}
    ],transport:"Día compacto en el centro de Kioto."},
    {date:"2026-11-19",city:"Kioto",sleep:"Apartment Hotel 11 Gion",title:"Arashiyama, Kinkaku-ji y última noche en Kioto",map:"Arashiyama Bamboo Forest",slots:[
      {label:"Muy temprano",time:"07:00–11:30",title:"Bosque de bambú, Tenryū-ji y río",desc:"Llegar antes de las multitudes y recorrer el bambusal, Tenryū-ji y Togetsukyō."},
      {label:"Mediodía-tarde",time:"11:30–16:30",title:"Comida, traslado y Pabellón Dorado",desc:"Comer pronto, taxi directo y visita a Kinkaku-ji."},
      {label:"Tarde-noche",time:"17:00–21:30",title:"Última tarde y cena en Kioto",desc:"Volver a Gion/Pontocho, hacer compras finales y preparar maletas."}
    ],transport:"Taxi entre Arashiyama y Kinkaku-ji. Última noche en Apartment Hotel 11 Gion."},
    {date:"2026-11-20",city:"Tokio",sleep:"Avión",title:"Kioto → Tokio y Haneda",map:"Shinagawa Station Tokyo",slots:[
      {label:"Mañana",time:"08:00–11:30",title:"Check-out y Shinkansen a Shinagawa",desc:"Taxi a Kyoto Station y Tokaido Shinkansen hasta Shinagawa."},
      {label:"Mediodía-tarde",time:"11:30–17:00",title:"Últimas horas en Tokio: Ginza y Marunouchi",desc:"Dejar equipaje en Shinagawa y hacer un último bloque de comida, paseo y compras."},
      {label:"Tarde-noche",time:"17:00–19:30",title:"Cena temprana y recoger equipaje",desc:"Volver a Shinagawa con margen y recoger las maletas."},
      {label:"Noche",time:"19:45–20:30",title:"Traslado al aeropuerto",desc:"Keikyu a Haneda Terminal 3."}
    ],transport:"Kioto → Shinagawa en Tokaido Shinkansen; Keikyu desde Shinagawa a Haneda."},
    {date:"2026-11-21",city:"Vuelo",sleep:"Barcelona",title:"Tokio → Doha → Barcelona",map:"Haneda Airport Terminal 3",slots:[
      {label:"Madrugada",time:"00:25",title:"QR813 · Haneda → Doha",desc:"Horario actualizado por Qatar Airways: salida 00:25 y llegada a Doha 06:50."},
      {label:"Mañana",time:"08:25",title:"QR145 · Doha → Barcelona",desc:"Conexión de 1 h 45 min. Llegada a Barcelona T1 a las 13:25."}
    ],transport:"Equipaje facturado: 25 kg por adulto."}
  ],
  bookings: [
    {id:"flight",kind:"flight",icon:"✈️",status:"confirmed",title:"Qatar Airways · Ida y vuelta",subtitle:"2 pasajeros · Economy · 25 kg por adulto",from:"BCN",to:"HND",dates:"2–21 nov",detail:"QR142 + QR812 · QR813 + QR145",emailId:"19ed47ac996354f5",map:"Haneda Airport Terminal 3"},
    {id:"tokyo1",kind:"hotel",icon:"🏨",status:"confirmed",title:"aLATO Hatsudai c02 · Airbnb",subtitle:"6 noches · Shibuya/Honmachi · apartamento entero",from:"Entrada después de las 16:00",to:"Salida hasta las 10:00",dates:"3–9 nov",detail:"Reserva confirmada · prerregistro de pasaportes pendiente antes del viaje",emailId:"1a0e2ce453b1a388",map:"2-chome-2-10 Honmachi, Shibuya, Tokyo"},
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
