---
id: quiz-01-pagina
versao: 12
status: rascunho
aprovado_por:
  otavio: pendente
  junior: pendente
  euclides: pendente
depende_de:
  - id: quiz-01-copy
    versao: 4
  - id: quiz-01-briefing
    versao: 3
  - id: lead-score
    versao: 3
  - id: ficha-de-fatos
    versao: 5
  - id: planta-do-banco
    versao: 5
  - id: funil-01
    versao: 4
  - id: lacunas
    versao: 7
  - id: garcom
    versao: 6
  - id: decisoes
    versao: 14
  - id: landing-page-02
    versao: 2
  - id: politica-de-privacidade
    versao: 7
desatualizado: true
---

# Quiz-01 · página

**Versão 12 (25/11/2026, #123, pedido 23).** A tela dos cinco números do funil fica só em quantidade (copy v4, 5.2): as cinco linhas com o "nº" fixo, sem o botão "%" e sem a troca de unidade (a de pré-qualificados, que começava em "%", começa em "nº" como as outras). A conta ao vivo fica com "base de todas as contas", "= [n]% de [etapa anterior]" e o aviso "Maior que a etapa anterior. Confere esse número?", que continua só aviso; saem o "≈ [n] [etapa]" e o "Acima de 100%". O botão de seguir só acende com os cinco preenchidos, leads, pré-qualificados, agendados e conversas maiores que zero; vendas pode ser zero (numerosCompletos, a mesma condição que o lead score usa em dinheiroNaMesaInformado). Com o botão apagado, a dica nova aparece perto dele. Saiu o que a porcentagem deixava sem uso (o ramo "%" de volumesDe, de atualizarLivro e de resumoNumeros, e o estilo da troca de unidade). O pacote do fim do quiz mantém o formato: cada linha de respostas.numeros continua com unidade, agora sempre "nº"; o garçom, o banco e a planilha continuam aceitando o "%" das respostas antigas. A tela do chute não muda. versao_entrega continua 2 (log.md, entrada da Etapa 3, pergunta 1: sobe só quando muda o fim do quiz ou o aceite).

**Versão 12, relatório (25/11/2026, #123, pedido 23, parte 23.3).** O relatório e a conversa gratuita saem de uma conta só, funilDaPessoa(): os cinco números e o valor médio que a pessoa informou. Pelo caminho do quiz, todo relatório de quem respondeu "Sim" (o do qualificado aberto por "Ver meu diagnóstico", o do não qualificado e os dois saudáveis) e o perfil do funil no painel da conversa gratuita usam essa conta; nenhum número dos cenários de exemplo (CENARIOS) chega a essa pessoa. O lead score usa a mesma função em dinheiroNaMesaInformado, com a mesma condição e o mesmo valor de antes (as notas não mudam). Sem empresa, o topo fica só com o nome da Análise e o mês; o nome e a ficha (cargo, ramo, faturamento) vêm só das respostas. Casos-limite: vendas zero (a divisão do dinheiro entre as etapas dá a fatia toda às etapas com taxa 0, que é o limite da conta; frase nova para o fechamento zero), funil pequeno sem venda a mais (o valor "R$ 0", sem as fatias, com frase nova) e números fora de ordem (só aviso), sem NaN, Infinity, undefined nem número negativo. Quem respondeu "Não" continua com a conta de exemplo (CENARIOS.chute; o que a pessoa respondeu no chute não entra na conta), e o relatório e o painel dizem com todas as letras que é um exemplo (copy v4, "Relatório de quem não lembra"); os selos e as frases que saem das respostas dela continuam dela, e os que saem das taxas do exemplo não são dados como dela. A causa do agendamento diz o primeiro contato que a pessoa respondeu (copy, 10.2), e não mais "no mesmo dia" fixo. Pelo painel "Telas" ou pelo endereço (#relatorio...), os relatórios continuam com o exemplo, para revisão; o relatório de vitrine da abertura não muda. versao_entrega continua 2.

**Versão 11 (18/11/2026, #122).** O texto de aceite e o rótulo da caixa da copy v3 (M16), que cobrem também a medição dos anúncios da Meta pelo nosso sistema. A frase "Tudo explicado na política de privacidade." continua vindo depois do texto, com o link, como antes. O consentimento_texto gravado no banco passa a ser o texto novo, a frase da política e a caixa nova (conferido no ensaio v14, no banco de mentira). O aviso com a caixa desmarcada não mudou. versao_entrega continua 2 (ver log.md, entrada da Etapa 3, pergunta 1).

**Versão 10 (18/11/2026, #121).** A origem completa, os ids e os avisos ao GTM, sem nada da Meta. (1) A página lê do endereço, uma vez ao abrir, as cinco utm e o fbclid: utm_source na lista (agora com meta-ads) e utm_campaign em funil-01, como antes; utm_medium, utm_content e utm_term saneadas (minúsculas, letras, números, hífen e sublinhado, até 100; fora disso, vazio); fbclid como veio, se tiver só letras, números, hífen e sublinhado, até 500. Nada fica guardado no navegador. (2) No envio, o pacote do fim do quiz leva esses campos e mais id_lead (lead-<milissegundos>-<sorte>), qualificado (o resultado de qualificadoFim(), a mesma regra que decide o fim do quiz, CRITERIO_DO_FIM) e, só se qualificado, id_qualificado (qualificado-<milissegundos>-<sorte>). O "Tentar de novo" reenvia o mesmo pacote, com o mesmo id_lead, e o banco não duplica. (3) Avisos ao GTM pelo dataLayer, em try/catch: quiz_iniciado na primeira resposta (uma vez por sessão, marcado na memória da aba); quiz_enviado com id_lead só depois do 201 do garçom; quiz_qualificado com id_qualificado logo depois, só se qualificado. Nenhuma resposta, faixa, nota, valor ou dado da pessoa vai ao dataLayer; com erro no envio, nada é avisado. O GTM só lê o dataLayer depois do "Aceitar". (4) O título e o nome da agência no HTML estático passam a ser os valores que a página já mostrava ("Análise Estratégica do Sistema de Vendas" e "Triad", ficha-de-fatos#analise-nome-publico e #nome-agencia), para a prévia de link não mostrar o marcador. O texto do consentimento, as telas e a regra de corte não mudaram; versao_entrega continua 2 (o lead vê a mesma página). Ensaio v13: 283 de 283; teste do quiz: tudo certo.

A página do quiz-01 do funil-01, em rascunho. Nada daqui vai ao ar.

**O que é.** Uma cópia do mockup do Júnior (fontes/quiz-01-repositorio-2026-11-08/mockups/quiz-diagnostico.html, que não foi alterado) com o texto de `quiz-01-copy` (mudanças M1 a M30) e a lógica pedida na etapa 14 (prompts/07-fila-da-noite.md) e na etapa 34 (prompts/11-decisoes-de-09-11.md). O mesmo cabeçalho está num comentário no topo do index.html, logo depois do doctype e da meta charset.

**Status.** Rascunho, avisando que pode mudar. O quiz é do Júnior, e o fim dele depende do critério de qualificação (conflito-16) e do funil-01 (#90), os dois pendentes do Júnior e do Euclides. Continua desatualizado, porque se apoia na copy e no briefing do quiz, marcados pela cadeia da pauta, que ainda declara a página v2 (regra 11.1; pergunta 31.19), e no garçom v4, marcado pelo banco.

## O que tem dentro

| Arquivo | O que é |
|---|---|
| index.html | A página: HTML, CSS e o script, num arquivo só |
| poster-junior.jpg | A foto do Júnior que o mockup usa (cópia do arquivo em fontes/) |

No topo do script, quatro objetos concentram o que se ajusta:

- **FATOS:** os fatos da ficha que a página usa, cada um com o id do campo de base/ficha-de-fatos.md (v4). Campo em conflito aparece na tela como aviso visível "[a definir: ...]" (nome público da Análise, nome da agência). As metas por etapa saem daqui, e com elas os números das metas escritos no relatório ("pelo menos 5", "1 a cada 4", "1 a cada 5", "metade", a conversão geral e o rodapé), como pede a pergunta 13.13. O preço da Avançada só entra na conta do lead score; não aparece na tela.
- **LEAD_SCORE:** pontos, faixas e eliminatórios de base/lead-score.md (v3; os pontos são os da v2), comentados, com lead_score_versao 3 no pacote. A conta está em `calcularLeadScore()`, que só usa o que a pessoa respondeu. O eliminatório também tem a nota calculada e guardada (14.8). Funil todo na meta vale a faixa "menos de 0,5"; modo chute, número faltando ou valor vazio contam como "sem números informados" (14.9). O custo mensal sai de ficha-de-fatos#preco-avancada, que vale enquanto houver vaga (4.7).
- **CRITERIO_DO_FIM:** qual critério decide o final. Está em `'mais-restritivo'` (14.2; lead-score v3, "Até a reunião"): só é qualificado quem passa no corte do Júnior (fatura a partir de R$ 50 mil e tem vendedor) e no do lead score (faixas a e b). É regra provisória e não escolhe lado no conflito-16 (leitura da pergunta 31.13). Os dois critérios continuam lado a lado no console (13.6). `'junior'` e `'lead-score'` continuam disponíveis.
- **ETIQUETAS e UTM_ACEITAS:** funil-01, entrega quiz-01, **versão 2** (a v3 da página muda o fim e o aceite; a versão 1 foi a da página v2; linha nova no catálogo, dados/banco/catalogo-prototipo.sql v2), e os valores de utm_source e utm_campaign aceitos, da tabela de origens do funil-01. Fora da lista, a etiqueta vai vazia.

**Pacote.** No envio do contato, `montarPacote()` monta o pacote no formato de dados/planta/planta.md (v4): a parte da gaveta pessoas (nome, telefone, email, empresa, os quatro campos de consentimento, e primeira_utm_source e primeira_utm_campaign) e o evento fim_quiz (etiquetas, id_sessao, ocorrido_em, respostas, lead_score_nota, lead_score_faixa, lead_score_versao). A caixa única preenche consentimento_whatsapp e consentimento_email com o mesmo valor, e consentimento_texto leva o texto de antes da caixa, a frase da política e o texto da caixa (#104). Os campos que o banco e o garçom dão (id_pessoa, id_evento, gravado_em, gravado_por) não saem da página.

**Sessão.** O código de sessão vem da landing, no parâmetro `id_sessao` do endereço (10.5), quando está no formato do banco (`sessao-` e até 60 letras minúsculas, números e hífen); senão, a página cria um no mesmo formato ao abrir. Fica só na memória da aba. O mesmo código vai no início do quiz, no fim e nos cliques (6.2; 18.5).

**Envio.** `enviarPacote(pacote)` manda o pacote ao garçom (entregas/garcom/, v4) por POST no endereço relativo `/api/fim-quiz`, em JSON (`Content-Type: application/json`), na mesma origem do site do protótipo (#101), só com a caixa de aceite marcada. Nenhuma chave na página. O pacote não vai mais para o console nem fica guardado no navegador, porque tem dado pessoal; no console só fica a linha dos dois critérios do fim (sem dado de pessoa). O destino dos contatos continua em conflito (conflito-17): o protótipo de teste segue o lado 2 (#90), sem escolher.

- **Se o envio falhar** (o garçom responde erro ou não responde), o diagnóstico continua na tela e aparece um aviso no alto: "Não conseguimos enviar o seu contato para a nossa equipe agora. O seu diagnóstico continua aqui na tela.", com o botão "Tentar de novo", que reenvia o mesmo pacote. Nenhum detalhe técnico aparece (pergunta 23.2).
- **Aberta direto do arquivo** (file://, para revisão), a página funciona igual e não envia nada, nem o fim do quiz nem os eventos, sem aviso na tela (não há garçom no arquivo). O painel "Telas" diz em cada modo se o contato é enviado (pergunta 23.3).

**Eventos sem dado de pessoa** (garçom v4, POST `/api/evento`; planta v4). O pacote é só `{"evento": {...}}`, com as cinco etiquetas, a sessão e a data, sem pessoa e sem aceite. A página não espera a resposta, não avisa e não tenta de novo: se a gravação falhar, o evento se perde e a pessoa segue (10.10).

- **Início do quiz** (`inicio_quiz`; 10.6, 18.5): mandado uma vez, quando a página abre.
- **Clique no fim** (`interesse_pos_relatorio`, com `clique_fim_quiz`; 18.4; lista proposta da 31.15): "Quero marcar uma conversa" vai como quero-conversa, "Chamar no WhatsApp" como chamar-whatsapp, "Tenho interesse" como tenho-interesse e "Agora não" como agora-nao; desde a v8, as duas opções da conversa gratuita com o Junior também: "Sim, eu quero" como quero-conversa e "Agora não" como agora-nao. Cada valor vai uma vez por sessão. O clique só sai **depois de o fim do quiz ter sido gravado** (o banco recusa o clique sem ele, 32.2): antes disso, fica na memória da aba e sai quando o fim do quiz gravar, inclusive pelo "Tentar de novo". Com a caixa desmarcada, nenhum clique é mandado (13.4). O "Ver meu diagnóstico" da conversa gratuita só abre o relatório e não manda clique.
- **Dados de teste** (#102): no site do protótipo o envio grava de verdade no banco de teste; o contato é sempre preenchido à mão, com nome começando por TESTE e e-mail terminado em @teste.invalid. Até a v6, um botão "protótipo · preencher exemplo" preenchia um contato de teste; ele saiu na v7.

**Consentimento** (quiz-01-copy v2, seção 7 e M16; #104, #105). Uma caixa só, que já vem marcada, antes dos campos de e-mail e WhatsApp (a posição fica, #110). Texto de antes da caixa, caixa e aviso são os da copy v2, para o Otávio conferir (pergunta 31.1). O botão "Ver meu diagnóstico" libera com nome, e-mail e WhatsApp válidos, com a caixa marcada ou não. Marcada: o pacote vai ao garçom. Desmarcada: aparece o aviso "Sem o aceite, o diagnóstico aparece só aqui na tela, e nada é enviado.", o diagnóstico aparece na tela e nada vai ao banco nem à equipe, nem o fim do quiz nem o clique do fim (escolha provisória, pergunta 30.3). A linha da cópia no relatório segue a M21 da copy v2: com a caixa marcada, o texto do mockup ("Uma cópia deste diagnóstico vai para o seu e-mail e WhatsApp."); desmarcada, "Este diagnóstico fica só aqui na tela. Sem o aceite, nada foi enviado." (30.3; correção do revisor da etapa 34). As outras frases do quiz que falam de cópia ou contato ficam como estão, também para quem desmarca (7.5; pergunta 34.2).

**Texto.** Como está (7.5, #110), salvo a caixa de aceite e a linha da cópia no relatório, que depende dela (M21). Desde a v8, a oferta do plano de 90 dias saiu do fim do quiz, e com ela a fala 2 do plano, que estava sem o percentual (perguntas 31.3 e 34.1); no lugar, a conversa gratuita com o Junior, com os textos aprovados pelo Otávio em 15/11/2026 (abaixo, "O que mudou na versão 8"). A nota do "Tenho interesse" é a do lado do lead score ("Anotado. Seu interesse fica registrado com o seu diagnóstico."), que já estava na página, porque vale o corte mais restritivo e ela não promete ligação (13.7; pergunta 31.14).

**Visual.** O do mockup, em conflito (conflito-18), salvo a abertura, que desde a v4 tem o cabeçalho e o botão da landing-page-02 (abaixo). Duas mudanças técnicas da v3: o `<!doctype html>` e a meta charset como as duas primeiras linhas (09.1), e as fontes (Inter, Space Grotesk e Permanent Marker, de licença livre) servidas junto com a página, em fontes/, sem nenhum pedido ao Google (10.7). Os arquivos de fonte não ficam nesta pasta: são instalados pelo npm em nucleo/ferramentas/fontes/ (lista em fontes.json) e o montador do site os copia para /quiz/fontes/, com a licença de cada um. Aberta direto do arquivo, sem a pasta fontes/, a página cai na letra do sistema, sem pedir nada a ninguém.

## O que mudou na versão 9

Pedido do Otávio, 16/11/2026, na conversa com o Claude: "Agora eu quero que vc elimine a parte anexada de todos os relatórios.", com um print do fim do relatório, e depois "é a ultima parte do quiz, essa da imagem".

- **Saiu o fim de todos os relatórios** (qualificado, não qualificado, por estimativa, funil saudável e saudável não qualificado), em três peças: o vídeo ("Antes de decidir", "1 minuto com o Junior sobre o seu diagnóstico", a pílula "vídeo do Junior · cerca de 1 min" e o aviso de protótipo do play); os botões "Compartilhar" e "Baixar PDF", com o aviso de protótipo deles; e o rodapé (a marca Triad, "Metas usadas: ..." e "Final do quiz: [a definir: critério de qualificação]"). Agora o relatório termina no dinheiro na mesa ou, onde existe, na chamada.
- **Saiu junto o que só essas peças usavam:** os estilos .video, .video-bloco, .pilula, .play, .cartao__aviso, .acoes e .rodape, a constante TRIAD (o símbolo do rodapé) e a ação "aviso" do programa.
- **Ficou:** o botão "Cookies" (o link do consentimento, que é da montagem do site e aparece em todas as páginas, não do relatório); a chamada de cada relatório, como na v8 (o relatório aberto pela conversa continua sem ela); a foto do Junior, que a conversa usa; o nome da agência, que o cabeçalho usa; e os botões "Compartilhar" e "Baixar PDF" desativados do painel lateral que acompanha o quiz, que não é relatório (pergunta no log.md).
- **O critério de qualificação** (conflito-16) continua a definir, mas deixa de aparecer na tela: só o rodapé o mostrava.
- **Não mudou:** as outras telas e textos, as regras de qualificação, a conta, o envio, a medição, os eventos e a etiqueta que a página manda ao banco (quiz-01, versão 2).
- **Testes:** o teste do quiz confere, nas três larguras, que nenhum dos cinco relatórios (pelo painel "Telas"), nem o do qualificado aberto pela conversa, nem o do não qualificado pelo caminho do quiz, tem o vídeo, os dois botões ou o rodapé, e que nada deles sobra no arquivo da página: 425 de 425 (eram 388).

## O que mudou na versão 8

Pedido do Otávio, 15/11/2026, na conversa com o Claude: "Agora eu queria retirar o vídeo e as mensagens do formulário do quiz. Vamos mudar para o Junior dizendo que antes de enviar o diagnóstico, perguntar pra pessoa se ela quer uma reunião gratuita com Junior Neves para que ele apresente um plano de ação de 90 dias para aumentar a eficácia do sistema de vendas do LEAD. Ele responde sim ou não e o Junior responde que em alguns minutos o time entrará em contato com ele." Respostas dele às perguntas do Claude: a pergunta entra depois do contato, no lugar da oferta de hoje, e no fim a pessoa aperta um botão e vê o diagnóstico; o "não" tem resposta própria; a palavra é "conversa", não "reunião" (o GLOSSARY.md manda evitar "reunião" para a conversa com o Junior, a Call de Direcionamento).

- **Saiu a oferta do plano de 90 dias,** as três telas que só ela usava: `plano` (a fala do dinheiro na mesa, a do plano de 90 dias, a da promoção com o valor depois dela, a pergunta "Quer receber o seu plano de ação de 90 dias?" e as opções "Sim, eu quero" e "Quero ver como é"), `plano-exemplo` (a página de exemplo do plano, com os botões flutuantes "Voltar" e "Quero o meu") e `video-time` (o vídeo de alguém do time e a mensagem pronta para o WhatsApp). Saíram junto os estilos só delas (.plano-ex, .folha, .flutua, .video--time, .video__ph, .video-chat, .whats e a largura "plano") e os trechos do programa só delas: a página de exemplo, as ações dos três botões, a constante WHATS, o desenho do balão de conversa do botão do WhatsApp, o "a definir" do número do WhatsApp (A_DEFINIR, que só aparecia ali) e, em FATOS, o valor da Análise (ficha-de-fatos#analise-valor) e a frase da promoção, que só a fala da promoção usava.
- **Ficou, porque outra tela usa:** o vídeo do Junior e o "Chamar no WhatsApp" do relatório; a conta da conversa (contaConversa e perfilConversa), que dá o perfil do funil no painel depois do contato; `mil` e `fato`; a gratuidade da Análise na abertura (ficha-de-fatos#analise-gratuidade, sem a frase).
- **Entrou a tela `conversa`** ("Conversa gratuita com o Junior" no painel "Telas", logo depois de "Montando o diagnóstico"; agora são 25 telas, eram 27), no mesmo lugar do caminho: depois de montar o diagnóstico, só para quem ia para a oferta (qualificado com etapa abaixo da meta). Quem não se qualifica e quem tem o funil saudável continuam indo direto para os relatórios deles. A tela segue o padrão das outras da conversa: a fala do Junior "Antes de abrir o seu diagnóstico, uma pergunta, {nome}.", a pergunta "Quer uma conversa gratuita comigo? Eu te apresento um plano de ação de 90 dias para aumentar a eficácia do sistema de vendas da sua empresa." e as opções "Sim, eu quero" e "Agora não". A resposta entra como a da pessoa, e o Junior responde: ao sim, "Fechou, {nome}. Em alguns minutos alguém do meu time chama você no WhatsApp para marcar."; ao não, "Tudo bem, {nome}. O seu diagnóstico está pronto." Depois, o botão "Ver meu diagnóstico", com a seta, no estilo dos outros botões, abre o relatório do qualificado (a tela `relatorio`, que já escolhe sozinha a conta por estimativa para quem não lembrava dos números, como antes). A resposta da conversa fica sem o lápis de corrigir, como a do contato, porque o clique já foi.
- **Eventos:** "Sim, eu quero" manda o clique quero-conversa e "Agora não" manda agora-nao, pelo mesmo caminho do relatório (interesse_pos_relatorio, uma vez por sessão, só depois de o fim do quiz ter sido gravado; com a caixa desmarcada, nada). Os dois valores o banco já aceita: nenhum SQL mudou.
- **O relatório aberto pelo botão da conversa vai sem o bloco de chamada** ("Quer resolver isso junto com a nossa equipe?", com "Quero marcar uma conversa", "Chamar no WhatsApp" e "Agora não"), porque a pessoa já respondeu na conversa. Nos outros caminhos e pelo painel "Telas", o relatório continua como antes, com o bloco.
- **Não mudou:** as outras telas e textos, as regras de qualificação (o corte mais restritivo), a conta, o envio, a medição, o aviso "Não conseguimos enviar o seu contato..." e a etiqueta que a página manda ao banco (quiz-01, versão 2; o catálogo não muda). A copy do quiz (quiz-01-copy v2, seção 10.1, "Qualificado · oferta do plano de 90 dias") ficou desatualizada e não foi editada: a atualização dela fica proposta.
- **Testes:** o teste do quiz confere a tela nova (as falas e as opções com o texto aprovado, a resposta do sim e a do não, os dois cliques, o botão, o relatório sem o bloco de chamada e, pelo painel, com ele) e que nenhum texto da oferta antiga sobra, na tela e no arquivo: **388 de 388** (as 345 da v7 e 43 novas). Os prints resultado-a (a conversa respondida com "Sim, eu quero") e envio-falhou (a conversa, com o aviso por cima) mudaram; os outros ficaram os de antes. O ensaio geral (v11) leva o lead A pela conversa gratuita: **258 de 258**.

## O que mudou na versão 7

Pedido do Otávio, 15/11/2026, na conversa com o Claude ("Retire do quiz o \"protótipo pendente\"", com um print da tela do contato apontando o botão). Aplica, para esse botão, o que a #114 já dizia (resposta 23.3, em prompts/08-decisoes-em-uma-pagina.md: "o painel e o botão saem antes de ir ao ar").

- **Saiu o botão "protótipo · preencher exemplo"** da tela do contato, com o estilo dele (.proto-encher) e o trecho do programa que ele chamava (a ação "encher", que punha um contato de teste no formulário). Nenhum outro texto, campo ou regra da tela mudou.
- **Ficou o painel "Telas"** do protótipo (o botão no canto da tela, com a lista das telas), que a mesma resposta 23.3 também manda tirar antes de ir ao ar. O pedido apontou só o botão do contato.
- A etiqueta que a página manda ao banco continua quiz-01, versão 2 (o catálogo não muda).

## O que mudou na versão 6

Decisão do Otávio, 13/11/2026 (base/decisoes.md, #120; pedido 21, parte 21.2). **Só este README: o arquivo da página não mudou.** No site do protótipo, o quiz passa a ser montado em /analise/ no lugar de /quiz/, e o teste (nucleo/ferramentas/prints/testar-quiz-01.js) passa a servir a pasta em /analise/. As frases de "Como abrir" e de "Como testar" acompanham. As saídas de exemplo mais abaixo são registro de rodadas anteriores e ainda mostram /quiz/fontes/. Os caminhos que a página usa são relativos (as fontes e a imagem) ou pela raiz (/politica-de-privacidade/, /api/fim-quiz e /api/evento), e continuam valendo. O cabeçalho de comentário do index.html continua dizendo a versão em que o arquivo foi mexido pela última vez.

## O que mudou na versão 5

Respostas do Otávio aos "a definir" do funil, 13/11/2026 (base/decisoes.md, #117).

- **Nome público da Análise:** "Análise Estratégica do Sistema de Vendas", em FATOS, vindo de ficha-de-fatos#analise-nome-publico (decidido). Aparece no título da aba, na etiqueta da abertura, nas pílulas e nos relatórios, no lugar de "[a definir: nome público da Análise]".
- **Nome da agência:** "Triad", em FATOS, vindo de ficha-de-fatos#nome-agencia (pendente do Júnior e do Euclides; vale para o protótipo). Aparece no cabeçalho do quiz, nos relatórios e no rodapé, no lugar de "[a definir: nome da agência]".
- **Política de privacidade:** na abertura e na tela do contato, "política de privacidade" passa a ser um link para /politica-de-privacidade/, a página da política no site do protótipo, que abre numa aba nova para o diagnóstico não se perder. No texto aceito que vai ao banco, a frase passa a "Tudo explicado na política de privacidade.", que é o que a pessoa vê.
- **Continuam "a definir":** o critério de qualificação (conflito-16, no rodapé dos relatórios) e o número do WhatsApp.
- A copy (quiz-01-copy v2) ainda marca os dois nomes como bloqueados: a atualização dela fica proposta, como manda a cascata.
- depende_de: ficha-de-fatos 5, lacunas 7, decisoes 7, landing-page-02 2 e politica-de-privacidade 4.

## O que mudou na versão 4

Pedido do Otávio, 12/11/2026, na conversa com o Claude. Só a entrada do quiz; o fim, o aceite, os eventos e as etiquetas não mudaram.

- **A capa saiu do funil.** O quiz abre direto na abertura ("Descubra onde sua equipe de vendas está perdendo performance"), que vira a tela 1 de 27 no botão "Telas". Saíram junto o que só a capa usava: a grade verde do fundo, os cartões (o exemplo de diagnóstico e o vídeo do Júnior), o rótulo "Comece aqui", o "Falar no WhatsApp" e a legenda "na meta" do gráfico pequeno. A pílula, o aviso e o botão de play continuam, porque as telas de vídeo usam.
- **Cabeçalho da landing-page-02 na abertura:** o mesmo da página de vendas, fixo no alto (faixa escura com desfoque, logo do Safra e o botão "Fazer a Análise"), com as medidas tiradas da landing-page-02 montada; no celular, reduzido para caber, como na landing. Os desenhos do logo e da seta ficam embutidos na página, sem pedir arquivo à landing. Nas outras telas continua o cabeçalho do quiz.
- **Botão "Fazer a Análise"** no lugar de "Começar diagnóstico", igual ao da landing-page-02 (Botão/Primário: menta, brilho de baixo, reflexo, a faixa de luz que passa sozinha e, no mouse, a seta que anda e a luz que atravessa). Fonte Geist, servida junto com a página como as outras (nucleo/ferramentas/fontes/fontes.json).
- **Computador:** ao rolar, só o relatório de exemplo se mexe; etiqueta, título, promessa, botão e nota ficam parados logo abaixo do cabeçalho (conferido em 1366, 1440 e 1920 pixels de largura).
- **Celular** (escolha do Otávio, 12/11/2026, entre três desenhos): título, promessa e botão vêm antes do relatório; ao rolar, quando o botão da página sai da tela, o mesmo "Fazer a Análise" fica fixo no rodapé (e o botão "Telas" sobe para não ficar por cima).
- **Etiquetas sem mudança:** versao_entrega continua 2. Pela regra escrita nas etiquetas, a versão da entrega sobe quando a página muda o fim do quiz ou o aceite, e esta versão não muda nenhum dos dois; assim o catálogo do banco não precisa de linha nova. Pergunta no log.md (entrada de 12/11/2026, abertura do quiz).
- depende_de ganha landing-page-02 1, de onde vêm o cabeçalho e o botão.

## O que mudou na versão 3

Etapa 34 (prompts/11-decisoes-de-09-11.md), 09/11/2026, com as respostas do Otávio de 09/11/2026 (decisão do Otávio, 09/11/2026).

- **Fim do quiz:** o corte mais restritivo dos dois (14.2): faixa c que passa no corte do Júnior, que antes ia para a oferta do plano, vai para o relatório de não qualificado.
- **Aceite:** caixa única já marcada, com o texto final da copy v2 (M16), os dois consentimentos com o mesmo valor e o mesmo texto, e o comportamento ao desmarcar (13.4, 16.12; #104, #105; 30.3).
- **Eventos novos:** início do quiz ao abrir e clique no fim por /api/evento do garçom v4, sem travar a pessoa; o clique só depois do fim do quiz gravado (18.4, 18.5, 10.6; 32.2; 33.1). A sessão vem da landing (10.5).
- **Etiquetas:** versao_entrega 2 (catálogo v2) e lead_score_versao 3.
- **Doctype e fontes locais** (09.1, 10.7), sem mudança visível nos prints (ver "Prints").
- **Sem mudança:** os campos de número continuam começando vazios (14.4) e o valor médio continua obrigatório (14.5), como na v1; 14.8 e 14.9 já eram assim e agora estão escritos no lead-score v3. O texto das telas não mudou fora da caixa de aceite (7.5).
- depende_de com as versões atuais (quiz-01-copy 2, quiz-01-briefing 2, lead-score 3, ficha-de-fatos 4, planta-do-banco 4, funil-01 3, lacunas 6, garcom 4, decisoes 5).

## O que mudou na versão 2

Etapa 23 (prompts/08-fila-da-madrugada.md; #101 e #102). Só o envio: `enviarPacote` passa a mandar o pacote ao garçom em /api/fim-quiz, mostra o aviso de falha com "Tentar de novo", não envia quando a página é aberta do arquivo e para de escrever o pacote no console. O painel "Telas" e o botão "preencher exemplo" acompanham (dados de teste marcados). O formato do pacote, o texto das telas, o lead score e o visual não mudaram; o único texto novo é o do aviso de falha e o da nota do painel (perguntas 23.2 e 23.3). depende_de ganha garcom 2 e decisoes 4.

## Como abrir

Abrir entregas/quizzes/quiz-01/pagina/index.html no navegador: tudo funciona para revisão, só sem gravar e com a letra do sistema (as fontes só existem no site montado). Para ver as etiquetas, abrir com o endereço terminado em `?utm_source=bio&utm_campaign=funil-01`. O pacote não aparece no console; para ver o pacote, rodar o teste abaixo, que mostra o do exemplo.

No site do protótipo (entregas/prototipo-funil-01/), o quiz fica em /analise/, com as fontes em /analise/fontes/ (desde a decisão #120; até 14/11/2026, em /quiz/, que passa a levar a /analise/), e envia ao garçom em /api/fim-quiz e /api/evento.

O botão "Telas", no canto, é do protótipo: pula direto para qualquer tela, para revisão.

## Como testar

```
node nucleo/ferramentas/prints/testar-quiz-01.js
```

Usa o playwright-core de nucleo/ferramentas/prints/ e as fontes de nucleo/ferramentas/fontes/ (`npm install` nas duas pastas; veja nucleo/ferramentas/README.md). Serve esta pasta em /analise/ e as fontes em /analise/fontes/ num servidorzinho em 127.0.0.1, só durante o teste, e intercepta no navegador sem tela os POST para /api/fim-quiz e /api/evento, respondendo no lugar do garçom: nada sai para o garçom nem para o Supabase. Cada pacote passa pelas conferências do próprio garçom v4 (`conferirPacote` e `conferirEvento`, importadas de entregas/garcom/garcom.mjs). Em 375 e 1440 pixels:

1. exemplo de base/lead-score.md (faturamento de R$ 500 mil a R$ 1,5 milhão, venda média de R$ 10 mil, 2 ou 3 vendedores, 200 leads, CRM em dia, dono, dinheiro na mesa de 4 vezes o custo mensal, tentativas "1 ou 2" e sobra "Alguns"), com a caixa marcada como vem: modo padrão (doctype), fontes carregadas de /quiz/fontes/, início do quiz ao abrir, campos de número vazios e valor médio obrigatório, caixa única marcada, um POST em /api/fim-quiz com total 96, faixa a, versão 2, lead score 3, os dois consentimentos iguais e a mesma sessão do início;
2. eliminatório (faturamento "Menos de R$ 50 mil") com a sessão vinda da landing no endereço: faixa eliminatorio com a nota 81, o clique em "Tenho interesse" só depois do fim gravado, a nota do lado do lead score e "Agora não" uma vez só;
3. corte mais restritivo: faixa c (nota 24) que passa no corte do Júnior vai para o relatório de não qualificado; com /api/evento fora do ar, nada trava nem avisa;
4. caixa desmarcada: aviso, botão ligado, diagnóstico na tela e nada enviado (nem o fim nem o clique); sessão do endereço fora do formato trocada por uma nova;
5. envio que falha (502): aviso sem detalhe técnico, diagnóstico na tela e "Tentar de novo" reenviando o mesmo pacote; no eliminatório, o clique feito durante a falha só sai depois do reenvio gravado;
6. aberta direto do arquivo (file://): percorre tudo, até o relatório pela conversa gratuita, sem enviar nada;
7. (v4) a abertura: o quiz abre nela, sem a capa; cabeçalho da landing-page-02 com o logo; os dois botões dizem "Fazer a Análise"; no computador, ao rolar, só o relatório se mexe e a barra do rodapé não aparece; no celular, o texto vem antes do relatório e a barra aparece ao rolar. Entra no quiz pelo botão da página (exemplo e falhas), pelo do cabeçalho (eliminatório) e, no celular, pelo da barra (corte);
8. em todos, o console sem o pacote nem dado de pessoa, e nenhuma requisição para outro endereço;
9. (v8) a conversa gratuita com o Junior, no lugar da oferta do plano: no exemplo, a tela `conversa` com as falas e as opções do texto aprovado, "Sim, eu quero" com a resposta do Junior, o clique quero-conversa depois do fim gravado e o botão "Ver meu diagnóstico" abrindo o relatório sem o bloco de chamada (pelo painel "Telas", com ele); no envio que falha, depois do reenvio, "Agora não" com a resposta do não e o clique agora-nao; o painel "Telas" com a tela nova e sem as três da oferta; e nenhum texto da oferta antiga, nem na tela nem no arquivo da página.

Os prints ficam em entregas/quizzes/quiz-01/prints/: abertura (v4, no lugar da capa), pergunta, contato-consentimento (caixa marcada, como vem), contato-sem-consentimento (caixa desmarcada), resultado-a (desde a v8, a conversa gratuita respondida com "Sim, eu quero"), resultado-eliminatorio, resultado-faixa-c (novo) e envio-falhou (só a tela visível), cada um com -375 e -1440. Os dados de pessoa do teste são de teste, marcados como manda a #102 (TESTE Marina, marina@teste.invalid, telefone com zeros).

### Prints da v3 comparados com os da v2

Comparados pixel a pixel com os da v2 (que estavam sem doctype e com as fontes do Google): capa, pergunta, resultado-eliminatorio e envio-falhou ficaram **idênticos** nas duas larguras, e resultado-a em 375 também (só 26 por 8 pixels no painel). Ou seja, o doctype (modo padrão no lugar do de compatibilidade) e as fontes servidas junto não mudaram nada visível nessas telas. As diferenças são:

- **contato-consentimento e contato-sem-consentimento:** o bloco do aceite tem uma caixa só, com o texto novo, mais longo; as telas ficam de 9 a 28 pixels mais altas. Marcada, a caixa aparece com o visto e sem aviso; desmarcada, aparece o aviso "Sem o aceite, ..." e o botão "Ver meu diagnóstico" continua ligado (na v2, com as caixas desmarcadas, o botão ficava cinza).
- **resultado-a em 1440:** o mesmo conteúdo, com o painel fixo do lado direito numa altura diferente da página inteira (o painel acompanha a rolagem no momento do print); nada mudou na tela.
- **resultado-eliminatorio (depois da correção do revisor):** a linha da cópia do relatório ficou com o texto do mockup, sem "nos canais que você aceitou" (M21); o resto igual.
- **resultado-faixa-c:** print novo, o relatório de não qualificado do caso do corte mais restritivo.

### Resultado do teste (12/11/2026, v4)

**144 de 144** (72 por largura), seis rodadas seguidas, numa máquina Linux na nuvem. São as 132 da v3 com estas mudanças: a das fontes confere Inter, Space Grotesk e Geist na abertura (a Permanent Marker só aparece no relatório, e a conferência das fontes servidas junto deixa a de mão de fora no exemplo, que vai para o plano); entram as da abertura (sem a capa e na tela 1 de 27; cabeçalho da landing-page-02 com o logo no lugar do do quiz; os dois botões "Fazer a Análise"; sem a barra antes de rolar; no computador, ao rolar, só o relatório se mexe e a barra não aparece; no celular, o texto antes do relatório e a barra ao rolar). Numa rodada anterior, a conferência "só o relatório se mexe" falhou uma vez porque mediu no meio da animação de entrada da tela (10 pixels); o teste passou a esperar a animação acabar antes de medir, e as seis rodadas seguintes passaram. Os prints das outras telas, regravados nesta máquina, só mudaram no desenho das letras e ficaram os de antes; os da abertura substituem os da capa.

### Resultado do teste (09/11/2026)

Antes 60 conferências (30 por largura), agora 132 (66 por largura), todas certas. Todas as conferências da v2 continuam, com estas expectativas mudadas: lead_score_versao 2 para 3 (lead-score v3); versão da entrega 1 para 2 (catálogo v2); "nenhuma requisição externa além das fontes do mockup" passa a "nenhuma requisição para outro endereço" (10.7); os quatro casos "sem consentimento" (botão desligado, aviso, nenhum envio forçando o clique, fica na tela de contato) passam ao caso "desmarcada" (aviso, botão ligado, nenhum envio, diagnóstico na tela), pela 13.4; no arquivo, "nada é enviado" passa a valer também para os eventos.

```
· 375 pixels
OK     · doctype: modo padrão (CSS1Compat), não mais BackCompat (09.1)
OK     · exemplo: Inter, Space Grotesk e Permanent Marker carregadas na capa (Inter:loaded, Space Grotesk:loaded, Permanent Marker:loaded)
OK     · exemplo: um início do quiz, mandado quando o quiz abre (10.6; 18.5)
OK     · exemplo: início do quiz por POST, application/json, na mesma origem (/api/evento)
OK     · exemplo: início do quiz passa nas conferências do garçom v4 (null)
OK     · exemplo: início com etiquetas funil-01, quiz-01, versão 2, utm do endereço e sessão no formato do banco
OK     · exemplo: início do quiz sem pessoa
OK     · exemplo: campos de número começam vazios (14.4)
OK     · exemplo: valor médio vazio e "Continuar" desligado até ter valor (14.5)
OK     · exemplo: a caixa única já vem marcada (13.4)
OK     · exemplo: uma caixa só
OK     · exemplo: com a caixa marcada, o aviso de desmarcada não aparece
OK     · exemplo: texto da caixa da copy v2 (M16)
OK     · exemplo: um envio para /api/fim-quiz
OK     · exemplo: POST, application/json, na mesma origem (/api/fim-quiz)
OK     · exemplo: o pacote passa nas conferências do garçom v4 (null)
OK     · exemplo: total 96 (veio 96)
OK     · exemplo: faixa a (veio a)
OK     · exemplo: lead_score_versao 3 (lead-score v3)
OK     · exemplo: etiquetas funil-01, quiz-01, versão 2
OK     · exemplo: utm lidas do endereço (bio, funil-01)
OK     · exemplo: o fim do quiz leva a mesma sessão do início
OK     · exemplo: a caixa preenche os dois consentimentos com o mesmo valor (#104)
OK     · exemplo: o texto aceito é o texto de antes da caixa e o da caixa
OK     · exemplo: pessoa de teste marcada (TESTE, @teste.invalid)
OK     · exemplo: pacote só com pessoa e evento
OK     · exemplo: nenhum aviso de falha
OK     · exemplo: nenhum clique mandado sem clique
OK     · exemplo: console sem o pacote e sem dado de pessoa
OK     · exemplo: nenhuma requisição para outro endereço
OK     · exemplo: as fontes vêm de /quiz/fontes/, junto com a página (10.7)
OK     · eliminatório: um envio
OK     · eliminatório: faixa eliminatorio, com a nota guardada (14.8; veio eliminatorio, nota 81)
OK     · eliminatório: início e fim com a sessão que a landing mandou no endereço (10.5)
OK     · eliminatório: tela do relatório com "Tenho interesse"
OK     · eliminatório: o clique vai como interesse_pos_relatorio, tenho-interesse (18.4)
OK     · eliminatório: o clique passa nas conferências do garçom v4, com a mesma sessão
OK     · eliminatório: o clique só sai depois do fim do quiz gravado (32.2)
OK     · eliminatório: nota do "Tenho interesse" do lado do lead score, sem prometer ligação (31.14)
OK     · eliminatório: "Agora não" vai uma vez só, mesmo com dois toques
OK     · eliminatório: console sem dado de pessoa
OK     · corte: faixa c (veio c, nota 24)
OK     · corte: quem passa no corte do Júnior e fica na faixa c vai para o relatório de não qualificado (14.2; antes ia para o plano)
OK     · corte: com /api/evento fora do ar, o início e o clique foram tentados uma vez cada, sem nova tentativa
OK     · corte: a falha do registro de evento não trava nem avisa (10.10)
OK     · desmarcada: aviso "Sem o aceite, ..." visível
OK     · desmarcada: o botão continua ligado (nome, e-mail e WhatsApp válidos)
OK     · desmarcada: nenhum envio para /api/fim-quiz
OK     · desmarcada: o clique no fim não é mandado
OK     · desmarcada: o diagnóstico aparece na tela, sem aviso de falha
OK     · desmarcada: sessão do endereço fora do formato é trocada por uma nova, no formato do banco
OK     · desmarcada: console sem dado de pessoa
OK     · falha: aviso visível, dizendo que o diagnóstico continua na tela
OK     · falha: aviso sem detalhe técnico
OK     · falha: o diagnóstico continua na tela, com o aviso por cima
OK     · falha: "Tentar de novo" reenvia (2 envios)
OK     · falha: o reenvio manda o mesmo pacote
OK     · falha: console sem dado de pessoa
OK     · falha e clique: com o fim do quiz sem gravar, o clique espera na memória da aba
OK     · falha e clique: o clique sai depois do reenvio gravado, uma vez só
OK     · arquivo (file://): percorre tudo e nada é enviado, nem o fim do quiz nem os eventos
OK     · arquivo (file://): nenhum aviso de falha
OK     · arquivo (file://): nenhuma requisição para outro endereço (sem a pasta fontes/, cai na letra do sistema)
OK     · arquivo (file://): console sem dado de pessoa

· 1440 pixels
OK     · doctype: modo padrão (CSS1Compat), não mais BackCompat (09.1)
OK     · exemplo: Inter, Space Grotesk e Permanent Marker carregadas na capa (Inter:loaded, Space Grotesk:loaded, Permanent Marker:loaded)
OK     · exemplo: um início do quiz, mandado quando o quiz abre (10.6; 18.5)
OK     · exemplo: início do quiz por POST, application/json, na mesma origem (/api/evento)
OK     · exemplo: início do quiz passa nas conferências do garçom v4 (null)
OK     · exemplo: início com etiquetas funil-01, quiz-01, versão 2, utm do endereço e sessão no formato do banco
OK     · exemplo: início do quiz sem pessoa
OK     · exemplo: campos de número começam vazios (14.4)
OK     · exemplo: valor médio vazio e "Continuar" desligado até ter valor (14.5)
OK     · exemplo: a caixa única já vem marcada (13.4)
OK     · exemplo: uma caixa só
OK     · exemplo: com a caixa marcada, o aviso de desmarcada não aparece
OK     · exemplo: texto da caixa da copy v2 (M16)
OK     · exemplo: um envio para /api/fim-quiz
OK     · exemplo: POST, application/json, na mesma origem (/api/fim-quiz)
OK     · exemplo: o pacote passa nas conferências do garçom v4 (null)
OK     · exemplo: total 96 (veio 96)
OK     · exemplo: faixa a (veio a)
OK     · exemplo: lead_score_versao 3 (lead-score v3)
OK     · exemplo: etiquetas funil-01, quiz-01, versão 2
OK     · exemplo: utm lidas do endereço (bio, funil-01)
OK     · exemplo: o fim do quiz leva a mesma sessão do início
OK     · exemplo: a caixa preenche os dois consentimentos com o mesmo valor (#104)
OK     · exemplo: o texto aceito é o texto de antes da caixa e o da caixa
OK     · exemplo: pessoa de teste marcada (TESTE, @teste.invalid)
OK     · exemplo: pacote só com pessoa e evento
OK     · exemplo: nenhum aviso de falha
OK     · exemplo: nenhum clique mandado sem clique
OK     · exemplo: console sem o pacote e sem dado de pessoa
OK     · exemplo: nenhuma requisição para outro endereço
OK     · exemplo: as fontes vêm de /quiz/fontes/, junto com a página (10.7)
  pacote do exemplo: {"pessoa":{"nome":"TESTE Marina","telefone":"+55 (00) 90000-0000","email":"marina@teste.invalid","empresa":"","consentimento_whatsapp":"sim","consentimento_email":"sim","consentimento_texto":"Antes do seu contato, o combinado. Seu nome, e-mail e WhatsApp servem para duas coisas: mandar o seu diagnóstico e alguém da nossa equipe falar com você sobre ele, por mensagem ou ligação no WhatsApp e por e-mail. Nada além disso. A caixa abaixo já vem marcada. Se preferir, desmarque: você vê o diagnóstico aqui na tela, e nada é enviado para a gente. Você pode retirar o aceite ou pedir para apagar seus dados quando quiser. Tudo explicado na política de privacidade [a definir: link da política de privacidade]. Aceito receber o meu diagnóstico e o contato da equipe por WhatsApp, por mensagem ou ligação, e por e-mail.","consentimento_em":"2026-11-09T15:47:10.454Z","primeira_utm_source":"bio","primeira_utm_campaign":"funil-01"},"evento":{"tipo":"fim_quiz","funil":"funil-01","entrega":"quiz-01","versao_entrega":2,"utm_source":"bio","utm_campaign":"funil-01","id_sessao":"sessao-mw9fpihp-kp4y5auj","ocorrido_em":"2026-11-09T15:47:10.454Z","respostas":{"ramo":"Serviços para empresas","faturamento":"R$ 500 mil a R$ 1,5 milhão","vendedores":"2 ou 3","quem-marca":"Sim. O vendedor faz tudo","valor-medio":"R$ 10.000","origem":["Indicação de clientes"],"crm":"Sim, e o time atualiza todo dia","cargo":"Dono(a) ou sócio(a)","lembra":"Sim","numeros":[{"linha":"Leads por mês","valor":"200","unidade":"nº"},{"linha":"Pré-qualificados","valor":"50","unidade":"%"},{"linha":"Agendados","valor":"50","unidade":"nº"},{"linha":"Conversas realizadas","valor":"40","unidade":"nº"},{"linha":"Vendas fechadas","valor":"2","unidade":"nº"}],"causa":"Em até 1 hora","causa2":"1 ou 2","causa3":"Alguns"},"lead_score_nota":96,"lead_score_faixa":"a","lead_score_versao":3}}
  início do quiz: {"evento":{"tipo":"inicio_quiz","funil":"funil-01","entrega":"quiz-01","versao_entrega":2,"utm_source":"bio","utm_campaign":"funil-01","id_sessao":"sessao-mw9fpihp-kp4y5auj","ocorrido_em":"2026-11-09T15:47:05.055Z"}}
OK     · eliminatório: um envio
OK     · eliminatório: faixa eliminatorio, com a nota guardada (14.8; veio eliminatorio, nota 81)
OK     · eliminatório: início e fim com a sessão que a landing mandou no endereço (10.5)
OK     · eliminatório: tela do relatório com "Tenho interesse"
OK     · eliminatório: o clique vai como interesse_pos_relatorio, tenho-interesse (18.4)
OK     · eliminatório: o clique passa nas conferências do garçom v4, com a mesma sessão
OK     · eliminatório: o clique só sai depois do fim do quiz gravado (32.2)
OK     · eliminatório: nota do "Tenho interesse" do lado do lead score, sem prometer ligação (31.14)
OK     · eliminatório: "Agora não" vai uma vez só, mesmo com dois toques
OK     · eliminatório: console sem dado de pessoa
OK     · corte: faixa c (veio c, nota 24)
OK     · corte: quem passa no corte do Júnior e fica na faixa c vai para o relatório de não qualificado (14.2; antes ia para o plano)
OK     · corte: com /api/evento fora do ar, o início e o clique foram tentados uma vez cada, sem nova tentativa
OK     · corte: a falha do registro de evento não trava nem avisa (10.10)
OK     · desmarcada: aviso "Sem o aceite, ..." visível
OK     · desmarcada: o botão continua ligado (nome, e-mail e WhatsApp válidos)
OK     · desmarcada: nenhum envio para /api/fim-quiz
OK     · desmarcada: o clique no fim não é mandado
OK     · desmarcada: o diagnóstico aparece na tela, sem aviso de falha
OK     · desmarcada: sessão do endereço fora do formato é trocada por uma nova, no formato do banco
OK     · desmarcada: console sem dado de pessoa
OK     · falha: aviso visível, dizendo que o diagnóstico continua na tela
OK     · falha: aviso sem detalhe técnico
OK     · falha: o diagnóstico continua na tela, com o aviso por cima
OK     · falha: "Tentar de novo" reenvia (2 envios)
OK     · falha: o reenvio manda o mesmo pacote
OK     · falha: console sem dado de pessoa
OK     · falha e clique: com o fim do quiz sem gravar, o clique espera na memória da aba
OK     · falha e clique: o clique sai depois do reenvio gravado, uma vez só
OK     · arquivo (file://): percorre tudo e nada é enviado, nem o fim do quiz nem os eventos
OK     · arquivo (file://): nenhum aviso de falha
OK     · arquivo (file://): nenhuma requisição para outro endereço (sem a pasta fontes/, cai na letra do sistema)
OK     · arquivo (file://): console sem dado de pessoa

Tudo certo: todas as conferências passaram
```

## O que ainda falta para ir ao ar

- Decidir os conflitos 16 a 19 e o nome da Análise (conflito-02) e da agência (conflito-07).
- Conferir o texto da caixa de aceite (31.1) e decidir o que acontece com quem desmarca (30.3, 31.2) e a volta do percentual (31.3).
- O link da política de privacidade no consentimento; o número do WhatsApp.
- A migração 001, o catalogo-prototipo.sql v2 e o garçom v4 no Supabase e na Cloudflare (roteiro da etapa 35), para o início do quiz, o clique e a versão 2 gravarem de verdade; antes de tráfego real, a proteção contra robô e o limite de pedidos (log.md, Pendências).
- O relatório usar os números da pessoa no lugar dos cenários de exemplo do protótipo (14.7: fica para a versão que for ao ar).
- A montagem tirar os comentários de cabeçalho dos HTML antes de ir ao ar com gente de verdade (23.9: fica para a versão que for ao ar).
- Revisão jurídica fica com a empresa que assina a política, fora do sistema (#103).

## Perguntas

log.md, entrada de 12/11/2026, abertura do quiz (versão 4); prompts/07-fila-perguntas.md, 14.1 a 14.13; prompts/08-fila-perguntas.md, 23.1 a 23.5 e 23.8 (versão 2); prompts/09-acentos-do-quiz-resposta.md, 09.1; prompts/11-fila-perguntas.md, 30.3, 31.1 a 31.3, 31.13 a 31.15, 32.2 e Etapa 34 (versão 3).
