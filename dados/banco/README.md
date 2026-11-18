---
id: banco-rascunho
versao: 6
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: planta-do-banco
    versao: 5
  - id: decisoes
    versao: 11
  - id: funil-01
    versao: 3
  - id: lead-score
    versao: 3
  - id: funil-01-planilha-sdr
    versao: 3
  - id: ficha-de-fatos
    versao: 4
  - id: regra-seguranca
    versao: 3
  - id: lacunas
    versao: 6
desatualizado: true
---

# Banco · rascunho

**Versão 6 (18/11/2026, #121).** Entra a migração 003 (migracoes/003-origem-e-ids.sql): nove colunas novas na gaveta eventos (utm_medium, utm_content, utm_term, fbclid, fbp, fbc, id_lead, id_qualificado e qualificado), meta-ads nas listas de utm_source, registrar_fim_quiz v4 (os campos novos opcionais; o mesmo id_lead de novo não grava outra linha) e leads_para_planilha v5 (as onze colunas da origem e dos ids no fim). Nenhuma mudança de RLS: as tabelas continuam sem acesso direto e só as três funções são portas. conferir.sql v4 ganha a linha 20 ("20 de 20" depois da 003). Ordem: esquema.sql, 001, 002, 003, conferir.sql. testar-migracao.mjs: 120 de 120 (eram 85), com a 003 duas vezes sobre os dados e a seção 8, que confere o pacote antigo, o novo, o reenvio, as recusas do banco e a planilha.

O banco de dados dos leads do funil-01, escrito a partir de dados/planta/planta.md, para o projeto sistema-de-vendas-safra do Supabase (decisão #99; conexoes.md). O esquema v2 já roda no projeto do Safra, com o protótipo ligado e dados de teste (#102; log.md, pedido 10). A migração da versão 3 (001) rodou no Supabase em 09/11/2026, pelo Otávio, com o conferir.sql v2 dando 18 de 18 (APLICAR-11, parte 2; prompts/14-estado-para-o-mentor.md, "APLICAR-11, em 09/11/2026"). **A migração 002 e o SQL de limpeza dos leads de teste ainda não foram executados no Supabase:** foram conferidos só numa cópia local do Postgres, sem serviço real (ver "Conferido nesta máquina"). Nenhum dado deste repositório é real.

**Status.** Rascunho, pendente do Otávio. Continua desatualizado, porque se apoia na planilha do SDR (funil-01-planilha-sdr v2), marcada por cadeia (regra 11.1).

**Versão 3 (etapa 32, 09/11/2026).** O banco com dados não é refeito: o esquema v2 (esquema.sql) fica como está e a versão 3 entra por uma **migração** (migracoes/001-v3.sql), que roda por cima, sem apagar nada, e pode rodar de novo (21.11; prompts/11-decisoes-de-09-11.md, etapa 32). Ver "O que muda na versão 3".

**Versão 5 (15/11/2026, planilha do SDR v3).** Pelo pedido do Otávio de 15/11/2026 (duas abas na planilha, a fila e as respostas completas; limpar a planilha e o banco). Entram dois arquivos de SQL e um muda:
- **migracoes/002-respostas-na-planilha.sql** (banco-migracao-002 v1): a função da planilha devolve, no fim, a coluna `respostas` (jsonb), com as respostas completas do quiz, para a aba respostas da planilha do SDR v3. Ver "O que muda com a migração 002".
- **limpar-leads-de-teste.sql** (banco-limpar-leads-de-teste v1): apaga do banco só os leads de teste (nome começando por TESTE **e** e-mail terminado em @teste.invalid) e os eventos ligados a eles. Ver "A limpeza dos leads de teste".
- **conferir.sql v3**: a linha 19, da migração 002 (19 linhas de conferência, mais a 99).
- esquema.sql continua o esquema v2: só o aviso do topo ganha a 002 na ordem (21.11).

**Versão 4 (etapa 34, 09/11/2026).** Só documentação: catalogo-prototipo.sql (v2) ganhou as linhas da landing-page-01 versão 1 e do quiz-01 versão 2, que as páginas da etapa 34 mandam (32.4). Nenhuma linha de SQL do esquema nem da migração mudou.

**Destino dos contatos em conflito · bloqueado para entrega até a decisão** (conflito-17, em base/lacunas.md). O lado 1 manda os contatos do quiz para uma conta nova do Triad CRM; o lado 2 (#90) manda para este banco pelo garçom e para a planilha do SDR. Este rascunho segue o lado 2, como a planta e o funil-01, sem escolher: se o lado 1 vencer, ele vira só a especificação do que o CRM precisa guardar. O protótipo de teste não é entrega: com gente de verdade, nada vai ao ar antes da decisão.

## O que tem dentro

| Arquivo | O que é |
|---|---|
| esquema.sql | O esquema v2: as tabelas, as restrições, as duas funções das portas do garçom, a visão do painel, a contagem das análises gratuitas e as fechaduras, em Postgres para o Supabase. Comentários em português. Já rodou no projeto do Safra; o SQL não muda (21.11). A versão 3 do arquivo só ganhou o aviso do topo, com a ordem dos arquivos |
| migracoes/001-v3.sql | A migração do banco v2 para o v3, sobre os dados que já existem, sem apagar nada e numa transação só. Pode rodar de novo e dá o mesmo resultado. Ver "O que muda na versão 3". Rodou no Supabase em 09/11/2026 |
| migracoes/002-respostas-na-planilha.sql | A migração das respostas completas na função da planilha (v5 deste rascunho). Só troca a função e refaz as fechaduras, numa transação só; pode rodar de novo. Ver "O que muda com a migração 002" |
| limpar-leads-de-teste.sql | Apaga do banco só os leads de teste e os eventos ligados a eles, numa transação só, conferindo antes do commit. **Não dá para desfazer.** Ver "A limpeza dos leads de teste" |
| conferir.sql | Uma consulta só de leitura que confere, linha por linha, se o banco ficou como devia depois das migrações: tabelas, RLS, quem pode o quê, funções, trava, índices, visões e o que as migrações puseram. Cada linha diz o esperado e dá ok verdadeiro ou falso (v3: 19 linhas, mais a 99) |
| catalogo-prototipo.sql | As linhas do catálogo de entregas que o protótipo precisa para o banco aceitar os eventos das páginas (23.10; 32.4): quiz-01 versão 1 (a página v2, que já gravou dados de teste), quiz-01 versão 2 (a página v3) e landing-page-01 versão 1 (a visita, igual nas duas variantes; pergunta 34.4). v2: só acrescenta, com `on conflict do nothing`; não apaga nem muda linha. Rodado depois do conferir.sql (25.3) |
| testar-migracao.mjs | O teste local das migrações 001 e 002 e da limpeza dos leads de teste, num Postgres dentro do Node (PGlite, o do ensaio), sem rede. Ver "Conferido nesta máquina" |

## O que muda na versão 3

Pela planta v4 (dados/planta/planta.md) e pelas decisões do Otávio de 09/11/2026 (prompts/11-decisoes-de-09-11.md; base/decisoes.md, #114). Tudo em migracoes/001-v3.sql.

- **Clique no fim do quiz** (18.4, com 14.15, 15.16 e 16.13; 31.15): tipo de evento novo `interesse_pos_relatorio`, gravado pelo garçom, com o campo novo `clique_fim_quiz` na gaveta eventos. Lista fechada **proposta**: quero-conversa, chamar-whatsapp, tenho-interesse, agora-nao, um valor por botão do fim do quiz. O clique só existe nesse tipo, e esse tipo sempre leva sessão, pessoa e clique.
- **Porta nova `registrar_evento`** para a visita, o início do quiz e o clique (18.5, 10.6, 10.8). É a porta pública do garçom para eventos **sem dado de pessoa**, e por isso sem aceite: o pacote é só `{ "evento": {...} }`; com "pessoa", com campo fora da lista ou com outro tipo, é recusado. O fim do quiz continua só por `registrar_fim_quiz`, que não mudou.
  - Etiqueta presente e vazia conta como etiqueta: a visita sem etiqueta no link entra com a origem vazia (10.8); etiqueta que nem veio também vira vazio. Origem fora da lista é recusada pela tabela (o garçom esvazia antes, 5.5). A entrega e a versão precisam estar no catálogo (18.8); a sessão é obrigatória.
  - A visita e o início do quiz nascem sem pessoa e são ligados a ela pelo fim do quiz da mesma sessão, como no v2 (6.2). Se o fim do quiz da sessão chegou antes (envio fora de ordem), já nascem ligados. Sessão com fins de quiz de duas pessoas: nascem sem pessoa, sem escolher ninguém.
  - O clique só entra se a sessão tiver o fim do quiz de uma pessoa só; sem fim do quiz (quem desmarcou a caixa, 30.3) é recusado (pergunta 32.2).
- **Estado nutricao** na lista (5.3, com 15.11) e **produto** com lista fechada, iasv ou essencial (5.3); na v2, o produto era sempre vazio.
- **Função da planilha v3:** na faixa b, `respostas_a_confirmar` ganha as duas respostas do histórico, `leads-por-mes` (a linha "Leads por mês" dos números do quiz; não vem no modo chute) e `crm` (15.4, com 21.8); coluna nova `clique_fim_quiz`, o último clique da pessoa no fim do quiz (18.4, com 15.16). Quem entra, o cursor, a margem de 1 minuto e o teto de 200 não mudaram.
- **Fechaduras de novo**, as mesmas do v2, com a terceira porta: anon executa `registrar_fim_quiz` e `registrar_evento`; service_role, só `leads_para_planilha`; nada para mais ninguém, nenhuma permissão padrão, as três funções com SECURITY DEFINER e search_path vazio (#99, #100).
- **Já valiam no v2, sem mudança:** a nota guardada também no eliminatório (14.8: a restrição do fim do quiz exige a nota em toda faixa); entrou_em e tentativas_feitas na planilha (15.3). A ordem dentro da faixa (15.6) é da planilha, não do banco: a função continua entregando na ordem do cursor, que é o que garante não perder nem repetir lead (pergunta 32.6).
- **Fica para depois (6.6):** o papel e a chave do painel, do contador e da volta do status nascem quando cada um existir (log.md, Pendências).

**Seguro com os dados que já existem.** Nenhuma tabela, coluna ou linha é apagada nem reescrita; a migração não tem DELETE, TRUNCATE nem DROP de tabela ou coluna. As listas novas só acrescentam valores às antigas, então toda linha que já passou na regra v2 passa na v3; a coluna nova nasce vazia e só é exigida no tipo novo. O Postgres confere todas as linhas ao ligar cada restrição, e a migração roda numa transação só: se algo falhar, nada muda. As restrições do v2 que mudam (lista de tipos, de estados, do produto e quem grava cada tipo) não tinham nome escrito no esquema; a migração as acha pelas colunas que olham, e não pelo nome, e põe no lugar as v3, com nome.

## O que muda com a migração 002

Pelo pedido do Otávio de 15/11/2026 (log.md, entrada de 15/11/2026). Tudo em migracoes/002-respostas-na-planilha.sql.

- **Função da planilha v4:** `leads_para_planilha` devolve tudo o que a v3 (da 001) devolve, na mesma ordem, e mais uma coluna no fim, **respostas** (jsonb): as respostas completas do quiz, como a página mandou (o objeto `respostas` do pacote do fim do quiz), do **primeiro** fim de quiz da pessoa em faixa a ou b, o mesmo evento que já dá a nota, a faixa e entrou_em. Quem refaz o quiz não muda a linha (21.5).
- **Quem entra não muda:** faixas a e b, aceite do WhatsApp, consentimento não retirado, margem de 1 minuto, cursor, teto de 200. respostas_a_confirmar da faixa b e o clique também não mudam.
- **As fechaduras de novo, iguais às da 001:** anon executa registrar_fim_quiz e registrar_evento; service_role, só leads_para_planilha; nada para mais ninguém; a função continua SECURITY DEFINER, com search_path vazio.
- **Confere antes:** se o esquema v2 ou a 001 não estiverem no banco, para no passo 0, sem mudar nada.
- **Seguro com os dados:** só troca uma função, que não guarda dado; sem DELETE, UPDATE, TRUNCATE nem DROP de tabela ou coluna.
- **O garçom não muda:** a porta privada repassa os leads como vêm do banco (entregas/garcom/garcom.mjs, portaPlanilha; teste do garçom 360 de 360). A planilha v2 ignora a coluna nova; a v3 escreve a aba respostas com ela. A planilha v3 com o banco ainda sem a 002 escreve a aba respostas com as colunas das respostas vazias.
- **Se esquema.sql ou a 001 forem rodados de novo**, rodar a 002 logo depois: os dois refazem a função sem a coluna respostas (conferir.sql avisa na linha 19).
- O número 002 foi usado aqui; a migração do aceite como histórico que a fila 13 previa como "002" (prompts/13-correcoes-e-decisoes-restantes.md, etapa 42) passa a ser a seguinte (pergunta 5 da entrada de 15/11/2026 no log.md).

## A limpeza dos leads de teste

dados/banco/limpar-leads-de-teste.sql, para o Otávio rodar no SQL Editor do Supabase (roteiro entregas/planilha-sdr-funil-01/APLICAR-PLANILHA-V3.md, passo 1). **Não dá para desfazer.**

- **Quem sai:** só a pessoa com as duas marcas do #102 juntas, o nome começando por TESTE (sem diferenciar maiúsculas) **e** o e-mail terminado em @teste.invalid, e todos os eventos ligados a ela (o fim do quiz, o clique, a visita e o início do quiz ligados pela sessão, os do SDR). Quem tem só uma das marcas fica. A linha real do Otávio de 09/11 não tem as marcas e fica (pergunta 4 da entrada de 15/11/2026 no log.md).
- **O que fica:** todas as outras pessoas e os eventos delas, e os eventos sem pessoa (visitas e inícios do quiz de quem não terminou o quiz, sem dado pessoal).
- **Como:** numa transação só. Guarda quem vai sair e as contagens (só números); desliga a trava dos eventos (eventos_sem_mudanca, que não deixa apagar evento) só dentro da transação; apaga os eventos dessas pessoas e depois as pessoas (o evento aponta para a pessoa); liga a trava de novo; confere que nenhuma pessoa de teste nem evento delas sobrou, que as outras pessoas, os eventos delas e os eventos sem pessoa ficaram com o mesmo número e que a trava está ligada. Se algo não bater, dá erro e nada é apagado. No fim, uma tabela com 6 linhas (antes, depois e ok), sem nome, e-mail ou telefone.
- **Rodar de novo:** não acha ninguém e não apaga nada.
- Não é o caminho de apagamento do #106 (prazo de guarda, pedido de quem retira o consentimento): é a limpeza de propósito dos dados de teste que "O que falta para ir ao ar", item 3, pedia.

## O que mudou da versão 1 para a 2

Decisões #99 e #100 (base/decisoes.md), que respondem 18.2, 18.9 e os itens 1 a 3 de 18.11 (prompts/07-fila-perguntas.md).

- **Nenhuma permissão padrão** (#99). O projeto foi criado com "Automatically expose new tables" desligado. O esquema retira tudo de todo mundo (PUBLIC, anon, authenticated e service_role) nas tabelas, visões, sequências e funções, inclusive o EXECUTE que o Postgres dá a toda função nova, e faz o mesmo para o que for criado depois. Depois dá só duas permissões.
- **Duas chaves, uma por porta do garçom** (#100). A chave publicável (papel anon) só executa `registrar_fim_quiz`. A chave secreta (papel service_role) só executa `leads_para_planilha`. Na v1, o papel de serviço gravava; agora ele não grava nada e anon não lê nada.
- **As duas funções rodam com os direitos do dono** (SECURITY DEFINER), com search_path vazio e todos os nomes escritos com o esquema na frente, como recomenda o linter do Supabase. Sem FORCE ROW LEVEL SECURITY: o dono das tabelas passa pela fechadura; anon e authenticated ficam trancados.
- **Uma pessoa por telefone e uma por e-mail.** Índice único parcial no telefone contado só pelos dígitos e no e-mail em minúsculas, como a #100 manda; a condição só tira o vazio, que a tabela já não aceita (21.1). O telefone passa a precisar de 8 a 15 dígitos, para dois telefones só com sinais não virarem a mesma pessoa. Dois envios da mesma pessoa no mesmo instante não criam duas linhas: o segundo espera o primeiro, acha a linha e grava o próprio evento. Telefone de uma pessoa com e-mail de outra é recusado (21.2).
- **Função nova da planilha** (`leads_para_planilha`): até 200 leads por pedido, em ordem, a partir de um cursor. Ver "A função da planilha".
- **Visões do painel sem security_invoker**, com SELECT retirado de todo mundo até existir o papel do painel (18.3).
- **O catálogo de entregas é conferido pelo banco** (chave estrangeira), não pelo garçom (18.8; planta v3).
- **Sem pgcrypto**: `gen_random_uuid()` já vem no Postgres.
- O resto da v1 continua igual: as quatro gavetas, as listas fechadas, as etiquetas obrigatórias, a trava dos eventos, as regras da planta como restrição.

## O que o esquema faz

- **As quatro gavetas da planta**, com os mesmos nomes de tabela e de campo: `pessoas`, `eventos`, `entregas` e `investimento`. A gaveta `investimento` existe, mas está marcada como **fora do MVP** enquanto a Meta estiver fora (conexoes.md); nenhuma chave grava nem lê nela.
- **Etiquetas obrigatórias** (funil, entrega, versao_entrega, utm_source, utm_campaign) como NOT NULL em todo evento. As utm aceitam vazio, porque a planta manda gravar vazio o que veio fora da lista (5.5).
- **Listas fechadas como CHECK:** tipos de evento, estágios, estados, faixas do lead score, canais do SDR, sim ou não do consentimento, origens e campanhas da tabela de origens do funil-01, tipos de entrega. Valor fora da lista não entra. Desde a versão 3, nutricao está na lista dos estados e `produto` tem a lista iasv e essencial (5.3).
- **Regras da planta como restrição:** pelo menos um canal aceito com texto e data do consentimento; fim do quiz sempre com pessoa, sessão, respostas e lead score; stand-by sempre com data_volta; venda leva o estágio venda e perda leva o estado perdido (6.5); o par entrega e versão precisa existir no catálogo (6.6; 18.8); cada tipo de evento só pode ser gravado por quem a planta diz.
- **Evento não se apaga nem se reescreve:** uma trava recusa qualquer mudança, menos ligar à pessoa a visita e o início do quiz da mesma sessão no fim do quiz (6.2). Vale também para o clique no fim do quiz (v3).
- **Pessoa repetida:** `registrar_fim_quiz` reconhece quem já está no banco pelo telefone ou pelo e-mail e liga o evento novo à mesma linha, sem o garçom ler nada (6.3). A linha da pessoa não muda, nem o consentimento (18.6).
- **Painel:** a visão `painel_numeros` só tem números agregados por mês, entrega e versão, origem, faixa e estágio. Nenhum nome, telefone, e-mail, resposta nem id_pessoa.
- **Análises gratuitas:** a visão `contagem_analises_gratuitas` devolve só quantas foram usadas, contando uma por pessoa que terminou o quiz (recomendação de 5.7, ainda não decidida). O total de ficha-de-fatos#analises-gratuitas e o limite de ficha-de-fatos#barra-de-resgates não são escritos no banco: quem compara é o contador, que não vai ao ar até a decisão de 5.7 (6.7).

## A função da planilha

`leads_para_planilha(apos_gravado_em, apos_id_pessoa, quantos)`, chamada só pela porta privada do garçom, com a chave secreta.

- **Quem entra:** só faixas a e b (nunca c nem eliminatorio), só quem não retirou o consentimento e, por escolha provisória, só quem aceitou WhatsApp, o caminho em que menos gente é contatada (21.4).
- **Uma vez por pessoa:** cada pessoa entra pelo primeiro fim de quiz dela em faixa a ou b. Quem refaz o quiz não aparece de novo, e a linha que já foi não é atualizada (21.5).
- **Colunas:** as que funis/funil-01/planilha-sdr.md marca como "Banco", na mesma ordem: id_pessoa, nome, telefone, email, empresa, consentimento_whatsapp, consentimento_email, lead_score_faixa, lead_score_nota, respostas_a_confirmar (só na faixa b: valor da venda, vendedores e, desde a v3, leads por mês e CRM; 15.4), entrou_em (a hora do servidor em que o fim do quiz foi gravado, não a do navegador; 15.3; 21.16), tentativas_feitas (15.3; 21.7), clique_fim_quiz (o último clique da pessoa no fim do quiz, desde a v3; 18.4), estagio, estado e data_volta atuais (21.9). Mais `cursor_gravado_em`, para o cursor, e, desde a migração 002, `respostas`, as respostas completas do quiz, para a aba respostas da planilha (funis/funil-01/planilha-sdr.md v3, "Aba respostas").
- **O clique chega uma vez só:** a linha que já foi para a planilha não é atualizada (21.5). Se a pessoa clicar depois de a planilha ter lido a linha dela, o clique fica no banco e não chega à planilha (pergunta 32.3).
- **O cursor** é o par (gravado_em do fim de quiz de entrada, id_pessoa). A função devolve, em ordem desse par, só quem vem depois do par recebido. Na primeira vez, os dois vão vazios; depois, vão o `cursor_gravado_em` e o `id_pessoa` da última linha recebida, **exatamente como vieram** (o horário tem microssegundos; arredondado, a última linha volta repetida). Gente gravada no mesmo instante é desempatada pelo id_pessoa: ninguém se perde nem se repete. Mandar só um dos dois é recusado. O horário vem com o fuso no fim ("+00:00"): quem chamar pela API com GET, com o cursor no endereço, precisa codificar o sinal de mais (%2B), senão ele vira espaço e o horário quebra. Para a etapa 22: o garçom deve mandar o cursor bem codificado (ou no corpo de um POST).
- **Margem de 1 minuto:** só aparece quem foi gravado há mais de 1 minuto, para uma gravação que começou antes e terminou depois de uma leitura não ficar para trás do cursor (21.6).
- **No máximo 200** por pedido, mesmo que se peça mais.

## As fechaduras

- Row level security ligada nas quatro tabelas, **sem nenhuma política** e sem FORCE: quem vem de fora não lê nem grava nada direto nas tabelas.
- **anon** (chave publicável) só executa `registrar_fim_quiz` e, desde a v3, `registrar_evento`. **service_role** (chave secreta) só executa `leads_para_planilha`. **authenticated** e **PUBLIC** não têm nada. No Supabase, o service_role passa por cima da RLS, mas sem permissão em tabela não lê nada; quem tiver a chave secreta consegue, no máximo, os leads da planilha.
- **As chaves antigas** (legacy anon e service_role, em formato JWT) foram desativadas em 09/11/2026, mas o painel avisa que continuam válidas como JWT: a antiga service_role abre tudo o que a secreta nova abre. Aposentar de vez é trocar a assinatura do projeto, antes de ir ao ar (conexoes.md, linha do Supabase; log.md, Pendências).
- As visões do painel e do contador não têm leitor além do Otávio, pelo painel do Supabase, até as chaves delas existirem (18.3).
- A volta do status do SDR ainda não tem caminho no banco (18.3).

## Como aplicar

A ordem é sempre esta:

1. **esquema.sql (v2): já rodado** no projeto do Safra. Não rodar de novo: o banco já tem dados, e rodar o esquema de novo não muda tabela que já existe (21.11). Num projeto novo e vazio, a ordem é a mesma (esquema.sql, a migração e conferir.sql) e, para o protótipo, catalogo-prototipo.sql no fim.
2. **migracoes/001-v3.sql**, a migração 001: **já rodada** no projeto do Safra, em 09/11/2026.
3. **migracoes/002-respostas-na-planilha.sql**, a migração 002 (v5; roteiro APLICAR-PLANILHA-V3.md, passo 2).
4. **conferir.sql (v3)**, a conferência: 19 de 19.
5. **catalogo-prototipo.sql**, no protótipo, antes de publicar as páginas da etapa 34: no banco que já tem a linha do quiz-01 versão 1, acrescenta só as duas linhas novas e mostra as três (conferido no PGlite: rodado duas vezes, três linhas, a data da linha antiga sem mudar).

A limpeza dos leads de teste (limpar-leads-de-teste.sql) não faz parte da ordem: roda quando o Otávio decidir limpar, de preferência antes da migração 002 e de recriar as abas da planilha (APLICAR-PLANILHA-V3.md, passo 1).

Passo a passo da migração (o roteiro da etapa 35 traz a versão para o Otávio da 001; o APLICAR-PLANILHA-V3.md, a da 002, que é igual, com o arquivo 002):

1. Entrar no Supabase com sistemadevendassafra@gmail.com e abrir o projeto **sistema-de-vendas-safra** (conexoes.md).
2. No menu da esquerda, abrir o **SQL Editor** e criar uma consulta nova (New query).
3. Abrir dados/banco/migracoes/001-v3.sql no repositório, copiar o arquivo **inteiro**, colar no editor e clicar em **Run**. Se o editor mostrar o aviso de operação destrutiva ("Potential issue detected"), confirmar com **Run this query**: é esperado, por causa dos drop de restrição e de função e dos revoke do arquivo; nenhuma tabela, coluna ou linha é apagada. Deve terminar com "Success. No rows returned", sem erro em vermelho. Rodar numa hora sem teste em curso: troca de restrição trava a tabela eventos por um instante.
4. Criar outra consulta nova, colar dados/banco/conferir.sql inteiro e clicar em **Run**.
5. Comparar com "Como conferir", abaixo.

Se o passo 3 der erro, nada mudou (a migração roda numa transação só): não siga, copie só a mensagem de erro (ela não tem chave nem dado pessoal) e traga para o repositório. Rodar a migração de novo não quebra nada e dá o mesmo resultado. Se um dia esquema.sql for rodado de novo, rode a migração logo depois: o esquema v2 refaz a função da planilha e as permissões do jeito v2.

A migração não mexe no garçom: o garçom v3, que está no ar, continua chamando registrar_fim_quiz e leads_para_planilha como antes (a função da planilha só manda um campo a mais, que o garçom repassa e a planilha v1 ignora). A visita, o início do quiz e o clique só chegam ao banco com o garçom da etapa 33 e as páginas da etapa 34. Para a visita da landing e os eventos do quiz novo entrarem, o catálogo precisa das linhas da landing-page-01 versão 1 e do quiz-01 versão 2, que catalogo-prototipo.sql v2 acrescenta (32.4; etapa 34). Publicar as páginas novas antes de rodar o catálogo deixa a visita, o início do quiz e o fim do quiz novo recusados pela chave estrangeira.

## Como conferir

conferir.sql (v3) devolve uma tabela com 20 linhas: as conferências de 1 a 19 e a linha 99, "tudo certo". **Deu certo quando todas as linhas têm ok = true**, e a linha 99 diz "19 de 19". Com a 001 e sem a 002, só a linha 19 dá false, e a linha 99 diz "18 de 19": é o aviso de que falta rodar a 002. Num banco só com o esquema v2, sem as migrações, as linhas 4, 8 e 14 a 19 dão false, e a linha 99 diz "11 de 19". Em resumo, o esperado:

| n | Conferência | Esperado |
|---|---|---|
| 1 | tabelas existem | entregas, eventos, investimento, pessoas |
| 2 | RLS ligada em todas, sem FORCE | nenhuma fora da regra |
| 3 | nenhuma política de RLS | 0 políticas |
| 4 | anon pode só isto | funcao registrar_evento, funcao registrar_fim_quiz |
| 5 | authenticated pode só isto | nada |
| 6 | service_role pode só isto | funcao leads_para_planilha |
| 7 | PUBLIC não tem nada | nada |
| 8 | funções das portas | as três com definer=true e search_path="" |
| 9 | função da trava | definer=false e search_path="" |
| 10 | trava dos eventos ligada | eventos_sem_mudanca (estado O) |
| 11 | índices únicos e parciais | pessoas_email_unico, pessoas_telefone_unico, os dois com WHERE |
| 12 | visões sem security_invoker | as duas com security_invoker=false |
| 13 | permissões padrão do papel atual | nenhuma |
| 14 | campo clique_fim_quiz na gaveta eventos | clique_fim_quiz (text) |
| 15 | restrições v3 da gaveta eventos | as 7 de 001-v3.sql, todas conferidas ("todas lá") |
| 16 | listas antigas trocadas, sem sobra | eventos_estado_lista, eventos_produto_lista, eventos_quem_grava, eventos_tipo_lista |
| 17 | valores novos nas listas | interesse_pos_relatorio, nutricao, iasv e essencial |
| 18 | função da planilha v3 | leads_para_planilha com clique_fim_quiz e o histórico |
| 19 | função da planilha v4 (respostas), da migração 002 | leads_para_planilha (com a coluna respostas no fim) |

Se alguma linha der false, não use as chaves: anote o número da linha e o que apareceu em "encontrado" e rode a migração de novo. Se continuar false, traga a linha para o repositório.

## Conferido nesta máquina

**Versão 5 (15/11/2026, planilha do SDR v3).** `node dados/banco/testar-migracao.mjs`, da raiz: **85 de 85** (antes, 64 de 64), e conferir.sql **19 de 19**. Além do que a versão 3 já conferia (abaixo, com conferir.sql v3: o banco só v2 avisa nas linhas 4, 8 e 14 a 19):

- entre a 001 e a 002, conferir.sql avisa só na linha 19 ("18 de 19");
- a migração 002 roda **duas vezes** sobre os dados: sem erro, cada linha de pessoas, eventos e entregas igual, e a segunda rodada deixa o esquema igual ao da primeira; num banco só com o esquema v2 (sem a 001), ela para no passo 0 e não muda a função;
- com SET ROLE service_role: leads_para_planilha com as 18 colunas, a última `respostas`, igual às respostas que a página mandou, na faixa a e na faixa b (com a lista dos números);
- esquema.sql rodado de novo: a 001 de novo deixa o esquema como depois da 001 (conferir avisa só na linha 19), e a 002 de novo deixa como antes, sem mudar dado;
- **a limpeza** (seção 7), com dados de mentira: 6 pessoas de teste (uma com o nome em minúsculas e o e-mail em maiúsculas) e 16 eventos delas; ficam uma pessoa só com o nome TESTE, uma só com o e-mail @teste.invalid e uma "de verdade" de mentira (nome sem TESTE, e-mail @exemplo.invalid), com os 10 eventos delas, e 3 eventos sem pessoa. Na primeira vez, a tabela do fim tem 6 linhas, todas ok, só com números (pessoas de teste 6 para 0, eventos 16 para 0); as pessoas e os eventos que ficam estão iguais, linha por linha; a trava continua ligada (apagar evento continua recusado); leads_para_planilha entrega só os 3 que ficaram. Na segunda vez, não acha ninguém e não muda nada. Com a trava desligada antes, a limpeza para no passo 0 e não apaga nada.

O ensaio geral (nucleo/ferramentas/ensaio/, v12) aplica as duas migrações duas vezes e roda a planilha v3: 269 de 269.

**Versão 3 (09/11/2026, etapa 32).** `node dados/banco/testar-migracao.mjs`, da raiz do repositório: PGlite 0.5.15 (PostgreSQL 18.6) de nucleo/ferramentas/ensaio/, só na memória, sem rede, com os papéis de mentira do ensaio (o dono começa com as permissões padrão do pior caso). Resultado: **64 de 64**, e conferir.sql **18 de 18**. O teste:

- aplica esquema.sql (v2) e catalogo-prototipo.sql e confere que conferir.sql v2 avisa num banco só v2 (false nas linhas 4, 8 e 14 a 18);
- grava dados de teste do jeito v2 (#102: nome TESTE, e-mail @teste.invalid, telefones com zeros): quatro fins de quiz pelas portas (faixas a, b, c e eliminatório), uma visita e dois eventos do SDR;
- roda a migração **duas vezes**: sem erro, cada linha de pessoas, eventos e entregas igual antes e depois, e a segunda rodada deixa restrições, colunas, funções e permissões iguais às da primeira; num banco sem o esquema v2, a migração para no primeiro passo e não cria nada;
- conferir.sql: 18 de 18;
- com SET ROLE anon: visita com etiquetas vazias e sem etiquetas (entram vazias), início do quiz, clique numa sessão com fim do quiz (ligado à pessoa), visita que chega depois do fim do quiz (já ligada); recusados: origem fora da lista, sem sessão, pacote com pessoa, campo a mais, fim do quiz e evento do SDR por esta porta, entrega fora do catálogo, clique numa visita, clique sem fim do quiz na sessão, clique fora da lista ou sem valor;
- nota guardada no eliminatório e eliminatório sem nota recusado (14.8); nutricao e produto iasv aceitos, valores fora da lista recusados; clique gravado como volta do status recusado;
- com SET ROLE service_role: leads_para_planilha com as 17 colunas, faixa b com leads-por-mes e crm, o último clique, nutricao e venda nos atuais, cursor em duas páginas sem repetir;
- quem pode o quê: anon não chama a planilha nem lê tabela ou visão; service_role, authenticated e um papel qualquer não executam registrar_evento; a trava continua recusando apagar e reescrever evento;
- esquema.sql rodado de novo depois da migração: conferir.sql avisa (false nas linhas 4 e 18), e a migração rodada de novo deixa tudo como antes, sem mudar nenhum dado.

Na época (09/11/2026), o ensaio geral ainda aplicava só o esquema v2 e esperava o conferir.sql v1 ("13 de 13"); a etapa 35 o atualizou (pergunta 32.7).

**Versão 2.** Numa cópia local do Postgres que roda dentro do Node (PGlite 0.5.15, em nucleo/ferramentas/ensaio/, só a dependência, sem script ainda), com os papéis anon, authenticated e service_role criados de mentira, em 08/11/2026:

- esquema.sql rodou inteiro duas vezes seguidas, sem erro;
- conferir.sql deu 13 de 13 depois do esquema, e deu false nas linhas certas quando uma permissão foi dada a anon e a RLS foi desligada de propósito;
- anon gravou o fim do quiz e não conseguiu ler tabela, visão nem chamar a função da planilha; service_role e authenticated não conseguiram gravar; service_role chamou a função da planilha;
- pessoa repetida (mesmo telefone com outra formatação, e-mail em maiúsculas) não virou outra linha; telefone de uma pessoa com e-mail de outra foi recusado;
- a planilha recebeu só faixas a e b com WhatsApp aceito, cada pessoa uma vez; 250 leads gravados no mesmo instante saíram em duas páginas (200 e 50), sem repetir nem perder; cursor pela metade foi recusado;
- apagar evento foi recusado pela trava.

**O que só se confere no Supabase de verdade:** dois envios realmente simultâneos (a cópia local tem uma conexão só), as permissões que o próprio Supabase dá aos papéis dele, a chamada pela API (PostgREST) com cada chave e o aviso do linter sobre as visões (esperado, 21.13). O ensaio completo é a etapa 25.

## O que falta para ir ao ar com gente de verdade

1. **Decisão do conflito-17** pelo Júnior e pelo Euclides (aprovação da #90).
2. **Rodar a migração 001, o conferir.sql e o catalogo-prototipo.sql v2 no Supabase** (roteiro da etapa 35), com o garçom da etapa 33 e as páginas da etapa 34 para os eventos novos chegarem.
3. **Limpar os dados de teste** (leads com e-mail @teste.invalid e nome começando por TESTE, #102) de propósito, ou recomeçar o banco do zero, e registrar como foi feito. A trava não deixa apagar evento (log.md, Pendências). Desde a v5, o limpar-leads-de-teste.sql faz isso, desligando a trava só dentro da transação; falta o Otávio rodar (APLICAR-PLANILHA-V3.md, passo 1). A linha real do Otávio de 09/11 não sai por ele.
4. **Caminho de apagamento** (#106): o prazo de guarda está em ficha-de-fatos#prazo-de-guarda; o que se apaga, o que vira anônimo, quem faz e como fica registrado é pendência com prazo (log.md, Pendências). Até lá, nada é apagado automaticamente, e a trava dos eventos não deixa apagar nem pelo garçom (6.8; 18.10).
5. Aprovação da planta (6.1) e deste rascunho pelo Otávio.
6. As chaves da volta do status, do painel e do contador, cada uma com o seu papel, quando cada um existir (6.6; 18.3).

## Perguntas

prompts/07-fila-perguntas.md, 18.1 a 18.11; prompts/08-fila-perguntas.md, Etapa 21; prompts/11-fila-perguntas.md, Etapas 32 e 34; log.md, entrada de 15/11/2026 ("planilha do SDR v3"), perguntas 1 a 11.
