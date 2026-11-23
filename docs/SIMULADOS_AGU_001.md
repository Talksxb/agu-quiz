# SIMULADOS-AGU-001 — estudo a partir de questões

Data: 23/11/2026, America/Sao_Paulo. Base confirmada: `f1705ab54d5ebcb12d9195c4f5d42ee5d67a265a`, após integração de MÉTODO-AGU-004/PR #79. Branch `feat/simulados-agu-001`. Entrega preparada para revisão em PR draft, sem merge ou publicação nesta etapa.

O Método AGU já reunia leitura, aplicação, recuperação e revisão, mas não oferecia sessões de questões com prazo absoluto e correção orientando o próximo estudo. Esta etapa acrescenta **Simulados rápidos** no mesmo percurso e **Treinar este capítulo** no capítulo aberto.

## Uso

1. Biblioteca Inteligente → Método AGU → Simulados rápidos.
2. Escolher 5 questões/7 min, 10/12 ou 15/20; a quantidade pode variar de 1 a 30 e a duração de 1 a 90 minutos.
3. Selecionar matérias e objetivo: prática variada, questões ainda não feitas ou dificuldades. O modo Estudo permite conferir uma questão por vez, sem prazo.
4. Responder e, opcionalmente, indicar confiança antes da correção. É possível pular e voltar. No simulado, os fundamentos aparecem após o encerramento.
5. Na correção, começar pelos três fundamentos prioritários, revelar o cartão por escolha e abrir a seção correspondente. O restante fica em uma seção expansível. Uma conclusão acertada sem confiança alta permanece como acerto inseguro, incluindo confiança não informada.

O simulado tem relógio absoluto: fechar a área, trocar de aba ou recarregar não devolve tempo. Ao retomar após o limite, encerra uma vez e mantém omissões. O treino aplica 1 por acerto e 0 por erro/omissão; não reproduz mínimos por grupo ou regras de um futuro edital. O modo Estudo tem consulta após a resposta e aparece identificado separadamente no histórico. Nenhuma porcentagem é domínio ou previsão de aprovação.

## Conteúdo efetivamente entregue

São **24 questões autorais, com cinco alternativas, oito por recorte**:

| Capítulo público | ID curricular | Conteúdo do lote |
|---|---|---|
| LGPD aplicada à Administração Pública | ADM-64b | Necessidade, base legal, dado sensível, decisão automatizada, estatais, compartilhamento, agentes de tratamento e segurança |
| Competências e Cooperação Ambiental | AMB-03 | Competência administrativa/legislativa, normas gerais, supletiva/subsidiária, licenciamento, instrumentos de cooperação e medidas urgentes |
| Agentes públicos | ADM-54 | Concurso, função de confiança, comissão, temporários, acumulação atual, remuneração e validade do concurso |

As questões foram redigidas nesta execução e cotejadas pontualmente com as versões oficiais da CF, LGPD e LC 140 abaixo. **Não são transcrições nem questões oficiais do Cebraspe, nem revisão humana independente.** A aprovação editorial assistida registra exatamente esse alcance. O item de acumulação com magistério considera a redação da EC 138/2025. Questões de estabilidade detalhada e disponibilidade não foram incluídas em ADM-54: o capítulo remete esse aprofundamento a ADM-55.

As quatro paráfrases históricas públicas de 2015 já existentes no Leitor permanecem nos arquivos e fluxos originais. O acervo privado de auditoria **não foi importado** para este banco. Transcrição, vínculo curricular, gabarito definitivo e conclusão atual são verificações diferentes; a existência de uma delas não libera automaticamente as demais. Uma expansão baseada nas provas exige triagem por questão, origem e recorte temporal, com preservação de anulações e separação entre gabarito histórico e adaptação autoral atual. Não se identifica Procurador Federal como Advogado da União.

Fontes abertas em 23/11/2026; os dispositivos precisos constam por questão:

- [LGPD consolidada na Câmara](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html): arts. 5º–7º, 11, 20, 23, 24, 26 e 46 nos recortes do banco.
- [Constituição atualizada na Câmara](https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html): arts. 23–24 e 37 nos recortes do banco.
- [LC 140/2011 no Planalto](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp140.htm): arts. 2º, 4º, 13 e 17, § 2º. O item de urgência não resolve toda a jurisprudência sobre autos de infração concorrentes.

