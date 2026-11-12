# 15 · Publicar o protótipo com a landing-page-02

Escrito em 12/11/2026, pelo mentor. Pedido curto, sem fila. Roda numa sessão nova do Claude Code online, no ambiente "sistema-de-vendas-safra", depois que o Otávio deixar o CLOUDFLARE_API_TOKEN nas variáveis do ambiente, tirar o token de Network secrets e liberar api.cloudflare.com na rede.

## Para que serve

Publicar hoje, sem o Mac, o protótipo do funil-01 com a landing-page-02 (commit c8b494b). Decisão do Otávio, 12/11/2026: "Precisamos publicar hoje." A tentativa anterior parou em 401 porque o token estava em Network secrets, e o intermediário de rede trocava a senha temporária que a Cloudflare dá para o envio dos arquivos.

## Como trabalhar

- Leia CLAUDE.md. Valem todas as regras da casa.
- Este pedido é a autorização para publicar, uma vez, a versão da main, pelo passo 4.3 do entregas/prototipo-funil-01/APLICAR-11.md.
- Proibido: escrever, mostrar ou registrar o valor do token, em arquivo, no chat ou em log; rodar SQL no Supabase, que é do Otávio; mudar o texto da página (decisão do Otávio, 12/11/2026); push fora do que a regra 7 permite; mexer em fontes/.
- Nunca travessão. Use ponto médio.

## O que fazer

1. **Conferir, sem publicar.** O wrangler entra na conta do Safra com o token do ambiente (whoami). A versão no ar é a c4235168: anote, para voltar a ela se precisar. A main está no c8b494b ou depois. A montagem termina com "Tudo certo".
2. **Perguntar ao Otávio e esperar a resposta:** ele já rodou dados/banco/catalogo-prototipo.sql no SQL Editor do Supabase, e o resultado mostrou as quatro linhas? Sem esse sim, não publique, porque a visita da página nova seria recusada.
3. **Publicar** pelo passo 4.3 do APLICAR-11. Anote o Current Version ID novo.
4. **Conferir no ar**, no endereço do protótipo: / abre a página nova; os dois botões de Análise abrem /quiz/ com as utm e o id_sessao; o quiz carrega; a página não pede nada a outro endereço. Se precisar ir até o fim do quiz, só com gente de mentira (nome começando por TESTE, e-mail terminado em @teste.invalid).
5. **Se algo falhar no ar,** volte para a c4235168 (wrangler rollback) e conte ao Otávio o que viu.
6. **Registrar** no log.md a publicação, o Version ID novo, a versão anterior e o jeito de publicar desta vez (token de API nas variáveis do ambiente da nuvem, temporário até 16/11/2026), sem valor de chave. No conexoes.md, a mesma linha sobre o jeito de publicar. Não criar o ESTADO.md: ele é do pedido 14.

## Como saber que deu certo

O deploy termina com o Version ID novo, e a página nova abre no endereço do protótipo com os dois botões levando ao quiz.

## No fim

Resposta em prompts/15-publicar-landing-02-resposta.md, com o Version ID novo e as perguntas, se houver. Um commit ("15 · publicação da landing-page-02") e, no fim da resposta, a lista dos commits que subiram (regra 7). Termine lembrando o Otávio, em duas linhas, de apagar a variável CLOUDFLARE_API_TOKEN do ambiente e o token na Cloudflare (Profile › API Tokens).
