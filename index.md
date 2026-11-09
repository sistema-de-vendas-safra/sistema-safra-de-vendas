# Índice

Mapa do que existe no sistema. Atualizado a cada documento criado, renomeado ou removido.

## Raiz

- CLAUDE.md · regras da casa (regra 4 com a exceção da Regra de pausas numa fila, 4.8)
- index.md · este mapa
- log.md · histórico de alterações e pendências
- conexoes.md · contas e serviços, onde cada chave mora, quem lê e como revogar (sem valores): projeto do Supabase (#99), Worker do protótipo (#101), planilha do SDR (no Drive, exceção da regra 4 de segurança, 5.4), ManyChat como conta a criar, fora do MVP (#112)
- GLOSSARY.md · glossário do Safra, no formato da skill grill-with-docs (mattpocock-skills 1.3.1), com a linha _Fonte_; verbetes Call de Direcionamento, Prioridade da semana, Ponto de partida e Encerramento (v4, decidido)
- .githooks/pre-commit · gancho de pré-commit versionado que roda o detector de chaves (nucleo/ferramentas/detector-de-chaves/); num clone novo, ligar com `git config core.hooksPath .githooks`
- prompts/ · histórico do que foi pedido ao Claude Code e do que ele respondeu (02-plano-da-base.md e a resposta; 03-escrever-a-base.md e a resposta; 04-decisoes-de-08-11-e-lead-score.md e a resposta; 05-fila-de-trabalho.md, a lista de perguntas da fila 05-fila-perguntas.md e a resposta; 06-triagem-das-perguntas.md, a resposta 06-triagem-resposta.md e a lista 06-para-o-otavio.md; 07-fila-da-noite.md, as perguntas 07-fila-perguntas.md, a lista 07-para-o-otavio.md e a resposta 07-fila-da-noite-resposta.md; 08-fila-da-madrugada.md, as perguntas 08-fila-perguntas.md, a triagem 08-triagem.md, a página para o Otávio 08-decisoes-em-uma-pagina.md e a resposta 08-fila-da-madrugada-resposta.md; 09-acentos-do-quiz.md e a resposta 09-acentos-do-quiz-resposta.md; 10-prototipo-ligado.md e a resposta 10-prototipo-ligado-resposta.md; 11-decisoes-de-09-11.md, com as respostas do Otávio à página de decisões, a tabela 11-respostas.md e as perguntas 11-fila-perguntas.md)

## nucleo/

- regras/versionamento.md · cabeçalho padrão, status, forma e sentido, cascata; um documento só sai da marca quando nenhuma base dele estiver marcada (v3, decidido)
- regras/seguranca.md · contas, chave só no cofre do serviço, dado pessoal (com a exceção da planilha do SDR no Drive), detector de chaves (v3, decidido)
- modelos/ · vazio
- receitas/ · vazio
- ferramentas/README.md · o que mora na pasta de ferramentas
- ferramentas/prints/ · print.js (prints em 375 e 1440 pixels; --celular imita celular em 375) e testar-quiz-01.js (teste da página do quiz-01 num servidorzinho local, com o envio interceptado: exemplo 96 faixa a, eliminatório, consentimento, falha com reenvio, file:// sem envio, console sem dado de pessoa; 60 de 60)
- ferramentas/detector-de-chaves/ · detector de chaves em Node puro (detector.mjs, testar-detector.mjs, README.md): recusa o commit com chave, senha, token ou arquivo de segredos no que está preparado, sem repetir o valor; modos --rastreados e --historico; testes 87 de 87 (v1, rascunho; otavio: pendente; desatualizado)
- ferramentas/prototipo/ · só package.json com o wrangler 4.158.0 como dependência de desenvolvimento, para o dry-run do Worker do protótipo (entregas/prototipo-funil-01/), sem publicar e sem login
- ferramentas/ensaio/ · ensaio geral do protótipo do funil-01, ponta a ponta, sem serviço real (ensaio.mjs, supabase-de-mentira.mjs, planilha-no-ensaio.mjs, package.json com `npm run ensaio`, README.md): PGlite com os papéis do Supabase de mentira, esquema duas vezes, conferir.sql 13 de 13, permissões por SET ROLE, Supabase de mentira em 127.0.0.1, garçom no wrangler dev --local, catálogo, quiz no navegador sem tela pela landing (96 faixa A e eliminatório), planilha do SDR com o Google de mentira, casos de erro, charset utf-8 e acentos do consentimento; 96 de 96 (v2, rascunho; otavio: pendente; desatualizado)

## fontes/ (somente leitura)

- acervo-2026-11-08/safra-acervo/ · acervo do projeto em 08/11/2026 (98 arquivos)
- safra-acervo.zip · o zip original do acervo, guardado como reserva
- design-system-v1.0/ · design system 1.0.0 baixado em 08/11/2026 (origem no LEIA.md)
- quiz-01-repositorio-2026-11-08/ · cópia do repositório do quiz-01 em 08/11/2026 (CLAUDE.md, manual do diagnóstico, REA, mockup); vale sobre o artefato do acervo (origem no LEIA.md)

## base/

- ficha-de-fatos.md · todos os fatos (preço, vagas, prazos, entregas, Análise, Call de Direcionamento, bônus, prazo de guarda, reels, credenciais, nomes), cada campo com status; campos em conflito bloqueados para entrega (v4, decidido)
- decisoes.md · registro das decisões #1 a #115, cada uma com o seu status; as de 09/11 e as que continuam abertas (v5, decidido)
- lacunas.md · lacunas do CTX §10 e conflitos, com quem decide e o que destrava (v6, rascunho)
- produto.md · o que é a IASV Safra: formato, ritos, quem faz o quê, o que não está incluído (v4, decidido)
- metodo.md · o Sistema de Vendas Safra e a Gestão de Leads por Safra, com as regras do método (v4, decidido)
- mecanismo.md · problema, solução, Big Idea, analogia e crença; a demonstração com os números do prospect fica na Call de Direcionamento (v2, aprovado; frase filosófica pendente)
- oferta.md · a oferta montada, citando os valores pela ficha; a Análise é o diagnóstico do quiz e a conversa de venda é a Call de Direcionamento (v2, pendente-aprovacao do Júnior e do Euclides)
- promessa.md · a promessa de 08/11 nas duas versões, que vale por decisão do Otávio (#108), e a de 23/10 como histórico; conflito de "todo o dinheiro" e "uma vírgula no seu marketing" bloqueado para ir ao ar (v4, decidido)
- entregas-do-servico.md · as entregas com nome oficial, o que cada uma é e o critério de pronto (v4, decidido)
- persona.md · Rafa, o Dono-Closer: dores, ganhos, crenças, citações com ID e grau de evidência (v4, decidido)
- tom-de-voz.md · voz, grafia, vocabulário, o que nunca dizer, frases gastas; falas de quem liga no tom da casa (v4, pendente-aprovacao do Júnior)
- provas-e-conformidade.md · provas que existem, [PROVA REAL] do que falta, regras de CDC, CONAR, LGPD e Código Civil, exceções decididas pelo Otávio; revisão jurídica fora do sistema (v4, decidido)
- design-system/design-system.md · ficha do design system v1.0, que aponta para fontes/ e registra os conflitos, as divergências decididas e o que vale seja qual for o design (v4, rascunho)
- lead-score.md · nota de 0 a 100 e faixas A, B e C para a fila do SDR; preço do dia da resposta, casos de borda do dinheiro na mesa e corte mais restritivo até a reunião (v3, pendente-aprovacao do Júnior e do Euclides)

## funis/

- funil-01/funil.md · caminho do lead e do dado, porta de qualificação pelo lead score, Call de Direcionamento, caixa de aceite única, status do SDR com nutrição, metas, origens e links (UTMs; reels com a ferramenta da ficha, fora do MVP) e contador de escassez (v3, pendente-aprovacao: otavio 2026-11-09; junior e euclides: pendente, com a #90)
- funil-01/planilha-sdr.md · planilha do SDR: 20 colunas (com clique_fim_quiz e produto), o que o SDR edita, dado pessoal, lista fechada de status com nutrição, ordem da fila pelo lead score, o que volta para o banco; no Drive do Safra como exceção da regra 4; destino em conflito (conflito-17) (v2, pendente-aprovacao: otavio 2026-11-09; junior e euclides: pendente; desatualizado)
- funil-01/roteiros-sdr.md · roteiros do SDR: primeiro contato das faixas A e B (ligação primeiro, WhatsApp no mesmo dia), Call de Direcionamento, abertura para quem pediu a conversa, respostas comuns, tentativas até o abandono (número e intervalo a definir), fala para quem caiu nos eliminatórios (conflito-16) (v2, pendente-aprovacao: otavio 2026-11-09; junior e euclides: pendente; desatualizado)

## entregas/

- landings/landing-page-01/briefing.md · briefing da landing-page-01: básico, estrutura de partida pelo wireframe corrigida pelo registro e pelas respostas de 09/11 (dois topos sem teste ligado, Call de Direcionamento, meta só depois da amostra mínima), direcionamentos de copy, UX e design, bloqueios (v4, rascunho; desatualizado: depende da pauta)
- landings/landing-page-01/copy.md · copy da landing-page-01, seção por seção, com fatos por {{ficha-de-fatos#campo}} e bloqueios marcados; dois topos com as promessas do projeto anterior (#108), Call de Direcionamento no passo 3 da 08 (#107) (v4, rascunho; otavio, junior e euclides: pendente; desatualizado)
- landings/landing-page-01/estrutura.md · estrutura UX da landing-page-01: ordem (Hero A oculto até a 10.14), hierarquia, primeira tela no celular, botões, caminho até o quiz com visita e início do quiz (18.5, 10.6), entrega landing-page-01 no catálogo (10.15), carregamento e erro, acessibilidade WCAG 2.2 AA; sem estilo, design bloqueado (v4, rascunho; desatualizado)
- landings/landing-page-01/variante-a-design-system-v1/ · landing-page-01 com o visual do design system v1.0 (index.html, estilo.css, tokens.css copiado das fontes, README.md); mesmo texto e mesma marcação da variante B, para a escolha na reunião; o botão da 08 leva ao quiz com as utm do endereço (v2, rascunho; otavio, junior e euclides: pendente; desatualizado)
- landings/landing-page-01/variante-b-branco-e-verde/ · landing-page-01 com a paleta branco e verde (#81) e os botões laranja de 03/11 (index.html, estilo.css, README.md); mesmo texto e mesma marcação da variante A; o botão da 08 leva ao quiz com as utm do endereço (v2, rascunho; otavio, junior e euclides: pendente; desatualizado)
- landings/landing-page-01/prints/ · prints das duas variantes em 375 e 1440 pixels (variante-a-375.png, variante-a-1440.png, variante-b-375.png, variante-b-1440.png)
- quizzes/quiz-01/briefing.md · briefing do quiz-01: básico, o que da cópia nova do quiz vale como fonte, conflitos, roteiro de telas, finais pelos dois critérios (o mais restritivo até a reunião, 14.2), exceção do quiz como está (#110), bloqueios e o que a etapa 34 aplica na página (v2, rascunho; otavio, junior e euclides: pendente; desatualizado)
- quizzes/quiz-01/copy.md · copy do quiz-01 tela por tela, com as perguntas do lead score, a caixa de aceite única já marcada (#104), a promessa de percentual mantida por exceção (#110) e a tabela das mudanças no texto do Júnior (v2, rascunho; otavio, junior e euclides: pendente; desatualizado)
- quizzes/quiz-01/pagina/ · página do quiz-01 (index.html, poster-junior.jpg, README.md): mockup do Júnior com o texto da copy, lead score num lugar só, pacote no formato da planta, enviado por POST ao garçom em /api/fim-quiz (aviso de falha com "Tentar de novo"; aberta do arquivo, não envia; nada no console), consentimento obrigatório; visual sem mudança (v2, rascunho; otavio, junior e euclides: pendente; desatualizado)
- quizzes/quiz-01/prints/ · prints da página do quiz-01 em 375 e 1440 pixels (capa, pergunta, contato com e sem consentimento, resultado A, resultado eliminatório, envio que falhou)
- documentos/README.md · o que mora na pasta de documentos
- garcom/ · garçom do funil-01 dentro do Worker único do protótipo, safra-prototipo-funil-01 (#101), sem dependências (garcom.mjs, README.md): rotas /api/ antes dos arquivos, que vêm pelo binding ASSETS; noindex em toda resposta; charset utf-8 em HTML, CSS e JavaScript que chegam sem charset; porta pública POST /api/fim-quiz confere método, origem (mesma origem), tamanho, formato, etiquetas, telefone e consentimento, grava vazia a utm fora da lista (5.5) e grava por registrar_fim_quiz com a chave publicável; porta privada GET /api/planilha/leads-novos só com a CHAVE_PLANILHA (tempo constante), cursor e limite até 200, lê por leads_para_planilha com a chave secreta (#100); teste/testar-garcom.mjs com fetch e ASSETS falsos, 133 de 133; destino em conflito (conflito-17); v2 publicada no protótipo em 09/11/2026, v3 ainda não (v3, rascunho; otavio: pendente; desatualizado)
- prototipo-funil-01/ · site de teste do funil-01 num Worker só, safra-prototipo-funil-01 (#101): wrangler.toml (main ../garcom/garcom.mjs, assets em site/ com ASSETS e run_worker_first, preview_urls false, SUPABASE_URL e ORIGEM_PERMITIDA em vars, segredos só pelo nome, sem account_id), montar-site.mjs (variante A em /, B em /b/, quiz em /quiz/, meta charset na primeira linha, meta noindex e viewport, link da landing para /quiz/; site/ fora do Git), prints/ das três páginas montadas, README.md com o mapa de rotas e o dry-run e LIGAR.md, o roteiro do Otávio para ligar o protótipo (push, Supabase, Cloudflare, planilha, teste com leads de mentira, erros prováveis e como desligar; cerca de 58 minutos; id prototipo-funil-01-ligar, v4, rascunho; otavio: pendente; desatualizado); protótipo de teste não é entrega (conflito-17); publicado pela primeira vez em 09/11/2026; ligado e testado em 09/11/2026 (Supabase, Worker, segredos e planilha do SDR de teste; testes A, B e C certos) (v3, rascunho; otavio: pendente; desatualizado)
- planilha-sdr-funil-01/ · planilha do SDR do funil-01 em Apps Script (Codigo.gs, appsscript.json, teste/, README.md): instalar() cria a aba fila com as 19 colunas de planilha-sdr, lista fechada em estagio, estado e canal e um gatilho de 5 minutos; buscarLeadsNovos() pede os leads novos à porta privada do garçom com a CHAVE_PLANILHA das propriedades do script e acrescenta linhas no fim, sem duplicar nem tocar nas colunas do SDR; sem volta do status; só dados de teste até a decisão de onde a planilha mora (5.4; 24.1); teste local 54 de 54; rodado no Google em 09/11/2026 na planilha "TESTE planilha do SDR funil-01", só com leads de teste (v1, rascunho; otavio: pendente; desatualizado)
- documentos/politica-de-privacidade.md · política de privacidade do funil-01: o que a landing e o quiz coletam, finalidades, caixa de aceite única (WhatsApp, mensagem e ligação, e e-mail), quem acessa (planilha do SDR como exceção da regra 4), operadores (lista bloqueada, conflito-17), cookies e medição sem ferramenta de terceiros, prazo de guarda pela ficha (#106), direitos do art. 18 e como pedir; revisão jurídica fica com a empresa que assina a política, fora do sistema (#103) (v2, rascunho; otavio, junior e euclides: pendente; desatualizado)
- emails/ · vazio
- pautas/README.md · para que serve a pasta de pautas
- pautas/pauta-aprovacao-01.md · pauta de aprovação para o Júnior e o Euclides, ordenada pelo que trava o funil-01; v7 com as respostas do Otávio de 09/11: funil aprovado por ele (item 1), quiz como está (3 e 4), promessa para confirmar (5), Call de Direcionamento para informar (7), revisão jurídica fora do sistema (11) (v7, rascunho; otavio: pendente; desatualizado)

## dados/

- planta/planta.md · planta do banco: gavetas pessoas, eventos, entregas e investimento (fora do MVP), etiquetas obrigatórias (vazia conta), caixa de aceite única nos dois campos, visita, início e clique no fim do quiz, nutrição e produto, contagem das análises gratuitas, quem grava e quem lê, prazo de guarda pela ficha e caminho de apagamento pendente; o banco e o garçom alcançam esse desenho nas etapas 32 e 33 (v4, rascunho; otavio: pendente)
- banco/ · banco no Supabase, projeto sistema-de-vendas-safra (esquema.sql, conferir.sql, catalogo-prototipo.sql e README.md): as quatro gavetas da planta (investimento fora do MVP), listas fechadas como CHECK, etiquetas NOT NULL, eventos sem apagar nem reescrever, telefone e e-mail únicos, nenhuma permissão padrão (#99), anon só executa registrar_fim_quiz e service_role só executa leads_para_planilha (#100), funções SECURITY DEFINER com search_path vazio, visões do painel sem leitor; conferir.sql confere tudo só lendo o catálogo; catalogo-prototipo.sql grava só a linha (quiz-01, 1) do catálogo de entregas, sem duplicar, para o teste (v1, rascunho); conferido numa cópia local (PGlite), ainda não executado no Supabase; destino em conflito (conflito-17) (v2, rascunho; otavio: pendente; desatualizado)
- paineis/ · vazio

## aprendizados/

- Nenhuma ficha ainda.
