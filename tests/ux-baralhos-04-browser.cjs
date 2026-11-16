/* UX04 — Chromium isolado: coerência entre visão legada, biblioteca, agenda e LEG11. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-ux-baralhos-04');
const REVIEW='agu_quiz_revisao_inteligente_v1',READER='agu_leitor_juridico_s13_v1',PLAN='agu_quiz_planejamento_semanal_v1';
const server=http.createServer((req,res)=>{
 const request=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html';
 const file=path.resolve(ROOT,request);if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('forbidden')}
 fs.readFile(file,(err,body)=>{res.writeHead(err?404:200,{'content-type':file.endsWith('.html')?'text/html;charset=utf-8':file.endsWith('.css')?'text/css;charset=utf-8':'application/javascript;charset=utf-8','cache-control':'no-store'});res.end(err?'missing':body)});
});
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/',results=[];
 fs.mkdirSync(OUT,{recursive:true});
 for(const width of [320,360,390,430,1280]){
  const context=await browser.newContext({viewport:{width,height:900},hasTouch:width<=430,reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(({review,reader,plan})=>{
   if(localStorage.getItem(review))return;
   const day=n=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+n);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
   localStorage.setItem(review,JSON.stringify({schema:'agu-review-v1',created:'2026-11-10T10:00:00Z',
    cards:{'ri-adm-01':{stage:1,seen:1,due:day(-1),errors:1,ease:'errei'},'ri-con-02':{stage:1,seen:1,due:day(0),errors:0,ease:'lembrei'}},
    attempts:[{id:'rv-ux04-browser-import0001',itemId:'ri-con-01',kind:'flashcard',code:'CON-02',at:'2026-11-10T10:00:00Z',rating:'dificil',selected:null,correct:null,sourceStatus:'B_pendente_revisao_independente',due:'2026-11-11',stage:0,origin:'flashcard_autoral'}]}));
   localStorage.setItem(reader,JSON.stringify({article:'L9784:art50',unit:'L9784:art50:I',tab:'para_caderno',mobile:'related',notes:{},forNotebook:[{id:'pc-ux04-old0001',lawId:'L4717',articleId:'L4717:art2',unitId:'L4717:art2:pu:e',origin:'leitor',topic:null,prompt:'Nota prévia sintética',createdAt:'2026-11-14T20:00:00Z',status:'pendente'}]}));
   localStorage.setItem(plan,JSON.stringify({schema:1,settings:{dailyMinutes:[130,130,130,130,130,130,0]},weeks:{},created:'2026-11-10T10:00:00Z'}));
  },{review:REVIEW,reader:READER,plan:PLAN});
  await page.goto(origin,{waitUntil:'load'});
  await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  await page.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  assert.match(await page.locator('#agu-deck-library').innerText(),/44 cartões · 9 baralhos/);
  const before=await page.evaluate(({review,plan})=>({review:localStorage.getItem(review),plan:localStorage.getItem(plan)}),{review:REVIEW,plan:PLAN});
  await page.evaluate(()=>AGUReview.select('ri-con-01'));
  assert.match(await page.locator('#main').innerText(),/Avaliações anteriores: 1 · sem agenda local/);
  assert.equal(await page.evaluate(()=>AGUReview.reviewInfo('ri-con-01').seen),0);
  assert.equal(await page.evaluate(()=>AGUReview.reviewInfo('ri-con-01').due),null);
  assert.equal(await page.evaluate(key=>localStorage.getItem(key),REVIEW),before.review);
  await page.evaluate(()=>AGUReview.select('ri-con-02'));
  assert.match(await page.locator('#main').innerText(),/Avaliações anteriores: 1 · próxima/);
  await page.locator('#agu-deck-filter-discipline').selectOption('CON');
  await page.locator('#agu-deck-filter-status').selectOption('sem_data');
  const con=page.locator('.agu-deck-grid article').filter({has:page.locator('.agu-deck-code:text-is("CON-02")')});
  assert.match(await con.innerText(),/1 avaliados sem data/);
  await con.getByRole('button',{name:'Estudar baralho (1)'}).click();
  assert.deepEqual(await page.evaluate(()=>AGUReview.deckSession().order),['ri-con-01']);
  assert.match(await page.locator('.agu-deck-study-state').innerText(),/Histórico importado · sem agendamento local/);
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),1);
  await page.locator('#agu-deck-face').focus();await page.locator('#agu-deck-face').press('Space');
  assert.equal(await page.evaluate(()=>document.activeElement?.id),'agu-deck-rating-errei');
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),1);
  const reviewBeforeMark=await page.evaluate(key=>localStorage.getItem(key),REVIEW);
  await page.locator('.agu-deck-session .agu-flash-notebook summary').click();
  await page.locator('#agu-deck-notebook-input').fill('Nota voluntária sintética UX04');
  await page.locator('#agu-deck-notebook-save').click();
  assert.equal(await page.evaluate(key=>localStorage.getItem(key),REVIEW),reviewBeforeMark);
  assert.deepEqual(await page.evaluate(()=>AGULegal.peek().forNotebook.map(x=>x.origin)),['leitor','flashcard_existente']);
  assert.equal(await page.evaluate(()=>AGULegal.peek().forNotebook.at(-1).cardId),'ri-con-01');
  // CON-02 não possui vínculo temático granular autorizado na LEG11: ausência preservada.
  assert.equal(await page.evaluate(()=>AGULegal.peek().forNotebook.at(-1).topic),null);
  await page.getByRole('button',{name:'Lembrei',exact:true}).click();
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),2);
  assert.equal(await page.evaluate(()=>AGUReview.reviewInfo('ri-con-01').seen),1);
  await page.evaluate(()=>AGUReview.rate('facil'));
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),2,'sem segunda avaliação na sessão');
  await page.getByRole('button',{name:'Reestudar a mesma seleção'}).click();
  await page.getByRole('button',{name:'Pausar e voltar'}).click();
  await page.reload({waitUntil:'load'});
  await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  await page.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  await page.getByRole('button',{name:'Retomar sessão'}).click();
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),2);
  assert.equal(await page.evaluate(()=>AGUReview.deckSession().order.length),1);
  assert.equal(await page.evaluate(key=>localStorage.getItem(key),PLAN),before.plan);
  const bundle=await page.evaluate(()=>AGUBackup20.capture());
  assert.deepEqual(Object.keys(bundle.items).sort(),[REVIEW,READER,PLAN].sort());
  const spill=await page.evaluate(()=>({sw:document.documentElement.scrollWidth,width:innerWidth,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches}));
  assert.ok(spill.sw<=spill.width+2,'overflow '+width+' '+JSON.stringify(spill));assert.equal(spill.reduced,true);
  let audit=null;
  if(width===390||width===1280){
   await page.addScriptTag({content:axe.source});
   const result=await page.evaluate(()=>axe.run(document.querySelector('#main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
   audit={violations:result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),incomplete:result.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),passes:result.passes.map(x=>x.id)};
   assert.equal(audit.violations.length,0,'axe '+width+' '+JSON.stringify(audit.violations));
   fs.writeFileSync(path.join(OUT,'axe-'+width+'.json'),JSON.stringify(audit,null,2));
  }
  await page.screenshot({path:path.join(OUT,'retomada-'+width+'.png')});
  assert.deepEqual(errors,[]);
  results.push({width,readOnlyHistory:true,notebookUnified:true,attempts:2,plannerUnchanged:true,backup:true,keyboard:true,reducedMotion:true,overflow:false,axe:audit&&{violations:audit.violations.length,incomplete:audit.incomplete.length}});
  await context.close();
 }
 fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({origin,chromium:browser.version(),results},null,2));
 console.log('UX_BARALHOS_04_BROWSER_OK',JSON.stringify({origin,chromium:browser.version(),results}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
