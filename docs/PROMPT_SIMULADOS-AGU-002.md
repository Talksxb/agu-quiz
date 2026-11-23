# AGU QUIZ | WORK — SIMULADOS-AGU-002

Revisão e integração do espaço de simulados e estudo por questões.

Executar exclusivamente esta etapa quando solicitado em nova execução. Este documento é o handoff de SIMULADOS-AGU-001 e não autoriza executar 002 durante seu fechamento.

## Objetivo

Revisar a PR da branch `feat/simulados-agu-001`, corrigir problemas verificáveis e integrar/publicar o espaço somente após validação do HEAD efetivamente final. O usuário quer testes curtos, especialmente 15 questões em 20 minutos, estudo que parta das questões, cards fundamentados e desenvolvimento de conteúdo com aproveitamento das bases existentes.

## Retomada obrigatória

1. Reconfirmar `main`, branch, PRs abertas, commits, checks e implantação de `Talksxb/agu-quiz`. Base histórica de 001: `f1705ab54d5ebcb12d9195c4f5d42ee5d67a265a`; não tomar esse SHA como atual. Consultar o fechamento efetivo da PR, `docs/SIMULADOS_AGU_001.md`, `docs/CHECKPOINT_METODO-AGU-004.md`, a ingestão Método AGU, backup e protocolos de cartões existentes. Não incorporar outras PRs por conveniência.
2. Aplicar os quatro documentos pedagógicos finais do Projeto AGU: Base Mestra v5.2, Padrão Leitura Completa v1.1, Caderno/Handoff v2.1 e Leia-me Primeiro v2. Não presumir sincronização, progresso do aluno, certificação ou atualização de fontes.
3. Conferir o código real: `simulados-agu.js`, `simulados-agu-ui.js`, `simulados-agu.css`, `scripts/gerar-simulados.cjs`, fonte editorial, aprovações e banco gerado. Preservar prosa dos capítulos, 51 cartões históricos, agendas, nove categorias antigas e a categoria de livros do backup existente.

## Revisão de conteúdo e comportamento

- Examinar as 24 questões iniciais de LGPD/ADM-64b, agentes públicos/ADM-54 e competências ambientais/AMB-03. Conferir comando, única resposta correta, qualidade dos distratores, comentários de todas as alternativas, cartão, seção de origem e fonte primária atual decisiva. Corrigir somente com base verificável e renovar a aprovação por hash do item alterado. Não converter aprovação assistida em revisão humana independente.
- O banco inicial é autoral. As quatro paráfrases históricas públicas do Leitor não foram migradas para o simulado. Não apresentar o acervo privado como já importado nem concluir que transcrição e vínculo bastam para treino atual. Nenhum dado privado deve ser publicado nesta etapa.
- Testar 5/7, 10/12 e 15/20; quantidade personalizada incluindo 4; recorte com menos itens que o solicitado; mistura, questões novas e dificuldades. Não repetir item para completar uma quantidade fictícia.
- Conferir resposta/confiança antes do gabarito, navegação, limpar, omissões, confirmação, encerramento automático, retomada após o prazo, tentativa exatamente no limite e ausência de resultados duplicados. No modo Estudo, impedir mudar a resposta depois de revelar a correção. As duas modalidades precisam permanecer distinguidas no histórico.
- Conferir resultado por matéria, erros com alta confiança, acertos inseguros, primeiros três fundamentos e demais expansíveis, cartões ocultos até solicitação, link profundo para seção e roteiro de novo conteúdo. Navegar/revelar não pode criar avaliação no motor de revisão, hora ou domínio.
- Revisar o arquivamento explícito após exportação, a confirmação de que o arquivo foi guardado, a preservação da sessão ativa e a política do limite de 80 sessões. Não descartar sessões automaticamente nem prometer que apenas exportar desbloqueia um limite que não foi liberado.
- Conferir JSON inválido, quota, UTF-8, importação de arquivo real, deduplicação, preservar conflitos/sessão ativa e alteração concorrente. Comparação de bytes em Web Storage não é transação entre abas. O backup geral ainda não inclui o simulado; não ocultar essa limitação nem acrescentar nova categoria sem os testes de contrato pertinentes.

## Geração e fronteiras

O compilador atual monta questões, correções e cartões a partir de unidades revisadas, suspende dependentes de fontes/seções alteradas e permite reprocessamento idempotente. Não é gerador jurídico por IA em segundo plano. Preservar essa distinção e não instalar automação, API paga, login, banco remoto ou sincronização sem necessidade e autorização próprias.

Esta etapa não executa expansão do banco com novas provas nem nova auditoria privada. Ao encerrar, preparar o próximo prompt conforme a lacuna efetivamente confirmada: amostra pequena de provas públicas com metadados confiáveis, distratores melhores e ligação curricular/material real. A próxima proposta deve distinguir gabarito histórico, anulação, regra atual, questão adaptada e autoral e usar o pipeline existente de cartões, sem criar outra agenda.

## Testes, integração e entrega

Executar `node scripts/gerar-simulados.cjs --check`, `node tests/simulados-agu-001.cjs`, pipeline editorial existente e regressões pertinentes. Conferir jornada Chromium/axe do HEAD final e seu relatório, incluindo inconclusivos; não reivindicar Android físico/TalkBack. Usar dados sintéticos e contextos independentes. A CI e o diff precisam ser examinados antes de integrar.

Se os critérios forem atendidos e não houver conflito de governança, esta nova execução autoriza merge desta PR e verificação da publicação correspondente no GitHub Pages. Após integrar, verificar acesso real pelo Método AGU, arquivos novos servidos, fluxo 15/20, correção, seção e persistência local com registros sintéticos. Não confundir PR mesclada com implantação concluída.

Entregar link de produção efetivamente verificado, PR/commit/CI, escopo e limites, checkpoint rastreável e prompt completo autossuficiente da próxima execução. Não executar a etapa seguinte neste lote. Se alguma condição impedir a integração, entregar o patch e a pendência concretos, com evidência e sem alegar publicação.
