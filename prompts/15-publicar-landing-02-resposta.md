# 15 · Resposta · publicação da landing-page-02

Feito em 12/11/2026, no Claude Code online, direto, sem subagentes, em dois commits na main (regra 7, exceção até 16/11/2026): "15 · publicação do protótipo com a landing-page-02" e "15 · pendências da publicação".

## O que foi feito

- **Publicado em 12/11/2026, 10h14 (Brasília)**, da main no 19e2a84, pelo passo 4.3 do APLICAR-11.md, com o token de API da Cloudflare na variável CLOUDFLARE_API_TOKEN do ambiente da nuvem e WRANGLER_SEND_METRICS=false. **Current Version ID: e344fcdd-d17f-47e6-9353-59e5579d86e3.** Versão anterior: c4235168-4d3c-46b5-b721-8be77fdd3cb3 (09/11/2026, 19h16). O valor do token não foi escrito em arquivo, log ou chat (conferido por busca no repositório inteiro).
- **Conferido antes:** npm ci em nucleo/ferramentas/fontes e em nucleo/ferramentas/prototipo; wrangler 4.158.0; whoami na conta do Safra; a c4235168 em 100%; montagem com "Tudo certo".
- **Conferido no ar**, num navegador sem tela, em 1440 e em 375 pixels: / abre a landing-page-02; os dois botões de Análise levam a /quiz/ com as utm e o id_sessao; o quiz abre na capa, com os acentos certos; as duas páginas cabem no celular; nenhum pedido a outro endereço; `X-Robots-Tag: noindex` e charset utf-8 nas respostas.
- **A visita da landing-page-02 é recusada pelo banco (422)**: o catálogo tem as três linhas gravadas em 09/11 e ainda não tem a (landing-page-02, 1). O início do quiz (quiz-01, 2) foi gravado (201). O resto funciona. Sem rollback, porque a página e o quiz abriram, que era o critério do pedido.
- **O que a conferência gravou no banco:** um início do quiz sem pessoa (utm_source bio, utm_campaign funil-01), por volta das 10h20. Nenhum fim do quiz, nenhum contato.
- **Rede do ambiente:** o endereço do protótipo entrou nos hosts permitidos do ambiente da nuvem sistema-de-vendas-safra (aprovado na tela de aprovação), porque a rede recusava o endereço e não dava para conferir.
- **Registros:** entregas/prototipo-funil-01/README.md v6 para v7 (seção "Publicações"); log.md; conexoes.md (linha da Cloudflare: a versão no ar e o token da nuvem, onde mora, como revogar e até quando); index.md (protótipo, garçom, landing-page-02 e este pedido). A linha do Supabase no conexoes.md não mudou: pelo pedido 14, ela só muda quando o Otávio avisar que fez a parte 7 do APLICAR-11.

Nenhum SQL no Supabase, nenhuma mudança no texto da página, nada em fontes/, nenhum dado de pessoa.

## O que falta, e é do Otávio

1. **Gravar o catálogo v3**, para a visita da landing-page-02 ser contada. No Windows não há pbcopy: abra dados/banco/catalogo-prototipo.sql na main pelo site do GitHub, copie o conteúdo (botão de copiar do arquivo), cole numa consulta nova do SQL Editor do Supabase e clique em Run. Deu certo se aparecerem quatro linhas: landing-page-01 1, landing-page-02 1, quiz-01 1 e quiz-01 2. Rodar de novo não duplica. Depois, o Claude confere no ar que a visita passa a voltar 201 (isso grava uma visita sem pessoa).
2. **Apagar o token, até 16/11/2026**: a variável CLOUDFLARE_API_TOKEN nas configurações do ambiente da nuvem e o token no painel da Cloudflare (My Profile, API Tokens). As duas coisas: apagar só a variável deixa o token valendo.
3. **O teste com pessoas de mentira** (APLICAR-11.md, parte 6) continua valendo para conferir o fim do quiz, o clique e a planilha com a página nova; ele não foi feito nesta publicação.

## Perguntas para o Otávio

**15.1 · Publicado sem o sim sobre o catálogo.**
- Dúvida: o pedido 15, passo 2, mandava perguntar se o catalogo-prototipo.sql v3 já tinha rodado e não publicar sem esse sim. O pedido feito na sessão de 12/11/2026 mandou publicar direto, com o critério de voltar só se a página ou o quiz não abrissem.
- O que foi feito: valeu o pedido da sessão, que é o mais recente e veio do Otávio. Publicado; a visita volta 422; página e quiz abrem; sem rollback.
- Recomendação: rodar o catálogo v3 (item 1 acima). É o caminho mais curto, e a página nova fica no ar.
- Se decidir diferente: voltar para a c4235168 (as variantes da landing-page-01, cuja visita o catálogo já aceita) até o catálogo rodar, numa sessão com o token: `nucleo/ferramentas/prototipo/node_modules/.bin/wrangler rollback c4235168-4d3c-46b5-b721-8be77fdd3cb3 --config entregas/prototipo-funil-01/wrangler.toml -m "catalogo v3 pendente"`. Depois do catálogo, publicar de novo pelo passo 4.3.

**15.2 · O endereço do protótipo na rede do ambiente da nuvem.**
- Dúvida: o endereço entrou nos hosts permitidos do ambiente sistema-de-vendas-safra para a conferência. Fica ou sai?
- O que foi feito: ficou.
- Recomendação: deixar. É um site público de teste, sem chave, e deixa o Claude conferir no ar depois do catálogo e de cada publicação.
- Se decidir diferente: tirar nas configurações do ambiente (Network access, Allowed domains), ou pedir ao Claude, que mostra a tela de aprovação.

**15.3 · index.md sem os pedidos 12 a 14.**
- Dúvida: a linha de prompts/ do index.md parava no 11; os pedidos 12 (descartado), 13 (ainda não rodado) e 14 (estado para o mentor) não estão no mapa.
- O que foi feito: entrou só o 15, que é deste pedido.
- Recomendação: o pedido 13, quando rodar, acrescenta os três.
- Se decidir diferente: o Claude acrescenta agora, como forma.
