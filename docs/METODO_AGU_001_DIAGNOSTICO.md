# MÉTODO-AGU-001 — diagnóstico e decisões

Data: 22/11/2026, America/Sao_Paulo. Base pública reconfirmada: `423c54c7def0f4bdf6fb65b74f6fc67e947f8da2`, branch de trabalho `feat/metodo-agu-001`, [PR draft #78](https://github.com/Talksxb/agu-quiz/pull/78). Nenhum merge ou deploy está autorizado nesta execução.

## Fontes de governança e limites

Foram lidos os quatro documentos finais do Projeto (Base Mestra v5.2, Padrão de Leitura Completa v1.1, Caderno/Handoff v2.1 e Leia-me Primeiro v2), o padrão público `AGU_PADRAO_EDITORIAL_CAPITULOS_v1.md`, checkpoints LIVROS-LEIT/LIVROS-EDITOR, CARTOES-AUD-01–03 e UX-BARALHOS, seus testes e a arquitetura efetiva. A consulta pertinente à auditoria foi somente de leitura: nenhum arquivo, matriz ou payload de evidência privada foi transportado para esta PR. As consultas não atualizam o direito de todos os capítulos nem certificam currículo ou aprendizagem.

A lista de branches e PRs abertas foi consultada. Permaneciam, entre outras, a cadeia documental Biblioteca 17–23 e frentes antigas de Estudo Integrado e biblioteca autenticada em rascunho. Esta implementação parte da main indicada, sem incorporar essas branches por inferência. O checkpoint antigo LIVROS-EDITOR-001 descreve uma PR ainda não integrada à época: isso é histórico; seus arquivos já existem na main de partida desta tarefa.

## Acervo efetivamente disponível

| ID do leitor | Obra | Edição preservada | Blocos | Fonte disponível |
|---|---|---|---:|---|
| `lgpd-adm64b` | LGPD na Administração Pública, ADM-64b | 2.0, 20/11/2026 | 24 | Transcrição pública de PDF; imagens e hiperlinks originais não certificados |
| `adm-53` | Responsabilidade patrimonial do Estado, ADM-53 | 1.0, 18/11/2026 | 20 | Transcrição pública de PDF; paginação histórica preservada nos blocos |
| `adm-54` | Agentes públicos, ADM-54 | 1.0, 18/11/2026 | 17 | Markdown nos dados de leitura |
| `amb-03` | Competências e Cooperação Ambiental, LIVRO-AMB-001 | 1.0, 20/11/2026 | 17 | Markdown editorial, JSON e HTML original com quatro SVG e duas tabelas |

Os quatro JSON originais e o HTML Ambiental permanecem byte a byte preservados. Os três Markdown acrescentados recuperam literalmente os blocos públicos; não se apresentam como reconstrução dos Word/PDF originais. Aparato, metadados e texto de origem são distinguidos no relatório. A coleção não declara AMB-01/02/04 cobertos só por serem conexões de AMB-03.

## Matriz existente → reutilizável → mudança necessária → risco

| Existente | Reutilizável | Mudança necessária neste lote | Risco e controle |
|---|---|---|---|
| Três cartões verdes em `index.html` | Biblioteca e seus demais destinos | Uma entrada Método AGU para `livros-agu.html` | Destinos antigos preservados dentro do percurso; delta exato protege o restante da Home |
| Apostila no GPT Sites | Link para a edição externa | Acesso secundário com edição de referência explícita | Nenhuma sincronização ou republicação presumida; alterações do site externo não são feitas aqui |
| `livros-agu.html` | Renderizadores, cronômetro, ritmo guiado, seletor e progresso | Catálogo por disciplina, texto contínuo integral e atividades contextuais | Mesmos blocos e IDs; sem substituir o leitor por outro sistema |
| Manifesto fixo de quatro caminhos dentro do leitor | Caminhos e links profundos antigos | Catálogo gerado por configuração; fallback legado | Um capítulo futuro entra por manifesto, sem editar HTML/JS |
| `laboratorio-leitura.html` | Exercícios, medição metacognitiva e histórico isolado | Entrada opcional e retorno ao capítulo escolhido | Fluência não é domínio; histórico do laboratório permanece na chave original |
| `estudo-integrado.js` | Sessões por dispositivo legal e referências ao Caderno | Preservado, sem migrar capítulo para uma falsa sessão por inciso | Não há correspondência automática capítulo↔dispositivo; nenhum registro ou hora criado pela navegação |
| `revisao-inteligente.js` | Seleção, revelação, avaliações e intervalos 1/7/21/45 | Adaptador opcional para snapshots editoriais aprovados/suspensos | Agendamento e gravação preservados; delta reversível prova a igualdade do corpo histórico fora da adaptação |
| 51 cartões históricos em quatro lotes e no motor | IDs, texto, histórico e agendas | Vínculos editoriais separados; três IDs reutilizados em seis associações | Nem todos os 51 tinham o mesmo status de verificação; apenas vínculos conferidos entram no novo painel |
| Markdown Ambiental com 17 marcadores | Texto e referências integrais | Metadados externos, âncoras estáveis, recursos vinculados por seção | SVG tem correção explícita da caixa de atributos XML; conteúdo gráfico não redesenhado |
| Quatro SVG e duas tabelas no HTML original | Ativos e células originais | Ampliação, enquadramento e alternativas lineares | Mudança de posição/paginação declarada; alternativa não substitui silenciosamente a figura |
| `agu_livros_reader_v1` | Página, marcações e atualização local | Extensões opcionais: preferências, âncora, rascunhos e atividade declarada | Merge por registro; inválido/quota não substituem bytes; edições anteriores de marcações são preservadas |
| Backup S20 com nove categorias | Contratos, IDs e restauração históricos | Preservado | O progresso de livros já era externo às nove categorias; não alegar que esse backup passou a exportá-lo |
| Dados de edição e de revisão separados | Proveniência e tentativas existentes | Hash e dependências fonte→seção→atividade→cartão | Mudança não apaga avaliações; cartão dependente é suspenso/encaminhado à revisão |
| Testes históricos com rótulos antigos | Jornadas e hashes históricos | Atualizar apenas a navegação e os pontos de injeção de fixtures | Não apagar expectativas; cadeia de deltas e novo teste protegem o contrato anterior |

## Três tipos de dados

**Editorial:** Markdown, metadados, recursos, cobertura declarada, fontes e aprovação por hash. É versionado, público apenas quando aprovado e independente do estudante.

**Leitura e atividades:** posição, marcações explícitas, preferências, rascunhos e data de realização declarada. Permanecem locais na chave de livros. A rolagem pode guardar posição; não marca página concluída, resposta correta ou domínio. Rascunho não salvo sobrevive à troca de atividade durante a página aberta; persistência entre recargas depende de Guardar rascunho.

**Revisão:** somente o motor existente grava tentativas, facilidade e vencimentos na chave original. Abrir um cartão ou revelar resposta não avalia. IDs iguais entre capítulos consultam a mesma agenda. Não há estado de domínio inferido desse caminho.

## Arquitetura estática: o que já cabe e o que exige outro recurso

| Integração | Situação |
|---|---|
| Catálogo, capítulos, atividades, SVG/tabelas, ajustes e retomada local | Implementada em arquivos estáticos |
| Compilação, aprovação por hash, deduplicação e encaminhamento de dependentes | Scripts locais e CI, sem servidor permanente |
| Word/PDF para revisão | Exportador opcional; não publica e informa as diferenças de apresentação |
| Conferir automaticamente vigência e alcance de cada link | Não implementado; URL válida e teste estrutural não são conferência jurídica |
| Propor cartões com IA | Pode auxiliar o editor; não há API de modelo/chave no navegador nem aprovação automática |
| Sincronizar progresso entre dispositivos ou ler conversas privadas | Exigiria infraestrutura e autorização próprias; fora do escopo |
| Escrita colaborativa em tempo real/autenticação/segredo no Pages | Não oferecida pela arquitetura estática atual |
| Reutilizar a mesma edição no GPT Sites | Requer publicação explícita e cotejo dos artefatos/hash em cada canal; integração de implantação não testada aqui |

Os fundamentos institucionais comuns reutilizados não substituem cartões específicos de cada obra. Há três candidatos ambientais nesta edição de desenvolvimento, todos pendentes. Sua quantidade não mede qualidade ou cobertura. Os demais capítulos poderão fornecer proposições explícitas após revisão; não se extrai um cartão por parágrafo.

## Coleção Ambiental

O manifesto propõe nove posições editoriais com agrupamentos AMB-01/02 e AMB-09/10. Os 11 IDs têm subitens explícitos do edital de abertura, p. 42, aberto em 22/11/2026; não houve inventário integral de retificações nesta tarefa. AMB-03 é a única obra da coleção publicada no Quiz. Os handoffs de LIVRO-AMB-002/AMB-04 e LIVRO-AMB-003/AMB-05 foram consultados apenas para o estado produzido/não publicado: esses capítulos não foram importados. As demais posições são planejamento técnico proposto, sem obra fictícia nem porcentagem inflada.

Uma fixture técnica adicional entra em diretório temporário pelo mesmo compilador, demonstra novo capítulo/edição e é recusada no modo normal de publicação. Acrescentar a décima posição não altera o leitor nem a forma do manifesto.
