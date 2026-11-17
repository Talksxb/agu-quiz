/* UX ESTUDO INTEGRADO 01 — navegação por IDs públicos literais, sem estado persistente novo. */
(function(root){
'use strict';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const count=(n,one,many)=>n+' '+(n===1?one:many);
let selected='',discipline='todos',search='',connected=false,message='';
const demo=()=>root.AGUHomeContext?.().demo===true;
function articles(){
 return (root.AGU_LEGAL_CORPUS?.laws||[]).flatMap(law=>law.articles.filter(a=>typeof a.topic==='string'&&a.topic).map(a=>({
  code:a.topic,id:a.id,unit:a.clauses[0]?.id,label:a.label,law:law.title
 }))).filter(a=>a.unit);
}
function catalog(){
 const laws=articles(),decks=root.AGUReview?.deckList?.()||[],codes=[...new Set([...laws.map(a=>a.code),...decks.map(d=>d.code)])];
 return codes.map(code=>{
  const deck=decks.find(d=>d.code===code),meta=root.AGUDisciplines?.forTopic(code);
  return {code,title:deck?.title||'Legislação vinculada ao assunto',discipline:meta?.code||code.split('-')[0],name:meta?.name||code.split('-')[0],
   articles:laws.filter(a=>a.code===code),deck,
   questions:(root.AGUQuestions18?.all?.()||[]).filter(q=>q.code===code&&q.primaryCurricularId===code&&q.relationDegree==='direto_dispositivo_nuclear'&&root.AGUQuestions18.notebookEligible(q.id))};
 }).sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')||a.code.localeCompare(b.code));
}
function focus(selector){const el=root.document?.querySelector(selector);if(el){el.tabIndex=-1;el.focus({preventScroll:false})}}
function openLibrary(){connected=false;root.setView?.('library');focus(selected?'#agu-subject-title':'#agu-subjects-title')}
function select(code){if(!catalog().some(x=>x.code===code)||demo())return false;selected=code;connected=false;message='';root.render?.();focus('#agu-subject-title');return true}
function back(){selected='';connected=false;message='';root.render?.();focus('#agu-subjects-title')}
function filter(kind,value){
 if(kind==='discipline')discipline=String(value);else if(kind==='search')search=String(value).slice(0,120);else return;
 root.render?.();root.document?.querySelector('#agu-subject-'+kind)?.focus({preventScroll:false});
}
function open(kind,id){
 const item=catalog().find(x=>x.code===selected);if(!item||demo())return false;
 message='';
 try{
  if(['law','question','notebook'].includes(kind)&&root.AGUHome?.notebookPending?.()===null)throw Error('O armazenamento do leitor precisa de conferência.');
  if(kind==='cards'||kind==='review'){
   if(!item.deck||!root.AGUReview.browseTopic(item.code,kind==='review'?'pendentes':'todos'))return false;
   connected=true;root.setView('review');focus('#agu-deck-library h2');
  }else if(kind==='law'){
   const a=item.articles.find(x=>x.unit===id);if(!a)return false;
   connected=true;root.setView('legal');root.AGULegal.unit(a.unit);root.AGULegal.mobile('text');focus('#main h1');
  }else if(kind==='question'){
   const q=item.questions.find(x=>x.id===id);if(!q)return false;
   connected=true;root.setView('legal');root.AGULegal.unit(q.deviceId);root.AGULegal.tab('questoes');root.AGUQuestions18.choose(q.id);focus('#agu-question-context');
  }else if(kind==='notebook'){
   connected=true;root.setView('legal');root.AGULegal.tab('para_caderno');root.AGULegal.notebookFilter('tema',item.articles.length?item.code:'todos');root.AGULegal.notebookFilter('estado','todos');focus('#agu-caderno-list');
  }else return false;
  return true;
 }catch(_){
  connected=false;message='Não foi possível abrir o recurso. Seus registros não foram substituídos. Confira Dados e backup.';
  root.setView?.('library');focus('#agu-subject-message');return false;
 }
}
function returnPanel(view){
 if(!connected||!selected||!['legal','review'].includes(view))return '';
 return '<nav class="agu-subject-return" aria-label="Retorno ao assunto"><button type="button" class="secondary" onclick="AGUSubjects.openLibrary()">← Voltar ao assunto '+esc(selected)+'</button></nav>';
}
function detail(item){
 const d=item.deck,attempts=(root.AGUReview?.attemptsInfo?.()||[]).filter(a=>a.code===item.code);
 return '<section class="card agu-subject-detail" aria-labelledby="agu-subject-title"><button type="button" class="secondary" onclick="AGUSubjects.back()">← Todos os assuntos</button>'+
 '<p class="muted">'+esc(item.name)+' · '+esc(item.code)+'</p><h2 id="agu-subject-title" tabindex="-1">'+esc(item.title)+'</h2>'+
 '<p class="note">Acervo parcial. Os vínculos usam o código já registrado em cada recurso; não representam cobertura integral do assunto.</p>'+
 (message?'<p id="agu-subject-message" role="alert" tabindex="-1">'+esc(message)+'</p>':'')+
 '<div class="agu-subject-resources"><section><h3>Legislação</h3>'+(item.articles.length?'<p class="small">Vínculo registrado no acervo. Confira a fonte e o estado de verificação no leitor.</p><div class="agu-subject-actions">'+item.articles.map(a=>'<button type="button" class="secondary" onclick="AGUSubjects.open(\'law\',\''+esc(a.unit)+'\')">'+esc(a.law)+' · '+esc(a.label)+'</button>').join('')+'</div>':'<p>Vínculo com dispositivo pendente. Consulte a biblioteca geral de legislação.</p>')+'</section>'+
 '<section><h3>Cartões e revisão</h3>'+(d?'<p>'+count(d.count,'cartão autoral','cartões autorais')+' · '+count(d.due,'revisão pendente','revisões pendentes')+' na agenda existente.</p><div class="btnrow"><button type="button" class="primary" onclick="AGUSubjects.open(\'cards\')">Abrir cartões de '+esc(item.code)+'</button><button type="button" class="secondary" onclick="AGUSubjects.open(\'review\')">Revisar '+esc(item.code)+'</button></div>':'<p>Cartões e revisão por assunto pendentes neste acervo.</p>')+'</section>'+
 '<section><h3>Questões</h3>'+(item.questions.length?'<p class="small">Gabarito histórico e fundamento conferidos pontualmente; o enunciado disponível é uma adaptação identificada no leitor.</p><div class="agu-subject-actions">'+item.questions.map(q=>'<button type="button" class="secondary" onclick="AGUSubjects.open(\'question\',\''+esc(q.id)+'\')">AGU '+q.year+' · Q'+q.number+'</button>').join('')+'</div>':'<p>Vínculo direto verificado pendente. Questões de outros assuntos continuam na biblioteca.</p>')+'</section>'+
 '<section id="agu-subject-progress"><h3>Progresso registrado</h3><p>'+(d?d.seen+' de '+d.count+' cartões com avaliação no histórico. ':'')+attempts.length+' avaliações neste assunto.</p><p class="small muted">Abrir materiais não registra estudo, tempo ou domínio. O plano semanal e a agenda continuam nos módulos atuais.</p></section>'+
 '<section><h3>Para meu caderno</h3><p>'+(item.articles.length?'Acesse a lista existente, filtrada por '+esc(item.code)+', com todos os estados. Marcações sem tema documentado continuam na lista geral.':'O filtro deste código ainda não está disponível no leitor. Acesse a lista geral existente.')+'</p><p class="small muted">Para criar uma marcação, confira a origem indicada no formulário do leitor.</p><button type="button" class="secondary" onclick="AGUSubjects.open(\'notebook\')">Abrir Para meu caderno</button></section></div></section>';
}
function page(){
 if(demo())return '<section class="card"><h2>Estudar por assunto</h2><p>Saia da simulação para consultar os assuntos e seu histórico local.</p></section>';
 const all=catalog(),item=all.find(x=>x.code===selected);if(item)return detail(item);
 const visible=all.filter(x=>(discipline==='todos'||x.discipline===discipline)&&[x.code,x.title].join(' ').toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR')));
 return '<section class="card agu-subjects" aria-labelledby="agu-subjects-title"><h2 id="agu-subjects-title" tabindex="-1">Estudar por assunto</h2><p>Escolha um assunto e encontre os recursos já disponíveis. As aulas continuam no ChatGPT.</p>'+
 '<div class="agu-subject-filters"><label for="agu-subject-discipline">Disciplina<select id="agu-subject-discipline" onchange="AGUSubjects.filter(\'discipline\',this.value)"><option value="todos">Todas as disciplinas</option>'+(root.AGUDisciplines?.list?.()||[]).map(d=>'<option value="'+esc(d.code)+'"'+(discipline===d.code?' selected':'')+'>'+esc(d.name)+'</option>').join('')+'</select></label>'+
 '<label for="agu-subject-search">Assunto ou código<input id="agu-subject-search" type="search" value="'+esc(search)+'" placeholder="Ex.: ADM-06, delegação" onchange="AGUSubjects.filter(\'search\',this.value)"></label></div>'+
 '<p role="status" aria-live="polite">'+count(visible.length,'assunto disponível','assuntos disponíveis')+' · acervo parcial</p><div class="agu-subject-grid">'+(visible.map(x=>'<button type="button" class="hub-entry" data-agu-subject="'+esc(x.code)+'" onclick="AGUSubjects.select(\''+esc(x.code)+'\')"><span>'+esc(x.name)+' · '+esc(x.code)+'</span><b>'+esc(x.title)+'</b><span>'+count(x.deck?.count||0,'cartão','cartões')+' · '+count(x.articles.length,'artigo vinculado','artigos vinculados')+' · '+count(x.questions.length,'questão com vínculo direto','questões com vínculo direto')+'</span></button>').join('')||'<p>Nenhum assunto disponível neste filtro. O currículo e as normas gerais permanecem acessíveis abaixo; vínculos pendentes não foram presumidos.</p>')+'</div></section>';
}
root.AGUSubjects={page,catalog,select,back,filter,open,openLibrary,returnPanel};
})(window);
