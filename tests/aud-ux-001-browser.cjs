/* AUD-UX-001: Chromium isolado, dados sintéticos, sem Android físico/TalkBack. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(__dirname,'artifacts-aud-ux-001');
const KEY='agu_quiz_revisao_inteligente_v1',PLAN='agu_quiz_planejamento_semanal_v1';
const current=fs.readFileSync(path.join(ROOT,'revisao-inteligente.js'),'utf8'),baseline=require('./aud-ux-001-legado.cjs')(current);
assert.throws(()=>require('./aud-ux-001-legado.cjs')(current+'\n// alteração não autorizada'),/somente o delta/);
const server=http.createServer((req,res)=>{
 const file=path.resolve(ROOT,'.'+new URL(req.url,'http://localhost').pathname.replace(/\/$/,'/index.html'));
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end()}
 fs.readFile(file,(err,b)=>{res.writeHead(err?404:200,{'content-type':({'.html':'text/html;charset=utf-8','.js':'application/javascript','.mjs':'application/javascript','.json':'application/json','.css':'text/css'})[path.extname(file)]||'application/octet-stream','cache-control':'no-store'});res.end(err?'missing':b)});
});
let browser;
const results=[],started=Date.now();
async function open(p,base){await p.goto(base);await p.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();await p.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();await p.evaluate(()=>document.fonts.ready)}
const stored=p=>p.evaluate(()=>Object.fromEntries(Object.keys(localStorage).sort().map(k=>[k,localStorage.getItem(k)])));
async function accessibility(p,label,width){
 if(!await p.evaluate(()=>typeof axe!=='undefined'))await p.addScriptTag({content:axe.source});
 const report=await p.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(x=>({id:x.id,targets:x.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(x=>({id:x.id,targets:x.nodes.map(n=>n.target)}))}});
 assert.deepEqual(report.violations,[],label+' axe '+width);
 report.rechecks=[];
 for(const rule of report.incomplete)for(const target of rule.targets){
  const rec={rule:rule.id,target,resolved:false};
  if(target.length===1&&typeof target[0]==='string'&&await p.locator(target[0]).count()===1){
   await p.locator(target[0]).scrollIntoViewIfNeeded();
   Object.assign(rec,await p.evaluate(async({id,target})=>{
    const node=document.querySelector(target[0]),r=node.getBoundingClientRect(),a=await axe.run(document,{runOnly:{type:'rule',values:[id]}});
    const same=n=>JSON.stringify(n.target)===JSON.stringify(target),hits=k=>a[k].flatMap(x=>x.nodes.filter(same)).length;
    return {visible:r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight,passed:hits('passes'),failed:hits('violations'),incomplete:hits('incomplete')};
   },{id:rule.id,target}));
   rec.resolved=rec.visible&&rec.passed>0&&!rec.failed&&!rec.incomplete;
  }
  report.rechecks.push(rec);
 }
 report.unresolved=report.rechecks.filter(x=>!x.resolved);
 fs.writeFileSync(path.join(OUT,'axe-'+label+'-'+width+'.json'),JSON.stringify(report,null,2)+'\n');
 assert.deepEqual(report.unresolved,[],label+' axe inconclusivo não conta como aprovação '+width);
 return {violations:0,rechecked:report.rechecks.length,unresolved:0};
}
async function main(){
 fs.mkdirSync(OUT,{recursive:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+server.address().port+'/';
 browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 for(const width of [320,360,390,430,1280]){
  const config={viewport:{width,height:900},hasTouch:width<=430,reducedMotion:'reduce',timezoneId:'America/Sao_Paulo',acceptDownloads:true};
  const old=await browser.newContext(config),op=await old.newPage();
  await op.route(url=>url.pathname.endsWith('/revisao-inteligente.js'),r=>r.fulfill({status:200,contentType:'application/javascript',body:baseline}));
  await open(op,base);
  const oldY=await op.getByRole('button',{name:'Iniciar seleção automática',exact:true}).evaluate(x=>x.getBoundingClientRect().y);
  await op.evaluate(()=>AGUReview.go('flashcard'));
  const expected=await op.locator('.question-title').last().innerText();await old.close();
  const ctx=await browser.newContext(config),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());
  await open(p,base);assert.match(await p.locator('.agu-deck-count').innerText(),/53 cartões · 12 baralhos/);
  const before=await stored(p),button=p.locator('#agu-review-now'),y=await button.evaluate(x=>x.getBoundingClientRect().y);
  assert.ok(y>0&&y+44<900,'atalho na primeira tela '+width+' y='+y);assert.ok(y<oldY);
  assert.ok(await button.evaluate(x=>!!(x.compareDocumentPosition(document.getElementById('agu-deck-filter-discipline'))&Node.DOCUMENT_POSITION_FOLLOWING)));
  const scans={entry:await accessibility(p,'entrada',width)};
  await p.screenshot({path:path.join(OUT,'entrada-'+width+'.png')});
  if(width<=430)await button.tap();else await button.press('Enter');
  assert.equal(await p.locator('#agu-review-active .question-title').innerText(),expected,'mesma seleção do motor original');
  assert.deepEqual(await stored(p),before,'abrir revisão não grava tentativas nem cria sessão');
  assert.equal(await p.locator('#agu-review-active .feedback').count(),0);
  if(width===1280)assert.match(await p.evaluate(()=>document.activeElement.outerHTML),/AGUReview.reveal/);
  const front=p.locator('#agu-review-active button').filter({hasText:'Mostrar resposta'});
  assert.ok(await front.evaluate(x=>{const r=x.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight}),'cartão trazido à tela');
  await front.press('Space');assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),0);
  assert.match(await p.evaluate(()=>document.activeElement.outerHTML),/AGUReview.rate\('errei'/);
  scans.answer=await accessibility(p,'resposta',width);
  await p.getByRole('button',{name:'Errei',exact:true}).press('Enter');
  const attempt=await p.evaluate(()=>AGUReview.attemptsInfo().at(-1));assert.equal(attempt.rating,'errei');
  const info=await p.evaluate(({id,key})=>JSON.parse(localStorage.getItem(key)).cards[id],{id:attempt.itemId,key:KEY});
  assert.equal(info.stage,0);assert.equal(info.errors,1);assert.ok(info.due>new Date().toLocaleDateString('sv-SE',{timeZone:'America/Sao_Paulo'}));
  assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),1);
  await p.locator('#agu-review-active button').filter({hasText:'Mostrar resposta'}).press('Enter');
  await p.getByRole('button',{name:'Lembrei',exact:true}).press('Enter');
  assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),2);
  // Escolha de assunto e retomada persistida usam a sessão original de baralho.
  await p.locator('#agu-deck-filter-discipline').selectOption('CON');await p.locator('#agu-deck-filter-topic').fill('CON-02');await p.locator('#agu-deck-filter-topic').press('Tab');
  const tile=p.locator('.agu-deck-grid article');assert.equal(await tile.count(),1);
  await tile.getByRole('button',{name:'Estudar baralho',exact:true}).press('Enter');
  await p.locator('#agu-deck-face').press('Enter');await p.getByRole('button',{name:'Difícil',exact:true}).press('Enter');
  const session=await p.evaluate(()=>AGUReview.deckSession());assert.equal(session.index,1);
  await p.getByRole('button',{name:'Pausar e voltar',exact:true}).press('Enter');assert.equal(await p.locator('#agu-review-now').count(),0,'retomada tem prioridade');
  await p.reload();await p.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();await p.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  await p.getByRole('button',{name:'Retomar sessão',exact:true}).press('Space');
  assert.deepEqual(await p.evaluate(()=>AGUReview.deckSession()),session);assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),3);
  assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-deck-face');
  scans.resume=await accessibility(p,'retomada',width);
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'sem overflow '+width);
  // Backup real por download e restauração em outro perfil, preservando registro existente.
  const review=await p.evaluate(k=>localStorage.getItem(k),KEY);
  await p.getByRole('button',{name:'Evolução',exact:true}).click();await p.getByRole('button',{name:'Dados e backup',exact:true}).click();
  const download=p.waitForEvent('download');await p.getByRole('button',{name:'Exportar cópia completa',exact:true}).click();
  const bytes=fs.readFileSync(await (await download).path());
  const restored=await browser.newContext(config),rp=await restored.newPage();rp.on('dialog',d=>d.accept());await rp.goto(base);
  const existingPlan=JSON.stringify({schema:1,settings:{dailyMinutes:[15,15,15,15,15,15,0]},weeks:{},created:'2026-11-01T00:00:00Z'});
  await rp.evaluate(({key,value})=>localStorage.setItem(key,value),{key:PLAN,value:existingPlan});
  await rp.getByRole('button',{name:'Evolução',exact:true}).click();await rp.getByRole('button',{name:'Dados e backup',exact:true}).click();
  await rp.locator('#agu-s20-backup-file').setInputFiles({name:'aud-ux-001-sintetico.json',mimeType:'application/json',buffer:bytes});
  await rp.waitForFunction(k=>!!localStorage.getItem(k),KEY);assert.equal(await rp.evaluate(k=>localStorage.getItem(k),KEY),review);
  assert.equal(await rp.evaluate(k=>localStorage.getItem(k),PLAN),existingPlan);
  await rp.reload();await rp.evaluate(()=>setView('review'));await rp.getByRole('button',{name:'Retomar sessão',exact:true}).press('Enter');
  assert.deepEqual(await rp.evaluate(()=>AGUReview.deckSession()),session);
  assert.equal(await rp.evaluate(()=>AGUBackup20.importMissing(AGUBackup20.capture()).added),0);
  await restored.close();
  // Ausência de vencidos/novos não libera cartões futuros ou escreve dados.
  const cards=await p.evaluate(()=>AGUReview.searchCards().map(x=>x.id));
  const future={schema:'agu-review-v1',attempts:[],cards:Object.fromEntries(cards.map(id=>[id,{stage:3,seen:1,due:'2099-12-31',errors:0,ease:'lembrei'}])),created:'2026-11-01T00:00:00Z'};
  await p.evaluate(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key:KEY,value:future});
  await p.reload();await p.evaluate(()=>setView('review'));assert.ok(await p.locator('#agu-review-now').isDisabled());
  const prior=await stored(p);assert.equal(await p.evaluate(()=>AGUReview.reviewNow(true)),false);assert.deepEqual(await stored(p),prior);
  // Uma revisão vencida com erros e um histórico sem agenda seguem elegíveis pelo motor original.
  const first=await p.evaluate(()=>AGUReview.searchCards()[0]);
  const overdue=JSON.parse(JSON.stringify(future));overdue.cards[first.id]={stage:1,seen:2,due:'2000-01-01',errors:3,ease:'errei'};
  await p.evaluate(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key:KEY,value:overdue});
  await p.reload();await p.evaluate(()=>setView('review'));const overdueBefore=await stored(p);
  await p.locator('#agu-review-now').press('Enter');assert.equal(await p.locator('#agu-review-active .question-title').innerText(),first.front);assert.deepEqual(await stored(p),overdueBefore);
  // AUD-UX-005: um prazo anterior e um de hoje, sem incluir os demais futuros.
  const localToday=await p.evaluate(()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')});
  const mixed=JSON.parse(JSON.stringify(overdue));const second=cards.find(id=>id!==first.id);assert.ok(second);
  mixed.cards[second]={stage:1,seen:1,due:localToday,errors:0,ease:'lembrei'};
  await p.evaluate(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key:KEY,value:mixed});
  await p.reload();await p.evaluate(()=>setView('review'));const mixedBefore=await stored(p);
  // O card da métrica é o único que contém diretamente o rótulo.
  const dueLabel=p.getByText('Revisões com prazo até hoje',{exact:true});
  assert.equal(await dueLabel.count(),1);assert.equal(await dueLabel.locator('..').locator('.metric').innerText(),'2');
  assert.equal(await p.evaluate(()=>AGUReview.summary().due),2);
  assert.equal(await dueLabel.locator('..').getByText('Cartões e referências oficiais com data; não é o tamanho da fila.',{exact:true}).count(),1);
  assert.deepEqual(await stored(p),mixedBefore);
  console.log('AUD_UX_005_PRAZOS_OK',width);
  const imported=JSON.parse(JSON.stringify(future));delete imported.cards[first.id];
  imported.attempts=[{id:'rv-aud-ux-001-imported',itemId:first.id,kind:'flashcard',code:first.code,at:'2026-11-10T10:00:00Z',rating:'dificil',selected:null,correct:null,sourceStatus:'B_pendente_revisao_independente',due:'2026-11-11',stage:0,origin:'flashcard_autoral'}];
  await p.evaluate(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key:KEY,value:imported});
  await p.reload();await p.evaluate(()=>setView('review'));assert.equal(await p.evaluate(()=>AGUReview.summary().newCards),0);
  const importedBefore=await stored(p);await p.locator('#agu-review-now').press('Enter');
  assert.equal(await p.locator('#agu-review-active .question-title').innerText(),first.front);assert.deepEqual(await stored(p),importedBefore);
  assert.equal(await p.evaluate(id=>AGUReview.reviewInfo(id).due,first.id),null,'tentativa importada não recria vencimento');
  assert.deepEqual(errors,[]);results.push({width,baselineReviewY:oldY,quickActionY:y,sameQueue:true,noWriteOnOpen:true,ratings:3,errorIntervalPreserved:true,subjectSelection:true,sessionReload:true,backupRoundTrip:true,preservedExistingPlan:true,futureOnlyBlocked:true,touch:width<=430,keyboard:true,scans});await ctx.close();
 }
 console.log('AUD_UX_001_BROWSER_OK',JSON.stringify({browser:browser.version(),viewports:results.map(x=>x.width),seconds:(Date.now()-started)/1000}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{
 fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({browser:browser?.version(),axe:axe.version,elapsedSeconds:(Date.now()-started)/1000,results},null,2)+'\n');
 await browser?.close();server.close();
});
