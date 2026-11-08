# Etapa 4 · Decisões de 08/11 e lead score

Só execute esta etapa se o log.md registrar os três lotes da base (etapa 3) como feitos. Se algum lote faltar, pare e me avise.

Tudo abaixo já foi decidido por mim em 08/11/2026, salvo onde está escrito "pendente". Sua tarefa é registrar no sistema e aplicar a cascata.

## 1. Decisões novas (entram em base/decisoes.md a partir do próximo número livre)

Data de todas: 2026-11-08. Quem decidiu: Otávio.

1. **Análise.** A Análise passa a ser o diagnóstico do quiz. É gratuita para as primeiras 100 análises e custa R$ 497 depois. A reunião com o Júnior continua sendo a conversa de venda, sem preço. Substitui a #62 no valor e revisa a #49 e a #59 na gratuidade (que era até a 10ª venda). Status: decidido. Anote que o Júnior e o Euclides devem ser informados na pauta de aprovação.
2. **Contador de escassez.** Conta as análises gratuitas reais, a partir do banco de dados. Só aparece na página quando mais de 60 das 100 já tiverem sido usadas. Até lá, nada de "81% resgatadas" nem de barra de vagas. Isto vale só para o contador de escassez; o contador "total gerado" das credenciais continua no conflito de credenciais, com o Júnior e o Euclides. Status: decidido.
3. **94% de Deming.** O título da seção 2 da landing fica como está, com o asterisco. Registre em base/tom-de-voz.md uma exceção à regra "nunca dizer 94%" que aponte para esta decisão. Status: decidido.
4. **Acesso no MVP.** Ninguém além de mim acessa o sistema no MVP. Status: decidido.
5. **Projeto do estrategista.** O projeto "Estrategista de Negócio" no Claude vira arquivo histórico a partir de 08/11/2026. Mudança no Safra entra só pelo repositório. Status: decidido.
6. **Site sv-safra.soulstory.com.br.** Fica aberto, sem porteiro, no MVP. Risco aceito. Status: decidido.
7. **Lead score como critério de qualificação.** A proposta da seção 2 deste arquivo. Status: pendente-aprovacao (otavio: 2026-11-08; junior: pendente; euclides: pendente), porque a regra atual do quiz é do Júnior.

## 2. Itens que não são decisão nova, só aplicação do que já foi decidido

Marque como resolvidos em base/lacunas.md, citando a decisão de origem:

- A landing segue o registro: 8 entregas, "Sessões de Comando" no lugar de "Mentoria 1:1", a Análise Estratégica das Safras (entrega 1) na semana 1, nada de GSAAS nem de gerente de safra, nada de "as dez começam juntas".
- Vocabulário público: na comunicação de topo, só as palavras que o comprador já usa (regra de 22/10). Os termos do método e os nomes de etapa do design system ficam para dentro.
- Grafia: "Junior Neves" em público, confirmado em 08/11. O design system v1.0 escreve "Júnior Neves" e está errado nesse ponto; registre a divergência em base/design-system/design-system.md.

## 3. O lead score (crie base/lead-score.md)

Cabeçalho: id lead-score, versao 1, status pendente-aprovacao, aprovado_por (otavio: 2026-11-08; junior: pendente; euclides: pendente), depende_de com ficha-de-fatos e persona nas versões atuais.

**Para que serve.** Ordenar a fila do SDR e proteger a agenda do Júnior. Cada lead que termina o quiz ganha uma nota de 0 a 100 e uma faixa.

**Eliminatórios.** Saem da fila do SDR, seja qual for o resto: nenhum vendedor fazendo reunião; faturamento abaixo de R$ 50 mil por mês; valor médio da venda abaixo de R$ 5 mil. Motivo: são os mínimos da versão mais generosa entre as cinco versões de critério que existem hoje, então nenhum documento anterior é atropelado. Quem cai aqui recebe o diagnóstico normalmente e vai para a nutrição.

**Pontos (até 100):**

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

Não cite o preço em reais no documento: cite o campo da ficha, como manda a regra da casa.

**Faixas.** A, de 70 a 100: o SDR liga em até 1 hora útil e marca com o Júnior. B, de 50 a 69: o SDR liga no mesmo dia, confirma por telefone o que o quiz deixou em dúvida (valor da venda, time, histórico) e só então marca. C, abaixo de 50: nutrição, sem ocupar a agenda do Júnior.

**Fica de fora, de propósito:** ramo, origem dos leads e quem marca as reuniões. Nenhum muda a decisão do SDR.

**Exemplo de conferência.** Faturamento de R$ 500 mil a R$ 1,5 milhão (15), venda média de R$ 10 mil (15), 2 ou 3 vendedores (10), 200 leads por mês (10), CRM em dia (10), dono (15), dinheiro na mesa de 4 vezes o custo mensal (15), tentativas "1 ou 2" e sobra "Alguns" (6). Total 96, faixa A.

**Revisão programada.** Depois das primeiras 50 respostas reais, conferir se as faixas batem com quem agendou e comprou. Registre isso em base/lacunas.md como revisão futura; não crie nada em aprendizados/ agora, porque ainda não há dado.

Em base/lacunas.md, o conflito do critério de qualificação passa a dizer: proposta registrada em base/lead-score.md, pendente do Júnior e do Euclides.

## 4. Ficha de fatos, log e conexões

- Ficha de fatos: atualize os campos da Análise conforme a decisão 1 (valor depois das 100; gratuidade nas primeiras 100) e crie o campo das 100 análises gratuitas. O campo barra-de-resgates, criado no lote 1 com os números de exemplo da landing, passa a guardar a regra da decisão 2 (contagem real, a partir do banco de dados, visível só acima de 60 das 100); os números "Restam 19%" e "81% já resgatadas" deixam de ser valor e ficam só como histórico de exemplo da landing. O que a decisão não define (por exemplo, a duração e quem conduz a reunião com o Júnior) continua em aberto em lacunas. O nome público da Análise continua em conflito.
- log.md: feche as pendências de acesso e de migração, e marque a do site sv-safra.soulstory.com.br como risco aceito, todas citando as decisões novas.
- conexoes.md: em "quem tem acesso", só o Otávio no MVP.
- CLAUDE.md: acrescente uma regra dizendo que o projeto "Estrategista de Negócio" no Claude é arquivo histórico desde 08/11/2026 e que mudança no Safra entra só pelo repositório.

## 5. Cascata

Estas decisões já estão aprovadas por mim. Suba a versão de cada documento alterado e aplique a cascata: quando o documento dependente só precisa refletir estas decisões, atualize-o direto. Se a cascata pedir qualquer outra mudança de sentido, pare e me pergunte.

## 6. Ao fim

Peça a um subagente que não participou do trabalho para conferir: nenhum travessão; cabeçalhos completos; depende_de válidos; nenhum valor de fato copiado fora da ficha; nada pendente do Júnior e do Euclides marcado como aprovado. Corrija o que for de forma. Depois faça um commit com a mensagem "decisoes de 08-11 e lead score" e me diga em até 8 linhas o que mudou. Não faça push.
