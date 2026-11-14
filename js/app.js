/* =========================================================
   NeuroEval - Módulo AVD
   Interacciones del prototipo semifuncional (sin backend)
   ========================================================= */

/* --- 1. TOAST: mensaje breve de respuesta --- */
let toastTimer;

function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        toast.setAttribute('role', 'status');
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

/* --- 2. OPCIONES AÚN NO DISPONIBLES --- */
// Las tarjetas fuera del alcance del módulo AVD avisan en lugar de llevar a un enlace roto.
document.addEventListener('click', (event) => {
    const card = event.target.closest('[data-coming-soon]');
    if (!card) return;
    event.preventDefault();
    showToast(`"${card.dataset.comingSoon}" estará disponible en una siguiente versión.`);
});

/* --- 3. BUSCADOR: filtra las tarjetas de una lista --- */
// Ignora mayúsculas y acentos ("lesion" encuentra "Lesión").
const normalize = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

function filterList(list) {
    const query = normalize(list.dataset.query || '');
    // Tipos de contenido elegidos en la hoja de filtros (si la pantalla la tiene)
    const types = list.dataset.types !== undefined ? list.dataset.types.split(',') : null;
    let visible = 0;

    list.querySelectorAll('.card-button').forEach((card) => {
        const matchesText = normalize(card.textContent).includes(query);
        const matchesType = !types || types.includes(card.dataset.type);
        const matches = matchesText && matchesType;
        card.hidden = !matches;
        if (matches) visible++;
    });

    const empty = document.querySelector(`[data-empty-for="${list.id}"]`);
    if (empty) empty.classList.toggle('is-visible', visible === 0);
}

document.querySelectorAll('[data-search]').forEach((input) => {
    const list = document.getElementById(input.dataset.search);
    if (!list) return;
    input.addEventListener('input', () => {
        list.dataset.query = input.value;
        filterList(list);
    });
});

/* --- 4. VENTANAS MODALES (abrir / cerrar) --- */
let lastFocus = null;

function openModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    lastFocus = document.activeElement;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    const first = overlay.querySelector('button, a, input');
    if (first) setTimeout(() => first.focus(), 60);
}

function closeModal(overlay) {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    if (lastFocus) lastFocus.focus();
}

document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-open]');
    if (opener) {
        event.preventDefault();
        openModal(opener.dataset.open);
        return;
    }
    const closer = event.target.closest('[data-close]');
    if (closer) {
        closeModal(closer.closest('.overlay'));
        return;
    }
    // Clic en el fondo oscuro cierra la ventana
    if (event.target.classList.contains('overlay')) closeModal(event.target);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal(document.querySelector('.overlay.is-open'));
});

/* --- 5. HOJA DE FILTROS (tipo de contenido y orden) --- */
function initFilters() {
    const sheet = document.getElementById('modal-filtros');
    if (!sheet) return;

    const list = document.getElementById(sheet.dataset.list);
    const checks = [...sheet.querySelectorAll('input[name="tipo"]')];
    const radios = [...sheet.querySelectorAll('input[name="orden"]')];
    const applyBtn = sheet.querySelector('.btn-apply');
    const badge = document.querySelector('.btn-filter-badge');
    const originalOrder = [...list.querySelectorAll('.card-button')];
    const defaults = checks.map((c) => c.checked);

    const updateApplyLabel = () => {
        const count = checks.filter((c) => c.checked).length;
        applyBtn.textContent = `Aplicar filtros (${count})`;
    };

    checks.forEach((c) => c.addEventListener('change', updateApplyLabel));

    // Limpiar: regresa a la selección inicial del diseño
    sheet.querySelector('.btn-clear').addEventListener('click', () => {
        checks.forEach((c, i) => { c.checked = defaults[i]; });
        radios[0].checked = true;
        updateApplyLabel();
    });

    // Aplicar: filtra por tipo y ordena la lista
    applyBtn.addEventListener('click', () => {
        const selected = checks.filter((c) => c.checked).map((c) => c.value);
        list.dataset.types = selected.join(',');

        const order = radios.find((r) => r.checked).value;
        const cards = order === 'az'
            ? [...originalOrder].sort((a, b) => a.dataset.name.localeCompare(b.dataset.name, 'es'))
            : originalOrder;
        cards.forEach((card) => list.appendChild(card));

        filterList(list);

        const changed = checks.some((c, i) => c.checked !== defaults[i]) || order !== 'relevancia';
        badge.hidden = !changed;
        badge.textContent = selected.length;

        closeModal(sheet);
        showToast('Filtros aplicados');
    });

    updateApplyLabel();
}

initFilters();
