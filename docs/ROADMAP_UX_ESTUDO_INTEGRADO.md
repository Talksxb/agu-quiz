# AGU Quiz — roadmap único de UX Estudo Integrado

Atualização: 17/11/2026. GitHub é a fonte da verdade. Aulas, método socrático e correção continuam no ChatGPT. Percentuais abaixo medem entregas da frente de produto, não domínio jurídico ou cobertura do edital.

## Acompanhamento

| Indicador | Estado no checkpoint |
| --- | --- |
| Sprint | 02/03 — síntese estruturada da aula no Caderno existente |
| Estado | Concluída — entrega em PR dependente, Node e Chromium aprovados |
| Progresso total | 70% — S01 e S02 verificadas; 30 pontos reservados à S03 |
| Início S02 | 2026-11-17T14:29:21.569000+00:00 (11:29:21 em São Paulo) |
| Checkpoint | 2026-11-17T15:08:00.154137+00:00 |
| Tempo utilizado S02 | 38 min 38 s até o fechamento documental, incluindo ferramentas/espera e validação. A espera dos checks do commit documental posterior consta da PR |
| Tempo S01 confirmado | 34 min 24 s, incluindo validação final, conforme PR #54 |
| Estimativa total | 2–3,5 horas para a frente completa; incerteza alta |
| Estimativa restante | 45–120 minutos após concluir S02; não inclui serviço MCP nem espera por aparelho real |
| Próxima sprint | 03 — refinamento móvel, acessibilidade, validação integrada e preparação de publicação; nova autorização |
| Publicação | PR #57 sobre #54, sem merge; produção permanece na main 31a4769…; revisar os checks do último HEAD antes de integrar |

A faixa foi recalibrada com as duas implementações observadas e reutilização dos módulos atuais. S03 tem 30 pontos de entrega restantes; o esforço depende dos defeitos demonstrados pelos artefatos, da cadeia de integração e do ambiente assistivo disponível. Não presumir duração exata de testes físicos ou aprovação futura.

## Critérios de progresso (100 pontos)

| Entrega | Peso | Evidência/estado |
| --- | ---: | --- |
| Estado real, produção, PRs e diagnóstico | 10 | Concluído em S01; revalidado estado Git/produção em S02 |
| Investigação oficial ChatGPT e caminho simples | 10 | Concluído em S01; decisão reaproveitada |
| Navegação por assunto e retorno aos recursos | 10 | Concluído na PR #54, códigos públicos literais |
| Home retoma baralho pelo motor original | 5 | Concluído na PR #54 |
| Regressão S01, cinco larguras, notas e backup | 5 | CI 44099812436 aprovada no HEAD 517dcd8… |
| Recebimento de síntese e registro no Caderno existente | 20 | Concluído em S02 — Node e Chromium aprovados, um registro no Caderno existente |
| Aplicação consentida, sem progresso/revisão fictícios | 10 | Concluído — prévia/confirmar/cancelar, identidade, falha e backup em cinco larguras; sem alterar pontuação/agenda |
| Refinamento móvel e validação integrada/acessível | 15 | S03 não executada |
| Aceite final, persistência e preparação/publicação regular | 15 | S03 não executada |

## Sequência preservada

