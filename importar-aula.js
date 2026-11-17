/* UX ESTUDO INTEGRADO 02 — síntese local no Caderno existente, sem rede ou agenda nova. */
(function(root){
'use strict';
const MAX_BYTES=32768,SCHEMA='agu-aula-v1',PREFIX='chatgpt:',UNLINKED='Sem vínculo curricular';
const KEYS=['schema','id','data','disciplina','moduloPedagogico','assuntoCurricular','titulo','conceitos','erros','fontes','hipoteseEvolucao','aplicacaoAgu','retomada','paraCaderno'];
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
const bytes=x=>new Blob([x]).size;
let pending=null,completed=null,message='',error=false,reading=false,serial=0;
function fail(text){throw Error(text)}
function exactKeys(x,keys){return object(x)&&Object.keys(x).length===keys.length&&keys.every(k=>Object.hasOwn(x,k))}
function textOK(value,max,empty=false){
 return typeof value==='string'&&value.length<=max&&(empty||value.trim().length>0)&&
 !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)&&!/<\s*\/?\s*[a-z][^>]*>/i.test(value);
}
function listOK(value,max,count){return Array.isArray(value)&&value.length<=count&&value.every(x=>textOK(x,max))}
function validURL(value){
 if(value===null)return true;
 if(!textOK(value,1200)||!value.startsWith('https://'))return false;
 try{const u=new URL(value);return u.protocol==='https:'&&!!u.hostname&&!u.username&&!u.password}catch(_){return false}
}
function validate(value){
 if(!exactKeys(value,KEYS)||value.schema!==SCHEMA)fail('Formato de aula incompatível ou campos desconhecidos. Use o exemplo agu-aula-v1.');
 if(!/^aula-[a-z0-9][a-z0-9-]{7,79}$/.test(value.id)||typeof value.id!=='string')fail('Identificador de aula inválido. Mantenha um ID estável de 13 a 85 caracteres.');
 if(typeof value.data!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value.data)||Number(value.data.slice(0,4))<1)fail('Informe uma data civil válida no formato YYYY-MM-DD.');
 const date=new Date(value.data+'T00:00:00Z');if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==value.data)fail('A data da aula não existe no calendário.');
 if(typeof value.disciplina!=='string'||!/^[A-Z]{2,8}$/.test(value.disciplina))fail('Código de disciplina inválido.');
 if(!textOK(value.moduloPedagogico,120)||!textOK(value.titulo,140)||!textOK(value.retomada,800)||!textOK(value.hipoteseEvolucao,1000,true)||!textOK(value.aplicacaoAgu,1000,true))fail('Texto ausente, acima do limite ou contendo HTML/controles não permitidos.');
 const code=value.assuntoCurricular;
 if(code!==null&&(typeof code!=='string'||!/^[A-Z]{2,8}(?:-[A-Z]{2,8})?-\d{2,3}$/.test(code)||code.split('-')[0]!==value.disciplina))fail('Código curricular incompatível com a disciplina. Use null quando não houver identificação segura.');
 if(/^[A-Z]{2,8}-\d{2,3}$/.test(value.moduloPedagogico)&&value.moduloPedagogico.split('-')[0]!==value.disciplina)fail('O módulo pedagógico e a disciplina informados conflitam.');
 if(!listOK(value.conceitos,500,12)||!value.conceitos.length||!listOK(value.erros,500,8)||!listOK(value.paraCaderno,350,8))fail('Listas inválidas: até 12 conceitos, 8 erros e 8 pontos para caderno, com os limites do contrato.');
 if(!Array.isArray(value.fontes)||value.fontes.length>12||value.fontes.some(f=>!exactKeys(f,['dispositivo','url','verificacao'])||!textOK(f.dispositivo,200)||!validURL(f.url)||!['consultada_na_aula','a_conferir'].includes(f.verificacao)))fail('Fonte inválida. Use referência textual, URL HTTPS sem credenciais ou null e verificação declarada.');
 if(bytes(JSON.stringify(value))>MAX_BYTES)fail('A síntese excede 32.768 bytes. Gere um encerramento mais curto.');
 return JSON.parse(JSON.stringify(value));
}
// JSON.parse não detecta chaves duplicadas. Esta passagem lê apenas tokens de JSON já válido.
function rejectRepeatedKeys(raw){
 const stack=[],tokens=raw.match(/"(?:\\[\s\S]|[^"\\])*"|[{}\[\],:]/g)||[];
 for(const t of tokens){
  if(t==='{')stack.push({kind:'object',keys:new Set(),key:true});
  else if(t==='[')stack.push({kind:'array'});
  else if(t==='}'||t===']')stack.pop();
  else if(t===','&&stack.at(-1)?.kind==='object')stack.at(-1).key=true;
  else if(t[0]==='"'&&stack.at(-1)?.kind==='object'&&stack.at(-1).key){const item=stack.at(-1),key=JSON.parse(t);if(item.keys.has(key))fail('O JSON contém uma chave repetida: '+key);item.keys.add(key);item.key=false}
 }
}
function parse(raw){
 if(typeof raw!=='string'||bytes(raw)>MAX_BYTES)fail('Escolha um JSON de até 32.768 bytes.');
 let value;try{value=JSON.parse(raw)}catch(_){fail('O arquivo não contém JSON válido.')}
 rejectRepeatedKeys(raw);return validate(value);
}
const knownCode=code=>typeof code==='string'&&(root.AGUSubjects?.catalog?.()||[]).some(x=>x.code===code);
function summary(lesson,target){
 const lines=['Origem: aula no ChatGPT — síntese declarada, sem avaliação ou certificação no Quiz.',
  'Registro estável: '+lesson.id,'Data civil da aula: '+lesson.data,'Disciplina informada: '+lesson.disciplina,
  'Módulo pedagógico informado: '+lesson.moduloPedagogico,'Código granular informado: '+(lesson.assuntoCurricular||'não informado'),
  'Destino escolhido no Caderno: '+(target||UNLINKED),
  'Conceitos efetivamente trabalhados:',...lesson.conceitos.map(x=>'• '+x),'Erros e ajustes relatados:',...(lesson.erros.length?lesson.erros.map(x=>'• '+x):['Não informados.']),
  'Fontes declaradas (não verificadas pelo importador):',...(lesson.fontes.length?lesson.fontes.map(x=>'• '+x.dispositivo+' | '+(x.verificacao==='consultada_na_aula'?'declarada como consultada na aula':'a conferir')+(x.url?' | '+x.url:'')):['Não informadas.']),
  'Hipótese e evolução: '+(lesson.hipoteseEvolucao||'Não informadas.'),'Aplicação AGU: '+(lesson.aplicacaoAgu||'Não informada.'),
  'Ponto de retomada no ChatGPT: '+lesson.retomada,'Para escrever no caderno físico:',...(lesson.paraCaderno.length?lesson.paraCaderno.map(x=>'• '+x):['Não informado.']),
  'Efeitos no Quiz: um registro no Caderno; nenhuma resposta, hora, revisão ou tarefa concluída criada pela importação.'];
 return lines.join('\n');
}
function makeRecord(value,target=''){
 const l=validate(value),choices=root.AGULessonHost?.topics?.(l.disciplina)||[];
 if(typeof target!=='string'||(target&&!choices.some(t=>t.id===target)))fail('Escolha um tema existente da disciplina ou mantenha sem vínculo curricular.');
 return {id:PREFIX+l.id,title:'Aula no ChatGPT — '+l.titulo,topic:target||UNLINKED,date:l.data,
  hypothesis:l.hipoteseEvolucao,agu:l.aplicacaoAgu,evidenceCount:0,state:'Registro de aula — sem avaliação no Quiz',summary:summary(l,target),answers:[],revisions:[]};
}
function isLesson(record){return typeof record?.id==='string'&&record.id.startsWith(PREFIX+'aula-')}
function recordHTML(record){return '<details class="agu-lesson-record" id="agu-lesson-record-'+esc(record.id)+'"><summary>Ver síntese e ponto de retomada</summary><div class="agu-lesson-text">'+esc(record.summary)+'</div></details>'}
const mdEscape=s=>String(s).replace(/[\\`*_\[\]<>!#]/g,'\\$&');
function markdown(record){return '## '+mdEscape(record.title)+'\n\n'+mdEscape(record.summary).replace(/\n/g,'  \n')+'\n\n'}
function focus(selector){root.document?.querySelector(selector)?.focus?.({preventScroll:false})}
function render(selector){
 // O painel compartilha a página com o formulário original. Redesenhá-lo não deve apagar o rascunho.
 const draft=['#nbtopic','#nbHyp','#nbAgu'].map(id=>({id,value:root.document?.querySelector(id)?.value}));
 root.render?.();
 for(const {id,value} of draft){const field=root.document?.querySelector(id);if(field&&typeof value==='string')field.value=value}
 if(selector)focus(selector);
}
function goNotebook(section){
 const id={import:'agu-lesson-title',manual:'agu-notebook-manual-title',records:'agu-notebook-records-title',confirm:'agu-lesson-confirm-title'}[section];
 const element=id&&root.document?.getElementById(id);if(!element)return false;
 element.focus({preventScroll:false});return true;
}
function showSaved(){
 const record=completed&&root.document?.getElementById('agu-lesson-record-'+completed.recordId);if(!record)return false;
 record.open=true;record.querySelector('summary')?.focus({preventScroll:false});return true;
}
function notebookNavigationHTML(){return '<nav class="agu-notebook-nav" aria-label="Atalhos do Caderno">'+[['import','Importar aula'],['manual','Registro manual'],['records','Ver registros']].map(([key,label])=>'<button type="button" class="secondary" onclick="AGULessonImport.goNotebook(\''+key+'\')">'+label+'</button>').join('')+'</nav>'}
function inform(text,bad=false){message=text;error=bad}
function prepare(lesson,target=''){
 const checked=validate(lesson),snapshot=root.AGULessonHost.inspect(checked,target);
 pending={lesson:checked,target,confirmed:false,snapshot};completed=null;
 inform(snapshot.status==='duplicate'?'Esta aula já está no Caderno. Nenhum registro foi alterado.':snapshot.status==='conflict'?'Este identificador já existe com outro conteúdo ou destino. O original foi preservado.':'Confira o conteúdo e escolha o destino antes de salvar.',snapshot.status==='conflict');
 return true;
}
function stage(value){
 serial++;reading=false;pending=null;completed=null;
 try{prepare(typeof value==='string'?parse(value):validate(value));render('#agu-lesson-preview');return true}
 catch(e){inform(e.message,true);render('#agu-lesson-status');return false}
}
async function readFile(input){
 const file=input.files?.[0];if(!file)return false;
 const ticket=++serial;reading=true;pending=null;completed=null;inform('Lendo o arquivo local…');render('#agu-lesson-status');
 try{
  if(!/\.json$/i.test(file.name)||file.size>MAX_BYTES)fail('Escolha um arquivo .json de até 32.768 bytes.');
  const buffer=await file.arrayBuffer();if(ticket!==serial)return false;
  if(buffer.byteLength>MAX_BYTES)fail('Escolha um JSON de até 32.768 bytes.');
  let raw;try{raw=new TextDecoder('utf-8',{fatal:true}).decode(buffer)}catch(_){fail('Use um arquivo JSON codificado em UTF-8 válido.');}
  prepare(parse(raw));reading=false;render('#agu-lesson-preview');return true;
 }catch(e){if(ticket!==serial)return false;reading=false;inform(e.message,true);render('#agu-lesson-status');return false}
}
function target(value){
 if(!pending)return false;
 pending.confirmed=false;
 try{prepare(pending.lesson,value);render('#agu-lesson-target');return true}catch(e){inform(e.message,true);render('#agu-lesson-status');return false}
}
function confirm(value){if(pending)pending.confirmed=value===true&&pending.snapshot.status==='new';render('#agu-lesson-confirm')}
function refresh(){if(!pending)return false;return target(pending.target)}
function cancel(){serial++;reading=false;pending=null;completed=null;inform('Importação cancelada. Nenhum registro foi criado.');render('#agu-lesson-file');return true}
function save(){
 if(!pending?.confirmed||pending.snapshot.status!=='new')return false;
 const entry=pending;
 try{
  const result=root.AGULessonHost.commit(entry.lesson,entry.target,entry.snapshot.raw);
  if(!result.added){prepare(entry.lesson,entry.target);render('#agu-lesson-status');return false}
  completed={lesson:entry.lesson,recordId:result.id,target:entry.target};pending=null;
  inform('Aula guardada no Caderno AGU. Respostas, tempo, revisão e cronograma permanecem como estavam.');render('#agu-lesson-status');return true;
 }catch(e){pending.confirmed=false;inform(e.message,true);render('#agu-lesson-status');return false}
}
function open(){root.setView?.('notebook');focus('#agu-lesson-title')}
function goSubject(code){
 if(!completed||completed.lesson.assuntoCurricular!==code||!knownCode(code))return false;
 root.setView?.('library');return root.AGUSubjects.select(code);
}
function example(){return {schema:SCHEMA,id:'aula-exemplo-20261117-01',data:'2026-11-17',disciplina:'ADM',moduloPedagogico:'ADM-02',assuntoCurricular:null,
 titulo:'Exemplo sintético de encerramento',conceitos:['Síntese de demonstração; substitua pelo conteúdo real da aula.'],erros:[],fontes:[],hipoteseEvolucao:'',aplicacaoAgu:'',retomada:'Retomar a pergunta combinada no ChatGPT.',paraCaderno:['Pergunta sintética para testar o fluxo.']}}
function prompt(){return 'Ao encerrarmos esta aula, gere um arquivo JSON UTF-8 para o AGU Quiz, schema agu-aula-v1, com até 32.768 bytes. Use exatamente as chaves do modelo abaixo. Substitua a demonstração por conceitos, erros, fontes e retomada realmente trabalhados nesta conversa. Não invente correção, fonte ou vínculo. Use um ID aula- estável e único; preserve-o ao reexportar a mesma aula. Não encerre antes da minha resposta final.\n\n'+JSON.stringify(example(),null,2)+'\n\nMantenha moduloPedagogico separado de assuntoCurricular. Se o código granular não estiver comprovado, use null. Fontes: objetos com dispositivo, url HTTPS ou null e verificacao consultada_na_aula/a_conferir (até 12). Até 12 conceitos (500 caracteres cada), 8 erros (500) e 8 paraCaderno (350). Título até 140; módulo até 120; hipótese/aplicação até 1.000 cada; retomada até 800. Disciplina: código de 2–8 letras maiúsculas. Sem HTML, diálogo integral, dados pessoais desnecessários ou campos extras.'}
function downloadExample(){root.download?.('AGU_Aula_Exemplo_Sintetico.json',JSON.stringify(example(),null,2),'application/json')}
function entryHTML(){return '<div class="btnrow agu-lesson-entry"><button type="button" class="secondary" id="agu-lesson-open" onclick="AGULessonImport.open()">Trazer aula do ChatGPT</button></div>'}
function panel(){
 if(root.AGUHomeContext?.().demo)return '<section class="card"><h2>Aulas no ChatGPT</h2><p>Saia da simulação para importar uma síntese no seu Caderno.</p></section>';
 let out='<section class="card agu-lesson-import" aria-labelledby="agu-lesson-title"><h2 id="agu-lesson-title" tabindex="-1">Trazer aula do ChatGPT</h2><p>Selecione a síntese curta de encerramento. A aula continua no ChatGPT; aqui você guarda o registro no Caderno AGU.</p>'+
 '<label for="agu-lesson-file">Arquivo de síntese (.json, até 32 KB)</label><input id="agu-lesson-file" type="file" accept="application/json,.json" onchange="AGULessonImport.readFile(this)">'+
 '<p id="agu-lesson-status" role="'+(error?'alert':'status')+'" aria-live="polite" tabindex="-1">'+esc(message)+'</p>';
 if(reading)out+='<button type="button" class="secondary" onclick="AGULessonImport.cancel()">Cancelar leitura</button>';
 if(pending){
  const l=pending.lesson,choices=root.AGULessonHost.topics(l.disciplina),status=pending.snapshot.status;
  out+='<div id="agu-lesson-preview" tabindex="-1"><h3>Prévia da aula</h3><p><b>'+esc(l.titulo)+'</b><br>'+esc(l.data)+' · '+esc(l.disciplina)+' · módulo pedagógico '+esc(l.moduloPedagogico)+'</p><button type="button" class="secondary" onclick="AGULessonImport.goNotebook(\'confirm\')">Ir à confirmação</button>'+
   '<p class="note">Código granular declarado: '+esc(l.assuntoCurricular||'não informado')+(l.assuntoCurricular?(knownCode(l.assuntoCurricular)?' — reconhecido no acervo; vínculo declarado na síntese.':' — não reconhecido neste acervo; permanece como texto informado.'):'')+' Módulo pedagógico e código curricular são identificações distintas.</p>'+
   '<label for="agu-lesson-target">Tema do Quiz (opcional)</label><select id="agu-lesson-target" onchange="AGULessonImport.target(this.value)"><option value=""'+(!pending.target?' selected':'')+'>Sem vínculo curricular</option>'+choices.map(t=>'<option value="'+esc(t.id)+'"'+(t.id===pending.target?' selected':'')+'>'+esc(t.id)+'</option>').join('')+'</select>'+
   '<p class="small muted">O tema é escolhido por você. A ausência de vínculo não impede guardar a síntese. Confira também as fontes; o importador não as verifica.</p>'+
   '<div class="agu-lesson-text">'+esc(pending.snapshot.record.summary)+'</div>'+
   '<h3 id="agu-lesson-confirm-title" tabindex="-1">Confirmar registro</h3><label class="agu-lesson-confirm"><input id="agu-lesson-confirm" type="checkbox" onchange="AGULessonImport.confirm(this.checked)"'+(pending.confirmed?' checked':'')+(status!=='new'?' disabled':'')+'>Confirmo o conteúdo e o destino mostrados. Salvar somente no Caderno.</label>'+
   '<div class="btnrow"><button type="button" id="agu-lesson-save" class="primary" onclick="AGULessonImport.save()"'+(!pending.confirmed||status!=='new'?' disabled':'')+'>Guardar aula no Caderno</button><button type="button" class="secondary" onclick="AGULessonImport.refresh()">Atualizar prévia</button><button type="button" class="secondary" onclick="AGULessonImport.cancel()">Cancelar importação</button></div><p class="small muted">A prévia é temporária; recarregar descarta a seleção ainda não salva.</p></div>';
 }
 if(completed){out+='<div class="btnrow"><button type="button" class="primary" onclick="AGULessonImport.showSaved()">Ver aula guardada</button>';
  if(knownCode(completed.lesson.assuntoCurricular))out+='<button type="button" class="secondary" onclick="AGULessonImport.goSubject(\''+esc(completed.lesson.assuntoCurricular)+'\')">Consultar assunto informado '+esc(completed.lesson.assuntoCurricular)+'</button>';
  out+='</div>';
 }
 out+='<details class="agu-lesson-help"><summary>Como gerar a síntese no ChatGPT</summary><ol><li>Ao terminar a aula, use o pedido abaixo para gerar o arquivo de encerramento.</li><li>Baixe o JSON no aparelho e selecione-o aqui.</li><li>Confira conteúdo e destino; depois confirme e guarde no Caderno.</li></ol><label for="agu-lesson-prompt">Pedido para usar no encerramento da aula</label><textarea id="agu-lesson-prompt" rows="8" readonly>'+esc(prompt())+'</textarea><button type="button" class="secondary" onclick="AGULessonImport.downloadExample()">Baixar exemplo sintético JSON</button><p class="small muted">O exemplo é uma demonstração, sem estudo real. A importação não acessa conversas privadas, não cria revisões e não altera o cronograma. Use o backup em Dados e backup para mudar de aparelho.</p></details></section>';
 return out;
}
root.AGULessonImport={MAX_BYTES,parse,validate,makeRecord,isLesson,recordHTML,markdown,entryHTML,panel,stage,readFile,target,confirm,refresh,cancel,save,open,goSubject,goNotebook,showSaved,notebookNavigationHTML,example,prompt,downloadExample,
 peek:()=>({reading,message,error,pending:pending?{lesson:validate(pending.lesson),target:pending.target,confirmed:pending.confirmed,status:pending.snapshot.status}:null,completed:completed?{recordId:completed.recordId,target:completed.target}:null})};
})(window);
