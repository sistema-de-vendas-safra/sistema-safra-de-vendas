# Fila da madrugada · etapas 20 a 27

Escrito em 08/11/2026, à noite, pelo mentor (Claude, no projeto do claude.ai). O Otávio aprova este pedido, inclusive as decisões técnicas abaixo, ao mandar executar.

## Objetivo

Deixar o protótipo do funil-01 pronto para ligar amanhã com menos de uma hora de trabalho do Otávio. Tudo o que não precisa de conta, chave ou login fica feito, testado de ponta a ponta numa cópia local e com o passo a passo escrito. Amanhã o Otávio só roda o SQL no Supabase, guarda as chaves nos cofres, faz o login da Cloudflare e publica.

Protótipo de teste não é entrega: o conflito-17 e as aprovações continuam travando ir ao ar com gente de verdade. Nada desta fila vai ao ar.

## Como trabalhar (vale para todas as etapas)

- Leia CLAUDE.md antes de começar. Valem todas as regras da casa, inclusive a Regra de pausas: não pare para perguntar; decida pelo caminho conservador, anote a dúvida em prompts/08-fila-perguntas.md no formato de sempre (Dúvida, O que foi feito, Recomendação, Se decidir diferente) e siga.
- Uma etapa por vez, na ordem. Em cada etapa, um subagente escreve e outro subagente, que não viu a escrita, revisa contra este pedido e contra a base. O coordenador aplica as correções e faz um commit com a mensagem "etapa NN · nome curto". Este arquivo entra no primeiro commit.
- Se uma etapa travar de verdade, registre o motivo nas perguntas, marque a etapa como incompleta na resposta final e siga para a próxima que não dependa dela.
- Tudo o que esta fila produz nasce como rascunho, com cabeçalho, versão e log, como manda nucleo/regras/versionamento.md. Mudança de sentido em documento aprovado ou decidido vira pergunta, não edição.
- Proibido nesta fila: publicar qualquer coisa; fazer login em Cloudflare, Supabase ou Google; chamar endereço real do Supabase ou da Cloudflare; criar, pedir ou escrever chave, senha ou token de verdade (nos testes, só valores de mentira, em domínio .invalid); push; mexer em fontes/.
- Permitido: instalar dependências de desenvolvimento com npm dentro de nucleo/ferramentas/ (node_modules fica fora do Git), rodar testes locais e `npx wrangler deploy --dry-run` (se pedir login, anote e siga).

## Decisões técnicas aprovadas pelo Otávio ao mandar executar este prompt

Registre em base/decisoes.md a partir da #99, com status decidido e aprovado_por otavio em 08/11/2026, e cite-as nos documentos que mudarem.

1. **Projeto do Supabase criado** (08/11/2026): organização "Sistema de Vendas Safra", plano grátis; projeto sistema-de-vendas-safra; região São Paulo (sa-east-1); endereço https://bvrvdlhpralmzizobsvu.supabase.co (não é segredo). Criado com Data API ligada, "Automatically expose new tables" desligado e RLS automático ligado. Consequência: o esquema não conta com nenhuma permissão padrão. Toda permissão é revogada e concedida de forma explícita, inclusive EXECUTE de função (o Postgres dá EXECUTE a PUBLIC por padrão).
2. **Duas chaves do Supabase no garçom, uma para cada porta** (responde 18.2, 18.9 e os itens 1 a 3 de 18.11):
   - Porta pública (fim do quiz): chave publicável do Supabase, que entra como papel anon. O papel anon só pode executar registrar_fim_quiz e nada mais: nenhuma tabela, nenhuma visão, nenhuma outra função.
   - Porta privada (planilha do SDR): chave secreta nova do Supabase (papel service_role), usada só nessa porta e só para chamar a função que entrega os leads à planilha.
   - As duas funções viram SECURITY DEFINER, com search_path vazio e todos os nomes qualificados, como recomenda o linter do Supabase.
   - Visões do painel sem security_invoker, com SELECT revogado de todo mundo até existir o papel do painel (18.3 continua para depois).
   - Índice único parcial no telefone normalizado e no e-mail em minúsculas; a função de gravação lida com dois envios simultâneos da mesma pessoa sem criar duas linhas e sem perder o evento.
