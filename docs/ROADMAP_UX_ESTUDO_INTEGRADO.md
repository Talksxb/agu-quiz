# AGU Quiz — roadmap único de UX Estudo Integrado

Atualizado em 17/11/2026. GitHub é a fonte da verdade. Aulas continuam no ChatGPT. Este documento mede entregas de produto, não cobertura do edital nem desempenho jurídico do estudante.

## Acompanhamento

| Indicador | Estado nesta atualização |
| --- | --- |
| Sprint | 01/03 — diagnóstico, investigação ChatGPT e primeira integração de módulos |
| Estado | Concluída — entregáveis em PR; manter CI da revisão final verde antes da integração |
| Progresso do escopo total | 40% — entregas S01 verificadas, conforme pesos abaixo |
| Início medido | 2026-11-17T13:39:34.309Z (10:39:34 em São Paulo) |
| Última medição | 2026-11-17T14:07:43.101577+00:00 |
| Tempo utilizado | 28 min 8 s até o fechamento técnico/documental; inclui ferramentas/CI até este timestamp. Espera da validação final após este checkpoint consta dos runs da PR; não é timesheet humano |
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
| Regressão S01, cinco larguras, notas e backup | 5 | Concluído — Node 37 suítes + Chromium/35 varreduras da jornada; ver rastreabilidade e revisão final abaixo |
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

## Fechamento técnico e rastreabilidade

- PR [#54](https://github.com/Talksxb/agu-quiz/pull/54), base `main` sem alterações (`31a4769…` na última revalidação). Mergeabilidade confirmada; sem merge/deploy nesta sprint. A PR pode permanecer em rascunho enquanto a revisão final executa; o estado atual dos checks e da revisão está na própria PR.
- Run [44098474542](https://github.com/Talksxb/agu-quiz/actions/runs/44098474542), cabeça `d87cc23…`: **Node e Chromium aprovados**, todas as regressões históricas incluídas; Pages omitido corretamente em PR. Jornada nova: Chromium 159.0.8154.6, cinco larguras, 35 varreduras, zero `violations`, download e restauração de três categorias presentes sem duplicação; contrato completo mantém nove categorias. Resumo no JSON de evidências e artefato 14335177273, SHA-256 `832b76606641e00aa75a0fbdf73d746c0acc8c771d108cf4408a1d4db412aa00`.
- JSON e captura de 390 px foram efetivamente inspecionados. O axe manteve inconclusivos de contraste em controles fora/na borda da área visível e detectou `aria-label` em `div.agu-deck-filters` sem papel. A revisão final corrige esse agrupamento com `role="group"` e acrescenta asserção acessível. Inconclusivos de contraste não são convertidos em falha ou conformidade; ficam como limite a revisar proporcionalmente em S03. Não se alega WCAG integral, Android físico ou TalkBack.
- Revisão final também protege todos os novos atalhos que gravam posição do leitor contra categoria inválida, sem substituir bytes; cenário adversarial verificado na suíte Node. Corrigida apenas a pluralização das novas contagens. Novas execuções de CI desta revisão devem passar antes de integrar; consultar o último HEAD da PR, sem reutilizar um run antigo como prova de código posterior.
- O tempo acima mede até o fechamento deste checkpoint. A espera posterior dos checks não altera o escopo nem autoriza S02. O tempo total decorrido observado será informado ao usuário no encerramento, distinguindo a medição de execução da espera de validação final.

**Pendente da frente completa:** receber síntese de aula (S02), atualizar registros sem efeitos fictícios, refinamento móvel/acessibilidade e aceite/publicação regular (S03). Nenhuma dessas sprints foi executada. Progresso curricular/jurídico não foi modificado.
