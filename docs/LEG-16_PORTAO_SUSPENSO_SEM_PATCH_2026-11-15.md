# AGU Quiz — LEG-16 | Portão assistivo suspenso, sem patch

**Data:** 15/11/2026 (`America/Sao_Paulo`). **Escopo exclusivo:** acesso Home ⇄ lista única “Para meu caderno”. **Resultado:** `nao_testado_em_ambiente_assistivo_independente`; sem defeito novo localizado e reproduzido. **Não houve alteração de produto, fixture, teste ou workflow. LEG-17 não foi executada.**

## 1. Fonte real e continuidade

- Código: https://github.com/Talksxb/agu-quiz. Produção: https://talksxb.github.io/agu-quiz/. Repositório privado `Talksxb/agu-auditoria` **não acessado**; nenhuma matriz, fonte privada, nota, histórico ou perfil pessoal foi consultado.
- HEAD de `origin/main` e `git ls-remote` na abertura: **`f5aef92444f7785c6f848634aaa8c08bccd91df4`**, merge de fechamento documental LEG15 [PR #41](https://github.com/Talksxb/agu-quiz/pull/41). LEG15 implementada somente em documentos na [PR #40](https://github.com/Talksxb/agu-quiz/pull/40), merge **`b4d4d4028c4b9d41f1f7e946a2637b2e8b983a14`**. A CI LEG15 [43766528596](https://github.com/Talksxb/agu-quiz/actions/runs/43766528596) e a CI de fechamento [43767232649](https://github.com/Talksxb/agu-quiz/actions/runs/43767232649) estavam `completed/success`; Pages final [43767626119](https://github.com/Talksxb/agu-quiz/actions/runs/43767626119) `completed/success`, para exatamente `f5aef924...`.
- Consulta remota inicial encontrou **zero PRs abertas** e nenhuma CI em andamento. Branches históricas LEG e UX permanecem no remoto, sem indício de mudança de runtime posterior ao fechamento LEG15. A leitura de branch protection retornou `403 Resource not accessible by integration`; rulesets visíveis `[]` — **isso não comprova ausência de proteção**. Nenhum bypass, force push ou rebase será usado.
- Handoff [`PROMPT_LEG-16.md`](PROMPT_LEG-16.md), LEG12–15, linha LEG07–11, UX01–08, histórico de isolamento S39–45 e APIs da Home/leitor foram considerados. `meu-estudo.js`, `leitor-juridico.js`, backup, workflow, testes `leg12/13`, fixtures e verificador Pages estão na base confirmada, sem lacuna nova que autorize patch. Branch isolada criada da `main` confirmada: **`leg/leg16-portao-sem-evidencia-nova`**.

## 2. Avaliação do portão — sem condição nova

As **duas condições alternativas** do handoff não foram satisfeitas:

1. **Ambiente assistivo genuinamente independente:** não foi oferecido aparelho Android/iOS, serviço autorizado com leitor de tela, perfil de teste descartável, partição de armazenamento ou protocolo de descarte. Inventário técnico somente leitura: Linux x86_64 com `/usr/bin/chromium`; ausentes do PATH `adb`, `emulator`, `scrcpy` e `orca`; inexistentes `/dev/bus/usb`, `/dev/kvm`, `/opt/android-sdk`. A interface de Chrome/CDP gerenciada e compartilhada não se converte em ambiente assistivo físico por nova aba, nova sessão, viewport ou novo turno.
2. **Defeito novo localizado:** a solicitação “Executar PROMPT_LEG-16” não anexou captura, passos, árvore acessível, anúncio, reprodução, estado sintético ou impacto específico do atalho, foco, ordem de leitura, oclusão, retorno ou storage. Nenhuma falha adicional foi observada **porque não houve novo ensaio mutável autorizado pelo portão**; isso não é prova de ausência de defeitos.

**Decisão de isolamento:** não iniciar Chrome/CDP, emulador ou infraestrutura; não acessar conta, dados, notas ou backup real; não repetir cenários Node/Chromium/axe idênticos nem forjar resultados de TalkBack/VoiceOver, teclado assistivo, toque físico, zoom 200/400% ou Android. Todos os testes assistivos novos, os cinco viewports e o backup sintético mutável ficam **`nao_testado` nesta LEG16**. Não se produziu screenshot ou JSON de axe novo.

## 3. Contratos preservados sem escrita

- A única lista `forNotebook` permanece dentro de `agu_leitor_juridico_s13_v1`, uma das nove categorias S20. Home apenas conta `status:'pendente'` após `AGUBackup20.validateRecord` (inclui `topic:null`) e abre `AGULegal.tab('para_caderno')` na mesma lista, com retorno de foco. Falha de leitura/JSON inválido gera aviso neutro sem reparo automático; demo não revela registros reais.
- Origens anteriores `leitor`, `estudo_integrado`, `questao_verificada` (quatro itens históricos) e `flashcard_existente` (36 cartões) continuam sem remapeamento. `pc-*`, ISO, texto de até 450 caracteres e estados `pendente|anotado|dispensado` somente por ação explícita. `topic` é ID granular documentalmente comprovado ou `null`; apenas ADM-06/CON-50 dos flashcards têm vínculo próprio. Não inferir vínculo a DL4657/LINDB ou L4717.
- LEG08 recupera somente pendentes com `mark.topic===active.code` em cartão com `due` já registrado e vencido `due<=hoje`. Revisar, revelar, responder ou concluir não altera automaticamente anotações físicas nem agenda. Backup continua em nove categorias, máximo **12 MB UTF-8**, **500 comentários**, **300 marcações** e **450 caracteres**; importação apenas de categorias ausentes, compatibilidade com legado e rollback atômico. Nenhum dado foi importado ou regravado na LEG16.
- Corpus normativo e questões inalterados: seis normas, 292 artigos, 1.176 unidades, cinco integrais, CF88 parcial; sem transcrição, vínculo, textVersionId, gabarito, fundamento ou certificação jurídica adicional. Planejamento, sessões, revisões, respostas e flashcards permaneceram intocados porque não houve patch ou operação de UI.

## 4. Verificação nova proporcional e histórico não reclassificado

Foi executado **somente em leitura** `node tests/sprint21-pages.cjs` sobre o checkout de `f5aef924...`: **exit 0 / `PAGES_VERIFICADO`**, HTTP 200, HTML **109.132 bytes**, **nove scripts**, CSS de baralhos e módulo de questões com SHA-256 idênticos ao checkout. A verificação não acessa `localStorage` pessoal e não é um ensaio assistivo.

| Asset em HTTPS | SHA-256 |
| --- | --- |
| `index.html` | `e33885e0469ce760408e1b7d7d03c2d8bcaa753dad0f237bfd745777bf0aef24` |
| `meu-estudo.js` | `e88aa5ee7cb77a5f4e193f690830c803604dcda1b3d2e6fe53e0d8285bed43de` |
| `leitor-juridico.js` | `1f119fb84c092b00a994943a1f0f09d85dcc6efabb6b85df536a3b3189a48c04` |
| `backup-local-s20.js` | `8f1884ab63c2d6e4bb3bca753d01607a29abedf07e60d61ecb6f1c464a07f4f9` |
| `revisao-inteligente.js` | `fe6b8dcacc7363fd661055e737c73c443f1428d2b97e807faeb37e447650252c` |
| `baralhos-ux.css` | `de772af0e639f70f57bc4ea8d6bf59fd9cd6971463ae936f9a74d390be42d3b7` |
| `questoes-leitor-s18.js` | `f4095116ca5bf0b31bd76ca323a88a7b8a1e0b079d100da9981d1f8f6d943c3f` |
| `dados/legislacao-s13.js` | `c038fc9416d1b441aa710bb970eb8428a92008f197ca367ea09df53f6c45f51a` |

O mesmo verificador validou catálogo de disciplinas, planejamento, consolidação e Estudo Integrado. **Regressões históricas**, não reexecutadas como novo ensaio LEG16: a CI de LEG15 aprovou 31 suítes Node e Chromium em cinco larguras. Axe LEG13 da Home: `violations=0`, `incomplete=0`, `passed=18` em 390/1280; na lista 1/5 nós inconclusivos inicialmente, reavaliados após rolagem sem persistência. **Axe LEG11 manteve 12 nós inconclusivos por largura em flashcards; UX05 manteve nove por largura na biblioteca**. Nenhum `incomplete` foi convertido em aprovação, e nenhum resultado foi atribuído a Android físico ou TalkBack.

## 5. Encerramento e próximo portão

Entrega estritamente documental: este checkpoint e [`PROMPT_LEG-17.md`](PROMPT_LEG-17.md). **Não há delta de produto ou fixture LEG16.** A PR documental, sua CI, o merge e o Pages só serão declarados aprovados após comprovação remota, nunca presumidos na abertura. A CI automática de PR, se ocorrer, reexecuta regressões conhecidas e não habilita o portão assistivo.

**Próxima ação mínima:** disponibilizar expressamente um aparelho Android/iOS ou serviço assistivo autorizado, isolado, com leitor de tela ativo, perfil sintético sem histórico e descarte controlado; **ou** uma falha nova inspecionável com passos e captura/árvore/anúncio, sem informações pessoais. Na falta de ambos, **suspender novas sprints LEG de verificação idêntica, sem produzir uma sucessão de PRs meramente numeradas**. O caderno físico continua sendo o destino da escrita; o aplicativo só guarda gatilhos curtos escolhidos pelo aluno.
