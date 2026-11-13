# AGU Quiz — Sprint 22 | Robustez local, acessibilidade e jornada sem atrito

**Corte local:** 12/11/2026 — America/Sao_Paulo. Os logs do runner GitHub Actions estão em UTC de 13/11/2026.  
**Estado:** implementação e regressões públicas persistidas em `main`; testes Node e Chromium **realmente executados**; GitHub Pages conferido via HTTPS/hashes; 9 categorias restauradas a partir de arquivo JSON em perfil isolado; diagnóstico axe-core. **Android físico: `nao_testado_android_fisico`.** Sprint 23 apenas preparada, **não iniciada**.

## 1. Repositórios, escopo e baseline

Aplicativo: https://github.com/Talksxb/agu-quiz, branch `main`. Auditoria privada: https://github.com/Talksxb/agu-auditoria (somente leitura nesta sprint).

A inspeção inicial cobriu os checkpoints S19/S20/S21, `docs/GUIA_BACKUP_LOCAL_S21.md`, `index.html`, Revisão, Backup, Planejamento, Caderno, Estudo Integrado, Leitor Jurídico, Consolidação, Questões do Leitor S18, dados auditados S18/S19, testes S19/S20/S21 e workflow. Na Auditoria, lidos `docs/PROTOCOLO.md`, `checkpoints/estado.json` e os checkpoints recentes; ao encerramento, o último registrado já era **AUD03-016**, `item_id=INT-27`, `status=parcial_nao_certificado`, **412 IDs únicos/válidos, 0 certificações integrais** e merge documentado. Não foi feita qualquer alteração na Auditoria nem na matriz original.

Invariantes observados em testes:
- **quatro áreas principais:** Início, Estudar, Biblioteca Inteligente, Evolução;
- **quatro questões auditadas de 2015:** `of-2015-adv-006` (E), `-007` (C), `-009` (E), `-048` (C), cada uma distinta, com gabarito histórico e explicação pontual; sem novos itens;
- **36 flashcards** e **24 referências de questões oficiais no motor legado**, sem promover as referências a certificação jurídica;
- direito de 2015 avaliado em Certo/Errado, referências 2023 em A–E, questões anuladas fora da pontuação (regressões S19–S21);
- revisão D+1/D+7/D+21/D+45 preservada e dados somente em `localStorage`;
- Q1 legada `of-2015-adv-001` segue sem nova correção automática até comprovação histórica independente, sem apagar tentativas antigas.

## 2. Diagnóstico e falha de integridade reproduzida

### S22-001 — Matriz curricular inválida passava no backup completo

**Classificação:** `falha_reproduzida`; severidade **alta para restauração curricular**, sem vazamento ou perda de dados comprovada.

**Reprodução em Chromium headless real** (run GitHub Actions `43351592396`, job de navegador com conclusão `failure`):
1. Gerar no **contexto efêmero do navegador de teste**, exclusivamente, 14 disciplinas e 412 posições curriculares fictícias, com IDs distintos e contagens consistentes.
2. Importar essa matriz pelo controle já existente, gerar mapeamento de uma questão autoral, responder perguntas e preencher as **nove** categorias de armazenamento do usuário com dados sintéticos.
3. Capturar backup completo; adulterar a matriz **apenas na cópia de teste**, duplicando o código de uma das 14 disciplinas sem alterar as contagens nem o total 412.
4. O validador de backup anterior retornava aprovação; o importador curricular nativo, entretanto, rejeitava códigos duplicados. Mensagem de falha do teste: `backup com matriz de disciplinas duplicadas não pode passar`.

**Correção pequena, sem migração:** o validador `validateMatrix` já existente no `index.html` passou a ser exposto como `window.AGUValidateMatrix`. O backup `agu_quiz_curriculo_repo_v1` chama **essa mesma função**, protegida por `try/catch`, e **rejeita** caso não esteja disponível. Assim, ele não aprova arquivos apenas porque contêm 14 entradas/412 IDs. A expressão de ID dos mapeamentos passou a aceitar o mesmo número de segmentos de disciplina que a matriz (`(?:-[A-Z]+)*`), preservando formatos legítimos. `backup-local-s20.js` recebeu `?v=20261112-s22a` para atualização de cache.

**Revalidação real:** run `43352132566`, três jobs `success`; a matriz inconsistente foi rejeitada e a versão íntegra foi exportada/restaurada com os demais registros. Não houve edição da matriz privada nem publicação de seus conteúdos.

### S22-002 — Acessibilidade: cenários inconclusivos sem violação automatizada

