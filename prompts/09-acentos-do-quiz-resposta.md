# 09 · Resposta · acentos do quiz e registros de 09/11

Pedido: prompts/09-acentos-do-quiz.md. Feito direto, sem subagentes, num commit só. Nada publicado.

## O que mudou

- **Garçom v3** (entregas/garcom/): HTML, CSS e JavaScript que chegam sem charset saem com "; charset=utf-8". Teste: 133 de 133 (12 conferências novas). De quebra, as correções de forma guardadas para esta versão: wrangler.toml.exemplo apagado (22.8) e o teste sem a troca do exemplo do quiz (23.4).
- **Montador, protótipo v3** (entregas/prototipo-funil-01/montar-site.mjs): `<meta charset="utf-8">` como primeiríssima linha do quiz montado, antes do comentário de cabeçalho; o "Tudo certo" confere a meta nos primeiros 1024 bytes de todo HTML. A página do quiz em entregas/ não mudou.
- **Ensaio v2** (nucleo/ferramentas/ensaio/): charset utf-8 no Content-Type das três páginas e dos três CSS, meta charset no começo, quiz lido como UTF-8 com o título certo, texto do consentimento com os acentos certos no banco local. 96 de 96 com o wrangler dev; 94 de 94 no contorno. Com o código antigo de volta, o ensaio novo falha (7 FALHOU no contorno, 1 no wrangler dev).
- **LIGAR.md v2:** nome garcom_planilha_prototipo, plano B do login (3.4), aviso das chaves antigas (2.11), frase nova do "Tudo certo" (3.6), conferência dos acentos e comando para publicar de novo (3.7).
- **Registros de 09/11** em log.md e conexoes.md: 26.9 e 26.11 aceitas; Supabase (esquema v2, conferir.sql 13 de 13, catálogo, chave secreta, chaves antigas desativadas); wrangler logado e Worker publicado; pendência nova das JWT signing keys.

## Por que o ensaio de ontem não pegou

O wrangler dev local já acrescenta "; charset=utf-8" aos arquivos; a Cloudflare de verdade não. Conferido agora: com o garçom e o montador antigos, o ensaio no wrangler dev só falha na meta do quiz, e no contorno (que agora entrega sem charset, como a Cloudflare) falha em tudo.

## Para publicar de novo

Da raiz do repositório, com o wrangler já logado (os segredos continuam no cofre):

```
node entregas/prototipo-funil-01/montar-site.mjs && nucleo/ferramentas/prototipo/node_modules/.bin/wrangler deploy --config entregas/prototipo-funil-01/wrangler.toml
```

Depois, abrir /quiz/ e conferir "diagnóstico" escrito certo.

## Perguntas para o Otávio

09.1. **O doctype do quiz.**
   - *Dúvida:* a página do quiz não tem `<!doctype html>` e roda em modo de compatibilidade (document.compatMode "BackCompat"). O pedido manda não acrescentar agora e registrar como pergunta.
   - *O que foi feito:* nada no doctype. O ensaio mostra o modo numa linha INFO. Pendência nova no log.md.
   - *Recomendação:* antes de ir ao ar, numa versão nova da página do quiz em entregas/, pôr `<!doctype html>` e `<meta charset="utf-8">` como as duas primeiras linhas (o doctype tem de vir antes de tudo, inclusive da meta e do comentário), tirar novos prints em 375 e 1440 e comparar com os de hoje. O modo padrão pode mudar alturas, margens e tamanhos de fonte em tabela. Com a meta na própria página, o montador passa a dizer "meta charset já existia no início", sem outra mudança.
   - *Se decidir diferente:* se o doctype entrar pelo montador, só no site, o desenho muda sem prints da entrega; se ficar sem doctype para sempre, a página segue em BackCompat, o que funciona hoje, mas cada navegador desenha esse modo do seu jeito.

09.2. **Quais tipos ganham charset no garçom.**
   - *Dúvida:* o pedido fala em text/html, text/css e JavaScript.
   - *O que foi feito:* text/html, text/css, text/javascript, application/javascript e application/x-javascript, sem diferença de maiúscula. Um charset que já vem (até um diferente, como iso-8859-1) fica como veio; outros tipos (imagem, JSON, texto puro, SVG) e arquivo sem Content-Type não mudam. O site de hoje só tem HTML, CSS e uma imagem.
   - *Recomendação:* manter. Se um dia o site tiver SVG ou .txt com acento, acrescentar o tipo à lista numa versão nova.
   - *Se decidir diferente:* trocar um charset que já vem por utf-8 é uma linha em comCharset e um caso no teste.

09.3. **Registros que o pedido não disse.**
   - *Dúvida:* o pedido diz que o Worker foi publicado, mas não diz se os três segredos já estão no cofre (passos 3.8 a 3.12) nem se o teste da parte 5 rodou.
   - *O que foi feito:* conexoes.md registra o login do wrangler e a chave secreta em 09/11/2026 e deixa "Segredos do Worker: a registrar". Nada foi escrito sobre o teste da parte 5.
   - *Recomendação:* contar ao Claude a data em que os segredos foram guardados e o resultado do teste, para fechar conexoes.md e o log.md.
   - *Se decidir diferente:* nada muda no código.

09.4. **O que entrou no LIGAR.md além do pedido.**
   - *Dúvida:* o pedido manda trocar o nome da chave e acrescentar o plano B do login.
   - *O que foi feito:* também o aviso das chaves antigas no 2.11 (o mesmo texto da pendência nova), a frase nova do "Tudo certo" no 3.6 (o montador mudou a frase) e, no 3.7, conferir os acentos do quiz e o comando único para publicar de novo. Os READMEs do garçom e do protótipo, o wrangler.toml (só o comentário) e o index.md passaram a dizer que o protótipo foi publicado em 09/11.
   - *Recomendação:* manter: são forma, e o 3.6 sem a frase nova faria o Otávio achar que deu errado.
   - *Se decidir diferente:* cada acréscimo é um trecho do LIGAR.md; o 3.6 tem de acompanhar a frase do montador.
