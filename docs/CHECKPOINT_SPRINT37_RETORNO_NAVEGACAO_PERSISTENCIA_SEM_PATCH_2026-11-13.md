# AGU Quiz | CHECKPOINT — Sprint 37
## Retorno por teclado em contexto real e confirmação conservadora, sem patch

**Corte:** 13/11/2026, `America/Sao_Paulo`. **Produto:** [Talksxb/agu-quiz](https://github.com/Talksxb/agu-quiz), `main`. **Resultado:** nenhuma falha adicional reproduzida nos ensaios disponíveis. **Alterações S37:** somente este checkpoint e o prompt documental S38; **zero patch de aplicação, CSS, cache, armazenamento, testes versionados ou workflow**. A S38 não foi executada.

## 1. Abertura e fontes conferidas

- `main` na abertura: **`32d580b4a37c4d21cde2afde69cecdb6bbe8c88f`**, árvore **`e4ff4eb992ebae7ab17a1320f262cd9bf9a93f9f`**, commit exclusivamente documental S36. Checkout **novo, branch `main`, limpo**; nenhuma PR aberta na consulta GitHub. Não se reaplicou patch S29–S35. WORK 01 permanece integrada via `4fa4d2955be60e8acf5e2d134e9d5b241f84f6c3`.
- Lidos integralmente `docs/CHECKPOINT_SPRINT36_RETORNO_CONFIRMACAO_SEM_PATCH_2026-11-13.md`, `docs/CHECKPOINT_SPRINT35_CONTROLES_SECUNDARIOS_RECUPERACAO_2026-11-13.md`, `docs/GUIA_BACKUP_LOCAL_S21.md`, `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`; conferidos módulos e testes existentes de Leitor, Consolidação, Caderno, Estudo, Revisão, Plano, backup e WORK 01, corpus S13, questões S18/S19 e verificador Pages. Histórico de S19–S34 fundamenta regressões, sem reclassificar provas anteriores como novas.
- Node local **v24.22.1**. A suíte local Playwright Chromium **não iniciou**: `/usr/bin/chromium` abortou com `socket() failed: Operation not permitted (1)` / `SIGABRT`, mesmo com `--no-sandbox`; o executável `chromium_headless_shell-1234` não estava disponível na instalação histórica. **Não há aprovação local de Chromium S37.**

## 2. Chrome real publicado: continuidade observada, sem ações destrutivas

Na aba real do [Pages público](https://talksxb.github.io/agu-quiz/), **viewport medido de 1363 × 936 CSS px**, em armazenamento compartilhado que já mostrava **2 avaliações e 2 notas de ensaios anteriores**. Não se criou nem removeu registro nesse perfil. O teste foi conduzido com `Tab`, `Shift+Tab`, `Enter` reais, conferindo `document.activeElement`, nome, geometria e rolagem (`scrollX=0`, `scrollY=0` nos recortes abaixo):

| Sequência | `document.activeElement` depois | Retângulo CSS `x,y,w,h` | Observação |
| --- | --- | --- | --- |
| Home, primeiro `Tab` | botão `Início` | `15,102,200,44` | Visível |
| `Tab` | botão `Estudar` | `15,151,200,44` | Visível |
| `Tab` | botão `Biblioteca Inteligente` | `15,200,200,44` | Visível |
| `Tab` | botão `Evolução` | `15,249,200,44` | Visível; preservados os quatro destinos |
| `Tab` | botão `#continue-study` (`Continuar estudando`) | `1092,379,193,46` | Visível |
| `Tab` / `Shift+Tab` | `Abrir revisões` → `#continue-study` | `285,578,126,44` → `1092,379,193,46` | Ordem reversível |
| `Enter` em `#continue-study` | título `H1` **Legislação contextualizada** | `285,103,366,39` | Retomou a seção existente do Leitor, título focado e visível; não pontuou |
| `Tab` | `Pesquisa jurídica e filtros` (botão) | `303,210,169,60` | Próximo controle lógico, visível |
| `Tab` | campo `#agu-search-q` | `303,335,169,39` | Visível |
| `Shift+Tab` | botão `Pesquisa jurídica e filtros` | `303,210,169,60` | Retorno previsível |
| `Enter` no botão `Início` para voltar | botão `Início` ativo | `15,102,200,44` | Home novamente com missão e contagens visíveis |

Na última linha, a automação usou `locator.press('Enter')`, que seleciona o botão antes de enviar a tecla; **não** constitui prova de um novo percurso de Tab até Início. Os demais `Tab`/`Shift+Tab` da tabela foram enviados ao foco atual, sem reposicionamento do localizador.

Após a volta, a home manteve a missão Lei 9.784/1999, art. 13, etapa de Flashcards, **0 revisões pendentes**, **0 minutos confirmados**, **2 avaliações e 2 notas contextuais** exibidas. A simples navegação não mostrou nova tentativa ou hora. **Não foi demonstrado reload adicional S37 com hash do armazenamento do navegador.** O reload de S36 é evidência anterior, não repetição S37.

Foi criada uma segunda aba com `sessionName` distinto para verificar isolamento. A nova aba exibiu **o mesmo estado local**: **não era um perfil descartável independente**. Por isso **não foram acionados** Excluir confirmado, vínculos, sessões adicionais, regeneração do Plano ou correção de questões no Chrome compartilhado. Nenhum screenshot foi exportado por não existir patch nem prova visual isolada de dados inteiramente artificiais para publicação. As larguras **320/360/390/430/1280 CSS px não foram ensaiadas novamente em Chromium S37**; não se extrapolou a largura medida de 1363 px para outras telas.

## 3. Sonda Node/VM descartável com armazenamento artificial, recargas e confirmações

Foi criado, executado e **removido** `tests/.s37-sonda-temporaria.cjs` exclusivamente para diagnóstico (sem persistir teste). Usou os módulos reais em `vm`, `localStorage` como `Map` em memória, UUIDs artificiais, duas notas fictícias, legado fictício, confirmação controlada, novo contexto VM para simular reload e foco simulado (`document.querySelector().focus()`). **Não representa teclado físico, DOM real, scroll nem acessibilidade humana.** Resultado (`exit 0`):

```
S37_VM_TRANSICOES_OK {"cancelDeleteByteIdentical":true,"confirmDeleteOnlySynthetic":true,"cancelAttachByteIdentical":true,"attachIdempotent":true,"cancelRegenByteIdentical":true,"confirmRegenOnlyPlan":true,"reloadSafe":true,"notes":2,"links":2,"attempts":0,"confirmations":7}
```

- **Caderno:** cancelar Excluir preservou bytes, foco fictício de origem e não renderizou; confirmar excluiu **somente** nota A artificial, levou foco ao botão Adicionar, e a nota B permaneceu após reinicialização da VM.
- **Legado:** cancelar vínculo preservou byte a byte o estado; confirmar criou uma única cópia fictícia, preservou o JSON de origem byte-idêntico e focou o botão Editar correspondente; repetir vínculo foi idempotente e não duplicou a cópia. A sonda não leu arquivo pessoal.
- **Estudo Integrado:** coletou duas notas artificiais duas vezes sem duplicação; sessão/IDs/etapa/vínculos reapareceram após reconstrução da VM; **zero tentativa** criada por abertura ou navegação.
- **Plano:** marcar uma tarefa fictícia e cancelar a regeneração preservou todas as categorias byte-idênticas e foco; confirmar regenerou **somente** a semana artificial, preservou bytes de Caderno, legado, sessões e Revisão e restaurou o foco lógico do botão Regenerar. Após nova VM, nota, vínculos, plano e zero tentativas permaneceram coerentes.

As **7 confirmações** incluem recusas e aceites controlados na VM; não são sete diálogos observados no Chrome real. Esse ensaio complementa S35/S36, mas não certifica idempotência de arquivo histórico real ou de duas instalações Android.

| ID | Classe / gravidade | Esperado × observado | Decisão |
| --- | --- | --- | --- |
| S37-F01 | `risco`, moderada | Home → Retomar → título e foco visível → Tab/Shift+Tab: percurso observado conforme previsto em Chrome 1363 px | Sem `falha_reproduzida`; sem patch |
| S37-D01 | `risco`, alta para dados | Cancelar exclusão/vínculo/regeneração: bytes artificiais preservados em VM | Sem `falha_reproduzida`; sem patch |
| S37-D02 | `risco`, alta para dados | Confirmar somente mutação artificial: módulos não afetados byte-idênticos, reload VM e zero tentativas | Sem `falha_reproduzida`; sem patch |
| S37-I01 | `nao_testado`, moderada | Cinco viewports, confirmação real em perfil Chromium independente, retângulos de foco nos diálogos e retorno do navegador | Bloqueio de isolamento do browser/local Chromium; manter pendência |
| S37-I02 | `nao_testado`, alta | Android físico/TalkBack e histórico pessoal real | Condicionados a hardware/consentimento/arquivo voluntário |
| S37-O01 | `melhoria_opcional`, fora do escopo | Camada visual ChatGPT Work Sites | Frente de arquitetura separada |

**`falha_reproduzida`: nenhuma** nos cenários executados. Ausência de falha neste recorte **não certifica** todas as renderizações, todos os leitores de tela ou retenção universal de foco.

## 4. Regressões, CI de referência e acessibilidade

Todos os testes Node existentes foram **efetivamente executados** sob **v24.22.1**, cada arquivo com `exit 0`: `sprint19-validacao.js` **26/26**, `sprint20-validacao.js` **41/41**, S25/S26/S27/S29/S30/S31/S32/S33/S34/S35 e `work01-validacao.js` **14 verificações**. S25 manteve a fronteira UTF-8 (650 registros, 13.213.211 bytes/6.712.561 caracteres; compacto 11.999.987 vs formatado 12.000.013 bytes), recusa e pequena restauração SHA-idêntica; S26 rejeitou 6 formatos de nota inadequados e preservou 14.000 caracteres; S27 recusou 5 estados falsificados e preservou duas notas válidas/idempotentes. S29–S35/WORK01 passaram seus recortes de foco e integridade sintéticos.

**Nenhum workflow de código foi disparado por S37.** CI **de código S35, somente baseline histórico reaberto:** [run 43494607030](https://github.com/Talksxb/agu-quiz/actions/runs/43494607030), SHA `af5d820dd83abdf594284371f053cfd64e133011`, três jobs `completed/success` e logs individualmente revisitados:

| Job | ID / resultado | Recorte real **S35**, não S37 |
| --- | --- | --- |
| `integridade-node` | `132124310700` · success | Node **v22.23.4**, S19–S35/WORK01 |
| `navegador-chromium` | `132124310239` · success | Chromium **158.0.8127.18**, axe-core **4.14.0**, S20–S24/S29–S35/WORK01, foco nas **cinco larguras 320/360/390/430/1280** e `noGhost:true` |
| `pages-publicado` | `132124310834` · success | HTTPS 200, testes S21/WORK01 |

Artefatos **S35** reabertos apenas para metadados: Chromium `14070138441`, **4.204.168 bytes**, digest `sha256:587b94dd42c6b10bb4ad3983cce69a5813ca32f14222d172ddf06b19204ff680`; WORK01 `14071202201`, **68.429 bytes**, digest `sha256:a8d4064ea14c7c5299e9e694a8443162a6cea87b8a3242a155e03bc16c37d624`; ambos com expiração **20/11/2026**. Não se criou ZIP S37 nem se afirmou inspeção manual de seu conteúdo completo. A última [implantação Pages documental S36, run 43506721401](https://github.com/Talksxb/agu-quiz/actions/runs/43506721401), terminou `success`.

**Axe/contraste:** logs históricos do Chromium S35 confirmaram axe-core 4.14.0, **26 scans**, **0 `violations` efetivas no recorte**, **13 cenários/19 nós `color-contrast incomplete`** por `elmPartiallyObscured`, **19/19 `passed` após rolar e expor**. **Não houve novas varreduras axe/contraste S37**; não é certificação WCAG global nem teste humano de TalkBack. Não foi alterado CSS.

## 5. Pages HTTPS, SHA-256 e cache

`node tests/sprint21-pages.cjs` foi executado nesta sprint, **exit 0** e HTTPS 200 para HTML e seis scripts do código presente. Conferidos também, por HTTPS contra SHA local, Caderno e Estudo. Corte S37:

| Recurso | SHA-256 HTTPS publicado | Cache HTML |
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

Como não houve código novo, **nenhuma versão de cache foi alterada**. O commit de encerramento documental da S37 poderá criar uma nova implantação Pages, distinta de CI de código; seu status deverá ser reaberto após publicação.

## 6. Recuperação, conteúdo jurídico e limites humanos

- Mantido `agu-portable-local-s20-v1`: **nove categorias exclusivamente `localStorage`**, teto **12.000.000 bytes UTF-8** para categoria/pacote/JSON formatado conforme contrato, SHA-256 por categoria, `AGUValidateMatrix`, quota/rollback, importação apenas de categorias **ausentes**, idempotência, **nunca sobrescrever**. Perfil de trabalho e matriz privada não foram usados. Para backup >12 MB ou armazenamento corrompido previamente não há recuperação integral autorizada; não se limpou navegador, dividiu/compactou/editou JSON nem migrou/fundiu históricos.
- **`nao_testado_backup_historico_real`**: nenhum backup pessoal entregue e nenhum consentimento específico para ensaio. Preservar ambas as cópias em conflito de aparelhos, sem merge.
- **`nao_testado_android_fisico`**: nenhum aparelho físico com autorização específica; não se inferiu modelo, versão Android/Chrome, densidade, toque real, teclado virtual, TalkBack ou anúncio de título a partir do Chromium desktop.
- Preservados somente os quatro destinos **Início, Estudar, Biblioteca Inteligente, Evolução**; 36 flashcards; 24 referências oficiais **catalogadas, não certificadas**; revisão D+1/D+7/D+21/D+45; provas 2015 C/E e 2023 A–E quando auditadas; anuladas sem pontos; questões históricas `of-2015-adv-006/-007/-009/-048` com gabaritos E/C/E/C. `of-2015-adv-001` permanece fora da nova correção automática até cotejo independente. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50 são excertos identificados; `confirmado_pontualmente` **não** implica `certificado_integralmente`. Nenhuma questão/gabarito/fonte foi promovida nesta sprint.

## 7. Auditoria 3, estritamente privada e somente leitura

Reabertos protocolo `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `AUD03-025.json` e, após avanço concorrente, **`AUD03-026.json` integrado**, somente metadados e indicadores, **sem copiar o conteúdo da matriz privada**. O repositório privado avançou durante a S37:

| Corte | HEAD privado | Último integrado | IDs com alguma evidência / sem | Lotes integrados / persistidos | Referências | Certificados integralmente |
| --- | --- | --- | --- | --- | --- | --- |
| Abertura | `8e7b6e9b8d230b18c21d5dac7a745707b89ba0a8` | AUD03-025 | 361 / 51 | 133 / 135 (`NORM-INT-037/-038` persistidos) | 6.246 | 0 |
| Reconsulta intermediária | `17459efa779b166300ea40d26d920f9385c747e8` | AUD03-025 | 361 / 51 | 133 / 136 (`NORM-INT-039` também persistido) | 6.246 | 0 |
| **Fechamento pré-publicação** | **`b0d9ab23c0a913412a23c609be1ad828c5c0c2b8`** | **AUD03-026** | **363 / 49** | **136 / 136** | **6.402** | **0** |

`AUD03-026` reconciliou os lotes persistidos `NORM-INT-037/-038/-039`. O total de **412 IDs** foi preservado. Não se presumiu nova contagem global de pendências sem URL; evidência pontual não equivale a certificação integral. Status dinâmico deve ser reconfirmado na próxima execução.

**Fechamento:** nenhum patch ou CI de código novo. A evidência S37 é **Chrome compartilhado real a 1363 px + VM artificial com recargas + Node local**. As cinco larguras e axe/contraste reais são **baseline CI S35**, não prova de nova execução S37. O [prompt S38](PROMPT_SPRINT38_PERSISTENCIA_CONTEXTO_ACESSIBILIDADE_2026-11-13.md) é exclusivamente handoff; **S38 não executada**. ChatGPT Work Sites continua separado e requer decisão própria de arquitetura e privacidade.
