# LEG-12 — acesso transversal a “Para meu caderno” pela Home

Data de execução: 15/11/2026. Escopo único: abrir a lista `forNotebook` preexistente pela Home, com contador validado e retorno de foco. **Não executa LEG-13.**

## Fonte e retomada

- Repositório: `Talksxb/agu-quiz`; publicação: https://talksxb.github.io/agu-quiz/.
- Base revalidada da branch `leg/leg12-home-para-caderno`: `7fe92d1ffc0b3b7cfe398d90d1172feefb778621`, depois da UX-BARALHOS-03. Na verificação inicial, sem PR aberta; CI da `main` `43737287138` e Pages `43737286770` estavam aprovadas.
- Estado histórico anterior: LEG07–11 integradas, UX01–03 integradas. Os hashes históricos não são invariantes: `index.html` da base `9e692d212b2536c80962d05bedee3cca306720928bbb486c31a6970058eb99a2`, `meu-estudo.js` `a6c8d9d8c706bee481517e37c18b141985f3737422270ca919e78b3d9b035fc0`.
- PR/merge, CI e deploy desta sprint: **a confirmar após conclusão dos jobs remotos**; nunca confundir código na branch com código publicado.

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
- Regressões Node: **28/28 suites aprovadas localmente** (27 anteriores incluindo UX03 e LEG12). As asserções de hash antigas foram encadeadas à fixture nova `tests/fixtures/leg12-deltas.json`, sem modificar fixtures históricas.
- Nova jornada `tests/leg12-browser.cjs`: contextos sintéticos nas larguras 320, 360, 390, 430 e 1280, Enter/Espaço/toque, quatro origens, contador e retorno, estado de sessão, reload, backup S20, overflow e axe 390/1280. Guarda capturas e JSON com `violations`, `incomplete` e `passed`, mais reavaliação por rolagem. A execução local Chromium foi bloqueada por `socket() Operation not permitted` do ambiente e **não constitui aprovação**; CI remota deve ser consultada.
- `.github/workflows/agu-sprint20-ci.yml` inclui a nova suíte Node e jornada Chromium, globs específicos `artifacts-leg12` e execução com `AGU_TEST_URL` após merge; `tests/sprint21-pages.cjs` verifica HTML, nove scripts e CSS por SHA exato.

## Delta de arquivos de produto

`meu-estudo.js` e `index.html` são os únicos arquivos de execução modificados. Não há mudança em leitor, backup, revisão, planejamento, estudo, questões, fontes ou catálogo. Hashes e baseline rastreados em `tests/fixtures/leg12-deltas.json`; confirmação de CI/Pages e eventuais limites devem ser registrados após integração.

## Limites honestos

- Não há teste Android físico/TalkBack; viewport e toque são emulados. Um retorno à Home não equivale a retomar automaticamente a sessão de onde a pessoa veio. A Home e os motores existentes conservam os próprios controles de retomada segura.
- A auditoria axe de LEG11 possuía itens `incomplete` persistentes (14 em 390 inicialmente, 12 após rolagem; 12 em 1280, todos persistentes). O resultado LEG12 deve ser reportado por regra e quantidade, sem convertê-los em aprovação presumida.
- A lista mantém-se no único leitor jurídico e o caderno físico segue como lugar principal das sínteses.
