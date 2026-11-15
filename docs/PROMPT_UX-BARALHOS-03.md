# AGU QUIZ | WORK — UX-BARALHOS-03

## Progressão verificável e ponte curricular documentada, sem inferir equivalências

**Executar exclusivamente UX-BARALHOS-03 somente mediante nova autorização.** Esta é apenas a preparação/handoff da UX02; não executar UX03 agora nem antecipar UX04. Não gerar flashcards, provas, gabaritos ou comentários, não importar legislação, não modificar os 412 IDs curriculares, não criar backend, autenticação, sync, analytics ou segundo caderno.

### 1. Fontes e reconhecimento obrigatório

- Repositório e fonte principal: <https://github.com/Talksxb/agu-quiz>; publicação: <https://talksxb.github.io/agu-quiz/>.
- Auditoria privada `Talksxb/agu-auditoria`: somente leitura e apenas se indispensável; não copiar evidências privadas ou alterar matriz. A investigação AUD02-FREQ-01 não deve ser presumida concluída, nem seu corpus bruto tratado como ranking de incidência.
- Ler antes de agir `docs/CHECKPOINT_UX-BARALHOS-01_2026-11-15.md`, `docs/CHECKPOINT_UX-BARALHOS-02_2026-11-15.md`, `docs/PROMPT_UX-BARALHOS-03.md`, checkpoints LEG-06–10 e os módulos `revisao-inteligente.js`, `baralhos-ux.css`, `catalogo-disciplinas.js`, `planejamento-semanal.js`, `meu-estudo.js`, `estudo-integrado.js`, `leitor-juridico.js`, `backup-local-s20.js`, `questoes-leitor-s18.js`, testes UX01/UX02/LEG10 e fixtures de preservação.
- Confirmar HEAD real da `main`, branches, PRs, merges e CI. Conferir se UX02 foi integrada e se HTML/JS/CSS correspondem aos hashes em HTTPS. Se UX02 estiver somente em PR, não confundir sua implementação com produção.
- Recontar cartões, baralhos, níveis, IDs e categorias de backup. A UX02 partiu de **36 cartões em 6 baralhos**, mas esse total não é uma garantia permanente. Revisar mudanças concorrentes LEG/WORK/cronograma sem sobrescrevê-las.
- Verificar por evidência explícita (e não por nome) se existe GPT Sites vinculado à aplicação. Nunca presumir sincronização GitHub ↔ Sites; não alterar integração sem pedido expresso.

### 2. Missão condicionada às lacunas comprovadas

**A. Progresso:** avaliar se a distinção UX02 entre inédito, vencido estrito, vencimento hoje, futuro, sem data, visto no histórico e avaliado na sessão é compreensível em Android, após reload e com grande histórico. Só melhorar textos/estados ou apresentação quando testes e evidências justificarem. Nenhuma taxa de abertura pode ser apresentada como domínio. Preservar `reviewInfo`, `attemptsInfo`, `deckSession`, notas e IDs.

**B. Integração curricular:** inspecionar `AGUPlanner` e `AGUHome`. A UX02 encontrou `ADM/Atos administrativos` e outras categorias amplas no planejamento, contra `ADM-06` e IDs granulares nos baralhos; **não existe ainda mapeamento autorizado e literal** que vincule cada tarefa a um baralho específico. Propor um contrato de ligação apenas para pares comprovados por metadados públicos/documentados; se dependente de alteração da matriz ou escolha pedagógica, registrar e pedir decisão em vez de inferir. Qualquer atalho permitido é **navegação**, nunca tarefa concluída, minutos estudados ou agenda adicional. Se nenhum par inequívoco existir, não criar atalho específico.

**C. Caderno:** preservar a lista única `forNotebook` das LEG07/08/09/10, inclusive pendências oriundas de questões oficiais verificadas. Apenas se houver `deviceId` granular e literalmente comprovado no próprio cartão, estudar possível ação contextual. Os 36 cartões da UX02 não possuíam tal dado. Sem comprovação, manter “abrir leitor” e escolha manual.

**D. Dificuldade e recorrência:** os 14 cartões AUD03 usavam nível **cognitivo original** 2/3/4 (7/6/1), e 22 não tinham nível. Não reclassificar como Fundamentos/Distinções/Aplicação Cebraspe sem regra validada em sprint pedagógica separada. `AGUDisciplines.verifiedFrequency()` é somente interface opcional; não exibir “alta incidência”, prioridade ou ranking sem estudo AUD02-FREQ validado e publicado com critérios explícitos.

**E. Robustez local:** testar troca deliberada de subconjuntos, interrupção/retomada, segunda avaliação somente em nova sessão, reestudo da seleção anterior, histórico antigo, importação parcial não destrutiva e backup S20 de nove categorias. Melhorias de UX não podem alterar D+1/D+7/D+21/D+45 nem o valor de `seen` por mera leitura. Se alteração exigir migração de dados, interromper e solicitar autorização específica.

### 3. Limites imutáveis

- Nenhum conteúdo jurídico inventado, card duplicado, ID curricular privado publicado, gabarito reescrito ou certificação integral inferida de conferência pontual.
- Não rotular cartões autorais como questões oficiais Cebraspe. Nenhuma ordenação baseada apenas em volume bruto de evidências AUD02.
- Não modificar planejamento semanal, exercícios oficiais, leitor ou caderno fora do escopo justificado por testes e um contrato provado. Evitar segundo mecanismo de revisão ou de anotações.
- Preservar todos os formatos/limites e nove categorias S20, comportamento de restauração ausente, importação parcial e histórico individual; não apagar nem migrar dados pessoais.
- Testar somente em navegadores isolados com perfis sintéticos, nunca no histórico pessoal do estudante.
- GitHub é a fonte do código; hospedagem deve permanecer estática, sem dependência exclusiva de GPT Sites.

### 4. Critérios de aceite, CI e entrega

1. Executar todas as suítes Node anteriores e novas, incluindo UX01 e UX02, sem alterar fixtures históricos; adicionar delta próprio se mudar hashes.
2. Validar Chromium nas larguras 320, 360, 390, 430 e 1280 CSS px: filtros, baralhos de um e vários cartões, sessão, progressão, foco/teclado, aria-live, reduced motion, ausência de overflow e axe em ao menos 390/1280. Declarar expressamente se Android físico/TalkBack não foi testado.
3. Verificar no navegador backup S20 e específico, preservação de agenda D+1/D+7/D+21/D+45, importação parcial, histórico anterior, notas LEG07–10, planejamento, exercícios oficiais, Estudo Integrado e WORK.
4. Criar branch `ux/baralhos-03`, PR e CI, sem force push; não mesclar se há conflito ou falha. Se integrada, confirmar deploy GitHub Pages, HTTPS, HTML, JS/CSS e hashes; se ainda em PR, não alegar produção.
5. Entregar checkpoint, resumo de HEADs/branch/commits/PR/arquivos/contagens/testes/publicação e `docs/PROMPT_UX-BARALHOS-04.md` **autossuficiente, somente como próximo handoff, sem executar UX04**. Encerrar após uma única sprint.
