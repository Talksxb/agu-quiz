# AGU Quiz — Sprint 19 | Ampliação auditada do banco de questões

**Data:** 2026-11-12 · **Status:** código, lote, testes e handoff persistidos em `main`. Validação automatizada em **ambiente JS simulado** aprovada; **sem navegador real/Android físico/propagação GitHub Pages conferidos**. Nenhum dado pessoal foi publicado.

## 1. Diagnóstico de partida

- Continuidade sem reconstrução: checkpoint `docs/CHECKPOINT_SPRINT18_QUESTOES_2026-11-12.md`, `docs/CHECKPOINT_REFATORACAO_BIBLIOTECA_2026-11-12.md`.
- Auditoria privada: `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `checkpoints/AUD03-009.json`, matriz original de **412 IDs**, índice `AUD02-029-indice-2015.json`, `AUD02-029-indice-2023.json` e confronto de alterações de gabarito de 2023.
- Confirmado no reconhecimento: `AUD03-009` era o checkpoint geral mais recente; **zero tópicos integralmente certificados**. Índices: 200 itens AU2015 (192 válidos, 8 anulados); 100 AU2023 (93 válidos, 7 anulados), sem prova de fundamentação integral por item.
- AU2023: sete anulações (Q7,25,30,41,50,54,81) e cinco trocas de alternativa entre preliminar/definitivo (Q66,68,70,74,79). O gabarito definitivo da variante 804 permanece canônico. Não houve inclusão de itens AU2023 nesta sprint porque requerem enunciado/opções A–E historicamente fiéis e análise jurídica histórica/atual específica.
- Fonte dos três itens selecionados: `evidencias/provas/AUD02-020.json`, IDs `AUD02-Q-215`, `AUD02-Q-216`, `AUD02-Q-218`. A consulta aos registros e aos documentos oficiais é **pontual**, não certificação curricular.
- Antes da Sprint 19, um item já estava plenamente integrado pela Sprint 18: `of-2015-adv-048` (Q48 C; CF131 caput).

## 2. Lote incorporado e chaves históricas

**Caderno exato:** `187AGU_001_07`, CESPE/Cebraspe, cargo Advogado da União de 2ª categoria, objetiva Certo/Errado, aplicação **11/10/2015**. **Gabarito definitivo**, não preliminar.

| ID imutável | Item | Gabarito | Currículo principal | Secundário | Dispositivo e pertinência |
|---|---:|:---:|---|---|---|
| `of-2015-adv-006` | 6 | E | `ADM-17` | `ADM-23` | `L9784:art50:p1` · motivação por referência; pertinência jurídica direta |
| `of-2015-adv-007` | 7 | C | `ADM-27` | `CON-40` | `CF88:art49:V` · competência exclusiva congressual para sustar excesso regulamentar; direta |
| `of-2015-adv-009` | 9 | E | `ADM-27` | `CON-21` | `CF88:art37:X` · exigência de lei específica remuneratória; direta |

**Fontes públicas oficiais da mesma variante:**
- Caderno: https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/187AGU_001_07.pdf
- Gabarito definitivo: https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/Gab_Definitivo_187AGU_001_07_SUPER-A4.pdf
- Localizadores: caderno, itens 6 e 7 na p.9 PDF (com contexto a partir da p.8), item 9 na p.10 PDF; gabarito p.1, grade de itens 1–20. O provedor de screenshot teve falhas de cache para algumas páginas do caderno; texto indexado no próprio PDF foi utilizado conforme essa ressalva. Não se declara reinspeção visual exaustiva de todas as páginas.
- Fontes jurídicas oficiais: Constituição atualizada da Câmara https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html ; Lei 9.784 atualizada da Câmara https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html .

**Questão 6 (E):** Em 2015, art. 50, I e §1º, da Lei 9.784/1999 já exigia motivação, mas admitia referência a parecer/informação anterior pertinente como parte integrante do ato. A ausência de transcrição integral dos fundamentos no despacho, por si só, não implica o vício alegado. Dispositivo revisado pontualmente na versão atual em 2026; não certificada jurisprudência superveniente integral.

**Questão 7 (C):** Em 2015, CF art. 49, V já previa competência exclusiva do Congresso para sustar ato normativo executivo exorbitante do poder regulamentar/delegação legislativa. A regra específica foi conferida pontualmente em 2026; não equivale a poder irrestrito de revogar qualquer portaria.

**Questão 9 (E):** Em 2015, a eficiência do art. 37, caput, não afastava a exigência de lei específica do art. 37, X, para fixar/alterar remuneração de servidores. Portaria não cria gratificação sem fundamento legal. Regra pontualmente conferida em 2026; distinções supervenientes de regimes remuneratórios não foram esgotadas.

Para todos os itens, o banco utiliza **paráfrase autoral explicitamente identificada**, sem fingir transcrição literal da banca. Gabarito histórico não foi reescrito. Ausência de cadeia exaustiva de alterações ou jurisprudência permanece visível (`auditStatus: nao_certificado_integralmente`, `revalidationNeeded: true`).

## 3. Integração técnica efetivada

1. `dados/questoes-auditadas-s19.js`: 3 registros com IDs, variantes, fontes/URLs, localizadores, gabaritos, anulação, disciplina, dispositivo, fundamento de 2015 e de 2026, evidência AUD02 e metadados de proveniência.
2. `revisao-inteligente.js`: os IDs Q6/Q7/Q9 **já estavam no catálogo legado OFFICIAL**; seus dados foram promovidos à classificação de fundamento pontual e corrigidos para a variante `187AGU_001_07` **sem criar outro registro e sem trocar o ID**. Uma avaliação continua gravada em `agu_quiz_revisao_inteligente_v1` com agenda original D+1/D+7/D+21/D+45. Resposta C/E validada conforme tipo. Fundamento histórico e atual passam a ser expansíveis separadamente.
3. `dados/legislacao-s13.js`: recortes **expressamente identificados como excertos** da CF arts. 37, X, e 49, V; Lei 9.784/1999 art. 50, caput, I e §1º. Não foi afirmado que representam os artigos completos.
4. `questoes-leitor-s18.js`: manteve `AGUQuestions18` e ampliou `all/list/choose/note` para uniões S18+S19, com resposta no próprio leitor e registro **manual** de dificuldade; links ao caderno e gabarito em campos estruturados.
5. `caderno-contextual.js`: validador de unidades atualizado exclusivamente para novos recortes e fontes Cebraspe disponibilizadas em `resourceList`; registros anteriores e formatos de backup não foram alterados.
6. `estudo-integrado.js`: reconhece Q6/Q7/Q9 e vincula tentativas do motor existente às sessões; nenhuma tabela/agenda paralela.
7. `leitor-consolidacao.js`: indexa os quatro itens auditados por texto, ID estável, código curricular, número, caderno e dispositivo.
8. `leitor-juridico.js`: apresenta aviso explícito para artigo em formato excerto.
9. `index.html`: novos dados carregados antes do motor de revisão; atualização de cache de scripts afetados; a Biblioteca Inteligente lista quatro ações auditadas e abre o artigo e item correspondente. **Quatro destinos principais mantidos**.
10. `tests/sprint19-validacao.js`: testes de invariantes para execução posterior por Node, sem bibliotecas externas.

## 4. Preservação e resultados observados

- **4 questões auditadas integradas** (1 Sprint 18 + 3 Sprint 19).
- **24 referências de questões oficiais no catálogo legado da Revisão** (o total não subiu, pois três IDs reaproveitados; não confundir com 24 questões juridicamente auditadas).
- **36 flashcards** preservados, inclusive 14 do lote AUD03.
- Checkpoint AUD03-009 e zero tópicos integralmente certificados preservados; nenhuma modificação no repositório privado de auditoria.
- Nenhuma migração destrutiva ou publicação de anotações pessoais; dados do estudante continuam no navegador.

### Testes (classificação rigorosa)

- Sintaxe: **14 fontes** (13 scripts carregados e o script interno do HTML) compilaram por JS/V8; ordem de carregamento conferida.
- Teste versionado `tests/sprint19-validacao.js`: **26 verificações executadas com simulação V8** das interfaces `fs/vm/assert`, lendo o conteúdo persistido no GitHub. Verificações incluem metadados, relação unidade/questão, IDs únicos, 4 áreas, preservação da Q48, 36 cartões, resposta oculta/revelada, fundamentos históricos/atuais, erro prevalecendo sobre autoavaliação, única tentativa por avaliação, sessão, nota manual e fontes estruturadas no Caderno, busca por ID, persistência da chave existente e recortes legais.
- Testes exploratórios suplementares: carregamento dos 13 módulos e preservação de tentativa legada em armazenamento simulado; correção de Q7, identificação de prazo programado; teste de erro Q6 com agendamento seguinte. Problemas detectados e corrigidos durante os testes: interpolação de fundamento no cartão, aspas do botão na Biblioteca, rejeição de novas cláusulas pelo Caderno e falta de busca por ID.
- **Não executado:** processo `node` em ambiente do repositório real; Playwright ou navegador gráfico completo; ensaio em Android físico; leitor de tela físico; confirmação de propagação do GitHub Pages. O script Node permanece disponível para reprodução. **A validação é simulada, não E2E real**.

## 5. Arquivos e commits relevantes

| Arquivo | Commit de publicação/última correção |
|---|---|
| `dados/questoes-auditadas-s19.js` | `099a573fcfdeaa7f05b1f027a58a2a43e6d820b2` |
| `dados/legislacao-s13.js` | `247997418be35be419496de222d6b0390b0470d2` |
| `revisao-inteligente.js` | `9d59800f0c6efd6d2fe549d10a96148bedabd167` |
| `questoes-leitor-s18.js` | `a4f10183de5ae416e701bead3fd4d75465f05bd3` |
| `caderno-contextual.js` | `d05103b17f2ac1fdc47dc9f0d6bab95665fb11d8` |
| `estudo-integrado.js` | `83eaf3d67da50569c2dcdb581bbe412d604a48f4` |
| `leitor-consolidacao.js` | `65f295a79678b55bc704dde0ea54476006e2ac2a` |
| `leitor-juridico.js` | `c56f7a3b0f703cf0431611ecdf6f0ef00e337121` |
| `index.html` | `4b014ee042671dc3f0a3a8b3289ef99fe6bf24b4` |
| `tests/sprint19-validacao.js` | `a2aa157f1dae167dcf4a6da59f9586848e03ef05` |
| `docs/PROMPT_SPRINT20_2026-11-12.md` | `cc3e70e50b2e8d7eca797ef5863384b77d78dfaa` |

## 6. Pendências e decisões de handoff

- **Principal:** não há teste de navegador/Android físico nem validação de GitHub Pages ao vivo. Testes simulados não provam renderização real, cliques touch, acessibilidade ou cache entregue ao usuário.
- **Integridade:** preservar e validar backups das várias chaves locais, especialmente após atualização de unidades normativas e IDs.
- **Confiabilidade jurídica:** 2023 exige interface A–E e fundamentação por alternativa específica; anulações e alterações do gabarito definitivo já indexadas, mas não servem como certificação. Itens antigos (`of-2015-adv-001` e demais) podem exigir revisão de variante, proveniência e direito atual; não migrar arbitrariamente.
- **Temporariedade:** verificar relógio/fuso para agendamento D+1/D+7/D+21/D+45 no Android real; ambiente simulado e data de execução não replicam todas as condições locais.
- **Auditoria independente:** após AUD03-009, lotes normativos posteriores podem existir ainda sem integração; não atribuir certificação à questão com base apenas em referências numéricas.
- **Fonte jurídica:** CF37, CF49 e Lei 9784 art50 foram adicionados **somente nos fragmentos pertinentes**; é obrigatória a consulta à íntegra oficial para outros efeitos.

**Prioridade escolhida para Sprint 20:** `confiabilidade transversal + experiência mobile + proteção/backup local`, sem iniciar sincronização remota sem consentimento. Prompt completo publicado em `docs/PROMPT_SPRINT20_2026-11-12.md`. **Sprint 20 NÃO iniciada nesta execução.**

## 7. Fechamento

A Sprint 19 cumpre o objetivo de aprofundar o fluxo de questões auditadas sem fragmentar a UI e sem confundir evidência pontual com certificação integral. Código e documentos foram escritos em `main`, porém a aceitação final de UX/Android/Pages fica expressamente pendente. Retestar `node tests/sprint19-validacao.js` em ambiente Node real e navegador compatível antes de declarar validade end-to-end.
