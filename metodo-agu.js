/* Integração contextual. Dados editoriais não são registros de aprendizagem. */
(function(root){
'use strict';
const $=id=>document.getElementById(id),el=(tag,text,cls)=>{const x=document.createElement(tag);if(text!==undefined)x.textContent=text;if(cls)x.className=cls;return x};
const KEY='agu_livros_reader_v1',drafts=new Map();let catalog=null,current=null,activity='estudar',renderedBook='',zoomTrigger=null,loadToken=0,selectedCardId=null,observer=null;
function notice(message){$('method-status').textContent=message}
function safeDB(){try{const value=JSON.parse(localStorage.getItem(KEY)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:null}catch{return null}}
function record(){const r=safeDB()?.[current?.id]||{};return current&&root.AGUMethodProgress.validate({[current.id]:r})?root.AGUMethodProgress.active(r,current.edition):{}}
function patch(change){if(!current)return false;const db=safeDB();if(!db||!root.AGUMethodProgress.validate(db)){notice('O registro local está inválido. Os dados anteriores foram preservados; a leitura continua disponível.');return false}try{const previous=root.AGUMethodProgress.prepare(db[current.id]||{},current.edition);db[current.id]={...previous,...change};if(!root.AGUMethodProgress.validate(db))throw Error('Registro incompatível');localStorage.setItem(KEY,JSON.stringify(db));return true}catch{notice('Não foi possível guardar neste navegador. O registro anterior foi preservado.');return false}}
async function getJSON(p){if(!/^livros\/[a-z0-9/.-]+\.json$/.test(p)||p.includes('..'))throw Error('Caminho editorial inválido');const r=await fetch(p,{cache:'no-cache'});if(!r.ok)throw Error('HTTP '+r.status);return r.json()}
function preferences(){const p=record().preferences||{},size=Number(p.size),height=Number(p.height);document.documentElement.style.setProperty('--reading-size',(size>=18&&size<=28?size:20)+'px');document.documentElement.style.setProperty('--reading-height',height>=1.5&&height<=2.3?height:1.85);$('reading-size').value=size>=18&&size<=28?size:20;$('reading-height').value=height>=1.5&&height<=2.3?height:1.85}
function setActivity(value,focus=false){if(!['estudar','aplicar','recuperar','revisar'].includes(value))return;activity=value;
 for(const b of document.querySelectorAll('[data-method-activity]'))b.setAttribute('aria-pressed',String(b.dataset.methodActivity===value));
 $('study-panel').hidden=value!=='estudar';$('method-activities').hidden=!['aplicar','recuperar'].includes(value);$('method-review').hidden=value!=='revisar';
 if(value!=='estudar')root.AGULivros?.pause();
 if(['aplicar','recuperar'].includes(value))renderActivities(value);if(value==='revisar')renderReview();if(focus)$(value==='estudar'?'book-title':value==='revisar'?'review-title':'activity-title').focus();
}
function renderActivities(type){const box=$('activity-list');box.replaceChildren();$('activity-title').textContent=type==='aplicar'?'Aplicar ao problema jurídico':'Recuperar sem consultar';
 const items=(current?.activities||[]).filter(a=>a.type===type);if(!items.length){box.appendChild(el('p','Este capítulo ainda não tem atividades editoriais associadas.'));return}
 for(const a of items){const item=el('article',undefined,'method-activity'),heading=el('h4',a.title),ref=el('a','Consultar a seção de origem'),prompt=el('div',undefined,'reader');
 ref.href='#'+a.sectionId;ref.addEventListener('click',e=>{e.preventDefault();setActivity('estudar');root.AGULivros.move(current.sections.findIndex(s=>s.id===a.sectionId));document.getElementById(a.sectionId)?.focus()});
 root.AGULivros.renderText(prompt,a.prompt);item.append(heading,el('p',a.nature+' · '+current.curricularIds.join(', ')),ref,prompt);
 const input=el('textarea'),label=el('label','Sua hipótese ou resposta');input.id='draft-'+a.id;input.maxLength=12000;label.htmlFor=input.id;input.value=drafts.get(a.id)??record().activities?.[a.id]?.draft??'';input.addEventListener('input',()=>drafts.set(a.id,input.value));
 const save=el('button','Guardar rascunho'),show=el('button',type==='aplicar'?'Consultar caso resolvido':'Conferir respostas'),done=el('button','Registrar atividade realizada'),status=el('p','', 'method-result');status.setAttribute('role','status');
 const answer=el('div',undefined,'method-answer reader');answer.id='answer-'+a.id;answer.hidden=true;show.setAttribute('aria-expanded','false');show.setAttribute('aria-controls',answer.id);
 // A resposta só entra no DOM após solicitação explícita.
 show.addEventListener('click',()=>{answer.hidden=!answer.hidden;show.setAttribute('aria-expanded',String(!answer.hidden));if(!answer.hidden)root.AGULivros.renderText(answer,a.answer);else answer.replaceChildren()});
 function store(completed){const activities={...(record().activities||{})},old=activities[a.id]||{};activities[a.id]={...old,draft:input.value,edition:current.edition,...(completed?{performedAt:new Date().toISOString()}:{} )};if(patch({activities})){status.textContent=completed?'Atividade registrada por você. Desempenho e domínio ainda não avaliados.':'Rascunho guardado neste navegador.'}else status.textContent='Rascunho não gravado; mantenha este texto até exportá-lo.'}
 save.addEventListener('click',()=>store(false));done.addEventListener('click',()=>store(true));
 if(record().activities?.[a.id]?.performedAt)status.textContent='Atividade registrada em '+record().activities[a.id].performedAt.slice(0,10)+'. Desempenho e domínio não avaliados.';
 item.append(label,input,save,show,done,status,answer);box.appendChild(item);
 }
}
function renderReview(){const list=$('review-list'),face=$('review-face');list.replaceChildren();face.replaceChildren();try{const raw=localStorage.getItem('agu_quiz_revisao_inteligente_v1');if(raw){const r=JSON.parse(raw);if(r.schema!=='agu-review-v1'||!Array.isArray(r.attempts)||!r.cards||typeof r.cards!=='object'||Array.isArray(r.cards))throw Error('inválido')}}catch{list.appendChild(el('p','O registro de revisão está inválido. Os dados anteriores foram preservados; recupere seu backup pelo Quiz antes de avaliar cartões.'));return}face.innerHTML=selectedCardId?(root.AGUReview?.focusedHTML?.()||''):'';
 for(const ref of (current?.reviewCards||[]).filter(c=>c.status==='aprovado')){const c=root.AGUReview?.notebookEligibleCard(ref.cardId);if(!c)continue;const group=el('div'),b=el('button',c.front),status=root.AGUReview.reviewInfo(c.id);b.type='button';b.dataset.cardId=c.id;b.addEventListener('click',()=>{selectedCardId=c.id;root.AGUReview.focusCard(c.id);renderReview();face.scrollIntoView({block:'start'});face.querySelector('button')?.focus()});group.append(b,el('p',ref.label+' · '+(status.due?'Próxima revisão: '+status.due:'Sem revisão agendada')+' · '+status.seen+' avaliação(ões)', 'small muted'));list.appendChild(group)}
 if(!list.children.length)list.appendChild(el('p','Ainda não há cartões aprovados vinculados a este capítulo. Candidatos editoriais aguardam conferência.'));
}
function addResources(section,sectionId){for(const r of current.resources.filter(r=>r.sectionId===sectionId)){
 if(r.type==='figure'){const figure=el('figure',undefined,'method-figure'),img=el('img');img.src=r.src;img.alt=r.alt;img.loading='lazy';const button=el('button','Ampliar: '+r.title);button.type='button';button.addEventListener('click',()=>openFigure(r,button));figure.append(img,el('figcaption',r.title),button);const d=el('details');d.append(el('summary','Alternativa textual do diagrama'),el('p',r.alt));figure.appendChild(d);section.appendChild(figure)}
 else {const box=el('div',undefined,'method-table'),table=el('table');box.tabIndex=0;box.setAttribute('role','region');box.setAttribute('aria-label',r.title+'; tabela com rolagem própria');table.append(el('caption',r.title));const head=el('thead'),body=el('tbody');r.rows.forEach((row,i)=>{const tr=el('tr');row.forEach(value=>{const cell=el(i===0?'th':'td',value);if(i===0)cell.scope='col';tr.appendChild(cell)});(i===0?head:body).appendChild(tr)});table.append(head,body);box.appendChild(table);section.appendChild(box);const d=el('details');d.append(el('summary','Leitura linear da tabela'),el('p',r.alt));section.appendChild(d)}
}}
function openFigure(r,trigger){const d=$('figure-dialog');zoomTrigger=trigger;$('figure-title').textContent=r.title;$('figure-image').src=r.src;$('figure-image').alt=r.alt;$('figure-orientation').value=r.orientation;$('figure-scale').value='100';resizeFigure();d.showModal();$('figure-close').focus()}
function resizeFigure(){const horizontal=$('figure-orientation').value==='horizontal',scale=Number($('figure-scale').value);$('figure-scroll').classList.toggle('horizontal',horizontal);$('figure-image').style.width=horizontal?'auto':scale+'%';$('figure-image').style.height=horizontal?scale+'%':'auto'}
function decorate(book,index){if(!current||current.id!==book.id)return;
 if(renderedBook!==book.id){observer?.disconnect();const full=$('read-full');full.replaceChildren();book.pages.forEach((p,i)=>{const s=current.sections[i],section=el('section',undefined,'method-section');section.id=s.id;section.tabIndex=-1;section.dataset.sourceSection=String(i);root.AGULivros.renderText(section,p.text);section.querySelectorAll('h2,h3,h4,h5,h6').forEach((h,n)=>{h.id=s.headings[n]?.id||s.id+'-heading-'+n});addResources(section,s.id);full.appendChild(section)});renderedBook=book.id;
  if('IntersectionObserver' in root){observer=new IntersectionObserver(entries=>{if(!current||current.id!==book.id||activity!=='estudar'||$('mode').value!=='integral')return;const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(visible&&window.scrollY>full.offsetTop){root.AGULivros.remember(Number(visible.target.dataset.sourceSection));$('method-context').textContent='Seção selecionada: '+current.sections[Number(visible.target.dataset.sourceSection)].title}},{rootMargin:'-10% 0px -65% 0px'});full.querySelectorAll('.method-section').forEach(s=>observer.observe(s))}
 }
 $('method-context').textContent='Seção selecionada: '+current.sections[index].title;
 const deep=new URLSearchParams(location.search).get('secao'),target=document.getElementById(deep||current.sections[index].id);if(index>0||deep)target?.scrollIntoView({block:'start'});
}
async function loadBook(book){const token=++loadToken;const entry=catalog?.disciplines.flatMap(d=>d.chapters).find(c=>c.id===book.id);current=null;renderedBook='';selectedCardId=null;if(!entry)return;const data=await getJSON(entry.method);if(token!==loadToken)return false;if(data.id!==book.id||data.sections.length!==book.pages.length)throw Error('Índice editorial diverge do capítulo');current=data;preferences();$('method-tabs').hidden=false;const lab=$('method-lab');lab.href='laboratorio-leitura.html?livro='+encodeURIComponent(book.id);setActivity('estudar');const saved=safeDB()?.[book.id];notice(saved&&root.AGUMethodProgress.needsArchive(saved,data.edition)?'Seus registros de outra edição foram preservados. A edição atual começa sem marcações; rascunhos antigos não são respostas desta edição. Exporte o backup para conservar o histórico.':'');return true}
function renderCatalog(){if(!catalog)return;const cards=$('cards');cards.className='';cards.replaceChildren();
 for(const d of catalog.disciplines){const group=el('section',undefined,'discipline'),title=el('h3',d.name),grid=el('div',undefined,'grid');title.id='discipline-'+d.id;group.setAttribute('aria-labelledby',title.id);group.append(title,grid);
  for(const c of d.chapters){const button=el('button',undefined,'book');button.type='button';button.dataset.book=c.id;button.append(el('strong',c.title),el('span',c.curricularIds.join(', ')+' · edição '+c.edition),el('span',safeDB()?.[c.id]?'Continuar leitura':'Estudar capítulo'));grid.appendChild(button)}cards.appendChild(group)}
 const db=safeDB(),entries=catalog.disciplines.flatMap(d=>d.chapters),last=entries.filter(c=>db?.[c.id]?.updated).sort((a,b)=>String(db[b.id].updated).localeCompare(String(db[a.id].updated)))[0];$('method-continue').hidden=!last;if(last){$('method-continue').textContent='Continuar: '+last.title;$('method-continue').onclick=()=>root.AGULivros.openBook(last.id)}
}
async function init(manifest){try{catalog=await getJSON('livros/catalogo.json');for(const c of catalog.disciplines.flatMap(d=>d.chapters))manifest[c.id]=c.reader;renderCatalog();const col=await getJSON('livros/colecoes/ambiental.json'),list=$('collection-list');list.replaceChildren();for(const c of col.chapters)list.appendChild(el('li',c.title+' · '+(c.status.publication==='publicado'?'Publicado':c.status.production==='produzido'?'Produzido; revisão e publicação pendentes':'Planejado')))}catch(e){notice('Catálogo integrado indisponível. Os destinos anteriores continuam disponíveis. '+e.message)}
 for(const b of document.querySelectorAll('[data-method-activity]'))b.addEventListener('click',()=>setActivity(b.dataset.methodActivity,true));
 for(const control of ['reading-size','reading-height'])$(control).addEventListener('input',()=>{patch({preferences:{size:Number($('reading-size').value),height:Number($('reading-height').value)}});preferences()});
 $('figure-close').addEventListener('click',()=>$('figure-dialog').close());$('figure-dialog').addEventListener('close',()=>zoomTrigger?.focus());$('figure-scale').addEventListener('input',resizeFigure);$('figure-orientation').addEventListener('change',resizeFigure);
 return catalog;
}
root.AGUMethod={init,loadBook,decorate,renderCatalog,renderReview,setActivity,resetRendering:()=>{renderedBook=''},sectionId:(index=Number($('page').value))=>current?.sections[index]?.id,indexForSectionId:id=>current?.sections.findIndex(s=>s.id===id)??-1,edition:()=>current?.edition};
// O motor original chama render() ao revelar/avaliar; somente o painel contextual é atualizado.
root.render=()=>{if(activity==='revisar')renderReview()};
})(window);

/* UX-AGU-005: catálogo filtrável e apresentação imersiva sobre o Método existente. */
(function(root){
'use strict';
if(typeof document==='undefined'||!document.addEventListener)return;
const $=id=>document.getElementById(id);
const normal=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
let query='',lastBook='',catalogY=0,immersive=false,position=null;
function button(id,label,action){const b=document.createElement('button');b.id=id;b.type='button';b.textContent=label;b.addEventListener('click',action);return b}
function filter(){
 const cards=$('cards');if(!cards)return;let count=0;
 for(const b of cards.querySelectorAll('button[data-book]')){
  const group=b.closest('.discipline'),text=(group?.querySelector('h3')?.textContent||'')+' '+b.textContent;
  b.hidden=!normal(text).includes(normal(query));if(!b.hidden)count++;
 }
 for(const group of cards.querySelectorAll('.discipline'))group.hidden=!group.querySelector('button[data-book]:not([hidden])');
 $('ux-book-results').textContent=count+' capítulo(s) disponível(is)'+(count?'':'. Altere a busca.');
}
function anchor(){const sections=[...document.querySelectorAll('#read-full .method-section')];return sections.filter(e=>e.getBoundingClientRect().top<=100).at(-1)||sections[0]}
function snapshot(){const e=anchor();return e?{id:e.id,offset:e.getBoundingClientRect().top,chapter:$('book')?.dataset.chapterId}:null}
function restore(p){if(!p||p.chapter!==$('book')?.dataset.chapterId)return;const e=$(p.id);if(e)root.scrollBy(0,e.getBoundingClientRect().top-p.offset)}
function setImmersive(value){
 const book=$('book'),control=$('ux-book-immersive');if(!book||!control)return;
 const p=snapshot();immersive=value;book.dataset.immersive=String(value);control.setAttribute('aria-pressed',String(value));control.textContent=value?'Sair do modo imersivo':'Modo imersivo';
 $('ux-book-index').open=!value;$('ux-book-metrics').open=!value;
 control.focus({preventScroll:true});restore(p)
}
function init(){
 const cards=$('cards'),catalog=$('catalog'),study=$('study-panel');if(!cards||!catalog||!study||$('ux-book-search'))return;
 const search=document.createElement('div');search.className='ux-book-search';search.innerHTML='<label for="ux-book-search">Buscar capítulos e disciplinas</label><input type="search" id="ux-book-search" placeholder="Ex.: agentes públicos"><p role="status" id="ux-book-results"></p>';
 cards.before(search);$('ux-book-search').addEventListener('input',e=>{query=e.target.value;filter()});
 new MutationObserver(filter).observe(cards,{childList:true});filter();
 cards.addEventListener('click',e=>{const b=e.target.closest('button[data-book]');if(b){lastBook=b.dataset.book;catalogY=root.scrollY||0}},{capture:true});
 $('back-catalog').addEventListener('click',()=>{setImmersive(false);filter();if(lastBook)root.scrollTo(0,catalogY)});
 const settings=study.querySelector('details'),controls=study.querySelector(':scope > .controls'),stats=study.querySelector(':scope > .stats'),progress=study.querySelector(':scope > .progress');
 const index=document.createElement('details');index.id='ux-book-index';index.open=true;const is=document.createElement('summary');is.textContent='Índice e apresentação';index.append(is);controls.before(index);index.append(controls);
 const metrics=document.createElement('details');metrics.id='ux-book-metrics';metrics.open=true;const ms=document.createElement('summary');ms.textContent='Tempo e progresso';metrics.append(ms);stats.before(metrics);metrics.append(stats,progress);
 const tools=document.createElement('div');tools.className='ux-book-tools';tools.setAttribute('role','group');tools.setAttribute('aria-label','Ferramentas da leitura');
 const mode=button('ux-book-immersive','Modo imersivo',()=>setImmersive(!immersive));mode.setAttribute('aria-pressed','false');
 const aa=button('ux-book-aa','Aa',()=>{settings.open=true;$('reading-size').focus()});
 const ix=button('ux-book-show-index','Índice',()=>{index.open=true;$('page').focus()});
 const next=button('ux-book-next','Próxima seção (sem concluir)',()=>{const sel=$('page'),i=Number(sel.value);if(i<sel.options.length-1)root.AGULivros?.move(i+1)});
 tools.append(mode,aa,ix,next);study.prepend(tools);
 // Retorno à leitura mantém a seção e a posição efêmera, sem marcar conclusão.
 $('method-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-method-activity]');if(b&&b.dataset.methodActivity!=='estudar'&&!study.hidden)position=snapshot()},{capture:true});
 $('method-tabs').addEventListener('click',e=>{if(e.target.closest('[data-method-activity="estudar"]'))root.requestAnimationFrame(()=>restore(position))});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(window);
