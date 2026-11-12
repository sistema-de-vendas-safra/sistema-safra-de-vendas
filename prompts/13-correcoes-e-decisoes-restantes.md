# 13 · Correções das páginas e decisões restantes de 09/11 · etapas 40 a 46

Escrito em 09/11/2026, 16h15, pelo mentor, a partir da resposta do Otávio a prompts/11-decisoes-restantes.md e de uma decisão nova dele sobre o fim do quiz. **Rodar só depois que o Otávio terminar o APLICAR-11 (parte 7).** O roteiro publica a página v3, e esta fila mexe nela.

Estas respostas são a aprovação do Otávio para as mudanças de sentido que elas pedem: onde a regra de versionamento mandaria transformar em pergunta, aplique e registre como "decisão do Otávio, 09/11/2026".

O prompts/12-apresentacao-funil-01.md **não roda**: a apresentação do funil está sendo feita no Claude Design. Registre no log.md que o 12 foi descartado e por quê, sem apagar o arquivo.

## Como trabalhar

- Leia CLAUDE.md antes de começar. Valem a Regra de pausas e todas as regras da casa. Dúvidas em prompts/13-fila-perguntas.md, no formato de sempre, pelo caminho conservador.
- Uma etapa por vez. Em cada etapa, um subagente escreve e outro, que não viu a escrita, revisa contra este pedido e contra a base. Commit por etapa ("etapa NN · nome curto"). Este arquivo entra no primeiro commit.
- Proibido: publicar, rodar SQL no Supabase de verdade, push, chave de verdade, dado pessoal real no repositório, mexer em fontes/. O que precisar das mãos do Otávio vai para o roteiro da etapa 45.
- Mudança no banco é sempre migração nova, que roda sobre o banco como ele está depois da 001-v3, com dados dentro, sem apagar nada e podendo rodar duas vezes.
- Nunca travessão. Use ponto médio.

## As respostas do Otávio

**Resposta em bloco (09/11/2026, 16h10):** "Aceito todas as recomendações." Vale para as três tabelas de prompts/11-decisoes-restantes.md e para o bloco "Leia antes de seguir o APLICAR-11", com os complementos entre parênteses. Três leituras do mentor, que o Otávio aceitou junto:

1. **30.1 · nome público da Análise:** a recomendação era "o nome é seu". Não há nome: o campo continua em conflito e bloqueia ir ao ar com gente de verdade. Nada a aplicar além do registro.
2. **31.4 · promessa:** valem os ajustes já sugeridos em base/promessa.md: "o dinheiro" no lugar de "todo o dinheiro" e "sem aumentar a verba de marketing" no lugar de "sem precisar mudar uma vírgula no seu marketing". Motivo, além do CONAR: com a pré-qualificação fraca, o próprio quiz diagnostica problema de marketing; a landing do mesmo funil não pode prometer não mexer no marketing. Aplicar no Hero A, na promessa e onde a promessa aparecer. A versão para quem conhece o Júnior e o Euclides recebe os mesmos dois ajustes.
3. **31.8 · passo 3 da seção 08 da landing:** aprovado, trocando "a gente liga" por "a gente entra em contato". Texto final: "Se o seu perfil encaixa, a gente entra em contato para marcar a {{nome}}. {{duração}} com o {{condutor}}, com os seus números na mesa: ele mostra como o sistema ficaria no seu comercial."

Outras que pedem trabalho nesta fila, além do registro:

