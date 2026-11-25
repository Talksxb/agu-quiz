# AUD-UX-001 — Roadmap verificável

25/11/2026 · Executada somente AUD-UX-001. Este documento não autoriza executar as etapas seguintes ou editar/publicar livros.

## Entrega da sprint e percentuais

| Pacote verificável de AUD-UX-001 | Evidência | Estado |
|---|---|---|
| 1. Reconfirmar repositórios, regras e IDs | SHAs e consultas no inventário/diagnóstico | Concluído |
| 2. Localizar oito obras e versão antiga adicional | 61 arquivos, nove ZIPs, 93 membros, hashes e localizações | Concluído |
| 3. Propor reconciliação sem sobrescrever | Quadro planejamento × manuscritos reais | Concluído |
| 4. Auditar flashcards | 51 cartões / 11 baralhos; FC-01–08 | Concluído |
| 5. Auditar revisão | RV-01–04; contratos e testes do motor original | Concluído |
| 6. Auditar questões e integridade | 400 referências, três concursos, sete itens diretos; QT-01–08 | Concluído |
| 7. Auditar mapa e selecionar oportunidades reais | 43 agrupamentos × 412 IDs; MC-01–05; tabela abaixo | Concluído |
| 8. Implementar pequena melhoria em branch própria | Atalho Revisar agora, motor restituível por hash | Concluído |
| 9. Testar cinco larguras, persistência e backup | Jornadas Chromium, axe e regressões delimitadas | Concluído no escopo declarado |
| 10. Documentar e abrir PR própria | Quatro documentos e PR com escopo/evidências/limitações | Verificar PR vinculada a esta branch |

Fechamento da entrega: **10/10 pacotes = 100%**, quando a PR desta branch estiver aberta e vinculada no fechamento. É percentual de entregas desta sprint, não cobertura jurídica/curricular, domínio do aluno, publicação ou resolução de todos os problemas diagnosticados. Sem a PR, 9/10 = 90%.

Sequência de sprints: AUD-UX-001 concluída tecnicamente; **AUD-UX-002/003/004 não executadas**. Após a abertura da PR, 1/4 sprints = **25%** por contagem simples, sem ponderar esforço. O gate de integração/publicação da PR permanece separado.

## Continuidade e dependências

| Sprint | Objetivo | Entradas e escopo | Critério de encerramento | Estimativa de planejamento |
|---|---|---|---|---|
| AUD-UX-002 | Início direto de flashcards e revisão | FC-02/03/04/06/07; RV-01/02/03. Usar sessões, agenda e histórico existentes. Tratar em recorte pequeno se necessário | Escolher assunto e iniciar com menos decisões; retomada clara; filtros opcionais; explicar erros/dificuldade sem novo algoritmo; cinco larguras, teclado, axe, persistência/backup | 2–4 h |
| AUD-UX-003 | Questões e ligação com erros/revisão | QT-01–08. Entrada clara para lote aprovado versus prova histórica; explicitar reimportação; avaliar inclusão do histórico vigente no backup central existente | Direitos e gabaritos preservados; testes de erro, filtros, retomada, backup e elegibilidade; nenhum conteúdo pendente exportado | 2–4 h |
| AUD-UX-004 | Recursos por ID curricular real | MC-01–05; reconciliação editorial aprovada; ligações específicas para cartões, questões, legislação e capítulos existentes | Mostrar disponibilidade sem inventar aprendizagem/auditoria; preservar 412 IDs e histórico legado; integrar somente recursos com gate atendido | 2–4 h |

Estimativa técnica total para AUD-UX-001–004: **8–16 h** de planejamento; restante AUD-UX-002–004: **6–12 h**. Faixas orientativas de implementação/verificação, não horas já trabalhadas. Revisão jurídica e editorial integral dos oito manuscritos, aprovação humana e esperas de CI podem ampliar o prazo; não são uma promessa de publicação em 12 horas. Não há necessidade de produzir novos livros.

Dependência: revisar a PR de AUD-UX-001 antes de acumular alterações de interface. AUD-UX-002 pode ser dividida em filtros/instruções e retomada curta se uma alteração exigir mudança de contrato. A investigação jurídica por questão é uma frente de conteúdo separada; não deve inflar automaticamente o banco nesta sequência de UX.

## Oportunidades de conteúdo com identidade e portão definidos

Não foram gerados novos cartões ou questões. Cada linha abaixo é uma oportunidade rastreável, não aprovação automática de publicação. Todos os IDs citados existem na matriz original consultada; títulos são operacionais, não transcrição literal certificada do edital.

