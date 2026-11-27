'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto');
// AUD-UX-007: restauração exata da base publicada após AUD-UX-006.
const changes=[
  {
    "before": "function validSession(s){\n if(!s||",
    "after": "// AUD-UX-007: modo de sessão, não um ID curricular nem um baralho adicional.\nconst SHORT_QUEUE='fila-geral',SHORT_LIMIT=5;\nfunction sessionTitle(code){return code===SHORT_QUEUE?'Sessão curta de revisão':code}\nfunction validSession(s){\n if(!s||"
  },
  {
    "before": "||!deckList().some(x=>x.code===s.code)||",
    "after": "||(s.code!==SHORT_QUEUE&&!deckList().some(x=>x.code===s.code))||"
  },
  {
    "before": " if(!s.order.every(id=>INDEX.get(id)?.kind==='flashcard'&&INDEX.get(id).code===s.code))return false;",
    "after": " if(s.code===SHORT_QUEUE&&s.order.length>SHORT_LIMIT)return false;\n if(!s.order.every(id=>INDEX.get(id)?.kind==='flashcard'&&(s.code===SHORT_QUEUE||INDEX.get(id).code===s.code)))return false;"
  },
  {
    "before": " const deck=deckList().find(x=>x.code===code);\n if(!deck||!Array.isArray(order)||!order.length||new Set(order).size!==order.length||!order.every(id=>deck.cards.some(x=>x.id===id)))return false;",
    "after": " const deck=deckList().find(x=>x.code===code),short=code===SHORT_QUEUE;\n if(!Array.isArray(order)||!order.length||new Set(order).size!==order.length)return false;\n if(short?JSON.stringify(order)!==JSON.stringify(candidates('flashcard',SHORT_LIMIT).map(x=>x.id)):!deck||!order.every(id=>deck.cards.some(x=>x.id===id)))return false;"
  },
  {
    "before": "function deckStart(code,keyboard=false){",
    "after": "// Congela somente os primeiros cinco candidatos da fila original; não há novo ranking.\nfunction deckShortStart(keyboard=false){\n if(savedSession()?.status==='em_andamento')return false;\n const order=candidates('flashcard',SHORT_LIMIT).map(x=>x.id);\n return order.length?beginDeck(SHORT_QUEUE,order,keyboard):false;\n}\nfunction deckStart(code,keyboard=false){"
  },
  {
    "before": " return beginDeck(s.code,s.order,keyboard);",
    "after": " return s.code===SHORT_QUEUE?deckShortStart(keyboard):beginDeck(s.code,s.order,keyboard);"
  },
  {
    "before": "Sessão interrompida · '+esc(session.code)",
    "after": "Sessão interrompida · '+esc(sessionTitle(session.code))"
  },
  {
    "before": ">Revisar agora</button><button id=\"agu-deck-difficulties\"",
    "after": ">Revisar agora</button><button id=\"agu-deck-short\" type=\"button\" class=\"secondary\" '+(candidates('flashcard',1).length?'':'disabled ')+'onclick=\"AGUReview.deckShortStart(event.detail===0)\">Sessão curta (até 5)</button><button id=\"agu-deck-difficulties\""
  },
  {
    "before": "Fila geral de revisão; avaliar registra seu progresso.",
    "after": "Fila geral de revisão; avaliar registra seu progresso. A sessão curta fixa até cinco cartões disponíveis e permite retomar; não inclui questões oficiais."
  },
  {
    "before": "Existe uma sessão em andamento no assunto '+esc(session.code)",
    "after": "Existe uma sessão em andamento: '+esc(sessionTitle(session.code))"
  },
  {
    "before": " const deck=deckList().find(x=>x.code===s.code),vars=global.AGUDisciplines?.cssVars?.(s.code)||'';",
    "after": " const short=s.code===SHORT_QUEUE,card=INDEX.get(s.order[s.index]);\n const deck=short?{name:'Fila geral',title:'Sessão curta de revisão'}:deckList().find(x=>x.code===s.code),vars=global.AGUDisciplines?.cssVars?.(short?card.code:s.code)||'';"
  },
  {
    "before": "aria-label=\"Resumo do baralho\"><h2 tabindex=\"-1\" id=\"agu-deck-done\">Baralho concluído</h2>",
    "after": "aria-label=\"'+(short?'Resumo da sessão curta':'Resumo do baralho')+'\"><h2 tabindex=\"-1\" id=\"agu-deck-done\">'+(short?'Sessão curta concluída':'Baralho concluído')+'</h2>"
  },
  {
    "before": "<button class=\"primary\" type=\"button\" onclick=\"AGUReview.deckRepeat(event.detail===0)\">Reestudar a mesma seleção</button>",
    "after": "<button class=\"primary\" type=\"button\" '+(short&&!candidates('flashcard',1).length?'disabled ':'')+'onclick=\"AGUReview.deckRepeat(event.detail===0)\">'+(short?'Iniciar próxima sessão disponível':'Reestudar a mesma seleção')+'</button>"
  },
  {
    "before": "<h2>'+esc(deck.title)+'</h2><span class=\"agu-deck-code\">",
    "after": "<h2>'+esc(deck.title)+'</h2>'+(short?'<p class=\"small muted\">'+esc(deckList().find(d=>d.code===x.code)?.title||x.code)+'</p>':'')+'<span class=\"agu-deck-code\">"
  },
  {
    "before": "mergeBackupObject,deckStart,deckDecide",
    "after": "mergeBackupObject,deckStart,deckShortStart,deckDecide"
  },
  {
    "before": " focusAfter('#agu-deck-face, #agu-deck-next',keyboard);return true;\n}\nfunction deckPause",
    "after": " focusAfter(s.code===SHORT_QUEUE&&revealed&&!s.ratings[active.id]?'#agu-deck-rating-errei':'#agu-deck-face, #agu-deck-next',keyboard);return true;\n}\nfunction deckPause"
  },
  {
    "before": "  (!activeSession?'<div class=\"card agu-deck-quick-start\"><div class=\"btnrow\"><button id=\"agu-review-now\" type=\"button\" class=\"primary\" '+(candidates('flashcard',1).length?'':'disabled ')+'onclick=\"AGUReview.reviewNow(event.detail===0)\">Revisar agora</button><button id=\"agu-deck-short\" type=\"button\" class=\"secondary\" '+(candidates('flashcard',1).length?'':'disabled ')+'onclick=\"AGUReview.deckShortStart(event.detail===0)\">Sessão curta (até 5)</button><button id=\"agu-deck-difficulties\" type=\"button\" class=\"secondary\" onclick=\"AGUReview.deckDifficulties(event.detail===0)\">Minhas dificuldades</button></div><p class=\"small muted\">'+decks.reduce((n,d)=>n+d.overdue,0)+' vencidos · '+decks.reduce((n,d)=>n+d.todayDue,0)+' vencem hoje · '+decks.reduce((n,d)=>n+d.new,0)+' inéditos. Fila geral de revisão; avaliar registra seu progresso. A sessão curta fixa até cinco cartões disponíveis e permite retomar; não inclui questões oficiais.</p>'+(suggestion?'<p class=\"small muted\">Assunto sugerido pela fila original: <b>'+esc(suggestion.code)+' · '+esc(suggestion.title)+'</b>. <button id=\"agu-deck-suggested\" type=\"button\" class=\"secondary\" onclick=\"AGUReview.deckSuggested(event.detail===0)\">Estudar assunto sugerido</button></p>':'')+(!candidates('flashcard',1).length?'<p class=\"small muted\">Nenhum cartão disponível na fila agora. Escolha um baralho abaixo para estudo livre.</p>':'')+'</div>':'')+",
    "after": "  (!activeSession?'<div class=\"card agu-deck-quick-start\"><div class=\"btnrow\" style=\"margin-top:0;gap:8px\"><button id=\"agu-review-now\" type=\"button\" class=\"primary\" style=\"flex:1 1 108px;min-height:44px;padding:8px 10px\" '+(candidates('flashcard',1).length?'':'disabled ')+'onclick=\"AGUReview.reviewNow(event.detail===0)\">Revisar agora</button><button id=\"agu-deck-short\" type=\"button\" class=\"secondary\" style=\"flex:1 1 108px;min-height:44px;padding:8px 10px\" '+(candidates('flashcard',1).length?'':'disabled ')+'onclick=\"AGUReview.deckShortStart(event.detail===0)\">Sessão curta (até 5)</button><button id=\"agu-deck-difficulties\" type=\"button\" class=\"secondary\" style=\"flex:1 1 108px;min-height:44px;padding:8px 10px\" onclick=\"AGUReview.deckDifficulties(event.detail===0)\">Minhas dificuldades</button>'+(suggestion?'<button id=\"agu-deck-suggested\" type=\"button\" class=\"secondary\" style=\"flex:1 1 108px;min-height:44px;padding:8px 10px\" onclick=\"AGUReview.deckSuggested(event.detail===0)\">Estudar assunto sugerido</button>':'')+'<p class=\"small muted\" style=\"flex:0 0 100%;margin:0\">'+decks.reduce((n,d)=>n+d.overdue,0)+' vencidos · '+decks.reduce((n,d)=>n+d.todayDue,0)+' vencem hoje · '+decks.reduce((n,d)=>n+d.new,0)+' inéditos. '+(suggestion?'Assunto sugerido: <b>'+esc(suggestion.code)+' · '+esc(suggestion.title)+'</b>.':'Nenhum cartão disponível na fila agora. Escolha um baralho abaixo para estudo livre.')+'</p></div></div>':'')+"
  }
];
module.exports=source=>{
 source=require('./aud-ux-008-legado.cjs')(source);
 for(const c of [...changes].reverse()){
  assert.equal(source.split(c.after).length,2,'AUD-UX-007: somente o delta explícito, trecho único');
  source=source.replace(c.after,()=>c.before);
 }
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'1b3db88d9dda158fa9559c070e57d2b65215928bb6b86ef9933960e4e2789704','AUD-UX-007: somente o delta explícito; restituição byte a byte');
 return source;
};
