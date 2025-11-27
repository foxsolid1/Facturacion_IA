# 🎯 Guía Visual: Subir a GitHub en 5 Pasos

Esta guía te llevará paso a paso para subir tu proyecto a GitHub de forma segura.

---

## 📌 Antes de Empezar

### ✅ Checklist de Preparación

- [ ] Git instalado en tu computadora
- [ ] Cuenta de GitHub creada
- [ ] Proyecto funcionando localmente
- [ ] `config.js` con tus credenciales reales (NO se subirá)
- [ ] `config.example.js` con valores de ejemplo (SÍ se subirá)

---

## 🚀 PASO 1: Verificar Seguridad

### Opción A: Usar el Script Automático (Recomendado)

```powershell
# Ejecuta en PowerShell
.\deploy-github.ps1
```

Selecciona la opción **5** (Solo verificar seguridad)

### Opción B: Verificación Manual

```bash
# Verifica que config.js está en .gitignore
cat .gitignore | grep config.js

# Debe mostrar: config.js ✅
```

### ⚠️ IMPORTANTE

Si ves algún error de seguridad, **DETENTE** y corrígelo antes de continuar.

---

## 🌐 PASO 2: Crear Repositorio en GitHub

### 2.1 Ir a GitHub

1. Abre tu navegador
2. Ve a: https://github.com/new
3. Inicia sesión si no lo has hecho

### 2.2 Configurar el Repositorio

```
┌─────────────────────────────────────────────┐
│ Create a new repository                     │
├─────────────────────────────────────────────┤
│                                             │
│ Repository name *                           │
│ ┌─────────────────────────────────────┐    │
│ │ facturacion-sistema                 │    │
│ └─────────────────────────────────────┘    │
│                                             │
│ Description (optional)                      │
│ ┌─────────────────────────────────────┐    │
│ │ Sistema de gestión de facturas      │    │
│ └─────────────────────────────────────┘    │
│                                             │
│ ○ Public    ● Private                      │
│                                             │
│ ☐ Add a README file                        │
│ ☐ Add .gitignore                           │
│ ☐ Choose a license                         │
│                                             │
│        [Create repository]                  │
└─────────────────────────────────────────────┘
```

**Configuración Recomendada:**
- **Nombre**: `facturacion-sistema` (o el que prefieras)
- **Descripción**: "Sistema profesional de gestión de facturas"
- **Visibilidad**: 
  - ✅ **Private** - Para uso personal/empresarial
  - ⚠️ **Public** - Solo si vas a usar datos de demostración
- **NO marques** ninguna de las opciones adicionales

### 2.3 Copiar la URL

Después de crear el repositorio, verás una pantalla como esta:

```
Quick setup — if you've done this kind of thing before

HTTPS   SSH

┌─────────────────────────────────────────────────────────┐
│ https://github.com/TU_USUARIO/facturacion-sistema.git  │ 📋
└─────────────────────────────────────────────────────────┘
```

**Copia esta URL** - la necesitarás en el siguiente paso.

---

## 💻 PASO 3: Subir el Código

### Opción A: Usar el Script PowerShell (Más Fácil)

```powershell
# Ejecuta en PowerShell
.\deploy-github.ps1
```

Selecciona la opción **4** (Todo lo anterior - setup completo)

Cuando te pida la URL, pega la que copiaste en el paso anterior.

### Opción B: Comandos Manuales

```bash
# 1. Inicializar Git (si no lo has hecho)
git init

# 2. Agregar todos los archivos
git add .

# 3. Hacer el primer commit
git commit -m "Initial commit: Sistema de gestión de facturas"

# 4. Conectar con GitHub (reemplaza con TU URL)
git remote add origin https://github.com/TU_USUARIO/facturacion-sistema.git

# 5. Subir a GitHub
git branch -M main
git push -u origin main
```

### 🔐 Autenticación

GitHub te pedirá autenticación. Tienes dos opciones:

#### Opción 1: Token Personal (Recomendado)

1. Ve a: https://github.com/settings/tokens
2. Click en "Generate new token (classic)"
3. Selecciona permisos: `repo`, `workflow`
4. Copia el token
5. Úsalo como **contraseña** cuando Git lo pida

#### Opción 2: GitHub Desktop

