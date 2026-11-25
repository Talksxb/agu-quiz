(function(root){
'use strict';
const KEY='agu_gov_003_treino_vigente_v1';
const CE=[{key:'C',text:'Certo'},{key:'E',text:'Errado'}], MC=['A','B','C','D','E'];
const choices=q=>q?.format==='multiple_choice'?q.options:(q?.format===undefined||q?.format==='ce')&&q?.options===undefined?CE:null;
const sourceValid=s=>s&&['organizer','contest','variant','date','license'].every(k=>typeof s[k]==='string'&&s[k].trim())&&['examUrl','keyUrl'].every(k=>typeof s[k]==='string'&&s[k].startsWith('https://'));
const eligible=q=>{
 if(!q||!['vigente_conferida','atualizada_sem_mudanca_de_resposta'].includes(q.status)||q.currentKey!==q.historicalKey)return false;
 const opts=choices(q);if(!Array.isArray(opts))return false;
 if(q.format==='multiple_choice'&&(!sourceValid(q.source)||q.reproductionStatus!=='admissivel_verificada'||!Array.isArray(q.pages)||!q.pages.length||q.pages.some(p=>!Number.isInteger(p)||p<1)||opts.length!==5||!opts.every((o,i)=>o&&o.key===MC[i]&&typeof o.text==='string'&&o.text.trim())))return false;
 return opts.some(o=>o.key===q.currentKey);
};
const grade=(q,value)=>eligible(q)&&choices(q).some(o=>o.key===value)?value===q.currentKey:null;
function validHistory(value,items){
 if(!value||value.schema!==1||!Array.isArray(value.attempts)||value.attempts.length>5000)return false;
 const map=new Map(items.filter(eligible).map(q=>[q.id,q]));
 return value.attempts.every(a=>a&&typeof a.id==='string'&&a.id.length<=100&&map.has(a.question)&&typeof a.correct==='boolean'&&grade(map.get(a.question),a.selected)!==null&&a.correct===grade(map.get(a.question),a.selected)&&typeof a.date==='string'&&Number.isFinite(Date.parse(a.date)))&&new Set(value.attempts.map(a=>a.id)).size===value.attempts.length;
}
function latest(history){const m=new Map();for(const a of history.attempts){if(!m.has(a.question)||Date.parse(a.date)>=Date.parse(m.get(a.question).date))m.set(a.question,a)}return m}
const contract={eligible,grade,validHistory,latest,KEY,choices};
root.AGUVigenteContract=contract;
if(typeof module==='object'){module.exports=contract;return}
const data=root.AGUCurrentQuestions, host=document.getElementById('vig-app');if(!host)return;
const items=(data?.items||[]).filter(eligible);
if(!items.length){host.textContent='Nenhum item aprovado disponível.';return}
let history={schema:1,attempts:[]},position=0,discipline='all',filter='all',choice='',shown=false,notice='';
try{const raw=localStorage.getItem(KEY);if(raw){const v=JSON.parse(raw);if(validHistory(v,items))history=v;else notice='Histórico local inválido; nenhuma alteração foi feita.'}}catch{notice='Histórico local indisponível.'}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl=u=>typeof u==='string'&&u.startsWith('https://')?esc(u):'#';
const save=v=>{if(!validHistory(v,items))throw Error('Histórico inválido');localStorage.setItem(KEY,JSON.stringify(v));history=v};
const params=new URLSearchParams(root.location.search);
filter=params.get('situacao')==='erros'?'wrong':'all';
if(items.some(q=>q.discipline===params.get('disciplina')))discipline=params.get('disciplina');
const resumeId=params.get('questao');
const filtered=()=>{const m=latest(history);return items.filter(q=>(discipline==='all'||q.discipline===discipline)&&(filter==='all'||filter==='new'&&!m.has(q.id)||filter==='wrong'&&m.get(q.id)?.correct===false))};
position=Math.max(0,filtered().findIndex(q=>q.id===resumeId));
function reset(){choice='';shown=false}
function render(focus){
 const list=filtered(),m=latest(history),q=list[position];if(!q&&list.length){position=0;reset();return render(focus)}
 const route=new URL(root.location.href);
 if(q)route.searchParams.set('questao',q.id);else route.searchParams.delete('questao');
 if(filter==='wrong')route.searchParams.set('situacao','erros');else route.searchParams.delete('situacao');
 if(discipline!=='all')route.searchParams.set('disciplina',discipline);else route.searchParams.delete('disciplina');
 root.history.replaceState(null,'',route.pathname+route.search+route.hash);
 const hits=[...m.values()].filter(a=>a.correct).length;
 const src=q?.source||data.source;
 const multiple=q?.format==='multiple_choice';
 const answerLabel=q=>q.format==='multiple_choice'?'Alternativa '+q.currentKey:q.currentKey==='C'?'Certo':'Errado';
 const radios=q=>choices(q).map(o=>'<label><input type="radio" name="answer" value="'+esc(o.key)+'" '+(choice===o.key?'checked':'')+'> <span>'+esc(q.format==='multiple_choice'?o.key+' — '+o.text:o.text)+'</span></label>').join('');
 const opts=(xs,selected)=>xs.map(([v,l])=>'<option value="'+esc(v)+'" '+(v===selected?'selected':'')+'>'+esc(l)+'</option>').join('');
 host.innerHTML='<section class="card"><h2>Lote verificado</h2><div class="stats"><span>'+items.length+' disponíveis</span><span>'+m.size+' resolvidas</span><span>'+hits+' acertos</span><span>'+(m.size-hits)+' erros</span></div><p class="source">Corte: '+esc(data.reviewedAt)+' · Sem certificação integral da matriz.</p><div class="filters"><label>Disciplina<select id="vig-discipline">'+opts([['all','Todas'],...[...new Set(items.map(q=>q.discipline))].map(x=>[x,x])],discipline)+'</select></label><label>Situação<select id="vig-filter">'+opts([['all','Todas'],['new','Não resolvidas'],['wrong','Erros']],filter)+'</select></label></div></section>'+
 (q?'<section class="card"><p class="eyebrow">'+esc(src.organizer)+' · '+esc(src.contest)+' · '+esc(src.date.slice(0,4))+' · '+esc(q.code)+'</p><h2 tabindex="-1" id="vig-title">Questão '+q.n+' · '+(position+1)+' de '+list.length+'</h2><p class="source">Fonte: '+esc(src.contest)+' · '+esc(src.variant)+' · página '+q.pages.join(', ')+' · '+esc(src.license)+'</p><p><a href="'+safeUrl(src.examUrl)+'#page='+q.pages[0]+'" target="_blank" rel="noopener noreferrer">Consultar caderno original</a></p><p class="stem">'+esc(q.command)+'</p><p class="stem" id="vig-stem">'+esc(q.stem)+'</p><p class="source">'+esc(q.abbreviations||'')+'</p><form id="vig-form"><fieldset class="'+(multiple?'multiple-choice':'')+'" '+(shown?'disabled':'')+'><legend>'+(multiple?'Assinale a alternativa correta':'Julgue a assertiva')+'</legend>'+radios(q)+'</fieldset><button type="submit" class="primary" id="vig-submit" '+(!choice||shown?'disabled':'')+'>Responder</button></form>'+
 (shown?'<div id="vig-feedback" tabindex="-1" class="feedback" role="status"><strong>'+(grade(q,choice)?'Resposta correta':'Resposta incorreta')+'</strong><p>Gabarito oficial e direito atual: '+esc(answerLabel(q))+'.</p><h3>Na época da prova</h3><p>'+esc(q.historical)+'</p><h3>Direito vigente</h3><p>'+esc(q.current)+'</p><h3>Aplicação em nova prova</h3><p>'+esc(q.application)+'</p><p class="source">'+esc(q.scope)+'</p><ul>'+q.sources.map(s=>'<li><a href="'+safeUrl(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.label)+'</a></li>').join('')+'<li><a href="'+safeUrl(src.keyUrl)+'" target="_blank" rel="noopener noreferrer">Gabarito definitivo oficial</a></li></ul></div>':'')+
 '<div class="actions"><button id="vig-prev" '+(position===0?'disabled':'')+'>Anterior</button><button id="vig-next" '+(position>=list.length-1?'disabled':'')+'>Próxima</button><button id="vig-retry" '+(!shown?'disabled':'')+'>Refazer</button></div></section>':'<section class="card"><p>Nenhuma questão neste filtro.</p><button id="vig-all">Ver todas</button></section>')+
 '<section class="card backup"><h2>Histórico local do treino</h2><p>A questão e os filtros ficam no endereço desta página para retomada após recarga. Abrir uma questão não registra resposta.</p><p><a href="index.html?abrir=backup">Abrir backup completo do AGU Quiz</a></p><p id="vig-notice" role="status">'+esc(notice)+'</p><div class="actions"><button id="vig-export">Exportar histórico (JSON)</button><label>Importar backup <input id="vig-import" type="file" accept=".json,application/json"></label></div><p class="source">A importação combina tentativas válidas por ID, sem apagar as atuais. Nenhum dado é enviado ao servidor.</p></section>';
 const by=id=>document.getElementById(id);
 by('vig-discipline').onchange=e=>{discipline=e.target.value;position=0;reset();render('vig-discipline')};
 by('vig-filter').onchange=e=>{filter=e.target.value;position=0;reset();render('vig-filter')};
 if(q){by('vig-form').onchange=e=>{if(!shown&&choices(q).some(o=>o.key===e.target.value)){choice=e.target.value;by('vig-submit').disabled=false}};
 by('vig-form').onsubmit=e=>{e.preventDefault();if(shown||grade(q,choice)===null)return;try{const entry={id:crypto.randomUUID(),question:q.id,selected:choice,correct:grade(q,choice),date:new Date().toISOString()};save({schema:1,attempts:[...history.attempts,entry]});shown=true;filter='all';position=filtered().findIndex(x=>x.id===q.id);notice='Tentativa registrada neste navegador.';render('vig-feedback')}catch{notice='Não foi possível salvar; nenhuma tentativa foi registrada.';render('vig-notice')}};
 by('vig-prev').onclick=()=>{if(position>0){position--;reset();render('vig-title')}};
 by('vig-next').onclick=()=>{if(position<list.length-1){position++;reset();render('vig-title')}};
 by('vig-retry').onclick=()=>{reset();render('vig-title')};
 }else by('vig-all').onclick=()=>{discipline='all';filter='all';position=0;reset();render('vig-title')};
 by('vig-export').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(history,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='agu-treino-vigente-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
 by('vig-import').onchange=async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>2*1024*1024)throw Error('Arquivo muito grande');const v=JSON.parse(await file.text());if(!validHistory(v,items))throw Error('Formato inválido');const m=new Map(history.attempts.map(a=>[a.id,a]));for(const a of v.attempts){if(m.has(a.id)&&JSON.stringify(m.get(a.id))!==JSON.stringify(a))throw Error('Conflito de ID');m.set(a.id,a)}save({schema:1,attempts:[...m.values()]});notice='Backup combinado com sucesso.';position=0;reset()}catch{notice='Backup recusado; histórico anterior preservado.'}render('vig-notice')};
 if(focus){const el=by(focus);if(el){if(focus==='vig-notice')el.tabIndex=-1;el.focus()}}
}
render();
})(typeof window==='undefined'?globalThis:window);
