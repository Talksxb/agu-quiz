# AGU Quiz | Matriz nominal de transição — 2.008 IDs (21/11/2026)

## Escopo e artefatos

Revisão **documental por ID**, a partir da cadeia de relatórios Biblioteca 04–16 e dos registros de reexecução Biblioteca 18/19 no repositório privado. O CSV `docs/dados/BIBLIOTECA_MATRIZ_TRANSICAO_2008_IDS_2026-11-21.csv` contém exatamente **2.008 chaves únicas**, cada uma com diploma, número-base, etapa de origem, classe histórica reconstruída, classe após correção, mudança e nível de evidência. Inclui **2.000 artigos numéricos** (1–1.000 em CC e CPC) e **oito chaves com sufixo**: CC48-A, 49-A, 206-A, 421-A, 819-A, 853-A, 980-A e CPC699-A.

O script `scripts/validar-matriz-transicao-biblioteca.py` valida o universo exato, unicidade, partições, 51 transições e os 174 candidatos da classe editorial ainda não individualizada. A geração inicial foi confrontada com estas mesmas invariantes em execução JavaScript no ambiente de trabalho. **Não alegar execução do validador Python/Node/CI remoto nesta etapa** sem log específico.

## Matriz histórica por ID: limites de reconciliação

| Classe histórica | Identidades individualmente atribuídas | Indeterminação por ID |
| --- | ---: | ---: |
| Igualdade normalizada | 1.673 | 173, dentro de 174 candidatos não individualizados no lote 901–1000 |
| Diferença textual registrada | 113 | 0 |
| Ausência técnica registrada | 48 | 0 |
| Diferença editorial classificada | 0 | 1, dentro dos mesmos 174 candidatos |
| **Total** | **1.834** | **174** |

Assim, a fotografia **agregada** histórica é 1.846 iguais + 113 diferenças + 1 editorial + 48 ausências = 2.008. Os 113 IDs divergentes foram reconstruídos das listas dos relatórios 04–16; os 48 casos de ausência do diagnóstico técnico foram enumerados. Porém, o relatório Biblioteca 16 só divulga a contagem **1 diferença editorial** para 901–1000, **sem seu ID específico**. Não é possível alocar com honestidade essa classe entre os **174 candidatos restantes** desse lote: o CSV registra `identico_ou_editorial_nao_individualizado` em cada um, sem fabricar identificação. Outros 173 dos 174 são idênticos no agregado histórico.

## Transições individualmente sustentadas pela reexecução documentada

| Tipo | IDs | Classe anterior | Classe posterior |
| --- | --- | --- | --- |
| Revogação agrupada expressa, não texto ativo | **CC757–802** (46 IDs) | `dispositivo_ausente` | `revogacao_agrupada_documentada` |
| Interrupção correta antes das faixas revogadas | **CC756** | `diferenca_textual` | `texto_identico` |
| Corrigida anexação de `Art. 1.000` ao 999 | **CC999, CPC999** | `diferenca_textual` | `texto_identico` |
| Número 1.000 reconhecido separadamente | **CC1000, CPC1000** | `dispositivo_ausente` | `texto_identico` |

São **51 transições verificadas nominalmente** e **1.957 registros sem alteração reportada**, incluindo os 174 ainda ambíguos entre identidade/editorial. O ensaio 756–803 registrou 48 idênticos + 46 revogados + 2 divergências (CPC784/799); 999–1001 registrou 6 idênticos, e 901–1000 registrou 177 idênticos, 23 divergências e 1 editorial, 201 IDs com o interpolado CC980-A. Essas faixas **se sobrepõem**; não foram somadas para reconstruir um segundo universo. Hashes das fontes: CC `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90`; CPC `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821`. Correspondência de capturas conforme Biblioteca 18; não há nova obtenção de bytes nesta execução.

## Resultado reconciliado: contagem agregada condicionada

