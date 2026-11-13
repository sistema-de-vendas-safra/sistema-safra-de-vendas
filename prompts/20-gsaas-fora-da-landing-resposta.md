# 20 · Resposta · o GSAAS fora da landing-page-02 e as respostas do Otávio ao pedido 18

A saída prevista no pedido para a demonstração do produto não foi usada: o item "Agentes de IA" e a tela dele saíram, sem quebrar a demonstração. A conferência do "GSAAS" vale para a página inteira, sem exceção.

Feito em 13/11/2026, no Claude Code online, em três partes, um commit cada, direto na main (regra 7, exceção até 16/11/2026). As duas respostas do Otávio no pedido ("Tira da landing." e "Aprovo tudo.") valeram como aprovação das mudanças de sentido que elas pedem (decisão do Otávio, 13/11/2026; base/decisoes.md, #119).

## Três avisos, antes de tudo

1. **O pedido 13 passa a começar na decisão #120.** A #119 ficou com este pedido. O arquivo do pedido 13 (prompts/13-correcoes-e-decisoes-restantes.md) não foi editado.
2. **Nada foi publicado: o protótipo no ar continua com a página de antes do pedido 18 (versão 31e6f08c).** No ar, a página ainda tem o cartão e a tela do GSAAS, os textos antigos da seção "Como funciona" e do FAQ e as chamadas que não levam ao quiz: no celular, a do cabeçalho, a do topo e a do cartão da oferta; no computador, a do cartão da oferta. Os prints mostram a página do repositório.
3. **Dois achados da 20.3, fora do que o pedido lista, para o Otávio ver antes de publicar:** no cartão da oferta, a frase "O seu mês vira em [X] dias e [Y] horas." aparece com [X] e [Y], como veio no zip, e é o que está no ar (pergunta 20.3.4); e as seis bolinhas do indicador da demonstração no celular, de que fala a pergunta 20.2.10, existem no programa mas não aparecem na página (pergunta 20.3.3).

## O que foi feito

### 20.1 · Registrar a decisão (commit 632bd0e, "20.1 · decisão #119: o GSAAS fora da landing e as respostas ao pedido 18")

- **base/decisoes.md** v8 para v9: a #119, com as duas frases do Otávio, sobre o que cada uma foi dita, e a tabela "pergunta por pergunta" e os textos aprovados por referência ao pedido, sem cópia. A #119 aplica a #68 e a #84 à landing-page-02, faz valer a 9.15 (#114) sobre os rótulos da #118 e substitui, na #118, a resposta de "Quem me atende depois que eu assinar?". "Revista por" da #118 ganha a #119. Nenhum fato muda: a ficha de fatos (v5) e base/produto.md (v4) ficam como estão. As decisões novas entram a partir da #120.
- **Cascata** (decisoes 8 para 9): nenhuma marca nova; os 44 arquivos que dependem das decisões já estavam com desatualizado: true.
- **Conferência dos textos aprovados contra a base**, sem trocar nenhum texto: nenhum contradiz um fato da ficha; dois pontos tocam o que a base deixa em aberto ou escreve de outro jeito, e um é ponta solta de uma recomendação aprovada (perguntas 20.1.1 a 20.1.3).
- index.md e log.md. O arquivo do pedido 20 já estava na main (commit 219d9ab, do mentor, junto com o pedido 19) e não foi regravado.

### 20.2 · A página (commit 726c432, "20.2 · o GSAAS fora da landing-page-02, FAQ, rótulos e chamadas (v4)")

- **entregas/landings/landing-page-02/** v3 para v4 (rascunho; otavio, junior e euclides: pendente). As seis mudanças do pedido, no programa empacotado (pagina/assets/index-BSwcbsoR.js, com o mesmo nome; 39 trocas distintas, 66 edições, lista inteira abaixo) e, a das chamadas, numa linha do programa do fim de pagina/index.html. O estilo não mudou.
- **1 · O GSAAS fora do carrossel.** Saiu o cartão do GSAAS. Ficam 9 cartões: as 8 entregas e o das Sessões de Comando, por último. O contador vai de "01 / 09" a "09 / 09"; as setas, o arrastar com o dedo no celular e o avanço sozinho dão a volta do 09 ao 01, sem cartão vazio nem sobra no fim.
- **2 · O GSAAS fora da demonstração do produto.** Saíram o item "Agentes de IA", com a etiqueta "GSAAS", e a tela dele ("Agentes trabalhando agora", o selo "No GSAAS, depois dos 90 dias" e a nota "Os agentes entram no GSAAS, depois dos 90 dias."), no computador e no celular. Os outros itens continuam abrindo cada um a sua tela, nos dois perfis.
- **3 · As duas respostas do FAQ e os dois rótulos,** letra por letra, no computador e no celular. O rótulo novo da Fase 1 continua acima do bloco, inteiro, em uma linha. A linha do cartão 08 continua em duas, sem encostar no número; a largura máxima da linha ficou nos 140 px do pedido 18 (pergunta 20.2.4).
- **4 · A altura dos cartões no celular:** de 480 para 544 px, nos 9 cartões. No computador, não mudou.
- **5 · A barra acesa da régua** termina no fim da semana 2, no computador e no celular. Continua fixa.
- **6 · As chamadas.** A do topo da página, no celular, e a do cartão da oferta, no computador e no celular, passam a levar a /quiz/ com as utm do endereço e o id_sessao, como as outras.
- **README da landing-page-02** com "O que mudou na versão 4": cada troca de texto (antes e depois), cada bloco que saiu e cada medida que mudou. É a lista que vai junto se um zip novo vier do projeto original, na Vercel. depende_de com decisoes 9.
- A visita continua indo ao banco como landing-page-02, versão 1 (pergunta 20.2.8).
- Ensaio v8, sem edição, depois da mudança: 186 de 199; as 13 que falhavam esperavam os textos trocados de propósito. Montagem: "Tudo certo".

### 20.3 · Prova, prints e fechamento (commit "20.3 · prova, prints e resposta do pedido 20")

- **Ensaio v9** (nucleo/ferramentas/ensaio/ensaio.mjs e README.md, v8 para v9): 31 conferências novas.
  - No programa montado (seção 6), quatro: "GSAAS" em lugar nenhum, nem o cartão do GSAAS, nem o item e a tela "Agentes de IA" da demonstração; nenhum texto que o pedido 20 trocou ("Fase 1 · Análise", "Fechamento · 3ª Sessão de Comando" e um pedaço de cada resposta antiga do FAQ); as duas respostas do FAQ do pedido 20, cada uma logo depois da sua pergunta, nas duas cópias; e o contador do carrossel com 9 estados, de "01 / 09" a "09 / 09", uma vez cada e nenhum outro, na versão do computador e na do celular.
  - Na página aberta (seção nova, a 11), em 1440, 375 e 360, nove por largura: o carrossel com 9 cartões em todos os estados e o contador dando a volta, seta a seta, de "01 / 09" a "09 / 09" e de volta ao começo; nenhum chip cortado em nenhum cartão, em nenhum estado (28 chips em 9 cartões); a barra acesa da régua terminando no fim da semana 2, sem se mexer com o carrossel; o FAQ com as 6 perguntas abertas e as duas respostas do pedido 20; a demonstração do produto, nos dois perfis, com o menu de 5 itens, sem "Agentes de IA", a troca de perfil abrindo a primeira tela do perfil e cada item do menu abrindo a sua tela, com o item aceso (10 de 10 cliques no menu; 10 telas diferentes no computador e 6 no celular, onde o menu mostra os itens de quem gere o time nos dois perfis e do perfil do vendedor só a primeira tela é conferida); os dois rótulos novos à vista e nenhum texto que o pedido 20 trocou; "GSAAS" em nenhum texto à vista (a página como abre e com as 6 respostas abertas, os estados do carrossel e os 10 cliques no menu da demonstração); a chamada do topo da página levando a /quiz/ com as utm e o id_sessao no formato do banco; e a do cartão da oferta, também.
  - **As 199 conferências da v8 continuam, com o mesmo rótulo e na mesma ordem.** Treze mudaram só de valor esperado, porque este pedido trocou de propósito três textos: o rótulo da Fase 1, a linha da fase do cartão 08 e a resposta de "Quem me atende depois que eu assinar?". São as três das cópias no programa (computador, celular e definições), a das duas respostas do FAQ no programa e, em cada largura, a das quatro fases da régua, a dos oito cartões e a do FAQ. Nenhuma saiu nem ficou mais fraca.
  - Os textos aprovados dos dois pedidos estão no ensaio (LANDING_V3 e LANDING_V4), só para conferir a página, com o aviso de que quem manda é o pedido.
  - **Resultado: 230 de 230, duas rodadas seguidas**, em 132 e 136 segundos (as 199 da v8 mais 31). Depois do reforço pedido pela revisão independente (a troca de perfil da demonstração tem de abrir a primeira tela do perfil), mais duas rodadas: 230 de 230, em 137 e 141 segundos.
- **O teste do quiz**, sem edição: 345 de 345. Os prints do quiz que o teste regrava voltaram ao que estava no commit: o conteúdo era o mesmo.
- **A prova de que o ensaio pega o erro**, duas vezes, cada uma com uma mudança de propósito, desfeita pelo Git e conferida por SHA-256 contra o arquivo do commit:
  - A frase antiga de "E depois dos 90 dias?" ("... Quem quiser continuar tem o GSAAS, opcional: a gente mantém o CRM e o painel e coloca os agentes de IA para trabalhar.") devolvida só à cópia do celular do programa: **9 FALHOU de 230**. No programa, a do "GSAAS", a dos textos trocados e a das duas respostas do FAQ; na página, em 375 e em 360, a do FAQ, a dos textos trocados e a do "GSAAS" à vista. Em 1440, tudo passou. Arquivo de volta igual ao do commit (SHA-256 cc58b5ed504179b548c2fef3cfd1ceafc8878260d2676d822d0107405fe4d060).
  - O conserto das chamadas desfeito no programa do fim do index.html: **5 FALHOU de 230**. A chamada do cartão da oferta em 1440, 375 e 360, e a do topo da página em 375 e 360. A do topo em 1440, que é um botão, passou; o "Fazer a Análise" do cabeçalho no celular continuou levando ao quiz. Arquivo de volta igual ao do commit (SHA-256 b522b8fee4083361826c8e1ebce983edc45b6c995e43adb438d3a9c34a217e3c).
  - Uma terceira rodada, a mais: com o programa e o index.html de antes da 20.2, **42 FALHOU de 230**, as 13 de antes e 29 das 31 novas. Só passaram, das novas, a dos chips em 1440 e a da chamada do topo em 1440, que já eram verdade antes.
- **No navegador sem tela**, sobre o site montado ("Tudo certo"), em 1440 por 900, 375 por 812 e 360 por 640, com o aviso de cookies já recusado:
  - Carrossel: 9 cartões e 9 estados. As setas dão a volta nos dois sentidos. O avanço sozinho dá a volta do 09 ao 01, a cada 4 segundos no computador e a cada 5 no celular. Arrastar com o dedo avança, volta e dá a volta, em 375 e em 360. Arrastar com o mouse no computador não faz nada, como antes (pergunta 18.2.7).
  - No último estado, o cartão das Sessões de Comando aparece inteiro, e o fim dele é o fim da trilha: no computador, com o cartão 07 cortado 20 px à esquerda (pergunta 20.2.2); no celular, encostado no fim da janela.
  - Régua: "Fase 1 · Ponto de partida" inteiro, em uma linha, sem reticências, acima do bloco; nada sobreposto; o fim da barra acesa a 0,01 px ou menos do meio entre S2 e S3.
  - Cartões: a linha do cartão 08 em duas, "Encerramento · 3ª" e "Sessão de Comando", a 89 px do número no computador e a 35 e 33 px na tela do celular de 375 e de 360; a do cartão 01 em uma linha; no celular, os 9 cartões com 544 px e o chip mais baixo de cada um 27 a 28 px acima da borda de baixo.
  - Demonstração: no computador, 5 itens em cada perfil, cada um abrindo a sua tela (10 telas); no celular, o menu mostra os 5 itens de quem gere o time nos dois perfis, cada um abrindo a sua tela, e a troca para o perfil do vendedor abre "Contatos de hoje" (as outras telas do vendedor só aparecem pelo avanço sozinho; pergunta 20.3.5); no computador, 5 bolinhas e vãos iguais no menu; no celular, o menu em duas colunas, de 3 e de 2 (pergunta 20.2.3).
  - Texto à vista, com o FAQ aberto, as telas da demonstração e todos os carrosséis: nenhum "GSAAS", nenhum "agente" e nenhum "IA" solto. Nenhum erro de programa na página.
- **Prints:** 16, em entregas/landings/landing-page-02/prints/ (lista abaixo). O README da landing-page-02 teve a seção "Prints" reescrita e, pela revisão, o item sobre o indicador da demonstração no celular corrigido (pergunta 20.3.3); os prints entraram na v4, sem subir a versão de novo, porque o Fechamento da 20.3 do pedido pede a versão nova da landing-page-02 no index.md, que é a v4 (pergunta 20.3.1).
- **A 18.3.5, aplicada:** o cabeçalho do ensaio declara prototipo-funil-01 12, landing-page-02 4 e decisoes 9; nucleo/ferramentas/README.md ganhou a frase sobre o que o ensaio confere desde a v7, a v8 (seção 10) e a v9 (seção 11).
- **Registros:** index.md (a landing-page-02 na v4, com os prints; o ensaio na v9, com a contagem; esta resposta; e a contagem do teste do quiz na linha de ferramentas/prints/, que dizia 342 de 342 desde antes da #117 e passa a 345 de 345), log.md (entrada da 20.3 e a nota na Pendência das chamadas) e esta resposta. ESTADO.md não existe e não foi criado. O programa e o index.html da landing-page-02 não mudaram nesta parte.

## Os textos, como aparecem na página

Iguais no computador e no celular.

**FAQ** (as perguntas não mudaram; são seis)

- "Quem me atende depois que eu assinar?": "O Junior, nas três Sessões de Comando com você e o seu Head Comercial: duas no começo e uma no fim. Da semana 3 em diante, o seu time participa da call semanal em grupo e tem um grupo de WhatsApp com a nossa equipe para as dúvidas do dia a dia."
- "E depois dos 90 dias?": "Os playbooks e o treinamento ficam com o seu time. O sistema fica por escrito, para rodar sem a gente."

**Rótulos**

- Na régua e no cartão 01: "Fase 1 · Ponto de partida". Na régua, o rótulo fica acima do bloco da Fase 1, inteiro, em uma linha.
- No cartão 08: "Encerramento · 3ª Sessão de Comando", em duas linhas, alinhada à direita: "Encerramento · 3ª" e "Sessão de Comando".
- Não mudaram: o título do cartão 01 ("Análise Estratégica das Safras"), a linha "Semana 1 · A Análise Estratégica das Safras", os botões "Fazer a Análise" e a linha "Semana 13 · O fechamento, com o Relatório de Produtividade".

**O carrossel**

- 9 cartões, nesta ordem: 01 Análise Estratégica das Safras · 02 Implementação da Infraestrutura · 03 Playbook de Comunicação Persuasiva · 04 Recuperação de Ativos · 05 Painel de Safras · 06 Treinamento para Otimização da Conversão · 07 Playbook da Gestão de Vendas por Safra · 08 Relatório de Produtividade · e, sem número, o das Sessões de Comando ("Do começo ao fim"), que é o último.
- Contador: de "01 / 09" a "09 / 09". Depois do "09 / 09", a seta de avançar e o avanço sozinho voltam ao "01 / 09".
- "Arraste para ver as 8 entregas" continua no controle do computador.
- No celular, os cartões têm 544 px de altura no programa (cerca de 486 na tela de 375), e todos os chips aparecem inteiros.

**A régua**

A barra acesa vai do começo até o fim da semana 2, entre S2 e S3, e não se mexe quando o carrossel avança.

**O menu da demonstração do produto, depois da mudança**

- Perfil "Para quem gere o time": Painel de Safras · Onde a safra trava · Nunca disseram não · Reunião de safra · Avaliação de calls.
- Perfil "Para o vendedor": Contatos de hoje · Relógio do lead · Roteiro de cada tentativa · Histórico do lead · Feedback das calls.
- No computador, o menu fica ao lado da tela, o título da janela é "Sistema de Vendas Safra · " mais o nome da tela, e o indicador tem 5 bolinhas em cada perfil.
- No celular, o menu fica em duas colunas, de 3 e de 2 itens, e mostra os itens de quem gere o time também no perfil do vendedor, cujas telas só aparecem pelo avanço sozinho (já era assim; pergunta 20.2.3). Embaixo da janela aparece só a dica "Toque numa tela do menu para ver funcionando" (pergunta 20.3.3).
- O avanço sozinho da demonstração volta de "Avaliação de calls" para "Painel de Safras".

## As chamadas: tudo o que tem cara de botão de chamada, e para onde leva

Lista refeita na 20.3, com clique de verdade (toque, no celular), uma carga da página por clique, com as cinco utm no endereço. Em cada largura são 10, e **as 10 levam a /quiz/** com as mesmas utm do endereço e o id_sessao no formato do banco. Bate com a lista da 20.2. **Não sobrou nenhuma que não leve ao quiz.**

| Nº | Onde | Texto | 1440 por 900 | 375 por 812 e 360 por 640 |
|---|---|---|---|---|
| 1 | cabeçalho, preso no topo | Fazer a Análise | botão · leva ao quiz | bloco · leva ao quiz (desde a v3) |
| 2 | seção 01, o topo da página | Faça uma Análise Estratégica do seu Sistema de Vendas | botão · leva ao quiz | bloco · leva ao quiz (**consertada na v4:** antes, só rolava a tela) |
| 3 | seção "Por que a venda fica cara" (a segunda, sem número no nome interno) | idem | botão · leva ao quiz | botão · leva ao quiz |
| 4 | seção 03 | idem | botão · leva ao quiz | botão · leva ao quiz |
| 5 | seção 04 | idem | botão · leva ao quiz | botão · leva ao quiz |
| 6 | seção 05, "Como funciona" | idem | botão · leva ao quiz | botão · leva ao quiz |
| 7 | seção 06, a demonstração do produto | idem | botão · leva ao quiz | botão · leva ao quiz |
| 8 | seção 07 | idem | botão · leva ao quiz | botão · leva ao quiz |
| 9 | seção 08, o cartão da oferta | idem | bloco · leva ao quiz (**consertada na v4:** antes, não fazia nada) | bloco · leva ao quiz (**consertada na v4:** antes, não fazia nada) |
| 10 | seção 09, o FAQ | idem | botão · leva ao quiz | botão · leva ao quiz |

Os outros elementos clicáveis (as setas dos carrosséis, o filtro por peça, a chave e o lado embaçado da seção 03, os perfis e os itens da demonstração, "Ver telas do vendedor", as perguntas do FAQ e o link "Cookies") foram clicados um a um nas três larguras: todos ficam na página.

## Menções a agentes de IA que sobraram

- **"GSAAS":** nenhuma, nem à vista nem no programa (eram 18 no programa).
- **Agentes de IA, à vista:** nenhuma. Com o FAQ todo aberto, os dois perfis da demonstração tela a tela e todos os carrosséis, nenhuma linha de texto tem "agente", "GSAAS" nem "IA" solto, nas três larguras.
- **A peça "Inteligência Artificial", que ficou, sem mexer.** Não é agente nem GSAAS: é uma das sete peças do método. Trechos exatos: "Inteligência Artificial", no filtro por peça da seção "Como funciona", no computador e no celular; e "INTELIGÊNCIA ARTIFICIAL" (no programa, "Inteligência Artificial"; a página escreve em caixa alta), chip de "Peças que instala" dos cartões 01, 03, 05 e 08.
- **No programa, sem aparecer:** "Agentes de IA" sobra 7 vezes, na demonstração do computador, em condições que nunca acontecem (pergunta 20.2.6).

## Todas as trocas no programa e no index.html

Arquivo: entregas/landings/landing-page-02/pagina/assets/index-BSwcbsoR.js. São **39 trocas distintas**, com **66 cópias** ao todo, que são as **66 edições** no arquivo. Ele passou de 1.626.449 para 1.588.312 caracteres (1.628.886 para 1.590.652 bytes). SHA-256 de antes: 091b703ad40d979eae1c812b92bd3ec92de52fcde1fc07e585abb6f25b8242af; de agora: cc58b5ed504179b548c2fef3cfd1ceafc8878260d2676d822d0107405fe4d060.

**Não há troca fora desta lista.** Conferido de novo na 20.3: aplicar a lista sobre o programa do commit anterior à 20.2 (632bd0e, o da 20.1) dá o programa de hoje, byte a byte, com o mesmo SHA-256. Fora do programa, a 20.2 mudou só uma linha do programa do fim do index.html (as chamadas, abaixo), com os comentários dela, e o README.

Como ler: "texto visível" é o que a pessoa lê; "bloco que saiu" é um pedaço inteiro do programa, com o tamanho em caracteres; "medida" é posição, largura ou altura; "nome interno" não aparece na página; "lógica" é lista de estados ou condição, que não é texto nem medida. Por tipo: 7 trocas de texto visível, 15 blocos que saíram, 10 medidas, 1 nome interno e 6 de lógica.

**1 · O carrossel sem o cartão do GSAAS** (24 cópias)

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| bloco que saiu | A definição do cartão do GSAAS, nas variantes escura e clara: "const ln=Qa(D9);function D9(...){...}". Textos: "Depois dos 90 dias · opcional", "Do relatório, a próxima safra já começa lida", "GSAAS · Gestão de Safra as a Service", "Agentes de IA que lembram a reunião, acompanham o lead pelo WhatsApp e passam ao vendedor a tarefa do dia." e os chips (6.242 caracteres) | (saiu) | 1 | definição · cartão do GSAAS (D9 e ln, variantes escura e clara) |
| bloco que saiu | o cartão do GSAAS apagado (componente ln), no fim da trilha do estado "02" | (saiu) | 1 | computador · seção Como funciona (M9) |
| bloco que saiu | o cartão do GSAAS apagado (componente ln), no fim da trilha dos estados "03" a "10" | (saiu) | 8 | computador · seção Como funciona (M9) |
| bloco que saiu | O cartão do GSAAS em destaque (borda tracejada), que a trilha do computador mostrava no estado "01", depois do cartão das Sessões de Comando. Mesmos textos da definição (2.971 caracteres) | (saiu) | 1 | computador · seção Como funciona (M9) |
| lógica | cartão das Sessões de Comando em destaque: no estado "10" (w) | cartão das Sessões de Comando em destaque: no estado "01" (o), no lugar do cartão do GSAAS, como último da trilha | 1 | computador · seção Como funciona (M9) |
| lógica | cartão das Sessões de Comando apagado (componente Ln): nos estados "02" e "01" | cartão das Sessões de Comando apagado (componente Ln): só no estado "02" (no "01" entra o cartão em destaque) | 1 | computador · seção Como funciona (M9) |
| medida | trilha do computador: posição da esquerda em -2520 px no estado "08" e -2540 px nos estados "09" e "10" (fim da trilha de 3620 px encostado no fim do conteúdo de 1080 px) | trilha do computador: posição da esquerda em -2180 px nos estados "08" e "09" (fim da trilha de 3260 px encostado no fim do conteúdo de 1080 px); os estados "01" a "07" ficam como estavam (0 a -2160 px) | 1 | computador · seção Como funciona (M9) |
| medida | (sem style na trilha do computador) | style com a posição da esquerda em -2180 px nos estados "08" e "09" (a medida não existe no estilo pronto) | 1 | computador · seção Como funciona (M9) |
| texto visível | contador "01 / 10" a "10 / 10" | contador "01 / 09" a "09 / 09" | 2 | computador · seção Como funciona (M9); celular · carrossel (wN) |
| medida | barra do controle do computador: um décimo da largura, andando de 10 em 10% (dez posições) | barra do controle do computador: um nono da largura (11,111%), andando de 11,111 em 11,111% (nove posições) | 1 | computador · seção Como funciona (M9) |
| lógica | estados do carrossel do computador: "01" a "10" | estados do carrossel do computador: "01" a "09" (as setas e o avanço sozinho dão a volta no 09) | 1 | computador · estados do carrossel (V9) |
| bloco que saiu | O cartão do GSAAS do carrossel do celular (o décimo da trilha, com borda tracejada no estado "10"). Mesmos textos da definição (5.247 caracteres) | (saiu) | 1 | celular · carrossel (wN) |
| medida | trilha do celular: posição da esquerda em -2432 px no estado "09" e -2666 px no "10" (fim da trilha de 3026 px encostado no fim da janela de 360 px) | trilha do celular: posição da esquerda em -2362 px no estado "09" (fim da trilha de 2722 px encostado no fim da janela de 360 px); os estados "01" a "08" ficam como estavam (0 a -2128 px) | 1 | celular · carrossel (wN) |
| medida | (sem style na trilha do celular) | style com a posição da esquerda em -2362 px no estado "09" (a medida não existe no estilo pronto) | 1 | celular · carrossel (wN) |
| medida | barrinha de avanço do celular (20 px): posição da esquerda em 0, 18, 37, 55, 74, 92, 112, 129, 148 e 169 px (dez posições) | barrinha de avanço do celular (20 px): posição da esquerda em 0, 21,125, 42,25, 63,375, 84,5, 105,625, 126,75, 147,875 e 169 px (nove posições, de 169/8 em 169/8) | 1 | celular · carrossel (wN) |
| lógica | estados do carrossel do celular: "01" a "10" | estados do carrossel do celular: "01" a "09" (as setas, o arrastar e o avanço sozinho dão a volta no 09) | 1 | celular · estados do carrossel (kN) |

**2 · A demonstração do produto sem os agentes de IA** (14 cópias)

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| bloco que saiu | O item "Agentes de IA" do menu lateral, com a etiqueta "GSAAS", na cópia do menu da tela "Onde a safra trava" (1.114 caracteres) | (saiu) | 1 | computador · demonstração do produto (ak) |
| bloco que saiu | O item "Agentes de IA" do menu lateral, com a etiqueta "GSAAS", na cópia do menu da tela "Nunca disseram não" (1.114 caracteres) | (saiu) | 1 | computador · demonstração do produto (ak) |
| bloco que saiu | O item "Agentes de IA" do menu lateral, com a etiqueta "GSAAS", na cópia do menu da tela "Reunião de safra" (1.114 caracteres) | (saiu) | 1 | computador · demonstração do produto (ak) |
| bloco que saiu | O item "Agentes de IA" do menu lateral, com a etiqueta "GSAAS", na cópia do menu da tela "Avaliação de calls" (1.114 caracteres) | (saiu) | 1 | computador · demonstração do produto (ak) |
| bloco que saiu | O pedaço do menu lateral que só aparecia com a tela "Agentes de IA" aberta: o item "Agentes de IA" aceso, com a etiqueta "GSAAS", o respiro e a cópia do botão "Ver telas do vendedor" desse estado (2.258 caracteres) | (saiu) | 1 | computador · demonstração do produto (ak) |
| bloco que saiu | O item "Agentes de IA" do menu lateral, com a etiqueta "GSAAS", na cópia do menu da tela "Painel de Safras" (1.109 caracteres) | (saiu) | 1 | computador · demonstração do produto (ak) |
| bloco que saiu | A tela "Agentes de IA" da demonstração do computador: "Agentes trabalhando agora", o selo "No GSAAS, depois dos 90 dias", os cartões dos agentes e a nota "Os agentes entram no GSAAS, depois dos 90 dias." (6.207 caracteres) | (saiu) | 1 | computador · demonstração do produto (ak) |
| texto visível | título da janela na tela dos agentes: "Sistema de Vendas Safra · Agentes de IA" | (saiu; os títulos das outras telas ficam) | 1 | computador · demonstração do produto (ak) |
| bloco que saiu | A sexta bolinha do indicador de telas, embaixo da janela, que só existia no perfil "Para quem gere o time" e acendia na tela dos agentes (ficam cinco, uma por tela) (400 caracteres) | (saiu) | 1 | computador · demonstração do produto (ak) |
| lógica | telas do perfil "Para quem gere o time": seis, a última "Agentes de IA" | telas do perfil "Para quem gere o time": cinco (o avanço sozinho volta de "Avaliação de calls" para "Painel de Safras") | 2 | computador · lista de telas da demonstração (h4); celular · listas da demonstração (ey e g4) |
| bloco que saiu | O item "Agentes de IA" do menu da demonstração do celular (o terceiro da segunda coluna) (678 caracteres) | (saiu) | 1 | celular · demonstração do produto (_y) |
| bloco que saiu | A tela "Agentes de IA" da demonstração do celular (função MN): "Agentes trabalhando agora", o selo "No GSAAS, depois dos 90 dias", os cartões dos agentes e a nota "Os agentes entram no GSAAS, depois dos 90 dias." (6.253 caracteres) | (saiu) | 1 | celular · tela dos agentes da demonstração (MN) |
| lógica | mapa das telas do celular: "Agentes de IA" aponta para a tela MN | (saiu do mapa) | 1 | celular · listas da demonstração (ey e g4) |

**3 · As duas respostas do FAQ** (4 cópias)

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| texto visível | O Junior, nas três Sessões de Comando com você e o seu Head Comercial: duas no começo e uma no fim. Da semana 3 em diante, o Junior e o Euclides conduzem a call semanal em grupo, e o seu time tem um grupo de WhatsApp com a nossa equipe para as dúvidas do dia a dia. | O Junior, nas três Sessões de Comando com você e o seu Head Comercial: duas no começo e uma no fim. Da semana 3 em diante, o seu time participa da call semanal em grupo e tem um grupo de WhatsApp com a nossa equipe para as dúvidas do dia a dia. | 2 | computador · FAQ (Nk); celular · FAQ (yk) |
| texto visível | Os playbooks e o treinamento ficam com o seu time. Quem quiser continuar tem o GSAAS, opcional: a gente mantém o CRM e o painel e coloca os agentes de IA para trabalhar. | Os playbooks e o treinamento ficam com o seu time. O sistema fica por escrito, para rodar sem a gente. | 2 | computador · FAQ (Nk); celular · FAQ (yk) |

**3 · Os rótulos** (12 cópias)

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| texto visível | Fase 1 · Análise | Fase 1 · Ponto de partida | 2 | computador · régua; celular · régua |
| nome interno | Fase · Análise | Fase · Ponto de partida | 2 | computador · régua; celular · régua |
| texto visível | Fase 1 · Análise | Fase 1 · Ponto de partida | 4 | definição · cartão 01 (C9, variantes escura e clara); computador · cartão 01; celular · cartão 01 |
| texto visível | Fechamento · 3ª Sessão de Comando | Encerramento · 3ª Sessão de Comando | 4 | definição · cartão 08 (z9, variantes escura e clara); computador · cartão 08; celular · cartão 08 |

Nenhuma medida mudou por causa dos rótulos: a largura máxima da linha do cartão 08 continua nos 140 px do pedido 18.

**4 · A altura dos cartões no celular** (10 cópias)

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| medida | janela do carrossel do celular: 480 px de altura (classe h-[480px]) | janela do carrossel do celular: 544 px de altura (em style; a medida não existe no estilo pronto) | 1 | celular · carrossel (wN) |
| medida | cada cartão do carrossel do celular (os 9): 480 px de altura (classe h-[480px]) | cada cartão do carrossel do celular (os 9): 544 px de altura (em style) | 9 | celular · carrossel (wN) |

**5 · A barra acesa da régua** (2 cópias)

| Tipo | Antes | Depois | Cópias | Onde |
|---|---|---|---|---|
| medida | barra acesa da régua do computador: 249,231 px (fim da semana 3) | barra acesa da régua do computador: 166,154 px (fim da semana 2: 2 × 83,077) | 1 | computador · régua |
| medida | barra acesa da régua do celular: 179,446 px (fim da semana 3) | barra acesa da régua do celular: 119,631 px (fim da semana 2: 2 × 59,815) | 1 | celular · régua |

**6 · As chamadas, em pagina/index.html** (fora do programa empacotado; 1 linha)

- Tipo: lógica, 1 cópia, no programa do fim de pagina/index.html.
- Antes: `var botao = alvo.closest('button') || alvo.closest('.hdr [data-name="Botão/Primário"]');`
- Depois: `var botao = alvo.closest('button') || alvo.closest('[data-name="Botão/Primário"]');`

Efeito: além dos botões e do bloco do cabeçalho, o clique em qualquer bloco com o nome interno "Botão/Primário" cujo texto comece por "Fazer a Análise" ou "Faça uma Análise" leva a /quiz/ com as utm e o id_sessao: a chamada do topo no celular e a do cartão da oferta, no computador e no celular (pergunta 20.2.7). O comentário do programa e o do topo do arquivo acompanharam. SHA-256 do index.html de hoje: b522b8fee4083361826c8e1ebce983edc45b6c995e43adb438d3a9c34a217e3c.

## Os prints

Em entregas/landings/landing-page-02/prints/, 16, tirados do site montado, num navegador sem tela, com o aviso de cookies já recusado e sem dado de lead; cada imagem é um recorte da janela, na largura inteira, com 2 pixels por ponto (o print de 1440 tem 2880 de largura). O cabeçalho da página, que fica preso no topo da janela, aparece no topo de cada print. Cada um foi olhado depois de tirado: o que o pedido quer ver está inteiro e legível, com o carrossel e a demonstração parados. As fotos e os nomes que aparecem (o Júnior e o Euclides) são da própria página.

Os oito do pedido 18, refeitos com os mesmos nomes:

| Arquivo | Janela | O que mostra |
|---|---|---|
| como-funciona-regua-1440.png | 1440 por 1400 | A seção no computador, com o carrossel no 01: o título, o filtro, a régua com "Fase 1 · Ponto de partida" acima do bloco e a barra acesa terminando entre S2 e S3, a legenda, os cartões 01, 02 e 03 inteiros e o contador em "01 / 09" |
| como-funciona-regua-375.png | 375 por 1320 | A seção no celular, com o carrossel no 01: o título, o filtro, a régua, com a barra acesa até o fim da semana 2, e o cartão 01 inteiro. A régua aparece até S6 (pergunta 18.2.5) |
| como-funciona-cartao-06-1440.png | 1440 por 900 | O carrossel no 06, no computador: os cartões 06, 07 e 08 inteiros (o 08 com a linha "Encerramento · 3ª" e "Sessão de Comando", legível) e o começo do cartão das Sessões de Comando |
| como-funciona-cartao-06-375.png | 375 por 812 | O carrossel no 06, no celular. **A última fileira de chips ("Inteligência de Mercado" e "Dados") aparece inteira:** o defeito que o print da 18.3 mostrava saiu |
| como-funciona-sessoes-1440.png | 1440 por 900 | O carrossel no 09, no computador: o cartão das Sessões de Comando inteiro, sem número, por último; à esquerda, o 08 em destaque e o 07 com 20 px cortados (perguntas 20.2.1 e 20.2.2) |
| como-funciona-sessoes-375.png | 375 por 812 | O carrossel no 09, no celular: o cartão das Sessões de Comando, com o título, as três linhas e o chip "Mentalidade de Vendas" inteiro |
| faq-respostas-1440.png | 1440 por 1100 | O FAQ no computador, com as três respostas mexidas pelos pedidos 18 e 20 abertas e inteiras: "É mais uma mentoria?", "Quem me atende depois que eu assinar?" e "E depois dos 90 dias?" |
| faq-respostas-375.png | 375 por 1320 | O FAQ no celular, com as mesmas três respostas abertas e inteiras |

Os oito novos:

| Arquivo | Janela | O que mostra |
|---|---|---|
| como-funciona-fim-do-carrossel-1440.png | 1440 por 1400 | A seção inteira no computador, com o carrossel no fim: a régua, os cartões 07, 08 e o das Sessões de Comando, que é o último, o contador em "09 / 09" e a barra do controle no fim do trilho |
| como-funciona-fim-do-carrossel-375.png | 375 por 1320 | A seção inteira no celular, com o carrossel no fim: a régua, o cartão das Sessões de Comando por último e o contador em "09 / 09" (pergunta 20.3.2) |
| demonstracao-gestor-1440.png | 1440 por 1500 | A demonstração do produto no computador, no perfil "Para quem gere o time", com a tela "Painel de Safras": o menu com os cinco itens, sem "Agentes de IA", e as cinco bolinhas do indicador |
| demonstracao-gestor-375.png | 375 por 1800 | A demonstração no celular, no mesmo perfil: o menu com os cinco itens em duas colunas, de 3 e de 2, com a casa de baixo da direita vazia (pergunta 20.2.3). Embaixo da janela aparece só a dica; as seis bolinhas não aparecem na página (pergunta 20.3.3) |
| oferta-1440.png | 1440 por 900 | O cartão da oferta (seção 08) no computador, com a chamada que agora leva ao quiz. Mostra também "O seu mês vira em [X] dias e [Y] horas." (pergunta 20.3.4) |
| oferta-375.png | 375 por 812 | O cartão da oferta no celular, com a mesma chamada e o mesmo texto com [X] e [Y] |
| topo-1440.png | 1440 por 1100 | O topo da página no computador, como abre, até o fim da seção 01: o cabeçalho e a chamada do topo. O cartão "Ao vivo" passa 61 px da borda direita da janela (pergunta 20.3.4) |
| topo-375.png | 375 por 1400 | O topo da página no celular, como abre, até o fim da seção 01: o cabeçalho e a chamada do topo, que agora leva ao quiz |

A demonstração existe no celular, e os quatro prints novos têm as duas larguras. Dez dos 16 saíram de uma janela mais alta que a de costume (900 no computador, 812 no celular), com a mesma largura, para a parte inteira caber numa imagem só (pergunta 18.3.2, mantida na #119). No FAQ, as três respostas abertas cabem inteiras no mesmo print, no computador e no celular: não foi preciso escolher.

## Numeração das decisões

A #119 ficou com este pedido (base/decisoes.md v9). **O pedido 13 passa a começar na #120.** O arquivo do pedido 13 não foi mudado.

## O que falta, e é do Otávio

1. Ver os 16 prints.
2. Antes de publicar, decidir a frase com [X] e [Y] do cartão da oferta, que já está no ar (pergunta 20.3.4), e olhar a página num celular de verdade, pelo cartão das Sessões de Comando (pergunta 20.2.5).
3. Pedir a publicação, num pedido curto, depois de ver os prints. Até lá, o que está no ar é a página de antes do pedido 18.
4. Responder às perguntas abaixo. As de desenho (20.2.1, 20.2.2, 20.2.3, 20.2.10, 20.3.3 e a parte (b) da 20.3.4) podem ir junto com a revisão de UX (pedido 19).
5. Continua valendo o lembrete do token da Cloudflare, até 16/11/2026 (log.md, Pendências). Este pedido não usou o token.

## Perguntas para o Otávio

### Da 20.1

**20.1.1 · O que fica com o cliente depois dos 90 dias.**
- Dúvida: a resposta aprovada de "E depois dos 90 dias?" diz "Os playbooks e o treinamento ficam com o seu time." Essa primeira frase já estava na página desde 12/11 (veio com a landing-page-02); a aprovação de 13/11 a manteve e trocou a segunda. A base registra que ficam com o cliente os dados, os acessos e o Playbook da Gestão de Vendas por Safra, e só como regra proposta (base/oferta.md, "Saída limpa" e obstáculo 16; base/entregas-do-servico.md, entrega 7, "Fica com o cliente"). Não diz o mesmo do Playbook de Comunicação Persuasiva, nem diz o que fica do Treinamento para Otimização da Conversão, que é a parte teórica mais a call semanal em grupo, com uma ata por call; a ficha de fatos não tem campo para isso. Na mesma frase da resposta, base/tom-de-voz.md (pendente do Júnior), base/entregas-do-servico.md ("Cuidado de nome") e o GLOSSARY.md pedem "Treinamento" e "Playbook" só como nomes de entregas, e a frase usa as duas palavras soltas; a resposta de "É mais uma mentoria?", da #118, já diz "playbooks".
- O que foi feito: o texto aprovado não foi trocado, e a #119 registra a aprovação como está.
- Recomendação: manter a frase; na próxima versão da ficha de fatos, criar o campo do que fica com o cliente ao fim do serviço, com o valor que o Otávio disser (a "Saída limpa" é regra proposta, pendente do Júnior e do Euclides), para a página ter o que citar.
- Se decidir diferente: a frase passa a dizer só o que a base registra (os dados, os acessos e o Playbook da Gestão de Vendas por Safra, pelo nome), numa versão nova da landing, com texto do Otávio.

**20.1.2 · O grupo de WhatsApp "da semana 3 em diante".**
- Dúvida: na resposta aprovada de "Quem me atende depois que eu assinar?", sem os dois nomes, "Da semana 3 em diante" passa a valer para as duas coisas: "o seu time participa da call semanal em grupo e tem um grupo de WhatsApp com a nossa equipe". Na resposta da #118, o grupo de WhatsApp vinha numa oração à parte, com sujeito próprio. A resposta da #118 também abria por "Da semana 3 em diante", e a dúvida já existia ali, mais fraca. A call em grupo começa mesmo na semana 3 (ficha-de-fatos#calls-em-grupo). O grupo de suporte não tem data de início na ficha (ficha-de-fatos#grupo-de-suporte), e base/produto.md ("O que não está incluído", citação da Ficha do Serviço online) põe o grupo como apoio da execução das mudanças no CRM, que é das semanas de ficha-de-fatos#quando-entrega-2. Quem lê a resposta pode entender que, nas duas primeiras semanas, o time não tem o grupo.
- O que foi feito: o texto aprovado não foi trocado.
- Recomendação: a frase entra na 20.2 como aprovada, e o Otávio diz desde quando o grupo existe; a ficha ganha esse início quando subir de versão.
- Se decidir diferente: se o grupo existe desde o começo, a resposta separa as duas coisas numa versão nova da landing, com texto do Otávio; se começa na semana 3, fica como está.

**20.1.3 · A grafia do primeiro nome na ficha (18.1.4).**
- Dúvida: a 18.1.4 fica como está ("Mantém, como recomendado na resposta do 18"), e a recomendação tinha duas partes: manter os dois textos e, "numa próxima versão da ficha", ficha-de-fatos#grafia-junior passar a dizer que o primeiro nome sozinho, em público, também vai sem acento. O pedido 20 diz que nenhum fato muda e que a ficha fica como está. A segunda parte pode já estar aprovada pelo "Aprovo tudo."; falta só o Otávio confirmar.
- O que foi feito: nada na ficha; a #119 registra o "mantém".
- Recomendação: a segunda parte entra quando a ficha subir de versão por outro motivo, como decisão do Otávio de 13/11/2026.
- Se decidir diferente: a ficha sobe de versão só por isso, num pedido curto; ou a segunda parte não vale, e a ficha fica como está.

### Da 20.2

**20.2.1 · O destaque do cartão das Sessões no computador.**
- Dúvida: no computador, o estado N do carrossel põe a borda de destaque no cartão N-1 (já era assim; 18.2.7), e o estado "01" a punha no último cartão, o do GSAAS. Com 9 estados, o cartão das Sessões de Comando só recebe o destaque no estado "01", fora da tela; antes aparecia em destaque no "10".
- O que foi feito: a regra que existia ficou.
- Recomendação: tratar junto com o contador defasado, na revisão de UX (pedido 19).
- Se decidir diferente: o destaque passa a acompanhar o contador, que é mexer nos 9 estados da seção do computador.

**20.2.2 · Onde a trilha para no computador.**
- Dúvida: pela regra de antes, os dois últimos estados param no mesmo lugar, e o primeiro cartão à vista aparece com 20 px cortados à esquerda (18.3.4): era o cartão 08, nos estados "09" e "10"; agora é o 07, nos estados "08" e "09".
- O que foi feito: a regra ficou.
- Recomendação: manter até a revisão de UX.
- Se decidir diferente: parar 20 px antes deixa o cartão 07 inteiro e o das Sessões 20 px além do conteúdo, ainda dentro da tela; é uma medida.

**20.2.3 · O menu da demonstração no celular.**
- Dúvida: o menu tem duas colunas; com 5 itens ficam 3 e 2, e sobra uma casa vazia embaixo, à direita (não é vão entre itens: o item que saiu era o último). Além disso, e já era assim, no celular o menu mostra sempre as telas de quem gere o time, mesmo no perfil do vendedor, cujas telas só aparecem pelo avanço sozinho, e o título da janela fica sempre "Sistema de Vendas Safra · Painel de Safras".
- O que foi feito: só o item saiu.
- Recomendação: manter; redistribuir é desenho, e o resto vai para a revisão de UX.
- Se decidir diferente: uma coluna só, ou outra ordem, é desenho novo no menu do celular.

**20.2.4 · A quebra da linha do cartão 08.**
- Dúvida: "Encerramento" é mais comprido que "Fechamento". Com a largura que o pedido 18 deixou (140 px), a linha quebra em "Encerramento · 3ª" e "Sessão de Comando"; na 18.2 quebrava em "Fechamento · 3ª Sessão" e "de Comando".
- O que foi feito: a medida não mudou; a linha fica em duas, a 89 px do número no computador e a 35 e 33 px na tela do celular.
- Recomendação: manter.
- Se decidir diferente: com 156 px de largura máxima a quebra volta a "Encerramento · 3ª Sessão" e "de Comando", mas a linha fica a 7 px do número no celular; uma linha só pede texto mais curto, que é do Otávio.

**20.2.5 · Sobram 3 px no cartão das Sessões, no celular.**
- Dúvida: com 544 px, o cartão das Sessões de Comando pede 541. Se o texto dele ganhar uma linha, o respiro de baixo cai de 28 para cerca de 9 px, com o chip ainda inteiro; com duas linhas a mais, o chip "Mentalidade de Vendas" volta a ser cortado.
- O que foi feito: 544 px, como aprovado.
- Recomendação: manter, e olhar num celular de verdade antes de publicar.
- Se decidir diferente: 560 px, que são 10 valores no script das trocas.

**20.2.6 · Restos invisíveis no programa.**
- Dúvida: sobram 7 "Agentes de IA" em condições que nunca são verdadeiras, os identificadores do estado "10" do carrossel e quatro variáveis de imagem sem uso (os ícones do cartão do GSAAS e da tela dos agentes). Nada disso aparece nem é pedido pela página.
- O que foi feito: ficaram; "GSAAS" zerou.
- Recomendação: manter.
- Se decidir diferente: as 7 e as quatro variáveis saem com poucas edições; os identificadores do estado "10" são centenas.

**20.2.7 · A regra das chamadas ficou geral.**
- Dúvida: o pedido nomeia os lugares (o cartão da oferta e o topo no celular); o programa do fim leva ao quiz qualquer bloco "Botão/Primário" com texto de chamada.
- O que foi feito: a regra geral; hoje ela pega exatamente os quatro blocos que existem (o do cabeçalho e o do topo, no celular, e o do cartão da oferta, no computador e no celular), e nenhum outro elemento passou a levar ao quiz.
- Recomendação: manter, porque pega também uma chamada futura desenhada como bloco.
- Se decidir diferente: a regra passa a citar os dois lugares pelo nome, sem mudar nada na página de hoje.

**20.2.8 · A versão da visita no banco.**
- Dúvida: a página mudou de conteúdo e a visita continua indo ao banco como landing-page-02, versão 1.
- O que foi feito: nada, como o pedido manda.
- Recomendação: manter, como na v2 e na v3.
- Se decidir diferente: sobem a linha do catálogo e a etiqueta da página, em outro pedido, com SQL rodado pelo Otávio.

**20.2.9 · As barras de avanço recalculadas.**
- Dúvida: com 9 estados, a barra do controle do computador e a barrinha do celular precisavam de posições novas; as antigas vinham arredondadas do desenho original.
- O que foi feito: nove posições iguais, do começo ao fim do trilho.
- Recomendação: manter.
- Se decidir diferente: valores arredondados, sem efeito visível.

**20.2.10 · Seis bolinhas no indicador da demonstração, no celular.**
- Dúvida: no celular, embaixo da janela da demonstração, o indicador tem seis bolinhas fixas, que não acompanham a tela (já era assim). No computador, a sexta bolinha saiu com a tela dos agentes; no celular ficaram seis, para cinco telas. O pedido não lista o indicador.
- O que foi feito: ficou.
- Recomendação: tirar a sexta no pedido da publicação ou na revisão de UX; é uma edição pequena.
- Se decidir diferente: fica como está.

**20.2.11 · "Reunião de safra" na demonstração.**
- Dúvida: a demonstração do produto tem o item e a tela "Reunião de safra"; o GLOSSARY.md manda evitar esse nome, e a tela se chamaria "Prioridade da semana" (8.12; #114). O pedido 20 não a lista.
- O que foi feito: nada.
- Recomendação: trocar o nome num pedido próprio, com o texto do Otávio.
- Se decidir diferente: fica como está.

### Da 20.3

**20.3.1 · A landing-page-02 ficou na v4 com os prints.**
- Dúvida: a regra de versionamento manda subir a versão a cada alteração de conteúdo, e a v4 já estava no commit da 20.2 quando a pasta prints/ ganhou os 16 prints e o README teve a seção "Prints" reescrita; o Fechamento da 20.3 do pedido, por outro lado, pede o index.md com "a versão nova da landing-page-02", que é a v4. É o mesmo caso da 18.3.6, que o Otávio manteve.
- O que foi feito: ficou na v4, com os prints registrados como parte dela; a página e o programa não mudaram na 20.3.
- Recomendação: manter.
- Se decidir diferente: o README sobe para a v5 com "O que mudou na versão 5: os prints", o ensaio passa a declarar landing-page-02 5 e o index.md acompanha.

**20.3.2 · Dois prints do mesmo ponto do carrossel.**
- Dúvida: o pedido manda refazer como-funciona-sessoes e acrescentar "o fim do carrossel, com o cartão das Sessões por último". Com 9 cartões, o cartão das Sessões de Comando é o fim do carrossel: os dois prints saem do mesmo ponto ("09 / 09").
- O que foi feito: como-funciona-sessoes mostra o carrossel, como na 18.3; como-funciona-fim-do-carrossel mostra a seção inteira (o título, a régua, os cartões e o contador), no mesmo enquadramento de como-funciona-regua, que é o começo do carrossel. No celular, o cartão que aparece nos dois é o mesmo.
- Recomendação: manter os dois.
- Se decidir diferente: sai um dos dois, ou o do fim ganha outro enquadramento.

**20.3.3 · As seis bolinhas da demonstração no celular não aparecem.**
- Dúvida: a pergunta 10 da 20.2 e o README da landing (v4) dizem que, no celular, o indicador da demonstração tem seis bolinhas fixas para cinco telas. Medido na 20.3: as seis estão no programa, mas inteiras abaixo do bloco da dica, que corta o que passa dele; nenhuma aparece, em 375 nem em 360, e já era assim antes da 20.2. No computador, as cinco aparecem e acompanham a tela.
- O que foi feito: nada no programa; o print mostra como está, e a lista dos prints no README diz isso; o item "O indicador de telas da demonstração no celular" do README, escrito na 20.2, dizia seis bolinhas à vista e foi corrigido na revisão da 20.3, sem subir a versão.
- Recomendação: a pergunta 10 da 20.2 deixa de ter pressa, porque não há bolinha sobrando à vista; na revisão de UX (pedido 19), decidir se o celular ganha um indicador de verdade, com cinco bolinhas, ou se as seis saem do programa.
- Se decidir diferente: fica como está.

**20.3.4 · O que os prints novos mostram e já era assim.**
- Dúvida: (a) no cartão da oferta, no computador e no celular, a frase "O seu mês vira em [X] dias e [Y] horas." aparece com [X] e [Y], que são lugares de uma contagem que a página não faz; veio assim no zip, e é o que está no ar; (b) no topo, em 1440, o cartão "Ao vivo" passa 61 px da borda direita da janela, e o número aparece cortado. As duas coisas estão fora do pedido 20.
- O que foi feito: nada; a primeira aparece em oferta-1440.png e oferta-375.png, a segunda em topo-1440.png.
- Recomendação: (a) decidir antes de qualquer tráfego: a contagem de verdade, que é programa novo, ou a frase sai, que é texto do Otávio; (b) levar à revisão de UX (pedido 19).
- Se decidir diferente: ficam como estão.

**20.3.5 · No celular, o ensaio aceita os dois menus no perfil do vendedor.**
- Dúvida: no celular, o menu da demonstração mostra os itens de quem gere o time também no perfil do vendedor (pergunta 3 da 20.2). O ensaio v9 confere a lista de itens de cada perfil; no celular, no perfil do vendedor, aceita a lista do vendedor ou a de quem gere o time, para não acusar o que já era assim nem quebrar se isso for consertado. Por isso, no celular, das telas do vendedor o ensaio só confere a primeira ("Contatos de hoje"), que a troca de perfil abre; as outras quatro não têm item no menu e não são abertas.
- O que foi feito: como descrito; no computador, a lista de cada perfil é exigida, e as 10 telas são abertas.
- Recomendação: manter até a revisão de UX decidir o menu do celular; depois, o ensaio passa a exigir a lista certa.
- Se decidir diferente: o ensaio exige já a lista do vendedor no celular e fica FALHOU até o conserto.

## Como cada parte foi feita

Em cada parte, um subagente escreveu e outro, que não viu a escrita, revisou contra o pedido, a base e o repositório; as correções das revisões entraram antes de cada commit (log.md, linha "Revisão independente" das entradas da 20.1 e da 20.2). Na 20.2, a revisão comparou o programa por conta própria, mediu a página no navegador nas três larguras e rodou o ensaio; por ela, a largura máxima da linha do cartão 08, que o redator tinha levado a 156 px, voltou aos 140 px do pedido 18. A 20.3 foi escrita por um subagente, que rodou o ensaio, o teste do quiz e as provas e olhou cada print, e passou pela mesma revisão independente antes do commit (log.md, linha "Revisão independente" da entrada da 20.3). O revisor rodou tudo de novo numa cópia, refez as duas provas do erro, fez três a mais e mediu a página por conta própria: as contagens, os prints e os textos bateram. Por ele, antes do commit: o README da landing deixou de dizer que há seis bolinhas à vista no celular; a medida do cartão "Ao vivo" passou de 27 para 61 px; a conferência da demonstração no ensaio passou a exigir que a troca de perfil abra a primeira tela do perfil e a dizer o que confere no celular; e a contagem do teste do quiz no index.md foi acertada. O revisor não pôde conferir o que está no ar nem um celular de verdade.

## Commits que subiram (regra 7)

- 632bd0e · 20.1 · decisão #119: o GSAAS fora da landing e as respostas ao pedido 18
- 726c432 · 20.2 · o GSAAS fora da landing-page-02, FAQ, rótulos e chamadas (v4)
- 20.3 · prova, prints e resposta do pedido 20 (o hash sai no commit e aparece no histórico do Git)
