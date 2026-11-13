# AGU Quiz | CHECKPOINT — Sprint 28
## Revalidação documental, regressões sem defeito novo e limites de hardware/histórico

**Data:** 13/11/2026 (`America/Sao_Paulo`). **App:** `Talksxb/agu-quiz`, branch `main`. **Resultado:** **nenhuma falha nova reproduzida nos cenários efetivamente executados**; **zero alteração de código ou testes de produção** nesta sprint. Node local passou; Chrome local não inicializou por restrição do executor, enquanto o último CI de código **continua sendo S27**, identificado expressamente como evidência anterior, **não como rerun S28**. Checkpoint e prompt S29 apenas. **Sprint 29 não iniciada.**

## 1. Baseline e fontes reabertas

- **HEAD inicial S28:** [`71b3acd679febfd30eeb8b4972e06cfae94dae40`](https://github.com/Talksxb/agu-quiz/commit/71b3acd679febfd30eeb8b4972e06cfae94dae40), fechamento documental S27. O código S27 testado havia sido publicado em [`3031138f0a4a17b984b3a309fbeb28968b201e7e`](https://github.com/Talksxb/agu-quiz/commit/3031138f0a4a17b984b3a309fbeb28968b201e7e). Blobs atuais conferidos com arquivos de trabalho: `backup-local-s20.js` **`312ea5a48e9e01e117066dbec515f89ddee51e12`**, `tests/sprint27-validacao.js` **`edf2aa066ca01e9ccc3a6405f610dc1bfec3ca12`**, `index.html` **`9fb55aab363a71eefc4cd0eca8e889149f782b28`**. Não há código novo S28.
- **Leitura:** `docs/CHECKPOINT_SPRINT27_INTEGRIDADE_LEITOR_RECUPERACAO_2026-11-13.md`, `docs/GUIA_BACKUP_LOCAL_S21.md`, `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`, checkpoints S19–S26, prompt S28; módulos `index.html`, backup, Leitor, Caderno, Estudo Integrado, Revisão, Planejamento, Consolidação, Questões S18, dados S18/S19; testes Node S19/S20/S25/S26/S27, E2E S20–S24, axe S22/S23/S24, comparador Pages e workflow.
- **Auditoria privada, somente leitura:** `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `checkpoints/AUD03-019.json`, `evidencias/normativa/NORM-INT-029.json` e metadados da matriz de trabalho. No início e na última verificação desta sprint, **`AUD03-019`** permanecia efetivamente integrado: **412 IDs únicos**, 14 disciplinas, **125 lotes normativos integrados de 126 persistidos**, **354 IDs com alguma evidência**, **58 sem**, 5.914 referências, 837 pendências sem URL, **zero tópicos certificados integralmente**. `NORM-INT-029` (INT32) continuava **persistido, sem integração** no corte. SHA matriz-base `0952205a07818cda0a9ccca6dacdf340afcc6db8`; matriz de trabalho AUD03-019 `98fd40ad8dffea03224be586bfe72cf5f864bdff`. Nenhuma alteração no repositório privado.

## 2. Classificação dos testes, riscos e limitações

| ID | Classe | Gravidade / efeito | Reprodução ou observação S28 e decisão |
|---|---|---|---|
| **S28-001** | **`risco` controlado, sem falha nova** | Alta se backup perder dados | **Node v24.22.1 local** executou `tests/sprint19-validacao.js` **26/26**, `sprint20-validacao.js` **41/41**, `sprint25-validacao.js` **3/3 cenários**, `sprint26-validacao.js` e `sprint27-validacao.js`, todos com **exit 0**. S25: 650 registros acentuados **13.213.211 bytes** vs 6.712.561 caracteres, JSON compacto **11.999.987** vs formatado **12.000.013 bytes**, recusa de arquivo acima de 12 MB e restauração pequena com SHA preservado. S26: seis valores de nota inválidos rejeitados, texto de 14.000 caracteres aceito, sem sobrescrita. S27: cinco estados falsificados rejeitados sem escrita e duas notas válidas de artigos diferentes preservadas com SHA, idempotência. Nenhuma falha nova reproduzida, portanto **nenhum patch S28**. |
| **S28-002** | **`risco` / prova Chromium de run anterior** | Média — execução nova local bloqueada | Foi tentado `node tests/sprint20-browser.cjs` localmente: Playwright não encontrou seu `chromium_headless_shell-1234`. Segunda tentativa forneceu o Chromium instalado **156.0.8078.79**, mas o processo abortou em `socket() failed: Operation not permitted (1)`. **Nenhum teste E2E local novo** foi concluído. O último E2E Chromium real verificado é o **CI S27**, consultado em logs e ZIP, não um novo run S28. |
| **S28-003** | **`risco` / axe `incomplete`** | Média — não há prova WCAG global | O ZIP sintético do CI S27 foi relido: Chromium **158.0.8127.18**, axe-core **4.14.0**, **26 scans**, `violations:[]`; **13 cenários/19 nós** `color-contrast incomplete` por `elmPartiallyObscured`, mas **19/19 `passed` após rolagem horizontal**. Touch **emulado** em 320/390/430 registrou zero tentativas indevidas; foco por teclado e `.focus()` foi coberto em 320/360/390/430/1280. **Sem certificação WCAG**, sem avaliação TalkBack real e sem patch de cores. |
| **S28-004** | **`nao_testado_android_fisico`** | Média — hardware indisponível | Sem dispositivo fisicamente acessível/autorizado, sem `adb`, modelo, versão Android/Chrome, densidade, teclado virtual, toque físico e TalkBack aferidos. Roteiro humano S24 permanece disponível; Chromium desktop não foi chamado de aparelho real. |
| **S28-005** | **`nao_testado_backup_historico_real`** | Média/alta — compatibilidade retrospectiva desconhecida | Não houve entrega voluntária/autorização para arquivo pessoal histórico. Nenhuma nota, matriz privada, resposta ou cópia real foi aberta ou enviada. Ensaios só sintéticos. Em conflito entre aparelhos, preservar ambas as cópias e não fundir automaticamente. |
| **S28-006** | **`risco` de capacidade e estado antigo** | Média/alta — recuperação acima de 12 MB não solucionada | O contrato mede **12.000.000 bytes UTF-8**, recusa exportação/importação excessivas e evita sobrescrever categorias. Ainda **não oferece backup integral** para estado maior que o limite nem saneamento automático de `localStorage` já corrompido. Não introduzir particionamento, compressão, migração ou limpeza sem especificação e consentimento separados. |
| **S28-007** | **`risco_juridico`** | Alta para gabarito ou certificação | Q1 `of-2015-adv-001` permanece fora da nova correção automática; `confirmado_pontualmente` não vira `certificado_integralmente`. Auditoria 3 segue com zero certificados; nenhuma fonte, questão ou matriz privada foi promovida/publicada. |

**Decisão técnica:** as regressões acessíveis passaram dentro do recorte, nenhum defeito adicional foi demonstrado e a política do projeto veda mudanças especulativas. Não se criou `tests/sprint28-*` nem se alterou `backup-local-s20.js`, cache, telas, conteúdo ou workflow. Não se disparou novo CI por alteração artificial de código.

## 3. Último CI real, evidência anterior e Pages

**CI de código mais recente efetivamente executado:** [**GitHub Actions S27 43437067178**](https://github.com/Talksxb/agu-quiz/actions/runs/43437067178), sobre commit `3031138f0a4a17b984b3a309fbeb28968b201e7e`. **Não é execução nova S28.** Os jobs individuais foram reabertos nesta sprint:

| Job / ID | Resultado confirmado do run **S27** | Observação |
|---|---|---|
| `integridade-node` / **131924817650** | **`success`** | **Node v22.23.4**, S19 26/26, S20 41/41, S25/S26/S27 com regressões aprovadas; execução anterior do mesmo código agora revalidado localmente com Node v24.22.1. |
| `navegador-chromium` / **131924817210** | **`success`** | **Chromium 158.0.8127.18**, axe-core 4.14.0, E2E S20–S24 e axe S22/S23/S24. S22: **nove categorias**, SHA por categoria, perfil independente, reload, idempotência e não sobrescrita. S23: invalidade, quota, rollback, hashes. S24: **19/19 contrastes expostos passed**, foco, touch emulado. |
| `pages-publicado` / **131924817536** | **`success`** | HTTPS [AGU Quiz Pages](https://talksxb.github.io/agu-quiz/) **HTTP 200**, igualdade de SHA do HTML e **quatro scripts**, cache `backup-local-s20.js?v=20261113-s27a`. A quinta tentativa do run S27 confirmou a propagação. HTML SHA-256 `0eaa2a666e99f976b054bca5b6ec94eee67ecb7e642461e86ed685ed6ed07bc4`; backup SHA-256 `d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78`. |

**Último deploy Pages documental antes da S28:** [**43437656005**](https://github.com/Talksxb/agu-quiz/actions/runs/43437656005) — `success` sobre o fechamento S27. Não houve alteração no HTML/scripts na S28, de modo que os hashes acima são os mesmos da `main` inicial; a publicação documental S28 não equivale a rerun Node/Chromium.

**Artefato consultado:** [**14043993148**](https://github.com/Talksxb/agu-quiz/actions/runs/43437067178/artifacts/14043993148), ZIP sintético do CI S27 (**3.680.239 bytes**, **16 arquivos**: PNGs S20/S21, JSON axe S22/S23/S24, PNGs touch emulado S24). O relatório `axe-elementos-inconclusivos.json` foi relido e corresponde aos 26 scans, zero violations e 13 cenários/19 nós inconclusivos. O ZIP foi produzido pelo CI **S27**, não pela execução S28.

## 4. Contrato e invariantes preservadas

- Backup **`agu-portable-local-s20-v1`**, **nove categorias**, somente **`localStorage`**, sem login, banco, sincronização ou transmissão; restauração **apenas de categorias ausentes**, matriz importada via **`AGUValidateMatrix`**, hashes, idempotência e rollback de quota, limite de **12.000.000 bytes UTF-8** e sem sobrescrita.
- Exatamente **quatro destinos**: Início, Estudar, Biblioteca Inteligente e Evolução; jornada missão → planejamento → revisão → Caderno/Leitor → Evolução, retorno e refresh, sem tentativas não respondidas ou duplicadas nos cenários testados. Agenda **D+1/D+7/D+21/D+45**.
- Quatro questões auditadas `of-2015-adv-006/-007/-009/-048` com **E/C/E/C** histórico; **36 flashcards**; **24 referências oficiais catalogadas** (não certificadas integralmente); formato 2015 **C/E**, 2023 **A–E**, anuladas sem pontuação. Q1 `of-2015-adv-001` segue bloqueada até cotejo independente. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50 continuam como **excertos identificados**.
- Auditoria privada intacta e dados reais não acessados/publicados.

## 5. Tabela de arquivos, commits e pendências

| Caminho | Commit | Tratamento S28 |
|---|---|---|
| `backup-local-s20.js`, `index.html`, testes S19–S27, código dos módulos S18/S19, workflow | **`3031138f`** (código pré-existente S27) | **Sem alteração**. Hash do backup `312ea5a48e9e01e117066dbec515f89ddee51e12`; cache permanece `s27a`. |
| `docs/GUIA_BACKUP_LOCAL_S21.md`, `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md` | Commits anteriores | Lidos, preservados. |
| `docs/CHECKPOINT_SPRINT28_REGRESSAO_SEM_PATCH_2026-11-13.md` | Commit documental S28 | Este registro de testes, riscos, limites e jobs identificados corretamente. |
| `docs/PROMPT_SPRINT29_2026-11-13.md` | Commit documental S28 | Handoff integral sem executar Sprint 29. |

**Pendências:** `nao_testado_android_fisico`, `nao_testado_backup_historico_real`, contraste parcialmente `incomplete`/WCAG global, estado local >12 MB e histórico já corrompido sem migração, Q1 histórica, integração ainda pendente de `NORM-INT-029` na fotografia `AUD03-019`.

**Handoff exclusivo:** `docs/PROMPT_SPRINT29_2026-11-13.md`. **Sprint 29 não iniciada.** A Sprint 28 preserva o contrato do produto, registra os testes realmente executados e **não reivindica um novo CI Node 22/Chromium que não ocorreu**.
