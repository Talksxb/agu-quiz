/* LEG11 — jornada sintética de flashcard real para a lista única do caderno físico. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-leg11');
const READER='agu_leitor_juridico_s13_v1',REVIEW='agu_quiz_revisao_inteligente_v1';
const server=http.createServer((req,res)=>{
 const request=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html',file=path.resolve(ROOT,request);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('forbidden')}
 fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'content-type':file.endsWith('.html')?'text/html;charset=utf-8':file.endsWith('.css')?'text/css;charset=utf-8':'application/javascript;charset=utf-8','cache-control':'no-store'});res.end(err?'missing':data)});
});
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/',results=[];
 fs.mkdirSync(OUT,{recursive:true});
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:900},hasTouch:width<=430,reducedMotion:'reduce',acceptDownloads:true}),p=await ctx.newPage(),errors=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());
  await p.addInitScript(()=>{
   const R='agu_leitor_juridico_s13_v1',V='agu_quiz_revisao_inteligente_v1';
   if(!localStorage.getItem(R))localStorage.setItem(R,JSON.stringify({article:'L9784:art50',unit:'L9784:art50:p1',tab:'para_caderno',mobile:'related',notes:{'L9784:art50:I':'Nota antiga sintética'},
    forNotebook:[
     {id:'pc-leg11-oldreader1',lawId:'L4717',articleId:'L4717:art2',unitId:'L4717:art2:pu:e',topic:null,origin:'leitor',prompt:'Motivo versus finalidade?',createdAt:'2026-11-14T20:00:00.000Z',status:'pendente'},
     {id:'pc-leg11-oldstudy01',lawId:null,articleId:null,unitId:null,deviceId:'L9784:art12:caput',sessionId:'ags-sintetica-001',topic:'ADM-06',origin:'estudo_integrado',prompt:'Delegação e avocação?',createdAt:'2026-11-14T20:00:00.000Z',status:'anotado'},
     {id:'pc-leg11-oldquestion1',lawId:null,articleId:null,unitId:null,questionId:'of-2015-adv-006',questionLabel:'AGU 2015 · Q6 · 187AGU_001_07',topic:'ADM-17',origin:'questao_verificada',prompt:'Motivação por remissão?',createdAt:'2026-11-14T20:00:00.000Z',status:'dispensado'}
    ]}));
   if(!localStorage.getItem(V))localStorage.setItem(V,JSON.stringify({schema:'agu-review-v1',attempts:[],cards:{'ri-adm-01':{stage:1,due:'2000-01-01',seen:1,errors:1}},created:'2026-11-14T20:00:00.000Z'}));
  });
  await p.goto(origin,{waitUntil:'load'});
  await p.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  await p.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  assert.match(await p.locator('#agu-deck-library').innerText(),/53 cartões · 12 baralhos/);
  const deck=p.locator('.agu-deck-grid article').filter({has:p.locator('.agu-deck-code:text-is("ADM-06")')});
  await deck.getByRole('button',{name:'Estudar baralho'}).click();
  const session=await p.evaluate(()=>AGUReview.deckSession());assert.equal(session.status,'em_andamento');assert.equal(session.order[0],'ri-adm-01');
  assert.ok(await p.locator('#agu-deck-face').isVisible());assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),0);
  const reviewAtStart=await p.evaluate(k=>localStorage.getItem(k),REVIEW);
  const disclosure=p.locator('.agu-deck-session .agu-flash-notebook'),summary=disclosure.locator('summary');
  if(width<=430)await summary.tap();else await summary.press('Enter');
  assert.ok(await p.locator('#agu-deck-notebook-input').isVisible());
  await p.locator('#agu-deck-notebook-input').fill('Qual a diferença entre avocação e delegação?');
  await p.locator('#agu-deck-notebook-save').press('Space');
  assert.equal(await p.evaluate(()=>document.activeElement?.id),'agu-deck-notebook-status');
  assert.match(await p.locator('#agu-deck-notebook-status').innerText(),/Marcação guardada/);
  const item=await p.evaluate(()=>AGULegal.peek().forNotebook.at(-1));
  assert.match(item.id,/^pc-[a-zA-Z0-9-]{8,130}$/);assert.equal(item.origin,'flashcard_existente');assert.equal(item.cardId,'ri-adm-01');assert.equal(item.cardLabel,'Flashcard ri-adm-01 · ADM-06');assert.equal(item.topic,'ADM-06');
  assert.equal(item.status,'pendente');assert.deepEqual([item.lawId,item.articleId,item.unitId],[null,null,null]);assert.ok(Number.isFinite(Date.parse(item.createdAt)));
  assert.equal(await p.evaluate(k=>localStorage.getItem(k),REVIEW),reviewAtStart,'salvar marcação não altera sessão/revisão');
  assert.ok(await p.locator('#agu-deck-face').isVisible(),'não revela resposta');assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),0);
  // Marca sem vínculo granular comprovado é recuperável manualmente, nunca por tema inferido.
  assert.equal(await p.evaluate(()=>AGULegal.notebookSaveCard('ri-adm-05','Qual a diferença entre motivo e motivação?')),true);
  assert.equal(await p.evaluate(()=>AGULegal.peek().forNotebook.at(-1).topic),null);
  const a11y={};
  if(width===390||width===1280){
   await p.addScriptTag({content:axe.source});
   const audit=()=>p.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),passed:r.passes.map(x=>x.id)}});
   a11y.initial=await audit();assert.deepEqual(a11y.initial.violations,[]);a11y.afterScroll=[];
   for(const v of a11y.initial.incomplete)for(const targets of v.nodes){
    const selector=targets[0];if(typeof selector!=='string'||!await p.locator(selector).count())continue;
    await p.locator(selector).first().scrollIntoViewIfNeeded();
    const result=await p.evaluate(async({selector,id})=>{const r=await axe.run(document.querySelector(selector),{runOnly:{type:'rule',values:[id]}});return {selector,rule:id,violations:r.violations.length,incomplete:r.incomplete.length,passed:r.passes.map(x=>x.id)}},{selector,id:v.id});
    a11y.afterScroll.push({...result,resolution:result.incomplete===0?'reavaliado_sem_inconclusivo':'permanece_inconclusivo'});
    assert.equal(result.violations,0,'violação efetiva após rolagem '+selector);
   }
   a11y.unresolvedAfterScroll=a11y.afterScroll.filter(x=>x.incomplete>0);
   fs.writeFileSync(path.join(OUT,'axe-'+width+'.json'),JSON.stringify(a11y,null,2));
  }
  await p.screenshot({path:path.join(OUT,'flashcard-caderno-'+width+'.png')});
  // A ação antiga de abrir o Leitor permanece válida e não conclui a sessão.
  await p.getByRole('button',{name:'Para meu caderno · abrir leitor'}).press('Enter');
  assert.equal(await p.evaluate(()=>AGUReview.deckSession().index),0);
  await p.locator('#agu-caderno-filter-status').selectOption('todos');
  const list=p.locator('.agu-paper-item').filter({hasText:'Qual a diferença entre avocação'});
  assert.equal(await list.count(),1);assert.equal(await p.locator('.agu-paper-item').count(),5);
  await list.getByRole('button',{name:'Marcar como anotado'}).press('Enter');
  assert.equal(await p.evaluate(id=>AGULegal.peek().forNotebook.find(x=>x.id===id).status,item.id),'anotado');
  await list.getByRole('button',{name:'Dispensar'}).click();
  await list.getByRole('button',{name:'Manter pendente'}).press('Space');
  await list.getByRole('button',{name:'Editar'}).press('Enter');
  await p.locator('#agu-caderno-brief').fill('Qual a exceção à regra de delegação?');
  await p.locator('#agu-caderno-save').press('Enter');
  assert.equal(await p.evaluate(id=>AGULegal.peek().forNotebook.find(x=>x.id===id).id,item.id),item.id);
  await p.locator('.agu-paper-item').filter({hasText:'Qual a exceção à regra'}).getByRole('button',{name:'Abrir flashcard de origem'}).press('Enter');
  assert.ok(await p.getByText('Recuperação ativa', {exact:true}).isVisible());
  assert.equal(await p.evaluate(k=>localStorage.getItem(k),REVIEW),reviewAtStart);
  await p.evaluate(()=>{AGUReview.select('ri-adm-01');render()});
  assert.equal(await p.locator('.agu-review-notebook-item').count(),1);
  assert.doesNotMatch(await p.locator('.agu-review-notebook').innerText(),/Qual a diferença entre motivo e motivação/);
  await p.locator('.agu-review-notebook-item').getByRole('button',{name:'Abrir flashcard de origem'}).press('Enter');
  assert.ok(await p.getByRole('button',{name:/Voltar à revisão programada/}).isVisible());
  await p.getByRole('button',{name:/Voltar à revisão programada/}).press('Enter');
  assert.equal(await p.evaluate(()=>document.activeElement?.id),'agu-review-notebook-origin-'+item.id);
  await p.getByRole('button',{name:'Mostrar resposta',exact:true}).press('Enter');
  await p.getByRole('button',{name:'Lembrei',exact:true}).press('Enter');
  assert.equal(await p.evaluate(id=>AGULegal.peek().forNotebook.find(x=>x.id===id).status,item.id),'pendente','avaliar revisão não anota marcação');
  await p.reload();const after=await p.evaluate(()=>({reader:AGULegal.peek(),review:AGUReview.reviewInfo('ri-adm-01')}));
  assert.equal(after.reader.forNotebook.length,5);assert.deepEqual(after.reader.forNotebook.slice(0,3).map(x=>x.origin),['leitor','estudo_integrado','questao_verificada']);
  await p.getByRole('button',{name:'Evolução',exact:true}).click();await p.getByRole('button',{name:'Dados e backup',exact:true}).click();
  const waiting=p.waitForEvent('download');await p.getByRole('button',{name:'Exportar cópia completa'}).click();
  const download=await waiting,bytes=fs.readFileSync(await download.path()),bundle=JSON.parse(bytes.toString());
  assert.ok(Object.keys(bundle.items).length<=9);assert.ok(Object.hasOwn(bundle.items,READER));
  const fresh=await browser.newContext({viewport:{width,height:900},hasTouch:width<=430}),target=await fresh.newPage();target.on('dialog',d=>d.accept());
  await target.goto(origin,{waitUntil:'load'});await target.getByRole('button',{name:'Evolução',exact:true}).click();await target.getByRole('button',{name:'Dados e backup',exact:true}).click();
  await target.locator('#agu-s20-backup-file').setInputFiles({name:'leg11-sintetico.json',mimeType:'application/json',buffer:bytes});
  await target.waitForFunction(()=>!!localStorage.getItem('agu_leitor_juridico_s13_v1'));await target.reload();
  assert.deepEqual(await target.evaluate(()=>AGULegal.peek().forNotebook),after.reader.forNotebook);
  assert.equal(await target.evaluate(()=>AGUBackup20.importMissing(AGUBackup20.capture()).added),0);
  await fresh.close();
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'overflow '+width);assert.deepEqual(errors,[]);
  results.push({width,flashcardId:item.cardId,topic:item.topic,marks:5,manualStates:true,noScheduling:true,backupRestored:true,a11y});await ctx.close();
 }
 fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({target:origin,browser:browser.version(),axe:axe.version,results},null,2));
 console.log('LEG11_AXE',JSON.stringify(results.filter(x=>x.a11y.initial).map(x=>({width:x.width,violations:x.a11y.initial.violations.length,incomplete:x.a11y.initial.incomplete.reduce((n,v)=>n+v.nodes.length,0),passed:x.a11y.initial.passed.length,afterScroll:x.a11y.afterScroll.length,unresolved:x.a11y.unresolvedAfterScroll.length}))));
 console.log('LEG11_BROWSER_OK',JSON.stringify({target:origin,browser:browser.version(),viewports:results.map(x=>x.width)}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
