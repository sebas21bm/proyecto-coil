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

/* --- 6. ESCALAS DE EVALUACIÓN (sin backend: el cálculo ocurre en el navegador) --- */
const SCALES = {
    barthel: {
        name: 'Índice de Barthel',
        max: 100,
        items: [
            { name: 'Comer', criteria: [[0, 'Dependiente: necesita ser alimentado.'], [5, 'Necesita ayuda para cortar, untar o servir.'], [10, 'Independiente: come solo en un tiempo razonable.']] },
            { name: 'Trasladarse silla/cama', criteria: [[0, 'Dependiente: no se mantiene sentado.'], [5, 'Necesita gran ayuda (una o dos personas), pero puede sentarse.'], [10, 'Necesita mínima ayuda o supervisión.'], [15, 'Independiente.']] },
            { name: 'Aseo personal', criteria: [[0, 'Necesita ayuda.'], [5, 'Independiente: se lava la cara y las manos, se peina y se afeita.']] },
            { name: 'Uso del retrete / WC', criteria: [[0, 'Dependiente.'], [5, 'Necesita algo de ayuda, pero hace parte solo.'], [10, 'Independiente: entra, sale, se limpia y se viste.']] },
            { name: 'Bañarse o ducharse', criteria: [[0, 'Dependiente.'], [5, 'Independiente: se baña o ducha sin ayuda.']] },
            { name: 'Desplazarse', criteria: [[0, 'Inmóvil.'], [5, 'Independiente en silla de ruedas (50 m).'], [10, 'Camina con ayuda o supervisión de una persona.'], [15, 'Independiente: camina 50 m solo (puede usar bastón).']] },
            { name: 'Subir y bajar escaleras', criteria: [[0, 'Incapaz.'], [5, 'Necesita ayuda o supervisión.'], [10, 'Independiente.']] },
            { name: 'Vestirse / Desvestirse', criteria: [[0, 'Dependiente.'], [5, 'Necesita ayuda, pero hace la mitad sin ayuda.'], [10, 'Independiente: incluye botones, cierres y cordones.']] },
            { name: 'Control de heces', criteria: [[0, 'Incontinente.'], [5, 'Accidente ocasional (máximo uno por semana).'], [10, 'Continente.']] },
            { name: 'Control de orina', criteria: [[0, 'Incontinente o sondado sin autonomía.'], [5, 'Accidente ocasional (máximo uno cada 24 h).'], [10, 'Continente.']] }
        ],
        classify(points) {
            if (points === 100) return 'Independiente';
            if (points >= 91) return 'Dependencia escasa';
            if (points >= 61) return 'Dependencia moderada';
            if (points >= 21) return 'Dependencia severa';
            return 'Dependencia total';
        }
    },
    lawton: {
        name: 'Escala de Lawton/Brody',
        max: 4,
        chips: true,
        items: [
            { name: 'Capacidad para usar el teléfono', criteria: [[0, 'No utiliza el teléfono.'], [1, 'Lo usa por iniciativa propia, marca números conocidos o contesta.']] },
            { name: 'Ir de compras', criteria: [[0, 'Necesita compañía o es incapaz de comprar.'], [1, 'Realiza todas las compras de forma independiente.']] },
            { name: 'Preparación de la comida', criteria: [[0, 'Necesita que le preparen o sirvan la comida.'], [1, 'Organiza, prepara y sirve las comidas por sí solo.']] },
            { name: 'Cuidar la casa', criteria: [[0, 'Necesita ayuda en todas las tareas o no participa.'], [1, 'Mantiene la casa solo o con ayuda ocasional.']] }
        ],
        classify(points) {
            if (points === 4) return 'Independiente';
            if (points === 3) return 'Dependencia leve';
            if (points === 2) return 'Dependencia moderada';
            return 'Dependencia severa';
        }
    }
};

const INFO_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9.2"/><path d="M12 11v6"/><circle cx="12" cy="7.6" r=".6" fill="currentColor"/></svg>';

