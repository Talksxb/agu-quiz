# AGU QUIZ | WORK — LEG-07
# “Para meu caderno” no leitor jurídico — primeira versão funcional

**Execute somente LEG-07.** Não reinicie a aplicação nem os inventários, não importe outra norma, não execute LEG-08. Ao fechar, gere `docs/PROMPT_LEG-08.md` completo e autossuficiente; a LEG-08 deverá fazer exclusivamente a recuperação das pendências na revisão programada, **sem ser implementada durante LEG-07**.

## 1. Retomada obrigatória e estado verificável

Aplicação: https://github.com/Talksxb/agu-quiz ; produção: https://talksxb.github.io/agu-quiz/ . Auditoria privada https://github.com/Talksxb/agu-auditoria apenas em leitura, se estritamente necessário; não reproduzir dados privados ou pessoais. Conferir `main`, commits e PRs abertas **antes de agir** e conferir se há implantação concorrente. Ler `docs/LEG-06_ACAO_POPULAR.md`, `docs/LEG-05_LINDB.md`, este prompt, workflow, testes e contratos de persistência. Repetir apenas verificações necessárias, sem reiniciar Sprints 4/20–42.

Estado de base ao iniciar LEG06: `main=18a4f76e430ed8846d131dfe1900ecc3fa1a3cee`; LEG05 PR #9 incorporada em `0756d636adc9ec5f51f36fb69c7413f5479ede5f`; CI main 43620477343 e Pages 43620476466 aprovados em LEG05. LEG06 ocorre na branch `leg/leg06-acao-popular-integral`; **confirmar na abertura da LEG07 a PR, seu merge, o HEAD da main, o CI/deploy e a URL efetivamente disponíveis**, por `docs/LEG-06_ACAO_POPULAR.md` e histórico remoto, sem considerar estes valores históricos como estado atual.

Corpus público em `dados/legislacao-s13.js`: schema `agu-legal-reader-v1`, `catalogContract=agu-legislation-leg01-v1`; depois da LEG06, **6 normas / 292 artigos / 1.176 unidades / 5 integrais** (reconfirmar):

- CF88 parcial, 4 artigos/9 unidades, sem CF/ADCT integral.
- L9784 integral, 80 artigos/222 unidades, versão `L9784@2026-11-13-camara-87cd4730`.
- LC101 integral, 83 artigos/545 unidades, `LC101@2026-11-13-camara-9e178a49`.
- LC73 integral, 73 artigos/220 unidades, `LC73@2026-11-14-camara-148726cf`.
- DL4657/LINDB integral, 30 artigos/89 unidades, `DL4657@2026-11-14-camara-e2aa961b`, sem divisões.
- L4717/Ação Popular integral, **22 artigos/91 unidades, cinco divisões**, `L4717@2026-11-14-camara-d8a1fc60`; fonte oficial da Câmara capturada em `fontes/acao-popular/camara-20261114.html.txt`, SHA-256 `d8a1fc6018aef37449d62119277fcaeab9ea779d084b44c0a9cd620a59268234`. Texto cotejado, vigência não certificada. Todos os artigos novos `topic:null` sem vínculo curricular presumido.

Não alterar corpus, fonte, quantidade de normas nem transcrição nesta sprint. Respeitar IDs estáveis sem versão no caminho da nota; `sourceOrdinal`, `article.id`, `unit.id`, `parentId`, `structurePath`, `topic:null` e `textVersionId` são contratos existentes. `lib/catalogo-legislativo.js` valida a integridade offline. Os manifests/preservações LEG01–06 permanecem imutáveis.

## 2. Produto e objetivo pedagógico

Tawan utiliza **caderno físico** como lugar principal de sínteses, esquemas e elaboração jurídica. O AGU Quiz deve permitir estudar integralmente no celular mesmo sem ele, por aulas, leitura legislativa, conceitos, perguntas socráticas, casos, questões e revisões conforme o cronograma existente. A funcionalidade “**Para meu caderno**” será uma lista **opcional e seletiva de gatilhos** para anotar depois à mão, sem exigir transcrição/digitalização do caderno e sem duplicar todo o texto legal.

Na LEG-07, implementar **exclusivamente no leitor jurídico existente**:

1. Ação contextual “Para meu caderno” para a unidade selecionada.
2. Registro de pendência breve (dúvida, conceito, distinção ou pergunta de recuperação ativa), de preferência escrita pelo aluno, sem resumo extenso automático.
3. ID próprio estável e único; `topic` curricular **somente se provado** pela associação já documentada; permitir `topic:null`. Norma, artigo, dispositivo e origem (`leitor`) devem ser campos independentes. Data de criação consistente.
4. Estados `pendente`, `anotado` e `dispensado`, alterados apenas pelo usuário. Concluir sessão/revisão não marca automaticamente como anotado.
5. Lista de pendências navegável, acessível com filtros por tema (inclusive sem tema documentado) e estado; consulta de conteúdo e abertura da origem `?abrir=lei&norma=L4717` ou qualquer lei associada, com seleção do dispositivo específico.
6. Persistência **somente local**, segura a reload, nova sessão e retorno do leitor. Não modificar as notas legadas nem sobrescrevê-las na inicialização.
7. Exportação e restauração **compatíveis com as nove categorias de backup vigentes**; examinar `backup-local-s20.js` antes de decidir onde persistir. Evitar nova chave não inventariada sem adaptação explícita, teste de formato e compatibilidade com arquivos antigos. A restauração do mecanismo existente insere apenas categorias ausentes; não substituir, combinar ou apagar categorias presentes silenciosamente. Demonstrar roundtrip sem perda nem duplicação.
8. Teclado, Enter/Espaço, foco restaurado, rotulagem/estado acessível, telas 320/360/390/430/1280, contraste e comportamento de toque emulado.

