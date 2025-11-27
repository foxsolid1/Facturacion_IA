#!/usr/bin/env node

/**
 * Script de Verificación de Seguridad Pre-Deploy
 * Ejecutar antes de hacer git push para verificar que no hay credenciales expuestas
 */

const fs = require('fs');
const path = require('path');

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
};

// Patrones peligrosos a buscar
const dangerousPatterns = [
    { pattern: /AIza[0-9A-Za-z-_]{35}/, name: 'Google API Key' },
    { pattern: /[0-9]+-[0-9A-Za-z_]{32}\.apps\.googleusercontent\.com/, name: 'Google OAuth Client ID' },
    { pattern: /sk-[a-zA-Z0-9]{48}/, name: 'OpenAI API Key' },
    { pattern: /ghp_[a-zA-Z0-9]{36}/, name: 'GitHub Personal Access Token' },
    { pattern: /xox[baprs]-[0-9a-zA-Z]{10,48}/, name: 'Slack Token' },
    { pattern: /AKIA[0-9A-Z]{16}/, name: 'AWS Access Key' },
];

// Archivos a verificar
const filesToCheck = [
    'index.html',
    'app.js',
    'styles.css',
    'README.md',
    'config.example.js',
];

// Archivos que NO deben estar en el repositorio
const forbiddenFiles = [
    'config.js',
    '.env',
    '.env.local',
    '.env.production',
];

console.log(`${colors.blue}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.blue}║  🔒 Verificación de Seguridad Pre-Deploy                  ║${colors.reset}`);
console.log(`${colors.blue}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`);

let hasErrors = false;
let hasWarnings = false;

// 1. Verificar que archivos sensibles NO estén trackeados
console.log(`${colors.magenta}📋 Verificando archivos sensibles...${colors.reset}`);
forbiddenFiles.forEach(file => {
    if (fs.existsSync(file)) {
        // Verificar si está en .gitignore
        const gitignore = fs.readFileSync('.gitignore', 'utf8');
        if (!gitignore.includes(file)) {
            console.log(`${colors.red}❌ ERROR: ${file} existe pero NO está en .gitignore${colors.reset}`);
            hasErrors = true;
        } else {
            console.log(`${colors.green}✅ ${file} está protegido por .gitignore${colors.reset}`);
        }
    }
});

// 2. Buscar patrones peligrosos en archivos
console.log(`\n${colors.magenta}🔍 Buscando credenciales en archivos...${colors.reset}`);
filesToCheck.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`${colors.yellow}⚠️  ${file} no encontrado (omitiendo)${colors.reset}`);
        return;
    }

    const content = fs.readFileSync(file, 'utf8');
    let fileHasIssues = false;

    dangerousPatterns.forEach(({ pattern, name }) => {
        const matches = content.match(pattern);
        if (matches) {
            console.log(`${colors.red}❌ PELIGRO en ${file}: Posible ${name} encontrado${colors.reset}`);
            console.log(`${colors.yellow}   Fragmento: ${matches[0].substring(0, 20)}...${colors.reset}`);
            hasErrors = true;
            fileHasIssues = true;
        }
    });

    if (!fileHasIssues) {
        console.log(`${colors.green}✅ ${file} - Sin credenciales detectadas${colors.reset}`);
    }
});

// 3. Verificar que config.example.js tenga valores de ejemplo
console.log(`\n${colors.magenta}📝 Verificando config.example.js...${colors.reset}`);
if (fs.existsSync('config.example.js')) {
    const configExample = fs.readFileSync('config.example.js', 'utf8');

    if (configExample.includes('TU_SPREADSHEET_ID_AQUI') &&
        configExample.includes('TU_CLIENT_ID_AQUI')) {
        console.log(`${colors.green}✅ config.example.js tiene valores de ejemplo correctos${colors.reset}`);
    } else {
        console.log(`${colors.red}❌ ERROR: config.example.js parece tener valores reales${colors.reset}`);
        hasErrors = true;
    }
} else {
    console.log(`${colors.yellow}⚠️  config.example.js no encontrado${colors.reset}`);
    hasWarnings = true;
}

// 4. Verificar que .gitignore existe
console.log(`\n${colors.magenta}🛡️  Verificando .gitignore...${colors.reset}`);
if (fs.existsSync('.gitignore')) {
    const gitignore = fs.readFileSync('.gitignore', 'utf8');
    const requiredEntries = ['config.js', '.env', 'node_modules'];

    let allPresent = true;
    requiredEntries.forEach(entry => {
        if (!gitignore.includes(entry)) {
            console.log(`${colors.red}❌ .gitignore no incluye: ${entry}${colors.reset}`);
            hasErrors = true;
            allPresent = false;
        }
    });

    if (allPresent) {
        console.log(`${colors.green}✅ .gitignore configurado correctamente${colors.reset}`);
    }
} else {
    console.log(`${colors.red}❌ ERROR: .gitignore no existe${colors.reset}`);
    hasErrors = true;
}

// 5. Verificar que README existe
console.log(`\n${colors.magenta}📖 Verificando documentación...${colors.reset}`);
if (fs.existsSync('README.md')) {
    console.log(`${colors.green}✅ README.md existe${colors.reset}`);
} else {
    console.log(`${colors.yellow}⚠️  README.md no encontrado - Se recomienda crear uno${colors.reset}`);
    hasWarnings = true;
}

// Resumen final
console.log(`\n${colors.blue}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.blue}║  📊 Resumen de Verificación                                ║${colors.reset}`);
console.log(`${colors.blue}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`);

if (hasErrors) {
    console.log(`${colors.red}❌ ERRORES ENCONTRADOS - NO SUBIR A GITHUB${colors.reset}`);
    console.log(`${colors.yellow}   Por favor, corrige los errores antes de hacer git push${colors.reset}\n`);
    process.exit(1);
} else if (hasWarnings) {
    console.log(`${colors.yellow}⚠️  ADVERTENCIAS ENCONTRADAS${colors.reset}`);
    console.log(`${colors.yellow}   Puedes continuar, pero revisa las advertencias${colors.reset}\n`);
    process.exit(0);
} else {
    console.log(`${colors.green}✅ TODO CORRECTO - Seguro para subir a GitHub${colors.reset}`);
    console.log(`${colors.green}   Puedes hacer git push con confianza${colors.reset}\n`);
    process.exit(0);
}
