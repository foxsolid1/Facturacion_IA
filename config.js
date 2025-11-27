// CONFIGURACIÓN PARA GITHUB PAGES - MODO DEMO
// Este archivo permite que la aplicación funcione sin autenticación

const CONFIG = {
    // ID de Google Spreadsheet (debe ser público o compartido)
    // Reemplaza con tu SPREADSHEET_ID real
    SPREADSHEET_ID: '1VqGwm7KBxWbULlNvmDPbkO8VdPqLTqVYx_5rGqLqLqQ',  // Cambia esto por tu ID

    // Client ID de Google OAuth (opcional en modo demo)
    GOOGLE_CLIENT_ID: 'tu-client-id.apps.googleusercontent.com',

    // Configuración de la aplicación
    APP_NAME: 'FacturaControl - DEMO',
    VERSION: '1.0.0',
    CACHE_DURATION: 5 * 60 * 1000,

    // ⭐ MODO DEMO: true = Sin login, false = Con Google OAuth
    IS_DEMO: true,
};

// Función para obtener la URL del Google Sheets
function getSheetURL() {
    return `https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}/gviz/tq?tqx=out:json`;
}

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
