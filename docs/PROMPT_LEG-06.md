# AGU QUIZ | WORK — LEG-06
# Lei 4.717/1965 integral no leitor existente

Execute **somente LEG-06**. Não reinicie a plataforma ou inventários. Ao encerrar, gere `docs/PROMPT_LEG-07.md`, completo e autossuficiente; não execute LEG-07.

## 1. Estado real e retomada

Aplicação: https://github.com/Talksxb/agu-quiz ; produção: https://talksxb.github.io/agu-quiz/ . Auditoria privada https://github.com/Talksxb/agu-auditoria : somente leitura quando necessária; não publicar dados privados/pessoais.

LEG05: branch `leg/leg05-lindb-integral`, PR https://github.com/Talksxb/agu-quiz/pull/9 , base `0dec2670527f29f212f4aeb7bd4c24971e1790ce`, implementação `7be38aca8130d10032fb33fe3d94eee124bc101b`; ajuste de teste/workflow `8cf494aa6043aa6a9ede7049761a15a2f2a1e002`. PR #9 incorporada em `0756d636adc9ec5f51f36fb69c7413f5479ede5f`. CI de código [43619962809](https://github.com/Talksxb/agu-quiz/actions/runs/43619962809) aprovado (18 suítes Node + Chromium 159.0.8154.6). Publicada e verificada: https://talksxb.github.io/agu-quiz/?abrir=lei&norma=DL4657 . Deploy Pages 43620476466 aprovado; HTTP 200, HTML/oito scripts por hash. CI main [43620477343](https://github.com/Talksxb/agu-quiz/actions/runs/43620477343) completo aprovado: Node, Chromium e job pages-publicado. Este executou LEG05/04/03 e WORK01 em HTTPS nas cinco larguras/contextos novos, com notas, sessão anterior, questão, reload e exportação/restauração. Artefato agu-work01-publicado, ID 14124240276. Axe 4.14.0: zero violações em 390/1280; um inconclusivo por sobreposição em 390 passou após rolagem; nenhum em 1280. Capturas inspecionadas. Sem Android físico/TalkBack ou dados pessoais. Não há bloqueio conhecido ao uso. O fechamento documental posterior somente registra o resultado e este prompt; conferir seu commit/PR no histórico, sem confundi-lo com novo código.

Predecessoras incorporadas: LEG01 PR #2; LEG02 #3/#4 (190357ab, merge 04299df8); LEG03 #5/#6 (8b2732ad, merge 964a2249); LEG04 #7/#8 (f65808ba, merge db92b3e5, fechamento 0dec267). WORK01/PR #1 integrada em 4fa4d295. Preservar as correções de foco/persistência e todos os módulos anteriores.

Leia `docs/LEG-05_LINDB.md`, este prompt, resultado final da PR #9, main/branches e PRs abertas. Reconfirme árvore publicada e alterações concorrentes. Se houver dependência ainda aberta, use a base correta e registre-a sem sobrescrever ou forçar merge. Não repetir diagnóstico geral, busca Sprint4, capturas/importações ou cotejos concluídos sem razão concreta.

## 2. Corpus que não pode regredir

`dados/legislacao-s13.js`: `agu-legal-reader-v1`, `catalogContract=agu-legislation-leg01-v1`. **5 normas, 270 artigos, 1.085 unidades, 4 integrais**. Corte global 14/11/2026; cada norma mantém sua data/versão.

- CF88 parcial: 4 artigos/9 unidades; arts.131/132 isolados completos, 37 caput/X e 49 V em excertos. Não é CF/ADCT integral.
- L9784 integral: 80 artigos/222 unidades/19 capítulos; `L9784@2026-11-13-camara-87cd4730`. Preservar a correção rastreada do art.50, I e seus IDs/notas.
- LC101/LRF integral: 83 artigos/545 unidades, 10 capítulos/24 seções/7 subseções; `LC101@2026-11-13-camara-9e178a49`. Oito sufixos, 21 vetos e quatro unidades com inconstitucionalidade anotada pela fonte. Ressalvas LC235/2026 no art.14-A e marco 2027 do art.41-A não certificadas juridicamente.
- LC73 integral: 73 artigos/220 unidades, 7 títulos/15 capítulos/3 seções; `LC73@2026-11-14-camara-148726cf`. Doze vetos, notas de remissão, prazos transitórios e ADI4652 sinalizados sem inferência de resultado. Capítulo IX em h2 corretamente capturado; arts.17–19 no capítulo certo.
- **DL4657/LINDB integral: 30 artigos/89 unidades, sem divisões formais**, `DL4657@2026-11-14-camara-e2aa961b`. Oito vetos, dois marcadores de revogação (art1 p2 e art15 pu), 25 unidades com notas editoriais e uma nota da ementa separada. Art15 remete à Constituição sem reafirmar a competência citada no corpo; art19 tem prazo transitório sinalizado. Nenhuma certificação jurídica nova.

