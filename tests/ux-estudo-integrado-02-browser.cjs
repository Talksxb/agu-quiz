/* Importação local e Caderno original, com perfis sintéticos; não Android físico. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests/artifacts-ux-estudo-integrado-02'),KEY='agu_quiz_mvp1_2026';
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
  const ctx=await browser.newContext({viewport:{width,height:900},hasTouch:width<=430,reducedMotion:'reduce',timezoneId:'America/Sao_Paulo',acceptDownloads:true}),p=await ctx.newPage(),errors=[],scans=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());await p.goto(origin,{waitUntil:'load'});
  assert.equal(await p.evaluate(()=>localStorage.length),0);
  await p.evaluate(()=>{
   AGUPlanner.create();AGULegal.unit('L9784:art12:caput');AGULegal.notebookSaveCard('ri-adm-01','Pergunta anterior sintética?');AGUStudy.start('L9784:art12:caput');AGUReview.deckStart('ADM-06');AGUReview.reveal();AGUReview.rate('errei');
   const topic='ADM/Atos administrativos';localStorage.setItem('agu_quiz_mvp1_2026',JSON.stringify({version:1,created:'2026-11-17T10:00:00Z',topic:{[topic]:{score:1,evidence:1,state:'Compreensão inicial'}},answers:[{id:'legacy-answer-1',question:'a1',topic,date:'2026-11-17T10:00:00Z',correct:false}],sessions:[{id:'legacy-session-1',topic,started:'2026-11-17T10:00:00Z',minutes:20,mode:'confirmado'}],reviews:[{topic,due:'2099-01-01',stage:1}],notebook:[{id:'legacy-notebook-1',title:'Registro antigo sintético',topic,date:'2026-11-17T10:00:00Z',summary:'Original preservado.',evidenceCount:1,state:'Compreensão inicial',hypothesis:'Hipótese antiga',agu:'Aplicação antiga',answers:[],revisions:[]}],seed:false}));
  });
  await p.reload({waitUntil:'load'});const original=await p.evaluate(()=>JSON.stringify({...localStorage})),originalMain=await p.evaluate(()=>JSON.parse(localStorage.getItem('agu_quiz_mvp1_2026')));
  const lesson=await p.evaluate(()=>({...AGULessonImport.example(),assuntoCurricular:'ADM-06',titulo:'Encerramento sintético UX02',conceitos:['Conceito sintético A','Distinção sintética B'],erros:['Ajuste relatado; não é uma tentativa do Quiz.'],fontes:[{dispositivo:'Referência sintética a conferir',url:'https://example.org/referencia',verificacao:'a_conferir'}]}));
  async function scan(label){
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'sem overflow '+width+' '+label);
   await p.addScriptTag({content:axe.source});const a=await p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
   scans.push({label,violations:a.violations,incomplete:a.incomplete});fs.writeFileSync(path.join(OUT,'diagnostico-'+width+'.json'),JSON.stringify({width,scans},null,2));assert.deepEqual(a.violations,[],label+' axe '+width);
  }
  async function upload(value){await p.locator('#agu-lesson-file').setInputFiles({name:'aula.json',mimeType:'application/json',buffer:Buffer.from(typeof value==='string'?value:JSON.stringify(value))});await p.waitForFunction(()=>!AGULessonImport.peek().reading)}
  await p.locator('#agu-lesson-open').press('Enter');assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-lesson-title');await scan('entrada');
  await p.getByText('Como gerar a síntese no ChatGPT',{exact:true}).click();
  const sampleDownload=p.waitForEvent('download');await p.getByRole('button',{name:'Baixar exemplo sintético JSON',exact:true}).click();const sample=JSON.parse(fs.readFileSync(await (await sampleDownload).path(),'utf8'));assert.equal(sample.schema,'agu-aula-v1');assert.match(sample.titulo,/sintético/);
  await upload('{JSON malformado');assert.match(await p.locator('#agu-lesson-status').innerText(),/JSON válido/);assert.equal(await p.evaluate(()=>JSON.stringify({...localStorage})),original);await scan('arquivo-recusado');
  await upload(lesson);assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-lesson-preview');assert.equal(await p.locator('#agu-lesson-save').isDisabled(),true);
  assert.equal(await p.locator('#agu-lesson-target').inputValue(),'');assert.match(await p.locator('#agu-lesson-preview').innerText(),/Módulo pedagógico informado: ADM-02/);assert.match(await p.locator('#agu-lesson-preview').innerText(),/Código granular informado: ADM-06/);await scan('previa');
  await p.getByRole('button',{name:'Cancelar importação',exact:true}).press('Enter');assert.equal(await p.evaluate(()=>JSON.stringify({...localStorage})),original);
  await upload(lesson);await p.locator('#agu-lesson-target').selectOption('ADM/Atos administrativos');assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-lesson-target');
  await p.locator('#agu-lesson-confirm').press('Space');assert.equal(await p.locator('#agu-lesson-save').isEnabled(),true);await p.locator('#agu-lesson-save').press('Enter');
  assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-lesson-status');assert.match(await p.locator('#agu-lesson-status').innerText(),/Aula guardada/);
  const after=await p.evaluate(()=>JSON.parse(localStorage.getItem('agu_quiz_mvp1_2026')));assert.equal(after.notebook.length,2);assert.deepEqual(after.notebook[0],originalMain.notebook[0]);
  for(const name of ['answers','sessions','reviews','topic'])assert.deepEqual(after[name],originalMain[name]);
  const beforeOther=JSON.parse(original),afterAll=await p.evaluate(()=>({...localStorage}));for(const [k,v] of Object.entries(beforeOther))if(k!==KEY)assert.equal(afterAll[k],v,k);
  assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),1);
  await p.getByText('Ver síntese e ponto de retomada',{exact:true}).click();assert.match(await p.locator('.agu-lesson-record').innerText(),/Retomar a pergunta combinada/);
  const history=p.locator('.history').filter({hasText:'Aula no ChatGPT — Encerramento sintético UX02'});assert.match(await history.innerText(),/17\/11\/2026/);await scan('registro');
  await p.screenshot({path:path.join(OUT,'caderno-'+width+'.png'),fullPage:true});
  const mdDownload=p.waitForEvent('download');await p.getByRole('button',{name:'Exportar Markdown',exact:true}).click();const md=fs.readFileSync(await (await mdDownload).path(),'utf8');assert.match(md,/Retomar a pergunta combinada/);assert.match(md,/Referência sintética/);assert.match(md,/Original preservado/);
  const saved=await p.evaluate(()=>JSON.stringify({...localStorage}));await p.getByRole('button',{name:'Consultar assunto informado ADM-06',exact:true}).click();assert.equal(await p.locator('#agu-subject-title').innerText(),'Competência e delegação administrativa');assert.equal(await p.evaluate(()=>JSON.stringify({...localStorage})),saved);
  await p.getByRole('button',{name:'Início',exact:true}).click();await p.locator('#agu-lesson-open').click();
  await upload(lesson);await p.locator('#agu-lesson-target').selectOption('ADM/Atos administrativos');assert.match(await p.locator('#agu-lesson-status').innerText(),/já está no Caderno/);assert.equal(await p.locator('#agu-lesson-save').isDisabled(),true);assert.equal(await p.evaluate(()=>JSON.stringify({...localStorage})),saved);await scan('duplicata');
  await upload({...lesson,retomada:'Outro conteúdo da mesma identidade'});await p.locator('#agu-lesson-target').selectOption('ADM/Atos administrativos');assert.match(await p.locator('#agu-lesson-status').innerText(),/outro conteúdo ou destino/);assert.equal(await p.locator('#agu-lesson-save').isDisabled(),true);assert.equal(await p.evaluate(()=>JSON.stringify({...localStorage})),saved);await scan('conflito');
  await upload({...lesson,id:'aula-quota-sintetica-02'});await p.locator('#agu-lesson-confirm').press('Space');
  await p.evaluate(()=>{window.__ux02Set=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='agu_quiz_mvp1_2026')throw new DOMException('Teste sintético','QuotaExceededError');return window.__ux02Set.call(this,k,v)}});
  await p.locator('#agu-lesson-save').click();assert.match(await p.locator('#agu-lesson-status').innerText(),/Não foi possível gravar/);assert.equal(await p.evaluate(()=>JSON.stringify({...localStorage})),saved);assert.equal(await p.evaluate(()=>AGUPlannerContext().notebook.length),2);
  await p.evaluate(()=>{Storage.prototype.setItem=window.__ux02Set;delete window.__ux02Set});await p.getByRole('button',{name:'Cancelar importação',exact:true}).click();
  await p.getByRole('button',{name:'Evolução',exact:true}).click();await p.getByRole('button',{name:'Dados e backup Exportação, importação e confiabilidade',exact:true}).click();
  const backupDownload=p.waitForEvent('download');await p.locator('button[onclick="AGUBackup20.exportFile()"]') .click();const bundle=JSON.parse(fs.readFileSync(await (await backupDownload).path(),'utf8'));
  assert.equal(Object.keys(bundle.items).length,5);assert.equal(await p.evaluate(()=>AGUBackup20.keys().length),9);
  const dest=await browser.newContext({viewport:{width,height:900},timezoneId:'America/Sao_Paulo'}),q=await dest.newPage();await q.goto(origin,{waitUntil:'load'});assert.equal((await q.evaluate(b=>AGUBackup20.importMissing(b),bundle)).added,5);await q.reload({waitUntil:'load'});
  await q.locator('#agu-lesson-open').click();assert.equal(await q.locator('.agu-lesson-record').count(),1);assert.equal(await q.evaluate(()=>AGUPlannerContext().notebook.length),2);
  await q.locator('#agu-lesson-file').setInputFiles({name:'aula.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(lesson))});await q.waitForFunction(()=>!AGULessonImport.peek().reading);await q.locator('#agu-lesson-target').selectOption('ADM/Atos administrativos');assert.match(await q.locator('#agu-lesson-status').innerText(),/já está no Caderno/);assert.equal((await q.evaluate(b=>AGUBackup20.importMissing(b),bundle)).added,0);
  assert.deepEqual(errors,[]);results.push({width,scans,restoredCategories:5,legacyRecordPreserved:true,oneImportedRecord:true,attemptsUnchanged:1,physicalAndroid:false});await dest.close();await ctx.close();
 }
 fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({target:origin,chromium:browser.version(),results},null,2));
 console.log('UX_ESTUDO_INTEGRADO_02_BROWSER_OK',JSON.stringify({chromium:browser.version(),widths:results.map(r=>r.width),scans:results.reduce((n,r)=>n+r.scans.length,0)}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
