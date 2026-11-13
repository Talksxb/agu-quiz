# AGU Quiz | CHECKPOINT — Sprint 24
## Contraste condicionado à visibilidade, foco de teclado e resiliência móvel

**Data:** 13/11/2026 (Brasil). **Repositório:** `Talksxb/agu-quiz`, branch `main`.  
**Predecessora lida:** `docs/CHECKPOINT_SPRINT23_RECUPERACAO_ACESSIBILIDADE_MOBILE_2026-11-13.md`; consultados os checkpoints S19–S22, `docs/PROMPT_SPRINT24_2026-11-13.md`, `docs/GUIA_BACKUP_LOCAL_S21.md`, módulos da aplicação, dados S18/S19, testes S19–S23 e workflow de CI.  
**Status:** Sprint 24 executada, defeito de foco reproduzido e corrigido, CI/Pages verificados. **Sprint 25 não iniciada**; seu prompt é exclusivamente handoff.

## 1. Baseline e limites da evidência

- `main` antes da S24: commit documental S23 `f625329991087efea0be6420e6151eb4d68f05a5`. O run [S23 `43410431814`](https://github.com/Talksxb/agu-quiz/actions/runs/43410431814) e [artefato `14029197398`](https://github.com/Talksxb/agu-quiz/actions/runs/43410431814/artifacts/14029197398) confirmavam S19 **26/26**, S20 **41/41**, E2E S20–S23 e axe-core sem *violations* automáticas no recorte. Havia **13 cenários/18 nós** `color-contrast` classificados `incomplete` por `elmPartiallyObscured` após a correção de `aria-prohibited-attr` da S23. A relação mínima CSS da S23 era **5,99:1** em 93 medições, insuficiente, isoladamente, para certificar WCAG.
- Auditoria privada `Talksxb/agu-auditoria`: consultados em **somente leitura** `docs/PROTOCOLO.md`, `checkpoints/estado.json` e `checkpoints/AUD03-016.json`. O estado foi reconferido ao fim da S24: **AUD03-016** continua sendo o último checkpoint integrador persistido, com **412 IDs curriculares únicos**, 14 disciplinas, **121 lotes normativos integrados**, 351 IDs com alguma evidência, 61 sem, 5.722 ponteiros, 823 pendências sem URL e **zero tópicos certificados integralmente**. O estado normativo já avançou até **NORM-INT-027**: 124 lotes persistidos, dos quais `NORM-INT-025`, `026` e `027` ainda não constam da integração da matriz de trabalho de AUD03-016. Não confundir persistência normativa com integração, nem `confirmado_pontualmente` com `certificado_integralmente`.
- Não foi alterado o repositório privado, a matriz privada, qualquer questão, gabarito, referência ou dado pessoal. Nenhum arquivo de backup pessoal foi enviado ao GitHub ou ao CI.

## 2. Diagnósticos antes da alteração e classificação

| ID | Classe | Gravidade / impacto | Evidência de reprodução e decisão |
|---|---|---|---|
| S24-001 | **falha_reproduzida → corrigida** | Média — teclado e foco na navegação interna móvel | Run [diagnóstico `43412687821`](https://github.com/Talksxb/agu-quiz/actions/runs/43412687821), Chromium **158.0.8127.18**. Em 360 px, `Plano semanal` recebia foco sem ficar visível por inteiro: botão `left=350,28/right=465,25`, mas borda direita do `<nav>` em `351`; `scrollLeft=0`. Reproduzido também em **390/430 px**. Em **320 px** o foco nativo já rolava o item totalmente fora da tela; em **1280 px** ele já estava visível. Foi implementada rolagem horizontal apenas quando um controle da navegação secundária recebe foco parcialmente recortado, com espaço de 4 px para o contorno. |
| S24-002 | **risco investigado; não comprovada violação de contraste** | Média — resultados automatizados inconclusivos enquanto um controle fica parcialmente oculto | Os **18 nós** anteriormente inconclusivos na S23 tornaram-se `passed` ao rolar cada controle para plena visibilidade, ainda antes do patch de foco. Na versão final, o pequeno ajuste de padding passou a gerar **19 nós `incomplete` no estado inicial**, distribuídos nos mesmos **13 cenários** de recorte; após `scrollIntoView`, **todos os 19 foram `passed`**, 19/19 ficaram visíveis e nenhuma *violation* foi detectada no recorte. A classificação original continua sendo `incomplete`, não `violation` nem prova global de conformidade. Sem ajuste cosmético de cores. |
| S24-003 | **risco controlado por regressão sintética** | Alta se houvesse perda de histórico | E2E S22/S23 reexecutados em Chromium real: exportação de JSON de nove categorias, importação em perfil novo, hashes SHA-256 por chave, idempotência e não sobrescrita; rejeições de arquivo truncado, >12 MB, versão/categoria/estrutura inválida, dispositivo inexistente, matriz importada inconsistente e quota com rollback. Todos os cenários automatizados passaram; **não implica** compatibilidade com backup histórico pessoal. |
| S24-004 | **risco controlado por regressão** | Média — toque e duplicação de tentativas | Playwright com **touch emulado no Chromium desktop** a 320/390/430 px: ações de Estudar → Plano → Biblioteca → Materiais → Evolução → Dados, `innerWidth=scrollWidth` e **zero tentativas criadas sem resposta**. E2E precedentes cobrem refresh/retorno e calendário. Não é ensaio no telefone. |
| S24-005 | **nao_testado_android_fisico** | Média — interação e TalkBack reais | Não havia Android físico conectado e autorizado; `adb` não estava disponível. Não há modelo, versão, densidade, viewport real, orientação física, toque real nem leitura TalkBack aferidos. Preparado `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`, inteiramente marcado `nao_testado`. |
| S24-006 | **nao_testado_backup_historico_real** | Média/alta — retrocompatibilidade e conflitos de recuperação | Nenhum backup histórico pessoal foi fornecido ou autorizado. Foram usados apenas arquivos sintéticos; não afirmar migração retrocompatível nem realizar fusão entre dispositivos. Preservar as duas cópias antes de qualquer tentativa assistida. |
| S24-007 | **risco jurídico bloqueado** | Alta se pontuação incorreta fosse reativada | `of-2015-adv-001` segue excluída da nova correção automática até cotejo histórico independente. CF37 X, CF49 V e Lei 9.784 art. 50 permanecem excertos identificados, não textos integrais. |

**Falsos negativos e diagnóstico:** o primeiro teste novo [run `43412474007`](https://github.com/Talksxb/agu-quiz/actions/runs/43412474007), commit `128693219a8f108f75df26c0644da29506a45231`, falhou por *asserção de foco visível*. Em vez de alterar imediatamente a interface, o teste foi instrumentalizado no commit `41dc78594fba20b314c98543404c43ec5f1486fa`. O segundo [run `43412687821`](https://github.com/Talksxb/agu-quiz/actions/runs/43412687821) ficou verde como **diagnóstico** e registrou a geometria do defeito real. Em seguida, a correção e a asserção definitiva foram publicadas no commit `d871ea6e4a8b1d64dc87479cb93fb6d9997018a4`.

### Geometria do foco após a correção

No run final, `Plano semanal` ficou **inteiramente dentro** da área de navegação tanto por `.focus()` quanto por `Tab`:

| Viewport CSS Chromium | `scrollLeft` após foco | Botão (`left → right`) | Nav (`left → right`) | Resultado teclado |
|---:|---:|---:|---:|---|
| 320 px | 162 | 192,28 → 307,25 | 9 → 311 | Visível |
| 360 px | 122 | 232,28 → 347,25 | 9 → 351 | Visível |
| 390 px | 92 | 262,28 → 377,25 | 9 → 381 | Visível |
| 430 px | 52 | 302,28 → 417,25 | 9 → 421 | Visível |
| 1280 px | 0 | 638,47 → 757,44 | 281,19 → 1228,81 | Visível |

Os números acima são do Chromium em runner desktop. Não foram medidos no aparelho do usuário.

## 3. CI real, Pages e artefatos

**Run final do código:** [GitHub Actions `43413057667`](https://github.com/Talksxb/agu-quiz/actions/runs/43413057667), commit **`d871ea6e4a8b1d64dc87479cb93fb6d9997018a4`**. Status individuais observados na API de jobs e nos logs:

| Job | ID | Resultado e medição |
|---|---:|---|
| `integridade-node` | `131844027862` | **success** — Node **v22.23.4**, `tests/sprint19-validacao.js` **26/26** e `tests/sprint20-validacao.js` **41/41**. |
| `navegador-chromium` | `131844027354` | **success** — Chromium **158.0.8127.18**; E2E S20/S21/S22/S23/S24 e axe S22/S23; axe-core **4.14.0**, 26 varreduras S24, 19 nós incompletos inicialmente e **19/19 `passed` após rolagem**, zero violações nesse recorte; foco nos cinco viewports e toque emulado nos três. |
| `pages-publicado` | `131844027707` | **success** — [Pages por HTTPS](https://talksxb.github.io/agu-quiz/) com HTTP 200; hashes do HTML e dos **quatro scripts** confrontados com o checkout. `backup-local-s20.js?v=20261112-s22a` permanece intacto. |

**Artefato final [ID `14030711429`](https://github.com/Talksxb/agu-quiz/actions/runs/43413057667/artifacts/14030711429):** `artifacts-s24/contraste-rolagem-teclado-touch.json` (nós, estados, geometria e resumo), `artifacts-s24/touch-emulado-320.png`, `touch-emulado-390.png`, `touch-emulado-430.png`, além das capturas e relatórios sintéticos anteriores. O ZIP foi baixado e o JSON lido de fato: `scans=26`, `initiallyIncomplete=19`, `afterScroll.passed=19`, `offscreenBecameVisible=19`, `touches=3`, `attempts=0`. Nenhum dado real de estudante no artefato.

O relatório S23 continua relevante: **13 cenários** axe têm elementos parcialmente recortados no estado estático; sua resolução **de medição** após rolagem individual não significa que o relatório estático deixou de ser `incomplete`. O teste não inclui leitores de tela reais, todos os contrastes de todos os estados, nem inspeção humana WCAG integral. **Não há certificado WCAG global.**

## 4. Arquivos e commits efetivamente persistidos

| Caminho | Commit(s) da S24 | Mudança / restrição |
|---|---|---|
| `index.html` | `d871ea6e4a8b1d64dc87479cb93fb6d9997018a4` | `focusin` delegado somente à navegação secundária e rolagem do item recortado; `padding` lateral de 4 px para foco. Sem nova tela/menu. |
| `tests/sprint24-contrast.cjs` | `128693219a8f108f75df26c0644da29506a45231`, `41dc78594fba20b314c98543404c43ec5f1486fa`, `d871ea6e4a8b1d64dc87479cb93fb6d9997018a4` | Varredura axe antes/depois da rolagem, geometria de foco por mouse/teclado, asserções por cinco larguras, touch emulado e capturas sintéticas. |
| `.github/workflows/agu-sprint20-ci.yml` | `128693219a8f108f75df26c0644da29506a45231` | Executa teste S24 após S20–S23 e preserva JSON/PNG sintéticos como artefato. |
| `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md` | Commit documental de fechamento S24 | Passos seguros de validação humana; **nenhum ensaio físico alegado**. |
| `docs/CHECKPOINT_SPRINT24_CONTRASTE_FOCO_E_MOBILE_2026-11-13.md` | Commit documental de fechamento S24 | Este registro, fontes, classificações, testes e riscos. |
| `docs/PROMPT_SPRINT25_2026-11-13.md` | Commit documental de fechamento S24 | Handoff integral, **sem iniciar a S25**. |

**Arquivos mantidos:** `backup-local-s20.js`, módulos de revisão/planejamento/caderno/estudo/leitura, dados S18/S19, questões e gabaritos. Sem login, backend, sincronização, coleta remota, fusão automática ou migração em lote.

## 5. Invariantes, privacidade e riscos residuais

- Navegação principal: exatamente **Início, Estudar, Biblioteca Inteligente, Evolução**. Quatro itens auditados `of-2015-adv-006`, `-007`, `-009`, `-048`, gabaritos históricos **E/C/E/C**, **36 flashcards**, **24 referências oficiais catalogadas** (não 24 certificações), formatos **2015 C/E** e **2023 A–E** e questões anuladas sem pontuação.
- Histórico e revisão **D+1/D+7/D+21/D+45** preservados. Percursos de missão/estudo/planejamento/revisão/caderno/evolução e refresh/retorno cobertos pelas regressões existentes; nenhuma tentativa criada pelo novo teste de toque sem resposta.
- Backup continua sob esquema **`agu-portable-local-s20-v1`** e **nove categorias** em `localStorage` local, sem transmissão. Restauração apenas em categorias ausentes; dados existentes não sobrescritos. Limite de **12 MB** e validação curricular do próprio importador `AGUValidateMatrix` preservados. Hash por categoria e rejeição não destrutiva verificados com dados **sintéticos**.
- Pendem **`nao_testado_android_fisico`** e **`nao_testado_backup_historico_real`**, conflito de versões entre aparelhos, inspeção real TalkBack/teclado virtual, e avaliação WCAG completa. Os alvos `color-contrast` são **`incomplete` no recorte inicial**, **`passed` após exposição integral**; nenhum deles foi classificado como `violation` nos testes.
- Auditoria jurídica segue **parcial e não certificada**; lotes normativos persistidos `025–027` não incorporados pela AUD03-016. Q1 legada continua bloqueada. Nenhum dado privado foi publicado.

**Próxima execução, se solicitada:** ler `docs/PROMPT_SPRINT25_2026-11-13.md` e `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`. **Uma sprint por execução; a Sprint 25 NÃO começou neste fechamento.**
