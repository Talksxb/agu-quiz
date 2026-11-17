# AGU Quiz — roadmap único de UX Estudo Integrado

Atualização: 17/11/2026. GitHub é a fonte da verdade. Aulas, diálogo socrático e correção continuam no ChatGPT. Percentuais medem entregas de desenvolvimento, validação e preparação de publicação desta frente, não domínio jurídico ou cobertura do edital. O estado operacional de integração/produção é informado separadamente.

## Acompanhamento

| Indicador | Estado no checkpoint |
| --- | --- |
| Sprint | 03/03 — refinamento móvel, persistência/acessibilidade e preparação da publicação |
| Estado | Concluída — produto e regressões aprovados; fechamento documental/ensaio adicional nos checks atuais da PR |
| Progresso total | 100% das entregas de desenvolvimento/validação/preparação; publicação operacional pendente |
| Início S03 | 2026-11-17T15:24:04.499Z — 12:24:04 em São Paulo |
| Checkpoint documental S03 | 2026-11-17T15:39:11.193877+00:00 |
| Tempo utilizado S03 | 15 min 6 s até o checkpoint; duração final na PR/encerramento |
| Tempo S01 confirmado | 34 min 24 s — 13:39:34.309Z a 14:13:59.145Z; PR #54 |
| Tempo S02 confirmado | 47 min 31 s — 14:29:21.569Z a 15:16:53.396Z; PR #57; substitui o checkpoint parcial de 38 min 38 s |
| Acumulado até o checkpoint | 97 min 1 s |
| Estimativa total atualizada | 2–3 horas, incluindo eventual integração/publicação; incerteza alta |
| Tempo restante estimado | 0 de desenvolvimento previsto; 20–60 min estimados para integração/verificação da publicação, quando autorizadas; incerteza alta |
| Próxima sprint | Nenhuma adicional planejada; continuidade operacional em ENCERRAMENTO_UX_ESTUDO_INTEGRADO.md |
| Publicação | PR #61 sobre #57 sobre #54; integração e produção pendentes. Sem merge/deploy/GPT Sites nesta tarefa |

Os tempos são duração decorrida observada desta execução, incluindo ferramentas/CI/esperas, e não um timesheet humano ou as horas de estudo do usuário. A espera posterior ao checkpoint documental é registrada na PR e no encerramento da conversa, sem novos commits sucessivos apenas para atualizar o relógio. S01 + S02 totalizam 81 min 55 s.

A faixa total foi recalibrada com as três implementações observadas e o custo real das verificações da cadeia. A previsão operacional depende de revisão, checks atuais, conflitos/propagação e autorização efetiva; não inclui construir MCP/backend ou esperar por aparelho físico.

## Critérios de progresso — 100 pontos

| Entrega | Peso | Evidência/estado |
| --- | ---: | --- |
| Estado real, produção, PRs e diagnóstico | 10 | Concluído S01; estado revalidado S02/S03 sem repetir diagnóstico |
| Investigação oficial ChatGPT e caminho simples | 10 | Concluído S01; reaproveitado |
| Navegação por assunto e retorno aos recursos | 10 | PR #54; códigos públicos literais, sem vínculos inventados |
| Home retoma baralho pelo motor original | 5 | PR #54, com prioridade preservada da sessão integrada |
| Regressão S01, cinco larguras, notas e backup | 5 | CI 44099812436 no HEAD 517dcd8… |
| Recebimento de síntese no Caderno existente | 20 | PR #57; contrato pequeno, UTF-8/JSON estritos, identidade e registro único |
| Aplicação consentida sem progresso/revisão fictícios | 10 | Prévia/confirmar/cancelar/conflito/quota/backup; CI final S02 44110971432 |
| Refinamento móvel e validação integrada/acessível | 15 | Concluído S03 — rascunho preservado, atalhos/foco, síntese longa e seis estados nas cinco larguras; 30 varreduras sem violations |
| Aceite técnico final, persistência e preparação de publicação regular | 15 | Concluído — 38 suítes e regressões aprovadas, backups anterior/novo, nove categorias e roteiro de integração regular preparado |

Os últimos 15 pontos correspondem à verificação técnica e à **preparação** pedida para S03. Aprovação externa, merge e versão efetivamente publicada não são presumidos pelo percentual. A produção ainda não contém esta cadeia enquanto suas PRs permanecerem abertas.

## Sequência executada

