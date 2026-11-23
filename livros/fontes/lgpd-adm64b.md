---
{
  "editorial_id": "LIVRO-DIG-001",
  "curricular_ids": [
    "ADM-64b"
  ],
  "edition": "2.0",
  "original_edition_date": "2026-11-20",
  "markdown_migration_date": "2026-11-22",
  "legal_source_consulted_at": "Declaração histórica da edição; não revalida fontes",
  "audit_cutoff": "2026-11-04",
  "origin": "LIVRO-DIG-001_LGPD_ADMINISTRACAO_PUBLICA_v2.0.pdf",
  "publishing_policy": "Edição pública preservada; futuras alterações exigem revisão"
}
---

# LGPD aplicada à Administração Pública — fonte editorial de revisão

<!-- Migração literal dos blocos da edição pública, sem revisão jurídica. -->

<!-- AGU_EDITOR_SECTION_START:01 -->
LGPD aplicada à Administração Pública
Leitura AGU | LIVRO-DIG-001 | Edição 2.0 aprofundada | 20 de novembro de 2026
Disciplina editorial: Direito Digital e proteção de dados, com vínculo curricular ao Direito Administrativo.
ID curricular comprovado na matriz AGU 2022: ADM-64b, segunda ocorrência do número 64, rubrica literal do edital: “Lei
Geral de Proteção de Dados.”
Conexões de estudo: ADM-64a, acesso à informação; Direito Constitucional, direitos fundamentais; contratação pública,
serviços digitais, fiscalização e responsabilidade estatal.
Tempo orientativo: 150 a 190 minutos de leitura analítica, sem contar exercícios, consulta às fontes e produção jurídica.
Direito consultado até 20/11/2026; corte histórico da auditoria: 04/11/2026. Capítulo autoral, conferências normativas e
jurisprudenciais pontuais; sem certificação integral de auditoria ou domínio do estudante.


O problema que organiza este capítulo
Um ministério pretende integrar informações de três bases federais para localizar pessoas aptas a receber
determinado benefício. O desenho promete reduzir filas e combater fraudes. A equipe técnica propõe enviar a
uma empresa contratada o conjunto completo de cadastros, incluindo renda, endereço, telefone, composição
familiar, situação de saúde e histórico de solicitações. O sistema usará um modelo automatizado para atribuir
prioridade. A minuta do contrato invoca “interesse público” e “consentimento presumido do cidadão”, mas não
delimita quem acessa o quê, por quanto tempo, nem prevê registro dos acessos. Em paralelo, um jornalista pede
a relação nominal dos beneficiários.
A consultoria da AGU deve escolher entre soluções institucionalmente defensáveis, e não entre duas respostas
simplistas: a LGPD não impede o Estado de governar por dados, mas tampouco transforma a
finalidade pública em autorização irrestrita para coletar, cruzar, terceirizar e divulgar informações
pessoais. O exame exige distinguir tratamento, base legal, finalidade, necessidade, compartilhamento, acesso
público, segurança, direito do titular e responsabilidade. Ao final voltaremos ao caso para redigir uma solução
com condições e providências.

Como ler esta edição ampliada
O caso gerador não é um enigma destinado a receber uma resposta automática. Sua importância está em
reproduzir tensões institucionais reais: órgãos responsáveis por benefícios precisam descobrir fraudes, reduzir
exclusões e prestar contas; simultaneamente, a concentração de registros pessoais pode produzir vigilância,
discriminação e erros de difícil contestação. A v2 conserva o percurso do capítulo anterior e desenvolve duas
escalas de raciocínio. Na primeira, investiga a licitude do tratamento e do compartilhamento. Na segunda,
examina a arquitetura concreta do contrato, a governança do algoritmo, a resposta ao incidente e a
transferência internacional. Um parecer que só resolva a primeira escala fica incompleto para uma contratação
de tecnologia.
No fim da leitura, o objetivo é conseguir redigir orientação consultiva que não confunda interesse público com
licença geral, nem transforme privacidade em veto abstrato à digitalização de serviços. Os dois casos resolvidos
oferecem soluções condicionadas e permitem distinguir o que está imposto em lei, o que decorre de precedente
judicial e o que se recomenda como medida de gestão de riscos. Perguntas e respostas aparecem apenas ao
final, para não interromper a leitura autônoma.


1 Por que a proteção de dados integra o Direito Público
A proteção de dados pessoais não nasceu apenas da internet ou do comércio eletrônico. Ela enfrenta uma
assimetria de poder: quem organiza grandes bancos de dados pode reconstruir rotinas, crenças, condições
econômicas e relações de pessoas que não controlam os meios de processamento. No setor público, essa


                                                                                                     LIVRO-DIG-001 • 20/11/2026 • 1
<!-- AGU_EDITOR_SECTION_END:01 -->

<!-- AGU_EDITOR_SECTION_START:02 -->
assimetria é particularmente intensa, porque a prestação de serviços, o cadastro tributário, o exercício do poder
de polícia e a execução de políticas sociais frequentemente não dependem de escolha livre de quem fornece
informações.
O art. 5º, LXXIX, da Constituição, incluído pela Emenda Constitucional 115/2022, reconhece o direito
fundamental à proteção dos dados pessoais, inclusive em meios digitais. A mesma emenda atribui à União
competência privativa para legislar sobre proteção e tratamento de dados pessoais, no art. 22, XXX, e prevê
competência da União para organizar e fiscalizar essa proteção. Essa posição constitucional agrega à
intimidade e à vida privada uma dimensão própria de controle jurídico sobre o ciclo de vida dos dados. Não se
exige segredo absoluto para que exista proteção: até um dado verdadeiro, obtido licitamente e tornado público
em contexto específico pode ser usado de forma incompatível com a finalidade original. [F1]
A Lei 13.709/2018, LGPD, tem normas gerais de interesse nacional, observáveis por União, estados, Distrito
Federal e municípios (art. 1º, parágrafo único). O poder público é destinatário da lei, com disciplina especial
nos arts. 23 a 32, mas não com uma licença para afastar os princípios gerais. A Constituição também impõe
publicidade, eficiência, impessoalidade e controle social. A tarefa jurídica é compatibilizar direitos que
coexistem: transparência sobre o Estado não é sinônimo de exposição irrestrita da vida de cada cidadão. [F2]

1.1 A proteção de dados como limite ao exercício do poder administrativo
O direito à proteção de dados possui uma face defensiva: a pessoa pode opor limites ao tratamento arbitrário de
informações sobre sua vida. Possui também uma dimensão organizacional: o Estado deve estruturar
procedimentos, registros, competências e mecanismos de controle que tornem a proteção real. A inclusão do
art. 5º, LXXIX, pela Emenda Constitucional 115/2022 torna inadequado enxergar a LGPD apenas como um
código de boas maneiras das empresas. Mesmo quando a lei permite tratar dados sem consentimento,
permanece um dever objetivo de governar esse tratamento com transparência, necessidade e meios de
correção. [F1; F2]
O direito não se resume à intimidade. Um dado pode ser público e, ainda assim, seu uso sistemático permitir
inferir religião, deslocamentos, vulnerabilidade econômica ou preferências políticas. As técnicas de
combinação alteram a escala do risco. Essa diferença explica por que a publicação legítima de um resultado de
concurso não autoriza, por si, que terceiro transforme a listagem em mecanismo indiscriminado de perfis. Para
a Administração, a Constituição exige considerar tanto a capacidade informacional do Estado quanto a
assimetria que ela cria entre o poder público e quem depende de seus serviços.
Publicidade, eficiência e proteção de dados não são valores em fila de prioridade rígida. A pergunta da
proporcionalidade é se determinada operação de dados contribui de modo demonstrável para finalidade legal e
se existe alternativa igualmente adequada menos invasiva. A ponderação não substitui competência legal nem
a hipótese autorizadora da LGPD. Quando a finalidade é inexistente ou alheia ao órgão, a boa tecnologia não
salva o projeto; quando a finalidade é válida, limita-se o tratamento ao que efetivamente a realiza.


2 O vocabulário que decide os casos
Dado pessoal é informação relacionada a pessoa natural identificada ou identificável. Nome e CPF são casos
evidentes. Identificador pseudonimizado, geolocalização ou combinação de características também podem
permitir identificação, conforme o contexto. A LGPD não se restringe a bancos digitais: coleta em papel, acesso,
armazenamento, transmissão e descarte são operações de tratamento. Titular é a pessoa natural a quem o
dado se refere; pessoas jurídicas não são titulares em sentido próprio da LGPD, embora possam ter sigilos
protegidos por outros regimes. [F2, arts. 5º e 6º]
Dados pessoais sensíveis merecem cautela reforçada: origem racial ou étnica, convicção religiosa, opinião
política, filiação sindical ou religiosa, filosófica ou política, saúde, vida sexual, dados genéticos e biométricos
vinculados a pessoa natural (art. 5º, II). A renda de alguém não é, por si, dado sensível no sentido taxativo do


                                                                                       LIVRO-DIG-001 • 20/11/2026 • 2
<!-- AGU_EDITOR_SECTION_END:02 -->

<!-- AGU_EDITOR_SECTION_START:03 -->
art. 5º, II, mas sua divulgação ou combinação pode acarretar riscos graves e exigir fortes salvaguardas. Dados
de crianças e adolescentes demandam observância específica do melhor interesse e do art. 14, além de eventual
legislação setorial. A qualificação jurídica não se faz apenas pela intuição de que algo é “privado”.
Anonimização é a perda da possibilidade de associação a uma pessoa por meios técnicos razoáveis e
disponíveis. Se um conjunto supostamente anônimo pode ser reidentificado com esforço razoável, o rótulo não
basta. Pseudonimização substitui identificadores diretos, mas preserva possibilidade de reversão ou
vinculação: em regra, continua sendo dado pessoal. Agregação estatística precisa ser examinada contra o risco
de identificar grupos pequenos ou pessoas únicas. Essa distinção muda a intensidade das obrigações, não
dispensa avaliação do risco.
Controlador decide sobre as finalidades e os elementos essenciais do tratamento; operador trata dados em
nome do controlador e segue suas instruções lícitas. O encarregado funciona como canal de comunicação e
orientador de governança, mas não se transforma automaticamente em controlador nem absorve a
responsabilidade dos dirigentes. A qualificação depende da função real, e não da cláusula contratual que uma
parte prefere utilizar. Um fornecedor de nuvem pode ser operador em uma atividade e controlador
independente em outra, caso determine finalidades próprias; cada operação deve ser analisada. [F2, arts. 5º, 39
e 41]

2.1 Identificação indireta, dados inferidos e risco de reidentificação
A identificação indireta é decisiva para tecnologia pública. Retirar nome e CPF de uma tabela de atendimentos
não garante anonimização se a combinação de idade, bairro, data de atendimento e doença rara individualizar
o cidadão. A técnica deve ser avaliada com referência a meios razoáveis disponíveis e ao contexto em que os
arquivos circularão; um banco aparentemente desidentificado pode deixar de sê-lo quando cruzado com
informações abertas de outro órgão. Anonimização é resultado contextual e tecnicamente defensável, não
etiqueta escolhida pelo contratante. Pseudônimos, chaves estáveis e tokens reversíveis continuam exigindo os
cuidados aplicáveis a dados pessoais quando permitem associação a titular. [F2, arts. 5º, III e XI, e 12]
Também é necessário distinguir atributo declarado de atributo inferido. Um cidadão pode não ter informado
condição de saúde, mas o cruzamento de localização, consumo de medicamentos e consultas pode produzir
probabilidade sobre ela. O algoritmo não elimina a incidência da LGPD ao gerar um dado derivado. Se a
inferência é vinculável à pessoa e se torna material para uma decisão estatal, incidem finalidade, qualidade,
não discriminação e revisão da conclusão. Uma lista de probabilidades não pode ser tratada como verdade
clínica apenas porque foi gerada por modelo sofisticado.

2.2 Papéis contratuais e responsabilidade funcional
Controlador e operador não são rótulos negociáveis com liberdade irrestrita. Se um ministério fixa finalidade,
público beneficiário, atributos necessários e resultado esperado, tende a controlar a operação; a empresa que
hospeda e processa sob suas instruções tende a ser operadora. Contudo, se a mesma empresa utiliza os dados
para treinar produto próprio, prospectar clientes ou definir finalidades comerciais autônomas, aquele fluxo
não cabe automaticamente na função de operador. A qualificação deve ser feita atividade por atividade,
inclusive quando há múltiplos órgãos, subcontratados, empresas do grupo ou nuvem compartilhada. [F2, arts.
5º, VI–VIII, 39 e 42]
O desenho institucional pressupõe decisões de controladoria atribuídas a órgão competente e instruções
suficientemente determinadas para operadores. A expressão “todos serão controladores” não esclarece quem
atenderá pedidos, quem notificará incidentes nem quem pode autorizar reutilização de dados. A consultoria
deve pedir um mapa decisório: quem define a finalidade, quem escolhe meios essenciais, quem apenas executa,
quem recebe dados e quem responde perante o titular. A classificação errada distribui riscos de forma opaca e
dificulta a fiscalização.




                                                                                    LIVRO-DIG-001 • 20/11/2026 • 3
