/* UX05 — Chromium isolado: histórico longo, LEG11/12 e limites sem Android físico. */
'use strict';
const {chromium}=require('playwright');
const axe=require('axe-core');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-ux-baralhos-05');
const REVIEW='agu_quiz_revisao_inteligente_v1',READER='agu_leitor_juridico_s13_v1',PLAN='agu_quiz_planejamento_semanal_v1';
const server=http.createServer((req,res)=>{
 const requested=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html';
 const file=path.resolve(ROOT,requested);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('forbidden')}
 fs.readFile(file,(err,body)=>{res.writeHead(err?404:200,{'content-type':file.endsWith('.html')?'text/html;charset=utf-8':file.endsWith('.css')?'text/css;charset=utf-8':'application/javascript;charset=utf-8','cache-control':'no-store'});res.end(err?'missing':body)});
});
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/';
 const results=[];fs.mkdirSync(OUT,{recursive:true});
 for(const width of [320,360,390,430,1280]){
  const context=await browser.newContext({viewport:{width,height:900},hasTouch:width<=430,reducedMotion:'reduce'});
  const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());
  await p.addInitScript(({review,reader,plan})=>{
   if(localStorage.getItem(review))return;
   const day=n=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+n);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
   const attempts=Array.from({length:1200},(_,i)=>({id:'rv-ux05-browser-'+String(i).padStart(5,'0'),itemId:'ri-con-01',kind:'flashcard',code:'CON-02',at:'2026-11-10T10:00:00Z',rating:'dificil',selected:null,correct:null,sourceStatus:'B_pendente_revisao_independente',due:'2026-11-11',stage:0,origin:'flashcard_autoral'}));
   localStorage.setItem(review,JSON.stringify({schema:'agu-review-v1',created:'2026-11-10T10:00:00Z',cards:{
    'ri-adm-01':{stage:0,seen:1,due:day(-1),errors:1,ease:'errei'},
    'ri-adm-02':{stage:1,seen:1,due:day(0),errors:0,ease:'lembrei'},
    'ri-con-02':{stage:1,seen:1,due:day(8),errors:0,ease:'lembrei'}},attempts}));
   localStorage.setItem(reader,JSON.stringify({article:'L4717:art2',unit:'L4717:art2:pu:e',tab:'juris',mobile:'text',notes:{'L4717:art2:pu:e':'Nota prévia sintética'},forNotebook:[
    {id:'pc-ux05-reader0001',lawId:'L4717',articleId:'L4717:art2',unitId:'L4717:art2:pu:e',origin:'leitor',topic:null,prompt:'Nota do leitor',createdAt:'2026-11-14T20:00:00Z',status:'pendente'},
    {id:'pc-ux05-study0001',lawId:null,articleId:null,unitId:null,deviceId:'L9784:art12:caput',sessionId:'ags-ux05-001',origin:'estudo_integrado',topic:'ADM-06',prompt:'Nota da sessão',createdAt:'2026-11-14T20:00:00Z',status:'anotado'},
    {id:'pc-ux05-question1',lawId:null,articleId:null,unitId:null,questionId:'of-2015-adv-006',questionLabel:'AGU 2015 · Q6 · 187AGU_001_07',origin:'questao_verificada',topic:'ADM-17',prompt:'Nota da questão',createdAt:'2026-11-14T20:00:00Z',status:'dispensado'},
    {id:'pc-ux05-flash0001',lawId:null,articleId:null,unitId:null,cardId:'ri-con-01',cardLabel:'Flashcard ri-con-01 · CON-02',origin:'flashcard_existente',topic:null,prompt:'Nota do cartão',createdAt:'2026-11-14T20:00:00Z',status:'pendente'}]}));
   localStorage.setItem(plan,JSON.stringify({schema:1,settings:{dailyMinutes:[130,130,130,130,130,130,0]},weeks:{},created:'2026-11-10T10:00:00Z'}));
  },{review:REVIEW,reader:READER,plan:PLAN});
  await p.goto(origin,{waitUntil:'load'});
  assert.match(await p.locator('#agu-home-notebook-count').innerText(),/2 marcações pendentes/);
  await p.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  await p.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  const before=await p.evaluate(({review,plan})=>({review:localStorage.getItem(review),plan:localStorage.getItem(plan)}),{review:REVIEW,plan:PLAN});
  assert.equal(await p.evaluate(()=>AGUReview.deckList().find(x=>x.code==='CON-02').noDate),1);
  const states=['vencidos','hoje','futuros','sem_data','ineditos'];
  for(const status of states){
   await p.locator('#agu-deck-filter-status').selectOption(status);
   assert.ok((await p.locator('.agu-deck-grid article').count())>0,'estado '+status+' tem subconjunto');
  }
  assert.equal(await p.evaluate(({review})=>localStorage.getItem(review),{review:REVIEW}),before.review);
  await p.locator('#agu-deck-filter-status').selectOption('sem_data');
  const con=p.locator('.agu-deck-grid article').filter({has:p.locator('.agu-deck-code:text-is("CON-02")')});
  assert.match(await con.innerText(),/1 avaliados sem data/);
  await con.getByRole('button',{name:'Estudar baralho (1)'}).click();
  assert.deepEqual(await p.evaluate(()=>AGUReview.deckSession().order),['ri-con-01']);
  assert.match(await p.locator('.agu-deck-study-state').innerText(),/1200 avaliação\(ões\) anteriores/);
  assert.equal(await p.evaluate(()=>AGUReview.reviewInfo('ri-con-01').seen),0);
  assert.equal(await p.evaluate(()=>AGUReview.reviewInfo('ri-con-01').due),null);
  assert.ok(await p.locator('[aria-live="polite"]').count()>0);
  await p.locator('#agu-deck-face').focus();await p.locator('#agu-deck-face').press(width%2?'Enter':'Space');
  assert.equal(await p.evaluate(()=>document.activeElement?.id),'agu-deck-rating-errei');
  assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),1200);
  assert.equal(await p.evaluate(()=>AGULegal.peek().forNotebook.length),4,'revelação não cria nota');
  await p.locator('.agu-deck-session .agu-flash-notebook summary').click();
  await p.locator('#agu-deck-notebook-input').fill('Gatilho voluntário de aprendizagem UX05');
  await p.locator('#agu-deck-notebook-save').click();
  assert.equal(await p.evaluate(()=>AGULegal.peek().forNotebook.length),5);
  assert.equal(await p.evaluate(()=>AGULegal.peek().forNotebook.at(-1).topic),null);
  assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),1200);
  await p.getByRole('button',{name:'Lembrei',exact:true}).click();
  assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),1201);
  assert.equal(await p.evaluate(()=>AGUReview.reviewInfo('ri-con-01').seen),1);
  await p.evaluate(()=>AGUReview.rate('facil'));
  assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),1201,'sem segunda avaliação na mesma sessão');
  await p.getByRole('button',{name:'Reestudar a mesma seleção'}).click();
  await p.getByRole('button',{name:'Pausar e voltar'}).click();
  await p.reload({waitUntil:'load'});
  await p.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  await p.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  assert.equal(await p.evaluate(()=>AGUReview.deckSession().status),'em_andamento');
  await p.locator('#agu-deck-filter-status').selectOption('todos');
  await p.locator('.agu-deck-grid article').filter({has:p.locator('.agu-deck-code:text-is("CON-02")')}).getByRole('button',{name:'Escolher sessão'}).click();
  assert.match(await p.locator('#agu-deck-choice').innerText(),/Escolha como continuar/);
  await p.getByRole('button',{name:'Iniciar nova seleção (2)'}).click();
  assert.equal(await p.evaluate(()=>AGUReview.deckSession().order.length),2,'troca deliberada para dois cartões');
  assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),1201,'trocar seleção não avalia');
  const a11y={};
  if(width===390||width===1280){
   await p.addScriptTag({content:axe.source});
   const r=await p.evaluate(async()=>{const a=await axe.run(document.querySelector('#main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:a.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),incomplete:a.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),passed:a.passes.map(x=>x.id)}});
   assert.deepEqual(r.violations,[],'violação confirmada em '+width);
   a11y.initial=r;a11y.afterScroll=[];
   for(const rule of r.incomplete)for(const targets of rule.nodes){
    const selector=targets[0];if(typeof selector!=='string'||!await p.locator(selector).count())continue;
    await p.locator(selector).first().scrollIntoViewIfNeeded();
    const check=await p.evaluate(async({selector,id})=>{const v=await axe.run(document.querySelector(selector),{runOnly:{type:'rule',values:[id]}});return {rule:id,selector,violations:v.violations.length,incomplete:v.incomplete.length}},{selector,id:rule.id});
    assert.equal(check.violations,0);a11y.afterScroll.push(check);
   }
   a11y.unresolvedAfterScroll=a11y.afterScroll.filter(x=>x.incomplete);
   fs.writeFileSync(path.join(OUT,'axe-'+width+'.json'),JSON.stringify(a11y,null,2));
  }
  const geometry=await p.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches}));
  assert.ok(geometry.scrollWidth<=geometry.viewport+2,'overflow '+width+' '+JSON.stringify(geometry));
  assert.equal(geometry.reduced,true);
  await p.screenshot({path:path.join(OUT,'sessao-'+width+'.png')});
  const snapshot=await p.evaluate(()=>AGUBackup20.capture());
  assert.deepEqual(Object.keys(snapshot.items).sort(),[REVIEW,READER,PLAN].sort());
  const isolated=await browser.newContext({viewport:{width,height:900}}),q=await isolated.newPage();
  await q.goto(origin,{waitUntil:'load'});
  const imported=await q.evaluate(bundle=>({first:AGUBackup20.importMissing(bundle),second:AGUBackup20.importMissing(bundle),size:AGUBackup20.keys().filter(x=>x.key!=='agu_livros_reader_v1').length,notes:JSON.parse(localStorage.getItem('agu_leitor_juridico_s13_v1')).forNotebook.length}),snapshot);
  assert.equal(imported.first.added,3);assert.equal(imported.second.added,0);
  assert.equal(imported.size,9);assert.equal(imported.notes,5);
  await isolated.close();
  await p.evaluate(()=>setView('dashboard'));
  const reviewBeforeHome=await p.evaluate(key=>localStorage.getItem(key),REVIEW);
  assert.match(await p.locator('#agu-home-notebook-count').innerText(),/3 marcações pendentes/);
  await p.locator('#agu-home-notebook-open').press('Enter');
  assert.equal(await p.locator('#agu-caderno-list').count(),1);
  await p.locator('#agu-home-notebook-return').press('Enter');
  assert.equal(await p.evaluate(()=>document.activeElement?.id),'agu-home-notebook-open');
  assert.equal(await p.evaluate(key=>localStorage.getItem(key),REVIEW),reviewBeforeHome);
  assert.equal(await p.evaluate(key=>localStorage.getItem(key),PLAN),before.plan);
  assert.deepEqual(errors,[]);
  results.push({width,syntheticHistory:1200,oneAndTwoCards:true,explicitNotebook:true,sameReaderList:true,restoreMissingOnly:true,keyboard:true,reducedMotion:true,overflow:false,
   axe:width===390||width===1280?{violations:a11y.initial.violations.length,incomplete:a11y.initial.incomplete.length,unresolvedAfterScroll:a11y.unresolvedAfterScroll.length}:null});
  await context.close();
 }
 fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({origin,chromium:browser.version(),results,androidPhysical:false,talkBackPhysical:false},null,2));
 console.log('UX_BARALHOS_05_BROWSER_OK',JSON.stringify({origin,chromium:browser.version(),results}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