**Classificação:** `nao_conclusivo`, prioridade média, **não uma correção de código**. Nova varredura axe-core em Chromium real com etiquetas WCAG 2.x em 26 cenários de rota/largura: **zero violações classificadas** em critical, serious, moderate ou minor. Entretanto, foram registradas verificações inconclusivas em **21 cenários para `aria-prohibited-attr`** e **13 para `color-contrast`**, que merecem inspeção manual antes de qualquer afirmação de conformidade. Os números contam **cenários em que a regra teve resultados incompletos**, não elementos defeituosos certificados nem violações demonstradas. Relatório JSON preservado no artefato do workflow.

Não houve mudança de markup com base apenas nessa classificação inconclusiva. Foi preservada a correção de contraste e de largura do seletor de 2023 da Sprint 21. No S23, aprofundar inspeção manual/axe em componentes concretos e só ajustar com reprodução.

## 3. Nove categorias: teste de ponta a ponta

**Esquema preservado:** `agu-portable-local-s20-v1`. **Exatamente nove chaves catalogadas**:
1. `agu_quiz_mvp1_2026` — histórico principal;
2. `agu_quiz_revisao_inteligente_v1` — revisão;
3. `agu_quiz_planejamento_semanal_v1` — planejamento;
4. `agu_caderno_contextual_s15_v1` — notas;
5. `agu_estudo_integrado_s16_v1` — sessões vinculadas a dispositivos;
6. `agu_leitor_juridico_s13_v1` — comentários do leitor;
7. `agu_consolidacao_s17_v1` — preferências da Biblioteca;
8. `agu_quiz_curriculo_repo_v1` — currículo importado;
9. `agu_quiz_mapeamento_questoes_v1` — mapeamento.

**Procedimento realizado com Chromium real:** navegar pelos quatro destinos e Planejamento/Leitor em **320/360/390/430/1280 px**, sem erro de página nem overflow nos pontos examinados; gerar resposta oficial 2023 A–E, resposta histórica de 2015, nota de Caderno, sessão integrada, planejamento, comentário normativo, preferências de consulta, importar matriz **fictícia no navegador**, mapear questão autoral. Conferir no DOM/localStorage as nove categorias, 4 itens auditados, 36 flashcards, 24 referências.

A partir da interface, clicar em **Exportar cópia completa** e obter arquivo JSON; comparar por **SHA-256 cada categoria** com o `localStorage` anterior. Abrir contexto independente de Chromium, importar o mesmo arquivo pela interface da aplicação, confirmar, recarregar e comparar por SHA-256 as nove categorias. Reimportar o arquivo, confirmar **zero chaves adicionais**, ensaiar cópia adversarial sem sobrescrever categoria existente. Testes usam exclusivamente dados sintéticos; não há informação privada de estudante nem importação da matriz real no CI.

Em paralelo, regressões de S21 cobrem ID duplicado, dispositivo normativo inexistente, HTML malicioso escapado em nota, quotas simuladas com rollback, arquivos acima de 12 MB, JSON inválido e versões incompatíveis. O S22 reforça a **coerência entre importação curricular normal e backup**. A sincronização remota permanece inexistente.

**Caveat:** não foram disponibilizados arquivos históricos **reais** de outras versões do usuário. Portanto, `nao_testado_backup_historico_real`: não prometer migração retrocompatível nem sobrescrever dados se o esquema histórico não for aceito. Backup completo restaura **só categorias ausentes**; imports específicos dos módulos adicionam registros conforme suas regras, sem fusão automática de conflitos.

## 4. CI, navegadores e evidência independente

