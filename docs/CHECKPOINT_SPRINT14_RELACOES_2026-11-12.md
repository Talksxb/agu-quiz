# AGU Quiz — Sprint 14 | Relações jurídicas com Auditoria 03

**Data:** 2026-11-12  
**Estado:** implementação publicada em main; 25/25 verificações automatizadas locais aprovadas; Android e Pages não testados em navegador real.

## Fontes inspecionadas
- Projeto: `docs/CHECKPOINT_SPRINT13_LEITOR_2026-11-12.md`, `leitor-juridico.js`, `dados/legislacao-s13.js`, `index.html`.
- Repositório privado `Talksxb/agu-auditoria`: `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `checkpoints/AUD03-005.json`, matriz original v3 de 412 IDs; arquivos `evidencias/normativa/NORM-ADM-002.json` e `NORM-CON-017.json`.
- Estado real: `AUD03-005`, `parcial_nao_certificado`. O conteúdo exibido aqui não transforma evidências individuais em certificação integral.
- Fontes jurídicas públicas adicionais: página oficial da Súmula 510/STF e andamento oficial da ADI 7856/SC. O andamento do STF registra publicação da ata em **02/09/2026**; a auditoria original deixava essa data pendente. Esta verificação pública **não modifica** nem sana globalmente a auditoria privada.

## Entregas
1. `dados/relacoes-juridicas-s14.js`: índice público separado com **18 relações granulares**, **15 normativas** e **3 jurisprudenciais**, em **14 subdivisões** diferentes, com ID estável, tópico curricular, lote, arquivo original referencial sem expor o arquivo, localizador, URL oficial, data de verificação, status, relação e nota sobre certificação.
2. `leitor-juridico.js`: relacionamentos filtrados pelo **ID da unidade selecionada**, prevenção de duplicidades por unidade/dimensão/localizador, apresentação de conclusões normativas e jurisprudenciais com proveniência, data, processo e limites. A aba de Questões sinaliza ausência de vínculo confirmado; não inventa pergunta nem gabarito.
3. `index.html`: carregamento do novo banco antes do Leitor Jurídico; versão de cache atualizada.
4. `dados/legislacao-s13.js`: preservado, assim como anotações locais, layout desktop e mobile, módulo de revisão e planejamento.

## Inventário de cobertura
| Unidade / escopo | Tipo | Fonte |
|---|---|---|
| Lei 9.784/1999 arts. 11, 12, 13 I–III, 14 caput e §§1–3, 15 | 10 normas + 1 jurisprudência | NORM-ADM-002, Lei 9.784/1999, Súmula 510 STF |
| CF art. 131 caput e §3º | 3 normas | NORM-CON-017, CF e LC 73/1993 |
| CF art. 132 caput e parágrafo único | 2 normas + 2 jurisprudências | NORM-CON-017, ADI 7856 e ADI 7218 |

### Jurisprudência e cautelas
- **Súmula 510 STF** — relação interpretativa com Lei 9.784 art. 14 §3º; não é súmula vinculante. Fonte: https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=2671
- **ADI 7856/SC** — STF, sessão virtual encerrada em 21/08/2026, ata publicada em 02/09/2026, modulação temporal e distinção de atribuições. Fonte: https://portal.stf.jus.br/processos/detalhe.asp?incidente=7329480
- **ADI 7218/PB** — registro parcial derivado de informativo, exigindo conferência de inteiro teor e efeitos antes de aplicação casuística. Fonte: https://www.stf.jus.br/arquivo/informativo/documento/informativo1127.htm
- Não existe declaração de certificação integral de jurisprudência ou de cadeia de vigência para nenhum dos vínculos.

## Questões oficiais
**0 novas questões publicadas no índice do Leitor.** Nenhum item da auditoria teve nesta execução sua combinação de identificação, texto/adaptação, gabarito definitivo, pertinência granular, fundamentação histórica e fundamentação atual inteiramente reconciliada. O banco histórico da Revisão Inteligente permanece intocado. Para a próxima auditoria de questões, consultar a frente de provas da AUD03-005, verificar duplicações e separar as provas de Advogado da União e Procurador Federal.

## Testes
**25/25** testes automatizados locais simulados: sintaxe do corpus/índice/leitor/index; contagem e unicidade; existência do ID no corpus; HTTPS e metadados; seleção da Súmula 510 somente no § correto; filtro por inciso; duas ADIs no art. 132; distinção de evidência parcial; data da ata; ausência de questões fictícias; comentários; chaves de armazenamento antigas; persistência após reinicialização; ordem de scripts.

**Não executado:** teste visual Android, E2E com navegador, verificação live do Pages, importação/restauração do backup. O usuário deve conferir a aba Jurisprudência no §3º do art. 14 da Lei 9.784 e no caput do art. 132 da CF.

## Limites e riscos
- A associação é do dispositivo selecionado, não um índice exaustivo de todos os julgados. A aba de Flashcards mantém **associação temática**.
- A ADI 7856 possui resultado e publicação de ata confirmados pontualmente; eventual recurso, alteração ou superveniência exige revalidação posterior.
- Evidência privada não é republicada: apenas extrato derivado e localizador. Nenhum dado pessoal é publicado.
- 0 questões não significa 0 questões existentes no acervo privado; significa **0 vínculos a dispositivo autorizados nesta sprint**.
- O vínculo público deve ser periodicamente revalidado frente a novas alterações, sobretudo na evolução AUD03-006+.

## Próxima sprint — S15 Caderno contextual
- Permitir registrar hipóteses, aulas, fundamentos, dificuldades e aplicações da AGU por dispositivo, com IDs estáveis e origem (manual, aula, caderno externo importado quando permitido), sem sobrepor comentários pessoais da S13.
- Vincular apenas o Caderno efetivamente existente e verificável; não inferir que anotações em outro chat estejam sincronizadas.
- Implementar exportação e importação com validação e preservação de históricos; não publicar dados pessoais em GitHub.
- O módulo deve ser compatível com as relações de S14 e os flashcards de S12. Encerrar com testes, checkpoint e PROMPT DA S16. **Não executar S16 automaticamente.**
