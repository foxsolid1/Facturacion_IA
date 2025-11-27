# 🔑 Configuración de Google OAuth - Paso a Paso

## 📝 Instrucciones Detalladas para Obtener el Client ID

### Paso 1: Acceder a Google Cloud Console

1. Abre tu navegador y ve a: **https://console.cloud.google.com/**
2. Inicia sesión con tu cuenta de Google
3. Si es tu primera vez, acepta los términos de servicio

---

### Paso 2: Crear o Seleccionar un Proyecto

#### Opción A: Crear Nuevo Proyecto
1. Haz clic en el selector de proyectos (arriba a la izquierda, junto al logo de Google Cloud)
2. Haz clic en **"NUEVO PROYECTO"**
3. Completa:
   - **Nombre del proyecto**: `FacturaControl` (o el nombre que prefieras)
   - **Organización**: Déjalo como está (si no tienes organización)
   - **Ubicación**: Déjalo como está
4. Haz clic en **"CREAR"**
5. Espera unos segundos mientras se crea el proyecto
6. Selecciona el proyecto recién creado

#### Opción B: Usar Proyecto Existente
1. Haz clic en el selector de proyectos
2. Selecciona el proyecto que quieres usar

---

### Paso 3: Habilitar Google Sheets API

1. En el menú lateral izquierdo, ve a **"APIs y servicios"** → **"Biblioteca"**
   - O usa el buscador superior y escribe "Biblioteca de APIs"
2. En el buscador de la biblioteca, escribe: **"Google Sheets API"**
3. Haz clic en **"Google Sheets API"** en los resultados
4. Haz clic en el botón **"HABILITAR"**
5. Espera a que se habilite (unos segundos)

---

### Paso 4: Configurar Pantalla de Consentimiento OAuth

1. Ve a **"APIs y servicios"** → **"Pantalla de consentimiento de OAuth"**
2. Selecciona el tipo de usuario:
   - **Externo**: Si quieres que cualquier usuario con cuenta de Google pueda acceder
   - **Interno**: Solo si tienes Google Workspace y quieres limitar a tu organización
3. Haz clic en **"CREAR"**

4. **Configuración de la aplicación OAuth** (Página 1):
   - **Nombre de la aplicación**: `FacturaControl`
   - **Correo electrónico de asistencia**: Tu email
   - **Logo de la aplicación**: (Opcional) Puedes dejarlo vacío
   - **Dominios autorizados**: (Opcional) Déjalo vacío por ahora
   - **Correos electrónicos de contacto del desarrollador**: Tu email
   - Haz clic en **"GUARDAR Y CONTINUAR"**

5. **Permisos** (Página 2):
   - Haz clic en **"AÑADIR O QUITAR PERMISOS"**
   - Busca: `Google Sheets API`
   - Selecciona: `.../auth/spreadsheets.readonly` (solo lectura)
   - Haz clic en **"ACTUALIZAR"**
   - Haz clic en **"GUARDAR Y CONTINUAR"**

6. **Usuarios de prueba** (Página 3):
   - Si elegiste "Externo", añade tu email como usuario de prueba
   - Haz clic en **"AÑADIR USUARIOS"**
   - Ingresa tu email
   - Haz clic en **"AÑADIR"**
   - Haz clic en **"GUARDAR Y CONTINUAR"**

7. **Resumen** (Página 4):
   - Revisa la información
   - Haz clic en **"VOLVER AL PANEL"**

---

### Paso 5: Crear Credenciales OAuth 2.0

1. Ve a **"APIs y servicios"** → **"Credenciales"**
2. Haz clic en **"+ CREAR CREDENCIALES"** (arriba)
3. Selecciona **"ID de cliente de OAuth"**

4. **Configurar el ID de cliente**:
   - **Tipo de aplicación**: Selecciona **"Aplicación web"**
   - **Nombre**: `FacturaControl Web Client`
   
5. **Orígenes de JavaScript autorizados**:
   - Haz clic en **"+ AGREGAR URI"**
   - Añade estas URIs (una por línea):
     ```
     http://localhost:8000
     http://localhost
     http://127.0.0.1:8000
     ```
   - Si vas a usar un dominio en producción, añádelo también:
     ```
     https://tudominio.com
     ```

