/* Sprint 30: foco de teclado perdido quando o Leitor substitui o DOM.
 * Reproduz a interação com corpus público, DOM sintético e storage isolado.
 */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..');
const records=new Map();
const body={tagName:'BODY'};
const document={
  body,activeElement:body,selected:null,focusOptions:[],focusCount:0,
  getElementById(){return null},createElement(){return {}},head:{appendChild(){}},
  querySelector(selector){return selector==='#agu-reader .agu-unit.selected'?this.selected:null}
};
const env={window:null,document,
  localStorage:{getItem:k=>records.get(k)||null,setItem:(k,v)=>records.set(k,String(v))},
  render(){document.activeElement=body;
    document.selected={tagName:'DIV',deviceId:env.AGULegal.peek().unit,
      focus(options){document.activeElement=this;document.focusOptions.push(options);document.focusCount++}};
  }};
env.window=env;vm.createContext(env);
for(const file of ['dados/legislacao-s13.js','leitor-juridico.js'])
  vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),env,{filename:file});

const article=env.AGU_LEGAL_CORPUS.laws.flatMap(l=>l.articles).find(a=>a.clauses.length>1);
assert.ok(article,'corpus contém subdivisões para navegar com Tab');
env.AGULegal.article(article.id);
const handlers=[...env.AGULegal.page().matchAll(/<div class="agu-unit[^"]*" role="button" tabindex="0" onclick="AGULegal\.unit\('([^']+)'\)" onkeydown="([^"]+)"/g)];
assert.ok(handlers.length>1,'duas unidades acionáveis por teclado');
const [first,second]=handlers;
function press(handler,key){
  let prevented=false;
  document.activeElement={tagName:'DIV',deviceId:handler[1]};
  env.event={key,preventDefault(){prevented=true}};
  vm.runInContext(handler[2],env,{filename:'leitor-juridico.js#onkeydown'});
  return prevented;
}
assert.equal(press(second,' '),true,'Espaço ativa e bloqueia rolagem');
assert.equal(env.AGULegal.peek().unit,second[1],'seleção mudou');
assert.equal(document.activeElement?.deviceId,second[1],
  'o foco deve retornar à unidade selecionada após a rerenderização');
assert.equal(press(first,'Enter'),true,'Enter continua ativador');
assert.equal(document.activeElement?.deviceId,first[1],
  'Enter também devolve foco à unidade reconstituída');
assert.equal(document.focusCount,2,'uma recuperação de foco por ativação por teclado');
assert.ok(document.focusOptions.every(x=>x?.preventScroll===true),'não forçar rolagem');
assert.equal(press(second,'x'),false,'tecla neutra não ativa');
assert.equal(env.AGULegal.peek().unit,first[1],'tecla neutra não muda o estado');
assert.equal(document.activeElement?.deviceId,second[1],'tecla neutra não troca foco');
assert.equal(JSON.parse(records.get('agu_leitor_juridico_s13_v1')).unit,first[1],'estado permanece local');
console.log('S30_FOCO_LEITOR_OK',JSON.stringify({article:article.id,space:true,enter:true,
  restored:document.focusCount,neutralKey:true,storage:true}));
