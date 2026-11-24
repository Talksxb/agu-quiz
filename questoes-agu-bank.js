/* QUESTOES-AGU-001: leitura local, sem reprodução pública do PDF. */
(function(root){
'use strict';
const EXAM='https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/804_AGU_ADVOGADO_001_01.PDF';
const KEY='https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/GAB_DEFINITIVO_804_AGU_ADVOGADO_001_01.PDF';
const STORE='agu_question_bank_preferences_v1';
const VERSION='4.10.38';
const id=n=>'AGU-2023-P1-Q'+String(n).padStart(3,'0');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const discNames={CON:'Constitucional',ADM:'Administrativo',AGU:'Advocacia Pública',AMB:'Ambiental',CIV:'Civil',PC:'Processual Civil',PEN:'Penal e Processual Penal',EMP:'Empresarial',TRIB:'Tributário',FIN:'Financeiro','FIN-ECO':'Financeiro e Econômico',TRAB:'Trabalho',PREV:'Previdenciário',INT:'Internacional',DH:'Direitos Humanos',ELE:'Eleitoral',ECO:'Econômico',TGPFH:'Teoria Geral'};
function indexPages(pages){
 const markers=[];
 for(const p of pages){
  const width=p.width; const columns=[[],[]];
  for(const it of p.items){
   if(typeof it.str!=='string'||!it.str.trim()||!Array.isArray(it.transform))continue;
   const x=it.transform[4],y=it.transform[5]; if(!Number.isFinite(x)||!Number.isFinite(y))continue;
   columns[x<width/2?0:1].push({x,y,s:it.str});
  }
  for(let c=0;c<2;c++){
   const lines=[];
   for(const item of columns[c].sort((a,b)=>b.y-a.y||a.x-b.x)){
    let l=lines.find(t=>Math.abs(t.y-item.y)<2.5);
    if(!l){l={y:item.y,items:[]};lines.push(l)}l.items.push(item);
   }
   for(const l of lines){
    const s=l.items.sort((a,b)=>a.x-b.x).map(t=>t.s).join(' ').replace(/\s+/g,' ').trim();
    const m=s.match(/Quest[ãa]o\s*(\d{1,3})(?!\d)/i);
    if(m&&Number(m[1])>=1&&Number(m[1])<=100)markers.push({n:Number(m[1]),page:p.page,col:c,y:l.y});
   }
  }
 }
 if(markers.length!==100||markers.some((m,i)=>m.n!==i+1))throw Error('Não foi possível localizar, em ordem, os 100 cabeçalhos. Nenhuma questão será liberada.');
 return markers;
}
if(typeof module==='object'){module.exports={indexPages,id};return}
const rows=root.AGUQuestionCatalog||[];
let pref={n:1,favorites:[]};
try{const p=JSON.parse(localStorage.getItem(STORE)||'null');if(p&&Number.isInteger(p.n)&&p.n>=1&&p.n<=100&&Array.isArray(p.favorites))pref={n:p.n,favorites:[...new Set(p.favorites.filter(n=>Number.isInteger(n)&&n>=1&&n<=100))]}}catch{}
let ctx, pdf=null, markers=[], hash='', n=pref.n, choice='', confidence='', shown=false, filter='all', discipline='all', topic='all', status='', busy=false, renderSeq=0, loadingTask=null, pdfBytes=null, wide=false, zoom=1;
const savePref=()=>{if(ctx?.demo)return;try{localStorage.setItem(STORE,JSON.stringify({n,favorites:pref.favorites}))}catch{status='Preferências não salvas: armazenamento indisponível.'}};
const last=()=>{const m=new Map();for(const a of ctx.answers||[]){if(a.origin==='oficial_cebraspe_2023'&&/^AGU-2023-P1-Q\d{3}$/.test(a.question)&&typeof a.correct==='boolean')m.set(a.question,a)}return m};
const getFiltered=()=>{const map=last();return rows.filter(r=>(discipline==='all'||r.discipline===discipline)&&(topic==='all'||r.code===topic)&&(filter==='all'||(filter==='new'&&!map.has(id(r.n))&&r.key!=='X')||(filter==='wrong'&&map.get(id(r.n))?.correct===false&&r.key!=='X')||(filter==='favorite'&&pref.favorites.includes(r.n))||(filter==='annulled'&&r.key==='X')))};
const item=()=>rows.find(r=>r.n===n);
const label=r=>discNames[r.discipline]||r.discipline||'Disciplina pendente';
function refresh(focus){const b=document.getElementById('agu-question-bank');if(!b)return;const h=document.activeElement?.id;ctx.refresh();if(focus||h)queueMicrotask(()=>document.getElementById(focus||h)?.focus({preventScroll:true}))}
function choose(v){if(!rows.some(r=>r.n===v))return;n=v;choice='';confidence='';shown=false;wide=false;zoom=1;savePref();refresh('aq-title')}
function setFilter(k,v){if(k==='discipline'){discipline=v;topic='all'}else if(k==='topic')topic=v;else filter=v;const a=getFiltered();if(a.length&&!a.some(r=>r.n===n)){n=a[0].n;choice='';confidence='';shown=false;savePref()}refresh('aq-'+k)}
function next(step){const a=getFiltered(),i=a.findIndex(r=>r.n===n);if(a[i+step])choose(a[i+step].n)}
async function importPDF(file,confirmed){
 if(!file||busy||!confirmed)return;
 if(file.size>25*1024*1024){status='PDF acima de 25 MB.';refresh();return}
 busy=true;status='Conferindo estrutura do PDF local…';refresh();
 let candidate=null;
 try{
  const bytes=new Uint8Array(await file.arrayBuffer());
  if(String.fromCharCode(...bytes.slice(0,5))!=='%PDF-')throw Error('Arquivo não é PDF.');
  const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(b=>b.toString(16).padStart(2,'0')).join('');
  // Versão fixada. O documento é passado como bytes locais, jamais como URL ou upload.
  // A produção exige substituir o CDN por distribuição local revisada.
  const lib=await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@'+VERSION+'/build/pdf.mjs');
  lib.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@'+VERSION+'/build/pdf.worker.mjs';
  loadingTask=lib.getDocument({data:bytes.slice(),isEvalSupported:false,disableFontFace:false,enableXfa:false,stopAtErrors:true});
  candidate=await loadingTask.promise;
  if(candidate.numPages!==20)throw Error('O caderno esperado tem 20 páginas.');
  const meta=await candidate.getMetadata();
  const pages=[];let identity=String(meta.info?.Title||'')+' '+String(meta.info?.Subject||'');
  for(let i=1;i<=20;i++){
   const p=await candidate.getPage(i),t=await p.getTextContent();
   pages.push({page:i,width:p.getViewport({scale:1}).width,items:t.items});
   if(i<=2)identity+=' '+t.items.map(t=>t.str||'').join(' ');
  }
  if(!/804_AGU_ADVOGADO_001_01|804001_01N434893/i.test(identity)||!/CEBRASPE/i.test(identity))throw Error('Identificador e banca do caderno não reconhecidos.');
  const positions=indexPages(pages);
  const old=pdf;pdf=candidate;candidate=null;markers=positions;hash=digest;pdfBytes=bytes;choice='';confidence='';shown=false;status='100 cabeçalhos localizados. Identidade estrutural conferida; hash do exemplar local, não cotejado com bytes oficiais.';
  if(old)await old.destroy();
 }catch(e){status='Importação recusada: '+String(e.message||e).slice(0,220);if(candidate)await candidate.destroy().catch(()=>{})}
 finally{busy=false;loadingTask=null;refresh('aq-status')}
}
async function draw(){
 const seq=++renderSeq, el=document.getElementById('aq-pdf'); if(!el||!pdf)return;
 const mark=markers.find(m=>m.n===n);if(!mark)return;
 const doc=pdf;
 try{
  const p=await doc.getPage(mark.page);const vp=p.getViewport({scale:1});const ratio=Math.min(3,Math.max(1,window.devicePixelRatio||1));
  const w=wide?vp.width:vp.width/2, x=wide?0:mark.col*vp.width/2;
  // Renderização da página/coluna original, sem reconstrução de enunciados.
  const scale=Math.min(3,Math.max(.5,(Math.max(220,el.clientWidth)/w)*zoom*ratio));
  const full=document.createElement('canvas');const v=p.getViewport({scale});
  full.width=Math.ceil(v.width);full.height=Math.ceil(v.height);
  await p.render({canvasContext:full.getContext('2d'),viewport:v}).promise;
  if(seq!==renderSeq||!el.isConnected)return;
  const c=document.createElement('canvas');c.width=Math.ceil(w*scale);c.height=full.height;c.style.width=Math.round(c.width/ratio)+'px';c.style.maxWidth=zoom===1?'100%':'none';
  c.setAttribute('role','img');c.setAttribute('aria-label','Página '+mark.page+' do caderno original, '+(wide?'página integral':'coluna '+(mark.col+1))+', questão '+n);
  c.getContext('2d').drawImage(full,Math.floor(x*scale),0,c.width,c.height,0,0,c.width,c.height);
  el.replaceChildren(c);
  const t=await p.getTextContent();
  if(seq!==renderSeq||!el.isConnected)return;
  const text=document.getElementById('aq-pdf-text');if(text)text.textContent=t.items.map(i=>i.str||'').join('\n');
  const pointer=document.getElementById('aq-page-label');if(pointer)pointer.textContent='PDF · página '+mark.page+' / 20 · '+(wide?'integral':'coluna '+(mark.col+1));
 }catch(e){if(seq===renderSeq&&el.isConnected){el.textContent='Não foi possível renderizar esta página. Nenhuma resposta será registrada sem visualização.';const b=document.getElementById('aq-submit');if(b)b.disabled=true}}
}
function page(c){
 ctx=c;
 const m=last(),a=getFiltered(),r=item(),valid=rows.filter(x=>x.key!=='X'),done=valid.filter(x=>m.has(id(x.n))),hits=done.filter(x=>m.get(id(x.n)).correct).length;
 const sel=(id,values,current,fn)=>'<select id="'+id+'" onchange="'+fn+'">'+values.map(([v,l])=>'<option value="'+esc(v)+'" '+(v===current?'selected':'')+'>'+esc(l)+'</option>').join('')+'</select>';
 const opts=[...new Set(rows.map(r=>r.discipline).filter(Boolean))].sort().map(v=>[v,discNames[v]||v]);
 const topics=[...new Set(rows.filter(r=>discipline==='all'||r.discipline===discipline).map(r=>r.code).filter(Boolean))].sort().map(v=>[v,v]);
 const ready=!!pdf&&!!markers.find(x=>x.n===n);const active=a.some(x=>x.n===n); const pos=a.findIndex(x=>x.n===n);
 const answerAllowed=ready&&active&&r.key!=='X'&&!shown;
 const feedback=shown?'<section class="aq-feedback" role="status"><strong>'+(choice===r.key?'Resposta correta':'Resposta incorreta')+'</strong><p>Gabarito definitivo de 2023: '+esc(r.key)+'.</p><p>Comentário jurídico e revalidação atual pendentes. Este resultado não certifica domínio.</p></section>':'';
 const out='<section id="agu-question-bank" class="aq-bank">'+
 '<div class="aq-head"><div><p class="aq-kicker">ACERVO · CEBRASPE</p><h1>Banco de questões</h1><p>Estude na prova original e registre sua resposta aqui.</p></div><button class="secondary" onclick="setView(\'quiz\')">Treino autoral</button><a href="livros-agu.html">Livros e simulados</a></div>'+
 '<div class="aq-stats"><div><b>'+ (pdf?markers.length:0)+'</b><span>Itens locais</span></div><div><b>'+done.length+'</b><span>Resolvidas</span></div><div><b>'+hits+'</b><span>Acertos</span></div><div><b>'+(done.length-hits)+'</b><span>Erros</span></div></div>'+
 '<section class="aq-card"><h2>Advogado da União · 2023</h2><p>100 referências oficiais · 93 válidas · 7 anuladas. '+(pdf?'PDF carregado nesta sessão.':'Importe uma vez por sessão para ler o conteúdo original.')+'</p>'+
 '<div class="aq-import"><a href="'+EXAM+'" target="_blank" rel="noopener noreferrer">Baixar caderno oficial</a><label><input id="aq-confirm" type="checkbox"> Confirmo que selecionei o caderno 804_AGU_ADVOGADO_001_01 obtido no Cebraspe.</label><label for="aq-file">Importar PDF local</label><input id="aq-file" type="file" accept="application/pdf,.pdf" '+(busy?'disabled':'')+' onchange="AGUQuestionBank.load(this.files[0])"></div>'+
 '<p id="aq-status" role="status" tabindex="-1">'+esc(status||'O conteúdo não é republicado. O leitor baixa a biblioteca PDF.js de um CDN; o arquivo é processado neste navegador.')+'</p>'+
 '<details><summary>Fonte, proveniência e privacidade</summary><p>Prova de 30/04/2023; gabarito oficial definitivo. O PDF permanece na memória da sessão e precisa ser reimportado após recarga. A verificação estrutural não autentica criptograficamente o exemplar. Preferências locais não integram o backup geral nesta versão.</p><a href="'+KEY+'" target="_blank" rel="noopener noreferrer">Gabarito oficial (revela respostas)</a>'+(hash?'<p>SHA-256 local: <code>'+esc(hash)+'</code></p>':'')+'</details></section>'+
 '<section class="aq-card aq-filters"><h2>Selecionar questões</h2><div class="aq-filtergrid"><label>Disciplina'+sel('aq-discipline',[['all','Todas'],...opts],discipline,"AGUQuestionBank.filter('discipline',this.value)")+'</label><label>Assunto curricular'+sel('aq-topic',[['all','Todos / não mapeados'],...topics],topic,"AGUQuestionBank.filter('topic',this.value)")+'</label><label>Situação'+sel('aq-filter',[['all','Todas'],['new','Não resolvidas'],['wrong','Errei'],['favorite','Favoritas'],['annulled','Anuladas']],filter,"AGUQuestionBank.filter('filter',this.value)")+'</label><label>Questão'+sel('aq-number',a.map(x=>[String(x.n),'Questão '+x.n+' · '+label(x)+(x.key==='X'?' · anulada':'')]),String(n),'AGUQuestionBank.choose(Number(this.value))')+'</label></div><p>'+a.length+' resultados · '+(pos>=0?(pos+1)+' de '+a.length:'Nenhum item selecionado')+'</p></section>'+
 (!active?'<section class="aq-card"><p>Nenhuma questão corresponde aos filtros.</p></section>':
 '<article class="aq-card"><div class="aq-questionhead"><div><p class="aq-kicker">'+esc(label(r))+' · AGU 2023</p><h2 id="aq-title" tabindex="-1">Questão '+r.n+'</h2><p>'+esc(r.topic||r.code||'Vínculo curricular específico pendente')+'</p></div><button id="aq-fav" class="secondary" aria-pressed="'+pref.favorites.includes(n)+'" onclick="AGUQuestionBank.favorite()">'+(pref.favorites.includes(n)?'★ Favorita':'☆ Favoritar')+'</button></div>'+
 (ready?'<div class="aq-readerbar"><span id="aq-page-label">Página original</span><button id="aq-wide" class="secondary" onclick="AGUQuestionBank.wide()">'+(wide?'Ver coluna':'Ver página inteira')+'</button><button class="secondary" onclick="AGUQuestionBank.zoom(-.25)" aria-label="Diminuir zoom">−</button><button class="secondary" onclick="AGUQuestionBank.zoom(.25)" aria-label="Aumentar zoom">+</button></div><div id="aq-pdf" class="aq-pdf" aria-live="polite">Carregando página…</div><details><summary>Texto extraído da página (ordem pode variar)</summary><pre id="aq-pdf-text"></pre></details>':'<p class="aq-empty">Importe o caderno oficial acima para visualizar esta questão e suas alternativas. A resposta fica bloqueada até a importação.</p>')+
 (r.key==='X'?'<p class="aq-empty"><strong>Questão anulada.</strong> Consulta sem pontuação.</p>': '<fieldset class="aq-options" '+(!answerAllowed?'disabled':'')+'><legend>Marque a alternativa lida na página original</legend>'+['A','B','C','D','E'].map(v=>'<label class="aq-option"><input type="radio" name="aq-answer" value="'+v+'" '+(choice===v?'checked':'')+' onchange="AGUQuestionBank.choice(this.value)"> '+v+'</label>').join('')+'</fieldset><label>Confiança (opcional) '+sel('aq-confidence',[['','Não informar'],['low','Baixa'],['medium','Média'],['high','Alta']],confidence,'AGUQuestionBank.confidence(this.value)')+'</label><button id="aq-submit" class="primary aq-submit" '+(!answerAllowed||!choice?'disabled':'')+' onclick="AGUQuestionBank.submit()">Responder</button>')+
 feedback+'<p class="aq-small">Tentativas anteriores: '+(ctx.answers||[]).filter(x=>x.question===id(n)&&x.origin==='oficial_cebraspe_2023').length+'</p>'+
 '<div class="aq-nav"><button class="secondary" '+(pos<=0?'disabled':'')+' onclick="AGUQuestionBank.next(-1)">← Anterior</button><button class="primary" '+(pos>=a.length-1?'disabled':'')+' onclick="AGUQuestionBank.next(1)">Próxima →</button></div></article>')+
 '<details class="aq-card"><summary>Outras questões e recursos</summary><p>4 paráfrases comentadas de 2015 no Leitor Jurídico; 24 questões autorais no banco de simulados (fotografia de referência).</p><button class="secondary" onclick="openAudited2015()">Questões comentadas de 2015</button> <button class="secondary" onclick="setView(\'notebook\')">Abrir Caderno AGU</button></details></section>';
 queueMicrotask(()=>{if(document.getElementById('agu-question-bank'))draw()});return out;
}
root.AGUQuestionBank={page,choose,filter:setFilter,next,load(file){const c=document.getElementById('aq-confirm');if(!c?.checked){status='Confirme a origem do caderno antes de importar.';refresh('aq-confirm');return}importPDF(file,true)},choice(v){if(!shown&&pdf&&'ABCDE'.includes(v)&&v.length===1){choice=v;const b=document.getElementById('aq-submit');if(b)b.disabled=!document.querySelector('#aq-pdf canvas')}},confidence(v){if(['','low','medium','high'].includes(v))confidence=v},favorite(){if(ctx.demo)return;pref.favorites=pref.favorites.includes(n)?pref.favorites.filter(x=>x!==n):[...pref.favorites,n];savePref();refresh('aq-fav')},wide(){wide=!wide;refresh('aq-wide')},zoom(d){zoom=Math.max(1,Math.min(2,zoom+d));draw()},submit(){const r=item();if(!pdf||!markers.some(x=>x.n===n)||!document.querySelector('#aq-pdf canvas')||shown||r.key==='X'||!['A','B','C','D','E'].includes(choice))return;try{ctx.record(r,choice,confidence);shown=true;refresh('aq-title')}catch(e){status='Não foi possível salvar a resposta.';refresh('aq-status')}}};
})(typeof window==='undefined'?globalThis:window);
