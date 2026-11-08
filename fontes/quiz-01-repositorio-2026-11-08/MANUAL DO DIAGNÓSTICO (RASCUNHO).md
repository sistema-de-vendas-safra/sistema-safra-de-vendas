# Manual do diagnóstico — RASCUNHO

> Rascunho de 24/10/2026, atualizado no mesmo dia com as respostas do Junior. Fonte principal: o `CLAUDE.md` desta pasta.
> **Para que serve:** ensinar a IA a explicar o diagnóstico do quiz do jeito do Junior. Uma regra fixa decide qual etapa está fraca; a IA só escreve a explicação, seguindo este manual.
> **Marcas:** [Junior] = veio do Junior (falas, decisões ou o método já testado no Legado, marcado [Junior · Legado]). [Junior · 24/10] = resposta do Junior em 24/10. [decidido 24/10] = o Junior deixou a decisão com a coordenação. [sugestão] = proposta minha, para aprovar, corrigir ou cortar.

## As metas — semente → fruto [Junior]

| Etapa | O que conta | Meta |
|---|---|---|
| 1. Pré-qualificação | de cada 100 leads, quantos têm perfil de compra | ≥ 50% |
| 2. Agendamento | dos pré-qualificados, quantos marcam reunião | ≥ 50% |
| 3. Comparecimento | dos agendados, quantos aparecem | ≥ 75% |
| 4. Fechamento | das reuniões realizadas, quantas viram venda | ≥ 20% |
| Geral | de cada 100 leads, quantas vendas | ≈ 4% |

Abaixo da meta = etapa fraca. Cada etapa é medida contra a anterior, nunca contra o total de leads.

[Junior · 24/10] As metas valem para qualquer valor de venda, porque o público do quiz é quem vende por reunião.

---

## 1. Como ler as respostas

O quiz pede os números de um mês: leads, pré-qualificados, agendados, reuniões realizadas e vendas, mais o valor médio da venda. [sugestão: sempre "por mês", para ninguém misturar semana com mês]

| Como a pessoa respondeu | Como vira taxa | Confiança |
|---|---|---|
| Número absoluto (ex.: 400 leads, 200 pré-qualificados) | número da etapa ÷ número da etapa anterior (200 ÷ 400 = 50%) | Alta |
| Porcentagem | usada direto | Média-alta |
| Valor chutado (campo do modo chute) | usado como porcentagem | Baixa |
| "Mais de X%" | etapa bateu a meta | Baixa — sabemos que passou, não quanto |
| "Menos de X%" | etapa fraca; na conta do dinheiro entra como 70% da meta | Baixa — aparece no relatório como estimativa |
| "Realmente não faço ideia" | sem taxa; etapa marcada como "não mede" | Sem dado |

Regras:
- [Junior] "Não faço ideia" em uma ou mais etapas = **problema zero: não mede.** Aparece primeiro no diagnóstico, antes de qualquer etapa fraca. Pode haver outros problemas junto.
- [sugestão] O X do "mais de / menos de" é a própria meta da etapa (50, 50, 75, 20). Assim a resposta já diz se passou ou não.
- [decidido 24/10] "Menos de X%" sem número chutado entra na conta como 70% da meta (ex.: agendamento vira 35%) e aparece no relatório como estimativa.
- [Junior · 24/10] As respostas do quiz também decidem se a empresa é pré-qualificada para a Triad. Corte provisório: fatura a partir de R$ 50 mil por mês e tem pelo menos 1 vendedor que faz reunião de vendas. O critério final ainda será definido e depois vira automação no CRM.
- [sugestão] Na porcentagem, o risco é a pessoa dar a taxa sobre o total de leads. Por isso o quiz pergunta: "de cada 100 que chegam nesta etapa, quantos passam para a próxima?".
- [sugestão] As etapas que a pessoa sabe continuam sendo analisadas ("com o que você sabe, ..."). Se faltou uma etapa do meio em números absolutos, compara-se o salto das duas juntas com as metas multiplicadas (ex.: agendados ÷ leads contra 25%).
- [sugestão] Tudo "não faço ideia" → o diagnóstico é só "não mede", sem conta de dinheiro.
- [sugestão] Número que não fecha (etapa maior que a anterior, porcentagem acima de 100%) → o quiz pede para conferir na hora; se a pessoa mantiver, vira confiança baixa.
- [sugestão] A IA sempre diz de onde veio o número: "pelos números que você informou" (alta) ou "pela sua estimativa" (baixa).