3. **Um endereço só para o protótipo:** um Worker da Cloudflare chamado safra-prototipo-funil-01, no subdomínio workers.dev da conta do Safra (https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev), serve tudo: variante A da landing em /, variante B em /b/, quiz em /quiz/ e garçom em /api/. Mesma origem, sem CORS aberto. Tudo com noindex (meta e cabeçalho X-Robots-Tag). O repositório pessoal do quiz e o Worker dele não são tocados.
4. **Leads de teste marcados:** no protótipo, todo lead de teste usa e-mail terminado em @teste.invalid e nome começando por TESTE. Como a trava do esquema não deixa apagar evento, registre no log.md a pendência: antes de ir ao ar com gente de verdade, limpar os dados de teste de propósito (ou recomeçar o banco do zero) e registrar como foi feito.

Ficam como estão, porque a decisão é do Otávio ou dos sócios: o critério do fim do quiz (14.2), o registro do clique "Tenho interesse" (18.4), visitas e início do quiz (18.5), consentimento como histórico (18.6), prazo de guarda e apagamento (18.10) e o destino dos contatos (conflito-17).

## Etapa 20 · Detector de chaves e brecha do .env

- Um detector de chaves sem dependências externas em nucleo/ferramentas/detector-de-chaves/ (Node), ligado como gancho de pré-commit versionado (pasta .githooks e `git config core.hooksPath .githooks`). O README explica como ligar de novo num clone novo.
- Recusa o commit quando encontra, nos arquivos preparados: chaves do Supabase (sb_secret_, sb_publishable_ e JWT), tokens da Cloudflare, chaves do Google (AIza), blocos de chave privada, atribuições a nomes com KEY, SECRET, TOKEN, CHAVE, SENHA ou PASSWORD com valor longo, e qualquer arquivo .env, .env.*, .dev.vars ou .pem. Valores de mentira em domínio .invalid e nomes de variáveis sem valor passam. A mensagem de recusa é em português de gente e nunca repete o valor encontrado.
- Testes com casos que devem passar e casos que devem barrar. Os casos de barrar são montados em tempo de execução, para nenhum valor parecido com chave ficar escrito no repositório.
- Varra o histórico inteiro do Git uma vez e registre na resposta só se achou algo e em que commit, nunca o valor.
- Brecha do .env: .gitignore ganha .dev.vars, *.pem e .wrangler/; .claude/settings.json ganha bloqueio de leitura para .dev.vars e *.pem e bloqueio, na sintaxe de permissões do Claude Code, para comandos Bash que leiam .env ou .dev.vars (cat, head, tail, less, more, grep, sed, awk, cp, source). Anote na resposta que o bloqueio de comandos é cerca, não muro: a proteção principal é o desenho, porque no protótipo nenhuma chave de verdade passa por arquivo da máquina; os valores vão direto do painel do serviço para o cofre.
- nucleo/regras/seguranca.md: a parte do detector de chaves passa a apontar para a ferramenta (correção de forma, se não mudar o sentido).

## Etapa 21 · Banco v2

- dados/banco/esquema.sql em versão nova, aplicando as decisões 1 e 2, mais a função que entrega os leads à planilha. Ela recebe um cursor (data de gravação e id, para não perder nem repetir lead gravado no mesmo instante) e devolve no máximo 200 leads em ordem, só com as colunas que funis/funil-01/planilha-sdr.md diz que vêm do banco. Se a base não disser quem entra na planilha (eliminatórios, quem não aceitou WhatsApp), siga o caminho em que menos gente é contatada e registre a pergunta.
- Não use FORCE ROW LEVEL SECURITY: as funções são donas das tabelas e precisam passar pela fechadura; quem fica trancado é anon e authenticated.
- O esquema roda inteiro de uma vez no editor SQL do Supabase, num projeto vazio, sem erro. De preferência pode rodar de novo sem quebrar; se não puder, avisa isso claramente no topo.
- dados/banco/conferir.sql: consultas só de leitura para o Otávio rodar depois e conferir que deu certo (tabelas, RLS ligada em todas, quem pode executar o quê, nenhuma permissão para anon além da função de gravação). Cada consulta com um comentário dizendo o resultado esperado em português de gente.
- dados/banco/README.md atualizado: o que mudou, como aplicar amanhã em poucos passos e como conferir.
- dados/planta/planta.md e o que mais depender: se o desenho mudar o que a planta diz (por exemplo 6.6 e o catálogo conferido pelo banco, 18.8), suba a versão como manda a regra e registre.
- conexoes.md: registrar o projeto do Supabase (decisão 1), as chaves que vão existir (publicável e secreta), onde cada uma vai morar, quem lê e como revogar. Tirar a menção a ".env no Mac" como lugar de chave. Nenhum valor.

