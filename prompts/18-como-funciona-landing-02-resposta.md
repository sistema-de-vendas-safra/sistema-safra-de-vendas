# 18 · Resposta · a seção "Como funciona" da landing-page-02 no calendário do Júnior

Feito em 13/11/2026, no Claude Code online, em três partes, um commit cada, direto na main (regra 7, exceção até 16/11/2026). As respostas do Otávio no pedido valeram como aprovação das mudanças de sentido que elas pedem (decisão do Otávio, 13/11/2026; base/decisoes.md, #118).

## Quatro avisos, antes de tudo

1. **O arquivo do pedido 18 não estava na main.** O pedido diz "Este arquivo já está na main, subido pelo Otávio", mas ele não estava. Foi salvo como prompts/18-como-funciona-landing-02.md, com o texto que o Otávio colou na conversa, e entrou no commit da 18.1.
2. **O #117 foi publicado.** O pedido diz que o #117 "também não foi publicado". Ele foi publicado em 13/11/2026, 9h20 (Current Version ID 31e6f08c-025d-4885-8601-63b145b7ffc5; log.md, entrada "publicação das respostas aos 'a definir' (#117)"). Então a publicação do pedido 18 fica para um pedido curto, sozinha, depois que o Otávio vir os prints.
3. **O pedido 13 passa a começar na decisão #119.** A #118 ficou com este pedido. O arquivo do pedido 13 (prompts/13-correcoes-e-decisoes-restantes.md) não foi editado.
4. **Nada foi publicado.** O protótipo no ar continua com a seção antiga, com as duas respostas antigas do FAQ e com o botão do cabeçalho sem levar ao quiz no celular. Os prints mostram a página do repositório.

## O que foi feito

### 18.1 · Registrar a decisão (commit 6c26624, "18.1 · decisão #118: a seção Como funciona no calendário do Júnior")

- **base/decisoes.md** v7 para v8: a #118, com a frase do Otávio ("Eu preciso fazer um ajuste nessa seção da landing page para que ela esteja de acordo com as últimas decisões de Junior sobre a entrega do produto."), a leitura do mentor e os textos aprovados citados por referência ao pedido. A #118 aplica #52, #53, #56, #72 a #80 e #83 à landing-page-02 e não muda nenhuma delas; nenhum fato muda. As decisões novas entram a partir da #119.
- **Cascata** (decisoes 7 para 8): nenhuma marca nova; os 44 arquivos que dependem das decisões já estavam com desatualizado: true.
- **Não mudou:** a ficha de fatos (v5) e base/produto.md (v4), que já diziam o que a #118 aplica.
- **Conferência dos textos aprovados contra a base**, sem trocar nenhum texto: nenhum contradiz um fato da ficha; sete pontos tocam o que a base deixa em aberto, escreve de outro jeito ou decidiu de outro jeito (perguntas 18.1.1 a 18.1.7).
- index.md e log.md; o arquivo do pedido entrou neste commit.

### 18.2 · A seção, o FAQ e o botão (commit e756cc7, "18.2 · a seção Como funciona, o FAQ e o botão do cabeçalho (landing-page-02 v3)")

- **entregas/landings/landing-page-02/** v2 para v3 (rascunho; otavio, junior e euclides: pendente). Os textos aprovados entraram letra por letra, no computador e no celular, em todas as cópias do programa empacotado (pagina/assets/index-BSwcbsoR.js, com o mesmo nome): 68 trocas distintas, 256 edições (lista inteira abaixo). O estilo não mudou.
- **A régua**, recalculada pelas semanas novas, no computador e no celular (o arranjo está abaixo). As barrinhas de 13 segmentos, acesas pela tabela do pedido.
- **O botão do cabeçalho no celular**, no programa do fim de pagina/index.html, sem mexer em assets/ por isto: o clique no bloco "Fazer a Análise" do cabeçalho passa a levar a /quiz/ com as utm e o id_sessao, como o botão grande.
- **README da landing-page-02** com "O que mudou na versão 3" e cada troca de texto visível, antes e depois; depende_de com decisoes 8. O projeto original da página, na Vercel, não tem estas mudanças: se um zip novo vier de lá, a lista precisa ir junto.
- A visita continua indo ao banco como landing-page-02, versão 1.
- **Defeito conhecido no celular:** com a descrição nova, o cartão 06 corta ao meio a última fileira de chips. A altura dos cartões não foi mudada, porque é desenho (pergunta 18.2.1; print como-funciona-cartao-06-375.png).
- Ensaio v7, sem edição: 173 de 173. Montagem: "Tudo certo".

### 18.3 · Prova, prints e fechamento (commit "18.3 · prova, prints e resposta do pedido 18")

- **Ensaio v8** (nucleo/ferramentas/ensaio/ensaio.mjs e README.md, v7 para v8): 26 conferências novas.
  - No programa montado (seção 6): nenhum texto antigo sobra ("Mentoria 1:1", "semanas 3, 7 e 13", "9 entregas", "45 dias", "gerente de safra", "Fase 4 · Entrega", "Semana 12", "Semanas 6 a 13", "Semanas 5 a 13"); cada texto novo com as cópias certas na versão do computador (22 textos, 33 cópias), na do celular (21 textos, 32 cópias) e nas definições dos cartões (17 textos, 50 cópias); as duas respostas novas do FAQ nas duas cópias.
  - Na página aberta (seção nova, a 10), em 1440, 375 e 360, sete por largura: o título, a régua e a legenda; os oito cartões e a descrição do 06; o cartão das Sessões de Comando sem número e o controle do carrossel; as duas respostas do FAQ abertas; a página inteira sem texto antigo e com "mentoria" só nos dois lugares permitidos; o "Fazer a Análise" do cabeçalho levando a /quiz/ com as utm e o id_sessao no formato do banco (no celular, é um bloco, não um botão); e o botão grande, também.
  - O contorno saiu: na seção da medição, o ensaio ia ao quiz, no celular, pelo botão grande, porque o do cabeçalho não levava; agora vai pelo do cabeçalho nas três larguras. O botão grande no celular continua conferido.
  - **Resultado: 199 de 199, duas rodadas seguidas**, em 104 e 103 segundos (as 173 da v7, todas de pé, mais 26).
- **A prova de que o ensaio pega o erro**, duas vezes, cada uma com uma mudança de propósito, desfeita pelo Git e conferida por SHA-256 contra o arquivo do commit:
  - A resposta antiga de "É mais uma mentoria?" ("Não. A mentoria é uma das 9 entregas...") devolvida só à cópia do celular do programa: **6 FALHOU de 199**. No programa, "nenhum texto antigo" (sobrou "9 entregas") e "as duas respostas novas do FAQ nas duas cópias"; na página, em 375 e em 360, a do FAQ e a da página inteira. Em 1440, tudo passou. Arquivo de volta igual ao do commit (SHA-256 091b703ad40d979eae1c812b92bd3ec92de52fcde1fc07e585abb6f25b8242af).
  - A mudança do botão desfeita no programa do fim do index.html: **9 FALHOU de 199**. Em 375 e em 360, a conferência nova do cabeçalho e as três da medição que dependem de chegar ao quiz por esse botão; e a do banco. Em 1440, tudo passou. Arquivo de volta igual ao do commit (SHA-256 60a37d379995d034978c82c42b1ddbaa757cd9341bda7513f3a94d0e982ef465).
- **No navegador sem tela**, sobre o site montado ("Tudo certo"), em 1440 por 900, 375 por 812 e 360 por 640, com o aviso de cookies já recusado:
  - Régua: os quatro rótulos de fase inteiros, em uma linha, sem reticências, sem corte por bloco pai nem pela tela; nada sobreposto entre 26 itens (4 blocos, 4 rótulos de fase, 3 losangos, 13 rótulos de semana, a legenda e o filtro); negrito em S1, S2 e S13.
  - Cartões: o rótulo de semana dos oito em uma linha só, nos dez pontos do carrossel.
  - Cartão das Sessões de Comando: sem número, com o mesmo topo e a mesma altura dos vizinhos, nos dez pontos (380 por 480 no computador, entre cartões de 340 por 480; no celular, igual aos vizinhos). Vale para a caixa do cartão: por dentro, sem o número, a barrinha e o título ficam mais altos que os dos vizinhos (pergunta 18.2.3).
  - "mentoria" à vista, com as seis respostas do FAQ abertas: só em "É mais uma mentoria?" e em "não mais um curso ou mentoria".
- **O que funciona e o que não faz nada**, medido no site de agora e numa cópia com o programa de antes da 18.2, com resultado igual nos dois, nas três larguras:

  | Controle | Como foi medido | Resultado, antes e agora |
  |---|---|---|
  | Setas | três cliques na seta de avançar e um na de voltar, lendo o contador; depois, do 01 para trás | **Funcionam:** 01, 02, 03, 04 e de volta ao 03; do 01 para trás cai no 10 |
  | Avanço sozinho | 17 segundos sem tocar em nada, lendo o contador | **Funciona:** um cartão a cada 4 segundos no computador e a cada 5 no celular |
  | Arrastar com o dedo (celular) | um toque arrastado da direita para a esquerda sobre os cartões | **Funciona:** do 02 ao 03 |
  | Arrastar com o mouse (computador) | botão do mouse apertado e arrastado sobre os cartões | **Não faz nada:** fica no 02. Já era assim |
  | Filtro por peça | um clique (no celular, um toque) em cada um dos 8 filtros, comparando a seção inteira antes e depois | **Não faz nada**, no computador nem no celular: nenhuma diferença na seção. Já era assim |

  O pedido lista o filtro e o arrastar entre as coisas que funcionam hoje. A prova só pode dizer que os dois continuam iguais ao que eram (pergunta 18.2.7).
- **Prints:** oito, em entregas/landings/landing-page-02/prints/ (lista abaixo). O README da landing-page-02 ganhou a seção "Prints"; os prints entraram na v3, sem subir a versão de novo, porque o Fechamento da 18.3 do pedido pede a landing-page-02 v3 no index.md (pergunta 18.3.6).
- **Registros:** index.md (a landing-page-02 na v3, com os prints; o ensaio na v8; esta resposta), log.md (entrada da 18.3 e a nota na Pendência do botão) e esta resposta. ESTADO.md não existe e não foi criado. O programa e o index.html da landing-page-02 não mudaram nesta parte.

## Os textos, como aparecem na página

Iguais no computador e no celular.

**Título da seção** (com "Como funciona" acima, como antes)

"Em 15 dias o sistema está instalado. Nos 90, a gente capacita o seu time a operar com máxima eficácia." ("máxima eficácia" em verde)

**Régua dos 90 dias**

- "Fase 1 · Análise" · semana 1
- "Fase 2 · Preparo do solo" · semanas 1 e 2
- "Fase 3 · Colheita" · semanas 3 a 13
- "Fase 4 · Plantio · em paralelo" · semanas 3 a 13
- Losangos em S1, S2 e S13; em negrito, S1, S2 e S13
- Legenda: "Sessões de Comando com o Junior Neves: duas no começo e uma no fim"

**Os oito cartões** (os títulos e os chips de "Peças que instala" não mudaram)

| Nº | Rótulo | Linha da fase | Título | Descrição | Barrinha acesa |
|---|---|---|---|---|---|
| 01 | "Semana 1" | "Fase 1 · Análise" | Análise Estratégica das Safras | como estava | 1 |
| 02 | "Semanas 1 e 2" | "Fase 2 · Preparo do solo" | Implementação da Infraestrutura | como estava | 1 e 2 |
| 03 | "Até o dia 15" | "Fase 2 · Preparo do solo" | Playbook de Comunicação Persuasiva | como estava | 1 e 2 |
| 04 | "Semanas 3 a 13" | "Fase 3 · Colheita" | Recuperação de Ativos | como estava | 3 a 13 |
| 05 | "Até o dia 15" | "Fase 2 · Preparo do solo" | Painel de Safras | como estava | 1 e 2 |
| 06 | "Semanas 3 a 13" | "Fase 4 · Plantio" | Treinamento para Otimização da Conversão | "A parte teórica sai nos primeiros 15 dias. Da semana 3 em diante, call semanal em grupo, com análise das calls do seu time." | 3 a 13 |
| 07 | "Semanas 1 e 2" | "Fase 2 · Preparo do solo" | Playbook da Gestão de Vendas por Safra | como estava | 1 e 2 |
| 08 | "Semana 13" | "Fechamento · 3ª Sessão de Comando" (em duas linhas) | Relatório de Produtividade | como estava | 13 |

Na página, o rótulo da semana aparece em caixa alta ("SEMANA 1"), como antes.

**Cartão das Sessões de Comando** (o antigo 09)

- Sem número. "Do começo ao fim", a foto e o nome do Junior Neves ficaram.
- Título: "Sessões de Comando entre o Junior Neves, você e o seu Head Comercial"
- "Semana 1 · A Análise Estratégica das Safras"
- "Semana 1 ou 2 · As mudanças, em aula e tarefa"
- "Semana 13 · O fechamento, com o Relatório de Produtividade"
- Barrinha: 1, 2 e 13 acesos.

**Controle do carrossel** (só existe no computador)

"Arraste para ver as 8 entregas". O contador "NN / 10" ficou: continuam 10 cartões.

**FAQ** (as perguntas não mudaram)

- "É mais uma mentoria?": "Não. São 8 entregas de implementação, dentro da sua operação: CRM, painel, régua de contato e playbooks. O Junior conduz as Sessões de Comando, e o seu time executa."
- "Quem me atende depois que eu assinar?": "O Junior, nas três Sessões de Comando com você e o seu Head Comercial: duas no começo e uma no fim. Da semana 3 em diante, o Junior e o Euclides conduzem a call semanal em grupo, e o seu time tem um grupo de WhatsApp com a nossa equipe para as dúvidas do dia a dia."

**Botão do cabeçalho no celular**

"Fazer a Análise" leva a /quiz/ com as utm do endereço e o id_sessao, como o botão grande.

## A régua: o arranjo escolhido e o rótulo da Fase 1

- **Duas linhas, como antes.** Em cima, a Fase 1 (S1) e a Fase 3 (S3 a S13). Embaixo, a Fase 2 (S1 e S2) e a Fase 4 (S3 a S13). As Fases 3 e 4, que correm em paralelo, ficam uma sobre a outra, com a mesma largura. As cores, a altura dos blocos e a conta das medidas são as de antes.
- **O rótulo "Fase 1 · Análise" saiu do bloco e ficou acima dele.** O bloco de uma semana tem 77 px no computador, e o texto, 84: não cabe dentro, nem ao lado (o vão até a Fase 3 é de 89 px, sem folga para os respiros). Ficou logo acima do bloco, inteiro, alinhado à esquerda dele, 4 px acima (no celular, 2,88), sem corte e sem reticências, como o pedido permite. Não encosta no filtro: sobra folga de 28 px no computador e de 33 no celular.
- **O bloco da Fase 2 perdeu parte do respiro da direita** (de 12 para 4 px; no celular, de 8,64 para 2,88), para o rótulo "Fase 2 · Preparo do solo" caber sem reticências.
- **No computador** (régua de 1080 px): a Fase 1 vai de 3 a 80 px; a Fase 2, de 3 a 163 px, na linha de baixo; as Fases 3 e 4, de 169 a 1077 px; os losangos ficam em S1, S2 e S13.
- **No celular**, as mesmas medidas vezes 0,72. A régua do celular tem 777,6 px e não rola: na tela aparecem as quatro fases, S1 a S6 e os dois primeiros losangos (pergunta 18.2.5).
- **No cartão 08**, a linha "Fechamento · 3ª Sessão de Comando" quebra em duas, alinhada à direita, porque em uma encostava no número. O rótulo "Semana 13" segue em uma linha.
- Conferido na 18.3, nas três larguras: nenhum rótulo cortado e nada sobreposto (perguntas 18.2.4 e 18.2.5).

## Todas as trocas no programa

Arquivo: entregas/landings/landing-page-02/pagina/assets/index-BSwcbsoR.js. São **68 trocas distintas**, com **191 cópias** ao todo e **256 edições** no arquivo, que passou de 1.626.278 para 1.626.449 caracteres. A conta das edições: cada barrinha vale uma cópia e muda de 2 a 13 segmentos (101 edições em 32 barrinhas), e no cartão 08 o texto e a quebra da linha da fase são a mesma edição, escrita como duas trocas (159 + 101 - 4 = 256).

**Não há troca fora desta lista.** Conferido de novo na 18.3: aplicar a lista sobre o programa do commit anterior à 18.2 (6c26624, o da 18.1) dá o programa de hoje, byte a byte, com o mesmo SHA-256 (091b703ad40d979eae1c812b92bd3ec92de52fcde1fc07e585abb6f25b8242af). Fora do programa, a 18.2 mudou só o programa do fim do index.html (o botão do cabeçalho) e o README.

Como ler: "texto visível" é o que a pessoa lê; "medida da régua" é posição ou largura; "desenho" é cor, peso de letra, segmento aceso ou quebra de linha; "nome interno" não aparece na página. As cópias de um texto de cartão são quatro: a definição escura, a definição clara, a seção do computador e a do celular. Nos nomes internos antigos das barrinhas havia uma meia-risca entre os números; aqui ela aparece como [meia-risca], porque a casa não escreve esse sinal.

**Título da seção**

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| texto visível | Em 90 dias a gente instala e capacita o seu time a operar o sistema com máxima eficácia. | Em 15 dias o sistema está instalado. Nos 90, a gente capacita o seu time a operar com máxima eficácia. | 2 | computador e celular |

**Régua dos 90 dias**

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| medida da régua | bloco Fase 1 · Análise: a 3px da esquerda, linha de cima, largura 243.231px (S1 a S3), rótulo dentro, com corte | bloco Fase 1 · Análise: a 3px da esquerda, linha de cima, largura 77.077px (S1), rótulo acima do bloco, sem corte | 1 | computador |
| medida da régua | rótulo Fase 1 · Análise: dentro do bloco, com reticências se não couber | rótulo Fase 1 · Análise: acima do bloco (4px de distância), alinhado à esquerda, sem reticências | 1 | computador |
| medida da régua | bloco Fase 2 · Preparo do solo: a 252.23px da esquerda, linha de cima, largura 243.231px (S4 a S6) | bloco Fase 2 · Preparo do solo: a 3px da esquerda, linha de baixo, largura 160.154px (S1 e S2), respiro da direita de 4px para o rótulo caber inteiro | 1 | computador |
| medida da régua | bloco Fase 3: a 335.31px da esquerda, linha de baixo, largura 741.692px (S5 a S13) | bloco Fase 3: a 169.15px da esquerda, linha de cima, largura 907.846px (S3 a S13) | 1 | computador |
| texto visível | Fase 3 · Colheita e plantio · em paralelo | Fase 3 · Colheita | 2 | computador e celular |
| nome interno, invisível | Fase · Colheita e plantio · em paralelo | Fase · Colheita | 2 | computador e celular |
| medida da régua | bloco Fase 4: a 916.85px da esquerda, linha de cima, largura 160.154px (S12 e S13) | bloco Fase 4: a 169.15px da esquerda, linha de baixo, largura 907.846px (S3 a S13) | 1 | computador |
| texto visível | Fase 4 · Entrega | Fase 4 · Plantio · em paralelo | 2 | computador e celular |
| nome interno, invisível | Fase · Entrega | Fase · Plantio · em paralelo | 2 | computador e celular |
| desenho | rótulo S1 da régua: leve, cinza | rótulo S1 da régua: negrito, claro | 2 | computador e celular |
| desenho | rótulo S2 da régua: leve, cinza | rótulo S2 da régua: negrito, claro | 2 | computador e celular |
| desenho | rótulo S3 da régua: negrito, claro | rótulo S3 da régua: leve, cinza | 2 | computador e celular |
| desenho | rótulo S7 da régua: negrito, claro | rótulo S7 da régua: leve, cinza | 2 | computador e celular |
| medida da régua | losango em S3 (a 207.69px da esquerda) | losango em S1 (a 41.54px da esquerda) | 1 | computador |
| medida da régua | losango em S7 (a 540px da esquerda) | losango em S2 (a 124.62px da esquerda) | 1 | computador |
| nome interno, invisível | Mentoria · S3 | Sessão de Comando · S1 | 2 | computador e celular |
| nome interno, invisível | Mentoria · S7 | Sessão de Comando · S2 | 2 | computador e celular |
| nome interno, invisível | Mentoria · S13 | Sessão de Comando · S13 | 2 | computador e celular |
| texto visível | Mentoria 1:1 com Junior Neves nas semanas 3, 7 e 13 | Sessões de Comando com o Junior Neves: duas no começo e uma no fim | 2 | computador e celular |
| medida da régua | bloco Fase 1 · Análise: a 2.16px da esquerda, linha de cima, largura 175.126px (S1 a S3), rótulo dentro, com corte | bloco Fase 1 · Análise: a 2.16px da esquerda, linha de cima, largura 55.495px (S1), rótulo acima do bloco, sem corte | 1 | celular |
| medida da régua | rótulo Fase 1 · Análise: dentro do bloco, com reticências se não couber | rótulo Fase 1 · Análise: acima do bloco (2.88px de distância), alinhado à esquerda, sem reticências | 1 | celular |
| medida da régua | bloco Fase 2 · Preparo do solo: a 181.61px da esquerda, linha de cima, largura 175.126px (S4 a S6) | bloco Fase 2 · Preparo do solo: a 2.16px da esquerda, linha de baixo, largura 115.311px (S1 e S2), respiro da direita de 2.88px para o rótulo caber inteiro | 1 | celular |
| medida da régua | bloco Fase 3: a 241.42px da esquerda, linha de baixo, largura 534.018px (S5 a S13) | bloco Fase 3: a 121.79px da esquerda, linha de cima, largura 653.649px (S3 a S13) | 1 | celular |
| medida da régua | bloco Fase 4: a 660.13px da esquerda, linha de cima, largura 115.311px (S12 e S13) | bloco Fase 4: a 121.79px da esquerda, linha de baixo, largura 653.649px (S3 a S13) | 1 | celular |
| medida da régua | losango em S3 (a 149.54px da esquerda) | losango em S1 (a 29.91px da esquerda) | 1 | celular |
| medida da régua | losango em S7 (a 388.8px da esquerda) | losango em S2 (a 89.72px da esquerda) | 1 | celular |

**Cartão 01**

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| texto visível | Semana 3 | Semana 1 | 4 | definições do cartão (escura e clara), computador e celular |
| desenho | barrinha de 13: acesos [3] | barrinha de 13: acesos [1] | 4 | definições do cartão (escura e clara), computador e celular |
| nome interno, invisível | Semanas 3[meia-risca]3 | Semanas 1 a 1 | 4 | definições do cartão (escura e clara), computador e celular |

**Cartão 02**

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| texto visível | Semana 4 | Semanas 1 e 2 | 4 | definições do cartão (escura e clara), computador e celular |
| desenho | barrinha de 13: acesos [4] | barrinha de 13: acesos [1, 2] | 4 | definições do cartão (escura e clara), computador e celular |
| nome interno, invisível | Semanas 4[meia-risca]4 | Semanas 1 a 2 | 4 | definições do cartão (escura e clara), computador e celular |

**Cartão 03**

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| texto visível | Semana 5 | Até o dia 15 | 4 | definições do cartão (escura e clara), computador e celular |
| desenho | barrinha de 13: acesos [5] | barrinha de 13: acesos [1, 2] | 4 | definições do cartão (escura e clara), computador e celular |
| nome interno, invisível | Semanas 5[meia-risca]5 | Semanas 1 a 2 | 4 | definições do cartão (escura e clara), computador e celular |

**Cartão 04**

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| texto visível | Semanas 5 a 13 | Semanas 3 a 13 | 4 | definições do cartão (escura e clara), computador e celular |
| texto visível | Fase 3 · Colheita e plantio | Fase 3 · Colheita | 4 | definições do cartão (escura e clara), computador e celular |
| desenho | barrinha de 13: acesos [5, 6, 7, 8, 9, 10, 11, 12, 13] | barrinha de 13: acesos [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] | 4 | definições do cartão (escura e clara), computador e celular |
| nome interno, invisível | Semanas 5[meia-risca]13 | Semanas 3 a 13 | 4 | definições do cartão (escura e clara), computador e celular |

**Cartão 05**

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| texto visível | Semana 6 | Até o dia 15 | 4 | definições do cartão (escura e clara), computador e celular |
| desenho | barrinha de 13: acesos [6] | barrinha de 13: acesos [1, 2] | 4 | definições do cartão (escura e clara), computador e celular |
| nome interno, invisível | Semanas 6[meia-risca]6 | Semanas 1 a 2 | 4 | definições do cartão (escura e clara), computador e celular |

**Cartão 06**

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| texto visível | Semanas 6 a 13 | Semanas 3 a 13 | 4 | definições do cartão (escura e clara), computador e celular |
| texto visível | Fase 3 · Colheita e plantio | Fase 4 · Plantio | 4 | definições do cartão (escura e clara), computador e celular |
| texto visível | Reunião semanal de safra, com análise das calls do seu time. | A parte teórica sai nos primeiros 15 dias. Da semana 3 em diante, call semanal em grupo, com análise das calls do seu time. | 4 | definições do cartão (escura e clara), computador e celular |
| desenho | barrinha de 13: acesos [6, 7, 8, 9, 10, 11, 12, 13] | barrinha de 13: acesos [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] | 4 | definições do cartão (escura e clara), computador e celular |
| nome interno, invisível | Semanas 6[meia-risca]13 | Semanas 3 a 13 | 4 | definições do cartão (escura e clara), computador e celular |

**Cartão 07**

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| texto visível | Semana 12 | Semanas 1 e 2 | 4 | definições do cartão (escura e clara), computador e celular |
| texto visível | Fase 4 · Entrega | Fase 2 · Preparo do solo | 4 | definições do cartão (escura e clara), computador e celular |
| desenho | barrinha de 13: acesos [12] | barrinha de 13: acesos [1, 2] | 4 | definições do cartão (escura e clara), computador e celular |
| nome interno, invisível | Semanas 12[meia-risca]12 | Semanas 1 a 2 | 4 | definições do cartão (escura e clara), computador e celular |

**Cartão 08**

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| texto visível | Fase 4 · Entrega | Fechamento · 3ª Sessão de Comando | 4 | definições do cartão (escura e clara), computador e celular |
| desenho | linha da fase do 08: uma linha, sem quebra | linha da fase do 08: quebra em duas linhas, alinhada à direita, largura máxima de 140px | 4 | definições do cartão (escura e clara), computador e celular |
| nome interno, invisível | Semanas 13[meia-risca]13 | Semanas 13 a 13 | 4 | definições do cartão (escura e clara), computador e celular |

**Cartão das Sessões de Comando (o antigo 09)**

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| texto visível | 09 (número do cartão) | (sem número) | 4 | definições do cartão (escura e clara), computador e celular |
| texto visível | Mentoria 1:1 entre Junior Neves, você e seu Head Comercial | Sessões de Comando entre o Junior Neves, você e o seu Head Comercial | 4 | definições do cartão (escura e clara), computador e celular |
| texto visível | Semana 3 | Semana 1 | 4 | definições do cartão (escura e clara), computador e celular |
| texto visível |  · A Análise Estratégica apresentada |  · A Análise Estratégica das Safras | 4 | definições do cartão (escura e clara), computador e celular |
| texto visível | Semana 7 | Semana 1 ou 2 | 4 | definições do cartão (escura e clara), computador e celular |
| texto visível |  · O balanço dos primeiros 45 dias |  · As mudanças, em aula e tarefa | 4 | definições do cartão (escura e clara), computador e celular |
| texto visível |  · O Relatório de Produtividade |  · O fechamento, com o Relatório de Produtividade | 4 | definições do cartão (escura e clara), computador e celular |
| desenho | barrinha de 13: acesos [3, 7, 13] | barrinha de 13: acesos [1, 2, 13] | 3 | definições do cartão (escura e clara) e computador |
| desenho | barrinha de 13: acesos [3, 7, 13], segmentos de 19 px | barrinha de 13: acesos [1, 2, 13], segmentos de 17 px | 1 | celular |
| nome interno, invisível | 09 · Mentoria (do começo ao fim) | Sessões de Comando (do começo ao fim) | 2 | computador e celular |

**Controle do carrossel**

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| texto visível | Arraste para ver as 9 entregas | Arraste para ver as 8 entregas | 1 | computador |

**FAQ · "É mais uma mentoria?"**

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| texto visível | Não. A mentoria é uma das 9 entregas. As outras 8 são instalação: CRM, painel, régua de contato e playbooks, dentro da sua operação. | Não. São 8 entregas de implementação, dentro da sua operação: CRM, painel, régua de contato e playbooks. O Junior conduz as Sessões de Comando, e o seu time executa. | 2 | FAQ do computador e FAQ do celular |

**FAQ · "Quem me atende depois que eu assinar?"**

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| texto visível | O Junior, nas mentorias das semanas 3, 7 e 13, com você e seu Head Comercial. Entre uma e outra, um gerente de safra acompanha o seu time toda semana. | O Junior, nas três Sessões de Comando com você e o seu Head Comercial: duas no começo e uma no fim. Da semana 3 em diante, o Junior e o Euclides conduzem a call semanal em grupo, e o seu time tem um grupo de WhatsApp com a nossa equipe para as dúvidas do dia a dia. | 2 | FAQ do computador e FAQ do celular |

## Os prints

Em entregas/landings/landing-page-02/prints/, tirados do site montado, num navegador sem tela, com o aviso de cookies já recusado e sem dado de pessoa; cada imagem é um recorte da janela, na largura inteira, com 2 pixels por ponto (o print de 1440 tem 2880 de largura); a altura é a da parte fotografada, menor que a da janela. O cabeçalho da página, que fica preso no topo da janela, aparece no topo de cada print. Cada um foi olhado depois de tirado: o que o pedido quer ver está inteiro e legível, com o carrossel parado.

| Arquivo | Janela | O que mostra |
|---|---|---|
| como-funciona-regua-1440.png | 1440 por 1500 | A seção no computador, com o carrossel no 01: o título, o filtro, a régua em quatro fases (o rótulo da Fase 1 acima do bloco), os losangos e o negrito em S1, S2 e S13, a legenda, os cartões 01, 02 e 03 inteiros e "Arraste para ver as 8 entregas" |
| como-funciona-regua-375.png | 375 por 1320 | A seção no celular, com o carrossel no 01: o título, o filtro, a régua e o cartão 01 inteiro. A régua aparece até S6 (pergunta 18.2.5) |
| como-funciona-cartao-06-1440.png | 1440 por 900 | O carrossel no 06, no computador: os cartões 06, 07 e 08 inteiros e o começo do cartão das Sessões de Comando |
| como-funciona-cartao-06-375.png | 375 por 812 | O carrossel no 06, no celular. **Este print mostra o defeito conhecido:** a última fileira de chips ("Inteligência de Mercado" e "Dados") cortada pela borda de baixo do cartão. Não foi consertado nem escondido: é para o Otávio ver e decidir (pergunta 18.2.1) |
| como-funciona-sessoes-1440.png | 1440 por 900 | O carrossel no 09, no computador: o cartão das Sessões de Comando inteiro, sem número, entre o 08 e o do GSAAS. O 08 aparece com 20 px cortados à esquerda, como já acontecia (pergunta 18.3.4) |
| como-funciona-sessoes-375.png | 375 por 812 | O carrossel no 09, no celular: o cartão das Sessões de Comando, sem número, com o título e as três linhas inteiras. O chip "Mentalidade de Vendas" fica escondido abaixo da borda, como já ficava (pergunta 18.2.1) |
| faq-respostas-1440.png | 1440 por 1200 | O FAQ no computador, com as duas respostas novas abertas |
| faq-respostas-375.png | 375 por 1320 | O FAQ no celular, com as duas respostas novas abertas |

No computador, os cartões 06 e das Sessões de Comando não cabem juntos numa tela (ficam a três cartões de distância): são dois prints. Os da régua e do FAQ saíram de uma janela mais alta que a de costume, com a mesma largura (pergunta 18.3.2).

## Numeração das decisões

A #118 ficou com este pedido (base/decisoes.md v8). **O pedido 13 passa a começar na #119.** O arquivo do pedido 13 não foi mudado.

## O que falta, e é do Otávio

1. Ver os oito prints. O de como-funciona-cartao-06-375.png pede decisão: a altura dos cartões no celular (pergunta 18.2.1).
2. Antes de publicar, confirmar com o Júnior e o Euclides a frase "o Junior e o Euclides conduzem a call semanal em grupo" (pergunta 18.1.1).
3. Pedir a publicação, num pedido curto, depois de ver os prints. Até lá, o que está no ar é a seção antiga.
4. Responder às perguntas abaixo. As de desenho (18.2.1 a 18.2.5, 18.2.7 e 18.3.4) podem ir juntas numa versão nova da landing-page-02.
5. Continua valendo o lembrete do token da Cloudflare, até 16/11/2026 (log.md, Pendências). Este pedido não usou o token.

## Perguntas para o Otávio

### Da 18.1

**18.1.1 · O Júnior e o Euclides na call em grupo, numa página pública.**
- Dúvida: a resposta aprovada de "Quem me atende depois que eu assinar?" diz "o Junior e o Euclides conduzem a call semanal em grupo". O formato é decidido (ficha-de-fatos#calls-em-grupo; #78, #79), mas a #79 diz que "o compromisso prometido com o Júnior são as três individuais", e se a presença dos dois no grupo vira compromisso público continua em aberto, à espera da confirmação de agenda dos dois (base/produto.md, "Os ritos"; lacuna-02). É a pergunta 9.10 (prompts/05-fila-perguntas.md, "O Euclides nas calls em grupo"), que virou o item 14 da pauta de aprovação e continua sem resposta; na landing-page-01, a mesma resposta do FAQ leva a marca de pendente pela 9.10. A 30.4 e a 31.5 (prompts/11-fila-perguntas.md) já têm resposta do Otávio, de 09/11, ainda não aplicada (pedido 13): "a #79 fica até os dois confirmarem a agenda". Essa resposta e o texto aprovado em 13/11 puxam para lados diferentes.
- O que foi feito: o texto aprovado não foi trocado, e a #118 registra a aprovação como está.
- Recomendação: confirmar com o Júnior e o Euclides antes de publicar; se a frase vai como está, dizer que ela vale como o compromisso público dos dois.
- Se decidir diferente: a resposta fala da call semanal em grupo sem dizer quem conduz, até o Júnior e o Euclides confirmarem a agenda.

**18.1.2 · Datas que a ficha chama de trabalho.**
- Dúvida: os cartões e a régua levam à página as semanas de ficha-de-fatos#quando-entrega-2, ficha-de-fatos#quando-entrega-4, ficha-de-fatos#quando-entrega-6 e ficha-de-fatos#quando-entrega-7. Os campos são decididos, mas com o aviso da Ficha do Serviço: "As datas ainda são de trabalho" até a engenharia reversa ser validada pelo Júnior e pelo Euclides (lacuna-01); firmes são três marcos (ficha-de-fatos#quando-entrega-1, ficha-de-fatos#sistema-instalado e ficha-de-fatos#quando-entrega-8). No mesmo assunto: a ficha põe a segunda Sessão de Comando em "semana 1 ou 2" (ficha-de-fatos#sessoes-de-comando), e a régua desenha o losango e o negrito em S2; o pedido já avisa, e o texto do cartão não crava a semana.
- O que foi feito: nada trocado.
- Recomendação: manter, porque as semanas são as da ficha; se a engenharia reversa mudar alguma, a ficha sobe de versão e a cascata marca a landing.
- Se decidir diferente: a página mostra só os três marcos, e os cartões 02, 04, 06 e 07 ficam sem rótulo de semana até a validação.

**18.1.3 · "Com análise das calls do seu time", no cartão 06.**
- Dúvida: a descrição aprovada diz "Da semana 3 em diante, call semanal em grupo, com análise das calls do seu time." Pela ficha, as calls de venda de cada cliente são analisadas e devolvidas no grupo de suporte dele, dentro do Treinamento (ficha-de-fatos#analise-de-calls; #88), não na call em grupo; a frase pode ser lida dos dois jeitos. A página de hoje já diz "com análise das calls do seu time".
- O que foi feito: nada trocado. O GLOSSARY.md ("Análise de calls") diz "dentro das calls em grupo": a base tem as duas leituras.
- Recomendação: manter; a análise faz parte da mesma entrega, e a frase não diz onde ela é devolvida.
- Se decidir diferente: a descrição passa a dizer que a análise volta no grupo de WhatsApp do cliente.

**18.1.4 · Duas grafias.**
- Dúvida: (a) o título do cartão das Sessões diz "Sessões de Comando entre o Junior Neves, você e o seu Head Comercial"; o nome do rito na #83 e em base/tom-de-voz.md ("Grafia") é "Sessões de Comando com o Junior Neves", que é como a legenda da régua escreve. (b) As duas respostas do FAQ dizem "O Junior" e "o Junior e o Euclides", só o primeiro nome, sem acento; ficha-de-fatos#grafia-junior fixa "Junior Neves" em público e "Júnior" no texto corrido, e não fala do primeiro nome sozinho em texto público; "o Euclides" também vai só pelo primeiro nome, e a ficha não tem campo de grafia para ele. A página de hoje já escreve "O Junior" no FAQ.
- O que foi feito: nada trocado; lido como a grafia de público, sem acento.
- Recomendação: manter os dois; numa próxima versão da ficha, grafia-junior passa a dizer que o primeiro nome sozinho, em público, também vai sem acento.
- Se decidir diferente: (a) o título passa a "Sessões de Comando com o Junior Neves, você e o seu Head Comercial"; (b) o FAQ escreve "Junior Neves" por extenso.

**18.1.5 · Os rótulos "Análise" e "Fechamento" contra a 9.15.**
- Dúvida: os textos aprovados mantêm "Fase 1 · Análise" (régua e cartão 01) e criam "Fechamento · 3ª Sessão de Comando" (cartão 08). A 9.15, aceita pelo Otávio em 09/11 (#114; prompts/08-decisoes-em-uma-pagina.md), diz que os rótulos "Análise" e "Fechamento" viram "Ponto de partida" e "Encerramento", e o GLOSSARY.md ("Ponto de partida e Encerramento") pede evitar os dois: "Análise" confunde com o diagnóstico do quiz (#92; o botão da página é "Fazer a Análise") e "Fechamento" é nome de etapa do funil.
- O que foi feito: nada trocado; os textos entram como aprovados em 13/11.
- Recomendação: o Otávio diz se a aprovação de 13/11 vale sobre a 9.15 na landing-page-02; se vale, a #114 ganha "#118 (9.15, na landing-page-02)" na próxima versão das decisões.
- Se decidir diferente: os rótulos passam a "Fase 1 · Ponto de partida" e "Encerramento · 3ª Sessão de Comando", numa versão nova da landing.

**18.1.6 · As fases de cor da #80.**
- Dúvida: a #80 é "fases de cor e a mensagem dos 15 dias", e o pedido a cita como origem da régua. Na base, as fases de cor são três, vermelho, amarelo e verde (base/tom-de-voz.md; GLOSSARY.md, "Fases de cor"; a 8.11, aceita na #114: as fases aparecem só pela ordem e pelo que acontece em cada uma; a 9.9 segue com o Júnior). A régua aprovada tem as quatro etapas de base/produto.md, com nome de lavoura, e nenhuma fase de cor.
- O que foi feito: a #118 diz que, da #80, entra a mensagem dos 15 dias.
- Recomendação: manter as quatro etapas e deixar as fases de cor com a 9.9.
- Se decidir diferente: a régua ganha as três fases pela ordem, como na 8.11, numa versão nova.

**18.1.7 · O cartão do GSAAS na seção, contra a #68.**
- Dúvida: os textos aprovados se apoiam no cartão do GSAAS ("sem número, como o cartão do GSAAS"; continuam 10 cartões), e o pedido manda mantê-lo. A #68 diz "nada de GSAAS, gerente e entrega na primeira etapa", base/produto.md ("Continuidade") repete, e ficha-de-fatos#gsaas está "para depois" (#84). O cartão veio com a landing-page-02 em 12/11 (o texto ficou como veio) e nunca foi registrado.
- O que foi feito: nada; está fora do que o pedido 18 deixa mexer.
- Recomendação: o Otávio registra a exceção para a landing-page-02 ou o cartão sai numa versão futura.
- Se decidir diferente: fica como está, sem registro.

### Da 18.2

**18.2.1 · O cartão 06 corta os chips no celular.**
- Dúvida: no celular, o cartão tem 290 por 480 px; com a descrição aprovada do 06 (cinco linhas ali), a última fileira de chips, "Inteligência de Mercado" e "Dados", aparece cortada ao meio. Antes, cabia. No cartão das Sessões de Comando, o chip "Mentalidade de Vendas" fica escondido, como já ficava no antigo 09.
- O que foi feito: nada na altura; os prints da 18.3 mostram o corte.
- Recomendação: subir os dez cartões do celular de 480 para 544 px, que resolve o 06 e o das Sessões (524 px resolvem só o 06).
- Se decidir diferente: uma descrição mais curta para o 06, que é texto do Otávio, ou fica como está.

**18.2.2 · A barra de progresso da régua é fixa.**
- Dúvida: o pedido a chama de "o progresso na régua acompanhando o carrossel", mas ela tem largura fixa no programa (249,231 px no computador, o fim da semana 3; 179,446 px no celular) e não se mexe quando o carrossel avança, antes e agora.
- O que foi feito: nada.
- Recomendação: o Otávio escolhe entre tirar a barra, fixá-la no fim da semana 2 (os 15 dias) ou fazê-la acompanhar o cartão, que é programa novo.
- Se decidir diferente: fica como está, acesa até a semana 3.

**18.2.3 · O cabeçalho do cartão das Sessões de Comando.**
- Dúvida: o pedido manda tirar o número, "como o cartão do GSAAS", que tem um ícone à esquerda e o rótulo à direita.
- O que foi feito: saiu só o número; "Do começo ao fim" passou da direita para a esquerda e o conteúdo subiu 40 px, então a barrinha e o título ficam mais altos que os dos cartões vizinhos.
- Recomendação: manter, e o Otávio vê no print.
- Se decidir diferente: o cabeçalho volta à altura antiga (alinha com os vizinhos, mas o texto passa mais do cartão no celular) ou ganha um ícone, que é desenho novo.

**18.2.4 · O rótulo da Fase 1 acima do bloco, o respiro da Fase 2 e a linha do cartão 08 em duas.**
- Dúvida: três escolhas de desenho para nenhum texto ser cortado.
- O que foi feito: como descrito acima.
- Recomendação: manter.
- Se decidir diferente: outra posição para a Fase 1 pede uma terceira linha na régua; uma linha só no 08 pede texto mais curto.

**18.2.5 · No celular, a régua não mostra a semana 13.**
- Dúvida: a régua do celular tem 777,6 px numa tela de 360 a 375 e não rola (o nome interno diz que rola); aparecem S1 a S6. O losango e o negrito de S13 existem e nunca aparecem, enquanto a legenda diz "duas no começo e uma no fim". Já era assim.
- O que foi feito: nada; os quatro rótulos de fase, S1, S2 e os dois primeiros losangos aparecem inteiros.
- Recomendação: decidir se a régua do celular rola ou encolhe; é programa novo na seção do celular.
- Se decidir diferente: fica como está.

**18.2.6 · Fora do pedido: duas chamadas que não levam ao quiz.**
- Dúvida: a chamada do cartão da oferta, no computador e no celular, é desenhada como bloco e não faz nada ao clique; a do topo da página, no celular, só rola a tela até a oferta. A resposta do pedido 17 dizia que "o botão grande leva ao quiz no celular": isso vale para os botões das seções do meio da página, não para esses dois.
- O que foi feito: nada; o pedido 18 só autoriza o cabeçalho.
- Recomendação: um pedido curto para o programa do fim levar esses dois ao quiz.
- Se decidir diferente: ficam como estão.

**18.2.7 · O filtro por peça, o arrastar com o mouse e o contador.**
- Dúvida: o pedido lista o filtro como coisa que funciona hoje, mas clicar num filtro não muda nada, no computador nem no celular (o programa não trata o clique); arrastar com o mouse no computador não avança; e, no computador, o estado N do contador destaca o cartão N-1. Tudo igual antes e depois.
- O que foi feito: nada.
- Recomendação: tratar como pendência da landing-page-02, à parte.
- Se decidir diferente: nada muda nesta parte.

**18.2.8 · Mudanças invisíveis e de desenho além do texto.**
- Dúvida: os nomes internos acompanharam a mudança, as meias-riscas dos nomes das barrinhas viraram "a", e os segmentos da barrinha das Sessões ficaram com 17 px no celular (com 19, o segmento 13 ficava fora do cartão).
- O que foi feito: como descrito.
- Recomendação: manter.
- Se decidir diferente: os nomes antigos voltam (14 trocas, com 44 cópias, saem da lista).

### Da 18.3

**18.3.1 · Os textos aprovados escritos também no ensaio.**
- Dúvida: a regra 2 manda referenciar, não copiar; para conferir a página, o ensaio precisa do texto esperado, e os textos aprovados moram no pedido 18, não num documento da base.
- O que foi feito: os textos estão no ensaio (LANDING_V3), com o aviso de que quem manda é o pedido.
- Recomendação: manter; se um texto mudar, o ensaio falha e avisa.
- Se decidir diferente: os textos passam a morar num arquivo só, na pasta da landing-page-02, e o ensaio lê de lá.

**18.3.2 · A janela dos prints da régua e do FAQ.**
- Dúvida: o pedido quer os prints em 1440 e 375; a seção com a régua e o cartão 01 e o FAQ com as duas respostas abertas são mais altos que a janela de costume (900 e 812).
- O que foi feito: esses quatro prints saíram de uma janela mais alta, com a mesma largura (1440 por 1500 e por 1200; 375 por 1320); o cabeçalho da página, preso no topo, aparece no topo de cada print.
- Recomendação: manter.
- Se decidir diferente: cada um vira dois prints na janela de costume.

**18.3.3 · O modo --sem-wrangler do ensaio.**
- Dúvida: o contorno sem wrangler já falhava no passo 6 antes do pedido 18 (também no commit da 18.1, segundo a revisão da 18.2).
- O que foi feito: nada; a v8 foi rodada só no modo padrão.
- Recomendação: um pedido curto para consertar o contorno ou tirá-lo do README do ensaio.
- Se decidir diferente: fica como está, sem garantia.

**18.3.4 · O que os prints mostram e já era assim.**
- Dúvida: (a) no computador, nos pontos 09 e 10 do carrossel, o cartão 08 aparece com 20 px cortados à esquerda (o cartão das Sessões tem 380 px, os outros 340, e a trilha para 20 px antes); (b) no celular, a barrinha de 13 segmentos dos cartões 01 a 08 termina a 5 px da borda direita do cartão, dentro do respiro. As duas coisas estão iguais no programa de antes da 18.2.
- O que foi feito: nada; a primeira aparece em como-funciona-sessoes-1440.png, a segunda nos prints de 375.
- Recomendação: tratar junto com as pendências de desenho da landing-page-02 (perguntas 18.2.1, 18.2.5 e 18.2.7).
- Se decidir diferente: ficam como estão.

**18.3.5 · O que não acompanhou a v8 do ensaio.**
- Dúvida: (a) o cabeçalho do ensaio declara prototipo-funil-01 11, e o protótipo está na v12 (só o registro da publicação do #117); o pedido só mandou trocar landing-page-02 e decisoes. (b) nucleo/ferramentas/README.md descreve o ensaio até a seção da medição (v6) e não fala da seção 10.
- O que foi feito: nada nos dois.
- Recomendação: na próxima versão do ensaio, declarar prototipo-funil-01 12 e acrescentar uma frase no README das ferramentas.
- Se decidir diferente: ficam como estão; o ensaio continua marcado como desatualizado.

**18.3.6 · A landing-page-02 ficou na v3 com os prints.**
- Dúvida: a regra de versionamento manda subir a versão a cada alteração de conteúdo, e a v3 já estava no commit da 18.2 quando o README ganhou a seção "Prints" e a entrega ganhou a pasta prints/; o Fechamento da 18.3 do pedido, por outro lado, pede o index.md com a landing-page-02 v3.
- O que foi feito: ficou na v3, com os prints registrados como parte dela; a página e o programa não mudaram na 18.3.
- Recomendação: manter, porque o pedido escreve v3.
- Se decidir diferente: o README sobe para a v4 com "O que mudou na versão 4: os prints", o ensaio passa a declarar landing-page-02 4 e o index.md acompanha.

## Como cada parte foi feita

Em cada parte, um subagente escreveu e outro, que não viu a escrita, revisou contra o pedido e o repositório; as correções das revisões entraram antes de cada commit (log.md, linha "Revisão independente" das entradas da 18.1 e da 18.2). A 18.3 passou pela mesma revisão antes do commit: o revisor rodou o ensaio por conta própria (199 de 199), refez a conferência da lista das trocas de dois jeitos e olhou os oito prints. Três acertos de texto entraram antes do commit: a frase sobre o tamanho dos prints, a justificativa da v3 com a pergunta 18.3.6, e "14 trocas, com 44 cópias" na pergunta 18.2.8 (no log.md da 18.2, já no commit, a frase continua "44 trocas"; o sentido é o mesmo: 44 cópias de 14 trocas).

## Commits que subiram (regra 7)

- 6c26624 · 18.1 · decisão #118: a seção Como funciona no calendário do Júnior (com o arquivo do pedido 18, que não estava na main)
- e756cc7 · 18.2 · a seção Como funciona, o FAQ e o botão do cabeçalho (landing-page-02 v3)
- 18.3 · prova, prints e resposta do pedido 18 (o hash sai no commit e aparece no histórico do Git)
