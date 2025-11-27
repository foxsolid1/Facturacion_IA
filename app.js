// ===== VARIABLES GLOBALES =====
let invoicesData = [];
let filteredData = [];
let currentUser = null;
let googleAuth = null;
let lastDataHash = null; // Para detectar cambios en los datos

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Cargar Google Sign-In API
    loadGoogleSignIn();

    // Event Listeners
    setupEventListeners();
}

// ===== GOOGLE SIGN-IN =====
function loadGoogleSignIn() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.head.appendChild(script);
}

function initializeGoogleSignIn() {
    // Inicializar Google Identity Services
    google.accounts.id.initialize({
        client_id: CONFIG.GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
    });

    // Renderizar el botón de Google Sign-In
    const signInBtn = document.getElementById('googleSignInBtn');
    if (signInBtn) {
        signInBtn.addEventListener('click', () => {
            google.accounts.id.prompt();
        });
    }

    // Verificar si hay sesión activa
    checkExistingSession();
}

function handleCredentialResponse(response) {
    // Decodificar el JWT token
    const userInfo = parseJwt(response.credential);

    currentUser = {
        id: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
    };

    // Guardar sesión
    localStorage.setItem('userSession', JSON.stringify(currentUser));

    // Mostrar dashboard
    showDashboard();
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function checkExistingSession() {
    const savedSession = localStorage.getItem('userSession');
    if (savedSession) {
        currentUser = JSON.parse(savedSession);
        showDashboard();
    }
}

function showDashboard() {
    // Ocultar login, mostrar dashboard
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboardScreen').style.display = 'flex';

    // Actualizar información del usuario
    updateUserProfile();

    // Cargar datos de facturas
    loadInvoicesData();
}

function updateUserProfile() {
    if (currentUser) {
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userEmail').textContent = currentUser.email;
        document.getElementById('userAvatar').src = currentUser.picture || 'https://via.placeholder.com/40';
    }
}

function logout() {
    // Limpiar sesión
    localStorage.removeItem('userSession');
    currentUser = null;
    invoicesData = [];
    filteredData = [];

    // Cerrar sesión de Google
    google.accounts.id.disableAutoSelect();

    // Mostrar login
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('dashboardScreen').style.display = 'none';
}

// ===== CARGA DE DATOS DE GOOGLE SHEETS =====
async function loadInvoicesData(isRefresh = false) {
    try {
        showLoading(true);

        // Obtener datos del Google Sheets
        const url = getSheetURL();
        const response = await fetch(url);
        const text = await response.text();

        // Parsear la respuesta (Google Sheets devuelve JSONP)
        const json = JSON.parse(text.substring(47).slice(0, -2));

        // Crear hash de los datos para detectar cambios
        const currentHash = JSON.stringify(json);

        // Si es una actualización, verificar si hay cambios
        if (isRefresh && lastDataHash) {
            if (currentHash === lastDataHash) {
                showNotification('No hay nuevos datos', 'info');
                showLoading(false);
                return;
            } else {
                const oldCount = invoicesData.length;
                const newData = parseSheetData(json);
                const newCount = newData.length;

                if (newCount > oldCount) {
                    showNotification(`Se encontraron ${newCount - oldCount} nueva(s) factura(s)`, 'success');
                } else if (newCount < oldCount) {
                    showNotification(`Se eliminaron ${oldCount - newCount} factura(s)`, 'warning');
                } else {
                    showNotification('Datos actualizados correctamente', 'success');
                }
            }
        }

        lastDataHash = currentHash;

        // Procesar los datos
        invoicesData = parseSheetData(json);
        filteredData = [...invoicesData];

        // Actualizar UI
        updateDashboard();
        updateInvoicesTables();
        populateFilters();

        showLoading(false);
    } catch (error) {
        console.error('Error al cargar datos:', error);
        showError('No se pudieron cargar los datos de las facturas. Por favor, verifica la configuración.');
        showLoading(false);
    }
}

function parseSheetData(json) {
    const rows = json.table.rows;
    const invoices = [];

    // Saltar la primera fila (encabezados)
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (!row.c) continue;

        const invoice = {
            fecha: getCellValue(row.c[0]),
            categoria: getCellValue(row.c[1]),
            numeroFactura: getCellValue(row.c[2]),
            emisor: getCellValue(row.c[3]),
            nif: getCellValue(row.c[4]),
            direccion: getCellValue(row.c[5]),
            localidad: getCellValue(row.c[6]),
            codigoPostal: getCellValue(row.c[7]),
            provincia: getCellValue(row.c[8]),
            telefono: getCellValue(row.c[9]),
            descripcion: getCellValue(row.c[10]),
            importe: parseFloat(getCellValue(row.c[11])) || 0,
            iva: parseFloat(getCellValue(row.c[12])) || 0,
            total: parseFloat(getCellValue(row.c[13])) || 0,
            moneda: getCellValue(row.c[14]) || 'MXN',
            notas: getCellValue(row.c[15]),
            url: getCellValue(row.c[16]),
        };

        invoices.push(invoice);
    }

    return invoices;
}

