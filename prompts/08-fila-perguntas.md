# Perguntas da fila da madrugada

Dúvidas das etapas 20 a 27 (prompts/08-fila-da-madrugada.md), no formato de sempre: Dúvida, O que foi feito, Recomendação, Se decidir diferente. Cada escolha provisória seguiu o caminho mais conservador (Regra de pausas, CLAUDE.md).

## Etapa 20

20.1. **A regra 3 da segurança ainda diz ".env no Mac".**
   - *Dúvida:* nucleo/regras/seguranca.md, regra 3, diz que no Mac a chave mora num arquivo .env fora do Git. O desenho do protótipo não usa .env para chave nenhuma: os valores vão direto do painel do serviço para o cofre (Cloudflare, propriedades do Apps Script), sem passar por arquivo da máquina.
   - *O que foi feito:* a regra 3 ficou como estava, porque mudar o lugar da chave é mudança de sentido em documento decidido. Só a seção "Detector de chaves" mudou (forma, v2).
   - *Recomendação:* trocar a regra 3 por "Chave mora no cofre do serviço que a usa (variáveis secretas da Cloudflare, propriedades do Apps Script). Nenhuma chave passa por arquivo da máquina, nem .env." O .gitignore e o .claude/settings.json continuam barrando .env, como cerca.
   - *Se decidir diferente:* se o .env no Mac continuar valendo, nada muda no detector nem nos bloqueios; só o roteiro de amanhã (etapa 26) precisa dizer como criar o .env sem passar pelo chat.

20.2. **O bloqueio de comandos pega também buscas comuns.**
   - *Dúvida:* a sintaxe com curinga ("Bash(grep *.env*)") barra qualquer comando que tenha ".env" no meio, inclusive `grep -rn "process.env" .`, que não lê arquivo de segredo.
   - *O que foi feito:* ficou o bloqueio largo, o caminho mais restritivo. O Claude ainda pode buscar com a ferramenta de busca própria ou com outro termo (por exemplo "env.").
   - *Recomendação:* manter; o incômodo é pequeno e o bloqueio é cerca, não muro: comandos como `python3 -c` ou `xxd` ainda leriam o arquivo. A proteção principal é não existir chave em arquivo da máquina.
   - *Se decidir diferente:* se a busca por "process.env" fizer falta, trocar as regras de grep por formas mais estreitas (por exemplo "Bash(grep * .env)" e "Bash(grep * ./.env*)"), aceitando que alguma variação escape.

20.3. **Sem Node, o gancho bloqueia o commit.**
   - *Dúvida:* o gancho precisa do Node. Programas abertos pelo Finder, como o GitHub Desktop, às vezes não enxergam o Node do Homebrew; um commit feito por lá poderia ser barrado.
   - *O que foi feito:* o gancho acrescenta /opt/homebrew/bin e /usr/local/bin ao caminho de busca; se mesmo assim não achar o Node, bloqueia o commit com um aviso em português (o caminho mais seguro). O push pelo GitHub Desktop não roda o gancho e não é afetado.
   - *Recomendação:* manter; pela regra 7 do CLAUDE.md quem faz os commits é o Claude, pelo terminal, onde o Node existe.
   - *Se decidir diferente:* se o gancho tiver de deixar passar quando não houver Node, troca o `exit 1` do aviso por `exit 0`, e o commit sem Node passa sem conferência.

20.4. **Os dependentes da segurança apontam para a v1.**
   - *Dúvida:* sete documentos citam regra-seguranca versão 1 em depende_de (funil-01, planilha-sdr, planta-do-banco, banco-rascunho, landing-page-01-estrutura, politica-de-privacidade, garcom). A v2 é só forma, mas a cascata manda marcar e propor.
   - *O que foi feito:* os sete já estavam com desatualizado: true por outros motivos; nenhum foi alterado. A troca para a versão 2 fica proposta.
   - *Recomendação:* trocar regra-seguranca 1 para 2 em cada um na próxima vez que ele subir de versão, como forma.
   - *Se decidir diferente:* se a troca tiver de ser já, são sete correções de forma (versão sobe 1, depende_de muda, nada mais), com sete linhas no log.

20.5. **Todo .env.* é barrado, inclusive um exemplo.**
   - *Dúvida:* o pedido barra qualquer .env.*; um arquivo de exemplo como .env.exemplo, sem valor, também seria recusado.
   - *O que foi feito:* barra todos, sem exceção, como no pedido e no .gitignore. Exemplos de configuração usam outro nome (como entregas/garcom/wrangler.toml.exemplo).
   - *Recomendação:* manter.
   - *Se decidir diferente:* se um .env.exemplo for útil, abrir exceção só para esse nome no detector (examinarNome) e no .gitignore (!.env.exemplo); o conteúdo continua sendo examinado.

20.6. **.dev.vars.* entrou junto com .dev.vars.**
   - *Dúvida:* o pedido fala em .dev.vars; o wrangler também lê variantes como .dev.vars.staging.
   - *O que foi feito:* .gitignore, .claude/settings.json e o detector tratam .dev.vars.* igual a .dev.vars, como já se fazia com .env e .env.*.
   - *Recomendação:* manter.
   - *Se decidir diferente:* tirar as quatro linhas de .dev.vars.* (uma no .gitignore, duas no settings, uma condição no detector); nada mais muda.

20.7. **O README do detector ganhou cabeçalho de rascunho.**
   - *Dúvida:* a regra de versionamento vale para base/, funis/ e entregas/; nucleo/ferramentas/ não tem cabeçalho até aqui. O pedido da fila diz que tudo o que ela produz nasce como rascunho, com cabeçalho e versão.
   - *O que foi feito:* nucleo/ferramentas/detector-de-chaves/README.md nasce com cabeçalho (id detector-de-chaves, v1, rascunho, otavio: pendente, depende de regra-seguranca 2).
   - *Recomendação:* manter; o detector é a ferramenta que a regra decidida exige, e o cabeçalho mostra de qual versão da regra ele parte.
   - *Se decidir diferente:* tirar o cabeçalho, deixando o README como os outros de nucleo/ferramentas/; a linha do log e do índice perdem a versão.

20.8. **O que o detector deixa passar.**
   - *Dúvida:* para não barrar os commits normais da casa, algumas formas escapam: token da Cloudflare sem a palavra Cloudflare ou wrangler na mesma linha; valor atribuído a nome de segredo que só tenha letras (sem número) e menos de 32 caracteres; valores com "exemplo", "mentira" ou ".invalid"; arquivos binários e zip.
   - *O que foi feito:* ficou assim; os casos estão no README ("Limites") e nos testes. Os formatos fortes (sb_secret_, sb_publishable_, JWT, AIza, chave privada) barram em qualquer lugar.
   - *Recomendação:* aceitar; o detector é cerca, e o desenho (nenhuma chave em arquivo da máquina) é a proteção principal.
   - *Se decidir diferente:* apertar a regra de atribuição (por exemplo, barrar qualquer valor de 16 caracteres sem espaço) obriga a revisar os falsos positivos que aparecerem nos arquivos rastreados antes de ligar.

20.9. **Barrar mais nomes e comandos do que o pedido.**
   - *Dúvida:* o pedido barra .env, .env.*, .dev.vars e .pem, e os comandos Bash só sobre .env e .dev.vars. Ficavam abertos `cat chave.pem` e afins, e os nomes .envrc, *.env (como secrets.env) e id_rsa*, que também guardam segredo.
   - *O que foi feito:* fui além do pedido, pelo lado seguro: o detector (examinarNome) e o .gitignore passam a barrar *.env, .envrc e id_rsa* (inclusive id_rsa.pub); o .claude/settings.json ganha o bloqueio dos mesmos comandos (cat, head, tail, less, more, grep, sed, awk, cp, source e o ponto) sobre *.pem. Nenhum arquivo rastreado hoje tem esses nomes.
   - *Recomendação:* manter.
   - *Se decidir diferente:* para desfazer, tirar as três linhas do fim do .gitignore (*.env, .envrc, id_rsa*), as duas condições novas em examinarNome no detector (e os casos de nome correspondentes no teste) e as onze linhas "Bash(... *.pem*)" do settings.

## Etapa 21

21.1. **Índice único parcial, como a #100 manda.**
   - *Dúvida:* a #100 pede índice único parcial no telefone e no e-mail. Telefone e e-mail são obrigatórios na gaveta pessoas, então não há muito o que deixar de fora; a questão era qual condição usar.
   - *O que foi feito:* parcial, como a #100 manda (instrução escrita): pessoas_telefone_unico (só os dígitos do telefone) com a condição de os dígitos não serem vazios, e pessoas_email_unico (e-mail em minúsculas) com a condição de o e-mail não ser vazio. A condição só tira o vazio, que as restrições da tabela já impedem: o telefone precisa ter de 8 a 15 dígitos (sem isso, telefones só com sinais, como "+ ()-- -- --", virariam a mesma pessoa) e o e-mail precisa ter o formato. Na prática, nenhuma linha escapa do índice. O insert com "on conflict do nothing" da gravação continua barrado pelos dois índices (conferido na cópia local). conferir.sql (linha 11) exige o WHERE.
   - *Recomendação:* manter.
   - *Se decidir diferente:* se algum grupo puder repetir (por exemplo, leads de teste @teste.invalid), a condição dos índices ganha esse grupo; a função continua igual, mas duas linhas da mesma pessoa passam a ser possíveis nesse grupo.

