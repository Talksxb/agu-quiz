# AGU QUIZ | WORK — UX-BARALHOS-02

## Próxima sprint: seleção orientada, progressão e integração conservadora ao cronograma

**Não executar antes de nova solicitação. Execute exclusivamente UX-BARALHOS-02 quando autorizada.** A UX-BARALHOS-01 é predecessora. Não criar flashcards, importar legislação, alterar gabaritos, modificar a matriz curricular, acrescentar autenticação, backend ou uma segunda lista de Caderno. Não iniciar UX-BARALHOS-03.

### 1. Repositórios e fontes

- Código público e fonte principal: <https://github.com/Talksxb/agu-quiz>.
- Aplicação publicada: <https://talksxb.github.io/agu-quiz/>.
- Auditoria privada (somente leitura quando indispensável e autorizada): <https://github.com/Talksxb/agu-auditoria>.
- Checkpoint obrigatório UX01: `docs/CHECKPOINT_UX-BARALHOS-01_2026-11-15.md`. Ler também `docs/CHECKPOINT_FLASHCARDS_APROFUNDADOS_2026-11-12.md`, os checkpoints LEG-06/07/08, `docs/PROMPT_UX-BARALHOS-02.md` e os módulos `revisao-inteligente.js`, `catalogo-disciplinas.js`, `baralhos-ux.css`, `planejamento-semanal.js`, `estudo-integrado.js`, `leitor-juridico.js`, `backup-local-s20.js`, `meu-estudo.js` e os testes relacionados.

### 2. Reconhecimento obrigatório, antes de editar

1. Confirmar o HEAD atual da `main`, branches, PRs abertas e checagens do último merge. Conferir se UX-BARALHOS-01 foi realmente mesclada, publicada e verificada por HTTPS; se estiver somente em PR, não presumir produção.
2. Verificar mudanças concorrentes LEG-09 e posteriores; conciliar sem sobrescrever o caderno físico, a revisão programada nem o Estudo Integrado.
3. Contar **novamente** flashcards e baralhos reais. O snapshot inicial da UX01 era 36 cartões em seis baralhos, não uma garantia permanente. Preservar todos os IDs, histórico, estágio, agenda, fontes e proveniência.
4. Consultar os resultados e capturas do workflow, em especial `tests/ux-baralhos-01-browser.cjs` e as suítes anteriores, e mapear falhas reais antes de propostas visuais.
5. Confirmar se existe integração formal GitHub ↔ GPT Sites (código/configuração explícitos); não supor sincronização. GitHub segue como repositório principal salvo decisão expressa.

### 3. Escopo proposto da UX02 — condicionado a evidências

Melhorar a seleção de cartões e o acompanhamento da progressão, com integração opcional e **não disruptiva** ao planejamento semanal. Priorizar Android/mobile, cinco larguras 320/360/390/430/1280 CSS px e teclado/screen reader.

**A. Seleção:** aprimorar filtros combinados e estados vazios; distinguir explicitamente “todos”, “somente vencidos”, “inéditos”, “continuar sessão” e dificuldade **documentada**. Se uma sessão foi interrompida e o estudante deseja iniciar outro subconjunto do mesmo assunto, oferecer escolha explícita de continuar ou recomeçar, sem apagar as tentativas históricas. Não inventar pesos para priorização nem duplicar cartões em coleções falsas. Cuidar do caso de um único cartão por assunto.

**B. Progressão:** distinguir “já visto no histórico”, “avaliado nesta sessão”, “vence hoje”, “vencido” e “futuro”. Exibir resultados em termos verificáveis a partir de `AGUReview.reviewInfo`, `attemptsInfo`, `deckSession` e estruturas legadas, sem tratar taxa de abertura como domínio. Uma revisão fácil ou difícil deve continuar a aplicar os intervalos reais D+1/D+7/D+21/D+45, sem alterações silenciosas. Reavaliar acessibilidade da retomada após reload, troca de modo, importação de backup e histórico extenso.

