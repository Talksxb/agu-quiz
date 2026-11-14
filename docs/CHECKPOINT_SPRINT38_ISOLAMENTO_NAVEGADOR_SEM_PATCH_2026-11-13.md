# AGU Quiz | CHECKPOINT — Sprint 38
## Isolamento de navegador, continuidade de teclado e dados conservados — sem patch

**Corte:** 13/11/2026 (`America/Sao_Paulo`; consultas técnicas atravessaram 14/11 UTC). **Produto:** [Talksxb/agu-quiz](https://github.com/Talksxb/agu-quiz), `main`. **Decisão:** nenhum defeito novo demonstrado nos recortes efetivamente executados; **nenhuma alteração de aplicação, CSS, caches, testes ou workflow**. Publicação S38 limitada a este checkpoint e ao prompt de handoff S39. **S39 não foi executada.**

## 1. Repositórios, concorrência e fontes

- Abertura da `main`: **`969676583955333adc3caf60fd8f0451cb33303c`**, árvore **`aa19aa8646aff2b87f24932b1b8339427ee5521d`**, após checkpoint documental S37. Clone novo em `main`, worktree limpo, sem alterações preexistentes. A `WORK 01` continua integrada desde `4fa4d2955be60e8acf5e2d134e9d5b241f84f6c3` e o código S29–S35 não foi reaplicado. Confirmar o HEAD novamente antes de qualquer atualização documental.
- A frente paralela **LEG-01** está na **[PR #2](https://github.com/Talksxb/agu-quiz/pull/2)**, **aberta/não mesclada**, head `091fb3d63fd43d0669695c4091197dc58e64a982`. Seu [CI próprio 43533990795](https://github.com/Talksxb/agu-quiz/actions/runs/43533990795) encerrou com Node/Chromium `success` e Pages `skipped` intencionalmente por ser PR. **Não** foi integrado à `main`, não é CI novo S38 e não autoriza concluir que novos textos jurídicos estão publicados. Nenhum arquivo da LEG-01 foi alterado.
- Consultados os checkpoints S35–S37 (prioridade imediata S37), `docs/GUIA_BACKUP_LOCAL_S21.md`, `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`, histórico S19–S34, `index.html`, scripts de WORK01, Caderno, Estudo Integrado, Revisão, Plano, Leitor, Consolidação e backup, testes Node/Chromium existentes, workflow e verificador de Pages. A prova histórica não foi convertida em teste S38.
- Caches no HTML: Caderno/Estudo/Revisão/Plano `20261113-s35a`; Leitor/Consolidação `20261113-s32a`; backup `20261113-s27a`; WORK01 `20261113-work01b`. **Não houve motivo para alterar cache.**

## 2. Browser real disponível: **compartilhado**, não isolado

O inventário de superfícies mostrou **um único navegador Chrome/CDP**, com **quatro abas já abertas do Pages**. A aba observada já exibia **2 avaliações e 2 notas contextuais**. A S37 havia confirmado que abrir aba com outro `sessionName` reutilizava o armazenamento; na S38 não surgiu um perfil independente com ausência de histórico comprovada. Por segurança, **nenhuma nota, sessão, avaliação, plano ou backup foi criado, excluído, regenerado, vinculado ou restaurado nesse Chrome**.

No [Pages público](https://talksxb.github.io/agu-quiz/), `window.innerWidth=1363`, `innerHeight=936` **CSS px**, `scrollX=0`, `scrollY=0` no percurso. As teclas abaixo foram enviadas ao foco real corrente; `Enter` navegou, sem locator que reposicionasse previamente o foco. Geometria `x,y,w,h` em CSS px:

| Ação efetiva | `document.activeElement` observado | Retângulo | Resultado |
| --- | --- | --- | --- |
| Estado inicial | `BUTTON` **Início** | `15,102,200,44` | Controle visível |
| `Tab` | `BUTTON` **Estudar** | `15,151,200,44` | Foco visível, ordem esperada |
| `Shift+Tab` | `BUTTON` **Início** | `15,102,200,44` | Retorno visível |
| `Tab`, `Tab`, `Enter` | `BUTTON` **Biblioteca Inteligente** (entrada) | `15,200,200,44` | Biblioteca aberta, quatro destinos preservados |
| `Tab` na Biblioteca | `BUTTON` **Evolução** | `15,249,200,44` | Foco visível |
| `Shift+Tab` | `BUTTON` **Biblioteca Inteligente** | `15,200,200,44` | Retorno previsível |
| `Shift+Tab`, `Shift+Tab`, `Enter` | `BUTTON` **Início** | `15,102,200,44` | Home retomada sem acionar sessão |
| Recarga integral | `BODY` | — | Esperado no reload, não classificado isoladamente como falha |
| Primeiro `Tab` após recarga | `BUTTON` **Início** | `15,102,200,44` | Foco retornou à navegação e ficou visível |

Após voltar à home e após o reload, foram observados o mesmo ponto **Lei 9.784/1999, art. 13 / ADM-06 / Flashcards**, **0 revisões pendentes**, **0 minutos confirmados**, **2 avaliações e 2 notas**. Isto comprova **igualdade dos indicadores apresentados**, mas **não** comparação byte a byte ou SHA do `localStorage`: a camada de inspeção não forneceu um ambiente isolado, e nenhuma escrita/diagnóstico invasivo foi tentado. Não houve screenshot publicada, pois o perfil era compartilhado e o estado não era uma fixture comprovadamente inteiramente artificial.

**Sem teste S38 novo nas larguras 320/360/390/430/1280**: o Chrome compartilhado foi medido somente a **1363 × 936 CSS px**; não havia controle seguro de perfil descartável para os fluxos mutáveis. Nenhum resultado de viewport histórico foi apresentado como execução nova.

## 3. Classificação dos cenários

| ID | Classe / gravidade | Esperado × observado / evidência | Decisão |
| --- | --- | --- | --- |
| S38-K01 | `risco`, moderada | Navegação Home ⇄ Biblioteca por teclado e Tab reversível: foco/retângulo visível em Chrome real a 1363 px | Sem `falha_reproduzida`; sem patch |
| S38-K02 | `risco`, moderada | Reload integral: `BODY` inicialmente; primeiro Tab alcançou `Início` visível; indicadores WORK01 preservados na interface | Sem bloqueio observado; não comprova hash de armazenamento |
| S38-I01 | `nao_testado`, alta para histórico | Caderno: diálogo Excluir/cancelar/confirmar e legado fictício, inclusive foco pós-confirmação | Falta de perfil isolado verificável |
| S38-I02 | `nao_testado`, alta para histórico | Estudo: iniciar/retomar/vincular/cartão/encerrar e verificação byte-idêntica | Falta de perfil isolado verificável |
| S38-I03 | `nao_testado`, alta para pontuação | Revisão: escolha C/E, Conferir e tentativa controlada; A–E individualmente auditada | Não acionar resposta em perfil compartilhado; `nao_testado_ae_auditado` |
| S38-I04 | `nao_testado`, alta para histórico | Plano artificial: conflito, mover dia, regenerar com cancelamento/aceite e retorno por Tab | Falta de perfil isolado verificável |
| S38-I05 | `nao_testado`, moderada | Chrome novo 320/360/390/430/1280, screenshots sintéticas, axe novo e geometria completa de diálogos | Local Chromium bloqueado e CDP compartilhado, sem perfil novo comprovado |
| S38-O01 | `melhoria_opcional`, fora do escopo | ChatGPT Work Sites como camada visual | Frente arquitetural futura, sem implementação |

**`falha_reproduzida`: zero.** Ausência de reprodução em percurso **não mutável** não significa que os diálogos e as cinco larguras estejam aprovados. Não foi criado teste vermelho nem patch sem a prova prévia requerida.

## 4. Testes e limite de navegador local

Executados localmente sob **Node.js v24.22.1**, cada suite com **exit 0**: S19 (**26/26**), S20 (**41/41**), S25, S26, S27, S29, S30, S31, S32, S33, S34, S35 e WORK01 (**14/14**). Suas validações artificiais permanecem coerentes:

- S25: 650 registros acentuados, **13.213.211 bytes** / 6.712.561 caracteres; formato compacto **11.999.987** contra formatado **12.000.013 bytes**; recusa correta e pequena restauração SHA-idêntica.
- S26: seis formatos inválidos de nota recusados; string válida de até **14.000 caracteres** preservada.
- S27: cinco estados falsificados recusados, duas notas válidas idempotentes; S29–S35/WORK01 mantêm suas regressões sintéticas de foco, estado e não duplicação.

**Chromium local S38 não iniciou.** Playwright solicitou `chromium_headless_shell-1234` ausente; `/usr/bin/chromium` com `--no-sandbox` encerrou com `socket() failed: Operation not permitted (1)`, exit 1. **Não houve Chromium local, E2E S38 em cinco larguras, axe novo nem contraste novo**. O navegador CDP compartilhado acima é prova real **distinta** da automação Chromium/Actions.

### Baseline CI S35 reaberto, não CI S38

O último run **de código da `main`** continua [**43494607030**](https://github.com/Talksxb/agu-quiz/actions/runs/43494607030), SHA `af5d820dd83abdf594284371f053cfd64e133011`. Jobs novamente consultados e **logs de cada um** efetivamente lidos:

| Job | ID | Status / conclusão |
| --- | --- | --- |
| `integridade-node` | `132124310700` | `completed/success`; Node 22 e regressões até S35/WORK01 |
| `navegador-chromium` | `132124310239` | `completed/success`; Chromium 158.0.8127.18, cinco viewports **históricos**, `noGhost:true` |
| `pages-publicado` | `132124310834` | `completed/success`; checagem do Pages naquele SHA |

**ZIPs históricos realmente recuperados e testados S38**, sem gerar artefato novo: `14070138441`, **4.204.168 bytes**, SHA-256 **`587b94dd42c6b10bb4ad3983cce69a5813ca32f14222d172ddf06b19204ff680`**; `14071202201` WORK01, **68.429 bytes**, SHA-256 **`a8d4064ea14c7c5299e9e694a8443162a6cea87b8a3242a155e03bc16c37d624`**. Ambos `unzip -t` sem erros; foram listados os nomes dos arquivos, **não** afirmada inspeção visual de todas as capturas. GitHub indicou expiração em **20/11/2026 UTC**. O CI S35 previamente reportou axe-core 4.14.0, **26 scans, zero violations nos recortes, 13 cenários/19 nós `color-contrast incomplete` por `elmPartiallyObscured` e 19/19 passed após exposição**. É referência histórica, **não** certificação WCAG integral, inspeção humana ou axe S38.

A [publicação documental S37, run 43533758084](https://github.com/Talksxb/agu-quiz/actions/runs/43533758084), HEAD `96967658`, terminou `success` e **não foi chamada de CI de código**. Na PR LEG-01 há CI de branch separado, não implantado na `main`.

## 5. Pages HTTPS, hashes vivos e contrato de armazenamento

`node tests/sprint21-pages.cjs` executado na S38: **exit 0**, HTTPS **200**, HTML + seis scripts correspondentes ao checkout. `curl` independente validou também Caderno e Estudo. Os nove SHA-256 **medidos novamente** na origem HTTPS:

| Recurso | SHA-256 | Versão no HTML |
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

Mantido **`agu-portable-local-s20-v1`**, nove categorias exclusivamente `localStorage`, teto **12.000.000 bytes UTF-8** nos critérios de categoria/pacote/JSON formatado, SHA-256 por categoria, `AGUValidateMatrix`, importação somente em categoria ausente, quota/rollback, idempotência e **nunca sobrescrever**. Não houve importação, limpeza, divisão, compactação, migração, merge, fusão ou alteração de schema. Arquivos >12 MB e corrupção anterior permanecem sem recuperação integral autorizada.

- **`nao_testado_backup_historico_real`**: nenhum arquivo pessoal fornecido e nenhuma autorização específica para ensaio local. Preservar cópias conflitantes dos aparelhos, sem merge.
- **`nao_testado_android_fisico`**: nenhum hardware físico autorizado. Não se simulou modelo/Android/Chrome/densidade, toque real, teclado virtual nem TalkBack. O roteiro S24 permanece condicional.

## 6. Escopo jurídico e reconsulta privada

Produto preservado com **quatro destinos** (Início, Estudar, Biblioteca Inteligente, Evolução), 36 flashcards, 24 fontes oficiais **catalogadas, não integralmente certificadas**, D+1/D+7/D+21/D+45, questões pontualmente auditadas `of-2015-adv-006/-007/-009/-048` (gabaritos históricos E/C/E/C), 2015 C/E e 2023 A–E só quando individualmente cotejado; anuladas não pontuam. `of-2015-adv-001` continua excluída da nova correção automática. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50 são excertos identificados; `confirmado_pontualmente` **não** equivale a `certificado_integralmente`. Nenhuma fonte ou questão foi promovida.

Reabertos **somente em leitura** `docs/PROTOCOLO.md`, `checkpoints/estado.json`, último AUD03 integrado e inventário normativo da [Auditoria 03 privada](https://github.com/Talksxb/agu-auditoria), sem anexar matriz, dados ou evidências ao Quiz, CI, artefatos ou relatório. Houve avanço concorrente durante a S38:

| Corte | HEAD privado | Último AUD03 integrado | Evidência em IDs / sem | Lotes integrados / persistidos | Referências | Integralmente certificados |
| --- | --- | --- | --- | --- | --- | --- |
| Abertura | `7b73ed601948b8d3853a52a92292ab6bd895a40b` | AUD03-026 | **363 / 49** de 412 | **136 / 136** | **6.402** | **0** |
| Reconsulta intermediária | `a5efefb7d7fe9162dfe2c1be0daf1aa28d469653` | **AUD03-027** | **363 / 49** de 412 | **136 / 136** | **6.409** | **0** |
| **Fechamento pré-publicação** | **`1065c1cfff6eb86c08d93ecd0cda8d8c33fbec07`** | **AUD03-027** | **363 / 49** de 412 | **136 / 137** (`NORM-INT-040` persistido ainda não integrado) | **6.409** | **0** |

AUD03-027 adicionou **7 referências ao corte documental sem aumentar lotes integrados**; logo depois o lote **NORM-INT-040** foi persistido **sem integração nesse checkpoint**. O estado é dinâmico. Não presumir recálculo de pendências globais, nem certificação por evidência pontual. Reconfirmar HEAD antes de qualquer próximo trabalho.

**Fechamento:** recorte S38 = **Node local + Chrome compartilhado real a 1363 px sem escrita + Pages HTTPS e ZIPs/CI históricos revisitados**. As confirmações mutáveis e os cinco viewports de browser independente permaneceram `nao_testado` por proteção da privacidade; **não há base para patch**. O [prompt S39](PROMPT_SPRINT39_ISOLAMENTO_CONFIRMACOES_CONSERVADORAS_2026-11-13.md) é **somente handoff**. A frente Sites continua apartada.
