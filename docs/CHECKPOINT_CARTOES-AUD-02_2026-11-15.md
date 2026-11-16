# AGU Quiz — CARTOES-AUD-02 | segundo lote de flashcards históricos atualizados

Data de referência: 15/11/2026 (São Paulo). Uma única sprint autorizada: **CARTOES-AUD-02**. Não foi executada UX09, LEG17, CARTOES-AUD-03 nem qualquer auditoria privada. Corte jurídico pedagógico: **04/11/2026**. A checagem pontual de textos públicos não constitui certificação integral da vigência normativa.

## Retomada e concorrência

- Fonte pública `Talksxb/agu-quiz`; `origin/main` e `git ls-remote` na abertura: **`164ad3446acd2cd23f53e41c96777312ae15aec0`**, contendo a [PR #43](https://github.com/Talksxb/agu-quiz/pull/43) de CARTOES-AUD-01 e a [PR #44](https://github.com/Talksxb/agu-quiz/pull/44) da biblioteca CC/CPC. Nenhuma PR aberta na checagem inicial. Branch isolada `cards/aud02-prova-2015` criada diretamente desse HEAD; nenhuma mudança concorrente descartada.
- Retomados `docs/PROMPT_CARTOES-AUD-02.md`, checkpoint CARTOES-AUD-01, checkpoints UX01–08, LEG07–16, WORK01, módulos, workflow, testes e fixtures. A biblioteca de legislação CC/CPC recém-integrada foi preservada. A auditoria privada `Talksxb/agu-auditoria` **não foi consultada**; dados vieram somente dos documentos históricos de prova e fontes jurídicas públicos.
- Produção **antes da sprint**, verificada por `node tests/sprint21-pages.cjs`: HTTP 200 e hashes idênticos à `main` para HTML, 11 scripts, CSS e questões. Hashes de base: `index.html` **`6ec95383253e2ce540e154230236de0b43ed43a39c20a644f223eb3ae9d45a0a`**, `revisao-inteligente.js` **`49f45191fd46c3cc4664dc884e9d859e65624607cce5c6ddd1f518e5940d347d`**.

## Seleção jurídica (prova pública de 2015, caderno `187AGU_001_07`)

Fonte histórica: [caderno Cebraspe](https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/187AGU_001_07.pdf) e [gabarito definitivo](https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/Gab_Definitivo_187AGU_001_07_SUPER-A4.pdf). Os números abaixo são apenas localizadores; nenhuma formulação literal da banca é republicada nas cartas. O gabarito de 2015 não substitui o fundamento jurídico atual.

| Q histórica e gabarito | Carta autoral / código | Fonte atual conferida pontualmente | Estado da atualização e limite |
| --- | --- | --- | --- |
| Q2, E | `aud02-2015-flc-02-002` / CON-50 | [Decreto 12.540/2025, Anexo I, arts. 30, V e XI, e 35, I–IV](https://www2.camara.leg.br/legin/fed/decret/2025/decreto-12540-30-junho-2025-797673-anexo-pe.pdf) | Estrutura da AGU posterior à prova. A carta distingue proposta técnica de uniformização e decisão submetida ao AGU; não reconstrói todo o regime de 2015. |
| Q3, C | `aud02-2015-flc-02-003` / CON-50 | [Decreto 12.540/2025, Anexo I, art. 36, III, b](https://www2.camara.leg.br/legin/fed/decret/2025/decreto-12540-30-junho-2025-797673-anexo-pe.pdf) | Câmara atual de Mediação e Conciliação e conflito federal–municipal. Competência não garante admissibilidade ou acordo. |
| Q9, E | `aud02-2015-flc-02-009` / ADM-27 | [CF/1988, art. 37, X](https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html) | Fundamento constitucional **preexistente em 2015**: reserva de lei específica remuneratória. Não se inventou alteração posterior. |
| Q12, C | `aud02-2015-flc-02-012` / ADM-25 | [ON AGU 40/2014, I–II](https://www.gov.br/agu/pt-br/composicao/cgu/cgu/conuni/camara-nacional-de-convenios-e-instrumentos-congeneres-cncic), [Decreto 11.531/2023, art. 8º](https://legis.senado.leg.br/norma/37049341/publicacao/37054330) | Apostila anual para indicação orçamentária, distinta de alteração material de convênio. Decreto e disciplina complementar posteriores à prova; não se presume regime idêntico para todo tipo de parceria. |

**Não promovidos neste lote:** Q4 (TAC exige cotejo normativo mais granular), Q5 e Q6 (ambiguidade/deduplicação com adaptação oficial S19 e cartão de motivação preexistentes), Q7 e Q8 (atos regulamentares e taxonomia própria requerem revisão editorial), Q16 (risco de PPP depende de matriz contratual), Q20, Q24 e Q36 (exigem investigação jurídica independente). Q2/3 e Q9 foram aproveitados com base corrente suficiente, sem reivindicar atualização posterior em todos os casos. Nenhum cartão ou questão oficial anterior foi alterado.

## Patch e invariantes

- Novo `dados/flashcards-aud02-2015-atualizados-lote02.js`: quatro cartões originais, com pergunta, resposta, fonte pública, armadilha, caso breve, referência histórica e ausência expressa de oficialidade, nível cognitivo inferido ou `deviceId` inventado.
- `index.html` carrega o lote 02 **antes** do motor e usa versão de cache específica; `revisao-inteligente.js` valida o lote, anexa IDs únicos, preserva os 44 anteriores e estende o índice histórico **da mesma** lista LEG11 para permitir marcação voluntária “Para meu caderno”. `CON-50` usa tema granular já documentado, `ADM-25` e `ADM-27` mantêm `topic:null` no caderno.
- Acervo após o patch **48 cartões / dez baralhos**: ADM-06 12, ADM-13 4, ADM-23 4, ADM-25 5, ADM-27 1, ADM-58 1, CON-02 2, CON-24 1, CON-50 8, PC-03 10. São 14 disciplinas públicas, três com cartões; **14 níveis cognitivos originais** (2:7, 3:6, 4:1), **34 sem nível**. A contagem pode mudar legitimamente em sprints futuras.
- Nenhuma modificação em 412 IDs curriculares, matriz, questão/gabarito oficial, plano, estatística/frequência, intervalos `DAYS=[1,7,21,45]`, backup, catálogo ou leitor. `agu-review-v1`, chave `agu_quiz_revisao_inteligente_v1`, `librarySession`, tentativa única voluntária por sessão e histórico sem agenda preservados. Backup S20 de **nove categorias** com limite de 12 MB UTF-8, importação de revisão de 3 MB e uma única `forNotebook` continuam inalterados.
- Fixture nova `tests/fixtures/cartoes-aud-02-delta.json` encadeia o baseline de CARTOES-AUD-01 **depois de** CÓDIGOS-CC-CPC-01. Fixtures anteriores não foram reescritas. Baselines JS/CSS protegidos que não mudaram são travados por hash. Testes históricos comparam a cadeia até o novo HEAD, preservando suas provas originais.

## Testes e portões

- **32 suítes Node `tests/*validacao.js` passaram localmente**, inclusive `tests/cartoes-aud-02-validacao.js` (cinco grupos: proveniência, contagem, caderno, avaliação voluntária, fixture), além das UX/LEG/S20 precedentes. `node --check` deve validar os scripts novos na CI.
- `tests/cartoes-aud-02-browser.cjs` adicionado ao workflow para Chromium real em 320/360/390/430/1280, tecla Enter/Espaço, seleção por filtro, frente/verso, rating único, caderno, reload, backup e overflow; axe em 390/1280 com separação de `violations`, `incomplete` e `passed` e capturas sintéticas. Os roteiros anteriores continuam. **Chromium local não foi executado** porque o ambiente não dispõe de `axe-core` instalado; somente resultados efetivos da CI poderão ser declarados. **Android físico/TalkBack não testados**.
- Novos hashes locais: `index.html` **`84eda7e467a4de9b4358adcc828844a5737f0879110d5759747d1b1387adb5d6`**, motor **`888b4fada02c4e7123eef90cebd09e2e0ec81626afd4c925899cd1b6a4d8a7c2`**, dados lote 02 **`9a9cc20420fc812a4dc803a487b089bc07e15e4f457428705d510120a3bd9e03`**. Esses são hashes de branch, **não publicação HTTPS** até merge+Pages.
- Entrega sujeita a CI Node/Chromium **verde**, PR sem conflito, preservação de backup/revisão/proveniência e confirmação posterior de Pages via HTTPS/SHA e jornada publicada. Se falhar, **PR fica em rascunho, sem merge**. Resultados de PR/CI/Pages e qualquer concorrência devem ser registrados **apenas depois de observados**.

**Próximo handoff autossuficiente, não executado:** `docs/PROMPT_CARTOES-AUD-03.md`.
