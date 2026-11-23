# CHECKPOINT MÉTODO-AGU-008 — proveniência e decisão editorial AMB-04

**Execução:** 23/11/2026, America/Sao_Paulo.
**Escopo:** LIVRO-AMB-002 — Poder de Polícia e Licenciamento Ambiental; edição 1.0 de 22/11/2026; ID curricular AMB-04; futuro capítulo técnico amb-04. Resultado: **não ingressar**, por falta de bytes canônicos e aprovação editorial expressa, apesar de avanços na conferência textual e jurisprudencial.

## 1. Retomada e separação de frentes

- Repositório Talksxb/agu-quiz, **main 1191267482ace4429cfd9d5f559a626461b29493**, árvore **e41fac8fb57e6790b83ceea878a907a3c6aa2552**. CI main 45230341092 e Pages 45230340034: completed/success no mesmo HEAD, confirmados na consulta desta execução.
- PR #79 (Método/backup) e PR #80 (verificador Pages): merged. [PR #81 — etapa 006](https://github.com/Talksxb/agu-quiz/pull/81) e [PR #83 — etapa 007](https://github.com/Talksxb/agu-quiz/pull/83): abertas/draft, não mescladas. A [PR #82 — Simulados](https://github.com/Talksxb/agu-quiz/pull/82) é frente alheia e também não foi incorporada. A branch 008 nasce diretamente da main, não encadeia alterações pendentes.
- Lidos os checkpoints 006/007 em suas próprias branches, os contratos "docs/METODO_AGU_001_INGESTAO.md" e "docs/AGU_PADRAO_EDITORIAL_CAPITULOS_v1.md", schema "schemas/metodo-agu/capitulo.schema.json", compilador "scripts/metodo-agu.cjs", catálogo e coleção Ambiental. Observada a precedência pedagógica Base Mestra 5.2, Leitura Completa 1.1, Caderno/Handoff 2.1 e Leia-me Primeiro 2.
- **Estado real na main:** quatro capítulos no catálogo geral, sendo somente amb-03 em Ambiental. A coleção tem nove posições; LIVRO-AMB-002/AMB-04 está em produzido, revisão pendente, não publicado. Nenhuma obra foi inserida nem renumerada; AMB-04 não se confunde com LIVRO-AMB-004.
- Nenhuma consulta/alteração à auditoria privada foi necessária. O corte 04/11/2026 e contagens históricas no handoff original não foram declarados revalidados. Não houve registros de aprendizagem, Caderno, revisão, domínio ou agenda.

## 2. Proveniência e recuperação dos arquivos originais

A Biblioteca pessoal do Projeto permitiu leitura/indexação, mas a **materialização raw_file dos cinco arquivos falhou**, com o retorno literal "This Project file does not have an authorized raw-byte materialization path". Busca nominal no Google Drive por LIVRO-AMB-002 não apresentou correspondência e não indica inexistência universal. O ambiente de trabalho local não continha cópias originais com esses nomes.

| Arquivo de origem identificado na Biblioteca | Tamanho nominal informado pelo serviço | Acesso comprovado | SHA-256 original |
|---|---:|---|---|
| LIVRO-AMB-002.md | 88.101 bytes | texto indexado integral de 412 linhas | **não obtido** |
| LIVRO-AMB-002.json | 92.236 bytes | JSON extraído e parseado; 27 páginas | **não obtido** |
| LIVRO-AMB-002.pdf | 215.210 bytes | texto extraído das 32 páginas; renderização visual indisponível | **não obtido** |
| LIVRO-AMB-002_HANDOFF_EDITORIAL.md | 4.043 bytes | texto indexado integral de 36 linhas | **não obtido** |
| LIVRO-AMB-002_FONTES_E_QUALIDADE.md | 10.637 bytes | texto indexado integral de 67 linhas | **não obtido** |

