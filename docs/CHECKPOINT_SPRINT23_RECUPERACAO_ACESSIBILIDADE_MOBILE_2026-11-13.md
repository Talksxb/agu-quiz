# AGU Quiz | CHECKPOINT — Sprint 23
## Recuperação assistida, acessibilidade remanescente e uso móvel verificável

**Data:** 13/11/2026 (Brasil). **Repositório:** `Talksxb/agu-quiz`, branch `main`.
**Predecessora efetivamente lida:** `docs/CHECKPOINT_SPRINT22_DADOS_E_ACESSIBILIDADE_2026-11-12.md` e `docs/PROMPT_SPRINT23_2026-11-12.md`.
**Status:** Sprint 23 implementada, regressões concluídas e GitHub Pages verificado. **Sprint 24 não iniciada.**

## 1. Escopo e controle de fontes

- Consultados checkpoints S19–S22, guia S21 de backup, códigos da interface e de seus oito módulos de estado/revisão/leitores, dados S18/S19, testes S19–S22 e workflow existente. Não foram modificados dados jurídicos, gabaritos ou fontes privadas.
- Auditoria privada `Talksxb/agu-auditoria` consultada **somente para leitura**: `docs/PROTOCOLO.md`, `checkpoints/estado.json` e `checkpoints/AUD03-016.json`. Na reconsulta final, `ultimo_checkpoint_persistido=AUD03-016`, `item_id=INT-27`, 412 IDs únicos, 14 disciplinas, 351 IDs com alguma evidência, 61 sem, 5.722 vínculos, 823 pendências sem URL, 121 lotes normativos **integrados** e **zero certificações integrais**. Os lotes `NORM-INT-025` e `NORM-INT-026` (INT28 e INT29) estavam persistidos pela frente normativa, mas **não incorporados** à matriz de trabalho em `AUD03-016`; não os promover a certificado.
- A matriz curricular privada não foi exportada, republicada ou usada em CI. Matrizes sintéticas com 14 disciplinas/412 IDs só existiram em perfis de teste efêmeros.
- Mantidos os destinos Início, Estudar, Biblioteca Inteligente e Evolução; `of-2015-adv-006/-007/-009/-048`, 36 flashcards, 24 referências oficiais catalogadas, histórico e revisão D+1/D+7/D+21/D+45. A quantidade de referências não é certificação jurídica.

## 2. Reproduções e classificação

