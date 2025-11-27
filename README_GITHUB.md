# 🧾 FacturaControl - Sistema de Gestión de Facturas

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

**Sistema profesional de gestión y visualización de facturas para contadores y profesionales de finanzas**

[Demo en Vivo](#) · [Documentación](GITHUB_DEPLOYMENT.md) · [Reportar Bug](#) · [Solicitar Feature](#)

</div>

---

## 📸 Vista Previa

<!-- Agrega tus capturas de pantalla aquí -->
<div align="center">
  <img src="screenshots/dashboard.png" alt="Dashboard" width="800"/>
  <p><em>Dashboard principal con estadísticas en tiempo real</em></p>
</div>

---

## ✨ Características Principales

### 🔐 Seguridad
- **Autenticación OAuth 2.0** con Google
- **Protección de credenciales** mediante variables de entorno
- **Sesiones seguras** con tokens JWT
- **Acceso controlado** por usuario

### 📊 Dashboard Inteligente
- **Estadísticas en tiempo real** - Total de facturas, importes, IVA
- **Gráficos interactivos** - Visualización de datos por período
- **Resumen mensual** - Análisis del mes actual
- **Tendencias** - Comparativas con períodos anteriores

### 🔍 Búsqueda y Filtros Avanzados
- **Búsqueda instantánea** por número, emisor, NIF o descripción
- **Filtros múltiples** por categoría, fecha, rango de importes
- **Ordenamiento flexible** por cualquier columna
- **Exportación a CSV** de resultados filtrados

### 💰 Gestión de Facturas
- **Ver detalles completos** de cada factura
- **Editar información** (próximamente)
- **Duplicar facturas** para agilizar la entrada de datos
- **Eliminar facturas** con confirmación de seguridad
- **Soporte multi-moneda** (MXN, USD, EUR)

### 🎨 Diseño Moderno
- **Interfaz oscura profesional** que reduce la fatiga visual
- **Responsive design** - funciona en desktop, tablet y móvil
- **Animaciones suaves** para mejor experiencia de usuario
- **Iconos SVG** escalables y nítidos
- **Notificaciones toast** elegantes y no intrusivas

### 🔄 Sincronización Automática
- **Integración con Google Sheets** en tiempo real
- **Detección de cambios** automática
- **Actualización manual** con un click
- **Cache inteligente** para mejor rendimiento

---

## 🚀 Inicio Rápido

### Prerrequisitos

```bash
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Cuenta de Google
- Python 3.x o Node.js (para servidor local)
```

### Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/TU_USUARIO/facturacion-sistema.git
cd facturacion-sistema
```

2. **Configurar credenciales**

```bash
# Copiar el archivo de ejemplo
cp config.example.js config.js

# Editar config.js con tus credenciales
# - SPREADSHEET_ID: ID de tu Google Sheet
# - GOOGLE_CLIENT_ID: Client ID de Google Cloud Console
```

3. **Ejecutar servidor local**

```bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js
npx http-server -p 8000
```

4. **Abrir en el navegador**

```
http://localhost:8000
```

### Configuración de Google Cloud

Para instrucciones detalladas de configuración de Google OAuth y Sheets API, consulta:
- 📖 [Guía de Configuración de Google OAuth](GOOGLE_OAUTH_SETUP.md)
- 🚀 [Guía de Inicio Rápido](QUICKSTART.md)

---

## 📖 Documentación

### Guías Disponibles

- 📘 [Guía de Despliegue en GitHub](GITHUB_DEPLOYMENT.md)
- 🔒 [Políticas de Seguridad](SECURITY.md)
- ⚡ [Comandos Git Rápidos](GIT_COMMANDS.md)
- 🎯 [Guía Visual Paso a Paso](GITHUB_VISUAL_GUIDE.md)
- ✅ [Checklist de Despliegue](DEPLOYMENT_CHECKLIST.md)

### Estructura del Proyecto

```
facturacion-sistema/
├── 📄 index.html              # Página principal
├── 🎨 styles.css              # Estilos CSS personalizados
├── ⚙️  app.js                 # Lógica de la aplicación
├── 🔧 config.example.js       # Plantilla de configuración
├── 🔐 config.js               # Configuración real (no incluido en Git)
├── 📋 .gitignore              # Archivos ignorados por Git
├── 📖 README.md               # Este archivo
├── 🔒 SECURITY.md             # Políticas de seguridad
├── 🚀 QUICKSTART.md           # Guía de inicio rápido
├── 📚 docs/                   # Documentación adicional
└── 📸 screenshots/            # Capturas de pantalla
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS
- **JavaScript (ES6+)** - Lógica de la aplicación
- **Google Identity Services** - Autenticación OAuth 2.0

### Integración
- **Google Sheets API** - Base de datos en la nube
- **Google OAuth 2.0** - Autenticación segura

### Herramientas de Desarrollo
- **Git** - Control de versiones
- **GitHub** - Hosting del código
- **Python/Node.js** - Servidor de desarrollo local

---

## 🎯 Casos de Uso

### Para Contadores
- Gestión centralizada de facturas de múltiples clientes
- Generación de reportes mensuales automáticos
- Seguimiento de IVA y deducciones
- Exportación de datos para declaraciones fiscales

### Para Empresas
- Control de gastos por categoría
- Análisis de proveedores
- Presupuesto vs. Real
- Auditoría de facturas

### Para Freelancers
- Seguimiento de ingresos y gastos
- Organización de facturas por proyecto
- Cálculo de impuestos estimados
- Preparación para declaraciones

---

## 🔐 Seguridad

Este proyecto implementa las siguientes medidas de seguridad:

✅ **Autenticación OAuth 2.0** - Solo usuarios autorizados  
✅ **Credenciales protegidas** - No se incluyen en el repositorio  
✅ **HTTPS obligatorio** - En producción  
✅ **Validación de datos** - Sanitización de inputs  
✅ **Sesiones seguras** - Tokens con expiración  

Para más detalles, consulta [SECURITY.md](SECURITY.md)

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Código de Conducta

Por favor, lee nuestro [Código de Conducta](CODE_OF_CONDUCT.md) antes de contribuir.

---

## 📝 Roadmap

### Versión 1.1 (Próximamente)
- [ ] Gráficos interactivos con Chart.js
- [ ] Exportación a PDF
- [ ] Modo claro/oscuro toggle
- [ ] Notificaciones push

### Versión 1.2
- [ ] Edición de facturas
- [ ] Carga de archivos adjuntos
- [ ] API REST para integraciones
- [ ] App móvil nativa

### Versión 2.0
- [ ] Backend con Node.js
- [ ] Base de datos PostgreSQL
- [ ] Sistema de roles y permisos
- [ ] Multi-empresa

---

## 🐛 Reportar Problemas

Si encuentras un bug o tienes una sugerencia:

1. Verifica que no exista un issue similar
2. Crea un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs. actual
   - Capturas de pantalla (si aplica)
   - Información del navegador/sistema

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial* - [@TuUsuario](https://github.com/TuUsuario)

Ver también la lista de [contribuidores](https://github.com/TuUsuario/facturacion-sistema/contributors) que participaron en este proyecto.

---

## 🙏 Agradecimientos

- Inspiración de diseño: [Tailwind UI](https://tailwindui.com/)
- Iconos: [Heroicons](https://heroicons.com/)
- Fuentes: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- Comunidad de GitHub por el feedback

---

## 📞 Contacto

**Tu Nombre**

- 🌐 Website: [tuwebsite.com](https://tuwebsite.com)
- 📧 Email: tu@email.com
- 💼 LinkedIn: [Tu Perfil](https://linkedin.com/in/tuperfil)
- 🐦 Twitter: [@tuusuario](https://twitter.com/tuusuario)

**Link del Proyecto:** [https://github.com/TuUsuario/facturacion-sistema](https://github.com/TuUsuario/facturacion-sistema)

---

## ⭐ Muestra tu Apoyo

Si este proyecto te fue útil, ¡dale una ⭐ en GitHub!

---

<div align="center">

**Desarrollado con ❤️ para profesionales de finanzas y contabilidad**

[⬆ Volver arriba](#-facturacontrol---sistema-de-gestión-de-facturas)

</div>
