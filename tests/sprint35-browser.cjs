/* S35 — Chromium real com cinco viewports, somente perfis e registros sintéticos.
 * Navegação efetiva Enter/Tab/Shift+Tab; evaluate monta fixtures e observa DOM.
 * Não equivale a Android físico, TalkBack nem certificação WCAG.
 */
'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-s35');
const server=http.createServer((req,res)=>{
 const rel=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'');
 const file=path.resolve(ROOT,rel||'index.html');
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('denied')}
 fs.readFile(file,(e,buf)=>{if(e){res.writeHead(404);return res.end('not found')}
  res.writeHead(200,{'content-type':file.endsWith('.js')?'application/javascript;charset=utf-8':'text/html;charset=utf-8','cache-control':'no-store'});res.end(buf)});
});
const focus=()=>{
 const e=document.activeElement,r=e.getBoundingClientRect();
 const vp={width:innerWidth,height:innerHeight},rect={x:r.x,y:r.y,width:r.width,height:r.height};
 return {tag:e.tagName,id:e.id,text:(e.textContent||'').trim().slice(0,90),
  record:e.getAttribute('data-ctx-record-id'),task:e.getAttribute('data-planner-task'),
  field:e.getAttribute('data-planner-field'),stage:e.getAttribute('data-agu-study-stage'),
  className:typeof e.className==='string'?e.className:'',
  rect,scrollY,viewport:vp,visible:r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth};
};
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const results=[];
 for(const width of [320,360,390,430,1280]){
  const context=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'load'});
  await page.evaluate(()=>{
   const key='agu_quiz_mvp1_2026',existing=JSON.parse(localStorage.getItem(key)||'null')||{};
   const prior={version:1,created:new Date().toISOString(),topic:{},answers:[],sessions:[],reviews:[],notebook:[],seed:false,...existing};
   localStorage.setItem(key,JSON.stringify({...prior,notebook:[{id:'legado-artificial-s35',topic:'ADM/06',title:'Cópia legado fictícia',hypothesis:'Nota sem dados pessoais'}]}));
   window.AGULegal.unit('L9784:art13:I');window.setView('legal');
  }); // preparação, não prova de navegação com Tab
  if(width<850)await page.locator('#agu-reader .agu-mobile button').nth(2).click();
  await page.locator('#agu-reader .agu-tabs').getByRole('button',{name:'Caderno',exact:true}).click();
  await page.locator('#ctx-title').fill('Nota para exclusão S35 '+width);
  await page.locator('#ctx-content').fill('Exclusivamente cenário sintético e descartável.');
  await page.getByRole('button',{name:'Adicionar ao Caderno'}).press('Enter');
  assert.equal(await page.evaluate(()=>window.AGUCaderno.peek().records.length),1);
  page.once('dialog',d=>d.accept()); // confirma apenas nota artificial recém-criada
  await page.getByRole('button',{name:'Excluir',exact:true}).press('Enter');
  const deleted=await page.evaluate(focus);
  assert.equal(deleted.text,'Adicionar ao Caderno','exclusão restaura novo registro '+width);
  assert.equal(deleted.visible,true,'foco pós-exclusão visível '+width);
  assert.equal(await page.evaluate(()=>window.AGUCaderno.peek().records.length),0,'apenas nota sintética excluída');

  await page.locator('#ctx-legacy').selectOption('legado-artificial-s35');
  page.once('dialog',d=>d.accept()); // vínculo voluntário de legado artificial
  await page.getByRole('button',{name:'Vincular cópia selecionada'}).press('Enter');
  const legacy=await page.evaluate(focus);
  assert.equal(legacy.record!==null,true,'vínculo aponta novo registro '+width);
  assert.equal(legacy.visible,true,'cópia vinculada visível '+width);
  assert.equal(await page.evaluate(()=>window.AGUCaderno.peek().records[0].legacyId),'legado-artificial-s35');
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('agu_quiz_mvp1_2026')).notebook.length),1,'origem intacta');

  await page.locator('#agu-reader .agu-tabs button').filter({hasText:'Estudo integrado'}).click();
  await page.getByRole('button',{name:'Iniciar / retomar estudo deste dispositivo'}).press('Enter');
  await page.getByRole('button',{name:'Continuar para Caderno'}).press('Enter');
  await page.getByRole('button',{name:'Vincular registros existentes'}).press('Enter');
  const collected=await page.evaluate(focus);
  assert.equal(collected.text,'Vincular registros existentes','vinculação mantém controle '+width);
  assert.equal(collected.visible,true,'vinculação visível '+width);
  assert.equal(await page.evaluate(()=>window.AGUStudy.active().notes.length),1,'uma nota vinculada');
  await page.getByRole('button',{name:'Vincular registros existentes'}).press('Enter');
  assert.equal(await page.evaluate(()=>window.AGUStudy.active().notes.length),1,'repetição idempotente');
  await page.locator('[data-agu-study-stage="flashcards"]').press('Enter');
  await page.getByRole('button',{name:'Estudar cartão'}).first().press('Enter');
  const picked=await page.evaluate(focus);
  assert.equal(picked.text,'Mostrar resposta','escolha leva ao cartão '+width);
  assert.equal(picked.visible,true,'cartão visível '+width);
  assert.equal(await page.evaluate(()=>window.AGUReview.attemptsInfo().length),0,'selecionar não avalia');

  await page.evaluate(()=>{
   window.AGULegal.unit('L9784:art13:II');
   window.AGUStudy.start('L9784:art13:II');
   window.AGULegal.unit('L9784:art13:I');
  }); // estado de duas sessões fictícias para expor Retomar
  await page.getByRole('button',{name:'Retomar sessão'}).press('Enter');
  const resumed=await page.evaluate(focus);
  assert.equal(resumed.stage,'flashcards','retomada aponta etapa salva '+width);
  assert.equal(resumed.visible,true,'etapa retomada visível '+width);

  await page.evaluate(()=>window.setView('review')); // montagem da revisão isolada
  await page.getByRole('button',{name:'Questões oficiais',exact:true}).press('Enter');
  await page.getByRole('button',{name:'ERRADO',exact:true}).press('Enter');
  const selected=await page.evaluate(focus);
  assert.equal(selected.className.includes('selected'),true,'alternativa auditada conserva foco '+width);
  assert.equal(selected.visible,true,'alternativa visível '+width);
  await page.keyboard.press('Tab');
  assert.equal((await page.evaluate(focus)).text,'Conferir resposta','Tab leva a Conferir '+width);
  await page.keyboard.press('Shift+Tab');
  assert.equal((await page.evaluate(focus)).className.includes('selected'),true,'Shift+Tab retorna à escolha '+width);
  await page.getByRole('button',{name:'Conferir resposta'}).press('Enter');
  assert.equal((await page.evaluate(focus)).text,'Errei','conferência foca avaliação sem pontuar '+width);
  assert.equal(await page.evaluate(()=>window.AGUReview.attemptsInfo().length),0,'sem tentativa até avaliar explicitamente');

  await page.evaluate(()=>window.setView('planner'));
  const firstTask=await page.locator('[data-planner-field="done"]').first().getAttribute('data-planner-task');
  page.once('dialog',d=>d.accept()); // mensagem de capacidade: nenhum registro movido
  await page.getByRole('button',{name:'Próximo dia'}).first().press('Enter');
  const blocked=await page.evaluate(focus);
  assert.equal(blocked.task,firstTask,'conflito preserva tarefa e foco '+width);
  assert.equal(blocked.visible,true,'foco após conflito visível '+width);
  assert.equal(await page.evaluate(id=>window.AGUPlanner.current().days[0].tasks.some(t=>t.id===id),firstTask),true,'sem movimentação quando cheio');
  await page.evaluate(()=>{
   window.AGUPlanner.settings().dailyMinutes[1]=260;
   window.AGUPlanner.current().days[1].minutes=260;
  }); // capacidade ampliada apenas no perfil descartável
  await page.getByRole('button',{name:'Próximo dia'}).first().press('Enter');
  const moved=await page.evaluate(focus);
  assert.equal(moved.task,firstTask,'tarefa movida recupera foco '+width);
  assert.equal(moved.visible,true,'tarefa movida visível '+width);
  assert.equal(await page.evaluate(id=>window.AGUPlanner.current().days[1].tasks.some(t=>t.id===id),firstTask),true);
  await page.keyboard.press('Tab');
  assert.equal((await page.evaluate(focus)).field,'topic','Tab da tarefa para matéria '+width);
  await page.keyboard.press('Shift+Tab');
  assert.equal((await page.evaluate(focus)).task,firstTask,'Shift+Tab retorna à tarefa '+width);
  page.once('dialog',d=>d.accept()); // substitui somente semana sintética alterada
  await page.getByRole('button',{name:'Gerar novamente esta semana'}).press('Enter');
  const regenerated=await page.evaluate(focus);
  assert.equal(regenerated.text,'Gerar novamente esta semana','regeneração conserva comando '+width);
  assert.equal(regenerated.visible,true,'comando visível pós-regeneração '+width);
  assert.equal(await page.evaluate(()=>window.AGUReview.attemptsInfo().length),0);
  const record=await page.evaluate(()=>({notes:window.AGUCaderno.peek().records.length,sessions:window.AGUStudy.peek().sessions.length,attempts:window.AGUReview.attemptsInfo().length}));
  if(width===390){fs.mkdirSync(OUT,{recursive:true});await page.screenshot({path:path.join(OUT,'foco-secundario-s35-390.png')})}
  await page.reload({waitUntil:'load'});
  assert.deepEqual(await page.evaluate(()=>({notes:window.AGUCaderno.peek().records.length,sessions:window.AGUStudy.peek().sessions.length,attempts:window.AGUReview.attemptsInfo().length})),record,'reload sem duplicar '+width);
  assert.deepEqual(errors,[],'sem erro de página '+width);
  results.push({width,deleted,legacy,collected,picked,resumed,selected,blocked,moved,regenerated,record});
  await context.close();
 }
 fs.mkdirSync(OUT,{recursive:true});
 fs.writeFileSync(path.join(OUT,'foco-secundario-s35.json'),JSON.stringify({kind:'synthetic',viewports:[320,360,390,430,1280],results},null,2));
 console.log('S35_BROWSER_FOCO_OK',JSON.stringify({viewports:results.map(x=>x.width),cases:['excluir_sintetico','vincular_legado','coletar','cartao','retomar','alternativa_CE','conferir','conflito','mover','regenerar','reload'],noGhost:true}));
}
main().catch(e=>{console.error('S35_BROWSER_FALHA',e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();server.close()});
