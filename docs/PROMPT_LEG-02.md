# AGU QUIZ | WORK — LEG-02
## Lei 9.784/1999 integral no leitor existente

Execute **somente LEG-02**. Este documento encerra a LEG-01 e não autoriza executá-la antecipadamente na mesma sessão. Ao terminar a LEG-02, gere `docs/PROMPT_LEG-03.md`, completo e autossuficiente, mas não execute a LEG-03.

### 1. Missão e repositórios

Incorporar ou validar o texto integral da Lei 9.784/1999, em fonte oficial consolidada, no leitor já existente do AGU Quiz. Não criar outra aplicação, leitor, banco, framework ou serviço. GitHub continua fonte de verdade.

- Aplicação: https://github.com/Talksxb/agu-quiz
- Fonte documental privada, somente leitura: https://github.com/Talksxb/agu-auditoria
- URL real de produção: https://talksxb.github.io/agu-quiz/
- Branch LEG-01: `leg/leg01-inventario`; localizar a PR dessa branch e verificar seu estado real antes de começar. Referências finais de commit/CI/PR estão na descrição dessa PR.
- Base da LEG-01: `32d580b4a37c4d21cde2afde69cecdb6bbe8c88f`, fechamento documental S36. Código anterior S35: `af5d820dd83abdf594284371f053cfd64e133011`. WORK01/PR #1 integrada em `4fa4d2955be60e8acf5e2d134e9d5b241f84f6c3`; preservá-la.

### 2. Retomada obrigatória e estado encontrado

Leia `docs/LEG-01_INVENTARIO.md`, o diff/CI da PR LEG-01 e os arquivos abaixo. Confira main, branches e PRs abertas; não presuma que LEG-01 foi mesclada nem que o Pages publique sua branch. Se ainda estiver aberta, baseie a LEG-02 na versão correta e explicite a dependência entre PRs; não sobrescreva trabalho alheio nem force merge conflitante.

A versão histórica `AGU_QUIZ_04_FEEDBACK_JURIDICO.html` foi recuperada e lida. Seu texto aparado coincide com o baseline público `29a095f:index.html`. Ela só tinha referências/questões/paráfrases da Lei 9.784 e LRF, além de marcador LINDB; não escondia uma biblioteca de leis completas. Não repetir a busca nem importar esse HTML antigo.

Corpus real ao fechar LEG-01: **2 normas, 10 artigos, 24 unidades, 0 normas integrais**. CF: artigos 131/132 isolados e excertos de 37/49. Lei 9.784: artigos 11–15 isolados (12 unidades) e art. 50 parcial (3 unidades). São 7 artigos isolados e 3 excertos no corpus todo. S17 tem 18 registros de versão, portanto não cobre todas as 24 unidades.

### 3. Código e contratos a reutilizar

- `dados/legislacao-s13.js`: mantém `agu-legal-reader-v1`, agora com `catalogContract=agu-legislation-leg01-v1`; dados legislativos e metadados aditivos. A LEG-01 não alterou os 24 textos nem seus IDs/tópicos.
- `lib/catalogo-legislativo.js`: validador offline/CI, **não outro leitor**. API `validate(corpus, previous)` verifica catálogo e compatibilidade; não acessa rede ou armazenamento.
- `tests/fixtures/leg01-identidade-s36.json`: manifesto dos 24 IDs, artigos, vínculos e hashes de texto do baseline anterior. Mudança normativa posterior deve ser explícita e rastreável, nunca mascarada como simples formatação.
- `leitor-juridico.js`: leitor único, caminho estrutural por artigo, indicação de corpus parcial, navegação anterior/próximo e controles acessíveis S29–S35.
- `leitor-consolidacao.js`: busca/filtros originais; novos textos com verificação pendente não aparecem automaticamente como confirmados.
- `estudo-integrado.js`: artigos com `topic:null` continuam legíveis, mas não iniciam sessão curricular inválida. Comentários pessoais por dispositivo continuam disponíveis; Caderno contextual depende de vínculo documentado.
- `dados/versoes-normativas-s17.js`, `caderno-contextual.js`, Revisão, Planejamento e `backup-local-s20.js`: preservar IDs e contratos. Não duplicar anotações ou agendas.
- `tests/leg01-validacao.js` e `tests/leg01-browser.cjs`: testes do contrato/compatibilidade e expansão **sintética**, não legislação nova de produção.

Campos do contrato: norma `id/title/kind/number/year/source/sourceAuthority/checkedOn/sourceVersion/textVersionId/contentCoverage`; `textVerification.status/checkedOn/scope` separado de `auditStatus`; `structure[]` com ID/tipo/pai/rótulo; `article.structurePath`, `topic`, `contentKind`; dispositivos ordenados com `id/label/text/kind/parentId`. IDs lógicos não levam a versão dentro da chave da nota. Novos artigos sem relação curricular comprovada usam `topic:null`, jamais um ID inventado.

