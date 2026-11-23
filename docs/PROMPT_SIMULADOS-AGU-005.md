# AGU QUIZ | WORK — SIMULADOS-AGU-005

## Missão única e portão de segurança

Executar exclusivamente **SIMULADOS-AGU-005** em nova sessão com pedido expresso. Desbloquear o vínculo editorial da questão histórica AGU/2023 nº 45 mediante **complemento pontual, original e juridicamente cotejado da seção `amb-03-s06`**, seguindo o pipeline do Método AGU. Só então avaliar **uma** adaptação autoral atual de cinco alternativas e um candidato de cartão, separadamente, com revisão/hashes reais. **Não mesclar nem publicar** nesta sprint; branch própria e PR draft. Zero questão integrada é resultado correto se qualquer requisito falhar.

### 1. Retomada não negociável

1. Verificar `main`/HEAD atual, CI, Pages e PRs concorrentes; em 004, `main` estava em `4b311dfdf44c3182e67c50c3f31133b8efc497b0`, enquanto SIMULADOS-AGU-003/PR #87 estava aberta em draft com CI bem-sucedida `45287191370`. Reconfirmar o estado e checar a própria PR de 004; não mesclar PRs de conveniência nem confundir a branch de 003 com `main`.
2. Ler integralmente `docs/PROMPT_SIMULADOS-AGU-004.md` na PR #87, `docs/CHECKPOINT_SIMULADOS-AGU-004.md`, `docs/PROPOSTA_EDITORIAL_AMB-03_Q45.md` e os artefatos editoriais atuais do capítulo: `docs/METODO_AGU_001_INGESTAO.md`, `livros/fontes/amb-03.md`, `livros/editorial/amb-03.json`, `livros/metodo/amb-03.json`, catálogo, compilador, histórico, dependências e aprovações. Não confiar em hash citado sem confirmar versão atual.
3. Aplicar Base Mestra AGU v5.2 FINAL, Padrão Leitura Completa v1.1 FINAL, Caderno e Handoff v2.1 FINAL e Leia-me Primeiro v2 FINAL. Não importar nada de `Talksxb/agu-auditoria`, suas matrizes, evidências ou transcrições; este repositório é público. Não atribuir estudo, compreensão, domínio, agenda ou horas ao usuário.

### 2. Fontes e critério curricular

- Edital nº 1 AGU de 26/12/2022, caderno oficial de Advogado da União, Direito Ambiental item 3: **“Repartição de competências em matéria ambiental. Normas de cooperação.”**, ID interno `AMB-03`. Consultar edital oficial de novo: https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/ED_1_2022_AGU_ADVOGADO_ABERTURA.PDF.
- Prova original Cebraspe 30/04/2023, P1 Grupo I, caderno `804_AGU_ADVOGADO_001_01`, questão 45: https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/804_AGU_ADVOGADO_001_01.PDF, p. 9. Gabarito **definitivo** do mesmo caderno: https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/GAB_DEFINITIVO_804_AGU_ADVOGADO_001_01.PDF, p. 1, Q45 = B, sem anulação. Registar consultas, marco **histórico de 2023**, e não substituir B por resposta atual de item diferente.
- Texto oficial atual da LC 140/2011: https://www2.camara.leg.br/legin/fed/leicom/2011/leicomplementar-140-8-dezembro-2011-611919-normaatualizada-pl.html e https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp140.htm. Dispositivos nucleares: art. 8º, XVI, b (imóveis rurais); art. 7º, XV, a–b (ressalvas da União); arts. 9º, XV, 10, 11, 12, 13, § 2º, e 19 (regras correlatas/limites).
- Verificar como normas de 2025/2026 (incluindo Lei 15.190/2025, arts. 50–51: https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15190.htm) e regimes especiais por bioma/proteção, quando aplicáveis, afetam caso futuro. Não inventar revogação da LC nem certificação global; conferir a redação aplicável na data da produção.

### 3. Correção editorial em procedimento próprio

