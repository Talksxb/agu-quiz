# AGU QUIZ | WORK — MÉTODO-AGU-006

Triagem editorial e ingresso controlado de um capítulo Ambiental adicional

Executar exclusivamente MÉTODO-AGU-006 quando solicitado em nova execução. Este arquivo não autoriza executar 006 durante o fechamento da etapa 005.

A proposta editorial foi adiada pela correção do verificador Pages. Reconfirmar primeiro o fechamento da etapa 005 e a situação da publicação; não executar 006 junto com a correção.

## Missão

Aplicar o pipeline já existente a **até um capítulo ambiental adicional**, desde que exista fonte editorial aprovada, íntegra e acessível. O motivo concreto é o manifesto reconfirmado na etapa 004: nove posições editoriais, AMB-03 publicado e AMB-04/AMB-05 produzidos com revisão pendente. Não presumir que esses estados continuam atuais nem que “produzido” significa “aprovado”. Priorizar AMB-04 se elegível; caso contrário, selecionar apenas outro material com aprovação rastreável e explicar a escolha.

A execução abrange triagem, cotejo e preparação de integração em **PR draft**. Não autoriza merge, publicação em produção, aprovação automática de cartões ou redação de um novo capítulo jurídico para preencher arquivo ausente.

## Retomada e governança

Reconfirmar HEAD de main, branches, PRs e CI em `Talksxb/agu-quiz`. Ler o fechamento da PR #79, `docs/CHECKPOINT_METODO-AGU-004.md`, `docs/METODO_AGU_001_INGESTAO.md`, `docs/METODO_AGU_001_DIAGNOSTICO.md`, `docs/METODO_AGU_003_BACKUP.md`, `docs/AGU_PADRAO_EDITORIAL_CAPITULOS_v1.md`, `livros/colecoes/ambiental.json`, catálogo e índices efetivamente atuais. Se 004 não estiver integrada/publicada, registrar isso e trabalhar sobre base explicitamente conferida, sem incorporar outras PRs por conveniência.

Aplicar AGU_BASE_MESTRA_v5.2_FINAL, AGU_PADRAO_LEITURA_COMPLETA_v1.1_FINAL, AGU_CADERNO_E_HANDOFF_v2.1_FINAL e AGU_LEIA_ME_PRIMEIRO_v2_FINAL. Não inferir sincronização entre GitHub, GPT Sites, arquivos do Projeto, Library, Caderno ou conversas.

Consultar `Talksxb/agu-auditoria` somente se necessário para cotejar IDs/subitens e evidências pontuais. Não modificar esse repositório nem importar matrizes, provas ou dados privados para o Quiz público. Preferir referências públicas efetivamente verificadas.

## Triagem antes da transposição

1. Localizar os materiais existentes nos meios autorizados, lendo seus conteúdos e handoffs reais. Não usar lembrança, nome “FINAL”, extensão ou número de arquivo como prova de aprovação. Registrar origem, edição, hash, ID editorial, IDs curriculares, datas, status de verificação e aprovação expressa disponível.
2. Reconciliar título, numeração editorial e posição no manifesto. Um número de arquivo não determina um ID curricular; um capítulo pode cobrir mais de um ID. Não renumerar silenciosamente obras nem inflar cobertura por conexões.
3. Preferir Markdown editorial versionado; preservar Word como formato humano de revisão. Se só houver Word estruturado, fazer transposição controlada e relatório de diferenças. PDF não deve virar fonte primária quando existir documento estruturado.
4. Conferir todas as seções, ordem, prosa, hierarquia, casos resolvidos, questões/comentários, fontes/localizadores, diagramas, tabelas, alternativas e lacunas. Não importar doutrina integral nem materiais sem autorização pública aplicável.
5. Se não houver fonte aprovada acessível, concluir a triagem com relatório preciso de arquivos encontrados, verificações e lacuna impeditiva. Não fabricar aprovação, material jurídico ou nova fixture redundante. Preparar o próximo prompt com a providência concreta necessária.

## Integração se a triagem permitir

Usar `scripts/metodo-agu.cjs`, metadados, manifesto e padrões existentes. Manter IDs estáveis de capítulo/seções. Não programar um leitor por capítulo, novo motor de revisão ou armazenamento. Gerar catálogo, índice contextual, relatórios e `dados/metodo-agu-referencias.js` pelo mesmo processo.

Preservar o texto aprovado; qualquer incompatibilidade ou diferença visual deve constar de relatório, com localização e efeito. Não redesenhar diagramas alterando seu sentido ou inventar elementos ausentes. Uma perda material de fidelidade bloqueia apresentar o artefato como capítulo integral equivalente.

Associar Estudar, Aplicar, Recuperar e Revisar apenas a atividades/fontes comprovadamente presentes ou já aprovadas. Respostas ficam ocultas até solicitação. Não transformar cada parágrafo em cartão. Antes de propor novos candidatos, localizar cartões existentes, registrar reuso e deduplicação. Novos candidatos ficam pendentes de conferência jurídica/editorial; não recebem aprovação pela importação do capítulo. IDs, histórico e agendas existentes permanecem intactos.

Separar integridade da transposição de atualidade jurídica. Se houver fundamento alterado ou fonte decisiva não conferida, registrar seção, data, fonte oficial e dependentes; não atualizar silenciosamente o texto aprovado ou certificar juridicamente a obra inteira. Usar os mecanismos existentes de revalidação/suspensão quando cabíveis.

Atualizar somente o necessário no catálogo e na posição correspondente da coleção, com estados documentados de produção/revisão/publicação. Um capítulo preparado em PR não passa a “publicado” por contagem de arquivos ou por estar completo localmente. Declarar claramente quais estados descrevem main, branch e produção.

## Validação e entrega

Provar fidelidade textual integral e recursos visuais, ligações capítulo→seção→atividade→cartão, ausência de duplicatas, reprocessamento idempotente, referências geradas do backup e preservação dos capítulos/IDs/agendas anteriores conforme estado reconfirmado. Não alterar fixtures históricas para ocultar perdas; conservar hashes e deltas autorizados. Adaptar testes de catálogo somente para a inclusão demonstrada, mantendo proteção das obras anteriores.

Validar a abertura do capítulo, leitura integral, atividades, figuras, retorno ao catálogo, retomada e backup em 320/390/768/1280 px, usando contextos independentes e dados sintéticos. Registrar axe e inconclusivos; não alegar Android físico/TalkBack indisponíveis. Executar CI pertinente e conferir o HEAD efetivamente aprovado.

Trabalhar em branch própria e entregar PR draft, fonte/edição/hash, matriz de fidelidade e diferenças, arquivos, comandos, testes/resultados, lacunas e checkpoint. Enviar sempre o prompt autossuficiente da próxima execução, escolhido por necessidade verificada, sem executá-lo neste lote.

Sem merge ou publicação, alterações na auditoria privada, login, Azure, banco remoto, sincronização GPT Sites, registros fictícios de estudo ou domínio. Se a lacuna já estiver resolvida na main atual, demonstrar isso e não duplicar capítulo ou trabalho concluído.
