# AGU Quiz — CARTOES-AUD-03 | seleção de prova histórica com fundamento vigente

Referência: **16/11/2026**, São Paulo. Sprint exclusiva CARTOES-AUD-03. Corte da auditoria pedagógica: **04/11/2026**. Conferência pública pontual, **não** certificação normativa integral. Não houve acesso ao repositório privado `Talksxb/agu-auditoria` nem cópia de matrizes, estatísticas, enunciados integrais ou evidências privadas.

## Retomada e concorrências

- `origin/main` na abertura: **`aeedd9e1a3e7f3d00a8291516f30571e8c58942b`**; `cards/aud03-prova-2015` criada desse commit, com árvore limpa. CARTOES-AUD-02 PR #46, a reconciliação posterior e BIBLIOTECA-LEIS-02 PR #45 já compõem essa base. Nenhuma PR aberta na observação inicial. Esses estados são instantâneos e devem ser revalidados na publicação.
- Lidos o handoff `PROMPT_CARTOES-AUD-03.md`, os checkpoints CARTOES-AUD-01/02, os módulos, fixtures, testes e workflow pertinentes. Preservadas mudanças concorrentes da Biblioteca 02, inclusive `index.html` e leitor, sem reescrita de fixture antiga.
- SHA-256 local/HTTPS coincidente antes da alteração para `revisao-inteligente.js`: `888b4fada02c4e7123eef90cebd09e2e0ec81626afd4c925899cd1b6a4d8a7c2`. Baseline local da main: `index.html` `e5dc8d39b174dd3e3024ea5a10f5b6b478c1277756907dd984570472724f0a7f` e `baralhos-ux.css` `de772af0e639f70f57bc4ea8d6bf59fd9cd6971463ae936f9a74d390be42d3b7`.

## Exame editorial

Documentos históricos exclusivamente públicos: [prova AGU 2015, caderno `187AGU_001_07`](https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/187AGU_001_07.pdf) e [gabarito definitivo](https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/Gab_Definitivo_187AGU_001_07_SUPER-A4.pdf). Todas as perguntas e respostas dos cartões são **autorais**. Chave da banca é metadado **histórico**, não prova da vigência de entendimento atual.

