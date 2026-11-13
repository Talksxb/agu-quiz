# AGU Quiz | CHECKPOINT — Sprint 30
## Foco pós-ativação preservado no Leitor, regressões íntegras e limite de acessibilidade humana

**Data:** 13/11/2026 (`America/Sao_Paulo`). **Repositório:** `Talksxb/agu-quiz`, branch `main`. **Resultado:** **uma falha concreta de foco por teclado foi reproduzida, corrigida minimamente e comprovada depois** em navegador real, teste Node e Chromium CI. As regressões de backup e conteúdo seguiram aprovadas. Android físico/TalkBack e backup histórico real continuam **não testados**. **Somente a Sprint 30 foi executada; a Sprint 31 é handoff documental.**

## 1. Baseline, arquivos e decisões

- **HEAD de abertura:** [`b52cb4a686bea47e808031a0ed8effa6df7b78d6`](https://github.com/Talksxb/agu-quiz/commit/b52cb4a686bea47e808031a0ed8effa6df7b78d6), fechamento documental da S29; código S29 antecedente [`29296f83dba6858ce1c794e975416a29e7b57811`](https://github.com/Talksxb/agu-quiz/commit/29296f83dba6858ce1c794e975416a29e7b57811).
- **Fontes reabertas:** `docs/CHECKPOINT_SPRINT29_TECLADO_LEITOR_RECUPERACAO_2026-11-13.md`, `docs/GUIA_BACKUP_LOCAL_S21.md`, `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`, checkpoints S19–S29 e prompts S27–S30; `index.html`, `leitor-juridico.js`, `backup-local-s20.js`, Revisão, Planejamento, Caderno, Estudo Integrado, Consolidação, Questões S18 e dados S18/S19; Node S19/S20/S25/S26/S27/S29, E2E S20–S24/S29, axe S22/S23/S24 e CI.
- **Patch de produto:** [`a78600c0df9bb1c3091e626393917769c6b3bf48`](https://github.com/Talksxb/agu-quiz/commit/a78600c0df9bb1c3091e626393917769c6b3bf48). `AGULegal.unit(id,restoreKeyboardFocus=false)` continua selecionando e salvando como antes. Só a ativação `onkeydown` por **Espaço/Enter** passa `true`; depois de `render()`, o foco retorna ao novo `#agu-reader .agu-unit.selected` com `focus({preventScroll:true})`. O `onclick` e as chamadas programáticas continuam sem restauração forçada. O cache passa a `leitor-juridico.js?v=20261113-s30a`. Sem alteração no backup, em questões, fontes ou banco.
- **Prova persistida:** `tests/sprint30-validacao.js` (DOM e armazenamento sintéticos, falha pré-patch e sucesso pós-patch), `tests/sprint30-browser.cjs` (Chromium em cinco larguras, Tab/Espaço/Enter/Shift+Tab, persistência e screenshot sintética), workflow atualizado para S30.
- **Ajuste adicional, apenas de teste:** [`e3fc8dd457885e9360aebdec36f6ab0f454746af`](https://github.com/Talksxb/agu-quiz/commit/e3fc8dd457885e9360aebdec36f6ab0f454746af), `tests/sprint21-pages.cjs`: substituiu a expectativa de cache do Leitor `s29a` por `s30a`. **Nenhuma segunda mudança funcional no produto.**

## 2. Reproduzir primeiro: estado esperado, observado e correção

**S30-001 — `falha_reproduzida`, gravidade média (continuidade da navegação por teclado).**

1. **Cenário pré-correção:** navegador Chrome real em sessão isolada, viewport efetiva **1363 × 936 CSS px**, página HTTPS pública, **Biblioteca Inteligente → Legislação e materiais → Leitor**, Constituição Federal art. 37 (recortes conhecidos). A unidade `Inciso X` era um `DIV[role=button][tabindex=0]`, acessível por Tab. Dados de estudo inexistentes no perfil; nenhuma resposta, nota pessoal ou matriz foi usada.
2. **Esperado:** pressionar **Espaço** na segunda unidade seleciona `CF88:art37:X`, preserva o armazenamento e **mantém o foco na unidade reconstruída**, permitindo Tab seguir ao próximo controle.
3. **Observado antes do patch:** antes, `document.activeElement` era `DIV` com papel de botão e foco na segunda unidade (retângulo aproximado `x=536,5; y=643,3; largura=415; altura=195,8`). Após Espaço, a seleção passava corretamente à segunda unidade, **mas `document.activeElement` tornava-se `BODY`**: a substituição do HTML por `render()` descartava o elemento focado. Resultado repetido usando **Tab → Espaço**, com captura sintética visual e árvore de acessibilidade antes/depois na sessão de teste; não se confunde com TalkBack.
4. **Teste automatizado antes:** `node tests/sprint30-validacao.js` sobre o módulo S29 original terminou **exit 1**: `AssertionError: o foco deve retornar à unidade selecionada após a rerenderização`; esperado `CF88:art37:X`, observado `undefined`. O teste modela a substituição de DOM e executa o `onkeydown` real; não pressupõe navegador físico.
5. **Depois:** o mesmo teste passou **exit 0** (Espaço, Enter, tecla neutra, restauração de foco e persistência). No **Chrome real publicado**, após reload do HTML com `s30a`, **Tab → Espaço** deixou `document.activeElement` na unidade selecionada (`focusedIndex=1=selectedIndex`, `role=button`, visível); **Tab** avançou ao botão `Próximo artigo →` e **Shift+Tab** retornou à segunda unidade. Captura pós-correção foi registrada no mesmo ambiente sintético. CI Chromium `tests/sprint30-browser.cjs` passou nas larguras **320, 360, 390, 430 e 1280 px**, incluindo Enter, tecla neutra, reload e ausência de erro JS.

**Decisão:** a falha afetava a navegação sem teclado físico alternativo; patch limitado à reatribuição do foco em ativação por teclado, preservando conteúdo e armazenamento. **Não há alegação de que todos os focos da aplicação ou leitores de tela foram certificados.**

## 3. Outras classificações e limites

| ID | Classe | Gravidade | Observação / providência |
|---|---|---|---|
| **S30-002** | `risco` — integridade de backup sintético | **Alta se houver perda** | Node v24.22.1 local e v22.23.4 CI: S19 **26/26**, S20 **41/41**, S25/S26/S27/S29 e S30 aprovados. S25 reproduziu **650 registros, 6.712.561 caracteres/13.213.211 bytes UTF-8**, compactado **11.999.987** vs formatado **12.000.013 bytes**, restauração pequena com SHA intacto. S26 rejeitou seis notas não textuais ou excessivas, aceitou string de **14.000 caracteres**, sem sobrescrita. S27 rejeitou cinco estados falsificados e preservou duas notas válidas de dispositivos distintos, com hash e idempotência. Chromium S20–S24 repetiu jornadas de nove categorias, arquivos adversariais, quota/rollback e refresh. **Sem patch no backup**. |
| **S30-003** | `risco` — axe `incomplete` | **Média** | GitHub Actions: Chromium **158.0.8127.18**, axe-core **4.14.0**, **26 varreduras**, `violations:[]` no recorte; **13 cenários/19 nós** `color-contrast incomplete` inicialmente por `elmPartiallyObscured`. Após rolagem horizontal, **19/19 passed** e expostos. Isso não apaga a marcação inicial `incomplete` nem comprova WCAG global. Foco horizontal nas cinco larguras e toque emulado em 320/390/430 mantiveram zero tentativas não respondidas. |
| **S30-004** | `nao_testado_android_fisico` | **Média** | Sem acesso físico e consentimento específico para Android, Chrome móvel, orientação, densidade, teclado virtual, toque ou TalkBack. **Chrome remoto de desktop e Chromium CI não constituem Android físico.** Roteiro S24 permanece preparado. |
| **S30-005** | `nao_testado_backup_historico_real` | **Média/alta** | Não foi disponibilizado arquivo pessoal antigo voluntário com autorização. Não se aferiu retrocompatibilidade real, aparelhos divergentes ou recuperação de histórico pessoal. Testes somente sintéticos; preservar duas cópias em conflito, sem merge. |
| **S30-006** | `risco` — volume/corrupção prévia | **Média/alta** | Limite de **12.000.000 bytes UTF-8** do backup e categorias pertinentes; não existe solução integral autorizada acima do limite nem saneamento de `localStorage` já corrompido. Não limpar o navegador, dividir JSON, compactar ou migrar por improvisação. |
| **S30-007** | `risco_juridico` | **Alta** | Nenhuma questão, fonte ou gabarito novo foi promovido. `of-2015-adv-001` permanece fora da correção automática nova; status pontual não é certificação integral. Auditoria documental privada sem divulgação. |

## 4. Testes executados, CI real e falso negativo intermediário

**Local:** `Node v24.22.1`, todos os testes S19/S20/S25/S26/S27/S29/S30 exit 0 após o patch. Antes do patch S30 falhou em foco, como registrado. `node tests/sprint30-browser.cjs` local **não iniciou** por ausência de `chromium_headless_shell-1234`; apontando `/usr/bin/chromium` manualmente, Chromium encerrou na inicialização por `socket() failed: Operation not permitted (1)`. Nenhum E2E Playwright **local** foi chamado de aprovado. A reprodução e pós-validação Chrome na sessão remota foram **testes reais distintos** do CI.

**Execução inicial [43467785966](https://github.com/Talksxb/agu-quiz/actions/runs/43467785966)** sobre `a78600c`: `integridade-node` e `navegador-chromium` **success**, inclusive S30 em cinco larguras. `pages-publicado` **failure por falso negativo do próprio verificador**: a página já expunha HTML de SHA `daf99eb7...` e cache `s30a`, mas `tests/sprint21-pages.cjs` ainda exigia literalmente `s29a`, lançando `HTML sem a versão nova do Leitor`. Não foi falha da aplicação nem perda de dados; identificado em log real e corrigido por commit exclusivo do teste.

**CI definitivo S30:** [**run 43468054810**](https://github.com/Talksxb/agu-quiz/actions/runs/43468054810), commit de código/teste `e3fc8dd457885e9360aebdec36f6ab0f454746af`, **concluído com `success`**. Logs e jobs individuais reabertos:

| Job | ID | Resultado e prova |
|---|---:|---|
| `integridade-node` | **132032378531** | **success**; Node **v22.23.4**, S19 26/26, S20 41/41 e S25/S26/S27/S29/S30 passaram. S30: `S30_FOCO_LEITOR_OK` com duas restaurações e sem tecla neutra ativadora. |
| `navegador-chromium` | **132032378812** | **success**; Chromium **158.0.8127.18**; E2E S20–S24/S29/S30, axe S22/S23/S24. `S30_BROWSER_FOCO_OK`: cinco larguras **320/360/390/430/1280**, Tab, Espaço, Enter, Shift+Tab, reload e screenshot sintética de 390 px. `S23_AXE_RESUMO` e `S24_RESUMO` confirmam 26 scans/19 nós inicialmente inconclusivos/19 aprovados após rolar. |
| `pages-publicado` | **132032378761** | **success**; HTML e cinco scripts em Pages **HTTPS 200** iguais ao checkout após atualização do teste `s30a`. |

**Artefato CI final:** [**14058539692**](https://github.com/Talksxb/agu-quiz/actions/runs/43468054810/artifacts/14058539692), `agu-s20-chromium-viewports`, **3.763.559 bytes**, digest `sha256:51ed19d73791351684361012389479a3a8e5974682734c45a9f95ee27bafdcad`, expiração indicada **20/11/2026**. Metadados reais, download do ZIP e log de produção conferidos; **não se alega inspeção individual de todos os componentes do ZIP**. Workflow declara somente PNG/JSON sintéticos, inclusive `tests/artifacts-s30/foco-leitor-s30.json` e `leitor-foco-restaurado-390.png`.

**Publicado:** [AGU Quiz Pages](https://talksxb.github.io/agu-quiz/), HTTPS 200, SHA-256 de conteúdo remoto confrontado com os arquivos locais e o job final:

| Recurso | SHA-256 |
|---|---|
| `index.html` | `daf99eb7d974ea1251afe7d96d833f7e8d09e72148787d2ea9112797c804d670` |
| `leitor-juridico.js` | `a1e2a54797e10c079271ddb2836399e2b23531f8e65763f3ef3f5418701cee65` |
| `backup-local-s20.js` | `d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78` |
| `revisao-inteligente.js` | `044ed4077209dc29cf478041592825d10a749b1b052b1568846bf13c4ebbbaab` |
| `planejamento-semanal.js` | `34e40e677eb2648f46909fbc3eb93be162d52392b797540d482bc0b631199d73` |
| `leitor-consolidacao.js` | `4ed853b6a862a103969b94440545db28a51cb060d44723d2c67387a236ee2b3f` |

Cache do backup continua `s27a`; cache do Leitor `s30a`. O deploy Pages automático [43468053946](https://github.com/Talksxb/agu-quiz/actions/runs/43468053946) também terminou em `success`. Qualquer publicação posterior só de documentação **não é novo run Node/Chromium**.

## 5. Contrato de dados e conteúdo jurídico preservados

- `agu-portable-local-s20-v1`; **nove categorias** exclusivamente em `localStorage`; exportação JSON com limite de **12 MB reais UTF-8**, SHA-256 por categoria, `AGUValidateMatrix` para matriz, validação de formatos/dispositivos, inclusão só das categorias ausentes, quota com rollback, importação idempotente e **sem sobrescrever**. Nenhuma transferência, sync, banco, autenticação, merge ou histórico pessoal aberto.
- **Quatro destinos** — Início, Estudar, Biblioteca Inteligente, Evolução. Fluxo missão → Planejamento → Revisão → Caderno/Leitor → Evolução, retorno e refresh; sem tentativa automática fantasma nos testes. D+1/D+7/D+21/D+45.
- Questões auditadas `of-2015-adv-006/-007/-009/-048` (**E/C/E/C** histórico), **36 flashcards** e **24 fontes oficiais catalogadas**, não certificadas integralmente. 2015 C/E, 2023 A–E, anuladas sem pontuação. `of-2015-adv-001` continua bloqueada até cotejo documental independente. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50 são **trechos identificados**, não integrais certificados.
- Nenhuma questão aproximada, material jurídico candidato, matriz privada, nota pessoal ou arquivo real foi transmitido ao repositório, CI, PR ou artefato.

## 6. Auditoria 3 — leitura privada, estado reconfirmado

Consultados `docs/PROTOCOLO.md`, `checkpoints/estado.json`, checkpoints `AUD03-021/022/023`, SHA e situação da matriz de trabalho e lotes normativos recentes **somente para status**. A Auditoria privada avançou após S29. `AUD03-023` foi integrado na `main` (triagem de 10 conflitos secundários AU2023, sem novos vínculos); `AUD03-022` já havia integrado `NORM-INT-030` (INT33). **Na reconsulta final, após novo merge da Auditoria 1, HEAD era [`6bc8dc4731c5caddc2bfc1b14248b762fcc40512`](https://github.com/Talksxb/agu-auditoria/commit/6bc8dc4731c5caddc2bfc1b14248b762fcc40512): `NORM-INT-031` (INT34) passou a estar persistido, mas não integrado ao último checkpoint `AUD03-023`.**

- **412 IDs únicos**, **14 disciplinas**, **356 IDs com alguma evidência / 56 sem**, **127 lotes normativos integrados / 128 persistidos** no corte final, **5.994 referências integradas**, **837 pendências sem URL**, **397 questões únicas**, **zero integralmente certificados**. `NORM-INT-031.json` está apenas persistido (blob `5b866ec6917bb9d84c4d3a3c2a4d8cbe1cb2e3a5`), sem promoção automática de vínculos.
- `AUD03-023`: **10 conflitos secundários mantidos em quarentena**, 4 de cruzamento interdisciplinar, 6 da mesma disciplina, sem promoção de gabarito. Matriz-base blob `0952205a07818cda0a9ccca6dacdf340afcc6db8`; matriz de trabalho blob `f00520a6fa702b67cb0716648eae7869eb818956`. Nenhuma cópia privada publicada.
- Esse status é **fotografia do fechamento**: verificar novo merge, SHA e contagem na próxima sprint, sem presumir imobilidade de `main`.

## 7. Encerramento e pendências

**Aceite S30:** falha de foco reproduzida no browser e no teste Node antigo, patch mínimo demonstrado, pós-correção observada no Pages, Node/Chromium CI aprovados e logs/artifacts conferidos, falso negativo Pages documentado e corrigido, limite de `incomplete` honesto, backup sintético sem perda ou sobrescrita, conteúdo jurídico estável.

**Pendências:** `nao_testado_android_fisico` (incluindo toque, teclado virtual e TalkBack), `nao_testado_backup_historico_real`, verificação humana ampliada de foco/nome/ordem após outras renderizações, WCAG global não certificada, recuperação acima de 12 MB, estado antigo já corrompido e conflitos entre aparelhos sem migração/merge autorizados, questão Q1 histórica e certificação jurídica da Auditoria ainda parcial.

**Próximo handoff, não executado:** [`docs/PROMPT_SPRINT31_2026-11-13.md`](PROMPT_SPRINT31_2026-11-13.md). Uma sprint por execução; sem alteração adicional do produto por hipótese.
