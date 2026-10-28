// APOYOS DE ESTUDIO
// El reloj no se muestra. Cuenta el tiempo con la temática abierta y pestaña visible.
// No mide atención ni detecta cansancio. No envía datos a un servidor.
const DEFAULT_BREAK_MINUTES = 10;
let activeSupportTopic = null;
let supportLastTick = Date.now();
let nextElapsedAfterClose = 0;
let supportLastSaved = Date.now();

function supportSettings() {
    if (!state.support) state.support = {};
    const settings = state.support;
    if (!settings.elapsed) settings.elapsed = {};
    if (!settings.stages) settings.stages = {};
    if (typeof settings.reminders !== "boolean") settings.reminders = true;
    if (!settings.rate) settings.rate = 0.82;
    if (
        !Number.isInteger(settings.minutes) ||
        settings.minutes < 1 ||
        settings.minutes > 120
    )
        settings.minutes = DEFAULT_BREAK_MINUTES;
    return settings;
}

function supportMarkup(topic) {
    const settings = supportSettings();
    return `
        <div class="study-support" aria-label="Ayudas de estudio">
            <button onclick="supportHelp()">Necesito una orientación</button>
            <label for="audioSpeed">Velocidad del audio
                <select id="audioSpeed" onchange="supportSetRate(this.value)">
                    <option value="0.65" ${settings.rate === 0.65 ? "selected" : ""}>Más despacio</option>
                    <option value="0.82" ${settings.rate === 0.82 ? "selected" : ""}>Pausado</option>
                    <option value="1" ${settings.rate === 1 ? "selected" : ""}>Normal</option>
                </select>
            </label>
            <label class="reminder-choice">
                <input type="checkbox" id="breakReminders" ${settings.reminders ? "checked" : ""} onchange="supportSetReminders(this.checked)">
                Recordatorios de pausa (${settings.minutes} min)
            </label>
        </div>
        <p class="notice">Puedes hacer una pausa cuando quieras. El recordatorio cuenta tiempo con esta temática abierta y la pestaña visible; no mide tu atención. Puedes cambiar el intervalo o desactivar los avisos en Configuración. <a href="#configuracion">Abrir Configuración</a>.</p>
        <div id="studyHelp" class="feedback" role="status" hidden></div>`;
}

function supportSetRate(value) {
    const rate = Number(value);
    if (![0.65, 0.82, 1].includes(rate)) return;
    supportSettings().rate = rate;
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    save();
}

function supportSetReminders(enabled) {
    const settings = supportSettings();
    settings.reminders = enabled;
    if (activeSupportTopic !== null) settings.elapsed[activeSupportTopic] = 0;
    supportLastTick = Date.now();
    save();
}

function supportHelp() {
    const messages = [
        "Empieza por una sola oración del ejemplo. Puedes escucharla más despacio y abrir el vocabulario. Después explica con tus palabras qué entendiste.",
        "No necesitas entender todo el video. Busca solo lo que indica la tarea, pausa y repite. Si no carga o resulta difícil, vuelve al ejemplo escrito del paso Aprendo.",
        "Lee la pregunta y busca una pista en el ejemplo. Puedes volver a Aprendo y regresar a la práctica sin perder las respuestas de esta sesión. Si te equivocas, usa la explicación para reintentar.",
        "Escribe primero una oración siguiendo el modelo. Luego agrega una idea propia. Puedes inventar los datos y pedir ayuda al docente; el borrador se guarda mientras escribes.",
    ];
    const settings = supportSettings();
    const stage = settings.stages[activeSupportTopic] || 0;
    const box = document.getElementById("studyHelp");
    box.textContent = messages[stage];
    box.hidden = !box.hidden;
}

function supportStart(topic) {
    activeSupportTopic = topic;
    const settings = supportSettings();
    settings.lastTopic = topic;
    if (!settings.elapsed[topic]) settings.elapsed[topic] = 0;
    supportLastTick = Date.now();
    showStage(settings.stages[topic] || 0, false);
    save();
}

