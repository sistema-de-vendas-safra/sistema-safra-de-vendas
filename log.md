# Log

Toda alteração na base sobe a versão e ganha uma linha aqui, com o motivo. Entradas mais novas no topo.

## 2026-11-08 · etapa 19 · fechamento da noite

- Pendência nova: repositório do quiz-01 na conta pessoal otavio-gif, com publicação automática na Cloudflare (ver Pendências).
- conexoes.md: a conta da Cloudflare do Safra já existe (o endereço do quiz usa o subdomínio sistemadevendassafra); verificação em duas etapas a confirmar.

## 2026-11-08 · etapa 18 · banco e garcom

- dados/banco/README.md v1 (id banco-rascunho), rascunho (otavio: pendente). Novo. O que é, o que o esquema faz, as fechaduras e o que falta para funcionar (conta no Supabase, detector de chaves, chave de serviço no cofre, decisão do conflito-17, prazo de guarda, aprovação). Destino dos contatos com os dois lados do conflito-17, bloqueado; segue o lado 2, como a planta e o funil-01. Nasce desatualizado (regra provisória 11.1).
- dados/banco/esquema.sql: novo. Postgres para o Supabase, nunca executado. Tabelas pessoas, eventos, entregas e investimento (fora do MVP) com os nomes da planta v2; listas fechadas como CHECK; etiquetas obrigatórias NOT NULL; regras da planta como restrição (consentimento, fim do quiz completo, stand-by com data_volta, venda e perda, catálogo por chave estrangeira, quem grava cada tipo); trava que não deixa apagar nem reescrever evento; função registrar_fim_quiz (pessoa repetida reconhecida pelo banco); visão painel_numeros só agregada; visão contagem_analises_gratuitas, com o total e o limite só por referência à ficha (ficha-de-fatos#analises-gratuitas, ficha-de-fatos#barra-de-resgates) e a regra de 5.7 em aberto; RLS ligada nas quatro tabelas sem nenhuma política, permissões de anon e authenticated retiradas, só o papel de serviço executa a função de gravação. Evento interesse_pos_relatorio só como bloco comentado, proposta (14.15; 16.13).
- entregas/garcom/ v1 (id garcom), rascunho (otavio: pendente). Novo. garcom.mjs: Cloudflare Worker sem dependências; CORS só para env.ORIGEM_PERMITIDA; só POST, só JSON, até 16 KB, só os campos da planta; etiquetas obrigatórias e utm da lista fechada do funil-01; só fim_quiz (interesse_pos_relatorio preparado como proposta, fora da lista); consentimento obrigatório com texto e data; grava pela API REST do Supabase com env.SUPABASE_URL e env.SUPABASE_SERVICE_KEY (só os nomes); respostas sem detalhe interno; registro sem dado pessoal. wrangler.toml.exemplo só com nomes de variáveis, sem identificador de conta. README.md com o que faz, os segredos por nome, o que falta e como testar. Nasce desatualizado (11.1).
- entregas/garcom/teste/testar-garcom.mjs: novo. Importa o handler, usa o pacote do exemplo do README do quiz-01 e casos inválidos (sem consentimento, consentimento sem texto ou sem data, etiqueta faltando, utm fora da lista, meta-ads, funil fora da lista, tipo proposto, campo a mais, método, origem, tamanho, JSON, banco recusando ou fora, cofre vazio), com um fetch falso num domínio .invalid. Passou: 26 de 26 (30 de 30 depois da revisão). Saída colada no README. Nada foi executado contra serviço real.
- index.md: dados/banco/ e entregas/garcom/.
- Perguntas 18.1 a 18.10 em prompts/07-fila-perguntas.md.
- Revisão da etapa 18: garcom.mjs alinhado à planta (5.5): utm fora da lista não recusa mais o pacote, é gravada vazia e o registro anota só o nome do campo (função esvaziarUtmForaDaLista); utm que não é texto recusa. Teste ajustado (utm fora da lista gravada vazia; utm que não é texto recusada): 30 de 30, saída nova no README do garçom. Pergunta 18.7 reescrita. Ainda v1 e rascunho, nunca publicado.

## 2026-11-08 · etapa 17 · landing-page-01 variantes de design

- entregas/landings/landing-page-01/variante-a-design-system-v1/ v1 (id landing-page-01-variante-a), rascunho (otavio, junior e euclides: pendente). Novo. index.html com o texto de landing-page-01-copy v3 na ordem de landing-page-01-estrutura v3, fatos como estão na ficha v3 (cada um marcado com o campo), campos bloqueados, [PENDENTE] e [PROVA REAL] como etiqueta tracejada "a definir", seções ocultas só como comentário, imagens como bloco cinza com descrição; botões para #destino e, na 08, para a página do quiz-01 por link relativo, com etiquetas e código de sessão sem guardar nada no navegador. Visual pelos tokens do design system v1.0: tokens.css é cópia de fontes/design-system-v1.0/safra-tokens.css com o travessão do comentário trocado por ponto médio (fontes/ não foi alterado). README.md com o mesmo cabeçalho do comentário do index.html. Nasce desatualizado (regra provisória 11.1).
- entregas/landings/landing-page-01/variante-b-branco-e-verde/ v1 (id landing-page-01-variante-b), rascunho (otavio, junior e euclides: pendente). Novo. O mesmo `<body>` da variante A (conferido com diff: idêntico); só o `<head>` e o CSS mudam. Paleta branco e verde (#81) e botões laranja #FF8400 de 03/11, com o que safra-landing.md registra; os tons de verde não registrados foram escolhidos (17.3). Nasce desatualizado (11.1).
- Nenhuma fonte de letra de fora nas duas: a Geist não está em fontes/design-system-v1.0/, e as páginas caem na letra do sistema (17.4).
- entregas/landings/landing-page-01/prints/: variante-a-375.png, variante-a-1440.png, variante-b-375.png, variante-b-1440.png (nucleo/ferramentas/prints/print.js). Corrigido depois do primeiro print: a tabela do funil de exemplo passava da largura de 375 na variante A.
- entregas/pautas/pauta-aprovacao-01.md v3 para v4, rascunho (otavio: pendente). Motivo: item 6a novo, logo depois do item 6 (design), para escolher a variante, apontando para os prints; depende_de ganha as duas variantes; nota para o Otávio. Sentido. Continua desatualizado (4.5). Dependentes da pauta (briefing da landing-page-01 e briefing do quiz-01) já estavam marcados.
- index.md: as duas variantes, os prints e a pauta v4.
- Revisão da etapa 17: o grafismo do hero da variante B passou a aparecer só a partir de 1200 px, com largura limitada e sem corte na borda (em 1024 px ficava por baixo do título); prints da B refeitos. Pauta v4, item 6a: avisa que os prints da A mostram a letra do computador, não a Geist.
- Perguntas 17.1 a 17.8 em prompts/07-fila-perguntas.md.

## 2026-11-08 · etapa 16 · politica de privacidade

- entregas/documentos/politica-de-privacidade.md v1 (id politica-de-privacidade), rascunho (otavio, junior e euclides: pendente). Novo. No topo: "Precisa de revisão de advogado antes de ir ao ar." O que a landing e o quiz coletam (campos da planta), finalidades, consentimento por canal como base legal, nota automática (art. 20), onde fica e quem acessa, operadores por categoria com a lista bloqueada (conflito-17), cookies e medição, segurança, direitos do art. 18 e como pedir. Empresa, CNPJ, encarregado, contato, nomes dos serviços e prazo de guarda (outros-23) ficam {{a definir}}. Nasce desatualizado (16.11).
- entregas/documentos/README.md: novo, o que mora na pasta.
- Quiz-01 sem mudança: o link da política continua {{a definir}} até a política ter endereço (16.1).
- index.md: a pasta documentos/ e os dois arquivos.
- Perguntas 16.1 a 16.12 em prompts/07-fila-perguntas.md (16.12 do revisor: ligação no número de WhatsApp).

## 2026-11-08 · etapa 15 · sdr planilha e roteiros

- funis/funil-01/planilha-sdr.md v1 (id funil-01-planilha-sdr), rascunho (otavio, junior e euclides: pendente). Novo. Colunas com o que guardam, quem preenche, se o SDR edita e se são dado pessoal (lista da planta, mais entrou_em e tentativas_feitas como proposta, 15.3); lista fechada de status igual à do funil-01, com a grafia do banco; ordem da fila pelo lead score; eventos que voltam para o banco; exemplo fictício marcado. Destino dos contatos com os dois lados do conflito-17, bloqueado. Nasce desatualizado (15.15).
- funis/funil-01/roteiros-sdr.md v1 (id funil-01-roteiros-sdr), rascunho (otavio, junior e euclides: pendente). Novo. Voz e vocabulário público do tom-de-voz; primeiro contato da faixa A e da faixa B por ligação e por WhatsApp; respostas às situações comuns; tentativas até o abandono com número e intervalo {{a definir}} (ficha-de-fatos#tentativas-ate-abandonado é da operação do Júnior, 5.3); fala para quem caiu nos eliminatórios com os dois lados do conflito-16, bloqueado. Nenhum preço, prazo ou número copiado da ficha; nenhuma promessa de resultado. Nasce desatualizado (15.15).
- index.md: os dois documentos em funis/funil-01/.
- Perguntas 15.1 a 15.16 em prompts/07-fila-perguntas.md.

## 2026-11-08 · etapa 14 · quiz-01 codigo

- entregas/quizzes/quiz-01/pagina/index.html v1 (id quiz-01-pagina), rascunho (otavio, junior e euclides: pendente). Novo. Cópia de fontes/quiz-01-repositorio-2026-11-08/mockups/quiz-diagnostico.html (fontes/ não foi alterado) com o texto da copy (M1 a M30) e a lógica da etapa: objeto FATOS com os campos da ficha (bloqueados como aviso "a definir"; metas do texto derivadas do campo, 13.13), objeto LEAD_SCORE com pontos, faixas e eliminatórios de lead-score v2, pacote do fim do quiz no formato da planta v2 com etiquetas e utm lidas do endereço, enviarPacote só no console (nenhum endereço externo, nenhuma chave) e consentimento obrigatório. Visual sem mudança (conflito-18): o CSS só perdeu travessões em comentários. Cabeçalho num comentário no topo. Nasce desatualizado (14.13).
- entregas/quizzes/quiz-01/pagina/poster-junior.jpg: cópia da foto do mockup. entregas/quizzes/quiz-01/pagina/README.md: mesmo cabeçalho, o que é, como abrir, como testar e o resultado do teste.
- nucleo/ferramentas/prints/testar-quiz-01.js: novo. Teste em 375 e 1440 pixels: exemplo de lead-score (96, faixa a), caso eliminatório (faixa eliminatorio, relatório com "Tenho interesse") e sem consentimento (nada enviado). Passou: 28 de 28 conferências. Prints em entregas/quizzes/quiz-01/prints/ (12 arquivos).
- index.md: página, prints e ferramentas/prints (a linha "ferramentas/ · vazio" estava velha).
- Perguntas 14.1 a 14.13 em prompts/07-fila-perguntas.md.
- Revisão da etapa 14: consentimento_texto do pacote passa a levar a frase da política, como aparece na tela; o pacote ganha primeira_utm_source e primeira_utm_campaign na parte da pessoa (planta, gaveta pessoas). Teste refeito (28 de 28) e prints refeitos.

## 2026-11-08 · etapa 13 · quiz-01 briefing e copy

- Fonte nova registrada: fontes/quiz-01-repositorio-2026-11-08/ (cópia do repositório do quiz, commit 17ec4d6, de 08/11/2026; vale sobre o artefato do acervo, como diz o LEIA.md da pasta). Nada em fontes/ foi alterado.
- base/lacunas.md v4 para v5, rascunho. Motivo: quatro conflitos novos trazidos pela cópia nova do quiz, cada um com os dois lados, a fonte de cada lado e bloqueado para entrega: conflito-16 (critério de qualificação: R$ 50 mil e 1 vendedor contra o lead score), conflito-17 (destino dos contatos: Triad CRM contra o banco e a planilha da #90), conflito-18 (identidade visual: Triad escura com verde neon contra o DS v1.0 e a #81) e conflito-19 (promessa "até X%" contra a conformidade). "Ver também" acrescentado em conflito-01, conflito-08 e conflito-09. depende_de sem mudança. Sentido.
- Cascata: base/lead-score.md v2, base/persona.md v3, base/metodo.md v3, base/produto.md v3 e base/entregas-do-servico.md v3 ficam com desatualizado: true, sem mudar conteúdo nem versão (dependem de lacunas v4). Já estavam marcados e seguem assim: GLOSSARY.md, funil-01, planta-do-banco, tom-de-voz, provas-e-conformidade, promessa, design-system, briefing, copy e estrutura da landing-page-01. mecanismo e oferta apontam para lacunas v2 e seguem marcados (4.5). Atualização proposta ao Otávio: só apontar para lacunas v5 (correção de forma), depois da 4.5 e da 11.1.
- entregas/quizzes/quiz-01/briefing.md v1, rascunho (otavio, junior e euclides: pendente). Novo. Nasce desatualizado (13.10).
- entregas/quizzes/quiz-01/copy.md v1, rascunho (otavio, junior e euclides: pendente). Novo. Tela por tela, com as perguntas e as opções que o lead score pontua; sem "até X%"; consentimento antes do e-mail e do WhatsApp com {{a definir: link da politica de privacidade}}; valor e gratuidade pela ficha; seção "Mudanças no texto do Júnior" com 30 mudanças (M1 a M30). Skill junior-neves-voice; onde chocou com a base, venceu a base. Nasce desatualizado (13.10).
- entregas/pautas/pauta-aprovacao-01.md v2 para v3, rascunho (otavio: pendente). Motivo: item 29 novo, para o Júnior aprovar as mudanças no texto do quiz, apontando para a seção da copy; depende_de lacunas 4 para 5 e quiz-01-copy 1 acrescentado; nota para o Otávio. Sentido. Continua desatualizado (4.5). O briefing da landing-page-01, que aponta para a pauta v2, já estava marcado.
- index.md: fonte nova, lacunas v5, pauta v3, os dois documentos do quiz e a marca "desatualizado" nos cinco documentos da cascata.
- Perguntas 13.1 a 13.12 em prompts/07-fila-perguntas.md.

## 2026-11-08 · etapa 12 · cascata pendente

- entregas/landings/landing-page-01/briefing.md v2 para v3, rascunho (otavio: pendente). Motivo: depende_de pauta-aprovacao-01 1 para 2; a pauta v2 só acrescentou texto aos itens e os itens 27 e 28, e os números de item que o briefing cita (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 18 e 19) seguem os mesmos. Nota "Documentos desatualizados" corrigida: a 6.9 já foi aplicada e a marca restante vem da 4.5. Forma. Continua desatualizado: usa mecanismo e oferta (pergunta 4.5) e documentos marcados por cadeia deles (regra 11.1).
- entregas/landings/landing-page-01/copy.md v2 para v3, rascunho (otavio, junior e euclides: pendente). Motivo: depende_de landing-page-01-briefing 2 para 3 (o briefing v3 só mudou cabeçalho e nota). Nota "Documentos desatualizados" corrigida do mesmo jeito. Forma. Continua desatualizado: usa mecanismo e oferta (pergunta 4.5) e documentos marcados por cadeia deles (regra 11.1).
- entregas/landings/landing-page-01/estrutura.md v2 para v3, rascunho (otavio: pendente). Motivo: depende_de landing-page-01-copy 2 para 3 e landing-page-01-briefing 2 para 3 (nenhum dos dois mudou de sentido). Nota "Documentos desatualizados" corrigida do mesmo jeito. Forma. Continua desatualizado: depende de documentos marcados por cadeia da 4.5 (regra 11.1).
- Sem mudança, continuam desatualizados (todos com depende_de já na versão atual; a marca vem só da cadeia do mecanismo e da oferta, regra 11.1): base/promessa.md v3 (mecanismo), base/tom-de-voz.md v3 (promessa), base/provas-e-conformidade.md v3 (mecanismo, oferta, promessa, tom-de-voz), base/design-system/design-system.md v3 (tom-de-voz, provas-e-conformidade), GLOSSARY.md v3 (mecanismo, oferta, promessa, tom-de-voz), funis/funil-01/funil.md v2 (provas-e-conformidade, glossario), dados/planta/planta.md v2 (funil-01, provas-e-conformidade), entregas/pautas/pauta-aprovacao-01.md v2 (funil-01, promessa, oferta, tom-de-voz, design-system, provas-e-conformidade).
- Não tocados: base/mecanismo.md v1 e base/oferta.md v1. Apontar para as versões novas de ficha-de-fatos, decisoes, lacunas, metodo, produto, entregas-do-servico e promessa muda o sentido (o papel da Análise pela #92); segue a pergunta 4.5.
- index.md: a marca "desatualizado" agora aparece em todos os 13 documentos marcados; versões do briefing, da copy e da estrutura passam a v3.
- As listas "Fontes" no fim dos três documentos seguem com as versões lidas na escrita (pergunta 12.1).

## 2026-11-08 · etapa 11 · triagem · pauta

- entregas/pautas/pauta-aprovacao-01.md v1 para v2, rascunho (otavio: pendente). Motivo: acréscimos do grupo D da triagem: item 1 (vídeo da página, 8.6), item 8 (texto na voz do Júnior, 9.4), item 9 (versão mínima das credenciais, 8.7 e 9.11), item 14 (Euclides como condutor das calls em grupo, 9.10), item 15 (quem oferece a Essencial e quando, 5.8), referência à 7.8 nos itens 23 e 26, itens novos 27 (esclarecimentos, 7.4) e 28 (fases de cor, 9.9); 4.3 e 7.2 já estavam na pauta. Nota para o Otávio ajustada. Sentido. No mesmo passo, forma da cascata: depende_de lead-score 2, funil-01 2, promessa 3, tom-de-voz 3, design-system 3 e provas-e-conformidade 3. Continua desatualizado: depende de oferta, promessa, funil-01 e outros marcados (pergunta 4.5). O briefing da landing-page-01 segue apontando para a pauta v1; a troca fica para a etapa 12.

## 2026-11-08 · etapa 11 · triagem · forma

- base/persona.md v2 para v3, decidido. Motivo: cascata da lacunas v4, só depende_de (triagem 6.9). Forma.
- base/produto.md v2 para v3, decidido. Motivo: cascata da lacunas v4, só depende_de (triagem 6.9). Forma.
- base/metodo.md v2 para v3, decidido. Motivo: cascata da lacunas v4, só depende_de (triagem 6.9). Forma.
- base/entregas-do-servico.md v2 para v3, decidido. Motivo: cascata da lacunas v4, só depende_de (triagem 6.9). Forma.
- base/lead-score.md v1 para v2, pendente-aprovacao. Motivo: cascata da lacunas v4, só depende_de (triagem 6.9). Forma.
- base/promessa.md v2 para v3, pendente-aprovacao. Motivo: cascata da lacunas v4, só depende_de (triagem 6.9). Forma. Continua desatualizado: depende de mecanismo (pergunta 4.5).
- base/tom-de-voz.md v2 para v3, pendente-aprovacao. Motivo: cascata da lacunas v4, só depende_de (triagem 6.9). Forma. Continua desatualizado: depende de promessa (pergunta 4.5).
- base/provas-e-conformidade.md v2 para v3, decidido. Motivo: cascata da lacunas v4, só depende_de (triagem 6.9). Forma. Continua desatualizado: depende de mecanismo, oferta, promessa e tom-de-voz (pergunta 4.5).
- base/design-system/design-system.md v2 para v3, rascunho. Motivo: cascata da lacunas v4, só depende_de (triagem 6.9). Forma. Continua desatualizado: depende de tom-de-voz e provas-e-conformidade (pergunta 4.5).
- GLOSSARY.md v2 para v3, decidido. Motivo: cascata da lacunas v4, só depende_de (triagem 6.9). Forma. Continua desatualizado: depende de mecanismo, oferta, promessa e tom-de-voz (pergunta 4.5).
- funis/funil-01/funil.md v1 para v2, pendente-aprovacao. Motivo: cascata da lacunas v4, só depende_de (triagem 6.9). Forma. Continua desatualizado: depende de provas-e-conformidade e glossario (pergunta 4.5).
- dados/planta/planta.md v1 para v2, rascunho. Motivo: cascata da lacunas v4, só depende_de (triagem 6.9). Forma. Continua desatualizado: depende de funil-01 e provas-e-conformidade (pergunta 4.5).
- entregas/landings/landing-page-01/briefing.md v1 para v2, rascunho. Motivo: cascata da lacunas v4, só depende_de (triagem 6.9). Forma. Continua desatualizado: depende de mecanismo, oferta e documentos marcados (pergunta 4.5); pauta-aprovacao-01 segue na versão 1, a troca fica para a etapa 12.
- entregas/landings/landing-page-01/copy.md v1 para v2, rascunho. Motivo: cascata da lacunas v4, só depende_de (triagem 6.9). Forma. Continua desatualizado: depende de mecanismo, oferta e documentos marcados (pergunta 4.5).
- entregas/landings/landing-page-01/estrutura.md v1 para v2, rascunho. Motivo: cascata da lacunas v4, só depende_de (triagem 6.9). Forma. Continua desatualizado: depende de documentos marcados (pergunta 4.5).
- entregas/pautas/pauta-aprovacao-01.md v1, rascunho: passa a desatualizado: true, sem mudar versão nem conteúdo (cascata, passo 3); sobe de versão no commit da pauta.
- Regra aplicada (pergunta 11.1): só volta a desatualizado: false o documento cujas dependências estão todas na versão atual e nenhuma marcada. base/mecanismo.md e base/oferta.md não foram tocados (pergunta 4.5).
- Triagem 4.2 (grupo B, já decidido): confirmado pela seção 2, item 1, de prompts/04-decisoes-de-08-11-e-lead-score.md e pelas decisões #52 e #56 em base/decisoes.md; nada alterado. ficha-de-fatos#numero-de-entregas segue decidido (ficha v3) e o contrato segue aberto (lacuna-10, outros-06).

## 2026-11-08 · fim da fila (etapas 4 a 10)

- Todas as sete etapas com commit. Resumo em prompts/05-fila-de-trabalho-resposta.md; 84 perguntas em prompts/05-fila-perguntas.md.

## 2026-11-08 · etapa 10 · estrutura UX da landing-page-01

- entregas/landings/landing-page-01/estrutura.md v1, rascunho (otavio: pendente). Novo, a partir do copy.md. Sem cor, fonte nem estilo (conflito-08). Apoia-se em documentos desatualizados pela cascata (6.9). Perguntas 10.1 a 10.16.
- Revisão: um revisor independente e uma rodada de correção. Corrigidos o id e a versão da landing no catálogo (pendente, 10.15), o contador de escassez fora do bloco do hero, afirmações fortes demais, a frase sobre a ordem (três mudanças internas listadas, 10.16), persona e tom-de-voz em depende_de, o campo do qualificador, o conflito-06, a fonte das sugestões do wireframe, a hierarquia da seção 08 e o estado inicial da horta e do FAQ.

## 2026-11-08 · etapa 9 · copy da landing-page-01

- entregas/landings/landing-page-01/copy.md v1, rascunho (otavio, junior e euclides: pendente). Novo. Skills usadas: landing-page-copy, roteiro-de-pagina e junior-neves-voice; onde chocaram com a base, venceu a base (9.4, 9.5). Notações novas {{ficha-de-fatos#campo:n}} e {{ficha-de-fatos#campo:parte}} (9.8, 9.13). Apoia-se em documentos desatualizados pela cascata (6.9 e 4.5). Perguntas 9.1 a 9.17.
- Revisão: dois revisores independentes e duas rodadas de correção. Primeira: depende_de e aprovado_por incompletos, placeholders que puxavam o campo inteiro ou não encaixavam, citação não literal, subtítulo do hero fora do briefing, "colheita" em título, alegações de resultado e absolutas no diagrama, título do hero sem [PROVA REAL], frequência das calls em grupo, painel, caso documentado, seção 08 sem marca do quiz-01. Segunda: grupo de suporte trazendo "reuniões", CS e a IA adiada, placar que insinuava conversão total, a tese do closer (#87) numa legenda, o "só" falso no caso documentado, absolutos e superlativos restantes.

## 2026-11-08 · etapa 8 · briefing da landing-page-01

- entregas/landings/landing-page-01/briefing.md v1, rascunho (otavio: pendente). Novo. Apoia-se em documentos desatualizados pela cascata (6.9 e 4.5). Perguntas 8.1 a 8.15.
- Revisão: um revisor independente e uma rodada de correção. Corrigidos a legenda das marcas de design (a adoção do v1.0 não está decidida), a #68 citada inteira, campos e lacunas que faltavam nas linhas de credenciais e contador, bloqueios que faltavam na tabela (reunião de safra, "eu mando no seu comercial", endereço da landing, postura da #26, datas de trabalho das entregas, teste com donos), elementos da seção 08 sem tratamento, uma data sem fonte, o mock-up decidido (é o do PDV-90, bloqueado) e a fonte da captura do contato (funil-01).

## 2026-11-08 · etapa 7 · pauta de aprovacao

- entregas/pautas/README.md e entregas/pautas/pauta-aprovacao-01.md v1, rascunho (otavio: pendente). Novos. 26 itens para decidir em três partes (o que trava o funil-01, primeira venda e agenda, conteúdo e postura), adiados e dois itens para informar (#92 e #93). Inclui o reembolso de 7 dias pela Hotmart e o risco da Análise na semana 1, sem solução inventada. Apoia-se em documentos desatualizados pela cascata (6.9 e 4.5). Perguntas 7.1 a 7.9.
- Revisão: um revisor independente e uma rodada de correção. Corrigidos a justificativa do item do nome público e da duração (7.9), uma recomendação do sistema apresentada como posição do Otávio no item da oferta, a origem da posição sobre credenciais (só a resposta 8), a falta da meta e verba de mídia e dos pontos a validar da engenharia reversa, o parcelamento subido para a parte que trava o funil, ids de campo e siglas tirados do corpo.

## 2026-11-08 · etapa 6 · planta do banco

- dados/planta/planta.md v1, rascunho (otavio: pendente). Novo. Perguntas 6.1 a 6.9 em prompts/05-fila-perguntas.md.
- base/lacunas.md v3 para v4, rascunho. Motivo: nova lacuna outros-23 (prazo de guarda e apagamento dos dados dos leads), pedida pela etapa 6; depende_de sem mudança. Sentido.
- Cascata: GLOSSARY.md, funil-01, lead-score, entregas-do-servico, promessa, produto, tom-de-voz, metodo, provas-e-conformidade, persona e design-system ficam com desatualizado: true, sem mudar conteúdo nem versão (dependem de lacunas v3). Atualização proposta ao Otávio: só apontar para lacunas v4 (pergunta 6.9). A planta se apoia em documentos agora desatualizados e precisa ser revista depois dessa atualização.
- Revisão: um revisor independente. Corrigidos a chave do garçom (grava e lê só o catálogo), a classificação de dado pessoal das etiquetas e datas do evento, o domínio do e-mail de exemplo, o exemplo fictício do texto de consentimento, a regra do contador marcada como proposta e "quem decide" o prazo de guarda (não registrado, em vez do Otávio).

## 2026-11-08 · etapa 5 · funil-01

- funis/funil-01/funil.md v1, pendente-aprovacao (otavio, junior e euclides: pendente). Novo. Depende da #90, pendente do Júnior e do Euclides. Não depende de oferta nem de mecanismo, que estão desatualizados. Perguntas 5.1 a 5.9 em prompts/05-fila-perguntas.md.
- Revisão: um revisor independente. Corrigidos depende_de sem regra-seguranca e glossario, o id do glossário citado errado, a coluna de estados apresentada como regra do método (as definições viram proposta, 5.2), a linha do reels no MVP condicionada à ferramenta, a linha de pendência que misturava Análise e reunião e a chave de leitura da planilha, separada da chave do garçom.

## 2026-11-08 · etapa 4 · decisoes de 08-11 e lead score

Pedido: prompts/04-decisoes-de-08-11-e-lead-score.md (decisões do Otávio de 08/11/2026 e respostas às 9 perguntas da etapa 3). Resposta e perguntas em prompts/04-decisoes-de-08-11-e-lead-score-resposta.md e prompts/05-fila-perguntas.md (4.1 a 4.9).

- base/decisoes.md v1 para v2, decidido. Motivo: resposta 1 de 08/11 (depende_de passa para a ficha v2; desatualizado volta a false). Forma.
- base/ficha-de-fatos.md v2 para v3, decidido. Motivo: #92 e #93 (analise-valor, analise-gratuidade e analise-conteudo decididos; campo novo analises-gratuitas; barra-de-resgates passa a guardar a regra da #93, com os números da landing só como histórico); resposta 2 (campos novos credenciais-44 como [PROVA REAL], tempos-da-analogia e deming-percentual com a nota "Adaptado de"); resposta 7 (sai o "confirmar com o Júnior" de relogio-da-operacao; vale a #41); seção 2 (numero-de-entregas decidido: a landing segue o registro); notas em urgencia, analise-nome-publico, analise-duracao, analise-quem-conduz, analise-abatimento, bonus-analise-base, criterio-de-qualificacao e grafia-junior. Sentido, aprovado pelo Otávio; nada do Júnior e do Euclides tocado.
- base/decisoes.md v2 para v3, decidido. Motivo: decisões novas #92 a #98; #62 substituída por #92; #49, #59 e #61 revistas por #92; remissões da #36 e da #44 aos campos novos. Sentido, decisões do Otávio; a #98 fica pendente-aprovacao (junior e euclides: pendente).
- base/lacunas.md v2 para v3, rascunho. Motivo: resolvidos lacuna-05, lacuna-14, lacuna-15, conflito-11, conflito-12, conflito-13 e outros-17 (risco aceito, #97); resolvidos em parte lacuna-11, lacuna-17, lacuna-21, conflito-02 e conflito-04; conflito-01 e lacuna-12 apontam para base/lead-score.md; conflito-08 com a marca "levar ao Júnior"; novos outros-20 (Cultivo, levar ao Júnior), outros-21 (18 tentativas, levar ao Júnior) e outros-22 (revisão programada do lead score); lacuna-20 inclui a #98 e a informação da #92. Sentido.
- base/lead-score.md v1, pendente-aprovacao (otavio: 2026-11-08; junior e euclides: pendente). Novo (#98).
- base/persona.md v1 para v2, decidido. Motivo: cascata; a linha do tema 5 reflete a #92. Forma e reflexo de decisão do Otávio.
- base/produto.md v1 para v2, decidido. Motivo: cascata; o número de entregas deixa de aparecer em conflito. Reflexo de decisão do Otávio.
- base/metodo.md v1 para v2, decidido. Motivo: cascata, só depende_de. Forma.
- base/entregas-do-servico.md v1 para v2, decidido. Motivo: cascata; número de entregas e a Análise da porta (#92). Reflexo de decisão do Otávio.
- base/promessa.md v1 para v2, pendente-aprovacao (sem mudança em aprovado_por). Motivo: cascata; exceção do Deming (#94) e a linha da regra de vocabulário, resolvida. Reflexo de decisão do Otávio.
- base/tom-de-voz.md v1 para v2, pendente-aprovacao (sem mudança em aprovado_por). Motivo: resposta 3 (colheita, plantio e relógio), resposta 5 (etapas em público e jargão), exceção do Deming (#94) e grafia confirmada. Sentido nas partes do Otávio; nada do Júnior tocado.
- base/provas-e-conformidade.md v1 para v2, decidido. Motivo: cascata; Deming, credenciais de #44, barra de resgates e Análise passam a citar os campos novos e a #92 e a #93. Reflexo de decisão do Otávio.
- base/design-system/design-system.md v1 para v2, rascunho. Motivo: seção nova "Divergências decididas" (grafia "Junior Neves", confirmada em 08/11, e nomes de etapa); adoção do DS com a marca "levar ao Júnior" (resposta 4). Sentido, documento continua rascunho.
- GLOSSARY.md (id glossario) v1 para v2, decidido. Motivo: resposta 9 (sai a F11, forma); verbetes Etapas, Análise Estratégica do seu Comercial, Quiz, Barra de resgates, Entregas, Rúcula, Colheita, Plantio e Preparo do solo refletem as decisões de 08/11. depende_de ganha lead-score v1.
- Cascata: mecanismo (v1, aprovado) e oferta (v1, pendente-aprovacao) ficam com desatualizado: true, sem mudar conteúdo nem versão: a #92 faz da Análise o diagnóstico do quiz, e os dois tratam a versão rápida da Análise na call como demonstração (pergunta 4.5). Os demais dependentes foram atualizados direto.
- CLAUDE.md: regra 10 (projeto Estrategista de Negócio como arquivo histórico, #96) e a Regra de pausas como regra permanente.
- conexoes.md: só o Otávio tem acesso no MVP (#95).

- Revisão: um revisor independente. Corrigidos números copiados no texto novo da #92, da #93 e do lead-score (agora citam ficha-de-fatos#analises-gratuitas, #barra-de-resgates e #vagas), a remissão "substitui #62" no status da #92, quem decide o "Total gerado" no conflito-04 (alinhado ao provas-e-conformidade) e a linha da lacuna-20 neste log.

## 2026-11-08 · base lote 3

- base/persona.md v1, decidido (otavio: 2026-11-08, pela aprovação do plano).
- base/tom-de-voz.md v1, pendente-aprovacao (otavio: 2026-11-08; junior: pendente).
- base/provas-e-conformidade.md v1, decidido (otavio: 2026-11-08). Segue a #91 sobre o reembolso.
- base/design-system/design-system.md v1, rascunho (otavio e junior: pendente). Aponta para fontes/design-system-v1.0/ sem copiar tokens; conflitos com #45, #81 e o laranja ficam bloqueados; a grafia do Júnior no DS é correção a fazer.
- GLOSSARY.md v1 (id glossario), decidido (otavio: 2026-11-08), na raiz, conforme a escolha registrada no lote 1.
- A partir deste lote vale a Regra de pausas (prompts/03-escrever-a-base.md): as dúvidas do Otávio seguiram o caminho mais conservador e estão em prompts/03-escrever-a-base-resposta.md, "Perguntas para o Otávio".
- Revisão: dois revisores independentes. Corrigidos citações alteradas dentro das aspas, a definição de "Virada do mês" (sem apoio na fonte; reescrita do Mecanismo único, da Big Idea final e do One pager), a #33 tratada como substituída no design-system, números de fatos fora da ficha, nomes antigos como verbete próprio e um verbete com vários termos.

## 2026-11-08 · base lote 2

- base/produto.md v1, decidido (otavio: 2026-11-08).
- base/metodo.md v1, decidido (otavio: 2026-11-03).
- base/mecanismo.md v1, aprovado (otavio: 2026-10-22; junior: 2026-10-27; euclides: 2026-10-27). Confirmado pelo Otávio: fica aprovado, com a frase filosófica pendente, a crença "com ressalva" e os nomes de 01/11 (v0.5) marcados como posteriores à #48.
- base/oferta.md v1 e base/promessa.md v1, pendente-aprovacao (otavio: 2026-11-08; junior e euclides: pendente).
- base/entregas-do-servico.md v1, decidido (otavio: 2026-11-01). O calendário por dia da engenharia reversa não entra.
- base/ficha-de-fatos.md v1 para v2, decidido. Motivo: pedido do Otávio para pôr na ficha os fatos que o lote 2 citava sem campo: relogio-da-operacao, tentativas-ate-abandonado, duracao-call-de-venda, multiplo-regra-de-venda, gsaas-preco-travado (67 campos). Mudança de sentido aprovada pelo Otávio; os campos antigos não mudaram.
- base/lacunas.md v1 para v2, rascunho. Motivo: nova lacuna outros-19 (a fala do Júnior para a call: "3 semanas" ou "uma semana"), decisão do Otávio; depende_de passa a ficha-de-fatos v2.
- Cascata: base/decisoes.md fica desatualizado: true (depende de ficha-de-fatos v1). Atualização proposta ao Otávio: só apontar para a ficha v2, sem mudança de conteúdo.
- Revisão: dois revisores independentes. Corrigidos números de fatos fora da ficha (sessões, setup, safra de julho, calendário), citações alteradas dentro das aspas, a #91 como fonte do reembolso, a Análise da call marcada como em conflito e a pendência do Júnior sobre as 18 tentativas, que a fonte registra.

## 2026-11-08 · base lote 1

- base/ficha-de-fatos.md v1, decidido (otavio: 2026-11-08). Criada conforme o plano (prompts/02-plano-da-base-resposta.md, parte 2): 62 campos, cada um com status; os campos em conflito ficam "em conflito · bloqueado para entrega até a decisão". Campo novo, aceito pelo Otávio: barra-de-resgates. Campo arrependimento conforme a #91. grafia-junior: vale o CTX; o design system será corrigido na próxima versão dele (Otávio).
- base/decisoes.md v1, decidido (otavio: 2026-11-08, pela aprovação do plano). Registro #1 a #91. Sem texto em nenhuma fonte: #1 a #8, #10, #11, #13, #15, #17, #18, #21, #24, #28, #30 a #32, #34, #35, #47 (lista maior que a do plano: esses números só aparecem em faixas ou listas). Critério do Otávio: uma decisão só vira "substituída" quando a substituta for aprovada; por isso a #33 fica pendente-aprovacao com "substituição proposta em #85", e nenhuma das duas promessas vai para entrega antes da aprovação. Decisão nova #91: reembolso de 7 dias pela Hotmart; o art. 49 do CDC em venda para empresa fica com o advogado; não muda a #39.
- base/lacunas.md v1, rascunho (otavio: pendente). Lacunas do CTX §10, os conflitos da parte 5 do plano e a lacuna nova outros-18 (art. 49 do CDC).
- Glossário: a skill grill-with-docs instalada (mattpocock-skills 1.3.1) procura GLOSSARY.md na raiz, no formato de skills/engineering/domain-modeling/GLOSSARY-FORMAT.md. O glossário será GLOSSARY.md na raiz, com a linha _Fonte_ como extensão nossa (lote 3).
- Revisão: dois revisores independentes. Corrigidos status fora da tabela, remissões à ficha que faltavam, a fonte de duracao e a pontuação das notas.

## 2026-11-08 · regras aprovadas

- nucleo/regras/versionamento.md v1 para v2, status decidido (otavio: 2026-11-08). Motivo: aprovação do Otávio e nova seção "Forma e sentido" (correção de forma sobe a versão sem derrubar a aprovação; mudança de sentido volta para rascunho ou pendente-aprovacao; na dúvida, perguntar). Confirmados: versão como número inteiro e desatualizado como campo separado do status.
- nucleo/regras/seguranca.md v1, status decidido (otavio: 2026-11-08). Motivo: aprovação do Otávio, sem mudança de conteúdo.
- Confirmado: o zip original do acervo fica em fontes/safra-acervo.zip.

## 2026-11-08 · fundação

- Fundação criada: pastas nucleo/, base/, funis/, entregas/, dados/ e aprendizados/ com README; regras de versionamento e segurança (v1, rascunho); conexoes.md; CLAUDE.md; index.md; .gitignore; .claude/settings.json.
- Acervo de 08/11 movido para fontes/acervo-2026-11-08/ (98 arquivos, conferidos com o zip). O zip original ficou em fontes/safra-acervo.zip como reserva. safra-dossie.md e safra-landing.md da antiga historico-projeto/ eram idênticos (sha256) às cópias do zip; a pasta foi removida.
- Design system v1.0 baixado para fontes/design-system-v1.0/.
- Pastas vazias copywriter/, landing-page/, quiz/ e revisor/ removidas.

## Pendências

- [x] **Base:** 9 perguntas da etapa 3 em prompts/03-escrever-a-base-resposta.md. Respondidas pelo Otávio em 08/11/2026 (prompts/04-decisoes-de-08-11-e-lead-score.md, seção 5a) e aplicadas na etapa 4; os itens 4, 6 e 8 ficam em base/lacunas.md com a marca "levar ao Júnior".

- [ ] **Decisão #90:** o funil-01 (landing-page-01, quiz-01, Supabase, planilha, SDR) substitui a página das três portas (#66) e o CRM do Doc Mestre. Pendente de aprovação do Júnior e do Euclides.
- [ ] **Design:** o design system v1.0 é escuro e proíbe cores fora da paleta, o que conflita com a paleta branco e verde (#81) e com os botões laranja de 03/11. Decidir antes da etapa de design da landing. Dono das próximas versões do design system a definir. Vai para a pauta com o Júnior (resposta 4 do Otávio, 08/11/2026).
- [ ] **Lead score (#98):** base/lead-score.md pendente do Júnior e do Euclides. Na mesma pauta, informar aos dois a nova Análise (#92).
- [x] **Segurança · risco aceito:** o site sv-safra.soulstory.com.br está aberto, sem senha, com o painel interno. Risco aceito no MVP: fica aberto, sem porteiro (#97, 08/11/2026).
- [x] **Acesso:** confirmar quem mais acessa o sistema (o Doc Mestre cita Lalas no design e Miranda na infra). Fechada: ninguém além do Otávio acessa o sistema no MVP (#95, 08/11/2026; conexoes.md).
- [x] **Migração:** o projeto "Estrategista de Negócio" no Claude é arquivo histórico desde 08/11/2026; mudança no Safra entra só pelo repositório (#96; CLAUDE.md, regra 10).
- [ ] **Chaves:** antes de existir a primeira chave, instalar o detector de chaves (pre-commit) e fechar a brecha do .env no terminal (hoje o .claude/settings.json bloqueia só a ferramenta de leitura, não comandos como cat).
- [ ] **Prazo:** a data de 10/11 do funil pode atrasar. Começar certo vale mais que começar na data.
- [ ] **Repositório do quiz:** o repositório do quiz-01 (github.com/otavio-gif/sistema-de-vendas-safra-quiz01) mora na conta pessoal otavio-gif, fora da organização do Safra, e está ligado a uma publicação automática na Cloudflare. Depois da migração para o sistema (cópia em fontes/quiz-01-repositorio-2026-11-08/), decidir se ele vira arquivo histórico e se a Cloudflare passa a publicar a partir do repositório do sistema (etapa 19, 08/11/2026).
