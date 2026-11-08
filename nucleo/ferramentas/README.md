# nucleo/ferramentas

Scripts e configurações de apoio ao sistema (por exemplo: conferência de cabeçalhos e cascata, configuração do detector de chaves).
Não entra aqui: chave, senha, token nem dado pessoal; código das entregas (landing, quiz) também não.

## prints/

Tira prints de páginas locais em 375 e 1440 pixels de largura: `node nucleo/ferramentas/prints/print.js <arquivo.html> <pasta-de-saida> <prefixo>`. Usa o playwright-core instalado só nesta pasta (node_modules fica fora do Git pelo .gitignore) e o Chromium já presente no cache do Playwright da máquina. Para instalar de novo: `npm install` dentro de nucleo/ferramentas/prints/.
