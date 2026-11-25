# AUD-UX-001 — Diagnóstico de UX

25/11/2026 · America/Sao_Paulo. Base: `e5436bb071afe0967d29665c0ad042beb084ee13`. Branch própria `work/aud-ux-001-inventario-revisao`. Somente esta sprint.

## Método e limites

Inspeção de código, catálogos e armazenamento, Chromium real em contextos novos com dados sintéticos e larguras **320, 360, 390, 430 e 1280 px**. Toque emulado nos quatro tamanhos móveis, teclado real automatizado e axe-core. Não houve Android físico, TalkBack, acesso ao histórico pessoal do estudante ou certificação pedagógica/jurídica.

As imagens históricas mencionadas no pedido não estavam anexadas em bytes nesta execução. Os números e fluxos descritos pelo usuário foram confrontados com a aplicação e novas capturas sintéticas; não se afirma cotejo visual com as imagens originais. As capturas geradas são evidências de teste, fora do conteúdo público dos livros.

## Acervo efetivamente ativo

| Conjunto | Contagem | Interpretação |
|---|---:|---|
| Flashcards | 51 | 22 de base + 14 AUD03 + 8/4/3 dos lotes CARTOES-AUD; zero cartões editoriais ativos |
| Baralhos | 11 | 7 ADM, 3 CON e 1 PC; somente três disciplinas com cartões |
| Referências de prova AU2023 | 100 | 93 não anuladas, sete anuladas; não significa 93 conferidas para direito vigente |
| Referências de prova AU2015 | 200 | 192 não anuladas, oito anuladas |
| Referências PF2023 | 100 | 96 não anuladas, quatro anuladas; carreira distinta de Advogado da União |
| Total de referências históricas | 400 | 381 não anuladas / 19 anuladas; PDF local exigido para resolução no banco histórico |
| Treino oficial direto de direito vigente | 7 | SEG-08: uma; Administrativo: cinco; Advocacia Pública: uma; filtros e histórico próprios já existentes |
| Referências oficiais no motor legado de revisão | 24 | Coleção distinta das 400 referências do banco PDF; duas anuladas, somente adaptadas elegíveis são pontuadas |
| Questões autorais do módulo de simulados/livros | 24 | Banco separado; não são questões oficiais |
| Desafios autorais do MVP legado | 40 | Banco separado do simulador e do catálogo oficial |
| Agrupamentos do Mapa Curricular legado | 43 | 14 categorias de interface, sem correspondência 1:1 com os 412 IDs originais |

Distribuição de cartões: ADM-06 12; ADM-13 4; ADM-17 1; ADM-23 4; ADM-25 5; ADM-27 3; ADM-58 1; CON-02 2; CON-24 1; CON-50 8; PC-03 10. Somam 51. Seguridade, Trabalho, Penal e Eleitoral têm **zero flashcards ativos** neste recorte.

O PDF oficial AU2023 foi obtido diretamente do Cebraspe: SHA-256 `943ca40b0f79266b63ed7d677ba797ce1d6bc626c422592eceb321246ecdd196`. O gabarito definitivo oficial foi aberto nesta sessão e as 100 posições foram cotejadas com o catálogo: anulações 7, 25, 30, 41, 50, 54 e 81. Não foi alterada nenhuma resposta histórica. Os testes de integridade existentes também foram executados para AU2015 e PF2023.

## Flashcards: caminho observado e problemas

Biblioteca Inteligente → Flashcards e revisões → filtros/explicações → baralho → frente → revelar → avaliação → próximo. A sessão de baralho salva posição, cartões avaliados e estado de revelação no mesmo registro do motor. Abertura e revelação não avaliam o estudante.

| ID | Evidência observada | Consequência e prioridade |
|---|---|---|
| FC-01 | A revisão sugerida e sua ação ficam depois dos 11 baralhos; em 390 px a ação automática estava a mais de 6.000 px do topo | Esforço de rolagem antes de revisar; **corrigido pontualmente nesta sprint** por atalho no início |
| FC-02 | Quatro filtros, uma explicação extensa de estados/níveis e metadados precedem a atividade; o primeiro baralho fica além da primeira tela estreita | Distração antes de escolher o assunto; reduzir instruções e oferecer filtros opcionais em AUD-UX-002 |
| FC-03 | “Dificuldade documentada” filtra nível cognitivo original, não a avaliação “Difícil” feita pelo aluno | Pode ser confundida com dificuldade pessoal; esclarecer e oferecer acesso à dificuldade registrada sem reinterpretar os níveis |
| FC-04 | Ordenação alfabética, sem indicação de próximo assunto por agenda/progresso na escolha de baralho | O aluno precisa decidir repetidamente; eventual recomendação deve usar as contagens já calculadas |
| FC-05 | Há contagens corretas de inéditos, vencidos estritos, hoje, futuros e avaliados sem data | Preservar a distinção; mostrar informação curta antes e detalhes sob demanda |
| FC-06 | Retomada da sessão de baralho é persistida; seleção da fila inteligente não tem cursor de sessão persistente | Não prometer retomada exata da fila antiga. Retomar o baralho existente tem prioridade quando há sessão interrompida |
| FC-07 | Frente é botão; verso é grupo semântico, com avaliações e Anterior/Próximo. Não há comando explícito para ocultar novamente o verso sem mudar de cartão | Avaliar a necessidade em sprint posterior; não registrar outra tentativa ao rever o mesmo cartão |
| FC-08 | Fonte jurídica, nota histórica e rastreabilidade ficam no verso em detalhes. Não há vínculo específico universal com capítulo | A referência não garante conexão a livro; só criar link quando existir seção pertinente aprovada |

