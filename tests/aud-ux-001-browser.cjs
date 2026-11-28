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
  const prior=await stored(p);assert.equal(await p.locator('#agu-deck-suggested').count(),0);assert.equal(await p.evaluate(()=>AGUReview.deckSuggested(true)),false);assert.equal(await p.evaluate(()=>AGUReview.reviewNow(true)),false);assert.deepEqual(await stored(p),prior);
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
  // AUD-UX-006: reprodução no código da base exata e jornada com histórico sintético.
  const old006=await browser.newContext(config),p006=await old006.newPage();
  await p006.route(url=>url.pathname.endsWith('/revisao-inteligente.js'),r=>r.fulfill({status:200,contentType:'application/javascript',body:require('./aud-ux-006-legado.cjs')(current)}));
  await open(p006,base);assert.equal(await p006.locator('#agu-deck-suggested,#agu-deck-difficulties').count(),0);
  await p006.locator('#agu-deck-options > summary').press('Enter');assert.equal(await p006.locator('#agu-deck-filter-status option[value=dificuldades]').count(),0);await old006.close();
  const groups=await p.evaluate(()=>AGUReview.deckList().map(d=>({code:d.code,ids:d.cards.map(c=>c.id)})));
  const con=groups.find(d=>d.code==='CON-02'),seg=groups.find(d=>d.code==='SEG-01'),imp=groups.find(d=>d.code==='ADM-06');
  const rec=seg.ids[0],hard=con.ids[0],corrected=con.ids[1],importOnly=imp.ids[0];
  const fixture=JSON.parse(JSON.stringify(future));delete fixture.cards[importOnly];
  fixture.cards[rec]={stage:1,seen:2,due:'2000-01-01',errors:99,ease:'lembrei'};
  fixture.cards[hard]={stage:1,seen:1,due:'2099-12-31',errors:0,ease:'dificil'};
  const attempt006=(id,code,grade,day,n)=>({id:'rv-aud006-'+n,itemId:id,kind:'flashcard',code,at:'2026-11-'+day+'T10:00:00Z',rating:grade,selected:null,correct:null,sourceStatus:'B_pendente_revisao_independente',due:'2026-11-30',stage:0,origin:'flashcard_autoral'});
  fixture.attempts=[attempt006(hard,con.code,'dificil','24',1),attempt006(corrected,con.code,'lembrei','24',2),attempt006(importOnly,imp.code,'errei','23',3),attempt006(corrected,con.code,'errei','10',4)];
  await p.evaluate(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key:KEY,value:fixture});
  await p.reload();await p.evaluate(()=>setView('review'));const raw006=await p.evaluate(k=>localStorage.getItem(k),KEY);
  assert.match(await p.locator('#agu-deck-suggested').locator('..').innerText(),/SEG-01/);
  const bundle006=await p.evaluate(()=>AGUBackup20.capture());assert.equal(bundle006.items[KEY],raw006);
  if(width<=430)await p.locator('#agu-deck-suggested').tap();else await p.locator('#agu-deck-suggested').press('Enter');
  const suggestedSession=await p.evaluate(()=>AGUReview.deckSession());assert.equal(suggestedSession.code,'SEG-01');assert.deepEqual(suggestedSession.order,[rec]);
  if(width>430)assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-deck-face');
  const after006=await p.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);assert.deepEqual(after006.attempts,fixture.attempts);assert.deepEqual(after006.cards,fixture.cards);
  scans.suggested=await accessibility(p,'sugerido',width);
  await p.getByRole('button',{name:'Pausar e voltar',exact:true}).press('Enter');await p.reload();await p.evaluate(()=>setView('review'));
  assert.equal(await p.locator('#agu-deck-suggested').count(),0);assert.deepEqual(await p.evaluate(()=>AGUReview.deckSession()),suggestedSession);
  const restored006=await browser.newContext(config),t006=await restored006.newPage();t006.on('pageerror',e=>errors.push(e.message));await open(t006,base);
  await t006.evaluate(b=>AGUBackup20.importMissing(b),bundle006);await t006.reload();await t006.evaluate(()=>setView('review'));
  assert.equal(await t006.evaluate(k=>localStorage.getItem(k),KEY),raw006);
  const before006=await stored(t006);await t006.locator('#agu-deck-difficulties').press('Enter');
  assert.equal(await t006.locator('#agu-deck-filter-status').inputValue(),'dificuldades');assert.equal(await t006.evaluate(()=>document.activeElement.id),'agu-deck-filter-status');
  assert.equal(await t006.locator('.agu-deck-grid article').count(),2);assert.match(await t006.locator('.agu-deck-filter-result').innerText(),/2 cartões selecionáveis/);
  assert.deepEqual(await stored(t006),before006);assert.equal(await t006.evaluate(id=>AGUReview.reviewInfo(id).due,importOnly),null);
  scans.difficulties=await accessibility(t006,'dificuldades',width);
  await t006.locator('#agu-deck-filter-topic').fill('CON-02');await t006.locator('#agu-deck-filter-topic').press('Tab');
  await t006.locator('.agu-deck-grid article button').press('Enter');assert.deepEqual((await t006.evaluate(()=>AGUReview.deckSession())).order,[hard]);
  await t006.locator('#agu-deck-face').press('Enter');await t006.getByRole('button',{name:'Lembrei',exact:true}).press('Enter');
  assert.equal(await t006.evaluate(()=>AGUReview.attemptsInfo().length),fixture.attempts.length+1);
  await t006.getByRole('button',{name:'Voltar à biblioteca',exact:true}).press('Enter');await t006.locator('#agu-deck-difficulties').press('Enter');
  assert.equal(await t006.locator('.agu-deck-grid article').count(),1);assert.match(await t006.locator('.agu-deck-grid article').innerText(),/ADM-06/);
  await t006.reload();await t006.evaluate(()=>setView('review'));await t006.locator('#agu-deck-difficulties').press('Enter');assert.equal(await t006.locator('.agu-deck-grid article').count(),1);
  await restored006.close();console.log('AUD_UX_006_FC04_RV01_OK',width);
  // AUD-UX-007: reproduzir a ausência na base, comparar com a fila legada real.
  const old007=await browser.newContext(config),p007=await old007.newPage();
  await p007.route(url=>url.pathname.endsWith('/revisao-inteligente.js'),r=>r.fulfill({status:200,contentType:'application/javascript',body:require('./aud-ux-007-legado.cjs')(current)}));
  await open(p007,base);assert.equal(await p007.locator('#agu-deck-short').count(),0);
  const chosen007=groups.slice(0,6).map(g=>g.ids[0]);assert.equal(chosen007.length,6);
  const seed007=JSON.parse(JSON.stringify(future));
  chosen007.forEach((id,i)=>{seed007.cards[id]={stage:1,seen:1,due:'2000-01-01',errors:1000-i*100,ease:'errei'}});
  await p007.evaluate(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key:KEY,value:seed007});
  await p007.reload();await p007.evaluate(()=>setView('review'));
  await p007.locator('#agu-review-now').press('Enter');
  for(let i=0;i<5;i++){
   await p007.locator('#agu-review-active button').filter({hasText:'Mostrar resposta'}).press('Enter');
   await p007.getByRole('button',{name:'Lembrei',exact:true}).press('Enter');
  }
  const order007=await p007.evaluate(()=>AGUReview.attemptsInfo().map(a=>a.itemId));assert.deepEqual(order007,chosen007.slice(0,5));await old007.close();
  // Fila vazia não escreve e sessão curta não substitui uma sessão interrompida.
  assert.equal(await p.evaluate(()=>AGUReview.deckShortStart(true)),false);
  await p.evaluate(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key:KEY,value:future});
  await p.reload();await p.evaluate(()=>setView('review'));
  const empty007=await stored(p);assert.ok(await p.locator('#agu-deck-short').isDisabled());assert.equal(await p.evaluate(()=>AGUReview.deckShortStart(true)),false);assert.deepEqual(await stored(p),empty007);
  await p.evaluate(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key:KEY,value:seed007});
  await p.reload();await p.evaluate(()=>setView('review'));
  scans.shortEntry=await accessibility(p,'curta-entrada',width);
  if(width<=430)await p.locator('#agu-deck-short').tap();else await p.locator('#agu-deck-short').press('Enter');
  const start007=await p.evaluate(()=>AGUReview.deckSession());assert.equal(start007.code,'fila-geral');assert.deepEqual(start007.order,order007);
  const state007=await p.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);assert.deepEqual(state007.attempts,[]);assert.deepEqual(state007.cards,seed007.cards);
  if(width>430)assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-deck-face');
  scans.shortFront=await accessibility(p,'curta-frente',width);
  await p.locator('#agu-deck-face').press('Space');assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),0);scans.shortBack=await accessibility(p,'curta-verso',width);
  await p.getByRole('button',{name:'Errei',exact:true}).press('Enter');
  await p.locator('#agu-deck-face').press('Enter');
  const paused007=await p.evaluate(()=>AGUReview.deckSession());assert.equal(paused007.index,1);assert.equal(paused007.revealed,true);
  await p.getByRole('button',{name:'Pausar e voltar',exact:true}).press('Enter');assert.equal(await p.locator('#agu-deck-short').count(),0);
  assert.equal(await p.evaluate(()=>AGUReview.deckShortStart(true)),false);
  await p.reload();await p.evaluate(()=>setView('review'));
  assert.match(await p.locator('.agu-deck-resume').innerText(),/Sessão curta de revisão/);
  const bundle007=await p.evaluate(()=>AGUBackup20.capture());
  await p.locator('#agu-deck-resume').press('Enter');assert.deepEqual(await p.evaluate(()=>AGUReview.deckSession()),paused007);
  assert.equal(await p.locator('.agu-deck-back').count(),1);assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-deck-rating-errei');
  const restore007=await browser.newContext(config),rp007=await restore007.newPage();rp007.on('pageerror',e=>errors.push(e.message));await open(rp007,base);
  await rp007.evaluate(b=>AGUBackup20.importMissing(b),bundle007);await rp007.reload();await rp007.evaluate(()=>setView('review'));
  await rp007.locator('#agu-deck-resume').press('Enter');assert.deepEqual(await rp007.evaluate(()=>AGUReview.deckSession()),paused007);
  assert.equal(await rp007.locator('.agu-deck-back').count(),1);
  await rp007.getByRole('button',{name:'← Anterior',exact:true}).press('Enter');
  assert.match(await rp007.locator('.agu-deck-rated').innerText(),/não será registrada novamente/);
  assert.equal(await rp007.evaluate(()=>AGUReview.rate('facil',true)),false);
  assert.equal(await rp007.evaluate(()=>AGUReview.attemptsInfo().length),1);
  await rp007.locator('#agu-deck-next').press('Enter');await rp007.locator('#agu-deck-face').press('Enter');
  for(let i=1;i<5;i++){
   await rp007.getByRole('button',{name:'Lembrei',exact:true}).press('Enter');
   if(i<4)await rp007.locator('#agu-deck-face').press('Enter');
  }
  assert.equal(await rp007.locator('#agu-deck-done').innerText(),'Sessão curta concluída');
  const done007=await rp007.evaluate(()=>AGUReview.deckSession());assert.equal(done007.status,'concluida');assert.equal(Object.keys(done007.ratings).length,5);
  assert.deepEqual(await rp007.evaluate(()=>AGUReview.attemptsInfo().map(a=>a.itemId)),order007);
  assert.equal(await rp007.evaluate(id=>AGUReview.reviewInfo(id).due,chosen007[5]),'2000-01-01');
  assert.equal(await rp007.evaluate(id=>AGUReview.reviewInfo(id).rating,order007[0]),'errei');
  scans.shortDone=await accessibility(rp007,'curta-concluida',width);
  assert.ok(await rp007.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
  await rp007.getByRole('button',{name:'Iniciar próxima sessão disponível',exact:true}).press('Enter');
  assert.deepEqual((await rp007.evaluate(()=>AGUReview.deckSession())).order,[chosen007[5]]);
  assert.equal(await rp007.evaluate(()=>AGUReview.attemptsInfo().length),5);
  await rp007.locator('#agu-deck-face').press('Enter');await rp007.getByRole('button',{name:'Lembrei',exact:true}).press('Enter');
  assert.ok(await rp007.getByRole('button',{name:'Iniciar próxima sessão disponível',exact:true}).isDisabled());
  await restore007.close();console.log('AUD_UX_007_FC06_RV02_OK',width);
  // AUD-UX-008: reprodução na base publicada e alternância sem avaliação.
  const old008=await browser.newContext(config),p008=await old008.newPage();
  await p008.route(url=>url.pathname.endsWith('/revisao-inteligente.js'),r=>r.fulfill({status:200,contentType:'application/javascript',body:require('./aud-ux-008-legado.cjs')(current)}));
  await open(p008,base);await p008.evaluate(()=>AGUReview.deckStart('CON-02'));
  await p008.locator('#agu-deck-face').press('Enter');
  assert.equal(await p008.locator('.agu-deck-back').count(),1);
  assert.equal(await p008.locator('#agu-deck-hide').count(),0);
  assert.equal(await p008.evaluate(()=>typeof AGUReview.deckHide),'undefined');
  assert.equal(await p008.locator('#agu-deck-face').count(),0);await old008.close();
  for(const mode of ['baralho','curta']){
   const cx008=await browser.newContext(config),q008=await cx008.newPage();q008.on('pageerror',e=>errors.push(e.message));await open(q008,base);
   if(mode==='curta'){
    await q008.evaluate(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key:KEY,value:seed007});await q008.reload();await q008.evaluate(()=>setView('review'));
    await q008.locator('#agu-deck-short').press('Enter');
   }else{
    await q008.locator('#agu-deck-filter-topic').fill('CON-02');await q008.locator('#agu-deck-filter-topic').press('Tab');
    await q008.locator('.agu-deck-grid article button').press('Enter');
   }
   const start008=await q008.evaluate(()=>AGUReview.deckSession());assert.ok(start008.order.length>=2);
   assert.equal(await q008.evaluate(()=>AGUReview.deckHide(true)),false);
   const front008=await stored(q008);
   await q008.locator('#agu-deck-face').press('Space');
   assert.equal(await q008.locator('#agu-deck-hide').count(),1);
   assert.equal(await q008.evaluate(()=>document.activeElement.id),'agu-deck-rating-errei');
   assert.ok(await q008.locator('#agu-deck-hide').evaluate(n=>n.getBoundingClientRect().height>=44));
   scans['ocultar-'+mode+'-verso']=await accessibility(q008,'ocultar-'+mode+'-verso',width);
   if(width<=430)await q008.locator('#agu-deck-hide').tap();else await q008.locator('#agu-deck-hide').press('Enter');
   assert.equal(await q008.locator('.agu-deck-back').count(),0);
   assert.equal(await q008.locator('#agu-deck-rating-errei').count(),0);
   assert.deepEqual(await stored(q008),front008,'alternar sem alterar registro além da face');
   if(width>430)assert.equal(await q008.evaluate(()=>document.activeElement.id),'agu-deck-face');
   scans['ocultar-'+mode+'-frente']=await accessibility(q008,'ocultar-'+mode+'-frente',width);
   await q008.locator('#agu-deck-face').press('Enter');await q008.locator('#agu-deck-hide').press('Space');
   assert.equal(await q008.evaluate(()=>document.activeElement.id),'agu-deck-face');
   assert.deepEqual(await stored(q008),front008);
   await q008.locator('#agu-deck-face').press('Enter');await q008.getByRole('button',{name:'Lembrei',exact:true}).press('Enter');
   await q008.getByRole('button',{name:'← Anterior',exact:true}).press('Enter');
   assert.equal(await q008.locator('.agu-deck-back').count(),1);
   const rated008=await q008.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);
   assert.equal(rated008.attempts.length,1);assert.equal(rated008.librarySession.index,0);
   await q008.locator('#agu-deck-hide').press('Enter');
   const hidden008={...rated008,librarySession:{...rated008.librarySession,revealed:false}};
   assert.deepEqual(await q008.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY),hidden008);
   assert.equal(await q008.locator('.agu-deck-rated').count(),1);assert.equal(await q008.locator('#agu-deck-rating-errei').count(),0);
   scans['ocultar-'+mode+'-avaliado']=await accessibility(q008,'ocultar-'+mode+'-avaliado',width);
   const bundle008=await q008.evaluate(()=>AGUBackup20.capture());
   await q008.getByRole('button',{name:'Pausar e voltar',exact:true}).press('Enter');await q008.reload();await q008.evaluate(()=>setView('review'));
   await q008.locator('#agu-deck-resume').press('Enter');
   assert.equal(await q008.locator('#agu-deck-face').count(),1);assert.equal(await q008.evaluate(()=>document.activeElement.id),'agu-deck-face');
   assert.deepEqual(await q008.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY),hidden008);
   const restore008=await browser.newContext(config),z008=await restore008.newPage();z008.on('pageerror',e=>errors.push(e.message));await open(z008,base);
   await z008.evaluate(b=>AGUBackup20.importMissing(b),bundle008);await z008.reload();await z008.evaluate(()=>setView('review'));
   await z008.locator('#agu-deck-resume').press('Enter');
   assert.deepEqual(await z008.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY),hidden008);
   await z008.locator('#agu-deck-face').press('Enter');assert.equal(await z008.evaluate(()=>document.activeElement.id),'agu-deck-hide');
   assert.equal(await z008.locator('#agu-deck-rating-errei').count(),0);assert.equal(await z008.evaluate(()=>AGUReview.rate('errei',true)),false);
   assert.deepEqual(await z008.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY),rated008);
   scans['ocultar-'+mode+'-reexibido']=await accessibility(z008,'ocultar-'+mode+'-reexibido',width);
   assert.ok(await z008.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
   await z008.locator('#agu-deck-hide').press('Enter');await z008.locator('#agu-deck-next').press('Enter');
   assert.equal((await z008.evaluate(()=>AGUReview.deckSession())).index,1);
   assert.equal(await z008.evaluate(()=>AGUReview.attemptsInfo().length),1);
   await restore008.close();await cx008.close();
  }
  console.log('AUD_UX_008_FC07_OK',width);
  // AUD-UX-009: reproduzir a lacuna, cruzar somente identidades documentadas.
  const histKey='agu_quiz_mvp1_2026',vigKey='agu_gov_003_treino_vigente_v1';
  const qid009=n=>'AGU-2015-187AGU-001-07-Q'+String(n).padStart(3,'0');
  const h009=(n,selected,correct,i)=>({id:'hist009-'+i,question:qid009(n),topic:'OUT/Questões oficiais',curricular_id:null,date:'2026-11-2'+i+'T10:00:00Z',selected,correct,origin:'oficial_cebraspe_2015',originalQuestionNumber:n});
  const v009=(n,selected,correct,i)=>({id:'vig009-'+i,question:qid009(n),selected,correct,date:'2026-11-2'+i+'T11:00:00Z'});
  const hist009={version:1,created:'2026-11-20T00:00:00Z',topic:{},answers:[h009(7,'E',false,1),h009(22,'C',false,2),h009(22,'E',true,3),h009(15,'E',false,4)],sessions:[],reviews:[],notebook:[],seed:false};
  const vig009={schema:1,attempts:[v009(7,'E',false,1),v009(22,'C',false,2),v009(9,'C',false,3),v009(6,'E',true,4)]};
  const seed009=async q=>{await q.evaluate(({histKey,vigKey,hist009,vig009})=>{localStorage.setItem(histKey,JSON.stringify(hist009));localStorage.setItem(vigKey,JSON.stringify(vig009))},{histKey,vigKey,hist009,vig009});await q.reload();await q.evaluate(()=>setView('review'))};
  const old009=await browser.newContext(config),p009=await old009.newPage();
  await p009.route(url=>url.pathname.endsWith('/revisao-inteligente.js'),r=>r.fulfill({status:200,contentType:'application/javascript',body:require('./aud-ux-009-legado.cjs')(current)}));
  await open(p009,base);await seed009(p009);assert.equal(await p009.locator('#agu-context-errors').count(),0);await old009.close();
  const cx009=await browser.newContext(config),q009=await cx009.newPage();q009.on('pageerror',e=>errors.push(e.message));await open(q009,base);
  assert.equal(await q009.locator('#agu-context-errors').count(),0);
  await seed009(q009);
  const panel009=q009.locator('#agu-context-errors');
  assert.equal(await panel009.locator('article').count(),2);
  assert.match(await panel009.locator('article').nth(0).innerText(),/Q7 · ADM-27/);
  assert.match(await panel009.locator('article').nth(0).innerText(),/Erro no histórico da prova · Erro no treino vigente/);
  assert.match(await panel009.locator('article').nth(1).innerText(),/Q22 · ADM-58/);
  assert.doesNotMatch(await panel009.locator('article').nth(1).innerText(),/Erro no histórico da prova/);
  assert.doesNotMatch(await panel009.innerText(),/Q9 ·|Q15 ·|Q6 ·/);
  const before009=await stored(q009);
  assert.equal(await q009.evaluate(()=>AGUReview.contextStudy('ri-adm-01',true)),false);
  scans.contextErrors=await accessibility(q009,'contexto-erros',width);
  if(width<=430)await panel009.locator('button').first().tap();else await panel009.locator('button').first().press('Enter');
  assert.match(await q009.locator('#agu-review-active .question-title').innerText(),/Congresso Nacional/);
  assert.equal(await q009.locator('#agu-review-active a[href*="questoes-vigentes"]').count(),0);
  assert.deepEqual(await stored(q009),before009);
  await q009.locator('#agu-review-active button').filter({hasText:'Mostrar resposta'}).press('Enter');
  const related009=q009.locator('#agu-review-active details').filter({hasText:'Questão vigente relacionada'});
  await related009.locator('summary').press('Enter');
  const link009=related009.getByRole('link');
  assert.equal(await link009.getAttribute('href'),'questoes-vigentes.html?questao='+qid009(7));
  assert.equal(await link009.getAttribute('target'),'_blank');
  scans.contextBack=await accessibility(q009,'contexto-verso',width);
  const popupPromise=q009.waitForEvent('popup');await link009.press('Enter');const popup=await popupPromise;
  await popup.locator('#vig-title').waitFor();assert.match(await popup.locator('#vig-title').innerText(),/Questão 7/);await popup.close();
  assert.deepEqual(await stored(q009),before009);
  await q009.getByRole('button',{name:'Lembrei',exact:true}).press('Enter');
  const after009=await stored(q009);assert.equal(after009[histKey],before009[histKey]);assert.equal(after009[vigKey],before009[vigKey]);
  assert.equal(await q009.evaluate(()=>AGUReview.attemptsInfo().length),1);
  assert.equal((await q009.evaluate(()=>AGUReview.attemptsInfo()))[0].itemId,'aud02-2015-flc-03-007');
  await q009.evaluate(()=>{AGUReview.deckStart('CON-02');AGUReview.deckPause()});
  const interrupted009=await stored(q009);
  assert.ok(await panel009.locator('button').first().isDisabled());
  assert.equal(await q009.evaluate(()=>AGUReview.contextStudy('aud02-2015-flc-03-007',true)),false);
  assert.deepEqual(await stored(q009),interrupted009);
  scans.contextBlocked=await accessibility(q009,'contexto-pausado',width);
  assert.ok(await q009.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
  // A revogação invalida o histórico vigente inteiro pelo contrato original.
  await q009.evaluate(()=>{AGUCurrentQuestions.items.find(q=>q.n===7).status='pendente';render()});
  assert.equal(await q009.evaluate(k=>AGUVigenteContract.validHistory(JSON.parse(localStorage.getItem(k)),AGUCurrentQuestions.items),vigKey),false);
  assert.equal(await panel009.count(),0,'histórico inválido não alimenta o painel; Q7 histórico também inelegível');
  assert.deepEqual(await stored(q009),interrupted009,'portão não modifica histórico ou sessão');
  // Fixture sintética independente com histórico válido de Q22, sem tentativa da questão revogada.
  const valid009={schema:1,attempts:vig009.attempts.filter(a=>a.question===qid009(22))};
  await q009.evaluate(({key,value})=>{localStorage.setItem(key,JSON.stringify(value));render()},{key:vigKey,value:valid009});
  assert.equal(await q009.evaluate(k=>AGUVigenteContract.validHistory(JSON.parse(localStorage.getItem(k)),AGUCurrentQuestions.items),vigKey),true);
  assert.equal(await panel009.locator('article').count(),1);assert.doesNotMatch(await panel009.innerText(),/Q7 ·/);
  assert.match(await panel009.innerText(),/Q22 · ADM-58/);
  await cx009.close();console.log('AUD_UX_009_FC08_QT06_OK',width);
  assert.deepEqual(errors,[]);results.push({width,baselineReviewY:oldY,quickActionY:y,sameQueue:true,noWriteOnOpen:true,ratings:3,errorIntervalPreserved:true,subjectSelection:true,sessionReload:true,backupRoundTrip:true,preservedExistingPlan:true,futureOnlyBlocked:true,touch:width<=430,keyboard:true,scans});await ctx.close();
 }
 console.log('AUD_UX_001_BROWSER_OK',JSON.stringify({browser:browser.version(),viewports:results.map(x=>x.width),seconds:(Date.now()-started)/1000}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{
 fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({browser:browser?.version(),axe:axe.version,elapsedSeconds:(Date.now()-started)/1000,results},null,2)+'\n');
 await browser?.close();server.close();
});