| ID | Classe | Gravidade e impacto | Reprodução e decisão |
|---|---|---|---|
| S23-001 | **falha_reproduzida** | Média, semântica de navegação para tecnologia assistiva | Artefato diagnóstico do run `43409707642`: `aria-prohibited-attr` em **21 cenários/21 nós**, todos `.secondary-nav` como `div aria-label` sem papel válido. Correção mínima: elemento `<nav aria-label>`; varredura final: **zero** incompletos dessa regra. |
| S23-002 | **falha_reproduzida** | Média, perda de foco de teclado após troca de seção | Inspeção direta no Pages anterior: `Estudar → Planejamento` redesenhava `#main` e deixava `document.activeElement=BODY`. Correção: quando o controle que acionou `setView` estava em `#main`, focar o novo `<h1 tabindex="-1">` após renderizar. Verificado posteriormente no site publicado: `NAV` rotulado e `activeElement=H1` no Planejamento. |
| S23-003 | **risco / nao_conclusivo_axe** | Média, contraste de elementos parcialmente ocultos | S22: 13 cenários inconclusivos. S23: **13 cenários/18 nós** de `color-contrast`, com mensagem axe `elmPartiallyObscured` em itens do menu horizontal recortados pela largura. Em 93 medições de CSS de botões/summary da navegação, contraste calculado **5,99:1 a 6,88:1**; 21 medições tinham bounding box recortada. Não há violação comprovada nesses alvos, mas o algoritmo segue inconclusivo em 18 nós. Sem mudança cosmética ou certificação WCAG por inferência. |
| S23-004 | **risco controlado por regressão** | Alta se restauração fosse destrutiva | Foram reexecutados arquivo real de teste JSON com **nove** categorias sintéticas, SHA-256 por chave e restauração em perfil novo (S22), além de arquivo truncado, formato antigo incompatível, chave não autorizada, estrutura inconsistente, dispositivo inválido, excesso de 12 MB e falha de quota simulada com rollback (S23/S21). Todos rejeitados/preservados conforme contrato; nenhum defeito novo demonstrado no backup. |
| S23-005 | **risco controlado por regressão** | Alta se tentativas duplicassem ou fossem substituídas | Reimportação idempotente, categorias existentes não sobrescritas, hashes originais iguais aos restaurados. Reabrir missão e recarregar não criou tentativa nova; regressões de quatro questões auditadas e agendamento seguem passando. |
| S23-006 | **nao_testado_android_fisico** | Média, toque/Chrome/TalkBack real | Não havia Android conectado e autorizado, nem ferramenta `adb` disponível. Viewports desktop Chromium de 320/360/390/430/1280 px **não** equivalem a teste no aparelho. |
| S23-007 | **nao_testado_backup_historico_real** | Média, compatibilidade de arquivos pessoais antigos | Nenhuma amostra histórica real disponibilizada. Não criar migração especulativa nem publicar arquivo pessoal. |
| S23-008 | **risco_de_conflito_entre_dispositivos** | Média, dados concorrentes | Cópia completa adiciona apenas categorias ausentes. Não há política de fusão para categorias já existentes nem consentimento para sincronização. Preservar cópias e consultar `docs/GUIA_BACKUP_LOCAL_S21.md`. |
| S23-009 | **pendencia_juridica_legado_2015_Q1** | Alta na hipótese de reativar pontuação; bloqueio mantido | `of-2015-adv-001` continua sem nova correção automática por falta de cotejo histórico e de variante. Questões com `confirmado_pontualmente` nunca passam a `certificado_integralmente`; excertos CF37 X, CF49 V e L9784 art50 continuam identificados como trechos. |

