# AGU QUIZ | WORK — AUD-UX-002

Executar exclusivamente AUD-UX-002 somente após novo pedido. Este arquivo é handoff; não autoriza a execução durante AUD-UX-001. Não executar AUD-UX-003/004.

## Objetivo

Simplificar a escolha de assunto e o início/retomada de flashcards e revisão. Reutilizar o aplicativo e os componentes atuais. Priorizar redução de instruções e decisões antes de começar. Não produzir, importar, editar ou publicar livros. Não interferir no capítulo 1 de Constitucional em outro chat.

## Retomada obrigatória

1. Reconfirmar `Talksxb/agu-quiz/main`, PR/HEAD de `work/aud-ux-001-inventario-revisao`, estado de CI, revisão, merge e Pages. Base histórica de AUD-UX-001: `e5436bb071afe0967d29665c0ad042beb084ee13`. Não presumir integração da PR só por este handoff.
2. Ler `docs/AUD-UX-001_INVENTARIO_ACERVO.md`, `docs/AUD-UX-001_DIAGNOSTICO_UX.md`, `docs/AUD-UX-001_ROADMAP.md`, os checkpoints UX-BARALHOS e UX-AGU-006 pertinentes e o resultado real da PR anterior.
3. Aplicar Base Mestra v5.2 FINAL, Padrão Leitura Completa v1.1 FINAL, Caderno e Handoff v2.1 FINAL, Leia-me Primeiro v2 FINAL e GOV-001 de questões oficiais. Não importar progresso de aulas nem criar Caderno/agenda/histórico paralelo.
4. Consultar auditoria privada somente em leitura, no recorte necessário. Último HEAD observado em AUD-UX-001: `c388975985db2f5684deb30bdcc5566edd90af0a`; estado geral AUD03-043, normativo NORM-PEN-030, corte histórico 04/11/2026. Reconfirmar se houver necessidade de afirmar status; não alterar esse repositório ou exportar sua matriz/evidências.

## Problemas já comprovados

- 51 cartões / 11 baralhos, somente ADM/CON/PC; números sujeitos a reconfirmação.
- FC-02: filtros, explicação extensa de estados/níveis e metadados antes de começar.
- FC-03: dificuldade documentada não equivale à avaliação pessoal “Difícil”.
- FC-04: falta indicação simples de prioridade por assunto; usar somente contagens/agenda existentes.
- FC-06/RV-02: sessão de baralho já retoma posição, ordem e avaliação; a fila inteligente legada não tem cursor persistente de sessão curta.
- RV-03: “vencidas” no painel legado inclui hoje; denominador pode abranger referências oficiais que não entram na pontuação automática.
- FC-01 recebeu atalho “Revisar agora” antes dos filtros: usa a seleção original, move ao cartão e mantém prioridade de retomada do baralho interrompido. Não reimplementar o motor.

## Primeiro recorte sugerido

Escolher **uma** melhoria coerente, preferencialmente tornar filtros/instruções avançadas opcionais mantendo seleção de assunto visível. Medir ações e rolagem antes/depois. Garantir que estados/dificuldade não fiquem inacessíveis e que filtros ativos continuem evidentes e fáceis de limpar.

Se resumir a apresentação dos estados, preservar inéditos, vencidos estritos, hoje, futuros e avaliados sem data. Mostrar progresso como avaliações registradas, nunca leitura ou domínio. Não reconstruir prazos/estágios a partir de tentativas importadas.

Se mexer em retomada curta, primeiro demonstrar que a sessão existente comporta o recorte sem perda de dados. Não criar outra fila persistida, algoritmo, chave ou histórico. Caso exija mudança de contrato de dados, separar em sprint própria, documentar a dependência e entregar a melhoria segura de apresentação.

Não ampliar cartões nesta etapa apenas para aumentar números. O inventário recuperou os oito livros e dez candidatos de cartões AMB-06; existência não é aprovação. Não executar reconciliação do catálogo nem integrar capítulos por conveniência.

## Preservação e testes

- Branch própria; não misturar PRs de conteúdo, questões, livros ou auditoria privada.
- Manter `candidates`, `urgent`, `rating`, `DAYS`, IDs, intervalos, tentativas, sessão, armazenamento, backup/restauração, gabaritos e controle de reprodução.
- Preservar testes/fixtures históricos. Se uma mudança de apresentação atingir verificadores de hash, adicionar delta exato e reversível com prova de retorno byte a byte; não ignorar validação ou atualizar arbitrariamente o hash esperado.
- Chromium em 320/360/390/430/1280: toque emulado, teclado, foco, seleção de assunto, filtros ativos/vazios, começar/continuar, avaliações, erro, reloading, sessão interrompida, históricos importados e futuros.
- Exportar/restaurar backup em contexto independente, inclusive com dados preexistentes e reimportação idempotente. Nunca apagar dados do usuário.
- Axe: registrar violações e inconclusivos, reconferir alvos quando necessário e não considerar inconclusivo como aprovado. Android físico/TalkBack somente se executados efetivamente.
- Executar `node tests/aud-ux-001-browser.cjs` e as regressões pertinentes de UX-BARALHOS, CARTOES-AUD, LEG, WORK01 e integridade de questões; controles novos precisam de cobertura real, sem testes que apenas repetem o código.

## Entrega e limite de publicação

Abrir PR própria com problema concreto, mudança, escopo, testes, evidências, HEAD e limitações. Não mesclar/publicar sem os controles aplicáveis e autorização pertinente. CI pendente ou inconclusiva não aprova o gate.

Atualizar checkpoint/roadmap e preparar o próximo prompt autossuficiente, sem executá-lo. Informar sprint concluída/restantes, percentual com denominador explícito, tempo efetivamente medido ou ausência de cronômetro, estimativas total/restante em faixa, contagens reais, melhoria, testes/PR e próxima prioridade.
