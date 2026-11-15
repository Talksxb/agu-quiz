/* LEG10 — questões oficiais pontualmente verificadas alimentam o mesmo forNotebook. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8'),copy=x=>JSON.parse(JSON.stringify(x)),sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const READER='agu_leitor_juridico_s13_v1',REVIEW='agu_quiz_revisao_inteligente_v1',STUDY='agu_estudo_integrado_s16_v1',PLAN='agu_quiz_planejamento_semanal_v1';
const legacy={article:'L9784:art50',unit:'L9784:art50:p1',tab:'questoes',mobile:'related',notes:{'L9784:art50:I':'Nota sintética antiga','L4717:art2:pu:e':'Nota da Ação Popular'}};
const oldMark={id:'pc-leg10-reader0001',lawId:'L4717',articleId:'L4717:art2',unitId:'L4717:art2:pu:e',topic:null,origin:'leitor',prompt:'Distinção entre motivo e finalidade.',createdAt:'2026-11-14T20:00:00.000Z',status:'pendente'};
const due={schema:'agu-review-v1',attempts:[],cards:{'of-2015-adv-006':{stage:1,due:'2000-01-01',seen:1,errors:1}},created:'2026-11-14T20:00:00.000Z'};
let checks=0;function check(name,fn){fn();checks++;console.log('OK LEG10',name)}
function boot(seed=new Map([[READER,JSON.stringify({...legacy,forNotebook:[oldMark]})],[REVIEW,JSON.stringify(due)]]),quota=false){
 const records=new Map(seed),fields={},z={Date,Math,Blob,URLSearchParams,crypto:crypto.webcrypto,location:{pathname:'/agu-quiz/',search:''},history:{replaceState(_a,_b,url){this.url=url}},document:{head:{appendChild(){}},createElement:()=>({}),getElementById:id=>fields[id]||null,querySelector:()=>null,querySelectorAll:()=>[]},localStorage:{getItem:k=>records.get(k)??null,setItem:(k,v)=>{if(quota&&k===READER)throw Error('QuotaExceededError');records.set(k,String(v))},removeItem:k=>records.delete(k)},render(){},setView(v){this.view=v;this.render()},view:'legal'};
 z.window=z;vm.createContext(z);for(const file of ['dados/legislacao-s13.js','dados/questoes-auditadas-s18.js','dados/questoes-auditadas-s19.js','revisao-inteligente.js','estudo-integrado.js','questoes-leitor-s18.js','leitor-consolidacao.js','leitor-juridico.js','backup-local-s20.js'])vm.runInContext(read(file),z);
 return {z,fields,records};
}
check('base, corpus, nove categorias, fixtures LEG09→LEG10→UX02→LEG11→UX03',()=>{
 const old=JSON.parse(read('tests/fixtures/leg09-deltas.json')),ux=JSON.parse(read('tests/fixtures/ux-baralhos-01-delta.json')),d=JSON.parse(read('tests/fixtures/leg10-deltas.json')),v=JSON.parse(read('tests/fixtures/ux-baralhos-02-delta.json')),w=JSON.parse(read('tests/fixtures/leg11-deltas.json')),y=JSON.parse(read('tests/fixtures/ux-baralhos-03-delta.json')),z=JSON.parse(read('tests/fixtures/ux-baralhos-04-delta.json'));
 for(const k of ['reader','backup'])assert.equal(old[k+'AfterSha256'],d[k+'BeforeSha256']);
 for(const k of ['review','html']){assert.equal(ux[k+'BeforeSha256'],old[k+'AfterSha256']);assert.equal(ux[k+'AfterSha256'],d[k+'BeforeSha256'])}
 for(const k of ['review','html'])assert.equal(d[k+'AfterSha256'],v[k+'BeforeSha256']);
 for(const k of ['review','html'])assert.equal(v[k+'AfterSha256'],w[k+'BeforeSha256']);
 for(const k of ['reader','backup'])assert.equal(d[k+'AfterSha256'],w[k+'BeforeSha256']);
 for(const [f,k] of [['questoes-leitor-s18.js','questionSha256'],['leitor-juridico.js','readerAfterSha256'],['backup-local-s20.js','backupAfterSha256'],['estudo-integrado.js','studySha256'],['planejamento-semanal.js','plannerSha256'],['dados/legislacao-s13.js','corpusSha256']])assert.equal(sha(read(f)),w[k]);
 for(const k of ['review','html'])assert.equal(w[k+'AfterSha256'],y[k+'BeforeSha256']);
 for(const k of ['review','html'])assert.equal(y[k+'AfterSha256'],z[k+'BeforeSha256']);
 const leg12=JSON.parse(read('tests/fixtures/leg12-deltas.json'));assert.equal(leg12.htmlBeforeSha256,z.htmlAfterSha256);
 const leg13=JSON.parse(read('tests/fixtures/leg13-deltas.json'));assert.equal(leg13.htmlBeforeSha256,leg12.htmlAfterSha256);
 assert.equal(sha(read('revisao-inteligente.js')),z.reviewAfterSha256);assert.equal(sha(read('index.html')),leg13.htmlAfterSha256);
 assert.equal(sha(read('dados/questoes-auditadas-s18.js')),sha(require('node:child_process').execFileSync('git',['show','HEAD:dados/questoes-auditadas-s18.js'],{cwd:ROOT}))) ;
 const b=boot();assert.equal(b.z.AGUBackup20.keys().length,9);assert.equal(b.z.AGULegal.stats().laws,6);assert.equal(b.z.AGULegal.stats().units,1176);
});
check('quatro itens elegíveis; demais questões não foram promovidas',()=>{
 const {z}=boot();assert.deepEqual(copy(z.AGUQuestions18.all().map(q=>q.id)),['of-2015-adv-048','of-2015-adv-006','of-2015-adv-007','of-2015-adv-009']);
 for(const id of ['of-2015-adv-006','of-2015-adv-007','of-2015-adv-009','of-2015-adv-048'])assert.ok(z.AGUQuestions18.notebookEligible(id));
 for(const id of ['of-2015-adv-001','of-2015-adv-008','of-2023-adv-003','of-2015-adv-015','of-2015-adv-099'])assert.equal(z.AGUQuestions18.notebookEligible(id),null);
 assert.equal(z.AGUQuestions18.notebookHistoricReference('of-2015-adv-099'),null);
 assert.match(z.AGUQuestions18.panel('L9784:art50:p1'),/Para meu caderno|Responder no Leitor/);
});
let saved,markId;
check('marcação opcional em questão já verificada: sem tentativa, estágio, plano ou resposta',()=>{
 const b=boot(),{z,records}=b,beforeReview=records.get(REVIEW),beforeStudy=records.get(STUDY),beforePlan=records.get(PLAN),original=copy(z.AGULegal.peek().forNotebook[0]);
 assert.equal(z.AGUQuestions18.choose('of-2015-adv-006'),true);
 assert.match(z.AGULegal.page(),/Para meu caderno · questão oficial 6/);
 assert.equal(z.AGULegal.notebookSaveQuestion('of-2015-adv-006','  Quando a motivação por remissão é válida?  '),true);
 saved=copy(z.AGULegal.peek());assert.deepEqual(saved.forNotebook[0],original);const m=saved.forNotebook[1];markId=m.id;
 assert.match(m.id,/^pc-[a-zA-Z0-9-]{8,130}$/);assert.equal(m.origin,'questao_verificada');assert.equal(m.questionId,'of-2015-adv-006');assert.equal(m.questionLabel,'AGU 2015 · Q6 · 187AGU_001_07');assert.equal(m.topic,'ADM-17');assert.equal(m.prompt,'Quando a motivação por remissão é válida?');assert.equal(m.status,'pendente');
 assert.deepEqual([m.lawId,m.articleId,m.unitId],[null,null,null]);assert.ok(Number.isFinite(Date.parse(m.createdAt)));
 assert.equal(records.get(REVIEW),beforeReview);assert.equal(records.get(STUDY),beforeStudy);assert.equal(records.get(PLAN),beforePlan);assert.ok(z.AGUBackup20.validateRecord(READER,saved));
});
check('S18 sem coincidência curricular comprovada mantém topic:null',()=>{
 const b=boot(),{z}=b;assert.equal(z.AGULegal.notebookSaveQuestion('of-2015-adv-048','Por que há representação legal sem procuração?'),true);
 const m=z.AGULegal.peek().forNotebook.at(-1);assert.equal(m.topic,null);assert.equal(m.questionId,'of-2015-adv-048');assert.equal(z.AGUBackup20.validateRecord(READER,z.AGULegal.peek()),true);
});
check('lista única: editar, anotado, dispensado, pendente, abrir exatamente a questão',()=>{
 const b=boot(new Map([[READER,JSON.stringify(saved)],[REVIEW,JSON.stringify(due)]])),{z,fields,records}=b;
 z.AGULegal.tab('para_caderno');assert.match(z.AGULegal.page(),/Questão oficial verificada · AGU 2015 · Q6/);
 z.AGULegal.notebookEdit(markId);fields['agu-caderno-brief']={value:'Quando a nota técnica não fundamenta o despacho?'};assert.equal(z.AGULegal.notebookSave(),true);
 assert.equal(z.AGULegal.notebookSetStatus(markId,'anotado'),true);assert.equal(z.AGULegal.notebookSetStatus(markId,'dispensado'),true);assert.equal(z.AGULegal.notebookSetStatus(markId,'pendente'),true);
 const beforeReview=records.get(REVIEW),beforeStudy=records.get(STUDY);
 assert.equal(z.AGULegal.notebookOrigin(markId),true);assert.equal(z.AGULegal.peek().tab,'questoes');assert.equal(z.AGULegal.peek().unit,'L9784:art50:p1');assert.equal(z.AGUQuestions18.selected(),'of-2015-adv-006');assert.match(z.history.url,/dispositivo=L9784%3Aart50%3Ap1/);
 assert.equal(records.get(REVIEW),beforeReview);assert.equal(records.get(STUDY),beforeStudy);
 const m=z.AGULegal.peek().forNotebook[1];assert.equal(m.id,markId);assert.equal(m.createdAt,saved.forNotebook[1].createdAt);assert.equal(m.prompt,'Quando a nota técnica não fundamenta o despacho?');
});
check('questão despublicada: referência histórica preservada, sem link fictício nem inclusão nova',()=>{
 const b=boot(new Map([[READER,JSON.stringify(saved)],[REVIEW,JSON.stringify(due)]])),{z,records}=b;
 const q=z.AGU_OFFICIAL_S19.questions.find(x=>x.id==='of-2015-adv-006');q.status='retirada';
 assert.equal(z.AGUQuestions18.notebookEligible('of-2015-adv-006'),null);assert.equal(z.AGULegal.notebookCanOpenOrigin(markId),false);assert.equal(z.AGULegal.notebookOrigin(markId),false);
 z.AGULegal.tab('para_caderno');assert.match(z.AGULegal.page(),/Questão indisponível nesta versão/);assert.match(z.AGULegal.page(),/AGU 2015 · Q6/);
 const before=records.get(READER);assert.equal(z.AGULegal.notebookSaveQuestion('of-2015-adv-006','Novo texto'),false);assert.equal(records.get(READER),before);assert.equal(z.AGUBackup20.validateRecord(READER,saved),true);
});
check('marcação em cartão vencido apenas por correspondência exata; não completar automaticamente',()=>{
 const b=boot(new Map([[READER,JSON.stringify(saved)],[REVIEW,JSON.stringify(due)]])),{z,records}=b;
 z.AGUReview.select('of-2015-adv-006');assert.equal(z.AGUReview.notebookDue().length,1);assert.equal(z.AGUReview.notebookDue()[0].id,markId);assert.match(z.AGUReview.page(),/Abrir questão de origem/);
 const reviewBefore=records.get(REVIEW);assert.equal(z.AGUReview.notebookOrigin(markId,true),true);assert.equal(z.AGUReview.returnFromNotebook(),true);assert.equal(records.get(REVIEW),reviewBefore);
 z.AGUReview.reveal();z.AGUReview.rate('lembrei');assert.equal(z.AGULegal.peek().forNotebook[1].status,'pendente');
 z.AGUReview.select('ri-adm-01');assert.equal(z.AGUReview.notebookDue().length,0);
 const future=boot(new Map([[READER,JSON.stringify(saved)],[REVIEW,JSON.stringify({...due,cards:{'of-2015-adv-006':{stage:1,due:'2999-01-01',seen:1}}})]]));future.z.AGUReview.select('of-2015-adv-006');assert.equal(future.z.AGUReview.notebookDue().length,0);
});
check('adversários: origem e ID ausentes, currículo falso, duplicatas, datas, status, limites',()=>{
 const {z}=boot();for(const change of [m=>m.questionId='of-2015-adv-099',m=>m.questionLabel='Questão falsa',m=>m.topic='ADM-23',m=>m.lawId='L9784',m=>m.unitId='L9784:art50:p1',m=>m.origin='questao_nao_verificada',m=>m.createdAt='não é data',m=>m.status='feita',m=>m.prompt='x'.repeat(451)]){
  const data=copy(saved),m=data.forNotebook[1];change(m);assert.equal(z.AGUBackup20.validateRecord(READER,data),false);
 }
 const duplicate=copy(saved);duplicate.forNotebook.push({...duplicate.forNotebook[1]});assert.equal(z.AGUBackup20.validateRecord(READER,duplicate),false);
 assert.equal(z.AGULegal.notebookSaveQuestion('of-2015-adv-099','Qualquer'),false);assert.equal(z.AGULegal.notebookSaveQuestion('of-2015-adv-006','x'.repeat(451)),false);assert.equal(z.AGULegal.notebookSaveQuestion('of-2015-adv-006',' '),false);
 assert.equal(z.AGULegal.notebookSaveQuestion('of-2015-adv-006','x'.repeat(450)),true);
 const full={...legacy,forNotebook:[...Array.from({length:299},(_,i)=>({...oldMark,id:'pc-leg10-'+String(i).padStart(8,'0')})),saved.forNotebook[1]]};assert.equal(z.AGUBackup20.validateRecord(READER,full),true);
 assert.equal(z.AGUBackup20.validateRecord(READER,{...full,forNotebook:[...full.forNotebook,{...oldMark,id:'pc-leg10-extra00001'}]}),false);
 const b=boot(new Map([[READER,JSON.stringify(full)]]));const before=b.records.get(READER);assert.equal(b.z.AGULegal.notebookSaveQuestion('of-2015-adv-006','Limite excedido'),false);assert.equal(b.records.get(READER),before);
 const all=z.AGU_LEGAL_CORPUS.laws.flatMap(l=>l.articles.flatMap(a=>a.clauses.map(c=>c.id))),notes=Object.fromEntries(all.slice(0,500).map(id=>[id,'nota']));assert.equal(z.AGUBackup20.validateRecord(READER,{...legacy,notes}),true);assert.equal(z.AGUBackup20.validateRecord(READER,{...legacy,notes:{...notes,[all[500]]:'extra'}}),false);
});
check('quota e backup: rollback, categoria ausente, 12MB e importação repetida idempotente',()=>{
 const bad=boot(new Map([[READER,JSON.stringify(saved)],[REVIEW,JSON.stringify(due)]]),true),before=bad.records.get(READER);
 assert.equal(bad.z.AGULegal.notebookSaveQuestion('of-2015-adv-006','Quota negada'),false);assert.equal(bad.records.get(READER),before);assert.deepEqual(copy(bad.z.AGULegal.peek()),saved);
 const a=boot(new Map([[READER,JSON.stringify(saved)],[REVIEW,JSON.stringify(due)]])),bundle=copy(a.z.AGUBackup20.capture());assert.ok(Object.keys(bundle.items).length<=9);
 const b=boot(new Map());assert.equal(b.z.AGUBackup20.importMissing(JSON.stringify(bundle)).added,2);assert.equal(b.z.AGUBackup20.importMissing(JSON.stringify(bundle)).added,0);
 assert.deepEqual(copy(boot(b.records).z.AGULegal.peek()),saved);
 const existing=boot(new Map([[READER,JSON.stringify(legacy)]])),old=existing.records.get(READER);assert.equal(existing.z.AGUBackup20.importMissing(JSON.stringify(bundle)).skipped,1);assert.equal(existing.records.get(READER),old);
 assert.equal(existing.z.AGUBackup20.validateRecord(READER,legacy),true);
 assert.throws(()=>a.z.AGUBackup20.validateBundle(JSON.stringify({schema:'agu-portable-local-s20-v1',version:1,items:{[READER]:' '.repeat(12*1024*1024+1)}})));
});
console.log('LEG10_VALIDACAO_OK',JSON.stringify({checks,verified:4,backupCategories:9,marksMax:300,promptMax:450}));