function initEvaluation() {
    const form = document.querySelector('form[data-scale]');
    if (!form) return;

    const scale = SCALES[form.dataset.scale];
    const container = form.querySelector('.eval-items');
    const progressText = document.querySelector('.eval-progress-text');
    const progressBar = document.querySelector('.eval-progress-bar span');

    // 1) Construir los ítems a partir de los datos de la escala
    scale.items.forEach((item, i) => {
        const name = `item-${i}`;
        let options;
        if (scale.chips) {
            options = `<div class="score-chips">${item.criteria.map(([value]) =>
                `<label class="score-chip"><input type="radio" name="${name}" value="${value}"><span>${value}</span></label>`).join('')}</div>`;
        } else {
            const cls = item.criteria.length === 2 ? 'score-options score-options--two' : 'score-options';
            options = `<div class="${cls}">${item.criteria.map(([value]) =>
                `<label class="score-option"><input type="radio" name="${name}" value="${value}"><span class="score-dot"></span><span class="score-value">${value}</span></label>`).join('')}</div>`;
        }
        const fieldset = document.createElement('fieldset');
        fieldset.className = 'eval-item';
        fieldset.id = name;
        fieldset.innerHTML = `
            <legend class="eval-item-header">
                <span class="eval-item-name">${i + 1}.- ${item.name}</span>
                <button type="button" class="btn-info" data-item="${i}" aria-label="Ver criterio de ${item.name}">${INFO_ICON}</button>
            </legend>
            ${options}`;
        container.appendChild(fieldset);
    });

    // 2) Progreso: cuántos ítems llevan respuesta
    const answered = () => scale.items.filter((_, i) => form.querySelector(`input[name="item-${i}"]:checked`)).length;
    const updateProgress = () => {
        const n = answered();
        progressText.textContent = `${n} de ${scale.items.length} ítems`;
        progressBar.style.width = `${(n / scale.items.length) * 100}%`;
    };
    form.addEventListener('change', (event) => {
        const item = event.target.closest('.eval-item');
        if (item) item.classList.remove('is-missing');
        updateProgress();
    });
    updateProgress();

    // 3) Botón de ayuda: muestra el criterio de puntuación del ítem
    container.addEventListener('click', (event) => {
        const btn = event.target.closest('.btn-info');
        if (!btn) return;
        const item = scale.items[btn.dataset.item];
        const modal = document.getElementById('modal-criterio');
        modal.querySelector('h2').textContent = item.name;
        modal.querySelector('.criteria-list').innerHTML = [...item.criteria].reverse()
            .map(([value, text]) => `<li><b>${value}</b><span>${text}</span></li>`).join('');
        openModal('modal-criterio');
    });

    // 4) Calcular puntuación y clasificación
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let total = 0;
        let firstMissing = null;

        scale.items.forEach((_, i) => {
            const checked = form.querySelector(`input[name="item-${i}"]:checked`);
            if (checked) total += Number(checked.value);
            else {
                document.getElementById(`item-${i}`).classList.add('is-missing');
                if (firstMissing === null) firstMissing = i;
            }
        });

        if (firstMissing !== null) {
            document.getElementById(`item-${firstMissing}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
            showToast(`Falta responder el ítem ${firstMissing + 1}: ${scale.items[firstMissing].name}`);
            return;
        }

        const modal = document.getElementById('modal-resultado');
        modal.querySelector('[data-total]').textContent = total;
        modal.querySelector('[data-max]').textContent = `/ ${scale.max} pts.`;
        modal.querySelector('[data-classification]').textContent = scale.classify(total);
        openModal('modal-resultado');
    });

    // 5) Nueva evaluación: limpia las respuestas
    document.querySelector('[data-reset]').addEventListener('click', () => {
        form.reset();
        form.querySelectorAll('.is-missing').forEach((el) => el.classList.remove('is-missing'));
        updateProgress();
        closeModal(document.getElementById('modal-resultado'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

initEvaluation();
