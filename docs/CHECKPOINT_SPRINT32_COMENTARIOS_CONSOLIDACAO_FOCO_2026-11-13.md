# AGU Quiz | CHECKPOINT — Sprint 32
## Comentários e Consolidação: continuidade de foco sem migração

**Data:** 13/11/2026 (`America/Sao_Paulo`). **Repositório:** [Talksxb/agu-quiz](https://github.com/Talksxb/agu-quiz), `main`. **Escopo:** somente Sprint 32. **Resultado de produto:** falhas reais de navegação por teclado após salvar comentário sintético e operar filtros, busca, fonte e resultado foram demonstradas no Chrome público e corrigidas apenas nesses controles. **Sem migração, sem mudança de chaves, categorias, conteúdo jurídico, fontes ou gabaritos.** S33 é handoff documental e não foi executada.

## 1. Baseline e inventário verificado

- **HEAD de abertura:** [`3017a9166d345b7f277b5c1161c50175458b2804`](https://github.com/Talksxb/agu-quiz/commit/3017a9166d345b7f277b5c1161c50175458b2804), commit apenas documental da S31. Código anterior [`e472b9d3b360dd84b5d9ba601a5a26f1e83bd725`](https://github.com/Talksxb/agu-quiz/commit/e472b9d3b360dd84b5d9ba601a5a26f1e83bd725). Checkout limpo na abertura; arquivos SHA-256 de S31 iguais ao publicado. A correção S29→S31 não foi reaplicada.
- Consultados checkpoints S19–S31 com ênfase em S27–S31, prompts, guia S21 e roteiro Android S24, `index.html`, módulos Leitor/Consolidação/Backup/Estudo/Caderno/Revisão/Plano, corpus S13, dados e testes S18/S19, testes Node/Chromium/axe e workflow. **Worktree separado `agu-quiz-s32`**, sem sobrepor os diretórios de sprints anteriores.
- **CI anterior efetivo de código:** [run **43472332230**](https://github.com/Talksxb/agu-quiz/actions/runs/43472332230), commit `e472b9d3`, três jobs success (IDs Node `132047152397`, Chromium `132047152340`, Pages `132047151825`), logs reabertos. Artefato sintético **14061806796**, 3.847.979 bytes, SHA-256 digest `a1e105b35e008830b7ead44c6f29436c6340d98a150ed33f547ec32c275affcf`. Houve Pages automático documental posterior, mas **não é CI novo de código**.
- Outra frente ativa observada, independente da S32: [PR #1 — WORK 01, `work/plataforma-pessoal-01`](https://github.com/Talksxb/agu-quiz/pull/1), aberta no corte inicial. O ramo trata continuidade de estudo na home; não se presumiu merge nem se alterou essa branch.

## 2. Defeitos efetivos no Chrome público antes da mudança

**Ambiente real de reprodução:** Chrome desktop remoto via navegador compartilhado, [Pages público](https://talksxb.github.io/agu-quiz/), viewport medido **1363 × 936 CSS px**; dados exclusivamente sintéticos, nenhum arquivo histórico ou matriz privada. O teste usa comandos de teclado do navegador, independentemente da VM Node. **Não** é Android físico nem TalkBack.

| ID | Classificação / gravidade | Sequência, esperado e observado antes do patch |
|---|---|---|
| S32-001 | `falha_reproduzida` / **média** | **Biblioteca Inteligente → Legislação e materiais → Comentários**, textarea com texto **“Nota sintética S32: apenas teste de foco e persistência, sem dado pessoal.”**; Tab alcançou **Salvar anotação** (`BUTTON.agu-primary`, retângulo `x≈1001,5, y=872, bottom=912`, visível em 936 px). **Enter** salvou nota e reconstruíu o Leitor, mas `document.activeElement` tornou-se **`BODY`**; Tab subsequente saltou a **Acervo**, interrompendo a continuação no comentário. Esperado: foco no botão recriado, visível, com Tab→Exportar comentários e Shift+Tab reverso. Captura sintética anterior observada, sem dados pessoais. |
| S32-002 | `falha_reproduzida` / **média** | **Tamanho do texto jurídico**, `SELECT`, valor 100 → 115 por seta: o texto mudou, mas `activeElement=BODY` após renderização. Esperado: o novo `SELECT` com valor preservado e foco visível. |
| S32-003 | `falha_reproduzida` / **média** | **Pesquisa jurídica e filtros**, expandir e recolher por teclado: `aria-expanded` mudou corretamente, mas `activeElement=BODY`. Esperado: retorno ao botão de expansão e fluxo Tab acessível. |
| S32-004 | `falha_reproduzida` / **média** | Campo **Pesquisar** com valor sintético `art. 13`, Enter: apareceram **25 resultados** e a consulta persistiu, mas `activeElement=BODY`. Esperado: foco no campo de pesquisa reconstruído, sem salto à navegação principal. |
| S32-005 | `falha_reproduzida` / **média** | Resultado da consulta **Lei nº 9.784/1999 · Art. 13 · I**, Enter: artigo/unidade corretos, painel Texto legal, porém foco em `BODY`. Esperado: foco visível na unidade jurídica selecionada, permitindo prosseguir via Tab. |
| S32-006 | `risco` / **média** | Botões **Buscar** e **Limpar** usam a mesma renderização de S32-004; sua falha homóloga foi reproduzida explicitamente na VM Node de seis cenários, não se alega inspeção manual independente de ambos antes do patch. |

**Regressão pré-patch obrigatória:** `node tests/sprint32-validacao.js` contra o código inicial terminou **exit 1**: **6/6** cenários de foco observados em `body`, `focusLog:0`; o erro foi `AssertionError: foco restaurado em todos os seis controles após render`. Esse teste sintético não certifica geometria nem leitor de tela; a reprodução de navegador acima sustenta os defeitos principais.

## 3. Intervenção mínima e verificação posterior

- **Implementação:** [`1230b4b25c7df7ceff6bd5103193bf1bd4d7a66a`](https://github.com/Talksxb/agu-quiz/commit/1230b4b25c7df7ceff6bd5103193bf1bd4d7a66a). `leitor-juridico.js`: `AGULegal.note(restoreKeyboardFocus=false)` e `id="agu-save-note"` no botão; após salvar/renderizar, restaurar e revelar o foco somente quando acionado pelo controle real. `leitor-consolidacao.js`: restaurar o foco alvo de toggle, input da busca, Buscar, Limpar, seleção de tamanho e unidade aberta por resultado. `AGUConsolidation.open(unitId,true)` abre Texto legal no mobile e foca a unidade **após** a última renderização. Chamadas antigas programáticas continuam sem foco forçado.
- `index.html`: atualizar cache **somente dos scripts alterados**, Leitor `20261113-s32a` e Consolidação `20261113-s32a`. Backup permanece `20261113-s27a`; Revisão/Plano `20261112-s20b`. `tests/sprint21-pages.cjs` coteja cache e SHA dos seis arquivos (HTML+cinco JS); workflow acrescentou S32 Node, Chromium e artefatos **sintéticos**. Nenhum CSS, menu, novo destino ou comportamento de armazenamento foi alterado.
- **Node após patch:** seis de seis controles restauram foco e `focus({preventScroll:false})`; valida nota de texto, consulta, unidade conhecida, font-size e sem mudanças nas chaves. **Chrome real publicado** no mesmo viewport: Enter em **Salvar anotação** manteve `document.activeElement.id='agu-save-note'`, retângulo `top=872, bottom=912` dentro de 936 px, Tab avançou a **Exportar comentários**, Shift+Tab retornou; conteúdo sintético reapareceu no campo. Mudar tamanho 115→130 conservou `SELECT` focado/visível (`top≈447,5; bottom≈488,5`), com cache `s32a` confirmado por DOM.
- **Primeiro CI S32 [43477706817](https://github.com/Talksxb/agu-quiz/actions/runs/43477706817)**, SHA `1230b4b`: Node e Pages **success**; Chromium **failure** por **preparação incorreta do teste em 320 px**: `locator.click Timeout 30000ms`, a aba Comentários estava **oculta no painel mobile Texto legal**. O teste tentava clicar em controle ainda oculto; não é indisponibilidade da aplicação nem falha de dados. Log real [job `132065780555`](https://github.com/Talksxb/agu-quiz/actions/runs/43477706817/job/132065780555) analisado, sem transformar falha em sucesso.
- **Refinamento só do roteiro de teste:** [`c29c8b3ac541a814328a02ec745d920c4ae5ed0b`](https://github.com/Talksxb/agu-quiz/commit/c29c8b3ac541a814328a02ec745d920c4ae5ed0b): em viewport estreito, ativar antes o controle **Relacionados** existente; nenhum código de produto alterado, nenhum novo dado. CI final é identificado na seção seguinte.

## 4. Execuções, ambiente e evidência externa

**Node local real:** v**24.22.1**; S19 **26/26**, S20 **41/41**, S25 (650 registros **6.712.561 caracteres / 13.213.211 bytes UTF-8**; compacto **11.999.987** vs formatado **12.000.013**; restauração pequena hash-idêntica), S26 (seis formatos de nota inválidos rejeitados; texto 14.000 válido), S27 (cinco estados forjados rejeitados; duas notas e importação idempotentes), S29/S30/S31/S32: **todos exit 0** após a correção. Teste Node S32 antes do patch: exit 1, 6 focos em BODY. Nenhum arquivo pessoal.

**Playwright local:** `node tests/sprint32-browser.cjs` não conseguiu iniciar porque falta `/home/agent/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell`; o executor anterior também abortava `/usr/bin/chromium` com `socket() failed: Operation not permitted (1)`. **Nenhum E2E local declarado aprovado.** Chrome remoto humano-assistido e Chromium em GitHub Actions são execuções distintas. Os cinco viewports pertencem ao CI, não ao aparelho físico.

**CI definitivo S32:** [run **43478145474**](https://github.com/Talksxb/agu-quiz/actions/runs/43478145474), SHA de produto/teste [`c29c8b3ac541a814328a02ec745d920c4ae5ed0b`](https://github.com/Talksxb/agu-quiz/commit/c29c8b3ac541a814328a02ec745d920c4ae5ed0b), **`completed/success`**, iniciado 13/11/2026 às 17:59 UTC, concluído até 18:00:38 UTC. Os três jobs e seus logs foram reabertos individualmente; Node v**22.23.4**, Chromium **158.0.8127.18**, axe-core **4.14.0**.

| Job | ID real | Resultado |
|---|---:|---|
| `integridade-node` | **132067348235** | **`success`**; S19 **26/26**, S20 **41/41**, S25/S26/S27/S29/S30/S31/S32 aprovados no Node v22.23.4. `S32_CONTROLES_FOCO` comprova **6/6** cenários de refoco sintético. |
| `navegador-chromium` | **132067348622** | **`success`**; E2E S20–S24/S29/S30/S31/S32 e axe/contraste no Chromium 158.0.8127.18. `S32_BROWSER_CONTROLES_OK`: **320/360/390/430/1280 px**, salvar nota, Tab, Shift+Tab, filtros, pesquisar, limpar, tamanho, abrir resultado e reload; **nenhuma tentativa fantasma**; não equivale a Android físico. |
| `pages-publicado` | **132067347780** | **`success`**; `PAGES_VERIFICADO`: seis arquivos HTTPS 200 e SHA-256 iguais ao checkout, caches de Leitor/Consolidação S32a. |

**ZIP real do CI S32:** [artefato **14063787248**](https://github.com/Talksxb/agu-quiz/actions/runs/43478145474/artifacts/14063787248), nome `agu-s20-chromium-viewports`, **3.909.728 bytes**, digest `sha256:a181739ddbb42bf7d1e1ade55d5e574761f32262ac412c6be24d06e38e02746d`, expiração prevista **20/11/2026 às 18:00:33 UTC**. Metadados, logs de upload e download ZIP via conector confirmados; **não** se afirma abertura individual de todas as entradas. O workflow contém `tests/artifacts-s32/foco-controles-s32.json` e `foco-apos-busca-s32-390.png`, sintéticos.

**Pages publicado e verificado independentemente no executor**, `node tests/sprint21-pages.cjs` **exit 0**, HTTPS **200** no HTML e nos cinco scripts; seis SHA-256 idênticos ao checkout S32:

| Arquivo | SHA-256 efetivo |
|---|---|
| `index.html` | `bc4e254f0bd35dc63dfb2dcd953308271de1679586dd031d62166bc4168e489b` |
| `leitor-juridico.js` | `8045194f8a8ec2bbd10e95fff8ce04c39042d5f7957ad780200433793911f2e1` |
| `leitor-consolidacao.js` | `3c64085c0077637f476697b0817a34a22a8f6315095b423a1d00963d1f1e4f88` |
| `backup-local-s20.js` | `d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78` |
| `revisao-inteligente.js` | `044ed4077209dc29cf478041592825d10a749b1b052b1568846bf13c4ebbbaab` |
| `planejamento-semanal.js` | `34e40e677eb2648f46909fbc3eb93be162d52392b797540d482bc0b631199d73` |

**Axe e contraste, executados novamente no CI S32:** `S23_AXE_RESUMO` confirmou **26 scans, `violations:[]`** nos recortes, **13 cenários/19 nós `color-contrast incomplete` inicialmente por `elmPartiallyObscured`**. `S24_RESUMO` confirmou **19/19 `passed` após rolar até exposição total**. A marcação `incomplete` inicial não foi apagada nem convertida em violação; inspeção humana global não foi feita e **não há certificação WCAG**.

## 5. Riscos, limites e proteção de dados

| ID | Classe / gravidade | Estado e limite |
|---|---|---|
| S32-007 | `risco` / alta em caso de perda | Backup `agu-portable-local-s20-v1`, **nove categorias catalogadas**, exclusivamente `localStorage`, limite **12.000.000 bytes UTF-8** nos critérios de categoria/pacote/JSON formatado, hash SHA-256 por categoria, `AGUValidateMatrix`, inserir **só categorias ausentes**, quota/rollback, idempotência e **nunca sobrescrever**. Node sintético S25–S27 validou os casos de fronteira. |
| S32-008 | `nao_testado_android_fisico` / média | Sem dispositivo físico disponível e autorização específica, sem medição Android/Chrome, densidade, orientação, teclado virtual, toque real ou TalkBack. Desktop Chromium e browser remoto não substituem isso. Roteiro S24 permanece pronto. |
| S32-009 | `nao_testado_backup_historico_real` / média-alta | Sem arquivo histórico voluntariamente fornecido e consentimento explícito em perfil isolado. Nenhuma restauração de histórico pessoal foi testada; apenas texto e estados sintéticos. Em conflitos entre aparelhos, preservar ambas as cópias, **sem merge**. |
| S32-010 | `risco` / alta | Backup acima de 12 MB ou `localStorage` anteriormente corrompido não possui solução integral aprovada. Não limpar navegador, editar/dividir/compactar JSON nem improvisar migração. |
| S32-011 | `risco` / média | Sem certificação WCAG global; recortes de axe, rolagem horizontal e inspeção humana têm alcances distintos. Roteiros de foco de Caderno/Estudo/Revisão/Plano seguem para S33, sem pressupor falhas. |
| S32-012 | `risco_juridico` / alta | Quatro destinos; 36 flashcards; 24 referências oficiais **catalogadas**, não integralmente certificadas. Q6/Q7/Q9/Q48 `of-2015-adv-006/-007/-009/-048`, E/C/E/C; `of-2015-adv-001` não pontua na correção automática nova sem cotejo de prova/variante/gabarito/fundamentação. D+1/D+7/D+21/D+45, 2015 C/E e 2023 A–E, anuladas sem pontuação. CF art.37 X, art.49 V, Lei 9.784 art.50 = trechos identificados. `confirmado_pontualmente` **≠** `certificado_integralmente`. |

Nenhuma resposta, nota pessoal, matriz da Auditoria, backup histórico ou dado identificável foi transmitido a GitHub/Actions/Issues/PRs/ZIPs ou capturas. Sintético não é sinônimo de backup pessoal. Não há autenticação, servidor novo, sync ou transferência entre aparelhos.

## 6. Auditoria 03 privada — somente status, sem matriz pública

Reabertos `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `checkpoints/AUD03-023.json`, metadados da matriz de trabalho e árvore de lotes normativos da **main privada**. **HEAD inicial:** [`56b93d4a0aab21910003f230a216cb770a922b96`](https://github.com/Talksxb/agu-auditoria/commit/56b93d4a0aab21910003f230a216cb770a922b96). Ao reconsultar no fim do CI, o HEAD **avançou** para [`2c28bd63f97e18ecf0b7ff21eadee333e5ce5f71`](https://github.com/Talksxb/agu-auditoria/commit/2c28bd63f97e18ecf0b7ff21eadee333e5ce5f71) com **`NORM-INT-033` persistido** (metadado do blob `5369d3be25a40b9ac88e9f01bae4b6568f7440e6`). O último `AUD03-###.json` e `estado.json` permanecem **AUD03-023**, portanto **412 IDs únicos, 356 com evidência / 56 sem, 127 lotes normativos integrados de 130 persistidos** (contagem direta dos arquivos em `evidencias/normativa`), **5.994 referências integradas, 837 pendências sem URL e zero temas integralmente certificados**. `NORM-INT-031`, `-032` e **`-033`** estão persistidos **fora do corte AUD03-023**. Metadado SHA da matriz de trabalho `f00520a6fa702b67cb0716648eae7869eb818956` (não copiado). Não se confunde persistência com integração.

## 7. Roadmap coordenado com ChatGPT Work Sites

O planejamento separa camadas e evita misturar a Sprint 32 com uma reconstrução visual:

| Frente | Situação verificável | Próxima decisão, sem execução na S32 |
|---|---|---|
| **Núcleo AGU Quiz** | S19–S31 estáveis; S32 corrige foco de formulários já existentes, preserva respostas e backup. | Continuar testes condicionados a falhas nos outros módulos, foco e recuperação em S33. |
| **Plataforma pessoal WORK** | [PR #1](https://github.com/Talksxb/agu-quiz/pull/1) aberta no corte inicial, integração de missão, sessão e plano existentes na home. | Revisar compatibilidade com o novo HEAD S32 e decidir merge por sua própria frente, sem sobrepor commits. |
| **Auditorias e ENAP** | Auditoria 3 ainda sem temas integralmente certificados; pesquisa e integração curriculares independentes. | Manter fonte privada, promover conteúdo apenas após cotejo integral e permissão documental. |
| **Work Sites — camada visual futura** | Intenção do usuário registrada; **nenhum Site foi construído ou publicado por esta sprint**. | Planejar contrato visual: aproveitar navegação e componentes existentes, mapear dados públicos vs locais privados, identificar limite de persistência no navegador, prototipar UX/mobile em frente própria e validar separação GitHub ↔ Site antes de implantação. |
| **Acessibilidade/recuperação humana** | Chrome desktop e CI sintético; Android físico/TalkBack e backup histórico real ainda condicionados. | Solicitar aparelho/arquivo/consentimento específico apenas quando necessário, sem migrar, fundir ou descartar dados. |

**Regra arquitetural para a integração visual futura:** GitHub continua fonte de verdade de código, testes, conteúdo público cotejado e checkpoints; Sites não deve criar uma segunda fonte curricular ou receber a matriz privada. A persistência atual é local ao navegador/origem, portanto **uma interface em outro domínio não herda automaticamente o histórico**. Uma eventual experiência visual deve explicitar essa fronteira antes de qualquer decisão de hospedagem, autenticação ou mobilidade — todas fora da autorização S32.

## 8. Encerramento e handoff

**Aceite concluído:** prova Chrome anterior e posterior para o comentário, regressão VM seis cenários falhando/passando, Chromium **real no CI definitivo 3/3 jobs success** em cinco larguras, ZIP sintético verificado, distinção entre bloqueio Playwright local e Actions, backup sintético sem perdas, Pages HTTPS 200/cache/hash, `incomplete` vs `violation`, contagem AUD03 por SHA e honestidade sobre Android/backup pessoal. O run inicial S32 **falhou efetivamente** no setup mobile do teste e foi sucedido por outro SHA aprovado, sem mascarar a falha.

**Pendências deliberadas:** hardware Android/TalkBack, backup histórico real, >12 MB e corrupção preexistente, WCAG global, expansão jurídica indevida, fluxos restantes de Caderno/Estudo/Revisão/Plano e integração visual futura Work Sites.

**Próximo documento somente handoff:** [`docs/PROMPT_SPRINT33_2026-11-13.md`](PROMPT_SPRINT33_2026-11-13.md). **Sprint 33 não foi executada.**