Os quatro fluxos Mermaid estão como **código no Markdown**; não foram identificados/verificados como quatro arquivos binários editáveis separados com hashes próprios. O PDF afirma conter diagrama vetorial, mas a inspeção de imagem da página no serviço de Arquivos falhou; nenhum diagrama foi declarado visualmente equivalente por inferência do título.

**Não foram calculados SHA-256 do original nem hash de entrada do pipeline** sobre texto recomposto. Nenhum número hipotético aparece como digest. Não se copiou conteúdo privado para a aplicação pública.

### 2.1 Cotejo de integridade de texto extraído — fato positivo, escopo restrito

1. Markdown extraído: **84.627 caracteres**.
2. Concatenação sem separadores de todos os 27 campos pages[].text do JSON extraído: **84.628 caracteres**.
3. Comparação exata dos dois fluxos textuais: a concatenação do JSON é idêntica ao Markdown recuperado com **uma quebra LF final adicional**.
4. Foram conferidos os **21 cabeçalhos numerados**, os **quatro blocos Mermaid**, as **10 perguntas de recuperação da seção 19**, as respostas separadas da seção 20, o caso/perecer e as âncoras [F1] a [F20].
5. O texto extraído de **todas as 32 páginas do PDF** permitiu encontrar os **21 títulos de seção**, os **quatro títulos de fluxogramas**, **10 das 10 perguntas** de recuperação e as remissões [F1]–[F20]. O PDF tem paginação própria e quebras visuais/textuais: **não** houve comparação de bytes, preservação gráfica, índice de coordenadas nem prova de que todas as tabelas ou formas vetoriais sejam equivalentes.

**Resultado:** integridade textual dos dois fluxos recuperados confirmada; cobertura textual de marcadores no PDF confirmada; **integridade de bytes originais e fidelidade visual continuam pendentes**. Não registrar "PDF validado integralmente".

## 3. Fonte de autoridade e risco jurídico localizado (consulta oficial: 23/11/2026)

| Subitem literal AMB-04 | Seções da obra | Confronto oficial pontual efetuado | Estado e ressalva |
|---|---|---|---|
| Poder de polícia e Direito Ambiental | 2–3, 11–14, 16 | LC 140/2011 arts. 13–17; STF ADI 4.757: prevalência da autuação do licenciador não exclui fiscalização supletiva diante de comprovada omissão/insuficiência, e mora imotivada em renovação instaura competência supletiva | **alto** quando combinado com art. 65 da lei geral; decisão da ADI 4.757 não equivale a julgamento do novo art. 65 |
| Licenciamento ambiental | 4–8, 14–16 | Lei 15.190/2025, arts. 14, 60 e 65, texto consolidado Planalto (inclui partes antes vetadas); Lei 15.300/2025, LAE e alterações; LC 140/2011 | **alto**: art. 65, efeitos da manifestação técnica e limites de comunicação; regimes LAE/LAC e constitucionalidade pendente |
| Compensação ambiental | 9, 15, 16 | Lei 9.985/2000 art. 36 e Decreto 4.340/2002 art. 31-A: CA=VR×GI, GI de 0 a 0,5%; STF ADI 3.378 e embargos de declaração | **médio/alto para fatos históricos**: piso legal automático não equivale ao teto regulamentar; a modulação de 2022 agora foi localizada com marco temporal específico |
| Biossegurança | 10 | Lei 11.105/2005, arts. 8–16, CNBS/CTNBio e entidades setoriais | **médio**: regulamentação, deliberações CTNBio e tipologias não exauridas; não presumir licença ambiental universal por OGM |
| Infrações administrativas ambientais | 11–15, 16 | Decreto 6.514/2008 e STJ EREsp 1.318.051/RJ, Primeira Seção, 08/05/2019, DJe 12/06/2019, acórdão oficial aberto e página PDF inspecionada: responsabilidade administrativa subjetiva, distinta da reparação civil objetiva. Lei 15.190 art. 62 altera crimes ambientais | **médio**; conferir tipificação, sanção e regime temporal em caso concreto. O texto integral consolidado da Lei 9.605/1998 não pôde ser reaberto por uma das URLs nesta sessão, de modo que a conferência integral permanece pendente |

