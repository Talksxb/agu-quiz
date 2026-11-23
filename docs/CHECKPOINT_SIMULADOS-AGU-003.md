# SIMULADOS-AGU-003 — triagem de questões históricas públicas

**Data:** 23/11/2026 (America/Sao_Paulo). **Branch:** `feat/simulados-agu-003-historicos`. **Base consultada:** `4b311dfdf44c3182e67c50c3f31133b8efc497b0` (`main`). **Status:** triagem editorial; **0 itens integrados**, sem merge/publicação.

## Estado de entrada

- PR [#82](https://github.com/Talksxb/agu-quiz/pull/82) mesclada; PR complementar [#86](https://github.com/Talksxb/agu-quiz/pull/86) mesclada. CI da correção [45274826470](https://github.com/Talksxb/agu-quiz/actions/runs/45274826470) aprovada. Após merge `4b311dfd`, CI push [45276084192](https://github.com/Talksxb/agu-quiz/actions/runs/45276084192) e Pages [45276083206](https://github.com/Talksxb/agu-quiz/actions/runs/45276083206) registraram sucesso. Sucesso de implantação não representa teste em Android físico.
- Banco existente: 24 questões autorais, edição 1.1, capítulos ADM-64b, AMB-03, ADM-54; compilador `scripts/gerar-simulados.cjs`, aprovações por hash. Quatro paráfrases C/E de 2015 continuam no Leitor (`dados/questoes-auditadas-s18.js` e `s19.js`), **não** importadas como cinco alternativas oficiais. Os 51 cartões legados e suas agendas não foram alterados.
- Consulta efetiva: `docs/PROMPT_SIMULADOS-AGU-003.md`, `docs/CHECKPOINT_SIMULADOS-AGU-002.md`, `docs/SIMULADOS_AGU_001.md`, `docs/METODO_AGU_001_INGESTAO.md`, checkpoint CARTOES-AUD-03, `livros/metodo/amb-03.json`, `livros/fontes/amb-03.md`, fontes editoriais e contratos do simulador. Aplicado o recorte pedagógico da Base Mestra v5.2 e complementos finais do Projeto.
- Materiais internos de `Talksxb/agu-auditoria` **não foram acessados, importados nem revelados** nesta etapa. Nenhum Caderno pessoal foi produzido ou pontuação atribuída.

## Prova e gabarito efetivamente consultados

**Concurso:** Advogado da União, Edital AGU nº 1/2022, prova objetiva P1 em 30/04/2023; **Cebraspe**, caderno `804_AGU_ADVOGADO_001_01`, cinco alternativas por questão.

- [Caderno oficial da banca](<https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/804_AGU_ADVOGADO_001_01.PDF>), PDF p. 9 (índice 8), questões 43–46, consultado em 23/11/2026.
- [Gabarito oficial **definitivo** do mesmo caderno](<https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/GAB_DEFINITIVO_804_AGU_ADVOGADO_001_01.PDF>), PDF p. 1, linha de questões 41–60, consultado em 23/11/2026. Não confundir com `804_AGU_ADVOGADO_001_04` ou qualquer outra ordem de alternativas. Nesse caderno os itens 43–46 **não estão anulados**.

| Questão | Chave histórica 2023 | Currículo proposto | Suporte público e lacuna | Resultado |
|---|---|---|---|---|
| 43 — fiscalização omissa e responsabilidade | **C** | AMB-05 (literalidade pendente) | Capítulo de responsabilidade ambiental não publicado; ratio exata STJ e situação do município sem conhecimento pendentes de revalidação | **Pendente** |
| 44 — APP, infração civil/administrativa e crime | **B** | AMB-11/AMB-04 (literalidade pendente) | Falta capítulo público específico e conferência temporal dos três regimes sancionadores | **Pendente** |
| 45 — manejo/supressão de vegetação em imóvel rural | **B** | AMB-03 (capítulo confirmado) | LC 140/2011, art. 8º, XVI, **b**, ressalva ao art. 7º, XV, conferidos pontualmente no Planalto; a seção pública `amb-03-s06` discute competências e art. 13, § 2º, mas **não expõe a hipótese específica de imóveis rurais**. A aprovação seria apenas temática | **Pendente** |
| 46 — licença ambiental e EIA | **E** | AMB-04/AMB-07 (literalidade pendente) | Faltam capítulos próprios; Lei 15.190/2025 e alterações/controvérsias posteriores impedem transportar a conclusão histórica para o direito atual sem cotejo | **Pendente** |

A ficha estruturada, em `livros/candidatos/simulados-agu-003.json`, registra separadamente cargo, caderno, questão, formato, gabarito, anulação, recorte histórico, fonte oficial, localização, vínculo, edição/hash quando disponível, situação atual e bloqueios. **Não há transcrição integral de prova, adaptação autoral aprovada ou candidato de cartão promovido.** As chaves C/B/B/E são exclusivamente históricas; o original da banca não pode ser exibido como questão autoral de cinco alternativas.

## Controle de qualidade e proteção dos dados

- É **deliberado** que a quantidade integrada seja zero: a missão autoriza entregar menos de quatro se a prova não estiver sustentada pelo material público e pelas fontes atuais.
- O arquivo de candidatos **não** é referenciado pelo compilador, pelas aprovações ou pelo motor. Nenhuma pendência entra em `dados/simulados-agu.json`. `simulados-agu-001.json`, `simulados-agu-aprovacoes.json`, capítulos, 51 cartões, agenda, backup e todas as sessões antigas permanecem idênticos.
- A análise semântica contra os 51 cartões continua **pendente**; não declarar ausência de duplicatas nem gerar cartões a partir de textos históricos sem revalidação. A arquitetura não permite, só por existirem fichas, lançar candidatos em revisão espaçada.
- Não há integração técnica nesta etapa; por isso, regressões de sessão, suspensão por hash, deduplicação e navegador são preservadas pelos testes existentes de 002, não por uma nova implementação. CI do HEAD final da PR 003 deve ser lida antes de declarar que passou. Não foi realizado Android/TalkBack.
- Fonte legal efetivamente aberta: [LC 140/2011 — Planalto](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp140.htm), arts. 7º, XV; 8º, XVI, b; 13, § 2º. Verificação **pontual** e em 23/11/2026, não uma auditoria normativa integral.

## Próximo passo

O roteiro completo `docs/PROMPT_SIMULADOS-AGU-004.md` delimita o desbloqueio da questão 45 (capítulo público + norma primária atual + aprovação distinta da ficha histórica), sem prometer que haverá item apto. Se a atualização do capítulo exigir sprint editorial própria, não forçar o simulado, e fechar documentalmente. O recorte 43/44/46 segue suspenso até capítulos e conferência temporal. Esta PR é **draft**; **não mesclar/publicar** durante SIMULADOS-AGU-003.
