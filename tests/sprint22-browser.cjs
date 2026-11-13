/* AGU Quiz | Sprint 22. Chromium real, nove categorias e percurso diário.
 * Dados exclusivamente sintéticos. O teste NÃO lê a matriz privada real.
 * node tests/sprint22-browser.cjs  — requer playwright + Chromium.
 * Viewport desktop estreita NÃO equivale a Android físico.
 */
'use strict';
const {chromium}=require('playwright'),http=require('node:http'),path=require('node:path');
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 const requested=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'');
 const f=path.resolve(ROOT,requested||'index.html');
 if(!f.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('denied')}
 fs.readFile(f,(e,b)=>{if(e){res.writeHead(404);return res.end('not found')}
 res.writeHead(200,{'Content-Type':f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.js')?'application/javascript; charset=utf-8':'application/octet-stream','Cache-Control':'no-store'});res.end(b)});
});
const KEYS=[
 'agu_quiz_mvp1_2026','agu_quiz_revisao_inteligente_v1','agu_quiz_planejamento_semanal_v1',
 'agu_caderno_contextual_s15_v1','agu_estudo_integrado_s16_v1','agu_leitor_juridico_s13_v1',
 'agu_consolidacao_s17_v1','agu_quiz_curriculo_repo_v1','agu_quiz_mapeamento_questoes_v1'
];
const STABLE_IDS=['of-2015-adv-006','of-2015-adv-007','of-2015-adv-009','of-2015-adv-048'];
const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
function syntheticMatrix(){
 const codes=Array.from({length:14},(_,i)=>'A'+String.fromCharCode(65+i));
 const disciplinas=[],itens=[];
 for(let i=0;i<codes.length;i++){
  const code=codes[i],qty=i<6?30:29;
  disciplinas.push({codigo:code,nome:'Disciplina de teste '+code,quantidade_posicoes:qty});
  for(let k=1;k<=qty;k++)itens.push({id:code+'-'+String(k).padStart(3,'0'),disciplina_codigo:code,titulo_operacional:'Tema sintético '+k});
 }
 assert.equal(itens.length,412);
 return {versao:'DADOS-SINTETICOS-S22',certificacao:'NAO_CERTIFICADA',disciplinas,itens,contagem:{posicoes_com_texto_literal_integral_conferido:0}};
}
function mutate(bundle,key,fn){
 const obj=JSON.parse(bundle.items[key]),bad=fn(obj);
 return {...bundle,items:{...bundle.items,[key]:JSON.stringify(bad)}};
}
async function invokeFile(page,inputId,contents,name){
 await page.locator('#'+inputId).setInputFiles({name,mimeType:'application/json',buffer:Buffer.from(contents)});
}
async function inspectNavigation(page,w){
 for(const [label,target] of [['Início','dashboard'],['Estudar','study'],['Biblioteca Inteligente','library'],['Evolução','evolution']]){
  await page.getByRole('button',{name:label,exact:true}).click();
  const g=await page.evaluate(()=>[...document.querySelectorAll('.side .nav')].filter(x=>x.getAttribute('aria-current')==='page').map(x=>x.dataset.view));
  assert.deepEqual(g,[target]);
  const vals=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,w:innerWidth,visible:(document.activeElement?.tagName||'')}));
  assert.ok(vals.scroll<=vals.w+2,'horizontal overflow '+w+' '+label+' '+JSON.stringify(vals));
 }
 await page.getByRole('button',{name:'Estudar',exact:true}).click();
 await page.getByRole('button',{name:'Planejamento'}).click();
 const plannerSize=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,w:innerWidth}));
 assert.ok(plannerSize.scroll<=plannerSize.w+2,'overflow planner '+w);
 await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
 await page.getByRole('button',{name:'Legislação e materiais'}).click();
 const librarySize=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,w:innerWidth}));
 assert.ok(librarySize.scroll<=librarySize.w+2,'overflow legal '+w);
}
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const origin='http://127.0.0.1:'+server.address().port+'/';
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 console.log('Sprint22 Chromium',browser.version(),'Node',process.version);
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:860},reducedMotion:'reduce'}),p=await ctx.newPage();
  const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('response',r=>{if(r.status()===404)errs.push('404 '+r.url())});
  await p.goto(origin,{waitUntil:'load'});
  await inspectNavigation(p,width);
  assert.deepEqual(errs,[],'no page errors 404');
  console.log('OK S22 jornada quatro áreas, planejamento e Leitor',width);
  await ctx.close();
 }
 const srcContext=await browser.newContext({viewport:{width:390,height:860}});
 const p=await srcContext.newPage();const dialogs=[];
 p.on('dialog',async d=>{dialogs.push(d.message());await d.accept()});
 await p.goto(origin,{waitUntil:'load'});
 // Uma tentativa real de 2023 no fluxo A–E, preservada no armazenamento principal.
 await p.evaluate(()=>window.setView('officialExam'));
 await p.locator('#officialselect').selectOption('AGU-2023-P1-Q001');
 await p.getByRole('button',{name:'A',exact:true}).click();
 await p.getByRole('button',{name:'Conferir com gabarito definitivo'}).click();
 // 2015: iniciar sessão por dispositivo, responder uma única vez e salvar Caderno.
 await p.evaluate(()=>window.AGUStudy.start('CF88:art49:V'));
 await p.evaluate(()=>window.openAudited2015('of-2015-adv-007'));
 await p.getByRole('button',{name:'CERTO',exact:true}).click();
 await p.getByRole('button',{name:'Conferir resposta'}).click();
 await p.getByRole('button',{name:'Lembrei',exact:true}).click();
 await p.locator('#q18-note').fill('Dificuldade S22 — texto sintético <img src=x onerror=alert(1)>');
 await p.getByRole('button',{name:'Salvar dificuldade'}).click();
 // Planejamento, anotação do leitor, preferência da biblioteca.
 await p.evaluate(()=>window.AGUPlanner.ensure());
 await p.evaluate(()=>{window.setView('legal');window.AGULegal.unit('CF88:art49:V');window.AGULegal.tab('comentarios')});
 await p.locator('#agu-legal-note').fill('Notas jurídicas sintéticas: hierarquia e regra de competência.');
 await p.getByRole('button',{name:'Salvar anotação'}).click();
 await p.evaluate(()=>window.AGUConsolidation.setFilters('CF88','norma','confirmado'));
 // Importação de matriz explicitamente SINTÉTICA somente no contexto efêmero.
 await p.evaluate(()=>window.setView('matrix'));
 await invokeFile(p,'matrixfile',JSON.stringify(syntheticMatrix()),'matriz-SINTETICA-s22.json');
 await p.waitForFunction(()=>localStorage.getItem('agu_quiz_curriculo_repo_v1')!==null);
 await p.evaluate(()=>window.matrixTopic('AA-001'));
 await p.locator('#mapping-question').selectOption('a1');
 await p.evaluate(()=>window.saveQuestionMap());
 await p.waitForFunction(()=>localStorage.getItem('agu_quiz_mapeamento_questoes_v1')!==null);
 const before=await p.evaluate(keys=>{
  const data=Object.fromEntries(keys.map(k=>[k,localStorage.getItem(k)]));
  return {data,cards:window.AGUReview.deck(),audited:window.AGUQuestions18.all().map(x=>x.id),bundle:window.AGUBackup20.capture()};
 },KEYS);
 assert.equal(Object.keys(before.bundle.items).length,9,'todas as nove categorias precisam existir');
 assert.ok(Object.values(before.data).every(Boolean),'todas as chaves possuem valores');
 assert.equal(before.cards.flashcards,36);
 assert.equal(before.cards.official,24);
 assert.deepEqual(before.audited.slice().sort(),STABLE_IDS.slice().sort());
 assert.equal(JSON.parse(before.data.agu_quiz_revisao_inteligente_v1).attempts.length,1);
 assert.equal(JSON.parse(before.data.agu_caderno_contextual_s15_v1).records.length,1);
 assert.equal(JSON.parse(before.data.agu_estudo_integrado_s16_v1).sessions.length,1);
 assert.equal(JSON.parse(before.data.agu_quiz_curriculo_repo_v1).itens.length,412);
 assert.equal(JSON.parse(before.data.agu_quiz_mapeamento_questoes_v1).a1,'AA-001');
 console.log('OK S22 nove categorias ativas, 4 questões, 36 flashcards, 24 referências, dados sintéticos');
 // Diagnóstico: matriz que o importador normal rejeita deve ser rejeitada também no backup.
 const malformed=mutate(before.bundle,'agu_quiz_curriculo_repo_v1',m=>{
  m.disciplinas[1].codigo=m.disciplinas[0].codigo;return m;
 });
 const rejectsInvalidMatrix=await p.evaluate(b=>{try{window.AGUBackup20.validateBundle(b);return false}catch(_){return true}},malformed);
 assert.equal(rejectsInvalidMatrix,true,'S22: backup com matriz de disciplinas duplicadas não pode passar');
 // Perfil independente: exportação por botão -> arquivo -> restauração pela própria tela.
 await p.getByRole('button',{name:'Evolução',exact:true}).click();
 await p.locator('.secondary-nav-item').filter({hasText:'Dados e backup'}).click();
 const downloadWait=p.waitForEvent('download');
 await p.getByRole('button',{name:'Exportar cópia completa'}).click();
 const d=await downloadWait;
 const temp=path.join(ROOT,'tests','s22-backup-efemero.json');await d.saveAs(temp);
 const exported=fs.readFileSync(temp,'utf8');
 fs.unlinkSync(temp);
 const json=JSON.parse(exported);
 assert.deepEqual(Object.keys(json.items).sort(),KEYS.slice().sort());
 for(const key of KEYS)assert.equal(sha(json.items[key]),sha(before.data[key]),'hash source backup '+key);
 const clean=await browser.newContext({viewport:{width:390,height:860}}),dest=await clean.newPage();
 const recoveryDialogs=[];dest.on('dialog',async d=>{recoveryDialogs.push(d.message());await d.accept()});
 await dest.goto(origin,{waitUntil:'load'});
 await dest.getByRole('button',{name:'Evolução',exact:true}).click();
 await dest.locator('.secondary-nav-item').filter({hasText:'Dados e backup'}).click();
 await invokeFile(dest,'agu-s20-backup-file',exported,'agu-s22-recuperacao.json');
 await dest.waitForFunction(()=>localStorage.getItem('agu_quiz_mapeamento_questoes_v1')!==null);
 assert.ok(recoveryDialogs.some(s=>s.includes('Restaurar'))&&recoveryDialogs.some(s=>s.includes('restaurada')));
 await dest.reload({waitUntil:'load'});
 const after=await dest.evaluate(keys=>Object.fromEntries(keys.map(k=>[k,localStorage.getItem(k)])),KEYS);
 for(const key of KEYS)assert.equal(sha(after[key]),sha(before.data[key]),'restauração fiel '+key);
 assert.equal(await dest.evaluate(b=>window.AGUBackup20.importMissing(b).added,json),0,'idempotência');
 const mismatch=mutate(json,'agu_quiz_mvp1_2026',v=>{v.answers[0].id='S22_OUTRO';return v});
 assert.equal(await dest.evaluate(b=>window.AGUBackup20.importMissing(b).added,mismatch),0,'não sobrescrever categoria presente');
 assert.equal(await dest.evaluate(()=>JSON.parse(localStorage.getItem('agu_quiz_mvp1_2026')).answers[0].id),JSON.parse(before.data.agu_quiz_mvp1_2026).answers[0].id);
 console.log('OK S22 backup real arquivo: nove categorias, hashes, perfil independente, reload, idempotência e não sobrescrita');
 await clean.close();await srcContext.close();
 console.log('RESULTADO S22: cinco viewports + restauração integral de nove categorias (sem dados pessoais).');
}
main().catch(e=>{console.error('FALHA S22:',e.stack||e);process.exitCode=1})
 .finally(async()=>{if(browser)await browser.close();if(server.listening)await new Promise(ok=>server.close(ok))});
