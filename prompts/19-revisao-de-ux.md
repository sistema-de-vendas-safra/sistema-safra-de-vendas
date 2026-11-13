# 19 · Revisão geral de UX do site do funil-01 · partes 19.1 a 19.3

Escrito em 13/11/2026, 10h05, pelo mentor, a partir do pedido do Otávio na conversa de hoje.
Rodar só depois dos pedidos 18 e 20. Se prompts/18-como-funciona-landing-02-resposta.md ou prompts/20-gsaas-fora-da-landing-resposta.md não existir, pare e avise: este pedido vem depois dos dois.

Este pedido só olha, mede e escreve. Ele não muda nenhuma página.

## Como trabalhar

- Leia CLAUDE.md antes de começar. Valem a Regra de pausas e todas as regras da casa.
  Dúvidas no fim de prompts/19-revisao-de-ux-resposta.md, no formato de sempre, pelo caminho conservador.
- Uma parte por vez. Em cada parte, um subagente escreve e outro, que não viu a escrita,
  revisa contra este pedido. Commit por parte ("19.N · nome curto").
  Este arquivo já está na main.
- Push: vale a regra 7 como estiver no CLAUDE.md no dia em que rodar. Liste no fim da resposta os commits que subiram.
- Proibido: mudar qualquer página, texto, estilo ou programa da landing, do quiz, da política, do aviso de cookies,
  da montagem, do garçom ou do banco; mudar a base; publicar; rodar SQL no Supabase de verdade; chave de verdade;
  dado pessoal real; mexer em fontes/; abrir o site que está no ar (cada visita lá grava evento no banco de verdade).
  Proibido também inventar número de mercado: nada de "isso aumenta a conversão em X%" sem fonte.
- Só entram arquivos novos: a ferramenta de medição, a pasta da revisão e a resposta. Mais as linhas de registro em log.md, index.md e nucleo/ferramentas/README.md.
- Nunca travessão. Use ponto médio.

## O pedido do Otávio

"Depois desse ajuste, eu gostaria de uma revisão geral de UX no site." (13/11/2026; "esse ajuste" é o pedido 18, e o pedido 20 saiu da mesma conversa.)

Leitura do mentor: "o site" é tudo o que o lead vê no protótipo do funil-01, como está na main depois dos pedidos 18 e 20:
a landing-page-02 (/), o quiz (em /analise/ se o pedido 21 já rodou, em /quiz/ se não; todas as telas, os três tipos de relatório e os estados de erro), a página da política (/politica-de-privacidade/) e o aviso de cookies com o link "Cookies".
"Revisão" é diagnóstico: uma lista de achados com prova, em ordem de importância, e uma proposta de conserto em lotes. O conserto é outro pedido, depois que o Otávio escolher.

## Para quem é a página, e por onde a pessoa chega

- Quem: a pessoa de base/persona.md. Leia antes de julgar qualquer coisa.
- Por onde: link da bio e dos stories do Instagram (funis/funil-01/funil.md, tabela das origens). Ou seja, celular, quase sempre dentro do navegador do próprio Instagram, com uma mão só e pouca paciência.
- Por isso a ordem de importância das larguras é: 375 por 812, 360 por 640 e, por último, 1440 por 900. Achado que só existe no computador vale menos que o mesmo achado no celular.
- O caminho que importa: abrir a landing · entender a oferta · tocar em "Fazer a Análise" · responder o quiz até o fim · deixar o contato · ler o relatório · tocar no botão do fim. Tudo o que atrapalha esse caminho vem primeiro.

## 19.1 · A ferramenta de medição e o percurso

Crie nucleo/ferramentas/revisao-ux/ (Node puro mais o playwright-core que a casa já usa; sem serviço de fora; uma linha no nucleo/ferramentas/README.md).
Ela roda sobre o site montado, servido em 127.0.0.1 do mesmo jeito que o ensaio faz (garçom local, Supabase de mentira): nada vai para serviço real.
Gente de teste só com nome começando por TESTE e e-mail terminado em @teste.invalid.

O percurso, nas três larguras, imitando celular nas duas menores:
- a landing inteira, seção por seção, sem escolha no aviso de cookies, depois com "Recusar" e depois com "Aceitar";
- todos os botões e links da landing: para onde cada um leva, e se leva;
- o quiz do começo ao fim, nos três desfechos (faixa A, faixa C e eliminatório), com a caixa de aceite marcada e desmarcada;
- no quiz, os tropeços de gente de verdade: campo vazio, e-mail errado, telefone errado, número absurdo, nome comprido, voltar pelo botão do navegador, recarregar a página no meio, envio que falha, celular deitado;
- a página da política e a volta dela para onde a pessoa estava;
- tudo de novo só pelo teclado (Tab, Enter, espaço, setas), na landing e no quiz, em 1440.

