# AGU Quiz | CHECKPOINT — Sprint 42
## Portão de isolamento não satisfeito, regressões atuais e histórico preservado — sem patch

**Data:** 14/11/2026, `America/Sao_Paulo`. **Produto:** [Talksxb/agu-quiz](https://github.com/Talksxb/agu-quiz), `main`. **Decisão:** nenhum defeito novo foi reproduzido, nem surgiu perfil de navegador realmente independente e autorizado. Publicar **somente este documento e o handoff S43**; nenhum código, cache, CSS, teste, workflow, schema, conteúdo jurídico ou dado local alterado. **Não executar S43 nesta sprint.**

## 1. Abertura, versões e concorrência

- `main` na abertura: **`c0498c7a20fb23d3e0de2f5b800a50a453ac54f8`**, árvore **`8cb4f6f34574bb6ca9d43f5da32fadb993569f86`**, commit exclusivamente documental da S41. Clone novo de `main` em `agu-quiz-s42`, `main...origin/main`, worktree limpo, sem alterações locais preexistentes. WORK01 PR #1 integrada desde `4fa4d2955be60e8acf5e2d134e9d5b241f84f6c3`.
- A API GitHub retornou **zero PRs abertas** no corte de abertura; LEG-01 a LEG-05 já estão integradas ao `main`. Não presumir que LEG-06/07 estejam mescladas se aparecerem depois; reabrir PRs e diffs antes de qualquer escrita. Nenhuma mudança concorrente de código entre o checkpoint S41 e a abertura S42. Os capítulos/textos LEG não são sinônimos de temas curriculares certificados.
- Lidos checkpoint S41, predecessores S40–S35, guia S21 e roteiro físico S24; reabertos código, blobs, caches, testes Node/browser/axe/Pages e workflow. Não reaplicados patches S29–S35.
- **Blobs Git revalidados**: `index.html` `16ea7ccea9ce4456505600695a713d79eb59551a`; `meu-estudo.js` `14a0f85ace72ed8415f7f4eb8c90ae7b8d953e83`; `caderno-contextual.js` `fedee578b3ec54d217b5e6338c016adf287db774`; `estudo-integrado.js` `fe0ac81ffc50fe8f4cd1d7c597b401ec197af068`; `revisao-inteligente.js` `313ecee6712da38f3d6fdbf1fdd85d4b126e0d42`; `planejamento-semanal.js` `2fc25101f898ecf7c64e8acf42621c7f84e542f7`; `leitor-juridico.js` `dd0d916df7c74e668f26b3c6fcc8fa18f96f472f`; `leitor-consolidacao.js` `7f02d3e95453a09f4109fcdb06ba76f4da59c657`; `backup-local-s20.js` `312ea5a48e9e01e117066dbec515f89ddee51e12`; `dados/legislacao-s13.js` `f33fbc6edc41feaff26f1e54336e08924ac5f4f9`.

## 2. Decisão explícita: sem contexto descartável comprovado

**Inventário CUA S42:** apenas um browser **Chrome/CDP**, com duas abas observadas (AGU Quiz público e `chrome://newtab`), e uma janela Chromium gerenciada preexistente. A aba pública, **sem nova navegação nem escrita**, mostrou `Meu estudo de hoje`, ponto **Lei nº 9.784/1999 · Art. 13**, **2 avaliações e 2 notas contextuais**, iguais ao estado anteriormente compartilhado. Não se presume que sejam dados fictícios ou disponíveis para destruição. **Não surgiu identidade/namespace ou particionamento de storage novo e verificável**, tampouco nove categorias comprovadamente vazias. Nenhum teste de isolamento mutável foi iniciado.

Diagnósticos **não repetidos** nesta S42: `sessionName` não isolou `localStorage` na S37; Incognito desabilitado por política do Chrome gerenciado na S39; `/usr/bin/chromium` com diretório temporário abortou por `socket() failed: Operation not permitted (1)` na S39. A S42 verificou somente, de modo **não mutável**, que Playwright é resolvido pelo runtime global mas seu executável padrão `/home/agent/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome` não estava instalado; `/usr/bin/chromium` existe e **não foi relançado**. Nenhuma política, permissão, sandbox, socket, usuário ou perfil foi alterado.

**Não houve medição nova de `innerWidth/innerHeight` CSS, `document.activeElement`/retângulo/scroll no percurso, Tab/Shift+Tab/Enter/Espaço, Voltar ou refresh, nem screenshot sintética S42.** O 1363 × 936 CSS px do checkpoint S41 e as cinco larguras Actions LEG-05 são **evidências anteriores, não medições S42**. O inventário de janela nativa 1363 × 1023 não é viewport CSS. Não há falha objetiva que autorize patch.

| ID | Classificação | Gravidade e motivo |
| --- | --- | --- |
| S42-I01 — perfil novo, nove categorias vazias e descarte independente | **`nao_testado_browser_isolado`** | **Alta** para privacidade: ambiente só expôs Chrome/CDP compartilhado. |
| S42-I02 — Caderno Excluir cancelar/confirmar, legado; Estudo sessão/vínculo/cartão; Revisão C/E; Plano conflito/mover/regenerar | `nao_testado` | **Alta** para integridade: nenhuma mutação no perfil compartilhado. |
| S42-I03 — cinco larguras 320/360/390/430/1280, diálogos nativos, teclado/foco, geometria, Voltar/reload | `nao_testado` | **Moderada**: sem contexto independente ou nova medição. |
| S42-I04 — axe/contraste em browser S42, Android/TalkBack e arquivo real de backup | `nao_testado` | **Moderada/alta** conforme histórico; meios/consentimento específicos indisponíveis. |
| S42-R01 — leitura da home preexistente e retorno dos indicadores | `risco` | Dados visuais observados no inventário; **não** hash/bytes ou teste novo de continuidade. |
| S42-T01 — regressões artificiais Node/VM, fontes LEG e HTTPS Pages | `risco` residual | Executadas e aprovadas, **não** provas de interação física S42. |
| S42-O01 — Work Sites visual | `melhoria_opcional` | Arquitetura separada, não autorizada nesta sprint. |

**`falha_reproduzida`: zero.** Nenhuma captura pré-patch de fixture, regressão vermelha, alteração de `render()`, CSS ou workflow foi necessária. Não repetir navegação de leitura S37–S41 para aparentar cobertura.

## 3. Regressões S42 e distinção rigorosa de ambientes

**Executor local S42: Node.js `v24.22.1`. Executadas 18 suítes JavaScript, todas `exit 0`:** `sprint19-validacao.js` **26/26**, `sprint20-validacao.js` **41/41**, S25, S26, S27, S29, S30, S31, S32, S33, S34, `sprint35-validacao.js` **9/9**, `work01-validacao.js` **14/14**, `leg01-validacao.js`, `leg02-validacao.js`, `leg03-validacao.js`, `leg04-validacao.js` e `leg05-validacao.js`. Passaram ainda **três verificadores Python de fonte** LEG03/04/05, com 541 parágrafos/545 unidades, 220 blocos/25 divisões, e 89 blocos respectivamente. Os dados são **fixtures e fonte pública**, sem notas privadas.

- S25: **650** registros acentuados, **13.213.211 bytes/6.712.561 caracteres**, compacto **11.999.987** vs JSON formatado **12.000.013 bytes**, recusa correta e restauração pequena com hash idêntico.
- S26: seis formatos inválidos recusados, notas de texto válidas até **14.000 caracteres**. S27: cinco falsificações recusadas, duas notas válidas/idempotentes. S29–S35/WORK01 são as regressões de foco e estado em Node/VM.
- **Nenhum Node 22 local, Chromium E2E local, axe/contraste novo ou aparelho físico nesta S42.** Não classificar essa indisponibilidade como sucesso E2E, nem atribuir a S42 execução histórica Actions.

**Último CI de código reaberto:** [run **43620477343**](https://github.com/Talksxb/agu-quiz/actions/runs/43620477343), SHA LEG-05 **`0756d636adc9ec5f51f36fb69c7413f5479ede5f`**, status `completed/success`. Jobs/logs individuais consultados novamente:

| Job | ID | Estado observado |
| --- | --- | --- |
| `integridade-node` | **132524827807** | `success`, Node **22.23.4**, regressões presentes no corte LEG-05 |
| `navegador-chromium` | **132524827743** | `success`, Chromium **159.0.8154.6**, axe **4.14.0**, 320/360/390/430/1280, `S35_BROWSER_FOCO_OK` e `noGhost:true` |
| `pages-publicado` | **132524827528** | `success`, HTTPS/Pages do código LEG-05 |

Logs Actions reportam 26 scans/zero `violations` nos recortes de axe e **19 nós inicialmente `incomplete` por contraste parcialmente obstruído, 19/19 `passed` após exposição**. Esse resultado de **14/11/2026 pertence ao CI LEG-05**, não a nova execução S42, nem certifica WCAG integral/TalkBack/inspeção humana.

ZIPs **do CI LEG-05**, antes baixados na S41 e **revalidados nesta S42 com `sha256sum`, `wc -c` e `unzip -t`** (íntegros, conteúdo visual não completamente inspecionado):

| ZIP | ID / bytes | SHA-256 | Expiração informada |
| --- | --- | --- | --- |
| `agu-s20-chromium-viewports` | **14123789195** / **5.445.068** | `d955fb239c21adb2fd082338cd300c8544b45c904cc434a6980b0da57958ca5c` | **21/11/2026 17:21:29 UTC** |
| `agu-work01-publicado` | **14124240276** / **969.472** | `3565e2391ba3c24f473bf53b2b600832db6206e7015a0145814ba52d4938e50f` | **21/11/2026 17:20:57 UTC** |

O deploy **documental S41** [**43628986038**](https://github.com/Talksxb/agu-quiz/actions/runs/43628986038), commit `c0498c7`, concluiu com `success`. **Nenhum CI novo de código foi disparado na S42**; um deploy documental posterior à publicação destes docs também não é CI de código.

## 4. Pages publicado, contratos e alcance

`node tests/sprint21-pages.cjs` executado nesta S42: **`exit 0`**, HTTPS **200** para HTML e oito scripts; `caderno-contextual.js` conferido adicionalmente por HTTPS/SHA. Cache idêntico ao código LEG-05. Hash SHA-256 dos **bytes HTTPS**, não dos dados pessoais:

| Recurso | SHA-256 HTTPS S42 | Cache HTML |
| --- | --- | --- |
| `index.html` | `7dbef246e7377f45e5aa0546b05e029bf8864460e927dc9e6ec61fea11db33a4` | — |
| `revisao-inteligente.js` | `ff1ad844a49ef7b98abdb7efd6bdd65f18a83924c4fc5ee8bcd9c75f9a68fc4a` | `20261113-s35a` |
| `planejamento-semanal.js` | `b11788273caf97a35d155be1b60d42dbb7f302b6aa55912f1f4e6942436bbc7b` | `20261113-s35a` |
| `leitor-consolidacao.js` | `e6d030e22c96d9b1dc39430bf13e34a832bef835f1be93fa3f42b6fe39851ba4` | `20261113-leg02` |
| `backup-local-s20.js` | `d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78` | `20261113-s27a` |
| `leitor-juridico.js` | `955df3f7269730fb8fd429912dd82c7c6f1e861f640e1596fc75230383a0ec00` | `20261114-leg05` |
| `meu-estudo.js` | `a6c8d9d8c706bee481517e37c18b141985f3737422270ca919e78b3d9b035fc0` | `20261113-work01b` |
| `caderno-contextual.js` | `0eff71cc11e85110faf755d3e6ae305eb5b21c5624e4b8f52111fff1c44675a8` | `20261113-s35a` |
| `estudo-integrado.js` | `c367bfb39a82cddb3ef456123b8186ee3a84ef39039d92c4494d5f8f09b45013` | `20261113-leg01` |
| `dados/legislacao-s13.js` | `e74921caffc385445e03fb9427d3e07757f86f41bfea238124090a30f430a288` | `20261114-leg05` |

Contrato de backup **`agu-portable-local-s20-v1`**, nove categorias somente `localStorage`, teto **12.000.000 bytes UTF-8** por categoria/pacote/JSON formatado conforme validador, SHA-256 por categoria, `AGUValidateMatrix`, rollback por quota, importar **apenas categorias ausentes**, idempotência e nunca sobrescrever. Apenas fixtures Node foram usadas. Conflitos entre aparelhos: guardar ambas as cópias sem merge; >12 MB/corrupção prévia não autorizam limpeza, divisão, edição, compactação ou migração.

- **`nao_testado_android_fisico`**: sem aparelho/consentimento, orientação, Chrome Android, densidade, toque real ou TalkBack.
- **`nao_testado_backup_historico_real`**: sem arquivo voluntário/autorização e perfil isolado.
- **`nao_testado_ae_auditado`**: nenhuma verificação individual A–E 2023 nova.
- Preservados quatro destinos, WORK01, 36 flashcards e 24 referências oficiais catalogadas anteriormente, revisão D+1/D+7/D+21/D+45, itens `of-2015-adv-006/-007/-009/-048` com E/C/E/C históricos e `of-2015-adv-001` fora de nova correção. Lei 9.784, LRF, LC 73 e LINDB foram ampliadas em frentes LEG separadas, sem certificação curricular integral automática. Anuladas não pontuam. `confirmado_pontualmente` ≠ `certificado_integralmente`.

## 5. Auditoria 03 — status privado somente em leitura

Reconsultados `docs/PROTOCOLO.md`, `checkpoints/estado.json`, cabeçalho do `AUD03-031.json` integrado e inventário normativo, **sem copiar matriz/evidências privadas**. Abertura S42:

| HEAD privado | Último AUD03 | IDs com/sem evidência | Lotes integrados / persistidos | Referências | Temas integralmente certificados |
| --- | --- | --- | --- | --- | --- |
| **`8c0eb6930ce9bfb42ac61921a2ab393223c9189b`** | **AUD03-031** | **366 / 46 de 412** | **141 / 143**, NORM-INT-045 e -046 fora do último corte | **6.637** | **0** |

**Fechamento pré-publicação:** HEAD privado avançou para **`4bc7fbc15a04f1837c86e965b88fd2e99f9ff60b`**, sem alterar os indicadores: **AUD03-031**, **366/46 de 412**, **141 integrados / 143 persistidos**, **6.637 referências**, **zero certificados**. A mudança do SHA é concorrência na Auditoria; nenhum arquivo privado foi exportado.

`AUD03-031` tem `lotes_normativos_persistidos=141` na data da sua integração; o `estado.json` atual conta **143**. Um lote persistido não é integrado; fonte identificada não é norma integralmente certificada. Data de corte curricular original 04/11/2026 preservada.

**Encerramento S42:** portão de isolamento real não satisfeito, nenhuma escrita no Chrome/CDP, nenhuma falha específica demonstrada, **sem patch**. A continuidade efetiva requer perfil/browser de teste **autorizado, independente e com armazenamento inicialmente vazio verificado**. O [prompt completo S43](PROMPT_SPRINT43_ISOLAMENTO_AUTORIZADO_GATILHO_2026-11-14.md) é exclusivamente handoff. Não executar S43.
