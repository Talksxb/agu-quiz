# AGU Quiz — uso, manutenção e preparação da publicação integrada

Este documento é a continuidade autossuficiente das três sprints de UX Estudo Integrado. **Não autoriza merge, publicação ou nova sprint por sua existência.** GitHub é a fonte da verdade; GPT Sites são cópias independentes.

## O que está preparado

Aplicação: https://github.com/Talksxb/agu-quiz
Produção: https://talksxb.github.io/agu-quiz/
Roadmap único: `docs/ROADMAP_UX_ESTUDO_INTEGRADO.md`.

A cadeia histórica a reconfirmar é:

| Entrega | PR | Branch | Base na execução S03 |
| --- | --- | --- | --- |
| Navegação por assunto/retomada | #54 | feat/ux-estudo-integrado-01 | main |
| Síntese de aula no Caderno existente | #57 | feat/ux-estudo-integrado-02 | feat/ux-estudo-integrado-01 |
| Rascunho preservado/atalhos/validação final | #61 | feat/ux-estudo-integrado-03 | feat/ux-estudo-integrado-02 |

Main histórica: `31a47693b8f690e543f565c83208e3cdc637a547`; S01 `517dcd842a7ba7b93ba2c21d5a386a6ae402d163`; S02 `b6050894ec86874b776572a0185552da05e6d334`; produto S03 `7efcbeb7a4d413231bff5e34caf71d82fa3bf113`. Esses SHAs são referências históricas, não substituem a consulta atual. O último HEAD da #61 inclui fechamento documental e ensaio focalizado adicional; sua CI deve estar verde.

## Como usar depois da integração

1. Na Home, `Continuar estudando` retoma a atividade pelo motor original. `Estudar por assunto` abre os vínculos literais realmente disponíveis, com recursos parciais/pendentes identificados. Usar os retornos ao assunto ao transitar entre legislação, cartões, questões, revisão, progresso e lista Para meu caderno.
2. Ao encerrar uma aula no ChatGPT, usar o pedido disponível em `Trazer aula do ChatGPT` → `Como gerar a síntese no ChatGPT`. Baixar o JSON curto e manter seu ID quando reexportar a mesma aula. O ChatGPT continua responsável pelo ensino e correção.
3. No Quiz, selecionar o arquivo, conferir a síntese completa e escolher um tema somente se houver associação segura. `Sem vínculo curricular` é válido; módulo pedagógico e código granular não são equivalentes presumidos.
4. `Ir à confirmação` é um atalho de leitura, sem consentimento automático. Marcar a caixa conscientemente e guardar. `Ver aula guardada` abre o único registro criado no Caderno atual. Reimportações idênticas não duplicam; conflitos mantêm o original.
5. Os atalhos `Registro manual` e `Ver registros` usam as seções atuais. Rascunhos manuais são preservados durante atualizações do importador; consolidar o registro antes de sair/recarregar. O registro de aula não cria respostas, horas, domínio ou agendamento de revisão.
6. Exportar backup completo em `Dados e backup` antes de trocar aparelho/navegador/origem. A transferência é manual; não há sincronização com chats ou aparelhos. A lista contextual Para meu caderno e o Caderno principal preservam seus papéis atuais.

## Preparação para integrar e publicar, quando houver autorização

1. Consultar main/produção e estado atual de #54/#57/#61. Preservar PRs paralelas de Biblioteca/auditoria. Ler os checks do HEAD atual; não usar um run antigo como validação de código posterior.
2. Revisar e integrar regularmente a cadeia na ordem das dependências. Quando uma predecessora estiver integrada, conferir/reapontar a base da seguinte para main se necessário e inspecionar o diff resultante. Não excluir uma base antes de tratar suas PRs dependentes; não usar rebase, force push ou merge forçado para resolver a cadeia.
3. Manter as 38 suítes Node e todos os testes Chromium antigos, incluindo S01/S02/S03. O workflow aceita as duas bases de feature enquanto empilhadas. Se houver conflito ou código novo concorrente, resolver em branch própria preservando dados/IDs e verificar o resultado antes de integrar.
4. Depois da integração efetiva, aguardar o workflow normal de Pages e comparar a produção com o checkout correspondente usando `tests/sprint21-pages.cjs`. Se não houve publicação, informar isso sem comparar Pages à feature inédita. Não publicar automaticamente em GPT Sites.
5. Verificar em contexto sintético de produção: arquivo curto → prévia → confirmar → um registro → exportação; navegação por assunto, retomada e backup compatível. Nunca limpar histórico pessoal para ensaiar. Identificar a origem correta ao transferir backup.
6. Atualizar somente os campos operacionais de publicação no roadmap (SHAs/PRs/CI/produção/data). Se aparecer um defeito novo e reproduzível, abrir uma correção de escopo preciso com evidência; não repetir diagnósticos ou criar sprints sucessivas sem hipótese nova.

## Limites registrados

Android físico/TalkBack seguem sem execução; nenhuma conformidade WCAG foi declarada. Artefatos de CI têm retenção de sete dias: o resumo versionado conserva métricas e referências; para reprodução futura usar o código e os perfis sintéticos. Exame jurídico de corpus e implantação MCP/backend não integram esta frente. Nenhuma conversa privada é lida automaticamente pelo site.
