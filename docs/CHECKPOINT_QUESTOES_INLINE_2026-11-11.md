# AGU Quiz — UX de questões no cartão | 2026-11-11

## Solicitação
O usuário demonstrou no Android que o módulo exigia abrir um PDF externo para ler a questão, interrompendo a análise jurídica.

## Implementação
Arquivo alterado: `revisao-inteligente.js`.
- 10 itens da referência Cebraspe Advogado da União passam a apresentar enunciados **autorais adaptados**, diretamente no cartão: itens 1–9 de 2015 e questão 3 de 2023.
- Os enunciados não são transcrições literais da banca; o rótulo **Adaptação autoral de questão oficial** aparece no cartão.
- A vinculação ao número do item, à carreira, ao caderno e ao gabarito definitivo histórico foi preservada.
- Fonte primária (prova e gabarito) permanece acessível por links externos.
- Itens ainda sem versão interna conferida deixam de entrar na seleção automática; não são apresentados como perguntas completas nem avaliados.
- Gabarito só aparece após a seleção e o comando Conferir resposta.
- Comentário pedagógico é exibido após revelar resposta; validade jurídica contemporânea não foi homologada.
- O módulo continua salvando tentativas no `localStorage` legado da Revisão Inteligente, sem apagar respostas existentes.

## Evidência primária
- Cebraspe AGU 2015, prova `187AGU_001_01`: https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/187AGU_001_01.pdf
- Gabarito definitivo: https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/Gab_Definitivo_187AGU_001_01.pdf
- AGU 2023, prova `804_AGU_ADVOGADO_001_01`: https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/804_AGU_ADVOGADO_001_01.PDF
- Gabarito definitivo: https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/GAB_DEFINITIVO_804_AGU_ADVOGADO_001_01.PDF

## Testes
10/10 verificações locais aprovadas: sintaxe JS, disponibilidade dos textos, links originais, enunciado no cartão, posição antes das alternativas, gabarito oculto antes da resposta, revelação e comentário, tentativa persistida, revisão agendada e contagem dos dez itens.

## Limites
- Esta alteração não concede licença para reproduzir provas integralmente e não apresenta adaptações como texto literal oficial.
- Itens oficiais de 2023 de múltipla escolha exigem preparação rigorosa do conjunto de alternativas; o primeiro exemplar foi disponibilizado como adaptação, não transcrição.
- Teste visual/funcional em Android físico ainda pendente.
- Auditoria jurídica das explicações e atualização de normas internas da AGU permanecem pendentes; acerto não certifica domínio.
