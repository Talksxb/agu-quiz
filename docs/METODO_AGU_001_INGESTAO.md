# Método AGU — contrato e procedimento de ingestão v1

Este procedimento vale para qualquer disciplina. Segue o padrão editorial público v1, subordinado aos quatro documentos pedagógicos finais do Projeto. Uma edição publicada não equivale a fonte atualizada integralmente nem a aprendizagem demonstrada.

## Fonte canônica e artefatos

| Papel | Local | Regra |
|---|---|---|
| Prosa original e hierarquia | `livros/fontes/<id>.md` | UTF-8, front matter e blocos estáveis; nunca usar PDF como primeira fonte quando há texto estruturado |
| Metadados e estrutura | `livros/editorial/<id>.json` | Contrato `schemas/metodo-agu/capitulo.schema.json`; identifica texto por marcadores, sem duplicar a prosa |
| Recursos | `livros/recursos/` | SVG inerte, tabelas estruturadas, alternativa substantiva e seção de origem |
| Lista de obras aprovadas | `livros/editorial/catalogo.json` | Um caminho por capítulo; não é necessário editar o leitor |
| Planejamento da coleção | `livros/colecoes/ambiental.json` | Produção, revisão e publicação independentes; navegação livre |
| Dados do leitor legado | `livros/<id>.json` | Gerados dos blocos canônicos; conserva o schema de leitura |
| Índice contextual | `livros/metodo/<id>.json` | Seções, âncoras, fontes, recursos, atividades e referências a cartões |
| Catálogo de disciplinas | `livros/catalogo.json` | Gerado; inclui somente os capítulos aprovados da configuração |
| Proposições candidatas | `livros/candidatos/cartoes.json` | Geradas de proposições explícitas; não são carregadas no motor |
| Aprovação de cartões novos | `livros/editorial/cartoes-aprovados.json` | Snapshots revisados, com versão, prova de conferência e hash; vazio nesta execução |
| Reuso de cartões existentes | `livros/editorial/cartoes-vinculados.json` | Referências a IDs históricos ou editoriais já aprovados, com alcance do vínculo e dependências |
| Dados aprovados para o motor | `dados/flashcards-editoriais.js` | Somente snapshots aprovados; suspensos conservam identidade para histórico, sem entrar na seleção ativa |
| Relatórios | `livros/relatorios/` | Hashes, diferenças de apresentação e dependências a revalidar |

O Word é um formato de revisão humana. Comentários ou edições recebidos em Word precisam ser consolidados explicitamente no Markdown e nos metadados, com diff e nova revisão; não existe importação automática de alterações de Word nem prevalência de um PDF sobre o original estruturado.

## Metadados e identidade

O arquivo JSON contém `id`, `editorialId`, `curricularIds`, `discipline`, `title`, `edition`, `metadataVersion`, `dates`, `verification`, `coverage`, `sections`, `sources`, `resources`, `activities`, `propositions` e `approval`. As datas de edição, consulta jurídica, migração e corte histórico são diferentes. `legalConsultation` admite uma declaração histórica explícita quando a migração não reconferiu a fonte. `verification.gaps` é obrigatório.

O front matter do Markdown usa JSON (subconjunto de YAML) ou o YAML plano já empregado em AMB-03. O compilador recusa sintaxe YAML complexa em vez de tentar interpretá-la parcialmente. Identidade, edição e IDs curriculares têm de concordar com os metadados.

Cada seção tem `id` estável, `marker` e `title`. Exemplo de delimitadores:

```markdown
<!-- AGU_EDITOR_SECTION_START:fundamentos -->
## Fundamentos

Prosa original aprovada, com qualificações e referências.
<!-- AGU_EDITOR_SECTION_END:fundamentos -->
```

O ID de seção não deve mudar ao alterar a ordem. Marcadores legados `01`–`24` são identidades históricas dos blocos, não uma instrução para renumerá-los em toda edição. H1–H6 são preservados no índice semântico; fontes que vieram de extração textual têm sua limitação declarada e não recebem uma hierarquia jurídica inventada.

