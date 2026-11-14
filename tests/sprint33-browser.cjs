/* S33: teclado em Caderno/Estudo/Revisão/Plano, cinco larguras CSS.
 * Perfis isolados e conteúdo inteiramente sintético. Não é Android/TalkBack.
 */
'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-s33');
const server=http.createServer((req,res)=>{
 const rel=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'');
 const file=path.resolve(ROOT,rel||'index.html');
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('denied')}
 fs.readFile(file,(e,buf)=>{if(e){res.writeHead(404);return res.end('not found')}
  res.writeHead(200,{'content-type':file.endsWith('.js')?'application/javascript;charset=utf-8':'text/html;charset=utf-8','cache-control':'no-store'});res.end(buf)});
});
const focus=()=>{const e=document.activeElement,r=e.getBoundingClientRect();return {
 tag:e.tagName,id:e.id,text:(e.textContent||'').trim().slice(0,64),
 task:e.getAttribute('data-planner-task'),study:e.getAttribute('data-agu-study-stage'),
 rect:{x:r.x,y:r.y,top:r.top,bottom:r.bottom,left:r.left,right:r.right},
 visible:r.height>0&&r.width>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth,
 viewport:{width:innerWidth,height:innerHeight},scrollY
}};
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const results=[];
 for(const width of [320,360,390,430,1280]){
  const context=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'load'});
  const before=await page.evaluate(()=>window.AGUReview.attemptsInfo().length);
  await page.evaluate(()=>window.setView('legal')); // montagem isolada, não prova de navegação por Tab
  if(width<850)await page.locator('#agu-reader .agu-mobile button').nth(2).click();
  await page.locator('#agu-reader .agu-tabs').getByRole('button',{name:'Caderno',exact:true}).click();
  await page.locator('#ctx-title').fill('Hipótese artificial S33 '+width);
  await page.locator('#ctx-content').fill('Registro sintético sem informação pessoal.');
  await page.locator('#ctx-content').press('Tab');
  await page.keyboard.press('Tab');
  const noteBefore=await page.evaluate(focus);
  assert.equal(noteBefore.text,'Adicionar ao Caderno','Tab chega a Adicionar '+width);
  await page.keyboard.press('Enter');
  const noteAfter=await page.evaluate(focus);
  assert.equal(noteAfter.text,'Adicionar ao Caderno','salvar devolve foco '+width);
  assert.equal(noteAfter.visible,true,'botão de Caderno visível '+width);
  const count=await page.evaluate(()=>window.AGUCaderno.peek().records.length);
  assert.equal(count,1,'registro sintético único '+width);
  await page.keyboard.press('Tab');
  assert.equal((await page.evaluate(focus)).id,'ctx-filter-type','Tab seguinte ao botão alcança filtro '+width);
  await page.keyboard.press('ArrowDown');
  const filterAfter=await page.evaluate(focus);
  assert.equal(filterAfter.id,'ctx-filter-type','filtro conserva foco '+width);
  assert.equal(filterAfter.visible,true,'filtro visível '+width);

  await page.locator('#agu-reader .agu-tabs button').filter({hasText:'Estudo integrado'}).click();
  await page.getByRole('button',{name:'Iniciar / retomar estudo deste dispositivo'}).press('Enter');
  const beginAfter=await page.evaluate(focus);
  assert.equal(beginAfter.study,'norma','etapa inicial focada '+width);
  assert.equal(beginAfter.visible,true,'etapa inicial visível '+width);
  await page.getByRole('button',{name:'Continuar para Caderno'}).press('Enter');
  const stageAfter=await page.evaluate(focus);
  assert.equal(stageAfter.study,'caderno','etapa Caderno focada '+width);
  assert.equal(stageAfter.visible,true,'etapa Caderno visível '+width);
  await page.keyboard.press('Tab');
  assert.equal((await page.evaluate(focus)).study,'questoes','Tab seguinte passa a Questões '+width);
  await page.keyboard.press('Shift+Tab');
  assert.equal((await page.evaluate(focus)).study,'caderno','Shift+Tab retorna à etapa '+width);
  assert.equal(await page.evaluate(()=>window.AGUStudy.peek().sessions.length),1,'sessão fictícia única '+width);

  await page.evaluate(()=>window.setView('review'));
  await page.getByRole('button',{name:'Flashcards',exact:true}).press('Enter');
  const reviewAfter=await page.evaluate(focus);
  assert.equal(reviewAfter.text,'Flashcards','seleção mantém botão focado '+width);
  assert.equal(reviewAfter.visible,true,'Flashcards visível '+width);
  await page.keyboard.press('Tab');
  assert.equal((await page.evaluate(focus)).text,'Questões oficiais','Tab segue ao outro modo '+width);
  await page.getByRole('button',{name:'Mostrar resposta'}).press('Enter');
  const revealAfter=await page.evaluate(focus);
  assert.equal(revealAfter.text,'Errei','revelação foca primeira avaliação '+width);
  assert.equal(revealAfter.visible,true,'avaliação visível '+width);
  await page.keyboard.press('Tab');
  assert.equal((await page.evaluate(focus)).text,'Difícil','Tab seguinte à avaliação '+width);
  await page.getByRole('button',{name:'Lembrei'}).press('Enter');
  const ratingAfter=await page.evaluate(focus);
  assert.equal(ratingAfter.text,'Mostrar resposta','avaliar leva ao próximo cartão '+width);
  assert.equal(ratingAfter.visible,true,'próximo cartão visível '+width);
  assert.equal(await page.evaluate(()=>window.AGUReview.attemptsInfo().length),before+1,'uma avaliação sintética '+width);

  await page.evaluate(()=>window.setView('planner'));
  await page.getByRole('button',{name:'Salvar disponibilidade'}).press('Enter');
  const hoursAfter=await page.evaluate(focus);
  assert.equal(hoursAfter.text,'Salvar disponibilidade','salvar disponibilidade mantém foco '+width);
  assert.equal(hoursAfter.visible,true,'salvar disponibilidade visível '+width);
  const topic=page.locator('[data-planner-field="topic"]').first();
  const beforeTopic=await topic.inputValue();
  await topic.press('ArrowDown');
  const topicAfter=await page.evaluate(focus);
  assert.equal(topicAfter.tag,'SELECT','trocar matéria mantém select '+width);
  assert.equal(topicAfter.visible,true,'select da matéria visível '+width);
  const afterTopic=await page.locator('[data-planner-field="topic"]').first().inputValue();
  assert.notEqual(afterTopic,beforeTopic,'matéria efetivamente alterada '+width);
  assert.equal(await page.evaluate(()=>window.AGUReview.attemptsInfo().length),before+1,'plano não cria avaliação '+width);
  const record=await page.evaluate(()=>({notes:window.AGUCaderno.peek().records.length,sessions:window.AGUStudy.peek().sessions.length,attempts:window.AGUReview.attemptsInfo().length}));
  if(width===390){fs.mkdirSync(OUT,{recursive:true});await page.screenshot({path:path.join(OUT,'foco-plano-s33-390.png')})}
  await page.reload({waitUntil:'load'});
  assert.deepEqual(await page.evaluate(()=>({notes:window.AGUCaderno.peek().records.length,sessions:window.AGUStudy.peek().sessions.length,attempts:window.AGUReview.attemptsInfo().length})),record,'reload não duplica histórico '+width);
  assert.deepEqual(errors,[],'sem exceções de página '+width);
  results.push({width,noteBefore,noteAfter,filterAfter,beginAfter,stageAfter,reviewAfter,revealAfter,ratingAfter,hoursAfter,topicAfter,record});
  await context.close();
 }
 fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'foco-modulos-s33.json'),JSON.stringify({kind:'synthetic',viewports:[320,360,390,430,1280],results},null,2));
 console.log('S33_BROWSER_FOCO_OK',JSON.stringify({viewports:results.map(x=>x.width),cases:['caderno_salvar','filtro','estudo_iniciar','etapa','revisao','revelar','avaliar','plano_salvar','materia','reload'],noGhost:true}));
}main().catch(e=>{console.error('S33_BROWSER_FALHA',e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();server.close()});
