# AGU Quiz — LEG-08 | “Para meu caderno” durante revisão programada

Data de corte: 15/11/2026. Escopo exclusivo: recuperar marcações já registradas na LEG-07, **somente** durante a revisão ativa de cartão com vencimento preexistente e tema curricular comprovado. Não há importação normativa, nova agenda, caderno paralelo, migração, backend ou mudança nas regras de revisão.

## Decisão de integração

O mecanismo de revisão `AGUReview` contém itens com `code` granular (`ADM-06`, `CON-50` etc.) e `state.cards[id].due`. Uma marcação `forNotebook` do leitor tem `topic` atribuído somente quando o corpus documenta o vínculo do artigo. A recuperação exige **todas** as condições:

1. Existe cartão de revisão atualmente selecionado.
2. O cartão possui um `due` já registrado, no formato de data local, com vencimento até o dia corrente.
3. O registro `agu_leitor_juridico_s13_v1` passa por `AGUBackup20.validateRecord` sem erro.
4. A marcação é `status:'pendente'` e seu `topic` é **exatamente** igual ao `active.code`.

O planejamento semanal é intocado. Ele usa categorias amplas como `ADM/Atos administrativos`, que **não** são IDs granulares como `ADM-06`; não se atribui equivalência por aproximação. Cartões inéditos e ainda não vencidos não puxam marcações. Se não houver marcação correspondente, o painel não aparece, preservando o fluxo original. As marcações `topic:null` continuam consultáveis manualmente na lista geral do leitor, mas nunca são injetadas em tema presumido.

## Jornada e persistência

Na tela de revisão, o painel opcional exibe perguntas curtas e referencia a norma/dispositivo original. As ações explícitas **“Anotei no meu caderno”** e **“Dispensar”** chamam a API já existente `AGULegal.notebookSetStatus`; nenhuma cópia é criada no estado da revisão. O registro conserva `id`, `prompt`, `createdAt`, `lawId`, `articleId`, `unitId` e `topic`, alterando apenas `status` após gravação local bem-sucedida. Falhas de quota não comprometem o estado anterior. Encerrar ou avaliar o cartão **não** marca o caderno físico como anotado.

O comando “Abrir dispositivo legal” usa `AGULegal.notebookOrigin(id)` e permite “Voltar à revisão programada”, preservando o cartão em memória, a eventual resposta ainda não avaliada e o foco. O retorno evita restaurar uma query `?abrir=lei` remanescente de navegação anterior; não cria uma nova chave local. A partir do leitor, um estado `dispensado` ou `anotado` ainda pode ser alterado manualmente para `pendente` pela lista LEG-07.

São preservados byte a byte: `leitor-juridico.js` (SHA-256 `34768817511009ed069c9bab512165092036f6ed90ed3d2b3247f6932a8608bb`), `backup-local-s20.js` (`11993873b63fb9df591eb43ddc8dbec9ba2923d1c8f76b029c91568ec3bace10`), `planejamento-semanal.js` (`b11788273caf97a35d155be1b60d42dbb7f302b6aa55912f1f4e6942436bbc7b`) e corpus normativo (`c038fc9416d1b441aa710bb970eb8428a92008f197ca367ea09df53f6c45f51a`). `tests/fixtures/leg08-preservacao.json` trava as versões antes/depois de `revisao-inteligente.js` e `index.html` sem tocar nos fixtures LEG01–07.

Limites anteriores mantidos: seis normas / 292 artigos / 1.176 unidades / cinco integrais; nove categorias de backup, 12 MB UTF-8, 500 comentários, 300 marcações, 450 caracteres por gatilho; restauração S20 somente de categorias ausentes. Nenhuma certificação jurídica nova.

## Testes e fechamento remoto

As 21 suítes Node incluem a LEG-08. Sua validação específica verifica coincidência exata do tema, calendário realmente vencido, exclusão de `topic:null` e cartões inéditos/futuros, mudança manual, falha de quota, conclusão da revisão sem mudar marcação, ida e retorno de origem, nove categorias e backup não destrutivo.

O teste de navegador LEG-08 executa perfis sintéticos em 320/360/390/430/1280 CSS px: cria marcações pelo leitor, entra no cartão vencido `ADM-06`, abre `L9784:art12:caput`, retorna com foco, marca como anotado/dispensado, deixa outra pendente mesmo após avaliação, faz reload e exporta/restaura backup em contexto vazio. Axe avalia 390/1280 separando violações, inconclusivos e aprovações e rechecando sobreposições após rolagem. Não há teste em Android físico/TalkBack ou perfil pessoal.

**GitHub/CI:** branch `leg/leg08-revisao-para-caderno`, base verificada `5385190d6aace2bbc0c2be0877f60c47c47eb04c`, [PR #15](https://github.com/Talksxb/agu-quiz/pull/15), incorporada à `main` pelo merge `bdb03d4d19847178dbeab73d2faf773d18cbd71d`. Implementação `b798543051564fd14cbcdb6e9cd5ec42439c3838`, seguida de ajuste **apenas no teste** de retorno de foco `1066880722d45403a3f068f0ddbbb5630e94238d` (HEAD da PR). A primeira CI `43675132263` falhou no teste novo ao esperar foco no título do cartão quando ainda restavam pendências; a expectativa foi corrigida para o título do painel, sem alteração do código da aplicação. [CI da PR `43675219323`](https://github.com/Talksxb/agu-quiz/actions/runs/43675219323) aprovada: 21 suítes Node e Chromium em todas as cinco larguras, incluindo regressões anteriores.

**Evidência Chromium/axe:** versão Chromium `159.0.8154.6`, axe-core `4.14.0`. Em 390 px, zero violações e dois elementos inicialmente `incomplete` para contraste devido a sobreposição; ambos foram expostos por rolagem e passaram em nova avaliação (`violations:0`, `incomplete:0`, `passed:['color-contrast']`). Em 1280 px, zero violações e zero inconclusivos. Nas cinco larguras, retorno de foco, origem granular, mudança exclusivamente manual, isolamento `topic:null`, agenda inalterada e restauração de backup foram confirmados por artefato da CI `14146605753`, `artifacts-leg08/jornada.json`, capturas 390/1280 e relatórios axe. Em 320/360/430 não foi realizada auditoria axe dedicada. Não se afirma teste em Android físico ou TalkBack.

**Publicação:** [Pages deploy `43675530272`](https://github.com/Talksxb/agu-quiz/actions/runs/43675530272) aprovado para o merge da PR #15. A página `https://talksxb.github.io/agu-quiz/` respondeu HTTP 200 e `tests/sprint21-pages.cjs` confirmou o HTML e oito scripts por SHA-256: `index.html` `68a789ac6f4544fdf3e49be73292008d8d39865bde7e0c3cb7ee986780b8a215`; `revisao-inteligente.js` `64267e9a5f1167931d23a9cc2a3b42d769ad5b2dec6883ba11194a647690e8cb`. O leitor (`347688...`), backup (`119938...`) e corpus (`c038fc...`) mantiveram os hashes integrais acima. [CI de `main` `43675530557`](https://github.com/Talksxb/agu-quiz/actions/runs/43675530557) concluída com os **três jobs aprovados**: 21 suítes Node, Chromium com regressões e `pages-publicado` (jornada LEG-08 e predecessoras em HTTPS, 320–1280 CSS px); artefato publicado `agu-work01-publicado`, ID `14146102657`.

Próximo handoff: `docs/PROMPT_LEG-09.md`, preparado sem executar LEG-09 nesta sprint.
