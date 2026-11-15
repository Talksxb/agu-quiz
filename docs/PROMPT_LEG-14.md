# AGU QUIZ | WORK — LEG-14
## Validação assistiva independente do acesso “Para meu caderno” — portão condicionado a ambiente novo

**Handoff exclusivo da LEG-13. NÃO executar LEG-14 no fechamento da LEG-13.** Só executar LEG-14 por nova autorização expressa, em uma única sprint; ao encerrar preparar `docs/PROMPT_LEG-15.md` autossuficiente, sem executar LEG-15.

### 1. Missão e condição de abertura

O objetivo é verificar, em **ambiente assistivo genuinamente independente ou diante de defeito novo concretamente demonstrado**, a navegação Home ⇄ lista única “Para meu caderno”. Este trabalho só deve alterar produto se existir falha reproduzível do atalho, foco, ordem de leitura ou retorno. Não criar outro caderno digital, agenda, marcação automática ou módulo curricular. Se não houver dispositivo/sessão de teste independente disponível nem defeito novo confirmado, encerrar a LEG-14 com checkpoint **sem patch**, identificando o impedimento e evitando repetição artificial das mesmas simulações.

O usuário registra perguntas curtas para seu **caderno físico**; a plataforma guarda uma lista opcional para recuperá-las mais tarde. A conclusão de estudo/revisão não altera o status de anotação sem comando manual.

### 2. Repositório, fontes de verdade e retomada

