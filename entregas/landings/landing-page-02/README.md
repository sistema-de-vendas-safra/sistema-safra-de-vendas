---
id: landing-page-02
versao: 2
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
  - id: decisoes
    versao: 7
desatualizado: true
---

# Landing-page-02 · página de vendas do Sistema de Vendas Safra

A página que aparece antes do quiz no protótipo do funil-01, no lugar das duas variantes da landing-page-01 (pedido do Otávio, 12/11/2026). Foi feita fora do sistema, em React e Vite, e chegou num zip: safra-pagina-vendas-git-preview-klyver.vercel.app, capturado da prévia na Vercel em 12/11/2026.

**Status.** Rascunho, pendente do Otávio, do Júnior e do Euclides. Nasce desatualizado, porque se apoia no garçom, que está marcado (regra 11.1).

## O que tem dentro

| Caminho | O que é |
|---|---|
| pagina/index.html | O index.html original da página, com três mudanças: a fonte Geist servida junto, de /fontes/, no lugar do Google (10.7); sem o script de comentários da Vercel; e o programa da visita e da ida ao quiz |
| pagina/assets/ | O programa (index-BSwcbsoR.js) e o estilo (index-Btrkg4Yg.css) da página, como vieram, salvo as perguntas 6 e 7 do FAQ, tiradas do programa na v2 (#117) |
| pagina/a/ | As imagens da página: 295 do zip e 24 baixadas da mesma prévia na Vercel em 12/11/2026, porque o zip veio sem elas (ícones das abas e das trocas, que só aparecem com um clique). A prévia usa o mesmo programa do zip |

## O que mudou na versão 2

Respostas do Otávio aos "a definir" do funil, 13/11/2026 (base/decisoes.md, #117): "Tire a pergunta 6 e 7 do FAQ."

- Saíram do FAQ, no computador e no celular, a pergunta 6, "Por que só 10 vagas?", e a 7, "Posso parcelar?". Eram as duas com marcadores na resposta ("[Data de início de cada empresa a definir]" e "[Parcelamento a definir]"). O FAQ fica com 6 perguntas.
- A mudança é só no programa empacotado (assets/index-BSwcbsoR.js): os dois itens foram tirados da lista, nas duas versões da página, sem mexer em mais nada; o nome do arquivo continua o mesmo. Conferido que o programa continua válido e que a página não tem mais nenhum "a definir".
- No computador, o FAQ tem duas colunas, e as duas perguntas eram da segunda: ela fica com 2 perguntas, e a primeira com 4.
- A visita continua indo ao banco como landing-page-02, versão 1, que é a linha do catálogo: a versão da entrega no banco não sobe por isto.
- depende_de ganha decisoes 7.

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