function getCellValue(cell) {
    if (!cell) return '';
    return cell.v !== undefined ? cell.v : '';
}

// ===== ACTUALIZACIÓN DEL DASHBOARD =====
function updateDashboard() {
    // Calcular estadísticas
    const totalInvoices = invoicesData.length;
    const totalAmount = invoicesData.reduce((sum, inv) => sum + inv.importe, 0);
    const totalIVA = invoicesData.reduce((sum, inv) => sum + inv.iva, 0);

    // Facturas del mes actual
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyInvoices = invoicesData.filter(inv => {
        const invDate = new Date(inv.fecha);
        return invDate.getMonth() === currentMonth && invDate.getFullYear() === currentYear;
    });
    const monthlyTotal = monthlyInvoices.reduce((sum, inv) => sum + inv.total, 0);

    // Actualizar tarjetas de estadísticas
    document.getElementById('totalInvoices').textContent = totalInvoices;
    document.getElementById('totalAmount').textContent = formatCurrency(totalAmount);
    document.getElementById('totalIVA').textContent = formatCurrency(totalIVA);
    document.getElementById('monthlyTotal').textContent = formatCurrency(monthlyTotal);
}

function updateInvoicesTables() {
    // Actualizar tabla de facturas recientes (últimas 10)
    const recentInvoices = [...invoicesData]
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, 10);

    updateTable('recentInvoicesTable', recentInvoices, false);

    // Actualizar tabla de todas las facturas
    updateTable('allInvoicesTable', filteredData, true);
}

