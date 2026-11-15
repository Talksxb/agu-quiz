# AGU Quiz — checkpoint UX-BARALHOS-08 | Portão de evidência independente

Data de referência: 15/11/2026 (America/Sao_Paulo). Execução expressamente autorizada **somente da UX08**, uma sprint. **Resultado: fechamento documental, sem patch no produto**, pois os gatilhos de evidência nova não se concretizaram. UX09 não foi executada.

## Retomada, fonte e concorrência

- Repositório público: <https://github.com/Talksxb/agu-quiz>; Pages: <https://talksxb.github.io/agu-quiz/>. `main` na abertura: **`9b354559fa06ea48b318d69c15be2c625bb289a3`**, árvore **`9d085448e39df4faae99492be7128498d4edb474`**. A consulta remota não encontrou PR aberta no início da UX08. Confirmada a integração documental da UX07 nas PRs **#35** e **#37** e a **LEG14** posterior, PR **#36**, integrada nesse HEAD. As três são históricas e nenhuma representa execução da UX08.
- O workflow Pages **[`43765481517`](https://github.com/Talksxb/agu-quiz/actions/runs/43765481517)** estava `success` para `9b354559...`, depois da LEG14. A LEG14 foi apenas documental, sem Android/TalkBack independente nem defeito novo de acesso ao caderno; não modificou os arquivos do produto. A UX08 não reescreveu arquivos de LEG14 ou outras branches.
- Lidos os checkpoints **UX01–07**, prompt UX08, registros **LEG07–13**, **LEG14** (mudança posterior), **WORK01**, fixtures e workflow S20. Inspecionados `index.html`, `revisao-inteligente.js`, `baralhos-ux.css`, `catalogo-disciplinas.js`, `planejamento-semanal.js`, `meu-estudo.js`, `estudo-integrado.js`, `leitor-juridico.js`, `backup-local-s20.js`, `questoes-leitor-s18.js`. Auditoria privada **não consultada**.

## Inventário recontado e decisões de não implementar

- **36 cartões autorais com IDs distintos em seis baralhos:** `ADM-06` 12; `ADM-13` 4; `ADM-23` 4; `CON-02` 2; `CON-50` 4; `PC-03` 10. **14 disciplinas públicas**, três com cartões; campo cognitivo original `level` 2:7, 3:6, 4:1, ausente:22. **Nove categorias S20**. São contagens observadas nesta base, não limites fixos para futuras sprints pedagógicas autorizadas.
- O contrato `AGUReview.exactDeck(topic)` exige **igualdade literal** com ID granular de baralho publicado. As tarefas do `AGUPlanner` mantêm chaves amplas como `ADM/Atos administrativos`; os atalhos da `AGUHome` tampouco demonstram código granular próprio da tarefa. **Nenhum par público inequívoco foi encontrado**. Não foi criado atalho por aproximação, título, dispositivo, frequência ou quantidade de cartões. Eventual mapa amplo → granular exige decisão pedagógica e autorização específica. Navegar nunca deve executar `change`, `ensure`, `next`, minutos, conclusão ou revisão.
- `AGUDisciplines.verifiedFrequency()` continua API opcional sem dados finais verificados. Não se usou estatística privada/provisória nem se atribuiu selo Cebraspe, prioridade ou frequência. A dificuldade cognitiva 2/3/4 não foi convertida em classificação pedagógica 1–3. Nenhum cartão, questão, legislação, gabarito, fonte, matriz de 412 IDs ou certificação foi alterado.
- Revisão preservada: chave `agu_quiz_revisao_inteligente_v1`, esquema `agu-review-v1`, `librarySession` opcional, `reviewInfo`/`attemptsInfo`, `DAYS=[1,7,21,45]`. A importação parcial de até **3 MB** incorpora tentativas sem substituir `cards[id].seen/stage/due`; tentativa sem agenda local não vira inédita ou vencida. Somente rating voluntário agenda, uma avaliação por cartão/sessão. Filtros, navegação, leitura e reload não avaliam.
- Backup S20: **nove categorias**, até **12 MB UTF-8**, restauração das categorias **ausentes**. Lista única `forNotebook` na categoria `agu_leitor_juridico_s13_v1`, origens `leitor`, `estudo_integrado`, `questao_verificada`, `flashcard_existente`; sem segunda nota automática nem `deviceId` inferido. Nenhum backend, login, sincronização, analytics ou outra chave foi criado.

## Portão assistivo e evidência visual

- **Android físico, TalkBack real e perfil assistivo independente não foram disponibilizados**. O ambiente não apresentou executáveis `adb`, `emulator`, `avdmanager`, `sdkmanager`, `scrcpy` ou `orca`. Não foram observados modelo de aparelho, gesto de leitor de tela, ordem de anúncio em TalkBack ou compreensão humana dos estados. O Chrome/CDP compartilhado não foi tratado como novo aparelho ou perfil independente. **Aceite assistivo permanece pendente.**
- Os registros de CI UX04/05, LEG11/13 e UX07 permanecem como evidência automatizada histórica. Na UX05, axe em **390/1280 CSS px** relatou **zero violações automatizadas confirmadas**, **uma regra** `incomplete` e **nove nós persistentes** inconclusivos *por largura*, após rolagem; LEG11 relatou **12 nós** persistentes por largura. Regra e nó são unidades diferentes. `incomplete` **não é aprovação nem violação comprovada** e zero violações não certifica WCAG.
- O ZIP UX05 **`14174408511`** consta nos registros, mas a UX07 documentou rejeição da rota binária pelo conector e impossibilidade de baixá-lo pela navegação pública sem login. Nenhum PNG original chegou a esta execução por acesso autorizado. Portanto **não houve inspeção manual de pixels, cor, oclusão ou contraste**, nem fundamento para alterar CSS. Solicitar cópia inspecionável sem dados pessoais ou sessão autorizada de acesso é o portão remanescente; não tentar contornar autenticação.
- **Não se repetiu uma rodada E2E Chromium idêntica apenas para gerar contagem**, pois inexiste falha ou ambiente novo. A CI da PR documental deve rodar as regressões históricas em contextos sintéticos; isso não substitui Android físico/TalkBack nem constitui uma nova validação manual.

## Verificação executada e produção de partida

- **31/31 suítes Node** existentes `tests/*-validacao.js` aprovadas no checkout, incluindo contratos UX e LEG. `node tests/ux-baralhos-05-validacao.js` confirmou o inventário e os invariantes de importação, sessão, caderno e backup. Nenhum fixture ou hash histórico foi editado.
- `node tests/sprint21-pages.cjs` aprovou HTTPS **HTTP 200**, bytes idênticos e SHA-256 do `index.html`, scripts, CSS e módulo de questões com a produção **já publicada** após LEG14. Hashes SHA-256 integrais:

  | Asset | SHA-256 HTTPS |
  | --- | --- |
  | `index.html` | `e33885e0469ce760408e1b7d7d03c2d8bcaa753dad0f237bfd745777bf0aef24` |
  | `revisao-inteligente.js` | `fe6b8dcacc7363fd661055e737c73c443f1428d2b97e807faeb37e447650252c` |
  | `baralhos-ux.css` | `de772af0e639f70f57bc4ea8d6bf59fd9cd6971463ae936f9a74d390be42d3b7` |
  | `catalogo-disciplinas.js` | `261b2b425ed8d6f41400e59d4e0545cbeb5b2292f6f4da250a39f4c2fa915ae3` |
  | `planejamento-semanal.js` | `b11788273caf97a35d155be1b60d42dbb7f302b6aa55912f1f4e6942436bbc7b` |
  | `meu-estudo.js` | `e88aa5ee7cb77a5f4e193f690830c803604dcda1b3d2e6fe53e0d8285bed43de` |
  | `estudo-integrado.js` | `82fafd24b164c5d5f4a9fc37ad2bcad90c81d1755bdb9b53ea853f23fd724fc9` |
  | `leitor-juridico.js` | `1f119fb84c092b00a994943a1f0f09d85dcc6efabb6b85df536a3b3189a48c04` |
  | `backup-local-s20.js` | `8f1884ab63c2d6e4bb3bca753d01607a29abedf07e60d61ecb6f1c464a07f4f9` |
  | `questoes-leitor-s18.js` | `f4095116ca5bf0b31bd76ca323a88a7b8a1e0b079d100da9981d1f8f6d943c3f` |

- Verificação pública foi de assets HTTPS; **não foi feita jornada completa e mutável no endpoint publicado** em contexto independente nesta sprint. Os arquivos do produto são byte a byte iguais aos já validados, mas isso não supre o aceite humano assistivo.

## Entrega e gate

Esta branch acrescenta **somente** este checkpoint e `docs/PROMPT_UX-BARALHOS-09.md`. Sem patch de HTML/JS/CSS, sem novo fixture, sem dados pessoais. PR/CI/merge, HEAD final, eventual concorrência posterior e Pages pós-merge serão complementados **somente depois de observados**, nunca presumidos. Em caso de CI vermelha, conflito ou risco a backup, privacidade, revisão ou origem jurídica, a PR deve permanecer rascunho.

**Decisão:** não iniciar UX09 automaticamente. Seu handoff exige evidência realmente nova e autorização expressa; sem isso, manter o portão assistivo/curricular aberto, em vez de repetir sprints documentais com simulações idênticas.

## Fechamento remoto verificado — PR, CI, merge e Pages

1. A branch remota **`ux/baralhos-08`** partiu exatamente da `main` `9b354559fa06ea48b318d69c15be2c625bb289a3`. O commit documental da [PR **#38**](https://github.com/Talksxb/agu-quiz/pull/38) foi **`8835dd2798d194e53ba3ceba379dc67144430d53`**, com árvore `c6b6cf211d9f96b9b376f20040bc1a670b1dcac4`. A PR teve **dois arquivos adicionados**, exclusivamente `.md`, sem alterações no runtime ou fixtures.
2. A [CI **`43765957784`](https://github.com/Talksxb/agu-quiz/actions/runs/43765957784) terminou **`success`** para o commit exato: `integridade-node` **success** (job `132970971936`), `navegador-chromium` **success** (job `132970972143`) e `pages-publicado` **skipped** corretamente por evento de PR. Isso comprova **regressão histórica em CI**, não um ensaio Android/TalkBack novo. O GitHub informou `mergeable:true` antes de tirar o rascunho; sem conflito, a PR foi mesclada na `main` em **`45500690203bf4c8c31b96c1a30c69ff6e3eb993`**.
3. O [deploy Pages **`43766272734`](https://github.com/Talksxb/agu-quiz/actions/runs/43766272734) terminou **`success`**, apontando exatamente ao merge `4550069...`. Após esse evento, a verificação independente `node tests/sprint21-pages.cjs` voltou a aprovar **12 recursos HTTPS HTTP 200**, com bytes e SHA-256 correspondentes ao checkout; `index.html e33885e...`, motor `fe6b8dca...`, CSS `de772af0...` e demais hashes permanecem na tabela acima. **A entrega está em Pages**, e não apenas em PR.
4. Em nova consulta de metadados durante a UX08, os artefatos originais de CI foram identificados como não expirados: UX05 **`14174408511`** (10.314.121 bytes, digest `sha256:724941f9d20e46c854c169e4c2830bf153dbf0e831d32eaf0e9257f4cd8d5b31`) e LEG11 **`14170626397`** (8.346.920 bytes, digest `sha256:d1a69a4adbbdaf3513942f7f0e7c988a3bc6f58f331f0e2c96480310ddcba08e`). **Metadado disponível não equivale à abertura de PNG**, que continuou ausente. Não houve nova classificação de contraste.
5. O fechamento foi acrescentado em uma PR documental sucessora, sem alterar `docs/PROMPT_UX-BARALHOS-09.md`, assets ou evidências históricas. Seu resultado final e o HEAD pós-fechamento devem ser conferidos nos registros reais dessa PR antes de assumir a `main` atual; não são antecipados aqui.
