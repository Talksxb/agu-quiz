# MÉTODO-AGU-007 — revisão do gate editorial de LIVRO-AMB-002 / AMB-04

**Data de execução:** 23/11/2026, America/Sao_Paulo. **Escopo exclusivo:** revisão documental e jurídica pontual de um capítulo existente, sem integração, merge, publicação, aprovação de cartões ou atualização de aprendizagem.

## 1. Checkpoint de partida e governança

- `Talksxb/agu-quiz`, `main` reconfirmada em **`1191267482ace4429cfd9d5f559a626461b29493`**, árvore **`e41fac8fb57e6790b83ceea878a907a3c6aa2552`**; PRs [#79](https://github.com/Talksxb/agu-quiz/pull/79) e [#80](https://github.com/Talksxb/agu-quiz/pull/80) estão integradas. A CI da main [45230341092](https://github.com/Talksxb/agu-quiz/actions/runs/45230341092) e deploy Pages [45230340034](https://github.com/Talksxb/agu-quiz/actions/runs/45230340034) constam como `completed/success` para esse HEAD.
- [PR draft #81](https://github.com/Talksxb/agu-quiz/pull/81), referente ao MÉTODO-AGU-006, permanece aberta sem merge, HEAD **`602faa1a4a019e8dd8e06e780499f9c1b974c33e`**, CI [45249775773](https://github.com/Talksxb/agu-quiz/actions/runs/45249775773) `completed/success`. Seu checkpoint `docs/CHECKPOINT_METODO-AGU-006.md` foi lido na própria branch.
- Esta branch **não parte da PR #81**, para não incorporar uma frente não mesclada por conveniência. Contém apenas documentação do MÉTODO-AGU-007, mantendo o catálogo e todo o site iguais à main.
- Lidos diretamente na main: `livros/editorial/catalogo.json`, `livros/colecoes/ambiental.json`, `livros/editorial/amb-03.json`, `schemas/metodo-agu/capitulo.schema.json`, `scripts/metodo-agu.cjs`, `docs/METODO_AGU_001_INGESTAO.md` e `docs/AGU_PADRAO_EDITORIAL_CAPITULOS_v1.md`. Os quatro documentos finais do Projeto (Base Mestra 5.2; Leitura Completa 1.1; Caderno/Handoff 2.1; Leia-me Primeiro 2) foram abertos localmente e seus limites aplicados.
- Fonte curricular: edital Cebraspe nº 1/2022, item 17.2.1, p. **42 impressa**, inspecionado no PDF em 23/11/2026: https://cdn.cebraspe.org.br/concursos/AGU_22_ADVOGADO/arquivos/ED_1_2022_AGU_ADVOGADO_ABERTURA.PDF . **AMB-04** é a unidade curricular; **LIVRO-AMB-002** é o número editorial; `amb-04` é o ID técnico projetado. Não renumerar por semelhança lexical.
- A auditoria privada `Talksxb/agu-auditoria` **não foi consultada diretamente** neste lote; informações de 25 registros do AMB-04 (18 pontuais, 2 parciais, 5 pendentes; corte histórico 04/11/2026) permanecem apenas **declarações do relatório de origem**, não reconfirmação atual de checkpoint ou certificação integral. O Caderno de aprendizagem não foi alterado; domínio não aferido.

## 2. Arquivos efetivamente localizados, integridade e impossibilidade de hash canônico

Arquivos indexados na Biblioteca/Arquivos do Projeto, lidos por extração de texto:

| Arquivo | Tamanho nominal da Biblioteca | Inspeção em 007 | SHA-256 do arquivo original |
|---|---:|---|---|
| `LIVRO-AMB-002.md` | 88.101 bytes | íntegra textual recuperada, **412 linhas**, título e edição 1.0 (22/11/2026); 21 seções numeradas, 4 blocos Mermaid, tabelas, parecer, 10 questões autorais, 10 perguntas de recuperação e referências F1–F20 | **não obtido** |
| `LIVRO-AMB-002.json` | 92.236 bytes | estrutura JSON recuperada e parseada, `id=amb-04`, `curricular_id=AMB-04`, **27 páginas** com textos e títulos | **não obtido** |
| `LIVRO-AMB-002_HANDOFF_EDITORIAL.md` | 4.043 bytes | leitura textual integral, 36 linhas; informa produção e **publicação não autorizada** | **não obtido** |
| `LIVRO-AMB-002_FONTES_E_QUALIDADE.md` | 10.637 bytes | leitura textual integral, 67 linhas; aptidão para **estudo**, não assinatura de ingresso | **não obtido** |
| `LIVRO-AMB-002.pdf` | 215.210 bytes | documento identificado, mas **inspeção visual não concluída** | **não obtido** |

Uma nova tentativa de materializar os cinco arquivos como `raw_file` devolveu **`This Project file does not have an authorized raw-byte materialization path`** para todos. Também falhou a requisição de leitura de página/imagem do PDF no serviço de Arquivos; o PDF não foi substituído pelo Markdown como alegada prova visual. **Não foi criado SHA-256 hipotético ou calculado hash da string indexada com o nome de hash de arquivo original.** Nenhum recurso separado `.mmd` ou ativo binário do livro foi comprovado acessível neste lote; quatro blocos Mermaid textuais estão no Markdown. Os arquivos canônicos permanecem fora do GitHub.

**Cotejo textual da extração, reproduzido em 007:** a concatenação sem delimitadores de `pages[].text` do JSON recuperado tem **84.628 caracteres**; o Markdown extraído tem **84.627 caracteres**. Teste lógico `join(pages[].text, '') === markdown + '\n'`: **verdadeiro**. Os 21 cabeçalhos numerados, 4 aberturas `\\`\\`\\`mermaid`, títulos de questões e recuperação e 20 âncoras [F1]–[F20] estão presentes. Esse cotejo demonstra **igualdade textual dos dois fluxos recuperados, com um LF final adicional no JSON**, não equivalência byte a byte do original nem fidelidade do PDF renderizado. Há 15 linhas de tabela em Markdown; legibilidade/diagramação final das tabelas e dos fluxos permanece a conferir.

**Critérios de artefato original ainda não satisfazíveis:** tamanho original verificável, normalização de fim de linha/charset, hashes por arquivo, hashes dos ativos, PDF renderizado e conferido com a fonte e matriz de equivalência visual. Não foi realizado teste do compilador para AMB-04: o catálogo atual não registra esse capítulo e o gate do schema exige entrada aprovada.

## 3. Portão de publicação examinado no código real

- `livros/editorial/catalogo.json` contém quatro capítulos aprovados, incluindo apenas `amb-03` em Ambiental. O manifesto `livros/colecoes/ambiental.json` mantém nove posições, `LIVRO-AMB-002/AMB-04` **produzido / revisão pendente / não publicado**, e `LIVRO-AMB-003/AMB-05` igualmente não publicado.
- `schemas/metodo-agu/capitulo.schema.json` exige `approval.status='aprovado'`, `approval.inputSha256` de 64 caracteres hexadecimais e `approval.record` não vazio. O compilador `scripts/metodo-agu.cjs` calcula `inputHash` sobre **Markdown + metadados sem aprovação + hashes dos bytes de figuras** e rejeita `inputSha256` divergente, mesmo quando a forma do schema for válida.
- A aprovação anterior de `amb-03` corresponde a migração de **edição já pública** com record e hash próprios. Não serve para AMB-04.
- **Nenhum documento de aprovação expressa da edição 1.0 de AMB-04 com hash de entrada e revisão identificável foi encontrado** entre o handoff, o relatório, os arquivos da Biblioteca e os metadados consultados na main. A avaliação `apto para estudo` do relatório de qualidade não atende esse gate. O comando do usuário para executar 007 **não substitui a decisão editorial**.
- `approval.status='pendente'` não passaria no schema de **capítulo de publicação**: por isso, corretamente, **não foi criado `livros/editorial/amb-04.json`, nem incluída sua rota no catálogo**. Não se simulou `aprovado`, nem se acrescentou uma entrada falsa ao indexador.

## 4. Matriz de confrontos oficiais em 23/11/2026

O estudo de direito positivo é **pontual e independente**, sem proclamar exame integral da vigência, retificações e jurisprudência. URLs abaixo efetivamente abertas/consultadas:

| Segmento literal do AMB-04 | Texto da edição 1.0 revisado | Fontes oficiais consultadas e conteúdo confirmado | Risco / pendência de publicação |
|---|---|---|---|
| Poder de polícia e Direito Ambiental | §§ 2–3, 11–14, caso §16 | Constituição, arts. 23/24/30/225: https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm ; LC 140/2011, arts. 13–17: https://www2.camara.leg.br/legin/fed/leicom/2011/leicomplementar-140-8-dezembro-2011-611919-normaatualizada-pl.html ; ADI 4.757, STF: https://portal.stf.jus.br/processos/listarProcessos.asp?classe=ADI&numeroProcesso=4757 | **MÉDIO**, elevado a **ALTO** no confronto com art. 65. A ADI 4.757 interpreta a LC 140, não julga automaticamente o dispositivo superveniente da lei geral. |
| Licenciamento ambiental | §§ 4–8, 14–16 | Lei 15.190/2025 consolidada, arts. 1, 4–5, 14, 18, 22, 47, 60, 65, 67: https://www2.camara.leg.br/legin/fed/lei/2025/lei-15190-8-agosto-2025-797833-normaatualizada-pl.html ; Lei 15.300/2025, arts. 2–5: https://www2.camara.leg.br/legin/fed/lei/2025/lei-15300-22-dezembro-2025-798529-publicacaooriginal-177503-pl.html | **ALTO**: art. 65 (restabelecido após derrubada de veto e publicado em 08/12/2025), LAC/LAE, regulamentação e controle constitucional. Art. 60: procedimentos novos para processos iniciados depois da vigência; nos já iniciados, obrigações/cronogramas da etapa atual até conclusão, etapas seguintes sob a nova lei. Sem provar decreto setorial ou resultado futuro de ADI. |
| Compensação ambiental | § 9 e caso § 16 | Art. 36 da Lei 9.985/2000: https://www2.camara.leg.br/legin/fed/lei/2000/lei-9985-18-julho-2000-359708-normaatualizada-pl.html ; Decreto 4.340/2002, arts. 31–31-B e destinação: https://www2.camara.leg.br/legin/fed/decret/2002/decreto-4340-22-agosto-2002-451270-normaatualizada-pe.html ; STF ADI 3.378, decisão final em 09/04/2008 e ementa oficial: https://portal.stf.jus.br/peticaoInicial/verPeticaoInicial.asp?base=ADI&numProcesso=3378 | **MÉDIO**: piso legal automático de 0,5% foi invalidado; manter distinta fórmula regulamentar `CA = VR × GI` e sua metodologia. Embargos/modulação e alcance histórico completo não revistos neste lote. |
| Biossegurança | § 10 | Lei 11.105/2005, arts. 1–3, 8–16, CNBS/CTNBio e entidades setoriais: https://www2.camara.leg.br/legin/fed/lei/2005/lei-11105-24-marco-2005-536209-normaatualizada-pl.html | **MÉDIO**: descrição institucional compatível no recorte, mas regulamentos da CTNBio, decisões por tipologia e atos recentes não exauridos. |
| Infrações ambientais | §§ 11–14, 16 | Lei 9.605/1998, arts. 60, 67, 70–75: https://www2.camara.leg.br/legin/fed/lei/1998/lei-9605-12-fevereiro-1998-365397-normaatualizada-pl.html ; Decreto 6.514/2008 consolidado: https://www2.camara.leg.br/legin/fed/decret/2008/decreto-6514-22-julho-2008-578464-normaatualizada-pe.html ; STJ EREsp 1.318.051/RJ (responsabilidade administrativa subjetiva): https://www.stj.jus.br/sites/portalp/Paginas/Comunicacao/Noticias-antigas/2019/Primeira-Secao-consolida-entendimento-de-que-responsabilidade-administrativa-ambiental-e-subjetiva.aspx | **MÉDIO/ALTO**: separação subjetiva administrativa versus objetiva civil confirmada no recorte. Alterações penais do art. 62 da Lei 15.190 devem considerar aplicação temporal; prazos e tipificações administrativas dependem da infração concreta. |

**Pontos sensíveis confrontados no texto recuperado (sem reescrita da edição 1.0):**

1. **Condicionantes**: § 6 do livro corresponde à hierarquia prevenção → mitigação → compensação do art. 14 da Lei 15.190; o § 1º exige nexo técnico e proporcionalidade. Sem afirmar transferência automática de serviços públicos ao empreendedor.
2. **Transição**: § 7 reflete o art. 60, parágrafo único, I e II. Não aplicar procedimentos da nova lei retrospectivamente à etapa concluída, nem preservar indefinidamente o regime antigo.
3. **Fiscalização e art. 65**: §§ 8/14/15 registram a literalidade da prevalência técnica e a tensão com LC 140 e ADI 4.757, sem proclamar solução jurisdicional posterior. O art. 65, incisos I e II e parágrafo único, foi lido na consolidação da Câmara; seu alcance constitucional **continua risco alto**.
4. **Ações de controle da Lei 15.190**: a página oficial de ADI **7.913**, ADI **7.916** e ADI **7.919** traz inclusão de mérito na sessão virtual **27/11 a 04/12/2026**, datas ainda futuras em 23/11/2026. Não declarar julgamento final ou suspensão total. URLs: https://portal.stf.jus.br/processos/listarProcessos.asp?classe=ADI&numeroProcesso=7913 ; https://portal.stf.jus.br/processos/detalhe.asp?incidente=7473191 ; https://portal.stf.jus.br/processos/listarProcessos.asp?classe=ADI&numeroProcesso=7919 .
5. **Compensação**: § 9 corresponde à ratio essencial da ADI 3.378; não confundir o antigo **piso legal** declarado inconstitucional com o **teto técnico regulamentar** do GI.
6. **Sanções**: § 11 e § 15 distinguem corretamente responsabilização administrativa subjetiva de reparação civil objetiva, conforme entendimento STJ. O exame não corresponde a inventário de todos os julgados posteriores.
7. **Edital**: a literalidade de AMB-04 foi comprovada visualmente na p. impressa 42 do Edital nº 1/2022; **inventário de todas as retificações do concurso não executado**. O capítulo não pode receber selo de cobertura curricular integral certificada.

## 5. Fidelidade, aprovação e decisão

| Gate | Achado | Decisão |
|---|---|---|
| Identidade e escopo | LIVRO-AMB-002 / AMB-04 / `amb-04`, edição 1.0; cinco subitens com posições efetivamente encontradas | **identificado** |
| Integridade textual do extrato | Markdown recuperado (84.627 caracteres) = concatenação das 27 páginas do JSON, exceto LF final; 21 seções, 4 Mermaid, 20 remissões e questões presentes | **confirmado somente para texto extraído** |
| Integridade de bytes/ativos | Fonte bruta inacessível, PDF visual não inspecionado, figuras exportadas separadas não aferidas | **pendente impeditivo** |
| Atualidade jurídica da edição | Confrontos primários pontuais em 23/11/2026; art. 65 e ADIs em curso; regulamentos e retificações não exauridos | **parcial, risco alto localizado** |
| Aprovação editorial independente | Não há assinatura/decisão por aprovador e `inputSha256` conforme schema/compilador | **pendente impeditivo** |
| Teste pipeline AMB-04 | Sem pacote de fonte original aprovado, sem entrada no catálogo | **não executado, condicionado** |
| Estado de aprendizagem | Nenhuma resposta, Caderno ou progresso novo | **não medido** |

**Decisão final: NÃO HABILITAR O INGRESSO DE AMB-04 NESTA ETAPA.** A obra é apropriada para leitura privada no escopo delimitado (conclusão de origem), mas falta demonstração de integridade canônica **e** aprovação editorial expressa conforme o contrato de compilação. Não se deve gerar um `inputSha256` sobre conteúdo reconstruído e não o representar como hash dos bytes originais, nem registrar `approval.status='aprovado'` sem sign-off.

**Solicitação objetiva de sign-off (a ser satisfeita em execução posterior):** disponibilizar o pacote original com proveniência e bytes verificáveis; obter revisão de integridade/fidelidade e de questões jurídicas de risco alto; apresentar decisão explícita do responsável editorial identificando **editor, data, edição e hash de entrada calculado pelo pipeline**, com o registro na PR; só então habilitar ingresso em PR draft que ainda exigirá testes e autorização de publicação posterior. Uma autorização genérica de “executar o método” não é sign-off.

**Alterações nesta branch:** somente `docs/CHECKPOINT_METODO-AGU-007.md` e `docs/PROMPT_METODO-AGU-008.md`, sem arquivos em `livros/`, `dados/`, `lib/`, fontes, HTML, CSS, JavaScript, motor, backup, workflows ou Caderno. CI da PR serve exclusivamente para regressão documental, **não** para certificar o AMB-04. A PR permanece draft, sem merge/deploy.

## 6. Próxima execução

[MÉTODO-AGU-008](PROMPT_METODO-AGU-008.md) objetiva desbloquear a proveniência dos bytes canônicos e o gate de sign-off editorial, sem fingir que já há uma aprovação. Ações 008 não foram executadas neste lote.