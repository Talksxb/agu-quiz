# AGU QUIZ | WORK — UX-BARALHOS-04

## Handoff autossuficiente — validação móvel e decisões curriculares explícitas

**Não executar a UX-BARALHOS-04 durante o fechamento da UX03.** Exigir nova autorização expressa, realizar uma única sprint, não antecipar UX05. Nenhuma geração de cartões, provas, gabaritos, comentários jurídicos ou legislação; não alterar matriz de 412 IDs, status de auditoria, certificação, prazos de revisão ou dados pessoais. Não introduzir servidor, login, sync, GPT Sites, analytics, segunda lista de Caderno ou mecanismo novo de revisão.

## 1. Fonte e retomada obrigatória

- Repositório público principal: https://github.com/Talksxb/agu-quiz
- Publicação estática: https://talksxb.github.io/agu-quiz/
- Auditoria privada `Talksxb/agu-auditoria`: somente leitura se absolutamente indispensável e autorizada; nunca copiar arquivos privados, estatísticas provisórias ou evidências.
- Ler integralmente `docs/CHECKPOINT_UX-BARALHOS-01_2026-11-15.md`, `docs/CHECKPOINT_UX-BARALHOS-02_2026-11-15.md`, `docs/CHECKPOINT_UX-BARALHOS-03_2026-11-15.md`, `docs/PROMPT_UX-BARALHOS-04.md`, os checkpoints LEG07–10 e o checkpoint efetivo da LEG11 **se esta já tiver sido integrada**. Ler `revisao-inteligente.js`, `baralhos-ux.css`, `catalogo-disciplinas.js`, `planejamento-semanal.js`, `meu-estudo.js`, `estudo-integrado.js`, `leitor-juridico.js`, `backup-local-s20.js`, `questoes-leitor-s18.js` e testes UX01–03/LEG10–11 existentes.
- Confirmar HEAD de `main`, branches, PRs abertas, status de merge, workflows e publicação HTTPS com SHA-256; não presumir que PR equivale a produção. A UX03 partiu do merge UX02 `a1fb2ca82f2985bda1a29d690dc52267fa3f994a` e foi reconciliada com a LEG11 mesclada em `f28a9c16e0a9d26032ca6a8fb210cb46fd4b774f`; ambos os SHAs são históricos. A PR #23 LEG11 deixou de ser concorrente em 15/11/2026: reconfirmar o estado atual, sem sobrescrever notas, backup ou fixtures.
- Recontar cartões, baralhos, disciplinas, níveis, IDs e nove categorias S20. Snapshot UX03: **36 cartões, seis baralhos** (`ADM-06` 12, `ADM-13` 4, `ADM-23` 4, `CON-02` 2, `CON-50` 4, `PC-03` 10), 14 níveis originais documentados (2:7; 3:6; 4:1), 22 sem nível. Não fixar essas quantidades se novas sprints pedagógicas as tiverem alterado legitimamente.

## 2. Estado funcional que deve ser preservado

1. A UX01 criou biblioteca e sessões contínuas com `librarySession` opcional dentro de `agu-review-v1`, sem nova chave. A UX02 criou filtros combinados, estados `ineditos`, `vencidos`, `hoje`, `futuros`, `sem_data`, `pendentes`, escolha consciente para trocar subconjunto, resumo de Errei/Difícil/Lembrei/Fácil e reestudo. Revisão espaçada original D+1/D+7/D+21/D+45; avaliação única por cartão e sessão.
2. A UX03 corrigiu uma ambiguidade concreta: importação parcial pode trazer tentativas históricas, mas deliberadamente não altera `cards[id].seen`/`due`. A biblioteca agora distingue “avaliado sem agenda local” de “inédito” por índice derivado de `attempts`, sem criar vencimento, migrar dados ou contar mera abertura. `AGUReview.exactDeck(topic)` oferece somente igualdade literal com ID de baralho real.
3. `AGUPlanner` trabalha com IDs amplos no formato `ADM/Atos administrativos`, enquanto os baralhos têm IDs granulares como `ADM-06`. **Não há ainda uma tabela autorizada** para conversão de todos os pares. `AGUHome` usa categorias amplas e atalhos de leitor distintos de flashcards. Se não houver metadado literal de ligação, manter a seleção manual, sem atalho temático inventado. Nenhum `change`, `ensure`, `next` ou contador de minutos pode ser invocado como efeito de navegar para baralho.
4. A lista física única `forNotebook` da LEG07/08/09/10 permanece na categoria `agu_leitor_juridico_s13_v1`. A LEG11 pode acrescentar origem `flashcard_existente` se comprovadamente integrada: nesse caso, preservar rigorosamente sua validação e histórico, sem criar outra lista nem transformar `topic` em `deviceId`. De outro modo, manter somente o caminho original para o leitor. Nunca inferir dispositivo de texto, URL ou tema.
5. Nenhum cartão autoral recebe selo “questão oficial Cebraspe”. Os `level` cognitivos 2/3/4 não foram mapeados à taxonomia pedagógica 1–3. `AGUDisciplines.verifiedFrequency()` não contém classificação publicada; AUD02-FREQ não deve ser confundida com ranking definitivo.
6. Nove categorias de backup S20, limite 12 MB UTF-8, restauração apenas de categorias ausentes; importador parcial da revisão limita a 3 MB e só incorpora tentativas sem substituir agenda. Sem sincronização entre dispositivos/navegadores; código principal no GitHub, hospedagem estática no Pages. Ausência de configuração visível GitHub ↔ GPT Sites não autoriza presumir integração.

