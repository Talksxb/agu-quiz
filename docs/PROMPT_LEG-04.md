# AGU QUIZ | WORK — LEG-04
# Lei Complementar 73/1993 integral no leitor existente

Execute **somente LEG-04**. Não reinicie o projeto nem repita os inventários anteriores. Ao encerrar, gere `docs/PROMPT_LEG-05.md`, completo e autossuficiente; não execute LEG-05.

## 1. Estado real e retomada delimitada

Aplicação: https://github.com/Talksxb/agu-quiz ; produção https://talksxb.github.io/agu-quiz/ . Auditoria privada https://github.com/Talksxb/agu-auditoria : apenas leitura quando necessária; não publicar conteúdos privados ou dados pessoais.

LEG-03: branch `leg/leg03-lrf-integral`, PR https://github.com/Talksxb/agu-quiz/pull/5 , código `8b2732ad76cd7e852c1f6c15b23c8005644d5f69`, merge `964a22490c42ab1498747ddf47dad0e1ce30f9c5`. CI de código https://github.com/Talksxb/agu-quiz/actions/runs/43542072254 aprovado (Node + Chromium 159.0.8154.6). **Publicado e verificado:** https://talksxb.github.io/agu-quiz/?abrir=lei&norma=LC101 ; deploy Pages 43542372931 aprovado. HTTP 200, HTML e oito scripts por hash; job pages-publicado do CI 43542373872 executou LEG03 e WORK01 na URL real em cinco larguras/contextos novos. Leitura/busca/notas, sessão anterior, download/restauração e axe confirmados também em produção. Sem bloqueio conhecido de uso. Fechamento documental posterior apenas atualiza este prompt e docs/LEG-03_LRF.md; código publicado permanece 8b2732ad.

Predecessoras incorporadas: LEG-01 PR #2 (4df6dc2/091fb3d), LEG-02 PR #3 (código final 190357ab, merge 04299df8) e fechamento #4 (main 04314fe8 antes da LEG03). WORK01/PR #1 integrada em 4fa4d295. Preservar leitor, biblioteca, revisão, questões, planejamento, caderno, backup e correções de foco S29–35. Nenhum dado privado foi integrado na série LEG.

Leia `docs/LEG-03_LRF.md`, `docs/PROMPT_LEG-04.md`, main/branches/PRs abertas e o resultado final da PR #5. Reconfirme a árvore publicada e possíveis alterações concorrentes. Não suponha que o estado permaneceu congelado. Use branch própria a partir da implementação correta; dependência aberta deve ser explicitada, sem sobrescrever trabalho ou forçar merge conflitante. Não repetir pesquisa da Sprint 4 ou diagnóstico geral.

## 2. Corpus a preservar integralmente

Contrato `agu-legal-reader-v1`, `catalogContract=agu-legislation-leg01-v1` em `dados/legislacao-s13.js`.

- CF88: parcial, quatro artigos/nove unidades; arts. 131/132 completos isolados, 37 caput/X e 49 V em excertos. Não é CF/ADCT integral.
- L9784: integral da captura oficial fixada, 80 artigos/222 unidades/19 capítulos; versão `L9784@2026-11-13-camara-87cd4730`. Não regenerar por nova fonte nem desfazer a correção do art. 50, I. Notas mantêm seus IDs.
- LC101/LRF: integral, **83 artigos/545 unidades, 10 capítulos/24 seções/7 subseções**. Versão `LC101@2026-11-13-camara-9e178a49`. Oito artigos com sufixos (14-A, 26-A, 41-A, 48-A, 65-A, 73-A/B/C), 21 vetos e quatro unidades cuja inconstitucionalidade está anotada pela fonte, sem auditoria judicial nova.
- Total anterior à LEG04: **3 normas, 167 artigos, 776 unidades, 2 integrais**. Auditoria jurídica permanece `parcial_nao_certificado`; cotejo textual integral não certifica vigência ou domínio curricular.