## Revisão inteligente: regras existentes e dificuldades

`candidates`, `urgent`, `choose`, `rating` e `DAYS` em `revisao-inteligente.js` são o motor já existente. Candidatos precisam estar sem data ou com prazo até hoje; cartões futuros não entram na seleção automática. A prioridade usa prazos, erros, ineditismo local e verificação pontual. A seleção sugerida combinada prevê até cinco flashcards e três referências oficiais elegíveis. A ação legada só de flashcards trabalha com até 30 candidatos por seleção e escolhe um por vez; **não é uma sessão curta de cinco cartões com término persistido**.

Os intervalos permanecem D+1/D+7/D+21/D+45 conforme a avaliação e o estágio. Um erro retorna ao estágio inicial, com próxima revisão D+1; não se passou a repetir imediatamente o cartão na mesma fila. A avaliação dentro do baralho é única por cartão naquela sessão; navegar ou revelar não gera domínio nem novo acerto.

| ID | Diagnóstico | Tratamento proposto |
|---|---|---|
| RV-01 | Erros recorrentes aparecem como métrica; não há entrada simples dedicada a todos os cartões difíceis/erros por assunto | AUD-UX-002: aproveitar os registros existentes, sem nova agenda ou chave de armazenamento |
| RV-02 | Não há sessão curta explicitamente delimitada/retomável na fila legada | Examinar adaptação da sessão de baralho já existente; não criar histórico paralelo nem prometer duração sem medida |
| RV-03 | O painel legado chama de “Revisões vencidas” também os itens que vencem hoje e pode incluir referências oficiais fora do conjunto pontuável | Rótulo/denominador precisam ser mais claros; não alterar a contagem do algoritmo nesta sprint |
| RV-04 | Tentativas importadas sem agenda são avaliadas historicamente, mas não têm `seen/due` reconstruídos; o filtro “Avaliados sem data” preserva isso | Manter o estado explícito. O novo atalho inclui tais candidatos pela regra antiga, sem inventar vencimento |

## Questões oficiais: fluxos disponíveis e dificuldades

O banco histórico permite escolher AU2023, AU2015 ou PF2023, depois disciplina, assunto e situação. Há filtros de novas, erros, favoritas, anuladas, comentadas, pendentes e sem mapeamento. Os rótulos curriculares históricos são referenciais, não homologação global.

No caminho PDF: baixar o caderno oficial → confirmar origem → importar arquivo → validar SHA-256, estrutura, identidade, páginas e localizadores → ler canvas/texto extraído → escolher resposta → responder → ver gabarito histórico, comentário quando disponível e registrar erro/notas. Os PDFs permanecem em memória, não são republicados pelo banco e saem na recarga. Trocar prova dentro da mesma página reutiliza os PDFs já importados naquela sessão. Preferências, posição por prova, favoritos, notas e respostas ficam no histórico principal e entram no backup existente.

O caminho de direito vigente já oferece **sete questões** diretamente, com portão individual, comentário histórico/atual e proveniência. Ele precisa ser apresentado claramente para evitar que o aluno suponha ser obrigatório importar PDF para qualquer atividade. As nove análises de uma frente privada ou PR pendente não foram promovidas ao conjunto público.

