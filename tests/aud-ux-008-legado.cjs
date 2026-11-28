'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto');
// AUD-UX-008: restauração exata do arquivo publicado após AUD-UX-007.
const changes=[
  {
    "before": "revealed=s.revealed||!!s.ratings[active.id];pick='';global.render?.();",
    "after": "revealed=s.revealed;pick='';global.render?.();"
  },
  {
    "before": "function reveal(keyboard=false){",
    "after": "// AUD-UX-008: alternar somente a face atual, sem avaliar ou alterar agenda.\nfunction deckHide(keyboard=false){\n const s=savedSession();\n if(currentMode!=='deck'||!active||!s||s.status!=='em_andamento'||s.order[s.index]!==active.id||!s.revealed)return false;\n if(!saveDeckSession({...s,revealed:false}))return false;\n revealed=false;global.render?.();focusAfter('#agu-deck-face',keyboard);return true;\n}\nfunction reveal(keyboard=false){"
  },
  {
    "before": "revealed=true;window.render();focusAfter(currentMode==='deck'?'#agu-deck-rating-errei':'button[onclick^=\"AGUReview.rate(\\'errei\\'\"]',keyboard);",
    "after": "revealed=true;window.render();focusAfter(currentMode==='deck'?(savedSession()?.ratings[active.id]?'#agu-deck-hide':'#agu-deck-rating-errei'):'button[onclick^=\"AGUReview.rate(\\'errei\\'\"]',keyboard);"
  },
  {
    "before": "rated=s.ratings[x.id],shown=s.revealed||!!rated;",
    "after": "rated=s.ratings[x.id],shown=s.revealed;"
  },
  {
    "before": "'+flashDetails(x)+'</div>':\n  '<button type=\"button\" id=\"agu-deck-face\"",
    "after": "'+flashDetails(x)+'<div class=\"btnrow\"><button id=\"agu-deck-hide\" type=\"button\" class=\"secondary\" style=\"min-height:44px\" onclick=\"AGUReview.deckHide(event.detail===0)\">Ocultar resposta</button></div></div>':\n  '<button type=\"button\" id=\"agu-deck-face\""
  },
  {
    "before": "deckResume,deckPause,deckMove,deckFilter",
    "after": "deckResume,deckPause,deckHide,deckMove,deckFilter"
  }
];
module.exports=source=>{
 source=require('./aud-ux-009-legado.cjs')(source);
 source=require('./fecha008-q7-legado.cjs')(source,'revisao-inteligente.js');
 for(const c of [...changes].reverse()){
  assert.equal(source.split(c.after).length,2,'AUD-UX-008: somente o delta explícito, trecho único');
  source=source.replace(c.after,()=>c.before);
 }
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'c76f362bd4fcf271344505e95e4c599191ffd5d4999efcd5b891fe09cbca1c1c','AUD-UX-008: somente o delta explícito; restituição byte a byte');
 return source;
};
