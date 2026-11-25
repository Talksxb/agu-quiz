# AUD-UX-001 — Inventário do acervo

Data: 25/11/2026, America/Sao_Paulo. Escopo: recuperação e inventário; nenhum livro criado, substituído, importado ou republicado. O capítulo de Constitucional em outro chat não foi aberto nem alterado.

## Resultado verificável e método

Localizados os **oito identificadores LIVRO-AMB-001 a 008**, mais a produção antiga de AMB-03 que compartilha o ID LIVRO-AMB-001. São **nove versões editoriais distintas**, não nove IDs curriculares certificados. Recuperados **61 arquivos avulsos (6.187.792 bytes), nove ZIPs e 93 membros internos**. Todos os ZIPs tiveram CRC e bytes de todos os membros lidos; todos os JSONs foram parseados. Os oito PDFs atuais foram abertos e tiveram texto extraído de todas as páginas. Isso não equivale a revisão jurídica nova nem a inspeção visual integral dos PDFs.

Documentos do Projeto consultados localmente: Base Mestra v5.2 FINAL; Padrão de Leitura Completa v1.1 FINAL; Caderno e Handoff v2.1 FINAL; Leia-me Primeiro v2 FINAL; GOV-001 de questões oficiais v1.0. Os anexos do Projeto desta execução não continham os manuscritos AMB; eles foram recuperados nas fontes persistentes. A busca por título `LIVRO-AMB` retornou 61 registros, sem cursor adicional, e a pesquisa complementar por Ambiental não trouxe novo manuscrito.

Leitura editorial nesta sprint: identificação, metadados, estrutura, seções, arquivos de revisão/handoff, formatos e diferenças de conteúdo entre derivados. Não foi refeito o exame jurídico de cada parágrafo; “pontual declarada” abaixo é o estado registrado na edição, não certificação emitida nesta auditoria de UX. Não foi localizado aceite novo, específico e rastreável por hash para os oito manuscritos atuais.

## Estado dos repositórios e da publicação

