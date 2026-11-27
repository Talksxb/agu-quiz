# AGU QUIZ | WORK — MÉTODO-AGU-007

**Desbloquear o gate editorial de LIVRO-AMB-002 / AMB-04 — sem ingresso prematuro**

Executar **exclusivamente MÉTODO-AGU-007** quando solicitado em nova execução. Esta instrução foi preparada no encerramento de 006; não constitui autorização para executar 007 durante 006.

## Objetivo e limites

Reconciliar a fonte canônica do capítulo **LIVRO-AMB-002 — Poder de Polícia e Licenciamento Ambiental**, edição 1.0, 22/11/2026, ID curricular **AMB-04** e capítulo proposto **`amb-04`**, obtendo/verificando uma **aprovação editorial expressa e rastreável** somente após exame independente de integridade e riscos jurídicos. Se o material não satisfizer o gate, entregar relatório de diferenças e providência impeditiva; não inventar aprovação.

**NÃO** publicar, mesclar PR, ingerir no catálogo da `main`, criar cartões aprovados, atualizar o progresso real de estudante, modificar a auditoria privada nem alterar infraestrutura nesta execução. É permitida PR draft com **material e metadados ainda pendentes** somente se isso não inserir o capítulo no catálogo público nem quebrar CI; em caso contrário, limitar-se ao relatório documental de revisão. Não gerar outro capítulo para suprir o original.

## Retomada obrigatória

1. Reconfirmar a `main` de `Talksxb/agu-quiz`, as PRs #79/#80, o fechamento de MÉTODO-AGU-005 e a PR draft/checkpoint de MÉTODO-AGU-006; localizar `docs/CHECKPOINT_METODO-AGU-006.md`, `livros/colecoes/ambiental.json`, `livros/editorial/catalogo.json`, `docs/METODO_AGU_001_INGESTAO.md`, `docs/AGU_PADRAO_EDITORIAL_CAPITULOS_v1.md`, o schema e o compilador `scripts/metodo-agu.cjs`. Não tratar hashes antigos como HEAD atual.
2. Aplicar os quatro arquivos finais pedagógicos: Base Mestra v5.2, Leitura Completa v1.1, Caderno/Handoff v2.1 e Leia-me Primeiro v2. Identificar cada fonte consultada, data, edição e estado. A auditoria privada só poderá ser consultada pontualmente, em leitura, se for estritamente necessária; não transportar dados privados para site público.

## Localização e integridade da fonte

1. Recuperar os **bytes originais autorizados**, não apenas o texto indexado, de `LIVRO-AMB-002.md`, `LIVRO-AMB-002.json`, `LIVRO-AMB-002_HANDOFF_EDITORIAL.md` e `LIVRO-AMB-002_FONTES_E_QUALIDADE.md`, mais os recursos efetivamente presentes (quatro fluxos Mermaid editáveis, tabelas e, para inspeção visual subsidiária, PDF). Verificar se o acervo está acessível no contexto de execução; usar download de uma fonte autorizada quando possível. Se bytes canônicos não puderem ser recuperados, registrar essa limitação e **não fabricar SHA-256**.
2. Calcular SHA-256 por arquivo e um inventário com extensão, bytes, edição, origem, data e localizador. Verificar se a íntegra do Markdown corresponde ao JSON de 27 páginas, incluindo 21 seções numeradas, texto e hierarquia, remissões F1–F20, 10 questões autorais, gabaritos, 10 perguntas de recuperação, quatro Mermaid, tabelas e parecer AGU. O cotejo extraído em 006 indicou igualdade textual com um LF final excedente no JSON; reproduzir o teste nos **bytes canônicos** e explicar qualquer diferença, sem perda disfarçada.
3. Reconciliar identidade e manifesto: **LIVRO-AMB-002 é o número editorial, AMB-04 é o ID curricular**; não mover para AMB-02 por semelhança de números. O título abreviado da coleção não elimina os cinco segmentos literais do edital.

## Revisão jurídica e decisão editorial separadas

1. Conferir as normas primárias oficiais decisivas com data e localizador, especialmente CF/88 art. 225 e competências federativas; LC 140/2011; Lei 15.190/2025, com atenção aos arts. 14, 60 e 65, vetos e transição; Lei 15.300/2025; Lei 9.985/2000, art. 36; Decreto 4.340/2002; Lei 11.105/2005; Lei 9.605/1998 e Decreto 6.514/2008. Distinguir a data de vigência e a época do caso.
2. Examinar em fontes oficiais o alcance das ADIs 4.757 e 3.378, possíveis decisões posteriores sobre a Lei 15.190/2025, e o entendimento do STJ sobre responsabilidade administrativa ambiental. Não declarar trânsito, modulação ou resultado constitucional sem documento efetivamente verificado. Registrar limitações sobre CONAMA, CTNBio, LAE/LAC e retificações do edital.
3. Elaborar matriz por segmento de AMB-04, seção, fundamento, dependências e risco (alto/médio/baixo) e relatório de fidelidade de texto, tabelas, diagramas, perguntas, gabaritos e casos. Uma pendência jurídica crítica impede declarar a edição atual como integralmente revisada; se necessário, propor correção **em versão nova com diff**, preservando a edição 1.0 original.
4. Buscar uma decisão editorial **expressa de aprovador competente** sobre a edição e hash de entrada. A conclusão anterior “apto como capítulo autoral de estudo”, a existência de PDF/JSON e a validação sintática **não são aprovação de publicação**. Se não houver ato verificável de aprovação, manter `approval.status` pendente e produzir uma solicitação precisa de sign-off, com lista de evidências e pendências; não agir como se autorização viesse da mera execução desta tarefa.

## Preparação técnica somente se o gate for comprovado

Se e somente se houver bytes originais confiáveis, fidelidade comprovada, matriz de risco satisfatória e aprovação documentada vinculada ao hash correto:

- Preparar `livros/fontes/`, recursos, `livros/editorial/amb-04.json` e eventual alteração específica da posição no manifesto, por meio do **mesmo pipeline** `scripts/metodo-agu.cjs`; não editar manualmente motor, backup ou agendas, nem adicionar HTML isolado.
- Reutilizar cartões existentes antes de propor candidatos; os novos permanecem pendentes de revisão e deduplicação. Não aprovar cartões por transposição.
- Validar compilação idempotente, cobertura, dependências, geração de `dados/metodo-agu-referencias.js`, regressões Node e Chromium nos viewports 320/390/768/1280, axe e inconclusivos; preservar os quatro capítulos e 51 cartões históricos confirmados na base de 006.
- Criar **PR draft**, sem merge/publicação, com fonte/edição/hash, aprovação e sign-off rastreáveis, matrizes, deltas, testes, artefatos e checkpoint. Se qualquer gate falhar, produzir PR apenas documental e descrever exatamente a pendência.

## Entrega e próxima execução

Entregar resumo decisório: fontes e seus hashes efetivamente aferidos, comparativo Markdown/JSON/PDF, rastreabilidade editorial, riscos e retificações examinados, estado de aprovação, PR draft e HEAD/CI, limites, checkpoint e **prompt completo da próxima execução**. Não elevar cobertura curricular por conexões, não certificar auditoria integral e não inferir leitura ou domínio do aluno.