O bloqueio de 004 é **específico**: capítulo `amb-03`, edição 1.0, seção `amb-03-s06` (SHA histórico `35ac1ffcaf4212c6a194fe27d833b606394295414125fec49cd2b17e7b9341dc`) explicava licenciamento residual estadual e art. 13, § 2º, mas não ensinava expressamente art. 8º, XVI, b, e a ressalva do art. 7º, XV. **Não** usar o hash antigo como aprovação.

- Trabalhar com prosa canônica da seção em `livros/fontes/amb-03.md`, usar a minuta de 004 apenas como **ponto de partida**. Analisar a integração aos parágrafos de competência/vegetação, preservando a estrutura e os demais capítulos; não substituir o texto completo por um resumo.
- Distinguir autorização de manejo/supressão *autônoma em imóvel rural* de supressão *decorrente de empreendimento licenciado*, e delimitar competências da União, Estados, DF e Municípios sem inventar universalidade. Enunciar condições, ressalvas, marco temporal e exemplo da AGU.
- Seguir `METODO_AGU_001_INGESTAO.md`: versionar a **edição do capítulo**, gerar índice, hashes, dependências, logs e revalidações; checar os itens previamente aprovados ligados à seção, inclusive `sim-amb-03`, `sim-amb-04`, `sim-amb-05`, `sim-amb-08`. Se a mudança retira aprovações por hash dos 24 itens existentes, **não publicar ou deixar uma regressão ativa**; revalidar formalmente cada dependente ou isolar em PR editorial sem adaptação de simulado até a aprovação adequada.
- Não afirmar revisão jurídica independente humana se não ocorreu. Documento e CI não concedem aprovação automaticamente. Se o pipeline exigir ato humano indispensável, manter rascunho com bloqueio explícito.

### 4. Questão e cartão — condicionais à edição suficiente

Somente com novo capítulo/índice **juridicamente revisados e aprovados**: produzir **no máximo uma adaptação autoral** à Q45, distinta do registro oficial e datada no recorte atual. Formulação orientada a problema concreto de assessoramento jurídico federal; uma única alternativa correta, cinco opções de dificuldade equilibrada, feedback individual, explicação por requisitos/limites e fontes; confrontar respostas históricas e atuais. Não transcrever a questão como se fosse nova nem assumir a mesma letra B. Deduplicar contra 24 itens autorais, 51 cartões antigos, candidatos editoriais e quatro paráfrases históricas de 2015 no Leitor.

Usar editor e `scripts/gerar-simulados.cjs` com **aprovação por hash para a nova questão**, assegurando IDs/semanticKeys exclusivos e mudanças suspendendo o item. Preparar eventual **candidato** ao pipeline de cartões com regra e limite; só entrar na revisão espaçada após aprovação própria. Não criar novo motor, backend, API paga, agenda, login ou sincronização. Preservar snapshots de todas as sessões antigas, chaves do backup e a edição 1.1 histórica dos 24 itens.

### 5. Testes, revisão e entrega

Rodar compiladores com `--check` (Método, Simulados), validadores Node relevantes, testes com alteração intencional de fonte/seção, invariantes de identidade, importação/exportação, compilação idempotente e preservação de questões e cartões antigos. Se houver interface alterada ou item novo ativo, verificar percurso real no Chromium 320/390/768/1280 com correção, link de seção, foco/recarga e axe; abrir o relatório e identificar *violations* e *incomplete*. Android/TalkBack físico não testados salvo evidência concreta.

Criar **PR draft** com HEAD, diff, CI, matriz de consulta de fontes (URL/dispositivo/data), edição/hash, revalidações, quantidade **real** de questões e cartões ativos, checkpoint e **prompt completo SIMULADOS-AGU-006** baseado na lacuna residual. Não mesclar, não publicar nem executar 006. Se a edição não puder ser aprovada com segurança, fechar **documentalmente com bloqueio específico**, não fabricar progresso.
