/* Sprint 20 — testes locais reproduzíveis
   Execução: node tests/sprint19-validacao.js && node tests/sprint20-validacao.js
   Ambiente: Node.js com VM e DOM mínimo. NÃO corresponde a Playwright nem Android físico. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const html=read('index.html');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1].split('?')[0]);
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]).filter(Boolean);
let passed=0;
const check=(name,fn)=>{fn();passed++;console.log('OK',name)};
check('HTML e scripts internos sintaticamente válidos',()=>inline.forEach(x=>new vm.Script(x)));
check('carga ordenada do backup S20 depois dos módulos jurídicos',()=>{
 assert.ok(scripts.includes('backup-local-s20.js'));
 assert.ok(scripts.indexOf('backup-local-s20.js')>scripts.indexOf('leitor-juridico.js'));
});
check('quatro destinos e nenhum quinto',()=>assert.deepEqual([...html.matchAll(/class="nav[^"]*" data-view="([^"]+)"/g)].map(x=>x[1]),['dashboard','study','library','evolution']));
check('backup completo disponível na página Dados',()=>assert.ok(html.includes('window.AGUBackup20?.panel')));
check('responsividade declarada para 430 px',()=>assert.ok(html.includes('@media(max-width:430px)')));
check('preferência de movimento reduzido mantida',()=>assert.ok(html.includes('prefers-reduced-motion:reduce')));
const seed={
 schema:'agu-review-v1',created:'2026-11-12T12:00:00.000Z',
 attempts:[{id:'rv-prior-001',itemId:'of-2015-adv-006',kind:'official',code:'ADM-17',
  at:'2026-11-11T15:00:00.000Z',rating:'errei',selected:'C',correct:false,sourceStatus:'prova_oficial',
  due:'2026-11-12',stage:0}],
 cards:{'of-2015-adv-006':{stage:0,due:'2026-11-12',seen:1,errors:1,ease:'errei'}}
};
const saved=new Map([['agu_quiz_revisao_inteligente_v1',JSON.stringify(seed)]]);
const localStorage={
 getItem:k=>saved.get(k)??null,setItem:(k,v)=>saved.set(k,String(v)),
 removeItem:k=>saved.delete(k)
};
const fields={};
const document={
 getElementById:id=>fields[id]||null,
 head:{appendChild(el){fields[el.id]=el}},
 createElement:tag=>({tagName:tag,id:'',textContent:'',style:{},click(){}}),
 querySelectorAll:()=>[]
};
const window={
 render(){},
 AGUPlannerContext:()=>({disciplines:[['ADM','Administrativo',['Atos administrativos']]],
 sessions:[],answers:[],reviews:[],notebook:[],topic:{}})
};
const context={window,document,localStorage,console,Date,Math};
for(const p of scripts)vm.runInNewContext(read(p),context,{filename:p});
const review=window.AGUReview,planner=window.AGUPlanner,reader=window.AGULegal,notes=window.AGUCaderno;
const study=window.AGUStudy,questions=window.AGUQuestions18,backup=window.AGUBackup20;
check('carregamento de todos os módulos',()=>assert.ok(review&&planner&&reader&&notes&&study&&questions&&backup));
check('quatro itens auditados com IDs únicos',()=>{
 const arr=questions.all();assert.equal(arr.length,4);
 assert.equal(new Set(arr.map(x=>x.id)).size,4);
});
check('36 flashcards e Q48 preservados',()=>{
 assert.equal(review.deck().flashcards,36);
 assert.ok(questions.all().some(x=>x.id==='of-2015-adv-048'));
});
check('Q1 não é certificada por fundamento de decreto posterior',()=>assert.equal(review.focusOfficial('of-2015-adv-001'),false));
check('Q6 ainda abre na revisão auditada',()=>assert.equal(questions.choose('of-2015-adv-006'),true));
check('gabarito oculto antes de responder',()=>assert.ok(!review.focusedHTML().includes('Gabarito definitivo da questão original: E')));
check('revelação correta e duas dimensões jurídicas',()=>{
 review.answer('C');review.reveal();
 const t=review.focusedHTML();
 assert.ok(t.includes('Gabarito definitivo da questão original: E'));
 assert.ok(t.includes('Fundamentação histórica'));
 assert.ok(t.includes('Direito atual e limites'));
});
check('erro e autoavaliação Fácil geram somente uma nova tentativa',()=>{
 review.rate('facil');
 const at=review.attemptsInfo();assert.equal(at.length,2);
 assert.equal(at[0].id,'rv-prior-001');assert.equal(at[1].rating,'errei');assert.equal(at[1].correct,false);
});
check('agendamento segue calendário do mecanismo anterior',()=>{
 const rv=review.reviewInfo('of-2015-adv-006');
 assert.equal(rv.seen,2);assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(rv.due));
});
check('nota manual vinculada a duas fontes oficiais',()=>{
 study.start('CF88:art49:V');
 assert.equal(questions.choose('of-2015-adv-007'),true);
 fields['q18-note']={value:'<img src=x onerror=alert(1)> Minha dificuldade pessoal.'};
 assert.equal(questions.note(),true);
 const n=notes.peek().records[0];
 assert.equal(n.sources.length,2);assert.ok(n.sources.every(s=>s.includes('cebraspe.org.br')));
 assert.equal(n.deviceId,'CF88:art49:V');
 assert.ok(n.content.includes('of-2015-adv-007'));
});
check('conteúdo HTML pessoal escapado ao renderizar',()=>{
 const body=notes.panel({deviceId:'CF88:art49:V',topic:'ADM-27'});
 assert.ok(body.includes('&lt;img'));assert.ok(!body.includes('<img src=x onerror'));
});
check('nota da sessão ligada sem outra base de tentativas',()=>{
 const s=study.peek().sessions[0];assert.equal(s.notes.length,1);
 assert.equal(review.attemptsInfo().length,2);
});
const validAttempt={
 id:'rv-import-abc-2026',itemId:'of-2015-adv-009',kind:'official',code:'ADM-27',
 at:'2026-11-12T15:00:00.000Z',rating:'errei',selected:'C',correct:false,
 sourceStatus:'gabarito_oficial',due:'2026-11-13',stage:0,origin:'prova_oficial'
};
const rb={schema:'agu-review-backup-v1',data:{schema:'agu-review-v1',attempts:[validAttempt],cards:{}}};
check('backup de revisão válido',()=>assert.equal(review.validateBackupObject(rb).length,1));
check('importação de revisão adiciona apenas tentativa nova',()=>assert.equal(review.mergeBackupObject(rb).added,1));
check('importação repetida é idempotente',()=>assert.equal(review.mergeBackupObject(rb).added,0));
check('tentativas repetidas dentro do mesmo arquivo são rejeitadas',()=>assert.throws(()=>review.validateBackupObject({...rb,data:{...rb.data,attempts:[validAttempt,validAttempt]}})));
check('tentativa com campos falsificados é rejeitada',()=>assert.throws(()=>review.validateBackupObject({...rb,data:{...rb.data,attempts:[{...validAttempt,selected:'P',correct:'yes'}]}})));
check('backup de revisão não altera agendamento corrente',()=>assert.equal(review.reviewInfo('of-2015-adv-006').seen,2));
const invalidPlanner={
 schema:'agu-planner-backup-v1',data:{schema:1,settings:{dailyMinutes:[60,60,60,60,60,60,60]},
 weeks:{'2026-11-09':{days:[{},{},{},{},{},{},{}]}}}
};
check('semana de planejamento inválida rejeitada',()=>assert.throws(()=>planner.validateBackupObject(invalidPlanner)));
const week=planner.generate('2026-11-09');
const pb={schema:'agu-planner-backup-v1',data:{schema:1,settings:{dailyMinutes:[130,130,130,130,130,130,0]},weeks:{'2026-11-09':week}}};
check('semana gerada no sistema é válida',()=>assert.equal(planner.validateBackupObject(pb).length,1));
check('importação do planejamento não sobrescreve',()=>{
 assert.equal(planner.mergeBackupObject(pb).added,1);
 assert.equal(planner.mergeBackupObject(pb).added,0);
});
check('metas locais mantidas',()=>assert.equal(planner.settings().dailyMinutes[0],130));
check('backup completo reúne apenas chaves catalogadas',()=>{
 const b=backup.capture();
 assert.ok(Object.keys(b.items).length>=2);
 assert.ok(Object.keys(b.items).every(k=>backup.keys().some(x=>x.key===k)));
});
const bundle=backup.capture();
check('backup completo pode ser validado',()=>assert.equal(backup.validateBundle(bundle).version,1));
check('chaves não reconhecidas são rejeitadas',()=>assert.throws(()=>backup.validateBundle({...bundle,items:{unauthorized:'{}'}})));
check('restauração somente da categoria ausente',()=>{
 const old=localStorage.getItem('agu_quiz_revisao_inteligente_v1');
 localStorage.removeItem('agu_quiz_revisao_inteligente_v1');
 assert.equal(backup.importMissing(bundle).added,1);
 assert.equal(localStorage.getItem('agu_quiz_revisao_inteligente_v1'),old);
});
check('restauração completa repetida não substitui dados',()=>assert.equal(backup.importMissing(bundle).added,0));
check('configuração e fontes seguem sem sincronização remota',()=>{
 assert.ok(!read('backup-local-s20.js').includes('fetch('));
 assert.ok(!read('backup-local-s20.js').includes('XMLHttpRequest'));
});

check('backup principal válido e sem registros pode ser validado',()=>{
 const main={version:1,created:'2026-11-12T10:00:00.000Z',topic:{},answers:[],sessions:[],reviews:[],notebook:[],seed:false};
 assert.equal(backup.validateRecord('agu_quiz_mvp1_2026',main),true);
});
check('backup principal rejeita sessões incompletas',()=>{
 const invalid={version:1,topic:{},answers:[],sessions:[{}],reviews:[],notebook:[]};
 assert.equal(backup.validateRecord('agu_quiz_mvp1_2026',invalid),false);
});
check('backup principal rejeita IDs duplicados',()=>{
 const answer={id:'a1',question:'q1',topic:'ADM/X',date:'2026-11-12T10:00:00.000Z',correct:true};
 const invalid={version:1,topic:{},answers:[answer,answer],sessions:[],reviews:[],notebook:[]};
 assert.equal(backup.validateRecord('agu_quiz_mvp1_2026',invalid),false);
});
for(const [startStage,grade,days] of [[0,'errei',1],[0,'lembrei',7],[1,'lembrei',21],[2,'lembrei',45]]){
 check('agendamento D+'+days+' de calendário local',()=>{
  const key='agu_quiz_revisao_inteligente_v1',source={
   schema:'agu-review-v1',attempts:[],cards:{
    'of-2015-adv-007':{stage:startStage,due:null,seen:1,errors:0,ease:'lembrei'}
   },created:new Date().toISOString()
  };
  const map=new Map([[key,JSON.stringify(source)]]);
  const ls={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,String(v))};
  const w={render(){}},ctx={window:w,localStorage:ls,document};
  for(const p of ['dados/flashcards-aud03-lote01.js','dados/questoes-auditadas-s18.js','dados/questoes-auditadas-s19.js','revisao-inteligente.js'])
   vm.runInNewContext(read(p),ctx,{filename:p});
  assert.equal(w.AGUReview.focusOfficial('of-2015-adv-007'),true);
  w.AGUReview.answer('C');w.AGUReview.reveal();w.AGUReview.rate(grade);
  const actual=JSON.parse(map.get(key)).cards['of-2015-adv-007'].due;
  const t=new Date(),expected=new Date(t.getFullYear(),t.getMonth(),t.getDate(),12);
  expected.setDate(expected.getDate()+days);
  const fmt=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  assert.equal(actual,fmt(expected));
 });
}

console.log('RESULTADO: '+passed+' verificações simuladas concluídas.');
