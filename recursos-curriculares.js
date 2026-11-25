/* AUD-UX-004: índice de recursos públicos; matriz privada somente na memória local. */
(function(root){
'use strict';
const valid=id=>typeof id==='string'&&/^[A-Z]+(?:-[A-Z]+)*-\d{2,3}[a-z]?$/.test(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function collect(env=root,matrix=null){
 const topics=new Map(),get=(id,title='')=>{if(!valid(id))return null;if(!topics.has(id))topics.set(id,{id,title,cards:[],books:[],laws:[],official:[],historical:[]});const t=topics.get(id);if(title&&!t.title)t.title=title;return t};
 for(const d of env.AGUReview?.deckList?.()||[])get(d.code,d.title);
 for(const c of env.AGUReview?.searchCards?.()||[])get(c.code)?.cards.push({id:c.id,front:c.front});
 for(const [id,b]of Object.entries(env.AGU_METHOD_BOOK_REFERENCES?.chapters||{}))for(const code of b.curricularIds||[])get(code,b.title)?.books.push({id,title:b.title,edition:b.edition});
 for(const law of env.AGU_LEGAL_CORPUS?.laws||[])for(const a of law.articles||[])if(a.clauses?.[0]?.id)get(a.topic)?.laws.push({lawId:law.id,unit:a.clauses[0].id,label:law.title+' · '+a.label});
 const contract=env.AGUVigenteContract;
 for(const q of env.AGUCurrentQuestions?.items||[])if(contract?.eligible(q))get(q.code)?.official.push({id:q.id,n:q.n});
 for(const [key,rows]of Object.entries({2023:env.AGUQuestionCatalog,2015:env.AGUQuestionCatalog2015,pf2023:env.AGUQuestionCatalogPF2023}))for(const q of rows||[])get(q.code)?.historical.push({year:key==='pf2023'?key:Number(key),n:q.n,annulled:q.key==='X'});
 let local=false;try{local=!!matrix&&env.AGUValidateMatrix?.(matrix)===true}catch(_){}
 if(local)for(const x of matrix.itens){const t=get(x.id);if(t)t.title=x.titulo_operacional}
 return {localMatrix:local,matrixCount:local?matrix.itens.length:0,topics:[...topics.values()].sort((a,b)=>a.id.localeCompare(b.id,'pt-BR'))};
}
let selected='',discipline='todas',last=null;
const prefix=id=>id.replace(/-\d+[a-z]?$/,'');
function panel(matrix){
 last=collect(root,matrix);const ds=[...new Set(last.topics.map(t=>prefix(t.id)))];if(!ds.includes(discipline))discipline='todas';
 const list=last.topics.filter(t=>discipline==='todas'||prefix(t.id)===discipline);if(!list.some(t=>t.id===selected))selected=(list.find(x=>x.cards.length||x.books.length||x.laws.length||x.official.length)||list[0])?.id||'';const t=list.find(t=>t.id===selected);
 const items=(xs,f)=>xs.length?'<ul>'+xs.map(x=>'<li>'+f(x)+'</li>').join('')+'</ul>':'<p class="small muted">Sem recurso relacionado neste acervo.</p>';
 return '<section class="card" aria-labelledby="agu-curricular-heading"><h2 id="agu-curricular-heading">Recursos por ID curricular</h2><p>Escolha o assunto para abrir seus recursos. Disponibilidade não significa estudo ou domínio.</p><p class="small muted">'+(last.localMatrix?'Matriz importada localmente: '+last.matrixCount+' IDs.':'Sem matriz importada: exibimos somente IDs presentes nos recursos públicos. Os 412 IDs podem ser consultados pela importação local validada.')+'</p>'+
 '<div style="display:grid;grid-template-columns:minmax(0,1fr);gap:12px"><label style="min-width:0" for="agu-curricular-discipline">Disciplina<select style="min-width:0;max-width:100%;width:100%" id="agu-curricular-discipline" onchange="AGUCurriculum.discipline(this.value)"><option value="todas">Todas</option>'+ds.map(x=>'<option value="'+esc(x)+'" '+(discipline===x?'selected':'')+'>'+esc(x)+'</option>').join('')+'</select></label><label style="min-width:0" for="agu-curricular-topic">Assunto curricular<select style="min-width:0;max-width:100%;width:100%" id="agu-curricular-topic" onchange="AGUCurriculum.select(this.value)">'+list.map(x=>'<option value="'+esc(x.id)+'" '+(selected===x.id?'selected':'')+'>'+esc(x.id)+(x.title?' · '+esc(x.title):'')+'</option>').join('')+'</select></label></div>'+
 (t?'<article id="agu-curricular-resources"><h3>'+esc(t.id)+(t.title?' · '+esc(t.title):'')+'</h3><p class="small muted">Identidade por código exato. Vínculos históricos de prova são referenciais, não homologação jurídica.</p><h4>Flashcards · '+t.cards.length+'</h4>'+(t.cards.length?'<button type="button" class="primary" onclick="AGUCurriculum.cards(event.detail===0)">Estudar cartões de '+esc(t.id)+'</button>':'<p class="small muted">Sem flashcards neste assunto.</p>')+
 '<h4>Capítulos publicados · '+t.books.length+'</h4>'+items(t.books,b=>'<a href="livros-agu.html?livro='+encodeURIComponent(b.id)+'">'+esc(b.title)+' · edição '+esc(b.edition)+'</a>')+
 '<h4>Legislação relacionada · '+t.laws.length+'</h4>'+items(t.laws,l=>'<a href="index.html?abrir=lei&amp;norma='+encodeURIComponent(l.lawId)+'&amp;dispositivo='+encodeURIComponent(l.unit)+'">'+esc(l.label)+'</a>')+
 '<h4>Questões do lote vigente · '+t.official.length+'</h4>'+items(t.official,q=>'<a href="questoes-vigentes.html?questao='+encodeURIComponent(q.id)+'">Questão '+q.n+' · '+esc(q.id)+'</a>')+
 '<details><summary>Referências históricas · '+t.historical.length+'</summary><p class="small muted">Exigem o PDF original na sessão. Anuladas são consultivas, sem pontuação. Gabaritos históricos são preservados.</p>'+items(t.historical,q=>'<button class="secondary" type="button" onclick="AGUCurriculum.historical(\''+q.year+'\','+q.n+',event.detail===0)">'+(q.year==='pf2023'?'Procurador Federal 2023':'Advogado da União '+q.year)+' · Q'+q.n+(q.annulled?' · anulada':'')+'</button>')+'</details></article>':'<p>Nenhum recurso disponível.</p>')+'</section>';
}
function focus(id){root.document?.getElementById(id)?.focus?.()}
function select(id){if(!last?.topics.some(t=>t.id===id))return false;selected=id;root.render?.();focus('agu-curricular-topic');return true}
function filter(value){discipline=value;selected='';root.render?.();focus('agu-curricular-discipline')}
function cards(keyboard=false){
 const t=last?.topics.find(t=>t.id===selected);if(!t?.cards.length||!root.AGUReview?.exactDeck(t.id))return false;
 root.AGUReview.deckPause(false);root.AGUReview.deckClearFilters(false);root.setView('review');return root.AGUReview.deckStart(t.id,keyboard);
}
function historical(year,n,keyboard=false){
 const t=last?.topics.find(t=>t.id===selected),y=year==='pf2023'?year:Number(year);if(!t?.historical.some(q=>q.year===y&&q.n===n))return false;
 root.setView('officialExam');root.AGUQuestionBank.year(y);if(root.document?.getElementById('aq-year')?.value!==String(y))return false;root.AGUQuestionBank.choose(n);if(keyboard)focus('aq-title');return true;
}
const api={collect,valid,panel,select,discipline:filter,cards,historical};
if(typeof module==='object'&&module.exports){module.exports=api;return}root.AGUCurriculum=api;
})(typeof window==='undefined'?globalThis:window);
