# Checkpoint — MÉTODO-AGU-002

Execução iniciada em 22/11/2026, America/Sao_Paulo. Repositório público `Talksxb/agu-quiz`. A solicitação de executar a etapa 002 autoriza revisar, integrar a PR #78 e conferir a publicação pelo mecanismo existente do GitHub Pages, condicionada ao sucesso dos testes. Não autoriza novas obras, aprovação de candidatos ou publicação no GPT Sites.

## Estado de partida reconfirmado

- Main: `423c54c7def0f4bdf6fb65b74f6fc67e947f8da2`, sem avanço concorrente na consulta inicial.
- [PR #78](https://github.com/Talksxb/agu-quiz/pull/78): aberta, draft, sem conflitos, comentários, revisões ou threads pendentes. Branch `feat/metodo-agu-001`, HEAD `f72893846d0d4e05c7eb7c826cff88b6eefc1b15`, árvore `22dba5c0da392783a481968074978352aa66f953`.
- [CI 45096598334](https://github.com/Talksxb/agu-quiz/actions/runs/45096598334): sucesso no HEAD de partida. Integridade Node, exportação e regressões Chromium aprovadas; produção omitida porque era uma PR.
- Publicação anterior: workflow nativo `pages build and deployment`, evento `dynamic`, em `main`, [execução 44959208026](https://github.com/Talksxb/agu-quiz/actions/runs/44959208026), concluída com sucesso para a main acima. O job `pages-publicado` do workflow do projeto confere a publicação; ele não faz o deploy.
- A URL pública respondeu HTTP 200, ainda com a edição anterior à integração. Isso é distinto de a branch estar pronta.

## Revisão e ajuste da etapa

Governança final, padrão editorial público, diagnóstico, contrato, checkpoint 001 e alterações da navegação/leitor/adaptador foram consultados. Mantêm-se os quatro leitores, 78 blocos, 51 cartões históricos, motor de agendamento e armazenamento. Não há mudança de conteúdo jurídico, importação de arquivos privados, aprovação de candidatos ou criação de dados reais do estudante.

A revisão encontrou uma lacuna de verificação: a nova jornada de quatro larguras existia na CI da PR, mas ainda não era executada contra a URL publicada. Este lote acrescenta ao job público:

1. `tests/metodo-agu-002-pages.cjs`: cotejo SHA-256 de Home, leitor, laboratório, integração, motor, dados aprovados, catálogo, coleção, quatro leitores/índices/fontes e recursos visuais. Aguarda propagação com tentativas limitadas; uma versão divergente nunca produz sucesso.
2. Execução da mesma jornada `tests/metodo-agu-001-browser.cjs` contra o Pages em 320, 390, 768 e 1280 px, com contextos independentes e dados sintéticos.
3. Retenção do relatório HTTP e dos resultados/capturas do Método no artefato `agu-work01-publicado`.

Arquivos novos/alterados nesta etapa: este checkpoint, o prompt 003, o verificador HTTP e `.github/workflows/agu-sprint20-ci.yml`. A mudança do workflow exige nova CI sobre o HEAD final antes da integração; a evidência anterior continua histórica.

## Registro operacional final

Este arquivo é versionado antes da integração, portanto não apresenta merge ou deploy futuros como concluídos. O fechamento com HEAD aprovado, SHA de merge, execuções da CI/deploy, hashes servidos, resultados dos quatro viewports e eventuais lacunas será registrado na **descrição da [PR #78](https://github.com/Talksxb/agu-quiz/pull/78)**, em “MÉTODO-AGU-002 — publicação verificada”. Os artefatos do job público complementam esse registro sem criar uma segunda PR apenas para atualizar o estado da primeira.

Critério de conclusão: PR integrada após checks verdes, deploy nativo concluído e conteúdo efetivamente servido igual ao checkout integrado. Merge isolado não satisfaz esse critério. Caso algum requisito falhe, registrar a falha e corrigir dentro do escopo antes de declarar publicação verificada.

## Lacunas preservadas

Simulação Chromium/axe não é Android físico nem TalkBack. Manter os inconclusivos de contraste, sem tratá-los como conformidade integral. A etapa não reconfirma juridicamente todos os capítulos. Recursos perdidos nas antigas extrações de PDF não são reconstruídos. Os candidatos continuam pendentes; histórico e agendas não são reescritos. O backup S20 ainda não inclui o progresso dos livros: é o problema concreto proposto para a próxima PR.

Próxima execução: [MÉTODO-AGU-003](PROMPT_METODO-AGU-003.md), somente quando solicitada. Não executada neste lote.
