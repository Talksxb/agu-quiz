# AGU Quiz | Biblioteca de legislação — etapa 07 (handoff; NÃO EXECUTAR agora)

Exige nova autorização expressa. Executar **somente uma** etapa. Repositório `Talksxb/agu-quiz`: verificar `main`, branches, PRs #49–#52, checks, proteção e Pages. A etapa 06 foi empilhada sobre a #51 (que depende da #50); preservar a cadeia sem rebase, force push ou merge automático. Ler relatórios 03–06, `scripts/cotejar-biblioteca-lote04.py`, `tests/test_biblioteca_leis_05.py`, gerador e fixtures de CC/CPC, contrato de armazenamento e backup.

## Missão

Cotejar um lote controlado, preferencialmente **CC e CPC arts. 41–60**, com HTMLs oficiais da Câmara recapturados por HTTPS e metadados de data, HTTP, bytes e SHA-256. Reexecutar lotes 1–5, 6–20 e 21–40 para conferir regressão e estabilidade das fontes. Não contornar CAPTCHA do Planalto. Registrar corte jurídico de observação e distinguir alterações legislativas, publicação, vigência, eficácia e interpretação judicial.

O histórico acumulado das etapas 04–06 é **80 artigos textualmente examinados, 74 coincidências normalizadas, seis diferenças registradas** — CC 3/4/10/20/21 e CPC 12. Dessas, diversas aparentam diferenças apenas de referência editorial; nenhuma deve ser promovida a identidade jurídica sem cotejo de subdivisões, notas e atos modificadores. Na etapa 06 um defeito do extrator que anexava títulos centralizados foi corrigido, reduzindo falsos positivos do lote 21–40 de sete para um. Validar títulos estruturais em HTML diverso e notas fora de parênteses.

## Contratos invariantes

Leitor com uma norma por vez, seletor recolhido, filtro por tags editoriais, índice até 49 artigos e salto por número. Preservar oito normas e IDs, textos, `topic:null` dos códigos sem vínculo certificado, `mirror_unverified`, `partial`, `pending`, uma lista `forNotebook`, nove categorias S20, anotações locais e restauração só de categorias ausentes. Não modificar questões, revisão, cartas, planejamento, dados pessoais ou auditoria privada. Nova legislação depende de outro escopo/autorização.

## Prova e encerramento

Qualquer correção de corpus precisa primeiro de evidência normativa individual e teste que falhe, depois fixture SHA-256 nova encadeada e regressões Node, Chromium 320/360/390/430/1280, axe com violations/incomplete/passed, backup sintético e Pages após merge. Se o trabalho ficar documental/offline, executar apenas regressões correspondentes e **não alegar** ensaios de navegador/produção inexistentes. Branch/PR própria inicialmente em rascunho e, se necessário, empilhada com base realmente verificada. Registrar matriz por ID, fontes e hashes, referências a vigência, CI, PR/merge/Pages reais; preparar prompt da etapa 08 **sem executar**.
