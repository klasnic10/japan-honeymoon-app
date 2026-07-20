# Japón 2026 · Jorge & Lali

Primera versión funcional y móvil de la aplicación de la luna de miel.

## Qué incluye

- Itinerario del 2 al 21 de noviembre de 2026.
- Correcciones realizadas usando `Borrador` como fuente de verdad.
- Vuelos de Qatar Airways y alojamientos ya confirmados.
- Enlaces privados a las confirmaciones de Gmail.
- Enlaces directos a Google Maps y a webs oficiales de transporte.
- Registro de gastos manuales, edición, eliminación y filtros.
- Totales separados en EUR y JPY y conversión opcional con un cambio manual.
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

Los gastos se guardan en `localStorage`, por lo que en esta primera versión pertenecen al navegador y dispositivo donde se introducen. Se pueden mover mediante la copia JSON. Los PIN de Booking y los billetes electrónicos no están incrustados en la aplicación; se abren en la cuenta de Gmail autorizada.

La siguiente evolución natural es conectar los gastos y restaurantes a una tabla compartida para sincronizar los teléfonos de Jorge y Lali.