<!-- AGU_EDITOR_SECTION_END:03 -->

<!-- AGU_EDITOR_SECTION_START:04 -->
3 O método jurídico do tratamento de dados
Antes de procurar uma base legal, o órgão precisa formular uma pergunta objetiva: qual atribuição pública
demanda quais dados, para produzir qual resultado, com qual duração e quais pessoas autorizadas a
acessá-los? Esse é o encontro entre competência administrativa e princípios de proteção de dados.
O art. 6º da LGPD exige boa-fé e dez princípios: finalidade, adequação, necessidade, livre acesso, qualidade,
transparência, segurança, prevenção, não discriminação e responsabilização/prestação de contas. Não basta
mencioná-los numa política institucional. É preciso convertê-los em escolhas de sistema. Uma consulta binária
(“a pessoa satisfaz o requisito?”) pode dispensar o envio do histórico clínico integral. Uma equipe de
atendimento pode precisar do endereço atualizado, mas não da filiação religiosa. Uma correção de cadastro
precisa alcançar os sistemas que receberam informação errada; caso contrário, a qualidade deixa de ser uma
promessa verificável. [F2, art. 6º]
A base legal justifica juridicamente determinada atividade de tratamento, mas não derroga os princípios. Para
dados pessoais comuns, o art. 7º prevê hipóteses como cumprimento de obrigação legal ou regulatória (II),
tratamento e uso compartilhado necessários à execução de políticas públicas pela administração (III), exercício
regular de direitos (VI), proteção da vida (VII) e proteção do crédito (X), entre outras. O consentimento (I)
também existe, mas não é o fundamento universal da administração: quando a obtenção de um benefício
obrigatório ou o cumprimento de um dever legal não permite recusa efetiva, falar em vontade livre pode falsear
o regime jurídico. Não se deve inventar “consentimento presumido” para sanar uma atividade que carece de
base legal adequada. [F2, arts. 7º–10; F3]
Para dados sensíveis, o art. 11 tem regime próprio. Sem consentimento, admitem-se, quando indispensáveis e
atendidas as hipóteses legais, cumprimento de obrigação legal ou regulatória, tratamento compartilhado
necessário pela administração pública à execução de políticas públicas previstas em leis ou regulamentos,
estudos por órgão de pesquisa com cautelas, exercício regular de direitos, proteção da vida, tutela da saúde e
prevenção à fraude na identificação/autenticação em sistemas eletrônicos, com salvaguardas. Não se aplica
automaticamente ao dado sensível a lista de bases do art. 7º; especialmente, não se transporta de forma
genérica a base de legítimo interesse. [F2, art. 11]
É útil separar três testes cumulativos. Competência: o órgão tem atribuição legal para a atividade? Hipótese
autorizadora: qual base legal atende aquela finalidade e à categoria de dados? Proporcionalidade
operacional: a quantidade, os destinatários, a retenção e os controles são necessários e adequados? A falta de
qualquer uma das dimensões fragiliza o ato. Um convênio não cria competência material inexistente; uma base
legal não transforma todos os dados em necessários; uma arquitetura segura não legitima finalidade ilícita.
O art. 4º delimita atividades fora da incidência ordinária da LGPD, incluindo hipóteses relacionadas à
segurança pública, defesa nacional, segurança do Estado e investigação/repressão de infrações penais, cuja
disciplina deve observar legislação específica e garantias aplicáveis. Isso não significa que toda iniciativa
rotulada de “segurança” fique livre da Constituição ou que uma base administrativa usada para fins penais
possa ser compartilhada indiscriminadamente. Também não é correto importar o regime administrativo
comum sem examinar a exceção específica. [F2, art. 4º]

3.1 Bases legais não são uma procuração geral para usar qualquer dado
No art. 7º, a execução de obrigação legal ou regulatória (inciso II) é distinta da realização de políticas públicas
por órgão administrativo (inciso III). A primeira demanda identificar uma obrigação efetivamente atribuída ao
controlador; a segunda pressupõe tratamento ou uso compartilhado necessário a uma política prevista ou
respaldada por instrumento juridicamente pertinente, respeitado o Capítulo IV. O instrumento não cria, por si
só, competência pública material. O art. 7º, VI, sobre exercício regular de direitos, pode ser relevante à
formação e defesa de pretensões em processos administrativos e judiciais, mas não converte um arquivo
processual em fonte irrestrita para fins alheios ao litígio. [F2, art. 7º]


                                                                                       LIVRO-DIG-001 • 20/11/2026 • 4
<!-- AGU_EDITOR_SECTION_END:04 -->

<!-- AGU_EDITOR_SECTION_START:05 -->
Consentimento é particularmente frágil quando o cidadão precisa informar dados para receber benefício que a
lei assegura. Se a recusa inviabiliza o exercício de um direito ou o cumprimento de dever público, o órgão não
deve apresentar o tratamento necessário como escolha inteiramente voluntária. Isso não impede situações
residuais de consentimento verdadeiramente específico e livre, como participação opcional em um projeto de
pesquisa ou serviço adicional não indispensável, desde que a finalidade e a capacidade real de recusa sejam
demonstradas. A opção não pode ser presumida a partir da simples utilização de portal governamental.
No caso de dados sensíveis, a via de tratamento sem consentimento deve ser encontrada nos pressupostos
próprios do art. 11, II. Uma política de assistência social pode exigir informação de deficiência para aferir
critério legal, mas isso não justifica acesso irrestrito ao prontuário médico. A expressão “indispensável”
demanda raciocínio operacional: qual atributo produz a decisão legítima e por que uma alternativa menos
intrusiva não serviria? A LGPD não inclui legítimo interesse como fundamento autônomo para dados sensíveis;
aplicá-lo por analogia diluiria a proteção reforçada.

3.2 O alcance e os limites das exclusões do art. 4º
As hipóteses do art. 4º, especialmente segurança pública, defesa nacional, segurança do Estado e investigação
ou repressão de infrações penais, exigem delimitação de finalidade exclusiva. Não se converte cadastro civil
cotidiano em atividade de investigação criminal mediante referência genérica a “prevenção de fraude”. O §1º do
art. 4º exige disciplina específica e observância das garantias constitucionais pertinentes para o tratamento
previsto no inciso III. O intérprete precisa separar a rotina administrativa de elegibilidade e auditoria de
pagamento da atividade formal de persecução penal, mesmo quando fatos descobertos na primeira dão origem
à segunda. [F2, art. 4º]
O método de demonstração jurídica pode ser formulado assim: identificar competência, fixar finalidade
concreta, selecionar base apropriada à categoria de dado, testar necessidade de cada campo e de cada
destinatário, definir duração e segurança e documentar o controle. Essa ordem impede dois atalhos: começar
pela solução tecnológica escolhida e procurar uma base legal depois; ou escrever uma base legal genérica e
supor que ela legitima tudo o que a tecnologia permitir fazer.


4 O regime especial dos órgãos públicos
O art. 23 autoriza e limita o tratamento pelas pessoas jurídicas de direito público: ele deve atender à finalidade
pública, perseguir o interesse público e executar competências ou atribuições legais, com informação clara e
atualizada acerca da previsão legal, finalidade, procedimentos e práticas de tratamento, preferencialmente em
sítios eletrônicos. O órgão deve indicar encarregado quando realiza tratamento, sem confundir essa figura com
as autoridades responsáveis pela Lei de Acesso à Informação, que continuam necessárias. O §3º remete os
prazos e procedimentos de direitos do titular, no setor público, à legislação específica, especialmente habeas
data, processo administrativo e LAI. [F2, art. 23]
As estatais pedem classificação adicional. Nos termos do art. 24, empresas públicas e sociedades de economia
mista que atuam em competição, sob o art. 173 da Constituição, recebem em regra tratamento equivalente ao
das pessoas jurídicas privadas; quando estiverem executando políticas públicas e dentro do âmbito dessas
atividades, segue-se o regime conferido às pessoas jurídicas de direito público. A mesma organização pode
exigir análise funcional, conforme a atividade efetiva, sem imunidade ou submissão cega a uma única etiqueta
empresarial. [F2, art. 24]
O art. 25 orienta que dados sejam mantidos em formato interoperável e estruturado para uso compartilhado,
execução de políticas públicas, prestação de serviços, descentralização da atividade pública e disseminação de
informações ao público. Interoperabilidade não é livre circulação universal. Padronizar cadastros para
evitar erros aumenta, ao mesmo tempo, a capacidade de cruzamento e o risco de acesso excessivo. Governança
deve acompanhar a eficiência.



                                                                                       LIVRO-DIG-001 • 20/11/2026 • 5
<!-- AGU_EDITOR_SECTION_END:05 -->

<!-- AGU_EDITOR_SECTION_START:06 -->
4.1 O art. 23 não confere ao Estado uma exceção geral
O art. 23 deve ser lido como norma especial de tratamento, e não como dispensa das condições gerais. Seu caput
exige finalidade pública, persecução do interesse público e execução de competências ou atribuições legais. O
inciso I demanda informação clara e atualizada, preferencialmente em canal eletrônico, sobre previsão legal,
finalidade, procedimentos e práticas de tratamento. Não basta que política de privacidade afirme que “o órgão
utiliza dados para atender à legislação”: o titular precisa compreender operações relevantes e ter caminho
acessível para exercer direitos. O inciso III exige a indicação de encarregado nos termos do regime aplicável.
[F2, art. 23; F3]
Essa disciplina não substitui LAI, habeas data, processo administrativo e normas de conservação documental.
Quando o cidadão solicita correção de dado equivocado e a Administração já o compartilhou com outros órgãos,
uma resposta meramente formal pode manter a exclusão do benefício em todos os sistemas receptores. Daí o
dever institucional de organizar processos interoperáveis de correção, rastreabilidade e comunicação de
ajustes, respeitadas as hipóteses legais. A pretensão de eliminação precisa ser analisada à luz de deveres de
guarda, prova e arquivo público, e não prometida automaticamente.

4.2 Quem é Poder Público para a LGPD
A disciplina abrange a administração dos três Poderes e das diferentes esferas federativas, observados os
destinatários descritos na lei. O art. 24 diferencia as empresas estatais que exploram atividade econômica em
competição, normalmente sujeitas a tratamento equivalente ao privado, daquelas que efetivamente executam
políticas públicas no âmbito dessas atividades. A análise é funcional: um contrato e um banco de dados de
estatal não recebem o regime público ou privado apenas pelo nome da entidade. A orientação da ANPD sobre
Poder Público ajuda a mapear esses contextos, mas não modifica as categorias legais. [F2, arts. 23–24; F3]


5 Compartilhamento entre órgãos e com particulares
O art. 26 condiciona o compartilhamento pelo Poder Público a finalidades específicas de execução de políticas
públicas e atribuições legais, respeitando os princípios do art. 6º. No compartilhamento entre órgãos, a
pergunta correta não é se ambos são públicos, mas se o destinatário realmente precisa daqueles atributos, para
atividade juridicamente autorizada. Instrumentos de governança devem delimitar objeto, base legal,
responsáveis, perfis de acesso, uso posterior, prazo, segurança e transparência. O guia orientativo da ANPD
recomenda formalização e registro administrativo, análise técnica e jurídica e definição de responsabilidades;
essa recomendação orienta boas práticas, mas não é, por si só, uma lei que crie nova base legal. [F2, art. 26; F3]
Quando a saída é uma entidade privada, o escrutínio é maior. O art. 26, §1º, estabelece vedação à
transferência de dados pessoais de bases públicas, com exceções definidas, entre elas a execução
descentralizada de atividade pública que a exija, estritamente para esse fim, os dados acessíveis publicamente
observada a LGPD, a previsão legal ou suporte em contratos, convênios ou instrumentos congêneres, e o
tratamento destinado exclusivamente a prevenir fraudes/irregularidades ou proteger titular nas condições do
inciso V. O inciso II foi vetado: não existe uma exceção vigente com esse número. O §2º exige comunicação à
ANPD dos contratos e convênios referidos na norma. [F2, art. 26]
O art. 27, por sua vez, trata da comunicação ou do compartilhamento de pessoa jurídica pública para pessoa
privada: informa-se a autoridade nacional e exige-se consentimento, salvo as hipóteses de dispensa previstas
na lei, os compartilhamentos com publicidade nos termos do art. 23, I, e as exceções do art. 26, §1º. Daí duas
armadilhas de prova: não é verdadeira a proposição de que todo compartilhamento público-privado exige
consentimento; também não é verdadeira a de que a mera existência de contrato basta para dispensar
finalidade, necessidade ou transparência. O procedimento de comunicação à autoridade requer leitura da
regulamentação aplicável à operação concreta, sem pressupor cumprimento por simples inserção de cláusula
padrão. [F2, art. 27]



                                                                                       LIVRO-DIG-001 • 20/11/2026 • 6
