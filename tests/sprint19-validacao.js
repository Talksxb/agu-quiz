/* Sprint 19 — invariantes locais; executar: node tests/sprint19-validacao.js
 * Sem dependências externas. Não substitui inspeção visual/mobile ou verificação remota da banca.
 */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const ROOT=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const html=read('index.html');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1].split('?')[0]);
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean);
let passed=0;
function check(name,run){
 run();passed++;console.log('OK',name);
}
check('HTML inline parseável',()=>inline.forEach(s=>new vm.Script(s)));
check('carregamento do lote anterior à Revisão',()=>assert.ok(
 scripts.indexOf('dados/questoes-auditadas-s19.js')>=0 &&
 scripts.indexOf('dados/questoes-auditadas-s19.js')<scripts.indexOf('revisao-inteligente.js')));
check('quatro destinos principais',()=>['dashboard','study','library','evolution'].forEach(x=>
 assert.ok(html.includes('data-view="'+x+'"'))));
const legacy={
 schema:'agu-review-v1',created:new Date().toISOString(),
 attempts:[{id:'rv-existing-001',itemId:'of-2015-adv-006',kind:'official',code:'ADM-23',
 at:new Date().toISOString(),rating:'errei',selected:'C',correct:false,due:'2026-11-13',stage:0}],
 cards:{'of-2015-adv-006':{stage:0,due:'2026-11-13',seen:1,errors:1,ease:'errei'}}
};
const storage=new Map([['agu_quiz_revisao_inteligente_v1',JSON.stringify(legacy)]]);
const localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v))};
const fields={};
const document={
 getElementById:id=>fields[id]||null,
 head:{appendChild(el){fields[el.id]=el}},
 createElement:tag=>({tagName:tag,id:'',textContent:'',style:{},click(){}}),
 querySelectorAll:()=>[]
};
const window={render(){},alert(){},confirm:()=>true};
const sandbox={window,document,localStorage,console,Date,Math};
for(const p of scripts)vm.runInNewContext(read(p),sandbox,{filename:p});
const review=window.AGUReview,questions=window.AGUQuestions18,study=window.AGUStudy,notes=window.AGUCaderno;
const audit=window.AGU_OFFICIAL_S19.questions;
check('três itens Sprint 19',()=>assert.equal(audit.length,3));
check('gabaritos definitivos E,C,E',()=>assert.deepEqual([...audit].map(q=>q.key),['E','C','E']));
check('variante única e cargo certo',()=>audit.forEach(q=>{
 assert.equal(q.exam,'187AGU_001_07');assert.equal(q.cargo,'Advogado da União');
 assert.equal(q.applicationDate,'2015-10-11');assert.equal(q.type,'ce');assert.equal(q.annulled,false);
}));
check('proveniência e fundamentos distintos',()=>audit.forEach(q=>{
 for(const f of ['reference','sourceLot','examUrl','keyUrl','examLocator','keyLocator','historicReason','currentReason','deviceId','primaryCurricularId'])
  assert.ok(q[f],'campo ausente: '+f);
}));
check('Q48 da Sprint 18 preservada',()=>assert.ok(questions.all().some(q=>q.id==='of-2015-adv-048')));
check('quatro IDs auditados e sem duplicatas',()=>{
 assert.equal(questions.all().length,4);
 assert.equal(new Set(questions.all().map(q=>q.id)).size,4);
});
check('36 flashcards preservados',()=>assert.equal(review.deck().flashcards,36));
check('três cláusulas novas presentes',()=>{
 const ids=window.AGU_LEGAL_CORPUS.laws.flatMap(l=>l.articles.flatMap(a=>a.clauses.map(c=>c.id)));
 ['L9784:art50:p1','CF88:art49:V','CF88:art37:X'].forEach(id=>assert.ok(ids.includes(id)));
});
check('links por unidade',()=>audit.forEach(q=>assert.ok(questions.list(q.deviceId).some(x=>x.id===q.id))));
check('busca pelo ID da questão',()=>assert.ok(window.AGUConsolidation.query('of-2015-adv-006','questao','todos').length>0));
check('registro histórico previamente salvo preservado',()=>assert.equal(review.attemptsInfo()[0].id,'rv-existing-001'));
check('sessão por dispositivo',()=>assert.ok(study.start('L9784:art50:p1')));
check('questão abre no mesmo motor de revisão',()=>assert.equal(questions.choose('of-2015-adv-006'),true));
check('resposta ocultada até o envio',()=>assert.ok(!review.focusedHTML().includes('Gabarito definitivo da questão original: E')));
check('revelação e fundamentos separados',()=>{
 review.answer('C');review.reveal();
 assert.ok(review.focusedHTML().includes('Gabarito definitivo da questão original: E'));
 assert.ok(review.focusedHTML().includes('Fundamentação histórica'));
 assert.ok(review.focusedHTML().includes('Direito atual e limites'));
});
check('erro prevalece sobre autoavaliação Fácil',()=>{
 review.rate('facil');
 const a=review.attemptsInfo();
 assert.equal(a.length,2);assert.equal(a.at(-1).rating,'errei');assert.equal(a.at(-1).correct,false);
});
check('uma tentativa e sessão vinculada',()=>{
 const s=study.peek().sessions[0];
 assert.equal(s.attemptIds.length,1);assert.ok(s.questionsSeen.includes('of-2015-adv-006'));
});
check('Caderno guarda nota pessoal, ID e fontes',()=>{
 assert.equal(questions.choose('of-2015-adv-006'),true);
 fields['q18-note']={value:'Minha dúvida pessoal sobre motivação por referência.'};
 assert.equal(questions.note(),true);
 const n=notes.peek().records.at(-1);
 assert.equal(n.origin,'manual');assert.equal(n.deviceId,'L9784:art50:p1');
 assert.ok(n.content.includes('of-2015-adv-006'));assert.ok(n.content.includes('Minha dúvida pessoal'));
 assert.ok(n.content.includes('Gabarito definitivo: https://'));
 assert.equal(n.sources.length,2);assert.ok(n.sources[0].startsWith('https://cdn.cebraspe.org.br/'));
 assert.ok(!n.content.includes('Em 11/10/2015, o art. 50')); // não copiar fundamento
});
check('links Caderno ↔ sessão preservados',()=>assert.equal(study.peek().sessions[0].notes.length,1));
check('sustação pesquisável por dispositivo',()=>assert.ok(window.AGUConsolidation.query('CF88:art49:V','questao','todos').length>0));
check('recortes indicados no Leitor',()=>{
 window.AGULegal.unit('CF88:art49:V');
 assert.ok(window.AGULegal.page().includes('Recorte normativo:'));
});
check('sem questões anuladas promovidas',()=>questions.all().forEach(q=>assert.equal(q.annulled,false)));
check('mesma chave original de histórico',()=>assert.ok(storage.has('agu_quiz_revisao_inteligente_v1')));
console.log('RESULTADO: '+passed+' verificações locais concluídas.');
