/* AGU Quiz | Sprint 17 — pesquisa e consolidação jurídico-documental (apenas dados públicos + dados locais privados) */
(function(root){
'use strict';
const KEY='agu_consolidacao_s17_v1';
const html=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clean=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const allClauses=()=> (root.AGU_LEGAL_CORPUS?.laws||[]).flatMap(l=>l.articles.flatMap(a=>a.clauses.map(u=>({law:l,article:a,unit:u}))));
const rels=()=>root.AGU_LEGAL_RELATIONS?.entries||[];
const cards=()=>root.AGUReview?.searchCards?.()||root.AGU_AUD03_CARDS||[];
const defaults=()=>({query:'',filter:'todos',status:'todos',size:100,expanded:false});
let state=defaults();
try{const x=JSON.parse(localStorage.getItem(KEY)||'null');if(x&&typeof x==='object'){state={...state,...x};}}catch(_){}
if(!['todos','norma','jurisprudencia','questao','flashcard','caderno'].includes(state.filter))state.filter='todos';
if(!['todos','confirmado','parcial','pendente','pessoal'].includes(state.status))state.status='todos';
if(![90,100,115,130].includes(state.size))state.size=100;
function persist(){localStorage.setItem(KEY,JSON.stringify(state));}
function statusOf(r){return r.sourceStatus==='confirmado'?'confirmado':r.sourceStatus==='parcial'?'parcial':'pendente';}
function build(){
 const out=[],units=allClauses(),unitIds=new Set(units.map(x=>x.unit.id));
 for(const x of units){
  const textual=x.unit.textVerification?.status||x.article.textVerification?.status||x.law.textVerification?.status;
  const textStatus=textual==='pending'?'pendente':textual&&textual!=='compared'&&textual!=='legacy_point_check'?'parcial':'confirmado';
  out.push({id:'norm:'+x.unit.id,deviceId:x.unit.id,type:'norma',status:textStatus,relation:'literal_do_dispositivo',title:x.law.title+' · '+x.article.label+' · '+x.unit.label,description:x.unit.text,source:x.law.source,verification:textStatus==='pendente'?'Cotejo textual pendente; fonte oficial não equivale a conferência ou certificação':'Conferência textual pontual; cadeia de alterações não certificada',search:x.unit.id+' '+x.article.topic+' '+x.article.label+' '+x.law.title});
 }
 for(const r of rels()){
  if(!unitIds.has(r.deviceId)||!['norma','jurisprudencia','questao'].includes(r.kind))continue;
  out.push({id:'rel:'+r.id,deviceId:r.deviceId,type:r.kind,status:statusOf(r),relation:r.relationship,title:r.title,description:r.summary,source:r.url,verification:r.sourceLot+' · '+r.localizer,search:r.topic+' '+r.process+' '+r.deviceId});
 }
 // Relação curricular explícita: não vincular flashcard a inciso sem confirmação individual.
 for(const x of cards()){
  for(const a of units.filter(u=>u.article.topic===x.code&&u.unit.id.endsWith(':caput')).slice(0,1)){
   out.push({id:'card:'+x.id+':'+a.unit.id,deviceId:a.unit.id,type:'flashcard',status:'parcial',relation:'tematica_por_topico',title:x.front,description:x.back,verification:'Cartão autoral '+x.id+' · '+x.code+'; associação apenas temática',search:x.source+' '+x.code});
  }
 }
 for(const x of root.AGUQuestions18?.all?.()||[]){
  if(!unitIds.has(x.deviceId)||x.status!=='gabarito_definitivo'||!x.key||!x.historicReason||!x.currentReason)continue;
  out.push({id:'questao:'+x.id,deviceId:x.deviceId,type:'questao',status:'confirmado',
   relation:x.relationship,title:'AGU '+x.year+' · Q'+x.number+' · '+x.title,
   description:x.adaptedStem+' · '+x.historicReason,source:x.examUrl,
   verification:x.reference+' · '+x.examLocator+' · gabarito '+x.key+' (pontualmente confirmado)',
   search:x.code+' '+x.primaryCurricularId+' '+x.exam+' '+x.id+' '+x.deviceId+' '+x.number});
 }
 for(const n of root.AGUCaderno?.peek()?.records||[]){
  if(!unitIds.has(n.deviceId))continue;
  out.push({id:'note:'+n.id,deviceId:n.deviceId,type:'caderno',status:'pessoal',relation:'anotacao_pessoal',title:n.title,description:n.content,verification:'Registro privado; não certificado',search:n.topic+' '+n.type+' '+n.stage});
 }
 return out;
}
function query(q=state.query,kind=state.filter,status=state.status){
 const s=clean(q).trim();
 return build().filter(x=>(kind==='todos'||x.type===kind)&&(status==='todos'||x.status===status)&&(!s||clean([x.title,x.description,x.verification,x.deviceId,x.search].join(' ')).includes(s))).slice(0,100);
}
function focusControl(key){const selectors={toggle:'#agu-reader .agu-s17-search > button',input:'#agu-search-q',submit:'#agu-reader .agu-s17-fields button.agu-primary',clear:'#agu-reader .agu-s17-fields button.agu-light',size:'#agu-reader .agu-s17-settings select',result:'#agu-reader .agu-unit.selected'};if(key&&typeof document!=='undefined')document.querySelector?.(selectors[key])?.focus?.({preventScroll:false})}
function setFilters(queryText,kind,status,focusTarget=''){state.query=String(queryText||'').slice(0,150);state.filter=['todos','norma','jurisprudencia','questao','flashcard','caderno'].includes(kind)?kind:'todos';state.status=['todos','confirmado','parcial','pendente','pessoal'].includes(status)?status:'todos';state.expanded=true;persist();root.render?.();focusControl(focusTarget)}
function submit(focusTarget=''){const q=document.getElementById('agu-search-q')?.value,k=document.getElementById('agu-search-kind')?.value,st=document.getElementById('agu-search-status')?.value;setFilters(q,k,st,focusTarget)}
function clear(focusTarget=''){setFilters('','todos','todos',focusTarget)}
function toggle(restoreKeyboardFocus=false){state.expanded=!state.expanded;persist();root.render?.();if(restoreKeyboardFocus)focusControl('toggle')}
function open(unitId,restoreKeyboardFocus=false){const valid=allClauses().some(x=>x.unit.id===unitId);if(!valid)return false;root.AGULegal?.unit(unitId);root.AGULegal?.mobile('text');if(restoreKeyboardFocus)focusControl('result');return true}
function textSize(size,restoreKeyboardFocus=false){const n=Number(size);if(![90,100,115,130].includes(n))return;state.size=n;persist();root.render?.();if(restoreKeyboardFocus)focusControl('size')}
const option=(id,name,current)=>'<option value="'+html(id)+'"'+(current===id?' selected':'')+'>'+html(name)+'</option>';
function searchPanel(){
 const types=[['todos','Todos'],['norma','Normas'],['jurisprudencia','Jurisprudência'],['questao','Questões oficiais'],['flashcard','Flashcards'],['caderno','Caderno']];
 const statuses=[['todos','Todos os estados'],['confirmado','Confirmado pontualmente'],['parcial','Parcial'],['pendente','Pendente'],['pessoal','Pessoal']];
 const matches=query();
 let s='<div class="agu-s17-search"><button class="agu-light" aria-expanded="'+state.expanded+'" onclick="AGUConsolidation.toggle(true)">⌕ Pesquisa jurídica e filtros '+(state.expanded?'−':'+')+'</button>';
 if(!state.expanded)return s+'</div>';
 s+='<div class="agu-s17-fields"><label>Pesquisar texto, artigo, dispositivo, tópico e anotações<input id="agu-search-q" type="search" maxlength="150" value="'+html(state.query)+'" placeholder="Ex.: art. 13, delegação, PGFN" onkeydown="if(event.key===\'Enter\'){event.preventDefault();AGUConsolidation.submit(\'input\')}"></label><label>Tipo<select id="agu-search-kind">'+types.map(x=>option(x[0],x[1],state.filter)).join('')+'</select></label><label>Confiabilidade<select id="agu-search-status">'+statuses.map(x=>option(x[0],x[1],state.status)).join('')+'</select></label><div><button class="agu-primary" onclick="AGUConsolidation.submit(\'submit\')">Buscar</button><button class="agu-light" onclick="AGUConsolidation.clear(\'clear\')">Limpar</button></div></div>';
 s+='<p class="agu-muted">'+matches.length+' resultado(s) até o limite de 100. Resultados de flashcards têm associação temática; notas são pessoais. Confirmado pontualmente não significa certificado integralmente.</p>';
 if(state.query||state.filter!=='todos'||state.status!=='todos')s+='<div class="agu-s17-results" role="region" aria-label="Resultados de pesquisa">'+matches.map(x=>'<button type="button" class="agu-s17-result" onclick="AGUConsolidation.open(\''+html(x.deviceId)+'\',true)"><b>'+html(x.title)+'</b><small>'+html(x.type)+' · '+html(x.status)+' · '+html(x.relation)+' · '+html(x.deviceId)+'</small></button>').join('')+'</div>';
 return s+'</div>';
}
function versionPanel(unitId){
 const x=allClauses().find(x=>x.unit.id===unitId);if(!x)return '';const v=root.AGU_LEGAL_VERSIONS?.entries?.find(z=>z.deviceId===unitId);
 return '<div class="agu-notice"><b>Versão da legislação — controle documental</b>'+
 '<p class="agu-muted">Versão: '+html(v?.versionId||'não catalogada')+' · Fonte oficial: '+html(v?.sourceLabel||x.law.sourceVersion)+' · consulta '+html(v?.consultedAt||x.law.checkedOn)+' · status: '+html(v?.chainStatus||'pendente')+'.</p>'+
 '<p>O leitor contém a redação incorporada desse dispositivo, mas <b>não dispõe de uma série histórica verificada</b> nem da cadeia completa de alterações. Comparação histórica indisponível até a certificação das versões e dos atos modificadores.</p>'+
 '<p><a href="'+html(x.law.source)+'" target="_blank" rel="noopener noreferrer">Conferir texto oficial e alterações na origem</a></p></div>';
}
function settings(){
 return '<div class="agu-s17-settings"><label>Tamanho do texto jurídico <select onchange="AGUConsolidation.textSize(this.value,true)">'+[[90,'Compacto'],[100,'Padrão'],[115,'Ampliado'],[130,'Extra amplo']].map(x=>option(x[0],x[1],state.size)).join('')+'</select></label></div>';
}
function metrics(){
 const notes=root.AGUCaderno?.peek()?.records||[],sessions=root.AGUStudy?.peek()?.sessions||[];
 const attempts=root.AGUReview?.attemptsInfo?.()||[];
 const d=new Date(),localDay=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
 const dated=attempts.filter(x=>x.due&&x.due<=localDay);
 const review=root.AGUReview?.summary?.()||{};
 return {articles:new Set(sessions.map(x=>x.deviceId)).size,sessions:sessions.length,completed:sessions.filter(x=>x.status==='concluida').length,notes:notes.length,attempts:attempts.length,due:review.due||0,scheduled:attempts.filter(x=>x.due&&x.due>localDay).length,attemptsDue:dated.length};
}
function metricPanel(){const x=metrics();return '<div class="agu-notice"><b>Atividade real registrada</b><p>'+x.articles+' dispositivos com sessão · '+x.sessions+' sessões · '+x.completed+' encerradas · '+x.notes+' notas contextuais · '+x.attempts+' avaliações registradas · '+x.due+' revisões vencidas</p><p class="agu-muted">São contagens de atividade, não certificação de domínio ou cobertura integral do edital.</p></div>';}
root.AGUConsolidation={build,query,searchPanel,versionPanel,settings,metricPanel,metrics,open,submit,setFilters,clear,toggle,textSize,peek:()=>JSON.parse(JSON.stringify(state))};
})(window);
