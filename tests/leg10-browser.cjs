/* LEG10 — questão oficial elegível → marcação seletiva → lista única → revisão vencida → backup. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests/artifacts-leg10'),READER='agu_leitor_juridico_s13_v1',REVIEW='agu_quiz_revisao_inteligente_v1';
const server=http.createServer((req,res)=>{const f=path.resolve(ROOT,decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html');if(!f.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end()}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'content-type':f.endsWith('.html')?'text/html;charset=utf-8':'application/javascript;charset=utf-8','cache-control':'no-store'});res.end(e?'missing':b)})});
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(process.env.AGU_CHROMIUM_BIN?{executablePath:process.env.AGU_CHROMIUM_BIN}:{})});fs.mkdirSync(OUT,{recursive:true});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/',results=[];
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:900},hasTouch:width<=430,reducedMotion:'reduce',acceptDownloads:true});
  await ctx.addInitScript(()=>{
   const reader='agu_leitor_juridico_s13_v1',review='agu_quiz_revisao_inteligente_v1';
   if(!localStorage.getItem(reader))localStorage.setItem(reader,JSON.stringify({article:'L9784:art50',unit:'L9784:art50:p1',tab:'questoes',mobile:'text',notes:{'L9784:art50:I':'Nota antiga sobre motivação','L4717:art2:pu:e':'Nota anterior, Ação Popular'},forNotebook:[{id:'pc-leg10-reader0001',lawId:'L4717',articleId:'L4717:art2',unitId:'L4717:art2:pu:e',topic:null,origin:'leitor',prompt:'Distinguir motivo e finalidade.',createdAt:'2026-11-14T20:00:00.000Z',status:'pendente'}]}));
   if(!localStorage.getItem(review))localStorage.setItem(review,JSON.stringify({schema:'agu-review-v1',attempts:[],cards:{'of-2015-adv-006':{stage:1,due:'2000-01-01',seen:1,errors:1}},created:'2026-11-14T20:00:00.000Z'}));
  });
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());
  await p.goto(origin+'?abrir=lei&norma=L9784&dispositivo=L9784:art50:p1');
  // A marcação preexistente de estudo permanece na mesma categoria: sessão válida, tema confirmado.
  const setup=await p.evaluate(()=>{const session=AGUStudy.start('L9784:art12:caput');const ok=AGULegal.notebookSaveStudy('Quando a avocação é excepcional?');return {ok,session,reader:AGULegal.peek()}});
  assert.equal(setup.ok,true);assert.equal(setup.reader.forNotebook.length,2);
  if(width<=850)await p.getByRole('button',{name:'Relacionados',exact:true}).click();
  await p.locator('#agu-reader .agu-tabs button').filter({hasText:'Questões'}).press('Enter');
  await p.getByRole('button',{name:'Responder no Leitor'}).press('Enter');
  assert.equal(await p.evaluate(()=>AGUQuestions18.selected()),'of-2015-adv-006');
  const initial=await p.evaluate(()=>({review:localStorage.getItem('agu_quiz_revisao_inteligente_v1'),plan:localStorage.getItem('agu_quiz_planejamento_semanal_v1'),study:localStorage.getItem('agu_estudo_integrado_s16_v1'),notes:AGULegal.peek().notes}));
  const details=p.locator('.agu-question-notebook'),summary=details.locator('summary');
  if(width<=430)await summary.tap();else await summary.press('Enter');
  assert.ok(await p.locator('#q18-notebook').isVisible());
  await p.locator('#q18-notebook').fill('Em que condições a motivação pode ser por referência?');
  await p.locator('#q18-notebook-save').press('Space');
  assert.equal(await p.evaluate(()=>document.activeElement?.id),'q18-notebook-status');
  assert.match(await p.locator('#q18-notebook-status').innerText(),/Pendente registrada/);
  const item=await p.evaluate(()=>AGULegal.peek().forNotebook[2]);
  assert.equal(item.origin,'questao_verificada');assert.equal(item.questionId,'of-2015-adv-006');assert.equal(item.questionLabel,'AGU 2015 · Q6 · 187AGU_001_07');assert.equal(item.topic,'ADM-17');assert.deepEqual([item.lawId,item.articleId,item.unitId],[null,null,null]);assert.equal(item.status,'pendente');
  const unchanged=await p.evaluate(()=>({review:localStorage.getItem('agu_quiz_revisao_inteligente_v1'),plan:localStorage.getItem('agu_quiz_planejamento_semanal_v1'),study:localStorage.getItem('agu_estudo_integrado_s16_v1'),notes:AGULegal.peek().notes}));assert.deepEqual(unchanged,initial);
  const a11y={};
  if(width===390||width===1280){
   await p.addScriptTag({content:axe.source});const run=async()=>p.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),passed:r.passes.map(v=>v.id)}});
   a11y.initial=await run();assert.deepEqual(a11y.initial.violations,[]);a11y.afterScroll=[];
   for(const v of a11y.initial.incomplete)for(const targets of v.nodes){const selector=targets[0],loc=p.locator(selector);if(typeof selector!=='string'||!await loc.count())continue;await loc.first().scrollIntoViewIfNeeded();a11y.afterScroll.push(await p.evaluate(async({selector,id})=>{const r=await axe.run(document.querySelector(selector),{runOnly:{type:'rule',values:[id]}});return {selector,rule:id,violations:r.violations.length,incomplete:r.incomplete.length,passed:r.passes.map(x=>x.id)}},{selector,id:v.id}));}
   fs.writeFileSync(path.join(OUT,'axe-'+width+'.json'),JSON.stringify(a11y,null,2));
  }
  await p.screenshot({path:path.join(OUT,'questao-para-caderno-'+width+'.png')});
  await p.locator('#agu-reader .agu-tabs button').filter({hasText:'Para meu caderno'}).press('Enter');
  await p.locator('#agu-caderno-filter-status').selectOption('todos');
  const listed=p.locator('.agu-paper-item').filter({hasText:'Em que condições a motivação'});
  assert.equal(await listed.count(),1);assert.match(await listed.innerText(),/Questão oficial verificada/);assert.equal(await p.locator('.agu-paper-item').count(),3);
  await listed.getByRole('button',{name:'Marcar como anotado'}).press('Enter');
  assert.equal(await p.evaluate(id=>AGULegal.peek().forNotebook.find(x=>x.id===id).status,item.id),'anotado');
  await listed.getByRole('button',{name:'Dispensar'}).click();await listed.getByRole('button',{name:'Manter pendente'}).press('Space');
  await listed.getByRole('button',{name:'Editar'}).press('Enter');await p.locator('#agu-caderno-brief').fill('Qual o limite da motivação por referência?');await p.locator('#agu-caderno-save').press('Enter');
  assert.equal(await p.evaluate(id=>AGULegal.peek().forNotebook.find(x=>x.id===id).id,item.id),item.id);
  await p.locator('.agu-paper-item').filter({hasText:'Qual o limite da motivação'}).getByRole('button',{name:'Abrir questão de origem'}).press('Enter');
  assert.equal(await p.evaluate(()=>AGULegal.peek().tab),'questoes');assert.equal(await p.evaluate(()=>AGUQuestions18.selected()),'of-2015-adv-006');
  assert.equal(await p.evaluate(()=>localStorage.getItem('agu_quiz_revisao_inteligente_v1')),initial.review);
  await p.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  await p.evaluate(()=>AGUReview.select('of-2015-adv-006'));await p.evaluate(()=>render());
  assert.equal(await p.locator('.agu-review-notebook-item').count(),1);assert.match(await p.locator('.agu-review-notebook').innerText(),/Abrir questão de origem/);
  assert.doesNotMatch(await p.locator('.agu-review-notebook').innerText(),/Distinguir motivo e finalidade/);
  await p.locator('.agu-review-notebook-item').getByRole('button',{name:'Abrir questão de origem'}).press('Enter');
  assert.ok(await p.getByRole('button',{name:/Voltar à revisão programada/}).isVisible());
  await p.getByRole('button',{name:/Voltar à revisão programada/}).press('Enter');
  assert.equal(await p.evaluate(()=>document.activeElement?.id),'agu-review-notebook-origin-'+item.id);
  await p.getByRole('button',{name:'Mostrar resposta',exact:true}).press('Enter');await p.getByRole('button',{name:'Lembrei',exact:true}).press('Enter');
  assert.equal(await p.evaluate(id=>AGULegal.peek().forNotebook.find(x=>x.id===id).status,item.id),'pendente');
  await p.reload();const after=await p.evaluate(()=>({reader:AGULegal.peek(),study:AGUStudy.peek()}));assert.equal(after.reader.forNotebook.length,3);assert.deepEqual(after.reader.forNotebook.map(x=>x.origin),['leitor','estudo_integrado','questao_verificada']);
  await p.getByRole('button',{name:'Evolução',exact:true}).click();await p.getByRole('button',{name:'Dados e backup',exact:true}).click();
  const download=p.waitForEvent('download');await p.getByRole('button',{name:'Exportar cópia completa'}).click();const file=await download,bytes=fs.readFileSync(await file.path()),bundle=JSON.parse(bytes.toString());assert.ok(Object.keys(bundle.items).length<=9);assert.ok(Object.hasOwn(bundle.items,READER));
  const targetCtx=await browser.newContext({viewport:{width,height:900},hasTouch:width<=430}),target=await targetCtx.newPage();target.on('dialog',d=>d.accept());await target.goto(origin);await target.getByRole('button',{name:'Evolução',exact:true}).click();await target.getByRole('button',{name:'Dados e backup',exact:true}).click();await target.locator('#agu-s20-backup-file').setInputFiles({name:'leg10-sintetico.json',mimeType:'application/json',buffer:bytes});await target.waitForFunction(()=>!!localStorage.getItem('agu_leitor_juridico_s13_v1'));await target.reload();
  assert.deepEqual(await target.evaluate(()=>AGULegal.peek().forNotebook),after.reader.forNotebook);assert.deepEqual(await target.evaluate(()=>AGUStudy.peek().sessions),after.study.sessions);assert.equal(await target.evaluate(()=>AGUBackup20.importMissing(AGUBackup20.capture()).added),0);await targetCtx.close();
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'overflow '+width);assert.deepEqual(errors,[]);
  results.push({width,questionId:item.questionId,topic:item.topic,marks:3,manualStates:true,noScheduling:true,originRestored:true,backupRestored:true,a11y});await ctx.close();
 }
 fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({target:origin,browser:browser.version(),axe:axe.version,results},null,2));console.log('LEG10_BROWSER_OK',JSON.stringify({target:origin,browser:browser.version(),viewports:results.map(x=>x.width)}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
