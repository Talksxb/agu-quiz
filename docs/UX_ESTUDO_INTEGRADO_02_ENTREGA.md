# UX Estudo Integrado 02 — síntese da aula no Caderno existente

17/11/2026. Somente S02 executada; S03 não executada.

## Base e dependência

Main reconfirmada: `31a47693b8f690e543f565c83208e3cdc637a547`. PR #54 da S01 continua aberta, pronta para revisão, cabeça `517dcd842a7ba7b93ba2c21d5a386a6ae402d163`, CI 44099812436 verde. S02 parte desse commit, na branch `feat/ux-estudo-integrado-02`; sua PR deve mirar **feat/ux-estudo-integrado-01**, declarando dependência. Não foram mescladas as PRs #49–54. Produção confirmada somente leitura: HTML SHA-256 `71a30f8c930cbd254bc4d22b4d9d400b322dcf92e700a6afabda79419de75ded` e **21 assets** iguais à main. Ela ainda não contém as duas sprints desta frente.

A investigação OpenAI de S01 foi reaproveitada, sem novas APIs ou reconstrução do diagnóstico. O arquivo permite trazer um encerramento desta conversa ou de outra aula; não acessa o histórico privado do ChatGPT. Não houve alteração ou cópia de evidências da auditoria privada.

## Contrato definido antes do consumidor

Ver `UX_ESTUDO_INTEGRADO_02_CONTRATO.md`. Um JSON `agu-aula-v1`, até 32.768 bytes, UTF-8 estrito, chaves exatas, ID estável, data civil, disciplina, módulo pedagógico e código granular separados. Inclui conceitos, erros relatados, fontes com estado declarado, hipótese/evolução, aplicação, retomada e pontos para caderno. Rejeita JSON inválido/repetição de chaves, HTML, controles, URLs com credenciais/protocolo indevido, listas/textos acima dos limites e campos conflitantes.

A sintaxe de um código recebido não comprova o vínculo. ADM-02 pedagógico não vira ADM-06 ou outro ID por inferência. O padrão do destino é **Sem vínculo curricular**; o estudante pode escolher explicitamente um tema legado da disciplina. Código desconhecido permanece textual, com aviso. A fonte informada não é consultada nem certificada pelo importador.

## Implementação e efeitos

- Atalho Home/Estudar → **Trazer aula do ChatGPT**, dentro do Caderno AGU atual.
- Seleção local de arquivo, prévia integral, destino opcional, confirmação visível, cancelamento sem gravação e atualização da prévia.
- Instrução curta para o encerramento no ChatGPT e exemplo sintético baixável. O exemplo não representa aula real nem contém texto jurídico alterado.
- Um registro aditivo em `agu_quiz_mvp1_2026.notebook`. `backup-local-s20.js` e suas **nove categorias** permanecem byte a byte iguais. Não há décima categoria, índice de aulas, armazenamento paralelo ou cópia automática em Caderno contextual/forNotebook.
- Origem, conceitos/erros/fontes e ponto de retomada visíveis no registro recolhível e na exportação Markdown. A exportação da síntese escapa marcação; a tela renderiza texto escapado.
- Datas civis YYYY-MM-DD são exibidas como data civil, evitando que UTC vire o dia anterior em São Paulo. Datas ISO de registros anteriores mantêm a interpretação original.
- Código granular reconhecido oferece atalho explícito ao assunto existente depois de salvar. Isso não altera a matriz nem cria tentativas.

A importação não representa resposta de questão/cartão, horas estudadas, domínio ou conclusão de tarefa. `evidenceCount:0`, `answers:[]`, `revisions:[]` no registro importado. **Progresso/agenda só avançam pelos atos válidos nos módulos já existentes.** Essa limitação é deliberada: o arquivo conserva conceitos e erros para orientar consulta/revisão, sem transformar relato de aula em pontuação fictícia.

## Preservação e deduplicação

ID persistido: `chatgpt:` + ID estável recebido. Mesma identidade e mesmo conteúdo/destino após reload ou restauração: duplicata, sem gravar. Mesma identidade com conteúdo/destino diferente: conflito, preservando o original, sem sobrescrever ou gerar ID alternativo automaticamente.

Antes de aplicar, lê e valida o histórico principal completo e compara seus bytes aos da prévia. Mudança externa exige nova conferência. Constrói cópia aditiva, valida o contrato existente/limite de backup e só altera memória após uma escrita bem-sucedida. Quota, armazenamento bloqueado ou inválido não substituem bytes anteriores. O mecanismo é local; não promete exclusão mútua distribuída ou sincronização entre aparelhos. A última leitura de arquivo vence; cancelar invalida resultados assíncronos anteriores.

## Verificações e limites

- **38 suítes Node locais aprovadas**: 37 herdadas + 13 cenários novos, incluindo UTF-8 inválido, limites em bytes, duplicatas/conflitos, namespaces, cancelamento/corrida, quota, alteração desde prévia, histórico preservado e restauração/idempotência.
- Prévia real no Chromium: Home → arquivo sintético → destino explícito → confirmação → um registro visível no Caderno, sem resposta gerada. Captura `evidencias-ux-estudo-integrado-02/caderno-aula-desktop.jpg` inspecionada. Uma chamada de automação de seleção de arquivo durou 528 segundos; esse tempo não isola a leitura/parse de JSON e não é benchmark do Android.
- CI nova exige Chromium 320/360/390/430/1280 com timezone São Paulo; download do exemplo/Markdown/backup, prévia, cancelamento, duplicata, conflito, quota sintética, cinco categorias presentes restauradas e nove categorias preservadas. Todas as regressões anteriores permanecem no workflow.
- Workflow passou a aceitar PR com base na branch S01, pois esta entrega é empilhada; executar exclusivamente as suítes de teste não antecipa S03.
- Resultados finais da CI e da PR ficam no roadmap/descrição da PR. Não afirmar CI aprovada antes da execução. Axe `incomplete` é registrado separadamente; não equivale a conformidade. Android físico e TalkBack não testados.

## Decisões e continuidade

Não adotar MCP/backend nesta sprint. O arquivo estruturado usa a infraestrutura atual e não exige nova chave ou inferência no site. O Caderno contextual não é destino automático: seu contrato restrito por dispositivo/fontes não pode ser contornado.

S03 deve partir dos artefatos efetivamente produzidos, corrigir apenas dificuldades demonstradas, verificar os caminhos móveis e acessibilidade/persistência/backup, e preparar integração/publicação regular conforme autorização. A cadeia #54 → PR S02 precisa ser respeitada; não copiar arquivos antigos sobre main mais nova. Handoff completo: `PROMPT_UX_ESTUDO_INTEGRADO_03.md`.

### Validação final do produto e fechamento documental

A PR é #57, dependente de #54. CI 44109421365 aprovada no produto `a589edb…`: 38 suítes Node e todas as regressões Chromium; nova jornada com 30 varreduras nas cinco larguras, zero violações automáticas e apenas color-contrast inconclusivo. Artefato/JSON e captura de 390 px inspecionados; resumo versionado em `evidencias-ux-estudo-integrado-02/ci-44109421365-resumo.json`. O fechamento seguinte altera somente documentos/evidências; conferir seus checks atuais na PR. Progresso verificado 70%; S03 não executada.