<!-- AGU_EDITOR_SECTION_END:06 -->

<!-- AGU_EDITOR_SECTION_START:07 -->
O STF examinou a governança do compartilhamento federal no julgamento conjunto da ADI 6649 e ADPF 695,
Plenário, concluído em setembro de 2022, a propósito do Decreto 10.046/2019. Conferiu interpretação conforme
à Constituição para exigir propósitos legítimos, específicos e explícitos; compatibilidade com finalidades
informadas; compartilhamento limitado ao mínimo necessário; publicidade clara das hipóteses e controles
robustos de acesso. No caso do Cadastro Base do Cidadão, o acesso pressupõe demonstração de necessidade real.
Esse precedente não decretou proibição geral de interoperabilidade: definiu seus limites constitucionais. O
tribunal também tratou da estrutura de governança do decreto, com declaração de inconstitucionalidade do
art. 22 e eficácia prospectiva indicada no julgamento; não se deve tratar a conformação institucional daquele
comitê em 2022 como retrato automaticamente atual de 2026. [J1]
A conclusão consultiva é concreta: “entre órgãos públicos” não é uma base legal autônoma, e “há
convênio” não demonstra que o pacote de dados proposto é proporcional. A peça de aconselhamento
deve conseguir apontar a competência do cedente, a do destinatário, a finalidade de cada campo e os
mecanismos de auditoria de acesso.

5.1 Prova documental de necessidade no compartilhamento interinstitucional
A ADI 6.649 e a ADPF 695 oferecem uma formulação jurídica que deve ser transformada em evidência: o órgão
destinatário precisa demonstrar finalidade legítima, específica e explícita; compatibilidade com a finalidade
informada; e limitação dos dados ao mínimo necessário. É insuficiente afirmar que haverá “melhoria de
gestão” e anexar termo de cooperação genérico. A decisão do STF incide sobre o desenho de compartilhamento
examinado e não revoga a possibilidade de intercâmbio institucional. A questão é o rigor das condições, não a
criação de um veto à interoperabilidade. [J1]
Para documentar o nexo, o processo pode conter descrição da atribuição de cada participante, catálogo de
atributos, fluxo de origem e destino, hipótese legal de tratamento, delimitação de usuários, prazos, controles de
acesso, registro de consultas, procedimento para contestação e avaliação das alternativas. Se o destinatário
necessita somente confirmar a situação de elegibilidade, uma consulta restrita ou resposta positiva/negativa
pode cumprir a finalidade com menos dados do que exportação de planilha integral. Esse teste pode ser
concluído por equipe técnica, mas deve estar compreensível a quem controla a legalidade da decisão.

5.2 A transferência ao particular é exame distinto
Quando há destinatário privado, o art. 26, §1º, parte de vedação à transferência de dados de bases públicas e
enumera exceções próprias: execução descentralizada indispensável e exclusiva; dados acessíveis publicamente
com observância da LGPD; previsão legal ou amparo em contrato, convênio ou instrumento congênere; e
finalidade exclusiva de prevenção de fraudes ou proteção da segurança e integridade do titular. O inciso II foi
vetado. O §2º fala em comunicação à ANPD dos contratos e convênios a que se refere o §1º. O art. 27 prevê
informação à autoridade e disciplina do consentimento com hipóteses expressas de dispensa. As formalidades
de cada operação não são satisfeitas pelo uso decorativo da expressão “termo de tratamento”. [F2, arts. 26–27]
A existência de contrato é elemento relevante, mas não prova sozinha que uma base integral possa ser enviada,
usada por tempo indeterminado ou repassada a suboperadores. A contratada deve ter acesso somente aos
dados indispensáveis à prestação, segundo finalidades documentadas; qualquer uso próprio demanda análise
independente do papel de controlador, da base legal, das exceções do art. 26 e dos riscos para titulares. A AGU
precisa distinguir o acesso instrumental necessário ao cumprimento contratual da transferência que altera
domínio decisório ou amplia destinatários. Em situações fronteiriças, a justificativa deve constar do processo,
em vez de ser resolvida por nomenclatura contratual.
O Decreto 10.046/2019 disciplina compartilhamento no âmbito de sua incidência, mas não pode ser tomado
como permissão geral acima da LGPD e da interpretação conforme dada pelo STF. Também é necessário
verificar seu texto e os atos de governança efetivamente vigentes no órgão, sem converter a arquitetura de um
comitê em 2022 em fotografia automática de 2026. O objeto do parecer é a operação concreta e suas
salvaguardas, não a repetição isolada de enunciado de decreto.

                                                                                      LIVRO-DIG-001 • 20/11/2026 • 7
<!-- AGU_EDITOR_SECTION_END:07 -->

<!-- AGU_EDITOR_SECTION_START:08 -->
6 Transparência administrativa e privacidade
A LAI e a LGPD são complementares, não inimigas. A LAI protege o direito do público de conhecer a atuação
estatal, enquanto limita o tratamento e a divulgação indevida de informações pessoais. O art. 31 da Lei
12.527/2011 assegura respeito à intimidade, vida privada, honra e imagem; dados pessoais referidos na norma
têm acesso restrito, independentemente de classificação formal de sigilo, pelo prazo máximo legal ali previsto,
ressalvadas as hipóteses de acesso e divulgação autorizadas pelo próprio dispositivo e outros regimes
pertinentes. Essa regra não legitima ocultar despesas públicas, benefícios ou decisões administrativas em
bloco: deve-se identificar quais campos e quais interesses exigem proteção e quando há relevante dever de
transparência. [F4]
No caso de pedidos de informação, é essencial distinguir três objetos: a informação sobre a política pública
(critérios, orçamento, indicadores, execução), que normalmente demanda forte publicidade; o próprio dado
do titular, cujo acesso se articula com LGPD, LAI e procedimentos administrativos; e dados de terceiros, em
que pode ser necessário fornecer versão anonimizada, tarjada ou agregada, ressalvadas bases legais de
divulgação e interesse público. Não se resolve o conflito com uma negativa genérica fundada na palavra
“LGPD”, nem com entrega irrestrita de planilha pessoal. O órgão deve motivar o exame de cada categoria e
entregar, quando cabível, a parte ostensiva.
Uma informação acessível ao público também permanece sujeita aos princípios de proteção de dados. Dados de
editais, portais de transparência ou decisões administrativas não autorizam, por esse só motivo, construção de
perfil de cidadãos para finalidade incompatível com o contexto de divulgação. Essa advertência é especialmente
relevante para raspagem automatizada de portais e publicação de bases abertas.

6.1 Transparência de política pública não equivale a exposição do cidadão
É possível exigir, com elevada intensidade, transparência sobre orçamento, critérios de seleção, lista de
contratos, metas, índices de deferimento, razões de indeferimento padronizadas e auditorias, e, ao mesmo
tempo, limitar o acesso a diagnóstico, composição familiar ou endereço residencial. A LAI, nos arts. 10 e
seguintes, protege o acesso sem necessidade de justificar o pedido; no art. 31 resguarda informações pessoais
relativas à intimidade, vida privada, honra e imagem, com regime de acesso restrito e exceções previstas em lei.
Esse regime de até cem anos não significa que todo dado pessoal receba automaticamente um carimbo de sigilo
por cem anos nem autoriza ocultação genérica da atividade administrativa. [F4]
O desenho da resposta ao pedido deve separar conteúdo ostensivo e conteúdo protegido. A Administração pode
entregar relatório de execução com campos pessoais tarjados, dados agregados por território com controle de
grupos muito pequenos ou uma resposta que explique por que a divulgação nominal é necessária por lei
especial em determinada rubrica. O redator deve avaliar se a anonimização é real ou apenas aparente. A
fundamentação exige identificar tanto os elementos passíveis de publicidade quanto os danos concretamente
evitados pelas restrições.
A LAI contém exceções que impedem seu uso para encobrir irregularidades, inclusive o art. 31, §§3º–4º. A
invocação de privacidade para esconder direcionamento indevido de recursos ou favorecer agente público
afronta o controle social. Inversamente, a simples alegação de combate à corrupção não legitima a publicação
de prontuários ou dados biométricos de terceiros sem nexo demonstrável. O dever é desenhar uma resposta
proporcional, justificável e revisável em instância competente.

6.2 Dados abertos e reutilização em escala
Abrir um conjunto de dados à consulta individual e distribuir arquivos estruturados com milhões de registros
pessoais são atos de impacto distinto, embora ambos possam partir de dados existentes em poder público. A
reutilização em escala amplia possibilidade de vinculação, segmentação e abuso. Antes da abertura, o órgão
deve justificar base jurídica de publicidade, avaliar finalidade e necessidade de identificadores, granularidade,
retenção e possibilidade de reidentificação. A legislação de governo digital e as políticas de dados abertos


                                                                                      LIVRO-DIG-001 • 20/11/2026 • 8
<!-- AGU_EDITOR_SECTION_END:08 -->

<!-- AGU_EDITOR_SECTION_START:09 -->
devem ser aplicadas em consonância com a LGPD, não como autorização implícita para publicar qualquer
microdado.


7 Direitos do titular, algoritmos e decisão administrativa
O art. 18 prevê direitos de confirmação de tratamento, acesso, correção de dados incompletos, inexatos ou
desatualizados e outras medidas, incluindo anonimização, bloqueio ou eliminação em hipóteses específicas,
informação de compartilhamentos e revogação do consentimento quando aplicável. Não existe direito geral
de apagar cadastros necessários ao cumprimento de obrigação legal ou à guarda legítima de
registros públicos. A própria lei contém hipóteses de conservação, como cumprimento de obrigação legal ou
regulatória e estudo por órgão de pesquisa com cautelas (art. 16). O tratamento precisa ser explicado ao titular
sem prometer eliminação juridicamente impossível. [F2, arts. 16–19]
O art. 20 assegura ao titular direito de solicitar revisão de decisões tomadas unicamente com base em
tratamento automatizado que afetem seus interesses, inclusive perfis pessoais, profissionais, de consumo ou
crédito. A norma exige informações claras sobre critérios e procedimentos, ressalvados segredos comercial e
industrial, e admite atuação da ANPD sobre aspectos discriminatórios em certos casos. O texto vigente não
impõe, como regra literal geral, uma revisão necessariamente por pessoa natural: essa exigência específica
foi objeto de veto. Entretanto, na Administração, devido processo, motivação, contraditório e normas próprias
do benefício ou sanção podem impor garantias adicionais; não se deve concluir que um algoritmo é imune a
revisão efetiva. [F2, art. 20; F5]
Uma nota jurídica sobre inteligência artificial deve exigir possibilidade real de contestar erro de dado e de
compreender os critérios relevantes da decisão, sobretudo quando o sistema condiciona o acesso a direitos
sociais. É insuficiente declarar que o algoritmo “apenas recomenda” se, na prática, sua pontuação determina
indeferimentos sem intervenção fundamentada. Essa é uma inferência jurídica aplicada dos princípios, do
art. 20 e das garantias administrativas, não uma tese judicial específica que esteja sendo atribuída ao STF.

