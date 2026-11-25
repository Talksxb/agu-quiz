# AUD-UX-003 — Questões, erros, retomada e backup

25/11/2026. Pedido atual autoriza AUD-UX-002–004 em sequência. Base dependente: PR #106 / 654ff3ecdf98cf432bb6f5fe54f7230d9d646139; #105 ainda aberta, main e5436bb071afe0967d29665c0ad042beb084ee13. PR própria empilhada; sem merge ou publicação.

## Problema e resultado

O histórico do treino vigente já existia em `agu_gov_003_treino_vigente_v1`, mas não era incluído na cópia completa. AGUBackup20 passa a registrar essa categoria opcional quando o contrato e o catálogo do treino estão carregados. A validação é a mesma função validHistory do próprio treino, exposta para reuso; não foi criado validador jurídico, histórico ou agenda paralelo. Na aplicação completa, são onze categorias: as nove históricas, percurso dos livros e o histórico vigente. Ambientes legados sem o módulo continuam reconhecendo as categorias anteriores e recusam categorias desconhecidas.

Restauração continua adicionando somente categorias ausentes. Um histórico já existente é preservado; para combinar tentativas do treino, permanece o importador específico existente. Backups antigos não criam a categoria nova. Tentativa com correção adulterada é recusada antes de escrita.

O banco histórico distingue “não anuladas” de verificação atual, informa reimportação após recarga e oferece ligação direta para erros do lote vigente. Prova, origem, hash, PDF em memória, gabaritos e anulações são preservados.

A questão e os filtros do treino direto passam a constar da URL. Recarga retoma a questão filtrada sem gerar tentativa; erro corrigido sai do filtro de erros pelo mecanismo anterior de última resposta. URL é navegação, não novo registro de aprendizagem. Identificadores desconhecidos não selecionam conteúdo inexistente.

## Verificação

Contrato Node: onze categorias quando disponíveis; validação original; captura/restauração exata; idempotência; preservação de histórico existente; correção/ID inválidos e deltas de fonte adversariais recusados.

Chromium 158.0.8127.0: nova jornada em 320/360/390/430/1280, 6.025 s. Questão errada e corrigida, retorno por URL, filtros vazios, abertura sem resposta automática, cópia completa real, restauração em perfil independente e preservação de planejamento preexistente. Dez scans axe com reconferência de alvos: zero violações ou inconclusivos restantes.

As contagens históricas dos testes de nove categorias excluem explicitamente a adição conhecida, e um teste próprio exige as onze categorias reais. As fixtures históricas permanecem imutáveis; deltas exatos restituem HTML/backup anteriores. Nenhum teste funcional foi removido.

Sete questões vigentes, 400 referências históricas e gabaritos mantidos; nenhum enunciado novo ou fonte jurídica alterada. Sem teste de Android físico/TalkBack. Conteúdo de provas continua excluído/mascarado nos artefatos, conforme workflows anteriores. CI do HEAD exato será registrada na PR, sem promover pendências a aprovação.

## Continuidade

AUD-UX-004: recursos por ID, com livros já aprovados, flashcards, legislação e questões existentes. Não importar os oito manuscritos ambientais pendentes nem exportar a matriz privada. A execução já está autorizada, em PR dependente própria.
