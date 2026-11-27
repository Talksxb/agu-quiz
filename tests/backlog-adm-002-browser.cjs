'use strict';
const {chromium}=require('playwright'),assert=require('assert/strict'),fs=require('fs'),path=require('path'),vm=require('vm'),u=require('./aud-ux-browser-utils.cjs');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(__dirname,'artifacts-backlog-adm-002'),KEY='agu_quiz_mvp1_2026',TOPIC='ADM/Responsabilidade civil do Estado',z={AGU_AUTHORED_BACKLOG:[]};z.window=z;
vm.runInNewContext(fs.readFileSync(path.join(ROOT,'dados/questoes-autorais-backlog-adm002.js'),'utf8'),z);const questions=z.AGU_AUTHORED_BACKLOG;
let browser,server;const results=[],started=Date.now();
const record=p=>p.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);
async function resources(p){await p.evaluate(()=>setView('curriculum'));await p.locator('#agu-curricular-topic').selectOption('ADM-53')}
async function open(p,q){await resources(p);await p.getByRole('button',{name:q.title,exact:true}).press('Enter');await p.getByText(q.stem,{exact:true}).waitFor()}
async function answer(p,choice,touch=false){const button=p.getByRole('button',{name:choice?'Errado':'Certo',exact:true});if(touch)await button.tap();else await button.press('Space');await p.getByRole('button',{name:'Conferir resposta',exact:true}).press('Enter')}
(async()=>{
 fs.mkdirSync(OUT,{recursive:true});server=await u.server(ROOT);server.base=process.env.AGU_TEST_URL||server.base;
 browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 for(const width of [320,360,390,430,1280]){
  const config={viewport:{width,height:900},hasTouch:width<500,reducedMotion:'reduce',acceptDownloads:true},ctx=await browser.newContext(config),p=await ctx.newPage(),errors=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());await p.goto(server.base);
  const reviewBefore=await p.evaluate(()=>localStorage.getItem('agu_quiz_revisao_inteligente_v1'));
  // Histórico prévio válido: resposta real a questão do lote anterior, sem reescrever o armazenamento.
  assert.equal(await p.evaluate(()=>AGUAuthoredQuestions.open('bkl-adm26-01')),true);await answer(p,1,width<500);const prior=await record(p);assert.equal(prior.answers.length,1);
  await p.evaluate(()=>setView('curriculum'));
  const row=p.locator('.topic').filter({has:p.getByText('Responsabilidade civil do Estado',{exact:true})});assert.match(await row.innerText(),/4 desafio/);assert.match(await row.innerText(),/Sem estudo registrado/);
  await row.getByRole('button',{name:'Treinar desafio autoral',exact:true}).press('Enter');const startedStem=(await p.locator('.question-title').innerText()).trim();assert.ok(questions.some(q=>q.stem===startedStem));
  let state=await record(p);assert.equal(state.answers.length,1);assert.equal(state.topic[TOPIC].state,'Em investigação');
  await open(p,questions[0]);assert.equal(await p.evaluate(()=>document.activeElement.id),'qtopic');assert.equal(await p.getByRole('link',{name:'Revisar fundamento no capítulo',exact:true}).count(),0);
  await answer(p,0,width<500);state=await record(p);assert.equal(state.answers.at(-1).correct,false);assert.equal(state.answers.at(-1).curricular_id,'ADM-53');assert.equal(state.topic[TOPIC].state,'Revisão necessária');
  const firstReview=state.reviews.filter(r=>r.topic===TOPIC);assert.equal(firstReview.length,1);assert.equal(firstReview[0].stage,1);assert.ok(Math.abs(Date.parse(firstReview[0].due)-Date.now()-86400000)<10000);
  const scans={error:await u.scan(p)},reading=p.getByRole('link',{name:'Revisar fundamento no capítulo',exact:true});assert.match(await reading.getAttribute('href'),/livro=adm-53&secao=adm-53-s07$/);
  await reading.press('Enter');await p.waitForFunction(()=>document.querySelector('#book')?.dataset.chapterId==='adm-53');assert.equal(await p.locator('#page').inputValue(),'6');assert.match(await p.locator('#read-full').innerText(),/Tema 940/);assert.equal((await record(p)).answers.length,2);
  await p.goBack();await p.reload();assert.equal((await record(p)).answers.length,2);await open(p,questions[0]);assert.equal((await record(p)).answers.length,2);await answer(p,1);
  state=await record(p);assert.equal(state.answers.at(-1).correct,true);assert.equal(state.reviews.find(r=>r.topic===TOPIC).stage,2);assert.ok(Math.abs(Date.parse(state.reviews.find(r=>r.topic===TOPIC).due)-Date.now()-7*86400000)<10000);
  for(const q of questions.slice(1)){
   const n=(await record(p)).answers.length;await open(p,q);assert.equal((await record(p)).answers.length,n);await answer(p,q.right);
   state=await record(p);const a=state.answers.at(-1);assert.equal(a.question,q.id);assert.equal(a.curricular_id,'ADM-53');assert.equal(a.correct,true);assert.equal(a.origin,'inédita');
   assert.match(await p.getByRole('link',{name:'Revisar fundamento no capítulo',exact:true}).getAttribute('href'),new RegExp('secao='+q.sectionId+'$'));
   const source=p.getByRole('link',{name:q.evidence.kind==='jurisprudencia'?'Conferir tese oficial':'Conferir texto da norma',exact:true});assert.equal(await source.getAttribute('href'),q.source.url);
  }
  state=await record(p);assert.equal(state.answers.length,6);assert.deepEqual(state.answers.slice(0,1),prior.answers);assert.deepEqual(state.topic['ADM/Poderes administrativos'],prior.topic['ADM/Poderes administrativos']);assert.deepEqual(state.reviews.filter(r=>r.topic!==TOPIC),prior.reviews);
  assert.notEqual(state.topic[TOPIC].state,'Domínio demonstrado');assert.equal(state.reviews.filter(r=>r.topic===TOPIC).length,1);assert.equal(await p.evaluate(()=>localStorage.getItem('agu_quiz_revisao_inteligente_v1')),reviewBefore);
  const raw=await p.evaluate(()=>JSON.stringify(localStorage));assert.equal(await p.evaluate(()=>AGUAuthoredQuestions.open('bkl-adm53-99')),false);assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),raw);
  await resources(p);assert.match(await p.locator('#agu-curricular-resources').innerText(),/Questões autorais · 4/);assert.equal(await p.locator('#agu-curricular-resources a[href="livros-agu.html?livro=adm-53"]').count(),1);scans.resources=await u.scan(p);await p.screenshot({path:path.join(OUT,'adm53-'+width+'.png')});
  await p.evaluate(()=>setView('officialExam'));assert.match(await p.locator('#agu-question-bank').innerText(),/48 questões autorais/);assert.equal(await p.evaluate(()=>localStorage.getItem('agu_gov_003_treino_vigente_v1')),null);assert.equal(await p.evaluate(()=>localStorage.getItem('agu_quiz_curriculo_repo_v1')),null);
  await p.goto(server.base+'?abrir=backup');const download=p.waitForEvent('download');await p.getByRole('button',{name:'Exportar cópia completa',exact:true}).click();const bytes=fs.readFileSync(await(await download).path()),other=await browser.newContext(config),t=await other.newPage();t.on('dialog',d=>d.accept());await t.goto(server.base+'?abrir=backup');await t.locator('#agu-s20-backup-file').setInputFiles({name:'adm53-sintetico.json',mimeType:'application/json',buffer:bytes});await t.waitForFunction(k=>!!localStorage.getItem(k),KEY);const restored=await record(t);assert.deepEqual(restored.answers,state.answers);assert.deepEqual(restored.topic,state.topic);assert.deepEqual(restored.reviews,state.reviews);scans.backup=await u.scan(t);await other.close();
  assert.deepEqual(errors,[]);results.push({width,fourCases:true,oldAnswerAndTopicPreserved:true,legacyAndExactIdEntry:true,errorThenCorrect:true,existingIntervalsAndAgenda:true,chapterSection:true,reload:true,noAutomaticDomain:true,portableBackup:true,officialAndPrivateMatrixUntouched:true,scans});await ctx.close();
 }
 console.log('BACKLOG_ADM_002_BROWSER_OK',JSON.stringify({widths:results.map(x=>x.width),seconds:(Date.now()-started)/1000,url:server.base}));
})().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({browser:browser?.version(),url:server?.base,seconds:(Date.now()-started)/1000,results},null,2));await browser?.close();server?.close()});
