# AGU QUIZ | WORK — LEG-03
# Lei Complementar 101/2000 (LRF) integral no leitor existente

Execute **somente LEG-03**. Não reinicie a plataforma, não repita o inventário da Sprint 4 e não execute a sprint seguinte. Ao encerrar, gere `docs/PROMPT_LEG-04.md`, completo e autossuficiente.

## 1. Estado a conferir antes de editar

Aplicação: https://github.com/Talksxb/agu-quiz . Produção: https://talksxb.github.io/agu-quiz/ . Auditoria privada: https://github.com/Talksxb/agu-auditoria , somente leitura; não publicar seu conteúdo ou dados pessoais.

- LEG-01: branch `leg/leg01-inventario`, PR https://github.com/Talksxb/agu-quiz/pull/2 ; implementação `4df6dc25d3b2613efa598a12286bb4168ae5f230`, fechamento `091fb3d63fd43d0669695c4091197dc58e64a982`.
- LEG-02: branch `leg/leg02-lei9784-integral`, PR https://github.com/Talksxb/agu-quiz/pull/3 ; implementação `6abe5fbd2b6e7497f7ca30c1c965a491ca88d0c3`. Conferir commits posteriores de correção/fechamento e resultados reais do CI na PR, sem presumir aprovação.
- Na abertura da PR #3, #2 continuava aberta. #3 é cumulativa e preserva a branch #2. Main havia avançado de `ea1b769` para `607a13b9f6d74f7c9bac1a537f697d1e75337d88`, somente documentos S39/S40, sem patch de produto.
- WORK01/PR #1 já foi integrado (`4fa4d2955be60e8acf5e2d134e9d5b241f84f6c3`). Não sobrescrever suas melhorias nem as sprints de teclado/persistência.

Leia `docs/LEG-02_LEI9784.md`, `docs/LEG-01_INVENTARIO.md`, diff/CI das PRs #2/#3, main e PRs abertas. Verifique se foram mescladas, se a árvore testada é a mesma que pretende usar e se o Pages publica essa árvore. Se continuarem abertas, baseie a LEG-03 na implementação correta, declare a dependência e não faça merge conflitante. Não reabra diagnóstico geral do ecossistema.

## 2. Corpus real da LEG-02

`dados/legislacao-s13.js`: `schema=agu-legal-reader-v1`, `catalogContract=agu-legislation-leg01-v1`.

- CF88 continua parcial: arts. 131/132 completos isolados; arts. 37 caput/X e 49 V em excertos. Quatro artigos, nove unidades. Sem CF/ADCT integral.
- L9784: texto integral da captura consolidada da Câmara, **80 artigos/222 unidades/19 capítulos**. Artigos 49-A–G, 64-A/B e 69-A e sete marcadores de veto incluídos; ementa/preâmbulo/fecho presentes. Cotejo textual `compared/full_norm`; `auditStatus=parcial_nao_certificado`.
- Total: duas normas, 84 artigos, 231 unidades, uma norma integral.
- Versão L9784 `L9784@2026-11-13-camara-87cd4730`, consulta 13/11/2026. Captura pública `fontes/lei9784/camara-20261113.html.txt`, 96.407 bytes; SHA-256 `87cd4730fda84e28bdfc490c4cd6635b8eb86c98a4ab2daf29e380eb62c0a80b`.
- Fonte: https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html . O Senado reproduz essa consolidação, não constitui cotejo independente com o DOU. Planalto apresentou barreira humana na LEG-02.
- Todos os 24 IDs anteriores e vínculos foram preservados. Só `L9784:art50:I` mudou texto: inicial minúscula e ponto e vírgula conforme fonte. Antes/depois/hashes em `tests/fixtures/leg02-correcao-legados.json`; nota mantém chave. Não desfazer essa correção.

A LRF **ainda não está no leitor**. Versão histórica 04 e banco atual contêm somente referências/paráfrases: `sourceLrf`, questões f1/f2/fin5, art. 1º §1º e art. 2º III. Não converter essas explicações em transcrição e não inventar vínculo granular a partir do tema FIN/LRF.

## 3. Escopo único LEG-03

Incorporar o texto integral consolidado oficial da **Lei Complementar 101/2000 — Lei de Responsabilidade Fiscal** ao mesmo corpus/leitor. Não importar CF, ADCT, outra lei, novas questões ou gabaritos. Não redesenhar o aplicativo, criar outro leitor, framework, serviço, banco ou autenticação.

1. Localizar/reabrir fonte consolidada oficial atual, preferindo Câmara/Senado/Planalto. Referência existente: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm . Se a fonte estiver indisponível, documentar e usar alternativa oficial; não contornar barreiras ou usar blogs como fonte primária.
2. Capturar texto oficial e registrar URL final, órgão, data real, tamanho, digest, versão, fonte e notas editoriais. Verificar sequência real, artigos inseridos/sufixos, alterações, vetos/revogações e eventuais anexos; não calcular completude pelo último número.
3. Usar um ID lógico estável de norma (por exemplo `LC101`, após conferir colisões) e IDs de artigo/dispositivo compatíveis. Novos artigos usam `topic:null`, salvo vínculo efetivamente documentado. Não criar tópicos certificados.
4. Cotejar todos os dispositivos e hierarquia; conservar grafia/pontuação da fonte. Separar notas editoriais e históricos do texto legal. Dispositivo vetado/revogado não pode aparecer como comando normativo vigente. A captura oficial não certifica vigência nem auditoria jurídica.
5. Reutilizar os seletores de norma/capítulo e primeiro/último artigo existentes. Ampliar minimamente apenas se a estrutura real da LRF demonstrar necessidade. Garantir leitura do primeiro ao último dispositivo, busca, comentários e retomada.
6. Preservar integralmente CF88 e L9784. Não regenerar L9784 com mudanças de fonte nesta sprint.