### 3.1 Evidência nova desde MÉTODO-AGU-007: embargos da ADI 3.378

**STF, ADI 3.378 ED/DF**, julgamento de embargos em sessão virtual de **11 a 18/02/2022**, Rel. Ministro Luís Roberto Barroso no incidente. O Tribunal deu parcial provimento e modulou os efeitos para preservar a validade de atos administrativos de apuração do valor de compensação ambiental baseados no art. 36, § 1º, da Lei 9.985/2000 **entre 19/07/2000 e 15/04/2008**. O processo oficial e a descrição decisória foram consultados:
https://portal.stf.jus.br/processos/detalhe.asp?incidente=2262000

Isso **não restaura piso de 0,5% para novos empreendimentos**; é limite temporal importante em perguntas históricas. O texto 1.0 da obra explica a inconstitucionalidade do antigo piso e adverte genericamente que embargos/modulações exigem conferência, mas **não explicita os marcos temporais acima** no § 9 ou § 15. Registrar **proposta de atualização editorial versionada**, com novo diff após obtenção do original e revisão independente. **A obra 1.0 não foi alterada.**

### 3.2 Art. 65 e ações constitucionais

- Art. 65 da Lei 15.190/2025, promulgado após rejeição do veto, prevê comunicação formal de medidas e prevalência da manifestação técnica do órgão licenciador, sob hipóteses legais. Fonte original consolidada Planalto: https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15190.htm
- LC 140/2011, art. 17, § 2º e § 3º, e ADI 4.757: https://www2.camara.leg.br/legin/fed/leicom/2011/leicomplementar-140-8-dezembro-2011-611919-normaatualizada-pl.html e https://portal.stf.jus.br/processos/detalhe.asp?incidente=4224704
- ADIs 7.913, 7.916 e 7.919: páginas processuais do STF consultadas em 23/11/2026 indicam pauta de mérito **27/11–04/12/2026**, ainda futura nesta data. Não se afirma julgamento, trânsito, cautelar abrangente ou invalidação definitiva. https://portal.stf.jus.br/processos/detalhe.asp?incidente=7468448 ; https://portal.stf.jus.br/processos/detalhe.asp?incidente=7473191 ; https://portal.stf.jus.br/processos/detalhe.asp?incidente=7474918

### 3.3 Fontes oficiais abertas adicionalmente

- Lei 15.300/2025, LAE: https://www2.camara.leg.br/legin/fed/lei/2025/lei-15300-22-dezembro-2025-798529-publicacaooriginal-177503-pl.html
- SNUC Lei 9.985/2000, art. 36: https://www2.camara.leg.br/legin/fed/lei/2000/lei-9985-18-julho-2000-359708-normaatualizada-pl.html
- Decreto 4.340/2002, art. 31-A: https://www2.camara.leg.br/legin/fed/decret/2002/decreto-4340-22-agosto-2002-451270-normaatualizada-pe.html
- Lei 11.105/2005, CNBS e CTNBio: https://www2.camara.leg.br/legin/fed/lei/2005/lei-11105-24-marco-2005-536209-normaatualizada-pl.html
- Decreto 6.514/2008: https://www2.camara.leg.br/legin/fed/decret/2008/decreto-6514-22-julho-2008-578464-normaatualizada-pe.html
- STJ, acórdão oficial EREsp 1.318.051/RJ: https://scon.stj.jus.br/SCON/GetInteiroTeorDoAcordao?dt_publicacao=12%2F06%2F2019&num_registro=201200701523

Não houve levantamento exaustivo da jurisprudência pós-2025, das retificações do edital, dos regulamentos CONAMA/CTNBio ou da vigência artigo por artigo. Consulta pontual **não** é certificação integral.

## 4. Aprovação editorial e gate efetivo do compilador