Capturas LRF: `fontes/lc101/camara-20261113.html.txt` (244.662 bytes; SHA-256 `9e178a491fd3ba44c4956316bc9ef602a5d544b2fa5d8a52abaa2e6bac3de691`) e catálogo oficial `catalogo-camara-20261113.html.txt` (61.376 bytes; `19fa027482676146b0e6d1b5fc1320560656252aa17c8ceeb88d537a4c61d854`). Fonte https://www2.camara.leg.br/legin/fed/leicom/2000/leicomplementar-101-4-maio-2000-351480-normaatualizada-pl.html . A página de dados da Câmara remete à LC 235/2026 para art.14-A; o próprio art.41-A prevê aplicação em 2027. Ressalvas estão visíveis, não antecipar marcos nem presumir alcance judicial. As notas editoriais são separadas do corpo, com links e fonte. Não remover vetos/dispositivos históricos silenciosamente.

## 3. Escopo único LEG-04

Incorporar ou validar o **texto integral consolidado da Lei Complementar 73/1993 — Lei Orgânica da AGU** no mesmo corpus/leitor. Não importar outra norma, CF/ADCT, novo módulo, banco, framework, serviço, autenticação, questão ou gabarito. Não refatorar nem redesenhar o aplicativo.

LC73 ainda não está incorporada: há apenas referências/complementos normativos em `dados/relacoes-juridicas-s14.js`, flashcard `aud03-flc-014` e questões existentes (artigos 1º–4º/12; referência temática CON-50). Isso não demonstra vínculo granular de todos os dispositivos. Não converter resumos em transcrição nem fabricar IDs curriculares. Novos artigos devem usar `topic:null`, salvo relação documental efetivamente comprovada.

Referência oficial já registrada no inventário, a **reabrir e verificar**, sem supor atualidade: https://www2.camara.leg.br/legin/fed/leicom/1993/leicomplementar-73-10-fevereiro-1993-354947-normaatualizada-pl.html . Preferir consolidação oficial Câmara/Senado/Planalto. Planalto apresentou verificação humana em LEG02/03; não contornar barreiras. Registrar a alternativa efetivamente usada.

Capturar URL final, órgão, data real, versão, bytes e digest; verificar todos os artigos/dispositivos, divisões, sufixos, vetos, revogações, efeitos futuros e anexos existentes. Não calcular completude pelo último número. Separar notas editoriais/judiciais/temporais do corpo; ressalvas precisam permanecer visíveis. Não declarar vigência integral ou certificação jurídica por capturar fonte oficial. Se houver divergência relevante, confrontar fonte oficial e documentar, sem correção silenciosa.

## 4. Contratos e implementação a reutilizar

- `lib/catalogo-legislativo.js`: `validate(corpus,previous)` offline; IDs únicos, fontes oficiais, caminhos/pais, compatibilidade e manifesto de integralidade. Valida `textStatus` opcional (`veto_placeholder`, `declared_unconstitutional_in_source`, `revoked_in_source`) e `article.sourceNotices[{text,url}]` com fonte oficial.
- Norma: `id/title/kind/number/year/source/sourceAuthority/checkedOn/sourceVersion/textVersionId/contentCoverage`; `textVerification.status/checkedOn/scope` separado de `auditStatus`.
- `structure[]`: ID/tipo/pai/rótulo; caminhos ordenados em `article.structurePath`. Artigo com `topic`, `contentKind=isolated_article|excerpt`, `clauses[]`. Unidade com ID/rótulo/texto/tipo/pai; metadados aditivos `sourceOrdinal/sourcePart/editorialNotes/sourceLinks/textStatus`. Não inserir versão na chave da nota.
- Integral exige `compared/full_norm`, ausência de excertos, `completeness.expectedArticleIds` em ordem, data, digest e anexos `included|not_applicable`; `sourceCapture` documenta arquivo/URL/bytes/digest/normalização. Manifesto não substitui cotejo real.
- `scripts/importar-lrf.py` e `scripts/importar-lei9784.py` são específicos de suas capturas. Reutilizar a abordagem offline, sem forçar LC73 nesses parsers. `tests/leg03-source-check.py` reconstrói 541 parágrafos oficiais a partir das 545 unidades LRF, inclusive quatro itens do art.55, III, b. Não alterar essa lei nesta sprint.
- Atenção ao verificador legado L9784: ele também compara o corte global (`cutoff`) fixado em 13/11. Se a nova data exigir atualizar o corte, limitar proporcionalmente a comparação à norma legada, sem mudar sua captura/texto/metadados ou mascarar regressão.
- Fixtures: `leg01-identidade-s36.json`, `leg02-manifesto.json`, `leg02-correcao-legados.json`, `leg03-manifesto.json`, `leg03-preservacao.json` em `tests/fixtures/`. Preservar hashes e IDs anteriores; adaptar apenas totais globais legitimamente ampliados.
- `leitor-juridico.js`: leitor único; `openLaw(id,restart)`, `chapter(id)`, `boundary(last)`, `article/unit/tab/mobile/note`. Seletores já suportam três níveis. Entrada `?abrir=lei&norma=ID` retoma posição da mesma norma. Painel documental recolhível preserva acesso à fonte e histórico.
- `leitor-consolidacao.js`: busca/status existentes; versão do corpus cotejado prevalece sobre registro legado S17. `dados/versoes-normativas-s17.js` conserva 18 registros; não inventar série histórica.
- `estudo-integrado.js`, Caderno, Revisão e Planejamento: leitura/Comentários em artigos sem currículo; não iniciar sessão inválida. Não duplicar agenda, anotações ou questões.

