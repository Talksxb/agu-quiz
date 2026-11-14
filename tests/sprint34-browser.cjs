/* S34: regressões de teclado em cinco viewports. Contextos e dados sintéticos.
 * Chrome desktop do CI não é Android físico nem valida TalkBack/WCAG global.
 */
'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-s34');
const server=http.createServer((req,res)=>{
 const rel=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'');
 const file=path.resolve(ROOT,rel||'index.html');
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('denied')}
 fs.readFile(file,(e,buf)=>{if(e){res.writeHead(404);return res.end('not found')}
  res.writeHead(200,{'content-type':file.endsWith('.js')?'application/javascript;charset=utf-8':'text/html;charset=utf-8','cache-control':'no-store'});res.end(buf)});
});
const focus=()=>{const e=document.activeElement,r=e.getBoundingClientRect();return {
 tag:e.tagName,id:e.id,text:(e.textContent||'').trim().slice(0,65),
 task:e.getAttribute('data-planner-task'),field:e.getAttribute('data-planner-field'),
 record:e.getAttribute('data-ctx-record-id'),
 rect:{x:r.x,y:r.y,top:r.top,bottom:r.bottom,left:r.left,right:r.right},
 visible:r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth,
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
  const originalAttempts=await page.evaluate(()=>window.AGUReview.attemptsInfo().length);
  await page.evaluate(()=>window.setView('legal')); // montagem isolada; ações seguintes usam teclado real
  if(width<850)await page.locator('#agu-reader .agu-mobile button').nth(2).click();
  await page.locator('#agu-reader .agu-tabs').getByRole('button',{name:'Caderno',exact:true}).click();
  await page.locator('#ctx-title').fill('Nota sintética S34 '+width);
  await page.locator('#ctx-content').fill('Registro artificial sem dados privados.');
  await page.getByRole('button',{name:'Adicionar ao Caderno'}).press('Enter');
  const edit=page.getByRole('button',{name:'Editar',exact:true}).first();
  await edit.press('Enter');
  const editAfter=await page.evaluate(focus);
  assert.equal(editAfter.id,'ctx-title','Editar leva ao título '+width);
  assert.equal(editAfter.visible,true,'título de edição visível '+width);
  await page.keyboard.press('Tab');
  assert.equal((await page.evaluate(focus)).id,'ctx-type','Tab segue ao Tipo '+width);
  await page.getByRole('button',{name:'Cancelar edição'}).press('Enter');
  const cancelAfter=await page.evaluate(focus);
  assert.equal(cancelAfter.record!==null,true,'cancelar devolve foco ao registro '+width);
  assert.equal(cancelAfter.visible,true,'editar original visível '+width);
  await page.keyboard.press('Tab');
  assert.equal((await page.evaluate(focus)).text,'Excluir','Tab segue a Excluir sem acioná-lo '+width);
  assert.equal(await page.evaluate(()=>window.AGUCaderno.peek().records.length),1,'nota preservada '+width);

  await page.locator('#agu-reader .agu-tabs button').filter({hasText:'Estudo integrado'}).click();
  await page.getByRole('button',{name:'Iniciar / retomar estudo deste dispositivo'}).press('Enter');
  await page.getByRole('button',{name:'Encerrar esta sessão'}).press('Enter');
  const closeAfter=await page.evaluate(focus);
  assert.equal(closeAfter.text,'Iniciar / retomar estudo deste dispositivo','encerrar aponta retomada '+width);
  assert.equal(closeAfter.visible,true,'retomada visível '+width);
  assert.equal(await page.evaluate(()=>window.AGUStudy.peek().sessions.length),1,'sessão fictícia única '+width);

  await page.evaluate(()=>window.setView('review'));
  await page.locator('summary').filter({hasText:'Encontrar cartão por disciplina e tópico'}).press('Enter');
  await page.getByRole('button',{name:'Estudar cartão'}).press('Enter');
  const cardAfter=await page.evaluate(focus);
  assert.equal(cardAfter.text,'Mostrar resposta','catálogo aponta primeiro controle do cartão '+width);
  assert.equal(cardAfter.visible,true,'cartão visível '+width);
  assert.equal(await page.evaluate(()=>window.AGUReview.attemptsInfo().length),originalAttempts,'selecionar não avalia '+width);

  await page.evaluate(()=>window.setView('planner'));
  const cb=page.locator('[data-planner-field="done"]').first(),prior=await cb.isChecked();
  await cb.press('Space');
  const markedAfter=await page.evaluate(focus);
  assert.equal(markedAfter.field,'done','checkbox conserva foco '+width);
  assert.equal(markedAfter.visible,true,'checkbox visível '+width);
  assert.equal(await page.locator('[data-planner-field="done"]').first().isChecked(),!prior,'marcação alterada '+width);
  await page.keyboard.press('Tab');
  assert.equal((await page.evaluate(focus)).field,'topic','Tab segue à matéria '+width);
  await page.keyboard.press('Shift+Tab');
  assert.equal((await page.evaluate(focus)).field,'done','Shift+Tab retorna à marcação '+width);
  await page.locator('[data-planner-field="done"]').first().press('Space');
  assert.equal(await page.locator('[data-planner-field="done"]').first().isChecked(),prior,'marcação revertida '+width);
  assert.equal(await page.evaluate(()=>window.AGUReview.attemptsInfo().length),originalAttempts,'plano não cria tentativa '+width);
  const record=await page.evaluate(()=>({notes:window.AGUCaderno.peek().records.length,sessions:window.AGUStudy.peek().sessions.length,attempts:window.AGUReview.attemptsInfo().length}));
  if(width===390){fs.mkdirSync(OUT,{recursive:true});await page.screenshot({path:path.join(OUT,'foco-tarefa-s34-390.png')})}
  await page.reload({waitUntil:'load'});
  assert.deepEqual(await page.evaluate(()=>({notes:window.AGUCaderno.peek().records.length,sessions:window.AGUStudy.peek().sessions.length,attempts:window.AGUReview.attemptsInfo().length})),record,'reload não duplica '+width);
  assert.deepEqual(errors,[],'sem erro de página '+width);
  results.push({width,editAfter,cancelAfter,closeAfter,cardAfter,markedAfter,record});
  await context.close();
 }
 fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'foco-controles-s34.json'),JSON.stringify({kind:'synthetic',viewports:[320,360,390,430,1280],results},null,2));
 console.log('S34_BROWSER_FOCO_OK',JSON.stringify({viewports:results.map(x=>x.width),cases:['editar','cancelar','encerrar','catalogo','checkbox','tab_shift_tab','reload'],noGhost:true}));
}main().catch(e=>{console.error('S34_BROWSER_FALHA',e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();server.close()});
