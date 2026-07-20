# Configurar Google Sheets para la app

La app usa autorización directa en el navegador y el permiso limitado `drive.file`. Cada persona inicia sesión y selecciona la hoja `Viaje Japón 2026`; la aplicación no obtiene acceso general al resto de Drive.

## 1. Crear el proyecto de Google Cloud

1. Abre [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un proyecto para la app.
3. Habilita **Google Sheets API** y **Google Picker API**.
4. Configura la pantalla de consentimiento como aplicación externa.
5. Añade las dos cuentas de Google como usuarios de prueba mientras la aplicación no esté publicada/verificada.

## 2. Crear las credenciales web

1. Crea un cliente OAuth 2.0 de tipo **Aplicación web**.
2. En `Authorized JavaScript origins`, añade la URL final de GitHub Pages, sin barra final.
3. Para probar en local, añade también los orígenes exactos que muestre Live Preview, por ejemplo `http://127.0.0.1:3000` y `http://localhost:3000`.
4. Crea una API key y restríngela:
   - Restricción de aplicación: sitios web.
   - Referentes: la URL de GitHub Pages y los orígenes locales necesarios.
   - Restricción de API: Google Picker API.
5. Copia el **Client ID**, la **API key** y el **Project number**. El Project number es el App ID de Picker.

## 3. Configurar GitHub Pages

En el repositorio, abre `Settings → Secrets and variables → Actions → Variables` y crea:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_API_KEY`
- `GOOGLE_APP_ID`

Después activa GitHub Pages con `GitHub Actions` como origen de publicación. El workflow `.github/workflows/pages.yml` desplegará la app en cada cambio de `main`.

## 4. Primera conexión

1. Abre la app publicada.
2. En Ruta o Gastos, pulsa **Conectar Google**.
3. Autoriza el acceso solicitado.
4. Selecciona `Viaje Japón 2026` en Google Picker.

La app leerá `Gastos`, `Rutas`, `Detalle del viaje`, `Guía práctica`, `Checklist` y `Notas`. Los gastos, tareas y notas se actualizarán en la misma hoja cuando haya conexión.
