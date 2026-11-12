# AGU Quiz — Correção de experiência e auditoria jurídica | 2026-11-11

## Problema observado em Android
O cartão exigia abrir PDF e a correção exibia somente "gabarito definitivo ERRADO; banca considerou incorreto". Usuário informou que não encontrou no aplicativo a experiência interativa mostrada na conversa.

## Correções publicadas
- `revisao-inteligente.js`: o item **AGU 2015, prova 187AGU_001_01, item 1** agora traz texto adaptado na frente, gabarito oculto até responder, fundamento jurídico detalhado no verso e link para o Decreto nº 12.540/2025.
- `index.html`: versão no carregamento do módulo para evitar JS antigo em cache; rota de entrada `?abrir=questao` seleciona Revisão Inteligente > Questões oficiais.
- As **outras 9 adaptações anteriores** não receberam homologação jurídica individual. Foram retiradas da fila de questões oficiais automaticamente pontuáveis até passarem por revisão específica.
- Registros e armazenamento legado são preservados (`agu_quiz_revisao_inteligente_v1`, `agu_quiz_mvp1_2026`).

## Fundamentação confirmada pontualmente
- Prova oficial: https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/187AGU_001_01.pdf — item 1, p. 1.
- Gabarito definitivo: https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/Gab_Definitivo_187AGU_001_01.pdf — item 1 = **E**.
- Regime regimental de referência: Decreto nº 12.540/2025, Anexo I, **art. 25, II** (exceção para informações do Presidente em MS e MI), e **art. 30, II** (Consultoria-Geral da União subsidia informações presidenciais ao STF). Fonte: https://www2.camara.leg.br/legin/fed/decret/2025/decreto-12540-30-junho-2025-797673-anexo-pe.pdf
- Não confundir resultado histórico oficial com certificação jurídica de toda a disciplina.

## Testes executados
**10/10 testes locais simulados aprovados:** sintaxe do módulo e do index; pergunta visível; link e referência normativa; gabarito oculto; feedback com distinção SGCT/CGU; persistência da tentativa; exclusão de itens sem auditoria; URL versionada; rota de entrada.

## Limites e próximos passos
- Teste real do GitHub Pages em Android pendente.
- A questão apresentada no app é **adaptação autoral** claramente rotulada, não transcrição literal do texto do Cebraspe.
- Para ampliar acervo disponível para estudo, auditar individualmente novos itens, enunciados/alternativas e fundamentos, sem reproduzir indevidamente a íntegra da prova.
- Sem sincronização de dados entre navegadores.
