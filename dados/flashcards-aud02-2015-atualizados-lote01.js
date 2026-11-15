/* CARTOES-AUD-01 — cartas autorais sobre fundamentos atuais relacionados a itens históricos de 2015.
 * A questão e o gabarito são referências históricas públicas, não uma validação do direito vigente.
 * Nenhum enunciado, comentário ou dado da auditoria privada é reproduzido neste lote. */
(function(root){
'use strict';
const examUrl='https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/187AGU_001_07.pdf';
const keyUrl='https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/Gab_Definitivo_187AGU_001_07_SUPER-A4.pdf';
const procurement='https://www2.camara.leg.br/legin/fed/lei/2021/lei-14133-1-abril-2021-791222-normaatualizada-pl.pdf';
const improbity='https://www2.camara.leg.br/legin/fed/lei/1992/lei-8429-2-junho-1992-357452-normaatualizada-pl.pdf';
const lindb='https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-4657-4-setembro-1942-414605-normaatualizada-pe.html';
const injunction='https://www2.camara.leg.br/legin/fed/lei/2016/lei-13300-23-junho-2016-783275-publicacaooriginal-150634-pl.html';
const aguDecree='https://www2.camara.leg.br/legin/fed/decret/2025/decreto-12540-30-junho-2025-797673-anexo-pe.pdf';
const make=(number,code,front,back,source,link,trap,caseNote,item,key)=>({
 id:'aud02-2015-flc-'+String(number).padStart(3,'0'),kind:'flashcard',code,front,back,
 source,link,trap,caseNote,origin:'autoral_fundamento_atual_relacionado_a_prova_historica',
 sourceKind:'norma_oficial',validation:'dispositivo_publico_conferido_pontualmente_sem_certificacao_integral',
 reviewedAt:'2026-11-15',notOfficial:true,
 historicalExam:{year:2015,exam:'187AGU_001_07',number:item,key,examUrl,keyUrl},version:1
});
root.AGU_AUD02_2015_CARDS=[
 make(1,'CON-50',
  'Quem subsidia hoje as informações do Presidente da República ao STF em mandados de segurança e de injunção?',
  'A Consultoria-Geral da União. No desenho do Decreto 12.540/2025, essa atribuição é excluída expressamente da Secretaria-Geral de Contencioso.',
  'Decreto 12.540/2025, Anexo I, arts. 25, II, e 30, II',aguDecree,
  'A atuação da Secretaria-Geral de Contencioso perante o STF não abrange automaticamente todas as informações presidenciais.',
  'O órgão de contencioso é procurado para subsidiar informação presidencial em mandado de injunção: conferir a exceção expressa no regulamento vigente.',1,'E'),
 make(2,'ADM-25',
  'Se um contrato administrativo for declarado nulo, a Administração fica automaticamente dispensada de indenizar o executado?',
  'Não. A Lei 14.133/2021, art. 149, preserva a indenização pela execução e por prejuízos comprovados, desde que não sejam imputáveis ao contratado, e determina responsabilizar quem causou a nulidade.',
  'Lei 14.133/2021, art. 149',procurement,
  'Nulidade do contrato e dever de indenização não são conclusões mutuamente excludentes; verificar a imputabilidade e o que foi executado.',
  'A Administração recebe parte do serviço antes de reconhecer nulidade contratual: analisar o art. 149 e o efetivo benefício recebido.',10,'C'),
 make(3,'ADM-25',
  'Uma licitação sem interessados permite contratação direta, dois anos depois, com condições diferentes do edital?',
  'Não por esse fundamento. A dispensa do art. 75, III, da Lei 14.133/2021 exige licitação realizada há menos de um ano e manutenção de todas as condições do edital, nos casos legais.',
  'Lei 14.133/2021, art. 75, III, a e b',procurement,
  'Licitação deserta ou frustrada não libera contratação direta irrestrita; prazo e condições originais são requisitos.',
  'Após procedimento sem interessados, gestor pretende mudar requisitos e contratar diretamente após dois anos: a hipótese do inciso III não se sustenta.',11,'E'),
 make(4,'ADM-25',
  'A ata de registro de preços da Lei 14.133/2021 vale automaticamente por dois anos?',
  'Não. O prazo é de um ano e pode ser prorrogado por igual período, desde que comprovado o preço vantajoso.',
  'Lei 14.133/2021, art. 84',procurement,
  'Possibilidade condicionada de prorrogação não equivale a duração inicial de dois anos.',
  'Antes de prorrogar uma ata de registro de preços, o gestor deve documentar a vantajosidade do preço.',13,'C'),
 make(5,'ADM-25',
  'O registro de preços obriga a Administração a contratar o quantitativo registrado?',
  'Não. O art. 83 da Lei 14.133/2021 estabelece compromisso de fornecimento nas condições registradas, mas não obriga a Administração a contratar; é possível licitação específica motivada.',
  'Lei 14.133/2021, art. 83',procurement,
  'Compromisso do fornecedor não significa compra obrigatória pelo poder público.',
  'Uma ata está válida, mas a necessidade pública mudou: a mera existência do registro não impõe aquisição.',13,'C'),
 make(6,'ADM-58',
  'Um acordo de não persecução civil por improbidade pode ignorar o ressarcimento integral do dano efetivo?',
  'Não. O art. 17-B da Lei 8.429/1992, na redação da Lei 14.230/2021, prevê como resultados mínimos o ressarcimento integral do dano e a reversão da vantagem indevida à pessoa jurídica lesada.',
  'Lei 8.429/1992, art. 17-B, I e II (Lei 14.230/2021)',improbity,
  'A disciplina atual admite negociação, mas não dispensa os resultados reparatórios mínimos. A legitimação deve ser lida à luz do julgamento das ADIs 7042/7043.',
  'Proposta de acordo prevê apenas multa simbólica, apesar de dano e vantagem indevida comprovados: verificar as exigências reparatórias do art. 17-B.',22,'E'),
 make(7,'CON-50',
  'O parecerista público responde pessoalmente por qualquer divergência jurídica ou por erro simples em opinião técnica?',
  'Não por esse só fato. A LINDB, art. 28, prevê responsabilização pessoal do agente por decisões ou opiniões técnicas em caso de dolo ou erro grosseiro.',
  'LINDB (Decreto-Lei 4.657/1942), art. 28, incluído pela Lei 13.655/2018',lindb,
  'Distinguir divergência interpretativa ou erro comum dos pressupostos legais de dolo ou erro grosseiro.',
  'Parecer jurídico fundamentado adota interpretação depois rejeitada: não presumir responsabilização pessoal sem apurar os requisitos do art. 28.',26,'E'),
 make(8,'CON-24',
  'A decisão em mandado de injunção individual sempre produz efeitos erga omnes?',
  'Não. Em regra, a eficácia subjetiva limita-se às partes até a norma regulamentadora. O art. 9º, § 1º, da Lei 13.300/2016 admite eficácia ultra partes ou erga omnes quando inerente ou indispensável ao exercício do direito.',
  'Lei 13.300/2016, art. 9º e § 1º',injunction,
  'Eficácia ampliada é possibilidade excepcional e fundamentada, não efeito geral automático.',
  'Ao examinar decisão em mandado de injunção individual, identificar se o julgamento justificou extensão da eficácia além das partes.',39,'C')
];
})(typeof window!=='undefined'?window:globalThis);
