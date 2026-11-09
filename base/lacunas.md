---
id: lacunas
versao: 5
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: ficha-de-fatos
    versao: 3
  - id: decisoes
    versao: 3
desatualizado: true
---

# Lacunas

A lista viva do que falta decidir, confirmar ou provar. Tem três partes:

1. **As lacunas do CONTEXTO** (CTX §10, itens 1 a 23, mais os fatos a confirmar e a validação).
2. **Os conflitos que afetam a landing-page-01 e o quiz-01**, por prioridade (plano aprovado, prompts/02-plano-da-base-resposta.md, parte 5).
3. **Os conflitos que não afetam a landing nem o quiz** (mesma parte 5 do plano).

Os itens se repetem entre as partes quando o CTX e o plano olham o mesmo ponto; cada repetição aponta para a outra em "Ver também". Nenhum item resolve conflito: lista os lados e quem decide.

Item resolvido continua na lista, com a linha **Resolvido** e a decisão de origem (nada se apaga). A marca **levar ao Júnior** indica o que vai para a pauta com ele (Otávio, 08/11/2026).

Cada item traz: **o que é**, **valores e fontes**, **quem decide** e **o que destrava**. Valores de fato não se repetem aqui: são citados pelo id do campo em `ficha-de-fatos` (por exemplo, ficha-de-fatos#analise-valor). Decisões são citadas pelo número de `decisoes` (#n). As abreviações de fonte são as da ficha de fatos. "Quem decide: não registrado" quer dizer que nenhuma fonte diz quem decide.

---

## Parte 1 · Lacunas do CONTEXTO (CTX §10)

### lacuna-01
**Validar a engenharia reversa das entregas.**
- **O que é:** a proposta de 08/11 (calendário por dia, horas, MVP, métricas, portões) ainda não foi validada. São 12 pontos; os que mudam a estratégia: a tensão entre a meta de vendas e a agenda do Júnior (caminhos A, B ou C; a recomendação é C com A, e o C mexe na #78), o recorte do MVP, a métrica primária e os sinais de invalidação, os insumos do cliente no contrato e quem conduz os dois portões.
- **Valores e fontes:** ficha-de-fatos#meta-de-vendas, ficha-de-fatos#calendario-por-dia, ficha-de-fatos#sessoes-de-comando, ficha-de-fatos#inicio-de-cada-cliente, ficha-de-fatos#insumo-do-cliente. Engenharia reversa online ("A conta de horas por cliente" e "O que validar com o Júnior e o Euclides"); CTX §3, §9 (leitura 6), §10.
- **Quem decide:** o Júnior e o Euclides (CTX §10: "Validar a engenharia reversa com o Júnior e o Euclides").
- **O que destrava:** o calendário além dos três marcos da Ficha do Serviço, a conta de horas e custo, o ritmo de venda que a agenda do Júnior aguenta e o desenho da Essencial (lacuna-03).
- **Ver também:** outros-01.

### lacuna-02
**Promessa de 08/11 (#85).**
- **O que é:** a promessa em duas versões espera a aprovação do Júnior e do Euclides (nomes, papel, agenda do Euclides), e os ajustes propostos em 08/11 ("Por 90 dias" na fria; sem o "todo"; "sem aumentar a verba de marketing"; "os 7 componentes"; teste de "hackeando") não foram confirmados. "Colher resultado em 15 dias" segue fora de público.
- **Valores e fontes:** #85, #33; CTX §6, §10; Promessa central online; dossiê §3.
- **Quem decide:** o Júnior e o Euclides aprovam a #85; o Otávio decide os ajustes (plano aprovado, parte 5, conflito 3).
- **O que destrava:** o título e o subtítulo do hero da landing-page-01, a promessa no quiz-01 e o compromisso de agenda dos dois nas calls em grupo (ficha-de-fatos#calls-em-grupo).
- **Ver também:** conflito-03.

### lacuna-03
**Implementação Essencial.**
- **O que é:** Opção 1, Instalação em 15 dias (recomendada), ou Opção 2, em grupo; preço; regra da diferença no upgrade; garantia; se continua só depois do não.
- **Valores e fontes:** ficha-de-fatos#downsell-desenho, ficha-de-fatos#downsell-preco; #37, #42, #60; Downsell online; Engenharia reversa online ("Implementação Essencial: duas opções"); CTX §3, §9 (leitura 22).
- **Quem decide:** o Otávio, o Júnior e o Euclides (Downsell online: o desenho "volta para o Otavio, o Júnior e o Euclides").
- **O que destrava:** a fala do downsell na call e o preço que pode ser dito.
- **Ver também:** outros-02.

### lacuna-04
**Quem faz cada papel da entrega.**
- **O que é:** analista, redator, revisor de calls, CS e tecnologia ("Cyntia?") sem dono. É parte de suporte e tecnologia, que ficou para depois (#84), mas a conta de custo e a primeira onda da biblioteca dependem dela; inclui consentimento e contrato para gravações e dados.
- **Valores e fontes:** ficha-de-fatos#grupo-de-suporte; #76, #84; CTX §10; Ficha do Serviço online ("O que ainda falta decidir"); Engenharia reversa online (ponto 6).
- **Quem decide:** o Otávio deixou para depois (#84); a conta é refeita com o Euclides e a Cyntia (Ficha do Serviço online, "Próximos passos").
- **O que destrava:** a capacidade antes da 10ª venda (ficha-de-fatos#vagas) e o custo real por cliente.
- **Ver também:** outros-05.

### lacuna-05
**Página no formato antigo das entregas.**
- **O que é:** a página mostra outro número de entregas, com a "Mentoria 1:1" contada como entrega, em vez das entregas do registro mais os ritos (ver ficha-de-fatos#numero-de-entregas); a promessa fria ainda não está no Hero A; o "gerente comercial" (#86) precisa alinhar com a promessa.
- **Valores e fontes:** ficha-de-fatos#numero-de-entregas, ficha-de-fatos#sessoes-de-comando; #52, #56, #83, #86; CTX §10; landing (seções 5 e 9, FAQ).
- **Quem decide:** o Otávio (plano aprovado, parte 5, conflito 11: "as regras são suas").
- **O que destrava:** as seções de entregas, ritos e FAQ da landing-page-01.
- **Resolvido em 08/11/2026 (aplicação do registro, sem decisão nova):** a landing segue o registro: as entregas de ficha-de-fatos#numero-de-entregas (#52, #56), "Sessões de Comando" no lugar de "Mentoria 1:1" (#53, #83). Continua em aberto só o que depende da promessa (#85, pendente): a promessa fria no Hero A e o alinhamento do "gerente comercial" (#86) com ela (lacuna-02).
- **Ver também:** conflito-11.

### lacuna-06
**GSAAS.**
- **O que é:** desenho, preço e quem conduz o grupo depois dos 90 dias; o Júnior prefere não conduzir.
- **Valores e fontes:** ficha-de-fatos#gsaas; #38, #58, #84; CTX §3, §10; Ficha do Serviço online.
- **Quem decide:** ficou para depois (#84, Otávio); a Ficha do Serviço online leva a tabela "O que ainda falta decidir" ao Júnior e ao Euclides.
- **O que destrava:** a conta da continuidade (CTX §9, leitura 4) e o que o Relatório de Produtividade pode oferecer no fim.
- **Ver também:** outros-04.

### lacuna-07
**Nome "Triad H." (#89).**
- **O que é:** aprovação do Júnior e do Euclides, busca de marca, grafia pública; e se os pilares viram as quatro áreas do growth hacking.
- **Valores e fontes:** ficha-de-fatos#nome-agencia; #55, #82, #89; CTX §6, §8, §10.
- **Quem decide:** o Júnior e o Euclides.
- **O que destrava:** a assinatura da landing-page-01, do quiz-01 e dos criativos.
- **Ver também:** conflito-07, outros-07.

### lacuna-08
**Tese do closer como macronarrativa (#87).**
- **O que é:** o Júnior precisa confirmar que a tese é dele e topar publicá-la; a regra 5 do painel muda com isso.
- **Valores e fontes:** #87; CTX §3, §10; F25 (fala "pela sequência (confirmar)").
- **Quem decide:** o Júnior.
- **O que destrava:** a macronarrativa nova e o uso da tese em peça.
- **Ver também:** outros-08.

### lacuna-09
**Lucro por lead.**
- **O que é:** a promessa fala em lucro por lead, mas o Relatório mede receita por lead e custo por venda; lucro pede a margem do cliente, a pedir no onboarding.
- **Valores e fontes:** #85; CTX §10; Promessa central online.
- **Quem decide:** não registrado. O dado vem do cliente no onboarding (CTX §10).
- **O que destrava:** a medição do que a promessa diz no Relatório de Produtividade.
- **Ver também:** outros-09.

### lacuna-10
**Contrato com o formato novo.**
- **O que é:** escopo das entregas (ficha-de-fatos#numero-de-entregas), ritos, presença do Júnior e do Euclides que a promessa anuncia, gravações e dados, sem nenhum poder de gestão sobre o time do cliente. O contrato atual tem outro número de entregas.
- **Valores e fontes:** ficha-de-fatos#numero-de-entregas, ficha-de-fatos#garantia, ficha-de-fatos#arrependimento; #39, #85; CTX §8, §10, §12; Doc Mestre online (E.M.V.: contrato revisado por advogado, só com o escopo das entregas; o número está em ficha-de-fatos#numero-de-entregas).
- **Quem decide:** não registrado; a fonte pede revisão de advogado (CTX §8; Oferta online; Doc Mestre online).
- **O que destrava:** a primeira venda.
- **Ver também:** outros-06.

### lacuna-11
**A Análise na página contra o registro.**
- **O que é:** valor, gratuidade, duração e quem conduz divergem entre a página e o registro.
- **Valores e fontes:** ficha-de-fatos#analise-valor, ficha-de-fatos#analise-gratuidade, ficha-de-fatos#analise-duracao, ficha-de-fatos#analise-quem-conduz; #59, #61, #62; CTX §10; landing.
- **Quem decide:** ver conflito-02.
- **O que destrava:** a seção da Análise da landing-page-01 e a fala final do quiz-01.
- **Resolvido em parte (#92, 08/11/2026):** valor e gratuidade decididos (ficha-de-fatos#analise-valor, ficha-de-fatos#analise-gratuidade, ficha-de-fatos#analises-gratuitas). Continuam em aberto o nome público, a duração e quem conduz a reunião com o Júnior (conflito-02).
- **Ver também:** conflito-02.

### lacuna-12
**Critério de qualificação.**
- **O que é:** o corte de quem a oferta serve muda de fonte para fonte.
- **Valores e fontes:** ficha-de-fatos#criterio-de-qualificacao; CTX §4, §10; Doc Mestre online (decisão 9).
- **Quem decide:** ver conflito-01.
- **O que destrava:** o filtro do quiz-01 e o texto "Para quem é" da landing-page-01.
- **Situação em 08/11/2026:** proposta registrada em base/lead-score.md (#98), pendente do Júnior e do Euclides.
- **Ver também:** conflito-01.

### lacuna-13
**Destinos da página.**
- **O que é:** na página, todos os botões levam à Análise e a calculadora saiu, contra as três portas com e sem VSL (#66).
- **Valores e fontes:** #66, #90; CTX §10; landing; Doc Mestre online.
- **Quem decide:** ver conflito-06.
- **O que destrava:** a arquitetura de botões da landing-page-01.
- **Ver também:** conflito-06.

### lacuna-14
**GSAAS e gerente na primeira etapa.**
- **O que é:** a página fala de GSAAS e de gerente nas seções 5 e 6 e no FAQ, contra a #68.
- **Valores e fontes:** #68, #86; CTX §6, §10; landing.
- **Quem decide:** o Otávio (#68 e #86 são dele).
- **O que destrava:** as seções 5, 6 e o FAQ da landing-page-01.
- **Resolvido em 08/11/2026 (aplicação do registro, sem decisão nova):** a landing segue o registro: nada de GSAAS nem de gerente de safra (#68); "gerente comercial" só como a exceção de #86.
- **Ver também:** conflito-11.

### lacuna-15
**Início dos clientes no FAQ.**
- **O que é:** o FAQ da página ainda diz que as dez começam juntas, contra a #65.
- **Valores e fontes:** ficha-de-fatos#vagas, ficha-de-fatos#inicio-de-cada-cliente; #65; CTX §10; landing (FAQ).
- **Quem decide:** o Otávio (#65 é dele).
- **O que destrava:** o FAQ da landing-page-01.
- **Resolvido em 08/11/2026 (aplicação do registro, sem decisão nova):** nada de "as dez começam juntas" (#65).
- **Ver também:** conflito-11.

### lacuna-16
**Credenciais em dois números.**
- **O que é:** o total dos dois e o lançamento aparecem com números diferentes.
- **Valores e fontes:** ficha-de-fatos#total-dos-dois, ficha-de-fatos#lancamento-finch; #44; CTX §7, §10.
- **Quem decide:** ver conflito-05.
- **O que destrava:** a faixa de credenciais e o contador da landing-page-01.
- **Ver também:** conflito-05.

### lacuna-17
**Linha do tempo da página.**
- **O que é:** levar à página os marcos de ficha-de-fatos#quando-entrega-1 e ficha-de-fatos#sistema-instalado, as fases de cor, as Sessões de Comando e as calls em grupo (pedido do Otávio, 08/11). A página ainda mostra a Análise numa semana diferente da registrada (contra #72).
- **Valores e fontes:** ficha-de-fatos#quando-entrega-1, ficha-de-fatos#sistema-instalado, ficha-de-fatos#sessoes-de-comando, ficha-de-fatos#calls-em-grupo; #72, #73, #80, #83; CTX §10; landing.
- **Quem decide:** o Otávio (o pedido é dele).
- **O que destrava:** a seção "Como funciona" da landing-page-01.
- **Resolvido em parte em 08/11/2026 (aplicação do registro, sem decisão nova):** a Análise Estratégica das Safras (entrega 1) fica na semana de ficha-de-fatos#quando-entrega-1 (#72). Levar à página os demais marcos é tarefa da landing-page-01; a quantidade de calls em grupo segue em conflito (outros-03).
- **Ver também:** conflito-11.

### lacuna-18
**Restos de 05/11.**
- **O que é:** no Google Docs do Doc Mestre, apagar à mão a linha "Página de escolha" e a imagem antiga do fluxo, renomear as abas 1 e 2 e alinhar o E.M.V. ao do Doc Mestre online; na apresentação, o slide da Análise ainda separa quem conhece a Triad de quem chega por anúncio (contra #61); VSLs e criativos não conferidos.
- **Valores e fontes:** #61; CTX §10, §12.
- **Quem decide:** não é decisão; é tarefa manual, sem responsável registrado.
- **O que destrava:** documentos externos coerentes com o registro.
- **Ver também:** outros-14, outros-15.

### lacuna-19
**Operação.**
- **O que é:** quem assina a página e os criativos enquanto o nome não sai; o teto de reuniões de venda do Júnior; meta e verba de mídia, com conta reversa em três cenários; parcelamento e taxa da Hotmart.
- **Valores e fontes:** ficha-de-fatos#nome-agencia, ficha-de-fatos#parcelamento, ficha-de-fatos#taxa-hotmart, ficha-de-fatos#meta-de-vendas; teto de reuniões e verba: não encontrados (ficha-de-fatos, "Não encontrado nas fontes"); CTX §10; Doc Mestre online (Decisões do cliente 1, 6 e 7).
- **Quem decide:** o Doc Mestre online diz que essas decisões "são do Júnior e do Euclides"; a taxa da Hotmart é do Euclides (Doc Mestre, próximos passos); o teto de reuniões está com o Júnior na E.M.V.
- **O que destrava:** a assinatura das peças, a agenda das Análises e a conta de mídia.
- **Ver também:** conflito-07, conflito-15.

### lacuna-20
**Aprovações do Júnior e do Euclides.**
- **O que é:** credenciais (#44; ficha-de-fatos#credenciais-44), promessa (#85), nome (#89), lead score como critério de qualificação (#98; base/lead-score.md), a informação da nova Análise (#92, só para informar), frase filosófica do problema, Big Domino v2 e Ponte da Epifania, falas do Euclides nos criativos, narrativas do Doc Mestre; e se o Júnior aceita a safra de clientes (#16), o "vendedor chato" (#26), publicar sobre gestão comercial (#29) e as histórias pessoais dos criativos.
- **Valores e fontes:** #16, #26, #29, #44, #85, #89, #92, #98; CTX §10, §11.
- **Quem decide:** o Júnior e o Euclides.
- **O que destrava:** as peças que usam cada um desses itens; enquanto pendentes, só como rascunho.

### lacuna-21
**Página antes de ir ao ar.**
- **O que é:** a nota do Deming como "adaptado de"; o depoimento do Júnior sobre o Marçal; o uso real de IA nas entregas 1, 3, 5 e 8; os demais pontos da lista da copy.
- **Valores e fontes:** CTX §7, §10; landing.
- **Quem decide:** não registrado.
- **O que destrava:** a publicação da landing-page-01.
- **Resolvido em parte em 08/11/2026:** o Deming está em ficha-de-fatos#deming-percentual, com a nota "Adaptado de" (resposta 2 do Otávio), e o título da seção 2 fica como está (#94). Os demais pontos continuam.
- **Ver também:** conflito-05, conflito-13.

### lacuna-22
**Sem decisão.**
- **O que é:** o PDV-90 como saída da Análise; as iscas; o "AVS" (citado pelo Júnior, a esclarecer); o preço real do curso e da sessão; o fechamento que o Euclides queria fazer no fim da call de 07/11.
- **Valores e fontes:** ficha-de-fatos#bonus-curso, ficha-de-fatos#bonus-caso; CTX §10; Doc Mestre online (Campanhas); Oferta online (Decisões do cliente, item 8).
- **Quem decide:** o preço do curso e da sessão está entre as "Decisões do cliente" da Oferta online; o PDV-90 é do Júnior, com o Otávio (plano aprovado, parte 5, conflito 10); os demais, não registrado.
- **O que destrava:** a saída da Análise e o valor de referência dos bônus.
- **Ver também:** conflito-10.

### lacuna-23
**Para depois.**
- **O que é:** CRM próprio (#70); quarto pilar, Marca; FigJam e apresentação do lançamento; linha editorial (Macronarrativas e os casos do Hacking Growth conferidos no livro); volta da Formação Estrategista e Growth Hacker e a ideia de franquia.
- **Valores e fontes:** #70; CTX §3, §10, §12.
- **Quem decide:** não registrado; o CRM próprio fica para depois da validação (#70).
- **O que destrava:** nada para o funil-01; fica registrado para não se perder.

### lacuna-24
**Fatos a confirmar.**
- **O que é:** comprovantes das credenciais; números finais da safra de julho e o que são os 127; data e autor de F7 e se o curso gravado é a Formação Estrategista e Growth Hacker; papel da Júlia; quem disse a tese do closer.
- **Valores e fontes:** ficha-de-fatos#total-dos-dois, ficha-de-fatos#lancamento-finch, ficha-de-fatos#camila-vieira, ficha-de-fatos#safra-de-julho, ficha-de-fatos#bonus-curso; CTX §7, §10.
- **Quem decide:** não é decisão; é confirmação. Os comprovantes são do Júnior e do Euclides (#44).
- **O que destrava:** o uso público de credenciais e números (CTX §8).
- **Ver também:** outros-11, outros-12, outros-13.

### lacuna-25
**Validação com donos.**
- **O que é:** 8 a 10 entrevistas com donos do perfil (F2) e teste de compreensão dos nomes das entregas; a Oferta online pede o teste com 10 donos antes da copy.
- **Valores e fontes:** CTX §10; Oferta online ("Próximos passos"); Ficha do Serviço online ("Próximos passos").
- **Quem decide:** não registrado.
- **O que destrava:** a persona como validada, não só pesquisada, e a confiança na copy.

---

## Parte 2 · Conflitos que afetam a landing-page-01 e o quiz-01, por prioridade

### conflito-01
**Critério de qualificação** (filtro do quiz e texto de "Para quem é").
- **O que é:** cinco cortes diferentes para quem a oferta serve. O quiz deixa passar quem a Ficha do Serviço recusa (dono sozinho, faturamento abaixo do corte da Ficha).
- **Valores e fontes:** ficha-de-fatos#criterio-de-qualificacao (versões a até e, cada uma com a sua fonte); ficha-de-fatos#volume-minimo.
- **Quem decide:** o Otávio com o Júnior e o Euclides (Doc Mestre online, decisão 9; a regra do quiz é do Júnior na E.M.V.).
- **O que destrava:** o filtro `qualificado` do quiz-01, o texto "Para quem é" e o FAQ da landing-page-01, e o público dos criativos.
- **Situação em 08/11/2026:** proposta registrada em base/lead-score.md, pendente do Júnior e do Euclides (#98). Até a aprovação, o campo segue em conflito e o lead score só serve como rascunho.
- **Ver também:** lacuna-12, conflito-16.

### conflito-02
**A Análise: valor, gratuidade, duração, quem conduz e nome.**
- **O que é:** a porta de entrada é descrita de um jeito no registro, de outro na landing e de outro no quiz.
- **Valores e fontes:** ficha-de-fatos#analise-valor, ficha-de-fatos#analise-gratuidade, ficha-de-fatos#analise-duracao, ficha-de-fatos#analise-quem-conduz, ficha-de-fatos#analise-nome-publico.
- **Quem decide:** o Otávio (#59 a #62 são dele); o Doc Mestre online põe o valor entre as decisões do Júnior e do Euclides (decisão 4), então o plano aprovado recomenda levar aos dois.
- **O que destrava:** a seção da Análise, o cartão da oferta e o passo 3 da landing-page-01; a fala final e o nome do quiz-01.
- **Resolvido em parte (#92, 08/11/2026):** a Análise passa a ser o diagnóstico do quiz (ficha-de-fatos#analise-conteudo); valor e gratuidade decididos (ficha-de-fatos#analise-valor, ficha-de-fatos#analise-gratuidade, ficha-de-fatos#analises-gratuitas); a reunião com o Júnior é a conversa de venda, sem preço. O Júnior e o Euclides devem ser informados na pauta de aprovação.
- **Continua em aberto:** o nome público (ficha-de-fatos#analise-nome-publico) e o que a #92 não define sobre a reunião com o Júnior: a duração (ficha-de-fatos#analise-duracao) e quem conduz (ficha-de-fatos#analise-quem-conduz).
- **Ver também:** lacuna-11, conflito-04.

### conflito-03
**Promessa do hero.**
- **O que é:** o Hero A usa o título de 23/10 (#33, substituição proposta em #85) e o subtítulo "sem precisar mudar uma vírgula no seu marketing", que a leitura 23 do CTX diz contradizer o método; a promessa de 08/11 (#85) está pendente, com ajustes não confirmados; o Hero B adapta a #33; o DS v1.0 traz a #33 como "Proposta de valor".
- **Valores e fontes:** #33, #85; CTX §6, §9 (leitura 23); Promessa central online; landing (Hero A, Hero B); DS (pagina-documentacao.html, "Proposta de valor").
- **Quem decide:** o Júnior e o Euclides aprovam a #85; o Otávio decide os ajustes.
- **O que destrava:** o título e o subtítulo da landing-page-01 e qualquer promessa no quiz-01.
- **Ver também:** lacuna-02.

### conflito-04
**Escassez e contador.**
- **O que é:** a barra de resgates e o contador "Total gerado" estão na página com números de exemplo; a regra pede contagem real, número fixo de Análises gratuitas e promoção com fim real.
- **Valores e fontes:** ficha-de-fatos#barra-de-resgates, ficha-de-fatos#total-dos-dois, ficha-de-fatos#urgencia; CTX §7, §8; Doc Mestre online (regra 3); landing.
- **Quem decide:** o Otávio (copy da barra, já resolvida pela #93); o contador "Total gerado", o Júnior e o Euclides (conflito-05); o número real depende do funil-01 (#90).
- **O que destrava:** a barra embaixo dos botões e o contador do hero da landing-page-01.
- **Resolvido em parte (#93, 08/11/2026):** o contador de escassez segue a regra de ficha-de-fatos#barra-de-resgates (contagem real, a partir do banco de dados, visível só acima do limite da regra). O contador "Total gerado" continua no conflito de credenciais, com o Júnior e o Euclides (conflito-05).
- **Ver também:** conflito-02, conflito-14.

### conflito-05
**Credenciais e nomes de terceiros.**
- **O que é:** os números das credenciais divergem; a faixa "nos bastidores de" com seis nomes, o mosaico de fotos e o depoimento do Júnior sobre o Marçal estão na página sem comprovante nem autorização de nome e imagem (Código Civil, art. 18); "um dos maiores" sem prova.
- **Valores e fontes:** ficha-de-fatos#total-dos-dois, ficha-de-fatos#lancamento-finch, ficha-de-fatos#camila-vieira; #25, #44; CTX §7, §8; landing.
- **Quem decide:** o Júnior e o Euclides (#44), com os comprovantes.
- **O que destrava:** a seção de credenciais, o contador e as fotos da landing-page-01.
- **Ver também:** lacuna-16, lacuna-24.

### conflito-06
**Portas e destinos (#66 contra #90).**
- **O que é:** o registro tem três portas com e sem VSL, com a Calculadora como porta (#66; Doc Mestre online); na landing, todos os botões levam à Análise e a calculadora saiu; a #90 propõe substituir a #66 (pendente).
- **Valores e fontes:** #66, #90; CTX §3, §10; Doc Mestre online; landing; log.md (Pendências).
- **Quem decide:** o Júnior e o Euclides (aprovação da #90).
- **O que destrava:** a arquitetura da landing-page-01 e do quiz-01; enquanto a #90 estiver pendente, os dois só como rascunho.
- **Ver também:** lacuna-13, conflito-14.

### conflito-07
**Quem assina e nome da agência.**
- **O que é:** o nome da agência e a assinatura das peças variam entre as fontes; o DS diz "Euclides Vieira e Júnior Neves formam a Triad".
- **Valores e fontes:** ficha-de-fatos#nome-agencia, ficha-de-fatos#grafia-junior; #89; DS (pagina-documentacao.html).
- **Quem decide:** o Júnior e o Euclides.
- **O que destrava:** o rodapé do quiz-01 e a assinatura da landing-page-01 e dos criativos.
- **Ver também:** lacuna-07, lacuna-19.

### conflito-08
**Design.**
- **O que é:** quatro referências visuais que não batem: o DS v1.0 (fundo escuro, só a paleta oficial, Menta como ação primária, Geist); a paleta branco e verde aprovada pelo Júnior "pela sequência (confirmar)" (#81; F25); os botões laranja #FF8400 pedidos pelo Otávio em 03/11 (landing); "O design system Triad v2 vale até o nome novo sair" (#45; Doc Mestre online, regra 9).
- **Valores e fontes:** #45, #81; F25; DS (LEIA.md, safra-tokens.json, pagina-documentacao.html); landing; Doc Mestre online.
- **Quem decide:** o Otávio com o Júnior (#81 foi dele); já está nas pendências do log.md. **Levar ao Júnior** (resposta 4 do Otávio, 08/11/2026: a adoção do design system v1.0 vai para a pauta com o Júnior e fica como está).
- **O que destrava:** a etapa de design da landing-page-01 e do quiz-01.
- **Ver também:** conflito-18 (a identidade visual da cópia nova do quiz-01).

### conflito-09
**O quiz promete resultado e não pede consentimento.**
- **O que é:** o quiz diz que o sistema "pode aumentar seu faturamento em até X%" (X calculado no código, `planoPct`); a Promessa central online guarda promessa percentual até haver casos, e a #39 e o CTX §8 (CONAR; CDC, art. 30) vedam resultado prometido. O CTX §8 e o Doc Mestre online (regra 8) pedem consentimento LGPD no quiz; o quiz pede e-mail e WhatsApp sem texto de consentimento.
- **Valores e fontes:** #39; CTX §8; Promessa central online; Doc Mestre online (regra 8); quiz.
- **Quem decide:** o Otávio com o Júnior (o quiz é o artefato do Júnior; CTX §3).
- **O que destrava:** a publicação do quiz-01.
- **Ver também:** conflito-19 (a promessa "até X%" na cópia nova do quiz-01, fontes/quiz-01-repositorio-2026-11-08/).

### conflito-10
**Plano de ação de 90 dias como saída.**
- **O que é:** o quiz oferece "plano de ação de 90 dias" pelo WhatsApp; a landing mostra o PDV-90 como saída da Análise; nenhuma decisão o põe como entrega, e o Doc Mestre online tem "Plano de ação entregue no fim da reunião" como subtarefa a fazer.
- **Valores e fontes:** CTX §10 (lacuna 22); quiz; landing; Doc Mestre online (E.M.V.).
- **Quem decide:** o Júnior, com o Otávio.
- **O que destrava:** o fim do quiz-01 e a promessa da seção da Análise na landing-page-01.
- **Ver também:** lacuna-22.

### conflito-11
**A página ainda no formato antigo.**
- **O que é:** outro número de entregas e a "Mentoria 1:1" (ver ficha-de-fatos#numero-de-entregas; contra #52, #53 e #83); calendário com a Análise numa semana diferente da registrada (ver ficha-de-fatos#quando-entrega-1; contra #72); gerente de safra no FAQ (formato anterior a 07/11); "as dez começam juntas" (contra #65); GSAAS nas seções 5 e 6 e no FAQ (contra #68); "gerente comercial" a alinhar com a promessa (#86).
- **Valores e fontes:** ficha-de-fatos#numero-de-entregas, ficha-de-fatos#quando-entrega-1, ficha-de-fatos#vagas; #52, #53, #65, #68, #72, #83, #86; landing; CTX §10 (lacunas 5, 14, 15, 17).
- **Quem decide:** o Otávio (as regras são dele).
- **O que destrava:** as seções 5, 6, 9 e o FAQ da landing-page-01.
- **Resolvido em 08/11/2026 (aplicação do registro, sem decisão nova):** a landing segue o registro: as entregas de ficha-de-fatos#numero-de-entregas (#52, #56), "Sessões de Comando" no lugar de "Mentoria 1:1" (#53, #83), a Análise Estratégica das Safras (entrega 1) na semana de ficha-de-fatos#quando-entrega-1 (#72), nada de GSAAS nem de gerente de safra (#68), nada de "as dez começam juntas" (#65). Continua em aberto só o alinhamento do "gerente comercial" (#86) com a promessa (#85, pendente; lacuna-02).
- **Ver também:** lacuna-05, lacuna-14, lacuna-15, lacuna-17.

### conflito-12
**Vocabulário do DS contra o do método.**
- **O que é:** o DS nomeia as etapas "lead qualificado, reunião marcada, reunião realizada, venda"; a Ficha do Serviço online e o quiz dizem "pré-qualificação, agendamento, comparecimento, fechamento"; F12 dá os estágios "captado, pré-qualificado, agendado, realizado, venda". O DS proíbe "SDR", "closer" e "pipeline" na comunicação de topo; a landing usa "closer" e "SDR" no diagrama da seção 2. O DS escreve "Júnior Neves".
- **Valores e fontes:** ficha-de-fatos#metas-por-etapa, ficha-de-fatos#grafia-junior; DS (pagina-documentacao.html, Linguagem); Ficha do Serviço online; F12; quiz; landing.
- **Quem decide:** o Otávio.
- **O que destrava:** o vocabulário da landing-page-01 e do quiz-01 e o glossário (lote 3).
- **Resolvido em 08/11/2026 (respostas 3 e 5 do Otávio às perguntas da etapa 3):** na comunicação de topo, só as palavras que o comprador já usa (regra de 22/10, reafirmada em 08/11). Em público, as etapas têm os nomes do método (pré-qualificação, agendamento, comparecimento, fechamento; ficha-de-fatos#metas-por-etapa); a forma do DS ("lead qualificado, reunião marcada, reunião realizada") perde, porque "reunião" é palavra queimada para a persona. "SDR" e "closer" saem da comunicação de topo. Os termos do método e os nomes de etapa do DS ficam para dentro. Grafia: "Junior Neves" em público, confirmado em 08/11 (ficha-de-fatos#grafia-junior); a divergência do DS está em base/design-system/design-system.md.

### conflito-13
**O número de Deming no título da seção 2.**
- **O que é:** a landing traz "94%* dos problemas de vendas são problemas de Sistema de Vendas", sem "Adaptado de"; o CTX §6 manda nunca dizer "94% do seu problema de vendas"; Deming fala de empresas em geral (CTX §7); a nota "Adaptado de" segue em aberto.
- **Valores e fontes:** CTX §6, §7, §10 (lacuna 21); landing (seção 2).
- **Quem decide:** o Otávio.
- **O que destrava:** o título da seção 2 da landing-page-01.
- **Resolvido (#94, 08/11/2026):** o título da seção 2 fica como está, com o asterisco; é exceção registrada em `tom-de-voz`. O percentual e a nota "Adaptado de" estão em ficha-de-fatos#deming-percentual.
- **Ver também:** lacuna-21.

### conflito-14
**#90 pendente e a data do funil.**
- **O que é:** tudo o que a landing e o quiz usam do funil-01 (Supabase, planilha, SDR) depende de uma decisão pendente; a data de início do funil pode atrasar.
- **Valores e fontes:** ficha-de-fatos#inicio-do-funil; #50, #90; log.md (Pendências: "Prazo").
- **Quem decide:** o Júnior e o Euclides (#90); o Otávio (data).
- **O que destrava:** a integração do quiz-01 e da landing-page-01 com o banco e a agenda do SDR.
- **Ver também:** conflito-06.

### conflito-15
**Parcelamento no FAQ.**
- **O que é:** o FAQ da landing responde que dá para parcelar, enquanto o registro diz que o parcelamento está a definir e há uma proposta de parcelas.
- **Valores e fontes:** ficha-de-fatos#parcelamento, ficha-de-fatos#taxa-hotmart, ficha-de-fatos#meio-de-pagamento; CTX §3; Oferta online; landing (FAQ "Posso parcelar?").
- **Quem decide:** o Otávio com o Euclides (taxa da Hotmart).
- **O que destrava:** o FAQ da landing-page-01 e a fala de pagamento na call.
- **Ver também:** lacuna-19.

### conflito-16
**Critério de qualificação do quiz-01: o corte do Júnior contra o lead score.**
- **O que é:** a cópia nova do quiz (fontes/quiz-01-repositorio-2026-11-08/) decide quem é pré-qualificado por um corte fixo; a base propõe o lead score. Os dois mandam o lead para caminhos diferentes no fim do quiz.
- **Lado 1 · o corte do Júnior:** pré-qualificado é quem fatura pelo menos R$ 50 mil por mês e tem pelo menos 1 vendedor que faz reunião de vendas; "o corte final será revisto depois"; quem não se encaixa recebe o diagnóstico com a chamada "Clique se você tem interesse que alguém da nossa equipe chame você para falar mais sobre esse assunto." Fonte: CLAUDE.md do quiz ("Cliente ideal"; "Decisões (24/10/2026)", "Pré-qualificação" e "Não qualificado"; "Contexto da reunião de 23/10"); MANUAL DO DIAGNÓSTICO (RASCUNHO).md (seção 1 e M2, "[Junior · 24/10]"); LEIA PRIMEIRO.md (regra 5); mockups/quiz-diagnostico.html (função `qualificado`). É a versão (e) de ficha-de-fatos#criterio-de-qualificacao.
- **Lado 2 · o lead score:** três eliminatórios (nenhum vendedor; faturamento abaixo de R$ 50 mil; valor médio da venda abaixo de R$ 5 mil), nota de 0 a 100 e faixas A, B e C; eliminatórios e faixa C vão para a nutrição, fora da fila do SDR. Fonte: base/lead-score.md; #98 (pendente do Júnior e do Euclides).
- **Quem decide:** o Otávio com o Júnior e o Euclides (#98; a regra atual do quiz é do Júnior).
- **O que destrava:** o caminho do fim do quiz-01 (oferta do plano, relatório com "Tenho interesse" ou nutrição) e a fila do SDR.
- **Bloqueado para entrega até a decisão.** A copy do quiz-01 traz os dois lados escritos, sem escolher.
- **Ver também:** conflito-01, lacuna-12.

### conflito-17
**Destino dos contatos do quiz-01: Triad CRM contra o banco e a planilha da #90.**
- **O que é:** a cópia nova do quiz manda os contatos para um CRM; o funil-01 manda para o banco de dados e a planilha do SDR.
- **Lado 1 · Triad CRM:** "Destino dos contatos: Triad CRM, numa conta nova só da agência (negócio distinto dos outros), com a origem marcada como já acontece nos outros negócios"; "Automação no CRM depois". Fonte: CLAUDE.md do quiz ("Decisões (24/10/2026)", "Destino dos contatos" e "Pré-qualificação"); LEIA PRIMEIRO.md ("O que falta": "envio dos contatos para uma conta nova no Triad CRM, com a origem marcada"); MANUAL DO DIAGNÓSTICO (RASCUNHO).md (M2: "depois vira automação no CRM").
- **Lado 2 · banco e planilha:** o quiz envia respostas, contato, consentimento e etiqueta ao garçom, que grava no Supabase; a planilha do SDR recebe as faixas A e B e devolve o status ao banco. A #90 substitui "o CRM do Doc Mestre". Fonte: #90 (pendente do Júnior e do Euclides); funis/funil-01/funil.md ("Caminho do dado"); dados/planta/planta.md.
- **Quem decide:** o Júnior e o Euclides (aprovação da #90).
- **O que destrava:** o envio do quiz-01 (etapa 14 deixa o envio desligado) e a integração com o SDR.
- **Bloqueado para entrega até a decisão.**
- **Ver também:** conflito-06, conflito-14.

### conflito-18
**Identidade visual do quiz-01: Triad escura com verde neon contra o design system v1.0 e a #81.**
- **O que é:** a cópia nova do quiz tem identidade visual própria, diferente das referências que já estão em conflito na base.
- **Lado 1 · Triad escura com verde neon:** "variação da identidade da Triad: base escura, verde neon, fontes do site da Triad"; "A paleta do Safra (verde-claro, verde-folha, tomate) foi testada na v2 e reprovada por não ter cara de Triad"; "capa escura, verde neon; abertura e conversa em fundo claro". Fonte: CLAUDE.md do quiz ("Decisões (24/10/2026)", "Visual (24/10, corrigido)"); LEIA PRIMEIRO.md (regra 3); mockups/quiz-diagnostico.html. O mapa de fidelidade da REA (C1, C2, A7) ainda fala em fundo claro e verde-folha, de antes da correção.
- **Lado 2 · design system v1.0 e a #81:** o DS v1.0 (fundo escuro, só a paleta oficial, Menta como ação primária, Geist), cuja adoção não está decidida, e a paleta branco e verde aprovada pelo Júnior "pela sequência (confirmar)". Fonte: fontes/design-system-v1.0/; base/design-system/design-system.md; #81; F25; #45 (Triad v2 vale até o nome novo sair).
- **Quem decide:** o Otávio com o Júnior (como no conflito-08; levar ao Júnior).
- **O que destrava:** o visual do quiz-01. Até a decisão, o visual do mockup fica como está (prompts/07-fila-da-noite.md, etapa 14).
- **Bloqueado para entrega até a decisão.**
- **Ver também:** conflito-08.

### conflito-19
**A promessa "pode aumentar seu faturamento em até X%" na cópia nova do quiz-01.**
- **O que é:** a oferta do plano de ação de 90 dias, no fim do quiz, promete um aumento percentual de faturamento calculado na hora.
- **Lado 1 · a promessa do quiz:** o plano de 90 dias é oferecido "para resgatar parte desse dinheiro e instalar um sistema de vendas que pode aumentar seu faturamento em até X%", com X = 70% do dinheiro na mesa por mês dividido pelo que o funil fatura hoje, arredondado para baixo. Quem decidiu não está escrito. Fonte: CLAUDE.md do quiz ("Decisões (08/11/2026): oferta do plano de ação de 90 dias"); mockups/quiz-diagnostico.html (função `planoPct` e tela "plano").
- **Lado 2 · a conformidade:** "Sem garantia" e "nenhuma promessa em contrato, de nenhum tipo" (#39); nada de percentual de melhora em peça antes de caso comprovado (Promessa central online; Mecanismo único online; CONAR; CDC, art. 30); o próprio manual do quiz manda escrever o dinheiro na mesa "como conta, nunca como promessa" e, numa sugestão ainda sem aprovação do Júnior, proíbe "vai dobrar" (MANUAL DO DIAGNÓSTICO, seções 5 e 6). Fonte: #39; CTX §8; base/provas-e-conformidade.md; base/tom-de-voz.md ("Promessa percentual de melhora").
- **Quem decide:** o Otávio com o Júnior (o quiz é do Júnior; CTX §3).
- **O que destrava:** a tela da oferta do plano no quiz-01. A copy do quiz-01 sai sem o percentual, como a etapa 13 manda, e a troca vai para o Júnior aprovar (pauta, item 29).
- **Bloqueado para entrega até a decisão.**
- **Ver também:** conflito-09, conflito-10.

---

## Parte 3 · Conflitos que não afetam a landing nem o quiz

### outros-01
**Meta de vendas contra a agenda do Júnior.**
- **O que é:** a engenharia reversa diz que a meta e a entrega não cabem no mesmo mês; caminhos A, B e C (o C mexe na #78).
- **Valores e fontes:** ficha-de-fatos#meta-de-vendas, ficha-de-fatos#calendario-por-dia, ficha-de-fatos#inicio-de-cada-cliente; #50, #78; Engenharia reversa online; CTX §9 (leitura 6).
- **Quem decide:** o Júnior e o Euclides.
- **O que destrava:** o ritmo de venda e o calendário de inícios.
- **Ver também:** lacuna-01.

### outros-02
**Essencial: desenho e preço.**
- **O que é:** Instalação em 15 dias ou versão em grupo; preço "decidido" (Downsell online) contra "hipótese" (Engenharia reversa online e a própria nota de 08/11 do Downsell online).
- **Valores e fontes:** ficha-de-fatos#downsell-preco, ficha-de-fatos#downsell-desenho; #37, #42, #60.
- **Quem decide:** o Otávio, o Júnior e o Euclides.
- **O que destrava:** a oferta depois do não.
- **Ver também:** lacuna-03.

### outros-03
**Quantidade de calls em grupo.**
- **O que é:** a Ficha do Serviço e a Promessa central dão quantidades diferentes, o que pesa na agenda do Euclides.
- **Valores e fontes:** ficha-de-fatos#calls-em-grupo; #78, #79, #85.
- **Quem decide:** não registrado; a agenda é do Júnior e do Euclides.
- **O que destrava:** o compromisso de agenda do Euclides e o texto do contrato.

### outros-04
**GSAAS em aberto.**
- **O que é:** desenho, preço, quem conduz o grupo e a grafia GSAAS ou GSaaS.
- **Valores e fontes:** ficha-de-fatos#gsaas; #38, #84; PAINEL.
- **Quem decide:** para depois (#84); a grafia, "a confirmar com o Otavio" (PAINEL).
- **O que destrava:** a continuidade e a conta da implementação.
- **Ver também:** lacuna-06.

### outros-05
**Papéis da entrega.**
- **O que é:** analista, redator, revisor de calls, CS e tecnologia sem dono.
- **Valores e fontes:** #84; Engenharia reversa online (ponto 6); CTX §10 (lacuna 4).
- **Quem decide:** ver lacuna-04.
- **O que destrava:** a capacidade e o custo.
- **Ver também:** lacuna-04.

### outros-06
**Contrato desatualizado.**
- **O que é:** o contrato ainda tem outro número de entregas e não tem o formato de 07/11.
- **Valores e fontes:** ficha-de-fatos#numero-de-entregas; CTX §12 (linha "Contrato da IASV Safra").
- **Quem decide:** ver lacuna-10.
- **O que destrava:** a primeira venda.
- **Ver também:** lacuna-10.

### outros-07
**Tese da Triad com growth hacking.**
- **O que é:** a tese nova (#82) está para ser escrita; falta saber se os pilares viram as quatro áreas do growth hacking.
- **Valores e fontes:** #43, #82; CTX §3, §6.
- **Quem decide:** o Otávio escreve e o Júnior valida (#82).
- **O que destrava:** o conteúdo e a apresentação da Triad.
- **Ver também:** lacuna-07.

### outros-08
**Tese do closer, autoria.**
- **O que é:** a tese vira macronarrativa (#87), com a autoria a confirmar.
- **Valores e fontes:** #87; F25; CTX §3.
- **Quem decide:** o Júnior.
- **O que destrava:** a macronarrativa nova.
- **Ver também:** lacuna-08.

### outros-09
**Lucro por lead pede a margem.**
- **O que é:** o Relatório não mede lucro sem a margem do cliente.
- **Valores e fontes:** #85; CTX §10 (lacuna 9).
- **Quem decide:** ver lacuna-09.
- **O que destrava:** a medição da promessa.
- **Ver também:** lacuna-09.

### outros-10
**Safra de clientes.**
- **O que é:** sem a safra de clientes no método, "vender mais vezes" fica sem entrega; hoje só o bônus da Análise da base sustenta essa parte.
- **Valores e fontes:** ficha-de-fatos#bonus-analise-base; #16; CTX §9 (leitura 5); Oferta online; Ficha do Serviço online.
- **Quem decide:** o Júnior (a proposta vai a ele).
- **O que destrava:** a recompra no método e na copy.

### outros-11
**Credenciais autodeclaradas do Júnior de 07/11.**
- **O que é:** profissão de social media, curso pioneiro de growth hacking, Staage, MBA do Flávio Augusto, sem comprovante.
- **Valores e fontes:** CTX §3, §7 ([PROVA REAL]); F25.
- **Quem decide:** não é decisão; é comprovação, do Júnior (#44).
- **O que destrava:** o uso dessas credenciais em peça.
- **Ver também:** lacuna-24.

### outros-12
**Números finais da safra de julho e os 127.**
- **O que é:** a safra fechou sem números finais registrados, e o sentido dos 127 diverge entre F1 e F7.
- **Valores e fontes:** ficha-de-fatos#safra-de-julho; F1; F7; CTX §3, §10.
- **Quem decide:** não é decisão; é confirmação do Júnior.
- **O que destrava:** a safra de julho como primeiro exemplo interno e, com autorização (#27), como prova.
- **Ver também:** lacuna-24.

### outros-13
**F7, o curso e a Júlia.**
- **O que é:** data e autor de F7; se o curso gravado é a Formação Estrategista e Growth Hacker; o papel da Júlia.
- **Valores e fontes:** ficha-de-fatos#bonus-curso; CTX §3, §10.
- **Quem decide:** não é decisão; é confirmação.
- **O que destrava:** o valor de referência do bônus e o uso de F7 como fonte.
- **Ver também:** lacuna-24.

### outros-14
**Painel interativo e apresentação comercial.**
- **O que é:** o painel (v4.10) e a apresentação comercial não receberam #70 a #89; o slide da Análise contraria a #61.
- **Valores e fontes:** #61; CTX §12; 04-apresentacoes/LEIA.md; PAINEL.
- **Quem decide:** não registrado; o painel espera a engenharia reversa (CTX §12).
- **O que destrava:** materiais internos coerentes com o registro.
- **Ver também:** lacuna-18.

### outros-15
**Restos no Google Docs do Doc Mestre.**
- **O que é:** a limpeza manual descrita na lacuna 18 do CTX.
- **Valores e fontes:** CTX §10 (lacuna 18), §12.
- **Quem decide:** não é decisão; tarefa manual.
- **O que destrava:** o Doc Mestre do Google Docs igual ao online.
- **Ver também:** lacuna-18.

### outros-16
**Simulador.**
- **O que é:** o simulador (versão 5, 01/11) precisa ser refeito no formato de 07/11; as premissas estão em hipótese.
- **Valores e fontes:** CTX §3 ("Conta"), §12.
- **Quem decide:** não registrado.
- **O que destrava:** a conta de custo e de mídia no formato atual.

### outros-17
**Site aberto, sem senha.**
- **O que é:** sv-safra.soulstory.com.br está aberto, com o painel interno.
- **Valores e fontes:** CTX §12; log.md (Pendências: "Segurança").
- **Quem decide:** o Otávio (pendência de segurança do log.md).
- **O que destrava:** fecha a exposição do material interno.
- **Resolvido como risco aceito (#97, 08/11/2026):** o site fica aberto, sem porteiro, no MVP.

### outros-18
**Art. 49 do CDC numa venda para empresa.**
- **O que é:** se o direito de arrependimento do CDC (art. 49) também se aplica quando a venda é para uma empresa que usa o serviço no próprio negócio. O reembolso de 7 dias pela Hotmart já vale de qualquer forma (ficha-de-fatos#arrependimento).
- **Valores e fontes:** ficha-de-fatos#arrependimento; Oferta online ("Cuidado jurídico"); Downsell online; CTX §8.
- **Quem decide:** um advogado (Otávio, 08/11/2026).
- **O que destrava:** a cláusula do contrato, antes da primeira venda.
- **Ver também:** lacuna-10.

### outros-19
**A fala do Júnior para a call de venda.**
- **O que é:** a mesma fala aparece de dois jeitos: "Me dá 3 semanas" (Promessa central online) e "Me dá uma semana" (One pager online). Bloqueada para entrega até a decisão.
- **Valores e fontes:** Promessa central online; One pager online; promessa (base/promessa.md).
- **Quem decide:** o Otávio, confirmando com o Júnior (Otávio, 08/11/2026).
- **O que destrava:** o roteiro da call e as peças que citam a fala.

### outros-20
**Cultivo como nome antigo de Plantio · levar ao Júnior.**
- **O que é:** o glossário liga o Cultivo ao Plantio como nome a evitar, com a nota de que a correspondência não está confirmada (CTX §13).
- **Valores e fontes:** GLOSSARY.md (verbete Plantio); CTX §13.
- **Quem decide:** o Júnior (resposta 6 do Otávio, 08/11/2026: vai para a pauta com o Júnior e fica como está).
- **O que destrava:** o verbete Plantio do glossário.

### outros-21
**Liberação das 18 tentativas · levar ao Júnior.**
- **O que é:** a fonte pede confirmar com o Júnior que a regra das tentativas segue valendo e liberar as histórias da operação usadas nos talking heads.
- **Valores e fontes:** ficha-de-fatos#tentativas-ate-abandonado, ficha-de-fatos#credenciais-44; Criativos rodada 1 online; F1.
- **Quem decide:** o Júnior (resposta 8 do Otávio, 08/11/2026: vai para a pauta com o Júnior, junto com as credenciais, e fica como está).
- **O que destrava:** o uso das tentativas e das credenciais em peça.
- **Ver também:** lacuna-20, lacuna-24.

### outros-22
**Revisão programada do lead score.**
- **O que é:** depois das primeiras 50 respostas reais do quiz, conferir se as faixas do lead score batem com quem agendou e comprou. Nada vai para aprendizados/ antes disso, porque ainda não há dado.
- **Valores e fontes:** base/lead-score.md ("Revisão programada"); #98.
- **Quem decide:** o Otávio, com os dados do banco; a mudança no lead score segue a aprovação da #98.
- **O que destrava:** uma ficha em aprendizados/ (hipótese, confirmado ou descartado) e, se for o caso, nova versão do lead score.

### outros-23
**Prazo de guarda dos dados dos leads.**
- **O que é:** por quanto tempo o banco de dados guarda os dados de cada lead (contato, consentimento, respostas do quiz e eventos), o que acontece no fim do prazo (apagar ou deixar só números sem identificação) e como se atende o lead que pede para apagar os dados ou retira o consentimento. Nenhuma fonte trata do assunto.
- **Valores e fontes:** nenhum valor registrado. dados/planta/planta.md ("Prazo de guarda"); `provas-e-conformidade`, "LGPD"; prompts/05-fila-de-trabalho.md, "Etapa 6 · Planta do banco".
- **Quem decide:** não registrado; a fonte pede revisão de advogado antes da primeira peça (CTX §8; lacuna-10).
- **O que destrava:** a regra de guarda e de apagamento da planta do banco. Até a decisão, nada é apagado automaticamente (prompts/05-fila-perguntas.md, 6.8).
- **Ver também:** conflito-09 (o texto de consentimento do quiz-01, que diz a finalidade), lacuna-10.
