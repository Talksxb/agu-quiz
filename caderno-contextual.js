/* AGU Quiz S15 — Caderno jurídico contextual, dados locais privados. */
(function(root){
"use strict";
const KEY="agu_caderno_contextual_s15_v1";
const LEGACY="agu_quiz_mvp1_2026";
const SCHEMA="agu-context-notebook-v1";
const TYPES=["hipotese","investigacao","fundamentacao","distincao","aplicacao","dificuldade","consolidacao"];
const TYPE_LABELS={hipotese:"Hipótese",investigacao:"Investigação socrática",fundamentacao:"Fundamentação",distincao:"Distinção de prova",aplicacao:"Aplicação AGU",dificuldade:"Dificuldade",consolidacao:"Consolidação"};
const STAGES=["problematizacao","hipotese","investigacao_socratica","confrontacao","sistematizacao","aplicacao_agu","consolidacao"];
const STAGE_LABELS={problematizacao:"Problematização",hipotese:"Formulação de hipótese",investigacao_socratica:"Investigação socrática",confrontacao:"Confrontação",sistematizacao:"Sistematização",aplicacao_agu:"Aplicação AGU",consolidacao:"Consolidação"};
const safe=x=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const normId=id=>/^(CF88:art(?:131|132)|L9784:art(?:11|12|13|14|15)):(?:caput|p[123]|pu|I|II|III)$/.test(id);
const articleList=()=>root.AGU_LEGAL_CORPUS?.laws?.flatMap(l=>l.articles.map(a=>({...a,lawTitle:l.title})))||[];
const validIds=()=>new Set(articleList().flatMap(a=>a.clauses.map(c=>c.id)));
const articleOf=id=>articleList().find(a=>a.clauses.some(c=>c.id===id));
const blank=()=>({schema:SCHEMA,createdAt:new Date().toISOString(),records:[]});
let state=blank();
try{const x=JSON.parse(localStorage.getItem(KEY)||"null");if(x?.schema===SCHEMA&&Array.isArray(x.records))state=x}catch(_){}
const now=()=>new Date().toISOString();
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function uid(){let id;do{id="aguc-"+(typeof crypto!=="undefined"&&crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+"-"+Math.random().toString(36).slice(2))}while(state.records.some(x=>x.id===id));return id}
function valid(r){
 if(!r||typeof r!=="object"||!normId(r.deviceId)||!validIds().has(r.deviceId)||!articleOf(r.deviceId)||r.topic!==articleOf(r.deviceId).topic)return false;
 if(!TYPES.includes(r.type)||!STAGES.includes(r.stage)||!["manual","legacy_caderno_vinculado","importado"].includes(r.origin))return false;
 return typeof r.id==="string"&&/^aguc-[a-zA-Z0-9-]+$/.test(r.id)&&r.id.length<120&&typeof r.title==="string"&&r.title.trim().length>0&&r.title.length<=170&&typeof r.content==="string"&&r.content.trim().length>0&&r.content.length<=16000&&typeof r.createdAt==="string"&&typeof r.updatedAt==="string"&&Array.isArray(r.sources)&&r.sources.length<=20&&r.sources.every(x=>typeof x==="string"&&x.length<=1200&&x.startsWith("https://")&&resourceList(r.deviceId).some(y=>y.url===x))&&(!r.legacyId||typeof r.legacyId==="string"&&r.legacyId.length<=200);
}
function create(values){const a=articleOf(values.deviceId);if(!a)throw Error("Dispositivo desconhecido");const entry={id:uid(),deviceId:values.deviceId,topic:a.topic,title:String(values.title||"").trim(),content:String(values.content||"").trim(),type:values.type,stage:values.stage,origin:values.origin||"manual",createdAt:now(),updatedAt:now(),sources:Array.isArray(values.sources)?values.sources:[],reviewStatus:"nao_avaliado",version:1,...(values.legacyId?{legacyId:values.legacyId}:{})};if(!valid(entry))throw Error("Preencha título, conteúdo, tipo e etapa válidos.");state.records.push(entry);save();return entry}
function edit(id,patch){const r=state.records.find(x=>x.id===id);if(!r)return false;const next={...r,sources:Array.isArray(patch.sources)?patch.sources:r.sources,title:patch.title===undefined?r.title:String(patch.title).trim(),content:patch.content===undefined?r.content:String(patch.content).trim(),type:patch.type||r.type,stage:patch.stage||r.stage,updatedAt:now(),version:r.version+1};if(!valid(next))return false;Object.assign(r,next);save();return true}
function remove(id,confirmed=false){if(!confirmed)return false;const before=state.records.length;state.records=state.records.filter(x=>x.id!==id);if(state.records.length===before)return false;save();return true}
function list(id,filters={}){return state.records.filter(x=>x.deviceId===id&&(!filters.type||x.type===filters.type)&&(!filters.stage||x.stage===filters.stage)).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt))}
function legacyRecords(){try{const x=JSON.parse(localStorage.getItem(LEGACY)||"null");return Array.isArray(x?.notebook)?x.notebook.filter(n=>n&&typeof n.id==="string"&&typeof n.topic==="string"&&typeof n.title==="string"):[]}catch(_){return []}}
function candidates(topic){return legacyRecords().filter(n=>n.topic.split("/")[0]===topic.split("-")[0]&&!state.records.some(x=>x.legacyId===n.id))}
function linkLegacy(legacyId,deviceId){const src=legacyRecords().find(x=>x.id===legacyId),a=articleOf(deviceId);if(!src||!a||src.topic.split("/")[0]!==a.topic.split("-")[0]||state.records.some(x=>x.legacyId===legacyId))throw Error("Registro antigo não encontrado, incompatível ou já vinculado.");
 const content=["Registro histórico (cópia vinculada, original preservado):",src.hypothesis?"Hipótese: "+src.hypothesis:"",src.agu?"Aplicação AGU: "+src.agu:"",src.summary?"Resumo: "+src.summary:""].filter(Boolean).join("\n\n");
 return create({deviceId,title:src.title.slice(0,170),content:content.trim()||"Registro histórico sem notas textuais: "+src.title,type:"consolidacao",stage:"consolidacao",origin:"legacy_caderno_vinculado",legacyId,sources:[]});
}
function resourceList(deviceId){
 const entries=root.AGU_LEGAL_RELATIONS?.entries||[];
 const u=new Set();
 return entries.filter(x=>x.deviceId===deviceId&&typeof x.url==="string"&&x.url.startsWith("https://")&&!u.has(x.id)&&u.add(x.id)).map(x=>({id:x.id,title:x.title,status:x.sourceStatus,source:x.sourceLot,url:x.url}));
}
function exportJSON(){return JSON.stringify({schema:"agu-context-notebook-backup-v1",exportedAt:now(),data:state},null,2)}
function importJSON(raw){
 const parsed=typeof raw==="string"?JSON.parse(raw):raw;
 if(parsed?.schema!=="agu-context-notebook-backup-v1"||parsed?.data?.schema!==SCHEMA||!Array.isArray(parsed.data.records)||parsed.data.records.length>3000)throw Error("Formato ou quantidade incompatível");
 const all=parsed.data.records;
 const ids=new Set();for(const r of all){if(!valid(r)||ids.has(r.id))throw Error("Registro inválido ou ID repetido no arquivo");ids.add(r.id)}
 let added=0,skipped=0;
 const existingIds=new Set(state.records.map(x=>x.id)),legacy=new Set(state.records.map(x=>x.legacyId).filter(Boolean));
 for(const rec of all){if(existingIds.has(rec.id)||(rec.legacyId&&legacy.has(rec.legacyId))){skipped++;continue}state.records.push({...rec,origin:rec.origin==="manual"?"importado":rec.origin});existingIds.add(rec.id);if(rec.legacyId)legacy.add(rec.legacyId);added++}
 if(added)save();return {added,skipped};
}
function readFile(input){const file=input.files?.[0];if(!file)return;if(file.size>3000000){alert("Backup acima do limite de 3 MB.");return}file.text().then(text=>{try{const parsed=JSON.parse(text);if(!confirm("Importar somente registros novos? O conteúdo existente será preservado."))return;const x=importJSON(parsed);alert(x.added+" registro(s) importado(s); "+x.skipped+" ignorado(s), já existentes.");root.render?.()}catch(e){alert("Importação rejeitada: "+e.message)}}).catch(()=>alert("Não foi possível ler o arquivo."))}
const option=(value,label,selected)=>'<option value="'+safe(value)+'" '+(value===selected?'selected':'')+'>'+safe(label)+'</option>';
const fields=(r={})=>'<label>Título<input id="ctx-title" maxlength="170" placeholder="Distinção ou pergunta central" value="'+safe(r.title||"")+'"></label><label>Tipo<select id="ctx-type">'+TYPES.map(x=>option(x,TYPE_LABELS[x],r.type||"hipotese")).join("")+'</select></label><label>Etapa do método AGU<select id="ctx-stage">'+STAGES.map(x=>option(x,STAGE_LABELS[x],r.stage||"problematizacao")).join("")+'</select></label><label>Registro<textarea id="ctx-content" rows="5" maxlength="16000" placeholder="Sua hipótese, fundamento, contraponto ou aplicação">'+safe(r.content||"")+'</textarea></label>';
let filters={type:"",stage:""},editing=null;
function panel(ctx){
 const id=ctx.deviceId,a=articleOf(id);if(!a)return '<p class="agu-muted">Selecione um dispositivo válido.</p>';
 if(editing&&!state.records.some(x=>x.id===editing&&x.deviceId===id))editing=null;
 const records=list(id,filters),sources=resourceList(id),legacy=candidates(a.topic);
 let s='<p class="agu-muted">Caderno contextual · '+safe(a.topic)+' · '+records.length+' registro(s) deste dispositivo.</p>'+
 '<div class="agu-notice">Suas notas são pessoais e não certificam domínio ou vigência. As evidências exibidas permanecem separadas do seu texto.</div>'+
 '<div class="agu-ctx-box"><h4>'+(editing?'Editar registro':'Novo registro')+'</h4>'+fields(editing?state.records.find(x=>x.id===editing):{})+'<label>Fonte verificada opcional<select id="ctx-source">'+option("","Nenhuma","")+sources.map(x=>option(x.url,x.title,editing?state.records.find(y=>y.id===editing)?.sources?.[0]||"":"")).join("")+"</select></label>"+
 '<button class="agu-primary" onclick="AGUCaderno.submit(\''+safe(id)+'\')">'+(editing?'Salvar alterações':'Adicionar ao Caderno')+'</button>'+(editing?'<button class="agu-light" onclick="AGUCaderno.cancel()">Cancelar edição</button>':'')+'</div>';
 s+='<div class="agu-ctx-box"><h4>Registros do dispositivo</h4><label>Tipo<select id="ctx-filter-type" onchange="AGUCaderno.filter(\'type\',this.value)">'+option("","Todos",filters.type)+TYPES.map(x=>option(x,TYPE_LABELS[x],filters.type)).join("")+'</select></label><label>Etapa<select id="ctx-filter-stage" onchange="AGUCaderno.filter(\'stage\',this.value)">'+option("","Todas",filters.stage)+STAGES.map(x=>option(x,STAGE_LABELS[x],filters.stage)).join("")+'</select></label>';
 s+=records.length?records.map(x=>'<article class="agu-notice"><b>'+safe(x.title)+'</b><p class="agu-muted">'+safe(TYPE_LABELS[x.type])+' · '+safe(STAGE_LABELS[x.stage])+' · '+safe(x.origin)+' · '+safe(x.updatedAt.slice(0,10))+'</p><p class="agu-ctx-body">'+safe(x.content)+'</p><div><button class="agu-light" onclick="AGUCaderno.startEdit(\''+safe(x.id)+'\')">Editar</button><button class="agu-light" onclick="AGUCaderno.askDelete(\''+safe(x.id)+'\')">Excluir</button></div></article>').join(""):'<p class="agu-muted">Nenhum registro corresponde aos filtros.</p>';s+='</div>';
 s+='<div class="agu-ctx-box"><h4>Referências verificáveis</h4>'+(sources.length?sources.map(x=>'<p class="agu-muted"><a href="'+safe(x.url)+'" target="_blank" rel="noopener noreferrer">'+safe(x.title)+'</a> · '+safe(x.status)+' · '+safe(x.source)+'</p>').join(""):'<p class="agu-muted">Sem relação documental individual para esta subdivisão.</p>')+'</div>';
 s+='<div class="agu-ctx-box"><h4>Vincular Caderno anterior</h4><p class="agu-muted">A correspondência de disciplina é apenas uma sugestão. Escolha explicitamente um registro, verificando se trata deste dispositivo. O original não será modificado.</p>';
 s+=legacy.length?'<select id="ctx-legacy">'+option("","Escolher registro...", "")+legacy.map(x=>option(x.id,x.title+" · "+x.topic,"")).join("")+'</select><button class="agu-light" onclick="AGUCaderno.attachLegacy(\''+safe(id)+'\')">Vincular cópia selecionada</button>':'<p class="agu-muted">Nenhum registro antigo da disciplina disponível neste navegador.</p>';s+='</div>';
 s+='<div class="agu-ctx-box"><h4>Backup privado</h4><button class="agu-light" onclick="AGUCaderno.download()">Exportar JSON</button><button class="agu-light" onclick="document.getElementById(\'ctx-import\').click()">Importar JSON</button><input id="ctx-import" type="file" class="hidden" accept=".json,application/json" onchange="AGUCaderno.readFile(this)"><p class="agu-muted">Exporta todo o Caderno contextual, nunca o conteúdo do repositório privado.</p></div>';
 return s;
}
function readForm(){const link=document.getElementById("ctx-source")?.value||"";return {sources:link?[link]:[],title:document.getElementById("ctx-title")?.value,content:document.getElementById("ctx-content")?.value,type:document.getElementById("ctx-type")?.value,stage:document.getElementById("ctx-stage")?.value}}
function submit(deviceId){try{const values=readForm();if(values.sources.length&&!resourceList(deviceId).some(x=>x.url===values.sources[0]))throw Error("Fonte não pertence ao dispositivo.");if(editing){if(!state.records.some(x=>x.id===editing&&x.deviceId===deviceId)||!edit(editing,values))throw Error("Registro inválido.");editing=null}else create({...values,deviceId});root.render?.()}catch(e){alert("Não foi possível salvar: "+e.message)}}
function startEdit(id){if(!state.records.some(x=>x.id===id))return;editing=id;root.render?.()}
function cancel(){editing=null;root.render?.()}
function askDelete(id){if(confirm("Excluir este registro contextual? O histórico do Caderno antigo não será alterado.")){remove(id,true);if(editing===id)editing=null;root.render?.()}}
function filter(key,val){if(key==="type"||key==="stage"){filters[key]=val;root.render?.()}}
function attachLegacy(deviceId){const id=document.getElementById("ctx-legacy")?.value;if(!id)return;const a=articleOf(deviceId);if(!confirm("Confirmar que este registro trata de "+a.label+"? A vinculação criará uma cópia privada, sem alterar a origem."))return;try{linkLegacy(id,deviceId);root.render?.()}catch(e){alert(e.message)}}
function download(){const blob=new Blob([exportJSON()],{type:"application/json"}),u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download="AGU_Caderno_Contextual_backup.json";a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
root.AGUCaderno={panel,create,edit,remove,list,valid,linkLegacy,candidates,legacyRecords,exportJSON,importJSON,readFile,resourceList,submit,startEdit,cancel,askDelete,filter,attachLegacy,download,peek:()=>JSON.parse(JSON.stringify(state))};
})(window);