LINDB: `fontes/lindb/camara-20261114.html.txt`, 73.523 bytes UTF-8, SHA-256 `e2aa961baf8e36b8583c7b0a2b41b57b36f3ec02091ddbed571e4c41adbefca6`; fonte https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-4657-4-setembro-1942-414605-normaatualizada-pe.html . Captura inclui ementa h1 e assinaturas h2/h3; marcador `Art.9o` tratado corretamente, §6º do art7 não truncado. Revogados/vetos são marcadores editoriais preservados, não reconstruções de antigas redações ausentes. Não remover dispositivos ou alterar a transcrição silenciosamente.

## 3. Escopo único LEG-06

Incorporar ou validar o **texto integral consolidado da Lei 4.717/1965 — Lei da Ação Popular**, no mesmo corpus/leitor. Não importar outra norma, CF/ADCT, novo módulo de aula, framework, serviço, banco, autenticação, questão ou gabarito. Não refatorar ou redesenhar o aplicativo.

A Lei 4.717 ainda não é corpus integral. Há referências/resumos ao art.2º, parágrafo único, alíneas d/e, inclusive cartão `aud03-flc-007`/ADM-23. Isso não prova relação curricular granular de todos os artigos. Não transformar cartões/resumos em lei nem inventar vínculos: usar `topic:null`, salvo relação documentada. Propor ID estável sem colisões, por exemplo `L4717`, após conferir o catálogo; sem versão na chave da nota.

Referência já presente no inventário, **não consultada/importada na LEG05 e a reabrir na LEG06**: https://www2.camara.leg.br/legin/fed/lei/1960-1969/lei-4717-29-junho-1965-377818-normaatualizada-pl.html . Preferir consolidação oficial Câmara/Senado/Planalto. Planalto apresentou verificação humana nas últimas execuções; não contornar barreiras. Usar alternativa oficial efetivamente consultada.

Registrar URL final, órgão, data real, versão, captura/bytes/digest. Cotejar todos os artigos e subdivisões na sequência real, sufixos, vetos/revogações, notas editoriais/judiciais/temporais e eventuais anexos. Não presumir quantidade pelo último artigo. Não excluir texto histórico silenciosamente nem inventar antiga redação quando só há marcador de revogação. Separar cotejo literal de vigência/certificação jurídica; se houver divergência relevante, confrontar fonte oficial e registrar decisão.

## 4. Contratos e implementação a reutilizar

- `lib/catalogo-legislativo.js`: `validate(corpus,previous)` offline; IDs/pais/caminhos/fontes, compatibilidade e manifesto. Norma integral exige `compared/full_norm`, ausência de excertos, `completeness.expectedArticleIds` em ordem, data/digest e anexos `included|not_applicable`.
- Norma: identificador/título/tipo/número/ano/fonte/órgão/data/versão/cobertura; `textVerification` separado de `auditStatus`. `sourceCapture` registra caminho/URL/bytes/digest/normalização. `structure[]` com ID/tipo/pai/rótulo, caminho no artigo; unidades ordenadas com ID/rótulo/texto/tipo/pai. `sourceOrdinal`, notas e links são metadados de rastreio.
- `textStatus`: `veto_placeholder`, `declared_unconstitutional_in_source`, `revoked_in_source`. `article.sourceNotices[{text,url}]` com URL oficial. `law.frontMatterEditorialNotes[{text,sourceLinks}]` guarda nota da ementa fora do corpo; validade desse campo é verificada.
- `scripts/importar-lindb.py`, `importar-lc73.py`, `importar-lrf.py`, `importar-lei9784.py`: específicos de suas capturas; não forçar nova lei neles ou regenerar antigas. Reutilizar abordagem offline, colapso apenas de espaços/HTML e cotejo inverso. L9784 --check já verifica apenas sua norma, sem congelar corte global.
- `tests/leg05-source-check.py` reconstrói 89 blocos, ementa e 11 blocos do fecho; cotejos LEG03/04 preservados. Fixtures `leg01-identidade-s36`, `leg02-manifesto/correcao-legados`, `leg03-manifesto/preservacao`, `leg04-manifesto/preservacao`, `leg05-manifesto/preservacao/leitor-delta` em `tests/fixtures/`. Não sobrescrever baselines; adaptar apenas totais e mudanças mínimas justificadas.
- `leitor-juridico.js`: único leitor, APIs `openLaw(id,restart)`, `chapter(id)`, `boundary(last)`, `article/unit/tab/mobile/note`. URL `?abrir=lei&norma=ID` retoma posição da mesma norma. LEG05 oculta seletor vazio e orienta por artigos quando `structure:[]`; mostra a nota editorial no painel ementa/preâmbulo. Normas com divisões mantêm o seletor. Não inventar estrutura para preencher UI.
- Mudança do leitor na LEG05 foi aditiva e rastreada em `leg05-leitor-delta.json`; hash anterior LEG04 preservado. Caso outra adaptação mínima seja necessária, documentar o novo delta e preservar APIs/dados/testes, sem enfraquecer a verificação de modo genérico.
- Consolidação/S17/Estudo/Caderno/Revisão/Planejamento continuam existentes. S17 tem 18 registros legados; versão do corpus cotejado prevalece sem criar série histórica fictícia. Artigos sem currículo admitem Comentários, sem sessões inválidas ou agenda paralela.

