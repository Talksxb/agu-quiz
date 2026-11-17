/* S03: perda do rascunho reproduzida na UI de S02; provas em perfis sintéticos independentes. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests/artifacts-ux-estudo-integrado-03'),KEY='agu_quiz_mvp1_2026';
const server=http.createServer((req,res)=>{
 const name=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html',file=path.resolve(ROOT,name);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('Forbidden')}
 fs.readFile(file,(err,b)=>{res.writeHead(err?404:200,{'content-type':file.endsWith('.html')?'text/html;charset=utf-8':file.endsWith('.css')?'text/css;charset=utf-8':'application/javascript;charset=utf-8'});res.end(err?'Missing':b)});
});
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/';fs.mkdirSync(OUT,{recursive:true});const results=[];
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:844},hasTouch:width<=430,reducedMotion:'reduce',timezoneId:'America/Sao_Paulo',acceptDownloads:true}),p=await ctx.newPage(),errors=[],scans=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());await p.goto(origin,{waitUntil:'load'});
  assert.equal(await p.evaluate(()=>localStorage.length),0);
  await p.evaluate(()=>{AGUPlanner.create();AGULegal.unit('L9784:art12:caput');AGULegal.notebookSaveCard('ri-adm-01','Pergunta sintética anterior?');AGUStudy.start('L9784:art12:caput');AGUReview.deckStart('ADM-06');AGUReview.reveal();AGUReview.rate('errei')});
  await p.reload({waitUntil:'load'});
  const previous=await p.evaluate(()=>({...localStorage})),oldBundle=await p.evaluate(()=>AGUBackup20.capture());
  await p.locator('#agu-lesson-open').press('Enter');
  const nav=p.getByRole('navigation',{name:'Atalhos do Caderno',exact:true});
  for(const b of await nav.getByRole('button').all())assert.ok((await b.boundingBox()).height>=44,'controle de toque');
  await nav.getByRole('button',{name:'Registro manual',exact:true}).press('Enter');
  assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-notebook-manual-title');
  const draft={topic:'CON/Direitos fundamentais',hyp:'Hipótese manual sintética que não pode desaparecer.',agu:'Aplicação manual sintética preservada durante a importação.'};
  await p.locator('#nbtopic').selectOption(draft.topic);await p.locator('#nbHyp').fill(draft.hyp);await p.locator('#nbAgu').fill(draft.agu);
  async function assertDraft(){assert.deepEqual(await p.evaluate(()=>({topic:document.querySelector('#nbtopic').value,hyp:document.querySelector('#nbHyp').value,agu:document.querySelector('#nbAgu').value})),draft)}
  async function scan(label){
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'sem overflow '+width+' '+label);
   await p.addScriptTag({content:axe.source});const a=await p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
   scans.push({label,violations:a.violations,incomplete:a.incomplete});fs.writeFileSync(path.join(OUT,'diagnostico-'+width+'.json'),JSON.stringify({width,scans},null,2));assert.deepEqual(a.violations,[],label+' axe '+width);
  }
  async function upload(value){await p.locator('#agu-lesson-file').setInputFiles({name:'aula.json',mimeType:'application/json',buffer:Buffer.from(typeof value==='string'?value:JSON.stringify(value))});await p.waitForFunction(()=>!AGULessonImport.peek().reading)}
  await scan('rascunho-manual');
  // Os inconclusivos S02 ficam na borda da navegação horizontal; medir cada controle após receber foco.
  const focusedNavigation=[];
  for(const control of await p.locator('.secondary-nav > button, .secondary-more > summary').all()){
   await control.focus();
   const geometry=await control.evaluate(e=>{const r=e.getBoundingClientRect(),n=e.closest('nav').getBoundingClientRect();return {left:r.left,right:r.right,clipLeft:Math.max(0,n.left),clipRight:Math.min(innerWidth,n.right),label:e.textContent}});
   assert.ok(geometry.left>=geometry.clipLeft-2&&geometry.right<=geometry.clipRight+2,'controle focado visível: '+geometry.label);
   const diagnostic=await control.evaluate(async e=>{const r=await axe.run(e,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return {violations:r.violations,incomplete:r.incomplete}});
   assert.deepEqual(diagnostic.violations,[]);assert.deepEqual(diagnostic.incomplete,[],'controle focado com contraste mensurável');focusedNavigation.push({geometry,...diagnostic});
  }

  await nav.getByRole('button',{name:'Importar aula',exact:true}).press('Enter');assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-lesson-title');await assertDraft();
  await upload('{invalido');await assertDraft();assert.deepEqual(await p.evaluate(()=>({...localStorage})),previous);
  const lesson=await p.evaluate(()=>({...AGULessonImport.example(),id:'aula-ux03-longa-20261117',assuntoCurricular:'ADM-06',titulo:'Aula sintética longa para validação móvel',conceitos:Array.from({length:12},(_,i)=>('Conceito sintético '+i+'. ').repeat(20)),erros:Array.from({length:8},()=>('Dificuldade sintética relatada. ').repeat(14)),retomada:'Retomada sintética no ChatGPT. '.repeat(25),fontes:[{dispositivo:'Fonte sintética não certificada',url:'https://example.org/'+('referencia'.repeat(100)),verificacao:'a_conferir'}],paraCaderno:['Ponto final sintético do caderno físico.']}));
  await upload(lesson);await assertDraft();assert.equal(await p.locator('#agu-lesson-save').isDisabled(),true);
  assert.match(await p.locator('.agu-lesson-import .agu-lesson-text').innerText(),/Ponto final sintético/);await scan('previa-longa');
  const previewHeight=await p.locator('#agu-lesson-preview').evaluate(e=>e.getBoundingClientRect().height);
  await p.getByRole('button',{name:'Ir à confirmação',exact:true}).press('Enter');assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-lesson-confirm-title');
  assert.ok(await p.locator('#agu-lesson-confirm-title').evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight}),'confirmação alcançável sem rolagem manual');await scan('confirmacao-longa');
  await p.locator('#agu-lesson-target').selectOption('ADM/Atos administrativos');await assertDraft();
  await p.locator('#agu-lesson-confirm').press('Space');await assertDraft();assert.equal(await p.locator('#agu-lesson-save').isEnabled(),true);
  await p.getByRole('button',{name:'Atualizar prévia',exact:true}).press('Enter');await assertDraft();assert.equal(await p.locator('#agu-lesson-save').isDisabled(),true);
  await p.getByRole('button',{name:'Cancelar importação',exact:true}).press('Enter');await assertDraft();assert.deepEqual(await p.evaluate(()=>({...localStorage})),previous);
  await upload(lesson);await p.locator('#agu-lesson-target').selectOption('ADM/Atos administrativos');await p.locator('#agu-lesson-confirm').press('Space');await p.locator('#agu-lesson-save').press('Enter');await assertDraft();
  const after=await p.evaluate(()=>({...localStorage}));for(const [k,v] of Object.entries(previous))if(k!==KEY)assert.equal(after[k],v,k);
  assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),1);assert.equal(await p.evaluate(()=>AGUPlannerContext().notebook.length),1);
  await p.getByRole('button',{name:'Ver aula guardada',exact:true}).press('Enter');
  assert.equal(await p.locator('.agu-lesson-record').getAttribute('open'),'');assert.equal(await p.evaluate(()=>document.activeElement.parentElement.className),'agu-lesson-record');await scan('aula-guardada');
  assert.deepEqual(await p.evaluate(()=>({...localStorage})),after);
  await nav.getByRole('button',{name:'Registro manual',exact:true}).press('Enter');await assertDraft();await scan('manual-preservado');
  await p.screenshot({path:path.join(OUT,'manual-preservado-'+width+'.png'),fullPage:false});
  await p.getByRole('button',{name:'Consolidar registro',exact:true}).press('Enter');
  const manual=await p.evaluate(()=>AGUPlannerContext().notebook.find(n=>!n.id.startsWith('chatgpt:')));assert.equal(manual.topic,draft.topic);assert.equal(manual.hypothesis,draft.hyp);assert.equal(manual.agu,draft.agu);
  assert.equal(await p.evaluate(()=>AGUPlannerContext().notebook.length),2);
  await nav.getByRole('button',{name:'Ver registros',exact:true}).press('Enter');assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-notebook-records-title');await scan('dois-registros-existentes');
  const downloaded=p.waitForEvent('download');await p.getByRole('button',{name:'Exportar Markdown',exact:true}).click();const md=fs.readFileSync(await (await downloaded).path(),'utf8');assert.ok(md.includes(draft.hyp));assert.ok(md.includes(lesson.retomada));
  const bundle=await p.evaluate(()=>AGUBackup20.capture());assert.equal(await p.evaluate(()=>AGUBackup20.keys().length),9);
  for(const [label,b,expected] of [['anterior',oldBundle,0],['atual',bundle,2]]){
   const dst=await browser.newContext({viewport:{width,height:844},timezoneId:'America/Sao_Paulo'}),q=await dst.newPage();await q.goto(origin,{waitUntil:'load'});
   const restored=await q.evaluate(b=>AGUBackup20.importMissing(b),b);assert.equal(restored.added,Object.keys(b.items).length);await q.reload({waitUntil:'load'});
   assert.equal(await q.evaluate(()=>AGUPlannerContext().notebook.length),expected,'restauração '+label);assert.equal(await q.evaluate(()=>AGUReview.attemptsInfo().length),1);assert.equal((await q.evaluate(b=>AGUBackup20.importMissing(b),b)).added,0);await dst.close();
  }
  assert.deepEqual(errors,[]);results.push({width,previewHeight,draftPreserved:true,manualRecordSaved:true,readNavigationWrites:0,backupOldAndNew:true,physicalAndroid:false,focusedNavigation,scans});await ctx.close();
 }
 fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({target:origin,chromium:browser.version(),results},null,2));
 console.log('UX_ESTUDO_INTEGRADO_03_BROWSER_OK',JSON.stringify({chromium:browser.version(),widths:results.map(r=>r.width),scans:results.reduce((n,r)=>n+r.scans.length,0),focusedNavigation:results.reduce((n,r)=>n+r.focusedNavigation.length,0)}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