1. **S01 concluída:** diagnóstico incremental, navegação e retomada. PR [#54](https://github.com/Talksxb/agu-quiz/pull/54), HEAD `517dcd842a7ba7b93ba2c21d5a386a6ae402d163`, base histórica `31a4769…`. 37 suítes Node e todas as regressões Chromium aprovadas; 35 varreduras específicas sem violations, inconclusivos de contraste separados. Entrega: `UX_ESTUDO_INTEGRADO_01_DIAGNOSTICO.md`.
2. **S02 concluída:** PR [#57](https://github.com/Talksxb/agu-quiz/pull/57), HEAD `b6050894ec86874b776572a0185552da05e6d334`, base S01. Um registro aditivo em `agu_quiz_mvp1_2026.notebook`; contrato `agu-aula-v1` até 32.768 bytes. 38 suítes e todas as regressões aprovadas na CI final 44110971432. 30 varreduras específicas sem violations; nove categorias de backup preservadas. Documentos: `UX_ESTUDO_INTEGRADO_02_CONTRATO.md` e `UX_ESTUDO_INTEGRADO_02_ENTREGA.md`.
3. **S03 autorizada e executada neste turno:** PR [#61](https://github.com/Talksxb/agu-quiz/pull/61), base S02. Defeito reproduzido e corrigido: selecionar uma aula apagava os campos do formulário manual. Atalhos com foco para formulário/registros/confirmação/aula salva. Síntese longa integral, consolidação manual e backups anterior/novo. Produto `7efcbeb7a4d413231bff5e34caf71d82fa3bf113`, CI 44115557627; fechamento documental e ensaio focalizado adicional devem ser conferidos no HEAD atual da PR. Relatório: `UX_ESTUDO_INTEGRADO_03_ENTREGA.md`.

Mantidas as três sprints. Não se criou S04 para repetir testes sem hipótese nova. Continuidade autossuficiente de uso/manutenção e preparação de integração em `ENCERRAMENTO_UX_ESTUDO_INTEGRADO.md`. Esse documento não autoriza publicação por sua existência.

## Dificuldades e decisões

- Um único Caderno principal recebe a síntese; Caderno contextual/Para meu caderno e registros manuais continuam em seus módulos originais. Sem segunda base, agenda, revisão ou cronograma.
- Módulo pedagógico e código granular são namespaces distintos. Sem vínculo é uma opção válida. Fontes e erros são declarações da aula, sem certificação automática do importador.
- Importar não cria respostas, horas, domínio, vencimentos ou tarefas concluídas. A atividade real nos módulos alimenta os motores existentes.
- Quota/histórico inválido/alteração após a prévia preservam o original. ID estável deduplica após reload/backup; conflito não substitui dados.
- A correção S03 conserva os três campos manuais durante os redesenhos do importador, sem autosave ou novo armazenamento. Antes de sair/recarregar, o usuário ainda precisa consolidar seu rascunho.
- S02 final reexaminada pelo artefato 14341576700, SHA-256 `f23fa8713c2f09de83b2bf696db1cb11d86874655c41b010932d0f4343b4e438`: inconclusivos em Materiais/Mais na borda da navegação horizontal. Não se alterou contraste com base apenas nesse resultado; a prova focalizada S03 está nos checks atuais.
- Chromium local impedido por restrição de socket. Reprodução interativa na prévia cloud e matriz em GitHub Actions, sem contornar restrições. Dados dos ensaios exclusivamente sintéticos.
- Android físico e TalkBack não executados. Viewport/toque emulado e axe não são certificação WCAG. Limite registrado, sem cadeia repetitiva de sprints assistivas.
- Main/produção S03: `31a47693b8f690e543f565c83208e3cdc637a547`; HTML SHA-256 `71a30f8c930cbd254bc4d22b4d9d400b322dcf92e700a6afabda79419de75ded`, 21 assets idênticos. PRs paralelas de Biblioteca permanecem fora desta alteração.
- Escrita remota pelo conector GitHub, sem chave no código/navegador. Árvore local/remota comparada. Fixtures históricas intactas, delta S03 encadeado; corpus, backup e motores externos preservados byte a byte.

## Publicação e continuidade

Nenhuma PR foi integrada nesta execução. Ordem preparada: #54 → #57 → #61, conferindo base/diff/checks a cada integração regular. Depois da integração efetiva, verificar Pages contra o checkout correspondente; não afirmar que uma feature em PR já está publicada. GPT Sites não receberam publicação automática.

Produto S03 aprovado na [CI 44115557627](https://github.com/Talksxb/agu-quiz/actions/runs/44115557627), Node e Chromium, Pages corretamente omitido na PR. Artefato 14343441564 (16.427.546 bytes), SHA-256 `cbce03426c7bde0004151e938d83169efaa1991dc8ac3374cfc7a2741afb824b`, baixado e conferido; JSON e captura de 390 px inspecionados. Resumo versionado em `evidencias-ux-estudo-integrado-03/ci-44115557627-resumo.json`. O commit seguinte altera somente documentação/evidências, deduplica um caminho de artefato no workflow e acrescenta o ensaio focalizado de navegação; os checks do HEAD final devem ser consultados na PR #61. Não apresentar o run de produto como execução desse ensaio posterior.
