---
id: landing-page-01-estrutura
versao: 3
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: landing-page-01-copy
    versao: 3
  - id: landing-page-01-briefing
    versao: 3
  - id: funil-01
    versao: 2
  - id: planta-do-banco
    versao: 2
  - id: provas-e-conformidade
    versao: 3
  - id: ficha-de-fatos
    versao: 3
  - id: lacunas
    versao: 4
  - id: decisoes
    versao: 3
  - id: regra-seguranca
    versao: 1
  - id: design-system
    versao: 3
  - id: persona
    versao: 3
  - id: tom-de-voz
    versao: 3
desatualizado: true
---

# Estrutura UX · landing-page-01

A estrutura da landing-page-01: a ordem das seções, a hierarquia de cada uma, a primeira tela do celular, os botões, o caminho até o quiz-01, os estados de carregamento e de erro e a acessibilidade. O texto é o de `landing-page-01-copy`; aqui ninguém escreve copy nova, só diz onde cada pedaço fica e o que ele faz.

**Status.** Rascunho. Segue o status da copy e do briefing: a página existe por causa da #90, pendente do Júnior e do Euclides (conflito-06: a #66, das três portas, continua decidida até lá), e não vai ao ar antes do quiz-01 publicável (conflito-09) e da revisão de advogado (`provas-e-conformidade`).

**Design bloqueado.** Nada aqui define cor, fonte, tamanho de letra, espaçamento, estilo nem componente visual do design system: tudo isso espera o conflito-08. Este documento fala só de ordem, hierarquia e comportamento.

**Documentos desatualizados.** Esta estrutura se apoia em documentos que seguem marcados desatualizados por cadeia da pergunta 4.5 (landing-page-01-copy, landing-page-01-briefing, funil-01, planta-do-banco, provas-e-conformidade, design-system e tom-de-voz; regra provisória 11.1) e precisa ser revista depois da 4.5.

**Como ler.**
- Os nomes das seções e os rótulos (Título, Sobretítulo, Botão...) são os da copy.
- Fatos só pelo campo da ficha (`ficha-de-fatos#campo`); `:parte` como em `landing-page-01-copy`, "Como ler" (9.13).
- **Oculta:** existe no rascunho e não vai ao ar; não ocupa lugar na página nem na ordem de leitura.
- **Primeira tela:** o que aparece no celular ao abrir a página, sem rolar.
- Escolhas provisórias desta etapa: perguntas 10.1 a 10.16 (prompts/05-fila-perguntas.md).

---

## 1. Ordem das seções

A ordem das seções é a da copy (10.1). Dentro das seções, três mudanças: na 09, a frase "Ficou alguma dúvida?" e o bloco de chamada vão para depois das perguntas (10.2); na 02, a nota de rodapé de Deming vai para o fim da seção, e não logo abaixo do título (10.16); no hero, no celular, o subtítulo pode ir para baixo do botão quando o botão não couber na primeira tela (10.16). As ocultas ficam marcadas no lugar onde voltariam, para não precisar refazer a ordem quando forem liberadas.

