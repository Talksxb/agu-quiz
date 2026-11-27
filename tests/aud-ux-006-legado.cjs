'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto');
// AUD-UX-006: somente alterações explícitas; restituição da base SEG-001 byte a byte.
const changes=[
  {
    "before": "const REVIEW_STATES=Object.freeze(['todos','pendentes','vencidos','hoje','ineditos','futuros','sem_data']);",
    "after": "const REVIEW_STATES=Object.freeze(['todos','pendentes','vencidos','hoje','ineditos','futuros','sem_data','dificuldades']);"
  },
  {
    "before": "function matchesStatus(x,filter=deckFilters.status){\n const status=reviewState(x);",
    "after": "// AUD-UX-006: consulta o histórico existente; não modifica estágio ou agenda.\nfunction personalDifficulty(x){\n let latest=null,time=-Infinity;\n for(const a of state.attempts){\n  if(a?.kind!=='flashcard'||a.itemId!==x.id||!['errei','dificil','lembrei','facil'].includes(a.rating)||!dateIso(a.at))continue;\n  const t=Date.parse(a.at);if(t>=time){latest=a.rating;time=t}\n }\n return latest==='errei'||latest==='dificil';\n}\nfunction matchesStatus(x,filter=deckFilters.status){\n if(filter==='dificuldades')return personalDifficulty(x);\n const status=reviewState(x);"
  },
  {
    "before": "function deckMore(open){deckOptionsOpen=open===true}",
    "after": "// A sugestão deriva do primeiro candidato da fila original, sem novo ranking.\nfunction suggestedDeck(){\n const next=candidates('flashcard',1)[0];if(!next)return null;\n const deck=deckList().find(d=>d.code===next.code);if(!deck)return null;\n const status=reviewState(next);\n return {code:deck.code,title:deck.title,status:status==='vencidos'||status==='hoje'?'pendentes':status};\n}\nfunction deckSuggested(keyboard=false){\n const next=suggestedDeck();if(!next)return false;\n deckFilters={discipline:'todos',topic:next.code,difficulty:'todas',status:next.status};\n return deckStart(next.code,keyboard);\n}\nfunction deckDifficulties(keyboard=false){\n deckFilters={discipline:'todos',topic:'',difficulty:'todas',status:'dificuldades'};\n deckOptionsOpen=true;pendingDeck=null;\n global.render?.();focusAfter('#agu-deck-filter-status',keyboard);\n global.document?.querySelector?.('#agu-deck-filter-status')?.scrollIntoView?.({block:'nearest'});\n return true;\n}\nfunction deckMore(open){deckOptionsOpen=open===true}"
  },
  {
    "before": " const selectedCount=visible.reduce((n,deck)=>n+selectedCards(deck).length,0);\n const intro=",
    "after": " const selectedCount=visible.reduce((n,deck)=>n+selectedCards(deck).length,0);\n const suggestion=!activeSession?suggestedDeck():null;\n const intro="
  },
  {
    "before": "onclick=\"AGUReview.reviewNow(event.detail===0)\">Revisar agora</button></div><p class=\"small muted\">",
    "after": "onclick=\"AGUReview.reviewNow(event.detail===0)\">Revisar agora</button><button id=\"agu-deck-difficulties\" type=\"button\" class=\"secondary\" onclick=\"AGUReview.deckDifficulties(event.detail===0)\">Minhas dificuldades</button></div><p class=\"small muted\">"
  },
  {
    "before": "Fila geral de revisão; avaliar registra seu progresso.</p>'+(!candidates",
    "after": "Fila geral de revisão; avaliar registra seu progresso.</p>'+(suggestion?'<p class=\"small muted\">Assunto sugerido pela fila original: <b>'+esc(suggestion.code)+' · '+esc(suggestion.title)+'</b>. <button id=\"agu-deck-suggested\" type=\"button\" class=\"secondary\" onclick=\"AGUReview.deckSuggested(event.detail===0)\">Estudar assunto sugerido</button></p>':'')+(!candidates"
  },
  {
    "before": "['sem_data','Avaliados sem data']].map",
    "after": "['sem_data','Avaliados sem data'],['dificuldades','Última avaliação: Errei ou Difícil']].map"
  },
  {
    "before": "Níveis 2–4 preservam a escala cognitiva original;",
    "after": "“Minhas dificuldades” considera a última tentativa datada no histórico (Errei ou Difícil, inclusive importada); pode incluir revisão futura para estudo livre. Não é nível cognitivo nem altera a agenda. Níveis 2–4 preservam a escala cognitiva original;"
  },
  {
    "before": "deckFilter,deckMore,deckNotebook",
    "after": "deckFilter,deckMore,deckSuggested,deckDifficulties,deckNotebook"
  }
];
module.exports=source=>{
 for(const c of [...changes].reverse()){
  assert.equal(source.split(c.after).length,2,'AUD-UX-006: somente o delta explícito, trecho único');
  source=source.replace(c.after,c.before);
 }
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'98af35b88e323958511208fbf4c6778d2524104ccd0015b4020c5222bfb8b31d','AUD-UX-006: somente o delta explícito; restituição byte a byte');
 return source;
};
