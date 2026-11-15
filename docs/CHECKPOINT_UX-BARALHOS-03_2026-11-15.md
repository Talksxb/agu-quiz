# AGU Quiz — UX-BARALHOS-03 | Progressão verificável e ponte literal

Data de trabalho: 15/11/2026 (São Paulo). Escopo exclusivo UX03. Nenhum cartão, item de prova, dispositivo legal, comentário, gabarito, nível cognitivo ou ID curricular foi gerado ou alterado. Sem backend, autenticação, GPT Sites, sincronização ou nova categoria de dados.

## Reconhecimento e produção anterior

- `Talksxb/agu-quiz` `main` no reconhecimento: `a1fb2ca82f2985bda1a29d690dc52267fa3f994a` (merge UX02). HTML publicado por HTTPS: SHA-256 `04f611a4389014b1472b51b5c7c51ece78e54e0480ea660c9be9bf22b8ae2c0d`; `revisao-inteligente.js`: `1bd913fb205bcce518bdbbb97f242baf980e69a471e4a11069090a6ed8744366`; `baralhos-ux.css`: `de772af0e639f70f57bc4ea8d6bf59fd9cd6971463ae936f9a74d390be42d3b7`. Os três arquivos coincidiram com o checkout de `origin/main`.
- PR concorrente [LEG-11 #23](https://github.com/Talksxb/agu-quiz/pull/23) estava **aberta em rascunho** no reconhecimento (HEAD histórico `5273012f42b173730927bd915847371e508920c9`). **Foi mesclada durante a UX03** em `f28a9c16e0a9d26032ca6a8fb210cb46fd4b774f`, após ajuste da CI em `c236992...`. A branch UX03 foi reconciliada mediante merge comum, preservando sua origem `flashcard_existente`, leitor, backup, duas APIs contextuais e testes; nenhum trabalho da LEG11 foi descartado.
- Flashcards públicos: **36 IDs únicos, seis baralhos** — ADM-06 (12), ADM-13 (4), ADM-23 (4), CON-02 (2), CON-50 (4), PC-03 (10). Três disciplinas com cartões entre 14 do catálogo visual público. Níveis originais: 7 nível 2, 6 nível 3, 1 nível 4, 22 não informados. Nenhuma tradução pedagógica 2/3/4→1/2/3.
- Backup S20: **nove** categorias, até 12 MB UTF-8, restauração apenas de categorias ausentes; importação própria da revisão até 3 MB mescla somente tentativas. O esquema `agu-review-v1`, `reviewInfo`, `attemptsInfo`, `librarySession`, o armazenamento, `DAYS=[1,7,21,45]`, os históricos e os modos legados foram preservados.
- Sem evidência pública de ligação automática GitHub ↔ GPT Sites; GitHub segue fonte principal e Pages hospeda a versão estática. Não houve consulta aos dados privados da Auditoria 02 nem publicação de rankings.

## Defeito funcional comprovado

A UX02 preservava corretamente `cards[id].seen`, estágio e vencimento durante importação **parcial** de tentativas. Contudo, o filtro e a apresentação de `ineditos` consultavam **apenas** `seen`. Resultado reproduzido com dado sintético: o cartão `ri-con-01` podia ter tentativa importada identificável em `attempts`, porém `seen=0` e nenhuma agenda, e a biblioteca afirmava que ele nunca havia sido avaliado. Essa contradição aparecia também no cartão após retomar a sessão. Não se deve atribuir vencimento retrospectivamente a uma tentativa sem agenda importada.

### Correção UX03

1. **Índice derivado de leitura** sobre tentativas `flashcard` com ID existente e avaliação reconhecida; sem mudança de payload, chave, persistência ou migração. Preserva o contador `seen` da agenda original. A apresentação de avaliação histórica usa o maior entre o `seen` anterior e a quantidade de tentativas individualizadas: este é um limite inferior conservador quando o legado tem histórico incompleto, não uma taxa de domínio.
2. `ineditos` agora significa ausência de avaliação **em ambos** os registros; se só existe tentativa importada sem `seen`, o status é `sem_data`/“Avaliado sem data de revisão”, e não pendente/vencido. Contadores de baralho, resumo e texto de cartão foram alinhados. A interface explica expressamente que a importação não cria agenda nem domínio.
3. **Ponte pública literal** `AGUReview.exactDeck(topic)` retorna `{code,discipline,count}` somente se a string é **idêntica** ao código granular de um baralho real. IDs inexistentes, nomes aproximados, categorias amplas como `ADM/Atos administrativos` e `PC/Normas fundamentais` retornam `null`. API é de leitura. O cronograma `AGUPlanner`, a `AGUHome`, minutos e conclusão de tarefas não mudaram e **não há atalho específico** autorizado nesta base.
4. CSS, editor jurídico, notas LEG07–11, backup, importador, legislativo, questões e Estudo Integrado **não sofreram edições da UX03** (o merge LEG11 trouxe suas próprias mudanças, preservadas). Não apareceu `deviceId` granular verificável nos próprios cartões; vínculo de assunto/tema nunca é tratado como identidade de dispositivo. As marcações contextuais dos flashcards acrescentadas pela LEG11 continuam na única lista `forNotebook`, inclusive com `topic:null` onde não há vínculo temático documental.
5. `index.html` troca somente o cache do motor para `revisao-inteligente.js?v=20261115-ux03`. O CSS continua em `?v=20261115-ux02` sem alteração. Delta aditivo `tests/fixtures/ux-baralhos-03-delta.json` encadeia o delta **LEG11**, que por sua vez sucede UX02; nenhum fixture histórico foi reescrito.

## Testes e limitações

- **27 suítes Node** (`tests/*validacao.js`) passaram localmente após conciliação, abrangendo LEG01–11, UX01–03, WORK01 e S19–35. O novo `tests/ux-baralhos-03-validacao.js` reproduz importação sem agenda, reload, histórico extenso de 1.500 tentativas **sintéticas**, avaliação apenas em nova sessão, D+1/D+7/D+21/D+45, backup S20, ausência de link curricular presumido e hashes de preservação.
- `tests/ux-baralhos-03-browser.cjs` e CI ampliados para Chromium nos cinco viewports **320/360/390/430/1280**, teclado, foco, `aria-live`, `prefers-reduced-motion`, seleção de único cartão, interrupção/reload/retomada, histórico importado, agenda e planejamento intocados, backup e ausência de overflow; axe em 390/1280. A execução real de Chromium e eventuais inconclusivos só poderão ser afirmados após evidência do workflow; o ambiente local não tem `axe-core` instalado.
- Preservam-se testes anteriores de UX01/UX02, LEG10 e demais jornadas; `tests/sprint21-pages.cjs` exige a nova versão de asset apenas após merge e deploy.
- Nenhum ensaio em **Android físico ou TalkBack** foi efetuado. Nenhum histórico pessoal foi acessado.

## Portões de merge e publicação

Branch: `ux/baralhos-03`, originada da `main` inicial e reconciliada com `f28a9c1` (LEG11). PR/CI, eventual merge, deploy e hashes pós-publicação exigem registro factual após execução, sem antecipar estado de produção. **Não mesclar com conflito ou regressão de caderno, backup ou revisão.**

Handoff único: `docs/PROMPT_UX-BARALHOS-04.md`. A UX04 **não foi executada**.
