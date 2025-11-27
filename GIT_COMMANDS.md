# 🚀 Comandos Rápidos para GitHub

Esta es una guía rápida de comandos para trabajar con Git y GitHub.

## 📋 Comandos Básicos

### Primera vez (Configuración inicial)

```bash
# Configurar tu nombre y email
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Inicializar repositorio
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: Sistema de gestión de facturas"

# Conectar con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/facturacion-sistema.git

# Subir a GitHub
git branch -M main
git push -u origin main
```

### Uso diario

```bash
# Ver estado de archivos
git status

# Agregar archivos modificados
git add .

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir cambios
git push

# Descargar cambios
git pull
```

## 🔒 Verificación de Seguridad

### Antes de cada push

```bash
# Opción 1: Script automático (recomendado)
node security-check.js

# Opción 2: PowerShell (Windows)
.\deploy-github.ps1

# Opción 3: Manual
git status
# Verifica que config.js NO aparezca en la lista
```

### Verificar .gitignore

```bash
# Ver archivos ignorados
git status --ignored

# Verificar que config.js está ignorado
git check-ignore config.js
# Si devuelve "config.js", está protegido ✅
```

## 📝 Mensajes de Commit Profesionales

### Formato recomendado

```bash
# Nuevas características
git commit -m "feat: Agregar botones de acción para facturas"

# Correcciones
git commit -m "fix: Corregir formato de moneda de EUR a MXN"

# Documentación
git commit -m "docs: Actualizar guía de despliegue"

# Estilos/formato
git commit -m "style: Mejorar diseño de notificaciones"

# Refactorización
git commit -m "refactor: Optimizar función de carga de datos"

# Rendimiento
git commit -m "perf: Mejorar velocidad de búsqueda"

# Tests
git commit -m "test: Agregar pruebas para formateo de moneda"
```

## 🌿 Trabajar con Ramas

```bash
# Crear nueva rama
git checkout -b feature/nueva-funcionalidad

# Ver ramas
git branch

# Cambiar de rama
git checkout main

# Fusionar rama
git merge feature/nueva-funcionalidad

# Eliminar rama
git branch -d feature/nueva-funcionalidad
```

## 🔄 Actualizar desde GitHub

```bash
# Descargar cambios sin fusionar
git fetch

# Descargar y fusionar
git pull

# Ver diferencias antes de fusionar
git diff main origin/main
```

## 🏷️ Versiones (Tags)

```bash
# Crear tag
git tag -a v1.0.0 -m "Primera versión estable"

# Ver tags
git tag

# Subir tag a GitHub
git push origin v1.0.0

# Subir todos los tags
git push --tags
```

## 🆘 Solución de Problemas

### Deshacer cambios no commiteados

```bash
# Deshacer cambios en un archivo
git checkout -- archivo.js

# Deshacer todos los cambios
git reset --hard
```

### Deshacer último commit (sin perder cambios)

```bash
git reset --soft HEAD~1
```

### Deshacer último commit (perdiendo cambios)

```bash
git reset --hard HEAD~1
```

### Cambiar mensaje del último commit

```bash
git commit --amend -m "Nuevo mensaje"
```

### Ver historial

```bash
# Historial completo
git log

# Historial resumido
git log --oneline

# Últimos 5 commits
git log -5

# Con gráfico
git log --graph --oneline --all
```

## 🔐 Credenciales

### Guardar credenciales (Windows)

```bash
git config --global credential.helper wincred
```

### Usar Token de GitHub (recomendado)

1. Ve a GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Selecciona permisos: `repo`, `workflow`
4. Copia el token
5. Úsalo como contraseña cuando Git lo pida

### Cambiar URL de remote

```bash
# Ver URL actual
git remote -v

# Cambiar URL
git remote set-url origin https://github.com/NUEVO_USUARIO/NUEVO_REPO.git
```

## 📦 Archivos Grandes

### Si tienes archivos grandes (>100MB)

```bash
# Instalar Git LFS
git lfs install

# Trackear archivos grandes
git lfs track "*.psd"
git lfs track "*.mp4"

# Agregar .gitattributes
git add .gitattributes
```

## 🌐 GitHub Pages

### Desplegar en GitHub Pages

```bash
# Opción 1: Desde rama main
# Ve a Settings → Pages → Source: main

# Opción 2: Crear rama gh-pages
git checkout -b gh-pages
git push origin gh-pages
# Ve a Settings → Pages → Source: gh-pages
```

## 📊 Estadísticas

```bash
# Ver contribuciones
git shortlog -sn

# Ver cambios en archivos
git diff --stat

# Ver quién modificó cada línea
git blame archivo.js
```

## 🔍 Búsqueda

```bash
# Buscar en commits
git log --grep="palabra"

# Buscar en código
git grep "palabra"

# Buscar en archivos específicos
git grep "palabra" -- "*.js"
```

## 🚀 Comandos Avanzados

### Stash (guardar cambios temporalmente)

```bash
# Guardar cambios
git stash

# Ver stashes
git stash list

# Recuperar último stash
git stash pop

# Recuperar stash específico
git stash apply stash@{0}
```

### Cherry-pick (aplicar commit específico)

```bash
git cherry-pick <commit-hash>
```

### Rebase (reescribir historial)

```bash
# Rebase interactivo (últimos 3 commits)
git rebase -i HEAD~3
```

## 📱 Alias Útiles

```bash
# Configurar alias
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'

# Ahora puedes usar:
git st  # en lugar de git status
git co  # en lugar de git checkout
```

## ✅ Checklist Pre-Push

Antes de cada `git push`, verifica:

- [ ] `git status` - No hay archivos sensibles
- [ ] `node security-check.js` - Pasa verificación de seguridad
- [ ] Mensaje de commit descriptivo
- [ ] Código probado localmente
- [ ] Documentación actualizada

## 🔗 Recursos

- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [GitHub Docs](https://docs.github.com/)
- [Git Book](https://git-scm.com/book/es/v2)
- [Oh My Git!](https://ohmygit.org/) - Juego para aprender Git

---

**💡 Tip:** Guarda este archivo como referencia rápida. Puedes imprimirlo o tenerlo abierto mientras trabajas.
