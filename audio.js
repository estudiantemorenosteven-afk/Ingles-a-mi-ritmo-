// LECTOR EN INGLÉS
// Escoge una voz inglesa real y mantiene el orden de las oraciones.
const reader = { request: 0, utterance: null, statusId: "audioStatus" };

function englishVoices() {
    if (!("speechSynthesis" in window)) return [];
    return window.speechSynthesis
        .getVoices()
        .filter((voice) => /^en(?:[-_]|$)/i.test(voice.lang))
        .sort(
            (a, b) => voiceScore(b) - voiceScore(a) || a.name.localeCompare(b.name),
        );
}

function voiceScore(voice) {
    let score = 0;
    if (/natural|neural|premium|enhanced/i.test(voice.name)) score += 100;
    if (/google/i.test(voice.name)) score += 80;
    if (/^en[-_]US$/i.test(voice.lang)) score += 20;
    if (/^en[-_]GB$/i.test(voice.lang)) score += 15;
    return score;
}

function audioMessage(message, id = reader.statusId) {
    const status = document.getElementById(id);
    if (status) status.textContent = message;
}

function stopSpeech(announce = true) {
    reader.request++;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    reader.utterance = null;
    document
        .querySelectorAll("[data-audio-stop]")
        .forEach((button) => (button.hidden = true));
    if (announce) audioMessage("Audio detenido.");
}

// Algunas voces llegan después de cargar la página.
function waitForVoices() {
    const available = englishVoices();
    if (available.length || !("speechSynthesis" in window))
        return Promise.resolve(available);
    return new Promise((resolve) => {
        const synth = window.speechSynthesis;
        let finished = false;
        let timer;
        const finish = () => {
            const voices = englishVoices();
            if (!voices.length && !finished) return;
            done(voices);
        };
        const done = (voices) => {
            if (finished) return;
            finished = true;
            clearTimeout(timer);
            synth.removeEventListener("voiceschanged", finish);
            resolve(voices);
        };
        synth.addEventListener("voiceschanged", finish);
        timer = setTimeout(() => done(englishVoices()), 2000);
    });
}

function readingSentences(text) {
    const clean = String(text || "")
        .normalize("NFC")
        .replace(/\s+/g, " ")
        .trim();
    if (!clean) return [];
    const sentences =
        typeof Intl.Segmenter === "function"
            ? Array.from(
                  new Intl.Segmenter("en", { granularity: "sentence" }).segment(
                      clean,
                  ),
                  (part) => part.segment.trim(),
              )
            : clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [clean];
    const chunks = [];
    for (const sentence of sentences) {
        // Evitar lecturas largas que algunos navegadores interrumpen.
        if (sentence.length <= 240) chunks.push(sentence);
        else {
            let current = "";
            for (const word of sentence.split(/\s+/)) {
                if (current && (current + " " + word).length > 220) {
                    chunks.push(current);
                    current = word;
                } else current += (current ? " " : "") + word;
            }
            if (current) chunks.push(current);
        }
    }
    return chunks;
}

async function speech(text, statusId = "audioStatus") {
    stopSpeech(false);
    reader.statusId = statusId;
    const request = reader.request;
    const chunks = readingSentences(text);
    if (!chunks.length)
        return audioMessage("Primero escribe una oración en inglés.");
    if (!("speechSynthesis" in window))
        return audioMessage(
            "Este navegador no ofrece lectura de voz. Puedes usar el texto escrito.",
        );
    audioMessage("Preparando voz en inglés…");
    const voices = await waitForVoices();
    if (request !== reader.request) return;
    if (!voices.length) {
        audioMessage(
            "No hay una voz inglesa disponible. Abre Configuración → Voz de lectura para ver las opciones.",
        );
        refreshVoiceControls();
        return;
    }
    const settings = supportSettings();
    const voice =
        voices.find((item) => item.voiceURI === settings.voiceURI) || voices[0];
    const synth = window.speechSynthesis;
    let index = 0;
    if (typeof pauseVideos === "function") pauseVideos();
    document
        .querySelectorAll("[data-audio-stop]")
        .forEach((button) => (button.hidden = false));
    const next = () => {
        if (request !== reader.request) return;
        if (index >= chunks.length) {
            reader.utterance = null;
            document
                .querySelectorAll("[data-audio-stop]")
                .forEach((button) => (button.hidden = true));
            audioMessage("Lectura terminada.", statusId);
            return;
        }
        const utterance = new SpeechSynthesisUtterance(chunks[index]);
        reader.utterance = utterance;
        utterance.voice = voice;
        utterance.lang = voice.lang;
        utterance.rate = settings.rate;
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.onstart = () => {
            if (request === reader.request)
                audioMessage("Leyendo en inglés · " + voice.name, statusId);
        };
        utterance.onend = () => {
            index++;
            next();
        };
        utterance.onerror = (event) => {
            if (
                request !== reader.request ||
                event.error === "canceled" ||
                event.error === "interrupted"
            )
                return;
            stopSpeech(false);
            audioMessage(
                "La voz no pudo reproducirse. Prueba otra voz en Configuración y vuelve a escuchar.",
                statusId,
            );
        };
        synth.speak(utterance);
    };
    next();
}

function refreshVoiceControls() {
    const select = document.getElementById("readingVoice");
    if (!select) return;
    const voices = englishVoices();
    const choice = supportSettings().voiceURI || "";
    select.innerHTML =
        '<option value="">Automática: priorizar voces naturales</option>' +
        voices
            .map(
                (voice) =>
                    `<option value="${esc(voice.voiceURI)}" ${voice.voiceURI === choice ? "selected" : ""}>${esc(voice.name)} (${esc(voice.lang)})</option>`,
            )
            .join("");
    select.disabled = !voices.length;
    audioMessage(
        voices.length
            ? "Prueba una voz y elige la que entiendas mejor. Las opciones dependen de tu navegador y equipo."
            : "Este equipo no ha ofrecido voces inglesas. Prueba un navegador actualizado o instala una voz inglesa en el dispositivo.",
        "voiceAvailability",
    );
}

function selectReadingVoice(value) {
    stopSpeech(false);
    supportSettings().voiceURI = value;
    save();
    audioMessage("Voz guardada. Puedes probarla abajo.", "voicePreviewStatus");
}

if ("speechSynthesis" in window) {
    window.speechSynthesis.addEventListener("voiceschanged", refreshVoiceControls);
    window.speechSynthesis.getVoices();
}
window.addEventListener("pagehide", () => stopSpeech(false));
