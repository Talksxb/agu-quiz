# AGU QUIZ | WORK — UX ESTUDO INTEGRADO 03

Handoff completo e autossuficiente. **Não executar em S02. Requer nova autorização. Executar somente S03**, sem novas frentes curriculares ou backend.

## Missão

Refinar e validar a experiência móvel integrada do AGU Quiz, corrigindo dificuldades comprovadas nos fluxos existentes, verificando acessibilidade/persistência/backup e preparando integração/publicação regular segundo a autorização recebida. As aulas permanecem no ChatGPT; o site é leitura, questões/cartões, consulta, revisão e registro. Não construir outro professor, app, caderno, revisão ou cronograma.

Código: https://github.com/Talksxb/agu-quiz
Produção: https://talksxb.github.io/agu-quiz/
Auditoria privada: https://github.com/Talksxb/agu-auditoria — somente leitura quando necessária; não exportar matrizes/evidências para este repositório público.

## Retomada obrigatória, sem repetir diagnóstico

1. Confirmar main atual, PRs abertas/mescladas, últimos checks e produção. Ler `docs/ROADMAP_UX_ESTUDO_INTEGRADO.md`, `docs/UX_ESTUDO_INTEGRADO_02_ENTREGA.md` e `docs/UX_ESTUDO_INTEGRADO_02_CONTRATO.md`. O roadmap é a fonte única de escopo/progresso/tempo; descrição da PR informa a CI final posterior ao checkpoint documental.
2. S01: PR #54, branch `feat/ux-estudo-integrado-01`, HEAD histórico `517dcd842a7ba7b93ba2c21d5a386a6ae402d163`, base histórica main `31a47693b8f690e543f565c83208e3cdc637a547`. Estava aberta/ready na abertura da S02, CI 44099812436 verde. Não presumir integração.
3. S02: PR #57 (https://github.com/Talksxb/agu-quiz/pull/57), branch `feat/ux-estudo-integrado-02`, derivada da S01; usar seu HEAD final. Sua base deve ser S01 se esta continuar aberta. Se ambas estiverem mescladas, partir da main atual. Se ainda empilhadas, preservar a cadeia, trabalhar em branch própria sobre S02 e declarar dependência. Não rebase/force push, não copiar versões antigas sobre código novo. Não tratar ref histórica como atual.
4. Usar artefatos reais da última CI para localizar problemas. Não repetir investigação OpenAI, inventários jurídicos ou sprints documentais antigas. GPT Sites continuam cópias independentes; não publicar automaticamente neles.

## Entregas já existentes

- S01: navegação por assunto (12 códigos da base pública observada), recursos apenas quando houver vínculo literal, retorno de módulos ao assunto, progresso por avaliações e Home retoma baralho existente sem substituir sessão integrada. Motor/cronograma originais.
- S02: `importar-aula.js/.css`, atalho Home/Estudar → Caderno AGU → arquivo `agu-aula-v1` até 32.768 bytes, UTF-8 estrito, chaves exatas, ID estável, texto/URL/listas limitados. Prévia integral, tema opcional manual, confirmação explícita, cancelar/atualizar prévia. Exemplo sintético e pedido de encerramento disponíveis no painel de ajuda.
- Um registro em `agu_quiz_mvp1_2026.notebook` com ID `chatgpt:<id>`, origem e todos os campos como texto da síntese. Mesmo conteúdo/destino deduplica após reload/restore; conflito de identidade preserva original. Bytes do histórico comparados à prévia; categoria inteira validada, escrita aditiva, memória só muda após sucesso. Cancelamento/nova seleção invalidam leitura anterior.
- Registro mostra síntese/retomada em detalhes e na exportação Markdown. Data civil não muda de dia por fuso. O validador `backup-local-s20.js` e nove categorias não foram modificados.
- Importar não cria respostas, horas, revisões, tarefas concluídas ou domínio. Código granular declarado e reconhecido pode oferecer atalho explícito aos recursos. Não pressupõe equivalência entre ADM-02 pedagógico e IDs granulares ou temas legados.
- Código desconhecido fica textual; `Sem vínculo curricular` é rótulo de registro, não novo ID curricular. Fontes consultadas na aula são declaração da síntese, não certificação do importador. Não inserir outra cópia automática em S15/forNotebook.

## Trabalho S03

1. Avaliar jornada real a partir dos artefatos: Home/retomar, Biblioteca/assunto, cartões ↔ legislação, entrada da aula/prévia/registro, revisão e lista Para meu caderno. Priorizar 320–430 px, teclado/foco, tamanho dos controles, fluxo de retorno e compreensão da origem/efeitos da síntese.
2. Identificar defeitos concretos e corrigi-los com patch pequeno. Verificar especialmente a legibilidade de prévias/registros longos e acesso ao formulário manual já existente; não criar outro sistema para resolver a apresentação. Não exigir grandes textos copiados; o JSON pequeno é o caminho estabelecido.
3. Examinar `incomplete` do axe no artefato atual, separando controles fora/na borda da área visível de defeitos semânticos demonstrados. Corrigir apenas com evidência. Não classificar inconclusivo como conformidade ou falha automática. Sem Android físico/TalkBack real disponível, registrar o limite e completar o que pode ser validado; não abrir cadeia repetitiva de sprints sem hipótese nova.
4. Conferir persistência/retomada, registros/notas existentes, agenda, plano e backup portátil antes da preparação de integração. Origem/navegador continuam importando: o backup atual é transferência manual, não sincronização entre aparelhos ou ChatGPT.
5. Preparar revisão/instruções de publicação da cadeia, respeitando a autorização efetiva para integração e deploy. Não antecipar publicação em S02 nem presumir aprovação de merge a partir deste handoff. Nenhum merge forçado ou GPT Site automático.

## Validação obrigatória

- Preservar **38 suítes Node** herdadas da S02 e todos os testes de navegador históricos. Consultar a CI final real; não inferir aprovação apenas da existência dos scripts.
- Chromium 320/360/390/430/1280: navegação, teclado/foco/retorno, persistência, cancelamento, duplicata/conflito, notas, revisão, plano e exportação/restauração. Testes mutáveis só em contextos sintéticos independentes; nunca limpar histórico pessoal.
- Backup antigo e novo compatíveis, nove categorias. Síntese não cria avaliações/horas/revisões fictícias; original preservado em quota, histórico inválido ou alterado desde a prévia.
- Fixtures históricas intactas; criar delta encadeado quando houver alteração de produto. Não ajustar texto jurídico para facilitar UI/teste. Sem importação pública da auditoria privada.
- O workflow S02 inclui base `feat/ux-estudo-integrado-01` por ser empilhado. Se S03 estiver em nova base de feature, garantir disparo dos mesmos jobs sem enfraquecer as regressões. Pages só deve ser comparado ao checkout correspondente depois da integração/publicação efetiva.

## Entrega e encerramento

PR própria, com base/dependências claras e checks atuais. Atualizar o roadmap único: estado de cada entrega, percentual ponderado verificável, tempos realmente medidos (com timestamps e limites), estimativa total/remanescente, dificuldades, PR/integração/produção. Não inventar minutos ou previsões exatas.

O plano inicial tem três sprints. Se o objetivo for concluído, registrar encerramento desta frente e passos de uso/manutenção, sem inventar S04. Se houver bloqueio ou escopo residual concreto, justificar no roadmap uma etapa adicional pequena e gerar prompt autossuficiente, sem executá-la nesta tarefa. Não parar apenas em plano se houver trabalho S03 já autorizado e executável.