21.2. **Telefone de uma pessoa e e-mail de outra.**
   - *Dúvida:* com os dois índices únicos, um envio cujo telefone já é da pessoa A e cujo e-mail já é da pessoa B não pode virar linha nova, e ligar o evento a A ou a B seria escolher. A planta não diz o que fazer.
   - *O que foi feito:* o banco recusa o envio ("telefone e e-mail pertencem a pessoas diferentes"); o garçom responde "pacote recusado" sem detalhe. Nada é juntado nem escolhido, e o lead desse envio não é gravado. Essa recusa dá uma pista a quem tiver a chave publicável: mandando um telefone e um e-mail, dá para saber se os dois já estão no banco em pessoas diferentes. O risco é baixo (a chave só grava, o garçom responde sem detalhe e a pista exige já ter os dois dados), mas existe.
   - *Recomendação:* reconhecer a pessoa só pelo telefone, como já recomendado em 18.6, e guardar o e-mail novo como histórico; aí o caso some.
   - *Se decidir diferente:* ligar pelo telefone (ou pelo e-mail) é trocar uma linha na função registrar_fim_quiz; juntar as duas pessoas exige um caminho de mesclagem que hoje não existe (e a trava dos eventos não deixa reescrever o id_pessoa já preenchido).

21.3. **service_role também perde tudo, menos a função da planilha.**
   - *Dúvida:* o pedido manda revogar de PUBLIC, anon e authenticated e dar a service_role só o EXECUTE da função nova. O Supabase dá ao service_role, por padrão, todas as permissões nas tabelas do esquema public; com elas, a chave secreta leria e gravaria o banco inteiro.
   - *O que foi feito:* o caminho mais restritivo: o esquema revoga tudo também do service_role (tabelas, visões, sequências, funções e as permissões padrão do que vier depois) e dá só o EXECUTE em leads_para_planilha. O service_role não executa a gravação do quiz. Ele ainda passa por cima da RLS no Supabase, mas sem permissão na tabela não lê nada. conferir.sql (linha 6) confere isso.
   - *Recomendação:* manter: se a chave secreta vazar, o estrago é a lista de leads da planilha, não o banco inteiro.
   - *Se decidir diferente:* se for preciso usar a chave secreta para outra coisa (por exemplo, a volta do status), dar a permissão exata daquela função, nunca a tabela inteira.

21.4. **Quem não aceitou WhatsApp não entra na planilha.**
   - *Dúvida:* a base não diz se entra na fila do SDR quem aceitou só e-mail. O SDR liga e manda WhatsApp (roteiros-sdr); por telefone sem WhatsApp aceito, o consentimento não cobre.
   - *O que foi feito:* leads_para_planilha só devolve quem tem consentimento_whatsapp = sim, além de faixa a ou b e consentimento não retirado. É o caminho em que menos gente é contatada, como o pedido manda.
   - *Recomendação:* manter no protótipo; decidir junto com o texto do consentimento (conflito-09) se ligação por telefone cabe no aceite do WhatsApp e se o SDR pode falar por e-mail com quem só aceitou e-mail.
   - *Se decidir diferente:* tirar uma linha da função (`and pe.consentimento_whatsapp = 'sim'`); quem já passou pelo cursor sem entrar não volta sozinho, e seria preciso pedir de novo desde o início, com a planilha descartando quem já tem.
   - *Atenção:* quem recusou WhatsApp no primeiro envio e aceitou no segundo nunca entra, porque a linha da pessoa não muda quando ela refaz o quiz, nem o consentimento (18.6). Some com a recomendação de 18.6 (consentimento como histórico, valendo o mais novo).

21.5. **Quem refaz o quiz entra uma vez só, pelo primeiro fim de quiz em faixa a ou b.**
   - *Dúvida:* a mesma pessoa pode terminar o quiz várias vezes, com faixas diferentes. A planilha só acrescenta linhas e nunca reescreve.
   - *O que foi feito:* cada pessoa aparece uma vez, pelo primeiro fim de quiz dela em faixa a ou b, com a nota e a faixa daquele fim de quiz. Refazer depois não traz a pessoa de novo nem atualiza a linha. Quem fez antes em faixa c ou eliminatorio e depois em a ou b entra no fim de quiz em a ou b. Dois envios do mesmo fim de quiz viram dois eventos, mas a pessoa entra uma vez só.
   - *Recomendação:* manter; se a nota nova importar, ela vira uma coluna do banco que a planilha atualiza, numa versão nova da planilha-sdr.
   - *Se decidir diferente:* para valer só o primeiro fim de quiz de todos (quem começou em c nunca entra), trocar o filtro da faixa para depois da escolha do primeiro evento; para valer o último, a planilha precisa de um jeito de atualizar linha, que a etapa 24 não tem.

21.6. **O cursor e a margem de 1 minuto.**
   - *Dúvida:* o horário de gravação nasce dentro da gravação; uma gravação que começa antes e termina depois de uma leitura da planilha ficaria com horário anterior ao cursor e se perderia.
   - *O que foi feito:* o cursor é o par (gravado_em do fim de quiz de entrada, id_pessoa), em ordem crescente, e o par não se repete porque cada pessoa entra uma vez. O gravado_em do fim do quiz passa a ser a hora do relógio no fim da gravação (clock_timestamp), e a função só devolve fins de quiz gravados há mais de 1 minuto. A gravação dura milissegundos, e no Supabase o papel anon tem limite de 3 segundos por comando (statement_timeout), então nenhuma gravação passa disso; a margem é folgada. Com a margem e a pergunta da planilha a cada 5 minutos, o lead chega à planilha de 1 a 6 minutos depois do fim do quiz.
   - *Recomendação:* manter 1 minuto; o prazo da faixa A é de 1 hora útil, e a planilha pergunta a cada 5 minutos. A etapa 24 deve guardar o cursor exatamente como veio (texto, com microssegundos) e, por garantia, não acrescentar id_pessoa que já esteja na aba.
   - *Se decidir diferente:* margem menor deixa o lead chegar mais rápido, com mais risco de perder um numa gravação lenta; sem margem, o risco é real em dois envios quase juntos.

21.7. **entrou_em e tentativas_feitas saem do banco, embora a planta não as liste.**
   - *Dúvida:* o pedido manda devolver as colunas que funis/funil-01/planilha-sdr.md marca como "Banco"; entrou_em e tentativas_feitas estão lá como proposta (15.3), mas fora da lista "O que sai do banco" da planta.
   - *O que foi feito:* as duas saem, como a planilha-sdr diz: entrou_em é o gravado_em do fim de quiz de entrada, o mesmo horário do cursor, que já sai de todo modo (21.16); tentativas_feitas conta os contato_sdr da pessoa (hoje sempre 0, porque a volta do status não existe). A planta v3 cita as duas como proposta, sem acrescentá-las à lista.
   - *Recomendação:* aceitar 15.3 e acrescentar as duas à lista da planta.
   - *Se decidir diferente:* tirar as duas colunas de leads_para_planilha (a função é apagada e criada de novo pelo próprio esquema) e da etapa 24.

21.8. **respostas_a_confirmar só na faixa b, sem o "histórico".**
   - *Dúvida:* o lead score manda o SDR confirmar na faixa B "valor da venda, time, histórico"; qual resposta é o histórico não está escrito (15.4).
   - *O que foi feito:* só na faixa b, só as respostas valor-medio e vendedores do quiz. Na faixa a, a coluna vai vazia. Nenhuma outra resposta sai do banco.
   - *Recomendação:* decidir 15.4 (a recomendação lá é leads por mês e CRM); aí entram mais duas chaves na função.
   - *Se decidir diferente:* mudar a lista de respostas na função; nada mais muda.

21.9. **Estágio, estado e data_volta "atuais".**
   - *Dúvida:* a planta diz que o estágio e o estado atuais "saem do último evento de status", mas o contato_sdr leva só o estado, e a reunião leva só o estágio; "último evento" pode ter um dos dois vazio.
   - *O que foi feito:* cada um é o último valor preenchido nos eventos da pessoa; data_volta vem do mesmo evento que deu o estado. Hoje sai tudo vazio, porque a volta do status não existe; o "captado" de quem acaba de chegar não é inventado pelo banco (15.5). A planilha-sdr (funis/funil-01/planilha-sdr.md, perto da linha 134, "Quem marca pré-qualificado na faixa A") diz que o lead chega à planilha como captado; a função manda estagio vazio, e quem escreve captado na linha nova é a planilha (etapa 24).
   - *Recomendação:* aceitar e escrever a regra na planta junto com o desenho da volta do status.
   - *Se decidir diferente:* muda só o trecho das três colunas na função.

21.10. **Quem retira o consentimento depois de entrar na planilha.**
   - *Dúvida:* a planilha-sdr diz que quem retirou o consentimento sai da planilha; a função só entrega leads novos e não avisa de quem já foi.
   - *O que foi feito:* quem retira antes de a planilha perguntar não entra; quem retira depois continua na aba. A retirada hoje só acontece pelo Otávio, no painel do Supabase.
   - *Recomendação:* até existir um caminho automático, o Otávio apaga a linha da aba à mão quando registrar uma retirada; o caminho automático entra junto com a volta do status.
   - *Se decidir diferente:* uma segunda função, só para a porta privada, que devolve os id_pessoa retirados, e a etapa 24 riscando essas linhas.

