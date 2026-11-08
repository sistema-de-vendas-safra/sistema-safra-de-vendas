---
id: entregas-do-servico
versao: 2
status: decidido
aprovado_por:
  otavio: 2026-11-01
depende_de:
  - id: ficha-de-fatos
    versao: 3
  - id: decisoes
    versao: 3
  - id: lacunas
    versao: 3
  - id: produto
    versao: 2
desatualizado: true
---

# Entregas do serviço

As entregas da IASV Safra: o nome oficial, o que cada uma é, a descrição da horta (só na descrição), quando sai e o critério de pronto; depois, a ordem e o porquê. O formato do serviço (etapas, ritos, quem faz o quê) está em `produto`.

**Status.** Decidido. Os nomes são do Otávio (#56, 01/11/2026); os entregáveis foram aprovados pelo Júnior e pelo Euclides em #48; a Mecanização saiu em #52 (Euclides); o calendário é o do Júnior na call de 07/11 (#72 a #75, #77) e a análise de calls continua no Treinamento (#88).

**Como ler.**
- **Nomes:** os nomes oficiais e a ordem estão em ficha-de-fatos#nomes-das-entregas. O design system manda usá-los "exatamente assim em materiais e interfaces" (DS, pagina-documentacao.html, "Implementação em 8 entregas"). Os títulos abaixo repetem esses nomes para o documento ser legível; o que vale é a ficha.
- **Número de entregas:** ficha-de-fatos#numero-de-entregas (#52, #56). A página segue o registro, sem a "Mentoria 1:1" como entrega a mais (lacuna-05, resolvida em 08/11/2026); o contrato ainda diverge (outros-06). As Sessões de Comando são rito, não entrega (#83; `produto`).
- **Quando:** cada entrega cita o seu campo, de ficha-de-fatos#quando-entrega-1 a ficha-de-fatos#quando-entrega-8. "As datas ainda são de trabalho": até a engenharia reversa, valem três marcos, a Análise na semana de ficha-de-fatos#quando-entrega-1, tudo entregue em ficha-de-fatos#sistema-instalado e o fechamento em ficha-de-fatos#quando-entrega-8 (Ficha do Serviço online).
- **Horta:** "A horta fica no método e nas descrições, nunca no nome nem no problema" (CTX §6; #56). Por isso a imagem da horta aparece em linha própria, separada do que a entrega é.
- **Calendário por dia:** **não entra.** O calendário por dia da engenharia reversa (ficha-de-fatos#calendario-por-dia) é proposta, não confirmada (ficha-de-fatos#calendario-por-dia; lacuna-01; outros-01).
- Texto entre aspas é literal da Ficha do Serviço online, que vale sobre a cópia F11.

---

## 1. Análise Estratégica das Safras

- **O que é:** "em que etapa cada safra travou, quantos leads estão parados e qual é o relógio do negócio, feita pelo Júnior na primeira call". Na primeira Sessão de Comando (duração em ficha-de-fatos#sessoes-de-comando), as safras do histórico do cliente (ficha-de-fatos#insumo-do-cliente) são lidas de trás para frente, o relógio do negócio é calculado e o dono aprova as metas de cada etapa.
- **Horta:** "Antes de plantar, o agricultor percorre a lavoura: vê o que vingou, o que secou e quanto tempo cada cultura leva para dar fruto. É aqui que o dono descobre se o negócio dele é rúcula, morango ou melancia."
- **Quando:** ficha-de-fatos#quando-entrega-1.
- **Está pronta quando:** "Foi apresentada ao dono, que aprovou as metas de cada etapa".
- **Quem faz:** "O Júnior, com os dados do cliente".
- **Decisões:** #56 (nome), #72 (semana e relógio a partir da primeira call).
- **Atenção:** a entrega 1 não é a Análise da porta de entrada. A da porta, desde a #92, é o diagnóstico do quiz (ficha-de-fatos#analise-conteudo; a Ficha do Serviço online ainda a descreve como a versão da call); a completa, "com documento e painel, é a entrega 1" (Ficha do Serviço online, "Porta de entrada"). O nome público da Análise da porta está em ficha-de-fatos#analise-nome-publico, **campo em conflito · bloqueado para entrega até a decisão**. Nome antigo: Leitura das Safras (CTX §13).

## 2. Implementação da Infraestrutura

- **O que é:** "o CRM que o cliente já usa, organizado por safra. Cada lead tem safra, etapa e situação, e ninguém vira perdido sem dizer não. O Júnior passa as mudanças em formato de aula e tarefa, com documento e gravação, e o time do cliente executa" no prazo de ficha-de-fatos#execucao-do-time. Na call de 07/11, o Júnior descreveu o trabalho: ler a operação (CRM, colunas, processo do SDR e do closer, script, dados), escrever as mudanças personalizadas e passá-las numa call, "em formato de aula e tarefa" (F25, seção 1).
- **Horta:** "Terra compactada não segura semente: antes de plantar, o solo é revolvido e corrigido. Cada lead volta para o lugar certo antes de o time voltar a trabalhar."
- **Quando:** ficha-de-fatos#quando-entrega-2.
- **Está pronta quando:** "Todo lead novo entra certo por 5 dias úteis seguidos".
- **Quem faz:** "O Júnior passa; o time do cliente executa" (Ficha do Serviço online, etapa Preparo do solo).
- **Decisões:** #56, #70 (CRM do cliente), #74 (aula e tarefa, executada pelo time do cliente).

## 3. Playbook de Comunicação Persuasiva

- **O que é:** "a régua de contato e os roteiros, que definem quantas tentativas, em que intervalo e com que mensagem."
- **Horta:** "Adubo na dose e no intervalo certos faz a planta crescer até a colheita: demais queima, de menos não alimenta. O playbook define quantas vezes, de quanto em quanto tempo e com que mensagem o time volta ao lead."
- **Quando:** ficha-de-fatos#quando-entrega-3.
- **Está pronta quando:** "Aprovado pelo responsável e em uso pelo time".
- **Quem faz:** a Triad entrega; o time do cliente usa (Ficha do Serviço online, etapa Preparo do solo). A régua da call de 07/11 citada como exemplo foi "ilustrativo, não decidido" (F25, seção 2).
- **A postura da régua:** "O time trabalha como o 'vendedor chato' que o Júnior admira: não larga o lead antes do não nem antes do fim do relógio, e cada contato tem data marcada. Insistência com método, não pressão." A postura é a #26, que depende de confirmação do Júnior (lacuna-20).
- **Decisões:** #56. Nome antigo: Adubo (CTX §13).

## 4. Recuperação de Ativos

- **O que é:** "os leads das safras antigas que nunca disseram não, em ordem de prioridade, de volta ao pipeline dentro do sistema de safras, retomados pelo time do cliente com a régua e os roteiros do Playbook de Comunicação Persuasiva."
- **Horta:** "Parte da lavoura dos meses passados ainda está no pé, madura, esperando quem colha. Antes de plantar de novo, o time colhe o que já estava lá."
- **Quando:** ficha-de-fatos#quando-entrega-4.
- **Está pronta quando:** "Cada lead da lista tem uma situação final".
- **Quem faz:** "O time do cliente, com o roteiro da Triad" (etapa Colheita). "Colheita feita pelo time do cliente" (#14).
- **Decisões:** #56, #77 ("Recuperação de Ativos fica"; F25: "para trazer a ideia de dinheiro parado"). Base legal para voltar aos leads antigos: LGPD, conferida no começo do serviço (Ficha do Serviço online; ficha-de-fatos#insumo-do-cliente; CTX §8). Nomes antigos: Recuperação do Solo, Recuperação de Safras (CTX §13).

## 5. Painel de Safras

- **O que é:** "os dados do cliente ligados a um painel com cada safra, etapa e vendedor e o relógio visível, a mesma visão que o Júnior tem no CRM dele."
- **Horta:** "O agricultor sabe o que está em cada canteiro e quantos dias faltam para colher. O painel põe isso na tela."
- **Quando:** ficha-de-fatos#quando-entrega-5.
- **Está pronta quando:** "Atualiza sozinho e é lido na call semanal".
- **Quem faz:** "a Triad liga o painel" (etapa Preparo do solo). Quem liga o painel aos dados de cada cliente ainda não tem nome (Ficha do Serviço online, "O que ainda falta decidir"; lacuna-04).
- **Decisões:** #56, #71 ("Painel de Safras ligado aos dados do cliente, ideia do Euclides").

## 6. Treinamento para Otimização da Conversão

- **O que é:** a parte teórica sai primeiro (ficha-de-fatos#quando-entrega-6); "dali em diante, a call semanal em grupo, com o Júnior e o Euclides e todos os clientes, que olha os números de cada um e decide o ajuste da semana." Junto, calls de venda de cada cliente são analisadas e devolvidas no grupo de suporte dele (ficha-de-fatos#analise-de-calls). A quantidade de calls em grupo está em ficha-de-fatos#calls-em-grupo, **quantidade em conflito · bloqueado para entrega até a decisão**.
- **Horta:** "Lavoura não se planta e se abandona: alguém passa por ela toda semana, tira a praga e corrige o que precisa."
- **Quando:** ficha-de-fatos#quando-entrega-6. A tabela da Ficha do Serviço online põe só as semanas das calls em grupo na coluna Quando e diz no texto que a parte teórica sai antes.
- **Está pronta quando:** "Uma ata por call, com as decisões e os responsáveis de cada cliente".
- **Quem faz:** "O time do cliente, com o Júnior e o Euclides nas calls em grupo" (etapa Plantio).
- **Decisões:** #56, #73 (parte teórica até o marco de ficha-de-fatos#sistema-instalado), #78, #79, #88.
- **Cuidado de nome:** "Treinamento" e "Playbook" só como nomes de entregas (CTX §6); pedem descrição de execução instalada (CTX §9, leitura 3).

## 7. Playbook da Gestão de Vendas por Safra

- **O que é:** "o manual de instruções do sistema, entregue no preparo do solo para o time operar desde o começo e seguir com ou sem a Triad; alimenta a IA de consulta do grupo."
- **Horta:** "O que se aprende plantando passa de uma estação para a outra. O playbook guarda o jeito de operar para o time seguir sozinho" depois do serviço (ficha-de-fatos#duracao).
- **Quando:** ficha-de-fatos#quando-entrega-7.
- **Está pronta quando:** "Entregue e revisado com o responsável".
- **Quem faz:** o Júnior entrega na segunda Sessão de Comando (Ficha do Serviço online, etapa Preparo do solo). Na call de 07/11, o Júnior pediu que ele fosse para o preparo do solo: "o sete tem que estar no lugar do três" (F25, seção 1).
- **Decisões:** #56, #75 ("Playbook da Gestão no preparo do solo").
- **Fica com o cliente:** ao sair, o cliente leva os dados e o Playbook; nenhum acesso fica retido (Ficha do Serviço online, regras propostas do GSAAS; Oferta online, "Saída limpa"). Nome antigo: Manual de Gestão de Vendas por Safra (CTX §13).

## 8. Relatório de Produtividade

- **O que é:** "as safras antigas comparadas com o número de antes, os indicadores das novas e a data em que cada uma termina."
- **Horta:** "No fim da estação, o agricultor pesa o que colheu e compara com a safra anterior."
- **Quando:** ficha-de-fatos#quando-entrega-8.
- **Está pronta quando:** "Apresentado pelo Júnior na terceira Sessão de Comando".
- **Quem faz:** o Júnior apresenta (ficha-de-fatos#sessoes-de-comando).
- **O que mede** (Ficha do Serviço online, "Como saber que funcionou", para o cliente): o principal são as vendas fechadas nas safras antigas durante a Colheita, comparadas com o número de antes, registrado na Análise Estratégica das Safras; depois, as etapas das safras novas contra as metas aprovadas pelo dono; e o uso (todo lead com safra, etapa e situação; o responsável presente nas calls em grupo). Sem meta prometida em contrato (#39; ficha-de-fatos#garantia).
- **Pendência:** a promessa de 08/11 fala em lucro por lead; o Relatório mede receita por lead e custo por venda, e lucro pede a margem do cliente (lacuna-09).
- **Decisões:** #56. Nome antigo: Relatório de Produtividade da Colheita (CTX §13).

---

## A ordem e o porquê

> "Primeiro a Implementação da Infraestrutura, depois o Playbook de Comunicação Persuasiva, depois a Recuperação de Ativos. Os leads antigos só voltam a ser trabalhados quando o CRM já registra cada contato do jeito certo e a régua já está aprovada. Assim, nenhuma retomada se perde e cada uma pode ser medida."

Fonte: Ficha do Serviço online ("Por que nessa ordem"). O mesmo está no One pager online ("A ordem").

Nas etapas do serviço (`produto`), as entregas se agrupam assim: a entrega 1 é a Análise Estratégica das Safras; as entregas 2, 7, 3 e 5 formam o Preparo do solo; a entrega 4 é a Colheita; a entrega 6 é o Plantio; a entrega 8 fecha (Sistema de Vendas Safra online, "Como o método vira serviço"; Ficha do Serviço online).

---

## O que não é entrega

- **Mecanização da Safra:** fora da implementação (#52, #77). Os agentes de IA viram ferramentas para alugar na continuidade (#58, #84; ficha-de-fatos#gsaas).
- **Sessões de Comando, calls em grupo, análise de calls e grupo de suporte:** são ritos do serviço, descritos em `produto` (#76, #78, #83, #88).
- **"Mentoria 1:1":** não é entrega nem nome de rito (#53, #83; F25, divergência 1; lacuna-05).
- **Plano de ação de 90 dias (PDV-90) como saída da Análise:** sem decisão (lacuna-22, conflito-10).

---

## Pendências que tocam as entregas

| O que falta | Onde |
|---|---|
| Número de entregas no contrato (a página segue o registro desde 08/11/2026) | ficha-de-fatos#numero-de-entregas; outros-06 |
| Calendário por dia e horas por entrega | ficha-de-fatos#calendario-por-dia; lacuna-01 |
| Quem faz CS, IA de consulta e a ligação do painel | lacuna-04, outros-05 |
| Uso real de IA nas entregas 1, 3, 5 e 8, antes de a página ir ao ar | lacuna-21 |
| Teste de compreensão dos nomes das entregas com donos | lacuna-25 |
| Contrato só com o escopo das entregas, com data e critério de pronto | lacuna-10; #39 |

---

## Fontes

- Ficha do Serviço online: 03-documentos-online/Ficha do Serviço · Implementação Avançada do Sistema de Vendas Safra.md (tabela "O que o cliente recebe", etapas, "Por que nessa ordem", "A postura da régua", "Como saber que funcionou"). Vale sobre a cópia F11.
- One pager online e Sistema de Vendas Safra online (03-documentos-online/), para a ordem e o agrupamento por etapa.
- DS: fontes/design-system-v1.0/pagina-documentacao.html ("Implementação em 8 entregas").
- F25: 02-arquivos-do-projeto/claude/FONTE-call-decisao-07-11.md (seções 1, 2 e 6).
- CTX §3 ("As 8 entregas"), §6, §8, §9, §13: 02-arquivos-do-projeto/CONTEXTO-DO-PROJETO.md (v5.3).
- Decisões #14, #26, #39, #48, #52, #53, #56, #58, #70 a #79, #83, #84, #88 (base/decisoes.md).
