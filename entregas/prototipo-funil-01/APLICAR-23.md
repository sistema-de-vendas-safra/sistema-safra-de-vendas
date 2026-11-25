---
id: prototipo-funil-01-aplicar-23
versao: 3
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: quiz-01-pagina
    versao: 13
  - id: quiz-01-copy
    versao: 5
  - id: decisoes
    versao: 14
  - id: prototipo-funil-01
    versao: 20
  - id: banco-limpar-leads-de-teste
    versao: 1
desatualizado: true
---

# APLICAR-23 · o relatório com os números da pessoa e a tela dos números só em quantidade, no ar

Roteiro único do Otávio para levar ao ar a página do quiz v13 (decisão #123; prompts/23-relatorio-com-os-numeros-da-pessoa.md; e, na v13, a headline do cabeçalho pedida pelo Otávio em 25/11/2026):

- a tela dos cinco números do funil só em quantidade, sem a opção de porcentagem, e o botão de seguir só aceso com os cinco preenchidos (vendas pode ser zero);
- o relatório e a conversa gratuita com os números que a pessoa escreveu e o valor médio que ela informou, no lugar dos cenários fixos (400 leads, R$ 15 mil por venda, "R$ 120 mil na mesa");
- sem empresa, o topo do relatório sem nome de empresa (some o "Empresa Exemplo");
- quem respondeu "Não" continua com a conta de exemplo, mas o relatório diz com todas as letras que é um funil de exemplo;
- na abertura, a headline "Você já pagou pelas suas próximas vendas" no cabeçalho, no lugar do logo do Safra (v13).

Um passo por ação, com o porquê, "Faça", "Deu certo se" e "Se der errado". Este roteiro não pede chave nenhuma no chat nem em arquivo.

**Substituído pelo APLICAR-24 (v3, 25/11/2026; pedido 24).** Este roteiro não chegou a rodar. O pedido 24 pede uma publicação só, no fim: a página v13 vai ao ar dentro da v14, junto com o garçom v7, a migração 004, a landing-page-02 v7 e a limpeza v2. Não rode este; rode o entregas/prototipo-funil-01/APLICAR-24.md. O texto abaixo fica como histórico.

**Status.** Rascunho. Os textos novos da página são proposta do mentor e continuam rascunho até o Otávio aprovar (copy.md v4; lista em prompts/23-relatorio-com-os-numeros-da-pessoa-resposta.md). Publicar antes da aprovação dos textos é decisão do Otávio.

## O que muda no ar e o que não muda

| Peça | Muda? |
|---|---|
| A página do quiz (/analise/) | **Sim**: vai da v11 para a v13 (a v12, do pedido 23, e a v13, com a headline do cabeçalho). |
| A landing (/) e a política (/politica-de-privacidade/) | Não. São montadas de novo, iguais. |
| O garçom (/api/) | Não. O código é o mesmo; ele sobe junto só porque mora no mesmo Worker e um comando publica tudo. O pacote do fim do quiz tem o mesmo formato (cada número com a unidade, agora sempre "nº"), e o formato antigo, com "%", continua aceito. |
| O banco (Supabase) | Não. Nenhum SQL antes de publicar. versao_entrega continua 2. |
| A planilha do SDR | Não. Ela já lê "nº" como número e "%" como texto, para as respostas antigas. |
| O Google Tag Manager e o Pixel da Meta | Não. Os avisos ao dataLayer (quiz_iniciado, quiz_enviado, quiz_qualificado) são os mesmos. |

---

## Passo 1 · O merge na main (1 min)

**Por quê.** A publicação sai sempre da main (CLAUDE.md, regra 7). No Mac, os commits do pedido 23 (23.1 a 23.4) já estão na main local; falta subir.

**Faça:** no GitHub Desktop, confira que o branch é **main** e clique em **Push origin**.

**Deu certo se:** no GitHub, a main mostra o último commit do pedido 23 ("23.4 · ...").

**Se der errado:** se o GitHub Desktop pedir **Pull** antes, faça o Pull e depois o Push. Se aparecer conflito, não resolva no site: avise o Claude.

---

## Passo 2 · Os testes na máquina, antes de publicar (o Claude, 10 min)

**Por quê.** Ver de novo, na main que vai ao ar, tudo o que o pedido 23 provou.

**Faça:** peça ao Claude: **"pode publicar pelo APLICAR-23"**. Antes de publicar, ele roda, da main:

1. `node nucleo/ferramentas/prints/testar-quiz-01.js` (o quiz em 375, 360 e 1440, com as conferências novas da v12 e a da headline da v13);
2. `node nucleo/ferramentas/ensaio/ensaio.mjs` (o ensaio inteiro: banco de mentira, garçom, site montado, planilha);
3. o teste do garçom, o das migrações e o da planilha, como no APLICAR-22;
4. `git checkout -- entregas/quizzes/quiz-01/prints`, porque o teste do quiz grava os prints de novo e deixaria a main suja (os prints são os mesmos do commit, só regravados), e depois `git status`.

**Deu certo se:** tudo passa ("Tudo certo") e, no fim, o `git status` mostra a main limpa. O Claude anota as contagens no log.md.

**Se der errado:** o Claude não publica e diz o que falhou.

---

## Passo 3 · A chave da Cloudflare no ambiente do Mac (você, 5 min)

**Por quê.** O wrangler só publica com uma chave da Cloudflare, e ela não pode passar pelo chat nem por arquivo do repositório (CLAUDE.md, regra 8). A de 18/11/2026 valia 7 dias e provavelmente já venceu.

**Faça:**

1. Crie uma chave nova pelo passo 2.1 do APLICAR-22: modelo **Edit Cloudflare Workers**, só a zona gotriad.com.br, com prazo para acabar (7 dias basta). Copie o valor.
2. No Terminal do Mac, na mesma janela de onde o Claude Code vai rodar, digite `read -s CLOUDFLARE_API_TOKEN` e Enter, cole o valor (nada aparece na tela) e Enter; depois `export CLOUDFLARE_API_TOKEN`. Abra o Claude Code nessa janela.
3. Não cole o valor no chat, em arquivo, em e-mail nem nos segredos de rede (Network secrets): com eles, a publicação para no meio com 401 (aconteceu em 18/11/2026, 20h17).

**Deu certo se:** no mesmo Terminal, `test -n "$CLOUDFLARE_API_TOKEN" && echo tem chave` mostra **tem chave** (o comando não mostra o valor).

**Se der errado:** se não aparecer "tem chave", repita o item 2 na mesma janela (a variável só vale na janela onde foi criada). Se a Cloudflare não deixar criar a chave, pare aqui: nada foi publicado.

---

## Passo 4 · A publicação (o Claude, 5 min)

**Por quê.** É o mesmo jeito do APLICAR-22 (log.md, entrada de 18/11/2026, "publicação pelo APLICAR-22").

**O que precisa existir:** a chave no ambiente (passo 3) e o wrangler do repositório (`nucleo/ferramentas/prototipo/node_modules/.bin/wrangler`), que já está instalado. O Claude nunca mostra o valor da chave.

**Faça (o Claude, na ordem):**

1. Confere que a main está limpa (`git status`) e é a do passo 1.
2. `wrangler whoami`, para conferir que é a conta do Safra (o e-mail e o ID da conta não vão para arquivo, log nem resposta).
3. `wrangler deployments list --config entregas/prototipo-funil-01/wrangler.toml` e anota o **Version ID que está no ar** (o da última implantação, com 100% do tráfego), para voltar a ele se precisar. Até este roteiro, o último registrado é **cacf72e8-7e95-4d8e-8e2a-9b9ac2d6611d**, de 18/11/2026, 20h52; se o do ar for outro, o Claude para e avisa você: alguém publicou sem registrar.
4. `node entregas/prototipo-funil-01/montar-site.mjs` e depois `wrangler deploy --config entregas/prototipo-funil-01/wrangler.toml`, com `WRANGLER_SEND_METRICS=false`.
5. Registra o Version ID novo (README do protótipo, conexoes.md, log.md e index.md).

**Deu certo se:** a saída mostra o **Current Version ID** novo e os dois endereços (svsafra.gotriad.com.br e o workers.dev antigo).

**Se der errado:** um 401 ou "Authentication" é a chave (vencida, sem a zona, ou nos segredos de rede): volte ao passo 3. Nada muda no ar enquanto o deploy não termina.

---

## Passo 5 · A conferência no ar (o Claude, quando você pedir a publicação, 15 min)

**Por quê.** Ver no endereço de verdade o que o teste provou na máquina. Quem roda é o Claude; você pode repetir qualquer item numa janela anônima.

**Faça:** abra cada item da tabela, um por vez, numa janela anônima nova para cada envio. Em todos os envios, nome começando por **TESTE** e e-mail terminando em **@teste.invalid** (#102), para a limpeza do passo 6 achar.

**Deu certo se:** cada linha bate com a coluna "Certo é".

| O que olhar | Certo é |
|---|---|
| A página nova está no ar | https://svsafra.gotriad.com.br/analise/ abre, e o HTML diz `versao: 13` no cabeçalho de comentário |
| O cabeçalho da abertura | Em /analise/, antes de responder: no lugar do logo do Safra, a frase "Você já pagou pelas suas próximas vendas", inteira, ao lado do botão "Fazer a Análise", no computador e no celular |
| A tela dos números | Respondendo "Sim" em "Você lembra...", a tela diz "Pense em um mês normal e escreva cada número como lembrar." e "Em quantidade, não em porcentagem: ...", as cinco linhas com o "nº" fixo e **nenhum botão "%"**; o botão de seguir apagado com um campo vazio ou com zero nos quatro primeiros, com a dica "Preencha os cinco números para seguir. ..." perto dele; aceso com os cinco e vendas zero |
| Envio que **passa** no corte | As respostas do envio A do APLICAR-22 (passo 5.2), com os números **200, 100, 50, 40 e 2** (pré-qualificados agora em quantidade), nome **TESTE Passa Corte**, e-mail **passa.corte@teste.invalid**, sem empresa. Vai à conversa gratuita; o painel mostra o perfil "Conversa sem fechamento"; "Ver meu diagnóstico" abre o relatório com **200** leads, as taxas 50% · 50% · 80% · 5%, **2** vendas hoje, **8** na meta e **R$ 60 mil** na mesa; o topo sem nome de empresa; nenhum "400", "R$ 120 mil", "Empresa Exemplo" ou "Marina" |
| Envio que **não passa** | As respostas do envio B do APLICAR-22 (passo 5.3), com os números **30, 15, 5, 4 e 1**, nome **TESTE Nao Passa**, e-mail **nao.passa@teste.invalid**. Vai ao relatório de quem não se qualifica, com **30** leads, 1 venda hoje e 1 na meta, dinheiro na mesa **R$ 0** e a frase "Com o volume de hoje, levar a etapa fraca até a meta ainda não soma uma venda inteira a mais por mês..." |
| Um "**Não**" | As mesmas respostas do envio que passa, menos os números: "Não" em "Você lembra..." e **Mais de 75%** na pergunta seguinte; nome **TESTE Nao Lembra**, e-mail **nao.lembra@teste.invalid**. Vai à conversa gratuita, com o painel dizendo "Perfil do exemplo"; "Ver meu diagnóstico" abre o relatório que diz "exemplo · sem os seus números" e "[nome], sem os seus números, este é um funil de exemplo."; o dinheiro na mesa diz "por mês · no exemplo"; nenhum "Suas 4 etapas", "Onde sua equipe perde" ou "Pela sua estimativa" |
| No banco (SQL do passo 5.4 do APLICAR-22, com os três e-mails) | TESTE Passa Corte: faixa a, nota 96; TESTE Nao Passa: faixa c, nota 24; TESTE Nao Lembra: faixa a, nota 83 (5 pontos nos leads e 7 no dinheiro na mesa, por não lembrar); as notas são as de antes da v12 (o lead score não mudou) |
| Na planilha do SDR | TESTE Passa Corte e TESTE Nao Lembra aparecem (faixa a); TESTE Nao Passa não aparece (faixa c) |
| Nada mais mudou | A landing, a política e o aviso de cookies iguais aos de 18/11/2026; o dataLayer com os mesmos avisos de antes |

**Se algo der errado:** o Claude volta à versão anotada no passo 4 (ver "Como voltar atrás") e avisa você. O banco e a planilha não precisam voltar.

---

## Passo 6 · A limpeza dos leads de teste (você, 5 min)

**Por quê.** Os envios do passo 5 são de mentira e não podem ficar no banco nem na planilha.

**Faça:** no SQL Editor do Supabase (projeto sistema-de-vendas-safra), consulta nova, cole o arquivo inteiro `dados/banco/limpar-leads-de-teste.sql` (do GitHub, **Copy raw file**) e clique em **Run**. Ele apaga só as pessoas com as **duas** marcas juntas (nome começando por TESTE e e-mail em @teste.invalid) e os eventos delas, numa transação só, e confere tudo antes: se algo não bater, nada é apagado. Rode numa hora sem teste em curso: enquanto apaga, a tabela de eventos fica parada por um instante (o próprio arquivo pede isso). Na planilha, apague as linhas de **TESTE Passa Corte** e de **TESTE Nao Lembra** nas abas fila e respostas (o TESTE Nao Passa, faixa c, não chega à planilha, que só recebe as faixas a e b).

**Deu certo se:** o resultado mostra as contagens, com as pessoas de teste saindo e o resto igual, sem erro; e a planilha fica sem nenhuma linha com nome começando por TESTE.

**Se der errado:** não rode de novo às cegas: avise o Claude, com a mensagem em vermelho. **Não dá para desfazer** depois do commit da transação: por isso o arquivo confere antes de apagar.

---

## Passo 7 · Tirar a chave (você, 2 min)

**Por quê.** A chave só servia para esta publicação. Deixá-la viva é deixar uma porta aberta sem uso.

**Faça:** no Terminal do passo 3, `unset CLOUDFLARE_API_TOKEN` (ou feche a janela). No painel da Cloudflare, em **My Profile → API Tokens**, ache a chave criada no passo 3 e clique em **Delete**, para revogar.

**Deu certo se:** `test -n "$CLOUDFLARE_API_TOKEN" && echo tem chave` não mostra nada, e a chave some da lista (ou aparece revogada) no painel.

**Se der errado:** se a chave não sumir, ela vence sozinha no prazo que você deu no passo 3; avise o Claude para anotar no log.md.

---

## Como voltar atrás

**Por quê.** Se a conferência do passo 5 achar algo errado no ar, a volta põe de novo a versão anterior inteira (a página v11; o garçom é o mesmo nas duas), sem esperar conserto.

**Faça (o Claude):** `wrangler rollback <Version ID anotado no passo 4> --config entregas/prototipo-funil-01/wrangler.toml`, com a mesma chave no ambiente. O site e o garçom voltam juntos à versão anterior (a v11 da página, com o relatório de exemplo). O banco e a planilha não precisam de nada: eles aceitam os dois formatos.

**Deu certo se:** https://svsafra.gotriad.com.br/analise/ volta a mostrar a tela dos números com o botão "%", e `wrangler deployments list` mostra a versão anotada com 100% do tráfego.

**Se der errado:** se o rollback falhar com 401, a chave saiu do ambiente ou venceu: refaça o passo 3 e rode de novo. Se falhar por outro motivo, o Claude não tenta outro caminho: avisa você com a mensagem, e o site fica na v12 até decidir.

---

## Fontes

- Decisão #123 (base/decisoes.md v14); prompts/23-relatorio-com-os-numeros-da-pessoa.md; log.md, entrada de 25/11/2026.
- entregas/quizzes/quiz-01/pagina/index.html v13 e copy.md v5 (a v13 e a copy v5: log.md, entrada de 25/11/2026, "headline no cabeçalho da abertura"); nucleo/ferramentas/prints/testar-quiz-01.js e nucleo/ferramentas/ensaio/ensaio.mjs (as pessoas de teste e as contas).
- entregas/prototipo-funil-01/APLICAR-21.md (o `deployments` com a mesma `--config`, para ver a versão no ar); entregas/prototipo-funil-01/APLICAR-22.md v4 (passos 2.1, 2.2, 5.2, 5.3 e 5.4) e log.md, entrada de 18/11/2026, "publicação pelo APLICAR-22" (a chave na variável de ambiente, o Version ID cacf72e8).
- dados/banco/limpar-leads-de-teste.sql v1.
