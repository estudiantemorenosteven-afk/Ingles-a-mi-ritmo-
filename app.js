// INGLES A MI RITMO
// Este archivo controla la navegación, las actividades y el progreso.
// document.getElementById busca un elemento del HTML por su identificador.
// state contiene los datos guardados; session contiene la actividad actual.
// Los textos entre acentos invertidos (`) permiten escribir HTML en varias líneas.
// ${...} coloca valores de JavaScript dentro de esos textos.

const main = document.getElementById("main");
// El grado se escoge antes de mostrar la interfaz de aprendizaje.
let grade = null;
let state = emptyState();
let session = null;
function emptyState() {
    return { done: [], results: {}, draft: "", drafts: {}, large: false };
}
// Cada grado tiene su propia clave: los resultados no se mezclan.
function storageKey() {
    return "ingles-ritmo-v2-grado-" + grade;
}
function save() {
    if (!grade) return;
    try {
        localStorage.setItem(storageKey(), JSON.stringify(state));
    } catch {
        document
            .getElementById("storageNote")
            ?.replaceChildren("No se pudo guardar el avance en este navegador.");
    }
}
function selectGrade(number) {
    if (number !== 6 && number !== 7) return;
    if (grade) save();
    grade = number;
    lessons = courses[grade].themes;
    pre = diagnostics[grade];
    finalQuestions = assessments[grade];
    state = emptyState();
    try {
        state = {
            ...state,
            ...JSON.parse(localStorage.getItem(storageKey()) || "{}"),
        };
    } catch {}
    location.hash = "inicio";
    render();
}
function gradeScreen() {
    main.innerHTML = `
        <section class="grade-welcome">
            <span class="badge">BIENVENIDO A INGLES A MI RITMO</span>
            <h1>Tu aprendizaje empieza<br><em>por tu camino.</em></h1>
            <p class="lead">Elige el grado en el que estudias. Encontrarás temáticas, videos y actividades para tu recorrido.</p>
            <div class="grade-grid">
                <article class="card grade-card">
                    <span class="grade-number">6.º</span>
                    <h2>Sexto</h2>
                    <p>Me conozco y descubro mi entorno.</p>
                    <ul><li>Identidad y aula</li><li>Rutinas de cuidado</li><li>Ahorro de energía</li><li>Identidad colombiana</li></ul>
                    <button class="primary" onclick="selectGrade(6)">Entrar a sexto →</button>
                </article>
                <article class="card grade-card">
                    <span class="grade-number">7.º</span>
                    <h2>Séptimo</h2>
                    <p>Me cuido, convivo y participo.</p>
                    <ul><li>Cuidado integral</li><li>Convivencia e inclusión</li><li>Conservación ambiental</li><li>Culturas internacionales</li></ul>
                    <button class="primary" onclick="selectGrade(7)">Entrar a séptimo →</button>
                </article>
            </div>
            <p class="notice">No necesitas escribir tu nombre ni un diagnóstico. Si compartes el equipo, recuerda borrar tu avance al terminar. Los grados separan temáticas, no identifican a cada estudiante.</p>
            ${grade ? '<button onclick="go(&quot;inicio&quot;)">← Volver a mi recorrido actual</button>' : ""}
        </section>`;
}
// Protege el texto escrito por el estudiante antes de mostrarlo dentro del HTML.
function esc(s) {
    return String(s).replace(
        /[&<>"']/g,
        (c) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[c],
    );
}
// Lee un texto en inglés con la voz disponible en el navegador.
function speech(text) {
    if (!("speechSynthesis" in window)) {
        alert(
            "Este navegador no ofrece lectura de voz. Puedes utilizar el texto visible.",
        );
        return;
    }
    speechSynthesis.cancel();
    let u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.82;
    u.onerror = () => {
        document
            .getElementById("audioStatus")
            ?.replaceChildren(
                "No se pudo reproducir la voz. Utiliza el texto o prueba otro navegador.",
            );
    };
    speechSynthesis.speak(u);
}
// Cambia la sección usando la parte de la dirección que aparece después de #.
function go(route) {
    if (location.hash.slice(1) === route) {
        render();
    } else {
        location.hash = route;
    }
}
// Marca una misión completada sin agregarla dos veces.
function mark(i) {
    if (!state.done.includes(i)) state.done.push(i);
    save();
}
const links = [
    ["inicio", "Mi recorrido"],
    ["diagnostico", "Punto de partida"],
    ["mision-0", "Temáticas"],
    ["reto", "Reto final"],
    ["progreso", "Mi progreso"],
    ["guia", "Guía y estándares"],
];
// Revisa la sección elegida y muestra su contenido en la pantalla.
function render() {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    session = null;
    let r = location.hash.slice(1) || "inicio";
    const choosing = !grade || r === "grados";
    document.body.classList.toggle("choosing-grade", choosing);
    document.getElementById("gradeSwitch").textContent = grade
        ? grade + ".º · Cambiar grado"
        : "Elegir grado";
    if (choosing) {
        gradeScreen();
        main.focus();
        window.scrollTo(0, 0);
        return;
    }
    document.body.classList.toggle("large", state.large);
    document.getElementById("nav").innerHTML = links
        .map(
            (
                [id, t],
                i,
            ) => `<a href="#${id}" class="${r === id || (id === "mision-0" && r.startsWith("mision")) ? "active" : ""}">
<b>0${i + 1}</b>${t}</a>`,
        )
        .join("");
    if (r === "inicio") home();
    else if (r === "guia") guide();
    else if (r === "progreso") progress();
    else if (r.startsWith("mision-"))
        lesson(
            Math.max(0, Math.min(lessons.length - 1, Number(r.split("-")[1]) || 0)),
        );
    else if (r === "diagnostico") quiz("pre", pre);
    else if (r === "reto") quiz("final", finalQuestions);
    else home();
    main.focus();
    window.scrollTo(0, 0);
}
// Dibuja la página de inicio y las tarjetas de las tres misiones.
function home() {
    let pct = Math.round((state.done.length / lessons.length) * 100);
    main.innerHTML = `<div class="hero">
<div>
<span class="badge">INGLÉS PARA CONECTAR CON TU MUNDO</span>
<h1>Aprende inglés.<br>
<em>A tu ritmo.</em>
</h1>
<p class="lead">${courses[grade].subtitle}. Explora los temas y expresa tus ideas, un paso a la vez.</p>
<div class="actions">
<button class="primary" onclick="go('diagnostico')">Comenzar mi recorrido ↗</button>
<button onclick="go('guia')">Cómo funciona</button>
</div>
<div class="stats">
<span>
<strong>${lessons.length} temáticas</strong>Pasos pequeños</span>
<span>
<strong>Sin cronómetro</strong>Tú marcas el ritmo</span>
<span>
<strong>${grade}.º · ${courses[grade].name}</strong>Tu recorrido</span>
</div>
</div>
<div class="hero-art" aria-label="Ilustración de un cuaderno, un lápiz y una tarjeta con un saludo" role="img">
<svg viewBox="0 0 420 320" aria-hidden="true">
<circle cx="230" cy="150" r="125" fill="#d2dfbb"/>
<g transform="rotate(-10 190 180)">
<rect x="94" y="53" width="196" height="239" rx="15" fill="#275541"/>
<rect x="112" y="53" width="178" height="230" rx="12" fill="#fafbf4"/>
<path d="M135 110h130M135 138h130M135 166h95M135 224h120" stroke="#d2ddc6" stroke-width="5"/>
<path d="M102 72v195" stroke="#a9c28c" stroke-width="5"/>
<text x="137" y="204" fill="#315c45" font-size="25" font-family="Georgia">My school life</text>
</g>
<g transform="rotate(15 300 230)">
<rect x="310" y="143" width="17" height="131" rx="4" fill="#d7a365"/>
<path d="M310 274l8 20 9-20" fill="#f4dbb9"/>
<path d="M315 286l3 8 4-8" fill="#294d3c"/>
</g>
<rect x="249" y="35" width="124" height="67" rx="16" fill="#fff"/>
<text x="268" y="76" font-family="system-ui" font-weight="700" font-size="25" fill="#315c45">Hello! ✦</text>
</svg>
<span class="art-label">Una idea nueva. Un paso más.</span>
</div>
</div>
<div class="section-line">
<h2>Tu ruta de aprendizaje</h2>
<span class="notice">${state.done.length} de ${lessons.length} temáticas</span>
</div>
<div class="progress-track" aria-label="Progreso ${pct}%">
<div style="width:${pct}%">
</div>
</div>
<div class="grid">${lessons
        .map(
            (l, i) => `<article class="card">
<span class="num">${state.done.includes(i) ? "✓ COMPLETADA" : "0" + (i + 1)}</span>
<p class="eyebrow">${l.tag}</p>
<h3>${l.title}</h3>
<p>${l.desc}</p>
<button onclick="go('mision-${i}')">${state.done.includes(i) ? "Volver a practicar" : "Explorar temática"} →</button>
</article>`,
        )
        .join("")}</div>
<p class="notice" id="storageNote">El avance se guarda solo en este navegador. No necesitas registrar tu nombre ni diagnóstico.</p>`;
}
// Muestra el ejemplo, los apoyos y la práctica de una misión.
function lesson(i) {
    let l = lessons[i];
    const video = videos[l.video];
    main.innerHTML = `<span class="badge">GRADO ${grade}.º · TEMA ${i + 1} DE ${lessons.length} · ${l.tag}</span>
<h1>${l.title}</h1>
<p class="lead">${l.goal}</p>
<section class="panel">
<p class="eyebrow">1 · COMPRENDE EL TEMA</p>
<h2>¿Cómo se usa?</h2>
<p>${l.explanation}</p>
<p class="chip">${l.grammar}</p>
<h3>Lee y escucha el ejemplo</h3>
<p class="reading" lang="en">${l.text}</p>
<button id="listen">▷ Escuchar en inglés</button>
<p class="notice" id="audioStatus" role="status">Voz del dispositivo. Su disponibilidad y funcionamiento sin internet dependen del navegador.</p>
<details>
<summary>Apoyos de vocabulario</summary>
<div class="chips">${l.words.map((w) => `<span class="chip">${w}</span>`).join("")}</div>
</details>
</section>
<section class="panel video-panel">
<p class="eyebrow">2 · MIRA, PAUSA Y DESCUBRE</p>
<h2>${video.title}</h2>
<p>${video.focus}</p>
<div class="video-frame">
<iframe src="https://www.youtube-nocookie.com/embed/${video.id}?rel=0&playsinline=1&enablejsapi=1" title="${video.title} · ${video.author}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>
</div>
<p class="notice">Autor: ${video.author}. Requiere internet. Puedes activar subtítulos si el autor los ofrece y pausar cuando lo necesites. Si el reproductor no carga, utiliza el enlace externo; las actividades también funcionan sin el video.</p>
<a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener">Ver en YouTube ↗</a>
${video.source ? `<p><a href="${video.source}" target="_blank" rel="noopener">Transcripción y recurso del autor ↗</a></p>` : ""}
</section>
<section class="panel">
<p class="eyebrow">3 · PONLO EN PRÁCTICA</p>
<h2>¿Qué comprendiste?</h2>
<p>Puedes consultar el ejemplo y volver a intentarlo. Las pistas te ayudan a aprender.</p>
<button class="primary" id="practice">Comenzar práctica →</button>
<div id="practiceArea">
</div>
</section>
<section class="panel">
<p class="eyebrow">4 · TU VOZ, TUS IDEAS</p>
<h2>Tu producción en inglés</h2>
<p>${l.prompt} Escribe entre tres y cinco oraciones; puedes inventar los datos.</p>
<label for="draft">Mi texto en inglés</label>
<textarea id="draft" placeholder="${esc(l.model)}">${esc(state.drafts[i] || "")}</textarea>
<div class="actions">
<button id="saveDraft">Guardar borrador</button>
<button id="speakDraft">Escuchar mi texto</button>
</div>
<p id="draftStatus" role="status">
</p>
<details>
<summary>Lista para revisar mi texto</summary>
<ul>
<li>Respondí a la tarea de esta temática.</li>
<li>Usé el vocabulario y la estructura del ejemplo.</li>
<li>Conecté mis ideas con claridad.</li>
<li>Revisé mayúsculas y puntos.</li>
</ul>
<p>Comparte tu texto con el docente para recibir retroalimentación. El OVA no califica automáticamente la escritura ni la pronunciación.</p>
</details>
</section>
<div class="actions">
<button onclick="go('inicio')">← Mi recorrido</button>
<button onclick="go('${i < lessons.length - 1 ? "mision-" + (i + 1) : "reto"}')">${i < lessons.length - 1 ? "Siguiente temática" : "Ir al reto final"} →</button>
</div>`;
    document.getElementById("listen").onclick = () => speech(l.text);
    document.getElementById("practice").onclick = () => {
        session = {
            key: "practice" + i,
            items: l.questions,
            index: 0,
            score: 0,
            attempts: 0,
            records: [],
            lesson: i,
        };
        showQuestion("practiceArea");
    };
    {
        document.getElementById("draft").oninput = () => {
            state.drafts[i] = document.getElementById("draft").value;
            state.draft = Object.values(state.drafts).join("\n\n");
            save();
        };
        document.getElementById("saveDraft").onclick = () => {
            state.drafts[i] = document.getElementById("draft").value;
            state.draft = Object.values(state.drafts).join("\n\n");
            save();
            document.getElementById("draftStatus").textContent =
                "Borrador guardado en este navegador. La revisión de contenido corresponde al docente.";
        };
        document.getElementById("speakDraft").onclick = () =>
            speech(document.getElementById("draft").value);
    }
}
// Prepara el diagnóstico inicial o el reto final.
function quiz(key, items) {
    main.innerHTML = `<span class="badge">${key === "pre" ? "ANTES DE EMPEZAR" : "CIERRE DE LA UNIDAD"}</span>
<h1>${key === "pre" ? "Tu punto de partida" : "Mi reto final"}</h1>
<p class="lead">${key === "pre" ? "Explora lo que ya sabes. No es una calificación." : "Responde sin consultar las misiones. Cada primera respuesta cuenta para este recorrido; al terminar podrás repasar."}</p>
<section class="panel" id="quizArea">
</section>`;
    session = { key, items, index: 0, score: 0, attempts: 0, records: [] };
    showQuestion("quizArea");
}
// Muestra una pregunta, revisa la respuesta y permite avanzar o reintentar.
function showQuestion(target) {
    let s = session,
        q = s.items[s.index],
        practice = s.key.startsWith("practice");
    s.attempts = 0;
    document.getElementById(target).innerHTML =
        `<p class="eyebrow">PREGUNTA ${s.index + 1} DE ${s.items.length}</p>
<h2>${q.q}</h2>
<div class="options">${q.options.map((o, i) => `<button class="option" data-answer="${i}">${esc(o)}</button>`).join("")}</div>
<div id="feedback" class="feedback" role="status">
</div>
<button id="nextQ" class="primary" hidden>Siguiente →</button>`;
    document.querySelectorAll("[data-answer]").forEach(
        (b) =>
            (b.onclick = () => {
                let a = Number(b.dataset.answer),
                    ok = a === q.answer;
                s.attempts++;
                if (s.attempts === 1) {
                    if (ok) s.score++;
                    s.records.push({ question: q.q, correct: ok, attempts: 1 });
                } else s.records[s.records.length - 1].attempts = s.attempts;
                document.getElementById("feedback").textContent =
                    (ok
                        ? "¡Bien! "
                        : practice
                          ? "Prueba de nuevo. "
                          : "Para repasar: ") + q.why;
                b.classList.add(ok ? "correct" : "wrong");
                if (ok || !practice) {
                    document
                        .querySelectorAll("[data-answer]")
                        .forEach((x) => (x.disabled = true));
                    document.getElementById("nextQ").hidden = false;
                } else b.disabled = true;
            }),
    );
    document.getElementById("nextQ").onclick = () => {
        s.index++;
        if (s.index < s.items.length) showQuestion(target);
        else finish(target);
    };
    document
        .getElementById(target)
        .querySelector("h2")
        .setAttribute("tabindex", "-1");
    document.getElementById(target).querySelector("h2").focus();
}
// Guarda el resultado y muestra los temas que se pueden repasar.
function finish(target) {
    let s = session;
    state.results[s.key] = {
        score: s.score,
        total: s.items.length,
        records: s.records,
        date: new Date().toISOString(),
    };
    if (s.lesson !== undefined) mark(s.lesson);
    save();
    document.getElementById(target).innerHTML =
        `<span class="badge">RECORRIDO COMPLETADO</span>
<h2>${s.score} de ${s.items.length} aciertos en el primer intento</h2>
<p>${s.lesson !== undefined ? "Terminaste esta práctica. Los reintentos también forman parte del aprendizaje." : "Este resultado describe esta actividad; no certifica un nivel de inglés."}</p>
<ul>${
            s.records
                .filter((r) => !r.correct)
                .map((r) => `<li>Repasa: ${esc(r.question)}</li>`)
                .join("") ||
            "<li>Resolviste todas las preguntas en el primer intento.</li>"
        }</ul>
<div class="actions">
<button class="primary" onclick="go('${s.key === "pre" ? "mision-0" : "progreso"}')">${s.key === "pre" ? "Ir a las misiones" : "Ver mi progreso"} →</button>
<button onclick="go('inicio')">Mi recorrido</button>
</div>`;
}
// Muestra los resultados y permite descargarlos o borrar el avance.
function progress() {
    main.innerHTML = `<span class="badge">CADA PASO CUENTA</span>
<h1>Mi progreso</h1>
<p class="lead">${state.done.length} de ${lessons.length} prácticas completadas. Puedes regresar y seguir aprendiendo.</p>
<div class="grid">${lessons
        .map(
            (l, i) => `<article class="card">
<span class="num">${state.done.includes(i) ? "✓ Completada" : "Por explorar"}</span>
<h3>${l.title}</h3>
<p>${state.results["practice" + i] ? state.results["practice" + i].score + " aciertos iniciales de " + state.results["practice" + i].total : "Sin práctica registrada."}</p>
<button onclick="go('mision-${i}')">Practicar →</button>
</article>`,
        )
        .join("")}</div>
<section class="panel">
<h2>Mis actividades de entrada y cierre</h2>
<p>Se conserva el resultado más reciente de cada actividad. Las preguntas son distintas y no constituyen una prueba estandarizada ni una medición causal del impacto.</p>
<p>Entrada: <strong>${resultLabel("pre")}</strong> · Cierre: <strong>${resultLabel("final")}</strong>
</p>
<p>Escritura: ${state.draft ? "borrador guardado, pendiente de revisión docente." : "sin borrador guardado."}</p>
<div class="actions">
<button id="export">Descargar mi registro</button>
<button id="reset">Borrar mi avance</button>
</div>
<p class="notice">En un equipo compartido, descarga tu registro y borra el avance antes de que lo use otra persona.</p>
</section>`;
    document.getElementById("export").onclick = () => {
        let b = new Blob([JSON.stringify({ grado: grade, ...state }, null, 2)], {
                type: "application/json",
            }),
            u = URL.createObjectURL(b),
            a = document.createElement("a");
        a.href = u;
        a.download = "mi-progreso-grado-" + grade + ".json";
        a.click();
        setTimeout(() => URL.revokeObjectURL(u), 1000);
    };
    document.getElementById("reset").onclick = () => {
        if (confirm("¿Borrar el avance y el borrador de este navegador?")) {
            const largeText = state.large;
            state = emptyState();
            state.large = largeText;
            save();
            progress();
        }
    };
}
// Devuelve el resultado registrado o indica que falta realizar la actividad.
function resultLabel(k) {
    let r = state.results[k];
    return r ? r.score + " / " + r.total : "Sin realizar";
}
// Muestra la guía de uso, los créditos y la relación con los estándares del MEN.
function guide() {
    main.innerHTML = `
        <span class="badge">GUÍA DOCENTE · GRADO ${grade}.º</span>
        <h1>Aprender con propósito</h1>
        <p class="lead">Dos rutas diferenciadas y cuatro temáticas por grado. La selección es una adaptación didáctica para el OVA, pendiente de validación con el plan de área institucional.</p>
        <section class="panel">
            <h2>Referentes del MEN</h2>
            <p>La Guía 22 (2006, páginas impresas 22–23) presenta estándares conjuntos para sexto y séptimo y una meta de referencia A2.2 al finalizar el grupo. Para distribuir temas por grado se toma además el Esquema Curricular Sugerido de Inglés de 2016: sexto, módulos 1–4 (páginas impresas 90–93); séptimo, módulos 1–4 (94–98).</p>
            <p>Son referentes distintos: el currículo sugerido plantea una progresión de niveles por grado que no debe confundirse con la agrupación de la Guía 22. Este OVA desarrolla una selección de desempeños; no es un curso completo ni certifica un nivel.</p>
            <table><thead><tr><th>Temática</th><th>Desempeño de referencia</th><th>Evidencia en el OVA</th></tr></thead><tbody>
            ${lessons.map((l) => `<tr><td>${l.tag}</td><td>${l.standard}</td><td>Texto y audio con apoyo escrito, video complementario, tres preguntas y un borrador. Objetivo: ${l.goal}</td></tr>`).join("")}
            </tbody></table>
            <p><a href="${SOURCE}" target="_blank" rel="noopener">Estándares básicos · Guía 22 ↗</a></p>
            <p><a href="${CURRICULUM}" target="_blank" rel="noopener">Esquema Curricular Sugerido · 2016 ↗</a></p>
        </section>
        <section class="panel">
            <h2>Una ruta por pasos</h2>
            <ol><li>Elige sexto o séptimo.</li><li>Resuelve el punto de partida.</li><li>Explora cada tema: explicación, lectura, audio, video y práctica.</li><li>Escribe tu producción y compártela con tu docente.</li><li>Realiza el reto final y descarga tu registro si lo necesitas.</li></ol>
            <p>Puedes cambiar de grado desde el encabezado. El avance y los borradores se guardan por separado para cada grado en este navegador. Esto no crea perfiles individuales: en equipos compartidos se debe borrar el registro antes de que otra persona use el mismo grado.</p>
            <h3>Evaluación y acompañamiento</h3>
            <p>Las prácticas registran aciertos iniciales y reintentos. El reto final retoma preguntas de las prácticas para consolidar lo aprendido: no es una prueba independiente de transferencia ni una medición causal del impacto. En escritura, revise respuesta a la tarea, claridad, vocabulario y conexión entre ideas. La expresión oral puede practicarse con un compañero o docente; no se graba ni se califica automáticamente.</p>
            <h3>Videos y accesibilidad</h3>
            <p>Los videos de terceros se integran con YouTube, sin reproducción automática, y pueden incluir publicidad o dejar de estar disponibles. Usa los enlaces externos si se bloquea la inserción. Las lecciones extensas se proponen por fragmentos; el video ambiental de British Council es un reto acompañado y tiene enlace a su transcripción. Los textos propios del OVA permiten realizar todas las prácticas aunque no haya acceso a los videos.</p>
            <h3>Privacidad y apoyos</h3>
            <p>El recurso no solicita diagnósticos, nombres ni micrófono. No incluyas información sensible en los borradores. La voz depende del navegador y algunas voces pueden usar servicios del proveedor. YouTube necesita conexión y está sujeto a sus propias condiciones. Usa Aa para ampliar el texto y Pausa para descansar; también puedes navegar con teclado.</p>
            <h3>Créditos</h3>
            <p>Proyecto de la Institución Educativa Alberto Lleras Camargo. Textos y ejercicios desarrollados para este OVA. Referentes: MEN (2006 y 2016). Videos: EnglishClass101, Woodward English, campaña Energy, let’s save it! y British Council LearnEnglish Teens, con atribución en cada temática. No es un recurso oficial ni avalado por el MEN. Requiere revisión docente y pilotaje.</p>
        </section>`;
}
document.getElementById("size").onclick = () => {
    state.large = !state.large;
    document.body.classList.toggle("large", state.large);
    save();
};
document.getElementById("pause").onclick = () => {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    document.querySelectorAll(".video-frame iframe").forEach((frame) => {
        frame.contentWindow.postMessage(
            JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
            "https://www.youtube-nocookie.com",
        );
    });
    document.getElementById("pauseDialog").showModal();
};
document.getElementById("resume").onclick = () =>
    document.getElementById("pauseDialog").close();
document.getElementById("gradeSwitch").onclick = () => go("grados");
window.addEventListener("hashchange", render);
render();