1. **S01 concluída:** diagnóstico incremental, navegação e retomada. [PR #54](https://github.com/Talksxb/agu-quiz/pull/54), cabeça `517dcd842a7ba7b93ba2c21d5a386a6ae402d163`. Node/Chromium verdes; zero violações nas 35 varreduras específicas, com inconclusivos de contraste registrados. Evidências e resumo em `UX_ESTUDO_INTEGRADO_01_DIAGNOSTICO.md` e na PR. Sem merge/deploy.
2. **S02 autorizada neste turno:** arquivo JSON pequeno, prévia, escolha manual de destino, confirmação, um registro no Caderno principal, deduplicação/conflito e backup existente. [Contrato](UX_ESTUDO_INTEGRADO_02_CONTRATO.md) definido antes do consumidor; [entrega](UX_ESTUDO_INTEGRADO_02_ENTREGA.md) e testes documentados. CI específica e histórica devem passar antes de considerar a revisão final validada.
3. **S03 depende de nova autorização:** ler resultados/artefatos atuais; melhorar o que estiver comprovadamente difícil, validar fluxo completo móvel e preparar integração/publicação respeitando a dependência das PRs. Não repetir auditorias/diagnósticos encerrados nem criar sprints de acessibilidade sem hipótese nova.

Mantidas três sprints. Não foi necessária infraestrutura nova; MCP/backend fica fora desta sequência e da estimativa. S03 não foi antecipada.

## Decisões e dificuldades registradas

- Um registro `chatgpt:<id>` no Caderno existente; esquema principal e nove categorias do backup intactos. Sem nova base de aulas/caderno, agenda ou planejamento.
- Namespace pedagógico e granular distintos; sem alias por nome/prefixo. Sem vínculo é opção válida. Fontes são declarações da aula, não certificações do importador.
- Erros de aula não se tornam `attempts`, horas, vencimentos ou domínio. Atalhos levam aos recursos existentes; as ações reais do estudante alimentam os motores originais.
- JSON e UTF-8 estritos, limites pequenos e rejeição de HTML/campos conflitantes. Prévia temporária; cancelamento/nova leitura anulam o resultado anterior.
- Gravação compara bytes atuais com os da prévia, valida a categoria inteira e só atualiza memória depois do sucesso. Quota/conflito preservam o registro anterior.
- A seleção de arquivo na automação cloud teve uma chamada de 528 segundos. A importação foi observada com sucesso; isso não prova desempenho de Android físico ou custo de parse isolado.
- Main e produção revalidadas em S02: `31a4769…`, HTML SHA-256 `71a30f8c930cbd254bc4d22b4d9d400b322dcf92e700a6afabda79419de75ded`, 21 assets idênticos. PRs #49–54 abertas na retomada; #55/#56 de cotejo documental observadas durante S02. Nenhuma mesclada nesta execução.
- Autenticação de escrita por Git/CLI indisponível na S01; entrega por conector GitHub, sem credencial no código. S02 seguirá o mesmo caminho e comprovará igualdade da árvore local/remota.
- Hashes de fixtures históricas não são regravados. O delta S02 se encadeia ao S01. O backup, corpus, questões e motores externos permanecem byte a byte iguais.

## Continuidade

Executar somente o [prompt S03](PROMPT_UX_ESTUDO_INTEGRADO_03.md) após nova autorização. A produção não deve ser tratada como contendo PRs abertas. Conferir HEAD/checks atuais antes de integrar; não usar run anterior como prova de código posterior.

## Fechamento S02

- PR [#57](https://github.com/Talksxb/agu-quiz/pull/57), empilhada sobre [#54](https://github.com/Talksxb/agu-quiz/pull/54), base `feat/ux-estudo-integrado-01`/`517dcd8…`. Main/produção revalidadas em `31a4769…`; sem merge ou deploy da frente.
- CI [44109421365](https://github.com/Talksxb/agu-quiz/actions/runs/44109421365) no HEAD de produto `a589edb482ccc39ea1b82946b3f9f451d84f7dc3`: **Node e Chromium aprovados**, com todas as regressões herdadas. 38 suítes Node; jornada nova com 30 varreduras em 320/360/390/430/1280, timezone São Paulo, zero violações detectadas, apenas `color-contrast` como regra inconclusiva.
- Artefato 14339838122, SHA-256 `5c419fc8b0c384273df15c4857bb95182424a036708e7a607572ded75811f5fc`, baixado e conferido. JSON e captura de 390 px efetivamente inspecionados. Cinco categorias presentes restauradas, mantendo as nove possíveis do contrato; registro anterior e a tentativa sintética prévia preservados, um único registro da aula, sem duplicação.
- O resumo versionado descreve esse HEAD de produto. O commit seguinte atualiza somente documentos/evidências; os checks atuais desse fechamento devem ser consultados na própria PR, sem apresentar um run antigo como aprovação de um HEAD posterior.
- Android físico e TalkBack não executados. Inconclusivo do axe não é certificação WCAG. S03 permanece não executada.

Tempo acumulado S01 + S02 medido até este checkpoint: **73 min 2 s**. O tempo total observado da S02, incluindo a espera final da CI documental, será informado no encerramento e na PR, sem recontar essa espera como outra sprint.
