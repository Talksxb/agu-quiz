'use strict';
const {chromium}=require('playwright'),assert=require('assert/strict'),fs=require('fs'),path=require('path');
const u=require('./aud-ux-browser-utils.cjs'),root=path.resolve(__dirname,'..'),out=path.join(__dirname,'artifacts-aud-ux-004');let browser,server;const results=[],started=Date.now();
(async()=>{
 fs.mkdirSync(out,{recursive:true});server=await u.server(root);browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:900},hasTouch:width<500,timezoneId:'America/Sao_Paulo',reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(server.base);
  const initial=await p.evaluate(()=>JSON.stringify(localStorage));await p.evaluate(()=>setView('curriculum'));assert.match(await p.locator('#main').innerText(),/Sem matriz importada/);
  assert.match(await p.locator('#main').innerText(),/evidências locais de aprendizagem \(não auditoria\)/);assert.match(await p.locator('#main').innerText(),/Sem estudo registrado neste navegador/);
  assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),initial,'abrir mapa não cria progresso ou matriz');
  const total=await p.locator('#agu-curricular-topic option').count();assert.ok(total<412&&total>100,'IDs vêm dos recursos públicos');
  assert.equal(await p.evaluate(()=>AGUCurriculum.select('ADM-0')),false);assert.equal(await p.evaluate(()=>AGUCurriculum.select('<script>')),false);
  await p.locator('#agu-curricular-topic').selectOption('ADM-64b');assert.match(await p.locator('#agu-curricular-resources').innerText(),/LGPD/);assert.equal(await p.locator('#agu-curricular-resources a[href*="livro=lgpd-adm64b"]').count(),1);
  await p.locator('#agu-curricular-topic').selectOption('AMB-03');assert.equal(await p.locator('#agu-curricular-resources a[href*="livro=amb-03"]').count(),1);assert.equal(await p.locator('#agu-curricular-resources a[href*="amb-001"]').count(),0,'ampliado pendente não entra');
  await p.locator('#agu-curricular-topic').selectOption('AMB-06');assert.equal(await p.locator('#agu-curricular-resources a[href*="livro=amb-06"]').count(),1,'Novo livro visível pelo ID curricular');
  await p.locator('#agu-curricular-topic').selectOption('AMB-11');assert.equal(await p.locator('#agu-curricular-resources a[href*="livro=amb-11"]').count(),1);assert.equal(await p.evaluate(()=>Object.keys(AGU_METHOD_BOOK_REFERENCES.chapters).length),6);
  await p.locator('#agu-curricular-topic').selectOption('SEG-08');const question=p.locator('#agu-curricular-resources a[href*="questoes-vigentes"]');assert.equal(await question.count(),1);
  if(width<500)await question.tap();else await question.press('Enter');await p.locator('#vig-title').waitFor();assert.match(await p.locator('#vig-title').innerText(),/Questão 196/);assert.equal(await p.evaluate(()=>localStorage.getItem('agu_gov_003_treino_vigente_v1')),null,'abrir questão não responde');
  await p.goto(server.base);await p.evaluate(()=>setView('curriculum'));await p.locator('#agu-curricular-topic').selectOption('ADM-06');
  const law=p.locator('#agu-curricular-resources a[href*="abrir=lei"]').first(),href=await law.getAttribute('href'),expected=new URL(href,server.base).searchParams.get('dispositivo');await law.press('Enter');await p.locator('#agu-reader').waitFor();assert.equal(await p.evaluate(()=>AGULegal.peek().unit),expected);
  await p.evaluate(()=>{AGUReview.deckStart('CON-02');AGUReview.deckPause();setView('curriculum')});const previous=await p.evaluate(()=>AGUReview.deckSession());
  await p.locator('#agu-curricular-topic').selectOption('ADM-06');assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-curricular-topic');const scans={resources:await u.scan(p)};await p.screenshot({path:path.join(out,'recursos-'+width+'.png')});
  await p.getByRole('button',{name:'Estudar cartões de ADM-06',exact:true}).press('Enter');await p.locator('#agu-deck-choice').waitFor();assert.deepEqual(await p.evaluate(()=>AGUReview.deckSession()),previous,'não substituir sessão existente');
  await p.getByRole('button',{name:'Cancelar',exact:true}).press('Enter');assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),0);await p.getByRole('button',{name:'Retomar sessão',exact:true}).press('Enter');assert.deepEqual(await p.evaluate(()=>AGUReview.deckSession()),previous);
  await p.getByRole('button',{name:'Pausar e voltar',exact:true}).press('Enter');await p.evaluate(()=>setView('curriculum'));await p.locator('#agu-curricular-topic').selectOption('ELE-03');assert.match(await p.locator('#agu-curricular-resources').innerText(),/Sem flashcards/);
  await p.locator('#agu-curricular-resources details > summary').press('Enter');const hist=p.locator('#agu-curricular-resources details button').first();await hist.press('Enter');assert.equal(await p.locator('#aq-year').inputValue(),'2023');assert.equal(await p.locator('#aq-number').inputValue(),'96');assert.ok(await p.locator('#aq-submit').isDisabled());
  scans.historical=await u.scan(p);assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),0);
  await p.reload();await p.evaluate(()=>setView('curriculum'));assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),0);assert.equal(await p.evaluate(()=>localStorage.getItem('agu_quiz_curriculo_repo_v1')),null);
  assert.deepEqual(errors,[]);results.push({width,publicTopics:total,suffixId:true,publishedBooks:6,questionNoAutoAnswer:true,lawExact:true,sessionPreserved:true,historicalPdfGate:true,noMatrixExport:true,scans});await ctx.close();
 }
 console.log('AUD_UX_004_BROWSER_OK',JSON.stringify({widths:results.map(x=>x.width),publicTopics:results[0].publicTopics,seconds:(Date.now()-started)/1000}));
})().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'jornada.json'),JSON.stringify({browser:browser?.version(),seconds:(Date.now()-started)/1000,results},null,2));await browser?.close();server?.close()});
