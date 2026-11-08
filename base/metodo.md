---
id: metodo
versao: 3
status: decidido
aprovado_por:
  otavio: 2026-11-03
depende_de:
  - id: ficha-de-fatos
    versao: 3
  - id: decisoes
    versao: 3
  - id: lacunas
    versao: 4
desatualizado: true
---

# Método · Sistema de Vendas Safra e Gestão de Leads por Safra

O que é o Sistema de Vendas Safra, o que é a Gestão de Leads por Safra, as seis regras do método e onde ele já roda. O problema que o método resolve, a Big Idea e a analogia da horta estão em `mecanismo`; o serviço que instala o método, em `produto`.

**Status.** Decidido pelo Otávio em 03/11/2026: "o sistema é o todo, e a Gestão de Leads por Safra é o método proprietário" (#69; CTX §11). As regras do método são do Júnior (F1, F7); a regra do relógio contado da entrada do lead é a #41.

**Como ler.** Fatos são citados pelo id do campo em `ficha-de-fatos`; decisões, pelo número de `decisoes` (#n); pendências, pelo id de `lacunas`. Abreviações de fonte como na ficha de fatos.

---

## O Sistema de Vendas Safra é o todo

O sistema tem sete peças (CTX §3, "Sistema de Vendas Safra (#69)"; CTX §13; Sistema de Vendas Safra online):

1. Mentalidade de Vendas
2. Inteligência Humana
3. Inteligência de Mercado
4. Inteligência Artificial
5. Processos
6. Dados
7. Tecnologia

A Gestão de Leads por Safra é "o método proprietário, a peça que resolve a venda complexa" (Sistema de Vendas Safra online; #69). As sete peças são os "7 componentes" da promessa de 08/11 (Promessa central online; #85, pendente).

**Ações isoladas** são o contrário de sistema: "mais anúncio, script novo, outro closer, cada uma julgada sozinha" (CTX §13). Cuidado: "sistema contra ações isoladas" sozinho é discurso ocupado no mercado; o que diferencia é a Gestão de Leads por Safra dizendo por que cada ação isolada falha (CTX §9, leitura 17, forte, F10, F13).

**Nomes.** O nome público é Sistema de Vendas Safra (#22). "Método Safra" foi o nome de trabalho e não é nome público (CTX §6; Sistema de Vendas Safra online). "Safra" colide com o Banco Safra na busca (F8; CTX §8), e a consulta ao INPI está fora de pauta por ora (#23).

---

## A Gestão de Leads por Safra

Em uma frase: "cada mês de captação vira uma safra, com relógio próprio de maturação contado da entrada de cada lead e metas por etapa aprovadas pelo dono, lida de trás para frente até achar onde a venda quebra" (Sistema de Vendas Safra online).

**De onde veio.** A pergunta que deu origem ao método é do Júnior: "Como é que eu metrifico e digo que o meu time foi bom em vendas no primeiro, no segundo, no terceiro, no quarto mês?" (F7; Sistema de Vendas Safra online). A analogia de origem também é dele: "o lead é a semente" (F1), a entrada na operação é o plantio e a venda é a colheita (F7).

**O que diferencia.** "No nicho de vendas, a Gestão de Leads por Safra é o único mecanismo que acompanha o lead pelo mês em que ele entrou (forte, F10). Os dez concorrentes analisados leem o mês comercial ou o funil inteiro." (Sistema de Vendas Safra online).

### As seis regras

| Elemento | Regra | Fonte |
|---|---|---|
| Safra | O grupo de leads captados em um mês | Sistema de Vendas Safra online; F7; CTX §13 |
| Relógio de maturação | Prazo para o lead amadurecer, contado do dia em que ele entra; varia por negócio e é calibrado com os dados de cada cliente na Análise Estratégica das Safras | #41; Sistema de Vendas Safra online; F7 |
| Estágio | Posição no funil, que só avança: captado, pré-qualificado, agendado, realizado, venda | Sistema de Vendas Safra online; F1 |
| Estado | Situação do contato: conversando, tentativa, abandonado, stand-by ou perdido. Perdido só quando o lead diz não: "perdido é quem falou não" | F1; Sistema de Vendas Safra online; CTX §3 |
| Metas por etapa | Taxa mínima esperada em cada passagem do funil, aprovada pelo dono. Os valores do Júnior estão em ficha-de-fatos#metas-por-etapa | F1; Sistema de Vendas Safra online; ficha-de-fatos#metas-por-etapa |
| Leitura de trás para frente | Começa no fechamento e recua até a etapa que quebrou: "Eu sempre tenho que olhar de trás para frente" | F7; Sistema de Vendas Safra online |

**Detalhes das regras de estado** (F1, fala do Júnior na call de 19/10):
- Todo stand-by tem data de volta ao contato: "todo stand-by tem que ter uma data de voltar ao contato".
- Abandonado é quem sumiu depois de esgotadas as tentativas de contato; o número de tentativas da operação do Júnior está em ficha-de-fatos#tentativas-ate-abandonado.
- Ao fim do relógio, nenhum lead da safra pode estar em "conversando" ou "tentativa": todos estão fechados, abandonados, em stand-by ou perdidos (F1).

**Estágio e estado** são duas coisas separadas: o estágio diz onde o lead parou no funil; o estado diz a situação do contato (CTX §13; F1).

### O rito semanal

Várias safras correm ao mesmo tempo. O rito semanal pergunta, para cada uma: quanto tempo resta, que metas já bateram, onde as oportunidades estão paradas e onde concentrar esforço agora. "Uma safra perto do fim e abaixo da meta recebe o esforço do time" (Sistema de Vendas Safra online; F7). No serviço, o rito semanal é a call em grupo do Treinamento para Otimização da Conversão (#78; ver `produto`).

### A conversão de lead em venda

A conversão total de lead em venda é o produto das metas por etapa (ficha-de-fatos#metas-por-etapa). O Júnior chama o número arredondado de "métrica de mercado" (F1, F7), mas não há fonte para isso: vale apresentá-lo "como consequência das metas, e não como referência de mercado sem fonte" (Sistema de Vendas Safra online). Em peça, nunca como métrica de mercado (CTX §6, "Nunca dizer").

### O que F7 e F1 diziam e que foi superado

- **O relógio.** F7 e F1 contam o prazo "após o encerramento do mês de captação". A regra decidida é outra: o relógio é contado do dia em que o lead entra (#41). Vale a #41.
- **Preço, nomes, entregas e relógio de F7** estão superados (CTX, Mapa de fontes, F7). Deste documento, só as regras do método saem de F7 (plano aprovado, parte 6).

---

## Onde o método já roda

**No leilão do Júnior.** O método roda desde julho de 2026 no CRM do clube de compra de imóveis de leilão nos EUA, operação do próprio Júnior (F1; Sistema de Vendas Safra online). Os números da safra de julho estão em ficha-de-fatos#safra-de-julho; os da meta, em ficha-de-fatos#metas-por-etapa. Na safra de julho, a leitura de trás para frente achou a quebra no começo do funil (na pré-qualificação), não no fechamento. Depois de reduzir a verba de campanha, o Júnior observou melhora na pré-qualificação (F7).

**O que isso prova e o que não prova** (Sistema de Vendas Safra online):
- "Prova que a leitura por safra localiza a etapa que quebra, numa operação real."
- "Não prova resultado em cliente: a leitura por safra ainda é experimental e rodou numa operação só (F7)."
- O fechamento documentado da safra de julho, com números por etapa e print do painel, é a primeira prova publicável. A safra fechou sem números finais registrados (ficha-de-fatos#safra-de-julho; outros-12).
- O que são os pré-qualificados de julho citados em ficha-de-fatos#safra-de-julho diverge entre F1 e F7: confirmar com o Júnior antes de usar (ficha-de-fatos#safra-de-julho; lacuna-24).

O painel do leilão como prova pública está estacionado (#27).

---

## Territórios: onde o método é livre e onde não é

Leitura qualitativa dos dez dossiês da concorrência (F10), registrada no Sistema de Vendas Safra online:

| Território | No mercado (F10) | Uso no Safra |
|---|---|---|
| Safra, coorte e maturação do lead | Livre nos dez; a DMB tangencia com previsão por prazo | O mecanismo |
| Gerente sênior nomeado, individual e contínuo | Só no plano de topo da Full Sales | Mais fraco desde 07/11: o Júnior nas Sessões de Comando e no grupo; depois, em aberto |
| Execução dentro da operação | Todos dizem; nenhum mostra quem executa | Mostrar quem faz o quê, por escrito |
| Metas por etapa e onde o funil quebra | Ocupado | Mesa de entrada |
| CRM e IA comercial | Ocupado | Meio, nunca manchete |
| Dono com time como cliente; aplicação e call | Ocupado | Mesa de entrada |
| Formação de vendedores | Ocupado por todos | Fora, ou complemento |

"O Safra não ganha por ter metas por etapa, que todo mundo tem. Ganha por dizer de qual safra é cada número e por ter o Júnior dirigindo a implementação, do começo ao fim." (Sistema de Vendas Safra online). Safra é território livre, "novo para o mercado, não para o mundo" (CTX §9, leitura 2, forte, F10, F23; F8).

---

## Limites e cuidados

Do Sistema de Vendas Safra online ("Limites e cuidados"), salvo onde indicado:

- **Novo para o mercado, não para o mundo.** Análise por coorte é prática conhecida de analytics nos EUA (F8). Não alegar invenção inédita.
- **Uso experimental.** A organização por safras rodou numa operação só, a do Júnior (F7). Falta [PROVA REAL: caso de empresa terceira ao fim de uma safra, com números por etapa e autorização].
- **O relógio é de cada negócio.** O da operação do leilão vale só para ela; cada cliente calibra o seu na Análise Estratégica das Safras (F7).
- **Volume mínimo.** Com poucos leads por mês, a leitura por etapa fica ruidosa: ficha-de-fatos#volume-minimo (hipótese a validar).
- **Instalar, não ensinar.** "Tem que tomar cuidado para não parecer que a gente vai ensinar" (F7). O curso gravado do Júnior cobre etapas e métricas, não a safra (F7).
- **Vendedor chato, com método.** Persistência com data marcada para cada contato, até o não ou o fim do relógio, nunca pressão. A postura é a #26, que depende de confirmação do Júnior (lacuna-20).
- **IA comercial é mercadoria:** meio, nunca manchete (CTX §9, leitura 8, forte, F10).

---

## Pendências que tocam o método

| O que falta | Onde |
|---|---|
| Safra de clientes (recompra) no método; sem ela, "vender mais vezes" fica sem entrega | #16; outros-10 |
| Tese do closer como macronarrativa, com autoria a confirmar com o Júnior | #87; lacuna-08, outros-08 |
| Números finais da safra de julho (ficha-de-fatos#safra-de-julho) | lacuna-24, outros-12 |
| Postura do "vendedor chato" | #26; lacuna-20 |
| Validação com donos do perfil | lacuna-25 |

---

## Fontes

- CTX §3 ("Sistema de Vendas Safra (#69)"), §6, §8, §9, §11, §13: fontes/acervo-2026-11-08/safra-acervo/02-arquivos-do-projeto/CONTEXTO-DO-PROJETO.md (v5.3).
- Sistema de Vendas Safra online: 03-documentos-online/Sistema de Vendas Safra · o que é e como se diferencia.md. Vale sobre a cópia F12.
- F7: 02-arquivos-do-projeto/FONTE-metodo-safra.md (só as regras).
- F1: 02-arquivos-do-projeto/claude/FONTE-call-brainstorming.md (fala do Júnior sobre estágio, estado e safras).
- Decisões #16, #22, #23, #26, #27, #41, #69, #78, #85, #87 (base/decisoes.md).
