# MÉTODO-AGU-003 — contrato do backup do percurso

23/11/2026, America/Sao_Paulo. Base reconfirmada: `d41442201e449f437babc80ec240dac281d7404e`, PR #78 integrada, CI e publicação registradas na descrição final da PR. A main e as demais PRs/branches foram consultadas; nenhuma frente concorrente foi incorporada. Aplicados os quatro documentos pedagógicos finais e o padrão editorial público. Não foi necessária consulta à auditoria privada.

## Diagnóstico e decisão

O backup S20 exportava nove categorias, mas não `agu_livros_reader_v1`. O teste novo reproduziu a omissão antes do patch. A chave de livros contém página, marcações explícitas, âncora, preferências, atividades/rascunhos e históricos de edição; não possui envelope próprio. O leitor também podia retomar o índice de uma edição diferente e mostrar seu rascunho no mesmo ID de atividade. A correção mantém esses registros históricos, sem apresentá-los como leitura ou resposta da nova edição.

Reutilizados o envelope, limite, exportação por arquivo, validadores históricos, prévia/confirmacão e restauração locais. Não há segundo armazenamento, motor de revisão ou sincronização. `AGUMethodProgress` compartilha o contrato de livros entre o leitor e o backup, sem gravar dados por conta própria.

## Compatibilidade e política de conflito

O envelope continua `agu-portable-local-s20-v1`, `version:1`, com `items[chave]` contendo a **string JSON original**. Acrescenta-se uma décima categoria opcional: `agu_livros_reader_v1`. As nove categorias anteriores mantêm seus nomes, validadores e a regra de adicionar somente categorias ausentes. `importMissing` conserva também o resultado `{added, skipped, keys}`. Um backup antigo sem livros não cria, zera ou altera essa chave.

Uma versão antiga do aplicativo pode rejeitar um arquivo novo que contenha livros: a compatibilidade é de **arquivos antigos no aplicativo atualizado**, não uma promessa de leitura da extensão por clientes antigos.

| Situação | Efeito após confirmação |
|---|---|
| Categoria ausente | Restaura a string original, sem reformatar seus bytes |
| Categoria histórica já existente | Preserva integralmente, mesmo se o arquivo trouxer dados diferentes |
| Livros já presentes, opção de adicionar capítulos desligada | Preserva a categoria; informa quais registros do arquivo não serão aplicados |
| Opção ligada, capítulo ausente | Adiciona o ID e seu registro; os capítulos existentes continuam semanticamente idênticos |
| ID de capítulo já existente | Mantém o registro local inteiro, inclusive rascunhos, edições e extensões. A cópia divergente permanece no arquivo externo; não há fusão de campos |
| Capítulo fora do catálogo | Guarda o registro validado, identifica a ausência e não publica conteúdo ou cria aprendizagem |
| Edição diferente | Guarda o histórico; o leitor inicia a edição atual sem marcações nem rascunhos da anterior |
| Dados locais alterados depois da prévia | Aborta e exige nova conferência do arquivo |

Não há escolha de “vencedor por data”, exclusão ou substituição automática. Para conservar rascunhos concorrentes do mesmo capítulo, mantenha ambos os arquivos. A mesclagem de respostas dentro de um capítulo permanece fora deste lote.

## Validação dos livros

Todo o arquivo, suas categorias e a estrutura de livros são validados antes da primeira escrita. Limite S20 preservado: **12.000.000 bytes UTF-8**, por categoria, pacote e arquivo formatado de exportação. A categoria resultante de uma mesclagem também deve caber nesse limite.

No navegador com `TextDecoder`/`File.arrayBuffer`, a leitura recusa UTF-8 inválido em vez de substituir caracteres silenciosamente. A suíte usa um arquivo binário artificial inválido para verificar a rejeição sem gravação. O fallback histórico `.text()` permanece para ambientes sem essas APIs; não se afirma decodificação estrita nesse fallback.

