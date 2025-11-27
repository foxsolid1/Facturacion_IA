const CONFIG = {
    SPREADSHEET_ID: '1FWyLfkbQGbE-19FwP060iVdtKa0MUDPUAT1OH_th_NE',
    GOOGLE_CLIENT_ID: 'tu-client-id.apps.googleusercontent.com',
    APP_NAME: 'FacturaControl - DEMO',
    VERSION: '1.0.0',
    CACHE_DURATION: 5 * 60 * 1000,
    IS_DEMO: true,
};
function getSheetURL() {
    return `https://docs.google.com/spreadsheets/d/c:\Users\foxso\OneDrive - Universidad Abierta y a Distancia de México\Documentos\Facturacion con IA{CONFIG.SPREADSHEET_ID}/gviz/tq?tqx=out:json`;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
