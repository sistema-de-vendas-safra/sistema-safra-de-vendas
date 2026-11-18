---
id: prototipo-funil-01-aplicar-22
versao: 2
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
    versao: 11
  - id: quiz-01-copy
    versao: 3
  - id: landing-page-02
    versao: 6
  - id: politica-de-privacidade
    versao: 7
  - id: aviso-de-cookies
    versao: 4
  - id: prototipo-funil-01
    versao: 19
  - id: planilha-sdr-funil-01
    versao: 4
  - id: decisoes
    versao: 12
desatualizado: true
---

# APLICAR-22 · origem do lead, ids, avisos ao GTM e os textos do Pixel da Meta no ar

Roteiro único do Otávio para levar ao ar as Etapas 2 e 3 de 18/11/2026:

- **Etapa 2 (#121):** a origem completa do lead (as cinco utm e o fbclid) gravada no Supabase e na planilha, os ids de evento (id_lead e id_qualificado) e os avisos ao Google Tag Manager (quiz_iniciado, quiz_enviado e quiz_qualificado).
- **Etapa 3 (#122):** a política de privacidade v7, o aviso de cookies v4 e o texto de aceite novo do quiz, que já contam o Pixel da Meta; e a recusa que avisa a Meta e apaga os cookies do Pixel.

**O que este roteiro NÃO liga:** o Pixel da Meta. Ele só entra pelo Google Tag Manager, numa tag que você publica lá depois deste roteiro (ver "Depois deste roteiro"). Por isso o teste do passo 5 é sem a Meta. Nada do site carrega o Pixel: a montagem do site confere isso a cada vez.

Um passo por ação, com o porquê, "Faça", "Deu certo se" e "Se der errado".

> **Cuidados.** Não grave nem compartilhe a tela dos passos 1, 2 e 4 (nem print, nem foto): o painel do Supabase, o da Cloudflare e o Apps Script mostram chave e dado de pessoa. A chave nova da Cloudflare só vai no formulário seguro que o Claude abre; nunca no chat, num arquivo ou num e-mail.

## A ordem, e por que nenhum lead cai

| Passo | O que | Quem | Tempo |
|---|---|---|---|
| 0 | O merge do pull request na main | Você | 1 min |
| 1 | O SQL no Supabase: a migração 003 e a conferência | Você | 5 min |
| 2 | A chave nova da Cloudflare e a publicação do garçom | Você e o Claude | 5 min |
| 3 | A publicação do site: landing, quiz, política e aviso | O Claude, com a sua conferência | 5 min |
| 4 | O cabeçalho novo da planilha e o Codigo.gs novo no Apps Script | Você | 5 min |
| 5 | O teste no ar, sem a Meta, com dois envios | Você | 20 min |

- **O banco vem primeiro.** Com a migração 003, o banco aceita os campos novos e continua aceitando o pacote de antes. O site de hoje continua gravando normalmente com o banco já migrado.
- **O garçom e o site sobem no mesmo instante (passos 2 e 3).** Eles moram no mesmo Worker da Cloudflare, e um comando de publicar troca os dois juntos, de uma vez: não existe um momento com o site novo e o garçom velho. É seguro também para quem está no meio do quiz: o garçom novo aceita o pacote de antes, então uma aba do quiz aberta antes da publicação grava normalmente. O passo 2 é a publicação; o passo 3 é a conferência, parte por parte, do que subiu.
- **Na planilha, o cabeçalho vem antes do código.** O código de hoje confere só as primeiras colunas: com o cabeçalho novo, ele continua funcionando. O código novo, com o cabeçalho de antes, para e avisa até o cabeçalho ser posto. Nenhum lead se perde nessa pausa: os leads ficam no banco e entram na rodada seguinte.

---

## Passo 0 · O merge do pull request (1 min)

**Por quê.** A publicação sai sempre da main (CLAUDE.md, regra 7).

**Faça:** no GitHub, abra o pull request do branch `claude/rastreamento-meta` e clique em **Merge pull request** e depois em **Confirm merge**. Ele já traz o registro da publicação de 18/11/2026 (o pull request #2): se o #2 ainda estiver aberto, pode fazer o merge dele antes ou depois, tanto faz.

**Deu certo se:** o pull request mostra **Merged**, em roxo.

**Se der errado:** se o GitHub disser que há conflito, não resolva no site: avise o Claude, que traz a main para o branch e resolve.

---

## Passo 1 · O SQL no Supabase (5 min)

**Por quê.** Cria as colunas novas em eventos (utm_medium, utm_content, utm_term, fbclid, fbp, fbc, id_lead, id_qualificado e qualificado), aceita meta-ads em utm_source e troca as duas funções (a do fim do quiz e a da planilha). Não apaga nem muda nenhuma linha e não mexe em segurança (RLS).

### 1.1 · Abrir o SQL Editor

**Faça:** entre em supabase.com com o Gmail do Safra, abra o projeto **sistema-de-vendas-safra** e, no menu da esquerda, o **SQL Editor**.

**Deu certo se:** o nome sistema-de-vendas-safra aparece no alto e o editor abre.

### 1.2 · Rodar a migração

**Faça:**

1. No GitHub, abra o arquivo `dados/banco/migracoes/003-origem-e-ids.sql` e copie o arquivo inteiro (**Copy raw file**, o ícone de duas folhas no alto do arquivo).
2. No SQL Editor, crie uma consulta nova (**New query**), cole e clique em **Run**.
3. Se aparecer o aviso de operação destrutiva ("Potential issue detected"), clique em **Run this query**: o aviso é por causa da troca da função da planilha, que não guarda dado.

**Deu certo se:** embaixo aparece "Success. No rows returned", sem nada em vermelho.

**Se der errado:** se aparecer "migração 002 não encontrada" (ou 001, ou esquema v2), pare e avise o Claude, com a frase em vermelho. A migração roda numa transação só: se deu erro, nada mudou no banco, e rodar de novo, depois de corrigir, é seguro.

### 1.3 · Conferir o banco

**Faça:** do mesmo jeito, copie `dados/banco/conferir.sql` do GitHub, crie outra consulta nova, cole e clique em **Run**.

**Deu certo se:** aparece uma tabela com **21 linhas** e a coluna **ok** com **true** em todas. A última (n = 99, "tudo certo") mostra em **encontrado** o texto **20 de 20**. A linha 20, "origem e ids do lead (migração 003)", mostra **9 colunas, 6 restrições, 2 listas com meta-ads, planilha v5**.

**Se der errado:** anote o número da linha falsa e o que aparece em **encontrado**, e avise o Claude. Não siga para o passo 2.

---

## Passo 2 · A chave nova da Cloudflare e a publicação do garçom (5 min)

**Por quê.** A chave antiga de publicar pela nuvem foi usada pela última vez em 18/11/2026 e saiu do ambiente. Publicar precisa de uma chave nova, só para Workers, com prazo para acabar.

### 2.1 · Criar a chave (painel da Cloudflare, documentação lida em 18/11/2026)

**Faça:**

1. Entre em dash.cloudflare.com com o Gmail do Safra.
2. Clique no ícone de pessoa, no alto à direita, e em **My Profile**. No menu da esquerda, **API Tokens**.
3. Se ainda aparecer a chave antiga de publicar pela nuvem (criada em 12/11/2026), clique nos três pontinhos dela e em **Delete** (ou **Revoke**, conforme o painel mostrar). Ela não deve continuar valendo.
4. Clique em **Create Token**. Na lista de modelos, ache **Edit Cloudflare Workers** e clique em **Use template**.
5. Em **Token name**, escreva `publicar-prototipo-funil-01`.
6. Em **Account Resources**, deixe **Include** e escolha a conta do Safra. Em **Zone Resources**, escolha **Include**, **Specific zone** e **gotriad.com.br**.
7. Em **TTL** (o prazo da chave), ponha uma data de fim daqui a 7 dias. Depois disso, a chave para de valer sozinha.
8. Clique em **Continue to summary** e depois em **Create Token**.
9. **A chave aparece uma vez só** (começa com `cfut_`). Não copie ainda: deixe a tela aberta e vá para o 2.2.

**Deu certo se:** a tela mostra que a chave publicar-prototipo-funil-01 foi criada, com o valor dela.

**Se der errado:** se o modelo **Edit Cloudflare Workers** não aparecer, pare e avise o Claude, com um print da lista de modelos (a lista não mostra chave nenhuma).

### 2.2 · Pedir a publicação

**Faça:** numa conversa do Claude Code online, neste repositório, escreva: **"pode publicar pelo APLICAR-22"** e cole junto o resultado do passo 1.3 ("20 de 20"). O Claude abre um **formulário seguro** para a chave da Cloudflare (endereço api.cloudflare.com). Copie a chave na tela do 2.1, cole **só no formulário** e salve. O Claude nunca vê o valor.

**Deu certo se:** o Claude responde com o **Current Version ID** novo e segue para o passo 3.

**Se der errado:** se o Claude disser que a chave não tem permissão para o domínio (um erro com "Authentication" ou "permission" e o nome gotriad.com.br), volte ao 2.1, edite a chave (**Edit**) e confira o item 6. Se a chave sumiu da tela antes de você colar, apague-a e crie outra: ela não pode ser vista de novo.

### 2.3 · O que o Claude faz, na ordem

1. Confere que a main tem o merge do passo 0, sem mudança solta, e que o passo 1 deu "20 de 20". **Sem o passo 1, não publica**: o garçom novo grava meta-ads, que o banco de antes recusaria.
2. Roda os testes que existem: o do garçom, o das migrações, o da planilha, o do quiz e o ensaio inteiro.
3. Confere a conta (`wrangler whoami`) e anota a versão que está no ar, para voltar a ela se precisar.
4. Publica, de uma vez, o garçom e o site: `node entregas/prototipo-funil-01/montar-site.mjs` e depois `wrangler deploy --config entregas/prototipo-funil-01/wrangler.toml`, com `WRANGLER_SEND_METRICS=false`. A montagem para e não publica se achar qualquer carregador do Pixel no site.
5. Registra a publicação (README do protótipo, conexoes.md, log.md e index.md).

---

## Passo 3 · A publicação do site: conferir landing, quiz, política e aviso (5 min)

O Claude confere tudo; os itens com "você também" dá para olhar no seu navegador, numa janela anônima.

| O que olhar | Certo é | Quem |
|---|---|---|
| O garçom | A porta pública aceita o pacote novo e o de antes (o Claude manda um pacote sem conteúdo válido e espera a recusa 422, sem gravar nada) | Claude |
| A landing | https://svsafra.gotriad.com.br/ abre a página de vendas | Claude; você também |
| O aviso de cookies | Aparece no topo com o texto novo: "A gente quer medir como este site é usado, com o Google Analytics, e medir os nossos anúncios no Facebook e no Instagram, com o Pixel da Meta. Os dois usam cookies..." | Claude; você também |
| O fbclid vai para o quiz | Abrindo `https://svsafra.gotriad.com.br/?utm_source=meta-ads&utm_campaign=funil-01&fbclid=teste` e clicando em "Fazer a Análise", o endereço do quiz tem `utm_source=meta-ads`, `utm_campaign=funil-01` e `fbclid=teste` | Claude; você também |
| O quiz | A aba mostra "Análise Estratégica do Sistema de Vendas" e o topo do quiz mostra "Triad" | Claude; você também |
| O aceite do quiz | No contato, o texto começa com "Antes do seu contato, o combinado. Seu nome, e-mail e WhatsApp servem para três coisas" e a caixa termina com "em código, para medir os anúncios da Meta." | Claude; você também |
| A política | https://svsafra.gotriad.com.br/politica-de-privacidade/ mostra, no item 7, "O que o Pixel da Meta coleta, segundo a documentação da Meta" | Claude; você também |
| Nada da Meta | Nenhuma página pede arquivo a facebook.com ou connect.facebook.net | Claude |

**Se algo der errado:** o Claude volta para a versão anotada no 2.3, item 3, com `wrangler rollback`, e avisa você. O banco não precisa voltar: ele aceita o site de antes.

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

**Se der errado:** se aparecer "cabecalho-diferente", algum nome do 4.1 está diferente: confira letra por letra. Nenhum lead se perde: os que chegarem entram na próxima rodada depois da correção.

---

## Passo 5 · O teste no ar, sem a Meta, com dois envios (20 min)

**Por quê.** Ver, de ponta a ponta, um lead que passa no corte que vale hoje e um que não passa, vindos de um "anúncio" de teste, antes de o Pixel existir.

**O corte que vale hoje** (CRITERIO_DO_FIM = "mais-restritivo", na página do quiz; conflito-16): passa quem atende às duas regras ao mesmo tempo. **A do Júnior:** fatura a partir de R$ 50 mil e tem pelo menos um vendedor. **E a do lead score:** nota 50 ou mais (faixa a ou b), sem eliminatório (faturamento abaixo de R$ 50 mil, nenhum vendedor ou valor médio abaixo de 5.000).

**Antes:** use nomes começando por **TESTE** e e-mail terminando em **@teste.invalid** (decisão #102), para a limpeza dos leads de teste achar os dois depois. Use uma **janela anônima nova** para cada envio, com e-mail e telefone diferentes.

### 5.1 · Abrir o quiz pelo "anúncio" de teste

1. Abra uma janela anônima e, nela, o console do navegador: tecla **F12** (no Mac, Cmd+Option+J) e a aba **Console**.
2. Vá a `https://svsafra.gotriad.com.br/?utm_source=meta-ads&utm_campaign=funil-01&utm_content=teste&fbclid=teste` e clique em **Fazer a Análise**. Pode aceitar ou recusar os cookies: o teste do dataLayer funciona dos dois jeitos.

### 5.2 · Envio A, que PASSA no corte (faixa a, nota 96)

Responda, na ordem do quiz:

| Pergunta | Resposta |
|---|---|
| Nome | TESTE Passa Corte |
| Ramo | Serviços para empresas |
| Faturamento por mês | R$ 500 mil a R$ 1,5 milhão |
| Vendedores | 2 ou 3 |
| Quem marca as conversas | Sim. O vendedor faz tudo |
| Valor médio de uma venda | 10.000 |
| De onde vêm os leads | Indicação de clientes |
| CRM | Sim, e o time atualiza todo dia |
| Cargo | Dono(a) ou sócio(a) |
| Lembra dos números? | Sim |
| Os números do funil, na ordem | 200, 50, 50, 40 e 2 (deixe as unidades como a tela mostrar) |
| Primeiro contato | Em até 1 hora |
| Tentativas | 1 ou 2 |
| Lead sem contato | Alguns |
| Contato | e-mail **passa.corte@teste.invalid**, WhatsApp de mentira **(00) 90000-0101**, caixa marcada |

Depois de enviar, no console, cole e aperte Enter:

```
dataLayer.filter(e => e && typeof e.event === 'string' && e.event.indexOf('quiz_') === 0)
```

**Deu certo se:** aparecem três itens, nesta ordem: `quiz_iniciado`; `quiz_enviado` com `id_lead` (lead-, um número de 13 dígitos e 8 letras ou números); `quiz_qualificado` com `id_qualificado` (qualificado-...). Nenhum item tem nome, e-mail, telefone, faturamento ou outra resposta. **Anote o id_lead.**

### 5.3 · Envio B, que NÃO PASSA no corte (faixa c, nota 24)

Numa janela anônima nova, repita o 5.1 e responda:

| Pergunta | Resposta |
|---|---|
| Nome | TESTE Nao Passa |
| Ramo | Serviços para empresas |
| Faturamento por mês | R$ 50 mil a R$ 150 mil |
| Vendedores | 1 |
| Quem marca as conversas | Sim. O vendedor faz tudo |
| Valor médio de uma venda | 6.000 |
| De onde vêm os leads | Indicação de clientes |
| CRM | Não. Fica no WhatsApp e na cabeça de cada um |
| Cargo | Vendedor(a) |
| Lembra dos números? | Sim |
| Os números do funil, na ordem | 30, 50, 5, 4 e 1 (deixe as unidades como a tela mostrar) |
| Primeiro contato | Em até 1 hora |
| Tentativas | 1 ou 2 |
| Lead sem contato | Alguns |
| Contato | e-mail **nao.passa@teste.invalid**, WhatsApp de mentira **(00) 90000-0102**, caixa marcada |

Este conjunto passa na regra do Júnior (fatura mais de R$ 50 mil e tem vendedor), mas fica na faixa c do lead score: é o que mostra que o corte vigente é o mais restritivo dos dois.

**Deu certo se:** o quiz termina no relatório de quem não se qualifica, e o console mostra dois itens: `quiz_iniciado` e `quiz_enviado` com `id_lead`. **Nenhum** `quiz_qualificado`. Anote o id_lead.

### 5.4 · As linhas no Supabase

**Faça:** no SQL Editor, consulta nova, cole e clique em **Run**:

```
select e.gravado_em, p.nome, e.lead_score_faixa, e.lead_score_nota, e.qualificado, e.utm_source, e.utm_campaign,
       e.utm_medium, e.utm_content, e.utm_term, e.fbclid, e.fbp, e.fbc, e.id_lead, e.id_qualificado,
       left(p.consentimento_texto, 90) as inicio_do_aceite, right(p.consentimento_texto, 60) as fim_do_aceite
  from public.eventos e
  join public.pessoas p on p.id_pessoa = e.id_pessoa
 where e.tipo = 'fim_quiz' and p.email in ('passa.corte@teste.invalid', 'nao.passa@teste.invalid')
 order by e.gravado_em;
```

**Deu certo se:** duas linhas, com utm_source **meta-ads**, utm_campaign **funil-01**, utm_content **teste**, fbclid **teste**, utm_medium e utm_term vazios, fbp e fbc vazios (NULL) e os id_lead que você anotou.

- **TESTE Passa Corte:** faixa **a**, nota **96**, qualificado **true** e o id_qualificado.
- **TESTE Nao Passa:** faixa **c**, nota **24**, qualificado **false** e id_qualificado vazio.
- **O aceite, nas duas:** inicio_do_aceite começa com "Antes do seu contato, o combinado. Seu nome, e-mail e WhatsApp servem para três coisas", e fim_do_aceite termina com "em código, para medir os anúncios da Meta.".

### 5.5 · A planilha

**Faça:** espere até 6 minutos (o gatilho roda a cada 5, e o banco segura cada lead por 1 minuto) e abra a planilha.

**Deu certo se:** **TESTE Passa Corte** aparece na aba **fila** e na aba **respostas**; na respostas, as colunas Y a AI mostram meta-ads, (vazio), funil-01, teste, (vazio), teste, (vazio), (vazio), o id_lead, o id_qualificado e **sim**. **TESTE Nao Passa não aparece** em nenhuma das duas abas: a planilha só recebe as faixas a e b (é a regra de sempre, não um erro).

### 5.6 · A recusa, no navegador

**Faça:** na janela do envio A, desça até o fim da página, clique em **Cookies** e em **Recusar**.

**Deu certo se:** o aviso some e a página continua igual. Sem o Pixel no ar, não há cookie da Meta para apagar: o ensaio confere a recusa da Meta com um Pixel de mentira (fbq('consent', 'revoke') e os cookies _fbp e _fbc apagados). Depois que o Pixel for ligado, repita este passo e confira, nas ferramentas do desenvolvedor (Aplicativo, Cookies), que _fbp e _fbc somem.

### 5.7 · Depois do teste

Os dois leads de teste saem do banco e da planilha pela limpeza de sempre (`dados/banco/limpar-leads-de-teste.sql`; APLICAR-PLANILHA-V3, passo 1, e a limpeza das abas). Avise o Claude do resultado de cada passo para ele registrar no log.md.

---

## Depois deste roteiro: o Pixel no Google Tag Manager

Fica fora deste roteiro e é com você, na conta do Safra (#122):

1. No conjunto de dados **Triad · Site** (2051896072170241), confira que continuam desligados: a correspondência automática de site, os eventos automáticos, o rastreamento automático sem código, as informações detalhadas de páginas e produtos e a medição nos dispositivos dos clientes.
2. No Google Tag Manager, a tag do Pixel e os quatro eventos (PageView, QuizIniciado, Lead e LeadQualificado), usando os avisos que o site já manda ao dataLayer (quiz_iniciado, quiz_enviado com id_lead e quiz_qualificado com id_qualificado). Teste no modo Visualizar antes de publicar, como o Google Analytics.
3. **Antes de publicar o contêiner:** confira no navegador os nomes e a validade dos cookies que o Pixel grava em svsafra.gotriad.com.br (ferramentas do desenvolvedor, Aplicativo, Cookies). Se a validade não for 90 dias, os itens 7 e 8 da política mudam antes (log.md, Pendências).

---

## Fontes

- Decisões #121 e #122 (base/decisoes.md v12); log.md, entradas de 18/11/2026, "rastreamento" e "Etapa 3".
- dados/banco/migracoes/003-origem-e-ids.sql e dados/banco/conferir.sql v4; entregas/garcom/garcom.mjs v6; entregas/quizzes/quiz-01/pagina/index.html v11 e copy.md v3 (M16); entregas/landings/landing-page-02/pagina/index.html v6; entregas/documentos/politica-de-privacidade.md v7 e aviso-de-cookies.md v4; entregas/prototipo-funil-01/medicao.mjs e montar-site.mjs v19; entregas/planilha-sdr-funil-01/Codigo.gs v4.
- As respostas dos dois envios de teste: as do ensaio (nucleo/ferramentas/ensaio/ensaio.mjs, EXEMPLO, nota 96, faixa a; FAIXA_C, nota 24, faixa c) e a regra do fim do quiz (CRITERIO_DO_FIM e LEAD_SCORE, na página do quiz).
- Documentação da Cloudflare, lida em 18/11/2026: "Create API token" (developers.cloudflare.com/fundamentals/api/get-started/create-token/, atualizada em 06/11/2026) e "API token templates" (developers.cloudflare.com/fundamentals/api/reference/template/, atualizada em 20/04/2026: o modelo Edit Cloudflare Workers).
- entregas/prototipo-funil-01/APLICAR-21.md, passo 2 (o jeito de publicar) e entregas/planilha-sdr-funil-01/APLICAR-PLANILHA-V3.md, passo 4 (o jeito de colar o código).
