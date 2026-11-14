# LEG-01 — inventário e infraestrutura mínima

13/11/2026, America/Sao_Paulo. Corte: `main` `32d580b4a37c4d21cde2afde69cecdb6bbe8c88f` (S36 documental, código S35). Branch própria `leg/leg01-inventario`; [PR #2](https://github.com/Talksxb/agu-quiz/pull/2), implementação `4df6dc25d3b2613efa598a12286bb4168ae5f230`. LEG-02 não executada.

## Estado e recuperação histórica

- Branches remotas conferidas: `main` e `work/plataforma-pessoal-01`; nenhuma PR aberta no corte. PR #1 já integrada (`4fa4d295`), sem alteração nesta série. Histórico Git percorrido desde `29a095f` e documentação S13–S36 consultada, com leitura dos contratos/limites de Leitor, Consolidação, Estudo e Backup. A árvore da auditoria privada foi pesquisada apenas por nomes da Sprint 4/HTML; nenhum correspondente, nenhum conteúdo privado copiado.
- Original **AGU_QUIZ_04_FEEDBACK_JURIDICO.html** localizado e lido integralmente (174 linhas, 60.108 bytes informados). Seu texto, desconsiderando espaços finais, coincide com `index.html` do primeiro commit público [`29a095f`](https://github.com/Talksxb/agu-quiz/blob/29a095f/index.html). Não é necessário republicar outra cópia do HTML. A equivalência observada é textual, não certificação jurídica.
- O nome “04” identifica a versão histórica recuperada; não foi encontrado checkpoint autônomo que demonstre todas as tarefas de uma sprint numerada 4. Não se inferiu um corpus integral a partir desse nome.
- Fonte publicada real: https://talksxb.github.io/agu-quiz/ — HTTP 200 e HTML idêntico ao baseline `main` no início. Deploy `43506721401` aprovado; CI de código anterior `43494607030` aprovado sobre `af5d820d`. Essas são evidências anteriores à LEG-01.

## Normas da versão 04 recuperada

| Norma | Fonte/posição no HTML histórico | Dispositivos e formato encontrado | Literal verificável no arquivo? | Vínculo e leitor atual | Ação |
| --- | --- | --- | --- | --- | --- |
| Lei 9.784/1999 | `sourceAdm`, `Q` a1/a2/adm8; `LEGAL_EVIDENCE` a1/a2/adm8; Planalto e Câmara | Referência aos arts. 11–15; explicações do art. 11 e art. 13, I/II | **Não** como artigo integral: são paráfrases/enunciados pedagógicos, com URL para confronto | Tema legado ADM/Atos e Processo administrativo; S13 já incorporou arts. 11–15 | Reutilizar IDs/textos S13 e verificar a ampliação na LEG-02 |
| LC 101/2000 — LRF | `sourceLrf`, Q f1/f2/fin5; `LEGAL_EVIDENCE` f1/fin5; [Planalto](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm) | Art. 1º, §1º; art. 2º, III; resumos e referência aos arts. 1º/2º | **Não**: não há artigos transcritos integralmente | Tema FIN/Lei de Responsabilidade Fiscal; não incorporada ao leitor | Recuperar as referências, incorporar texto em sprint futura |
| LINDB, sem identificação numérica explícita | `D` e Q `civ1` | Marcador curricular e explicação genérica de consequências práticas | Não; sem dispositivos indicados nem URL própria | Tema CIV/LINDB; fora do leitor | Identificar fonte e escopo antes de importar |

Não se encontrou outra lei identificada no HTML 04. Constituição/poder constituinte aparecem como conteúdo conceitual, sem acervo da CF/ADCT. Não se atribui texto legal a esses marcadores.

## Inventário consolidado posterior (código público e documentos)

**Legenda:** I = norma integral; A = artigo isolado; E = excerto; R = resumo pedagógico; F = referência. Nenhuma norma está em I. Contagens atuais: **2 normas, 10 artigos, 24 unidades; 7 A e 3 E**. A denominação A descreve o escopo da seleção, não cotejo literal novo.

| Norma | Presença e localização verificável | Fonte oficial existente / vínculo | Falta / decisão |
| --- | --- | --- | --- |
| CF/1988 | A: arts. 131/132. E: art. 37 caput/X e art. 49 V. `dados/legislacao-s13.js`. R/F adicionais em `index.html`, Revisão, flashcards e questões | [Câmara](https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html); ADM-27, CON-50/51. Outros cartões referenciam art. 60 e art. 84, parágrafo único | Reutilizar seleção; quase toda CF fora do leitor. Sem alegação de CF integral |
| ADCT | Ausente do corpus e da versão 04; não identificado como acervo estruturado nos arquivos examinados | Nenhum vínculo granular importado | Planejar como estrutura/namespace distinto da CF permanente; não inventar artigos |
| Lei 9.784/1999 | A: 11,12,13,14,15. E: 50 caput/I/§1º. R/F: também 2,17,55 em Revisão/cartões | [Câmara](https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html); ADM-06/17 e temas adicionais nos cartões | LEG-02: incorporar faltantes e completar art. 50; preservar os 15 IDs atuais |
| LC 101/2000 | R/F em `index.html`, `sourceLrf`, Q f1/f2/fin5; nenhum dispositivo no leitor | Planalto acima; FIN/LRF (tema legado, não ID certificado) | Texto integral ausente; adicionar posteriormente |
| Lei 13.105/2015 — CPC | R/F dos arts. 4,9,10,12,15,489 em `index.html`, `revisao-inteligente.js`, `dados/flashcards-aud03-lote01.js` | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105compilada.htm) e Câmara; cartões PC-03, banco legado PC | Nenhum texto no leitor; reutilizar referências, não converter comentários em lei |
| LC 73/1993 | R/F dos arts. 1º–4º e 12 em `dados/relacoes-juridicas-s14.js`, cartão `aud03-flc-014`, questão S18 | [Câmara](https://www2.camara.leg.br/legin/fed/leicom/1993/leicomplementar-73-10-fevereiro-1993-354947-normaatualizada-pl.html); CON-50 | Complemento relacionado, não lei transcrita; ampliar em sprint própria |
| DL 200/1967 | R/F arts. 19,20 e 26 IV; cartões `aud03-flc-004/005` | [Câmara](https://www2.camara.leg.br/legin/fed/declei/1960-1969/decreto-lei-200-25-fevereiro-1967-376033-normaatualizada-pe.html); ADM-13 | Não está no leitor; incorporar depois |
| Lei 13.848/2019 | R/F art. 3º; cartão `aud03-flc-006` | [Câmara](https://www2.camara.leg.br/legin/fed/lei/2019/lei-13848-25-junho-2019-788523-normaatualizada-pl.html); ADM-13 | Não está no leitor; incorporar depois |
| Lei 4.717/1965 | R/F art. 2º, parágrafo único d/e; cartão `aud03-flc-007` | [Câmara](https://www2.camara.leg.br/legin/fed/lei/1960-1969/lei-4717-29-junho-1965-377818-normaatualizada-pl.html); ADM-23 | Não está no leitor; incorporar depois |
| Decreto 12.540/2025 | R/F Anexo I, arts. 25 II/30 II, `INLINE_ADAPTED['of-2015-adv-001']` na Revisão | [Anexo oficial Câmara](https://www2.camara.leg.br/legin/fed/decret/2025/decreto-12540-30-junho-2025-797673-anexo-pe.pdf); referência legada, questão bloqueada para nova correção | Não é transcrição. Preservar bloqueio histórico Q1; não usar decreto de 2025 para provar resposta de 2015 |
| Lei 13.256/2016 | F como ato modificador do CPC no verso `aud03-flc-010` | Remissão ao CPC; sem URL própria no cartão | Somente referência, sem texto ou importação; futura cadeia de alterações |
| Lei 9.868/1999 | F art. 16 em `docs/AUDITORIA_QUESTOES_2026-11-10.md`, linha da Q1/2023 | Registro documental; não há corpus ou URL normativa própria nesse quadro | Localizar fonte antes de incorporar; não inferir ID curricular granular |
| EC 19/1998 | F histórica em `dados/questoes-auditadas-s19.js`, `historicReason` Q9 | Remissão à CF, ADM-27 | Não é texto da emenda; futura cadeia de versões |
| LINDB | R/F em marcador CIV e Q `civ1` do `index.html` | Sem artigo/URL próprios nessa ocorrência | Identificação e texto ausentes; não preencher com suposição |

As URLs nas linhas acima são as **referências existentes**; não se afirma consulta/vigência atual de todas. Na LEG-01 abriram-se as páginas oficiais da CF e Lei 9.784 para conferir a proveniência e os rótulos estruturais utilizados. Não houve cotejo integral, certificação ou captura de outras leis. Os 18 registros de `versoes-normativas-s17.js` cobrem parte das 24 unidades; não há série histórica completa.

## Contrato e intervenção delimitada

Mantido `agu-legal-reader-v1`, com campos aditivos (`catalogContract=agu-legislation-leg01-v1`). Não há outro leitor, servidor, banco ou framework.

| Camada | Campos / garantia |
| --- | --- |
| Norma | `id,title,kind,number,year,source,sourceAuthority,checkedOn,sourceVersion,textVersionId,contentCoverage` |
| Texto e auditoria | `textVerification.status/checkedOn/scope` separado de `auditStatus`; `legacy_point_check` preserva a origem da conferência passada sem revalidação fictícia |
| Estrutura | `structure[]` com `id,kind,parentId,label`; aceita livro/título/capítulo/seção/subseção/anexo; `article.structurePath` aponta à árvore sem duplicar texto |
| Dispositivos | Arrays ordenados `articles/clauses`, IDs existentes, `contentKind=isolated_article|excerpt`, `kind,parentId` dos dispositivos; incisos/alíneas podem apontar ao pai correspondente |
| Integralidade futura | `contentCoverage=integral` exige ausência de excertos, cotejo `compared/full_norm`, manifesto `completeness.expectedArticleIds/checkedOn/sourceDigest/annexes`. Validação estrutural não prova por si só fidelidade à fonte ou vigência |
| Currículo e persistência | Manter `article.topic` e todos os IDs antigos; novos artigos podem ter `topic:null`. Leitura/comentários funcionam; sessão e Caderno contextual aguardam vínculo documentado. Nenhum ID curricular fabricado |

`lib/catalogo-legislativo.js` valida esse contrato em CI, sem rede ou escrita. Rejeita IDs duplicados, ciclos, fonte não oficial, excerto declarado integral, remoção/remapeamento legado e mudança de texto sem nova versão. A compatibilidade é comparada ao manifesto de hashes dos 24 textos originais (`tests/fixtures/leg01-identidade-s36.json`).

Adaptações do produto: metadados no corpus; aviso de norma parcial e caminho estrutural no leitor existente; busca respeita texto explicitamente pendente; Estudo/Caderno contextual não criam registros inválidos para artigos ainda sem currículo. IDs, textos, questões, anotações e formatos de backup não foram migrados. Os scripts alterados têm cache `20261113-leg01`.

Limites preservados: comentários por ID, 500 chaves de notas por categoria no backup, 12 MB UTF-8 e restauração somente em categorias ausentes. Acrescentar artigos preserva notas; retirar/renomear IDs pode invalidar restauração e reinicializar o leitor legado, portanto é vedado pelo teste de compatibilidade. Uma atualização de redação mantém ID lógico e muda versão; preservar todas as versões históricas ainda depende de trabalho posterior.

## Validação e disponibilidade

Node local v24.22.1: **LEG-01 18 verificações**, WORK01 14, S19/S20/S25–27/S29–35 aprovados. LEG-01 cobre catálogo, hierarquia, distinção A/E/I, texto/IDs/vínculos imutáveis, ampliação sintética sem currículo, busca pendente, notas antigas/novas e restauração idempotente. Teste Chromium adicionado para cinco larguras e duas ampliações sintéticas; resultado remoto/commit/PR registrados na descrição da PR. Nenhum dispositivo sintético integra o corpus publicado.

Não se declara Android físico, TalkBack, cotejo literal integral, backup histórico pessoal ou publicação da branch. O site de main continua disponível; a LEG-01 permanece em PR até revisão/integração. Próxima tarefa exclusivamente: `docs/PROMPT_LEG-02.md`.
