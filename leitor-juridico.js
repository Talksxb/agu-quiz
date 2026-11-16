/* AGU Quiz | Sprint 13 - Leitor Jurídico */
(function(root){
'use strict';
const C=root.AGU_LEGAL_CORPUS;
const KEY='agu_leitor_juridico_s13_v1';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const laws=C?.laws||[];
const articles=laws.flatMap(l=>l.articles.map(a=>({...a,law:l})));
const byId=new Map(articles.map(a=>[a.id,a]));
const byUnit=new Map(articles.flatMap(a=>a.clauses.map(c=>[c.id,{article:a,clause:c}])));
const defaults=()=>({article:articles[0]?.id||'',unit:articles[0]?.clauses[0]?.id||'',tab:'juris',mobile:'text',notes:{}});
let state=defaults();
try{const prior=JSON.parse(localStorage.getItem(KEY)||'null');if(prior&&typeof prior==='object'&&prior.notes&&typeof prior.notes==='object')state={...state,...prior}}catch(_){}
if(!byId.has(state.article)){state=defaults()}
if(!byId.get(state.article)?.clauses.some(c=>c.id===state.unit))state.unit=byId.get(state.article)?.clauses[0]?.id;
const tabs=[['juris','Jurisprudência'],['questoes','Questões'],['caderno','Caderno'],['flashcards','Flashcards'],['comentarios','Comentários'],['estudo','Estudo integrado'],['para_caderno','Para meu caderno']];
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
// LEG07: campo opcional na categoria legada, sem migrar ou reescrever perfis anteriores.
const NOTEBOOK_MAX=300,NOTEBOOK_TEXT_MAX=450;
let notebookTopic='todos',notebookStatus='pendente',editingNotebook=null,notebookMessage='';
function notebookItems(){return Array.isArray(state.forNotebook)?state.forNotebook:[]}
function notebookValid(items){
 if(!Array.isArray(items)||items.length>NOTEBOOK_MAX)return false;
 const ids=new Set();
 return items.every(x=>{
  const date=typeof x?.createdAt==='string'&&Number.isFinite(Date.parse(x.createdAt));
  if(!x||!/^pc-[a-zA-Z0-9-]{8,130}$/.test(x.id||'')||ids.has(x.id)||!date||!['pendente','anotado','dispensado'].includes(x.status)||typeof x.prompt!=='string'||!x.prompt.trim()||x.prompt.length>NOTEBOOK_TEXT_MAX)return false;
  if(x.origin==='leitor'){
   const ref=byUnit.get(x.unitId);
   if(!ref||x.lawId!==ref.article.law.id||x.articleId!==ref.article.id||x.topic!==(ref.article.topic||null))return false;
  }else if(x.origin==='estudo_integrado'){
   // LEG09: referência à sessão existente, não uma nova referência normativa presumida.
   const ref=byUnit.get(x.deviceId);
   if(!ref||!ref.article.topic||x.topic!==ref.article.topic||x.lawId!==null||x.articleId!==null||x.unitId!==null||typeof x.sessionId!=='string'||!/^ags-[a-zA-Z0-9-]+$/.test(x.sessionId)||x.sessionId.length>130)return false;
  }else if(x.origin==='questao_verificada'){
   // Referência histórica de questão realmente auditada, sem pressupor dispositivo jurídico específico.
   const ref=root.AGUQuestions18?.notebookHistoricReference?.(x.questionId);
   if(!ref||x.questionLabel!==ref.label||x.topic!==ref.topic||x.lawId!==null||x.articleId!==null||x.unitId!==null)return false;
  }else if(x.origin==='flashcard_existente'){
   const ref=root.AGUReview?.notebookHistoricCard?.(x.cardId);
   if(!ref||x.cardLabel!==ref.label||x.topic!==ref.topic||x.lawId!==null||x.articleId!==null||x.unitId!==null)return false;
  }else return false;
  ids.add(x.id);return true;
 });
}
function notebookCommit(items,confirmation,renderAfter=true){
 if(!notebookValid(items)){notebookMessage='Dados inconsistentes. Preserve seu backup e não altere as marcações.';if(renderAfter)root.render?.();return false}
 const next={...state,forNotebook:items};
 try{localStorage.setItem(KEY,JSON.stringify(next))}catch(_){notebookMessage='Não foi possível salvar neste navegador. Os dados anteriores foram preservados.';if(renderAfter)root.render?.();return false}
 state=next;notebookMessage=confirmation;if(renderAfter)root.render?.();return true;
}
function notebookId(){
 const id=root.crypto?.randomUUID?.();
 return 'pc-'+(id||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,13));
}
function notebookSave(){
 const field=document.getElementById('agu-caderno-brief'),prompt=field?.value.trim()||'';
 if(!prompt||prompt.length>NOTEBOOK_TEXT_MAX){notebookMessage='Escreva uma pergunta ou ponto breve (até 450 caracteres).';root.render?.();focusAfter('#agu-caderno-brief',true);return false}
 const old=notebookItems();
 if(!notebookValid(old)){notebookMessage='Marcações existentes inconsistentes. Preserve o backup antes de continuar.';root.render?.();return false}
 const edited=old.find(x=>x.id===editingNotebook);
 const ref=byUnit.get(state.unit);
 if(!ref&&!edited)return false;
 if(!edited&&old.length>=NOTEBOOK_MAX){notebookMessage='Limite de 300 marcações atingido. Nenhum dado foi substituído.';root.render?.();return false}
 const item=edited?{...edited,prompt}:{id:notebookId(),lawId:ref.article.law.id,articleId:ref.article.id,unitId:state.unit,topic:ref.article.topic||null,origin:'leitor',prompt,createdAt:new Date().toISOString(),status:'pendente'};
 if(notebookCommit(edited?old.map(x=>x.id===edited.id?item:x):[...old,item],edited?'Marcação atualizada.':'Pendente registrada para seu caderno físico.')){editingNotebook=null;focusAfter('#agu-caderno-brief',true);return true}
 return false;
}
function notebookSaveStudy(prompt){
 const session=root.AGUStudy?.active?.(),ref=byUnit.get(session?.deviceId);
 if(!session||session.status!=='em_andamento'||!ref?.article.topic||session.topic!==ref.article.topic||!/^ags-[a-zA-Z0-9-]+$/.test(session.id||'')||session.id.length>130)return false;
 if(typeof prompt!=='string'||!prompt.trim()||prompt.trim().length>NOTEBOOK_TEXT_MAX)return false;
 const old=notebookItems();if(!notebookValid(old)||old.length>=NOTEBOOK_MAX)return false;
 const item={id:notebookId(),lawId:null,articleId:null,unitId:null,deviceId:session.deviceId,sessionId:session.id,topic:session.topic,origin:'estudo_integrado',prompt:prompt.trim(),createdAt:new Date().toISOString(),status:'pendente'};
 return notebookCommit([...old,item],'Pendente de estudo registrada para o caderno físico.',false);
}
function notebookSaveQuestion(id,prompt){
 const q=root.AGUQuestions18?.notebookEligible?.(id),ref=root.AGUQuestions18?.notebookHistoricReference?.(id);
 if(!q||!ref||typeof prompt!=='string'||!prompt.trim()||prompt.trim().length>NOTEBOOK_TEXT_MAX)return false;
 const old=notebookItems();if(!notebookValid(old)||old.length>=NOTEBOOK_MAX)return false;
 const item={id:notebookId(),lawId:null,articleId:null,unitId:null,questionId:id,questionLabel:ref.label,
  topic:ref.topic,origin:'questao_verificada',prompt:prompt.trim(),createdAt:new Date().toISOString(),status:'pendente'};
 return notebookCommit([...old,item],'Pendente de questão verificada registrada.',false);
}
function notebookSaveCard(id,prompt){
 const card=root.AGUReview?.notebookEligibleCard?.(id),ref=root.AGUReview?.notebookHistoricCard?.(id);
 if(!card||!ref||typeof prompt!=='string'||!prompt.trim()||prompt.trim().length>NOTEBOOK_TEXT_MAX)return false;
 const old=notebookItems();if(!notebookValid(old)||old.length>=NOTEBOOK_MAX)return false;
 const item={id:notebookId(),lawId:null,articleId:null,unitId:null,cardId:id,cardLabel:ref.label,
  topic:ref.topic,origin:'flashcard_existente',prompt:prompt.trim(),createdAt:new Date().toISOString(),status:'pendente'};
 return notebookCommit([...old,item],'Pendente de flashcard registrada.',false);
}
function notebookFilter(kind,value){if(kind==='tema')notebookTopic=value;else if(kind==='estado')notebookStatus=value;else return;root.render?.();focusAfter(kind==='tema'?'#agu-caderno-filter-topic':'#agu-caderno-filter-status')}
function notebookEdit(id){if(!notebookItems().some(x=>x.id===id))return;editingNotebook=id;state.tab='para_caderno';state.mobile='related';root.render?.();focusAfter('#agu-caderno-brief',true)}
function notebookCancel(){editingNotebook=null;root.render?.();focusAfter('#agu-caderno-brief',true)}
function notebookSetStatus(id,status){
 if(!['pendente','anotado','dispensado'].includes(status))return false;
 const old=notebookItems();if(!old.some(x=>x.id===id))return false;
 if(notebookCommit(old.map(x=>x.id===id?{...x,status}:x),'Estado alterado manualmente para '+status+'.')){focusAfter('#agu-caderno-list',true);return true}
 return false;
}
function notebookStudySession(x){
 if(x?.origin!=='estudo_integrado')return null;
 const s=root.AGUStudy?.peek?.()?.sessions?.find(y=>y.id===x.sessionId);
 const ref=byUnit.get(x.deviceId);
 return s?.status==='em_andamento'&&s.deviceId===x.deviceId&&s.topic===x.topic&&ref?.article.topic===x.topic?s:null;
}
function notebookCanOpenOrigin(id){
 const x=notebookItems().find(y=>y.id===id);
 if(x?.origin==='estudo_integrado')return !!notebookStudySession(x);
 if(x?.origin==='questao_verificada')return !!root.AGUQuestions18?.notebookEligible?.(x.questionId);
 if(x?.origin==='flashcard_existente')return !!root.AGUReview?.notebookEligibleCard?.(x.cardId);
 const ref=byUnit.get(x?.unitId);
 return !!(x&&ref&&ref.article.law.id===x.lawId&&ref.article.id===x.articleId);
}
function notebookOrigin(id){
 const mark=notebookItems().find(y=>y.id===id);
 if(mark?.origin==='flashcard_existente'){
  if(!notebookCanOpenOrigin(id))return false;
  if(root.history?.replaceState&&new URLSearchParams(root.location?.search||'').get('abrir')==='lei')
   root.history.replaceState(null,'',root.location?.pathname||'/agu-quiz/');
  return root.AGUReview?.notebookOpenCard?.(mark.cardId,true)===true;
 }
 if(mark?.origin==='questao_verificada'){
  if(!notebookCanOpenOrigin(id)||!root.AGUQuestions18?.openFromNotebook?.(mark.questionId))return false;
  const q=root.AGUQuestions18.notebookEligible(mark.questionId),ref=byUnit.get(q.deviceId);
  if(!ref)return false;
  state.article=ref.article.id;state.unit=q.deviceId;state.tab='questoes';state.mobile='related';save();
  if(root.history?.replaceState)root.history.replaceState(null,'','?abrir=lei&norma='+encodeURIComponent(ref.article.law.id)+'&dispositivo='+encodeURIComponent(q.deviceId));
  if(typeof root.setView==='function')root.setView('legal');else root.render?.();
  focusAfter('#agu-question-context',true);return true;
 }
 if(mark?.origin==='estudo_integrado'){
  if(!notebookStudySession(mark)||!root.AGUStudy?.resume?.(mark.sessionId))return false;
  const ref=byUnit.get(mark.deviceId);
  state.article=ref.article.id;state.unit=mark.deviceId;state.tab='estudo';state.mobile='related';save();
  if(root.history?.replaceState)root.history.replaceState(null,'','?abrir=lei&norma='+encodeURIComponent(ref.article.law.id)+'&dispositivo='+encodeURIComponent(mark.deviceId));
  root.render?.();focusAfter('#agu-reader [data-agu-study-stage="'+root.AGUStudy.active().stage+'"]',true);return true;
 }
 const x=notebookItems().find(y=>y.id===id),ref=byUnit.get(x?.unitId);
 if(!x||!ref||ref.article.law.id!==x.lawId||ref.article.id!==x.articleId)return false;
 state.article=x.articleId;state.unit=x.unitId;state.mobile='text';save();
 if(root.history?.replaceState)root.history.replaceState(null,'','?abrir=lei&norma='+encodeURIComponent(x.lawId)+'&dispositivo='+encodeURIComponent(x.unitId));
 root.render?.();focusAfter('#agu-reader .agu-unit.selected',true);return true;
}
function current(){return byId.get(state.article)||articles[0]}
function structureLabel(a){return (a.structurePath||[]).map(id=>a.law.structure?.find(n=>n.id===id)?.label).filter(Boolean).join(' › ')||a.law.section}
function focusAfter(selector,reveal=false){if(typeof document!=='undefined')document.querySelector?.(selector)?.focus?.({preventScroll:!reveal})}
function article(id,restoreKeyboardFocus=false){const a=byId.get(id);if(!a)return;state.article=id;state.unit=a.clauses[0].id;state.mobile='text';save();root.render?.();if(restoreKeyboardFocus){const narrow=root.matchMedia?.('(max-width:850px)')?.matches;focusAfter(narrow?'#agu-reader .agu-document h2':'#agu-reader .agu-index-entry.selected',true)}}
function openLaw(id,restart=true){const law=laws.find(l=>l.id===id);if(!law)return false;if(!restart&&current()?.law.id===id)return true;article(law.articles[0].id,true);return true}
function showLawPicker(){
 if(root.matchMedia?.('(max-width:850px)')?.matches){state.mobile='index';save();root.render?.()}
 const picker=typeof document!=='undefined'?document.getElementById('agu-law-picker'):null;
 if(picker){picker.open=true;picker.querySelector('summary')?.focus?.({preventScroll:false})}
}
function gotoArticle(value){
 const raw=String(value||'').trim(),number=raw.replace(/^art(?:igo)?\.\s*/i,'').replace(/º|\.$/g,'').replace(/\s/g,'');
 const id=current()?.law.id+':art'+number.replace(/\./g,'');
 const found=byId.get(id);
 if(found&&found.law.id===current()?.law.id){article(id,true);return true}
 const message=typeof document!=='undefined'?document.getElementById('agu-law-jump-feedback'):null;
 if(message)message.textContent='Artigo não encontrado nesta norma. Confira o número, inclusive o sufixo, se houver.';
 return false;
}
function chapter(id){const a=articles.find(a=>a.structurePath?.includes(id));if(a)article(a.id,true)}
function boundary(last=false){const a=current(),list=a.law.articles;article(list[last?list.length-1:0].id,true)}
function unit(id,restoreKeyboardFocus=false){const x=byUnit.get(id);if(!x)return;state.article=x.article.id;state.unit=id;save();root.render?.();if(restoreKeyboardFocus)focusAfter('#agu-reader .agu-unit.selected')}
function tab(t,restoreKeyboardFocus=false){if(!tabs.some(x=>x[0]===t))return;state.tab=t;state.mobile='related';save();root.render?.();if(restoreKeyboardFocus)focusAfter('#agu-reader .agu-tabs button[aria-pressed="true"]')}
function mobile(t,restoreKeyboardFocus=false){const panels=['index','text','related'];if(!panels.includes(t))return;state.mobile=t;save();root.render?.();if(restoreKeyboardFocus&&typeof document!=='undefined')document.querySelectorAll?.('#agu-reader .agu-mobile button')?.[panels.indexOf(t)]?.focus?.({preventScroll:true})}
function step(n,restoreKeyboardFocus=false){const law=current()?.law,list=law?.articles||[];const i=list.findIndex(a=>a.id===state.article);if(i<0||i+n<0||i+n>=list.length)return false;article(list[i+n].id);if(restoreKeyboardFocus&&typeof document!=='undefined'){const btn=document.querySelector?.('#agu-reader .agu-document .agu-step-'+(n<0?'prev':'next'))||document.querySelectorAll?.('#agu-reader .agu-document button.agu-light')?.[n<0?0:1];if(btn&&!btn.disabled)btn.focus?.({preventScroll:false});else focusAfter('#agu-reader .agu-document h2',true)}return true}
function note(restoreKeyboardFocus=false){const e=document.getElementById('agu-legal-note');if(!e)return;state.notes[state.unit]=e.value.slice(0,14000);save();root.render?.();if(restoreKeyboardFocus)focusAfter('#agu-save-note',true)}
function exportData(){const b=new Blob([JSON.stringify({schema:'agu-reader-backup-v1',data:state},null,2)],{type:'application/json'});const u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download='AGU_Leitor_Comentarios.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),2000)}
function filter(v){const term=String(v).toLowerCase().trim();document.querySelectorAll('#agu-reader .agu-index-entry').forEach(el=>el.hidden=!el.dataset.search.includes(term))}
function getRelations(){
 const raw=root.AGU_LEGAL_RELATIONS?.entries||[];
 const valid=new Set(byUnit.keys());
 const unique=new Set();
 return raw.filter(x=>{
  if(!x||!valid.has(x.deviceId)||!['norma','jurisprudencia','questao'].includes(x.kind)||!x.url?.startsWith('https://')||!['confirmado','parcial','pendente'].includes(x.sourceStatus))return false;
  const key=x.deviceId+'|'+x.kind+'|'+x.localizer;
  if(unique.has(key))return false;unique.add(key);return true;
 });
}
function relationCard(x){
 const status=x.sourceStatus==='confirmado'?'Confirmado pontualmente':x.sourceStatus==='parcial'?'Parcial · revalidar':'Pendente · não validado';
 return '<article class="agu-notice"><b>'+esc(x.title)+'</b><p>'+esc(x.summary)+'</p><p class="agu-muted">'+esc(x.localizer)+' · '+esc(x.topic)+'</p>'+
 (x.tribunal?'<p class="agu-muted">Tribunal: '+esc(x.tribunal)+' · '+esc(x.processo)+' · julgamento: '+esc(x.julgamento||'não informado')+' · publicação: '+esc(x.publicacao||'não verificada')+' · '+esc(x.precedentType||'classe pendente')+'</p>':'')+
 '<p class="agu-muted">Fonte: '+esc(x.sourceLot)+' · '+status+' · vínculo: '+esc(x.relationship)+' · consulta '+esc(x.verifiedAt)+'</p>'+
 (x.revalidationNeeded?'<p class="agu-muted">Atenção: requer conferência adicional de inteiro teor, efeitos ou alterações.</p>':'')+
 '<a href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer">Fonte oficial ↗</a></article>';
}
function notebookPanel(){
 const items=notebookItems(),valid=notebookValid(items),editing=items.find(x=>x.id===editingNotebook);
 if(!valid)return '<div class="agu-notice" role="alert">Os dados de “Para meu caderno” precisam de conferência. Preserve seu backup. Não haverá gravação ou descarte automático.</div>';
 const topics=[...new Set(articles.map(a=>a.topic).filter(Boolean))].sort();
 const option=(value,label,current)=>'<option value="'+esc(value)+'"'+(value===current?' selected':'')+'>'+esc(label)+'</option>';
 const selected=byUnit.get(state.unit),target=editing&&editing.origin==='leitor'?byUnit.get(editing.unitId):selected;
 const editingOrigin=editing?.origin==='flashcard_existente'?'Flashcard existente · '+esc(editing.cardLabel)+' · '+esc(editing.topic||'Sem tema curricular comprovado'):editing?.origin==='estudo_integrado'?'Estudo integrado · sessão '+esc(editing.sessionId)+' · '+esc(editing.topic):editing?.origin==='questao_verificada'?'Questão oficial verificada · '+esc(editing.questionLabel)+' · '+esc(editing.topic||'Sem tema curricular comprovado'):esc(target?.article.law.title||'')+' · '+esc(target?.article.label||'')+' · '+esc(target?.clause.label||'')+' · '+esc(target?.article.topic||'Sem tema curricular comprovado');
 let s='<div class="agu-ctx-box agu-paper-notebook"><h4>Para meu caderno físico</h4><p class="agu-muted">Marque só o que deseja recuperar e escrever à mão depois. Não altera sessões, revisões nem agenda.</p>'+
 '<p class="agu-muted">Origem: '+editingOrigin+'</p>'+
 '<label for="agu-caderno-brief">'+(editing?'Editar pergunta ou ponto para anotar':'Dúvida, distinção ou pergunta breve')+'</label><textarea id="agu-caderno-brief" maxlength="450" rows="4" placeholder="O que preciso distinguir, resolver ou memorizar?">'+esc(editing?.prompt||'')+'</textarea>'+
 '<button type="button" class="agu-primary" id="agu-caderno-save" onclick="AGULegal.notebookSave()">'+(editing?'Salvar edição':'Guardar para meu caderno')+'</button>'+
 (editing?'<button type="button" class="agu-light" onclick="AGULegal.notebookCancel()">Cancelar edição</button>':'')+
 '<p class="agu-muted" role="status" aria-live="polite">'+esc(notebookMessage)+'</p></div>'+
 '<section class="agu-ctx-box" aria-label="Lista de marcações para o caderno"><h4 id="agu-caderno-list" tabindex="-1">Marcações salvas ('+items.length+'/'+NOTEBOOK_MAX+')</h4>'+
 '<label for="agu-caderno-filter-topic">Filtrar por tema curricular</label><select id="agu-caderno-filter-topic" onchange="AGULegal.notebookFilter(\'tema\',this.value)">'+option('todos','Todos os temas',notebookTopic)+option('sem_tema','Sem tema documentado',notebookTopic)+topics.map(t=>option(t,t,notebookTopic)).join('')+'</select>'+
 '<label for="agu-caderno-filter-status">Filtrar por estado</label><select id="agu-caderno-filter-status" onchange="AGULegal.notebookFilter(\'estado\',this.value)">'+[['pendente','Pendentes'],['anotado','Anotadas'],['dispensado','Dispensadas'],['todos','Todos os estados']].map(([id,label])=>option(id,label,notebookStatus)).join('')+'</select>';
 const shown=items.filter(x=>(notebookStatus==='todos'||x.status===notebookStatus)&&(notebookTopic==='todos'||(notebookTopic==='sem_tema'?x.topic===null:x.topic===notebookTopic))).slice().reverse();
 if(!shown.length)s+='<p class="agu-muted">Nenhuma marcação encontrada para estes filtros.</p>';
 for(const x of shown){
  const ref=byUnit.get(x.origin==='estudo_integrado'?x.deviceId:x.unitId),id=esc(x.id),study=x.origin==='estudo_integrado',question=x.origin==='questao_verificada',flash=x.origin==='flashcard_existente';
  const originLabel=flash?'Flashcard existente · '+esc(x.cardLabel):question?'Questão oficial verificada · '+esc(x.questionLabel):study?'Estudo integrado · '+esc(x.deviceId)+' · sessão '+esc(x.sessionId):esc(ref?.article.law.title)+' · '+esc(ref?.article.label)+' · '+esc(ref?.clause.label);
  s+='<article class="agu-notice agu-paper-item"><p><b>'+esc(x.prompt)+'</b></p><p class="agu-muted">'+originLabel+'<br>'+esc(x.topic||'Sem tema documentado')+' · '+esc(x.status)+' · '+esc(x.createdAt.slice(0,10))+'</p>'+
  (notebookCanOpenOrigin(x.id)?'<div class="agu-paper-actions"><button type="button" class="agu-light" onclick="AGULegal.notebookOrigin(\''+id+'\')">'+(flash?'Abrir flashcard de origem':question?'Abrir questão de origem':study?'Retomar sessão de origem':'Abrir origem')+'</button>':'<p class="agu-muted">'+(flash?'Flashcard indisponível nesta versão; referência preservada.':question?'Questão indisponível nesta versão; referência preservada.':'Sessão de origem não disponível para retomada; referência preservada.')+'</p><div class="agu-paper-actions">')+
  '<button type="button" class="agu-light" onclick="AGULegal.notebookEdit(\''+id+'\')">Editar</button>'+
  (x.status!=='anotado'?'<button type="button" class="agu-light" onclick="AGULegal.notebookSetStatus(\''+id+'\',\'anotado\')">Marcar como anotado</button>':'')+
  (x.status!=='dispensado'?'<button type="button" class="agu-light" onclick="AGULegal.notebookSetStatus(\''+id+'\',\'dispensado\')">Dispensar</button>':'')+
  (x.status!=='pendente'?'<button type="button" class="agu-light" onclick="AGULegal.notebookSetStatus(\''+id+'\',\'pendente\')">Manter pendente</button>':'')+'</div></article>';
 }
 return s+'</section>';
}
function related(a){
 const c=byUnit.get(state.unit)?.clause;
 const matching=getRelations().filter(x=>x.deviceId===state.unit);
 const norm=matching.filter(x=>x.kind==='norma'),juris=matching.filter(x=>x.kind==='jurisprudencia'),questions=matching.filter(x=>x.kind==='questao');
 const cards=(Array.isArray(root.AGU_AUD03_CARDS)?root.AGU_AUD03_CARDS:[]).filter(x=>x.code===a.topic);
 let s='<p class="agu-muted">Dispositivo: '+esc(c?.label||a.label)+' · '+esc(a.topic||'Leitura livre, sem vínculo curricular')+' · relações estritamente vinculadas à unidade selecionada.</p>';
 if(state.tab==='juris')s+=juris.length?'<p class="agu-muted">'+juris.length+' referência(s) jurisprudencial(is) com proveniência documental.</p>'+juris.map(relationCard).join(''):'<div class="agu-notice">Não há jurisprudência indexada com segurança para esta subdivisão. A ausência de vínculo não significa inexistência de julgados.</div>';
 if(state.tab==='questoes')s+=(root.AGUQuestions18?.panel(state.unit)||'<div class="agu-notice">Acervo de questões indisponível.</div>')+(questions.length?questions.map(relationCard).join(''):'');
 if(state.tab==='caderno')s+=a.topic?(root.AGUCaderno?.panel({deviceId:state.unit,topic:a.topic})||'<div class="agu-notice">Caderno contextual indisponível.</div>'):'<div class="agu-notice">Vínculo curricular ainda não documentado. Use Comentários para anotar este dispositivo durante a leitura.</div>';
 if(state.tab==='estudo')s+=root.AGUStudy?.html(state.unit)||'<div class="agu-notice">Módulo Estudo Integrado indisponível.</div>';
 if(state.tab==='flashcards')s+=cards.length?'<p>'+cards.length+' cartões autorais relacionados ao tópico '+esc(a.topic)+' (associação temática, não especificamente ao parágrafo).</p>'+cards.map(x=>'<div class="agu-notice"><b>'+esc(x.front)+'</b><p class="agu-muted">'+esc(x.source)+' · '+esc(x.audit?.lot||'origem autoral')+'</p></div>').join('')+'<button class="agu-primary" onclick="setView(\'review\')">Abrir Revisão Inteligente</button>':'<div class="agu-notice">Nenhum cartão publicado associado a este tópico.</div>';
 if(state.tab==='comentarios')s+='<label><b>Comentário pessoal deste dispositivo</b><textarea id="agu-legal-note" placeholder="Anotação privada, hipótese ou dúvida">'+esc(state.notes[state.unit]||'')+'</textarea></label><button id="agu-save-note" class="agu-primary" onclick="AGULegal.note(true)">Salvar anotação</button><p class="agu-muted">Comentários armazenados somente neste navegador.</p>';
 if(state.tab==='para_caderno')s+=notebookPanel();
 if(state.tab==='juris'||state.tab==='questoes')s+='<h4>Complementos normativos</h4>'+(norm.length?norm.map(relationCard).join(''):'<p class="agu-muted">Nenhuma evidência normativa complementar ligada a esta subdivisão.</p>');
 return s;
}
function page(){
if(!articles.length)return '<div class="card">Corpus normativo indisponível. Consulte a publicação.</div>';
const a=current(),pos=a.law.articles.findIndex(x=>x.id===a.id);
const largeLaw=a.law.articles.length>120;
const start=largeLaw?Math.max(0,Math.min(pos-24,a.law.articles.length-49)):0;
const visibleArticles=largeLaw?a.law.articles.slice(start,start+49):a.law.articles;
const usedDivisions=new Set(a.law.articles.flatMap(x=>x.structurePath||[]));
const divisions=(a.law.structure||[]).filter(n=>usedDivisions.has(n.id));
const option=(id,label,selected)=>'<option value="'+esc(id)+'"'+(selected?' selected':'')+'>'+esc(label)+'</option>';
const navigation='<div class="agu-law-navigation"><details id="agu-law-picker"><summary>Escolher norma · '+esc(a.law.title)+'</summary><label for="agu-law-select">Abrir uma norma<select id="agu-law-select" onchange="AGULegal.openLaw(this.value)">'+laws.map(l=>option(l.id,l.title+(l.contentImport==='mirror_unverified'?' — espelho não cotejado':l.contentCoverage==='integral'?' — texto integral conferido':' — seleção parcial'),l.id===a.law.id)).join('')+'</select></label></details>'+(divisions.length?'<label>Ir à divisão da norma<select id="agu-chapter-select" onchange="AGULegal.chapter(this.value)">'+divisions.map(n=>option(n.id,n.label,a.structurePath?.at(-1)===n.id)).join('')+'</select></label>':'<p class="agu-muted">Norma sem divisões formais; navegue pelos artigos.</p>')+'<form onsubmit="event.preventDefault();AGULegal.gotoArticle(this.elements.number.value)"><label for="agu-law-jump">Ir diretamente ao artigo</label><div class="agu-law-jump"><input id="agu-law-jump" name="number" placeholder="Ex.: 489 ou 1.228-A" autocomplete="off"><button class="agu-light" type="submit">Abrir artigo</button></div><small id="agu-law-jump-feedback" role="status" aria-live="polite"></small></form>'+(a.law.contentCoverage==='integral'?'<div><button class="agu-light" onclick="AGULegal.boundary(false)">Primeiro artigo da norma</button><button class="agu-light" onclick="AGULegal.boundary(true)">Último artigo da norma</button></div>':'')+'</div>';
let nav='<section class="agu-pane agu-index"><h3>Estrutura normativa</h3>'+ (root.AGUConsolidation?.searchPanel()||'') + (root.AGUConsolidation?.settings()||'') + navigation +'<label for="agu-law-filter">Filtrar artigos visíveis</label><input id="agu-law-filter" aria-label="Filtrar artigos visíveis" placeholder="Filtrar neste trecho" oninput="AGULegal.filter(this.value)">';
nav+='<h4>'+esc(a.law.title)+'</h4><p class="agu-muted">'+(largeLaw?'Artigos '+(start+1)+'–'+(start+visibleArticles.length)+' de '+a.law.articles.length+'; use o número ou a divisão para ir a outro trecho.':a.law.articles.length+' artigos disponíveis nesta norma.')+'</p>';
for(const x of visibleArticles)nav+='<button class="agu-index-entry '+(x.id===a.id?'selected':'')+'" data-search="'+esc((x.label+' '+x.topic+' '+a.law.title).toLowerCase())+'" onclick="AGULegal.article(\''+esc(x.id)+'\',true)">'+esc(x.label)+' · '+esc(x.topic||'Leitura livre')+'</button>';
nav+='</section>';
let mid='<section class="agu-pane agu-document"><p class="agu-muted">'+esc(a.law.title)+' · '+esc(structureLabel(a))+'</p><h2 tabindex="-1">'+esc(a.label)+'</h2><button class="agu-light agu-change-law" type="button" onclick="AGULegal.showLawPicker()">Trocar norma</button><p class="agu-muted">Fonte: '+esc(a.law.sourceVersion)+' · referência de '+esc(a.law.checkedOn)+'</p><p><a href="'+esc(a.law.source)+'" target="_blank" rel="noopener noreferrer">Conferir o texto na fonte oficial</a></p>'+(root.AGUConsolidation?.versionPanel(state.unit)||'');
if(a.law.contentImport==='mirror_unverified')mid+='<p class="agu-notice"><b>Texto de referência, ainda sem cotejo integral:</b> importado de espelho público do Planalto em 12/10/2026. Pode conter incorreções ou alterações posteriores. Para fundamentação jurídica, confira a fonte oficial. Não há vínculo curricular automático para estes artigos.</p>';
else if(a.law.contentCoverage==='partial')mid+='<p class="agu-muted">Norma parcialmente incorporada: a seleção de artigos não corresponde ao texto integral da norma.</p>';
if(a.law.contentCoverage==='integral')mid+='<p class="agu-notice"><b>Texto integral incorporado</b> · '+(divisions.length?'Navegue pelos capítulos no Índice ou avance artigo a artigo.':'Navegue pelo índice de artigos ou avance artigo a artigo.')+' Cotejo textual completo; auditoria jurídica não certificada.</p>';
if(a.id===a.law.articles[0].id&&a.law.frontMatter)mid+='<details><summary>Ementa e preâmbulo</summary>'+a.law.frontMatter.map(t=>'<p>'+esc(t)+'</p>').join('')+(a.law.frontMatterEditorialNotes||[]).map(n=>'<p class="agu-muted">Nota editorial da ementa: '+esc(n.text)+'</p>').join('')+'</details>';
for(const note of a.sourceNotices||[])mid+='<div class="agu-notice"><b>Ressalva da fonte</b><p>'+esc(note.text)+'</p><a href="'+esc(note.url)+'" target="_blank" rel="noopener noreferrer">Conferir ressalva na fonte oficial</a></div>';
if(a.excerpt)mid+='<div class="agu-notice"><b>Recorte normativo:</b> '+esc(a.excerptNote||'O artigo está parcialmente reproduzido; consulte a íntegra na fonte oficial.')+'</div>';
mid+='<div class="agu-paper-context"><span>Dispositivo selecionado: <b>'+esc(byUnit.get(state.unit)?.clause.label||a.label)+'</b></span><button class="agu-primary" type="button" onclick="AGULegal.tab(\'para_caderno\',true)">Para meu caderno</button></div>';
for(const c of a.clauses)mid+='<div class="agu-unit '+(state.unit===c.id?'selected':'')+'" role="button" tabindex="0" onclick="AGULegal.unit(\''+esc(c.id)+'\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();AGULegal.unit(\''+esc(c.id)+'\',true)}"><b>'+esc(c.label)+'</b>'+(c.textStatus==='declared_unconstitutional_in_source'?'<p class="agu-notice"><b>Declarado inconstitucional segundo a fonte.</b> Texto preservado para consulta documental; não apresentado como comando vigente. Alcance da decisão não auditado nesta sprint.</p>':c.textStatus==='revoked_in_source'?'<p class="agu-notice"><b>Revogado segundo a fonte.</b> Texto histórico, não apresentado como comando vigente.</p>':'')+'<p>'+esc(c.text)+'</p>'+(c.textStatus==='veto_placeholder'?'<small>Marcador de veto da fonte; não é comando normativo.</small>':'')+(c.editorialNotes||[]).map(n=>'<p class="agu-muted">Nota editorial da fonte: '+esc(n.text)+'</p>').join('')+'</div>';
if(a.id===a.law.articles.at(-1).id&&a.law.closingMatter)mid+='<div class="agu-notice"><b>Fecho da norma</b>'+a.law.closingMatter.map(t=>'<p>'+esc(t)+'</p>').join('')+'</div>';
mid+='<div><button class="agu-light agu-step-prev" '+(pos===0?'disabled':'')+' onclick="AGULegal.step(-1,true)">← Artigo anterior</button><button class="agu-light agu-step-next" '+(pos===a.law.articles.length-1?'disabled':'')+' onclick="AGULegal.step(1,true)">Próximo artigo →</button></div></section>';
let aside='<section class="agu-pane agu-related">'+(root.AGUConsolidation?.metricPanel()||'')+'<h3>Relacionados ao dispositivo</h3><div class="agu-tabs">'+tabs.map(([key,label])=>'<button aria-pressed="'+(state.tab===key)+'" onclick="AGULegal.tab(\''+key+'\',true)">'+label+'</button>').join('')+'</div>'+related(a)+'<p class="agu-muted">Origem das normas: fonte oficial. Relações individuais com jurisprudência e provas exigem revisão da Auditoria 03.</p><button class="agu-light" onclick="AGULegal.exportData()">Exportar comentários</button></section>';
return '<div id="agu-reader" style="--agu-legal-font:'+(root.AGUConsolidation?.peek()?.size||100)+'%" data-law="'+esc(a.law.id)+'" data-mobile="'+esc(state.mobile)+'"><div class="top"><div><div class="eyebrow">AGU · LEITOR JURÍDICO</div><h1>Legislação contextualizada</h1><div class="muted">Uma norma por vez · fonte identificada · conferência transparente</div></div></div><div class="agu-mobile"><button onclick="AGULegal.mobile(\'index\',true)">Índice</button><button onclick="AGULegal.mobile(\'text\',true)">Texto legal</button><button onclick="AGULegal.mobile(\'related\',true)">Relacionados</button></div><div class="agu-columns">'+nav+mid+aside+'</div></div>';
}
const css='.agu-s17-search{margin:8px 0 14px}.agu-s17-fields{display:grid;gap:8px;padding:10px 0}.agu-s17-fields label,.agu-s17-settings label{display:block;font-size:12px;color:#425c64}.agu-s17-fields input,.agu-s17-fields select,.agu-s17-settings select{width:100%;box-sizing:border-box;padding:10px;border:1px solid #c8d8dd;border-radius:8px;background:#fff;color:#223840;margin-top:4px}.agu-s17-results{overflow:auto;max-height:350px}.agu-s17-result{display:block;text-align:left;width:100%;padding:10px;margin:5px 0;border:1px solid #d3e3e6;border-radius:8px;background:#f6fafb;color:#223840}.agu-s17-result small{display:block;color:#425c64;margin-top:3px;line-height:1.4}.agu-document .agu-unit p{font-size:var(--agu-legal-font,100%)}.agu-document .agu-unit{overflow-wrap:anywhere}.agu-related .agu-ctx-box input[type=file]{display:none}.agu-index-entry[hidden]{display:none}.agu-law-navigation{display:grid;gap:10px;margin-bottom:14px}.agu-law-navigation label{display:block;font-size:12px;color:#425c64}.agu-law-navigation select{max-width:100%;width:100%;box-sizing:border-box;padding:10px;border:1px solid #c8d8dd;border-radius:8px;background:#fff;color:#223840;margin-top:4px}.agu-law-navigation button{margin:3px 0;min-height:44px}.agu-index input{box-sizing:border-box}@media(max-width:850px){.agu-s17-result{min-height:48px}.agu-mobile button{min-height:46px}.agu-tabs button{min-height:42px}}.agu-ctx-box{border-top:1px solid #e0e9eb;padding:12px 0;margin-top:12px}.agu-ctx-box input,.agu-ctx-box select,.agu-ctx-box textarea{width:100%;box-sizing:border-box;padding:10px;margin:5px 0 10px;border:1px solid #c9d6da;border-radius:8px;background:#fff;color:#203942}.agu-ctx-box label{display:block;font-size:13px;font-weight:600;margin:6px 0}.agu-ctx-body{white-space:pre-wrap;overflow-wrap:anywhere}.agu-related a{overflow-wrap:anywhere}.agu-ctx-box button{margin:4px 5px 5px 0}.agu-ctx-box .hidden{display:none}.agu-columns{display:grid;grid-template-columns:minmax(180px,220px) minmax(300px,1fr) minmax(250px,310px);gap:14px;align-items:start}.agu-pane{background:#fff;border:1px solid #dce4e8;border-radius:12px;padding:17px;min-width:0}.agu-index,.agu-related{position:sticky;top:10px;max-height:80vh;overflow-y:auto}.agu-index input{width:100%;padding:10px;border:1px solid #d3dfe4;border-radius:8px}.agu-index-entry{width:100%;text-align:left;display:block;background:#f6f9fa;border:0;border-radius:7px;padding:9px;margin:4px 0}.agu-unit{border-left:3px solid #d7e3e6;padding:12px;line-height:1.65;margin:9px 0;cursor:pointer}.agu-unit.selected,.agu-index-entry.selected{background:#e5f5f2;border-color:#16747a}.agu-unit p{margin:6px 0}.agu-document h2{font-family:Georgia,serif;font-size:25px}.agu-muted{color:#607985;font-size:13px;line-height:1.5}.agu-notice{background:#f0f6f7;padding:11px;border-left:3px solid #77a5a8;border-radius:6px;margin:10px 0}.agu-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}.agu-tabs button,.agu-light,.agu-mobile button{padding:9px;border-radius:7px;border:1px solid #d3e0e4;background:#f4f8f9}.agu-tabs button[aria-pressed=true],.agu-primary{background:#156b70;color:white;padding:10px;border-radius:8px}.agu-related textarea{width:100%;min-height:130px;padding:10px;border:1px solid #ccdadd;border-radius:8px}.agu-mobile{display:none}.agu-paper-context{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding:9px;background:#f0f6f7;border-radius:8px}.agu-paper-context button,.agu-paper-actions button{min-height:44px;cursor:pointer}.agu-paper-notebook textarea,.agu-paper-notebook select{max-width:100%;box-sizing:border-box}.agu-paper-actions{display:flex;flex-wrap:wrap;gap:4px}.agu-paper-item{overflow-wrap:anywhere}.agu-paper-item button{white-space:normal}.agu-paper-notebook .agu-primary{min-height:44px;cursor:pointer}@media(max-width:850px){.agu-columns{display:block}.agu-pane{margin-bottom:12px}.agu-index,.agu-related{position:static;max-height:none}.agu-mobile{display:flex;gap:7px;margin:12px 0}.agu-mobile button{flex:1}#agu-reader[data-mobile=text] .agu-index,#agu-reader[data-mobile=text] .agu-related,#agu-reader[data-mobile=index] .agu-document,#agu-reader[data-mobile=index] .agu-related,#agu-reader[data-mobile=related] .agu-document,#agu-reader[data-mobile=related] .agu-index{display:none}}';
const codeCss='.agu-law-navigation details{border:1px solid #c8d8dd;border-radius:8px;padding:10px}.agu-law-navigation summary{cursor:pointer;font-weight:600;line-height:1.5}.agu-law-navigation summary:focus-visible,.agu-change-law:focus-visible{outline:3px solid #15777b;outline-offset:3px}.agu-law-navigation details label{margin-top:10px}.agu-law-jump{display:flex;gap:7px;flex-wrap:wrap;align-items:center}.agu-law-jump input{min-width:0;flex:1 1 120px;max-width:100%;box-sizing:border-box;padding:10px;border:1px solid #c8d8dd;border-radius:8px}.agu-law-jump button{flex:0 0 auto}.agu-law-navigation small[role=status]{display:block;line-height:1.4;color:#425c64}#agu-reader[data-law=L10406] .agu-unit p,#agu-reader[data-law=L13105] .agu-unit p{white-space:pre-line}';
if(typeof document!=='undefined'&&!document.getElementById('agu-reader-style')){const e=document.createElement('style');e.id='agu-reader-style';e.textContent=css+codeCss;document.head.appendChild(e)}
root.AGULegal={page,article,openLaw,showLawPicker,gotoArticle,chapter,boundary,unit,tab,mobile,step,note,exportData,filter,notebookSave,notebookSaveStudy,notebookSaveQuestion,notebookSaveCard,notebookFilter,notebookEdit,notebookCancel,notebookSetStatus,notebookCanOpenOrigin,notebookOrigin,peek:()=>JSON.parse(JSON.stringify(state)),stats:()=>({laws:laws.length,articles:articles.length,units:byUnit.size,relations:getRelations().length}),relations:getRelations};
})(window);

