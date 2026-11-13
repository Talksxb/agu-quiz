# AGU Quiz | CHECKPOINT — Sprint 33
## Continuidade de teclado no Caderno, Estudo Integrado, Revisão e Plano

**Data:** 13/11/2026 (`America/Sao_Paulo`). **Produto:** [Talksxb/agu-quiz](https://github.com/Talksxb/agu-quiz), branch `main`. **Escopo executado:** somente Sprint 33. **Resultado:** quatro grupos de falhas concretas de perda de foco pós-renderização foram reproduzidos, testados antes do patch e corrigidos pontualmente. CI novo de código com três jobs `success`, Pages atual, dados sintéticos preservados. **Sprint 34 é apenas handoff; Work Sites permanece projeto visual separado.**

## 1. Baseline e fontes

- **HEAD público na abertura:** [`6385333c639ea320299210862541d0e3c021dd1e`](https://github.com/Talksxb/agu-quiz/commit/6385333c639ea320299210862541d0e3c021dd1e), fechamento documental S32; árvore `f46f43474977e6b1a198af06195eb46b1065528a`. Worktree **separado** `agu-quiz-s33`, limpo antes da intervenção. Não se reaplicaram patches S29–S32.
- **Predecessora:** `docs/CHECKPOINT_SPRINT32_COMENTARIOS_CONSOLIDACAO_FOCO_2026-11-13.md`; também S31/S30/S29, checkpoints e prompts S19–S32, `docs/GUIA_BACKUP_LOCAL_S21.md`, `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`, módulos de Leitor/Consolidação/Caderno/Estudo/Revisão/Plano/Backup, índice, corpus público e testes S19–S32/axe/Pages/workflow.
- **CI de código anterior, distinto de S33:** [run S32 **43478145474**](https://github.com/Talksxb/agu-quiz/actions/runs/43478145474), commit `c29c8b3a`, jobs Node `132067348235`, Chromium `132067348622`, Pages `132067347780`, todos `success`. Logs individuais reabertos: Node 26/26 e 41/41, Chromium 158.0.8127.18, axe 4.14.0, S32 em cinco larguras e verificação Pages. Artefato S32 `14063787248`, 3.909.728 bytes, digest `sha256:a181739ddbb42bf7d1e1ade55d5e574761f32262ac412c6be24d06e38e02746d`. Run Pages documental posterior não foi chamado de CI novo.
- **Frente paralela:** [PR #1 — WORK 01](https://github.com/Talksxb/agu-quiz/pull/1) estava **aberta, não mesclada** na última verificação anterior ao patch. Nada da branch `work/plataforma-pessoal-01` foi incorporado pela S33. A futura camada Work Sites não foi implementada.

## 2. Falhas reais observadas **antes** do patch

**Chrome público compartilhado:** desktop, **1363 × 936 CSS px**, conteúdo local do próprio perfil de ensaio **exclusivamente sintético**; ações reais por teclado via `press('Enter')`, Tab e seleção em controles existentes. Não se utilizou nota pessoal. A cada reconstrução observada, o `document.activeElement` passou a **`BODY`**, ainda que o comando atualizasse dados/tela. `BODY` não é controle que permita continuar sequencialmente dentro do mesmo formulário.

| ID | Classe e gravidade | Passos → observado antes / esperado |
|---|---|---|
| S33-001 | `falha_reproduzida` · **média** | Biblioteca → Materiais/Leitor → Caderno; preencher título e conteúdo fictícios, **Enter em Adicionar ao Caderno**. Um registro foi criado, mas `activeElement=BODY` e Tab não partia do controle salvo. Esperado: botão **Adicionar ao Caderno** recriado, focado/visível; próximo Tab alcança **Tipo**. Também ao alterar `#ctx-filter-type`, o valor mudava para `hipotese`, mas o foco virava `BODY`; esperado: `SELECT` recriado com foco. |
| S33-002 | `falha_reproduzida` · **média** | Leitor → Estudo integrado → **Iniciar / retomar** por Enter; sessão fictícia iniciou, mas foco `BODY`. Depois **Continuar para Caderno** por Enter: etapa mudou para Caderno, foco `BODY`. Esperado: guia da **etapa corrente** com foco e rolagem reveladora; Tab segue à etapa seguinte, Shift+Tab retorna. |
| S33-003 | `falha_reproduzida` · **média** | Biblioteca → Flashcards e revisões; **Flashcards** por Enter selecionou um cartão, mas foco `BODY`. **Mostrar resposta** por Enter revelou fundamento e botões de autoavaliação, porém foco `BODY`. **Lembrei** por Enter gravou **uma tentativa fictícia** e exibiu cartão seguinte, mas foco `BODY`. Esperado: respectivamente **Flashcards** (mesmo gatilho), **Errei** (primeira opção de avaliação), **Mostrar resposta** do próximo cartão. |
| S33-004 | `falha_reproduzida` · **média** | Estudar → Plano semanal; **Salvar disponibilidade** por Enter atualizou a configuração sem alterar horas confirmadas, porém deixou foco `BODY`. Alterar matéria do primeiro `SELECT` (por exemplo, Atos → Organização administrativa) também perdeu foco. Esperado: botão salvar e `SELECT` específico da tarefa respectivamente, sem redirecionar ao topo. |

**Prova automatizada inicialmente vermelha, ainda com código original:** `node tests/sprint33-validacao.js`, Node **v24.22.1** no executor, exit **1**: **9 de 9 cenários** com observado `body`. A execução imprimiu esperado/observado antes da asserção; teste usou corpus público, uma nota artificial, uma tentativa artificial e plano gerado em `localStorage` simulado. Nenhum conteúdo de prova pessoal ou matriz privada entrou no teste. Captura visual anterior do Chrome público foi observada no cenário S33-002; o ZIP de regressão contém **captura pós-patch** gerada no CI, não se rotula captura pós como pré-patch.

## 3. Correção proporcional e prova posterior

**Commit de código S33:** [`764a5761e74d7efff65a7672e6f32e4ddebbfc54`](https://github.com/Talksxb/agu-quiz/commit/764a5761e74d7efff65a7672e6f32e4ddebbfc54), árvore `a051db3719f29ccd0f2ea5b4f82945856f360587`, publicado em `main` por atualização de referência com `expected_sha=6385333c` e sem `force`. Blobs locais das nove alterações conferidos contra `git hash-object` antes da publicação; todos coincidiram.

- `caderno-contextual.js`: somente **salvar formulário** e **filtros Tipo/Etapa** passam a recuperar o botão ou `select` correspondente após o render, quando solicitado. Sem mudança de forma, texto pessoal, schema ou ID.
- `estudo-integrado.js`: após **iniciar sessão** e **trocar etapa** pelos controles reproduzidos, a etapa selecionada (`data-agu-study-stage`) volta ao foco com rolagem normal. Não cria tentativa nem horas por navegar.
- `revisao-inteligente.js`: após selecionar modo, revelar resposta ou registrar avaliação **já voluntariamente acionada**, o próximo controle lógico recupera o foco. A lógica de pontuação, cartões, agendamento e gabaritos permanece inalterada.
- `planejamento-semanal.js`: após salvar disponibilidade ou trocar matéria de tarefa existente, foco regressa ao controle recriado identificado por `data-planner-task` e `data-planner-field`; não altera hora líquida, estado da tarefa ou calendário.
- `index.html`: cache **somente** dos quatro scripts efetivamente editados → `?v=20261113-s33a`. Leitor e Consolidação permanecem `s32a`; backup permanece `s27a`. `tests/sprint21-pages.cjs` atualizado para os dois scripts já auditados e os novos caches de Revisão/Plano; workflow inclui Node/Chromium S33 e artefatos sintéticos S33. Novos `tests/sprint33-validacao.js` e `tests/sprint33-browser.cjs`. Não houve alteração de `backup-local-s20.js`, corpus jurídico, dados S18/S19 ou fontes.
- **Mesmo teste Node pós-patch:** exit **0**, 9/9 focos pretendidos, uma nota e **uma única tentativa sintética** na VM. `git diff --check`, `node --check` nos arquivos alterados e regressões Node S19–S32: sem erro.
- **Chrome público pós-publicação, desktop 1363 CSS px:** etapa `questoes` focada, retângulo `x≈1001,5 / y≈446,5 / 168×42`, visível; **Adicionar ao Caderno** focado, `x≈1001,5 / y≈447,9 / 172×40`, duas notas exclusivamente fictícias no perfil de teste do Chrome compartilhado; após **Flashcards**, foco no mesmo botão; após **Mostrar resposta**, foco em **Errei** `x≈305,5 / y≈738,8 / 63×40`, visível; após avaliar, foco em **Mostrar resposta** do cartão seguinte. **Salvar disponibilidade** focado `x≈305,5 / y≈448 / 185×40` e `SELECT[data-planner-field=topic]` focado `x≈305,5 / y≈722 / 538×42`, ambos visíveis. Esses ensaios remotos são **desktop real**, não Android. Contagens e anotações eram só artificiais.

## 4. Regressões, ambiente e CI **novo**

| Execução | Ambiente real | Resultado e prova |
|---|---|---|
| Node local S19/S20/S25/S26/S27/S29/S30/S31/S32/S33 | **Node v24.22.1**, VM sintética | Todos `exit 0`; S19 **26/26**, S20 **41/41**, S33 **9/9** pós-patch. Não rotulado como Node 22 local. |
| Playwright local S33 | Executor local | **Não executado com sucesso**: falta `/home/agent/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell`; tentativa com `/usr/bin/chromium` abortou `socket() failed: Operation not permitted (1)`, `SIGABRT`. Não equivale a aprovação local de Chromium. |
| GitHub Actions Node S19–S33 | **Node v22.23.4** real | [run **43486462994**](https://github.com/Talksxb/agu-quiz/actions/runs/43486462994) no SHA `764a5761`, job **`integridade-node` 132096113411: success**. Logs reabertos: fronteiras UTF-8 S25 (650 registros; 6.712.561 caracteres / 13.213.211 bytes; compacto 11.999.987 / indentado 12.000.013), S26 (6 notas inválidas recusadas, 14.000 caracteres válidos com hash preservado), S27 (cinco falsificações recusadas sem escrita; duas notas válidas/idempotentes), S29–S33 aprovadas. |
| GitHub Actions Chromium E2E + axe | **Chromium 158.0.8127.18**, Node 22.23.4, axe 4.14.0 | Job **`navegador-chromium` 132096113891: success**. Logs reabertos S20–S24/S29–S33. `S33_BROWSER_FOCO_OK` nos viewports **320/360/390/430/1280 CSS px** com 10 subcenários: Caderno salvar/filtro; Estudo iniciar/etapa; Revisão selecionar/revelar/avaliar; Plano salvar/matéria; **reload sem duplicar registros**. Tab/Shift+Tab efetivos em Caderno, etapas e Revisão. Touch emulado não significa Android físico. |
| GitHub Actions Pages | HTTPS, testes de blobs | Job **`pages-publicado` 132096114048: success**, log `PAGES_VERIFICADO`. Verificação independente no executor: `node tests/sprint21-pages.cjs` exit **0**, HTTPS **200**, HTML + cinco scripts com hashes iguais ao checkout. |

**Artefato sintético CI S33:** [ZIP **14067482867**](https://github.com/Talksxb/agu-quiz/actions/runs/43486462994/artifacts/14067482867), nome `agu-s20-chromium-viewports`, **3.984.068 bytes**, digest `sha256:f9e18d7bf235e36e278cd9e9855cd358c35f8e92df5dd309a5ae9f3756e9746b`, expira **20/11/2026 18:51:22 UTC**. Metadados e download do ZIP via conector reabertos, sem alegar inspeção manual de cada item do arquivo. Inclui `tests/artifacts-s33/foco-modulos-s33.json` e `foco-plano-s33-390.png`, além de artefatos sintéticos das regressões anteriores. **Nenhum backup pessoal ou matriz privada foi anexado.**

**Axe e contraste do CI S33:** **26 varreduras**; no recorte testado, **zero `violations`**, **13 cenários / 19 nós `color-contrast incomplete`** inicialmente por elemento parcialmente obscurecido (`elmPartiallyObscured`), e **19/19 `passed` após rolar até plena visibilidade**. `incomplete` inicial não é violação nem foi apagado pela passagem posterior. Inspeção humana completa, TalkBack e **certificação WCAG global não realizados**. Nenhum CSS alterado sem reprovação real.

### Pages: SHA-256 publicado com HTTPS 200

| Arquivo | SHA-256 efetivo |
|---|---|
| `index.html` | `3a366e2f5fb1c3dcb7eaeaaf825c17d3ca47abaede4dc948806ae7e689a38c54` |
| `revisao-inteligente.js` | `0e47b3b5c65796d4bbf7656b20974e4cccd25e9c4d17ec4869f14cb90c184877` |
| `planejamento-semanal.js` | `e762a80a921488e9e4def02408a9904ab516830e6e02cf40cbc7104dcdc64152` |
| `leitor-consolidacao.js` | `3c64085c0077637f476697b0817a34a22a8f6315095b423a1d00963d1f1e4f88` |
| `backup-local-s20.js` | `d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78` |
| `leitor-juridico.js` | `8045194f8a8ec2bbd10e95fff8ce04c39042d5f7957ad780200433793911f2e1` |
| `caderno-contextual.js` | `9656b85c83a81bb62f150e49b99f9d1af7b9b638c51990e77cc9aa0c110a32f4` |
| `estudo-integrado.js` | `2857f121fa2ff9202b0dcd12a6aec06a9894837e7582fb99224972de035de5b7` |

As quatro versões S33a foram confirmadas também no DOM do Chrome público. Os dois scripts extras (Caderno e Estudo) tiveram fetch HTTPS independente e SHA idêntico ao arquivo local. Esses são hashes do corte; conferi-los novamente antes de futura publicação.

## 5. Recuperação, privacidade e conteúdo jurídico

- `agu-portable-local-s20-v1`: **nove categorias catalogadas exclusivamente no `localStorage`**, máximo **12.000.000 bytes UTF-8** por categoria/pacote/arquivo formatado segundo contrato; validação `AGUValidateMatrix`, SHA-256 por categoria, restauração **só de categoria ausente**, sem sobrescrita, quota/rollback e idempotência. Testes Node S25/S26/S27 e Chromium S20–S24 novos no CI deram `success`. Nenhuma chave ou schema foi alterado pela S33.
- **`nao_testado_backup_historico_real`**: nenhum arquivo pessoal entregue voluntariamente com autorização específica. Não foram feitos ensaios reais de histórico antigo, conflitos entre aparelhos, dados já corrompidos ou backup acima de 12 MB; não há solução integral autorizada para esses estados. **Não apagar navegador, editar/dividir/comprimir JSON, migrar nem fazer merge entre aparelhos por improvisação.**
- **`nao_testado_android_fisico`**: nenhuma disponibilidade física e consentimento específico para aparelho; não foram inventados modelo, Android/Chrome, orientação, densidade, teclado virtual, toque real, viewport físico ou TalkBack. Viewports do CI são **Chromium desktop emulado**; o Chrome compartilhado é **desktop real**. Roteiro S24 preservado para teste humano autorizado.
- **Jornada e rigor jurídico preservados:** só quatro destinos (**Início, Estudar, Biblioteca Inteligente, Evolução**), revisão D+1/D+7/D+21/D+45, 36 flashcards, 24 fontes oficiais **catalogadas**, provas 2015 C/E e 2023 A–E, anuladas sem pontuação. Questões auditadas `of-2015-adv-006/-007/-009/-048`, gabaritos históricos **E/C/E/C**. `of-2015-adv-001` segue excluída da nova correção automática até cotejo independente. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50 são **recortes identificados**, não íntegra jurídica certificada. `confirmado_pontualmente` **não** é `certificado_integralmente`.

## 6. Auditoria 03 — **somente status**, sem divulgação da matriz

Leitura em `Talksxb/agu-auditoria`: `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `checkpoints/AUD03-023.json`, metadados da matriz e enumeração de lotes normativos no corte. **HEAD consultado após a publicação de código S33:** [`d0823c40ec4a06b93e69a06bc1504a6dec08e220`](https://github.com/Talksxb/agu-auditoria/commit/d0823c40ec4a06b93e69a06bc1504a6dec08e220). Último AUD03 **efetivamente integrado: `AUD03-023`**; **412 IDs**, **356** com alguma evidência / **56** sem, **127** lotes normativos integrados, **5.994** referências, **837** pendências sem URL, **zero** temas integralmente certificados. Na árvore desse HEAD havia **131 lotes normativos persistidos**, incluindo `NORM-INT-031`, `-032`, `-033` e `-034` **ainda fora do corte AUD03-023**: **127 integrados de 131 persistidos**. Números dinâmicos; reconsultar novamente no fechamento e na S34. Nenhuma cópia da matriz/evidências privadas ao repositório público.

## 7. Matriz de risco e continuação

| Classe / gravidade | Situação no corte |
|---|---|
| `falha_reproduzida` / média | S33-001 a S33-004: reprovações antes, correção pontual, prova Node/CI/Chrome público depois. |
| `risco` / média | Controles **não reproduzidos nesta sprint** (editar/excluir Caderno, retomar/encerrar/vincular Estudo, catálogo e seletores específicos de Revisão, regenerar/deslocar/checkbox Plano) ainda requerem verificação proporcional; sem patch por hipótese. |
| `risco` / alta | Integridade local e conflitos entre dispositivos, limite real 12 MB, armazenamento previamente corrompido, perda por limpeza. Política conservadora intacta. |
| `nao_testado_android_fisico` / média | Teste físico e TalkBack dependem de aparelho e consentimento. |
| `nao_testado_backup_historico_real` / média-alta | Sem arquivo pessoal autorizado; somente perfis e arquivos sintéticos. |
| `risco_juridico` / alta | Quatro questões confirmadas pontualmente, demais pendências e **zero** certificações integrais; não houve promoção. |
| `melhoria_opcional` / futuro isolado | Arquitetura/UX da camada **ChatGPT Work Sites**, com GitHub fonte da verdade, requer decisão e autorização própria; **não** implementada S33. |

**Próximo documento:** `docs/PROMPT_SPRINT34_CONTINUIDADE_SEGURA_2026-11-13.md` — **somente handoff**, Sprint 34 **não executada**. Preservar evidência antes de mudança, privacidade de histórico e rigor jurídico.
