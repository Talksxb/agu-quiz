/* LEG08 — revisões já agendadas + marcações do leitor, sem perfis pessoais. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests/artifacts-leg08'),KEY='agu_leitor_juridico_s13_v1',REVIEW='agu_quiz_revisao_inteligente_v1',PLAN='agu_quiz_planejamento_semanal_v1';
const server=http.createServer((req,res)=>{const f=path.resolve(ROOT,decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html');if(!f.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end()}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'content-type':f.endsWith('.css')?'text/css;charset=utf-8':f.endsWith('.html')?'text/html;charset=utf-8':'application/javascript;charset=utf-8','cache-control':'no-store'});res.end(e?'missing':b)})});
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(process.env.AGU_CHROMIUM_BIN?{executablePath:process.env.AGU_CHROMIUM_BIN}:{})});fs.mkdirSync(OUT,{recursive:true});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/',results=[];
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',acceptDownloads:true});
  await ctx.addInitScript(()=>{
   const key='agu_leitor_juridico_s13_v1',rv='agu_quiz_revisao_inteligente_v1';
   if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify({article:'DL4657:art30',unit:'DL4657:art30:pu',tab:'comentarios',mobile:'text',notes:{'CF88:art131:p3':'Nota CF sintética','L9784:art50:I':'Nota Lei 9784 sintética','LC101:art75:caput':'Nota LRF sintética','LC73:art73:caput':'Nota LC73 sintética','DL4657:art30:pu':'Nota LINDB sintética'}}));
   if(!localStorage.getItem(rv))localStorage.setItem(rv,JSON.stringify({schema:'agu-review-v1',attempts:[],cards:{'ri-adm-01':{stage:1,due:'2000-01-01',seen:1,errors:12}},created:'2026-11-14T20:00:00.000Z'}));
  });
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());
  async function add(law,article,device,prompt){
   await p.goto(origin+'?abrir=lei&norma='+law);
   if(width<=850)await p.getByRole('button',{name:'Índice',exact:true}).click();
   await p.locator('.agu-index-entry[onclick="AGULegal.article(\''+article+'\',true)"]').press('Enter');
   await p.locator('.agu-unit[onclick="AGULegal.unit(\''+device+'\')"]').press('Space');
   assert.equal(await p.evaluate(()=>AGULegal.peek().unit),device);
   await p.locator('.agu-paper-context button').press('Enter');
   await p.locator('#agu-caderno-brief').fill(prompt);await p.locator('#agu-caderno-save').press('Enter');
  }
  await add('L9784','L9784:art12','L9784:art12:caput','Quando a delegação exige hierarquia?');
  await add('L9784','L9784:art12','L9784:art12:caput','Que publicação é exigida na delegação?');
  await add('L9784','L9784:art12','L9784:art12:caput','Diferença entre delegação e avocação?');
  await add('L4717','L4717:art2','L4717:art2:pu:e','Distinguir motivo, motivação e finalidade.');
  const original=await p.evaluate(()=>AGULegal.peek()),originalReview=await p.evaluate(()=>localStorage.getItem('agu_quiz_revisao_inteligente_v1'));
  assert.equal(original.forNotebook.length,4);assert.deepEqual(original.forNotebook.map(x=>x.topic),['ADM-06','ADM-06','ADM-06',null]);
  await p.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  await p.getByRole('button',{name:'Iniciar seleção automática',exact:true}).press('Enter');
  assert.match(await p.locator('.question-title').innerText(),/competência administrativa federal/);
  assert.equal(await p.locator('.agu-review-notebook-item').count(),3);assert.doesNotMatch(await p.locator('.agu-review-notebook').innerText(),/Distinguir motivo, motivação e finalidade/);
  const first=p.locator('.agu-review-notebook-item').filter({hasText:'Quando a delegação exige hierarquia?'});
  const id=original.forNotebook[0].id;await first.getByRole('button',{name:'Abrir dispositivo legal',exact:true}).press('Enter');
  assert.match(p.url(),/norma=L9784/);assert.match(p.url(),/dispositivo=L9784%3Aart12%3Acaput/);assert.equal(await p.evaluate(()=>AGULegal.peek().unit),'L9784:art12:caput');
  assert.ok(await p.getByRole('button',{name:/Voltar à revisão programada/}).isVisible());await p.getByRole('button',{name:/Voltar à revisão programada/}).press('Enter');
  assert.match(await p.locator('.question-title').innerText(),/competência administrativa federal/);
  assert.equal(await p.evaluate(()=>document.activeElement?.id),'agu-review-notebook-origin-'+id);
  assert.equal(await p.evaluate(()=>localStorage.getItem('agu_quiz_revisao_inteligente_v1')),originalReview);
  assert.ok(!p.url().includes('abrir=lei'),'retorno não mantém rota legal antiga');
  await first.getByRole('button',{name:'Anotei no meu caderno',exact:true}).press('Enter');
  assert.equal(await p.evaluate(()=>document.activeElement?.id),'agu-review-notebook-heading');
  const second=p.locator('.agu-review-notebook-item').filter({hasText:'Que publicação é exigida'});
  await second.getByRole('button',{name:'Dispensar',exact:true}).click();
  assert.equal(await p.locator('.agu-review-notebook-item').count(),1);
  assert.deepEqual(await p.evaluate(()=>AGULegal.peek().forNotebook.map(x=>x.status)),['anotado','dispensado','pendente','pendente']);
  const planBefore=await p.evaluate(k=>localStorage.getItem(k),PLAN);
  assert.equal(await p.evaluate(k=>localStorage.getItem(k),REVIEW),originalReview);
  assert.equal(await p.evaluate(k=>localStorage.getItem(k),PLAN),planBefore);
  const a11y={};
  if(width===390||width===1280){
   await p.addScriptTag({content:axe.source});a11y.initial=await p.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),passed:r.passes.map(v=>v.id)}});assert.deepEqual(a11y.initial.violations,[]);a11y.afterScroll=[];
   for(const v of a11y.initial.incomplete)for(const targets of v.nodes){const selector=targets[0],loc=p.locator(selector);if(typeof selector!=='string'||!await loc.count())continue;await loc.first().scrollIntoViewIfNeeded();a11y.afterScroll.push(await p.evaluate(async({selector,id})=>{const r=await axe.run(document.querySelector(selector),{runOnly:{type:'rule',values:[id]}});return {selector,rule:id,violations:r.violations.length,incomplete:r.incomplete.length,passed:r.passes.map(x=>x.id)}},{selector,id:v.id}))}
   fs.writeFileSync(path.join(OUT,'axe-'+width+'.json'),JSON.stringify(a11y,null,2));await p.screenshot({path:path.join(OUT,'revisao-caderno-'+width+'.png')});
  }
  await p.getByRole('button',{name:'Mostrar resposta',exact:true}).press('Enter');await p.getByRole('button',{name:'Lembrei',exact:true}).press('Enter');
  const after=await p.evaluate(()=>AGULegal.peek());assert.deepEqual(after.forNotebook.map(x=>x.status),['anotado','dispensado','pendente','pendente']);
  await p.reload();const loaded=await p.evaluate(()=>AGULegal.peek());assert.deepEqual(loaded.forNotebook,after.forNotebook);
  await p.getByRole('button',{name:'Evolução',exact:true}).click();await p.getByRole('button',{name:'Dados e backup',exact:true}).click();
  const pending=p.waitForEvent('download');await p.getByRole('button',{name:'Exportar cópia completa',exact:true}).click();const dl=await pending,bytes=fs.readFileSync(await dl.path()),bundle=JSON.parse(bytes.toString());assert.equal(Object.keys(bundle.items).length<=9,true);
  const targetCtx=await browser.newContext({viewport:{width,height:900}}),target=await targetCtx.newPage();target.on('dialog',d=>d.accept());await target.goto(origin);await target.getByRole('button',{name:'Evolução',exact:true}).click();await target.getByRole('button',{name:'Dados e backup',exact:true}).click();await target.locator('#agu-s20-backup-file').setInputFiles({name:'leg08-sintetico.json',mimeType:'application/json',buffer:bytes});await target.waitForFunction(()=>!!localStorage.getItem('agu_leitor_juridico_s13_v1'));
  await target.reload();const restored=await target.evaluate(()=>AGULegal.peek());assert.deepEqual(restored.forNotebook,after.forNotebook);assert.equal(restored.notes['DL4657:art30:pu'],'Nota LINDB sintética');assert.equal(restored.notes['CF88:art131:p3'],'Nota CF sintética');assert.equal(await target.evaluate(()=>AGUBackup20.keys().filter(x=>x.key!=='agu_livros_reader_v1').length),9);
  const count=await target.evaluate(()=>AGUBackup20.importMissing(AGUBackup20.capture()).added);assert.equal(count,0);await targetCtx.close();
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'sem overflow '+width);assert.deepEqual(errors,[]);
  results.push({width,context:'ADM-06',exactDevice:'L9784:art12:caput',matched:3,unlinked:1,returnFocus:true,manualStates:true,reviewScheduleIndependent:true,backupRestored:true,a11y});await ctx.close();
 }
 fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({target:origin,browser:browser.version(),axe:axe.version,results},null,2));console.log('LEG08_BROWSER_OK',JSON.stringify({target:origin,browser:browser.version(),viewports:results.map(x=>x.width)}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
