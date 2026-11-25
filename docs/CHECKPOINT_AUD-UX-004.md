# AUD-UX-004 — Recursos por assunto curricular

25/11/2026, America/Sao_Paulo. Terceira sprint expressamente autorizada no pedido AUD-UX-002–004. Base dependente: PR #107, HEAD 6bd165c2b276025e6c54daddf75a0b0d8bec85f9; PRs #105/#106 ainda não integradas. Main observada e5436bb071afe0967d29665c0ad042beb084ee13. Branch/PR própria; sem merge, publicação ou sprint adicional.

## Resultado

O Mapa Curricular ganha um índice de recursos por igualdade exata do ID. Reutiliza cartões, leitor, legislação, lote vigente e banco histórico existentes. São 214 IDs presentes nos recursos públicos em execução; não são uma cópia nem declaração de cobertura integral dos 412 IDs originais. A conferência local desses 214 códigos contra a identidade da matriz original encontrou zero códigos desconhecidos. A matriz privada e suas evidências não fazem parte do pacote público.

Quando o aluno já importou uma matriz estruturalmente válida, o painel aproveita seus 412 IDs e títulos localmente, sem atribuir estudo ou domínio. Sem matriz, usa apenas os vínculos públicos. Os 43 agrupamentos antigos e os valores de progresso foram conservados. “0 evidências” passa a explicitar evidências locais de aprendizagem; “Não iniciado” é exibido como ausência de estudo registrado neste navegador, sem confundir isso com auditoria jurídica. Os valores persistidos não foram renomeados.

Quatro capítulos já aprovados recebem seus IDs curriculares no arquivo de referências gerado: ADM-53, ADM-54, ADM-64b e AMB-03. Alteração restrita aos metadados; nenhum manuscrito, página ou livro foi refeito. A edição ampliada de LIVRO-AMB-001 e os demais sete manuscritos recuperados não foram importados ou publicados.

Cartões abrem o baralho pelo mecanismo existente e preservam a escolha quando há sessão interrompida. Questões vigentes abrem a questão indicada sem criar tentativa. Legislação abre a unidade exata. Referências históricas mantêm o portão do PDF original e as anulações; três itens históricos sem ID permanecem sem ligação artificial (397 vínculos, 400 referências no banco). Fonte histórica não se torna aprovação atual.

## Defeitos adicionais comprovados

A expressão regular antiga do importador rejeitava os IDs reais ADM-18a, ADM-18b, ADM-64a e ADM-64b. O importador e o validador de vínculos do backup agora aceitam o sufixo literal minúsculo, preservando os códigos, a unicidade e todas as contagens anteriores. Antes: a identidade real dos 412 IDs era recusada em ADM-18a. Depois: 412 IDs/14 disciplinas aceitos. Não foram gerados IDs substitutos.

O novo seletor inicialmente excedeu a largura em 320 pixels. A largura mínima do seletor e a coluna do componente foram restringidas; o teste de reflow passou em todas as cinco larguras. Nenhum estilo global foi substituído.

O cotejo documental encontrou oito ligações de derivados JSON do inventário anterior usando o ID interno do livro no parâmetro file_id. As dezesseis ocorrências foram corrigidas com os identificadores reais dos metadados recuperados; todas as ligações de arquivos do inventário foram confrontadas com esse índice. Conteúdo e hashes dos manuscritos permanecem os mesmos.

## Verificação e limites

- Validação Node: identidade exata; quatro aprovações editoriais; sete questões elegíveis; 397 referências com ID; separação ADM-06/ADM-60; sufixos, duplicidade e injeção; restituição exata dos deltas e rejeição de adulterações.
- Chromium 158.0.8127.0 em 320, 360, 390, 430 e 1280 pixels: assunto, foco, teclado, toque emulado, links exatos, ausência de recurso, sessão de cartões preservada, recarga, PDF obrigatório e nenhuma tentativa criada por abrir conteúdo. Dez scans axe sem violações ou inconclusivos remanescentes após reconferência. Rotina nova: 7,789 s nesta execução local.
- Conferência adicional local, fora do pacote público: importação pela interface de uma projeção mínima dos 412 IDs originais/14 disciplinas, recarga e seleção de ADM-64b; registros anteriores preservados. Não contém a íntegra das evidências jurídicas nem certifica o edital. O teste público de 412 linhas é explicitamente sintético para reproduzir a regra estrutural; não é uma matriz curricular publicada.
- Validações cumulativas: 51/51 comandos Node, incluindo geração editorial, preservação de fontes, questões AU2015/AU2023/PF2023 e lote vigente. SHA e CI finais ficam na PR, com pendência tratada como pendência.

Sem algoritmo, agenda, histórico ou Caderno paralelo. Não houve importação de aprendizagem de aulas do ChatGPT. Sem teste de Android físico ou TalkBack. A auditoria privada permaneceu somente leitura; Constitucional em produção paralela não foi acessado.

## Continuidade

Revisar a pilha #105 → #106 → #107 → PR desta sprint, verificando o HEAD exato e os checks a cada retarget/integração. Não publicar antes dos controles aplicáveis. A revisão jurídica/editorial dos oito manuscritos e a aprovação individual de novos cartões/questões permanecem tarefas próprias; não foram executadas por esta sprint.
