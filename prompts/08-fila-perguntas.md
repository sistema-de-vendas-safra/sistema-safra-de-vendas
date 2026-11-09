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
