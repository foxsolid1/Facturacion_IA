# 🚀 Guía Rápida de Configuración

## Pasos para poner en marcha FacturaControl

### 1️⃣ Obtener credenciales de Google (5 minutos)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto nuevo o selecciona uno existente
3. Ve a **APIs & Services** → **Library**
4. Busca y habilita **"Google Sheets API"**
5. Ve a **APIs & Services** → **Credentials**
6. Haz clic en **"Create Credentials"** → **"OAuth client ID"**
7. Si es la primera vez, configura la pantalla de consentimiento:
   - User Type: **External**
   - App name: **FacturaControl**
   - User support email: tu email
   - Developer contact: tu email
8. Vuelve a crear credenciales:
   - Application type: **Web application**
   - Name: **FacturaControl**
   - Authorized JavaScript origins:
     - `http://localhost:8000`
     - `http://localhost`
     - `http://127.0.0.1:8000`
   - Authorized redirect URIs:
     - `http://localhost:8000`
     - `http://localhost`
9. **Copia el Client ID** (algo como: `123456-abc.apps.googleusercontent.com`)

### 2️⃣ Configurar la aplicación (1 minuto)

1. Abre el archivo `config.js`
2. Reemplaza esta línea:
   ```javascript
   GOOGLE_CLIENT_ID: 'TU_CLIENT_ID_AQUI.apps.googleusercontent.com',
   ```
   Con tu Client ID real:
   ```javascript
   GOOGLE_CLIENT_ID: '123456-abc.apps.googleusercontent.com',
   ```
3. Guarda el archivo

### 3️⃣ Verificar Google Sheets (1 minuto)

1. Abre tu [Google Sheets](https://docs.google.com/spreadsheets/d/1FWyLfkbQGbE-19FwP060iVdtKa0MUDPUAT1OH_th_NE/edit)
2. Verifica que tenga permisos de lectura
3. Asegúrate de que las columnas estén en este orden:
   - Fecha | Categoría | Número Factura | Emisor | NIF | Dirección | Localidad | Código Postal | Provincia | Teléfono | Descripción | Importe | IVA | Total | Moneda | Notas | URL

### 4️⃣ Ejecutar la aplicación (30 segundos)

**Opción A - Con Python:**
```bash
python -m http.server 8000
```

**Opción B - Con Node.js:**
```bash
npx http-server -p 8000
```

**Opción C - Con PHP:**
```bash
php -S localhost:8000
```

**Opción D - Extensión de VS Code:**
- Instala "Live Server"
- Click derecho en `index.html` → "Open with Live Server"

### 5️⃣ Abrir en el navegador

Abre tu navegador en: `http://localhost:8000`

---

## ✅ Checklist de Verificación

- [ ] Google Cloud Console configurado
- [ ] Client ID copiado
- [ ] `config.js` actualizado con tu Client ID
- [ ] Google Sheets accesible
- [ ] Servidor local ejecutándose
- [ ] Aplicación abierta en navegador
- [ ] Login con Google funciona
- [ ] Datos de facturas se cargan correctamente

---

## 🆘 Problemas Comunes

### "Error al cargar datos"
- ✅ Verifica que el Google Sheets sea público o compartido
- ✅ Comprueba la conexión a Internet

### "Google Sign-In no aparece"
- ✅ Verifica que el Client ID sea correcto
- ✅ Asegúrate de estar usando un servidor local (no `file://`)
- ✅ Revisa las URLs autorizadas en Google Cloud Console

### "Redirect URI mismatch"
- ✅ Añade la URL exacta a las URIs autorizadas en Google Cloud Console
- ✅ Incluye tanto `http://localhost:8000` como `http://localhost`

---

## 📞 Siguiente Paso

Una vez configurado, inicia sesión con tu cuenta de Google y explora:
- 📊 Dashboard con estadísticas
- 📄 Lista completa de facturas
- 🔍 Búsqueda y filtros
- 📥 Exportación a CSV

¡Disfruta de FacturaControl! 🎉