Para declarar `contentCoverage=integral`, exigir cotejo textual `compared` com `scope=full_norm`, ausência de excertos e manifesto `completeness` com `expectedArticleIds` na ordem da fonte, `checkedOn`, `sourceDigest=sha256:...` e `annexes=included|not_applicable`. Validação desse manifesto **não substitui conferir a fonte** nem certifica vigência/jurisprudência.

### 4. Escopo fechado e lacunas

Somente Lei 9.784/1999; manter `L9784` e estes IDs:

- `L9784:art11:caput`
- `L9784:art12:caput`, `L9784:art12:pu`
- `L9784:art13:caput`, `:I`, `:II`, `:III`
- `L9784:art14:caput`, `:p1`, `:p2`, `:p3`
- `L9784:art15:caput`
- `L9784:art50:caput`, `:I`, `:p1`

Faltam todos os demais artigos e as partes omitidas do art. 50. Extraia da fonte a sequência real, inclusive dispositivos com letras/sufixos, alterações e eventuais revogações; não presuma a quantidade de artigos a partir do número final. O inciso I do art. 50 legado apresenta capitalização/pontuação editorial: conferir literalidade e versionar qualquer correção, preservando o ID e suas notas. Não converter os resumos da Sprint 4 em transcrição legal.

Completar metadados de capítulos e demais divisões realmente presentes; relacionar cada artigo ao caminho correto. Os capítulos VI e XII já estão modelados na seleção. Manter a ordem textual dos parágrafos, incisos e alíneas. Não retirar dispositivos históricos silenciosamente nem atribuir artigo revogado à redação vigente sem sinalização e fonte.

### 5. Fonte e verificação

Fonte prioritária já aberta na LEG-01: https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html

Reabrir e conferir sua versão atual na LEG-02. Planalto e Senado podem servir de confronto oficial, sobretudo em divergência. Registrar URL final, responsável, data, versão, digest de captura e conjunto esperado de dispositivos. Fazer cotejo de completude **e** literalidade; registrar regras de normalização apenas de apresentação, sem mudar palavras/pontuação silenciosamente. Preservar notas editoriais de modificação como metadados, distinguindo-as do texto legal.

Não publicar dados privados da auditoria, notas pessoais ou tokens. Não elevar `auditStatus` a certificação integral só porque a transcrição da lei estiver completa. Nenhuma nova questão/gabarito ou revalidação jurisprudencial está no escopo.

### 6. Persistência e regressão

Não mudar as nove chaves de armazenamento, seus formatos ou a política de restauração. Não executar migração, sobrescrita, limpeza, fusão de backups ou divisão de arquivos. Atualização de redação mantém ID, muda versão e documenta a diferença. Validar comentários antigos, retomada, sessões anteriores e restauração em perfil sintético novo. Atenção aos limites legados: 500 chaves de comentários no backup do Leitor e 12 MB UTF-8; não ampliar limites sem demonstração de necessidade e teste.

Executar Node S19/S20/S25–27/S29–35, WORK01 e LEG01; adequar apenas expectativas legitimamente alteradas pela expansão, preservando testes de IDs antigos e registro explícito de texto corrigido. Criar testes LEG-02 para manifesto de artigos/unidades, hierarquia, artigos com sufixos, integridade literal, busca, primeiro/último dispositivo, acesso a artigos sem currículo e notas antigas/novas.

Rodar Chromium em 320/360/390/430/1280 px: índice, artigo completo, seleção de inciso, navegação até último dispositivo, pesquisa, comentários, reload, retorno por Meu estudo de hoje, exportação/restauração sintética, teclado/foco S29–S35. Manter axe distinguindo violations, incomplete por sobreposição e passed após rolagem. Não declarar Android físico/TalkBack sem aparelho/teste efetivos. Verificar cache e hashes dos scripts que mudar.

### 7. Entrega utilizável e fechamento

Usar branch própria e PR; evitar conflitos com outras frentes. Critério: conseguir abrir **o texto inteiro incorporado da Lei 9.784**, navegar do primeiro ao último dispositivo e pelas divisões existentes, buscar, anotar e retomar sem perder registros. Não confundir fonte externa com texto incorporado. Tornar a seleção de artigos versus norma integral clara na UI, mantendo o leitor atual.

Informar URL real e distinguir PR testada de versão efetivamente publicada. Reutilizar Pages; não criar hospedagem, banco ou outra plataforma apenas para entregar a lei. Não afirmar publicação sem verificar a URL/artefatos. Se a integração depender de outra PR, registrar a dependência e o menor próximo passo concreto.

Fechar com fontes/versão, cobertura incorporada, diferenças justificadas de textos legados, testes reais, arquivos, branch/commit/PR e limitações. Gerar **`docs/PROMPT_LEG-03.md`** com estado real e escopo único da próxima norma/tarefa; **não executar LEG-03**. Não gastar o fechamento reescrevendo diagnósticos gerais.
