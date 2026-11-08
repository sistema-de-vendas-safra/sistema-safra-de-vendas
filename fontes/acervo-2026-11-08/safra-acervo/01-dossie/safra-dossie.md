# Sistema de Vendas Safra · dossiê

Levantamento de 08/11/2026, feito a partir dos documentos deste projeto, dos documentos online ligados a ele e das conversas anteriores do projeto. A fonte que manda é o CONTEXTO-DO-PROJETO.md na versão 5.3, de 08/11/2026.

## Como ler

Cada item traz o status e a fonte.

| Status | Quer dizer |
| --- | --- |
| **Decidido (Otavio)** | Você decidiu, em conversa ou no registro de decisões |
| **Decidido (Júnior)** | Decisão do Júnior, quase sempre na call de 07/11 |
| **Aprovado (Júnior e Euclides)** | Aprovado pelos dois em 27/10 (decisão #48) |
| **Pendente de aprovação do Júnior e do Euclides** | Você decidiu, mas falta o aval dos dois |
| **Sugestão, não confirmada** | Proposta minha que você não confirmou, ou item de origem duvidosa |
| **Não encontrado** | Não existe neste projeto |

Os números como #48 são as decisões numeradas do CONTEXTO (seção 11). Os códigos F1 a F25 são as fontes listadas no Mapa de fontes do CONTEXTO.

**Dossiê anterior:** não encontrado. Procurei nas conversas do projeto por "dossiê" e por pedidos de documentação do Safra e não achei nenhum dossiê pedido antes. Este é o primeiro.

---

## 1. O que é o Safra

**Nomes**

| Nome | O que é | Status | Fonte |
| --- | --- | --- | --- |
| Sistema de Vendas Safra | O sistema inteiro, o nome público. No singular: "Safra", nunca "Safras" | Decidido (Otavio), #22; arquitetura em #69 (03/11) | CONTEXTO §6; conversa "Wireframe da página de vendas Triad" |
| IASV Safra (Implementação Avançada do Sistema de Vendas Safra) | O produto: a implementação de 90 dias | Decidido (Otavio), #46 (27/10) | CONTEXTO §1 e §11 |
| Gestão de Leads por Safra | O método proprietário, a peça do sistema que resolve a venda complexa | Decidido (Otavio), #69 (03/11) | CONTEXTO §3; FONTE-metodo-safra-diferenciacao.md (F12) |
| Gestão Mensal de Leads | O nome do problema | Decidido (Otavio), #40 (23/10) | FONTE-mecanismo-unico.md (F13) |
| Triad | A agência de Euclides Vieira e Junior Neves que vende o Safra. Nome provisório "Triad H." | "Triad H.": decidido (Otavio, 08/11, #89), pendente de aprovação do Júnior e do Euclides | CONTEXTO §1 e §6 |

**Definição registrada.** O Sistema de Vendas Safra é o todo, com sete peças: Mentalidade de Vendas, as três Inteligências (Humana, de Mercado e Artificial), Processos, Dados e Tecnologia. A Gestão de Leads por Safra é o método proprietário dentro dele: cada mês de captação vira uma safra, com relógio de 90 dias contado da entrada de cada lead, e o lead só é dado como perdido quando diz não.
Status: decidido (Otavio, #69, 03/11; relógio pela #41, 23/10). Fonte: CONTEXTO §3; F12.

**Big Idea (texto aprovado).**

> "Você já pagou pelas suas próximas vendas. Elas estão em quem nunca disse não e ficou para trás quando o mês virou. O sistema de vendas por safra respeita o tempo de amadurecimento de cada contato, não o calendário mensal. São mais vendas com a mesma verba, cada venda custando menos e quem já comprou voltando a comprar."

Status: aprovado (Otavio em 22/10; Júnior e Euclides em 27/10, #48). Fonte: FONTE-big-idea.md (F14).

**Analogia (aprovada).** Rúcula pronta em cerca de 30 dias, morango em cerca de 60, melancia em cerca de 90: cada lead tem o seu tempo, e venda de alto ticket é melancia. A horta fica no método e nas descrições, nunca no nome nem no problema. O "95%" que acompanha a analogia não tem fonte e, em peça pública, vira "quase todo negócio".
Status: decidido (Otavio, #36 e #56; troca de rúcula e tomate para rúcula, morango e melancia em 23/10); aprovada com a Big Idea (#48). Fonte: F14; CONTEXTO §6.

**Onde o método já roda.** Desde julho de 2026, no CRM do clube de compra de imóveis de leilão nos EUA, operação do próprio Júnior. Na safra de julho: 989 leads, 12,8% pré-qualificados, 16% de agendamento, 36% de fechamento sobre reuniões. A safra fechou em 29/10, sem números finais registrados.
Status: fato registrado. Fonte: FONTE-call-brainstorming.md (F1); F12; CONTEXTO §3.

---

## 2. Para quem é

### Quem compra

- **Persona "Rafa, o Dono-Closer":** dono de empresa que fatura de R$ 150 mil a R$ 1,5 milhão por mês, com venda consultiva acima de R$ 10 mil; nunca contratou estrutura comercial ou já se queimou com ela; decide sozinho, em dias; quer execução dentro da operação e alguém sênior do começo ao fim; não comenta no Instagram.
  Status: pesquisa (35 vozes públicas, sem entrevistas; a validação com 8 a 10 donos está pendente). Fonte: Buyer Persona.md (F2); CONTEXTO §4.
- **Critério do Júnior:** só quem já tem time de vendas.
  Status: decidido (Júnior, 28/10). Fonte: FONTE-call-alinhamento-28-10.md (F22).
- **Critério de qualificação em conflito.** Ficha do Serviço e persona: venda acima de R$ 10 mil, faturamento de R$ 150 mil a R$ 1,5 milhão por mês. Página (hero A, "Para quem é" e perguntas frequentes): venda acima de R$ 5 mil e faturamento acima de R$ 100 mil por mês. Hero B: venda acima de R$ 10 mil.
  Status: sem decisão (lacuna 12 do CONTEXTO). Fonte: CONTEXTO §10; wireframe da página.

### Quem usa

- **O dono e o head comercial do cliente:** nas três Sessões de Comando com o Junior Neves e na call semanal em grupo.
  Status: decidido (Júnior, #78, 07/11; nome Sessões de Comando: Otavio, #83, 08/11). Fonte: Ficha do Serviço online; CONTEXTO §3.
- **O time de vendas do cliente (SDR e closer):** executa as mudanças no CRM em uma semana, roda a régua e os roteiros, faz a Recuperação de Ativos e as vendas. "A colheita é do time do cliente."
  Status: decidido (#14; #74, Júnior, 07/11). Fonte: CONTEXTO §3; FONTE-ficha-do-servico.md (F11).
- **Uma pessoa responsável pela operação,** nomeada pelo cliente, que participa da call semanal em grupo.
  Status: registrado na Ficha do Serviço como obrigação do cliente. Fonte: F11.

### Em que tipo de empresa ele é instalado

- **Serve para quem:** fatura de R$ 150 mil a R$ 1,5 milhão por mês; recebe leads todo mês (cerca de 100 ou mais, a validar); tem duas ou mais pessoas vendendo, o dono incluído; tem o histórico dos leads dos últimos 3 meses, em CRM ou planilha.
- **Não serve para quem:** ainda não tem leads chegando e precisa de marketing antes; quer curso ou conteúdo para assistir; quer que alguém venda por ele; vende sem conversa, como no balcão ou no e-commerce.
- **Onde roda:** no CRM que o cliente já usa; ninguém troca de CRM. O CRM próprio do Júnior fica para depois da validação.

Status: a lista de "serve" e "não serve" está registrada na Ficha do Serviço, sem decisão numerada própria; o CRM do cliente foi decidido pelo Júnior (#70, 07/11). Fonte: F11; CONTEXTO §3.

**Nicho ou setor específico:** não encontrado. O projeto define o cliente pelo tipo de venda (consultiva, com conversa antes da compra), não por setor.

---

## 3. Que problema resolve e que resultado promete

### O problema

**Gestão Mensal de Leads.** O mês vira a régua de tudo, inclusive do lead. O relatório do mês soma leads de idades diferentes, esconde a etapa que quebrou e larga o lead antes de ele amadurecer. Quando o mês vira, quem não comprou sai da mesa sem ter dito não.
Status: decidido (Otavio, nome em #40, 23/10); mecanismo aprovado (Júnior e Euclides, #48). Fonte: F13.

O problema em três camadas (F13, aprovado):

- **Externo:** o lead pago sai da mesa na virada do mês; as vendas oscilam sem explicação; ninguém sabe em que etapa a venda trava; o custo por venda sobe; o crédito vai para a safra errada; a recompra some do radar.
- **Interno:** desperdício e impotência; insegurança com o caixa; solidão e prisão no comercial; desconfiança de cada fornecedor novo; culpa e vergonha.
- **Filosófico, frase recomendada:** "O lead não é perdido porque o mês acabou. Perdido é quem disse não."
  Status da frase: pendente de aprovação do Júnior e do Euclides. Fonte: F13; PAINEL-iasv-safra.md.

**Crença que decide a compra (texto do mecanismo):**

> "Se o dono acreditar que as próximas vendas dele já estão nos leads que pagou, e que esses leads só não tiveram tempo de decidir antes de o mês virar, então instalar um sistema que respeita o tempo de cada lead vira a conclusão inevitável. Comprar mais lead deixa de ser a primeira resposta."

Status: parte do mecanismo aprovado (#48). Fonte: F13.

### O resultado prometido

**Promessa vigente (08/11), em duas versões.**

Para quem já conhece o Euclides e o Júnior:

> "Por 90 dias, Junior Neves e Euclides Vieira vão liderar o comercial do seu negócio, instalando o Sistema de Vendas Safra para maximizar o lucro por lead do seu negócio, hackeando 7 componentes que já existem no seu processo de vendas."

Para o público frio:

> "Em 90 dias, vamos assumir a liderança do seu comercial para instalar o Sistema de Vendas Safra e maximizar o lucro por lead do seu negócio, hackeando 7 componentes que já existem no seu processo de vendas."

Subtítulo das duas versões ("Eles vão" na primeira, "Vamos" na segunda):

> "te ajudar a recolher todo o dinheiro que já deveria estar no seu bolso, mas está oculto pela ineficácia do seu atual sistema de vendas (sem precisar mudar uma vírgula no seu marketing nem gastar 1 real extra com leads)."

Status: decidido (Otavio, #85, 08/11), pendente de aprovação do Júnior e do Euclides. Substitui a promessa de 23/10 (#33). Fonte: CONTEXTO §6; documento online "Promessa central".

**Ajustes propostos à promessa:** "Por 90 dias" também na versão fria; tirar o "todo" de "todo o dinheiro"; trocar "sem precisar mudar uma vírgula no seu marketing" por "sem aumentar a verba de marketing"; trocar "7 componentes que já existem" por "os 7 componentes"; testar "hackeando" antes de levar à página; pôr a receita por lead no Relatório de Produtividade.
Status: sugestão, não confirmada. Fonte: documento online "Promessa central" (08/11); esta conversa.

**Promessa anterior (23/10), substituída:**

> "Em 90 dias, a Triad instala o Sistema de Vendas Safra no seu comercial para o seu time vender gastando menos, vender mais e vender mais vezes para o mesmo cliente."

Status: decidida (Otavio, #33, 23/10), nunca aprovada pelo Júnior e pelo Euclides; substituída pela #85. Fonte: FONTE-promessa.md (F16).

**Frase-assinatura:**

> "Seu lead só sai da lista quando disser não."

Status: decidida (Otavio, 23/10, junto com a promessa; registrada como "frase-assinatura" na Oferta). Fonte: CONTEXTO §6; documento online "Oferta"; one pager.

**O que pode e o que não pode ser prometido:**

- Nenhuma promessa em contrato: o contrato traz só o escopo das 8 entregas, com critério de pronto. Nada de meta, métrica, garantia ou resultado.
  Status: decidido (Otavio, #39, 23/10). Fonte: CONTEXTO §3 e §8.
- "Sistema instalado em 15 dias" pode ir a público se for cumprido; "resultado em 15 dias" ou "colher resultado em 15 dias", não.
  Status: regra registrada no CONTEXTO (§6 e §8) a partir da call de 07/11. Fonte: CONTEXTO; FONTE-call-decisao-07-11.md (F25).
- A promessa só vai a público com a prova do primeiro caso e a revisão de um advogado.
  Status: regra registrada. Fonte: CONTEXTO §8.

---

## 4. Como funciona, na ordem

### 4.1 As sete peças do sistema

1. Mentalidade de Vendas
2. Inteligência Humana
3. Inteligência de Mercado
4. Inteligência Artificial
5. Processos
6. Dados
7. Tecnologia

Status: decidido (Otavio, #69, 03/11). Fonte: CONTEXTO §3; F12. São os "7 componentes" da promessa #85.

### 4.2 As seis regras do método (Gestão de Leads por Safra)

| Elemento | Regra |
| --- | --- |
| Safra | O grupo de leads captados em um mês |
| Relógio de maturação | Prazo para o lead amadurecer, contado do dia em que ele entra; varia por negócio; 90 dias na operação do Júnior |
| Estágio | Posição no funil, que só avança: captado, pré-qualificado, agendado, realizado, venda |
| Estado | Situação do contato: conversando, tentativa, abandonado, stand-by ou perdido. Perdido só quando o lead diz não |
| Metas por etapa | Taxa mínima em cada passagem, aprovada pelo dono. As do Júnior: 50% pré-qualificam, 50% agendam, 75% comparecem, 20% fecham |
| Leitura de trás para frente | Começa no fechamento e recua até a etapa que quebrou |

Status: regras do método vindas do Júnior (F1, F7); relógio contado da entrada do lead decidido em 23/10 (#41). Fonte: F12.

Com o relógio de 90 dias, cada mês comercial carrega até quatro safras ao mesmo tempo: três inteiras e a ponta da mais antiga. Fonte: F12; F13.

### 4.3 A solução em cinco passos (mecanismo)

1. **Separar:** cada mês de captação vira uma safra, inclusive as dos últimos 3 a 6 meses.
2. **Dar relógio:** cada safra ganha um prazo de maturação calibrado com os dados do negócio.
3. **Pôr meta em cada etapa:** aprovada pelo dono na Análise Estratégica das Safras.
4. **Ler de trás para frente:** do fechamento até a etapa que quebrou, safra por safra.
5. **Colher antes do prazo:** o rito semanal leva o esforço para a safra perto do fim e abaixo da meta.

Status: aprovado (#48). Fonte: F13.

### 4.4 As quatro etapas dos 90 dias

| Etapa | Semanas | O que acontece |
| --- | --- | --- |
| Análise Estratégica das Safras | 1 | Na primeira Sessão de Comando, de duas a três horas, as safras dos últimos 3 a 6 meses são lidas de trás para frente, o relógio do negócio é calculado e o dono aprova as metas de cada etapa |
| Preparo do solo | 1 e 2 | Na segunda Sessão de Comando, o Júnior passa as mudanças em aula e tarefa e entrega o Playbook da Gestão de Vendas por Safra; o time do cliente executa em uma semana; o Painel de Safras é ligado aos dados do cliente; até o dia 15 chega o Playbook de Comunicação Persuasiva |
| Colheita | 3 a 13 | Recuperação de Ativos: os leads antigos que nunca disseram não voltam ao pipeline |
| Plantio | 3 a 13 | As safras novas entram com relógio e meta; o Treinamento para Otimização da Conversão vira a call semanal em grupo |

Depois dos 90 dias, opcional: o GSAAS.

Status: decidido (Júnior, com você, na call de 07/11: #72 a #75). Fonte: Ficha do Serviço online; F11; F25.

### 4.5 Ritos

- **Três Sessões de Comando com o Junior Neves,** com o dono e o head comercial: duas no começo e uma no fim.
  Status: decidido (Júnior, #78, 07/11; nome: Otavio, #83, 08/11).
- **Call semanal em grupo** com todos os clientes, conduzida pelo Júnior e pelo Euclides nos 90 dias.
  Status: decidido (#79, 07/11).
- **Análise de 2 calls de venda por cliente por semana,** dentro do Treinamento.
  Status: decidido (Otavio, #88, 08/11).
- **Grupo de WhatsApp por cliente,** com CS e uma IA de consulta treinada nas reuniões, no Playbook da Gestão e no método.
  Status: decidido (#76, 07/11). Quem faz o CS e quem constrói a IA ficou para depois (#84).

Fonte: CONTEXTO §3; Ficha do Serviço online.

### 4.6 Calendário por dia, horas e MVP

Calendário do D-5 ao D90, horas por papel, biblioteca construída em ondas, recorte do MVP das 10 primeiras vendas e portões de aprendizado.
Status: sugestão, não confirmada (proposta de 08/11, a validar com o Júnior e o Euclides). Fonte: documento online "Engenharia reversa das entregas · IASV Safra".

---

## 5. As 8 entregas, com os nomes oficiais

| # | Entrega | Quando | Está pronta quando |
| --- | --- | --- | --- |
| 1 | Análise Estratégica das Safras | Semana 1 | Foi apresentada ao dono, que aprovou as metas de cada etapa |
| 2 | Implementação da Infraestrutura | Semanas 1 e 2 | Todo lead novo entra certo por 5 dias úteis seguidos |
| 3 | Playbook de Comunicação Persuasiva | Até o dia 15 | Aprovado pelo responsável e em uso pelo time |
| 4 | Recuperação de Ativos | Semanas 3 a 13 | Cada lead da lista tem uma situação final |
| 5 | Painel de Safras | Até o dia 15 | Atualiza sozinho e é lido na call semanal |
| 6 | Treinamento para Otimização da Conversão | Teoria até o dia 15; call em grupo das semanas 3 a 13 | Uma ata por call, com as decisões e os responsáveis de cada cliente |
| 7 | Playbook da Gestão de Vendas por Safra | Semanas 1 e 2 | Entregue e revisado com o responsável |
| 8 | Relatório de Produtividade | Semana 13, na terceira Sessão de Comando | Apresentado pelo Júnior |

Status: nomes decididos por você em 01/11 (#56); 8 entregas desde 28/10 (#52, Euclides); entregáveis aprovados pelo Júnior e pelo Euclides (#48); calendário decidido na call de 07/11 (#72 a #75). Fonte: F11; Ficha do Serviço online; CONTEXTO §3.

**Em aberto:** a página mostra 9 entregas, com a "Mentoria 1:1" como a nona. Falta decidir se a página mostra 8 entregas mais os ritos ou 9 entregas (lacuna 5 do CONTEXTO).

**Fora da implementação:** gerar leads; contratar vendedores; treinar técnica de venda além dos roteiros e das calls em grupo; vender pelo cliente; executar as mudanças no CRM pelo cliente; trocar o CRM do cliente; mudar a oferta, o preço ou o produto do cliente; integrações fora do padrão (orçadas à parte). A Mecanização da Safra (agentes de IA) saiu das entregas e vai para a continuidade.
Status: decidido (Mecanização fora: Euclides em 27/10 e Júnior em 28/10, #52 e #58; reforçado em #77). Fonte: F11; CONTEXTO §3.

---

## 6. Oferta

| Item | O que está registrado | Status | Fonte |
| --- | --- | --- | --- |
| Formato | Implementação de 90 dias, nunca mentoria nem curso; sistema instalado em 15 dias; acompanhamento e otimização até a semana 13; no CRM que o cliente já usa | Decidido (#53, Júnior, 28/10; #70 e #73, Júnior, 07/11) | CONTEXTO §3 |
| Preço | R$ 45 mil nas 10 primeiras vendas; depois, R$ 60 mil | Decidido (#9, #19, #57) | CONTEXTO §3 |
| Vagas | As 10 primeiras vendas, sem turma nem início comum; só vendas da Avançada contam; as vagas não diminuem até a 10ª venda | Decidido (Otavio, #57, #63, #64, #65) | CONTEXTO §3 |
| Pagamento | Pela Hotmart, à vista ou parcelado; parcelamento e taxa a definir | Decidido (#54, Euclides, 28/10); parcelamento não decidido | CONTEXTO §3 |
| Bônus | Curso gravado do Júnior; Análise Estratégica da base de clientes (valor de R$ 4.997); sessão extra com o Júnior para quem virar caso documentado | Aprovado (#48) | CONTEXTO §3 |
| Garantia | Nenhuma. O contrato traz só o escopo. O direito de arrependimento de 7 dias do CDC vale de qualquer forma e precisa estar no checkout e nos termos da Hotmart | Decidido (Otavio, #39) | CONTEXTO §3 e §8 |
| Porta de entrada | Análise Estratégica do seu Comercial (ou do seu Sistema de Vendas): a versão da call, de 30 a 45 minutos, sobre a última safra, a mesma para todos; valor de R$ 4.997; gratuita nas 10 primeiras vendas; cobrada por R$ 4.997 depois | Decidido (Otavio, #59, #61, #62, #66) | CONTEXTO §3 |
| Prazos | 90 dias; o relógio começa na primeira Sessão de Comando; Análise na semana 1; sistema instalado no dia 15; Relatório na semana 13; data de início de cada cliente em aberto | Decidido (#65, #72, #73) | CONTEXTO §3 |
| Continuidade | GSAAS (Gestão de Safra as a Service), opcional, depois dos 90 dias. Proposta de 07/11: painel por assinatura, ferramentas de IA para alugar e acompanhamento em grupo; hipótese de R$ 15 mil por mês | Nome decidido (#38); desenho e preço para depois (Otavio, #84, 08/11) | CONTEXTO §3; F11 |
| Downsell | Implementação Essencial, R$ 22.500, oferecida só depois do não à Avançada; entregas 1, 3, 6 e 7, 13 semanas | Decidido (#37, #42, #60); desenho em revisão desde 07/11 | CONTEXTO §3; FONTE-downsell.md (F17) |
| Downsell, redesenho | Instalação em 15 dias: entregas 1, 2, 3 e 7, Sessão 1 completa e Sessão 2 curta, sem calls em grupo | Sugestão, não confirmada (08/11) | Documento online "Engenharia reversa das entregas · IASV Safra"; documento online "Downsell" |

**Divergência sobre a Análise na página.** Em 03/11 você pediu que a página dissesse que a Análise é grátis por ser "promoção de lançamento", sem citar a 10ª venda, e que mostrasse "81% das Análises gratuitas já foram resgatadas". A página também mostra a Análise a R$ 497 depois da promoção e uma conversa de 60 minutos com o time do Júnior. Nada disso entrou no registro de decisões, que segue com a #62 (R$ 4.997, 30 a 45 minutos, com o Júnior).
Status: conflito em aberto (lacuna 11 do CONTEXTO). Fonte: conversa "Wireframe da página de vendas Triad" (03/11); CONTEXTO §10.

**Proposta de parcelamento** (R$ 45 mil à vista ou 6 vezes de R$ 8.250): sugestão, não confirmada. Fonte: PAINEL-iasv-safra.md.

---

## 7. Tom de voz

- **Manual de tom de voz do Safra:** não encontrado neste projeto.
- **Voz das peças:** passa pela skill junior-neves-voice (a skill fica na conta, fora dos arquivos do projeto).
  Status: regra registrada. Fonte: CONTEXTO §6; F13; F14.
- **Postura do "vendedor chato":** persistência com data marcada, até o sim ou o não, sem pressão de fim de mês. "Insistência com método, não pressão."
  Status: decidido (Otavio, #26); falta a confirmação do Júnior. Fonte: CONTEXTO §6; F11.
- **Regra de vocabulário:** nas promessas, nos títulos e nas chamadas, só palavras que o comprador já usa (lead, venda, verba, etapa, fim do mês, sim ou não). Os termos do método (safra, colheita, plantio, relógio) entram depois de o mecanismo ser explicado. Exceção desde 23/10: o nome Sistema de Vendas Safra entra na promessa. Se a regra continua valendo para os outros termos em títulos está em aberto.
  Status: decidido (Otavio, 22/10; exceção em 23/10). Fonte: documento online "Oferta"; one pager.
- **Big Idea para o comprador:** "Não falar em CRM, não falar que o lead ficou mais caro."
  Status: direcionamento seu de 22/10 para a versão da Big Idea dirigida ao comprador; o alcance para outras peças não foi registrado. Fonte: conversa "Relatório do projeto e método Safra".
- **Grafia:** "Junior Neves" em público; "Júnior" no texto corrido.
  Status: regra registrada. Fonte: CONTEXTO §6.
- **Palavras queimadas para a persona:** reunião, relatório de vaidade, consultoria, mentoria, curso, programa, máquina de vendas.
  Status: achado de pesquisa. Fonte: FONTE-mapa-de-empatia.md (F3); CONTEXTO §4.
- **Falas do Júnior que marcam o método:** "o lead é a semente"; "perdido é quem falou não" (F1); "se eu for dizer a maior falha dos caras, ele não olhar para dados." (F25). Ele já disse em público que "meta é boba" e prefere "alvos"; o sistema usa "meta por etapa" (indicativa, F24).
  Fonte: CONTEXTO §4 e §9.
- **Referência de narrativa:** The Profit (no Brasil, O Sócio), de Marcus Lemonis, com "por 90 dias eu mando no seu comercial". O nome dele e o da série ficam fora das peças.
  Status: decidido (Júnior, #81, 07/11). Fonte: F25; CONTEXTO §6.
- **Tese do closer:** o closer não convence; quem convence é o marketing e o sistema, e com sistema o closer é tirador de pedido. Vira macronarrativa.
  Status: decidido (Otavio, #87, 08/11); autoria a confirmar com o Júnior. Fonte: CONTEXTO §3.

---

## 8. Estágio atual (08/11/2026)

- Big Idea, mecanismo, oferta, entregáveis e bônus aprovados pelo Júnior e pelo Euclides (#48).
- Formato de entrega revisto na call de 07/11 (#70 a #82) e completado pelas suas decisões de 08/11 (#83 a #89).
- Promessa nova decidida, pendente de aprovação do Júnior e do Euclides (#85).
- Nenhum cliente, nenhum caso documentado, nenhuma prova de resultado em cliente.
- Funil perpétuo previsto para começar em 10/11 (#50), com página de três portas e SDR agendando (#66, #67). Meta de trabalho: 10 vendas em 30 dias (#50).
- Página de vendas em wireframe, com divergências contra o registro (lacunas 5 e 11 a 17).
- Engenharia reversa das entregas proposta, a validar.
- Desatualizados em relação a 07/11 e 08/11: o painel interativo, a apresentação comercial e o contrato (ainda com 9 entregas).

Fonte: CONTEXTO §1, §7 e §12.

---

## 9. Decisões tomadas

| Data | Decisões | Quem decidiu |
| --- | --- | --- |
| 19/10/2026 | Agência em sociedade, paralela à SX; primeiro produto do Júnior, de vendas | Euclides e Júnior |
| 20 a 25/10/2026 | Mecanismo por safra, Big Idea, oferta, nomes e postura (#8 a #29); promessa, Análise, entregas, analogia, downsell, GSAAS, nada em contrato, Gestão Mensal de Leads, relógio da entrada do lead (#33 a #42); tese, credenciais com comprovante, design system (#43 a #45) | Otavio |
| 27/10/2026 | IASV Safra como primeiro produto do pilar de Vendas (#46); Análise gratuita até a 10ª venda (#49) | Otavio |
| 27/10/2026 | Big Idea, mecanismo, oferta, entregáveis e bônus aprovados (#48) | Júnior e Euclides |
| 28/10/2026 | Sem lançamento: funil perpétuo desde 10/11 (#50); quiz e página com vídeo, pré-qualificação obrigatória, o Júnior faz as reuniões (#51); a Mecanização sai e ficam 8 entregas (#52); implementação, nunca mentoria (#53); Hotmart (#54); nome Triad em revisão (#55) | Júnior; #52 e #54 do Euclides |
| 01/11/2026 | Nomes das 8 entregas (#56); R$ 45 mil até a 10ª venda (#57), sem reduzir vagas (#64), só vendas da Avançada (#63); Mecanização no GSAAS (#58); Análise da call, a mesma para todos, R$ 4.997, gratuita nas 10 primeiras vendas (#59, #61, #62); downsell Implementação Essencial, R$ 22.500 (#60) | Otavio |
| 03/11/2026 | As 10 vagas são as 10 primeiras vendas, sem turma nem início comum (#65); três portas com e sem VSL, campanhas da Análise e da Calculadora (#66); o SDR agenda (#67); nada de GSAAS, gerente e entrega na primeira etapa (#68); o sistema é o todo, e a Gestão de Leads por Safra é o método proprietário (#69) | Otavio |
| 07/11/2026 | CRM do cliente na validação, CRM próprio depois (#70); Painel de Safras ligado aos dados do cliente (#71, ideia do Euclides); Análise na semana 1 e relógio dos 90 dias a partir da primeira call (#72); sistema instalado em 15 dias (#73); infraestrutura em aula e tarefa, executada pelo time do cliente em uma semana (#74); Playbook da Gestão no preparo do solo (#75); grupo de WhatsApp por cliente com CS e IA (#76); Recuperação de Ativos fica, Mecanização segue fora (#77) | Júnior, com o Otavio |
| 07/11/2026 | Três calls individuais, duas no começo e uma no fim, e calls semanais em grupo (#78); o Júnior e o Euclides conduzem o grupo nos 90 dias (#79) | Júnior e Otavio |
| 07/11/2026 | Fases de cor e a mensagem dos 15 dias (#80); referência The Profit e paleta branco e verde da página aprovada (#81) | Júnior |
| 07/11/2026 | Tese da Triad com growth hacking como diferencial de posicionamento; o Otavio escreve e o Júnior valida (#82) | Júnior e Otavio |
| 08/11/2026 | Sessões de Comando com o Junior Neves (#83); GSAAS e suporte e tecnologia para depois (#84); análise de 2 calls de venda por cliente por semana no Treinamento (#88) | Otavio |
| 08/11/2026 | Promessa em duas versões no lugar da #33 (#85); "gerente comercial" na página como exceção à #68 (#86); tese do closer vira macronarrativa (#87); nome provisório "Triad H." (#89) | Otavio; #85 e #89 pendentes de aprovação do Júnior e do Euclides, #87 da confirmação do Júnior |

**Decisões de página tomadas na conversa "Wireframe da página de vendas Triad"** (fora do registro numerado do CONTEXTO): estão no arquivo safra-landing.md, com data.

**Estacionadas:** #1 a #7, #10, #13, #15, #18, #23 (consulta ao INPI fora de pauta) e #27 (painel do leilão como prova pública). Fonte: CONTEXTO §10.

**Dependem de confirmação do Júnior:** a safra de clientes (#16), o "vendedor chato" (#26), publicar sobre gestão comercial (#29) e as credenciais (#44). Fonte: CONTEXTO §11.

---

## 10. Perguntas em aberto

Em ordem de impacto, como estão no CONTEXTO (seção 10):

1. Validar a engenharia reversa com o Júnior e o Euclides, a começar pela tensão entre a meta de 10 vendas em 30 dias e a agenda do Júnior.
2. Aprovação da promessa (#85) pelo Júnior e pelo Euclides e decisão sobre os ajustes propostos.
3. Desenho da Implementação Essencial: Instalação em 15 dias ou versão em grupo; preço; upgrade; garantia.
4. Quem faz cada papel da entrega (analista, redator, revisor de calls, CS, tecnologia).
5. Página: 8 entregas mais os ritos ou 9 entregas; trocar "Mentoria 1:1" por Sessões de Comando; promessa fria no hero; "gerente comercial" alinhado à promessa.
6. GSAAS: desenho, preço e quem conduz o grupo depois dos 90 dias.
7. Nome "Triad H.": aprovação, busca de marca e grafia pública; se os pilares viram as quatro áreas do growth hacking.
8. Tese do closer: o Júnior confirma que é dele e topa publicá-la.
9. Lucro por lead: o Relatório mede receita por lead e custo por venda; lucro pede a margem do cliente.
10. Contrato no formato novo, sem nenhum poder de gestão sobre o time do cliente.
11. Análise na página (R$ 497, promoção de lançamento, 60 minutos com o time) contra o registro (R$ 4.997, 30 a 45 minutos com o Júnior).
12. Critério de qualificação: R$ 5 mil e R$ 100 mil por mês, ou R$ 10 mil e R$ 150 mil a R$ 1,5 milhão.
13. Destinos da página: todos os botões levam à Análise e a calculadora saiu, contra as três portas (#66).
14. GSAAS e gerente nas seções 5 e 6 e no FAQ da página, contra a #68.
15. O FAQ da página ainda diz que as dez começam juntas, contra a #65.
16. Credenciais: R$ 579 ou R$ 600 milhões; R$ 120 ou R$ 126 milhões.
17. Linha do tempo da página: levar a semana 1, o dia 15, as fases de cor, as três Sessões e as calls em grupo.
18. Restos no Google Docs do Doc Mestre e no slide da Análise da apresentação.
19. Operação: quem assina a página e os criativos enquanto o nome não sai; teto de reuniões de venda do Júnior; meta e verba de mídia; parcelamento na Hotmart.
20. Outras aprovações do Júnior e do Euclides: credenciais, frase filosófica, Big Domino v2 e Ponte da Epifania, falas do Euclides nos criativos, narrativas do Doc Mestre, safra de clientes, "vendedor chato", publicar sobre gestão comercial.
21. Antes de a página ir ao ar: nota do Deming, depoimento do Júnior sobre o Marçal, uso real de IA nas entregas 1, 3, 5 e 8.
22. Sem decisão: PDV-90 como saída da Análise; iscas; o "AVS"; preço real do curso e da sessão.
23. Para depois: CRM próprio; quarto pilar; FigJam e apresentação do lançamento; linha editorial; volta da Formação Estrategista e Growth Hacker.

**Fatos a confirmar:** comprovantes das credenciais; números finais da safra de julho e se os 127 são o total de pré-qualificados ou os que não agendaram; data e autor do documento "Método Safra · A ideia central" (F7) e se o curso gravado é a Formação Estrategista e Growth Hacker; papel da Júlia; quem disse a tese do closer.

**Provas que faltam** (marcadas como [PROVA REAL] no CONTEXTO §7): comprovante de cada credencial e dos totais; autorização de nome e imagem de Marçal, Grupo Primo, Finch, Paulo e Camila Vieira; histórias de bastidor com número; fotos reais; caso de cliente ao fim de uma safra; números finais da safra de julho; depoimento de quem já contratou o Júnior; fonte do 95%; contagem real para o contador e para a barra de vagas da página.

Fonte: CONTEXTO §7 e §10.

---

## 11. Glossário

### Termos do Safra

| Termo | O que quer dizer | Fonte |
| --- | --- | --- |
| Safra | Os leads que entraram num mesmo mês | F11; F12 |
| Relógio (de maturação) | O prazo para o lead amadurecer, contado do dia em que ele entra; 90 dias no negócio do Júnior; cada cliente tem o seu | F11; #41 |
| Etapas | Pré-qualificação, agendamento, comparecimento e fechamento, cada uma com meta | F11 |
| Estágio | Posição do lead no funil, que só avança | F12 |
| Estado | Situação do contato: conversando, tentativa, abandonado, stand-by ou perdido | F12 |
| Perdido | Só quem disse não. Quem não respondeu ainda está no campo | F11; F1 |
| Metas por etapa | Taxa mínima de cada passagem, aprovada pelo dono (nunca "metas assinadas") | F12; PAINEL-iasv-safra.md |
| Leitura de trás para frente | Ler a safra do fechamento até a etapa que quebrou | F12 |
| Gestão Mensal de Leads | O problema: o mês como régua de tudo, inclusive do lead | F13 |
| Gestão de Leads por Safra | O método proprietário | #69 |
| Sistema de Vendas Safra | O sistema inteiro, com as sete peças | #69 |
| Ações isoladas | Mais anúncio, script novo, outro closer, cada uma julgada sozinha; o contrário de sistema | CONTEXTO §13 |
| Análise Estratégica do seu Comercial (ou do seu Sistema de Vendas) | A porta de entrada, aberta pelo quiz | #66 |
| Calculadora do Valor Potencial de Recuperação de Leads | A outra porta do quiz | #66 |
| Análise Estratégica das Safras | A entrega 1, na semana 1 | #56; #72 |
| Preparo do solo, Colheita, Plantio | As etapas 2, 3 e 4 dos 90 dias | F11 |
| Sessões de Comando | As três calls individuais do Júnior com o dono e o head comercial | #83 |
| Calls em grupo | O Treinamento para Otimização da Conversão, semanal, com todos os clientes | #78; #79 |
| Grupo de suporte | O WhatsApp de cada cliente, com CS e IA de consulta | #76 |
| Fases de cor | Vermelho, amarelo e verde da linha do tempo dos 90 dias | #80 |
| GSAAS | Gestão de Safra as a Service, a continuidade depois dos 90 dias. A grafia (GSAAS ou GSaaS) ainda está a confirmar | #38; PAINEL-iasv-safra.md |
| Implementação Essencial | O downsell | #60 |
| Mecanização da Safra | Os agentes de IA; não é entrega, entra só como parte do GSAAS | #52; #58 |
| Rúcula, morango e melancia | A analogia dos tempos de decisão: cerca de 30, 60 e 90 dias | F14 |
| Vendedor chato | A postura: persistência com data, sem pressão | #26 |
| Funil perpétuo | O funil desde 10/11, sem lançamento | #50 |
| E.M.V. | Estrutura mínima viável do funil | CONTEXTO §13 |
| PDV-90 | Plano de Desenvolvimento de Vendas de 90 dias, mostrado na página como saída da Análise; sem decisão como entrega | Conversa "Wireframe da página de vendas Triad" (03/11); CONTEXTO lacuna 22 |
| Janela de início | Duas datas fixas por mês para os inícios, sem criar turma. Sugestão, não confirmada | Engenharia reversa (08/11) |

### Termos e frases a evitar

| Evitar | Por quê ou o que usar no lugar | Fonte |
| --- | --- | --- |
| "Mentoria", "curso", "ensinar" para a oferta, inclusive para as Sessões de Comando | É implementação, nunca mentoria (#53) | CONTEXTO §6 |
| "Mentoria 1:1" | Virou "Sessões de Comando com o Junior Neves" (#83) | CONTEXTO §6 |
| "Turma" | As 10 vagas não têm início comum (#65) | CONTEXTO §6 |
| GSAAS e "gerente" na primeira etapa | Regra #68; exceção: "gerente comercial" na página, para o papel do Júnior (#86) | CONTEXTO §6 |
| "Gerente de safra" | Papel do formato até 05/11; não existe no formato de 07/11 | CONTEXTO §13 |
| "Treinamento" e "Playbook" fora dos nomes das entregas | Só como nome de entrega | CONTEXTO §6 |
| "Método Safra" em público | Era nome de trabalho; o nome público é Sistema de Vendas Safra | F12; F13 |
| "Sistema de Vendas Safras" (plural) | O nome é no singular | Conversa "Wireframe da página de vendas Triad" |
| "Safras Misturadas" | Nome de trabalho do problema, trocado por Gestão Mensal de Leads (#40) | F13 |
| "Head de Gestão de Safra" | Nome antigo da continuidade; usar GSAAS | PAINEL-iasv-safra.md |
| "10x" | Proibido | CONTEXTO §6 |
| Os 4% como "métrica de mercado" | São o produto das metas por etapa (50% × 50% × 75% × 20% = 3,75%) | CONTEXTO §6; F12 |
| "94% do seu problema de vendas" | O número de Deming fala de empresas em geral, não de vendas | CONTEXTO §6 |
| Totais autodeclarados sem comprovante | CDC, art. 30, e CONAR | CONTEXTO §6 e §8 |
| Tema político | Proibido | CONTEXTO §6 |
| "Colher resultado em 15 dias", resultado ligado ao contrato ou a prazo | Só "sistema instalado em 15 dias", se cumprido | CONTEXTO §6 e §8 |
| Prazo ou data para as 10 vagas | A urgência é só o preço até a 10ª venda | CONTEXTO §6 |
| "A oferta mais robusta do mercado" | Sem base publicada | CONTEXTO §6 |
| "De R$ 60 mil por R$ 45 mil" | Um "de" nunca praticado é propaganda enganosa | F11; PAINEL-iasv-safra.md |
| "Pendente dos sócios" | Usar "pendente de aprovação do Júnior e do Euclides" | PAINEL-iasv-safra.md |
| "Metas assinadas" | Usar "metas aprovadas pelo dono" | PAINEL-iasv-safra.md |
| Nome de Marcus Lemonis e da série The Profit nas peças | Referência só interna | CONTEXTO §6 |
| Palavras queimadas: reunião, relatório de vaidade, consultoria, mentoria, curso, programa, máquina de vendas | Rejeitadas pela persona | F3; CONTEXTO §4 |
| Frases gastas no mercado: "sem depender de você", "o problema não é lead", "previsibilidade", "máquina de vendas", "balde furado", "vazamento", entre outras | Usadas por concorrentes | FONTE-concorrencia-vendas.md (F10); CONTEXTO §5 |
| "Ponto cego", "lead parado", "máquina", "engrenagem", "arquitetura", "implementadora" | Já ocupados por concorrentes | F13 |
| "CRM" e "o lead ficou mais caro" na versão da Big Idea para o comprador | Direcionamento seu de 22/10 | Conversa "Relatório do projeto e método Safra" |
| Nomes antigos das entregas: Leitura das Safras, Recuperação do Solo, Adubo, Recuperação de Safras, Cultivo, Manual de Gestão de Vendas por Safra, Relatório de Produtividade da Colheita | Trocados pelos nomes de 01/11 (#56) | CONTEXTO §13 |

---

## 12. Fontes usadas

**Arquivos deste projeto:** CONTEXTO-DO-PROJETO.md (v5.3); claude/FONTE-ficha-do-servico.md (F11); claude/FONTE-metodo-safra-diferenciacao.md (F12); claude/FONTE-mecanismo-unico.md (F13); claude/FONTE-big-idea.md (F14); claude/FONTE-oferta.md (F15); claude/FONTE-promessa.md (F16); claude/FONTE-downsell.md (F17); claude/FONTE-call-decisao-07-11.md (F25); claude/FONTE-call-alinhamento-28-10.md (F22); claude/FONTE-call-brainstorming.md (F1); Buyer Persona.md (F2); claude/FONTE-mapa-de-empatia.md (F3); claude/FONTE-concorrencia-vendas.md (F10); FONTE-metodo-safra.md (F7); claude/PAINEL-iasv-safra.md.

**Documentos online:** Ficha do Serviço; Oferta; Downsell; Promessa central; One pager; Engenharia reversa das entregas · IASV Safra.

**Conversas:** "Wireframe da página de vendas Triad" (01 a 07/11); "Feedbacks do Junior sobre página de vendas" (04/11); "Relatório do projeto e método Safra" (22/10); a conversa de 08/11 em que este dossiê foi feito.
