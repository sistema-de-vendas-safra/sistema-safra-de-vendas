---
id: prototipo-funil-01-aplicar-24
versao: 2
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: quiz-01-pagina
    versao: 15
  - id: quiz-01-copy
    versao: 7
  - id: garcom
    versao: 7
  - id: banco-migracao-004
    versao: 1
  - id: banco-limpar-leads-de-teste
    versao: 2
  - id: landing-page-02
    versao: 8
  - id: ficha-de-fatos
    versao: 8
  - id: decisoes
    versao: 16
  - id: prototipo-funil-01
    versao: 22
desatualizado: true
---

# APLICAR-24 · as correções antes dos anúncios, no ar numa vez só

Roteiro único do Otávio para levar ao ar, antes dos anúncios da Meta de 30/11/2026 (que vão direto para https://svsafra.gotriad.com.br/analise/), as cinco correções do pedido 24 (prompts/24-correcoes-antes-dos-anuncios.md):

1. o relatório com os números da pessoa e, para quem não lembra, o funil pelas metas do método, dito como metas; "sua empresa" no lugar de "Empresa Exemplo" (página do quiz v15, que leva junto a v12 e a v13 do pedido 23 e a v14 do pedido 24);
2. a proteção contra robô e o limite de pedidos no garçom v7, com a contagem das recusas no banco;
3. a Análise sempre gratuita (#124): "Sempre gratuita" na abertura do quiz e, na landing, nenhuma barra de escassez nem promoção (o R$ 497 riscado fica: #126, abaixo);
4. o início do quiz com utm_medium, utm_content e utm_term (migração 004);
5. a limpeza dos leads de teste e da sua linha real de 09/11/2026, no banco e nas duas abas da planilha, contada antes e depois;
6. (v2) as suas respostas ao pedido 24, de 25/11/2026 (prompts/24-decisoes-do-otavio.md; #126 a #131), que vão na mesma publicação: o R$ 497 riscado de volta na landing (#126); "Análise Estratégica do Sistema de Vendas" em tudo, também nas chamadas da landing (#127); o logo do Safra fora de todas as páginas (#129); o botão "Telas" escondido no ar (#130); e a contagem "O seu mês vira em N dias e H horas." com os números calculados pela data de verdade (#131).

**Substitui o APLICAR-23**, que não chegou a rodar: tudo o que ele levava ao ar vai junto aqui.

Um passo por ação, com o porquê, "Faça", "Deu certo se" e "Se der errado". **A chave da Cloudflare nunca vem para a conversa:** ela entra pela variável de ambiente (passo 4), e no fim você apaga a variável e revoga a chave (passo 8).

**Status.** Rascunho. Os textos novos (o relatório de quem não lembra, "Sempre gratuita" e as frases da landing) foram aprovados por você em 25/11/2026, com a exceção do R$ 497 riscado, que volta (quiz-01-copy v7; #126).

**Versão 2 (25/11/2026).** Entram as suas respostas ao pedido 24 (item 6 acima): na tabela abaixo, a página do quiz passa a v15 e a landing a v8; o passo 1 sobe também os commits 24.6 a 24.8; o passo 2 roda também o teste novo da landing; o passo 5 só começa depois da sua resposta sobre a landing sem JavaScript (abaixo); e o passo 6 confere no ar as cinco respostas.

**Antes de publicar, uma resposta sua (pergunta 1 de prompts/24-decisoes-do-otavio-resposta.md, seção 4).** A contagem nunca mostra [X] nem [Y]: os marcadores saíram do programa, e com o programa lento o cartão só aparece quando ele chega, já com os números. Mas com o JavaScript desligado ela também não mostra números: a landing inteira fica em branco, porque é um programa React (sempre foi assim, desde que chegou do Vercel). Você pediu para ser avisado antes de publicar se isso não desse para garantir. O Claude só faz o passo 5 depois de você responder no chat se publica assim.

## O que muda no ar e o que não muda

| Peça | Muda? |
|---|---|
| O banco (Supabase) | **Sim, antes de tudo:** a migração 004 (passo 3). Cria a tabela recusas, vazia, e refaz registrar_evento para gravar as três utm do início do quiz. Nenhuma linha que já existe muda. |
| O garçom (/api/) | **Sim:** v7. Limite de pedidos por IP, armadilha e tempo mínimo no fim do quiz, contagem das recusas. O pacote do fim do quiz sem o bloco de proteção passa a ser recusado: por isso a página e o garçom vão juntos, num comando só. |
| A página do quiz (/analise/) | **Sim:** da v11 para a v15 (o relatório, a headline do cabeçalho, a armadilha, as utm no início, "Sempre gratuita" e, na v15, sem o painel "Telas" e sem abrir a tela do fim do endereço). |
| A landing (/) | **Sim:** landing-page-02 v8, sem a barra de escassez, com o R$ 497 riscado, com os textos da gratuidade, sem o logo do Safra (cabeçalho, rodapé e demonstração), com o nome único nas chamadas e a contagem do mês com números. |
| A política (/politica-de-privacidade/) | Não. |
| O painel da Cloudflare | Nada para o limite: os três limitadores (LIMITE_FIM_QUIZ, LIMITE_EVENTO e LIMITE_REGISTRO) estão no wrangler.toml v15 e nascem com a publicação. Do painel, só a chave (passo 4) e a revogação dela (passo 8). |
| A planilha do SDR | Não muda o programa. Só a limpeza das linhas de teste e da sua linha de 09/11 (passo 7). |
| O Google Tag Manager e o Pixel da Meta | Não. Os avisos ao dataLayer são os mesmos. |

**A ordem importa.** A migração 004 vem antes da publicação: o garçom v7 manda as três utm no início do quiz e soma as recusas pela função registrar_recusa, que só existem depois dela. O garçom e a página de agora continuam funcionando com o banco já migrado, então a 004 pode rodar com calma, antes.

---

## Passo 1 · O push da main (você, 1 min)

**Por quê.** A publicação sai sempre da main (CLAUDE.md, regra 7). Os commits do pedido 24 (24.1 a 24.8; do 24.6 em diante, as suas respostas) estão na main do Mac, junto com os do pedido 23 que ainda não subiram.

**Faça:** no GitHub Desktop, confira que o branch é **main** e clique em **Push origin**.

**Deu certo se:** no GitHub, a main mostra o último commit do pedido 24 ("24.8 · ...").

**Se der errado:** se o GitHub Desktop pedir **Pull** antes, faça o Pull e depois o Push. Se aparecer conflito, não resolva no site: avise o Claude.

---

## Passo 2 · Os testes na máquina, antes de publicar (o Claude, 15 min)

**Por quê.** Ver de novo, na main que vai ao ar, tudo o que o pedido 24 provou.

**Faça:** peça ao Claude: **"pode publicar pelo APLICAR-24"**. Antes de publicar, ele roda, da main:

1. `node nucleo/ferramentas/prints/testar-quiz-01.js` (o quiz em 375, 360 e 1440, com os três perfis, a armadilha, as utm no início, "Sempre gratuita" e, na v15, o site sem o painel "Telas");
2. `node nucleo/ferramentas/prints/testar-landing-02.js` (novo na v2 deste roteiro; a landing montada em 1440, 375 e 360: sem o logo, com o R$ 497 riscado, o nome único e a contagem em seis datas e três fusos, também com o programa lento e com o JavaScript desligado);
3. `node nucleo/ferramentas/ensaio/ensaio.mjs` (o ensaio inteiro, com a migração 004, o limite de pedidos de verdade do wrangler dev, a contagem das recusas e, na v17, o site como vai ao ar);
4. `node entregas/garcom/teste/testar-garcom.mjs`, `node dados/banco/testar-migracao.mjs` e o teste da planilha;
5. `git checkout -- entregas/quizzes/quiz-01/prints entregas/prototipo-funil-01/prints entregas/landings/landing-page-02/prints`, porque os testes gravam os prints de novo, e depois `git status`.

**Deu certo se:** tudo passa ("Tudo certo") e a main fica limpa. O Claude anota as contagens no log.md.

**Se der errado:** o Claude não publica e diz o que falhou.

---

## Passo 3 · A migração 004 no banco (você, 5 min)

**Por quê.** Cria a contagem das recusas e deixa o início do quiz gravar as três utm. Sem ela, o garçom v7 não consegue somar as recusas e o início do quiz com as utm novas seria recusado pelo banco.

**Faça:**

1. No navegador, entre em supabase.com com sistemadevendassafra@gmail.com, abra o projeto **sistema-de-vendas-safra** e o **SQL Editor**.
2. **New query**. Cole o arquivo inteiro `dados/banco/migracoes/004-utm-na-abertura-e-recusas.sql` (no GitHub, **Copy raw file**; no Mac, `pbcopy < dados/banco/migracoes/004-utm-na-abertura-e-recusas.sql`) e clique em **Run**.
3. **New query** de novo. Cole o arquivo inteiro `dados/banco/conferir.sql` (v5) e clique em **Run**.

**Deu certo se:** a migração termina sem erro (ela roda numa transação só: se algo falhar, nada muda) e o conferir.sql mostra, na última linha, **true** e **21 de 21**.

**Se der errado:** se a migração der erro, nada mudou no banco: copie a mensagem em vermelho para o Claude. Se o conferir.sql der menos de 21, traga ao Claude o número das linhas com false. Não publique (passo 5) antes de 21 de 21.

---

## Passo 4 · A chave da Cloudflare no ambiente do Mac (você, 5 min)

**Por quê.** O wrangler só publica com uma chave da Cloudflare, e ela não pode passar pelo chat nem por arquivo do repositório (CLAUDE.md, regra 8). A de 18/11/2026 valia 7 dias e já venceu.

**Faça:**

1. No painel da Cloudflare, **My Profile → API Tokens → Create Token**, modelo **Edit Cloudflare Workers**, só a conta do Safra e a zona gotriad.com.br, com prazo para acabar (2 dias basta). Copie o valor (o passo 2.1 do APLICAR-22 tem o caminho completo).
2. No Terminal do Mac, na janela de onde o Claude Code vai rodar: `read -s CLOUDFLARE_API_TOKEN` e Enter, cole o valor (nada aparece na tela) e Enter; depois `export CLOUDFLARE_API_TOKEN`. Abra o Claude Code nessa janela.
3. Não cole o valor no chat, em arquivo, em e-mail nem nos segredos de rede (Network secrets): com eles, a publicação para no meio com 401 (aconteceu em 18/11/2026, 20h17).

**Deu certo se:** no mesmo Terminal, `test -n "$CLOUDFLARE_API_TOKEN" && echo tem chave` mostra **tem chave** (o comando não mostra o valor).

**Se der errado:** se não aparecer "tem chave", repita o item 2 na mesma janela (a variável só vale na janela onde foi criada). Se a Cloudflare não deixar criar a chave, pare aqui: nada foi publicado.

---

## Passo 5 · A publicação (o Claude, 5 min)

**Por quê.** O mesmo jeito do APLICAR-22 (log.md, entrada de 18/11/2026). Um comando publica o site e o garçom juntos.

**O que precisa existir:** a sua resposta sobre a landing sem JavaScript (no começo deste roteiro), o passo 3 com 21 de 21, a chave no ambiente (passo 4) e o wrangler do repositório (`nucleo/ferramentas/prototipo/node_modules/.bin/wrangler`, 4.158.0; os limitadores pedem 4.36.0 ou mais novo). O Claude nunca mostra o valor da chave.

**Faça (o Claude, na ordem):**

1. Confere que a main está limpa (`git status`) e é a do passo 1.
2. `wrangler whoami`, para conferir que é a conta do Safra (o e-mail e o ID da conta não vão para arquivo, log nem resposta).
3. `wrangler deployments list --config entregas/prototipo-funil-01/wrangler.toml` e anota o **Version ID que está no ar**, para voltar a ele se precisar. O último registrado é **cacf72e8-7e95-4d8e-8e2a-9b9ac2d6611d**, de 18/11/2026, 20h52; se o do ar for outro, o Claude para e avisa você.
4. `node entregas/prototipo-funil-01/montar-site.mjs` e depois `wrangler deploy --config entregas/prototipo-funil-01/wrangler.toml`, com `WRANGLER_SEND_METRICS=false`.
5. Registra o Version ID novo (README do protótipo, conexoes.md, log.md e index.md).

**Deu certo se:** a saída lista os três limitadores (`env.LIMITE_FIM_QUIZ (10 requests/60s)`, `env.LIMITE_EVENTO (60 requests/60s)`, `env.LIMITE_REGISTRO (30 requests/60s)`, como no dry-run de 25/11/2026) e mostra o **Current Version ID** novo e os dois endereços.

**Se der errado:** um 401 ou "Authentication" é a chave (vencida, sem a zona, ou nos segredos de rede): volte ao passo 4. Se a conta recusar os limitadores (Rate Limit), o deploy para com erro antes de trocar o Worker: nada muda no ar; traga a mensagem ao Claude. Nada muda no ar enquanto o deploy não termina.

---

## Passo 6 · A conferência no ar (o Claude, com você, 20 min)

**Por quê.** Ver no endereço de verdade o que os testes provaram na máquina. Em cada envio, uma janela anônima nova, nome começando por **TESTE** e e-mail terminando em **@teste.invalid** (#102), para a limpeza do passo 7 achar. Quem manda o contato espera pelo menos 20 segundos desde abrir a página (o tempo mínimo); respondendo de verdade, leva minutos.

| O que olhar | Certo é |
|---|---|
| A página nova | https://svsafra.gotriad.com.br/analise/ abre, e o HTML diz `versao: 15` no comentário do cabeçalho e traz a meta `safra-revisao` com `desligada` |
| Sem o painel "Telas" (#130) | Nenhuma tela do quiz mostra o botão "Telas" no canto, no computador e no celular; https://svsafra.gotriad.com.br/analise/#relatorio abre na abertura |
| A abertura | A headline "Você já pagou pelas suas próximas vendas" no lugar do logo; na lista curta, **Sempre gratuita**; em lugar nenhum "promoção", "por pouco tempo" ou um valor da Análise |
| A landing (/) | Sem a barra "resgatadas / Restam"; no cartão da oferta, "Sempre gratuita", **o R$ 497 riscado** ao lado de "Gratuita" (#126) e "A Análise não tem custo, nem hoje nem depois." |
| O nome (#127) | As chamadas da landing dizem "Faça uma Análise Estratégica do Sistema de Vendas"; nenhuma diz "do seu Sistema de Vendas" |
| Sem o logo (#129) | O logo do Safra não aparece no cabeçalho da landing (só o "Fazer a Análise", à direita), no fim da página (o rodapé saiu), na janela da demonstração do produto, no quiz, na política nem no aviso de cookies; a aba do navegador não mostra ícone do Safra |
| A contagem (#131) | No cartão da oferta, "O seu mês vira em N dias e H horas." com os números de agora: o Claude faz a conta à parte pela hora de Brasília, até a 0h do dia 1 do mês seguinte, e confere; nunca [X] ou [Y] |
| **Perfil 1 · qualificado com números** | As respostas do envio A do APLICAR-22 (passo 5.2), com 200, 100, 50, 40 e 2; nome **TESTE Passa Corte**, e-mail **passa.corte@teste.invalid**, sem empresa. Conversa gratuita, perfil "Conversa sem fechamento"; "Ver meu diagnóstico": 200 leads, 50% · 50% · 80% · 5%, 2 vendas hoje, 8 na meta, **R$ 60 mil** na mesa; o topo com **sua empresa** |
| **Perfil 2 · faixa c sem números** | As respostas do envio B do APLICAR-22 (passo 5.3), mas "Não" em "Você lembra..." e **60** no campo do chute; nome **TESTE Faixa C**, e-mail **faixa.c@teste.invalid**. Direto ao relatório de quem não se qualifica: "metas do método · sem os seus números", 100 leads de referência e as metas 50% · 50% · 75% · 20%, "Sua estimativa: 60%" no comparecimento, o bloco do comparecimento abaixo da meta pela estimativa, "Sai com os seus números." no dinheiro na mesa, nenhum outro valor em reais além do valor médio |
| **Perfil 3 · não qualificado** | As respostas do envio A com o faturamento "Menos de R$ 50 mil"; nome **TESTE Nao Passa**, e-mail **nao.passa@teste.invalid**. Direto ao relatório de quem não se qualifica, com os números dele (200 leads, R$ 60 mil na mesa) e "Tenho interesse" |
| As utm no início | Abra https://svsafra.gotriad.com.br/analise/?utm_source=meta-ads&utm_campaign=funil-01&utm_medium=pago&utm_content=teste-24&utm_term=conferencia e só a abertura. No banco (consulta abaixo), o último inicio_quiz tem pago, teste-24 e conferencia |
| A recusa contada | O Claude manda, da máquina dele, até 20 pedidos fora do formato a /api/fim-quiz, com a origem do site, um atrás do outro: os primeiros voltam 422 e, a partir de mais ou menos o 11º, **429** (o limite da Cloudflare é aproximado e vale por local). Na tabela recusas (consulta abaixo), fim-quiz/formato com o número de 422 e fim-quiz/limite com o número de 429 que ele viu |
| No banco | TESTE Passa Corte: faixa a, nota 96; TESTE Faixa C: faixa c, nota 33; TESTE Nao Passa: eliminatorio, nota 81 |
| Na planilha | TESTE Passa Corte aparece (faixa a); os outros dois não (faixa c e eliminatório) |

As duas consultas, só de leitura, no SQL Editor:

```
select tipo, utm_source, utm_medium, utm_content, utm_term, gravado_em
  from public.eventos where tipo = 'inicio_quiz' order by gravado_em desc limit 3;

select dia, porta, motivo, quantas, primeira_em, ultima_em
  from public.recusas order by dia desc, porta, motivo;
```

**A tabela recusas é a sua janela para as recusas.** Ela só tem números: dia, porta, motivo e quantas. Depois dos anúncios, abra essa segunda consulta de vez em quando. Motivos que pedem atenção se crescerem: `armadilha` e `rapido-demais` (robô, ou, se aparecerem junto com reclamação de lead, um navegador preenchendo o campo escondido sozinho); `limite` (muita gente no mesmo IP, ou robô); `protecao-faltando` (alguém com a página antiga aberta, só nos primeiros minutos depois da publicação).

**Se algo der errado:** o Claude volta à versão anotada no passo 5 (ver "Como voltar atrás") e avisa você.

---

## Passo 7 · A limpeza dos leads de teste e da sua linha de 09/11 (você, 15 min)

**Por quê.** Os envios de teste e a sua linha real de 09/11/2026 (que não tem as marcas de teste) não podem ficar no banco nem na planilha quando os anúncios começarem. A limpeza v2 acha a sua linha só pelo código que o banco deu a ela (f794c36d-7116-4ab3-aec3-54a147de97bc), nunca por nome, e-mail ou telefone. **Não dá para desfazer.** Rode depois do passo 6, numa hora sem teste em curso.

### 7.1 · Contar antes, no banco (só lê)

**Faça:** no SQL Editor, **New query**, cole e **Run**:

```
select
  (select count(*) from public.pessoas
    where nome ilike 'TESTE%' and lower(email) like '%@teste.invalid') as pessoas_de_teste,
  (select count(*) from public.pessoas
    where id_pessoa = 'f794c36d-7116-4ab3-aec3-54a147de97bc') as linha_de_09_11,
  (select count(*) from public.eventos
    where id_pessoa in (select id_pessoa from public.pessoas
                         where (nome ilike 'TESTE%' and lower(email) like '%@teste.invalid')
                            or id_pessoa = 'f794c36d-7116-4ab3-aec3-54a147de97bc')) as eventos_que_vao_sair,
  (select count(*) from public.pessoas) as pessoas_no_total,
  (select count(*) from public.eventos) as eventos_no_total;
```

**Deu certo se:** aparece uma linha com cinco números. **Anote os cinco.** linha_de_09_11 é 1 (ou 0, se ela já saiu).

### 7.2 · Contar antes, na planilha (só olha)

**Faça:** na planilha do SDR, em cada uma das duas abas, **fila** e **respostas**, anote três números: as linhas com dado (sem o cabeçalho); as linhas com nome começando por TESTE (use **Ctrl+F** ou **Cmd+F** com TESTE); e se a linha com **f794c36d** na coluna A (id_pessoa) existe (Cmd+F com f794c36d).

**Deu certo se:** você tem seis números e duas respostas sim ou não.

### 7.3 · A limpeza no banco

**Faça:** **New query**, cole o arquivo inteiro `dados/banco/limpar-leads-de-teste.sql` (v2; no GitHub, **Copy raw file**) e **Run**.

**Deu certo se:** aparece a tabela do fim com **7 linhas, todas com ok = true**: pessoas de teste de N para 0; a linha de 09/11 de 1 para 0; os eventos dessas pessoas para 0; as outras pessoas, os eventos delas e os eventos sem pessoa com o mesmo número antes e depois; a trava dos eventos ligada. Os números de "antes" batem com os do 7.1.

**Se der errado:** se aparecer erro, **nada foi apagado** (o arquivo confere tudo antes do commit). Não rode de novo às cegas: traga a mensagem em vermelho ao Claude. O passo 0 para de propósito se o código f794c36d existir mas a pessoa não tiver sido criada em 09/11/2026.

### 7.4 · A limpeza na planilha

**Faça:** depois do 7.3 (assim a planilha não recebe de novo o que saiu do banco), nas duas abas, **fila** e **respostas**, apague as linhas inteiras com nome começando por TESTE e a linha com f794c36d na coluna A (botão direito no número da linha, **Excluir linha**).

### 7.5 · Contar depois

**Faça:** rode de novo a consulta do 7.1 e conte de novo as duas abas, como no 7.2.

**Deu certo se:** no banco, pessoas_de_teste e linha_de_09_11 dão 0, eventos_que_vao_sair dá 0, pessoas_no_total caiu exatamente das pessoas de teste mais a sua linha, e eventos_no_total caiu exatamente dos eventos_que_vao_sair do 7.1. Em cada aba da planilha, as linhas com dado caíram exatamente das linhas de TESTE mais a sua (se ela existia), e Cmd+F com TESTE e com f794c36d não acha nada.

**Mande ao Claude só os números** (os do 7.1, 7.2 e 7.5 e a tabela do 7.3), nunca nome, e-mail ou telefone. Ele registra no log.md e fecha a pendência "Dados de teste do protótipo".

---

## Passo 8 · Tirar a chave (você, 2 min)

**Por quê.** A chave só servia para esta publicação.

**Faça:** no Terminal do passo 4, `unset CLOUDFLARE_API_TOKEN` (ou feche a janela). No painel da Cloudflare, **My Profile → API Tokens**, ache a chave criada no passo 4 e clique em **Delete**.

**Deu certo se:** `test -n "$CLOUDFLARE_API_TOKEN" && echo tem chave` não mostra nada, e a chave some da lista no painel.

---

## Passo 9 · As duas pendências antigas, antes dos anúncios (você, com o Claude, 15 min)

**Por quê.** As duas estão abertas no log.md (Pendências) e são de antes de qualquer lead de verdade.

1. **A chave da Cloudflare de 12/11/2026.** Na mesma lista do passo 8 (My Profile → API Tokens), veja se ainda existe uma chave criada em 12/11/2026. Se existir, **Delete**. Deu certo se ela não aparece mais.
2. **As chaves antigas do Supabase (JWT).** Foram desativadas em 09/11/2026, mas continuam válidas como JWT enquanto a assinatura antiga do projeto existir. Aposentar de vez com a troca da assinatura do projeto (JWT signing keys), no painel do Supabase. O garçom e a planilha usam as chaves novas (que não são JWT), então nada deles para. Faça com o Claude ao lado, que confere o caminho na documentação do Supabase do dia antes do primeiro clique; depois, o Claude registra em conexoes.md e no log.md.

---

## Como voltar atrás

**Por quê.** Se a conferência do passo 6 achar algo errado no ar, a volta põe de novo a versão anterior inteira, sem esperar conserto.

**Faça (o Claude):** `wrangler rollback <Version ID anotado no passo 5> --config entregas/prototipo-funil-01/wrangler.toml`, com a mesma chave no ambiente. O site e o garçom voltam juntos (a página v11 e o garçom v6, que não usam o bloco de proteção). **O banco fica com a 004:** o garçom v6 e a página v11 funcionam com ela (a tabela recusas só fica parada). Os limitadores saem com a versão de antes.

**Deu certo se:** /analise/ volta a mostrar a tela dos números com o botão "%" e `wrangler deployments list` mostra a versão anotada com 100% do tráfego.

**Se der errado:** um 401 é a chave: refaça o passo 4 e rode de novo. Se falhar por outro motivo, o Claude não tenta outro caminho e avisa você com a mensagem.

**O passo 7 não volta.** Por isso ele vem depois da conferência e conta antes de apagar.

---

## Fontes

- prompts/24-correcoes-antes-dos-anuncios.md (o pedido) e prompts/24-decisoes-do-otavio.md (as suas respostas); decisões #124 a #131 (base/decisoes.md v16); log.md, entradas de 25/11/2026, pedido 24.
- entregas/quizzes/quiz-01/pagina/index.html v15; entregas/landings/landing-page-02 v8; entregas/prototipo-funil-01/montar-site.mjs v22; nucleo/ferramentas/prints/testar-landing-02.js; entregas/garcom/garcom.mjs v7; entregas/prototipo-funil-01/wrangler.toml v15 (os três limitadores e a documentação da Cloudflare lida em 25/11/2026: Workers Rate Limiting, período de 10 ou 60 segundos, por local e aproximado, wrangler 4.36.0 ou mais novo); dados/banco/migracoes/004-utm-na-abertura-e-recusas.sql; dados/banco/conferir.sql v5; dados/banco/limpar-leads-de-teste.sql v2.
- entregas/prototipo-funil-01/APLICAR-22.md v4 (passos 2.1, 5.2, 5.3 e 5.4) e APLICAR-23.md (o jeito de publicar e de voltar, que este roteiro repete).
- log.md, Pendências: "Chaves antigas do Supabase (JWT)", "Rastreamento (#121) e os textos do Pixel (#122) no ar" (a chave de 12/11/2026) e "Dados de teste do protótipo (#102)".
