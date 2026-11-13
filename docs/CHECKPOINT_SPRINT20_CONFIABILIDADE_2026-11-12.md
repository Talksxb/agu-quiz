# AGU Quiz — Sprint 20 | Confiabilidade transversal, dados locais e validação mobile

**Data de corte:** 2026-11-12. **Estado:** implementação e testes versionados persistidos em `main`; **67 verificações executadas em V8 com VM/DOM simulados (26 da Sprint 19 + 41 da Sprint 20), sem execução real do pacote Node no checkout, sem browser/Android físico nesta sessão e sem propagação de Pages confirmada**. Handoff Sprint 21 publicado. Nenhum dado pessoal transferido ou publicado.

## 1. Reconhecimento e governança

- App `Talksxb/agu-quiz`: lidos `index.html`, Revisão, Leitor, Questões S18, Caderno, Estudo Integrado, Consolidação, Planejamento, lotes oficiais S18/S19, legislação S13, versões normativas S17, teste S19 e checkpoint anterior.
- Auditoria privada `Talksxb/agu-auditoria`: lidos `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `checkpoints/AUD03-009.json` e índices AUD02-029 2015/2023. Posteriormente conferido `checkpoints/AUD03-011.json` na branch principal: `estado.json` informa `ultimo_checkpoint_persistido=AUD03-011`; AUD03-011 registra `status=parcial_nao_certificado` e observação de reconciliação/merge ainda em acompanhamento. **Não promover cobertura a certificação integral.**
- Quatro questões verificadas no Leitor: `of-2015-adv-006`, `of-2015-adv-007`, `of-2015-adv-009` e `of-2015-adv-048`. Sem novos itens na Sprint 20. Referências oficiais no motor: **24** (número de catálogo, não 24 questões juridicamente certificadas). **36 flashcards**; quatro áreas principais inalteradas.
- Identidade e gabarito histórico preservados. Q1 de 2015 é um legado separado dos quatro itens do painel auditado. Nenhuma alteração realizada no repositório privado.

## 2. Defeitos e riscos encontrados com reprodução

### R20-01 — Importação de Revisão duplicava IDs
**Falha comprovada em simulação:** um backup `agu-review-backup-v1` com duas tentativas de mesmo `id` era aceito, criando duas entradas históricas iguais; campos malformados (p. ex. `selected=P`, `correct='yes'`) também passavam. **Correção:** validação prévia de ID, tipo, data, alternativas e estágios; rejeição integral de duplicatas dentro do arquivo, limite de 3 MB, merge somente de tentativas novas. Agenda e `cards` existentes continuam intactos. Importação repetida idempotente. Arquivo: `revisao-inteligente.js`.

### R20-02 — Planejamento aceitava semanas incompletas
**Falha comprovada em simulação:** semana `2026-11-09` com 7 dias vazios `{}` era incorporada, podendo quebrar renderização e métricas. **Correção:** validação de segunda-feira, datas sequenciais, 7 dias, limites de minutos, tarefas, tópicos, IDs únicos, soma de minutos, metas diárias e estrutura de backup. Validação de todo lote antes de qualquer escrita; existentes e metas preservados. Arquivo: `planejamento-semanal.js`.

### R20-03 — Status indevido da questão legada Q1
**Risco jurídico documental comprovado por leitura do código:** `INLINE_ADAPTED['of-2015-adv-001']` estava com `auditVerified=true`, embora a justificativa exibida se fundamente em Decreto nº 12.540/2025 para resposta histórica aplicada em 2015. O decreto posterior pode subsidiar o **direito atual**, mas não reconstituir sozinho a **fundamentação de 2015**. **Correção conservadora:** bloquear apenas a promoção para correção automática (`auditVerified=false`, `historicVerification=pendente_fundamentacao_na_data_da_prova_2015`); manter ID, enunciado informativo e tentativas já gravadas. Não alterar chave E nem identidade da prova sem cotejo oficial adicional. Demais questões do acervo legado permanecem distintas das quatro auditadas.

### R20-04 — Dependência de formatação regional e fuso
**Risco reproduzível por inspeção:** `toLocaleDateString('en-CA')` era usado para criar comparações lexicográficas e programar D+1/7/21/45, dependendo de formato regional; a Consolidação usava `toISOString().slice(0,10)` UTC nas métricas. **Correção:** montar `YYYY-MM-DD` com ano/mês/dia **locais**; manter intervalos e regras da revisão já existentes, sem recalcular históricos persistidos. Arquivos `revisao-inteligente.js` e `leitor-consolidacao.js`.

### R20-05 — Importação principal insuficientemente validada
O backup legado em `index.html` verificava somente existência dos arrays `answers` e `sessions` antes de substituí-los, admitindo registros de formato que poderiam falhar na renderização. **Correção:** validador de versão, tópicos, registros, datas, IDs duplicados, revisões e notas com base no formato atual; limite de 3 MB; escrever no `localStorage` antes de trocar o estado da UI; aviso de substituição **somente da categoria principal**. Redação do reset esclarece que os outros módulos não são apagados. Não transformar importação legada em merge silencioso.

## 3. Entrega: backup local abrangente

Novo `backup-local-s20.js`, acessível dentro de **Evolução → Dados e backup**, sem nova rota ou elemento do menu principal.

**Nove chaves conhecidas e permitidas**, sem incluir arquivos normativos públicos no backup:
1. `agu_quiz_mvp1_2026` — histórico principal.
2. `agu_quiz_revisao_inteligente_v1` — tentativas e revisões.
3. `agu_quiz_planejamento_semanal_v1` — planejamento.
4. `agu_caderno_contextual_s15_v1` — notas privadas.
5. `agu_estudo_integrado_s16_v1` — sessões por dispositivo.
6. `agu_leitor_juridico_s13_v1` — comentários no leitor.
7. `agu_consolidacao_s17_v1` — preferências de consulta.
8. `agu_quiz_curriculo_repo_v1` — matriz importada localmente.
9. `agu_quiz_mapeamento_questoes_v1` — mapeamento curricular local.

Esquema da cópia: `agu-portable-local-s20-v1`, arquivo local JSON, limite 12 MB. Valida chaves de lista fechada e conteúdo estrutural antes de restaurar. A importação **só preenche categorias ausentes**; é idempotente e não sobrescreve existentes. Tenta reverter as chaves recém-escritas se uma gravação falhar. Para recuperar registros **dentro** de categorias já existentes, permanecem os importadores próprios dos módulos, explicitamente distintos do backup completo.

**Privacidade:** o arquivo pode conter informações pessoais; salvar somente no dispositivo do estudante, sem rede ou envio ao GitHub. Nenhuma autenticação, sincronização, banco de dados ou transferência pessoal nova.

## 4. Interface e navegação

- `index.html`: nova seção de backup na tela já existente, explicações de importação/reset, pequenas proteções para quebra de texto e largura mínima dos painéis e botões de 44–48 px em `@media(max-width:430px)`.
- Mantidas as quatro áreas: Início, Estudar, Biblioteca Inteligente, Evolução.
- Mantidos os conteúdos de fontes oficiais e recortes normativos; os arts. CF 37 X, CF 49 V e Lei 9.784 art50 seguem como **excertos**.
- Scripts afetados recebem querystring `?v=20261112-s20b` para evitar uso de versões anteriores em cache; verificação de entrega pelo Pages permanece pendente.
- Nenhum novo armazenamento de tentativas ou agenda foi criado; as regras originais continuam em `agu_quiz_revisao_inteligente_v1`.

## 5. Testes e níveis de evidência

### Executado nesta sessão — JS/V8 simulado, sem browser real

- `tests/sprint19-validacao.js`: **26/26** verificações aprovadas no executor de simulação de arquivos e `vm`.
- `tests/sprint20-validacao.js`: **41/41** verificações aprovadas no mesmo modelo, após correção da adaptação do executor (fornecimento de globais Date/console). Verificados: invariantes S19, quatro IDs, Q1 restrita, ocultação/revelação, fundamentação, tentativa única e preservação de histórico, vínculo com nota manual e duas fontes, escape de HTML em texto pessoal, importação de revisão válida/duplicada/malformada, semana do planejamento válida/inválida, backup de nove chaves, rejeição de chaves não autorizadas, restauração idempotente, backup principal inválido e agendamento **D+1/D+7/D+21/D+45** usando datas locais.
- Os testes publicados são executáveis em Node 22; porém o checkout remoto via `git ls-remote` no ambiente local foi impedido por falha de resolução DNS de `github.com`. `node --version` local = `v22.16.0`. **Não afirmar que os comandos `node tests/...` foram executados diretamente no checkout**; a execução confirmada é uma simulação V8 das próprias fontes publicadas.
- Os módulos e o script inline do HTML passaram verificação sintática por JS/V8 no mesmo ambiente.

### Preparado/publicado, mas ainda **sem resultado real confirmado**

- `tests/sprint20-browser.cjs`: Playwright com Chromium em servidor estático, cinco viewports **320/360/390/430/1280 px**, fluxo de clicar nas áreas, Q7, resposta C/E, gabarito oculto/revelado, expandir fundamentos, avaliar, criar nota, carregar links, recarregar, acessar backup, erros 404 e overflow. Capturas PNG sintéticas somente após execução.
- `.github/workflows/agu-sprint20-ci.yml`: jobs Node 22 (S19+S20) e Chromium Playwright com artefatos PNG. Configuração publicada; o conector não retornou status ou runs confirmados para o commit consultado. **Workflow definido não equivale a execução aprovada**.
- **Não testado:** DOM e cliques em navegador local real, GitHub Pages ao vivo, Android físico, rolagem e contraste em dispositivo, leitor de tela, comportamento em rede e cache efetivo. Status Android: `nao_testado_android_fisico`. Os CSS media queries existem, mas não substituem teste visual.

### Riscos residuais

1. Falta prova de execução real Node/Chromium e Android físico; resolver por CI e testes direcionados.
2. GitHub Pages: publicação no GitHub não comprova propagação de arquivos ou cache no site.
3. Recuperação cruzada: backup completo restaura somente categorias ausentes; não une duas cópias concorrentes do mesmo módulo. Requer procedimento explícito no manual e ensaio real.
4. Q1 de 2015 bloqueada para novo autoagendamento até fundamentação histórica auditada; registros antigos permanecem.
5. Avaliação estática de contraste/teclado não substitui acessibilidade em navegador.
6. Compromisso de não certificação integral continua em AUD03-011; a indexação de provas 2023 A–E não implica correção jurídica vigente.

## 6. Arquivos e commits de implementação

| Arquivo | Referência de commit |
|---|---|
| `revisao-inteligente.js` | `be74fdd1b55f56db752412e79df44eb2f82cc7ff` (inclui correções de importação e Q1 dos commits precedentes) |
| `planejamento-semanal.js` | `3bf1deae027d527091068ddb4b67fbb588898eca` |
| `backup-local-s20.js` | `35979e8c9fa0357133e5430e34344cd391b43340` |
| `index.html` | `2e1bbeccdd150e610983af22fdc6f700a344681e` (posteriormente ajustado validador principal, ver histórico) |
| `leitor-consolidacao.js` | `d50523d754ddfb32da30b567ab1adc88bce910c5` |
| `tests/sprint20-validacao.js` | `d11ea09ce91366b986e4d07f23bf203520980d16` |
| `tests/sprint20-browser.cjs` | `0186854b75d91a1f9f94a8f0a989a102001a7cf2` |
| `.github/workflows/agu-sprint20-ci.yml` | `f201898fce3978d216f4bf83828eaadb2e24b190` |
| `docs/PROMPT_SPRINT21_2026-11-12.md` | `4fe5e4074c3a37c2f6cc432d8c5a24182f9f987a` |

**Nota sobre `index.html`:** o commit de validação profunda do importador principal é `0a31c8289dc9af459d09ddd956b9066d12286f38`; a ordem e a integridade foram conferidas após essa atualização. O checkpoint preserva ambos para rastreabilidade.

## 7. Handoff e encerramento

A Sprint 21 foi escolhida para **obter evidência em navegador real, GitHub Actions, GitHub Pages, Android (se disponível) e exercício de restauração de backup**, corrigindo apenas falhas efetivamente identificadas. Prompt completo: `docs/PROMPT_SPRINT21_2026-11-12.md`. **Sprint 21 não iniciada.**

**Critério de encerramento da Sprint 20:** código, testes, workflow, registro de limites e handoff persistidos; aceitação visual/E2E e Android **expressamente pendente**, não presumida.
