# AGU Quiz — LEG-11 | “Para meu caderno” nos flashcards existentes

Data: 15/11/2026. Escopo **exclusivo**: guardar perguntas breves escolhidas pelo estudante enquanto visualiza um flashcard efetivamente existente, sem criar cartões, reclassificar conteúdo, registrar resposta ou alterar revisão. O caderno físico permanece o espaço principal de síntese. **LEG-12 não foi executada.**

## Base confirmada e identidade verificável

Main inicial da sprint: `a1fb2ca82f2985bda1a29d690dc52267fa3f994a`, já com UX-BARALHOS-02. A inspeção de PRs abertas no início não identificou dependência concorrente. A PR de código [#23](https://github.com/Talksxb/agu-quiz/pull/23) usou `leg/leg11-flashcards-para-caderno` e teve implementação `5273012f42b173730927bd915847371e508920c9`, ajuste **somente no teste axe** `c236992b07589098f5613d0849ba1c1428b6eb28` e merge `f28a9c16e0a9d26032ca6a8fb210cb46fd4b774f`. Não houve force push, reescrita ou incorporação de PR com conflito.

O catálogo público contém **36 flashcards autorais** em seis códigos: `ADM-06` (12), `ADM-13` (4), `ADM-23` (4), `PC-03` (10), `CON-02` (2) e `CON-50` (4). Não se confundem com questões oficiais do S18/S19. A LEG-11 criou um índice histórico fechado `NOTEBOOK_CARD_HISTORY` dos **IDs já publicados**, mas **não criou cartões**. `AGUReview.notebookEligibleCard(id)` confirma que o cartão consta do índice ativo, é flashcard e conserva o código esperado; `AGUReview.notebookHistoricCard(id)` preserva uma referência curta e imutável mesmo após remoção posterior da interface.

Somente os códigos `ADM-06` e `CON-50` possuem vínculo curricular granular confirmado por artigo no corpus legal público; só neles a marcação recebe o respectivo `topic`. Em `ADM-13`, `ADM-23`, `PC-03` e `CON-02`, a marca recebe `topic:null`, mesmo quando o cartão mostra seu próprio código. Não se transpôs currículo da auditoria privada nem se inferiu tema por texto, cartão ou proximidade com a lei.

## Modelo, ação e preservação

Novo exemplo **inteiramente sintético** na mesma lista `forNotebook`:

```json
{
  "id": "pc-<identificador-unico>",
  "lawId": null,
  "articleId": null,
  "unitId": null,
  "cardId": "ri-adm-01",
  "cardLabel": "Flashcard ri-adm-01 · ADM-06",
  "topic": "ADM-06",
  "origin": "flashcard_existente",
  "prompt": "Qual a diferença entre avocação e delegação?",
  "createdAt": "<instante-ISO-8601>",
  "status": "pendente"
}
```

O campo `cardId` pertence à identidade do cartão; o `id` da marcação é independente, estável, com prefixo `pc-` e sem versão normativa. A nova origem nunca presume lei, artigo ou dispositivo. O formulário “Para meu caderno · flashcard” aparece no cartão selecionado da revisão e na sessão contínua de baralho real, em `revisao-inteligente.js`. Só o clique ou ativação de “Guardar para meu caderno” produz a gravação; revelar, errar, acertar, avaliar, concluir ou abandonar a sessão não a produz. A pergunta é escrita pelo estudante: não há cópia automática da frente, verso, comentário ou fundamentação.

`AGULegal.notebookSaveCard` grava atomicamente na **única** lista opcional `forNotebook` da chave anterior `agu_leitor_juridico_s13_v1`. `leitor-juridico.js` exibe e permite editar/alterar manualmente `pendente/anotado/dispensado` junto às origens `leitor`, `estudo_integrado` e `questao_verificada`. A abertura da origem por `notebookOpenCard` seleciona um flashcard **existente** sem responder ou agendar; no retorno da revisão, o modo, a seleção, a revelação e o foco são preservados. Se o cartão não existe mais, a referência textual `cardLabel` permanece, sem link fictício.

O `backup-local-s20.js` valida retrospectivamente o novo formato somente quando ID, origem, rótulo e `topic` coincidirem com a referência histórica permitida. Nenhuma das três origens anteriores foi migrada ou reescrita. A importação S20 continua restaurando **apenas categorias ausentes**: nove categorias, nenhum décimo armazenamento, nenhuma mescla ou substituição silenciosa. Permanecem os limites **300 marcações**, **450 caracteres**, **500 comentários** e **12 MB UTF-8**, inclusive rejeição de 301/451/501 e quota sem gravação parcial. Backup legado sem `forNotebook` continua válido.

A LEG-08 continua exigindo cartão de revisão com `due` previamente registrado e `due<=hoje`, `status:'pendente'` e `mark.topic===active.code`, com estado leitor validado. Cartão novo, futuro, outro tópico ou `topic:null` não recebem marcações automaticamente. Não houve mudança em fases, datas, tentativas, respostas, cronograma, prioridades ou planejamento.

Corpus preservado: `agu-legal-reader-v1`, `agu-legislation-leg01-v1`, **6 normas / 292 artigos / 1.176 unidades / 5 integrais** — CF88 parcial, L9784, LC101, LC73, DL4657 e L4717. As fontes oficiais, notas editoriais, versões e ressalvas jurídicas não mudaram, nem foi certificada vigência nesta sprint.

## Arquivos e validação efetiva

Código alterado na PR #23: `revisao-inteligente.js`, `leitor-juridico.js`, `backup-local-s20.js` e `index.html` (somente versões de cache dos três scripts). Não houve edição dos dados de questões, flashcards, legislação, aulas, cronograma ou Estudo Integrado.

Adições: `tests/leg11-validacao.js`, `tests/leg11-browser.cjs`, `tests/fixtures/leg11-deltas.json`. Atualizações pontuais: `tests/sprint21-pages.cjs`, `.github/workflows/agu-sprint20-ci.yml` e testes `leg03`–`leg10`, `ux-baralhos-01`, `ux-baralhos-02` e `work01` **apenas** para encadear expectativas de hash e preservar a regressão. Nenhuma fixture predecessora foi sobrescrita.

Passaram **26 suítes Node** localmente e na [CI final da PR #23, execução 43735066470](https://github.com/Talksxb/agu-quiz/actions/runs/43735066470). O Chromium real **159.0.8154.6** percorreu 320/360/390/430/1280 CSS px, incluindo LEG11, LEG10–01, UX01/02, WORK01 e regressões de teclado/foco. A jornada inclui: abrir um flashcard real, salvar por ação explícita sem revelar, conferir `pc-*` e `topic`, ler/editar/mudar status na única lista, ida e volta da origem, filtro, exclusão de `topic:null` em revisão programada, conservar data e resposta, reload, exportação S20, restauração em perfil vazio e importação repetida idempotente. Somente estados e notas **sintéticos**, nunca dados pessoais.

Axe-core **4.14.0** foi executado em 390/1280. O teste encontrou **zero violações confirmadas**, registrou separadamente `violations`, `incomplete` e `passed` e reavaliou por rolagem os elementos inicialmente encobertos. Nem todo contraste inconclusivo pôde ser convertido em aprovação: a evidência de `unresolvedAfterScroll` é mantida no JSON e **não é tratada como WCAG aprovada**. A primeira CI da PR [43734886715](https://github.com/Talksxb/agu-quiz/actions/runs/43734886715) interrompeu a execução por exigir indevidamente zero inconclusivos depois da rolagem em `.agu-deck-identity`; a mudança posterior foi exclusivamente no **relatório/assertiva do teste**, sem atenuar violações reais. As capturas e os relatórios sintéticos estão no artefato `agu-s20-chromium-viewports`, ID **14169917010**, `artifacts-leg11/flashcard-caderno-{320,360,390,430,1280}.png`, `axe-{390,1280}.json` e `jornada.json`. A transferência de ZIP para inspeção local retornou HTTP 503 no ambiente, logo **não se afirma inspeção manual dessas capturas**. Sem teste em Android físico/TalkBack.

## Publicação confirmada

[Pages deploy 43735489237](https://github.com/Talksxb/agu-quiz/actions/runs/43735489237): **aprovado**. [CI da main 43735490236](https://github.com/Talksxb/agu-quiz/actions/runs/43735490236): **três jobs aprovados**, Node, Chromium completo e `pages-publicado` em HTTPS nas cinco larguras, inclusive LEG11. Artefato da jornada pública `agu-work01-publicado` ID **14170411728**; Chromium da main `agu-s20-chromium-viewports` ID **14169648091**.

`node tests/sprint21-pages.cjs` foi reexecutado após o deploy: HTTP 200, `index.html` e **nove scripts** (mais CSS dos baralhos e script de questões), bytes e SHA-256 correspondentes ao checkout. Endereço: **https://talksxb.github.io/agu-quiz/**.

| Arquivo | SHA-256 da publicação |
| --- | --- |
| `index.html` | `8181f7c7fed7a83ee73736546a0088c7226ee9c26ce3e969bf704749fc27b446` |
| `revisao-inteligente.js` | `b12417eb7062a672e9236b600eaff01a361cdb68d8a8655ffcbbdee8ffd49419` |
| `leitor-juridico.js` | `1f119fb84c092b00a994943a1f0f09d85dcc6efabb6b85df536a3b3189a48c04` |
| `backup-local-s20.js` | `8f1884ab63c2d6e4bb3bca753d01607a29abedf07e60d61ecb6f1c464a07f4f9` |
| `dados/legislacao-s13.js` (intocado) | `c038fc9416d1b441aa710bb970eb8428a92008f197ca367ea09df53f6c45f51a` |

Limitações concretas: testes sintéticos não substituem Android/TalkBack; a revisão de contraste tem inconclusivos documentados; não houve inspeção manual das imagens por falha HTTP 503 ao baixar o ZIP. Sem bloqueio funcional conhecido para o fluxo validado em HTTPS. Handoff exclusivo, **não executado**: `docs/PROMPT_LEG-12.md`.
