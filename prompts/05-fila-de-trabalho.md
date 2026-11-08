# Fila de trabalho · etapas 4 a 10

Você vai executar sete etapas em sequência, sem parar entre elas e sem me perguntar nada no meio. Eu volto no fim e respondo tudo de uma vez.

## Como conduzir a fila

- Você é o coordenador. Cada etapa é escrita por um subagente com contexto limpo e conferida por outro subagente que não participou da escrita. Passe a cada subagente só o que a etapa precisa: este arquivo, o CLAUDE.md, nucleo/regras/versionamento.md e os documentos que a etapa usa.
- Ao fim de cada etapa: corrija o que o revisor apontar de forma, atualize o index.md e o log.md, faça um commit com a mensagem "etapa N · nome" e siga para a próxima. Não me mande resumo entre as etapas.
- Se uma etapa não passar no revisor depois de duas correções, registre no log.md como "etapa N incompleta", com o motivo, e siga para a próxima.
- Se a sessão cair, ao recomeçar confira no log.md e no git log quais etapas já têm commit e continue da primeira que não tem.
- Não faça push.

## Regra de pausas (vale para a fila inteira)

- Nenhuma pergunta durante a fila. Quando aparecer uma dúvida que seria minha, siga pelo caminho mais conservador: o status mais restritivo; o conflito registrado com os dois lados e bloqueado para entrega; nada inventado; nenhum lado escolhido por mim; o que depende de algo pendente é feito como rascunho e marcado.
- Toda escolha provisória vai para prompts/05-fila-perguntas.md, numerada por etapa (4.1, 4.2, 5.1...), com: a dúvida, o que você fez, a sua recomendação e o que muda se eu decidir diferente.
- Só pare de verdade para: alterar ou apagar algo em fontes/; contrariar uma instrução escrita deste arquivo ou do CLAUDE.md; qualquer ação que não dê para desfazer pelo Git.
- Onde um prompt anterior pede "me diga em até N linhas", isso vira uma linha no resumo final. Não pare por causa disso.

## Etapa 4 · Decisões de 08/11 e lead score

Execute prompts/04-decisoes-de-08-11-e-lead-score.md inteiro. As perguntas dele também vão para prompts/05-fila-perguntas.md.

## Etapa 5 · Funil-01

Crie funis/funil-01/funil.md. Status pendente-aprovacao, porque depende da #90.

- **Caminho do lead:** landing-page-01, quiz-01, contato do SDR, reunião com o Júnior, venda da IASV ou não; a Implementação Essencial só é oferecida depois do não.
- **Caminho do dado:** landing e quiz, garçom (uma função na Cloudflare que guarda a chave e confere as etiquetas), Supabase, planilha do SDR, e o status do SDR voltando para o Supabase. Só descreva; não implemente nada.
- **Porta de qualificação:** o lead score (base/lead-score.md), com o que o SDR faz em cada faixa.
- **Status do SDR:** uma lista fechada, montada com os estágios e estados do método (base/metodo.md), sem inventar nomes novos. Se faltar um passo, proponha e mande para a lista de perguntas.
- **Metas por etapa:** as do método, citadas pela ficha de fatos.
- **Origens e links:** uma tabela de UTMs com nomes fixos, em minúsculas e sem acento, para stories, bio, reels, e-mail e whatsapp. Os reels não têm link clicável: use uma palavra-chave no comentário que dispara uma mensagem com o link etiquetado como reels. Deixe uma linha reservada para meta-ads, marcada como fora do MVP.
- **Contador de escassez:** a regra do campo barra-de-resgates.

## Etapa 6 · Planta do banco

Crie dados/planta/planta.md, em português, sem código. Status rascunho.

- **Gavetas:** pessoas (contato, consentimento com data e texto aceito, origem da primeira visita); eventos (visita, início do quiz, fim do quiz com as respostas, lead score e faixa, contato do SDR, mudança de status, reunião marcada, reunião realizada, venda, perda); entregas (catálogo com id e versão, espelho do repositório); investimento (desenhada, mas fora do MVP enquanto a Meta estiver fora).
- **Etiquetas obrigatórias em todo evento:** funil, entrega, versão da entrega e os campos de UTM.
- **Contagem das 100 análises gratuitas:** de onde ela sai.
- **Para cada campo:** nome, o que guarda, um exemplo fictício e se é dado pessoal.
- **Quem grava e quem lê:** o garçom grava, o painel lê só números agregados e a planilha do SDR recebe os leads.
- O prazo de guarda dos dados não está decidido: vai para lacunas.

## Etapa 7 · Pauta de aprovação para o Júnior e o Euclides

Crie entregas/pautas/README.md (curto) e entregas/pautas/pauta-aprovacao-01.md. Status rascunho.

- **Itens:** tudo o que está pendente do Júnior e do Euclides ou marcado "levar ao Júnior" em base/lacunas.md, ordenado pelo que trava o funil-01 primeiro.
- **Para cada item:** o que é, em uma ou duas frases para quem não leu o sistema; as opções; a minha posição quando ela estiver registrada (se não estiver: "o Otávio decide antes da reunião"); e o que a decisão destrava.
- Inclua o reembolso de 7 dias da Hotmart e o risco de alguém receber a Análise das Safras e pedir o dinheiro de volta dentro do prazo.
- Linguagem de reunião, sem siglas do sistema.

## Etapa 8 · Briefing da landing-page-01

Crie entregas/landings/landing-page-01/briefing.md. Status rascunho.

- **Básico:** objetivo no funil, público (persona), a ação esperada (começar o quiz) e a meta.
- **Estrutura de partida:** as seções do wireframe (safra-landing.md), corrigidas pelo registro e pelas decisões de 08/11.
- **Três blocos de referências e direcionamentos, em linhas gerais:** copy, UX e design, a partir da Parte 2 do safra-landing.md e da base. Marque o que vinha do design system antigo.
- **Bloqueios:** a lista do que está bloqueado e do que a página faz enquanto isso.

## Etapa 9 · Copy da landing-page-01

Crie entregas/landings/landing-page-01/copy.md, versão 1, rascunho, seção por seção.

- Siga o briefing, base/tom-de-voz.md, GLOSSARY.md e base/provas-e-conformidade.md. Use as skills de copy disponíveis (landing-page-copy e roteiro-de-pagina) e a voz que o tom-de-voz manda usar.
- **Fatos por referência:** {{ficha-de-fatos#campo}}. Campo bloqueado aparece como {{BLOQUEADO: ficha-de-fatos#campo}}.
- Texto que depende de decisão pendente fica marcado no próprio texto.
- O revisor confere contra o tom-de-voz, a lista de palavras a evitar e as regras de conformidade.

## Etapa 10 · Estrutura UX da landing-page-01

Crie entregas/landings/landing-page-01/estrutura.md, rascunho, a partir do copy.md.

- Ordem das seções, hierarquia, o que aparece primeiro no celular, onde ficam os botões, o caminho até o quiz, os estados de carregamento e de erro, e acessibilidade.
- Nada de cor, fonte ou estilo: o design está bloqueado pela pendência do design system.

## Fim da fila

Pare depois da etapa 10. Não comece o design, não crie contas, não crie chaves e não faça push.

Salve em prompts/05-fila-de-trabalho-resposta.md: uma linha por etapa (feita, incompleta ou com ressalva), o que os revisores corrigiram e quantas perguntas ficaram em prompts/05-fila-perguntas.md. No chat, me diga só: "Fila concluída", o número de etapas feitas e o número de perguntas.
