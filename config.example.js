// EJEMPLO DE CONFIGURACIÓN
// Copia este archivo como 'config.js' y completa con tus credenciales reales

const CONFIG = {
    // ID de tu Google Spreadsheet
    // Lo puedes encontrar en la URL: https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
    SPREADSHEET_ID: 'TU_SPREADSHEET_ID_AQUI',

    // Client ID de Google OAuth
    // Obtenerlo en: https://console.cloud.google.com/apis/credentials
    GOOGLE_CLIENT_ID: 'TU_CLIENT_ID_AQUI.apps.googleusercontent.com',

    // Configuración de la aplicación
    APP_NAME: 'FacturaControl',
    VERSION: '1.0.0',

    // Duración del cache (5 minutos)
    CACHE_DURATION: 5 * 60 * 1000,
};

// Función para obtener la URL del Google Sheets
function getSheetURL() {
    return `https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}/gviz/tq?tqx=out:json`;
}

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
