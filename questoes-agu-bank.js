/* QUESTOES-AGU-001: leitura local, sem reprodução pública do PDF. */
(function(root){
'use strict';
const EXAM='https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/804_AGU_ADVOGADO_001_01.PDF';
const KEY='https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/GAB_DEFINITIVO_804_AGU_ADVOGADO_001_01.PDF';
const STORE='agu_question_bank_preferences_v1';
const VERSION='6.5.438';
const EXAM_SHA256='943ca40b0f79266b63ed7d677ba797ce1d6bc626c422592eceb321246ecdd196';
const id=n=>'AGU-2023-P1-Q'+String(n).padStart(3,'0');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const discNames={CON:'Constitucional',ADM:'Administrativo',AGU:'Advocacia Pública',AMB:'Ambiental',CIV:'Civil',PC:'Processual Civil',PEN:'Penal e Processual Penal',EMP:'Empresarial',TRIB:'Tributário',FIN:'Financeiro','FIN-ECO':'Financeiro e Econômico',TRAB:'Trabalho',PREV:'Previdenciário',INT:'Internacional',DH:'Direitos Humanos',ELE:'Eleitoral',ECO:'Econômico',TGPFH:'Teoria Geral',SEG:'Seguridade Social'};
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

const EXAMS={
 2023:{count:100,pages:20,variant:'804_AGU_ADVOGADO_001_01',date:'30/04/2023',exam:EXAM,key:KEY,sha:EXAM_SHA256,choices:['A','B','C','D','E']},
 2015:{count:200,pages:99,variant:'187AGU_001_07',date:'11/10/2015',exam:'https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/187AGU_001_07.pdf',key:'https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/Gab_Definitivo_187AGU_001_07_SUPER-A4.pdf',choices:['C','E']}
};
const identity=(year,n)=>year===2023?id(n):'AGU-2015-187AGU-001-07-Q'+String(n).padStart(3,'0');
const validId=x=>typeof x==='string'&&(/^AGU-2023-P1-Q(?:00[1-9]|0[1-9]\d|100)$/.test(x)||/^AGU-2015-187AGU-001-07-Q(?:00[1-9]|0[1-9]\d|1\d\d|200)$/.test(x));
function validPrefs(p){
 return !!p&&p.version===2&&[2015,2023].includes(p.year)&&p.positions&&Number.isInteger(p.positions[2015])&&p.positions[2015]>=1&&p.positions[2015]<=200&&Number.isInteger(p.positions[2023])&&p.positions[2023]>=1&&p.positions[2023]<=100&&Array.isArray(p.favorites)&&p.favorites.length<=300&&new Set(p.favorites).size===p.favorites.length&&p.favorites.every(validId)&&p.notes&&typeof p.notes==='object'&&!Array.isArray(p.notes)&&Object.keys(p.notes).length<=300&&Object.entries(p.notes).every(([k,v])=>validId(k)&&v&&typeof v.text==='string'&&v.text.length<=1000&&['','norma','conceito','fato','aplicacao','tecnica'].includes(v.kind)&&['','facil','media','dificil'].includes(v.difficulty));
}
function linesFor(p,two){
 const cols=two?[[],[]]:[[]];
 for(const it of p.items){if(typeof it.str!=='string'||!it.str.trim()||!Array.isArray(it.transform))continue;const x=it.transform[4],y=it.transform[5];if(!Number.isFinite(x)||!Number.isFinite(y))continue;cols[two&&x>=p.width/2?1:0].push({x,y,s:it.str})}
 const out=[];
 for(let col=0;col<cols.length;col++){
  const lines=[];
  for(const it of cols[col].sort((a,b)=>b.y-a.y||a.x-b.x)){let l=lines.find(l=>Math.abs(l.y-it.y)<2.5);if(!l){l={y:it.y,items:[]};lines.push(l)}l.items.push(it)}
  for(const l of lines){const items=l.items.sort((a,b)=>a.x-b.x);out.push({page:p.page,col,y:l.y,x:items[0].x,first:items[0].s.trim(),width:p.width,s:items.map(x=>x.s).join(' ').replace(/\s+/g,' ').trim()})}
 }
 return out;
}
function index2015(pages){
 const lines=pages.flatMap(p=>linesFor(p,false)),markers=[];
 for(const l of lines){
  if(l.x>l.width*.105)continue;
  const m=l.s.match(/^(\d{1,3})(?:\s|$)/);if(!m||Number(m[1])!==markers.length+1)continue;
  markers.push({n:Number(m[1]),page:l.page,col:0,y:l.y});
  if(markers.length===200)break;
 }
 if(markers.length!==200)throw Error('Caderno 2015: localizados '+markers.length+' de 200 itens; importação bloqueada.');
 return markers;
}
function extractLocal(pages,markers,year){
 const lines=pages.flatMap(p=>linesFor(p,year===2023)),out=new Map();
 const loc=markers.map(m=>lines.findIndex(l=>l.page===m.page&&l.col===m.col&&Math.abs(l.y-m.y)<2.5));
 if(loc.some((v,i)=>v<0||(i&&v<=loc[i-1])))return out;
 for(let i=0;i<loc.length;i++){
  const l=lines.slice(loc[i]+(year===2023?1:0),loc[i+1]??lines.length);
  // Remover somente cabeçalho de página reconhecível; nenhum texto de prova persistido.
  const parts=l.filter(x=>!/^(?:804001_01N434893\s*)?CEBRASPE\s*[–|-]\s*AGU\s*[–|-]/i.test(x.s)&&!/^CESPE\s*\|\s*CEBRASPE\s*[–|-]\s*AGU/i.test(x.s));
  if(year===2015){out.set(i+1,{text:parts.map(x=>x.s).join('\n'),options:null});continue}
  const optionLines=parts.map((x,j)=>({j,m:x.s.match(/^([A-E])\s+(.+)/)})).filter(x=>x.m);
  if(optionLines.length===5&&optionLines.every((x,j)=>x.m[1]==='ABCDE'[j])&&optionLines[0].j>0){
   const stem=parts.slice(0,optionLines[0].j).map(x=>x.s).join('\n');
   const options=optionLines.map((x,j)=>[x.m[1],[x.m[2],...parts.slice(x.j+1,optionLines[j+1]?.j??parts.length).map(z=>z.s)].join('\n')]);
   out.set(i+1,{text:stem,options});
  }else out.set(i+1,{text:parts.map(x=>x.s).join('\n'),options:null});
 }
 return out;
}

if(typeof module==='object'){module.exports={indexPages,index2015,extractLocal,id,identity,validPrefs};return}

const allRows={2023:(root.AGUQuestionCatalog||[]).map(r=>({...r,year:2023})),2015:(root.AGUQuestionCatalog2015||[]).map(r=>({...r,year:2015}))};
let pref={version:2,year:2023,positions:{2015:1,2023:1},favorites:[],notes:{}};
try{const p=JSON.parse(localStorage.getItem(STORE)||'null');if(p&&Number.isInteger(p.n)&&p.n>=1&&p.n<=100&&Array.isArray(p.favorites)){pref.positions[2023]=p.n;pref.favorites=[...new Set(p.favorites.filter(n=>Number.isInteger(n)&&n>=1&&n<=100).map(n=>identity(2023,n)))]}}catch{}
let ctx,pdf=null,markers=[],extracted=new Map(),hash='',year=2023,n=pref.positions[2023],choice='',confidence='',shown=false,filter='all',discipline='all',topic='all',status='',busy=false,renderSeq=0,loadingTask=null,activeTask=null,wide=false,zoom=1,pageOffset=0,initialized=false,rows=allRows[2023];
const docs=new Map();
const currentId=()=>identity(year,n);
const savePref=()=>{if(ctx?.demo)return;pref.year=year;pref.positions[year]=n;try{if(!validPrefs(pref))throw Error('preferências inválidas');ctx.savePrefs(JSON.parse(JSON.stringify(pref)))}catch{status='Preferências não salvas: armazenamento indisponível.'}};
function switchYear(y){
 if(busy||![2015,2023].includes(y)||y===year)return;
 year=y;rows=allRows[y];n=pref.positions[y];const d=docs.get(y);
 pdf=d?.pdf||null;markers=d?.markers||[];extracted=d?.extracted||new Map();hash=d?.hash||'';activeTask=d?.task||null;
 choice='';confidence='';shown=false;filter='all';discipline='all';topic='all';pageOffset=0;wide=false;zoom=1;status='';savePref();refresh('aq-year');
}
const allAttempts=()=>{const valid=new Map(Object.values(allRows).flat().filter(r=>r.key!=='X').map(r=>[identity(r.year,r.n),r]));return (ctx.answers||[]).filter(a=>valid.has(a.question)&&a.origin==='oficial_cebraspe_'+valid.get(a.question).year&&typeof a.correct==='boolean')};
const last=()=>{const m=new Map();for(const a of allAttempts()){const old=m.get(a.question);if(!old||Date.parse(a.date)>=Date.parse(old.date))m.set(a.question,a)}return m};
const commented=r=>r.year===2015&&(root.AGUQuestions18?.all?.()||[]).find(q=>q.number===r.n);
const getFiltered=()=>{const map=last();return rows.filter(r=>(discipline==='all'||r.discipline===discipline)&&(topic==='all'||r.code===topic)&&(filter==='all'||(filter==='new'&&!map.has(identity(year,r.n))&&r.key!=='X')||(filter==='wrong'&&map.get(identity(year,r.n))?.correct===false&&r.key!=='X')||(filter==='favorite'&&pref.favorites.includes(identity(year,r.n)))||(filter==='annulled'&&r.key==='X')||(filter==='commented'&&commented(r))||(filter==='pending')))};
const item=()=>rows.find(r=>r.n===n);
const label=r=>discNames[r.discipline]||r.discipline||'Disciplina referencial pendente';
function refresh(focus){const b=document.getElementById('agu-question-bank');if(!b)return;const h=document.activeElement?.id;ctx.refresh();if(focus||h)queueMicrotask(()=>document.getElementById(focus||h)?.focus({preventScroll:true}))}
function choose(v){if(!rows.some(r=>r.n===v))return;n=v;choice='';confidence='';shown=false;wide=false;zoom=1;pageOffset=0;savePref();refresh('aq-title')}
function setFilter(k,v){if(k==='discipline'){discipline=v;topic='all'}else if(k==='topic')topic=v;else filter=v;const a=getFiltered();if(a.length&&!a.some(r=>r.n===n)){n=a[0].n;choice='';confidence='';shown=false;pageOffset=0;wide=false;zoom=1;savePref()}refresh('aq-'+k)}
function next(step){const a=getFiltered(),i=a.findIndex(r=>r.n===n);if(a[i+step])choose(a[i+step].n)}
async function importPDF(file,confirmed){
 const exam=EXAMS[year];
 if(!file||busy||!confirmed)return;
 if(file.size>50*1024*1024){status='PDF acima de 50 MB.';refresh();return}
 busy=true;status='Conferindo estrutura do PDF local…';refresh();
 let candidate=null;
 try{
  const bytes=new Uint8Array(await file.arrayBuffer());
  if(String.fromCharCode(...bytes.slice(0,5))!=='%PDF-')throw Error('Arquivo não é PDF.');
  const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(b=>b.toString(16).padStart(2,'0')).join('');
  const expected=exam.sha||(await fetch('./dados/questoes-agu-2015-integridade.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Manifesto de integridade indisponível');return r.json()})).sha256;
  if(!/^[a-f0-9]{64}$/.test(expected||'')||digest!==expected)throw Error('O SHA-256 não coincide com o caderno oficial conferido. Baixe o PDF exato no link acima.');
  // Dependência de mesma origem, preparada por script versionado; sem execução de CDN na sessão.
  const lib=await import('./vendor/pdfjs/pdf.mjs');
  if(lib.version!==VERSION)throw Error('Versão do leitor inesperada.');
  lib.GlobalWorkerOptions.workerSrc=new URL('./vendor/pdfjs/pdf.worker.mjs',document.baseURI).href;
  loadingTask=lib.getDocument({data:bytes.slice(),isEvalSupported:false,disableFontFace:false,enableXfa:false,stopAtErrors:true,disableWorkerRendering:true,useWasm:false});
  candidate=await loadingTask.promise;
  if(candidate.numPages!==exam.pages)throw Error('Número de páginas divergente.');
  const meta=await candidate.getMetadata();
  const pages=[];let identity=String(meta.info?.Title||'')+' '+String(meta.info?.Subject||'');
  for(let i=1;i<=exam.pages;i++){
   const p=await candidate.getPage(i),t=await p.getTextContent();
   pages.push({page:i,width:p.getViewport({scale:1}).width,items:t.items});
   if(i<=2)identity+=' '+t.items.map(t=>t.str||'').join(' ');
  }
  if(!(year===2023?/804_AGU_ADVOGADO_001_01|804001_01N434893/i:/187AGU_001_07|187AGU/i).test(identity)||!/CEBRASPE/i.test(identity))throw Error('Identificador e banca do caderno não reconhecidos.');
  const positions=year===2023?indexPages(pages):index2015(pages);
  const excerpts=extractLocal(pages,positions,year);
  const old=activeTask;activeTask=loadingTask;pdf=candidate;candidate=null;markers=positions;extracted=excerpts;hash=digest;docs.set(year,{pdf,markers,extracted,hash,task:activeTask});choice='';confidence='';shown=false;pageOffset=0;wide=false;zoom=1;status=exam.count+' cabeçalhos localizados. SHA-256 idêntico ao PDF oficial conferido.';
  if(old)await old.destroy();
 }catch(e){status='Importação recusada: '+String(e.message||e).slice(0,220);if(loadingTask&&loadingTask!==activeTask)await loadingTask.destroy().catch(()=>{})}
 finally{busy=false;loadingTask=null;refresh('aq-status')}
}
async function draw(){
 const seq=++renderSeq, el=document.getElementById('aq-pdf'); if(!el||!pdf)return;
 const mark=markers.find(m=>m.n===n);if(!mark)return;
 const doc=pdf;
 try{
  const pageNumber=Math.max(1,Math.min(doc.numPages,mark.page+pageOffset));const p=await doc.getPage(pageNumber);const vp=p.getViewport({scale:1});const ratio=Math.min(3,Math.max(1,window.devicePixelRatio||1));
  const fullPage=year===2015||wide||pageOffset!==0;const w=fullPage?vp.width:vp.width/2, x=fullPage?0:mark.col*vp.width/2;
  // Renderização da página/coluna original, sem reconstrução de enunciados.
  const scale=Math.min(3,Math.max(.5,(Math.max(220,el.clientWidth)/w)*zoom*ratio));
  const full=document.createElement('canvas');const v=p.getViewport({scale});
  full.width=Math.ceil(v.width);full.height=Math.ceil(v.height);
  await p.render({canvasContext:full.getContext('2d'),viewport:v}).promise;
  if(seq!==renderSeq||!el.isConnected)return;
  const c=document.createElement('canvas');c.width=Math.ceil(w*scale);c.height=full.height;c.style.width=Math.round(c.width/ratio)+'px';c.style.maxWidth=zoom===1?'100%':'none';
  c.setAttribute('role','img');c.setAttribute('aria-label','Página '+pageNumber+' do caderno original, '+(fullPage?'página integral':'coluna '+(mark.col+1))+', questão selecionada '+n);
  c.getContext('2d').drawImage(full,Math.floor(x*scale),0,c.width,c.height,0,0,c.width,c.height);
  el.replaceChildren(c);const submit=document.getElementById('aq-submit');if(submit)submit.disabled=shown||!choice||pageOffset!==0;
  const t=await p.getTextContent();
  if(seq!==renderSeq||!el.isConnected)return;
  const text=document.getElementById('aq-pdf-text');if(text)text.textContent=t.items.map(i=>i.str||'').join('\n');
  const pointer=document.getElementById('aq-page-label');if(pointer)pointer.textContent='PDF · página '+pageNumber+' / '+EXAMS[year].pages+' · '+(fullPage?'integral':'coluna '+(mark.col+1));
 }catch(e){if(seq===renderSeq&&el.isConnected){el.textContent='Não foi possível renderizar esta página. Nenhuma resposta será registrada sem visualização.';const b=document.getElementById('aq-submit');if(b)b.disabled=true}}
}
function page(c){
 ctx=c;
 if(!initialized&&!c.demo){if(validPrefs(c.preferences)){pref=JSON.parse(JSON.stringify(c.preferences));year=pref.year;rows=allRows[year];n=pref.positions[year]}initialized=true}
 const exam=EXAMS[year],m=last(),a=getFiltered(),r=item(),valid=rows.filter(x=>x.key!=='X'),done=valid.filter(x=>m.has(identity(year,x.n))),hits=done.filter(x=>m.get(identity(year,x.n)).correct).length;
 const local=extracted.get(n),prev=m.get(currentId()),note=pref.notes[currentId()]||{text:'',kind:'',difficulty:''},audit=commented(r);
 const sel=(id,values,current,fn)=>'<select id="'+id+'" onchange="'+fn+'">'+values.map(([v,l])=>'<option value="'+esc(v)+'" '+(v===current?'selected':'')+'>'+esc(l)+'</option>').join('')+'</select>';
 const opts=[...new Set(rows.map(r=>r.discipline).filter(Boolean))].sort().map(v=>[v,discNames[v]||v]);
 const topics=[...new Set(rows.filter(r=>discipline==='all'||r.discipline===discipline).map(r=>r.code).filter(Boolean))].sort().map(v=>[v,v]);
 const ready=!!pdf&&!!markers.find(x=>x.n===n);const active=a.some(x=>x.n===n); const pos=a.findIndex(x=>x.n===n);
 const answerAllowed=ready&&active&&r.key!=='X'&&!shown;
 const feedback=shown?'<section class="aq-feedback" role="status"><strong>'+(choice===r.key?'Resposta correta':'Resposta incorreta')+'</strong><p>Gabarito definitivo de '+year+': '+esc(r.key)+'.</p><p>Revalidação atual pendente. Este resultado não certifica domínio.</p>'+ (audit?'<button class="secondary" onclick="openAudited2015(&quot;'+esc(audit.id)+'&quot;)">Consultar comentário pontual no Leitor</button>':'<p>Comentário jurídico pendente.</p>')+'</section>':'';
 const attempts=allAttempts(),latest=[...m.values()],high=attempts.filter(a=>!a.correct&&a.confidence==='high').length,low=attempts.filter(a=>a.correct&&a.confidence==='low').length;
 const summary=(rs)=>{const ds=rs.filter(r=>r.key!=='X'&&m.has(identity(r.year,r.n)));return ds.filter(r=>m.get(identity(r.year,r.n)).correct).length+'/'+ds.length+' acertos/resolvidas'};
 const groups=(rs,k)=>[...new Set(rs.map(r=>r[k]))].filter(Boolean).sort().map(v=>'<li>'+esc(v)+': '+esc(summary(rs.filter(r=>r[k]===v)))+'</li>').join('');
 const out='<section id="agu-question-bank" class="aq-bank">'+
 '<div class="aq-head"><div><p class="aq-kicker">ACERVO · CEBRASPE</p><h1>Banco de questões</h1><p>Estude na prova original e registre sua resposta aqui.</p></div><button class="secondary" onclick="setView(\'quiz\')">Treino autoral</button><a href="livros-agu.html">Livros e simulados</a></div>'+
 '<div class="aq-stats"><div><b>'+ [...docs.values()].reduce((s,d)=>s+d.markers.length,0)+'</b><span>Itens locais</span></div><div><b>'+done.length+'</b><span>Resolvidas</span></div><div><b>'+hits+'</b><span>Acertos</span></div><div><b>'+(done.length-hits)+'</b><span>Erros</span></div></div>'+
 '<section class="aq-card"><label>Prova '+sel('aq-year',[['2023','AGU 2023 · 100 questões'],['2015','AGU 2015 · 200 itens']],String(year),'AGUQuestionBank.year(Number(this.value))')+'</label><h2>Advogado da União · '+year+'</h2><p>'+exam.count+' referências oficiais · '+valid.length+' válidas · '+(exam.count-valid.length)+' anuladas. '+(pdf?'PDF carregado nesta sessão.':'Importe uma vez por sessão para ler o conteúdo original.')+'</p>'+
 '<div class="aq-import"><a href="'+exam.exam+'" target="_blank" rel="noopener noreferrer">Baixar caderno oficial</a><label><input id="aq-confirm" type="checkbox"> Confirmo que selecionei o caderno '+exam.variant+' obtido no Cebraspe.</label><label for="aq-file">Importar PDF local</label><input id="aq-file" type="file" accept="application/pdf,.pdf" '+(busy?'disabled':'')+' onchange="AGUQuestionBank.load(this.files[0])"></div>'+
 '<p id="aq-status" role="status" tabindex="-1">'+esc(status||'O conteúdo não é republicado. O leitor PDF.js é servido pela mesma origem; o arquivo é processado neste navegador.')+'</p>'+
 '<details><summary>Fonte, proveniência e privacidade</summary><p>Prova de '+exam.date+'; gabarito oficial definitivo. O PDF permanece na memória da sessão e precisa ser reimportado após recarga. Consulte páginas adjacentes para textos compartilhados; use a página integral para conferir eventuais continuidades. O SHA-256 deve coincidir com os bytes baixados do Cebraspe em 24/11/2026; não equivale a assinatura digital da banca. Preferências e notas são gravadas no histórico principal e abrangidas pelo backup existente; o PDF não é incluído.</p><a href="'+exam.key+'" target="_blank" rel="noopener noreferrer">Gabarito oficial (revela respostas)</a>'+(hash?'<p>SHA-256 local: <code>'+esc(hash)+'</code></p>':'')+'</details></section>'+
 '<details class="aq-card"><summary>Estatísticas e caderno de erros</summary><p>'+latest.length+' questões respondidas (última resposta) · '+attempts.length+' tentativas válidas · '+high+' erros de alta confiança · '+low+' acertos de baixa confiança.</p><p>2015: '+summary(allRows[2015])+' · 2023: '+summary(allRows[2023])+'</p><details><summary>Por disciplina</summary><ul>'+groups(Object.values(allRows).flat(),'discipline')+'</ul></details><details><summary>Por assunto da prova selecionada</summary><ul>'+groups(rows,'code')+'</ul></details><button class="secondary" onclick="AGUQuestionBank.filter(&quot;filter&quot;,&quot;wrong&quot;)">Refazer erros desta prova</button></details>'+
 '<section class="aq-card aq-filters"><h2>Selecionar questões</h2><div class="aq-filtergrid"><label>Disciplina'+sel('aq-discipline',[['all','Todas'],...opts],discipline,"AGUQuestionBank.filter('discipline',this.value)")+'</label><label>Assunto curricular'+sel('aq-topic',[['all','Todos / não mapeados'],...topics],topic,"AGUQuestionBank.filter('topic',this.value)")+'</label><label>Situação'+sel('aq-filter',[['all','Todas'],['new','Não resolvidas'],['wrong','Errei'],['favorite','Favoritas'],['annulled','Anuladas'],['commented','Comentário pontual'],['pending','Atualização jurídica pendente']],filter,"AGUQuestionBank.filter('filter',this.value)")+'</label><label>Questão'+sel('aq-number',a.map(x=>[String(x.n),'Questão '+x.n+' · '+label(x)+(x.key==='X'?' · anulada':'')]),String(n),'AGUQuestionBank.choose(Number(this.value))')+'</label></div><p>'+a.length+' resultados · '+(pos>=0?(pos+1)+' de '+a.length:'Nenhum item selecionado')+'</p></section>'+
 (!active?'<section class="aq-card"><p>Nenhuma questão corresponde aos filtros.</p></section>':
 '<article class="aq-card"><div class="aq-questionhead"><div><p class="aq-kicker">'+esc(label(r))+' · AGU '+year+'</p><h2 id="aq-title" tabindex="-1">Questão '+r.n+'</h2><p>'+esc((r.topic?r.topic+' · ':'')+(r.code||'Vínculo pendente')+' (classificação referencial, não homologada)')+(r.legacyCode&&r.legacyCode!==r.code?' · ID legado: '+esc(r.legacyCode):'')+'</p></div><button id="aq-fav" class="secondary" aria-pressed="'+pref.favorites.includes(currentId())+'" onclick="AGUQuestionBank.favorite()">'+(pref.favorites.includes(currentId())?'★ Favorita':'☆ Favoritar')+'</button></div>'+
 (ready&&local?'<section class="aq-excerpt"><h3>Trecho extraído localmente</h3><p class="aq-small">'+(year===2015?'O comando pode estar em páginas anteriores. Consulte o original antes de responder.':'Extração automática; confirme a fidelidade e eventual contexto compartilhado no original.')+'</p><pre>'+esc(local.text)+'</pre></section>':'')+
 (ready?'<div class="aq-readerbar"><span id="aq-page-label">Página original</span><button id="aq-wide" class="secondary" onclick="AGUQuestionBank.wide()">'+(wide?'Ver coluna':'Ver página inteira')+'</button><button class="secondary" onclick="AGUQuestionBank.zoom(-.25)" aria-label="Diminuir zoom">−</button><button class="secondary" onclick="AGUQuestionBank.zoom(.25)" aria-label="Aumentar zoom">+</button></div><div class="aq-nav"><button class="secondary" onclick="AGUQuestionBank.context(-1)">PDF: página anterior</button><button class="secondary" onclick="AGUQuestionBank.context(0)">Voltar à questão</button><button class="secondary" onclick="AGUQuestionBank.context(1)">PDF: página seguinte</button></div><div id="aq-pdf" class="aq-pdf" aria-live="polite">Carregando página…</div><details><summary>Texto extraído da página (ordem pode variar)</summary><pre id="aq-pdf-text"></pre></details>':'<p class="aq-empty">Importe o caderno oficial acima para visualizar esta questão e suas alternativas. A resposta fica bloqueada até a importação.</p>')+
 (r.key==='X'?'<p class="aq-empty"><strong>Questão anulada.</strong> Consulta sem pontuação.</p>': '<fieldset class="aq-options '+(local?.options?'aq-optiontext':'')+'" '+(!answerAllowed?'disabled':'')+'><legend>Marque a alternativa lida na página original</legend>'+exam.choices.map(v=>'<label class="aq-option"><input type="radio" name="aq-answer" value="'+v+'" '+(choice===v?'checked':'')+' onchange="AGUQuestionBank.choice(this.value)"> '+v+'</label>').join('')+'</fieldset><label>Confiança (opcional) '+sel('aq-confidence',[['','Não informar'],['low','Baixa'],['medium','Média'],['high','Alta']],confidence,'AGUQuestionBank.confidence(this.value)')+'</label><button id="aq-submit" class="primary aq-submit" '+(!answerAllowed||!choice?'disabled':'')+' onclick="AGUQuestionBank.submit()">Responder</button>')+
 feedback+(prev?.correct===false?'<section class="aq-error"><h3>Caderno de erros</h3><label for="aq-note">Fundamento ou observação (opcional)</label><textarea id="aq-note" maxlength="1000">'+esc(note.text)+'</textarea><label>Tipo de erro'+sel('aq-kind',[['','Não informar'],['norma','Norma'],['conceito','Conceito'],['fato','Fato'],['aplicacao','Aplicação'],['tecnica','Técnica de prova']],note.kind,'void 0')+'</label><label>Dificuldade'+sel('aq-difficulty',[['','Não informar'],['facil','Fácil'],['media','Média'],['dificil','Difícil']],note.difficulty,'void 0')+'</label><button class="secondary" onclick="AGUQuestionBank.note()">Salvar nota de erro</button></section>':'')+'<p class="aq-small">Tentativas anteriores: '+(ctx.answers||[]).filter(x=>x.question===currentId()&&x.origin==='oficial_cebraspe_'+year).length+'</p>'+
 '<div class="aq-nav"><button class="secondary" '+(pos<=0?'disabled':'')+' onclick="AGUQuestionBank.next(-1)">← Anterior</button><button class="primary" '+(pos>=a.length-1?'disabled':'')+' onclick="AGUQuestionBank.next(1)">Próxima →</button></div></article>')+
 '<section class="aq-card"><h2>Questões comentadas de 2015</h2><p>Paráfrases auditadas pontualmente no Leitor Jurídico.</p><div class="aq-nav">'+(root.AGUQuestions18?.all?.()||[]).map(q=>'<button class="secondary" type="button" onclick="openAudited2015(&quot;'+esc(q.id)+'&quot;)">AGU '+esc(q.year)+' · Q'+esc(q.number)+' · '+esc(q.primaryCurricularId)+'</button>').join('')+'</div><button class="secondary" onclick="setView(\'notebook\')">Abrir Caderno AGU</button></section></section>';
 queueMicrotask(()=>{if(document.getElementById('agu-question-bank'))draw()});return out;
}
root.AGUQuestionBank={page,year:switchYear,choose,filter:setFilter,next,load(file){const c=document.getElementById('aq-confirm');if(!c?.checked){status='Confirme a origem do caderno antes de importar.';refresh('aq-confirm');return}importPDF(file,true)},choice(v){if(!shown&&pdf&&EXAMS[year].choices.includes(v)){choice=v;const b=document.getElementById('aq-submit');if(b)b.disabled=pageOffset!==0||!document.querySelector('#aq-pdf canvas')}},confidence(v){if(['','low','medium','high'].includes(v))confidence=v},note(){if(ctx.demo)return;const a=document.getElementById('aq-note'),k=document.getElementById('aq-kind'),d=document.getElementById('aq-difficulty');if(!a||!k||!d)return;pref.notes[currentId()]={text:a.value.slice(0,1000),kind:k.value,difficulty:d.value};savePref();refresh('aq-title')},favorite(){if(ctx.demo)return;pref.favorites=pref.favorites.includes(currentId())?pref.favorites.filter(x=>x!==currentId()):[...pref.favorites,currentId()];savePref();refresh('aq-fav')},wide(){wide=!wide;refresh('aq-wide')},context(d){const m=markers.find(x=>x.n===n);if(!m)return;pageOffset=d===0?0:Math.max(1-m.page,Math.min(pdf.numPages-m.page,pageOffset+d));refresh('aq-title')},zoom(d){zoom=Math.max(1,Math.min(2,zoom+d));draw()},submit(){const r=item();if(!pdf||pageOffset!==0||!markers.some(x=>x.n===n)||!document.querySelector('#aq-pdf canvas')||shown||r.key==='X'||!EXAMS[year].choices.includes(choice))return;try{ctx.record(r,choice,confidence);shown=true;if(!getFiltered().some(x=>x.n===n))filter='all';refresh('aq-title')}catch(e){status='Não foi possível salvar a resposta.';refresh('aq-status')}}};
})(typeof window==='undefined'?globalThis:window);
