# 🚀 Guía de Despliegue en GitHub

Esta guía te ayudará a subir tu proyecto a GitHub de forma segura y profesional para demostraciones ante clientes.

## 📋 Tabla de Contenidos

1. [Preparación del Proyecto](#preparación-del-proyecto)
2. [Configuración de Seguridad](#configuración-de-seguridad)
3. [Subir a GitHub](#subir-a-github)
4. [Despliegue con GitHub Pages](#despliegue-con-github-pages)
5. [Configuración para Clientes](#configuración-para-clientes)
6. [Mejores Prácticas](#mejores-prácticas)

---

## 🔧 Preparación del Proyecto

### 1. Verificar que `.gitignore` esté configurado

El archivo `.gitignore` ya está configurado para proteger tus credenciales. Verifica que incluya:

```
config.js
.env
.env.local
node_modules/
```

### 2. Verificar que `config.example.js` exista

Este archivo debe estar en el repositorio como plantilla para otros usuarios. ✅ Ya existe.

### 3. Crear un archivo README profesional

Ya tienes un `README.md`. Asegúrate de que incluya:
- Descripción del proyecto
- Capturas de pantalla
- Instrucciones de instalación
- Credenciales de demostración (si aplica)

---

## 🔒 Configuración de Seguridad

### ⚠️ IMPORTANTE: Antes de subir a GitHub

**NUNCA subas estos archivos:**
- ✅ `config.js` (ya está en .gitignore)
- ✅ Archivos `.env`
- ✅ Credenciales de Google Cloud
- ✅ API Keys o tokens

### Verificar que no hay credenciales en el código

Ejecuta este comando para buscar posibles credenciales:

```bash
# Buscar posibles API keys
git grep -i "api_key\|apikey\|secret\|password\|token"

# Buscar IDs de Google
git grep -i "client_id\|spreadsheet_id"
```

Si encuentras algo, asegúrate de que esté en variables de configuración, no hardcodeado.

---

## 📤 Subir a GitHub

### Opción 1: Usando Git desde la Terminal

```bash
# 1. Inicializar repositorio (si no lo has hecho)
cd "c:\Users\foxso\OneDrive - Universidad Abierta y a Distancia de México\Documentos\Facturacion con IA"
git init

# 2. Agregar todos los archivos (excepto los del .gitignore)
git add .

# 3. Hacer el primer commit
git commit -m "Initial commit: Sistema de gestión de facturas"

# 4. Crear repositorio en GitHub
# Ve a https://github.com/new y crea un nuevo repositorio
# Nombre sugerido: facturacion-sistema

# 5. Conectar con GitHub (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/facturacion-sistema.git

# 6. Subir el código
git branch -M main
git push -u origin main
```

### Opción 2: Usando GitHub Desktop

1. Descarga [GitHub Desktop](https://desktop.github.com/)
2. Abre GitHub Desktop
3. File → Add Local Repository
4. Selecciona tu carpeta del proyecto
5. Publish repository
6. Marca "Keep this code private" si quieres que sea privado
7. Click en "Publish repository"

---

## 🌐 Despliegue con GitHub Pages

### Configuración Automática

```bash
# 1. Crear rama gh-pages
git checkout -b gh-pages

# 2. Subir a GitHub
git push origin gh-pages

# 3. Ir a Settings → Pages en tu repositorio de GitHub
# 4. Seleccionar rama: gh-pages
# 5. Click en Save
```

Tu sitio estará disponible en: `https://TU_USUARIO.github.io/facturacion-sistema/`

### ⚠️ Consideración de Seguridad para GitHub Pages

**PROBLEMA:** GitHub Pages es público, pero tu aplicación necesita credenciales privadas.

**SOLUCIÓN:** Usa variables de entorno del navegador o configuración en tiempo de ejecución.

---

## 🎯 Configuración para Clientes (Demo)

### Opción 1: Repositorio Privado con Acceso Limitado

1. Crea el repositorio como **privado**
2. Invita a clientes específicos:
   - Settings → Collaborators → Add people
   - Envía invitación por email

### Opción 2: Demo Pública con Datos de Prueba

1. Crea un Google Sheet de **demostración** con datos ficticios
2. Configura credenciales de solo lectura
3. Documenta claramente que son datos de prueba

#### Crear archivo de configuración de demo:

```javascript
// config.demo.js
const CONFIG = {
    SPREADSHEET_ID: 'ID_DE_SHEET_DE_DEMO_PUBLICO',
    GOOGLE_CLIENT_ID: 'CLIENT_ID_DE_DEMO.apps.googleusercontent.com',
    APP_NAME: 'FacturaControl - DEMO',
    VERSION: '1.0.0',
    CACHE_DURATION: 5 * 60 * 1000,
    IS_DEMO: true // Bandera para mostrar aviso de demo
};
```

### Opción 3: Video Demo + Repositorio Privado

**La más profesional:**

1. Graba un video de demostración (Loom, OBS, etc.)
2. Sube el video a YouTube (puede ser no listado)
3. Crea un README impresionante con:
   - Link al video
   - Capturas de pantalla
   - Descripción de características
4. Repositorio privado para el código real
5. Comparte acceso solo cuando sea necesario

---

## 🎨 Mejores Prácticas

### 1. README Profesional

Incluye:
- 🎯 Descripción clara del proyecto
- 📸 Capturas de pantalla o GIFs
- 🚀 Guía de inicio rápido
- 🔧 Requisitos del sistema
- 📝 Instrucciones de configuración
- 🤝 Información de contacto

### 2. Documentación Clara

Ya tienes varios archivos `.md`. Asegúrate de que estén actualizados:
- `README.md` - Descripción general
- `QUICKSTART.md` - Inicio rápido
- `SECURITY.md` - Políticas de seguridad
- `DEPLOYMENT_CHECKLIST.md` - Lista de verificación

### 3. Commits Profesionales

Usa mensajes descriptivos:

```bash
# ❌ Mal
git commit -m "fix"

# ✅ Bien
git commit -m "fix: Corregir formato de moneda de EUR a MXN"
git commit -m "feat: Agregar botones de acción para facturas"
git commit -m "docs: Actualizar guía de despliegue"
```

### 4. Versionado Semántico

Usa tags para versiones:

```bash
git tag -a v1.0.0 -m "Primera versión estable"
git push origin v1.0.0
```

### 5. Licencia

Agrega un archivo `LICENSE` si quieres especificar cómo otros pueden usar tu código.

---

## 🔐 Checklist de Seguridad Pre-Deploy

Antes de hacer `git push`, verifica:

- [ ] `config.js` está en `.gitignore`
- [ ] No hay API keys en el código
- [ ] `config.example.js` tiene valores de ejemplo, no reales
- [ ] README no contiene credenciales
- [ ] Archivos `.env` están en `.gitignore`
- [ ] Has revisado todos los archivos con `git status`
- [ ] Has probado la aplicación localmente

---

## 📊 Estructura Recomendada del Repositorio

```
facturacion-sistema/
├── .gitignore                    ✅ Protege credenciales
├── README.md                     ✅ Documentación principal
├── SECURITY.md                   ✅ Políticas de seguridad
├── QUICKSTART.md                 ✅ Guía rápida
├── GITHUB_DEPLOYMENT.md          ✅ Esta guía
├── config.example.js             ✅ Plantilla de configuración
├── index.html                    ✅ Aplicación principal
├── styles.css                    ✅ Estilos
├── app.js                        ✅ Lógica de la aplicación
├── screenshots/                  📸 Capturas de pantalla
│   ├── dashboard.png
│   ├── login.png
│   └── invoices.png
└── docs/                         📚 Documentación adicional
    ├── GOOGLE_OAUTH_SETUP.md
    └── DEPLOYMENT_CHECKLIST.md
```

---

## 🎬 Pasos Finales

### 1. Crear Capturas de Pantalla

Toma screenshots de:
- Pantalla de login
- Dashboard principal
- Vista de facturas
- Modal de detalles

Guárdalas en una carpeta `screenshots/`

### 2. Crear un Demo en Vivo

**Opción A: GitHub Pages**
- Gratis
- Fácil de configurar
- Requiere configuración pública de credenciales de demo

**Opción B: Vercel/Netlify**
- Gratis
- Soporta variables de entorno
- Más profesional
- Mejor para producción

**Opción C: Video Demo**
- Más seguro
- No expone código
- Perfecto para presentaciones

### 3. Preparar Presentación para Clientes

Crea un documento con:
1. **Descripción del proyecto** (2-3 párrafos)
2. **Características principales** (lista con bullets)
3. **Tecnologías utilizadas**
4. **Link al repositorio** (si es público)
5. **Link al demo en vivo** o video
6. **Contacto** para más información

---

## 🆘 Solución de Problemas

### "No puedo hacer push a GitHub"

```bash
# Verificar remote
git remote -v

# Si no hay remote, agregarlo
git remote add origin https://github.com/TU_USUARIO/REPO.git

# Si hay problemas de autenticación, usar token personal
# GitHub → Settings → Developer settings → Personal access tokens
```

### "Subí credenciales por error"

**¡URGENTE!**

1. **NO** hagas más commits
2. Revoca las credenciales inmediatamente en Google Cloud Console
3. Elimina el repositorio de GitHub
4. Crea nuevas credenciales
5. Vuelve a subir el proyecto correctamente

```bash
# Limpiar historial (CUIDADO: esto reescribe la historia)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch config.js" \
  --prune-empty --tag-name-filter cat -- --all

# Forzar push
git push origin --force --all
```

### "GitHub Pages no funciona"

1. Verifica que la rama sea `gh-pages` o `main`
2. Asegúrate de que `index.html` esté en la raíz
3. Espera 5-10 minutos para que se despliegue
4. Revisa Settings → Pages para ver el estado

---

## 📞 Recursos Adicionales

- [GitHub Docs](https://docs.github.com/)
- [GitHub Pages](https://pages.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## ✅ Checklist Final

Antes de compartir con clientes:

- [ ] Código limpio y comentado
- [ ] README profesional con capturas
- [ ] Demo funcional (video o en vivo)
- [ ] Sin credenciales expuestas
- [ ] Documentación completa
- [ ] Commits con mensajes claros
- [ ] Repositorio organizado
- [ ] Contacto y redes sociales actualizados

---

**¡Listo para impresionar a tus clientes! 🎉**

Si tienes dudas, revisa la documentación o contacta al equipo de desarrollo.
