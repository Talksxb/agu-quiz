# AGU QUIZ | WORK — LEG-05
# LINDB integral no leitor existente

Execute **somente LEG-05**. Não reinicie a plataforma nem repita inventários anteriores. Ao encerrar, gere `docs/PROMPT_LEG-06.md`, completo e autossuficiente; não execute LEG-06.

## 1. Retomada e estado real

Aplicação: https://github.com/Talksxb/agu-quiz ; produção: https://talksxb.github.io/agu-quiz/ . Auditoria privada: https://github.com/Talksxb/agu-auditoria , somente leitura quando necessária; nenhum conteúdo privado ou dado pessoal deve ser publicado.

LEG-04: branch `leg/leg04-lc73-integral`, PR https://github.com/Talksxb/agu-quiz/pull/7 , código `f65808ba32033f8c2e738da59045207170ce769b`, base `d072128a9d79fbe6c5bc555de6023479bd334c9e`. **Fechamento real:** PR #7 integrada em `db92b3e53a6abb97260e83a5b0394edfc2603aa1`. CI de código 43598166961 aprovado (Node + Chromium 159.0.8154.6). Publicada: https://talksxb.github.io/agu-quiz/?abrir=lei&norma=LC73 ; deploy Pages 43598512331 aprovado, HTTP 200 e HTML/oito scripts por hash. Job pages-publicado do CI 43598512973 executou LEG04, LEG03 e WORK01 na URL real em 320/360/390/430/1280, preservando notas e sessão anterior, com exportação/restauração em contexto novo. Axe 4.14.0: zero violações em 390/1280; um inconclusivo em 390 passou após rolagem; nenhum em 1280. Sem Android físico/TalkBack. Não há bloqueio conhecido de uso. Fechamento documental posterior apenas atualiza este prompt e o registro LEG04; código permanece f65808ba.

Predecessoras incorporadas: LEG01 PR #2; LEG02 PR #3 (190357ab, merge 04299df8), fechamento #4; LEG03 PR #5 (8b2732ad, merge 964a2249), fechamento #6 (d072128). WORK01/PR #1 incorporada em 4fa4d295. Não sobrescrever suas melhorias nem as de teclado/foco S29–35.

Leia `docs/LEG-04_LC73.md`, este prompt, o resultado final da PR #7, main/branches e PRs abertas antes de editar. Reconfirme a árvore publicada e avanços concorrentes. Use branch própria a partir da implementação correta; dependência aberta deve ser explicitada. Não repetir diagnóstico geral, pesquisa da Sprint 4, importações ou cotejos já concluídos sem motivo concreto.

## 2. Corpus que não pode regredir

Contrato `agu-legal-reader-v1`, `catalogContract=agu-legislation-leg01-v1`, em `dados/legislacao-s13.js`. Total após LEG04: **4 normas, 240 artigos, 996 unidades, 3 normas integrais**; corte global 14/11/2026, versões anteriores mantidas em suas datas próprias.

- CF88 parcial: quatro artigos/nove unidades; arts.131/132 completos isolados, arts.37 caput/X e 49 V em excertos. Não é CF/ADCT integral.
- L9784 integral: 80 artigos/222 unidades/19 capítulos, versão `L9784@2026-11-13-camara-87cd4730`. Não desfazer correção rastreada do art.50, I ou mudar IDs das notas.
- LC101/LRF integral: 83 artigos/545 unidades, 10 capítulos/24 seções/7 subseções; versão `LC101@2026-11-13-camara-9e178a49`. Oito artigos com sufixos, 21 vetos, quatro unidades com inconstitucionalidade anotada pela fonte. Ressalvas: remissão da Câmara à LC235/2026 no art.14-A e aplicação em 2027 expressa no art.41-A. Não antecipar efeitos ou revalidar jurisprudência por inferência.
- LC73 integral: **73 artigos/220 unidades, 7 títulos/15 capítulos/3 seções**; versão `LC73@2026-11-14-camara-148726cf`. Doze vetos e três unidades com notas de remissão, sem certificação jurídica nova. Prazos transitórios nos arts.66/67/69 sinalizados sem reinício; remissão à ADI4652/2011 no art.28, III não se transforma em declaração de inconstitucionalidade.

