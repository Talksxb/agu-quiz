# AGU Quiz | CHECKPOINT — Sprint 40
## Perfil descartável indisponível, retorno por teclado e preservação conservadora — sem patch

**Data de referência:** 13/11/2026 (`America/Sao_Paulo`; consultas técnicas também em 14/11 UTC). **Aplicação:** [Talksxb/agu-quiz](https://github.com/Talksxb/agu-quiz), `main`. **Decisão:** nenhum defeito novo foi reproduzido no percurso efetivamente executado. **Somente este checkpoint e o handoff S41**; nenhum código de produto, CSS, cache, teste, schema ou workflow foi modificado. **Sprint 41 não executada.**

## 1. Fonte, abertura e concorrência

- `main` de abertura: commit **`607a13b9f6d74f7c9bac1a537f697d1e75337d88`**, árvore **`ee24b8522157e8eb332369f93c7b64468b82f90c`**, documento de encerramento S39. Clone novo em `main` com worktree limpo; blobs de HTML/WORK01/Caderno/Estudo/Revisão/Plano/Leitor/Consolidação/Backup lidos por árvore; nenhuma diferença de código com o corte S35. WORK01 integrada em `4fa4d2955be60e8acf5e2d134e9d5b241f84f6c3`.
- **[PR LEG-01 #2](https://github.com/Talksxb/agu-quiz/pull/2)**, branch `leg/leg01-inventario`, head **`091fb3d63fd43d0669695c4091197dc58e64a982`**, ainda **aberta/não mesclada** na consulta S40. Run PR **43533990795**: Node e Chromium `success`, Pages `skipped` por ser PR. A frente LEG-01 não foi misturada à `main`, a reparos de foco ou à certificação de normas.
- **[PR LEG-02 #3](https://github.com/Talksxb/agu-quiz/pull/3)** apareceu **concorrentemente durante o fechamento S40**, branch `leg/leg02-lei9784-integral`, head então **`a0e5a79c025bec51252370dd3c418b01da24f6f8`**, **aberta/não mesclada**. O run anterior da PR **43537570009**, SHA `effb4a3f`, teve Node `success`, Chromium `failure`, Pages `skipped`; execuções posteriores da branch estavam **em andamento** na reconsulta. Isso **não** é falha da `main`, CI S40 ou autorização para integrar LEG-02 sem revisão.
- Reabertos na ordem os checkpoints S39/S38/S37/S36/S35, guia S21 e roteiro Android S24; inspecionados histórico, `index.html`, módulos Caderno/Estudo/Revisão/Plano/Leitor/Consolidação/Backup/WORK01, questões e corpus referenciados, testes Node/browser, verificador Pages e workflow. Não se reaplicaram patches S29–S35.

## 2. Decisão de isolamento — pré-condição ainda bloqueada

O inventário real do ambiente mostrou **um único browser `Chrome`/`cdp`**, com **quatro abas** preexistentes do Pages; a janela Chromium gerenciada estava ativa. A home desse **contexto compartilhado** exibia **2 avaliações e 2 notas contextuais**, sem comprovação de que todo o estado seja uma fixture descartável. Nenhum navegador/perfil alternativo independente foi exposto no inventário S40.

- A S37 já demonstrara que `sessionName` diferente reutilizava `localStorage`. Na S39, a opção nativa **New Incognito window** foi observada **desabilitada por política do navegador gerenciado** e `/usr/bin/chromium` em diretório temporário próprio abortou (`socket() failed: Operation not permitted (1)`, exit 134). **Esses são diagnósticos históricos S39, não novos comandos executados S40.**
- Não se tentou contornar política, lançar outro usuário, ajustar sandbox/socket, alterar configuração administrada ou limpar perfil. **`nao_testado_browser_isolado`** (gravidade alta para integridade). Sem namespace independente, armazenamento inicial vazio e separação verificável, **não** se acionaram criação/exclusão de notas, vínculo legado, sessão, resposta, regeneração, importação, confirmação nativa mutável ou exportação pessoal.
- As larguras solicitadas **320, 360, 390, 430 e 1280 CSS px** permaneceram **`nao_testado` nesta S40**. A única largura real medida foi **1363 × 936 CSS px**, no Chrome compartilhado. Não houve Chromium local/Actions novo S40, axe novo, captura inteiramente sintética nem teste físico.

## 3. Percurso novo de Chrome real, **exclusivamente leitura**

No [Pages público](https://talksxb.github.io/agu-quiz/), teclado enviado ao **foco corrente**, sem `locator.press` reposicionando controles; leitura de `document.activeElement`, DOM/nomes, `getBoundingClientRect()` e `window.innerWidth/innerHeight`. `scrollX=scrollY=0` em todas as medidas; os controles observados estavam visíveis. Os retângulos são **x,y,largura,altura em CSS px**:

| Sequência efetiva | Elemento ativo após ação | Retângulo | Esperado/observado |
| --- | --- | --- | --- |
| Home, foco inicial → **3 Tab** | `BUTTON` **Evolução** | `15,249,200,44` | Quarto destino visível, sem criar sessão |
| **Enter** em Evolução | `BUTTON` **Evolução** | `15,249,200,44` | Abriu subnavegação interna; sem gravação provocada pela ação |
| **Tab** → **Shift+Tab** | `BUTTON` **Panorama** → `BUTTON` **Evolução** | `288.52,287,90.72,43` → `15,249,200,44` | Ordem reversível e visível |
| **4 Tab** a partir de Evolução | `BUTTON` **Dados e backup** | `555.53,287,121.47,43` | Controle secundário encontrado por teclado |
| **Enter** em Dados e backup | `H1` **Dados e confiabilidade** | `284.52,103,427.33,39` | Título programaticamente focado após troca de contexto; visível |
| **Tab** após H1 | `BUTTON` **Abrir simulação fictícia** | `305.52,303,189.20,40` | Primeiro controle lógico visível; **não foi acionado** |
| **Shift+Tab** | `BUTTON` **Dados e backup** | `551.73,30,126.25,43` | Retorno ao controle de subnavegação visível; H1 com `tabindex=-1` não é parada regular |
| **7 Shift+Tab** → **Enter** | `BUTTON` **Início** | `15,102,200,44` | Home voltou com título **Meu estudo de hoje** |

Ao final, a interface seguia exibindo **Lei nº 9.784/1999, art. 13 / ADM-06 / Flashcards**, **0 revisões pendentes**, **0 revisões autorais**, **0 minutos confirmados**, **2 avaliações** e **2 notas contextuais**. São **contagens/títulos visuais**, não comparação SHA/bytes de `localStorage`; nenhuma escrita explícita foi executada. Não se acionaram exportação/importação/limpeza ou botões de reset. **Não houve reload novo nesta S40**; a navegação/reload S39 é baseline histórico. Nenhum screenshot do estado compartilhado foi publicado, por não ser comprovadamente sintético.

| ID / classe | Gravidade | Conclusão e limite |
| --- | --- | --- |
| S40-K01 · `risco` | Moderada | Home → Evolução → Dados e backup → Home, Tab/Shift+Tab/Enter: elementos visíveis e ordem reversível, sem `falha_reproduzida` |
| S40-K02 · `risco` | Moderada | H1 focado após troca de seção, Tab ao botão seguinte e Shift+Tab à navegação: conforme observado; não é prova humana de leitor de tela |
| S40-I01 · `nao_testado` | Alta para histórico | Perfil verdadeiramente descartável e nove categorias iniciais vazias: indisponível; não se expôs registro pessoal |
| S40-I02 · `nao_testado` | Alta para dados | Caderno Excluir/legado, Estudo sessão/vínculo/cartão, Revisão C/E/Conferir, Plano conflito/mover/regenerar e diálogos nativos reais |
| S40-I03 · `nao_testado` | Moderada | Cinco larguras, Voltar/reload específico S40, screenshots sintéticas, axe/contraste novo, toque físico/TalkBack |
| S40-O01 · `melhoria_opcional` | Fora do escopo | ChatGPT Work Sites, frente arquitetural separada, sem alteração |

**`falha_reproduzida`: zero nas ações S40 realmente executadas.** Nem um `render()` presente nem foco em `BODY` após reload histórico implicam bug sem bloqueio demonstrado. Não há teste inicialmente vermelho nem patch justificável.

## 4. Regressões S40, CI histórico e artefatos

**Executadas localmente nesta S40, Node.js `v24.22.1`, todas `exit 0`:** S19 **26/26**, S20 **41/41**, S25, S26, S27, S29, S30, S31, S32, S33, S34, S35 **9/9** e WORK01 **14/14**. São testes de módulos/VM com dados artificiais, **não** Chromium E2E local/Android. Resultado específico:

- S25: 650 registros acentuados, **13.213.211 bytes / 6.712.561 caracteres**; compacto **11.999.987** vs formatado **12.000.013 bytes**; recusa coerente e restauração pequena SHA-idêntica.
- S26: **seis** formatos inválidos de nota rejeitados, string válida de até **14.000 caracteres** e hash/idempotência preservados.
- S27: **cinco** estados forjados recusados; **duas** notas válidas mantidas/idempotentes; S29–S35 e WORK01 preservam regressões de foco/estado/tentativa única em simulação.

**Nenhum browser automatizado, axe/contraste ou Node 22 novo S40.** O último CI de **código da `main`** continua [run **43494607030**](https://github.com/Talksxb/agu-quiz/actions/runs/43494607030), SHA `af5d820dd83abdf594284371f053cfd64e133011`, **S35**. Reabertos os três jobs com **logs individuais**:

| Job histórico | ID | Resultado |
| --- | --- | --- |
| `integridade-node` | `132124310700` | `completed/success`, Node **22.23.4**, S19–S35/WORK01 |
| `navegador-chromium` | `132124310239` | `completed/success`, Chromium **158.0.8127.18**, `S35_BROWSER_FOCO_OK` em 320/360/390/430/1280, `noGhost:true` |
| `pages-publicado` | `132124310834` | `completed/success`, HTTPS 200 e verificador S21 do corte S35 |

Artefatos **S35**, reabertos por metadados e **revalidados nesta S40 com `sha256sum` e `unzip -t`** dos ZIPs já baixados na S39, ambos sem erro; não são artefatos S40. Chromium **14070138441**, **4.204.168 bytes**, `sha256:587b94dd42c6b10bb4ad3983cce69a5813ca32f14222d172ddf06b19204ff680`; WORK01 **14071202201**, **68.429 bytes**, `sha256:a8d4064ea14c7c5299e9e694a8443162a6cea87b8a3242a155e03bc16c37d624`, expiração informada **20/11/2026 UTC**. **Não houve inspeção visual de todo o conteúdo dos ZIPs.** A [implantação documental S39, run **43536703971**](https://github.com/Talksxb/agu-quiz/actions/runs/43536703971), foi `completed/success` em `607a13b`, **não CI de código**. A PR LEG-01 tem CI de branch distinto.

**Publicação inicial dos dois documentos S40:** commit **`6738dab4b26a60a7428426261ffa574765f934cf`**, árvore **`7b07bf5cab655fc639e537a666f8ff49ac46353c`**, exclusivamente arquivos `docs/`, atualização fast-forward com SHA esperado. [Deploy documental Pages **43538052283**](https://github.com/Talksxb/agu-quiz/actions/runs/43538052283) **`completed/success`**; verificador `tests/sprint21-pages.cjs` **reexecutado após a publicação, exit 0** e HTTPS 200, mesmos SHA-256 de HTML/seis scripts. Este registro adicional documenta a PR LEG-02 concorrente e o deploy efetivo; **nenhum teste/CI de código foi provocado**.

**Axe baseline S35, sem varredura S40:** axe-core **4.14.0**, **26 scans**, zero `violations` nos recortes; **13 cenários/19 nós `color-contrast incomplete`** por `elmPartiallyObscured`, **19/19 `passed` após rolar**. Isso não certifica WCAG global, TalkBack ou inspeção humana. Não houve justificativa para alterar CSS.

## 5. Pages vivo, backup e rigor jurídico

`node tests/sprint21-pages.cjs` **S40 exit 0**; respostas HTTPS **200** para HTML e seis scripts, mesmo cache do código S35. Caderno e Estudo foram conferidos adicionalmente por HTTPS/SHA-256:

| Recurso | SHA-256 HTTPS medido S40 | Versão cache |
| --- | --- | --- |
| `index.html` | `c7aac0c3af238902b05b56086c19ffbed8ae1c7171b2dfd643758ebb1a17bf50` | — |
| `revisao-inteligente.js` | `ff1ad844a49ef7b98abdb7efd6bdd65f18a83924c4fc5ee8bcd9c75f9a68fc4a` | `s35a` |
| `planejamento-semanal.js` | `b11788273caf97a35d155be1b60d42dbb7f302b6aa55912f1f4e6942436bbc7b` | `s35a` |
| `leitor-consolidacao.js` | `3c64085c0077637f476697b0817a34a22a8f6315095b423a1d00963d1f1e4f88` | `s32a` |
| `backup-local-s20.js` | `d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78` | `s27a` |
| `leitor-juridico.js` | `8045194f8a8ec2bbd10e95fff8ce04c39042d5f7957ad780200433793911f2e1` | `s32a` |
| `meu-estudo.js` | `a6c8d9d8c706bee481517e37c18b141985f3737422270ca919e78b3d9b035fc0` | `work01b` |
| `caderno-contextual.js` | `0eff71cc11e85110faf755d3e6ae305eb5b21c5624e4b8f52111fff1c44675a8` | `s35a` |
| `estudo-integrado.js` | `6f142c9c945428202afe792f921bc4efd12798deada63a9f86dc1e99f5d21adc` | `s35a` |

Preservado contrato **`agu-portable-local-s20-v1`**: nove categorias somente `localStorage`, teto de **12.000.000 bytes UTF-8** por categoria/pacote/JSON formatado conforme contrato, SHA-256 por categoria, `AGUValidateMatrix`, quota/rollback, importação **apenas de categorias ausentes**, idempotência e nenhuma sobrescrita. A verificação S40 ficou nas fixtures Node; **nenhum backup pessoal foi manipulado**. Para >12 MB ou corrupção prévia não existe recuperação integral aprovada; conflitos entre aparelhos exigem preservar ambas as cópias, sem merge, divisão, compactação, edição ou limpeza.

- **`nao_testado_backup_historico_real`**: não foi fornecido arquivo real com autorização específica local/isolada.
- **`nao_testado_android_fisico`**: não houve hardware físico autorizado; sem modelo/versão Android/Chrome, densidade, teclado virtual ou TalkBack medidos.
- Preservados **quatro destinos** (Início, Estudar, Biblioteca Inteligente, Evolução), 36 flashcards, 24 referências oficiais **catalogadas, não certificadas integralmente**, D+1/D+7/D+21/D+45, questões pontualmente auditadas `of-2015-adv-006/-007/-009/-048` com gabaritos históricos E/C/E/C; anuladas sem pontos, formatos 2015 C/E e 2023 A–E somente quando individualmente cotejados. `of-2015-adv-001` segue fora da nova correção automática. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50 são excertos identificados; `confirmado_pontualmente` ≠ `certificado_integralmente`.

## 6. Auditoria 03 privada, somente metadados

Consultados **sem escrita** `docs/PROTOCOLO.md`, `checkpoints/estado.json`, último `checkpoints/AUD03-028.json` realmente integrado e inventário da árvore normativa. **Nenhum arquivo da matriz ou evidência privada foi copiado para o Quiz/CI/ZIP/capturas.**

| Corte S40 | HEAD privado | Último AUD03 integrado | IDs com / sem evidência | Integrados / persistidos | Referências | Certificados integralmente |
| --- | --- | --- | --- | --- | --- | --- |
| Abertura: metadados + árvore | **`845e321a658127fc04dbc59641eb2bf6c9e473d3`** | **AUD03-028** | **363 / 49 de 412** | **137 / pelo menos 139** (138 em `estado.json`, arquivo 042 já na árvore) | **6.467** | **0** |
| **Fechamento pré-publicação** | **`ed5b6606b370e03f8d61e9750fe38cd0496b013f`** | **AUD03-028** | **363 / 49 de 412** | **137 / 139** (`estado.json` agora atualizado até 042) | **6.467** | **0** |

**Conciliação durante a sprint:** na abertura, `estado.json` enumerava **138 lotes persistidos** até `NORM-INT-041`, enquanto a árvore GitHub **já continha `NORM-INT-042.json`**. A contagem provisória de **pelo menos 139** baseou-se na enumeração anterior mais o novo arquivo. No fechamento, o `estado.json` passou a listar **139** até `NORM-INT-042`, sem novo AUD03 integrado. `NORM-INT-041` e `NORM-INT-042` **não foram promovidos a integrados**; referências e evidências são as do corte AUD03-028. A fotografia segue dinâmica.

**Encerramento S40:** perfil descartável independente não estava disponível por meios autorizados; nova prova humana foi limitada à navegação **não mutável** em Chrome compartilhado, complementada por Node local e Pages. **Nenhuma ação de risco foi forçada, nenhuma falha justificou patch e não houve CI de código S40.** O [prompt integral S41](PROMPT_SPRINT41_CONTEXTO_AUTORIZADO_INTEGRIDADE_2026-11-13.md) é exclusivamente handoff. ChatGPT Work Sites continua frente de arquitetura separada.
