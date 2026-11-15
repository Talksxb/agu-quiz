# AGU QUIZ | WORK — LEG-13
## Portão de acessibilidade e confiabilidade do acesso transversal “Para meu caderno”

**Este arquivo é exclusivamente o handoff da LEG-12. NÃO executar LEG-13 durante a LEG-12.** Em uma nova solicitação expressa, executar somente LEG-13. Ao encerrar, gerar `docs/PROMPT_LEG-14.md` autossuficiente sem implementar LEG-14.

### 1. Missão única, condicionada a evidência

Verificar e, apenas diante de defeito reproduzido, corrigir **acessibilidade, comportamento de retorno e tolerância a armazenamento indisponível** do atalho da Home para a lista única “Para meu caderno”. Não criar uma nova origem, lista, painel de notas, agenda ou funcionalidade curricular. Não expandir o escopo para flashcards, questões ou aulas. Se as verificações não revelarem falha nova, fechar LEG-13 documentalmente, sem patch artificial.

O usuário estuda pelo celular sem o caderno físico, mas só registra gatilhos curtos por decisão própria. O caderno físico é o local principal das sínteses; o AGU Quiz apenas recupera o que foi marcado, no cronograma já existente. Concluir estudo ou revisão não significa concluir anotação manuscrita.

### 2. Fonte da verdade e retomada obrigatória

