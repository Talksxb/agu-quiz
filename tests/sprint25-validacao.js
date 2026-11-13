/* Sprint 25 — regressão do tamanho real do arquivo portátil (UTF-8) e da restauração.
 * Somente estado sintético, em VM isolada; não utiliza histórico pessoal.
 */
'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),MAX=12000000;
const state=new Map(),alerts=[];
let downloaded=0,exportedBlob=null;
const env={Blob,alert:msg=>alerts.push(String(msg)),setTimeout(){},
 URL:{createObjectURL(blob){exportedBlob=blob;return 'blob:synthetic'},revokeObjectURL(){}},
 document:{createElement(){return {click(){downloaded++}}}},
 localStorage:{getItem:key=>state.has(key)?state.get(key):null,
  setItem:(key,value)=>state.set(key,String(value)),removeItem:key=>state.delete(key)}};
env.window=env;
vm.createContext(env);
for(const file of ['dados/legislacao-s13.js','caderno-contextual.js','backup-local-s20.js']){
 vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),env,{filename:file});
}
const key='agu_caderno_contextual_s15_v1',at='2026-11-13T00:00:00.000Z';
const article=env.AGU_LEGAL_CORPUS.laws[0].articles[0],deviceId=article.clauses[0].id;
const record=(id,content)=>({id:'aguc-'+id,deviceId,topic:article.topic,title:'Nota sintética '+id,
 content,type:'investigacao',stage:'investigacao_socratica',origin:'manual',createdAt:at,updatedAt:at,sources:[],version:1});
const rawCaderno=records=>JSON.stringify({schema:'agu-context-notebook-v1',createdAt:at,records});
const digest=s=>crypto.createHash('sha256').update(s).digest('hex');

// Reprodução S25-001: dados válidos pelo Caderno, com acentos em UTF-8.
const largeNotes=Array.from({length:650},(_,i)=>record(i,'é'.repeat(10000)));
assert.ok(largeNotes.every(x=>env.AGUCaderno.valid(x)),'fixture precisa ser válida no Caderno real');
state.set(key,rawCaderno(largeNotes));
const bundle={schema:'agu-portable-local-s20-v1',version:1,createdAt:at,items:{[key]:state.get(key)}};
const raw=JSON.stringify(bundle);
assert.ok(raw.length<MAX,'o cenário não ultrapassa 12 milhões de caracteres');
assert.ok(Buffer.byteLength(raw,'utf8')>MAX,'o cenário deve ultrapassar 12 MB em bytes reais');
const hashBefore=digest(state.get(key));
assert.throws(()=>env.AGUBackup20.capture(),/12 MB|limite de exportação/);
assert.throws(()=>env.AGUBackup20.validateBundle(raw),/12 MB|limite|excedendo/);
env.AGUBackup20.exportFile();
assert.equal(downloaded,0,'não baixar arquivo que a própria importação rejeitaria');
assert.ok(alerts.pop().includes('12 MB')||false,'orientar sobre o limite');
assert.equal(digest(state.get(key)),hashBefore,'exportação rejeitada preserva o Caderno');
console.log('S25_UTF8_REJEICAO_OK',JSON.stringify({caracteres:raw.length,bytes:Buffer.byteLength(raw,'utf8'),validos:largeNotes.length}));

// Outra reprodução: backup compacto sob o limite, mas JSON indentado acima de 12 MB.
// Usar registros válidos do Caderno; uma única nota gigantesca não é válida no Leitor.
state.clear();
const nearNotes=Array.from({length:760},(_,i)=>record('perto-'+i,'A'.repeat(14000)));
assert.ok(nearNotes.every(x=>env.AGUCaderno.valid(x)));
state.set(key,rawCaderno(nearNotes));
const base=env.AGUBackup20.capture(),compact=JSON.stringify(base),pretty=JSON.stringify(base,null,2);
const gap=Buffer.byteLength(pretty,'utf8')-Buffer.byteLength(compact,'utf8');
const remaining=MAX-Math.floor(gap/2)-Buffer.byteLength(compact,'utf8');
assert.ok(gap>0&&remaining>0&&remaining<=nearNotes.length*2000,'massa deve alcançar a fronteira de 12 MB');
let extra=remaining;
for(const item of nearNotes){const amount=Math.min(2000,extra);item.content+='A'.repeat(amount);extra-=amount;if(!extra)break;}
assert.ok(nearNotes.every(x=>env.AGUCaderno.valid(x)));
state.set(key,rawCaderno(nearNotes));
const compactValid=JSON.stringify(env.AGUBackup20.capture()),prettyOversized=JSON.stringify(env.AGUBackup20.capture(),null,2);
assert.ok(Buffer.byteLength(compactValid)<MAX&&Buffer.byteLength(prettyOversized)>MAX);
const before=downloaded;
env.AGUBackup20.exportFile();
assert.equal(downloaded,before,'não baixar JSON indentado acima de 12 MB');
assert.match(alerts.pop(),/12 MB/);
console.log('S25_JSON_FORMATADO_OK',JSON.stringify({compacto:Buffer.byteLength(compactValid),indentado:Buffer.byteLength(prettyOversized)}));

// Regressão positiva: JSON acentuado pequeno é exportável e importado sem sobrescrita.
state.clear();
const small=rawCaderno([record('pequeno','Interpretação jurídica — ação e revisão')]);
state.set(key,small);
env.AGUBackup20.exportFile();
assert.equal(downloaded,before+1);
assert.ok(exportedBlob.size<=MAX,'arquivo final sob o limite');
const safeBackup=JSON.stringify(env.AGUBackup20.capture(),null,2);
assert.ok(env.AGUBackup20.validateBundle(safeBackup));
state.clear();
const restored=env.AGUBackup20.importMissing(safeBackup);
assert.equal(restored.added,1);
assert.equal(digest(state.get(key)),digest(small));
assert.equal(env.AGUBackup20.importMissing(safeBackup).added,0,'importação repetida idempotente');
state.set(key,small+' ');
assert.equal(env.AGUBackup20.importMissing(safeBackup).added,0,'não sobrescrever categoria existente');
assert.equal(state.get(key),small+' ');
console.log('S25_RESTAURACAO_OK',JSON.stringify({sha256:digest(small),bytes:exportedBlob.size,categorias:1}));
console.log('Sprint 25: 3 cenários de limite real de bytes e recuperação sintética aprovados.');
