/* AGU Quiz · Revisão Inteligente v1 — módulo incremental, sem dados pessoais no repositório */
(function(global){
'use strict';
const KEY='agu_quiz_revisao_inteligente_v1';
const DAYS=[1,7,21,45];
const links={
 admin:'https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html',
 cpc:'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105compilada.htm',
 cf:'https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm',
 p15:'https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/187AGU_001_01.pdf',
 g15:'https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/Gab_Definitivo_187AGU_001_01.pdf',
 p23:'https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/804_AGU_ADVOGADO_001_01.PDF',
 g23:'https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/GAB_DEFINITIVO_804_AGU_ADVOGADO_001_01.PDF'
};
const card=(id,code,front,back,source,link,origin='autoral_fundamento_identificado')=>({id,kind:'flashcard',code,front,back,source,link,origin,validation:'B_pendente_revisao_independente'});
const CARDS=[
card('ri-adm-01','ADM-06','A competência administrativa federal é renunciável?','Não. É irrenunciável; admite delegação e avocação nos casos previstos em lei.','Lei 9.784/1999, art. 11',links.admin),
card('ri-adm-02','ADM-06','É necessária hierarquia para delegar competência?','Não. O art. 12 admite delegação parcial inclusive a não subordinado, sem impedimento legal.','Lei 9.784/1999, art. 12',links.admin),
card('ri-adm-03','ADM-06','Pode-se delegar a decisão de recurso administrativo?','Não. A delegação de decisão de recursos administrativos é vedada.','Lei 9.784/1999, art. 13, II',links.admin),
card('ri-adm-04','ADM-06','Quando é possível avocar competência?','Excepcional e temporariamente, por motivos relevantes justificados, de órgão hierarquicamente inferior.','Lei 9.784/1999, art. 15',links.admin),
card('ri-adm-05','ADM-23','Motivação escrita basta para sanar desvio de finalidade?','Não. A motivação não afasta eventual vício de finalidade nem torna verdadeiros motivos inexistentes.','Caderno AGU, ADM-02; Lei 9.784/1999, arts. 2º e 50',links.admin,'adaptado_de_dificuldade_da_aula'),
card('ri-adm-06','ADM-13','Vinculação ministerial equivale a hierarquia?','Não. Supervisão finalística sobre entidade descentralizada não cria subordinação hierárquica geral.','Caderno AGU, ADM-01; distinção organizacional','', 'adaptado_de_dificuldade_da_aula'),
card('ri-pc-01','PC-01','O juiz pode decidir sobre fundamento de ofício sem ouvir as partes?','Em regra, não. Deve oportunizar manifestação sobre fundamento não debatido.','CPC, art. 10',links.cpc),
card('ri-pc-02','PC-01','Há exceção ao contraditório prévio para tutela urgente?','Sim. O CPC admite tutela provisória de urgência sem oitiva prévia, com contraditório posterior.','CPC, art. 9º, parágrafo único, I',links.cpc),
card('ri-pc-03','PC-01','O juiz precisa enfrentar todo argumento da parte?','Deve enfrentar os argumentos capazes, em tese, de infirmar a conclusão adotada.','CPC, art. 489, § 1º, IV',links.cpc),
card('ri-con-01','CON-02','Constituição rígida pressupõe cláusulas pétreas?','Não. Rigidez é reforma por procedimento mais difícil; cláusulas pétreas são limites materiais.','Caderno CON-01, registro 18; CF, art. 60',links.cf,'adaptado_de_caderno'),
card('ri-con-02','CON-02','Fatores reais de poder em Lassalle equivalem à decisão constituinte em Schmitt?','Não. Poder social efetivo e decisão política fundamental são categorias diferentes.','Caderno CON-01, registros 10 e 11','', 'adaptado_de_caderno'),
card('ri-con-03','CON-50','Qual é a função constitucional da AGU?','Representar a União judicial/extrajudicialmente e prestar consultoria/assessoramento ao Executivo nos termos legais.','CF, art. 131, caput',links.cf),
{"id":"ri26-adm-01","kind":"flashcard","code":"ADM-06","front":"Órgãos sem hierarquia entre si podem receber competência delegada?","back":"Sim. A delegação parcial é possível mesmo sem subordinação, se não houver impedimento legal e houver conveniência fundada nas circunstâncias previstas na lei.","source":"Lei 9.784/1999, art. 12","link":"https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html","origin":"flashcard_autoral_estilo_cebraspe","validation":"A_dispositivo_normativo_conferido_pontualmente","checked":"2026-11-12","caseNote":"Caso prático: órgão A transfere atividade decisória a órgão B sem hierarquia; a ausência de subordinação, por si só, não invalida a delegação.","notOfficial":true},
{"id":"ri26-adm-02","kind":"flashcard","code":"ADM-06","front":"Publicar a delegação permite transferir decisão de recurso administrativo?","back":"Não. A decisão de recursos administrativos é indelegável; publicar o ato não afasta a proibição expressa.","source":"Lei 9.784/1999, arts. 13, II, e 14","link":"https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html","origin":"flashcard_autoral_estilo_cebraspe","validation":"A_dispositivo_normativo_conferido_pontualmente","checked":"2026-11-12","caseNote":"Armadilha Cebraspe: confundir requisito formal de publicidade com autorização material para delegar.","notOfficial":true},
{"id":"ri26-adm-03","kind":"flashcard","code":"ADM-06","front":"Quem é autor da decisão tomada por delegação?","back":"O delegado. A decisão deve mencionar expressamente a delegação e considera-se editada pelo delegado, não pelo delegante.","source":"Lei 9.784/1999, art. 14, § 3º","link":"https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html","origin":"flashcard_autoral_estilo_cebraspe","validation":"A_dispositivo_normativo_conferido_pontualmente","checked":"2026-11-12","caseNote":"O delegante conserva poder de revogar a delegação, mas isso não transfere a autoria jurídica da decisão ao delegante.","notOfficial":true},
{"id":"ri26-adm-04","kind":"flashcard","code":"ADM-06","front":"Ministro pode avocar definitivamente a competência de autarquia vinculada?","back":"Não por simples vinculação. A avocação exige hierarquia, excepcionalidade, motivação relevante e temporariedade; supervisão finalística não se confunde com hierarquia.","source":"Lei 9.784/1999, art. 15; distinção entre vinculação e hierarquia","link":"https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html","origin":"flashcard_autoral_estilo_cebraspe","validation":"A_dispositivo_normativo_conferido_pontualmente","checked":"2026-11-12","caseNote":"Caso: ministro supervisor tenta tomar para si todas as decisões permanentes de autarquia; não basta alegar supervisão ministerial.","notOfficial":true},
{"id":"ri26-adm-05","kind":"flashcard","code":"ADM-06","front":"Delegação administrativa é irrevogável após ser publicada?","back":"Não. A autoridade delegante pode revogar a delegação a qualquer tempo; o ato de revogação também deve ser publicado no meio oficial.","source":"Lei 9.784/1999, art. 14, caput e § 2º","link":"https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html","origin":"flashcard_autoral_estilo_cebraspe","validation":"A_dispositivo_normativo_conferido_pontualmente","checked":"2026-11-12","caseNote":"O art. 14 combina publicidade do ato e da revogação com revogabilidade a qualquer tempo.","notOfficial":true},
{"id":"ri26-pc-01","kind":"flashcard","code":"PC-03","front":"Juiz pode decidir fundamento de ofício sem ouvir as partes?","back":"Não, se não houve oportunidade de manifestação sobre o fundamento. O conhecimento de ofício não afasta a vedação à decisão-surpresa.","source":"CPC, art. 10","link":"https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html","origin":"flashcard_autoral_estilo_cebraspe","validation":"A_dispositivo_normativo_conferido_pontualmente","checked":"2026-11-12","caseNote":"Caso AGU: juiz extingue demanda por fundamento não debatido; a União deve examinar violação do contraditório, ainda que o tema seja de ofício.","notOfficial":true},
{"id":"ri26-pc-02","kind":"flashcard","code":"PC-03","front":"Tutela de urgência exige ouvir previamente a parte contrária?","back":"Não necessariamente. O CPC excepciona a tutela provisória de urgência da regra de prévia oitiva; o contraditório pode ser diferido.","source":"CPC, art. 9º, parágrafo único, I","link":"https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html","origin":"flashcard_autoral_estilo_cebraspe","validation":"A_dispositivo_normativo_conferido_pontualmente","checked":"2026-11-12","caseNote":"Armadilha: a regra de contraditório prévio tem exceções expressas, sem significar eliminação definitiva do direito de defesa.","notOfficial":true},
{"id":"ri26-pc-03","kind":"flashcard","code":"PC-03","front":"Citar artigo legal sem relacioná-lo ao caso fundamenta a decisão?","back":"Não. A mera referência ao texto normativo, sem demonstrar sua relação concreta com a causa, não satisfaz a fundamentação exigida pelo CPC.","source":"CPC, art. 489, § 1º, I","link":"https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html","origin":"flashcard_autoral_estilo_cebraspe","validation":"A_dispositivo_normativo_conferido_pontualmente","checked":"2026-11-12","caseNote":"Aplicação: decisão que somente transcreve um dispositivo legal deve justificar sua incidência no caso.","notOfficial":true},
{"id":"ri26-pc-04","kind":"flashcard","code":"PC-03","front":"Invocar precedente sem demonstrar sua pertinência basta?","back":"Não. É preciso identificar os fundamentos determinantes do precedente e demonstrar que o caso se ajusta a eles.","source":"CPC, art. 489, § 1º, V","link":"https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html","origin":"flashcard_autoral_estilo_cebraspe","validation":"A_dispositivo_normativo_conferido_pontualmente","checked":"2026-11-12","caseNote":"Armadilha: reproduzir ementa ou número de precedente não substitui análise de sua razão determinante.","notOfficial":true},
{"id":"ri26-con-01","kind":"flashcard","code":"CON-50","front":"Quem representa a União na execução da dívida ativa tributária?","back":"A Procuradoria-Geral da Fazenda Nacional, observado o disposto em lei. A competência está expressamente prevista na Constituição.","source":"CF/1988, art. 131, § 3º","link":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm","origin":"flashcard_autoral_estilo_cebraspe","validation":"A_dispositivo_normativo_conferido_pontualmente","checked":"2026-11-12","caseNote":"Caso AGU: distinguir a representação geral da União pela AGU da atribuição constitucional específica da PGFN na dívida ativa tributária.","notOfficial":true}
];
const exam=(year,number,key,code,theme,kind='ce')=>{
 const n=String(number).padStart(3,'0'),is15=year===2015;
 return {id:'of-'+year+'-adv-'+n,kind:'official',type:kind,code,
  sourceKind:'prova_oficial',organizer:'Cebraspe',career:'Advogado da União',
  year,exam:is15?'187AGU_001_01':'804_AGU_ADVOGADO_001_01',
  number,theme,key,status:key==='X'?'anulada':'gabarito_definitivo',
  validation:'gabarito_oficial_verificado_fundamentacao_atual_pendente',
  source:is15?'AGU 2015, prova e gabarito definitivo':'AGU 2023, prova e gabarito definitivo',
  examUrl:is15?links.p15:links.p23,keyUrl:is15?links.g15:links.g23};
};
const OFFICIAL=[
exam(2015,1,'E','CON-50','Estrutura e atribuições da AGU'),
exam(2015,2,'E','CON-50','Uniformização jurídica na AGU'),
exam(2015,3,'C','CON-50','Conciliação na administração federal'),
exam(2015,4,'C','CON-50','Termo de ajustamento e AGU'),
exam(2015,5,'E','ADM-17','Forma dos atos administrativos'),
exam(2015,6,'E','ADM-23','Motivação e forma dos atos'),
exam(2015,7,'C','ADM-27','Sustação de atos regulamentares'),
exam(2015,8,'C','ADM-27','Portarias e poder regulamentar'),
exam(2015,9,'E','ADM-27','Princípio da legalidade administrativa'),
exam(2015,10,'C','ADM-27','Poder regulamentar'),
exam(2015,15,'X','ADM-06','Item anulado'),
exam(2023,1,'A','CON-16','ADC','mc'),
exam(2023,2,'A','CON-15','ADI','mc'),
exam(2023,3,'D','CON-09','Poder constituinte','mc'),
exam(2023,4,'C','CON-07','Interpretação constitucional','mc'),
exam(2023,5,'B','CON-17','ADPF','mc'),
exam(2023,6,'B','CON-11','Controle difuso','mc'),
exam(2023,7,'X','CON-20','Item anulado','mc'),
exam(2023,8,'E','CON-24','Remédios constitucionais','mc'),
exam(2023,9,'C','CON-03','Constitucionalismo','mc'),
exam(2023,10,'A','CON-44','CNJ','mc'),
exam(2023,11,'E','CON-35','Terras devolutas','mc'),
exam(2023,12,'D','CON-53','Ordem econômica','mc')
];
const INLINE_ADAPTED={"of-2015-adv-001":{"year":2015,"n":1,"stem":"A Secretaria-Geral de Contencioso da AGU tem atribuição de subsidiar informações prestadas pelo presidente da República ao STF em mandados de segurança.","reason":"ERRADO. O art. 25, II, do Anexo I do Decreto nº 12.540/2025 exclui expressamente da atuação da Secretaria-Geral de Contencioso as informações do Presidente da República em mandados de segurança e de injunção. O art. 30, II, atribui à Consultoria-Geral da União o subsídio às informações prestadas pelo Presidente da República ao STF. Portanto, o item confunde a atuação da Secretaria-Geral de Contencioso perante o STF com uma atribuição específica da Consultoria-Geral. Gabarito definitivo da questão original de 2015: ERRADO. Revisão normativa pontual em 11/11/2026.","adapted":true,"sourceVerified":"2026-11-11","auditVerified":true,"auditDate":"2026-11-11","normRef":"Decreto nº 12.540/2025, Anexo I, arts. 25, II, e 30, II","normUrl":"https://www2.camara.leg.br/legin/fed/decret/2025/decreto-12540-30-junho-2025-797673-anexo-pe.pdf"},"of-2015-adv-002":{"year":2015,"n":2,"stem":"Havendo divergência de interpretação de lei entre consultorias jurídicas de dois ministérios, a uniformização deve ser feita pela Secretaria-Geral de Consultoria da AGU.","reason":"O gabarito definitivo julgou ERRADA essa atribuição específica da unidade mencionada. A organização interna da AGU pode mudar e exige atualização antes de utilizar o item como regra vigente.","adapted":true,"sourceVerified":"2026-11-11"},"of-2015-adv-003":{"year":2015,"n":3,"stem":"É possível submeter à Câmara de Conciliação e Arbitragem da Administração Federal conflito extrajudicial envolvendo órgão municipal e autarquia federal.","reason":"A banca julgou CERTO o cabimento da via conciliatória na situação descrita. Conferir competências e regras vigentes da Câmara antes de aplicar ao caso atual.","adapted":true,"sourceVerified":"2026-11-11"},"of-2015-adv-004":{"year":2015,"n":4,"stem":"Para prevenir litígio de interesse da União, o advogado-geral da União pode autorizar termo de ajustamento de conduta pela Administração federal, incluindo sanção pelo descumprimento.","reason":"A banca julgou CERTO o item de 2015. A autorização e as condições do ajuste precisam ser examinadas conforme a disciplina atualmente aplicável.","adapted":true,"sourceVerified":"2026-11-11"},"of-2015-adv-005":{"year":2015,"n":5,"stem":"Um ministro indeferiu pedido administrativo por despacho, com fundamento em nota técnica. O indeferimento deveria necessariamente ter a forma de resolução, e não de despacho.","reason":"ERRADO: a forma 'resolução' não é exigida apenas por se tratar de indeferimento. A motivação por referência à nota técnica é discussão distinta.","adapted":true,"sourceVerified":"2026-11-11"},"of-2015-adv-006":{"year":2015,"n":6,"stem":"O despacho que indefere pedido e remete a nota técnica pertinente apresenta vício de forma apenas porque não repete, no próprio texto, toda a fundamentação de fato e de direito.","reason":"ERRADO: a motivação pode ser realizada por remissão expressa a fundamentos de outra peça, conforme o caso (Lei 9.784/1999, art. 50, § 1º).","adapted":true,"sourceVerified":"2026-11-11"},"of-2015-adv-007":{"year":2015,"n":7,"stem":"Se um ministro regulamentar gratificação por portaria e ultrapassar seu poder regulamentar, o Congresso Nacional poderá sustar o ato.","reason":"CERTO, conforme a banca em 2015. A CF, art. 49, V, prevê competência congressual para sustar atos normativos do Executivo que exorbitem do poder regulamentar ou dos limites de delegação legislativa.","adapted":true,"sourceVerified":"2026-11-11"},"of-2015-adv-008":{"year":2015,"n":8,"stem":"Portarias ministeriais que regulamentam disposições de normas superiores são atos regulamentares de segundo grau.","reason":"CERTO no gabarito histórico: a portaria constitui ato infralegal subordinado às normas superiores, diferentemente de regulamento com fundamento diretamente em lei.","adapted":true,"sourceVerified":"2026-11-11"},"of-2015-adv-009":{"year":2015,"n":9,"stem":"Uma portaria ministerial pode criar gratificação de desempenho para servidores com base apenas no princípio constitucional da eficiência, sem autorização legal.","reason":"ERRADO: gratificação exige suporte legal; a eficiência não substitui reserva de lei para vantagens remuneratórias.","adapted":true,"sourceVerified":"2026-11-11"},"of-2023-adv-003":{"year":2023,"n":3,"stem":"Na classificação tradicional do poder constituinte originário, qual combinação descreve suas características jurídicas?","options":[{"id":"A","label":"Autônomo, limitado e incondicionado."},{"id":"B","label":"Subordinado, limitado e incondicionado."},{"id":"C","label":"Subordinado, ilimitado e condicionado."},{"id":"D","label":"Autônomo, ilimitado e incondicionado."},{"id":"E","label":"Autônomo, ilimitado e condicionado."}],"reason":"Alternativa D: na classificação tradicional, o poder constituinte originário instaura a ordem jurídica, não está juridicamente submetido ao ordenamento anterior e não depende de forma preestabelecida. Trata-se de caracterização jurídica, não de juízo de legitimidade democrática.","adapted":true,"sourceVerified":"2026-11-11"}};
const ALL=[...CARDS,...OFFICIAL], INDEX=new Map(ALL.map(x=>[x.id,x]));
const blank=()=>({schema:'agu-review-v1',attempts:[],cards:{},created:new Date().toISOString()});
let state;try{const parsed=JSON.parse(localStorage.getItem(KEY)||'null');state=parsed&&parsed.schema==='agu-review-v1'&&Array.isArray(parsed.attempts)&&parsed.cards&&typeof parsed.cards==='object'?parsed:blank()}catch(_){state=blank()}
let active=null,revealed=false,pick='',currentMode='auto';
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today=()=>new Date().toLocaleDateString('en-CA');
const when=(days)=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+days);return d.toLocaleDateString('en-CA')};
function persist(){localStorage.setItem(KEY,JSON.stringify(state))}
function stat(id){return state.cards[id]||{stage:0,due:null,errors:0,seen:0,ease:0}}
function urgent(x){
 const st=stat(x.id);
 if(x.status==='anulada')return -1000;
 const due=!st.due||st.due<=today();
 return (due?100:0)+(st.errors||0)*6+(!st.seen?8:0)+(st.due&&st.due<today()?10:0)+(x.kind==='flashcard'&&x.checked?14:0);
}
function candidates(kind,limit){
 return ALL.filter(x=>x.kind===kind&&x.status!=='anulada'&&(kind!=='official'||INLINE_ADAPTED[x.id]?.auditVerified===true)&&(!stat(x.id).due||stat(x.id).due<=today()))
 .sort((a,b)=>urgent(b)-urgent(a)||a.id.localeCompare(b.id)).slice(0,limit);
}
function summary(){
 const due=ALL.filter(x=>x.status!=='anulada'&&stat(x.id).due&&stat(x.id).due<=today());
 const newCards=CARDS.filter(x=>!stat(x.id).seen).length;
 const repeated=ALL.filter(x=>stat(x.id).errors>=2);
 const attempts=state.attempts.filter(x=>x.kind==='official'&&typeof x.correct==='boolean');
 const next=Object.values(state.cards).filter(x=>x.due&&x.due>today()).map(x=>x.due).sort()[0]||'Nenhuma agendada';
 return {due:due.length,flashDue:due.filter(x=>x.kind==='flashcard').length,officialDue:due.filter(x=>x.kind==='official').length,newCards,repeated:repeated.length,attempts:attempts.length,correct:attempts.filter(x=>x.correct).length,next};
}
function plan(){return [...candidates('flashcard',5),...candidates('official',3)]}
function choose(mode='auto'){
 currentMode=mode;
 const pool=mode==='flashcard'?candidates('flashcard',30):mode==='official'?candidates('official',30):plan();
 active=pool[0]||null;revealed=false;pick='';
 return active;
}
function select(id){const q=INDEX.get(id);if(!q||(q.kind==='official'&&!INLINE_ADAPTED[id]?.auditVerified))return;active=q;revealed=false;pick='';window.render()}
function rating(grade){
 if(!active||!revealed||!['errei','dificil','lembrei','facil'].includes(grade)||active.status==='anulada')return;
 const prior=stat(active.id),isOfficial=active.kind==='official';
 if(isOfficial&&(!pick||!INLINE_ADAPTED[active.id]?.auditVerified))return;
 const correct=isOfficial?pick===active.key:null;
 // A correctness miss overrides self-declared ease.
 const applied=isOfficial&&!correct?'errei':grade;
 let stage=prior.stage||0;
 if(applied==='errei')stage=0;
 else if(applied==='dificil')stage=Math.max(0,stage-1);
 else if(applied==='lembrei')stage=Math.min(3,stage+1);
 else stage=Math.min(3,stage+2);
 const days=DAYS[stage];
 const st={stage,due:when(days),seen:(prior.seen||0)+1,errors:(prior.errors||0)+(applied==='errei'?1:0),ease:applied,last:new Date().toISOString(),lastCorrect:correct};
 state.cards[active.id]=st;
 state.attempts.push({id:'rv-'+Date.now()+'-'+Math.random().toString(36).slice(2,8),itemId:active.id,kind:active.kind,code:active.code,at:st.last,rating:applied,selected:isOfficial?pick:null,correct,sourceStatus:active.validation,due:st.due,stage,origin:active.kind==='official'?'prova_oficial':'flashcard_autoral'});
 persist();choose(currentMode);window.render();
}
function reveal(){if(!active)return;if(active.kind==='official'&&(!pick||!INLINE_ADAPTED[active.id]))return;revealed=true;window.render()}
function chooseAnswer(v){if(!active||active.kind!=='official'||revealed||!INLINE_ADAPTED[active.id]?.auditVerified)return;if(!(/^[CE]$/.test(v)||/^[A-E]$/.test(v)))return;pick=v;window.render()}
function go(mode){choose(mode);window.render()}
function exportData(){
 const blob=new Blob([JSON.stringify({schema:'agu-review-backup-v1',exported:new Date().toISOString(),data:state},null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='AGU_Revisao_Inteligente_backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);
}
function importBackup(input){
 const file=input.files&&input.files[0];if(!file)return;
 const reader=new FileReader();reader.onload=()=>{
 try{
  const x=JSON.parse(String(reader.result));
  if(x.schema!=='agu-review-backup-v1'||x.data?.schema!=='agu-review-v1'||!Array.isArray(x.data.attempts)||!x.data.cards)throw Error('Backup incompatível');
  const newIds=new Set(state.attempts.map(a=>a.id));
  const extras=x.data.attempts.filter(a=>a&&a.id&&INDEX.has(a.itemId)&&!newIds.has(a.id));
  if(!confirm('Importar '+extras.length+' tentativas adicionais sem apagar o histórico atual?'))return;
  // Do not silently replace current spaced states with potentially older backups.
  state.attempts.push(...extras);persist();window.render();
  alert('Tentativas importadas. Estados de revisão existentes preservados; reprogramação deve ser conferida manualmente.');
 }catch(e){alert('Não foi possível importar: '+e.message)}
 };reader.readAsText(file);
}
function cardHTML(x){
 const st=stat(x.id),base='<div class="note">Tópico <b>'+esc(x.code)+'</b> · '+esc(x.kind==='official'?'Cebraspe · Advogado da União':'Flashcard autoral')+' · '+esc(x.validation)+'</div>';
 if(x.kind==='flashcard'){
  return '<h2 class="question-title">'+esc(x.front)+'</h2>'+base+
   (revealed?'<div class="feedback"><b>Resposta e fundamento</b><p>'+esc(x.back)+'</p>'+(x.caseNote?'<div class="note"><b>Aplicação e armadilha de prova:</b> '+esc(x.caseNote)+'</div>':'')+'<p class="small muted">'+esc(x.source)+(x.checked?' · conferência normativa '+esc(x.checked):'')+'</p>'+(x.link?'<a href="'+esc(x.link)+'" target="_blank" rel="noopener noreferrer">Consultar fonte</a>':'<p>Fonte de caderno; revisão jurídica independente pendente.</p>')+(x.notOfficial?'<p class="small muted">Flashcard autoral, não transcrição de prova Cebraspe. Verificação normativa pontual, sem certificação integral de jurisprudência.</p>':'')+'</div>':'<div class="btnrow"><button class="primary" onclick="AGUReview.reveal()">Mostrar verso</button></div>');
 }
 const q=INLINE_ADAPTED[x.id];
 const a=x.type==='ce'?['C','E']:['A','B','C','D','E'];
 const examUrl=x.year===2015?links.p15:links.p23,keyUrl=x.year===2015?links.g15:links.g23;
 const legalLink=q?.auditVerified?'<div class="note"><b>Fundamento verificado:</b> '+esc(q.normRef)+' · <a href="'+esc(q.normUrl)+'" target="_blank" rel="noopener noreferrer">Consultar norma oficial</a></div>':'';
 const prompt=q?.auditVerified?'<div class="note"><b>Adaptação autoral de questão oficial:</b> o texto abaixo não é reprodução literal da banca. Gabarito informado refere-se ao item original.</div><h2 class="question-title">'+esc(q.stem)+'</h2>':
 '<p><b>'+esc(x.theme)+'</b></p><p>Este item ainda não tem versão interna conferida. Consulte o PDF original; não será pontuado no modo automático até que esteja preparado.</p>';
 return '<h2>AGU '+x.year+' · '+esc(x.exam)+' · item '+x.number+'</h2>'+base+prompt+
 '<div class="btnrow"><a target="_blank" rel="noopener noreferrer" href="'+examUrl+'">Caderno original PDF</a><a target="_blank" rel="noopener noreferrer" href="'+keyUrl+'">Gabarito definitivo PDF</a></div>'+legalLink+
 (x.status==='anulada'?'<p class="note">Item anulado: não há pontuação nem revisão avaliativa.</p>':
 !q?.auditVerified?'<div class="note">Questão em revisão jurídica: não disponível para pontuação automática.</div>':
  '<div class="options">'+a.map(v=>'<button '+(revealed?'disabled ':'')+'class="option '+(pick===v?'selected':'')+'" onclick="AGUReview.answer(\''+v+'\')">'+(q.options?.find(o=>o.id===v)?v+' — '+esc(q.options.find(o=>o.id===v).label):x.type==='ce'?(v==='C'?'CERTO':'ERRADO'):v)+'</button>').join('')+'</div>'+
  (revealed?'<div class="feedback '+(pick===x.key?'':'bad')+'"><b>Gabarito definitivo da questão original: '+esc(x.key)+'</b><p>'+esc(pick===x.key?'Resposta correspondente à referência histórica.':'Resposta diferente da referência histórica.')+'</p><p>'+esc(q.reason)+'</p><p class="small muted">Comentário pedagógico com dispositivo normativo identificado quando indicado; acerto isolado não certifica domínio.</p></div>':'<div class="btnrow"><button class="primary" '+(!pick?'disabled':'')+' onclick="AGUReview.reveal()">Conferir resposta</button></div>'));
}
function page(){
 const sum=summary(),p=plan(),hist=state.attempts.slice(-5).reverse();
 if(active&&!INDEX.has(active.id))active=null;
 return '<div class="top"><div><div class="eyebrow">AGU / RECUPERAÇÃO ATIVA</div><h1>Revisão Inteligente</h1><div class="muted">Retenção D+1 · D+7 · D+21 · D+45 · 5 a 8 minutos no Foco do Dia</div></div></div>'+
 '<div class="grid"><div class="card"><div class="muted">Revisões vencidas</div><div class="metric">'+sum.due+'</div><div class="small muted">Novos flashcards: '+sum.newCards+'</div></div><div class="card"><div class="muted">Erros recorrentes</div><div class="metric">'+sum.repeated+'</div><div class="small muted">2+ erros no mesmo cartão</div></div><div class="card"><div class="muted">Questões oficiais respondidas</div><div class="metric">'+sum.attempts+'</div><div class="small muted">Acertos: '+sum.correct+' (amostra '+sum.attempts+')</div></div></div>'+
 '<div class="card"><h2>Foco do Dia · revisão sugerida</h2><p>Sem nova notificação: até cinco flashcards e três questões oficiais; prioriza vencidos, erros e itens ainda não vistos.</p><p class="small muted">Próxima revisão futura: '+esc(sum.next)+'</p>'+
 '<div class="btnrow"><button class="primary" onclick="AGUReview.go(\'auto\')">Iniciar seleção automática</button><button class="secondary" onclick="AGUReview.go(\'flashcard\')">Flashcards</button><button class="secondary" onclick="AGUReview.go(\'official\')">Questões oficiais</button></div></div>'+
 (active?'<div class="card"><div class="split"><span class="chip">'+esc(active.kind==='flashcard'?'Recuperação ativa':'Questão oficial')+'</span><span class="chip">Revisão anterior: '+(stat(active.id).seen||0)+' · próxima '+esc(stat(active.id).due||'inédita')+'</span></div>'+cardHTML(active)+
  (revealed&&active.status!=='anulada'?'<div class="section"><p>Como foi recuperar a resposta? Na questão oficial, um erro prevalece sobre a avaliação subjetiva.</p><div class="btnrow">'+[['errei','Errei'],['dificil','Difícil'],['lembrei','Lembrei'],['facil','Fácil']].map(([v,label])=>'<button class="'+(v==='errei'?'danger':'secondary')+'" onclick="AGUReview.rate(\''+v+'\')">'+label+'</button>').join('')+'</div></div>':'')+
 '</div>':'<div class="card"><h2>Sem itens na fila</h2><p>Nenhuma revisão vencida nesta modalidade. Volte no próximo vencimento ou escolha outra modalidade.</p></div>')+
 '<div class="card"><h2>Histórico e exportação</h2><p class="small muted">Dados salvos apenas neste navegador, sem login nem sincronização entre dispositivos. Faça backups periódicos.</p>'+
 '<div class="btnrow"><button class="secondary" onclick="AGUReview.exportData()">Exportar backup JSON</button><button class="secondary" onclick="document.getElementById(\'review-import\').click()">Importar sem substituir</button><input id="review-import" type="file" class="hidden" accept="application/json" onchange="AGUReview.importBackup(this)"></div>'+
 '<div class="small muted">'+(hist.length?hist.map(x=>esc(x.code)+' · '+esc(x.rating)+' · '+esc(x.due)).join('<hr>'):'Nenhuma tentativa registrada')+'</div></div>'+
 '<div class="note">Fundamentação de cartões autorais: estado B, sem homologação humana independente. Gabaritos Cebraspe: verificados como resultado histórico; vigência e justificativa podem exigir nova auditoria. Revisões não são certificação de domínio jurídico.</div>';
}
function disciplineMetrics(){
 const out={};
 for(const item of ALL){
  const code=item.code.split('-')[0];
  if(!out[code])out[code]={attempts:0,correct:0,wrong:0,seen:0,due:0,errors:0,scheduled:0};
  const st=stat(item.id);
  if(st.seen){
   out[code].seen++;
   out[code].errors+=st.errors||0;
   if(st.due&&st.due<=today()&&item.status!=='anulada')out[code].due++;
   if(st.due&&st.due>today()&&item.status!=='anulada')out[code].scheduled++;
  }
 }
 state.attempts.forEach(a=>{
  const code=String(a.code||'').split('-')[0];
  if(!out[code])out[code]={attempts:0,correct:0,wrong:0,seen:0,due:0,errors:0,scheduled:0};
  if(a.kind==='official'&&typeof a.correct==='boolean'){
   out[code].attempts++;if(a.correct)out[code].correct++;else out[code].wrong++;
  }
 });
 return out;
}
global.AGUReview={page,go,reveal,answer:chooseAnswer,rate:rating,exportData,importBackup,summary,disciplineMetrics,deck:()=>({flashcards:CARDS.length,official:OFFICIAL.length,annulled:OFFICIAL.filter(x=>x.status==='anulada').length})};
})(window);
