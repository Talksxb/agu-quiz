# LEG-14 — portão de validação assistiva independente, sem patch

**Data de corte:** 15/11/2026, `America/Sao_Paulo`. **Escopo exclusivo:** acesso Home ⇄ única lista “Para meu caderno”. **Resultado:** `nao_testado_em_ambiente_assistivo_independente`; não houve defeito novo comprovado, nem alteração do produto. **LEG-15 não foi executada.**

## 1. Fonte, retomada e concorrência

- Código e documentação: https://github.com/Talksxb/agu-quiz. Produção estática: https://talksxb.github.io/agu-quiz/. A auditoria privada `Talksxb/agu-auditoria` **não foi acessada**.
- `main` remota revalidada na abertura: **`72669bd35ad08d0eb1d7be344cdb8ba37d3b7ea2`**, merge documental da UX-BARALHOS-06, PR #34. Os merges históricos subsequentes à LEG13 são documentação UX06 PR #33 (`ba0af6c662a84a83c76f40c6a5aa2c4e2cedce31`) e PR #34 (`72669bd...`); nenhuma alteração adicional de runtime foi observada nesse intervalo. **Nenhuma PR aberta** no momento da consulta inicial. Não havia implantação pendente na lista recente: Pages **`43749630708`** concluído com `success` para a `main` confirmada.
- A LEG13 corrigiu o truncamento de “Continuar estudando” em fonte 200%, com CSS restrito à Home, PR #29, merge **`60bf27b0c170ed003d0eec1c5fb22abe15859e79`**; documentação PR #32, merge **`253f658a8e8fe23cd4660379cc2eca8756f0d22d`**. A [CI principal da LEG13 `43748256376`](https://github.com/Talksxb/agu-quiz/actions/runs/43748256376) passou nos três jobs e executou LEG13 em HTTPS. O checkpoint [`LEG-13_PORTAO_HOME_CADERNO.md`](LEG-13_PORTAO_HOME_CADERNO.md) e o handoff [`PROMPT_LEG-14.md`](PROMPT_LEG-14.md) foram relidos.
- Branch exclusiva desta sprint: **`leg/leg14-portao-assistivo-sem-patch`**, criada de `origin/main` `72669bd...` em worktree novo e limpo, sem alterar os worktrees anteriores. Entrega restrita a este checkpoint e a [`PROMPT_LEG-15.md`](PROMPT_LEG-15.md). PR/merge documental e CI devem ser confirmados no histórico GitHub, sem presumir aprovação antes do resultado efetivo.
- **Concorrência nova durante a CI:** a [PR UX07 #35](https://github.com/Talksxb/agu-quiz/pull/35), inicialmente em rascunho, entrou na `main` pelo merge **`3bf0c1b4c11af7e40a12cf18e6b6304c8b81abe2`**. A comparação mostrou somente os dois documentos `docs/CHECKPOINT_UX-BARALHOS-07_2026-11-15.md` e `docs/PROMPT_UX-BARALHOS-08.md`, sem runtime ou contrato LEG14 alterado. A branch desta sprint foi reconciliada com essa base por merge **sem conflito**, preservando ambas as documentações e sem force push.

## 2. Decisão verificável do portão de ambiente

O executor disponibilizado é **Linux x64, Node v24.22.1**, com `/usr/bin/chromium`. Inventário read-only: **`adb`, `emulator`, `avdmanager`, `sdkmanager`, `scrcpy`, `orca`, `firefox` e binário de leitor de tela não estavam disponíveis no PATH**; tampouco os caminhos `/dev/bus/usb`, `/dev/kvm` e `/opt/android-sdk`. As ferramentas conectadas não anunciaram serviço de aparelhos reais ou sessão assistiva independente autorizada. Nenhum Android/iOS, perfil descartável de teste assistivo ou sessão disponibilizada pelo usuário foi identificado. A interface Chrome/CDP do ambiente continua **compartilhada/gerenciada**, não uma prova de isolamento ou de TalkBack/VoiceOver.

**Consequência:** nenhum navegador, perfil pessoal, backup real ou estado de estudo foi aberto, criado ou escrito para um novo ensaio. Não se tentou contornar a política de perfis, instalar infraestrutura, usar equipamento do usuário, injetar dados no Chrome compartilhado ou afirmar isolamento por apenas trocar de aba/viewport. A ausência de um novo dispositivo **não é um teste aprovado nem uma falha da aplicação**.

Os checkpoints S39–S45, sobretudo [`CHECKPOINT_SPRINT45_PORTAO_SUSPENSO_CONCORRENCIA_SEM_PATCH_2026-11-15.md`](CHECKPOINT_SPRINT45_PORTAO_SUSPENSO_CONCORRENCIA_SEM_PATCH_2026-11-15.md), já documentam o risco de `localStorage` compartilhado e a falta de uma via de navegação genuinamente segregada. A UX06 também encerrou seu portão sem Android/TalkBack ou defeito novo. **Nenhuma evidência nova** nesta LEG14 substituiu esse bloqueio.

## 3. Contratos conferidos e decisão de não repetir testes

- `AGUHome.notebookPending()` em `meu-estudo.js` é leitura da categoria `agu_leitor_juridico_s13_v1`, precedida da validação `AGUBackup20.validateRecord`, e conta exclusivamente `status:'pendente'`, inclusive `topic:null`. Falha de leitura/JSON/validação retorna aviso neutro, sem reparo. O modo de demonstração não exibe o total do histórico real.
- `AGUHome.openNotebook()` usa `AGULegal.tab('para_caderno')` na **mesma lista** e apresenta painel transitório de retorno; `returnFromNotebook()` devolve foco ao botão da Home. O leitor mantém edição e alterações manuais de status. Não há outro caderno ou agenda.
- Origens mantidas: `leitor`, `estudo_integrado`, `questao_verificada`, `flashcard_existente`; IDs `pc-*`, tópico literal comprovado ou `null`, 300 marcações, 450 caracteres, 500 comentários, nove categorias S20 e backup até 12 MB UTF-8, importação apenas de categorias ausentes. LEG08 só mostra pendentes com `topic===active.code` em cartão já vencido (`due<=hoje`). Abertura/retorno não equivalem a anotação física concluída.
- A LEG13 já testou em Chromium **320/360/390/430/1280** com contextos sintéticos, Enter/Espaço/toque, foco, filtros, edição, estados, quota, armazenamento inválido, quatro origens, backup e fonte 200%, sem defeito residual reproduzido nesse fluxo. A CI verde é **evidência histórica**, não teste assistivo independente da LEG14. Sem ambiente novo ou falha distinta, **não foram repetidas artificialmente as 31 suítes Node ou as mesmas jornadas Chromium**, nem criado fixture LEG14 de runtime.
- **Axe histórico da LEG13, não reexecutado na LEG14:** Home 390 e 1280: `violations=0`, `incomplete=0`, `passed=18` regras; lista 390: 0 violações, **1 nó inicialmente inconclusivo**, 24 regras aprovadas, zero inconclusivo persistente na regra reavaliada após rolagem; lista 1280: 0 violações, **5 nós inicialmente inconclusivos**, 26 regras aprovadas, zero persistente após rolagem. A LEG11 ainda tinha **12 nós inconclusivos persistentes** em cada largura no módulo de flashcards, fora do atalho; UX05 teve **nove nós inconclusivos após rolagem** por largura na biblioteca. `incomplete` **não é aprovação WCAG**. Capturas/JSON históricos não são novos testes desta sprint.
- **Não testados pela LEG14:** leitor de tela/ordem de anúncios, Android físico/TalkBack, iOS/VoiceOver, zoom 200/400% em aparelho independente, teclado/toque sob leitor assistivo, foco oculto por interface real, backups pessoais e históricos de sessão em dispositivo externo. **Nenhuma falha nova foi demonstrada**, mas isso não equivale a declarar esses itens conformes.

## 4. Produção HTTPS reconfirmada, sem delta de produto

Executado de forma **somente leitura** `node tests/sprint21-pages.cjs` sobre o checkout `72669bd...`: **exit 0**, HTTP 200 para HTML, **nove scripts**, `baralhos-ux.css` e `questoes-leitor-s18.js`, todos com SHA-256 exatos comparados aos arquivos locais. Isso verifica o deploy público, não faz escrita na sessão do estudante. O Pages de referência é [run `43749630708`](https://github.com/Talksxb/agu-quiz/actions/runs/43749630708), aprovado.

| Asset de produção | SHA-256 verificado em HTTPS |
| --- | --- |
| `index.html` | `e33885e0469ce760408e1b7d7d03c2d8bcaa753dad0f237bfd745777bf0aef24` |
| `meu-estudo.js` | `e88aa5ee7cb77a5f4e193f690830c803604dcda1b3d2e6fe53e0d8285bed43de` |
| `leitor-juridico.js` | `1f119fb84c092b00a994943a1f0f09d85dcc6efabb6b85df536a3b3189a48c04` |
| `backup-local-s20.js` | `8f1884ab63c2d6e4bb3bca753d01607a29abedf07e60d61ecb6f1c464a07f4f9` |
| `revisao-inteligente.js` | `fe6b8dcacc7363fd661055e737c73c443f1428d2b97e807faeb37e447650252c` |
| `baralhos-ux.css` | `de772af0e639f70f57bc4ea8d6bf59fd9cd6971463ae936f9a74d390be42d3b7` |
| `questoes-leitor-s18.js` | `f4095116ca5bf0b31bd76ca323a88a7b8a1e0b079d100da9981d1f8f6d943c3f` |
| `dados/legislacao-s13.js` | `c038fc9416d1b441aa710bb970eb8428a92008f197ca367ea09df53f6c45f51a` |

Os outros scripts confirmados no mesmo comando são `catalogo-disciplinas.js` (`261b2b425ed8d6f41400e59d4e0545cbeb5b2292f6f4da250a39f4c2fa915ae3`), `planejamento-semanal.js` (`b11788273caf97a35d155be1b60d42dbb7f302b6aa55912f1f4e6942436bbc7b`), `leitor-consolidacao.js` (`e6d030e22c96d9b1dc39430bf13e34a832bef835f1be93fa3f42b6fe39851ba4`) e `estudo-integrado.js` (`82fafd24b164c5d5f4a9fc37ad2bcad90c81d1755bdb9b53ea853f23fd724fc9`). Corpus jurídico segue seis normas, 292 artigos e 1.176 unidades, cinco integrais, sem certificação adicional.

## 5. Fechamento e condição de retomada

**LEG14 = documentação sem patch.** Arquivos de aplicação, CSS, motor, corpus, provas, backup, revisões, planejamento, workflow, caches e fixtures LEG01–13/UX01–07 não foram modificados. Nenhum registro real ou sintético foi persistido em UI. A [PR documental #36](https://github.com/Talksxb/agu-quiz/pull/36) foi aberta inicialmente em rascunho; sua primeira [CI `43764561808`](https://github.com/Talksxb/agu-quiz/actions/runs/43764561808) aprovou `integridade-node` (31 suítes) e `navegador-chromium` (cinco larguras e regressões), com `pages-publicado` corretamente ignorado por ser PR. Após a reconciliação da UX07, consultar a **CI da árvore final** antes do merge. A aprovação automatizada do checkout **não** constitui novo teste assistivo.

A menor ação externa para destravar o teste é **disponibilizar explicitamente um aparelho/perfil assistivo de teste independente ou serviço autorizado**, com sessão isolada, armazenamento inicialmente vazio e procedimento de descarte, identificando sistema/leitor de tela. Não é necessário fornecer backup real, senha ou perfil pessoal. Alternativamente, uma falha nova reproduzível, com captura, passos, viewport e impacto específico no caminho Home ⇄ lista pode justificar diagnóstico delimitado.

Handoff autossuficiente: [`PROMPT_LEG-15.md`](PROMPT_LEG-15.md), **não executado**. Se nada novo estiver disponível, não gastar outra rodada repetindo o Chrome/CDP compartilhado ou reexecutando a mesma CI como se fosse validação humana.
