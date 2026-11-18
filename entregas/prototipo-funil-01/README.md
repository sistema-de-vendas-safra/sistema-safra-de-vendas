---
id: prototipo-funil-01
versao: 19
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: garcom
    versao: 5
  - id: quiz-01-pagina
    versao: 11
  - id: landing-page-02
    versao: 5
  - id: banco-rascunho
    versao: 4
  - id: decisoes
    versao: 12
  - id: regra-seguranca
    versao: 3
  - id: lacunas
    versao: 7
  - id: aviso-de-cookies
    versao: 4
  - id: politica-de-privacidade
    versao: 7
desatualizado: true
---

# Protótipo do funil-01 · site de teste

**Versão 19 (18/11/2026, #122; no branch claude/rastreamento-meta, nada publicado).** medicao.mjs: ao trocar de "Aceitar" para "Recusar", além do Google, se window.fbq existir, a página chama fbq('consent', 'revoke') e apaga os cookies _fbp e _fbc do domínio do endereço (e dos de cima dele) e de .gotriad.com.br. O Pixel da Meta entra só pelo Google Tag Manager, que continua carregando só depois do "Aceitar"; o id_sessao continua saindo do endereço antes do Tag Manager carregar. montar-site.mjs: confere também que nada no site carrega o Pixel (connect.facebook.net, fbevents.js, facebook.com/tr, fbq('init') ou fbq('track')); fora do bloco da medição, nenhum fbq; dentro, só fbq('consent', 'revoke'). O site montado leva a política v7, o aviso de cookies v4 e o quiz v11. Publicação: APLICAR-22.md v2, o roteiro único das Etapas 2 e 3.

O site de teste do funil-01 num Worker só da Cloudflare, o safra-prototipo-funil-01 (decisão #101): a landing-page-02, o quiz-01 e o garçom no mesmo endereço, https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev. **Publicado pela primeira vez em 09/11/2026** (Current Version ID 7c6024d7-ff13-4ab8-b9f7-1a58213c0909), só com leads de teste. Nessa publicação o quiz saiu com os acentos quebrados; a correção é a v3 (pedido 09). A v4 (etapa 34) monta as páginas novas (quiz v3, landings v3) com as fontes servidas junto; nada disso foi publicado. A v5 (etapa 35) só aponta para o APLICAR-11.md. A v6 (12/11/2026, pedido do Otávio) põe a landing-page-02, a página de vendas, em / no lugar das duas variantes da landing-page-01, e tira o /b/ do site; as variantes continuam no repositório. A v7 e a v8 só registram as publicações de 12/11/2026 das 10h14 e das 11h40 (seção "Publicações"). A v9 (pedido 17, parte 17.2; decisão #116) acrescenta nos HTML montados o aviso de cookies e o Google Tag Manager (GTM-T6L4QTB8), que só carrega depois do "Aceitar" (seção "Medição"). **No ar desde 13/11/2026, 9h20** (Current Version ID 31e6f08c-025d-4885-8601-63b145b7ffc5), com a v11 desta pasta: a página da política em /politica-de-privacidade/, o quiz-01 v5 (os nomes da Análise e da agência e os links da política), a landing-page-02 v2 (sem as perguntas 6 e 7 do FAQ) e o aviso-de-cookies v2; a v12 só registra essa publicação. Antes, desde 12/11/2026, 16h16 (a82e93cc), com a v9 desta pasta: a landing-page-02 em /, o quiz-01 abrindo na abertura (quiz-01-pagina v4) e a medição nas duas páginas; a v10 só registra essa publicação (pedido 17, parte 17.3). A v11 (13/11/2026, #117) monta a página da política de privacidade em /politica-de-privacidade/ (pagina-politica.mjs), com o quiz-01 v5 (os nomes da Análise e da agência e os links da política), a landing-page-02 v2 (sem as perguntas 6 e 7 do FAQ) e o aviso-de-cookies v2 (com o link da política). A v12 só registra a publicação da v11 (13/11/2026, 9h20). A v13 só registra a publicação de 13/11/2026, 16h35, que levou ao ar a landing-page-02 v4 (pedidos 18 e 20; #118 e #119), e acerta o depende_de (landing-page-02 4 e decisoes 9). **A v14 (14/11/2026; pedido 21, parte 21.2; decisão #120) prepara, sem publicar, o endereço novo, https://svsafra.gotriad.com.br, e o quiz em /analise/ no lugar de /quiz/:** a montagem põe o quiz em analise/, a landing-page-02 v5 leva a /analise/, o garçom v5 leva o endereço antigo e o /quiz ao novo, e o wrangler.toml ganha o Custom Domain, com o endereço do workers.dev ainda ligado (seções "Mapa de rotas" e "O endereço novo"). **No ar desde 15/11/2026, 10h07** (Current Version ID 437989f3-2d9f-407b-9a83-846b5c515402), pelo roteiro APLICAR-21.md desta pasta: o endereço novo, https://svsafra.gotriad.com.br, com o quiz em /analise/; o endereço antigo leva ao novo, no mesmo caminho. Até então ficou no ar o endereço antigo, com o quiz em /quiz/, na versão 70f8766c. A v15 (14/11/2026; pedido 21, parte 21.3; correção de forma) só põe o roteiro APLICAR-21.md na lista desta pasta e acerta a frase sobre o ensaio geral, que na v10 confere o caminho /analise/ e os dois endereços; nada do programa mudou, e nada foi publicado. A v16 só registra a publicação de 15/11/2026, 10h07, e acerta o depende_de (quiz-01-pagina 8). Esta pasta tem a configuração do Worker, o script que monta o site a partir das entregas, os prints do site montado e o roteiro para ligar.

**Para ligar:** LIGAR.md, nesta pasta, é o passo a passo do Otávio para o dia de ligar o protótipo (push, Supabase, Cloudflare, planilha, teste com leads de mentira, o que fazer se der errado e como desligar).

**Para aplicar as mudanças de 09/11 no protótipo que já está no ar:** APLICAR-11.md, nesta pasta (push, migração, catálogo, conferência, planilha com 20 colunas, publicar, apagar a chave secreta "default" e um teste rápido com pessoas de mentira novas).

**Protótipo de teste não é entrega.** Serve só para o Otávio testar o caminho do dado com leads de mentira (#102: nome começando por TESTE, e-mail @teste.invalid). Ir ao ar com gente de verdade continua travado: o destino dos contatos está em conflito (conflito-17, em base/lacunas.md; o garçom segue o lado 2, #90, sem escolher), as páginas e o garçom são rascunhos pendentes de aprovação (do Otávio e, nas páginas, do Júnior e do Euclides) e, antes de tráfego real, falta a proteção contra robô e o limite de pedidos (log.md, Pendências).

**Status.** Rascunho, pendente do Otávio. Nasce desatualizado, porque se apoia em documentos marcados (garcom, quiz-01-pagina, landing-page-02, banco-rascunho, lacunas e, desde a v9, aviso-de-cookies e politica-de-privacidade; regra provisória 11.1).

## Publicações

| Quando | Current Version ID | O que foi ao ar | Quem e como |
|---|---|---|---|
| 09/11/2026 | 7c6024d7-ff13-4ab8-b9f7-1a58213c0909 | Primeira publicação, pelo LIGAR.md (quiz com os acentos quebrados, corrigidos no pedido 09) | Otávio, com o wrangler logado no Mac |
| 09/11/2026, 19h16 | c4235168-4d3c-46b5-b721-8be77fdd3cb3 | APLICAR-11 v1, parte 4: as páginas da etapa 34 (quiz-01 v3 e as variantes da landing-page-01) e o garçom v4 (prompts/14-estado-para-o-mentor.md) | Otávio, com o wrangler logado no Mac |
| 12/11/2026, 10h14 | e344fcdd-d17f-47e6-9353-59e5579d86e3 | Esta pasta na v6: landing-page-02 em /, quiz-01 em /quiz/, garçom v4; main no 19e2a84 | Claude Code online, pelo passo 4.3 do APLICAR-11 (wrangler 4.158.0, WRANGLER_SEND_METRICS=false), com o token de API da Cloudflare nas variáveis do ambiente da nuvem, temporário até 16/11/2026. Nenhum valor de chave em arquivo |
| 12/11/2026, 11h40 | fd6ba97b-6a53-4a3b-83b9-b69694594210 | A mesma pasta, com o quiz-01 v4: a capa fora do funil e a abertura com o cabeçalho e o botão "Fazer a Análise" da landing-page-02; main no 8a6abe0 | Claude Code online, do mesmo jeito da de cima |
| 12/11/2026, 16h16 | a82e93cc-82cd-45c5-b2fa-c78d557cef32 | Esta pasta na v9: o mesmo da de cima, mais a medição nos dois HTML montados (o aviso de cookies com o texto do aviso-de-cookies v1 e o Google Tag Manager GTM-T6L4QTB8, que só carrega depois do "Aceitar"; seção "Medição"; #116; pedido 17); main no e3390e1 | Claude Code online, do mesmo jeito das duas de cima. Montagem "Tudo certo"; deploy com 382 arquivos lidos pelo wrangler e 2 enviados (os dois HTML; dos 334 do site, 332 já estavam lá), Worker de 18,10 KiB, as mesmas três ligações |
| 13/11/2026, 9h20 | 31e6f08c-025d-4885-8601-63b145b7ffc5 | Esta pasta na v11: a página da política de privacidade em /politica-de-privacidade/ (pagina-politica.mjs), o quiz-01 v5, a landing-page-02 v2 e o aviso-de-cookies v2 (#117); main no bc15909 | Claude Code online, do mesmo jeito das de cima. Montagem "Tudo certo"; deploy com 384 arquivos lidos pelo wrangler e 4 enviados (as duas páginas, o programa da landing e a página da política; dos 335 do site, 331 já estavam lá), Worker de 18,10 KiB, as mesmas três ligações |
| 13/11/2026, 16h35 | 70f8766c-166d-4930-8db3-cd74a1ae4d53 | Esta pasta com a landing-page-02 v4 (pedidos 18 e 20; #118 e #119): a seção "Como funciona" no calendário do Júnior, o carrossel com 9 cartões, sem o GSAAS, a demonstração do produto sem os agentes de IA, o FAQ e os rótulos novos, e as 10 chamadas de cada largura levando ao quiz; o quiz-01 v5, a página da política e o garçom v4 como estavam; main no cd3fcc7 | Claude Code online, do mesmo jeito das de cima, a pedido do Otávio ("pode publicar."). Montagem "Tudo certo"; deploy com 384 arquivos lidos pelo wrangler e 2 enviados (a página e o programa da landing; dos 335 do site, 333 já estavam lá), Worker de 18,10 KiB, as mesmas três ligações |
| 15/11/2026, 10h07 | 437989f3-2d9f-407b-9a83-846b5c515402 | Esta pasta na v15, que liga o endereço novo: svsafra.gotriad.com.br como Custom Domain (já ligado pelo painel antes, pelo Passo 1 do APLICAR-21), o workers.dev levando a ele, o quiz em /analise/, o garçom v5, a landing-page-02 v5 e o quiz-01 v8 (sem o botão de exemplo e com a conversa gratuita com o Junior no lugar da oferta do plano); main no a2e5b57 | Claude Code online, pelo APLICAR-21, a pedido do Otávio ("pode publicar."). Antes: whoami na conta do Safra, a 70f8766c com 100% do tráfego e o endereço novo abrindo a página de vendas. Montagem "Tudo certo"; deploy com 2 arquivos enviados (333 já estavam lá), Worker de 19,27 KiB; a saída mostrou os dois endereços, o do workers.dev e "svsafra.gotriad.com.br (custom domain)" |
| 16/11/2026, 11h37 | 496f06ae-b31e-4373-b0f6-0b4d65ca8457 | Esta pasta na v16, com o quiz-01 v9: o fim de todos os relatórios saiu (o vídeo do Junior, os botões "Compartilhar" e "Baixar PDF" e o rodapé); main no 0c85760 | Claude Code online, do mesmo jeito da de cima (APLICAR-21, passo 2). Montagem "Tudo certo"; deploy com 1 arquivo enviado (a página do quiz) e 334 já no ar; Worker e Custom Domain sem erro. Conferido no ar: /analise/ na versão 9, sem nenhum texto do fim antigo e com a conversa gratuita; /, /politica-de-privacidade/ com 200; o endereço antigo levando a /analise/ do novo (302); no navegador, em 375, #relatorio, #relatorio-nao e #relatorio-saudavel sem o vídeo, os botões e o rodapé, cada um com a sua chamada. Versão anterior, para voltar atrás: 437989f3 |
| 18/11/2026, 16h03 | 4878406e-e4fd-4850-b81b-dae8ae6f26c6 | A política de privacidade v6 em /politica-de-privacidade/ (o item 7 com a medição otimizada e os dados de local e de aparelho do Google Analytics; o item 8 com o prazo do Google Analytics, pela ficha-de-fatos v6); o resto igual à de cima; main no c068eae (pull request #1) | Claude Code online, do mesmo jeito da de cima (APLICAR-21, passo 2), com o token de API da nuvem por uma última vez, autorizado pelo Otávio. Teste do garçom 360 de 360; montagem "Tudo certo"; deploy com 1 arquivo enviado (a página da política), 334 já no ar; Worker e Custom Domain sem erro. Conferido no ar: /, /analise/ e /politica-de-privacidade/ com 200, o aviso de não indexar, o Tag Manager e sem o script da Cloudflare; a política na versão 6, com os eventos novos e "até 14 meses"; o endereço antigo levando à política no novo (302). Versão anterior, para voltar atrás: 496f06ae |

**Conferido no ar em 12/11/2026, depois da e344fcdd** (navegador sem tela, em 1440 e em 375 pixels como celular, com os envios ao garçom bloqueados, salvo uma visita e um início do quiz):

- / abre a landing-page-02 (200, `text/html; charset=utf-8`, `X-Robots-Tag: noindex`) e cabe nos 375 pixels.
- Os dois botões, "Fazer a Análise" e "Faça uma Análise Estratégica do seu Sistema de Vendas", levam a /quiz/ com utm_source, utm_campaign e id_sessao.
- /quiz/ abre na capa, em UTF-8 e no modo padrão, com os acentos certos, e cabe nos 375 pixels.
- Nenhuma página pede arquivo a outro endereço, e nenhuma mostrou erro de programa.
- No garçom, o início do quiz (quiz-01, 2) foi gravado (201), mas a **visita da landing-page-02 foi recusada (422)**: o catálogo do banco ainda não tem a linha (landing-page-02, 1), porque em 09/11 entraram as três linhas da v2 do catalogo-prototipo.sql. O resto funciona. Para a visita ser gravada, falta rodar dados/banco/catalogo-prototipo.sql v3 no Supabase (APLICAR-11.md, 2.5 e 2.6). Não houve rollback: a página e o quiz abriram.
- O que a conferência gravou no banco: um início do quiz sem pessoa (utm_source bio, utm_campaign funil-01), por volta das 10h20 de 12/11/2026. Nenhum fim do quiz, nenhum contato.

**Conferido no ar em 12/11/2026, depois da fd6ba97b** (do mesmo jeito):

- / e os dois botões da landing-page-02 como acima: levam a /quiz/ com utm_source, utm_campaign e id_sessao.
- /quiz/ abre na abertura (tela 1 de 27), sem a capa, com o cabeçalho da landing-page-02 no lugar do do quiz e os dois botões "Fazer a Análise"; o do cabeçalho leva à primeira pergunta.
- Em 1440 pixels, ao rolar, só o relatório de exemplo se mexe (título, promessa e botão no mesmo lugar); em 375, o texto vem antes do relatório e, rolando, o botão aparece fixo no rodapé. As páginas cabem na largura.
- Nenhuma página pede arquivo a outro endereço, e nenhuma mostrou erro de programa.
- No garçom, o início do quiz foi gravado (201); a visita da landing-page-02 continua recusada (422), até o catálogo v3 rodar.
- O que a conferência gravou no banco: um início do quiz sem pessoa (utm_source bio, utm_campaign funil-01), por volta das 11h41 de 12/11/2026. Nenhum fim do quiz, nenhum contato.

**Conferido no ar em 12/11/2026, depois da a82e93cc** (pedido 17, parte 17.3; navegador sem tela, em 375 por 812, 360 por 640 e 1440 por 900 pixels): **56 de 56**. Toda requisição para fora do endereço do protótipo foi anotada; a do Google Tag Manager recebeu 404 do próprio teste, e nada foi ao Google de verdade (a rede do ambiente não abre o Google, e o pedido 17 não manda liberar); qualquer outra seria abortada. Os envios ao garçom seguiram de verdade.

- **Sem escolha:** / e /quiz/ abrem (200), o quiz na abertura. O aviso aparece no topo e não cobre o "Fazer a Análise" do cabeçalho da landing, nem o do cabeçalho do quiz, nem o da abertura; no celular, a barra fixa do rodapé do quiz aparece e o aviso não a cobre. Nada fica guardado no navegador, e nenhuma requisição vai para fora.
- **"Recusar" na landing:** o aviso some e fica guardado "recusado"; o quiz abre sem o aviso, com o endereço como estava; nenhuma requisição para fora, na landing e no quiz.
- **"Aceitar" na landing:** nada para fora antes do clique. Depois, o aviso some e fica guardado "aceito"; a primeira requisição para fora é exatamente https://www.googletagmanager.com/gtm.js?id=GTM-T6L4QTB8, comparada com o código escrito no pedido 17, e nenhuma vai para fora do Google; a pagina_limpa e a origem_limpa saem sem o id_sessao. O quiz abre sem o aviso e pede o gtm.js direto; no quiz, o id_sessao sai do endereço e as utm ficam; o início do quiz leva o id_sessao que veio da landing, mesmo com o endereço limpo.
- **No celular (375), o "Fazer a Análise" do cabeçalho da landing-page-02 não leva ao quiz:** a página fica em /. Não é da medição: vem desde a publicação da landing-page-02 (e344fcdd, 10h14). O programa do fim da landing (no index.html da landing-page-02) só leva ao quiz quem clica num `<button>`, e no celular esse botão do cabeçalho é desenhado como um bloco. O botão grande da página leva ao quiz no celular. Nada foi mudado (responde à pergunta 5 da 17.2, conferida num navegador sem tela em 375 pixels, não num celular de verdade; log.md, Pendências). As conferências da e344fcdd e da fd6ba97b, acima, dizem que os dois botões levam ao quiz; no celular, isso vale só para o botão grande.
- Pelo pedido 17, o Google Analytics ainda não foi ligado no Tag Manager e o contêiner não foi publicado; o Claude não entra no Tag Manager e a conferência não chegou ao Google (o 404 do gtm.js veio do próprio teste), então isso não foi conferido. Enquanto o contêiner não for publicado, o Google responde 404 ao gtm.js, o que é esperado (pedido 17).
- No garçom, a visita da landing-page-02 e o início do quiz foram gravados (201). Sem rollback: a página e o quiz abriram.
- O que a conferência gravou no banco, sem pessoa: 19 eventos, 10 visitas e 9 inícios do quiz, entre 16h17 e 16h19 de 12/11/2026; alguns com o id_sessao "sessao-conferencia-17", posto no endereço pelo teste, e os outros com o código que a landing criou. Nenhum fim do quiz, nenhum clique, nenhum contato.

**Conferido no ar em 13/11/2026, depois da 31e6f08c** (do mesmo jeito, mais as mudanças da #117): as **56 de 56** da a82e93cc de novo (sem escolha, "Recusar", "Aceitar", o gtm.js do GTM-T6L4QTB8 como único pedido para fora, o id_sessao fora do endereço, nada coberto) e **22 de 22** das mudanças, em 1440 e em 375:

- /politica-de-privacidade/ abre (200), com as 11 seções, só o texto para o lead (sem marcador e sem anotação da equipe), o prazo de guarda da ficha de fatos e o aviso de cookies; cabe na largura.
- O quiz tem "Análise Estratégica do Sistema de Vendas" no título da aba e na abertura e "Triad" no relatório; a "política de privacidade" do aviso e da abertura leva a /politica-de-privacidade/, numa aba nova; no quiz só sobra "[a definir: critério de qualificação]", nos relatórios.
- A landing no ar não tem as perguntas 6 e 7 do FAQ nem nenhum "a definir"; o link do aviso leva à política.
- Sem escolha no aviso, nada sai para fora do protótipo. Sem rollback.
- No celular, o "Fazer a Análise" do cabeçalho da landing continua sem levar ao quiz (Pendências).
- O que a conferência gravou no banco, sem pessoa: 19 eventos, 10 visitas e 9 inícios do quiz, entre 9h22 e 9h23 de 13/11/2026.

**Conferido no ar em 13/11/2026, depois da 70f8766c** (navegador sem tela): as **56 de 56** da a82e93cc e as **22 de 22** da 31e6f08c de novo, e **30 de 30** do que os pedidos 18 e 20 mudaram na landing-page-02, em 1440 por 900, 375 por 812 e 360 por 640, com o aviso de cookies já recusado e os envios ao garçom bloqueados:

- / abre (200), e o programa no ar é o do repositório (o mesmo SHA-256, cc58b5ed504179b548c2fef3cfd1ceafc8878260d2676d822d0107405fe4d060); "GSAAS" não está no programa.
- O carrossel tem 9 cartões, e o contador dá a volta até "09 / 09" e de volta ao "01 / 09"; nenhum chip cortado em nenhum cartão, nas três larguras.
- "Fase 1 · Ponto de partida" aparece na régua e no cartão 01, e "Encerramento · 3ª Sessão de Comando", no cartão 08; o FAQ tem 6 perguntas e as duas respostas do pedido 20.
- A demonstração do produto tem o menu com 5 itens, sem "Agentes de IA", e cada item abre a sua tela.
- "GSAAS", "Agentes de IA" e os textos antigos não aparecem em nenhuma das 17 leituras de texto à vista de cada largura (a página como abre, os estados do carrossel, o FAQ aberto e as telas da demonstração).
- **As 10 chamadas de cada largura levam a /quiz/** com as utm e o id_sessao, clicadas uma a uma (toque, no celular): 9 botões e 1 bloco em 1440; 7 botões e 3 blocos em 375 e em 360. No celular, o "Fazer a Análise" do cabeçalho passou a levar ao quiz, e também a chamada do topo e a do cartão da oferta (log.md, Pendências: item fechado).
- Nada sai para fora do protótipo, e nenhum erro de programa. Sem rollback: a página e o quiz abriram.
- Como está no repositório, o cartão da oferta mostra "O seu mês vira em [X] dias e [Y] horas." com [X] e [Y] à vista (prompts/20-gsaas-fora-da-landing-resposta.md, pergunta 20.3.4); já estava assim no ar.
- O que a conferência gravou no banco, sem pessoa: 20 eventos, 10 visitas e 10 inícios do quiz, todos 201, entre 16h35 e 16h37 de 13/11/2026.

**Conferido no ar em 15/11/2026, depois da 437989f3** (curl e navegador sem tela, em 1440 e 375, com o aviso de cookies já recusado):

- O endereço novo abre a landing, /analise/ e a política (200); /analise leva a /analise/ (307); /quiz/ leva a /analise/ com a consulta (302).
- O endereço antigo leva ao novo, no mesmo caminho e com a consulta (302): /, /quiz/ (virando /analise/) e a política. Um link antigo da landing e um do quiz abrem a página no endereço novo.
- O aviso de não indexar em todas as respostas do Worker, inclusive nos redirecionamentos.
- A porta pública, pelos dois endereços, aceita a origem nova (um pacote sem conteúdo válido dá 422, a regra do pacote) e recusa a antiga (403); a porta da planilha responde nos dois, sem redirecionar (401 sem a chave).
- Um lead de teste em cada largura (nome TESTE Publicacao Vinte e Um, e-mail terminado em @teste.invalid, respostas de faixa a): a chamada da landing leva direto a /analise/ com as utm e o id_sessao; o botão "protótipo · preencher exemplo" não existe; o fim do quiz gravado (201); a conversa gratuita com o Junior, sem a oferta antiga; o clique gravado (201; "Sim, eu quero" em 1440, "Agora não" em 375); o botão "Ver meu diagnóstico" abre o relatório sem o bloco de chamada; nenhum aviso de falha; nenhum erro de programa.
- **Achado: a Cloudflare injeta, nas páginas do endereço novo, o script do Web Analytics dela** (static.cloudflareinsights.com/beacon.min.js), pela configuração automática do domínio gotriad.com.br; ele carrega antes de qualquer escolha no aviso de cookies. Não está no programa do site e não aparecia no endereço antigo. Para desligar: no painel, Web Analytics, o site, Manage Site, Disable (documentação "Web Analytics · Get started", atualizada em 17/04/2026; log.md, Pendências).
- O que a conferência gravou no banco: dois leads de teste com o mesmo e-mail, com o fim do quiz, o clique, a visita e o início do quiz de cada um, por volta das 10h09 e 10h10 de 15/11/2026. Entram na limpeza dos dados de teste (#102).

## O que tem dentro

| Arquivo | O que é |
|---|---|
| LIGAR.md | O roteiro para ligar o protótipo, para iniciante, passo a passo, com o tempo de cada passo e como saber que deu certo (id prototipo-funil-01-ligar) |
| APLICAR-11.md | O roteiro para aplicar no protótipo que está no ar as mudanças das etapas 32 a 34, no mesmo padrão (id prototipo-funil-01-aplicar-11) |
| APLICAR-21.md | (v15) O roteiro para levar o funil ao endereço novo, https://svsafra.gotriad.com.br, com o quiz em /analise/ (decisão #120): ver o domínio ativo, ligar o endereço ao Worker, publicar e conferir no ar pelos dois endereços, como voltar atrás e o que trocar depois (a planilha do SDR, o Google Analytics e o Tag Manager, o Search Console). Desde 14/11/2026, é só por ele que se publica (id prototipo-funil-01-aplicar-21) |
| wrangler.toml | A configuração do Worker: nome, main apontando para ../garcom/garcom.mjs, arquivos pelo binding ASSETS com run_worker_first, preview_urls = false (sem links de prévia, #101), (v14) o Custom Domain svsafra.gotriad.com.br e workers_dev = true, as três variáveis comuns (SUPABASE_URL, ORIGEM_PERMITIDA e, na v14, ENDERECO_ANTIGO) e, só em comentário, o nome dos três segredos. Sem id de conta, sem id de zona e sem segredo |
| montar-site.mjs | Monta a pasta site/ a partir das entregas. Node, sem dependências próprias; as fontes vêm de nucleo/ferramentas/fontes/ (`npm install` lá dentro) |
| medicao.mjs | (v9) O bloco da medição que a montagem acrescenta em cada HTML: o consentimento padrão do Google com tudo negado, o aviso de cookies (texto de entregas/documentos/aviso-de-cookies.md) e o carregador do Google Tag Manager, que só roda depois do "Aceitar". Node, sem dependências. O teste do quiz usa o mesmo módulo |
| medicao.json | (v9) O lugar único do código do contêiner do Tag Manager (GTM-T6L4QTB8, que não é segredo) e do nome da chave em que o navegador guarda a escolha (safra_cookies_v1) |
| pagina-politica.mjs | (v11; #117) Monta a página da política de privacidade, /politica-de-privacidade/, a partir da seção "Texto para o lead" de entregas/documentos/politica-de-privacidade.md: os `{{a definir}}` aparecem como "[a definir: ...]", o marcador do conflito-17 não aparece, os fatos da ficha (o prazo de guarda) entram com o valor da ficha, e a seção "Para a equipe" e as "Fontes" ficam de fora. Recusa a política em rascunho. A montagem acrescenta o bloco da medição como nas outras páginas |
| prints/ | Prints das duas páginas montadas em 375 e 1440 pixels |
| site/ | A pasta montada. Fica fora do Git (.gitignore) e é refeita a cada montagem |

## Mapa de rotas

| Endereço | O que responde | De onde vem |
|---|---|---|
| / | Landing-page-02, a página de vendas (v6) | entregas/landings/landing-page-02/pagina/ (index.html, assets/ com o programa e o estilo, a/ com as imagens) |
| /analise/ | Quiz-01 (v14; #120; até a v13, em /quiz/). /analise, sem a barra, leva a /analise/ (307, do binding de assets) | entregas/quizzes/quiz-01/pagina/ (index.html, poster-junior.jpg) |
| /quiz, /quiz/ e /quiz/qualquer-coisa | (v14) 302 para /analise/, /analise/ e /analise/qualquer-coisa, com a consulta inteira | entregas/garcom/garcom.mjs |
| Qualquer página, pelo endereço antigo | (v14) 302 para o endereço novo, no mesmo caminho, com /quiz virando /analise e a consulta inteira. As rotas /api/ não são redirecionadas | entregas/garcom/garcom.mjs |
| /politica-de-privacidade/ | A política de privacidade (v11; #117), para onde vão os links do quiz e do aviso de cookies, numa aba nova | entregas/documentos/politica-de-privacidade.md, seção "Texto para o lead", por pagina-politica.mjs |
| /fontes/ e /analise/fontes/ | As fontes da landing-page-02 (Geist) e do quiz (Inter, Space Grotesk, Permanent Marker), com a licença de cada uma | nucleo/ferramentas/fontes/node_modules/ (pacotes @fontsource, lista em fontes.json) |
| POST /api/fim-quiz | Porta pública do garçom: o quiz manda o pacote do fim | entregas/garcom/garcom.mjs |
| POST /api/evento | Porta pública do garçom: a visita da landing, o início do quiz e o clique do fim, sem dado de pessoa (garçom v4) | entregas/garcom/garcom.mjs |
| GET /api/planilha/leads-novos | Porta privada do garçom: só a planilha do SDR, com a CHAVE_PLANILHA. (v14) Responde nos dois endereços | entregas/garcom/garcom.mjs |

As rotas /api/ são atendidas pelo garçom antes dos arquivos. Todo pedido passa pelo Worker (run_worker_first = true), e o garçom põe o cabeçalho X-Robots-Tag: noindex em toda resposta, inclusive nos arquivos, e o charset utf-8 em todo HTML, CSS e JavaScript que a Cloudflare entrega sem charset (garçom v3). Além do cabeçalho, todo HTML do site tem a meta robots noindex, nofollow e a meta charset utf-8 no começo e, desde a v9, o bloco da medição logo depois dela.

Os botões "Fazer a Análise" e "Faça uma Análise Estratégica do seu Sistema de Vendas" da landing-page-02 levam a /analise/ (v14; até a v13, a /quiz/) com as utm do endereço da landing (as que existirem: utm_source, utm_medium, utm_campaign, utm_content, utm_term) e o código de sessão da visita, no parâmetro id_sessao, no formato do banco (10.5). Exemplo para testar: /?utm_source=bio&utm_campaign=funil-01. O quiz só lê utm_source e utm_campaign, da lista do funil-01 (pergunta 23.5).

## O endereço novo (v14)

Decisão #120 (Otávio, 13/11/2026; prompts/21-dominio-e-caminho-da-analise.md, parte 21.2). **Nada disto está no ar:** a publicação é só pelo roteiro APLICAR-21.md (parte 21.3). Publicar com este wrangler.toml antes de a zona gotriad.com.br estar ativa na conta da Cloudflare derruba o site: o wrangler põe o Worker novo no ar antes de ligar o Custom Domain (4.158.0, lido no código em 14/11/2026); se a ligação falhar, o comando termina com erro, mas o endereço antigo já está levando a um endereço que não existe, e só volta com a versão anterior. Fora de um terminal interativo, como no Claude Code online, o wrangler também manda substituir, sem perguntar, um registro de DNS que já exista em svsafra. Os roteiros antigos de publicação (LIGAR.md, passo 3.7, e APLICAR-11.md, passo 4.3) levam o aviso de que não se publica mais por eles.

**Os dois endereços.** O novo, https://svsafra.gotriad.com.br, é um Custom Domain do Worker. O antigo, https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev, continua ligado: nele, toda página leva (302) à mesma página no endereço novo, com a consulta inteira (utm, id_sessao), e a porta privada da planilha continua respondendo, até a planilha do SDR ser apontada para o novo (passo do Otávio). O endereço puro gotriad.com.br fica de fora. O noindex continua nos dois (#101). O que o garçom faz em cada caso está em entregas/garcom/README.md, "Endereço antigo e caminho novo".

**O que o wrangler.toml diz e o que a documentação da Cloudflare diz** (páginas baixadas e lidas em 14/11/2026, antes de escrever a configuração, como o pedido manda; aqui só a página, a data de atualização e o ponto usado):

| Linha do wrangler.toml | O que faz | Página da documentação (developers.cloudflare.com) e data |
|---|---|---|
| `[[routes]]` com `pattern = "svsafra.gotriad.com.br"` e `custom_domain = true` | Liga o Worker ao endereço novo como Custom Domain: o nome inteiro, sem caminho e sem curinga, todos os caminhos no Worker. A Cloudflare cria o registro de DNS e o certificado | "Custom Domains" (workers/configuration/routing/custom-domains/, atualizada em 12/11/2026), seção sobre o arquivo de configuração do wrangler; e "Configuration" do wrangler (workers/wrangler/configuration/, atualizada em 12/11/2026), "Types of routes", "Custom Domains" |
| `workers_dev = true`, escrito | Mantém o endereço do workers.dev. Com uma rota no arquivo, o wrangler passa a entender `workers_dev` como falso quando a linha falta, e o endereço antigo sairia do ar na publicação seguinte | "Configuration" do wrangler (12/11/2026), chave `workers_dev`; e "workers.dev" (workers/configuration/routing/workers-dev/, atualizada em 06/11/2026), sobre desligar o workers.dev pelo arquivo |
| Nenhum `zone_id`, `zone_name` nem `account_id` | Custom Domain pede só `pattern` e `custom_domain`; id de zona é das rotas comuns, que este arquivo não usa | "Configuration" do wrangler (12/11/2026), "Custom Domains" e "Routes" |
| `ORIGEM_PERMITIDA` e `ENDERECO_ANTIGO` em `[vars]` | Variáveis comuns, lidas pelo garçom. As variáveis do arquivo passam por cima das do painel a cada publicação | "Configuration" do wrangler (12/11/2026), "Source of truth" |

Outros pontos da documentação que pesam no roteiro da 21.3:

- **Custom Domain pede uma zona ativa na Cloudflare, na conta, e não pode ser criado num nome que já tenha registro CNAME** ("Custom Domains", 12/11/2026). Por isso o passo 0 do roteiro é ver a zona gotriad.com.br ativa, e svsafra não pode ter registro CNAME criado à mão antes.
- **As rotas do arquivo passam por cima das do painel na publicação seguinte** ("Configuration" do wrangler, 12/11/2026, "Source of truth"). Se o endereço for ligado por cliques no painel, o arquivo tem de dizer a mesma coisa, e diz.
- **/analise sem a barra** é resolvido pelo binding de assets, no modo padrão (307 para /analise/, com a consulta): "HTML handling" (workers/static-assets/routing/advanced/html-handling/, atualizada em 23/04/2026). Conferido rodando.
- **No endereço do workers.dev, a Cloudflare aplica a própria conferência de navegador (Browser Integrity Check), que não dá para desligar** ("workers.dev", 06/11/2026). A planilha do SDR chama a porta privada por esse endereço e foi testada assim em 09/11/2026 (log.md, pedido 10); apontá-la para o endereço novo é passo do Otávio, no roteiro.

**Como foi conferido sem publicar** (14/11/2026, wrangler 4.158.0, `wrangler dev --local` com a configuração copiada para uma pasta temporária fora do repositório, segredos de mentira, um banco de mentira em 127.0.0.1 e a rede travada em 127.0.0.1, como o ensaio faz; curl e um navegador sem tela):

| Pedido | Nome do endereço | Status | Location | noindex |
|---|---|---|---|---|
| / | novo | 200 | | sim |
| /analise/ e /analise/?utm_source=bio&id_sessao=... | novo | 200 | | sim |
| /analise?a=1&b=2 | novo | 307 | /analise/?a=1&b=2 | sim |
| /quiz/?a=1&b=2 e /quiz?a=1&b=2 | novo | 302 | /analise/?a=1&b=2 | sim |
| /quiz/poster-junior.jpg | novo | 302 | /analise/poster-junior.jpg | sim |
| /analise/poster-junior.jpg e /analise/fontes/... | novo | 200 | | sim |
| /politica-de-privacidade/ | novo | 200 | | sim |
| /nao-existe | novo | 404 | | sim |
| /api/planilha/leads-novos, sem a chave e com a chave de mentira | novo | 401 e 200 | | sim |
| / e /?utm_source=bio&utm_campaign=funil-01&id_sessao=... | antigo | 302 | o endereço novo, no mesmo caminho, com a consulta inteira | sim |
| /quiz/?utm_source=bio e /quiz | antigo | 302 | o endereço novo em /analise/?utm_source=bio e em /analise/ | sim |
| /politica-de-privacidade/, /assets/... e /nao-existe | antigo | 302 | o endereço novo, no mesmo caminho | sim |
| /api/planilha/leads-novos, sem a chave e com a chave de mentira | antigo | 401 e 200 | | sim |
| /api e /api/outra | antigo | 404 | | sim |
| POST /api/evento e /api/fim-quiz, com a origem nova | antigo | 201 | | sim |
| POST /api/evento e /api/fim-quiz, com a origem antiga | antigo e novo | 403 | | sim |

No navegador sem tela (30 de 30): / abre; a chamada da landing leva a /analise/ com as utm e o id_sessao, sem passar por /quiz; /analise/ abre o quiz com as fontes de /analise/fontes/ e a imagem; /analise sem a barra e /quiz/?a=1&b=2 chegam a /analise/ com a consulta; a página da política abre, e também pelos links do aviso de cookies (em / e em /analise/) e da abertura do quiz; com o nome do endereço antigo, a página é levada ao novo; noindex nas 919 respostas vistas, 8 delas redirecionamentos; nada para fora de 127.0.0.1, salvo o gtm.js depois do "Aceitar", respondido 404 pelo próprio teste. Como simular o endereço antigo no wrangler dev local, e por que a cópia da configuração vai sem o bloco `[[routes]]`: entregas/garcom/README.md, "Como testar o endereço antigo no wrangler dev local". Uma diferença do servidor local: nele, um POST à porta pública feito pelo nome do endereço novo chega com a origem em `http://`, e a `ORIGEM_PERMITIDA` de verdade, em `https://`, o recusa; por isso a linha "origem nova aceita" da tabela foi medida pelo nome antigo e, no navegador, com a origem local. Na Cloudflare, o endereço e a origem chegam em `https://`.

## Medição (v9)

Decisão #116 (Otávio, 12/11/2026; prompts/17-medicao-google.md, parte 17.2), como a política de privacidade v3 (item 7) descreve. Entra só pela montagem, nos HTML do site (/, /analise/, que até a v13 era /quiz/, e, desde a v11, a página da política); as entregas não mudam. O bloco fica logo depois da `<meta charset="utf-8">`, entre `<!-- medicao: inicio -->` e `<!-- medicao: fim -->`, e vem de medicao.mjs:

1. **Antes de tudo**, o padrão de consentimento do Google com a análise e os três de anúncio negados (`gtag('consent', 'default', ...)`). O anúncio nunca recebe update.
2. **O estilo do aviso**, todo com o prefixo `.aviso-cookies`, no visual da landing-page-02: faixa escura com borda #25312b, texto #cdd6d1 e #e5ece7, Geist, e os dois botões iguais (mesmo tamanho, cor e borda, menta #8bd6b1; só o rótulo muda), com foco visível pelo teclado. Mais compacto no celular.
3. **Dois modelos** (`<template>`, que não carregam nada): o aviso e o link "Cookies". O texto vem do bloco `aviso` de entregas/documentos/aviso-de-cookies.md, com escape de HTML; `{{a definir: X}}` aparece como "[a definir: X]", como no quiz, e qualquer outro marcador para a montagem.
4. **O programa do aviso**, que roda quando a página já está montada (DOMContentLoaded), depois que o programa da página leu o id_sessao:
   - sem escolha guardada: o aviso entra como primeiro filho do body, em fluxo normal (não fixo, não por cima de nada), de uma borda à outra; ele sai da tela com a rolagem e nunca cobre o "Fazer a Análise" nem a barra fixa do rodapé do quiz no celular;
   - com "recusado": não mostra nem carrega nada;
   - com "aceito": não mostra o aviso e carrega o Tag Manager direto;
   - em todo caso, o link discreto "Cookies" entra como último filho do body, em fluxo normal; ele reabre o aviso no topo, com o foco nele, e depois da escolha o foco volta ao link.
5. **Ao "Aceitar"**: guarda `aceito` em `localStorage` (`safra_cookies_v1`); muda só a análise para concedida; troca o endereço da barra pelo mesmo endereço sem o parâmetro id_sessao (com os outros parâmetros e o #, por `history.replaceState`); põe na camada de dados `pagina_limpa` (endereço da página sem o id_sessao e sem o #) e `origem_limpa` (a página de origem, do mesmo jeito, ou vazio); e só então carrega o gtm.js do GTM-T6L4QTB8, uma vez, pelo carregador padrão do Google sem o `<noscript>`. O aviso some.
6. **Ao "Recusar"**: guarda `recusado` e não carrega nada. Se antes era `aceito`, manda a análise negada ao Google e apaga os cookies cujo nome começa por `_ga` (path /, sem domínio e com o domínio do endereço e os de cima dele); o Tag Manager já carregado não é descarregado, e da próxima página em diante nada do Google carrega.

**O foco depois da escolha** nunca fica no body: se o aviso foi reaberto pelo link "Cookies", volta ao link; se a escolha foi feita com o foco dentro do aviso, vai ao primeiro elemento focável da página depois dele, sem rolar a página. Pelo teclado, é o primeiro de todos (no quiz, o "Pular para o conteúdo"; na landing, o primeiro botão ou link desenhado); pelo mouse ou pelo toque, o primeiro que está à vista (no quiz, o "Fazer a Análise" do cabeçalho), para o "Pular para o conteúdo", que aparece quando recebe o foco, não surgir na tela de quem clicou.

O navegador guarda só a escolha; sem escolha, nada. Leitura e escrita do `localStorage` ficam em try/catch: no modo privado, a página só não lembra a escolha. O quiz lê o id_sessao uma vez, ao abrir, e o guarda numa constante (conferido no código: `ID_SESSAO`; as utm são relidas, o id_sessao não), então tirar o código do endereço depois do "Aceitar" não muda a sessão: o início, o fim do quiz e o clique levam o mesmo código. Custo: quem aceitou e recarrega o quiz ganha uma sessão nova (pergunta 10 da 17.1). Nada do Google além do gtm.js; o Google Analytics é ligado pelo Otávio dentro do Tag Manager, depois da publicação, e deve usar `pagina_limpa` e `origem_limpa` como endereço e origem da página (log.md, Pendências). Enquanto o contêiner não é publicado, o Google responde 404 ao gtm.js, e isso é esperado.

**Com o caminho e o endereço novos (v14; #120).** medicao.mjs e medicao.json não mudaram: nenhuma regra deles depende de /quiz/ nem do nome do endereço. A `pagina_limpa` e a `origem_limpa` saem do endereço em que a página está aberta. Conferido num navegador sem tela, com o site montado no `wrangler dev --local`: em `/analise/?utm_source=bio&id_sessao=...#abertura`, vindo de `/?utm_source=bio&id_sessao=...`, depois do "Aceitar", a `pagina_limpa` é o endereço da página em `/analise/?utm_source=bio` (sem o id_sessao e sem o #), a `origem_limpa` é `/?utm_source=bio`, e o endereço da barra fica sem o id_sessao; quem chega por /quiz/ é redirecionado antes de a página abrir e é medido em /analise/. Na troca de "aceito" para "recusado", os cookies `_ga` são apagados sem domínio, no domínio do endereço e nos de cima dele, como antes: no endereço novo, a tentativa é em svsafra.gotriad.com.br, gotriad.com.br e com.br (conferido no código, não num Analytics ligado, que ainda não existe). O que o Otávio precisa trocar no Tag Manager e no Analytics por causa do endereço e do caminho novos está em log.md, entrada da 21.2, e vai para a resposta do pedido 21.

## Como montar

Da raiz do repositório:

```
node entregas/prototipo-funil-01/montar-site.mjs
```

O script apaga site/ e monta de novo. Copia só os arquivos e as pastas do mapa (nada de README nem prints) e as fontes de cada página, de nucleo/ferramentas/fontes/ (v4, 10.7); se uma fonte faltar, diz para rodar `npm install` lá e sai com erro. Nos HTML montados, e nunca nas entregas: acrescenta `<meta charset="utf-8">` como primeiríssima linha quando não houver nos primeiros 1024 bytes (só o quiz, que não tem; o navegador só procura o charset nesse começo, e o comentário de cabeçalho do quiz passa disso; v3, pedido 09); acrescenta `<meta name="robots" content="noindex, nofollow">` quando não houver (o quiz não tinha; a landing já tem); acrescenta `<meta name="viewport" content="width=device-width, initial-scale=1">` antes do `<title>` quando não houver (só o quiz: sem ela, o celular desenha a página com 980 pixels e encolhe; a entrega fica para uma v3, conflito-18, pergunta 23.8). A landing-page-02 já leva ao quiz por /analise/ (v14; até a v13, por /quiz/) e não muda na montagem (v6). Desde a v14, o quiz é montado em analise/, com as fontes e a imagem dele junto, e a montagem para se sobrar alguma coisa em quiz/. Por último (v9), acrescenta o bloco da medição logo depois da meta charset (seção "Medição") e diz isso numa linha do relatório. Depois confere cada caminho de css, imagem e link nos arquivos montados, a meta charset nos primeiros 1024 bytes, a meta noindex e a meta viewport em todo HTML, (v6) cada imagem que o programa da landing-page-02 cita, (v4) que nenhuma página pede arquivo a outro endereço: nenhum src, link, url() ou @import para http(s) e nenhuma menção a fonts.googleapis ou fonts.gstatic, e (v6) que o programa não cita fonts.googleapis, fonts.gstatic nem vercel.live. (v9) A única exceção a "nenhum pedido a outro endereço" é o carregador do Tag Manager, exatamente `https://www.googletagmanager.com/gtm.js?id=`, e só dentro do bloco da medição: o bloco é separado do resto pelos marcadores antes de a conferência apagar os comentários; dentro dele, qualquer outro endereço é barrado (inclusive em comentário), e o carregador tem de aparecer uma vez; fora dele, e no programa da landing, qualquer menção ao Tag Manager, ao gtm.js ou ao Google Analytics é barrada. E confere que cada HTML tem o bloco uma vez só, antes de qualquer outro programa da página, com o consentimento padrão negado (análise e os três de anúncio) no primeiro programa do bloco, antes do carregador, sem `<noscript>` e sem update de anúncio. Provado com sete mudanças de propósito numa cópia fora do repositório (outro endereço dentro do bloco, o carregador fora dele, o bloco duas vezes, a análise concedida no padrão, o `<noscript>` do Google, update de anúncio e um programa antes do bloco): todas barradas. A ordem em que o programa roda (nada antes do "Aceitar") a conferência estática não vê; quem prova são o teste do quiz e o ensaio. Se algo falhar, diz o que e sai com erro.

Resultado (14/11/2026, v14):

```
Site montado em entregas/prototipo-funil-01/site/
  index.html (meta charset já existia no início; meta noindex já existia; meta viewport já existia; aviso de cookies e Tag Manager acrescentados depois da meta charset)
  assets/ (cópia da pasta inteira)
  a/ (cópia da pasta inteira)
  analise/index.html (meta charset já existia no início; meta noindex acrescentada; meta viewport acrescentada; aviso de cookies e Tag Manager acrescentados depois da meta charset)
  analise/poster-junior.jpg (cópia)
  politica-de-privacidade/index.html (montada da política de privacidade v4, pendente-aprovacao, só o texto para o lead; aviso de cookies e Tag Manager acrescentados)
  medição (v9; #116): aviso de cookies (texto do aviso-de-cookies v2) e Google Tag Manager GTM-T6L4QTB8, que só carrega depois do "Aceitar"; o navegador guarda só a escolha (safra_cookies_v1); em index.html e analise/index.html e politica-de-privacidade/index.html
  fontes/geist-latin-wght-normal.woff2 (cópia de @fontsource-variable/geist, com licenca-geist.txt)
  analise/fontes/inter-latin-wght-normal.woff2 (cópia de @fontsource-variable/inter, com licenca-inter.txt)
  analise/fontes/space-grotesk-latin-wght-normal.woff2 (cópia de @fontsource-variable/space-grotesk, com licenca-space-grotesk.txt)
  analise/fontes/permanent-marker-latin-400-normal.woff2 (cópia de @fontsource/permanent-marker, com licenca-permanent-marker.txt)
  analise/fontes/geist-latin-wght-normal.woff2 (cópia de @fontsource-variable/geist, com licenca-geist.txt)
335 arquivos, 7187 KB; 331 caminhos conferidos
Tudo certo: charset utf-8 no início, noindex e viewport em todo HTML, o bloco da medição uma vez em cada HTML, antes de qualquer outro programa, com o consentimento padrão negado antes do carregador do Tag Manager, todos os caminhos e todas as imagens do programa da landing existem no site e nenhuma página pede arquivo a outro endereço, salvo o carregador do Tag Manager (https://www.googletagmanager.com/gtm.js?id=), só dentro do bloco da medição, que só roda depois do "Aceitar".
```

Desde a v4, as páginas já trazem o doctype e a meta charset no começo (quiz v3, landings v3; 09.1), e o montador não acrescenta doctype. Procura no site montado (html, css e js) por endereço http (v6): só aparecem os nomes de espaço do SVG, do XML e do MathML (www.w3.org) e os links de erro do React (react.dev) no programa da landing-page-02, o comentário de licença do Tailwind (tailwindcss.com) no estilo dela e o https://wa.me/ do botão do WhatsApp do quiz, que só abre no clique e só com o número preenchido (hoje vazio). Nenhum deles é pedido a ninguém. As licenças copiadas (licenca-*.txt) citam endereços no texto, mas não são páginas (pergunta 34.10).

Conferido pelo ensaio geral (nucleo/ferramentas/ensaio/, desde a v4; hoje na v10, 255 de 255): em /, com utm no endereço, os dois botões de Análise levam direto a `/analise/?utm_source=...&id_sessao=...` (até a v13 desta pasta e a v9 do ensaio, a `/quiz/`) e a visita é gravada como landing-page-02, versão 1. Desde a v6 do ensaio, também a medição no site montado (seção 9 do ensaio): sem escolha e com "Recusar", nada para fora de 127.0.0.1, na landing e no quiz; com "Aceitar" na landing, o gtm.js do GTM-T6L4QTB8 é o primeiro e único pedido para fora, a pagina_limpa sai sem o id_sessao, e a escolha passa para o quiz, que abre sem o aviso e já pede o gtm.js. Desde a v10 do ensaio (seção 12; pedido 21, parte 21.3; decisão #120), também o endereço e o caminho novos: /quiz e /quiz/ levam a /analise/ com a consulta inteira, e /analise sem a barra funciona; um pedido de página com o nome do endereço antigo é levado ao novo, no mesmo caminho; a porta pública aceita a origem nova e recusa a antiga; a porta privada responde igual com os dois nomes, e a planilha do SDR puxa os leads pelo antigo; o noindex está em toda resposta, inclusive nos redirecionamentos; os links da política e do aviso de cookies abrem; as 10 chamadas da landing pedem /analise/ em 1440, 375 e 360; e o quiz vai da abertura ao fim em /analise/, nos três desfechos. O ensaio roda na máquina, com um endereço antigo de mentira: o domínio, o DNS, o certificado e o Custom Domain de verdade só se conferem no ar, pelo roteiro APLICAR-21.md (nucleo/ferramentas/ensaio/README.md, "Limitações").

## Como conferir com o dry-run

O wrangler está instalado só em nucleo/ferramentas/prototipo/ (`npm install` lá dentro; node_modules fica fora do Git). Primeiro montar o site; depois, de dentro desta pasta:

```
cd entregas/prototipo-funil-01
WRANGLER_SEND_METRICS=false ../../nucleo/ferramentas/prototipo/node_modules/.bin/wrangler deploy --dry-run --config wrangler.toml
```

O `--dry-run` monta o pacote e lista o que o Worker recebe, sem publicar, sem login e sem falar com a Cloudflare. Ele cria uma pasta .wrangler/ aqui, que fica fora do Git.

Resultado (08/11/2026, wrangler 4.158.0; não pediu login):

```
 ⛅️ wrangler 4.158.0
────────────────────
✨ Read 9 files from the assets directory /Volumes/OBM2T/OBM2T/CLAUDE CODE/triad/sistema-safra-de-vendas/entregas/prototipo-funil-01/site
Total Upload: 15.91 KiB / gzip: 4.78 KiB
Your Worker has access to the following bindings:
Binding                                                                Resource
env.ASSETS                                                             Assets
env.SUPABASE_URL ("https://bvrvdlhpralmzizobsvu.supabase...")          Environment Variable
env.ORIGEM_PERMITIDA ("https://safra-prototipo-funil-01.sist...")      Environment Variable

--dry-run: exiting now.
```

Resultado (14/11/2026, v14, wrangler 4.158.0; não pediu login nem token, e rodou com a rede travada em 127.0.0.1 e sem a variável do token no ambiente):

```
 ⛅️ wrangler 4.158.0
────────────────────
✨ Read 384 files from the assets directory (caminho da pasta site/)
Total Upload: 19.21 KiB / gzip: 5.60 KiB
Your Worker has access to the following bindings:
Binding                                                                Resource
env.ASSETS                                                             Assets
env.SUPABASE_URL ("https://bvrvdlhpralmzizobsvu.supabase...")          Environment Variable
env.ORIGEM_PERMITIDA ("https://svsafra.gotriad.com.br")                Environment Variable
env.ENDERECO_ANTIGO ("https://safra-prototipo-funil-01.sist...")       Environment Variable

--dry-run: exiting now.
```

Como ler a v14: o wrangler aceitou o arquivo, com o garçom v5 (19,21 KiB; 5,60 KiB comprimido) e as três variáveis comuns. **O dry-run desta versão do wrangler não lista as rotas nem o workers.dev:** a saída só mostra as ligações. Que ele leu o bloco `[[routes]]` foi conferido de dois jeitos, fora do repositório: numa cópia com `custom_domain = "sim"`, ou com `pattern = "svsafra.gotriad.com.br/*"`, o mesmo dry-run para com erro ("Wildcard operators (*) are not allowed in Custom Domains", "Paths are not allowed in Custom Domains"); e no `wrangler dev --local` o garçom passa a receber os pedidos com o nome svsafra.gotriad.com.br. A rota e o workers.dev só aparecem de verdade na saída da publicação, que é do roteiro APLICAR-21. A única tentativa de falar com fora da máquina foi a procura de versão nova do wrangler (registry.npmjs.org), recusada pela trava; nada foi à Cloudflare.

Como ler a de 08/11/2026: o pacote do Worker (o garçom) tem 15,91 KiB (4,78 KiB comprimido); os arquivos do site vão à parte, pelo binding ASSETS. As duas variáveis comuns foram reconhecidas; preview_urls = false passou sem aviso. Os três segredos não aparecem, porque não estão no arquivo: entram no cofre da Cloudflare no dia de publicar. A pasta tem 7 arquivos e nenhum arquivo escondido (conferido).

## Segredos, só pelo nome

| Nome | O que é | Quem usa |
|---|---|---|
| SUPABASE_CHAVE_PUBLICAVEL | Chave publicável do Supabase (papel anon) | Só a porta pública |
| SUPABASE_CHAVE_SECRETA | Chave secreta do Supabase (papel service_role) | Só a porta privada |
| CHAVE_PLANILHA | Abre a porta privada | O garçom e o Apps Script da planilha |

Nenhum valor passa por arquivo da máquina nem pelo chat: vão direto do painel do serviço para o cofre da Cloudflare (conexoes.md; LIGAR.md, parte 3). SUPABASE_URL, ORIGEM_PERMITIDA e, desde a v14, ENDERECO_ANTIGO não são segredo e ficam em [vars].

Variáveis comuns, em [vars] (v14):

| Nome | Valor | Quem usa |
|---|---|---|
| SUPABASE_URL | O endereço do projeto no Supabase (conexoes.md) | As três portas do garçom |
| ORIGEM_PERMITIDA | https://svsafra.gotriad.com.br, o endereço novo (v14; #120; até a v13, o endereço do workers.dev) | As duas portas públicas (mesma origem) e o destino do redirecionamento do endereço antigo |
| ENDERECO_ANTIGO | https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev (v14; #120) | O garçom, para levar ao endereço novo as páginas pedidas pelo antigo. Sem ela, nenhum pedido muda de endereço |

## Prints

Tirados com nucleo/ferramentas/prints/print.js sobre a pasta montada (abrindo os arquivos direto, que basta para css e imagens relativos), com a opção --celular: o print de 375 imita um celular (a meta viewport vale; largura útil 375 nas três páginas; a imagem sai com 750 pixels de largura, densidade 2). Em prints/:

- landing-page-02-375.png e landing-page-02-1440.png (/, v6, 12/11/2026)
- quiz-capa-375.png e quiz-capa-1440.png (/quiz/, na capa)

Os da landing-page-02 foram tirados com o site montado servido em 127.0.0.1, porque ela não abre direto do arquivo (caminhos a partir da raiz e programa em módulo). Os do quiz são da v3 do montador e não foram tirados de novo: os prints novos do quiz estão em entregas/quizzes/quiz-01/prints/. Os prints das variantes da landing-page-01 continuam em entregas/landings/landing-page-01/prints/.

## Antes do teste

O banco confere o par (entrega, versão) do pacote no catálogo (public.entregas), que o esquema não preenche. O quiz manda ('quiz-01', 2) e, desde a v6, a landing manda ('landing-page-02', 1): sem essas linhas, o fim do quiz volta 422 e o visitante vê o aviso de falha, e a visita e o início do quiz se perdem sem aviso (pergunta 23.10; 32.4). As linhas são gravadas por dados/banco/catalogo-prototipo.sql (v3, que acrescenta a ('landing-page-02', 1) sem mexer nas outras); o passo a passo é o APLICAR-11.md, parte 2, antes de publicar (LIGAR.md ainda descreve a v1). No protótipo que já está no ar, basta rodar o arquivo de novo: ele só acrescenta a linha que faltar.

## O que não fazer

- **Não publicar.** Publicar é só pelo roteiro LIGAR.md, nesta pasta, depois do push e do SQL no Supabase. **Desde a v14, só pelo roteiro APLICAR-21.md** (parte 21.3 do pedido 21), e só depois de a zona gotriad.com.br estar ativa na conta da Cloudflare: antes disso, publicar com o wrangler.toml da v14 derruba o site, mesmo que o comando termine com erro (seção "O endereço novo").
- Não fazer login na Cloudflare fora do roteiro; não pôr account_id, zone_id nem segredo no wrangler.toml.
- Não editar nada em site/: ela é refeita a cada montagem. Mudança vai na entrega, que sobe de versão.
- Não usar o protótipo com gente de verdade (conflito-17, aprovações e proteção contra robô, acima).

## Perguntas

prompts/08-fila-perguntas.md, seções "Etapa 23" e "Etapa 26"; prompts/11-fila-perguntas.md, "Etapa 34". Da v14: log.md, entrada da 21.2 (14/11/2026), "Perguntas para o Otávio".