21.11. **Rodar o esquema de novo não muda tabela que já existe.**
   - *Dúvida:* o pedido prefere que o esquema rode de novo sem quebrar.
   - *O que foi feito:* roda: tabelas com create table if not exists, índices com if not exists, funções e visões refeitas, gatilho apagado e criado de novo, permissões revogadas e dadas de novo. Mas uma tabela que já existe é pulada inteira: uma coluna ou restrição nova numa versão futura precisa de alter table próprio. O aviso está no topo do arquivo. Conferido duas vezes seguidas na cópia local.
   - *Recomendação:* manter; como o banco recomeça do zero ou é limpo antes de ir ao ar (#102), a v3, se vier, pode decidir entre alter table e recomeçar.
   - *Se decidir diferente:* para uma v2 que apaga e recria tudo a cada rodada, os dados de teste se perdem a cada rodada.

21.12. **Permissões padrão só valem para o papel que roda o esquema.**
   - *Dúvida:* o pedido manda usar ALTER DEFAULT PRIVILEGES para o que for criado depois. Isso só vale para objetos criados pelo papel que roda o comando (postgres, no editor SQL). O Supabase tem permissões padrão também para o papel supabase_admin, que o postgres não pode mudar.
   - *O que foi feito:* retiradas as do papel postgres (EXECUTE de PUBLIC em toda função nova, e tudo de anon, authenticated e service_role no esquema public). conferir.sql (linha 13) confere só esse papel.
   - *Recomendação:* criar tudo do esquema sempre pelo editor SQL (papel postgres) e rodar conferir.sql depois de cada mudança.
   - *Se decidir diferente:* nada a fazer no esquema; o risco é um objeto criado por outro caminho (por exemplo, uma extensão nova) nascer aberto, e conferir.sql mostraria.

21.13. **O linter do Supabase vai avisar das duas visões.**
   - *Dúvida:* as visões sem security_invoker aparecem no linter como "security definer view", um aviso de segurança.
   - *O que foi feito:* ficou como a #100 manda; ninguém tem SELECT nas visões (conferir.sql, linhas 4 a 7 e 12), então o aviso não abre nada hoje. O comentário no esquema diz que é de propósito.
   - *Recomendação:* ignorar esse aviso até existir o papel do painel (18.3); aí dar SELECT só na visão, nunca na tabela.
   - *Se decidir diferente:* com security_invoker ligado, o papel do painel precisaria ler a tabela de eventos inteira, com dado pessoal (18.11, item 1).

21.14. **O funil-01 e a planilha-sdr ainda falam da chave antiga.**
   - *Dúvida:* o funil-01 (passos 2 e 5) diz que a chave do garçom "só grava leads e eventos" e que a leitura da planilha pede "outra chave, a definir"; a planilha-sdr diz que o valor vem "pela chave só de leitura da planilha". Com a #100, a planilha não tem chave do Supabase: a CHAVE_PLANILHA abre a porta privada do garçom, que usa a chave secreta.
   - *O que foi feito:* nada nos dois. O funil-01 é pendente-aprovacao (mudança de sentido vira pergunta); a planilha-sdr é rascunho, mas já está marcada como desatualizada e a regra da cascata manda propor antes de mudar. A planta v3, que eles citam, já diz o desenho novo.
   - *Recomendação:* numa versão nova de cada um, trocar o trecho da chave pela frase da planta v3 ("Quem grava e quem lê") e apontar para planta-do-banco 3 e decisoes 4.
   - *Se decidir diferente:* se os dois tiverem de esperar a aprovação do Júnior e do Euclides, fica como está, e a planta é quem vale para o protótipo.

21.15. **Sem conferência de envios realmente simultâneos aqui.**
   - *Dúvida:* a cópia local do Postgres (PGlite) tem uma conexão só; não dá para mandar dois envios de verdade ao mesmo tempo.
   - *O que foi feito:* o caminho dos envios simultâneos foi escrito pelo jeito do Postgres (insert com "on conflict do nothing", que espera o outro envio terminar, e uma nova busca, até três voltas) e conferido só no que dá para conferir com uma conexão: pessoa repetida, telefone com outra formatação, e-mail em maiúsculas, conflito cruzado. Os 250 leads no mesmo instante foram só para o cursor.
   - *Recomendação:* conferir no Supabase de verdade, no teste de amanhã, mandando o mesmo lead de mentira duas vezes quase juntas (a etapa 25 deve tentar com duas instâncias, se o PGlite permitir).
   - *Se decidir diferente:* nada muda no esquema.

21.16. **entrou_em vem do relógio do servidor, não do navegador.**
   - *Dúvida:* a planilha-sdr diz que entrou_em é a "data e hora do fim do quiz", e a 15.3 diz que é o ocorrido_em do fim_quiz. O ocorrido_em vem do navegador do lead: um relógio errado ou mexido muda o prazo da faixa A e a ordem dos empates na fila.
   - *O que foi feito:* entrou_em é o gravado_em do fim de quiz de entrada, a hora do servidor do banco no fim da gravação (o mesmo valor de cursor_gravado_em). A diferença para o fim do quiz é de milissegundos quando o envio dá certo. O ocorrido_em continua gravado no evento.
   - *Recomendação:* manter, e corrigir a frase da 15.3 e da planilha-sdr na próxima versão ("hora em que o banco recebeu o fim do quiz").
   - *Se decidir diferente:* para usar o ocorrido_em, trocar uma linha em leads_para_planilha; o prazo da faixa A passa a depender do relógio do lead.

## Etapa 22

22.1. **O "+" do horário sem codificar é recusado, não consertado.**
   - *Dúvida:* o horário do cursor vem do banco com "+00:00". Num endereço, o "+" sem codificar chega ao garçom como espaço. Dava para trocar o espaço de volta por "+", mas seria adivinhar o que o cliente quis mandar.
   - *O que foi feito:* o garçom devolve o cursor_seguinte já com o fuso em Z (o mesmo instante, com os mesmos microssegundos), que vai no endereço sem codificar. Aceita de volta Z, +HH:MM codificado como %2B e -HH:MM. O "+" que chega como espaço é recusado com 400, sem chamar o banco. O README explica como o cliente deve codificar.
   - *Recomendação:* manter; a etapa 24 guarda o cursor_seguinte como veio e o manda com encodeURIComponent.
   - *Se decidir diferente:* para aceitar o espaço como "+", uma linha em lerCursor troca o espaço antes do fuso por "+"; o caso de teste correspondente passa a esperar 200.

22.2. **O pré-voo (OPTIONS) da porta pública continua, só para a própria origem.**
   - *Dúvida:* com o protótipo e o garçom no mesmo endereço (#101), o navegador não manda pré-voo nem precisa de cabeçalho de CORS. O pedido manda que todos os casos da v1 continuem passando, e um deles é o pré-voo respondido com 204.
   - *O que foi feito:* a porta pública continua respondendo ao OPTIONS e pondo Access-Control-Allow-Origin, sempre com o valor exato de ORIGEM_PERMITIDA, nunca "*". Na mesma origem esse cabeçalho não abre nada a mais; outra origem continua recusada com 403. A conferência do Origin no POST continua igual. A porta privada não tem nenhum cabeçalho de CORS.
   - *Recomendação:* depois do ensaio geral (etapa 25) e do teste de amanhã confirmarem a mesma origem, tirar o OPTIONS e o Access-Control-Allow-Origin numa v3 (o OPTIONS passa a dar 405).
   - *Se decidir diferente:* tirar já: apagar o bloco do OPTIONS e o parâmetro origem de responder em portaFimQuiz; o caso do pré-voo no teste passa a esperar 405.

22.3. **Limite acima de 200 é recusado, não cortado.**
   - *Dúvida:* o pedido deixa escolher entre cortar ou recusar. O banco corta sozinho em 200.
   - *O que foi feito:* recusado (400), como o garçom faz com campo a mais no pacote: pedido fora do combinado não é consertado em silêncio. Limite que não é inteiro de 1 a 200 (0, negativo, fração, texto, vazio) também é recusado. Sem limite, 200.
   - *Recomendação:* manter; a etapa 24 manda 200 ou nada.
   - *Se decidir diferente:* para cortar, trocar o "return { motivo: 'limite' }" de quantos > 200 por "quantos = 200"; o caso de 201 no teste passa a esperar 200.

22.4. **A CHAVE_PLANILHA precisa ter pelo menos 32 caracteres no cofre.**
   - *Dúvida:* o pedido manda 401 com o segredo vazio no cofre; não diz o que fazer com um segredo curto, fácil de adivinhar.
   - *O que foi feito:* segredo com menos de 32 caracteres no cofre deixa a porta fechada (401 para todo pedido, registro "planilha: chave"). A chave é conferida antes do método e do cursor: sem ela, qualquer pedido dá 401.
   - *Recomendação:* o roteiro da etapa 26 gera a chave com 32 bytes aleatórios em hexadecimal (64 caracteres), por um comando que não grava em arquivo.
   - *Se decidir diferente:* o mínimo é a constante CHAVE_PLANILHA_MINIMO em garcom.mjs; com 1, só o segredo vazio fecha a porta.

22.5. **Parâmetro desconhecido ou repetido na porta privada é recusado.**
   - *Dúvida:* o pedido não diz o que fazer com parâmetros além do cursor e do limite.
   - *O que foi feito:* só depois_de_gravado_em, depois_de_id_pessoa e limite, cada um no máximo uma vez; qualquer outro (por exemplo select=*) dá 400 sem chamar o banco.
   - *Recomendação:* manter.
   - *Se decidir diferente:* ignorar os desconhecidos é tirar a primeira linha de lerCursor.

22.6. **Formato da resposta da porta privada.**
   - *Dúvida:* o pedido diz { leads, cursor_seguinte }. Faltava dizer quando o cursor_seguinte é null e como o cliente sabe se há mais.
   - *O que foi feito:* leads vai como o banco devolve, coluna por coluna, inclusive cursor_gravado_em. cursor_seguinte é o da última linha (com o fuso em Z, 22.1) sempre que vem pelo menos um lead, e null com a lista vazia (o cliente mantém o cursor que tem). Acrescentei pode_ter_mais: true quando a página veio cheia, para o cliente pedir de novo.
   - *Recomendação:* manter; a etapa 24 guarda o cursor_seguinte depois de gravar as linhas na aba e repete enquanto pode_ter_mais for true.
   - *Se decidir diferente:* tirar pode_ter_mais é uma linha; o cliente passa a pedir de novo sempre que vier o limite inteiro.

22.7. **Os arquivos só levam o cabeçalho noindex se o Worker rodar antes deles.**
   - *Dúvida:* com o binding de assets, a Cloudflare entrega um arquivo que existe sem chamar o Worker, a não ser que a configuração mande rodar o Worker primeiro. Aí o arquivo sai sem o X-Robots-Tag (só com a meta da página).
   - *O que foi feito:* o garçom acrescenta o cabeçalho em toda resposta que passa por ele. O README e o wrangler.toml.exemplo dizem que a configuração da etapa 23 precisa de run_worker_first = true. A configuração em si não foi escrita aqui.
   - *Recomendação:* run_worker_first = true na etapa 23. Cada página aberta passa a contar como pedido ao Worker, o que no plano grátis cabe com folga num protótipo de teste.
   - *Se decidir diferente:* sem run_worker_first, um arquivo _headers na pasta montada põe o noindex nos arquivos, e o Worker só roda em /api/.

22.8. **O wrangler.toml.exemplo virou só uma lista.**
   - *Dúvida:* a configuração de verdade do Worker vai para entregas/prototipo-funil-01/ na etapa 23; duas configurações divergiriam.
   - *O que foi feito:* o exemplo ficou só com comentários: aponta para a etapa 23 e lista o que ela precisa ter (nome, main, ASSETS com run_worker_first, as duas variáveis comuns, os três segredos pelo nome). Sem nenhuma chave de configuração, id de conta ou segredo.
   - *Recomendação:* apagar o exemplo quando a configuração da etapa 23 existir, numa versão nova do garçom.
   - *Se decidir diferente:* se o exemplo tiver de continuar valendo sozinho, ele ganha as chaves de configuração de novo, e a etapa 23 passa a copiar dele.

22.9. **O pacote do exemplo do quiz-01 é marcado como teste só dentro do teste.**
   - *Dúvida:* a #102 manda leads de teste com nome começando por TESTE e e-mail @teste.invalid. O exemplo do README do quiz-01, que o teste lê, usa "Marina" e um e-mail @example.com, e o README do quiz-01 não é deste pedido.
   - *O que foi feito:* o teste lê o exemplo e troca, só na memória, o nome para "TESTE Marina" e o e-mail para marina@teste.invalid. O README do quiz-01 não foi mexido.
   - *Recomendação:* na versão nova da página do quiz (etapa 23), trocar o exemplo do README pelos dados marcados; aí a troca no teste sai.
   - *Se decidir diferente:* nada muda no garçom.

## Etapa 23

23.1. **Aberta do arquivo, a página do quiz não envia e não avisa na tela.**
   - *Dúvida:* o pedido manda o quiz continuar funcionando quando aberto direto do repositório (file://), só sem gravar, e deixa escolher entre um aviso discreto ou nenhum.
   - *O que foi feito:* com location.protocol igual a file:, enviarPacote não faz nada: nenhum pedido, nenhum aviso de falha, nada no console. O único sinal é a nota do painel "Telas" do protótipo, que continua dizendo "nada é enviado" (23.3). Todo o resto da página funciona igual.
   - *Recomendação:* manter; quem abre do arquivo é quem revisa, e o painel já diz.
   - *Se decidir diferente:* para um aviso na tela, enviarPacote mostra uma linha no lugar de sair calado quando ENVIO_LIGADO é falso; o teste do caso file:// passa a esperar o aviso.

23.2. **O texto do aviso de falha do envio é novo e precisa de olho do Júnior.**
   - *Dúvida:* o pedido manda mostrar ao visitante uma mensagem clara se o envio falhar, sem perder o diagnóstico na tela e sem detalhe técnico. A copy do quiz (quiz-01-copy) não tem esse texto.
   - *O que foi feito:* aviso preso no alto da tela, por cima do diagnóstico: "Não conseguimos enviar o seu contato para a nossa equipe agora. O seu diagnóstico continua aqui na tela.", com o botão "Tentar de novo" (enquanto reenvia, "Enviando…"). O texto mora no objeto AVISO_ENVIO, num lugar só. O mesmo aviso vale para recusa do garçom (400, 422), garçom fora (502, 503) e falta de rede. O reenvio manda o mesmo pacote. Não há botão de fechar. O aviso é role="alert".
   - *Recomendação:* levar o texto à próxima revisão da copy do quiz (entra em quiz-01-copy como mudança nova) e, numa v3, acrescentar um "Fechar". Se o garçom gravou mas a resposta se perdeu no caminho, o reenvio cria um segundo evento fim_quiz da mesma pessoa (a pessoa não duplica, pelo banco v2); aceitável no teste, a conferir no ensaio (etapa 25).
   - *Se decidir diferente:* mudar o texto é mudar AVISO_ENVIO; separar recusa de falha é olhar o status em enviarPacote (4xx sem "Tentar de novo").

23.3. **A nota do painel "Telas" e o "preencher exemplo" mudaram para não mentir no site de teste.**
   - *Dúvida:* o painel "Telas" do protótipo dizia "Dados de exemplo, nada é enviado", e o botão "protótipo · preencher exemplo" preenchia Marina Souza, um e-mail @empresaexemplo.com.br e um celular com cara de real. No site do protótipo, com o envio ligado, as duas coisas ficaram erradas, e a #102 manda marcar os leads de teste.
   - *O que foi feito:* aberta do arquivo, a nota continua igual. No site, troca para "Protótipo de teste. O contato enviado vai para o banco de teste: use nome começando por TESTE e e-mail @teste.invalid.". O "preencher exemplo" passa a pôr TESTE Marina Souza, marina@teste.invalid, telefone com zeros e TESTE Empresa Exemplo. São controles do protótipo, não copy do quiz.
   - *Recomendação:* manter enquanto o painel "Telas" existir; antes de ir ao ar com gente de verdade, o painel e o botão saem da página (já era assim: "O botão 'Telas', no canto, é do protótipo").
   - *Se decidir diferente:* voltar a nota e o exemplo é desfazer duas linhas; aí o teste de amanhã precisa digitar TESTE e @teste.invalid à mão.

23.4. **O exemplo do pacote no README do quiz agora é de teste; o teste do garçom ainda acrescenta TESTE.**
   - *Dúvida:* a 22.9 recomendou trocar o exemplo do README do quiz pelos dados marcados e, aí, tirar a troca feita no teste do garçom. O teste do garçom não é desta etapa.
   - *O que foi feito:* o exemplo do README do quiz (a saída do teste) passou a ser TESTE Marina e marina@teste.invalid. O teste do garçom não foi mexido: ele continua pondo "TESTE " na frente do nome (fica "TESTE TESTE Marina", só na memória) e trocando o e-mail. Rodado de novo: 121 de 121. No console da página do quiz, a linha dos dois critérios do fim (conflito-16) continua, porque não tem dado de pessoa (só o critério em uso, qualificado ou não e a faixa).
   - *Recomendação:* tirar a troca do teste do garçom na próxima versão dele (junto com apagar o wrangler.toml.exemplo, 22.8).
   - *Se decidir diferente:* nada muda no quiz.

23.5. **A landing repassa as cinco utm, mas o quiz só lê duas; o código de sessão da landing é ignorado.**
   - *Dúvida:* a orientação do coordenador manda repassar utm_source, utm_medium, utm_campaign, utm_content e utm_term, as que existirem, e conferir se o quiz lê com os mesmos nomes; a etapa 23 só diz "carregando as utm".
   - *O que foi feito:* as duas variantes repassam as cinco, só as que vierem com valor (na v1 iam só utm_source e utm_campaign, vazias quando faltavam). Os nomes batem: o quiz lê utm_source e utm_campaign com os mesmos nomes, minúsculas, e só aceita os valores da lista do funil-01. utm_medium, utm_content e utm_term ficam no endereço do quiz, mas não entram no pacote: a planta (dados/planta/planta.md) e o garçom só têm utm_source e utm_campaign, e o garçom recusa campo a mais. O id_sessao que a landing manda (um UUID) não é lido pelo quiz, que cria o seu próprio (sessao-...), como já era na v1.
   - *Recomendação:* manter no teste; se as outras três utm ou a ligação da visita da landing com o quiz forem úteis para a medição, decidir junto com a 18.5 (visitas e início do quiz), porque mexe na planta, no banco e no garçom.
   - *Se decidir diferente:* para repassar só as duas, a lista da landing fica com utm_source e utm_campaign.

23.6. **O link da landing para o quiz: caminho do repositório no arquivo, /quiz/ no site.**
   - *Dúvida:* o pedido manda o botão levar a /quiz/ e deixa decidir como o link se comporta aberto do repositório.
   - *O que foi feito:* nas entregas, o href do botão continua sendo o caminho do quiz no repositório (../../../quizzes/quiz-01/pagina/index.html), e o programa da página acrescenta as utm a esse href. A montagem do site troca esse href por /quiz/ (e confere que a troca aconteceu uma vez em cada variante). Assim a revisão local continua funcionando e o site leva a /quiz/, sem a landing precisar saber onde está.
   - *Recomendação:* manter.
   - *Se decidir diferente:* a landing pode escolher sozinha (file: usa o href, o resto usa /quiz/); aí a montagem deixa de trocar o link.

23.7. **compatibility_date ficou em 2026-11-04, não em 08/11.**
   - *Dúvida:* a orientação do coordenador diz "compatibility_date atual". O wrangler 4.158.0 instalado vem com o workerd de 04/11/2026, o mais novo que ele conhece; com 2026-11-08 o dry-run também passou, sem aviso.
   - *O que foi feito:* 2026-11-04, a data mais nova que o motor instalado conhece, para o ensaio local (etapa 25) rodar com o mesmo comportamento da publicação.
   - *Recomendação:* manter; a data só muda o comportamento do Worker quando a Cloudflare liga uma mudança nova, e nada entre 04/11 e 08/11 afeta o garçom.
   - *Se decidir diferente:* trocar a data em wrangler.toml; se o ensaio local avisar que não conhece a data, atualizar o wrangler em nucleo/ferramentas/prototipo/.

23.8. **No celular, o quiz precisa da meta viewport: a montagem acrescenta só no site do protótipo.**
   - *Dúvida:* a página do quiz (e o mockup do Júnior, e o docs/index.html do repositório dele) não tem `<meta name="viewport" content="width=device-width, initial-scale=1">`. O mockup nasceu num artefato do Claude, que põe a viewport por fora. Num navegador de celular, sem ela, a página é desenhada com 980 pixels de largura e encolhida (conferido imitando um celular de 375: largura útil 981). A página também não tem `<!doctype html>` e roda em modo quirks, no navegador e nos prints. Charset: conferido pelo revisor no wrangler dev local, o servidor manda text/html; charset=utf-8 e o document.characterSet dá UTF-8; nenhuma meta charset foi acrescentada.
   - *O que foi feito:* por decisão do coordenador, montar-site.mjs acrescenta a meta viewport, só nos HTML montados e só quando falta, antes do `<title>` (como faz com o noindex), e a conferência da montagem barra HTML montado sem viewport. Só o quiz precisou; as landings já tinham. A entrega do quiz não muda (conflito-18). print.js ganhou a opção --celular (imita celular no print de 375); os prints de 375 do site montado foram refeitos assim, com largura útil 375 nas três páginas.
   - *Recomendação:* na entrega, decidir numa v3 do quiz (conflito-18) se ela ganha a viewport e o `<!doctype html>`, e aí a montagem deixa de acrescentar. O modo quirks fica para a mesma v3.
   - *Se decidir diferente:* tirar a viewport do site é apagar garantirViewport da montagem; o quiz volta a abrir encolhido no celular.

23.9. **Os comentários de cabeçalho das entregas vão junto para o site.**
   - *Dúvida:* os HTML das entregas começam com um comentário com o cabeçalho (id, versão, status, aprovações, conflitos, "rascunho, nada vai ao ar"). A montagem copia o HTML como está.
   - *O que foi feito:* os comentários foram junto: aparecem para quem abrir o código-fonte da página do protótipo. Nenhuma chave nem dado pessoal; só nomes internos e o status.
   - *Recomendação:* manter no protótipo de teste (o endereço não é divulgado e tem noindex); antes de ir ao ar com gente de verdade, a montagem passa a tirar os comentários de cabeçalho.
   - *Se decidir diferente:* uma linha na montagem tira o primeiro comentário de cada HTML.

23.10. **O catálogo de entregas precisa da linha ('quiz-01', 1) antes do teste.**
   - *Dúvida:* a página v2 manda versao_entrega 1, e o banco confere o par (entrega, versão) por chave estrangeira em public.entregas, que o esquema não preenche. Sem a linha ('quiz-01', 1), todo envio volta 422 ("pacote recusado"), e o visitante vê o aviso de falha.
   - *O que foi feito:* mantido 1 (primeira publicação da entrega). Nada foi gravado em lugar nenhum.
   - *Recomendação:* a etapa 26 (LIGAR.md) manda gravar a linha do catálogo antes do teste, e o ensaio da etapa 25 confere.
   - *Se decidir diferente:* mudar ETIQUETAS na página e a linha do catálogo juntos.

23.11. **garcom e quiz-01-pagina dependem um do outro.**
   - *Dúvida:* o garcom declara quiz-01-pagina em depende_de, e a página v2 passou a declarar garcom. Cada versão nova de um marca o outro como desatualizado, num círculo.
   - *O que foi feito:* mantidas as duas dependências; registrado no log.md.
   - *Recomendação:* na próxima versão do garçom, ele deixa de depender da página e cita só a planta (dados/planta/planta.md), que é quem define o pacote.
   - *Se decidir diferente:* manter o círculo e, a cada versão de um, atualizar o outro só na versão citada (forma).

## Etapa 24

24.1. **A planilha do teste mora no Google Drive, e a regra 4 diz que dado pessoal não entra no Drive.**
   - *Dúvida:* CLAUDE.md e nucleo/regras/seguranca.md (regra 4) dizem que dado pessoal nunca entra no Google Drive; a planilha-sdr diz que onde a planilha mora está em aberto (5.4). O pedido manda fazer a planilha no Drive do Safra para o teste de amanhã.
   - *O que foi feito:* o código e o passo a passo seguem o pedido, para o teste, só com leads de mentira (#102: nome TESTE..., e-mail @teste.invalid). O README e o topo de Codigo.gs têm o aviso "só dados de teste até a decisão". Nada na regra 4 foi mexido. Esta pergunta trava ir ao ar com gente de verdade, não o teste.
   - *Recomendação:* decidir 5.4 antes do primeiro lead de verdade. Se a planilha do Google for o lugar, mudar a regra 4 para "dado pessoal só no banco e na planilha do SDR, que mora no Drive do Safra, sem compartilhamento" (a própria regra 4 já cita a planilha do SDR) e registrar como decisão nova.
   - *Se decidir diferente:* se a planilha sair do Google, este script não serve; o desenho das colunas e da lista continua valendo para a ferramenta nova, e a porta privada do garçom também.

24.2. **Permissões mínimas: o script tem de nascer dentro da planilha.**
   - *Dúvida:* o pedido pede escopos mínimos.
   - *O que foi feito:* appsscript.json com spreadsheets.currentonly (só a planilha que contém o script), script.external_request (UrlFetchApp) e script.scriptapp (gatilho). Sem Drive, sem Gmail, sem as outras planilhas. Isso só funciona com o script criado em Extensões, Apps Script, de dentro da planilha, e com SpreadsheetApp.getActiveSpreadsheet(), que num script ligado à planilha funciona também no gatilho. Não foi conferido num Google de verdade (24.13).
   - *Recomendação:* manter; conferir na autorização de amanhã que o Google lista só as três.
   - *Se decidir diferente:* um projeto solto precisaria do escopo spreadsheets inteiro (todas as planilhas da conta) e do id da planilha numa propriedade.

24.3. **O cursor guardado nas propriedades tem um id_pessoa.**
   - *Dúvida:* o pedido manda guardar o cursor nas propriedades do script e também manda não pôr dado pessoal nas propriedades. O cursor do garçom é (horário, id_pessoa), e a planilha-sdr diz que o id_pessoa é dado pessoal indireto ("não sai do banco nem da planilha").
   - *O que foi feito:* guardado como o pedido manda (CURSOR_GRAVADO_EM e CURSOR_ID_PESSOA, os dois numa gravação só), porque as propriedades do script moram dentro da própria planilha e o mesmo id está na coluna A. Nunca vai para o registro. Nenhuma outra informação de pessoa vai para as propriedades.
   - *Recomendação:* aceitar.
   - *Se decidir diferente:* guardar só o horário e mandar o id zero (00000000-0000-0000-0000-000000000000) no cursor; o garçom devolve de novo os leads do mesmo instante, e a conferência do id_pessoa na aba os descarta. Uma linha em lerCursor_ e uma no salvamento.

24.4. **O lead chega como captado; estado vazio fica vazio; valor fora da lista fica vazio.**
   - *Dúvida:* a função do banco manda estagio vazio (21.9), e a planilha-sdr diz que o lead chega como captado (15.5). O banco escreve pre-qualificado sem acento, e a lista da planilha tem pré-qualificado.
   - *O que foi feito:* estágio vazio vira captado na linha nova, como 21.9 combinou ("quem escreve captado na linha nova é a planilha"). Estado vazio fica vazio (o exemplo da planilha-sdr mostra assim). pre-qualificado do banco vira pré-qualificado; o resto é igual. Valor que não é da lista fica vazio, porque "valor fora da lista não entra na planilha". A validação da aba usa os nomes "Na planilha", com acento.
   - *Recomendação:* manter; quando existir a volta do status, ela traduz pré-qualificado para pre-qualificado na ida ao banco.
   - *Se decidir diferente:* para o lead chegar com estágio vazio, uma linha em linhaDoLead_; para a lista da planilha sem acento, mudar ESTAGIOS e o mapa.

24.5. **Como alguns valores aparecem na planilha.**
   - *Dúvida:* o banco manda consentimento como "nao", entrou_em em UTC com microssegundos e respostas_a_confirmar como objeto; a planilha-sdr não diz o formato na célula.
   - *O que foi feito:* "nao" vira "não" (como o exemplo da planilha-sdr); entrou_em vai no horário de Brasília, como texto AAAA-MM-DD HH:MM:SS; respostas como "valor-medio: ...; vendedores: ..."; data_volta como veio. Nota e tentativas como número.
   - *Recomendação:* manter no teste; ver com o SDR, quando houver, se prefere outro formato.
   - *Se decidir diferente:* tudo em linhaDoLead_ e nas funções pequenas logo abaixo dela.

24.6. **Erro na busca vira falha da execução, para o Google avisar por e-mail.**
   - *Dúvida:* a orientação do coordenador manda tratar 401, erro e resposta ilegível sem dado pessoal; não diz se o Otávio deve ser avisado.
   - *O que foi feito:* buscarLeadsNovos termina com erro e uma mensagem em português sem dado pessoal (por exemplo, "o garçom respondeu 401: a CHAVE_PLANILHA das propriedades não é a mesma do Worker"). O Google manda o resumo das falhas do gatilho para a conta do Safra (por padrão, uma vez por dia). Trava ocupada não é erro. buscar_() faz o trabalho e devolve o resumo sem lançar erro (é a que o teste e o ensaio usam).
   - *Recomendação:* manter; no editor, em Acionadores, dá para escolher "Notificar imediatamente".
   - *Se decidir diferente:* para falhar calado, buscarLeadsNovos passa a só chamar buscar_(); aí o único sinal é o registro em Execuções.

24.7. **A planilha só trava os valores da lista, não as regras da lista, nem as colunas do banco.**
   - *Dúvida:* a planilha-sdr diz que a planilha recusa estágio anterior ao atual, stand-by sem data_volta e que o SDR não edita as colunas do banco. A validação de lista do Google não faz as duas primeiras sozinha.
   - *O que foi feito:* só a lista fechada em estagio, estado e canal, sem aceitar valor de fora. Nenhuma trava de "só avança", de stand-by com data, nem proteção das colunas do banco. O README diz isso em "O que não faz". Como não há volta do status, o que o SDR mudar fica só na planilha.
   - *Recomendação:* deixar para a versão que tiver a volta do status: lá, a conferência das regras fica no garçom e no banco (que recusam), e a planilha ganha um aviso por linha. Para as colunas do banco e a coluna produto (que ninguém edita até a decisão 5.3), uma proteção só de aviso nas colunas A a O e S, que dá para acrescentar ao instalar().
   - *Se decidir diferente:* a proteção de aviso é poucas linhas em instalar(); a regra "só avança" na planilha precisaria de um gatilho de edição (onEdit), que roda a cada mudança na aba e desfaz a que voltar o estágio.

24.8. **Aba "fila" com outro cabeçalho: nada é mexido.**
   - *Dúvida:* a orientação do coordenador manda reaproveitar a aba sem apagar.
   - *O que foi feito:* o cabeçalho só é escrito numa aba vazia. Aba com o cabeçalho certo é mantida. Aba com outra coisa na linha 1 faz instalar() parar com aviso, e a busca não grava nada nela. A conferência olha as 19 primeiras colunas; colunas a mais à direita são toleradas, e anotação nelas não empurra os leads. Quando instalar() cria a aba (por exemplo, depois de renomear a antiga), o cursor guardado é apagado, para a aba nova receber todos os leads desde o início; a conferência do id_pessoa evita duplicata.
   - *Recomendação:* manter.
   - *Se decidir diferente:* para consertar o cabeçalho sozinho, instalar() reescreve a linha 1; o risco é gravar leads em colunas trocadas.

24.9. **GARCOM_URL só com https, e o pedido não segue redirecionamento.**
   - *Dúvida:* nem o pedido nem a orientação do coordenador dizem o que fazer com endereço sem https ou com redirecionamento.
   - *O que foi feito:* endereço sem https:// (ou com ?, # ou espaço) é recusado antes de chamar, e o pedido vai com followRedirects falso, para a chave não seguir para outro endereço. Barra no fim é tirada. Um 3xx conta como erro do garçom.
   - *Recomendação:* manter.
   - *Se decidir diferente:* uma linha em conferirPropriedades_ e uma nas opções do fetch.

24.10. **Até 10 páginas (2.000 leads) por rodada.**
   - *Dúvida:* a orientação do coordenador manda um limite de voltas por execução, sem número.
   - *O que foi feito:* MAX_VOLTAS = 10. Uma rodada leva poucos segundos com 2.000 leads; o limite do Apps Script é de 6 minutos por execução. O resto fica para a rodada seguinte, 5 minutos depois.
   - *Recomendação:* manter; no protótipo, o volume é de poucos leads.
   - *Se decidir diferente:* mudar a constante.

24.11. **Lead fora das faixas a e b não entra (defesa).**
   - *Dúvida:* o banco só manda faixas a e b; o pedido não diz o que fazer se vier outra.
   - *O que foi feito:* lead com faixa fora de a e b não entra na aba (a planilha "não recebe c nem eliminatorio"), conta no registro como "fora da faixa" e o cursor segue.
   - *Recomendação:* manter.
   - *Se decidir diferente:* tirar a linha da conferência em buscar_.

24.12. **Proteção contra fórmula: apóstrofo na frente.**
   - *Dúvida:* a orientação do coordenador manda gravar como texto o valor com cara de fórmula; há mais de um jeito.
   - *O que foi feito:* todo valor que começa por = + - @, tabulação, retorno ou apóstrofo vai com um apóstrofo na frente, o jeito comum do Google Planilhas de guardar texto (o apóstrofo não aparece na célula). O telefone, que começa com +, entra assim também, como texto. Além disso, por decisão do coordenador, instalar() põe formato de texto simples (@) em nome, telefone, email, empresa e respostas_a_confirmar, para o Google não transformar "00123", "TRUE" ou "1/2" em número, verdadeiro ou data; as linhas que a aba ganhar depois recebem o mesmo formato.
   - *Recomendação:* manter; conferir amanhã que uma empresa "=1+1" de teste aparece como texto e sem o apóstrofo visível numa coluna com formato de texto simples (24.13).
   - *Se decidir diferente:* tirar o formato é apagar aplicarFormatos_; tirar o apóstrofo deixaria as outras colunas (e o telefone, se o formato sair) abertas a fórmula.

24.13. **O que o Google de mentira não prova.**
   - *Dúvida:* o teste local imita o Google, não é o Google.
   - *O que foi feito:* conferido aqui só o que depende do código. Fica para o teste de amanhã: a autorização com só três permissões (24.2); o getActiveSpreadsheet() no gatilho; o apóstrofo guardando texto e não aparecendo nas colunas com formato de texto simples (@), e o formato @ mantendo "00123", "TRUE" e "1/2" como texto (24.12); a lista suspensa com acento; o horário de Brasília; o gatilho de 5 minutos rodando sozinho; o aviso de falha por e-mail (24.6).
   - *Recomendação:* o roteiro da etapa 26 confere cada um desses no passo da planilha.
   - *Se decidir diferente:* nada muda no código.

## Etapa 25

25.1. **A margem de 1 minuto no ensaio: atrasar o relógio em vez de esperar.**
   - *Dúvida:* leads_para_planilha só devolve fins de quiz gravados há mais de 1 minuto (21.6). O pedido deixa escolher entre esperar 61 segundos e um contorno, sem mexer no esquema.
   - *O que foi feito:* o ensaio confere primeiro que a busca logo depois do quiz vem vazia (a margem funciona) e depois, como o superusuário do PGlite, numa sessão só, liga session_replication_role = replica, atrasa em 2 minutos o gravado_em dos fins de quiz de teste e volta para origin. A trava não é desligada na tabela, e o ensaio confere em seguida que apagar evento continua recusado. O README do ensaio diz o que o contorno pula: a espera de verdade, a margem no lado "já passou" com o relógio de verdade e a ordem entre clock_timestamp e now() em conexões diferentes.
   - *Recomendação:* manter; o ensaio fica em 25 segundos. No teste de amanhã, a espera de verdade acontece sozinha (o lead aparece de 1 a 6 minutos depois).
   - *Se decidir diferente:* para esperar de verdade, trocar o bloco do contorno em ensaio.mjs por uma espera de 61 segundos; o ensaio passa a levar perto de 90 segundos.

25.2. **A linha do catálogo diz "publicada" para um protótipo de teste.**
   - *Dúvida:* a gaveta entregas é o catálogo das entregas publicadas, e o protótipo de teste não é entrega. Sem a linha ('quiz-01', 1), nenhum envio grava (23.10).
   - *O que foi feito:* dados/banco/catalogo-prototipo.sql (v1, rascunho) grava só essa linha, com tipo quiz, funil-01, o caminho entregas/quizzes/quiz-01/pagina/ e publicada_em na hora em que roda; retirada_em fica vazia. Roda de novo sem duplicar e sem mudar a data. O ensaio aplica o mesmo arquivo, duas vezes. O cabeçalho do arquivo diz que a linha existe para o teste.
   - *Recomendação:* aceitar para o teste. Antes de ir ao ar com gente de verdade, junto com a limpeza dos dados de teste (#102), decidir se a linha fica (com publicada_em trocada pela data de ir ao ar) ou se o banco recomeça do zero.
   - *Se decidir diferente:* se o protótipo tiver de usar uma versão própria (por exemplo, quiz-01 versão 0, só de teste), mudar juntos ETIQUETAS na página, este arquivo e o CHECK de versao (que hoje exige 1 ou mais).

25.3. **catalogo-prototipo.sql ainda não aparece no README do banco.**
   - *Dúvida:* dados/banco/README.md lista os arquivos da pasta. Ele tem o id banco-rascunho, o mesmo de esquema.sql (versão 2). Subir só o README para a versão 3 desencontraria o README e o esquema, que não mudou.
   - *O que foi feito:* o README do banco não foi mexido. O arquivo novo está no index.md, no log.md, no README do ensaio e no próprio cabeçalho, e o roteiro da etapa 26 vai apontar para ele.
   - *Recomendação:* na próxima versão do banco, o README ganha a linha do catalogo-prototipo.sql na tabela "O que tem dentro" e no "Como aplicar amanhã" (forma).
   - *Se decidir diferente:* subir agora o README (e o cabeçalho de esquema.sql junto, como forma) para a versão 3, só com essa linha.

25.4. **A sessão da landing não chega ao quiz.**
   - *Dúvida:* o botão da landing manda ao quiz um id_sessao (um UUID), mas o quiz ignora esse valor e cria o próprio código (sessao-...), que é o formato que o banco aceita. O UUID da landing nem passaria na restrição do banco (precisa começar por "sessao-").
   - *O que foi feito:* nada mudou; hoje não tem efeito, porque o registro de visita está desligado (18.5) e o banco só recebe o fim do quiz. O ensaio confere que o id_sessao vai no endereço e que o banco grava a sessão do quiz.
   - *Recomendação:* quando 18.5 ligar a visita, a landing passa a gerar o código no formato sessao-... e o quiz passa a usar o que veio no endereço, se vier nesse formato; sem isso, a visita e o fim do quiz não se ligam (6.2).
   - *Se decidir diferente:* se a visita nunca for gravada, tirar o id_sessao do botão da landing numa versão nova das duas variantes.

25.5. **Envios simultâneos continuam sem conferência de verdade (21.15).**
   - *Dúvida:* o pedido manda conferir a mesma pessoa enviando duas vezes ao mesmo tempo.
   - *O que foi feito:* dois POST ao mesmo tempo ao garçom de verdade (no wrangler dev), que chegam juntos ao Supabase de mentira; os dois gravam, fica uma pessoa e dois eventos. Mas o PGlite tem uma conexão só e o Supabase de mentira põe os pedidos numa fila: no banco, um roda depois do outro. O caminho do índice único com espera não roda aqui.
   - *Recomendação:* no teste de amanhã, mandar o mesmo lead de mentira duas vezes quase juntas (dois celulares ou duas abas) e conferir no Supabase uma pessoa e dois eventos; a etapa 26 deve ter esse passo.
   - *Se decidir diferente:* uma conferência com duas conexões de verdade precisaria de um Postgres local de verdade (fora desta fila: instalação nova fora de nucleo/ferramentas/).

25.6. **O ensaio usa o playwright-core da ferramenta de prints e o wrangler da pasta do protótipo.**
   - *Dúvida:* o ensaio precisa do navegador sem tela e do wrangler, que já estão instalados em nucleo/ferramentas/prints/ e nucleo/ferramentas/prototipo/.
   - *O que foi feito:* o ensaio carrega os dois de onde já estão (createRequire para o playwright-core e o acharChromium de print.js; o binário do wrangler de ../prototipo/), sem instalar de novo. package.json do ensaio continua só com o PGlite e ganhou os scripts ensaio e ensaio:sem-wrangler. O README diz que são três instalações.
   - *Recomendação:* manter; uma versão só de cada ferramenta.
   - *Se decidir diferente:* pôr playwright-core e wrangler no package.json do ensaio e trocar os dois caminhos em ensaio.mjs.

25.7. **Se o wrangler não subir, o ensaio passa para o contorno, mas continua falhando.**
   - *Dúvida:* o pedido manda contornar com o garçom num servidor Node se o wrangler dev não funcionar.
   - *O que foi feito:* o contorno existe (`npm run ensaio:sem-wrangler`, ou sozinho depois de cerca de 1 minuto sem resposta do wrangler), roda o resto do ensaio e diz o modo na saída. Quando o contorno entra sozinho, a conferência "wrangler dev no ar" fica FALHOU e o ensaio termina com código 1, para ninguém achar que o Worker foi conferido. Nesta máquina o wrangler dev subiu sem login, e o contorno só foi usado de propósito (86 de 86).
   - *Recomendação:* manter.
   - *Se decidir diferente:* para o contorno automático contar como sucesso, trocar essa conferência por um aviso.

## Etapa 26

26.1. **O Terminal entra já na parte 2, para copiar os arquivos .sql.**
   - *Dúvida:* o pedido põe o Terminal na parte 3 (Cloudflare). Na parte 2, o Otávio precisa colar no editor SQL três arquivos inteiros, e o esquema é comprido; copiar abrindo o arquivo num editor de texto arrisca perder um pedaço ou trocar aspas.
   - *O que foi feito:* LIGAR.md abre o Terminal no passo 2.1 (com o cd entre aspas) e copia cada arquivo com `pbcopy < arquivo`, que põe o arquivo exato na área de transferência. A parte 3 começa conferindo que o Terminal continua na pasta (passo 3.1). O mesmo jeito copia o Codigo.gs e o appsscript.json na parte 4. A ordem das sete partes não mudou.
   - *Recomendação:* manter.
   - *Se decidir diferente:* para copiar pelo site do GitHub (botão de copiar o arquivo, depois do push), trocar os passos 2.3, 2.5, 2.7, 4.6 e 4.9; o Terminal volta a entrar só na parte 3.

26.2. **O caminho da CHAVE_PLANILHA até as propriedades do script, sem arquivo e sem chat.**
   - *Dúvida:* a mesma CHAVE_PLANILHA vai para o cofre do Worker e para as propriedades do script. Era preciso conferir se `wrangler secret put` aceita o valor pela entrada padrão e achar um caminho em que o valor não passe por arquivo, tela, histórico do Terminal nem chat.
   - *O que foi feito:* conferido no código do wrangler 4.158.0 instalado (nucleo/ferramentas/prototipo/node_modules/wrangler/wrangler-dist/cli.js, comando "Create or update a secret for a Worker"): quando a entrada não é o teclado (process.stdin.isTTY falso), o wrangler lê o valor da entrada padrão e tira os espaços e a quebra de linha do fim; com o teclado, pergunta "Enter a secret value" sem mostrar o que se digita. O `--help` não diz isso. LIGAR.md usa, no fim da parte 3, `openssl rand -hex 32 | tr -d '\n' | pbcopy && pbpaste | wrangler secret put CHAVE_PLANILHA --config ...` (64 caracteres, acima do mínimo de 32, pergunta 22.4). O `tr -d '\n'` tira a quebra de linha, para o valor colado nas propriedades ser igual ao do cofre. Na parte 4, as propriedades vêm antes de copiar o código (a ordem muda em relação ao README da planilha), para a chave sair da área de transferência logo, e a área é limpa com `pbcopy < /dev/null`. Se a área de transferência se perder no meio, o mesmo comando gera outra chave e troca a do cofre. As duas chaves do Supabase seguem o mesmo caminho (botão de copiar no painel, `pbpaste | wrangler secret put`). Nada disso foi rodado de verdade: só conferido no código e com `openssl rand -hex 32` sem guardar a saída.
   - *Recomendação:* manter. Se o Mac usar um programa de histórico da área de transferência, ou a Área de Transferência Universal com o iPhone, o valor pode ficar guardado lá; vale pausar o programa durante as partes 3 e 4, ou apagar o item depois.
   - *Se decidir diferente:* o caminho pelo painel da Cloudflare (fim da parte 3) e a pergunta "Enter a secret value" (parte 6, erro 3) continuam no roteiro como alternativa.

26.3. **A chave publicável usada é a que o projeto já tem.**
   - *Dúvida:* a #100 pede uma chave secreta nova e não diz se a publicável ganha chave própria. Não confirmei, sem entrar no painel, se o Supabase deixa criar mais de uma publicável.
   - *O que foi feito:* LIGAR.md usa a Publishable key que o painel mostra (passo 3.8). No desligar (7.3), se o painel não deixar apagar a única, cria-se uma nova e apaga-se a antiga.
   - *Recomendação:* se o painel oferecer criar uma publicável com nome, criar "garcom-quiz-prototipo" e usar essa, para poder apagá-la sem mexer em mais nada.
   - *Se decidir diferente:* muda só o passo 3.8 (qual chave copiar) e o 7.3.

26.4. **Chaves que ninguém usa: as antigas e a secreta "default".**
   - *Dúvida:* conexoes.md e dados/banco/README.md citam a desativação das chaves antigas (legacy) como passo do roteiro da etapa 26, sem dizer se é opcional. A antiga service_role abre o mesmo que a secreta nova (no banco, o esquema só deixa esse papel chamar leads_para_planilha; fora do banco, a administração do Supabase), mas não dá para apagá-la sozinha: se vazar, o único corte é desligar todas as antigas. O projeto pode ter também uma chave secreta "default", que o sistema não usa.
   - *O que foi feito:* caminho conservador: o passo 2.11 desativa as antigas, como passo obrigatório, porque nada do sistema as usa e dá para reativar no mesmo lugar. A secreta "default", se existir, é apagada depois de o teste da parte 5 dar certo (7.9 repete as duas coisas, se sobrarem).
   - *Recomendação:* manter.
   - *Se decidir diferente:* para voltar a ter as antigas, reativar em Project Settings, API Keys, Legacy API keys; enquanto estiverem ligadas, a antiga service_role abre o mesmo que a secreta nova e só se corta desligando todas. Registrar em conexoes.md que elas seguem valendo.

26.5. **O registro do Worker só pelos envios do quiz.**
   - *Dúvida:* o garçom não escreve dado pessoal no registro, mas o `wrangler tail` e o painel mostram também o endereço de cada pedido. O pedido da planilha leva o cursor no endereço (com o id_pessoa, dado pessoal indireto, pergunta 24.3) e a CHAVE_PLANILHA no cabeçalho X-Chave-Planilha; o formato json do tail mostra os cabeçalhos. Não conferi, sem login, se a Cloudflare esconde cabeçalhos no tail.
   - *O que foi feito:* LIGAR.md (parte 6) manda usar `wrangler tail --config ... --format pretty --method POST`, que mostra só os envios do quiz (POST /api/fim-quiz, sem nada no endereço), e proíbe o formato json. Para a planilha, o lugar de ver é Execuções, no Apps Script.
   - *Recomendação:* manter. Numa versão nova do garçom, pensar em mandar o cursor no corpo de um POST, para ele não aparecer em endereço nenhum.
   - *Se decidir diferente:* tirar o `--method POST` mostra também os pedidos da planilha; aceitável só com leads de teste.

26.6. **O login do wrangler fica num arquivo do usuário do Mac.**
   - *Dúvida:* o `wrangler login` guarda o acesso à Cloudflare num arquivo de texto na pasta do usuário, fora do repositório. O wrangler 4.158.0 tem a opção `--use-keyring`, que guarda no Acesso às Chaves (o cofre de senhas do macOS), mas não foi testada aqui.
   - *O que foi feito:* LIGAR.md usa o `wrangler login` simples, como o pedido, e `export WRANGLER_SEND_METRICS=false` antes (o wrangler não manda estatísticas). No desligar, o passo 7.8 faz `wrangler logout`, que derruba esse acesso.
   - *Recomendação:* depois do teste, se não for publicar de novo nos próximos dias, rodar o `wrangler logout` mesmo sem desligar o protótipo; o protótipo continua no ar sem o login.
   - *Se decidir diferente:* para guardar no Acesso às Chaves, trocar o passo 3.4 por `wrangler login --use-keyring` e conferir com o `whoami`.

26.7. **Três testes, com três pessoas de mentira, e a planilha com duas linhas.**
   - *Dúvida:* o pedido pede o quiz no celular e no computador, um teste da faixa A, um eliminatório e dois envios quase juntos.
   - *O que foi feito:* teste A no computador pela variante A (exemplo de base/lead-score.md, 96, faixa A, utm bio, e a empresa "=1+1" para conferir a 24.12); teste B no celular pela variante B (eliminatório, faturamento "Menos de R$ 50 mil", utm stories); teste C em duas abas do computador, a mesma pessoa enviando quase junto. Cada pessoa com telefone (00 90000-00xx; com o +55, 13 dígitos) e e-mail @teste.invalid só dela, para não cair na recusa da 21.2. Esperado: 3 pessoas, 4 fins de quiz no banco (2 da pessoa C, no mesmo id_pessoa) e 2 linhas na planilha (A e C). O teste C prova que a mesma pessoa enviando duas vezes quase juntas vira uma só; dois cliques à mão quase nunca chegam ao banco no mesmo instante, e, se não chegarem, o caso realmente simultâneo (a espera no índice único) continua sem prova (21.15). LIGAR.md diz isso no 5.3.
   - *Recomendação:* manter; se a prova do caso simultâneo importar antes de ir ao ar, fazer à parte, com dois pedidos disparados juntos por um programa contra o garçom, só com lead de teste.
   - *Se decidir diferente:* o teste C com a faixa eliminatória daria a mesma conferência no banco, e a planilha ficaria só com a linha A.

26.8. **O protótipo subiu para a versão 2 só para apontar para o LIGAR.md.**
   - *Dúvida:* o README do protótipo dizia que LIGAR.md "ainda não existe". O id prototipo-funil-01 também está no comentário de cabeçalho de wrangler.toml e de montar-site.mjs.
   - *O que foi feito:* README.md v1 para v2 (forma): aponta para LIGAR.md, a tabela "O que tem dentro" ganha a linha e "O que não fazer" deixa de dizer que o roteiro não existe. Os comentários de cabeçalho de wrangler.toml e montar-site.mjs passam a dizer versao 2, sem outra mudança (nenhuma linha de configuração ou de código mudou). Cascata: dependem de prototipo-funil-01 1 o ensaio (já com desatualizado: true) e dados/banco/catalogo-prototipo.sql, que ganhou só a marca no comentário do cabeçalho ("desatualizado: true"), sem subir versão nem mudar conteúdo, como a regra manda. A troca para prototipo-funil-01 2 fica proposta para a próxima versão dele.
   - *Recomendação:* aceitar.
   - *Se decidir diferente:* voltar o README para a v1, tirar a marca do catalogo-prototipo.sql e deixar a referência ao LIGAR.md só no index.md e no log.md.

26.9. **O tempo estimado.**
   - *Dúvida:* a meta é menos de uma hora.
   - *O que foi feito:* cerca de 58 minutos para as partes 1 a 5 (3, 15, 15, 10 e 15), contando 6 minutos para os dois envios em duas abas (5.3) e a espera da planilha como 1 minuto, com a busca rodada à mão. Esperando o gatilho, até 5 minutos a mais. As partes 6 e 7 ficam fora da conta. Os passos 3.8 e 3.9 têm duas ações seguidas cada (copiar no painel e rodar o comando), contra a regra de uma ação por passo: separar deixaria a chave na área de transferência entre dois passos, com o risco de um Cmd+C no meio; ficaram juntas e numeradas 1 e 2.
   - *Recomendação:* manter; se o passo 2.4 ou o login da Cloudflare travarem, o tempo é o de resolver o erro, e o roteiro manda parar e trazer a mensagem.
   - *Se decidir diferente:* separar 3.8 e 3.9 em dois passos cada é só numeração; o tempo não muda.

26.10. **Nomes de botões dos painéis não conferidos.**
   - *Dúvida:* sem login, não deu para ver os painéis do Supabase, da Cloudflare e do Google de hoje.
   - *O que foi feito:* os nomes seguem os READMEs da casa e o que o Claude conhece (SQL Editor, Run this query, Project Settings, API Keys, Legacy API keys, Variables and Secrets, Domains & Routes, Extensões, Apps Script, Propriedades do script); onde o nome pode mudar, LIGAR.md diz "algo como". Os comandos do wrangler foram conferidos com `--help` no 4.158.0 instalado: `secret put`, `secret list`, `secret delete`, `deploy`, `delete` e `tail`, que aceitam `--config`, e `login`, `whoami` e `logout` (o `deploy --dry-run` rodou da raiz do repositório com esse `--config`, sem login). Não conferidos: login, publicação, segredos e tail de verdade, que pedem conta.
   - *Recomendação:* se um nome estiver diferente amanhã, anotar e corrigir o LIGAR.md numa v2 (forma).
   - *Se decidir diferente:* nada muda.

26.11. **"Em até 5 minutos" na planilha vira "de 1 a 6 minutos".**
   - *Dúvida:* o pedido diz que a linha aparece na planilha em até 5 minutos. Com a margem de 1 minuto do banco (21.6) e o gatilho de 5, ela aparece de 1 a 6 minutos depois do envio.
   - *O que foi feito:* LIGAR.md diz de 1 a 6 minutos (5.6 e erro 2), ou cerca de 1 minuto rodando buscarLeadsNovos à mão.
   - *Recomendação:* manter.
   - *Se decidir diferente:* para caber em 5 minutos sempre, rodar a busca à mão no 5.6 (já está no roteiro) ou tirar a margem do banco, o que muda a decisão provisória 21.6 e o esquema.

26.12. **Correções da revisão aplicadas ao LIGAR.md.**
   - *Dúvida:* a revisão da etapa 26 pediu ajustes de segurança e de clareza.
   - *O que foi feito:* aviso para não gravar nem compartilhar a tela nas partes 2 a 4; passo 3.0 para pausar o histórico da área de transferência e o Handoff (Área de Transferência Universal); o olho da chave secreta escondido de novo; nome com sublinhado se o painel recusar o hífen; botões pelo nome da página ("Quero responder as perguntas do meu funil", "Ver meu diagnóstico", campo WhatsApp); não usar o "protótipo · preencher exemplo" nem pular telas pelo botão Telas; registro só pelo wrangler tail filtrado; "Editar propriedades do script"; conferência do acento depois de colar o código; passo 7.9 para as chaves que sobrarem; a data da "Última troca" contada ao Claude para conexoes.md.
   - *Recomendação:* manter.
   - *Se decidir diferente:* cada ajuste é um trecho do LIGAR.md; nenhum outro arquivo depende deles.

## Etapa 27

27.1. **A pergunta 6.3 saiu como respondida pela #100.**
   - *Dúvida:* a 6.3 (prompts/06-para-o-otavio.md) pergunta se quem refaz o quiz é reconhecido pelo telefone ou e-mail. A #100 manda índice único no telefone e no e-mail, e a gravação junta os envios da mesma pessoa: na prática, é "telefone ou e-mail". A 18.6 (prompts/07-para-o-otavio.md) propõe reconhecer só pelo telefone.
   - *O que foi feito:* a 6.3 saiu da página de decisões como respondida pela #100. A 18.6 continua aberta, agora dizendo que reconhecer só pelo telefone pede mudar a #100 (tirar o índice único do e-mail).
   - *Recomendação:* aceitar.
   - *Se decidir diferente:* se a 6.3 tiver de continuar aberta, ela volta para a tabela 3 da página de decisões, com a recomendação "sim"; nada muda no banco.

27.2. **Itens já aplicados por uma etapa seguinte contam como forma.**
   - *Dúvida:* na triagem, cinco perguntas já tinham a recomendação aplicada por uma etapa seguinte (21.15, 22.9, 23.10, 25.5, 26.8) e cinco pediam só uma correção de forma na próxima versão de um documento (20.4, 22.8, 23.4, 25.3, 26.10). Nenhuma delas pede decisão.
   - *O que foi feito:* as dez ficaram no grupo A. As cinco primeiras só ganharam uma linha no log.md; as cinco outras viraram um item das Pendências do log.md ("Correções de forma para a próxima versão de cada documento"), sem subir nenhum documento agora, como a própria recomendação de cada uma manda.
   - *Recomendação:* aceitar; subir sete ou oito documentos de versão agora, só por forma, marcaria em cascata documentos que já estão desatualizados por outros motivos.
   - *Se decidir diferente:* se as correções tiverem de entrar já, são correções de forma, cada uma com versão nova e linha no log.md; 20.4 sozinha são sete documentos.