- **35.4 (com 34.6):** "Sim, eu quero" manda o clique quero-conversa e "Mandar no WhatsApp" manda chamar-whatsapp, os valores da 31.15. "Quero ver como é" não manda clique. Sem valor novo, sem mudar a restrição do banco.
- **31.3 (com 34.1):** a fala 2 da oferta volta com o "em até [X]%" do Júnior, com o cálculo pela ficha (conflito-19, lado 1), na página do quiz.
- **30.3 (com 31.2, 32.2, 34.2, 34.18):** com a caixa desmarcada, a página não pede e-mail nem WhatsApp (os campos somem e o botão libera só com o nome), e somem as frases e os botões de contato. Para o qualificado que desmarcou, siga o caminho conservador e registre como pergunta, com as duas opções: (a) a oferta aparece, porque no WhatsApp quem manda a mensagem é a própria pessoa, e a página não envia nada; (b) só o relatório na tela, sem oferta.
- **18.6 (com 21.2):** aceite guardado como histórico, valendo o mais novo, e a pessoa reconhecida só pelo telefone; o e-mail novo vira histórico. Isso pede a migração 002 (etapa 42).
- **34.14:** a lista entregas/landings/landing-page-01/pecas-por-entrega.md fica aprovada como está, e o filtro passa a filtrar (copy v5). O que o filtro mostra para as duas peças sem entrega (Inteligência de Mercado e Inteligência Artificial) continua pergunta: caminho conservador.
- **31.10, 34.11, 34.9, 35.2, 30.7, 35.9:** aplicar como recomendado. Na 35.9, tire a ressalva de conexoes.md só se o Otávio disse, na parte 7 do APLICAR-11, que aplicou tudo.
- **31.7:** só o hero B vai ao ar com gente de verdade. No protótipo, as duas variantes ficam, porque a reunião com o Júnior e o Euclides ainda vai escolher.
- **33.7, 32.10, 32.6 e o resto da planilha v3 (32.5):** só registrar. Ficam para a versão que for ao ar ou para a fila da planilha v3.

## A decisão nova: não existe mais o caminho do funil saudável

**Decisão do Otávio (09/11/2026):** "Não existe opção de funil saudável. Todos os leads pré-qualificados vão receber a oferta." "Pré-qualificado", aqui, é quem passa pela porta de qualificação da Triad (o corte mais restritivo da 14.2 e da 31.13), não a etapa do funil do cliente.

O fim do quiz passa a ter dois caminhos:

| Quem | O que vê |
|---|---|
| Passou pela porta | A oferta do plano de ação de 90 dias, com qualquer número de etapas abaixo da meta, de 0 a 4 |
| Não passou | O relatório na tela, com "Tenho interesse" e "Agora não" |

- O "relatório de crescimento" como final próprio sai da copy, da página, do briefing, do funil-01, da planta e de onde mais aparecer. Os botões "Quero marcar uma conversa" e "Chamar no WhatsApp" do relatório saem com ele; os valores quero-conversa e chamar-whatsapp passam a vir só dos botões da oferta (35.4).
- O conteúdo do relatório para quem tem as 4 etapas na meta ("seu funil bate a meta nas 4 etapas", "o limite agora é quantas sementes entram") continua: é o relatório do não qualificado com o funil na meta.

**O texto da oferta com as 4 etapas na meta.** Com o funil na meta, o dinheiro na mesa é zero e a fala 2 viraria "em até 0%". Use estas falas, escritas pelo mentor na voz da oferta e marcadas na copy como **proposta, o Otávio confere** (como o texto da caixa na 31.1):

- **Fala 1, com as 4 na meta:** "Olha só, [nome]: [pela sua estimativa / pelos números que você informou], as 4 etapas do seu funil batem a meta. O seu comercial converte o que entra. O que limita o faturamento hoje é quantos leads entram."
- **Fala 2, com as 4 na meta:** "Por isso, quero preparar um plano de ação de 90 dias para a sua empresa: o que fazer para o seu funil receber mais leads sem perder a conversão que ele já tem, com um sistema de vendas instalado para aguentar o crescimento."
- A fala 3, a pergunta, as opções e o resto da conversa ficam iguais.

