# CHECKPOINT — LIVROS-EDITOR-001

**Sprint:** padrão editorial basilar e reconciliação de Ambiental · **21/11/2026**. **Repositório escrito exclusivamente:** `Talksxb/agu-quiz`. **Base imutável da branch:** `997c8362ef349e30893ab9a49a0bf0d9406e4c0d`, árvore `544dfbbe427af392655f9340ab1b6a30f6dd5725`. **Branch:** `docs/livros-editor-001-padrao-amb03`. **PR:** [#75 — draft aberta para revisão](https://github.com/Talksxb/agu-quiz/pull/75); número confirmado, ainda não mesclada. Não mesclar automaticamente.

## Entrada e fontes efetivamente examinadas

- `AGU_BASE_MESTRA_v5.2_FINAL.md`, `AGU_PADRAO_LEITURA_COMPLETA_v1.1_FINAL.md`, `AGU_CADERNO_E_HANDOFF_v2.1_FINAL.md` e `AGU_LEIA_ME_PRIMEIRO_v2_FINAL.md`: anexos editoriais do Projeto lidos em 21/11/2026.
- Repositório público: `livros-agu.html`; 4 JSON; `livros/livro-amb-001-original.html`; documentação e testes existentes. PR #70 e #74 **mescladas**; HTTP/CI de produção prévio não presumidos.
- Repositório privado de auditoria, **somente leitura**: HEAD de `main` `520af499f53f0bf368c9d0e1bc96e926b2c96a02`, consultado em 21/11; `docs/PROTOCOLO.md` e `checkpoints/estado.json`, último checkpoint integrado `AUD03-042`; `ultimo_lote_certificado = null`; evidências pertinentes `NORM-AMB-001` e `NORM-ADM-022` identificadas, não reproduzidas. Corte histórico 04/11/2026. Sem atualização desse repositório.
- Original HTML Ambiental e dados JSON efetivamente lidos via conexão GitHub. Arquivos original DOCX Ambiental e PDF LGPD v2 localizados na Biblioteca do Projeto, mas tentativa de materialização de bytes **negada**; logo sem conferência visual desses dois formatos. A versão textual LGPD 24/24 páginas no JSON foi cotejada editorialmente.
- **Datas distintas:** edição Ambiental/LGPD 20/11/2026; conferências jurídicas **declaradas** pelos originais até 20/11/2026 (não reexecutadas); corte histórico da auditoria 04/11/2026; integração GitHub PR #74 em 21/11/2026; migração Markdown 21/11/2026.

## Entregáveis exclusivamente aditivos

| Arquivo | Situação | Observação |
|---|---|---|
| `docs/AGU_PADRAO_EDITORIAL_CAPITULOS_v1.md` | Preparado para revisão | Manual transversal e rubrica 0–25 |
| `templates/AGU_CAPITULO_LEITURA_TEMPLATE_v1.md` | Preparado para revisão | Template copiável, placeholders não publicados |
| `livros/fontes/amb-03.md` | Preparado para revisão | 17 seções com texto idêntico aos 17 blocos JSON; aparato posterior de 4 SVG + 2 tabelas |
| `docs/LIVROS-EDITOR-001_COMPARATIVO_E_MATRIZ.md` | Preparado para revisão | LGPD × AMB, 17 correspondências e diferenças |
| `tests/livros-editor-001-fidelidade.cjs` | Adicionado, não integrado à publicação | Verificador documental de integridade |
| `.github/workflows/agu-sprint20-ci.yml` | Etapa Node acrescentada | Executará o teste novo quando o workflow rodar; CI não verificada nesta sessão |
| `docs/CHECKPOINT_LIVROS-EDITOR-001.md` | Este registro | Limites, estados e handoff |

**SHA de origem (Git blob):** Ambiental HTML `b12e615a3afe3762ead34455e6d25aeb1d4fce81`; Ambiental JSON `1ef017d5766fdf75f47abbd27d333f844c6d91d6`; LGPD JSON `832e4701576a1abed3e0052da961d62248b7993b`. No mesmo commit-base, ADM-53 `cbb484ac817bee33467b055232188c39d36cd730` e ADM-54 `7b1bbe881aa4e3b398be88060e584b2bdaee8e2c` devem permanecer inalterados. O leitor `livros-agu.html` não integra o diff.

## Evidência e portões

- Comparação em memória durante elaboração: quantidade de páginas/recursos verificada; cada um dos **17 campos de texto** do JSON conferido contra seu intervalo no novo Markdown por igualdade literal; 1 H1; 8 questões autorais identificadas; SVG 4 e tabelas 2 no HTML sem alteração.
- Teste novo: `node tests/livros-editor-001-fidelidade.cjs`, inscrito no job `integridade-node` do workflow existente; até a última consulta ao Actions, não havia execução registrada para o HEAD da PR #75. A comparação de 17 blocos foi executada em memória pelo conector, mas **não equivale** a teste Node realizado em CI. Não afirmar execução em Chromium/axe nem Android físico; **código publicado não foi tocado** e os testes de browser não são gate desta documentação.
- Conversor Markdown→JSON: **não implementado/não aprovado**, porque o Markdown agrega aparato visual fora dos 17 blocos e o JSON atual não contém SVG/tabela estruturada. Publicação atual está congelada. Se futura conversão perder dados ou mudar comportamento do leitor, bloquear.
- Revisão jurídica independente: **pendente** para futura edição, não requisito para preservar conteúdo histórico nesta sprint. Nenhum precedente ou norma foi revalidado como atual neste trabalho.
- Não se atribui domínio ou certificação integral ao estudante. Não há atualização do Caderno nem ligação automática ao Quiz.

## Decisão e pendências

**Pronto para revisão:** padrão transversal, template, fonte textual AMB e reconciliação documental. **Pendente:** revisão editorial de acessibilidade dos quatro SVG, cotejo visual do DOCX/PDF original após acesso aos bytes, revisão por editor independente e execução Node/CI na branch; workflow preparado, sem check confirmado. **Bloqueado:** substituição de JSON ativo, conversor automático e alegação de 100% de equivalência visual/jurídica. Publicação em GitHub Pages não é modificada até eventual novo PR específico.

## Próximo prompt (não executar)

> **AGU | LIVRO-FIN-001 — [unidade de Direito Financeiro com ID literal a confirmar].** Antes de redigir, abrir a `main` atual do `Talksxb/agu-quiz`, ler `docs/AGU_PADRAO_EDITORIAL_CAPITULOS_v1.md` e `templates/AGU_CAPITULO_LEITURA_TEMPLATE_v1.md` após revisão/merge, recuperar edital literal, matriz, fontes oficiais e checkpoint realmente integrado na auditoria somente leitura. Produzir **um único capítulo original e autossuficiente** em Modo Leitura, com problema gerador, prosa densa, regime jurídico e transições, jurisprudência com limites, caso AGU resolvido, questões rotuladas, recuperação e referências por afirmação. Criar fonte Markdown em branch própria para revisão, sem confundir qualidade com certificação integral ou domínio. Não alterar outros livros, leitor ou auditoria. Declarar lacunas e gate de publicação antes de qualquer integração.