- Quiz: `Talksxb/agu-quiz/main`, **e5436bb071afe0967d29665c0ad042beb084ee13**, consultada em 25/11. PR #104 integrada. CI da base: run **45635744167**, sucesso. Foram examinadas **99 referências remotas** disponíveis no clone, caminhos de `livros/` e `docs/`, e histórico de AMB-03/coleção.
- Auditoria privada, somente leitura: `main` **c388975985db2f5684deb30bdcc5566edd90af0a**. Protocolo, estado, handoff, IDs da matriz original e recortes normativos AMB-002/003/004 consultados. Estado observado: checkpoint geral **AUD03-043**, último normativo **NORM-PEN-030**, corte histórico 04/11/2026, `ultimo_lote_certificado=null`. O comando AUD03-046 em outro chat não comprova sua incorporação à main. Nenhum arquivo privado ou matriz foi copiado ao Quiz.
- Catálogos públicos inspecionados: `livros/editorial/catalogo.json`, `livros/catalogo.json`, `livros/colecoes/ambiental.json`. Quatro capítulos ativos no catálogo geral; em Ambiental, somente a edição antiga `amb-03`. Não há registro ativo dos oito manuscritos atuais.
- A página pública e os assets inspecionados foram cotejados com o checkout; o detalhe dos hashes está no diagnóstico. A implantação desta sprint não foi realizada.
- PRs AMB relevantes: [#74](https://github.com/Talksxb/agu-quiz/pull/74), [#75](https://github.com/Talksxb/agu-quiz/pull/75) e [#78](https://github.com/Talksxb/agu-quiz/pull/78), integradas; [#81](https://github.com/Talksxb/agu-quiz/pull/81), [#83](https://github.com/Talksxb/agu-quiz/pull/83), [#85](https://github.com/Talksxb/agu-quiz/pull/85), drafts de triagem/revisão. [#87](https://github.com/Talksxb/agu-quiz/pull/87) e [#88](https://github.com/Talksxb/agu-quiz/pull/88) mantêm candidatos/ressalvas fora do banco. Não foram incorporadas.

## Obras atuais

| ID editorial | IDs curriculares declarados e existentes na matriz | Título real | Edição | Produção | Revisão jurídica | Integração ao leitor | Publicação |
|---|---|---|---|---|---|---|---|
| LIVRO-AMB-001 | AMB-01, AMB-02, AMB-03 | Fundamentos do Direito Ambiental: princípios, Constituição e competências federativas | 1.0, 21/11/2026 | Manuscrito completo recuperado; conclusão declarada no handoff | Pontual declarada em 21/11/2026; reservas e aceite de publicação pendentes | JSON recuperado, fora do catálogo ativo | Não publicada esta versão |
| LIVRO-AMB-002 | AMB-04 | Poder de Polícia e Licenciamento Ambiental | 1.0, 22/11/2026 | Manuscrito completo recuperado; conclusão declarada no handoff | Pontual declarada em 22/11/2026; reservas e aceite de publicação pendentes | JSON recuperado, fora do catálogo ativo | Não publicada esta versão |
| LIVRO-AMB-003 | AMB-05 | Responsabilidade e Reparação Ambiental | 1.0, 22/11/2026 | Manuscrito completo recuperado; conclusão declarada no handoff | Pontual declarada em 22/11/2026; reservas e aceite de publicação pendentes | JSON recuperado, fora do catálogo ativo | Não publicada esta versão |
| LIVRO-AMB-004 | AMB-06 | SISNAMA, PNMA, Política Energética e Saneamento | 1.0, 22/11/2026 | Manuscrito completo recuperado; conclusão declarada no handoff | Pontual declarada em 22/11/2026; reservas e aceite de publicação pendentes | JSON recuperado, fora do catálogo ativo | Não publicada esta versão |
| LIVRO-AMB-005 | AMB-07 | Estudo de Impacto Ambiental e Avaliação de Impactos | 1.0, 22/11/2026 | Manuscrito completo recuperado; conclusão declarada no handoff | Pontual declarada em 22/11/2026; reservas e aceite de publicação pendentes | JSON recuperado, fora do catálogo ativo | Não publicada esta versão |
| LIVRO-AMB-006 | AMB-08 | Biodiversidade, Acesso e Conhecimento Tradicional | 1.0, 22/11/2026 | Manuscrito completo recuperado; conclusão declarada no handoff | Pontual declarada em 22/11/2026; reservas e aceite de publicação pendentes | JSON recuperado, fora do catálogo ativo | Não publicada esta versão |
| LIVRO-AMB-007 | AMB-09, AMB-10 | Proteção às florestas, áreas de preservação permanente e unidades de conservação | 1.0, 22/11/2026 | Manuscrito completo recuperado; conclusão declarada no handoff | Pontual declarada em 22/11/2026; reservas e aceite de publicação pendentes | JSON recuperado, fora do catálogo ativo | Não publicada esta versão |
| LIVRO-AMB-008 | AMB-11 | Crimes contra o meio ambiente | 1.0, 22/11/2026 | Manuscrito completo recuperado; conclusão declarada no handoff | Pontual declarada em 22/11/2026; reservas e aceite de publicação pendentes | JSON recuperado, fora do catálogo ativo | Não publicada esta versão |

## Localização e pendências por obra

### LIVRO-AMB-001 — Fundamentos do Direito Ambiental: princípios, Constituição e competências federativas

Fonte canônica: [LIVRO-AMB-001_FUNDAMENTOS_AMBIENTAIS_v1.0.md](https://chatgpt.com/library?file_id=libfile_f6ef7a9b5c4c8191ab62f94b77505952&account_id=personal). SHA-256: `eeb71884cb1345638ad6aeb9993ec241d82d4787ceadf30555776d82f485f8f0`.

Derivado: [LIVRO-AMB-001_LEITOR_AGU_amb-001.json](https://chatgpt.com/library?file_id=libfile_4a143340bf8081918afe8937a7f8954a&account_id=personal). Pacote: [LIVRO-AMB-001_PACOTE_FUNDAMENTOS_v1.0.zip](https://chatgpt.com/library?file_id=libfile_62f48968f930819188fffd0de45ca6aa&account_id=personal). JSON `amb-001`; 42 blocos / PDF 43 páginas. A versão ampliada não consta dos catálogos de produção. O JSON tem redação pública diferente da seção 40 e omite a linha de proveniência privada; não é cópia textual integral do Markdown.

### LIVRO-AMB-002 — Poder de Polícia e Licenciamento Ambiental

Fonte canônica: [LIVRO-AMB-002.md](https://chatgpt.com/library?file_id=libfile_3d17c37bb2048191be981f551b20c2c6&account_id=personal). SHA-256: `8d6eee7843b7fc85d9c67140ba0fcd4972b8624eec100d5206ecf40ddd43f46d`.

Derivado: [LIVRO-AMB-002.json](https://chatgpt.com/library?file_id=libfile_af2684c29034819191b5e640b97177f0&account_id=personal). Pacote: [LIVRO-AMB-002_PACOTE_COMPLETO.zip](https://chatgpt.com/library?file_id=libfile_b7217f8f5db48191ac3a1962adbd4216&account_id=personal). JSON `amb-04`; 27 blocos / PDF 32 páginas. Concatenação `pages[].text` idêntica ao Markdown. PRs #81/#83/#85 documentavam bloqueio de bytes originais; o bloqueio de acesso foi resolvido nesta sprint. Revisão e aprovação editorial por hash continuam pendentes.

### LIVRO-AMB-003 — Responsabilidade e Reparação Ambiental

Fonte canônica: [LIVRO-AMB-003_AMB-05.md](https://chatgpt.com/library?file_id=libfile_44ad60b91b008191acc03c62067312f8&account_id=personal). SHA-256: `2a6c462bb9e0a76f7cc068d6839b2e82de39f48283c1ee677180c1cd8d507b87`.

Derivado: [LIVRO-AMB-003_AMB-05_biblioteca.json](https://chatgpt.com/library?file_id=libfile_015190b6d57c8191b3e0a9e1ccbac96d&account_id=personal). Pacote: [LIVRO-AMB-003_PACOTE_COMPLETO.zip](https://chatgpt.com/library?file_id=libfile_48f91ba6f20481919ed1e68a2a4355af&account_id=personal). JSON `LIVRO-AMB-003`, páginas `id/title/markdown/html`, diferente do esquema simples `label/text`; 18 blocos / PDF 21 páginas. Handoff e relatório adicionais recuperados dentro do ZIP. PDF avulso e PDF do pacote diferem em bytes.

### LIVRO-AMB-004 — SISNAMA, PNMA, Política Energética e Saneamento

Fonte canônica: [LIVRO-AMB-004_AMB-06_CAPITULO.md](https://chatgpt.com/library?file_id=libfile_f5bb41f4142481918fd65b55500fa279&account_id=personal). SHA-256: `f1dcb7d783f32b107118982c17341ca2d01d8fa9e8688eb77f38847e2d735d17`.

Derivado: [LIVRO-AMB-004_AGU_QUIZ_livros_amb-06.json](https://chatgpt.com/library?file_id=libfile_8f3f0a6d8de88191b03aa2cecc4d764f&account_id=personal). Pacote: [LIVRO-AMB-004_AMB-06_PACOTE_COMPLETO.zip](https://chatgpt.com/library?file_id=libfile_8b85cbf313248191bcfca65ec1567809&account_id=personal). JSON `amb-06`; 16 blocos / PDF 40 páginas. Arquivo separado contém 10 questões e 10 flashcards candidatos, com `imported=false`, `published=false`; não contam nos 51 cartões ativos.

### LIVRO-AMB-005 — Estudo de Impacto Ambiental e Avaliação de Impactos

Fonte canônica: [LIVRO-AMB-005_AMB-07_COMPLETO.md](https://chatgpt.com/library?file_id=libfile_cfcc0f5b90248191b6fa046bc03db2d1&account_id=personal). SHA-256: `8cf9b227e85caef1a5fecbe22cd9cc60e65a83e4297e5fe92faacdf9b0038bbf`.

Derivado: [LIVRO-AMB-005_LEITOR.json](https://chatgpt.com/library?file_id=libfile_b54545dc5b2c8191b928334aa763cc41&account_id=personal). Pacote: [LIVRO-AMB-005_AMB-07_PACOTE.zip](https://chatgpt.com/library?file_id=libfile_fd14421807d481919fbb8ef1854f869f&account_id=personal). JSON `amb-07`; 22 blocos / PDF 22 páginas. Diagramas Mermaid e draw.io, caso, questões e recuperação recuperados. PDF avulso e PDF do pacote diferem em bytes.

### LIVRO-AMB-006 — Biodiversidade, Acesso e Conhecimento Tradicional

Fonte canônica: [LIVRO-AMB-006_AMB-08_LEITURA_COMPLETA.md](https://chatgpt.com/library?file_id=libfile_b989733948cc819192b4ef2cf64e7c64&account_id=personal). SHA-256: `bdffa0fdf1950362239d66a71b2f2e1f5fdcff0e6129070ecd6475031d750e09`.

Derivado: [LIVRO-AMB-006_AMB-08_LEITURA.json](https://chatgpt.com/library?file_id=libfile_05588e8448488191bb21af8d5156290a&account_id=personal). Pacote: [LIVRO-AMB-006_PACOTE_COMPLETO.zip](https://chatgpt.com/library?file_id=libfile_37daaa7731a0819196fae479beb70bd8&account_id=personal). JSON `LIVRO-AMB-006`, páginas `page_id/page_number/title/content_html/content_markdown`, além de `full_markdown`, seções e diagramas; exige adaptação explícita ao leitor. 20 blocos / PDF 45 páginas.

### LIVRO-AMB-007 — Proteção às florestas, áreas de preservação permanente e unidades de conservação

Fonte canônica: [LIVRO-AMB-007_AMB09_AMB10_COMPLETO.md](https://chatgpt.com/library?file_id=libfile_de24e10b79148191b4591650ed8efa71&account_id=personal). SHA-256: `044c03fb767b9e6ea54b50383cc2abc22c4ba71b197838740919bf078ede5d1b`.

Derivado: [LIVRO-AMB-007_AGU_QUIZ.json](https://chatgpt.com/library?file_id=libfile_07b610210f548191a32e759880f097b0&account_id=personal). Pacote: [LIVRO-AMB-007_PACOTE_COMPLETO.zip](https://chatgpt.com/library?file_id=libfile_857c7969b08081918180b59d5cf17275&account_id=personal). JSON `amb-09-10`; 21 blocos / PDF 22 páginas. Handoff, relatório, parecer e diagramas encontrados dentro do ZIP. PDF avulso e PDF do pacote diferem em bytes.

### LIVRO-AMB-008 — Crimes contra o meio ambiente

Fonte canônica: [LIVRO-AMB-008_CAPITULO_INTEGRAL.md](https://chatgpt.com/library?file_id=libfile_9e5d44c76d308191a7ee4215d4f7a357&account_id=personal). SHA-256: `e431ccbf1def7175d0bbee965b85d56d21801911546d1c9be972fa29d6856daa`.

Derivado: [LIVRO-AMB-008_LEITOR_AGU.json](https://chatgpt.com/library?file_id=libfile_98dad55634d48191b971faa54df48839&account_id=personal). Pacote: [LIVRO-AMB-008_PACOTE_COMPLETO.zip](https://chatgpt.com/library?file_id=libfile_eac40f10ad208191abc816bf700f2675&account_id=personal). JSON `amb-11`; 23 blocos / PDF 27 páginas. Inclui caso, recuperação, fontes e quadros CSV. Há referência comentada a questão oficial histórica; requer exame individual antes de distribuição pública.

As revisões declaradas dos livros 001–008 preservam lacunas de atualização normativa, jurisprudência, retificações do edital e aplicação ao caso concreto. Para publicação, recuperar os relatórios listados abaixo, revisar os fundamentos decisivos e aprovar a edição/derivação com hash. A certificação global dos 412 IDs não é requisito para uma publicação de escopo delimitado; o gate editorial individual continua necessário.

## Versão antiga de LIVRO-AMB-001: conservar identidade e progresso

**Competências e Cooperação Ambiental**, edição de 20/11/2026, cobre AMB-03. A produção antiga está efetivamente integrada como `amb-03`, com `livros/fontes/amb-03.md`, `livros/amb-03.json`, `livros/editorial/amb-03.json`, `livros/metodo/amb-03.json` e `livros/livro-amb-001-original.html`. A aprovação registrada autoriza a transposição da edição já pública, não a versão ampliada de 21/11.

Originais recuperados: [LIVRO-AMB-001_Competencias_e_Cooperacao_Ambiental.docx](https://chatgpt.com/library?file_id=libfile_1b5c526cf08c81918527b782b77bd573&account_id=personal); [LIVRO-AMB-001_Leitura_Responsiva.html](https://chatgpt.com/library?file_id=libfile_6410c7909ff48191a368b609accefeb1&account_id=personal); [LIVRO-AMB-001_Pacote_Editorial_Completo.zip](https://chatgpt.com/library?file_id=libfile_b2645ce5593481918a97517cb73c5ea6&account_id=personal). O ZIP contém também `LIVRO-AMB-001_Fonte_Editavel.md` e quatro SVGs.

O HTML recuperado e o HTML público não são idênticos em bytes: a versão pública une duas linhas na expressão “relaçãoentre”. O cotejo encontrou somente essa diferença de linhas. Não foi corrigida porque esta sprint não edita livros. Preservar o registro da divergência para revisão editorial própria.

**Situação:** edição antiga produzida, revisão pontual declarada, integrada e publicada. Sua presença não permite afirmar que a versão ampliada, os IDs AMB-01/02 ou qualquer outro livro estejam publicados.

## Reconciliação proposta — somente documental

| Entrada do planejamento antigo | Tema/IDs planejados | Manuscrito real correspondente | Decisão proposta |
|---|---|---|---|
| LIVRO-AMB-001 | AMB-03, competências | Antigo 001 e ampliado 001 (AMB-01/02/03) | Conservar `amb-03` legado. Registrar a versão ampliada como obra/edição distinta, com chave técnica própria e relação de sobreposição, sem sobrescrever conteúdo ou progresso |
| LIVRO-AMB-002 | AMB-04 | 002, polícia e licenciamento | Preservar identidade; atualizar apenas estado editorial após gate |
| LIVRO-AMB-003 | AMB-05 | 003, responsabilidade | Preservar identidade; adaptar JSON somente em tarefa posterior |
| LIVRO-AMB-004 | AMB-01/02, princípios/Constituição | Ampliado 001 | Marcar como planejamento supersedido pelo manuscrito recuperado; não produzir outro livro |
| LIVRO-AMB-005 | AMB-06, SISNAMA/políticas | Real 004 | Corrigir associação editorial preservando histórico do planejamento |
| LIVRO-AMB-006 | AMB-07, EIA | Real 005 | Idem; não trocar arquivos pelo número ordinal |
| LIVRO-AMB-007 | AMB-08, biodiversidade | Real 006 | Idem |
| LIVRO-AMB-008 | AMB-09/10, florestas/APP/UC | Real 007 | Idem |
| LIVRO-AMB-009 | AMB-11, crimes | Real 008 | Preservar como entrada antiga de planejamento, sem inventar produção com ID 009 |

Na futura alteração, manter campos distintos para identificador editorial, ID do leitor, edição e cobertura curricular; utilizar o pipeline editorial existente. `AMB-03`, `amb-03` e `LIVRO-AMB-001` não são intercambiáveis. `amb-001`, `LIVRO-AMB-003` e `LIVRO-AMB-006` nos JSONs recuperados tampouco constituem chaves aprovadas do catálogo de produção.

## Divergências de derivados e gates

- **001 ampliado:** o JSON omite uma linha de referência à auditoria e substitui parte da seção 40 por texto editorial mais curto. É uma derivação com saneamento de proveniência, não concatenação fiel de todos os parágrafos. A derivação pública precisa de decisão explícita e hash próprio; não repor automaticamente material interno.
- **002:** concatenação de todos os blocos de texto é exatamente igual ao Markdown recuperado. Isso resolve a verificação de bytes da fonte, não as reservas jurídicas/documentais de #85 nem a aprovação formal.
- **003/004/005/007/008:** os textos coincidem ao comparar linhas não vazias com espaços normalizados, descontando front matter quando existente. Não é igualdade binária, tipográfica ou validação integral de recursos visuais.
- **006:** o JSON conserva front matter e usa outro esquema de páginas. A diferença identificada no cotejo sem front matter é essa retenção de metadados; adaptação deve preservar conteúdo e registrar a transformação.
- **PDFs 003/005/007:** os avulsos têm respectivamente 186.153 / 185.939 / 199.263 bytes; nos ZIPs, 135.494 / 142.757 / 153.426 bytes. Mesma contagem de páginas e texto extraído integralmente igual por par. Não foi presumida equivalência gráfica nem substituído qualquer exemplar.
- O gate técnico deve conferir schema, seções, assets, segurança de HTML/Markdown, navegação, contraste, recursos editáveis e fidelidade. O gate jurídico deve revalidar os pontos decisivos e as reservas por edição. Nenhum gate foi convertido em aprovação de publicação nesta sprint.

## Manifesto de todos os arquivos encontrados

As localizações abaixo são privadas da conta do titular; o link não concede acesso. O manifesto publica identificação e hashes, não o conteúdo dos manuscritos ou da auditoria privada. Caminho persistente de origem: `/AGU/<nome>`. Os arquivos ficaram em cópia de trabalho fora do repositório; não foram anexados à PR.

| Arquivo e localização | Bytes lidos | SHA-256 | Conferência efetiva |
|---|---:|---|---|
| [LIVRO-AMB-001_Competencias_e_Cooperacao_Ambiental.docx](https://chatgpt.com/library?file_id=libfile_1b5c526cf08c81918527b782b77bd573&account_id=personal) | 53372 | `c5ab9c3d67e0d7c04c5969e70b4828452c1fc49cf3bde66a5c34d60e9246833b` | Pacote e XML/texto recuperáveis; sem revisão visual integral |
| [LIVRO-AMB-001_FUNDAMENTOS_AMBIENTAIS_v1.0.md](https://chatgpt.com/library?file_id=libfile_f6ef7a9b5c4c8191ab62f94b77505952&account_id=personal) | 137467 | `eeb71884cb1345638ad6aeb9993ec241d82d4787ceadf30555776d82f485f8f0` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-001_FUNDAMENTOS_AMBIENTAIS_v1.0.pdf](https://chatgpt.com/library?file_id=libfile_848fa487e440819186a9d4ae25a95aae&account_id=personal) | 247300 | `a975dbcab0ccbd3f5c010059dbe06ff50fcbf8c12c28930583ec1a60b1598189` | Todas as páginas com texto extraído; sem revisão visual integral |
| [LIVRO-AMB-001_HANDOFF_AGU_QUIZ_v1.0.md](https://chatgpt.com/library?file_id=libfile_a8c4e0328da8819182505a6f5c714335&account_id=personal) | 4561 | `a52abf925198d5de4cf38e011334ce344d8d9753cffb421d71d6cc46f098ca1a` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-001_LEITOR_AGU_amb-001.json](https://chatgpt.com/library?file_id=libfile_4a143340bf8081918afe8937a7f8954a&account_id=personal) | 141170 | `696b4b2444978eee012069e73bc2630a342b53fa5d95d2e8e2424a487c9fdf12` | JSON parseado; estrutura inspecionada |
| [LIVRO-AMB-001_Leitura_Responsiva.html](https://chatgpt.com/library?file_id=libfile_6410c7909ff48191a368b609accefeb1&account_id=personal) | 107947 | `a3d94f14b058f6bd9fd59ca4b53823c92eb9f656c4eb131618ecbb8a50c2abd8` | HTML e comparação com derivado público |
| [LIVRO-AMB-001_PACOTE_FUNDAMENTOS_v1.0.zip](https://chatgpt.com/library?file_id=libfile_62f48968f930819188fffd0de45ca6aa&account_id=personal) | 346129 | `dc38e3140f7ce685b3f3be49b2d7ad01b4ec29b4f197b6e27a3d6a8ea7631953` | CRC íntegro; 93 membros lidos no conjunto |
| [LIVRO-AMB-001_Pacote_Editorial_Completo.zip](https://chatgpt.com/library?file_id=libfile_b2645ce5593481918a97517cb73c5ea6&account_id=personal) | 117362 | `d4dd1f2e1454ac1ffd7cf6e4b5d1ffc94fd2a954ddf1980617566c6cd970e287` | CRC íntegro; 93 membros lidos no conjunto |
| [LIVRO-AMB-001_RELATORIO_QUALIDADE_v1.0.md](https://chatgpt.com/library?file_id=libfile_8d2f2620d1288191a1b52b2813b5d605&account_id=personal) | 9846 | `8fb2323279171dcd9774a413fdaf644d640e8f12a9b551797df4faae71160e0a` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-001_Relatorio_Qualidade_e_Handoff.md](https://chatgpt.com/library?file_id=libfile_b2fe733db01081919af1ca96c27ebbe1&account_id=personal) | 6895 | `31520952acc81d9fa40ca46a4340dd557c9c9affe37aa6bd40a0536b9df2ef56` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-002.json](https://chatgpt.com/library?file_id=libfile_af2684c29034819191b5e640b97177f0&account_id=personal) | 92236 | `f1aa2fae274464e475afaf3fd24cfdb4bc6b5a61427a743458187f1fa5bafc84` | JSON parseado; estrutura inspecionada |
| [LIVRO-AMB-002.md](https://chatgpt.com/library?file_id=libfile_3d17c37bb2048191be981f551b20c2c6&account_id=personal) | 88101 | `8d6eee7843b7fc85d9c67140ba0fcd4972b8624eec100d5206ecf40ddd43f46d` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-002.pdf](https://chatgpt.com/library?file_id=libfile_c3406f15c5dc8191af3b9c1e2e791728&account_id=personal) | 215210 | `d73b8153fd661809c06e0b3b1fac4a3c557ace764767944265a220e5e0cab481` | Todas as páginas com texto extraído; sem revisão visual integral |
| [LIVRO-AMB-002_FLUXOGRAMAS.mmd](https://chatgpt.com/library?file_id=libfile_1ebce3ef33bc8191beb838c4e2766092&account_id=personal) | 2627 | `d2210e135e955140394b1d677bc64b77d2ba68bce62a6b185ce3abfd57793465` | Fonte textual recuperada |
| [LIVRO-AMB-002_FONTES_E_QUALIDADE.md](https://chatgpt.com/library?file_id=libfile_180d85c8ee388191972990581eb14159&account_id=personal) | 10637 | `694c78229ea99fe81080b11bbe25e4c604b8c31aa8f33a1b3cc89b742986e15b` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-002_HANDOFF_EDITORIAL.md](https://chatgpt.com/library?file_id=libfile_578d87c909048191b0bb78ed6b21186f&account_id=personal) | 4043 | `e5084539153f6674de04a56772e6556ffede924ce7c6aa124bb04b32f421ef9b` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-002_PACOTE_COMPLETO.zip](https://chatgpt.com/library?file_id=libfile_b7217f8f5db48191ac3a1962adbd4216&account_id=personal) | 264291 | `95d64d921c4f4f88265a9d2341e2d58d4364b26b483164a5517227912f6ab120` | CRC íntegro; 93 membros lidos no conjunto |
| [LIVRO-AMB-003_AMB-05.md](https://chatgpt.com/library?file_id=libfile_44ad60b91b008191acc03c62067312f8&account_id=personal) | 75329 | `2a6c462bb9e0a76f7cc068d6839b2e82de39f48283c1ee677180c1cd8d507b87` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-003_AMB-05.pdf](https://chatgpt.com/library?file_id=libfile_8e376e8342908191acc1f39fe54921b5&account_id=personal) | 186153 | `7cfb8dec0285c5fa75a05708de1548e857dc2349a84780d32cc9cad0b2163ff3` | Todas as páginas com texto extraído; sem revisão visual integral |
| [LIVRO-AMB-003_AMB-05_biblioteca.json](https://chatgpt.com/library?file_id=libfile_015190b6d57c8191b3e0a9e1ccbac96d&account_id=personal) | 164640 | `faadc8f9106e7f71e138c155bdf6040d7e1c2d3229d5cc2b86cdb963a577f5d5` | JSON parseado; estrutura inspecionada |
| [LIVRO-AMB-003_PACOTE_COMPLETO.zip](https://chatgpt.com/library?file_id=libfile_48f91ba6f20481919ed1e68a2a4355af&account_id=personal) | 203468 | `4498de2195c5735635ffed639bd334c79d827e52791f9b65156e0eab0a1a0f92` | CRC íntegro; 93 membros lidos no conjunto |
| [LIVRO-AMB-004_AGU_QUIZ_CARTOES.json](https://chatgpt.com/library?file_id=libfile_7530224e551c81918c1f5f8ee504d760&account_id=personal) | 18791 | `62b6f4708330e47d65334e86811a38eaffe8cbad870690795b3e0e5247f0c9e2` | JSON parseado; estrutura inspecionada |
| [LIVRO-AMB-004_AGU_QUIZ_livros_amb-06.json](https://chatgpt.com/library?file_id=libfile_8f3f0a6d8de88191b03aa2cecc4d764f&account_id=personal) | 86318 | `6295be2cd7cce85abc0e519d7b4cd22ea78cc116e063fc041fd8b6d834d741b4` | JSON parseado; estrutura inspecionada |
| [LIVRO-AMB-004_AMB-06_CAPITULO.md](https://chatgpt.com/library?file_id=libfile_f5bb41f4142481918fd65b55500fa279&account_id=personal) | 83690 | `f1dcb7d783f32b107118982c17341ca2d01d8fa9e8688eb77f38847e2d735d17` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-004_AMB-06_CAPITULO.pdf](https://chatgpt.com/library?file_id=libfile_fe374ec09d6881919ad49d001ab756a8&account_id=personal) | 259830 | `4f9c5ccab7738b3ce7ccb20dd308607dcb048b6d5e2faeb4d84a91e2bcb1943c` | Todas as páginas com texto extraído; sem revisão visual integral |
| [LIVRO-AMB-004_AMB-06_PACOTE_COMPLETO.zip](https://chatgpt.com/library?file_id=libfile_8b85cbf313248191bcfca65ec1567809&account_id=personal) | 254126 | `f5826a95e5d66a9c92176e8aaa80c9c3fa84f012d95eec9236d0ded66e2f5f2b` | CRC íntegro; 93 membros lidos no conjunto |
| [LIVRO-AMB-004_HANDOFF.md](https://chatgpt.com/library?file_id=libfile_d5da41b649e08191882a8cf3b3fc1985&account_id=personal) | 2659 | `143591880b53aa7295249b12698c691b164bf97c30720d8d9faf7a975a5835a3` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-004_RELATORIO.md](https://chatgpt.com/library?file_id=libfile_dda7556eac588191b2af38c7b4ed587d&account_id=personal) | 5089 | `fd20b6b1e011317cab4fe5c8ba20bf6830a2c7d31ca528bb3146d5f3042e99e1` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-005_AMB-07.pdf](https://chatgpt.com/library?file_id=libfile_ab414849fd1c8191af61bc4dada39170&account_id=personal) | 185939 | `0507ca834412e53fded9b66ec6d974ecdd548ac34f42325551f7c7213ee83a3e` | Todas as páginas com texto extraído; sem revisão visual integral |
| [LIVRO-AMB-005_AMB-07_COMPLETO.md](https://chatgpt.com/library?file_id=libfile_cfcc0f5b90248191b6fa046bc03db2d1&account_id=personal) | 75375 | `8cf9b227e85caef1a5fecbe22cd9cc60e65a83e4297e5fe92faacdf9b0038bbf` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-005_AMB-07_PACOTE.zip](https://chatgpt.com/library?file_id=libfile_fd14421807d481919fbb8ef1854f869f&account_id=personal) | 211882 | `053c4f3cd3500e0265f865b6f84094f5c00c69918f51aecacd43c8b5c657688b` | CRC íntegro; 93 membros lidos no conjunto |
| [LIVRO-AMB-005_CASO_AGU.md](https://chatgpt.com/library?file_id=libfile_e59545a137a48191b706fc065175cf7a&account_id=personal) | 9487 | `b43e3baad479df88b7666bcca4d97526b7cf37a74072b707a4ba467319c936e2` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-005_CICLO_AIA.drawio](https://chatgpt.com/library?file_id=libfile_c11adb0c84648191b16305e4d3616f3a&account_id=personal) | 12190 | `f968afa06ebac0615eaf82bce9f89ebde63faeeaae9717193267d8e7878114a7` | Arquivo XML recuperado |
| [LIVRO-AMB-005_CICLO_AIA.mmd](https://chatgpt.com/library?file_id=libfile_6e2f5c8da748819183ddfd256b38b103&account_id=personal) | 1409 | `1a2421b3970cc559920cd155158dc52996998bb90451b77eee8ebbf31fe4c5ff` | Fonte textual recuperada |
| [LIVRO-AMB-005_HANDOFF.md](https://chatgpt.com/library?file_id=libfile_1891a495d4c08191951bfabfcb5aa556&account_id=personal) | 4027 | `49f221f276cef431a0866a8099ffa012b421538a0b849f3e6340abcb2be519f1` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-005_LEITOR.json](https://chatgpt.com/library?file_id=libfile_b54545dc5b2c8191b928334aa763cc41&account_id=personal) | 78662 | `ef7649a052cf1ed673d8029863988804204c499c00217512ba1a6b3fcb658793` | JSON parseado; estrutura inspecionada |
| [LIVRO-AMB-005_QUESTOES.md](https://chatgpt.com/library?file_id=libfile_b130abda87488191b840e0085a7bcb4a&account_id=personal) | 4988 | `3503360bd7b6d2676250dd7f3992e1194956e62b487b00b41697408f34462ee6` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-005_RECUPERACAO_ATIVA.md](https://chatgpt.com/library?file_id=libfile_41eb343b67548191b566197fcd9ac6b9&account_id=personal) | 4083 | `5830690c3afd58959c7b5d755dcfcdc803b79fa8ca366c3d65c0cf9e1c3e11e6` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-005_RELATORIO.md](https://chatgpt.com/library?file_id=libfile_5d0fe9613ac4819199ddfa50cd1b1055&account_id=personal) | 3965 | `c35ed1edd5db268e3c2c4f56f6c0b5158479ab68c0eb3b7c36454bb152d058a1` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-006_AMB-08_LEITURA.json](https://chatgpt.com/library?file_id=libfile_05588e8448488191bb21af8d5156290a&account_id=personal) | 332497 | `100e91e5956909c170719f4244be3083d3bd36d48ed6785c85f94df67d3e4f97` | JSON parseado; estrutura inspecionada |
| [LIVRO-AMB-006_AMB-08_LEITURA_COMPLETA.md](https://chatgpt.com/library?file_id=libfile_b989733948cc819192b4ef2cf64e7c64&account_id=personal) | 103225 | `bdffa0fdf1950362239d66a71b2f2e1f5fdcff0e6129070ecd6475031d750e09` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-006_AMB-08_LEITURA_COMPLETA.pdf](https://chatgpt.com/library?file_id=libfile_f202580dbf708191b1bd3b929e259989&account_id=personal) | 203764 | `a9a7c9a3adf1d5560b538910da32fd7b95fcac0018c1460ee0410833023ed61b` | Todas as páginas com texto extraído; sem revisão visual integral |
| [LIVRO-AMB-006_HANDOFF.md](https://chatgpt.com/library?file_id=libfile_0c542696084081918baa2518325ee95e&account_id=personal) | 3597 | `689fd56917300fa762c21464ede6350a27e5c41d0c441038c2298d231d29d085` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-006_PACOTE_COMPLETO.zip](https://chatgpt.com/library?file_id=libfile_37daaa7731a0819196fae479beb70bd8&account_id=personal) | 328151 | `b1ddd383d427c17916715d97674e3eeb2928d177483a44c1ed8e159aaa987b66` | CRC íntegro; 93 membros lidos no conjunto |
| [LIVRO-AMB-006_QUESTOES_E_RECUPERACAO.md](https://chatgpt.com/library?file_id=libfile_67ac390782788191ac12da2ea24c4702&account_id=personal) | 11573 | `b1d58c36f314992c0d420870dc144a389b3260394785530b47b46a69a6317114` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-006_RELATORIO_VERIFICACAO.md](https://chatgpt.com/library?file_id=libfile_cf2e38173c30819189cff21949f1f0d6&account_id=personal) | 10644 | `8a95ff74e0d088bdaaf86dbb9ea1acd95bc6531825cfe0499f471c5a356eb4df` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-007_AGU_QUIZ.json](https://chatgpt.com/library?file_id=libfile_07b610210f548191a32e759880f097b0&account_id=personal) | 94744 | `9131bcf99d4f19bcc3e4bd72d62c616bb18dee9e3b03e28c1227452f0374c965` | JSON parseado; estrutura inspecionada |
| [LIVRO-AMB-007_AMB09_AMB10_COMPLETO.md](https://chatgpt.com/library?file_id=libfile_de24e10b79148191b4591650ed8efa71&account_id=personal) | 91306 | `044c03fb767b9e6ea54b50383cc2abc22c4ba71b197838740919bf078ede5d1b` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-007_AMB09_AMB10_COMPLETO.pdf](https://chatgpt.com/library?file_id=libfile_e1e9b39d96f48191a24c8ce2944f3574&account_id=personal) | 199263 | `251702a83bf085041bea0cf03823a78eb9fb80d389e01a5bbb75091e151f0d5f` | Todas as páginas com texto extraído; sem revisão visual integral |
| [LIVRO-AMB-007_PACOTE_COMPLETO.zip](https://chatgpt.com/library?file_id=libfile_857c7969b08081918180b59d5cf17275&account_id=personal) | 297934 | `8669816e4a1b28dcd8cad3e4e74393612705bbc31dfe03ab9cbcb5e0ef6fde42` | CRC íntegro; 93 membros lidos no conjunto |
| [LIVRO-AMB-008_CAPITULO_INTEGRAL.md](https://chatgpt.com/library?file_id=libfile_9e5d44c76d308191a7ee4215d4f7a357&account_id=personal) | 97078 | `e431ccbf1def7175d0bbee965b85d56d21801911546d1c9be972fa29d6856daa` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-008_CAPITULO_INTEGRAL.pdf](https://chatgpt.com/library?file_id=libfile_d67dc38b36ac8191b36e99630021e625&account_id=personal) | 222253 | `35ae295134c588c11eb82ed2a2d368741fb4dee737c14abaad25eae18ac49ce1` | Todas as páginas com texto extraído; sem revisão visual integral |
| [LIVRO-AMB-008_CASO_AGU_RESOLVIDO.md](https://chatgpt.com/library?file_id=libfile_a88d62edd87c8191a79dd94b43cc0d36&account_id=personal) | 9523 | `fbb1aa247d361a1a69c4a938e83f8878d2640fbb8042672a96af8834a2be7fd8` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-008_FONTES_RASTREAVEIS.json](https://chatgpt.com/library?file_id=libfile_141a20b7f5908191918401fea126a292&account_id=personal) | 12825 | `b003688b1371a841d3cb14b18014faffbd63eb67b2e1511d22ea59797cea5972` | JSON parseado; estrutura inspecionada |
| [LIVRO-AMB-008_HANDOFF.md](https://chatgpt.com/library?file_id=libfile_5923c108201c81919bb098625303ed56&account_id=personal) | 3171 | `9ca7f94ad5b31ee00fd55cd5a0ea6a687d7525650183c1604c110ce4291d8b9c` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-008_LEITOR_AGU.json](https://chatgpt.com/library?file_id=libfile_98dad55634d48191b971faa54df48839&account_id=personal) | 100918 | `5606cab9e1787d8499c0294de5278e0510f6b56a7056c0f53ccce96865d09673` | JSON parseado; estrutura inspecionada |
| [LIVRO-AMB-008_MATRIZ_ESTRATEGICA_AGU_EDITAVEL.csv](https://chatgpt.com/library?file_id=libfile_89f362d6a0788191a7885b006d2931ab&account_id=personal) | 2841 | `c3de59b454b399a933e67bbb18406217b518dfdc8426243f09bed8d637f69793` | Bytes/texto recuperados |
| [LIVRO-AMB-008_PACOTE_COMPLETO.zip](https://chatgpt.com/library?file_id=libfile_eac40f10ad208191abc816bf700f2675&account_id=personal) | 261819 | `5b44f1d0a4caa14d9e6a09eaadbab42c1fcd2586f70672ad84972fc40192f7cb` | CRC íntegro; 93 membros lidos no conjunto |
| [LIVRO-AMB-008_QUESTOES_AUTORAIS_COMENTADAS.md](https://chatgpt.com/library?file_id=libfile_662dec8fadd481919f8aed4f148c83b8&account_id=personal) | 8191 | `cf25ae504727a10a6478c5dd853d6bfe1dd7e7ee8faa5aca011a9b2b32609d9c` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-008_RECUPERACAO_ATIVA.md](https://chatgpt.com/library?file_id=libfile_822cc577a9948191be05fbc0fa80d826&account_id=personal) | 4461 | `da12f2863703052d43b94f9c95a8ece082694cb8555df62ecf18836ee3c1287d` | Texto, estrutura e metadados inspecionados |
| [LIVRO-AMB-008_RELATORIO_JURIDICO.md](https://chatgpt.com/library?file_id=libfile_cbbb6561d9ac8191a5ab27e1fd32737b&account_id=personal) | 6720 | `6baf98b515726ef12906d3d44c318e544fdd1d2b2a4e6201975a6e2d3c673ccf` | Texto, estrutura e metadados inspecionados |

## Manifesto dos membros internos dos pacotes

Localizador: nome do ZIP acima + `!/` + caminho interno exato. Hashes calculados dos bytes recuperados de cada membro; o ZIP de origem tem seu próprio hash na tabela anterior. A leitura de bytes/CRC não equivale a validação jurídica ou renderização do recurso.

### LIVRO-AMB-001_PACOTE_FUNDAMENTOS_v1.0.zip

| Caminho interno | Bytes | SHA-256 | Comparação com avulso |
|---|---:|---|---|
| `LIVRO-AMB-001_FUNDAMENTOS_AMBIENTAIS_v1.0.md` | 137467 | `eeb71884cb1345638ad6aeb9993ec241d82d4787ceadf30555776d82f485f8f0` | Idêntico em bytes |
| `LIVRO-AMB-001_FUNDAMENTOS_AMBIENTAIS_v1.0.pdf` | 247300 | `a975dbcab0ccbd3f5c010059dbe06ff50fcbf8c12c28930583ec1a60b1598189` | Idêntico em bytes |
| `LIVRO-AMB-001_RELATORIO_QUALIDADE_v1.0.md` | 9846 | `8fb2323279171dcd9774a413fdaf644d640e8f12a9b551797df4faae71160e0a` | Idêntico em bytes |
| `LIVRO-AMB-001_HANDOFF_AGU_QUIZ_v1.0.md` | 4561 | `a52abf925198d5de4cf38e011334ce344d8d9753cffb421d71d6cc46f098ca1a` | Idêntico em bytes |
| `LIVRO-AMB-001_LEITOR_AGU_amb-001.json` | 141170 | `696b4b2444978eee012069e73bc2630a342b53fa5d95d2e8e2424a487c9fdf12` | Idêntico em bytes |
| `LIVRO-AMB-001_ARVORE_FEDERALISMO.mmd` | 677 | `4a35cc5418a47e9a03d362278a263bafce24291e2689ec53932ec438ef615a0f` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-001_FLUXO_LICENCIAMENTO.mmd` | 821 | `f373925631ab8d27fd051b61c9a40a2851fa7703838fac76a5058e4c7d697df6` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-001_CASO_AGU.mmd` | 893 | `2d9391b146235ece5c96230d616e3e2a1121d84a27eb9dcaeb177f3d639ca13e` | Sem avulso com o mesmo nome |

### LIVRO-AMB-001_Pacote_Editorial_Completo.zip

| Caminho interno | Bytes | SHA-256 | Comparação com avulso |
|---|---:|---|---|
| `04_Quadro_Supletiva_e_Subsidiaria.svg` | 5130 | `600ba24a2e86c16ee1e7d8f1d3fefc2c1d21472a7bb21812ee1cf7d140a8cd77` | Sem avulso com o mesmo nome |
| `LEIA-ME.txt` | 490 | `ec1e1b566440aa7e3d6cf5d368511795a3407c0c36d849f562bd13c6c76e761f` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-001_Relatorio_Qualidade_e_Handoff.md` | 6895 | `31520952acc81d9fa40ca46a4340dd557c9c9affe37aa6bd40a0536b9df2ef56` | Idêntico em bytes |
| `LIVRO-AMB-001_Leitura_Responsiva.html` | 107947 | `a3d94f14b058f6bd9fd59ca4b53823c92eb9f656c4eb131618ecbb8a50c2abd8` | Idêntico em bytes |
| `03_Diagrama_Caso_AGU.svg` | 6364 | `f79a45c1c10d38f94231b094822cdb466a6e2147b18075596126ede54c05b777` | Sem avulso com o mesmo nome |
| `01_Arvore_Constitucional.svg` | 4025 | `8f1836a9c2e87398fafb0947cff5a4f132ddd8f19ad54e01d6ff98cfc1d4bd4b` | Sem avulso com o mesmo nome |
| `02_Fluxograma_Licenciamento_e_Fiscalizacao.svg` | 7469 | `47ea62cc152047dcd820fbe346831bf5d7c2d0db0afc389d981095dbea412927` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-001_Fonte_Editavel.md` | 67044 | `13da0f0ef78d93c611005d1b95c7f045d9fe79e04ee352226228d5f1cbbad359` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-001_Competencias_e_Cooperacao_Ambiental.docx` | 53372 | `c5ab9c3d67e0d7c04c5969e70b4828452c1fc49cf3bde66a5c34d60e9246833b` | Idêntico em bytes |

### LIVRO-AMB-002_PACOTE_COMPLETO.zip

| Caminho interno | Bytes | SHA-256 | Comparação com avulso |
|---|---:|---|---|
| `LIVRO-AMB-002.md` | 88101 | `8d6eee7843b7fc85d9c67140ba0fcd4972b8624eec100d5206ecf40ddd43f46d` | Idêntico em bytes |
| `LIVRO-AMB-002.pdf` | 215210 | `d73b8153fd661809c06e0b3b1fac4a3c557ace764767944265a220e5e0cab481` | Idêntico em bytes |
| `LIVRO-AMB-002.json` | 92236 | `f1aa2fae274464e475afaf3fd24cfdb4bc6b5a61427a743458187f1fa5bafc84` | Idêntico em bytes |
| `LIVRO-AMB-002_FONTES_E_QUALIDADE.md` | 10637 | `694c78229ea99fe81080b11bbe25e4c604b8c31aa8f33a1b3cc89b742986e15b` | Idêntico em bytes |
| `LIVRO-AMB-002_HANDOFF_EDITORIAL.md` | 4043 | `e5084539153f6674de04a56772e6556ffede924ce7c6aa124bb04b32f421ef9b` | Idêntico em bytes |
| `LIVRO-AMB-002_FLUXOGRAMAS.mmd` | 2627 | `d2210e135e955140394b1d677bc64b77d2ba68bce62a6b185ce3abfd57793465` | Idêntico em bytes |

### LIVRO-AMB-003_PACOTE_COMPLETO.zip

| Caminho interno | Bytes | SHA-256 | Comparação com avulso |
|---|---:|---|---|
| `LIVRO-AMB-003_AMB-05.md` | 75329 | `2a6c462bb9e0a76f7cc068d6839b2e82de39f48283c1ee677180c1cd8d507b87` | Idêntico em bytes |
| `LIVRO-AMB-003_AMB-05.pdf` | 135494 | `73f3129f6781e637f9c2d6cc30af162883161e40fa9d474ad2e5f158b0cec4f8` | Bytes diferentes; preservar ambos |
| `LIVRO-AMB-003_AMB-05_biblioteca.json` | 164640 | `faadc8f9106e7f71e138c155bdf6040d7e1c2d3229d5cc2b86cdb963a577f5d5` | Idêntico em bytes |
| `FLUXO-AMB-05_IMPUTACAO.mmd` | 1165 | `51f96e3395a942bde27185a3743c5e21369f0a817f1c9675f62772abc3db89a7` | Sem avulso com o mesmo nome |
| `FLUXO-AMB-05_MINERACAO_REPARACAO.mmd` | 1093 | `9af1ac4b6301aee961e756dc6992a9de2db4321097e8255a12ea36e90bd0e8af` | Sem avulso com o mesmo nome |
| `QUADRO-AMB-05_PRECEDENTES.csv` | 2206 | `40ce4c3cb53d61c5c04254580052f793ba6af1a94ed684ca6c4782dba5cb3c8b` | Sem avulso com o mesmo nome |
| `QUADRO-AMB-05_MATRIZ_RESPONSAVEIS.csv` | 1070 | `71cbd4a09a4a1e8d76f7faecca2a6d73a6e5c047385285ecdf3c6f0cf4fe7cf6` | Sem avulso com o mesmo nome |
| `QUADRO-AMB-05_ESFERAS_RESPONSABILIDADE.csv` | 1392 | `9416285bc0d53c82006fdc18504651c28e4807695f3b6c4569e43f2633631ac4` | Sem avulso com o mesmo nome |
| `RELATORIO_QUALIDADE_LIVRO_AMB_003.md` | 6078 | `5620e384319ef00810239e8c0d09da8ac40dd41fe4e45642490019cadcc741fd` | Sem avulso com o mesmo nome |
| `HANDOFF_LIVRO_AMB_003.md` | 3871 | `4aa074d45b2a33fb58c675b28ba88aac7368e2bb3af46c50fcea91be75b30ec2` | Sem avulso com o mesmo nome |

### LIVRO-AMB-004_AMB-06_PACOTE_COMPLETO.zip

| Caminho interno | Bytes | SHA-256 | Comparação com avulso |
|---|---:|---|---|
| `LEIA_ME_ENTREGAS.md` | 2115 | `a6baf2748c1b4992d28db49d30a17749fc95ed7b99033eb89d98d0a560e30487` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-004_AMB-06_CAPITULO.md` | 83690 | `f1dcb7d783f32b107118982c17341ca2d01d8fa9e8688eb77f38847e2d735d17` | Idêntico em bytes |
| `LIVRO-AMB-004_AMB-06_CAPITULO.pdf` | 259830 | `4f9c5ccab7738b3ce7ccb20dd308607dcb048b6d5e2faeb4d84a91e2bcb1943c` | Idêntico em bytes |
| `LIVRO-AMB-004_AGU_QUIZ_livros_amb-06.json` | 86318 | `6295be2cd7cce85abc0e519d7b4cd22ea78cc116e063fc041fd8b6d834d741b4` | Idêntico em bytes |
| `LIVRO-AMB-004_AGU_QUIZ_CARTOES.json` | 18791 | `62b6f4708330e47d65334e86811a38eaffe8cbad870690795b3e0e5247f0c9e2` | Idêntico em bytes |
| `AMB06_ESQUEMA_SISNAMA.mmd` | 753 | `f67d1fc54c0b7f582cc8c5db154fd659243b83c051da07fa01bc5e0a17cd47ef` | Sem avulso com o mesmo nome |
| `AMB06_ESQUEMA_ENERGIA_SANEAMENTO.mmd` | 858 | `5b0d59d73413b6e6dd8954c93c98a350d4b0d28c2340d1611cf39723684a1885` | Sem avulso com o mesmo nome |
| `AMB06_ESQUEMA_PARECER_AGU.mmd` | 827 | `ec1c602745f422d0095db26b069dffaa3c1b78b29db216548364eb38d2219ab0` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-004_RELATORIO.md` | 5089 | `fd20b6b1e011317cab4fe5c8ba20bf6830a2c7d31ca528bb3146d5f3042e99e1` | Idêntico em bytes |
| `LIVRO-AMB-004_HANDOFF.md` | 2659 | `143591880b53aa7295249b12698c691b164bf97c30720d8d9faf7a975a5835a3` | Idêntico em bytes |

### LIVRO-AMB-005_AMB-07_PACOTE.zip

| Caminho interno | Bytes | SHA-256 | Comparação com avulso |
|---|---:|---|---|
| `LIVRO-AMB-005/LIVRO-AMB-005_AMB-07_COMPLETO.md` | 75375 | `8cf9b227e85caef1a5fecbe22cd9cc60e65a83e4297e5fe92faacdf9b0038bbf` | Idêntico em bytes |
| `LIVRO-AMB-005/LIVRO-AMB-005_AMB-07.pdf` | 142757 | `5a744d3710048646119f50f7ba0264477c94cbac3076d22229ce5bca69ce6c94` | Bytes diferentes; preservar ambos |
| `LIVRO-AMB-005/LIVRO-AMB-005_LEITOR.json` | 78662 | `ef7649a052cf1ed673d8029863988804204c499c00217512ba1a6b3fcb658793` | Idêntico em bytes |
| `LIVRO-AMB-005/LIVRO-AMB-005_CICLO_AIA.mmd` | 1409 | `1a2421b3970cc559920cd155158dc52996998bb90451b77eee8ebbf31fe4c5ff` | Idêntico em bytes |
| `LIVRO-AMB-005/LIVRO-AMB-005_CICLO_AIA.drawio` | 12190 | `f968afa06ebac0615eaf82bce9f89ebde63faeeaae9717193267d8e7878114a7` | Idêntico em bytes |
| `LIVRO-AMB-005/LIVRO-AMB-005_CASO_AGU.md` | 9487 | `b43e3baad479df88b7666bcca4d97526b7cf37a74072b707a4ba467319c936e2` | Idêntico em bytes |
| `LIVRO-AMB-005/LIVRO-AMB-005_QUESTOES.md` | 4988 | `3503360bd7b6d2676250dd7f3992e1194956e62b487b00b41697408f34462ee6` | Idêntico em bytes |
| `LIVRO-AMB-005/LIVRO-AMB-005_RECUPERACAO_ATIVA.md` | 4083 | `5830690c3afd58959c7b5d755dcfcdc803b79fa8ca366c3d65c0cf9e1c3e11e6` | Idêntico em bytes |
| `LIVRO-AMB-005/LIVRO-AMB-005_RELATORIO.md` | 3965 | `c35ed1edd5db268e3c2c4f56f6c0b5158479ab68c0eb3b7c36454bb152d058a1` | Idêntico em bytes |
| `LIVRO-AMB-005/LIVRO-AMB-005_HANDOFF.md` | 4027 | `49f221f276cef431a0866a8099ffa012b421538a0b849f3e6340abcb2be519f1` | Idêntico em bytes |
| `LIVRO-AMB-005/LIVRO-AMB-005_MANIFESTO.json` | 1879 | `9ad76a46038f157dea713f7bac67acf861704f2e8162a68ed98a4e5e4c741478` | Sem avulso com o mesmo nome |

### LIVRO-AMB-006_PACOTE_COMPLETO.zip

| Caminho interno | Bytes | SHA-256 | Comparação com avulso |
|---|---:|---|---|
| `LIVRO-AMB-006_RELATORIO_VERIFICACAO.md` | 10644 | `8a95ff74e0d088bdaaf86dbb9ea1acd95bc6531825cfe0499f471c5a356eb4df` | Idêntico em bytes |
| `LIVRO-AMB-006_HANDOFF.md` | 3597 | `689fd56917300fa762c21464ede6350a27e5c41d0c441038c2298d231d29d085` | Idêntico em bytes |
| `LIVRO-AMB-006_QUESTOES_E_RECUPERACAO.md` | 11573 | `b1d58c36f314992c0d420870dc144a389b3260394785530b47b46a69a6317114` | Idêntico em bytes |
| `LIVRO-AMB-006_AMB-08_LEITURA_COMPLETA.md` | 103225 | `bdffa0fdf1950362239d66a71b2f2e1f5fdcff0e6129070ecd6475031d750e09` | Idêntico em bytes |
| `LIVRO-AMB-006_AMB-08_LEITURA_COMPLETA.pdf` | 203764 | `a9a7c9a3adf1d5560b538910da32fd7b95fcac0018c1460ee0410833023ed61b` | Idêntico em bytes |
| `LIVRO-AMB-006_AMB-08_LEITURA.json` | 332497 | `100e91e5956909c170719f4244be3083d3bd36d48ed6785c85f94df67d3e4f97` | Idêntico em bytes |
| `diagramas/01-arquitetura-biodiversidade.mmd` | 776 | `a7b05fee2a18983492e38d91f0734e7f727773f4fe855e08caab9bde8d041509` | Sem avulso com o mesmo nome |
| `diagramas/02-decisoes-acesso-sisgen.mmd` | 1442 | `7b1bb149219eeb20bb6b1e8f40b0bc38c1b21ec3e8ff307b2c44568367957f61` | Sem avulso com o mesmo nome |
| `diagramas/03-reparticao-beneficios.mmd` | 949 | `6bd4361dd3bd2745c0d407680fb451a104bbbf3582cb8036f3de1cb280466504` | Sem avulso com o mesmo nome |
| `diagramas/04-ciclo-consultivo-agu.mmd` | 347 | `898787238f101e09bfb2b4156d5de3a88b4ad78b93cb7dad5f8ef62a189b3b8c` | Sem avulso com o mesmo nome |

### LIVRO-AMB-007_PACOTE_COMPLETO.zip

| Caminho interno | Bytes | SHA-256 | Comparação com avulso |
|---|---:|---|---|
| `LIVRO-AMB-007/FLUXO-01_Identificacao_Espacos.mmd` | 821 | `c35164c092dc9a97ec550daf8acc2d301f3e50f8e9f5e404a0fc74ea56da738b` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-007/FLUXO-02_Licenciamento_UC_Compensacao.mmd` | 1197 | `0e4edef512ebc1a6eb5f2d9a69d2ee0dedf1c32511552ff6ccdc0854f32eb7fb` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-007/FLUXO-03_Categorias_SNUC.mmd` | 697 | `2caad0fa722b0b95fe3373f31fb71e1737d72f40c919a8958fb4ccc09ac28c2d` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-007/FLUXOGRAMAS_EDITAVEIS.md` | 3221 | `5b78060fbb48106faf8aee33850ec4058d41ac67782217325902cb1a2cbf7e6c` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-007/HANDOFF_EDITORIAL.md` | 4755 | `7f88cdab9359e6d6e01c8e6f17adfd7af49a05de1cf9e45d8db847ec79ee674b` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-007/LEIA_ME_ENTREGAS.md` | 1417 | `12c3dee7eafe751c6971f6bbf92aa086c4e36430d2f56c39bec304772c1a5177` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-007/LIVRO-AMB-007_AGU_QUIZ.json` | 94744 | `9131bcf99d4f19bcc3e4bd72d62c616bb18dee9e3b03e28c1227452f0374c965` | Idêntico em bytes |
| `LIVRO-AMB-007/LIVRO-AMB-007_AMB09_AMB10_COMPLETO.md` | 91306 | `044c03fb767b9e6ea54b50383cc2abc22c4ba71b197838740919bf078ede5d1b` | Idêntico em bytes |
| `LIVRO-AMB-007/LIVRO-AMB-007_AMB09_AMB10_COMPLETO.pdf` | 153426 | `625d245dd7cac7d2c0398a2f9ef1f1227f83c6b78ac2f0f46990a3ba37805484` | Bytes diferentes; preservar ambos |
| `LIVRO-AMB-007/MANIFESTO_ARQUIVOS.json` | 2252 | `74f9553389ae88ff399f2eedef08f1647bdd7dd2a62a1e275b86d938cf1e5752` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-007/PARECER_AGU_CASO_RODOVIA.md` | 18609 | `d05632ae5edd0d7835369f906cfbfb6d7a250354864e1be84601806b9eb6c531` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-007/PARECER_AGU_CASO_RODOVIA.pdf` | 60420 | `280afb27852d7f4a43335eca31f0eb073a1427e6b598012c87e2e21e9b8df2c4` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-007/QUESTOES_AUTORAIS_COMENTADAS.md` | 6372 | `ada4acbd123a132a1c5c30bfbc6f9aca77e1e075d8805393e80d19bd58fc8900` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-007/RELATORIO_QUALIDADE.md` | 7010 | `d3e92a7fc26cef9911d6ba485800a8aa184ff2cfa73572cd37fdfbc1f56ab8ab` | Sem avulso com o mesmo nome |

### LIVRO-AMB-008_PACOTE_COMPLETO.zip

| Caminho interno | Bytes | SHA-256 | Comparação com avulso |
|---|---:|---|---|
| `LIVRO-AMB-008_RESPONSABILIDADES_COMPARADAS.csv` | 1861 | `b1392646541ef5bfd9045e724c7298a185b88b951ec78fb72de423f92e5dee3e` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-008_FONTES_RASTREAVEIS.json` | 12825 | `b003688b1371a841d3cb14b18014faffbd63eb67b2e1511d22ea59797cea5972` | Idêntico em bytes |
| `LIVRO-AMB-008_LEITOR_AGU.json` | 100918 | `5606cab9e1787d8499c0294de5278e0510f6b56a7056c0f53ccce96865d09673` | Idêntico em bytes |
| `LIVRO-AMB-008_TRANSICOES_2020_2026.csv` | 1170 | `6139f630a3a5bba73b2bae323ae422112d01783237736a5021c32ca8c997f646` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-008_MATRIZ_ESTRATEGICA_AGU_EDITAVEL.csv` | 2841 | `c3de59b454b399a933e67bbb18406217b518dfdc8426243f09bed8d637f69793` | Idêntico em bytes |
| `LIVRO-AMB-008_CASO_AGU_RESOLVIDO.md` | 9523 | `fbb1aa247d361a1a69c4a938e83f8878d2640fbb8042672a96af8834a2be7fd8` | Idêntico em bytes |
| `LIVRO-AMB-008_MANIFESTO.json` | 840 | `8fcbf43771803292d1d63c961cc67312420e1ef11eb58080614c52e269f39b77` | Sem avulso com o mesmo nome |
| `LEIA_ME_ENTREGA.md` | 2460 | `64151df15497d255064523edde025f78188c668645ff3946ffd85299b969dbcd` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-008_RECUPERACAO_ATIVA.md` | 4461 | `da12f2863703052d43b94f9c95a8ece082694cb8555df62ecf18836ee3c1287d` | Idêntico em bytes |
| `LIVRO-AMB-008_HANDOFF.md` | 3171 | `9ca7f94ad5b31ee00fd55cd5a0ea6a687d7525650183c1604c110ce4291d8b9c` | Idêntico em bytes |
| `LIVRO-AMB-008_CAPITULO_INTEGRAL.md` | 97078 | `e431ccbf1def7175d0bbee965b85d56d21801911546d1c9be972fa29d6856daa` | Idêntico em bytes |
| `LIVRO-AMB-008_RELATORIO_JURIDICO.md` | 6720 | `6baf98b515726ef12906d3d44c318e544fdd1d2b2a4e6201975a6e2d3c673ccf` | Idêntico em bytes |
| `LIVRO-AMB-008_QUESTOES_AUTORAIS_COMENTADAS.md` | 8191 | `cf25ae504727a10a6478c5dd853d6bfe1dd7e7ee8faa5aca011a9b2b32609d9c` | Idêntico em bytes |
| `LIVRO-AMB-008_COBERTURA_CURRICULAR.csv` | 1212 | `eb507a2f4e06f0b4471dcd1c6f26d3484cd3a7b96c0208ab660f022a349d3641` | Sem avulso com o mesmo nome |
| `LIVRO-AMB-008_CAPITULO_INTEGRAL.pdf` | 222253 | `35ae295134c588c11eb82ed2a2d368741fb4dee737c14abaad25eae18ac49ce1` | Idêntico em bytes |


## Lacunas e contabilidade final

**Livros 001–008 não encontrados: zero.** Há uma edição antiga publicada e oito manuscritos atuais pendentes de integração/aprovação, contando a ampliação de 001 separadamente. O planejamento antigo de nove posições não autoriza afirmar nove obras novas concluídas.

As capturas históricas citadas pelo usuário não estavam anexadas em bytes nesta execução; seus números foram tratados como referência relatada e conferidos no aplicativo atual. O histórico completo de todos os chats não está disponível como fonte sincronizada. Não se certificou a ausência de arquivos em serviços não indicados/não consultados nem em referências remotas não anunciadas pelo GitHub. A busca acessível encontrou todos os oito alvos, dispensando recriação.