function supportStop() {
    if (activeSupportTopic !== null) {
        supportTick(Date.now(), false);
        save();
    }
    activeSupportTopic = null;
    supportLastTick = Date.now();
}

function supportRecordStage(number) {
    if (activeSupportTopic === null) return;
    supportSettings().stages[activeSupportTopic] = number;
    const help = document.getElementById("studyHelp");
    if (help) help.hidden = true;
    save();
}

// El intervalo comprueba el reloj una vez por segundo.
// Las pestañas ocultas y las pausas no acumulan tiempo.
function supportTick(now = Date.now(), allowReminder = true) {
    const delta = Math.max(0, now - supportLastTick);
    supportLastTick = now;
    if (activeSupportTopic === null || !grade || document.hidden) return;
    const pauseDialog = document.getElementById("pauseDialog");
    if (pauseDialog.open) return;
    const settings = supportSettings();
    if (!settings.reminders) return;
    // Ignorar saltos largos del reloj, como cuando el equipo entra en suspensión.
    if (delta > 5000) return;
    const topic = activeSupportTopic;
    settings.elapsed[topic] = (settings.elapsed[topic] || 0) + delta;
    if (settings.elapsed[topic] >= settings.minutes * 60 * 1000 && allowReminder) {
        settings.elapsed[topic] = 0;
        save();
        supportShowBreak(false);
    } else if (now - supportLastSaved >= 15000) {
        supportLastSaved = now;
        save();
    }
}

function supportShowBreak(manual = false) {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    pauseVideos();
    const dialog = document.getElementById("pauseDialog");
    document.getElementById("pauseTitle").textContent = manual
        ? "Tu pausa, a tu ritmo"
        : "¿Hacemos una pausa?";
    document.getElementById("pauseMessage").textContent = manual
        ? "Descansa si lo necesitas. No hay una duración obligatoria y puedes volver cuando quieras."
        : `Has acumulado ${supportSettings().minutes} minutos con esta temática abierta y la pestaña visible desde el último recordatorio. Puedes hacer una pausa breve o continuar. Tu borrador se conserva.`;
    document.getElementById("pauseActivities").hidden = !manual;
    document.getElementById("startActivePause").hidden = manual;
    document.getElementById("snoozePause").hidden = manual;
    document.getElementById("resume").textContent = manual
        ? "Volver a mi actividad"
        : "Seguir estudiando";
    if (!dialog.open) dialog.showModal();
    supportLastTick = Date.now();
}

function supportBeginPause() {
    document.getElementById("pauseTitle").textContent = "Un momento para ti";
    document.getElementById("pauseActivities").hidden = false;
    document.getElementById("pauseMessage").textContent =
        "Escoge una opción cómoda para ti. Puedes hacerla sentado o de pie y terminar cuando quieras.";
    document.getElementById("startActivePause").hidden = true;
    document.getElementById("snoozePause").hidden = true;
    document.getElementById("resume").textContent = "Volver a mi actividad";
}

function supportCloseBreak(snooze = false) {
    nextElapsedAfterClose = snooze
        ? supportSettings().minutes * 60 * 1000 - 2 * 60 * 1000
        : 0;
    document.getElementById("pauseDialog").close();
}

function supportResumeAfterClose() {
    if (activeSupportTopic !== null) {
        supportSettings().elapsed[activeSupportTopic] = nextElapsedAfterClose;
        save();
    }
    nextElapsedAfterClose = 0;
    supportLastTick = Date.now();
}

function supportResumeButton() {
    const settings = supportSettings();
    const topic = settings.lastTopic;
    if (!Number.isInteger(topic) || !lessons[topic]) return "";
    return `<button class="primary" onclick="go('mision-${topic}')">Retomar ${esc(lessons[topic].title)} →</button>`;
}

