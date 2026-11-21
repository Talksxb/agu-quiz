# LIVROS-EDITOR-001 — Comparativo, matriz curricular e reconciliação de AMB-03

**21/11/2026.** Comparação documental, **não reauditoria jurídica**. Fonte de publicação: `Talksxb/agu-quiz`, `main` base `997c8362ef349e30893ab9a49a0bf0d9406e4c0d`. PR #70 mesclada (biblioteca), PR #74 mesclada (Ambiental). Corte histórico de auditoria 04/11/2026; consulta de status em 21/11/2026 ao último checkpoint `AUD03-042`, sem certificação integral. O repositório privado não foi editado nem teve material interno publicado.

## Inventário confirmado sem alteração do leitor

| Obra | ID | Fonte/edição | Publicação atual | Limite |
|---|---|---|---|---|
| Ambiental | LIVRO-AMB-001 / AMB-03 | HTML responsivo de 20/11/2026 | 17 blocos, 9.411 palavras por texto JSON; HTML original vinculado | 4 SVG + 2 tabelas requerem referência visual histórica |
| LGPD | LIVRO-DIG-001 v2.0 / ADM-64b | PDF editorial 24 p., 20/11/2026 | 24 blocos extraídos; 13.916 palavras | PDF original não foi renderizado neste lote; tipografia e gráficos não certificados |
| Responsabilidade patrimonial | LIVRO-PIL-001 / ADM-53 | PDF editorial 20 p., 18/11/2026 | 20 páginas textuais | Contraste secundário, sem alteração |
| Agentes públicos | LIVRO-ADM-002 / ADM-54 | Markdown, 18/11/2026 | 17 seções | Contraste secundário, sem alteração |

O título histórico da documentação `LIVROS-LEIT-001` descrevia Ambiental como ainda não publicado. A PR #74 mudou o estado de publicação; **não se alterou** o arquivo histórico nem a redação jurídica do capítulo. A menção no final de AMB-03 à ausência de publicação em GPT Sites diz respeito a serviço diferente de GitHub Pages, portanto não é licença para mudar a frase. Uma nota separada no novo Markdown resolve a cronologia.

## Matriz comparativa — indício concreto, virtude, risco e regra

