# AGU QUIZ | WORK — CARTOES-AUD-01 (15/11/2026)

## Missão e decisão editorial

Autorização expressa do estudante para **uma sprint** de ampliação controlada da biblioteca a partir de questões de 2015 e fundamentos atualizados. A auditoria privada foi consultada **somente em leitura**, para localizar questões e situar o grau de certeza documental, sem publicar seus registros, sua matriz ou seus indicadores provisórios. Caderno e gabarito foram confrontados com os documentos públicos do Cebraspe, e cada flashcard com **fonte normativa oficial pública**.

Este lote **não importa questões oficiais** e não republica enunciados da banca. Os oito cartões são formulações autorais voltadas ao direito atual, relacionadas a sete questões históricas. O gabarito **2015** é exibido apenas como referência verificável da questão antiga; não foi recalculado e **não valida** a solução do novo cartão.

## Retomada e escopo

- `Talksxb/agu-quiz/main` na abertura: `faad877363d34fdc531fc949249ca8e1907dd214`; após UX08/LEG13, os ajustes concorrentes LEG14–16 eram documentais. Nenhuma PR pública aberta no momento da retomada; reconfirmar antes do merge.
- Branch exclusiva: `cards/aud01-2015-atualizacoes`; PR, CI, merge e SHA final: registrar no fechamento após verificações remotas.
- Fontes: caderno [187AGU_001_07](https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/187AGU_001_07.pdf) e [gabarito definitivo](https://cdn.cebraspe.org.br/concursos/AGU_15_ADV/arquivos/Gab_Definitivo_187AGU_001_07_SUPER-A4.pdf), ambos públicos. O documento original é a referência histórica; a fonte vigente é independente.
- Triagem limitada a 20 candidatas: Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Q16, Q20, Q22, Q24, Q26, Q36 e Q39. Somente Q1, Q10, Q11, Q13, Q22, Q26 e Q39 deram origem a cartões deste lote. Treze candidatas não foram publicadas; não se infere erro jurídico nem desatualização das demais apenas por sua exclusão.

## Catálogo efetivamente ampliado

| Cartão | Questão histórica | Assunto autoral de direito atual | Fonte legal direta |
| --- | --- | --- | --- |
| `aud02-2015-flc-001` | Q1, E | Órgão que subsidia informações presidenciais no STF | Decreto 12.540/2025, Anexo I, arts. 25, II, 30, II |
| `aud02-2015-flc-002` | Q10, C | Indenização após nulidade contratual | Lei 14.133/2021, art. 149 |
| `aud02-2015-flc-003` | Q11, E | Dispensa após licitação deserta/frustrada | Lei 14.133/2021, art. 75, III |
| `aud02-2015-flc-004` | Q13, C | Prazo e prorrogação de ata de registro | Lei 14.133/2021, art. 84 |
| `aud02-2015-flc-005` | Q13, C | Compromisso de fornecedor versus contratação obrigatória | Lei 14.133/2021, art. 83 |
| `aud02-2015-flc-006` | Q22, E | Resultados reparatórios mínimos de acordo por improbidade | Lei 8.429/1992, art. 17-B |
| `aud02-2015-flc-007` | Q26, E | Dolo/erro grosseiro e responsabilidade técnica pessoal | LINDB, art. 28 |
| `aud02-2015-flc-008` | Q39, C | Eficácia subjetiva do mandado de injunção | Lei 13.300/2016, art. 9º |

Os códigos da biblioteca são **classificações editoriais públicas** (`CON-50`, `ADM-25`, `ADM-58`, `CON-24`), não uma certificação dos vínculos da matriz privada e não acionam atalho curricular do Planner. Nenhum `deviceId` foi atribuído sem prova literal. Níveis não foram classificados nem convertidos de 2/3/4 para outra escala.

Contagem anterior: 36 autorais, seis baralhos. Contagem com este lote: **44 autorais, nove baralhos**. Distribuição: ADM-06 12, ADM-13 4, ADM-23 4, ADM-25 4, ADM-58 1, CON-02 2, CON-24 1, CON-50 6 e PC-03 10. Permanecem 14 disciplinas públicas (ADM/CON/PC com cartas), 14 cartões com nível original (2:7; 3:6; 4:1) e 30 sem nível. Permanecem nove categorias S20.

## Limites de compatibilidade e testes

- Dados privados/pessoais não foram acessados no navegador nem copiados; apenas fontes públicas normativas e do concurso são citadas nos cartões.
- `agu_quiz_revisao_inteligente_v1` e `agu-review-v1` são preservados: nenhuma nova chave, cronograma ou avaliação automática. `DAYS=[1,7,21,45]`. Uma avaliação por cartão/sessão; releitura, revelação e navegação sem efeitos sobre `seen`, `stage`, `due`.
- A única `forNotebook` da LEG07–13 segue em `agu_leitor_juridico_s13_v1`: os oito novos IDs passam a ser optativamente anotáveis, sem segunda lista ou criação automática.
- Importação parcial até 3 MB, backup S20 até 12 MB UTF-8 e restauração apenas de categorias ausentes continuam sob testes legados.
- Teste novo `tests/cartoes-aud-01-validacao.js`, jornada `tests/cartoes-aud-01-browser.cjs`, delta novo `tests/fixtures/cartoes-aud-01-delta.json` encadeado à LEG13/UX04. Fixtures históricos **não foram reescritos**; suítes antigas foram ajustadas apenas para expectativas atuais de hashes, contagem e API.
- 32 suítes Node executadas localmente com êxito. A tentativa de Chromium local terminou antes de criar uma página (`socket() failed: Operation not permitted` no isolamento do executor); **não conta como teste de navegador executado**. O ensaio real nas cinco larguras 320/360/390/430/1280 e axe em 390/1280 foi previsto na CI; não representa Android ou TalkBack físico. Registrar resultado de jobs e de `incomplete` após execução.

## Aceite de publicação

Não mesclar se houver falha de CI, conflito, privacidade, revisão, backup ou base jurídica. Após eventual merge verificar GitHub Pages via HTTPS, hashes SHA-256 do HTML, motor, CSS, dataset e demais assets alterados; a existência da PR não significa produção. Se a CI não for satisfatória, a PR permanece em rascunho.

## Pendências deliberadas

- As 13 candidatas não aprovadas exigem verificação jurídica pontual e eventual decisão pedagógica em outra autorização.
- A revisão normativa e jurisprudencial **integral** de cada tema não foi certificada; nem a autenticidade histórica da questão determina atualidade automática.
- Não há ranqueamento de incidência validado, selo de prova oficial no cartão, integração inferencial AGUPlanner/AGUHome, sincronização, mudança de matriz ou de prova/gabarito histórico.
- Teste em Android físico e TalkBack genuíno não foi realizado; emulação Chromium é parcial.

Uma nova rodada de cartas requer autorização separada. Nenhuma CARTOES-AUD-02 ou UX09 é executada neste checkpoint.