Exemplo de marcação: “Distinguir motivo, motivação e finalidade do ato administrativo, incluindo um caso de desvio de finalidade.” É uma pergunta/gatilho, **não** comentário digital substitutivo do caderno. Registrar referência normativa mesmo sem currículo confirmado, recuperável manualmente, sem gerar agenda ou associação automática falsa.

## 3. Contratos e módulos a reutilizar

`leitor-juridico.js` é o **único leitor**, com API `openLaw(id,restart)`, `article(id)`, `unit(id)`, `chapter(id)`, `boundary(last)`, `tab`, `mobile`, `note`, URL `?abrir=lei&norma=ID`. Usa chave legada `agu_leitor_juridico_s13_v1`; conservar todas as notas/IDs/posição, inclusive artigos sem tópico. Qualquer mudança no leitor deve ser aditiva, sem refatoração transversal, e documentada em fixture de delta de hash nova (não sobrescrever `leg05-leitor-delta.json`). `caderno-contextual.js` já existe e **não é** um segundo caderno a recriar. `estudo-integrado.js`, `planejamento-semanal.js`, `revisao-inteligente.js`, `leitor-consolidacao.js`, S17 e módulos de questões permanecem. Consultar como integrar a ação sem fingir vínculo curricular.

Backup: nove categorias e formatos, limite **12 MB UTF-8** e **500 comentários** no leitor; restauração apenas de categorias ausentes. Não ampliar limites sem prova/teste específico. Preservar sem migração destrutiva os arquivos legados e seus conteúdos. Se a nova lista usar subestrutura dentro de uma categoria existente, testar explicitamente aceitação de campos novos, verificador, restauração e compatibilidade retrospectiva; distinguir IDs das marcações dos IDs dos dispositivos. Não introduzir backend, Supabase, autenticação, sincronização, serviço ou armazenamento remoto.

## 4. Limites negativos impositivos

- **Não** importar leis, alterar questões, gabaritos, aulas, cronograma, datas de revisão ou planejamento.
- **Não** criar outro caderno digital nem pedir que o aluno transcreva suas páginas físicas.
- **Não** implementar agora recuperação automática das marcações na revisão programada; isso será **LEG-08**, não LEG-07.
- **Não** criar agenda paralela, algoritmo de agendamento ou mudança de sessões por salvar pendência.
- **Não** atribuir topic a artigo de L4717 ou LINDB por cartão/resumo sem evidência de relação granular.
- **Não** alterar versão de dispositivo, IDs preexistentes nem dados pessoais; sem navegação no perfil ou backup pessoal. Testar em perfis novos sintéticos.
- **Não** substituir baselines ou apagar testes para acomodar a expansão.

## 5. Regressões, jornada e publicação

Executar todas as suítes Node S19/S20/S25–27/S29–35, WORK01 e LEG01–06 (**19 anteriores**), acrescentando LEG07; preservar cotejos de fontes, manifests, fixtures e backups. Reutilizar os testes Chromium LEG03–06, WORK01 e teclado/foco, sem esquecer a travessia LINDB → L4717 e retorno. Conferir `tests/leg06-browser.cjs`, `tests/leg06-validacao.js`, `tests/leg06-source-check.py`, `tests/fixtures/leg06-{manifesto,preservacao}.json`, `tests/sprint21-pages.cjs`, `.github/workflows/agu-sprint20-ci.yml`.

**Jornada obrigatória em perfil isolado, mobile e desktop:** abrir L4717 → selecionar `L4717:art2:pu:e` → acionar “Para meu caderno” → registrar pergunta breve → sair do leitor → reload/reabrir → encontrar a pendência em sua lista → abrir exatamente a origem normativa → marcar manualmente “anotado” → exportar backup → restaurar em perfil vazio → verificar texto/estado/IDs sem duplicação. Testar também `topic:null`, edição/troca de estado, filtro `pendente|anotado|dispensado`, retorno de foco, Enter/Espaço, limite e dados legados de CF/L9784/LRF/LC73/LINDB e sessão anterior. Axe deve registrar **violações, inconclusivos e aprovações** separadamente e reavaliar itens sobrepostos após rolagem, sem alegar aprovação de inconclusivo. Não alegar Android físico ou TalkBack sem teste real.

CI e Pages: adicionar regressões LEG07 à `.github/workflows/agu-sprint20-ci.yml`, artefatos com globs explícitos, execução em `AGU_TEST_URL` após merge. Atualizar cache **apenas de assets modificados** e expectativas de hashes em `tests/sprint21-pages.cjs`. Confirmar HTTP 200, HTML/oito scripts por SHA-256, navegação e backup na URL publicada, em contexto isolado, após deploy. Se dependência/CI/proteção bloquear integração, deixar PR testada separada de produção e indicar a ação mínima restante.

## 6. Entrega e fechamento

Criar branch e PR próprias; confirmar a `main` atual antes de partir e não fazer force push. Integrar após aprovação real da CI e ausência de conflitos, respeitando proteções. Fechar objetivamente com estado real: branch/base/commits/PR e merge; decisões de armazenamento; testes Node/Chromium/axe e limitações; arquivos; CI/deploy; hashes/URL publicada; pendências. Incluir demonstração da jornada obrigatória. Gerar `docs/PROMPT_LEG-08.md` **completo, autossuficiente e pronto para outro chat**: escopo único de conectar marcações existentes à revisão programada por tema documentado, recuperando pendências sem alterar a programação e sem marcar anotação automaticamente. **Não executar LEG-08 na sessão LEG-07.**