| ID | Evidência | Próximo passo |
|---|---|---|
| QT-01 | 100 referências de AU2023 são apenas uma das três provas; cabeçalho geral já informa 400 | Tornar a escolha da prova e do modo de estudo mais evidente |
| QT-02 | Importação do PDF repete-se após recarga; origem/assinatura por hash e contexto compartilhado são controles reais | Explicar “por sessão”; discutir somente simplificação admitida pela governança, sem remover confirmação ou republicar conteúdo não liberado |
| QT-03 | Treino vigente e banco histórico são caminhos diferentes; as regras temporais e a necessidade de PDF mudam | Entrada com escolha clara entre resolver lote aprovado e consultar prova histórica |
| QT-04 | “93 válidas” significa não anuladas na prova, não 93 respostas vigentes verificadas | Ajustar semântica em AUD-UX-003; preservar gabaritos e anulações |
| QT-05 | Quatro comentários específicos no banco histórico: AU2015 Q74; PF2023 Q59/Q83/Q97. Os sete itens do treino vigente têm seus próprios comentários | Exibir disponibilidade sem sugerir comentário completo para 400 itens |
| QT-06 | Erros históricos, erros do treino vigente e avaliações de cartões não formam um percurso único de revisão | Criar conexão somente para conteúdo elegível e IDs confirmados, reutilizando o motor existente; não alimentar a revisão com material pendente |
| QT-07 | Treino vigente já grava em `agu_gov_003_treino_vigente_v1`, com exportação/importação próprias; essa chave não está nas dez categorias de `AGUBackup20` | Há lacuna real no “backup completo” central para esse módulo. Tratar em AUD-UX-003 com contrato e testes; não criar outra chave/histórico |
| QT-08 | A posição de questão corrente do treino vigente não é persistida como sessão; o banco PDF preserva posições por prova | Distinguir tentativa salva de posição retomável; definir retomada sem duplicar tentativas |

Manter autorais, adaptações e oficiais identificadas. O conjunto vigente exige elegibilidade e preservação da chave histórica; questões anuladas não geram pontuação. Nenhuma condição de reprodução foi ampliada nesta sprint. O GOV-001 afasta proibição genérica, mas conserva verificação individual e admissibilidade; não exige certificação integral da matriz para cada item.

## Mapa Curricular e integração dos 412 IDs

O Mapa Curricular visível usa `D`/`Q` de `index.html`: **43 tópicos amplos**, identificados por strings como `ADM/Atos administrativos`. A matriz original tem **412 IDs únicos, em 14 disciplinas**, consultados na auditoria privada. O Quiz tem outra tela, “Matriz curricular 2022”, que aceita importação local explícita e vínculos manuais; ela não recebe automaticamente os dados do assistente.

| Categoria da interface legada | Quantidade de agrupamentos | Relação com a matriz original |
|---|---:|---|
| ADM / CON / PC / TRIB / CIV / EMP / TRAB / INT / AMB | 6 / 6 / 6 / 3 / 2 / 2 / 2 / 2 / 2 | Matérias existentes, mas agrupamentos não são os IDs granulares originais |
| FIN / ECO | 5 / 2 | Separam a disciplina original FIN-ECO; não somar como duas disciplinas do edital |
| PREV | 2 | Rótulo legado relacionado à disciplina original SEG; não é ID substituto |
| DH / OUT | 2 / 1 | Categorias auxiliares/legadas, não disciplinas originais equivalentes |
| AGU / PEN / SEG / ELE | Sem abas próprias equivalentes no Mapa legado | AGU/PEN/SEG/ELE existem na matriz; não concluir ausência de conteúdo jurídico por ausência de aba |

O mesmo denominador “14” nos dois lugares não demonstra correspondência: as listas diferem. Todos os códigos não nulos presentes nos três catálogos históricos foram cotejados com a lista original: nenhum código inexistente; três registros PF seguem sem código. Isso não homologa a classificação jurídica de cada questão.

| ID | Rótulo/ação | Significado real e risco |
|---|---|---|
| MC-01 | Mapa Curricular | É mapa amplo legado de 43 agrupamentos; falta ponte explícita e revisada para 412 IDs |
| MC-02 | “0 evidências” | Contador local `data.topic[id].evidence`, alimentado por respostas com crédito positivo. Não mede evidências da auditoria jurídica privada |
| MC-03 | “Não iniciado” | Estado local padrão na ausência de registro; não significa assunto não auditado ou nunca tratado no ChatGPT |
| MC-04 | “Estudar” / “Pendente” | Depende somente de haver desafio no `Q` legado para aquele agrupamento. Ignora a existência de cartões, capítulos e legislação em outros módulos |
| MC-05 | Estados de aprendizagem | Vocabulário legado difere dos quatro estados da Base Mestra final. Compatibilizar apresentação sem inferir domínio, importar aulas ou reescrever histórico |

Ausência de registro local não é ausência de auditoria. Tópico disponível, recurso aberto, tentativa avaliada, aprendizagem demonstrada e certificação jurídica são trilhas diferentes. Não foi importado progresso do ChatGPT, emitido Caderno paralelo ou alterado qualquer ID.

## Conferência da versão publicada

Em 25/11/2026, os sete arquivos abaixo, obtidos da URL pública, corresponderam byte a byte à base main consultada. Esse cotejo confirma o acervo/fluxo existente; não indica publicação do novo botão.

