# AGU Quiz — Roteiro guiado de verificação física (Sprint 24)

**Situação:** roteiro preparado; **nenhum Android físico foi testado pela equipe nesta Sprint 24**. A avaliação real depende de dispositivo disponível e autorização para operá-lo. Nenhum arquivo pessoal deve ser enviado para CI ou GitHub público.

## Preparação segura

1. Preserve o histórico existente: em **Evolução → Dados e backup**, faça uma cópia completa e guarde o JSON fora do navegador. Não use **Apagar dados locais** durante a verificação.
2. Para ensaios que possam registrar respostas, use um perfil separado ou sessão anônima do Chrome e **somente dados fictícios**. O histórico anônimo não deve ser a única cópia: pode desaparecer ao fechar as abas.
3. Anote apenas: modelo de aparelho, versão Android, Chrome, orientação, largura CSS **se efetivamente medida**, e se TalkBack foi usado. Não adivinhe largura CSS a partir da resolução física.
4. Acesse [AGU Quiz publicado](https://talksxb.github.io/agu-quiz/) por HTTPS. Não conceda permissões de conta, localização, câmera ou microfone para testar a aplicação.

## Percurso sem alterar os dados pessoais

| Nº | Ação no perfil isolado | O que observar | Resultado |
|---|---|---|---|
| 1 | Abrir **Início**, usar **Começar agora**, retornar | Quatro destinos, missão legível, sem toque fantasma | `nao_testado` |
| 2 | **Estudar → Plano semanal** | Item rolável horizontalmente, toque reconhecido, título visível | `nao_testado` |
| 3 | **Biblioteca Inteligente → Materiais** | Rolagem até o controle, sem bloqueio por sobreposição | `nao_testado` |
| 4 | **Evolução → Dados e backup** | Botões legíveis e acionáveis, sem corte horizontal da página | `nao_testado` |
| 5 | Virar a tela vertical/horizontal e retornar | Conteúdo reaparece; nenhuma resposta registrada automaticamente | `nao_testado` |
| 6 | Se TalkBack estiver disponível e autorizado, percorrer os quatro destinos e a navegação secundária | Nome e papel da navegação, ordem de foco, anúncio do título após troca | `nao_testado` |
| 7 | Em perfil isolado, exportar apenas backup sintético e reimportar em outro perfil de teste | Seleção de arquivo, confirmação, ausência de substituição, recarga | `nao_testado` |
| 8 | Reabrir e recarregar sem responder | Nenhuma nova tentativa em Revisão/Evolução | `nao_testado` |

**Se houver falha**, registrar aparelho/Chrome, tela, comando de toque ou teclado, resultado esperado/observado e captura **sem dados pessoais**. Não apagar o histórico nem tentar várias importações com arquivo desconhecido para diagnosticar.

## Recuperação histórica, condicionada a arquivo real

- A importação completa **só adiciona categorias ausentes**; não mescla históricos concorrentes. Se o navegador novo já contém dados, pare e preserve ambas as cópias.
- Não confiar em promessa de compatibilidade histórica sem teste de versão/esquema e hash em ambiente isolado. Se o arquivo antigo for rejeitado, **não** force edição do JSON nem substituição do estado atual.
- Não enviar backup com matriz, questões respondidas, notas ou informações pessoais para Issues, PRs, Actions, comentários ou repositórios públicos.
- A migração retrocompatível e política de conflito entre aparelhos não estão implementadas; novas decisões exigem autorização e plano separado.

## Modelo mínimo de registro

**Dispositivo:** não informado · **Android:** não informado · **Chrome:** não informado · **largura CSS medida:** não informada · **TalkBack:** não testado · **arquivo histórico real:** não fornecido.

Classificar cada resultado como `passou`, `falha_reproduzida` (com passos/captura) ou `nao_testado`. Não registrar `passou` sem execução no aparelho. **Este roteiro não é certificado de WCAG nem atestado de recuperação de dados reais.**