Captura LC73: `fontes/lc73/camara-20261114.html.txt`, 99.345 bytes; SHA-256 `148726cf24d3704d3c89894ed0be64b2092c60a826dfbfedfbb45245e05966e7`. Fonte: https://www2.camara.leg.br/legin/fed/leicom/1993/leicomplementar-73-10-fevereiro-1993-354947-normaatualizada-pl.html . O cabeçalho do **Capítulo IX está em h2**, enquanto outros são p; importador captura p/h1..h6 e coloca arts.17–19 corretamente. Não substituir por parser que omita esse bloco. Objetos completos CF/L9784/LRF e código do Leitor/Backup permaneceram idênticos à LEG03 por hash.

## 3. Escopo único LEG-05

Incorporar ou validar o texto integral consolidado do **Decreto-Lei 4.657/1942 — Lei de Introdução às Normas do Direito Brasileiro (LINDB)** no mesmo corpus/leitor. Não importar outra norma, CF/ADCT, novo módulo de aula, framework, banco, serviço, autenticação, questão ou gabarito. Não refatorar ou redesenhar o aplicativo.

LINDB ainda não é corpus transcrito. Há marcador CIV/LINDB e referências pedagógicas no banco antigo, que não podem virar transcrição. Não inventar vínculos curriculares; usar `topic:null` para novos artigos, salvo vínculo documental comprovado. Escolher ID estável sem colisões (por exemplo `DL4657`, depois de verificar o catálogo), sem versão na chave da nota.

Referência já presente nas fontes do projeto, **não consultada/importada na LEG04 e a reabrir na LEG05**: https://www.planalto.gov.br/ccivil_03/decreto-lei/del4657compilado.htm . Preferir consolidação oficial Câmara/Senado/Planalto; localizar alternativa oficial se necessário. Planalto apresentou verificação humana nas execuções anteriores: não contornar barreiras, nem usar blog/resumo como fonte primária.

Registrar URL final, órgão, data real, versão, captura/bytes/digest. Cotejar todos os artigos/dispositivos e a ordem real: artigos inseridos, vetos, revogações, efeitos temporais, notas editoriais/judiciais e eventuais anexos, sem inferir a contagem pelo último artigo. Não retirar texto histórico silenciosamente. Distinguir fonte oficial/cotejo literal de certificação jurídica ou vigência integral; `auditStatus` deve permanecer separado de `textVerification`. Se houver divergência relevante, conferir outra fonte oficial e registrar a decisão, sem correção silenciosa.

## 4. Arquivos e contratos a reutilizar

