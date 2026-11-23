# Checkpoint — MÉTODO-AGU-003

23/11/2026, America/Sao_Paulo. Execução exclusiva de backup/restauração. Base `d41442201e449f437babc80ec240dac281d7404e`; branch `feat/metodo-agu-003-backup`. A etapa 002 e o fechamento da PR #78 foram reconfirmados. Main, branches e PRs abertas foram consultadas; a lacuna ainda existia. Sem autorização de merge/publicação nesta etapa.

## Entrega preparada

- Categoria opcional de livros no envelope S20; nove categorias históricas preservadas e `importMissing` com seu resultado anterior.
- Contrato compartilhado de progresso, referências geradas dos índices publicados, validação estrutural e proteção de textos/IDs/datas/limites.
- Prévia, cancelamento e confirmação; adição opcional somente de capítulos ausentes, sem substituir registros conflitantes.
- Detecção de mudança desde a prévia, ordem de escrita com livros por último e rollback sem remover alteração concorrente observada. Falha de limpeza recebe resultado parcial explícito.
- Retomada segura de edição diferente, arquivo histórico de rascunhos e preservação de snapshots já existentes.
- Acesso direto à tela de backup com retorno ao capítulo; não há segundo motor ou chave paralela de armazenamento.

Contrato, compatibilidade, limites e arquivos funcionais: [METODO_AGU_003_BACKUP.md](METODO_AGU_003_BACKUP.md). Procedimento do usuário: [GUIA_BACKUP_LOCAL_S21.md](GUIA_BACKUP_LOCAL_S21.md). Próximo prompt completo: [MÉTODO-AGU-004](PROMPT_METODO-AGU-004.md), não executado neste lote.

## Evidências até este registro

O teste novo reproduziu a omissão de livros antes do patch. Depois, 19 cenários Node passaram, incluindo arquivo antigo, byte-idêntico quando ausente, conflito, capítulo desconhecido, edição divergente, campos legados, prévia vencida, quota, rollback parcial, indisponibilidade, estruturas inválidas, chaves perigosas e UTF-8. As 39 suítes históricas foram executadas; guardas de hash/contagem foram adaptadas aos deltas explícitos, preservando fixtures antigas. A validação histórica detectou também a necessidade de conservar exatamente o resultado de `importMissing`; isso foi corrigido.

Compilação editorial em `--check` idempotente, quatro capítulos, três candidatos pendentes e 51 cartões históricos reconfirmados. O motor de revisão, fontes e conteúdo jurídico dos capítulos não foram alterados. Sintaxe e diferenças Git conferidas.

Primeiro HEAD remoto: `163916b2671159a98df190cf48e96855672b8f38`, árvore `024c14f2ab8ca3de903ca416b211a45527c1b936`, [PR draft #79](https://github.com/Talksxb/agu-quiz/pull/79). Na [CI 45183001110](https://github.com/Talksxb/agu-quiz/actions/runs/45183001110), Node e exportação editorial foram aprovados; as duas jornadas MÉTODO-AGU-001/003 passaram antes das regressões históricas restantes. Esse estado parcial não é o fechamento de toda a CI.

No fechamento adicional, a leitura de arquivo passou a recusar UTF-8 inválido quando as APIs estritas estão disponíveis, com fixture binária no navegador; o fallback histórico é declarado no contrato. A opção de adicionar capítulos só aparece quando já existe percurso, e o aviso de capítulo desconhecido não promete aplicar registros omitidos. O delta do backup foi atualizado explicitamente, sem editar baselines históricos. Esse fechamento recebe novo HEAD e CI; os checks do HEAD atual e a descrição final da PR #79 governam a aceitação.

Chromium local indisponível por ausência do executável. A CI da PR executa a suíte nova em 320/390/768/1280, download/restauração reais em 12 contextos sintéticos, axe e regressões históricas. **Não declarar seu sucesso antes da execução.** O resultado final, HEAD/árvore, commits, PR, CI, artefatos, hashes e eventuais correções complementares serão registrados na descrição final da PR desta branch, preservando a distinção entre este registro pré-CI e o fechamento efetivamente verificado.

## Lacunas e continuidade

Android físico/TalkBack e restauração de backup pessoal não executados. Nenhum dado real, hora, resposta ou domínio foi criado. O formato continua local, sem sincronização. Clientes antigos podem rejeitar a décima categoria; o aplicativo atualizado aceita arquivos históricos. A mesclagem não combina rascunhos do mesmo capítulo. Web Storage não oferece transação/trava entre abas; a implementação detecta mudanças observáveis e preserva o arquivo externo, sem prometer exclusão mútua.

Entrega por PR **draft**, sem merge nem publicação. A produção permanece na edição integrada anteriormente. A próxima execução 004 revisará esta PR e, quando solicitada, autorizará condicionalmente sua integração e verificação pública pelo fluxo descrito no prompt.
