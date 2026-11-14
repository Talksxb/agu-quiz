# AGU Quiz | CHECKPOINT — Sprint 41
## Isolamento ainda não comprovado, regressões atuais e preservação do histórico — sem patch

**Corte:** 14/11/2026, fuso `America/Sao_Paulo`. **Produto:** [Talksxb/agu-quiz](https://github.com/Talksxb/agu-quiz), `main`. **Decisão:** **nenhum patch**, pois não houve novo defeito funcional reproduzido nem perfil descartável confirmado. A S41 modificou **somente este checkpoint e o prompt de handoff S42**; não alterou produto, CSS, testes, cache, workflow, storage ou conteúdo jurídico. **S42 não foi executada.**

## 1. Fonte de verdade, abertura e concorrência LEG

- `main` na abertura e na reconsulta pré-publicação: **`bdf25a1c3c06e32647ac25526a4ce3faec3ff03e`**, árvore **`34da6e103de259f7aa858369687c5efd1cdcb682`**; checkout novo `main...origin/main`, worktree inicialmente limpo. O SHA é de encerramento documental LEG-05; não é commit produzido pela S41.
- WORK01 permanece integrada desde **`4fa4d2955be60e8acf5e2d134e9d5b241f84f6c3`**; `meu-estudo.js`, home e retomada preservados. Não se reaplicaram correções S29–S35.
- **Mudança concorrente material desde S40:** LEG-01, LEG-02, LEG-03, LEG-04 e LEG-05 estão **integradas na `main`**, com corpus legislativo integral e testes adicionais. Não se manteve a suposição histórica de que as PRs #2 e #3 continuariam abertas. Na consulta inicial e na reconsulta pré-publicação, a API `pulls?state=open` retornou **zero PRs abertas**. A eventual LEG-06 deve ser reconsultada por quem abrir a S42.
- Foram reabertos o checkpoint S40, os predecessores S39–S35, guia de backup S21 e roteiro Android S24; inventariados `index.html`, módulos e caches de Caderno, Estudo, Revisão, Plano, Leitor, Consolidação, Backup, WORK01 e legislação, testes, corpus público e workflow. A ampliação LEG não é autorização para correção de foco, rota paralela ou certificação jurídica automática.

**Blobs Git do código da fotografia:** `index.html` `16ea7ccea9ce4456505600695a713d79eb59551a`; `meu-estudo.js` `14a0f85ace72ed8415f7f4eb8c90ae7b8d953e83`; `caderno-contextual.js` `fedee578b3ec54d217b5e6338c016adf287db774`; `estudo-integrado.js` `fe0ac81ffc50fe8f4cd1d7c597b401ec197af068`; `revisao-inteligente.js` `313ecee6712da38f3d6fdbf1fdd85d4b126e0d42`; `planejamento-semanal.js` `2fc25101f898ecf7c64e8acf42621c7f84e542f7`; `leitor-juridico.js` `dd0d916df7c74e668f26b3c6fcc8fa18f96f472f`; `leitor-consolidacao.js` `7f02d3e95453a09f4109fcdb06ba76f4da59c657`; `backup-local-s20.js` `312ea5a48e9e01e117066dbec515f89ddee51e12`; `dados/legislacao-s13.js` `f33fbc6edc41feaff26f1e54336e08924ac5f4f9`.

## 2. Portão de isolamento: **não satisfeito**

O inventário novo exibiu apenas o browser gerenciado **Chrome/CDP**. Embora seu inventário inicial de abas estivesse vazio, a aba recém-criada na origem pública **`https://talksxb.github.io/agu-quiz/`** exibiu os **mesmos indicadores preexistentes de 2 avaliações e 2 notas contextuais** observados nas sprints anteriores, além da missão **Lei nº 9.784/1999 · art. 13**. Portanto, uma nova aba/sessão **não** constitui perfil independente. Uma tentativa de leitura direta de chaves do `localStorage` pela API de inspeção não produziu inventário utilizável; **não se mediram bytes, hashes nem as nove categorias iniciais nesse Chrome**. Não se postulou que suas notas fossem fixtures descartáveis.

Medições **somente leitura** na home: `window.innerWidth=1363`, `innerHeight=936` **CSS px**, `scrollX=scrollY=0`, título **Meu estudo de hoje**, `document.activeElement=BODY` após carregamento integral. **BODY após carregamento não é defeito demonstrado**; nenhum Tab foi ensaiado nesta S41. Não houve captura, retângulo de controle ou inspeção humana de foco S41. A aba viva foi deixada disponível para revisão, sem qualquer escrita.

Os bloqueios prévios são **históricos, não reexecutados na S41**: `sessionName` sem separação (S37), opção Incognito desabilitada por política no Chrome gerenciado (S39), e Chromium local abortando com `socket() failed: Operation not permitted (1)` (S39). Não se tentou contornar política, mudar sandbox/socket, abrir outro usuário, limpar armazenamento, criar conta, instância ou infraestrutura. **`nao_testado_browser_isolado`**.

| Cenário S41 | Classificação | Gravidade / resultado proporcional |
| --- | --- | --- |
| S41-I01 — identidade e namespace de perfil novo, nove categorias vazias, descarte sem efeito colateral | `nao_testado` | **Alta** para privacidade; mesmo estado visual preexistente, sem prova de separação. |
| S41-I02 — Caderno Excluir cancelar/confirmar, legado; Estudo retomar/vincular/cartão/encerrar; Revisão C/E; Plano regenerar/conflito/mover | `nao_testado` | **Alta** para integridade; operações mutáveis deliberadamente não acionadas no Chrome compartilhado. |
| S41-I03 — 320/360/390/430/1280 CSS px, teclas e focus/retângulos por viewport, Voltar/reload, confirmações nativas | `nao_testado` | **Moderada**; somente 1363 × 936 foi efetivamente medida, sem novo fluxo de teclado S41. |
| S41-I04 — axe/contraste e inspeção humana em browser S41 | `nao_testado` | **Moderada**; não há varredura ou screenshot novos nesta sprint. |
| S41-V01 — leitura de estado inicial da home publicada | `risco` | **Baixa** para navegação; indicadores e missão renderizados, não equivalem a hashes/bytes de `localStorage` ou teste de continuidade. |
| S41-T01 — testes Node/VM do `main` LEG-05 | `risco` residual | Executados e aprovados, mas **não substituem** C/E por teclado em navegador descartável. |
| S41-O01 — camada visual Work Sites | `melhoria_opcional` | Fora do escopo e sem autorização de fluxo de dados. |

**`falha_reproduzida`: zero nos cenários realmente executados.** Logo não existe screenshot sintético anterior, teste vermelho original ou justificativa para patch. S41 não repetiu navegação read-only S37–S40 apenas para aumentar contagem de cobertura.

## 3. Regressões locais e CI de código — ambientes distintos

**Executadas nesta S41 no executor local, Node.js `v24.22.1`, `exit 0`: 18 suítes JavaScript** — S19 (**26/26**), S20 (**41/41**), S25, S26, S27, S29, S30, S31, S32, S33, S34, S35 (**9/9**), WORK01 (**14/14**), LEG01, LEG02, LEG03, LEG04, LEG05. Também passaram **três verificadores de fonte Python** de LEG03, LEG04 e LEG05. Foram executados contra a `main` LEG-05 atual, com fixtures; são regressões locais Node/VM/fonte, **não Chromium E2E S41 nem Android**.

- S25 confirma o contrato de tamanho com **650 registros acentuados, 13.213.211 bytes UTF-8 / 6.712.561 caracteres**, JSON compacto **11.999.987** contra formatado **12.000.013 bytes**, recusa coerente e restore pequeno de hash idêntico.
- S26 recusa **seis** formatos inválidos e aceita notas de texto dentro do limite **14.000 caracteres**; S27 recusa **cinco** falsificações e preserva duas notas válidas/idempotentes. S29–S35/WORK01 e LEG01–05 mantêm seus demais casos artificiais de foco, persistência e corpus.
- LEG03 reconstruiu 541 parágrafos oficiais a partir de 545 unidades; LEG04 verificou 220 blocos/25 divisões; LEG05 verificou 89 blocos de texto. Isso não é certificação de cada tópico da auditoria privada.

**Último CI de código da `main` efetivamente reaberto nesta S41:** [run **43620477343**](https://github.com/Talksxb/agu-quiz/actions/runs/43620477343), SHA de implementação LEG-05 **`0756d636adc9ec5f51f36fb69c7413f5479ede5f`**, `completed/success`:

| Job | ID | Verificação nos logs, referente à integração LEG-05 |
| --- | --- | --- |
| `integridade-node` | **132524827807** | `success`; **Node 22.23.4**, suites S19–S35/WORK01 e LEG integradas. |
| `navegador-chromium` | **132524827743** | `success`; **Chromium 159.0.8154.6**, `axe-core 4.14.0`, cinco larguras **320/360/390/430/1280**, `S35_BROWSER_FOCO_OK`, `noGhost:true`, além de LEG05. |
| `pages-publicado` | **132524827528** | `success`; HTTPS e script Pages para código LEG-05 publicado. |

**Artefatos desse run anterior de código**, efetivamente baixados e verificados de novo na S41 por `sha256sum` e `unzip -t` (ZIP íntegros, **sem inspeção visual completa**):

| Artefato | ID / bytes | SHA-256 de bytes ZIP | Expiração informada UTC |
| --- | --- | --- | --- |
| `agu-s20-chromium-viewports` | **14123789195** / **5.445.068** | `d955fb239c21adb2fd082338cd300c8544b45c904cc434a6980b0da57958ca5c` | 21/11/2026 17:21:29 |
| `agu-work01-publicado` | **14124240276** / **969.472** | `3565e2391ba3c24f473bf53b2b600832db6206e7015a0145814ba52d4938e50f` | 21/11/2026 17:20:57 |

**Nenhum CI de código S41 foi criado ou atribuído à S41.** O baseline S35 `43494607030` do handoff S40 foi superado por novas integrações LEG; não é o último CI de código da `main` atual. O deploy documental mais recente antes da publicação S41 foi [**43620852552**](https://github.com/Talksxb/agu-quiz/actions/runs/43620852552), `bdf25a1`, `success`: **deploy de documentação não é novo teste de código**. Axe/contraste históricos S35: 26 scans, zero violations nos recortes, 19 nós `incomplete` por obstrução e 19/19 `passed` após rolagem; não representam verificação humana/axe S41 nem certificado WCAG integral.

## 4. Pages real, hashes e caches (corte S41)

`node tests/sprint21-pages.cjs` **exit 0**. O [Pages HTTPS](https://talksxb.github.io/agu-quiz/) respondeu **200** para HTML e recursos verificados, inclusive Caderno e corpus. Os hashes abaixo são **SHA-256 dos bytes HTTPS**, não blobs Git nem hashes de dados pessoais:

| Recurso | SHA-256 HTTPS | Cache observado no HTML |
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

Nenhuma versão de cache foi alterada pela S41. A mudança de hashes desde a S40 decorre das integrações LEG; não é regressão inferida por diferença textual.

## 5. Privacidade, recuperação e cobertura jurídica

**Recuperação:** permanece o contrato **`agu-portable-local-s20-v1`**, nove categorias exclusivas em `localStorage`, teto de **12.000.000 bytes UTF-8** por categoria/pacote/JSON formatado conforme a validação, SHA-256 por categoria, `AGUValidateMatrix`, quota/rollback, importação **somente da categoria ausente**, idempotência e nunca sobrescrita. Esta S41 executou a verificação **sintética Node**, não importação/exportação em Chrome compartilhado. Conflitos entre aparelhos exigem conservar ambas as cópias sem merge. Arquivo >12 MB e corrupção prévia continuam sem recuperação integral autorizada; não limpar, editar, dividir, compactar ou migrar histórico.

- **`nao_testado_backup_historico_real`**: nenhum backup privado entregue voluntariamente com autorização específica local/isolada.
- **`nao_testado_android_fisico`**: nenhum dispositivo físico consentido, sem aferição de Android/Chrome, TalkBack, toque, teclado virtual, viewport/densidade ou roteiro S24 executado.
- **`nao_testado_ae_auditado`**: nenhuma nova conferência A–E 2023 nesta sprint.

**Jornada:** quatro destinos — Início, Estudar, Biblioteca Inteligente, Evolução — e navegação secundária existente, WORK01 preservada; flashcards e revisões anteriores continuam no escopo de regressão. 36 flashcards e 24 fontes oficiais **catalogadas** no acervo anterior não passam a texto integral certificado por inferência. Os módulos LEG agora disponibilizam textos legislativos integrais identificados, sujeitos à própria proveniência/cotejo e aos checkpoints LEG, sem equivaler à certificação curricular integral da Auditoria 03. Mantêm-se itens pontualmente auditados `of-2015-adv-006/-007/-009/-048` (E/C/E/C históricos); `of-2015-adv-001` fora de nova correção automática até cotejo independente; anuladas sem pontos; 2015 C/E e 2023 A–E somente com auditoria individual. `confirmado_pontualmente` ≠ `certificado_integralmente`. Nenhum arquivo privado foi incluído em código, logs, screenshots ou ZIP.

## 6. Auditoria 03 — reconsulta privada somente de status

Lidos em modo **somente leitura** `docs/PROTOCOLO.md`, `checkpoints/estado.json`, metadados do checkpoint `AUD03-031` efetivamente integrado e inventário normativo; **não se copiou a matriz de trabalho, evidências nem conteúdo dos lotes para o Quiz**.

| Corte S41 | HEAD privado | Integração | IDs com evidência / sem | Lotes integrados / persistidos atuais | Referências | Certificados integralmente |
| --- | --- | --- | --- | --- | --- | --- |
| Abertura | `5e3c47d7d49c8798479e7041328bd801e51bf048` | **AUD03-031** | **366 / 46** de 412 | **141 / 142** | **6.637** | **0** |
| Fechamento pré-publicação | `071c90455820524e69dfaf8a127bc842525fcc43` | **AUD03-031** | **366 / 46** de 412 | **141 / 142**, até NORM-INT-045 no catálogo | **6.637** | **0** |

A contagem histórica `lotes_normativos_persistidos=141` dentro de AUD03-031 é **fotografia do momento daquela integração**; `estado.json` atual possui **142 lotes persistidos**. O **NORM-INT-045 ainda não foi integrado por novo AUD03**, portanto não promove pontuação de cobertura ou certificação. A atualização do HEAD privado reflete trabalho concorrente, não ação S41. Data de corte curricular original **04/11/2026**, 412 IDs preservados.

**Encerramento:** nenhuma falha de produto comprovada, nenhuma escrita em perfil compartilhado, nenhum CI artificial. A continuação mutável depende de **um browser/perfil independente disponibilizado e autorizado pela plataforma ou pelo usuário**, com origem/particionamento e armazenamento separados verificáveis. Solicitar essa direção caso continue indisponível; não repetir sprints de navegação equivalente para simular progresso. O [prompt integral S42](PROMPT_SPRINT42_PERFIL_AUTORIZADO_CONFIRMACOES_2026-11-14.md) é **handoff exclusivamente**, sem execução da S42.
