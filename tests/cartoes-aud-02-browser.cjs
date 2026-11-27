/* CARTOES-AUD-02 — jornada em Chromium isolado, sem aparelho Android/TalkBack. */
'use strict';
const corr01=require('./ux-agu-aud-001-axe-recheck.cjs');
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-cartoes-aud-02');
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html',file=path.resolve(ROOT,pathname);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('forbidden')}
 fs.readFile(file,(e,d)=>{res.writeHead(e?404:200,{'content-type':file.endsWith('.html')?'text/html;charset=utf-8':file.endsWith('.css')?'text/css;charset=utf-8':'application/javascript;charset=utf-8','cache-control':'no-store'});res.end(e?'missing':d)});
});
let browser;
async function main(){
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/';fs.mkdirSync(OUT,{recursive:true});const results=[];
 for(const width of [320,360,390,430,1280]){
  const context=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.goto(origin,{waitUntil:'load'});
  assert.deepEqual(await page.evaluate(()=>[AGUReview.deck().flashcards,AGUReview.deckList().length,AGUReview.deck().lotAud02_2015_02]),[53,12,4]);
  assert.equal(await page.evaluate(()=>AGUReview.exactDeck('ADM/Atos administrativos')),null);
  await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  await page.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  assert.match(await page.locator('#agu-deck-library').innerText(),/53 cartões · 12 baralhos/);
  await page.locator('#agu-deck-filter-topic').fill('ADM-27');
  await page.locator('#agu-deck-filter-topic').press('Tab');
  assert.equal(await page.locator('.agu-deck-grid article').count(),1);
  await page.locator('.agu-deck-grid article').getByRole('button',{name:'Estudar baralho'}).click();
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),0);
  const card=page.locator('#agu-deck-face');await card.focus();await card.press(width===390?'Space':'Enter');
  const details=page.locator('.agu-card-detail').filter({has:page.getByText('Referência histórica · prova AGU 2015')});await details.locator('summary').click();
  assert.match(await details.innerText(),/gabarito definitivo histórico: E/);
  assert.match(await details.innerText(),/flashcard é autoral/);
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),0);
  const report={width,axe:null,notebook:true,rating:true};
  if(width===390||width===1280){
   await page.addScriptTag({content:axe.source});
   report.axe=await page.evaluate(async()=>{const r=await axe.run(document.querySelector('#main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(x=>({id:x.id,targets:x.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(x=>({id:x.id,targets:x.nodes.map(n=>n.target)})),passed:r.passes.length}});
   report.axe.recheck=await corr01.recheck(page,'#main',report.axe,'cartoes-aud-02',width);
   fs.writeFileSync(path.join(OUT,'axe-'+width+'.json'),JSON.stringify({synthetic:true,report:report.axe},null,2));
   await page.locator('.agu-deck-session').screenshot({path:path.join(OUT,'sessao-'+width+'.png')});
   assert.equal(report.axe.violations.length,0,'violations: '+JSON.stringify(report.axe.violations));
  }
  await page.getByRole('button',{name:'Lembrei',exact:true}).click();
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),1);
  assert.equal(await page.evaluate(()=>AGUReview.reviewInfo('aud02-2015-flc-02-009').seen),1);
  assert.equal(await page.evaluate(()=>AGUReview.notebookEligibleCard('aud02-2015-flc-02-012').id),'aud02-2015-flc-02-012');
  const before=await page.evaluate(()=>localStorage.getItem('agu_quiz_revisao_inteligente_v1'));
  const backup=await page.evaluate(()=>AGUBackup20.capture());assert.ok(Object.keys(backup.items).length<=9);
  await page.reload({waitUntil:'load'});assert.equal(await page.evaluate(()=>localStorage.getItem('agu_quiz_revisao_inteligente_v1')),before);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'overflow '+width);
  assert.deepEqual(errors,[]);results.push(report);await context.close();
 }
 fs.writeFileSync(path.join(OUT,'resultado.json'),JSON.stringify({synthetic:true,origin,results},null,2));
 corr01.assertResolved();
 console.log('CARTOES_AUD_02_BROWSER_OK',JSON.stringify({origin,chromium:browser.version(),results}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