| Prioridade | ID(s) real(is) e assunto | Material existente | Situação e fontes | Próximo recorte útil |
|---|---|---|---|---|
| 1 | SEG-08 — Entidades fechadas | AU2015 Q196 já integra os sete itens vigentes; AUD02-100 consultada em main, leitura apenas | Registro público `vigente_conferida`, gabarito histórico E preservado. CF202 §3º, LC108 arts.2/5/6 e LC109 arts.19/21 no lote. LC109 arts.19/21 reabertos em fonte oficial em 25/11; sem reauditar toda a previdência | Um cartão autoral de distinção a partir do item já aprovado, com fonte, limite e data próprios; zero cartões SEG atuais. Submeter pelo pipeline existente |
| 2 | SEG-02 — RGPS: segurados, benefícios e custeio | AU2015 Q195; AUD02-099 presente e lida em main; AU2023 Q92 é outra referência do mesmo ID | Evidência pontual histórica de Q195 não equivale a elegibilidade atual. Revalidar leis 8.212/8.213, RPS e acordo Brasil–Canadá no recorte decisivo antes de gerar um cartão | Um caso delimitado de filiação e norma internacional, sem generalizar outros segurados/benefícios |
| 3 | PEN-11 — Crimes contra a Administração; PEN-13 — Crimes licitatórios | AU2015 Q169 e AU2023 Q83 (PEN-11); PF2023 Q89 (PEN-13), mantendo carreira distinta | NORM-PEN-011 lida em main: verificações pontuais e reservas; não aprova as questões. Q89 de PF não é prova de Advogado da União. Não importar PR privada de atualização | Escolher uma questão, conferir caderno/comando/gabarito e fundamentos atuais; só então uma distinção penal específica, sem cartões genéricos de todo o CP |
| 4 | TRAB-03 — Relação de emprego e terceirização | AU2015 Q172 e AU2023 Q88, já inventariadas no catálogo histórico | Vínculos referenciais não homologados; sem flashcard ativo e sem questão deste tema no lote vigente. Reconstituir regime e precedentes atuais, sem transportar automaticamente gabarito de 2015 | Uma questão elegível e um cartão correspondente somente após verificação individual de fonte/ratio/alcance |
| 5 | ELE-03 — Condutas vedadas aos agentes públicos | AU2023 Q96/Q98/Q100; ELE-02 Q97 e ELE-05 Q99 em recortes distintos | Catálogo contém referências, não comentários atuais aprovados. Nenhuma questão ELE no lote vigente e nenhum flashcard ativo. Aulas do ChatGPT não foram importadas como progresso | Conferir um item e o alcance de Lei9.504/TSE pertinente ao seu comando. Priorizar distinção concreta útil ao agente público; não presumir incidência ou domínio |
| 6 | AMB-06 — SISNAMA/PNMA/energia/saneamento | Arquivo de LIVRO-AMB-004 recuperado com 10 questões e 10 flashcards candidatos | `imported=false`, `published=false`; fontes e reservas declaradas em 22/11, sem aprovação nova | Reaproveitar apenas candidatos jurídicos aprovados em tarefa própria, depois da reconciliação do ID editorial. Não reescrever o capítulo |

Fontes oficiais abertas para a triagem de SEG-08: [LC 109/2001](https://planalto.gov.br/ccivil_03/leis/lcp/lcp109.htm), arts.19/21; [registro oficial da LC108](https://normas.leg.br/api/public/binario/2a2d7402-06fb-44ba-bc3f-20e72a96b821/texto), art.6. São apoio à escolha do recorte, não parecer de caso real. Para as outras linhas, o estado declarado é **candidato a revalidação**, evitando apresentar fonte histórica como norma atual automaticamente conferida.

Critérios de seleção: lacuna real de cartões; reutilização de evidência já existente sem copiar acervo privado; identidade do item; mudança temporal relevante; fonte decisiva verificável; utilidade para recuperar distinções; admissibilidade de reprodução e aprovação individual. Quantidade e popularidade não substituem esses critérios.

## Tempo e testes

O tempo efetivo total de leitura, investigação e implementação não foi cronometrado. Não é inferido de estimativas ou de minutos do estudante. Os 49 comandos Node somaram 11.639 s de processo; a rotina nova Chromium mediu 15.548 s na execução completa. As durações dos outros processos constam dos logs e relatórios `jornada.json`; elas não representam duração humana de estudo.

Validações locais: **49/49 comandos Node** do recorte executado, incluindo o runtime, validadores/compiladores da CI principal e integridade AU2023/AU2015/PF2023/GOV-AGU. **15/15 rotinas Chromium** relacionadas ao fluxo, após repetir WORK01 com o caminho do navegador correto; adicionalmente provas AU2023 e AU2015 em seis larguras cada. O novo teste percorre as cinco larguras exigidas, com 15 estados de acessibilidade sem pendência inconclusiva. A lista exata dos scripts está no diagnóstico; uma falha de inicialização ambiental não foi contada como aprovação.

Os testes locais não substituem os checks do HEAD remoto. A PR deve conter SHA, resultado da CI, evidências e limitações; não mesclar nem publicar com teste pendente/falhando. A branch desta sprint não altera as questões, os gabaritos, o backup, o armazenamento ou os livros. A próxima ação prioritária é revisar a PR de AUD-UX-001 e, em nova execução autorizada, iniciar o recorte de filtros/instruções de AUD-UX-002.
