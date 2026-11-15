# AGU Quiz — checkpoint UX-BARALHOS-05

Data: 15/11/2026. Escopo executado: **validação adversarial isolada e decisão curricular conservadora**. UX-BARALHOS-06 **não executada**.

## Reconhecimento e ponto de partida

- Repositório principal: `Talksxb/agu-quiz`. `main` revalidada no início: `c33716434b42a5656fa1fada62ba754f98b8c93d`; branch exclusiva `ux/baralhos-05`, criada dessa base. Nenhuma PR aberta concorrente no reconhecimento inicial. A `main` já continha UX01–04 e LEG07–12; a LEG12 havia sido integrada em `cb764e3071dc7ac0cc00d60999f9a53cfe77cbcb`, e o merge documental mais recente era `c337164`.
- Conferidos checkpoints UX01–04, prompt UX05, LEG07–12 e WORK01, além dos módulos de revisão, disciplina, planejamento, Home, Estudo Integrado, leitor, questões, CSS e backup e testes anteriores. `docs/PROMPT_UX-BARALHOS-05.md` foi preservado.
- Produção **antes da sprint**, confirmada por `node tests/sprint21-pages.cjs`: HTTP 200 para HTML, nove scripts, CSS de baralhos e questões; SHA-256 dos bytes em HTTPS igual ao checkout de `c337164`. `index.html` `b15be4310bb20ab842aab91804c107ce97dd8819d18e7a84e0d00a630bb974a1`; `revisao-inteligente.js` `fe6b8dcacc7363fd661055e737c73c443f1428d2b97e807faeb37e447650252c`; `baralhos-ux.css` `de772af0e639f70f57bc4ea8d6bf59fd9cd6971463ae936f9a74d390be42d3b7`; `meu-estudo.js` `e88aa5ee7cb77a5f4e193f690830c803604dcda1b3d2e6fe53e0d8285bed43de`.
- Sem integração GitHub ↔ GPT Sites demonstrada por configuração explícita; nenhuma sincronização inferida nem alteração em Sites. Auditoria privada não consultada: o corpus público bastou.

## Acervo e decisões

- **36 flashcards autorais, seis baralhos**: `ADM-06` 12, `ADM-13` 4, `ADM-23` 4, `CON-02` 2, `CON-50` 4, `PC-03` 10. Metadado cognitivo original em **14**: nível 2 (7), nível 3 (6), nível 4 (1); **22 sem nível**. Catálogo de 14 disciplinas públicas, três com baralhos. Nenhum ID criado, duplicado, reclassificado ou excluído.
- `AGUPlanner` propõe tarefas como `ADM/Atos administrativos` e `CON/Funções essenciais à Justiça`; `AGUHome` navega por categorias amplas. O contrato `AGUReview.exactDeck(topic)` aceita somente ID granular literal como `ADM-06`. **Não existe par automático confirmado** entre os IDs efetivos das tarefas e baralhos. Decisão: **nenhum atalho curricular específico**; é necessária autorização pedagógica de um contrato público granular caso se queira ampliar a função.
- As quatro origens da lista única `forNotebook` permanecem `leitor`, `estudo_integrado`, `questao_verificada`, `flashcard_existente`. Nenhum `topic` foi convertido em `deviceId`; a Home LEG12 mantém o contador validado com retorno ao mesmo leitor.
- Histórico importado sem `cards[id].seen/due` permanece `avaliado sem data`, sem novo prazo. Abertura e revelação não contam como avaliação, e nenhuma tentativa ou nota é criada sem ato explícito. Mantidos D+1/D+7/D+21/D+45, `librarySession` opcional e as nove categorias S20, 12 MB UTF-8 e restauração de ausências; importação de revisão até 3 MB e somente tentativas.
- Sem dados públicos verificados de recorrência via `AGUDisciplines.verifiedFrequency()`. Nenhuma transposição AUD02-FREQ ou classificação level→nível pedagógico; nenhum selo de oficialidade para cartões autorais.

## Resultado técnico e limites

- **Nenhum defeito novo reproduzido no produto** com evidência suficiente para editar `index.html`, JS/CSS de produção, matriz, cronograma, backups ou leitor. A entrega de código da UX05 consiste **apenas em testes novos e integração à CI**, sem alterações ao runtime e sem novo delta de hashes de assets protegidos. Os fixtures anteriores permanecem intactos.
- Nova suíte `tests/ux-baralhos-05-validacao.js`: seis verificações sintéticas — contagem e níveis, 1.900 tentativas importadas sem agenda, arquivo acima de 3 MB rejeitado, importação idempotente sem sobrescrever seen/due/stage, troca de sessão e avaliação única, quatro origens LEG11–12 e S20 idempotente, planejamento amplo sem equivalência inventada.
- Nova jornada `tests/ux-baralhos-05-browser.cjs`: cinco larguras 320/360/390/430/1280, histórico sintético de 1.200 tentativas, estados da revisão, um/dois cartões, teclado, nota LEG11 voluntária, pausa/recarga/troca, Home LEG12, backup S20 em perfil vazio, foco, `aria-live`, `prefers-reduced-motion`, overflow, axe 390/1280 e capturas. Qualquer `incomplete` de axe é separado de violação confirmada e fica no JSON da jornada.
- Antes de editar: **29/29 suítes Node aprovadas**. Após adicionar a nova suíte, `node tests/ux-baralhos-05-validacao.js`: **6/6 cenários aprovados**; todos os anteriores deverão permanecer no CI.
- **Chromium local não foi executável**: primeiro faltou o executável do Playwright; com `/usr/bin/chromium` o ambiente retornou `socket() failed: Operation not permitted`. A aprovação da jornada veio da CI remota e **não é atribuída ao ambiente local**.
- **Android físico e TalkBack não testados**; não houve aparelho nem perfil assistivo independente disponibilizado. Chromium com `hasTouch` e largura móvel não é equivalente a Android/TalkBack. Não se corrigiram rótulos sem observação real. Permanecem inconclusivos históricos de contraste da LEG11 e da UX04, sujeitos a avaliação manual.

