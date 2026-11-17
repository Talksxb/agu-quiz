/* LEG13 — portão somente de diagnóstico: Home ⇄ lista única, dados anteriores intocados. */
'use strict';
const afterUx=require('./hash-chain-ux-estudo-integrado.cjs');
const afterCodigos=require('./hash-chain-codigos.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT,p))).digest('hex');
const KEY='agu_leitor_juridico_s13_v1';
const MARKS=[
 {id:'pc-leg13-reader0001',lawId:'L4717',articleId:'L4717:art2',unitId:'L4717:art2:pu:e',topic:null,origin:'leitor',prompt:'Motivo versus finalidade?',createdAt:'2026-11-14T20:00:00.000Z',status:'pendente'},
 {id:'pc-leg13-study00001',lawId:null,articleId:null,unitId:null,deviceId:'L9784:art12:caput',sessionId:'ags-leg13-001',topic:'ADM-06',origin:'estudo_integrado',prompt:'Delegação e avocação?',createdAt:'2026-11-14T20:00:00.000Z',status:'anotado'},
 {id:'pc-leg13-question01',lawId:null,articleId:null,unitId:null,questionId:'of-2015-adv-006',questionLabel:'AGU 2015 · Q6 · 187AGU_001_07',topic:'ADM-17',origin:'questao_verificada',prompt:'Motivação por remissão?',createdAt:'2026-11-14T20:00:00.000Z',status:'dispensado'},
 {id:'pc-leg13-card00001',lawId:null,articleId:null,unitId:null,cardId:'ri-adm-01',cardLabel:'Flashcard ri-adm-01 · ADM-06',topic:'ADM-06',origin:'flashcard_existente',prompt:'Quando avocar?',createdAt:'2026-11-14T20:00:00.000Z',status:'pendente'}
];
const READER={article:'L4717:art2',unit:'L4717:art2:pu:e',tab:'juris',mobile:'text',notes:{'L4717:art2:pu:e':'Nota sintética anterior'},forNotebook:MARKS};
const clone=x=>JSON.parse(JSON.stringify(x));
function boot(values=new Map(),opts={}){
 const storage=new Map(values),fields={};let writes=0;
 const main={innerHTML:'',contains:()=>false};fields['#main']=main;
 for(const id of ['#agu-caderno-list','#agu-home-notebook-warning','#agu-home-notebook-open'])fields[id]={focus(){this.focused=true},tabIndex:0};
 const document={activeElement:{},head:{appendChild(){}},createElement:()=>({style:{}}),getElementById:id=>fields['#'+id]||null,querySelector:s=>fields[s]||null,querySelectorAll:()=>[],addEventListener(){}};
 const runtime={document,console,Date,Math,Blob,TextEncoder,URLSearchParams,crypto:crypto.webcrypto,location:{search:''},HTMLElement:function(){},setTimeout(){},setInterval(){},alert(){},confirm:()=>true,
  localStorage:{getItem:k=>{if(opts.readBlocked&&k===KEY)throw new Error('SecurityError');return storage.get(k)??null},setItem:(k,v)=>{if(opts.quota&&k===KEY)throw new Error('QuotaExceededError');writes++;storage.set(k,String(v))},removeItem:k=>storage.delete(k)}};
 runtime.window=runtime;vm.createContext(runtime);
 const html=read('index.html');
 for(const [,src] of html.matchAll(/<script\s+src="([^"]+)"/g))vm.runInContext(read(src.split('?')[0]),runtime,{filename:src});
 for(const [,inline] of html.matchAll(/<script>([\s\S]*?)<\/script>/g))vm.runInContext(inline,runtime,{filename:'index-inline'});
 return {runtime,storage,fields,main,writes:()=>writes};
}
let checks=0;function test(label,fn){fn();checks++;console.log('LEG13_NODE_OK',label)}
test('Home sem categoria não grava nem cria marcações ao mostrar zero',()=>{
 const b=boot();assert.equal(b.runtime.AGUHome.notebookPending(),0);assert.match(b.runtime.AGUHome.panel(),/Nenhuma marcação pendente/);assert.equal(b.writes(),0);assert.equal(b.storage.has(KEY),false);
});
test('quatro origens na única categoria; contador considera apenas status, inclusive topic:null',()=>{
 const b=boot(new Map([[KEY,JSON.stringify(READER)]])),raw=b.storage.get(KEY);
 assert.equal(b.runtime.AGUBackup20.validateRecord(KEY,READER),true);assert.equal(b.runtime.AGUHome.notebookPending(),2);
 assert.match(b.runtime.AGUHome.panel(),/2 marcações pendentes/);assert.equal(b.storage.get(KEY),raw);assert.equal(b.writes(),0);
});
test('abertura e retorno focam lista e botão, mantendo anotações e motores externos',()=>{
 const sentinel='{"atividade":"não modificar"}',b=boot(new Map([[KEY,JSON.stringify(READER)],['agu_quiz_planejamento_semanal_v1',sentinel],['agu_estudo_integrado_s16_v1',sentinel]]));
 assert.equal(b.runtime.AGUHome.openNotebook(),true);assert.equal(b.fields['#agu-caderno-list'].focused,true);
 assert.equal(b.runtime.AGULegal.peek().tab,'para_caderno');assert.deepEqual(clone(b.runtime.AGULegal.peek().forNotebook),MARKS);
 b.runtime.AGUHome.returnFromNotebook();assert.equal(b.fields['#agu-home-notebook-open'].focused,true);
 assert.equal(b.storage.get('agu_quiz_planejamento_semanal_v1'),sentinel);assert.equal(b.storage.get('agu_estudo_integrado_s16_v1'),sentinel);
});
test('estado só muda por ação manual persistida; quota faz rollback do status e dos bytes',()=>{
 const b=boot(new Map([[KEY,JSON.stringify(READER)]]));assert.equal(b.runtime.AGUHome.openNotebook(),true);
 assert.equal(b.runtime.AGULegal.notebookSetStatus(MARKS[0].id,'anotado'),true);assert.equal(b.runtime.AGUHome.notebookPending(),1);
 assert.equal(b.runtime.AGULegal.notebookSetStatus(MARKS[0].id,'dispensado'),true);assert.equal(b.runtime.AGUHome.notebookPending(),1);
 assert.equal(b.runtime.AGULegal.notebookSetStatus(MARKS[0].id,'pendente'),true);assert.equal(b.runtime.AGUHome.notebookPending(),2);
 const limited=boot(new Map([[KEY,JSON.stringify(READER)]]),{quota:true}),raw=limited.storage.get(KEY);
 assert.equal(limited.runtime.AGULegal.notebookSetStatus(MARKS[0].id,'anotado'),false);
 assert.equal(limited.storage.get(KEY),raw);assert.equal(limited.runtime.AGUHome.notebookPending(),2);
 assert.equal(limited.runtime.AGUHome.openNotebook(),true);assert.match(limited.main.innerHTML,/Não foi possível gravar a posição/);
});
test('JSON malformado, data, status, ID, tema e origem falsos não são reparados pela Home',()=>{
 const cases=['{JSON',JSON.stringify({...READER,forNotebook:[{...MARKS[0],topic:'ADM-23'}]}),
  JSON.stringify({...READER,forNotebook:[{...MARKS[0],createdAt:'sem data'}]}),
  JSON.stringify({...READER,forNotebook:[{...MARKS[0],status:'feito'}]}),
  JSON.stringify({...READER,forNotebook:[MARKS[0],MARKS[0]]}),
  JSON.stringify({...READER,forNotebook:[{...MARKS[0],origin:'outra_origem'}]}),
  JSON.stringify({...READER,forNotebook:[{...MARKS[0],id:'pc-falso'}]})];
 for(const raw of cases){const b=boot(new Map([[KEY,raw]]));assert.equal(b.runtime.AGUHome.notebookPending(),null);
  assert.equal(b.runtime.AGUHome.openNotebook(),true);assert.match(b.main.innerHTML,/preserve seu backup/);
  assert.equal(b.storage.get(KEY),raw);assert.equal(b.writes(),0);b.runtime.AGUHome.returnFromNotebook();assert.equal(b.storage.get(KEY),raw)}
});
test('SecurityError na leitura não expõe lista nem altera conteúdo',()=>{
 const raw=JSON.stringify(READER),b=boot(new Map([[KEY,raw]]),{readBlocked:true});
 assert.equal(b.runtime.AGUHome.notebookPending(),null);assert.match(b.runtime.AGUHome.panel(),/Contagem indisponível/);
 assert.equal(b.runtime.AGUHome.openNotebook(),true);assert.equal(b.storage.get(KEY),raw);assert.equal(b.writes(),0);
});
test('300/301 marcações, 450/451 caracteres e 500/501 comentários mantêm os limites',()=>{
 const b=boot(),valid=o=>b.runtime.AGUBackup20.validateRecord(KEY,o);
 const full={...READER,forNotebook:Array.from({length:300},(_,i)=>({...MARKS[0],id:'pc-leg13-full'+String(i).padStart(5,'0'),prompt:'a'.repeat(450)}))};
 assert.equal(valid(full),true);assert.equal(valid({...full,forNotebook:[...full.forNotebook,{...MARKS[0],id:'pc-leg13-extra999'}]}),false);
 assert.equal(valid({...READER,forNotebook:[{...MARKS[0],prompt:'a'.repeat(451)}]}),false);
 const ids=b.runtime.AGU_LEGAL_CORPUS.laws.flatMap(l=>l.articles.flatMap(a=>a.clauses.map(c=>c.id)));
 const notes=Object.fromEntries(ids.slice(0,500).map(id=>[id,'sintético']));assert.equal(valid({...READER,notes}),true);
 assert.equal(valid({...READER,notes:{...notes,[ids[500]]:'extra'}}),false);
});
test('backup de nove categorias restaura só ausentes, sem mesclar, e rejeita mais de 12 MB',()=>{
 const b=boot(new Map([[KEY,JSON.stringify(READER)]])),backup=b.runtime.AGUBackup20.capture(),fresh=boot();
 assert.equal(b.runtime.AGUBackup20.keys().length,9);assert.equal(fresh.runtime.AGUBackup20.importMissing(JSON.stringify(backup)).added,1);
 assert.equal(fresh.runtime.AGUBackup20.importMissing(JSON.stringify(backup)).added,0);
 assert.equal(fresh.storage.get(KEY),JSON.stringify(READER));
 assert.throws(()=>b.runtime.AGUBackup20.validateBundle(JSON.stringify({schema:'agu-portable-local-s20-v1',version:1,items:{[KEY]:'x'.repeat(12*1024*1024+1)}})));
});
test('modo demonstração não conta nem abre dados pessoais sintéticos',()=>{
 const b=boot(new Map([[KEY,JSON.stringify(READER)]]));b.runtime.switchDemo();
 assert.match(b.runtime.AGUHome.panel(),/Contagem não exibida na simulação/);assert.equal(b.runtime.AGUHome.openNotebook(),false);
});
test('delta HTML LEG12→LEG13 e todos os demais assets preservados',()=>{
 const prior=JSON.parse(read('tests/fixtures/leg12-deltas.json'));
 const portao=JSON.parse(read('tests/fixtures/leg13-deltas.json'));
 assert.equal(portao.initialMain,'c33716434b42a5656fa1fada62ba754f98b8c93d');assert.equal(portao.productDelta,true);
 const cards=JSON.parse(read('tests/fixtures/cartoes-aud-01-delta.json'));
 const next=require('./hash-chain-cartoes-aud-02.cjs');assert.equal(portao.htmlBeforeSha256,prior.htmlAfterSha256);assert.equal(portao.htmlAfterSha256,cards.htmlBeforeSha256);assert.equal(sha('index.html'),next('index.html',afterCodigos('index.html',cards.htmlAfterSha256)));assert.equal(sha('meu-estudo.js'),afterUx('meu-estudo.js',prior.homeAfterSha256));
 for(const [file,hash] of Object.entries(prior.unchanged)){
  if(file==='revisao-inteligente.js'){assert.equal(hash,cards.reviewBeforeSha256);assert.equal(sha(file),next(file,cards.reviewAfterSha256));continue}
  if(file==='meu-estudo.js'){assert.equal(sha(file),afterUx(file,hash),file);continue}
  assert.equal(sha(file),afterCodigos(file,hash),file);
 }
 for(const [file,hash] of Object.entries(portao.sha256BeforeAndAfter)){
  if(file==='revisao-inteligente.js'){assert.equal(hash,cards.reviewBeforeSha256);assert.equal(sha(file),next(file,cards.reviewAfterSha256));continue}
  if(file==='meu-estudo.js'){assert.equal(sha(file),afterUx(file,hash),file);continue}
  assert.equal(sha(file),afterCodigos(file,hash),file);
 }
});
console.log('LEG13_VALIDACAO_OK',JSON.stringify({checks,origens:4,backup:9,produtoAlterado:'apenas_css_home'}));
