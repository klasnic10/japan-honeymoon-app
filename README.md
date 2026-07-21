# Japón 2026 · Jorge & Lali

Aplicación móvil compartida para la luna de miel.

## Qué incluye

- Itinerario del 2 al 21 de noviembre de 2026.
- Trayectos diarios paso a paso y enlaces directos a Google Maps.
- Fichas de las visitas con contexto, comida, consejos y fuentes oficiales.
- Guías amplias en una vista móvil propia, con historia, puntos a observar, recorrido, plan de lluvia y recomendaciones verificadas.
- Cronología intercalada de trayectos y visitas cuando la hoja incluye la ruta de llegada.
- Vista `Hoy` con próximos avisos, tareas y planes normal, ligero o de lluvia.
- Modo `Ahora` para consultar el día del viaje de un vistazo.
- Guía de frases, comida por zonas y emergencias.
- Reservas, equipaje, checklist y notas compartidas en Google Sheets.
- Vuelos de Qatar Airways y alojamientos ya confirmados.
- Enlaces privados a las confirmaciones de Gmail.
- Enlaces directos a Google Maps y a webs oficiales de transporte.
- Registro de gastos manuales, edición, eliminación y filtros.
- Totales filtrables en EUR y JPY con cambio diario del BCE.
- Gastos iniciales de vuelos y alojamientos, separando pagados y pendientes.
- Exportación CSV y copia/restauración JSON.
- Caché offline e instalación como PWA cuando se sirve mediante HTTPS.

## Abrirla

Para una vista rápida, abrir `index.html`. Algunas funciones de instalación y caché offline requieren servir la carpeta mediante HTTP/HTTPS. Por ejemplo:

```bash
python3 -m http.server 8080 --directory japan-honeymoon-app
```

Después, abrir `http://localhost:8080`.

## Datos y privacidad

Gastos, rutas, guía, reservas, equipaje, checklist y notas se leen de la hoja compartida tras conectar Google. Las fichas extensas viven en `Lugares` y los restaurantes y tiendas en `Recomendaciones`; no están incrustados en el código. El navegador conserva una copia local para consulta sin conexión. Los PIN de Booking y los billetes electrónicos no están incrustados en la aplicación; se abren en la cuenta de Gmail autorizada.
