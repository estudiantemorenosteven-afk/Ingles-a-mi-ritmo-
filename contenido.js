// CONTENIDOS POR GRADO
// Cada arreglo contiene cuatro temáticas. Las respuestas empiezan en la posición 0.
// Los textos y ejercicios son propios del OVA; los videos pertenecen a sus autores.
const SOURCE =
    "https://www.colombiaaprende.edu.co/sites/default/files/files_public/2022-06/Estandares_Basicos_Competencia_en_Lenguas_Extranjeras_%20Ingles-min.pdf";
const CURRICULUM =
    "https://eco.colombiaaprende.edu.co/wp-content/uploads/2021/09/Esquema-Curricular-Espa_RevMEN.pdf";
const videos = {
    identity: {
        id: "JFmLF_xOAog",
        title: "Self introduction",
        author: "EnglishClass101",
        focus: "Busca una forma de saludar y una forma de decir de dónde eres. Mira un tramo breve, pausa y repite una expresión.",
    },
    routine: {
        id: "rXme31-HVw0",
        title: "Talking about your daily routine",
        author: "EnglishClass101",
        focus: "Escucha verbos de actividades diarias. Mira un tramo breve y anota dos acciones que reconozcas.",
    },
    energy: {
        id: "1-g73ty9v04",
        title: "Energy, let’s save it!",
        author: "Campaña de ahorro de energía",
        focus: "Es un apoyo visual sin diálogo. Identifica una acción y descríbela en inglés: Turn off the lights. No necesitas ver el video completo.",
    },
    countries: {
        id: "ZwSmUux1ZSg",
        title: "Countries & Nationalities in English",
        author: "Woodward English",
        focus: "Identifica Colombia y otro país. Pausa y construye una oración con from y otra con una nacionalidad.",
    },
    advice: {
        id: "HHUWxPFAYO8",
        title: "Giving advice: should / shouldn’t",
        author: "EnglishClass101",
        focus: "Este recurso es una lección extensa. Mira solo un tramo de 2–3 minutos con ayuda del docente; busca una recomendación con should.",
    },
    environment: {
        id: "hX8XTOR-WV8",
        title: "Cutting down on waste",
        author: "British Council · LearnEnglish Teens",
        source: "https://learnenglishteens.britishcouncil.org/study-break/youtubers/cutting-down-waste",
        focus: "Reto con acompañamiento: reconoce reduce, reuse y recycle. Usa subtítulos o la transcripción del autor; no necesitas entender cada palabra.",
    },
};
const courses = {
    6: {
        name: "Sexto",
        subtitle: "Me conozco y descubro mi entorno",
        themes: [
            {
                title: "This is me",
                tag: "IDENTIDAD Y VIDA EN EL AULA",
                desc: "Preséntate, describe tu familia y comprende instrucciones.",
                goal: "Presentarte y reconocer información personal e instrucciones escolares en textos breves.",
                standard:
                    "Comprensión de mensajes del entorno e intercambio de información personal.",
                grammar:
                    "Verbo to be, pronombres personales, posesivos e imperativos.",
                explanation:
                    "Usa I am para presentarte y my para indicar pertenencia. Las instrucciones pueden comenzar directamente con un verbo: Open, listen, write. Ejemplo: My name is Ana. I am Colombian. Open your notebook.",
                text: "Hello! My name is Ana. I am twelve years old and I am from Villavicencio. My brother is Luis. We are students. In English class, our teacher says: Open your notebook, write the date and work with a partner.",
                words: [
                    "I am → yo soy / estoy",
                    "My → mi",
                    "Brother → hermano",
                    "Write → escribe",
                    "Partner → compañero",
                ],
                video: "identity",
                prompt: "Preséntate con un nombre ficticio. Incluye edad, procedencia y una persona de tu familia. Agrega una instrucción para el aula.",
                model: "My name is… I am… I am from… My… is… Open…",
                questions: [
                    {
                        q: "Where is Ana from?",
                        options: ["Villavicencio", "London", "Bogotá"],
                        answer: 0,
                        why: "Ana indica que es de Villavicencio.",
                    },
                    {
                        q: "“Work with a partner” pide…",
                        options: [
                            "Cerrar el libro",
                            "Trabajar con un compañero",
                            "Salir del salón",
                        ],
                        answer: 1,
                        why: "Partner es compañero o compañera.",
                    },
                    {
                        q: "Completa: My brother ___ Luis.",
                        options: ["are", "am", "is"],
                        answer: 2,
                        why: "Con my brother, que equivale a he, usamos is.",
                    },
                ],
            },
            {
                title: "My daily care",
                tag: "RUTINAS Y CUIDADO PERSONAL",
                desc: "Habla de tus horarios y hábitos cotidianos.",
                goal: "Comprender una rutina y describir acciones de cuidado personal con expresiones de tiempo.",
                standard:
                    "Lectura de textos cotidianos y descripción sencilla de rutinas.",
                grammar: "Presente simple, horas y conectores first / then.",
                explanation:
                    "Para contar tu rutina usa I + verbo. Para una hora concreta usa at. First y then muestran el orden: First, I brush my teeth. Then I have breakfast at six.",
                text: "On weekdays, I get up at six. First, I brush my teeth and wash my face. Then I have breakfast at half past six. I go to school at seven. After school, I do my homework and play basketball. At night, I get ready for bed.",
                words: [
                    "Get up → levantarse",
                    "Brush my teeth → cepillarme los dientes",
                    "Half past six → seis y media",
                    "Then → después",
                    "At night → por la noche",
                ],
                video: "routine",
                prompt: "Escribe una rutina de cuidado personal con tres acciones y al menos una hora. Utiliza first y then.",
                model: "First, I… at… Then I… At night, I…",
                questions: [
                    {
                        q: "What happens before breakfast?",
                        options: [
                            "Going to school",
                            "Brushing teeth",
                            "Playing basketball",
                        ],
                        answer: 1,
                        why: "El texto ubica el cepillado antes del desayuno.",
                    },
                    {
                        q: "What time is breakfast?",
                        options: ["At six", "At seven", "At half past six"],
                        answer: 2,
                        why: "Half past six corresponde a las 6:30.",
                    },
                    {
                        q: "Completa: I ___ my face every morning.",
                        options: ["wash", "washes", "is"],
                        answer: 0,
                        why: "Con I se usa la forma wash.",
                    },
                ],
            },
            {
                title: "Small actions, less energy",
                tag: "AHORRO DE ENERGÍA",
                desc: "Describe acciones para cuidar los recursos de tu entorno.",
                goal: "Reconocer y formular instrucciones sencillas para ahorrar energía.",
                standard:
                    "Comprensión de instrucciones y descripción de acciones del entorno.",
                grammar:
                    "Imperativos afirmativos y negativos; can para posibilidades.",
                explanation:
                    "Para dar una instrucción usa el verbo: Turn off the lights. Para indicar que algo no se debe hacer, usa Don’t + verbo: Don’t leave the TV on. Can expresa una posibilidad: We can save energy.",
                text: "Our class has an energy plan. Turn off the lights when you leave an empty room. Open the curtains to use daylight. Don’t leave the television on when nobody is watching. We can save energy at school and at home.",
                words: [
                    "Turn off → apaga",
                    "Lights → luces",
                    "Curtains → cortinas",
                    "Daylight → luz natural",
                    "Save energy → ahorrar energía",
                ],
                video: "energy",
                prompt: "Escribe tres acciones para ahorrar energía en un salón o en una casa imaginarios. Incluye una instrucción negativa.",
                model: "Turn off… Open… Don’t leave… We can…",
                questions: [
                    {
                        q: "What can you open to use daylight?",
                        options: ["The curtains", "The television", "A notebook"],
                        answer: 0,
                        why: "Abrir las cortinas permite aprovechar la luz natural.",
                    },
                    {
                        q: "Elige una instrucción negativa correcta.",
                        options: [
                            "No leaves the TV",
                            "Don’t leave the TV on",
                            "Doesn’t TV on",
                        ],
                        answer: 1,
                        why: "Don’t + verbo permite dar una instrucción negativa.",
                    },
                    {
                        q: "¿Cuál es la idea principal del texto?",
                        options: [
                            "Comprar un televisor",
                            "Describir una familia",
                            "Ahorrar energía con acciones cotidianas",
                        ],
                        answer: 2,
                        why: "El plan reúne acciones para ahorrar energía.",
                    },
                ],
            },
            {
                title: "Our Colombian identities",
                tag: "CULTURA E IDENTIDAD COLOMBIANA",
                desc: "Describe lugares, nacionalidades y diversidad cultural.",
                goal: "Describir rasgos de un entorno colombiano sin generalizar las costumbres de todas las personas.",
                standard:
                    "Descripción de lugares y reconocimiento de información cultural en textos.",
                grammar: "To be + from, nacionalidades, there is / there are y and.",
                explanation:
                    "Usa from + país para hablar de procedencia: I am from Colombia. Usa una nacionalidad para describirla: I am Colombian. There is se usa para un elemento; there are, para varios.",
                text: "I am from Colombia and I am Colombian. My friend lives in Villavicencio. There are different languages and traditions in Colombia. In our school, some students enjoy joropo and others prefer different music. We share our stories and respect our differences.",
                words: [
                    "Colombian → colombiano/a",
                    "Traditions → tradiciones",
                    "Some → algunos",
                    "There are → hay (plural)",
                    "Different → diferentes",
                ],
                video: "countries",
                prompt: "Describe un lugar de Colombia y una expresión cultural que conozcas. Evita afirmar que todas las personas tienen los mismos gustos.",
                model: "I am from… There is… There are… Some people…",
                questions: [
                    {
                        q: "Completa: I am from Colombia. I am ___.",
                        options: ["Colombia", "Colombian", "Colombians"],
                        answer: 1,
                        why: "Colombian es la nacionalidad; Colombia es el país.",
                    },
                    {
                        q: "Según el texto, ¿todos prefieren la misma música?",
                        options: [
                            "Sí",
                            "El texto no habla de música",
                            "No, hay gustos diferentes",
                        ],
                        answer: 2,
                        why: "El texto reconoce preferencias distintas.",
                    },
                    {
                        q: "Completa: There ___ different traditions.",
                        options: ["are", "is", "am"],
                        answer: 0,
                        why: "Traditions es plural, por eso usamos are.",
                    },
                ],
            },
        ],
    },
    7: {
        name: "Séptimo",
        subtitle: "Me cuido, convivo y participo en mi comunidad",
        themes: [
            {
                title: "A balanced week",
                tag: "CUIDADO PERSONAL INTEGRAL",
                desc: "Relaciona hábitos, emociones y planes de cuidado.",
                goal: "Comprender hábitos y proponer un plan sencillo de cuidado integral.",
                standard:
                    "Comprensión de textos cotidianos y expresión de rutinas y planes.",
                grammar: "Presente simple, adverbios de frecuencia y going to.",
                explanation:
                    "Always, usually y sometimes expresan frecuencia y suelen ir antes del verbo principal. Going to + verbo expresa un plan: I am going to read. Incluye actividades que disfrutes y adapta el plan a tu contexto.",
                text: "Daniel usually walks after school. He sometimes feels worried before a test, so he talks to a trusted adult. He enjoys drawing and spending time with friends. This week, he is going to organise his homework and take short breaks. His plan includes time to learn, rest and connect with others.",
                words: [
                    "Usually → normalmente",
                    "Sometimes → a veces",
                    "Worried → preocupado",
                    "Trusted adult → adulto de confianza",
                    "Going to → plan de acción futura",
                ],
                video: "routine",
                prompt: "Diseña un plan semanal ficticio con hábitos, descanso y una actividad social o creativa. Usa un adverbio de frecuencia y going to.",
                model: "I usually… I sometimes… This week, I am going to…",
                questions: [
                    {
                        q: "What does Daniel do when he feels worried?",
                        options: [
                            "He stops talking to everyone",
                            "He talks to a trusted adult",
                            "He throws away his books",
                        ],
                        answer: 1,
                        why: "El texto dice que conversa con un adulto de confianza.",
                    },
                    {
                        q: "Which sentence describes a plan?",
                        options: [
                            "He usually walks",
                            "He enjoys drawing",
                            "He is going to organise his homework",
                        ],
                        answer: 2,
                        why: "Is going to introduce un plan futuro.",
                    },
                    {
                        q: "¿Qué expresa usually?",
                        options: ["Frecuencia", "Un país", "Un objeto"],
                        answer: 0,
                        why: "Usually indica que una acción ocurre normalmente.",
                    },
                ],
            },
            {
                title: "Everyone belongs",
                tag: "CONVIVENCIA E INCLUSIÓN",
                desc: "Da recomendaciones y responde con respeto.",
                goal: "Proponer acciones de convivencia y justificar recomendaciones sencillas.",
                standard:
                    "Participación en intercambios cotidianos y escritura de mensajes breves.",
                grammar: "Should / shouldn’t y because para justificar.",
                explanation:
                    "Should + verbo sirve para recomendar: We should listen. Shouldn’t + verbo sirve para aconsejar evitar una acción: We shouldn’t laugh at mistakes. Because ayuda a explicar el motivo.",
                text: "A new student joins our group. We should invite her to participate and ask how she wants to help. We shouldn’t laugh at mistakes because everyone is learning. If we disagree, we can listen and take turns. Our class agrees to use respectful words and offer help.",
                words: [
                    "Should → debería",
                    "Shouldn’t → no debería",
                    "Take turns → tomar turnos",
                    "Disagree → estar en desacuerdo",
                    "Offer help → ofrecer ayuda",
                ],
                video: "advice",
                prompt: "Escribe tres recomendaciones para que un estudiante nuevo se sienta incluido. Justifica una de ellas con because.",
                model: "We should… We shouldn’t… because…",
                questions: [
                    {
                        q: "What should the group do?",
                        options: [
                            "Ignore the new student",
                            "Laugh at mistakes",
                            "Invite her to participate",
                        ],
                        answer: 2,
                        why: "El texto propone invitar a la estudiante a participar.",
                    },
                    {
                        q: "Completa: We should ___ to others.",
                        options: ["listen", "listens", "listening"],
                        answer: 0,
                        why: "Después de should se usa el verbo en su forma base.",
                    },
                    {
                        q: "¿Qué palabra introduce una razón?",
                        options: ["Under", "Because", "Seven"],
                        answer: 1,
                        why: "Because permite explicar por qué se recomienda una acción.",
                    },
                ],
            },
            {
                title: "Our greener community",
                tag: "CONSERVACIÓN DEL AMBIENTE",
                desc: "Propón y explica acciones para tu comunidad.",
                goal: "Extraer información de un plan ambiental y formular propuestas con razones.",
                standard:
                    "Lectura de información específica y producción de mensajes sobre el entorno.",
                grammar:
                    "Can / should, conectores and / because y vocabulario ambiental.",
                explanation:
                    "Can permite proponer posibilidades; should, recomendaciones. Conecta una propuesta con una razón: We can reuse paper because it reduces waste. Reuse es volver a usar; recycle es transformar residuos en nuevos materiales.",
                text: "Our school wants to reduce waste. Students can bring reusable bottles and use both sides of paper. We should separate recyclable materials according to local collection rules. We can organise a clean-up day because shared spaces belong to everyone. First, we make a plan. Then we invite our neighbours.",
                words: [
                    "Reduce → reducir",
                    "Reuse → reutilizar",
                    "Recycle → reciclar",
                    "Waste → residuos",
                    "Both sides → ambos lados",
                ],
                video: "environment",
                prompt: "Propón un pequeño plan ambiental con dos acciones, una razón y un orden de pasos. No incluyas datos personales.",
                model: "We can… We should… because… First… Then…",
                questions: [
                    {
                        q: "How can students use less paper?",
                        options: [
                            "Use both sides",
                            "Throw unused paper away",
                            "Use only one side",
                        ],
                        answer: 0,
                        why: "El texto propone aprovechar ambos lados del papel.",
                    },
                    {
                        q: "What happens after making a plan?",
                        options: [
                            "They cancel the activity",
                            "They invite their neighbours",
                            "They buy a television",
                        ],
                        answer: 1,
                        why: "Then introduce la invitación a los vecinos después de planear.",
                    },
                    {
                        q: "Reutilizar significa…",
                        options: [
                            "Siempre comprar algo nuevo",
                            "Mezclar todos los residuos",
                            "Volver a usar un objeto",
                        ],
                        answer: 2,
                        why: "Reuse significa usar un objeto nuevamente.",
                    },
                ],
            },
            {
                title: "Cultures in conversation",
                tag: "CULTURAS INTERNACIONALES",
                desc: "Compara costumbres y relata una experiencia breve.",
                goal: "Reconocer información cultural, comparar rasgos y describir un evento pasado sencillo.",
                standard:
                    "Comprensión de textos culturales, comparación y narración de hechos familiares.",
                grammar: "Pasado simple introductorio, was / were, and / but.",
                explanation:
                    "Para un hecho terminado puedes usar pasado: visited, learned o shared. Was y were son formas pasadas de to be. But expresa contraste. Evita atribuir una única costumbre a todas las personas de un país.",
                text: "Last Friday, our class held a culture day. Sara presented Colombia and Ken presented Japan. They shared stories about celebrations and everyday life. Some families celebrate in different ways, even in the same country. The presentations were different, but both were interesting. We learned to ask questions instead of making assumptions.",
                words: [
                    "Last Friday → el viernes pasado",
                    "Shared → compartieron",
                    "Were → eran / fueron",
                    "But → pero",
                    "Assumptions → suposiciones",
                ],
                video: "countries",
                prompt: "Relata un encuentro cultural real o imaginario. Incluye cuándo ocurrió, dos acciones pasadas y una comparación respetuosa.",
                model: "Last… we… We learned… The… were… but…",
                questions: [
                    {
                        q: "When was the culture day?",
                        options: ["Tomorrow", "Every Monday", "Last Friday"],
                        answer: 2,
                        why: "Last Friday ubica la experiencia en el pasado.",
                    },
                    {
                        q: "Completa: The presentations ___ interesting.",
                        options: ["were", "was", "am"],
                        answer: 0,
                        why: "Presentations es plural; en pasado usamos were.",
                    },
                    {
                        q: "¿Qué aprendieron los estudiantes?",
                        options: [
                            "Que todos tienen las mismas costumbres",
                            "A preguntar en vez de hacer suposiciones",
                            "A ignorar otras culturas",
                        ],
                        answer: 1,
                        why: "El cierre invita a preguntar y reconocer la diversidad cultural.",
                    },
                ],
            },
        ],
    },
};
// Preguntas específicas para cada grado. No se certifica un nivel con este resultado.
const diagnostics = {
    6: [
        {
            q: "Completa: My name ___ Ana.",
            options: ["is", "are", "am"],
            answer: 0,
            why: "Con my name usamos is.",
        },
        {
            q: "“First I wash my face. Then I eat.” ¿Qué ocurre primero?",
            options: ["Comer", "Lavarse la cara", "Dormir"],
            answer: 1,
            why: "First indica la primera acción.",
        },
        {
            q: "“Turn off the lights” significa…",
            options: ["Compra un libro", "Abre la puerta", "Apaga las luces"],
            answer: 2,
            why: "Turn off significa apagar.",
        },
        {
            q: "¿Cuál es una nacionalidad?",
            options: ["Colombian", "Colombia", "Bogotá"],
            answer: 0,
            why: "Colombian es una nacionalidad.",
        },
    ],
    7: [
        {
            q: "“Sometimes” expresa…",
            options: ["Un lugar", "Frecuencia", "Una edad"],
            answer: 1,
            why: "Sometimes significa a veces.",
        },
        {
            q: "Completa: We should ___ kind.",
            options: ["are", "is", "be"],
            answer: 2,
            why: "Should va seguido de un verbo en forma base.",
        },
        {
            q: "¿Qué significa reuse?",
            options: ["Volver a usar", "Siempre desechar", "Comprar más"],
            answer: 0,
            why: "Reuse significa reutilizar.",
        },
        {
            q: "“Last week” ubica una acción en…",
            options: ["El futuro", "El pasado", "El presente"],
            answer: 1,
            why: "Last week significa la semana pasada.",
        },
    ],
};
// La evaluación final combina dos preguntas por temática del grado elegido.
const assessments = {};
for (const gradeNumber of [6, 7]) {
    assessments[gradeNumber] = [];
    for (const theme of courses[gradeNumber].themes) {
        assessments[gradeNumber].push(theme.questions[0], theme.questions[2]);
    }
}
let lessons = [];
let pre = [];
let finalQuestions = [];