`coverage` relaciona ID curricular, subitem literal, seções e alcance delimitado/parcial/planejado. Um vínculo transversal não altera o denominador do edital. Não se calcula domínio ou porcentagem curricular contando livros, perguntas ou cartões.

## Incluir um capítulo aprovado

1. Receber a edição aprovada e conferir seu escopo. Usar o Markdown original; se só existe transcrição de um acervo já público, identificar a migração e suas perdas. Não copiar evidência privada para o repositório público.
2. Salvar o Markdown em `livros/fontes/` e os recursos em `livros/recursos/`. Acrescentar marcadores estáveis e conferir todas as seções, tabelas, figuras, questões e fontes. Texto fora dos marcadores é aparato editorial e não será silenciosamente incorporado à prosa do leitor.
3. Criar os metadados por configuração, usando um dos quatro exemplos e os schemas. Declarar fontes com URL oficial específica, localizador, data, status, alcance e revisão; validar subitens de cobertura e lacunas. Uma URL bem formada não comprova a vigência.
4. Descrever atividades com seletores exatos `sectionId`, `start` e `end`, eventualmente em várias seções. O compilador recusa seletores ausentes ou ambíguos. Não duplicar pergunta e comentário manualmente em outra obra: referenciá-los no texto de origem. Aplicação e recuperação têm a resposta separada da hipótese.
5. Descrever apenas proposições relevantes em `propositions`, com categoria, tipo cognitivo, chave semântica, atividade e fontes. Pode haver zero candidatos; não existe número-alvo por página.
6. Fazer a conferência editorial/jurídica do recorte e registrar aprovação do hash de entrada. O hash inclui Markdown inteiro, metadados sem o próprio campo de aprovação e bytes dos ativos. Calcule-o com o módulo, revise o diff e registre o resultado; o compilador não concede aprovação.
7. Acrescentar o caminho em `livros/editorial/catalogo.json` e a posição correspondente no manifesto da coleção, quando houver. Um capítulo pode ter vários IDs curriculares; conexões permanecem separadas da cobertura.
8. Executar a compilação e examinar `livros/relatorios/<id>.json`, candidatos e dependentes. Para alteração restrita de uma obra, use `--chapter <id>`; o catálogo continua montado por dados, sem reconstruir ou editar outros capítulos.
9. Gerar Word/PDF de revisão se necessário e conferir o relatório de diferenças, inclusive recursos. Rodar regressões e a jornada Chromium. A fixture técnica em `tests/fixtures/metodo-agu/` demonstra o processo em diretório temporário e é proibida no catálogo público real.
10. Criar PR draft com edição, hash, mudanças, fontes, lacunas e testes. Publicar os artefatos aprovados somente depois da revisão e da autorização de integração. Esta tarefa não autoriza merge nem implantação.

Comandos:

```bash
node scripts/metodo-agu.cjs
node scripts/metodo-agu.cjs --check
node scripts/metodo-agu.cjs --chapter amb-03
node tests/metodo-agu-001-validacao.cjs
node tests/metodo-agu-001-browser.cjs
python3 scripts/exportar-metodo-agu.py --chapter amb-03 --out /tmp/agu-revisao
```

O compilador não exige rede nem dependências Node externas. O exportador opcional usa python-docx, reportlab, PyMuPDF e a fonte DejaVu Serif. Word/PDF gerados são cópias de revisão, com paginação própria, SVG rasterizado e alternativa textual; os delimitadores Markdown inline permanecem visíveis para cotejo. O relatório informa isso e conserva hashes de cada seção. Não se afirma reprodução gráfica do Word/PDF histórico de LGPD ou ADM-53.

## Aprovação, idempotência e atualizações

O portão `approval` precisa apontar para o hash realmente revisado e ter registro verificável no controle de versão/revisão da PR. É um controle editorial de integridade, não assinatura digital nem autorização criptográfica de uma pessoa. Os validadores locais verificam forma, relações e hashes; revisão de conteúdo continua necessária.

`--check` não escreve. Reprocessar a mesma configuração não altera bytes, não cria outra obra e não cria cartões novos. Todos os dados são preparados antes de começar a gravação dos artefatos; a publicação do site ocorre pela revisão/commit integral. Falha de disco durante a gravação local ainda exige repetir o processo e conferir o diff, não publicar a árvore parcial.

