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
    let visible = 0;

    list.querySelectorAll('.card-button').forEach((card) => {
        const matches = normalize(card.textContent).includes(query);
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
