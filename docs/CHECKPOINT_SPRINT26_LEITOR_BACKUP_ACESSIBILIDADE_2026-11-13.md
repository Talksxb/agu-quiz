# AGU Quiz | CHECKPOINT — Sprint 26
## Anotações válidas no backup, proteção local, regressão UTF-8 e acessibilidade verificável

**Data:** 13/11/2026 (`America/Sao_Paulo`). **App:** `Talksxb/agu-quiz`, branch `main`. **Status:** uma falha demonstrada e corrigida, testes Node/Chromium/Pages reais com três jobs `success`, arquivos de código reabertos após publicação. **Sprint 27 não executada.**

## 1. Baseline, leitura e reconsulta da Auditoria 3

- **HEAD inicial:** [`a22ac99eb96f85d95a35282f366132cc2147aba7`](https://github.com/Talksxb/agu-quiz/commit/a22ac99eb96f85d95a35282f366132cc2147aba7) — encerramento documental S25. A referência para o código S25 era [`b2d94ef5d87ebb515d9b66f46a51f9278ff6b5d8`](https://github.com/Talksxb/agu-quiz/commit/b2d94ef5d87ebb515d9b66f46a51f9278ff6b5d8), com run [43415797662](https://github.com/Talksxb/agu-quiz/actions/runs/43415797662) e [artefato 14031433418](https://github.com/Talksxb/agu-quiz/actions/runs/43415797662/artifacts/14031433418). Não se confundiu run anterior com execução S26.
- **Documentos consultados:** checkpoints S19–S25 (especialmente `docs/CHECKPOINT_SPRINT25_BACKUP_UTF8_ACESSIBILIDADE_2026-11-13.md`), `docs/GUIA_BACKUP_LOCAL_S21.md`, `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`, prompts anteriores e prompt S26. Código/contratos de `index.html`, backup, Revisão, Planejamento, Caderno, Estudo Integrado, Leitor Jurídico, Consolidação, Questões S18, dados S18/S19; testes Node S19/S20/S25, Chromium S20–S24, axe S22/S23/S24, verificador Pages e workflow.
- **Auditoria privada, somente leitura:** `docs/PROTOCOLO.md`, `checkpoints/estado.json`, checkpoints AUD03 e evidências normativas. O estado **mudou durante a execução**. Na primeira reconsulta ainda havia **`AUD03-018`**, com 412 IDs, 124 lotes normativos integrados, 353 IDs com alguma evidência, 59 sem, 5.871 referências, 837 pendências sem URL, zero tópicos certificados integralmente. O arquivo `NORM-INT-029` já estava persistido. Na reconsulta posterior, `checkpoints/estado.json` passou a **`AUD03-019`**, confirmada a integração de `NORM-INT-028` (INT31), PR 153, merge `22364be6855669a958d90c1c9c3aa2fd3b39e9eb`: **412 IDs únicos**, 14 disciplinas, **125 lotes normativos integrados de 126 persistidos**, **354 IDs com alguma evidência, 58 sem**, 5.914 referências, 837 pendências sem URL, **zero certificados integralmente**. `NORM-INT-029` (INT32) continua **persistido, mas não integrado nessa fotografia**. Matriz-base SHA `0952205a07818cda0a9ccca6dacdf340afcc6db8`; matriz de trabalho AUD03-019 SHA `98fd40ad8dffea03224be586bfe72cf5f864bdff`. **Nenhum arquivo da Auditoria privada ou da matriz foi alterado/publicado.**

## 2. Falhas, cenário anterior e decisão

| ID | Classe | Gravidade / impacto | Reprodução pré-patch, intervenção e prova pós-patch |
|---|---|---|---|
| **S26-001** | **`falha_reproduzida` → corrigida** | **Média**: backup local aceitava categoria malformada do Leitor, com risco de restaurar conteúdo não textual e exibir representação enganosa | Na VM Node com módulos reais e dados sintéticos, `agu_leitor_juridico_s13_v1` com `notes:{"CF88:art37:caput":{"texto":"NOTA_OBJETO_INVALIDA"}}` era **aceito por `validateRecord` e exportado**. A exibição real do Leitor gerava **`[object Object]`**, em vez de nota. O editor `leitor-juridico.js` só grava strings de até **14.000 caracteres**. Patch mínimo em `backup-local-s20.js`: exigir que cada `notes` seja string com até 14.000 caracteres. Após patch, **seis valores inválidos** (objeto, nulo, número, array, objeto com HTML e string com 14.001 caracteres) são rejeitados **antes de qualquer escrita**, preservando estado anterior. Texto sintético válido de 14.000 caracteres restaura com SHA-256 idêntico `1c2d8b6c9c4046adcc3de48871df05f47d1046af4d62c3d4e0afbc9b3b339eb7`, sem sobrescrita e com segunda importação idempotente. |
| **S26-002** | **`risco` do contrato S25, regressão preservada** | **Alta** se exportação ultrapassar 12 MB em bytes reais | S25 foi reexecutada com massa sintética: **6.712.561 caracteres, 13.213.211 bytes UTF-8** são recusados sem gerar download; a formatação expande JSON **11.999.987 → 12.000.013 bytes**, também recusado. Backup pequeno (**640 bytes**) restaura com SHA-256 idêntico e sem sobrescrita. A fixture antiga S25 usava uma nota monolítica inválida para o próprio Leitor; ajustou-se **somente o teste** para 760 registros de Caderno individualmente validados por `AGUCaderno.valid`, atingindo a mesma fronteira de bytes, sem afrouxar o código de produção. |
| **S26-003** | **`risco` residual de capacidade** | **Média/alta** para quem ultrapassa 12 MB | Rejeitar exportação inutilizável **não significa** recuperar automaticamente um histórico acima do limite. Importadores de módulos podem ter limites menores. Preservar o navegador, procurar orientação específica, sem sugerir apagar dados, dividir arquivo manualmente, compactar, sincronizar ou migrar sem projeto/consentimento próprios. |
| **S26-004** | **`risco` / axe `incomplete`** | **Média** para acessibilidade fora do recorte | Chromium/axe 4.14.0: **26 scans S23**, **0 `violations` no recorte** e **13 cenários/19 nós `color-contrast` `incomplete`**, marcados por `elmPartiallyObscured`. Em S24, os **19/19** nós foram reavaliados como `passed` após rolar horizontalmente e expô-los integralmente. Foco visível por teclado e programático em **320/360/390/430/1280 px**; touch **emulado** em 320/390/430 sem tentativas sem resposta. Não equivale a inspeção TalkBack nem certificação WCAG integral. |
| **S26-005** | **`nao_testado_android_fisico`** | **Média** para toque, teclado virtual e leitura de tela reais | Não havia aparelho fisicamente conectado e autorizado; `adb` ausente. Não se mediu fabricante/modelo, Android/Chrome, densidade, viewport físico ou TalkBack. Chromium desktop em CI não foi chamado de Android real. Roteiro S24 permanece válido. |
| **S26-006** | **`nao_testado_backup_historico_real`** | **Média/alta** para compatibilidade retrospectiva e conflitos | Nenhum arquivo histórico pessoal foi fornecido/consentido. As cópias e matrizes reais não foram acessadas. Fixtures sintéticas **não** demonstram compatibilidade histórica; em aparelhos concorrentes, preservar ambas as cópias sem merge. |
| **S26-007** | **`risco` jurídico sob controle** | **Alta** se gabarito/certificação forem inferidos | Q1 de 2015 (`of-2015-adv-001`) permanece fora da nova correção automática; zero tópicos certificados integralmente na Auditoria; nenhuma evidência pontual foi promovida. |

**Limite do patch:** o validador agora impede **restaurar** notas inválidas por backup; **não reescreve nem repara automaticamente** `localStorage` já corrompido em instalações antigas. Não foi criada migração.

## 3. Testes efetivamente executados e publicação

**Commit de código S26 em `main`:** [`1f00cd04c672324e5fee7a7819078a3c2e548f71`](https://github.com/Talksxb/agu-quiz/commit/1f00cd04c672324e5fee7a7819078a3c2e548f71). Blobs de `index.html`, backup e regressões foram **reabertos após o push** para confirmar persistência.

**CI novo, do SHA S26:** [GitHub Actions **43433536507**](https://github.com/Talksxb/agu-quiz/actions/runs/43433536507). Os três jobs foram consultados separadamente, com **logs individuais reais**:

| Job / ID | Status real | Evidência observada |
|---|---|---|
| `integridade-node` / **131912737834** | **success** | **Node v22.23.4**: S19 **26/26**, S20 **41/41**, S25 **3/3 cenários** (UTF-8, JSON formatado, recuperação) e S26 **6 rejeições inválidas + caso válido no limite**, preservação/idempotência. Localmente, Node v24.22.1 repetiu e aprovou as quatro suítes após ajuste da fixture. |
| `navegador-chromium` / **131912738334** | **success** | **Chromium 158.0.8127.18**, **axe-core 4.14.0**; E2E S20/S21/S22/S23, varreduras axe S22/S23 e S24 (contraste, foco, touch emulado). S21: cinco viewports, recuperação em perfil novo, quota/rollback. S22: **nove categorias, SHA por categoria, refresh, idempotência, não sobrescrita**. S23: arquivo truncado/excessivo, versão/categoria/dispositivo inválidos, quota e preservação. S24: 26 cenários, 19/19 nós após rolagem, navegação por teclado, touch emulado sem tentativa indevida. |
| `pages-publicado` / **131912738377** | **success** | URL [HTTPS Pages](https://talksxb.github.io/agu-quiz/) com **HTTP 200**, HTML e **quatro scripts** com SHA-256 iguais ao checkout do commit. Nas tentativas **1–3**, o HTML remoto ainda tinha versão anterior; na **4ª tentativa**, ocorreu propagação e `PAGES_VERIFICADO`. `cache-control: max-age=600`; versão do backup **`backup-local-s20.js?v=20261113-s26a`**. HTML SHA-256 `b4866ba26ae5744246da19432aaf3ce0552385eafb9ae1f579f38eb04329eb3c`; backup SHA-256 `ea20adf4abf7676f6a0721f7393cf7b8dba1c78323868984b56e122a6548c3d5`. |

**Artefato sintético:** [ID **14042295888**](https://github.com/Talksxb/agu-quiz/actions/runs/43433536507/artifacts/14042295888), ZIP realmente **baixado** (3.680.239 bytes) e listado: **16 arquivos** (10 PNG S20/S21, 3 JSON diagnósticos S22/S23/S24 e 3 PNG touch emulado S24), sem notas ou backups pessoais. Resumos JSON foram lidos: S22 **26 scans**, zero falhas classificadas critical/serious/moderate/minor no recorte; S23 `violations:[]`, 13 cenários/19 nós `incomplete`; S24 **19 inicialmente inconclusivos → 19 `passed` após rolagem**, três larguras touch emulado, `attempts:0`. A execução de Chromium **local** continuou bloqueada pela sandbox (`socket(): Operation not permitted`); a evidência de navegador real vem **do CI**, não de teste local alegado.

**SHA-256 do restante de Pages no log:** `revisao-inteligente.js` `044ed4077209dc29cf478041592825d10a749b1b052b1568846bf13c4ebbbaab`; `planejamento-semanal.js` `34e40e677eb2648f46909fbc3eb93be162d52392b797540d482bc0b631199d73`; `leitor-consolidacao.js` `4ed853b6a862a103969b94440545db28a51cb060d44723d2c67387a236ee2b3f`.

## 4. Contratos preservados e limites verificáveis

- **Backup:** `agu-portable-local-s20-v1`; **nove chaves catalogadas**; somente `localStorage`; importação **apenas de categorias ausentes**; limite **12.000.000 bytes UTF-8** da categoria, conjunto e arquivo JSON formatado; validação curricular via **`AGUValidateMatrix`**; rollback de quota; hashes SHA-256 e idempotência. Não há login, banco, rede, sincronização, fusão automática nem envio de histórico pessoal.
- **Jornada:** quatro destinos **Início, Estudar, Biblioteca Inteligente, Evolução**; missão recomendada, Planejamento, Revisão, Caderno/Leitor e Evolução, com retorno, refresh e teclado. E2E cobre não criação de tentativa sem resposta ao voltar/recarregar. Agenda **D+1/D+7/D+21/D+45**.
- **Conteúdo:** quatro questões auditadas `of-2015-adv-006/-007/-009/-048` e gabaritos definitivos **E/C/E/C**; **36 flashcards**, **24 referências oficiais catalogadas** (**não 24 certificações**), 2015 **C/E**, 2023 **A–E**, anuladas **sem pontuação**. Q1 `of-2015-adv-001` continua bloqueada até confronto histórico independente. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50 permanecem **excertos identificados**, não textos integrais. `confirmado_pontualmente` ≠ `certificado_integralmente`.
- **Privacidade:** todos os backups e respostas do teste são sintéticos. Nenhum dado pessoal, matriz privada ou arquivo de estudante foi publicado na aplicação, CI ou artefatos.

## 5. Tabela de arquivos, commits e escopo

| Arquivo | Commit | Alteração realmente persistida |
|---|---|---|
| `backup-local-s20.js` | **`1f00cd04`** | Recusa notas não textuais ou >14.000 caracteres na categoria do Leitor, sem mudar o esquema. Blob `c4d7863b8386c42686fced6f8c69ade3acca975c`. |
| `index.html` | **`1f00cd04`** | Somente querystring do backup alterada para **`20261113-s26a`**, sem novo destino ou interface. Blob `50b29a4ab91a752b7d9b8a45e9f06504e8ae64aa`. |
| `tests/sprint26-validacao.js` | **`1f00cd04`** | Nova regressão VM com rejeição não destrutiva e preservação SHA/idempotência para anotações válidas. Blob `11a1c04edb54e39d91ffce72d1e17680207cdb8b`. |
| `tests/sprint25-validacao.js` | **`1f00cd04`** | Mantém o teste do JSON formatado acima de 12 MB, com fixture Caderno **válida**, em lugar de nota ilegal do Leitor. Blob `441f3ef5caccf7d891d5198b2bfcc4a41cb5143f`. |
| `tests/sprint21-pages.cjs` | **`1f00cd04`** | Exige cache `s26a` e conserva comparação dos hashes reais. Blob `a418311ee969c802e10b6dcca25f46714b3ce7e9`. |
| `.github/workflows/agu-sprint20-ci.yml` | **`1f00cd04`** | Inclui regressão Node S26 e mantém jobs Node, Chromium e Pages. Blob `cc91c4253eb8f4350e41052892cfca7aa9730931`. |
| `docs/CHECKPOINT_SPRINT26_LEITOR_BACKUP_ACESSIBILIDADE_2026-11-13.md` | Commit documental S26 | Este registro de diagnóstico, testes, fontes, arquivos e limites. |
| `docs/PROMPT_SPRINT27_2026-11-13.md` | Commit documental S26 | Handoff completo **sem iniciar** a Sprint 27. |

**Não alterados:** revisão, planejamento, Caderno, conteúdo jurídico, gabaritos, auditoria privada, conjunto de flashcards/referências, importadores específicos, outras rotas e infraestrutura. Nenhum recurso de fusão de backups foi implementado.

## 6. Pendências e handoff

| Pendência | Classificação / gravidade | Gatilho de nova prova |
|---|---|---|
| Uso real em Android, teclado virtual, toque, TalkBack e ordem de leitura | **`nao_testado_android_fisico`** / média | Dispositivo físico acessível e autorizado, perfil isolado e dados sintéticos conforme roteiro S24. |
| Compatibilidade de backup pessoal antigo e conflitos entre aparelhos | **`nao_testado_backup_historico_real`** / média-alta | Arquivo voluntário, autorização explícita, avaliação **local descartável** sem divulgar conteúdo; guardar ambas as versões. |
| Histórico local maior que 12 MB / exportação específica de módulos | **`risco`** / média-alta | Planejamento separado e autorizado para recuperação que não coloque os dados atuais em risco. |
| Contraste parcial e WCAG global | **`risco` / `incomplete`** / média | Inspeção humana em estado integralmente visível, hardware e leitor de tela; não confundir zero violations com WCAG integral. |
| Anotações inválidas já existentes em aparelhos antigos | **`risco`** / média | Diagnóstico no ambiente afetado, backup de preservação e teste isolado antes de qualquer tratamento; patch S26 valida **importação**, não limpa storage. |
| Q1 histórica e lote normativo `NORM-INT-029` persistido sem integração na fotografia AUD03-019 | **`risco_juridico`** / alta para certificação | Confronto documental pela Auditoria, nova consulta de `estado.json` antes de alegar avanço; não reativar questão nem certificar por contagem. |

**Handoff integral:** `docs/PROMPT_SPRINT27_2026-11-13.md` — **Sprint 27 não executada**. A Sprint 26 encerra com uma correção reproduzível e mínima, regressão antiga ajustada por fixture válida, CI completo e limitações explicitadas. **Uma sprint por execução; segurança, rastreabilidade e rigor jurídico prevalecem.**
