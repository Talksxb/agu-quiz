# AGU QUIZ | WORK — SIMULADOS-AGU-004

## Missão única

Executar exclusivamente **SIMULADOS-AGU-004**, sob pedido expresso e em nova execução. Retomar a amostra pública rastreada em 003 e tentar desbloquear, **no máximo uma adaptação autoral** a partir do item histórico AGU/Cebraspe 2023 nº 45, somente se houver fundamento integral em capítulo público e revisão de fontes oficiais. A meta não é contagem: **zero integração é resultado válido** se a evidência for insuficiente. Criar branch própria e PR draft com CI; **não mesclar nem publicar**.

## Retomada e controles

1. Reconfirmar `main`, publicação e todas as PRs/CI atuais; ler integralmente `docs/PROMPT_SIMULADOS-AGU-003.md`, `docs/CHECKPOINT_SIMULADOS-AGU-003.md` e `livros/candidatos/simulados-agu-003.json`. Na abertura de 003, main era `4b311dfdf44c3182e67c50c3f31133b8efc497b0`; isso não dispensa reconfirmar HEAD real. Não incorporar PR concorrente sem necessidade.
2. Aplicar Base Mestra v5.2 FINAL, Padrão Leitura Completa v1.1 FINAL, Caderno e Handoff v2.1 FINAL e Leia-me Primeiro v2 FINAL, com fontes primárias e edital verificados. Caderno pessoal somente se houver retomada real de aprendizagem. Prova, leitura, CI e navegação nunca demonstram domínio.
3. Confirmar os 24 itens autorais edição 1.1 e 51 cartões preservados, compilador/aprovações, contrato editorial, banco e snapshots de sessões. Nunca copiar conteúdos privados do `agu-auditoria`. Os dados públicos de 2015 no Leitor já possuem quatro paráfrases distintas.

## Verificação da questão 45

- Abrir o [caderno original AGU/2023, caderno 804_AGU_ADVOGADO_001_01](https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/804_AGU_ADVOGADO_001_01.PDF), p. 9, item 45, e o [gabarito definitivo correspondente](https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/GAB_DEFINITIVO_804_AGU_ADVOGADO_001_01.PDF), p. 1 (resposta B, sem anulação); registrar a consulta atual, cargo, ano, tipo, fase e localizador.
- Conferir [LC 140/2011](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp140.htm), art. 8º, XVI, **b**, ressalva ao art. 7º, XV, e distinguir competência de autorização de supressão decorrente de licenciamento (art. 13, § 2º). Verificar alterações supervenientes e exceções pertinentes em fontes primárias, sem inferir invariância por memória. Registrar prova histórica e norma atual em campos separados.
- Confrontar literalmente a seção pública `amb-03-s06` do capítulo `amb-03`, edição/hash atuais. A edição 1.0 de 003 **não** expõe expressamente a hipótese de imóveis rurais; referenciar a seção somente após ela realmente sustentar a explicação. Se precisar alterar a prosa, não improvisar patch: encaminhar alteração pelo fluxo editorial de capítulo, com revisão e edição/hash próprios, respeitando o escopo e sem publicar capítulo sem autorização específica.
- Se e somente se a fundamentação for suficiente, redigir **uma adaptação autoral atual** de cinco alternativas, com problema concreto de atuação na AGU, comando inequívoco, um gabarito, quatro distratores jurídicos plausíveis, comentários específicos, fundamentação, referência à seção e cartão de regra + limite. Não chamar a adaptação de questão oficial nem substituir resposta B histórica.
- Conferir potencial duplicação semântica com as 24 questões do simulado (sobretudo `sim-amb-04`), 51 cartões e candidatos editoriais. Tratar original, paráfrase e adaptação como identidades diferentes. Só aprovar após revisão explícita e hash correto. Não gerar ratings, agenda ou novos tempos de estudo.

## Testes, bloqueios e entrega

Executar o compilador `node scripts/gerar-simulados.cjs --check`, validadores do simulado, do pipeline editorial e regressões relevantes. Se houver nova unidade aprovada, validar seleção, gabarito oculto antes da correção, feedback, vínculo ao capítulo/seção, invalidação por mudança da fonte ou do hash, preservação das 24 questões e snapshots antigos, exportação/importação e deduplicação. Testar Chromium/axe nas quatro larguras e examinar relatório `incomplete`; não alegar Android/TalkBack físico.

Entregar PR draft, branch, HEAD, CI e limites; matriz revisada da questão 45 com URLs, dispositivos, data, versão e situação; número real de itens/card candidatos integrados; checkpoint e **prompt integral autossuficiente para SIMULADOS-AGU-005** a partir da lacuna real. Se o capítulo permanecer insuficiente, PR apenas documental e candidato pendente. Não executar 005, não mesclar, não publicar.
