# AGU Quiz | Biblioteca de legislação — etapa 08 (handoff; NÃO EXECUTAR agora)

Executar somente sob nova autorização expressa, uma etapa por execução. Repositório `Talksxb/agu-quiz`: confirmar `main`, PRs #49–#53, CI e Pages, sem assumir merge ou rebase. A etapa 07 é empilhada sobre a #52, que depende da #51/#50. Ler relatórios 03–07, script de cotejo, testes, gerador de CC/CPC e contratos do leitor/backup antes de agir.

## Escopo recomendado

Ampliar a primeira passagem textual com **lote de triagem 101–200 em CC e CPC (200 artigos-base)**, mas separar o resultado em três filas: texto idêntico normalizado; diferença editorial com revisão pendente; divergência normativa ou ausência/sufixo a investigar. Não certificar 200 artigos apenas porque uma ferramenta os comparou. Se muitos casos divergentes escaparem à inspeção individual, produzir inventário e priorização sem mudar corpus.

Na etapa 07, a cobertura foi ampliada para CC/CPC 41–100, encontrando **101 representações idênticas e 21 divergentes entre 122 artigos do espelho**, além de um **marcador oficial `L10406:art69-A` vetado e ausente no espelho**. Os artigos 48-A e 49-A foram tratados separadamente após correção do extrator. O acumulado de primeira comparação textual é 202 artigos presentes no espelho, 175 iguais, 27 diferentes, mais um marcador vetado. Conferir a lacuna documental do veto sem inventar texto normativo vigente. A lista de 21 diferenças e exemplos está em `docs/BIBLIOTECA_LEIS_07_COTEJO_41_100_2026-11-16.md`.

## Regras e portões

Usar HTMLs oficiais da Câmara com URL, download autorizado, HTTP Date, SHA-256 dos bytes, data de observação e corte jurídico de publicação/vigência/efeitos, sem contornar CAPTCHA. Reexecutar 1–100 para detectar regressão de fonte e parser. Incluir artigos com sufixos por identidade própria, nunca anexados ao artigo precedente. Separar notas editoriais, remissões judiciais, revogações, vetos e conteúdo normativo; manter fila de diferenças que exigem análise humana.

Preservar oito diplomas, IDs e anotações existentes, uma norma por vez, tags, salto e janela do índice, `topic:null`, `mirror_unverified`, `partial`, `pending`, uma única lista `forNotebook`, nove categorias S20 e todas as disciplinas/questões/baralhos/planejamento. Não acessar dados privados de auditoria para publicar no Quiz. Importar nova lei apenas em tarefa própria e autorizada.

Se houver correção de conteúdo no Quiz, exigir fonte individual e efeito temporal verificados, primeiro teste falhando, fixture de hash encadeada, regressões Node/Chromium nas cinco larguras, axe com violations/incomplete/passed, backup sintético, CI e Pages HTTPS por SHA após merge. Sem patch de produto, executar somente regressões do comparador e registrar testes não aplicáveis. Criar PR própria em rascunho, empilhada sobre a base realmente confirmada, sem force push/rebase/merge inseguro. Encerrar relatório da etapa 08 com matriz, hashes, fila de divergências, PR e prompt da etapa 09 **não executada**.