O corte normativo destas questões é a consulta de 23/11/2026, distinto do corte histórico de auditoria identificado em outras frentes. Não foi certificada toda a legislação, jurisprudência ou cadeia de alterações de cada unidade. Os capítulos aprovados foram preservados, sem atualização silenciosa de seu texto.

## Geração de questões, cards e continuidade

`livros/editorial/simulados-agu-001.json` é a fonte estruturada: caso, alternativas, resposta, feedback de cada alternativa, explicação, cartão e fontes. **O cartão não repete simplesmente a letra ou o texto da alternativa certa**: recupera uma regra e um limite. Não há extração automática de um cartão por parágrafo.

`node scripts/gerar-simulados.cjs` produz o banco de execução e o relatório. A aprovação é vinculada por SHA-256 ao conteúdo, à seção/edição do capítulo e às fontes. Mudanças retiram o item do banco até revisão correspondente; `--check` recusa artefato desatualizado. A interface também compara seção e edição atuais antes de permitir novos treinos. Os snapshots de sessões já respondidas ficam preservados como histórico.

A montagem do treino, a correção, a seleção dos cards de dificuldade e o roteiro de aprofundamento são automáticos. **Não existe geração de novas proposições jurídicas por IA no navegador ou em segundo plano.** O roteiro pode ser baixado e levado ao chat disciplinar para produzir novo conteúdo com pesquisa e revisão explícitas. Nenhuma API, chave, sincronização privada ou agendamento foi acrescentado. O compilador é determinístico e reprocessável: não inventa novos enunciados a cada uso.

Os cards da correção são parte desta sessão e não constituem outro motor de revisão espaçada. Os 51 cards históricos, seus IDs, agendas e avaliações ficam no motor existente, preservado. Incluir novas proposições nessa agenda exige o fluxo editorial já existente de candidatos e aprovação; este lote não atribui avaliações ao estudante.

## Persistência e recuperação

A chave exclusiva é `agu_simulados_v1`. São guardadas a sessão ativa e até 80 concluídas, com snapshots das questões, respostas, confiança e datas. As outras chaves do Quiz e do Método não são escritas por esta funcionalidade. O histórico não cria horas de estudo confirmadas nem Caderno, avaliação discursiva ou domínio.

O **backup geral do percurso ainda não inclui estas sessões**. Há exportação e importação próprias em JSON, visíveis na área. A importação valida limite de 8 MiB, UTF-8, estrutura, identidades e respostas; adiciona somente IDs ausentes e preserva sessão ativa/conflitos locais. Ela não autentica resultados como prova externa de desempenho.

JSON inválido bloqueia o treino sem substituir o registro. Quota mantém a sessão em memória e informa que não foi guardada; exportação continua disponível. Mudança detectada em outra aba bloqueia novas gravações e pede exportar/recarregar. Web Storage não fornece transação ou exclusão mútua; a comparação de bytes reduz conflitos, mas não promete impedir todas as corridas entre abas. Ao atingir o limite de histórico, novas sessões ficam bloqueadas. Há arquivamento explícito: primeiro baixar o arquivo e depois confirmar que ele foi guardado; só então as sessões concluídas são retiradas deste navegador, preservando a sessão ativa e os demais percursos.

## Validação

- 10 cenários Node novos: compilação, seleção, priorização, correção, prazo absoluto, modo Estudo, retomada, dados inválidos/quota/concorrência, importação e suspensão por alterações.
- 44 comandos do job de integridade Node executados localmente com sucesso, incluindo regressões históricas.
- Jornada manual no navegador: acesso pela Biblioteca, configuração 15/20, resposta/confiança, confirmação de encerramento, correção e modo Estudo com quatro questões, feedback individual e bloqueio da resposta já conferida. Navegador de teste, sem atividade pessoal do estudante.
- Jornada automatizada adicionada ao CI: 320/390/768/1280 px, axe, recarga, exportação real, acesso à seção, modo Estudo, tempo expirado e falhas de armazenamento. O resultado do CI do HEAD deve ser conferido na PR; existência do script não prova sua execução.
- Android físico e TalkBack não foram testados. Aprovação assistida pontual não é certificação WCAG ou curricular.

## Continuidade

O próximo prompt completo está em `docs/PROMPT_SIMULADOS-AGU-002.md`. A tarefa de revisão/publicação não foi executada neste lote. O roteiro posterior deverá tratar de uma amostra histórica pequena e rastreável, da qualidade dos distratores e da integração com o pipeline existente de cartões; não da publicação integral e automática da auditoria.