O que medir em cada página e em cada tela (o número e onde ele foi medido):
1. **Primeira tela.** O que aparece sem rolar em 375 por 812 e em 360 por 640: o título inteiro? O botão principal? Quanto da tela o aviso de cookies ocupa, em porcentagem?
2. **Rolagem para o lado.** Qualquer coisa mais larga que a tela.
3. **Área de toque.** Todo botão, link ou controle com menos de 44 por 44 pixels no celular, e os que ficam a menos de 8 pixels um do outro.
4. **Tamanho da letra.** Texto visível com menos de 12 pixels; texto de leitura com menos de 14; campo de formulário com menos de 16 (abaixo disso o iPhone dá zoom sozinho ao tocar).
5. **Contraste.** Razão entre a cor da letra e a do fundo, pelo estilo calculado: abaixo de 4,5 para texto comum e de 3 para texto grande (WCAG 2.2, nível AA). Onde o fundo é imagem ou degradê, marque "conferir no olho" e ponha o print.
6. **O que parece botão e não é.** Elemento clicável que não é botão nem link: o teclado e o leitor de tela não chegam nele. E o contrário: o que parece clicável e não faz nada.
7. **Teclado e foco.** A ordem do Tab faz sentido? O foco aparece sempre? Algum lugar prende o foco?
8. **Estrutura para leitor de tela.** Idioma da página, título da aba, um título principal só, títulos em ordem, rótulo em todo campo, texto alternativo nas imagens que dizem alguma coisa (a landing tem centenas de imagens com o texto alternativo vazio: separe as decorativas das que carregam informação, como fotos de pessoas, logos e selos).
9. **Movimento.** O que se mexe sozinho (o carrossel dos 90 dias, o que pisca, o contador): dá para pausar? Respeita a preferência "reduzir movimento" do aparelho?
10. **Peso e espera.** Por página, na primeira visita: quantos arquivos, quantos KB, os cinco maiores. Com a rede e o processador freados para imitar um celular mediano no 4G: em quanto tempo aparece o conteúdo principal, quanto a página pula enquanto carrega, em quanto tempo o primeiro toque responde. Diga na resposta que é medida de laboratório, não de gente de verdade.
11. **Estados.** Cada erro do quiz explica o que fazer? Cada toque tem resposta na hora? O que a pessoa vê enquanto o envio acontece, e quando ele falha?
12. **Zoom.** Com o texto a 200%, alguma coisa some, corta ou se sobrepõe?

Saídas: medidas em arquivo (JSON) e prints só da região de cada achado, nunca da página inteira, sem dado de pessoa.

Prova de que a ferramenta pega o erro: numa cópia do site fora do repositório, plante quatro defeitos de propósito (um botão de 20 pixels, um texto cinza sobre cinza, um bloco mais largo que a tela, um campo com letra de 12) e mostre que os quatro aparecem. Depois, na cópia limpa, mostre que eles não aparecem.

## 19.2 · A leitura de especialista

O número não vê tudo. Com os prints e as medidas na mão, um subagente lê cada página e cada tela do quiz como especialista em UX e em UI, e outro, que não viu essa leitura, repete o caminho e contesta.

O que olhar, sempre do ponto de vista de quem chega do Instagram:
- **Clareza em cinco segundos.** Só com a primeira tela, dá para dizer o que é, para quem é e o que fazer agora?
- **Hierarquia.** Em cada seção, o olho sabe por onde começar? Tem um destaque só, ou tudo grita junto?
- **Um caminho só.** Quantos botões diferentes a landing tem, com que textos, e para onde vão? Algum compete com o principal? O botão principal aparece quando a pessoa já se convenceu, ou só no topo e no fim?
- **Tamanho da página.** Quantas telas de rolagem a landing tem no celular? Quais seções repetem a mesma ideia? Onde a pessoa cansa?
- **Componentes que pedem trabalho.** Carrosséis, abas, filtros, seletores e sanfonas: a pessoa percebe que dá para mexer? O que ela perde se não mexer? No celular, o gesto funciona de primeira?
- **Quiz.** A pessoa sabe quanto falta? Dá para voltar e corrigir? Alguma pergunta pede um número que ela não tem de cabeça? O pedido de contato chega na hora certa e explica o porquê? A caixa de aceite é legível?
- **Relatório.** Nos três desfechos: o resultado aparece logo? Dá para entender sem explicação? O próximo passo é óbvio? "Compartilhar", "Baixar PDF" e o botão do fim fazem o que prometem no celular?
- **Consistência.** Cores, fontes, botões, espaçamentos e tom entre a landing, o quiz, a política e o aviso. Elementos iguais com cara diferente; elementos diferentes com cara igual.
- **Confiança.** O que faz a página parecer inacabada ou suspeita para quem nunca ouviu falar da marca: marcador à vista, número sem fonte, foto genérica, texto cortado, link que não leva a lugar nenhum.
- **Contradição entre peças.** A landing prometendo uma coisa e o quiz ou o relatório dizendo outra; um prazo, um nome ou um número diferente de uma página para a outra. Confira contra base/ficha-de-fatos.md e base/promessa.md.

