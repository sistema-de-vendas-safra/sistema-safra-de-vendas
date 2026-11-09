---
id: landing-page-01-pecas-por-entrega
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: entregas-do-servico
    versao: 4
  - id: metodo
    versao: 4
  - id: ficha-de-fatos
    versao: 4
  - id: landing-page-01-copy
    versao: 4
  - id: lacunas
    versao: 6
  - id: decisoes
    versao: 5
desatualizado: true
---

# Landing-page-01 · peças que cada entrega instala (rascunho)

Rascunho da lista que a 17.5 pede (aceita em 09/11/2026, #114: "definir a lista e pôr na próxima versão da copy da página"), escrito na etapa 34 (prompts/11-decisoes-de-09-11.md) para o Otávio aprovar. **A página não muda até a aprovação:** o filtro da seção 05 continua marcando a peça escolhida e mostrando todas as entregas, com a etiqueta "a definir" (17.5).

**Status.** Rascunho, pendente do Otávio. Desatualizado, porque se apoia na copy da landing (v4), marcada pela cadeia da pauta (regra 11.1).

**Como ler.**
- As sete peças são as de `metodo` ("O Sistema de Vendas Safra é o todo"; #69). As entregas, pelo número; o nome de cada uma está em ficha-de-fatos#nomes-das-entregas e não é copiado aqui.
- Cada ligação entre peça e entrega cita o trecho de `entregas-do-servico` que a sustenta e, quando houver, a linha da peça em `landing-page-01-copy` (seção 03b, "Uma linha por peça"). Não há em `entregas-do-servico` nem em `metodo` uma tabela de peças por entrega: toda ligação abaixo é **proposta de leitura**, nenhuma é decisão.
- Onde nenhum texto da base liga a peça à entrega, fica **a definir**. Nada foi inventado.

---

## A lista proposta

| Entrega | Peças propostas | O que sustenta | A definir |
|---|---|---|---|
| 1 ({{ficha-de-fatos#nomes-das-entregas:1}}) | Dados | "as safras do histórico do cliente são lidas de trás para frente, o relógio do negócio é calculado e o dono aprova as metas de cada etapa"; na copy, Dados é "cada número com a safra de onde veio, contra a meta de etapa que você aprovou" | Inteligência Artificial (uso real de IA na entrega 1, lacuna-21); as outras cinco peças |
| 2 ({{ficha-de-fatos#nomes-das-entregas:2}}) | Tecnologia; Processos | Tecnologia: "o CRM que o cliente já usa, organizado por safra"; na copy, "o CRM montado por safra". Processos: "Cada lead tem safra, etapa e situação, e ninguém vira perdido sem dizer não" (regras do CRM); na copy, Processos inclui "as regras do CRM" | Dados (a entrega dá safra, etapa e situação a cada lead, mas a copy liga Dados à meta aprovada, não ao CRM); as outras peças |
| 3 ({{ficha-de-fatos#nomes-das-entregas:3}}) | Processos; Mentalidade de Vendas | Processos: "a régua de contato e os roteiros, que definem quantas tentativas, em que intervalo e com que mensagem"; na copy, Processos inclui "a régua de contato". Mentalidade de Vendas: "A postura da régua", o "vendedor chato" que "não larga o lead antes do não nem antes do fim do relógio"; na copy, a mesma frase é a linha da Mentalidade de Vendas. **A postura é a #26, que depende de confirmação do Júnior (lacuna-20):** essa ligação fica presa a ela | Inteligência de Mercado (a copy fala em "roteiro e argumento" a partir do que o cliente pergunta e objeta; `entregas-do-servico` fala em roteiros, sem dizer de onde vêm); Inteligência Artificial (lacuna-21); as outras peças |
| 4 ({{ficha-de-fatos#nomes-das-entregas:4}}) | nenhuma proposta | A entrega usa "a régua e os roteiros do Playbook de Comunicação Persuasiva" (entrega 3) para retomar os leads antigos; usar uma peça instalada noutra entrega não é instalar | Todas as sete peças |
| 5 ({{ficha-de-fatos#nomes-das-entregas:5}}) | Dados; Tecnologia | Dados: "os dados do cliente ligados a um painel com cada safra, etapa e vendedor e o relógio visível". Tecnologia: o painel ligado aos dados do cliente (#71); na copy, "o painel ligado às suas ferramentas". Quem liga o painel continua sem nome (lacuna-04) | Inteligência Artificial (uso real de IA na entrega 5, lacuna-21); as outras peças |
| 6 ({{ficha-de-fatos#nomes-das-entregas:6}}) | Inteligência Humana | "calls de venda de cada cliente são analisadas e devolvidas no grupo de suporte" (ficha-de-fatos#analise-de-calls; #88); na copy, Inteligência Humana é "quem vende, preparado com as calls de venda do próprio time analisadas" | Processos (a copy põe "o rito da semana" em Processos, mas escrito no Playbook da entrega 7, e as calls em grupo são rito, não entrega: "O que não é entrega"); Inteligência de Mercado; as outras peças |
| 7 ({{ficha-de-fatos#nomes-das-entregas:7}}) | Processos | "o manual de instruções do sistema, entregue no preparo do solo para o time operar desde o começo"; na copy, Processos é "a régua de contato, as regras do CRM e o rito da semana, tudo por escrito no {{ficha-de-fatos#nomes-das-entregas:7}}" | Inteligência Artificial (a entrega "alimenta a IA de consulta do grupo", mas quem constrói a IA de consulta ficou para depois, #84, e a copy não a anuncia); as outras peças |
| 8 ({{ficha-de-fatos#nomes-das-entregas:8}}) | Dados | "as safras antigas comparadas com o número de antes, os indicadores das novas e a data em que cada uma termina" | Inteligência Artificial (uso real de IA na entrega 8, lacuna-21); a medida de lucro (lacuna-09); as outras peças |

## Por peça (a mesma lista, lida ao contrário)

| Peça | Entregas propostas | A definir |
|---|---|---|
| Mentalidade de Vendas | 3 (presa à #26) | as outras |
| Inteligência Humana | 6 | as outras |
| Inteligência de Mercado | nenhuma | todas: nenhum texto da base diz que entrega transforma o que o cliente pergunta e objeta em roteiro |
| Inteligência Artificial | nenhuma | todas: o uso real de IA nas entregas 1, 3, 5 e 8 está em aberto (lacuna-21), e a IA de consulta ficou para depois (#84) |
| Processos | 2, 3, 7 | as outras |
| Dados | 1, 5, 8 | as outras |
| Tecnologia | 2, 5 | as outras |

## O que o Otávio decide

1. Se as ligações propostas valem (cada uma pode ser aceita ou cortada sozinha).
2. O que fazer com as peças sem entrega (Inteligência de Mercado e Inteligência Artificial): ligar a alguma entrega, ou o filtro mostra para elas uma frase como "a peça atravessa o serviço" (texto a escrever), ou elas saem do filtro.
3. Se a ligação da Mentalidade de Vendas espera a #26 (Júnior) ou entra já.

Depois da aprovação, a lista entra na próxima versão de `landing-page-01-copy` (seção 05, filtro) e o filtro das duas variantes passa a filtrar (17.5). Se o Otávio decidir tirar o filtro, saem os botões e a frase "toque para filtrar" nas duas variantes, e a última linha da 03b muda (pergunta 17.5, "Se decidir diferente").

## Fontes

- `entregas-do-servico` v4 (as oito entregas, "O que não é entrega", "Pendências que tocam as entregas"); `metodo` v4 (as sete peças); `landing-page-01-copy` v4 (seção 03b, "Uma linha por peça"; seção 05, filtro).
- Decisões #26, #69, #71, #84, #88, #114 (base/decisoes.md); lacuna-04, lacuna-09, lacuna-20, lacuna-21 (base/lacunas.md).
- Pergunta 17.5 (prompts/07-fila-perguntas.md); pergunta 34.14 (prompts/11-fila-perguntas.md).
