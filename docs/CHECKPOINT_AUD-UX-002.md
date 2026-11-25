# AUD-UX-002 — Flashcards e revisão

25/11/2026. Autorização expressa do usuário para AUD-UX-002–004 em sequência; os limites antigos dos prompts de uma única execução não impedem esta sequência autorizada.

Base: PR #105, HEAD bdf25210a476128f218b0183c9d86d7c2eba62ef, CI reconfirmada verde, draft e não integrada. Main e5436bb071afe0967d29665c0ad042beb084ee13. Esta sprint usa branch própria e PR empilhada sobre #105; não autoriza publicar.

## Mudança

Disciplina e assunto continuam visíveis. Nível cognitivo e estado de revisão ficam em “Mais filtros”, com indicação de filtro ativo. As explicações extensas e os níveis dos cartões passam a detalhes opcionais. A preferência de abrir o painel é apenas transitória; não há chave nova de armazenamento. A seleção, avaliação, intervalos, IDs e sessão permanecem no motor original. O atalho geral de revisão é identificado como fila geral.

O teste AUD-UX-001 tinha um problema na interceptação da referência: o glob não abrangia o parâmetro de versão. Foi corrigido para o caminho da URL e reexecutado. As coordenadas antigas não devem ser reutilizadas como comparação causal; as medições abaixo usam o script anterior efetivamente restituído. Não foram alteradas as assertivas de aprendizagem/backup. Os quatro testes UX antigos que usam filtros avançados agora abrem o controle nativo antes de selecionar; mantêm todas as verificações anteriores.

## Resultados locais

| Largura | Primeira ação de baralho antes | Depois |
|---:|---:|---:|
| 320 | 1691.3 px | 1400.1 px |
| 360 | 1621.4 px | 1357.1 px |
| 390 | 1621.4 px | 1357.1 px |
| 430 | 1383.8 px | 1200.2 px |
| 1280 | 1108.3 px | 1015.4 px |

Chromium 158.0.8127.0; tempo da rotina nova 5.046 s. Cinco larguras, toque emulado, teclado, foco, estados vazios, limpeza de filtros sem escrita, erro e retomada após recarga. Axe: zero violações e zero alvos inconclusivos após reconferência. AUD-UX-001 reexecutada com sucesso nas cinco larguras; backup/exportação/restauração preservados. Validações Node e regressões UX em logs/CI da PR.

Sem Android físico/TalkBack. Acervo: 51 cartões, 11 baralhos; nenhum livro ou questão acrescentado. Nenhuma alteração do repositório privado ou do capítulo de Constitucional.

## Continuidade

AUD-UX-003: histórico do treino vigente no backup central, distinção entre prova histórica e lote aprovado, erros e retomada. AUD-UX-004: recursos por ID curricular real, sem exportar a matriz privada e sem importar livros pendentes. Ambas já autorizadas pelo pedido desta execução; usar PRs próprias dependentes, sem merge/publicação.
