# 09 · Correção dos acentos do quiz no protótipo

Escrito em 09/11/2026, 07h55, pelo mentor. Correção pequena: faça direto, sem subagentes, seguindo CLAUDE.md, num commit só ("09 · acentos do quiz e registros de 09/11"). Este arquivo entra no commit.

## O problema

O protótipo foi publicado em https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev (Current Version ID 7c6024d7-ff13-4ab8-b9f7-1a58213c0909). As landings em / e /b/ aparecem certas. O quiz em /quiz/ aparece com os acentos quebrados ("estÃ¡", "diagnÃ³stico", título "nome pÃºblico da AnÃ¡lise").

Diagnóstico feito no navegador:

- As três páginas chegam com o cabeçalho Content-Type "text/html", sem charset.
- As landings têm `<meta charset="utf-8">` nos primeiros bytes e por isso se salvam.
- A página do quiz não tem `<meta charset>`, nem doctype, nem `<head>` (herança do mockup original, que era um fragmento feito para o visualizador do Claude). O navegador lê como windows-1252 (document.characterSet) e entra em modo de compatibilidade (document.compatMode = "BackCompat").
- Isso não é só visual: os textos que o quiz monta e manda ao banco (texto do consentimento, respostas) sairiam estragados.
- O ensaio geral não pegou porque o servidor local e o navegador sem tela não reproduziram a falta de charset.

## O que fazer

1. **Garçom:** toda resposta de arquivo do tipo text/html, text/css ou JavaScript que chegue sem charset sai com "; charset=utf-8". Teste local cobrindo isso. Versão nova do garçom, como manda a regra.
2. **Montador do site:** acrescenta `<meta charset="utf-8">` como primeiríssima linha do quiz no site montado, antes do comentário de cabeçalho (o navegador só procura o charset nos primeiros 1024 bytes), e confere isso no "Tudo certo". A página do quiz em entregas/ não muda.
3. **Doctype:** não acrescentar agora, porque muda o modo de desenho da página e pode mexer no layout. Registrar como pergunta para antes de ir ao ar, com recomendação.
4. **Ensaio geral:** acrescentar a conferência de que todo HTML servido sai com charset utf-8 e de que o quiz carrega com document.characterSet "UTF-8", e de que o texto do consentimento chega ao banco local com os acentos certos. Rodar o ensaio inteiro.
5. **Registros de 09/11/2026** (log.md, conexoes.md e onde mais a casa mandar):
   - O Otávio aceitou as recomendações de 26.9 e 26.11.
   - No Supabase: esquema v2 aplicado, conferir.sql com 13 de 13, linha do catálogo gravada, chave secreta criada com o nome garcom_planilha_prototipo (com sublinhado), chaves antigas (JWT) desativadas.
   - Pendência nova antes de ir ao ar: desativar as chaves antigas não as aposenta de vez (o painel avisa que continuam válidas como JWT); aposentar com a troca da assinatura do projeto (JWT signing keys).
   - Wrangler logado na conta do Safra (OAuth, guardado no usuário do Mac, fora do repositório) e Worker publicado.
   - LIGAR.md: trocar garcom-planilha-prototipo pelo nome real; no passo 3.4, acrescentar o plano B que funcionou: se aparecer "request_forbidden" (No CSRF value), apertar Ctrl+C e rodar `wrangler login --browser=false`, colando o endereço no navegador onde a conta da Cloudflare já está aberta.
6. Proibido: publicar (o Otávio publica pelo roteiro), push, chave de verdade, mexer em fontes/.

## Ao terminar

Responda em até 6 linhas: o que mudou, resultado dos testes e do ensaio, o commit e o comando único para o Otávio remontar o site e publicar de novo.
