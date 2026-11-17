# AGU Quiz — roadmap único de UX Estudo Integrado

Atualizado em 17/11/2026. GitHub é a fonte da verdade. Aulas continuam no ChatGPT. Este documento mede entregas de produto, não cobertura do edital nem desempenho jurídico do estudante.

## Acompanhamento

| Indicador | Estado nesta atualização |
| --- | --- |
| Sprint | 01/03 — diagnóstico, investigação ChatGPT e primeira integração de módulos |
| Estado | Parcial: implementação pronta; CI Chromium e regressão completa pendentes |
| Progresso do escopo total | 35% aceitos; mais 5 pontos dependem dos testes da entrega |
| Início medido | 2026-11-17T13:39:34.309Z (10:39:34 em São Paulo) |
| Última medição | 2026-11-17T13:55:37.841057+00:00 |
| Tempo utilizado | Medição por relógio entre os timestamps acima; será consolidada após os checks. Inclui ferramentas/espera; não é timesheet humano |
| Tempo total estimado | 2–4 horas para as três sprints com importação local simples; incerteza alta |
| Tempo restante | 1,5–3,5 horas, faixa inicial a recalibrar após CI/S02 |
| Próxima sprint | 02 — síntese estruturada de encerramento, prévia e aplicação aos registros existentes |
| Publicação | Branch `feat/ux-estudo-integrado-01`; [PR #54](https://github.com/Talksxb/agu-quiz/pull/54) aberta em rascunho; sem merge ou deploy desta entrega |

A faixa usa o trabalho observado nesta execução (navegação pequena, módulos reutilizados e regressão extensa). A maior incerteza é a compatibilidade/deduplicação do registro de aula e validação no celular; não inclui construir servidor MCP. Não se promete preço ou prazo de infraestrutura não contratada.

## Critérios de progresso (100 pontos)

Os pesos se referem ao escopo total desta frente e são contados apenas com entrega verificável, sem proporção automática pelo número de sprints.

| Entrega | Peso | Evidência / estado |
| --- | ---: | --- |
| Estado real, produção, PRs e diagnóstico dos módulos | 10 | Concluído — relatório S01 e hashes HTTPS da base |
| Investigação oficial ChatGPT e escolha do caminho simples | 10 | Concluído — fontes oficiais e limitações no relatório S01 |
| Entrada por assunto com vínculos reais e retorno entre módulos | 10 | Concluído em branch — 12 códigos públicos, seleção exata e prévia |
| Retomada de baralho pela Home usando o motor existente | 5 | Concluído em branch — ID/ordem/tentativa preservados em teste Node |
| Regressão S01, cinco larguras, notas e backup | 5 | Pendente da CI Chromium; suíte Node nova e testes históricos preparados |
| Recebimento de síntese e registro no Caderno existente | 20 | S02, não iniciado |
| Aplicação consentida a progresso/revisão sem falsas respostas ou horas | 10 | S02, não iniciado; aceitar também limites explícitos quando dados insuficientes |
| Refinamento móvel e validação integrada/acessível | 15 | S03, não iniciado; não presumir dispositivo físico disponível |
| Aceite final, verificação de persistência e preparação/publicação regular | 15 | S03, não iniciado |

## Sprints e dependências

1. **S01 — esta execução:** diagnóstico incremental, investigação oficial, navegação útil, retomada e regressão. Entrega via PR própria. Não importar aulas nesta sprint.
2. **S02 — nova autorização:** baixar/selecionar JSON compacto gerado no encerramento no ChatGPT; validar versão/limites/identidade, mostrar prévia, confirmar assunto e aplicar ao Caderno já existente. Deduplicação, erro/rollback e backup são critérios obrigatórios. Não tratar ADM-02 pedagógico como um ID granular equivalente por inferência. Não gerar tentativas/tempo automaticamente.
3. **S03 — nova autorização:** corrigir dificuldades comprovadas no celular, refinar retorno e filtros, validar acessibilidade/persistência/backup, revisar integração e preparar publicação no Pages. Android físico e TalkBack só podem ser declarados se executados; indisponibilidade deve ser registrada como limite, não provocar sprints repetitivas sem evidência nova.

Mantidas **três sprints**: os módulos existentes suportam o primeiro incremento sem reconstrução e o arquivo estruturado evita infraestrutura adicional. Acrescentar uma sprint somente se surgir requisito ou bloqueio concreto que não caiba nesses entregáveis, justificando no mesmo roadmap. MCP/backend não faz parte da estimativa aprovada para esta sequência.

## Decisões e dificuldades

- Reaproveitar WORK01/LEG07–13 e UX-Baralhos, sem novo professor, calendário, agenda ou lista física.
- Sem código curricular literal, não ligar dispositivos, perguntas ou estatística. CC/CPC sem `topic` continuam acessíveis na biblioteca geral, com seus estados atuais.
- A lista do leitor só oferece os tópicos já presentes em seu índice; para outro código, a nova navegação sinaliza e abre a lista geral. A origem do formulário permanece visível e deve ser conferida antes de criar marcação.
- Sessão integrada mantém prioridade anterior na Home; baralho é retomado antes da próxima tarefa do plano quando não existe sessão integrada aberta. Os motores não têm timestamp comum de última interação que justifique escolher pelo mais recente.
- Autenticação de escrita por Git/CLI ausente; entrega publicada pelo conector GitHub, com árvore idêntica ao commit local verificada por Git. Não salvar credenciais no código.
- Hashes/cache históricos representam versões anteriores. Novo delta encadeia as mudanças e testa todos os arquivos/fixtures que permanecem intocados.
- Prévia temporária, sem configuração de hosting na PR; captura apenas com dados sintéticos. Nenhum GPT Site publicado.

## Histórico desta sprint

- Base: `31a47693b8f690e543f565c83208e3cdc637a547`.
- PRs concorrentes na abertura: #49–53, documentação/cotejo; não mescladas nesta execução.
- Produção de base confirmada por HTTPS/hashes antes de editar.
- Resultado e limites técnicos: [diagnóstico S01](UX_ESTUDO_INTEGRADO_01_DIAGNOSTICO.md).
- Continuidade exclusiva: [prompt S02](PROMPT_UX_ESTUDO_INTEGRADO_02.md). **S02 não executada.**

- Validação intermediária: 37/37 suítes Node aprovadas localmente e no run [44097954000](https://github.com/Talksxb/agu-quiz/actions/runs/44097954000). Primeiro Chromium falhou no seletor `getByLabel` exato do teste, antes da seleção da disciplina. Corrigido para o ID do controle rotulado, preservando teclado/axe e todos os critérios; diagnósticos axe passam a ser gravados a cada etapa, inclusive em falha. Nova CI obrigatória.
