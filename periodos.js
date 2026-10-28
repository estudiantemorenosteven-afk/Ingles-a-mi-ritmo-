// ORGANIZACIÓN ANUAL DEL OVA
// Los cuatro periodos y sus tres temas son una propuesta, no el plan oficial del colegio.
// Se conservan los temas anteriores y se amplían con actividades nuevas.

// Recursos con una tarea breve. start y end limitan el fragmento recomendado.
videos.identity = {
    id: "Ln5qotRMJvI",
    title: "Meeting people · un encuentro en el colegio",
    author: "British Council · LearnEnglish Teens",
    source: "https://learnenglishteens.britishcouncil.org/skills/speaking/a1-speaking/meeting-people",
    start: 0,
    end: 100,
    level: "A1 · diálogo acompañado",
    reason: "Situación escolar, interlocutoras visibles, repetición guiada y transcripción del autor.",
    focus: "Antes: piensa cómo saludarías. Durante: escucha cómo preguntan el nombre. Después: practica un saludo con un personaje imaginario.",
};
videos.routine = {
    id: "FWJRwasIWnM",
    title: "Present simple · acciones habituales",
    author: "British Council · LearnEnglish Teens",
    source: "https://learnenglishteens.britishcouncil.org/grammar/a1-a2-grammar/present-simple",
    start: 0,
    end: 120,
    level: "A1–A2 · con apoyo escrito",
    reason: "Diálogo contextualizado y ejemplos resaltados; la página del autor ofrece explicación y transcripción.",
    focus: "Antes: lee I play y she plays. Durante: reconoce una actividad repetida. Después: escribe una acción de tu rutina. No necesitas comprender cada palabra.",
};
videos.advice.start = 0;
videos.advice.end = 120;
videos.advice.level = "Apoyo gramatical · fragmento acompañado";
videos.advice.reason =
    "Se utiliza solo un fragmento de introducción a should, acompañado por los ejemplos breves del OVA. El video completo no es una tarea obligatoria.";
videos.advice.focus =
    "Durante el fragmento busca should y should not. Luego pausa y formula una recomendación. Si el vocabulario resulta difícil, utiliza primero la explicación en español del OVA.";
videos.energy.start = 0;
videos.energy.end = 120;
videos.energy.level = "Apoyo visual sin diálogo";
videos.energy.reason =
    "Acciones visibles para describir con el vocabulario trabajado; no se usa para evaluar escucha.";
videos.countries.start = 0;
videos.countries.end = 120;
videos.countries.level = "Repaso léxico con apoyo docente";
videos.countries.reason =
    "Vincula nombres de países y nacionalidades con representaciones visuales. Se trabaja una selección, no la lista completa.";
videos.countries.focus =
    "Escoge solo dos parejas país–nacionalidad del fragmento. Pausa para repetirlas. Después escribe I am from… y He / She is… con datos ficticios.";
videos.environment.start = 0;
videos.environment.end = 105;
videos.environment.level = "Ampliación acompañada · lenguaje más exigente";
videos.environment.reason =
    "Conserva una tarea de reconocimiento de tres palabras, con transcripción del autor. Es una ampliación opcional; no un requisito para resolver la práctica.";
videos.comparison = {
    id: "Qndfbk6_KSQ",
    title: "Comparatives and superlatives · comparar ideas",
    author: "British Council · English",
    start: 0,
    end: 120,
    level: "A2 · introducción acompañada",
    source: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/comparative-superlative-adjectives",
    reason: "Explicación centrada en una estructura; se combina con dos modelos escritos del OVA.",
    focus: "Lee primero small → smaller y big → bigger. Observa el fragmento y pausa cuando reconozcas una comparación. Después compara dos objetos, no personas.",
};

