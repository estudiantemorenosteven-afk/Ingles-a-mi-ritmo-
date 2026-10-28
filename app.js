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
    return "ingles-ritmo-v3-grado-" + grade;
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
    supportStop();
    if (number !== 6 && number !== 7) return;
    if (grade) save();
    grade = number;
    lessons = courses[grade].themes;
    pre = diagnostics[grade];
    finalQuestions = assessments[grade];
    state = emptyState();
    try {
        const current = localStorage.getItem(storageKey());
        if (current) {
            state = { ...state, ...JSON.parse(current) };
        } else {
            migratePreviousProgress();
        }
    } catch {}
    location.hash = "inicio";
    render();
}
// Los cuatro temas anteriores ahora son el primer tema de cada periodo.
function migratePreviousProgress() {
    const old = JSON.parse(
        localStorage.getItem("ingles-ritmo-v2-grado-" + grade) || "null",
    );
    if (!old) return;
    state.large = Boolean(old.large);
    const map = [0, 3, 6, 9];
    for (let i = 0; i < map.length; i++) {
        if ((old.done || []).includes(i)) state.done.push(map[i]);
        if (old.drafts && old.drafts[i]) state.drafts[map[i]] = old.drafts[i];
        if (old.results && old.results["practice" + i]) {
            state.results["practice" + map[i]] = old.results["practice" + i];
        }
    }
    state.draft = Object.values(state.drafts).join("\n\n");
    save();
}
function gradeScreen() {
    main.innerHTML = `
        <section class="grade-welcome">
            <div class="welcome-heading"><img class="welcome-logo" src="logo-ingles-mi-ritmo.png" alt="Inglés a mi ritmo: un lápiz con audífonos, un libro y un globo" /><div><span class="badge">BIENVENIDO A INGLÉS A MI RITMO</span><h1>Tu aprendizaje empieza<br><em>por tu camino.</em></h1></div></div>
            <p class="lead">Elige tu grado y luego tu periodo. Cada periodo contiene tres temas con lectura, video, práctica y escritura.</p>
            <div class="grade-grid">
                <article class="card grade-card">
                    <span class="grade-number">6.º</span>
                    <h2>Sexto</h2>
                    <p>4 periodos · 12 temas</p>
                    <ul><li>Identidad y aula</li><li>Rutinas de cuidado</li><li>Ahorro de energía</li><li>Identidad colombiana</li></ul>
                    <button class="primary" onclick="selectGrade(6)">Entrar a sexto →</button>
                </article>
                <article class="card grade-card">
                    <span class="grade-number">7.º</span>
                    <h2>Séptimo</h2>
                    <p>4 periodos · 12 temas</p>
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
    u.rate = supportSettings().rate;
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
    ["periodos", "Periodos y temas"],
    ["reto", "Reto final"],
    ["progreso", "Mi progreso"],
    ["guia", "Guía y estándares"],
    ["configuracion", "Configuración"],
];
// Revisa la sección elegida y muestra su contenido en la pantalla.
function render() {
    supportStop();
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
            ) => `<a href="#${id}" class="${r === id || (id === "periodos" && (r.startsWith("mision") || r.startsWith("periodo"))) ? "active" : ""}">
<b>0${i + 1}</b>${t}</a>`,
        )
        .join("");
    if (r === "inicio" || r === "periodos") home();
    else if (r.startsWith("periodo-")) periodPage(Number(r.split("-")[1]));
    else if (r.startsWith("cierre-")) periodQuiz(Number(r.split("-")[1]));
    else if (r === "configuracion") supportConfiguration();
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
// Dibuja la página de inicio y las tarjetas de los cuatro periodos.
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
<button class="primary" onclick="go('periodo-1')">Explorar primer periodo ↗</button>
<button onclick="go('guia')">Cómo funciona</button>
${supportResumeButton()}
</div>
<div class="stats">
<span>
<strong>4 periodos · ${lessons.length} temas</strong>Pasos pequeños</span>
<span>
<strong>Sin cronómetro</strong>Tú marcas el ritmo</span>
<span>
<strong>${grade}.º · ${courses[grade].name}</strong>Tu recorrido</span>
</div>
</div>
<div class="hero-art">
<img class="identity-image" src="logo-ingles-mi-ritmo.png" alt="Inglés a mi ritmo, aprende con nuestro lápiz con audífonos" />
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
<div class="period-grid">${courses[grade].periods
        .map((period, i) => {
            const complete = period.topics.filter((topic) =>
                state.done.includes(topic.id),
            ).length;
            return `<article class="card period-card">
        <span class="num">PERIODO ${i + 1}</span>
        <h3>${period.name}</h3>
        <p>${period.axis}</p>
        <ul>${period.topics.map((topic) => `<li>${topic.title}</li>`).join("")}</ul>
        <p class="notice">${complete} de 3 prácticas completadas</p>
        <button onclick="go('periodo-${i + 1}')">Abrir periodo ${i + 1} →</button>
    </article>`;
        })
        .join("")}</div>
<p class="notice">Esta es una propuesta de cuatro periodos basada en los referentes del MEN. Su orden y alcance deben validarse con el plan de área de tu institución.</p>
<p class="notice" id="storageNote">El avance se guarda solo en este navegador. No necesitas registrar tu nombre ni diagnóstico.</p>`;
}
// Abrir un periodo sin mostrar todos los contenidos del año al mismo tiempo.
function periodPage(number) {
    if (![1, 2, 3, 4].includes(number)) return home();
    const period = courses[grade].periods[number - 1];
    main.innerHTML = `
        <span class="badge">GRADO ${grade}.º · PERIODO ${number}</span>
        <h1>${period.name}</h1>
        <p class="lead">${period.axis}. Tres temas, a tu ritmo.</p>
        <div class="grid">${period.topics
            .map(
                (topic) => `<article class="card">
            <span class="num">TEMA ${topic.position} ${state.done.includes(topic.id) ? "· ✓ Práctica realizada" : ""}</span>
            <h2>${topic.title}</h2><p>${topic.goal}</p>
            <button onclick="go('mision-${topic.id}')">Comenzar tema ${topic.position} →</button>
        </article>`,
            )
            .join("")}</div>
        <section class="panel">
            <h2>Cierre del periodo</h2>
            <p><strong>Producto sugerido:</strong> ${period.project}</p>
            <p>Utiliza tus borradores como preparación y presenta el producto a tu docente. Revisión: respuesta a la tarea, claridad del mensaje, vocabulario y conexiones entre ideas.</p>
            <p>Repaso interactivo: seis preguntas, sin límite de tiempo. ${resultLabel("period" + number)}</p>
            <button class="primary" onclick="go('cierre-${number}')">Repasar este periodo →</button>
        </section>
        <div class="actions"><button onclick="go('inicio')">← Todos los periodos</button>
        ${number < 4 ? `<button onclick="go('periodo-${number + 1}')">Siguiente periodo →</button>` : ""}</div>`;
}
function periodQuiz(number) {
    if (![1, 2, 3, 4].includes(number)) return home();
    const questions = [];
    for (const topic of courses[grade].periods[number - 1].topics) {
        questions.push(topic.questions[0], topic.questions[2]);
    }
    quiz("period" + number, questions);
}
// Mostrar solo un paso de la lección. Cambiar de paso no borra las respuestas.
function showStage(number, moveFocus = true) {
    supportRecordStage(number);
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    const names = ["Aprendo", "Veo", "Practico", "Escribo"];
    document.querySelectorAll("[data-stage]").forEach((panel) => {
        panel.hidden = Number(panel.dataset.stage) !== number;
    });
    document.querySelectorAll("[data-stage-button]").forEach((button) => {
        button.setAttribute(
            "aria-pressed",
            String(Number(button.dataset.stageButton) === number),
        );
    });
    document.getElementById("stageStatus").textContent =
        "Paso " + (number + 1) + " de 4 · " + names[number];
    if (number !== 1) pauseVideos();
    if (moveFocus) document.getElementById("stageStatus").focus();
}
function pauseVideos() {
    document.querySelectorAll(".video-frame iframe").forEach((frame) => {
        frame.contentWindow.postMessage(
            JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
            "https://www.youtube-nocookie.com",
        );
    });
}
// Cada recurso muestra su propósito, el tiempo del fragmento y su autor.
function videoResourceMarkup(video) {
    const start = video.start || 0;
    const end = video.end || 120;
    const clock = (seconds) =>
        Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
    const watch =
        "https://www.youtube.com/watch?v=" + video.id + "&t=" + start + "s";
    return `<article class="video-resource">
        <h2>${esc(video.title)}</h2>
        <p>${esc(video.focus)}</p>
        <p class="notice"><strong>Para esta temática:</strong> ${esc(video.reason || "Repasa con el ejemplo escrito.")}</p>
        <p class="chip">${esc(video.level || "Apoyo acompañado")}${video.externalOnly ? "" : ` · Tramo propuesto ${clock(start)}–${clock(end)} (${end - start} segundos). Puedes parar antes.`}</p>
        ${video.externalOnly ? "" : `<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${video.id}?rel=0&playsinline=1&enablejsapi=1&cc_load_policy=1&start=${start}&end=${end}" title="${esc(video.title)} · ${esc(video.author)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`}
        <p class="notice">Autor: ${esc(video.author)}. Requiere internet. Puedes activar los subtítulos disponibles y pausar. Las actividades se pueden realizar con los ejemplos escritos aunque no cargue el video.</p>
        <a href="${watch}" target="_blank" rel="noopener">Abrir video en YouTube ↗</a>
        ${video.source && !video.source.includes("youtube.com") ? `<p><a href="${video.source}" target="_blank" rel="noopener">Recurso y materiales del autor ↗</a></p>` : ""}
    </article>`;
}

// Muestra el ejemplo, los apoyos y la práctica de una misión.
function lesson(i) {
    let l = lessons[i];
    const video = videos[l.video];
    main.innerHTML = `<span class="badge">GRADO ${grade}.º · PERIODO ${l.period} · TEMA ${l.position} DE 3 · ${l.tag}</span>
<h1>${l.title}</h1>
<p class="lead">${l.goal}</p>
${supportMarkup(i)}
<button onclick="go('periodo-${l.period}')">← Temas del periodo ${l.period}</button>
<div class="stage-navigation" aria-label="Pasos del tema">
${["1 · Aprendo", "2 · Veo", "3 · Practico", "4 · Escribo"].map((name, n) => `<button data-stage-button="${n}" aria-pressed="${n === 0}" onclick="showStage(${n})">${name}</button>`).join("")}
</div>
<p id="stageStatus" class="eyebrow" tabindex="-1" role="status">Paso 1 de 4 · Aprendo</p>
<section class="panel" data-stage="0">
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
<section class="panel video-panel" data-stage="1" hidden>
<p class="eyebrow">2 · MIRA, PAUSA Y DESCUBRE</p>
<p>Un video principal para esta temática. Los complementos, cuando aparecen, son opcionales.</p>
${videoResourceMarkup(video)}
${(l.extraVideos || []).map((key) => `<details class="extra-video" ontoggle="if (!this.open) pauseVideos()"><summary>Otro recurso opcional: ${esc(videos[key].title)}</summary>${videoResourceMarkup(videos[key])}</details>`).join("")}

</section>
<section class="panel" data-stage="2" hidden>
<p class="eyebrow">3 · PONLO EN PRÁCTICA</p>
<h2>¿Qué comprendiste?</h2>
<p>Puedes consultar el ejemplo y volver a intentarlo. Las pistas te ayudan a aprender.</p>
<button class="primary" id="practice">Comenzar práctica →</button>
<div id="practiceArea">
</div>
</section>
<section class="panel" data-stage="3" hidden>
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
<button onclick="go('periodo-${l.period}')">← Volver al periodo</button>
<button onclick="go('${i < lessons.length - 1 ? "mision-" + (i + 1) : "reto"}')">${i < lessons.length - 1 ? "Siguiente temática" : "Ir al reto final"} →</button>
</div>`;
    // Añadir avance entre pasos sin recargar la temática.
    const panels = main.querySelectorAll("[data-stage]");
    panels.forEach((panel, number) => {
        if (number < 3) {
            const next = document.createElement("button");
            next.className = "primary stage-next";
            next.textContent = "Continuar al paso " + (number + 2) + " →";
            next.onclick = () => showStage(number + 1);
            panel.appendChild(next);
        }
    });
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
    supportStart(i);
}
// Prepara el diagnóstico inicial o el reto final.
function quiz(key, items) {
    main.innerHTML = `<span class="badge">${key === "pre" ? "ANTES DE EMPEZAR" : "CIERRE DE LA UNIDAD"}</span>
<h1>${key === "pre" ? "Tu punto de partida" : key.startsWith("period") ? "Repaso del periodo " + key.slice(6) : "Repaso general del grado"}</h1>
<p class="lead">${key === "pre" ? "Explora lo que ya sabes. No es una calificación." : "Repasa sin consultar los temas. Se retoman preguntas de práctica: este recorrido consolida lo aprendido y no es una prueba independiente. Puedes realizar primero los cierres de cada periodo."}</p>
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
<p>Repasos por periodo: ${[1, 2, 3, 4].map((p) => `P${p}: ${resultLabel("period" + p)}`).join(" · ")}</p>
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
        <p class="lead">Dos rutas diferenciadas, cuatro periodos por grado y tres temas por periodo (24 temas en total). La selección es una adaptación didáctica para el OVA, pendiente de validación con el plan de área institucional.</p>
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
            <h3>Cuatro periodos como propuesta institucional</h3>
            <p>La periodicidad y la distribución exacta las define cada institución en su SIEE y plan de área. No existe una malla nacional única de cuatro periodos. Aquí se usa, por solicitud del proyecto, una adaptación en cuatro periodos de los cuatro ejes modulares sugeridos por el MEN. Cada periodo tiene tres temas y un producto integrador; no equivale a una planeación completa de todas las horas de clase.</p>
            <h3>Apoyos para la atención y la organización</h3>
            <p>Se presenta un paso a la vez, con meta visible, ejemplos, pausas voluntarias, reintentos y guardado de borradores. Los fragmentos de video se limitan a unos dos minutos y los subtítulos se solicitan al reproductor si están disponibles. Esta duración es una decisión de diseño ajustable, no una capacidad de atención universal. No hay un video clínicamente validado como el mejor para todos los estudiantes con TDA o TDAH; el docente debe revisar comprensión, carga visual y preferencias de cada estudiante.</p>
            <p>Orientaciones: <a href="https://udlguidelines.cast.org/" target="_blank" rel="noopener">CAST · Diseño Universal para el Aprendizaje</a>; <a href="https://www.teachingenglish.org.uk/professional-development/teachers/managing-resources/articles/teenagers-and-video" target="_blank" rel="noopener">British Council · uso didáctico de videos con adolescentes</a>.</p>
            <h3>Recordatorio de pausa y ayudas</h3>
            <p>El OVA cuenta tiempo con una temática abierta y la pestaña visible, sin mostrar el reloj. A los diez minutos ofrece una pausa que se puede aceptar, posponer dos minutos o descartar. No mide la atención, no diagnostica cansancio y diez minutos no es un límite universal. Las pausas y las pestañas ocultas no acumulan tiempo; los saltos largos del reloj por suspensión del equipo se descartan. El recordatorio puede desactivarse en la temática.</p>
            <p>Se ofrecen actividades opcionales de descanso, compatibles con permanecer sentado. El estudiante puede volver sin perder el borrador. Se recuerda el último tema y paso por grado; el botón Retomar facilita continuar. La velocidad de la voz puede ajustarse y la orientación contextual explica cómo empezar cada paso. Todo se guarda en el navegador, sin sincronización entre dispositivos.</p>
            <h3>Videos y accesibilidad</h3>
            <p>Cada una de las 24 temáticas tiene un video principal diferente, seleccionado por su relación con el objetivo. Algunos complementos se ofrecen de forma opcional y pueden requerir acompañamiento por su dificultad. El formato entretenido no garantiza beneficios para todos los estudiantes con TDAH. Los videos de terceros se integran con YouTube, sin reproducción automática, y pueden incluir publicidad o dejar de estar disponibles. Usa los enlaces externos si se bloquea la inserción. Las lecciones extensas se proponen por fragmentos; el video ambiental de British Council es un reto acompañado y tiene enlace a su transcripción. Los textos propios del OVA permiten realizar todas las prácticas aunque no haya acceso a los videos.</p>
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
document.getElementById("pause").onclick = () => supportShowBreak(true);
document.getElementById("startActivePause").onclick = supportBeginPause;
document.getElementById("snoozePause").onclick = () => supportCloseBreak(true);
document.getElementById("resume").onclick = () => supportCloseBreak(false);
document
    .getElementById("pauseDialog")
    .addEventListener("close", supportResumeAfterClose);
document.getElementById("gradeSwitch").onclick = () => go("grados");
window.addEventListener("hashchange", render);
render();
