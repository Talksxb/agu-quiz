# AGU Quiz | CHECKPOINT — Sprint 29
## Ativação por Espaço no Leitor, recuperação local sem migração e acessibilidade condicionada

**Data:** 13/11/2026 (`America/Sao_Paulo`). **Aplicativo:** `Talksxb/agu-quiz`, `main`. **Resultado:** uma falha de ativação por teclado foi reproduzida no Leitor e corrigida em escopo mínimo; testes Node e Chromium do commit de código S29 concluídos com sucesso no CI real. Android físico, TalkBack e backup histórico pessoal **não foram testados**. Este registro encerra apenas a Sprint 29; a Sprint 30 é somente handoff.

## 1. Baseline, origem e disciplina de alteração

- **Predecessora documental:** [Sprint 28](CHECKPOINT_SPRINT28_REGRESSAO_SEM_PATCH_2026-11-13.md), commit `d664246456a700d40706a584c28b3b6b7145f1e1`, sem patch. Foram consultados checkpoints S19–S28 (ênfase S27/S28), prompts S27–S29, [guia de backup S21](GUIA_BACKUP_LOCAL_S21.md), [roteiro Android S24](ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md), módulos de aplicativo, dados S18/S19, testes S19/S20/S25/S26/S27, E2E S20–S24, axe S22/S23/S24 e workflow.
- **Commit de implementação S29 já existente em `main` ao iniciar esta revalidação:** [`29296f83dba6858ce1c794e975416a29e7b57811`](https://github.com/Talksxb/agu-quiz/commit/29296f83dba6858ce1c794e975416a29e7b57811), pai `d664246`. Inspecionados diff, blobs, testes e logs, sem reaplicar a mudança.
- **Seis arquivos do commit S29:** `leitor-juridico.js`, `index.html`, `tests/sprint29-validacao.js`, `tests/sprint29-browser.cjs`, `tests/sprint21-pages.cjs` e `.github/workflows/agu-sprint20-ci.yml`. Os dois últimos passam a testar também o script do Leitor publicado e S29. `backup-local-s20.js`, estruturas de armazenamento, dados, correção e conteúdo jurídico não foram alterados.
- **Mudança mínima do Leitor:** os elementos `.agu-unit[role="button"][tabindex="0"]`, antes acionáveis por clique/Enter, passaram a responder também a `event.key === ' '`, com `preventDefault()` para impedir rolagem pela tecla ativadora. O cache do script virou `leitor-juridico.js?v=20261113-s29a`; o de backup permanece `backup-local-s20.js?v=20261113-s27a`.
- **Rastreabilidade Git blob:** `leitor-juridico.js` `da16e2c22ee32eea7bf10a608a6962587ef76410`; `index.html` `6962f4b36c07848c96a8265221d7f9faf14a0187`; `backup-local-s20.js` `312ea5a48e9e01e117066dbec515f89ddee51e12`; `tests/sprint29-validacao.js` `98754317d5a9d5f95dc9fc50466f103d5dc52268`; `tests/sprint29-browser.cjs` `5b84de99795365be53ed274032c5fd6a09a4bc64`.

## 2. Diagnóstico com reprodução e classes de risco

| ID | Classe | Gravidade | Evidência observada / decisão |
|---|---|---|---|
| S29-001 | **`falha_reproduzida`**, corrigida | **Média** — acesso por teclado | Cenário: Leitor, artigo CF88:art37 com mais de uma unidade; foco na segunda `.agu-unit`, tecla Espaço. **Esperado:** selecionar e persistir a segunda unidade, sem rolar. **Observado antes:** `onkeydown` respondia somente a Enter; execução do teste S29 contra o `leitor-juridico.js` original do commit `d664246` terminou com `AssertionError: Espaço precisa impedir rolagem ao ativar role=button; false !== true` (exit 1). **Depois:** exatamente o mesmo teste sobre `29296f8` passou (exit 0), inclusive Espaço, Enter, tecla neutra e persistência. CI Chromium S29 passou com teclado real em 320/360/390/430/1280 CSS px, recarga e sem `pageerror`. Não se inferem TalkBack ou ordem de foco pós-ativação. |
| S29-002 | **`risco`** — integridade de backup | **Alta se houver perda** | Node S19 **26/26** e S20 **41/41**, S25/S26/S27 e S29 executados localmente com exit 0 (`Node v24.22.1`); os mesmos testes passaram no job Node `v22.23.4`. S25: 650 registros sintéticos, **6.712.561 caracteres / 13.213.211 bytes UTF-8**; JSON compacto **11.999.987** contra formatado **12.000.013 bytes**; restauração pequena com SHA conservado. S26: seis valores inválidos para notas rejeitados antes da escrita; string de **14.000 caracteres** preservada e importação idempotente. S27: cinco estados falsificados rejeitados, notas válidas de dois dispositivos preservadas com hashes e idempotência. Sem patch no backup. |
| S29-003 | **`risco`** — axe/foco/contraste | **Média** | CI real S22/S23: **26 scans**, **zero violations** no recorte, **13 cenários/19 nós** inicialmente `color-contrast incomplete` por `elmPartiallyObscured`. S24: **19/19 passed após rolagem horizontal/visibilidade**; não se apagam os `incomplete` originais nem se declara conformidade WCAG global. Foco em navegação horizontal nas cinco larguras e toque emulado (320/390/430), **zero tentativas** inesperadas. A semântica/foco real do Leitor com TalkBack e a retenção de foco após seleção permanecem para observação humana, não `passou`. |
| S29-004 | **`nao_testado_android_fisico`** | **Média** | Não houve aparelho Android fisicamente acessível com autorização específica; sem modelo, Android/Chrome, viewport/densidade reais, orientação, teclado virtual, toque físico ou TalkBack mensurados. Viewports de desktop Chromium não substituem dispositivo real. |
| S29-005 | **`nao_testado_backup_historico_real`** | **Média/alta** | Nenhum arquivo histórico pessoal foi entregue voluntariamente com autorização de ensaio. Somente estados sintéticos; sem prova de compatibilidade retroativa de dados reais, sem fusão de aparelhos. Preservar ambas as cópias em caso de conflito. |
| S29-006 | **`risco`** — estados acima do limite ou já corrompidos | **Média/alta** | Há limite estrito de **12.000.000 bytes UTF-8** do pacote formatado e dos critérios de validação; não há recuperação integral aprovada acima disso, nem saneamento automático de `localStorage` anteriormente corrompido. Não limpar navegador, dividir JSON manualmente, compactar ou desenvolver migração sem autorização. |
| S29-007 | **`risco_juridico`** | **Alta** | Questão histórica `of-2015-adv-001` permanece excluída de correção nova; validação pontual não é certificação integral. Nenhuma matriz privada, questão nova, gabarito ou fonte não cotejada foi publicada. |

## 3. Execuções verificadas e fronteiras de ambiente

**Local neste encerramento:** `node v24.22.1` aprovou `tests/sprint19-validacao.js` (26/26), `sprint20-validacao.js` (41/41), `sprint25-validacao.js` (3 cenários), `sprint26-validacao.js`, `sprint27-validacao.js` e `sprint29-validacao.js`. Teste de regressão contra o módulo **pré-patch**, fornecido em memória por `git show d664246:leitor-juridico.js` sem modificar arquivos locais, reproduziu falha `false !== true`. O teste sobre o módulo novo passou. Todos usaram dados sintéticos.

**Limitação local Chromium:** `node tests/sprint29-browser.cjs` não iniciou: Playwright não encontrou `chromium_headless_shell-1234`. Ao apontar explicitamente para `/usr/bin/chromium` (sem alterar teste), Chromium abortou em `socket() failed: Operation not permitted (1)`, na inicialização do perfil. Logo, **não há E2E local concluído neste executor**. O E2E posterior *real* de S29 foi executado por GitHub Actions, em ambiente próprio, sem confundir local, CI e Android.

**CI de código S29:** [run **43446560793**](https://github.com/Talksxb/agu-quiz/actions/runs/43446560793), concluído com **`success`**, sobre `29296f83dba6858ce1c794e975416a29e7b57811`. Jobs e logs individuais conferidos:

| Job | ID | Evidência no run |
|---|---:|---|
| `integridade-node` | **131957419112** | **success**, Node **v22.23.4**; S19 26/26, S20 41/41, S25/S26/S27 e S29 passaram. |
| `navegador-chromium` | **131957419098** | **success**, Chromium **158.0.8127.18**, axe **4.14.0**; E2E S20–S24, axe S22/S23/S24 e **S29 cinco larguras** passaram. Relatório S24: 26 scans, 19 elementos inicialmente `incomplete` e 19/19 `passed` após rolar; S29 Espaço/Enter/reload passou em cinco viewports. |
| `pages-publicado` | **131957419017** | **success**, após propagação (leituras iniciais ainda encontravam HTML antigo); URL HTTPS 200, hashes do HTML **e cinco scripts** coincidentes com checkout final. |

**ZIP sintético:** [artefato **14048515948**](https://github.com/Talksxb/agu-quiz/actions/runs/43446560793/artifacts/14048515948), nome `agu-s20-chromium-viewports`, **3.680.601 bytes**, `sha256:65f0bc3712a00584775f78cb325b06838517325524b893f8a96c9e23d761f4c0`, prazo do serviço indicado até **20/11/2026**. Os **metadados** e logs de criação foram verificados; não se afirma inspeção manual de cada arquivo do ZIP nesta sessão. Capturas e relatórios declarados pelo workflow são sintéticos, sem histórico pessoal.

**Pages ativo:** [https://talksxb.github.io/agu-quiz/](https://talksxb.github.io/agu-quiz/); também houve resposta HTTPS **200** em leitura independente do cabeçalho. Hashes SHA-256 confrontados com checkout e log `pages-publicado`:

| Recurso | SHA-256 |
|---|---|
| `index.html` | `0d521b3851a97254b03698ad0ac6f9a668422b37a31f6637c4b5882ae6a34fb0` |
| `revisao-inteligente.js` | `044ed4077209dc29cf478041592825d10a749b1b052b1568846bf13c4ebbbaab` |
| `planejamento-semanal.js` | `34e40e677eb2648f46909fbc3eb93be162d52392b797540d482bc0b631199d73` |
| `leitor-consolidacao.js` | `4ed853b6a862a103969b94440545db28a51cb060d44723d2c67387a236ee2b3f` |
| `backup-local-s20.js` | `d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78` |
| `leitor-juridico.js` | `70f2530dc7219a8f6d08807839e9cea9c133b47c511bb5df9a070f7c7d6484b1` |

**Pages automático adicional:** [43446561072](https://github.com/Talksxb/agu-quiz/actions/runs/43446561072), `success` sobre o mesmo commit. Push posterior apenas de documentação pode disparar Pages, **não equivale a rerun Node/Chromium**: o CI S29 acima é a referência comprovada.

## 4. Invariantes do produto e proteção de dados

- Backup `agu-portable-local-s20-v1`, **nove categorias catalogadas**, armazenamento exclusivamente `localStorage`, exportação JSON, SHA-256 por categoria, `AGUValidateMatrix` na validação curricular, inclusão **só de categorias ausentes**, nenhuma sobrescrita, importação idempotente, quota com rollback, limite real de **12 MB UTF-8**. Não houve teste de arquivo pessoal nem transmissão de conteúdo local.
- Quatro destinos principais preservados: **Início, Estudar, Biblioteca Inteligente, Evolução**. Jornada com missão, plano semanal, revisão, Caderno/Leitor e evolução; reload sem criação automática de tentativa. Revisão **D+1/D+7/D+21/D+45**.
- Questões auditadas `of-2015-adv-006/-007/-009/-048` com gabaritos históricos **E/C/E/C**; **36 flashcards**, **24 referências oficiais catalogadas**, sem alegação de certificação integral. **2015 C/E**, **2023 A–E**, anuladas sem pontuação. `of-2015-adv-001` bloqueada até cotejo de caderno/variante/gabarito/fundamentação. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50: **trechos identificados**, não certidões da íntegra.
- Nenhuma nova rota, pergunta aproximada, autenticação, banco, backend, sincronização, importação em lote, migração, fusão de aparelhos, envio de backups ou publicação da matriz privada.

## 5. Auditoria 3 privada — verificação de estado, sem cópia pública

Reabertos em **leitura** `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `checkpoints/AUD03-020.json` e `checkpoints/AUD03-021.json`; reconferidos SHA da matriz e metadados de `NORM-INT-029/030`. Na consulta, `main` da Auditoria estava em [`e5430db0d84cc5f813e7771c7db02a600cf190d5`](https://github.com/Talksxb/agu-auditoria/commit/e5430db0d84cc5f813e7771c7db02a600cf190d5), após o merge de `NORM-INT-030`.

- **Último checkpoint AUD03 efetivamente integrado:** `AUD03-021` (merge PR 158, `ba7f22d0a3f2f15b516c96dcbbed5dc6a04e4cb2`). `AUD03-020` já havia integrado `NORM-INT-029` (INT32). Logo, o estado **não é mais AUD03-019** da Sprint 28.
- **412 IDs únicos**, **14 disciplinas**, **355 IDs com alguma evidência / 57 sem**, **5.961 referências documentais**, **837 pendências acumuladas sem URL**, **zero certificados integralmente**, matriz-base intacta. `matriz_trabalho` blob SHA `c787793f0159aaad2ef5a0f852dc69b540fdb447`.
- **126 lotes normativos integrados** no `AUD03-021`; `NORM-INT-030` (INT33) está **persistido na main posterior**, mas ainda não consta como integrado à matriz nesse checkpoint. Fotografia atual: **126 integrados / 127 persistidos**, respeitando corte temporal. Indexações AUD02-029 em AUD03-021 **não criaram novas questões ou vínculos** e mantiveram divergências em quarentena.
- A matriz consolidada, evidências restritas e dados pessoais **não** foram copiados ao repositório público. `confirmado_pontualmente` não foi promovido a `certificado_integralmente`.

## 6. Encerramento e handoff

**Aceite de Sprint 29:** falha real com esperado/observado e teste pré-/pós-correção demonstrados; Node e CI reais identificados por versão/run/SHA; regressões de backup sem perda/sobrescrita sintética; Pages HTTPS e cache coerentes; `incomplete` distinto de `violation`; uso Android físico e histórico pessoal explicitamente não testados; juridicidade não promovida; sem novas funcionalidades ou infraestrutura.

**Pendências abertas:** Android físico e TalkBack com consentimento, backup histórico real voluntário em perfil isolado, inspeção humana de foco pós-ativação no Leitor, WCAG global não certificada, recuperação acima de 12 MB/corrupção prévia sem solução autorizada, conflitantes de aparelhos, Q1 legada, e integração de `NORM-INT-030` pela equipe responsável da Auditoria.

**Próximo documento (somente instrução, sem execução):** [`docs/PROMPT_SPRINT30_2026-11-13.md`](PROMPT_SPRINT30_2026-11-13.md). Nenhum teste/patch S30 foi iniciado neste fechamento.
