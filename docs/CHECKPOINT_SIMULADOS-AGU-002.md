# SIMULADOS-AGU-002 — revisão e publicação

Data: 23/11/2026, America/Sao_Paulo. PR: [#82](https://github.com/Talksxb/agu-quiz/pull/82). Branch de implementação e revisão: `feat/simulados-agu-001`.

## Retomada e autorização

O usuário solicitou expressamente executar SIMULADOS-AGU-002, conforme o prompt completo em `docs/PROMPT_SIMULADOS-AGU-002.md`. Essa execução autoriza revisar, corrigir, integrar a PR e verificar sua publicação quando o HEAD final e os critérios estiverem aprovados. A restrição de não publicar em 001 era daquela execução e permanece como registro histórico.

A consulta inicial confirmou `main` em `1191267482ace4429cfd9d5f559a626461b29493`, com MÉTODO-AGU-005/PR #80, e PR #82 aberta em rascunho, sem conflitos, HEAD `0708a29ffff3a37863eb7f73b7240cd38a3d7b07`. A CI histórica `45266434289` estava aprovada; seu relatório tinha vinte varreduras do simulado, zero violações e zero inconclusivos. Essa execução anterior não aprova antecipadamente os novos arquivos de 002.

A primeira revisão de 002, HEAD `da823595ed7f65f74c54865bb4f61c9d67c6a63b`, passou na CI `45271537035`. O artefato `14866176492` foi baixado e teve SHA-256 `f4785c0c6b9c2e088ccaa8bddff074939b9c0044869cd18b4ef6d1c784e72e29` conferido: 22 varreduras do simulado, zero violações e zero inconclusivos, com importação/arquivamento e casos adversariais aprovados. Durante a CI, `main` avançou para `ee52ed2bc41a61cfd9db4ed803fd7a0840cfb1b6` com INTERFACE-AGU-001/PR #84 já integrada. O único conflito era a inserção de etapas e caminhos de artefatos na CI; ambas as jornadas foram preservadas na resolução. Não se integrou outra PR aberta. A combinação com a nova base exige nova CI e novo relatório do HEAD final antes de publicar.

Foram consultados o prompt completo de 002, implementação e checkpoint de 001, ingestão Método AGU, backup/compatibilidade e protocolo existente de cartões. Aplicam-se os quatro documentos pedagógicos finais do Projeto AGU já consultados. O recorte é implementação e conteúdo de treino; não retoma uma aula, não pressupõe Caderno sincronizado e não atesta domínio do aluno. `agu-auditoria` privado não foi importado ou alterado.

## Revisão editorial e normativa

Mantêm-se 24 questões autorais, oito por unidade, mesmas identidades e mesmas respostas corretas. A edição passa de 1.0 para **1.1**. As alternativas incorretas e seus comentários foram revistos nas 24 questões: agora exploram confusões sobre base legal e princípios, sigilo e dado sensível, competência administrativa e legislativa, supletiva e subsidiária, função de confiança e comissão, prazo inicial e prorrogação, entre outras. Cada comando foi cotejado com a resposta única, explicação, cartão, fonte decisiva e seção efetiva do capítulo. Não se trata de revisão humana independente.

A fonte constitucional passa a apontar para a versão consolidada efetivamente aberta no Planalto. Foi acrescentada a fonte primária da EC 138/2025 ao item `sim-adm-05`, que já adotava a redação atual. As aprovações por hash foram renovadas depois do cotejo e o compilador gerou 24 itens aprovados pontualmente, zero pendentes. A compilação não outorga aprovação jurídica. Mudanças futuras no conteúdo, fonte ou seção continuam retirando os itens dependentes até revisão correspondente.

Fontes primárias consultadas em 23/11/2026:

- [LGPD consolidada — Câmara](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html).
- [Constituição consolidada — Planalto](https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm).
- [LC 140/2011 — Planalto](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp140.htm).
- [EC 138/2025 — Planalto](https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc138.htm), arts. 1º–2º, DOU de 22/12/2025.

O resultado da conferência por item é a manutenção de uma alternativa correta e do vínculo abaixo. O cotejo é pontual nos dispositivos indicados; não certifica toda a disciplina ou jurisprudência. Os itens de licenciamento e urgência não resolvem regimes setoriais especiais nem toda a controvérsia sobre sanções concorrentes.

| Questão | Problema examinado | ID curricular / seção | Resposta | Dispositivos conferidos |
|---|---|---|---|---|
| sim-dig-01 | Coleta mínima de dados | ADM-64b / lgpd-adm64b-s04 | B | LGPD, art. 6º, I–III; art. 11 |
| sim-dig-02 | Consentimento e obrigação legal | ADM-64b / lgpd-adm64b-s04 | D | LGPD, arts. 6º, 7º, II, e 23 |
| sim-dig-03 | Dados pessoais sensíveis | ADM-64b / lgpd-adm64b-s03 | A | LGPD, art. 5º, I–II, e art. 11 |
| sim-dig-04 | Decisão exclusivamente automatizada | ADM-64b / lgpd-adm64b-s09 | C | LGPD, art. 20, caput e § 1º, redação da Lei 13.853/2019 |
| sim-dig-05 | Empresa estatal e regime de tratamento | ADM-64b / lgpd-adm64b-s06 | E | LGPD, art. 24, caput e parágrafo único |
| sim-dig-06 | Compartilhamento entre órgãos | ADM-64b / lgpd-adm64b-s06 | B | LGPD, art. 26, caput, e art. 6º |
| sim-dig-07 | Controlador e operador | ADM-64b / lgpd-adm64b-s03 | D | LGPD, art. 5º, V–VII |
| sim-dig-08 | Segurança desde a concepção | ADM-64b / lgpd-adm64b-s11 | A | LGPD, art. 46, caput e § 2º |
| sim-amb-01 | Administrar e legislar | AMB-03 / amb-03-s05 | C | CF, arts. 23, VI–VII, e 24, VI–VIII e §§ 1º–4º |
| sim-amb-02 | Lei federal superveniente | AMB-03 / amb-03-s05 | E | CF, art. 24, §§ 3º–4º |
| sim-amb-03 | Auxílio ou substituição | AMB-03 / amb-03-s06 | B | LC 140/2011, art. 2º, II–III |
| sim-amb-04 | Um ente licenciador | AMB-03 / amb-03-s06 | D | LC 140/2011, art. 13, caput e § 1º |
| sim-amb-05 | Instrumentos de cooperação | AMB-03 / amb-03-s06 | A | LC 140/2011, art. 4º, I–II |
| sim-amb-06 | Proteção diante de degradação iminente | AMB-03 / amb-03-s07 | C | LC 140/2011, art. 17, § 2º; escopo restrito às medidas urgentes |
| sim-amb-07 | Normas gerais e suplementação | AMB-03 / amb-03-s05 | E | CF, art. 24, VI–VIII e §§ 1º–2º |
| sim-amb-08 | Licenciamento como procedimento | AMB-03 / amb-03-s06 | B | LC 140/2011, art. 2º, I |
| sim-adm-01 | Concurso para emprego público | ADM-54 / adm-54-s06 | D | CF, art. 37, caput e II |
| sim-adm-02 | Função de confiança | ADM-54 / adm-54-s09 | A | CF, art. 37, V |
| sim-adm-03 | Atribuições dos cargos em comissão | ADM-54 / adm-54-s09 | E | CF, art. 37, V |
| sim-adm-04 | Contratação temporária | ADM-54 / adm-54-s10 | B | CF, art. 37, IX |
| sim-adm-05 | Acumulação com magistério após a EC 138 | ADM-54 / adm-54-s12 | C | CF, art. 37, XVI, caput e alínea b, redação da EC 138/2025; EC 138/2025, arts. 1º–2º; publicada no DOU em 22/12/2025 |
| sim-adm-06 | Reserva legal remuneratória | ADM-54 / adm-54-s12 | E | CF, art. 37, caput e X |
| sim-adm-07 | Prazo de validade do concurso | ADM-54 / adm-54-s06 | A | CF, art. 37, III |
| sim-adm-08 | Acumulação em empregos de estatais | ADM-54 / adm-54-s12 | D | CF, art. 37, XVI–XVII |

## Preservação e validação

Não houve mudança no motor, interface ou estilos do simulado durante 002. A edição nova preserva snapshots antigos, gabarito e resultado: um fixture real da edição 1.0 extraído do HEAD de 001 permite verificar que iniciar uma sessão 1.1 não reescreve a anterior. Capítulos, 51 cartões históricos, suas agendas e os demais percursos ficam preservados. A quantidade permanece limitada a itens disponíveis e não é completada com repetições artificiais.

A suíte Node passou de dez para doze cenários, acrescentando a edição histórica real e o limite de oitenta sessões sem descarte automático. Os demais cenários verificam seleção mista/novas/dificuldades, confiança, correção, omissões, resposta exatamente no prazo, modo Estudo com bloqueio após revelar, preservação de outras chaves, importação com conflitos e sessão ativa, quota, corrupção e concorrência, além de suspensão por alteração de fontes/seções. Os 45 comandos do job de integridade Node passaram localmente, incluindo compilação idempotente e regressões do Método, backup e cartões.

A jornada Chromium foi ampliada para verificar todos os atalhos 5/7, 10/12 e 15/20, personalizado de quatro, primeiros três fundamentos, download real do roteiro, arquivo JSON real, conflito de mesmo ID, UTF-8 inválido, arquivamento com download seguido de confirmação, reimportação e recorte de oito quando se solicitam quinze. Mantém quatro larguras (320, 390, 768 e 1280), recarga sem renovar prazo, seção profunda, encerramento expirado sem duplicação e cenários adversariais de armazenamento. A jornada nova prevê 22 varreduras axe; seu resultado efetivo e inconclusivos precisam ser examinados no artefato do HEAD final.

A CI de produção passa a executar a mesma jornada de simulados na URL publicada e guardar seu relatório em `agu-work01-publicado`. O verificador de publicação por hash inclui o banco, motor, interface e CSS novos, além de HTML, capítulos e recursos que já conferia. A execução da CI sobre a PR não substitui essa conferência após o merge.

Este arquivo acompanha a preparação do commit de revisão e **não antecipa o sucesso da CI, merge ou implantação**. O fechamento factual na descrição da PR #82 deve registrar HEAD final, CI e artefato examinados, inconclusivos, merge, implantação nativa Pages, hashes remotos e jornada publicada efetivamente observados. Se algum critério falhar, não declarar publicação concluída. Não criar commit exclusivamente para carimbar resultados de seu próprio CI.

## Limites e continuidade

O backup geral ainda não inclui simulados; exportação/importação próprias continuam visíveis. Comparação de bytes em Web Storage não equivale a transação entre abas. Não houve Android físico ou TalkBack. Dados sintéticos de QA não foram transformados em horas, domínio, agenda ou Caderno pessoal. Questões autorais e aprovação assistida não se apresentam como prova oficial ou certificação integral.

A montagem de sessões, correção, cartões dos fundamentos e roteiro são automáticos. Não há geração de novas proposições jurídicas por IA em segundo plano. Quatro paráfrases históricas já públicas continuam no Leitor; nenhum banco de provas privado foi incorporado. A expansão histórica permanece a lacuna concreta.

A próxima execução está delimitada integralmente em `docs/PROMPT_SIMULADOS-AGU-003.md`: pequena amostra pública verificável, distinguindo item histórico/gabarito/anulação de eventual adaptação atual, com vínculos reais e aproveitamento do pipeline de cartões existente. **Não executar 003 durante este fechamento.**

## Complemento da conferência pública

A PR #82 foi integrada em `ed773f49f7132bb189ab10161d9b150e7437a52c`, após CI `45272721876` aprovada no HEAD `f0930ac257898ceb139a11c2e0d0dad8a3475254`. O artefato `14865773287`, SHA-256 `7c656fcdebf88f9c54fd256df99cea99d8324b8abab2da9c010e43232e32a4f9`, confirmou 22 varreduras do simulado sem violações ou inconclusivos. A implantação Pages `45273796684` concluiu com sucesso. A jornada manual pública confirmou entrada pelo Método, 15/20, confiança, recarga sem renovar tempo, correção, prioridade para erro de alta confiança e cartão.

Essa conferência encontrou um defeito adicional: o link indicava `lgpd-adm64b-s09`, mas o leitor descartava `secao` e abria Página 1. O teste anterior só exigia que o capítulo tivesse seções renderizadas, sem conferir o destino escolhido. A etapa 002 continua na branch complementar `fix/simulados-agu-002-secao`, com correção restrita no leitor e regressão exigindo seção, foco, posição, recarga, navegação seguinte e recusa de seção inválida/de outro livro. Não declarar a aceitação final apenas pelo primeiro merge. O fechamento factual da PR #82 deve apontar a PR complementar e sua CI/implantação efetivamente verificadas.
