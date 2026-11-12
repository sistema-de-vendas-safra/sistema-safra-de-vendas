---
id: prototipo-funil-01
versao: 7
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: garcom
    versao: 4
  - id: quiz-01-pagina
    versao: 3
  - id: landing-page-02
    versao: 1
  - id: banco-rascunho
    versao: 4
  - id: decisoes
    versao: 5
  - id: regra-seguranca
    versao: 3
  - id: lacunas
    versao: 6
desatualizado: true
---

# Protótipo do funil-01 · site de teste

O site de teste do funil-01 num Worker só da Cloudflare, o safra-prototipo-funil-01 (decisão #101): a landing-page-02, o quiz-01 e o garçom no mesmo endereço, https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev. **Publicado pela primeira vez em 09/11/2026** (Current Version ID 7c6024d7-ff13-4ab8-b9f7-1a58213c0909), só com leads de teste. Nessa publicação o quiz saiu com os acentos quebrados; a correção é a v3 (pedido 09). A v4 (etapa 34) monta as páginas novas (quiz v3, landings v3) com as fontes servidas junto; nada disso foi publicado. A v5 (etapa 35) só aponta para o APLICAR-11.md. A v6 (12/11/2026, pedido do Otávio) põe a landing-page-02, a página de vendas, em / no lugar das duas variantes da landing-page-01, e tira o /b/ do site; as variantes continuam no repositório. **A v6 está no ar desde 12/11/2026, 10h14** (Current Version ID e344fcdd-d17f-47e6-9353-59e5579d86e3); a v7 só registra essa publicação (seção "Publicações"). Esta pasta tem a configuração do Worker, o script que monta o site a partir das entregas, os prints do site montado e o roteiro para ligar.

**Para ligar:** LIGAR.md, nesta pasta, é o passo a passo do Otávio para o dia de ligar o protótipo (push, Supabase, Cloudflare, planilha, teste com leads de mentira, o que fazer se der errado e como desligar).

**Para aplicar as mudanças de 09/11 no protótipo que já está no ar:** APLICAR-11.md, nesta pasta (push, migração, catálogo, conferência, planilha com 20 colunas, publicar, apagar a chave secreta "default" e um teste rápido com pessoas de mentira novas).

**Protótipo de teste não é entrega.** Serve só para o Otávio testar o caminho do dado com leads de mentira (#102: nome começando por TESTE, e-mail @teste.invalid). Ir ao ar com gente de verdade continua travado: o destino dos contatos está em conflito (conflito-17, em base/lacunas.md; o garçom segue o lado 2, #90, sem escolher), as páginas e o garçom são rascunhos pendentes de aprovação (do Otávio e, nas páginas, do Júnior e do Euclides) e, antes de tráfego real, falta a proteção contra robô e o limite de pedidos (log.md, Pendências).

**Status.** Rascunho, pendente do Otávio. Nasce desatualizado, porque se apoia em documentos marcados (garcom, quiz-01-pagina, landing-page-02, banco-rascunho e lacunas; regra provisória 11.1).

## Publicações

| Quando | Current Version ID | O que foi ao ar | Quem e como |
|---|---|---|---|
| 09/11/2026 | 7c6024d7-ff13-4ab8-b9f7-1a58213c0909 | Primeira publicação, pelo LIGAR.md (quiz com os acentos quebrados, corrigidos no pedido 09) | Otávio, com o wrangler logado no Mac |
| 09/11/2026, 19h16 | c4235168-4d3c-46b5-b721-8be77fdd3cb3 | APLICAR-11 v1, parte 4: as páginas da etapa 34 (quiz-01 v3 e as variantes da landing-page-01) e o garçom v4 (prompts/14-estado-para-o-mentor.md) | Otávio, com o wrangler logado no Mac |
| 12/11/2026, 10h14 | e344fcdd-d17f-47e6-9353-59e5579d86e3 | Esta pasta na v6: landing-page-02 em /, quiz-01 em /quiz/, garçom v4; main no 19e2a84 | Claude Code online, pelo passo 4.3 do APLICAR-11 (wrangler 4.158.0, WRANGLER_SEND_METRICS=false), com o token de API da Cloudflare nas variáveis do ambiente da nuvem, temporário até 16/11/2026. Nenhum valor de chave em arquivo |

**Conferido no ar em 12/11/2026** (navegador sem tela, em 1440 e em 375 pixels como celular, com os envios ao garçom bloqueados, salvo uma visita e um início do quiz):

- / abre a landing-page-02 (200, `text/html; charset=utf-8`, `X-Robots-Tag: noindex`) e cabe nos 375 pixels.
- Os dois botões, "Fazer a Análise" e "Faça uma Análise Estratégica do seu Sistema de Vendas", levam a /quiz/ com utm_source, utm_campaign e id_sessao.
- /quiz/ abre na capa, em UTF-8 e no modo padrão, com os acentos certos, e cabe nos 375 pixels.
- Nenhuma página pede arquivo a outro endereço, e nenhuma mostrou erro de programa.
- No garçom, o início do quiz (quiz-01, 2) foi gravado (201), mas a **visita da landing-page-02 foi recusada (422)**: o catálogo do banco ainda não tem a linha (landing-page-02, 1), porque em 09/11 entraram as três linhas da v2 do catalogo-prototipo.sql. O resto funciona. Para a visita ser gravada, falta rodar dados/banco/catalogo-prototipo.sql v3 no Supabase (APLICAR-11.md, 2.5 e 2.6). Não houve rollback: a página e o quiz abriram.
- O que a conferência gravou no banco: um início do quiz sem pessoa (utm_source bio, utm_campaign funil-01), por volta das 10h20 de 12/11/2026. Nenhum fim do quiz, nenhum contato.

## O que tem dentro

| Arquivo | O que é |
|---|---|
| LIGAR.md | O roteiro para ligar o protótipo, para iniciante, passo a passo, com o tempo de cada passo e como saber que deu certo (id prototipo-funil-01-ligar) |
| APLICAR-11.md | O roteiro para aplicar no protótipo que está no ar as mudanças das etapas 32 a 34, no mesmo padrão (id prototipo-funil-01-aplicar-11) |
| wrangler.toml | A configuração do Worker: nome, main apontando para ../garcom/garcom.mjs, arquivos pelo binding ASSETS com run_worker_first, preview_urls = false (um endereço só, #101), as duas variáveis comuns e, só em comentário, o nome dos três segredos. Sem id de conta e sem segredo |
| montar-site.mjs | Monta a pasta site/ a partir das entregas. Node, sem dependências próprias; as fontes vêm de nucleo/ferramentas/fontes/ (`npm install` lá dentro) |
| prints/ | Prints das duas páginas montadas em 375 e 1440 pixels |
| site/ | A pasta montada. Fica fora do Git (.gitignore) e é refeita a cada montagem |

## Mapa de rotas

| Endereço | O que responde | De onde vem |
|---|---|---|
| / | Landing-page-02, a página de vendas (v6) | entregas/landings/landing-page-02/pagina/ (index.html, assets/ com o programa e o estilo, a/ com as imagens) |
| /quiz/ | Quiz-01 | entregas/quizzes/quiz-01/pagina/ (index.html, poster-junior.jpg) |
| /fontes/ e /quiz/fontes/ | As fontes da landing-page-02 (Geist) e do quiz (Inter, Space Grotesk, Permanent Marker), com a licença de cada uma | nucleo/ferramentas/fontes/node_modules/ (pacotes @fontsource, lista em fontes.json) |
| POST /api/fim-quiz | Porta pública do garçom: o quiz manda o pacote do fim | entregas/garcom/garcom.mjs |
| POST /api/evento | Porta pública do garçom: a visita da landing, o início do quiz e o clique do fim, sem dado de pessoa (garçom v4) | entregas/garcom/garcom.mjs |
| GET /api/planilha/leads-novos | Porta privada do garçom: só a planilha do SDR, com a CHAVE_PLANILHA | entregas/garcom/garcom.mjs |

As rotas /api/ são atendidas pelo garçom antes dos arquivos. Todo pedido passa pelo Worker (run_worker_first = true), e o garçom põe o cabeçalho X-Robots-Tag: noindex em toda resposta, inclusive nos arquivos, e o charset utf-8 em todo HTML, CSS e JavaScript que a Cloudflare entrega sem charset (garçom v3). Além do cabeçalho, todo HTML do site tem a meta robots noindex, nofollow e a meta charset utf-8 no começo.

Os botões "Fazer a Análise" e "Faça uma Análise Estratégica do seu Sistema de Vendas" da landing-page-02 levam a /quiz/ com as utm do endereço da landing (as que existirem: utm_source, utm_medium, utm_campaign, utm_content, utm_term) e o código de sessão da visita, no parâmetro id_sessao, no formato do banco (10.5). Exemplo para testar: /?utm_source=bio&utm_campaign=funil-01. O quiz só lê utm_source e utm_campaign, da lista do funil-01 (pergunta 23.5).

## Como montar

Da raiz do repositório:

```
node entregas/prototipo-funil-01/montar-site.mjs
```

O script apaga site/ e monta de novo. Copia só os arquivos e as pastas do mapa (nada de README nem prints) e as fontes de cada página, de nucleo/ferramentas/fontes/ (v4, 10.7); se uma fonte faltar, diz para rodar `npm install` lá e sai com erro. Nos HTML montados, e nunca nas entregas: acrescenta `<meta charset="utf-8">` como primeiríssima linha quando não houver nos primeiros 1024 bytes (só o quiz, que não tem; o navegador só procura o charset nesse começo, e o comentário de cabeçalho do quiz passa disso; v3, pedido 09); acrescenta `<meta name="robots" content="noindex, nofollow">` quando não houver (o quiz não tinha; a landing já tem); acrescenta `<meta name="viewport" content="width=device-width, initial-scale=1">` antes do `<title>` quando não houver (só o quiz: sem ela, o celular desenha a página com 980 pixels e encolhe; a entrega fica para uma v3, conflito-18, pergunta 23.8). A landing-page-02 já leva ao quiz por /quiz/ e não muda na montagem (v6). Depois confere cada caminho de css, imagem e link nos arquivos montados, a meta charset nos primeiros 1024 bytes, a meta noindex e a meta viewport em todo HTML, (v6) cada imagem que o programa da landing-page-02 cita, (v4) que nenhuma página pede arquivo a outro endereço: nenhum src, link, url() ou @import para http(s) e nenhuma menção a fonts.googleapis ou fonts.gstatic, e (v6) que o programa não cita fonts.googleapis, fonts.gstatic nem vercel.live. Se algo falhar, diz o que e sai com erro.

Resultado (12/11/2026, v6):

```
Site montado em entregas/prototipo-funil-01/site/
  index.html (meta charset já existia no início; meta noindex já existia; meta viewport já existia)
  assets/ (cópia da pasta inteira)
  a/ (cópia da pasta inteira)
  quiz/index.html (meta charset já existia no início; meta noindex acrescentada; meta viewport acrescentada)
  quiz/poster-junior.jpg (cópia)
  fontes/geist-latin-wght-normal.woff2 (cópia de @fontsource-variable/geist, com licenca-geist.txt)
  quiz/fontes/inter-latin-wght-normal.woff2 (cópia de @fontsource-variable/inter, com licenca-inter.txt)
  quiz/fontes/space-grotesk-latin-wght-normal.woff2 (cópia de @fontsource-variable/space-grotesk, com licenca-space-grotesk.txt)
  quiz/fontes/permanent-marker-latin-400-normal.woff2 (cópia de @fontsource/permanent-marker, com licenca-permanent-marker.txt)
332 arquivos, 7129 KB; 326 caminhos conferidos
Tudo certo: charset utf-8 no início, noindex e viewport em todo HTML, todos os caminhos e todas as imagens do programa da landing existem no site e nenhuma página pede arquivo a outro endereço.
```

Desde a v4, as páginas já trazem o doctype e a meta charset no começo (quiz v3, landings v3; 09.1), e o montador não acrescenta doctype. Procura no site montado (html, css e js) por endereço http (v6): só aparecem os nomes de espaço do SVG, do XML e do MathML (www.w3.org) e os links de erro do React (react.dev) no programa da landing-page-02, o comentário de licença do Tailwind (tailwindcss.com) no estilo dela e o https://wa.me/ do botão do WhatsApp do quiz, que só abre no clique e só com o número preenchido (hoje vazio). Nenhum deles é pedido a ninguém. As licenças copiadas (licenca-*.txt) citam endereços no texto, mas não são páginas (pergunta 34.10).

Conferido pelo ensaio geral (nucleo/ferramentas/ensaio/, v4): em /, com utm no endereço, os dois botões de Análise levam a `/quiz/?utm_source=...&id_sessao=...` e a visita é gravada como landing-page-02, versão 1.

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