7.1 O problema específico dos sistemas de IA no serviço público
Em modelos estatísticos e de inteligência artificial, deve-se distinguir a coleta dos dados de entrada, o
treinamento do modelo, a inferência aplicada ao caso e a decisão administrativa final. São quatro tratamentos
potencialmente diferentes, com diferentes agentes, riscos e justificativas. Quando um órgão fornece dados de
beneficiários para ajustar modelo de fornecedor, a finalidade de “treinar o produto” não se confunde
automaticamente com a finalidade de “executar política pública”. Se o fornecedor pode reutilizar exemplos
para clientes futuros, está em jogo uma nova finalidade, eventualmente com mudança no papel de agente de
tratamento, que não é legitimada por cláusula genérica de melhoria contínua. [F2, arts. 6º, 7º, 11, 20, 39 e 46]
O art. 20 protege situações em que uma decisão tomada unicamente por tratamento automatizado afeta
interesses do titular. Como o texto vigente assegura solicitação de revisão e informação sobre critérios e
procedimentos, a Administração não deve montar mecanismo de resposta vazio, no qual o cidadão recebe
apenas a mesma pontuação sem acesso a elementos verificáveis. A lei não contém dever textual universal de
revisão por pessoa natural; porém, contraditório, motivação, processo administrativo e legislação setorial
podem exigir intervenção e apreciação efetivas. Se uma pessoa assina formalmente uma conclusão sem poder
questionar o algoritmo, a participação humana pode ser apenas aparente.

7.2 Integridade epistêmica, discriminação e motivação
Uma decisão automatizada pode reproduzir dados incompletos, inferências espúrias ou resultados
historicamente enviesados. Por isso, o órgão precisa indagar se as variáveis são legalmente pertinentes, se o
sistema apresenta erros diferentes entre grupos, como o interessado identifica inconsistência e qual instância
pode alterar o resultado. A resposta não se resolve com afirmação de neutralidade matemática. A não



                                                                                     LIVRO-DIG-001 • 20/11/2026 • 9
<!-- AGU_EDITOR_SECTION_END:09 -->

<!-- AGU_EDITOR_SECTION_START:10 -->
discriminação do art. 6º, IX, e a qualidade do dado do inciso V ganham densidade quando uma pontuação
organiza a ordem de atendimento, seleção para fiscalização ou bloqueio de benefício.
Mesmo na hipótese em que um modelo apenas recomenda e a decisão formal cabe ao agente humano, o
procedimento deve conservar registro da recomendação recebida, de seu peso na motivação, de eventuais
desvios e das razões objetivas da decisão final. Essa recomendação é inferência de boa governança a partir de
garantias legais, e não afirmação de que o STF tenha imposto um único formato nacional de auditoria
algorítmica. A consultoria deve evitar importar automaticamente conceitos ou multas de regimes estrangeiros
como se fossem lei brasileira vigente.

7.3 Crianças, adolescentes e identidade digital
Dados de crianças e adolescentes merecem análise particular sob o art. 14 da LGPD e a regra do melhor
interesse. No ambiente digital, o ECA Digital — Lei 15.211/2025 — entrou em vigor em 17/03/2026, com
regulamentação iniciada pelo Decreto 12.880/2026, sem prejuízo de regras setoriais. Sua incidência deve ser
examinada segundo o objeto da plataforma, perfil de usuários e operação concreta; não é correto afirmar que
toda base educacional ou todo sistema interno de órgão público esteja, só por existir, sujeito a cada obrigação
dirigida a provedores de produtos ou serviços tecnológicos para crianças. O tema é conexão normativa
transversal, não substituição dos artigos centrais da LGPD. [F17]


8 Governança e segurança antes do incidente
As regras de segurança (arts. 46–49) exigem medidas técnicas e administrativas aptas a proteger dados contra
acessos não autorizados e eventos ilícitos ou acidentais. Não é preciso aguardar vazamento para estabelecer
proteção: a lei manda observar segurança desde a concepção até a execução do produto ou serviço. Na
administração, isso se traduz em papéis de acesso, autenticação, registro de operações, segregação de
ambientes, gestão de fornecedores, cópias protegidas, descarte e testes de resposta a incidentes. O relatório de
impacto à proteção de dados (RIPD) descreve processos potencialmente arriscados e medidas de mitigação;
a ANPD pode exigi-lo nos termos do art. 38. Não se deve confundir todo inventário interno com o RIPD formal,
nem afirmar que a lei obriga publicá-lo integralmente em todos os tratamentos. [F2, arts. 38 e 46–50]
A indicação de encarregado é expressa no art. 23, III, para os sujeitos públicos aí tratados. A Resolução
CD/ANPD 18/2024 regulamentou suas atribuições e, para pessoas jurídicas de direito público, recomenda que a
indicação recaia preferencialmente sobre servidores ou empregados públicos de reputação ilibada, sem fechar
abstratamente a porta a outra solução juridicamente permitida. Deve-se prevenir conflitos de interesses e
assegurar meios para receber reclamações, orientar equipes e conversar com a autoridade. A regulamentação é
diferente de uma transferência da responsabilidade integral pelo tratamento ao encarregado. [F6]
Se ocorre incidente de segurança com potencial de risco ou dano relevante aos titulares, o art. 48 determina
comunicação à ANPD e aos titulares, nas condições aplicáveis. A Resolução CD/ANPD 15/2024 disciplina, como
regra, prazo de três dias úteis, contados do conhecimento pelo controlador de que o incidente afetou dados
pessoais, para as comunicações, ressalvado prazo de lei específica. O art. 5º do regulamento combina impacto
significativo e critérios como dados sensíveis, de crianças, financeiros, de autenticação, sujeitos a sigilo ou em
larga escala. Nem todo evento técnico é automaticamente comunicável, mas todo evento deve ser registrado,
avaliado e respondido, pois o prazo corre a partir do conhecimento relevante, e não da conclusão confortável de
uma investigação sem prazo. [F7]

8.1 Responsabilização demonstrável: registro, matriz de riscos e RIPD
O art. 37 prevê registros de operações de tratamento e o art. 38 autoriza a ANPD a determinar elaboração de
relatório de impacto; o art. 32 trata, no setor público, da possibilidade de solicitar publicação desses relatórios.
Daí não decorre obrigação universal de produzir e publicar RIPD integral em cada simples coleta
administrativa. A orientação da ANPD diferencia operações e riscos, recomenda documentação proporcional e


                                                                                       LIVRO-DIG-001 • 20/11/2026 • 10
<!-- AGU_EDITOR_SECTION_END:10 -->

<!-- AGU_EDITOR_SECTION_START:11 -->
admite versão pública que resguarde elementos legalmente protegidos. Projetos de grande escala, dados
sensíveis, decisões automatizadas e riscos de exclusão de serviços são candidatos fortes à avaliação
aprofundada, mas a justificativa precisa ser individualizada. [F2, arts. 37–38; F13]
Um relatório útil registra tipos de dados, sua origem, finalidade, base jurídica, agentes e destinatários, fluxo
internacional, meios de proteção, análise de riscos e medidas de mitigação, juntamente com decisões e
responsáveis. O parecerista deve conseguir rastrear a pergunta: por que foram escolhidos esses dados e esse
fornecedor? Se o documento não permite responder, pode cumprir formalidade de aparência, mas falhar no
controle substantivo. Na contratação de nuvem, o RIPD não substitui estudo técnico preliminar, planejamento
de compras e segurança da informação; os documentos dialogam, mas têm objetos e regimes distintos.

8.2 Resposta a incidentes com cronologia verificável
Na Resolução CD/ANPD 15/2024, a obrigação regulatória de comunicar à ANPD e aos titulares, quando
presentes critérios de risco ou dano relevante, recai sobre o controlador; o operador deve informá-lo sem
demora injustificada. O art. 5º exige avaliação cumulativa de impacto significativo e de ao menos uma categoria
listada, como dados sensíveis, financeiros, de autenticação ou em grande escala. O prazo geral de três dias úteis
conta-se do conhecimento pelo controlador de que o incidente afetou dados pessoais, ressalvados prazos legais
específicos; informações não disponíveis podem ser complementadas nas condições regulamentares. [F14, arts.
5º–9º]
A resposta institucional deve preservar evidências, conter a exposição, identificar categorias de titulares e
dados, medir riscos, acionar equipes de segurança e jurídico, avaliar comunicações e registrar fundamentos de
eventual não notificação. O regulamento, art. 10, estabelece registro do incidente inclusive não comunicado;
sua regra temporal contém ressalva específica para entidades públicas referidas no art. 23 da LGPD, observadas
tabelas de temporalidade e regras arquivísticas. Por isso não se pode afirmar mecanicamente prazo único de
descarte de cinco anos para todo órgão público. A contratada deve fornecer ao controlador informações
necessárias à avaliação sem esperar encerramento da perícia. [F14, art. 10]


9 Fiscalização, sanções e responsabilidade
A LGPD contempla responsabilização e reparação por danos, com regras de controladores e operadores (arts.
42–45), sem apagar o regime constitucional e administrativo de responsabilidade do Estado quando aplicável. O
art. 37, §6º, da Constituição e outros regimes especiais podem importar na análise do sujeito responsável, da
lesão, do nexo causal e do direito de regresso. Não se deve deduzir responsabilidade civil automática de
qualquer desconformidade documental; tampouco negar lesão relevante só porque não houve divulgação na
imprensa.
A ANPD tem poderes de orientação, fiscalização e sanção. Para órgãos e entidades públicas, o art. 52, §3º, não
inclui as multas simples e diárias entre as sanções aplicáveis previstas nesse parágrafo. O rol permitido
abrange, entre outras medidas especificadas no texto, advertência, publicização da infração, bloqueio ou
eliminação de dados e certas restrições de tratamento. É erro frequente aplicar ao órgão federal, sem distinção,
o teto de multa de R$ 50 milhões previsto para certas pessoas jurídicas de direito privado. O regime público não
é impunidade: subsistem determinações, medidas corretivas, fiscalização e responsabilidades disciplinares,
civis e outras legalmente cabíveis. [F2, arts. 31–32 e 52]
Em 2026 houve mudança institucional importante: a Lei 15.352/2026 conferiu à ANPD natureza de agência
reguladora, autarquia especial vinculada ao Ministério da Justiça e Segurança Pública, com autonomia
funcional, técnica, decisória, administrativa e financeira, alterando o art. 55-A da LGPD e integrando-a ao rol
legal das agências reguladoras. A lei entrou em vigor na data de publicação, 25/02/2026, e estabeleceu regras
transitórias de sucessão de direitos, obrigações e processos. Logo, apontar a ANPD como órgão da
administração direta é descrição desatualizada. A autonomia da autarquia não equivale a ausência de controle
ou competência legislativa própria ilimitada. [F8]


                                                                                     LIVRO-DIG-001 • 20/11/2026 • 11
<!-- AGU_EDITOR_SECTION_END:11 -->

<!-- AGU_EDITOR_SECTION_START:12 -->
9.1 Autoridade reguladora, supervisão e limites da sanção
A Lei 15.352/2026 redesenhou a natureza da ANPD como autarquia especial vinculada ao Ministério da Justiça
e Segurança Pública, com autonomias legais e enquadramento no regime de agências reguladoras. Vinculação
administrativa não é subordinação hierárquica ordinária. O regime atual não permite seguir descrevendo a
Agência como mero órgão da Presidência ou simplesmente da administração direta. A norma também contém
disposições transitórias; a mudança de natureza jurídica não demonstra, por si só, que cada unidade interna,
sistema de pessoal e ato de implementação já tenha sido integralmente adaptado na data de corte. [F8]
As ações de fiscalização e sancionamento têm disciplina procedimental própria, inclusive Resoluções CD/ANPD
1/2021 e 4/2023. O art. 52, §3º, da LGPD prevê rol de sanções aplicáveis aos órgãos e entidades públicos, sem
estender automaticamente as multas simples e diárias dos incisos II e III. Não se deve, por esse motivo,
concluir pela inexistência de dever de correção, medida preventiva ou responsabilização individual segundo
outras leis. É igualmente impreciso projetar sobre cada incidente o dano moral presumido, pois sanção
administrativa, reparação civil e responsabilização disciplinar partem de pressupostos próprios. [F2, arts. 31–
32, 42–45 e 52]
O diálogo entre ANPD, controlador, encarregado e auditoria interna deve conservar a autoridade decisória do
órgão e o regime de garantias do administrado. A indicação de encarregado, inclusive nos termos da Resolução
18/2024, não faz dele responsável solitário por toda política de segurança. A atribuição decisória depende de
competência administrativa real e de recursos para corrigir sistemas, contratos e procedimentos. [F6]


