# 17 · Resposta · medição com o Google: Tag Manager, aviso de cookies e política

Feito em 12/11/2026, no Claude Code online, em três partes, um commit cada, direto na main (regra 7, exceção até 16/11/2026). O pedido já estava na main desde o d4f7b4d ("17 · pedido da medição com o Google (Tag Manager, aviso de cookies e política)"), antes da 17.1. As respostas do Otávio no pedido valeram como aprovação das mudanças de sentido que elas pedem (decisão do Otávio, 12/11/2026; base/decisoes.md, #116).

## Version ID

- **Current Version ID novo: a82e93cc-82cd-45c5-b2fa-c78d557cef32** (12/11/2026, 16h16, Brasília; da main no e3390e1).
- Versão anterior: fd6ba97b-6a53-4a3b-83b9-b69694594210 (12/11/2026, 11h40).

## O que foi feito

### 17.1 · Registrar a decisão (commit 297df9c, "17.1 · medição com o Google: decisão #116, política v3 e aviso de cookies")

- **base/decisoes.md** v5 para v6: #116, medição com o Google Tag Manager (GTM-T6L4QTB8), carregado só depois do "Aceitar" num aviso de cookies com "Aceitar" e "Recusar" do mesmo peso; o navegador guarda só a escolha; anúncio sempre negado; o id_sessao não vai ao Google; o Analytics é ligado dentro do Tag Manager pelo Otávio; o Search Console vem depois do domínio. Substitui em parte a #114 (6.2).
- **entregas/documentos/politica-de-privacidade.md** v2 para v3: item 7 reescrito, o Google na lista do item 6 e frases ajustadas nos itens 2, 3, 4, 5, 8 e 10, para continuarem verdadeiros; base legal e transferência {{a definir: jurídico da empresa que assina a política (#103)}}. Continua rascunho, com o Otávio, o Júnior e o Euclides pendentes.
- **entregas/documentos/aviso-de-cookies.md** v1, novo: o texto do aviso, rascunho, otavio: pendente.
- **Cascata:** 15 documentos que dependiam de decisoes 5 ficaram com desatualizado: true, só a marca. conexoes.md com o Google Tag Manager, o Google Analytics e o Google Search Console; index.md; log.md; entregas/documentos/README.md.

### 17.2 · Aviso e Tag Manager na montagem (commit e3390e1, "17.2 · aviso de cookies e Tag Manager na montagem, com testes")

- **entregas/prototipo-funil-01/medicao.mjs** e **medicao.json**, novos: o código GTM-T6L4QTB8 e a chave safra_cookies_v1 num lugar só. A montagem acrescenta nos dois HTML montados (o / da landing-page-02 e o /quiz/), nunca nas entregas: o consentimento padrão do Google com tudo negado, antes de tudo; o aviso no topo, em fluxo normal, com os dois botões iguais; o link "Cookies" no fim da página; e o programa que, só depois do "Aceitar", guarda a escolha, concede só a análise, tira o id_sessao do endereço, põe pagina_limpa e origem_limpa na camada de dados e carrega o gtm.js.
- **montar-site.mjs**: confere o bloco em cada HTML; a única exceção a "nenhum pedido a outro endereço" é o carregador do Tag Manager, só dentro do bloco. Montagem: "Tudo certo".
- **Testes**, em 375, 360 e 1440 pixels: teste do quiz **342 de 342**; ensaio v6 **170 de 170**. Prova de que pegam o erro: com o carregador forçado a rodar antes do "Aceitar", 47 falhas no teste do quiz e 16 no ensaio (desfeito depois).
- README do protótipo v8 para v9 (seção "Medição"); prints novos do aviso (aviso-375 e aviso-1440).

### 17.3 · Publicar, conferir e fechar (commit "17.3 · publicação da medição e resposta do pedido 17")

- **Publicado em 12/11/2026, 16h16**, da main no e3390e1, pelo passo 4.3 do APLICAR-11: wrangler 4.158.0, WRANGLER_SEND_METRICS=false, token de API nas variáveis do ambiente da nuvem (temporário até 16/11/2026), conta do Safra no whoami. Montagem "Tudo certo". Deploy: 382 arquivos lidos pelo wrangler e 2 enviados (os dois HTML; dos 334 do site, 332 já estavam lá), Worker de 18,10 KiB, as mesmas três ligações. Nenhum valor de chave em arquivo, log ou chat.
- **Conferido no ar**, num navegador sem tela, em 375 por 812, 360 por 640 e 1440 por 900 pixels: **56 de 56**. Toda requisição para fora do endereço do protótipo foi anotada; a do Google Tag Manager recebeu 404 do próprio teste, e nada foi ao Google de verdade (a rede do ambiente não abre o Google, e o pedido não manda liberar); qualquer outra seria abortada. Os envios ao garçom seguiram de verdade.
  - Sem escolha: a landing e o quiz abrem (200), o quiz na abertura; o aviso aparece no topo e não cobre nenhum dos três "Fazer a Análise" (cabeçalho da landing, cabeçalho do quiz e abertura); no celular, a barra fixa do rodapé do quiz aparece e o aviso não a cobre; nada fica guardado e nada vai para fora.
  - "Recusar" na landing: o aviso some; fica guardado "recusado"; o quiz abre sem o aviso, com o endereço como estava; nada vai para fora, na landing e no quiz.
  - "Aceitar" na landing: nada para fora antes do clique; depois, o aviso some e fica guardado "aceito"; a primeira requisição para fora é exatamente https://www.googletagmanager.com/gtm.js?id=GTM-T6L4QTB8, comparada com o código escrito neste pedido, e nenhuma vai para fora do Google; pagina_limpa e origem_limpa sem o id_sessao; o quiz abre sem o aviso e pede o gtm.js direto; no quiz, o id_sessao sai do endereço e as utm ficam; o início do quiz leva o id_sessao que veio da landing, mesmo com o endereço limpo.
  - Sem rollback: a página e o quiz abriram.
- **O que a conferência gravou no banco**, sem pessoa: 19 eventos, 10 visitas (201) e 9 inícios do quiz (201), entre 16h17 e 16h19 de 12/11/2026; alguns com o id_sessao "sessao-conferencia-17", posto no endereço pelo teste, e os outros com o código que a landing criou. Nenhum fim do quiz, nenhum clique, nenhum contato.
- **Diagnóstico, anterior a este pedido:** no celular (375), o "Fazer a Análise" do cabeçalho da landing-page-02 não leva ao quiz; a página fica em /. Vem desde a publicação da landing-page-02 (e344fcdd, 10h14). O botão grande da página leva ao quiz no celular. Nada foi mudado (pergunta 17.3.1).
- **O Google Analytics:** Pelo pedido 17, o Google Analytics ainda não foi ligado no Tag Manager e o contêiner não foi publicado; o Claude não entra no Tag Manager e a conferência não chegou ao Google (o 404 do gtm.js veio do próprio teste), então isso não foi conferido. Enquanto o contêiner não for publicado, o Google responde 404 ao gtm.js, o que é esperado (pergunta 17.3.2).
- **Registros:** entregas/prototipo-funil-01/README.md v9 para v10 (forma: frase do topo, linha nova em "Publicações" e a conferência no ar); conexoes.md (linha da Cloudflare: a versão a82e93cc no ar, com o aviso e o Tag Manager, e o token em uso também nesta publicação); index.md (protótipo v10, a publicação de 16h16 e a medição; a visita gravada desde o catálogo v3; o botão do cabeçalho da landing no celular; esta resposta); log.md (entrada da 17.3 e duas Pendências); esta resposta. Cascata: o README do ensaio, o LIGAR.md e o APLICAR-11.md, que dependem do protótipo, já estavam marcados; nada muda neles.

**Como saber que deu certo** (o critério do pedido), conferido no ar: sem clicar no aviso, a página não fala com ninguém de fora; depois do "Aceitar", ela pede o gtm.js do GTM-T6L4QTB8 e nada fora do Google; o aviso não volta no quiz; nenhum botão fica coberto no celular.

Nada em fontes/; nada no programa empacotado nem no texto da landing e do quiz; nenhum SQL no Supabase; ninguém entrou no Tag Manager, no Analytics nem no Search Console; o noindex continua; nenhum dado de pessoa. O ESTADO.md não existe e não foi criado (é do pedido 14).

## O texto do aviso, como aparece na página

No topo de / e de /quiz/, enquanto não há escolha guardada:

> **Cookies e medição**
>
> A gente quer medir como este site é usado, com o Google Analytics, do Google. Ele usa cookies e só entra se você aceitar. Se você recusar, nada muda na página. Dá para mudar a escolha depois, no link Cookies, no fim da página.
>
> Como a gente cuida dos seus dados: política de privacidade [a definir: link da politica de privacidade].
>
> Botões: **Aceitar** · **Recusar**

No fim das duas páginas, sempre, o link discreto que reabre o aviso: **Cookies**

Os dois botões têm o mesmo tamanho, a mesma cor e a mesma borda; só o rótulo muda. O "[a definir: ...]" aparece assim até a política ter endereço (pergunta 17.2.6). O texto mora em entregas/documentos/aviso-de-cookies.md (v1, rascunho, otavio: pendente), no bloco `aviso`; para mudar, muda-se lá, o documento sobe de versão, a montagem lê o novo e o site é publicado de novo.

## O que fica guardado no navegador, e com que nome

- **Antes da escolha:** nada.
- **Depois da escolha:** só a escolha, no armazenamento local do navegador (localStorage), com o nome **safra_cookies_v1** e o valor **"aceito"** ou **"recusado"**. A mesma escolha vale para a landing e para o quiz, que estão no mesmo endereço. A nossa página não grava cookie.
- **Com o aceite:** o Google Analytics, quando estiver ligado no Tag Manager, grava os cookies dele: **_ga** e **_ga_ seguido de um código** (política v3, item 7). Pelo pedido 17, o Analytics ainda não foi ligado e o contêiner não foi publicado (não conferido: o Claude não entra no Tag Manager).
- **Ao trocar de "aceito" para "recusado"** pelo link "Cookies": fica guardado "recusado", a análise volta a ser negada e os cookies que começam por _ga são apagados (pergunta 17.2.2).
- Se o navegador não deixar guardar (alguns modos privados), a página só não lembra a escolha. O código da visita (id_sessao) não é guardado no armazenamento do navegador nem em cookie: vai no endereço, da landing para o quiz, e fica na memória da aba; com o aceite, sai do endereço.

## Numeração das decisões

A #116 ficou com a medição com o Google (base/decisoes.md v6). O pedido 13 (prompts/13-correcoes-e-decisoes-restantes.md) diz "a partir da #116": **passa a começar no próximo número livre, hoje a #117.** O pedido 13 não foi mudado.

## O que falta, e é do Otávio

1. Ler o texto do aviso, acima, e aprovar ou ajustar (pergunta 17.1.8).
2. Decidir a correção do botão do cabeçalho da landing no celular (pergunta 17.3.1).
3. Ligar o Google Analytics no Tag Manager, com o mentor, pela Pendência "Medição com o Google (#116)" (pergunta 17.3.2).
4. Apagar e revogar o token até 16/11/2026 (lembrete no fim).

## Perguntas para o Otávio

### Da 17.1

**17.1.1 · A 10.7 também cai em parte.**
- Dúvida: a #114 aceitou a 10.7 ("nenhuma ferramenta de terceiros que colha dado do visitante"), e o Google Analytics depois do "Aceitar" contraria essa frase; o pedido manda registrar a substituição só na 6.2.
- O que foi feito: a #116 e a remissão na #114 citam só a 6.2; provas-e-conformidade e o design-system, que repetem a 10.7, ficaram marcados pela cascata.
- Recomendação: na próxima versão das decisões, a #114 ganha também "#116 (10.7, em parte: o Google Analytics só depois do Aceitar)", e a atualização de provas-e-conformidade e do design-system diz o mesmo.
- Se decidir diferente: com a 10.7 inteira, o Google Analytics não pode entrar, e a medição, no ar desde a 17.3, teria de sair.

**17.1.2 · A política ainda declara quiz-01-pagina 2.**
- Dúvida: a correção 34.16 (Pendências) manda, na próxima versão da política, tirar a frase sobre a página do quiz de antes e declarar quiz-01-pagina 3; a página já está na v4.
- O que foi feito: nada, porque a 17.1 pedia mexer fora do item 7 só no que ficasse falso; conferido que a v4 tem a caixa única, as fontes servidas junto, "Compartilhar", "Baixar PDF" e o botão de WhatsApp, e não guarda nada no navegador.
- Recomendação: na atualização que tirar a marca, aplicar a 34.16 já com quiz-01-pagina 4 e declarar também a landing-page-02, que é a página de apresentação no protótipo.
- Se decidir diferente: aplicar agora, numa v4 da política, como forma.

**17.1.3 · O que mais o Google Analytics coleta.**
- Dúvida: a política descreve só o que a documentação citada chama de coletado automaticamente; a medição aprimorada do fluxo da web (que, pelo que se sabe e sem conferência na página do Google, vem ligada por padrão num fluxo novo) e o compartilhamento de dados da conta não estão descritos.
- O que foi feito: nada inventado; a nota da equipe da política e as Pendências pedem a conferência antes de ligar.
- Recomendação: o Otávio confere com o mentor na hora de ligar o Analytics (17.3.2), e a política muda antes se houver diferença.
- Se decidir diferente: a política ganha a lista completa agora, a partir do painel.

**17.1.4 · O nome do cookie _ga_.**
- Dúvida: a documentação do Google chama o segundo cookie de _ga_<container-id>, e quem lê pode achar que é o código do Tag Manager.
- O que foi feito: a política diz "_ga_ seguido de um código", sem dizer qual código.
- Recomendação: depois de ligar o Analytics, conferir no navegador o nome real do cookie e escrever na política o que aparece.
- Se decidir diferente: fica como está.

**17.1.5 · O id_sessao no endereço do quiz.**
- Dúvida: o quiz troca o endereço a cada tela (#abertura, #nome e assim por diante) mantendo o ?id_sessao=; se a medição aprimorada contar cada troca como página vista, cada tela iria ao Google com o código, e a pagina_limpa só ajuda se a tag a usar em todos os eventos. A página de origem também pode levar o código.
- O que foi feito: além da pagina_limpa e da origem_limpa, a montagem tira o id_sessao do endereço depois do "Aceitar" e antes de carregar o Tag Manager (17.1.10). Conferido no ar na 17.3: no quiz, o id_sessao sai do endereço e as utm ficam.
- Recomendação: manter, e mesmo assim configurar a tag com a pagina_limpa (Pendências; 17.3.2).
- Se decidir diferente: sem tirar do endereço, a promessa da política depende só da configuração da tag.

**17.1.6 · A medição própria continua com "Recusar".**
- Dúvida: o pedido diz que recusar não muda nada na página; a visita, o início do quiz e o clique continuam indo ao garçom, sem cookie.
- O que foi feito: a política diz isso no item 7 ("não depende da sua escolha no aviso").
- Recomendação: manter, porque é o que já valia (6.2) e não usa cookie.
- Se decidir diferente: o "Recusar" também para esses envios, o que muda a montagem e os testes.

**17.1.7 · O link "Cookies" no quiz.**
- Dúvida: a 17.2 podia deixar o link só na landing, se no quiz não houvesse lugar bom; o aviso e a política dizem "no fim da página".
- O que foi feito: o texto segue o pedido. Na 17.2, o link ficou nas duas páginas, no fim, então o aviso e a política continuam certos.
- Recomendação: se um dia o link ficar só na landing, o aviso e a política sobem de versão dizendo onde ele fica.
- Se decidir diferente: nada muda.

**17.1.8 · O texto do aviso.**
- Dúvida: o texto é do Claude (entregas/documentos/aviso-de-cookies.md) e diz "este site" para cobrir a landing e o quiz.
- O que foi feito: rascunho, otavio: pendente. Na 17.3, foi ao ar assim, pela autorização de publicar deste pedido; o texto inteiro está acima.
- Recomendação: o Otávio ajusta o texto e aprova. A recomendação da 17.1 era antes da publicação; agora, o quanto antes.
- Se decidir diferente: o texto muda no bloco `aviso`, o documento sobe de versão, a montagem lê o novo e o site é publicado de novo.

**17.1.9 · Escolhas técnicas da medição.**
- Dúvida: o pedido não fixa o nome do que fica no navegador, onde fica o aviso, como reabrir nem o que fazer ao trocar de aceito para recusado.
- O que foi feito: o Claude escolheu, ao preparar a 17.2, e a política e o aviso já dizem: localStorage com o nome safra_cookies_v1 e o valor aceito ou recusado; o aviso no topo da página, em fluxo normal, que não cobre nada; o link "Cookies" no fim da página; ao trocar para recusar, o consentimento de análise negado e os cookies _ga apagados.
- Recomendação: manter.
- Se decidir diferente: mudam a montagem, a política e o aviso, que sobem de versão.

**17.1.10 · Tirar o id_sessao do endereço.**
- Dúvida: o pedido manda pôr a pagina_limpa na camada de dados; não manda mexer no endereço.
- O que foi feito: para a promessa da política não depender da configuração da tag, depois do "Aceitar" a montagem troca o endereço da barra pelo mesmo endereço sem o id_sessao, antes de carregar o Tag Manager; o quiz já leu o código e o guarda na memória da aba. Custo: quem aceitou e recarrega o quiz ganha uma sessão nova (a visita e o começo antigo ficam na sessão de antes). Quem recusa não é afetado. Conferido no ar na 17.3: o início do quiz leva o id_sessao da landing, mesmo com o endereço limpo.
- Recomendação: manter.
- Se decidir diferente: a montagem deixa o endereço como está, e a configuração da tag vira a única garantia.

### Da 17.2

**17.2.1 · Duas conferências de hoje mudaram de ponto de partida por causa do aviso no topo.**
- Dúvida: o aviso fica em fluxo normal no topo (o único desenho que nunca cobre os botões) e, até a pessoa escolher, empurra a abertura do quiz para baixo. Por isso, duas conferências da abertura mudaram de ponto de partida, sem mudar o que provam: "só o relatório se mexe" (1440) passou a medir a partir do aviso rolado para fora, porque, medida com a página no alto, falharia por 128 pixels (nos primeiros 128 pixels de rolagem, o título, a promessa e o botão sobem junto com o aviso); e "sem a barra do rodapé antes de rolar" virou a regra da página: a barra aparece se, e só se, o botão da abertura está fora da tela ou sob o cabeçalho. Em 375 por 812, o botão fica só em parte à vista (32 dos 66 pixels) e a barra não aparece; em 360 por 640, o botão fica abaixo da dobra e a barra aparece logo ao abrir.
- O que foi feito: as duas mudanças; a forma original de "só o relatório se mexe", de scroll 0 até o fim, roda com "recusado" guardado e passa, o que prova que, depois da escolha, a abertura é exatamente a de antes; o aviso ficou mais compacto no celular (231 pixels em 375).
- Recomendação: manter.
- Se decidir diferente: as alternativas são um aviso fixo sobre a página, que cobriria botões (a política e o aviso descartam), ou um texto mais curto, num aviso-de-cookies v2, que diminui o empurrão sem tirá-lo.

**17.2.2 · Os cookies _ga no domínio de cima.**
- Dúvida: a escolha fixada manda apagar os cookies _ga sem domínio e com o domínio do endereço; o Google Analytics grava os cookies no domínio mais alto que consegue (no protótipo, sistemadevendassafra.workers.dev; em gotriad.com.br, o próprio), e só com esses dois a troca para "Recusar" não apagaria os cookies dele no endereço do protótipo, contra o que a política promete.
- O que foi feito: apaga também com cada domínio acima do endereço (o navegador ignora os que não pode, como com.br); só nomes começando por _ga; conferido no teste que um cookie que não é _ga fica.
- Recomendação: manter.
- Se decidir diferente: volta a apagar só sem domínio e com o domínio do endereço, e a política precisa dizer que alguns cookies podem ficar até vencerem.

**17.2.3 · O link "Cookies" é um botão.**
- Dúvida: o pedido fala em link; um `<a href="#...">` mudaria o # do endereço, que o quiz usa para saber a tela.
- O que foi feito: um `<button type="button">` com cara de link discreto (sublinhado, numa pílula escura que se lê no fundo claro e no escuro), com o texto da chave reabrir; o aviso e a política, que dizem "link Cookies, no fim da página", continuam certos para quem lê.
- Recomendação: manter.
- Se decidir diferente: vira um `<a>` que não mexe no endereço, sem mudar o texto.

**17.2.4 · A pagina_limpa é calculada uma vez.**
- Dúvida: o quiz troca o # a cada tela, e a pagina_limpa (sem #) vai uma vez, no "Aceitar" ou ao abrir com "aceito"; se o Analytics contar páginas vistas pelas mudanças do histórico, cada tela iria com o mesmo endereço limpo.
- O que foi feito: nada além do pedido; o endereço da barra já sai sem o id_sessao, então o que o Analytics ler sozinho também sai sem ele.
- Recomendação: decidir na configuração da tag, com o mentor (Pendências: "Medição com o Google (#116)"; 17.3.2).
- Se decidir diferente: a montagem passa a pôr a pagina_limpa de novo a cada troca de tela, numa versão nova do protótipo.

**17.2.5 · O "Fazer a Análise" do topo da landing no celular.**
- Dúvida, fora do pedido: no celular, o programa da landing-page-02 desenha o botão do cabeçalho como um bloco, sem `<button>`, e o programa do fim da landing só leva ao quiz quem clica num `<button>`; o ensaio de antes só usava esse botão em 1440.
- O que foi feito: nada na landing (o programa empacotado é proibido); o ensaio confere que o aviso não cobre esse bloco e, no celular, vai ao quiz pelo botão grande. Por isso também, no celular, o primeiro botão da landing depois do aviso, para onde o foco vai depois da escolha pelo teclado, é um botão sem rótulo, a mais de 5 mil pixels do topo.
- Recomendação: conferir no celular de verdade, na 17.3, se esse botão leva ao quiz; se não levar, é pendência da landing-page-02.
- Se decidir diferente: nada muda nesta parte.
- Depois da 17.3: conferido no ar num navegador sem tela em 375 pixels (não num celular de verdade): não leva. A causa está no código (o programa do fim da landing só pega `<button>`), então no celular de verdade deve dar o mesmo. Segue na 17.3.1 e nas Pendências.

**17.2.6 · "[a definir: link da politica de privacidade]".**
- Dúvida: o marcador do aviso-de-cookies v1 está sem acento em "politica", e o quiz mostra "política" no mesmo lugar.
- O que foi feito: a página mostra o texto do documento como ele está.
- Recomendação: corrigir na próxima versão do aviso, junto com o link.
- Se decidir diferente: nada muda.

**17.2.7 · A primeira troca de pergunta desalinhada para quem ignora o aviso.**
- Dúvida: quem não escolhe e começa a conversa no quiz pega a primeira troca de pergunta desalinhada: a função alinhar() do quiz mede o cabeçalho com o aviso ainda na tela, e a pergunta nasce mais baixo do que devia (225 pixels em 375 por 812, 36 em 360 por 640 e 129 em 1440, medidos na revisão); da troca seguinte em diante, tudo volta ao normal.
- O que foi feito: nada no quiz, que não muda neste pedido.
- Recomendação: numa versão nova do aviso, o aviso sai do caminho quando a conversa começa, sem guardar nada e sem carregar nada, e o link "Cookies" continua.
- Se decidir diferente: fica como está.

**17.2.8 · O código do contêiner só tem o formato conferido.**
- Dúvida: a montagem confere só o formato do código do contêiner em medicao.json (GTM- seguido de letras e números); um código trocado, no formato certo, passaria pela montagem e pelos testes, que comparam o pedido com o código que o próprio módulo lê.
- O que foi feito: o código mora num lugar só (medicao.json), com o valor do pedido (GTM-T6L4QTB8).
- Recomendação: na conferência no ar da 17.3, comparar o pedido ao gtm.js com o código escrito no pedido 17.
- Se decidir diferente: a montagem passa a comparar com o código do pedido, e trocar de contêiner passa a exigir mudança em dois lugares.
- Depois da 17.3: feito; a primeira requisição para fora foi exatamente o gtm.js com id=GTM-T6L4QTB8, o código do pedido.

**17.2.9 · O foco depois de escolher pelo mouse.**
- Dúvida: a revisão pediu que, com o foco dentro do aviso, o foco fosse ao primeiro elemento focável depois do aviso (no quiz, o "Pular para o conteúdo"); no Chrome, o clique do mouse e o toque também põem o foco no botão, e o "Pular para o conteúdo" aparece na tela quando recebe o foco.
- O que foi feito: pelo teclado (Enter ou espaço), o foco vai ao primeiro elemento focável depois do aviso (no quiz, o "Pular para o conteúdo"; na landing, o primeiro botão ou link desenhado); pelo mouse ou pelo toque, ao primeiro que está à vista (no quiz, o "Fazer a Análise" do cabeçalho), sem anel de foco; nunca ao body e sem rolar a página. O teste do quiz confere os dois caminhos, e o ensaio, o do teclado na landing.
- Recomendação: manter.
- Se decidir diferente: o mouse e o toque também levam ao "Pular para o conteúdo", que passa a aparecer no canto da tela de quem clicou até a pessoa clicar em outro lugar.

### Da 17.3

**17.3.1 · O "Fazer a Análise" do cabeçalho da landing no celular.**
- Dúvida: no celular (375), o botão do cabeçalho da landing-page-02 não leva ao quiz, desde a e344fcdd; o programa do fim da landing (no index.html, que é do sistema) só reconhece o clique num `<button>`, e no celular o programa da landing desenha esse botão como bloco. As conferências da e344fcdd e da fd6ba97b registram que os dois botões levam ao quiz; no celular, isso vale só para o botão grande.
- O que foi feito: nada na landing: a correção é no programa do fim do index.html da landing-page-02, outra entrega, fora deste pedido (ela não precisa mexer em assets/ nem no texto, que o pedido proíbe); virou pendência da landing-page-02 (log.md, Pendências). O README do protótipo anota, na conferência da a82e93cc, o que vale no celular.
- Recomendação: numa landing-page-02 v2, o programa do fim do index.html passa a levar ao quiz também o clique no bloco do cabeçalho com o texto "Fazer a Análise", sem mexer em assets/ nem no texto, com conferência no ensaio em 375 e 360.
- Se decidir diferente: no celular, só o botão grande da página leva ao quiz, e o do cabeçalho continua sem efeito.

**17.3.2 · O que fazer antes de ligar o Analytics.**
- Dúvida: o Analytics ainda não está ligado no Tag Manager, e ligar é do Otávio, com o mentor; o que vai ao Google depende de como a tag for configurada.
- O que foi feito: nada no Tag Manager nem no Analytics (contas do Otávio); a Pendência "Medição com o Google (#116)" continua aberta, com a lista do que conferir.
- Recomendação: na hora de ligar, seguir a Pendência: a tag com a pagina_limpa como endereço da página (page_location) e a origem_limpa como página de origem (page_referrer), em todos os eventos; conferir a medição aprimorada (as páginas vistas por mudança do histórico contariam cada tela do quiz com a mesma pagina_limpa, 17.2.4), os eventos ligados além dos automáticos, o compartilhamento de dados da conta e o nome real do cookie _ga_ (17.1.3 e 17.1.4); qualquer diferença muda a política (v3, item 7) antes de publicar o contêiner; depois de publicar, conferir no ar que o gtm.js deixa de voltar 404 e que nenhum pedido ao Google leva o id_sessao. Essa conferência precisa do Google de verdade: num navegador comum, ou pelo Claude, se o Otávio liberar o Google na rede do ambiente, o que este pedido não fez.
- Se decidir diferente: ligar sem essa conferência pode deixar a política dizendo menos do que o Google Analytics coleta, e ela precisaria de uma versão nova depois.

## Como cada parte foi feita

Em cada parte, um subagente escreveu e outro, que não viu a escrita, revisou contra o pedido e o repositório; as correções das três revisões entraram antes de cada commit (log.md, linha "Revisão independente" de cada entrada).

## Commits que subiram (regra 7)

- d4f7b4d · 17 · pedido da medição com o Google (Tag Manager, aviso de cookies e política) (já na main antes da 17.1)
- 297df9c · 17.1 · medição com o Google: decisão #116, política v3 e aviso de cookies
- e3390e1 · 17.2 · aviso de cookies e Tag Manager na montagem, com testes
- 17.3 · publicação da medição e resposta do pedido 17 (o hash sai no commit e aparece no histórico do Git)

## Lembrete do token

Até 16/11/2026, na última publicação da semana: apagar a variável CLOUDFLARE_API_TOKEN nas configurações do ambiente da nuvem sistema-de-vendas-safra.

E revogar o token no painel da Cloudflare (My Profile, API Tokens); as duas coisas, porque apagar só a variável deixa o token valendo.