## 3. Missão condicionada a evidência nova

**A. Usabilidade Android real e acessibilidade.** Priorizar teste em aparelho Android ou perfil independente genuíno se disponibilizado; não simular TalkBack físico nem afirmar sua execução. Verificar com usuário se as distinções “vencidos antes de hoje”, “vencem hoje”, “sem agenda local”, “avaliado nesta sessão” e “histórico” são compreensíveis em 320–430 px. Alterar rótulos/estados apenas mediante falha observada, sem converter abertura em acerto. Se não houver Android físico, registrar explicitamente a limitação e conservar a suíte Chromium como substituto **parcial**, não equivalente.

**B. Ponte curricular.** Inventariar somente metadados públicos literalmente verificáveis que relacionem tarefa granular a um código exato de baralho. O contrato de comparação `AGUReview.exactDeck` pode fundamentar um atalho quando a própria tarefa usar o ID granular comprovado; não gerar tabela `ADM/Atos administrativos → ADM-06` por aproximação. Se exigir alteração da matriz ou decisão pedagógica, parar essa subfrente e apresentar proposta para autorização específica. Navegação nunca marca tarefa, minutos, agenda ou domínio.

**C. Conciliação LEG11 e regressões.** Se a LEG11 estiver integrada, testar a origem `flashcard_existente` com histórico importado, abas únicas, marcação voluntária, restauração S20 e ausência de segunda nota automática. Se ainda estiver somente em PR, registrar dependência e evitar cópia paralela. Não reescrever a LEG11 sem defeito demonstrado.

**D. Estados adversariais.** Reavaliar importação parcial com histórico longo, tentativas antigas e agendas ausentes, sessões interrompidas durante reload, conclusão/repetição e backup de categoria ausente. Revisão continua com apenas um rating por cartão/sessão e `DAYS=[1,7,21,45]`. Qualquer migração ou nova forma de sincronizar exige autorização específica antes de implementar.

**E. Classificação e recorrência.** Não criar equivalência `level` cognitivo→nível pedagógico sem validação própria. Não publicar ou usar rankings de AUD02-FREQ sem pesquisa estatística, saneamento editorial e status verificável. Não ordenar baralhos por contagem bruta de provas.

## 4. Testes e aceite

- Executar integralmente todas as suítes Node existentes, sem apagar fixtures anteriores. Se mudar `revisao-inteligente.js`, `index.html`, CSS ou outro asset protegido, criar um **novo** delta encadeado ao último fixture comprovado e atualizar somente assertivas de hash/versão que realmente mudaram.
- Executar Chromium real em **320, 360, 390, 430, 1280 CSS px**, em contextos novos sintéticos; filtros, escolha de um e múltiplos cartões, status de importação, leitura frente/verso, teclado Enter/Espaço, foco, aria-live, `prefers-reduced-motion`, overflow, recarga, pausa, troca de subconjunto, conclusão, reestudo e axe em ao menos 390/1280, distinguindo violações, itens inconclusivos e aprovações.
- Confirmar que só avaliação explícita gera tentativa/agendamento; que ratings já dados na mesma sessão não duplicam; que `seen`, stage e due de perfis antigos não mudam por filtro/reload; que backup S20 mantém nove categorias e restauração não destrutiva; que leitor, questões oficiais, sessões integradas, plano, WORK e LEG continuam válidos.
- CI de PR deve estar verde e sem conflitos antes do merge; se houver problema de backup, privacidade, revisão ou fonte jurídica, manter PR em rascunho. Depois de mesclar, verificar Pages por HTTPS e hashes de HTML/JS/CSS, incluindo teste de navegador da URL publicada. Não alegar produção se a entrega estiver apenas em PR.

## 5. Entrega e portão final

Criar branch própria `ux/baralhos-04`, PR documentada, checkpoint factual e `docs/PROMPT_UX-BARALHOS-05.md` autossuficiente apenas se a UX04 for autorizada e executada. Relatar HEAD inicial/final, concorrências, commits, PR/CI, assets, acervo real, testes, hashes publicados, limitações e próximas decisões que exigem autorização. **Nunca executar duas sprints no mesmo lote.**
