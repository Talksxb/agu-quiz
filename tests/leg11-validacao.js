/* LEG11 — flashcards reais na mesma lista opcional do leitor, sem agenda nova. */
'use strict';
const afterCodigos=require('./hash-chain-codigos.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8'),copy=x=>JSON.parse(JSON.stringify(x)),sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const READER='agu_leitor_juridico_s13_v1',REVIEW='agu_quiz_revisao_inteligente_v1',STUDY='agu_estudo_integrado_s16_v1',PLAN='agu_quiz_planejamento_semanal_v1';
const legacy={article:'L9784:art50',unit:'L9784:art50:p1',tab:'para_caderno',mobile:'related',notes:{'L9784:art50:I':'Nota sintética anterior','L4717:art2:pu:e':'Nota anterior da Ação Popular'}};
const previous=[
 {id:'pc-leg11-oldreader1',lawId:'L4717',articleId:'L4717:art2',unitId:'L4717:art2:pu:e',topic:null,origin:'leitor',prompt:'Distinguir motivo e finalidade.',createdAt:'2026-11-14T20:00:00.000Z',status:'pendente'},
 {id:'pc-leg11-oldstudy01',lawId:null,articleId:null,unitId:null,deviceId:'L9784:art12:caput',sessionId:'ags-sintetica-001',topic:'ADM-06',origin:'estudo_integrado',prompt:'Quando delegar?',createdAt:'2026-11-14T20:00:00.000Z',status:'anotado'},
 {id:'pc-leg11-oldquestion1',lawId:null,articleId:null,unitId:null,questionId:'of-2015-adv-006',questionLabel:'AGU 2015 · Q6 · 187AGU_001_07',topic:'ADM-17',origin:'questao_verificada',prompt:'Motivação por remissão?',createdAt:'2026-11-14T20:00:00.000Z',status:'dispensado'}
];
const due={schema:'agu-review-v1',attempts:[],cards:{'ri-adm-01':{stage:1,due:'2000-01-01',seen:1,errors:1}},created:'2026-11-14T20:00:00.000Z'};
let count=0;function check(label,fn){fn();count++;console.log('OK LEG11',label)}
function boot(seed=new Map([[READER,JSON.stringify({...legacy,forNotebook:previous})],[REVIEW,JSON.stringify(due)]]),opts={}){
 const store=new Map(seed),fields={},z={Date,Math,Blob,URLSearchParams,crypto:crypto.webcrypto,location:{pathname:'/agu-quiz/',search:''},history:{replaceState(_a,_b,url){this.path=url}},document:{head:{appendChild(){}},createElement:()=>({}),getElementById:id=>fields[id]||null,querySelector:()=>null,querySelectorAll:()=>[]},localStorage:{getItem:k=>store.get(k)??null,setItem:(k,v)=>{if(opts.quota&&k===READER)throw Error('QuotaExceededError');store.set(k,String(v))},removeItem:k=>store.delete(k)},view:'review'};
 z.window=z;z.render=()=>{};z.setView=v=>{z.view=v;z.render()};vm.createContext(z);
 for(const f of ['dados/flashcards-aud03-lote01.js','dados/questoes-auditadas-s18.js','dados/questoes-auditadas-s19.js'])vm.runInContext(read(f),z);
 if(opts.retireCard)z.AGU_AUD03_CARDS=z.AGU_AUD03_CARDS.filter(x=>x.id!==opts.retireCard);
 for(const f of ['revisao-inteligente.js','dados/legislacao-s13.js','estudo-integrado.js','questoes-leitor-s18.js','leitor-consolidacao.js','leitor-juridico.js','backup-local-s20.js'])vm.runInContext(read(f),z);
 return {z,fields,store};
}
let marked,id;
check('36 IDs reais estáveis, origens fechadas, currículo documental somente em ADM-06/CON-50',()=>{
 const {z}=boot(),cards=z.AGUReview.searchCards();assert.equal(cards.length,36);
 const corpusTopics=new Set(z.AGU_LEGAL_CORPUS.laws.flatMap(l=>l.articles.map(a=>a.topic)).filter(Boolean));
 for(const c of cards){const ref=z.AGUReview.notebookHistoricCard(c.id);assert.equal(ref.code,c.code);assert.ok(z.AGUReview.notebookEligibleCard(c.id));assert.ok(ref.topic===null||(ref.topic===c.code&&corpusTopics.has(ref.topic)))}
 for(const id of ['fake-001','of-2015-adv-006','__proto__','ri-adm-099','aud03-flc-099'])assert.equal(z.AGUReview.notebookEligibleCard(id),null);
 assert.equal(z.AGUReview.notebookHistoricCard('ri-adm-01').topic,'ADM-06');assert.equal(z.AGUReview.notebookHistoricCard('ri-adm-05').topic,null);
 assert.equal(z.AGUReview.notebookHistoricCard('ri26-con-01').topic,'CON-50');
 assert.equal(z.AGUBackup20.keys().length,9);assert.equal(z.AGULegal.stats().laws,6);assert.equal(z.AGULegal.stats().units,1176);
});
check('registro explícito, sem revelar, responder, agendar, substituir ou duplicar marca anterior',()=>{
 const {z,store}=boot(),old=copy(z.AGULegal.peek().forNotebook),before=[store.get(REVIEW),store.get(STUDY),store.get(PLAN)];
 assert.equal(z.AGULegal.notebookSaveCard('ri-adm-01','  O que distingue delegação e avocação?  '),true);
 marked=copy(z.AGULegal.peek()),id=marked.forNotebook.at(-1).id;
 assert.deepEqual(marked.forNotebook.slice(0,3),old);assert.deepEqual(marked.forNotebook.map(x=>x.origin),['leitor','estudo_integrado','questao_verificada','flashcard_existente']);
 const m=marked.forNotebook.at(-1);assert.match(m.id,/^pc-[a-zA-Z0-9-]{8,130}$/);assert.equal(m.cardId,'ri-adm-01');assert.equal(m.cardLabel,'Flashcard ri-adm-01 · ADM-06');assert.equal(m.topic,'ADM-06');assert.equal(m.status,'pendente');assert.equal(m.prompt,'O que distingue delegação e avocação?');assert.ok(Date.parse(m.createdAt));assert.deepEqual([m.lawId,m.articleId,m.unitId],[null,null,null]);
 assert.deepEqual([store.get(REVIEW),store.get(STUDY),store.get(PLAN)],before);assert.equal(z.AGUReview.attemptsInfo().length,0);
 assert.equal(z.AGUBackup20.validateRecord(READER,marked),true);
});
check('topic:null mesmo quando cartão usa código não confirmado em norma granular',()=>{
 const {z}=boot();assert.equal(z.AGULegal.notebookSaveCard('ri-adm-05','Quando a motivação é insuficiente?'),true);
 assert.equal(z.AGULegal.peek().forNotebook.at(-1).topic,null);
 assert.equal(z.AGUBackup20.validateRecord(READER,z.AGULegal.peek()),true);
 z.AGUReview.select('ri-adm-05');assert.equal(z.AGUReview.notebookDue().length,0);
});
check('formulário em sessão real preserva revelação, avaliação e os campos do leitor',()=>{
 const {z,fields,store}=boot();
 assert.equal(z.AGUReview.deckStart('ADM-06'),true);const old=store.get(REVIEW),s=z.AGUReview.deckSession(),current=s.order[s.index];
 assert.match(z.AGUReview.page(),/Para meu caderno · flashcard/);assert.match(z.AGUReview.page(),/Para meu caderno · abrir leitor/);
 fields['agu-deck-notebook-input']={value:'Qual a exceção à delegação?'};fields['agu-deck-notebook-status']={textContent:'',focus(){}};
 assert.equal(z.AGUReview.notebookSaveCard(current,'agu-deck-notebook',true),true);
 assert.equal(fields['agu-deck-notebook-status'].textContent,'Marcação guardada para seu caderno físico.');
 assert.equal(fields['agu-deck-notebook-input'].value,'');
 assert.equal(store.get(REVIEW),old);assert.equal(z.AGUReview.deckSession().index,0);assert.equal(z.AGUReview.attemptsInfo().length,0);
});
check('lista única, edição, estados manuais e abertura de cartão existente sem tentativa',()=>{
 const {z,fields,store}=boot(new Map([[READER,JSON.stringify(marked)],[REVIEW,JSON.stringify(due)]]));
 z.AGULegal.tab('para_caderno');assert.match(z.AGULegal.page(),/Flashcard existente · Flashcard ri-adm-01/);
 z.AGULegal.notebookEdit(id);fields['agu-caderno-brief']={value:'Que hipótese impede a delegação?'};assert.equal(z.AGULegal.notebookSave(),true);
 for(const status of ['anotado','dispensado','pendente'])assert.equal(z.AGULegal.notebookSetStatus(id,status),true);
 const review=store.get(REVIEW);assert.equal(z.AGULegal.notebookCanOpenOrigin(id),true);assert.equal(z.AGULegal.notebookOrigin(id),true);assert.equal(z.view,'review');assert.equal(store.get(REVIEW),review);
 assert.equal(z.AGULegal.peek().forNotebook.at(-1).id,id);assert.equal(z.AGULegal.peek().forNotebook.at(-1).createdAt,marked.forNotebook.at(-1).createdAt);
 assert.equal(z.AGULegal.peek().forNotebook.at(-1).prompt,'Que hipótese impede a delegação?');
});
check('cartão retirado do catálogo: histórico legível, arquivo válido, retorno recusado',()=>{
 const source=boot();assert.equal(source.z.AGULegal.notebookSaveCard('aud03-flc-001','Qual é o limite da avocação?'),true);
 const snapshot=copy(source.z.AGULegal.peek()),mark=snapshot.forNotebook.at(-1);
 const b=boot(new Map([[READER,JSON.stringify(snapshot)],[REVIEW,JSON.stringify(due)]]),{retireCard:'aud03-flc-001'});
 assert.equal(b.z.AGUReview.notebookEligibleCard('aud03-flc-001'),null);
 assert.ok(b.z.AGUReview.notebookHistoricCard('aud03-flc-001'));assert.equal(b.z.AGUBackup20.validateRecord(READER,snapshot),true);
 assert.equal(b.z.AGULegal.notebookCanOpenOrigin(mark.id),false);assert.equal(b.z.AGULegal.notebookOrigin(mark.id),false);
 b.z.AGULegal.tab('para_caderno');assert.match(b.z.AGULegal.page(),/Flashcard indisponível nesta versão/);
 const before=b.store.get(READER);assert.equal(b.z.AGULegal.notebookSaveCard('aud03-flc-001','Inventado'),false);assert.equal(b.store.get(READER),before);
});
check('LEG08: somente cartão realmente vencido e código exatamente igual; retorno preserva revisão',()=>{
 const {z,store}=boot(new Map([[READER,JSON.stringify(marked)],[REVIEW,JSON.stringify(due)]]));
 z.AGUReview.select('ri-adm-01');assert.deepEqual(copy(z.AGUReview.notebookDue().map(x=>x.id)),[id]);
 const before=store.get(REVIEW);assert.equal(z.AGUReview.notebookOrigin(id,true),true);assert.match(z.AGUReview.notebookReturnPanel(),/Voltar à revisão programada/);
 assert.equal(z.AGUReview.returnFromNotebook(),true);assert.equal(z.view,'review');assert.equal(z.AGUReview.notebookDue().length,1);assert.equal(store.get(REVIEW),before);
 z.AGUReview.select('ri-adm-05');assert.equal(z.AGUReview.notebookDue().length,0);
 const future=boot(new Map([[READER,JSON.stringify(marked)],[REVIEW,JSON.stringify({...due,cards:{'ri-adm-01':{stage:1,seen:1,due:'2999-01-01'}}})]]));
 future.z.AGUReview.select('ri-adm-01');assert.equal(future.z.AGUReview.notebookDue().length,0);
});
check('validador adversarial: inexistente, campos falsos, IDs repetidos, 300/301, 450/451',()=>{
 const {z}=boot();for(const mutate of [m=>m.cardId='ri-adm-999',m=>m.cardLabel='Falso',m=>m.topic='ADM-23',m=>m.lawId='L9784',m=>m.unitId='L9784:art12:caput',m=>m.origin='flashcard_novo',m=>m.createdAt='não data',m=>m.status='feito',m=>m.prompt='x'.repeat(451)]){
  const obj=copy(marked);mutate(obj.forNotebook.at(-1));assert.equal(z.AGUBackup20.validateRecord(READER,obj),false);
 }
 const duplicate=copy(marked);duplicate.forNotebook.push({...duplicate.forNotebook.at(-1)});assert.equal(z.AGUBackup20.validateRecord(READER,duplicate),false);
 assert.equal(z.AGULegal.notebookSaveCard('of-2015-adv-006','Inexistente'),false);assert.equal(z.AGULegal.notebookSaveCard('ri-adm-01','x'.repeat(451)),false);
 assert.equal(z.AGULegal.notebookSaveCard('ri-adm-01','x'.repeat(450)),true);
 const full={...legacy,forNotebook:[...Array.from({length:299},(_,i)=>({...previous[0],id:'pc-leg11-'+String(i).padStart(8,'0')})),marked.forNotebook.at(-1)]};
 assert.equal(z.AGUBackup20.validateRecord(READER,full),true);assert.equal(z.AGUBackup20.validateRecord(READER,{...full,forNotebook:[...full.forNotebook,{...previous[0],id:'pc-leg11-extra00001'}]}),false);
 const b=boot(new Map([[READER,JSON.stringify(full)]])),before=b.store.get(READER);assert.equal(b.z.AGULegal.notebookSaveCard('ri-adm-01','Excedido'),false);assert.equal(b.store.get(READER),before);
});
check('quota, 500 comentários, backup nove formatos, restauração apenas categoria ausente e idempotência',()=>{
 const bad=boot(new Map([[READER,JSON.stringify(marked)]]),{quota:true}),before=bad.store.get(READER);
 assert.equal(bad.z.AGULegal.notebookSaveCard('ri-adm-01','Quota'),false);assert.equal(bad.store.get(READER),before);assert.deepEqual(copy(bad.z.AGULegal.peek()),marked);
 const a=boot(new Map([[READER,JSON.stringify(marked)],[REVIEW,JSON.stringify(due)]])),bundle=copy(a.z.AGUBackup20.capture());assert.ok(Object.keys(bundle.items).length<=9);
 const b=boot(new Map());assert.equal(b.z.AGUBackup20.importMissing(JSON.stringify(bundle)).added,2);assert.equal(b.z.AGUBackup20.importMissing(JSON.stringify(bundle)).added,0);assert.deepEqual(copy(boot(b.store).z.AGULegal.peek()),marked);
 const existing=boot(new Map([[READER,JSON.stringify(legacy)]])),raw=existing.store.get(READER);assert.equal(existing.z.AGUBackup20.importMissing(JSON.stringify(bundle)).skipped,1);assert.equal(existing.store.get(READER),raw);
 const all=a.z.AGU_LEGAL_CORPUS.laws.flatMap(l=>l.articles.flatMap(ar=>ar.clauses.map(c=>c.id))),notes=Object.fromEntries(all.slice(0,500).map(id=>[id,'nota']));
 assert.equal(a.z.AGUBackup20.validateRecord(READER,{...legacy,notes}),true);assert.equal(a.z.AGUBackup20.validateRecord(READER,{...legacy,notes:{...notes,[all[500]]:'extra'}}),false);
 assert.throws(()=>a.z.AGUBackup20.validateBundle(JSON.stringify({schema:'agu-portable-local-s20-v1',version:1,items:{[READER]:' '.repeat(12*1024*1024+1)}})));
});
check('fontes, corpus e arquivos não relacionados inalterados; fixture LEG11 rastreada',()=>{
 const d=JSON.parse(read('tests/fixtures/leg11-deltas.json')),u=JSON.parse(read('tests/fixtures/ux-baralhos-03-delta.json')),v=JSON.parse(read('tests/fixtures/ux-baralhos-04-delta.json'));
 for(const k of ['review','html'])assert.equal(d[k+'AfterSha256'],u[k+'BeforeSha256']);
 for(const k of ['review','html'])assert.equal(u[k+'AfterSha256'],v[k+'BeforeSha256']);
 const leg12=JSON.parse(read('tests/fixtures/leg12-deltas.json'));assert.equal(leg12.htmlBeforeSha256,v.htmlAfterSha256);
 const leg13=JSON.parse(read('tests/fixtures/leg13-deltas.json'));assert.equal(leg13.htmlBeforeSha256,leg12.htmlAfterSha256);
 const cards=JSON.parse(read('tests/fixtures/cartoes-aud-01-delta.json'));
 assert.equal(v.reviewAfterSha256,cards.reviewBeforeSha256);assert.equal(leg13.htmlAfterSha256,cards.htmlBeforeSha256);
 const next=require('./hash-chain-cartoes-aud-02.cjs');assert.equal(sha(read('revisao-inteligente.js')),next('revisao-inteligente.js',cards.reviewAfterSha256));assert.equal(sha(read('index.html')),next('index.html',afterCodigos('index.html',cards.htmlAfterSha256)));
 for(const [file,key] of [['leitor-juridico.js','readerAfterSha256'],['backup-local-s20.js','backupAfterSha256'],['dados/legislacao-s13.js','corpusSha256'],['planejamento-semanal.js','plannerSha256'],['dados/flashcards-aud03-lote01.js','aud03Sha256']])assert.equal(sha(read(file)),afterCodigos(file,d[key]));
 assert.equal(d.baseCommit,'a1fb2ca');
});
console.log('LEG11_VALIDACAO_OK',JSON.stringify({checks:count,flashcards:36,backupCategories:9,promptMax:450,marksMax:300}));
