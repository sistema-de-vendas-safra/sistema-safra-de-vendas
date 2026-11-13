---
id: landing-page-02
versao: 4
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
    versao: 9
desatualizado: true
---

# Landing-page-02 · página de vendas do Sistema de Vendas Safra

A página que aparece antes do quiz no protótipo do funil-01, no lugar das duas variantes da landing-page-01 (pedido do Otávio, 12/11/2026). Foi feita fora do sistema, em React e Vite, e chegou num zip: safra-pagina-vendas-git-preview-klyver.vercel.app, capturado da prévia na Vercel em 12/11/2026.

**Status.** Rascunho, pendente do Otávio, do Júnior e do Euclides. Nasce desatualizado, porque se apoia no garçom, que está marcado (regra 11.1).

## O que tem dentro

| Caminho | O que é |
|---|---|
| pagina/index.html | O index.html original da página, com três mudanças: a fonte Geist servida junto, de /fontes/, no lugar do Google (10.7); sem o script de comentários da Vercel; e o programa da visita e da ida ao quiz, que desde a v3 também pega o "Fazer a Análise" do cabeçalho no celular e, desde a v4, as outras chamadas que a página desenha como bloco (a do topo no celular e a do cartão da oferta) |
| pagina/assets/ | O programa (index-BSwcbsoR.js) e o estilo (index-Btrkg4Yg.css) da página. O estilo está como veio. O programa está como veio, salvo três mudanças: as perguntas 6 e 7 do FAQ, tiradas na v2 (#117); a seção "Como funciona" e duas respostas do FAQ, trocadas na v3 (#118; lista em "O que mudou na versão 3"); e o GSAAS fora da página, com as respostas do Otávio ao pedido 18, na v4 (#119; lista em "O que mudou na versão 4") |
| pagina/a/ | As imagens da página: 295 do zip e 24 baixadas da mesma prévia na Vercel em 12/11/2026, porque o zip veio sem elas (ícones das abas e das trocas, que só aparecem com um clique). A prévia usa o mesmo programa do zip |
| prints/ | Os 16 prints da v4, em 1440 e em 375: a seção "Como funciona" no começo e no fim do carrossel, o cartão 06, o cartão das Sessões de Comando, o FAQ, a demonstração do produto, o cartão da oferta e o topo da página (lista em "Prints") |

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

**Resolvido na versão 4** (pergunta 18.2.1, aprovada na #119): os 9 cartões do celular passaram a 544 px de altura. O que isso resolve, medido em 375 e em 360: nos 9 cartões, a última fileira de chips termina 27 a 28 px acima da borda de baixo, que é o respiro do cartão; nenhum chip aparece cortado. Com a altura solta, o cartão 03 pede 510 px, o 06 pede 523 e o das Sessões de Comando pede 541: sobram 34, 21 e 3 px. O que isso não resolve de todo: a folga do cartão das Sessões é de só 3 px. Uma linha a mais de texto nesse cartão come o respiro de baixo (de 28 para cerca de 9 px), com o chip "Mentalidade de Vendas" ainda inteiro; duas linhas a mais voltam a cortar o chip. No computador, a altura continua em 480 px e tudo cabe.

### Cabeçalho deste documento

depende_de ganha decisoes 8 (no lugar de decisoes 7).

## O que mudou na versão 4

Decisão do Otávio, 13/11/2026 (base/decisoes.md, #119; prompts/20-gsaas-fora-da-landing.md). Sobre o GSAAS na landing: "Tira da landing." Sobre as perguntas da resposta do pedido 18, com uma recomendação para cada uma: "Aprovo tudo." A página deixa de falar do GSAAS (a #68 e a #84 aplicadas à landing-page-02), os rótulos seguem a 9.15 (#114), a resposta de "Quem me atende depois que eu assinar?" sai sem os nomes de quem conduz a call em grupo, e três pendências da versão 3 ficam resolvidas: a altura dos cartões no celular, a barra acesa da régua e as duas chamadas que não levavam ao quiz. Nenhum fato muda: a ficha de fatos e base/produto.md ficam como estão.

**Onde mudou.** No programa empacotado (assets/index-BSwcbsoR.js): o carrossel da seção "Como funciona", a régua, os cartões 01 e 08, a demonstração do produto e duas respostas do FAQ, em todas as cópias de cada texto (computador, celular e as definições dos cartões, em variante escura e clara). No programa do fim do index.html: só a regra que leva as chamadas ao quiz. O nome do arquivo do programa continua o mesmo; ele passou de 1.628.886 para 1.590.652 bytes (66 edições). O estilo (assets/index-Btrkg4Yg.css) não mudou: as medidas novas vão escritas no próprio programa.

**O projeto original não tem estas mudanças.** O projeto da página, na Vercel, continua como veio. Se um zip novo vier de lá, é a lista abaixo, junto com a da versão 3 e a da versão 2, que precisa ir junto, senão o GSAAS volta à página.

### Cada troca de texto visível (antes · depois)

FAQ (as perguntas não mudam; computador e celular)
- "Quem me atende depois que eu assinar?" · "O Junior, nas três Sessões de Comando com você e o seu Head Comercial: duas no começo e uma no fim. Da semana 3 em diante, o Junior e o Euclides conduzem a call semanal em grupo, e o seu time tem um grupo de WhatsApp com a nossa equipe para as dúvidas do dia a dia." · "O Junior, nas três Sessões de Comando com você e o seu Head Comercial: duas no começo e uma no fim. Da semana 3 em diante, o seu time participa da call semanal em grupo e tem um grupo de WhatsApp com a nossa equipe para as dúvidas do dia a dia."
- "E depois dos 90 dias?" · "Os playbooks e o treinamento ficam com o seu time. Quem quiser continuar tem o GSAAS, opcional: a gente mantém o CRM e o painel e coloca os agentes de IA para trabalhar." · "Os playbooks e o treinamento ficam com o seu time. O sistema fica por escrito, para rodar sem a gente."

Rótulos
- Régua, no computador e no celular: "Fase 1 · Análise" · "Fase 1 · Ponto de partida"
- Cartão 01, linha da fase: "Fase 1 · Análise" · "Fase 1 · Ponto de partida"
- Cartão 08, linha da fase: "Fechamento · 3ª Sessão de Comando" · "Encerramento · 3ª Sessão de Comando"

Contador do carrossel
- No computador e no celular: "01 / 10" a "10 / 10" · "01 / 09" a "09 / 09"

Demonstração do produto, no computador
- Título da janela na tela dos agentes: "Sistema de Vendas Safra · Agentes de IA" · saiu, com a tela (os títulos das outras telas ficam)

Não mudaram, como o pedido manda: o título do cartão 01 ("Análise Estratégica das Safras"), a linha "Semana 1 · A Análise Estratégica das Safras", os botões "Fazer a Análise", a linha "Semana 13 · O fechamento, com o Relatório de Produtividade" e "Arraste para ver as 8 entregas".

### Cada bloco que saiu

Carrossel da seção "Como funciona"
- O cartão do GSAAS, o décimo do carrossel, no computador e no celular: "Depois dos 90 dias · opcional", "Do relatório, a próxima safra já começa lida", "GSAAS · Gestão de Safra as a Service", "Agentes de IA que lembram a reunião, acompanham o lead pelo WhatsApp e passam ao vendedor a tarefa do dia." e os chips "Inteligência Artificial" e "Tecnologia".
- No programa, isso são: a definição do cartão, em variante escura e clara (6.242 caracteres); as 9 cópias apagadas dele na trilha do computador (uma por estado, do "02" ao "10"); a cópia em destaque da trilha do computador (2.971 caracteres); e o cartão da trilha do celular (5.247 caracteres).

Demonstração do produto (perfil "Para quem gere o time")
- No computador, o item "Agentes de IA" do menu lateral, com a etiqueta "GSAAS": as 5 cópias do item, uma para cada tela que fica (cerca de 1.110 caracteres cada), e o pedaço do menu que só aparecia com a tela dos agentes aberta (2.258 caracteres).
- No computador, a tela "Agentes de IA" (6.207 caracteres): "Agentes trabalhando agora", "Lembram a reunião, acompanham o lead pelo WhatsApp e passam ao vendedor a tarefa do dia.", o selo "No GSAAS, depois dos 90 dias", os três cartões de agente, cada um com o selo "trabalhando" ("Lembrete de reunião", com "Confirmando as reuniões de amanhã"; "Acompanhamento no WhatsApp", com "Lendo as conversas de ontem à noite"; e "Tarefa diária do vendedor", com "Separando os 14 contatos de hoje da safra de setembro") e a nota "Os agentes entram no GSAAS, depois dos 90 dias.".
- No computador, a sexta bolinha do indicador de telas, embaixo da janela, que só existia nesse perfil (400 caracteres). Ficam cinco, uma por tela, como no perfil do vendedor.
- No celular, o item "Agentes de IA" do menu (678 caracteres; lá ele não tinha a etiqueta) e a tela dos agentes (6.253 caracteres), com os mesmos textos da do computador.
- Das listas de telas do perfil, no computador e no celular, saiu "Agentes de IA": o avanço sozinho da demonstração volta de "Avaliação de calls" para "Painel de Safras".

### Cada medida que mudou

Carrossel, no computador
- Trilha: de 3.620 para 3.260 px (8 cartões de 340 px, o das Sessões de Comando, de 380 px, e 8 espaços de 20 px).
- Onde a trilha para: antes, em -2.520 px no estado "08" e em -2.540 px nos estados "09" e "10"; agora, em -2.180 px nos estados "08" e "09". É a mesma regra de antes: o fim da trilha encosta no fim do conteúdo, de 1.080 px. Os estados "01" a "07" ficam onde estavam (de 0 a -2.160 px).
- Barra do controle, ao lado do contador: de um décimo da largura, andando de 10 em 10%, para um nono (11,111%), andando de 11,111 em 11,111%.
- Altura dos cartões: não mudou (480 px).

Carrossel, no celular
- Trilha: de 3.026 para 2.722 px (9 cartões de 290 px e 8 espaços de 14 px).
- Onde a trilha para: antes, em -2.432 px no estado "09" e em -2.666 px no "10"; agora, em -2.362 px no estado "09" (o fim da trilha encosta no fim da janela, de 360 px). Os estados "01" a "08" ficam onde estavam (de 0 a -2.128 px).
- Barrinha de avanço dos controles (20 px): antes, em 0, 18, 37, 55, 74, 92, 112, 129, 148 e 169 px; agora, em 0, 21,125, 42,25, 63,375, 84,5, 105,625, 126,75, 147,875 e 169 px (nove posições iguais).
- Altura dos 9 cartões e da janela do carrossel: de 480 para 544 px. A seção inteira cresce os mesmos 64 px, e os controles e a seção seguinte descem junto.

Régua
- Barra acesa: no computador, de 249,231 px (fim da semana 3) para 166,154 px (fim da semana 2: duas semanas de 83,077 px); no celular, de 179,446 para 119,631 px (duas semanas de 59,815 px). Continua fixa: não acompanha o carrossel.
- O rótulo "Fase 1 · Ponto de partida" é mais comprido que o antigo (no computador, 135,7 px no lugar de 84,1) e continua acima do bloco, inteiro, sem reticências. Nenhuma medida da régua mudou por causa dele: ele fica 4 px acima do bloco da Fase 1 (3 px no celular) e 28 px abaixo do filtro por peça (33 px no celular), e termina 30 px à esquerda de onde começa o bloco da Fase 3 (22 px no celular).

Cartão 08
- Nenhuma medida mudou: a largura máxima da linha da fase continua em 140 px, como o pedido 18 deixou. Com "Encerramento", que é mais comprido, a quebra passa a ser "Encerramento · 3ª" e "Sessão de Comando" (era "Fechamento · 3ª Sessão" e "de Comando"). A linha continua em duas, alinhada à direita. Folga do texto até o número "08", medida na tela: 89 px no computador, 35 px no celular de 375 e 33 px no de 360. Antes, com "Fechamento", eram 68 px no computador e 16 px no celular de 375.

Cartão 01
- Nenhuma medida mudou: "Fase 1 · Ponto de partida" cabe em uma linha, a 80 px do número "01" no computador e a 30 px no celular.

### O que acompanha, sem aparecer

- **Os estados do carrossel.** As duas listas de estados passaram de dez para nove ("01" a "09"); as setas, o avanço sozinho (a cada 4 segundos no computador e 5 no celular) e o arrastar com o dedo no celular dão a volta do 09 para o 01.
- **O destaque no computador.** No computador, o estado N do carrossel põe a borda de destaque no cartão N-1 (já era assim; pergunta 18.2.7), e o estado "01" a punha no último cartão, que era o do GSAAS. Agora o último é o das Sessões de Comando, e é ele que recebe o destaque no estado "01", fora da tela, como o do GSAAS ficava. Antes, o cartão das Sessões recebia o destaque no estado "10", que deixou de existir.
- **Nomes internos.** O nome invisível do bloco da régua acompanhou o rótulo: "Fase · Análise" virou "Fase · Ponto de partida" (2 cópias).
- **O que sobra no programa e nunca aparece.** A palavra "GSAAS" não existe mais no programa (eram 18). "Agentes de IA" sobra 7 vezes, todas na demonstração do computador e nenhuma à vista: é o nome de um estado que não acontece mais, em seis listas de condição do menu e na definição do próprio estado. Também sobram os identificadores do estado "10" do carrossel, que nunca é usado. Ficam também quatro variáveis de imagem definidas e sem uso (os ícones do cartão do GSAAS e da tela dos agentes); as imagens não aparecem nem são pedidas pela página, e os arquivos continuam em pagina/a/. Tirar esses restos pediria mexer em centenas de pontos do programa, sem mudar nada na página.
- **O indicador de telas da demonstração no celular.** No celular, o programa tem seis bolinhas fixas embaixo da janela da demonstração, mas elas não aparecem na página: ficam inteiras fora do bloco da dica, que corta o que passa dele. Já era assim antes da v4. No computador, a sexta bolinha saiu com a tela dos agentes, porque lá é uma bolinha por tela; no celular as seis ficaram no programa, para cinco telas, porque o indicador é desenho fixo e o pedido não o lista (pergunta 20.2.10, escrita antes dessa medida, e pergunta 20.3.3, que a corrige, na resposta do pedido). Este item dizia, até a revisão da 20.3, que as seis bolinhas estavam à vista; a medida mostrou que não.

### As chamadas que não levavam ao quiz

Em quatro lugares o programa da página desenha a chamada como um bloco com o nome interno "Botão/Primário", e não como botão de verdade. O do cabeçalho no celular leva ao quiz desde a versão 3. Os outros três continuavam como vieram: a chamada do topo da página, no celular, só rolava a tela até o cartão da oferta; a do cartão da oferta (seção 08), no computador e no celular, não fazia nada. Agora o programa do fim do index.html leva ao quiz o clique em qualquer bloco com esse nome, desde que o texto comece por "Fazer a Análise" ou "Faça uma Análise", com as utm do endereço e o id_sessao, do mesmo jeito que os botões (pergunta 18.2.6, aprovada na #119). O clique é pego antes do programa da página: no topo do celular, a tela não rola mais. Nada mudou em assets/ por isto, e nenhum outro elemento mudou de comportamento: no programa, todo bloco ou botão com esse nome tem um desses dois textos, e nada mais na página tem.

Conferido com clique de verdade (toque, no celular) num navegador sem tela, em 1440, 375 e 360: as 10 chamadas de cada largura levam a /quiz/ com as utm e o id_sessao. São o "Fazer a Análise" do cabeçalho e nove "Faça uma Análise Estratégica do seu Sistema de Vendas": no topo (seção 01), na seção "Por que a venda fica cara" (a segunda, sem número no nome interno), nas seções 03, 04, 05, 06 e 07, no cartão da oferta (seção 08) e no FAQ (seção 09).

### O que não mudou

- A visita continua indo ao banco como landing-page-02, versão 1, que é a linha do catálogo.
- Tudo o que o pedido 18 pôs na página e este pedido não manda mudar: o título da seção, as outras três fases da régua, os losangos, a legenda, os cartões 02 a 07, o cartão das Sessões de Comando e a resposta de "É mais uma mentoria?". Conferido texto por texto contra a lista do ensaio: as contagens de antes e de depois são iguais, salvo "Painel de Safras", que perde uma cópia invisível, a da condição da bolinha que saiu da demonstração.
- No computador, a altura dos cartões (480 px) e o corte de 20 px à esquerda do primeiro cartão visível nos dois últimos estados (pergunta 18.3.4): era o cartão 08, nos estados "09" e "10"; agora é o 07, nos estados "08" e "09", porque a trilha continua parando 20 px depois do começo dele. O cartão das Sessões de Comando aparece inteiro, e depois dele não sobra cartão vazio nem espaço.
- O filtro por peça e o arrastar com o mouse no computador, que não fazem nada, e o contador defasado do computador (pergunta 18.2.7); a régua do celular, que não mostra a semana 13 (pergunta 18.2.5). Ficam para a revisão de UX (pedido 19).
- A peça "Inteligência Artificial", uma das sete do filtro por peça e chip dos cartões 01, 03, 05 e 08: é peça do método, não o GSAAS nem agente, e ficou como estava.

### Cabeçalho deste documento

Versão 4. depende_de ganha decisoes 9 (no lugar de decisoes 8). status, aprovado_por e desatualizado ficam como estão.

## Prints

Em prints/, 16 imagens, tiradas em 13/11/2026 (pedido 20, parte 20.3) do site montado, num navegador sem tela, com o aviso de cookies já recusado e sem dado de pessoa. **São da versão 4.** Os oito do pedido 18, que eram da v3 e ficaram velhos, foram refeitos com os mesmos nomes; os outros oito são novos. Entraram na v4 sem subir a versão de novo, porque o Fechamento da 20.3 do pedido pede o index.md com "a versão nova da landing-page-02", que é a v4 da 20.2; a página e o programa não mudaram na 20.3 (pergunta 20.3.1 da resposta do pedido, igual à 18.3.6).

Cada imagem é um recorte da janela, na largura inteira, com 2 pixels por ponto (o print de 1440 tem 2880 de largura); a altura é a da parte fotografada. O cabeçalho da página fica preso no topo da janela e aparece no topo de cada print. Quando a parte pedida é mais alta que a janela de costume (900 no computador, 812 no celular), o print saiu de uma janela mais alta, com a mesma largura, para a parte inteira caber numa imagem só (pergunta 18.3.2, mantida na #119). O carrossel e a demonstração avançam sozinhos: cada print foi tirado com eles parados, logo depois de um clique. As perguntas citadas estão em prompts/20-gsaas-fora-da-landing-resposta.md e em prompts/18-como-funciona-landing-02-resposta.md.

| Arquivo | Janela | O que mostra |
|---|---|---|
| como-funciona-regua-1440.png | 1440 por 1400 | A seção no computador, com o carrossel no 01 ("01 / 09"): o título, o filtro, a régua em quatro fases, com o rótulo "Fase 1 · Ponto de partida" acima do bloco, inteiro, os losangos e o negrito em S1, S2 e S13, a barra acesa terminando entre S2 e S3, a legenda, os cartões 01, 02 e 03 inteiros e "Arraste para ver as 8 entregas" |
| como-funciona-regua-375.png | 375 por 1320 | A seção no celular, com o carrossel no 01: o título, o filtro, a régua, com a barra acesa até o fim da semana 2, e o cartão 01 inteiro, com a linha "Fase 1 · Ponto de partida". A régua do celular vai além da tela e não rola: aparecem as quatro fases, S1 a S6 e os dois primeiros losangos (pergunta 18.2.5) |
| como-funciona-cartao-06-1440.png | 1440 por 900 | O carrossel no 06, no computador ("06 / 09"): os cartões 06, 07 e 08 inteiros (o 08 com a linha "Encerramento · 3ª" e "Sessão de Comando", em duas, legível) e o começo do cartão das Sessões de Comando |
| como-funciona-cartao-06-375.png | 375 por 812 | O carrossel no 06, no celular. **A última fileira de chips ("Inteligência de Mercado" e "Dados") aparece inteira,** com o respiro de baixo: o defeito da v3 saiu com os cartões de 544 px |
| como-funciona-sessoes-1440.png | 1440 por 900 | O carrossel no 09, no computador ("09 / 09"): o cartão das Sessões de Comando inteiro, sem número, por último, sem cartão depois dele; à esquerda, o 08 em destaque e o 07 com 20 px cortados (perguntas 20.2.1 e 20.2.2) |
| como-funciona-sessoes-375.png | 375 por 812 | O carrossel no 09, no celular: o cartão das Sessões de Comando, sem número, com o título, as três linhas e o chip "Mentalidade de Vendas" inteiro |
| como-funciona-fim-do-carrossel-1440.png | 1440 por 1400 | A seção inteira no computador, com o carrossel no fim: a régua, os cartões 07, 08 e o das Sessões de Comando, que é o último, o contador em "09 / 09" e a barra do controle no fim do trilho. É o mesmo enquadramento de como-funciona-regua-1440.png, no outro extremo do carrossel |
| como-funciona-fim-do-carrossel-375.png | 375 por 1320 | A seção inteira no celular, com o carrossel no fim: a régua, o cartão das Sessões de Comando por último, o contador em "09 / 09" e a barrinha de avanço no fim. No celular, cada ponto do carrossel mostra um cartão: o cartão é o mesmo de como-funciona-sessoes-375.png, com a seção em volta (pergunta 20.3.2) |
| faq-respostas-1440.png | 1440 por 1100 | O FAQ no computador, com as três respostas mexidas pelos pedidos 18 e 20 abertas e inteiras: "É mais uma mentoria?", "Quem me atende depois que eu assinar?" e "E depois dos 90 dias?" |
| faq-respostas-375.png | 375 por 1320 | O FAQ no celular, com as mesmas três respostas abertas e inteiras |
| demonstracao-gestor-1440.png | 1440 por 1500 | A demonstração do produto no computador, no perfil "Para quem gere o time", com a tela "Painel de Safras" aberta: o menu com os cinco itens (Painel de Safras, Onde a safra trava, Nunca disseram não, Reunião de safra e Avaliação de calls), sem "Agentes de IA", o título da janela e as cinco bolinhas do indicador |
| demonstracao-gestor-375.png | 375 por 1800 | A demonstração no celular, no mesmo perfil e na mesma tela: o menu com os cinco itens em duas colunas, de 3 e de 2, com a casa de baixo da direita vazia (pergunta 20.2.3). Embaixo da janela aparece só a dica "Toque numa tela do menu para ver funcionando": as seis bolinhas do indicador existem no programa, mas ficam inteiras fora do bloco da dica, que corta o que passa dele, e não aparecem na página, antes e depois da v4 (pergunta 20.3.3) |
| oferta-1440.png | 1440 por 900 | O cartão da oferta (seção 08) no computador, com a chamada "Faça uma Análise Estratégica do seu Sistema de Vendas", que agora leva ao quiz. O cartão mostra, como veio, "O seu mês vira em [X] dias e [Y] horas." (pergunta 20.3.4) |
| oferta-375.png | 375 por 812 | O cartão da oferta no celular, com a mesma chamada, que agora leva ao quiz, e o mesmo texto com [X] e [Y] |
| topo-1440.png | 1440 por 1100 | O topo da página no computador, como abre, sem rolar, até o fim da seção 01: o cabeçalho, com o "Fazer a Análise", e a chamada do topo, que já levava ao quiz. O cartão "Ao vivo" passa 61 px da borda direita da janela, e o número aparece cortado (pergunta 20.3.4) |
| topo-375.png | 375 por 1400 | O topo da página no celular, como abre, sem rolar, até o fim da seção 01: o cabeçalho e a chamada do topo, que agora leva ao quiz em vez de só rolar a tela |

As fotos e os nomes que aparecem nos prints (o Júnior e o Euclides, no topo, e o Júnior, no cartão das Sessões de Comando) são da própria página; nenhum print tem dado de lead. Os prints mostram a página do repositório na versão 4 e foram tirados do site montado, antes da publicação. A v4 foi ao ar em 13/11/2026, 16h35 (entregas/prototipo-funil-01/README.md, "Publicações"); a v3 não chegou a ser publicada sozinha.

## Como funciona no protótipo

- **Endereço.** A página fica na raiz do site (/). Os caminhos dela começam na raiz (/assets/, /a/, /fontes/), então ela não funciona em outra pasta nem aberta direto do arquivo.
- **Botões.** O "Fazer a Análise" do cabeçalho e as nove chamadas "Faça uma Análise Estratégica do seu Sistema de Vendas" levam a /quiz/ com as utm do endereço (as que existirem) e o código de sessão da visita, no parâmetro id_sessao (10.5). Antes, elas só rolavam a página. Vale para as chamadas que o programa da página desenha como botão e, também, para as que ele desenha como bloco: a do cabeçalho no celular (desde a v3) e, desde a v4, a do topo da página no celular e a do cartão da oferta (seção 08), no computador e no celular. Não sobra chamada que não leve ao quiz: são 10 em cada largura (lista em "O que mudou na versão 4").
- **Visita.** Ao abrir, a página manda a visita ao garçom (POST /api/evento) como entrega landing-page-02, versão 1, sem dado de pessoa (18.5). O banco só aceita a visita depois da linha nova do catálogo (dados/banco/catalogo-prototipo.sql, v3). Sem ela, a visita é recusada e o resto funciona igual.
- **Montagem.** entregas/prototipo-funil-01/montar-site.mjs copia index.html, assets/ e a/ para a raiz do site, e a Geist para /fontes/.

## Como ver na máquina

Da raiz do repositório, com as fontes instaladas (`npm install` em nucleo/ferramentas/fontes/):

```
node entregas/prototipo-funil-01/montar-site.mjs
python3 -m http.server 8000 -d entregas/prototipo-funil-01/site
```

Depois, abrir http://localhost:8000 no navegador. Sem o garçom, a visita não é gravada (o endereço /api/evento não existe nesse servidor), e o botão leva ao quiz do mesmo jeito.
