---
id: prototipo-funil-01-aplicar-22
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: banco-migracao-003
    versao: 1
  - id: banco-conferir
    versao: 4
  - id: garcom
    versao: 6
  - id: quiz-01-pagina
    versao: 10
  - id: landing-page-02
    versao: 6
  - id: planilha-sdr-funil-01
    versao: 4
  - id: decisoes
    versao: 11
desatualizado: true
---

# APLICAR-22 · origem do lead, ids e avisos ao GTM no ar

Roteiro do Otávio para levar ao ar o que a decisão #121 preparou (18/11/2026): a origem completa do lead (as cinco utm e o fbclid) gravada no Supabase e na planilha, os ids de evento (id_lead e id_qualificado) e os avisos ao Google Tag Manager (quiz_iniciado, quiz_enviado e quiz_qualificado). **Nada da Meta vai ao ar com este roteiro:** o Pixel continua fora até o pacote v7 (política, aviso de cookies e texto de consentimento).

Um passo por ação, com o porquê, "Faça", "Deu certo se" e "Se der errado". Nenhum passo pede para você escrever chave em lugar nenhum além do formulário seguro do passo 2.

> **Cuidados.** Não grave nem compartilhe a tela dos passos 1, 2 e 4 (nem print, nem foto): o painel do Supabase, o da Cloudflare e o Apps Script mostram chave e dado de pessoa. A chave nova da Cloudflare só vai no formulário seguro que o Claude abre; nunca no chat, num arquivo ou num e-mail.

## A ordem, e por que ela é segura

| Passo | O que | Quem | Tempo |
|---|---|---|---|
| 0 | O merge do pull request na main | Você | 1 min |
| 1 | Rodar a migração 003 no Supabase e conferir | Você | 5 min |
| 2 | Criar a chave nova da Cloudflare e pedir a publicação | Você e o Claude | 5 min |
| 3 | Conferir no ar o garçom, o quiz e a landing | O Claude, e você também | 5 min |
| 4 | Cabeçalho novo na planilha e o Codigo.gs novo no Apps Script | Você | 5 min |
| 5 | O teste no ar, com dois envios | Você | 15 min |

- **O banco vem primeiro.** Com a migração 003, o banco aceita os campos novos e continua aceitando os pacotes de antes. O site de antes segue funcionando com o banco já migrado.
- **O garçom, o quiz e a landing vão juntos, numa publicação só (passos 2 e 3).** Os três moram no mesmo Worker da Cloudflare, e o comando de publicar leva os três de uma vez. É seguro: o garçom novo aceita o pacote de antes e o novo. Uma aba do quiz aberta antes da publicação manda o pacote de antes, e ele grava normalmente.
- **Na planilha, o cabeçalho vem antes do código.** O código de agora confere só as primeiras colunas do cabeçalho: com o cabeçalho novo, ele continua funcionando. O código novo, com o cabeçalho de antes, para e avisa até o cabeçalho ser posto. Nenhum lead se perde nessa pausa: os leads ficam no banco e entram na rodada seguinte.

---

## Passo 0 · O merge do pull request (1 min)

**Por quê.** A publicação sai sempre da main (CLAUDE.md, regra 7).