**Uma falha intermediária foi do teste, não da aplicação:** no run [`43410212272`](https://github.com/Talksxb/agu-quiz/actions/runs/43410212272), o teste S23 exigiu anel de `:focus-visible` após **clique de ponteiro**, condição que não necessariamente ativa a pseudo-classe. Foi corrigido para acionar o controle por `Enter` (commit `40689ca81b4d506da97cc934bf2594aaa11f559b`). A regressão final passou sem alterar CSS ou introduzir falsa falha de acessibilidade.

## 3. Testes reais, ambiente e artefatos

**Run final do código:** [`43410431814`](https://github.com/Talksxb/agu-quiz/actions/runs/43410431814), commit `40689ca81b4d506da97cc934bf2594aaa11f559b`. **Os três jobs concluíram `success`:**

| Job | ID | Execução verificada nos logs |
|---|---|---|
| `integridade-node` | `131835180422` | **Node v22.23.4**; `tests/sprint19-validacao.js` **26/26**; `tests/sprint20-validacao.js` **41/41**. Esses dois são testes lógicos simulados em Node real. |
| `navegador-chromium` | `131835180044` | **Chromium 158.0.8127.18**; E2E S20/S21/S22/S23 concluídos; cinco larguras; quatro questões de 2015, 2015 C/E, 2023 A–E, anulação sem pontuação, caderno, revisão, sessão, matriz sintética, arquivo de backup, SHA-256 por categoria, idempotência, falha de quota e rejeições não destrutivas. |
| `pages-publicado` | `131835180358` | HTTPS publicado, HTML e quatro scripts verificados com **hash correspondente ao commit de checkout**, HTTP 200; o script de backup continua com `backup-local-s20.js?v=20261112-s22a` (não houve alteração do módulo na S23). |

**Diagnóstico axe no Chromium real:** axe-core **4.14.0**; 26 cenários de rota/largura; zero violações automáticas classificadas nos conjuntos WCAG 2/2.1 A/AA examinados. `aria-prohibited-attr` caiu de 21 cenários inconclusivos para **zero**; `color-contrast` permaneceu inconclusivo em **13 cenários/18 nós**, especificamente por controles parcialmente recortados. A medição de estilo CSS de 93 elementos não é medição física/visual de todos os estados e **não** representa conformidade WCAG global. Os inputs de upload de backup são `display:none`; os botões públicos de exportar/importar possuem nomes acessíveis. Não houve teste efetivo com TalkBack ou leitor de tela físico.

**Artefato do run final:** [capturas sintéticas S20/S21 e `axe-elementos-inconclusivos.json`](https://github.com/Talksxb/agu-quiz/actions/runs/43410431814/artifacts/14029197398). O arquivo detalha alvo, HTML, condições inconclusivas e medições CSS; contém apenas interface e dados sintéticos. O relatório S22 anterior foi lido a partir do [artefato `14003719898`](https://github.com/Talksxb/agu-quiz/actions/runs/43352410581/artifacts/14003719898), para evitar interpretar contagens sem elementos.

**Inspeção ao vivo adicional:** a URL pública [AGU Quiz](https://talksxb.github.io/agu-quiz/) foi aberta no Chrome do ambiente e confirmou `NAV` nomeado e foco do `<h1>` após clique interno. **Não** era Android físico. A execução local isolada rodou S19/S20 com Node v24.22.1, mas o Chromium local não conseguiu usar o socket exigido pela sandbox; por isso a comprovação automatizada de navegador é o run real do GitHub Actions, não uma execução local fictícia.

## 4. Arquivos alterados e commits

| Caminho | Commits | Razão |
|---|---|---|
| `index.html` | `cc92a781e0e463fae7954667b28281903575a279` | `<nav>` semântico e foco programático do título depois da navegação interna; nenhum menu novo. |
| `tests/sprint23-axe.cjs` | `d1c65eca5bebed527caab3078807b80d460b89ea`, `cc92a781e0e463fae7954667b28281903575a279` | Diagnóstico por nó das regras inconclusivas, 93 medidas CSS, asserção de remoção de alerta ARIA. |
| `tests/sprint23-browser.cjs` | `cc92a781e0e463fae7954667b28281903575a279`, `40689ca81b4d506da97cc934bf2594aaa11f559b` | E2E de foco, cinco viewports e adversários do backup; ajuste do teste de foco pelo teclado. |
| `.github/workflows/agu-sprint20-ci.yml` | `d1c65eca5bebed527caab3078807b80d460b89ea`, `cc92a781e0e463fae7954667b28281903575a279` | Adicionar diagnóstico e E2E S23 ao CI, incluindo artefatos. |

**Sem modificações:** `backup-local-s20.js`, módulos de revisão/planejamento/caderno/leitor, dados e gabaritos, matriz privada, repositório de Auditoria. Sem banco, login, coleta remota, sincronização, migração ou substituição automática de registros.

## 5. Estado final e próxima execução

- O aplicativo continua funcional com **quatro destinos**, quatro questões auditadas de 2015 (gabaritos históricos E/C/E/C), **36 flashcards**, **24 referências catalogadas** e a mesma agenda de revisão; preservadas as distinções **2015 C/E**, **2023 A–E**, **anuladas não pontuadas**.
- O backup completo permanece `agu-portable-local-s20-v1`, com nove chaves catalogadas, limite 12 MB, restauração somente de chaves ausentes e nenhuma sincronização; validação da matriz curricular continua delegada à mesma `AGUValidateMatrix` do importador original.
- Pendências explícitas: `nao_testado_android_fisico`, `nao_testado_backup_historico_real`, `nao_conclusivo_axe_color_contrast_18_nos`, conflitos de versões entre dispositivos, auditoria jurídica não certificada e Q1 legada bloqueada.
- Handoff integral: `docs/PROMPT_SPRINT24_2026-11-13.md`. **Sprint 24 não iniciada.**

**Princípio preservado:** evidência real e privacidade prevalecem sobre expansão de números ou certificação declaratória.
