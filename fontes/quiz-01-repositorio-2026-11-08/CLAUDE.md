# Quiz de diagnóstico de vendas — captação de leads da Triad

> Status (24/10/2026): especificação. Próximo passo: mockups. Nada construído ainda.
> Referência de formato: fullstackmarketing.com.br (Arthur Dambros) — teste gratuito com resultado liberado só depois do contato. Inspirar no formato, nunca copiar.

## Objetivo

Captar o contato de empresas que já têm equipe de vendas, entregar um diagnóstico de onde o funil delas perde performance e levar as qualificadas a falar com a equipe da Triad.

## Cliente ideal

- Fatura pelo menos 50 mil por mês e tem pelo menos 1 vendedor que faz reunião de vendas.
- Quem não se encaixa recebe o diagnóstico mesmo assim, mas não vai para a lista do time comercial.

## Funil e metas — semente → fruto (método do Junior)

| Etapa | Meta |
|---|---|
| Lead (semente) → pré-qualificado | ≥ 50% dos leads |
| Pré-qualificado → agendado | ≥ 50% |
| Agendado → reunião realizada | ≥ 75% |
| Reunião realizada → fechado (fruto) | ≥ 20% |
| Geral (lead → fruto) | ≈ 4% (a conta dá 3,75%; o Junior trata como 4%) |

## Diagnóstico por etapa (palavras do Junior)

- **Pré-qualificação fraca** → problema de marketing.
- **Agendamento < 50%** → SDR: velocidade, falta de processo, script ruim, lead demais para o time, canal (ligação, atendimento, WhatsApp).
- **Comparecimento < 75%** → agendou lead desqualificado, falta de follow-up, falta de lembrete na véspera e horas antes, não preparou a pessoa, script que não faz levar a reunião a sério.
- **Fechamento < 20% das reuniões** → produto, script, clareza do produto, narrativa, ou lead desqualificado agendado.
- Não saber os números já é um problema (não mede) — e pode haver outros.

## Decisões (24/10/2026)

- **Números:** primeiro perguntar se a pessoa lembra mais ou menos dos números. Lembra → campo para escrever + seletor "%" ou "número absoluto" por etapa. Não lembra → modo chute: "Mais de X%", "Menos de X%", "Realmente não faço ideia" e campo para chutar.
- **Quiz extenso, com bastante pergunta** (Junior, 24/10) — no estilo do teste do Arthur Dambros. Perfil da empresa obrigatório: ramo, ticket médio, tamanho do comercial (tem SDR separado?), origem dos leads, usa CRM, além de faturamento e vendedores.
- **Dinheiro na mesa** (vendas e valor que faltam) aparece só no diagnóstico final, sem poluir.
- **Regra fixa acha a etapa fraca; a IA escreve a explicação.** A IA precisa ser treinada no jeito do Junior diagnosticar (manual do diagnóstico nesta pasta).
- **Contato antes do resultado:** nome, e-mail e WhatsApp. Final com chamada para falar com a equipe da Triad e resolver junto; a pessoa escolhe entre agendar e WhatsApp (formatos a desenhar).
- **Quem faz:** o Junior e o Claude deixam o quiz pronto (24/10). Mockups primeiro.
- **Visual (24/10, corrigido):** estrutura do site do Arthur (REA peça por peça) com uma **variação da identidade da Triad** — base escura, verde neon, fontes do site da Triad (`~/Documents/Claude/triad-www/`). A paleta do Safra (verde-claro, verde-folha, tomate) foi testada na v2 e reprovada por não ter cara de Triad.
- **Não qualificado:** recebe o diagnóstico com chamada diferente — "Clique se você tem interesse que alguém da nossa equipe chame você para falar mais sobre esse assunto."
- **Pré-qualificação:** as respostas do lead determinam se é ou não pré-qualificado; o critério está a definir. Automação no CRM depois.
- **Metas valem para qualquer valor de venda** (mercado de quem vende por reunião). Se todas as etapas batem a meta, o diagnóstico é: dinheiro na mesa por falta de investir mais em marketing.
- **"Pré-qualificado" no funil do cliente** = pelo critério do próprio cliente; a pergunta explica ("leads com perfil para comprar, pelo critério de vocês"). Não confundir com quem é pré-qualificado para a Triad (corte de faturamento e vendedor).
- **O relatório aponta todos os pontos fracos**, não só o principal.
- **Dinheiro na mesa (Junior deixou o Claude decidir):** mostra o total (todas as etapas fracas chegando na meta) e, no relatório, a fatia de cada etapa — as fatias somam o total. Resposta "menos de X%" entra na conta como 70% da meta, marcada como estimativa.
- **Chamada da página:** lead frio — abrir pela dor, ser claro, sem nome de produto. Usar a do Junior: "Descubra onde sua equipe de vendas está perdendo performance" (alternativa dele: "Descubra onde sua equipe de vendas pode melhorar"). O Otávio, que é copywriter, ajusta o texto final.
- **Destino dos contatos:** Triad CRM, numa conta nova só da agência (negócio distinto dos outros), com a origem marcada como já acontece nos outros negócios.