function updateTable(tableId, data, showAllColumns) {
    const tbody = document.getElementById(tableId);
    if (!tbody) return;

    if (data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="${showAllColumns ? '10' : '8'}" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                    No hay facturas para mostrar
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = data.map(invoice => {
        const baseColumns = `
            <td>${formatDate(invoice.fecha)}</td>
            <td><strong>${invoice.numeroFactura}</strong></td>
            <td>${invoice.emisor}</td>
        `;

        const extraColumns = showAllColumns ? `
            <td>${invoice.nif}</td>
        ` : '';

        const endColumns = `
            <td><span class="category-badge">${invoice.categoria}</span></td>
            ${showAllColumns ? `<td>${truncate(invoice.descripcion, 30)}</td>` : ''}
            <td>${formatCurrency(invoice.importe, invoice.moneda)}</td>
            <td>${formatCurrency(invoice.iva, invoice.moneda)}</td>
            <td><strong>${formatCurrency(invoice.total, invoice.moneda)}</strong></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-view" onclick="viewInvoiceDetails('${invoice.numeroFactura}')" title="Ver detalles">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2"/>
                            <circle cx="12" cy="12" r="3" stroke-width="2"/>
                        </svg>
                    </button>
                    <button class="btn-action btn-edit" onclick="editInvoice('${invoice.numeroFactura}')" title="Editar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke-width="2"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke-width="2"/>
                        </svg>
                    </button>
                    <button class="btn-action btn-duplicate" onclick="duplicateInvoice('${invoice.numeroFactura}')" title="Duplicar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-width="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke-width="2"/>
                        </svg>
                    </button>
                    <button class="btn-action btn-delete" onclick="deleteInvoice('${invoice.numeroFactura}')" title="Eliminar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
                            <polyline points="3 6 5 6 21 6" stroke-width="2"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
            </td>
        `;

        return `<tr>${baseColumns}${extraColumns}${endColumns}</tr>`;
    }).join('');
}

// ===== DETALLES DE FACTURA =====
function viewInvoiceDetails(numeroFactura) {
    const invoice = invoicesData.find(inv => inv.numeroFactura === numeroFactura);
    if (!invoice) return;

    const modal = document.getElementById('invoiceModal');
    const detailsContainer = document.getElementById('invoiceDetails');

    detailsContainer.innerHTML = `
        <div class="detail-row">
            <div class="detail-label">Fecha:</div>
            <div class="detail-value">${formatDate(invoice.fecha)}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Número de Factura:</div>
            <div class="detail-value"><strong>${invoice.numeroFactura}</strong></div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Categoría:</div>
            <div class="detail-value">${invoice.categoria}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Emisor:</div>
            <div class="detail-value">${invoice.emisor}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">NIF:</div>
            <div class="detail-value">${invoice.nif}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Dirección:</div>
            <div class="detail-value">${invoice.direccion}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Localidad:</div>
            <div class="detail-value">${invoice.localidad}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Código Postal:</div>
            <div class="detail-value">${invoice.codigoPostal}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Provincia:</div>
            <div class="detail-value">${invoice.provincia}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Teléfono:</div>
            <div class="detail-value">${invoice.telefono}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Descripción:</div>
            <div class="detail-value">${invoice.descripcion}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Importe:</div>
            <div class="detail-value">${formatCurrency(invoice.importe)}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">IVA:</div>
            <div class="detail-value">${formatCurrency(invoice.iva)}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Total:</div>
            <div class="detail-value"><strong style="font-size: 1.2rem;">${formatCurrency(invoice.total)}</strong></div>
        </div>
        ${invoice.notas ? `
        <div class="detail-row">
            <div class="detail-label">Notas:</div>
            <div class="detail-value">${invoice.notas}</div>
        </div>
        ` : ''}
        ${invoice.url ? `
        <div class="detail-row">
            <div class="detail-label">URL:</div>
            <div class="detail-value"><a href="${invoice.url}" target="_blank" style="color: var(--primary-color);">${invoice.url}</a></div>
        </div>
        ` : ''}
    `;

    modal.classList.add('active');
}

// ===== FILTROS =====
function populateFilters() {
    // Obtener categorías únicas
    const categories = [...new Set(invoicesData.map(inv => inv.categoria))].filter(Boolean);
    const categoryFilter = document.getElementById('categoryFilter');

    if (categoryFilter) {
        categoryFilter.innerHTML = '<option value="">Todas las categorías</option>' +
            categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    }

    // Obtener meses únicos
    const months = [...new Set(invoicesData.map(inv => {
        const date = new Date(inv.fecha);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    }))].filter(Boolean).sort().reverse();

    const monthFilter = document.getElementById('monthFilter');
    if (monthFilter) {
        monthFilter.innerHTML = '<option value="">Todos los meses</option>' +
            months.map(month => {
                const [year, monthNum] = month.split('-');
                const monthName = new Date(year, monthNum - 1).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
                return `<option value="${month}">${monthName}</option>`;
            }).join('');
    }
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    const month = document.getElementById('monthFilter')?.value || '';
    const dateFrom = document.getElementById('dateFromFilter')?.value || '';
    const dateTo = document.getElementById('dateToFilter')?.value || '';

    filteredData = invoicesData.filter(invoice => {
        // Búsqueda de texto
        const matchesSearch = !searchTerm ||
            invoice.numeroFactura.toLowerCase().includes(searchTerm) ||
            invoice.emisor.toLowerCase().includes(searchTerm) ||
            invoice.descripcion.toLowerCase().includes(searchTerm) ||
            invoice.nif.toLowerCase().includes(searchTerm);

        // Filtro de categoría
        const matchesCategory = !category || invoice.categoria === category;

        // Filtro de mes
        const matchesMonth = !month || (() => {
            const invDate = new Date(invoice.fecha);
            const invMonth = `${invDate.getFullYear()}-${String(invDate.getMonth() + 1).padStart(2, '0')}`;
            return invMonth === month;
        })();

        // Filtro de rango de fechas
        const matchesDateRange = (() => {
            const invDate = new Date(invoice.fecha);
            const fromDate = dateFrom ? new Date(dateFrom) : null;
            const toDate = dateTo ? new Date(dateTo) : null;

            if (fromDate && invDate < fromDate) return false;
            if (toDate && invDate > toDate) return false;
            return true;
        })();

        return matchesSearch && matchesCategory && matchesMonth && matchesDateRange;
    });

    updateTable('allInvoicesTable', filteredData, true);
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('monthFilter').value = '';
    document.getElementById('dateFromFilter').value = '';
    document.getElementById('dateToFilter').value = '';

    filteredData = [...invoicesData];
    updateTable('allInvoicesTable', filteredData, true);
}

// ===== EXPORTAR DATOS =====
function exportToCSV() {
    const headers = ['Fecha', 'Categoría', 'Número Factura', 'Emisor', 'NIF', 'Dirección',
        'Localidad', 'Código Postal', 'Provincia', 'Teléfono', 'Descripción',
        'Importe', 'IVA', 'Total', 'Moneda', 'Notas', 'URL'];

    const rows = filteredData.map(inv => [
        inv.fecha,
        inv.categoria,
        inv.numeroFactura,
        inv.emisor,
        inv.nif,
        inv.direccion,
        inv.localidad,
        inv.codigoPostal,
        inv.provincia,
        inv.telefono,
        inv.descripcion,
        inv.importe,
        inv.iva,
        inv.total,
        inv.moneda,
        inv.notas,
        inv.url
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `facturas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ===== NAVEGACIÓN =====
function switchView(viewName) {
    // Ocultar todas las vistas
    document.querySelectorAll('.content-view').forEach(view => {
        view.classList.remove('active');
    });

    // Mostrar vista seleccionada
    const targetView = document.getElementById(`${viewName}View`);
    if (targetView) {
        targetView.classList.add('active');
    }

    // Actualizar navegación activa
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    const activeNav = document.querySelector(`[data-view="${viewName}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', logout);

    // Navegación
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const view = e.currentTarget.getAttribute('data-view');
            switchView(view);
        });
    });

    // Refresh
    document.getElementById('refreshBtn')?.addEventListener('click', () => loadInvoicesData(true));

    // Export
    document.getElementById('exportBtn')?.addEventListener('click', exportToCSV);

    // Ver todas las facturas
    document.getElementById('viewAllBtn')?.addEventListener('click', () => {
        switchView('invoices');
    });

    // Búsqueda
    document.getElementById('searchInput')?.addEventListener('input', applyFilters);

    // Filtros
    document.getElementById('categoryFilter')?.addEventListener('change', applyFilters);
    document.getElementById('monthFilter')?.addEventListener('change', applyFilters);
    document.getElementById('dateFromFilter')?.addEventListener('change', applyFilters);
    document.getElementById('dateToFilter')?.addEventListener('change', applyFilters);
    document.getElementById('clearFiltersBtn')?.addEventListener('click', clearFilters);

    // Modal
    const modal = document.getElementById('invoiceModal');
    const closeBtn = modal?.querySelector('.modal-close');

    closeBtn?.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// ===== UTILIDADES =====
function formatCurrency(amount, currency = 'MXN') {
    // Mapear códigos de moneda
    const currencyMap = {
        'MXN': 'MXN',
        'PESO': 'MXN',
        'PESOS': 'MXN',
        'EUR': 'EUR',
        'EURO': 'EUR',
        'USD': 'USD',
        'DOLAR': 'USD'
    };

    const normalizedCurrency = currencyMap[currency?.toUpperCase()] || 'MXN';

    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: normalizedCurrency
    }).format(amount);
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function truncate(str, maxLength) {
    if (!str) return '';
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
}

