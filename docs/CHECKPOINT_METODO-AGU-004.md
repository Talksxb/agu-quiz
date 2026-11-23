# Checkpoint — MÉTODO-AGU-004

23/11/2026, America/Sao_Paulo. Revisão e publicação do backup do percurso. A solicitação de executar 004 autoriza integrar exclusivamente a PR #79 e conferir sua publicação, condicionada aos checks. Nenhuma outra PR, obra ou aprovação de cartão integra este lote.

## Retomada reconfirmada

- Main: `d41442201e449f437babc80ec240dac281d7404e`.
- [PR #79](https://github.com/Talksxb/agu-quiz/pull/79): aberta/draft, mergeable, sem comentários, revisões ou threads pendentes na consulta inicial.
- Branch: `feat/metodo-agu-003-backup`; HEAD inicial `e1c0013a9222930747379c6b92bac2efdff52d8d`, árvore `b0b693ed649a999e91d6df991282b3c63066d70e`.
- [CI 45183942641](https://github.com/Talksxb/agu-quiz/actions/runs/45183942641): sucesso no HEAD inicial; evidência aproveitada como baseline, sem repetir indiscriminadamente testes locais.
- Lidos prompt 004, fechamento da PR, checkpoints 003 e antecedentes pertinentes, contrato de backup, prompt 003, guia S21 e alterações efetivas. Governança: quatro documentos pedagógicos finais e padrão editorial público. Auditoria privada não necessária, não consultada ou modificada nesta etapa.

## Defeito demonstrado e correção de revisão

A prévia validava a cópia importada e o percurso atual separadamente, mas o conjunto combinado era conferido somente por tamanho em bytes. A união podia ultrapassar 2.000 capítulos ou o orçamento de 200.000 nós, deixando uma categoria que o próprio leitor/exportador rejeitaria.

O teste novo falhou no HEAD inicial com `Missing expected exception`. Fixtures independentes cobrem: 2.000 registros mais um ID ausente; e duas estruturas válidas que, juntas, ultrapassam o orçamento de nós. A correção reutiliza `validateRecord` sobre o conjunto **antes de qualquer escrita**. Não há duplicação do validador nem alteração dos nove contratos históricos.

A suíte Node passa a ter 20 cenários. O navegador testa a recusa do limite, confirmação desabilitada e bytes preservados nas quatro larguras, em contextos artificiais; mantém as jornadas anteriores, quota e UTF-8. A prévia limpa o resumo anterior quando o conjunto é rejeitado. O delta de backup foi atualizado explicitamente, mantendo o baseline histórico imutável. Essa correção exige nova CI do HEAD final antes da integração.

Arquivos desta revisão: `backup-local-s20.js`, `tests/metodo-agu-003-validacao.cjs`, `tests/metodo-agu-003-browser.cjs`, `tests/fixtures/metodo-agu/backup-engine-delta.json`, `docs/METODO_AGU_003_BACKUP.md`, este checkpoint e `docs/PROMPT_METODO-AGU-005.md`.

## Fechamento operacional

Este arquivo é versionado antes da integração; não apresenta merge/deploy futuros como realizados. Na **descrição da [PR #79](https://github.com/Talksxb/agu-quiz/pull/79)**, em “MÉTODO-AGU-004 — publicação verificada”, serão registrados HEAD/árvore finais, CI antes do merge, SHA integrado, deploy nativo, hashes dos arquivos servidos, jornadas públicas e artefatos. A publicação só estará confirmada com deploy do commit correto e teste da edição efetivamente servida, não com o merge isolado.

O mecanismo existente é o deploy nativo do GitHub Pages em main; o job `pages-publicado` verifica HTTP/hash e Chromium na URL pública. Ensaios de restauração usam somente contextos novos e dados sintéticos; não operam perfil ou arquivo pessoal.

## Limites e próxima execução

Web Storage continua sem trava/transação entre abas. Conflitos do mesmo capítulo conservam o registro local, sem combinar rascunhos. Clientes antigos podem rejeitar a categoria opcional nova. Android físico/TalkBack e backup pessoal não testados. Leitura/atividade não se tornam desempenho ou domínio.

O manifesto Ambiental foi reconfirmado: nove posições, somente AMB-03 publicado; AMB-04 e AMB-05 registrados como produzidos, revisão pendente e não publicados. Não se presume que materiais de outros chats ou arquivos estejam sincronizados. Essa lacuna concreta fundamenta o [prompt completo MÉTODO-AGU-005](PROMPT_METODO-AGU-005.md): triagem e ingestão controlada de até um capítulo adicional, somente em nova execução solicitada. Não executado em 004.
