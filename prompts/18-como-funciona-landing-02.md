# 18 · A seção "Como funciona" da landing-page-02 no calendário do Júnior · partes 18.1 a 18.3

Escrito em 13/11/2026, 09h45, pelo mentor, a partir do pedido do Otávio na conversa de hoje e das decisões da call de 07/11 com o Júnior (#72 a #80), mais #52, #53, #56 e #83.
Rodar sobre a main depois do #117 (bc15909). Não depende dos pedidos 13 e 14.

Estas respostas são a aprovação do Otávio para as mudanças de sentido que elas pedem:
onde a regra de versionamento mandaria transformar em pergunta, aplique e registre
como "decisão do Otávio, 13/11/2026".

## Como trabalhar

- Leia CLAUDE.md antes de começar. Valem a Regra de pausas e todas as regras da casa.
  Dúvidas no fim de prompts/18-como-funciona-landing-02-resposta.md, no formato de sempre, pelo caminho conservador.
- Uma parte por vez. Em cada parte, um subagente escreve e outro, que não viu a escrita,
  revisa contra este pedido e contra a base. Commit por parte ("18.N · nome curto").
  Este arquivo já está na main, subido pelo Otávio.
- Até 16/11/2026 vale a exceção da regra 7: direto na main, um commit por parte, e a lista dos commits no fim da resposta.
- Proibido: publicar; push fora do que a regra 7 permite; rodar SQL no Supabase de verdade; chave de verdade;
  dado pessoal real no repositório; mexer em fontes/; mexer no texto ou no programa do quiz;
  mexer na landing fora do que este pedido lista (a seção "Como funciona", duas respostas do FAQ e o botão do cabeçalho no celular);
  inventar fato. O que precisar das mãos do Otávio vai para a resposta.
- Nunca travessão. Use ponto médio.

## O pedido do Otávio

"Eu preciso fazer um ajuste nessa seção da landing page para que ela esteja de acordo com as últimas decisões de Junior sobre a entrega do produto." (13/11/2026, com dois prints da seção "Como funciona": a régua das fases e os cartões 05 a 08.)

Leitura do mentor, aprovada pelo Otávio na mesma conversa: "as últimas decisões de Junior sobre a entrega" são as da call de 07/11 (#72 a #80), com o número de entregas (#52, #56), o "nunca mentoria" (#53) e o nome dos ritos (#83). Nenhum fato muda: a ficha de fatos e base/produto.md já dizem tudo isso. O que muda é a página, que ainda segue o formato antigo.

## O que a página diz hoje e o que vale

| Na página hoje | O que vale | De onde |
|---|---|---|
| Análise Estratégica das Safras na semana 3 | semana 1 | #72; ficha-de-fatos#quando-entrega-1 |
| Implementação da Infraestrutura na semana 4 | semanas 1 e 2 | #74; ficha-de-fatos#quando-entrega-2 |
| Playbook de Comunicação Persuasiva na semana 5 | até o dia 15 | #73; ficha-de-fatos#quando-entrega-3 |
| Recuperação de Ativos nas semanas 5 a 13 | semanas 3 a 13 | #77; ficha-de-fatos#quando-entrega-4 |
| Painel de Safras na semana 6 | até o dia 15 | #71, #73; ficha-de-fatos#quando-entrega-5 |
| Treinamento para Otimização da Conversão nas semanas 6 a 13, "reunião semanal de safra" | a parte teórica até o dia 15; a call semanal em grupo das semanas 3 a 13 | #73, #78, #88; ficha-de-fatos#quando-entrega-6 |
| Playbook da Gestão de Vendas por Safra na semana 12, "Fase 4 · Entrega" | semanas 1 e 2, no preparo do solo | #75; ficha-de-fatos#quando-entrega-7 |
| Relatório de Produtividade na semana 13 | semana 13, na terceira Sessão de Comando (já certo na semana) | ficha-de-fatos#quando-entrega-8 |
| "Mentoria 1:1 com Junior Neves nas semanas 3, 7 e 13"; losangos em S3, S7 e S13 | três Sessões de Comando: duas no começo (semana 1; semana 1 ou 2) e uma no fim (semana 13). Nunca "mentoria" | #53, #78, #83; ficha-de-fatos#sessoes-de-comando |
| Cartão "09 · Do começo ao fim", "Mentoria 1:1", numerado como entrega; "Arraste para ver as 9 entregas"; "O balanço dos primeiros 45 dias" | 8 entregas; as Sessões de Comando são rito, não entrega; não existe balanço na semana 7 | #52, #56, #83; ficha-de-fatos#numero-de-entregas |
| Régua: Análise S1 a S3, Preparo do solo S4 a S6, Colheita e plantio S5 a S13, Entrega S12 e S13 | as quatro etapas de base/produto.md: Análise (S1), Preparo do solo (S1 e S2), Colheita (S3 a S13) e Plantio (S3 a S13), as duas últimas em paralelo | #72 a #75, #78, #80; produto, "As quatro etapas" |
| Título "Em 90 dias a gente instala..." | o sistema instalado em 15 dias; a mensagem dos 15 dias | #73, #80; ficha-de-fatos#sistema-instalado |
| FAQ "É mais uma mentoria?": "A mentoria é uma das 9 entregas" | 8 entregas; nunca mentoria | #52, #53 |
| FAQ "Quem me atende depois que eu assinar?": mentorias nas semanas 3, 7 e 13 e "um gerente de safra acompanha o seu time toda semana" | Sessões de Comando; calls semanais em grupo com o Júnior e o Euclides; grupo de WhatsApp por cliente; o gerente de safra é formato superado | #12, #68, #76, #78, #79 |

## Os textos aprovados

Aprovados pelo Otávio em 13/11/2026, na conversa com o mentor. Entram exatamente assim, no computador e no celular.

**Título da seção**
"Em 15 dias o sistema está instalado. Nos 90, a gente capacita o seu time a operar com máxima eficácia."
"máxima eficácia" continua em verde, como hoje. O "Como funciona" acima dele fica.

**Régua dos 90 dias**
- "Fase 1 · Análise": semana 1.
- "Fase 2 · Preparo do solo": semanas 1 e 2.
- "Fase 3 · Colheita": semanas 3 a 13.
- "Fase 4 · Plantio · em paralelo": semanas 3 a 13.
- Losangos em S1, S2 e S13 (a ficha diz que a segunda Sessão é na semana 1 ou 2; o losango fica em S2 e o texto não crava a semana). Em negrito, S1, S2 e S13, no lugar de S3, S7 e S13.
- Legenda dos losangos: "Sessões de Comando com o Junior Neves: duas no começo e uma no fim"

**Cartões das entregas** (número · rótulo da semana · linha da fase · descrição · segmentos acesos na barrinha de 13)

| Nº | Rótulo | Fase | Descrição | Barrinha |
|---|---|---|---|---|
| 01 | "Semana 1" | "Fase 1 · Análise" | como está | 1 |
| 02 | "Semanas 1 e 2" | "Fase 2 · Preparo do solo" | como está | 1 a 2 |
| 03 | "Até o dia 15" | "Fase 2 · Preparo do solo" | como está | 1 a 2 |
| 04 | "Semanas 3 a 13" | "Fase 3 · Colheita" | como está | 3 a 13 |
| 05 | "Até o dia 15" | "Fase 2 · Preparo do solo" | como está | 1 a 2 |
| 06 | "Semanas 3 a 13" | "Fase 4 · Plantio" | "A parte teórica sai nos primeiros 15 dias. Da semana 3 em diante, call semanal em grupo, com análise das calls do seu time." | 3 a 13 |
| 07 | "Semanas 1 e 2" | "Fase 2 · Preparo do solo" | como está | 1 a 2 |
| 08 | "Semana 13" | "Fechamento · 3ª Sessão de Comando" | como está | 13 |

Os títulos dos cartões e os chips de "Peças que instala" não mudam.

**Cartão das Sessões de Comando** (o antigo 09)
- Sem número, como o cartão do GSAAS: não é entrega.
- "Do começo ao fim" fica, e a foto e o nome do Junior Neves também.
- Título: "Sessões de Comando entre o Junior Neves, você e o seu Head Comercial"
- As três linhas:
  - "Semana 1 · A Análise Estratégica das Safras"
  - "Semana 1 ou 2 · As mudanças, em aula e tarefa"
  - "Semana 13 · O fechamento, com o Relatório de Produtividade"
- Barrinha: segmentos 1, 2 e 13 acesos.

**Controle do carrossel**
"Arraste para ver as 8 entregas". O contador "NN / 10" fica: continuam 10 cartões.

**FAQ, duas respostas** (as perguntas não mudam)
- "É mais uma mentoria?": "Não. São 8 entregas de implementação, dentro da sua operação: CRM, painel, régua de contato e playbooks. O Junior conduz as Sessões de Comando, e o seu time executa."
- "Quem me atende depois que eu assinar?": "O Junior, nas três Sessões de Comando com você e o seu Head Comercial: duas no começo e uma no fim. Da semana 3 em diante, o Junior e o Euclides conduzem a call semanal em grupo, e o seu time tem um grupo de WhatsApp com a nossa equipe para as dúvidas do dia a dia."

**Botão do cabeçalho no celular**
Aprovada a recomendação da pergunta 17.3.1 (prompts/17-medicao-google-resposta.md): no celular, o "Fazer a Análise" do cabeçalho passa a levar ao quiz, como o botão grande, com as utm e o id_sessao.

## 18.1 · Registrar a decisão

- base/decisoes.md v7 para v8: a decisão nova no próximo número livre (deve ser a #118), com a frase do Otávio acima, a leitura do mentor e a lista dos textos aprovados por referência a este pedido. Diz que aplica #52, #53, #56, #72 a #80 e #83 à landing-page-02 e que nenhum fato muda. Na resposta, avise que o pedido 13 passa a começar no número seguinte (não edite o pedido 13).
- log.md com a entrada, no formato de sempre.
- Cascata pela nucleo/regras/versionamento.md: marque o que depende de decisoes 7, se ainda não estiver marcado.
- A ficha de fatos e base/produto.md não mudam. Se achar que algum texto aprovado contradiz a base, não troque o texto: registre como pergunta.

## 18.2 · A seção, o FAQ e o botão

Onde mora:
- O texto e o desenho da seção estão no programa empacotado, entregas/landings/landing-page-02/pagina/assets/index-BSwcbsoR.js, que veio de uma exportação do Figma. Cada texto aparece em várias cópias: a versão do computador, a do celular e as definições dos cartões, em variante escura e clara. Troque todas as cópias. O nome do arquivo continua o mesmo, como no #117.
- A régua tem blocos de fase e losangos com posição e largura fixas em pixels: recalcule pelas semanas novas, no computador e no celular.
- Cada cartão tem uma barrinha de 13 segmentos: acenda os da tabela.
- O botão do cabeçalho se resolve no programa do fim de entregas/landings/landing-page-02/pagina/index.html, sem mexer em assets/ para isso.

Regras:
- Fica tudo o que funciona hoje: o filtro por peça, o carrossel que arrasta e avança sozinho, as setas, o contador, o progresso na régua acompanhando o carrossel, as cores, as fontes e o cartão do GSAAS.
- Nenhum rótulo de fase cortado (sem reticências) e nada sobreposto, em 1440, 375 e 360. Se a Fase 1, com uma semana só, não couber no bloco, o rótulo pode sair do bloco (ao lado ou acima), nunca ser cortado nem trocado. Registre na resposta o que escolheu.
- O rótulo de semana de cada cartão em uma linha só.
- Os nomes internos invisíveis (data-name, como "Mentoria · S3") podem ficar ou acompanhar a mudança; nenhum texto visível diz "mentoria", salvo "não mais um curso ou mentoria", que já está de acordo com a #53 e fica.
- A visita continua indo ao banco como landing-page-02, versão 1, como na v2. Se achar que a versão devia subir, é pergunta (subir pede linha nova no catálogo, que é SQL do Otávio).
- entregas/landings/landing-page-02/README.md v2 para v3, com "O que mudou na versão 3". Liste ali, uma por linha, cada troca de texto (antes e depois). O projeto original da página, na Vercel, não tem essas mudanças: se um zip novo vier de lá, é essa lista que precisa ir junto. depende_de ganha decisoes 8.

## 18.3 · Prova, prints e fechamento

O que provar:
- O ensaio (nucleo/ferramentas/ensaio/) sobe de versão com conferências novas: nenhum texto antigo visível sobra no programa ("Mentoria 1:1", "semanas 3, 7 e 13", "9 entregas", "45 dias", "gerente de safra", "Fase 4 · Entrega", "Semana 12", "Semanas 6 a 13", "Semanas 5 a 13"); todo texto novo aparece nas versões do computador e do celular; no celular (375 e 360), o "Fazer a Análise" do cabeçalho leva a /quiz/ com as utm e o id_sessao. O ensaio inteiro passa.
- A prova de que o ensaio pega o erro: devolva de propósito uma cópia antiga (por exemplo, o "9 entregas" na versão do celular), rode, mostre a falha, desfaça e confira que o arquivo voltou igual.
- Num navegador sem tela, em 1440, 375 e 360: nenhum rótulo cortado ou sobreposto na régua; os rótulos de semana em uma linha; o cartão das Sessões alinhado aos outros; clicar num filtro, arrastar, usar as setas e esperar o avanço sozinho continuam funcionando.
- Fora da seção, das duas respostas e do botão, nada muda: liste na resposta todas as trocas no programa (antes, depois e quantas cópias), e nenhuma troca fora da lista.

Prints, em entregas/landings/landing-page-02/prints/ (pasta nova), sem dado de pessoa:
- a seção com a régua e o cartão 01, em 1440 e 375;
- o cartão 06 e o cartão das Sessões, em 1440 e 375;
- o FAQ com as duas respostas abertas, em 1440 e 375.

Fechamento:
- index.md com a landing-page-02 v3.
- prompts/18-como-funciona-landing-02-resposta.md: o que foi feito, com os commits; os textos como aparecem na página; a lista dos prints; as perguntas para o Otávio; os commits que subiram (regra 7).
- ESTADO.md: se já existir, reescreva; se não existir, não crie (é do pedido 14).
- Nada publicado. A publicação fica para um pedido curto, depois que o Otávio vir os prints, junto com o #117, que também não foi publicado.
