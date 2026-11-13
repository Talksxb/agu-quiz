# AGU Quiz | PROMPT COMPLETO — Sprint 20
## Confiabilidade transversal, validação mobile e proteção dos dados de estudo

**Predecessora:** Sprint 19 (2026-11-12), implementada em `main`, checkpoint `docs/CHECKPOINT_SPRINT19_QUESTOES_2026-11-12.md`. **Não executar esta sprint durante o fechamento da Sprint 19.**

### 1. Missão e decisão de prioridade

Realizar **uma** sprint de confiabilidade funcional de ponta a ponta, com foco em dispositivos móveis e integridade/portabilidade dos dados do estudante. A Sprint 19 ampliou o número de itens com gabarito e explicação jurídica pontualmente conferidos para quatro, sem demonstrar ainda compatibilidade em Android físico nem propagar um teste integral por navegador. Portanto, antes de uma expansão quantitativa de provas ou legislação, validar o fluxo que já existe.

Não reiniciar a aplicação, não criar plataforma paralela, não adicionar novas áreas ao menu, não alterar a matriz curricular original nem promover itens apenas indexados como certificados.

### 2. Repositórios e estado a reconhecer

- Aplicativo: https://github.com/Talksxb/agu-quiz
- Auditoria: https://github.com/Talksxb/agu-auditoria
- Inspecionar antes de qualquer modificação: `index.html`, `revisao-inteligente.js`, `leitor-juridico.js`, `questoes-leitor-s18.js`, `caderno-contextual.js`, `estudo-integrado.js`, `leitor-consolidacao.js`, `planejamento-semanal.js`, `dados/questoes-auditadas-s18.js`, `dados/questoes-auditadas-s19.js`, `dados/legislacao-s13.js`, `dados/versoes-normativas-s17.js`, `tests/sprint19-validacao.js`, `docs/CHECKPOINT_SPRINT19_QUESTOES_2026-11-12.md`.
- Na Auditoria: `docs/PROTOCOLO.md`, `checkpoints/estado.json`, checkpoint mais recente de AUD03 e índices AUD02-029, apenas quando necessário para confrontar proveniência. Não presumir que AUD03-009 ainda será o mais recente.
- Baseline no fechamento da Sprint 19: quatro itens auditados acessíveis no Leitor (`of-2015-adv-006`, `of-2015-adv-007`, `of-2015-adv-009`, `of-2015-adv-048`); 36 flashcards; 24 referências oficiais no catálogo de revisão; nenhuma certificação integral de tópico curricular. A contagem precisa ser novamente verificada.

### 3. Diagnóstico prévio obrigatório

Identificar bugs reais de UI, carregamento/cache e persistência, apontando evidência reproduzível, contexto e impacto. Distinguir falha comprovada, risco, teste ainda não feito e melhoria opcional. Verificar a coexistência entre os identificadores de questões de 2015 já indexados no catálogo legado e os dados auditados da Sprint 19, sem gerar tentativas duplicadas. Examinar `of-2015-adv-001` e outros itens antigos cujo mapeamento de caderno/variante requer reconciliação independente; não reescrever identidade histórica sem fonte.

### 4. Fluxo completo a validar

Início → Estudar → Biblioteca Inteligente → selecionar fonte normativa → Questões → selecionar item auditado → responder C/E → revelar gabarito definitivo histórico → expandir fundamentos histórico e atual → classificar a revisão → conferir agendamento D+1/D+7/D+21/D+45 → registrar dificuldade no Caderno com item, dispositivo e duas fontes oficiais → voltar à Biblioteca/Evolução. Conferir também pesquisa por ID estável, disciplina, dispositivo e número de questão.

Os itens de 2023, quando presentes como referências bibliográficas, permanecem de **múltipla escolha A–E** e não devem ser pontuados como C/E. Questões anuladas devem continuar excluídas da pontuação.

### 5. Testes automatizados e de navegador

