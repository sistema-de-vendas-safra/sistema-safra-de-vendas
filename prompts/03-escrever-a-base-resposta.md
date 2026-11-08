# Etapa 3 · Escrever a base · resposta

Feito em 08/11/2026 a partir do pedido em prompts/03-escrever-a-base.md e do plano em prompts/02-plano-da-base-resposta.md. Nada foi alterado em fontes/. Nenhum push.

## O que foi feito

Três lotes, cada um escrito por um subagente e conferido por revisores que não participaram da escrita (dois por lote). Cada lote tem um commit próprio.

| Lote | Commit | Documentos |
|---|---|---|
| 1 · a espinha | base lote 1 | ficha-de-fatos (v2 hoje, 67 campos), decisoes (#1 a #91), lacunas (v2 hoje) |
| 2 · o produto | base lote 2 | produto, metodo, mecanismo, oferta, promessa, entregas-do-servico |
| 3 · voz, prova e marca | base lote 3 | persona, tom-de-voz, provas-e-conformidade, design-system/design-system, GLOSSARY.md (raiz) |

Status de cada um no index.md; o motivo de cada versão no log.md.

**Decisões que o Otávio tomou durante a etapa (antes da Regra de pausas):**

- Uma decisão só vira "substituída" quando a substituta for aprovada. A #33 fica pendente-aprovacao, com "substituição proposta em #85". Nenhuma das duas promessas vai para entrega antes da aprovação.
- #91: na Hotmart, serviço online de consultoria tem 7 dias de reembolso. O art. 49 do CDC em venda para empresa fica com o advogado (lacunas#outros-18). A #39 não muda.
- O campo barra-de-resgates fica na ficha, bloqueado.
- A aprovação do plano vale como aprovação de decisoes, persona e glossário.
- Grafia: vale o CTX. O design system será corrigido.
- Mecanismo: fica aprovado, com a crença "com ressalva" e os nomes de 01/11 marcados.
- A fala do Júnior ("3 semanas" ou "uma semana") foi para lacunas#outros-19.
- Cinco fatos entraram na ficha (v2): relogio-da-operacao, tentativas-ate-abandonado, duracao-call-de-venda, multiplo-regra-de-venda, gsaas-preco-travado.

**O que os revisores encontraram e foi corrigido:**

- status fora do vocabulário;
- campos em conflito com status que pareciam resolvidos;
- números de fatos copiados fora da ficha (entregas, sessões, prazos, safra de julho, datas);
- citações alteradas dentro das aspas;
- fontes erradas ou a mais (duracao, F1, F11);
- uma definição do glossário sem apoio na fonte ("Virada do mês", reescrita);
- nomes antigos tratados como verbete próprio;
- remissões que faltavam à #91 e à ficha.

## Perguntas para o Otávio

Desde a Regra de pausas, cada dúvida seguiu o caminho mais conservador. Recomendação primeiro, depois o que muda se você decidir diferente.

1. **Atualizar decisoes para a ficha v2.**
   - *O que fiz:* pela cascata, decisoes ficou com `desatualizado: true`, porque depende da ficha v1.
   - *Recomendação:* aprovar. A mudança é só de forma: depende_de passa para a ficha v2 e decisoes vai para v2, sem mudar conteúdo.
   - *Se não aprovar:* decisoes continua sem poder servir de base para entrega nova.

2. **Fatos fora da ficha no lote 3.**
   - *O que fiz:* não escrevi os valores e marquei "fato fora da ficha". São eles:
     - os números de Deming, HBR 2011 e 2015 e Ramper;
     - a data e o percentual do repasse de tributos da Meta, o no-show e os valores investidos (persona);
     - a parte de cada fase de cor;
     - os tempos da rúcula, do morango e da melancia;
     - o custo por lead da história da pós-graduação;
     - a quantidade e os anos das reclamações (F9);
     - as credenciais de #44 (Nigro, Perini, Paulo Vieira).
   - *Recomendação:* a ficha sobe para v3 com os que vão para peça: as credenciais de #44 como [PROVA REAL], os tempos da analogia e o percentual de Deming com a nota "Adaptado de". O resto fica fora.
   - *Se decidir diferente:* sem a v3, as peças não podem usar esses números. Com todos dentro, a ficha cresce com números que nenhuma entrega usa.

3. **Regra de vocabulário para colheita, plantio e relógio.**
   - *O que fiz:* registrei os dois lados no tom-de-voz e apliquei o caminho conservador.
   - *Recomendação:* decidir com o Júnior, porque #26 e #29 dependem dele.
   - *Se liberar:* o tom-de-voz e o glossário sobem de versão e as palavras deixam de ter restrição.

4. **Adoção do design system v1.0.** O conflito é com #45, #81, os botões laranja e a tipografia.
   - *O que fiz:* tudo ficou em conflito, bloqueado, e o design-system em rascunho.
   - *Recomendação:* decidir com o Júnior antes da etapa de design da landing. Já está nas pendências do log.md.
   - *Se adotar o v1.0:* a #81 e o laranja viram "substituídos" e a ficha do design system sobe para decidido.

5. **Etapas e jargão em inglês** (lacunas#conflito-12). O DS diz "lead qualificado, reunião marcada"; o método diz "pré-qualificação, agendamento, comparecimento, fechamento"; e há "closer" e "SDR" na landing.
   - *O que fiz:* ficou em conflito.
   - *Recomendação:* em público, o vocabulário do método (Ficha online), e o DS se ajusta na próxima versão.
   - *Se valer o DS:* o glossário e o quiz mudam os nomes das etapas.

6. **Cultivo como nome antigo de Plantio.**
   - *O que fiz:* no glossário, liguei o Cultivo ao Plantio como _Avoid_, com nota de que a correspondência não está confirmada (CTX §13).
   - *Recomendação:* confirmar com o Júnior.
   - *Se não corresponder:* o _Avoid_ sai do verbete Plantio.

7. **Contagem do relógio.**
   - *O que fiz:* a ficha (relogio-da-operacao) pede "confirmar com o Júnior", porque F1 conta "depois do fim do mês". O glossário e o metodo dizem que vale a #41, do dia em que o lead entra.
   - *Recomendação:* vale a #41. Tirar o "confirmar" da ficha na v3.
   - *Se pedir confirmação ao Júnior:* fica como está.

8. **Liberação das 18 tentativas** (tentativas-ate-abandonado).
   - *O que fiz:* registrei a pendência que a própria fonte traz (Criativos rodada 1 online): confirmar com o Júnior e liberar as histórias da operação.
   - *Recomendação:* levar ao Júnior junto com as credenciais.
   - *Se liberar:* o campo perde a ressalva.

9. **F11 citada junto do online** nos verbetes Safra, Perdido e Relógio do glossário.
   - *O que fiz:* deixei, porque essas linhas também citam a Ficha online.
   - *Recomendação:* tirar a F11 na próxima versão do glossário (regra 1 da casa).
   - *Se preferir manter:* nada muda.