## Decisões (08/11/2026): oferta do plano de ação de 90 dias

- **Depois do contato**, quem se qualifica e tem etapa abaixo da meta não vê mais o relatório na tela. Na conversa, o Junior resume o dinheiro na mesa (como conta, não promessa) e oferece um plano de ação de 90 dias "para resgatar parte desse dinheiro e instalar um sistema de vendas que pode aumentar seu faturamento em até X%". Gratuito agora, em breve R$ 497. Opções: "Sim, eu quero" e "Quero ver como é".
- **X** = 70% do dinheiro na mesa por mês dividido pelo que o funil fatura hoje (vendas de hoje × valor médio), arredondado para baixo. No exemplo do protótipo: R$ 120 mil ÷ R$ 105 mil = 114%; 70% = 80%.
- **"Quero ver como é"** abre a página de exemplo do plano (placeholder), com os botões flutuantes "Voltar" e "Quero o meu". Os dois, e também o "Sim, eu quero", levam de volta à conversa: vídeo de alguém do time do Junior (placeholder) e chamada para mandar "Envie o meu plano de ação." no WhatsApp da Triad (número a definir: constante `WHATS` no mockup).
- **Continua como antes:** quem não se qualifica recebe o relatório com "Tenho interesse"; funil com as 4 etapas na meta recebe o relatório de crescimento. As telas de relatório seguem no protótipo (botão "Telas").
- **Em aberto:** onde o qualificado recebe o diagnóstico completo (a ajuda do contato ainda diz que ele "aparece nesta tela"); se não qualificado e funil saudável também recebem a oferta; o conteúdo da página de exemplo e do vídeo.

## Publicação no Cloudflare (08/11/2026)

- Site: https://sistema-de-vendas-safra-quiz01.sistemadevendassafra.workers.dev (Cloudflare Workers, projeto `sistema-de-vendas-safra-quiz01`, ligado a este repositório, que continua privado).
- O Cloudflare publica sozinho a cada envio ao branch principal (`claude/modest-planck-nlysdi`). O `wrangler.jsonc` manda publicar só a pasta `docs/`; CLAUDE.md, MANUAL e REA ficam fora do site. O `name` dele tem que ser igual ao nome do projeto no Cloudflare.
- `docs/index.html` é cópia de `mockups/quiz-diagnostico.html` com uma linha a mais (`<meta name="robots" content="noindex">`, para o protótipo não aparecer no Google). Depois de mudar o mockup, atualizar a cópia antes de enviar:
  `cp mockups/quiz-diagnostico.html docs/index.html && sed -i '1a <meta name="robots" content="noindex">' docs/index.html`
- GitHub Pages ficou de fora: o repositório é privado e a conta não publica Pages de repositório privado.

## Contexto da reunião de 23/10 (resumo em `00 | GESTÃO/01 | REUNIÕES/`)

- O Otávio já pensava num quiz igual e mostrou um de outro negócio como referência. Ele leva a página de captura do Safra na reunião de 26/10 — combinar para não fazer trabalho duplicado.
- Cliente ideal do Safra na reunião: R$ 150 mil a R$ 1,5 mi/mês, venda acima de R$ 10 mil, pelo menos 1 closer. O Junior decidiu em 24/10: por enquanto vale R$ 50 mil + 1 vendedor ("50 mil já dá"); o corte final será revisto depois.
- Ideia da reunião: o diagnóstico grátis é a porta de entrada; desqualificado poderia receber um produto barato ("plano de implementação do diagnóstico").
