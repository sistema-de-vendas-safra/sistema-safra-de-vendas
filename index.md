# Índice

Mapa do que existe no sistema. Atualizado a cada documento criado, renomeado ou removido.

## Raiz

- CLAUDE.md · regras da casa
- index.md · este mapa
- log.md · histórico de alterações e pendências
- conexoes.md · contas e serviços, onde cada chave mora, quem lê e como revogar (sem valores): projeto do Supabase (#99), Worker do protótipo (#101), planilha do SDR
- GLOSSARY.md · glossário do Safra, no formato da skill grill-with-docs (mattpocock-skills 1.3.1), com a linha _Fonte_ (v3, decidido; desatualizado)
- .githooks/pre-commit · gancho de pré-commit versionado que roda o detector de chaves (nucleo/ferramentas/detector-de-chaves/); num clone novo, ligar com `git config core.hooksPath .githooks`
- prompts/ · histórico do que foi pedido ao Claude Code e do que ele respondeu (02-plano-da-base.md e a resposta; 03-escrever-a-base.md e a resposta; 04-decisoes-de-08-11-e-lead-score.md e a resposta; 05-fila-de-trabalho.md, a lista de perguntas da fila 05-fila-perguntas.md e a resposta)

## nucleo/

- regras/versionamento.md · cabeçalho padrão, status, forma e sentido, cascata (v2, decidido)
- regras/seguranca.md · contas, chaves, dado pessoal, detector de chaves (v2, decidido)
- modelos/ · vazio
- receitas/ · vazio
- ferramentas/README.md · o que mora na pasta de ferramentas
- ferramentas/prints/ · print.js (prints em 375 e 1440 pixels; --celular imita celular em 375) e testar-quiz-01.js (teste da página do quiz-01 num servidorzinho local, com o envio interceptado: exemplo 96 faixa a, eliminatório, consentimento, falha com reenvio, file:// sem envio, console sem dado de pessoa; 60 de 60)
- ferramentas/detector-de-chaves/ · detector de chaves em Node puro (detector.mjs, testar-detector.mjs, README.md): recusa o commit com chave, senha, token ou arquivo de segredos no que está preparado, sem repetir o valor; modos --rastreados e --historico; testes 87 de 87 (v1, rascunho; otavio: pendente)
- ferramentas/prototipo/ · só package.json com o wrangler 4.158.0 como dependência de desenvolvimento, para o dry-run do Worker do protótipo (entregas/prototipo-funil-01/), sem publicar e sem login
- ferramentas/ensaio/ · ensaio geral do protótipo do funil-01, ponta a ponta, sem serviço real (ensaio.mjs, supabase-de-mentira.mjs, planilha-no-ensaio.mjs, package.json com `npm run ensaio`, README.md): PGlite com os papéis do Supabase de mentira, esquema duas vezes, conferir.sql 13 de 13, permissões por SET ROLE, Supabase de mentira em 127.0.0.1, garçom no wrangler dev --local, catálogo, quiz no navegador sem tela pela landing (96 faixa A e eliminatório), planilha do SDR com o Google de mentira, casos de erro; 88 de 88 (v1, rascunho; otavio: pendente; desatualizado)

## fontes/ (somente leitura)

- acervo-2026-11-08/safra-acervo/ · acervo do projeto em 08/11/2026 (98 arquivos)
- safra-acervo.zip · o zip original do acervo, guardado como reserva
- design-system-v1.0/ · design system 1.0.0 baixado em 08/11/2026 (origem no LEIA.md)
- quiz-01-repositorio-2026-11-08/ · cópia do repositório do quiz-01 em 08/11/2026 (CLAUDE.md, manual do diagnóstico, REA, mockup); vale sobre o artefato do acervo (origem no LEIA.md)

## base/

- ficha-de-fatos.md · todos os fatos (preço, vagas, prazos, entregas, Análise, bônus, credenciais, nomes), cada campo com status; campos em conflito bloqueados para entrega (v3, decidido)
- decisoes.md · registro das decisões #1 a #102, cada uma com o seu status (v4, decidido)
- lacunas.md · lacunas do CTX §10 e conflitos, com quem decide e o que destrava (v5, rascunho; desatualizado: aponta para decisoes 3)
- produto.md · o que é a IASV Safra: formato, ritos, quem faz o quê, o que não está incluído (v3, decidido; desatualizado)
- metodo.md · o Sistema de Vendas Safra e a Gestão de Leads por Safra, com as regras do método (v3, decidido; desatualizado)
- mecanismo.md · problema, solução, Big Idea, analogia e crença (v1, aprovado; frase filosófica pendente; desatualizado: o papel da Análise muda pela #92)
- oferta.md · a oferta montada, citando os valores pela ficha (v1, pendente-aprovacao do Júnior e do Euclides; desatualizado: #92)
- promessa.md · a promessa de 08/11 nas duas versões e a de 23/10 como histórico (v3, pendente-aprovacao do Júnior e do Euclides; desatualizado)
- entregas-do-servico.md · as entregas com nome oficial, o que cada uma é e o critério de pronto (v3, decidido; desatualizado)
- persona.md · Rafa, o Dono-Closer: dores, ganhos, crenças, citações com ID e grau de evidência (v3, decidido; desatualizado)
- tom-de-voz.md · voz, grafia, vocabulário, o que nunca dizer, frases gastas (v3, pendente-aprovacao do Júnior; desatualizado)
- provas-e-conformidade.md · provas que existem, [PROVA REAL] do que falta, regras de CDC, CONAR, LGPD e Código Civil (v3, decidido; desatualizado)
- design-system/design-system.md · ficha do design system v1.0, que aponta para fontes/ e registra os conflitos e as divergências decididas (v3, rascunho; desatualizado)
- lead-score.md · nota de 0 a 100 e faixas A, B e C para a fila do SDR (v2, pendente-aprovacao do Júnior e do Euclides; desatualizado)

## funis/

- funil-01/funil.md · caminho do lead e do dado, porta de qualificação pelo lead score, status do SDR, metas, origens e links (UTMs) e contador de escassez (v2, pendente-aprovacao: depende da #90; desatualizado)
- funil-01/planilha-sdr.md · planilha do SDR: colunas (quem preenche, o que o SDR edita, dado pessoal), lista fechada de status, ordem da fila pelo lead score, o que volta para o banco; destino em conflito (conflito-17) (v1, rascunho; otavio, junior e euclides: pendente; desatualizado)
- funil-01/roteiros-sdr.md · roteiros do SDR: primeiro contato das faixas A e B por ligação e WhatsApp, respostas comuns, tentativas até o abandono (número e intervalo a definir), fala para quem caiu nos eliminatórios (conflito-16) (v1, rascunho; otavio, junior e euclides: pendente; desatualizado)

## entregas/

- landings/landing-page-01/briefing.md · briefing da landing-page-01: básico, estrutura de partida pelo wireframe corrigido, direcionamentos de copy, UX e design, bloqueios (v3, rascunho; desatualizado)
- landings/landing-page-01/copy.md · copy da landing-page-01, seção por seção, com fatos por {{ficha-de-fatos#campo}} e bloqueios marcados (v3, rascunho; otavio, junior e euclides: pendente; desatualizado)
- landings/landing-page-01/estrutura.md · estrutura UX da landing-page-01: ordem, hierarquia, primeira tela no celular, botões, caminho até o quiz, carregamento e erro, acessibilidade; sem estilo, design bloqueado (v3, rascunho; desatualizado)
- landings/landing-page-01/variante-a-design-system-v1/ · landing-page-01 com o visual do design system v1.0 (index.html, estilo.css, tokens.css copiado das fontes, README.md); mesmo texto e mesma marcação da variante B, para a escolha na reunião; o botão da 08 leva ao quiz com as utm do endereço (v2, rascunho; otavio, junior e euclides: pendente; desatualizado)
- landings/landing-page-01/variante-b-branco-e-verde/ · landing-page-01 com a paleta branco e verde (#81) e os botões laranja de 03/11 (index.html, estilo.css, README.md); mesmo texto e mesma marcação da variante A; o botão da 08 leva ao quiz com as utm do endereço (v2, rascunho; otavio, junior e euclides: pendente; desatualizado)
- landings/landing-page-01/prints/ · prints das duas variantes em 375 e 1440 pixels (variante-a-375.png, variante-a-1440.png, variante-b-375.png, variante-b-1440.png)
- quizzes/quiz-01/briefing.md · briefing do quiz-01: básico, o que da cópia nova do quiz vale como fonte, conflitos, roteiro de telas, finais pelos dois critérios, bloqueios (v1, rascunho; otavio, junior e euclides: pendente; desatualizado)
- quizzes/quiz-01/copy.md · copy do quiz-01 tela por tela, com as perguntas do lead score, o consentimento e a tabela das mudanças no texto do Júnior (v1, rascunho; otavio, junior e euclides: pendente; desatualizado)
- quizzes/quiz-01/pagina/ · página do quiz-01 (index.html, poster-junior.jpg, README.md): mockup do Júnior com o texto da copy, lead score num lugar só, pacote no formato da planta, enviado por POST ao garçom em /api/fim-quiz (aviso de falha com "Tentar de novo"; aberta do arquivo, não envia; nada no console), consentimento obrigatório; visual sem mudança (v2, rascunho; otavio, junior e euclides: pendente; desatualizado)
- quizzes/quiz-01/prints/ · prints da página do quiz-01 em 375 e 1440 pixels (capa, pergunta, contato com e sem consentimento, resultado A, resultado eliminatório, envio que falhou)
- documentos/README.md · o que mora na pasta de documentos
- garcom/ · garçom do funil-01 dentro do Worker único do protótipo, safra-prototipo-funil-01 (#101), sem dependências (garcom.mjs, wrangler.toml.exemplo só como lista do que a configuração da etapa 23 precisa ter, README.md): rotas /api/ antes dos arquivos, que vêm pelo binding ASSETS; noindex em toda resposta; porta pública POST /api/fim-quiz confere método, origem (mesma origem), tamanho, formato, etiquetas, telefone e consentimento, grava vazia a utm fora da lista (5.5) e grava por registrar_fim_quiz com a chave publicável; porta privada GET /api/planilha/leads-novos só com a CHAVE_PLANILHA (tempo constante), cursor e limite até 200, lê por leads_para_planilha com a chave secreta (#100); teste/testar-garcom.mjs com fetch e ASSETS falsos, 121 de 121; destino em conflito (conflito-17); nunca publicado (v2, rascunho; otavio: pendente; desatualizado)
- prototipo-funil-01/ · site de teste do funil-01 num Worker só, safra-prototipo-funil-01 (#101): wrangler.toml (main ../garcom/garcom.mjs, assets em site/ com ASSETS e run_worker_first, preview_urls false, SUPABASE_URL e ORIGEM_PERMITIDA em vars, segredos só pelo nome, sem account_id), montar-site.mjs (variante A em /, B em /b/, quiz em /quiz/, meta noindex e viewport, link da landing para /quiz/; site/ fora do Git), prints/ das três páginas montadas e README.md com o mapa de rotas e o dry-run; protótipo de teste não é entrega (conflito-17); nunca publicado (v1, rascunho; otavio: pendente; desatualizado)
- planilha-sdr-funil-01/ · planilha do SDR do funil-01 em Apps Script (Codigo.gs, appsscript.json, teste/, README.md): instalar() cria a aba fila com as 19 colunas de planilha-sdr, lista fechada em estagio, estado e canal e um gatilho de 5 minutos; buscarLeadsNovos() pede os leads novos à porta privada do garçom com a CHAVE_PLANILHA das propriedades do script e acrescenta linhas no fim, sem duplicar nem tocar nas colunas do SDR; sem volta do status; só dados de teste até a decisão de onde a planilha mora (5.4; 24.1); teste local 54 de 54; nunca rodado no Google (v1, rascunho; otavio: pendente; desatualizado)
- documentos/politica-de-privacidade.md · política de privacidade do funil-01: o que a landing e o quiz coletam, finalidades, consentimento, quem acessa, operadores (lista bloqueada, conflito-17), cookies e medição, prazo de guarda a definir (outros-23), direitos do art. 18 e como pedir; precisa de revisão de advogado (v1, rascunho; otavio, junior e euclides: pendente; desatualizado)
- emails/ · vazio
- pautas/README.md · para que serve a pasta de pautas
- pautas/pauta-aprovacao-01.md · pauta de aprovação para o Júnior e o Euclides, ordenada pelo que trava o funil-01 (v5, acréscimos da triagem da etapa 19; item 6a para escolher a variante da página; rascunho; desatualizado)

## dados/

- planta/planta.md · planta do banco: gavetas pessoas, eventos, entregas e investimento (fora do MVP), etiquetas obrigatórias, contagem das análises gratuitas, quem grava e quem lê, com as duas chaves do garçom, uma por porta (#100) (v3, rascunho; desatualizado)
- banco/ · banco no Supabase, projeto sistema-de-vendas-safra (esquema.sql, conferir.sql, catalogo-prototipo.sql e README.md): as quatro gavetas da planta (investimento fora do MVP), listas fechadas como CHECK, etiquetas NOT NULL, eventos sem apagar nem reescrever, telefone e e-mail únicos, nenhuma permissão padrão (#99), anon só executa registrar_fim_quiz e service_role só executa leads_para_planilha (#100), funções SECURITY DEFINER com search_path vazio, visões do painel sem leitor; conferir.sql confere tudo só lendo o catálogo; catalogo-prototipo.sql grava só a linha (quiz-01, 1) do catálogo de entregas, sem duplicar, para o teste (v1, rascunho); conferido numa cópia local (PGlite), ainda não executado no Supabase; destino em conflito (conflito-17) (v2, rascunho; otavio: pendente; desatualizado)
- paineis/ · vazio

## aprendizados/

- Nenhuma ficha ainda.
