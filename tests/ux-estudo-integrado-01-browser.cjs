/* Jornadas sintéticas em Chromium. Não equivale a Android físico ou TalkBack. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests/artifacts-ux-estudo-integrado-01');
const server=http.createServer((req,res)=>{
 const name=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html',file=path.resolve(ROOT,name);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('Forbidden')}
 fs.readFile(file,(err,b)=>{res.writeHead(err?404:200,{'content-type':file.endsWith('.html')?'text/html;charset=utf-8':file.endsWith('.css')?'text/css;charset=utf-8':'application/javascript;charset=utf-8'});res.end(err?'Missing':b)});
});
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/';
 fs.mkdirSync(OUT,{recursive:true});const results=[];
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:900},hasTouch:width<=430,reducedMotion:'reduce',acceptDownloads:true}),p=await ctx.newPage(),errors=[],scans=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());await p.goto(origin,{waitUntil:'load'});
  assert.equal(await p.evaluate(()=>localStorage.length),0);
  await p.evaluate(()=>AGUPlanner.create());const plan=await p.evaluate(()=>localStorage.getItem('agu_quiz_planejamento_semanal_v1'));
  async function scan(label){
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'sem overflow '+label+' '+width);
   await p.addScriptTag({content:axe.source});const a=await p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
   scans.push({label,violations:a.violations,incomplete:a.incomplete});fs.writeFileSync(path.join(OUT,'diagnostico-'+width+'.json'),JSON.stringify({width,scans},null,2));assert.deepEqual(a.violations,[],label+' axe '+width);
  }
  await p.locator('#agu-home-subjects').press('Enter');await scan('biblioteca');
  await p.locator('#agu-subject-discipline').selectOption('CIV');assert.match(await p.locator('.agu-subjects').innerText(),/Nenhum assunto disponível/);
  await p.locator('#agu-subject-discipline').selectOption('ADM');
  await p.locator('[data-agu-subject="ADM-06"]').press('Space');
  assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-subject-title');await scan('assunto');
  await p.screenshot({path:path.join(OUT,'assunto-'+width+'.png'),fullPage:true});
  await p.getByRole('button',{name:'Lei nº 9.784/1999 · Art. 12',exact:true}).click();
  assert.equal(await p.evaluate(()=>AGULegal.peek().unit),'L9784:art12:caput');
  if(width<=430)await p.getByRole('button',{name:'Relacionados',exact:true}).click();
  await p.getByRole('button',{name:'Comentários',exact:true}).click();
  await p.locator('#agu-legal-note').fill('Nota sintética UX: delegação e avocação.');await p.locator('#agu-save-note').press('Enter');
  await scan('leitor');
  await p.getByRole('button',{name:'← Voltar ao assunto ADM-06',exact:true}).click();
  await p.getByRole('button',{name:'Abrir Para meu caderno',exact:true}).click();
  assert.equal(await p.locator('#agu-caderno-filter-topic').inputValue(),'ADM-06');
  await p.locator('#agu-caderno-brief').fill('Qual a distinção entre delegação e avocação?');await p.locator('#agu-caderno-save').click();
  const marks=await p.evaluate(()=>JSON.stringify(AGULegal.peek().forNotebook));await scan('caderno');
  await p.getByRole('button',{name:'← Voltar ao assunto ADM-06',exact:true}).click();
  await p.getByRole('button',{name:'Abrir cartões de ADM-06',exact:true}).click();await scan('baralhos');
  assert.equal(await p.getByRole('group',{name:'Filtrar baralhos',exact:true}).isVisible(),true);
  assert.equal(await p.locator('.agu-deck-grid .agu-deck-tile').count(),1);
  await p.getByRole('button',{name:'Estudar baralho',exact:true}).press('Enter');
  await p.locator('#agu-deck-face').press('Space');await p.locator('#agu-deck-rating-lembrei').press('Enter');
  assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),1);
  const session=await p.evaluate(()=>JSON.stringify(AGUReview.deckSession()));
  await p.getByRole('button',{name:'Início',exact:true}).click();
  assert.match(await p.locator('.daily-mission').innerText(),/Baralho em andamento/);
  await p.reload({waitUntil:'load'});await p.locator('#continue-study').press('Enter');
  assert.equal(await p.evaluate(()=>JSON.stringify(AGUReview.deckSession())),session);
  assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),1);await scan('retomada');
  await p.getByRole('button',{name:'Início',exact:true}).click();await p.locator('#agu-home-subjects').click();
  // O assunto não é uma segunda sessão: revisão abre a seleção original, sem substituir a interrompida.
  await p.locator('[data-agu-subject="ADM-06"]').click();await p.getByRole('button',{name:'Revisar ADM-06',exact:true}).click();
  assert.equal(await p.evaluate(()=>JSON.stringify(AGUReview.deckSession())),session);assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),1);
  await p.getByRole('button',{name:'← Voltar ao assunto ADM-06',exact:true}).click();
  assert.match(await p.locator('#agu-subject-progress').innerText(),/1 de 12 cartões/);
  await p.getByRole('button',{name:'← Todos os assuntos',exact:true}).click();await p.locator('[data-agu-subject="ADM-17"]').click();
  await p.getByRole('button',{name:'AGU 2015 · Q6',exact:true}).click();
  assert.equal(await p.evaluate(()=>AGULegal.peek().unit),'L9784:art50:p1');assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),1);await scan('questao');
  assert.equal(await p.evaluate(()=>JSON.stringify(AGULegal.peek().forNotebook)),marks);
  assert.equal(await p.evaluate(()=>AGULegal.peek().notes['L9784:art12:caput']),'Nota sintética UX: delegação e avocação.');
  assert.equal(await p.evaluate(()=>localStorage.getItem('agu_quiz_planejamento_semanal_v1')),plan);
  const bundle=await p.evaluate(()=>AGUBackup20.capture());
  await p.getByRole('button',{name:'Evolução',exact:true}).click();await p.getByRole('button',{name:'Dados e backup Exportação, importação e confiabilidade',exact:true}).click();
  const dl=p.waitForEvent('download');await p.locator('button[onclick="AGUBackup20.exportFile()"]') .click();
  const download=await dl,downloaded=JSON.parse(fs.readFileSync(await download.path(),'utf8'));assert.deepEqual(downloaded.items,bundle.items);
  const dest=await browser.newContext(),q=await dest.newPage();await q.goto(origin,{waitUntil:'load'});
  assert.equal((await q.evaluate(b=>AGUBackup20.importMissing(b),bundle)).added,3);await q.reload({waitUntil:'load'});
  assert.equal(await q.evaluate(()=>JSON.stringify(AGULegal.peek().forNotebook)),marks);assert.equal(await q.evaluate(()=>AGUReview.attemptsInfo().length),1);
  assert.equal((await q.evaluate(b=>AGUBackup20.importMissing(b),bundle)).added,0);await dest.close();
  assert.deepEqual(errors,[]);results.push({width,scans,restored:3,attempts:1,physicalAndroid:false});await ctx.close();
 }
 fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({target:origin,chromium:browser.version(),results},null,2));
 console.log('UX_ESTUDO_INTEGRADO_01_BROWSER_OK',JSON.stringify({viewports:results.map(r=>r.width),scans:results.reduce((n,r)=>n+r.scans.length,0),chromium:browser.version()}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
