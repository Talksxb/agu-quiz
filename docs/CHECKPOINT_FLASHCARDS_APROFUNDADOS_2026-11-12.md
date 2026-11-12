# AGU Quiz — Lote de Flashcards Jurídicos Aprofundados | 2026-11-12

## Situação
Implementação publicada na branch `main` de `Talksxb/agu-quiz`. Alterações em `revisao-inteligente.js` e atualização da versão de script em `index.html`.

## Acervo
- **10 flashcards autorais novos**, em estilo de raciocínio cobrado pelo Cebraspe, mas **não são itens oficiais da banca**.
- **22 flashcards no total**, mantendo IDs e histórico dos 12 anteriores.
- 5 cartões de `ADM-06`: delegação entre órgãos sem hierarquia, decisão de recurso administrativo, autoria do ato delegado, avocação, revogação da delegação.
- 4 cartões de `PC-03`: vedação de decisão-surpresa, tutela de urgência, fundamentação por citação legal, ratio de precedentes.
- 1 cartão de `CON-50`: PGFN e dívida ativa tributária da União.
- Fonte e dispositivo em cada verso, URL oficial consultável, comentário com caso prático/armadilha de prova.
- Estado de revisão dos cartões novos: `A_dispositivo_normativo_conferido_pontualmente` — isto significa conferência do texto normativo relevante, **não homologação jurisprudencial integral ou domínio do estudante**.

## Fontes oficiais
- Lei 9.784/1999, arts. 11 a 15: https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html
- CPC (Lei 13.105/2015), arts. 9º, 10 e 489: https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html
- Constituição Federal, art. 131, § 3º: https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm

## Interface
No menu **Revisão Inteligente → Flashcards**, os itens novos aparecem em prioridade enquanto estiverem inéditos/vencidos. A frente mostra a pergunta; o verso apresenta resposta, caso prático, armadilha, fundamento, status de conferência e URL da norma. Avaliações anteriores e janelas de repetição espaçada permanecem disponíveis.

## Testes
- Sintaxe do JavaScript de revisão e script principal: aprovadas.
- Contagem de cartões: 22 (12 anteriores + 10 novos).
- Primeiro cartão novo na fila, verso oculto, visualização da fundamentação e caso, link da fonte e distinção autoral: aprovados.
- Registro persistido em `localStorage` e agendamento após Errei: aprovados.
- Chaves anteriores `agu_quiz_mvp1_2026` e `agu_quiz_planejamento_semanal_v1` não são modificadas pelas alterações.
- **Teste visual em Android e publicação efetiva no Pages: pendentes de validação externa**.

## Relação com auditoria documental
A matriz privada `Talksxb/agu-auditoria` e seus checkpoints não foram alterados. Auditoria da matriz, verificação normativa e revisão de gabarito de cada prova Cebraspe são controles separados. **Não afirmar que todas as questões oficiais estão corrigidas e atualizadas.** Cada item oficial precisa ter seus próprios metadados, gabarito definitivo, dispositivo/precedente vigente e registro de data e revisão.

## Próximo incremento
Ampliar os itens oficiais com justificativas individuais e diferenciar de forma explícita no painel: gabarito histórico verificado; fundamento atual revisado; pendência jurídica. Corrigir os identificadores operacionais `PC-01` dos cartões legados quando houver rastreabilidade para `PC-03`, preservando seus IDs e histórico.
