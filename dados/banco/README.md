---
id: banco-rascunho
versao: 4
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: planta-do-banco
    versao: 4
  - id: decisoes
    versao: 5
  - id: funil-01
    versao: 3
  - id: lead-score
    versao: 3
  - id: funil-01-planilha-sdr
    versao: 2
  - id: ficha-de-fatos
    versao: 4
  - id: regra-seguranca
    versao: 3
  - id: lacunas
    versao: 6
desatualizado: true
---

# Banco · rascunho

O banco de dados dos leads do funil-01, escrito a partir de dados/planta/planta.md, para o projeto sistema-de-vendas-safra do Supabase (decisão #99; conexoes.md). O esquema v2 já roda no projeto do Safra, com o protótipo ligado e dados de teste (#102; log.md, pedido 10). **A migração da versão 3 ainda não foi executada no Supabase:** foi conferida só numa cópia local do Postgres, sem serviço real (ver "Conferido nesta máquina"). Nenhum dado deste repositório é real.

**Status.** Rascunho, pendente do Otávio. Continua desatualizado, porque se apoia na planilha do SDR (funil-01-planilha-sdr v2), marcada por cadeia (regra 11.1).

**Versão 3 (etapa 32, 09/11/2026).** O banco com dados não é refeito: o esquema v2 (esquema.sql) fica como está e a versão 3 entra por uma **migração** (migracoes/001-v3.sql), que roda por cima, sem apagar nada, e pode rodar de novo (21.11; prompts/11-decisoes-de-09-11.md, etapa 32). Ver "O que muda na versão 3".

**Versão 4 (etapa 34, 09/11/2026).** Só documentação: catalogo-prototipo.sql (v2) ganhou as linhas da landing-page-01 versão 1 e do quiz-01 versão 2, que as páginas da etapa 34 mandam (32.4). Nenhuma linha de SQL do esquema nem da migração mudou.

**Destino dos contatos em conflito · bloqueado para entrega até a decisão** (conflito-17, em base/lacunas.md). O lado 1 manda os contatos do quiz para uma conta nova do Triad CRM; o lado 2 (#90) manda para este banco pelo garçom e para a planilha do SDR. Este rascunho segue o lado 2, como a planta e o funil-01, sem escolher: se o lado 1 vencer, ele vira só a especificação do que o CRM precisa guardar. O protótipo de teste não é entrega: com gente de verdade, nada vai ao ar antes da decisão.

## O que tem dentro

| Arquivo | O que é |
|---|---|
| esquema.sql | O esquema v2: as tabelas, as restrições, as duas funções das portas do garçom, a visão do painel, a contagem das análises gratuitas e as fechaduras, em Postgres para o Supabase. Comentários em português. Já rodou no projeto do Safra; o SQL não muda (21.11). A versão 3 do arquivo só ganhou o aviso do topo, com a ordem dos arquivos |
| migracoes/001-v3.sql | A migração do banco v2 para o v3, sobre os dados que já existem, sem apagar nada e numa transação só. Pode rodar de novo e dá o mesmo resultado. Ver "O que muda na versão 3" |
| conferir.sql | Uma consulta só de leitura que confere, linha por linha, se o banco ficou como devia depois da migração: tabelas, RLS, quem pode o quê, funções, trava, índices, visões e o que a migração pôs. Cada linha diz o esperado e dá ok verdadeiro ou falso |
| catalogo-prototipo.sql | As linhas do catálogo de entregas que o protótipo precisa para o banco aceitar os eventos das páginas (23.10; 32.4): quiz-01 versão 1 (a página v2, que já gravou dados de teste), quiz-01 versão 2 (a página v3) e landing-page-01 versão 1 (a visita, igual nas duas variantes; pergunta 34.4). v2: só acrescenta, com `on conflict do nothing`; não apaga nem muda linha. Rodado depois do conferir.sql (25.3) |
| testar-migracao.mjs | O teste local da migração, num Postgres dentro do Node (PGlite, o do ensaio), sem rede. Ver "Conferido nesta máquina" |

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
- **Colunas:** as que funis/funil-01/planilha-sdr.md marca como "Banco", na mesma ordem: id_pessoa, nome, telefone, email, empresa, consentimento_whatsapp, consentimento_email, lead_score_faixa, lead_score_nota, respostas_a_confirmar (só na faixa b: valor da venda, vendedores e, desde a v3, leads por mês e CRM; 15.4), entrou_em (a hora do servidor em que o fim do quiz foi gravado, não a do navegador; 15.3; 21.16), tentativas_feitas (15.3; 21.7), clique_fim_quiz (o último clique da pessoa no fim do quiz, desde a v3; 18.4), estagio, estado e data_volta atuais (21.9). Mais `cursor_gravado_em`, para o cursor.
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
2. **migracoes/001-v3.sql**, a migração.
3. **conferir.sql (v2)**, a conferência.
4. **catalogo-prototipo.sql (v2)**, no protótipo, antes de publicar as páginas da etapa 34: no banco que já tem a linha do quiz-01 versão 1, acrescenta só as duas linhas novas e mostra as três (conferido no PGlite: rodado duas vezes, três linhas, a data da linha antiga sem mudar).

Passo a passo da migração (o roteiro da etapa 35 traz a versão para o Otávio):

1. Entrar no Supabase com sistemadevendassafra@gmail.com e abrir o projeto **sistema-de-vendas-safra** (conexoes.md).
2. No menu da esquerda, abrir o **SQL Editor** e criar uma consulta nova (New query).
3. Abrir dados/banco/migracoes/001-v3.sql no repositório, copiar o arquivo **inteiro**, colar no editor e clicar em **Run**. Se o editor mostrar o aviso de operação destrutiva ("Potential issue detected"), confirmar com **Run this query**: é esperado, por causa dos drop de restrição e de função e dos revoke do arquivo; nenhuma tabela, coluna ou linha é apagada. Deve terminar com "Success. No rows returned", sem erro em vermelho. Rodar numa hora sem teste em curso: troca de restrição trava a tabela eventos por um instante.
4. Criar outra consulta nova, colar dados/banco/conferir.sql inteiro e clicar em **Run**.
5. Comparar com "Como conferir", abaixo.

Se o passo 3 der erro, nada mudou (a migração roda numa transação só): não siga, copie só a mensagem de erro (ela não tem chave nem dado pessoal) e traga para o repositório. Rodar a migração de novo não quebra nada e dá o mesmo resultado. Se um dia esquema.sql for rodado de novo, rode a migração logo depois: o esquema v2 refaz a função da planilha e as permissões do jeito v2.

A migração não mexe no garçom: o garçom v3, que está no ar, continua chamando registrar_fim_quiz e leads_para_planilha como antes (a função da planilha só manda um campo a mais, que o garçom repassa e a planilha v1 ignora). A visita, o início do quiz e o clique só chegam ao banco com o garçom da etapa 33 e as páginas da etapa 34. Para a visita da landing e os eventos do quiz novo entrarem, o catálogo precisa das linhas da landing-page-01 versão 1 e do quiz-01 versão 2, que catalogo-prototipo.sql v2 acrescenta (32.4; etapa 34). Publicar as páginas novas antes de rodar o catálogo deixa a visita, o início do quiz e o fim do quiz novo recusados pela chave estrangeira.

## Como conferir

conferir.sql devolve uma tabela com 19 linhas: as conferências de 1 a 18 e a linha 99, "tudo certo". **Deu certo quando todas as linhas têm ok = true**, e a linha 99 diz "18 de 18". Num banco só com o esquema v2, sem a migração, as linhas 4, 8 e 14 a 18 dão false, e a linha 99 diz "11 de 18": é o aviso de que falta rodar a migração. Em resumo, o esperado:

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

Se alguma linha der false, não use as chaves: anote o número da linha e o que apareceu em "encontrado" e rode a migração de novo. Se continuar false, traga a linha para o repositório.

## Conferido nesta máquina

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

O ensaio geral (nucleo/ferramentas/ensaio/) ainda aplica só o esquema v2 e espera o conferir.sql v1 ("13 de 13"): até a etapa 35 atualizá-lo, a conferência dele dá false. Rodado com `--sem-wrangler` em 09/11/2026: 90 de 108, e os 18 FALHOU são só o conferir.sql sem a migração e as 20 colunas da planilha v2 (pergunta 32.7).

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
3. **Limpar os dados de teste** (leads com e-mail @teste.invalid e nome começando por TESTE, #102) de propósito, ou recomeçar o banco do zero, e registrar como foi feito. A trava não deixa apagar evento (log.md, Pendências).
4. **Caminho de apagamento** (#106): o prazo de guarda está em ficha-de-fatos#prazo-de-guarda; o que se apaga, o que vira anônimo, quem faz e como fica registrado é pendência com prazo (log.md, Pendências). Até lá, nada é apagado automaticamente, e a trava dos eventos não deixa apagar nem pelo garçom (6.8; 18.10).
5. Aprovação da planta (6.1) e deste rascunho pelo Otávio.
6. As chaves da volta do status, do painel e do contador, cada uma com o seu papel, quando cada um existir (6.6; 18.3).

## Perguntas

prompts/07-fila-perguntas.md, 18.1 a 18.11; prompts/08-fila-perguntas.md, Etapa 21; prompts/11-fila-perguntas.md, Etapas 32 e 34.