| Candidata | Gabarito histórico | Destino | Fonte atual específica | Comparação temporal e limite |
| --- | --- | --- | --- | --- |
| Q5 | E | `aud02-2015-flc-03-005`, **ADM-17** | [Lei 9.784/1999, arts. 22 e 50](https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html) | A liberdade supletiva de forma é anterior à prova. Ato específico pode exigir forma legal; motivação tem regime distinto. **Não** se afirma modificação posterior. |
| Q7 | C | `aud02-2015-flc-03-007`, **ADM-27** | [CF, art. 49, V](https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html); [STF, ADI 5.290/GO, 2019](https://portal.stf.jus.br/constituicao-supremo/artigo.asp?abrirArtigo=49&abrirBase=CF) | Competência constitucional preexistente; precedente posterior delimita hipótese de sustação. Não existe competência para sustar qualquer ato apenas por discordância. |
| Q8 | C | `aud02-2015-flc-03-008`, **ADM-27** | [CF, art. 87, parágrafo único, II](https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html) | Instruções de ministro subordinadas à lei, decreto e regulamento. “Regulamento de segundo grau” é classificação doutrinária; **não** se presume inovação pós-2015. |

**Não promovidas:** Q4 (termo de ajustamento: efeito/competência exigem cotejo específico); Q6 (adaptação oficial S19 já existe, evitar redundância); Q16 (alocação dos riscos de PPP depende da matriz contratual; gabarito C exige exame histórico mais detalhado); Q20 (responsabilidade estatal e culpa concorrente, sem ligação granular pública inequívoca); Q24 e Q36 (fundamento atual e código granular ainda sem cadeia completa). Essas candidatas **não** são prova de desatualização nem geram cartões automaticamente.

## Mudanças e invariantes

- Arquivo isolado `dados/flashcards-aud02-2015-atualizados-lote03.js`: três IDs estáveis, chaves históricas, fonte atual, armadilha, situação prática e `legalCutoff`, com `notOfficial:true`, sem `level` ou `deviceId` inferido.
- `index.html`: carrega lote 03 antes do motor; `revisao-inteligente.js`: valida e anexa lote sem alterar anteriores, passa a reconhecer `lotAud02_2015_03`, acrescenta novo título de ADM-17, título de ADM-27 e origens no **único** índice histórico LEG11 (sem criar caderno). Nenhuma alteração de estilo ou lógica de rating, agenda, importação ou questão oficial.
- Inventário passa de **48/10 para 51 cartões autorais/11 baralhos**: ADM-06 12; ADM-13 4; ADM-17 1; ADM-23 4; ADM-25 5; ADM-27 3; ADM-58 1; CON-02 2; CON-24 1; CON-50 8; PC-03 10. 14 disciplinas públicas, 3 com cartas; **14 níveis cognitivos originais** (2:7, 3:6, 4:1) e **37 sem nível**. Não há ranking AUD02-FREQ validado.
- Preservados `agu_quiz_revisao_inteligente_v1`/`agu-review-v1`, uma nota voluntária por cartão/sessão, D+1/7/21/45, importação parcial de revisão 3 MB sem sobrescrever agenda, S20 com nove categorias e limite de 12 MB UTF-8, `forNotebook` única em `agu_leitor_juridico_s13_v1` e origens anteriores. Sem vinculação automática a planner, minutos, tarefa, dispositivo ou competência.
- Novo delta `tests/fixtures/cartoes-aud-03-delta.json` parte dos hashes integrados de BIBLIOTECA-LEIS-02 e CARTOES-AUD-02. Os fixtures anteriores foram **preservados**. Alterações pontuais nos testes regressivos atualizam apenas a contagem real, assinatura do conjunto `ALL` para o perfil unitário e o encadeamento ao novo SHA.

## Testes e publicação

- **36 suítes Node** do workflow (incluindo a nova C03) executadas localmente e verdes. A validação C03 testa proveniência, códigos literais, gabarito histórico, catálogo, caderno, leitura sem escrita, rating voluntário e cadeia SHA.
- Roteiro sintético Chromium novo em 320/360/390/430/1280, com teclado Enter/Espaço, axe 390/1280 (`violations`, `incomplete`, `passed`), capturas, agenda voluntária, caderno, backup e reload. Localmente **não executado**, porque Chromium instalado no contêiner falhou ao abrir socket por restrição de execução; tentativas de download Playwright foram rejeitadas. Validação condicionada à **CI GitHub Actions**, sem inferir aprovação de acessibilidade assistiva.
- **Android físico e TalkBack real não testados.** A ausência de violações automatizadas, se observada, não certifica WCAG global nem resolve itens `incomplete`.
- Hashes **da branch antes de merge**: `index.html` `71a30f8c930cbd254bc4d22b4d9d400b322dcf92e700a6afabda79419de75ded`; `revisao-inteligente.js` `ade35f3ba8c77b0d33ec41063f3c72f20c3889b91ab619d94942ebf0c3768116`; lote 03 `f4cb472e30c9a283277004002c3f406112e973222169ad88e12163f9c379e6ed`. Confirmar de novo após CI/merge via HTTPS; PR **não** equivale a produção.
- Portão: publicar somente após Node + Chromium **verdes**, PR sem conflito, sem regressão de backup/privacidade/revisão/proveniência. Se falhar, manter em rascunho. A identificação factual de PR, CI, merge e Pages deve ser apensa após observação por comentário de entrega, não presumida aqui.

**Handoff futuro, ainda não executado:** `docs/PROMPT_CARTOES-AUD-04.md`.
