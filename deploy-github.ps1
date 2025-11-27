# Script de Despliegue Seguro a GitHub
# Ejecutar en PowerShell

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  🚀 Script de Despliegue Seguro a GitHub                  ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Función para verificar si Git está instalado
function Test-GitInstalled {
    try {
        git --version | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Verificar Git
Write-Host "📋 Verificando requisitos..." -ForegroundColor Magenta
if (-not (Test-GitInstalled)) {
    Write-Host "❌ Git no está instalado" -ForegroundColor Red
    Write-Host "   Descarga Git desde: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Git instalado correctamente" -ForegroundColor Green

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "index.html")) {
    Write-Host "❌ No se encontró index.html" -ForegroundColor Red
    Write-Host "   Asegúrate de ejecutar este script desde la carpeta del proyecto" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Directorio del proyecto correcto" -ForegroundColor Green

# Verificar que config.js NO esté trackeado
Write-Host ""
Write-Host "🔒 Verificando seguridad..." -ForegroundColor Magenta

if (Test-Path "config.js") {
    $gitignoreContent = Get-Content ".gitignore" -Raw
    if ($gitignoreContent -notmatch "config\.js") {
        Write-Host "❌ PELIGRO: config.js no está en .gitignore" -ForegroundColor Red
        Write-Host "   Agregando config.js a .gitignore..." -ForegroundColor Yellow
        Add-Content ".gitignore" "`nconfig.js"
        Write-Host "✅ config.js agregado a .gitignore" -ForegroundColor Green
    }
    else {
        Write-Host "✅ config.js está protegido" -ForegroundColor Green
    }
}

# Verificar que config.example.js existe
if (-not (Test-Path "config.example.js")) {
    Write-Host "⚠️  config.example.js no encontrado" -ForegroundColor Yellow
    Write-Host "   Se recomienda crear este archivo como plantilla" -ForegroundColor Yellow
}

# Preguntar al usuario
Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "¿Qué deseas hacer?" -ForegroundColor White
Write-Host "1. Inicializar repositorio Git (primera vez)" -ForegroundColor White
Write-Host "2. Hacer commit de cambios" -ForegroundColor White
Write-Host "3. Subir a GitHub (push)" -ForegroundColor White
Write-Host "4. Todo lo anterior (setup completo)" -ForegroundColor White
Write-Host "5. Solo verificar seguridad" -ForegroundColor White
Write-Host "0. Salir" -ForegroundColor White
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan

$opcion = Read-Host "Selecciona una opción"

switch ($opcion) {
    "1" {
        Write-Host ""
        Write-Host "🔧 Inicializando repositorio Git..." -ForegroundColor Magenta
        
        if (Test-Path ".git") {
            Write-Host "⚠️  El repositorio ya está inicializado" -ForegroundColor Yellow
        }
        else {
            git init
            Write-Host "✅ Repositorio inicializado" -ForegroundColor Green
        }
        
        Write-Host ""
        Write-Host "📝 Próximos pasos:" -ForegroundColor Cyan
        Write-Host "1. Crea un repositorio en GitHub: https://github.com/new" -ForegroundColor White
        Write-Host "2. Ejecuta este script de nuevo y selecciona la opción 4" -ForegroundColor White
    }
    
    "2" {
        Write-Host ""
        Write-Host "📦 Preparando commit..." -ForegroundColor Magenta
        
        git add .
        
        Write-Host ""
        $mensaje = Read-Host "Mensaje del commit"
        
        if ([string]::IsNullOrWhiteSpace($mensaje)) {
            $mensaje = "Update: Cambios en el proyecto"
        }
        
        git commit -m $mensaje
        Write-Host "✅ Commit realizado" -ForegroundColor Green
    }
    
    "3" {
        Write-Host ""
        Write-Host "🚀 Subiendo a GitHub..." -ForegroundColor Magenta
        
        # Verificar si hay remote configurado
        $remotes = git remote
        if ([string]::IsNullOrWhiteSpace($remotes)) {
            Write-Host "⚠️  No hay remote configurado" -ForegroundColor Yellow
            Write-Host ""
            $repoUrl = Read-Host "URL del repositorio de GitHub (ej: https://github.com/usuario/repo.git)"
            
            if (-not [string]::IsNullOrWhiteSpace($repoUrl)) {
                git remote add origin $repoUrl
                Write-Host "✅ Remote configurado" -ForegroundColor Green
            }
            else {
                Write-Host "❌ URL inválida" -ForegroundColor Red
                exit 1
            }
        }
        
        # Push
        try {
            git push -u origin main
            Write-Host "✅ Código subido a GitHub exitosamente" -ForegroundColor Green
        }
        catch {
            Write-Host "⚠️  Intentando con rama master..." -ForegroundColor Yellow
            try {
                git branch -M main
                git push -u origin main
                Write-Host "✅ Código subido a GitHub exitosamente" -ForegroundColor Green
            }
            catch {
                Write-Host "❌ Error al subir a GitHub" -ForegroundColor Red
                Write-Host "   Verifica tus credenciales y la URL del repositorio" -ForegroundColor Yellow
            }
        }
    }
    
    "4" {
        Write-Host ""
        Write-Host "🎯 Setup completo..." -ForegroundColor Magenta
        Write-Host ""
        
        # Inicializar
        if (-not (Test-Path ".git")) {
            git init
            Write-Host "✅ Repositorio inicializado" -ForegroundColor Green
        }
        
        # Agregar archivos
        git add .
        Write-Host "✅ Archivos agregados" -ForegroundColor Green
        
        # Commit
        $mensaje = Read-Host "Mensaje del commit (Enter para usar mensaje por defecto)"
        if ([string]::IsNullOrWhiteSpace($mensaje)) {
            $mensaje = "Initial commit: Sistema de gestión de facturas"
        }
        git commit -m $mensaje
        Write-Host "✅ Commit realizado" -ForegroundColor Green
        
        # Configurar remote
        Write-Host ""
        Write-Host "Ahora necesitas la URL de tu repositorio de GitHub" -ForegroundColor Cyan
        Write-Host "1. Ve a https://github.com/new" -ForegroundColor White
        Write-Host "2. Crea un nuevo repositorio" -ForegroundColor White
        Write-Host "3. Copia la URL (ej: https://github.com/usuario/repo.git)" -ForegroundColor White
        Write-Host ""
        
        $repoUrl = Read-Host "URL del repositorio de GitHub"
        
        if (-not [string]::IsNullOrWhiteSpace($repoUrl)) {
            git remote add origin $repoUrl
            git branch -M main
            
            Write-Host ""
            Write-Host "🚀 Subiendo a GitHub..." -ForegroundColor Magenta
            
            try {
                git push -u origin main
                Write-Host ""
                Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
                Write-Host "║  ✅ ¡ÉXITO! Proyecto subido a GitHub                      ║" -ForegroundColor Green
                Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
                Write-Host ""
                Write-Host "Tu repositorio está en: $repoUrl" -ForegroundColor Cyan
            }
            catch {
                Write-Host "❌ Error al subir a GitHub" -ForegroundColor Red
                Write-Host "   Verifica tus credenciales y la URL del repositorio" -ForegroundColor Yellow
            }
        }
    }
    
    "5" {
        Write-Host ""
        Write-Host "🔍 Ejecutando verificación de seguridad..." -ForegroundColor Magenta
        Write-Host ""
        
        # Verificar archivos sensibles
        $archivosProhibidos = @("config.js", ".env", ".env.local")
        $gitignoreContent = Get-Content ".gitignore" -Raw
        
        foreach ($archivo in $archivosProhibidos) {
            if (Test-Path $archivo) {
                if ($gitignoreContent -match [regex]::Escape($archivo)) {
                    Write-Host "✅ $archivo está protegido" -ForegroundColor Green
                }
                else {
                    Write-Host "❌ PELIGRO: $archivo no está en .gitignore" -ForegroundColor Red
                }
            }
        }
        
        Write-Host ""
        Write-Host "Para una verificación completa, ejecuta:" -ForegroundColor Cyan
        Write-Host "node security-check.js" -ForegroundColor White
    }
    
    "0" {
        Write-Host "👋 Saliendo..." -ForegroundColor Yellow
        exit 0
    }
    
    default {
        Write-Host "❌ Opción inválida" -ForegroundColor Red
        exit 1
    }
}