| Arquivo | Bytes | SHA-256 |
|---|---:|---|
| `index.html` | 113275 | `617fc7e5880b0fb209f375262c177f90d73bcef487ec67fb7fd6bf8796a955ca` |
| `revisao-inteligente.js` | 79864 | `02b04c35522a1d8dae020433c8957c297dd960990a573cb81943e0c82f010f0d` |
| `livros/catalogo.json` | 1757 | `90e70c6cfb7141960c28b1413bf4ee1443fd5fc80b7c21015f03aae5828ea34e` |
| `livros/editorial/catalogo.json` | 273 | `2cf875c6e61c827ed8575b42231b3ec77ae2f315ac83693c0a576ef935ae46a2` |
| `livros/colecoes/ambiental.json` | 8351 | `2148ca6f150f9c14213679a41b65e34e1d866f59cf17d755d5f8b9173d418455` |
| `dados/questoes-agu-2023.js` | 18876 | `7592e4388fdec3cc36fb5a55bb206d387587ded530ebd9b9d82862986929548e` |
| `dados/questoes-vigentes-gov003.js` | 20681 | `a8785d67a158a0cf9a97249cd0226c6cf930fdb9b8661bce48307a840b1a10b8` |

## Melhoria implementada nesta sprint

Um atalho **“Revisar agora”** aparece antes dos filtros quando não há sessão de baralho interrompida. Chama a seleção de flashcards já existente e leva ao cartão ativo; por teclado, o foco vai para “Mostrar resposta”. Se todos os cartões estão agendados para o futuro, a ação fica desabilitada e explica a ausência de fila. Quando há baralho interrompido, prevalece o botão já existente “Retomar sessão”.

Alterações de produto limitadas a `revisao-inteligente.js`: função de navegação/apresentação, botão/explicação curta e identificador do painel ativo. Nenhuma mudança em seleção, prioridade, intervalos, avaliação, persistência, backup, dados, PDFs ou capítulos. O reversor de teste aplica quatro diferenças exatas e exige a restituição byte a byte do arquivo anterior, SHA-256 `02b04c35522a1d8dae020433c8957c297dd960990a573cb81943e0c82f010f0d`. As fixtures históricas e suas contagens não foram reescritas.

No ensaio controlado, com fontes prontas e viewport de 900 px de altura:

| Largura | Ação automática antiga: posição Y | Novo atalho: posição Y |
|---:|---:|---:|
| 320 | 6737 px | 460 px |
| 360 | 6594 px | 460 px |
| 390 | 6369 px | 460 px |
| 430 | 5745 px | 437 px |
| 1280 | 3351 px | 373 px |

São coordenadas do layout no teste, não tempo humano economizado. O atalho ocupa a primeira tela em todas as larguras; a lista de assuntos, filtros, fontes e controles jurídicos continuam disponíveis. A redução de instruções e a reorganização completa ficam para AUD-UX-002.

## Validação, evidências e estado da entrega

Teste novo: `tests/aud-ux-001-browser.cjs`; resultados e capturas sintéticas em `tests/artifacts-aud-ux-001/`, publicados como artefato de CI, não como acervo de estudo. São verificados: mesma seleção do motor anterior; ausência de escrita ao abrir/revelar; toque/teclado/foco; seleção de assunto; três avaliações; erro com intervalo preservado; pausa, recarga e retomada exata de baralho; exportação real e restauração em perfil novo; preservação de planejamento preexistente; reimportação idempotente; fila futura bloqueada; revisões vencidas com erros e tentativas sem agenda; ausência de overflow.

O axe foi executado em entrada, resposta e retomada nas cinco larguras: **15 verificações, zero violações, zero alvos inconclusivos restantes**. Os alvos inicialmente inconclusivos foram rolados e reconferidos na mesma regra/seleção; não contaram como aprovação até passar. Isso é evidência automatizada delimitada, não certificação de acessibilidade assistiva.

As rotinas Node da CI principal e as verificações de gabarito dos três concursos foram executadas localmente. As regressões Chromium incluem UX-BARALHOS-01–05, CARTOES-AUD-01–03, LEG08/10/11/12, WORK01, UX-AGU-006, provas AU2023/AU2015 e a rotina nova. O resumo de resultados/tempo consta no roadmap; logs completos e JSON de cada jornada permanecem em artefatos. A primeira tentativa de WORK01 não iniciou por falta do executável padrão do Playwright; a repetição com o Chromium instalado passou, sem alterar o teste ou o produto.

Motor local: Chromium **158.0.8127.0**, axe **4.14.1**. Os binários padrão não estavam disponíveis; a execução local usou outro Chromium instalado, com caminho explícito. A CI instala sua versão própria. Nenhum teste foi declarado em Android físico ou TalkBack.

Esta branch não foi mesclada ou publicada. A PR deve informar o HEAD exato e os resultados atuais de CI. CI pendente, cancelada ou inconclusiva não constitui aprovação. As limitações de acervo, revisão jurídica e integração constam do inventário e continuam abertas.
