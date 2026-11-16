# AGU QUIZ | WORK — CARTOES-AUD-04 (HANDOFF, NÃO EXECUTAR DURANTE C03)

Exigir **nova autorização expressa**. Executar somente CARTOES-AUD-04 em nova sprint; não antecipar CARTOES-AUD-05 ou auditorias privadas. Uma questão antiga **não equivale** a um cartão. Evidência insuficiente, duplicação, incompatibilidade temporal ou código granular inexistente obrigam quarentena editorial e, se nada for elegível, encerramento documental sem patch.

## 1. Retomada obrigatória

- Código e fonte da verdade: `https://github.com/Talksxb/agu-quiz`; produção: `https://talksxb.github.io/agu-quiz/`. Revalidar `main` HEAD, PRs, branches, merges, CI, Pages e SHA-256 HTTPS de HTML, motor e CSS; não tomar SHAs históricos por atuais. Ler integralmente `docs/CHECKPOINT_CARTOES-AUD-01_2026-11-15.md` até `docs/CHECKPOINT_CARTOES-AUD-03_2026-11-16.md`, handoffs C01–C03, checkpoints UX01–08, LEG07–16, WORK01, biblioteca CC/CPC, testes/fixtures, workflow e commits posteriores. Não sobrescrever mudanças concorrentes.
- Base histórica de abertura C03: `aeedd9e1a3e7f3d00a8291516f30571e8c58942b` com PR #46 CARTOES02 e Biblioteca02 integrados. **Confirmar PR/CI/merge da CARTOES03 antes de agir**, pois esse SHA é somente base. C03 propôs três cartões (2015 Q5, Q7, Q8), ampliação de **48 para 51 cartões autorais** e de **10 para 11 baralhos**. Recontar valores reais se houver progresso posterior.
- Não acessar `Talksxb/agu-auditoria` privado sem autorização **específica e indispensabilidade objetiva**; em eventual acesso autorizado seria exclusivamente leitura, sem copiar matriz de 412 IDs, provas, evidências, métricas temporárias ou informação pessoal para o Quiz.

## 2. Missão editorial de uma única leva pequena

Investigar individualmente candidatas da prova AGU/2015 `187AGU_001_07`, especialmente Q4, Q16, Q20, Q24, Q36 e outras já demonstráveis **somente em material público**. Q6 já tem adaptação S19, e Q5/Q7/Q8 foram propostas em C03; revisar duplicação antes de acrescentar. Consultar [caderno oficial](https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/187AGU_001_07.pdf), [gabarito definitivo](https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/Gab_Definitivo_187AGU_001_07_SUPER-A4.pdf), lei e decisões **primárias** atuais da Câmara, Senado, Planalto, STF e STJ. Para cada candidata distinguir:

1. Número e gabarito **histórico** sem republicar enunciado protegido;
2. Regra e contexto de 2015, somente se comprovados;
3. Alteração posterior **documentada** ou declaração honesta de regra preexistente sem mudança comprovada;
4. Dispositivo e entendimento atuais, data de corte **04/11/2026**, limites e eventual controvérsia;
5. Código curricular granular já existente e **literal** no corpus público, sem mapeamento inferido por semântica/título/estatística;
6. Pergunta/resposta curta **autoral**, armadilha, caso prático, fonte precisa e metadado `notOfficial:true`.

Quarentenas C03: Q4 exige cotejo específico do TAC; Q16 envolve risco de PPP dependente do contrato e possível tensão entre gabarito e generalizações; Q20 requer exame de culpa concorrente e responsabilidade objetiva sem inferência curricular; Q24/Q36 sem cadeia documental/código granular completo. Uma questão com chave histórica válida não valida automaticamente a resposta de hoje.

## 3. Contratos intocáveis

- Não alterar cartões/IDs anteriores, questões/gabaritos oficiais, 412 IDs da matriz privada, taxonomia, níveis cognitivos originais 2/3/4, configuração dos intervalos `DAYS=[1,7,21,45]`, estatísticas AUD02-FREQ provisórias ou prioridades sem certificação. `AGUDisciplines.verifiedFrequency()` é opcional, não sinal de ranking publicável.
- Preservar chave `agu_quiz_revisao_inteligente_v1`, esquema `agu-review-v1`, sessões opcionais `librarySession`, `reviewInfo` e `attemptsInfo`, avaliações exclusivamente voluntárias (no máximo uma por cartão por sessão), histórico importado sem agenda como avaliado sem data, e importação parcial de até 3 MB **sem sobrescrever** `cards[id].seen/stage/due`.
- Backup S20: nove categorias, até 12 MB UTF-8, restauração apenas de ausentes. Uma única lista `forNotebook` em `agu_leitor_juridico_s13_v1`, origens `leitor`, `estudo_integrado`, `questao_verificada`, `flashcard_existente`. Sem `deviceId` suposto, segunda lista, login, servidor, sincronização, analytics nem efeitos de navegação sobre minutos, tarefas ou agenda.
- Não divulgar prova privada, matrizes, certificações não concluídas, estatística provisória ou comentários jurídicos como “oficiais”. Evitar criar cartões para atingir quantidade artificial.

## 4. Implementar somente diante de evidência completa

Após a seleção verificada, criar dataset separado C04 e IDs estáveis; inserir antes de `revisao-inteligente.js`, atualizar somente validador/contador e índice histórico do único caderno, respeitando os códigos publicados. Testar duplicações, invariantes, hash SHA-256 com **novo fixture de delta** encadeado à última `main` efetivamente integrada, sem reescrever fixtures históricos. Preservar todas as 36 suítes Node de referência (e as posteriores), CI Chromium UX01–08/LEG01–16/WORK01/S20–35/CARTOES01–03, Biblioteca CC/CPC. Validar perfis sintéticos 320/360/390/430/1280, filtros combinados, foco, Enter/Espaço, `aria-live`, movimento reduzido, frente/verso, agenda, sessões, caderno, backups, leitor, oficiais e plano. Axe em 390/1280: `violations`, `incomplete`, `passed`, alvos e capturas; **incomplete não significa aprovado**. Dispositivo Android/TalkBack real só quando disponibilizado e autorizado, nunca alegado a partir de emulação.

Criar branch/PR de C04, checkpoint factual e **somente** `docs/PROMPT_CARTOES-AUD-05.md` para handoff futuro, sem executá-lo. PR em rascunho até CI Node+Chromium verde, sem conflito e sem risco de proveniência, privacidade, backup ou revisão. Após merge aprovado, verificar Pages HTTPS, SHA-256 de assets e jornada publicada. Reportar HEAD inicial/final, PR, checks, concorrência, candidatos promovidos/quarentena, contagens, axe e limites assistivos. **Parar após C04.**