---

## 2. Etapa por etapa

> A linha "Entrega do Safra" é só para a equipe saber o que resolve. A IA nunca cita nome de produto nem empurra venda no texto.

### Não mede (problema zero)

- **O que é:** a empresa não sabe quanto passa de uma etapa para a outra. [Junior]
- **Causas:** [Junior · Legado] ferramenta sem rotina não mede nada; lead que chega direto no WhatsApp sem origem fica invisível. [sugestão] cada vendedor anota do seu jeito, ou ninguém anota.
- **O que recomendar:** contar, todo mês, os cinco números (leads, com perfil, agendados, reuniões que aconteceram, vendas) num lugar só, com uma pessoa responsável. Sem isso, qualquer conserto é chute.
- **Entrega do Safra:** recuperação do solo (organizar o CRM) + painel de safra.

### Etapa 1 — Pré-qualificação (meta ≥ 50%)

- **O que mede:** se o marketing está trazendo gente com perfil de compra.
- **Causas:**
  - [Junior] Problema de marketing.
  - [Junior · Legado] Lead ruim é problema de criativo, não do vendedor.
  - [Junior · Legado] Contagem inflada: o Facebook duplica leads; o número certo vem do CRM.
  - [sugestão] Anúncio genérico ou com brinde atrai curioso.
  - [sugestão] Formulário sem pergunta que filtre (faturamento, orçamento, prazo).
  - [sugestão] Não existe por escrito o que é um lead com perfil; cada vendedor decide.
- **Perguntas de causa:**
  1. *De onde vem a maior parte dos seus leads?* Anúncio pago → anúncio ou público errado · Indicação → conferir o critério de perfil · Lista comprada ou evento → fonte fria · Não sei → não mede a origem
  2. *O formulário ou a primeira conversa pergunta algo que filtra quem pode comprar?* Sim, sempre → descarta esta causa · Às vezes / Não → falta filtro na entrada
  3. *Vocês têm por escrito o que é um lead com perfil?* Sim → descarta · Cada vendedor decide / Não → critério indefinido
- **O que recomendar:** escrever em uma frase quem é o cliente com perfil; colocar 2 ou 3 perguntas de filtro na entrada; julgar cada anúncio pelo lead com perfil e pela venda que ele traz, não pelo preço do lead; desligar anúncio que traz lead barato que nunca vira conversa.
- **Entrega do Safra:** o Safra é focado em vendas, e esta etapa é marketing. Ajudam a análise das safras (mostra qual origem traz quem compra) e o painel de safra. [sugestão] A raiz pode pedir a frente de tráfego da Triad.

### Etapa 2 — Agendamento (meta ≥ 50%)

- **O que mede:** dos leads com perfil, quantos aceitam marcar a reunião.
- **Causas:**
  - [Junior] Velocidade do primeiro contato.
  - [Junior] Falta de processo.
  - [Junior] Script ruim.
  - [Junior] Lead demais para o tamanho do time.
  - [Junior] Canal (ligação, atendimento, WhatsApp).
  - [Junior · Legado] Fila maior que a capacidade do time mata mais venda que script ruim; atacar velocidade antes do script.
  - [sugestão] Desistir cedo: poucas tentativas antes de largar o lead.
- **Perguntas de causa:**
  1. *Em quanto tempo o lead recebe o primeiro contato?* Até 10 minutos → descarta · Até 1 hora → atenção · No mesmo dia / No dia seguinte ou depois → velocidade · Não sei → não mede ([Junior · Legado] meta de primeiro contato: 10 minutos no horário comercial)
  2. *Quantas vezes vocês tentam falar com o lead antes de desistir?* 1 ou 2 → falta processo · 3 a 5 → atenção · 6 ou mais, com roteiro definido → descarta · Depende do vendedor → falta processo
  3. *No fim do dia, sobra lead sem contato?* Sim, muitos → lead demais para o time · Alguns → atenção · Não → descarta
  - [sugestão] Se as três respostas estão boas, a causa provável é o script ou o canal.
