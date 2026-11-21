# AGU Quiz | LIVROS-LEIT-001 — Leitura integral com ritmo ajustável

**Data:** 20/11/2026. **Produto:** `Talksxb/agu-quiz`, leitor público do GitHub Pages. **Branch:** `feature/livros-leitura-001` (não confundir com `main` até integração formal).

## Missão e escopo
Disponibilizar livros originais de LGPD, Direito Administrativo e espaço para Direito Ambiental no mesmo fluxo de leitura do laboratório, **sem reduzir capítulos a textos curtos**, sem importar o repositório privado de auditoria, sem alterar registros de domínio do usuário e sem sincronização presumida.

## Inventário reproduzível
| Livro | ID editorial | ID curricular | Origem | Formato usado no leitor | Integridade da origem |
|---|---|---|---|---|---|
| LGPD aplicada à Administração Pública | LIVRO-DIG-001 v2.0 | ADM-64b | PDF 24 p., 20/11/2026 | Texto integral extraído, por página | 24/24 páginas conferidas, início e encerramento presentes; diferenças tipográficas possíveis |
| Responsabilidade patrimonial do Estado | LIVRO-PIL-001 v1.0 | ADM-53 | PDF 20 p., 18/11/2026 | Texto integral extraído, por página | 20/20 páginas conferidas, início e encerramento presentes; diferenças tipográficas possíveis |
| Agentes públicos | LIVRO-ADM-002 v1.0 | ADM-54 | Markdown 17 seções, 18/11/2026 | Markdown integral preservado por seção | Reconstrução exata dos blocos do texto de origem conferida |
| Direito Ambiental | LIVRO-AMB-001 (proposta) | **a definir pelo edital/matriz** | Nenhum capítulo completo encontrado | **Não publicado** | Não confundir auditoria normativa AMB-01–11 com livro pronto |

### Verificação e status
- Fonte jurídica editorial: cada livro preserva declarações de fontes e lacunas já existentes. Corte documental histórico de auditoria 04/11/2026 não equivale à atualização de 20/11/2026. **Nenhum livro foi certificado integralmente**.
- Arquivos da biblioteca: `livros/{lgpd-adm64b,adm-53,adm-54}.json` com metadados, tamanho total e conteúdo integral em páginas/seções.
- PDF: dados extraídos com quebra de páginas. Gráficos, tabelas visuais e paginação tipográfica não são assegurados; o PDF original deve permanecer a referência para conferência de diagramação.
- Não foram consultados neste trabalho novos precedentes para modificar conclusões jurídicas; esta sprint é de **transposição técnica** e não reauditoria substantiva das obras.

## Experiência implementada
- Cartão `Livros · Leitura guiada AGU` na Biblioteca Inteligente e link no Laboratório existente.
- Leitura contínua ou guiada por blocos de sentido; controle de ritmo 80–350 palavras/minuto, pausa, retorno e consulta do texto integral. Nenhum bloqueio do capítulo por perguntas.
- Navegação direta por página/seção, retomada local, contagem de páginas marcadas como concluídas, tempo efetivo por trecho e estimativa de palavras por minuto. Marcação é **manual** e não certifica leitura integral ou domínio.
- Uma recuperação livre opcional no fim, **não persistida**; não atribui automaticamente nota ou domínio.
- Persistência segregada exclusivamente em `agu_livros_reader_v1`. Nada toca `agu_quiz_mvp1_2026` ou as chaves históricas; não há login, API, rastreamento, sincronização externa nem vínculo automático com Caderno AGU/GPT Sites.
- Livros são públicos após deploy em GitHub Pages; não hospedar arquivos confidenciais do repositório privado, questões com licenças restritas ou dados pessoais.

## Qualidade e portões
- `tests/livros-leit-001-validacao.js`: integralidade observável (páginas, início/fim, volume de palavras), sintaxe, navegação editorial e hash legado.
- `tests/livros-leit-001-browser.cjs`: Chromium em 320/390/768/1280px; Biblioteca → Livros, LGPD íntegra, modo guiado, pausa/retorno, persistência após reload, último trecho, axe-core e overflow; ADM-54/ADM-53 em celular emulado.
- CI: testes Node e Chromium na PR; execução também contra a URL do GitHub Pages após merge.
- Pendências: Android físico com TalkBack, VoiceOver em iOS, qualidade de diagramação da transcrição extraída dos PDFs, cotejo jurídico atualizado específico de Direito Ambiental, avaliação pedagógica longitudinal.
- Merge/publicação somente após CI verde. Não declarar que o conteúdo ambiental existe enquanto não houver obra original e verificação editorial.

## Próxima tarefa independente
`LIVRO-AMB-001`: selecionar uma **unidade curricular literal** a partir da matriz verificada, produzir capítulo ambiental completo conforme `AGU_BASE_MESTRA_v5.2_FINAL` e `AGU_PADRAO_LEITURA_COMPLETA_v1.1_FINAL`, com problema gerador, direito positivo, jurisprudência pontual, requisitos, exceções, caso AGU resolvido, questões autorais, fontes e lacunas; entregar Markdown autoral e PDF quando apropriado. Somente depois publicar no dataset.


## Atualização — LIVRO-AMB-001 / integração da edição final (21/11/2026)

**Repositório de publicação:** `Talksxb/agu-quiz` · branch `feature/livro-amb-001-leitura` (antes da mescla).

**Fonte editorial recuperada:** `LIVRO-AMB-001_Leitura_Responsiva.html` (Biblioteca do projeto), edição 20/11/2026. O título e conteúdo demonstram que se trata de **Competências e Cooperação Ambiental**, com foco no ID **AMB-03**, e não de cobertura integral de todos os tópicos ambientais.

**Tratamento editorial e integridade:**
- `livros/livro-amb-001-original.html`: cópia literal do HTML responsivo, sem scripts e com os quatro elementos SVG e os quadros visuais preservados. Git blob SHA do original `b12e615a3afe3762ead34455e6d25aeb1d4fce81` registrado em teste de regressão.
- `livros/amb-03.json`: transposição textual por 17 seções de título, com aproximadamente 9,4 mil palavras para os modos contínuo e guiado. A transposição não deve ser tratada como reprodução gráfica idêntica: o botão `Abrir edição original responsiva` assegura a consulta aos diagramas e quadros.
- `livros-agu.html`: novo cartão habilitado para AMB-03, deep link `?livro=amb-03`, ritmo regulável e persistência na chave já existente `agu_livros_reader_v1` sem migração destrutiva.
- Não confundir AMB-03 com os demais AMB-01–11. Não houve reauditoria das alterações legislativas ou da jurisprudência contida na versão editorial; permanece a declaração de fontes, datas e limitações do próprio livro.
- A origem do conteúdo é um documento autoral já preparado para publicação, e não um espelho do repositório privado de auditoria. Nunca incluir evidências privadas ou marcas pessoais.

**Validação exigida:** ampliar os testes existentes `tests/livros-leit-001-validacao.js` e `tests/livros-leit-001-browser.cjs`, já executados na CI; conferir fonte literal por hash, carregamento 17/17 seções, leitura guiada, pausa, retorno, progresso local segregado, acesso ao original, responsividade e axe-core em viewport móvel. Antes do merge, exigir jobs CI verdes. Após merge, confirmar build/deploy do GitHub Pages e jornada pública automática.

**Lacunas não resolvidas pela integração:** teste físico Android/TalkBack; cotejo jurídico substantivo posterior à edição; acessibilidade das figuras SVG na edição original e revisão visual da conversão Markdown; estudo do aluno e avaliação das respostas de recuperação. A leitura continua não certificando domínio.
