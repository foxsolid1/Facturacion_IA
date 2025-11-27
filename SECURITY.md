# 🔒 Guía de Seguridad - FacturaControl

## Medidas de Seguridad Implementadas

### ✅ 1. Autenticación con Google OAuth 2.0
- Solo usuarios con cuenta de Google pueden acceder
- Tokens de autenticación seguros
- Sesión almacenada localmente (se puede mejorar)

### ✅ 2. Separación de Credenciales
- Archivo `config.js` separado del código principal
- Incluido en `.gitignore` para evitar subir a repositorios públicos
- Archivo de ejemplo `config.example.js` para referencia

### ✅ 3. Acceso de Solo Lectura a Google Sheets
- La aplicación solo lee datos, no puede modificarlos
- Usa la API pública de Google Sheets

---

## 🚨 Recomendaciones de Seguridad para Producción

### 🔴 CRÍTICO: NO usar en producción sin estas mejoras

#### 1. Implementar Backend Seguro

**Problema actual**: Las credenciales están en el frontend (visible en el navegador)

**Solución**: Crear un backend que actúe como proxy

**Opciones recomendadas**:

##### Opción A: Node.js + Express
```javascript
// server.js
const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();

app.get('/api/invoices', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'Sheet1!A:Q',
    });
    
    res.json(response.data.values);
});

app.listen(3000);
```

##### Opción B: Google Apps Script (Recomendado para simplicidad)

1. En tu Google Sheet, ve a **Extensions** > **Apps Script**
2. Crea este código:

```javascript
function doGet(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Convertir a JSON
    const headers = data[0];
    const rows = data.slice(1).map(row => {
        const obj = {};
        headers.forEach((header, i) => {
            obj[header] = row[i];
        });
        return obj;
    });
    
    return ContentService
        .createTextOutput(JSON.stringify(rows))
        .setMimeType(ContentService.MimeType.JSON);
}
```

3. Despliega como Web App
4. Configura permisos (solo usuarios específicos)
5. Usa la URL generada en tu aplicación

##### Opción C: Firebase Functions

```javascript
const functions = require('firebase-functions');
const { google } = require('googleapis');

exports.getInvoices = functions.https.onCall(async (data, context) => {
    // Verificar autenticación
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
    }
    
    // Obtener datos de Google Sheets
    const auth = new google.auth.GoogleAuth({
        credentials: functions.config().google.credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: functions.config().sheets.id,
        range: 'Sheet1!A:Q',
    });
    
    return response.data.values;
});
```

#### 2. Variables de Entorno

**Nunca** incluyas credenciales directamente en el código.

Crea un archivo `.env`:
```env
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
SPREADSHEET_ID=tu-spreadsheet-id
GOOGLE_API_KEY=tu-api-key
```

Usa una librería como `dotenv` para cargarlas:
```javascript
require('dotenv').config();
const clientId = process.env.GOOGLE_CLIENT_ID;
```

#### 3. Restricciones de API Key

En Google Cloud Console:
1. Ve a **APIs & Services** > **Credentials**
2. Edita tu API Key
3. Configura restricciones:
   - **Application restrictions**: HTTP referrers
   - Añade solo tus dominios permitidos
   - **API restrictions**: Solo Google Sheets API

#### 4. Control de Acceso

**Opción 1: Lista blanca de emails**
```javascript
const ALLOWED_USERS = [
    'contador@empresa.com',
    'admin@empresa.com',
    'finanzas@empresa.com'
];

function handleCredentialResponse(response) {
    const userInfo = parseJwt(response.credential);
    
    if (!ALLOWED_USERS.includes(userInfo.email)) {
        alert('No tienes permisos para acceder a esta aplicación');
        return;
    }
    
    // Continuar con login...
}
```

**Opción 2: Dominio específico**
```javascript
function handleCredentialResponse(response) {
    const userInfo = parseJwt(response.credential);
    const emailDomain = userInfo.email.split('@')[1];
    
    if (emailDomain !== 'tuempresa.com') {
        alert('Solo usuarios de @tuempresa.com pueden acceder');
        return;
    }
    
    // Continuar con login...
}
```