**Faça:** no GitHub, abra o pull request do branch `claude/rastreamento-meta` e clique em **Merge pull request** e depois em **Confirm merge**. Se o pull request do registro da publicação de 18/11/2026 (#2) ainda estiver aberto, faça o merge dele antes.

**Deu certo se:** o pull request mostra **Merged**, em roxo.

**Se der errado:** se o GitHub disser que há conflito, não resolva no site: avise o Claude, que traz a main para o branch e resolve.

---

## Passo 1 · A migração 003 no Supabase (5 min)

**Por quê.** Cria as colunas novas em eventos (utm_medium, utm_content, utm_term, fbclid, fbp, fbc, id_lead, id_qualificado e qualificado), aceita meta-ads em utm_source e troca as duas funções (a do fim do quiz e a da planilha). Não apaga nem muda nenhuma linha, e não mexe em segurança (RLS).

### 1.1 · Abrir o SQL Editor

**Faça:** entre em supabase.com com o Gmail do Safra, abra o projeto **sistema-de-vendas-safra** e, no menu da esquerda, o **SQL Editor**.

**Deu certo se:** o nome sistema-de-vendas-safra aparece no alto e o editor abre.

### 1.2 · Rodar a migração

**Faça:**

1. No GitHub, abra o arquivo `dados/banco/migracoes/003-origem-e-ids.sql`, clique no botão de copiar o arquivo inteiro (**Copy raw file**, o ícone de duas folhas no alto do arquivo).
2. No SQL Editor, crie uma consulta nova (**New query**), cole e clique em **Run**.
3. Se aparecer o aviso de operação destrutiva ("Potential issue detected"), clique em **Run this query**: o aviso é por causa da troca da função da planilha, que não guarda dado.

**Deu certo se:** embaixo aparece "Success. No rows returned", sem nada em vermelho.

**Se der errado:** se aparecer "migração 002 não encontrada" (ou 001, ou esquema v2), pare e avise o Claude, com a frase em vermelho. A migração roda numa transação só: se deu erro, nada mudou no banco. Rodar de novo, depois de corrigir, é seguro.

### 1.3 · Conferir o banco

**Faça:** do mesmo jeito, copie `dados/banco/conferir.sql` do GitHub, crie outra consulta nova, cole e clique em **Run**.

**Deu certo se:** aparece uma tabela com **21 linhas** e a coluna **ok** com **true** em todas. A última (n = 99, "tudo certo") mostra em **encontrado** o texto **20 de 20**. A linha 20, "origem e ids do lead (migração 003)", mostra **9 colunas, 6 restrições, 2 listas com meta-ads, planilha v5**.

**Se der errado:** anote o número da linha falsa e o que aparece em **encontrado**, e avise o Claude. Não siga para o passo 2.

---

## Passo 2 · A chave nova da Cloudflare e a publicação (5 min)

**Por quê.** A chave antiga de publicar pela nuvem foi usada pela última vez em 18/11/2026 e saiu do ambiente. Publicar precisa de uma chave nova, só para Workers, com prazo para acabar.

### 2.1 · Criar a chave (painel da Cloudflare, documentação lida em 18/11/2026)

**Faça:**

1. Entre em dash.cloudflare.com com o Gmail do Safra.
2. Clique no ícone de pessoa, no alto à direita, e em **My Profile**. No menu da esquerda, **API Tokens**.
3. Se ainda aparecer a chave antiga de publicar pela nuvem (criada em 12/11/2026), clique nos três pontinhos dela e em **Delete** (ou **Roll**/**Revoke**, conforme o painel mostrar). Ela não deve continuar valendo.
4. Clique em **Create Token**. Na lista de modelos, ache **Edit Cloudflare Workers** e clique em **Use template**.
5. Em **Token name**, escreva `publicar-prototipo-funil-01`.
6. Em **Account Resources**, deixe **Include** e escolha a conta do Safra. Em **Zone Resources**, escolha **Include**, **Specific zone** e **gotriad.com.br**.
7. Em **TTL** (o prazo da chave), ponha uma data de fim daqui a 7 dias. Depois disso, a chave para de valer sozinha.
8. Clique em **Continue to summary** e depois em **Create Token**.
9. **A chave aparece uma vez só** (começa com `cfut_`). Não copie ainda: deixe a tela aberta e vá para o 2.2.

**Deu certo se:** a tela mostra "publicar-prototipo-funil-01 API token was successfully created" (ou parecido) e a chave.

**Se der errado:** se o modelo **Edit Cloudflare Workers** não aparecer, pare e avise o Claude, com um print da lista de modelos (a lista não mostra chave nenhuma).

### 2.2 · Pedir a publicação

**Faça:** numa conversa do Claude Code online, neste repositório, escreva: **"pode publicar pelo APLICAR-22"**. O Claude abre um **formulário seguro** para a chave da Cloudflare (endereço api.cloudflare.com). Copie a chave na tela do 2.1, cole **só no formulário** e salve. O Claude nunca vê o valor.

**Deu certo se:** o Claude responde com o **Current Version ID** novo e com a conferência no ar (passo 3).

**Se der errado:** se o Claude disser que a chave não tem permissão para o domínio (um erro com "Authentication" ou "permission" e o nome gotriad.com.br), volte ao 2.1, edite a chave (**Edit**) e confira o item 6. Se a chave sumiu da tela antes de você colar, apague-a e crie outra: ela não pode ser vista de novo.

### 2.3 · O que o Claude faz, na ordem

Para você saber o que esperar. É o mesmo jeito das publicações anteriores (APLICAR-21, passo 2.2), com dois cuidados a mais.

1. Confere que a main tem o merge do passo 0, sem mudança solta.
2. Confere que você rodou o passo 1: pede o resultado do conferir.sql (20 de 20). **Sem ele, não publica**, porque o garçom novo manda meta-ads e o banco antigo recusaria.
3. Roda os testes que existem: o do garçom (386 de 386), o das migrações (120 de 120), o da planilha (70 de 70) e o do quiz.
4. Confere a conta (`wrangler whoami`) e anota a versão que está no ar, para voltar a ela se precisar.
5. Publica: `node entregas/prototipo-funil-01/montar-site.mjs` e depois `wrangler deploy --config entregas/prototipo-funil-01/wrangler.toml`, com `WRANGLER_SEND_METRICS=false`.
6. Confere no ar (passo 3) e registra a publicação (README do protótipo, conexoes.md, log.md e index.md).

---

## Passo 3 · Conferir no ar (5 min)

O Claude confere; os itens com "você também" dá para olhar no seu navegador.

| O que olhar | Certo é | Quem |
|---|---|---|
| A landing abre | https://svsafra.gotriad.com.br/ mostra a página de vendas | Claude; você também |
| O fbclid vai para o quiz | Abrindo `https://svsafra.gotriad.com.br/?utm_source=meta-ads&utm_campaign=funil-01&fbclid=teste` e clicando em "Fazer a Análise", o endereço do quiz tem `utm_source=meta-ads`, `utm_campaign=funil-01` e `fbclid=teste` | Claude; você também |
| O quiz abre com o título certo | A aba do navegador mostra "Análise Estratégica do Sistema de Vendas", e o topo do quiz mostra "Triad" | Claude; você também |
| A política continua na v6 | /politica-de-privacidade/ abre igual | Claude |
| Nada da Meta | Nenhuma página pede arquivo a facebook.com, connect.facebook.net nem fbq | Claude |

**Se algo der errado:** o Claude volta para a versão anotada no 2.3, item 4, com `wrangler rollback`, e avisa você. O banco não precisa voltar: ele aceita o site de antes.

---

## Passo 4 · A planilha (5 min)

### 4.1 · O cabeçalho novo, primeiro

**Por quê.** A aba **respostas** ganha onze colunas no fim, depois de "outras respostas" (a coluna X). A aba **fila** não muda.

**Faça:**

1. Abra a **Planilha do SDR funil-01** no Drive do Safra e vá à aba **respostas**.
2. Na linha 1, a partir da coluna **Y**, escreva os onze nomes, um por célula, exatamente assim (minúsculas, com o sublinhado):

| Coluna | Nome |
|---|---|
| Y | utm_source |
| Z | utm_medium |
| AA | utm_campaign |
| AB | utm_content |
| AC | utm_term |
| AD | fbclid |
| AE | fbp |
| AF | fbc |
| AG | id_lead |
| AH | id_qualificado |
| AI | qualificado |

Se a planilha não tiver colunas até a AI, clique com o botão direito na coluna X e em **Inserir 1 coluna à direita**, quantas vezes precisar.

**Deu certo se:** a linha 1 da aba respostas vai de **id_pessoa** (A) até **qualificado** (AI), sem nenhuma coluna de antes mudada de lugar.

### 4.2 · O código novo, depois

**Faça:**

1. No GitHub, abra `entregas/planilha-sdr-funil-01/Codigo.gs` e copie o arquivo inteiro (**Copy raw file**).
2. Na planilha, no menu, **Extensões** e **Apps Script**.
3. No arquivo **Codigo.gs** do editor, selecione tudo (Ctrl+A), apague e cole o código novo.
4. Clique no ícone de disquete (**Salvar projeto**). Não precisa rodar **instalar**: o gatilho de 5 minutos continua o mesmo.

**Deu certo se:** procurando no código (Ctrl+F) por **id_qualificado**, ele aparece. Na próxima rodada (até 5 minutos), o **Execuções** (menu da esquerda do Apps Script) mostra `buscarLeadsNovos` como **Concluída**, sem "cabecalho-diferente".

**Se der errado:** se aparecer "cabecalho-diferente", o cabeçalho do 4.1 tem algum nome diferente: confira letra por letra (o código compara o texto exato). Nenhum lead se perde: os que chegarem entram na próxima rodada depois da correção.

---

## Passo 5 · O teste no ar, com dois envios (15 min)

**Por quê.** Ver, de ponta a ponta, um lead que passa no corte e um que não passa, vindos de um "anúncio" de teste.

**Antes:** use nomes começando por **TESTE** e e-mail terminando em **@teste.invalid** (decisão #102), para a limpeza dos leads de teste achar os dois depois. Use uma **janela anônima nova** para cada envio, com e-mail e telefone diferentes.

### 5.1 · Envio A, que passa no corte

1. Abra uma janela anônima e, nela, o console do navegador: tecla **F12** (no Mac, Cmd+Option+J) e a aba **Console**.
2. Vá a `https://svsafra.gotriad.com.br/?utm_source=meta-ads&utm_campaign=funil-01&utm_content=teste&fbclid=teste` e clique em **Fazer a Análise**. Pode aceitar ou recusar os cookies: o teste do dataLayer funciona dos dois jeitos.
3. Responda com o exemplo do lead score, que dá faixa a: nome **TESTE Passa Corte**; ramo **Serviços para empresas**; faturamento **R$ 500 mil a R$ 1,5 milhão**; vendedores **2 ou 3**; quem marca **Sim. O vendedor faz tudo**; valor médio **10.000**; origem **Indicação de clientes**; CRM **Sim, e o time atualiza todo dia**; cargo **Dono(a) ou sócio(a)**; lembra dos números **Sim**, com **200, 50, 50, 40 e 2**; primeiro contato **Em até 1 hora**; tentativas **1 ou 2**; lead sem contato **Alguns**.
4. No contato: e-mail **passa.corte@teste.invalid**, um telefone de mentira (por exemplo, 00 90000-0101), a caixa marcada. Envie.
5. No console, cole e aperte Enter:

```
dataLayer.filter(e => e && typeof e.event === 'string' && e.event.indexOf('quiz_') === 0)
```

**Deu certo se:** aparecem três itens, nesta ordem: `quiz_iniciado`; `quiz_enviado` com `id_lead` (lead-, um número de 13 dígitos e 8 letras ou números); `quiz_qualificado` com `id_qualificado` (qualificado-...). Nenhum item tem nome, e-mail, telefone, faturamento ou outra resposta. **Anote o id_lead.**

### 5.2 · Envio B, que não passa no corte

Repita o 5.1 numa janela anônima nova, com estas trocas: nome **TESTE Nao Passa**; faturamento **Menos de R$ 50 mil**; e-mail **nao.passa@teste.invalid**; telefone 00 90000-0102.

**Deu certo se:** aparecem dois itens: `quiz_iniciado` e `quiz_enviado` com `id_lead`. **Nenhum** `quiz_qualificado`. Anote o id_lead.

### 5.3 · As linhas no Supabase

**Faça:** no SQL Editor, consulta nova, cole e clique em **Run**:

```
select e.gravado_em, p.nome, e.lead_score_faixa, e.qualificado, e.utm_source, e.utm_campaign,
       e.utm_medium, e.utm_content, e.utm_term, e.fbclid, e.fbp, e.fbc, e.id_lead, e.id_qualificado
  from public.eventos e
  join public.pessoas p on p.id_pessoa = e.id_pessoa
 where e.tipo = 'fim_quiz' and p.email in ('passa.corte@teste.invalid', 'nao.passa@teste.invalid')
 order by e.gravado_em;
```

**Deu certo se:** duas linhas, com utm_source **meta-ads**, utm_campaign **funil-01**, utm_content **teste**, fbclid **teste**, utm_medium e utm_term vazios, fbp e fbc vazios (NULL) e os id_lead que você anotou. A de **TESTE Passa Corte** tem faixa **a**, qualificado **true** e o id_qualificado; a de **TESTE Nao Passa** tem faixa **eliminatorio**, qualificado **false** e id_qualificado vazio.

### 5.4 · A planilha

**Faça:** espere até 6 minutos (o gatilho roda a cada 5, e o banco segura cada lead por 1 minuto) e abra a planilha.

**Deu certo se:** **TESTE Passa Corte** aparece na aba **fila** e na aba **respostas**; na respostas, as colunas Y a AI mostram meta-ads, (vazio), funil-01, teste, (vazio), teste, (vazio), (vazio), o id_lead, o id_qualificado e **sim**. **TESTE Nao Passa não aparece** em nenhuma das duas abas: a planilha só recebe as faixas a e b (é a regra de sempre, não um erro).

### 5.5 · Depois do teste

Os dois leads de teste saem do banco e da planilha pela limpeza de sempre (`dados/banco/limpar-leads-de-teste.sql`; APLICAR-PLANILHA-V3, passo 1, e a limpeza das abas). Avise o Claude do resultado de cada passo para ele registrar no log.md.

---

## Fontes

- Decisão #121 (base/decisoes.md v11); log.md, entrada de 18/11/2026, "rastreamento: origem, ids e avisos ao GTM".
- dados/banco/migracoes/003-origem-e-ids.sql e dados/banco/conferir.sql v4; entregas/garcom/garcom.mjs v6; entregas/quizzes/quiz-01/pagina/index.html v10; entregas/landings/landing-page-02/pagina/index.html v6; entregas/planilha-sdr-funil-01/Codigo.gs v4.
- Documentação da Cloudflare, lida em 18/11/2026: "Create API token" (developers.cloudflare.com/fundamentals/api/get-started/create-token/, atualizada em 06/11/2026: My Profile, API Tokens, Create Token; a chave aparece uma vez só e começa com cfut_) e "API token templates" (developers.cloudflare.com/fundamentals/api/reference/template/, atualizada em 20/04/2026: o modelo **Edit Cloudflare Workers**, com Workers Scripts Write, Workers Routes Write, Workers KV Storage Write, Workers Tail Read, Workers R2 Storage Write, Account Settings Read, User Details Read e User Memberships Read).
- entregas/prototipo-funil-01/APLICAR-21.md, passo 2 (o jeito de publicar) e entregas/planilha-sdr-funil-01/APLICAR-PLANILHA-V3.md, passo 4 (o jeito de colar o código).
