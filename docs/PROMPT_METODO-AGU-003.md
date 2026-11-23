# AGU QUIZ | WORK — MÉTODO-AGU-003

Backup e restauração do percurso do Método AGU

Executar exclusivamente MÉTODO-AGU-003. Este documento é o próximo prompt, não autorização para executá-lo durante o fechamento da etapa 002.

## Missão

Permitir exportar e restaurar com segurança o progresso local do Método AGU pelo sistema de backup já existente. O problema a reconfirmar é concreto: a chave `agu_livros_reader_v1` guarda leitura, preferências e atividades, mas ainda não está incluída nas nove categorias históricas do backup S20. Não duplicar armazenamento ou criar um segundo motor de backup.

## Retomada obrigatória

Consultar `Talksxb/agu-quiz`; reconfirmar HEAD de main, branches, PRs e checks. Ler a descrição final da PR #78, `docs/CHECKPOINT_METODO-AGU-002.md`, `docs/CHECKPOINT_METODO-AGU-001.md`, `docs/METODO_AGU_001_DIAGNOSTICO.md`, `docs/METODO_AGU_001_INGESTAO.md`, documentação S20–S27 pertinente, `backup-local-s20.js`, armazenamento do leitor e testes efetivamente atuais. Não presumir que a implementação anterior continua igual ou que uma lacuna ainda existe.

Aplicar AGU_BASE_MESTRA_v5.2_FINAL, AGU_PADRAO_LEITURA_COMPLETA_v1.1_FINAL, AGU_CADERNO_E_HANDOFF_v2.1_FINAL, AGU_LEIA_ME_PRIMEIRO_v2_FINAL e `docs/AGU_PADRAO_EDITORIAL_CAPITULOS_v1.md`. Não é necessária consulta à auditoria privada para implementar este backup; não importar seus dados.

## Trabalho

1. Inventariar o formato real da chave de livros, extensões e registros de edições anteriores. Distinguir página/âncora, marcação explícita, preferência, rascunho e atividade declarada; nenhum deles prova desempenho ou domínio.
2. Definir extensão compatível do envelope existente. Backups históricos sem livros continuam importáveis; as nove categorias históricas mantêm seus contratos. Incluir livros como categoria opcional identificável, sem apagar dados atuais quando estiver ausente. Escolher eventual versão nova somente se necessária e documentar compatibilidade.
3. Reutilizar exportação, prévia, limites e fluxo de restauração existentes. Informar ao estudante o que será restaurado e o efeito sobre registros atuais antes da gravação. Não sobrescrever silenciosamente rascunhos, edições ou campos desconhecidos; demonstrar política de mesclagem/conflito.
4. Validar integralmente antes de escrever: tipos, IDs, limites em bytes e texto, índices, âncoras, edições, atividades, datas e estruturas permitidas. Conteúdo de rascunho é texto inerte. Rejeitar payloads malformados, chaves perigosas/prototype pollution e valores incompatíveis sem corrupção do estado anterior.
5. Tratar obras ausentes do catálogo e edições diferentes sem perder registros nem atribuir leitura à seção errada. Preservar dados recuperáveis e explicar incompatibilidades. Não promover marcações antigas a domínio, não criar respostas ou horas de estudo.
6. Garantir comportamento não destrutivo em quota, armazenamento indisponível e falha parcial. Reutilizar a proteção transacional/recuperação existente ou corrigir defeito demonstrado; nunca apagar chave anterior para tentar abrir espaço.
7. Tornar o backup acessível a partir do percurso, sem repetidos retornos à Home, utilizando o componente existente. Incluir explicação curta de que os dados continuam locais.

## Validação

Executar os testes históricos pertinentes e novos cenários de exportação/restauração real: backup antigo sem livros; novo com livros; edição divergente; capítulo desconhecido; rascunho longo/HTML inerte; campos legados; conflito; dados inválidos; UTF-8/limite; quota/falha parcial. Confirmar os 51 cartões históricos e agendas conforme o estado reconfirmado, sem presumir que o acervo inteiro continua com a mesma contagem.

Usar apenas contextos independentes e fixtures sintéticas. Validar fluxo, teclado, foco, anúncios, ausência de overflow e acessibilidade em 320, 390, 768 e 1280 px. Distinguir emulação de Android físico/TalkBack. Reutilizar evidências do mesmo HEAD quando cabível; repetir checks quando a mudança ou falha justificar.

## Limites e entrega

Não reescrever obras, aprovar cartões, importar capítulos, alterar a auditoria privada, substituir o motor de revisão ou criar login, Azure, banco remoto ou sincronização GPT Sites. Trabalhar em branch própria, produzir PR draft e executar CI. Não mesclar nem publicar em produção sem autorização posterior.

Entregar diagnóstico breve, alteração funcional, contrato de compatibilidade, testes/resultados, lacunas, commit, arquivos e PR. Atualizar checkpoint e fornecer sempre o prompt autossuficiente da próxima execução, escolhido a partir de uma necessidade efetivamente verificada, sem executá-lo no mesmo lote. Se a lacuna já estiver resolvida, confirmar isso documentalmente e não produzir patch redundante.
