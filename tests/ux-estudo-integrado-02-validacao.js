'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8'),HTML=read('index.html'),KEY='agu_quiz_mvp1_2026';
const afterUx03=require('./hash-chain-ux-estudo-integrado-03.cjs');
const clone=x=>JSON.parse(JSON.stringify(x));
function boot(initial=new Map()){
 const saved=new Map(initial),fields={'#main':{innerHTML:'',contains:()=>false}},flags={quota:false,readBlocked:false};let writes=0;
 for(const id of ['agu-lesson-title','agu-lesson-preview','agu-lesson-status','agu-lesson-target','agu-lesson-confirm','agu-lesson-file'])fields['#'+id]={focus(){this.focused=true}};
 const document={activeElement:{},head:{appendChild(){}},createElement:()=>({style:{}}),getElementById:id=>fields['#'+id]||null,querySelector:s=>fields[s]||null,querySelectorAll:()=>[],addEventListener(){}};
 const e={document,console,Date,Math,Blob,TextEncoder,TextDecoder,URL,URLSearchParams,crypto:crypto.webcrypto,location:{search:''},HTMLElement:function(){},setTimeout(){},setInterval(){},alert(){},confirm:()=>true,
 localStorage:{getItem:k=>{if(flags.readBlocked&&k===KEY)throw Error('SecurityError');return saved.get(k)??null},setItem:(k,v)=>{if(flags.quota&&k===KEY)throw Error('QuotaExceededError');saved.set(k,String(v));writes++},removeItem:k=>saved.delete(k)}};
 e.window=e;vm.createContext(e);
 for(const [,src] of HTML.matchAll(/<script\s+src="([^"]+)"/g))vm.runInContext(read(src.split('?')[0]),e,{filename:src});
 for(const [,inline] of HTML.matchAll(/<script>([\s\S]*?)<\/script>/g))vm.runInContext(inline,e,{filename:'index-inline'});
 return {e,saved,fields,flags,writes:()=>writes,main:fields['#main']};
}
const tasks=[];function test(name,fn){tasks.push([name,fn])}
const bytes=x=>new Blob([x]).size;
test('entrada e modelo não criam histórico, estado ou categoria; data civil não troca de dia',()=>{
 const {e,saved,main}=boot();assert.equal(saved.size,0);e.AGULessonImport.open();assert.match(main.innerHTML,/Trazer aula do ChatGPT/);assert.equal(saved.size,0);
 const l=e.AGULessonImport.example();assert.equal(e.AGULessonImport.validate(l).id,l.id);assert.equal(vm.runInContext("day('2026-11-17')",e),'17/11/2026');assert.equal(e.AGUBackup20.keys().length,9);
});
test('prévia integral, sem equivalência entre ADM-02 pedagógico e ADM-06 granular',()=>{
 const {e,saved,main,fields}=boot(),l=e.AGULessonImport.example();l.assuntoCurricular='ADM-06';l.erros=['Erro relatado na aula; não é resposta do Quiz.'];
 e.AGULessonImport.open();assert.equal(e.AGULessonImport.stage(JSON.stringify(l)),true);assert.equal(saved.size,0);
 assert.equal(e.AGULessonImport.peek().pending.target,'');assert.equal(e.AGULessonImport.peek().pending.confirmed,false);assert.equal(e.AGULessonImport.save(),false);
 assert.match(main.innerHTML,/Módulo pedagógico informado: ADM-02/);assert.match(main.innerHTML,/Código granular informado: ADM-06/);assert.match(main.innerHTML,/Erro relatado/);assert.equal(fields['#agu-lesson-preview'].focused,true);
 assert.equal(e.AGULessonImport.target('CON/Constituição e poder constituinte'),false);assert.equal(e.AGULessonImport.target('ADM/Atos administrativos'),true);assert.equal(saved.size,0);
});
test('um registro aditivo preserva respostas, revisões, sessões, temas, notas e plano',()=>{
 const {e,saved}=boot();e.AGUPlanner.create();e.AGULegal.unit('L9784:art12:caput');e.AGULegal.notebookSaveCard('ri-adm-01','Pergunta sintética anterior?');e.AGUReview.deckStart('ADM-06');e.AGUReview.reveal();e.AGUReview.rate('errei');
 e.AGUStudy.start('L9784:art12:caput');const other=clone([...saved]),l=e.AGULessonImport.example();l.fontes=[{dispositivo:'Referência declarada de demonstração',url:'https://example.org/referencia',verificacao:'a_conferir'}];
 const before=clone(e.AGUPlannerContext());e.AGULessonImport.stage(l);e.AGULessonImport.target('ADM/Atos administrativos');e.AGULessonImport.confirm(true);assert.equal(e.AGULessonImport.save(),true);
 const state=JSON.parse(saved.get(KEY));assert.equal(state.notebook.length,1);const n=state.notebook[0];
 assert.equal(n.id,'chatgpt:'+l.id);assert.equal(n.topic,'ADM/Atos administrativos');assert.equal(n.evidenceCount,0);assert.equal(n.date,l.data);assert.deepEqual(n.answers,[]);assert.deepEqual(n.revisions,[]);
 for(const name of ['sessions','answers','reviews','topic'])assert.deepEqual(state[name],before[name]);for(const [k,v] of other)assert.equal(saved.get(k),v,k);
 assert.equal(e.AGUReview.attemptsInfo().length,1);assert.equal(e.AGUBackup20.validateRecord(KEY,state),true);assert.match(e.md(),/Ponto de retomada no ChatGPT/);assert.match(e.md(),/https:\/\/example.org\/referencia/);
});
test('ID estável deduplica após reload e conflito de conteúdo/destino preserva original',()=>{
 const {e,saved}=boot(),l=e.AGULessonImport.example();e.AGULessonImport.stage(l);e.AGULessonImport.confirm(true);e.AGULessonImport.save();const original=saved.get(KEY),b=boot(saved);
 assert.equal(b.e.AGULessonImport.stage(l),true);assert.equal(b.e.AGULessonImport.peek().pending.status,'duplicate');b.e.AGULessonImport.confirm(true);assert.equal(b.e.AGULessonImport.save(),false);assert.equal(b.saved.get(KEY),original);
 const changed={...l,retomada:'Outro ponto da mesma identidade.'};b.e.AGULessonImport.stage(changed);assert.equal(b.e.AGULessonImport.peek().pending.status,'conflict');assert.equal(b.e.AGULessonImport.save(),false);
 b.e.AGULessonImport.stage(l);b.e.AGULessonImport.target('ADM/Atos administrativos');assert.equal(b.e.AGULessonImport.peek().pending.status,'conflict');assert.equal(b.saved.get(KEY),original);
});
test('síntese sem vínculo e disciplina sem material permanecem registráveis, sem relação inventada',()=>{
 const {e,saved}=boot(),l=e.AGULessonImport.example();l.disciplina='PEN';l.moduloPedagogico='PEN-01';l.assuntoCurricular='PEN-999';e.AGULessonImport.stage(l);
 assert.match(e.AGULessonImport.panel(),/não reconhecido neste acervo/);assert.equal(e.AGULessonImport.target('OUT/Demais tópicos condicionados ao edital'),false);
 e.AGULessonImport.confirm(true);assert.equal(e.AGULessonImport.save(),true);const n=JSON.parse(saved.get(KEY)).notebook[0];assert.equal(n.topic,'Sem vínculo curricular');assert.match(n.summary,/PEN-999/);assert.equal(e.AGULessonImport.goSubject('PEN-999'),false);
});
test('cancelamento, modo demonstração e recusa de confirmação nunca gravam',()=>{
 const {e,saved}=boot(),l=e.AGULessonImport.example();e.AGULessonImport.stage(l);e.AGULessonImport.cancel();assert.equal(e.AGULessonImport.save(),false);assert.equal(saved.size,0);
 e.switchDemo();assert.equal(e.AGULessonImport.stage(l),false);assert.match(e.AGULessonImport.panel(),/Saia da simulação/);assert.equal(saved.size,0);
});
test('JSON malformado, chaves extras/repetidas, HTML, credenciais e conflitos são rejeitados',()=>{
 const {e,saved}=boot(),l=clone(e.AGULessonImport.example());
 const bad=[{...l,extra:true},{...l,data:'2026-02-30'},{...l,id:'nova-aula'},{...l,assuntoCurricular:'CON-50'}, {...l,moduloPedagogico:'CON-02'}, {...l,conceitos:[]}, {...l,erros:['<img src=x onerror=alert(1)>']}, {...l,fontes:[{dispositivo:'x',url:'javascript:alert(1)',verificacao:'a_conferir'}]}, {...l,fontes:[{dispositivo:'x',url:'https://user:pass@example.org/',verificacao:'a_conferir'}]}, {...l,fontes:[{dispositivo:'x',url:null,verificacao:'certificada'}]}];
 for(const value of bad)assert.equal(e.AGULessonImport.stage(JSON.stringify(value)),false,JSON.stringify(value));
 assert.equal(e.AGULessonImport.stage('{inválido'),false);assert.equal(e.AGULessonImport.stage(JSON.stringify(l).replace('{','{"schema":"agu-aula-v1",')),false);
 assert.equal(saved.size,0);
});
test('limites UTF-8, quantidade/texto e JSON de 32.768 bytes são efetivos',()=>{
 const {e}=boot(),l=clone(e.AGULessonImport.example()),raw=JSON.stringify(l);
 const exact=raw+' '.repeat(e.AGULessonImport.MAX_BYTES-bytes(raw));assert.equal(e.AGULessonImport.parse(exact).id,l.id);assert.throws(()=>e.AGULessonImport.parse(exact+' '),/32.768/);
 for(const value of [{...l,conceitos:Array(13).fill('x')},{...l,erros:Array(9).fill('x')},{...l,paraCaderno:Array(9).fill('x')},{...l,conceitos:['x'.repeat(501)]},{...l,retomada:'x'.repeat(801)}])assert.throws(()=>e.AGULessonImport.validate(value));
 const utf={...l,conceitos:Array(12).fill('界'.repeat(500)),erros:Array(8).fill('界'.repeat(500)),paraCaderno:Array(8).fill('界'.repeat(350))};assert.throws(()=>e.AGULessonImport.validate(utf),/32.768/);
});
test('quota ou leitura inválida mantêm bytes e memória; histórico alterado exige nova prévia',()=>{
 const {e,saved,flags}=boot(),l=e.AGULessonImport.example();e.AGULessonImport.stage(l);e.AGULessonImport.confirm(true);flags.quota=true;
 assert.equal(e.AGULessonImport.save(),false);assert.equal(saved.has(KEY),false);assert.equal(e.AGUPlannerContext().notebook.length,0);flags.quota=false;
 e.AGULessonImport.refresh();e.AGULessonImport.confirm(true);const external={version:1,created:'2026-11-17T00:00:00Z',topic:{},answers:[],sessions:[],reviews:[],notebook:[],other:'Campo prévio preservado'};saved.set(KEY,JSON.stringify(external));const bytesBefore=saved.get(KEY);
 assert.equal(e.AGULessonImport.save(),false);assert.equal(saved.get(KEY),bytesBefore);assert.match(e.AGULessonImport.peek().message,/histórico mudou/);
 e.AGULessonImport.refresh();e.AGULessonImport.confirm(true);assert.equal(e.AGULessonImport.save(),true);assert.equal(JSON.parse(saved.get(KEY)).other,external.other);
 flags.readBlocked=true;const before=saved.get(KEY);assert.equal(e.AGULessonImport.stage({...l,id:'aula-outro-registro'}),false);assert.equal(saved.get(KEY),before);flags.readBlocked=false;
 saved.set(KEY,'{quebrado');assert.equal(e.AGULessonImport.stage(l),false);assert.equal(saved.get(KEY),'{quebrado');
});
test('novo registro cabe no backup antigo, restaura na mesma categoria e não duplica',()=>{
 const {e,saved}=boot(),l=e.AGULessonImport.example();e.AGULessonImport.stage(l);e.AGULessonImport.confirm(true);e.AGULessonImport.save();
 const bundle=e.AGUBackup20.capture(),dest=boot();assert.equal(Object.keys(bundle.items).length,1);assert.equal(dest.e.AGUBackup20.importMissing(bundle).added,1);assert.equal(dest.e.AGUBackup20.importMissing(bundle).added,0);
 const restored=boot(dest.saved);assert.equal(restored.e.AGULessonImport.stage(l),true);assert.equal(restored.e.AGULessonImport.peek().pending.status,'duplicate');assert.equal(restored.e.AGUPlannerContext().notebook.length,1);assert.match(restored.e.md(),/Pergunta sintética/);
 const legacy=JSON.parse(saved.get(KEY));legacy.notebook=[];assert.equal(e.AGUBackup20.validateRecord(KEY,legacy),true);
});
test('a leitura mais recente vence e cancelar descarta a leitura pendente',async()=>{
 const {e,saved}=boot(),a=e.AGULessonImport.example(),b={...a,id:'aula-segunda-leitura',titulo:'Segundo arquivo'};let resolve;
 const encode=value=>new TextEncoder().encode(JSON.stringify(value)).buffer;
 const reading=e.AGULessonImport.readFile({files:[{name:'a.json',size:100,arrayBuffer:()=>new Promise(ok=>{resolve=ok})}]});
 assert.equal(await e.AGULessonImport.readFile({files:[{name:'b.json',size:100,arrayBuffer:async()=>encode(b)}]}),true);resolve(encode(a));await reading;assert.equal(e.AGULessonImport.peek().pending.lesson.id,b.id);
 let finish;const second=e.AGULessonImport.readFile({files:[{name:'c.json',size:100,arrayBuffer:()=>new Promise(ok=>{finish=ok})}]});e.AGULessonImport.cancel();finish(encode(a));assert.equal(await second,false);assert.equal(e.AGULessonImport.peek().pending,null);assert.equal(saved.size,0);
 assert.equal(await e.AGULessonImport.readFile({files:[{name:'ruim.json',size:2,arrayBuffer:async()=>new Uint8Array([0xc3,0x28]).buffer}]}),false);assert.match(e.AGULessonImport.peek().message,/UTF-8/);assert.equal(saved.size,0);
});
test('renderização/Markdown não executam marcação e fontes não criam chamadas externas',()=>{
 const {e}=boot(),l=e.AGULessonImport.example();l.titulo='Texto & aspas "';l.conceitos=['![Imagem externa](https://example.org/x)'];e.AGULessonImport.stage(l);e.AGULessonImport.confirm(true);e.AGULessonImport.save();
 const n=e.AGUPlannerContext().notebook[0];assert.doesNotMatch(e.AGULessonImport.recordHTML(n),/<img/i);assert.match(e.AGULessonImport.markdown(n),/\\!\\\[/);assert.doesNotMatch(read('importar-aula.js'),/fetch\(|XMLHttpRequest|localStorage\.(?:set|remove)Item/);
});
test('delta encadeado mantém todos os motores e fixtures históricos byte a byte',()=>{
 const d=JSON.parse(read('tests/fixtures/ux-estudo-integrado-02-delta.json')),sha=f=>crypto.createHash('sha256').update(read(f)).digest('hex');
 for(const [f,c] of Object.entries(d.changed))assert.equal(sha(f),afterUx03(f,c.after),f);for(const [f,h] of Object.entries(d.added))assert.equal(sha(f),afterUx03(f,h),f);for(const set of [d.unchanged,d.historicalFixtures])for(const [f,h] of Object.entries(set))assert.equal(sha(f),h,f);
});
(async()=>{for(const [name,fn] of tasks){await fn();console.log('UX_ESTUDO_02_OK',name)}console.log('UX_ESTUDO_INTEGRADO_02_VALIDACAO_OK',JSON.stringify({checks:tasks.length,backupCategories:9}))})().catch(e=>{console.error(e);process.exitCode=1});