6. **URIs de redireccionamiento autorizados**:
   - Haz clic en **"+ AGREGAR URI"**
   - Añade las mismas URIs que arriba:
     ```
     http://localhost:8000
     http://localhost
     http://127.0.0.1:8000
     ```

7. Haz clic en **"CREAR"**

---

### Paso 6: Copiar el Client ID

1. Aparecerá un modal con tus credenciales
2. **COPIA** el **"ID de cliente"** (Client ID)
   - Se verá algo así: `123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com`
3. También puedes copiar el **"Secreto del cliente"** (pero no lo necesitamos para esta aplicación)
4. Haz clic en **"ACEPTAR"**

💡 **Tip**: Si cierras el modal, puedes ver tus credenciales en cualquier momento:
- Ve a **"Credenciales"**
- Busca tu cliente OAuth 2.0 en la lista
- Haz clic en el nombre para ver los detalles

---

### Paso 7: Configurar la Aplicación

1. Abre el archivo **`config.js`** en tu editor de código
2. Busca esta línea:
   ```javascript
   GOOGLE_CLIENT_ID: 'TU_CLIENT_ID_AQUI.apps.googleusercontent.com',
   ```
3. Reemplázala con tu Client ID real:
   ```javascript
   GOOGLE_CLIENT_ID: '123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com',
   ```
4. **GUARDA** el archivo

---

### Paso 8: Verificar la Configuración

1. Asegúrate de que el servidor local esté ejecutándose:
   ```bash
   python -m http.server 8000
   ```

2. Abre tu navegador en: **http://localhost:8000**

3. Deberías ver la pantalla de login con el botón de Google

4. Haz clic en **"Iniciar sesión con Google"**

5. Si todo está correcto:
   - Se abrirá una ventana de Google
   - Te pedirá que selecciones tu cuenta
   - Te pedirá que autorices la aplicación
   - Te redirigirá al dashboard

---

## ⚠️ Solución de Problemas

### Error: "redirect_uri_mismatch"

**Causa**: La URI de redirección no está autorizada

**Solución**:
1. Ve a Google Cloud Console → Credenciales
2. Edita tu cliente OAuth
3. Añade la URI exacta que aparece en el error a las URIs autorizadas
4. Guarda los cambios
5. Espera 1-2 minutos para que se propague
6. Intenta de nuevo

### Error: "invalid_client"

**Causa**: El Client ID es incorrecto

**Solución**:
1. Verifica que copiaste el Client ID completo
2. Asegúrate de no tener espacios al inicio o final
3. Verifica que el proyecto en Google Cloud Console esté activo

### El botón de Google no aparece

**Causa**: Problema con la carga del script de Google

**Solución**:
1. Abre la consola del navegador (F12)
2. Busca errores en la pestaña "Console"
3. Verifica tu conexión a Internet
4. Asegúrate de que `config.js` se carga correctamente

### "Access blocked: This app's request is invalid"

**Causa**: Falta configurar la pantalla de consentimiento

**Solución**:
1. Ve a Google Cloud Console
2. Completa la configuración de la pantalla de consentimiento OAuth
3. Añade tu email como usuario de prueba (si es aplicación externa)

---

## 📋 Checklist Final

- [ ] Proyecto creado en Google Cloud Console
- [ ] Google Sheets API habilitada
- [ ] Pantalla de consentimiento OAuth configurada
- [ ] Credenciales OAuth 2.0 creadas
- [ ] URIs autorizadas añadidas (localhost:8000, localhost, etc.)
- [ ] Client ID copiado
- [ ] `config.js` actualizado con el Client ID
- [ ] Archivo guardado
- [ ] Servidor local ejecutándose
- [ ] Aplicación abierta en navegador
- [ ] Login con Google funciona

---

## 🎯 Próximo Paso

Una vez completada la configuración, lee el archivo **`QUICKSTART.md`** para empezar a usar la aplicación.

---

## 📞 Recursos Adicionales

- [Documentación oficial de Google Identity](https://developers.google.com/identity/gsi/web/guides/overview)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Guía de OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)

---

**¡Listo! Ahora tienes todo configurado para usar FacturaControl** 🎉
