/* LEG12 — jornada sintética na Home, única lista forNotebook, retorno e backup. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-leg12');
const READER='agu_leitor_juridico_s13_v1',REVIEW='agu_quiz_revisao_inteligente_v1';
const server=http.createServer((req,res)=>{
 const request=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html',file=path.resolve(ROOT,request);
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
  const ctx=await browser.newContext({viewport:{width,height:900},hasTouch:width<=430,reducedMotion:'reduce',acceptDownloads:true}),p=await ctx.newPage(),errors=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());
  await p.addInitScript(()=>{
   const KEY='agu_leitor_juridico_s13_v1';
   if(localStorage.getItem(KEY))return;
   localStorage.setItem(KEY,JSON.stringify({article:'L4717:art2',unit:'L4717:art2:pu:e',tab:'juris',mobile:'text',notes:{'L4717:art2:pu:e':'Nota sintética prévia'},forNotebook:[
    {id:'pc-leg12-reader0001',lawId:'L4717',articleId:'L4717:art2',unitId:'L4717:art2:pu:e',topic:null,origin:'leitor',prompt:'Motivo versus finalidade?',createdAt:'2026-11-14T20:00:00.000Z',status:'pendente'},
    {id:'pc-leg12-study00001',lawId:null,articleId:null,unitId:null,deviceId:'L9784:art12:caput',sessionId:'ags-leg12-001',topic:'ADM-06',origin:'estudo_integrado',prompt:'Delegação e avocação?',createdAt:'2026-11-14T20:00:00.000Z',status:'anotado'},
    {id:'pc-leg12-question01',lawId:null,articleId:null,unitId:null,questionId:'of-2015-adv-006',questionLabel:'AGU 2015 · Q6 · 187AGU_001_07',topic:'ADM-17',origin:'questao_verificada',prompt:'Motivação por remissão?',createdAt:'2026-11-14T20:00:00.000Z',status:'dispensado'},
    {id:'pc-leg12-card00001',lawId:null,articleId:null,unitId:null,cardId:'ri-adm-01',cardLabel:'Flashcard ri-adm-01 · ADM-06',topic:'ADM-06',origin:'flashcard_existente',prompt:'Quando avocar?',createdAt:'2026-11-14T20:00:00.000Z',status:'pendente'}
   ]}));
  });
  await p.goto(origin,{waitUntil:'load'});
  assert.match(await p.locator('#agu-home-notebook-count').innerText(),/2 marcações pendentes/);
  const original=await p.evaluate(()=>({reader:AGULegal.peek(),review:localStorage.getItem('agu_quiz_revisao_inteligente_v1'),plan:localStorage.getItem('agu_quiz_planejamento_semanal_v1'),study:localStorage.getItem('agu_estudo_integrado_s16_v1')}));
  // Estudo e revisão podem estar ativos; consultar a Home não os conclui nem altera.
  await p.evaluate(()=>{AGUStudy.start('L9784:art12:caput');AGUReview.deckStart('ADM-06');setView('dashboard')});
  const sessions=await p.evaluate(()=>({study:AGUStudy.peek(),deck:AGUReview.deckSession(),review:localStorage.getItem('agu_quiz_revisao_inteligente_v1')}));
  const home=p.locator('#agu-home-notebook-open');
  if(width===390)await home.tap();else await home.press(width===360||width===1280?'Space':'Enter');
  assert.ok(await p.locator('#agu-caderno-list').isVisible());
  assert.equal(await p.evaluate(()=>document.activeElement?.id),'agu-caderno-list');
  assert.equal(await p.locator('#agu-caderno-list').count(),1);
  await p.locator('#agu-caderno-filter-status').selectOption('todos');
  assert.equal(await p.locator('.agu-paper-item').count(),4);
  const recorded=await p.evaluate(()=>AGULegal.peek().forNotebook);
  assert.deepEqual(recorded,original.reader.forNotebook);assert.equal(recorded.filter(x=>x.topic===null).length,1);
  const readerItem=p.locator('.agu-paper-item').filter({hasText:'Motivo versus finalidade?'});
  await readerItem.getByRole('button',{name:'Marcar como anotado'}).press('Enter');
  assert.equal(await p.evaluate(()=>AGULegal.peek().forNotebook[0].status),'anotado');
  // A navegação de retorno possui alvo real e refaz o contador somente em leitura.
  await p.locator('#agu-home-notebook-return').press('Enter');
  assert.equal(await p.evaluate(()=>document.activeElement?.id),'agu-home-notebook-open');
  assert.match(await p.locator('#agu-home-notebook-count').innerText(),/1 marcação pendente/);
  assert.equal(await p.evaluate(()=>AGUStudy.peek().activeId),sessions.study.activeId);
  assert.equal(await p.evaluate(()=>AGUReview.deckSession().index),sessions.deck.index);
  assert.equal(await p.evaluate(()=>localStorage.getItem('agu_quiz_revisao_inteligente_v1')),sessions.review);
  assert.equal(await p.evaluate(()=>localStorage.getItem('agu_quiz_planejamento_semanal_v1')),original.plan);
  await p.locator('#agu-home-notebook-open').press('Space');
  await p.locator('#agu-caderno-filter-status').selectOption('todos');
  await p.locator('.agu-paper-item').filter({hasText:'Motivo versus finalidade?'}).getByRole('button',{name:'Dispensar'}).click();
  await p.locator('.agu-paper-item').filter({hasText:'Motivo versus finalidade?'}).getByRole('button',{name:'Manter pendente'}).click();
  assert.equal(await p.evaluate(()=>AGULegal.peek().forNotebook[0].status),'pendente');
  await p.locator('#agu-home-notebook-return').click();
  assert.match(await p.locator('#agu-home-notebook-count').innerText(),/2 marcações pendentes/);
  const a11y={};
  if(width===390||width===1280){
   await p.addScriptTag({content:axe.source});
   async function audit(label){
    const report=await p.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),passed:r.passes.map(v=>v.id)}});
    assert.deepEqual(report.violations,[],'violação real de acessibilidade '+label+' '+width);return report;
   }
   a11y.home=await audit('home');
   await p.locator('#agu-home-notebook-open').click();a11y.list=await audit('list');a11y.afterScroll=[];
   for(const v of a11y.list.incomplete)for(const targets of v.nodes){
    const selector=targets[0];if(typeof selector!=='string'||!await p.locator(selector).count())continue;
    await p.locator(selector).first().scrollIntoViewIfNeeded();
    const result=await p.evaluate(async({selector,id})=>{const r=await axe.run(document.querySelector(selector),{runOnly:{type:'rule',values:[id]}});return {selector,rule:id,violations:r.violations.length,incomplete:r.incomplete.length,passed:r.passes.map(x=>x.id)}},{selector,id:v.id});
    a11y.afterScroll.push({...result,resolution:result.incomplete?'permanece_inconclusivo':'reavaliado_sem_inconclusivo'});
    assert.equal(result.violations,0,'violação após rolagem '+selector);
   }
   a11y.unresolvedAfterScroll=a11y.afterScroll.filter(x=>x.incomplete>0);
   fs.writeFileSync(path.join(OUT,'axe-'+width+'.json'),JSON.stringify(a11y,null,2));
   await p.locator('#agu-home-notebook-return').click();
  }
  await p.screenshot({path:path.join(OUT,'home-caderno-'+width+'.png')});
  await p.reload();assert.match(await p.locator('#agu-home-notebook-count').innerText(),/2 marcações pendentes/);
  assert.equal(await p.evaluate(()=>AGULegal.peek().forNotebook.length),4);
  assert.equal(await p.evaluate(()=>AGULegal.peek().notes['L4717:art2:pu:e']),'Nota sintética prévia');
  // O backup S20 deve importar só categoria ausente, sem substituir uma já existente.
  await p.getByRole('button',{name:'Evolução',exact:true}).click();await p.getByRole('button',{name:'Dados e backup',exact:true}).click();
  const pending=p.waitForEvent('download');await p.getByRole('button',{name:'Exportar cópia completa'}).click();
  const exported=fs.readFileSync(await (await pending).path());
  const fresh=await browser.newContext({viewport:{width,height:900},hasTouch:width<=430}),t=await fresh.newPage();t.on('dialog',d=>d.accept());
  await t.goto(origin,{waitUntil:'load'});await t.getByRole('button',{name:'Evolução',exact:true}).click();await t.getByRole('button',{name:'Dados e backup',exact:true}).click();
  await t.locator('#agu-s20-backup-file').setInputFiles({name:'leg12-sintetico.json',mimeType:'application/json',buffer:exported});
  await t.waitForFunction(()=>!!localStorage.getItem('agu_leitor_juridico_s13_v1'));await t.reload();
  assert.deepEqual(await t.evaluate(()=>AGULegal.peek().forNotebook),await p.evaluate(()=>AGULegal.peek().forNotebook));
  assert.equal(await t.evaluate(()=>AGUBackup20.importMissing(AGUBackup20.capture()).added),0);
  await fresh.close();
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'overflow em '+width);
  assert.deepEqual(errors,[]);results.push({width,marks:4,pending:2,manualState:true,focusRestored:true,backupRestored:true,noScheduleChange:true,a11y});await ctx.close();
 }
 fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({target:origin,browser:browser.version(),axe:axe.version,results},null,2));
 console.log('LEG12_AXE',JSON.stringify(results.filter(x=>x.a11y.list).map(x=>({width:x.width,homeViolations:x.a11y.home.violations.length,listViolations:x.a11y.list.violations.length,homeIncomplete:x.a11y.home.incomplete.reduce((n,v)=>n+v.nodes.length,0),listIncomplete:x.a11y.list.incomplete.reduce((n,v)=>n+v.nodes.length,0),passed:x.a11y.list.passed.length,unresolved:x.a11y.unresolvedAfterScroll.length}))));
 console.log('LEG12_BROWSER_OK',JSON.stringify({target:origin,browser:browser.version(),viewports:results.map(x=>x.width)}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
