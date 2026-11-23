# AGU QUIZ | WORK — MÉTODO-AGU-004

Revisão e publicação do backup do percurso

Executar exclusivamente MÉTODO-AGU-004 quando solicitado em nova execução. Este handoff não autoriza executar 004 no fechamento da etapa 003.

## Missão e autorização da nova etapa

Revisar a PR draft de `feat/metodo-agu-003-backup` no repositório `Talksxb/agu-quiz` e, somente depois de aprovada tecnicamente, integrar essa PR e conferir a publicação pelo GitHub Pages existente. A solicitação de executar esta etapa 004 autoriza essa integração/publicação condicionada aos checks; nenhuma outra PR é abrangida.

## Retomada factual

Reconfirmar HEAD de main, branch, PR, diff, conflitos, comentários, revisões, checks e mudanças concorrentes. Ler integralmente a descrição final da PR 003, `docs/CHECKPOINT_METODO-AGU-003.md`, `docs/METODO_AGU_003_BACKUP.md`, `docs/PROMPT_METODO-AGU-003.md`, `docs/GUIA_BACKUP_LOCAL_S21.md` e os checkpoints 001/002 pertinentes. Não presumir que números de PR, HEAD, contagens ou resultados anteriores permanecem atuais.

Aplicar AGU_BASE_MESTRA_v5.2_FINAL, AGU_PADRAO_LEITURA_COMPLETA_v1.1_FINAL, AGU_CADERNO_E_HANDOFF_v2.1_FINAL, AGU_LEIA_ME_PRIMEIRO_v2_FINAL e `docs/AGU_PADRAO_EDITORIAL_CAPITULOS_v1.md`. A auditoria privada não é necessária para esta operação de código e não deve ser modificada ou importada.

## Revisão exigida

1. Conferir a inclusão opcional de `agu_livros_reader_v1` no envelope existente, compatibilidade de backups antigos e preservação dos nove contratos históricos. Conferir o contrato público de `importMissing` e o limite UTF-8 de 12 MB.
2. Revisar prévia, cancelamento, confirmação, adição explícita somente de capítulos ausentes, preservação integral dos registros em conflito, texto inerte, datas/IDs/limites e recusa de chaves perigosas.
3. Conferir edição diferente e capítulo desconhecido: dados preservados, sem atribuir leitura, resposta ou atividade antiga à edição atual; snapshots anteriores mantidos. Confirmar que referências do backup são geradas pelo pipeline, sem codificação por disciplina.
4. Conferir quota, falha parcial, mudança depois da prévia e rollback. Não alegar atomicidade entre abas que Web Storage não oferece. Não usar dados reais do estudante para ensaiar.
5. Conferir o acesso direto a Dados e backup e o retorno ao capítulo, foco/Escape/anúncios, quatro larguras 320/390/768/1280 e resultados axe completos, inclusive inconclusivos. Distinguir Chromium de Android físico/TalkBack.
6. Confirmar conteúdos, IDs históricos e agendas conforme o estado reconfirmado. Não aprovar cartões nem importar obras nesta etapa.

Reutilizar a CI verde do mesmo HEAD quando aplicável; executar novamente se correções, mudanças concorrentes, falhas ou dúvidas reais exigirem. Corrigir defeitos demonstrados dentro do escopo antes de integrar. Não editar fixtures históricas para esconder regressões; deltas autorizados precisam continuar recompondo o baseline.

## Integração e publicação

Com a revisão concluída e todos os checks necessários aprovados, retirar somente a PR 003 de draft e integrar pelo fluxo regular, protegendo o HEAD esperado. Não contornar regras de branch. Reconfirmar a árvore integrada.

Usar o mecanismo nativo já existente do GitHub Pages; não criar hospedagem ou usar deploy do GPT Sites. Aguardar o deploy do commit integrado e a CI pública. Verificar efetivamente os arquivos servidos por HTTP/hash e as jornadas do Método/backup na URL `https://talksxb.github.io/agu-quiz/`. Merge e deploy são fatos distintos.

Executar somente ensaios em contextos novos e independentes, com dados sintéticos. Não importar arquivo pessoal, limpar dados do usuário, operar seu perfil principal ou alegar teste em aparelho físico indisponível. Se ocorrer defeito público, corrigir com evidência e teste antes de declarar a publicação aprovada.

## Entrega e limites

Entregar link publicado, PR, commits, CI/deploy, arquivos, resultados, artefatos, lacunas e checkpoint atualizado. Enviar sempre o prompt autossuficiente da próxima execução, escolhido por necessidade efetivamente verificada, sem executá-lo neste lote.

Não reescrever conteúdo jurídico, aprovar candidatos, adicionar capítulos, alterar o motor de revisão, criar login, Azure, banco remoto ou sincronização entre chats/GPT Sites/dispositivos. Não incorporar outras PRs por conveniência. Em caso de bloqueio real, registrar ação e motivo sem declarar merge, publicação ou testes não realizados.
