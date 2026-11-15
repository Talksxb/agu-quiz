/* UX03 — cinco larguras reais de Chromium, apenas perfil efêmero e sintético. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-ux-baralhos-03');
const KEY='agu_quiz_revisao_inteligente_v1',PLAN='agu_quiz_planejamento_semanal_v1';
const server=http.createServer((req,res)=>{
 const requested=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html',file=path.resolve(ROOT,requested);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('forbidden')}
 fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'content-type':file.endsWith('.html')?'text/html;charset=utf-8':file.endsWith('.css')?'text/css;charset=utf-8':'application/javascript;charset=utf-8','cache-control':'no-store'});res.end(err?'missing':data)});
});
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/',results=[];
 fs.mkdirSync(OUT,{recursive:true});
 for(const width of [320,360,390,430,1280]){
  const context=await browser.newContext({viewport:{width,height:860},reducedMotion:'reduce',hasTouch:true,isMobile:width<800});
  const page=await context.newPage(),errors=[];page.on('pageerror',err=>errors.push(err.message));
  await page.addInitScript(({key,plan})=>{
   if(localStorage.getItem(key)!==null)return;
   const day=n=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+n);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
   localStorage.setItem(key,JSON.stringify({schema:'agu-review-v1',created:'2026-11-10T10:00:00Z',
    attempts:[{id:'rv-ux03-import-browser',itemId:'ri-con-01',kind:'flashcard',code:'CON-02',at:'2026-11-10T10:00:00Z',rating:'dificil',selected:null,correct:null,sourceStatus:'B_pendente_revisao_independente',due:'2026-11-11',stage:0,origin:'flashcard_autoral'}],
    cards:{'ri-con-02':{stage:1,seen:1,due:day(0),errors:0,ease:'dificil'},'ri-adm-01':{stage:1,seen:1,due:day(-1),errors:0,ease:'lembrei'},'ri-adm-02':{stage:1,seen:1,due:day(9),errors:0,ease:'facil'}}}));
   localStorage.setItem(plan,JSON.stringify({schema:1,settings:{dailyMinutes:[130,130,130,130,130,130,0]},weeks:{},created:'2026-11-10T10:00:00Z'}));
  },{key:KEY,plan:PLAN});
  await page.goto(origin,{waitUntil:'load'});
  await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  await page.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  assert.match(await page.locator('#agu-deck-library').innerText(),/36 cartões · 6 baralhos/);
  assert.equal(await page.evaluate(()=>AGUReview.exactDeck('ADM/Atos administrativos')),null);
  assert.equal(await page.evaluate(()=>AGUReview.exactDeck('ADM-06').count),12);
  assert.equal(await page.evaluate(()=>AGUReview.reviewInfo('ri-con-01').seen),0);
  assert.equal(await page.evaluate(()=>AGUReview.reviewInfo('ri-con-01').due),null);
  const con=page.locator('.agu-deck-grid article').filter({has:page.locator('.agu-deck-code:text-is("CON-02")')});
  assert.match(await con.innerText(),/1 avaliados sem data/);
  assert.match(await con.innerText(),/1 inéditos/);
  const planBefore=await page.evaluate(key=>localStorage.getItem(key),PLAN);
  await page.locator('#agu-deck-filter-discipline').selectOption('CON');
  await page.locator('#agu-deck-filter-topic').fill('CON-02');await page.locator('#agu-deck-filter-topic').press('Tab');
  await page.locator('#agu-deck-filter-status').selectOption('sem_data');
  assert.match(await page.locator('.agu-deck-filter-result').innerText(),/1 baralho · 1 cartão selecionável/);
  assert.match(await page.locator('.agu-deck-help').first().innerText(),/importadas/);
  await page.locator('.agu-deck-grid article').getByRole('button',{name:'Estudar baralho (1)'}).click();
  assert.match(await page.locator('.agu-deck-study-state').innerText(),/Histórico importado · sem agendamento local/);
  assert.match(await page.locator('.agu-deck-study-state').innerText(),/1 avaliação\(ões\) anteriores/);
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),1);
  assert.ok(await page.locator('.agu-deck-stage[aria-live="polite"]').count()>0);
  const face=page.locator('#agu-deck-face');await face.focus();await face.press('Enter');
  assert.equal(await page.evaluate(()=>document.activeElement.id),'agu-deck-rating-errei');
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),1,'revelar não avalia');
  await page.getByRole('button',{name:'Lembrei',exact:true}).click();
  assert.ok(await page.getByText('Baralho concluído').isVisible());
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),2);
  assert.equal(await page.evaluate(()=>AGUReview.reviewInfo('ri-con-01').seen),1);
  assert.ok(await page.evaluate(()=>AGUReview.reviewInfo('ri-con-01').due!==null));
  assert.match(await page.locator('.agu-deck-session').innerText(),/não domínio certificado/);
  await page.getByRole('button',{name:'Reestudar a mesma seleção'}).click();
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),2);
  await page.getByRole('button',{name:'Pausar e voltar'}).click();
  await page.reload({waitUntil:'load'});
  await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  await page.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  await page.getByRole('button',{name:'Retomar sessão'}).press('Enter');
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),2);
  assert.equal(await page.evaluate(()=>AGUReview.deckSession().order.length),1);
  const backup=await page.evaluate(()=>AGUBackup20.capture());
  assert.deepEqual(Object.keys(backup.items).sort(),[PLAN,KEY].sort());
  assert.equal(JSON.parse(backup.items[KEY]).librarySession.status,'em_andamento');
  assert.equal(await page.evaluate(key=>localStorage.getItem(key),PLAN),planBefore,'navegação não altera planejamento');
  assert.equal(await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),true);
  const spill=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert.ok(spill.scrollWidth<=spill.viewport+2,'overflow em '+width+': '+JSON.stringify(spill));
  let axeResult=null;
  if(width===390||width===1280){
   await page.addScriptTag({content:axe.source});
   axeResult=await page.evaluate(()=>axe.run(document.querySelector('#main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
   assert.equal(axeResult.violations.length,0,'axe '+width+': '+axeResult.violations.map(x=>x.id).join(','));
   await page.locator('#agu-deck-library').screenshot({path:path.join(OUT,'sessao-'+width+'.png')});
   fs.writeFileSync(path.join(OUT,'axe-'+width+'.json'),JSON.stringify({violations:axeResult.violations,incomplete:axeResult.incomplete,passes:axeResult.passes.map(x=>x.id)},null,2));
  }
  assert.deepEqual(errors,[]);
  results.push({width,attempts:2,importedWithoutSchedule:true,plannerUnchanged:true,backup:true,keyboard:true,overflow:false,axe:axeResult&&{violations:0,incomplete:axeResult.incomplete.length}});
  await context.close();
 }
 fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({target:origin,chromium:browser.version(),results},null,2));
 console.log('UX_BARALHOS_03_BROWSER_OK',JSON.stringify({target:origin,chromium:browser.version(),results}));
}
main().catch(err=>{console.error(err.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
