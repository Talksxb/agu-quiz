# LEG-12 — acesso transversal a “Para meu caderno” pela Home

Data de execução: 15/11/2026. Escopo único: abrir a lista `forNotebook` preexistente pela Home, com contador validado e retorno de foco. **Não executa LEG-13.**

## Fonte e retomada

- Repositório: `Talksxb/agu-quiz`; publicação: https://talksxb.github.io/agu-quiz/.
- Base revalidada da branch `leg/leg12-home-para-caderno`: `7fe92d1ffc0b3b7cfe398d90d1172feefb778621`, depois da UX-BARALHOS-03. Na verificação inicial, sem PR aberta; CI da `main` `43737287138` e Pages `43737286770` estavam aprovadas.
- **Concorrência reconciliada:** durante a CI da [PR #27](https://github.com/Talksxb/agu-quiz/pull/27), a `main` avançou para `aa4fff6791bbffa57c649be119769bc4c0a9912e` (merge da UX-BARALHOS-04, PR #26). A LEG-12 incorporou essa `main` por merge não destrutivo na branch, preservando o novo rótulo de histórico do motor, teste UX04, cache de `revisao-inteligente.js?v=20261115-ux04` e workflow. O delta LEG12 passou a encadear **UX03→UX04→LEG12** sem alterar as fixtures anteriores.
- Estado histórico anterior: LEG07–11 integradas, UX01–04 integradas. Os hashes históricos não são invariantes: `index.html` antes da UX04 `9e692d212b2536c80962d05bedee3cca306720928bbb486c31a6970058eb99a2`, após UX04 `fd0b6e3ac1b564d5e5cfa04a445f3c16660181f3d6eff6377730d46af84a034d`, após a conciliação LEG12 `b15be4310bb20ab842aab91804c107ce97dd8819d18e7a84e0d00a630bb974a1`; `meu-estudo.js` antes `a6c8d9d8c706bee481517e37c18b141985f3737422270ca919e78b3d9b035fc0`, depois `e88aa5ee7cb77a5f4e193f690830c803604dcda1b3d2e6fe53e0d8285bed43de`.
- **Implementação e integração confirmadas:** branch `leg/leg12-home-para-caderno`, commits remotos `7137850c4c17bdf071f567acd06dee1698098450` (atalho, testes e documentação), `f9d4cab6d7c05eec945584232c30ad619400c6dc` (globs explícitos), `967a08fe6ec8c20c82e03ef7dde02c67e9871bdf` (merge não destrutivo da UX04). [PR #27](https://github.com/Talksxb/agu-quiz/pull/27), retirada de rascunho após CI verde e incorporada à `main` em `cb764e3071dc7ac0cc00d60999f9a53cfe77cbcb` sem conflitos nem force push.

## Decisão e fluxo

1. `meu-estudo.js` acrescenta o botão `Para meu caderno` aos atalhos já existentes, sem alterar `AGUHome.next` ou `continueStudy`.
2. O contador lê **somente** `localStorage.getItem('agu_leitor_juridico_s13_v1')`, valida a categoria inteira com `AGUBackup20.validateRecord` e conta exatamente os registros `status:'pendente'`, inclusive `topic:null`. Dados ausentes contam zero. Dados inválidos, JSON incorreto ou leitura bloqueada produzem aviso neutro, sem escrita nem tentativa de reparação silenciosa. Na demonstração, o contador não revela dados reais e o atalho fica indisponível.
3. Em estado válido, `AGUHome.openNotebook` navega para a tela **legal já existente** e usa `AGULegal.tab('para_caderno')`. A operação reaproveita o painel, filtros, edição, estados e origem de LEG07–11. A API legada pode persistir a posição da aba do leitor; nenhum registro ou nova categoria é criado pela Home. Em categoria inválida, não invoca a aba que gravaria por cima dos dados: abre tela legal com aviso de preservação e botão de volta. Em falha de quota, mostra aviso, preservando os bytes persistidos.
4. `AGUHome.notebookReturnPanel` acrescenta apenas um controle transitório acima do leitor e `returnFromNotebook` volta à Home com foco no mesmo botão. O contexto fica em memória, sem chave nova; reload não inventa histórico. A ação não retoma sessão ou revisão indisponível.
5. `index.html` injeta esse pequeno painel na rota `legal`, mantendo também o retorno de LEG08; atualiza apenas a versão de cache do asset `meu-estudo.js`.

## Contratos preservados

- Lista única `forNotebook` da categoria já existente `agu_leitor_juridico_s13_v1`; quatro origens admitidas: `leitor`, `estudo_integrado`, `questao_verificada`, `flashcard_existente`.
- IDs `pc-*`, `createdAt`, `topic` exatamente comprovado ou `null`, textos e estados inalterados pela Home. Somente ação explícita modifica `pendente|anotado|dispensado`.
- Nove categorias de backup; restauração apenas de categorias ausentes; até 12 MB UTF-8, 500 comentários, 300 marcações e 450 caracteres. Backups sem `forNotebook` continuam aceitos.
- Revisão inteligente continua exigindo vencimento já registrado (`due<=hoje`) e igualdade estrita `mark.topic===active.code`; nenhuma alteração de agenda, fase, prioridade ou resposta.
- Corpus original intocado: 6 normas, 292 artigos, 1.176 unidades, 5 integrais; L4717 e DL4657 não receberam associação curricular presumida.

## Evidências e testes

- Nova suíte `tests/leg12-validacao.js`: dez verificações de contador, navegação, foco, quatro origens, `topic:null`, mudança exclusivamente manual, ausência/invalidade/quota/SecurityError, simulação, reload, backup idempotente, 300/301, 450/451, 500/501, 12 MB e hashes encadeados.
- Regressões Node: **28/28 suites aprovadas localmente antes da UX04** (27 anteriores incluindo UX03 e LEG12). Após a reconciliação da UX04, **29/29 suítes aprovadas localmente**. As asserções de hash antigas foram encadeadas à fixture nova `tests/fixtures/leg12-deltas.json`, sem modificar fixtures históricas.
- Nova jornada `tests/leg12-browser.cjs`: contextos sintéticos nas larguras 320, 360, 390, 430 e 1280, Enter/Espaço/toque, quatro origens, contador e retorno, estado de sessão, reload, backup S20, overflow e axe 390/1280. Guarda capturas e JSON com `violations`, `incomplete` e `passed`, mais reavaliação por rolagem. A execução local Chromium foi bloqueada por `socket() Operation not permitted` do ambiente e **não constitui aprovação**; CI remota deve ser consultada.
- `.github/workflows/agu-sprint20-ci.yml` inclui a nova suíte Node e jornada Chromium, globs específicos `artifacts-leg12` e execução com `AGU_TEST_URL` após merge; `tests/sprint21-pages.cjs` verifica HTML, nove scripts e CSS por SHA exato.

**CI de código efetiva:** [run 43742998206](https://github.com/Talksxb/agu-quiz/actions/runs/43742998206), **ambos os jobs aprovados**, 29 suítes Node e toda a matriz Chromium S20–35, LEG01–12, WORK01 e UX01–04. A jornada LEG12 rodou em Chrome/Chromium `159.0.8154.6` nas cinco larguras. O log `LEG12_BROWSER_OK` confirma Home → mesma lista → mudança manual → retorno de foco → reload → backup, sem agenda alterada. Artefato [14173745214](https://github.com/Talksxb/agu-quiz/actions/runs/43742998206) `agu-s20-chromium-viewports`, com `artifacts-leg12/jornada.json`, `axe-{390,1280}.json` e cinco capturas `home-caderno-*.png`. As imagens 320, 390 e 1280 foram efetivamente abertas e inspecionadas: botão visível, contador legível, sem sobreposição/overflow aparente na Home. Não se inferiu inspeção de Android físico.

**Axe LEG12 da CI:** na Home 390 e 1280, `violations:0`, `incomplete:0`; na lista 390, `violations:0`, **1 nó `incomplete` inicial**, 24 regras `passed`; na lista 1280, `violations:0`, **5 nós `incomplete` iniciais**, 26 regras `passed`. Todos os nós inconclusivos da lista foram revelados e reavaliados por rolagem, **zero inconclusivos persistentes** nas regras reexecutadas. Isso não apaga os achados históricos da LEG11 nem os inconclusivos próprios da UX04 (um em 390 e um em 1280, relatados no teste da UX04).

**Publicação do código LEG12:** [Pages 43743413423](https://github.com/Talksxb/agu-quiz/actions/runs/43743413423) **aprovado** para o merge `cb764e3`. Em 15/11/2026, `https://talksxb.github.io/agu-quiz/` respondeu **HTTP 200**; `node tests/sprint21-pages.cjs` cotejou byte a byte HTML, **nove scripts**, CSS e módulo de questões com o checkout incorporado. SHA-256 publicado: `index.html` `b15be4310bb20ab842aab91804c107ce97dd8819d18e7a84e0d00a630bb974a1`; `meu-estudo.js` `e88aa5ee7cb77a5f4e193f690830c803604dcda1b3d2e6fe53e0d8285bed43de`; `revisao-inteligente.js` UX04 `fe6b8dcacc7363fd661055e737c73c443f1428d2b97e807faeb37e447650252c`; leitor `1f119fb84c092b00a994943a1f0f09d85dcc6efabb6b85df536a3b3189a48c04`; backup `8f1884ab63c2d6e4bb3bca753d01607a29abedf07e60d61ecb6f1c464a07f4f9`; corpus `c038fc9416d1b441aa710bb970eb8428a92008f197ca367ea09df53f6c45f51a`. Demais scripts e CSS tiveram hash igualmente confirmado pelo teste, sem modificação LEG12.

**CI principal pós-merge:** [run 43743414168](https://github.com/Talksxb/agu-quiz/actions/runs/43743414168) **aprovada nos três jobs** (`integridade-node`, `navegador-chromium`, `pages-publicado`). O job publicado confirmou a jornada LEG12 **diretamente em `https://talksxb.github.io/agu-quiz/`**, nas cinco larguras sintéticas, com `LEG12_BROWSER_OK`, retorno de foco, backup idempotente e axe: Home zero violações/inconclusivos; lista zero violações, 1/5 nós iniciais inconclusivos reavaliados após rolagem sem inconclusivos persistentes em 390/1280. A CI publicou artefatos com globs específicos, sem substituir os de UX04/LEG01–11.

## Delta de arquivos de produto

`meu-estudo.js` e `index.html` são os únicos arquivos de execução **modificados especificamente pela LEG12**. A reconciliação incorporou, sem reescrever, o `revisao-inteligente.js` da UX04 já presente na `main`. Não há mudança LEG12 em leitor, backup, revisão, planejamento, estudo, questões, fontes ou catálogo. Hashes e baseline rastreados em `tests/fixtures/leg12-deltas.json`; a CI/Pages e suas limitações constam acima.

## Limites honestos

- Não há teste Android físico/TalkBack; viewport e toque são emulados. Um retorno à Home não equivale a retomar automaticamente a sessão de onde a pessoa veio. A Home e os motores existentes conservam os próprios controles de retomada segura.
- A auditoria axe de LEG11 possuía itens `incomplete` persistentes (14 em 390 inicialmente, 12 após rolagem; 12 em 1280, todos persistentes). O resultado LEG12 deve ser reportado por regra e quantidade, sem convertê-los em aprovação presumida.
- A lista mantém-se no único leitor jurídico e o caderno físico segue como lugar principal das sínteses.
