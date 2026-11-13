/* Sprint 29 — tecla Espaço deve ativar as unidades do Leitor com role=button.
 * Reprodução com corpus público e localStorage exclusivamente sintético.
 */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..');
const records=new Map();
const env={window:null,document:{getElementById(){return null},createElement(){return {}},head:{appendChild(){}}},
 localStorage:{getItem:k=>records.get(k)||null,setItem:(k,v)=>records.set(k,String(v))}};
env.window=env;vm.createContext(env);
for(const file of ['dados/legislacao-s13.js','leitor-juridico.js'])
 vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),env,{filename:file});

// Dois dispositivos do mesmo artigo deixam a mudança de seleção observável.
const clause=env.AGU_LEGAL_CORPUS.laws.flatMap(l=>l.articles).find(a=>a.clauses.length>1);
assert.ok(clause,'corpus precisa oferecer subdivisões para testar a navegação granular');
env.AGULegal.article(clause.id);
const html=env.AGULegal.page();
const matches=[...html.matchAll(/<div class="agu-unit[^\"]*" role="button" tabindex="0" onclick="AGULegal\.unit\('([^']+)'\)" onkeydown="([^"]+)"/g)];
assert.ok(matches.length>1,'unidades devem ter controle acessível e onkeydown');
const [first,second]=matches;
assert.equal(env.AGULegal.peek().unit,first[1]);
function press(m,key){
 let prevented=false;env.event={key,preventDefault(){prevented=true}};
 vm.runInContext(m[2],env,{filename:'leitor-juridico.js#onkeydown'});
 return prevented;
}
assert.equal(press(second,'x'),false,'tecla não ativadora não deve interferir');
assert.equal(env.AGULegal.peek().unit,first[1]);
assert.equal(press(second,' '),true,'Espaço precisa impedir rolagem ao ativar role=button');
assert.equal(env.AGULegal.peek().unit,second[1],'Espaço precisa selecionar a unidade');
assert.equal(press(first,'Enter'),true,'Enter também deve ativar sem rolagem');
assert.equal(env.AGULegal.peek().unit,first[1]);
const restored=JSON.parse(records.get('agu_leitor_juridico_s13_v1'));
assert.equal(restored.unit,first[1],'seleção acessível deve persistir localmente');
console.log('S29_LEITOR_TECLADO',JSON.stringify({article:clause.id,space:true,enter:true,naoAtivadora:true,persistido:true}));
