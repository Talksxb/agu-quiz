# AGU Quiz | Biblioteca de legislação — etapa 02

## Decisão de produto

**Escopo autorizado:** melhorar a experiência de escolha de normas e incorporar etiquetas por matéria. A etapa 02 do handoff também previa cotejo documental oficial do CC/CPC. **Nenhuma nova lei foi importada** e nenhuma alegação de integralidade ou vigência dos dois espelhos foi promovida.

Base remota verificada na abertura: `Talksxb/agu-quiz/main` em `164ad3446acd2cd23f53e41c96777312ae15aec0` (merge da PR #44). Nenhuma PR aberta apareceu na pesquisa inicial do GitHub. Branch de trabalho: `feature/biblioteca-leis-02-materias`. A integração depende de CI e Pages verdes; preencher SHA e PR de fechamento após a publicação, sem presumir merge.

### O que melhora a leitura

- O seletor **Escolher norma** continua recolhido inicialmente; não nasce um painel paralelo e só uma norma por vez aparece no índice e no texto.
- Dentro do seletor há **etiquetas-filtro por matéria** com quantidade de diplomas e estados `aria-pressed`. O aluno filtra a lista de normas antes de escolher. O filtro **não abre outra norma** nem grava nada; a seleção explícita preserva o mecanismo do leitor.
- A matéria da norma aberta aparece em chips legíveis acima do artigo. O índice deixa mais claro que o campo **Filtrar artigos deste trecho** pesquisa **somente os artigos exibidos**, no máximo 49 em códigos extensos; o salto pelo número continua sendo o caminho para um artigo fora desse trecho.
- Durante a CI Chromium da PR, foi reproduzido **overflow de 131 px** em 320 CSS px com fonte 200%: o tamanho mínimo intrínseco do botão móvel **Relacionados** ultrapassava o espaço disponível. A regra CSS do próprio Leitor passa a permitir quebra de linha e largura mínima zero, sem alterar a navegação de motores externos. Validar a correção nas cinco larguras antes de integrar.
- A regressão Sprint 23 detectou `aria-prohibited-attr` inconclusivo porque o novo conjunto visual de tags tinha `aria-label` sem papel explícito. O grupo recebeu `role="group"`, compatível com seu nome acessível. A regra `color-contrast` pode continuar inconclusiva quando o elemento está oculto por rolagem; não a contabilizar como aprovação.
- Todas as etiquetas são **metadados editoriais de interface, não códigos do edital nem vínculos de `article.topic`**. Não alteram questões, revisão, `forNotebook`, estudo integrado, cronograma ou backup.

| Etiqueta editorial | Diplomas na interface | Quantidade |
| --- | --- | ---: |
| Direito Constitucional | CF/1988; Lei da Ação Popular | 2 |
| Direito Administrativo | Lei 9.784; LC 73/AGU; Lei da Ação Popular | 3 |
| Direito Financeiro | LC 101/LRF | 1 |
| Direito Civil | Código Civil; LINDB | 2 |
| Direito Processual Civil | CPC | 1 |
| Transversal | LINDB | 1 |

Um diploma pode aparecer em mais de uma matéria; por isso as contagens **não devem ser somadas**. A classificação por diploma tem finalidade de localização, não é certificação curricular por dispositivo.

## Cotejo oficial: resultado limitado

Fonte primária consultada em 16/11/2026:

- Código Civil: `https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm`. A consulta direta foi interrompida por desafio de verificação humana/anti-automação; não se tentou contorná-lo. A consulta por ferramenta de busca retornou excertos, insuficientes para comparação de cada artigo e desdobramento.
- CPC: `https://planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105compilada.htm`. Foi possível consultar pontualmente o **art. 1º** e o **art. 489**, em conteúdo aparentemente correspondente ao espelho nos trechos lidos. O cabeçalho da publicação oficial aponta para as Leis 15.479/2026 e 15.484/2026; o snapshot LawCodex de 12/10/2026 **não substitui exame do conteúdo e da produção de efeitos desses atos**. Não se extraiu o texto oficial completo com bytes e metadados para cotejo exaustivo.

**Resultado jurídico: cotejo integral NÃO realizado para CC nem CPC.** Continuam `contentCoverage:'partial'`, `textVerification.status:'pending'`, `contentImport:'mirror_unverified'` e `topic:null` em todos os artigos desses códigos. Sem comparação completa, não declarar vigência ou texto oficialmente validado; não reescrever o bundle por inferência de resultados de busca.

As seis normas anteriores (`dados/legislacao-s13.js`) e o bundle CC/CPC (`dados/codigos-cc-cpc.js`) são idênticos aos publicados na etapa 01. O conjunto continua com oito normas, 3.448 artigos e 4.332 unidades; cinco normas mantêm o status histórico de cotejo integral. O índice fechado de fontes não é declarado exaustivo do edital.

## Rastreabilidade e validação

- Novo teste Node `tests/biblioteca-leis-02-validacao.js`: filtros e chips, contagem, um diploma por vez, preservação do artigo e de `topic`, nenhuma escrita ao filtrar, hashes do corpus.
- Novo teste Chromium `tests/biblioteca-leis-02-browser.cjs`: contextos sintéticos isolados em 320/360/390/430/1280 px, teclado, toque emulado, foco e overflow, axe em 390/1280 com contagens separadas `violations`/`incomplete`/`passed`, capturas e relatório JSON.
- Regressões: **34 suítes `tests/*-validacao.js` passaram localmente**. Chromium local não iniciou por `socket() failed: Operation not permitted` no ambiente; a tentativa de exibir prévia pelo navegador em nuvem não alcançou a porta local (`ERR_CONNECTION_REFUSED`). Isso **não conta** como aprovação de Chromium, axe ou dispositivo físico.
- O workflow ganhou tarefas e globs de artefatos **específicos** da etapa 02, sem substituir os diretórios de outras sprints. A versão de cache do leitor passou a `20261116-bib02`, conferida por `tests/sprint21-pages.cjs` após publicação. Os baselines LEG/UX não foram regravados; a nova fixture `tests/fixtures/biblioteca-leis-02-deltas.json` encadeia os SHA-256 da etapa 01.

| Arquivo | SHA-256 anterior | SHA-256 novo |
| --- | --- | --- |
| `index.html` | `6ec95383253e2ce540e154230236de0b43ed43a39c20a644f223eb3ae9d45a0a` | `89f2cd32d778f3ffbf3922b3b194dda5f6cffcab775b85507b44a901416ba8b9` |
| `leitor-juridico.js` | `d306a64da9782f60269e0a03a8231b76e7add58adbcba817f6b9f8035b5e1c19` | `a935237c9d857890dd86a2c00d8b86c1265c5574cd2e64cb82157dc1575fd930` |

Quando a CI estiver verde e o merge for permitido, conferir Pages e SHA-256 via HTTPS de HTML, 11 scripts, CSS dos baralhos e módulo de questões. A aprovação de PR não é prova de produção.

## Arquivos e limitações

Produto: `leitor-juridico.js`, `index.html`. Testes: novo Node/Chromium, fixture, encadeamento de hashes, atualização de expectativa de cache em `tests/work01-validacao.js` e `tests/sprint21-pages.cjs`. Workflow: `.github/workflows/agu-sprint20-ci.yml`. Documentos: este relatório e o prompt da etapa 03.

Não foram alterados textos legais, fontes, IDs, comentários, marcas para o caderno físico, dados pessoais, revisão, perguntas, flashcards ou inventários jurídicos. Teste de Android real, TalkBack/VoiceOver e cotejo oficial integral seguem **não realizados**.
