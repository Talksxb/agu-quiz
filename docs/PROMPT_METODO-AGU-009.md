# AGU QUIZ | WORK — MÉTODO-AGU-009

**Recepção dos originais AMB-04, hash do pacote e decisão editorial verificável**

Executar exclusivamente MÉTODO-AGU-009, quando solicitado. Sua execução só acrescentará valor de integração se houver **arquivo original novo acessível** ou **decisão editorial documentada nova** desde o fechamento do 008. Não pressupor que as pendências foram resolvidas; se não houver material novo, confirmar o bloqueio usando o checkpoint 008, sem abrir outra PR ou criar fixtures redundantes.

## Objetivo e fronteira de autorização

Desbloquear, se e somente se a evidência nova permitir, o gate editorial de LIVRO-AMB-002 (22/11/2026, edição 1.0), ID curricular AMB-04, ID de leitor proposto amb-04, com preservação da fonte e sua história. A entrega máxima é **PR draft** com capítulo preparado e testes; **não** mesclar, publicar, editar auditoria privada, aprovar cartões automaticamente, inventar progresso ou sincronizar serviços.

## Entrada concreta requerida antes da integração

Obter os **bytes originais** de: LIVRO-AMB-002.md, LIVRO-AMB-002.json, LIVRO-AMB-002.pdf, LIVRO-AMB-002_HANDOFF_EDITORIAL.md e LIVRO-AMB-002_FONTES_E_QUALIDADE.md, mais quaisquer diagramas/ativos independentes existentes. Preferir arquivos enviados diretamente nesta conversa ou URL exata de armazenamento autenticado disponibilizada pelo responsável. A Biblioteca anterior fornecia apenas texto indexado e a materialização foi negada; não substituir silenciosamente arquivos por reconstrução de texto. Se persistir esse estado, concluir com referência à lacuna, sem reabrir frentes de trabalho idênticas.

## Retomada

Reconfirmar a main, CI e deploy de Talksxb/agu-quiz; PRs #79/#80 integradas, PRs #81/#83 de diagnóstico e PR draft da etapa 008; conferir se algo foi mesclado desde o checkpoint. Ler docs/CHECKPOINT_METODO-AGU-008.md e os anteriores e abrir o manifesto Ambiental, catálogo, docs/METODO_AGU_001_INGESTAO.md, docs/AGU_PADRAO_EDITORIAL_CAPITULOS_v1.md, o schema, o compilador scripts/metodo-agu.cjs e os quatro padrões pedagógicos finais do Projeto. Não promover conteúdos de outras PRs sem autorização expressa.

## Etapa 1 — inventário e integridade

1. Se houver fonte nova com bytes, identificar origem, tamanho, encoding, data, edição e calcular SHA-256 original por arquivo. Mapear assets e recursos gráficos com seus hashes, sem usar nomes de arquivo ou hashes de strings indexadas como prova do original.
2. Comparar integralmente o Markdown com as 27 páginas do JSON e com as 32 páginas do PDF; verificar cada seção, quatro diagramas Mermaid (fonte e imagem), tabelas, 10 questões autorais e comentários, 10 perguntas de recuperação e gabaritos, parecer AGU, links e F1–F20. O cotejo indexado de 008 identificou apenas um LF adicional no JSON; confirmar no original e registrar diferenças de visual e bytes. Renderizar/inspecionar o PDF, sem substituir a fonte Markdown.
3. Preservar correspondência LIVRO-AMB-002 (editorial) → AMB-04 (curricular) → amb-04 (identificador técnico). Os cinco subitens literais do edital são poder de polícia, licenciamento, compensação ambiental, biossegurança e infrações.

## Etapa 2 — revisão jurídica e decisão de edição

1. Abrir fontes primárias em ênfase nos riscos altos do relatório 008: Lei 15.190/2025 arts. 14, 60, 65 e 67; LC 140/2011/ADI 4.757; LAE/LAC e Lei 15.300/2025; SNUC art. 36, Decreto 4.340/2002 e **ADI 3.378 com ED julgados em fevereiro de 2022 e modulação dos atos 19/07/2000–15/04/2008**; Lei 11.105/2005; Lei 9.605/1998/Decreto 6.514/2008; STJ EREsp 1.318.051/RJ. Reconsultar as ADIs 7.913/7.916/7.919 **na data da execução**, sem presumir o resultado de sessão agendada para 27/11–04/12/2026.
2. Elaborar tabela seção→proposição→fundamento→localizador→risco→diferença. O conteúdo 1.0 menciona embargos/modulação genericamente, mas não o recorte temporal confirmado em 008: propor texto **apenas em nova edição e com diff**, nunca alterando silenciosamente o original.
3. Preparar metadados e ativos finais para cálculo de **inputSha256 pelo compilador**, cujo hash depende do Markdown, metadados sem approval e bytes dos recursos; registrar autor/revisor, data, edição, escopo, riscos aceitos e restrições. Obter **decisão editorial expressa, verificável e específica** que aceite esse hash e edição. A autorização para executar a tarefa ou “apto para estudo” não substitui sign-off.

## Etapa 3 — somente com gates satisfeitos

Se e somente se bytes, integridade, revisão independente e aprovação rastreável forem demonstrados, preparar fonte e ativos em livros/fontes e livros/recursos, metadados aprovados em livros/editorial/amb-04.json e inclusão precisa no catálogo/posição Ambiental. Usar o mesmo scripts/metodo-agu.cjs, sem programar leitor, motor, armazenamento ou backup novos. Deduplicar cartões históricos antes de criar candidatos; novos cartões continuam pendentes. Testar idempotência, text/visual fidelity, ligação capítulo→seção→atividade→cartão, referências do backup geradas, regressões Node, Chromium em 320/390/768/1280, axe e inconclusivos. Manter os quatro capítulos publicados e IDs/agendas intactos.

Criar PR **draft** e checkpoint com fontes/sha original e inputSha256, matriz jurídica, histórico de edição, aprovação expressa, testes e limites. Sem merge, publicação, sincronização GPT Sites, alterações da auditoria privada nem Caderno fictício.

## Se ainda faltar entrada ou aprovação

Não regenerar conteúdo, não forçar schema approved, não calcular hash fictício, não reabrir PR sem delta real. Entregar apenas indicação precisa dos arquivos/acessos necessários, sign-off pendente e o prompt autossuficiente da execução seguinte que corresponda à necessidade demonstrada.

## Entrega

Relatar HEAD/árvore de main e branch, CI relevante, arquivos/hashes efetivos (ou ausência), confronto texto/figuras/PDF, decisão por gate, fontes oficiais realmente verificadas, PR draft se houver alteração, lacunas restantes e prompt completo de continuidade. A mera ingestão não demonstra estudo, desempenho, domínio ou certificação integral do edital.

## Nota de continuidade da linha principal

No fechamento de 008, a main já havia avançado para **ee52ed2bc41a61cfd9db4ed803fd7a0840cfb1b6** pela integração de **INTERFACE-AGU-001 #84**, sem modificar catálogo ou manifesto Ambiental. A branch 008 permanece baseada no commit anterior por isolamento; antes de qualquer preparação em 009, reconfirmar HEAD e CI/deploy atuais, trabalhar sobre a base explicitamente revisada e **não incorporar alterações de PRs pendentes por conveniência**. A existência desta nota não substitui reconfirmação futura.
