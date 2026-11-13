# AGU Quiz — Checkpoint Sprint 35

**Data do corte:** 13/11/2026 (America/Sao_Paulo). **Escopo:** continuidade de teclado/foco em controles secundários existentes, regressão de recuperação local e rigor jurídico. **Status:** patch pontual publicado; CI de código final 3/3 aprovado. **Próxima sprint:** somente handoff documental da S36; **S36 não executada**.

## 1. Fontes, versões e separação das frentes

- Produto público: [Talksxb/agu-quiz](https://github.com/Talksxb/agu-quiz), `main`. Abertura S35 no commit documental `3959ce1dc8289875be5dfe1c902e75473b0b7c13`, árvore `92ed9bd891a457e99686477dbc7107b4111b71d9`. A WORK 01 já estava integrada pela PR #1 no commit `4fa4d2955be60e8acf5e2d134e9d5b241f84f6c3`; `meu-estudo.js` e seu fluxo de retomada foram preservados.
- Referências lidas/reavaliadas: checkpoint S34, checkpoints S33/S32, histórico S19–S34, `docs/GUIA_BACKUP_LOCAL_S21.md`, `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`, módulos reais do Caderno/Estudo/Revisão/Plano/Leitor/Consolidação/Backup, código WORK 01, testes Node/E2E/axe/contraste, verificador Pages e workflow. Auditoria privada separada, exclusivamente leitura.
- Commit de **código e novos testes** S35: `cb0641f587a079f22b97c156a2ecfc238c7e2dd8`, árvore `e75bea4a574e5f08dfb062b1e605c2f4edc877fe`.
- Commit posterior, **exclusivamente ajuste de fixture sintética e verificador Pages**: `af5d820dd83abdf594284371f053cfd64e133011`, árvore `84bd7493a45f37b5bcbb2f9e3cd8fa00532d9bae`; SHA do run CI definitivo S35. Nenhuma regra de negócio foi alterada nessa segunda publicação.
- Não foi criada rota, quinto destino, autenticação, banco, backend, sincronização, nova chave de armazenamento, migração de histórico ou fonte jurídica. A eventual camada visual ChatGPT Work Sites permaneceu **fora desta sprint**, como frente arquitetural futura autorizável.

## 2. Defeitos reproduzidos antes da intervenção

Todas as ações mutáveis foram realizadas com dados **sintéticos** e perfis/estado descartáveis. A perda de `document.activeElement` para `BODY` foi observada diretamente no **Chrome desktop compartilhado**, sobre o aplicativo publicado, em viewport medido de **1363 × 936 CSS px**; `BODY` não corresponde ao controle esperado para continuar a tarefa.

| Cenário real observado antes do patch | Gatilho de teclado | Foco esperado | Foco observado | Consequência / gravidade |
| --- | --- | --- | --- | --- |
| Revisão → Questões oficiais → item auditado C/E `of-2015-adv-006`; selecionar **ERRADO** | Enter sobre opção | Alternativa marcada, seguida de Tab para `Conferir resposta` | `BODY` após reconstrução | Interrompia sequência previsível de teclado; **moderada**, sem tentativa automática |
| Leitor → Estudo Integrado → iniciar → Caderno → **Vincular registros existentes**, com apenas notas artificiais | Enter sobre botão | Botão de vínculo ou próximo controle lógico do contexto | `BODY` após reconstrução | Perda de ponto de retorno; **moderada**; vínculo de duas notas artificiais, não duplicado |
| Estudo Integrado → Flashcards → **Estudar cartão** | Enter sobre botão | Controle `Mostrar resposta` do cartão selecionado | `BODY` após reconstrução | Perda de continuidade antes da revelação; **moderada**, sem avaliação |

Captura visual da página com conteúdo artificial foi observada na inspeção do desktop; **não há screenshot pré-patch exportado com metadados completos de foco** para esses três percursos. A evidência de elemento ativo foi a leitura de estado/DOM durante a reprodução. Portanto não se apresenta a imagem como certificação da geometria ou como arquivo persistido. Não foi executado Android físico nem TalkBack.

Para consolidar uma regressão executável independente do browser, `tests/sprint35-validacao.js` executou os módulos reais num DOM/localStorage sintéticos e emulou o desaparecimento do elemento por `render()`. **Nove casos inicialmente vermelhos** (foco final `BODY`) foram observados antes do patch; após a correção, os mesmos **9/9 passaram**. Esse ensaio é **Node/VM**, não uma afirmação de teclado físico nem substitui Chrome. Seu recorte:

1. Caderno: exclusão confirmada **somente** de nota recém-criada no cenário e retorno ao botão `Adicionar`.
2. Caderno: vínculo voluntário de registro legado **artificial** e retorno ao `Editar` da cópia; origem conservada.
3. Estudo Integrado: retomar sessão sintética no estágio efetivamente salvo.
4. Estudo Integrado: vincular registros existentes, repetindo sem duplicar vínculo.
5. Estudo Integrado: selecionar cartão e continuar em `Mostrar resposta`.
6. Revisão: escolher alternativa C/E de item auditado e reter foco na opção antes de Tab para `Conferir`.
7. Plano: conflito de capacidade, **sem** mover tarefa e com retorno ao controle.
8. Plano: mover tarefa artificial para dia válido e reter controle da tarefa no destino.
9. Plano: regenerar com confirmação em plano artificial e manter foco no controle lógico existente.

## 3. Patch mínimo, regras de negócio e regressões

| Arquivo | Modificação restrita à continuidade de foco | Cache publicado |
| --- | --- | --- |
| `caderno-contextual.js` | Propaga origem de teclado (`event.detail === 0`) nos caminhos `askDelete`/`attachLegacy`; foca `Adicionar` após exclusão confirmada e `Editar` do novo vínculo artificial | `20261113-s35a` |
| `estudo-integrado.js` | Propaga origem de teclado para `open`, `collect`, `pick`; após reconstrução foca etapa retomada, botão de coletar ou `Mostrar resposta` | `20261113-s35a` |
| `revisao-inteligente.js` | Após selecionar por teclado opção oficial C/E, refoca a opção selecionada, permitindo Tab para conferência | `20261113-s35a` |
| `planejamento-semanal.js` | Preserva continuidade de teclado após conflito ou movimento entre dias e regeneração confirmada, com foco no checkbox correspondente | `20261113-s35a` |
| `index.html` | Atualiza **somente** o versionamento de cache dos quatro scripts modificados | Conforme acima |

`leitor-juridico.js` e `leitor-consolidacao.js` permanecem com cache `20261113-s32a`, `backup-local-s20.js` com `20261113-s27a`, `meu-estudo.js` com `20261113-work01b`. Testes novos `tests/sprint35-validacao.js` e `tests/sprint35-browser.cjs` foram adicionados ao fluxo existente, sem novo produto; workflow passou a executá-los e arquivar artefatos sintéticos.

**Limite de prova:** não foi demonstrado nem corrigido um defeito genérico de `render()`. Cada refoco é condicionado a ação pertinente do teclado. Confirmar exclusão e regeneração continua exigindo a ação prevista; não se apaga conteúdo do perfil habitual. A visita a cartão, seção, tarefa ou questão não contabiliza tempo nem avaliação. Nenhum resultado de item `of-2015-adv-001` foi promovido.

## 4. Testes locais, CI real e artefatos

### Execução local

- **Node real v24.22.1**: S19 **26/26**, S20 **41/41**, S25, S26, S27, S29, S30, S31, S32, S33, S34, **S35 9/9** e WORK 01: todos concluídos com aprovação em seus recortes. `git diff --check` aprovado.
- **Playwright Chromium local: não executado com sucesso.** Erro real: `Executable doesn't exist at /home/agent/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell`. A tentativa `npx playwright install chromium` falhou repetidamente em `End of central directory record signature not found`. O `/usr/bin/chromium` disponível já apresentara `socket() failed: Operation not permitted (1)` e `SIGABRT` em sprints precedentes. Não se converte esse bloqueio em teste local aprovado.

### GitHub Actions — falha intermediária diagnosticada

O primeiro run de código S35 **[43494142722](https://github.com/Talksxb/agu-quiz/actions/runs/43494142722)** teve:

- `integridade-node` **132122698484: success**;
- `navegador-chromium` **132122697813: failure**, porque o **fixture legado artificial do novo teste** omitira campos válidos esperados pelo aplicativo (`answers`, `sessions`, `reviews`, `notebook`, etc.), causando erro de `filter` após reload;
- `pages-publicado` **132122698289: failure**, pois o verificador S21 ainda esperava cache **s34a**, enquanto o HTML S35a já estava publicado e servia HTTPS corretamente.

Essas falhas foram diagnosticadas como **defeitos nos testes/verificador**, não indisponibilidade do produto. O segundo commit `af5d820d` completou a fixture sem incorporar dados pessoais e atualizou apenas a expectativa de cache do verificador. Nenhum módulo de produto foi modificado nesse commit.

### CI definitivo S35 — três jobs reais aprovados

**[Run 43494607030](https://github.com/Talksxb/agu-quiz/actions/runs/43494607030)**, commit `af5d820dd83abdf594284371f053cfd64e133011`, status `completed`, conclusão **success**:

| Job e ID real | Resultado | Prova observada no log |
| --- | --- | --- |
| `integridade-node` — **132124310700** | success | Node **v22.23.4**; S19 26/26, S20 41/41, S25–S27, S29–S35 e WORK01; S35 9/9 |
| `navegador-chromium` — **132124310239** | success | Chromium **158.0.8127.18**, axe-core **4.14.0**; E2E S20–S24/S29–S35/WORK01, S35 em cinco larguras com `noGhost: true` |
| `pages-publicado` — **132124310834** | success | Node v22.23.4, HTTPS Pages 200, verificador S21 corrigido, WORK01 no endereço publicado e cinco larguras |

As três conclusões e seus logs foram reabertos. O marcador real da suíte nova foi `S35_BROWSER_FOCO_OK`, com `viewports:[320,360,390,430,1280]` CSS px e casos `excluir_sintetico`, `vincular_legado`, `coletar`, `cartao`, `retomar`, `alternativa_CE`, `conferir`, `conflito`, `mover`, `regenerar`, `reload`. O resultado **`noGhost:true`** decorre do estado artificial inspecionado, não de backup histórico do usuário.

- Artefato Chromium sintético **14070138441**, `agu-s20-chromium-viewports`, **4.204.168 bytes**, digest `sha256:587b94dd42c6b10bb4ad3983cce69a5813ca32f14222d172ddf06b19204ff680`, expira **20/11/2026 19:43:02 UTC**. Contém captura/JSON artificiais da S35 no recorte 390 CSS px; não foi realizada inspeção manual de todos os arquivos ZIP.
- Artefato Pages WORK01 sintético **14071202201**, `agu-work01-publicado`, **68.429 bytes**, digest `sha256:a8d4064ea14c7c5299e9e694a8443162a6cea87b8a3242a155e03bc16c37d624`, expira **20/11/2026 19:42:18 UTC**.

O teste em Chromium real decorre **do Actions**; a observação inicial de três defeitos foi no **Chrome desktop compartilhado**; o Node/VM local é um terceiro meio distinto. Não foi aplicada equivalência indevida entre eles e Android físico.

## 5. Acessibilidade, geometria, contraste e limites humanos

Nos cenários efetivamente cobertos pelo Chromium CI, foram exercitadas as larguras **320, 360, 390, 430 e 1280 CSS px**, com sequência de teclado e continuidade/reload em perfis sintéticos. Captura pós-patch em 390 CSS px e JSON de foco constam do artefato Chromium. Esses testes não são inspeção humana com TalkBack.

As regressões axe/contraste S22/S23/S24 reaproveitadas no **Chromium 158.0.8127.18 / axe 4.14.0** relataram **26 scans, 0 `violations` nos recortes**; inicialmente **13 cenários/19 nós** `color-contrast incomplete` com motivo `elmPartiallyObscured`; após rolagem para completa exposição, **19/19 `passed`**. Não se declarou a questão incompleta como violação, não se alteraram cores sem reprovação e **não se certificou WCAG global**.

- **`nao_testado_android_fisico`**: nenhum aparelho Android fisicamente acessível com autorização específica foi operado; modelo, versão, viewport físico, densidade e TalkBack não foram inferidos.
- **`nao_testado_backup_historico_real`**: não houve entrega voluntária/autorização de arquivo histórico pessoal; nenhum backup real foi aberto, publicado ou anexado a CI.
- Não houve ensaio humano de TalkBack, nem avaliação do toque físico. Toque emulado e Chromium desktop são declarados como tal.
- Não foi exercitada nova correção automática de alternativa A–E de 2023 sem cotejo de item; isso não é um teste aprovado dessa modalidade.

## 6. Recuperação local e conteúdo jurídico preservados

Contrato de recuperação não alterado: **`agu-portable-local-s20-v1`**, exatamente **nove categorias** de `localStorage`, limite **12.000.000 bytes UTF-8** por categoria/pacote/arquivo JSON formatado segundo critérios do contrato, `AGUValidateMatrix`, SHA-256 por categoria, rollback em quota, importação idempotente **só para categoria ausente**, nunca sobrescrever. S25 verificou 650 registros acentuados (**13.213.211 bytes / 6.712.561 caracteres**): JSON compacto **11.999.987** contra formatado **12.000.013 bytes**, recusa coerente e restauração pequena hash-idêntica. S26 rejeitou seis representações inválidas de nota e conservou apenas `string` com até 14.000 caracteres. S27 rejeitou cinco estados falsificados e preservou duas notas válidas/idempotentes. Browser S20–S24 verificou nove categorias, hashes, truncamento, IDs/dispositivos/esquema falsificados, excesso, quota/rollback, refresh sem tentativa fantasma. **Nada disso repara armazenamento anterior corrompido.**

Conflito entre dispositivos permanece sem merge: preservar as cópias. Para >12 MB e corrupção prévia não há recuperação integral aprovada; não foi feita limpeza do navegador, fusão, divisão, compactação ou migração. Nenhuma nota, resposta, sessão pessoal, arquivo ou matriz privada foi incluída em Actions, PR, ZIP ou screenshots.

O acervo e percurso seguem com **quatro destinos** (Início, Estudar, Biblioteca Inteligente, Evolução), WORK01 como retorno pela home, 36 flashcards, 24 referências oficiais **apenas catalogadas**, quatro questões pontualmente auditadas `of-2015-adv-006/-007/-009/-048` (gabaritos históricos **E/C/E/C**), formatos 2015 C/E e 2023 A–E, anuladas sem pontuação, revisão D+1/D+7/D+21/D+45. `of-2015-adv-001` segue fora da nova correção automática até cotejo independente. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50 são **trechos identificados**, não redações integralmente certificadas. **`confirmado_pontualmente` ≠ `certificado_integralmente`.**

## 7. Publicação Pages e hashes reabertos

Após propagação do código e do ajuste do verificador, endereço público **[Talksxb.github.io/agu-quiz/](https://talksxb.github.io/agu-quiz/)**: **HTTPS 200**; verificador local `node tests/sprint21-pages.cjs` aprovado, e job `pages-publicado` aprovado. SHA-256 das respostas publicadas conferido contra os arquivos do corte de código:

| Recurso público | SHA-256 | Cache no HTML |
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

Esses hashes são **fotografia verificada do código S35**, não promessa de imutabilidade do site para sprints futuras. Commit posterior apenas documental não é novo CI de código S35.

## 8. Auditoria 3 privada — dois cortes, somente leitura

| Corte | HEAD `main` privado | Integração | IDs | Evidência parcial | Lotes normativos | Referências | Certificados integralmente |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Abertura S35 | `d0823c40ec4a06b93e69a06bc1504a6dec08e220` | `AUD03-023` | 412 | 356 com / 56 sem | 127 integrados / 131 persistidos | 5.994 | 0 |
| Fechamento S35 | `604337859e57ffba246beb7095ba522943904a6b` | `AUD03-024` | 412 | 360 com / 52 sem | **132 integrados / 132 persistidos** | **6.209** | **0** |

No novo `AUD03-024` após PR #174, NORM-INT-031..035 passaram ao corte integrado; **17 registros em quarentena** (13 sem URL/referência, quatro questões não individualizadas); 215 novos vínculos de URL segundo registro integrado. Não é apropriado transportar a contagem anterior de **837 pendências sem URL** como se tivesse sido atualizada no novo corte, pois não foi recalculada integralmente nesta sprint. O estado final foi reaberto via `checkpoints/estado.json` e `checkpoints/AUD03-024.json`; matriz de trabalho foi consultada apenas para status. **Nenhum conteúdo de matriz/evidência privada foi copiado ao repositório público.**

## 9. Inventário de riscos e decisão de encerramento

| Classe | Gravidade | Evidência / estado | Decisão |
| --- | --- | --- | --- |
| `falha_reproduzida` | Moderada | Três perdas de foco no Chrome desktop antes do patch; nove cenários inicialmente vermelhos no VM sintético | Correção de quatro módulos restrita aos controles, nove verdes e E2E Chromium real cinco larguras no CI |
| `risco` | Moderada | Diálogos nativos/cancelamento, leitura humana de títulos, navegação em contexto mais longo podem ter variação não coberta | Encaminhar ensaio proporcional S36; não aplicar patch especulativo |
| `risco` | Alta para integridade | Histórico local de valor pessoal, limite >12 MB e corrupção anterior sem solução autorizada | Contrato imutável, backup e rollback só sintéticos, preservar cópias |
| `nao_testado` | Alta para acesso humano | `nao_testado_android_fisico`, TalkBack e toque físico | Exigir hardware e consentimento antes de afirmar resultados |
| `nao_testado` | Alta para histórico | `nao_testado_backup_historico_real` | Exigir arquivo voluntário e autorização específica, sem envio ao GitHub |
| `nao_testado` | Jurídica | Nova correção de A–E 2023 sem questão auditada específica | Não promover conteúdo/gabarito; Q1 2015 segue bloqueada |
| `melhoria_opcional` | Fora do escopo S35 | ChatGPT Work Sites como camada visual | Tratar em frente arquitetural separada, com GitHub fonte da verdade |

**Aceite delimitado:** as falhas reproduzidas e nove regressões foram tratadas; CI definitivo, ZIP sintético e Pages estão comprovados no recorte. Não foram certificados Android físico, TalkBack, WCAG global, recuperação de backup pessoal real ou correção jurídica integral. O **[prompt integral Sprint 36](PROMPT_SPRINT36_RETORNO_PERSISTENCIA_ACESSO_HUMANO_2026-11-13.md)** é entregue como **handoff exclusivamente documental**, sem execução da S36.
