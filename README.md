# FacturaControl - Panel de Control de Facturas

Sistema profesional de gestión y visualización de facturas para contadores y profesionales de finanzas.

## 🚀 Características

- ✅ **Autenticación segura** con Google OAuth
- 📊 **Dashboard interactivo** con estadísticas en tiempo real
- 🔄 **Sincronización automática** con Google Sheets
- 🔍 **Búsqueda y filtros avanzados** por categoría, fecha, emisor, etc.
- 📥 **Exportación a CSV** de datos filtrados
- 🎨 **Diseño moderno y profesional** con modo oscuro
- 📱 **Responsive** - funciona en todos los dispositivos
- 🔒 **Seguridad mejorada** - credenciales protegidas

## 📋 Requisitos Previos

1. Una cuenta de Google
2. Acceso a Google Cloud Console
3. Un navegador web moderno (Chrome, Firefox, Edge, Safari)

## 🔧 Configuración Inicial

### Paso 1: Configurar Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita las siguientes APIs:
   - Google Sheets API
   - Google Identity Services

### Paso 2: Crear credenciales OAuth 2.0

1. En Google Cloud Console, ve a **APIs & Services** > **Credentials**
2. Haz clic en **Create Credentials** > **OAuth client ID**
3. Selecciona **Web application**
4. Configura:
   - **Name**: FacturaControl
   - **Authorized JavaScript origins**: 
     - `http://localhost` (para desarrollo local)
     - Tu dominio de producción (si aplica)
   - **Authorized redirect URIs**: 
     - `http://localhost` (para desarrollo local)
5. Copia el **Client ID** generado

### Paso 3: Configurar la aplicación

1. Abre el archivo `config.js`
2. Reemplaza `TU_CLIENT_ID_AQUI` con tu Client ID de Google:

```javascript
GOOGLE_CLIENT_ID: '123456789-abcdefghijklmnop.apps.googleusercontent.com',
```

3. El `SPREADSHEET_ID` ya está configurado con tu hoja de cálculo

### Paso 4: Configurar Google Sheets

Tu Google Sheets debe tener las siguientes columnas en este orden:

1. Fecha
2. Categoría
3. Número Factura
4. Emisor
5. NIF
6. Dirección
7. Localidad
8. Código Postal
9. Provincia
10. Teléfono
11. Descripción
12. Importe
13. IVA
14. Total
15. Moneda
16. Notas
17. URL

**Importante**: Asegúrate de que la hoja de cálculo tenga permisos de lectura pública o esté compartida con las cuentas que usarán la aplicación.

## 🚀 Ejecutar la Aplicación

### Opción 1: Servidor Local Simple

```bash
# Si tienes Python instalado
python -m http.server 8000

# O con Node.js
npx http-server -p 8000
```

Luego abre tu navegador en `http://localhost:8000`

### Opción 2: Abrir directamente

Simplemente abre el archivo `index.html` en tu navegador web.

**Nota**: Algunas funcionalidades pueden requerir un servidor local debido a las políticas CORS.

## 📖 Uso de la Aplicación

### Iniciar Sesión

1. Haz clic en **Iniciar sesión con Google**
2. Selecciona tu cuenta de Google
3. Autoriza el acceso a la aplicación

### Dashboard

- **Tarjetas de estadísticas**: Muestra totales de facturas, importes, IVA y datos del mes actual
- **Facturas recientes**: Lista las últimas 10 facturas
- **Actualizar**: Botón para recargar datos desde Google Sheets

### Vista de Facturas

- **Filtros**: Por categoría, mes, rango de fechas
- **Búsqueda**: Busca por número de factura, emisor, NIF o descripción
- **Ver detalles**: Haz clic en cualquier factura para ver información completa
- **Exportar**: Descarga los datos filtrados en formato CSV

### Funciones Adicionales

- **Análisis**: (En desarrollo) Gráficos y tendencias
- **Configuración**: (En desarrollo) Preferencias del sistema

## 🔒 Seguridad

### Mejores Prácticas Implementadas

1. **Autenticación OAuth**: Solo usuarios autorizados pueden acceder
2. **Configuración centralizada**: Credenciales en archivo separado
3. **Variables de entorno**: Preparado para usar variables de entorno en producción

### Para Producción

**IMPORTANTE**: Antes de desplegar en producción:

1. **NO subas `config.js` a repositorios públicos**
2. Agrega `config.js` a `.gitignore`
3. Usa variables de entorno del servidor:

```javascript
// Ejemplo con variables de entorno
const CONFIG = {
    SPREADSHEET_ID: process.env.SPREADSHEET_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
};
```

4. Considera usar un backend (Node.js, Python, etc.) como proxy para:
   - Proteger credenciales
   - Implementar autenticación adicional
   - Cachear datos
   - Registrar auditorías

### Opción Recomendada: Google Apps Script

Para mayor seguridad, puedes crear un Google Apps Script que actúe como API:

1. En tu Google Sheet, ve a **Extensions** > **Apps Script**
2. Crea un endpoint que devuelva los datos
3. Configura permisos adecuados
4. Usa ese endpoint en lugar de acceso directo

## 🎨 Personalización

### Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --accent-blue: #3b82f6;
    /* ... más colores */
}
```

### Logo

Reemplaza los SVG del logo en `index.html` con tu propio logo.

## 📁 Estructura del Proyecto

```
facturacion-con-ia/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── app.js             # Lógica de la aplicación
├── config.js          # Configuración (NO subir a Git público)
├── .gitignore         # Archivos a ignorar en Git
└── README.md          # Este archivo
```

## 🐛 Solución de Problemas

### Error: "No se pudieron cargar los datos"

- Verifica que el Google Sheets sea accesible
- Comprueba que el SPREADSHEET_ID sea correcto
- Asegúrate de tener conexión a Internet

### Error: "Google Sign-In no funciona"

- Verifica que el CLIENT_ID sea correcto
- Comprueba que las URLs autorizadas estén configuradas en Google Cloud Console
- Asegúrate de estar usando HTTPS en producción

### Los datos no se actualizan

- Haz clic en el botón de actualizar (icono de recarga)
- Verifica que los datos en Google Sheets estén en el formato correcto
- Revisa la consola del navegador para errores

## 📝 Licencia

Este proyecto es de uso privado para gestión de facturas.

## 🤝 Soporte

Para problemas o preguntas, contacta al administrador del sistema.

---

**Desarrollado con ❤️ para profesionales de finanzas y contabilidad**
