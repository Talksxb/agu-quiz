# CHECKPOINT INTERFACE-AGU-003 — validação nativa condicionada, sem alteração de produto

**Consulta:** 24/11/2026 (America/Sao_Paulo). **Lote:** INTERFACE-AGU-003 exclusivamente. **Decisão:** documentação diagnóstica; não há dispositivo Android/TalkBack acessível ou autorizado nesta execução para um ensaio observacional. Nenhum defeito novo foi reproduzido em hardware real, portanto **não criar patch visual, PR de produto nem redeploy**.

## Retomada e governança efetivamente consultadas

- Projeto: `Talksxb/agu-quiz`; ramo de produção `main` no SHA `ce027ca3dd20755f1dcc621037cb55aff4e8787c` (consulta ao ref GitHub nesta execução); Pages: https://talksxb.github.io/agu-quiz/.
- Fonte documental: `docs/CHECKPOINT_INTERFACE-AGU-002.md` e `docs/PROMPT_INTERFACE-AGU-003.md` da `main`, mais PR [#89](https://github.com/Talksxb/agu-quiz/pull/89) e seus dois comentários de fechamento. A PR #89 consta integrada por squash exatamente no SHA da main acima.
- Gate editorial/pedagógico: Base Mestra v5.2 FINAL, Padrão Leitura Completa v1.1 FINAL, Caderno e Handoff v2.1 FINAL e Leia-me Primeiro v2 FINAL disponíveis no Projeto. Esta verificação é de interface; **não modifica status de auditoria, nem mede domínio por acesso/leitura**. Não se consultou `Talksxb/agu-auditoria` nem acervo privado porque não há objeto jurídico a revalidar neste escopo.
- Fonte de código consultada: `leitor-juridico.js`, funções `mobile`, `tab`, `step`; teste `tests/interface-agu-002-browser.cjs`; workflow `.github/workflows/agu-sprint20-ci.yml`.

## Novas evidências verificadas nesta retomada

A documentação final da 002 ainda descrevia o resultado da CI **pendente** e seus comentários na PR registravam o workflow pós-merge **em andamento**. Nesta execução foram verificados os fechamentos efetivos:

1. [CI pré-merge #45296425031](https://github.com/Talksxb/agu-quiz/actions/runs/45296425031): `success`, HEAD testado `f4163e24a5685493f86f514a0c57cf15748fece5`, anterior ao squash.
2. [Deploy Pages #45297372375](https://github.com/Talksxb/agu-quiz/actions/runs/45297372375): `success`, HEAD `ce027ca3dd20755f1dcc621037cb55aff4e8787c`; jobs build, report-build-status e deploy concluídos com sucesso.
3. [CI pós-merge #45297373885](https://github.com/Talksxb/agu-quiz/actions/runs/45297373885): agora **concluída com `success`** no mesmo SHA da `main`. Jobs `integridade-node`, `navegador-chromium`, `exportacao-editorial` e `pages-publicado` com `success`; `pages-revisao-compativel` corretamente `skipped` nessa execução de push.
4. Na CI pós-merge, o passo **“Verificar HTTPS, HTML e hashes do GitHub Pages ativo”** passou, assim como as jornadas publicadas de Biblioteca 02, Códigos CC/CPC e outras regressões. Esta é verificação automatizada da URL pública no CI, **não** ensaio visual em aparelho.
5. Log do navegador do job `138121080343`: `INTERFACE_AGU_002_BROWSER_OK {"profiles":5,"zoom200":true,"androidPhysical":false,"talkBackPhysical":false,"axeInconclusive":1}`. Os cinco perfis são **320, 390, 430, 768 e 1280 px**; os testes percorrem painel ativo, texto 200%, foco, rolagem, seleção, anotações sintéticas e retorno. O contador `axeInconclusive:1` significa que **um dos perfis em que o axe foi executado** (390 ou 1280 px) teve resultado incompleto. O log consolidado não identifica qual critério/nó; sem inspeção do relatório detalhado, não atribuir causa, falha de contraste ou aprovação WCAG.
6. No mesmo log, `BIBLIOTECA_02_BROWSER_OK` registrou `violations:0, incomplete:0` em 390 px e `violations:0, incomplete:1` em 1280 px, **para aquele teste específico**; não deduzir que a incompletude do teste INTERFACE-AGU-002 necessariamente seja o mesmo nó. A Sprint 32 de foco em formulários concluiu com sucesso.
7. Artefato de testes sintéticos disponível no GitHub Actions: `agu-s20-chromium-viewports`, ID `14878175237`, na execução #45297373885. O inventário foi consultado; os bytes originais e eventuais capturas não foram inspecionados nesta etapa. Não são evidência Android/TalkBack.

## Diagnóstico de acessibilidade (alcance e lacunas)

| Critério | Evidência efetiva | Estado |
| --- | --- | --- |
| Rotas e alternância Índice / Texto legal / Relacionados | Código existente + regressão Chromium aprovada | Funcional em emulação; **sem verificação com leitor de tela** |
| Estado do painel ativo | `aria-pressed` atribuído aos botões pelo leitor existente; regressão de DOM | Semântica presente no código; **anúncio no TalkBack não medido** |
| Contexto norma/artigo e foco no dispositivo | Texto de contexto e foco em `.agu-unit.selected`; regressão de foco Sprint 32 aprovada | Emulação aprovada; **ordem e anúncio nativos não medidos** |
| Voltar ao acervo e preservar seleção/notas | Botão da rota `setView('library')`, teste sintético de retorno e persistência | Emulação aprovada; **Android real não testado** |
| Rolagem e texto 200% | Check geométrico em cinco larguras | Sem transbordamento nos cenários testados; **não comprova zoom/configuração de fonte real do Android** |
| Contraste e conformidade WCAG | Axe com uma incompletude no teste 002 | **Pendente de análise específica e medição manual**, sem certificação |
| Android físico, Chrome, TalkBack | Nenhum hardware/navegador Android vinculado à sessão | **Não realizado** |

**Não há evidência de um novo defeito de produto**, nem evidência para declarar experiência nativa correta. Ausência de achado em emulador não implica aprovação em TalkBack.

## Roteiro para executar somente quando existir dispositivo autorizado

Utilizar **perfil/aba de teste separado**, sem importar backup real, limpar armazenamento pessoal, anotar dados privados ou criar estados de domínio. Registrar previamente **modelo do aparelho, Android, navegador/versão, versão TalkBack, configuração de fonte/zoom, data e commit publicado**. Relatar passos, resultado esperado, observado e, se permitido, gravação curta sem dados pessoais.

1. Acessar https://talksxb.github.io/agu-quiz/ e percorrer com gestos/leitura por controles **Início → Biblioteca Inteligente → Legislação e materiais**. Confirmar nome de cada destino, leitura do cabeçalho, contexto da norma e do artigo, e foco inicial.
2. Alternar **Índice / Texto legal / Relacionados**. Confirmar se TalkBack anuncia nome, natureza de botão e estado pressionado, se o painel exibido condiz com o anunciado e se o foco não fica oculto pela barra de navegação.
3. No **Índice**, abrir um artigo, navegar por títulos/cabeçalhos e ler um dispositivo longo. Conferir anúncio inteligível de artigo, parágrafo/inciso, ordem de leitura e preservação de unidade ao retornar.
4. Abrir **Relacionados**, voltar a **Texto legal** e conferir posição de leitura e referência de dispositivo. Usar teclado externo apenas se realmente conectado; não confundir com gestos TalkBack.
5. Acionar **Voltar ao acervo** e reabrir **Legislação e materiais**. Conferir a mesma norma e dispositivo e eventual anotação de teste, sem afirmar sincronização entre aparelhos.
6. Repetir pontos críticos com tamanho de texto/acessibilidade ampliados até 200% se o aparelho permitir, sem cortar conteúdo ou ocultar controles. Documentar se houver diferença entre ampliação por fonte e zoom do navegador.
7. Para um possível problema de contraste, **identificar o nó/regra do relatório axe** e medir cores reais sobre o fundo correspondente, nos estados normal/foco/pressionado. Um `incomplete` é triagem, não falha nem aprovação automática.

**Critério para patch:** registrar falha reproduzível com versão, ambiente, passos, impacto na compreensão/operabilidade, evidência antes; corrigir apenas a navegação ou apresentação afetada, preservar contratos, testar a correção e regressões pertinentes. Então abrir branch/PR de produto com CI do HEAD exato. **Se não houver falha observada**, encerrar a inspeção sem PR/patch; não inventar diferenciais para produzir contagem de testes.

## Decisão e entrega

- Branch documental isolada: `docs/interface-agu-003-native-a11y-checkpoint`, fundada no SHA de produção `ce027ca3dd20755f1dcc621037cb55aff4e8787c`.
- **Arquivos de produto alterados:** zero. **Testes repetidos:** zero. **PR:** não aberta, pois não há correção de produto reproduzível; evitar acionamento desnecessário da mesma suíte emulada por uma PR exclusivamente documental. **Merge/deploy:** não efetuados nesta etapa.
- Status: **INTERFACE-AGU-003 — diagnóstico documental fechado; validação em dispositivo real PENDENTE DE EVIDÊNCIA**.
- Próxima ação condicionada: utilizar `docs/PROMPT_INTERFACE-AGU-003_RETOMADA_NATIVA.md` **somente** quando houver Android/TalkBack autorizado ou relato novo e reproduzível. **Não avançar artificialmente para INTERFACE-AGU-004.**
