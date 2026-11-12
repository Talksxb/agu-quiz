# AGU Quiz | Sprint 12 — Banco Inteligente, lote AUD03-001

**Execução:** 2026-11-12 · **estado:** implementado na branch `main`, testes automatizados locais aprovados; testes reais no Android/desktop pendentes.

## Diagnóstico obrigatório
- `Talksxb/agu-quiz`: GitHub Pages estático, `index.html`, `revisao-inteligente.js`, `planejamento-semanal.js`; histórico de respostas e revisões em `agu_quiz_revisao_inteligente_v1`.
- `Talksxb/agu-auditoria`: `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `checkpoints/AUD03-003.json`, `data/AGU_MATRIZ_CURRICULAR_2022_v3.json`, fontes de evidência normativa por lote.
- `data/AGU_MATRIZ_CURRICULAR_CONSOLIDADA_TRABALHO.json`: identificada no repositório e referenciada pelo checkpoint; conteúdo integral não foi utilizado para derivar os cartões, porque a leitura não foi concluída corretamente pela ferramenta. A correspondência de IDs foi conferida pela matriz v3.
- Auditoria 03: AUD03-003 registra 92 lotes normativos integrados; 292/412 IDs com alguma evidência, 120 sem evidência; 0/412 certificados integralmente. 284 registros de questão, 257 chaves únicas, com conflitos/duplicações pendentes. Não presumir que questões oficiais já estejam juridicamente comentadas.
- A matriz v3 foi apenas lida; SHA `0952205a07818cda0a9ccca6dacdf340afcc6db8`, 412 IDs únicos em 14 disciplinas; não modificada.

## Reuso documental comprovado
| Lote normativo integrado | ID | Principais dispositivos aproveitados | Status de uso |
|---|---|---|---|
| NORM-ADM-002 | ADM-06 | Lei 9.784/1999 arts. 13, 14 e 17; CF art. 84, parágrafo único | confirmação normativa pontual |
| NORM-ADM-005 | ADM-13 | DL 200/1967 arts. 19, 20 e 26; Lei 13.848/2019 art. 3º | confirmação normativa pontual |
| NORM-ADM-008 | ADM-23 | Lei 4.717/1965 art. 2º; Lei 9.784/1999 arts. 50 e 55 | confirmação normativa pontual |
| NORM-PC-001 | PC-03 | CPC arts. 4º, 12 e 15 | confirmação normativa pontual |
| NORM-CON-017 | CON-50 | CF art. 131; LC 73/1993 art. 12 | confirmação normativa pontual |

Os registros `status=confirmado` dos lotes são **evidências individuais**, não certificações da matéria nem homologações jurisprudenciais completas. As fontes legais oficiais e respectivos localizadores constam dos cartões. Verificação web pontual adicional: Lei 9.784 art. 17, CPC art. 12 e DL 200 arts. 19/20/26.

## Entregas publicadas
1. **Novo** `dados/flashcards-aud03-lote01.js`: 14 cartões autorais completos, IDs `aud03-flc-001` a `aud03-flc-014`, nível cognitivo 2–4, pergunta, resposta, exceção de prova, caso de aplicação, origem da evidência, URL oficial, versão e status.
2. **Alterado** `revisao-inteligente.js`: carregamento do lote externo, detecção de duplicatas, contagem atualizada (36 cartões = 22 anteriores + 14 novos), exibição de armadilha, aplicação e proveniência no verso, preservação do armazenamento e da avaliação D+1/D+7/D+21/D+45.
3. **Alterado** `index.html`: carrega o lote externo **antes** do módulo e atualiza a versão para evitar script antigo em cache.
4. **Migração controlada:** IDs estáveis `ri-pc-01`, `ri-pc-02`, `ri-pc-03` agora exibem classificação curricular `PC-03` (normas fundamentais) em vez de `PC-01` (teoria geral do processo). Tentativas antigas permanecem intactas, inclusive o campo histórico da época da tentativa.

## Inventário dos novos cartões
| Cartão | Currículo | Norma | Habilidade |
|---|---|---|---|
| aud03-flc-001 | ADM-06 | Lei 9.784/1999 art. 17 | regra supletiva de competência |
| aud03-flc-002 | ADM-06 | Lei 9.784/1999 arts. 13–14 | competência exclusiva e delegação |
| aud03-flc-003 | ADM-06 | CF art. 84 p. único | delegação presidencial especial |
| aud03-flc-004 | ADM-13 | DL 200 arts. 19–20 | supervisão x hierarquia |
| aud03-flc-005 | ADM-13 | DL 200 art. 26 | preservação da autonomia |
| aud03-flc-006 | ADM-13 | Lei 13.848 art. 3º | autonomia de agências reguladoras |
| aud03-flc-007 | ADM-23 | Lei 4.717 art. 2º | inexistência de motivos x desvio de finalidade |
| aud03-flc-008 | ADM-23 | Lei 9.784 art. 50 §1º | motivação por referência |
| aud03-flc-009 | ADM-23 | Lei 9.784 art. 55 | requisitos de convalidação |
| aud03-flc-010 | PC-03 | CPC art. 12 | ordem cronológica preferencial |
| aud03-flc-011 | PC-03 | CPC art. 4º | satisfação e duração razoável |
| aud03-flc-012 | PC-03 | CPC art. 15 | aplicação supletiva e subsidiária |
| aud03-flc-013 | CON-50 | CF art. 131 | consultoria e representação da AGU |
| aud03-flc-014 | CON-50 | CF art. 131 §3º | PGFN e execução de dívida ativa tributária |

## Testes executados
**19/19** testes funcionais simulados e estruturais (sintaxe de quatro scripts, leitura dos 14 cartões, acervo total de 36, preservação das 23 referências oficiais anteriores, unicidade, URLs oficiais, rastreabilidade, frente/verso, persistência de tentativa, agendamento D+1 e manutenção das chaves legadas, carregamento em ordem e persistência após nova inicialização em memória). **7/7** verificações adicionais de rastreabilidade, níveis de conteúdo, classificação e migração. Nenhum teste real de toque no Android, execução visual E2E ou confirmação de publicação em GitHub Pages foi realizado.

## Limites e pendências
- **Nenhuma nova questão literal do Cebraspe foi integrada nesta Sprint.** O lote contém cartões autorais de recuperação ativa derivados de temas de auditoria, sem reivindicar transcrição de itens específicos de provas ou correção de gabaritos novos.
- O estado jurídico é confirmação documental **pontual**; faltam revisão de vigência exaustiva, jurisprudência e avaliação humana independente.
- O catálogo de questões oficiais anterior permanece parcial, com apenas um item preparado para pontuação automática e fundamento pontual. Os demais itens requerem enunciados/adaptações revisados e justificativa jurídica individual.
- A fila prioriza cartões inéditos/verificados; não transforma acertos em "Domínio demonstrado".
- Persistência somente no navegador. A matriz v3 não é disponibilizada publicamente.
- Importação do estado da `MATRIZ_CURRICULAR_CONSOLIDADA_TRABALHO` não foi necessária para estes IDs, mas conferir em novo lote quando a leitura íntegra estiver disponível.
- Registros antigos de resposta `ri-pc-` retêm o `code` original gravado historicamente; novos eventos utilizam `PC-03`. Uma migração de relatório de dados históricos exige decisão separada.

## Próximo incremento técnico
AUD03-flc-lote02: auditar individualmente e comentar mais itens oficiais AGU 2015/2023, incluindo gabarito definitivo, enunciado original ou adaptação autoral marcada e dispositivo/jurisprudência vigente; validar com auditoria de questões e resolver duplicações/conflitos antes de habilitar correção automática. Testes E2E em Android e exportação/retorno de backup real também pendentes.