- Repositório público: https://github.com/Talksxb/agu-quiz
- GitHub Pages: https://talksxb.github.io/agu-quiz/
- Auditoria privada `Talksxb/agu-auditoria`: estritamente somente leitura se indispensável para vínculo pontual; nunca copiar documentos, matriz nem dados pessoais.
- A LEG-12 partiu da `main` `7fe92d1ffc0b3b7cfe398d90d1172feefb778621` após UX-BARALHOS-03 e criou `leg/leg12-home-para-caderno`, com a implementação no atalho de Home, [PR #27](https://github.com/Talksxb/agu-quiz/pull/27). Durante a CI, a UX-BARALHOS-04 foi mesclada à `main` em `aa4fff6791bbffa57c649be119769bc4c0a9912e` (PR #26), exigindo reconciliação explícita e preservação do cache/fixture UX04. A PR #27 foi integrada pelo merge `cb764e3071dc7ac0cc00d60999f9a53cfe77cbcb` após [CI de PR 43742998206](https://github.com/Talksxb/agu-quiz/actions/runs/43742998206) verde. [Pages 43743413423](https://github.com/Talksxb/agu-quiz/actions/runs/43743413423) aprovado. **A branch, CI pós-merge, hashes finais e limitações reais estão em `docs/LEG-12_HOME_CADERNO.md`, a reconfirmar no histórico remoto**, pois são referências históricas.
- Confirmar novamente HEAD `main`, PRs abertas, branches concorrentes, workflows em andamento, deployments Pages e SHA-256 publicado antes de qualquer edição. Não sobrescrever trabalho simultâneo, especialmente em `index.html`, `meu-estudo.js`, `revisao-inteligente.js` ou CSS dos baralhos. Não reiniciar Sprints 4/20–44, LEG01–12, UX01–03 ou auditorias jurídicas.
- Ler `docs/LEG-12_HOME_CADERNO.md`, LEG07–11, checkpoints UX01/02/03/**04**, este prompt, `.github/workflows/agu-sprint20-ci.yml`, `tests/leg12-validacao.js`, `tests/leg12-browser.cjs`, `tests/fixtures/leg12-deltas.json`, `tests/sprint21-pages.cjs` e outros testes pertinentes.

### 3. Contrato funcional que não pode regredir

1. A única lista opcional `forNotebook` permanece em `agu_leitor_juridico_s13_v1`, uma das **nove categorias** S20. O leitor `leitor-juridico.js` mantém as APIs `AGULegal.peek`, `tab('para_caderno')`, filtros, edição, `notebookSetStatus`, `notebookOrigin`, `notebookCanOpenOrigin`. Quatro origens previamente verificadas: `leitor` (dispositivo real), `estudo_integrado` (sessão/dispositivo existentes), `questao_verificada` (um dos quatro itens históricos elegíveis) e `flashcard_existente` (índice fechado de 36 cartões). Não reinterpretar os campos, IDs `pc-*`, notas ou estados.
2. `topic` deve ser **exatamente** o código granular comprovado na origem, ou `null`. No índice de flashcards, só ADM-06 e CON-50 possuem associação comprovada ao corpus; outros códigos exibidos não autorizam atribuição. L4717 e DL4657/LINDB seguem sem vínculo presumido. `topic:null` continua recuperável na lista geral, não injetado em revisão temática.
3. LEG08 mostra somente marcas `pendente`, `topic===active.code`, em cartão com vencimento previamente salvo `due<=hoje`; salvar, abrir, responder e encerrar não alteram pendências nem agenda automaticamente.
4. LEG12 adicionou em `meu-estudo.js` um botão discreto `Para meu caderno`, com contador somente leitura da categoria validada `AGUBackup20.validateRecord`; sem marcações mostra zero, sem acesso válido usa aviso neutro. Em simulação não mostra dados locais. Abre a mesma aba do leitor pela rota `legal`, com painel transitório de retorno em `index.html` e foco de volta ao botão da Home. Se o registro está inválido, evita abrir a aba que faria escrita por cima do conteúdo e exibe aviso de preservação. Falha de quota não pode sobrescrever bytes anteriores.
5. Limites: até 300 marcações, 450 caracteres por pergunta, 500 comentários legados, 12 MB UTF-8 por arquivo de backup, nove categorias e importação **somente de categorias ausentes**. Backups antigos sem `forNotebook` continuam válidos. Não criar chave nova, migrar, copiar ou mesclar dados pessoais.
6. Corpus público: schema `agu-legal-reader-v1`, contrato `agu-legislation-leg01-v1`, 6 normas / 292 artigos / 1.176 unidades / 5 integrais; CF88 parcial (4/9), L9784 (80/222), LC101 (83/545), LC73 (73/220), DL4657 (30/89), L4717 (22/91, versão L4717@2026-11-14-camara-d8a1fc60). Não importar fonte, alterar transcrição, texto, IDs, notas editoriais ou afirmar vigência adicional.

### 4. Escopo técnico exato da LEG-13

- Reexaminar os achados `axe-core` nas capturas de LEG11 e LEG12, distinguindo `violations`, `incomplete` e `passed`. A LEG11 relatou 14 nós inicialmente inconclusivos em 390 (12 permaneceram após rolagem) e 12 em 1280 (12 permaneceram). São históricos, não autorização para declarar conformidade. Verificar se cada item se relaciona efetivamente com o atalho Home/lista; não redesenhar biblioteca fora do escopo.
- Testar navegação teclado Enter/Espaço, foco no título da lista, filtros, botões de estado e botão “Voltar ao meu estudo de hoje”. Verificar que foco não fica encoberto por cabeçalho fixo/overlays, especialmente 320/360/390/430 CSS px; verificar contraste real e zoom. Corrigir apenas defeitos reproduzidos do acesso e retorno.
- Confirmar armazenamento ausente, JSON malformado, categoria inválida, SecurityError na leitura, QuotaExceededError na escrita, 300/301, 450/451, 500/501, backup >12 MB, IDs e topic adulterados. Em falha, preservar bytes, apresentar caminho neutro e não gerar nova categoria por reparo automático.
- Verificar se o contador da Home atualiza após alteração **manual** de `pendente` para `anotado` ou `dispensado`, sem atrasar nem criar revisão e sem expor conteúdo no modo demo. O contador nunca lê tema amplo como vínculo granular.
- Reproduzir retorno da lista para a Home enquanto há Estudo Integrado ou baralho em andamento, revisão já vencida ou questão oficial consultada; garantir que nenhum desses motores tenha resposta, data, fase, estágio, sessão ou foco alterado indevidamente. Não criar retorno fictício a origem retirada ou concluída.
- Se a API atual não permitir um retorno seguro em algum contexto, registrar limite concreto e corrigir de forma aditiva mínima **somente se houver prova de segurança**. Não implementar navegação transversal nova além do acesso Home ↔ lista.

### 5. Proibições

Não criar, alterar ou importar norma, flashcard, questão, gabarito, fundamento, aula, caso, texto oficial, vínculo curricular, agenda, tarefa, data de revisão, ponderação, estágio, calendário, prioridade ou algoritmo. Não construir segundo caderno, backend, API, conta, autenticação, Supabase, armazenamento remoto, sincronização, notificações ou coleta de perfil. Não acessar histórico, backup ou dados reais de Tawan; somente perfis novos sintéticos, sem dados pessoais. Não forçar push, suprimir testes, substituir fixtures LEG01–12/UX01–03 ou contornar proteções. Não executar LEG-14.

### 6. Aceite e regressões

1. Em Node e Chromium com perfis novos nas larguras 320/360/390/430/1280 CSS px, provar Home vazia, com marcas mistas das quatro origens, estado inválido e leitura bloqueada; apenas pendentes contam, `topic:null` conta sem ser mapeado.
2. Abrir por toque emulado, Enter e Espaço; executar filtros `pendente|anotado|dispensado|todos`, temas comprovados e `sem_tema`; editar, alterar manualmente estados e voltar com foco restaurado. Reload/home não duplica marcações; links de origem só abrem item existente.
3. Preservar históricos sintéticos de revisão, Estudo Integrado, questões e baralho em andamento, notas CF/L9784/LC101/LC73/DL4657/L4717, planejamento e sessão. Repetir importação do backup com categoria presente; nenhum overwrite nem merge.
4. Axe 390/1280 com contagens separadas de `violations`, `incomplete`, `passed`. Em sobreposição, rolar até revelar o elemento e reexecutar a regra específica. Se seguir `incomplete`, documentar como pendência, **não aprovado**. Salvar JSON e capturas para inspeção visual; sem alegar Android físico/TalkBack.
5. Rodar todas as suítes antigas Node S19/S20/S25–27/S29–35, WORK01, LEG01–12, UX01–04 e jornadas Chromium LEG03–12/WORK01/UX01–04, sem enfraquecê-las. Preservar cotejos normativos, backups e fixtures. Mudança em código exige novo `tests/fixtures/leg13-deltas.json` que encadeie os hashes anteriores, sem regravar baselines.
6. No GitHub Actions, manter globs explícitos dos artefatos LEG13 e execução com `AGU_TEST_URL` somente após merge. Verificar Pages HTTP 200, HTML, os **nove scripts** e CSS dos baralhos, além do módulo de questões, por SHA-256 contra o checkout efetivo. A produção só está aprovada quando CI principal, deploy e jornada HTTPS realmente passam.

### 7. GitHub e encerramento

Após reconfirmar base e concorrência, criar branch/PR próprias inicialmente em rascunho. Integrar apenas com CI verde, sem conflito e respeitando proteções; se houver bloqueio, deixar PR testada e distinguir de produção, informando ação mínima restante. Gerar `docs/LEG-13_*.md` com base, branch, commits, PR/merge, decisões, resultados Node/Chromium/axe e inconclusivos, hashes/URLs, arquivos e pendências. Gerar `docs/PROMPT_LEG-14.md` completo e autossuficiente, **sem executar LEG-14**.

**Regra permanente:** o aplicativo escolhe momento e tema pelo cronograma vigente; “Para meu caderno” é apenas a única lista de gatilhos pessoais para escrita física posterior, sem anotação automática nem novo agendamento.
