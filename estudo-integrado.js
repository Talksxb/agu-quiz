/* AGU Quiz Sprint 16 — sessão integrada por dispositivo, local-only. */
(function(root){
'use strict';
const KEY='agu_estudo_integrado_s16_v1',VERSION='agu-integrated-study-v1';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const names={norma:'Leitura normativa',caderno:'Caderno AGU',questoes:'Questões verificadas',flashcards:'Flashcards',revisao:'Avaliação e revisão'};
const stages=Object.keys(names),now=()=>new Date().toISOString();
const clauses=()=>new Map((root.AGU_LEGAL_CORPUS?.laws||[]).flatMap(l=>l.articles.flatMap(a=>a.clauses.map(c=>[c.id,{...c,article:a,law:l}]))));
const blank=()=>({schema:VERSION,createdAt:now(),sessions:[],activeId:null});
let state=blank();
try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v?.schema===VERSION&&Array.isArray(v.sessions))state=v}catch(_){}
function persist(){localStorage.setItem(KEY,JSON.stringify(state))}
function id(){return 'ags-'+(typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+'-'+Math.random().toString(36).slice(2))}
function active(){return state.sessions.find(s=>s.id===state.activeId)||null}
function sessionsFor(deviceId){return state.sessions.filter(s=>s.deviceId===deviceId).sort((a,b)=>b.createdAt.localeCompare(a.createdAt))}
function start(deviceId){
 const target=clauses().get(deviceId);if(!target)return false;
 let s=state.sessions.find(x=>x.deviceId===deviceId&&x.status==='em_andamento');
 if(!s){s={id:id(),deviceId,topic:target.article.topic,status:'em_andamento',stage:'norma',createdAt:now(),updatedAt:now(),notes:[],attemptIds:[],cardsSeen:[],completedAt:null};state.sessions.push(s)}
 state.activeId=s.id;persist();return s
}
function resume(id){const s=state.sessions.find(x=>x.id===id&&x.status==='em_andamento');if(!s)return false;state.activeId=s.id;persist();return true}
function stage(step){const s=active();if(!s||!stages.includes(step))return false;s.stage=step;s.updatedAt=now();persist();return true}
function attachNote(noteId){
 const s=active(),note=root.AGUCaderno?.peek()?.records?.find(x=>x.id===noteId);
 if(!s||!note||note.deviceId!==s.deviceId||s.notes.includes(noteId))return false;
 s.notes.push(noteId);s.updatedAt=now();persist();return true
}
function syncNotes(){const s=active();if(!s)return 0;let n=0;for(const r of root.AGUCaderno?.list(s.deviceId)||[])if(attachNote(r.id))n++;return n}
function focus(cardId){
 const s=active();if(!s)return false;
 if(!(root.AGUReview?.availableForTopic(s.topic)||[]).some(x=>x.id===cardId))return false;
 if(!root.AGUReview.focusCard(cardId))return false;
 if(!s.cardsSeen.includes(cardId))s.cardsSeen.push(cardId);
 s.stage='flashcards';s.updatedAt=now();persist();return true
}
function onRated(e){
 const s=active();
 if(!s||!e?.attemptId||!s.cardsSeen.includes(e.itemId)||s.attemptIds.includes(e.attemptId))return false;
 if(root.AGUReview?.reviewInfo(e.itemId)?.code!==s.topic)return false;
 s.attemptIds.push(e.attemptId);s.stage='revisao';s.updatedAt=now();persist();return true
}
function finish(){const s=active();if(!s)return false;s.status='concluida';s.completedAt=now();s.updatedAt=s.completedAt;state.activeId=null;persist();return true}
function html(deviceId){
 const item=clauses().get(deviceId),s=active();
 if(!item)return '<div class="agu-notice">Dispositivo não encontrado.</div>';
 const prior=sessionsFor(deviceId);
 let out='<div class="agu-notice"><b>Estudo integrado · '+esc(item.article.label)+' / '+esc(item.label)+'</b><p class="agu-muted">Somente atividades efetivamente registradas contam como realizadas; abrir uma etapa não registra horas ou domínio.</p></div>';
 if(!s||s.deviceId!==deviceId||s.status!=='em_andamento'){
  out+='<button class="agu-primary" onclick="AGUStudy.begin(\''+esc(deviceId)+'\')">Iniciar / retomar estudo deste dispositivo</button>';
  out+=prior.map(x=>'<div class="agu-notice">'+esc(x.status)+' · '+esc(x.createdAt.slice(0,10))+' · '+x.notes.length+' notas · '+x.attemptIds.length+' avaliações'+(x.status==='em_andamento'?'<button class="agu-light" onclick="AGUStudy.open(\''+esc(x.id)+'\')">Retomar sessão</button>':'')+'</div>').join('');
  return out;
 }
 out+='<p class="agu-muted">Sessão '+esc(s.createdAt.slice(0,10))+' · '+s.notes.length+' registro(s) associados · '+s.attemptIds.length+' avaliação(ões) · Etapa: '+esc(names[s.stage])+'</p>';
 out+='<div class="agu-tabs">'+stages.map(k=>'<button aria-pressed="'+(s.stage===k)+'" onclick="AGUStudy.goto(\''+k+'\')">'+esc(names[k])+'</button>').join('')+'</div>';
 if(s.stage==='norma')out+='<div class="agu-notice"><b>'+esc(item.label)+'</b><p>'+esc(item.text)+'</p><a href="'+esc(item.law.source)+'" target="_blank" rel="noopener noreferrer">Conferir fonte oficial</a></div><button class="agu-primary" onclick="AGUStudy.goto(\'caderno\')">Continuar para Caderno</button>';
 if(s.stage==='caderno'){
  const notes=root.AGUCaderno?.list(deviceId)||[];
  out+='<p>Crie sua hipótese, objeção ou aplicação na aba Caderno, mantendo este dispositivo selecionado. Depois vincule registros já salvos à sessão.</p><button class="agu-light" onclick="AGULegal.tab(\'caderno\')">Abrir Caderno</button><button class="agu-light" onclick="AGUStudy.collect()">Vincular registros existentes</button><p class="agu-muted">Registros disponíveis: '+notes.length+' · associados: '+s.notes.length+'</p><button class="agu-primary" onclick="AGUStudy.goto(\'questoes\')">Continuar</button>';
 }
 if(s.stage==='questoes'){
  const questions=(root.AGU_LEGAL_RELATIONS?.entries||[]).filter(x=>x.deviceId===deviceId&&x.kind==='questao'&&x.sourceStatus==='confirmado'&&x.gabaritoDefinitivo&&x.legalReason);
  out+=questions.length?'<p>'+questions.length+' questão(ões) documentalmente reconciliada(s). Consulte a aba Questões para conferir a fonte.</p><button class="agu-light" onclick="AGULegal.tab(\'questoes\')">Consultar questões</button>':'<div class="agu-notice">Ainda não há questão oficial inteiramente reconciliada com este dispositivo. Não será inventado enunciado nem gabarito.</div>';
  out+='<button class="agu-primary" onclick="AGUStudy.goto(\'flashcards\')">Continuar para flashcards</button>';
 }
 if(s.stage==='flashcards'){
  const cards=root.AGUReview?.availableForTopic(s.topic)||[];
  out+='<p class="agu-muted">Cartões do tópico '+esc(s.topic)+' — associação temática, não necessariamente ao inciso.</p>';
  const focused=root.AGUReview?.focusedHTML?.()||'';
  if(focused)out+=focused;
  else out+=cards.length?cards.map(x=>'<div class="agu-notice"><b>'+esc(x.front)+'</b><p class="agu-muted">'+esc(x.validation)+' · revisão '+esc(x.due||'inédito')+'</p><button class="agu-light" onclick="AGUStudy.pick(\''+esc(x.id)+'\')">Estudar cartão</button></div>').join(''):'<div class="agu-notice">Nenhum cartão encontrado para este tópico.</div>';
  out+='<button class="agu-light" onclick="AGUStudy.goto(\'revisao\')">Consultar revisões</button>';
 }
 if(s.stage==='revisao'){
  const cards=(root.AGUReview?.availableForTopic(s.topic)||[]).filter(x=>s.cardsSeen.includes(x.id));
  out+='<div class="agu-notice"><b>Avaliações efetivas: '+s.attemptIds.length+'</b><p>Revisões são agendadas pelo mecanismo original; não criamos agendamentos paralelos.</p></div>';
  out+=cards.map(x=>'<p class="agu-muted">'+esc(x.front)+' · '+esc(x.seen)+' avaliação(ões) · próxima: '+esc(x.due||'não agendada')+'</p>').join('')||'<p class="agu-muted">Nenhum flashcard avaliado nesta sessão.</p>';
  out+='<button class="agu-light" onclick="AGUStudy.goto(\'flashcards\')">Voltar aos flashcards</button>';
 }
 out+='<hr><button class="agu-light" onclick="AGUStudy.close()">Encerrar esta sessão</button><p class="agu-muted">Encerrar não registra horas nem certifica o tema; respostas e Caderno permanecem nos módulos originais.</p>';
 return out
}
function begin(d){if(start(d))root.render?.()}
function open(id){if(resume(id))root.render?.()}
function goto(v){if(stage(v))root.render?.()}
function pick(id){if(focus(id))root.render?.()}
function collect(){syncNotes();root.render?.()}
function close(){if(finish())root.render?.()}
root.AGUStudy={html,start,resume,stage,focus,onRated,attachNote,syncNotes,finish,sessionsFor,active,peek:()=>JSON.parse(JSON.stringify(state)),begin,open,goto,pick,collect,close};
})(window);