| Campo | Regra |
|---|---|
| ID de capítulo/atividade/âncora | Letras minúsculas, números e hífen; início alfanumérico, até 140 caracteres; recusa chaves perigosas |
| `page` e `done` | Inteiros de 0 a 9.999, lista sem repetições. Na edição atual conhecida, devem caber nas seções publicadas |
| `sectionId` | Na edição atual conhecida, deve existir no índice; edições históricas não são cotejadas contra índices novos |
| `methodEdition` e edições arquivadas | Texto de até 120 caracteres, sem controles/chaves perigosas |
| `updated`, `performedAt` | Data/hora UTC ISO válida; recusa datas normalizadas impossíveis |
| `preferences` | Letra inteira 18–28; espaçamento 1,5–2,3. Campos adicionais inertes são preservados |
| `activities` | Até 1.000; rascunho textual de até 12.000 caracteres; edição/data opcionais e validadas |
| `readingEditions` | Até 100 snapshots sem histórico recursivo; registros antigos podem conservar preferências, atividades e extensões |
| Extensões desconhecidas | JSON inerte e limitado: sem `__proto__`, `constructor`, `prototype`, funções ou números não finitos; profundidade até 12, strings até 20.000 e orçamento de 200.000 nós |

Até 2.000 registros de capítulo; estruturas/listas genéricas limitadas a 10.000 elementos. Texto HTML em rascunho continua texto. Campos de uma extensão futura não são interpretados como domínio ou desempenho.

`dados/metodo-agu-referencias.js` é **gerado** pelo pipeline editorial dos índices publicados: edição, IDs de seção e atividades. Não contém dados pessoais. Um capítulo adicional por configuração recebe suas referências ao executar `node scripts/metodo-agu.cjs`; não exige editar o backup por disciplina. `--check` detecta referência desatualizada.

## Edições no leitor

Abrir um registro de edição diferente não reescreve o armazenamento. O índice, as marcações e as atividades dessa edição não são apresentados como da edição atual. Na primeira gravação explicitamente solicitada ou de posição da nova leitura, o estado anterior inteiro, suas atividades e extensões são arquivados em `readingEditions`; snapshots anteriores são preservados. Se o mesmo nome de edição já contiver outro snapshot, usa-se sufixo `#2`, `#3` etc., sem sobrescrever.

Uma atividade com edição antiga também aciona essa proteção quando o registro legado do capítulo não identifica edição. O snapshot é então identificado como `sem-edicao`. Registros legados sem evidência de divergência conservam o comportamento de retomada e recebem aviso de edição não identificada na prévia. Leitura, atividade realizada, desempenho e domínio continuam distintos.

## Transação, falhas e concorrência

A prévia retém os bytes das categorias para detectar mudanças antes de aplicar. Cada escrita também confere o estado esperado. As inserções de categorias ausentes vêm primeiro; a única possível mudança de categoria existente, a adição de capítulos, é a última escrita. Assim, quota nessa última operação deixa intacto o percurso anterior e reverte somente inserções novas.

O rollback verifica o valor antes de remover/repor, preservando eventual escrita concorrente. Se a própria remoção falhar, a interface informa **restauração parcial**, sem alegar reversão completa. Novas inserções válidas podem permanecer nesse caso; não havia dados anteriores nessas chaves. Web Storage não oferece transação nem trava entre abas: uma alteração entre a última comparação e `setItem` não pode ser excluída atomicamente. Feche outras abas que estejam editando durante a restauração; a proteção detecta mudanças observáveis, não promete exclusão mútua.

Um registro corrompido não é reparado, apagado ou substituído para abrir espaço. A restauração padrão pode preservar uma categoria inválida já presente; a mesclagem de livros a bloqueia. Guarde o arquivo externo e o navegador original.

## Interface e ensaios

“Backup do percurso” abre diretamente a tela existente de Dados e backup, com retorno ao capítulo escolhido. A prévia identifica categorias, capítulos não aplicados, conflitos, edição e ausência no catálogo. Confirmar/cancelar, foco, Escape, status e erros são testados em contexto independente; a restauração não recarrega silenciosamente o aplicativo.

Testes: `tests/metodo-agu-003-validacao.cjs`, `tests/metodo-agu-003-browser.cjs` e regressões históricas. A suíte Chromium usa download real de arquivo, 12 contextos artificiais, quatro larguras e axe. Android físico/TalkBack permanecem não testados. Agendas e tentativas são fixtures, nunca dados do estudante.

Os hashes históricos não são regravados: fixtures novas descrevem os deltas exatos do backup e da navegação, e os helpers recompõem/atestam o baseline. Testes antigos contam suas nove categorias históricas; o teste novo verifica a ordem e os IDs das dez atuais. O motor de revisão e os quatro conteúdos editoriais permanecem fora do patch.