#### 5. HTTPS Obligatorio

En producción, **SIEMPRE** usa HTTPS:
- Obtén un certificado SSL (gratis con Let's Encrypt)
- Redirige todo el tráfico HTTP a HTTPS
- Configura HSTS headers

#### 6. Content Security Policy (CSP)

Añade en el `<head>` de tu HTML:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' https://accounts.google.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src https://fonts.gstatic.com; 
               connect-src 'self' https://docs.google.com;">
```

#### 7. Rate Limiting

Implementa límites de peticiones para evitar abuso:
```javascript
// Ejemplo con Express
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // máximo 100 peticiones por ventana
});

app.use('/api/', limiter);
```

#### 8. Logging y Auditoría

Registra todas las acciones importantes:
```javascript
function logAccess(user, action, details) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        user: user.email,
        action: action,
        details: details,
        ip: getUserIP()
    };
    
    // Guardar en base de datos o servicio de logging
    console.log(JSON.stringify(logEntry));
}
```

#### 9. Caducidad de Sesiones

```javascript
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 horas

function checkSession() {
    const session = JSON.parse(localStorage.getItem('userSession'));
    if (!session) return false;
    
    const loginTime = new Date(session.loginTime);
    const now = new Date();
    
    if (now - loginTime > SESSION_DURATION) {
        logout();
        return false;
    }
    
    return true;
}
```

#### 10. Validación de Datos

Siempre valida los datos recibidos:
```javascript
function validateInvoiceData(invoice) {
    if (!invoice.numeroFactura || typeof invoice.numeroFactura !== 'string') {
        throw new Error('Número de factura inválido');
    }
    
    if (typeof invoice.total !== 'number' || invoice.total < 0) {
        throw new Error('Total inválido');
    }
    
    // Más validaciones...
}
```

---

## 📋 Checklist de Seguridad para Producción

- [ ] Backend implementado (Node.js, Apps Script, o Firebase)
- [ ] Variables de entorno configuradas
- [ ] Credenciales NO están en el código frontend
- [ ] API Keys con restricciones configuradas
- [ ] Control de acceso por email/dominio implementado
- [ ] HTTPS configurado y forzado
- [ ] Content Security Policy configurada
- [ ] Rate limiting implementado
- [ ] Sistema de logging activo
- [ ] Sesiones con caducidad
- [ ] Validación de datos implementada
- [ ] Pruebas de seguridad realizadas
- [ ] Backup de datos configurado
- [ ] Plan de respuesta a incidentes definido

---

## 🎯 Arquitectura Recomendada para Producción

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────────┐
│   Frontend (HTML)   │
│   - Solo UI         │
│   - No credenciales │
└──────┬──────────────┘
       │ API REST
       ▼
┌─────────────────────┐
│   Backend Server    │
│   - Node.js/Python  │
│   - Autenticación   │
│   - Rate limiting   │
└──────┬──────────────┘
       │ Google Sheets API
       ▼
┌─────────────────────┐
│   Google Sheets     │
│   - Datos facturas  │
└─────────────────────┘
```

---

## 🆘 En Caso de Compromiso de Seguridad

1. **Inmediatamente**:
   - Revoca las credenciales comprometidas en Google Cloud Console
   - Cambia todas las contraseñas
   - Genera nuevas API Keys

2. **Investigación**:
   - Revisa los logs de acceso
   - Identifica qué datos fueron accedidos
   - Determina el alcance del incidente

3. **Notificación**:
   - Informa a los usuarios afectados
   - Notifica a las autoridades si es necesario
   - Documenta el incidente

4. **Prevención**:
   - Implementa las medidas de seguridad faltantes
   - Realiza auditoría de seguridad completa
   - Actualiza procedimientos

---

## 📚 Recursos Adicionales

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Google OAuth 2.0 Best Practices](https://developers.google.com/identity/protocols/oauth2/production-readiness)
- [Web Security Academy](https://portswigger.net/web-security)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

---

**Recuerda**: La seguridad es un proceso continuo, no un estado final. Mantén tu aplicación actualizada y revisa regularmente las mejores prácticas de seguridad.