function showLoading(show) {
    // Implementar indicador de carga si es necesario
    console.log(show ? 'Cargando...' : 'Carga completa');
}

function showError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg class="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                ${type === 'success' ? '<polyline points="20 6 9 17 4 12" stroke-width="2"/>' :
            type === 'error' ? '<circle cx="12" cy="12" r="10" stroke-width="2"/><line x1="15" y1="9" x2="9" y2="15" stroke-width="2"/><line x1="9" y1="9" x2="15" y2="15" stroke-width="2"/>' :
                type === 'warning' ? '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-width="2"/><line x1="12" y1="9" x2="12" y2="13" stroke-width="2"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-width="2"/>' :
                    '<circle cx="12" cy="12" r="10" stroke-width="2"/><line x1="12" y1="16" x2="12" y2="12" stroke-width="2"/><line x1="12" y1="8" x2="12.01" y2="8" stroke-width="2"/>'}
            </svg>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18" stroke-width="2"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke-width="2"/>
            </svg>
        </button>
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => notification.classList.add('show'), 10);

    // Auto-remover después de 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===== FUNCIONES DE MANIPULACIÓN DE FACTURAS =====
function editInvoice(numeroFactura) {
    const invoice = invoicesData.find(inv => inv.numeroFactura === numeroFactura);
    if (!invoice) return;

    showNotification('Función de edición en desarrollo. Esta característica permitirá editar facturas directamente.', 'info');
    // Aquí se implementaría la lógica para editar en Google Sheets
    console.log('Editar factura:', invoice);
}

function duplicateInvoice(numeroFactura) {
    const invoice = invoicesData.find(inv => inv.numeroFactura === numeroFactura);
    if (!invoice) return;

    if (confirm(`¿Deseas duplicar la factura ${numeroFactura}?`)) {
        showNotification('Función de duplicación en desarrollo. Esta característica creará una copia de la factura.', 'info');
        // Aquí se implementaría la lógica para duplicar en Google Sheets
        console.log('Duplicar factura:', invoice);
    }
}

function deleteInvoice(numeroFactura) {
    const invoice = invoicesData.find(inv => inv.numeroFactura === numeroFactura);
    if (!invoice) return;

    if (confirm(`¿Estás seguro de que deseas eliminar la factura ${numeroFactura}?\n\nEsta acción no se puede deshacer.`)) {
        showNotification('Función de eliminación en desarrollo. Esta característica eliminará la factura de Google Sheets.', 'warning');
        // Aquí se implementaría la lógica para eliminar en Google Sheets
        console.log('Eliminar factura:', invoice);
    }
}
