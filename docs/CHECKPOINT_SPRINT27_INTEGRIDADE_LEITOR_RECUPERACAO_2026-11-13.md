# AGU Quiz | CHECKPOINT — Sprint 27
## Integridade de identificadores do Leitor, recuperação não destrutiva e regressão acessível

**Data:** 13/11/2026 (`America/Sao_Paulo`). **Aplicativo:** `Talksxb/agu-quiz`, `main`. **Resultado:** uma falha efetivamente reproduzida, corrigida em escopo mínimo, testada em Node e acompanhada de regressões Chromium/axe/Pages reais. **Sprint 28 não iniciada.**

## 1. Baseline, fontes e estado jurídico reconfirmado

- **HEAD inicial S27:** [`0b30f2583939a3ce7a044e42bf9fa80bfad37738`](https://github.com/Talksxb/agu-quiz/commit/0b30f2583939a3ce7a044e42bf9fa80bfad37738), que publicou o checkpoint S26 e o prompt S27. Código S26: [`1f00cd04c672324e5fee7a7819078a3c2e548f71`](https://github.com/Talksxb/agu-quiz/commit/1f00cd04c672324e5fee7a7819078a3c2e548f71). O run S26 [43433536507](https://github.com/Talksxb/agu-quiz/actions/runs/43433536507) foi reaberto, incluindo jobs individuais **131912737834**, **131912738334**, **131912738377** e ZIP [14042295888](https://github.com/Talksxb/agu-quiz/actions/runs/43433536507/artifacts/14042295888), com três resultados `success`.
- **Fontes lidas:** checkpoints S19–S26, especialmente `docs/CHECKPOINT_SPRINT26_LEITOR_BACKUP_ACESSIBILIDADE_2026-11-13.md`, guia `docs/GUIA_BACKUP_LOCAL_S21.md`, roteiro humano Android S24, prompt S27; `index.html`, backup, Leitor Jurídico, Caderno, Estudo Integrado, Revisão, Planejamento, Consolidação, Questões S18 e dados S18/S19; testes S19/S20/S25/S26, E2E S20–S24, axe S22/S23/S24, `tests/sprint21-pages.cjs` e workflow. O código alterado foi comparado com os blobs preexistentes e reaberto depois do push.
- **Auditoria privada:** consulta **somente leitura** a `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `checkpoints/AUD03-019.json`, evidência `NORM-INT-029` e SHA da matriz de trabalho. Na consulta inicial e de fechamento: **`AUD03-019`** efetivamente integrado, 412 IDs únicos, 14 disciplinas, **125 lotes normativos integrados de 126 persistidos**, **354 IDs com alguma evidência e 58 sem**, 5.914 referências, 837 pendências sem URL e **zero tópicos certificados integralmente**. `NORM-INT-028` (INT31) entrou em AUD03-019 (PR 153); `NORM-INT-029` (INT32) está **persistido, não integrado** nesse recorte. SHA matriz-base `0952205a07818cda0a9ccca6dacdf340afcc6db8`; matriz de trabalho `98fd40ad8dffea03224be586bfe72cf5f864bdff`. Não editar ou divulgar a matriz.

## 2. Classificação de falhas, prova anterior e posterior

| ID | Classe | Gravidade / impacto | Evidência e decisão |
|---|---|---|---|
| **S27-001** | **`falha_reproduzida` → corrigida** | **Alta para a integridade de anotações** — restaurar arquivo malformado podia ocultar notas pessoais | **Antes do patch**, em VM Node com `dados/legislacao-s13.js`, `backup-local-s20.js` e `leitor-juridico.js` reais, uma categoria com `article:"ARTIGO-INEXISTENTE"`, dispositivo `CF88:art37:caput` e nota sintética era **aceita** (`validated:true`, `added:1`). Ao inicializar o Leitor, a rotina de recuperação aplicava `defaults()`, com **`notes={}`** na sessão; `originalNotes:1` e `notesAfterReaderLoad:0`. O novo teste S27 falhou deliberadamente antes da correção (`true !== false`, `registro inválido: artigo_inexistente`). **Correção mínima:** validar o artigo contra `AGU_LEGAL_CORPUS`, unidade pertencente ao artigo, chaves de notas vinculadas a unidades conhecidas, valores textuais S26 e estados opcionais `tab/mobile` reconhecidos. **Depois:** cinco casos inválidos rejeitados (`artigo_inexistente`, `unidade_inexistente`, `anotacao_sem_dispositivo`, `aba_desconhecida`, `painel_mobile_desconhecido`), `alteracoes:0`; nenhum dado existente substituído. Backup com **duas notas sintéticas de artigos distintos** importou corretamente, preservou ambas após carregar `AGULegal`, SHA-256 `88d13f8621ff3324cd7806415e6a81d23d2a0117f6ec751f2ea32ef43901eb9c`, segunda importação `added:0` e nenhuma sobrescrita. |
| **S27-002** | **`risco` controlado por regressão** | Alta se o patch rejeitasse backup válido ou relaxasse limite | Todas as suítes Node prévias passaram: S19 **26/26**, S20 **41/41**, S25 três casos reais de limite **em bytes UTF-8**, S26 seis rejeições não textuais e caso positivo de 14.000 caracteres. O teste de fronteira S25 manteve **11.999.987 bytes compactados → 12.000.013 formatados**, que não podem ser exportados. E2E S22 novamente passou nas nove categorias com SHA, perfil independente, refresh, idempotência e não sobrescrita; S21/S23 cobriram erros/quota e rollback. |
| **S27-003** | **`risco` residual de capacidade** | Média/alta — histórico acima de 12 MB | `agu-portable-local-s20-v1` rejeita arquivos > **12.000.000 bytes UTF-8** em vez de baixar pacote irrestaurável. **Não** houve compactação, particionamento, recuperação maior que o limite, sincronização ou fusão de versões. Preservar dados locais e verificar limites específicos dos módulos; não recomendar limpeza do navegador ou corte manual do JSON. |
| **S27-004** | **`risco` / `incomplete` de acessibilidade** | Média — cobertura amostral | Axe-core **4.14.0** em Chromium **158.0.8127.18**: **26 scans**, **zero `violations` nos cenários observados**; 13 cenários/19 nós `color-contrast` eram `incomplete` por `elmPartiallyObscured`. Após rolagem horizontal expondo os nós, **19/19 passaram**. Cinco larguras 320/360/390/430/1280 px com foco revelado por teclado e `.focus()`; touch **emulado** 320/390/430 com zero tentativas sem resposta. **Não significa certificação WCAG global.** |
| **S27-005** | **`nao_testado_android_fisico`** | Média — teste humano indisponível | `adb` não disponível; nenhum Android fisicamente conectado/autorizado nesta execução. Não registrar fabricante, versão, densidade, teclado virtual, toque físico ou TalkBack como testados. Emulação desktop não substitui o dispositivo. Roteiro S24 preservado para execução consentida. |
| **S27-006** | **`nao_testado_backup_historico_real`** | Média/alta — retrocompatibilidade e conflitos | Não foi fornecido backup histórico pessoal com autorização. Só houve arquivos **sintéticos**. Não afirmar compatibilidade de versões reais nem promover merge entre aparelhos; guardar ambas as cópias e avaliar somente em ambiente local descartável se houver consentimento específico. |
| **S27-007** | **`risco` jurídico** | Alta para integridade de acervo e certificação | `of-2015-adv-001` continua bloqueada na nova correção automática; zero tópicos `certificado_integralmente`. Evidência documental pontual não promove integralmente questão/tópico. |

**Limitação da intervenção:** o patch impede **importação** de estados inconsistentes do Leitor; não limpa nem corrige automaticamente algum `localStorage` antigo já contaminado e não demonstra migração histórica real.

## 3. Execuções reais, artefatos e correspondência Pages

**Commit S27 de código e testes:** [`3031138f0a4a17b984b3a309fbeb28968b201e7e`](https://github.com/Talksxb/agu-quiz/commit/3031138f0a4a17b984b3a309fbeb28968b201e7e). Após a publicação, a `main` e os blobs de backup, `index.html` e teste S27 foram lidos novamente para confirmar persistência.

**Run CI S27:** [**43437067178**](https://github.com/Talksxb/agu-quiz/actions/runs/43437067178), criado **após** o commit do código. Cada job foi consultado individualmente e teve log lido:

| Job / ID | Status real | Provas observadas |
|---|---|---|
| **`integridade-node` / 131924817650** | **`success`** | **Node v22.23.4**. S19 **26/26**, S20 **41/41**, S25 **3/3 casos** (UTF-8, formatação e restauração), S26 **seis rejeições + positivo 14.000 caracteres**, S27 **cinco rejeições de IDs/estados + positivo com notas em dois artigos**, sem perda, SHA e idempotência. No executor local, Node **v24.22.1** aprovou as mesmas suítes. |
| **`navegador-chromium` / 131924817210** | **`success`** | **Chromium 158.0.8127.18**, **axe-core 4.14.0**. E2E S20–S23, axe S22/S23, testes S24 de contraste/foco/touch emulado, cinco viewports. S22: nove categorias, arquivo, SHA-256, perfil novo, reload, idempotência e não sobrescrita. S23: truncado, excesso, versão, chave, dispositivo, quota, hashes e preservação. S24: 26 scans, 19/19 nós `passed` após rolagem e touch emulado sem tentativa nova não respondida. |
| **`pages-publicado` / 131924817536** | **`success`** | [Pages HTTPS](https://talksxb.github.io/agu-quiz/) **HTTP 200**, HTML + quatro scripts com SHA-256 **iguais ao checkout**. As quatro primeiras tentativas ainda encontraram HTML/cache S26; a **quinta** convergiu ao commit S27 e mostrou `PAGES_VERIFICADO`. `cache-control: max-age=600`. Cache alterado para **`backup-local-s20.js?v=20261113-s27a`**. HTML SHA-256 `0eaa2a666e99f976b054bca5b6ec94eee67ecb7e642461e86ed685ed6ed07bc4`, script de backup SHA-256 `d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78`. |

**Artefato S27:** [**14043993148**](https://github.com/Talksxb/agu-quiz/actions/runs/43437067178/artifacts/14043993148). ZIP **baixado e inspecionado** (3.680.239 bytes), **16 arquivos sintéticos**: dez PNG de viewports S20/S21, três JSON de diagnóstico S22/S23/S24, três PNG touch emulado S24. Os resumos JSON foram lidos: S23 `scans:26`, `violations:[]`, `color-contrast:13 cenários/19 nós incomplete`; S24 `initiallyIncomplete:19`, `afterScroll.passed:19`, `offscreenBecameVisible:19`, três tamanhos touch com `attempts:0`. Nenhum arquivo com nota pessoal foi enviado.

**Demais hashes Pages conferidos:** `revisao-inteligente.js` `044ed4077209dc29cf478041592825d10a749b1b052b1568846bf13c4ebbbaab`; `planejamento-semanal.js` `34e40e677eb2648f46909fbc3eb93be162d52392b797540d482bc0b631199d73`; `leitor-consolidacao.js` `4ed853b6a862a103969b94440545db28a51cb060d44723d2c67387a236ee2b3f`.

**Limite ambiental honesto:** o executor tinha Chromium instalado (156.0.8078.79), mas o Playwright local não possuía o executável `chromium_headless_shell-1234` e a tentativa `node tests/sprint20-browser.cjs` falhou **antes de abrir o browser**. O ensaio de Chromium **real foi no runner GitHub Actions**, com versão e logs próprios; não se alegou E2E local nem Android físico.

## 4. Contratos do aplicativo e conteúdo jurídico preservados

- Backup **`agu-portable-local-s20-v1`**, nove categorias, armazenamento **localStorage** sem conta, banco, backend, sincronização ou coleta; restauração **somente em chaves ausentes**, SHA por categoria, quota revertida, matriz importada com **`AGUValidateMatrix`**. Limite máximo de **12.000.000 bytes UTF-8** para pacote e arquivo formatado, sem promessa de backup para estados acima desse limite.
- Exatamente os quatro destinos **Início, Estudar, Biblioteca Inteligente e Evolução**. Jornada missão recomendada → planejamento → revisão → Caderno/Leitor → Evolução com teclado/refresh, sem tentativa sem resposta ou duplicada nos cenários de regressão. Calendário **D+1/D+7/D+21/D+45**.
- Quatro questões auditadas `of-2015-adv-006`, `-007`, `-009`, `-048` com gabaritos históricos **E/C/E/C**; **36 flashcards**; **24 referências oficiais catalogadas**, **não 24 certificações**; 2015 **C/E**, 2023 **A–E**, anuladas sem pontuação. Q1 `of-2015-adv-001` permanece fora da nova correção automática até cotejo histórico independente. CF art. 37, X, CF art. 49, V, Lei 9.784 art. 50 seguem como **excertos identificados**, não textos integrais. `confirmado_pontualmente` ≠ `certificado_integralmente`.
- Nenhuma alteração nas matrizes privadas, evidências da Auditoria 3, fontes jurídicas, gabaritos, rotas ou histórico real do estudante.

## 5. Arquivos e rastreabilidade de commits

| Arquivo | Commit | Alteração realizada |
|---|---|---|
| `backup-local-s20.js` | **`3031138f`** | Validação do artigo, unidade pertencente ao artigo, chaves de notas existentes no corpus e estados reconhecidos de aba/mobile, preservando limite textual S26. Blob `312ea5a48e9e01e117066dbec515f89ddee51e12`. |
| `tests/sprint27-validacao.js` | **`3031138f`** | Regressão sintética que falhou antes do patch, cinco rejeições, prova positiva com notas de artigos distintos, SHA, idempotência e não sobrescrita. Blob `edf2aa066ca01e9ccc3a6405f610dc1bfec3ca12`. |
| `index.html` | **`3031138f`** | Querystring do script de backup alterada para **`s27a`**, sem UI nova. Blob `9fb55aab363a71eefc4cd0eca8e889149f782b28`. |
| `tests/sprint21-pages.cjs` | **`3031138f`** | Espera `20261113-s27a`, preserva comparação HTTPS/hash de quatro scripts. Blob `04b6e4cd95d8eee2599b2bb0107ba62bbd2a1b66`. |
| `.github/workflows/agu-sprint20-ci.yml` | **`3031138f`** | Inclui `node tests/sprint27-validacao.js` em Node 22; Chromium e Pages preservados. Blob `11ede4559cd6a1a1664e8b5ea6bafe1b020d9177`. |
| `docs/CHECKPOINT_SPRINT27_INTEGRIDADE_LEITOR_RECUPERACAO_2026-11-13.md` | Commit documental S27 | Checkpoint de reproduções, jobs e limites (este arquivo). |
| `docs/PROMPT_SPRINT28_2026-11-13.md` | Commit documental S27 | Prompt integral de próxima sprint, **somente handoff**. |

## 6. Pendências e próximo handoff

| Pendência | Classe / gravidade | Próxima evidência necessária |
|---|---|---|
| Android físico, teclado virtual, toque e TalkBack | **`nao_testado_android_fisico`** / média | Aparelho conectado e autorizado; versão, viewport, densidade, perfil isolado e capturas sintéticas, conforme roteiro S24. |
| Arquivo pessoal antigo / conflito entre aparelhos | **`nao_testado_backup_historico_real`** / média-alta | Arquivo voluntário e consentimento específico, teste local descartável, hashes/contagens sem conteúdo; preservar duas cópias. |
| Estado acima de 12 MB e saneamento de storage já corrompido | **`risco`** / média-alta | Nova proposta/consentimento e teste não destrutivo; não assumir migração ou limpar dados. |
| Contraste `incomplete` e certificação WCAG | **`risco`** / média | Inspeção manual com leitura real e foco, distinção explícita entre incomplete/violation/passed; zero violations em recorte não é WCAG integral. |
| Q1 de 2015 e `NORM-INT-029` pendente na fotografia AUD03-019 | **`risco_juridico`** / alta para certificação | Cotejo documental independente e integração formal da Auditoria, com reconsulta ao estado mais recente. |

**Handoff documental completo:** `docs/PROMPT_SPRINT28_2026-11-13.md`. **Sprint 28 não executada.** A Sprint 27 se encerra com correção localizada de falha reproduzida, novas regressões Node 22/Chromium/Pages verificadas e dados privados preservados.