1. Descarga [GitHub Desktop](https://desktop.github.com/)
2. Instala y abre la aplicación
3. File → Add Local Repository
4. Selecciona tu carpeta
5. Publish repository

---

## ✅ PASO 4: Verificar que Funcionó

### 4.1 Ir a tu Repositorio

Abre en tu navegador:
```
https://github.com/TU_USUARIO/facturacion-sistema
```

Deberías ver algo como:

```
┌─────────────────────────────────────────────────────────┐
│ TU_USUARIO / facturacion-sistema                       │
│ ● Private                                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📁 .gitignore                                          │
│ 📁 README.md                                           │
│ 📁 index.html                                          │
│ 📁 app.js                                              │
│ 📁 styles.css                                          │
│ 📁 config.example.js                                   │
│ 📁 ...                                                 │
│                                                         │
│ ⚠️ config.js NO debe aparecer aquí ⚠️                 │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Verificación de Seguridad

**CRÍTICO**: Verifica que estos archivos **NO** estén en GitHub:

- ❌ `config.js`
- ❌ `.env`
- ❌ Cualquier archivo con credenciales

Si ves alguno de estos archivos, **ELIMINA EL REPOSITORIO INMEDIATAMENTE** y vuelve a empezar.

---

## 🎨 PASO 5: Preparar para Clientes

Ahora tienes 3 opciones para mostrar tu proyecto a clientes:

### Opción 1: Demo en Vivo con GitHub Pages

**Pros**: Gratis, fácil de compartir
**Contras**: Requiere credenciales públicas de demo

```bash
# Crear rama gh-pages
git checkout -b gh-pages
git push origin gh-pages
```

Luego en GitHub:
1. Settings → Pages
2. Source: `gh-pages`
3. Save

Tu demo estará en: `https://TU_USUARIO.github.io/facturacion-sistema/`

⚠️ **IMPORTANTE**: Usa un Google Sheet de DEMO con datos ficticios.

### Opción 2: Video Demostración

**Pros**: Más seguro, profesional
**Contras**: Requiere grabar video

1. Graba tu pantalla mostrando el sistema (usa OBS, Loom, etc.)
2. Sube a YouTube (puede ser "No listado")
3. Agrega el link al README

```markdown
## 🎬 Demo en Video

[![Ver Demo](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

[Click aquí para ver la demostración](https://www.youtube.com/watch?v=VIDEO_ID)
```

### Opción 3: Repositorio Privado + Acceso Limitado

**Pros**: Más seguro, código real
**Contras**: Requiere invitar a cada cliente

1. En tu repositorio: Settings → Collaborators
2. Click "Add people"
3. Ingresa el email del cliente
4. Envía invitación

---

## 📸 BONUS: Agregar Capturas de Pantalla

### 1. Crear carpeta de screenshots

```bash
mkdir screenshots
```

### 2. Tomar capturas

Toma screenshots de:
- Login
- Dashboard
- Vista de facturas
- Modal de detalles

Guárdalas en la carpeta `screenshots/`

### 3. Actualizar README

```markdown
## 📸 Capturas de Pantalla

### Dashboard Principal
![Dashboard](screenshots/dashboard.png)

### Vista de Facturas
![Facturas](screenshots/facturas.png)

### Detalles de Factura
![Detalles](screenshots/detalles.png)
```

### 4. Subir las imágenes

```bash
git add screenshots/
git commit -m "docs: Agregar capturas de pantalla"
git push
```

---

## 🎯 Checklist Final

Antes de compartir con clientes, verifica:

- [ ] ✅ Repositorio creado en GitHub
- [ ] ✅ Código subido correctamente
- [ ] ✅ `config.js` NO está en GitHub
- [ ] ✅ README actualizado y profesional
- [ ] ✅ Capturas de pantalla agregadas
- [ ] ✅ Demo funcionando (video o en vivo)
- [ ] ✅ Documentación completa
- [ ] ✅ Contacto actualizado

---

## 🆘 ¿Algo Salió Mal?

### Error: "Permission denied"

```bash
# Verifica tu autenticación
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Usa un token personal en lugar de contraseña
```

### Error: "Repository not found"

```bash
# Verifica la URL del remote
git remote -v

# Si es incorrecta, cámbiala
git remote set-url origin https://github.com/USUARIO_CORRECTO/REPO_CORRECTO.git
```

### Subí credenciales por error

**¡URGENTE!**

1. Ve a Google Cloud Console
2. **REVOCA** las credenciales inmediatamente
3. **ELIMINA** el repositorio de GitHub
4. Crea nuevas credenciales
5. Vuelve a empezar desde el PASO 1

---

## 📞 Recursos de Ayuda

- 📖 [Guía Completa de Despliegue](GITHUB_DEPLOYMENT.md)
- 🔐 [Guía de Seguridad](SECURITY.md)
- ⚡ [Comandos Git Rápidos](GIT_COMMANDS.md)
- 🚀 [Inicio Rápido](QUICKSTART.md)

---

## 🎉 ¡Felicidades!

Tu proyecto ya está en GitHub de forma segura y profesional.

**Próximos pasos sugeridos:**

1. ✨ Agregar más capturas de pantalla
2. 📹 Grabar un video demo
3. 📝 Escribir documentación adicional
4. 🎨 Personalizar el README con tu marca
5. 🔗 Compartir con tus primeros clientes

---

**¿Necesitas ayuda?** Revisa los archivos de documentación o contacta al equipo de desarrollo.

**¡Éxito con tus demostraciones! 🚀**