- Repositório público: https://github.com/Talksxb/agu-quiz
- Produção GitHub Pages: https://talksxb.github.io/agu-quiz/
- Auditoria privada `Talksxb/agu-auditoria`: somente leitura pontual quando indispensável; nunca transpor dados privados, matriz ou evidências ao repositório público.
- LEG-07 a LEG-11 formaram uma única lista `forNotebook`; LEG-12, PR #27, merge `cb764e3071dc7ac0cc00d60999f9a53cfe77cbcb`, criou o atalho da Home sem copiar registros; fechamento LEG-12 PR #28, merge `c33716434b42a5656fa1fada62ba754f98b8c93d`.
- LEG-13 partiu da `main` `c337164...` e abriu a [PR #29](https://github.com/Talksxb/agu-quiz/pull/29), branch `leg/leg13-portao-home-caderno`, integrada no merge **`60bf27b0c170ed003d0eec1c5fb22abe15859e79`**. Reproduziu defeito da Home sob fonte 200% em 320–390 CSS px (texto do botão de retomada cortado e overflow horizontal) e corrigiu somente a regra CSS desse botão em `index.html`, com fixture de SHA e regressão. Conciliou as PRs concorrentes UX05 #30/#31. CI da PR `43747869649` aprovada em Node/Chromium; Pages `43748256060` aprovado; CI principal `43748256376` aprovada nos três jobs, incluindo jornada LEG13 em HTTPS. Hash publicado do HTML: **`e33885e0469ce760408e1b7d7d03c2d8bcaa753dad0f237bfd745777bf0aef24`**. Evidência, demais hashes, contagens axe e limites: `docs/LEG-13_PORTAO_HOME_CADERNO.md`. Todos os identificadores são históricos e **precisam de reconfirmação remota**.
- Ao iniciar: verificar `main` e HEAD reais, PRs abertas/concorrentes, jobs Actions em andamento, Pages/deploys, hashes HTTPS, proteção de branch e quaisquer novos checkpoints S45/UX ou LEG. Não sobrescrever trabalho concorrente.

Ler `docs/LEG-13_PORTAO_HOME_CADERNO.md`, `docs/LEG-12_HOME_CADERNO.md`, relatórios LEG07–11, checkpoints UX01–05 (a UX05 foi integrada nas PRs #30/#31 durante a LEG13), `docs/PROMPT_LEG-14.md`, `tests/leg12-*`, `tests/leg13-*`, `tests/fixtures/leg12-deltas.json`, `tests/fixtures/leg13-deltas.json`, `.github/workflows/agu-sprint20-ci.yml`, `tests/sprint21-pages.cjs`, os testes de backup S20/S25–27 e os checkpoints de isolamento S39–45 pertinentes. Não reiniciar Sprints 4/20–45 nem cotejos legislativos.

### 3. Contratos intocáveis

- Único armazenamento: campo opcional `forNotebook` em `agu_leitor_juridico_s13_v1`, uma das nove categorias de `backup-local-s20.js`; nenhuma nova chave, backend, login, Supabase, sincronização ou notificação.
- Única lista e editor: `leitor-juridico.js`, `AGULegal.peek`, `AGULegal.tab('para_caderno')`, filtros, edição, `notebookSetStatus`, `notebookOrigin` e `notebookCanOpenOrigin`. Home apenas consulta contagem validada de itens `status:'pendente'`, inclusive `topic:null`, e abre a mesma lista.
- Quatro origens pré-existentes: `leitor` (norma/dispositivo verificáveis), `estudo_integrado` (sessão/dispositivo reais), `questao_verificada` (quatro questões históricas elegíveis), `flashcard_existente` (índice histórico de 36 cartões). IDs `pc-*` únicos, datas ISO, estados manuais `pendente|anotado|dispensado`. Não remapear ou reclassificar.
- `topic` é curricular granular confirmado ou `null`. Flashcards só ADM-06 e CON-50 têm vínculo documental próprio ao corpus. DL4657/LINDB e L4717 seguem sem tópico presumido. Correspondência por proximidade verbal, disciplina ampla ou cartão autoral é proibida.
- LEG-08 só recupera pendentes quando cartão já registrado e vencido (`due<=hoje`) tem exatamente `active.code===mark.topic`. Não alterar prazo, fase, prioridade, algoritmo, acertos, respostas, sessões ou planejamento.
- Limites: 300 marcações, 450 caracteres, 500 comentários, 12 MB UTF-8, nove categorias S20; restauração apenas de categorias **ausentes**, backups antigos sem `forNotebook` válidos, escrita atômica e sem duplicação.
- Corpus jurídico imutável nesta sprint: seis normas, 292 artigos, 1.176 unidades, cinco integrais; `agu-legal-reader-v1`, `agu-legislation-leg01-v1`, CF88 parcial, L9784, LC101, LC73, DL4657 e L4717. Não importar, alterar fonte, transcrição, `textVersionId`, IDs, ressalvas ou alegar vigência jurídica nova.

### 4. Portão de ambiente e escopo de teste

Primeiro constatar, **sem explorar dados pessoais**, se há aparelho Android/iOS de teste realmente independente, serviço de teste assistivo autorizado ou sessão disponibilizada explicitamente para isso. Um Chrome/CDP compartilhado, uma nova aba ou viewport não equivale a aparelho independente. Não acessar perfil, notas ou backup real de Tawan. Caso exista novo meio, usar apenas perfil sintético isolado; documentar modelo, sistema, versão, leitor de tela, navegação, permissões e grau de independência, sem alegar TalkBack/VoiceOver se não usado.

Em ambiente apto ou diante de defeito novo com reprodução inequívoca:

1. A partir da Home vazia, com quatro origens de marcação sintética e com categoria inválida, verificar rótulo e anúncio do botão “Para meu caderno”, contador de pendentes e aviso de armazenamento indisponível. Não revelar conteúdo pessoal em modo demo.
2. Navegar por leitor de tela e/ou teclado linear, Enter/Espaço e toque até a lista, conferindo anúncio do título focado, sequência de filtros, rótulos dos botões, estados, retorno à Home e foco restaurado. Conferir texto ampliado/zoom 200% e 400%, rolagem e ausência de controle oculto, sem alterar outros fluxos.
3. Alternar explicitamente `pendente→anotado→dispensado→pendente`, editar texto breve, filtrar tema conhecido e `sem_tema`, testar origem retirada e retorno seguro. Sem alteração automática por estudar, responder, revelar ou concluir.
4. Preservar bytes e registros de outras origens, Estudo Integrado, revisão vencida, sessão de baralho e questão oficial; testar storage ausente, JSON adulterado, `SecurityError`, quota e backups sintéticos de nove categorias. Testar limites 300/301, 450/451, 500/501 e >12 MB com os validadores existentes, sem dados reais.
5. Registrar eventuais barreiras assistivas com passos, viewport/zoom, árvore acessível, screenshot, logs e comparação entre esperado e observado. Distinguir defeito confirmado de inconclusivo histórico. Os 12 nós inconclusivos da LEG11 após rolagem se concentravam na sessão de flashcards, fora do acesso Home/lista; não corrigir nem reclassificar sem prova direta e escopo autorizado.

### 5. Política de patch e regressão

- Se não houver defeito novo: **sem mudança de produto**, sem correção cosmética artificial, entregar checkpoint de portão e status do meio independente.
- Se houver defeito de Home/lista claramente reproduzido: aplicar a menor correção aditiva possível em `meu-estudo.js`/`index.html` ou interface estritamente necessária. Nunca alterar leitor, backup, revisão ou CSS dos baralhos por conjectura; se uma mudança cruzada for indispensável, provar e documentar impacto.
- Criar novo fixture de deltas SHA-256 antes/depois se qualquer produto mudar, encadeando LEG13 sem sobrescrever LEG01–13/UX01–04; testes novos devem demonstrar a falha antes e a correção depois.
- Executar todas as regressões Node anteriores, Chromium em 320/360/390/430/1280 nos novos contextos sintéticos, axe 390/1280 separando `violations`, `incomplete`, `passed` e revisão por rolagem. Não classificar `incomplete` como aprovado. Registrar de forma honesta o que foi ou não foi testado fisicamente.
- Manter workflow e artefatos explícitos, `AGU_TEST_URL` somente em publicação, `tests/sprint21-pages.cjs` com HTTP 200 e SHA exato de HTML, nove scripts, CSS e módulo de questões.

### 6. GitHub e fechamento

Após conferir base/concorrentes, usar branch e PR próprias em rascunho; sem force push, rebase destrutivo ou contorno de proteções. Integrar somente com CI verde e ausência de conflito. Após merge, conferir deploy GitHub Pages e jornada HTTPS; distinguir PR validada de produção se bloqueado.

Relatório `docs/LEG-14_*.md` deve informar base/branch/commits/PR/merge, ambiente realmente disponível, evidência do defeito ou decisão sem patch, resultados Node/Chromium/axe/assistivos, inconclusivos, backup, hashes, URLs, riscos e limitação exata. Preparar `docs/PROMPT_LEG-15.md` completo e independente, **sem executar LEG-15**. Não ampliar o escopo para conteúdo jurídico, provas, aulas, flashcards ou um segundo caderno.

**Regra permanente:** o cronograma escolhe quando estudar; a lista apenas lembra o que o estudante optou por escrever posteriormente em seu caderno físico.
