// Configuración de la aplicación
// IMPORTANTE: En producción, estas credenciales deben estar en variables de entorno del servidor
// Este archivo NO debe subirse a repositorios públicos

const CONFIG = {
    // Google Sheets Configuration
    // Para mayor seguridad, considera usar Google Apps Script como proxy
    SPREADSHEET_ID: '1FWyLfkbQGbE-19FwP060iVdtKa0MUDPUAT1OH_th_NE',

    // Google OAuth Configuration
    // Reemplaza con tu propio Client ID de Google Cloud Console
    // https://console.cloud.google.com/
    GOOGLE_CLIENT_ID: '652532712079-in1huau6p69ivae475a9hrijcc0ua76p.apps.googleusercontent.com',

    // API Key para Google Sheets API (opcional, si usas API directa)
    // GOOGLE_API_KEY: 'TU_API_KEY_AQUI',

    // Configuración de la aplicación
    APP_NAME: 'FacturaControl',
    VERSION: '1.0.0',

    // Configuración de cache
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutos en milisegundos
};

// Función para obtener la URL completa del Google Sheets
function getSheetURL() {
    return `https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}/gviz/tq?tqx=out:json`;
}

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