// Una sola comprobación periódica para todo el OVA; no se crean relojes por pregunta.
setInterval(supportTick, 1000);
document.addEventListener("visibilitychange", () => {
    supportLastTick = Date.now();
    if (grade) save();
});
window.addEventListener("pagehide", () => {
    if (grade) save();
});

// Configuración abierta: no solicita datos personales ni una cuenta de adulto.
function supportConfiguration() {
    const settings = supportSettings();
    main.innerHTML = `
        <span class="badge">A TU RITMO</span>
        <h1>Configuración</h1>
        <p>Estudiantes, padres, acudientes y docentes pueden adaptar los recordatorios. Si es posible, acuerden juntos lo que resulta más cómodo.</p>
        <form id="pauseSettingsForm" class="card settings-form" onsubmit="supportSaveConfiguration(event)">
            <h2>Pausas de estudio</h2>
            <label class="reminder-choice" for="settingsReminders">
                <input id="settingsReminders" type="checkbox" ${settings.reminders ? "checked" : ""}
                    onchange="supportToggleSettings(this.checked)">
                Activar recordatorios automáticos de pausa
            </label>
            <div>
                <label for="settingsMinutes">Tiempo de estudio entre recordatorios (minutos)</label>
                <input id="settingsMinutes" type="number" min="1" max="120" step="1" required
                    value="${settings.minutes}" ${settings.reminders ? "" : "disabled"}
                    aria-describedby="intervalHelp">
                <p id="intervalHelp">Elige de 1 a 120 minutos. Diez minutos es el valor inicial del OVA, no una regla para todos los estudiantes.</p>
            </div>
            <p>La pausa no tiene una duración obligatoria: puedes volver cuando quieras. Si desactivas los avisos, el botón «Pausa» seguirá disponible.</p>
            <div class="actions">
                <button class="primary" type="submit">Guardar configuración</button>
                <button type="button" onclick="supportResetConfiguration()">Restablecer 10 minutos</button>
            </div>
            <p id="settingsStatus" role="status" aria-live="polite"></p>
        </form>
        <p class="notice">Los ajustes se guardan para el grado seleccionado en este navegador y dispositivo. No se sincronizan con otros equipos. Cambiar el intervalo reinicia el tiempo acumulado; conserva tu progreso y tus borradores. El reloj cuenta tiempo con una temática abierta y la pestaña visible; no mide atención.</p>`;
}

function supportToggleSettings(enabled) {
    document.getElementById("settingsMinutes").disabled = !enabled;
}

function supportSaveConfiguration(event) {
    event.preventDefault();
    const enabled = document.getElementById("settingsReminders").checked;
    const minutes = Number(document.getElementById("settingsMinutes").value);
    const status = document.getElementById("settingsStatus");
    if (enabled && (!Number.isInteger(minutes) || minutes < 1 || minutes > 120)) {
        status.textContent = "Escribe un número entero entre 1 y 120 minutos.";
        return;
    }
    const settings = supportSettings();
    const changed =
        settings.reminders !== enabled || (enabled && settings.minutes !== minutes);
    settings.reminders = enabled;
    if (enabled) settings.minutes = minutes;
    if (changed) settings.elapsed = {};
    supportLastTick = Date.now();
    save();
    status.textContent = enabled
        ? `Configuración guardada. Se recordará una pausa cada ${minutes} minutos de estudio con la temática visible.`
        : "Configuración guardada. Los recordatorios automáticos están desactivados. Puedes usar el botón Pausa cuando quieras.";
}

function supportResetConfiguration() {
    const settings = supportSettings();
    settings.minutes = DEFAULT_BREAK_MINUTES;
    settings.reminders = true;
    settings.elapsed = {};
    supportLastTick = Date.now();
    save();
    supportConfiguration();
    document.getElementById("settingsStatus").textContent =
        "Se restablecieron los recordatorios cada 10 minutos. Tu progreso se conserva.";
}
