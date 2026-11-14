---
id: prototipo-funil-01-aplicar-21
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: prototipo-funil-01
    versao: 15
  - id: prototipo-funil-01-aplicar-11
    versao: 3
  - id: prototipo-funil-01-ligar
    versao: 6
  - id: garcom
    versao: 5
  - id: landing-page-02
    versao: 5
  - id: quiz-01-pagina
    versao: 6
  - id: planilha-sdr-funil-01
    versao: 2
  - id: ensaio-prototipo-funil-01
    versao: 10
  - id: decisoes
    versao: 10
  - id: regra-seguranca
    versao: 3
desatualizado: true
---

# Roteiro para levar o funil ao endereço novo · svsafra.gotriad.com.br

O passo a passo para pôr no ar o que o pedido 21 preparou (decisão #120; prompts/21-dominio-e-caminho-da-analise.md): o funil em https://svsafra.gotriad.com.br, com a landing em / e o quiz em /analise/. O endereço antigo, https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev, não morre: quem abrir uma página nele é levado à mesma página no endereço novo. No mesmo padrão do LIGAR.md e do APLICAR-11.md: uma ação por passo, o porquê, **Faça**, **Deu certo se** e **Se der errado**.

**Status.** Rascunho, pendente do Otávio. Nasce desatualizado, porque se apoia em documentos marcados (o protótipo, o garçom, as páginas, a planilha e o ensaio; regra 11.1). O programa foi ensaiado na máquina, sem serviço real: o ensaio geral (nucleo/ferramentas/ensaio/, v10) deu 255 de 255, em três rodadas. **Nada deste roteiro foi feito numa conta de verdade:** o Claude não entra no painel da Cloudflare, não publicou nada e não abriu o site no ar.

> **Publicar antes de o domínio estar ativo derruba o site.**
>
> O wrangler, a ferramenta que publica, primeiro põe o programa novo no ar e só depois liga o endereço novo. O programa novo leva toda página do endereço antigo para o novo. Se o endereço novo ainda não existir, o endereço antigo passa a levar a lugar nenhum, e o site cai até alguém voltar a versão anterior (Passo 3).
>
> Por isso a ordem deste roteiro: **primeiro o domínio ativo (Passo 0), depois o endereço ligado e abrindo (Passo 1), só então publicar (Passo 2).** Não se publica mais pelo LIGAR.md nem pelo APLICAR-11.md.

## Antes de tudo

**O que este roteiro faz.** Liga o endereço svsafra.gotriad.com.br ao Worker safra-prototipo-funil-01, publica o programa novo (o garçom v5, a landing-page-02 v5 e o quiz em /analise/), confere no ar pelos dois endereços e, depois, aponta a planilha do SDR e a medição do Google para o endereço novo.

**O que este roteiro não faz.**

- Não cria nada no endereço puro gotriad.com.br, nem página, nem registro de DNS, nem redirecionamento: o pedido 21 não cria nada nele (#120, ponto 5). Dentro do domínio gotriad.com.br, a Cloudflare cria só o registro de DNS e o certificado do svsafra (Passo 1). A verificação do Search Console por DNS (4.3), se for a escolha, põe um registro no endereço puro: é decisão da #116, fora deste roteiro.
- Não tira o aviso para o Google não indexar: ele continua em tudo, também no endereço novo (#101; #120, ponto 4).
- Não troca o banco: nenhum SQL, nenhuma chave nova. O Supabase fica como está.
- Não desliga o endereço antigo: ele continua ligado, levando ao novo.
- **Não pede chave nenhuma.** Em nenhum passo você copia, cola ou mostra uma chave.

**Quem faz o quê.** Você faz os Passos 0 e 1 no painel da Cloudflare, pede a publicação (Passo 2) e faz o Passo 4. O Claude publica, confere no ar e registra, quando você pedir. O Claude não entra no painel.

**As mesmas regras do LIGAR.md.** Protótipo de teste não é entrega. Só leads de mentira (#102): nome começando por **TESTE** e e-mail terminado em **@teste.invalid**. Nunca cole uma chave no chat, em arquivo, em e-mail ou numa célula da planilha. Se precisar de ajuda, copie só a mensagem de erro.

**De onde vem cada afirmação sobre a Cloudflare.** Da documentação oficial (developers.cloudflare.com), baixada e lida em 14/11/2026, e do código do wrangler instalado em nucleo/ferramentas/prototipo/ (versão 4.158.0). Cada passo diz a página. Os nomes de tela ficam em inglês, como a documentação os escreve. Onde a documentação não diz o que a tela mostra, o roteiro diz "a documentação não diz" e pede para você olhar e contar. Nada aqui foi escrito de memória.

## Resumo do tempo

| Passo | O que é | Quem | Tempo estimado |
|---|---|---|---|
| 0 | Ver que o domínio está ativo e que svsafra não tem registro de DNS | Otávio | 3 min |
| 1 | Ligar o endereço ao Worker e ver ele abrir | Otávio | 5 min, mais a espera do certificado |
| 2 | Pedir a publicação; o Claude publica e confere no ar | Otávio pede, Claude faz | 1 min para pedir; cerca de 20 min do Claude |
| 3 | Voltar atrás | Só se der errado | 2 min |
| 4 | Depois: planilha, Analytics e Tag Manager, Search Console, token | Otávio | 10 min, fora o Google |

---

## Passo 0 · Ver que o domínio está ativo (trava os outros passos)

Sem o domínio ativo, a Cloudflare não liga endereço nenhum nele. A documentação pede "an active Cloudflare zone" para criar um Custom Domain (página "Custom Domains", atualizada em 12/11/2026).

### 0.1 · Ver o estado do domínio

**Faça:** entre no painel da Cloudflare, na conta do Safra. É a conta em que o Worker **safra-prototipo-funil-01** aparece, em **Workers & Pages**. Abra a página **Domains** da conta e procure **gotriad.com.br** na lista.

**Deu certo se:** o domínio aparece com o estado **Active**. A documentação diz que, quando o domínio fica ativo, ele aparece como Active na página Domains da conta e a Cloudflare manda um e-mail (página "Set up a primary zone (Full setup)", passo 3.5, atualizada em 29/07/2026).

**Se der errado:** pare aqui. Nada dos passos seguintes.

| O que aparece | O que quer dizer (página "Zone status", atualizada em 21/04/2026) | O que fazer |
|---|---|---|
| **Pending Nameserver Update** | Os servidores de DNS ainda não foram trocados no Registro.br, ou a Cloudflare ainda não viu a troca | Esperar. A documentação fala em até 24 horas para o registrador atualizar. A conferência pode ser pedida de novo na página **Overview** do domínio; a documentação não diz o nome do botão |
| **Finish setup** | O cadastro do domínio na Cloudflare não terminou: falta escolher o plano | Terminar o cadastro, com o mentor |
| **Moved** | A Cloudflare deixou de ver os servidores dela no domínio | Chamar o mentor |
| O domínio não está na lista | Ele não foi adicionado a esta conta, ou está em outra | Custom Domain não pode ser criado num domínio que não é da conta ("Custom Domains"). Resolver com o mentor |

**Tempo:** 1 min.

### 0.2 · Ver que svsafra não tem registro de DNS

A Cloudflare cria sozinha o registro de DNS do endereço novo. Se já existir um registro com o nome svsafra, dá conflito: a documentação diz que não se cria Custom Domain num nome que já tem registro CNAME ("Custom Domains"). E o wrangler, quando roda sem uma pessoa na frente (é o caso do Claude Code online), manda substituir sem perguntar um registro que já exista nesse nome e, pelo mesmo código, toma sem perguntar um endereço que já esteja ligado a outro Worker (lido no código do wrangler 4.158.0). Melhor saber antes.

**Faça:** dentro do domínio gotriad.com.br, abra a página **DNS Records**. Procure na lista um registro com o nome **svsafra** (ou svsafra.gotriad.com.br).

**Deu certo se:** não existe nenhum registro com esse nome, de nenhum tipo.

**Se der errado:** existe um registro svsafra. Não apague sem saber quem criou e para quê. Conte ao Claude ou ao mentor o tipo do registro (CNAME, A, AAAA ou outro), sem copiar mais nada. Só depois de decidir que ele não serve para nada, apague e siga.

**Tempo:** 2 min.

---

## Passo 1 · Ligar o endereço svsafra.gotriad.com.br ao Worker

Há três jeitos. **O recomendado é o primeiro: ligar por cliques no painel, antes de publicar.** Os outros dois estão no fim deste passo, com o porquê de não serem a recomendação.

**Por que ligar antes de publicar.** O Worker que está no ar hoje serve as páginas em qualquer endereço ligado a ele. Ligando o endereço novo primeiro, você vê o endereço novo abrir sem mudar nada no programa. Quando o programa novo subir, o endereço novo já responde, e a publicação encontra o endereço já ligado ao mesmo Worker. Nenhum momento com o site fora do ar.

### 1.1 · Ligar pelo painel (recomendado)

**Faça**, no painel da Cloudflare (o caminho é o da página "Custom Domains", seção "Set up a Custom Domain in the dashboard"):

1. Abra **Workers & Pages**.
2. Em **Overview**, clique no Worker **safra-prototipo-funil-01**.
3. Vá em **Settings**, depois **Domains & Routes**, depois **Add**, depois **Custom Domain**.
4. Digite `svsafra.gotriad.com.br`, sem https:// e sem barra.
5. Clique em **Add Custom Domain**.

**Deu certo se:** svsafra.gotriad.com.br aparece em **Domains & Routes**, ao lado do endereço do workers.dev, que continua lá. A documentação diz que, depois disso, a Cloudflare cria o registro de DNS e emite o certificado sozinha. Ela não descreve como a tela fica depois do clique: olhe se o endereço aparece na lista.

**Se der errado:**

| O que aparece | O que fazer |
|---|---|
| Mensagem sobre registro de DNS ou CNAME que já existe | Volte ao 0.2 |
| Mensagem sobre o domínio ou a zona | Volte ao 0.1: o domínio não está Active nesta conta |
| O endereço já está ligado a outro Worker | Pare. Não troque. Conte ao Claude |
| Qualquer outra mensagem | Copie só a mensagem e traga ao Claude. Não publique |

**Não ligue pelo painel nenhum outro endereço.** A cada publicação, os endereços escritos no wrangler.toml passam por cima dos do painel (documentação do wrangler, "Configuration", seção "Source of truth", atualizada em 12/11/2026). O svsafra está escrito no arquivo, então a publicação não desfaz o que você ligou. Um endereço que não esteja no arquivo sairia na publicação seguinte.

**Tempo:** 2 min.

### 1.2 · Ver o endereço novo abrir

**Faça:** abra no navegador https://svsafra.gotriad.com.br

**Deu certo se:** abre a página de vendas, a mesma do endereço antigo, com o cadeado do https. É a versão de hoje, a 70f8766c, porque o programa novo ainda não subiu. Nesse meio-tempo:

- **Funciona:** as páginas abrem pelo endereço novo (a landing em /, o quiz em /quiz/, a política em /politica-de-privacidade/), com o aviso de não indexar. O endereço antigo continua igual: nada muda para quem usa o antigo.
- **Ainda não funciona:** /analise/ ainda não existe (dá página não encontrada). E o envio do quiz pelo endereço novo é recusado, porque a versão de hoje só aceita o endereço antigo; quem tentasse veria o aviso de falha do quiz. **Não faça o quiz pelo endereço novo ainda.** Pelo mesmo motivo, a visita de quem abre a landing pelo endereço novo não é gravada nesse meio-tempo, sem aviso nenhum na tela. Ninguém conhece esse endereço, então ninguém é afetado.

**Se der errado:**

| O que aparece | O que fazer |
|---|---|
| A página não abre, ou o navegador reclama do certificado | Espere e tente de novo. A documentação diz que a Cloudflare cria o registro e o certificado, mas não diz quanto tempo leva. Se depois de 30 minutos não abrir (limite deste roteiro, não da documentação), pare, não publique e conte ao Claude |
| Abre outra página, que não é a do Safra | Pare. Não publique. Conte ao Claude |

**Tempo:** 1 min, mais a espera.

### Os outros dois jeitos, e por que não são a recomendação

**Pelo wrangler, sem subir programa.** O wrangler tem o comando `triggers deploy`, que aplica só os endereços do wrangler.toml, sem publicar programa. A documentação o marca como **experimental** e o descreve em uma linha (página de comandos do wrangler, "Workers", `triggers deploy`, atualizada em 26/10/2026). Quem rodaria é o Claude, a seu pedido, com o token do ambiente:

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler triggers deploy --config entregas/prototipo-funil-01/wrangler.toml
```

Pelo código do wrangler 4.158.0, é o mesmo trecho que liga os endereços no fim de uma publicação, rodando sozinho: se o token não tiver permissão para o domínio, o comando falha e o programa no ar não muda. Não é a recomendação porque é experimental, porque nunca foi rodado neste projeto e porque, sem uma pessoa na frente, ele substitui sem perguntar um registro de DNS que exista em svsafra e toma um endereço ligado a outro Worker (por isso o 0.2 vale também aqui). Se for usado, o 1.2 vem logo depois, do mesmo jeito.

**Pela própria publicação.** Publicar direto (Passo 2) sem ter ligado o endereço antes também liga o endereço, **se o token tiver permissão para o domínio**. Se não tiver, acontece o que o quadro do começo descreve: o programa novo já subiu, a ligação do endereço falha, o comando termina com erro e o endereço antigo fica levando a um endereço que não existe. Só se faz assim com a certeza de que o token alcança o domínio, e o repositório não tem como saber isso.

**O que o repositório sabe do token atual** (conexoes.md, linha da Cloudflare; log.md, Pendências):

- Foi criado em 12/11/2026 (pedido 15), para publicar o Worker pela nuvem enquanto você está sem o Mac. Mora na variável CLOUDFLARE_API_TOKEN do ambiente da nuvem sistema-de-vendas-safra. Foi usado nas publicações de 12 e 13/11/2026.
- É temporário, até 16/11/2026. O combinado da casa: até essa data, apagar a variável e revogar o token (Passo 4.4).
- Foi criado antes de o domínio gotriad.com.br existir na conta. **O repositório não registra quais permissões ele tem nem que domínios ele alcança.**
- O que a documentação dá: um token tem permissões por conta e por domínio, e cada uma vale só para os recursos escolhidos na criação (página "Create API token", atualizada em 06/11/2026). A lista de permissões tem, entre outras, "Workers Scripts", na conta, e "Workers Routes", "DNS" e "SSL and Certificates", no domínio (página "API token permissions", atualizada em 30/10/2026). **A documentação não diz qual conjunto a ligação de um Custom Domain pede.** O roteiro não inventa essa lista.
- Com o endereço já ligado pelo painel (1.1), o esperado é que o site não dependa dessa permissão para ficar de pé: se a Cloudflare recusar o pedido do wrangler por falta de permissão, o wrangler avisa e nada muda no endereço, que continua ligado. **Isto é dedução, não fato visto.** Vem do código do wrangler 4.158.0 (a ligação do endereço é um pedido separado, feito depois de o programa subir; se ele falha, o wrangler só guarda o erro e avisa no fim) e de como um pedido recusado costuma se comportar. A documentação não diz o que fica quando esse pedido falha, e isso nunca foi visto numa publicação de verdade. Por isso, se a publicação terminar com esse erro, o Passo 3 manda voltar a versão.
- Se a publicação ficar para depois de 16/11/2026, com o token já apagado: ou você cria um token novo e guarda na mesma variável do ambiente, como da outra vez (no painel, **My Profile**, **API Tokens**, **Create Token**; o valor aparece uma vez só e vai direto para a variável, nunca para o chat), ou a publicação é feita no Mac, com o wrangler logado desde 09/11/2026. O roteiro não pede o valor do token em nenhum dos casos.

---

## Passo 2 · Publicar (quem publica é o Claude)

### 2.1 · Escolher a hora e pedir

Na hora da troca, quem estiver com o quiz aberto no endereço antigo perde o envio: a aba antiga manda o endereço antigo como origem, o programa novo recusa, e a pessoa vê o aviso de falha do quiz. Por isso, publique numa hora sem teste em andamento.

**Faça:** confira que ninguém está testando o quiz. Depois, numa conversa com o Claude no Claude Code, escreva:

```
Publique pelo APLICAR-21. O domínio gotriad.com.br está Active, svsafra não tinha registro de DNS, e https://svsafra.gotriad.com.br já está ligado pelo painel e abre.
```

Se alguma das três coisas não for verdade, diga qual. Sem as três, o Claude não publica.

**Deu certo se:** o Claude responde com o **Current Version ID** novo e com o resultado da conferência no ar (2.3).

**Se der errado:** se o Claude responder que não publicou, ele diz qual das conferências do 2.2 parou. Se a publicação terminar com erro, é o Passo 3.

**Tempo:** 1 min para pedir.

### 2.2 · O que o Claude faz, na ordem

Para você saber o que esperar. É o jeito de sempre de publicar (o comando é o mesmo das publicações anteriores), com três cuidados a mais.

1. **Confere o pedido.** As três afirmações do 2.1 estão no pedido.
2. **Confere o repositório.** A main está no commit do pedido 21 ou depois, sem mudança solta. O teste do garçom passa.
3. **Confere a rede do ambiente.** Para publicar, o ambiente da nuvem já alcança api.cloudflare.com (pedido 15). Para conferir no ar, ele precisa alcançar os dois endereços do site. Em 14/11/2026, a rede do ambiente recusava svsafra.gotriad.com.br. O Claude pede a liberação desse endereço num cartão, e você aprova. Se preferir liberar antes: nas configurações do ambiente da nuvem (o menu do ambiente, no título da sessão, **Edit**), em **Network access**, acrescente svsafra.gotriad.com.br em **Allowed domains** (documentação do Claude Code, lida em 14/11/2026; se a tela for outra, conte ao Claude). **Sem essa liberação o Claude não publica.** Sem alcançar o endereço novo, ele não consegue fazer o item 6 nem olhar o endereço se a publicação terminar com erro (Passo 3).
4. **Confere a conta,** com `wrangler whoami`: a conta do Safra. Nenhum valor de chave aparece.
5. **Anota a versão que está no ar,** para voltar a ela se precisar: a última linha da tabela "Publicações" do README.md desta pasta (em 14/11/2026, a 70f8766c-166d-4930-8db3-cd74a1ae4d53, de 13/11/2026, 16h35). E confere que é ela que está com 100% do tráfego:

   ```
   nucleo/ferramentas/prototipo/node_modules/.bin/wrangler deployments status --config entregas/prototipo-funil-01/wrangler.toml
   ```

   Se o ID no ar for outro, para e avisa você: alguém publicou sem registrar. A saída deste comando e a do `whoami` mostram o e-mail da conta e, no `whoami`, o ID da conta: nenhum dos dois vai para arquivo, log ou resposta.
6. **Confere que o endereço novo responde antes de publicar:** pedido do próprio ambiente, https://svsafra.gotriad.com.br/ dá a página de vendas (resposta 200, com o título "Sistema de Vendas Safra"). Uma recusa da rede do ambiente, em que o pedido nem sai, não é resposta do site: volta ao item 3. Se o site não der a página, não publica e avisa você.
7. **Publica:**

   ```
   export WRANGLER_SEND_METRICS=false
   node entregas/prototipo-funil-01/montar-site.mjs && nucleo/ferramentas/prototipo/node_modules/.bin/wrangler deploy --config entregas/prototipo-funil-01/wrangler.toml
   ```

   O montador termina com "Tudo certo". Depois, pelo código do wrangler 4.158.0, a saída mostra "Deployed safra-prototipo-funil-01 triggers", os dois endereços (o do workers.dev e "svsafra.gotriad.com.br (custom domain)") e, por último, a linha **Current Version ID**. A conferência sem publicar (o `--dry-run`) não mostra os endereços; só a saída da publicação de verdade mostra.
8. **Se o comando terminar com erro,** vai para o Passo 3, sem esperar.
9. **Confere no ar** (2.3).
10. **Registra:** a linha nova em "Publicações" do README.md desta pasta, conexoes.md (o endereço novo passa a ser o que vale), log.md e index.md.

### 2.3 · A conferência no ar: o que olhar

O Claude confere tudo, pelos dois endereços. Os itens marcados com "você também" dá para olhar no seu navegador.

| O que olhar | Certo é | Quem |
|---|---|---|
| O endereço novo abre a landing | https://svsafra.gotriad.com.br/ mostra a página de vendas | Claude; você também |
| Uma chamada leva a /analise/ com as utm | Abrindo https://svsafra.gotriad.com.br/?utm_source=bio&utm_campaign=funil-01 e clicando em "Fazer a Análise", o endereço vira /analise/?utm_source=bio&utm_campaign=funil-01&id_sessao=sessao-... O endereço termina com #abertura. Se você já clicou em "Aceitar" no aviso de cookies do endereço novo, o id_sessao some da barra logo que o quiz abre (é a medição que tira): nesse caso, olhe só o caminho /analise/ e as utm | Claude; você também |
| /analise/ abre o quiz | A abertura do quiz, com os acentos certos | Claude; você também |
| /quiz/ leva a /analise/ | https://svsafra.gotriad.com.br/quiz/?utm_source=bio vira /analise/?utm_source=bio | Claude; você também |
| O endereço antigo leva ao novo, no mesmo caminho | O endereço antigo com /?utm_source=bio vira o novo com /?utm_source=bio; o antigo com /quiz/ vira o novo com /analise/; o antigo com /politica-de-privacidade/ vira o novo com /politica-de-privacidade/ | Claude; você também |
| A política abre | /politica-de-privacidade/ abre, e também pelos links do quiz e do aviso de cookies | Claude; você também |
| O aviso de cookies | Aparece no endereço novo, mesmo para quem já tinha escolhido no antigo, porque o navegador guarda a escolha por endereço. "Aceitar" e "Recusar" funcionam | Claude; você também |
| O cabeçalho de não indexar | X-Robots-Tag: noindex em toda resposta, inclusive nos redirecionamentos, nos dois endereços | Claude |
| Um lead de teste chega ao banco e à planilha | O Claude faz o quiz pelo endereço novo com uma pessoa de mentira (nome começando por TESTE, e-mail terminado em @teste.invalid), com as respostas do exemplo de faixa a (as do lead A do ensaio; quem cai fora das faixas a e b não vai para a planilha), e o garçom responde 201. Você olha a linha nova na aba fila da planilha, de 1 a 6 minutos depois, e, se quiser, na tabela pessoas do Supabase. Essa pessoa entra na lista da limpeza dos dados de teste (#102; log.md, Pendências) | Claude manda; você olha |
| A planilha continua puxando pelo endereço antigo | A porta privada responde nos dois endereços, sem redirecionar. Na planilha, o registro da busca termina com `[planilha] busca: ...`, sem erro | Claude confere a porta, sem a chave; você olha a planilha |
| Nada sai do site | Nenhuma página pede arquivo a outro endereço, salvo o Tag Manager depois do "Aceitar"; nenhum erro de programa | Claude |

### 2.4 · Anotar o Current Version ID

**Faça:** guarde o Current Version ID que o Claude informar. Não é segredo. Ele fica na tabela "Publicações" do README.md desta pasta. No painel, as versões aparecem em **Workers & Pages**, no Worker, em **Deployments**.

**Deu certo se:** o ID que o Claude informou é o da última linha da tabela "Publicações".

**Se der errado:** se a tabela não tiver a linha nova, peça ao Claude para registrar.

**Tempo:** 30 s.

---

## Passo 3 · Como voltar atrás, se der errado

**Para que versão voltar.** Para a que estava no ar antes da publicação: a última linha da tabela "Publicações" do README.md desta pasta, conferida na hora. Em 14/11/2026 é a **70f8766c-166d-4930-8db3-cd74a1ae4d53** (13/11/2026, 16h35).

**Faça (como voltar).** A documentação dá dois jeitos (página "Rollbacks", atualizada em 12/11/2026):

- **Pelo wrangler,** que é o que o Claude faz, na mesma sessão da publicação:

  ```
  nucleo/ferramentas/prototipo/node_modules/.bin/wrangler rollback 70f8766c-166d-4930-8db3-cd74a1ae4d53 --config entregas/prototipo-funil-01/wrangler.toml --message "volta do APLICAR-21"
  ```

- **Pelo painel,** que é o que você faz se o Claude não puder: **Workers & Pages**, o Worker **safra-prototipo-funil-01**, **Deployments**, os três pontos à direita da versão para a qual quer voltar, **Rollback**.

**Deu certo se:** o endereço antigo volta a abrir a página de vendas, sem levar ao novo, e /quiz/ abre o quiz. A documentação avisa que a mudança leva um tempo para chegar a todos os pontos da rede da Cloudflare.

**O que a volta faz e o que não faz.** Voltar põe a versão antiga para atender tudo, nos dois endereços. A versão guarda o programa, os arquivos e as ligações (página "Versions & deployments", atualizada em 12/11/2026); as variáveis comuns, como a ORIGEM_PERMITIDA, são um tipo de ligação (página "Environment variables", atualizada em 21/08/2026). Então voltam o garçom de antes, o quiz em /quiz/ e a regra de origem de antes. **Voltar não desfaz a ligação do endereço** (página "Rollbacks": a volta vale para as rotas e os domínios do Worker; a versão não guarda os endereços): svsafra.gotriad.com.br continua ligado ao Worker e passa a mostrar a versão antiga, como no passo 1.2. Pelo mesmo motivo, o registro de DNS e o certificado devem ficar; a documentação não diz isso com essas palavras.

**O que desfazer no painel.** Para o site voltar, nada: basta a volta da versão. Só se a decisão for desistir do endereço novo por enquanto:

- Tirar o Custom Domain, em **Workers & Pages**, o Worker, **Settings**, **Domains & Routes**, na linha do svsafra. A documentação não diz o nome do botão.
- O certificado não some sozinho quando o Custom Domain é apagado. A documentação manda tirar à mão, em **SSL/TLS**, **Edge Certificates**, e diz que deixar o certificado lá não atrapalha nada.
- O registro de DNS do svsafra: a documentação não diz se ele some junto. Olhe em **DNS Records** depois.
- Avise o Claude. Com o wrangler.toml como está, a publicação seguinte ligaria o endereço de novo: o arquivo teria de mudar antes.

**O que aparece · o que fazer**

| O que aparece | O que fazer |
|---|---|
| A montagem para com uma lista em "Problemas:" | Nada foi publicado: o comando só publica se a montagem der certo. O Claude traz a lista |
| O wrangler pede login ou reclama do token antes de subir o programa | Nada foi publicado. O token foi apagado ou não vale mais: ver o fim do Passo 1 |
| A publicação termina com "Trigger configuration ... was only partially updated", com uma linha "Custom domains" | **O programa novo já está no ar,** e o wrangler não mostra o Current Version ID nesse caso. Não procurar o ID na saída. **Voltar a versão na hora,** com o comando de cima. Depois, olhar se https://svsafra.gotriad.com.br/ abre e trazer a você a mensagem de erro inteira. Se o endereço abria antes de publicar e continua abrindo, o mais provável é que o token não alcance o domínio (dedução tirada do código do wrangler; nunca visto numa publicação de verdade). Nesse caso, a publicação pela nuvem só passa com um token que alcance o domínio, ou é feita no Mac (fim do Passo 1; pergunta 21.3.1) |
| Depois de publicar, o endereço novo não abre | Voltar a versão na hora. Depois, o Passo 1 de novo |
| O endereço antigo não leva ao novo, ou fica dando voltas | Voltar a versão na hora e contar ao Claude |
| O quiz mostra o aviso de falha ao enviar pelo endereço novo | O Claude olha o código curto no registro do garçom (LIGAR.md, parte 6). Se não se resolver em minutos, voltar a versão |
| A planilha registra erro que não é o 401 | A porta privada tem de responder igual nos dois endereços. Voltar a versão e contar ao Claude |
| Um item da conferência falha, com o site de pé | O Claude descreve o que viu. Você decide se volta ou se fica |

---

## Passo 4 · Depois

Nada aqui tem pressa: com a publicação feita, o funil já funciona no endereço novo, e o antigo leva a ele.

### 4.1 · Apontar a planilha do SDR para o endereço novo

A planilha pede os leads ao garçom pelo endereço antigo. A porta dela continua respondendo nos dois endereços, então nada quebra enquanto você não trocar (#120, ponto 3).

**Faça**, na planilha "TESTE planilha do SDR funil-01" (o caminho é o do LIGAR.md, passos 4.2 e 4.5):

1. No menu da planilha, **Extensões**, **Apps Script**.
2. No editor, **Configurações do projeto** (a engrenagem, à esquerda), desça até **Propriedades do script** e clique em **Editar propriedades do script**.
3. Na propriedade **GARCOM_URL**, troque o valor por:

   ```
   https://svsafra.gotriad.com.br
   ```

   Com https://, sem barra no fim e sem /api. Não mexa na CHAVE_PLANILHA.
4. Clique em **Salvar propriedades do script**.
5. Teste a chamada de verdade: no Editor, escolha **buscarLeadsNovos** na lista de funções e clique em **Executar**.

**Deu certo se:** o registro de execução termina com `[planilha] busca: ... linha(s) nova(s), ...` e "Execução concluída", sem erro.

**Por que testar.** No endereço do workers.dev valem as regras de segurança da própria Cloudflare; no domínio próprio valem as que estiverem ligadas no domínio gotriad.com.br (página "workers.dev", atualizada em 06/11/2026, sobre o Browser Integrity Check). A planilha foi testada pelo endereço antigo em 09/11/2026. Pelo novo, nunca.

**Se der errado:**

| O que aparece | O que fazer |
|---|---|
| "não deu para falar com o garçom..." | Confira a GARCOM_URL: https://, sem barra no fim, sem /api |
| "o garçom respondeu 401..." | A chave não mudou neste roteiro. Confira se a CHAVE_PLANILHA continua na lista, sem ter sido apagada |
| "o garçom respondeu com erro..." | Volte a GARCOM_URL para o endereço antigo, que continua respondendo, e conte ao Claude. Pode ser uma regra de segurança do domínio barrando a planilha |

Os roteiros antigos (LIGAR.md, passo 4.5; o README da planilha) ainda dizem que a GARCOM_URL termina em .workers.dev. Depois deste passo, vale o endereço novo.

**Tempo:** 5 min.

### 4.2 · Google Analytics e Tag Manager

O Claude não entra nessas contas e não sabe o que há dentro delas. A lista sai dos arquivos do repositório e do pedido 17.

- **No código das páginas, nada muda.** O contêiner continua o GTM-T6L4QTB8.
- **Fluxo de dados da Web, no Analytics.** Pelo pedido 17, o Analytics ainda ia ser criado e ligado dentro do Tag Manager. Ao criar, o endereço do fluxo é https://svsafra.gotriad.com.br. Se o fluxo já existir com o endereço do workers.dev, troque o endereço do site nele.
- **Tag do Analytics, no Tag Manager.** Continua valendo a pendência "Medição com o Google (#116)": page_location com a variável pagina_limpa e page_referrer com a origem_limpa. As duas já saem com o endereço novo e com /analise/, sem mudança no Tag Manager.
- **Tudo o que citar /quiz/ ou o nome do endereço antigo:** gatilhos, variáveis, filtros, públicos, eventos-chave e relatórios. Troque por /analise/ e por svsafra.gotriad.com.br.
- **Domínios do fluxo.** O endereço antigo só redireciona e nunca mostra página: não precisa entrar na lista. Depois da publicação, confira no Analytics, em tempo real, que a página aparece como svsafra.gotriad.com.br, com / e /analise/.
- **Dados antigos.** O que já tiver sido colhido com o endereço antigo e /quiz/ fica com esse endereço. Os relatórios por caminho mostram /quiz/ antes da publicação e /analise/ depois.
- **Cookies.** O aviso de cookies aparece de novo no endereço novo para quem já tinha escolhido no antigo. Os cookies do Analytics passam a ser gravados em gotriad.com.br (prompts/17-medicao-google-resposta.md, pergunta 17.2.2).

### 4.3 · Google Search Console

Fica para depois da publicação, pela #116. Uma decisão sua antes (pergunta 21.1.3): a propriedade é do domínio gotriad.com.br inteiro, verificada por DNS, que alcança o subdomínio, ou só do endereço svsafra.gotriad.com.br. Enquanto o aviso de não indexar continuar, o Search Console tem pouco a mostrar.

### 4.4 · O token da Cloudflare

Até 16/11/2026, como já estava combinado (log.md, Pendências).

**Faça:** nas configurações do ambiente da nuvem, apague a variável CLOUDFLARE_API_TOKEN. Depois, no painel da Cloudflare, em **My Profile**, **API Tokens**, revogue o token. As duas coisas: apagar só a variável deixa o token valendo.

**Deu certo se:** a variável não aparece mais no ambiente e o token não aparece mais na lista do painel.

**Se der errado:** se não achar o token na lista, conte ao Claude o que a tela mostra, sem copiar valor nenhum.

---

## O que contar ao Claude depois

Numa conversa com o Claude no Claude Code, sem nenhuma chave e sem nenhum dado de pessoa:

- Do Passo 0: o estado que apareceu no domínio e se havia registro svsafra.
- Do Passo 1: se o endereço foi ligado pelo painel, a que horas, e quanto tempo levou para https://svsafra.gotriad.com.br abrir.
- Do Passo 2: o que você viu no seu navegador, se olhou; se a linha do lead de teste apareceu na planilha.
- Do Passo 3: se precisou voltar, por onde voltou e o que apareceu.
- Do Passo 4: se a GARCOM_URL foi trocada e o que o registro da busca disse; o que foi trocado no Analytics e no Tag Manager; o que decidiu sobre o Search Console; se o token foi apagado e revogado.
- **O que a tela mostrou onde este roteiro diz "a documentação não diz":** o nome do botão de conferir de novo o domínio, como o endereço aparece em Domains & Routes, quanto tempo o certificado levou. O Claude acerta o roteiro com isso.

O Claude atualiza conexoes.md, o log.md, o index.md e o README.md desta pasta.

## Antes de ir ao ar com gente de verdade

Este roteiro muda o endereço do protótipo. As travas de ida ao ar continuam as mesmas: LIGAR.md ("Antes de ir ao ar com gente de verdade") e log.md, Pendências.

## Perguntas

prompts/21-dominio-e-caminho-da-analise-resposta.md, "Perguntas para o Otávio".
