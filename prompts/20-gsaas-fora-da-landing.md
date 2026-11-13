# 20 · Landing-page-02: o GSAAS fora da página e as respostas do Otávio ao pedido 18 · partes 20.1 a 20.3

Escrito em 13/11/2026, 13h00, pelo mentor, a partir de duas respostas do Otávio na conversa de hoje e das perguntas de prompts/18-como-funciona-landing-02-resposta.md.
Rodar sobre a main depois do pedido 18 (9723e16). Não depende dos pedidos 13, 14 e 19.

Estas respostas são a aprovação do Otávio para as mudanças de sentido que elas pedem:
onde a regra de versionamento mandaria transformar em pergunta, aplique e registre
como "decisão do Otávio, 13/11/2026".

## Como trabalhar

- Leia CLAUDE.md antes de começar. Valem a Regra de pausas e todas as regras da casa.
  Dúvidas no fim de prompts/20-gsaas-fora-da-landing-resposta.md, no formato de sempre, pelo caminho conservador.
- Uma parte por vez. Em cada parte, um subagente escreve e outro, que não viu a escrita,
  revisa contra este pedido e contra a base. Commit por parte ("20.N · nome curto").
  Este arquivo já está na main, subido pelo mentor: confira que ele existe antes de começar e não o regrave.
- Push: vale a regra 7 como estiver no CLAUDE.md no dia em que rodar. Liste no fim da resposta os commits que subiram.
- Proibido: publicar; SQL no Supabase de verdade; chave de verdade; dado pessoal real; mexer em fontes/;
  mexer no texto ou no programa do quiz; mexer na landing fora do que este pedido lista;
  desfazer qualquer coisa do pedido 18 que este pedido não mande mudar; inventar fato.
- Nunca travessão. Use ponto médio.

## As respostas do Otávio

1. Sobre o GSAAS na landing, perguntado pelo mentor sobre o cartão do carrossel e a resposta do FAQ: **"Tira da landing."** (13/11/2026, 10h30.)
2. Sobre o bloco de decisões da revisão do pedido 18, que o mentor entregou com uma recomendação para cada pergunta, com os textos novos por extenso, e que incluía a frase nova de "E depois dos 90 dias?" e a retirada da tela dos agentes de IA da demonstração do produto: **"Aprovo tudo."** (13/11/2026, 12h49.)

O que o "Aprovo tudo." aprova, pergunta por pergunta:

