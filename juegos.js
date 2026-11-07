// JUEGOS DE INGLÉS
// Cada partida utiliza el vocabulario y los ejemplos de la temática abierta.
// No hay cuenta regresiva, vidas, clasificaciones ni sonidos automáticos.
let wordGame = null;
const wordGameNames = {pairs:'Encuentra parejas', gaps:'Completa la frase', detective:'Detective del texto'};
function shuffleWords(items) {
    const result = [...items];
    for (let i=result.length-1;i>0;i--) {
        const other = Math.floor(Math.random()*(i+1));
        [result[i],result[other]]=[result[other],result[i]];
    }
    return result;
}
function gamesMarkup(topic) {
    return `<div id="gamesPanel" hidden><div id="gamePicker">
        <h3>Juegos de este tema</h3><p>Elige uno. Puedes detenerte cuando quieras.</p>
        <div class="game-choices">${Object.entries(wordGameNames).map(([key,name])=>`<button onclick="startWordGame(${topic}, '${key}')"><strong>${name}</strong><span>${{pairs:'Une palabras en inglés con su significado.',gaps:'Elige la pieza que completa el ejemplo.',detective:'Encuentra el significado de una palabra del texto.'}[key]}</span></button>`).join('')}</div>
        <p id="gamesSaved" class="notice">${gamesProgressText(topic)}</p></div><div id="wordGameArea"></div></div>
        <button id="changeActivity" class="activity-back" hidden onclick="resetTopicActivity()">Elegir otra actividad</button>`;
}
function gamesProgressText(topic) {
    const record=state.games?.[topic] || {};
    const count=Object.keys(wordGameNames).filter(key=>record[key]?.complete).length;
    return 'Juegos completados: '+count+' de 3';
}
function resetTopicActivity() {
    stopSpeech(false);
    wordGame=null;
    session=null;
    document.getElementById('practiceChoice').hidden=false;
    document.getElementById('practiceArea').innerHTML='';
    document.getElementById('gamesPanel').hidden=true;
    document.getElementById('wordGameArea').innerHTML='';
    document.getElementById('changeActivity').hidden=true;
    document.getElementById('practice').focus();
}
function openTopicGames(topic) {
    stopSpeech(false);
    session=null;
    wordGame=null;
    document.getElementById('practiceChoice').hidden=true;
    document.getElementById('practiceArea').innerHTML='';
    document.getElementById('gamesPanel').hidden=false;
    document.getElementById('gamePicker').hidden=false;
    document.getElementById('wordGameArea').innerHTML='';
    document.getElementById('changeActivity').hidden=false;
    document.getElementById('gamesSaved').textContent=gamesProgressText(topic);
}
function startWordGame(topic,kind) {
    if (!wordGameNames[kind] || !lessons[topic]) return;
    stopSpeech(false);
    const entries=glossaryEntries(topic).filter(w=>w.term && w.meaning);
    const words=[];
    for(const word of entries) {
        if(!words.some(w=>w.term.toLowerCase()===word.term.toLowerCase() || w.meaning===word.meaning)) words.push(word);
    }
    wordGame={topic,kind,words:words.slice(0,4),index:0,attempts:0,matched:[],selected:null,accepted:false};
    document.getElementById('gamePicker').hidden=true;
    if(kind==='pairs') {
        wordGame.left=shuffleWords(wordGame.words.map((_,i)=>i));
        wordGame.right=shuffleWords(wordGame.words.map((_,i)=>i));
        renderPairs();
    } else renderWordRound();
}
function gameHeading(instruction) {
    return `<h3 id="gameHeading" tabindex="-1">${wordGameNames[wordGame.kind]}</h3><p>${instruction}</p>`;
}
function focusGameHeading(){document.getElementById('gameHeading')?.focus();}
function renderPairs() {
    const g=wordGame;
    const column=(side)=>g[side].map(i=>`<button class="pair-word" data-pair-side="${side}" data-pair-index="${i}" ${g.matched.includes(i)?'disabled':''} aria-pressed="false" onclick="choosePair('${side}',${i})" ${side==='left'?'lang="en"':''}>${esc(side==='left'?g.words[i].term:g.words[i].meaning)}${g.matched.includes(i)?' ✓':''}</button>`).join('');
    document.getElementById('wordGameArea').innerHTML=gameHeading('Toca una palabra en inglés y después su significado.')+
        `<p id="gameProgress" class="notice" role="status">${g.matched.length} de ${g.words.length} parejas</p>
        <div class="pair-columns"><div><h4>Inglés</h4>${column('left')}</div><div><h4>Español</h4>${column('right')}</div></div>
        <button onclick="wordGameHint()">Una pista</button><p id="gameFeedback" class="feedback" role="status"></p>`;
    focusGameHeading();
}
function choosePair(side,index) {
    const g=wordGame;
    if(!g || g.kind!=='pairs' || !['left','right'].includes(side) || !g.words[index] || g.matched.includes(index)) return;
    const feedback=document.getElementById('gameFeedback');
    if(!g.selected || g.selected.side===side) {
        g.selected={side,index};
        document.querySelectorAll('[data-pair-side]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pairSide===side && Number(b.dataset.pairIndex)===index)));
        feedback.textContent=side==='left'?'Ahora elige su significado.':'Ahora elige la palabra en inglés.';
        return;
    }
    const first=g.selected;
    g.attempts++;
    if(first.index===index) {
        g.matched.push(index);g.selected=null;
        if(g.matched.length===g.words.length) {finishWordGame();return;}
        renderPairs();
        document.getElementById('gameFeedback').textContent='¡Pareja encontrada! Continúa con otra.';
    } else {
        const english=side==='left'?index:first.index;
        g.selected={side:'left',index:english};
        document.querySelectorAll('[data-pair-side]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pairSide==='left' && Number(b.dataset.pairIndex)===english)));
        feedback.textContent='Todavía no coincide. Pista: el significado empieza por «'+g.words[english].meaning.slice(0,2)+'…». Puedes intentar otra opción.';
    }
}
function wordRoundItems(topic,kind) {
    if(kind==='gaps') return learningContent[grade][topic].examples;
    const entries=glossaryEntries(topic);
    // Priorizar palabras que aparecen en el texto; la lista completa sigue disponible.
    const marked=readingMarkup(lessons[topic].text,topic);
    const present=entries.filter((w,i)=>marked.includes("openWord("+topic+", "+i+")"));
    return (present.length?present:entries).slice(0,3);
}
function renderWordRound() {
    const g=wordGame,items=wordRoundItems(g.topic,g.kind),item=items[g.index];
    g.accepted=false;
    let question,options;
    if(g.kind==='gaps') {
        const missing=item.chunks.at(-1);
        g.answer=missing;
        options=[...new Set(items.map(x=>x.chunks.at(-1)))];
        question=`<p>Completa esta idea: ${esc(item.meaning)}</p><p class="reading" lang="en">${esc(item.chunks.slice(0,-1).join(' '))} <strong>_____</strong></p>`;
    } else {
        g.answer=item.meaning;
        options=[...new Set(items.map(x=>x.meaning))];
        question=`<p class="reading" lang="en">${readingMarkup(lessons[g.topic].text,g.topic)}</p><p>En este tema, ¿qué significa <button class="vocab-word" lang="en" onclick="openWord(${g.topic}, ${glossaryEntries(g.topic).findIndex(w=>w.term===item.term)})">${esc(item.term)}</button>?</p>`;
    }
    g.options=shuffleWords(options);
    document.getElementById('wordGameArea').innerHTML=gameHeading(g.kind==='gaps'?'Elige la pieza que completa la oración.':'Lee el texto y consulta el vocabulario si lo necesitas.')+
        `<p class="notice">Actividad ${g.index+1} de ${items.length}</p>${question}<div class="options">${g.options.map((v,i)=>`<button class="option" data-game-option="${i}" onclick="answerWordRound(${i})" ${g.kind==='gaps'?'lang="en"':''}>${esc(v)}</button>`).join('')}</div><button onclick="wordGameHint()">Una pista</button><p id="gameFeedback" class="feedback" role="status"></p><button id="nextGameRound" class="primary" hidden onclick="nextWordRound()">Continuar</button>`;
    focusGameHeading();
}
function wordGameHint() {
    const g=wordGame;
    if(!g || g.complete) return;
    let hint;
    if(g.kind==='pairs') {
        const i=g.selected?.index ?? g.words.findIndex((_,i)=>!g.matched.includes(i));
        const w=g.words[i];
        hint='Para «'+w.term+'», busca un significado que empiece por «'+w.meaning.slice(0,2)+'…».';
    } else if(g.kind==='gaps') {
        const item=wordRoundItems(g.topic,g.kind)[g.index];
        hint='Lee la idea en español y después el comienzo en inglés. La pieza que falta empieza por «'+item.chunks.at(-1).split(' ')[0]+'».';
    } else {
        const item=wordRoundItems(g.topic,g.kind)[g.index];
        hint='Toca «'+item.term+'» en la pregunta para consultar su significado. Después elige la opción que corresponda.';
    }
    document.getElementById('gameFeedback').textContent='Pista: '+hint;
}
function answerWordRound(index) {
    const g=wordGame;
    if(!g || g.accepted || !Number.isInteger(index) || !g.options[index]) return;
    const option=document.querySelector(`[data-game-option="${index}"]`);
    if(option?.disabled) return;
    g.attempts++;
    if(g.options[index]===g.answer) {
        g.accepted=true;
        document.getElementById('gameFeedback').textContent='¡Bien! Puedes continuar cuando quieras.';
        document.querySelectorAll('[data-game-option]').forEach(b=>{b.disabled=true;});
        document.getElementById('nextGameRound').hidden=false;
    } else {
        if(option) option.disabled=true;
        wordGameHint();
    }
}
function nextWordRound() {
    const g=wordGame;
    if(!g?.accepted) return;
    g.index++;
    if(g.index<wordRoundItems(g.topic,g.kind).length)renderWordRound();
    else finishWordGame();
}
function finishWordGame() {
    const g=wordGame;
    if(!g || g.complete) return;
    g.complete=true;
    if(!state.games)state.games={};
    if(!state.games[g.topic])state.games[g.topic]={};
    state.games[g.topic][g.kind]={complete:true,attempts:g.attempts,date:new Date().toISOString()};
    save();
    document.getElementById('wordGameArea').innerHTML=`<h3 id="gameHeading" tabindex="-1">¡Juego completado!</h3><p>Practicaste el vocabulario de ${esc(lessons[g.topic].title)}. Los reintentos también cuentan como aprendizaje.</p><p class="notice">${gamesProgressText(g.topic)}</p><button class="primary" onclick="openTopicGames(${g.topic})">Elegir otro juego</button><button onclick="startWordGame(${g.topic}, '${g.kind}')">Volver a jugar</button>`;
    focusGameHeading();
}
