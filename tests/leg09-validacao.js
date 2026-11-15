/* LEG09 — Estudo Integrado alimenta a lista única, sem nova agenda ou caderno digital. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8'),copy=x=>JSON.parse(JSON.stringify(x)),sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const READER='agu_leitor_juridico_s13_v1',STUDY='agu_estudo_integrado_s16_v1',REVIEW='agu_quiz_revisao_inteligente_v1',PLAN='agu_quiz_planejamento_semanal_v1';
const legacy={article:'L9784:art12',unit:'L9784:art12:caput',tab:'para_caderno',mobile:'text',notes:{'L9784:art50:I':'Nota sintética anterior','DL4657:art30:pu':'Nota LINDB sintética'}};
const markReader={id:'pc-leg09-reader0001',lawId:'L4717',articleId:'L4717:art2',unitId:'L4717:art2:pu:e',topic:null,origin:'leitor',prompt:'Distinguir motivo de finalidade.',createdAt:'2026-11-14T20:00:00.000Z',status:'pendente'};
const due={schema:'agu-review-v1',attempts:[],cards:{'ri-adm-01':{stage:1,due:'2000-01-01',seen:1,errors:2}},created:'2026-11-14T20:00:00.000Z'};
let checks=0;function check(name,fn){fn();checks++;console.log('OK LEG09',name)}
function boot(seed=new Map([[READER,JSON.stringify({...legacy,forNotebook:[markReader]})],[REVIEW,JSON.stringify(due)]]),quota=false){
 const records=new Map(seed),fields={};const z={Date,Math,Blob,URLSearchParams,crypto:crypto.webcrypto,location:{pathname:'/agu-quiz/',search:''},history:{replaceState(_a,_b,url){this.url=url}},document:{head:{appendChild(){}},createElement:()=>({}),getElementById:id=>fields[id]||null,querySelector:()=>null,querySelectorAll:()=>[]},localStorage:{getItem:k=>records.get(k)??null,setItem:(k,v)=>{if(quota&&k===READER)throw Error('QuotaExceededError');records.set(k,String(v))},removeItem:k=>records.delete(k)},render(){},setView(v){this.view=v;this.render()},view:'legal'};
 z.window=z;vm.createContext(z);for(const p of ['dados/legislacao-s13.js','revisao-inteligente.js','estudo-integrado.js','leitor-consolidacao.js','leitor-juridico.js','backup-local-s20.js'])vm.runInContext(read(p),z);
 return {z,records,fields};
}
check('cadeia de deltas LEG07/08/09→UX01→LEG10, corpus e planejamento preservados',()=>{
 const n=JSON.parse(read('tests/fixtures/leg09-deltas.json')),p=JSON.parse(read('tests/fixtures/leg08-preservacao.json')),u=JSON.parse(read('tests/fixtures/ux-baralhos-01-delta.json')),t=JSON.parse(read('tests/fixtures/leg10-deltas.json'));
 for(const k of ['reader','backup'])assert.equal(n[k+'AfterSha256'],t[k+'BeforeSha256']);
 for(const k of ['review','html']){assert.equal(n[k+'AfterSha256'],u[k+'BeforeSha256']);assert.equal(u[k+'AfterSha256'],t[k+'BeforeSha256'])}
 for(const [f,k] of [['estudo-integrado.js','studySha256'],['leitor-juridico.js','readerAfterSha256'],['backup-local-s20.js','backupAfterSha256'],['revisao-inteligente.js','reviewAfterSha256'],['index.html','htmlAfterSha256'],['planejamento-semanal.js','plannerSha256'],['dados/legislacao-s13.js','corpusSha256']])assert.equal(sha(read(f)),t[k]);
 assert.equal(n.readerBeforeSha256,p.readerSha256);assert.equal(n.backupBeforeSha256,p.backupSha256);assert.equal(n.reviewBeforeSha256,p.reviewAfterSha256);assert.equal(n.htmlBeforeSha256,p.htmlAfterSha256);
 const {validate}=require('../lib/catalogo-legislativo'),b=boot();assert.deepEqual(copy(validate(b.z.AGU_LEGAL_CORPUS)),{laws:6,articles:292,units:1176,integral:5});assert.equal(b.z.AGUBackup20.keys().length,9);
});
let snapshot,sessionId,studyId;
check('sessão efetiva ADM-06 usa ID existente e salva apenas no forNotebook',()=>{
 const b=boot(),{z,fields,records}=b;assert.equal(z.AGUStudy.start('L4717:art2:pu:e'),false);const session=z.AGUStudy.start('L9784:art12:caput');assert.equal(session.topic,'ADM-06');assert.match(session.id,/^ags-/);sessionId=session.id;
 const reviewBefore=records.get(REVIEW),planBefore=records.get(PLAN),studyBefore=records.get(STUDY),prior=copy(z.AGULegal.peek().forNotebook[0]);
 fields['agu-study-notebook-input']={value:'  Distinguir delegação de avocação e explicar por quê.  '};assert.equal(z.AGUStudy.saveNotebook(true),true);
 const state=copy(z.AGULegal.peek()),m=state.forNotebook[1];studyId=m.id;snapshot={reader:state,study:copy(z.AGUStudy.peek()),records:new Map(records)};
 assert.deepEqual(state.forNotebook[0],prior);assert.equal(m.origin,'estudo_integrado');assert.equal(m.lawId,null);assert.equal(m.articleId,null);assert.equal(m.unitId,null);assert.equal(m.deviceId,session.deviceId);assert.equal(m.sessionId,session.id);assert.equal(m.topic,'ADM-06');assert.match(m.id,/^pc-[a-zA-Z0-9-]{8,130}$/);assert.equal(m.prompt,'Distinguir delegação de avocação e explicar por quê.');assert.equal(m.status,'pendente');assert.ok(Number.isFinite(Date.parse(m.createdAt)));
 assert.equal(JSON.stringify(z.AGUStudy.peek()),JSON.stringify(snapshot.study));assert.equal(records.get(STUDY),studyBefore);assert.equal(records.get(REVIEW),reviewBefore);assert.equal(records.get(PLAN),planBefore);assert.equal(z.AGUBackup20.validateRecord(READER,state),true);
});
check('lista única mostra origem de estudo, estados manuais e retomada segura',()=>{
 const b=boot(snapshot.records),{z}=b;z.AGULegal.tab('para_caderno');assert.match(z.AGULegal.page(),/Retomar sessão de origem/);assert.match(z.AGULegal.page(),/Distinguir delegação de avocação/);
 assert.equal(z.AGULegal.notebookSetStatus(studyId,'anotado'),true);assert.equal(z.AGULegal.peek().forNotebook[1].status,'anotado');assert.equal(z.AGULegal.notebookSetStatus(studyId,'dispensado'),true);assert.equal(z.AGULegal.notebookSetStatus(studyId,'pendente'),true);
 z.AGULegal.notebookEdit(studyId);b.fields['agu-caderno-brief']={value:'Quando a delegação é proibida?'};assert.equal(z.AGULegal.notebookSave(),true);assert.equal(z.AGULegal.peek().forNotebook[1].id,studyId);assert.equal(z.AGULegal.peek().forNotebook[1].sessionId,sessionId);
 assert.equal(z.AGULegal.notebookOrigin(studyId),true);assert.equal(z.AGULegal.peek().tab,'estudo');assert.equal(z.AGULegal.peek().unit,'L9784:art12:caput');assert.equal(z.AGUStudy.active().id,sessionId);assert.match(z.history.url,/dispositivo=L9784%3Aart12%3Acaput/);
});
check('sessão concluída ou ausente não gera referência navegável fictícia',()=>{
 const b=boot(snapshot.records),{z,records}=b;assert.equal(z.AGUStudy.finish(),true);assert.equal(z.AGULegal.notebookCanOpenOrigin(studyId),false);assert.equal(z.AGULegal.notebookOrigin(studyId),false);assert.match(z.AGULegal.tab('para_caderno')||z.AGULegal.page(),/Sessão de origem não disponível/);
 const data=copy(z.AGUStudy.peek());data.sessions=[];data.activeId=null;records.set(STUDY,JSON.stringify(data));const empty=boot(records);assert.equal(empty.z.AGULegal.notebookCanOpenOrigin(studyId),false);assert.equal(empty.z.AGULegal.notebookOrigin(studyId),false);assert.equal(empty.z.AGULegal.peek().forNotebook[1].sessionId,sessionId);
});
check('LEG08 continua exibindo apenas topic exato de cartão já vencido; origem de sessão funciona',()=>{
 const b=boot(snapshot.records),{z,records}=b;z.AGUReview.select('ri-adm-01');assert.equal(z.AGUReview.notebookDue().length,1);assert.equal(z.AGUReview.notebookDue()[0].id,studyId);assert.match(z.AGUReview.page(),/Retomar sessão de estudo/);
 const reviewBefore=records.get(REVIEW);assert.equal(z.AGUReview.notebookOrigin(studyId,true),true);assert.equal(z.view,'legal');assert.equal(z.AGULegal.peek().tab,'estudo');assert.equal(z.AGUReview.returnFromNotebook(),true);assert.equal(z.view,'review');assert.equal(records.get(REVIEW),reviewBefore);
 z.AGUReview.reveal();z.AGUReview.rate('lembrei');assert.equal(z.AGULegal.peek().forNotebook[1].status,'pendente');
 const future={...due,cards:{'ri-adm-01':{stage:1,due:'2999-01-01',seen:1}}},zFuture=boot(new Map([[READER,JSON.stringify(snapshot.reader)],[REVIEW,JSON.stringify(future)],[STUDY,JSON.stringify(snapshot.study)]] )).z;zFuture.AGUReview.select('ri-adm-01');assert.equal(zFuture.AGUReview.notebookDue().length,0);
});
check('origem sem tema comprovado não inicia estudo nem cria marcação',()=>{const b=boot(),{z}=b;assert.equal(z.AGUStudy.start('L4717:art2:pu:e'),false);assert.equal(z.AGULegal.notebookSaveStudy('Ponto indevido'),false);assert.equal(z.AGULegal.peek().forNotebook.length,1);assert.equal(z.AGUBackup20.validateRecord(READER,snapshot.reader),true)});
check('validadores rejeitam currículo presumido, IDs/refs adulterados e duplicidade',()=>{
 const b=boot(),{z}=b,mutations=[x=>x.forNotebook[1].topic='ADM-23',x=>x.forNotebook[1].deviceId='L4717:art2:pu:e',x=>x.forNotebook[1].sessionId='xxx',x=>x.forNotebook[1].lawId='L9784',x=>x.forNotebook[1].unitId='L9784:art12:caput',x=>x.forNotebook[1].origin='inventado',x=>x.forNotebook[1].id=x.forNotebook[0].id,x=>x.forNotebook[1].prompt='x'.repeat(451),x=>x.forNotebook[1].status='feito'];
 for(const change of mutations){const trial=copy(snapshot.reader);change(trial);assert.equal(z.AGUBackup20.validateRecord(READER,trial),false);assert.equal(z.AGULegal.notebookSaveStudy('Teste',false),false)}
});
check('limites 450/451 e 300/301 respeitados com mistura de origens',()=>{
 const b=boot(snapshot.records),{z}=b;assert.equal(z.AGULegal.notebookSaveStudy('x'.repeat(451)),false);assert.equal(z.AGULegal.notebookSaveStudy(' '),false);assert.equal(z.AGULegal.notebookSaveStudy('x'.repeat(450)),true);
 const example=markReader,full={...legacy,forNotebook:[snapshot.reader.forNotebook[1],...Array.from({length:299},(_,i)=>({...example,id:'pc-leg09-'+String(i).padStart(8,'0')}))]};assert.equal(z.AGUBackup20.validateRecord(READER,full),true);assert.equal(z.AGUBackup20.validateRecord(READER,{...full,forNotebook:[...full.forNotebook,{...example,id:'pc-extra00000001'}]}),false);const max=boot(new Map([[READER,JSON.stringify(full)],[STUDY,JSON.stringify(snapshot.study)]]));const before=max.records.get(READER);assert.equal(max.z.AGULegal.notebookSaveStudy('Sem espaço'),false);assert.equal(max.records.get(READER),before);
});
check('quota falha sem gravação parcial da lista nem mudança da sessão',()=>{const b=boot(snapshot.records,true),{z,records}=b,oldReader=records.get(READER),oldStudy=records.get(STUDY);assert.equal(z.AGULegal.notebookSaveStudy('Quota insuficiente'),false);assert.equal(records.get(READER),oldReader);assert.equal(records.get(STUDY),oldStudy);assert.deepEqual(copy(z.AGULegal.peek()),snapshot.reader)});
check('backup de nove categorias: roundtrip, restauração ausente e importação repetida ignorada',()=>{
 const a=boot(snapshot.records),bundle=copy(a.z.AGUBackup20.capture());assert.ok(Object.keys(bundle.items).length<=9);assert.equal(a.z.AGUBackup20.validateBundle(JSON.stringify(bundle)).schema,'agu-portable-local-s20-v1');
 const b=boot(new Map());const out=copy(b.z.AGUBackup20.importMissing(JSON.stringify(bundle)));assert.equal(out.added,Object.keys(bundle.items).length);assert.equal(b.z.AGUBackup20.importMissing(JSON.stringify(bundle)).added,0);
 const c=boot(b.records);assert.deepEqual(copy(c.z.AGULegal.peek()),snapshot.reader);assert.deepEqual(copy(c.z.AGUStudy.peek()),snapshot.study);assert.equal(c.z.AGULegal.peek().forNotebook.length,2);
 const existing=boot(new Map([[READER,JSON.stringify(legacy)]]));const original=existing.records.get(READER);const change=existing.z.AGUBackup20.importMissing(JSON.stringify(bundle));assert.ok(change.skipped>=1);assert.equal(existing.records.get(READER),original);
 const noNotebook=boot(new Map([[READER,JSON.stringify(legacy)]]));assert.equal(noNotebook.z.AGUBackup20.validateRecord(READER,legacy),true);
});
console.log('LEG09_VALIDACAO_OK',JSON.stringify({checks,topic:'ADM-06',backups:9,limits:{marks:300,prompt:450}}));