## Etapa 22 · Garçom v2 com duas portas

- Porta pública POST /api/fim-quiz: tudo o que a v1 já confere, agora gravando com a chave publicável (segredo SUPABASE_CHAVE_PUBLICAVEL).
- Porta privada GET /api/planilha/leads-novos: só abre com o cabeçalho X-Chave-Planilha igual ao segredo CHAVE_PLANILHA, em comparação de tempo constante. Usa SUPABASE_CHAVE_SECRETA só aqui. Recebe o cursor e devolve os leads e o cursor seguinte. Sem a chave certa, 401 sem detalhe. Nenhum dado pessoal no registro da Cloudflare.
- O mesmo Worker serve as páginas do protótipo (decisão 3), com as rotas /api/ atendidas antes dos arquivos.
- Segredos, só pelo nome: SUPABASE_CHAVE_PUBLICAVEL, SUPABASE_CHAVE_SECRETA e CHAVE_PLANILHA. SUPABASE_URL e ORIGEM_PERMITIDA não são segredo e podem ficar como variáveis comuns na configuração do Worker; ORIGEM_PERMITIDA vale o próprio endereço do protótipo.
- Teste local atualizado e ampliado para a porta privada (chave errada, sem chave, cursor, limite). Todos os casos da v1 continuam passando.
- Proteção contra robô e limite de pedidos: não ligar agora; registrar no log.md como pendência obrigatória antes de tráfego real, com a recomendação (Turnstile e limite de pedidos da Cloudflare).

## Etapa 23 · Páginas ligadas e site do protótipo

- Quiz em versão nova: enviarPacote faz POST para /api/fim-quiz (endereço relativo), mostra ao visitante uma mensagem clara se o envio falhar (sem perder o diagnóstico na tela) e para de escrever o pacote no console. Abrir o arquivo direto do repositório continua funcionando para revisão, só sem gravar.
- Landing, nas duas variantes: o botão leva a /quiz/ carregando as utm do endereço da landing. O registro de visita continua desligado (18.5).
- entregas/prototipo-funil-01/: a configuração do Worker (nome safra-prototipo-funil-01, sem id de conta, sem segredo), um script que monta a pasta do site a partir das entregas (a pasta montada fica fora do Git) e um README. Rode `npx wrangler deploy --dry-run` para conferir que o pacote fecha.
- Prints em 375 e 1440 das três páginas montadas, com a ferramenta de prints.

## Etapa 24 · Planilha do SDR com Apps Script

- O código do Apps Script e o README de instalação, numa pasta coerente com a casa (por exemplo entregas/planilha-sdr-funil-01/).
- A cada 5 minutos, por gatilho de tempo, pergunta à porta privada do garçom pelos leads novos e acrescenta linhas na aba da fila, com as colunas e a ordem de funis/funil-01/planilha-sdr.md. Guarda o cursor nas propriedades do script. Nunca duplica, nunca apaga, nunca reescreve coluna que o SDR edita.
- O endereço do garçom e a CHAVE_PLANILHA moram nas propriedades do script, nunca no código. Nenhum dado pessoal nos registros do Apps Script.
- Uma função de instalação, para o Otávio rodar uma vez, que cria a aba, os cabeçalhos, a validação da lista fechada de status e o gatilho.
- Teste local em Node, com SpreadsheetApp, PropertiesService e UrlFetchApp de mentira.

## Etapa 25 · Ensaio geral local, ponta a ponta

