# Revisão Inteligente — Primeira implementação (2026-11-11)

## Arquitetura e integridade

- Destino: `Talksxb/agu-quiz` (GitHub Pages público).
- Módulo: `revisao-inteligente.js`, carregado pelo `index.html` existente.
- Navegação: aba **Revisão Inteligente**; nenhuma reconstrução do aplicativo.
- Persistência: `localStorage['agu_quiz_revisao_inteligente_v1']`, isolado do armazenamento legado `agu_quiz_mvp1_2026`.
- Nenhum usuário, resposta, credencial, planilha privada ou texto de Caderno privado foi incluído no repositório.
- Não existe backend de autenticação nem sincronização entre dispositivos neste MVP.

## Dados e fontes

Flashcards: 12 cartões autorais vinculados a `ADM-06`, `ADM-13`, `ADM-23`, `PC-01`, `CON-02`, `CON-50`. Incluem fundamentos legais e referências ao histórico pedagógico. Todos no estado **B (revisão independente pendente)**.

Questões oficiais: 23 referências, todas da carreira **Advogado da União**:

- **AGU 2015**, prova `187AGU_001_01`: itens 1–10 e item 15 (anulado); formato C/E. Prova: https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/187AGU_001_01.pdf ; gabarito definitivo: https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/Gab_Definitivo_187AGU_001_01.pdf
- **AGU 2023 (edital 2022)**, prova `804_AGU_ADVOGADO_001_01`: itens 1–12; item 7 anulado; formato A–E. Prova: https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/804_AGU_ADVOGADO_001_01.PDF ; gabarito definitivo: https://cdn.cebraspe.org.br/concursos/agu_22_advogado/arquivos/GAB_DEFINITIVO_804_AGU_ADVOGADO_001_01.PDF

Os gabaritos são resultados históricos definitivos da banca. O módulo não faz alegações de atualização normativa ou jurisprudencial completa. Não reproduz os textos das questões: exige leitura no caderno oficial pelo link. Os itens anulados são excluídos da fila avaliativa. O mapeamento temático de certos itens antigos pode exigir confirmação humana.

## Funcionamento

1. O botão **Iniciar seleção automática** propõe até cinco flashcards e três questões oficiais com revisão vencida ou ainda não vistos.
2. Flashcard: frente → revelar verso/fundamento → marcar Errei, Difícil, Lembrei ou Fácil.
3. Questão: abrir PDF oficial → responder C/E (2015) ou A–E (2023) → conferir gabarito → classificar a dificuldade.
4. Tentativas e estados são gravados a cada classificação com identificador, data, cartão, ID curricular, resposta objetiva quando aplicável, revisão e condição de fonte.
5. Janelas iniciais: 1, 7, 21 e 45 dias; erro reinicia em D+1, facilidade acelera estágios, "difícil" antecipa. A classificação subjetiva não altera o acerto/erro oficial.
6. A tela mostra revisões vencidas, itens novos, erros recorrentes, amostra de acertos em questões e próxima revisão futura.
7. Exportar JSON e importar tentativas adicionais por ID, sem substituir os estados atuais de revisão nem o histórico antigo.

## Restrições e próximo incremento

- O Foco do Dia no aplicativo apresenta a seleção de 5–8 minutos; a automação externa do ChatGPT não consegue ler diretamente `localStorage` do Android. Para integrar realmente, será necessário mecanismo de sincronização protegido, com autorização explícita.
- Não há aprovação jurídica independente do banco autoral nem atualização jurisprudencial integral: não usar resultado objetivo como certificação de domínio.
- A importação não recalcula automaticamente o estado de revisão a partir do backup; isso evita sobrescrever estados mais recentes, mas exige procedimento de conciliação no próximo incremento.
- Interface em desktop e Android precisa de teste real em navegador após o deploy; até aqui foram executados testes locais automatizados/simulados.
- Próximo incremento: vínculo seguro com Google Sheets ou conta, revalidação normativa item por item, extração jurídica revisada, fundamentação individual das questões oficiais e teste E2E móvel.
