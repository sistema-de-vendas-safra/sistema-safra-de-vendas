---
id: banco-rascunho
versao: 2
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: planta-do-banco
    versao: 3
  - id: decisoes
    versao: 4
  - id: funil-01
    versao: 2
  - id: lead-score
    versao: 2
  - id: funil-01-planilha-sdr
    versao: 1
  - id: ficha-de-fatos
    versao: 3
  - id: regra-seguranca
    versao: 2
  - id: lacunas
    versao: 5
desatualizado: true
---

# Banco · rascunho

O banco de dados dos leads do funil-01, escrito a partir de dados/planta/planta.md, para o projeto sistema-de-vendas-safra do Supabase (decisão #99; conexoes.md). **Ainda não foi executado no Supabase.** Foi conferido só numa cópia local do Postgres, sem serviço real (ver "Conferido nesta máquina"). Nada daqui está no ar, e nenhum dado é real.

**Status.** Rascunho, pendente do Otávio. Continua desatualizado, porque se apoia em documentos marcados (funil-01, lead-score, planilha do SDR; regra provisória 11.1).

**Destino dos contatos em conflito · bloqueado para entrega até a decisão** (conflito-17, em base/lacunas.md). O lado 1 manda os contatos do quiz para uma conta nova do Triad CRM; o lado 2 (#90) manda para este banco pelo garçom e para a planilha do SDR. Este rascunho segue o lado 2, como a planta e o funil-01, sem escolher: se o lado 1 vencer, ele vira só a especificação do que o CRM precisa guardar. O protótipo de teste não é entrega: com gente de verdade, nada vai ao ar antes da decisão.

## O que tem dentro

| Arquivo | O que é |
|---|---|
| esquema.sql | As tabelas, as restrições, as duas funções das portas do garçom, a visão do painel, a contagem das análises gratuitas e as fechaduras, em Postgres para o Supabase. Comentários em português. Roda inteiro de uma vez e pode rodar de novo |
| conferir.sql | Uma consulta só de leitura que confere, linha por linha, se o esquema ficou como devia: tabelas, RLS, quem pode o quê, funções, trava, índices e visões. Cada linha diz o esperado e dá ok verdadeiro ou falso |

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
- **Listas fechadas como CHECK:** tipos de evento, estágios, estados, faixas do lead score, canais do SDR, sim ou não do consentimento, origens e campanhas da tabela de origens do funil-01, tipos de entrega. Valor fora da lista não entra. Nutrição fica de fora até a decisão de 5.3; `produto` existe e fica vazio até a mesma decisão.
- **Regras da planta como restrição:** pelo menos um canal aceito com texto e data do consentimento; fim do quiz sempre com pessoa, sessão, respostas e lead score; stand-by sempre com data_volta; venda leva o estágio venda e perda leva o estado perdido (6.5); o par entrega e versão precisa existir no catálogo (6.6; 18.8); cada tipo de evento só pode ser gravado por quem a planta diz.
- **Evento não se apaga nem se reescreve:** uma trava recusa qualquer mudança, menos ligar à pessoa a visita e o início do quiz da mesma sessão no fim do quiz (6.2).
- **Pessoa repetida:** `registrar_fim_quiz` reconhece quem já está no banco pelo telefone ou pelo e-mail e liga o evento novo à mesma linha, sem o garçom ler nada (6.3). A linha da pessoa não muda, nem o consentimento (18.6).
- **Painel:** a visão `painel_numeros` só tem números agregados por mês, entrega e versão, origem, faixa e estágio. Nenhum nome, telefone, e-mail, resposta nem id_pessoa.
- **Análises gratuitas:** a visão `contagem_analises_gratuitas` devolve só quantas foram usadas, contando uma por pessoa que terminou o quiz (recomendação de 5.7, ainda não decidida). O total de ficha-de-fatos#analises-gratuitas e o limite de ficha-de-fatos#barra-de-resgates não são escritos no banco: quem compara é o contador, que não vai ao ar até a decisão de 5.7 (6.7).

## A função da planilha

`leads_para_planilha(apos_gravado_em, apos_id_pessoa, quantos)`, chamada só pela porta privada do garçom, com a chave secreta.

- **Quem entra:** só faixas a e b (nunca c nem eliminatorio), só quem não retirou o consentimento e, por escolha provisória, só quem aceitou WhatsApp, o caminho em que menos gente é contatada (21.4).
- **Uma vez por pessoa:** cada pessoa entra pelo primeiro fim de quiz dela em faixa a ou b. Quem refaz o quiz não aparece de novo, e a linha que já foi não é atualizada (21.5).
- **Colunas:** as que funis/funil-01/planilha-sdr.md marca como "Banco", na mesma ordem: id_pessoa, nome, telefone, email, empresa, consentimento_whatsapp, consentimento_email, lead_score_faixa, lead_score_nota, respostas_a_confirmar (só na faixa b, só valor da venda e vendedores; 21.8), entrou_em (a hora do servidor em que o fim do quiz foi gravado, não a do navegador; 21.16) e tentativas_feitas (propostas, 15.3; 21.7), estagio, estado e data_volta atuais (21.9). Mais `cursor_gravado_em`, para o cursor.
- **O cursor** é o par (gravado_em do fim de quiz de entrada, id_pessoa). A função devolve, em ordem desse par, só quem vem depois do par recebido. Na primeira vez, os dois vão vazios; depois, vão o `cursor_gravado_em` e o `id_pessoa` da última linha recebida, **exatamente como vieram** (o horário tem microssegundos; arredondado, a última linha volta repetida). Gente gravada no mesmo instante é desempatada pelo id_pessoa: ninguém se perde nem se repete. Mandar só um dos dois é recusado. O horário vem com o fuso no fim ("+00:00"): quem chamar pela API com GET, com o cursor no endereço, precisa codificar o sinal de mais (%2B), senão ele vira espaço e o horário quebra. Para a etapa 22: o garçom deve mandar o cursor bem codificado (ou no corpo de um POST).
- **Margem de 1 minuto:** só aparece quem foi gravado há mais de 1 minuto, para uma gravação que começou antes e terminou depois de uma leitura não ficar para trás do cursor (21.6).
- **No máximo 200** por pedido, mesmo que se peça mais.

## As fechaduras

- Row level security ligada nas quatro tabelas, **sem nenhuma política** e sem FORCE: quem vem de fora não lê nem grava nada direto nas tabelas.
- **anon** (chave publicável) só executa `registrar_fim_quiz`. **service_role** (chave secreta) só executa `leads_para_planilha`. **authenticated** e **PUBLIC** não têm nada. No Supabase, o service_role passa por cima da RLS, mas sem permissão em tabela não lê nada; quem tiver a chave secreta consegue, no máximo, os leads da planilha.
- **As chaves antigas continuam valendo até serem desativadas.** O projeto ainda tem as chaves antigas (legacy) anon e service_role, em formato JWT. A antiga service_role abre tudo o que a secreta nova abre. Desativar em Project Settings, API Keys, Legacy API keys (será passo do roteiro da etapa 26).
- As visões do painel e do contador não têm leitor além do Otávio, pelo painel do Supabase, até as chaves delas existirem (18.3).
- A volta do status do SDR ainda não tem caminho no banco (18.3).

## Como aplicar amanhã

1. Entrar no Supabase com sistemadevendassafra@gmail.com e abrir o projeto **sistema-de-vendas-safra** (conexoes.md).
2. No menu da esquerda, abrir o **SQL Editor** e criar uma consulta nova (New query).
3. Abrir dados/banco/esquema.sql no repositório, copiar o arquivo **inteiro**, colar no editor e clicar em **Run**. Se o editor mostrar o aviso de operação destrutiva ("Potential issue detected"), confirmar com **Run this query**: é esperado, por causa dos drop e revoke do arquivo. Deve terminar com "Success. No rows returned", sem erro em vermelho.
4. Criar outra consulta nova, colar dados/banco/conferir.sql inteiro e clicar em **Run**.
5. Comparar com "Como conferir", abaixo.

Se o passo 3 der erro, não siga para as chaves: copie só a mensagem de erro (ela não tem chave nem dado pessoal) e traga para o repositório. Rodar esquema.sql de novo não quebra nada, mas também não muda tabela que já existe.

## Como conferir

conferir.sql devolve uma tabela com 14 linhas: as conferências de 1 a 13 e a linha 99, "tudo certo". **Deu certo quando todas as linhas têm ok = true**, e a linha 99 diz "13 de 13". Em resumo, o esperado:

| n | Conferência | Esperado |
|---|---|---|
| 1 | tabelas existem | entregas, eventos, investimento, pessoas |
| 2 | RLS ligada em todas, sem FORCE | nenhuma fora da regra |
| 3 | nenhuma política de RLS | 0 políticas |
| 4 | anon pode só isto | funcao registrar_fim_quiz |
| 5 | authenticated pode só isto | nada |
| 6 | service_role pode só isto | funcao leads_para_planilha |
| 7 | PUBLIC não tem nada | nada |
| 8 | funções das portas | as duas com definer=true e search_path="" |
| 9 | função da trava | definer=false e search_path="" |
| 10 | trava dos eventos ligada | eventos_sem_mudanca (estado O) |
| 11 | índices únicos e parciais | pessoas_email_unico, pessoas_telefone_unico, os dois com WHERE |
| 12 | visões sem security_invoker | as duas com security_invoker=false |
| 13 | permissões padrão do papel atual | nenhuma |

Se alguma linha der false, não use as chaves: anote o número da linha e o que apareceu em "encontrado" e rode esquema.sql de novo. Se continuar false, traga a linha para o repositório.

## Conferido nesta máquina

Numa cópia local do Postgres que roda dentro do Node (PGlite 0.5.15, em nucleo/ferramentas/ensaio/, só a dependência, sem script ainda), com os papéis anon, authenticated e service_role criados de mentira, em 08/11/2026:

- esquema.sql rodou inteiro duas vezes seguidas, sem erro;
- conferir.sql deu 13 de 13 depois do esquema, e deu false nas linhas certas quando uma permissão foi dada a anon e a RLS foi desligada de propósito;
- anon gravou o fim do quiz e não conseguiu ler tabela, visão nem chamar a função da planilha; service_role e authenticated não conseguiram gravar; service_role chamou a função da planilha;
- pessoa repetida (mesmo telefone com outra formatação, e-mail em maiúsculas) não virou outra linha; telefone de uma pessoa com e-mail de outra foi recusado;
- a planilha recebeu só faixas a e b com WhatsApp aceito, cada pessoa uma vez; 250 leads gravados no mesmo instante saíram em duas páginas (200 e 50), sem repetir nem perder; cursor pela metade foi recusado;
- apagar evento foi recusado pela trava.

**O que só se confere no Supabase de verdade:** dois envios realmente simultâneos (a cópia local tem uma conexão só), as permissões que o próprio Supabase dá aos papéis dele, a chamada pela API (PostgREST) com cada chave e o aviso do linter sobre as visões (esperado, 21.13). O ensaio completo é a etapa 25.

## O que falta para ir ao ar com gente de verdade

1. **Decisão do conflito-17** pelo Júnior e pelo Euclides (aprovação da #90).
2. **Limpar os dados de teste** (leads com e-mail @teste.invalid e nome começando por TESTE, #102) de propósito, ou recomeçar o banco do zero, e registrar como foi feito. A trava não deixa apagar evento (log.md, Pendências).
3. **Prazo de guarda** (outros-23): por quanto tempo os dados ficam, o que acontece no fim do prazo e como se atende o pedido de apagar. Até a decisão, nada é apagado automaticamente, e a trava dos eventos não deixa apagar nem pelo garçom (6.8; 18.10).
4. Aprovação da planta (6.1) e deste rascunho pelo Otávio.
5. As chaves da volta do status, do painel e do contador (18.3).

## Perguntas

prompts/07-fila-perguntas.md, 18.1 a 18.11; prompts/08-fila-perguntas.md, Etapa 21.
