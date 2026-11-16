/* CARTOES-AUD-01 — jornada Chromium sintética, sem Android/TalkBack nem perfil pessoal. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-cartoes-aud-01');
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html';
 const file=path.resolve(ROOT,pathname);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('forbidden')}
 fs.readFile(file,(error,data)=>{res.writeHead(error?404:200,{'content-type':file.endsWith('.html')?'text/html;charset=utf-8':file.endsWith('.css')?'text/css;charset=utf-8':'application/javascript;charset=utf-8','cache-control':'no-store'});res.end(error?'missing':data)});
});
let browser;
async function main(){
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/';
 const results=[];fs.mkdirSync(OUT,{recursive:true});
 for(const width of [320,360,390,430,1280]){
  const context=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(origin,{waitUntil:'load'});
  assert.deepEqual(await page.evaluate(()=>({cards:AGUReview.deck().flashcards,lot:AGUReview.deck().lotAud02_2015,decks:AGUReview.deckList().length})),{cards:48,lot:8,decks:10});
  await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  await page.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  assert.match(await page.locator('#agu-deck-library').innerText(),/48 cartões · 10 baralhos/);
  await page.locator('#agu-deck-filter-topic').fill('ADM-58');
  await page.locator('#agu-deck-filter-topic').press('Tab');
  assert.equal(await page.locator('.agu-deck-grid article').count(),1);
  await page.locator('.agu-deck-grid article').getByRole('button',{name:'Estudar baralho'}).click();
  assert.match(await page.locator('.agu-deck-stage').first().innerText(),/cartão 1 de 1/i);
  assert.equal(await page.evaluate(()=>AGUReview.reviewInfo('aud02-2015-flc-006').seen),0);
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),0);
  const face=page.locator('#agu-deck-face');await face.focus();await face.press(width===360||width===1280?'Space':'Enter');
  assert.ok(await page.getByText('Verso · resposta').isVisible());
  const expanded=page.locator('.agu-card-detail').filter({has:page.getByText('Referência histórica · prova AGU 2015')});
  await expanded.locator('summary').click();
  assert.match(await expanded.innerText(),/gabarito definitivo histórico: E/);
  assert.ok(await expanded.getByRole('link',{name:'Caderno original (PDF)'}).count());
  assert.ok(await expanded.getByRole('link',{name:'Gabarito definitivo (PDF)'}).count());
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),0,'revelação e links não avaliam');
  const test={width,violationCount:null,incompleteRules:null,incompleteNodes:null,keyboard:true,backup:true};
  if(width===390||width===1280){
   await page.addScriptTag({content:axe.source});
   const report=await page.evaluate(async()=>{
    const a=await axe.run(document.querySelector('#main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});
    return {violations:a.violations.map(x=>({id:x.id,nodes:x.nodes.map(n=>n.target)})),incomplete:a.incomplete.map(x=>({id:x.id,nodes:x.nodes.map(n=>n.target)})),passed:a.passes.length};
   });
   test.violationCount=report.violations.length;
   test.incompleteRules=report.incomplete.length;
   test.incompleteNodes=report.incomplete.reduce((sum,x)=>sum+x.nodes.length,0);
   fs.writeFileSync(path.join(OUT,'axe-'+width+'.json'),JSON.stringify({kind:'synthetic',viewport:width,report},null,2));
   await page.locator('.agu-deck-session').screenshot({path:path.join(OUT,'card-'+width+'.png')});
   assert.equal(report.violations.length,0,'axe violações '+width+': '+JSON.stringify(report.violations));
  }
  await page.getByRole('button',{name:'Lembrei',exact:true}).click();
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),1);
  assert.ok(await page.getByText('Baralho concluído').isVisible());
  const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('agu_quiz_revisao_inteligente_v1')));
  assert.equal(before.cards['aud02-2015-flc-006'].seen,1);
  assert.equal(before.cards['aud02-2015-flc-006'].stage,1);
  assert.equal(before.librarySession.status,'concluida');
  const backup=await page.evaluate(()=>AGUBackup20.capture());
  assert.ok(backup.items.agu_quiz_revisao_inteligente_v1);
  await page.reload({waitUntil:'load'});
  assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('agu_quiz_revisao_inteligente_v1'))),before);
  assert.equal(await page.evaluate(()=>AGUReview.deck().flashcards),48);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'sem overflow '+width);
  assert.deepEqual(errors,[]);results.push(test);await context.close();
 }
 fs.writeFileSync(path.join(OUT,'resultado.json'),JSON.stringify({kind:'synthetic',origin,results},null,2));
 console.log('CARTOES_AUD_01_BROWSER_OK',JSON.stringify({origin,chromium:browser.version(),results}));
}
main().catch(error=>{console.error(error.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