| Eixo | Ambiental AMB-03 — evidência | LGPD v2 ADM-64b — evidência | Virtude, risco e regra transversal | Quando facultativa |
|---|---|---|---|---|
| Problema gerador | Rodovia interestadual, quatro órgãos e superposição de atuação; retorno em §8 | Integração de cadastros de benefício e contratação com dados sensíveis; retorno em §13 | Preservar problema concreto que percorra a obra. Risco: caso irrelevante virar mero prólogo | Não é facultativa a **função** de problema; sua forma narrativa varia |
| Progressão | Federalismo → CF 23/24/30/225 → LC 140 → fiscalização/licença → vigência | Constituição/direitos → categorias → base legal → Poder Público → compartilhamento → IA/contratos | Explicar o porquê em prosa antes de quadros. Não importar a sequência temática de outra disciplina | Diagrama de rota é facultativo |
| Direito positivo e tempo | LC 140, Leis 6.938, 15.190, 15.300; §5.4 diferencia corte, vigência e publicação | LGPD arts. 4º, 23–33, LAI, contratos de nuvem e atos ANPD; §16 distingue edição/atualização | Hierarquizar normas e expor intertemporalidade verificável; risco alto em legislação recente | Linha do tempo só quando ajudar |
| Jurisprudência | §6 trata ADI 4.757, Tema 145, ADI 7.007 e limites de STJ; §6.5 registra não decidido | §11 separa STF ADI 6649/ADPF 695 e STJ sobre dano moral, com alcance delimitado | Identificar órgão, ratio, eficácia, distinção e não decidido. Não elevar leitura editorial a tese vinculante | Número de julgados varia; seção pode declarar ausência justificada |
| Objeções/casos-limite | §7 e art. 65 da Lei 15.190 em tensão com LC 140/ADI 4.757 | Consentimento presumido, transparência versus privacidade, papel do SaaS, inferências de IA | Registrar objeção forte e fato que muda conclusão. Risco de simplismo binário | Quadro contrastivo não obrigatório |
| Recursos visuais | 4 SVG; 2 tabelas; JSON lineariza conteúdo e exige HTML original | 24 páginas PDF transformadas em texto; blocos guardam quebras, não diagramação | Figura somente com alternativa útil e visual íntegro preservado. Risco de perda silenciosa | Desenho/tabela não obrigatório |
| Caso AGU | §8, nota técnica sobre rodovia, IBAMA, fiscalização, prazos e LAE | §13, integração de cadastro, caso SaaS/incidente e miniparecer | Exigir fatos, competência, prova, objeção, alternativas, conclusão e providências | Segundo caso é facultativo |
| Questões | §9 traz 8 questões **autorais**, sem simular Cebraspe | §14 traz 16 questões **autorais**, com comentário | Origem e gabarito; históricas com caderno/anulação e direito de época distinto do atual | Contagem/modalidade variável |
| Recuperação | §§10–12, síntese → perguntas → respostas afastadas | §15, síntese e respostas ao fim da unidade | Recuperação ao final sem bloqueio do texto e sem presumir domínio | Número de prompts variável |
| Fontes/limites | §13 declara consulta pontual em 20/11 e lacunas sobre art. 65/alterações | §16 registra fontes e ajustes pontuais da v2; dados de extração de PDF | Fonte por afirmação, datas distintas e manutenção diferencial; risco de conferir link sem lê-lo | Tabela de fontes é uma das formas |
| Legibilidade | HTML responsivo original, mas SVGs e tabelas não se tornam automaticamente Markdown | Fonte PDF extraída em páginas, com quebras e cabeçalhos | Original visual não é automaticamente equivalente ao leitor; testes por formato | Modo de paginação varia |
| Governança | HTML e JSON históricos vinculados a AMB-03; reescrita proibida na sprint | PDF e JSON com 24 páginas mantidos intocados | Fonte de revisão, publicação e histórico visual têm papéis separados | Converter fontes futuras depende de gate próprio |

**Rubrica editorial indicativa (não jurídica):** AMB-03 — progressão 4/5, densidade 4/5, proveniência 3/5, caso AGU 5/5, autonomia/estrutura 3/5 = **19/25**; lacuna: tabela/SVG dependem de HTML e o cotejo jurídico atual não foi refeito. LGPD v2 — 4/5, 4/5, 3/5, 5/5, 3/5 = **19/25**; lacuna: PDF não renderizado aqui, extração textual não assegura material visual. As notas são diagnósticos editoriais no escopo, **não prova de vigência, aderência integral ao edital ou domínio**.

## Reconciliação de AMB-03: bases e correspondência exata

- HTML visual preservado: `livros/livro-amb-001-original.html`; **Git blob** `b12e615a3afe3762ead34455e6d25aeb1d4fce81`.
- JSON ativo imutável: `livros/amb-03.json`; **Git blob** `1ef017d5766fdf75f47abbd27d333f844c6d91d6`; 17 blocos e aproximadamente 9,4 mil palavras.
- Fonte Markdown editorial nova: `livros/fontes/amb-03.md`. Os intervalos delimitados por `AGU_EDITOR_SECTION_START/END` reproduzem cada `pages[i].text` **byte por byte na codificação textual do conector**, em ordem. Depois vem um aparato **fora dos 17 blocos**.
- O HTML tem 1 H1 e 16 H2, em correspondência ao H1 de abertura + 16 seções do JSON. O texto base do Markdown não foi atualizado juridicamente.
- HTML contém 4 SVG embutidos e 2 tabelas; a descrição e a reconstrução tabular estão **no aparato**, sem editar os blocos do leitor.

