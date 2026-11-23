# Checkpoint — MÉTODO-AGU-006 | triagem editorial Ambiental

**Data:** 23/11/2026, America/Sao_Paulo. **Tipo:** triagem documental de até uma obra; sem integração editorial ou alteração do produto. **Resultado:** fonte AMB-04 localizada, conteúdo recuperado e cotejo textual preliminar positivo; **gate de aprovação para ingresso não demonstrado**.

## 1. Retomada e fonte de verdade operacional

- Repositório consultado: `Talksxb/agu-quiz`, branch `main`, HEAD **`1191267482ace4429cfd9d5f559a626461b29493`**, árvore `e41fac8fb57e6790b83ceea878a907a3c6aa2552`, antes desta branch.
- [PR #79](https://github.com/Talksxb/agu-quiz/pull/79): integrada no commit `f1705ab54d5ebcb12d9195c4f5d42ee5d67a265a`. [PR #80](https://github.com/Talksxb/agu-quiz/pull/80): integrada no commit que é o HEAD citado; [checkpoint MÉTODO-AGU-005](https://github.com/Talksxb/agu-quiz/pull/80#issuecomment-7109191789).
- CI da `main` [45230341092](https://github.com/Talksxb/agu-quiz/actions/runs/45230341092): `completed/success`, incluindo `pages-publicado`; deploy nativo [45230340034](https://github.com/Talksxb/agu-quiz/actions/runs/45230340034): `completed/success`. Este lote não reexecuta testes do mesmo HEAD sem alteração de produto.
- Consultados `docs/PROMPT_METODO-AGU-006.md`, `docs/CHECKPOINT_METODO-AGU-004.md`, fechamentos das PRs #79/#80, `docs/METODO_AGU_001_INGESTAO.md`, `docs/METODO_AGU_001_DIAGNOSTICO.md`, `docs/METODO_AGU_003_BACKUP.md`, `docs/AGU_PADRAO_EDITORIAL_CAPITULOS_v1.md`, `livros/colecoes/ambiental.json`, `livros/editorial/catalogo.json`, metadados do capítulo já aprovado `livros/editorial/amb-03.json` e exemplo publicado `livros/metodo/amb-03.json`.
- Aplicadas as diretrizes pedagógicas finais: Base Mestra 5.2, Leitura Completa 1.1, Caderno/Handoff 2.1, Leia-me Primeiro 2, e padrão editorial público. A auditoria privada **não foi aberta nesta etapa**; registros históricos presentes em relatórios de origem não são declarados reconferidos hoje.

## 2. Manifesto e identificação curricular

`livros/colecoes/ambiental.json` (blob `b61c3572be4dd5294a8bc7365c087ae89eb7498a`) conserva **nove posições editoriais**. O catálogo ativo `livros/editorial/catalogo.json` contém **quatro capítulos de disciplinas diversas** e apenas **`amb-03`** em Direito Ambiental. Nenhum capítulo novo foi adicionado.

| Posição | ID editorial | ID(s) curriculares | Estado documentado na main | Decisão nesta triagem |
|---|---|---|---|---|
| 1 | LIVRO-AMB-001 | AMB-03 | publicado, edição 1.0 | preservar |
| 2 | **LIVRO-AMB-002** | **AMB-04** | produzido; revisão pendente; não publicado; capítulo proposto `amb-04` | **prioridade de revisão**, sem ingresso |
| 3 | LIVRO-AMB-003 | AMB-05 | produzido; revisão pendente; não publicado; capítulo proposto `amb-05` | reserva, sem ingresso |
| 4–9 | LIVRO-AMB-004 a 009 | AMB-01/02, AMB-06–11 | planejamento na main | nenhum ingresso |

A Biblioteca pessoal contém relatório de obra AMB-06 produzida posteriormente, mas o manifesto público ainda registra sua posição como planejada; trata-se de uma diferença de proveniência **não reconciliada automaticamente** e não de autorização para atualizar o manifesto.

## 3. Materiais encontrados, disponibilidade e cotejo

Localizadas na Biblioteca pessoal do Projeto (consulta por Arquivos/Library; **nenhum desses arquivos foi copiado ao GitHub**):

| Item | Evidência efetivamente inspecionada | Limite |
|---|---|---|
| `LIVRO-AMB-002.md` | Markdown canônico, **88.101 bytes segundo metadados**, edição 1.0 de 22/11/2026; recuperadas **412 linhas**, 21 seções numeradas, 4 blocos Mermaid, tabelas, 10 questões autorais, recuperação ativa e fontes F1–F20 | o caminho de materialização dos bytes originais foi recusado; SHA-256 **não calculado** |
| `LIVRO-AMB-002.json` | JSON de leitura, **92.236 bytes segundo metadados**, `id=amb-04`, 27 páginas; parse da extração textual válido | compatibilidade com o pipeline editorial atual **não testada**; não configura aprovação |
| `LIVRO-AMB-002.pdf` | cópia identificada, **215.210 bytes segundo metadados** | não utilizada como fonte primária nem submetida a revisão visual neste lote |
| `LIVRO-AMB-002_FONTES_E_QUALIDADE.md` | relatório de 67 linhas lido integralmente; conclui **apto como capítulo autoral de estudo**, com fontes pontuais e lacunas explícitas | conclusão de qualidade **não equivale a liberação de publicação** no catálogo |
| `LIVRO-AMB-002_HANDOFF_EDITORIAL.md` | handoff de 36 linhas lido integralmente; informa texto produzido, AMB-04, necessidade de futuras revisões e ausência de integração autorizada | não contém aprovação com hash da edição para ingresso |
| `HANDOFF_LIVRO_AMB_003.md` e `LIVRO-AMB-003_AMB-05_biblioteca.json` | AMB-05 produzido, ainda para revisão e sem publicação | não priorizado sobre AMB-04; nenhum ingresso |
| `LIVRO-AMB-004_RELATORIO.md` | AMB-06 produzido para leitura em meio externo, não integrado | não renumerar nem transformar relatório em aprovação |

**Cotejo textual limitado:** a concatenação, sem separadores, das 27 páginas obtidas do JSON corresponde integralmente aos caracteres do Markdown recuperado, exceto **um LF terminal a mais** no JSON. Os 21 títulos numerados e os quatro blocos Mermaid estão presentes na transposição. Essa igualdade refere-se ao **texto recuperado pelo serviço de Arquivos**; não substitui cotejo criptográfico dos bytes canônicos, fidelidade visual, revisão das referências ou teste do compilador na publicação. Foram tentadas materializações dos arquivos da Biblioteca, devolvendo ausência de caminho autorizado de bytes originais; portanto, **não foram inventados digests SHA-256**. Não se utilizou PDF como substituto da fonte estruturada.

Busca por nome no Google Drive para LIVRO-AMB-002/003 não retornou candidatos; isto não prova inexistência em todas as pastas/contas. Busca semântica e por título nos Arquivos do Projeto localizou os itens acima, mas **não identificou ata, revisão independente ou autorização expressa de publicação** de AMB-04, AMB-05 ou AMB-06.

## 4. Mapa preliminar de escopo e riscos de AMB-04

Redação literal preservada: **“Poder de polícia e Direito Ambiental. Licenciamento ambiental. Compensação ambiental. Biossegurança. Infrações ambientais.”** Não confundir o título editorial abreviado com o currículo integral.

| Segmento literal | Seções identificadas no Markdown canônico | Estado do mapeamento |
|---|---|---|
| Poder de polícia e Direito Ambiental | §§ 2–3, 11–14, com caso em 16 | identificado na obra; ainda não revisado independentemente |
| Licenciamento ambiental | §§ 4–8 e 14–16 | identificado; atenção à Lei 15.190/2025, transição e art. 65 |
| Compensação ambiental | § 9 e caso § 16 | identificado; distinguir piso afastado na ADI 3.378 e teto regulamentar |
| Biossegurança | § 10 | identificado; normas técnicas e competências setoriais por reconferir |
| Infrações ambientais | §§ 11–14 e 16 | identificado; separar sanção administrativa, cautelar e reparação |

Os §§ 17–21 trazem questões autorais, síntese, recuperação, gabarito e remissões; conexões a AMB-03 não contam como cobertura de outro ID. O relatório de origem (`FONTES_E_QUALIDADE`) atribui à auditoria histórica de AMB-04 **25 registros**, sendo 18 pontualmente confirmados, dois parciais e cinco pendentes, com corte histórico 04/11/2026 e pesquisa editorial em 22/11/2026. **Esses números foram lidos no relatório, não reconfirmados contra `Talksxb/agu-auditoria` nesta execução.**

**Pendências jurídicas de maior impacto:** art. 65 da Lei 15.190/2025 e sua interação com fiscalização/LC 140/2011; ações de constitucionalidade recentes; regulamentos LAC/LAE e CONAMA; alcance integral de ADI 3.378; tipologias de CTNBio; inventário não exaustivo de retificações; questões oficiais com gabaritos. Nenhuma dessas pendências foi reclassificada como conferência atual ou certificação integral.

## 5. Portões de ingestão e decisão

O pipeline público exige Markdown original validado, recursos preservados, metadados com mapa de cobertura e **`approval.status=aprovado` vinculado ao `inputSha256` efetivamente revisado**. O capítulo publicado `amb-03` exibe esse gate, com registro de origem pública. `amb-04` não está em `livros/editorial/catalogo.json` nem possui uma aprovação com hash verificável recuperada nesta triagem.

**Decisão: NÃO INGERIR AMB-04 nesta etapa.** A conclusão “apto para estudo” e a existência de JSON legível **não permitem presumir** aprovação editorial independente, revalidação jurídica suficiente para publicação e identidade criptográfica dos arquivos. Alterar a `main` ou criar metadados `aprovado` seria fabricar gate. AMB-05 e AMB-06 estão na mesma situação. Nenhum novo capítulo, cartão ou marca de progresso foi introduzido.

**Mudanças autorizadas nesta branch:** exclusivamente este checkpoint e o prompt seguinte, ambos documentais. Sem alteração de `livros/colecoes/ambiental.json`, catálogo, fontes, livros, dados, scripts, workflows ou testes de regressão. Nenhuma publicação/merge nesta etapa. CI da PR deve ser conferida como regressão documental, sem confundi-la com validação da obra ainda não ingressada.

## 6. Continuidade

A próxima tarefa é **MÉTODO-AGU-007 — desbloquear revisão/autorização editorial de AMB-04**, em `docs/PROMPT_METODO-AGU-007.md`. Deve recuperar os bytes canônicos e SHA-256, verificar edição/ativos e obter aprovação editorial **expressa e rastreável**, com revisão de pontos jurídicos de alto risco; se não for possível, permanecer em triagem, sem falsear autorização. Não executada em 006. O estado do Caderno do estudante não mudou; leitura, domínio e revisão permanecem não aferidos.

**Fontes efetivamente abertas:** GitHub `main` no commit indicado, PRs #79/#80, as páginas e documentos versionados acima; Arquivos/Biblioteca pessoal apenas nos documentos explicitamente descritos; Google Drive apenas busca nominal (sem arquivos dos livros encontrados). Sem consulta atualizada de fonte jurídica oficial e sem consulta direta à auditoria privada neste lote.