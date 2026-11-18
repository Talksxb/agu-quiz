# LIVRO-INT-001 — Biblioteca de leitura integrada (protótipo)

**Data:** 18/11/2026 · **Origem:** `agu-quiz/main` em `31a47693b8f690e543f565c83208e3cdc637a547`  
**Situação:** implementação de navegação em **PR de revisão**, sem conteúdo privado e **sem habilitação em produção**.  
**Escopo:** um capítulo ADM-53 da edição jurídica 1.0 e visual 0.2.

## Levantamento factual

- `Talksxb/agu-quiz`: público; GitHub Pages, arquivos estáticos no diretório raiz (`index.html`, JS, CSS). O README declara que não possui login nem sincronização privada, e que o progresso fica no `localStorage` deste navegador.
- `Talksxb/agu-auditoria`: privado; matriz, checkpoints, protocolo e evidências. É o único repositório **AGU** privado encontrado na lista acessível nesta sessão. Não se presume que tenha material da apostila nem que sua finalidade de auditoria autorize misturar manuscritos em `main`.
- Entre os repositórios acessíveis ao perfil `Talksxb`, não apareceu um repositório privado específico `agu-apostila` ou equivalente. Outros repositórios privados listados são de projetos alheios (KaptART, Casa em Dia, etc.).
- Não foi identificado no código do Quiz um backend de autenticação ou rota servidora para material privado. **O GitHub Pages não executa o servidor deste protótipo.**

## O que o ramo implementa

1. Nova rota interna `book` na **Biblioteca Inteligente**, com botão **Apostila** e cartão **Apostila de leitura**.
2. Componente `apostila.js` e estilo `apostila.css` consistentes com o Quiz atual. Eles **não contêm** o texto ADM-53, o arquivo privado, chaves, tokens ou matrizes da auditoria.
3. Ciclo de interface: conferir sessão → acesso restrito → catálogo autorizado → leitura em `iframe` sem scripts → sair. Na origem pública sem backend, a área exibe estado honesto de **não configurada**.
4. Metadados de versão, título, disciplina e progresso local por capítulo. O progresso de leitura é **uma posição no navegador**, não prova de domínio.
5. Endpoints esperados no **mesmo domínio**: `POST /api/livro/session`, `GET /api/livro/catalog`, `GET /api/livro/chapter/ADM-53`, `POST /api/livro/logout`.

## Prova de conceito local, separada do repositório público

O servidor `agu-library-private-prototype/server.cjs` fica **fora do checkout público**, assim como o HTML integral do ADM-53. O código do serviço foi preparado para ensaio local, e **não** é uma solução de login de produção. Ele usa um segredo temporário passado por variável de ambiente, cookie `HttpOnly; SameSite=Strict`, sessão em memória de curta duração, bloqueio de origem cruzada, limite de tentativas e cabeçalhos ant-cache.

**Teste executado:** `node security-test.cjs` — **14/14 verificações aprovadas**, inclusive requisições anônimas 401 para catálogo e capítulo, erro de autenticação, origem não autorizada, uso permitido após login, inexistência de conteúdo privado em HTML/JS públicos, logout e rejeição de sessão revogada. O teste também verificou `frame-ancestors 'self'`, `X-Frame-Options: SAMEORIGIN` e `Cache-Control: no-store`.

**Não verificado nesta execução:** teste visual de navegação em browser a 320/360/390/430 px e desktop. O navegador automatizado no executor não iniciou; depois, o navegador compartilhado recusou o destino local por política de segurança. **Não foi contornada essa restrição.** O HTML/CSS possui media queries para celular, mas a qualidade perceptiva e a ausência de overflow precisam de teste real antes do merge e da publicação.

## Decisões para a implantação segura

- **Não** adicionar os documentos `.md`, `.docx`, `.pdf`, `.html` privados ao repositório público, ao JavaScript, ao `localStorage` ou a um bundle estático.
- Manter uma fonte privada própria para capítulos aprovados (novo repositório `agu-apostila` seria preferível à mistura com auditorias), com versões e rastreabilidade por ID curricular.
- Instalar autenticação verificável por identidade (com autorização por usuário) em backend privado, HTTPS obrigatório, proteção de sessão, auditoria de acessos e recuperação segura. A chave de demonstração **não** serve como autenticação de produção.
- Habilitar uma rota de API **na mesma origem** do front-end por proxy/host apropriado; GitHub Pages puro não fornece esse mecanismo. Um domínio de backend distinto exige projeto explícito de CORS, CSRF e cookies.
- Verificar origem e autorização **a cada pedido** pelo capítulo; não considerar bloqueio apenas na interface como proteção.
- Definir política de publicação/autorização para cada versão e atualizar o capítulo por fonte textual e diagramas editáveis, regenerando Word/HTML.
- Antes de merge/publicação: teste móvel real, teclado, leitores de tela, zoom, excludentes e base jurídica, ausência de conteúdo em repositório público e E2E autenticado com identidade real.

**Conclusão:** a interface navegável e um controle de acesso *localmente testável* estão preparados. **A proteção em produção, a integração Azure e o acesso pelo AGU Quiz publicado ainda não foram implementados ou certificados.**
