/* LEG09 — jornada real de Estudo Integrado até o mesmo forNotebook, perfis sintéticos. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests/artifacts-leg09'),READER='agu_leitor_juridico_s13_v1',STUDY='agu_estudo_integrado_s16_v1',REVIEW='agu_quiz_revisao_inteligente_v1';
const server=http.createServer((req,res)=>{const f=path.resolve(ROOT,decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html');if(!f.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end()}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'content-type':f.endsWith('.html')?'text/html;charset=utf-8':'application/javascript;charset=utf-8','cache-control':'no-store'});res.end(e?'missing':b)})});
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(process.env.AGU_CHROMIUM_BIN?{executablePath:process.env.AGU_CHROMIUM_BIN}:{})});fs.mkdirSync(OUT,{recursive:true});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/',results=[];
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:900},hasTouch:width<=430,reducedMotion:'reduce',acceptDownloads:true});
  await ctx.addInitScript(()=>{
   const reader='agu_leitor_juridico_s13_v1',review='agu_quiz_revisao_inteligente_v1';
   if(!localStorage.getItem(reader))localStorage.setItem(reader,JSON.stringify({article:'DL4657:art30',unit:'DL4657:art30:pu',tab:'comentarios',mobile:'text',notes:{'L9784:art50:I':'Comentário sintético prévio','DL4657:art30:pu':'LINDB anterior'},forNotebook:[{id:'pc-leg09-reader0001',lawId:'L4717',articleId:'L4717:art2',unitId:'L4717:art2:pu:e',topic:null,origin:'leitor',prompt:'Distinguir motivo e finalidade.',createdAt:'2026-11-14T20:00:00.000Z',status:'pendente'}]}));
   if(!localStorage.getItem(review))localStorage.setItem(review,JSON.stringify({schema:'agu-review-v1',attempts:[],cards:{'ri-adm-01':{stage:1,due:'2000-01-01',seen:1,errors:10}},created:'2026-11-14T20:00:00.000Z'}));
  });
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());
  await p.goto(origin+'?abrir=lei&norma=L9784');
  if(width<=850)await p.getByRole('button',{name:'Índice',exact:true}).click();
  await p.locator('.agu-index-entry[onclick="AGULegal.article(\'L9784:art12\',true)"]').press('Enter');
  await p.locator('.agu-unit[onclick="AGULegal.unit(\'L9784:art12:caput\')"]').press('Space');
  await p.getByRole('button',{name:'Estudo integrado',exact:true}).press('Enter');
  assert.match(await p.locator('.agu-related').innerText(),/Iniciar \/ retomar estudo deste dispositivo/);
  await p.getByRole('button',{name:'Iniciar / retomar estudo deste dispositivo'}).press('Enter');
  const before=await p.evaluate(()=>({session:AGUStudy.active(),review:localStorage.getItem('agu_quiz_revisao_inteligente_v1'),plan:localStorage.getItem('agu_quiz_planejamento_semanal_v1')}));
  assert.equal(before.session.topic,'ADM-06');assert.equal(before.session.deviceId,'L9784:art12:caput');assert.equal(before.session.stage,'norma');
  const disclosure=p.locator('.agu-study-notebook summary');if(width<=430)await disclosure.tap();else await disclosure.press('Enter');
  assert.ok(await p.locator('#agu-study-notebook-input').isVisible());
  await p.locator('#agu-study-notebook-input').fill('Como diferenciar delegação, avocação e competência exclusiva?');
  await p.locator('#agu-study-notebook-save').press('Enter');
  assert.equal(await p.evaluate(()=>document.activeElement?.id),'agu-study-notebook-status');
  assert.match(await p.locator('#agu-study-notebook-status').innerText(),/Marcação guardada/);
  const item=await p.evaluate(()=>AGULegal.peek().forNotebook[1]);
  assert.equal(item.origin,'estudo_integrado');assert.equal(item.topic,'ADM-06');assert.equal(item.sessionId,before.session.id);assert.equal(item.deviceId,before.session.deviceId);assert.equal(item.lawId,null);assert.equal(item.articleId,null);assert.equal(item.unitId,null);
  assert.equal(await p.evaluate(()=>AGUStudy.active().stage),'norma');assert.equal(await p.evaluate(()=>localStorage.getItem('agu_quiz_revisao_inteligente_v1')),before.review);assert.equal(await p.evaluate(()=>localStorage.getItem('agu_quiz_planejamento_semanal_v1')),before.plan);
  const a11y={};
  if(width===390||width===1280){
   await p.addScriptTag({content:axe.source});const run=async()=>p.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),passed:r.passes.map(v=>v.id)}});
   a11y.initial=await run();assert.deepEqual(a11y.initial.violations,[]);a11y.afterScroll=[];
   for(const v of a11y.initial.incomplete)for(const targets of v.nodes){const selector=targets[0],loc=p.locator(selector);if(typeof selector!=='string'||!await loc.count())continue;await loc.first().scrollIntoViewIfNeeded();a11y.afterScroll.push(await p.evaluate(async({selector,id})=>{const r=await axe.run(document.querySelector(selector),{runOnly:{type:'rule',values:[id]}});return {selector,rule:id,violations:r.violations.length,incomplete:r.incomplete.length,passed:r.passes.map(x=>x.id)}},{selector,id:v.id}));}
   fs.writeFileSync(path.join(OUT,'axe-'+width+'.json'),JSON.stringify(a11y,null,2));await p.screenshot({path:path.join(OUT,'estudo-para-caderno-'+width+'.png')});
  }
  // A marcação aparece na lista histórica do leitor; nenhuma segunda lista é criada.
  await p.locator('.agu-related .agu-tabs button').filter({hasText:'Para meu caderno'}).press('Enter');
  await p.locator('#agu-caderno-filter-status').selectOption('todos');
  const listed=p.locator('.agu-paper-item').filter({hasText:'Como diferenciar delegação'});
  assert.equal(await listed.count(),1);assert.match(await listed.innerText(),/Estudo integrado/);
  await listed.getByRole('button',{name:'Marcar como anotado'}).press('Enter');
  assert.equal(await p.evaluate(id=>AGULegal.peek().forNotebook.find(x=>x.id===id).status,item.id),'anotado');
  await listed.getByRole('button',{name:'Dispensar'}).click();
  await listed.getByRole('button',{name:'Manter pendente'}).press('Space');
  assert.equal(await p.evaluate(id=>AGULegal.peek().forNotebook.find(x=>x.id===id).status,item.id),'pendente');
  await listed.getByRole('button',{name:'Editar'}).press('Enter');await p.locator('#agu-caderno-brief').fill('Quando cabe avocação temporária?');await p.locator('#agu-caderno-save').press('Enter');
  assert.equal(await p.evaluate(id=>AGULegal.peek().forNotebook.find(x=>x.id===id).id,item.id),item.id);
  await p.locator('.agu-paper-item').filter({hasText:'Quando cabe avocação temporária?'}).getByRole('button',{name:'Retomar sessão de origem'}).press('Enter');
  assert.equal(await p.evaluate(()=>AGULegal.peek().tab),'estudo');assert.equal(await p.evaluate(()=>AGUStudy.active().id),before.session.id);
  // A revisão programada exibe apenas o tema exato, com origem de sessão.
  await p.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();await p.getByRole('button',{name:'Iniciar seleção automática',exact:true}).press('Enter');
  assert.equal(await p.locator('.agu-review-notebook-item').count(),1);assert.doesNotMatch(await p.locator('.agu-review-notebook').innerText(),/Distinguir motivo e finalidade/);
  await p.locator('.agu-review-notebook-item').getByRole('button',{name:'Retomar sessão de estudo'}).press('Enter');
  assert.equal(await p.evaluate(()=>AGUStudy.active().id),before.session.id);assert.ok(await p.getByRole('button',{name:/Voltar à revisão programada/}).isVisible());
  await p.getByRole('button',{name:/Voltar à revisão programada/}).press('Enter');
  assert.equal(await p.evaluate(()=>document.activeElement?.id),'agu-review-notebook-origin-'+item.id);
  await p.getByRole('button',{name:'Mostrar resposta',exact:true}).press('Enter');await p.getByRole('button',{name:'Lembrei',exact:true}).press('Enter');
  assert.equal(await p.evaluate(id=>AGULegal.peek().forNotebook.find(x=>x.id===id).status,item.id),'pendente');
  await p.reload();const after=await p.evaluate(()=>({reader:AGULegal.peek(),study:AGUStudy.peek()}));assert.equal(after.reader.forNotebook.length,2);assert.equal(after.reader.forNotebook[1].id,item.id);assert.equal(after.reader.notes['DL4657:art30:pu'],'LINDB anterior');
  await p.getByRole('button',{name:'Evolução',exact:true}).click();await p.getByRole('button',{name:'Dados e backup',exact:true}).click();
  const download=p.waitForEvent('download');await p.getByRole('button',{name:'Exportar cópia completa'}).click();const file=await download,bytes=fs.readFileSync(await file.path()),bundle=JSON.parse(bytes.toString());assert.ok(Object.keys(bundle.items).length<=9);assert.ok(Object.hasOwn(bundle.items,READER));assert.ok(Object.hasOwn(bundle.items,STUDY));
  const targetCtx=await browser.newContext({viewport:{width,height:900},hasTouch:width<=430}),target=await targetCtx.newPage();target.on('dialog',d=>d.accept());await target.goto(origin);await target.getByRole('button',{name:'Evolução',exact:true}).click();await target.getByRole('button',{name:'Dados e backup',exact:true}).click();await target.locator('#agu-s20-backup-file').setInputFiles({name:'leg09-sintetico.json',mimeType:'application/json',buffer:bytes});await target.waitForFunction(()=>!!localStorage.getItem('agu_leitor_juridico_s13_v1'));await target.reload();
  assert.deepEqual(await target.evaluate(()=>AGULegal.peek().forNotebook),after.reader.forNotebook);assert.deepEqual(await target.evaluate(()=>AGUStudy.peek().sessions),after.study.sessions);assert.equal(await target.evaluate(()=>AGUBackup20.importMissing(AGUBackup20.capture()).added),0);await targetCtx.close();
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'overflow '+width);assert.deepEqual(errors,[]);
  results.push({width,topic:item.topic,sessionId:item.sessionId,marks:2,focus:true,manualStates:true,reviewIndependent:true,backupRestored:true,a11y});await ctx.close();
 }
 fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({target:origin,browser:browser.version(),axe:axe.version,results},null,2));console.log('LEG09_BROWSER_OK',JSON.stringify({target:origin,browser:browser.version(),viewports:results.map(x=>x.width)}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