10 Transferência internacional e contratação de tecnologia
Uso de nuvem, suporte externo e análise de dados por empresa estrangeira podem envolver transferência
internacional (art. 33); a localização comercial da sede do fornecedor, isoladamente, não resolve a questão. É
preciso mapear quem recebe os dados, onde estão os acessos e qual operação jurídica ocorre. As hipóteses da
LGPD incluem país/organismo com proteção adequada, garantias reconhecidas como cláusulas-padrão e outros
fundamentos específicos, inclusive execução de política pública ou atribuição legal com publicidade exigida
pelo art. 23, I, quando cabível. A Resolução CD/ANPD 19/2024 regulamenta transferências internacionais. [F2,
arts. 33–36; F9]
A Resolução CD/ANPD 32/2026 reconheceu a adequação da União Europeia e do escopo
territorial/institucional previsto no próprio ato para fins do art. 33, I. Isso facilita a escolha de mecanismo de
transferência no âmbito reconhecido, mas não dispensa base legal para tratar os dados no Brasil, finalidade,
necessidade, segurança, limitação contratual ou as regras de acesso pelo poder público. A decisão de adequação
não é autorização genérica para importar qualquer banco federal para uma plataforma europeia. [F10]
Na contratação, a AGU deve exigir instruções documentadas e verificáveis ao operador, finalidade restrita,
vedação de aproveitamento comercial dos dados pela contratada, regras de subcontratação, segurança,
cooperação em incidentes, retorno ou eliminação ao término, sem prejuízo de guarda legitimamente exigível e
respeito aos prazos de retenção legítima. Esses termos concretizam normas existentes e mitigam riscos, mas
não devem ser anunciados como transcrição literal de uma cláusula legal única ou como garantia suficiente
sem fiscalização.

10.1 SaaS, PaaS e IaaS: três modelos, um dever de examinar o fluxo real
Em IaaS, o fornecedor disponibiliza infraestrutura; em PaaS, plataforma para desenvolvimento e operação; em
SaaS, aplicação pronta como serviço. As fronteiras técnicas de operação e segurança diferem, mas todas podem
envolver tratamento de dados pessoais. Não se pode inferir o papel jurídico do fornecedor apenas da
modalidade comercial. O ministério pode ser controlador de cadastros processados no SaaS, enquanto
prestadores de hospedagem, suporte e monitoramento executam instruções como operadores ou
suboperadores; se algum deles decide finalidades próprias, o papel daquela operação precisa ser requalificado.


                                                                                      LIVRO-DIG-001 • 20/11/2026 • 12
<!-- AGU_EDITOR_SECTION_END:12 -->

<!-- AGU_EDITOR_SECTION_START:13 -->
O processo deve documentar também telemetria, backups, logs, integrações por API e acesso remoto de suporte,
que frequentemente escapam do diagrama simplificado apresentado na contratação.
A consulta jurídica deve pedir a equipe de TIC um diagrama de circulação de dados com origem, classes de
informação, local de armazenamento, localidades de acesso e continuidade, integrações, subfornecedores e
destino dos arquivos ao término contratual. “Dados hospedados no Brasil” não resolve todos os riscos se
administradores estrangeiros acessam o ambiente, ou se logs e cópias de recuperação são mantidos em outra
região. Também não se deve presumir transferência internacional apenas porque a fornecedora é estrangeira:
a operação efetiva e o enquadramento do art. 33 precisam ser identificados. [F2, arts. 33–36; F16]

10.2 Licitação, planejamento e governança contratual de TIC
A Lei 14.133/2021 fornece o regime geral de planejamento, escolha, formalização e fiscalização contratual. Nos
órgãos abrangidos pelo SISP do Poder Executivo federal, a Instrução Normativa SGD/ME 94/2022 regulamenta
o processo de contratação de soluções de TIC e a Portaria SGD/MGI 5.950/2023 estabelece modelo para
software e serviços em nuvem. O próprio portal oficial de Governo Digital identifica a Portaria 5.950 como
vigente e oferece modelos de termo de referência. Essas normas instrumentais incidem segundo âmbito
subjetivo e objeto delimitados; não devem ser aplicadas automaticamente a município, ao Legislativo ou a uma
estatal fora da hipótese normativa. [F11; F12; F18]
A proteção de dados precisa comparecer desde estudo técnico preliminar, análise de riscos e termo de
referência, e não somente em cláusula assinada na implantação. A definição da solução deve justificar se os
dados precisam sair da infraestrutura estatal, quais integrações e necessidades de alta disponibilidade existem,
como se medirá serviço prestado e qual alternativa cumpre a finalidade com menor exposição. Uma
especificação que exige treinamento de um modelo proprietário com todos os cadastros pode elevar custo,
dependência tecnológica e risco de tratamento secundário sem que o ganho tenha sido demonstrado.
Planejamento cuidadoso não é obstáculo burocrático externo à LGPD: é o modo de evidenciar necessidade e
proporcionalidade em contratação pública.

10.3 Cláusulas jurídico-operacionais que tornam o dever exigível
A minuta deve estabelecer objeto e finalidades lícitas de processamento, tipos de dados, categorias de titulares,
período de guarda, instruções do controlador, perfis de acesso, autenticação, cifragem adequada, segregação de
ambientes, testes, auditabilidade e forma de demonstrar cumprimento. É recomendável exigir canal de
incidentes com notificação imediata ao órgão, independentemente do prazo regulatório do controlador perante
a ANPD; a contratada precisa fornecer logs, cronologia, categorias afetadas e medidas de contenção. O
fundamento geral reside especialmente nos arts. 39, 46–48 da LGPD, mas a redação exata dessas obrigações
técnicas dependerá de riscos, especificação, negociação juridicamente admissível e regras da contratação. [F2;
F11; F12]
Subcontratação e cadeia de operadores merecem atenção. Em vez de proibir genericamente qualquer recurso
de nuvem, a Administração pode disciplinar aprovação ou conhecimento prévio dos suboperadores
pertinentes, lista atualizada de fornecedores e regiões, obrigações de fluxo descendente e acesso para auditoria
proporcional. A proibição de uso dos dados para marketing, treinamento comercial ou produtos de terceiros
deve ser verificável por condições de serviço, configurações e mecanismos de fiscalização. O silêncio do contrato
sobre uso secundário não é autorização legítima; por outro lado, uma proibição sem monitoramento técnico
pode ser apenas simbólica.
No encerramento ou substituição do fornecedor, o órgão necessita recuperar dados em formato interoperável,
eliminar cópias operacionais quando cabível, preservar registros cuja guarda decorra de lei e obter evidências
de execução dessas obrigações. A cláusula de exclusão “imediata e irrestrita” pode colidir com deveres de
arquivo público, segurança, defesa de direitos ou registros de incidente. A solução jurídica é política de
retenção por categoria e obrigação de portabilidade/reversibilidade, não promessa absoluta de apagar toda



                                                                                     LIVRO-DIG-001 • 20/11/2026 • 13
<!-- AGU_EDITOR_SECTION_END:13 -->

<!-- AGU_EDITOR_SECTION_START:14 -->
informação em qualquer circunstância. Dependência de formatos proprietários, custo de saída e
impossibilidade de verificar o descarte são riscos contratuais de eficiência e juridicidade.

10.4 Transferência internacional: art. 33, Resolução 19/2024 e adequação em 2026
O art. 33 da LGPD prevê mecanismos jurídicos alternativos para a transferência internacional, como decisão de
adequação, garantias contratuais e hipóteses legalmente delimitadas de cooperação ou execução de política
pública, além de outras previstas na norma. A Resolução CD/ANPD 19/2024 regulamenta mecanismos,
cláusulas-padrão e procedimentos. Seu texto foi objeto de retificação em 2025 conforme índice da ANPD; esta
edição verifica os mecanismos centrais, mas não certifica todos os anexos, condições e efeito de cada
retificação. É incorreto apresentar “consentimento do titular” como requisito universal de toda transferência,
assim como presumir que qualquer contrato padronizado do fornecedor satisfaz cláusulas-padrão brasileiras.
[F9; F16]
A Resolução CD/ANPD 32/2026 reconheceu adequação no âmbito descrito em seu ato para a União Europeia e
componentes do Espaço Econômico Europeu e instituições europeias mencionadas. Esse reconhecimento
constitui mecanismo do art. 33, I, para transferências cobertas pelo ato, mas não elimina a legalidade anterior
do tratamento, a necessidade de justificar o compartilhamento público-privado ou a segurança técnica.
Transferência para país fora do escopo, suporte por suboperador em região distinta ou uso secundário de dados
demanda análise própria, mesmo que a fornecedora possua matriz na União Europeia. [F10; F16]
A solução contratual adequada deve, portanto, operar em dois planos: existência de base legal e finalidade para
o tratamento do órgão no Brasil, e disponibilidade de mecanismo legítimo para circulação internacional. Se
falta o primeiro, a decisão de adequação não sana a operação. Se há o primeiro, mas não se identificou para
onde os dados circulam, a existência genérica de cláusula de privacidade não basta. Questões de soberania
informacional, sigilo legal e regras de compras podem acrescentar condicionantes independentes da LGPD.


11 Jurisprudência com alcance delimitado
O julgamento da ADI 6387 MC-Ref, em conjunto com ações conexas contra a MP 954/2020, é marco do debate
sobre compartilhamento massivo. O STF referendou a suspensão da medida que permitiria envio de dados de
clientes de telefonia ao IBGE durante a pandemia, destacando os riscos à privacidade e à proteção de dados e a
insuficiência de salvaguardas. É precedente de controle concentrado relevante ao reconhecimento
constitucional da proteção informacional antes da EC 115; não equivale a declarar ilícito qualquer uso de dados
para estatística pública. A controvérsia concreta envolvia a medida provisória e seu desenho insuficiente. [J2]
O precedente mais diretamente aplicável a bases interoperáveis é a ADI 6649/ADPF 695, julgada pelo Plenário
em 15/09/2022, com parâmetro de interpretação conforme do Decreto 10.046/2019. A consequência para a AGU
não é mera referência ao nome do processo: a motivação da medida deve evidenciar propósito legítimo, base
jurídica, compatibilidade, minimização, publicidade dos compartilhamentos e restrições reais de acesso. [J1]
Ambas as referências foram conferidas em páginas institucionais e no Informativo 1068 do STF. A cadeia
integral de decisões posteriores, eventuais incidentes de execução e jurisprudência setorial do STF/STJ não foi
exaurida nesta edição. A força de um precedente deve ser compreendida conforme seu objeto decidido;
informações editoriais e orientações da ANPD não são teses vinculantes do STF.

11.1 O que a jurisprudência efetivamente decide
A ADI 6.387, em medida cautelar referendada no conjunto de ações contra a MP 954/2020, enfrentou
disponibilização em massa de dados de usuários de telefonia ao IBGE. O fundamento constitucional relevante
não foi uma proibição abstrata de estatísticas públicas, mas a insuficiência das justificativas e salvaguardas
para aquela operação, com risco elevado à privacidade e à proteção informacional. A conclusão foi construída
em fase cautelar, anterior à EC 115/2022, razão pela qual se deve distinguir o reconhecimento jurisprudencial
do direito e seu posterior texto expresso no art. 5º, LXXIX. [J2]

                                                                                   LIVRO-DIG-001 • 20/11/2026 • 14
<!-- AGU_EDITOR_SECTION_END:14 -->

<!-- AGU_EDITOR_SECTION_START:15 -->
Na ADI 6.649 e ADPF 695, julgadas em conjunto pelo Plenário em 15/09/2022, o STF reputou possível o
compartilhamento de dados na Administração federal, subordinando-o a propósitos legítimos, específicos e
explícitos, compatibilidade e minimização, publicidade e requisitos de segurança e governança. O precedente
deve ser citado como interpretação conforme do regime controvertido, não como autorização geral para todo
convênio nem como decreto de inconstitucionalidade total do compartilhamento. A eventual discussão de
governança orgânica do decreto e a sucessão de atos administrativos exigem exame temporal específico. [J1]

11.2 Reparação por vazamentos: STJ como contraste delimitado
O STJ, na Segunda Turma, AREsp 2.130.619/SP, rel. Min. Francisco Falcão, julgado em 07/03/2023 e publicado
em 10/03/2023, tratou de vazamento de dados não enquadrados como sensíveis no caso apreciado e afastou
presunção automática de dano moral. Essa razão de decidir não autoriza o Estado a negar em qualquer
incidente lesão extrapatrimonial nem significa que dados sensíveis tenham regra universal de
responsabilidade automática. A conclusão depende da natureza dos dados, prova de dano, nexo, contexto do
tratamento e regime jurídico aplicável; em uma operação estatal, também será necessário enfrentar as normas
constitucionais e especiais pertinentes. [J3]
A comparação entre precedentes mostra a importância do objeto processual. O STF examinou a conformidade
constitucional de atos gerais de compartilhamento; o STJ enfrentou pressuposto de indenização em situação
individual. Nenhum desses julgamentos substitui uma análise de decisão automatizada de benefício sob
legislação setorial específica. Do ponto de vista da AGU, reconhecer esse limite evita alegações jurídicas que
parecem fortes por citar tribunal superior, mas não alcançam os fatos do processo.


