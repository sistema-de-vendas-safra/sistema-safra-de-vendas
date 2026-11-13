---
id: prototipo-funil-01
versao: 11
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: garcom
    versao: 4
  - id: quiz-01-pagina
    versao: 5
  - id: landing-page-02
    versao: 2
  - id: banco-rascunho
    versao: 4
  - id: decisoes
    versao: 7
  - id: regra-seguranca
    versao: 3
  - id: lacunas
    versao: 7
  - id: aviso-de-cookies
    versao: 2
  - id: politica-de-privacidade
    versao: 4
desatualizado: true
---

# Protótipo do funil-01 · site de teste

O site de teste do funil-01 num Worker só da Cloudflare, o safra-prototipo-funil-01 (decisão #101): a landing-page-02, o quiz-01 e o garçom no mesmo endereço, https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev. **Publicado pela primeira vez em 09/11/2026** (Current Version ID 7c6024d7-ff13-4ab8-b9f7-1a58213c0909), só com leads de teste. Nessa publicação o quiz saiu com os acentos quebrados; a correção é a v3 (pedido 09). A v4 (etapa 34) monta as páginas novas (quiz v3, landings v3) com as fontes servidas junto; nada disso foi publicado. A v5 (etapa 35) só aponta para o APLICAR-11.md. A v6 (12/11/2026, pedido do Otávio) põe a landing-page-02, a página de vendas, em / no lugar das duas variantes da landing-page-01, e tira o /b/ do site; as variantes continuam no repositório. A v7 e a v8 só registram as publicações de 12/11/2026 das 10h14 e das 11h40 (seção "Publicações"). A v9 (pedido 17, parte 17.2; decisão #116) acrescenta nos HTML montados o aviso de cookies e o Google Tag Manager (GTM-T6L4QTB8), que só carrega depois do "Aceitar" (seção "Medição"). **No ar desde 12/11/2026, 16h16** (Current Version ID a82e93cc-82cd-45c5-b2fa-c78d557cef32), com a v9 desta pasta: a landing-page-02 em /, o quiz-01 abrindo na abertura (quiz-01-pagina v4) e a medição nas duas páginas; a v10 só registra essa publicação (pedido 17, parte 17.3). A v11 (13/11/2026, #117), ainda não publicada, monta a página da política de privacidade em /politica-de-privacidade/ (pagina-politica.mjs), com o quiz-01 v5 (os nomes da Análise e da agência e os links da política), a landing-page-02 v2 (sem as perguntas 6 e 7 do FAQ) e o aviso-de-cookies v2 (com o link da política). Esta pasta tem a configuração do Worker, o script que monta o site a partir das entregas, os prints do site montado e o roteiro para ligar.

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

## O que tem dentro

| Arquivo | O que é |
|---|---|
| LIGAR.md | O roteiro para ligar o protótipo, para iniciante, passo a passo, com o tempo de cada passo e como saber que deu certo (id prototipo-funil-01-ligar) |
| APLICAR-11.md | O roteiro para aplicar no protótipo que está no ar as mudanças das etapas 32 a 34, no mesmo padrão (id prototipo-funil-01-aplicar-11) |
| wrangler.toml | A configuração do Worker: nome, main apontando para ../garcom/garcom.mjs, arquivos pelo binding ASSETS com run_worker_first, preview_urls = false (um endereço só, #101), as duas variáveis comuns e, só em comentário, o nome dos três segredos. Sem id de conta e sem segredo |
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
| /quiz/ | Quiz-01 | entregas/quizzes/quiz-01/pagina/ (index.html, poster-junior.jpg) |
| /politica-de-privacidade/ | A política de privacidade (v11; #117), para onde vão os links do quiz e do aviso de cookies, numa aba nova | entregas/documentos/politica-de-privacidade.md, seção "Texto para o lead", por pagina-politica.mjs |
| /fontes/ e /quiz/fontes/ | As fontes da landing-page-02 (Geist) e do quiz (Inter, Space Grotesk, Permanent Marker), com a licença de cada uma | nucleo/ferramentas/fontes/node_modules/ (pacotes @fontsource, lista em fontes.json) |
| POST /api/fim-quiz | Porta pública do garçom: o quiz manda o pacote do fim | entregas/garcom/garcom.mjs |
| POST /api/evento | Porta pública do garçom: a visita da landing, o início do quiz e o clique do fim, sem dado de pessoa (garçom v4) | entregas/garcom/garcom.mjs |
| GET /api/planilha/leads-novos | Porta privada do garçom: só a planilha do SDR, com a CHAVE_PLANILHA | entregas/garcom/garcom.mjs |

As rotas /api/ são atendidas pelo garçom antes dos arquivos. Todo pedido passa pelo Worker (run_worker_first = true), e o garçom põe o cabeçalho X-Robots-Tag: noindex em toda resposta, inclusive nos arquivos, e o charset utf-8 em todo HTML, CSS e JavaScript que a Cloudflare entrega sem charset (garçom v3). Além do cabeçalho, todo HTML do site tem a meta robots noindex, nofollow e a meta charset utf-8 no começo e, desde a v9, o bloco da medição logo depois dela.

Os botões "Fazer a Análise" e "Faça uma Análise Estratégica do seu Sistema de Vendas" da landing-page-02 levam a /quiz/ com as utm do endereço da landing (as que existirem: utm_source, utm_medium, utm_campaign, utm_content, utm_term) e o código de sessão da visita, no parâmetro id_sessao, no formato do banco (10.5). Exemplo para testar: /?utm_source=bio&utm_campaign=funil-01. O quiz só lê utm_source e utm_campaign, da lista do funil-01 (pergunta 23.5).

## Medição (v9)

Decisão #116 (Otávio, 12/11/2026; prompts/17-medicao-google.md, parte 17.2), como a política de privacidade v3 (item 7) descreve. Entra só pela montagem, nos dois HTML do site (/ e /quiz/); as entregas não mudam. O bloco fica logo depois da `<meta charset="utf-8">`, entre `<!-- medicao: inicio -->` e `<!-- medicao: fim -->`, e vem de medicao.mjs:

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

## Como montar

Da raiz do repositório:

```
node entregas/prototipo-funil-01/montar-site.mjs
```

O script apaga site/ e monta de novo. Copia só os arquivos e as pastas do mapa (nada de README nem prints) e as fontes de cada página, de nucleo/ferramentas/fontes/ (v4, 10.7); se uma fonte faltar, diz para rodar `npm install` lá e sai com erro. Nos HTML montados, e nunca nas entregas: acrescenta `<meta charset="utf-8">` como primeiríssima linha quando não houver nos primeiros 1024 bytes (só o quiz, que não tem; o navegador só procura o charset nesse começo, e o comentário de cabeçalho do quiz passa disso; v3, pedido 09); acrescenta `<meta name="robots" content="noindex, nofollow">` quando não houver (o quiz não tinha; a landing já tem); acrescenta `<meta name="viewport" content="width=device-width, initial-scale=1">` antes do `<title>` quando não houver (só o quiz: sem ela, o celular desenha a página com 980 pixels e encolhe; a entrega fica para uma v3, conflito-18, pergunta 23.8). A landing-page-02 já leva ao quiz por /quiz/ e não muda na montagem (v6). Por último (v9), acrescenta o bloco da medição logo depois da meta charset (seção "Medição") e diz isso numa linha do relatório. Depois confere cada caminho de css, imagem e link nos arquivos montados, a meta charset nos primeiros 1024 bytes, a meta noindex e a meta viewport em todo HTML, (v6) cada imagem que o programa da landing-page-02 cita, (v4) que nenhuma página pede arquivo a outro endereço: nenhum src, link, url() ou @import para http(s) e nenhuma menção a fonts.googleapis ou fonts.gstatic, e (v6) que o programa não cita fonts.googleapis, fonts.gstatic nem vercel.live. (v9) A única exceção a "nenhum pedido a outro endereço" é o carregador do Tag Manager, exatamente `https://www.googletagmanager.com/gtm.js?id=`, e só dentro do bloco da medição: o bloco é separado do resto pelos marcadores antes de a conferência apagar os comentários; dentro dele, qualquer outro endereço é barrado (inclusive em comentário), e o carregador tem de aparecer uma vez; fora dele, e no programa da landing, qualquer menção ao Tag Manager, ao gtm.js ou ao Google Analytics é barrada. E confere que cada HTML tem o bloco uma vez só, antes de qualquer outro programa da página, com o consentimento padrão negado (análise e os três de anúncio) no primeiro programa do bloco, antes do carregador, sem `<noscript>` e sem update de anúncio. Provado com sete mudanças de propósito numa cópia fora do repositório (outro endereço dentro do bloco, o carregador fora dele, o bloco duas vezes, a análise concedida no padrão, o `<noscript>` do Google, update de anúncio e um programa antes do bloco): todas barradas. A ordem em que o programa roda (nada antes do "Aceitar") a conferência estática não vê; quem prova são o teste do quiz e o ensaio. Se algo falhar, diz o que e sai com erro.

Resultado (12/11/2026, v9):

```
Site montado em entregas/prototipo-funil-01/site/
  index.html (meta charset já existia no início; meta noindex já existia; meta viewport já existia; aviso de cookies e Tag Manager acrescentados depois da meta charset)
  assets/ (cópia da pasta inteira)
  a/ (cópia da pasta inteira)
  quiz/index.html (meta charset já existia no início; meta noindex acrescentada; meta viewport acrescentada; aviso de cookies e Tag Manager acrescentados depois da meta charset)
  quiz/poster-junior.jpg (cópia)
  medição (v9; #116): aviso de cookies (texto do aviso-de-cookies v1) e Google Tag Manager GTM-T6L4QTB8, que só carrega depois do "Aceitar"; o navegador guarda só a escolha (safra_cookies_v1); em index.html e quiz/index.html
  fontes/geist-latin-wght-normal.woff2 (cópia de @fontsource-variable/geist, com licenca-geist.txt)
  quiz/fontes/inter-latin-wght-normal.woff2 (cópia de @fontsource-variable/inter, com licenca-inter.txt)
  quiz/fontes/space-grotesk-latin-wght-normal.woff2 (cópia de @fontsource-variable/space-grotesk, com licenca-space-grotesk.txt)
  quiz/fontes/permanent-marker-latin-400-normal.woff2 (cópia de @fontsource/permanent-marker, com licenca-permanent-marker.txt)
  quiz/fontes/geist-latin-wght-normal.woff2 (cópia de @fontsource-variable/geist, com licenca-geist.txt)
334 arquivos, 7191 KB; 327 caminhos conferidos
Tudo certo: charset utf-8 no início, noindex e viewport em todo HTML, o bloco da medição uma vez em cada HTML, antes de qualquer outro programa, com o consentimento padrão negado antes do carregador do Tag Manager, todos os caminhos e todas as imagens do programa da landing existem no site e nenhuma página pede arquivo a outro endereço, salvo o carregador do Tag Manager (https://www.googletagmanager.com/gtm.js?id=), só dentro do bloco da medição, que só roda depois do "Aceitar".
```

Desde a v4, as páginas já trazem o doctype e a meta charset no começo (quiz v3, landings v3; 09.1), e o montador não acrescenta doctype. Procura no site montado (html, css e js) por endereço http (v6): só aparecem os nomes de espaço do SVG, do XML e do MathML (www.w3.org) e os links de erro do React (react.dev) no programa da landing-page-02, o comentário de licença do Tailwind (tailwindcss.com) no estilo dela e o https://wa.me/ do botão do WhatsApp do quiz, que só abre no clique e só com o número preenchido (hoje vazio). Nenhum deles é pedido a ninguém. As licenças copiadas (licenca-*.txt) citam endereços no texto, mas não são páginas (pergunta 34.10).

Conferido pelo ensaio geral (nucleo/ferramentas/ensaio/, v4): em /, com utm no endereço, os dois botões de Análise levam a `/quiz/?utm_source=...&id_sessao=...` e a visita é gravada como landing-page-02, versão 1. Desde a v6 do ensaio, também a medição no site montado (seção 9 do ensaio): sem escolha e com "Recusar", nada para fora de 127.0.0.1, na landing e no quiz; com "Aceitar" na landing, o gtm.js do GTM-T6L4QTB8 é o primeiro e único pedido para fora, a pagina_limpa sai sem o id_sessao, e a escolha passa para o quiz, que abre sem o aviso e já pede o gtm.js.

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

Como ler: o pacote do Worker (o garçom) tem 15,91 KiB (4,78 KiB comprimido); os arquivos do site vão à parte, pelo binding ASSETS. As duas variáveis comuns foram reconhecidas; preview_urls = false passou sem aviso. Os três segredos não aparecem, porque não estão no arquivo: entram no cofre da Cloudflare no dia de publicar. A pasta tem 7 arquivos e nenhum arquivo escondido (conferido).

## Segredos, só pelo nome

| Nome | O que é | Quem usa |
|---|---|---|
| SUPABASE_CHAVE_PUBLICAVEL | Chave publicável do Supabase (papel anon) | Só a porta pública |
| SUPABASE_CHAVE_SECRETA | Chave secreta do Supabase (papel service_role) | Só a porta privada |
| CHAVE_PLANILHA | Abre a porta privada | O garçom e o Apps Script da planilha |

Nenhum valor passa por arquivo da máquina nem pelo chat: vão direto do painel do serviço para o cofre da Cloudflare (conexoes.md; LIGAR.md, parte 3). SUPABASE_URL e ORIGEM_PERMITIDA não são segredo e ficam em [vars].

## Prints

Tirados com nucleo/ferramentas/prints/print.js sobre a pasta montada (abrindo os arquivos direto, que basta para css e imagens relativos), com a opção --celular: o print de 375 imita um celular (a meta viewport vale; largura útil 375 nas três páginas; a imagem sai com 750 pixels de largura, densidade 2). Em prints/:

- landing-page-02-375.png e landing-page-02-1440.png (/, v6, 12/11/2026)
- quiz-capa-375.png e quiz-capa-1440.png (/quiz/, na capa)

Os da landing-page-02 foram tirados com o site montado servido em 127.0.0.1, porque ela não abre direto do arquivo (caminhos a partir da raiz e programa em módulo). Os do quiz são da v3 do montador e não foram tirados de novo: os prints novos do quiz estão em entregas/quizzes/quiz-01/prints/. Os prints das variantes da landing-page-01 continuam em entregas/landings/landing-page-01/prints/.

## Antes do teste

O banco confere o par (entrega, versão) do pacote no catálogo (public.entregas), que o esquema não preenche. O quiz manda ('quiz-01', 2) e, desde a v6, a landing manda ('landing-page-02', 1): sem essas linhas, o fim do quiz volta 422 e o visitante vê o aviso de falha, e a visita e o início do quiz se perdem sem aviso (pergunta 23.10; 32.4). As linhas são gravadas por dados/banco/catalogo-prototipo.sql (v3, que acrescenta a ('landing-page-02', 1) sem mexer nas outras); o passo a passo é o APLICAR-11.md, parte 2, antes de publicar (LIGAR.md ainda descreve a v1). No protótipo que já está no ar, basta rodar o arquivo de novo: ele só acrescenta a linha que faltar.

## O que não fazer

- **Não publicar.** Publicar é só pelo roteiro LIGAR.md, nesta pasta, depois do push e do SQL no Supabase.
- Não fazer login na Cloudflare fora do roteiro; não pôr account_id nem segredo no wrangler.toml.
- Não editar nada em site/: ela é refeita a cada montagem. Mudança vai na entrega, que sobe de versão.
- Não usar o protótipo com gente de verdade (conflito-17, aprovações e proteção contra robô, acima).

## Perguntas

prompts/08-fila-perguntas.md, seções "Etapa 23" e "Etapa 26"; prompts/11-fila-perguntas.md, "Etapa 34".