| Pergunta do 18 | O que fica decidido |
|---|---|
| 18.1.1 | A resposta de "Quem me atende depois que eu assinar?" sai sem os nomes de quem conduz a call em grupo (texto abaixo). Os nomes voltam quando o Júnior e o Euclides confirmarem a agenda (#79; 9.10; 30.4 e 31.5) |
| 18.1.2, 18.1.3, 18.1.4, 18.1.6 | Mantém, como recomendado na resposta do 18 |
| 18.1.5 | Vale a 9.15 (#114): "Ponto de partida" e "Encerramento" no lugar de "Análise" e "Fechamento" (textos abaixo) |
| 18.1.7 | O GSAAS sai da landing ("Tira da landing.") |
| 18.2.1 | Os cartões do celular sobem de 480 para 544 px de altura |
| 18.2.2 | A barra acesa da régua para no fim da semana 2, que são os 15 dias do título |
| 18.2.3, 18.2.4, 18.2.8 | Mantém |
| 18.2.6 | As duas chamadas que não levam ao quiz passam a levar |
| 18.2.5, 18.2.7, 18.3.4 | Não entram aqui: vão para a revisão de UX (pedido 19) |
| 18.3.1, 18.3.2, 18.3.6 | Mantém |
| 18.3.5 | Aplica nesta versão do ensaio |
| 18.3.3 | Fica para um pedido futuro |

## Os textos aprovados

Entram exatamente assim, no computador e no celular.

**FAQ · "Quem me atende depois que eu assinar?"** (a pergunta não muda)
"O Junior, nas três Sessões de Comando com você e o seu Head Comercial: duas no começo e uma no fim. Da semana 3 em diante, o seu time participa da call semanal em grupo e tem um grupo de WhatsApp com a nossa equipe para as dúvidas do dia a dia."

**FAQ · "E depois dos 90 dias?"** (a pergunta não muda)
"Os playbooks e o treinamento ficam com o seu time. O sistema fica por escrito, para rodar sem a gente."

**Rótulos**
- Na régua e no cartão 01: "Fase 1 · Ponto de partida", no lugar de "Fase 1 · Análise".
- No cartão 08: "Encerramento · 3ª Sessão de Comando", no lugar de "Fechamento · 3ª Sessão de Comando".
- Não mudam: o título do cartão 01 ("Análise Estratégica das Safras", nome oficial da entrega), a linha "Semana 1 · A Análise Estratégica das Safras" e os botões "Fazer a Análise".
- A linha "Semana 13 · O fechamento, com o Relatório de Produtividade", do cartão das Sessões, fica como está: é frase, não rótulo, e o Otávio a aprovou assim. Se o GLOSSARY.md pedir outra coisa, registre como pergunta.

## O que muda na página

Tudo no programa empacotado (entregas/landings/landing-page-02/pagina/assets/index-BSwcbsoR.js, mesmo nome de arquivo, todas as cópias de cada texto), salvo o item 6, que é no programa do fim de pagina/index.html.

1. **O GSAAS fora do carrossel.** Sai o cartão "Depois dos 90 dias · opcional / Do relatório, a próxima safra já começa lida / GSAAS · Gestão de Safra as a Service". O carrossel fica com 9 cartões: as 8 entregas e o das Sessões de Comando, que passa a ser o último. O contador vai de "01 / 09" a "09 / 09", e as setas, o toque de arrastar no celular e o avanço sozinho acompanham, sem cartão vazio nem sobra no fim.
2. **O GSAAS fora da demonstração do produto** (a janela com o menu lateral, no perfil "Para quem gere o time"). Saem do menu o item "Agentes de IA", com a etiqueta "GSAAS", e a tela dele: "Agentes trabalhando agora", o selo "No GSAAS, depois dos 90 dias" e a nota "Os agentes entram no GSAAS, depois dos 90 dias.". Os outros itens continuam abrindo cada um a sua tela, sem buraco no menu. Se tirar o item quebrar a demonstração de um jeito que não se resolve com mudança pequena, não force: deixe esse lugar como está, e só ele, e registre como pergunta, dizendo o que seria preciso.
3. **As duas respostas do FAQ** e **os rótulos**, com os textos acima. O rótulo novo da Fase 1 é mais comprido: continua acima do bloco, inteiro, sem reticências e sem encostar em nada, em 1440, 375 e 360. A linha do cartão 08 continua em duas linhas, sem encostar no número.
4. **A altura dos cartões no celular:** de 480 para 544 px, em todos os cartões do carrossel, para a última fileira de chips do cartão 06 e o chip do cartão das Sessões aparecerem inteiros. No computador, a altura não muda.
5. **A barra acesa da régua:** termina no fim da semana 2, no computador e no celular. Continua fixa.
6. **As chamadas que não levam ao quiz** (18.2.6): a do cartão da oferta, no computador e no celular, e a do topo da página, no celular. Passam a levar a /quiz/ com as utm do endereço e o id_sessao, do mesmo jeito que as outras. Depois disso, faça a lista de tudo o que na página tem cara de botão de chamada, nas três larguras, com o texto de cada um e para onde leva. Se sobrar algum que não leva ao quiz, não conserte: liste na resposta.

Depois disso, nenhum texto visível da página diz "GSAAS". Se sobrar, fora desses lugares, menção visível a agentes de IA como parte da oferta, não mexa: liste na resposta, com o trecho exato.

## 20.1 · Registrar

- base/decisoes.md sobe de versão com a decisão nova no próximo número livre (deve ser a #119): as duas frases do Otávio, a tabela acima por referência a este pedido e a nota de que ela aplica a #68 e a #84 à landing-page-02, faz valer a 9.15 (#114) sobre os rótulos da #118 e substitui, na #118, a resposta de "Quem me atende depois que eu assinar?". "Revista por" da #118 ganha a decisão nova.
- log.md com a entrada. Cascata pela regra de versionamento. Nenhum fato muda: a ficha de fatos e base/produto.md ficam como estão.
- Na resposta, avise que o pedido 13 passa a começar no número seguinte (não edite o pedido 13).

## 20.2 · A página

- As seis mudanças acima.
- entregas/landings/landing-page-02/README.md sobe de versão, com "O que mudou" listando cada troca de texto (antes e depois), cada bloco que saiu e cada medida que mudou. É a lista que vai junto se um zip novo vier do projeto original, na Vercel. depende_de com a versão nova das decisões.
- A visita continua indo ao banco como landing-page-02, versão 1. Se achar que a versão devia subir, é pergunta.

## 20.3 · Prova, prints e fechamento

O que provar:
- O ensaio sobe de versão. Conferências novas: "GSAAS" não aparece em nenhum texto visível; o carrossel tem 9 cartões e o contador fecha em "09 / 09", em 1440, 375 e 360; as duas respostas novas do FAQ e os dois rótulos novos estão nas duas versões da página, e "Fase 1 · Análise" e "Fechamento · 3ª Sessão de Comando" não sobram; em 375 e 360, nenhum chip cortado em nenhum cartão; a barra da régua termina no fim da semana 2; as chamadas do cartão da oferta e do topo levam a /quiz/ com as utm e o id_sessao, nas três larguras; cada item que sobrou no menu da demonstração abre a sua tela, nos dois perfis. As conferências do pedido 18 que este pedido muda de propósito (os textos trocados, os 10 cartões) acompanham; as outras continuam de pé. O ensaio inteiro e o teste do quiz passam.
- Pela 18.3.5: o cabeçalho do ensaio passa a declarar a versão atual do prototipo-funil-01, e nucleo/ferramentas/README.md ganha a frase sobre as seções novas do ensaio.
- Prova de que o ensaio pega o erro, duas vezes: devolva de propósito a frase antiga de "E depois dos 90 dias?" numa das versões; depois, desfaça o conserto de uma das chamadas. Rode, mostre as falhas, desfaça e confira que os arquivos voltaram iguais.
- Se o item dos agentes ficou como estava (a saída prevista), a conferência do "GSAAS" vale para os outros lugares, e a resposta diz isso na primeira linha.
- Fora do que este pedido lista, nada muda: ponha na resposta todas as trocas no programa (antes, depois e quantas cópias), como na resposta do 18.

Prints em entregas/landings/landing-page-02/prints/, em 1440 e 375, sem dado de pessoa. Refaça os oito do pedido 18, que ficaram velhos, com os mesmos nomes, e acrescente:
- o fim do carrossel, com o cartão das Sessões por último;
- a demonstração do produto, no perfil "Para quem gere o time", com o menu;
- o cartão da oferta e o topo da página, que são onde ficam as duas chamadas consertadas.

Fechamento:
- index.md com a versão nova da landing-page-02 e do ensaio.
- prompts/20-gsaas-fora-da-landing-resposta.md: o que foi feito, com os commits; os textos como aparecem na página; a lista dos botões de chamada e para onde cada um leva; a lista de trocas; os prints; as perguntas para o Otávio; os commits que subiram.
- ESTADO.md: se já existir, reescreva; se não existir, não crie (é do pedido 14).
- Nada publicado.
