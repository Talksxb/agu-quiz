# SIMULADOS-AGU-001 — checkpoint de envio e revisão

Data: 23/11/2026, America/Sao_Paulo. Branch: `feat/simulados-agu-001`.

## Base e autorização

O trabalho foi preparado originalmente sobre `f1705ab54d5ebcb12d9195c4f5d42ee5d67a265a`, depois de MÉTODO-AGU-004. Antes do envio, a `main` foi reconfirmada em `1191267482ace4429cfd9d5f559a626461b29493`, com a correção de testes de publicação de MÉTODO-AGU-005/PR #80. Os dois commits locais foram reaplicados sobre essa base sem conflitos; as correções concorrentes foram preservadas.

O usuário autorizou expressamente o envio da branch a `Talksxb/agu-quiz` e a criação de PR em rascunho. Não há autorização nesta execução para merge ou publicação em produção. A consulta anterior ao envio não encontrou branch remota nem PR desta frente; não se deve duplicá-las em retomadas.

## Entrega

O escopo está em `docs/SIMULADOS_AGU_001.md`: espaço de questões dentro do Método AGU, padrão 15 questões/20 minutos, configuração curta/personalizada, modo Estudo, confiança, correção, cards dos fundamentos, seção de origem, histórico e exportação/importação próprios. O banco tem 24 questões autorais ligadas a ADM-64b, ADM-54 e AMB-03. A compilação e a seleção são automáticas; geração de novo conteúdo jurídico por IA em segundo plano não foi implementada.

Os 51 cartões históricos, suas agendas, os capítulos existentes e os dados do estudante não são substituídos. As sessões de simulado usam chave própria e ainda não integram o backup geral. As quatro paráfrases históricas públicas do Leitor continuam no fluxo original; nenhum acervo privado foi publicado por este lote.

## Verificações e limites

Antes do envio, os 44 comandos Node do conjunto inicial e os dez cenários novos passaram localmente. Os cenários específicos e o compilador foram reexecutados após os ajustes finais. Após atualizar a base, os **45 comandos do job Node atualizado passaram localmente**, incluindo o novo verificador de publicação. A CI do HEAD final ainda deve ser conferida na PR.

O fluxo manual de navegador confirmou acesso pela Biblioteca, configuração 15/20, resposta/confiança, encerramento e correção; o modo Estudo foi conferido com quatro questões e bloqueio da resposta revelada. A jornada automatizada nova cobre 320/390/768/1280 px, axe, recarga, exportação, seção, modo Estudo, tempo expirado e falhas de armazenamento; o código do teste não constitui prova de execução.

O fechamento da PR deverá registrar o **HEAD efetivamente aprovado**, a URL da CI, resultado dos jobs, correções necessárias e inconclusivos de acessibilidade. Este checkpoint de preparação não declara previamente CI aprovada. Android físico e TalkBack permanecem sem teste. Não foram criados Caderno, horas de estudo ou domínio do aluno a partir dos registros sintéticos.

## Conferência da primeira CI remota

A PR draft #82 foi criada com HEAD `ef1e5d24d8ff7a9d6fed8033164d677b9912f149`. A execução `45265299205` terminou aprovada, incluindo a jornada nova nas quatro larguras. O artefato `14860849622` foi recuperado e seu SHA-256 `37b772f8c08ff63d22c3c353e054b3b344f787c57693a065cb516104c3198adb` conferido. O relatório dos simulados contém vinte varreduras, zero violações e quatro inconclusivos `aria-prohibited-attr`, todos no mesmo grupo `.sim-presets`, além de retomada expirada e três casos adversariais de armazenamento aprovados.

A revisão identificou que o contêiner de durações possuía nome acessível sem papel semântico. Foi acrescentado `role="group"`, preservando rótulo, controles e funcionamento. Esse ajuste exige nova CI e reconferência do relatório no **novo HEAD** antes do fechamento; a CI anterior permanece apenas evidência histórica.

## Continuidade

`docs/PROMPT_SIMULADOS-AGU-002.md` contém o prompt completo da próxima execução: revisar o conjunto efetivo e, somente nessa nova etapa autorizada, integrar e conferir a publicação. Não executar 002 no fechamento de 001. O resultado da CI e o diff devem governar a decisão, sem usar apenas uma contagem de testes ou cartões.