- **O que recomendar:** responder em minutos, não em horas; todo lead com um dono; um número fixo de tentativas, em mais de um canal (ligação + WhatsApp); se entra mais lead do que o time dá conta, segurar a entrada ou reforçar o time antes de mexer no script.
- **Entrega do Safra:** adubo (régua de contatos e roteiros) + mecanização com IA (WhatsApp e tarefa diária) + recuperação das safras antigas (leads que ficaram sem contato).

### Etapa 3 — Comparecimento (meta ≥ 75%)

- **O que mede:** dos agendados, quantos aparecem na reunião.
- **Causas:**
  - [Junior] Agendou lead desqualificado.
  - [Junior] Falta de follow-up.
  - [Junior] Falta de lembrete na véspera e horas antes.
  - [Junior] Não preparou a pessoa para a reunião.
  - [Junior] Script que não faz a pessoa levar a reunião a sério.
  - [sugestão] Reunião marcada para muitos dias depois.
- **Perguntas de causa:**
  1. *Vocês lembram a pessoa da reunião?* Na véspera e horas antes → descarta · Só uma vez → lembrete fraco · Não → falta lembrete
  2. *Quando a pessoa falta, o que acontece?* Remarcamos no mesmo dia → descarta · Às vezes alguém tenta → follow-up fraco · Fica por isso mesmo → falta follow-up
  3. *Antes de marcar, quem agenda confirma o perfil e explica o que a pessoa vai ganhar na reunião?* Sim, sempre → descarta · Às vezes → preparo fraco · Não → lead desqualificado e pessoa despreparada
- **O que recomendar:** lembrete na véspera e algumas horas antes; quem agenda explica o que a pessoa ganha e pede o compromisso dela; quem falta é remarcado no mesmo dia; só agendar quem tem perfil.
- **Entrega do Safra:** mecanização com IA (lembrete de reunião) + adubo (roteiros de agendamento).

### Etapa 4 — Fechamento (meta ≥ 20% das reuniões realizadas)

- **O que mede:** das reuniões que aconteceram, quantas viram venda.
- **Causas:**
  - [Junior] Produto.
  - [Junior] Script.
  - [Junior] Clareza do produto.
  - [Junior] Narrativa.
  - [Junior] Lead desqualificado agendado.
  - [Junior · Legado] Negócio parado depois da reunião, sem desfecho.
  - [sugestão] Quem decide a compra não estava na reunião.
- **Perguntas de causa:**
  1. *Quando a venda não fecha, qual o motivo mais comum?* Preço → oferta ou narrativa · "Vou pensar" e some → falta de acompanhamento ou narrativa fraca · Não era o perfil → lead desqualificado (raiz antes da reunião) · Não entendeu o que estava comprando → clareza do produto · Não registramos → não mede ([Junior · Legado] motivo de perda é obrigatório)
  2. *As reuniões de venda seguem um roteiro?* Sim, e alguém ouve as gravações → descarta · Sim, sem acompanhamento → script sem ajuste · Cada um faz do seu jeito → script e narrativa
  3. *Depois da reunião, em quanto tempo sai o sim ou o não?* Na hora → descarta · Até 7 dias → atenção · Mais de 7 dias ou fica em aberto → negócio parado
- **O que recomendar:** registrar o motivo de toda venda perdida; um roteiro único de reunião, com 2 reuniões ouvidas por semana; toda reunião termina com resposta ou próximo passo com data; se o motivo mais comum é "não era o perfil", o conserto está antes da reunião.
- **Entrega do Safra:** cultivo (8 reuniões + calls analisadas) + adubo (roteiros) + painel de safra (negócios parados).

### Todas as etapas na meta [Junior · 24/10]

- **O que é:** o funil converte bem. O diagnóstico é dinheiro na mesa por falta de investir mais em marketing. [Junior · 24/10]
- **Quando vale:** [sugestão] só com as quatro etapas respondidas e na meta. Se alguma ficou em "não faço ideia", o diagnóstico é "não mede".
- **Pergunta de causa:** [sugestão] *Se chegassem mais leads amanhã, o time daria conta?* Sim → investir em marketing · No limite / Não → reforçar o time junto, senão a fila cresce e o agendamento cai.
- **O que recomendar:** [sugestão] aumentar o investimento em marketing aos poucos, mantendo o mesmo perfil de lead, e conferir todo mês se as etapas continuam na meta com o volume maior.
- **Entrega do Safra:** [sugestão] a frente de tráfego e lançamento da Triad; do Safra, a recuperação das safras antigas (leads que já foram pagos e ficaram parados).