| Bloco leitor | Rótulo e seção Markdown | Âncora do original | Caracteres originais no JSON |
|---:|---|---|---:|
| 01 | Abertura e identificação / marcador `AGU_EDITOR_SECTION_START:01` | [HTML § correspondente](../livros/livro-amb-001-original.html#livro-amb-001-compet%C3%AAncias-e-coopera%C3%A7%C3%A3o-ambiental) | 914 |
| 02 | Como usar este capítulo / marcador `AGU_EDITOR_SECTION_START:02` | [HTML § correspondente](../livros/livro-amb-001-original.html#como-usar-este-cap%C3%ADtulo) | 534 |
| 03 | Problema gerador — uma rodovia, duas unidades da Federação e quatro órgãos ambientais / marcador `AGU_EDITOR_SECTION_START:03` | [HTML § correspondente](../livros/livro-amb-001-original.html#problema-gerador-uma-rodovia-duas-unidades-da-federa%C3%A7%C3%A3o-e-quatro-%C3%B3rg%C3%A3os-ambientais) | 1622 |
| 04 | 1. Federalismo ambiental: unidade de proteção e pluralidade de autoridades / marcador `AGU_EDITOR_SECTION_START:04` | [HTML § correspondente](../livros/livro-amb-001-original.html#federalismo-ambiental-unidade-de-prote%C3%A7%C3%A3o-e-pluralidade-de-autoridades) | 2645 |
| 05 | 2. Constituição: os quatro pilares e sua articulação / marcador `AGU_EDITOR_SECTION_START:05` | [HTML § correspondente](../livros/livro-amb-001-original.html#constitui%C3%A7%C3%A3o-os-quatro-pilares-e-sua-articula%C3%A7%C3%A3o) | 5975 |
| 06 | 3. Lei Complementar 140/2011: cooperação que não se confunde com indistinção / marcador `AGU_EDITOR_SECTION_START:06` | [HTML § correspondente](../livros/livro-amb-001-original.html#lei-complementar-1402011-coopera%C3%A7%C3%A3o-que-n%C3%A3o-se-confunde-com-indistin%C3%A7%C3%A3o) | 9328 |
| 07 | 4. Fiscalizar, licenciar e sancionar: três operações jurídicas distintas / marcador `AGU_EDITOR_SECTION_START:07` | [HTML § correspondente](../livros/livro-amb-001-original.html#fiscalizar-licenciar-e-sancionar-tr%C3%AAs-opera%C3%A7%C3%B5es-jur%C3%ADdicas-distintas) | 6181 |
| 08 | 5. Compatibilização das leis ambientais em novembro de 2026 / marcador `AGU_EDITOR_SECTION_START:08` | [HTML § correspondente](../livros/livro-amb-001-original.html#compatibiliza%C3%A7%C3%A3o-das-leis-ambientais-em-novembro-de-2026) | 5124 |
| 09 | 6. Jurisprudência: decisão, fundamento e alcance / marcador `AGU_EDITOR_SECTION_START:09` | [HTML § correspondente](../livros/livro-amb-001-original.html#jurisprud%C3%AAncia-decis%C3%A3o-fundamento-e-alcance) | 4674 |
| 10 | 7. Controvérsias e objeções que um parecer precisa enfrentar / marcador `AGU_EDITOR_SECTION_START:10` | [HTML § correspondente](../livros/livro-amb-001-original.html#controv%C3%A9rsias-e-obje%C3%A7%C3%B5es-que-um-parecer-precisa-enfrentar) | 2519 |
| 11 | 8. Caso AGU integralmente resolvido — corredor interestadual / marcador `AGU_EDITOR_SECTION_START:11` | [HTML § correspondente](../livros/livro-amb-001-original.html#caso-agu-integralmente-resolvido-corredor-interestadual) | 9627 |
| 12 | 9. Questões comentadas — todas autorais, sem simulação de enunciado oficial / marcador `AGU_EDITOR_SECTION_START:12` | [HTML § correspondente](../livros/livro-amb-001-original.html#quest%C3%B5es-comentadas-todas-autorais-sem-simula%C3%A7%C3%A3o-de-enunciado-oficial) | 4574 |
| 13 | 10. Síntese final — voltar à prática, sem substituir o raciocínio / marcador `AGU_EDITOR_SECTION_START:13` | [HTML § correspondente](../livros/livro-amb-001-original.html#s%C3%ADntese-final-voltar-%C3%A0-pr%C3%A1tica-sem-substituir-o-racioc%C3%ADnio) | 1329 |
| 14 | 11. Recuperação ativa — responda sem consultar o capítulo / marcador `AGU_EDITOR_SECTION_START:14` | [HTML § correspondente](../livros/livro-amb-001-original.html#recupera%C3%A7%C3%A3o-ativa-responda-sem-consultar-o-cap%C3%ADtulo) | 1084 |
| 15 | 12. Respostas de referência — só consultar após a recuperação / marcador `AGU_EDITOR_SECTION_START:15` | [HTML § correspondente](../livros/livro-amb-001-original.html#respostas-de-refer%C3%AAncia-s%C3%B3-consultar-ap%C3%B3s-a-recupera%C3%A7%C3%A3o) | 2261 |
| 16 | 13. Fontes primárias, proveniência e lacunas / marcador `AGU_EDITOR_SECTION_START:16` | [HTML § correspondente](../livros/livro-amb-001-original.html#fontes-prim%C3%A1rias-proveni%C3%AAncia-e-lacunas) | 6371 |
| 17 | 14. Handoff editorial — próximo livro de Direito Ambiental / marcador `AGU_EDITOR_SECTION_START:17` | [HTML § correspondente](../livros/livro-amb-001-original.html#handoff-editorial-pr%C3%B3ximo-livro-de-direito-ambiental) | 1551 |

## Recursos e diferenças remanescentes

| Recurso | Posição no HTML | Tratamento no Markdown | Status |
|---|---|---|---|
| SVG V1 árvore constitucional | §2 (art. 23, 24/30 e 225) | Descrição substantiva, texto linear já existente, link à âncora | Sem perda do arquivo original; desenho não incorporado ao MD |
| Tabela T1 supletiva/subsidiária | §3.5 | Células reais restauradas em tabela Markdown no aparato; texto linear dos 17 blocos mantido | Estrutura recuperada; duplicate textual intencional |
| SVG V2 supletiva/subsidiária | §3.5 | Descrição e link; desenho mantido no HTML | Fidelidade visual dependente do HTML |
| SVG V3 fluxo licença/fiscalização | §4.2 | Descrição inclui separação dos caminhos e ressalvas; link | Branches visuais preservados somente no HTML |
| Tabela T2 três relógios | §5.4 | Células reais da tabela restituídas em Markdown | Sem reinterpretação dos marcos |
| SVG V4 solução AGU | §8.7 | Descrição com etapas; link ao HTML | Sem redesenhar fluxos |

**Diferença editorial identificada:** uma soma de palavras extraídas do HTML (com cabeçalhos e textos internos de SVG) não é diretamente comparável às 9.411 palavras dos blocos JSON, porque o HTML inclui índice, textos gráficos e recursos estruturados. A comparação reproduzível e determinística desta sprint é a identidade dos **17 campos de texto** e inventário de **6 recursos visuais**, não uma suposta equivalência visual de 100%. Os exemplos e questões permanecem nos blocos originais.

**Fidelidade jurídica:** nenhuma mudança de dispositivo, data de vigência, precedente, caso ou gabarito foi autorizada. Futuros ajustes ao art. 65 ou a outros pontos novos dependerão de consulta primária e nova edição. **Não** adotar automaticamente Markdown→JSON; JSON atual e página HTML seguem publicados. DOCX/PDF originais do Projeto foram localizados por metadados e excertos, porém não puderam ser materializados como bytes nesta execução; portanto não há cotejo visual do DOCX nem renderização do PDF. O benchmarking de LGPD baseia-se nas 24 páginas textuais efetivamente lidas via JSON e em excertos recuperados do original do Projeto, não em identidade gráfica certificada.

## Generalização e portão

O manual e o template funcionam para subitem financeiro ou penal sem transportar casos ambientais. O ensaio documental nas seções 9 do manual não redige novos livros. Próximas revisões jurídicas exigem editor distinto e status de consulta; nenhuma certificação integral foi inferida. Leitura em Android físico, acessibilidade assistiva real e uso futuro de conversor permanecem **fora do lote**.
