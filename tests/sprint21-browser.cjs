/* Sprint 21 — Chromium real: todos os 4 itens 2015, viewport, teclado, restauração.
   Node 22 + playwright; não representa Android físico.
   Capturas sintéticas sem dados pessoais: tests/artifacts-s21/.
*/
'use strict';
const {chromium}=require('playwright');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const assert=require('node:assert/strict');
const ROOT=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 const wanted=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'');
 const dest=path.resolve(ROOT,wanted||'index.html');
 if(!dest.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('denied')}
 fs.readFile(dest,(err,b)=>{
  if(err){res.writeHead(404);return res.end('missing')}
  const type=dest.endsWith('.html')?'text/html; charset=utf-8':dest.endsWith('.js')?'application/javascript; charset=utf-8':'application/octet-stream';
  res.writeHead(200,{'content-type':type,'cache-control':'no-store'});res.end(b);
 });
});
let browser;
const cases=[{n:6,key:'E',choose:'C',rating:'Fácil',dueDays:1},{n:7,key:'C',choose:'C',rating:'Lembrei',dueDays:7},{n:9,key:'E',choose:'E',rating:'Fácil',dueDays:21},{n:48,key:'C',choose:'C',rating:'Fácil',dueDays:21}];
const isoDay=(d)=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const localDue=(days)=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+days);return isoDay(d)};
function expectThrows(f,message){
 try{f();return false}catch(e){if(message)assert.ok(e.message.includes(message),e.message);return true}
}
async function inspectWidth(page,w,phase){
 const m=await page.evaluate(()=>{
  const scroll=document.documentElement.scrollWidth,inner=innerWidth;
  const nav=[...document.querySelectorAll('.side .nav')].map(n=>{
   const b=n.getBoundingClientRect();return {name:n.textContent.trim(),w:b.width,h:b.height};
  });
  return {scroll,inner,nav,reduced:window.matchMedia('(prefers-reduced-motion: reduce)').matches};
 });
 assert.ok(m.scroll<=m.inner+2,'overflow '+phase+' '+w+' '+JSON.stringify(m));
 assert.equal(m.nav.length,4);
 if(w<=430)assert.ok(m.nav.every(n=>n.h>=44),'nav target too short '+JSON.stringify(m.nav));
 assert.equal(m.reduced,true);
 return m;
}
async function goQuestions(page){
 await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
 await page.getByRole('button',{name:'Questões Cebraspe',exact:true}).click();
}
async function run(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const url='http://127.0.0.1:'+server.address().port+'/';
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 console.log('CHROMIUM_S21_VERSION',browser.version(),'Node',process.version);
 const screenshots=path.join(ROOT,'tests','artifacts-s21');fs.mkdirSync(screenshots,{recursive:true});
 let bundle=null;
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:860},reducedMotion:'reduce'});
  const p=await ctx.newPage();const errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  p.on('response',r=>{if(r.status()===404)errors.push('404 '+r.url())});
  await p.goto(url,{waitUntil:'load'});
  await p.keyboard.press('Tab');
  const focus=await p.evaluate(()=>({tag:document.activeElement?.tagName,outline:getComputedStyle(document.activeElement).outlineStyle}));
  assert.ok(focus.tag==='BUTTON'||focus.tag==='A','keyboard focus is unreachable '+JSON.stringify(focus));
  assert.notEqual(focus.outline,'none','keyboard focus lacks outline');
  await p.getByRole('button',{name:'Estudar',exact:true}).click();
  assert.ok((await p.locator('#main').innerText()).includes('Estudar'));
  await goQuestions(p);
  await inspectWidth(p,width,'lista');
  for(const q of cases){
   // Retorna a lista de questões antes de cada teste.
   await goQuestions(p);
   await p.getByRole('button',{name:new RegExp('AGU 2015.*Q'+q.n+'\\b')}).click();
   assert.ok(!(await p.locator('#main').innerText()).includes('Gabarito definitivo da questão original: '+q.key),
     'gabarito prévio visível Q'+q.n);
   await inspectWidth(p,width,'leitor Q'+q.n);
   await p.getByRole('button',{name:q.choose==='C'?'CERTO':'ERRADO',exact:true}).click();
   await p.getByRole('button',{name:'Conferir resposta',exact:true}).click();
   assert.ok((await p.locator('#main').innerText()).includes('Gabarito definitivo da questão original: '+q.key));
   const summary=p.locator('summary').filter({hasText:'Fundamentação histórica'}).first();
   const history=summary.locator('..');
   await summary.focus();await p.keyboard.press('Enter');assert.equal(await history.evaluate(el=>el.open),true);
   await summary.focus();await p.keyboard.press('Enter');assert.equal(await history.evaluate(el=>el.open),false);
   const current=p.locator('summary').filter({hasText:'Direito atual'}).first();
   await current.click();assert.equal(await current.locator('..').evaluate(el=>el.open),true);
   await p.getByRole('button',{name:q.rating,exact:true}).click();
   const malicious='<img src=x onerror="window.__aguXss=1"> dúvida sintética Q'+q.n;
   await p.locator('#q18-note').fill(malicious);
   await p.getByRole('button',{name:'Salvar dificuldade',exact:true}).click();
   const evaluated=await p.evaluate(id=>({
    attempt:JSON.parse(localStorage.getItem('agu_quiz_revisao_inteligente_v1')).attempts.filter(x=>x.itemId===id),
    notes:JSON.parse(localStorage.getItem('agu_caderno_contextual_s15_v1')).records.filter(x=>x.content.includes(id)),
    review:window.AGUReview.reviewInfo(id)
   }),'of-2015-adv-'+String(q.n).padStart(3,'0'));
   assert.equal(evaluated.attempt.length,1,'one attempt per item');
   assert.equal(evaluated.notes.length,1,'one note per item');
   assert.equal(evaluated.notes[0].sources.length,2,'two official PDFs');
   assert.equal(evaluated.review.due,localDue(q.dueDays),'calendar D+'+q.dueDays);
   assert.equal(evaluated.attempt[0].correct,q.key===q.choose);
   assert.equal(evaluated.attempt[0].rating,q.key===q.choose?q.rating==='Fácil'?'facil':'lembrei':'errei');
  }
  const state=await p.evaluate(()=>{
   const review=JSON.parse(localStorage.getItem('agu_quiz_revisao_inteligente_v1'));
   const notebook=JSON.parse(localStorage.getItem('agu_caderno_contextual_s15_v1'));
   const display=window.AGUCaderno.panel({deviceId:'CF88:art49:V',topic:'ADM-27'});
   return {review,notebook,escaped:display.includes('&lt;img'),unsafe:display.includes('<img src=x onerror'),bundle:window.AGUBackup20.capture()};
  });
  assert.equal(state.review.attempts.length,4,'4 historical answers');
  assert.equal(new Set(state.review.attempts.map(x=>x.id)).size,4);
  assert.equal(state.notebook.records.length,4);
  assert.ok(state.escaped&&!state.unsafe,'HTML notes should be text');
  assert.ok(Object.keys(state.bundle.items).length>=4,'capture includes history, notebook, reviews');
  if(width===390)bundle=state.bundle;
  await p.reload({waitUntil:'load'});
  assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('agu_quiz_revisao_inteligente_v1')).attempts.length),4);
  await p.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  await p.getByRole('button',{name:'Questões Cebraspe',exact:true}).click();
  await p.locator('#officialselect').selectOption('AGU-2023-P1-Q007');
  assert.ok((await p.locator('#main').innerText()).includes('Questão anulada'));
  assert.equal(await p.getByRole('button',{name:'Conferir com gabarito definitivo'}).count(),0);
  await p.locator('#officialselect').selectOption('AGU-2023-P1-Q001');
  await p.getByRole('button',{name:'A',exact:true}).click();
  await p.getByRole('button',{name:'Conferir com gabarito definitivo'}).click();
  const answers=await p.evaluate(()=>JSON.parse(localStorage.getItem('agu_quiz_mvp1_2026')).answers);
  assert.equal(answers.length,1);
  assert.equal(answers[0].selected,'A');
  await p.getByRole('button',{name:'Evolução',exact:true}).click();
  await p.locator('.secondary-nav-item').filter({hasText:'Dados e backup'}).click();
  await inspectWidth(p,width,'backup');
  await p.screenshot({path:path.join(screenshots,'s21-'+width+'.png'),fullPage:true});
  assert.deepEqual(errors,[]);
  console.log('OK S21 Chromium viewport',width,'4 itens, 2023, notas, D+, reflow, teclado');
  await ctx.close();
 }
 assert.ok(bundle,'captura da sessão fonte não produzida');
 // Simulação de perfil NOVO de navegador: sem acesso ao storage do primeiro perfil.
 const clean=await browser.newContext({viewport:{width:390,height:860}});
 const dest=await clean.newPage();await dest.goto(url,{waitUntil:'load'});
 let result=await dest.evaluate(b=>window.AGUBackup20.importMissing(b),bundle);
 assert.ok(result.added>=4,'restauração de categorias ausentes');
 result=await dest.evaluate(b=>window.AGUBackup20.importMissing(b),bundle);
 assert.equal(result.added,0,'importação repetida idempotente');
 await dest.reload({waitUntil:'load'});
 const restored=await dest.evaluate(()=>({
  attempts:JSON.parse(localStorage.getItem('agu_quiz_revisao_inteligente_v1')).attempts.length,
  records:JSON.parse(localStorage.getItem('agu_caderno_contextual_s15_v1')).records.length,
  backup:window.AGUBackup20.capture()
 }));
 assert.equal(restored.attempts,4);assert.equal(restored.records,4);
 // Um backup antigo não substitui dados já existentes.
 const first=await dest.evaluate(()=>localStorage.getItem('agu_quiz_revisao_inteligente_v1'));
 const noOverwrite=await dest.evaluate(b=>window.AGUBackup20.importMissing(b),bundle);
 assert.equal(noOverwrite.added,0);
 assert.equal(await dest.evaluate(()=>localStorage.getItem('agu_quiz_revisao_inteligente_v1')),first);
 for(const b of [
  '{invalid',
  JSON.stringify({...bundle,schema:'schema-desconhecido'}),
  JSON.stringify({...bundle,items:{'unsafe_key':'{}'}}),
  JSON.stringify({...bundle,items:{agu_quiz_mvp1_2026:'{}'}})
 ]){
  const rejected=await dest.evaluate(raw=>{try{window.AGUBackup20.validateBundle(raw);return false}catch(_){return true}},b);
  assert.equal(rejected,true,'backup malformado deve ser rejeitado');
 }
 const zero=await browser.newContext();const quota=await zero.newPage();await quota.goto(url,{waitUntil:'load'});
 const rollback=await quota.evaluate(b=>{
  const setter=Storage.prototype.setItem;let n=0,out='não_falhou';
  Storage.prototype.setItem=function(k,v){if(++n===2)throw new DOMException('Quota de teste','QuotaExceededError');return setter.call(this,k,v)};
  try{window.AGUBackup20.importMissing(b)}catch(e){out=e.message}finally{Storage.prototype.setItem=setter}
  const persisted=Object.keys(b.items).filter(k=>localStorage.getItem(k)!==null);
  return {out,persisted};
 },bundle);
 assert.ok(rollback.out.includes('revertida'),'rollback de erro de quota '+JSON.stringify(rollback));
 assert.equal(rollback.persisted.length,0,'não deixar restauração parcial');
 console.log('OK S21 restauração em perfil novo, idempotência, rejeições, rollback por quota.');
 await clean.close();await zero.close();
 console.log('RESULTADO S21: 5 viewports + 4 questões cada + restauração Chromium real concluídos.');
}
run().catch(e=>{console.error('FALHA S21:',e.stack||e);process.exitCode=1}).finally(async()=>{
 if(browser)await browser.close();
 if(server.listening)await new Promise(ok=>server.close(ok));
});