12 Comparações que evitam erros de prova
Situação                              Consequência jurídica principal            Erro a evitar

Órgão coleta dados para dever legal   Examinar art. 7º, II, art. 23 e os         Exigir consentimento para toda coleta
determinado                           princípios                                 pública

Órgãos compartilham dados para        Examinar competência, art. 7º, III, art.   Tratar o simples caráter público como
política pública                      26 e ADI 6649                              autorização suficiente

                                      Examinar as hipóteses especiais do art.    Aplicar indiscriminadamente bases do
Cadastro contém dado de saúde
                                      11 e salvaguardas                          art. 7º

Base pública é fornecida a empresa    Examinar arts. 26, §1º, e 27, contrato e   Imaginar que contrato ou
contratada                            finalidade                                 consentimento presumido basta

Cidadão pede informação sobre gasto   Examinar LAI, LGPD, acesso parcial e       Negar tudo por haver um nome numa
público                               transparência                              planilha

                                      Avaliar risco relevante e Resolução        Tratar qualquer falha como incidente
Incidente atinge dados pessoais
                                      15/2024                                    notificável ou esperar sem registrar

                                                                                 Aplicar automaticamente multas do art.
Sanção à entidade pública             Aplicar art. 52, §3º, e demais regimes
                                                                                 52, II e III



12.1 Comparação aprofundada: autorização, transparência e proteção
O consentimento é base legal possível de tratamento, mas muitas atividades estatais se fundam no dever legal
ou em política pública. A publicidade prevista na LAI tem objeto distinto do dever de transparência da LGPD: a
primeira disciplina o acesso a informações de interesse público; a segunda exige explicação das atividades de


                                                                                           LIVRO-DIG-001 • 20/11/2026 • 15
<!-- AGU_EDITOR_SECTION_END:15 -->

<!-- AGU_EDITOR_SECTION_START:16 -->
tratamento e tutela dos titulares. Nem uma negativa genérica sob “LGPD” afasta a LAI, nem um pedido de
acesso autoriza a divulgação de base integral sem triagem. São institutos que operam em paralelo, com
sobreposição e limites.
Um instrumento interinstitucional não equivale a contrato com operador privado. No primeiro, o foco recai na
legalidade da atuação de cedente e destinatário e na finalidade específica do uso compartilhado. No segundo,
além de examinar arts. 26 e 27, deve-se perguntar se há transferência de bases, qual exceção se aplica, quais são
as instruções lícitas do operador, que subcontratados acessam os dados e que mecanismo de supervisão
permite descobrir e corrigir descumprimentos. Quando há processamento no exterior, um terceiro teste
independente examina o mecanismo do art. 33.
Por fim, proteção de dados e segurança da informação são conceitos conectados, porém diferentes. Um sistema
pode ser tecnicamente seguro e juridicamente excessivo: se coleta dados desnecessários, a ausência de
vazamento não legitima a finalidade. O inverso também ocorre: o tratamento possui finalidade legítima, mas a
falta de autenticação e controle de acesso viola dever de segurança. A consultoria completa precisa combinar
legalidade do uso, direitos dos titulares e proteção operacional.


13 Caso AGU resolvido e retorno ao problema

13.1 Primeiro caso resolvido — integração de cadastros e controle social
Fatos. Retomemos a plataforma de benefícios. A secretaria tem competência legal para reconhecer
elegibilidade, prevenir pagamento indevido e conceder a prestação. Parte dos dados vem de outra entidade
federal, a contratada oferece motor de triagem automatizada e há pedido de informações por jornalista. A
minuta prevê transferência irrestrita de bases por tempo indeterminado e uso posterior para aperfeiçoamento
comercial do modelo.
Questão jurídica. Pode a Administração implementar o projeto sem consentimento individual de todos os
cidadãos e liberar integralmente os cadastros à contratada?
Análise. O núcleo de tratamento pode ser legítimo sem consentimento, desde que se identifiquem as
atribuições legais e a hipótese pertinente dos arts. 7º, II ou III, ou 11, II, conforme a natureza de cada dado. O
art. 23 exige finalidade pública e transparência; o art. 26 e a ADI 6649 impõem finalidade específica,
compatibilidade e minimização no compartilhamento entre órgãos. A entrega a particular demanda a
investigação separada dos arts. 26, §1º, e 27, inclusive exceção aplicável e formalidades. Não se deve aceitar
como justificativa o “consentimento presumido”: a pessoa não negociou de modo livre a condição de receber
serviço público. Tampouco parece necessário enviar todos os históricos clínicos e telefones quando bastariam
atributos de elegibilidade ou respostas de verificação.
Objeção forte. A equipe gestora argumenta que restringir dados prejudica combate à fraude, impede
aprendizado do modelo e eleva custo. A objeção merece exame técnico, mas não elimina a obrigação de testar se
resultado equivalente pode ser obtido com atributos menos intrusivos, acesso por consultas específicas,
segregação ou dados agregados. A eficiência não desaparece da balança: integra a avaliação de adequação, mas
precisa de evidência e proporcionalidade. Uso comercial independente pela contratada não se legitima apenas
por estar no mesmo contrato de prestação do serviço.
Conclusão condicionada. A AGU pode opinar favoravelmente à continuidade após saneamento do projeto,
mas não à sua configuração original. Antes da operação, recomenda-se: (1) registrar a atribuição legal e base de
tratamento por finalidade e categoria; (2) elaborar matriz de necessidade de campos e de destinatários,
incluindo dado sensível; (3) formalizar o compartilhamento interinstitucional com publicidade e perfis de
acesso; (4) reestruturar instrumento com a empresa, vedando finalidade comercial autônoma e disciplinando
suboperadores e eventual transferência internacional; (5) realizar avaliação de risco e, quando apropriado,
RIPD; (6) prever contestação e revisão de decisões automatizadas, correção de dados e motivação; (7)


                                                                                      LIVRO-DIG-001 • 20/11/2026 • 16
<!-- AGU_EDITOR_SECTION_END:16 -->

<!-- AGU_EDITOR_SECTION_START:17 -->
estabelecer gestão de incidentes, registros e plano de resposta; (8) submeter implementação efetiva à
fiscalização administrativa correspondente.
Pedido do jornalista. Em paralelo, a Administração deve processar a solicitação pela LAI, separar os dados de
fiscalização da política de informações pessoais não necessárias, justificar eventuais restrições e considerar
acesso parcial, agregação ou anonimização. Não é correto presumir que a totalidade da planilha é pública ou
secreta. Se existir dispositivo legal específico de publicidade de determinada informação, ele deve ser
individualmente examinado.
Praxis. A boa manifestação jurídica não “carimba” o projeto nem se limita a proibi-lo. Ela explicita quais fatos
precisam ser comprovados e torna a decisão administrativa controlável por cidadãos, gestores, auditoria e
Justiça.

13.2 Segundo caso resolvido — contratação de SaaS em nuvem e incidente de segurança
Fatos. Uma autarquia federal integrante do SISP contrata plataforma SaaS para gestão de solicitações de
benefício de saúde. O termo de referência exige disponibilidade contínua, mas a minuta do fornecedor autoriza
suporte administrativo a partir do exterior, processamento de telemetria para desenvolvimento de produtos
próprios e contratação unilateral de suboperadores. Parte do banco contém diagnósticos e dados de
dependentes menores. Após três meses, um token de integração fica exposto e permite a acesso a um
subconjunto de registros. A empresa demora dois dias para comunicar o problema, informando apenas que não
houve indisponibilidade. O órgão sustenta que, por ter contratado fornecedor experiente, a obrigação de
comunicação à ANPD seria exclusivamente da empresa.
Competência e regime. A autarquia é, em princípio, controladora das operações necessárias à sua competência
legal de gerir benefícios; o SaaS executa atividades como operador na medida em que observa instruções,
embora qualquer finalidade própria de desenvolvimento comercial deva ser isoladamente qualificada. A
relação contratual exige a Lei 14.133/2021, a IN SGD/ME 94/2022 e o modelo aplicável da Portaria SGD/MGI
5.950/2023 no âmbito SISP, além da LGPD. Diagnósticos são dados sensíveis; dados de menores requerem
proteção adicional. O contrato não suprime as responsabilidades do controlador nem transforma
automaticamente toda operação do fornecedor em operação autorizada do órgão. [F2; F11; F12; F17; F18]
Exame do contrato. A autorização ampla de “melhoria de serviços” não justifica o treinamento comercial do
fornecedor com dados pessoais dos administrados. A AGU deve exigir finalidade definida, vedação ou
tratamento autônomo juridicamente justificado para qualquer uso secundário, inventário de suboperadores e
regiões, nível de acesso de suporte, plano de resposta a incidentes, evidência de segurança, portabilidade,
retenção e fiscalização. Se houver transferência internacional, o mecanismo jurídico do art. 33 e da Resolução
19 deve ser identificado. A adequação europeia da Resolução 32 só aproveita às transferências abrangidas por
seu escopo e não sana dados enviados a outros destinos ou finalidades indevidas.
Exame do incidente. Exposição de token pode comprometer confidencialidade mesmo sem interrupção do
serviço; disponibilidade não é sinônimo de proteção. A autarquia deve apurar o momento de conhecimento de
que dados pessoais foram afetados, dados e titulares alcançados, probabilidade de dano e eventuais medidas de
contenção. A presença de diagnósticos, dados de crianças e credenciais impõe exame rigoroso dos critérios
cumulativos do art. 5º da Resolução 15/2024. Sendo comunicável, compete ao controlador notificar ANPD e
titulares no prazo geral de três dias úteis, ressalvados prazos legais específicos. A operadora deve informar
imediatamente o controlador e cooperar; não é aceitável aguardar conclusão de perícia para iniciar resposta.
[F14]
Objeção forte. A área técnica argumenta que bloquear o SaaS interromperia atendimento essencial, e que a
notificação pública sem investigação concluída criaria alarme. Ambas as preocupações são legítimas, mas
pedem solução proporcional: revogar credenciais, restringir integração, preservar continuidade por plano
alternativo, comunicar o que já se conhece com ressalvas justificadas e complementar informações no prazo



                                                                                    LIVRO-DIG-001 • 20/11/2026 • 17
<!-- AGU_EDITOR_SECTION_END:17 -->

<!-- AGU_EDITOR_SECTION_START:18 -->
regulamentar quando necessário. O grau de divulgação deve ser definido pelos riscos, não por interesse
reputacional do fornecedor ou da autarquia.
Conclusão e providências. O parecer é desfavorável à continuidade da cláusula de treinamento comercial
irrestrito e à distribuição unilateral de suboperadores. Recomenda aditivo e providências de fiscalização
compatíveis com o regime da contratação, revisão técnica de acessos, isolamento do token, inventário de dados
afetados, registro do evento, avaliação documentada de comunicabilidade, comunicação tempestiva se
preenchidos os critérios, correção das falhas e plano de atendimento ao titular. A autarquia não deve assumir
que a ANPD aplicará multa simples como sanção administrativa comum ao próprio órgão, mas tampouco
presumir imunidade a ações corretivas, apuração de responsabilidades e pretensões de reparação. A resposta
jurídica preserva a continuidade legítima do serviço sem ocultar riscos.

13.3 Miniparecer integrado — critério de decisão
Nos dois casos, a forma de uma manifestação AGU pode ser reconstruída em seis movimentos: a) delimitar os
fatos comprovados e os documentos ausentes; b) identificar competência, categoria de dado e hipótese de
tratamento; c) cotejar compartilhamento e regime do particular; d) examinar, quando presentes, IA, nuvem e
circulação internacional; e) enfrentar a objeção tecnicamente mais forte; f) concluir de modo condicionado,
com medidas verificáveis, responsáveis e pontos de reavaliação. A finalidade do parecer não é blindar decisão
administrativa já tomada, mas permitir que ela seja corrigida antes de produzir violação de direitos e
desperdício de recursos públicos.


