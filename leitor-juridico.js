/* AGU Quiz | Sprint 13 - Leitor Jurídico */
(function(root){
'use strict';
const C=root.AGU_LEGAL_CORPUS;
const KEY='agu_leitor_juridico_s13_v1';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const laws=C?.laws||[];
const articles=laws.flatMap(l=>l.articles.map(a=>({...a,law:l})));
const byId=new Map(articles.map(a=>[a.id,a]));
const byUnit=new Map(articles.flatMap(a=>a.clauses.map(c=>[c.id,{article:a,clause:c}])));
const defaults=()=>({article:articles[0]?.id||'',unit:articles[0]?.clauses[0]?.id||'',tab:'juris',mobile:'text',notes:{}});
let state=defaults();
try{const prior=JSON.parse(localStorage.getItem(KEY)||'null');if(prior&&typeof prior==='object'&&prior.notes&&typeof prior.notes==='object')state={...state,...prior}}catch(_){}
if(!byId.has(state.article)){state=defaults()}
if(!byId.get(state.article)?.clauses.some(c=>c.id===state.unit))state.unit=byId.get(state.article)?.clauses[0]?.id;
const tabs=[['juris','Jurisprudência'],['questoes','Questões'],['caderno','Caderno'],['flashcards','Flashcards'],['comentarios','Comentários']];
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function current(){return byId.get(state.article)||articles[0]}
function article(id){const a=byId.get(id);if(!a)return;state.article=id;state.unit=a.clauses[0].id;state.mobile='text';save();root.render?.()}
function unit(id){const x=byUnit.get(id);if(!x)return;state.article=x.article.id;state.unit=id;save();root.render?.()}
function tab(t){if(!tabs.some(x=>x[0]===t))return;state.tab=t;state.mobile='related';save();root.render?.()}
function mobile(t){if(!['text','index','related'].includes(t))return;state.mobile=t;save();root.render?.()}
function step(n){const i=articles.findIndex(a=>a.id===state.article);article(articles[Math.min(articles.length-1,Math.max(0,i+n))].id)}
function note(){const e=document.getElementById('agu-legal-note');if(!e)return;state.notes[state.unit]=e.value.slice(0,14000);save();root.render?.()}
function exportData(){const b=new Blob([JSON.stringify({schema:'agu-reader-backup-v1',data:state},null,2)],{type:'application/json'});const u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download='AGU_Leitor_Comentarios.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),2000)}
function filter(v){const term=String(v).toLowerCase().trim();document.querySelectorAll('#agu-reader .agu-index-entry').forEach(el=>el.hidden=!el.dataset.search.includes(term))}
function related(a){
const c=byUnit.get(state.unit)?.clause;const cards=(Array.isArray(root.AGU_AUD03_CARDS)?root.AGU_AUD03_CARDS:[]).filter(x=>x.code===a.topic);
let s='<p class="agu-muted">Dispositivo: '+esc(c?.label||a.label)+' · '+esc(a.topic)+' · conferência documental parcial.</p>';
if(state.tab==='juris')s+='<div class="agu-notice">Jurisprudência por dispositivo ainda não integrada. A vinculação auditável será implementada na Sprint 14.</div>';
if(state.tab==='questoes')s+='<div class="agu-notice">Questões oficiais sem vinculação individual confirmada nesta sprint. Nenhuma questão ou gabarito foi inventado.</div>';
if(state.tab==='caderno')s+='<div class="agu-notice">O Caderno AGU será relacionado por dispositivo na Sprint 15. Não há registros pessoais sincronizados nesta aba.</div>';
if(state.tab==='flashcards')s+=cards.length?'<p>'+cards.length+' flashcards autorais do tópico '+esc(a.topic)+' (relação temática, não necessariamente com o parágrafo selecionado).</p>'+cards.map(x=>'<div class="agu-notice"><b>'+esc(x.front)+'</b><p class="agu-muted">'+esc(x.source)+' · '+esc(x.audit?.lot)+'</p></div>').join('')+'<button class="agu-primary" onclick="setView(\'review\')">Abrir Revisão Inteligente</button>':'<div class="agu-notice">Nenhum cartão vinculado a este tópico.</div>';
if(state.tab==='comentarios')s+='<label><b>Comentário pessoal deste dispositivo</b><textarea id="agu-legal-note" placeholder="Anotação privada, hipótese ou dúvida">'+esc(state.notes[state.unit]||'')+'</textarea></label><button class="agu-primary" onclick="AGULegal.note()">Salvar anotação</button><p class="agu-muted">Não há sincronização. Não confundir nota pessoal com texto oficial.</p>';
return s;
}
function page(){
if(!articles.length)return '<div class="card">Corpus normativo indisponível. Consulte a publicação.</div>';
const a=current(),pos=articles.findIndex(x=>x.id===a.id);
let nav='<section class="agu-pane agu-index"><h3>Estrutura normativa</h3><input aria-label="Buscar artigos" placeholder="Buscar artigo ou tópico" oninput="AGULegal.filter(this.value)">';
for(const l of laws){nav+='<h4>'+esc(l.title)+'</h4><p class="agu-muted">'+esc(l.section)+'</p>';for(const x of l.articles)nav+='<button class="agu-index-entry '+(x.id===a.id?'selected':'')+'" data-search="'+esc((x.label+' '+x.topic+' '+l.title).toLowerCase())+'" onclick="AGULegal.article(\''+esc(x.id)+'\')">'+esc(x.label)+' · '+esc(x.topic)+'</button>'}nav+='</section>';
let mid='<section class="agu-pane agu-document"><p class="agu-muted">'+esc(a.law.title)+' · '+esc(a.law.section)+'</p><h2>'+esc(a.label)+'</h2><p class="agu-muted">Fonte: '+esc(a.law.sourceVersion)+' · consulta '+esc(a.law.checkedOn)+'</p><p><a href="'+esc(a.law.source)+'" target="_blank" rel="noopener noreferrer">Abrir texto oficial completo da norma</a></p>';
for(const c of a.clauses)mid+='<div class="agu-unit '+(state.unit===c.id?'selected':'')+'" role="button" tabindex="0" onclick="AGULegal.unit(\''+esc(c.id)+'\')" onkeydown="if(event.key===\'Enter\'){AGULegal.unit(\''+esc(c.id)+'\')}"><b>'+esc(c.label)+'</b><p>'+esc(c.text)+'</p></div>';
mid+='<div><button class="agu-light" '+(pos===0?'disabled':'')+' onclick="AGULegal.step(-1)">← Artigo anterior</button><button class="agu-light" '+(pos===articles.length-1?'disabled':'')+' onclick="AGULegal.step(1)">Próximo artigo →</button></div></section>';
let aside='<section class="agu-pane agu-related"><h3>Relacionados ao dispositivo</h3><div class="agu-tabs">'+tabs.map(([key,label])=>'<button aria-pressed="'+(state.tab===key)+'" onclick="AGULegal.tab(\''+key+'\')">'+label+'</button>').join('')+'</div>'+related(a)+'<p class="agu-muted">Origem das normas: fonte oficial. Relações individuais com jurisprudência e provas exigem revisão da Auditoria 03.</p><button class="agu-light" onclick="AGULegal.exportData()">Exportar comentários</button></section>';
return '<div id="agu-reader" data-mobile="'+esc(state.mobile)+'"><div class="top"><div><div class="eyebrow">AGU · LEITOR JURÍDICO · SPRINT 13</div><h1>Legislação contextualizada</h1><div class="muted">Texto oficial · navegação granular · contexto auditável</div></div></div><div class="agu-mobile"><button onclick="AGULegal.mobile(\'index\')">Índice</button><button onclick="AGULegal.mobile(\'text\')">Texto legal</button><button onclick="AGULegal.mobile(\'related\')">Relacionados</button></div><div class="agu-columns">'+nav+mid+aside+'</div></div>';
}
const css='.agu-columns{display:grid;grid-template-columns:minmax(180px,220px) minmax(300px,1fr) minmax(250px,310px);gap:14px;align-items:start}.agu-pane{background:#fff;border:1px solid #dce4e8;border-radius:12px;padding:17px;min-width:0}.agu-index,.agu-related{position:sticky;top:10px;max-height:80vh;overflow-y:auto}.agu-index input{width:100%;padding:10px;border:1px solid #d3dfe4;border-radius:8px}.agu-index-entry{width:100%;text-align:left;display:block;background:#f6f9fa;border:0;border-radius:7px;padding:9px;margin:4px 0}.agu-unit{border-left:3px solid #d7e3e6;padding:12px;line-height:1.65;margin:9px 0;cursor:pointer}.agu-unit.selected,.agu-index-entry.selected{background:#e5f5f2;border-color:#16747a}.agu-unit p{margin:6px 0}.agu-document h2{font-family:Georgia,serif;font-size:25px}.agu-muted{color:#607985;font-size:13px;line-height:1.5}.agu-notice{background:#f0f6f7;padding:11px;border-left:3px solid #77a5a8;border-radius:6px;margin:10px 0}.agu-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}.agu-tabs button,.agu-light,.agu-mobile button{padding:9px;border-radius:7px;border:1px solid #d3e0e4;background:#f4f8f9}.agu-tabs button[aria-pressed=true],.agu-primary{background:#156b70;color:white;padding:10px;border-radius:8px}.agu-related textarea{width:100%;min-height:130px;padding:10px;border:1px solid #ccdadd;border-radius:8px}.agu-mobile{display:none}@media(max-width:850px){.agu-columns{display:block}.agu-pane{margin-bottom:12px}.agu-index,.agu-related{position:static;max-height:none}.agu-mobile{display:flex;gap:7px;margin:12px 0}.agu-mobile button{flex:1}#agu-reader[data-mobile=text] .agu-index,#agu-reader[data-mobile=text] .agu-related,#agu-reader[data-mobile=index] .agu-document,#agu-reader[data-mobile=index] .agu-related,#agu-reader[data-mobile=related] .agu-document,#agu-reader[data-mobile=related] .agu-index{display:none}}';
if(typeof document!=='undefined'&&!document.getElementById('agu-reader-style')){const e=document.createElement('style');e.id='agu-reader-style';e.textContent=css;document.head.appendChild(e)}
root.AGULegal={page,article,unit,tab,mobile,step,note,exportData,filter,peek:()=>JSON.parse(JSON.stringify(state)),stats:()=>({laws:laws.length,articles:articles.length,units:byUnit.size})};
})(window);
