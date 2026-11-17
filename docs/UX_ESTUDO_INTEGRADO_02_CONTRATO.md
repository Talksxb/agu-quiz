# Contrato de encerramento de aula — UX Estudo Integrado 02

17/11/2026. Definido antes do patch consumidor. Base: S01 `517dcd842a7ba7b93ba2c21d5a386a6ae402d163`, PR #54 aberta; main/produção em `31a47693b8f690e543f565c83208e3cdc637a547`. S02 será empilhada sobre a branch S01; nenhuma mesclagem das PRs #49–54.

## Arquivo `agu-aula-v1`

JSON UTF-8, no máximo **32.768 bytes**, um registro por arquivo. Todas as chaves abaixo são obrigatórias; desconhecidas, repetidas, valores de tipo incorreto, HTML em campos textuais, controles inválidos e conflitos entre disciplina e código granular são rejeitados antes de gravar.

| Campo | Tipo e limite |
| --- | --- |
| schema | Literal `agu-aula-v1` |
| id | `aula-` seguido de identificador estável ASCII minúsculo, total 13–85 caracteres; manter ao reexportar a mesma aula |
| data | Data civil real `YYYY-MM-DD`; sem hora inventada |
| disciplina | Código de 2–8 letras maiúsculas; não é garantia de vínculo com o currículo do Quiz |
| moduloPedagogico | Texto de 1–120 caracteres, preservando o namespace da aula |
| assuntoCurricular | Código granular declarado, ou `null`; desconhecido é indicado como não reconhecido, sem mapeamento presumido |
| titulo | Texto de 1–140 caracteres |
| conceitos | 1–12 textos de até 500 caracteres |
| erros | 0–8 textos de até 500 caracteres; relatos da aula, não tentativas do Quiz |
| fontes | 0–12 objetos com exatamente `dispositivo` (1–200 caracteres), `url` (`null` ou HTTPS de até 1.200 caracteres, sem credenciais) e `verificacao` (`consultada_na_aula` ou `a_conferir`) |
| hipoteseEvolucao | Texto de 0–1.000 caracteres |
| aplicacaoAgu | Texto de 0–1.000 caracteres |
| retomada | Texto de 1–800 caracteres |
| paraCaderno | 0–8 textos de até 350 caracteres; ficam na síntese, sem outra cópia automática em `forNotebook` |

O limite total em bytes prevalece sobre a soma dos máximos por campo. Conteúdo é texto, nunca HTML executável; URL fornecida não é buscada nem certificada. A fonte indicada como consultada é declaração do encerramento, não validação do importador. Sem API, backend ou token.

## Prévia e escolha do destino

A prévia deve mostrar integralmente a síntese, disciplina, módulo, código granular e destino. O seletor oferece **Sem vínculo curricular** e os temas legados existentes da disciplina. Não traduz ADM-02 pedagógico em ADM-06/17/23 nem códigos granulares em temas legados. Nenhum tema é escolhido automaticamente. Código granular desconhecido permanece como texto informado; conteúdo sem vínculo pode entrar como síntese sem associação curricular.

Salvar requer confirmação visível do conteúdo/destino e botão explícito. Cancelar e selecionar arquivo não gravam. A prévia é temporária; um arquivo anterior que termine de ler depois do cancelamento/nova seleção não pode substituí-la.

## Registro já existente, sem novo armazenamento

Somente um registro é acrescentado a `agu_quiz_mvp1_2026.notebook`. Não se altera `backup-local-s20.js`, a categoria principal versão 1 ou as nove categorias S20. O registro usa os campos atuais:

- `id`: prefixo reservado `chatgpt:` + ID estável da aula; deduplicação por identidade.
- `title`: indicação de aula no ChatGPT + título recebido.
- `topic`: tema legado escolhido manualmente, ou rótulo descritivo `Sem vínculo curricular` (não é ID curricular novo).
- `date`: data civil recebida, sem inventar horário.
- `summary`: representação textual completa e determinística de todos os campos, origem, limites e destino, inclusive conceitos, erros, fontes, retomada e pontos para caderno.
- `hypothesis` / `agu`: textos recebidos; `evidenceCount:0`, `answers:[]`, `revisions:[]`, `state:'Registro de aula — sem avaliação no Quiz'`.

Nada é acrescentado em respostas, sessões, tema/progresso, agenda ou planejamento. Um código granular reconhecido pode dar um atalho **explícito** aos recursos existentes; não cria agendamento ou pontuação. A consulta do histórico e a exportação Markdown devem mostrar toda a síntese; o Caderno contextual S15 não recebe outra cópia.

## Deduplicação e gravação

Mesmo ID e mesmo conteúdo/destino: informar que já existe, sem gravar. Mesmo ID com outro conteúdo ou destino: conflito, preservar o original, sem substituir ou criar novo ID automaticamente. A representação persistida deve sustentar essa comparação também após reload e restauração, sem índice paralelo.

Antes de salvar, reler e validar integralmente a categoria principal. Comparar seus bytes com os da prévia; se tiver mudado, pedir nova conferência da prévia. Montar cópia aditiva, validar S20/limite de backup e fazer uma única escrita síncrona; atualizar memória apenas depois do sucesso. Leitura bloqueada, JSON inválido, quota e limite recusados mantêm bytes/memória anteriores. Não é um protocolo distribuído de sincronização entre aparelhos.

## Prova exigida

Importar/cancelar/reimportar/conflitar; namespaces; limites de bytes e listas; HTML/URLs/JSON inválidos e chaves repetidas; quota e armazenamento alterado desde a prévia; corrida de leitura/cancelamento; modo demonstração; histórico/notas/agenda/plano intactos; Markdown completo e backup antigo/novo compatíveis. Chromium 320/360/390/430/1280, teclado/foco, download/restauração e axe, com inconclusivos separados. Preservar as 37 suítes Node e regressões de navegador existentes.
