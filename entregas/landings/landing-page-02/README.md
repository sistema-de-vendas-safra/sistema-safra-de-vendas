---
id: landing-page-02
versao: 3
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
    versao: 8
desatualizado: true
---

# Landing-page-02 · página de vendas do Sistema de Vendas Safra

A página que aparece antes do quiz no protótipo do funil-01, no lugar das duas variantes da landing-page-01 (pedido do Otávio, 12/11/2026). Foi feita fora do sistema, em React e Vite, e chegou num zip: safra-pagina-vendas-git-preview-klyver.vercel.app, capturado da prévia na Vercel em 12/11/2026.

**Status.** Rascunho, pendente do Otávio, do Júnior e do Euclides. Nasce desatualizado, porque se apoia no garçom, que está marcado (regra 11.1).

## O que tem dentro

| Caminho | O que é |
|---|---|
| pagina/index.html | O index.html original da página, com três mudanças: a fonte Geist servida junto, de /fontes/, no lugar do Google (10.7); sem o script de comentários da Vercel; e o programa da visita e da ida ao quiz, que desde a v3 também pega o "Fazer a Análise" do cabeçalho no celular |
| pagina/assets/ | O programa (index-BSwcbsoR.js) e o estilo (index-Btrkg4Yg.css) da página. O estilo está como veio. O programa está como veio, salvo duas mudanças: as perguntas 6 e 7 do FAQ, tiradas na v2 (#117); e a seção "Como funciona" e duas respostas do FAQ, trocadas na v3 (#118; lista em "O que mudou na versão 3") |
| pagina/a/ | As imagens da página: 295 do zip e 24 baixadas da mesma prévia na Vercel em 12/11/2026, porque o zip veio sem elas (ícones das abas e das trocas, que só aparecem com um clique). A prévia usa o mesmo programa do zip |

## O que mudou na versão 2

Respostas do Otávio aos "a definir" do funil, 13/11/2026 (base/decisoes.md, #117): "Tire a pergunta 6 e 7 do FAQ."

- Saíram do FAQ, no computador e no celular, a pergunta 6, "Por que só 10 vagas?", e a 7, "Posso parcelar?". Eram as duas com marcadores na resposta ("[Data de início de cada empresa a definir]" e "[Parcelamento a definir]"). O FAQ fica com 6 perguntas.
- A mudança é só no programa empacotado (assets/index-BSwcbsoR.js): os dois itens foram tirados da lista, nas duas versões da página, sem mexer em mais nada; o nome do arquivo continua o mesmo. Conferido que o programa continua válido e que a página não tem mais nenhum "a definir".
- No computador, o FAQ tem duas colunas, e as duas perguntas eram da segunda: ela fica com 2 perguntas, e a primeira com 4.
- A visita continua indo ao banco como landing-page-02, versão 1, que é a linha do catálogo: a versão da entrega no banco não sobe por isto.
- depende_de ganha decisoes 7.

## O que mudou na versão 3

Decisão do Otávio, 13/11/2026 (base/decisoes.md, #118; prompts/18-como-funciona-landing-02.md): "Eu preciso fazer um ajuste nessa seção da landing page para que ela esteja de acordo com as últimas decisões de Junior sobre a entrega do produto." A seção "Como funciona" seguia o calendário antigo; passa a seguir o da call de 07/11 (#72 a #80), com as 8 entregas (#52, #56), o "nunca mentoria" (#53) e o nome dos ritos (#83). Nenhum fato muda: a ficha de fatos e base/produto.md já diziam tudo isso.

**Onde mudou.** No programa empacotado (assets/index-BSwcbsoR.js), só na seção "Como funciona" e em duas respostas do FAQ, em todas as cópias de cada texto (a seção do computador, a do celular e as definições dos cartões, em variante escura e clara); e no programa do fim do index.html, só o botão do cabeçalho. O nome do arquivo do programa continua o mesmo. O estilo (assets/index-Btrkg4Yg.css) não mudou: as medidas novas da régua vão escritas no próprio programa.

**O projeto original não tem estas mudanças.** A página foi feita fora do sistema, e o projeto dela, na Vercel, continua com os textos antigos. Se um zip novo vier de lá, é a lista abaixo que precisa ir junto, senão a página volta ao calendário antigo.

### Cada troca de texto visível (antes · depois)

Título da seção
- "Em 90 dias a gente instala e capacita o seu time a operar o sistema com máxima eficácia." · "Em 15 dias o sistema está instalado. Nos 90, a gente capacita o seu time a operar com máxima eficácia." ("máxima eficácia" continua em verde)

Régua dos 90 dias
- "Fase 1 · Análise", nas semanas 1 a 3 · "Fase 1 · Análise", só na semana 1 (o texto não muda)
- "Fase 2 · Preparo do solo", nas semanas 4 a 6 · "Fase 2 · Preparo do solo", nas semanas 1 e 2 (o texto não muda)
- "Fase 3 · Colheita e plantio · em paralelo", nas semanas 5 a 13 · "Fase 3 · Colheita", nas semanas 3 a 13
- "Fase 4 · Entrega", nas semanas 12 e 13 · "Fase 4 · Plantio · em paralelo", nas semanas 3 a 13
- Losangos em S3, S7 e S13 · losangos em S1, S2 e S13
- Em negrito, S3, S7 e S13 · em negrito, S1, S2 e S13
- "Mentoria 1:1 com Junior Neves nas semanas 3, 7 e 13" · "Sessões de Comando com o Junior Neves: duas no começo e uma no fim"

Cartões das entregas (os títulos e as "Peças que instala" não mudam)
- 01 · "Semana 3" · "Semana 1"; barrinha: 3 · 1
- 02 · "Semana 4" · "Semanas 1 e 2"; barrinha: 4 · 1 e 2
- 03 · "Semana 5" · "Até o dia 15"; barrinha: 5 · 1 e 2
- 04 · "Semanas 5 a 13" · "Semanas 3 a 13"; "Fase 3 · Colheita e plantio" · "Fase 3 · Colheita"; barrinha: 5 a 13 · 3 a 13
- 05 · "Semana 6" · "Até o dia 15"; barrinha: 6 · 1 e 2
- 06 · "Semanas 6 a 13" · "Semanas 3 a 13"; "Fase 3 · Colheita e plantio" · "Fase 4 · Plantio"; barrinha: 6 a 13 · 3 a 13
- 06 · "Reunião semanal de safra, com análise das calls do seu time." · "A parte teórica sai nos primeiros 15 dias. Da semana 3 em diante, call semanal em grupo, com análise das calls do seu time."
- 07 · "Semana 12" · "Semanas 1 e 2"; "Fase 4 · Entrega" · "Fase 2 · Preparo do solo"; barrinha: 12 · 1 e 2
- 08 · "Fase 4 · Entrega" · "Fechamento · 3ª Sessão de Comando" ("Semana 13" e a barrinha, no 13, ficam)

Cartão das Sessões de Comando (o antigo 09)
- "09" · sem número ("Do começo ao fim", a foto e o nome do Junior Neves ficam)
- "Mentoria 1:1 entre Junior Neves, você e seu Head Comercial" · "Sessões de Comando entre o Junior Neves, você e o seu Head Comercial"
- "Semana 3 · A Análise Estratégica apresentada" · "Semana 1 · A Análise Estratégica das Safras"
- "Semana 7 · O balanço dos primeiros 45 dias" · "Semana 1 ou 2 · As mudanças, em aula e tarefa"
- "Semana 13 · O Relatório de Produtividade" · "Semana 13 · O fechamento, com o Relatório de Produtividade"
- Barrinha: 3, 7 e 13 · 1, 2 e 13

Controle do carrossel (só no computador)
- "Arraste para ver as 9 entregas" · "Arraste para ver as 8 entregas" (o contador "NN / 10" fica: continuam 10 cartões)

FAQ (as perguntas não mudam)
- "É mais uma mentoria?" · "Não. A mentoria é uma das 9 entregas. As outras 8 são instalação: CRM, painel, régua de contato e playbooks, dentro da sua operação." · "Não. São 8 entregas de implementação, dentro da sua operação: CRM, painel, régua de contato e playbooks. O Junior conduz as Sessões de Comando, e o seu time executa."
- "Quem me atende depois que eu assinar?" · "O Junior, nas mentorias das semanas 3, 7 e 13, com você e seu Head Comercial. Entre uma e outra, um gerente de safra acompanha o seu time toda semana." · "O Junior, nas três Sessões de Comando com você e o seu Head Comercial: duas no começo e uma no fim. Da semana 3 em diante, o Junior e o Euclides conduzem a call semanal em grupo, e o seu time tem um grupo de WhatsApp com a nossa equipe para as dúvidas do dia a dia."

### O desenho que acompanha os textos

- **Régua.** Duas linhas, como antes. Em cima, a Fase 1 (S1) e a Fase 3 (S3 a S13); embaixo, a Fase 2 (S1 e S2) e a Fase 4 (S3 a S13). As cores, a altura dos blocos e a conta das medidas são as de antes (cada bloco começa 3 px depois do início da primeira semana e termina 3 px antes do fim da última; no celular, tudo em 0,72). O bloco da Fase 1 tem uma semana só e o rótulo não cabe dentro dele: o rótulo "Fase 1 · Análise" fica logo acima do bloco, inteiro. O bloco da Fase 2 perdeu parte do respiro da direita (de 12 para 4 px; no celular, de 8,64 para 2,88) para o rótulo caber sem reticências.
- **Cartão 08.** A linha "Fechamento · 3ª Sessão de Comando" é mais larga que o espaço ao lado do número: quebra em duas linhas, alinhada à direita. O rótulo da semana continua em uma linha.
- **Cartão das Sessões de Comando.** Sem o número, o cabeçalho fica só com "Do começo ao fim", à esquerda, e o resto do cartão sobe. No celular, os segmentos da barrinha passaram de 19 para 17 px de largura, como nos outros cartões, porque o cartão do celular é mais estreito e o segmento 13 ficava para fora.
- **Nomes internos.** Os nomes invisíveis dos blocos acompanharam a mudança ("Mentoria · S3" virou "Sessão de Comando · S1", por exemplo), e os das barrinhas trocaram a meia-risca por "a" e acompanharam as semanas novas (o da barrinha do cartão 01 virou "Semanas 1 a 1"). O programa ficou sem nenhuma meia-risca e sem nenhum travessão. Nenhum texto visível diz "mentoria", salvo a pergunta "É mais uma mentoria?" e a frase "não mais um curso ou mentoria", que ficam.

### O botão do cabeçalho no celular

No celular, o programa da página desenha o "Fazer a Análise" do cabeçalho como um bloco, não como botão, e o programa do fim do index.html só levava ao quiz o clique num botão. Agora leva também o clique nesse bloco do cabeçalho, com as utm e o id_sessao (recomendação da pergunta 17.3.1, aprovada na #118). Nada mudou em assets/ por isto, e nenhum outro elemento mudou de comportamento.

### O que não mudou

- A visita continua indo ao banco como landing-page-02, versão 1, que é a linha do catálogo.
- As setas, o avanço sozinho (a cada 4 segundos no computador e 5 no celular), o arrastar com o dedo no celular, o contador, as cores, as fontes e o cartão do GSAAS. Conferido num navegador sem tela, lado a lado com a página de antes, em 1440, 375 e 360.
- O filtro por peça, no computador e no celular, e o arrastar com o mouse no computador: como vieram, não fazem nada, nem antes nem agora (o programa não trata o clique no filtro).
- A barra de progresso da régua: no programa ela tem largura fixa (249,231 px no computador e 179,446 px no celular), não acompanha o carrossel, e ficou como estava.
- A altura dos cartões (480 px), que causa o defeito conhecido abaixo.

### Defeito conhecido no celular (pergunta para o Otávio)

No celular, o cartão tem 290 por 480 px e corta o que passa da altura. Com a descrição nova do cartão 06 (cinco linhas no celular), o conteúdo vai até 495 px: a última fileira de chips ("Inteligência de Mercado" e "Dados") aparece cortada ao meio, com 10 dos 25 px. Antes, o conteúdo do 06 terminava em 480 e os chips apareciam inteiros: é defeito novo, que vem do texto aprovado. No cartão das Sessões de Comando, o conteúdo passa 32,9 px da borda (antes, 23,6) e o chip "Mentalidade de Vendas" fica escondido, como já ficava. O cartão 03 passa 2,5 px, antes e agora. No computador, tudo cabe. Nada foi mudado na altura, porque é desenho: subir os dez cartões do celular para 524 px resolve o 06, e para 544 px resolve também o das Sessões (log.md, entrada da 18.2, pergunta 1).

### Cabeçalho deste documento

depende_de ganha decisoes 8 (no lugar de decisoes 7).

## Como funciona no protótipo

- **Endereço.** A página fica na raiz do site (/). Os caminhos dela começam na raiz (/assets/, /a/, /fontes/), então ela não funciona em outra pasta nem aberta direto do arquivo.
- **Botões.** O "Fazer a Análise" do cabeçalho (no computador e, desde a v3, no celular) e os botões "Faça uma Análise Estratégica do seu Sistema de Vendas" levam a /quiz/ com as utm do endereço (as que existirem) e o código de sessão da visita, no parâmetro id_sessao (10.5). Antes, eles só rolavam a página. Ficam de fora dois lugares em que o programa da página desenha a chamada como bloco, não como botão, e que continuam como vieram: a chamada do cartão da oferta (seção 08), no computador e no celular, que não faz nada ao clique; e a chamada do topo da página no celular, que só rola a tela até o cartão da oferta.
- **Visita.** Ao abrir, a página manda a visita ao garçom (POST /api/evento) como entrega landing-page-02, versão 1, sem dado de pessoa (18.5). O banco só aceita a visita depois da linha nova do catálogo (dados/banco/catalogo-prototipo.sql, v3). Sem ela, a visita é recusada e o resto funciona igual.
- **Montagem.** entregas/prototipo-funil-01/montar-site.mjs copia index.html, assets/ e a/ para a raiz do site, e a Geist para /fontes/.

## Como ver na máquina

Da raiz do repositório, com as fontes instaladas (`npm install` em nucleo/ferramentas/fontes/):

```
node entregas/prototipo-funil-01/montar-site.mjs
python3 -m http.server 8000 -d entregas/prototipo-funil-01/site
```

Depois, abrir http://localhost:8000 no navegador. Sem o garçom, a visita não é gravada (o endereço /api/evento não existe nesse servidor), e o botão leva ao quiz do mesmo jeito.
