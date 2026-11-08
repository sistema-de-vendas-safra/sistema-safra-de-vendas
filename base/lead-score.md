---
id: lead-score
versao: 1
status: pendente-aprovacao
aprovado_por:
  otavio: 2026-11-08
  junior: pendente
  euclides: pendente
depende_de:
  - id: ficha-de-fatos
    versao: 3
  - id: persona
    versao: 2
  - id: decisoes
    versao: 3
  - id: lacunas
    versao: 3
desatualizado: true
---

# Lead score

A proposta de critério de qualificação do Safra (#98), escrita pelo Otávio em 08/11/2026 (prompts/04-decisoes-de-08-11-e-lead-score.md, seção 3).

**Status.** Pendente de aprovação do Júnior e do Euclides, porque a regra atual do quiz é do Júnior (ficha-de-fatos#criterio-de-qualificacao, versão e). Enquanto estiver pendente, serve só de base para rascunho, avisando que pode mudar (nucleo/regras/versionamento.md), e o campo ficha-de-fatos#criterio-de-qualificacao segue em conflito (lacuna-12, conflito-01).

**Como ler.** Fatos pelo id do campo em `ficha-de-fatos`; decisões por #n; pendências pelo id de `lacunas`. As faixas de faturamento, de valor da venda e de leads abaixo são respostas do quiz, não fatos da oferta. O comprador que o quiz procura está em `persona`.

---

## Para que serve

Ordenar a fila do SDR e proteger a agenda do Júnior. Cada lead que termina o quiz ganha uma nota de 0 a 100 e uma faixa.

## Eliminatórios

Saem da fila do SDR, seja qual for o resto:

- nenhum vendedor fazendo reunião;
- faturamento abaixo de R$ 50 mil por mês;
- valor médio da venda abaixo de R$ 5 mil.

**Motivo:** são os mínimos da versão mais generosa entre as cinco versões de critério que existem hoje (ficha-de-fatos#criterio-de-qualificacao), então nenhum documento anterior é atropelado.

Quem cai aqui recebe o diagnóstico normalmente e vai para a nutrição.

## Pontos (até 100)

| Bloco | Pergunta do quiz | Pontos |
|---|---|---|
| Perfil do negócio (40) | Faturamento | R$ 50 mil a R$ 150 mil: 5 · R$ 150 mil a R$ 500 mil: 15 · R$ 500 mil a R$ 1,5 milhão: 15 · mais de R$ 1,5 milhão: 10 |
| | Valor médio da venda | R$ 5 mil a menos de R$ 10 mil: 5 · R$ 10 mil ou mais: 15 |
| | Vendedores | 1: 3 · 2 ou 3: 10 · 4 a 10: 10 · mais de 10: 7 |
| Volume e dados (20) | Leads por mês (primeiro número do funil) | 100 ou mais: 10 · 50 a 99: 5 · menos de 50: 0 · não lembra: 5 |
| | CRM | "Sim, e o time atualiza todo dia": 10 · "Sim, mas pouca gente atualiza": 7 · "Usamos planilha": 5 · "Não. Fica no WhatsApp e na cabeça de cada um": 0 |
| Quem responde (15) | Cargo | Dono(a) ou sócio(a): 15 · Diretor(a) comercial: 10 · Gestor(a) de vendas: 7 · Marketing: 3 · Outro: 3 · Vendedor(a): 2 |
| Dor e oportunidade (25) | Dinheiro na mesa por mês (o valor que o quiz já calcula) dividido pelo custo mensal da implementação (ficha-de-fatos#preco-avancada dividido por 3) | 1 ou mais: 15 · de 0,5 a menos de 1: 8 · menos de 0,5: 3 · sem números informados: 7 |
| | Sinais de vazamento (até 10) | Tentativas: "1 ou 2" ou "Depende do vendedor": 4 · "3 a 5": 2 · "6 ou mais, com roteiro definido": 0. Sobra lead: "Sim, muitos": 4 · "Alguns": 2 · "Não": 0. Primeiro contato: "No dia seguinte ou depois" ou "Não sei": 2 · "No mesmo dia": 1 · "Em até 1 hora" ou "Em até 10 minutos": 0. Se as perguntas de causa não aparecerem no quiz: 5 |

O custo mensal da implementação não é escrito aqui em reais: sai do campo ficha-de-fatos#preco-avancada, dividido por 3, como manda a regra da casa (fatos só na ficha). Qual campo de preço vale depois das vagas de ficha-de-fatos#vagas (quando passa a valer ficha-de-fatos#preco-avancada-depois) está em prompts/05-fila-perguntas.md, 4.7.

## Faixas

| Faixa | Nota | O que o SDR faz |
|---|---|---|
| A | de 70 a 100 | Liga em até 1 hora útil e marca com o Júnior |
| B | de 50 a 69 | Liga no mesmo dia, confirma por telefone o que o quiz deixou em dúvida (valor da venda, time, histórico) e só então marca |
| C | abaixo de 50 | Nutrição, sem ocupar a agenda do Júnior |

## Fica de fora, de propósito

Ramo, origem dos leads e quem marca as reuniões. Nenhum muda a decisão do SDR.

## Exemplo de conferência

| Resposta | Pontos |
|---|---|
| Faturamento de R$ 500 mil a R$ 1,5 milhão | 15 |
| Venda média de R$ 10 mil | 15 |
| 2 ou 3 vendedores | 10 |
| 200 leads por mês | 10 |
| CRM em dia | 10 |
| Dono | 15 |
| Dinheiro na mesa de 4 vezes o custo mensal | 15 |
| Tentativas "1 ou 2" e sobra "Alguns" | 6 |
| **Total** | **96, faixa A** |

## Revisão programada

Depois das primeiras 50 respostas reais, conferir se as faixas batem com quem agendou e comprou. Está em lacunas (outros-22). Nada vai para aprendizados/ agora, porque ainda não há dado.

## Fontes

- Otávio, 08/11/2026: prompts/04-decisoes-de-08-11-e-lead-score.md (seção 1, item 7, e seção 3).
- Quiz: fontes/acervo-2026-11-08/safra-acervo/05-paginas/quiz-diagnostico-de-vendas/index.html (as respostas citadas entre aspas conferem com as opções do quiz).
- Decisão #98 (base/decisoes.md); ficha-de-fatos#criterio-de-qualificacao, ficha-de-fatos#preco-avancada; lacuna-12, conflito-01, outros-22.
