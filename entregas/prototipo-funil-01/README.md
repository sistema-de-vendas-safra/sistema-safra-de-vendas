---
id: prototipo-funil-01
versao: 4
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: garcom
    versao: 4
  - id: quiz-01-pagina
    versao: 3
  - id: landing-page-01-variante-a
    versao: 3
  - id: landing-page-01-variante-b
    versao: 3
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

O site de teste do funil-01 num Worker só da Cloudflare, o safra-prototipo-funil-01 (decisão #101): as duas variantes da landing-page-01, o quiz-01 e o garçom no mesmo endereço, https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev. **Publicado pela primeira vez em 09/11/2026** (Current Version ID 7c6024d7-ff13-4ab8-b9f7-1a58213c0909), só com leads de teste. Nessa publicação o quiz saiu com os acentos quebrados; a correção é a v3 (pedido 09). A v4 (etapa 34) monta as páginas novas (quiz v3, landings v3) com as fontes servidas junto; nada disso foi publicado. Esta pasta tem a configuração do Worker, o script que monta o site a partir das entregas, os prints do site montado e o roteiro para ligar.

**Para ligar:** LIGAR.md, nesta pasta, é o passo a passo do Otávio para o dia de ligar o protótipo (push, Supabase, Cloudflare, planilha, teste com leads de mentira, o que fazer se der errado e como desligar).

**Protótipo de teste não é entrega.** Serve só para o Otávio testar o caminho do dado com leads de mentira (#102: nome começando por TESTE, e-mail @teste.invalid). Ir ao ar com gente de verdade continua travado: o destino dos contatos está em conflito (conflito-17, em base/lacunas.md; o garçom segue o lado 2, #90, sem escolher), as páginas e o garçom são rascunhos pendentes de aprovação (do Otávio e, nas páginas, do Júnior e do Euclides) e, antes de tráfego real, falta a proteção contra robô e o limite de pedidos (log.md, Pendências).

**Status.** Rascunho, pendente do Otávio. Nasce desatualizado, porque se apoia em documentos marcados (garcom, quiz-01-pagina, as duas variantes da landing, banco-rascunho e lacunas; regra provisória 11.1).

## O que tem dentro

| Arquivo | O que é |
|---|---|
| LIGAR.md | O roteiro para ligar o protótipo, para iniciante, passo a passo, com o tempo de cada passo e como saber que deu certo (id prototipo-funil-01-ligar) |
| wrangler.toml | A configuração do Worker: nome, main apontando para ../garcom/garcom.mjs, arquivos pelo binding ASSETS com run_worker_first, preview_urls = false (um endereço só, #101), as duas variáveis comuns e, só em comentário, o nome dos três segredos. Sem id de conta e sem segredo |
| montar-site.mjs | Monta a pasta site/ a partir das entregas. Node, sem dependências próprias; as fontes vêm de nucleo/ferramentas/fontes/ (`npm install` lá dentro) |
| prints/ | Prints das três páginas montadas em 375 e 1440 pixels |
| site/ | A pasta montada. Fica fora do Git (.gitignore) e é refeita a cada montagem |

## Mapa de rotas

| Endereço | O que responde | De onde vem |
|---|---|---|
| / | Variante A da landing-page-01 (design system v1.0) | entregas/landings/landing-page-01/variante-a-design-system-v1/ (index.html, tokens.css, estilo.css) |
| /b/ | Variante B da landing-page-01 (branco e verde) | entregas/landings/landing-page-01/variante-b-branco-e-verde/ (index.html, estilo.css) |
| /quiz/ | Quiz-01 | entregas/quizzes/quiz-01/pagina/ (index.html, poster-junior.jpg) |
| /fontes/ e /quiz/fontes/ | As fontes da variante A (Geist) e do quiz (Inter, Space Grotesk, Permanent Marker), com a licença de cada uma; a variante B usa a letra do sistema | nucleo/ferramentas/fontes/node_modules/ (pacotes @fontsource, lista em fontes.json) |
| POST /api/fim-quiz | Porta pública do garçom: o quiz manda o pacote do fim | entregas/garcom/garcom.mjs |
| POST /api/evento | Porta pública do garçom: a visita das landings, o início do quiz e o clique do fim, sem dado de pessoa (garçom v4) | entregas/garcom/garcom.mjs |
| GET /api/planilha/leads-novos | Porta privada do garçom: só a planilha do SDR, com a CHAVE_PLANILHA | entregas/garcom/garcom.mjs |

As rotas /api/ são atendidas pelo garçom antes dos arquivos. Todo pedido passa pelo Worker (run_worker_first = true), e o garçom põe o cabeçalho X-Robots-Tag: noindex em toda resposta, inclusive nos arquivos, e o charset utf-8 em todo HTML, CSS e JavaScript que a Cloudflare entrega sem charset (garçom v3). Além do cabeçalho, todo HTML do site tem a meta robots noindex, nofollow e a meta charset utf-8 no começo.

O botão da seção 08 das duas variantes leva a /quiz/ com as utm do endereço da landing (as que existirem: utm_source, utm_medium, utm_campaign, utm_content, utm_term) e o código de sessão da visita, no parâmetro id_sessao, no formato do banco (10.5). Exemplo para testar: /?utm_source=bio&utm_campaign=funil-01. O quiz só lê utm_source e utm_campaign, da lista do funil-01 (pergunta 23.5).

## Como montar

Da raiz do repositório:

```
node entregas/prototipo-funil-01/montar-site.mjs
```

O script apaga site/ e monta de novo. Copia só os arquivos do mapa (nada de README nem prints) e as fontes de cada página, de nucleo/ferramentas/fontes/ (v4, 10.7); se uma fonte faltar, diz para rodar `npm install` lá e sai com erro. Nos HTML montados, e nunca nas entregas: acrescenta `<meta charset="utf-8">` como primeiríssima linha quando não houver nos primeiros 1024 bytes (só o quiz, que não tem; o navegador só procura o charset nesse começo, e o comentário de cabeçalho do quiz passa disso; v3, pedido 09); acrescenta `<meta name="robots" content="noindex, nofollow">` quando não houver (o quiz não tinha; as landings já tinham); acrescenta `<meta name="viewport" content="width=device-width, initial-scale=1">` antes do `<title>` quando não houver (só o quiz: sem ela, o celular desenha a página com 980 pixels e encolhe; a entrega fica para uma v3, conflito-18, pergunta 23.8); e troca o link do botão da landing para o quiz, que nas entregas é o caminho do repositório (para a revisão local), por /quiz/. Depois confere cada caminho relativo de css, imagem e link nos arquivos montados, a meta charset nos primeiros 1024 bytes, a meta noindex e a meta viewport em todo HTML, a ausência do caminho do repositório e (v4) que nenhuma página pede arquivo a outro endereço: nenhum src, link, url() ou @import para http(s) e nenhuma menção a fonts.googleapis ou fonts.gstatic. Se algo falhar, diz o que e sai com erro.

Resultado (09/11/2026, v4):

```
Site montado em entregas/prototipo-funil-01/site/
  index.html (link do quiz trocado por /quiz/; meta charset já existia no início; meta noindex já existia; meta viewport já existia)
  tokens.css (cópia)
  estilo.css (cópia)
  b/index.html (link do quiz trocado por /quiz/; meta charset já existia no início; meta noindex já existia; meta viewport já existia)
  b/estilo.css (cópia)
  quiz/index.html (meta charset já existia no início; meta noindex acrescentada; meta viewport acrescentada)
  quiz/poster-junior.jpg (cópia)
  fontes/geist-latin-wght-normal.woff2 (cópia de @fontsource-variable/geist, com licenca-geist.txt)
  quiz/fontes/inter-latin-wght-normal.woff2 (cópia de @fontsource-variable/inter, com licenca-inter.txt)
  quiz/fontes/space-grotesk-latin-wght-normal.woff2 (cópia de @fontsource-variable/space-grotesk, com licenca-space-grotesk.txt)
  quiz/fontes/permanent-marker-latin-400-normal.woff2 (cópia de @fontsource/permanent-marker, com licenca-permanent-marker.txt)
15 arquivos, 665 KB; 10 caminhos relativos conferidos
Tudo certo: charset utf-8 no início, noindex e viewport em todo HTML, link da landing para /quiz/, todos os caminhos existem no site e nenhuma página pede arquivo a outro endereço.
```

Desde a v4, as três páginas já trazem o doctype e a meta charset no começo (quiz v3, landings v3; 09.1), e o montador não acrescenta doctype. Procura no site montado (html, css e js) por endereço http: só aparecem o `xmlns` do desenho em SVG dentro de um `data:` no estilo.css da variante A (não é pedido a ninguém) e o https://wa.me/ do botão do WhatsApp do quiz, que só abre no clique e só com o número preenchido (hoje vazio). As licenças copiadas (licenca-*.txt) citam endereços no texto, mas não são páginas (pergunta 34.10).

Conferido também num servidorzinho local em 127.0.0.1: em / e em /b/, com `?utm_source=bio&utm_medium=social&utm_campaign=funil-01&utm_term=`, o botão vira `/quiz/?utm_source=bio&utm_medium=social&utm_campaign=funil-01&id_sessao=...` (a utm vazia não vai) e o clique abre a capa do quiz.

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

- variante-a-375.png e variante-a-1440.png (/)
- variante-b-375.png e variante-b-1440.png (/b/)
- quiz-capa-375.png e quiz-capa-1440.png (/quiz/, na capa)

Em 1440, as landings saíram com a mesma altura dos prints das entregas (entregas/landings/landing-page-01/prints/), sinal de que o css carregou igual. Estes prints são da v3 do montador e não foram tirados de novo na etapa 34: os prints novos das páginas estão em cada entrega (entregas/quizzes/quiz-01/prints/ e entregas/landings/landing-page-01/prints/).

## Antes do teste

O banco confere o par (entrega, versão) do pacote no catálogo (public.entregas), que o esquema não preenche. As páginas da etapa 34 mandam ('quiz-01', 2) e ('landing-page-01', 1): sem essas linhas, o fim do quiz volta 422 e o visitante vê o aviso de falha, e a visita e o início do quiz se perdem sem aviso (pergunta 23.10; 32.4). As linhas são gravadas por dados/banco/catalogo-prototipo.sql (v2, que acrescenta as duas novas sem mexer na ('quiz-01', 1)); o passo a passo novo é o roteiro da etapa 35 (LIGAR.md ainda descreve a v1).

## O que não fazer

- **Não publicar.** Publicar é só pelo roteiro LIGAR.md, nesta pasta, depois do push e do SQL no Supabase.
- Não fazer login na Cloudflare fora do roteiro; não pôr account_id nem segredo no wrangler.toml.
- Não editar nada em site/: ela é refeita a cada montagem. Mudança vai na entrega, que sobe de versão.
- Não usar o protótipo com gente de verdade (conflito-17, aprovações e proteção contra robô, acima).

## Perguntas

prompts/08-fila-perguntas.md, seções "Etapa 23" e "Etapa 26"; prompts/11-fila-perguntas.md, "Etapa 34".
