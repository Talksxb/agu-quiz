# AGU QUIZ | WORK — UX ESTUDO INTEGRADO 02

**Handoff autossuficiente. Não executar durante S01. Depende de nova autorização explícita. Executar somente S02, não S03.**

## Objetivo e papéis

Conectar o encerramento das aulas realizadas no ChatGPT aos registros já existentes do AGU Quiz. ChatGPT mantém diálogo socrático, fundamentação/correção e aprofundamento. O site recebe uma síntese curta para consulta e retomada; não vira professor virtual. Reutilizar cadernos, revisão, progresso e backup; não criar outro banco de aulas, caderno, revisão ou calendário.

Aplicação: https://github.com/Talksxb/agu-quiz
Produção: https://talksxb.github.io/agu-quiz/
Auditoria privada: https://github.com/Talksxb/agu-auditoria (somente leitura se realmente necessária; nunca exportar matrizes/evidências ao repositório público).

## Retomada factual obrigatória, sem repetir o diagnóstico

1. Consultar `main` real, PRs abertas e estado de publicação. A base histórica S01 é `31a47693b8f690e543f565c83208e3cdc637a547`; a entrega está em `feat/ux-estudo-integrado-01`. Localizar sua PR por branch se o número ainda não estiver no roadmap. Não assumir que foi mesclada.
2. Ler **uma vez** `docs/ROADMAP_UX_ESTUDO_INTEGRADO.md` (fonte única de progresso/tempo), `docs/UX_ESTUDO_INTEGRADO_01_DIAGNOSTICO.md`, resultado final dos checks da PR S01 e as observações posteriores no roadmap. Não repetir a investigação geral nem executar novamente sprints antigas documentais.
3. Se S01 está na main, partir da main atual. Se permanece aberta, não mesclar sem checar autorização/concorrência: trabalhar empilhado sobre a branch da S01, declarando dependência e base da PR; não copiar arquivos obsoletos sobre main mais nova. Sem rebase/force push para resolver concorrência.
4. GitHub permanece fonte da verdade; GPT Sites são cópias independentes, sem sincronização comprovada. Não publicar nos GPT Sites. Preservar todos os dados reais; testes mutáveis apenas em contextos sintéticos independentes.

## O que S01 já entregou

- `navegacao-estudo.js/.css`: Biblioteca por assunto, filtro de disciplina/busca, 12 códigos públicos da união de 11 baralhos e 5 códigos em artigos; recursos aparecem apenas quando há vínculos literais.
- Acesso de assunto a legislação, cartões, seleção de revisões, questões diretamente relacionadas, progresso registrado e lista existente Para meu caderno. Retorno ao assunto em legislação/revisão.
- `AGUReview.browseTopic(code,status)`: abre biblioteca original por código exato, sem iniciar/substituir sessão ou avaliar. `deckClearFilters`/busca mantêm a navegação geral.
- `AGUHome.next/continueStudy`: sessão integrada conserva prioridade; baralho válido em andamento vem antes do plano se não houver sessão integrada. Retoma ordem/índice/avaliações do motor original.
- Sem alterações no corpus, relações jurídicas, fontes, questões, agenda, esquema de armazenamento ou nove categorias de backup.
- Nova regressão Node e Chromium em 320/360/390/430/1280; consultar resultados reais no roadmap/PR. Android físico/TalkBack não foram presumidos.
- Arquivo de síntese/MCP **não implementados**. Esta é a missão S02.

## Decisão técnica herdada

A documentação oficial consultada em S01 demonstra envio explícito por ferramenta MCP, com serviço/autenticação/estado durável; não concede ao site leitura automática do histórico privado do projeto. Sign in with ChatGPT não concede acesso às conversas. O Pages atual só tem localStorage por origem/navegador; um servidor não consegue alterar esse estado remotamente. Nenhuma integração MCP AGU foi criada/testada.

Caminho recomendado para esta sprint: **arquivo JSON compacto de encerramento de aula**, gerado no ChatGPT, selecionado no site, validado e pré-visualizado, com confirmação antes de aplicar. Evitar copiar diálogos grandes. Sem inferência por API, segredo no navegador, scraping, cookies, endpoints internos ou payload privado em URL. Reusar a pesquisa documental S01; atualizar apenas as fontes necessárias se a plataforma mudar ou surgir API oficial relevante.

## Contrato e implementação pequena