function newTopic(
    title,
    tag,
    goal,
    grammar,
    explanation,
    text,
    words,
    video,
    prompt,
    model,
    questions,
) {
    return {
        title,
        tag,
        desc: goal,
        goal,
        grammar,
        explanation,
        text,
        words,
        video,
        prompt,
        model,
        standard:
            "Comprender información de textos breves y expresar ideas sobre situaciones conocidas.",
        questions,
    };
}
function question(q, options, answer, why) {
    return { q, options, answer, why };
}
const oldSix = courses[6].themes.slice();
const oldSeven = courses[7].themes.slice();
courses[6].periods = [
    {
        name: "Me conozco y participo",
        axis: "Democracia y paz · convivencia en el aula",
        project:
            "Crea una ficha de un personaje ficticio y un pequeño diálogo para darle la bienvenida al aula.",
        topics: [
            oldSix[0],
            newTopic(
                "People around me",
                "FAMILIA Y DESCRIPCIONES",
                "Describir personas y relaciones cercanas con frases sencillas.",
                "To be, have / has y posesivos.",
                "Usa my, his y her para señalar relaciones. Con I usamos have; con he o she, has. Puedes describir una familia real o inventada sin compartir datos privados.",
                "This is my friend Mia. She has a sister and a brother. Her sister is creative and her brother is kind. Mia likes drawing. Our families are different, and we respect them. We do not need to look alike to belong.",
                [
                    "Her → su (de ella)",
                    "Has → tiene",
                    "Kind → amable",
                    "Creative → creativo/a",
                ],
                "identity",
                "Describe dos personajes y una relación familiar o de amistad. Incluye una cualidad de cada uno.",
                "This is… He / She has… His / Her… is…",
                [
                    question(
                        "What does Mia like?",
                        ["Drawing", "Swimming", "Cooking"],
                        0,
                        "El texto dice que Mia disfruta dibujar.",
                    ),
                    question(
                        "Completa: She ___ a sister.",
                        ["have", "has", "are"],
                        1,
                        "Con she usamos has.",
                    ),
                    question(
                        "¿Qué idea expresa el cierre?",
                        [
                            "Todas las familias son iguales",
                            "Debemos compartir datos privados",
                            "Podemos pertenecer aunque seamos diferentes",
                        ],
                        2,
                        "El cierre reconoce diferentes formas de pertenencia.",
                    ),
                ],
            ),
            newTopic(
                "Our classroom toolkit",
                "LENGUAJE DEL AULA",
                "Comprender y formular instrucciones para participar en clase.",
                "Imperativos y preguntas con can.",
                "Para dar una instrucción empieza por el verbo: Listen, read, write. Para pedir algo con amabilidad puedes usar Can I…? o Can you…?, y añadir please.",
                "Our English class starts with three steps. First, open your notebook. Then read the short text. Finally, share one idea with a partner. If you need help, ask: Can you repeat, please? You can also ask: Can I use a dictionary?",
                [
                    "Repeat → repetir",
                    "Share → compartir",
                    "Finally → finalmente",
                    "Dictionary → diccionario",
                ],
                "identity",
                "Escribe tres instrucciones y una pregunta amable para pedir ayuda en clase.",
                "First… Then… Finally… Can you… please?",
                [
                    question(
                        "What is the first step?",
                        ["Open your notebook", "Share an idea", "Close the door"],
                        0,
                        "La primera instrucción es abrir el cuaderno.",
                    ),
                    question(
                        "¿Cuál es una petición amable?",
                        ["You repeats", "Can you repeat, please?", "Repeat is"],
                        1,
                        "Can you… please? permite pedir apoyo.",
                    ),
                    question(
                        "What can students use?",
                        ["A television", "A bicycle", "A dictionary"],
                        2,
                        "El texto incluye una petición para usar un diccionario.",
                    ),
                ],
            ),
        ],
    },
    {
        name: "Mis rutinas de cuidado",
        axis: "Salud · rutina física",
        project:
            "Diseña una rutina ilustrada de un día ficticio, con horarios y actividades de cuidado.",
        topics: [
            oldSix[1],
            newTopic(
                "How often do you…?",
                "FRECUENCIA Y HÁBITOS",
                "Reconocer y expresar la frecuencia de acciones cotidianas.",
                "Always, usually, sometimes, never; preguntas con do.",
                "Los adverbios de frecuencia suelen ir antes del verbo principal: I usually read. Never ya expresa negación: I never… Para preguntar, usa Do you…?",
                "Sam usually walks to school with his aunt. He sometimes rides a bike in the park. After lunch, he always puts his notebook in his bag. He never leaves his books on the bus. Do you organise your bag before school?",
                [
                    "Always → siempre",
                    "Usually → normalmente",
                    "Sometimes → a veces",
                    "Never → nunca",
                ],
                "routine",
                "Cuenta cuatro hábitos de un personaje usando los cuatro adverbios.",
                "I always… I usually… I sometimes… I never…",
                [
                    question(
                        "Where does Sam sometimes ride a bike?",
                        ["In the park", "On the bus", "In the classroom"],
                        0,
                        "El texto sitúa la bicicleta en el parque.",
                    ),
                    question(
                        "Completa: I ___ read after school.",
                        ["is", "usually", "am"],
                        1,
                        "Usually se coloca antes del verbo read.",
                    ),
                    question(
                        "Never significa…",
                        ["A veces", "Normalmente", "Nunca"],
                        2,
                        "Never indica que una acción no ocurre.",
                    ),
                ],
            ),
            newTopic(
                "Things I enjoy",
                "GUSTOS Y ACTIVIDADES",
                "Expresar preferencias y formular preguntas sencillas sobre actividades.",
                "Like / don’t like y preguntas con do.",
                "Para una preferencia usa I like + sustantivo o una actividad terminada en -ing: I like drawing. Para negar usa I don’t like. Do you like…? sirve para preguntar.",
                "Lina likes dancing and drawing. She does not like competitive games, but she enjoys walking with friends. Her friend Omar likes football. They choose different activities and respect each other. An activity can be enjoyable without being a competition.",
                [
                    "Enjoy → disfrutar",
                    "Drawing → dibujar",
                    "Walking → caminar",
                    "Choose → escoger",
                ],
                "routine",
                "Describe dos actividades que disfruta un personaje y otra que no le gusta. Agrega una pregunta.",
                "I like… I don’t like… Do you like…?",
                [
                    question(
                        "What does Lina like?",
                        [
                            "Dancing and drawing",
                            "Only football",
                            "Competitive games",
                        ],
                        0,
                        "Lina disfruta bailar y dibujar.",
                    ),
                    question(
                        "Elige la pregunta correcta.",
                        [
                            "Does you likes art?",
                            "Do you like art?",
                            "You is like art?",
                        ],
                        1,
                        "Do you like…? es la forma de preguntar con you.",
                    ),
                    question(
                        "¿Cómo responden a sus gustos diferentes?",
                        ["Se burlan", "Siempre compiten", "Se respetan"],
                        2,
                        "El texto destaca el respeto por las preferencias.",
                    ),
                ],
            ),
        ],
    },
    {
        name: "Cuido los recursos",
        axis: "Sostenibilidad · ahorro de energía",
        project:
            "Prepara tres avisos en inglés para ahorrar energía y explica dónde los colocarías.",
        topics: [
            oldSix[2],
            newTopic(
                "A room with possibilities",
                "LUGARES Y OBJETOS",
                "Describir objetos y ubicaciones en un espacio cercano.",
                "There is / there are y in / on / under / next to.",
                "There is presenta un objeto singular; there are presenta varios. On indica sobre una superficie, under debajo y next to al lado. Combina existencia y posición para describir un espacio.",
                "There is a window next to the desk. There are two books on the desk and a bag under the chair. A small lamp is on the shelf. In the morning, the classroom gets daylight through the window. We turn off the lamp when it is not needed.",
                [
                    "Window → ventana",
                    "Shelf → estante",
                    "Under → debajo",
                    "Next to → al lado",
                ],
                "energy",
                "Imagina un salón y describe cuatro objetos y sus posiciones. Agrega una acción de ahorro.",
                "There is… There are… The… is under… Turn off…",
                [
                    question(
                        "Where is the bag?",
                        ["Under the chair", "On the shelf", "Next to the window"],
                        0,
                        "El bolso está debajo de la silla.",
                    ),
                    question(
                        "Completa: There ___ two books.",
                        ["is", "are", "am"],
                        1,
                        "Two books es plural, por eso usamos are.",
                    ),
                    question(
                        "¿Cuándo apagan la lámpara?",
                        [
                            "Siempre que leen",
                            "Solo al mediodía",
                            "Cuando no se necesita",
                        ],
                        2,
                        "El texto propone apagarla cuando no se necesita.",
                    ),
                ],
            ),
            newTopic(
                "Can we save more?",
                "POSIBILIDADES Y ACCIONES",
                "Proponer acciones sencillas y pedir información sobre el ahorro.",
                "Can / can’t y preguntas con can.",
                "Can + verbo expresa una posibilidad o capacidad. La forma no cambia con I, we o they. En una pregunta se invierte el orden: Can we save energy? Responde Yes, we can o No, we can’t.",
                "Our group can make small changes. We can use daylight and turn off unused screens. We cannot change the school wiring ourselves; an adult must manage repairs. Can we make reminder cards? Yes, we can. We place one card near each light switch.",
                [
                    "Screen → pantalla",
                    "Reminder → recordatorio",
                    "Switch → interruptor",
                    "Unused → sin usar",
                ],
                "energy",
                "Propón tres acciones que un grupo puede realizar. Escribe una pregunta con can y su respuesta.",
                "We can… We can’t… Can we…? Yes, we can.",
                [
                    question(
                        "What can the group make?",
                        ["Reminder cards", "Electrical wiring", "A new road"],
                        0,
                        "El grupo puede elaborar tarjetas recordatorias.",
                    ),
                    question(
                        "Completa: We can ___ daylight.",
                        ["uses", "use", "using"],
                        1,
                        "Después de can se usa el verbo base.",
                    ),
                    question(
                        "¿Quién debe gestionar las reparaciones?",
                        ["Los estudiantes solos", "Nadie", "Un adulto"],
                        2,
                        "El texto limita la intervención de los estudiantes y asigna las reparaciones a un adulto.",
                    ),
                ],
            ),
        ],
    },
    {
        name: "Diversidad colombiana",
        axis: "Globalización · identidad cultural",
        project:
            "Crea una postal en inglés de un lugar colombiano con una descripción y una costumbre, sin generalizaciones.",
        topics: [
            oldSix[3],
            newTopic(
                "Places and celebrations",
                "LUGARES Y CELEBRACIONES",
                "Reconocer detalles de una descripción cultural breve.",
                "Presente simple, adjetivos y palabras de pregunta.",
                "Para describir una celebración menciona dónde ocurre, qué hacen algunas personas y qué observas. Usa some para evitar generalizar: Some people dance. Where pregunta por el lugar.",
                "Our school organises a local culture day in Villavicencio. Some families share stories and songs. There is a small exhibition with drawings of rivers and mountains. Students ask questions about traditions. Not every family celebrates in the same way.",
                [
                    "Exhibition → exposición",
                    "River → río",
                    "Mountain → montaña",
                    "Songs → canciones",
                ],
                "countries",
                "Describe una celebración real o imaginaria. Di dónde ocurre y dos actividades.",
                "The celebration is in… Some people… There is…",
                [
                    question(
                        "Where is the culture day?",
                        [
                            "At a school in Villavicencio",
                            "At an airport",
                            "On a bus",
                        ],
                        0,
                        "El evento se organiza en un colegio de Villavicencio.",
                    ),
                    question(
                        "Where pregunta por…",
                        ["El tiempo", "El lugar", "La edad"],
                        1,
                        "Where sirve para preguntar dónde.",
                    ),
                    question(
                        "¿Qué se dice sobre las familias?",
                        [
                            "Todas celebran igual",
                            "Ninguna comparte historias",
                            "No todas celebran de la misma forma",
                        ],
                        2,
                        "El texto reconoce diferencias en las formas de celebrar.",
                    ),
                ],
            ),
            newTopic(
                "My cultural postcard",
                "MENSAJES Y DESCRIPCIONES",
                "Escribir un mensaje corto conectando información cultural.",
                "And / but y organización de un texto breve.",
                "And añade información; but marca contraste. Una postal puede tener saludo, descripción y despedida. Escribe tus propias observaciones y evita afirmar que representan a todo un país.",
                "Hi, Alex! I am visiting a town in Colombia with my family. The square is busy and colourful. Some people sell fruit, but others sell handmade bags. There are musicians near the park. I like the stories people share. See you soon!",
                [
                    "Square → plaza",
                    "Handmade → hecho a mano",
                    "Busy → concurrido",
                    "See you soon → hasta pronto",
                ],
                "countries",
                "Escribe una postal de cuatro oraciones sobre un lugar imaginario. Incluye and y but.",
                "Hi… There is… Some people… and… but… See you soon!",
                [
                    question(
                        "What do some people sell?",
                        ["Fruit", "Computers only", "Train tickets"],
                        0,
                        "El texto menciona personas que venden fruta.",
                    ),
                    question(
                        "But expresa…",
                        ["Adición", "Contraste", "Posesión"],
                        1,
                        "But conecta ideas con contraste.",
                    ),
                    question(
                        "¿Cómo se cierra la postal?",
                        ["Open your book", "Good morning", "See you soon"],
                        2,
                        "La despedida del mensaje es See you soon.",
                    ),
                ],
            ),
        ],
    },
];
courses[7].periods = [
    {
        name: "Mi bienestar integral",
        axis: "Salud · cuidado personal integral",
        project:
            "Escribe un plan personal ficticio con hábitos, preferencias y una meta alcanzable.",
        topics: [
            oldSeven[0],
            newTopic(
                "Feelings and support",
                "EMOCIONES Y APOYO",
                "Reconocer emociones y pedir apoyo mediante expresiones sencillas.",
                "To be + adjetivo y because.",
                "Para expresar cómo te sientes usa I am o I feel + adjetivo: I feel nervous. Because permite dar una razón. No necesitas revelar vivencias privadas: trabaja con personajes ficticios.",
                "Before a presentation, Eva feels nervous because speaking in front of a group is new for her. She asks her teacher for a short practice session. Her friend listens to her ideas. After practising, Eva feels more prepared. Asking for support is part of learning.",
                [
                    "Nervous → nervioso/a",
                    "Prepared → preparado/a",
                    "Support → apoyo",
                    "Feel → sentir",
                ],
                "identity",
                "Describe cómo se siente un personaje y escribe una petición de apoyo. No incluyas experiencias privadas.",
                "He / She feels… because… Can you help me…?",
                [
                    question(
                        "Why does Eva feel nervous?",
                        [
                            "Speaking to the group is new for her",
                            "She lost a bicycle",
                            "She dislikes her friends",
                        ],
                        0,
                        "La situación de hablar al grupo es nueva para Eva.",
                    ),
                    question(
                        "¿Qué expresión pide apoyo?",
                        [
                            "I are happy",
                            "Can you help me, please?",
                            "He feel yesterday",
                        ],
                        1,
                        "Can you help me, please? es una petición de ayuda.",
                    ),
                    question(
                        "What happens after practising?",
                        [
                            "She leaves school",
                            "She forgets her name",
                            "She feels more prepared",
                        ],
                        2,
                        "El texto dice que se siente más preparada.",
                    ),
                ],
            ),
            newTopic(
                "A realistic plan",
                "METAS Y PLANES",
                "Expresar planes futuros sencillos y revisar si son realizables.",
                "Am / is / are going to + verbo.",
                "Going to + verbo expresa un plan. Cambia to be según el sujeto: I am going to; she is going to; we are going to. Una meta pequeña puede describir una acción concreta, sin prometer resultados de salud.",
                "This week, our group is going to try a study plan. We are going to prepare our materials before class. Leo is going to read one short text on Tuesday. I am going to draw a summary on Thursday. We can change the plan if a task is too difficult.",
                [
                    "Try → intentar",
                    "Materials → materiales",
                    "Summary → resumen",
                    "Change → cambiar",
                ],
                "routine",
                "Escribe un plan de tres acciones para un personaje. Incluye un día y una forma de ajustar el plan.",
                "I am going to… on… We are going to… We can change…",
                [
                    question(
                        "What is Leo going to do?",
                        [
                            "Read a short text",
                            "Buy a television",
                            "Travel to another country",
                        ],
                        0,
                        "Leo planea leer un texto breve.",
                    ),
                    question(
                        "Completa: We ___ going to prepare.",
                        ["is", "are", "am"],
                        1,
                        "Con we se usa are going to.",
                    ),
                    question(
                        "¿Qué pueden hacer si una tarea es difícil?",
                        [
                            "Ocultarla siempre",
                            "Culpar al compañero",
                            "Cambiar el plan",
                        ],
                        2,
                        "El plan puede ajustarse si la tarea resulta difícil.",
                    ),
                ],
            ),
        ],
    },
    {
        name: "Convivimos e incluimos",
        axis: "Democracia y paz · inclusión",
        project:
            "Prepara un acuerdo de aula con recomendaciones, razones y una petición respetuosa.",
        topics: [
            oldSeven[1],
            newTopic(
                "Rules and reasons",
                "NORMAS Y RECOMENDACIONES",
                "Distinguir una recomendación de una regla en situaciones escolares.",
                "Should, must y mustn’t.",
                "Should expresa una recomendación. Must puede expresar una obligación y mustn’t una prohibición. La fuerza de cada expresión depende del contexto; usa razones y lenguaje respetuoso.",
                "At the school library, students must return borrowed books. They must not damage the pages. Our teacher says we should choose a book that interests us. We can ask the librarian for suggestions. Rules protect shared materials, and recommendations help us choose.",
                [
                    "Borrowed → prestado",
                    "Return → devolver",
                    "Damage → dañar",
                    "Librarian → bibliotecario/a",
                ],
                "advice",
                "Escribe dos reglas de una biblioteca imaginaria y una recomendación. Explica una razón.",
                "We must… We mustn’t… We should… because…",
                [
                    question(
                        "What must students return?",
                        ["Borrowed books", "Their shoes", "Their lunches"],
                        0,
                        "La obligación es devolver los libros prestados.",
                    ),
                    question(
                        "Mustn’t expresa…",
                        [
                            "Una recomendación leve",
                            "Una prohibición",
                            "Una nacionalidad",
                        ],
                        1,
                        "Mustn’t comunica que una acción no está permitida.",
                    ),
                    question(
                        "What does the teacher recommend?",
                        [
                            "Damaging pages",
                            "Ignoring the librarian",
                            "Choosing an interesting book",
                        ],
                        2,
                        "La recomendación es escoger un libro de interés.",
                    ),
                ],
            ),
            newTopic(
                "Let’s solve it together",
                "DIÁLOGOS Y ACUERDOS",
                "Formular propuestas y responder con cortesía ante un desacuerdo.",
                "Let’s, can y expresiones de acuerdo.",
                "Let’s + verbo permite proponer una acción compartida: Let’s take turns. Puedes aceptar con That’s a good idea o responder con I understand, but… seguido de una alternativa respetuosa.",
                "Two classmates want the same role in a project. Nina says: Let’s take turns. Joel replies: That’s a good idea. Can we also share the research? Nina agrees. They write their tasks and check that everyone has a way to participate.",
                [
                    "Take turns → turnarse",
                    "Share → compartir",
                    "Role → papel o función",
                    "Agree → estar de acuerdo",
                ],
                "identity",
                "Escribe un diálogo ficticio de cuatro intervenciones para resolver un desacuerdo.",
                "Let’s… That’s a good idea. Can we…? I agree.",
                [
                    question(
                        "What does Nina suggest?",
                        [
                            "Taking turns",
                            "Cancelling the project",
                            "Working without Joel",
                        ],
                        0,
                        "La propuesta consiste en turnarse.",
                    ),
                    question(
                        "Completa: Let’s ___ the research.",
                        ["shares", "share", "sharing"],
                        1,
                        "Después de let’s se usa la forma base del verbo.",
                    ),
                    question(
                        "¿Qué revisan al final?",
                        [
                            "Quién habla más fuerte",
                            "Quién gana un premio",
                            "Que todos puedan participar",
                        ],
                        2,
                        "El acuerdo busca que cada persona tenga una forma de participar.",
                    ),
                ],
            ),
        ],
    },
    {
        name: "Actuamos por el ambiente",
        axis: "Sostenibilidad · conservación",
        project:
            "Diseña una campaña breve con problema, dos propuestas y un reporte de observación ficticio.",
        topics: [
            oldSeven[2],
            newTopic(
                "Comparing choices",
                "COMPARACIONES Y DECISIONES",
                "Comparar opciones cotidianas a partir de información explícita.",
                "Comparativos cortos y than.",
                "Para comparar dos elementos, algunos adjetivos cortos añaden -er: small → smaller. Big duplica la g: bigger. Than introduce el segundo elemento. Compara características observables, no el valor de las personas.",
                "Our class compares two boxes for collecting paper. The green box is bigger than the blue box. The blue box is lighter, so it is easier to move. Both can be reused. We choose the green box for the classroom and the blue one for carrying small amounts.",
                [
                    "Bigger → más grande",
                    "Lighter → más ligero",
                    "Than → que (comparación)",
                    "Both → ambos",
                ],
                "comparison",
                "Compara dos objetos imaginarios con dos adjetivos y explica para qué usarías cada uno.",
                "The… is bigger than… The… is lighter. We can use…",
                [
                    question(
                        "Which box is bigger?",
                        ["The green box", "The blue box", "Both are equal"],
                        0,
                        "El texto indica que la caja verde es más grande.",
                    ),
                    question(
                        "Completa: The green box is bigger ___ the blue box.",
                        ["and", "than", "because"],
                        1,
                        "Than introduce el segundo elemento comparado.",
                    ),
                    question(
                        "Why is the blue box easier to move?",
                        ["It is taller", "It is newer", "It is lighter"],
                        2,
                        "La caja azul se mueve más fácilmente porque pesa menos.",
                    ),
                ],
            ),
            newTopic(
                "Our observation report",
                "ENCUESTAS Y REPORTES",
                "Interpretar un reporte breve y comunicar observaciones simples.",
                "Presente simple, cantidades y because.",
                "Un reporte breve puede tener tema, observación y propuesta. Usa cantidades solo si provienen de datos. En esta lección los números son ficticios para practicar inglés, no resultados de la investigación.",
                "In a fictional class survey, six students reuse paper and four use reusable bottles. The group records these answers without names. They want to place a reminder near the paper tray because some sheets have an unused side. Their next step is to ask the teacher for permission.",
                [
                    "Survey → encuesta",
                    "Record → registrar",
                    "Sheets → hojas",
                    "Permission → permiso",
                ],
                "environment",
                "Inventa dos datos sencillos, aclara que son ficticios y escribe una propuesta relacionada.",
                "In this fictional survey… students… We suggest… because…",
                [
                    question(
                        "How many students reuse paper in the example?",
                        ["Six", "Four", "Ten"],
                        0,
                        "El ejemplo ficticio menciona seis estudiantes.",
                    ),
                    question(
                        "¿Son resultados reales de la investigación?",
                        [
                            "Sí",
                            "No, son datos ficticios para practicar",
                            "No se puede saber",
                        ],
                        1,
                        "El texto aclara que la encuesta es ficticia.",
                    ),
                    question(
                        "What is their next step?",
                        [
                            "Publish student names",
                            "Throw away the paper",
                            "Ask the teacher for permission",
                        ],
                        2,
                        "El siguiente paso es pedir permiso al docente.",
                    ),
                ],
            ),
        ],
    },
    {
        name: "Culturas en diálogo",
        axis: "Globalización · culturas internacionales",
        project:
            "Escribe una crónica cultural ficticia con una comparación respetuosa y preguntas para aprender de otros.",
        topics: [
            oldSeven[3],
            newTopic(
                "A visit to remember",
                "EXPERIENCIAS PASADAS",
                "Comprender y narrar hechos terminados con un orden sencillo.",
                "Pasado simple regular y did / didn’t.",
                "Muchos verbos regulares forman pasado con -ed: visit → visited. Para preguntas usa Did + sujeto + verbo base. Para negar usa didn’t + verbo base: We didn’t travel.",
                "Last Saturday, our class visited a virtual museum. We watched a short presentation and asked questions about everyday objects from different places. We did not travel to another country. After the visit, we created a poster and compared our observations. The class enjoyed learning from different perspectives.",
                [
                    "Visited → visitó / visitaron",
                    "Asked → preguntó / preguntaron",
                    "Created → creó / crearon",
                    "Last Saturday → el sábado pasado",
                ],
                "identity",
                "Relata una visita ficticia con tres acciones pasadas. Escribe también algo que no ocurrió.",
                "Last… we visited… We watched… We didn’t…",
                [
                    question(
                        "What did the class visit?",
                        ["A virtual museum", "An airport", "A new country"],
                        0,
                        "La visita fue a un museo virtual.",
                    ),
                    question(
                        "Completa: We didn’t ___ to another country.",
                        ["travelled", "travel", "travels"],
                        1,
                        "Después de didn’t se usa el verbo base.",
                    ),
                    question(
                        "What did they create afterwards?",
                        ["A new museum", "A ticket", "A poster"],
                        2,
                        "Al finalizar elaboraron un afiche.",
                    ),
                ],
            ),
            newTopic(
                "Similar, different, connected",
                "COMPARACIÓN CULTURAL Y CIERRE",
                "Conectar observaciones culturales con semejanzas y diferencias respetuosas.",
                "And / but / because; repaso de presente y pasado.",
                "Al comparar culturas distingue una observación concreta de una generalización. And añade, but contrasta y because explica. Puedes preguntar How do you…? para escuchar experiencias antes de sacar conclusiones.",
                "Two students describe family meals. In one home, dinner is early; in the other, it is later. Both families enjoy sharing stories, but their schedules are different. The students ask questions instead of deciding that one custom is better. They learned that people within the same country can also have different routines.",
                [
                    "Similar → parecido",
                    "Custom → costumbre",
                    "Schedules → horarios",
                    "Within → dentro de",
                ],
                "countries",
                "Compara dos costumbres ficticias con una semejanza, una diferencia y una pregunta respetuosa.",
                "Both… but… I would like to ask: How do you…?",
                [
                    question(
                        "What do both families enjoy?",
                        [
                            "Sharing stories",
                            "Exactly the same schedule",
                            "Living in a museum",
                        ],
                        0,
                        "Ambas disfrutan compartir historias.",
                    ),
                    question(
                        "¿Qué conector introduce contraste?",
                        ["And", "But", "Because"],
                        1,
                        "But permite contrastar ideas.",
                    ),
                    question(
                        "¿Cuál es la conclusión del texto?",
                        [
                            "Una costumbre siempre es superior",
                            "Cada país tiene una sola rutina",
                            "Hay diversidad también dentro de un país",
                        ],
                        2,
                        "La diversidad no se limita a diferencias entre países.",
                    ),
                ],
            ),
        ],
    },
];
// Crear una lista de doce temas y conservar el periodo al que pertenece cada tema.
for (const gradeNumber of [6, 7]) {
    courses[gradeNumber].themes = [];
    const periods = courses[gradeNumber].periods;
    for (let p = 0; p < periods.length; p++) {
        for (let t = 0; t < periods[p].topics.length; t++) {
            const topic = periods[p].topics[t];
            topic.period = p + 1;
            topic.position = t + 1;
            topic.id = courses[gradeNumber].themes.length;
            courses[gradeNumber].themes.push(topic);
        }
    }
    assessments[gradeNumber] = [];
    for (const topic of courses[gradeNumber].themes) {
        assessments[gradeNumber].push(topic.questions[0], topic.questions[2]);
    }
}