## 5. Persistência e validação

Backup intacto: nove chaves/formatos, 12 MB UTF-8, 500 comentários e restauração só de categorias ausentes. Apesar de 1.085 unidades, não ampliar limites nesta importação. LEG05 aceita 500 notas incluindo LINDB e rejeita 501 sem escrita; não limpar, substituir, mesclar, dividir ou migrar backups. Usar apenas dados/perfis sintéticos, sem tocar no navegador ou backup pessoal.

Executar Node S19/S20/S25–27/S29–35, WORK01 e LEG01–05 (18 suítes anteriores), acrescentando LEG06. Captura/digest, sequência/completude real, hierarquia/sufixos quando presentes, literalidade inversa, ressalvas, tópicos nulos, corpus anterior idêntico e preservação de notas/sessões/backup. Não apagar testes para acomodar a expansão.

Chromium em perfis novos a 320/360/390/430/1280: norma/divisões ou ausência delas, primeiro/último dispositivo, artigo extenso, inciso/alínea/item quando presentes, busca, notas antigas/novas, sessão anterior, home/reload, download/restauração e teclado/foco S29–35. Reutilizar `tests/leg05-browser.cjs` e conservar regressões de todas as normas. **O teste LEG05 ainda espera LINDB como fim global:** com outra norma acrescida, adaptar para provar passagem LINDB→nova norma e retorno, mantendo notas e checagens; não simplesmente apagar a expectativa. LEG04 já verifica a travessia LC73→LINDB e retorno.

Axe: distinguir violations/incomplete/passed e revelar elementos antes de reavaliar sobreposição; não chamar inconclusivo de aprovado. Não declarar Android físico/TalkBack sem teste real. Workflow `.github/workflows/agu-sprint20-ci.yml` mantém todas as regressões e LEG03–05 na URL pública por `AGU_TEST_URL`; acrescentar LEG06 e artefatos. Caminhos de upload foram normalizados em globs explícitos por pasta/extensão; incluir novos globs uma vez, evitando substituir globalmente prefixos de caminhos. Cache só dos assets alterados e expectativas/hashes de `tests/sprint21-pages.cjs`.

## 6. Entrega utilizável e encerramento

Branch e PR próprias; integração após validação/ausência de conflitos, respeitando proteções atuais, sem force push. Reutilizar Pages. Critério: Lei 4.717 incorporada, navegável/pesquisável/anotável/com retomada, e backup recuperável preservando CF/L9784/LRF/LC73/LINDB. Verificar CI, deploy, URL, HTML/hashes e fluxo na URL publicada em contexto isolado. Se bloqueado, distinguir PR testada de produção e indicar a menor ação necessária.

Fechar objetivamente com fonte/versão/cobertura, diferenças justificadas, testes reais e limites, arquivos, branch/commits/PR e URL/estado. Gerar `docs/PROMPT_LEG-07.md` com estado real e um único próximo escopo, pronto para novo chat; encerrar sem executá-lo.