Fechar um esquema versionado com identificador estável do registro, data, disciplina, módulo pedagógico original, código curricular exato quando conhecido, conceitos trabalhados, erros identificados, dispositivos/fontes, ponto de retomada e pontos para caderno. Definir limites pequenos e explícitos de bytes, listas e texto; rejeitar estrutura desconhecida/HTML executável/campos conflitantes sem gravação parcial.

**Namespaces:** ADM-02 nos anexos pedagógicos é Atos Administrativos. ADM-06/17/23 etc. são IDs granulares públicos. Não traduzir automaticamente por nome, prefixo ou semelhança. Mostrar ao usuário o código recebido e o destino proposto; solicitar escolha explícita quando o contrato não demonstrar correspondência. Conteúdo sem vínculo confiável deve continuar como síntese sem associação inventada.

**Destino:** examinar o formulário de encerramento do Caderno AGU existente em `index.html` (`notebook`, `makeNotebook`, `md`) e seu validador S20. Ele já registra hipótese/evolução, aplicação e resumo, com tema legado `ADM/Atos administrativos`. Reusar esse armazenamento/registro, adaptando apenas o necessário, com proveniência de aula e deduplicação estável, sem substituir entradas anteriores. O contrato concreto deve ser documentado antes do patch que o consome.

O Caderno contextual S15 (`caderno-contextual.js`) tem `create`, `valid`, `importJSON`, mas exige dispositivo permitido, tema coincidente e fontes da allowlist de recursos. Não fingir um dispositivo ou origem para satisfazer esse validador. Se um vínculo contextual for realmente conhecido, reutilizar o caminho existente e comprovar sua necessidade; não duplicar a mesma aula nos dois cadernos. A lista `forNotebook` serve a perguntas breves para escrever à mão, não a armazenar outra cópia da aula inteira.

**Efeitos:** abrir/pré-visualizar/importar síntese não é evidência de domínio nem resposta a cartão. Não fabricar `attempts`, `ratings`, datas de revisão, horas ou conclusão de tarefa. Conceitos e erros podem compor o registro e orientar a escolha dos recursos existentes. Agendar/confirmar estudo só por ações válidas já existentes e decisão explícita. Documentar honestamente o que a aplicação atual consegue atualizar.

**Persistência:** importação aditiva/idempotente, duplicata preservada, confirmação concreta, validação integral antes de gravar, proteção contra quota/armazenamento inválido, rollback se necessário. Não criar décima categoria de backup nem migração automática para outro domínio. Backup antigo deve continuar legível; o novo registro deve sobreviver a exportar/restaurar pelo mecanismo existente.

## Critérios de aceite

- Jornada utilizável no Android por arquivo pequeno, com exemplo sintético e instrução curta de encerramento no ChatGPT.
- Prévia mostra tema/destino, conteúdo e efeitos; cancelamento não grava.
- Um único registro correto no Caderno existente; reimportação não duplica e não apaga dados.
- Fontes e códigos mantêm proveniência/qualificação; ausência de vínculo é explícita.
- Nenhuma resposta, revisão, plano ou tempo falso ao importar.
- Testes de esquema, limites, entrada malformada, duplicata, falha de gravação, cancelamento e compatibilidade de backups.
- Preservar as 37 suítes Node existentes na S01 e toda a CI histórica. Acrescentar regressões proporcionais; manter fixtures antigas e encadear novo delta de hashes se houver mudança de produto.
- Chromium 320/360/390/430/1280: importação/teclado/foco/retorno, persistência, notas, revisão, backup e axe. Registrar `incomplete` separadamente. Não chamar viewport de Android físico/TalkBack.

## Entrega e encerramento obrigatório

Branch própria, PR no agu-quiz com base explícita e checks reais. Sem merge forçado, sem publicação automática nos GPT Sites. Não executar S03.

Atualizar apenas o roadmap único com número/objetivo/estado, percentual por entregas ponderadas verificáveis, timestamps e duração observada (incluir limite da medição), estimativa total/remanescente em faixa, dependências, PR/integração/produção. Não inventar tempo executado; recalibrar a faixa S01 conforme esforço observado.

Registrar decisões/dificuldades e gerar `docs/PROMPT_UX_ESTUDO_INTEGRADO_03.md` completo e autossuficiente, condicionado a nova autorização. No fim, apresentar resultado concreto, teste/limites, link da PR e próximo objetivo. Não repetir diagnósticos concluídos nem criar série de sprints sem nova hipótese verificável.
