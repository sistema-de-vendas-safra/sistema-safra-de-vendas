---
id: produto
versao: 3
status: decidido
aprovado_por:
  otavio: 2026-11-08
depende_de:
  - id: ficha-de-fatos
    versao: 3
  - id: decisoes
    versao: 3
  - id: lacunas
    versao: 4
desatualizado: true
---

# Produto · IASV Safra

O formato da IASV Safra (Implementação Avançada do Sistema de Vendas Safra): o que é, as etapas, os ritos, quem faz o quê, o que o cliente precisa fazer e o que não está incluído. O sistema e o método estão em `metodo`; o problema, a Big Idea e a crença, em `mecanismo`; a oferta montada, em `oferta`; cada entrega, com o critério de pronto, em `entregas-do-servico` (que depende deste documento).

**Status.** Decidido. O formato vem das decisões #70 a #79, tomadas pelo Júnior com o Otávio na call de 07/11 (F25), e das decisões #83, #84 e #88, do Otávio, em 08/11 (CTX §11). Uma parte depende da promessa de 08/11 (#85), que está pendente do Júnior e do Euclides: está marcada onde aparece.

**Como ler.** Fatos (prazos, números, preços) não aparecem aqui: são citados pelo id do campo em `ficha-de-fatos`. Decisões são citadas pelo número de `decisoes` (#n). Pendências, pelo id de `lacunas`. As abreviações de fonte são as da ficha de fatos (CTX §n, F1 a F25, "online" para o documento de 03-documentos-online, que vale sobre a cópia FONTE).

---

## O que é

| Ponto | O que vale | Fonte |
|---|---|---|
| Nome | Implementação Avançada do Sistema de Vendas Safra, a IASV Safra; primeiro produto do pilar de Vendas da Triad | #46; CTX §1, §3 |
| Natureza | "implementação, nunca mentoria" | #53; CTX §6, §9 (leitura 3) |
| Duração | ficha-de-fatos#duracao | #46; Ficha do Serviço online |
| Quando o relógio começa | ficha-de-fatos#inicio-do-relogio | #72; Ficha do Serviço online |
| Sistema instalado | ficha-de-fatos#sistema-instalado; dali até o fim é acompanhamento e otimização | #73; Ficha do Serviço online ("Como funcionam os 90 dias") |
| Onde roda | No CRM que o cliente já usa: "ninguém precisa trocar de CRM". CRM próprio da Triad só depois da validação | #70; Ficha do Serviço online ("Em 30 segundos"; "Fica para depois") |
| Entregas | As de ficha-de-fatos#nomes-das-entregas, detalhadas em `entregas-do-servico`. O número está em ficha-de-fatos#numero-de-entregas (#52, #56). A página segue o registro (lacuna-05, resolvida em 08/11/2026); o contrato ainda tem o formato antigo (outros-06) | #52, #56; Ficha do Serviço online |
| Em uma linha | "Um jeito novo de gerir o comercial: cada mês de leads vira uma safra, com prazo para amadurecer e meta em cada etapa" | Ficha do Serviço online ("Em 30 segundos") |
| O que muda para o dono | "O dono passa a saber em que etapa a venda trava e para de largar o lead que ainda não disse não" | Ficha do Serviço online ("Em 30 segundos") |
| Para quem | ficha-de-fatos#criterio-de-qualificacao, **campo em conflito · bloqueado para entrega até a decisão** (lacuna-12, conflito-01) | Ficha do Serviço online; landing; quiz; F22 |
| Preço | ficha-de-fatos#preco-avancada e ficha-de-fatos#preco-avancada-depois | #57; Ficha do Serviço online |

**Não serve para quem** (Ficha do Serviço online, "Não serve para quem"):
- "Ainda não tem leads chegando: precisa de marketing antes."
- "Quer curso ou conteúdo para assistir, e não a implementação dentro da própria operação."
- "Quer que alguém venda por ele."
- "Vende sem conversa, como no balcão ou no e-commerce."

---

## As quatro etapas

A Ficha do Serviço online organiza o serviço (ficha-de-fatos#duracao) em quatro etapas com nome de lavoura. A horta fica na descrição das etapas e das entregas, nunca no nome das entregas (#56; CTX §6).

| Etapa | Quando | O que acontece | Quem faz | Fonte |
|---|---|---|---|---|
| Análise Estratégica das Safras | ficha-de-fatos#quando-entrega-1 | Na primeira Sessão de Comando, as safras do histórico do cliente (ficha-de-fatos#insumo-do-cliente) são lidas de trás para frente, o relógio do negócio é calculado e o dono aprova as metas de cada etapa | O Júnior, com os dados do cliente | #72; Ficha do Serviço online |
| Preparo do solo | ficha-de-fatos#quando-entrega-2 | Na segunda Sessão de Comando, o Júnior passa as mudanças em formato de aula e tarefa e entrega o Playbook da Gestão de Vendas por Safra; o time do cliente executa (ficha-de-fatos#execucao-do-time). A Triad liga o Painel de Safras aos dados do cliente, e o Playbook de Comunicação Persuasiva chega até o marco de ficha-de-fatos#sistema-instalado | "O Júnior passa; o time do cliente executa; a Triad liga o painel" | #71, #73, #74, #75; Ficha do Serviço online |
| Colheita | ficha-de-fatos#quando-entrega-4 | Recuperação de Ativos: "os leads antigos que nunca disseram não voltam ao pipeline, dentro do sistema de safras" | "O time do cliente, com o roteiro da Triad" | #14, #77; Ficha do Serviço online |
| Plantio | ficha-de-fatos#quando-entrega-6 (parte em grupo) | "As safras novas entram com relógio e meta; o Treinamento para Otimização da Conversão vira a call semanal em grupo" | "O time do cliente, com o Júnior e o Euclides nas calls em grupo" | #78, #79; Ficha do Serviço online |

**As datas ainda são de trabalho.** A Ficha do Serviço online avisa que o tempo de cada etapa sai da engenharia reversa; até lá valem três marcos: a Análise na semana de ficha-de-fatos#quando-entrega-1, tudo entregue em ficha-de-fatos#sistema-instalado e o fechamento em ficha-de-fatos#quando-entrega-8. O calendário por dia da engenharia reversa é proposta (ficha-de-fatos#calendario-por-dia; lacuna-01) e não entra aqui.

**O que o serviço fecha e o que não fecha.** As safras antigas fecham dentro do serviço, e é por elas que a implementação é medida. As safras novas fecham depois (ficha-de-fatos#safras-novas): "Isso é dito na venda, nunca escondido." Elas fecham com o GSAAS ou com o time do cliente seguindo o Playbook da Gestão de Vendas por Safra (Ficha do Serviço online).

---

## Os ritos

| Rito | O que é | Fato | Decisão | Fonte |
|---|---|---|---|---|
| Sessões de Comando com o Junior Neves | As calls individuais com o dono e o head comercial do cliente: a Análise Estratégica das Safras, a passagem das mudanças e o fechamento, com o Relatório de Produtividade. Nunca chamar de "mentoria" (#53; F25, divergência 1) | ficha-de-fatos#sessoes-de-comando | #78 (formato), #83 (nome) | CTX §3, §13; Ficha do Serviço online |
| Calls em grupo | Semanais, com todos os clientes; cada empresa mostra os números da semana, "e o caso de uma serve para todas, porque o sistema é o mesmo". São o Treinamento para Otimização da Conversão | ficha-de-fatos#calls-em-grupo, **quantidade em conflito · bloqueado para entrega até a decisão** (outros-03) | #78, #79 | Ficha do Serviço online; F25 |
| Análise de calls | Calls de venda de cada cliente analisadas e devolvidas no grupo de suporte dele, dentro do Treinamento para Otimização da Conversão | ficha-de-fatos#analise-de-calls | #88 | CTX §3; Ficha do Serviço online |
| Grupo de suporte | Um grupo de WhatsApp por cliente, com o time da Triad, o dono e o time dele; um CS responde e uma IA treinada nas reuniões gravadas, no Playbook da Gestão de Vendas por Safra e no método tira as dúvidas de execução ("o que o Júnior quis dizer com isso?") | ficha-de-fatos#grupo-de-suporte | #76; quem faz o CS e a IA ficou para depois (#84; lacuna-04) | Ficha do Serviço online |

**A regra de #79 e a promessa de 08/11.** Pela #79, "o compromisso prometido com o Júnior são as três individuais" (ficha-de-fatos#sessoes-de-comando), e a presença dele no grupo entra como entrega a mais. A promessa de 08/11 (#85) transforma a liderança do Júnior e do Euclides durante o serviço em compromisso público, e "a regra de #79 ... cai se a promessa for aprovada" (CTX §3). Enquanto a #85 estiver pendente do Júnior e do Euclides, vale a #79 (decisoes #79, #85; lacuna-02).

---

## Quem faz o quê

| Quem | O que faz no serviço | Fonte |
|---|---|---|
| Junior Neves | Faz a Análise Estratégica das Safras e as Sessões de Comando de cada cliente; lê a operação e escreve as mudanças, que passa em aula e tarefa; apresenta o Relatório de Produtividade no fechamento; conduz as calls em grupo com o Euclides; acompanha o grupo de suporte | #72, #74, #78, #79, #83; CTX §3 (Pessoas); F25 |
| Euclides Vieira | Conduz as calls em grupo com o Júnior durante o serviço. Com a promessa de 08/11, a agenda dele nas calls em grupo vira "o segundo gargalo" (CTX §9, leitura 6) | #79; CTX §3, §9 |
| Time do cliente | Executa as mudanças da infraestrutura no próprio CRM (ficha-de-fatos#execucao-do-time); faz a Colheita e o Plantio: "Colheita feita pelo time do cliente" | #14, #74; Ficha do Serviço online |
| A Triad | Liga o Painel de Safras aos dados do cliente (ideia do Euclides); entrega o roteiro da Colheita; mantém o grupo de suporte com CS e IA | #71, #76; Ficha do Serviço online |
| CS, IA de consulta, analista, redator, revisor de calls, tecnologia | Papéis sem dono definido; ficaram para depois | #84; lacuna-04; outros-05 |

---

## O que o cliente precisa fazer

O que o cliente precisa fazer está em ficha-de-fatos#insumo-do-cliente: liberar os acessos e exportar o histórico de leads antes da primeira call; levar o sócio e o head comercial às Sessões de Comando; executar as mudanças com o próprio time; nomear uma pessoa responsável pela operação, que participa da call semanal em grupo; registrar todo lead no CRM a partir da Colheita; ter base legal para voltar aos leads antigos (LGPD). "Atraso do cliente pausa o cronograma, não o pagamento." (Ficha do Serviço online, "O que o cliente precisa fazer"). Os insumos a mais que a engenharia reversa propõe são sugestão (ficha-de-fatos#insumo-do-cliente, status; lacuna-01).

---

## O que não está incluído

Da Ficha do Serviço online ("Não está incluído"):
- "Gerar leads: tráfego, criativos ou conteúdo."
- "Contratar ou recrutar vendedores."
- "Treinar técnica de venda além dos roteiros e das calls em grupo do Treinamento para Otimização da Conversão."
- "Vender pelo cliente: a Colheita e o Plantio são feitos pelo time dele."
- "Executar as mudanças no CRM pelo cliente: quem executa é o time dele, com aula, tarefa e o grupo de suporte."
- "Trocar o CRM do cliente ou vender um CRM próprio."
- "Mudar a oferta, o preço ou o produto do cliente."
- "Integrações fora do padrão, que são orçadas à parte."

**A Mecanização da Safra fica fora da implementação** (#52, #77). Os agentes de IA (o de SDR primeiro, o de social seller depois) viram ferramentas para alugar depois do serviço, ou antes, se o cliente quiser; dentro do serviço, o time do cliente roda a régua e os roteiros (Ficha do Serviço online; #58, #84).

**Fica para depois:** o CRM próprio da Triad (#70, decisão depois da validação) e o copiloto de call (Ficha do Serviço online, "Fica para depois"; lacuna-23).

---

## Continuidade e downsell (só referência)

- **Continuidade:** o GSAAS, ficha-de-fatos#gsaas. Nome decidido (#38); desenho, preço e detalhes para depois (#84). Pendência em lacuna-06 e outros-04. Na primeira etapa do funil não se fala de GSAAS (#68).
- **Downsell:** a Implementação Essencial, ficha-de-fatos#downsell-nome. O preço está em ficha-de-fatos#downsell-preco, **campo em conflito · bloqueado para entrega até a decisão**; o desenho, em ficha-de-fatos#downsell-desenho, em revisão desde 07/11. Pendência em lacuna-03 e outros-02. A oferta do downsell na call está em `oferta`.

---

## Pendências que tocam o produto

| O que falta | Onde |
|---|---|
| Validar a engenharia reversa (calendário por dia, horas, MVP, Sessão 2 conjunta que mexe em #78) | lacuna-01, outros-01 |
| Promessa de 08/11 e a regra de #79 | lacuna-02, conflito-03 |
| Quem faz cada papel da entrega | lacuna-04, outros-05 |
| A página ainda no formato antigo das entregas e dos ritos | lacuna-05, conflito-11 |
| Contrato com o formato novo | lacuna-10, outros-06 |
| Início de cada cliente (ficha-de-fatos#inicio-de-cada-cliente) | lacuna-01, lacuna-15 |
| Safra de clientes (#16), sem a qual "vender mais vezes" fica sem entrega | outros-10 |

---

## Fontes

- CTX §1, §3 ("Oferta da IASV Safra", "As 8 entregas", "Pessoas"), §6, §8, §9, §11, §13: fontes/acervo-2026-11-08/safra-acervo/02-arquivos-do-projeto/CONTEXTO-DO-PROJETO.md (v5.3).
- Ficha do Serviço online: 03-documentos-online/Ficha do Serviço · Implementação Avançada do Sistema de Vendas Safra.md (08/11/2026). Vale sobre a cópia F11.
- F25: 02-arquivos-do-projeto/claude/FONTE-call-decisao-07-11.md (seções 1, 3 e 6).
- Decisões #14, #46, #52, #53, #56, #58, #68, #70 a #79, #83, #84, #85, #88 (base/decisoes.md).