**Run final do código com a varredura detalhada:** [43352410581](https://github.com/Talksxb/agu-quiz/actions/runs/43352410581), commit `c150fa627abdff4013c937b0ce62d08833fcd30e`, três jobs finalizados em **success**:

| Job | ID real | Evidência |
|---|---|---|
| `integridade-node` | `131646385611` | Node **v22.23.4**; `node tests/sprint19-validacao.js` **26/26**; `node tests/sprint20-validacao.js` **41/41**. Testes lógicos em VM/DOM simulado, executados em Node real |
| `navegador-chromium` | `131646385556` | Chromium **158.0.8127.18**, E2E S20/S21/S22 reais; 5 viewports; 9 chaves com hash e perfil independente; axe-core **4.14.0** em 26 cenários |
| `pages-publicado` | `131646385229` | HTML e quatro scripts carregados por HTTPS **HTTP 200**, SHA-256 idêntico ao checkout e versões de cache verificadas, incluindo `backup-local-s20.js?v=20261112-s22a` |

**GitHub Pages verificado:** https://talksxb.github.io/agu-quiz/ . O teste `tests/sprint21-pages.cjs` cotejou HTML e scripts de Revisão, Planejamento, Consolidação e Backup, comparando hashes em vez de inferir publicação apenas da aprovação do Pages. A política HTTP apresentada incluiu `max-age=600`; presença de querystring de versão é necessária, não prova ausência de todo cache antigo em qualquer aparelho.

**Relatório e capturas:** [artefato do run 43352410581](https://github.com/Talksxb/agu-quiz/actions/runs/43352410581/artifacts/14003719898). Contém screenshots sintéticos de S20/S21 e relatório `axe-diagnostico.json`; não contém cópia privada da matriz AGU nem histórico pessoal de estudante.

**Limite de interpretação:** as larguras mobile são **emulações de viewport no Chromium de desktop**, não medições de Android físico; a contagem de 26 análises axe não certifica WCAG global. **`nao_testado_android_fisico`** permanece explícito.

## 5. Arquivos e commits

| Caminho | Commit de implementação | Motivo |
|---|---|---|
| `tests/sprint22-browser.cjs` | `1f5375354837994c6a34fa86870c940fc68185f9` | E2E da jornada, das nove categorias e descoberta da falha de matriz |
| `index.html` | `728d62bf049759b3e595d50793a5cbb3279ec43c` | Compartilhamento da validação nativa e versão de cache |
| `backup-local-s20.js` | `859a1f2e773afc174f947c5226d41dd9333f3329` | Rejeição consistente da matriz inválida sem reescrever dados |
| `tests/sprint21-pages.cjs` | `ead6483ed80bfc5e58b0eda24d27a097db651452` | Atualização da prova de cache `s22a` |
| `tests/sprint22-axe.cjs` | `c150fa627abdff4013c937b0ce62d08833fcd30e` | Varredura axe-core, relatório de violações e regras inconclusivas |
| `.github/workflows/agu-sprint20-ci.yml` | `4ae435c77f21c58a92d9910373f4f37af320ebbb` | Executar S22 em Chromium/axe e reter artefatos |
| `docs/PROMPT_SPRINT23_2026-11-12.md` | `a9329368effcac307067adfa8589cf04d6621443` | Handoff, com auditoria AUD03-016 revalidada |

**Sem alteração** nos arquivos de banco de questões, gabaritos, conteúdo jurídico, motor de revisão, planejamento, caderno, sessão integrada, consolidação e fontes de Auditoria. A única mudança funcional para estudante foi na **validação do backup da matriz**, sem nova área de interface ou alteração de chave.

## 6. Riscos residuais e classificação

- **`nao_testado_android_fisico`**, prioridade média: sem aparelho/Chrome físico, captura ou teste de toque. Não trocar o resultado de desktop mobile viewport por Android.
- **`nao_conclusivo_axe`**, prioridade média: `aria-prohibited-attr` inconclusiva em 21 cenários e `color-contrast` em 13 cenários. Necessária inspeção de elementos concretos, teste manual e leitor de tela quando viável; zero violações automáticas observadas **não** representa certificação WCAG integral.
- **`nao_testado_backup_historico_real`**, prioridade média: inexistência de amostras históricas reais do estudante. A aplicação rejeita formatos inválidos sem apagamento silencioso; não implantar migração especulativa.
- **`risco_de_conflito_entre_dispositivos`**, prioridade média: backup completo não concatena versões concorrentes da mesma categoria; seguir instruções do `docs/GUIA_BACKUP_LOCAL_S21.md`. Sem login, nuvem ou sincronização por decisão de privacidade.
- **`pendencia_juridica_legado_2015_Q1`**, prioridade jurídica alta para reativação, contida funcionalmente: cotejo histórico de caderno, variante, fundamento e gabarito ainda não concluído; preservar registros antigos e bloqueio de novas correções.
- **`limite_amostragem_mobile`**, prioridade baixa: foram testados os quatro destinos principais, Planejamento e Leitor nas cinco larguras, com S21 cobrindo os itens auditados; não se alega cobertura de toda interação possível ou condições offline.

## 7. Encerramento e handoff

**Sprint 22 implementada, testada em navegador real, publicada e auditada quanto às evidências efetivamente disponíveis.** Reconhece as limitações acima sem criar status fictício. Arquivo de continuidade: `docs/PROMPT_SPRINT23_2026-11-12.md`, contendo plano de tratamento dos casos axe inconclusivos, eventual Android físico e backup histórico apenas quando fornecido.

**Sprint 23 NÃO iniciada nesta execução.** Uma sprint por vez, com privacidade e rastreabilidade.