O objetivo é amanhã não ter surpresa. Monte em nucleo/ferramentas/ensaio/ um ensaio que roda tudo junto, sem serviço real:

- Um Postgres local que roda dentro do Node (PGlite), com os papéis do Supabase criados de mentira (anon, authenticated, service_role). Aplica esquema.sql, aplica de novo para conferir que roda duas vezes, roda conferir.sql e confere as permissões de verdade: anon executa a gravação e nada mais; anon não lê tabela nem chama a função da planilha; service_role chama a função da planilha.
- Um Supabase de mentira que recebe /rest/v1/rpc/<função>, troca a chave de mentira pelo papel certo e executa no PGlite.
- O site montado e o garçom rodando localmente; o quiz preenchido num navegador sem tela (a mesma base da ferramenta de prints), com as respostas do exemplo do lead score (nota 96, faixa A) e com um caso eliminatório; conferir as linhas no banco local.
- A porta privada chamada pelo Apps Script de mentira; conferir as linhas na planilha de mentira; rodar de novo e conferir que não duplica.
- Casos de erro: chave publicável tentando ler tabela, chave da planilha errada, pacote sem consentimento, a mesma pessoa enviando duas vezes ao mesmo tempo.
- Se o ensaio achar erro numa etapa anterior, corrija lá (subindo a versão como manda a regra), rode tudo de novo e faça commit separado ("etapa 25 · correção · ...").
- Se o PGlite não suportar algo do esquema (por exemplo, trocar de papel), registre a limitação com precisão, contorne no ensaio sem mexer no esquema e diga exatamente o que só vai ser conferido no Supabase de verdade amanhã.
- Resultado do ensaio, conferência por conferência, no README do ensaio, e um comando só para rodar tudo de novo.

## Etapa 26 · Roteiro para ligar amanhã

entregas/prototipo-funil-01/LIGAR.md, para o Otávio, iniciante: português de gente, nenhum termo técnico sem explicação, uma ação por passo, cada passo com "como saber que deu certo" e o tempo estimado. Na ordem:

1. Push no GitHub Desktop, antes de tudo.
2. Supabase: rodar esquema.sql no editor SQL; rodar conferir.sql e comparar com o esperado; onde ficam a chave publicável e a chave secreta (ainda sem copiar).
3. Cloudflare: login do wrangler pelo terminal (o Otávio autoriza no navegador); publicar com o script; guardar os três segredos pelo painel da Cloudflare ou pelo comando de segredo, copiando cada valor direto do painel do Supabase, sem passar por arquivo nem chat; gerar a CHAVE_PLANILHA com um comando que não grava em arquivo.
4. Planilha: criar no Drive do Safra, colar o Apps Script, guardar as propriedades, rodar a instalação.
5. Teste com lead de mentira (decisão 4): fazer o quiz no celular e no computador; conferir a linha no Supabase e, em até 5 minutos, na planilha.
6. Se algo der errado: os três erros mais prováveis e o que fazer em cada um.
7. Como desligar tudo rápido: revogar chaves e tirar o protótipo do ar.

Atualize log.md e index.md.

## Etapa 27 · Decisões em uma página e fechamento

- prompts/08-decisoes-em-uma-pagina.md: todas as perguntas abertas para o Otávio (prompts/06-para-o-otavio.md, prompts/07-para-o-otavio.md e as novas desta fila), sem repetir as respondidas, em três tabelas: (1) trava o teste de amanhã; (2) trava ir ao ar com gente de verdade; (3) pode esperar. Cada linha: número, a pergunta em até 15 palavras e a recomendação em até 15 palavras. As que são dos sócios ficam fora, porque estão na pauta. No topo, a frase pronta para o Otávio responder em bloco: "Aceito todas as recomendações, menos: ...".
- Triagem das perguntas desta fila no formato de sempre (A forma, B já decidido, C para o Otávio, D para o Júnior e o Euclides); A e B aplicados; D na pauta.
- prompts/08-fila-da-madrugada-resposta.md: uma linha por etapa (feita ou incompleta, commits), o resultado do ensaio geral em três linhas, o resultado da varredura do histórico e o que o Otávio faz primeiro amanhã.
- Commit final.
