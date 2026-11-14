# AGU Quiz | CHECKPOINT — Sprint 39
## Isolamento bloqueado, navegação real sem escrita e recuperação conservadora — sem patch

**Corte:** 13/11/2026, `America/Sao_Paulo` (consultas técnicas também em 14/11 UTC). **Produto:** [Talksxb/agu-quiz](https://github.com/Talksxb/agu-quiz), branch `main`. **Decisão:** não se reproduziu defeito adicional nos controles realmente ensaiados; **nenhuma alteração do produto, CSS, cache, teste ou workflow**. Fechamento restrito a este documento e ao handoff Sprint 40. **Sprint 40 não executada.**

## 1. Fonte real, concorrência e método

- `main` na abertura: **`ea1b7699818a42857ddcdc76d17eaeefdeff0ad0`**, árvore **`fa5659f88cca3b049704600c1f66017cfad42ac1`**, commit exclusivamente documental da S38. **Clone novo, `main`, worktree limpo**, mesmo SHA/árvore da branch remota. A WORK01 continua integrada via `4fa4d2955be60e8acf5e2d134e9d5b241f84f6c3`; patches S29–S35 e contratos de armazenamento não foram reescritos.
- **[PR LEG-01 #2](https://github.com/Talksxb/agu-quiz/pull/2)** em `leg/leg01-inventario`, head `091fb3d63fd43d0669695c4091197dc58e64a982`, **aberta e ainda não mesclada** no corte. [Run PR 43533990795](https://github.com/Talksxb/agu-quiz/actions/runs/43533990795): Node/Chromium `success`, `pages-publicado` `skipped` intencionalmente. Não é código S39, não está na `main` e não foi misturado ao diagnóstico de foco.
- Lidos checkpoint S38 e checkpoints S37/S36/S35, guia `docs/GUIA_BACKUP_LOCAL_S21.md`, roteiro `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`, histórico S19–S34; inspecionados `index.html`, WORK01, quatro módulos, Leitor, Consolidação, backup, questões S18/S19, corpus S13, suites Node/E2E, axe, Pages e workflow. Nenhum texto candidato ou arquivo privado foi promovido.

## 2. Primeiro bloqueio: **não existe perfil browser comprovadamente isolado**

**Navegador gerenciado:** inventário CUA/Sky mostrou **um único Chrome/Chromium/CDP** e **quatro abas já existentes** do AGU Quiz. A janela comum exibia registros locais preexistentes (**2 avaliações, 2 notas contextuais**). A S37 havia demonstrado que aba com outro `sessionName` compartilhava o mesmo armazenamento. Nesta sprint:

1. Tentou-se o atalho nativo **Ctrl+Shift+N**: não surgiu nova janela. Ao abrir visualmente o menu do Chromium, a opção **“New Incognito window”** estava **desabilitada**. Trata-se de bloqueio do navegador gerenciado, **não** de defeito do AGU Quiz; não se tentou contornar política, mudar perfil preexistente ou limpar dados.
2. Tentou-se **somente iniciar um Chromium local `about:blank`**, com `--headless --no-sandbox --user-data-dir` apontando para **diretório temporário novo**, sem acessar a aplicação ou perfil do usuário. O processo terminou **exit 134**: `socket() failed: Operation not permitted (1)` em `process_singleton_posix.cc`, além de mensagem de ptrace negado. O executável Playwright `chromium_headless_shell-1234` não está disponível historicamente. **Nenhum contexto headless local se tornou utilizável.**
3. Diante disso, **não** houve criação/exclusão de notas, vínculo/importação de legado, nova sessão, avaliação, alteração de plano, regeneração, exportação/restauração de backup ou teste de confirmação nativa com aceite. Nem mesmo uma nova aba seria chamada de perfil isolado.

Classificação: **`nao_testado_browser_isolado`**, gravidade alta para preservação de histórico. As larguras **320/360/390/430/1280 CSS px, diálogos mutáveis, axe/contraste novos e screenshots exclusivamente sintéticas** permaneceram **`nao_testado`**. A indisponibilidade do navegador **não foi convertida em aprovação funcional**. Captura do menu foi vista na sessão de diagnóstico, mas **não foi anexada ao GitHub**, pois a janela contém estado compartilhado. A inspeção visual do menu não é teste humano de acessibilidade/TalkBack.

## 3. Chrome real em modo **somente navegação**, 1363 × 936 CSS px

O percurso efetivo ocorreu na aba já existente `https://talksxb.github.io/agu-quiz/?verificacao_s34=1`, **sem mutação intencional**. `Tab`, `Shift+Tab` e `Enter` foram enviados ao foco corrente. Todas as coordenadas abaixo são `getBoundingClientRect()` em CSS px, não dimensões físicas de aparelho. `scrollX=0`, `scrollY=0` nos trechos medidos; os controles observados estavam no viewport.

| Sequência / estado | `document.activeElement` observado | Retângulo `x,y,w,h` | Esperado × observado |
| --- | --- | --- | --- |
| Home → `Tab`, `Tab` | `BUTTON` **Estudar** | `15,151,200,44` | Entrada principal focada e visível |
| `Enter` em Estudar | botão **Estudar** ativo | — | Subnavegação existente, sem criar sessão |
| Seis `Tab` a partir de Estudar | `BUTTON` **Plano semanal** | `616.97,157.95,113.48,43` | Controle secundário visível |
| `Enter` em Plano semanal | `H1` **Planejamento semanal** | `284.52,103,501.94,39` | Título programaticamente focado e visível após troca de contexto |
| `Tab` a partir do título | `INPUT#planner-min-0`, nome **Minutos de Segunda** | `361.77,453,96,38` | Próximo campo de teclado visível, sem alterar minutos |
| `Shift+Tab` a partir do campo | `BUTTON` **Plano semanal** | `611.69,30,119.08,43` | Foco voltou ao controle de navegação; o `H1` com `tabindex=-1` é alvo programático, não etapa regular de Tab |
| Sete `Shift+Tab`, `Enter` | `BUTTON` **Início** | — | Home retomada sem iniciar atividade |
| Recarga integral + primeiro `Tab` | `BUTTON` **Início** | `15,102,200,44` | A recarga deixou `BODY`, mas Tab alcançou controle real visível; não houve bloqueio demonstrado |

Após Plano → Home e reload, a interface continuou exibindo **Lei nº 9.784/1999, art. 13 / ADM-06 / Flashcards**, **0 revisões pendentes**, **0 revisões do treino autoral**, **0 minutos confirmados**, **2 avaliações e 2 notas contextuais**. O Plano exibiu previsão de **13h00** e **0/18** tarefas concluídas, com o aviso explícito de que tarefas manuais não são tempo confirmado. **Esses são indicadores de interface iguais antes/depois**, não prova de SHA ou bytes idênticos do `localStorage`. Nenhuma tentativa/sessão fantasma foi **observada nesses indicadores**; ausência de gravação não foi demonstrada por interceptação de armazenamento. Não houve toque físico nem inspeção humana de leitor de tela.

| Cenário | Categoria / gravidade | Decisão |
| --- | --- | --- |
| S39-F01: Home → Estudar → Plano → Home e Tab reversível | `risco`, moderada; foco visível conforme esperado | **Sem `falha_reproduzida`**, sem patch |
| S39-F02: H1 após render → campo de minutos → retorno Shift+Tab | `risco`, moderada; retângulos observados | **Sem `falha_reproduzida`**, sem patch |
| S39-F03: reload integral e primeiro Tab | `risco`, moderada; foco em Início, indicadores iguais | **Sem `falha_reproduzida`**, sem patch |
| S39-I01: exclusão, legado, vínculos e sessões artificiais com confirmações reais | `nao_testado`, alta para dados | Perfil isolado indisponível |
| S39-I02: C/E Conferir e regeneração/movimento em plano fictício | `nao_testado`, alta para pontuação/histórico | Perfil isolado indisponível |
| S39-I03: 320/360/390/430/1280 e axe novos | `nao_testado`, moderada | Chromium descartável não iniciou |
| S39-O01: visual ChatGPT Work Sites | `melhoria_opcional`, fora do escopo | Frente isolada, sem implementação |

**Total `falha_reproduzida`: zero nos percursos realizados.** Não se criou teste inicialmente vermelho nem patch sem falha observada. A S39 não certifica os diálogos bloqueados.

## 4. Regressões Node, CI/ZIP histórico e limites de acessibilidade

**Executados nesta S39 em Node local v24.22.1, todos `exit 0`:** `tests/sprint19-validacao.js` (**26/26**), S20 (**41/41**), S25, S26, S27, S29, S30, S31, S32, S33, S34, S35 (**9/9**) e WORK01 (**14 verificações**). Destaques sintéticos efetivamente repetidos:

- S25: **650 registros acentuados**, **13.213.211 bytes / 6.712.561 caracteres**; compacto **11.999.987** vs JSON formatado **12.000.013 bytes**, recusa e restauração pequena SHA-idêntica.
- S26: **seis** formatos inválidos de anotação rejeitados antes da escrita; texto string válido até **14.000 caracteres**, hash/idempotência preservados.
- S27: **cinco** estados forjados recusados e **duas** notas válidas idempotentes; S29–S35/WORK01 preservam regressões sintéticas de foco, salvamento, vinculação, tarefas e tentativa única.

**Sem Chromium/E2E/axe novos nesta S39.** Último CI **de código na `main`** continua **S35**: [run **43494607030**](https://github.com/Talksxb/agu-quiz/actions/runs/43494607030), SHA `af5d820dd83abdf594284371f053cfd64e133011`. Jobs **reabertos com logs individuais**:

| Job | ID | Resultado histórico, não S39 |
| --- | --- | --- |
| `integridade-node` | `132124310700` | `completed/success`; Node 22, S19–S35/WORK01 |
| `navegador-chromium` | `132124310239` | `completed/success`; Chromium 158.0.8127.18, cinco larguras e `noGhost:true` nos testes sintéticos então existentes |
| `pages-publicado` | `132124310834` | `completed/success`; HTTPS 200 no SHA S35 |

**ZIPs S35 baixados e novamente verificados nesta S39** (`unzip -t` sem erro), sem criar ZIP S39: Chromium `14070138441`, **4.204.168 bytes**, `sha256:587b94dd42c6b10bb4ad3983cce69a5813ca32f14222d172ddf06b19204ff680`; WORK01 `14071202201`, **68.429 bytes**, `sha256:a8d4064ea14c7c5299e9e694a8443162a6cea87b8a3242a155e03bc16c37d624`, ambos ainda não expirados com expiração GitHub **20/11/2026 UTC**. Nomes dos arquivos ZIP foram inspecionados, **não** todos os screenshots visualmente. A última [implantação documental S38, run 43535173999](https://github.com/Talksxb/agu-quiz/actions/runs/43535173999), SHA `ea1b769`, foi `completed/success` e **não é novo CI de código**.

**Axe/contraste somente baseline CI S35:** axe-core **4.14.0**, **26 scans, zero violations nos recortes**, 13 cenários/19 nós `color-contrast incomplete` por `elmPartiallyObscured`, **19/19 passed após rolagem**; não equivalem a axe S39, WCAG integral, inspeção humana ou TalkBack. Não se alteraram cores/CSS.

## 5. Pages, backup conservador e proteção jurídica

`node tests/sprint21-pages.cjs` **executado S39, exit 0**: HTTPS **200** para HTML e seis scripts do checkout; `curl` confirmou Caderno e Estudo. **SHA-256 HTTPS remedidos**:

| Arquivo | SHA-256 | Cache HTML |
| --- | --- | --- |
| `index.html` | `c7aac0c3af238902b05b56086c19ffbed8ae1c7171b2dfd643758ebb1a17bf50` | — |
| `revisao-inteligente.js` | `ff1ad844a49ef7b98abdb7efd6bdd65f18a83924c4fc5ee8bcd9c75f9a68fc4a` | `20261113-s35a` |
| `planejamento-semanal.js` | `b11788273caf97a35d155be1b60d42dbb7f302b6aa55912f1f4e6942436bbc7b` | `20261113-s35a` |
| `leitor-consolidacao.js` | `3c64085c0077637f476697b0817a34a22a8f6315095b423a1d00963d1f1e4f88` | `20261113-s32a` |
| `backup-local-s20.js` | `d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78` | `20261113-s27a` |
| `leitor-juridico.js` | `8045194f8a8ec2bbd10e95fff8ce04c39042d5f7957ad780200433793911f2e1` | `20261113-s32a` |
| `meu-estudo.js` | `a6c8d9d8c706bee481517e37c18b141985f3737422270ca919e78b3d9b035fc0` | `20261113-work01b` |
| `caderno-contextual.js` | `0eff71cc11e85110faf755d3e6ae305eb5b21c5624e4b8f52111fff1c44675a8` | `20261113-s35a` |
| `estudo-integrado.js` | `6f142c9c945428202afe792f921bc4efd12798deada63a9f86dc1e99f5d21adc` | `20261113-s35a` |

Preservado **`agu-portable-local-s20-v1`**: **nove categorias exclusivamente `localStorage`**, máximo de **12.000.000 bytes UTF-8** por categoria/pacote/JSON formatado conforme contrato, SHA-256 por categoria, `AGUValidateMatrix`, quota/rollback, importar só categorias ausentes, idempotência e **nunca sobrescrever**. Não importar, limpar, mesclar, compactar, dividir, editar ou migrar arquivo pessoal; >12 MB e corrupção prévia permanecem sem solução integral aprovada.

- **`nao_testado_backup_historico_real`**: nenhum arquivo pessoal e autorização específica fornecidos; não se restaurou nada real. Conflitos entre aparelhos exigem conservar ambas as cópias.
- **`nao_testado_android_fisico`**: nenhum aparelho acessível com consentimento específico; modelo, Android/Chrome, viewport, densidade, teclado virtual, toque físico e TalkBack **não testados**. Roteiro S24 permanece condicional.
- Quatro destinos preservados (**Início, Estudar, Biblioteca Inteligente, Evolução**), 36 flashcards, 24 fontes oficiais apenas **catalogadas**, revisão D+1/D+7/D+21/D+45, itens históricos auditados `of-2015-adv-006/-007/-009/-048` com gabaritos E/C/E/C; 2015 C/E e 2023 A–E apenas se individualmente cotejado, anuladas sem pontos. `of-2015-adv-001` continua **fora** da correção automática nova. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50 são excertos identificados; **`confirmado_pontualmente` não é `certificado_integralmente`**. Nenhuma questão/fonte/matriz privada foi publicada.

## 6. Auditoria 03 privada, reaberta apenas para metadados

Em [Talksxb/agu-auditoria](https://github.com/Talksxb/agu-auditoria), lidos **somente em leitura** `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `checkpoints/AUD03-028.json` e metadados de inventário/handoff; **não** se copiou matriz ou evidências para o Quiz, Actions, logs, ZIP ou GitHub público. A informação dinâmica foi reconsultada durante a sprint:

| Corte | HEAD privado | Último integrado | IDs com / sem alguma evidência | Lotes integrados / persistidos | Referências | Certificação integral |
| --- | --- | --- | --- | --- | --- | --- |
| Abertura | `5fe749b13cf4522f53dff798cb092588bb878078` | **AUD03-028** | **363 / 49** de 412 | **137 / 137** | **6.467** | **0** |
| Reconsulta intermediária | `ac6aef17471fab37ab088df3adb17e0917c6a6f7` | **AUD03-028** | **363 / 49** de 412 | **137 / 137** (`NORM-INT-040` integrado) | **6.467** | **0** |
| **Fechamento pré-publicação** | **`c5ca3ea4211cbd4f464e0c9f8bf4a922a1c8339e`** | **AUD03-028** | **363 / 49** de 412 | **137 / 138** (`NORM-INT-041` persistido, ainda não integrado) | **6.467** | **0** |

O checkpoint **AUD03-028** integra `NORM-INT-040`; posteriormente **`NORM-INT-041` foi persistido sem integrar o mesmo checkpoint**. O progresso jurídico é parcial. Nenhum item foi certificado integralmente por inferência. O estado é dinâmico; distinguir sempre persistência e integração.

**Encerramento:** S39 trouxe **prova nova de navegação real até o Plano** e **evidência objetiva do bloqueio do perfil anônimo**, mas não prova de cinco viewports ou confirmações mutáveis. **Sem patch e sem novo CI de código**; nenhuma razão para alterar testes/workflow artificialmente. O [prompt integral Sprint 40](PROMPT_SPRINT40_ISOLAMENTO_CONTROLADO_RETORNO_2026-11-13.md) é **somente handoff**. Sites visual continua fora do escopo.
