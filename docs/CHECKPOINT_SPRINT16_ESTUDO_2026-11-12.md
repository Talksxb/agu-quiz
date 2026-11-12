# AGU Quiz — Sprint 16 | Estudo Jurídico Integrado
**Execução:** 2026-11-12 · **Estado:** implementação no GitHub confirmada por leitura posterior; testes locais simulados 41/41 aprovados. **Não ocorreu validação E2E real em Android ou GitHub Pages**.

## Diagnóstico e trilha documental
- Aplicativo: `docs/CHECKPOINT_SPRINT15_CADERNO_2026-11-12.md`; `index.html`, `leitor-juridico.js`, `caderno-contextual.js`, `revisao-inteligente.js`, `planejamento-semanal.js`, `dados/legislacao-s13.js`, `dados/relacoes-juridicas-s14.js`, `dados/flashcards-aud03-lote01.js`.
- Auditoria privada: `docs/PROTOCOLO.md`, `checkpoints/estado.json` e `checkpoints/AUD03-005.json`. Estado consultado: **AUD03-005, parcial não certificado**, data de corte documental 2026-11-04.
- Lotes relevantes reaproveitados **indiretamente**, através das relações e dos flashcards públicos das sprints 12–15: `NORM-ADM-002` (ADM-06), `NORM-CON-017` (CON-50, CON-51). Evidências individuais foram lidas novamente, mas nenhuma certificação ou atualização jurídica automática foi criada.
- A matriz privada não foi alterada, dados pessoais nunca foram publicados no repositório. O corpus continua restrito à CF arts. 131–132 e Lei 9.784/1999 arts. 11–15.

## Entregas publicadas
1. **Novo** `estudo-integrado.js`: motor de sessão por dispositivo (`agu_estudo_integrado_s16_v1`, schema `agu-integrated-study-v1`), com ID persistente, status, etapa, timestamps e referências aos IDs do Caderno, cartões e tentativas reais. Iniciar/retomar, mudar etapa e encerrar não registram tempo de estudo.
2. **Atualizado** `revisao-inteligente.js`: API `availableForTopic`, `focusCard`, `focusedHTML`, `reviewInfo` para recuperar cartões existentes, revelá-los e aplicar as mesmas avaliações Errei/Difícil/Lembrei/Fácil; aproveita o agendamento original D+1/D+7/D+21/D+45; no modo integrado a classificação gera **uma só tentativa e um só agendamento**, informando o ID ao motor de sessões, sem novo armazenamento paralelo de revisão.
3. **Atualizado** `leitor-juridico.js`: aba **Estudo integrado** no painel contextual, mantendo índice, texto normativo e a subdivisão selecionada; cinco etapas: leitura, Caderno, questões, flashcards, avaliação/revisão.
4. **Atualizado** `index.html`: carrega `estudo-integrado.js` depois dos dados jurídicos e do Caderno/Revisão e antes do Leitor; cache do script `revisao-inteligente.js` atualizado para garantir a nova API.

## Jornada executada em teste
`L9784:art13:II` → abrir dispositivo → iniciar sessão → selecionar Caderno → criar nota efetiva em `AGUCaderno` e associar seu ID → passar por questões (nenhuma questão completa vinculada ao inciso) → selecionar flashcard de `ADM-06`, **rotulado como associação temática, não granular** → mostrar verso → avaliar `Errei` → registrar uma tentativa em `agu_quiz_revisao_inteligente_v1` → criar vencimento no motor original → sessão passa para `revisao` e apresenta informações do agendamento → concluir/retomar conforme status. Sem segundos agendamentos e sem fictícios.

## Questões oficiais e controle de qualidade
- **0 novas questões oficiais** nesta sprint. `dados/relacoes-juridicas-s14.js` não possuía questões por dispositivo auditadas com número, gabarito definitivo, fundamentação histórica e atual reconciliados.
- A etapa Questões informa a lacuna explicitamente, sem atribuir itens oficiais de outras matérias a incisos.
- Flashcards aparecem por tópico curricular, com etiqueta clara de vinculação temática.
- Nenhum acerto/autodeclaração é convertido em "domínio demonstrado" ou certificação jurídica.
- O trabalho da Auditoria 03 segue parcial; vínculos e normas são verificações pontuais, não auditoria integral.

## Testes e resultados
**41/41 verificações automatizadas locais aprovadas** em execução JS simulada: sintaxe de 9 componentes (fontes, relações, cartões, Caderno, revisão, sessão, leitor, index e planejamento); 36 flashcards existentes; 7 artigos; aba e ordem de carregamento; abertura idempotente de sessão, preservação do dispositivo, etapas, anotação associada sem duplicação e rejeição de anotação de outro dispositivo; seleção dirigida de flashcard; verso oculto/revelado; uma tentativa de revisão efetiva; agendamento na chave original; notificação da sessão sem segunda tentativa; ausência de questão inventada; encerramento e retenção do histórico; persistência após reinicialização; integridade de chaves `agu_quiz_mvp1_2026` e `agu_quiz_planejamento_semanal_v1`.

**Não executados:** Playwright/DOM real, navegação física no Android, revisão de acessibilidade, conferência de propagação do GitHub Pages. A versão do script de revisão foi atualizada depois da bateria para contornar cache e a sintaxe do index foi revalidada na atualização.

## Privacidade e continuidade
- Dados de sessão apenas em `localStorage` do navegador, nova chave independente: `agu_estudo_integrado_s16_v1`.
- Armazena referências de IDs, não cópias de Caderno nem de respostas. A remoção posterior de uma nota do Caderno não apaga o ID registrado na sessão; exibição futura deve tratar referências órfãs com segurança.
- Não há autenticação, sincronização entre dispositivos ou métricas de tempo líquido inferidas.
- Backup próprio de sessões integradas não foi implementado; continuação da política de backups permanece pendente.

## Validação manual sugerida
Abrir https://talksxb.github.io/agu-quiz/ no Android → § Leitor Jurídico → Lei 9.784/1999 → Art. 13 → inciso II → Relacionados → **Estudo integrado** → Iniciar. Navegar Leitura → Caderno (criar/associar nota) → Questões (lacuna explicitada) → Flashcards → Mostrar verso → Errei → Revisão (ver vencimento). Fechar e reabrir no mesmo navegador para conferir persistência.

## Handoff para Sprint 17
Consolidar o Leitor Jurídico: busca unificada por termos/dispositivos, versões normativas e alterações históricas com fonte e data, filtros de evidência (confirmada/parcial/pendente), navegação e UI acessível/mobile, exportação/backup de sessões, relatórios coerentes com avaliações reais, robustez a referências órfãs e testes E2E. Não inventar vínculos nem assumir certificação integral. **Entregar novo checkpoint e prompt da sprint subsequente sem iniciar automaticamente.**
