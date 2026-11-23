# AGU QUIZ | WORK — MÉTODO-AGU-008

**Resolver a proveniência dos bytes e a decisão editorial formal de LIVRO-AMB-002 / AMB-04**

Executar **exclusivamente MÉTODO-AGU-008**, quando solicitado. Não executar etapas posteriores por antecipação.

## Missão e impedimentos de partida

A revisão 007 localizou integralmente o Markdown de \`LIVRO-AMB-002\`, edição 1.0 (22/11/2026), com conteúdo compatível com JSON de 27 páginas na camada de texto indexado. Entretanto, cinco arquivos da Biblioteca não dispunham de caminho autorizado para obter **bytes originais**; a inspeção visual do PDF não pôde ser concluída; e não foi localizada **aprovação editorial expressa ligada ao hash de entrada do pipeline**. O capítulo permanece \`produzido/revisão pendente/não publicado\`.

Sua missão é remover comprovadamente esses impedimentos, em vez de reconstruir um capítulo novo ou publicar material não aprovado. Se qualquer gate não puder ser satisfeito, limitar-se a documentação e handoff preciso.

## Retomada obrigatória

- Reconfirmar HEAD/árvore de \`main\` em \`Talksxb/agu-quiz\`, CI, deploy, PRs #79/#80 (mescladas), PR draft #81 (MÉTODO-AGU-006) e PR draft de MÉTODO-AGU-007. Ler **integralmente** \`docs/CHECKPOINT_METODO-AGU-007.md\`, \`docs/CHECKPOINT_METODO-AGU-006.md\`, \`docs/METODO_AGU_001_INGESTAO.md\`, \`docs/AGU_PADRAO_EDITORIAL_CAPITULOS_v1.md\`, schema e \`scripts/metodo-agu.cjs\`, catálogo e coleção Ambiental.
- Aplicar Base Mestra 5.2 FINAL, Leitura Completa 1.1 FINAL, Caderno/Handoff 2.1 FINAL, Leia-me Primeiro 2 FINAL. Não inferir sincronização entre Biblioteca pessoal, Projeto, Drive, GitHub, Sites, Quiz ou chats. Não transportar auditoria privada ao repositório público.

## Etapa 1 — pacote original, identidade e hashes verificáveis

1. Procurar de forma **autorizada e específica** os bytes de \`LIVRO-AMB-002.md\`, \`LIVRO-AMB-002.json\`, \`LIVRO-AMB-002.pdf\`, \`LIVRO-AMB-002_HANDOFF_EDITORIAL.md\` e \`LIVRO-AMB-002_FONTES_E_QUALIDADE.md\`, além dos quatro fluxos editáveis e demais recursos efetivamente identificados. Usar um upload direto da fonte pelo responsável ou URL/ID de armazenamento autenticado **confirmado**, se a Biblioteca continuar expondo só texto indexado. Não usar OCR, PDF ou texto reextraído como substitutos silenciosos de fonte estruturada disponível.
2. Registrar, para cada arquivo, caminho/URL de origem, edição, tamanho bruto, SHA-256 calculado sobre os **bytes originais**, encoding e diferenças se houver. Nunca inventar hash. Preservar a edição 1.0.
3. Confrontar Markdown e JSON em 100% das 27 páginas, 21 seções numeradas, quatro Mermaid, tabelas, 10 questões autorais e gabaritos, 10 prompts de recuperação/respostas, parecer, links e F1–F20. A revisão 007 verificou apenas igualdade de texto indexado com um LF final excedente no JSON; agora exigir comparação byte a byte ou normalização de fim de linha explicitamente descrita. Inspecionar PDF renderizado como prova gráfica **subsidiária**, inclusive layout e diagramas, sem confundi-lo com original canônico.
4. Reconciliar **LIVRO-AMB-002 (editorial)**, **AMB-04 (curricular)** e \`amb-04\` (capítulo futuro), mantendo literalmente os cinco segmentos do edital da p. 42 e sem inflar cobertura por conexões.

## Etapa 2 — revisão jurídica focada e sign-off separado

1. Usar o mapa de risco 007 para reabrir apenas as fontes oficiais pertinentes e suas alterações, dando prioridade ao art. 65 da Lei 15.190/2025 e sua relação com LC 140/2011/ADI 4.757; LAC/LAE e Lei 15.300/2025; art. 36 SNUC/ADI 3.378 e embargos; Lei 11.105/2005; Lei 9.605/1998 e Decreto 6.514/2008; entendimento STJ do EREsp 1.318.051. Reconfirmar **as ADIs 7.913/7.916/7.919 conforme a data real da nova execução**, sem presumir julgamento ou resultado agendado.
2. Registrar por seção o texto exato da edição 1.0, fonte, data, ratio/efeito, divergência e risco, distinguindo norma consolidada, interpretação judicial e hipótese editorial. Não reescrever silenciosamente o original. Se precisar corrigir conteúdo, preparar **nova edição com diff**, pendências e fontes, mantendo a anterior.
3. Solicitar/recuperar decisão editorial **expressa e verificável** do responsável por revisar/publicar, identificando obra, edição, escopo, revisor, data, riscos aceitos/restrições, ativos e hash \`inputSha256\` calculado pelo compilador (Markdown + metadados sem \`approval\` + hashes de recursos). **“Apto para estudo”, hash isolado, execução autorizada e teste de sintaxe não constituem aprovação.**
4. O schema de \`livros/editorial/amb-04.json\` exige \`approval.status='aprovado'\`; não criar metadados declarando \`aprovado\` antes do ato. Se sign-off faltar, manter o capítulo fora do catálogo, especificar a providência necessária e concluir com PR **somente documental**.

## Etapa 3 — preparar integração apenas se todos os gates passarem

- Em branch própria, sem publicação, usar o mesmo \`scripts/metodo-agu.cjs\`: fonte em \`livros/fontes\`, recursos em \`livros/recursos\`, metadados aprovados, posição já prevista na coleção Ambiental e catálogo. Não criar segundo motor, leitor especial nem armazenamento novo.
- Testar idempotência, fidelidade, matriz de seção→atividade→cartão, referências de backup geradas, deduplicação com os cartões existentes e preservação integral de IDs, histórico e agendas. Novos cartões permanecem candidatos até aprovação separada.
- Rodar CI Node e Chromium em 320/390/768/1280 px com dados sintéticos, testar axe e registrar inconclusivos. Confrontar HEAD exato; criar PR **draft**, sem merge/deploy. Se houver bloqueio, trabalhar só nos documentos de diagnóstico, sem compromisso de publicação.

## Entrega e continuidade

Entregar checkpoint rastreável e relatório de cada gate, hashes **efetivamente calculados** ou motivos concretos de ausência, fontes oficiais e riscos, tabela de fidelidade inclusive recursos visuais, aprovação/signer e versão, PR/branch/CI, escopo de dados preservados e prompt integral da próxima execução escolhido pela necessidade demonstrada. Não registrar estudo, progresso, domínio ou certificação integral de auditoria por mera produção editorial. Não modificar \`Talksxb/agu-auditoria\`, não sincronizar GPT Sites, não aprovar cartões automaticamente, não mesclar nem publicar nesta etapa.