Limites desta parte:
- **Copy é do Otávio.** Aponte risco, ruído e contradição, com o trecho exato. Não reescreva título, promessa nem argumento. Sugestão de texto, só para rótulo de botão, mensagem de erro e instrução de formulário.
- **O que já é conhecido não é achado novo.** Diga só se continua valendo depois dos pedidos 18 e 20, com a referência, numa lista à parte: as duas identidades no quiz (conflito-18); o contador "Total gerado" e os "81%" e "19%" (conflito-05, #93); os "[a definir]" da página da política; o critério de qualificação e o número do WhatsApp "a definir" no quiz; o relatório do eliminatório com exemplo fixo (14.7); o FAQ com colunas desiguais no computador; o que o pedido 18 achou e deixou para esta revisão (perguntas 18.2.5, 18.2.7 e 18.3.4 de prompts/18-como-funciona-landing-02-resposta.md): o filtro por peça que não filtra, o arrastar com o mouse que não avança o carrossel, o contador que destaca o cartão anterior no computador, a régua do celular que corta na semana 6, o cartão 08 cortado à esquerda no fim do carrossel e a barrinha que encosta na borda do cartão no celular (estes entram na lista de achados, com gravidade e conserto, porque ninguém decidiu ainda o que fazer com eles); o que o pedido 20 achou e ninguém decidiu ainda (perguntas 20.2.1 a 20.2.11 e 20.3.3 a 20.3.5 de prompts/20-gsaas-fora-da-landing-resposta.md: entre elas, "[X] dias e [Y] horas" à vista no cartão da oferta, a casa vazia no menu da demonstração no celular e "Reunião de safra" na demonstração; entram na lista de achados, com gravidade e conserto); o GSAAS, que o pedido 20 tirou da landing (confirme que não sobrou menção visível, e veja se a demonstração do produto e o fim do carrossel ficaram inteiros sem ele); o botão do cabeçalho no celular (confirme que o pedido 18 resolveu).
- **Sem enxurrada.** Acabamento miúdo vai agrupado por página, numa linha só cada grupo. Nada de um achado por pixel.

## 19.3 · O relatório e o fechamento

Crie entregas/revisoes/revisao-ux-01/ com cabeçalho da casa no README.md (id revisao-ux-01, versão 1, rascunho, otavio: pendente, depende_de com as versões das páginas revisadas) e:

**achados.md.** Um achado por bloco, numerado (UX-01, UX-02...), escrito para quem não programa:
- onde: página, seção ou tela, e largura;
- o que acontece com a pessoa, em uma frase ("no celular, o botão X fica colado no Y e o dedo acerta o errado");
- a prova: o print ou a medida;
- a regra que ele fere, em português simples (o nome técnico pode ir entre parênteses);
- gravidade: **A** impede ou faz desistir do caminho · **B** atrapalha ou tira confiança · **C** acabamento;
- onde mora o conserto: no index.html da landing, na montagem, no index.html do quiz, num documento, ou no programa empacotado da landing (assets/), que é cirurgia e fica diferente do projeto original na Vercel;
- tamanho do conserto: pequeno, médio ou grande;
- de quem depende: ninguém (é forma), decisão do Otávio, copy do Otávio, ou do Júnior e do Euclides;
- a recomendação, em uma ou duas frases.

Todo achado de gravidade A precisa ser reproduzido pelo revisor independente antes de entrar. O que ele não conseguir reproduzir sai ou desce de gravidade, e a resposta diz quantos caíram.

**README.md.** Em uma tela: como a revisão foi feita, o placar (quantos A, B e C por página), os dez achados que mais importam, a lista do que já era conhecido e o que não deu para avaliar.

**Para o celular do Otávio.** Uma lista curta, de no máximo oito itens, do que só um aparelho de verdade mostra e a ferramenta não alcança: abrir pelo link dentro do Instagram, o teclado do celular cobrindo campo ou botão, o gesto de arrastar os carrosséis, o "Baixar PDF" e o "Compartilhar", o zoom ao tocar num campo. Cada item com o que fazer e o que deveria acontecer.

**Proposta de conserto em lotes**, sem escrever o pedido:
- lote 1 · o que não muda sentido e não mexe em assets/ (pode ir direto);
- lote 2 · o que pede decisão do Otávio, com a pergunta pronta e a recomendação;
- lote 3 · o que pede cirurgia no programa empacotado, com a conta: vale consertar aqui, ou voltar ao projeto original da página?
- lote 4 · o que depende do Júnior e do Euclides.

Fechamento:
- log.md e index.md com a revisão e a ferramenta.
- prompts/19-revisao-de-ux-resposta.md: o que foi feito, com os commits; o placar; os dez achados principais na íntegra, com o caminho do print de cada um; a lista do celular; os lotes; as perguntas para o Otávio; os commits que subiram.
- ESTADO.md: se já existir, reescreva; se não existir, não crie (é do pedido 14).

## Como saber que deu certo

- O percurso fechou nas três larguras, nos três desfechos do quiz, e nada foi a serviço real.
- A ferramenta pegou os quatro defeitos plantados e não acusou nenhum deles na cópia limpa.
- Todo achado tem prova, gravidade, lugar do conserto e dono.
- Nenhum achado A sem reprodução independente.
- `git status` no fim: só arquivos novos na ferramenta, na pasta da revisão e em prompts/, mais log.md, index.md e nucleo/ferramentas/README.md. O teste do quiz e o ensaio continuam passando como antes, sem terem sido mudados.