## 4. Arquivos e contrato a reutilizar

- `dados/legislacao-s13.js`: corpus ordenado. Norma: `id/title/kind/number/year/source/sourceAuthority/checkedOn/sourceVersion/textVersionId/contentCoverage`; `textVerification.status/checkedOn/scope` separado de `auditStatus`.
- `structure[]`: `id/kind/parentId/label`, caminhos em `article.structurePath`. Artigo: `topic`, `contentKind=isolated_article|excerpt`, `clauses[]`. Unidade: `id/label/text/kind/parentId`; metadados aditivos `editorialNotes`, `sourceLinks`, `sourceOrdinal`, `textStatus=veto_placeholder` quando pertinente. Não introduzir versão na chave da nota.
- Integralidade exige `compared/full_norm`, ausência de excertos e `completeness.expectedArticleIds` na ordem exata, `checkedOn`, `sourceDigest=sha256:...`, `annexes=included|not_applicable`. `sourceCapture` registra arquivo, URL final, bytes, digest e normalização. Manifesto não substitui cotejo real.
- `lib/catalogo-legislativo.js`: validação offline de estrutura e compatibilidade, sem rede/armazenamento. `validate(corpus,previous)`.
- `scripts/importar-lei9784.py`: importador offline **específico da Lei 9.784**, com captura/digest fixos. Reutilizar a abordagem de extração/reprodução, sem forçar a LRF pelo parser da outra lei. Evitar abstração geral desnecessária.
- `tests/fixtures/leg01-identidade-s36.json`, `leg02-manifesto.json`, `leg02-correcao-legados.json`: preservar baselines e hashes. LEG02 valida 80 artigos/222 unidades L9784; adaptar somente expectativas de totais globais legitimamente ampliados.
- `leitor-juridico.js`: único leitor; APIs `openLaw(id,restart)`, `chapter(id)`, `boundary(last)`, `article/unit/tab/mobile/note`. Entrada `?abrir=lei&norma=ID` mantém posição da mesma norma ao recarregar.
- `leitor-consolidacao.js`: busca/filtros originais; painel de versão prefere `law.textVersionId` quando há cotejo integral; não criar série histórica fictícia. `dados/versoes-normativas-s17.js` conserva 18 registros legados.
- `estudo-integrado.js`, `caderno-contextual.js`, Revisão/Planejamento/WORK01: não criar sessões para `topic:null`; Comentários por dispositivo seguem disponíveis.
- `backup-local-s20.js`: nove chaves e formatos, 500 chaves de notas do Leitor, 12 MB UTF-8 e restauração apenas de categorias ausentes. Não migrar, limpar, sobrescrever, fundir ou ampliar limites sem necessidade demonstrada.

## 5. Testes e entrega utilizável

Executar Node S19/S20/S25–27/S29–35, WORK01, LEG01 e LEG02; acrescentar LEG03 para fonte/digest, manifesto de artigos/unidades, unicidade, hierarquia real, sufixos, vetos/revogações quando presentes, fidelidade literal, tópicos nulos e preservação de CF88/L9784/IDs/notas/sessões/backup. Não apagar testes anteriores para fazer a expansão passar.

Chromium em contextos sintéticos novos, 320/360/390/430/1280 px: selecionar LRF, navegar por divisões, primeiro/último dispositivo, artigo extenso, inciso, busca, notas antigas e novas, reload, retorno por Meu estudo de hoje, exportação/restauração e teclado/foco S29–35. Reutilizar `tests/leg02-browser.cjs` e regressões. Axe: distinguir `violations`, `incomplete` por sobreposição e resultados após rolagem; não contabilizar inconclusivos como aprovados. Não usar o perfil compartilhado com dados do usuário. Não declarar Android físico/TalkBack sem execução real.

Na LEG-02 os testes Node locais passaram; ambiente local não tinha binário Chromium. Resultado remoto e correções posteriores devem ser lidos no fechamento da PR #3 antes de assumir aprovação. CI `.github/workflows/agu-sprint20-ci.yml` inclui LEG01/LEG02; acrescentar LEG03 e artefatos, mantendo as etapas existentes. Atualizar cache somente dos scripts alterados e o verificador de hashes `tests/sprint21-pages.cjs`.

Trabalhar em branch própria e PR, sem sobrescrever branches anteriores ou merge automático conflitante. Reutilizar Pages, sem outra hospedagem. URL real continua https://talksxb.github.io/agu-quiz/ ; confirmar deploy e hashes, não apresentar link futuro como funcionalidade publicada. Se a publicação depender de PRs anteriores, registrar o menor próximo passo e a dependência exata.

Fechar objetivamente com fonte/versão, cobertura, alterações, testes reais/limitações, arquivos, branch/commits/PR, URL e estado de publicação. Critério de uso: abrir LRF **incorporada**, ler/navegar/buscar/anotar/retomar sem perder registros de L9784/CF88. Gerar `docs/PROMPT_LEG-04.md`, pronto para novo chat com estado real, dependências, arquivos, escopo único, testes e obrigação do próximo handoff. Não executar LEG-04.
