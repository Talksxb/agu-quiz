# Checkpoint — MÉTODO-AGU-001

**Execução exclusiva:** 22/11/2026, America/Sao_Paulo. **Branch:** `feat/metodo-agu-001`. **Base:** `423c54c7def0f4bdf6fb65b74f6fc67e947f8da2`. **Entrega:** [PR draft #78](https://github.com/Talksxb/agu-quiz/pull/78). Nenhuma autorização de merge ou publicação foi utilizada.

## Resultado preparado

| Entrega | Arquivos principais | Situação |
|---|---|---|
| A. Diagnóstico crítico | `METODO_AGU_001_DIAGNOSTICO.md` | Inventário, matriz de reuso, limites e riscos registrados |
| B. Percurso funcional | `index.html`, `livros-agu.html`, `metodo-agu.js`, `metodo-agu.css` | Entrada única; catálogo por disciplina; quatro capítulos; estudar/aplicar/recuperar/revisar |
| C. Contrato | `METODO_AGU_001_INGESTAO.md`, `schemas/metodo-agu/` e `livros/editorial/` | IDs, âncoras, hierarquia, datas, cobertura, fontes, recursos e aprovação por hash |
| D. Pipeline de candidatos | `scripts/metodo-agu.cjs`, `livros/candidatos/`, registros de aprovação | Três candidatos pendentes; nenhum cartão novo aprovado automaticamente |
| E. Coleção Ambiental | `livros/colecoes/ambiental.json` | Nove obras, 11 IDs explícitos; uma publicada, duas produzidas não publicadas, seis posições planejadas |
| F. Testes | `tests/metodo-agu-001-*`, workflow existente | Node, fixture temporária, schemas, Word/PDF, Chromium/axe e regressões históricas |
| G. Procedimento reutilizável | `METODO_AGU_001_INGESTAO.md` | Inclusão por configuração/manifesto, reprocessamento, aprovação e manutenção |
| H. Continuidade | Este checkpoint e a PR | Revisão e decisão de integração são a próxima operação, somente quando autorizadas |

Foram acrescentados fontes Markdown recuperadas dos três leitores que ainda não as tinham, metadados dos quatro capítulos, catálogo gerado, índices contextuais, recursos SVG extraídos do HTML público, relatórios e fixture sintética. O Markdown Ambiental prévio, os quatro JSON originais e o HTML original permanecem preservados. Alterações da navegação/laboratório e do adaptador de dados do motor têm deltas/testes rastreáveis. Não há alteração de `estudo-integrado.js`, do algoritmo de agendamento, das nove categorias do backup ou dos 51 corpos/IDs históricos.

## Commits e verificação

- Primeiro commit remoto: `c0a163c78746612af77208aa86851694f840cb0c` — integração inicial, CI `45093524506`. Node executou; a jornada nova parou em comparação de título numerado no teste, antes das regressões posteriores de navegador. Não é aceite final.
- Segundo commit remoto: `e6e3d2506c94ca0b32aba109bb04e87e801eba7a` — adaptador e snapshots, CI `45094194135`: Node aprovado; navegador parou no início da seleção de outra obra com a mesma quantidade de seções. Corrigidos o estado visual durante carregamento e a espera do teste pela identidade efetiva do capítulo.
- Terceiro commit remoto: `2aba91b050956177d20c462c2ba71a3f9a58f1bb`, CI `45095328071`: Node e exportação aprovados; a nova jornada passou em quatro larguras/72 varreduras. A regressão antiga encontrou âncora anterior gravada ao avançar; defeito corrigido e recarga incluída no teste novo.
- **Referência integrada aprovada:** commit `bb9cee1e79f126feafb9aa18dcbd3cbb1ddc54ad`, [CI 45095569122](https://github.com/Talksxb/agu-quiz/actions/runs/45095569122), `completed/success`: integridade Node, exportação editorial e toda a jornada Chromium histórica concluídas; job de produção corretamente omitido na PR.
- **Fechamento adicional:** proteção de snapshots suspensos também na retomada de sessão interrompida, sem remover sua ordem ou histórico; tentativas de cartões novos registram a versão editorial e preservam esse campo no backup. Cenários sintéticos locais passaram. O delta exato do adaptador está em `tests/fixtures/metodo-agu/review-delta.json`. A CI da PR executa novamente sobre esse fechamento; os checks do HEAD atual, disponíveis na PR #78, governam a aceitação da versão revisada.

Verificação local concluída até este registro: 39 suítes históricas `*-validacao.js`, fidelidade editorial e 14 cenários novos; compilação idempotente em `--check`; schemas; Word/PDF de revisão exportados duas vezes com hashes idênticos; 17 seções, quatro imagens com alternativas e duas tabelas preservadas em Ambiental. Uma página do PDF com diagrama foi renderizada e inspecionada visualmente. O teste de navegador local não iniciou por ausência do executável de Chromium; a CI é o meio de ensaio automatizado das quatro larguras.

## Estados e limites

- **Edições:** AMB-03 1.0/20-11, LGPD 2.0/20-11, ADM-53 e ADM-54 1.0/18-11, 78 blocos públicos ao todo. A migração não reconferiu a atualidade jurídica de todas as obras.
- **Cartões:** 51 históricos preservados. Três IDs conferidos são reutilizados como fundamentos complementares em seis associações; o mesmo ID pode aparecer em quatro capítulos sem multiplicar agenda. Novos candidatos não entram no arquivo de dados aprovado. Ajustes de localizadores/dependências encaminham candidatos para revisão; não representam mudança normativa comprovada.
- **Revalidação:** `livros/relatorios/revalidacao.json` conserva as pendências até decisão editorial. Cartões não recebem novos gabaritos nem histórico reescrito por essa marcação.
- **Aprendizagem:** sem respostas reais do estudante, Caderno novo, revisões realizadas ou domínio curricular. Todas as respostas e agendas produzidas pelos testes são sintéticas.
- **Fontes:** consulta pontual ao edital de abertura e a fontes públicas dos vínculos comuns. Retificações não inventariadas integralmente; nenhuma certificação global ou importação da auditoria privada.
- **Visual:** SVG/tabelas ambientais acessíveis no percurso. Posição e paginação diferem do original; Word/PDF de revisão declaram rasterização e formatação. Hierarquia/imagens/links perdidos nas antigas extrações de PDF de LGPD e ADM-53 não foram inventados.
- **Armazenamento:** mesma chave de livros e motor de revisão, sem migração destrutiva; formato legado e nove categorias S20 preservados. O backup S20 não inclui automaticamente o progresso de livros.
- **Acessibilidade:** a nova jornada fez 72 varreduras, zero violações detectadas. O relatório integral conserva inconclusivos de contraste em células de tabelas parcialmente fora da área de rolagem em telas estreitas; não foram suprimidas regras ou tratadas como conformidade. O artefato da CI de referência é a evidência para cada nó/viewport.
- **Ambiente:** simulação Chromium em 320/390/768/1280 é diferente de Android físico/TalkBack, não executados. Axe sem violações não é certificação WCAG integral; registrar os inconclusivos.
- **Publicação:** PR draft, sem merge/Pages/GPT Sites; edição externa do Sites sem sincronização presumida. Não há login, Azure, banco remoto, servidor permanente ou chave de modelo.

## Próxima execução — não executada

Revisar a PR #78 e o relatório final da CI; avaliar a experiência no aparelho real se desejado; conferir as pendências dos candidatos e dos recursos gráficos históricos. Depois de autorização explícita, decidir integração e verificar a edição efetivamente publicada. Não iniciar outro capítulo nem importar AMB-04/AMB-05 a partir deste checkpoint. Nova ingestão deve seguir o mesmo contrato, com fonte aprovada e revisão própria.
