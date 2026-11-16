/* CARTOES-AUD-03 — sínteses autorais a partir de três questões públicas AGU/2015.
 * Gabarito definitivo = dado histórico, nunca a validação da resposta atual.
 * Fontes normativas abertas conferidas pontualmente em 16/11/2026.
 * Corte comparativo do programa de auditoria: 04/11/2026.
 */
(function(root){
'use strict';
const examUrl='https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/187AGU_001_07.pdf';
const keyUrl='https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/Gab_Definitivo_187AGU_001_07_SUPER-A4.pdf';
const cf='https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html';
const processo='https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html';
const make=(n,code,front,back,source,link,trap,caseNote,key,extra={})=>({
 id:'aud02-2015-flc-03-'+String(n).padStart(3,'0'),kind:'flashcard',code,front,back,
 source,link,trap,caseNote,origin:'autoral_fundamento_atual_relacionado_a_prova_historica',
 sourceKind:'norma_oficial',validation:'dispositivo_publico_conferido_pontualmente_sem_certificacao_integral',
 reviewedAt:'2026-11-16',legalCutoff:'2026-11-04',notOfficial:true,
 historicalExam:{year:2015,exam:'187AGU_001_07',number:n,key,examUrl,keyUrl},version:1,...extra
});
root.AGU_AUD02_2015_CARDS_LOTE03=[
 make(5,'ADM-17',
  'A lei exige sempre uma forma específica, como resolução, para um ato administrativo federal?',
  'Não. A Lei 9.784/1999, art. 22, estabelece que os atos do processo administrativo independem de forma determinada, salvo exigência legal expressa. A motivação, exigível nas hipóteses do art. 50, é questão distinta.',
  'Lei 9.784/1999, arts. 22 e 50',processo,
  'A liberdade de forma é regra supletiva, não licença para desobedecer forma prescrita em lei; forma e motivação não são sinônimos.',
  'Autoridade decide por despacho: investigar se alguma lei exige resolução, em vez de presumir nulidade apenas pelo nome do instrumento.', 'E',
  {changeNote:'Regra legal anterior a 2015. Nenhuma alteração posterior é afirmada a partir desta questão.'}),
 make(7,'ADM-27',
  'Em que hipótese o Congresso Nacional pode sustar ato normativo do Executivo?',
  'Pelo art. 49, V, da Constituição, cabe ao Congresso sustar atos normativos do Executivo que exorbitem o poder regulamentar ou os limites da delegação legislativa. Não é controle político genérico de toda ilegalidade administrativa.',
  'Constituição Federal, art. 49, V',cf,
  'Um ato de ministro pode estar abrangido pelo controle, mas é necessário identificar excesso regulamentar ou da delegação; mera discordância não basta.',
  'Portaria ministerial acrescenta obrigação sem base na lei: examinar a exorbitância normativa antes de cogitar sustação.', 'C',
  {additionalSource:'https://portal.stf.jus.br/constituicao-supremo/artigo.asp?abrirArtigo=49&abrirBase=CF',changeNote:'Precedente posterior: STF, ADI 5.290/GO (2019), delimita a sustação ao excesso de competência normativa; regra constitucional preexistente.'}),
 make(8,'ADM-27',
  'Qual o limite constitucional das instruções normativas expedidas por ministros de Estado?',
  'Conforme o art. 87, parágrafo único, II, da Constituição, ministros podem expedir instruções para execução de leis, decretos e regulamentos. O ato ministerial é subordinado às normas que executa; não inova validamente contra a lei.',
  'Constituição Federal, art. 87, parágrafo único, II',cf,
  '“Regulamento de segundo grau” é expressão doutrinária usada na prova histórica, não espécie de ato textualmente criada pela Constituição.',
  'Ministro detalha procedimento previsto em decreto: pode disciplinar a execução, sem criar obrigação autônoma incompatível com a lei.', 'C',
  {changeNote:'Competência constitucional anterior a 2015; nenhuma mudança legislativa posterior é presumida.'})
];
})(typeof window!=='undefined'?window:globalThis);
