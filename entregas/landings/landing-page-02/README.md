---
id: landing-page-02
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
  junior: pendente
  euclides: pendente
depende_de:
  - id: garcom
    versao: 4
  - id: planta-do-banco
    versao: 4
  - id: banco-catalogo-prototipo
    versao: 3
desatualizado: true
---

# Landing-page-02 · página de vendas do Sistema de Vendas Safra

A página que aparece antes do quiz no protótipo do funil-01, no lugar das duas variantes da landing-page-01 (pedido do Otávio, 12/11/2026). Foi feita fora do sistema, em React e Vite, e chegou num zip: safra-pagina-vendas-git-preview-klyver.vercel.app, capturado da prévia na Vercel em 12/11/2026.

**Status.** Rascunho, pendente do Otávio, do Júnior e do Euclides. Nasce desatualizado, porque se apoia no garçom, que está marcado (regra 11.1).

## O que tem dentro

| Caminho | O que é |
|---|---|
| pagina/index.html | O index.html original da página, com três mudanças: a fonte Geist servida junto, de /fontes/, no lugar do Google (10.7); sem o script de comentários da Vercel; e o programa da visita e da ida ao quiz |
| pagina/assets/ | O programa (index-BSwcbsoR.js) e o estilo (index-Btrkg4Yg.css) da página, como vieram |
| pagina/a/ | As imagens da página: 295 do zip e 24 baixadas da mesma prévia na Vercel em 12/11/2026, porque o zip veio sem elas (ícones das abas e das trocas, que só aparecem com um clique). A prévia usa o mesmo programa do zip |

## Como funciona no protótipo

- **Endereço.** A página fica na raiz do site (/). Os caminhos dela começam na raiz (/assets/, /a/, /fontes/), então ela não funciona em outra pasta nem aberta direto do arquivo.
- **Botões.** "Fazer a Análise" e "Faça uma Análise Estratégica do seu Sistema de Vendas" levam a /quiz/ com as utm do endereço (as que existirem) e o código de sessão da visita, no parâmetro id_sessao (10.5). Antes, eles só rolavam a página.
- **Visita.** Ao abrir, a página manda a visita ao garçom (POST /api/evento) como entrega landing-page-02, versão 1, sem dado de pessoa (18.5). O banco só aceita a visita depois da linha nova do catálogo (dados/banco/catalogo-prototipo.sql, v3). Sem ela, a visita é recusada e o resto funciona igual.
- **Montagem.** entregas/prototipo-funil-01/montar-site.mjs copia index.html, assets/ e a/ para a raiz do site, e a Geist para /fontes/.

## Como ver na máquina

Da raiz do repositório, com as fontes instaladas (`npm install` em nucleo/ferramentas/fontes/):

```
node entregas/prototipo-funil-01/montar-site.mjs
python3 -m http.server 8000 -d entregas/prototipo-funil-01/site
```

Depois, abrir http://localhost:8000 no navegador. Sem o garçom, a visita não é gravada (o endereço /api/evento não existe nesse servidor), e o botão leva ao quiz do mesmo jeito.
