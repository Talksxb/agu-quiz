# AGU Quiz — Sprint 11 | Planejamento Semanal Automático

**Data:** 2026-11-11
**Situação:** MVP implementado e publicado na branch main do repositório público. Validação em navegador Android/desktop pendente.

## Diagnóstico de entrada
- Aplicativo: `Talksxb/agu-quiz`, HTML estático no GitHub Pages.
- Fontes operacionais locais: sessões confirmadas, respostas, estados de tópicos, Caderno e revisões, com revisão específica no arquivo `revisao-inteligente.js`.
- Matriz auditada: `Talksxb/agu-auditoria/data/AGU_MATRIZ_CURRICULAR_2022_v3.json`: **412 identificadores, 14 disciplinas**; fonte privada não modificada. Consulta realizada; certificação documental integral não concluída.
- Protocolo: `docs/PROTOCOLO.md`; checkpoint: `checkpoints/estado.json`; nenhum alterado.

## Entrega
- **Criado:** `planejamento-semanal.js` — motor do planejamento, persistência e interface.
- **Alterado:** `index.html` — carregamento do motor, menu **Planejamento**, integração da fonte de dados local existente.
- Cronograma semanal de segunda a domingo, com tempo semanal configurável; inicial de **13h** como hipótese editável, sem registro automático de tempo efetivo.
- Alocação automática orientada por revisões vencidas, erros e continuidade; matérias iniciadas aparecem primeiro, sem excluir a rotação pelas demais.
- Tarefas de aula, revisão ativa (até 8 minutos por dia de estudo) e questões, respeitando o orçamento diário.
- Marcação de tarefas, alteração da disciplina e mudança de dia quando existir capacidade. Regeneração explícita; confirmação antes de substituir alterações manuais.
- Armazenamento local isolado: `agu_quiz_planejamento_semanal_v1`. As chaves legadas `agu_quiz_mvp1_2026` e `agu_quiz_revisao_inteligente_v1` são preservadas.
- Exportação de plano JSON; importação aditiva apenas de semanas ainda inexistentes, sem sobrescrever semanas.
- Recomendação da próxima tarefa sem inferir aulas concluídas de métricas ausentes.

## Testes executados
**20/20 aprovados** em ambiente simulado: sintaxe do motor, aplicativo legado e revisão; sete dias; disponibilidade inicial de 780 minutos; priorização por dificuldades reais; reserva diária de revisão; dia livre; tarefas válidas; conclusão persistente; restauração de semana; ajuste manual; validação de ID; rejeição de excesso de capacidade; integridade dos dois históricos antigos; chave independente; renderização do plano; navegação e carregamento do motor; regeneração isolada.

Correção subsequente: a rotação agora intercala matérias ainda não iniciadas em vez de manter a semana restrita apenas às matérias iniciadas.

## Limites conhecidos
1. Persistência apenas **no mesmo navegador/dispositivo**. Não há autenticação ou sincronização entre celulares e desktops.
2. Os 412 IDs pertencem ao repositório de auditoria, mas a interface ainda usa um **mapa operacional de assuntos provisório**, não a matriz curricular integral integrada automaticamente. A rotina não deve alegar cobertura certificada.
3. A revisão programada aqui é uma tarefa de estudo; não marca como respondidos os flashcards nem as questões até que sejam realmente feitos nos respectivos módulos.
4. A tarefa concluída não adiciona horas de estudo automaticamente: apenas sessões confirmadas compõem o tempo líquido.
5. O algoritmo usa dificuldade com base em dados locais disponíveis; não lê diretamente a automação externa **Foco do Dia**, e não gera notificações adicionais.
6. O plano da semana é salvo na primeira visita; horários semanais posteriores não reescrevem silenciosamente as tarefas já existentes.
7. Não foi possível executar teste E2E em dispositivo físico Android nem garantir que o GitHub Pages concluiu o deploy até o momento do checkpoint.

## Critérios de aceite
- [x] Cronograma sete dias
- [x] Priorizar dificuldades e revisões locais
- [x] Considerar sessões, erros e continuidade local
- [x] Configuração editável de minutos por dia
- [x] Ajuste manual e preservação do plano
- [x] Armazenamento local separado
- [x] Exibir próxima tarefa
- [x] Testes automatizados locais
- [ ] Validação visual e persistência após fechar/reabrir no Android
- [ ] Sincronização protegida para múltiplos dispositivos (etapa posterior)

## Próxima sprint
Sprint 12 — Foco do Dia integrado: consumir plano local para compor missão diária (aula + revisão + questões), marcando conclusão somente quando vinculada à execução real e sem duplicar automações existentes.
