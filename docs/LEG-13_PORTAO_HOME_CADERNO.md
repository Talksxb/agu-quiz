# LEG-13 — portão de acessibilidade e confiabilidade do atalho “Para meu caderno”

Execução: 15/11/2026. Escopo restrito à passagem **Home ⇄ aba/lista única** do leitor jurídico e às falhas de armazenamento. **LEG-14 não foi executada.**

## Fonte da verdade, base e concorrência

- Repositório público: https://github.com/Talksxb/agu-quiz; produção: https://talksxb.github.io/agu-quiz/.
- A `main` remota inicialmente era `c33716434b42a5656fa1fada62ba754f98b8c93d`, após a PR #28 documental da LEG-12. Não havia PRs abertas; branches antigas LEG/UX foram mantidas. Último Pages histórico `43744313002` concluído com êxito. O deploy atual deve sempre ser reconfirmado pelo commit e conteúdo HTTPS.
- Branch própria: `leg/leg13-portao-home-caderno`; [PR #29](https://github.com/Talksxb/agu-quiz/pull/29), inicialmente em rascunho, integrada após CI verde no merge **`60bf27b0c170ed003d0eec1c5fb22abe15859e79`**. A `main` avançou durante o trabalho pela UX05: implementação PR #30, `baa54ad3688ef2577e75327f87f773b6e028ee2b`, e documentação PR #31, `df52b749d22781c713f1ccdc9503b40e567617d2`. A branch absorveu ambas sem conflito, com commits de reconciliação `560ce8b7...` e `96a59785...`, preservando os testes e a fixture UX05. Commit de código e testes `0990f114b2b0e59f6d3c1b534dd3e286dd205557`. Sem rebase, force push, edição dos ramos concorrentes ou acesso à auditoria privada.
- Antecessora: [LEG-12](LEG-12_HOME_CADERNO.md), implementação PR #27, merge `cb764e3071dc7ac0cc00d60999f9a53cfe77cbcb`, CI principal `43743414168`, Pages `43743413423`, documentação PR #28 integrada em `c337164...`.

## Inspeção do contrato e decisão de escopo

O atalho implementado em `meu-estudo.js` usa a categoria `agu_leitor_juridico_s13_v1` e `AGUBackup20.validateRecord` antes de contar `status:'pendente'`, independentemente de `topic` documentado ou nulo. Na Home demo o contador é ocultado. `AGUHome.openNotebook` invoca a aba existente `AGULegal.tab('para_caderno')`; a marcação pertence exclusivamente a `forNotebook` no leitor. O painel transitório `AGUHome.notebookReturnPanel` retorna à Home com foco no botão inicial. Não foi introduzida nem pretendida outra chave, agenda, origem ou lista.

O código preserva quatro origens: `leitor`, `estudo_integrado`, `questao_verificada` (quatro questões históricas S18/S19 verificadas) e `flashcard_existente` (36 cartões históricos). `topic` granular é comprovado ou `null`; somente ADM-06 e CON-50 do índice de flashcards são associados por evidência própria. Marcas sem tema continuam na lista manual, sem serem inseridas numa revisão futura ou de tema próximo. LEG-08 mantém o filtro exato `pendente && topic===active.code && due<=hoje` e não altera agendamento.

Limites intactos: 300 marcações, 450 caracteres, 500 comentários, 12 MB UTF-8 por arquivo, nove categorias de backup e importação só de categorias ausentes. Não houve acesso a perfil ou backup real; as marcas e sessões são inventadas para cada contexto de teste. Corpus normativo intocado: seis normas, 292 artigos, 1.176 unidades, cinco integrais; L4717 e DL4657 sem vínculo presumido.

## Reexame da evidência axe anterior

**LEG-11:** o [log histórico de CI 43736061451](https://github.com/Talksxb/agu-quiz/actions/runs/43736061451) e os JSONs originais do artefato `14169917010` foram recuperados e inspecionados. Em 390 px: 0 `violations`, 14 nós `incomplete` inicialmente, 22 regras `passed`, 12 nós persistentes depois da rolagem; em 1280 px: 0 `violations`, 12 nós `incomplete`, 21 regras `passed`, 12 persistentes. As ocorrências persistentes são da sessão de **flashcards** (como `.agu-deck-identity`, `.agu-deck-session-head`, `.agu-deck-meta`, rótulo e status do formulário do flashcard), não do atalho da Home nem da lista única do leitor. Elas **continuam inconclusivas**, não são aprovação WCAG e não justificam redesenho de baralhos na LEG-13.

**LEG-12:** os JSONs reais do artefato `14173745214` foram reexaminados. Em 390 e 1280, a Home teve zero `violations` e zero `incomplete`; a lista teve zero `violations`, 1 e 5 nós `incomplete` inicialmente (contraste), respectivamente, todos reavaliados com rolagem sem inconclusivo persistente. `passed` da lista: 24 e 26 regras, respectivamente. Esses números são contagens de regras versus nós e não certificação de acessibilidade universal.

## Provas novas e preservação

- `tests/leg13-validacao.js`: dez cenários Node sem usar dados reais; Home vazia e leitura sem escrita; quatro origens e `topic:null`; retorno de foco; estado manual; `QuotaExceededError` sem alteração de bytes; JSON malformado, origem, ID, data, tópico e status inválidos sem reparo silencioso; `SecurityError` na leitura; 300/301, 450/451, 500/501 e 12 MB; nove categorias, restauração idempotente; modo demo; hashes exatos do delta mínimo de produto.
- `tests/leg13-browser.cjs`: Chromium real em contextos sintéticos independentes de 320, 360, 390, 430 e 1280 CSS px. Home vazia, mistura das quatro origens, Enter/Espaço/toque, foco e região visível do título, filtros de tema/estado, edição, alteração manual, retorno ao botão, preservação dos demais itens de `localStorage`, Estudo Integrado e sessão de baralho, reload e zoom de fonte 200%. Cenários isolados de JSON malformado, currículo falso, leitura bloqueada e quota. Axe em 390/1280, com `violations`, `incomplete` e `passed` distintos e cada nó inconclusivo rechecado após rolagem; screenshots e JSON em `tests/artifacts-leg13/`.
- **Defeito novo comprovado antes do patch:** em tela de 320/360/390 CSS px com fonte-raiz em 200%, a Home apresentava excesso horizontal de 104/64/34 px, respectivamente, e texto cortado na ação principal de retomada. O próprio atalho do caderno permanecia visível, mas seu caminho de retorno à Home não assegurava leitura íntegra dessa ação. A causa estava em `.daily-mission .primary { white-space: nowrap }` combinada com o botão de largura total em telas pequenas. A correção em `index.html` foi uma única regra CSS `@media(max-width:530px)` com `white-space:normal`, quebra de palavras e `line-height:1.35` só nesse botão. Nada foi alterado nos scripts de Home, leitor, backup, revisão, estudos ou baralhos. A jornada LEG13 agora exige **ausência de overflow com fonte 200%** em todas as cinco larguras; o fixture registra SHA do HTML anterior e posterior.
- Regressões LEG01–12, UX01–05, WORK01 e S19–35 não foram removidas ou atenuadas. `.github/workflows/agu-sprint20-ci.yml` adicionou só os dois testes LEG13, globs explícitos de seus artefatos e jornada HTTPS `AGU_TEST_URL` no job após merge. `tests/fixtures/leg13-deltas.json` encadeia `leg12-deltas.json` sem regravar fixtures históricas; testes retrospectivos de SHA foram estendidos para reconhecer exclusivamente a sucessão LEG12→LEG13 do HTML.

**Node local:** as 29 suítes anteriores passaram; a suíte LEG13 adicionou dez cenários aprovados (30 suítes no total), com Node v24 local, antes de integrar a suíte UX05 concorrente (31 suítes no workflow consolidado). **Chromium local:** não iniciado porque o binário `/usr/bin/chromium` foi bloqueado por `process_singleton_posix.cc: socket() failed: Operation not permitted`. Esse bloqueio não é falha do aplicativo e não substitui CI. Tentativa de usar a interface compartilhada contra a origem local `127.0.0.1:8769` foi recusada por conexão; não foi usado navegador pessoal nem URL pública com armazenamento preexistente.

**CI de PR:** as execuções `43746447633`, `43746955426` e `43747227393` validaram o diagnóstico Node/Chromium antes do patch de CSS. A execução `43747767696` aprovou o patch e todas as regressões; a execução **`43747869649`** sobre a branch reconciliada também concluiu com sucesso **integridade-node e navegador-chromium**, com o job pages-publicado corretamente ignorado por ser PR. A PR #29 ficou pronta para revisão após ambos os jobs verdes e foi mesclada em `60bf27b...`.

**CI principal pós-merge:** a execução [**`43748256376`**](https://github.com/Talksxb/agu-quiz/actions/runs/43748256376) foi concluída com sucesso nos **três jobs**: `integridade-node` (31 suítes), `navegador-chromium` (jornadas LEG/UX/WORK/Sprints) e `pages-publicado` (jornadas em HTTPS, incluindo LEG13). Isso demonstra que a versão de produção passou nos ensaios automatizados especificados, não que houve teste assistivo em aparelho físico.

**Pages publicado:** o deploy [**`43748256060`**](https://github.com/Talksxb/agu-quiz/actions/runs/43748256060) terminou `success` para o merge `60bf27b...`. Após a conclusão, `node tests/sprint21-pages.cjs` fez requisições HTTPS reais e comprovou HTTP 200 e SHA-256 exatos dos nove scripts, do HTML corrigido, do CSS dos baralhos e do módulo de questões. HTML servido: **109.132 bytes**, SHA-256 **`e33885e0469ce760408e1b7d7d03c2d8bcaa753dad0f237bfd745777bf0aef24`**. A jornada LEG13 também passou em `AGU_TEST_URL` no job `pages-publicado` da CI principal `43748256376`.

**Axe e artefatos do patch (CI `43747767696`, artefato `14175136752`):** em 390 px, Home 0 `violations` / 0 `incomplete` / 18 regras `passed`; lista 0 / **1 inicialmente inconclusivo** / 24, sem nó persistente após revelá-lo por rolagem e reavaliar a regra. Em 1280 px, Home 0 / 0 / 18; lista 0 / **5 inicialmente inconclusivos** / 26, zero persistentes após rolagem. As capturas `home-zoom-320.png` e `home-zoom-390.png` foram inspecionadas visualmente: ação “Continuar estudando” passa a quebrar linha sem corte, e o atalho “Para meu caderno” permanece alcançável. Os 12 inconclusivos persistentes da LEG11 continuam registrados como **pendência externa ao atalho**, não aprovados. Esse recorte não constitui auditoria assistiva em aparelho físico.

## Publicação e hashes da base anterior, inicialmente reconfirmados por HTTPS

`node tests/sprint21-pages.cjs` retornou HTTP 200 e SHA-256 **exatos** do HTML, nove scripts, CSS dos baralhos e módulo de questões, primeiro contra a base `c337164...` e novamente depois do merge `60bf27b...`:

| Arquivo | SHA-256 |
| --- | --- |
| `index.html` (antes da correção) | `b15be4310bb20ab842aab91804c107ce97dd8819d18e7a84e0d00a630bb974a1` |
| `index.html` (após a correção, confirmado em HTTPS depois do merge) | `e33885e0469ce760408e1b7d7d03c2d8bcaa753dad0f237bfd745777bf0aef24` |
| `meu-estudo.js` | `e88aa5ee7cb77a5f4e193f690830c803604dcda1b3d2e6fe53e0d8285bed43de` |
| `leitor-juridico.js` | `1f119fb84c092b00a994943a1f0f09d85dcc6efabb6b85df536a3b3189a48c04` |
| `backup-local-s20.js` | `8f1884ab63c2d6e4bb3bca753d01607a29abedf07e60d61ecb6f1c464a07f4f9` |
| `revisao-inteligente.js` | `fe6b8dcacc7363fd661055e737c73c443f1428d2b97e807faeb37e447650252c` |
| `dados/legislacao-s13.js` | `c038fc9416d1b441aa710bb970eb8428a92008f197ca367ea09df53f6c45f51a` |
| `baralhos-ux.css` | `de772af0e639f70f57bc4ea8d6bf59fd9cd6971463ae936f9a74d390be42d3b7` |
| `questoes-leitor-s18.js` | `f4095116ca5bf0b31bd76ca323a88a7b8a1e0b079d100da9981d1f8f6d943c3f` |

Outros arquivos verificados pela mesma execução: `catalogo-disciplinas.js` `261b2b425ed8d6f41400e59d4e0545cbeb5b2292f6f4da250a39f4c2fa915ae3`; `planejamento-semanal.js` `b11788273caf97a35d155be1b60d42dbb7f302b6aa55912f1f4e6942436bbc7b`; `leitor-consolidacao.js` `e6d030e22c96d9b1dc39430bf13e34a832bef835f1be93fa3f42b6fe39851ba4`; `estudo-integrado.js` `82fafd24b164c5d5f4a9fc37ad2bcad90c81d1755bdb9b53ea853f23fd724fc9`.

## Riscos e limites de interpretação

Uma simulação de toque e larguras CSS não equivale a Android físico ou TalkBack. O resultado axe não certifica conformidade integral, principalmente por inconclusivos fora do fluxo Home/lista no módulo de flashcards. Retornar à Home não pretende reabrir automaticamente uma origem já encerrada/retirada. O atalho não interpreta matéria ampla como ID curricular granular. O código da PR #29 **já está em produção** pelo merge `60bf27b...`, Pages e CI principal aprovadas. A próxima sprint deve exigir nova evidência independente antes de outra mudança.

Handoff para próxima sprint, sem execução: [`PROMPT_LEG-14.md`](PROMPT_LEG-14.md).
