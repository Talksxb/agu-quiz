/* AGU Quiz · Revisão Inteligente v1 — módulo incremental, sem dados pessoais no repositório */
(function(global){
'use strict';
const KEY='agu_quiz_revisao_inteligente_v1';
const READER_KEY='agu_leitor_juridico_s13_v1';
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
{...exam(2023,7,'X','CON-22','Item anulado','mc'),legacyCode:'CON-20',secondaryCurricularIds:['CON-20'],excludeFromCurrentScoring:true},
exam(2023,8,'E','CON-24','Remédios constitucionais','mc'),
exam(2023,9,'C','CON-03','Constitucionalismo','mc'),
exam(2023,10,'A','CON-44','CNJ','mc'),
exam(2023,11,'E','CON-35','Terras devolutas','mc'),
exam(2023,12,'D','CON-53','Ordem econômica','mc')
];
const INLINE_ADAPTED={"of-2015-adv-001":{"year":2015,"n":1,"stem":"A Secretaria-Geral de Contencioso da AGU tem atribuição de subsidiar informações prestadas pelo presidente da República ao STF em mandados de segurança.","reason":"ERRADO. O art. 25, II, do Anexo I do Decreto nº 12.540/2025 exclui expressamente da atuação da Secretaria-Geral de Contencioso as informações do Presidente da República em mandados de segurança e de injunção. O art. 30, II, atribui à Consultoria-Geral da União o subsídio às informações prestadas pelo Presidente da República ao STF. Portanto, o item confunde a atuação da Secretaria-Geral de Contencioso perante o STF com uma atribuição específica da Consultoria-Geral. Gabarito definitivo da questão original de 2015: ERRADO. Revisão normativa pontual em 11/11/2026.","adapted":true,"sourceVerified":"2026-11-11","auditVerified":false,"historicVerification":"pendente_fundamentacao_na_data_da_prova_2015","auditDate":"2026-11-11","normRef":"Decreto nº 12.540/2025, Anexo I, arts. 25, II, e 30, II","normUrl":"https://www2.camara.leg.br/legin/fed/decret/2025/decreto-12540-30-junho-2025-797673-anexo-pe.pdf"},"of-2015-adv-002":{"year":2015,"n":2,"stem":"Havendo divergência de interpretação de lei entre consultorias jurídicas de dois ministérios, a uniformização deve ser feita pela Secretaria-Geral de Consultoria da AGU.","reason":"O gabarito definitivo julgou ERRADA essa atribuição específica da unidade mencionada. A organização interna da AGU pode mudar e exige atualização antes de utilizar o item como regra vigente.","adapted":true,"sourceVerified":"2026-11-11"},"of-2015-adv-003":{"year":2015,"n":3,"stem":"É possível submeter à Câmara de Conciliação e Arbitragem da Administração Federal conflito extrajudicial envolvendo órgão municipal e autarquia federal.","reason":"A banca julgou CERTO o cabimento da via conciliatória na situação descrita. Conferir competências e regras vigentes da Câmara antes de aplicar ao caso atual.","adapted":true,"sourceVerified":"2026-11-11"},"of-2015-adv-004":{"year":2015,"n":4,"stem":"Para prevenir litígio de interesse da União, o advogado-geral da União pode autorizar termo de ajustamento de conduta pela Administração federal, incluindo sanção pelo descumprimento.","reason":"A banca julgou CERTO o item de 2015. A autorização e as condições do ajuste precisam ser examinadas conforme a disciplina atualmente aplicável.","adapted":true,"sourceVerified":"2026-11-11"},"of-2015-adv-005":{"year":2015,"n":5,"stem":"Um ministro indeferiu pedido administrativo por despacho, com fundamento em nota técnica. O indeferimento deveria necessariamente ter a forma de resolução, e não de despacho.","reason":"ERRADO: a forma 'resolução' não é exigida apenas por se tratar de indeferimento. A motivação por referência à nota técnica é discussão distinta.","adapted":true,"sourceVerified":"2026-11-11"},"of-2015-adv-006":{"year":2015,"n":6,"stem":"O despacho que indefere pedido e remete a nota técnica pertinente apresenta vício de forma apenas porque não repete, no próprio texto, toda a fundamentação de fato e de direito.","reason":"ERRADO: a motivação pode ser realizada por remissão expressa a fundamentos de outra peça, conforme o caso (Lei 9.784/1999, art. 50, § 1º).","adapted":true,"sourceVerified":"2026-11-11"},"of-2015-adv-007":{"year":2015,"n":7,"stem":"Se um ministro regulamentar gratificação por portaria e ultrapassar seu poder regulamentar, o Congresso Nacional poderá sustar o ato.","reason":"CERTO, conforme a banca em 2015. A CF, art. 49, V, prevê competência congressual para sustar atos normativos do Executivo que exorbitem do poder regulamentar ou dos limites de delegação legislativa.","adapted":true,"sourceVerified":"2026-11-11"},"of-2015-adv-008":{"year":2015,"n":8,"stem":"Portarias ministeriais que regulamentam disposições de normas superiores são atos regulamentares de segundo grau.","reason":"CERTO no gabarito histórico: a portaria constitui ato infralegal subordinado às normas superiores, diferentemente de regulamento com fundamento diretamente em lei.","adapted":true,"sourceVerified":"2026-11-11"},"of-2015-adv-009":{"year":2015,"n":9,"stem":"Uma portaria ministerial pode criar gratificação de desempenho para servidores com base apenas no princípio constitucional da eficiência, sem autorização legal.","reason":"ERRADO: gratificação exige suporte legal; a eficiência não substitui reserva de lei para vantagens remuneratórias.","adapted":true,"sourceVerified":"2026-11-11"},"of-2023-adv-003":{"year":2023,"n":3,"stem":"Na classificação tradicional do poder constituinte originário, qual combinação descreve suas características jurídicas?","options":[{"id":"A","label":"Autônomo, limitado e incondicionado."},{"id":"B","label":"Subordinado, limitado e incondicionado."},{"id":"C","label":"Subordinado, ilimitado e condicionado."},{"id":"D","label":"Autônomo, ilimitado e incondicionado."},{"id":"E","label":"Autônomo, ilimitado e condicionado."}],"reason":"Alternativa D: na classificação tradicional, o poder constituinte originário instaura a ordem jurídica, não está juridicamente submetido ao ordenamento anterior e não depende de forma preestabelecida. Trata-se de caracterização jurídica, não de juízo de legitimidade democrática.","adapted":true,"sourceVerified":"2026-11-11"}};
// Extensão incremental: lote público, carregado antes deste módulo.
for(const x of global.AGU_OFFICIAL_S18?.questions||[]){
 if(x.id!=='of-2015-adv-048')continue;
 INLINE_ADAPTED[x.id]={year:2015,n:48,stem:x.adaptedStem,reason:x.historicReason,currentReason:x.currentReason,historicReason:x.historicReason,trap:x.trap,adapted:true,sourceVerified:x.sourceVerified,auditVerified:true,auditDate:x.sourceVerified,normRef:x.legalReason,normUrl:x.lawUrl,stfUrl:x.stfUrl,sourceId:x.reference,deviceId:x.deviceId,examLocator:x.examLocator,keyLocator:x.keyLocator};
}

/* Sprint 19: promover apenas itens C/E conferidos, reutilizando IDs e histórico de revisão legados. */
for(const x of global.AGU_OFFICIAL_S19?.questions||[]){
 if(!/^of-2015-adv-\d{3}$/.test(x.id)||x.exam!=='187AGU_001_07'||x.year!==2015||x.type!=='ce'||!['C','E'].includes(x.key)||x.annulled||!x.historicReason||!x.currentReason||!x.deviceId)continue;
 const existing=OFFICIAL.find(y=>y.id===x.id&&y.year===x.year&&y.number===x.number);
 if(!existing)continue;
 Object.assign(existing,{code:x.code,exam:x.exam,examUrl:x.examUrl,keyUrl:x.keyUrl,key:x.key,theme:x.title,
  deviceId:x.deviceId,validation:'gabarito_historico_e_fundamento_pontualmente_confirmados',
  source:'AGU 2015, caderno 187AGU_001_07 e gabarito definitivo'});
 INLINE_ADAPTED[x.id]={year:x.year,n:x.number,stem:x.adaptedStem,reason:x.historicReason,
  historicReason:x.historicReason,currentReason:x.currentReason,trap:x.trap,adapted:true,
  auditVerified:true,auditDate:x.sourceVerified,sourceVerified:x.sourceVerified,sourceId:x.reference,
  deviceId:x.deviceId,examLocator:x.examLocator,keyLocator:x.keyLocator,
  normRef:x.legalReason,normUrl:x.lawUrl,legalScope:x.legalScope};
}
const AUD03_CARDS=Array.isArray(global.AGU_AUD03_CARDS)?global.AGU_AUD03_CARDS.filter(x=>x&&x.kind==='flashcard'&&/^aud03-flc-\d{3}$/.test(x.id)&&typeof x.front==='string'&&typeof x.back==='string'&&typeof x.link==='string'&&/^https:\/\//.test(x.link)):[];
// CARTOES-AUD-01: cards novos e autorais, selecionados por fonte normativa pública atual.
// O gabarito da prova de 2015 é registro histórico e não certifica o fundamento atual.
const AUD02_2015_CARDS=Array.isArray(global.AGU_AUD02_2015_CARDS)?global.AGU_AUD02_2015_CARDS.filter(x=>x&&x.kind==='flashcard'&&/^aud02-2015-flc-\d{3}$/.test(x.id)&&typeof x.front==='string'&&typeof x.back==='string'&&typeof x.link==='string'&&/^https:\/\//.test(x.link)&&x.notOfficial===true&&x.historicalExam?.exam==='187AGU_001_07'&&['C','E'].includes(x.historicalExam.key)):[];
// CARTOES-AUD-02: lote autoral separado, com referência histórica pública e fonte atual.
const AUD02_2015_CARDS_02=Array.isArray(global.AGU_AUD02_2015_CARDS_LOTE02)?global.AGU_AUD02_2015_CARDS_LOTE02.filter(x=>x&&x.kind==='flashcard'&&/^aud02-2015-flc-02-\d{3}$/.test(x.id)&&typeof x.front==='string'&&typeof x.back==='string'&&typeof x.link==='string'&&/^https:\/\//.test(x.link)&&x.notOfficial===true&&x.historicalExam?.exam==='187AGU_001_07'&&['C','E'].includes(x.historicalExam.key)):[];
// CARTOES-AUD-03: candidatos históricos individualmente verificados em fontes públicas.
const AUD02_2015_CARDS_03=Array.isArray(global.AGU_AUD02_2015_CARDS_LOTE03)?global.AGU_AUD02_2015_CARDS_LOTE03.filter(x=>x&&x.kind==='flashcard'&&/^aud02-2015-flc-03-\d{3}$/.test(x.id)&&typeof x.front==='string'&&typeof x.back==='string'&&typeof x.link==='string'&&/^https:\/\//.test(x.link)&&x.notOfficial===true&&x.historicalExam?.exam==='187AGU_001_07'&&['C','E'].includes(x.historicalExam.key)):[];
// BACKLOG-SEG-001: duas sínteses autorais verificadas pontualmente; mesmo motor, agenda e histórico.
const SEG001_CARDS=Array.isArray(global.AGU_SEG001_CARDS)?global.AGU_SEG001_CARDS.filter(x=>x&&x.kind==='flashcard'&&/^seg001-flc-00[12]$/.test(x.id)&&x.code==='SEG-01'&&typeof x.front==='string'&&typeof x.back==='string'&&typeof x.source==='string'&&/^https:\/\//.test(x.link)&&x.notOfficial===true&&x.sourceKind==='norma_oficial'&&x.validation==='dispositivo_publico_conferido_pontualmente_sem_certificacao_integral'&&x.reviewedAt==='2026-11-26'):[];
// Conserva ID e state de revisão: apenas corrige classificação curricular de cartões legados.
const CURRICULAR_CORRECTIONS={'ri-pc-01':'PC-03','ri-pc-02':'PC-03','ri-pc-03':'PC-03'};
for(const c of CARDS)if(CURRICULAR_CORRECTIONS[c.id]){c.code=CURRICULAR_CORRECTIONS[c.id];c.curricularMigration='PC-01 → PC-03 (sem mudar ID, respostas ou histórico)'}
const S18_ITEMS=Array.isArray(global.AGU_OFFICIAL_S18?.questions)?global.AGU_OFFICIAL_S18.questions.filter(x=>x.id==='of-2015-adv-048'&&x.exam==='187AGU_001_07'&&x.number===48&&x.key==='C'&&x.deviceId==='CF88:art131:caput').map(x=>({id:x.id,kind:'official',type:'ce',code:x.code,sourceKind:'prova_oficial',organizer:'Cebraspe',career:'Advogado da União',year:2015,exam:x.exam,number:x.number,theme:x.title,key:x.key,status:'gabarito_definitivo',validation:'gabarito_historico_e_fundamento_pontualmente_confirmados',source:'AGU 2015, caderno e gabarito definitivo',examUrl:x.examUrl,keyUrl:x.keyUrl,deviceId:x.deviceId})):[];
// MÉTODO-AGU-001: adaptador opcional de dados editoriais; intervalos e gravação permanecem no motor original.
const EDITORIAL_CARDS=(Array.isArray(global.AGU_EDITORIAL_CARDS)?global.AGU_EDITORIAL_CARDS:[]).filter(x=>x&&x.kind==='flashcard'&&/^metodo-[a-z0-9-]+$/.test(x.id)&&typeof x.front==='string'&&typeof x.back==='string'&&/^https:\/\//.test(x.link)&&['aprovado','suspenso'].includes(x.editorialStatus)&&x.approval?.reviewer);
const editorialEligible=x=>!x.editorialStatus||x.editorialStatus==='aprovado';
const ALL=[...EDITORIAL_CARDS,...CARDS,...AUD03_CARDS,...AUD02_2015_CARDS,...AUD02_2015_CARDS_02,...AUD02_2015_CARDS_03,...SEG001_CARDS,...OFFICIAL,...S18_ITEMS];
const IDS=ALL.map(x=>x.id);
if(new Set(IDS).size!==IDS.length)throw Error('IDs duplicados no acervo AGU');
const INDEX=new Map(ALL.map(x=>[x.id,x]));
// LEG11: identidade histórica fechada dos flashcards já existentes. Não cria cartões.
// Código granular só entra como topic quando também documentado no corpus público.
// A referência arquivada sobrevive à indisponibilidade posterior de um cartão na interface.
const NOTEBOOK_CARD_HISTORY=Object.freeze(Object.fromEntries([
 ['ADM-06','ri-adm-01 ri-adm-02 ri-adm-03 ri-adm-04 ri26-adm-01 ri26-adm-02 ri26-adm-03 ri26-adm-04 ri26-adm-05 aud03-flc-001 aud03-flc-002 aud03-flc-003','ADM-06'],
 ['ADM-13','ri-adm-06 aud03-flc-004 aud03-flc-005 aud03-flc-006',null],
 ['ADM-23','ri-adm-05 aud03-flc-007 aud03-flc-008 aud03-flc-009',null],
 ['PC-03','ri-pc-01 ri-pc-02 ri-pc-03 ri26-pc-01 ri26-pc-02 ri26-pc-03 ri26-pc-04 aud03-flc-010 aud03-flc-011 aud03-flc-012',null],
 ['CON-02','ri-con-01 ri-con-02',null],
 ['CON-50','ri-con-03 ri26-con-01 aud03-flc-013 aud03-flc-014 aud02-2015-flc-001 aud02-2015-flc-007 aud02-2015-flc-02-002 aud02-2015-flc-02-003','CON-50'],
 ['ADM-25','aud02-2015-flc-002 aud02-2015-flc-003 aud02-2015-flc-004 aud02-2015-flc-005 aud02-2015-flc-02-012',null],
 ['ADM-27','aud02-2015-flc-02-009 aud02-2015-flc-03-007 aud02-2015-flc-03-008',null],
 ['ADM-17','aud02-2015-flc-03-005',null],
 ['ADM-58','aud02-2015-flc-006',null],
 ['CON-24','aud02-2015-flc-008',null],
 ['SEG-01','seg001-flc-001 seg001-flc-002',null]
].flatMap(([code,ids,topic])=>ids.split(' ').map(id=>[id,Object.freeze({id,code,topic,label:'Flashcard '+id+' · '+code})]))));
function notebookHistoricCard(id){const x=INDEX.get(id);if(x?.editorialStatus)return {id:x.id,code:x.code,topic:null,label:'Flashcard editorial '+x.id};return typeof id==='string'&&Object.hasOwn(NOTEBOOK_CARD_HISTORY,id)?NOTEBOOK_CARD_HISTORY[id]:null}
function notebookEligibleCard(id){
 const ref=notebookHistoricCard(id),x=INDEX.get(id);
 return ref&&x?.kind==='flashcard'&&editorialEligible(x)&&x.code===ref.code&&x.notebookUnavailable!==true?x:null;
}
const blank=()=>({schema:'agu-review-v1',attempts:[],cards:{},created:new Date().toISOString()});
let state;try{const parsed=JSON.parse(localStorage.getItem(KEY)||'null');state=parsed&&parsed.schema==='agu-review-v1'&&Array.isArray(parsed.attempts)&&parsed.cards&&typeof parsed.cards==='object'?parsed:blank()}catch(_){state=blank()}
let active=null,revealed=false,pick='',currentMode='auto';
let notebookReturn=null;
// UX-BARALHOS-01: a sessão é um campo opcional do estado legado, sem chave extra,
// alteração de intervalo ou migração. Só tentativas avaliadas contam como estudo.
let deckFilters={discipline:'todos',topic:'',difficulty:'todas',status:'todos'};
let deckOptionsOpen=false; // Preferência visual transitória, sem armazenamento.
let pendingDeck=null; // Escolha transitória: nenhuma tentativa ou preferência é gravada ao filtrar.
const REVIEW_STATES=Object.freeze(['todos','pendentes','vencidos','hoje','ineditos','futuros','sem_data','dificuldades']);
const DECK_TITLES=Object.freeze({
 'ADM-06':'Competência e delegação administrativa',
 'ADM-13':'Supervisão ministerial e autonomia',
 'ADM-23':'Motivo, motivação e convalidação',
 'PC-03':'Normas fundamentais do processo civil',
 'CON-02':'Constituição e teoria constitucional',
 'CON-50':'Advocacia-Geral da União e PGFN',
 'ADM-25':'Licitações, contratos e registro de preços',
 'ADM-17':'Forma dos atos administrativos',
 'ADM-27':'Poder regulamentar e seus limites',
 'ADM-58':'Improbidade administrativa e acordos',
 'CON-24':'Mandado de injunção',
 'SEG-01':'Seguridade social e EC 103/2019'
});
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// S33: os três botões comprovadamente substituídos por render() no Chrome.
function focusAfter(selector,keyboard){if(keyboard)document.querySelector?.(selector)?.focus?.({preventScroll:false})}
const localISO=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=()=>localISO(new Date());
const when=(days)=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+days);return localISO(d)};
function persist(){localStorage.setItem(KEY,JSON.stringify(state))}
function stat(id){return state.cards[id]||{stage:0,due:null,errors:0,seen:0,ease:0}}
function flashcards(){return ALL.filter(x=>editorialEligible(x)&&x.kind==='flashcard')}
// UX03: a importação parcial antiga incorpora tentativas, mas deliberadamente não
// altera cards[id].seen/due. Não apresentar tais cartões como nunca avaliados.
// O índice é apenas de leitura e não cria agenda nem reconstrói estágios.
let historyCache=null;
function recordedHistory(){
 const attempts=state.attempts;
 if(historyCache?.source===attempts&&historyCache.length===attempts.length)return historyCache.counts;
 const counts=new Map();
 for(const a of attempts){
  if(a?.kind!=='flashcard'||INDEX.get(a.itemId)?.kind!=='flashcard'||!['errei','dificil','lembrei','facil'].includes(a.rating))continue;
  counts.set(a.itemId,(counts.get(a.itemId)||0)+1);
 }
 historyCache={source:attempts,length:attempts.length,counts};return counts;
}
function historicalCount(id){return Math.max(Number(stat(id).seen)||0,recordedHistory().get(id)||0)}
// "Vencido" é estritamente anterior a hoje. "Vence hoje" não é atraso.
// Uma tentativa importada sem agenda não é inédita nem gera vencimento.
function reviewState(x){
 const s=stat(x.id);
 if(!(s.seen>0))return historicalCount(x.id)>0?'sem_data':'ineditos';
 const due=typeof s.due==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s.due)?s.due:null;
 if(!due)return 'sem_data';
 return due<today()?'vencidos':due===today()?'hoje':'futuros';
}
// AUD-UX-006: consulta o histórico existente; não modifica estágio ou agenda.
function personalDifficulty(x){
 let latest=null,time=-Infinity;
 for(const a of state.attempts){
  if(a?.kind!=='flashcard'||a.itemId!==x.id||!['errei','dificil','lembrei','facil'].includes(a.rating)||!dateIso(a.at))continue;
  const t=Date.parse(a.at);if(t>=time){latest=a.rating;time=t}
 }
 return latest==='errei'||latest==='dificil';
}
function matchesStatus(x,filter=deckFilters.status){
 if(filter==='dificuldades')return personalDifficulty(x);
 const status=reviewState(x);
 return filter==='todos'||(filter==='pendentes'&&(status==='vencidos'||status==='hoje'))||status===filter;
}
function selectedCards(deck){return deck.cards.filter(x=>matchesDifficulty(x)&&matchesStatus(x))}
function deckList(){
 const groups=new Map();
 for(const x of flashcards()){
  if(!groups.has(x.code))groups.set(x.code,[]);
  groups.get(x.code).push(x);
 }
 return [...groups].map(([code,cards])=>{
  const meta=global.AGUDisciplines?.forTopic?.(code)||{code:code.split('-')[0],name:code.split('-')[0]};
  const difficulties={};for(const x of cards){const k=Number.isInteger(x.level)?'original:'+x.level:'sem_nivel';difficulties[k]=(difficulties[k]||0)+1}
  const statusCounts={ineditos:0,vencidos:0,hoje:0,futuros:0,sem_data:0};
  for(const card of cards)statusCounts[reviewState(card)]++;
  return {code,title:DECK_TITLES[code]||'Assunto '+code,discipline:meta.code,name:meta.name,cards,
   count:cards.length,seen:cards.filter(x=>historicalCount(x.id)>0).length,
   new:statusCounts.ineditos,due:statusCounts.vencidos+statusCounts.hoje,
   overdue:statusCounts.vencidos,todayDue:statusCounts.hoje,future:statusCounts.futuros,
   noDate:statusCounts.sem_data,statusCounts,difficulties};
 }).sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')||a.code.localeCompare(b.code));
}
// Contrato público estrito para futura navegação do planejamento: igualdade
// literal com o ID do baralho, nunca substring, nome de matéria ou prefixo.
// Hoje AGUPlanner utiliza valores como "ADM/Atos administrativos": retorna null.
function exactDeck(topic){
 if(typeof topic!=='string'||!/^[A-Z]+(?:-[A-Z]+)*-\d{2,3}$/.test(topic))return null;
 const deck=deckList().find(x=>x.code===topic);
 return deck?{code:deck.code,discipline:deck.discipline,count:deck.count}:null;
}
function difficulty(x){return Number.isInteger(x.level)?'Nível cognitivo original '+x.level:'Nível não informado'}
const REVIEW_LABELS=Object.freeze({ineditos:'Inédito',vencidos:'Revisão vencida',hoje:'Vence hoje',futuros:'Revisão futura',sem_data:'Avaliado sem data de revisão'});
function matchesDifficulty(x,filter=deckFilters.difficulty){return filter==='todas'||(filter==='sem_nivel'?!Number.isInteger(x.level):'original:'+x.level===filter)}
// Nunca traduzir level 2, 3 ou 4 em Fundamentos / Distinções / Aplicação AGU:
// os metadados originais não documentam correspondência com essa nova taxonomia.
// AUD-UX-007: modo de sessão, não um ID curricular nem um baralho adicional.
const SHORT_QUEUE='fila-geral',SHORT_LIMIT=5;
function sessionTitle(code){return code===SHORT_QUEUE?'Sessão curta de revisão':code}
function validSession(s){
 if(!s||!['em_andamento','concluida'].includes(s.status)||(s.code!==SHORT_QUEUE&&!deckList().some(x=>x.code===s.code))||!Array.isArray(s.order)||!s.order.length||s.order.length>1000||new Set(s.order).size!==s.order.length||!Number.isInteger(s.index)||s.index<0||s.index>=s.order.length||!s.ratings||typeof s.ratings!=='object'||Array.isArray(s.ratings)||typeof s.revealed!=='boolean')return false;
 if(s.code===SHORT_QUEUE&&s.order.length>SHORT_LIMIT)return false;
 if(!s.order.every(id=>INDEX.get(id)?.kind==='flashcard'&&(s.code===SHORT_QUEUE||INDEX.get(id).code===s.code)))return false;
 if(Object.keys(s.ratings).some(id=>!s.order.includes(id)||typeof s.ratings[id]!=='string'||!state.attempts.some(a=>a.id===s.ratings[id]&&a.itemId===id)))return false;
 return s.status!=='concluida'||s.order.every(id=>s.ratings[id]);
}
function savedSession(){return validSession(state.librarySession)?state.librarySession:null}
function saveDeckSession(s){
 const next={...state,librarySession:s};
 try{localStorage.setItem(KEY,JSON.stringify(next))}catch(_){alert('Não foi possível salvar a sessão. Os registros anteriores foram preservados.');return false}
 state=next;return true;
}
function beginDeck(code,order,keyboard=false){
 const deck=deckList().find(x=>x.code===code),short=code===SHORT_QUEUE;
 if(!Array.isArray(order)||!order.length||new Set(order).size!==order.length)return false;
 if(short?JSON.stringify(order)!==JSON.stringify(candidates('flashcard',SHORT_LIMIT).map(x=>x.id)):!deck||!order.every(id=>deck.cards.some(x=>x.id===id)))return false;
 const session={code,order:order.slice(),index:0,ratings:{},revealed:false,status:'em_andamento',startedAt:new Date().toISOString()};
 if(!saveDeckSession(session))return false;
 pendingDeck=null;
 return deckResume(keyboard);
}
// Congela somente os primeiros cinco candidatos da fila original; não há novo ranking.
function deckShortStart(keyboard=false){
 if(savedSession()?.status==='em_andamento')return false;
 const order=candidates('flashcard',SHORT_LIMIT).map(x=>x.id);
 return order.length?beginDeck(SHORT_QUEUE,order,keyboard):false;
}
function deckStart(code,keyboard=false){
 const deck=deckList().find(x=>x.code===code);if(!deck)return false;
 const selected=selectedCards(deck);if(!selected.length)return false;
 const prior=savedSession();
 if(prior?.status==='em_andamento'){
  pendingDeck={code,order:selected.map(x=>x.id)};
  global.render?.();focusAfter('#agu-deck-choice',keyboard);return true;
 }
 return beginDeck(code,selected.map(x=>x.id),keyboard);
}
function deckDecide(choice,keyboard=false){
 const prior=savedSession(),pending=pendingDeck;
 if(choice==='cancelar'){
  pendingDeck=null;global.render?.();focusAfter('#agu-deck-filter-status',keyboard);return true;
 }
 if(!prior||prior.status!=='em_andamento'||!pending)return false;
 if(choice==='continuar'){pendingDeck=null;return deckResume(keyboard)}
 if(choice==='novo')return beginDeck(pending.code,pending.order,keyboard);
 return false;
}
function deckRepeat(keyboard=false){
 const s=savedSession();
 if(!s||s.status!=='concluida')return false;
 return s.code===SHORT_QUEUE?deckShortStart(keyboard):beginDeck(s.code,s.order,keyboard);
}
function deckResume(keyboard=false){
 const s=savedSession();if(!s||s.status!=='em_andamento')return false;
 if(s.order.some(id=>!editorialEligible(INDEX.get(id)))){global.alert?.('Um cartão desta sessão aguarda revalidação editorial. A sessão, as respostas e a agenda foram preservadas. Escolha uma seleção de cartões aprovados para continuar.');return false}
 pendingDeck=null;
 currentMode='deck';active=INDEX.get(s.order[s.index]);revealed=s.revealed;pick='';global.render?.();
 global.document?.querySelector?.('.agu-deck-session')?.scrollIntoView?.({block:'start'});
 focusAfter(s.code===SHORT_QUEUE&&revealed&&!s.ratings[active.id]?'#agu-deck-rating-errei':'#agu-deck-face, #agu-deck-next',keyboard);return true;
}
function deckPause(keyboard=false){
 if(currentMode!=='deck')return false;
 currentMode='auto';active=null;revealed=false;global.render?.();
 global.document?.querySelector?.('#agu-deck-library')?.scrollIntoView?.({block:'start'});
 focusAfter(savedSession()?.status==='em_andamento'?'#agu-deck-resume':'#agu-deck-library h2',keyboard);return true;
}
function deckMove(step,keyboard=false){
 const s=savedSession();if(currentMode!=='deck'||!s||s.status!=='em_andamento'||![-1,1].includes(step))return false;
 const nextIndex=s.index+step;if(nextIndex<0||nextIndex>=s.order.length)return false;
 const next={...s,index:nextIndex,revealed:!!s.ratings[s.order[nextIndex]]};
 if(!saveDeckSession(next))return false;
 active=INDEX.get(next.order[nextIndex]);revealed=next.revealed;global.render?.();
 global.document?.querySelector?.('.agu-deck-session')?.scrollIntoView?.({block:'start'});
 focusAfter('#agu-deck-face, #agu-deck-next',keyboard);return true;
}
// A sugestão deriva do primeiro candidato da fila original, sem novo ranking.
function suggestedDeck(){
 const next=candidates('flashcard',1)[0];if(!next)return null;
 const deck=deckList().find(d=>d.code===next.code);if(!deck)return null;
 const status=reviewState(next);
 return {code:deck.code,title:deck.title,status:status==='vencidos'||status==='hoje'?'pendentes':status};
}
function deckSuggested(keyboard=false){
 const next=suggestedDeck();if(!next)return false;
 deckFilters={discipline:'todos',topic:next.code,difficulty:'todas',status:next.status};
 return deckStart(next.code,keyboard);
}
function deckDifficulties(keyboard=false){
 deckFilters={discipline:'todos',topic:'',difficulty:'todas',status:'dificuldades'};
 deckOptionsOpen=true;pendingDeck=null;
 global.render?.();focusAfter('#agu-deck-filter-status',keyboard);
 global.document?.querySelector?.('#agu-deck-filter-status')?.scrollIntoView?.({block:'nearest'});
 return true;
}
function deckMore(open){deckOptionsOpen=open===true}
function deckFilter(key,value){
 if(key==='discipline')deckFilters.discipline=String(value);
 else if(key==='topic')deckFilters.topic=String(value).slice(0,120);
 else if(key==='difficulty')deckFilters.difficulty=String(value);
 else if(key==='status'&&REVIEW_STATES.includes(value))deckFilters.status=value;
 else if(key==='due')deckFilters.status=value?'pendentes':'todos'; // Compatibilidade com controles UX01.
 else return false;
 pendingDeck=null;
 global.render?.();focusAfter('#agu-deck-filter-'+(key==='due'?'status':key),true);return true;
}
function deckClearFilters(keyboard=false){
 deckFilters={discipline:'todos',topic:'',difficulty:'todas',status:'todos'};pendingDeck=null;
 global.render?.();focusAfter('#agu-deck-filter-discipline',keyboard);return true;
}
function deckNotebook(keyboard=false){
 // Caminho legado mantido: permite consultar a lista geral sem interferir na sessão.
 if(currentMode!=='deck'||typeof global.setView!=='function'||!global.AGULegal?.tab)return false;
 global.setView('legal');global.AGULegal.tab('para_caderno',keyboard);return true;
}
function flashNotebookForm(x,prefix){
 if(!notebookEligibleCard(x?.id))return '';
 return '<details class="agu-ctx-box agu-flash-notebook"><summary>Para meu caderno · flashcard</summary>'+
 '<p class="small muted">Anote apenas uma dúvida ou distinção para escrever depois à mão. Isto não revela a resposta nem altera a revisão.</p>'+
 '<label for="'+prefix+'-input">Minha pergunta para o caderno físico</label>'+
 '<textarea id="'+prefix+'-input" rows="3" maxlength="450" placeholder="O que preciso distinguir ou recuperar?"></textarea>'+
 '<button type="button" class="secondary" id="'+prefix+'-save" onclick="AGUReview.notebookSaveCard(\''+esc(x.id)+'\',\''+prefix+'\',event.detail===0)">Guardar para meu caderno</button>'+
 '<p class="small muted" tabindex="-1" role="status" aria-live="polite" id="'+prefix+'-status"></p></details>';
}
function notebookSaveCard(id,prefix,keyboard=false){
 const session=currentMode==='deck'?savedSession():null;
 if(!notebookEligibleCard(id)||(currentMode==='deck'?
  !(session?.status==='em_andamento'&&session.order[session.index]===id):
  !(active?.kind==='flashcard'&&active.id===id)))return false;
 if(!['agu-deck-notebook','agu-flash-notebook'].includes(prefix))return false;
 const field=document.getElementById(prefix+'-input'),status=document.getElementById(prefix+'-status'),prompt=field?.value||'';
 if(!field||!status)return false;
 const ok=global.AGULegal?.notebookSaveCard?.(id,prompt)===true;
 status.textContent=ok?'Marcação guardada para seu caderno físico.':'Não foi possível guardar. Confira o texto e o limite de 300 marcações; seus dados anteriores foram preservados.';
 if(ok)field.value='';
 if(keyboard)status.focus?.({preventScroll:false});
 return ok;
}
function notebookOpenCard(id,keyboard=false){
 if(!notebookEligibleCard(id)||typeof global.setView!=='function'||!focusCard(id))return false;
 // Apenas a seleção visual muda; não grava tentativas, sessão, estágio ou revisão.
 global.setView?.('review');
 focusAfter('.agu-flash-notebook > summary',keyboard);
 return true;
}
function urgent(x){
 const st=stat(x.id);
 if(x.status==='anulada')return -1000;
 const due=!st.due||st.due<=today();
 return (due?100:0)+(st.errors||0)*6+(!st.seen?8:0)+(st.due&&st.due<today()?10:0)+(x.kind==='flashcard'&&(x.checked||x.reviewedAt)?14:0);
}
function candidates(kind,limit){
 return ALL.filter(x=>editorialEligible(x)&&x.kind===kind&&x.status!=='anulada'&&(kind!=='official'||INLINE_ADAPTED[x.id]?.auditVerified===true)&&(!stat(x.id).due||stat(x.id).due<=today()))
 .sort((a,b)=>urgent(b)-urgent(a)||a.id.localeCompare(b.id)).slice(0,limit);
}
function summary(){
 const due=ALL.filter(x=>editorialEligible(x)&&x.status!=='anulada'&&stat(x.id).due&&stat(x.id).due<=today());
 const newCards=ALL.filter(x=>editorialEligible(x)&&x.kind==='flashcard'&&!historicalCount(x.id)).length;
 const repeated=ALL.filter(x=>editorialEligible(x)&&stat(x.id).errors>=2);
 const attempts=state.attempts.filter(x=>x.kind==='official'&&typeof x.correct==='boolean');
 const next=Object.values(state.cards).filter(x=>x.due&&x.due>today()).map(x=>x.due).sort()[0]||'Nenhuma agendada';
 return {due:due.length,flashDue:due.filter(x=>x.kind==='flashcard').length,officialDue:due.filter(x=>x.kind==='official').length,newCards,repeated:repeated.length,attempts:attempts.length,correct:attempts.filter(x=>x.correct).length,next};
}
/* LEG08: somente revisão já agendada pelo motor de cartões; nenhuma agenda nova. */
function scheduledTopic(){
 if(!active||!active.code)return null;
 const s=stat(active.id);
 return typeof s.due==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s.due)&&s.due<=today()?active.code:null;
}
function readerState(){
 const s=global.AGULegal?.peek?.();
 return s&&global.AGUBackup20?.validateRecord?.(READER_KEY,s)?s:null;
}
function notebookDue(){
 const topic=scheduledTopic(),s=readerState();
 if(!topic||!s)return [];
 return (s.forNotebook||[]).filter(x=>x.status==='pendente'&&x.topic===topic);
}
function notebookPanel(){
 const list=notebookDue();
 if(!list.length)return '';
 const s=readerState(),orphan=(s?.forNotebook||[]).filter(x=>x.status==='pendente'&&x.topic===null).length;
 return '<section class="card agu-review-notebook" aria-label="Para meu caderno durante esta revisão"><h3 id="agu-review-notebook-heading" tabindex="-1">Para meu caderno · '+esc(scheduledTopic())+'</h3><p class="small muted">Perguntas que você marcou para anotar à mão. Terminar esta revisão não muda o estado delas.</p>'+
 list.map(x=>'<article class="agu-notice agu-review-notebook-item"><p><b>'+esc(x.prompt)+'</b></p><p class="agu-muted">'+(x.origin==='flashcard_existente'?'Flashcard · '+esc(x.cardLabel):x.origin==='questao_verificada'?'Questão oficial · '+esc(x.questionLabel):x.origin==='estudo_integrado'?'Estudo integrado · '+esc(x.deviceId)+' · sessão '+esc(x.sessionId):esc(x.lawId)+' · '+esc(x.unitId))+' · '+esc(x.createdAt.slice(0,10))+'</p><div class="btnrow">'+
 (global.AGULegal?.notebookCanOpenOrigin?.(x.id)?'<button type="button" class="secondary" id="agu-review-notebook-origin-'+esc(x.id)+'" onclick="AGUReview.notebookOrigin(\''+esc(x.id)+'\',event.detail===0)">'+(x.origin==='flashcard_existente'?'Abrir flashcard de origem':x.origin==='questao_verificada'?'Abrir questão de origem':x.origin==='estudo_integrado'?'Retomar sessão de estudo':'Abrir dispositivo legal')+'</button>':'<span class="small muted">'+(x.origin==='flashcard_existente'?'Flashcard não disponível nesta versão.':x.origin==='questao_verificada'?'Questão não disponível nesta versão.':'Sessão original indisponível para retomada.')+'</span>')+
 '<button type="button" class="secondary" onclick="AGUReview.notebookStatus(\''+esc(x.id)+'\',\'anotado\',event.detail===0)">Anotei no meu caderno</button>'+
 '<button type="button" class="secondary" onclick="AGUReview.notebookStatus(\''+esc(x.id)+'\',\'dispensado\',event.detail===0)">Dispensar</button></div></article>').join('')+
 (orphan?'<p class="small muted">Há também '+orphan+' marcação(ões) sem tópico curricular comprovado, consultáveis na lista geral do leitor. Elas não entram automaticamente nesta revisão.</p>':'')+
 '<p class="small muted">Se não escolher uma ação, a marcação permanecerá pendente.</p></section>';
}
function notebookStatus(id,status,keyboard=false){
 if(!['anotado','dispensado'].includes(status)||!notebookDue().some(x=>x.id===id))return false;
 const done=global.AGULegal?.notebookSetStatus?.(id,status)===true;
 if(done&&keyboard){
  const next=document.querySelector?.('#agu-review-notebook-heading')||document.querySelector?.('#main .question-title')||document.querySelector?.('#main h1');
  if(next){next.tabIndex=-1;next.focus?.({preventScroll:false})}
 }
 return done;
}
function notebookOrigin(id,keyboard=false){
 if(!notebookDue().some(x=>x.id===id)||!global.AGULegal?.notebookCanOpenOrigin?.(id)||typeof global.setView!=='function')return false;
 // A navegação interna não atualiza a URL. Não restaurar um ?abrir=lei antigo ao voltar da revisão.
 const q=new URLSearchParams(global.location?.search||'');
 const path=(global.location?.pathname||'/')+(q.get('abrir')==='questao'?'?abrir=questao':'');
 const mark=readerState()?.forNotebook?.find(x=>x.id===id),flash=mark?.origin==='flashcard_existente';
 notebookReturn={id,path,keyboard,source:flash?'flashcard':'legal',
  ...(flash?{mode:currentMode,activeId:active?.id||null,revealed,pick}:{})};
 if(!flash)global.setView('legal');
 if(global.AGULegal?.notebookOrigin?.(id)===true)return true;
 notebookReturn=null;global.setView('review');return false;
}
function notebookReturnPanel(){
 if(!notebookReturn)return '';
 return '<div class="card agu-review-back"><button type="button" class="secondary" id="agu-review-return" onclick="AGUReview.returnFromNotebook()">← Voltar à revisão programada</button><p class="small muted">A revisão e sua resposta permanecem como estavam. A origem foi aberta apenas para consulta.</p></div>';
}
function returnFromNotebook(){
 if(!notebookReturn)return false;
 const previous=notebookReturn;notebookReturn=null;
 if(previous.source==='flashcard'){
  currentMode=previous.mode;active=INDEX.get(previous.activeId)||null;
  revealed=previous.revealed;pick=previous.pick;
 }
 if(global.history?.replaceState&&previous.path)global.history.replaceState(null,'',previous.path);
 global.setView?.('review');
 focusAfter('#agu-review-notebook-origin-'+previous.id,true);
 return true;
}
function plan(){return [...candidates('flashcard',5),...candidates('official',3)]}
function choose(mode='auto'){
 currentMode=mode;
 const pool=mode==='flashcard'?candidates('flashcard',30):mode==='official'?candidates('official',30):plan();
 active=pool[0]||null;revealed=false;pick='';
 return active;
}
function select(id,keyboard=false){const q=INDEX.get(id);if(!q||!editorialEligible(q)||(q.kind==='official'&&!INLINE_ADAPTED[id]?.auditVerified))return;currentMode=q.kind==='official'?'official':'flashcard';active=q;revealed=false;pick='';window.render();focusAfter('button[onclick^="AGUReview.reveal("]',keyboard)}
function rating(grade,keyboard=false){
 if(!active||!editorialEligible(active)||!revealed||!['errei','dificil','lembrei','facil'].includes(grade)||active.status==='anulada')return;
 const session=currentMode==='deck'?savedSession():null;
 if(currentMode==='deck'&&(!session||session.status!=='em_andamento'||session.order[session.index]!==active.id||session.ratings[active.id]))return false;
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
 const attempt={...(active.editorialVersion?{editorialCardVersion:active.editorialVersion}:{}),id:'rv-'+Date.now()+'-'+Math.random().toString(36).slice(2,8),itemId:active.id,kind:active.kind,code:active.code,at:st.last,rating:applied,selected:isOfficial?pick:null,correct,sourceStatus:active.validation,due:st.due,stage,origin:active.kind==='official'?'prova_oficial':'flashcard_autoral'};
 if(session){
  const ratings={...session.ratings,[active.id]:attempt.id};
  const nextIndex=session.order.findIndex((id,i)=>i>session.index&&!ratings[id]);
  const wrapIndex=session.order.findIndex(id=>!ratings[id]);
  const index=nextIndex>=0?nextIndex:wrapIndex>=0?wrapIndex:session.index;
  const complete=wrapIndex<0;
  const next={...state,cards:{...state.cards,[active.id]:st},attempts:state.attempts.concat(attempt),
   librarySession:{...session,ratings,index,revealed:false,status:complete?'concluida':'em_andamento',updatedAt:st.last}};
  try{localStorage.setItem(KEY,JSON.stringify(next))}catch(_){alert('A avaliação não foi salva. Tente novamente; nenhuma tentativa foi adicionada.');return false}
  state=next;active=complete?null:INDEX.get(session.order[index]);revealed=false;
  global.render?.();global.document?.querySelector?.('.agu-deck-session')?.scrollIntoView?.({block:'start'});
  focusAfter(complete?'#agu-deck-done':'#agu-deck-face',keyboard);return true;
 }
 state.cards[active.id]=st;
 state.attempts.push(attempt);
 persist();
 if(currentMode==='integrated'||currentMode==='integrated_official'){
  const completed=state.attempts[state.attempts.length-1];
  if(global.AGUStudy?.onRated)global.AGUStudy.onRated({itemId:completed.itemId,attemptId:completed.id,due:completed.due,rating:completed.rating,at:completed.at});
  active=null;revealed=false;pick='';
 }else choose(currentMode);
 window.render();
 focusAfter('button[onclick^="AGUReview.reveal("]',keyboard);
}
// AUD-UX-008: alternar somente a face atual, sem avaliar ou alterar agenda.
function deckHide(keyboard=false){
 const s=savedSession();
 if(currentMode!=='deck'||!active||!s||s.status!=='em_andamento'||s.order[s.index]!==active.id||!s.revealed)return false;
 if(!saveDeckSession({...s,revealed:false}))return false;
 revealed=false;global.render?.();focusAfter('#agu-deck-face',keyboard);return true;
}
function reveal(keyboard=false){
 if(!active)return;if(active.kind==='official'&&(!pick||!INLINE_ADAPTED[active.id]))return;
 if(currentMode==='deck'){
  const s=savedSession();if(!s||s.order[s.index]!==active.id)return;
  if(!saveDeckSession({...s,revealed:true}))return;
 }
 revealed=true;window.render();focusAfter(currentMode==='deck'?(savedSession()?.ratings[active.id]?'#agu-deck-hide':'#agu-deck-rating-errei'):'button[onclick^="AGUReview.rate(\'errei\'"]',keyboard);
}
function chooseAnswer(v,keyboard=false){if(!active||active.kind!=='official'||revealed||!INLINE_ADAPTED[active.id]?.auditVerified)return;if(!(active.type==='ce'?/^[CE]$/:/^[A-E]$/).test(v))return;pick=v;window.render();focusAfter('button.option.selected',keyboard)}
function go(mode,keyboard=false){choose(mode);window.render();focusAfter('button[onclick^="AGUReview.go(\''+mode+'\'"]',keyboard)}
// AUD-UX-001: atalho de apresentação para a fila original, sem criar sessão ou agenda.
function reviewNow(keyboard=false){
 if(!candidates('flashcard',1).length)return false;
 go('flashcard');
 global.document?.querySelector?.('#agu-review-active')?.scrollIntoView?.({block:'start'});
 focusAfter('#agu-review-active button[onclick^="AGUReview.reveal("]',keyboard);
 return true;
}
function exportData(){
 const blob=new Blob([JSON.stringify({schema:'agu-review-backup-v1',exported:new Date().toISOString(),data:state},null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='AGU_Revisao_Inteligente_backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);
}
/* Sprint 20 — validação de backups de tentativas sem substituir estados de revisão atuais. */
const BACKUP_LIMIT=3000000;
const dateIso=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}T/.test(x)&&Number.isFinite(Date.parse(x));
const dueIso=x=>x===null||x===undefined||(typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x+'T12:00:00Z')));
function validAttempt(x){
 const card=INDEX.get(x?.itemId);
 if(!x||!card||typeof x.id!=='string'||!/^rv-[a-zA-Z0-9-]{1,112}$/.test(x.id)||x.kind!==card.kind||!dateIso(x.at))return false;
 if(!['errei','dificil','lembrei','facil'].includes(x.rating)||!dueIso(x.due)||!Number.isInteger(x.stage)||x.stage<0||x.stage>3)return false;
 if(typeof x.code!=='string'||x.code.length>80||typeof x.sourceStatus!=='string'||x.sourceStatus.length>180)return false;
 if(card.kind==='official'){
  if(!['C','E','A','B','D'].includes(x.selected)||typeof x.correct!=='boolean')return false;
  if(card.type==='ce'&&!['C','E'].includes(x.selected))return false;
 }else if(x.selected!==null||x.correct!==null)return false;
 return true;
}
function validateBackupObject(raw){
 const x=typeof raw==='string'?JSON.parse(raw):raw;
 if(x?.schema!=='agu-review-backup-v1'||x.data?.schema!=='agu-review-v1'||!Array.isArray(x.data.attempts)||!x.data.cards||typeof x.data.cards!=='object'||Array.isArray(x.data.cards)||x.data.attempts.length>20000)throw Error('Backup de revisão incompatível.');
 const ids=new Set();
 for(const attempt of x.data.attempts){
  if(!validAttempt(attempt)||ids.has(attempt.id))throw Error('Tentativa inválida ou ID repetido no backup.');
  ids.add(attempt.id);
 }
 return x.data.attempts;
}
function mergeBackupObject(raw){
 const imported=validateBackupObject(raw);
 const known=new Set(state.attempts.map(a=>a.id));
 const extras=imported.filter(a=>!known.has(a.id));
 // Não importar 'cards': estágios e agendas atuais não são sobrescritos.
 if(extras.length){
  const next={...state,attempts:state.attempts.concat(extras.map(a=>({...a})))};
  localStorage.setItem(KEY,JSON.stringify(next));state=next;
 }
 return {added:extras.length,skipped:imported.length-extras.length,reviewSchedulePreserved:true};
}
function importBackup(input){
 const file=input?.files?.[0];if(!file)return;
 if(file.size>BACKUP_LIMIT){alert('Backup acima do limite de 3 MB.');return}
 const reader=new FileReader();reader.onload=()=>{
  try{
   const raw=String(reader.result);
   if(raw.length>BACKUP_LIMIT)throw Error('Backup excede o limite permitido.');
   const incoming=validateBackupObject(raw);
   const known=new Set(state.attempts.map(a=>a.id));
   const add=incoming.filter(a=>!known.has(a.id)).length;
   if(!confirm('Importar '+add+' tentativa(s) adicional(is), mantendo o histórico e o agendamento existentes?'))return;
   const result=mergeBackupObject(raw);window.render();
   alert(result.added+' tentativa(s) importada(s), '+result.skipped+' já existentes. O agendamento atual permanece preservado.');
  }catch(e){alert('Importação rejeitada: '+e.message)}
 };reader.onerror=()=>alert('Falha na leitura do backup.');reader.readAsText(file);
}
// AUD-UX-009: vínculos pontuais por identidade documental, não por semelhança de assunto.
const CONTEXT_PAIRS=Object.freeze([['aud02-2015-flc-03-007',7,'ADM-27','C'],['aud02-2015-flc-006',22,'ADM-58','E']]);
function contextPair(x){
 const p=CONTEXT_PAIRS.find(row=>row[0]===x?.id);
 if(!p||!editorialEligible(x)||x.kind!=='flashcard'||x.notOfficial!==true||x.validation!=='dispositivo_publico_conferido_pontualmente_sem_certificacao_integral')return null;
 const [,n,code,key]=p,h=x.historicalExam,source=global.AGUCurrentQuestions?.source;
 const id='AGU-2015-187AGU-001-07-Q'+String(n).padStart(3,'0');
 const q=global.AGUCurrentQuestions?.items?.find(v=>v.id===id);
 const hist=global.AGUQuestionCatalog2015?.find(v=>v.n===n);
 if(x.code!==code||h?.year!==2015||h.exam!=='187AGU_001_07'||h.number!==n||h.key!==key||hist?.code!==code||hist.key!==key||!global.AGUVigenteContract?.eligible(q)||q.n!==n||q.code!==code||q.historicalKey!==key||q.currentKey!==key||source?.variant!==h.exam||source.examUrl!==h.examUrl||source.keyUrl!==h.keyUrl)return null;
 return {id,n,code,card:x.id,key};
}
function contextErrors(){
 const contract=global.AGUVigenteContract,items=global.AGUCurrentQuestions?.items||[];
 let current=new Map(),historical=new Map();
 try{
  const value=JSON.parse(localStorage.getItem(contract.KEY)||'null');
  // Leitura derivada: registros de itens conhecidos que perderam elegibilidade não
  // participam da seleção. Não modificar nem importar o histórico original.
  if(value?.schema===1&&Array.isArray(value.attempts)&&value.attempts.length<=5000&&value.attempts.every(a=>a&&typeof a.id==='string'&&a.id.length<=100)&&new Set(value.attempts.map(a=>a.id)).size===value.attempts.length){
   const ineligible=new Set(items.filter(q=>!contract.eligible(q)).map(q=>q.id));
   const eligibleHistory={schema:1,attempts:value.attempts.filter(a=>!ineligible.has(a.question))};
   if(contract.validHistory(eligibleHistory,items))current=contract.latest(eligibleHistory);
  }
 }catch(_){}
 // Mesmo contrato de identidade/origem do banco histórico, com conferência da alternativa.
 if(!global.AGUHomeContext?.()?.demo){
  const rows=global.AGUPlannerContext?.()?.answers;
  if(Array.isArray(rows))for(const a of rows){
   if(a?.origin!=='oficial_cebraspe_2015'||!['C','E'].includes(a.selected)||typeof a.correct!=='boolean'||!Number.isFinite(Date.parse(a.date)))continue;
   const p=CONTEXT_PAIRS.map(row=>contextPair(INDEX.get(row[0]))).find(v=>v?.id===a.question);
   if(!p||a.correct!==(a.selected===p.key))continue;
   const prev=historical.get(p.id);if(!prev||Date.parse(a.date)>=Date.parse(prev.date))historical.set(p.id,a);
  }
 }
 return CONTEXT_PAIRS.map(row=>contextPair(INDEX.get(row[0]))).filter(Boolean).map(p=>({...p,historical:historical.get(p.id)?.correct===false,current:current.get(p.id)?.correct===false})).filter(p=>p.historical||p.current);
}
function contextErrorsHTML(){
 const rows=contextErrors();if(!rows.length)return '';
 const blocked=savedSession()?.status==='em_andamento';
 return '<section class="card" id="agu-context-errors" aria-labelledby="agu-context-errors-title"><h2 id="agu-context-errors-title">Retomar fundamentos de erros</h2><p>Última resposta incorreta em cada origem. Estes cartões autorais retomam fundamento documentado, não reproduzem nem corrigem automaticamente a questão. Os históricos e a agenda permanecem separados.</p>'+
 rows.map(p=>'<article class="agu-notice"><h3>AGU 2015 · Q'+p.n+' · '+esc(p.code)+'</h3><p>'+[p.historical?'Erro no histórico da prova':'',p.current?'Erro no treino vigente':''].filter(Boolean).join(' · ')+'</p><p>'+esc(INDEX.get(p.card).front)+'</p><button type="button" class="secondary" style="min-height:44px" '+(blocked?'disabled ':'')+'onclick="AGUReview.contextStudy(\''+esc(p.card)+'\',event.detail===0)">Estudar fundamento no flashcard</button></article>').join('')+
 (blocked?'<p>Retome ou conclua a sessão interrompida antes de estudar este cartão.</p>':'')+'<p class="small muted">A correspondência é pontual; o ID curricular da prova continua referencial. Outros erros podem não ter cartão vinculado. Nenhuma conclusão sobre domínio é inferida.</p></section>';
}
function contextStudy(id,keyboard=false){
 if(savedSession()?.status==='em_andamento'||!contextErrors().some(p=>p.card===id))return false;
 select(id,false);global.document?.querySelector?.('#agu-review-active')?.scrollIntoView?.({block:'start'});
 focusAfter('#agu-review-active button[onclick^="AGUReview.reveal("]',keyboard);return true;
}
function contextQuestionHTML(x){
 const p=contextPair(x);
 return p?'<details class="agu-card-detail"><summary>Questão vigente relacionada</summary><p>AGU 2015 · Q'+p.n+' · '+esc(p.code)+'. Vínculo documental pontual com este fundamento; classificação curricular referencial. A questão e o flashcard têm avaliações independentes.</p><a href="questoes-vigentes.html?questao='+encodeURIComponent(p.id)+'" target="_blank" rel="noopener noreferrer">Abrir questão vigente em nova aba</a></details>':'';
}
function flashDetails(x){
 return [
   x.caseNote?'<details class="agu-card-detail"><summary>Aplicação AGU</summary><p>'+esc(x.caseNote)+'</p></details>':'',
   x.trap?'<details class="agu-card-detail"><summary>Armadilha de prova</summary><p>'+esc(x.trap)+'</p></details>':'',
   x.historicalExam?'<details class="agu-card-detail"><summary>Referência histórica · prova AGU 2015</summary><p>Questão '+esc(x.historicalExam.number)+' · caderno '+esc(x.historicalExam.exam)+' · gabarito definitivo histórico: '+esc(x.historicalExam.key)+'. Este flashcard é autoral e aborda fundamento normativo atual. O gabarito de 2015 não certifica a interpretação jurídica atual.</p><a href="'+esc(x.historicalExam.examUrl)+'" target="_blank" rel="noopener noreferrer">Caderno original (PDF)</a> · <a href="'+esc(x.historicalExam.keyUrl)+'" target="_blank" rel="noopener noreferrer">Gabarito definitivo (PDF)</a></details>':'',
   contextQuestionHTML(x),
   x.audit?'<details class="agu-card-detail"><summary>Rastreabilidade da evidência</summary><p>'+esc(x.audit.round)+' / '+esc(x.audit.lot)+' · '+esc(x.audit.item_id)+' · '+esc(x.audit.localizer)+' · status: '+esc(x.audit.evidenceStatus)+' (verificação pontual)</p></details>':'',
   '<details class="agu-card-detail"><summary>Fonte e estado jurídico</summary><p>'+esc(x.source)+(x.checked?' · '+esc(x.checked):'')+(x.reviewedAt?' · '+esc(x.reviewedAt):'')+'</p>'+(x.link?'<a href="'+esc(x.link)+'" target="_blank" rel="noopener noreferrer">Consultar fonte oficial</a>':'<p>Fonte de aula/Caderno; conferência independente pendente.</p>')+'<p>Cartão de recuperação ativa. A verificação pontual não equivale a certificação integral do tema.</p></details>'
 ].filter(Boolean).join('');
}
function cardHTML(x){
 const st=stat(x.id),base='<div class="note">Tópico <b>'+esc(x.code)+'</b> · '+esc(x.kind==='official'?'Cebraspe · Advogado da União':'Flashcard autoral')+' · '+esc(x.validation)+'</div>';
 if(x.kind==='flashcard'){
  return '<h2 class="question-title">'+esc(x.front)+'</h2>'+base+
   (revealed?'<div class="feedback"><b>Resposta</b><p>'+esc(x.back)+'</p></div>'+flashDetails(x):
   '<div class="btnrow"><button class="primary" onclick="AGUReview.reveal(event.detail===0)">Mostrar resposta</button></div>')+
   flashNotebookForm(x,'agu-flash-notebook');
 }

 const q=INLINE_ADAPTED[x.id];
 const a=x.type==='ce'?['C','E']:['A','B','C','D','E'];
 const examUrl=x.examUrl||(x.year===2015?links.p15:links.p23),keyUrl=x.keyUrl||(x.year===2015?links.g15:links.g23);
 const legalLink=q?.auditVerified?'<div class="note"><b>Fundamento verificado:</b> '+esc(q.normRef)+' · <a href="'+esc(q.normUrl)+'" target="_blank" rel="noopener noreferrer">Consultar norma oficial</a></div>':'';
 const prompt=q?.auditVerified?'<div class="note"><b>Adaptação autoral de questão oficial:</b> o texto abaixo não é reprodução literal da banca. Gabarito informado refere-se ao item original.</div><h2 class="question-title">'+esc(q.stem)+'</h2>':
 '<p><b>'+esc(x.theme)+'</b></p><p>Este item ainda não tem versão interna conferida. Consulte o PDF original; não será pontuado no modo automático até que esteja preparado.</p>';
 return '<h2>AGU '+x.year+' · '+esc(x.exam)+' · item '+x.number+'</h2>'+base+prompt+
 '<div class="btnrow"><a target="_blank" rel="noopener noreferrer" href="'+examUrl+'">Caderno original PDF</a><a target="_blank" rel="noopener noreferrer" href="'+keyUrl+'">Gabarito definitivo PDF</a></div>'+legalLink+
 (x.status==='anulada'?'<p class="note">Item anulado: não há pontuação nem revisão avaliativa.</p>':
 !q?.auditVerified?'<div class="note">Questão em revisão jurídica: não disponível para pontuação automática.</div>':
  '<div class="options">'+a.map(v=>'<button '+(revealed?'disabled ':'')+'class="option '+(pick===v?'selected':'')+'" onclick="AGUReview.answer(\''+v+'\',event.detail===0)">'+(q.options?.find(o=>o.id===v)?v+' — '+esc(q.options.find(o=>o.id===v).label):x.type==='ce'?(v==='C'?'CERTO':'ERRADO'):v)+'</button>').join('')+'</div>'+
  (revealed?'<div class="feedback '+(pick===x.key?'':'bad')+'"><b>Gabarito definitivo da questão original: '+esc(x.key)+'</b><p>'+esc(pick===x.key?'Resposta correspondente à referência histórica.':'Resposta diferente da referência histórica.')+'</p>'+(q.historicReason?'<details class="agu-card-detail"><summary>Fundamentação histórica · data da prova</summary><p>'+esc(q.historicReason)+'</p></details>':'<p>'+esc(q.reason)+'</p>')+(q.currentReason?'<details class="agu-card-detail"><summary>Direito atual e limites</summary><p>'+esc(q.currentReason)+'</p></details>':'')+(q.trap?'<details class="agu-card-detail"><summary>Armadilha de prova</summary><p>'+esc(q.trap)+'</p></details>':'')+(q.sourceId?'<details class="agu-card-detail"><summary>Proveniência documental</summary><p>'+esc(q.sourceId)+' · '+esc(q.examLocator)+' · '+esc(q.keyLocator)+' · verificação pontual.</p></details>':'')+'<p class="small muted">Comentário pedagógico com dispositivo normativo identificado quando indicado; acerto isolado não certifica domínio.</p></div>':'<div class="btnrow"><button class="primary" '+(!pick?'disabled':'')+' onclick="AGUReview.reveal(event.detail===0)">Conferir resposta</button></div>'));
}
function libraryHTML(){
 const decks=deckList(),session=savedSession(),activeSession=session?.status==='em_andamento';
 const disciplines=[...new Map(decks.map(x=>[x.discipline,x.name]))];
 const levels=[...new Set(flashcards().filter(x=>Number.isInteger(x.level)).map(x=>x.level))].sort((a,b)=>a-b);
 const visible=decks.filter(x=>
  (deckFilters.discipline==='todos'||x.discipline===deckFilters.discipline)&&
  (!deckFilters.topic||[x.code,x.title].join(' ').toLocaleLowerCase('pt-BR').includes(deckFilters.topic.toLocaleLowerCase('pt-BR')))&&
  selectedCards(x).length>0);
 const selectedCount=visible.reduce((n,deck)=>n+selectedCards(deck).length,0);
 const suggestion=!activeSession?suggestedDeck():null;
 const intro='<section class="agu-deck-library" id="agu-deck-library" aria-label="Biblioteca de baralhos">'+
  '<div class="agu-deck-intro"><div><h2>'+(currentMode==='deck'?'Sessão de estudo':'Escolha um baralho')+'</h2><p class="muted">Escolha o assunto e comece. Suas avaliações ficam neste navegador.</p></div><span class="agu-deck-count">'+flashcards().length+' cartões · '+decks.length+' baralhos</span></div>';
 if(currentMode==='deck'&&session)return intro+sessionHTML()+'</section>';
 return intro+
  (activeSession?'<div class="card agu-deck-tile agu-deck-resume" style="--deck-accent:#17656b;--deck-soft:#e5f4f2"><b>Sessão interrompida · '+esc(sessionTitle(session.code))+'</b><p>Cartão '+(session.index+1)+' de '+session.order.length+' · '+Object.keys(session.ratings).length+' avaliados nesta sessão</p><div class="btnrow"><button id="agu-deck-resume" type="button" class="primary" onclick="AGUReview.deckResume(event.detail===0)">Retomar sessão</button></div></div>':'')+
  (!activeSession?'<div class="card agu-deck-quick-start"><div class="btnrow" style="margin-top:0;gap:8px"><button id="agu-review-now" type="button" class="primary" style="flex:1 1 108px;min-height:44px;padding:8px 10px" '+(candidates('flashcard',1).length?'':'disabled ')+'onclick="AGUReview.reviewNow(event.detail===0)">Revisar agora</button><button id="agu-deck-short" type="button" class="secondary" style="flex:1 1 108px;min-height:44px;padding:8px 10px" '+(candidates('flashcard',1).length?'':'disabled ')+'onclick="AGUReview.deckShortStart(event.detail===0)">Sessão curta (até 5)</button><button id="agu-deck-difficulties" type="button" class="secondary" style="flex:1 1 108px;min-height:44px;padding:8px 10px" onclick="AGUReview.deckDifficulties(event.detail===0)">Minhas dificuldades</button>'+(suggestion?'<button id="agu-deck-suggested" type="button" class="secondary" style="flex:1 1 108px;min-height:44px;padding:8px 10px" onclick="AGUReview.deckSuggested(event.detail===0)">Estudar assunto sugerido</button>':'')+'<p class="small muted" style="flex:0 0 100%;margin:0">'+decks.reduce((n,d)=>n+d.overdue,0)+' vencidos · '+decks.reduce((n,d)=>n+d.todayDue,0)+' vencem hoje · '+decks.reduce((n,d)=>n+d.new,0)+' inéditos. '+(suggestion?'Assunto sugerido: <b>'+esc(suggestion.code)+' · '+esc(suggestion.title)+'</b>.':'Nenhum cartão disponível na fila agora. Escolha um baralho abaixo para estudo livre.')+'</p></div></div>':'')+
  (activeSession&&pendingDeck?'<section class="agu-deck-choice" aria-labelledby="agu-deck-choice"><h3 id="agu-deck-choice" tabindex="-1">Escolha como continuar</h3><p>Existe uma sessão em andamento: '+esc(sessionTitle(session.code))+' ('+Object.keys(session.ratings).length+' de '+session.order.length+' cartões avaliados). Você selecionou '+pendingDeck.order.length+' cartão(ões) de '+esc(pendingDeck.code)+'.</p><p>Iniciar uma nova seleção substitui apenas a sessão interrompida. Todas as avaliações anteriores continuam no histórico e na agenda de revisão.</p><div class="btnrow"><button type="button" class="secondary" onclick="AGUReview.deckDecide(\'continuar\',event.detail===0)">Retomar sessão anterior</button><button type="button" class="primary" onclick="AGUReview.deckDecide(\'novo\',event.detail===0)">Iniciar nova seleção ('+pendingDeck.order.length+')</button><button type="button" class="secondary" onclick="AGUReview.deckDecide(\'cancelar\',event.detail===0)">Cancelar</button></div></section>':'')+
  '<div class="agu-deck-filters" role="group" aria-label="Filtrar baralhos">'+
   '<label for="agu-deck-filter-discipline">Disciplina<select id="agu-deck-filter-discipline" onchange="AGUReview.deckFilter(\'discipline\',this.value)"><option value="todos">Todas as disciplinas</option>'+disciplines.map(([code,name])=>'<option value="'+esc(code)+'" '+(deckFilters.discipline===code?'selected':'')+'>'+esc(name)+'</option>').join('')+'</select></label>'+
   '<label for="agu-deck-filter-topic">Assunto ou código<input id="agu-deck-filter-topic" type="search" value="'+esc(deckFilters.topic)+'" placeholder="Ex.: ADM-06, delegação" onchange="AGUReview.deckFilter(\'topic\',this.value)"></label>'+
   '<details id="agu-deck-options" style="grid-column:1/-1" '+(deckOptionsOpen||deckFilters.difficulty!=='todas'||deckFilters.status!=='todos'?'open ':'')+'ontoggle="if(this.isConnected)AGUReview.deckMore(this.open)"><summary>Mais filtros · nível e revisão'+(deckFilters.difficulty!=='todas'||deckFilters.status!=='todos'?' · ativos':'')+'</summary>'+
   '<label for="agu-deck-filter-difficulty">Nível cognitivo do cartão<select id="agu-deck-filter-difficulty" onchange="AGUReview.deckFilter(\'difficulty\',this.value)"><option value="todas">Todas</option>'+levels.map(level=>'<option value="original:'+level+'" '+(deckFilters.difficulty==='original:'+level?'selected':'')+'>Nível cognitivo original '+level+'</option>').join('')+'<option value="sem_nivel" '+(deckFilters.difficulty==='sem_nivel'?'selected':'')+'>Nível não informado</option></select></label>'+
   '<label for="agu-deck-filter-status">Estado dos cartões<select id="agu-deck-filter-status" onchange="AGUReview.deckFilter(\'status\',this.value)">'+[['todos','Todos os cartões'],['pendentes','Pendentes (vencidos e hoje)'],['vencidos','Somente vencidos (antes de hoje)'],['hoje','Vencem hoje'],['ineditos','Inéditos'],['futuros','Revisão futura'],['sem_data','Avaliados sem data'],['dificuldades','Última avaliação: Errei ou Difícil']].map(([key,label])=>'<option value="'+key+'" '+(deckFilters.status===key?'selected':'')+'>'+label+'</option>').join('')+'</select></label></details>'+
  '</div><div class="agu-deck-filter-result" role="status" aria-live="polite"><span>'+visible.length+' '+(visible.length===1?'baralho':'baralhos')+' · '+selectedCount+' '+(selectedCount===1?'cartão selecionável':'cartões selecionáveis')+'</span><button type="button" class="secondary" onclick="AGUReview.deckClearFilters(event.detail===0)">Limpar filtros</button></div><details class="agu-card-detail"><summary>Como funcionam revisão e progresso</summary><p class="agu-deck-help">Vencidos: prazo anterior a hoje. Vencem hoje: prazo igual à data local. Inéditos: nenhuma avaliação, inclusive importada. “Avaliados sem data” inclui tentativas importadas sem agenda local; isto não equivale a revisão vencida. Progresso conta avaliações, nunca aberturas ou domínio. “Minhas dificuldades” considera a última tentativa datada no histórico (Errei ou Difícil, inclusive importada); pode incluir revisão futura para estudo livre. Não é nível cognitivo nem altera a agenda. Níveis 2–4 preservam a escala cognitiva original; não há equivalência validada com os três níveis pedagógicos nem ranking de incidência.</p></details>'+
  '<div class="agu-deck-grid">'+(visible.map(x=>{
   const vars=global.AGUDisciplines?.cssVars?.(x.code)||'';
   const levelText=Object.entries(x.difficulties).sort().map(([key,count])=>count+' '+(key==='sem_nivel'?'sem nível':key.replace('original:','no nível original '))).join(' · ');
   const selection=selectedCards(x).length;
   return '<article class="agu-deck-tile" style="'+vars+'"><span class="agu-deck-identity">'+esc(x.name)+'</span><span class="agu-deck-code">'+esc(x.code)+'</span><h3>'+esc(x.title)+'</h3><div class="agu-deck-meta"><span>'+x.count+' '+(x.count===1?'cartão':'cartões')+'</span><span>'+x.new+' inéditos</span><span>'+x.overdue+' vencidos</span><span>'+x.todayDue+' vencem hoje</span><span>'+x.future+' futuros</span>'+(x.noDate?'<span>'+x.noDate+' avaliados sem data</span>':'')+'</div><details class="agu-card-detail"><summary>Nível dos cartões</summary><p class="agu-deck-help">'+esc(levelText)+'</p></details><label class="small" for="agu-deck-progress-'+esc(x.code)+'">Progresso: '+x.seen+' de '+x.count+' com avaliação no histórico</label><progress id="agu-deck-progress-'+esc(x.code)+'" max="'+x.count+'" value="'+x.seen+'">'+x.seen+' de '+x.count+'</progress><div class="agu-deck-selection">Seleção atual: '+selection+' de '+x.count+' cartões</div><div class="btnrow"><button class="primary" type="button" onclick="AGUReview.deckStart(\''+esc(x.code)+'\',event.detail===0)">'+(activeSession&&session.code===x.code?'Escolher sessão':'Estudar baralho'+(selection!==x.count?' ('+selection+')':''))+'</button></div></article>';
  }).join('')||'<p class="agu-deck-empty">Nenhum cartão corresponde à combinação de filtros. As avaliações e o agendamento permanecem salvos; ajuste os filtros ou use “Limpar filtros”.</p>')+'</div></section>';
}
function sessionHTML(){
 const s=savedSession();if(currentMode!=='deck'||!s)return '';
 const short=s.code===SHORT_QUEUE,card=INDEX.get(s.order[s.index]);
 const deck=short?{name:'Fila geral',title:'Sessão curta de revisão'}:deckList().find(x=>x.code===s.code),vars=global.AGUDisciplines?.cssVars?.(short?card.code:s.code)||'';
 if(!deck)return '';
 const ratedCount=Object.keys(s.ratings).length;
 if(s.status==='concluida'){
  const counts={errei:0,dificil:0,lembrei:0,facil:0};
  for(const id of Object.values(s.ratings)){const attempt=state.attempts.find(a=>a.id===id);if(attempt&&Object.hasOwn(counts,attempt.rating))counts[attempt.rating]++}
  return '<section class="agu-deck-session" style="'+vars+'" aria-label="'+(short?'Resumo da sessão curta':'Resumo do baralho')+'"><h2 tabindex="-1" id="agu-deck-done">'+(short?'Sessão curta concluída':'Baralho concluído')+'</h2><p>'+esc(deck.title)+' · '+ratedCount+' de '+s.order.length+' cartões avaliados nesta sessão.</p><p>Distribuição das avaliações desta sessão: Errei '+counts.errei+' · Difícil '+counts.dificil+' · Lembrei '+counts.lembrei+' · Fácil '+counts.facil+'. Isto descreve respostas registradas, não domínio certificado.</p><p>As próximas revisões seguem os intervalos anteriores (D+1, D+7, D+21 e D+45). Suas respostas permanecem no histórico original.</p><div class="btnrow"><button class="primary" type="button" '+(short&&!candidates('flashcard',1).length?'disabled ':'')+'onclick="AGUReview.deckRepeat(event.detail===0)">'+(short?'Iniciar próxima sessão disponível':'Reestudar a mesma seleção')+'</button><button class="secondary" type="button" onclick="AGUReview.deckPause(event.detail===0)">Voltar à biblioteca</button></div></section>';
 }
 const x=INDEX.get(s.order[s.index]),rated=s.ratings[x.id],shown=s.revealed;
 const priorEvaluations=Math.max(0,historicalCount(x.id)-(rated?1:0));
 const importedOnly=!(stat(x.id).seen>0)&&recordedHistory().has(x.id);
 const stateLabel=REVIEW_LABELS[reviewState(x)];
 return '<section class="agu-deck-session" style="'+vars+'" aria-label="Sessão de flashcards"><div class="agu-deck-session-head"><div><span class="agu-deck-identity">'+esc(deck.name)+'</span><h2>'+esc(deck.title)+'</h2>'+(short?'<p class="small muted">'+esc(deckList().find(d=>d.code===x.code)?.title||x.code)+'</p>':'')+'<span class="agu-deck-code">'+esc(x.code)+'</span></div><button type="button" class="secondary" onclick="AGUReview.deckPause(event.detail===0)">Pausar e voltar</button></div>'+
 '<p class="agu-deck-stage" aria-live="polite">Cartão '+(s.index+1)+' de '+s.order.length+' · '+ratedCount+' avaliados</p><label class="small" for="agu-deck-session-progress">Avaliação nesta sessão</label><progress class="agu-deck-progress" id="agu-deck-session-progress" max="'+s.order.length+'" value="'+ratedCount+'">'+ratedCount+' de '+s.order.length+'</progress>'+
 '<div class="agu-deck-study-state"><span>'+esc(stateLabel)+(stat(x.id).due?' · '+esc(stat(x.id).due):'')+'</span><span>'+(priorEvaluations?priorEvaluations+' avaliação(ões) anteriores no histórico':'Inédito antes desta sessão')+'</span>'+(importedOnly?'<span>Histórico importado · sem agendamento local</span>':'')+(rated?'<strong>Avaliado nesta sessão</strong>':'<span>Ainda não avaliado nesta sessão</span>')+'</div>'+
 '<div class="agu-deck-meta"><span>'+esc(difficulty(x))+'</span><span>Cartão autoral de fundamento jurídico'+(x.origin?.includes('estilo_cebraspe')?' · estilo Cebraspe':'')+'</span><span>'+esc(x.validation||'validação pendente')+'</span></div>'+
 (shown?'<div class="agu-deck-surface agu-deck-back" role="group" aria-label="Verso do cartão"><span class="agu-deck-stage">Verso · resposta</span><h3 class="question-title">'+esc(x.front)+'</h3><p>'+esc(x.back)+'</p>'+flashDetails(x)+'<div class="btnrow"><button id="agu-deck-hide" type="button" class="secondary" style="min-height:44px" onclick="AGUReview.deckHide(event.detail===0)">Ocultar resposta</button></div></div>':
  '<button type="button" id="agu-deck-face" class="agu-deck-surface agu-deck-front" onclick="AGUReview.reveal(event.detail===0)"><span class="agu-deck-stage">Frente · pense antes de revelar</span><h3 class="question-title">'+esc(x.front)+'</h3><span class="agu-deck-flip-tip">Toque ou pressione Enter / Espaço para revelar a resposta →</span></button>')+
 (rated?'<div class="agu-deck-rated" role="status">Você já avaliou este cartão nesta sessão. A avaliação não será registrada novamente.</div>':shown?'<div><p>Como foi recuperar a resposta?</p><div class="btnrow">'+[['errei','Errei'],['dificil','Difícil'],['lembrei','Lembrei'],['facil','Fácil']].map(([value,label])=>'<button id="agu-deck-rating-'+value+'" type="button" class="'+(value==='errei'?'danger':'secondary')+'" onclick="AGUReview.rate(\''+value+'\',event.detail===0)">'+label+'</button>').join('')+'</div></div>':'')+
 '<div class="btnrow"><button class="secondary" type="button" '+(s.index===0?'disabled':'')+' onclick="AGUReview.deckMove(-1,event.detail===0)">← Anterior</button><button id="agu-deck-next" class="secondary" type="button" '+(s.index===s.order.length-1?'disabled':'')+' onclick="AGUReview.deckMove(1,event.detail===0)">Próximo →</button></div>'+
 flashNotebookForm(x,'agu-deck-notebook')+
 '<div class="section"><button type="button" class="secondary" onclick="AGUReview.deckNotebook(event.detail===0)">Para meu caderno · abrir leitor</button><p class="agu-deck-help">A marcação do flashcard é opcional e fica na mesma lista do leitor. Para anotar um dispositivo jurídico específico, escolha-o manualmente no leitor; não há vínculo normativo presumido.</p></div>'+notebookPanel()+'</section>';
}
function catalog(){
 const cards=ALL.filter(x=>editorialEligible(x)&&x.kind==='flashcard').slice().sort((a,b)=>a.code.localeCompare(b.code)||a.front.localeCompare(b.front));
 const groups=new Map();for(const c of cards){if(!groups.has(c.code))groups.set(c.code,[]);groups.get(c.code).push(c)}
 const options=[...groups].map(([code,items])=>'<optgroup label="'+esc(code.split('-')[0]+' · '+code)+'">'+items.map(c=>'<option value="'+esc(c.id)+'" '+(active?.id===c.id?'selected':'')+'>'+esc(c.front.slice(0,82))+'</option>').join('')+'</optgroup>').join('');
 return '<details class="agu-catalog"><summary>Encontrar cartão por disciplina e tópico ('+cards.length+')</summary>'+
 '<label for="agu-card-list">Disciplina / ID curricular / assunto</label><select id="agu-card-list" aria-label="Selecionar flashcard">'+options+'</select>'+
 '<button class="secondary" onclick="AGUReview.select(document.getElementById(\'agu-card-list\').value,event.detail===0)">Estudar cartão</button>'+
 '<p class="small muted">Identificadores curriculares preservados. As questões oficiais ficam na função própria, com gabarito histórico separado.</p></details>';
}
function page(){
 const sum=summary(),p=plan(),hist=state.attempts.slice(-5).reverse();
 if(active&&!INDEX.has(active.id))active=null;
 // Modo legado: tentativa importada conta como avaliação histórica, nunca como vencimento.
 const priorCount=active?historicalCount(active.id):0;
 const legacyDue=active?(stat(active.id).due?'próxima '+esc(stat(active.id).due):priorCount>0?'sem agenda local':'ainda inédito'):'';
 const header='<div class="top"><div><div class="eyebrow">AGU / RECUPERAÇÃO ATIVA</div><h1>Flashcards e revisões</h1><div class="muted">Biblioteca de assuntos · respostas comentadas · revisão espaçada</div></div></div>';
 if(currentMode==='deck'&&savedSession())return header+(notebookReturn?.source==='flashcard'?notebookReturnPanel():'')+libraryHTML();
 return header+(notebookReturn?.source==='flashcard'?notebookReturnPanel():'')+libraryHTML()+
 contextErrorsHTML()+
 '<div class="agu-deck-legacy"><h2>Revisão inteligente · fila sugerida</h2><p class="small muted">Os caminhos anteriores de revisão e questões oficiais continuam disponíveis.</p></div>'+
 '<div class="grid"><div class="card"><div class="muted">Revisões com prazo até hoje</div><div class="metric">'+sum.due+'</div><div class="small muted">Cartões e referências oficiais com data; não é o tamanho da fila.</div><div class="small muted">Novos flashcards: '+sum.newCards+'</div></div><div class="card"><div class="muted">Erros recorrentes</div><div class="metric">'+sum.repeated+'</div><div class="small muted">2+ erros no mesmo cartão</div></div><div class="card"><div class="muted">Questões oficiais respondidas</div><div class="metric">'+sum.attempts+'</div><div class="small muted">Acertos: '+sum.correct+' (amostra '+sum.attempts+')</div></div></div>'+
 '<div class="card"><h2>Revisão sugerida</h2><p>Sem nova notificação: até cinco flashcards e três questões oficiais; prioriza vencidos, erros e itens ainda não vistos.</p><p class="small muted">Próxima revisão futura: '+esc(sum.next)+'</p>'+
 '<div class="btnrow"><button class="primary" onclick="AGUReview.go(\'auto\',event.detail===0)">Iniciar seleção automática</button><button class="secondary" onclick="AGUReview.go(\'flashcard\',event.detail===0)">Flashcards</button><button class="secondary" onclick="AGUReview.go(\'official\',event.detail===0)">Questões oficiais</button></div></div>'+
 '<div class="card">'+catalog()+'</div>'+
 (active&&currentMode!=='deck'?'<div class="card" id="agu-review-active"><div class="split"><span class="chip">'+esc(active.kind==='flashcard'?'Recuperação ativa':'Questão oficial')+'</span><span class="chip">Avaliações anteriores: '+priorCount+' · '+legacyDue+'</span></div>'+cardHTML(active)+
  (revealed&&active.status!=='anulada'?'<div class="section"><p>Como foi recuperar a resposta? Na questão oficial, um erro prevalece sobre a avaliação subjetiva.</p><div class="btnrow">'+[['errei','Errei'],['dificil','Difícil'],['lembrei','Lembrei'],['facil','Fácil']].map(([v,label])=>'<button class="'+(v==='errei'?'danger':'secondary')+'" onclick="AGUReview.rate(\''+v+'\',event.detail===0)">'+label+'</button>').join('')+'</div></div>':'')+
 '</div>':currentMode==='deck'?'':'<div class="card"><h2>Sem itens na fila</h2><p>Nenhuma revisão vencida nesta modalidade. Volte no próximo vencimento ou escolha outra modalidade.</p></div>')+
 (currentMode==='deck'?'':notebookPanel())+
 '<details class="card agu-catalog"><summary>Histórico e exportação</summary><p class="small muted">Dados salvos apenas neste navegador, sem login nem sincronização entre dispositivos. Faça backups periódicos.</p>'+
 '<div class="btnrow"><button class="secondary" onclick="AGUReview.exportData()">Exportar backup JSON</button><button class="secondary" onclick="document.getElementById(\'review-import\').click()">Importar sem substituir</button><input id="review-import" type="file" class="hidden" accept="application/json" onchange="AGUReview.importBackup(this)"></div>'+
 '<div class="small muted">'+(hist.length?hist.map(x=>esc(x.code)+' · '+esc(x.rating)+' · '+esc(x.due)).join('<hr>'):'Nenhuma tentativa registrada')+'</div></details>'+
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
function searchCards(){return ALL.filter(x=>editorialEligible(x)&&x.kind==='flashcard').map(x=>({id:x.id,code:x.code,front:x.front,back:x.back,source:x.source||'',validation:x.validation||'',origin:x.origin||'flashcard_autoral'}))}
function availableForTopic(code){
 return ALL.filter(x=>editorialEligible(x)&&x.kind==='flashcard'&&x.code===code).map(x=>({id:x.id,code:x.code,front:x.front,origin:x.origin||'flashcard_autoral',validation:x.validation||'revisao_pendente',due:stat(x.id).due,seen:stat(x.id).seen||0}))
}
function focusOfficial(id){const x=INDEX.get(id);if(!x||x.kind!=='official'||x.status==='anulada'||!INLINE_ADAPTED[id]?.auditVerified)return false;currentMode='integrated_official';active=x;revealed=false;pick='';return true}
function focusCard(id){
 const x=INDEX.get(id);
 if(!x||!editorialEligible(x)||x.kind!=='flashcard')return false;
 currentMode='integrated';active=x;revealed=false;pick='';return true;
}
function focusedHTML(){
 if(!active||!['integrated','integrated_official'].includes(currentMode))return '';
 return '<section class="agu-notice"><div class="agu-muted">Flashcard '+esc(active.code)+' · '+esc(active.validation||'autoral')+'</div>'+cardHTML(active)+
 (revealed?'<div class="btnrow">'+[['errei','Errei'],['dificil','Difícil'],['lembrei','Lembrei'],['facil','Fácil']].map(([v,label])=>'<button class="secondary" onclick="AGUReview.rate(\''+v+'\',event.detail===0)">'+label+'</button>').join('')+'</div>':'')+'</section>'
}
function attemptsInfo(){return state.attempts.map(a=>({id:a.id,itemId:a.itemId,kind:a.kind,code:a.code,at:a.at,due:a.due,rating:a.rating,correct:a.correct}))}
function reviewInfo(id){const x=INDEX.get(id);if(!x)return null;const t=stat(id);return {itemId:id,code:x.code,kind:x.kind,seen:t.seen||0,due:t.due||null,rating:t.ease||null}}

global.AGUReview={page,go,reviewNow,select,reveal,answer:chooseAnswer,rate:rating,exportData,importBackup,summary,disciplineMetrics,availableForTopic,focusCard,focusOfficial,focusedHTML,reviewInfo,attemptsInfo,searchCards,notebookDue,notebookStatus,notebookOrigin,notebookReturnPanel,returnFromNotebook,notebookHistoricCard,notebookEligibleCard,notebookSaveCard,notebookOpenCard,validateBackupObject,mergeBackupObject,deckStart,deckShortStart,deckDecide,deckRepeat,deckClearFilters,deckResume,deckPause,deckHide,contextStudy,deckMove,deckFilter,deckMore,deckSuggested,deckDifficulties,deckNotebook,deckList,exactDeck,deckSession:()=>savedSession(),deck:()=>({flashcards:EDITORIAL_CARDS.filter(editorialEligible).length+CARDS.length+AUD03_CARDS.length+AUD02_2015_CARDS.length+AUD02_2015_CARDS_02.length+AUD02_2015_CARDS_03.length+SEG001_CARDS.length,lotAud03:AUD03_CARDS.length,lotAud02_2015:AUD02_2015_CARDS.length,lotAud02_2015_02:AUD02_2015_CARDS_02.length,lotAud02_2015_03:AUD02_2015_CARDS_03.length,official:OFFICIAL.length+S18_ITEMS.length,annulled:ALL.filter(x=>x.kind==='official'&&x.status==='anulada').length})};
})(window);