**C. Cronograma:** inspecionar o contrato de `AGUPlanner` e `AGUHome` antes de integrar. Se houver identificação curricular explícita e compatível, permitir um **atalho** do planejamento para abrir a seleção correta de cartões, sem criar novo agendamento. Não aumentar minutos registrados, marcar atividades como realizadas nem disparar autoavaliação pela simples navegação. Se a integração exigir migração do planejamento ou mudança de critérios pedagógicos, documentar bloqueio e pedir decisão específica.

**D. Caderno físico:** preservar a API única `AGULegal` / LEG-07 e recuperação LEG-08. Investigar se cartões existentes possuem `deviceId` literalmente documentado e verificável; somente esses poderiam ganhar uma ação contextual direta ao dispositivo. Não inferir granularidade pelo número de artigo, URL ou título aproximado; sem evidência, manter o botão “abrir leitor” e marcar manualmente.

**E. Dificuldade e recorrência:** `level` cognitivo original 2/3/4 do lote AUD03 **não equivale** automaticamente à nova taxonomia “Fundamentos / Distinções / Aplicação avançada”. Os outros cartões podem estar sem nível. Qualquer mapeamento precisa de regra pedagógica validada em sprint própria e não deve reescrever metadados jurídico-curriculares. `AGUDisciplines.verifiedFrequency(payload,topic)` é interface opcional, sem dados carregados nem ranking: a investigação AUD02-FREQ-01 pode continuar pendente. Não publicar dados privados ou “alta incidência” presumida.

### 4. Restrições inegociáveis

- Preserve os 412 IDs da matriz e nunca publique ou altere a matriz privada.
- Nenhuma geração automática de cartões, questões, fontes oficiais ou comentários jurídicos.
- Não promova `confirmado_pontualmente` a `certificado_integralmente`; não chame flashcard autoral de questão oficial Cebraspe.
- Preserve as nove categorias e os limites anteriores de backup, o campo opcional `librarySession`, a restauração não destrutiva e os modos legados de revisão, questões e Estudo Integrado.
- Não apague nem migre dados pessoais; testes só com perfil isolado e dados sintéticos. Nunca usar histórico do navegador do estudante.
- Não modificar indiscriminadamente as telas fora da biblioteca, nem substituir revisão espaçada por outro motor.
- Não modificar GPT Sites, sem pedido expresso. Nenhum backend, analytics, login ou sincronização oculta.
- Preservar fixtures históricos; mudanças autorizadas nos arquivos devem ganhar deltas novos encadeados, acompanhados de teste.

### 5. Testes e critérios de aceite

1. Executar todas as suítes Node anteriores e novas e as jornadas Chromium em 320, 360, 390, 430, 1280; CI, axe, teclado, foco, movimento reduzido, overflow e recarga.
2. Testar seleção por disciplina/assunto/dificuldade/estado, conjunto de 1 e de vários cartões, início, pausa, retomada, troca deliberada de subconjunto e resumo.
3. Verificar tentativa única por avaliação, nenhum acerto por abertura, agenda original preservada, histórico individual e ausência de duplicação ao retroceder.
4. Testar backup S20 e módulo de revisão, inclusive restauração em categoria ausente, importação parcial não destrutiva, registros anteriores à UX01, notas LEG07 e cronograma semanal.
5. Verificar leitor legislativo, questões oficiais, Estudo Integrado, WORK, Pages HTTPS e regressões LEG, sem alegar teste em Android real/TalkBack não executado.
6. Não integrar se falharem testes de privacidade, backup, revisão ou funcionalidade. A PR poderá permanecer em rascunho até haver evidência suficiente.

### 6. Publicação e handoff

Criar branch própria `ux/baralhos-02`, PR e CI; mesclar apenas após critérios e regras de proteção. Confirmar Pages pelo HTML e hashes dos assets, diferenciação PR/produção e eventual evidência comprovada de GPT Sites. Registrar quantidade **real** de cartões/baralhos, HEADs, branch, commits, PR, cobertura, testes e limites remanescentes. Criar `docs/PROMPT_UX-BARALHOS-03.md` autossuficiente conforme problemas efetivos, **sem executar UX-BARALHOS-03**. Encerrar após uma única sprint.