| # | Seção | Vai ao ar? | Por quê, se oculta |
|---|---|---|---|
| 1 | Cabeçalho fixo | Sim | |
| 2 | 01 · Hero (versão B, hero único provisório) | Sim | A versão A fica oculta: título e subtítulo bloqueados pela #85 (8.3; 9.1) |
| 2a | Contador "Total gerado" (dentro do hero) | Oculta | ficha-de-fatos#total-dos-dois em conflito e sem comprovante (conflito-04, conflito-05) |
| 3 | Faixa de bastidores | Oculta | Nomes de terceiros sem autorização nem comprovante (conflito-05; Código Civil, art. 18) |
| 4 | 02 · Sistema de Vendas | Sim | |
| 5 | 03 · Big Idea | Sim | |
| 6 | 03b · O que é o Sistema de Vendas Safra | Sim | |
| 7 | 04 · Credenciais | Oculta, inteira | Nenhum comprovante nem autorização (conflito-05; 8.7, 9.11) |
| 8 | 05 · Como funciona | Sim | |
| 9 | 06 · Painel de Safras | Sim | |
| 10 | 07 · Para quem é | Sim | |
| 11 | 08 · O destino dos botões | Sim | Dentro dela ficam ocultos o item 3 do cartão (PDV-90: conflito-10, lacuna-22), o preço riscado com o rodapé "passa a custar" (8.9) e a barra de resgates (ver "Contador de escassez") |
| 12 | 09 · Perguntas frequentes | Sim | Fica oculta só a pergunta "Posso parcelar?" (ficha-de-fatos#parcelamento; conflito-15) |
| 13 | Rodapé | Sim | |

O contador de escassez do bloco de chamada é oculto por regra, não por seção: só aparece nas condições de "Contador de escassez", abaixo.

**Vídeo.** Não há lugar de vídeo (8.6). Se a 8.6 decidir que há, ver "Vídeo, se a 8.6 decidir que há".

---

## 2. Hierarquia de cada seção

Três papéis: **título** (o que a pessoa lê primeiro e o que o leitor de tela anuncia como título), **apoio** (o que explica o título) e **ação** (o que se toca). A hierarquia de títulos, no código, está em "Acessibilidade".

Regra que vale para toda seção: o **sobretítulo** é lido antes do título e não é um título de nível próprio; ele introduz o título. Notas, rótulos de selo e rodapés de exemplo são apoio e ficam sempre junto do que explicam, nunca soltos.

| Seção | Título | Apoio, na ordem | Ação |
|---|---|---|---|
| Cabeçalho fixo | Nenhum | Logo, como placeholder marcado (ficha-de-fatos#nome-agencia) | Botão secundário "Responder as perguntas" (ver "Botões") |
| 01 · Hero | Título, as duas linhas, como um título só; o destaque de "nunca disseram não" é de ênfase, não de hierarquia | Antes do título: o qualificador (placeholder marcado {{BLOQUEADO: ficha-de-fatos#criterio-de-qualificacao}}). Depois: o subtítulo (placeholder marcado), que no celular pode ir para baixo do botão (10.16) | Bloco de chamada |
| 02 · Sistema de Vendas | Título de Deming, com o asterisco | Sobretítulo antes. Depois: quadro do "não é" (a primeira linha introduz, as seis negações em lista); texto em duas colunas (no celular, uma coluna, na ordem da copy); imagem 1 e imagem 2, cada uma com rótulo e legenda; diagrama, com título próprio; comparação em barras, com título próprio, selo "Exemplo" e rodapé; cartões, com título próprio; nota de rodapé de Deming, no fim da seção, logo antes do bloco de chamada, ligada ao asterisco do título (10.16) | Bloco de chamada |
| 03 · Big Idea | "Você já pagou pelas suas próximas vendas." | Sobretítulo antes; subtítulo; texto; quadro da horta (rótulo, título próprio, chave, os dois lados com o placar); a metáfora, com a foto e o selo; frase de impacto | Bloco de chamada; depois dele, a ponte para a 03b, como última linha da seção |
| 03b · O que é | "Sete peças ligadas. Um só Sistema de Vendas." | Sobretítulo antes; texto; anel com o centro; cartão do método; uma linha por peça, em lista; a última linha, que aponta para a 05 | Bloco de chamada |
| 05 · Como funciona | O título da seção | Sobretítulo antes; frase de impacto; mensagem da instalação; filtro de peças; linha do tempo com os três marcos, as três fases e o aviso; as entregas, agrupadas pelos quatro rótulos de fase (cada rótulo é um subtítulo, cada entrega um item); anel de volta; "Do começo ao fim", com três itens | Filtro (toque, não leva a lugar nenhum); bloco de chamada |
| 06 · Painel de Safras | "Cada lead no seu tempo. Cada etapa na sua tela." | Sobretítulo e rótulo antes; subtítulo; quando; duas abas, cada uma com a frase de abertura e cinco itens; janela do painel, com o selo "Dados de exemplo" sempre junto | Troca de aba (toque, não leva a lugar nenhum); bloco de chamada |
| 07 · Para quem é | "Antes de responder, veja se o sistema é para o seu momento." | Sobretítulo antes; lista "É para você se"; lista "Não é para você se"; fecho | Bloco de chamada |
| 08 · O destino dos botões | O título da seção | Sobretítulo (placeholder marcado) e selo antes; três passos, numerados, com a foto do passo 3 (placeholder marcado [PROVA REAL]) junto do passo; cartão do que você leva (rótulo, título do cartão, selo "Exemplo", itens 1 e 2, fecho); cartão da oferta, com a linha "Sem custo na promoção de lançamento." logo abaixo do botão | Botão do cartão da oferta, o único que leva ao quiz-01, com a linha abaixo dele |
| 09 · Perguntas frequentes | "O que todo dono pergunta antes de assinar." | Sobretítulo antes; números de destaque; as perguntas, cada uma um subtítulo com a resposta embaixo; depois delas, a frase "Ficou alguma dúvida?" (10.2) | Abrir e fechar cada pergunta; bloco de chamada, no fim |
| Rodapé | Nenhum | Quem assina, como placeholder marcado | Nenhuma |

**Bloco de chamada.** Sempre a mesma ordem: o botão, a linha "Sem custo na promoção de lançamento." logo abaixo e, só quando liberado, o contador de escassez abaixo da linha. O botão é a ação; a linha e o contador são apoio do botão. **O bloco de chamada do hero nunca tem o contador**, nem quando ele estiver liberado: o contador só pode aparecer nos blocos de chamada abaixo da primeira tela (02, 03, 03b, 05, 06, 07, 09) e no cartão da oferta da 08 (10.11).

---

## 3. A primeira tela no celular

O que aparece ao abrir a página no celular, sem rolar, de cima para baixo:

1. O cabeçalho fixo, com o logo (placeholder marcado). O botão do cabeçalho **não aparece** nesta tela (10.3).
2. O qualificador do hero (placeholder marcado {{BLOQUEADO: ficha-de-fatos#criterio-de-qualificacao}}; enquanto bloqueado, não vai ao ar).
3. O título do hero, as duas linhas.
4. O subtítulo do hero (placeholder marcado; enquanto bloqueado, não vai ao ar).
5. O botão do bloco de chamada e a linha abaixo dele, sem o contador de escassez (10.11).

Regras da primeira tela:
- **Uma ação só.** O único botão visível é o do hero (briefing, 01 · Hero, "Fica": um único botão primário na dobra).
- **O botão cabe na primeira tela.** Se o título, o qualificador e o subtítulo não deixarem o botão aparecer sem rolar, quem cede é o apoio (o subtítulo vai para baixo do botão, e vai também no código, para a ordem lida ser a vista; 10.16), nunca o botão.
- **Sem imagem do hero no celular** (sugestão do wireframe, aceita como provisória em 10.4), para a primeira tela ser só texto e botão, e carregar antes.
- **Nada oculto ocupa lugar:** o contador "Total gerado" e a faixa de bastidores não deixam espaço vazio.
- **Nada se mexe sozinho** na primeira tela: nenhum contador (nem o de escassez, que nunca entra no hero), nenhuma tela girando, nenhum movimento de entrada.

No computador vale a mesma ordem; a imagem do hero pode voltar quando o design for decidido (conflito-08).

---

## 4. Botões

Todos os botões têm um destino só, como no briefing (8.5): a seção 08. Só o botão da seção 08 leva ao quiz-01.

| Onde | Texto (da copy) | O que faz |
|---|---|---|
| Cabeçalho fixo | "Responder as perguntas" {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}} | Leva à seção 08. Aparece só depois que o botão do hero sai da tela e fica ao alcance em toda a rolagem (10.3) |
| Fim do hero (01) | Bloco de chamada | Leva à seção 08 |
| Fim das seções 02, 03, 03b, 05, 06, 07 e 09 | Bloco de chamada | Leva à seção 08 |
| Cartão da oferta (08) | "Quero responder as perguntas do meu funil" {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}} | Abre o quiz-01, na mesma aba, levando as etiquetas e o código de sessão (ver "Caminho até o quiz") |

Regras dos botões:
- Botão que leva à seção 08 é um link para um ponto da própria página: rola até o começo da seção 08 e põe o foco no título dela (ver "Acessibilidade").
- Com movimento reduzido ligado no aparelho, o salto até a 08 é imediato, sem rolagem animada.
- O botão do cabeçalho nunca cobre texto nem outro botão; ele fica num lugar fixo da tela, e o resto da página rola por baixo sem nada ficar escondido atrás dele quando um link leva a um ponto da página.
- Os controles que só mudam o que se vê (a chave do quadro da horta, o filtro da 05, as abas da 06, as perguntas da 09) não são botões de chamada: não levam a lugar nenhum e não contam como ação da página.
- Nenhum botão abre formulário, janela por cima da página ou pedido de contato (8.14).

---

## 5. Caminho até o quiz

**Cliques.** De qualquer bloco de chamada: dois toques (o botão leva à 08; o botão da 08 abre o quiz-01). Da própria 08: um toque. A 8.5 pediu para conferir se o caminho fica longo no celular: o salto até a 08 não obriga a rolar a página inteira, e a 08 é a seção que diz o que o quiz entrega e que nem todos recebem a conversa (8.10). Fica assim no rascunho (10.1).

**O que a página faz, passo a passo** (`funil-01`, "Caminho do dado", passo 1; `planta-do-banco`, "Gaveta eventos"):

1. **Ao abrir.** A página lê as duas etiquetas do link, utm_source e utm_campaign (`funil-01`, "Origens e links"), e cria um código de sessão. O código fica só na memória da aba: nada é guardado no navegador (nenhum cookie, nenhum armazenamento local) e ele some quando a aba fecha (6.2). Recarregar a página cria um código novo.
2. **Registra a visita.** A página manda ao garçom o evento visita, com as cinco etiquetas obrigatórias (funil, entrega, versão da entrega, utm_source, utm_campaign) e o código de sessão. [PENDENTE: 10.15] O id e a versão da entrega que vão no evento não estão definidos: nenhum documento tem o id landing-page-01, e a planta exige que o par entrega e versão exista no catálogo (`planta-do-banco`, 6.6); sem isso, a visita não entra. Não manda nenhum dado pessoal, porque não tem nenhum. Não tem chave: quem tem a chave é o garçom (`regra-seguranca`, regras 2 e 3).
3. **Botão da 08.** Abre o quiz-01 na mesma aba, com utm_source, utm_campaign e o código de sessão no próprio endereço do quiz (10.5). É assim que a etiqueta de origem chega ao quiz sem nada ficar guardado no navegador.
4. **Início do quiz.** Quem registra o evento inicio_quiz é o quiz-01, quando abre, com o mesmo código de sessão; a landing não registra esse evento no clique (10.6). A ligação entre a visita, a versão da landing e o início do quiz é feita pelo código de sessão; no fim do quiz, o banco liga tudo à pessoa (6.2).

**Sem coletar dado na landing.** A página não tem formulário nem campo, não pede contato, não usa ferramenta de terceiros que colha dado do visitante (10.7) e não guarda nada no navegador. Quem pede o contato, com consentimento, é o quiz-01 (`funil-01`; `provas-e-conformidade`, "LGPD"; 8.14).

**Se a etiqueta faltar ou vier fora da lista.**
- A página funciona igual: o conteúdo, os botões e o caminho até o quiz não dependem da etiqueta.
- A página não inventa origem nem põe uma origem padrão. Manda o evento com utm_source e utm_campaign vazios, e passa ao quiz o que veio (ou nada). Quem confere a lista é o garçom (`funil-01`, passo 2), e a etiqueta fora da lista entra como origem em branco (5.5; `planta-do-banco`, utm_source).
- A planta diz também que evento sem alguma das cinco etiquetas não entra. A leitura deste rascunho é que a etiqueta vai presente e vazia, e o evento entra com a origem em branco (10.8).
- Se a etiqueta vier com uma das origens da lista em maiúsculas ou com acento, a página não corrige: passa como veio, e o garçom decide (10.8).

**Sem JavaScript.** O botão da 08 é um link de verdade para o endereço do quiz-01: sem o programa da página, ele ainda abre o quiz, só que sem as etiquetas e sem o código de sessão (a visita não é registrada e a origem fica em branco). Os botões que levam à 08 funcionam sem o programa, porque são links para a própria página (10.9).

**Endereços.** O endereço da landing e o do quiz-01 não estão decididos (`funil-01`, "Origens e links"); no rascunho são placeholders marcados.

---

## 6. Estados de carregamento e de erro

Regra geral: **o texto chega primeiro e funciona sozinho.** Nenhuma informação da página existe só numa imagem, num movimento ou num número que vem do banco.

| O quê | Enquanto carrega | Se falhar |
|---|---|---|
| Página | O texto e os botões aparecem antes das imagens. O lugar de cada imagem fica reservado na proporção dela, para o texto não pular quando a imagem chegar | Se o programa da página não carregar, a página continua legível e os botões continuam levando à 08 e ao quiz (ver "Sem JavaScript"). Os controles abrem no estado que mostra tudo (ver "Acessibilidade") |
| Imagens (imagem 1 e 2 da 02, diagrama, barras, horta, foto da metáfora, janela do painel, cartão do relatório, foto do passo 3) | As imagens abaixo da primeira tela só carregam perto de entrar na tela | Fica o texto alternativo, e o rótulo, a legenda e o selo continuam à vista, porque são texto da página e não da imagem. O diagrama, as barras, a horta, o painel e o cartão do relatório existem também como texto (ver "Textos alternativos"), então nada se perde |
| Vídeo | Não há vídeo (8.6) | Não se aplica |
| Registro da visita no garçom | A página não espera o garçom para nada: mostra tudo e libera os botões antes da resposta | Se o garçom estiver fora do ar ou demorar: a visita se perde, sem aviso ao visitante, sem nova tentativa guardada no navegador e sem nenhuma mudança na página. A perda aparece só na contagem de visitas (10.10) |
| Ida ao quiz | O toque no botão da 08 abre o endereço do quiz; a página não faz nada antes de abrir (não espera o garçom, não grava nada) | Se o quiz não abrir, quem mostra o erro é o quiz-01 (o estado dele é do quiz). A landing não tem como saber, por isso não vai ao ar sem o quiz-01 publicado e conferido (conflito-09). Voltar do quiz traz a landing de novo, com um código de sessão novo se a aba tiver recarregado |
| Contador de escassez | Não aparece enquanto a contagem não chega | Não aparece (ver abaixo) |

### Contador de escassez

Oculto por regra. Só aparece quando **todas** estas condições valem ao mesmo tempo:

1. A contagem real das análises gratuitas usadas passou do limite de ficha-de-fatos#barra-de-resgates (a parte :limite; #93).
2. A regra do que conta como análise usada está decidida (5.7). Até lá, o contador não vai ao ar (`planta-do-banco`, "Contagem das análises gratuitas"; 6.7).
3. A contagem chegou, do banco, pela leitura própria do contador (`planta-do-banco`: a chave que lê só esse número, nunca a do garçom e nunca direto do navegador ao banco), antes de o bloco ser mostrado.
4. O bloco é um dos de baixo: nunca o do hero nem nada da primeira tela (10.11).

**Na dúvida, não mostrar.** Se a contagem falhar, demorar, vier vazia, vier com valor que não faz sentido (negativo, ou maior que ficha-de-fatos#analises-gratuitas) ou se qualquer condição não estiver clara, o contador não aparece naquela visita. Ele não deixa lugar vazio, não mostra "carregando" e não entra depois que a pessoa já está lendo, para nada pular na tela (10.11). Nunca há número de exemplo, porcentagem ou barra no lugar (#93), nem contagem regressiva (`landing-page-01-copy`, seção 08, Notas; `tom-de-voz`, "Outras alegações vetadas").

O contador "Total gerado" do hero é outra coisa e continua oculto em qualquer caso (conflito-05).

---

## 7. Acessibilidade

**Meta.** WCAG 2.2, nível AA, como mínimo (10.12). Os critérios abaixo não dependem de cor nem de estilo e valem antes do design.

**Ordem de leitura.** A ordem do código é a ordem da tabela de "Ordem das seções", sem as ocultas, com as três mudanças internas ditas lá (10.2, 10.16), e é sempre a mesma em que a pessoa vê a página no celular: quando o subtítulo do hero vai para baixo do botão, ele vai também no código. Dentro de cada seção, a ordem é a da coluna "Apoio" da hierarquia. O texto em duas colunas da 02 e os dois lados da horta são lidos na ordem da copy (primeiro a ação isolada ou a Gestão Mensal, depois o sistema). O cabeçalho fixo vem primeiro no código, e um link "pular para o conteúdo" leva direto ao título do hero.

**Títulos em hierarquia.**
- Um título principal só na página: o título do hero.
- Cada seção que vai ao ar tem um título de segundo nível: o título da seção (02, 03, 03b, 05, 06, 07, 08, 09).
- Terceiro nível para os blocos com título próprio dentro da seção: diagrama, comparação em barras e cartões (02); quadro da horta (03); cartão do método (03b); os quatro rótulos de fase das entregas e "Do começo ao fim" (05); as duas abas (06); "É para você se" e "Não é para você se" (07); os três passos, o cartão do que você leva e o cartão da oferta (08); cada pergunta (09).
- Nenhum nível é pulado. Sobretítulo, rótulo, selo e qualificador não são títulos.

**Textos alternativos.** Cada imagem tem texto alternativo que diz o que ela mostra, não como ela é. O texto final é escrito com a copy aprovada; aqui fica o que cada um precisa conter:

| Imagem | O texto alternativo precisa dizer |
|---|---|
| Logo | O nome de quem assina (placeholder, ficha-de-fatos#nome-agencia) |
| Imagem 1 e 2 (02) | A cena, como a legenda conta; a legenda continua visível, então o alternativo não a repete inteira |
| Diagrama (02) | Que é uma comparação entre ações isoladas e Sistema de Vendas; o conteúdo dos dois lados fica em texto na página, legível sem a imagem |
| Comparação em barras (02) | Que é um exemplo, com o selo "Exemplo"; os três cenários com os números ficam também como texto ou tabela |
| Quadro da horta (03) | Os dois lados, com os leads, as culturas, os dias (pelos campos de ficha-de-fatos#tempos-da-analogia) e o placar, como texto |
| Foto da metáfora (03) | O que a foto mostra e o selo "Tratada como rúcula" |
| Anel das peças (03b) | Que as sete peças ficam em volta do Sistema de Vendas Safra; as peças estão na lista logo abaixo |
| Janela do painel (06) | Que são dados de exemplo, com nomes e números fictícios |
| Cartão do relatório (08) | Que é um exemplo; as etapas e os números do exemplo ficam em texto |
| Foto do passo 3 (08) | Placeholder marcado [PROVA REAL]; se o retrato for por IA, o alternativo diz isso, como o sinal visível |

Imagem que só enfeita leva texto alternativo vazio, para o leitor de tela pular. Todo selo "Exemplo" ou "Dados de exemplo" é texto, nunca só desenho, e é lido junto do número que marca.

**Foco.**
- Todo botão, link e controle é alcançado pelo teclado, na ordem de leitura, e mostra onde está o foco.
- Quando um botão leva à 08, o foco vai para o título da 08.
- O cabeçalho fixo nunca cobre o elemento que está com o foco.
- Nada prende o foco: não há janela por cima da página.

**Alvo de toque.** Cada botão, link e controle tem pelo menos o tamanho mínimo de alvo do critério 2.5.8 da WCAG 2.2, com distância suficiente do vizinho para não tocar no errado. Os botões do bloco de chamada, o filtro da 05, as abas da 06 e as perguntas da 09 são os pontos de atenção no celular.

**Contraste.** Texto e fundo seguem a razão de contraste do nível AA (critério 1.4.3); botões, controles e o indicador de foco, a do critério 1.4.11. A cor não é a única forma de dizer nada: perda e ganho, as fases da linha do tempo da 05 e a aba ativa da 06 também se dizem em texto (critério 1.4.1). A cor em si é do design (conflito-08).

**Controles que mudam o que se vê.**
- Quadro da horta (03): abre no lado da Gestão Mensal de Leads (sugestão do wireframe; 10.9); a chave diz em texto qual lado está à vista e é anunciada como chave de duas posições; sem o programa da página, os dois lados aparecem um depois do outro, a Gestão Mensal primeiro.
- Filtro de peças (05): diz qual peça está escolhida e quantas entregas aparecem; "Todas" é o começo; sem o programa, todas as entregas aparecem.
- Abas do painel (06): anunciadas como abas, trocadas só pelo toque ou pelo teclado. Não giram sozinhas (10.13); sem o programa, as duas abas aparecem uma depois da outra.
- Perguntas frequentes (09): abrem todas fechadas, e uma aberta por vez (sugestão do wireframe; 10.9); cada pergunta diz se está aberta ou fechada; sem o programa, todas aparecem abertas.

**Movimento reduzido.** Quando o aparelho pede movimento reduzido: nenhuma animação de entrada, nenhuma rolagem animada, a troca da horta e das abas é imediata, e a seção 02 fica estática (`landing-page-01-briefing`, seção 3.2, "Sugestões do wireframe"). Mesmo sem esse pedido, nada pisca e nada se mexe sozinho por mais de alguns segundos sem um jeito de parar (critério 2.2.2).

**Legendas em vídeo.** Não há vídeo (8.6). Se houver, ver abaixo.

**Formulários.** Não se aplicam: a landing não tem formulário nem campo (8.14). As regras de formulário e de consentimento são do quiz-01.

**Idioma e leitura.** A página declara o português do Brasil como idioma. Os placeholders marcados não vão ao ar, então nunca são lidos pelo leitor de tela de quem visita.

---

## 8. Vídeo, se a 8.6 decidir que há

Fica registrado só para a etapa não ter de ser refeita do zero: o vídeo não toca sozinho com som; tem legenda sincronizada e transcrição na página; não é a única forma de receber nenhuma informação; carrega só quando a pessoa toca para ver; se falhar, fica a transcrição; e não toma o lugar do botão na primeira tela. Onde ele entra (hero ou seção própria) é a 8.6.

---

## 9. O que esta estrutura não decide

- O teste A/B do hero: a versão A está bloqueada (#85). Quando voltar, cada versão precisa de uma marca própria nos eventos; hoje a planta separa as versões pela versão da entrega (versao_entrega), e o jeito de marcar a variante do teste não está escrito (10.14).
- A meta da landing (8.1): a página mede visita e início do quiz por versão, sem meta e sem conclusão abaixo da amostra mínima.
- O endereço da landing e o do quiz-01 (`funil-01`).
- Todo o visual (conflito-08).

---

## Fontes

- entregas/landings/landing-page-01/copy.md (v1): ordem, texto, ocultas e bloqueios.
- entregas/landings/landing-page-01/briefing.md (v1): seção 2, 3.2 (UX), 4 (bloqueios); perguntas 8.1 a 8.15.
- funis/funil-01/funil.md (v1): "Caminho do lead", "Caminho do dado", "Origens e links", "Contador de escassez".
- dados/planta/planta.md (v1): eventos visita e inicio_quiz, etiquetas obrigatórias, código de sessão (6.2), contagem das análises gratuitas (6.7).
- base/provas-e-conformidade.md (v2), "LGPD"; base/ficha-de-fatos.md (v3): barra-de-resgates, analises-gratuitas, analise-nome-publico, nome-agencia, criterio-de-qualificacao, total-dos-dois, parcelamento, tempos-da-analogia; base/lacunas.md (v4): conflito-04, conflito-05, conflito-06, conflito-08, conflito-09, conflito-10, conflito-15, lacuna-22; base/decisoes.md (v3): #66, #85, #90, #93; nucleo/regras/seguranca.md (v1); base/design-system/design-system.md (v2), só para registrar que a meta WCAG 2.2 AA vem do v1.0, pendente.
- base/tom-de-voz.md (v2, desatualizado): a contagem regressiva entre as alegações vetadas.
- base/persona.md (v2, desatualizada): lida para saber em que aparelho o dono lê; não registra, e a prioridade do celular é escolha provisória (10.1).
- Wireframe: fontes/acervo-2026-11-08/safra-acervo/01-dossie/safra-landing.md, Parte 2, "UX" (só leitura).
- prompts/05-fila-perguntas.md: 5.5, 5.7, 6.2, 6.6, 6.7, 8.1, 8.3, 8.5, 8.6, 8.7, 8.9, 8.10, 8.14, 9.1, 9.11, 9.13 e 10.1 a 10.16.
