/* LEG12 — atalho da Home para a lista única, sem escrita na consulta nem agenda nova. */
'use strict';
const legacyIndexDigest=require('./livro-sites-001-legado.cjs');
const afterCodigos=require('./hash-chain-codigos.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8'),sha=p=>crypto.createHash('sha256').update(read(p)).digest('hex');
const KEY='agu_leitor_juridico_s13_v1',REVIEW='agu_quiz_revisao_inteligente_v1',PLAN='agu_quiz_planejamento_semanal_v1',STUDY='agu_estudo_integrado_s16_v1';
const marks=[
 {id:'pc-leg12-reader0001',lawId:'L4717',articleId:'L4717:art2',unitId:'L4717:art2:pu:e',topic:null,origin:'leitor',prompt:'Motivo versus finalidade?',createdAt:'2026-11-14T20:00:00.000Z',status:'pendente'},
 {id:'pc-leg12-study00001',lawId:null,articleId:null,unitId:null,deviceId:'L9784:art12:caput',sessionId:'ags-leg12-001',topic:'ADM-06',origin:'estudo_integrado',prompt:'Delegação e avocação?',createdAt:'2026-11-14T20:00:00.000Z',status:'anotado'},
 {id:'pc-leg12-question01',lawId:null,articleId:null,unitId:null,questionId:'of-2015-adv-006',questionLabel:'AGU 2015 · Q6 · 187AGU_001_07',topic:'ADM-17',origin:'questao_verificada',prompt:'Motivação por remissão?',createdAt:'2026-11-14T20:00:00.000Z',status:'dispensado'},
 {id:'pc-leg12-card00001',lawId:null,articleId:null,unitId:null,cardId:'ri-adm-01',cardLabel:'Flashcard ri-adm-01 · ADM-06',topic:'ADM-06',origin:'flashcard_existente',prompt:'Quando avocar?',createdAt:'2026-11-14T20:00:00.000Z',status:'pendente'}
];
const reader={article:'L4717:art2',unit:'L4717:art2:pu:e',tab:'juris',mobile:'text',notes:{'L4717:art2:pu:e':'Nota anterior sintética'},forNotebook:marks};
const clone=x=>JSON.parse(JSON.stringify(x));
function boot(seed=new Map(),opts={}){
 const store=new Map(seed),fields={};let writes=0;
 const main={innerHTML:'',contains:()=>false};fields['#main']=main;
 fields['#main h1']={focus(){},tabIndex:0};
 fields['#agu-caderno-list']={focus(){this.focused=true},tabIndex:0};
 fields['#agu-home-notebook-warning']={focus(){this.focused=true},tabIndex:0};
 fields['#agu-home-notebook-open']={focus(){this.focused=true}};
 const document={activeElement:{},head:{appendChild(){}},createElement:()=>({style:{}}),getElementById:id=>fields[id]||null,querySelector:s=>fields[s]||null,querySelectorAll:()=>[],addEventListener(){}};
 const e={document,console,Date,Math,Blob,TextEncoder,URLSearchParams,crypto:crypto.webcrypto,location:{search:''},HTMLElement:function(){},setTimeout(){},setInterval(){},alert(){},confirm:()=>true,
  localStorage:{getItem:k=>{if(opts.blockRead)throw Error('SecurityError');return store.get(k)??null},setItem:(k,v)=>{if(opts.quota&&k===KEY)throw Error('QuotaExceededError');writes++;store.set(k,String(v))},removeItem:k=>store.delete(k)}};
 e.window=e;vm.createContext(e);
 const html=read('index.html'),files=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1].split('?')[0]);
 for(const f of files)vm.runInContext(read(f),e,{filename:f});
 for(const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g))vm.runInContext(m[1],e,{filename:'index-inline'});
 return {e,store,fields,main,writes:()=>writes};
}
let tests=0;function check(name,fn){fn();tests++;console.log('OK LEG12',name)}
check('Home vazia usa só leitura e mostra estado claro sem criar categoria',()=>{
 const b=boot(),before=JSON.stringify([...b.store]);assert.equal(b.e.AGUHome.notebookPending(),0);
 assert.match(b.e.AGUHome.panel(),/Para meu caderno/);assert.match(b.e.AGUHome.panel(),/Nenhuma marcação pendente/);
 assert.equal(JSON.stringify([...b.store]),before);assert.equal(b.writes(),0);
});
check('quatro origens validadas: só duas pendentes, inclusive topic:null, sem duplicar lista',()=>{
 const b=boot(new Map([[KEY,JSON.stringify(reader)]])),raw=b.store.get(KEY);
 assert.equal(b.e.AGUBackup20.validateRecord(KEY,reader),true);assert.equal(b.e.AGUHome.notebookPending(),2);
 assert.match(b.e.AGUHome.panel(),/2 marcações pendentes/);assert.doesNotMatch(b.e.AGUHome.panel(),/Motivo versus finalidade/);
 assert.equal(b.store.get(KEY),raw);assert.equal(b.writes(),0);assert.equal(b.e.AGUBackup20.keys().filter(x=>x.key!=='agu_livros_reader_v1').length,9);
});
check('atalho navega à lista única e volta à Home com foco, sem alterar revisão, plano, estudo ou notas',()=>{
 const b=boot(new Map([[KEY,JSON.stringify(reader)]])),raw=b.store.get(KEY),other=[b.store.get(REVIEW),b.store.get(PLAN),b.store.get(STUDY)];
 assert.equal(b.e.AGUHome.openNotebook(),true);assert.equal(b.e.AGULegal.peek().tab,'para_caderno');
 assert.match(b.main.innerHTML,/id="agu-caderno-list"/);assert.match(b.main.innerHTML,/id="agu-home-notebook-return"/);
 assert.equal((b.main.innerHTML.match(/id="agu-caderno-list"/g)||[]).length,1);
 assert.equal(b.fields['#agu-caderno-list'].focused,true);
 assert.deepEqual(clone(b.e.AGULegal.peek().forNotebook),marks);assert.deepEqual(clone(b.e.AGULegal.peek().notes),reader.notes);
 assert.deepEqual([b.store.get(REVIEW),b.store.get(PLAN),b.store.get(STUDY)],other);
 assert.equal(JSON.parse(b.store.get(KEY)).notes['L4717:art2:pu:e'],reader.notes['L4717:art2:pu:e']);
 assert.equal(b.e.AGUHome.returnFromNotebook(),undefined);assert.match(b.main.innerHTML,/id="agu-home-notebook-open"/);
 assert.equal(b.fields['#agu-home-notebook-open'].focused,true);assert.match(b.main.innerHTML,/2 marcações pendentes/);
 assert.notEqual(b.store.get(KEY),raw,'somente a posição do leitor é persistida pela API de aba preexistente');
});
check('mudança exclusivamente manual reflete nova contagem sem trocar IDs ou cronograma',()=>{
 const b=boot(new Map([[KEY,JSON.stringify(reader)]]));b.e.AGUHome.openNotebook();
 assert.equal(b.e.AGULegal.notebookSetStatus(marks[0].id,'anotado'),true);
 b.e.AGUHome.returnFromNotebook();assert.equal(b.e.AGUHome.notebookPending(),1);
 assert.deepEqual(clone(b.e.AGULegal.peek().forNotebook.map(m=>m.id)),marks.map(m=>m.id));
 assert.equal(b.e.AGULegal.notebookSetStatus(marks[0].id,'dispensado'),true);
 assert.equal(b.e.AGUHome.notebookPending(),1);assert.equal(b.e.AGULegal.notebookSetStatus(marks[0].id,'pendente'),true);
 assert.equal(b.e.AGUHome.notebookPending(),2);assert.equal(b.store.has(REVIEW),false);
});
check('categoria inválida não é regravada ao abrir; Home avisa e permite retorno',()=>{
 const invalid={...reader,forNotebook:[{...marks[0],topic:'ADM-23'}]};
 const b=boot(new Map([[KEY,JSON.stringify(invalid)]])),raw=b.store.get(KEY);
 assert.equal(b.e.AGUHome.notebookPending(),null);assert.match(b.e.AGUHome.panel(),/Contagem indisponível/);
 assert.equal(b.e.AGUHome.openNotebook(),true);assert.match(b.main.innerHTML,/id="agu-home-notebook-warning"/);
 assert.equal(b.store.get(KEY),raw);assert.equal(b.writes(),0);b.e.AGUHome.returnFromNotebook();
 assert.equal(b.store.get(KEY),raw);
});
check('SecurityError e quota não apagam marcações e apresentam aviso neutro',()=>{
 const unreadable=boot(new Map([[KEY,JSON.stringify(reader)]]),{blockRead:true});
 assert.equal(unreadable.e.AGUHome.notebookPending(),null);assert.match(unreadable.e.AGUHome.panel(),/Contagem indisponível/);
 assert.equal(unreadable.e.AGUHome.openNotebook(),true);assert.equal(unreadable.writes(),0);
 const limited=boot(new Map([[KEY,JSON.stringify(reader)]]),{quota:true}),raw=limited.store.get(KEY);
 assert.equal(limited.e.AGUHome.openNotebook(),true);assert.match(limited.main.innerHTML,/Não foi possível gravar a posição/);
 assert.equal(limited.store.get(KEY),raw);assert.deepEqual(clone(limited.e.AGULegal.peek().forNotebook),marks);
});
check('simulação de Home não expõe dados locais e mantém atalho desabilitado',()=>{
 const b=boot(new Map([[KEY,JSON.stringify(reader)]]));b.e.switchDemo();const html=b.e.AGUHome.panel();
 assert.match(html,/Contagem não exibida na simulação/);assert.match(html,/id="agu-home-notebook-open"[^>]*disabled/);
 assert.doesNotMatch(html,/2 marcações pendentes/);assert.equal(b.e.AGUHome.openNotebook(),false);
});
check('reload e backups S20: nove categorias, importMissing idempotente, legado aceito',()=>{
 const b=boot(new Map([[KEY,JSON.stringify(reader)]]));const exported=b.e.AGUBackup20.capture();
 const fresh=boot(),result=fresh.e.AGUBackup20.importMissing(JSON.stringify(exported));assert.equal(result.added,1);
 assert.equal(fresh.e.AGUBackup20.importMissing(JSON.stringify(exported)).added,0);
 assert.equal(fresh.store.get(KEY),JSON.stringify(reader));assert.equal(boot(fresh.store).e.AGUHome.notebookPending(),2);
 const present=boot(new Map([[KEY,JSON.stringify({...reader,forNotebook:undefined})]]));
 assert.equal(present.e.AGUBackup20.validateRecord(KEY,JSON.parse(present.store.get(KEY))),true);
 const original=present.store.get(KEY);assert.equal(present.e.AGUBackup20.importMissing(JSON.stringify(exported)).added,0);
 assert.equal(present.store.get(KEY),original);assert.equal(present.e.AGUHome.notebookPending(),0);
});
check('limites anteriores preservados: 300/301, 450/451, 500/501 comentários e 12 MB',()=>{
 const b=boot(),valid=o=>b.e.AGUBackup20.validateRecord(KEY,o);
 const full={...reader,forNotebook:Array.from({length:300},(_,i)=>({...marks[0],id:'pc-leg12-n'+String(i).padStart(8,'0'),prompt:'x'.repeat(450)}))};
 assert.equal(valid(full),true);assert.equal(valid({...full,forNotebook:[...full.forNotebook,{...marks[0],id:'pc-leg12-extra001'}]}),false);
 assert.equal(valid({...reader,forNotebook:[{...marks[0],prompt:'x'.repeat(451)}]}),false);
 assert.equal(valid({...reader,forNotebook:[marks[0],{...marks[0]}]}),false);
 assert.equal(valid({...reader,forNotebook:[{...marks[0],status:'feito'}]}),false);
 const ids=b.e.AGU_LEGAL_CORPUS.laws.flatMap(l=>l.articles.flatMap(a=>a.clauses.map(c=>c.id)));
 const notes=Object.fromEntries(ids.slice(0,500).map(k=>[k,'nota sintética']));
 assert.equal(valid({...reader,notes}),true);assert.equal(valid({...reader,notes:{...notes,[ids[500]]:'extra'}}),false);
 assert.throws(()=>b.e.AGUBackup20.validateBundle(JSON.stringify({schema:'agu-portable-local-s20-v1',version:1,items:{[KEY]:' '.repeat(12*1024*1024+1)}})));
});
check('hashes encadeados UX03→UX04→LEG12 e módulos fora da Home intocados',()=>{
 const prior=JSON.parse(read('tests/fixtures/ux-baralhos-04-delta.json'));
 const now=JSON.parse(read('tests/fixtures/leg12-deltas.json'));
 assert.equal(now.baseCommit,'7fe92d1ffc0b3b7cfe398d90d1172feefb778621');
 assert.equal(now.reconciledMain,'aa4fff6791bbffa57c649be119769bc4c0a9912e');
 assert.equal(now.htmlBeforeSha256,prior.htmlAfterSha256);assert.equal(now.homeBeforeSha256,prior.unchanged['meu-estudo.js']);
 const leg13=JSON.parse(read('tests/fixtures/leg13-deltas.json'));assert.equal(leg13.htmlBeforeSha256,now.htmlAfterSha256);
 const cards=JSON.parse(read('tests/fixtures/cartoes-aud-01-delta.json'));
 assert.equal(leg13.htmlAfterSha256,cards.htmlBeforeSha256);
 const next=require('./hash-chain-cartoes-aud-02.cjs');assert.equal(legacyIndexDigest(),next('index.html',afterCodigos('index.html',cards.htmlAfterSha256)));assert.equal(sha('meu-estudo.js'),now.homeAfterSha256);
 for(const [file,hash] of Object.entries(now.unchanged)){
  if(file==='revisao-inteligente.js'){assert.equal(hash,cards.reviewBeforeSha256);assert.equal(sha(file),next(file,cards.reviewAfterSha256));continue}
  assert.equal(sha(file),afterCodigos(file,hash),file);
 }
});
console.log('LEG12_VALIDACAO_OK',JSON.stringify({tests,origins:4,backupCategories:9,limit:300,textMax:450}));
