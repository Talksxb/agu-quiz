# AGU Quiz — Sprint 18 | Questão oficial auditada integrada à Biblioteca Inteligente

**Data:** 2026-11-12 · **Status:** implementação publicada na branch padrão, validação por leitura posterior; testes JS simulados e confronto documental de fonte primária. **Não validado em Android real nem GitHub Pages ao vivo.**

## Reconhecimento de estado
- Aplicativo: checkpoints `docs/CHECKPOINT_SPRINT17_CONSOLIDACAO_2026-11-12.md` e `docs/CHECKPOINT_REFATORACAO_BIBLIOTECA_2026-11-12.md`; `index.html`, `revisao-inteligente.js`, `estudo-integrado.js`, `caderno-contextual.js`, `leitor-juridico.js` e índices jurídicos.
- Auditoria privada: `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `checkpoints/AUD03-009.json`; **AUD03-009**, status `auditoria_documental_parcial_nao_certificada`, **0 tópicos integralmente certificados**. Matriz original de 412 IDs, preservada.
- Índice AUD02-029: AU2015 200 itens documentados, 192 válidos/8 anulados; AU2023 100 questões indexadas, 93 válidas/7 anuladas; 10 divergências secundárias de mapeamento AU2023 e conflito de PF Q7 ainda impedem promoção automática. Índices = cobertura numérica e proveniência, não fundamentação integral.
- Escopo inicial do Leitor Jurídico: CF arts. 131–132 e Lei 9.784 arts. 11–15, com 18 unidades e vínculos preexistentes. Vários itens da AGU 2015/2023 são sobre temas distintos ou têm somente associação temática a esses dispositivos.

## Item efetivamente publicado
**ID imutável:** `of-2015-adv-048` (novo; não existia no acervo antigo).
- **Concurso:** Advogado da União de 2ª categoria, AGU 2015, CESPE/Cebraspe.
- **Caderno:** `187AGU_001_07`; prova objetiva, item **48**, Certo/Errado.
- **Gabarito oficial definitivo: C (CERTO)**, não anulado.
- **Curricular principal na evidência:** `AGU-04`; secundários `AGU-01`, `CON-50`; **relação específica com `CF88:art131:caput`** conferida pela leitura do item, mas a classificação principal AGU-04 **não foi alterada**.
- **Enunciado:** dentro do app há somente paráfrase autoral identificada, com mesmo sentido lógico afirmativo e mesma chave C. O texto oficial continua disponível no PDF.
- **Tema:** representação judicial e extrajudicial da União pela AGU; investidura institucional ex lege; dispensa de mandato/procuração específica do advogado da União no exercício de suas atribuições.
- **Fundamentos históricos (2015):** CF art. 131 caput; LC 73/1993 art. 1º; STF AO 1.757, 1ª Turma, julgamento 03/12/2013, DJe 19/12/2013.
- **Fundamentação pontualmente revisada (2026):** mesmas fontes normativas compiladas consultadas e o precedente no portal do STF; sem alegar varredura integral de superveniências ou vigência de toda a legislação.
- **Evidência privada rastreável, não copiada:** `evidencias/provas/AUD02-002-provas41a60-20261110.json`, registro `AUD02-Q-257`, gabarito 48 = C, páginas identificadas.
- **Fontes públicas:**
  - Caderno oficial, p.32 (índice 31), questão 48: https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/187AGU_001_07.pdf
  - Gabarito definitivo, p.1, grade 41–60: https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/Gab_Definitivo_187AGU_001_07_SUPER-A4.pdf
  - LC 73/1993 compilada: https://www2.camara.leg.br/legin/fed/leicom/1993/leicomplementar-73-10-fevereiro-1993-354947-normaatualizada-pl.html
  - STF CF art.131 e julgado AO 1.757: https://portal.stf.jus.br/constituicao-supremo/artigo.asp?abrirArtigo=131&abrirBase=CF

**Limite:** 1 questão auditada, não a meta mínima exploratória de 5. Não se fabricaram outras questões por insuficiência de conciliação completa de enunciado, gabarito definitivo, fundamento da época, fundamento atual e relação com artigo/§/inciso disponível. A série 2023 continuou no acervo anterior, sem promoção jurídica indevida.

## Alterações de código publicadas
1. **Novo `dados/questoes-auditadas-s18.js`**: objeto público derivado, 1 questão com ID, chave, anulação, variantes de prova, enunciado parafraseado, justificativas histórica/atual, localizadores, origem, vínculo curricular e URLs oficiais. Sem dados pessoais nem arquivos privados.
2. **Novo `questoes-leitor-s18.js`**: painel de questão no Leitor, navegação direta ao item e registro manual de dificuldade no Caderno contextual. O texto do usuário fica no armazenamento local, não no GitHub.
3. **`revisao-inteligente.js`**: integração do novo item ao mesmo `ALL`, `INDEX` e `INLINE_ADAPTED`; resposta C/E e cálculo de acerto, um único registro em `agu_quiz_revisao_inteligente_v1`, e agendamento original D+1/D+7/D+21/D+45. Correção dos contadores do acervo (24 referências oficiais indexadas, incluindo o novo item; 36 flashcards).
4. **`leitor-juridico.js`**: aba Questões apresenta apenas a questão pertinente ao caput do art. 131, sem repetir a questão em §§1–3 ou nas demais normas.
5. **`estudo-integrado.js`**: referência à questão oficial `questionsSeen` na sessão por dispositivo, ligação à tentativa já armazenada e deduplicação do ID.
6. **`leitor-consolidacao.js`**: indexação pesquisável e filtro `Questões oficiais` do item com localização por dispositivo.
7. **`index.html`**: carga do novo dado antes da Revisão, painel antes do leitor, links diretos em Biblioteca Inteligente → Questões oficiais → item auditado e versões de cache atualizadas. **Quatro áreas principais preservadas**.

## Testes
- Bateria de integração simulada: **67/68**; único desacordo do teste assumia incorretamente que `agu_quiz_planejamento_semanal_v1` com valor fictício inválido `OLD` permaneceria literalmente idêntico após renderização. O módulo normaliza esse valor ao criar a semana.
- **Reteste específico aprovado com JSON válido:** preservação de `settings.dailyMinutes` e semanas existentes; renderizar o planejamento pode gerar uma entrada da semana atual, sem excluir dados.
- Demais verificações: sintaxe de 13 scripts/arquivos; unicidade da única questão nova; chave C, sem anulação, cargo/ano/caderno, URLs oficiais; relação CF131; 16 rotas renderizadas; quatro destinos principais; fluxo C/E, ocultação do gabarito até resposta, direito histórico e atual separados, alternativa E avaliada como erro apesar da escolha subjetiva `facil`, uma tentativa real, vencimento D+1 no motor original, registro na sessão e deduplicação, criação manual de nota de dificuldade no Caderno; flashcards preservados.
- **Sem Playwright/Android real/E2E**. A confirmação do GitHub é da persistência dos arquivos, não da propagação do Pages.

## Limitações e continuidade
- Integração individual é **pontual**, não certificação integral do tópico CON-50, AGU-04 ou de uma cadeia normativa.
- Os gabaritos históricos não serão reescritos por mudanças legislativas posteriores.
- Questões AGU 2023 mantêm referência ao Edital 2022, aplicação 2023, e gabarito definitivo de variante exata. Não confundir com PF/PGFN ou materiais comentados de terceiros.
- Item `of-2015-adv-048` é distinto do `of-2015-adv-001` existente (este mantém processo de conferência separado).
- As demais 299 questões AU2015/AU2023 numericamente indexadas na Auditoria 03 não foram incorporadas automaticamente ao leitor.
- A tela na Biblioteca Inteligente não recebeu novo destino principal.

## Handoff — Sprint 19
**Objetivo recomendado:** expansão controlada do banco de questões oficiais e consistência longitudinal das questões já publicadas. Antes de adicionar, consultar o estado real de AUD03 (atualmente AUD03-009), índices AUD02-029, conflitos AU2023 e caderno/gabarito da mesma variante. Selecionar 3–10 questões relacionadas aos artigos efetivamente disponíveis ou, quando não houver suficientes, ampliar o corpus com fontes oficiais e IDs granulares somente após confirmação. Fazer distinção histórica/atual, revisões, Caderno, links e status; manter navegação com quatro áreas, sem novos destinos. Testar regressões, registrar checkpoint e gerar prompt da Sprint 20; **não iniciar a Sprint 20 na Sprint 19**.