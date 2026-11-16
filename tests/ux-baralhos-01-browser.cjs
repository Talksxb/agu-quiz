/* UX-BARALHOS-01 | Chromium real em cinco larguras; somente contexto isolado. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-ux-baralhos-01');
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html';
 const file=path.resolve(ROOT,pathname);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('forbidden')}
 fs.readFile(file,(error,data)=>{res.writeHead(error?404:200,{'content-type':file.endsWith('.html')?'text/html;charset=utf-8':file.endsWith('.css')?'text/css;charset=utf-8':'application/javascript;charset=utf-8','cache-control':'no-store'});res.end(error?'missing':data)});
});
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/';
 const results=[];fs.mkdirSync(OUT,{recursive:true});
 for(const width of [320,360,390,430,1280]){
  const context=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.goto(origin,{waitUntil:'load'});
  await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  await page.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  assert.equal(await page.locator('.agu-deck-tile article').count(),0);
  assert.equal(await page.locator('.agu-deck-grid article').count(),11);
  assert.match(await page.locator('#agu-deck-library').innerText(),/51 cartões · 11 baralhos/);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'sem overflow biblioteca '+width);
  const colors=await page.locator('.agu-deck-grid article').evaluateAll(nodes=>nodes.map(n=>({code:n.querySelector('.agu-deck-code').textContent,accent:getComputedStyle(n).getPropertyValue('--deck-accent').trim()})));
  assert.notEqual(colors.find(c=>c.code==='ADM-06').accent,colors.find(c=>c.code==='CON-02').accent);
  await page.locator('#agu-deck-filter-discipline').selectOption('CON');
  assert.equal(await page.locator('.agu-deck-grid article').count(),3);
  await page.locator('#agu-deck-filter-topic').fill('CON-02');await page.locator('#agu-deck-filter-topic').press('Tab');
  assert.equal(await page.locator('.agu-deck-grid article').count(),1);
  await page.locator('.agu-deck-grid article').getByRole('button',{name:'Estudar baralho'}).click();
  assert.equal(await page.locator('.agu-deck-grid article').count(),0,'sessão ocupa a área principal');
  assert.ok(await page.locator('.agu-deck-session').evaluate(node=>node.getBoundingClientRect().top<innerHeight),'sessão visível sem longa rolagem '+width);
  if(width===390||width===1280){
   await page.addScriptTag({content:axe.source});
   const cardAudit=await page.evaluate(async()=>await axe.run(document.querySelector('#main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
   assert.equal(cardAudit.violations.length,0,'axe cartão '+width+': '+cardAudit.violations.map(x=>x.id).join(';'));
  }
  assert.match(await page.locator('.agu-deck-stage').first().innerText(),/cartão 1 de 2/i);
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),0);
  const face=page.locator('#agu-deck-face');await face.focus();await face.press('Enter');
  assert.ok(await page.getByText('Verso · resposta').isVisible());
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),0,'revelar não conta como avaliação');
  await page.getByRole('button',{name:'Lembrei',exact:true}).click();
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),1);
  await page.getByRole('button',{name:'← Anterior'}).click();
  assert.match(await page.locator('.agu-deck-rated').innerText(),/já avaliou/);
  assert.equal(await page.getByRole('button',{name:'Lembrei',exact:true}).count(),0);
  await page.getByRole('button',{name:'Próximo →'}).click();
  await page.getByRole('button',{name:'Pausar e voltar'}).click();
  assert.ok(await page.getByRole('button',{name:'Retomar sessão'}).isVisible());
  const before=await page.evaluate(()=>localStorage.getItem('agu_quiz_revisao_inteligente_v1'));
  await page.reload({waitUntil:'load'});await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  await page.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  assert.equal(await page.evaluate(()=>localStorage.getItem('agu_quiz_revisao_inteligente_v1')),before,'reload intacto');
  await page.getByRole('button',{name:'Retomar sessão'}).click();
  assert.match(await page.locator('.agu-deck-stage').first().innerText(),/cartão 2 de 2/i);
  await page.getByRole('button',{name:'Para meu caderno · abrir leitor'}).click();
  assert.equal(await page.evaluate(()=>AGULegal.peek().tab),'para_caderno');
  await page.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  assert.equal(await page.evaluate(()=>AGUReview.deckSession().index),1,'retorno do leitor mantém sessão');
  await page.locator('#agu-deck-face').press('Space');
  await page.getByRole('button',{name:'Fácil',exact:true}).click();
  assert.ok(await page.getByText('Baralho concluído').isVisible());
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),2);
  const backup=await page.evaluate(()=>AGUBackup20.capture());
  // A abertura legítima do Leitor LEG-07 persiste também seu estado de navegação.
  assert.deepEqual(Object.keys(backup.items).sort(),['agu_leitor_juridico_s13_v1','agu_quiz_revisao_inteligente_v1']);
  assert.equal(backup.items['agu_quiz_revisao_inteligente_v1']!==undefined,true);
  const review=JSON.parse(backup.items['agu_quiz_revisao_inteligente_v1']);
  assert.equal(review.librarySession.status,'concluida');
  assert.equal(review.attempts.length,2);
  await page.getByRole('button',{name:'Voltar à biblioteca'}).click();
  await page.locator('#agu-deck-filter-topic').fill('algo inexistente');await page.locator('#agu-deck-filter-topic').press('Tab');
  assert.equal(await page.locator('.agu-deck-grid article').count(),0);
  assert.ok(await page.getByText('Nenhum cartão corresponde à combinação de filtros').isVisible());
  await page.locator('#agu-deck-filter-topic').fill('');await page.locator('#agu-deck-filter-topic').press('Tab');
  if(width===390||width===1280){
   await page.locator('#agu-deck-library').screenshot({path:path.join(OUT,'biblioteca-'+width+'.png')});
   // A recarga acima reinicializa a página; reinstalar o axe neste documento.
   await page.addScriptTag({content:axe.source});
   const audit=await page.evaluate(async()=>await axe.run(document.querySelector('#main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
   assert.equal(audit.violations.length,0,'axe '+width+': '+audit.violations.map(x=>x.id+': '+x.description).join('; '));
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'sem overflow final '+width);
  assert.deepEqual(errors,[]);
  results.push({width,baralhos:11,cartoes:51,semOverflow:true,avaliacoes:2,retomada:true,backup:true,axe:width===390||width===1280});
  await context.close();
 }
 console.log('UX_BARALHOS_01_BROWSER_OK',JSON.stringify({target:origin,chromium:browser.version(),results}));
}
main().catch(error=>{console.error(error.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
