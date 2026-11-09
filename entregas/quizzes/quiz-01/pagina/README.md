---
id: quiz-01-pagina
versao: 3
status: rascunho
aprovado_por:
  otavio: pendente
  junior: pendente
  euclides: pendente
depende_de:
  - id: quiz-01-copy
    versao: 2
  - id: quiz-01-briefing
    versao: 2
  - id: lead-score
    versao: 3
  - id: ficha-de-fatos
    versao: 4
  - id: planta-do-banco
    versao: 4
  - id: funil-01
    versao: 3
  - id: lacunas
    versao: 6
  - id: garcom
    versao: 4
  - id: decisoes
    versao: 5
desatualizado: true
---

# Quiz-01 · página

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
- **Clique no fim** (`interesse_pos_relatorio`, com `clique_fim_quiz`; 18.4; lista proposta da 31.15): "Quero marcar uma conversa" vai como quero-conversa, "Chamar no WhatsApp" como chamar-whatsapp, "Tenho interesse" como tenho-interesse e "Agora não" como agora-nao; cada valor vai uma vez por sessão. O clique só sai **depois de o fim do quiz ter sido gravado** (o banco recusa o clique sem ele, 32.2): antes disso, fica na memória da aba e sai quando o fim do quiz gravar, inclusive pelo "Tentar de novo". Com a caixa desmarcada, nenhum clique é mandado (13.4). O "Mandar no WhatsApp" do fim do plano de 90 dias não é botão do relatório e não manda clique (pergunta 34.6).
- **Dados de teste** (#102): o botão "protótipo · preencher exemplo" preenche TESTE Marina Souza, marina@teste.invalid e telefone com zeros, porque no site do protótipo o envio grava de verdade no banco de teste.

**Consentimento** (quiz-01-copy v2, seção 7 e M16; #104, #105). Uma caixa só, que já vem marcada, antes dos campos de e-mail e WhatsApp (a posição fica, #110). Texto de antes da caixa, caixa e aviso são os da copy v2, para o Otávio conferir (pergunta 31.1). O botão "Ver meu diagnóstico" libera com nome, e-mail e WhatsApp válidos, com a caixa marcada ou não. Marcada: o pacote vai ao garçom. Desmarcada: aparece o aviso "Sem o aceite, o diagnóstico aparece só aqui na tela, e nada é enviado.", o diagnóstico aparece na tela e nada vai ao banco nem à equipe, nem o fim do quiz nem o clique do fim (escolha provisória, pergunta 30.3). A linha da cópia no relatório segue a M21 da copy v2: com a caixa marcada, o texto do mockup ("Uma cópia deste diagnóstico vai para o seu e-mail e WhatsApp."); desmarcada, "Este diagnóstico fica só aqui na tela. Sem o aceite, nada foi enviado." (30.3; correção do revisor da etapa 34). As outras frases do quiz que falam de cópia ou contato ficam como estão, também para quem desmarca (7.5; pergunta 34.2).

**Texto.** Como está (7.5, #110), salvo a caixa de aceite e a linha da cópia no relatório, que depende dela (M21). A fala 2 do plano de 90 dias continua sem o percentual, como na v2: a volta dele está em aberto (pergunta 31.3; pergunta 34.1). A nota do "Tenho interesse" é a do lado do lead score ("Anotado. Seu interesse fica registrado com o seu diagnóstico."), que já estava na página, porque vale o corte mais restritivo e ela não promete ligação (13.7; pergunta 31.14).

**Visual.** O do mockup, em conflito (conflito-18). Duas mudanças técnicas da v3: o `<!doctype html>` e a meta charset como as duas primeiras linhas (09.1), e as fontes (Inter, Space Grotesk e Permanent Marker, de licença livre) servidas junto com a página, em fontes/, sem nenhum pedido ao Google (10.7). Os arquivos de fonte não ficam nesta pasta: são instalados pelo npm em nucleo/ferramentas/fontes/ (lista em fontes.json) e o montador do site os copia para /quiz/fontes/, com a licença de cada um. Aberta direto do arquivo, sem a pasta fontes/, a página cai na letra do sistema, sem pedir nada a ninguém.

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

No site do protótipo (entregas/prototipo-funil-01/), o quiz fica em /quiz/, com as fontes em /quiz/fontes/, e envia ao garçom em /api/fim-quiz e /api/evento.

O botão "Telas", no canto, é do protótipo: pula direto para qualquer tela, para revisão.

## Como testar

```
node nucleo/ferramentas/prints/testar-quiz-01.js
```

Usa o playwright-core de nucleo/ferramentas/prints/ e as fontes de nucleo/ferramentas/fontes/ (`npm install` nas duas pastas; veja nucleo/ferramentas/README.md). Serve esta pasta em /quiz/ e as fontes em /quiz/fontes/ num servidorzinho em 127.0.0.1, só durante o teste, e intercepta no navegador sem tela os POST para /api/fim-quiz e /api/evento, respondendo no lugar do garçom: nada sai para o garçom nem para o Supabase. Cada pacote passa pelas conferências do próprio garçom v4 (`conferirPacote` e `conferirEvento`, importadas de entregas/garcom/garcom.mjs). Em 375 e 1440 pixels:

1. exemplo de base/lead-score.md (faturamento de R$ 500 mil a R$ 1,5 milhão, venda média de R$ 10 mil, 2 ou 3 vendedores, 200 leads, CRM em dia, dono, dinheiro na mesa de 4 vezes o custo mensal, tentativas "1 ou 2" e sobra "Alguns"), com a caixa marcada como vem: modo padrão (doctype), fontes carregadas de /quiz/fontes/, início do quiz ao abrir, campos de número vazios e valor médio obrigatório, caixa única marcada, um POST em /api/fim-quiz com total 96, faixa a, versão 2, lead score 3, os dois consentimentos iguais e a mesma sessão do início;
2. eliminatório (faturamento "Menos de R$ 50 mil") com a sessão vinda da landing no endereço: faixa eliminatorio com a nota 81, o clique em "Tenho interesse" só depois do fim gravado, a nota do lado do lead score e "Agora não" uma vez só;
3. corte mais restritivo: faixa c (nota 24) que passa no corte do Júnior vai para o relatório de não qualificado; com /api/evento fora do ar, nada trava nem avisa;
4. caixa desmarcada: aviso, botão ligado, diagnóstico na tela e nada enviado (nem o fim nem o clique); sessão do endereço fora do formato trocada por uma nova;
5. envio que falha (502): aviso sem detalhe técnico, diagnóstico na tela e "Tentar de novo" reenviando o mesmo pacote; no eliminatório, o clique feito durante a falha só sai depois do reenvio gravado;
6. aberta direto do arquivo (file://): percorre tudo sem enviar nada;
7. em todos, o console sem o pacote nem dado de pessoa, e nenhuma requisição para outro endereço.

Os prints ficam em entregas/quizzes/quiz-01/prints/: capa, pergunta, contato-consentimento (caixa marcada, como vem), contato-sem-consentimento (caixa desmarcada), resultado-a, resultado-eliminatorio, resultado-faixa-c (novo) e envio-falhou (só a tela visível), cada um com -375 e -1440. Os dados de pessoa do teste são de teste, marcados como manda a #102 (TESTE Marina, marina@teste.invalid, telefone com zeros).

### Prints da v3 comparados com os da v2

Comparados pixel a pixel com os da v2 (que estavam sem doctype e com as fontes do Google): capa, pergunta, resultado-eliminatorio e envio-falhou ficaram **idênticos** nas duas larguras, e resultado-a em 375 também (só 26 por 8 pixels no painel). Ou seja, o doctype (modo padrão no lugar do de compatibilidade) e as fontes servidas junto não mudaram nada visível nessas telas. As diferenças são:

- **contato-consentimento e contato-sem-consentimento:** o bloco do aceite tem uma caixa só, com o texto novo, mais longo; as telas ficam de 9 a 28 pixels mais altas. Marcada, a caixa aparece com o visto e sem aviso; desmarcada, aparece o aviso "Sem o aceite, ..." e o botão "Ver meu diagnóstico" continua ligado (na v2, com as caixas desmarcadas, o botão ficava cinza).
- **resultado-a em 1440:** o mesmo conteúdo, com o painel fixo do lado direito numa altura diferente da página inteira (o painel acompanha a rolagem no momento do print); nada mudou na tela.
- **resultado-eliminatorio (depois da correção do revisor):** a linha da cópia do relatório ficou com o texto do mockup, sem "nos canais que você aceitou" (M21); o resto igual.
- **resultado-faixa-c:** print novo, o relatório de não qualificado do caso do corte mais restritivo.

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
- O link da política de privacidade no consentimento; o número do WhatsApp; os vídeos.
- A migração 001, o catalogo-prototipo.sql v2 e o garçom v4 no Supabase e na Cloudflare (roteiro da etapa 35), para o início do quiz, o clique e a versão 2 gravarem de verdade; antes de tráfego real, a proteção contra robô e o limite de pedidos (log.md, Pendências).
- O relatório usar os números da pessoa no lugar dos cenários de exemplo do protótipo (14.7: fica para a versão que for ao ar).
- A montagem tirar os comentários de cabeçalho dos HTML antes de ir ao ar com gente de verdade (23.9: fica para a versão que for ao ar).
- Revisão jurídica fica com a empresa que assina a política, fora do sistema (#103).

## Perguntas

prompts/07-fila-perguntas.md, 14.1 a 14.13; prompts/08-fila-perguntas.md, 23.1 a 23.5 e 23.8 (versão 2); prompts/09-acentos-do-quiz-resposta.md, 09.1; prompts/11-fila-perguntas.md, 30.3, 31.1 a 31.3, 31.13 a 31.15, 32.2 e Etapa 34 (versão 3).
