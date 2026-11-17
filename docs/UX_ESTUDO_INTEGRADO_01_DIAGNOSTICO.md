# UX Estudo Integrado 01 — diagnóstico, decisão e evidências

Data: 17/11/2026 (America/Sao_Paulo). Escopo: somente Sprint 01. As aulas, correção e diálogo socrático continuam no ChatGPT.

## Base realmente consultada

- `Talksxb/agu-quiz/main`: `31a47693b8f690e543f565c83208e3cdc637a547`, confirmada no clone e histórico. Branch desta entrega: `feat/ux-estudo-integrado-01`.
- Consulta autenticada de PRs abertas: #49, #50, #51, #52 e #53, todas da biblioteca/cotejo documental. Não foram mescladas nem copiadas para esta branch. PRs #43–48 de cartões/biblioteca já integradas na base, incluindo a correção de Pages #48. Consultar novamente antes de integrar esta entrega.
- Produção HTTPS: HTTP 200 e SHA-256 do HTML `71a30f8c930cbd254bc4d22b4d9d400b322dcf92e700a6afabda79419de75ded`, idêntico à base. `node tests/sprint21-pages.cjs` passou **antes do patch**: HTML, 13 scripts, CSS de baralhos e módulo de questões iguais à main. Não representa publicação desta sprint.
- README, workflow completo, WORK01, LEG09, módulos de leitura, estudo, revisão, disciplinas, cadernos e backup; anexos do projeto Base Mestra v5.1, Caderno/Handoff e Leia-me (aviso de v4 é histórico).
- Auditoria privada: metadados do repositório/branch e protocolo consultados pelo conector, somente leitura. Nenhuma matriz, evidência privada ou relação nova foi copiada ao Quiz. Não foi executada auditoria curricular ou jurídica.
- Nenhum GPT Site foi consultado como fonte de código, sincronizado ou publicado. O GitHub permanece a fonte da verdade.

## Inventário e problemas comprovados

| Área | Estado observado | Decisão nesta sprint |
| --- | --- | --- |
| Home/Estudar | WORK01 já prioriza sessão integrada, plano e revisão; ignorava sessão interrompida de baralho | Reutilizar e acrescentar retomada do baralho antes do plano quando não há sessão integrada aberta |
| Leitor | 8 normas, 3.448 artigos; 49 artigos por janela; retomada por unidade; estados de espelho/parcial preservados | Nenhum texto ou metadado jurídico alterado |
| Cartões | 51 cartas, 11 baralhos, 3 disciplinas com cartas; agenda e tentativas no motor original | Abrir biblioteca existente com filtro **exato** de assunto sem iniciar/substituir sessão |
| Assuntos | Apenas 5 códigos presentes nos artigos; 11 nos baralhos; união = 12 | Derivar navegação desses códigos públicos, sem ampliar cobertura curricular |
| Questões | Quatro itens com cotejo pontual no leitor; três admitem vínculo direto granular | Mostrar Q6 em ADM-17 e Q7/Q9 em ADM-27; não promover Q48 a vínculo direto com CON-50 |
| Caderno físico | Lista `forNotebook` única, nove categorias de backup | Reutilizar os filtros existentes; códigos sem filtro no leitor abrem a lista geral com aviso |
| Notas | Comentários por dispositivo, Caderno contextual e Caderno legado já existem | Não fundir ou criar outro repositório de notas |
| Plano | Motor próprio e cronograma já implementados | Não gerar nem concluir tarefas ao consultar assuntos |
| Progresso | Avaliações/tentativas documentadas, não domínio automático | Consultar contagens atuais, sem gravação ao abrir assunto |

O código pedagógico ADM-02 nos anexos significa Atos Administrativos. A taxonomia granular pública dos baralhos contém ADM-06, ADM-17, ADM-23 etc. **Não há equivalência automática.** Um registro de aula futuro precisa preservar ambos os namespaces e pedir identificação explícita quando não houver correspondência documental. Não usar nomes parecidos ou prefixos para preencher essa lacuna.