---

## 3. Combinações entre etapas

| Fracas juntas | Leitura provável | Marca |
|---|---|---|
| Comparecimento + fechamento | Lead desqualificado sendo agendado. Raiz na pré-qualificação ou em quem agenda. | [Junior] |
| Agendamento + comparecimento | Falta rotina de contato e lembrete. As duas são rotina, não talento — as mais baratas de consertar. | [Junior · Legado] |
| Pré-qualificação + agendamento | Lead ruim chegando e o time cansando de tentar. Consertar o marketing primeiro. | [sugestão] |
| Só agendamento (pré-qualificação boa) | Lead bom sendo desperdiçado: velocidade ou fila. | [sugestão] |
| Agendamento muito alto (acima de 80%) + comparecimento fraco | Agenda-se qualquer um, sem filtro nem compromisso. | [sugestão] |
| Só fechamento | O problema está dentro da reunião: produto, script, clareza, narrativa. | [Junior] |
| Todas | O processo comercial ainda não existe. Começar por contar, dar dono a cada lead e criar a rotina. | [sugestão] |
| Nenhuma (todas na meta) | Dinheiro na mesa por falta de investir mais em marketing. | [Junior · 24/10] |

---

## 4. Ordem dos pontos fracos no relatório

[Junior · 24/10] O relatório aponta todos os pontos fracos, não só o principal. A regra abaixo decide apenas a ordem em que eles aparecem.

1. [Junior] "Não mede" vem sempre primeiro.
2. [Junior · 24/10] Depois, do ponto que mais perde dinheiro para o que menos perde (quanto cada etapa traz sozinha, seção 5). [sugestão] Em caso de empate, a etapa mais de cima.
3. [sugestão] Exceção: se a combinação aponta uma raiz acima (ex.: comparecimento + fechamento fracos por lead desqualificado), a raiz aparece primeiro.

**Por quê:** o dono entende e age mais rápido quando vê quanto dinheiro está perdendo. O desempate pela etapa de cima segue o método do Legado de ler o funil de cima para baixo, porque consertar em cima melhora tudo o que vem depois.

---

## 5. Dinheiro na mesa

**O que aparece** [decidido 24/10]:
- O total: quanto entraria se todas as etapas fracas chegassem na meta, calculado em sequência no funil. Os ganhos de cada etapa não são somados, porque uma etapa melhor aumenta o que passa pelas seguintes.
- Junto de cada ponto fraco: quanto aquela etapa traria sozinha.

**A conta:**
- Vendas de hoje = leads do mês × taxa 1 × taxa 2 × taxa 3 × taxa 4.
- Uma etapa sozinha: a mesma conta, trocando só a taxa dela pela meta. Atalho: vendas de hoje × (meta ÷ taxa atual).
- Total: a mesma conta, trocando todas as taxas fracas pelas metas de uma vez.
- Diferença × valor médio da venda = faturamento a mais por mês.

**Exemplo 1 — uma etapa fraca:** 400 leads/mês, valor médio de R$ 15.000.
- Hoje: 400 → 200 com perfil (50%) → 60 agendados (30%) → 45 reuniões (75%) → 9 vendas (20%) = R$ 135.000/mês.
- Com o agendamento em 50%: 200 → 100 agendados → 75 reuniões → 15 vendas = R$ 225.000/mês.
- Na mesa: **6 vendas e R$ 90.000 por mês** (atalho: 9 × 50 ÷ 30 = 15).

**Exemplo 2 — duas etapas fracas:** 400 leads/mês, valor médio de R$ 15.000.
- Hoje: 400 → 200 com perfil (50%) → 60 agendados (30%) → 30 reuniões (50%) → 6 vendas (20%) = R$ 90.000/mês.
- Só o agendamento em 50%: 200 → 100 → 50 → 10 vendas = +4 vendas, R$ 60.000.
- Só o comparecimento em 75%: 200 → 60 → 45 → 9 vendas = +3 vendas, R$ 45.000.
- Total, as duas na meta: 200 → 100 → 75 → 15 vendas = **+9 vendas, R$ 135.000 por mês**. Somar 4 + 3 daria 7 e erraria para menos.
- Ordem no relatório: agendamento primeiro (perde mais), depois comparecimento.

