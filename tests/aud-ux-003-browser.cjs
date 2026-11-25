'use strict';
const {chromium}=require('playwright'),assert=require('assert/strict'),fs=require('fs'),path=require('path');
const u=require('./aud-ux-browser-utils.cjs'),root=path.resolve(__dirname,'..'),out=path.join(__dirname,'artifacts-aud-ux-003'),data=require('../dados/questoes-vigentes-gov003.js'),key='agu_gov_003_treino_vigente_v1';
let browser,server;const results=[],started=Date.now();
(async()=>{
 fs.mkdirSync(out,{recursive:true});server=await u.server(root);browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 for(const width of [320,360,390,430,1280]){
  const config={viewport:{width,height:900},hasTouch:width<500,reducedMotion:'reduce',acceptDownloads:true},ctx=await browser.newContext(config),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());
  await p.goto(server.base);await p.evaluate(()=>setView('officialExam'));assert.match(await p.locator('#agu-question-bank').innerText(),/93 não anuladas/);assert.ok(await p.locator('#aq-submit').isDisabled());
  await p.getByRole('link',{name:'Rever erros do treino vigente',exact:true}).click();await p.getByText('Nenhuma questão neste filtro.',{exact:true}).waitFor();assert.equal(await p.evaluate(k=>localStorage.getItem(k),key),null);
  await p.locator('#vig-all').press('Enter');const q=data.items[0],wrong=q.currentKey==='E'?'C':'E';
  await p.getByRole('radio',{name:wrong==='C'?'Certo':'Errado',exact:true}).check();await p.locator('#vig-submit').press('Enter');assert.match(await p.locator('#vig-feedback').innerText(),/Resposta incorreta/);
  assert.equal(await p.evaluate(k=>JSON.parse(localStorage.getItem(k)).attempts.length,key),1);
  await p.locator('#vig-next').press('Enter');const url=p.url(),title=await p.locator('#vig-title').innerText();await p.reload();assert.equal(await p.locator('#vig-title').innerText(),title);assert.equal(p.url(),url);assert.equal(await p.evaluate(k=>JSON.parse(localStorage.getItem(k)).attempts.length,key),1);
  await p.goto(server.base+'questoes-vigentes.html?situacao=erros&questao=nao-existe');assert.match(await p.locator('#vig-title').innerText(),new RegExp('Questão '+q.n+' · 1 de 1'));
  const scans={question:await u.scan(p)};
  if(width<500)await p.getByRole('radio',{name:q.currentKey==='E'?'Errado':'Certo',exact:true}).tap();else await p.getByRole('radio',{name:q.currentKey==='E'?'Errado':'Certo',exact:true}).check();
  await p.locator('#vig-submit').press('Enter');assert.equal(await p.evaluate(k=>JSON.parse(localStorage.getItem(k)).attempts.length,key),2);
  await p.locator('#vig-filter').selectOption('wrong');await p.getByText('Nenhuma questão neste filtro.',{exact:true}).waitFor();const raw=await p.evaluate(k=>localStorage.getItem(k),key);
  await p.goto(server.base+'?abrir=backup');assert.equal(await p.evaluate(()=>AGUBackup20.keys().length),11);assert.equal(await p.evaluate(k=>AGUBackup20.capture().items[k],key),raw);
  const download=p.waitForEvent('download');await p.getByRole('button',{name:'Exportar cópia completa',exact:true}).click();const bytes=fs.readFileSync(await(await download).path());
  const target=await browser.newContext(config),t=await target.newPage();t.on('dialog',d=>d.accept());await t.goto(server.base+'?abrir=backup');
  const plan=JSON.stringify({schema:1,settings:{dailyMinutes:[10,10,10,10,10,10,0]},weeks:{},created:'2026-11-25T12:00:00Z'});await t.evaluate(v=>localStorage.setItem('agu_quiz_planejamento_semanal_v1',v),plan);
  await t.locator('#agu-s20-backup-file').setInputFiles({name:'aud003.json',mimeType:'application/json',buffer:bytes});await t.waitForFunction(k=>!!localStorage.getItem(k),key);assert.equal(await t.evaluate(k=>localStorage.getItem(k),key),raw);assert.equal(await t.evaluate(()=>localStorage.getItem('agu_quiz_planejamento_semanal_v1')),plan);
  assert.equal(await t.evaluate(()=>AGUBackup20.importMissing(AGUBackup20.capture()).added),0);
  scans.backup=await u.scan(t);await t.screenshot({path:path.join(out,'backup-'+width+'.png')});await t.goto(server.base+'questoes-vigentes.html?questao='+encodeURIComponent(q.id));assert.equal(await t.evaluate(k=>JSON.parse(localStorage.getItem(k)).attempts.length,key),2);assert.match(await t.locator('#vig-title').innerText(),new RegExp('Questão '+q.n));
  assert.deepEqual(errors,[]);results.push({width,urlResume:true,wrongThenCorrect:true,noWriteOnOpen:true,backupRoundTrip:true,preserveExisting:true,attempts:2,scans});await target.close();await ctx.close();
 }
 console.log('AUD_UX_003_BROWSER_OK',JSON.stringify({widths:results.map(x=>x.width),seconds:(Date.now()-started)/1000}));
})().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'jornada.json'),JSON.stringify({browser:browser?.version(),seconds:(Date.now()-started)/1000,results},null,2));await browser?.close();server?.close()});
