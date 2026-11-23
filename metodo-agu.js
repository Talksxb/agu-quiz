/* Integração contextual. Dados editoriais não são registros de aprendizagem. */
(function(root){
'use strict';
const $=id=>document.getElementById(id),el=(tag,text,cls)=>{const x=document.createElement(tag);if(text!==undefined)x.textContent=text;if(cls)x.className=cls;return x};
const KEY='agu_livros_reader_v1';let catalog=null,current=null,activity='estudar',renderedBook='',zoomTrigger=null,loadToken=0,selectedCardId=null;
function notice(message){$('method-status').textContent=message}
function safeDB(){try{const value=JSON.parse(localStorage.getItem(KEY)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:null}catch{return null}}
function record(){return safeDB()?.[current?.id]||{}}
function patch(change){if(!current)return false;const db=safeDB();if(!db){notice('O registro local está inválido. Os dados anteriores foram preservados; a leitura continua disponível.');return false}const previous=db[current.id]||{};if(typeof previous!=='object'||Array.isArray(previous)){notice('Registro deste capítulo inválido; nenhuma gravação realizada.');return false}try{db[current.id]={...previous,...change};localStorage.setItem(KEY,JSON.stringify(db));return true}catch{notice('Não foi possível guardar neste navegador. O registro anterior foi preservado.');return false}}
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
 const input=el('textarea'),label=el('label','Sua hipótese ou resposta');input.id='draft-'+a.id;input.maxLength=12000;label.htmlFor=input.id;input.value=record().activities?.[a.id]?.draft||'';
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
function renderReview(){const list=$('review-list'),face=$('review-face');list.replaceChildren();face.innerHTML=selectedCardId?(root.AGUReview?.focusedHTML?.()||''):'';
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
 if(renderedBook!==book.id){const full=$('read-full');full.replaceChildren();book.pages.forEach((p,i)=>{const s=current.sections[i],section=el('section',undefined,'method-section');section.id=s.id;section.tabIndex=-1;section.dataset.sourceSection=String(i);root.AGULivros.renderText(section,p.text);addResources(section,s.id);full.appendChild(section)});renderedBook=book.id}
 $('method-context').textContent='Seção selecionada: '+current.sections[index].title;
 const deep=new URLSearchParams(location.search).get('secao'),target=document.getElementById(deep||current.sections[index].id);if(index>0||deep)target?.scrollIntoView({block:'start'});
}
async function loadBook(book){const token=++loadToken;const entry=catalog?.disciplines.flatMap(d=>d.chapters).find(c=>c.id===book.id);current=null;renderedBook='';selectedCardId=null;if(!entry)return;const data=await getJSON(entry.method);if(token!==loadToken)return false;if(data.id!==book.id||data.sections.length!==book.pages.length)throw Error('Índice editorial diverge do capítulo');current=data;preferences();$('method-tabs').hidden=false;const lab=$('method-lab');lab.href='laboratorio-leitura.html?livro='+encodeURIComponent(book.id);setActivity('estudar');notice('');return true}
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
root.AGUMethod={init,loadBook,decorate,renderCatalog,renderReview,setActivity,resetRendering:()=>{renderedBook=''},sectionId:()=>current?.sections[Number($('page').value)]?.id};
// O motor original chama render() ao revelar/avaliar; somente o painel contextual é atualizado.
root.render=()=>{if(activity==='revisar')renderReview()};
})(window);