## Entrega GitHub e publicação

- Implementação original local `92e9382` e remoto `fd1357481f8d4faebba8582ccb479363f7f1faa8` na branch `ux/baralhos-05`, árvores Git verificadas idênticas `e13b39a819ae313bc04313fc91d0d9c1ed5f9e9c`. [PR #30](https://github.com/Talksxb/agu-quiz/pull/30), inicialmente em rascunho, liberada após **dois jobs verdes** na [CI 43746456908](https://github.com/Talksxb/agu-quiz/actions/runs/43746456908): Node com **30/30 suítes** e Chromium `159.0.8154.6`, todos os testes UX01–05, LEG01–12, WORK, S20–35. Sem conflito ou force push; merge `baa54ad3688ef2577e75327f87f773b6e028ee2b`. Job `pages-publicado` da PR foi corretamente pulado: PR não é produção.
- A nova jornada `UX_BARALHOS_05_BROWSER_OK` passou em **320/360/390/430/1280 CSS px**, primeiro em contexto sintético local da CI, depois **diretamente no GitHub Pages**, sempre com 1.200 tentativas falsas. Filtros, sessão de um/dois cartões, nota LEG11 voluntária, Home LEG12, 3 categorias presentes e restauração S20 em contexto vazio, Enter/Espaço, foco, `aria-live`, movimento reduzido e ausência de overflow foram observados. As capturas foram **geradas na CI** nos cinco tamanhos; **não se afirma inspeção visual manual** delas, pois o ZIP da ação não estava disponível pelo meio de consulta desta execução.
- **Axe 4.14.0 da UX05**, em cada largura 390 e 1280: **zero violações confirmadas**, **uma regra com resultados `incomplete` inicialmente** e **nove rechecagens de nós ainda inconclusivas após rolagem**. Quantidade de regras e de nós não é intercambiável. Os JSON `artifacts-ux-baralhos-05/axe-{390,1280}.json` preservam os alvos por regra; estes achados **não certificam WCAG** e precisam de avaliação assistiva/visual real. O resultado não elimina os inconclusivos LEG11/UX04.
- Artefatos sintéticos da PR: [`agu-s20-chromium-viewports` ID 14174408511](https://github.com/Talksxb/agu-quiz/actions/runs/43746456908). Após merge: [Pages 43746898196](https://github.com/Talksxb/agu-quiz/actions/runs/43746898196) **aprovado** e [CI principal 43746898351](https://github.com/Talksxb/agu-quiz/actions/runs/43746898351) **três jobs aprovados**, incluindo `pages-publicado` com `UX_BARALHOS_05_BROWSER_OK` sobre `https://talksxb.github.io/agu-quiz/`. Artefatos da `main`: Chromium **14174842901** e jornada HTTPS **14175001141**. Os limites de Android/TalkBack e de `incomplete` permanecem.
- `node tests/sprint21-pages.cjs` reexecutado **depois** da conclusão do Pages: HTTP 200 e SHA-256 idêntico ao checkout mesclado para HTML, **nove scripts**, CSS da UX01, questões oficiais e corpus legal. Os hashes são **iguais aos anteriores**, pois UX05 não mudou assets de execução:

  | Asset verificado em HTTPS | SHA-256 |
  | --- | --- |
  | `index.html` | `b15be4310bb20ab842aab91804c107ce97dd8819d18e7a84e0d00a630bb974a1` |
  | `revisao-inteligente.js` | `fe6b8dcacc7363fd661055e737c73c443f1428d2b97e807faeb37e447650252c` |
  | `baralhos-ux.css` | `de772af0e639f70f57bc4ea8d6bf59fd9cd6971463ae936f9a74d390be42d3b7` |
  | `meu-estudo.js` | `e88aa5ee7cb77a5f4e193f690830c803604dcda1b3d2e6fe53e0d8285bed43de` |
  | `backup-local-s20.js` | `8f1884ab63c2d6e4bb3bca753d01607a29abedf07e60d61ecb6f1c464a07f4f9` |
  | `leitor-juridico.js` | `1f119fb84c092b00a994943a1f0f09d85dcc6efabb6b85df536a3b3189a48c04` |
  | `questoes-leitor-s18.js` | `f4095116ca5bf0b31bd76ca323a88a7b8a1e0b079d100da9981d1f8f6d943c3f` |
  | `estudo-integrado.js` | `82fafd24b164c5d5f4a9fc37ad2bcad90c81d1755bdb9b53ea853f23fd724fc9` |

O fechamento posterior é **somente documental**: não modifica hashes de aplicação, dados, planos, acervo nem fixtures históricos. O código público continua tendo GitHub como fonte e GitHub Pages como publicação estática.

Handoff único: `docs/PROMPT_UX-BARALHOS-06.md`, **somente preparação**. Não iniciar UX06 neste lote.
