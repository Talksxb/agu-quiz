# AGU QUIZ | WORK — UX-BARALHOS-06

## Handoff autossuficiente — portão de evidência assistiva e ponte curricular explícita

**NÃO EXECUTAR na conclusão da UX05.** Exigir **nova autorização expressa** e executar exclusivamente UX-BARALHOS-06, uma sprint, sem antecipar UX07. Não fazer patch artificial para preencher sprint: se as condições abaixo não ocorrerem, registrar inspeção e concluir documentalmente. Não gerar flashcards, provas, gabaritos, comentários jurídicos ou importar legislação; preservar os **412 IDs** curriculares e o repositório privado de auditoria. Sem backend, login, sincronização, GPT Sites, analytics, segunda lista de caderno ou novo motor de revisão.

### 1. Fonte da verdade e reconhecimento

- Código público `https://github.com/Talksxb/agu-quiz`, publicação `https://talksxb.github.io/agu-quiz/`. Auditoria privada `Talksxb/agu-auditoria` **somente leitura se indispensável e expressamente autorizada**; não copiar matriz, fontes privadas, dados ou rankings provisórios.
- Ler integralmente `docs/CHECKPOINT_UX-BARALHOS-01_2026-11-15.md` até `docs/CHECKPOINT_UX-BARALHOS-05_2026-11-15.md`, `docs/PROMPT_UX-BARALHOS-06.md` e checkpoints LEG07–12, WORK01 e integrações concorrentes posteriores. Inspecionar `revisao-inteligente.js`, `catalogo-disciplinas.js`, `baralhos-ux.css`, `planejamento-semanal.js`, `meu-estudo.js`, `estudo-integrado.js`, `leitor-juridico.js`, `backup-local-s20.js`, `questoes-leitor-s18.js`, `index.html`, testes UX01–05, LEG10–12, fixtures e workflow.
- Antes de editar: confirmar `main`/HEAD, branches, PRs, conflitos, jobs e último merge; comparar GitHub Pages via HTTPS e SHA-256 de HTML, revisão, CSS e demais assets. Nunca equiparar PR à produção. A UX05 partiu de `c33716434b42a5656fa1fada62ba754f98b8c93d` (histórico a revalidar), após a LEG12, e adicionou apenas testes se nenhum defeito funcional foi confirmado. Conferir seu checkpoint e PR/CI definitivos.
- Recontar cartões, baralhos, níveis, disciplinas e categorias de backup, pois snapshots envelhecem. Referência UX05: **36 cartões em seis baralhos** (`ADM-06` 12, `ADM-13` 4, `ADM-23` 4, `CON-02` 2, `CON-50` 4, `PC-03` 10), **14 níveis originais** (2:7, 3:6, 4:1), **22 sem nível**; nove categorias S20. Verificar integração GitHub ↔ GPT Sites somente por configuração explícita; não presumir ou alterar.

### 2. Gatilhos que autorizam mudança

**A. Avaliação Android/TalkBack.** Prioridade real: acesso autorizado a **aparelho Android independente** ou ambiente genuinamente isolado que permita assistência real. Usar perfil sintético, sem histórico do estudante, e observar com usuário a compreensão de “vencidos antes de hoje”, “vencem hoje”, “inéditos”, “avaliados sem data local” e “histórico da sessão” nas larguras 320–430. Testar TalkBack apenas se realmente disponível, informando modelo, Android/versão e como foi executado; não confundir emulação Chromium com teste físico/assistivo. Só corrigir rótulo, foco, contraste ou navegação mediante defeito observado e reproduzido. Na ausência do aparelho, declarar limite e evitar reensaios idênticos sem novo dado.

**B. Contraste inconclusivo.** Reexaminar artefatos axe UX04/UX05 e LEG11 (incluindo `incomplete`, regras e alvos), com captura realmente aberta e avaliação manual quando disponível. Distinguir **violações** de **inconclusivos** e de **regras aprovadas**. Corrigir somente se o defeito visual/acessível tiver sido confirmado; jamais chamar zero violações automatizadas de certificação WCAG.

**C. Ponte currículo→baralho.** `AGUReview.exactDeck(topic)` aceita apenas igualdade literal com o ID granular público existente. `AGUPlanner` e `AGUHome` ainda usam tópicos amplos como `ADM/Atos administrativos`, sem equivalência demonstrada com `ADM-06`. Só permitir navegação contextual se a **própria tarefa real** passar a conter ID granular público documentado que seja exatamente o de um baralho. Sem par, manter seleção manual. Mapear títulos amplos ou usar estatística bruta exige decisão pedagógica **separada e autorizada**; não altere a matriz de 412 IDs. Navegação nunca marca tarefa concluída, minutos, agenda ou domínio.

**D. Robustez local e caderno.** Testes com perfil sintético e categorias ausentes: importação parcial de revisão até 3 MB (tentativas sem agenda), histórico longo, sessão interrompida, reload, troca consciente de subconjunto, uma avaliação por cartão por sessão e repetição somente em nova sessão. Preservar `cards[id].seen/stage/due`, `reviewInfo`, `attemptsInfo`, `librarySession`, D+1/7/21/45. Restaurar S20 apenas nove categorias ausentes, limite 12 MB UTF-8; sem substituição de notas. A Home LEG12 e LEG11 devem continuar usando uma única `forNotebook` com origens `leitor`, `estudo_integrado`, `questao_verificada`, `flashcard_existente`, sem duplicar nota ou inferir `deviceId` de tópico/texto.

**E. Recorrência e pedagogia.** Não mapear níveis cognitivos originais 2/3/4 para nova taxonomia pedagógica nem publicar `verifiedFrequency` como ranking sem estudo e vínculo **publicados e validados**. AUD02-FREQ provisória não basta. Flashcards autorais não são questões oficiais Cebraspe; confirmação pontual não é certificação integral.

### 3. Testes e segurança

- Preservar todas as suítes Node (referência pré-UX05: 29; UX05 acrescenta uma) e jornadas Chromium UX01–05, LEG, WORK, S20–35, sem apagar fixtures históricos. Em qualquer mudança de JS/HTML/CSS protegido, criar delta novo encadeado ao último fixture comprovado e atualizar somente expectativas necessárias.
- Chromium isolado nas larguras **320, 360, 390, 430, 1280** CSS px; filtros combinados, um/vários cartões, histórico antigo, Enter/Espaço, foco, `aria-live`, reduced motion, overflow, pausa/reload, agenda, exportação/importação e axe em 390/1280 com capturas. Regressões de leitor, questões oficiais, Estudo Integrado, plano, WORK, LEG07–12 e caderno único. Nunca usar o histórico real do estudante.
- Se falharem privacidade, fonte jurídica, revisão, backup, CI ou compatibilidade, **não mesclar** e manter PR em rascunho. Sem Android/TalkBack efetivo, não afirmar realização nem suposta equivalência.

### 4. Publicação e encerramento

- Em execução **autorizada**, criar branch `ux/baralhos-06`, PR e CI, sem force push. Mesclar somente quando checks e proteções estiverem satisfeitos. Se mesclada, confirmar Pages por HTTPS, HTML e SHA-256 dos assets e jornada diretamente no endpoint publicado. PR aberta ≠ produção.
- Registrar checkpoint factual com HEAD inicial/final, concorrências, quantidade real de cartões, alterações ou decisão de não alterar, PR/commits/CI, relatórios axe (inclusive inconclusivos), capturas inspecionadas, publicação, limites e aprovação pendente. Preparar **somente** `docs/PROMPT_UX-BARALHOS-07.md` como próximo handoff e **não executar UX07**. Encerrar após uma sprint.