Se se preservarem as classes dos demais IDs, como indicam as regressões pontuais e os relatos, a partição agregada dos **mesmos 2.008 IDs** passa a ser:

| Classe | Contagem reconciliada projetada |
| --- | ---: |
| **Texto normalizado idêntico** | **1.851** (1.678 atribuídos por ID + 173 do conjunto não individualizado) |
| **Diferença textual ainda a revisar** | **110** |
| **Diferença editorial aparente** | **1** (identidade ainda não localizada) |
| **Revogação agrupada documentada** | **46** |
| **Ausência técnica restante dentre as 48 conhecidas** | **0** |
| **Total** | **2.008** |

Conserva-se **2.008/3.156 = 63,62%** de primeira passagem histórica, com **1.148 IDs ainda não cotejados**; os registros fora do espelho (CC69-A vetado, CPC529-A prospectivo) não entram nesse universo. **A contagem acima é uma reconciliação lógica derivada**, não uma auditoria nova e exaustiva dos 2.008 pares de texto: faltam o ID da única nota editorial e um manifesto integral com antigos e novos hashes de cada linha. Não a promover a `certificado`. “110 diferenças textuais” **não significa 110 erros de direito ou divergências materiais**: há notas, tipografia, jurisprudência e temporalidade ainda não revistas.

## Fila separada de revisão jurídica/editorial

1. **CPC784 e CPC799:** em ensaio 756–803 ainda divergentes. Relatórios indicam, respectivamente, anotação da Lei 14.711/2023 e pontuação/anotações da Lei 13.465/2017. Revisar inciso por inciso.
2. **901–1000, 23 diferenças textuais:** listas nominais originais: CC927, 937, 964, 968, 971, 974, 985, 996 e 980-A (**nove**, depois de CC999 corrigido); CPC913, 916, 921, 927, 932, 958, 966, 967, 979, 982, 983, 986, 988 e 998 (**14**, depois de CPC999 corrigido). Total = 23. Atenção jurídica para CC937, CPC927/932/979/998 e leis de 2026, sem assumir vigência do conteúdo pela igualdade literal.
3. **901–1000, 1 diferença editorial não individualizada:** obter resultado JSON ou reexecutar mesmo lote com hashes do espelho e fontes originais para identificar exatamente um entre 174 candidatos.
4. **CC819-A, CC853-A e CC980-A:** manter, respectivamente, marcador vetado, agente de garantia e revogação de dispositivo interpolado; não classificá-los como leis ativas por mera presença.
5. **Demais diferenças (total 110, incluindo CPC784/799):** são diferença textual sob investigação, não 110 alterações normativas faltantes.

## Gates pendentes para certificação do fechamento

- Obter ou produzir **manifesto de comparação linha a linha com SHA-256 de espelho e fonte para todas as 2.008 chaves**. O CSV atual registra o vínculo histórico e a transição, não hashes individuais; não fingir que o comparador integral foi reexecutado.
- Individualizar a única diferença editorial do lote 901–1000.
- Conferir integridade do corpus original e preservar a mesma versão das fontes; o endpoint de leitura do grande `dados/codigos-cc-cpc.js` retornou conteúdo vazio neste ambiente, de modo que a existência das 2.008 chaves no arquivo bruto **não foi novamente verificada diretamente**, embora os relatórios da auditoria as documentem.
- Executar o validador Python no checkout completo e registrar saída e CI, sem modificar corpus, notas ou estado `pending`.
- Somente com esses controles emitir números individualmente completos e avançar para 1001–1100.

## Decisão

**Matriz nominal entregue e 51 transições estabelecidas nos dados documentados. Fechamento global condicionado:** 1.851 / 110 / 1 / 46 é a projeção rastreável da reconciliação, mas **não certificação integral**; 174 linhas reservadas explicitamente como conjunto não distinguível entre 173 iguais e 1 editorial. Branch empilhada na PR #67; sem merge, rebase, alteração do produto ou acesso a dados privados de estudante.