**Todas as etapas na meta:** [sugestão] mostrar quanto entra a cada 100 leads a mais por mês, com as taxas da própria empresa. Ex.: taxas 50/50/75/20 dão 3,75 vendas a cada 100 leads; com valor médio de R$ 15.000, cerca de 3 vendas e R$ 45.000 por mês.

**Regras:**
- [sugestão] Arredondar as vendas para baixo.
- [decidido 24/10] "Menos de X%" sem número chutado entra como 70% da meta e aparece no relatório como "estimativa".
- [sugestão] "Não faço ideia" em alguma etapa ou no total de leads: sem conta de dinheiro.
- [sugestão] Sem valor médio da venda: mostrar só quantas vendas a mais, sem reais.
- [Junior] Aparece só no diagnóstico final, escrito como conta ("se essas etapas chegassem na meta, a conta daria..."), nunca como promessa.

---

## 6. Tom da explicação da IA

- [Junior] Direto, sem rodeio.
- [Junior] Sem culpar pessoas: o processo falha, não o vendedor.
- [Junior] Sem prometer resultado.
- [Junior] Sem citar nome de produto.
- [sugestão] Abrir pelo ponto fraco que mais perde dinheiro, com os números da própria pessoa, e dizer o grau de confiança.
- [sugestão] Para cada ponto fraco, de 1 a 3 recomendações práticas, em umas 100 palavras.
- [sugestão] Falar "quem faz o primeiro contato" e "quem conduz a reunião", não "SDR" e "closer", porque o dono pode não usar esses termos.
- [sugestão] Proibido: "garantido", "vai dobrar", "seu time é fraco", número que a pessoa não deu, termo técnico.
- [sugestão] Não vender: o convite para falar com a equipe da Triad fica no botão da página, fora do texto da IA.

**Chamada no fim do relatório** (no botão, fora do texto da IA):
- [Junior · 24/10] Pré-qualificado: escolhe entre agendar uma conversa e chamar no WhatsApp.
- [Junior · 24/10] Não pré-qualificado: recebe o diagnóstico completo, com o botão "Clique se você tem interesse que alguém da nossa equipe chame você para falar mais sobre esse assunto."

**Exemplo (com os números do exemplo 1 da seção 5):**

> Pelos números que você informou, seu marketing está fazendo a parte dele: metade dos leads tem perfil. O vazamento está logo depois. De cada 10 leads com perfil, só 3 marcam reunião, quando o esperado é pelo menos 5. Isso quase nunca é falta de vontade do time: costuma ser demora no primeiro contato, poucas tentativas ou mais lead do que as pessoas conseguem atender.
> Se essa etapa chegasse em 50%, a conta daria cerca de 6 vendas a mais por mês, uns R$ 90 mil.
> Por onde começar: responder cada lead em minutos, definir quantas tentativas são feitas antes de desistir e conferir se sobra lead sem contato no fim do dia.

---

## 7. Decidido em 24/10

- **M1 —** [Junior · 24/10] Não pré-qualificado recebe o diagnóstico completo com o botão "Clique se você tem interesse que alguém da nossa equipe chame você para falar mais sobre esse assunto."; o pré-qualificado escolhe entre agendar conversa e WhatsApp.
- **M2 —** [Junior · 24/10] As respostas do quiz decidem se o lead é pré-qualificado; critério a definir (provisório: a partir de R$ 50 mil por mês + 1 vendedor que faz reunião), depois vira automação no CRM. Segue em aberto o que conta como "pré-qualificado" na etapa 1 do funil do cliente.
- **M3 —** [Junior · 24/10] As metas 50/50/75/20 valem para qualquer valor de venda (público que vende por reunião); todas na meta = dinheiro na mesa por falta de investir mais em marketing.
- **M4 —** [Junior · 24/10] O relatório aponta todos os pontos fracos, do que mais perde dinheiro para o que menos perde.
- **M5 —** [decidido 24/10] Dinheiro na mesa mostra o total (todas as etapas fracas na meta, em sequência no funil, sem somar ganhos isolados) e quanto cada etapa traz sozinha.
- **M6 —** [decidido 24/10] "Menos de X%" entra como 70% da meta, marcado no relatório como estimativa.