14 Questões autorais comentadas
As questões abaixo são originais desta edição, não reproduções de provas Cebraspe. Não possuem gabarito
oficial de concurso nem inferência estatística de frequência. Assinale CERTO ou ERRADO antes de consultar o
comentário, se desejar usar a seção como revisão.
Questão 1. A ausência de consentimento do titular impede, por si só, que ministério trate dados pessoais
comuns para cumprir obrigação legal determinada e executar atribuição pública. Gabarito: ERRADO. Arts. 7º,
II e III, e 23 mostram que o consentimento é apenas uma das bases possíveis. A necessidade e a finalidade
continuam exigíveis.
Questão 2. O art. 26 da LGPD autoriza compartilhamento indiscriminado de dados pessoais entre órgãos
públicos sempre que ambos declarem perseguir o interesse público. Gabarito: ERRADO. A finalidade deve ser
específica, a competência concreta, e o tratamento adequado, necessário e transparente, conforme art. 6º e ADI
6649/ADPF 695.
Questão 3. A contratação de empresa privada para executar atividade pública pode enquadrar-se em exceção
legal à vedação de transferência de bases, mas não dispensa delimitação da finalidade e proteção contra
reutilização indevida. Gabarito: CERTO. Art. 26, §1º, I e IV, conforme fatos; art. 27 e princípios permanecem
relevantes.
Questão 4. A LGPD considera revogado o art. 28 e também o inciso II do §1º do art. 26, ambos por revogação
legislativa posterior. Gabarito: ERRADO. Ambos aparecem vetados no texto consolidado, não revogados. A
distinção entre veto e revogação importa na leitura literal.
Questão 5. Depois da Lei 15.352/2026, a ANPD passou a ser autarquia de natureza especial com autonomia
legal e inserção no regime de agência reguladora, não órgão ordinário da administração direta. Gabarito:
CERTO. Conferir art. 55-A da LGPD e Lei 15.352/2026.
Questão 6. A multa simples de até R$ 50 milhões da LGPD é sanção regularmente aplicável a qualquer órgão
federal que descumpra a lei, sem distinção entre regimes público e privado. Gabarito: ERRADO. O art. 52, §3º,
delimita sanções aplicáveis às entidades e órgãos públicos e não inclui os incisos II e III nesse rol.


                                                                                   LIVRO-DIG-001 • 20/11/2026 • 18
<!-- AGU_EDITOR_SECTION_END:18 -->

<!-- AGU_EDITOR_SECTION_START:19 -->
Questão 7. A Resolução CD/ANPD 15/2024 disciplina comunicação de incidente capaz de gerar risco ou dano
relevante, prevendo, em regra, prazo de três dias úteis, ressalvada norma especial. Gabarito: CERTO. O prazo
não elimina a necessidade de avaliar os critérios do regulamento e agir prontamente para mitigar risco.
Questão 8. O art. 20 da LGPD exige literalmente, em todos os casos de decisão exclusivamente automatizada,
que a revisão seja realizada por uma pessoa natural. Gabarito: ERRADO. Há direito de solicitar revisão; o
requisito textual universal de revisão por pessoa natural não integra o art. 20 vigente, embora garantias
administrativas específicas possam impor controles adicionais.

Questões adicionais da revisão aprofundada (autoria própria)
Questão 9. A adequação reconhecida pela Resolução CD/ANPD 32/2026 permite, por si só, que um ministério
repasse indistintamente a prestador europeu dados de qualquer política pública, ainda que sem finalidade
definida. Gabarito: ERRADO. A decisão de adequação resolve mecanismo de transferência internacional
abrangido pelo ato, não a existência de competência, base legal ou necessidade do tratamento. Diferenciar art.
33, I, dos arts. 6º, 7º, 11, 23 e 26. [F2; F10]
Questão 10. A hospedagem de base federal em plataforma SaaS torna a contratada controladora de todos os
tratamentos, independentemente de quem determine finalidades e meios essenciais. Gabarito: ERRADO. A
função real da contratada é determinante; processamento sob instruções tende a configurar operação, mas
usos comerciais autônomos exigem classificação e bases próprias. A modalidade SaaS não cria exceção à LGPD.
[F2, arts. 5º, VI–VII, 39]
Questão 11. Na contratação de software e nuvem de autarquia federal integrante do SISP, o exame jurídico deve
considerar também o processo de contratação de soluções de TIC regido pela IN SGD/ME 94/2022 e o modelo
previsto na Portaria SGD/MGI 5.950/2023, conforme âmbito de incidência. Gabarito: CERTO. São normas de
governança de compra pública e planejamento; não substituem regras de tratamento de dados nem se aplicam
uniformemente a todo município e toda entidade estatal. [F11; F12]
Questão 12. Em incidente que possa afetar significativamente interesses e direitos fundamentais e envolva
dados de saúde de beneficiários, a ausência de indisponibilidade do sistema basta para afastar a análise de
comunicação à ANPD. Gabarito: ERRADO. Confidencialidade, integridade e demais riscos importam. A
Resolução 15/2024 exige análise de comunicabilidade; o prazo geral aplicável conta do conhecimento de
afetação de dados pessoais pelo controlador. [F14, arts. 4º–9º]
Questão 13. O art. 38 obriga todos os órgãos públicos a publicar integralmente, na internet, RIPD para cada
operação isolada de tratamento, sem hipótese de sigilo. Gabarito: ERRADO. A ANPD pode determinar RIPD; os
arts. 32 e 38 e as orientações oficiais exigem análise de circunstâncias e salvaguardas, inclusive versões públicas
diferentes quando houver informações legalmente protegidas. Não confundir documento de risco interno com
publicação indiscriminada. [F2; F13]
Questão 14. Conforme art. 31 da LAI, qualquer dado pessoal mantido pelo Estado se torna automaticamente
informação classificada como sigilosa durante cem anos, inclusive critérios de seleção e gastos de política
pública. Gabarito: ERRADO. A regra protege informações pessoais relativas à intimidade, honra e imagem e
comporta acesso e exceções legalmente previstas. A classificação de sigilo administrativo é instituto distinto.
Critérios e uso de recursos exigem análise autônoma de transparência. [F4]
Questão 15. O STJ, no AREsp 2.130.619/SP (Segunda Turma, 2023), afastou dano moral presumido por
vazamento dos dados não sensíveis do caso; disso não decorre que qualquer vazamento envolvendo dado
sensível em órgão público seja juridicamente irrelevante ou que toda indenização seja automática. Gabarito:
CERTO. Precedente individual tem objeto e pressupostos delimitados; danos, nexo e regime de responsabilidade
dependem do caso concreto. [J3]
Questão 16. A participação formal de servidor que apenas aperta “aprovar” sobre pontuação produzida por IA
afasta necessariamente o dever de analisar motivação, direito de revisão e discriminação, pois a decisão deixa


                                                                                      LIVRO-DIG-001 • 20/11/2026 • 19
<!-- AGU_EDITOR_SECTION_END:19 -->

<!-- AGU_EDITOR_SECTION_START:20 -->
de ser automatizada. Gabarito: ERRADO. A incidência literal do art. 20 requer investigação do caráter
exclusivamente automatizado, mas demais garantias de motivação, qualidade, finalidade, contraditório e
processo administrativo permanecem aplicáveis à decisão efetiva. [F2, arts. 6º e 20; F5]


15 Síntese para lembrar sem decorar slogans
O Estado precisa de dados para agir, mas o direito fundamental à proteção de dados regula como exerce essa
capacidade. O teste decisivo reúne competência, base legal, finalidade, adequação, minimização, transparência,
proteção e prestação de contas. Consentimento não é regra universal para o setor público. O compartilhamento
entre órgãos é possível sob controles; para particulares há barreiras e exceções expressas, além de
formalidades. LAI e LGPD coexistem. Algoritmos não afastam devido processo. Segurança é obrigação de
desenho institucional, e sanções da ANPD variam conforme o regime legal do infrator.

Roteiro de revisão em quatro camadas
Camada jurídica: identificar titular, controlador, operador, categoria de dado, competência administrativa e
hipótese legal pertinente; art. 7º não substitui art. 11 para sensíveis. Camada institucional: verificar art. 23,
publicidade dos tratamentos, finalidade do compartilhamento, exceções e informação à autoridade quando
exigíveis; LAI e LGPD devem dialogar. Camada tecnológica: verificar modelo de contratação, suboperadores,
treinamentos de IA, transferências, segurança desde a concepção e governança dos incidentes. Camada de
controle: distinguir poder da ANPD, reparação e sanções aplicáveis ao setor público; documentar decisões e
salvaguardas.
Quatro alertas de prova organizam as principais contraprovas. O Estado não precisa sempre de consentimento;
ter base legal não libera todos os campos. O compartilhamento entre órgãos é juridicamente possível; possuir
convênio não prova necessidade. A decisão automatizada pode ser revisável; a lei não contém exigência textual
universal de revisão por pessoa natural. A adequação de transferência internacional pode dispensar
mecanismo adicional de transferência; não dispensa as obrigações de tratamento em território brasileiro. A
defesa correta depende de evitar a absolutização de qualquer uma dessas proposições.
Para uma revisão escrita de vinte minutos, escolha um dos dois casos e produza três parágrafos: competência e
base legal; contra-argumento técnico; conclusão com controles e responsabilidade de execução. Esse exercício
só se tornará evidência de aprendizado quando houver resposta efetiva do estudante e confronto com os
critérios desta edição; a leitura, isoladamente, não autoriza registrar domínio.

Recuperação ativa
1. Qual é a diferença entre direito fundamental à proteção de dados e dever de manter segredo?
2. Quais três testes cumulativos você aplicaria antes de autorizar cruzamento cadastral?
3. Por que consentimento costuma ser base problemática para o cumprimento de obrigações públicas?
4. Como muda a análise quando a base contém dado de saúde e não apenas renda?
5. Qual a diferença jurídica entre compartilhar dados entre órgãos e transferi-los à contratada?
6. Em quais condições a publicidade pode ser parcial diante de pedido pela LAI?
7. O que exige o art. 20 e o que ele não exige literalmente?
8. Por que multas dos incisos II e III do art. 52 não devem ser automaticamente imputadas a órgão público?
9. Por que a decisão de adequação de um destino estrangeiro não autoriza, sozinha, todo tratamento nacional?
10. Quais cláusulas contratuais mínimas você exigiria de SaaS utilizado para política pública com dados
sensíveis?


                                                                                     LIVRO-DIG-001 • 20/11/2026 • 20
<!-- AGU_EDITOR_SECTION_END:20 -->

<!-- AGU_EDITOR_SECTION_START:21 -->
11. Qual é o marco inicial do prazo de três dias úteis no regulamento de comunicação de incidentes?
12. Em que difere o direito de revisão do art. 20 de uma garantia administrativa de motivação?

Respostas de conferência
1. Proteção governa o tratamento de dados identificáveis mesmo sem segredo; sigilo é apenas uma das técnicas
e restrições possíveis.
2. Verificar competência e atribuição, hipótese legal apropriada para o tipo de dado e proporcionalidade
operacional com os princípios do art. 6º.
3. A relação de poder pode inviabilizar vontade verdadeiramente livre e o tratamento necessário pode fundar-
se em dever legal ou política pública.
4. Dados sensíveis acionam art. 11 e salvaguardas reforçadas, não o transplante automático de art. 7º.
5. Entre órgãos, art. 26 e STF exigem justificativa específica; para particulares, aplicam-se ainda exceções do art.
26, §1º, e disciplina do art. 27.
6. Distinguir dados da atividade estatal de informações pessoais de terceiros, motivar restrições e entregar
parte ostensiva ou versão agregada/tarjada quando cabível.
7. Permite solicitar revisão de decisão exclusivamente automatizada que afete interesses; não contém obrigação
textual universal de revisão por ser humano.
8. O §3º do art. 52 tem rol próprio para órgãos e entidades públicas, sem os incisos de multa simples e diária.
9. Porque art. 33 define mecanismo jurídico da transferência; competência, base legal, finalidade, minimização
e regras do poder público permanecem em vigor.
10. Objeto e instruções, papéis, finalidade, restrição de reuso, suboperadores, segurança auditável, informação
rápida de incidentes, transferência internacional, reversibilidade e retenção legalmente compatível.
11. Do conhecimento pelo controlador de que o incidente afetou dados pessoais; avalia-se risco ou dano
relevante e a incidência de eventual prazo legal especial.
12. O art. 20 cuida da decisão exclusivamente automatizada que afeta interesses e prevê revisão e explicação;
motivação, contraditório e legalidade administrativa podem exigir garantias adicionais mesmo com
participação humana.
Transferência a caso novo, ainda não realizada por Tawan. Redigir uma nota jurídica de 20–40 linhas
sobre um município que pretende divulgar microdados de saúde em portal aberto, justificando tratamento,
publicidade parcial, controles, objeção da transparência e providências. A leitura deste capítulo não comprova
domínio; a nota deve ser produzida e discutida no Modo Aula ou Revisão.


