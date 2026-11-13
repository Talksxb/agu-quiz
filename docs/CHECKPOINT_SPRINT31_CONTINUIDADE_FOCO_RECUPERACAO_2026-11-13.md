# AGU Quiz | CHECKPOINT — Sprint 31
## Continuidade de foco entre artigos, abas e painéis sem migração de histórico

**Data:** 13/11/2026 (`America/Sao_Paulo`). **Repositório:** `Talksxb/agu-quiz`, `main`. **Resultado:** perda concreta do foco após três renderizações do Leitor reproduzida no navegador público; falhas homólogas reproduzidas em DOM sintético, corrigidas pontualmente e reavaliadas. Um primeiro patch conservou foco, mas deixou o botão de próximo artigo fora do viewport; o teste Chromium de 320 px e o Chrome público demonstraram isso, motivando um refinamento limitado à revelação do foco. **Android físico, TalkBack e backup histórico pessoal não foram testados.** Somente S31 foi executada; S32 é handoff.

## 1. Baseline, arquivos e isolamento

- **HEAD de abertura:** [`187208323baf654aa1c2d570fc1a1b4de1a46dd4`](https://github.com/Talksxb/agu-quiz/commit/187208323baf654aa1c2d570fc1a1b4de1a46dd4), fechamento documental S30, worktree original repositório clonado limpo; patch S30 [`a78600c0df9bb1c3091e626393917769c6b3bf48`](https://github.com/Talksxb/agu-quiz/commit/a78600c0df9bb1c3091e626393917769c6b3bf48), verificador Pages [`e3fc8dd457885e9360aebdec36f6ab0f454746af`](https://github.com/Talksxb/agu-quiz/commit/e3fc8dd457885e9360aebdec36f6ab0f454746af).
- Lidos checkpoints S19–S30 (ênfase S27–S30), prompts S27–S30, `docs/GUIA_BACKUP_LOCAL_S21.md`, `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`, `index.html`, Leitor, Backup, Revisão, Planejamento, Caderno, Estudo Integrado, Consolidação, Questões S18, dados S18/S19, testes Node/Chromium/axe e workflow. Não houve modificação em conteúdo, fontes, provas, calendário ou categorias de armazenamento.
- Primeira publicação de produto e testes: [`823584ac86deee9f8a1b3fe4fdeb7565c125de51`](https://github.com/Talksxb/agu-quiz/commit/823584ac86deee9f8a1b3fe4fdeb7565c125de51). Refinamento do foco visível: [`e472b9d3b360dd84b5d9ba601a5a26f1e83bd725`](https://github.com/Talksxb/agu-quiz/commit/e472b9d3b360dd84b5d9ba601a5a26f1e83bd725). Último commit de código de S31 no corte: `e472b9d3` (reconfirmar após documentação).
- Arquivos alterados: `leitor-juridico.js`, `index.html` (cache Leitor `20261113-s31b`; backup `20261113-s27a` inalterado), `tests/sprint21-pages.cjs`, `.github/workflows/agu-sprint20-ci.yml` e novos `tests/sprint31-validacao.js` / `tests/sprint31-browser.cjs`. Nenhum patch em `backup-local-s20.js`.

## 2. Falhas reproduzidas antes e decisões mínimas

**S31-001 — `falha_reproduzida`, gravidade média: índice por teclado.** Chrome desktop real, perfil de teste sem notas pessoais, Pages HTTPS, viewport **1363 × 936 CSS px**. Em **Biblioteca Inteligente → Legislação e materiais → Leitor**, Tab alcançou o segundo botão `.agu-index-entry`, **“Art. 49 (excerto: inciso V)”**, retângulo anterior `x≈302,5; y≈621,4; w=169; h=58`. **Enter** atualizou corretamente o título e a seleção, mas antes do patch `document.activeElement` virou `BODY`. Esperado: foco previsível no índice selecionado, com Tab para o artigo seguinte. Depois do patch, no mesmo Chrome publicado, `activeElement===.agu-index-entry.selected`, papel nativo `BUTTON`, Tab avançou para **Art. 131**, Shift+Tab voltou a Art. 49. Em viewport estreito, após selecionar artigo no índice, o painel de texto reaparece e o foco é transferido ao `<h2 tabindex="-1">` do novo artigo, com rolagem para revelá-lo; não se tenta focar o índice agora oculto.

**S31-002 — `falha_reproduzida`, gravidade média: abas.** Tab alcançou o botão **Questões** (`x≈1131; y≈443; w≈87; h=42`). Enter trocou `aria-pressed=true`, mas antes o foco caía em `BODY`; depois permaneceu no novo botão Questões. **Tab → Caderno** e **Shift+Tab → Questões** confirmados em Chrome desktop real, sem responder qualquer questão. Abas existentes preservadas: Jurisprudência, Questões, Caderno, Flashcards, Comentários, Estudo integrado.

**S31-003 — `falha_reproduzida`, gravidade média: botões de artigo anterior/próximo.** Partindo do art. 49, foco real via Shift+Tab até **Próximo artigo →** e Enter: título mudou a **Art. 131**, mas antes o foco virava `BODY`. Primeiro patch restaurou o foco no novo botão; contudo, como o Art. 131 é mais comprido, o mesmo botão foi medido **fora do viewport** (`x≈679,6; y≈1348; bottom≈1388; viewport 1363 × 936; scrollY≈20`), apesar de `activeElement` permanecer nele. A primeira execução Chromium S31 também falhou em 320 px com `AssertionError: botão de avanço permanece visível 320`. O segundo patch troca exclusivamente o foco dos botões de avanço para `focus({preventScroll:false})`; quando o botão fica desabilitado em limite do corpus, o foco vai ao título com rolagem. **Prova posterior no mesmo Chrome público/teclado:** art. 49 → Art. 131, `activeElement` continuou em **Próximo artigo →**, com retângulo `top=848`, `bottom=888` dentro da tela **936 px**, `scrollY=520` e destaque visual visível na captura sintética. Chromium CI final confirmou foco e visibilidade também em cinco larguras.

**S31-004 — `risco` sob regressão, gravidade média: painéis mobile.** Não havia Android físico; em VM Node que simula reconstrução do DOM e viewport estreito, ativar **Índice**, **Texto legal** e selecionar um artigo no índice tinha foco perdido em `BODY` antes do patch. O teste `tests/sprint31-validacao.js` falhou deliberadamente (`exit 1`) com **6 cenários**, todos com observado `body`/`focusLog:0`. Depois, **6/6** passam, com foco na opção recriada do alternador ou no título do novo artigo; a revelação visual do título é verificada no Chromium E2E, não em Android. Não houve certificação de toque físico/TalkBack.

**Patch:** parâmetro opcional `restoreKeyboardFocus=false` para `AGULegal.article/tab/mobile/step`, passado somente por handlers dos controles de UI envolvidos. Após a renderização, o foco retorna ao índice selecionado em desktop; ao título do artigo em mobile quando o índice fica oculto; à aba marcada; ao botão do painel; ou ao botão de avanço (com rolagem). `AGULegal.unit` conserva o ajuste S30. Chamadas programáticas antigas continuam com foco não forçado. `localStorage`, seus valores e formato não foram alterados. Não foram criados destinos, perguntas, menus, bancos ou serviços.

## 3. Outras classes e limites

| ID | Classe | Gravidade | Resultado/limite |
|---|---|---|---|
| S31-005 | `risco` — backup íntegro | Alta em caso de perda | Node S19 **26/26**, S20 **41/41**, S25 (650 registros: **6.712.561 caracteres / 13.213.211 bytes**, JSON compacto **11.999.987** vs formatado **12.000.013** bytes, restauração pequena com hash íntegro), S26 (seis notas inválidas rejeitadas; texto máximo 14.000 caracteres), S27 (cinco estados inválidos rejeitados; notas válidas de dois artigos preservadas e importação idempotente), S29/S30/S31 aprovados localmente. E2E S20–S24 é fonte de verificação de nove categorias/quota/rollback. Nenhum dado pessoal usado. |
| S31-006 | `risco` — axe e contraste | Média | Repetir e distinguir `violations` reais, `incomplete` por `elmPartiallyObscured` e `passed` depois de expor. Referência S30: axe 4.14.0, **26 scans**, zero `violations` no recorte; **13 cenários/19 nós inicialmente incomplete**, **19/19 passed** após rolagem. Sem certificação WCAG. |
| S31-007 | `nao_testado_android_fisico` | Média | Sem aparelho disponível e autorização específica: não houve medição real de Android, Chrome móvel, densidade, viewport CSS físico, teclado virtual, toque ou TalkBack. Emulação Chromium/Chrome desktop não substitui hardware. |
| S31-008 | `nao_testado_backup_historico_real` | Média/alta | Nenhum backup pessoal voluntariamente fornecido/autorizado. Não testada compatibilidade real de histórico entre aparelhos, sem merge, sem sobrescrever. |
| S31-009 | `risco` — >12 MB, corrupção prévia, conflitos | Média/alta | Limite de **12.000.000 bytes UTF-8**, formatos/versões e quota; não há procedimento integral autorizado para excedentes nem conserto automático de `localStorage` antigo corrompido. Preservar cópias, não limpar navegador, dividir/editar/compactar JSON ou migrar. |
| S31-010 | `risco_juridico` | Alta | Nenhum gabarito, fonte ou tema foi promovido. `of-2015-adv-001` bloqueada; `confirmado_pontualmente` não é `certificado_integralmente`. Status de Auditoria apenas consultado em leitura. |

## 4. Node/Chromium/axe/CI e verificação da publicação

**Local:** Node **v24.22.1** S19 (26/26), S20 (41/41), S25/S26/S27/S29/S30/S31: todos **exit 0** após a mudança. S31 original em Node **exit 1**, seis focos perdidos; depois seis recuperados com `preventScroll` condicional e estado local conservado. Em Playwright local, faltou `/home/agent/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell`; usando `/usr/bin/chromium`, abortou antes do teste por **`socket() failed: Operation not permitted (1)`**. Não houve E2E Playwright local aprovado. O teste Chrome remoto/publicado é execução separada da CI.

**Run intermediário [43471941415](https://github.com/Talksxb/agu-quiz/actions/runs/43471941415)**, SHA `823584ac`: `integridade-node` **success**, `pages-publicado` **success**, `navegador-chromium` **failure** — **falha efetiva do novo teste S31** de visibilidade em 320 px, não falso negativo de cache. Não usar esse run como aprovado. O refinamento `e472b9d` é posterior ao resultado.

**CI definitivo S31:** [**run 43472332230**](https://github.com/Talksxb/agu-quiz/actions/runs/43472332230), **`completed/success`** sobre o segundo commit de código [`e472b9d3b360dd84b5d9ba601a5a26f1e83bd725`](https://github.com/Talksxb/agu-quiz/commit/e472b9d3b360dd84b5d9ba601a5a26f1e83bd725). Jobs e logs reabertos individualmente:

| Job | ID | Resultado real |
|---|---:|---|
| `integridade-node` | **132047152397** | `success`; **Node v22.23.4**, S19 **26/26**, S20 **41/41**, S25/S26/S27/S29/S30/S31 aprovados. `S31_FOCO_RENDER_OK` registra **6/6** cenários, sem mudança de estado indevida. |
| `navegador-chromium` | **132047152340** | `success`; Chromium **158.0.8127.18**, S20–S24/S29/S30/S31 E2E e axe S22/S23/S24. `S31_BROWSER_FOCO_OK` confirma as **cinco larguras 320/360/390/430/1280 CSS px**, índice, títulos mobile, abas, switcher, próximo artigo **visível**, Espaço S30, Tab/Shift+Tab, reload, sem `pageerror` nem tentativa fantasma. Axe-core **4.14.0**: **26 scans**, `violations:[]` no recorte, **13 cenários/19 nós `color-contrast incomplete`** inicialmente por sobreposição, e **19/19 `passed` após rolagem**. Não há certificação global de WCAG nem teste Android físico. |
| `pages-publicado` | **132047151825** | `success`; requisições HTTPS **200**, HTML e **cinco scripts** com SHA-256 iguais ao checkout depois da propagação, cache S31b do Leitor e S27a do backup. Primeiras três consultas viram cache S31a; quarta convergiu ao novo SHA, sem alterar verificador. |

**Artefato sintético [14061806796](https://github.com/Talksxb/agu-quiz/actions/runs/43472332230/artifacts/14061806796)**, nome `agu-s20-chromium-viewports`, **3.847.979 bytes**, digest `sha256:a1e105b35e008830b7ead44c6f29436c6340d98a150ed33f547ec32c275affcf`, expira em **20/11/2026**. Metadados, download ZIP por conector e log de upload inspecionados; **não** se alega inspeção individual de cada item do ZIP. Workflow limita o artefato a PNG/JSON sintéticos, incluindo `tests/artifacts-s31/foco-renderizacoes-s31.json` e `continuidade-foco-s31-390.png`.

**Pages após S31:** [AGU Quiz público](https://talksxb.github.io/agu-quiz/), HTTPS **200**, comparado no job e novamente no executor com `node tests/sprint21-pages.cjs` (**exit 0**). Hashes SHA-256 efetivos:

| Recurso | SHA-256 publicado |
|---|---|
| `index.html` | `8d0d82b39ca88c7ce9315e4cb13652780d8fab13c825d652af55276763e077df` |
| `leitor-juridico.js` | `9c8c300eb65559d80827b1f997783e067f53cc82c71af4a8ed5540d74bba6185` |
| `backup-local-s20.js` | `d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78` |
| `revisao-inteligente.js` | `044ed4077209dc29cf478041592825d10a749b1b052b1568846bf13c4ebbbaab` |
| `planejamento-semanal.js` | `34e40e677eb2648f46909fbc3eb93be162d52392b797540d482bc0b631199d73` |
| `leitor-consolidacao.js` | `4ed853b6a862a103969b94440545db28a51cb060d44723d2c67387a236ee2b3f` |

**Versões cache:** `leitor-juridico.js?v=20261113-s31b` (confirmada também por DOM read-only no Chrome público); `backup-local-s20.js?v=20261113-s27a`. Sem migração de dados. O primeiro run falho foi evidência útil e **não** está sendo reclassificado como sucesso.

## 5. Invariantes de dados, jornada e acervo jurídico

- Backup `agu-portable-local-s20-v1`, **nove categorias catalogadas**, só `localStorage`, JSON ≤ **12.000.000 bytes UTF-8** segundo os critérios de categoria/pacote/arquivo formatado, SHA-256 por categoria, `AGUValidateMatrix`, importação **somente de categoria ausente**, idempotência, quota com rollback e jamais sobrescrever categoria preexistente.
- Quatro destinos: **Início, Estudar, Biblioteca Inteligente, Evolução**. Missão recomendada, Plano semanal, Revisão, Caderno/Leitor, Evolução; recarga sem tentativa fantasma nos cenários cobertos; D+1/D+7/D+21/D+45. Provas 2015 C/E e 2023 A–E, anuladas não pontuadas.
- Quatro questões oficialmente cotejadas `of-2015-adv-006/-007/-009/-048` (gabaritos históricos **E/C/E/C**), **36 flashcards**, **24 referências oficiais catalogadas** — não certificadas integralmente. `of-2015-adv-001` não retorna à nova correção automática sem cotejo independente. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50 são **trechos identificados**, não texto integral certificado.
- Nenhuma nota real, matriz da Auditoria, resposta pessoal, arquivo histórico ou dado privado foi enviado a GitHub/Actions/Issues/ZIPs ou capturas.

## 6. Auditoria 03 privada, somente status

No início e no fechamento, consultados `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `checkpoints/AUD03-023.json` e listagem de lotes normativos e metadados da matriz. **HEAD privado reconfirmado no encerramento:** [`56b93d4a0aab21910003f230a216cb770a922b96`](https://github.com/Talksxb/agu-auditoria/commit/56b93d4a0aab21910003f230a216cb770a922b96). `AUD03-023` continuou último integrado: **412 IDs únicos, 356 com alguma evidência / 56 sem, 127 lotes integrados** e **zero temas certificados**; **129 lotes normativos persistidos**, com `NORM-INT-031` (INT34) e `NORM-INT-032` (INT35) ainda fora do corte da integração. **5.994 referências vinculadas, 837 pendências sem URL** na fotografia AUD03-023. Esse é um corte dinâmico, não autorização de promoção de conteúdo; a matriz privada permaneceu fechada.

## 7. Encerramento e handoff

**Aceite concluído:** falha anterior reproduzida por teclado e por teste sintético, foco fora da tela também reproduzido no Chrome real e Chromium 320, correções mínimas posteriores com provas em **Chrome publicado e CI definitivo 3/3 jobs success**, artefato sintético e Pages verificados. Backup sintético sem perda/sobrescrita, axe com `incomplete` corretamente diferenciado de `violation`, conteúdo jurídico estável, Auditoria restrita, Android/backup real declarados não testados. Não houve certificação WCAG global nem jurídica integral.

**Pendências:** Android físico/TalkBack com autorização, backup histórico real voluntário, questões legadas ainda sem cotejo, contagem jurídico-documental não certificada, cobertura global WCAG não demonstrada, recuperação acima de 12 MB ou histórico corrompido e demais renderizações não ensaiadas (por exemplo salvar anotações, ajustes de consolidação, controles secundários de outros módulos). Não executar Sprint 32 neste fechamento.

**Handoff:** [`docs/PROMPT_SPRINT32_2026-11-13.md`](PROMPT_SPRINT32_2026-11-13.md).