**Dois casos de borda da fala 2 com etapa abaixo da meta:** se o [X] arredondado der 0, ou se o faturamento de hoje do funil (vendas de hoje × valor médio) for zero, a divisão não serve. Nesses dois casos, a fala 2 perde só a cláusula do percentual: "Por isso, quero preparar um plano de ação de 90 dias para a sua empresa. Não só para resgatar parte desse dinheiro, mas para instalar um sistema de vendas no seu comercial." Marcar também como proposta.

## Etapa 40 · Registrar as decisões

- base/decisoes.md a partir da #116: uma decisão-bloco para a resposta em bloco, citando os números; uma para cada leitura acima (30.1, 31.4, 31.8); uma para a decisão nova do funil saudável; uma para o texto da oferta com o funil na meta e os casos de borda, como proposta do mentor, otavio pendente.
- prompts/13-respostas.md: tabela número · resposta · onde foi aplicada, preenchida ao longo da fila.
- log.md: o 12 descartado.

## Etapa 41 · Cascata nos documentos

Aplicar em todos os documentos que dependem das decisões: quiz (briefing e copy, com os dois finais, as falas novas, a 35.4 e a 30.3), landing (copy, estrutura e as duas variantes: 31.4, 31.8, 31.10, 34.11, 34.14), promessa e oferta (31.4), funil-01, planta, lead-score, roteiros do SDR, pauta (o que citar o funil saudável), CLAUDE.md (30.7), conexoes.md (35.9). Subir versão e registrar em log.md, com a regra de versionamento v3.

## Etapa 42 · Banco: migração 002

- dados/banco/migracoes/002-*.sql para a 18.6 com a 21.2: aceite como histórico (um evento por aceite e por retirada; vale o mais novo) e a pessoa reconhecida só pelo telefone, com o e-mail novo guardado como histórico. Tirar o índice único do e-mail que a #100 criou. Nada apagado; roda duas vezes.
- Se a migração mudar o que registrar_fim_quiz recebe ou devolve, o garçom muda junto, com os testes.
- conferir.sql v3. Testar no PGlite: banco depois da 001-v3 com dados de teste, migração 002 duas vezes, conferir.sql.

## Etapa 43 · Páginas

- Quiz, versão nova: os dois finais, a oferta para todo qualificado, as falas novas e os casos de borda, o percentual de volta (31.3), os cliques da oferta (35.4), o caminho de quem desmarca (30.3), lang e viewport (34.9). O texto do quiz fica como está, salvo o que esta fila muda. Prints novos em 375 e 1440.
- Catálogo: se a versão do quiz mudar, uma linha nova no catálogo, no mesmo padrão da 34.4.
- Landings A e B: 31.4, 31.8, 31.10, 34.11 e o filtro da 34.14.

## Etapa 44 · Ensaio e montagem

Ensaio geral atualizado: nenhum qualificado chega ao relatório; qualificado com 0 e com 4 etapas abaixo da meta chega à oferta com a fala certa; os casos de borda do [X]; os cliques da oferta na planilha; a caixa desmarcada sem campos de contato e sem nada enviado; a migração 002 duas vezes sobre dados; o reconhecimento só pelo telefone. Montagem "Tudo certo" e dry-run, sem publicar. Prove que o ensaio pega erro, como na fila 11.

## Etapa 45 · Roteiro para o Otávio

entregas/prototipo-funil-01/APLICAR-13.md, no padrão do APLICAR-11: push, migração 002, conferir.sql, catálogo se mudou, publicar e um teste curto com pessoas de mentira novas (um qualificado com o funil na meta, um com etapa abaixo, um não qualificado, um que desmarca). Sem pedir chave nenhuma.

## Etapa 46 · Fechamento

Triagem das perguntas da fila (A, B, C, D, como na 36). prompts/13-decisoes-restantes.md no mesmo formato da 11, com o bloco "Leia antes de seguir o APLICAR-13" no topo, para tudo o que contrariar o texto escrito ou mudar o que o roteiro prova. prompts/13-fila-resposta.md com o resumo. Pauta só se houver pergunta do grupo D.
