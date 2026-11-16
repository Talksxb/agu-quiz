/* CARTOES-AUD-02 — quatro cartões autorais derivados de questões históricas públicas.
 * Referências de 2015 são históricas. O conteúdo responde exclusivamente aos
 * dispositivos públicos indicados e não replica questão, parecer ou matriz privada.
 * Corte jurídico da auditoria de referência: 04/11/2026; conferência pontual em 15/11.
 */
(function(root){
'use strict';
const examUrl='https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/187AGU_001_07.pdf';
const keyUrl='https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/Gab_Definitivo_187AGU_001_07_SUPER-A4.pdf';
const agu='https://www2.camara.leg.br/legin/fed/decret/2025/decreto-12540-30-junho-2025-797673-anexo-pe.pdf';
const cf='https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html';
const convenio='https://www.gov.br/agu/pt-br/composicao/cgu/cgu/conuni/camara-nacional-de-convenios-e-instrumentos-congeneres-cncic';
const make=(n,code,front,back,source,link,trap,caseNote,key,extra={})=>({
 id:'aud02-2015-flc-02-'+String(n).padStart(3,'0'),kind:'flashcard',code,front,back,
 source,link,trap,caseNote,origin:'autoral_fundamento_atual_relacionado_a_prova_historica',
 sourceKind:'norma_oficial',validation:'dispositivo_publico_conferido_pontualmente_sem_certificacao_integral',
 reviewedAt:'2026-11-15',legalCutoff:'2026-11-04',notOfficial:true,
 historicalExam:{year:2015,exam:'187AGU_001_07',number:n,key,examUrl,keyUrl},version:1,...extra
});
root.AGU_AUD02_2015_CARDS_LOTE02=[
 make(2,'CON-50',
  'Qual unidade da Consultoria-Geral da União propõe soluções para divergências de jurisprudência administrativa?',
  'A Consultoria Nacional da União de Uniformização analisa controvérsias e propõe soluções de uniformização. A Consultoria-Geral pode instruir proposta de solução a ser submetida ao Advogado-Geral da União, conforme o caso.',
  'Decreto 12.540/2025, Anexo I, arts. 30, V e XI, e 35, I a IV',agu,
  'Não confundir a Secretaria-Geral de Consultoria com a unidade competente da Consultoria-Geral para propor uniformização; proposta não equivale à decisão final do AGU.',
  'Duas consultorias ministeriais divergem na interpretação de uma norma: identificar a unidade consultiva de uniformização e a instância decisória cabível.', 'E'),
 make(3,'CON-50',
  'A Câmara de Mediação e de Conciliação da AGU pode atuar em conflito entre município e autarquia federal?',
  'Sim. O Decreto 12.540/2025 inclui, na competência da Câmara, a mediação de controvérsias que envolvam órgão ou entidade federal e município ou suas autarquias e fundações.',
  'Decreto 12.540/2025, Anexo I, art. 36, III, b',agu,
  'A Câmara hoje é denominada de Mediação e de Conciliação; competência para atuar não assegura acordo nem dispensa exame de admissibilidade.',
  'Uma autarquia federal e um município divergem administrativamente: o vínculo federativo não impede, por si só, a mediação na Câmara.', 'C'),
 make(9,'ADM-27',
  'É suficiente uma portaria fundada no princípio da eficiência para criar gratificação remuneratória?',
  'Não. A fixação ou alteração da remuneração de servidores públicos exige lei específica, observada a iniciativa constitucional pertinente; a eficiência não substitui essa reserva legal.',
  'Constituição Federal, art. 37, X',cf,
  'Poder regulamentar concretiza a lei dentro de limites; não cria vantagem remuneratória sem a base legislativa necessária.',
  'Ministério edita portaria de gratificação sem lei específica: distinguir regulamentação de criação de remuneração.', 'E',
  {changeNote:'Fundamento constitucional preexistente a 2015; confirmado, sem alegar mudança normativa posterior.'}),
 make(12,'ADM-25',
  'Como indicar créditos e empenhos dos exercícios futuros em convênio federal plurianual?',
  'A indicação pode ser formalizada por apostila a cada exercício, dispensando exame jurídico prévio para essa simples indicação, conforme a ON AGU 40/2014. O Decreto 11.531/2023, art. 8º, exige empenho do exercício da celebração e registro no Siafi dos valores futuros.',
  'ON AGU 40/2014, I e II; Decreto 11.531/2023, art. 8º',convenio,
  'Apostilar a indicação de dotação futura não significa dispensar controles e condições da celebração ou substituir termo aditivo para alterações de objeto.',
  'Convênio com execução em três exercícios: diferenciar a indicação orçamentária anual de uma modificação substantiva do ajuste.', 'C',
  {additionalSource:'https://legis.senado.leg.br/norma/37049341/publicacao/37054330',changeNote:'Decreto 11.531/2023 e Portaria Conjunta MGI/MF/CGU 33/2023 integram a disciplina posterior à prova.'})
];
})(typeof window!=='undefined'?window:globalThis);
