/* UX-BARALHOS-01: identidade visual pública, sem reproduzir a matriz privada. */
(function(root){
'use strict';
// Códigos e nomes do currículo legado público (index.html / const D).
// As cores nunca representam nota, dificuldade ou incidência histórica.
const rows=[
 ['ADM','Direito Administrativo','#175e77','#e6f3f7','#a7deed','#173943'],
 ['CON','Direito Constitucional','#6638a1','#f1ebfa','#d9c4f5','#35224d'],
 ['FIN','Direito Financeiro','#946019','#fff1dd','#f4d6a2','#4a341e'],
 ['PC','Direito Processual Civil','#137467','#e5f5ef','#a7e4d3','#173e38'],
 ['TRIB','Direito Tributário','#99522d','#fbece5','#f3c6af','#4c3027'],
 ['CIV','Direito Civil','#385d9c','#eaf0fa','#bfd4f5','#253955'],
 ['EMP','Direito Empresarial','#72531e','#f6f0dc','#e5d6a2','#40361d'],
 ['TRAB','Direito do Trabalho','#a03c64','#faeaf0','#f2b4cf','#4e2537'],
 ['PREV','Direito Previdenciário','#396e46','#e8f4e9','#b7e1c1','#233e2b'],
 // SEG é o prefixo dos IDs originais; PREV permanece como agrupamento legado.
 ['SEG','Direito da Seguridade Social','#396e46','#e8f4e9','#b7e1c1','#233e2b'],
 ['INT','Direito Internacional','#285d93','#e8f1fb','#b1d7f7','#22384e'],
 ['AMB','Direito Ambiental','#3f7047','#e8f5e8','#b8e5bd','#203c29'],
 ['ECO','Direito Econômico','#806224','#f5efdc','#e5d4a0','#41371e'],
 ['DH','Direitos Humanos','#8d3b83','#f9eaf7','#edb9e5','#482643'],
 ['OUT','Complementares — a auditar','#4b5f6b','#eaf0f3','#c5d6e0','#273b47']
];
const catalogue=Object.freeze(rows.map(([code,name,light,lightBg,dark,darkBg])=>Object.freeze({code,name,light,lightBg,dark,darkBg})));
const byCode=new Map(catalogue.map(x=>[x.code,x]));
const fallback=Object.freeze({code:'—',name:'Disciplina não identificada',light:'#455a64',lightBg:'#edf2f4',dark:'#d7e3e8',darkBg:'#273b47'});
function forTopic(topic){return byCode.get(String(topic||'').split('-')[0])||fallback}
function cssVars(topic){const d=forTopic(topic);return `--deck-accent:${d.light};--deck-soft:${d.lightBg};--deck-dark-accent:${d.dark};--deck-dark-soft:${d.darkBg}`}
// Contrato opcional futuro: sem estatística validada, a resposta é null.
// Não introduz ranqueamento, fonte remota nem prioridade presumida.
function verifiedFrequency(payload,topic){
 if(payload?.schema!=='agu-frequencia-verificada-v1'||payload.status!=='verificado'||!payload.source||!Array.isArray(payload.topics))return null;
 const entry=payload.topics.find(x=>x?.code===topic&&x.status==='verificado');
 return entry&&Number.isFinite(entry.weight)&&entry.weight>=0&&entry.weight<=1?entry:null;
}
root.AGUDisciplines=Object.freeze({list:()=>catalogue.slice(),byCode:code=>byCode.get(code)||null,forTopic,cssVars,verifiedFrequency});
})(window);