Alterar prosa, ordem ou identidade de seção exige nova edição e preservação do índice anterior em `livros/historico/`. Mudança apenas do aparato, sem alterar os hashes/ordem das seções, exige nova `metadataVersion`. As marcações do leitor levam edição e âncora; o estado antigo é conservado ao iniciar marcações de outra edição. Uma seção removida não é convertida automaticamente em outra competência.

Modificar fonte, dispositivo, precedente ou texto dependente gera encaminhamento em `revalidacao.json`. Vínculos históricos cujo snapshot de seção/fonte diverge ficam em revisão e saem do painel contextual. Snapshots editoriais novos são suspensos, conservando ID e histórico. Revalidar exige decisão explícita e versão. Se a resposta de um cartão já publicado mudar, registrar versão nova e o snapshot anterior em `previousVersions`; o compilador rejeita remoção silenciosa e alteração sem histórico.

Os relatórios acumulam pendências de revalidação até decisão editorial; limpar ou resolver uma pendência exige registro na revisão da PR. Não se edita histórico de respostas do estudante para refletir o texto novo.

## Pipeline dos cartões

`Capítulo aprovado → proposições explícitas → candidatos → conferência jurídica/editorial → deduplicação → snapshot aprovado → mesmo motor de revisão.`

O contrato de candidato está em `schemas/metodo-agu/cartao.schema.json`. Inclui ID estável, capítulo/seção/IDs curriculares, pergunta, resposta, fontes e localizadores, data/alcance de verificação, natureza, edições, status, categoria, tipo cognitivo e dependências. Origem oficial exige prova, identificação do item e gabarito comprovados. Uma adaptação continua adaptada; cartão autoral ligado à prova de 2015 não se torna enunciado oficial.

As categorias são abertas: conceito/fundamento, requisito/consequência, regra/exceção, distinção, jurisprudência/limites, competência/procedimento, caso, regime temporal e erro frequente são exemplos. A IA pode sugerir proposições; o gerador sempre começa em `candidato`. Um snapshot só entra na revisão após registro separado de aprovação, conferência pontual das fontes e hash do conteúdo. Não há ação “aprovar todos” automática.

A deduplicação sinaliza pergunta/resposta normalizadas, pergunta já histórica e chave semântica declarada pelo editor. Não promete equivalência semântica jurídica completa. Fundamento comum reutiliza o ID; exceção distinta pode justificar outro cartão; duplicata pede decisão; alteração comprovada gera revalidação. Uma duplicata detectada não avança como snapshot novo.

Nesta execução os 51 cartões históricos conservam seus corpos e IDs. Três deles, com fontes pontualmente reconferidas, são vinculados como fundamentos complementares; isso não certifica a obra nem substitui cartões específicos. Três novos candidatos ambientais aguardam conferência. O arquivo de snapshots novos aprovados está vazio: os testes de aprovação/suspensão usam exclusivamente dados sintéticos.

## Edição de referência e canais

A referência do percurso é a edição canônica versionada no GitHub, identificada por ID, edição e hash. GitHub Pages recebe os derivados dessa edição após revisão. O link para o GPT Sites permanece disponível como edição externa; nenhuma integração de implantação foi realizada. Ao publicar ali, levar o mesmo pacote aprovado e confrontar ID/edição/hash, registrando a divergência ou retirando a cópia antiga. Não editar juridicamente duas cópias sem reconciliá-las.

## Aprendizagem e armazenamento

O percurso não chama `AGUStudy.start()` por analogia com um capítulo: as sessões antigas dependem de um dispositivo legal comprovado. O aluno pode abrir qualquer atividade sem concluir outra. Visitar, ler, declarar atividade realizada, avaliar recuperação e demonstrar domínio são eventos distintos.

Não há banco, login, Azure, API de modelo, servidor permanente ou sincronização de localStorage. Leitura/rascunhos/preferences usam a chave antiga de livros, e avaliações usam a chave original de revisão. As nove categorias do backup S20 permanecem intactas; esse backup não passou a cobrir automaticamente o progresso de livros. Não registrar novos Cadernos, horas ou domínio por publicação ou teste sintético.
