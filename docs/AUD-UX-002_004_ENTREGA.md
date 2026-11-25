# AUD-UX-002–004 — Entrega e continuidade

25/11/2026. Escopo autorizado: três sprints consecutivas, sem merge/publicação. A AUD-UX-001 está documentada na PR #105. Os checkpoints desta sequência registram comportamento, regressões e limitações; os resultados remotos finais constam das respectivas PRs.

| Sprint | Entrega técnica | Verificação | PR/base |
|---|---|---|---|
| AUD-UX-002 | Disciplina e assunto visíveis; filtros avançados e instruções sob detalhes; fila geral explícita | Cinco larguras, filtros/erro/retomada, axe e comparação com fonte anterior realmente interceptada | #106 sobre #105 |
| AUD-UX-003 | Erros do lote vigente acessíveis; questão/filtros na URL; histórico existente incluído na cópia completa | Onze categorias, restauração sem substituir dados, recarga e correção, gabaritos e PDF preservados | #107 sobre #106 |
| AUD-UX-004 | Recursos existentes por ID; origem local do progresso explícita; importador aceita os quatro IDs com sufixo | 214 IDs públicos conhecidos, matriz local de 412, cinco capítulos aprovados, sessões preservadas | [#109](https://github.com/Talksxb/agu-quiz/pull/109) sobre #107 |

A criação de PRs empilhadas mantém os escopos revisáveis enquanto #105 permanece aberta. Os workflows aceitam essas bases em pull_request; os gatilhos de publicação continuam restritos a main. Nenhuma alteração de UX desta execução foi colocada no site público. Durante os testes, main avançou de e5436bb para 81070b4 por #108; as quatro branches foram reconciliadas para preservar essa publicação, exigindo nova CI nos HEADs exatos.

## Progresso verificável

Denominador desta sequência: 12 entregas técnicas, sendo uma mudança funcional delimitada, um pacote de testes, um checkpoint e uma PR própria por sprint. Os doze itens foram preparados; o encerramento do gate exige CI verde no HEAD final das três PRs, registrada nelas. Percentual de preparação: 12/12 = 100%. Publicação: 0/3, deliberadamente pendente de revisão/controles. A conclusão técnica não é uma declaração de publicação, domínio do aluno ou certificação jurídica.

Acervo: oito identificadores ambientais recuperados, zero não encontrados nesse recorte; nove versões contando a antiga AMB-03. Cinco capítulos integrados ao catálogo atual após a publicação concorrente de LIVRO-AMB-008 na PR #108, preservada nesta pilha; os quatro capítulos anteriores permanecem e AMB-11 foi acrescentado por outra execução. Sete manuscritos atuais continuam pendentes de integração/aprovação. A verificação do Pages de AMB-11 consta da PR. As localizações e conflitos estão em AUD-UX-001_INVENTARIO_ACERVO.md; URLs dos oito derivados JSON foram corrigidas nesta sequência. Nenhum novo livro, flashcard ou enunciado foi produzido: permanecem 51 cartões, 11 baralhos, sete questões do lote vigente e 400 referências históricas.

Problemas atendidos: decisões iniciais excessivas; instruções extensas; retomada de questões sem URL estável; histórico vigente fora da cópia completa; ambiguidade entre evidência local e auditoria; botões legados que prometiam estudo sem desafio; recursos separados por módulo; rejeição indevida de IDs com sufixo. A ampliação jurídica dos temas SEG/TRAB/PEN/ELE continua no roadmap anterior, com verificação individual e aproveitamento de fontes elegíveis.

## Tempo e estimativas

O tempo efetivo total não foi cronometrado; não foi inferido de estudo, timestamps ou estimativas. A execução cumulativa de 51 comandos Node e as rotinas Chromium têm tempos de processo nos relatórios; não equivalem a horas de trabalho humano. A estimativa anterior de 6–12 horas para esta sequência era planejamento, não duração realizada. Estimativa de trabalho restante para revisar, retargetar, repetir gates e conferir a publicação controlada: 1–3 horas técnicas, sujeitas às esperas de CI e aprovações. Essa faixa exclui a revisão jurídica dos sete livros ainda pendentes e de novos conteúdos. Não há sprint adicional desta sequência iniciada.

Próxima ação prioritária: revisar #105 e depois cada PR dependente, com CI do HEAD exato e escopo validado. Após integração aprovada, confirmar Pages build/deploy/report e repetir a verificação pública. Não alterar gabaritos com base em PRs privadas pendentes; não usar aulas do ChatGPT como progresso importado.