A ausência de vínculo no índice não significa que a norma inteira seja irrelevante: por exemplo, o CPC está no leitor, mas seus artigos permanecem sem `topic`. PC-03 portanto tem cartas e nenhuma associação normativa granular afirmada pela nova navegação.

## ChatGPT ↔ Quiz: investigação prioritária

Documentação oficial OpenAI consultada em 17/11/2026:

1. [MCP server and UI quickstart](https://developers.openai.com/plugins/build/app-quickstart): ferramentas de servidor podem receber entradas estruturadas e executar ações a partir do ChatGPT; UI é opcional.
2. [Add custom MCP server](https://developers.openai.com/api/docs/guides/custom-mcp-server): conexão de servidor, autenticação e permissões de ferramentas; disponibilidade sujeita a workspace/superfície.
3. [Authentication](https://developers.openai.com/plugins/build/auth): autenticação de ações/dados privados e OAuth; credenciais verificadas no servidor.
4. [Add UI to your MCP server — estado entre sessões](https://developers.openai.com/plugins/build/chatgpt-ui): estado durável deve ficar no servidor; widget state/localStorage do iframe não é fonte compartilhada entre aparelhos.
5. [Sign in with ChatGPT](https://developers.openai.com/cookbook/articles/sign-in-with-chatgpt): identidade e uso elegível do plano **não concedem acesso às conversas**.
6. [Sites: Data and connections](https://learn.chatgpt.com/docs/sites/data-and-connections): identidade/armazenamento e dados de apps conectados em Sites não comprovam leitura de histórico do ChatGPT nem sincronização com GitHub Pages.

| Pergunta | Conclusão demonstrada e limite |
| --- | --- |
| Conversas deste projeto podem ser lidas pelo site? | Não foi encontrada API de consumo pessoal para o Quiz varrer as conversas do projeto. As APIs de conversa de aplicações não comprovam acesso ao histórico privado do produto ChatGPT. Não usar endpoints internos, scraping, cookies ou sessão de navegador. |
| Há caminho oficialmente suportado de envio? | Sim: ChatGPT pode chamar uma ferramenta MCP com a síntese estruturada do contexto que está sendo trabalhado. É envio explícito de dados, não uma assinatura automática de todas as conversas nem acesso retroativo ao projeto. |
| Pode enviar disciplina, conceitos, erros e dispositivos? | Como argumentos estruturados da ferramenta, sim, com contrato e validação no serviço. O site atual ainda não tem esse endpoint. A chamada só envia os campos declarados; não implica exportar o diálogo inteiro. |
| Pode atualizar o progresso local do Pages diretamente? | Não demonstrado. O servidor não acessa o localStorage do aparelho. Seria preciso um recebimento autenticado e aplicação explícita no navegador, ou armazenamento compartilhado com migração planejada. |
| Transferir sem copiar textos grandes? | Um arquivo JSON compacto de encerramento de aula pode ser baixado no ChatGPT e selecionado no Quiz. Prévia + validação + confirmação antes de aplicar aos módulos existentes. Mecanismo recomendado para S02; ainda não implementado. |
| E um link com toda a aula? | Não recomendado: dados em query/hash, limites de URL e vazamento por compartilhamento tornam o arquivo explícito mais controlável. Nenhum link de importação foi implementado. |
| Custos e dependências | Importação local não precisa de backend, API de modelo ou nova cobrança de inferência. A aula continua sujeita ao plano ChatGPT existente. MCP exige hospedagem HTTPS, autenticação, armazenamento privado, manutenção e disponibilidade do recurso na conta; não há orçamento/fornecedor aprovado para afirmar um preço. Usar MCP por si só não exige que este projeto contrate inferência adicional; se um futuro serviço chamar modelos, o faturamento aplicável deverá ser apurado separadamente. |

**Decisão:** nesta sprint, implementar navegação e documentar a viabilidade. Para S02, priorizar arquivo estruturado com prévia local e ação explícita. MCP permanece alternativa posterior condicionada à infraestrutura; sem novo servidor, assinatura, modelo ou chave de API nesta entrega. A viabilidade documental foi estabelecida; não se alega prova ponta a ponta de um MCP do AGU.

## Contrato proposto para encerramento de aula (apenas desenho)

A síntese deve conter versão, identificador estável do registro, data, disciplina, código pedagógico original, assunto curricular exato quando conhecido, conceitos efetivamente trabalhados, erros identificados, dispositivos/fontes, ponto de retomada e pontos sugeridos para o caderno. Evitar o diálogo integral e dados pessoais desnecessários. O erro relatado pela aula não é uma tentativa de cartão nem certificação do direito.

Destino inicial recomendado: formulário de encerramento do **Caderno AGU já existente**, com seleção explícita do tema quando houver namespaces diferentes. O Caderno contextual S15 também já possui importador, mas exige dispositivo conhecido, tema coincidente e fontes dentro de sua lista permitida; uma síntese livre não satisfaz esse contrato automaticamente. Não usar uma origem falsa, fonte forçada ou um dispositivo escolhido por conveniência para contornar o validador.

S02 deverá fechar o contrato de importação e a deduplicação estável usando esses modelos existentes. Preservar as nove categorias do backup; não criar categoria ou banco de aulas paralelo. Aplicar revisão/tempo/progresso apenas por ações legítimas já existentes e confirmação explícita; não fabricar respostas, notas ou horas. Se o contrato atual não suportar um campo com segurança, mantê-lo como texto da síntese existente ou informar a limitação antes de alargar o esquema.

## Implementação entregue

- `navegacao-estudo.js/.css`: seção de assuntos na Biblioteca, filtros por disciplina/busca, detalhes, disponibilidade e retorno dos recursos ao assunto; estado apenas transitório.
- `meu-estudo.js`: atalho Home e retomada do baralho válido. A sessão integrada mantém sua prioridade anterior; nenhuma comparação temporal foi inventada entre motores que não compartilham timestamp de última interação.
- `revisao-inteligente.js`: `browseTopic` consulta baralho por igualdade literal e abre a biblioteca original; não agenda, responde ou substitui sessão. O estado transitório fica fora de localStorage/backup.
- `index.html`: conexão e versões de cache. Nenhum framework, pacote de produção, professor virtual ou nova área principal.
- Delta de hashes encadeado à base integrada; fixtures históricas não regravadas. Testes antigos passam pelo delta novo apenas para os arquivos de produto realmente alterados.
- Captura sintética de prévia: `evidencias-ux-estudo-integrado-01/assunto-adm06-desktop.jpg`. Não contém histórico pessoal. O Chromium da prévia confirmou Home → assunto → biblioteca filtrada → mesmo assunto; não foi ensaio em Android físico.

## Validação e dificuldades

- As 36 suítes Node históricas foram executadas. A primeira passagem encontrou apenas exigências de hash/cache do produto anterior; foram encadeadas ao delta novo sem alterar fixtures ou afrouxar cenários funcionais.
- Nova suíte Node com 8 cenários: vínculo estrito, consulta sem gravação, sessão/retomada, nota/lista/plano preservados, backup portátil idempotente, questão direta, simulação e armazenamento inválido.
- Nova jornada Chromium na CI exige 320/360/390/430/1280 px, teclado, foco, overflow, notas, lista única, retomada de baralho, questão, plano, exportação real por download e restauração em contexto novo. Axe registra `violations` e `incomplete` separadamente.
- O ambiente de prévia usa cópia pública temporária dos arquivos; não é deploy nem fonte da verdade. A configuração local da prévia não vai à PR.
- Resultados finais da CI, tempos e situação da PR ficam no roadmap único. Não alegar aprovação de CI enquanto pendente, nem Android físico/TalkBack a partir de emulação.

## Limites mantidos para continuidade

S02 não foi executada. A síntese de aula ainda não entra no site. Nenhuma leitura automática das conversas foi habilitada. A integração desta PR e sua publicação em Pages precisam de CI verde, revisão e verificação de concorrência. Atualizar a produção apenas após integração regular; não publicar automaticamente GPT Sites.
