# nucleo/ferramentas

Scripts e configurações de apoio ao sistema (por exemplo: conferência de cabeçalhos e cascata, configuração do detector de chaves).
Não entra aqui: chave, senha, token nem dado pessoal; código das entregas (landing, quiz) também não.

## prints/

Tira prints de páginas locais em 375 e 1440 pixels de largura: `node nucleo/ferramentas/prints/print.js <arquivo.html> <pasta-de-saida> <prefixo>`. Usa o playwright-core instalado só nesta pasta (node_modules fica fora do Git pelo .gitignore) e o Chromium já presente no cache do Playwright da máquina. Para instalar de novo: `npm install` dentro de nucleo/ferramentas/prints/.

## detector-de-chaves/

Recusa o commit quando encontra, no que está preparado, algo parecido com chave, senha ou token, ou um arquivo de segredos (.env, .env.*, *.env, .envrc, .dev.vars, .pem, id_rsa); a recusa diz arquivo, linha e tipo, nunca o valor. Node puro, sem dependências. Roda sozinho pelo gancho `.githooks/pre-commit`; num clone novo, ligar uma vez com `git config core.hooksPath .githooks`. Também varre todos os arquivos rastreados (`--rastreados`) e o histórico inteiro (`--historico`). Testes: `node nucleo/ferramentas/detector-de-chaves/testar-detector.mjs`. Detalhes no README.md da pasta.

## ensaio/

Por enquanto, só o package.json com o PGlite (um Postgres que roda dentro do Node) como dependência de desenvolvimento; node_modules fica fora do Git. Usado na etapa 21 para conferir que dados/banco/esquema.sql roda duas vezes e que dados/banco/conferir.sql dá tudo certo, com os papéis anon, authenticated e service_role criados de mentira. Para instalar de novo: `npm install` dentro de nucleo/ferramentas/ensaio/. O ensaio geral, com script e resultado, é a etapa 25.