- O schema público "schemas/metodo-agu/capitulo.schema.json" exige objeto de aprovação com **status exatamente "aprovado"**, **inputSha256 hexadecimal de 64 caracteres** e **record não vazio**.
- O compilador "scripts/metodo-agu.cjs" recalcula inputHash com o Markdown íntegro, todos os metadados exceto aprovação e bytes dos recursos visuais. Rejeita aprovação ausente ou divergente.
- O relatório "FONTES_E_QUALIDADE" considera o capítulo **apto para estudo**, mas não contém sign-off de importação por editor com edição/sha conferidos. O handoff explicitamente exige outra autorização para integrar. Nenhum registro de editor/revisor responsável aprovando esse pacote com hash foi encontrado.
- **Não foi criada aprovação sintética ou arquivo "livros/editorial/amb-04.json".** Nem PDF, nem JSON de leitura, nem arquivo nomeado FINAL, nem autorização geral do usuário para executar 008 autorizam converter "produzido" em "publicado".

### 4.1 Providência mínima concreta necessária

O responsável deverá disponibilizar **em upload direto nesta conversa, ou por URL/ID autenticado real que permita obter bytes brutos**, os cinco arquivos listados na seção 2 e quaisquer diagramas/ativos independentes existentes. Depois, a revisão de fontes e fidelidade deve identificar edição proposta, riscos altos, mudanças sugeridas e uma **decisão editorial específica**, com aprovador, data, escopo, restrições e **inputSha256 calculado após montagem final de Markdown + metadados + assets**. Havendo alteração jurídica, preservar a edição 1.0 e propor edição nova com diff e revisão expressa.

**Fluxo correto:** originais → inventário/hashes → cotejo de recursos e texto → revisão jurídica e eventual nova edição → metadados finais → cálculo inputSha256 do pipeline → revisão/aceite expresso da edição/hashes → preparação de PR draft de ingresso → testes e aprovação separada do merge. Sem pular etapa por desejo de continuidade.

## 5. Decisão e limites do lote

| Gate | Evidência desta execução | Resultado |
|---|---|---|
| Fonte com proveniência identificada | Cinco itens da Biblioteca, edição 1.0 | identificada |
| Bytes canônicos originais | cinco materializações raw_file recusadas | **não atendido — impeditivo** |
| Hash por arquivo e inputHash | impossível confirmar no original | **não atendido — impeditivo** |
| Markdown ↔ JSON (texto extraído) | 27 páginas, igualdade exceto LF terminal | confirmado pontualmente |
| PDF ↔ Markdown (texto) | 32 páginas, 21 títulos, quatro fluxos, 10 questões e F1–F20 presentes | confirmado somente por texto extraído |
| PDF visual/ativos | renderização e bytes não disponíveis | **não atendido — impeditivo** |
| Revisão jurídica oficial | novas verificações pontuais, embargos ADI 3.378 confirmados | parcial; atualização versionada necessária |
| Sign-off competente da edição e hash | não localizado | **não atendido — impeditivo** |
| Ingestão, links, backup, cartões | gate não alcançado; não executados | não aplicável nesta etapa |
| Aprendizagem do estudante | nenhuma atividade real aferida | não medido |

**DECISÃO: AMB-04 continua NÃO PUBLICADO, REVISÃO PENDENTE.** A edição 1.0 não foi reproduzida com pretensão de equivalência integral, nem reescrita. Não alterados nenhum catálogo, manifesto, capítulo, dados, motor, cartões, agenda, backup, CI histórica, auditoria privada ou infraestrutura. Nesta branch, somente este checkpoint e o prompt de continuidade foram adicionados. CI da PR é regressão documental e **não** prova a aptidão jurídica ou técnica do capítulo ainda fora do catálogo.

**Próxima etapa:** MÉTODO-AGU-009, com condição de entrada concreta: o pacote canônico de arquivos deve ser fornecido ou tornar-se acessível por link/ID autenticado; sem ele, não repetir pesquisa ou criar nova PR que apenas reproduza o mesmo bloqueio.