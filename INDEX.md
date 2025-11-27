# 📚 FacturaControl - Índice de Documentación

Bienvenido a **FacturaControl**, tu sistema profesional de gestión de facturas.

---

## 🚀 Inicio Rápido

¿Primera vez aquí? Empieza por estos documentos en orden:

1. **[QUICKSTART.md](QUICKSTART.md)** ⚡
   - Guía rápida de 5 minutos
   - Configuración básica
   - Primeros pasos

2. **[GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md)** 🔑
   - Configuración de Google OAuth paso a paso
   - Obtención del Client ID
   - Solución de problemas comunes

3. **[README.md](README.md)** 📖
   - Documentación completa
   - Características del sistema
   - Guía de uso detallada

---

## 📁 Archivos del Proyecto

### Archivos Principales (Código)

| Archivo | Descripción | Tamaño |
|---------|-------------|--------|
| **index.html** | Interfaz principal de la aplicación | 17.9 KB |
| **styles.css** | Estilos y diseño visual | 21.0 KB |
| **app.js** | Lógica de la aplicación | 20.2 KB |
| **config.js** | Configuración y credenciales | 1.2 KB |

### Archivos de Configuración

| Archivo | Descripción | Tamaño |
|---------|-------------|--------|
| **config.example.js** | Plantilla de configuración | 972 bytes |
| **.gitignore** | Archivos a ignorar en Git | 469 bytes |

### Documentación

| Archivo | Descripción | Tamaño |
|---------|-------------|--------|
| **README.md** | Documentación principal | 6.5 KB |
| **QUICKSTART.md** | Guía rápida | 3.5 KB |
| **GOOGLE_OAUTH_SETUP.md** | Configuración OAuth | 7.6 KB |
| **SECURITY.md** | Guía de seguridad | 10.2 KB |
| **PROYECTO.md** | Resumen del proyecto | 8.1 KB |
| **DEPLOYMENT_CHECKLIST.md** | Lista de verificación | 7.9 KB |
| **INDEX.md** | Este archivo | - |

---

## 📖 Guías por Tema

### 🎯 Para Empezar

- **Configuración inicial**: [QUICKSTART.md](QUICKSTART.md)
- **Configurar Google OAuth**: [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md)
- **Entender el proyecto**: [PROYECTO.md](PROYECTO.md)

### 🔒 Seguridad

- **Guía de seguridad completa**: [SECURITY.md](SECURITY.md)
- **Mejores prácticas**: [SECURITY.md#mejores-prácticas](SECURITY.md)
- **Arquitectura recomendada**: [SECURITY.md#arquitectura](SECURITY.md)

### 🚀 Despliegue

- **Lista de verificación**: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
- **Opciones de hosting**: [DEPLOYMENT_CHECKLIST.md#opciones](DEPLOYMENT_CHECKLIST.md)
- **Post-despliegue**: [DEPLOYMENT_CHECKLIST.md#verificación](DEPLOYMENT_CHECKLIST.md)

### 💻 Desarrollo

- **Estructura del código**: [README.md#estructura](README.md)
- **Personalización**: [README.md#personalización](README.md)
- **API de Google Sheets**: [README.md#google-sheets](README.md)

---

## 🎨 Características Principales

### ✅ Interfaz de Usuario
- 🌙 Diseño dark mode profesional
- 💫 Animaciones suaves
- 📱 Responsive (móvil, tablet, desktop)
- 🎨 Gradientes vibrantes

### ✅ Funcionalidades
- 🔐 Login con Google OAuth
- 📊 Dashboard con estadísticas
- 🔍 Búsqueda y filtros avanzados
- 📥 Exportación a CSV
- 👁️ Vista detallada de facturas

### ✅ Integración
- 📡 Google Sheets API
- 🔄 Sincronización automática
- 💾 Persistencia de sesión

---

## 🗂️ Estructura de Google Sheets

Tu hoja de cálculo debe tener estas columnas en orden:

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

**Enlace a tu Google Sheets**: 
https://docs.google.com/spreadsheets/d/1FWyLfkbQGbE-19FwP060iVdtKa0MUDPUAT1OH_th_NE/edit

---

## 🔧 Configuración Requerida

### 1. Google Cloud Console
- [ ] Proyecto creado
- [ ] Google Sheets API habilitada
- [ ] OAuth 2.0 configurado
- [ ] Client ID obtenido

### 2. Archivo config.js
```javascript
GOOGLE_CLIENT_ID: 'TU_CLIENT_ID.apps.googleusercontent.com',
SPREADSHEET_ID: '1FWyLfkbQGbE-19FwP060iVdtKa0MUDPUAT1OH_th_NE',
```

### 3. Servidor Local
```bash
python -m http.server 8000
# O
npx http-server -p 8000
```

---

## 🆘 Solución de Problemas

### Problemas Comunes

| Problema | Solución | Documento |
|----------|----------|-----------|
| No carga el login | Verificar Client ID | [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md) |
| No carga datos | Verificar permisos de Sheets | [README.md](README.md) |
| Error de redirect_uri | Añadir URI en Google Console | [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md) |
| Credenciales expuestas | Implementar backend | [SECURITY.md](SECURITY.md) |

---

## 📊 Flujo de Trabajo

```
1. Configurar Google OAuth
   ↓
2. Actualizar config.js
   ↓
3. Ejecutar servidor local
   ↓
4. Abrir en navegador
   ↓
5. Login con Google
   ↓
6. ¡Usar la aplicación!
```

---

## 🎯 Próximos Pasos

### Para Desarrollo Local
1. ✅ Lee [QUICKSTART.md](QUICKSTART.md)
2. ✅ Configura Google OAuth con [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md)
3. ✅ Ejecuta el servidor local
4. ✅ ¡Empieza a usar la aplicación!

### Para Producción
1. ⚠️ Lee [SECURITY.md](SECURITY.md) **COMPLETO**
2. ⚠️ Implementa backend seguro
3. ⚠️ Sigue [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
4. ⚠️ Realiza pruebas exhaustivas
5. ✅ Despliega con confianza

---

## 📞 Recursos

### Documentación Externa
- [Google Cloud Console](https://console.cloud.google.com/)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Google Identity Services](https://developers.google.com/identity/gsi/web)

### Tutoriales
- [OAuth 2.0 para aplicaciones web](https://developers.google.com/identity/protocols/oauth2/web-server)
- [Google Sheets API Quickstart](https://developers.google.com/sheets/api/quickstart/js)

---

## 📝 Notas Importantes

### ⚠️ SEGURIDAD
- **NO** uses en producción sin leer [SECURITY.md](SECURITY.md)
- **NO** subas `config.js` a repositorios públicos
- **SÍ** implementa backend para producción
- **SÍ** usa HTTPS en producción

### 💡 TIPS
- Mantén tu Google Sheets organizado
- Haz backups regulares de tus datos
- Revisa los logs regularmente
- Actualiza las dependencias periódicamente

---

## 🎉 ¡Listo para Empezar!

Ahora que conoces la estructura del proyecto, empieza con [QUICKSTART.md](QUICKSTART.md) y tendrás tu sistema funcionando en minutos.

**¿Preguntas?** Revisa la documentación correspondiente o consulta la sección de solución de problemas.

---

## 📄 Licencia

Este proyecto es de uso privado para gestión de facturas.

---

## 👨‍💻 Desarrollo

**Versión**: 1.0.0  
**Última actualización**: 2025-11-26  
**Tecnologías**: HTML5, CSS3, JavaScript ES6+, Google APIs

---

**Desarrollado con ❤️ para profesionales de finanzas y contabilidad**