## 5. Persistência, testes e entrega

`backup-local-s20.js` intocado na LEG03: nove chaves/formatos, 12 MB UTF-8, restauração só em categorias ausentes e **500 chaves de comentários**, mesmo havendo 776 unidades. Teste LEG03 aceita 500 e rejeita 501 sem escrita. Não migrar, limpar, substituir, mesclar, dividir ou ampliar limites nesta importação; eventual ampliação é outra tarefa com evidência e testes. Testar preservação de notas/sessões anteriores, IDs e restauração em perfil novo.

Executar Node S19/S20/S25–27/S29–35, WORK01, LEG01/02/03 e novos LEG04: fonte/digest, cotejo completo, sequência, hierarquia e sufixos, literalidade, vetos/revogações/ressalvas, tópicos nulos, corpus anterior idêntico e dados pessoais sintéticos preservados. Não apagar testes para acomodar a expansão. Chromium em contextos novos a 320/360/390/430/1280: norma/divisões, primeiro/último dispositivo, artigo extenso, inciso/alínea/item, busca, comentários antigos/novos, sessão anterior, home/reload, exportação/restauração e teclado/foco S29–35. Reutilizar `tests/leg03-browser.cjs`; nada no perfil compartilhado do usuário.

Axe 4.14.0 na LEG03: zero violações em 390/1280; um inconclusivo por sobreposição do menu em 390 tornou-se passed após rolagem. Separar violations/incomplete/passed e não chamar inconclusivo de aprovado. Capturas foram inspecionadas. Chromium 159.0.8154.6 em CI, sem Android físico/TalkBack ou teste do backup pessoal do usuário. Não declarar testes que não executou.

Workflow `.github/workflows/agu-sprint20-ci.yml` mantém regressões e testa LEG03 também na URL real com `AGU_TEST_URL`; acrescentar LEG04 e artefatos. Push de main inclui `fontes/**` e `scripts/**`; PRs para main rodam CI. Atualizar cache só dos assets alterados e expectativas/hashes em `tests/sprint21-pages.cjs`, sem alterar assets não modificados.

Entregar branch/PR próprias e integração somente após validação/ausência de conflitos, respeitando proteções atuais; nada de force push. Reutilizar Pages. Critério: abrir LC73 **incorporada**, ler/navegar/buscar/anotar/retomar e recuperar backup preservando CF/L9784/LRF. Confirmar deploy, URL, HTML/hashes e jornada em navegador isolado na versão publicada. Se bloqueado, distinguir PR testada de produção e indicar a menor ação necessária.

Fechar objetivamente com fonte/versão, cobertura, alterações, testes reais/limitações, arquivos, branch/commits/PR e URL/estado de publicação. Gerar `docs/PROMPT_LEG-05.md` com estado real e escopo único da próxima tarefa, pronto para novo chat; encerrar sem executá-la.
