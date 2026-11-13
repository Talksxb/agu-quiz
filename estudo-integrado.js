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
function trackOfficial(qid,deviceId){
 const s=active(),q=(root.AGU_OFFICIAL_S18?.questions||[]).find(x=>x.id===qid);
 if(!s||!q||q.deviceId!==deviceId||s.deviceId!==deviceId)return false;
 if(!Array.isArray(s.questionsSeen))s.questionsSeen=[];
 if(!s.questionsSeen.includes(qid))s.questionsSeen.push(qid);
 s.stage='questoes';s.updatedAt=now();persist();return true;
}
function onRated(e){
 const s=active();
 if(!s||!e?.attemptId||!(s.cardsSeen.includes(e.itemId)||(s.questionsSeen||[]).includes(e.itemId))||s.attemptIds.includes(e.attemptId))return false;
 if(root.AGUReview?.reviewInfo(e.itemId)?.code!==s.topic)return false;
 s.attemptIds.push(e.attemptId);s.stage='revisao';s.updatedAt=now();persist();return true
}
function finish(){const s=active();if(!s)return false;s.status='concluida';s.completedAt=now();s.updatedAt=s.completedAt;state.activeId=null;persist();return true}
function validateSession(x,ids){
 if(!x||typeof x!=='object'||typeof x.id!=='string'||!/^ags-[a-zA-Z0-9-]+$/.test(x.id)||x.id.length>130||ids.has(x.id)||!clauses().has(x.deviceId))return false;
 if(!['em_andamento','concluida'].includes(x.status)||!stages.includes(x.stage)||typeof x.topic!=='string'||x.topic!==clauses().get(x.deviceId).article.topic)return false;
 if(typeof x.createdAt!=='string'||typeof x.updatedAt!=='string'||!Array.isArray(x.notes)||!Array.isArray(x.cardsSeen)||!Array.isArray(x.attemptIds))return false;
 if(x.notes.length>3000||x.cardsSeen.length>3000||x.attemptIds.length>3000)return false;
 for(const list of [x.notes,x.cardsSeen,x.attemptIds])if(list.some(z=>typeof z!=='string'||z.length>140)||new Set(list).size!==list.length)return false;
 ids.add(x.id);return true;
}
function exportBackup(){return JSON.stringify({schema:'agu-integrated-backup-v1',exportedAt:now(),data:state},null,2)}
function importBackup(raw){
 const object=typeof raw==='string'?JSON.parse(raw):raw;
 if(object?.schema!=='agu-integrated-backup-v1'||object.data?.schema!==VERSION||!Array.isArray(object.data.sessions)||object.data.sessions.length>3000)throw Error('Formato ou tamanho inválido.');
 const ids=new Set();for(const session of object.data.sessions)if(!validateSession(session,ids))throw Error('Sessão ou ID inválido no backup.');
 let added=0,skipped=0;const existing=new Set(state.sessions.map(x=>x.id));
 for(const x of object.data.sessions){if(existing.has(x.id)){skipped++;continue}state.sessions.push({...x});existing.add(x.id);added++}
 if(added)persist();return {added,skipped};
}
function download(){const blob=new Blob([exportBackup()],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='AGU_Sessoes_Integradas_backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)}
function readFile(input){
 const file=input.files?.[0];if(!file)return;if(file.size>3000000){alert('Backup acima do limite de 3 MB.');return}
 file.text().then(raw=>{try{const parsed=JSON.parse(raw);if(!confirm('Importar apenas sessões novas, preservando os dados atuais?'))return;const result=importBackup(parsed);alert(result.added+' sessão(ões) importada(s); '+result.skipped+' já existentes.');root.render?.()}catch(e){alert('Backup rejeitado: '+e.message)}}).catch(()=>alert('Falha ao ler o arquivo.'));
}
function orphans(session){
 const notes=new Set((root.AGUCaderno?.peek()?.records||[]).map(x=>x.id));
 const cards=new Set((root.AGUReview?.availableForTopic(session.topic)||[]).map(x=>x.id));
 // A tentativa continua no histórico original; não copiar seu corpo para a sessão.
 return {notes:session.notes.filter(id=>!notes.has(id)),cards:session.cardsSeen.filter(id=>!cards.has(id))};
}

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
 const missing=orphans(s);
 if(missing.notes.length||missing.cards.length)out+='<div class="agu-notice">Referências antigas não encontradas: '+missing.notes.length+' nota(s), '+missing.cards.length+' cartão(ões). O histórico da sessão foi preservado, sem conteúdo inventado.</div>';
 out+='<p class="agu-muted">Sessão '+esc(s.createdAt.slice(0,10))+' · '+s.notes.length+' registro(s) associados · '+s.attemptIds.length+' avaliação(ões) · Etapa: '+esc(names[s.stage])+'</p>';
 out+='<div class="agu-tabs">'+stages.map(k=>'<button aria-pressed="'+(s.stage===k)+'" onclick="AGUStudy.goto(\''+k+'\')">'+esc(names[k])+'</button>').join('')+'</div>';
 if(s.stage==='norma')out+='<div class="agu-notice"><b>'+esc(item.label)+'</b><p>'+esc(item.text)+'</p><a href="'+esc(item.law.source)+'" target="_blank" rel="noopener noreferrer">Conferir fonte oficial</a></div><button class="agu-primary" onclick="AGUStudy.goto(\'caderno\')">Continuar para Caderno</button>';
 if(s.stage==='caderno'){
  const notes=root.AGUCaderno?.list(deviceId)||[];
  out+='<p>Crie sua hipótese, objeção ou aplicação na aba Caderno, mantendo este dispositivo selecionado. Depois vincule registros já salvos à sessão.</p><button class="agu-light" onclick="AGULegal.tab(\'caderno\')">Abrir Caderno</button><button class="agu-light" onclick="AGUStudy.collect()">Vincular registros existentes</button><p class="agu-muted">Registros disponíveis: '+notes.length+' · associados: '+s.notes.length+'</p><button class="agu-primary" onclick="AGUStudy.goto(\'questoes\')">Continuar</button>';
 }
 if(s.stage==='questoes'){
  const questions=(root.AGU_OFFICIAL_S18?.questions||[]).filter(x=>x.deviceId===deviceId&&x.key&&x.historicReason&&x.currentReason&&x.status==='gabarito_definitivo');
  out+=questions.length?'<p>'+questions.length+' questão(ões) com caderno, gabarito e fundamento verificados pontualmente. Consulte Questões para responder.</p><button class="agu-light" onclick="AGULegal.tab(\'questoes\')">Consultar questões</button>':'<div class="agu-notice">Ainda não há questão oficial inteiramente reconciliada com este dispositivo. Não será inventado enunciado nem gabarito.</div>';
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
 out+='<div class="agu-ctx-box"><b>Backup de sessões</b><p class="agu-muted">Exportação separada dos dados do Caderno e dos resultados da Revisão Inteligente.</p><button class="agu-light" onclick="AGUStudy.download()">Exportar sessões</button><button class="agu-light" onclick="document.getElementById(\'agu-session-import\').click()">Importar sessões</button><input id="agu-session-import" class="hidden" type="file" accept="application/json,.json" onchange="AGUStudy.readFile(this)"></div>';
 out+='<hr><button class="agu-light" onclick="AGUStudy.close()">Encerrar esta sessão</button><p class="agu-muted">Encerrar não registra horas nem certifica o tema; respostas e Caderno permanecem nos módulos originais.</p>';
 return out
}
function begin(d){if(start(d))root.render?.()}
function open(id){if(resume(id))root.render?.()}
function goto(v){if(stage(v))root.render?.()}
function pick(id){if(focus(id))root.render?.()}
function collect(){syncNotes();root.render?.()}
function close(){if(finish())root.render?.()}
root.AGUStudy={html,start,resume,stage,focus,trackOfficial,onRated,attachNote,syncNotes,finish,sessionsFor,active,orphans,exportBackup,importBackup,download,readFile,peek:()=>JSON.parse(JSON.stringify(state)),begin,open,goto,pick,collect,close};
})(window);
