---
id: oferta
versao: 1
status: pendente-aprovacao
aprovado_por:
  otavio: 2026-11-08
  junior: pendente
  euclides: pendente
depende_de:
  - id: ficha-de-fatos
    versao: 2
  - id: decisoes
    versao: 1
  - id: lacunas
    versao: 2
  - id: produto
    versao: 1
  - id: entregas-do-servico
    versao: 1
  - id: mecanismo
    versao: 1
  - id: promessa
    versao: 1
desatualizado: true
---

# Oferta · Implementação Avançada do Sistema de Vendas Safra

A oferta montada: a oferta em uma página, a equação de valor, os obstáculos do comprador, o pacote e os bônus, o preço e as âncoras, a garantia e o que reduz o risco no lugar dela, a urgência, o roteiro da call e da página, a porta de entrada e o downsell. Todos os valores são citados pela `ficha-de-fatos`; nenhum é copiado.

**Status.** Pendente de aprovação. O núcleo foi aprovado pelo Júnior e pelo Euclides em 27/10 ("Big Idea, mecanismo, oferta, entregáveis e bônus aprovados", #48). Depois disso vieram as revisões #52 a #65, #70 a #79 e #83 a #88; as do Otávio "valem como direção de trabalho" (CTX §11), e a Ficha do Serviço online registra que a ficha "no formato de 07/11, ainda precisa da leitura do Júnior e do Euclides". Enquanto o Júnior e o Euclides estiverem pendentes, este documento só serve de base para rascunho, avisando que pode mudar (nucleo/regras/versionamento.md).

**O que vem de onde.** Formato do serviço: `produto`. Cada entrega: `entregas-do-servico`. Problema, Big Idea e crença: `mecanismo`. Promessa: `promessa` (pendente; nada dela vai para entrega antes da aprovação dos sócios). Decisões por #n; pendências pelo id de `lacunas`.

**Diagnóstico honesto** (Oferta online): "A oferta é forte em mecanismo e fraca em probabilidade percebida: não há caso de cliente, não há garantia e a autoridade pública do Júnior não é de vendas. O que segura a oferta é a Análise Estratégica das Safras: o comprador vê o mecanismo funcionar com os números dele antes de pagar."

---

## A oferta em uma página

| Peça | O que vale | Status e fonte |
|---|---|---|
| Em uma frase | **Não usar o texto da fonte.** A Oferta online e o One pager online ainda abrem com o título da promessa de 23/10 (#33). As duas promessas estão pendentes do Júnior e do Euclides e não podem ir para entrega (ver `promessa`) | decisoes #33, #85; Oferta online; One pager online |
| Núcleo | A Implementação Avançada do Sistema de Vendas Safra: o formato de `produto` e as entregas de `entregas-do-servico`, no CRM que o cliente já usa, com as Sessões de Comando, as calls em grupo com análise de calls e o grupo de suporte | Aprovado em #48; revisto em #52, #56, #70 a #79, #83, #88; Oferta online ("Núcleo") |
| Bônus | Curso gravado do Júnior para o time (ficha-de-fatos#bonus-curso); Análise Estratégica da base de clientes (ficha-de-fatos#bonus-analise-base) | Aprovados em #48 |
| Bônus pela troca | Sessão extra com o Júnior para quem autoriza virar caso documentado (ficha-de-fatos#bonus-caso) | Aprovado em #48 |
| Preço | ficha-de-fatos#preco-avancada; depois, ficha-de-fatos#preco-avancada-depois, cobrado de verdade | #57; #19 |
| Pagamento | ficha-de-fatos#meio-de-pagamento. Parcelamento: ficha-de-fatos#parcelamento, **campo em conflito · bloqueado para entrega até a decisão**. Taxa: ficha-de-fatos#taxa-hotmart (em aberto) | #54; conflito-15, lacuna-19 |
| Vagas | ficha-de-fatos#vagas; só vendas da Avançada contam (ficha-de-fatos#vendas-que-contam); início de cada cliente em aberto (ficha-de-fatos#inicio-de-cada-cliente) | #63, #64, #65 |
| Porta de entrada | A Análise na versão da call (ficha-de-fatos#analise-conteudo). Nome, valor, gratuidade, duração e quem conduz estão em ficha-de-fatos#analise-nome-publico, ficha-de-fatos#analise-valor, ficha-de-fatos#analise-gratuidade, ficha-de-fatos#analise-duracao e ficha-de-fatos#analise-quem-conduz, **todos em conflito · bloqueados para entrega até a decisão**. Abatimento: ficha-de-fatos#analise-abatimento (proposta) | #49, #59, #61, #62, #66; lacuna-11, conflito-02 |
| Garantia | ficha-de-fatos#garantia. Reembolso pela Hotmart: ficha-de-fatos#arrependimento | #39; #91; outros-18 |
| Continuidade | O GSAAS, opcional, oferecido no Relatório de Produtividade: ficha-de-fatos#gsaas (para depois) | #38, #58, #84; lacuna-06 |
| Downsell | A Implementação Essencial, só depois do não à Avançada: ficha-de-fatos#downsell-nome, ficha-de-fatos#downsell-preco (**em conflito · bloqueado para entrega até a decisão**) e ficha-de-fatos#downsell-desenho (em revisão) | #37, #42, #60; lacuna-03 |

---

## Equação de valor

"Valor percebido = (resultado desejado + probabilidade percebida) dividido por (tempo até o resultado + esforço)." As notas são de trabalho, "a validar nas entrevistas"; não são fatos (Oferta online).

| Componente | Hoje | Com a Análise antes da compra | Por quê (resumo da fonte) |
|---|---|---|---|
| Resultado desejado | 7 | 7 | Forte e concreto, mas ainda sem número |
| Probabilidade percebida | 3 | 6 | Sem caso, sem garantia e sem autoridade comercial pública; a Análise mostra o mecanismo com os números do próprio prospect |
| Tempo até o resultado | 3 | 2 | Primeiro valor na Análise (ficha-de-fatos#quando-entrega-1), sistema instalado (ficha-de-fatos#sistema-instalado) e Colheita depois; com a Análise antes da compra, o primeiro valor vem antes de pagar |
| Esforço do cliente | 4 | 4 | O time do cliente executa as mudanças (ficha-de-fatos#execucao-do-time); depois, uma call em grupo por semana e as ligações |

**O que a conta mostra** (Oferta online): o gargalo é a probabilidade percebida. Sem garantia, ela só sobe com três coisas, nesta ordem: a demonstração com os números do prospect (a Análise antes da compra); a resposta a "Vocês usam o que vendem?" (o sistema roda no leilão do Júnior; mostrar o painel numa call privada é decisão do Júnior, ainda aberta); e os casos, porque as primeiras vendas "são a fábrica dos primeiros casos". A primeira venda recuperada vem depois do sistema instalado: "hipótese, a medir nos primeiros clientes".

---

## Os obstáculos do comprador

Tirados da persona (F2), do mapa de empatia (F3) e da Ficha do Serviço (Oferta online, "Os obstáculos do comprador e o que resolve cada um").

| # | Obstáculo, na cabeça do comprador | O que resolve |
|---|---|---|
| 1 | "Não sei onde a minha venda trava." | Análise Estratégica das Safras (entrega 1) |
| 2 | "O relatório do mês não me diz nada." | Implementação da Infraestrutura e Painel de Safras (entregas 2 e 5) |
| 3 | "Não sei quanto dinheiro está parado." | Análise Estratégica das Safras e Recuperação de Ativos (entregas 1 e 4) |
| 4 | "Meu time larga o lead quando o mês vira." | A regra "perdido só com um não", na Implementação da Infraestrutura, e a régua de contato do Playbook de Comunicação Persuasiva (entregas 2 e 3) |
| 5 | "Meu time não segue processo." | Playbook de Comunicação Persuasiva e Treinamento para Otimização da Conversão (entregas 3 e 6); a automação por agentes de IA fica para a Mecanização da Safra, no GSAAS |
| 6 | "Vendedor novo não sabe as etapas nem as metas." | Bônus: curso gravado do Júnior |
| 7 | "O follow-up depende da memória do vendedor." | Entregas 3 e 6; o acompanhamento automático por agentes de IA fica para o GSAAS |
| 8 | "Metade das reuniões não acontece." | Entregas 3 e 6; o lembrete automático por agentes de IA fica para o GSAAS |
| 9 | "Meu CRM é uma bagunça ou uma planilha." | Implementação da Infraestrutura (entrega 2) |
| 10 | "Trocar de CRM dá trabalho." | Resolvido: a implementação funciona no CRM que ele já usa, sem troca (#70) |
| 11 | "Não tenho tempo para gerir o comercial." | O Júnior e o Euclides conduzem a call semanal em grupo; o cliente dá o setup (ficha-de-fatos#execucao-do-time) e uma call por semana depois |
| 12 | Que o preço (ficha-de-fatos#preco-avancada) "sem saber se funciona é muito." | Análise antes da compra (condições em conflito, ver a porta de entrada); parcelamento pela Hotmart (ficha-de-fatos#parcelamento, em conflito) |
| 13 | "Já paguei caro por mentoria que não entregou." | "Não é mentoria nem curso, é implementação": as entregas com critério de pronto e o Júnior nas Sessões de Comando (#53) |
| 14 | "Vou ficar sozinho depois de assinar." | O grupo de WhatsApp da empresa, com CS e IA; a call semanal em grupo com o Júnior e o Euclides; a sessão extra com o Júnior |
| 15 | "Vocês usam o que vendem?" | O sistema roda no leilão do Júnior; painel mostrado na call (a decidir) |
| 16 | "E se eu sair, meus dados ficam com vocês?" | Dados e Playbook da Gestão de Vendas por Safra ficam com o cliente (regra proposta) |
| 17 | "Meu cliente compra uma vez e some." | Bônus: Análise Estratégica da base de clientes |
| 18 | "Meu sócio não vai aprovar." | O sócio na call; a Análise Estratégica em números vira o argumento interno |
| 19 | "Não quero mais aula nem conteúdo." | O núcleo é operação; o curso entra só como apoio ao time |
| 20 | "Eu sou o único que fecha venda." | **Não resolvido de propósito** (#20): "a oferta não promete trocar o dono-vendedor" |

**Divergência na fonte.** A Oferta online diz, abaixo da tabela, que "dezoito têm resposta no núcleo ou nos bônus", e o checklist do mesmo documento diz "20, com 17 resolvidos".

---

## O pacote: núcleo, bônus e a troca pelo caso

| Item | O que é | Obstáculos | Valor de referência |
|---|---|---|---|
| Núcleo | O serviço de `produto` e as entregas de `entregas-do-servico` | 1 a 5, 7 a 9, 11, 13, 16 | O preço depois das primeiras vagas: ficha-de-fatos#preco-avancada-depois |
| Bônus 1: curso gravado do Júnior, liberado para o time | "As aulas de etapas e métricas que ele já tem, como apoio para vendedores novos" | 6, 19 | Preço real a confirmar; "Se nunca foi [vendido avulso], não atribuir valor" (ficha-de-fatos#bonus-curso; lacuna-22) |
| Bônus 2: Análise Estratégica da base de clientes | "A Análise Estratégica feita sobre quem já comprou, para achar quem pode comprar de novo" | 17 | ficha-de-fatos#bonus-analise-base, que se apoia no valor da Análise (ficha-de-fatos#analise-valor, **em conflito**) |
| Bônus pela troca: sessão extra com o Júnior | "Uma sessão individual de estratégia comercial", além das Sessões de Comando (ficha-de-fatos#sessoes-de-comando) | 14 | Valor de uma sessão avulsa a confirmar (ficha-de-fatos#bonus-caso; lacuna-22) |

Fonte: Oferta online ("O pacote"). Os bônus foram aprovados em #48.

**Por que poucos bônus** (Oferta online): "a persona rejeita 'conteúdo no lugar de aplicação' (F3). Cada bônus a mais deixa a oferta com cara de infoproduto." O curso entra "como material de apoio do time, nunca como destaque". A Análise da base é hoje "a única peça que hoje sustenta o 'vender mais vezes para o mesmo cliente'" (#16; outros-10).

**A troca pelo caso documentado** (Oferta online). Opcional. Quem aceita autoriza a Triad a registrar e publicar os números por etapa antes e depois, só agregados (nunca a lista de leads, por causa da LGPD); o nome da empresa ou só o setor, à escolha do cliente; e um depoimento em vídeo sobre o que aconteceu. Em troca, ganha a sessão extra com o Júnior.

**Cuidado ético:** "A troca é pela autorização de documentar, seja qual for o resultado. Ela não pode exigir depoimento positivo. Depoimento comprado ou condicionado ao elogio fere o CONAR e destrói justamente a credibilidade que o caso deveria construir." (Oferta online).

---

## Preço, pagamento e âncoras

**Preço:** ficha-de-fatos#preco-avancada; depois da última vaga, ficha-de-fatos#preco-avancada-depois, cobrado de verdade dali em diante (CDC e CONAR). Nunca anunciar "de [preço depois] por [preço das vagas]" enquanto o preço depois não for praticado (ficha-de-fatos#preco-avancada-depois; Oferta online; CTX §8).

**Pagamento:** ficha-de-fatos#meio-de-pagamento. As propostas de parcelas da Oferta online estão em ficha-de-fatos#parcelamento, **em conflito · bloqueado para entrega até a decisão**. A Oferta online recomenda número redondo, sem preço "quebrado": "Em serviço de alto valor para dono de empresa, número quebrado soa como varejo."

### As âncoras honestas

1. **O preço depois das primeiras vagas:** ficha-de-fatos#preco-avancada-depois.
2. **A alternativa que ele conhece:** um head comercial contratado (ficha-de-fatos#head-comercial-custo), somado pelo tempo do serviço (ficha-de-fatos#duracao), "mais encargos, e ele chega sem método e sem CRM".
3. **O dinheiro parado nas safras antigas,** calculado na Análise com os números do próprio prospect. "É a âncora mais forte, porque é dele."

Fonte: Oferta online ("As âncoras honestas").

### O retorno, na conta do cliente

"Valor das safras antigas = leads que nunca disseram não × taxa de fechamento realista × ticket médio." O exemplo numérico da Oferta online é "só para mostrar a fórmula (não usar em peça)" e não entra aqui.

**Regra de venda recomendada:** se a Análise Estratégica mostrar menos que um múltiplo do preço parado nas safras antigas, a recomendação honesta é não vender agora. "Recusar quem não tem safra para colher aumenta a confiança de quem tem, e protege os primeiros casos." O múltiplo está em ficha-de-fatos#multiplo-regra-de-venda. A regra está entre as decisões do cliente ainda abertas (Oferta online, "Decisões do cliente", item 11).

---

## Sem garantia: o que reduz o risco no lugar dela

**A decisão:** "nenhuma promessa em contrato, de nenhum tipo: nenhum resultado, meta ou métrica prometido nem garantido, e o contrato traz só o escopo das entregas" (#39; Oferta online; ficha-de-fatos#garantia). A promessa de 08/11, se aprovada, integra o contrato pelo art. 30 do CDC: a entrega precisa mostrar o Júnior e o Euclides no comando, sem passar ao contrato nenhum poder de gestão sobre o time do cliente (Oferta online; CTX §8; ver `promessa`).

**O que ela custa:** "A métrica em contrato era um dos dois territórios livres no mercado (F10), e o comprador pergunta por ela." **O que a sustenta:** "ninguém pede garantia de forma espontânea (F2), e nenhum concorrente direto oferece garantia de verdade." (Oferta online).

**O que entra no lugar (nada disso é garantia)** (Oferta online):
1. **Prova antes da compra:** a Análise na call, com os números do prospect (condições em conflito; ver a porta de entrada, abaixo).
2. **Um bloco "O que a Triad não promete"** na página, na VSL e na call.
3. **Escopo escrito:** o contrato descreve só as entregas, com data e critério de pronto (lacuna-10).
4. **Medição à vista:** o Relatório de Produtividade compara as safras antigas com o número de antes, sem meta prometida.
5. **Regra de venda:** só vende quando a Análise mostra o múltiplo mínimo do preço parado (ver acima; regra aberta).
6. **Saída limpa:** dados, acessos e o Playbook da Gestão de Vendas por Safra ficam com o cliente.

**Rascunho do bloco "O que a Triad não promete"** (rascunho da Oferta online; **não aprovado**; a voz final passa pela skill junior-neves-voice):

> "Não prometemos um número de vendas. Quem promete número sem conhecer a sua operação está chutando. Não vendemos curso nem aula. Não vendemos pelo seu time e não trazemos lead novo. O que fazemos: analisamos os seus últimos meses de leads, mostramos em que etapa a venda trava e instalamos um jeito de operar em que nenhum lead sai da lista antes de dizer não."

O rascunho fecha com o prazo do serviço (ficha-de-fatos#duracao) e "com data marcada para cada entrega".

**Cuidado jurídico:** o reembolso pela Hotmart está em ficha-de-fatos#arrependimento (#91); se o art. 49 do CDC também se aplica numa venda para empresa, só um advogado define (outros-18). O contrato pede revisão de advogado (CDC, arts. 30 e 49), incluindo a promessa de 08/11 (Oferta online, "Decisões do cliente", item 7; lacuna-10).

---

## Urgência real

"Toda urgência abaixo precisa ser verdadeira. Contador regressivo fica de fora: o mercado já desgastou o recurso e ele é risco no CONAR (F10)." (Oferta online).

| Tipo | Como fica | Por que é real |
|---|---|---|
| Escassez | ficha-de-fatos#vagas; só vendas da Avançada contam (ficha-de-fatos#vendas-que-contam) | "A capacidade de entrega tem limite" |
| Prazo | Nenhuma data nem prazo: ficha-de-fatos#urgencia | O preço muda depois da última vaga (ficha-de-fatos#preco-avancada-depois) |
| Aumento de preço | ficha-de-fatos#preco-avancada-depois | Desde que o preço depois seja cobrado de verdade dali em diante (Oferta online, paráfrase) |
| Bônus limitado | A sessão extra com o Júnior só para quem autoriza o caso | "O tempo do Júnior é o recurso mais escasso da Triad" |
| Custo de esperar | "Cada mês que vira, mais um mês de leads sai da lista sem ter dito não" | Calculado na Análise com os números dele |

"O tom segue a postura do 'vendedor chato': persistência com data, sem pressão. Nada de 'última chance' que não seja a última." (Oferta online; #26, que depende de confirmação do Júnior). A barra e o contador de vagas na página são outro assunto, em conflito: ficha-de-fatos#barra-de-resgates (conflito-04).

### O que as vagas exigem

**Pré-requisito de capacidade:** as vagas não diminuem até a última venda das vagas (#64; ficha-de-fatos#vagas). "Por isso o CS de cada grupo, a IA de consulta, a ligação do painel aos dados do cliente e a agenda do Júnior e do Euclides precisam estar prontos antes dela." É "um risco a vigiar e um próximo passo, não uma regra de venda" (Oferta online). As horas por cliente e o teto de inícios por mês são proposta da engenharia reversa, a validar (lacuna-01, outros-01; ficha-de-fatos#inicio-de-cada-cliente). Quem faz cada papel: lacuna-04.

O risco: se a entrega não couber, a escassez é verdadeira, mas os primeiros clientes, "que deveriam virar os primeiros casos, viram as primeiras reclamações. É a ferida da persona: o fornecedor que desanda perto do terceiro mês." (Oferta online).

---

## Como apresentar a oferta

"A ordem que funciona: valor antes do preço, bônus da troca depois do preço, urgência por último. Numa venda por aplicação e call, a demonstração vem primeiro." (Oferta online). A duração da call de venda está em ficha-de-fatos#duracao-call-de-venda.

### Na call

1. **Versão rápida da Análise da última safra dele:** onde travou e quantos leads nunca disseram não. As condições da Análise (nome, valor, gratuidade, duração, quem conduz) estão **em conflito** na ficha (conflito-02).
2. **A conta do que está parado,** com a fórmula acima. Se der menos que o múltiplo da regra de venda, a call termina numa recomendação honesta de não comprar agora.
3. **O mecanismo:** a Gestão Mensal de Leads; a rúcula, o morango e a melancia, e o agricultor que só colhe a rúcula. "O 95% só entra como número quando tiver fonte." (ver `mecanismo`).
4. **As quatro etapas e as entregas, com o sistema instalado** (ficha-de-fatos#sistema-instalado), uma de cada vez, sempre ligadas ao que apareceu na Análise dele.
5. **Os bônus:** curso para o time e Análise Estratégica da base de clientes.
6. **O bloco "O que a Triad não promete".**
7. **As âncoras.**
8. **O preço das primeiras vagas** (ficha-de-fatos#preco-avancada), pela Hotmart (ficha-de-fatos#meio-de-pagamento; parcelamento em conflito).
9. **A troca pelo caso,** com a sessão extra com o Júnior.
10. **As vagas até a última venda da Avançada** (ficha-de-fatos#vagas, ficha-de-fatos#vendas-que-contam); depois, ficha-de-fatos#preco-avancada-depois.
11. **O pedido:** reservar a vaga. Só se a resposta for não à Avançada: a Implementação Essencial, que não conta para as vagas (ver o downsell, abaixo).

"O sócio deve ser convidado para a call, como a Full Sales faz (F10)." Quem faz a reunião: ficha-de-fatos#quem-faz-a-reuniao; quem agenda: ficha-de-fatos#quem-agenda.

### Na página ou na VSL

1. Abertura com a Big Idea: "Você já pagou pelas suas próximas vendas." (aprovada; ver `mecanismo`).
2. O mecanismo: o sintoma primeiro, depois o nome do problema (Gestão Mensal de Leads), e a rúcula, o morango e a melancia.
3. A promessa: **pendente do Júnior e do Euclides; não pode ir para entrega** (ver `promessa`).
4. As quatro etapas e o que ele recebe.
5. É para você / não é para você: o corte está em ficha-de-fatos#criterio-de-qualificacao, **em conflito · bloqueado para entrega até a decisão**.
6. O que a Triad não promete.
7. A chamada para a Análise, feita na call (condições em conflito). "O preço da implementação fica para a call."

Fonte: Oferta online ("Como apresentar a oferta na call e na página"). "A voz final de todas as peças passa pela skill junior-neves-voice." Na primeira etapa do funil não se fala de GSAAS, de gerente nem da entrega (#68), com a exceção de "gerente comercial" na página (#86).

---

## A porta de entrada: a Análise

O que está decidido sem conflito: a Análise da porta é a versão da call, "sobre a última safra, a mesma para todos os públicos" (ficha-de-fatos#analise-conteudo; #59, #61). A Análise completa, com documento e painel, é a entrega 1 (`entregas-do-servico`). Quem agenda é o SDR (ficha-de-fatos#quem-agenda; #67).

**Em conflito · bloqueados para entrega até a decisão** (ficha de fatos; conflito-02, lacuna-11):
- O nome público: ficha-de-fatos#analise-nome-publico.
- O valor apresentado e o valor cobrado depois: ficha-de-fatos#analise-valor.
- Até quando é gratuita: ficha-de-fatos#analise-gratuidade.
- A duração: ficha-de-fatos#analise-duracao.
- Quem conduz: ficha-de-fatos#analise-quem-conduz.

Por que o valor apresentado só vale se for cobrado depois: CTX §8 (CDC e CONAR) e ficha-de-fatos#analise-valor. Proposta em aberto: ficha-de-fatos#analise-abatimento. O plano de ação de 90 dias (PDV-90) como saída da Análise está sem decisão (lacuna-22, conflito-10).

**Hipótese a validar** (Oferta online): "A Análise Estratégica antes da compra compensa a falta de garantia (indicativa)."

---

## O downsell: Implementação Essencial

- **Nome:** ficha-de-fatos#downsell-nome (#60).
- **Preço:** ficha-de-fatos#downsell-preco, **em conflito · bloqueado para entrega até a decisão** ("decidido" no registro; "hipótese" na proposta de 08/11).
- **Desenho:** ficha-de-fatos#downsell-desenho. Registrado em #37, #42 e #60; em revisão desde 07/11, porque três decisões da Avançada mexem nele (o time do cliente executa a infraestrutura; o Treinamento virou call em grupo; tudo entregue no marco de ficha-de-fatos#sistema-instalado) (Downsell online, "Em revisão desde a call de 07/11"). A proposta de 08/11, "Instalação em 15 dias" (nome no Downsell online; ficha-de-fatos#downsell-desenho), está a decidir (lacuna-03, outros-02).
- **Quando oferecer:** só depois do não à Avançada, na mesma call ou no retorno. "Nunca lado a lado com ela, nem em página, anúncio ou e-mail." (Downsell online, "Regras de apresentação"). O não é "o único critério para oferecê-la" (Oferta online, decisões de 01/11; Downsell online).
- **Não conta para as vagas:** ficha-de-fatos#vendas-que-contam.
- **A fala na call** ainda está por escrever, com a voz do Júnior (Downsell online, "Próximos passos"). O rascunho do Downsell online cita valores e não entra aqui.
- **Regras propostas, não decididas** (Downsell online): a mesma comissão nas duas ofertas, para quem vende não ganhar mais empurrando a Essencial; o motivo do não registrado, para medir se a Essencial tira venda da Avançada; crédito para subir para a Avançada (proposta, lacuna-03).

---

## Decisões do cliente ainda abertas

Da Oferta online ("Decisões do cliente"), com o que já foi decidido depois marcado:

| # na fonte | Decisão | Situação | Onde |
|---|---|---|---|
| 1 | Regra de vocabulário depois da promessa decidida: continua para colheita, plantio e relógio em títulos e chamadas? | Aberta | Tom-de-voz (lote 3) |
| 2 | Pagamento e parcelas | Aberta | ficha-de-fatos#parcelamento; conflito-15 |
| 3 | Bônus pela troca | Aprovado com os bônus (#48) | ficha-de-fatos#bonus-caso |
| 4 | A Análise da call e o seu valor | Em conflito (conflito-02); o registro diz #59, #61 e #62, e a página diverge | conflito-02 |
| 5 | Data de início de cada cliente | Aberta | ficha-de-fatos#inicio-de-cada-cliente |
| 6 | Capacidade das vagas | Vagas não diminuem (#64); capacidade a preparar | lacuna-01, lacuna-04 |
| 7 | Contrato só com o escopo, revisão de advogado, incluindo a promessa de 08/11 | Aberta | lacuna-10, outros-18 |
| 8 | Preço real do curso gravado e de uma sessão do Júnior | Aberta | lacuna-22 |
| 9 | Preço do GSAAS travado por um período para os clientes das primeiras vagas (proposta; ficha-de-fatos#gsaas-preco-travado) | Aberta | lacuna-06 |
| 10 | Mostrar o painel do leilão numa call privada | Aberta (o painel como prova pública está estacionado, #27) | Obstáculo 15 |
| 11 | A regra de venda pelo múltiplo do preço parado | Aberta | Esta oferta, "O retorno" |
| 12 | GSAAS em desenho; formato e preço para quem fez a Essencial; pagamento da Essencial | Para depois (#84) / aberta | lacuna-03, lacuna-06 |

**Próximo passo da fonte:** testar com donos do perfil antes da copy ("Oito ou mais 'sim': seguir. De cinco a sete: ajustar. Quatro ou menos: redesenhar.") e levar a oferta ao Júnior e ao Euclides, junto com a Ficha do Serviço (Oferta online, "Próximos passos"; lacuna-25).

---

## Divergências registradas na fonte

- **Data da Oferta online.** O cabeçalho diz 2026-11-05, mas o texto traz as decisões de 07/11 e 08/11; o CTX a chama de "v1.7 com as mudanças de 07/11 e 08/11 no documento online" (CTX §12).
- **"Em uma frase"** da Oferta online e do One pager online ainda usa a promessa de 23/10 (#33), que está pendente, assim como a de 08/11 (ver `promessa`). A Oferta online chama a #33 de "substituída em 08/11"; pelo registro, ela só será substituída quando a #85 for aprovada.
- **Histórico superado dentro da fonte.** As "Decisões já tomadas pelo Otavio (22/10)" falam em Análise "paga a R$ ..., abatida", e as decisões de 01/11 (terceira rodada) põem a entrega 1 "na semana 3". As duas foram revistas depois (#59, #61, #62; #72). Vale o registro.
- **Obstáculos resolvidos:** "dezoito" no texto, "17" no checklist (ver acima).

---

## Fontes

- Oferta online: 03-documentos-online/Oferta · Implementação Avançada do Sistema de Vendas Safra.md (v1.7). Vale sobre a cópia F15.
- One pager online: 03-documentos-online/One pager · Implementação Avançada do Sistema de Vendas Safra.md (08/11/2026).
- Downsell online: 03-documentos-online/Downsell · Implementação Essencial do Sistema de Vendas Safra.md (v0.7, 08/11/2026). Vale sobre a cópia F17.
- Ficha do Serviço online: 03-documentos-online/Ficha do Serviço · Implementação Avançada do Sistema de Vendas Safra.md (leitura pendente do Júnior e do Euclides).
- CTX §3, §8, §9, §11, §12: 02-arquivos-do-projeto/CONTEXTO-DO-PROJETO.md (v5.3).
- Decisões #16, #19, #20, #26, #27, #33, #37 a #39, #42, #48, #49, #52 a #54, #56 a #68, #70 a #79, #83 a #86, #88 (base/decisoes.md).