- Executar o teste versionado `node tests/sprint19-validacao.js`; registrar saída real, versão do runtime e commit.
- Acrescentar testes reproduzíveis, preferivelmente com Playwright ou equivalente **somente se o ambiente permitir**. Em navegador, medir renderização, clique, navegação direta, foco por teclado, escapatória de `<details>`, reflow e controle de gabarito oculto antes da resposta.
- Verificar 320/360/390/430 px e desktop; rolagem interna, botões com alvo de toque, suporte a `prefers-reduced-motion`, contraste e ausência de overflow horizontal.
- Testar implantação real no GitHub Pages se acessível; verificar rede, ordem de scripts, versionamento de cache, caminhos relativos e erro de arquivo ausente. Não confundir inspeção do GitHub com propagação do Pages.
- Quando possível, reproduzir navegação em **Android físico** com Chrome e relatar dispositivo/versão, screenshot ou registro objetivo. Na impossibilidade, marcar explicitamente `nao_testado_android_fisico`, sem inventar resultados.

### 6. Integridade e proteção dos dados locais

Inventariar todos os `localStorage` keys utilizados, formatos e chamadas de importação/exportação: `agu_quiz_revisao_inteligente_v1`, `agu_caderno_contextual_s15_v1`, `agu_estudo_integrado_s16_v1`, planejamento e estado principal. Validar que uma resposta gera somente uma nova tentativa; uma avaliação não corrompe o estado de outro item, e reabrir o leitor preserva a revisão.

Testar backups válidos/invalidos, importações repetidas, versões antigas, arquivos fora do limite, IDs duplicados, referências a dispositivos inexistentes e conteúdo HTML malicioso em notas. O comportamento esperado é preservar dados corretos e rejeitar operações inconsistentes, sem apagamento silencioso. Adicionar proteções pequenas e proporcionais, sem migração destrutiva.

**Não implantar sincronização remota, autenticação nova, conexão com banco ou transferência de dados pessoais sem autorização específica**, análise de privacidade e definição de recuperação/conflito. Nesta sprint, priorizar backup local claro e confiável e uma arquitetura futura documentada.

### 7. Fidelidade pedagógica e jurídica

Separar resposta pessoal, gabarito oficial, comentário autoral, evidência jurídica pontual e pendência; não elevar `confirmado_pontualmente` a `certificado_integralmente`. Preservar gabaritos históricos e anulações mesmo que o direito atual se modifique. Excertos legais (CF 37 X, CF 49 V e Lei 9.784 art. 50 I/§1º) devem continuar identificados como partes do artigo, nunca como texto integral. Não incluir novos itens Cebraspe sem cotejo independente de caderno, variante, gabarito e fundamentações.

### 8. Critérios de aceitação

- Quatro áreas principais: Início, Estudar, Biblioteca Inteligente e Evolução; nenhuma nova entrada de menu.
- Quatro itens auditados com IDs únicos e gabaritos originais, vinculados ao artigo adequado.
- 36 flashcards, backups e histórico anteriores intactos.
- Sem gabarito visível antes de resposta; revisão agenda no motor já existente.
- Nota manual do Caderno ligada ao ID estável e às duas fontes oficiais.
- Testes reproduzíveis e distinção clara entre unitários/simulados, navegador automatizado, desktop real e Android físico.
- Bugs não resolvidos registrados com evidência, severidade e hipótese de correção; não esconder pendências com afirmações vagas de aprovação.
- Nenhum dado pessoal publicado ou sincronizado.

### 9. Implementação e entrega

Realizar diagnóstico → correções mínimas → testes → publicação no GitHub → leitura posterior dos arquivos/commit → checkpoint Markdown → prompt da Sprint 21. Deixar inalterados módulos sem problema real. Documentar todos os arquivos, commits, novos testes, limitações e riscos residuais. Não iniciar a Sprint 21 nesta execução.

**Princípio permanente:** mais profundidade funcional, menos complexidade visual; uma sprint por vez; rastreabilidade acima de expansão numérica.
