// MISIONES Y EJEMPLOS ORIGINALES DEL OVA
const learningContent = {
    "6": [
        {
            "mission": "Presenta a un personaje con su nombre y procedencia.",
            "examples": [
                {
                    "chunks": [
                        "My name",
                        "is",
                        "Leo."
                    ],
                    "text": "My name is Leo.",
                    "meaning": "Me llamo Leo."
                },
                {
                    "chunks": [
                        "I am",
                        "a football",
                        "player."
                    ],
                    "text": "I am a football player.",
                    "meaning": "Soy jugador de fútbol."
                },
                {
                    "chunks": [
                        "I am",
                        "from",
                        "Colombia."
                    ],
                    "text": "I am from Colombia.",
                    "meaning": "Soy de Colombia."
                }
            ]
        },
        {
            "mission": "Describe a dos personas y algo que las caracteriza.",
            "examples": [
                {
                    "chunks": [
                        "My sister",
                        "has",
                        "a friendly dog."
                    ],
                    "text": "My sister has a friendly dog.",
                    "meaning": "Mi hermana tiene un perro amigable."
                },
                {
                    "chunks": [
                        "My friend",
                        "is",
                        "a kind player."
                    ],
                    "text": "My friend is a kind player.",
                    "meaning": "Mi amigo es un jugador amable."
                },
                {
                    "chunks": [
                        "Her brother",
                        "has",
                        "a green backpack."
                    ],
                    "text": "Her brother has a green backpack.",
                    "meaning": "Su hermano tiene una mochila verde."
                }
            ]
        },
        {
            "mission": "Da una instrucción y pide ayuda con amabilidad.",
            "examples": [
                {
                    "chunks": [
                        "Please",
                        "draw",
                        "a cat."
                    ],
                    "text": "Please draw a cat.",
                    "meaning": "Por favor, dibuja un gato."
                },
                {
                    "chunks": [
                        "Can you",
                        "repeat",
                        "the rules?"
                    ],
                    "text": "Can you repeat the rules?",
                    "meaning": "¿Puedes repetir las reglas?"
                },
                {
                    "chunks": [
                        "First,",
                        "open",
                        "your map."
                    ],
                    "text": "First, open your map.",
                    "meaning": "Primero, abre tu mapa."
                }
            ]
        },
        {
            "mission": "Cuenta una rutina de cuidado usando first y then.",
            "examples": [
                {
                    "chunks": [
                        "First,",
                        "I feed",
                        "my dog."
                    ],
                    "text": "First, I feed my dog.",
                    "meaning": "Primero alimento a mi perro."
                },
                {
                    "chunks": [
                        "Then",
                        "I play",
                        "basketball."
                    ],
                    "text": "Then I play basketball.",
                    "meaning": "Después juego baloncesto."
                },
                {
                    "chunks": [
                        "At seven,",
                        "I pack",
                        "my bag."
                    ],
                    "text": "At seven, I pack my bag.",
                    "meaning": "A las siete empaco mi bolso."
                }
            ]
        },
        {
            "mission": "Expresa con qué frecuencia ocurre una acción.",
            "examples": [
                {
                    "chunks": [
                        "I always",
                        "feed",
                        "my cat."
                    ],
                    "text": "I always feed my cat.",
                    "meaning": "Siempre alimento a mi gato."
                },
                {
                    "chunks": [
                        "I sometimes",
                        "play",
                        "tennis."
                    ],
                    "text": "I sometimes play tennis.",
                    "meaning": "A veces juego tenis."
                },
                {
                    "chunks": [
                        "I never",
                        "leave",
                        "my map behind."
                    ],
                    "text": "I never leave my map behind.",
                    "meaning": "Nunca dejo atrás mi mapa."
                }
            ]
        },
        {
            "mission": "Cuenta lo que le gusta y no le gusta a un personaje.",
            "examples": [
                {
                    "chunks": [
                        "I like",
                        "drawing",
                        "animals."
                    ],
                    "text": "I like drawing animals.",
                    "meaning": "Me gusta dibujar animales."
                },
                {
                    "chunks": [
                        "I do not like",
                        "playing",
                        "football."
                    ],
                    "text": "I do not like playing football.",
                    "meaning": "No me gusta jugar fútbol."
                },
                {
                    "chunks": [
                        "Do you like",
                        "exploring",
                        "new places?"
                    ],
                    "text": "Do you like exploring new places?",
                    "meaning": "¿Te gusta explorar lugares nuevos?"
                }
            ]
        },
        {
            "mission": "Propón acciones para ahorrar energía.",
            "examples": [
                {
                    "chunks": [
                        "Turn off",
                        "the light",
                        "near the fish tank."
                    ],
                    "text": "Turn off the light near the fish tank.",
                    "meaning": "Apaga la luz cerca de la pecera."
                },
                {
                    "chunks": [
                        "Use",
                        "daylight",
                        "in the sports hall."
                    ],
                    "text": "Use daylight in the sports hall.",
                    "meaning": "Usa luz natural en el salón deportivo."
                },
                {
                    "chunks": [
                        "Do not leave",
                        "the camp light",
                        "on."
                    ],
                    "text": "Do not leave the camp light on.",
                    "meaning": "No dejes encendida la luz del campamento."
                }
            ]
        },
        {
            "mission": "Describe objetos y dónde están.",
            "examples": [
                {
                    "chunks": [
                        "There is",
                        "a cat",
                        "under the chair."
                    ],
                    "text": "There is a cat under the chair.",
                    "meaning": "Hay un gato debajo de la silla."
                },
                {
                    "chunks": [
                        "There are",
                        "two balls",
                        "next to the door."
                    ],
                    "text": "There are two balls next to the door.",
                    "meaning": "Hay dos balones junto a la puerta."
                },
                {
                    "chunks": [
                        "The map",
                        "is",
                        "on the desk."
                    ],
                    "text": "The map is on the desk.",
                    "meaning": "El mapa está sobre el escritorio."
                }
            ]
        },
        {
            "mission": "Propón algo que un grupo puede hacer para ahorrar.",
            "examples": [
                {
                    "chunks": [
                        "We can",
                        "turn off",
                        "the animal shelter lights."
                    ],
                    "text": "We can turn off the animal shelter lights.",
                    "meaning": "Podemos apagar las luces del refugio de animales."
                },
                {
                    "chunks": [
                        "We can",
                        "use daylight",
                        "in the gym."
                    ],
                    "text": "We can use daylight in the gym.",
                    "meaning": "Podemos usar luz natural en el gimnasio."
                },
                {
                    "chunks": [
                        "Can we",
                        "reuse",
                        "our reminder cards?"
                    ],
                    "text": "Can we reuse our reminder cards?",
                    "meaning": "¿Podemos reutilizar nuestras tarjetas de recordatorio?"
                }
            ]
        },
        {
            "mission": "Describe un lugar colombiano respetando su diversidad.",
            "examples": [
                {
                    "chunks": [
                        "There are",
                        "different animals",
                        "in Colombia."
                    ],
                    "text": "There are different animals in Colombia.",
                    "meaning": "Hay diferentes animales en Colombia."
                },
                {
                    "chunks": [
                        "Some students",
                        "enjoy",
                        "football."
                    ],
                    "text": "Some students enjoy football.",
                    "meaning": "A algunos estudiantes les gusta el fútbol."
                },
                {
                    "chunks": [
                        "I am",
                        "from",
                        "Villavicencio."
                    ],
                    "text": "I am from Villavicencio.",
                    "meaning": "Soy de Villavicencio."
                }
            ]
        },
        {
            "mission": "Describe dónde ocurre una celebración y qué se hace.",
            "examples": [
                {
                    "chunks": [
                        "Some families",
                        "share",
                        "animal stories."
                    ],
                    "text": "Some families share animal stories.",
                    "meaning": "Algunas familias comparten historias de animales."
                },
                {
                    "chunks": [
                        "The sports celebration",
                        "is",
                        "in our school."
                    ],
                    "text": "The sports celebration is in our school.",
                    "meaning": "La celebración deportiva es en nuestra escuela."
                },
                {
                    "chunks": [
                        "There is",
                        "a festival",
                        "in the town."
                    ],
                    "text": "There is a festival in the town.",
                    "meaning": "Hay un festival en el pueblo."
                }
            ]
        },
        {
            "mission": "Escribe una postal conectando ideas con and y but.",
            "examples": [
                {
                    "chunks": [
                        "I see dogs",
                        "and",
                        "colourful birds."
                    ],
                    "text": "I see dogs and colourful birds.",
                    "meaning": "Veo perros y aves coloridas."
                },
                {
                    "chunks": [
                        "Some people play football,",
                        "but",
                        "others dance."
                    ],
                    "text": "Some people play football, but others dance.",
                    "meaning": "Algunas personas juegan fútbol, pero otras bailan."
                },
                {
                    "chunks": [
                        "The town is small",
                        "and",
                        "beautiful."
                    ],
                    "text": "The town is small and beautiful.",
                    "meaning": "El pueblo es pequeño y hermoso."
                }
            ]
        }
    ],
    "7": [
        {
            "mission": "Planea una semana con estudio, descanso y una actividad que disfrutes.",
            "examples": [
                {
                    "chunks": [
                        "I usually",
                        "walk",
                        "with my dog."
                    ],
                    "text": "I usually walk with my dog.",
                    "meaning": "Normalmente camino con mi perro."
                },
                {
                    "chunks": [
                        "I am going to",
                        "play",
                        "basketball on Friday."
                    ],
                    "text": "I am going to play basketball on Friday.",
                    "meaning": "Voy a jugar baloncesto el viernes."
                },
                {
                    "chunks": [
                        "This week,",
                        "I am going to",
                        "explore a virtual museum."
                    ],
                    "text": "This week, I am going to explore a virtual museum.",
                    "meaning": "Esta semana voy a explorar un museo virtual."
                }
            ]
        },
        {
            "mission": "Describe una emoción y pide apoyo.",
            "examples": [
                {
                    "chunks": [
                        "I feel happy",
                        "because",
                        "my dog is home."
                    ],
                    "text": "I feel happy because my dog is home.",
                    "meaning": "Me siento feliz porque mi perro está en casa."
                },
                {
                    "chunks": [
                        "Can you",
                        "help me",
                        "practise for the game?"
                    ],
                    "text": "Can you help me practise for the game?",
                    "meaning": "¿Puedes ayudarme a practicar para el juego?"
                },
                {
                    "chunks": [
                        "She feels nervous",
                        "because",
                        "the trip is new."
                    ],
                    "text": "She feels nervous because the trip is new.",
                    "meaning": "Ella se siente nerviosa porque el viaje es nuevo."
                }
            ]
        },
        {
            "mission": "Propón tres acciones que un personaje pueda realizar.",
            "examples": [
                {
                    "chunks": [
                        "I am going to",
                        "feed",
                        "my cat on Monday."
                    ],
                    "text": "I am going to feed my cat on Monday.",
                    "meaning": "Voy a alimentar a mi gato el lunes."
                },
                {
                    "chunks": [
                        "We are going to",
                        "practise",
                        "on Tuesday."
                    ],
                    "text": "We are going to practise on Tuesday.",
                    "meaning": "Vamos a practicar el martes."
                },
                {
                    "chunks": [
                        "We can change",
                        "the plan",
                        "if it is too difficult."
                    ],
                    "text": "We can change the plan if it is too difficult.",
                    "meaning": "Podemos cambiar el plan si es demasiado difícil."
                }
            ]
        },
        {
            "mission": "Da recomendaciones para incluir a un estudiante nuevo.",
            "examples": [
                {
                    "chunks": [
                        "We should",
                        "invite her",
                        "to draw animals."
                    ],
                    "text": "We should invite her to draw animals.",
                    "meaning": "Deberíamos invitarla a dibujar animales."
                },
                {
                    "chunks": [
                        "We should not",
                        "laugh at",
                        "a new player."
                    ],
                    "text": "We should not laugh at a new player.",
                    "meaning": "No deberíamos reírnos de un jugador nuevo."
                },
                {
                    "chunks": [
                        "We should",
                        "share the map",
                        "because everyone belongs."
                    ],
                    "text": "We should share the map because everyone belongs.",
                    "meaning": "Deberíamos compartir el mapa porque todos pertenecemos al grupo."
                }
            ]
        },
        {
            "mission": "Distingue una regla de una recomendación.",
            "examples": [
                {
                    "chunks": [
                        "We must",
                        "return",
                        "the animal books."
                    ],
                    "text": "We must return the animal books.",
                    "meaning": "Debemos devolver los libros de animales."
                },
                {
                    "chunks": [
                        "We should",
                        "choose",
                        "a sport we enjoy."
                    ],
                    "text": "We should choose a sport we enjoy.",
                    "meaning": "Deberíamos escoger un deporte que disfrutemos."
                },
                {
                    "chunks": [
                        "We must not",
                        "damage",
                        "the museum objects."
                    ],
                    "text": "We must not damage the museum objects.",
                    "meaning": "No debemos dañar los objetos del museo."
                }
            ]
        },
        {
            "mission": "Propón una solución amable a un desacuerdo.",
            "examples": [
                {
                    "chunks": [
                        "Let’s",
                        "take turns",
                        "drawing the animals."
                    ],
                    "text": "Let’s take turns drawing the animals.",
                    "meaning": "Turnémonos para dibujar los animales."
                },
                {
                    "chunks": [
                        "Can we",
                        "share",
                        "the ball?"
                    ],
                    "text": "Can we share the ball?",
                    "meaning": "¿Podemos compartir el balón?"
                },
                {
                    "chunks": [
                        "Let’s",
                        "choose",
                        "a route together."
                    ],
                    "text": "Let’s choose a route together.",
                    "meaning": "Escojamos juntos una ruta."
                }
            ]
        },
        {
            "mission": "Propón dos acciones ambientales y explica una razón.",
            "examples": [
                {
                    "chunks": [
                        "We should",
                        "protect",
                        "animal habitats."
                    ],
                    "text": "We should protect animal habitats.",
                    "meaning": "Deberíamos proteger los hábitats de los animales."
                },
                {
                    "chunks": [
                        "We can",
                        "use reusable bottles",
                        "at practice."
                    ],
                    "text": "We can use reusable bottles at practice.",
                    "meaning": "Podemos usar botellas reutilizables en la práctica."
                },
                {
                    "chunks": [
                        "First,",
                        "we collect",
                        "the paper."
                    ],
                    "text": "First, we collect the paper.",
                    "meaning": "Primero recogemos el papel."
                }
            ]
        },
        {
            "mission": "Compara dos objetos para decidir cómo usarlos.",
            "examples": [
                {
                    "chunks": [
                        "The dog bed",
                        "is bigger than",
                        "the cat bed."
                    ],
                    "text": "The dog bed is bigger than the cat bed.",
                    "meaning": "La cama del perro es más grande que la del gato."
                },
                {
                    "chunks": [
                        "The blue ball",
                        "is lighter than",
                        "the red ball."
                    ],
                    "text": "The blue ball is lighter than the red ball.",
                    "meaning": "El balón azul es más ligero que el rojo."
                },
                {
                    "chunks": [
                        "The green bag",
                        "is bigger than",
                        "the blue bag."
                    ],
                    "text": "The green bag is bigger than the blue bag.",
                    "meaning": "La bolsa verde es más grande que la azul."
                }
            ]
        },
        {
            "mission": "Comunica dos datos ficticios y una propuesta.",
            "examples": [
                {
                    "chunks": [
                        "In this fictional survey,",
                        "six students",
                        "care for pets."
                    ],
                    "text": "In this fictional survey, six students care for pets.",
                    "meaning": "En esta encuesta ficticia, seis estudiantes cuidan mascotas."
                },
                {
                    "chunks": [
                        "In this fictional survey,",
                        "four students",
                        "reuse their bottles."
                    ],
                    "text": "In this fictional survey, four students reuse their bottles.",
                    "meaning": "En esta encuesta ficticia, cuatro estudiantes reutilizan sus botellas."
                },
                {
                    "chunks": [
                        "We suggest",
                        "using both sides of paper",
                        "because it reduces waste."
                    ],
                    "text": "We suggest using both sides of paper because it reduces waste.",
                    "meaning": "Sugerimos usar ambos lados del papel porque reduce residuos."
                }
            ]
        },
        {
            "mission": "Cuenta un encuentro cultural pasado con respeto.",
            "examples": [
                {
                    "chunks": [
                        "Last Friday,",
                        "we shared",
                        "animal stories."
                    ],
                    "text": "Last Friday, we shared animal stories.",
                    "meaning": "El viernes pasado compartimos historias de animales."
                },
                {
                    "chunks": [
                        "The games",
                        "were different,",
                        "but both were interesting."
                    ],
                    "text": "The games were different, but both were interesting.",
                    "meaning": "Los juegos eran diferentes, pero ambos eran interesantes."
                },
                {
                    "chunks": [
                        "We learned",
                        "about celebrations",
                        "in different places."
                    ],
                    "text": "We learned about celebrations in different places.",
                    "meaning": "Aprendimos sobre celebraciones de diferentes lugares."
                }
            ]
        },
        {
            "mission": "Narra una visita ficticia usando acciones en pasado.",
            "examples": [
                {
                    "chunks": [
                        "We visited",
                        "a virtual",
                        "animal exhibition."
                    ],
                    "text": "We visited a virtual animal exhibition.",
                    "meaning": "Visitamos una exposición virtual de animales."
                },
                {
                    "chunks": [
                        "We watched",
                        "a presentation",
                        "about traditional games."
                    ],
                    "text": "We watched a presentation about traditional games.",
                    "meaning": "Vimos una presentación sobre juegos tradicionales."
                },
                {
                    "chunks": [
                        "We did not travel",
                        "to another",
                        "country."
                    ],
                    "text": "We did not travel to another country.",
                    "meaning": "No viajamos a otro país."
                }
            ]
        },
        {
            "mission": "Compara dos costumbres sin decir que una es superior.",
            "examples": [
                {
                    "chunks": [
                        "Both families",
                        "like animals,",
                        "but their routines are different."
                    ],
                    "text": "Both families like animals, but their routines are different.",
                    "meaning": "A ambas familias les gustan los animales, pero sus rutinas son diferentes."
                },
                {
                    "chunks": [
                        "Some students play football,",
                        "but",
                        "others enjoy swimming."
                    ],
                    "text": "Some students play football, but others enjoy swimming.",
                    "meaning": "Algunos estudiantes juegan fútbol, pero otros disfrutan nadar."
                },
                {
                    "chunks": [
                        "I would like to ask:",
                        "How do you",
                        "celebrate?"
                    ],
                    "text": "I would like to ask: How do you celebrate?",
                    "meaning": "Me gustaría preguntar: ¿Cómo celebras?"
                }
            ]
        }
    ]
};

