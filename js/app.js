/* =========================================================
   NeuroEval - Módulo AVD
   Interacciones del prototipo semifuncional (sin backend).
   Las respuestas se guardan solo durante la sesión del navegador
   (sessionStorage) para poder revisar y volver al formulario.
   ========================================================= */

const STORE = 'neuroeval:';

const store = {
    get(key, fallback = null) {
        try {
            const value = sessionStorage.getItem(STORE + key);
            return value === null ? fallback : JSON.parse(value);
        } catch (error) {
            return fallback;
        }
    },
    set(key, value) {
        try { sessionStorage.setItem(STORE + key, JSON.stringify(value)); } catch (error) { /* sin almacenamiento */ }
    }
};

const params = new URLSearchParams(window.location.search);

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

/* --- 4. NAVEGACIÓN: recordar de dónde viene la persona --- */
// Lesión de origen (encefálica o medular) para la pantalla compartida de AVD instrumentales.
const LESIONS = {
    encefalica: { name: 'Lesión encefálica adquirida', href: 'lesion-encefalica.html', menu: 'menu-avd.html' },
    medular: { name: 'Lesión medular', href: 'lesion-medular.html', menu: 'menu-avd-medular.html' }
};

if (document.body.dataset.lesion) store.set('lesion', document.body.dataset.lesion);

const lesion = LESIONS[store.get('lesion', 'encefalica')] || LESIONS.encefalica;
document.querySelectorAll('[data-lesion-link]').forEach((link) => {
    link.textContent = lesion.name;
    link.href = lesion.href;
});
document.querySelectorAll('[data-menu-link]').forEach((link) => { link.href = lesion.menu; });

// Última lista de instrumentos visitada (para "Volver" y "Volver a instrumentos").
const currentPage = window.location.pathname.split('/').pop();
if (document.body.hasAttribute('data-instrument-list')) store.set('lastList', currentPage);

const lastList = store.get('lastList');
if (lastList) document.querySelectorAll('[data-back-list]').forEach((link) => { link.href = lastList; });

/* --- 5. VENTANAS SUPERPUESTAS (abrir / cerrar) --- */
let lastFocus = null;

function openModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    lastFocus = document.activeElement;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    const closeBtn = overlay.querySelector('[data-close]');
    if (closeBtn) setTimeout(() => closeBtn.focus(), 60);
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
        openModal(opener.dataset.open);
        return;
    }
    const closer = event.target.closest('[data-close]');
    if (closer) {
        closeModal(closer.closest('.overlay'));
        return;
    }
    // Clic en el fondo semitransparente cierra la ventana
    if (event.target.classList.contains('overlay')) closeModal(event.target);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal(document.querySelector('.overlay.is-open'));
});

/* --- 6. FORMULARIO CONTINUO DE LAS ESCALAS --- */
const answersKey = (scale) => `respuestas:${scale}`;

function getAnswers(scale) {
    return store.get(answersKey(scale), {});
}

function missingItems(scaleKey, answers) {
    return SCALES[scaleKey].items.map((_, i) => i).filter((i) => answers[i] === undefined);
}

function initForm() {
    const form = document.querySelector('form[data-scale]');
    if (!form || typeof SCALES === 'undefined') return;

    const scaleKey = form.dataset.scale;
    const scale = SCALES[scaleKey];
    const answers = getAnswers(scaleKey);

    // 1) Restaurar respuestas guardadas ("Tus respuestas se conservan")
    Object.entries(answers).forEach(([index, value]) => {
        const input = form.querySelector(`input[name="item-${index}"][value="${value}"]`);
        if (input) input.checked = true;
    });

    // 2) Guardar cada selección
    form.addEventListener('change', (event) => {
        const input = event.target;
        if (!input.name || !input.name.startsWith('item-')) return;
        const index = input.name.replace('item-', '');
        answers[index] = Number(input.value);
        store.set(answersKey(scaleKey), answers);
        input.closest('.item-card').classList.remove('is-missing');
    });

    // 3) Si viene de "Volver a mis respuestas", marcar los ítems pendientes
    if (params.get('revisar') === 'faltantes') {
        const missing = missingItems(scaleKey, answers);
        missing.forEach((i) => document.getElementById(`item-${i}`).classList.add('is-missing'));
        if (missing.length) {
            setTimeout(() => document.getElementById(`item-${missing[0]}`).scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
            showToast(`Faltan ${missing.length} ${missing.length === 1 ? 'ítem' : 'ítems'} por responder`);
        }
    }

    // 4) Botón de información: abre el detalle del ítem con sus criterios
    form.addEventListener('click', (event) => {
        const btn = event.target.closest('.btn-info');
        if (!btn) return;
        const item = scale.items[btn.dataset.item];
        const selected = answers[btn.dataset.item];
        const modal = document.getElementById('modal-detalle');
        modal.querySelector('.detail-title').textContent = item.name;
        modal.querySelector('.detail-desc').textContent = item.desc;
        modal.querySelector('.criteria-list').innerHTML = item.criteria.map((c) => `
            <li class="criterion${c.points === selected ? ' is-current' : ''}">
                <div class="criterion-head">
                    <strong>${c.label}</strong>
                    <span class="points">${c.points} ${c.points === 1 ? 'punto' : 'puntos'}</span>
                </div>
                <p>${c.text}</p>
            </li>`).join('');
        openModal('modal-detalle');
    });

    // 5) Calcular puntuación: valida que todos los ítems tengan respuesta
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const missing = missingItems(scaleKey, answers);
        window.location.href = missing.length ? `validacion.html?escala=${scaleKey}` : scale.result;
    });
}

/* --- 7. VALIDACIÓN · FALTAN RESPUESTAS --- */
function initValidation() {
    const links = document.querySelectorAll('[data-return-form]');
    const scaleKey = params.get('escala');
    if (!links.length || typeof SCALES === 'undefined' || !SCALES[scaleKey]) return;
    links.forEach((link) => { link.href = `${SCALES[scaleKey].form}?revisar=faltantes`; });
}

/* --- 8. RESULTADO DE LA EVALUACIÓN --- */
function initResult() {
    const screen = document.querySelector('[data-result]');
    if (!screen || typeof SCALES === 'undefined') return;

    const scaleKey = screen.dataset.result;
    const scale = SCALES[scaleKey];
    const answers = getAnswers(scaleKey);

    // Sin respuestas completas no hay resultado: se envía a la validación
    if (missingItems(scaleKey, answers).length) {
        window.location.replace(`validacion.html?escala=${scaleKey}`);
        return;
    }

    const sum = (from, to) => scale.items.slice(from, to).reduce((acc, _, i) => acc + answers[from + i], 0);
    const total = sum(0, scale.items.length);
    screen.querySelector('[data-total]').textContent = total;

    // Índice de Barthel: nivel de dependencia según los rangos de interpretación
    if (scale.levels) {
        const level = scale.levels.find((l) => total >= l.min && total <= l.max);
        screen.querySelector('[data-level]').textContent = level ? level.label : '—';
        document.querySelectorAll('.range-list .criterion').forEach((row) => {
            row.classList.toggle('is-current', total >= Number(row.dataset.min) && total <= Number(row.dataset.max));
        });
    }

    // SCIM III: subtotales por dominio
    if (scale.domains) {
        scale.domains.forEach((d) => {
            screen.querySelector(`[data-subtotal="${d.key}"]`).textContent = sum(d.from, d.to);
        });
    }
}

initForm();
initValidation();
initResult();
