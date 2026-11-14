/* LEG07 — jornada real de marcação para caderno físico em perfis exclusivamente sintéticos. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests/artifacts-leg07'),KEY='agu_leitor_juridico_s13_v1';
const server=http.createServer((req,res)=>{const f=path.resolve(ROOT,decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html');if(!f.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end()}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'content-type':f.endsWith('.html')?'text/html;charset=utf-8':'application/javascript;charset=utf-8','cache-control':'no-store'});res.end(e?'missing':b)})});
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(process.env.AGU_CHROMIUM_BIN?{executablePath:process.env.AGU_CHROMIUM_BIN}:{})});fs.mkdirSync(OUT,{recursive:true});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/',results=[];
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',acceptDownloads:true});
  await ctx.addInitScript(()=>{const key='agu_leitor_juridico_s13_v1';if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify({article:'DL4657:art30',unit:'DL4657:art30:pu',tab:'comentarios',mobile:'text',notes:{'CF88:art131:p3':'Nota CF sintética','L9784:art50:I':'Nota Lei 9784 sintética','LC101:art75:caput':'Nota LRF sintética','LC73:art73:caput':'Nota LC73 sintética','DL4657:art30:pu':'Nota LINDB sintética'}}))});
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());
  await p.goto(origin);await p.getByRole('button',{name:'Continuar estudando',exact:true}).press('Enter');const session=await p.evaluate(()=>AGUStudy.active().id);
  await p.goto(origin+'?abrir=lei&norma=L4717');
  if(width<=850)await p.getByRole('button',{name:'Índice',exact:true}).click();
  await p.locator('.agu-index-entry[onclick="AGULegal.article(\'L4717:art2\',true)"]').press('Enter');
  await p.locator('.agu-unit[onclick="AGULegal.unit(\'L4717:art2:pu:e\')"]').press('Space');
  assert.equal(await p.evaluate(()=>document.activeElement===document.querySelector('.agu-unit.selected')),true);
  assert.equal(await p.evaluate(()=>AGULegal.peek().unit),'L4717:art2:pu:e');
  await p.locator('.agu-paper-context button').press('Enter');assert.equal(await p.evaluate(()=>AGULegal.peek().tab),'para_caderno');
  await p.locator('#agu-caderno-brief').fill('Distinguir motivo, motivação e finalidade do ato administrativo.');
  await p.locator('#agu-caderno-save').press('Enter');
  const first=await p.evaluate(()=>AGULegal.peek().forNotebook[0]);assert.equal(first.unitId,'L4717:art2:pu:e');assert.equal(first.topic,null);assert.equal(first.status,'pendente');assert.match(first.id,/^pc-/);
  assert.match(await p.locator('#agu-caderno-list').innerText(),/1\/300/);
  await p.locator('#agu-caderno-filter-topic').selectOption('sem_tema');assert.match(await p.locator('.agu-paper-item').innerText(),/Distinguir motivo/);
  await p.getByRole('button',{name:'Editar',exact:true}).click();await p.locator('#agu-caderno-brief').fill('Distinguir motivo, motivação e finalidade. Quando há desvio?');await p.locator('#agu-caderno-save').click();
  const edited=await p.evaluate(()=>AGULegal.peek().forNotebook[0]);assert.equal(edited.id,first.id);assert.match(edited.prompt,/desvio/);
  await p.getByRole('button',{name:'Início',exact:true}).click();await p.reload();await p.goto(origin+'?abrir=lei&norma=L4717');
  if(width<=850)await p.getByRole('button',{name:'Relacionados',exact:true}).click();
  await p.getByRole('button',{name:'Para meu caderno',exact:true}).last().click();
  assert.match(await p.locator('.agu-paper-item').innerText(),/Quando há desvio/);
  await p.getByRole('button',{name:'Abrir origem',exact:true}).click();assert.equal(await p.evaluate(()=>AGULegal.peek().unit),'L4717:art2:pu:e');assert.match(p.url(),/dispositivo=L4717%3Aart2%3Apu%3Ae/);
  await p.reload();assert.equal(await p.evaluate(()=>AGULegal.peek().unit),'L4717:art2:pu:e');
  if(width<=850)await p.getByRole('button',{name:'Relacionados',exact:true}).click();
  await p.getByRole('button',{name:'Marcar como anotado',exact:true}).click();assert.equal(await p.evaluate(()=>AGULegal.peek().forNotebook[0].status),'anotado');
  await p.locator('#agu-caderno-filter-status').selectOption('anotado');assert.match(await p.locator('.agu-paper-item').innerText(),/Quando há desvio/);
  const a11y={};
  if(width===390||width===1280){
   await p.addScriptTag({content:axe.source});a11y.initial=await p.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),passed:r.passes.map(v=>v.id)}});
   assert.deepEqual(a11y.initial.violations,[]);a11y.afterScroll=[];
   for(const v of a11y.initial.incomplete)for(const targets of v.nodes){const selector=targets[0],el=p.locator(selector);if(typeof selector!=='string'||!await el.count())continue;await el.first().scrollIntoViewIfNeeded();a11y.afterScroll.push(await p.evaluate(async({selector,id})=>{const r=await axe.run(document.querySelector(selector),{runOnly:{type:'rule',values:[id]}});return {selector,rule:id,violations:r.violations.length,incomplete:r.incomplete.length,passed:r.passes.map(x=>x.id)}},{selector,id:v.id}))}
   fs.writeFileSync(path.join(OUT,'axe-'+width+'.json'),JSON.stringify(a11y,null,2));await p.screenshot({path:path.join(OUT,'para-caderno-'+width+'.png')});
  }
  await p.getByRole('button',{name:'Evolução',exact:true}).click();await p.getByRole('button',{name:'Dados e backup',exact:true}).click();
  assert.equal(await p.evaluate(()=>AGUBackup20.keys().length),9);const pending=p.waitForEvent('download');await p.getByRole('button',{name:'Exportar cópia completa',exact:true}).click();const download=await pending,bytes=fs.readFileSync(await download.path()),bundle=JSON.parse(bytes.toString());const before=JSON.parse(bundle.items[KEY]);assert.equal(before.forNotebook.length,1);assert.equal(before.forNotebook[0].status,'anotado');assert.equal(before.notes['CF88:art131:p3'],'Nota CF sintética');
  const clean=await browser.newContext({viewport:{width,height:900}}),target=await clean.newPage();target.on('dialog',d=>d.accept());await target.goto(origin);await target.getByRole('button',{name:'Evolução',exact:true}).click();await target.getByRole('button',{name:'Dados e backup',exact:true}).click();await target.locator('#agu-s20-backup-file').setInputFiles({name:'leg07-sintetico.json',mimeType:'application/json',buffer:bytes});await target.waitForFunction(()=>!!localStorage.getItem('agu_leitor_juridico_s13_v1'));
  assert.equal(await target.evaluate(k=>localStorage.getItem(k),KEY),bundle.items[KEY]);
  assert.deepEqual(await target.evaluate(()=>AGUBackup20.importMissing(AGUBackup20.capture())),{added:0,skipped:Object.keys(bundle.items).length,keys:[]});
  await target.reload();const restored=await target.evaluate(()=>AGULegal.peek());assert.equal(restored.forNotebook.length,1);assert.equal(restored.forNotebook[0].id,first.id);assert.equal(restored.forNotebook[0].status,'anotado');assert.equal(restored.forNotebook[0].prompt,edited.prompt);assert.equal(restored.notes['DL4657:art30:pu'],'Nota LINDB sintética');assert.equal(await target.evaluate(()=>AGUStudy.active().id),session);await clean.close();
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'sem overflow '+width);assert.deepEqual(errors,[]);
  results.push({width,source:'L4717:art2:pu:e',stableId:first.id,topic:null,manualStatus:true,backupRestored:true,oldSessionPreserved:true,a11y});await ctx.close();
 }
 fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({target:origin,browser:browser.version(),axe:axe.version,results},null,2));console.log('LEG07_BROWSER_OK',JSON.stringify({target:origin,browser:browser.version(),viewports:results.map(x=>x.width)}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