videos.past = {
    id: "r2cf1qcltzY",
    title: "Past simple · verbos regulares en contexto",
    author: "British Council · LearnEnglish Teens",
    start: 0,
    end: 120,
    source: "https://learnenglishteens.britishcouncil.org/grammar/a1-a2-grammar/past-simple-regular-verbs",
    level: "A1–A2 · repaso acompañado",
    reason: "Ejemplos de pasado contextualizados y transcripción en la página del autor. Se usa un fragmento y no una compilación extensa.",
    focus: "Antes: lee visited y watched. Durante: reconoce una acción terminada. Después: pausa y escribe una oración propia con un verbo regular en pasado.",
};
courses[7].themes[9].video = "past";
courses[7].themes[10].video = "past";

// Un recurso principal distinto para cada temática. El nivel indicado es de uso
// dentro del OVA, no una certificación del video ni una validación para TDAH.
const topicVideoResources = [
    {
        grade: 6,
        topic: 0,
        id: "I_tRSrPru94",
        title: "How to introduce yourself",
        author: "BBC Learning English",
        focus: "Identifica una pregunta sobre el nombre y una respuesta. Después presenta un personaje con My name is…",
        reason: "Saludo y presentación personal con un diálogo para principiantes.",
        level: "Iniciación · conversación con apoyo escrito",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=I_tRSrPru94",
    },
    {
        grade: 6,
        topic: 1,
        id: "v9EU41cuhHY",
        title: "How to describe your family",
        author: "BBC Learning English",
        focus: "Reconoce dos palabras de parentesco. Después describe una familia imaginaria con She is… / He is…",
        reason: "Relaciones familiares; acompáñalo con los modelos de have / has del OVA.",
        level: "Iniciación · conversación con apoyo escrito",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=v9EU41cuhHY",
    },
    {
        grade: 6,
        topic: 2,
        id: "yA91EEv2alw",
        title: "A Back to School English Lesson",
        author: "Learn English with Bob the Canadian",
        focus: "Reconoce dos objetos del aula. Pausa y formula Open your book o Can I use a pencil? con el modelo del OVA.",
        reason: "Objetos reales del colegio para contextualizar instrucciones; el video apoya vocabulario, no explica todos los imperativos.",
        level: "Ampliación acompañada · lenguaje más exigente",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=yA91EEv2alw",
    },
    {
        grade: 6,
        topic: 3,
        id: "bq6GBbh3uhU",
        title: "How to talk about your daily routine",
        author: "BBC Learning English",
        focus: "Busca dos acciones diarias. Después ordénalas con First… / Then… y agrega una acción de cuidado.",
        reason: "Conversación sobre rutinas en presente simple; las horas se repasan en el texto del OVA.",
        level: "Iniciación · conversación con apoyo escrito",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=bq6GBbh3uhU",
    },
    {
        grade: 6,
        topic: 4,
        id: "gCs4knrlnD4",
        title: "Talk about your habits",
        author: "BBC Learning English",
        focus: "Reconoce always, sometimes o never. Después pregunta How often do you…? y responde sobre un personaje.",
        reason: "Conversación centrada en frecuencia, distinta del video de acciones diarias.",
        level: "Iniciación · conversación con apoyo escrito",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=gCs4knrlnD4",
    },
    {
        grade: 6,
        topic: 5,
        id: "wUF33157hYI",
        title: "How to talk about likes and dislikes",
        author: "BBC Learning English",
        focus: "Identifica una preferencia positiva y una negativa. Después escribe I like… / I don’t like…",
        reason: "Preguntas y respuestas para comunicar gustos.",
        level: "Iniciación · conversación con apoyo escrito",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=wUF33157hYI",
    },
    {
        grade: 6,
        topic: 6,
        id: "Bjx8HpmEkR0",
        title: "An English Lesson about Electricity",
        author: "Learn English with Bob the Canadian",
        focus: "Busca una palabra u objeto relacionado con electricidad. Después usa el modelo Turn off the lights. No manipules enchufes ni aparatos.",
        reason: "Vocabulario de electricidad en contexto real; las instrucciones de ahorro se trabajan en el OVA.",
        level: "Ampliación acompañada · lenguaje más exigente",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=Bjx8HpmEkR0",
    },
    {
        grade: 6,
        topic: 7,
        id: "j3llK722RVQ",
        title: "There is & there are",
        author: "Inglés para niños con Mr Pea",
        focus: "Distingue un objeto de varios. Después describe tu aula con There is… y There are…",
        reason: "Explicación en español y ejemplos de existencia; las ubicaciones se apoyan en el texto.",
        level: "Apoyo en español · ejemplos en inglés",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=j3llK722RVQ",
    },
    {
        grade: 6,
        topic: 8,
        id: "1vUTq-Pd4Vs",
        title: "Talking about ability",
        author: "BBC Learning English",
        focus: "Reconoce can y can’t. Después adapta la estructura a We can save water o We can turn off the lights.",
        reason: "Practica la estructura can; la aplicación ambiental corresponde a la actividad del OVA.",
        level: "Iniciación · conversación con apoyo escrito",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=1vUTq-Pd4Vs",
    },
    {
        grade: 6,
        topic: 9,
        id: "31y2Bq1RYQA",
        title: "Saying where you’re from",
        author: "BBC Learning English",
        focus: "Busca Where are you from? Después describe un personaje colombiano y un lugar sin generalizar costumbres.",
        reason: "Origen y lugar de residencia; no presenta una descripción cultural de Colombia.",
        level: "Iniciación · conversación con apoyo escrito",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=31y2Bq1RYQA",
    },
    {
        grade: 6,
        topic: 10,
        id: "Pn3MXGxNWCM",
        title: "Celebrations! (Lesson Only)",
        author: "Learn English with Bob the Canadian",
        focus: "Reconoce celebration, party o gift. Después compara una celebración del ejemplo con una que conozcas.",
        reason: "Vocabulario de celebraciones para describir prácticas culturales sin asumir que todas las personas las comparten.",
        level: "Ampliación acompañada · lenguaje más exigente",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=Pn3MXGxNWCM",
    },
    {
        grade: 6,
        topic: 11,
        id: "tUwFYcRCF2o",
        title: "Conjunciones básicas: and, but, so, because",
        author: "Inglés para niños con Mr Pea",
        focus: "Busca los ejemplos de and y but. Úsalos para unir dos frases de tu postal. Puedes omitir so y because por ahora.",
        reason: "Selecciona solo los conectores que se requieren para la postal.",
        level: "Apoyo en español · ejemplos en inglés",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=tUwFYcRCF2o",
    },
    {
        grade: 7,
        topic: 0,
        id: "QBi0U99zo3Q",
        title: "Daily Routine: 10 Easy English Words",
        author: "BBC Learning English",
        focus: "Reconoce dos acciones cotidianas. Después elige un hábito para tu semana y completa I’m going to… con el modelo escrito.",
        reason: "Repaso de vocabulario para planear una semana; going to se explica en el OVA y en el tema de planes.",
        level: "Iniciación · conversación con apoyo escrito",
        start: 9,
        end: 129,
        source: "https://www.youtube.com/watch?v=QBi0U99zo3Q",
    },
    {
        grade: 7,
        topic: 1,
        id: "yyClpj_GJDc",
        title: "How to talk about your feelings",
        author: "BBC Learning English",
        focus: "Reconoce dos emociones. Después completa I feel… because… y pide ayuda con el modelo de la temática.",
        reason: "Adjetivos de emociones; no necesitas contar experiencias personales ni dar información de salud.",
        level: "Iniciación · conversación con apoyo escrito",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=yyClpj_GJDc",
    },
    {
        grade: 7,
        topic: 2,
        id: "gT6fqzJL6mM",
        title: "La diferencia entre will & going to",
        author: "Amigos Ingleses",
        focus: "Busca una intención con going to. Después escribe un plan realizable para mañana. No necesitas dominar todas las diferencias con will.",
        reason: "Explicación con apoyo en español para distinguir planes y decisiones.",
        level: "Apoyo en español · ejemplos en inglés",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=gT6fqzJL6mM",
    },
    {
        grade: 7,
        topic: 3,
        id: "ELhFzpCWdOo",
        title: "Should & shouldn’t",
        author: "Inglés para niños con Mr Pea",
        focus: "Reconoce una recomendación. Después propón una acción inclusiva con We should… because…",
        reason: "Estructura para dar consejos; la convivencia inclusiva se contextualiza en el OVA.",
        level: "Apoyo en español · ejemplos en inglés",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=ELhFzpCWdOo",
    },
    {
        grade: 7,
        topic: 4,
        id: "HUXXgVElADg",
        title: "Have to and must · 6 Minute Grammar",
        author: "BBC Learning English",
        focus: "Busca una obligación con must. Después distingue una regla con must de una recomendación con should. Revisa mustn’t en el ejemplo escrito.",
        reason: "Diferencia reglas y obligaciones; no evalúa todo el contraste con have to.",
        level: "Ampliación acompañada · lenguaje más exigente",
        start: 33,
        end: 148,
        source: "https://www.youtube.com/watch?v=HUXXgVElADg",
    },
    {
        grade: 7,
        topic: 5,
        id: "2zyca6fGo4A",
        title: "Making suggestions is easy · English at Work",
        author: "BBC Learning English",
        focus: "Reconoce una propuesta cortés. Después usa Let’s… para resolver el desacuerdo escolar del OVA.",
        reason: "Situación de colaboración en una oficina que se adapta a una tarea escolar; diálogo acompañado.",
        level: "Ampliación acompañada · lenguaje más exigente",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=2zyca6fGo4A",
    },
    {
        grade: 7,
        topic: 6,
        id: "hX8XTOR-WV8",
        title: "Cutting down on waste",
        author: "British Council | LearnEnglish Teens",
        focus: "Busca waste, reuse o recycle. Después propón una acción local con should y una razón con because.",
        reason: "Contexto ambiental y transcripción del autor; vocabulario más exigente y uso acompañado.",
        level: "Ampliación acompañada · lenguaje más exigente",
        start: 0,
        end: 105,
        source: "https://learnenglishteens.britishcouncil.org/study-break/youtubers/cutting-down-waste",
    },
    {
        grade: 7,
        topic: 7,
        id: "sJa91uxzodw",
        title: "Adjetivos comparativos",
        author: "Inglés para niños con Mr Pea",
        focus: "Reconoce una comparación con than. Después compara dos opciones de transporte u objetos usando el modelo del OVA.",
        reason: "Explicación en español de la estructura comparativa.",
        level: "Apoyo en español · ejemplos en inglés",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=sJa91uxzodw",
    },
    {
        grade: 7,
        topic: 8,
        id: "r6XpFWmA7Gk",
        title: "How to use quantifiers · 6 Minute Grammar",
        author: "BBC Learning English",
        focus: "Busca all, every o both. Después comunica una observación del reporte ficticio con una cantidad del texto.",
        reason: "Amplía palabras de cantidad; las cifras del reporte se leen en el OVA. No se exige dominar todos los cuantificadores.",
        level: "Ampliación acompañada · lenguaje más exigente",
        start: 41,
        end: 120,
        source: "https://www.youtube.com/watch?v=r6XpFWmA7Gk",
    },
    {
        grade: 7,
        topic: 9,
        id: "kTf0V4HyFtM",
        title: "Talk about what you did last weekend",
        author: "BBC Learning English",
        focus: "Reconoce una acción terminada. Después cuenta un evento cultural ficticio con el modelo en pasado.",
        reason: "Conversación sobre hechos pasados para apoyar la narración; no representa todas las culturas.",
        level: "Iniciación · conversación con apoyo escrito",
        start: 0,
        end: 120,
        source: "https://www.youtube.com/watch?v=kTf0V4HyFtM",
    },
    {
        grade: 7,
        topic: 10,
        id: "r2cf1qcltzY",
        title: "Past simple: regular verbs",
        author: "British Council | LearnEnglish Teens",
        focus: "Reconoce visited o watched. Después narra una visita ficticia con dos verbos regulares y el orden del modelo.",
        reason: "Ejemplos y explicación de pasado regular, distintos del diálogo del tema anterior.",
        level: "Ampliación acompañada · lenguaje más exigente",
        start: 0,
        end: 120,
        source: "https://learnenglishteens.britishcouncil.org/grammar/a1-a2-grammar/past-simple-regular-verbs",
    },
    {
        grade: 7,
        topic: 11,
        id: "i_YLiAOt0qE",
        title: "Diferencias entre el inglés británico y americano",
        author: "Amigos Ingleses",
        focus: "Reconoce una diferencia de vocabulario. Después escribe una semejanza y una diferencia con and / but / because.",
        reason: "Ejemplo de variedades del inglés; ninguna variedad ni cultura es superior. Apóyate en los conectores escritos.",
        level: "Apoyo en español · ejemplos en inglés",
        start: 0,
        end: 120,
        source: "https://www.amigosingleses.com/articles/can-americans-understand-british-english",
    },
];
for (const resource of topicVideoResources) {
    const key = "grado" + resource.grade + "tema" + resource.topic;
    videos[key] = resource;
    courses[resource.grade].themes[resource.topic].video = key;
    courses[resource.grade].themes[resource.topic].extraVideos = [];
}
// Los complementos son opcionales y se abren aparte para evitar saturar la página.
videos.toBeQuestions = {
    id: "28E6fPpWURc",
    title: "Cómo hacer preguntas con el verbo to be",
    author: "Aprender Inglés Americano",
    start: 0,
    end: 120,
    source: "https://www.youtube.com/watch?v=28E6fPpWURc",
    level: "Refuerzo opcional · explicación en español",
    reason: "Refuerza las preguntas para presentarse mediante una explicación en español y ejemplos con to be.",
    focus: "Busca una pregunta con are o is y responde con un personaje imaginario. Puedes usar el modelo escrito.",
};
videos.habitsDialogue = {
    id: "ICvoXZsIfzw",
    title: "Hábitos y rutinas: conversación en inglés",
    author: "Amigos Ingleses",
    start: 0,
    end: 120,
    source: "https://www.amigosingleses.com/articles/habitos-ingles",
    level: "Ampliación opcional · acompañamiento docente",
    reason: "La conversación completa contiene expresiones más avanzadas. Solo se busca reconocer un hábito; no se evalúan sus modismos.",
    focus: "Identifica una acción diaria y compárala con el plan de un personaje del OVA. No necesitas comprender cada frase.",
};
videos.quidditch = {
    id: "2VX6Ucdzi5I",
    title: "Harry Potter: The Rules of Quidditch",
    author: "Learn English With TV Series",
    externalOnly: true,
    source: "https://www.youtube.com/watch?v=2VX6Ucdzi5I",
    level: "Exploración opcional con docente · inglés más exigente",
    reason: "Ejemplo de reglas en una historia de ficción. No se pudo confirmar la inserción de este video; se ofrece únicamente el enlace externo, cuya disponibilidad debe revisar el docente.",
    focus: "Si el docente confirma su disponibilidad y pertinencia, escojan una regla del juego y reformúlenla con must o mustn’t. Si resulta difícil, usa las reglas escolares del OVA.",
};
courses[6].themes[0].extraVideos = ["toBeQuestions"];
courses[7].themes[0].extraVideos = ["habitsDialogue"];
courses[7].themes[4].extraVideos = ["quidditch"];