- `lib/catalogo-legislativo.js`: `validate(corpus,previous)` offline, com unicidade, pais/caminhos, fontes e compatibilidade. `textStatus` opcional: `veto_placeholder`, `declared_unconstitutional_in_source`, `revoked_in_source`; `article.sourceNotices[{text,url}]` exige fonte oficial.
- Norma: `id/title/kind/number/year/source/sourceAuthority/checkedOn/sourceVersion/textVersionId/contentCoverage`; verificação textual e auditoria distintas. Integral exige `compared/full_norm`, ausência de excertos e manifesto `completeness.expectedArticleIds` em ordem, data, digest e anexos `included|not_applicable`.
- Estrutura `structure[]` com ID/tipo/pai/rótulo; `article.structurePath`; artigo com tópico/escopo/clauses; unidade com ID/rótulo/texto/tipo/pai. `sourceCapture` guarda caminho/URL/bytes/digest/normalização. `sourceOrdinal`, notas editoriais e links são metadados, não texto inventado.
- `scripts/importar-lc73.py`, `importar-lrf.py` e `importar-lei9784.py`: parsers específicos, com capturas/digests fixos. Reutilizar a abordagem offline, sem forçar LINDB nesses importadores ou regenerar normas anteriores. L9784 `--check` já compara apenas sua norma, permitindo avanço do corte global. Não usar `--write` legado para importar outra lei.
- `tests/leg04-source-check.py`: reconstrução inversa dos 220 blocos normativos da LC73, incluindo notas; `tests/leg03-source-check.py`: reconstrução da LRF e quatro itens internos do art.55. Preservar os cotejos.
- Fixtures em `tests/fixtures/`: leg01-identidade-s36; leg02-manifesto/correcao-legados; leg03-manifesto/preservacao; leg04-manifesto/preservacao. As últimas fixam CF/L9784/LRF completos e hashes de Leitor/Backup. Não apagar baselines; adaptar somente totais globais legitimamente ampliados ou alterações mínimas justificadas.
- `leitor-juridico.js`: leitor único, APIs `openLaw(id,restart)`, `chapter(id)`, `boundary(last)`, `article/unit/tab/mobile/note`; entrada `?abrir=lei&norma=ID` retoma posição da mesma norma. Seletores suportam títulos/capítulos/seções. Se LINDB não tiver divisões na fonte, não inventá-las para preencher UI: aceitar caminho vazio e adequar minimamente o controle, se necessário.
- `leitor-consolidacao.js`, S17, Estudo/Caderno/Revisão/Planejamento: preservar. Versão do corpus cotejado prevalece sobre registro legado, sem série histórica fictícia. Artigos sem currículo admitem leitura/Comentários, sem sessão inválida ou agenda paralela. S17 conserva 18 registros legados.

## 5. Persistência e testes

Backup intocado: nove chaves/formatos, 12 MB UTF-8, 500 chaves de comentários, restauração só em categorias ausentes. Há 996 unidades, mas não se ampliou o limite: LEG04 aceita 500 notas incluindo LC73 e rejeita 501 sem escrita. Não migrar, apagar, sobrescrever, mesclar, dividir ou ampliar limites nesta importação; eventual ampliação é outra tarefa documentada e testada. Nada no perfil ou backup pessoal do usuário.

Executar Node S19/S20/S25–27/S29–35, WORK01 e LEG01–04; adicionar LEG05 para captura/digest, completude/ordem real, literalidade inversa, pais/IDs/sufixos quando presentes, ressalvas, tópicos nulos e corpus/dados anteriores preservados. LEG04 tem 15 verificações próprias, 17 suítes Node no total. Não apagar testes para acomodar a expansão.

Chromium em contextos novos a 320/360/390/430/1280: norma/divisões quando existentes, primeiro/último dispositivo, artigo extenso, inciso/alínea/item se presentes, busca, notas antigas/novas, sessão anterior, home/reload, download/restauração e teclado/foco S29–35. Reutilizar `tests/leg04-browser.cjs`, mantendo os testes das outras normas. Axe deve separar violations/incomplete/passed, revelando elementos antes de reavaliar sobreposição. Não contar inconclusivo como aprovado nem declarar Android físico/TalkBack sem execução.

Workflow `.github/workflows/agu-sprint20-ci.yml` inclui regressões completas e LEG03/04 na URL real por `AGU_TEST_URL`; acrescentar LEG05 e artefatos. Cache só dos assets alterados e expectativas/hashes de `tests/sprint21-pages.cjs`. Push main contempla scripts/fontes. Na LEG04 apenas o corpus mudou como asset; leitor/consolidação mantiveram versões e código.

## 6. Entrega utilizável e encerramento

Branch e PR próprias, respeitando proteções atuais, sem force push ou merge conflitante. Reutilizar Pages. Critério: LINDB incorporada, com navegação/busca/notas/retomada e backup recuperável, sem perder CF/L9784/LRF/LC73. Conferir CI, deploy, URL, HTML/hashes e fluxo na URL publicada em navegador isolado. Se bloqueado, distinguir PR testada de produção e indicar a menor ação necessária.

Fechar objetivamente com fonte/versão, cobertura, diferenças justificadas, testes reais/limitações, arquivos, branch/commits/PR e URL/estado. Gerar `docs/PROMPT_LEG-06.md` com estado real e um único próximo escopo, pronto para novo chat; encerrar sem executá-lo.