function learningState() {
    if (!state.learning) state.learning = { steps: {}, interests: {} };
    if (!state.learning.steps) state.learning.steps = {};
    if (!state.learning.interests) state.learning.interests = {};
    return state.learning;
}
function topicSteps(topic) {
    const learning = learningState();
    if (!learning.steps[topic]) learning.steps[topic] = {};
    const steps = learning.steps[topic];
    // Recuperar evidencia ya guardada, sin suponer que se vio un video.
    if (state.done.includes(topic)) steps[2] = true;
    steps[3] = Boolean((state.drafts[topic] || "").trim());
    return steps;
}
function completeLearningStep(topic, number) {
    topicSteps(topic)[number] = true;
    save();
    updateLearningProgress(topic);
}
function learningProgressText(topic) {
    const steps = topicSteps(topic);
    return ["Lectura", "Video o alternativa", "Práctica", "Borrador"].map((name,n) => name + (steps[n] ? " ✓" : " pendiente")).join(" · ");
}
function updateLearningProgress(topic) {
    const steps = topicSteps(topic);
    const count = Object.values(steps).filter(Boolean).length;
    const status = document.getElementById("topicStepProgress");
    if (status) status.textContent = count + " de 4 pasos listos";
    document.querySelectorAll("[data-stage-button]").forEach(button => {
        const n = Number(button.dataset.stageButton);
        button.textContent = ["1 · Aprendo", "2 · Veo", "3 · Practico", "4 · Escribo"][n] + (steps[n] ? " ✓" : "");
    });
}
function continueLearningStep(topic, number) {
    completeLearningStep(topic, number);
    showStage(number + 1);
}
function interestsMarkup(topic) {
    const chosen = learningState().interests[topic];
    return `<details class="interest-panel"><summary>Un ejemplo sobre lo que te gusta</summary>
        <label for="interestChoice">Elige un tema</label>
        <select id="interestChoice" onchange="chooseInterest(${topic}, this.value)">
            <option value="">Elegir…</option>${["Animales", "Deportes", "Aventuras"].map((name,n) => `<option value="${n}" ${chosen === n ? "selected" : ""}>${name}</option>`).join("")}
        </select><div id="interestExample"></div></details>`;
}
function chooseInterest(topic, value) {
    const box = document.getElementById("interestExample");
    if (value === "") { delete learningState().interests[topic]; box.innerHTML = ""; save(); return; }
    const number = Number(value);
    if (![0,1,2].includes(number)) return;
    learningState().interests[topic] = number;
    const example = learningContent[grade][topic].examples[number];
    box.innerHTML = `<p class="reading" lang="en">${esc(example.text)}</p><p>${esc(example.meaning)}</p>
        <button onclick="listenInterest(${topic})">Escuchar ejemplo</button><p id="exampleAudioStatus" class="notice" role="status"></p>`;
    save();
}
function listenInterest(topic) {
    const chosen = learningState().interests[topic];
    if (Number.isInteger(chosen)) speech(learningContent[grade][topic].examples[chosen].text, "exampleAudioStatus");
}
function glossaryEntries(topic) {
    return lessons[topic].words.map(item => {
        const [term, ...meaning] = item.split("→");
        return { term: term.trim(), meaning: meaning.join("→").trim() };
    });
}
function readingMarkup(text, topic) {
    if (!Number.isInteger(topic) || !lessons[topic]) return esc(text);
    const entries = glossaryEntries(topic).map((word,index) => ({...word,index})).filter(word => word.meaning);
    const alternatives = entries.map(word => word.term).sort((a,b) => b.length-a.length).map(term => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (!alternatives.length) return esc(text);
    const pattern = new RegExp("(?<![A-Za-z])(" + alternatives.join("|") + ")(?![A-Za-z])", "gi");
    let html = "", last = 0;
    for (const match of text.matchAll(pattern)) {
        const entry = entries.find(word => word.term.toLowerCase() === match[0].toLowerCase());
        html += esc(text.slice(last, match.index));
        html += `<button class="vocab-word" onclick="openWord(${topic}, ${entry.index})" aria-label="Significado de ${esc(match[0])}" aria-haspopup="dialog">${esc(match[0])}</button>`;
        last = match.index + match[0].length;
    }
    return html + esc(text.slice(last));
}
function openWord(topic, index) {
    const word = glossaryEntries(topic)[index];
    if (!word) return;
    stopSpeech(false);
    document.getElementById("vocabTerm").textContent = word.term;
    document.getElementById("vocabMeaning").textContent = word.meaning;
    document.getElementById("vocabAudioStatus").textContent = "";
    document.getElementById("listenWord").onclick = () => speech(word.term, "vocabAudioStatus");
    const dialog = document.getElementById("vocabDialog");
    if (!dialog.open) dialog.showModal();
}
function closeWord() {
    stopSpeech(false);
    document.getElementById("vocabDialog").close();
}
function practiceHint(question) {
    const text = question.q.toLowerCase();
    if (/where|dónde/.test(text)) return "Busca from, in o el lugar mencionado en el texto.";
    if (/how many|cuánt/.test(text)) return "Localiza la cantidad o el número de personas u objetos.";
    if (/when|cuándo/.test(text)) return "Busca una hora, un día o una expresión de tiempo.";
    if (/why|por qué/.test(text)) return "Busca la razón: because suele introducirla.";
    if (/who|quién/.test(text)) return "Busca qué personaje realiza la acción o tiene esa característica.";
    if (/should|must|can|regla|recomenda/.test(text)) return "Revisa el verbo: can expresa posibilidad; should aconseja y must indica obligación.";
    const quoted = question.q.match(/[“"]([^”"]+)[”"]/);
    if (quoted) return "Busca «" + quoted[1] + "» en el ejemplo y consulta las palabras subrayadas.";
    return "Vuelve al texto de apoyo y busca la oración relacionada con la pregunta. Puedes tocar las palabras subrayadas.";
}
function startTopicPractice(topic, mode) {
    stopSpeech(false);
    const lesson = lessons[topic];
    document.getElementById("practiceChoice").hidden = true;
    const items = mode === "sentences" ? learningContent[grade][topic].examples : lesson.questions;
    session = { key: "practice" + topic, mode, lesson: topic, items: items.map(item => ({...item, context:lesson.text, topicTitle:lesson.title, contextTopic:topic})), index:0,score:0,attempts:0,records:[] };
    if (mode === "sentences") showSentencePractice();
    else showQuestion("practiceArea");
}
function showSentencePractice() {
    stopSpeech(false);
    session.selected = [];
    session.attempts = 0;
    session.accepted = false;
    const item = session.items[session.index];
    // Orden estable mezclado; las piezas no requieren arrastrar.
    session.tokenOrder = item.chunks.map((_,i) => i).reverse();
    document.getElementById("practiceArea").innerHTML = `<p class="eyebrow">Frase ${session.index+1} de ${session.items.length}</p>
        <h3>Construye esta idea en inglés</h3><p>${esc(item.meaning)}</p>
        <div id="sentenceAnswer" class="sentence-answer" aria-label="Tu oración"></div>
        <div id="sentenceTokens" class="sentence-tokens" aria-label="Piezas disponibles"></div>
        <button id="checkSentence" class="primary" onclick="checkSentence()" disabled>Comprobar</button>
        <div id="feedback" class="feedback" role="status"></div>
        <button id="nextQ" class="primary" hidden onclick="nextSentence()">Siguiente →</button>`;
    renderSentenceTokens();
}
function renderSentenceTokens() {
    const s = session, item = s.items[s.index];
    document.getElementById("sentenceAnswer").innerHTML = s.selected.length ? s.selected.map((token,index) => `<button ${s.accepted ? "disabled" : ""} onclick="removeSentenceToken(${index})" aria-label="Quitar ${esc(item.chunks[token])}">${esc(item.chunks[token])}</button>`).join(" ") : '<span class="notice">Toca las piezas en orden.</span>';
    document.getElementById("sentenceTokens").innerHTML = s.tokenOrder.map(token => `<button ${s.selected.includes(token) || s.accepted ? "disabled" : ""} onclick="addSentenceToken(${token})">${esc(item.chunks[token])}</button>`).join(" ");
    document.getElementById("checkSentence").disabled = s.accepted || s.selected.length !== item.chunks.length;
}
function addSentenceToken(token) {
    if (session.accepted || session.selected.includes(token)) return;
    session.selected.push(token); renderSentenceTokens();
}
function removeSentenceToken(index) {
    if (session.accepted) return;
    session.selected.splice(index,1); renderSentenceTokens();
}
function checkSentence() {
    const s = session, item = s.items[s.index];
    if (s.accepted || s.selected.length !== item.chunks.length) return;
    const correct = s.selected.every((token,index) => token === index);
    s.attempts++;
    if (s.attempts === 1) {
        if (correct) s.score++;
        s.records.push({question:item.text,correct,attempts:1});
    } else s.records[s.records.length-1].attempts = s.attempts;
    document.getElementById("feedback").textContent = correct ? "¡Bien! Construiste la oración." : "Pista: empieza por «" + item.chunks[0] + "». Toca una pieza de tu oración para cambiar su lugar.";
    if (correct) { s.accepted=true; document.getElementById("nextQ").hidden=false; }
    renderSentenceTokens();
}
function nextSentence() {
    if (!session.accepted) return;
    session.index++;
    if (session.index < session.items.length) showSentencePractice();
    else finish("practiceArea");
}
function resumeAfterPause() {
    if (activeSupportTopic === null) return;
    const topic = activeSupportTopic;
    const stage = supportSettings().stages[topic] || 0;
    let message = ["Estabas leyendo el ejemplo.","Estabas en el video. Puedes reproducirlo cuando quieras.","Estabas practicando.","Estabas escribiendo. Tu borrador se conserva."][stage];
    if (stage === 2 && session && session.lesson === topic && session.index < session.items.length) message = "Estabas en la actividad " + (session.index+1) + " de " + session.items.length + ". Continúa donde quedaste.";
    const notice = document.getElementById("resumeNotice");
    if (notice) { notice.textContent = message; notice.hidden = false; }
}