16 Fontes, rastreabilidade e atualização diferencial
Proveniência curricular. O item do edital AGU nº 1/2022 é a segunda ocorrência do nº 64 de Direito
Administrativo, intitulada literalmente “Lei Geral de Proteção de Dados”, identificada na matriz histórica como
ADM-64b; LIVRO-DIG-001 é identificador editorial, não um novo item certificado. No repositório privado
Talksxb/agu-auditoria,        a     main       foi     verificada     em       20/11/2026       no       commit
c3ac7dd7a27099200d4f665a8b7cff2f90659ee9           (de   18/11/2026).   Foram       efetivamente    consultados
docs/PROTOCOLO.md, checkpoints/estado.json e evidencias/normativa/NORM-ADM-022.json: a última
integração AUD03 explicitada no estado é AUD03-040, sem certificação integral; o lote NORM-ADM-022
confirma correspondências pontuais e mantém lacunas normativas e jurisprudenciais. A cadeia histórica tem
data de corte 04/11/2026; as novas fontes desta edição foram confrontadas em 20/11/2026, sem alterar
checkpoints ou certificar o item curricular.

                                                                                       LIVRO-DIG-001 • 20/11/2026 • 21
<!-- AGU_EDITOR_SECTION_END:21 -->

<!-- AGU_EDITOR_SECTION_START:22 -->
Aprendizagem. Não foi apresentado um Caderno individual de Direito Digital que permitisse atribuir conceitos
demonstrados ou desempenho. A leitura e o aumento da apostila não constituem domínio; não houve teste do
estudante, emissão de Caderno, revisão agendada ou sincronização com AGU Quiz.
Fontes oficiais e de orientação utilizadas nesta edição: conferências novas em 20/11/2026, somadas às
verificações registradas na v1 (19/11/2026). Cada referência tem alcance pontual, salvo declaração expressa em
contrário.
 • [F1] Constituição Federal e EC 115/2022, art. 5º, LXXIX; art. 21, XXVI; art. 22, XXX. Texto consolidado:
   Abrir fonte oficial . Confirmação pontual.
 • [F2] Lei 13.709/2018 consolidada, arts. 1º–11; 14; 16–20; 23–27; 31–33; 38–43; 46–52; 55-A. Câmara dos
   Deputados: Abrir fonte oficial . Confirmação pontual dos dispositivos decisivos, sem reconstituição
   exaustiva de cada inciso e alteração histórica.
 • [F3] Guia orientativo da ANPD, “Tratamento de dados pessoais pelo Poder Público”, versão 2.0, junho de
   2023, disponível na página da Agência: Abrir fonte oficial . Orientação institucional verificada, não lei
   nem precedente vinculante.
 • [F4] Lei 12.527/2011 consolidada, especialmente art. 31 e regras de acesso: Abrir fonte oficial .
   Confirmação pontual; mudanças setoriais e todas as exceções do art. 31 não foram esgotadas.
 • [F5] Lei 9.784/1999, aplicação procedimental no âmbito federal: Abrir fonte oficial . Referência de
   conexão, sem auditoria artigo por artigo no capítulo.
 • [F6] Resolução CD/ANPD 18/2024, encarregado: Abrir fonte oficial . Status vigente confirmado no
   índice normativo; requisitos pontuais conferidos com fonte institucional, não análise completa dos
   deveres em todos os arranjos.
 • [F7] Resolução CD/ANPD 15/2024, comunicação de incidente; texto oficial reproduzido pelo MJSP: Abrir
   fonte oficial . Canal operacional ANPD: Abrir fonte oficial . Confirmação pontual de critérios e prazo, com
   necessidade de avaliar cada caso.
 • [F8] Lei 15.352/2026, alteração do art. 55-A, ANPD e transições: Abrir fonte oficial . Confirmação pontual
   de natureza e vigência legal; atos de implementação institucional posteriores não exauridos.
 • [F9] Resolução CD/ANPD 19/2024, transferências internacionais: Abrir fonte oficial . Confirmação
   pontual do objeto e vigência; não auditoria integral das cláusulas e da retificação de 2025.
 • [F10] Resolução CD/ANPD 32/2026, decisão de adequação para União Europeia e âmbito descrito: Abrir
   fonte oficial . Confirmação pontual; não extrapolar reconhecimento para qualquer território ou operação.
 • [J1] STF, ADI 6649 e ADPF 695, Plenário, 15/09/2022, interpretação conforme do Decreto 10.046/2019.
   Informativo 1068: Abrir fonte oficial ; tramitação da ADI: Abrir fonte oficial . Tese e parâmetros
   confirmados pontualmente; execução e decisões posteriores não exauridas.
 • [J2] STF, ADI 6387 MC-Ref e conexas, Plenário, maio de 2020, suspensão da MP 954/2020; comunicação
   institucional: Abrir fonte oficial . Objeto e resultado cautelar confirmados pontualmente; não se
   atribui julgamento definitivo sobre todos os usos estatísticos de dados.
Lacunas impeditivas de certificação integral. (1) Inventário de todas as retificações editalícias para
ADM-64b; (2) exaustão de alterações e regulamentos incidentes até a data do corte; (3) cotejo integral de
precedentes e decisões setoriais STF/STJ/ANPD; (4) questões históricas com origem, gabarito definitivo e
atualização; (5) reconciliação independente das camadas A, B e C, conforme docs/PROTOCOLO.md. Nenhuma
dessas lacunas impede o uso do presente capítulo delimitado, mas impede afirmar cobertura ou auditoria
integral da LGPD.
Trilha de atualização: alteração nos arts. 4º–11 atinge §§ 2–3 e questões 1–4; arts. 18–27 atinge §§ 5–7, caso e
questões 2–4/8; arts. 46–52 e Resolução 15 atinge §§ 8–9 e questões 6–7; art. 55-A e Lei 15.352 atinge § 9 e
questão 5; Resoluções 19/32 atinge § 10; alterações em jurisprudência ADI 6649/ADPF 695 atingem §§ 5, 11 e 13.
Atualização futura deve ser diferencial e conferida, não presumida automática.

                                                                                    LIVRO-DIG-001 • 20/11/2026 • 22
<!-- AGU_EDITOR_SECTION_END:22 -->

<!-- AGU_EDITOR_SECTION_START:23 -->
16.1 Atualização normativa em 20/11/2026: comprovado, parcial e pendente
CONFERIDO PONTUALMENTE NESTA EDIÇÃO: LGPD consolidada na Câmara, arts. 4º–11, 20, 23–27, 33–39, 42–
48, 52 e 55-A; LAI art. 31; Lei 15.352/2026 e estrutura jurídica da ANPD; Resolução CD/ANPD 15/2024 sobre
comunicabilidade, cronologia e registro de incidentes; Resolução 19/2024 no núcleo de mecanismos de
transferência; Resolução 32/2026 e adequação europeia; IN SGD/ME 94/2022 e modelo de software/nuvem
Portaria SGD/MGI 5.950/2023 quanto a objeto e abrangência; STF ADI 6649/ADPF 695 e ADI 6387 em seus
objetos; STJ AREsp 2.130.619/SP quanto ao vazamento do caso. Consulta das fontes oficiais em 20/11/2026.
PARCIAL: atos modificadores e atualizações infralegais de software/nuvem, anexos técnicos e termo de
referência em todas suas versões; condições de aplicação de cada mecanismo da Resolução 19 e retificação de
2025; fluxos específicos de comunicação à ANPD à luz dos arts. 26 e 27; todos os incidentes processuais e efeitos
posteriores dos precedentes; regimes especiais de dados de saúde e serviços infantis além das conexões
destacadas. O texto explica soluções gerais sem afirmar certificação exaustiva desses pormenores.
PENDENTE PARA AUDITORIA INTEGRAL: cotejo de todo edital e todas retificações da rubrica ADM-64b,
revisão artigo a artigo de alterações e transições relevantes, inventário sistemático STF/STJ/ANPD, histórico
oficial de questões e gabaritos, confronto independente das camadas A/B/C e checkpoint de certificação. A data
de 04/11/2026 permanece o corte do projeto de auditoria; esta atualização editorial até 20/11/2026 não
modifica nem antecipa o resultado formal da AUD03.

16.2 Referências oficiais acrescidas na v2
[F11] Governo Digital, IN SGD/ME 94/2022, processo de contratação de TIC no SISP — acesso em 20/11/2026,
norma geral de procedimentos da esfera própria. https://www.gov.br/governodigital/pt-br/contratacoes-de-
tic/legislacao/processo-de-contratacao-de-solucoes-de-tic-regido-pela-lei-ndeg-14-133-de-2021
[F12] Governo Digital, Portaria SGD/MGI 5.950/2023, modelo vigente de contratação de software e serviços de
nuvem (índice oficial atualizado em novembro de 2026) — confirmação pontual do âmbito e do objeto; anexos
não      exauridos.      https://www.gov.br/governodigital/pt-br/contratacoes-de-tic/legislacao/modelo-de-
contratacao-de-software-e-servicos-em-nuvem/vigentes
[F13] ANPD, perguntas e respostas sobre RIPD, arts. 38 e 32 — orientação institucional, não fonte de nova
obrigação legal geral. https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/relatorio-
de-impacto-a-protecao-de-dados-pessoais-ripd
[F14] Resolução CD/ANPD 15/2024, Regulamento de Comunicação de Incidente de Segurança, arts. 4º–10, texto
oficial em HTML da Biblioteca Digital do MJSP — verificação direta pontual em 20/11/2026.
https://bibliotecadigital.mj.gov.br/bitstream/1/12879/2/RES_ANPD_2024_15.html
[F15 / J3] STJ, AREsp 2.130.619/SP, relator ministro Francisco Falcão, Segunda Turma, 07/03/2023, DJe
10/03/2023, Informativo 766: vazamento de dados comuns e prova de dano; alcance individual.
https://processo.stj.jus.br/jurisprudencia/externo/informativo/?
acao=pesquisar&aplicacao=informativo&livre=%40cnot%3D019794
[F16] ANPD, página institucional sobre transferência internacional de dados, mecanismos da Resolução
19/2024 e reconhecimento da União Europeia pela Resolução 32/2026 — orientação atualizada, atos
identificados                                                                            pontualmente.
https://www.gov.br/anpd/pt-br/assuntos/assuntos-internacionais/transferencia-internacional-de-dados
[F17] Lei 15.211/2025 (ECA Digital), Decreto 12.880/2026 e página institucional da ANPD; conexão setorial
limitada aos dados de crianças e adolescentes. https://www.gov.br/anpd/pt-br/assuntos/eca-digital ;
https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15211.htm
[F18] Lei 14.133/2021, contratação pública e fiscalização; referência geral, sem reconstrução de todo
procedimento e de alterações. https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm



                                                                                     LIVRO-DIG-001 • 20/11/2026 • 23
<!-- AGU_EDITOR_SECTION_END:23 -->

<!-- AGU_EDITOR_SECTION_START:24 -->
[J1] STF, ADI 6649/DF e ADPF 695/DF, Plenário, 15/09/2022; resumo oficial e parâmetros do julgamento, sem
certificação de todos os incidentes posteriores. https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?
idConteudo=494227
[J2] STF, ADI 6387/DF MC-Ref e ações conexas, cautelar referendada em 2020; ficha oficial, objeto delimitado.
https://portal.stf.jus.br/processos/detalhe.asp?incidente=5895165
[F1–F10] Permanecem as fontes indicadas na edição 1.0; nesta v2, o quadro de normas acima atualiza seu
alcance temporal. O guia da ANPD e demais materiais institucionais são orientação interpretativa e
operacional, não substitutos de legislação ou de precedentes.

16.3 Registro editorial de alterações em relação à v1
Mantidas todas as dezesseis seções estruturantes e os oito itens autorais da v1. Ampliados fundamentos
constitucionais e bases legais (§§ 1–3); regime público, compartilhamento e LAI (§§ 4–6); IA e decisões
automatizadas (§ 7); RIPD e incidentes (§ 8); ANPD e responsabilidades (§ 9); contratação SaaS, nuvem,
portarias e transferências (§ 10); cotejo de precedentes STF/STJ (§ 11); comparações e dois casos AGU
resolvidos (§§ 12–13); oito questões novas, síntese e recuperação (§§ 14–15). Nenhuma questão foi apresentada
como oficial sem caderno e gabarito. Não há publicação no repositório de auditoria, alteração de checkpoint
nem pretensão de domínio do estudante.




                                                                                  LIVRO-DIG-001 • 20/11/2026 • 24
<!-- AGU_EDITOR_SECTION_END:24 -->
