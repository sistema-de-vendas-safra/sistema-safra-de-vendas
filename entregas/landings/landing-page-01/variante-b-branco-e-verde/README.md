---
id: landing-page-01-variante-b
versao: 3
status: rascunho
aprovado_por:
  otavio: pendente
  junior: pendente
  euclides: pendente
depende_de:
  - id: landing-page-01-copy
    versao: 4
  - id: landing-page-01-estrutura
    versao: 4
  - id: landing-page-01-briefing
    versao: 4
  - id: ficha-de-fatos
    versao: 4
  - id: design-system
    versao: 4
  - id: lacunas
    versao: 6
  - id: decisoes
    versao: 5
  - id: garcom
    versao: 4
  - id: planta-do-banco
    versao: 4
desatualizado: true
---

# Landing-page-01 · variante B · branco e verde, botões laranja

Uma das duas variantes de design da landing-page-01, feitas para o Júnior e o Euclides escolherem na reunião (pauta-aprovacao-01, item 6a). Rascunho: nada daqui vai ao ar. O mesmo cabeçalho está num comentário no início do index.html, logo depois do doctype e da meta charset.

**O que é.** A página com o texto de `landing-page-01-copy` (v4), na ordem e com o comportamento de `landing-page-01-estrutura` (v4), vestida com a paleta branco e verde aprovada na call de 07/11 (#81, "pela sequência, confirmar") e com os botões laranja de 03/11, como registra fontes/acervo-2026-11-08/safra-acervo/01-dossie/safra-landing.md ("Design system antigo"). A variante A (../variante-a-design-system-v1/) tem o mesmo `<body>`, letra por letra; só o `<head>` e o CSS mudam.

**Status.** Rascunho. O design está em conflito (conflito-08): a #81 pede confirmação do Júnior, e a página depende da #90, pendente do Júnior e do Euclides. Continua desatualizado, porque se apoia em documentos marcados (copy e briefing, pela cadeia da pauta; regra de versionamento v3, 11.1).

**Entrega no catálogo.** A página publicada é a entrega landing-page-01, versão 1, do catálogo de entregas do banco (10.15; pergunta 32.4): é o par que a visita leva, igual nas duas variantes. Usa landing-page-01-copy v4 e landing-page-01-estrutura v4. A versão sobe a cada publicação que mude o que é medido.

## O que tem dentro

| Arquivo | O que é |
|---|---|
| index.html | A página: HTML semântico, com o programa da página no fim (horta, abas, perguntas, botão do cabeçalho, ida ao quiz) |
| estilo.css | A estrutura comum às duas variantes (celular primeiro) e, no fim, o tema desta variante |

## O que vem do registro e o que foi escolhido aqui

- **Do registro (safra-landing.md):** fundo branco com verde; botões laranja #FF8400, texto preto, borda inferior em relevo, brilho e a seta num círculo; o verde #00FF87 em tríade com o laranja.
- **Escolhido aqui (pergunta 17.3):** o registro não dá os tons do branco e verde. O verde de texto (#0B6E3A), o verde escuro (#0E2318), os verdes claros e o marrom do relevo do botão (#A85400) foram escolhidos para passar no contraste AA. O #00FF87 não passa sobre branco: aparece só como marca-texto sob letra escura (o destaque "nunca disseram não" da copy) e em fios e detalhes sem texto. O grafismo do hero no computador (pivôs vistos de cima) vem do conceito da imagem do hero registrado no wireframe (sugestão, não confirmada).
- **Fora desta variante:** a tipografia "cyberpunk" do Júnior (referência não encontrada), as imagens em estilo cyberpunk e a colheitadeira laranja; a barra de resgates piscando (sai pela #93).
- **Letra:** a do sistema. Esta variante não tem fonte própria: não pede nenhum arquivo de fonte, nem ao Google nem ao próprio site (17.4; 10.7).

## Como ler a página

- **Fatos** aparecem como estão em base/ficha-de-fatos.md (v4), cada um num `<span class="fato" data-campo="...">` com o campo; as partes (`:parte`, `:n`) seguem "Como ler" da copy.
- **"a definir"**: etiqueta tracejada no lugar de cada campo bloqueado, de cada trecho [PENDENTE] e de cada [PROVA REAL] da copy, com o nome do campo ou da pergunta.
- **Seções ocultas** (hero A, contador "Total gerado", faixa de bastidores, credenciais, PDV-90, preço riscado, barra de resgates, "Posso parcelar?") não ocupam lugar; ficam como comentário HTML onde voltariam.
- **Imagens**: bloco cinza com a descrição, igual nas duas variantes.
- **Botões**: os blocos de chamada levam à seção 08 (#destino) e põem o foco no título; o botão da 08 abre o quiz-01 repassando as utm que estiverem no endereço da landing (utm_source, utm_medium, utm_campaign, utm_content e utm_term; a que não existe não vai) e o código de sessão da visita, no parâmetro id_sessao. O destino é o href do botão: no arquivo, ../../../quizzes/quiz-01/pagina/index.html, para a revisão local; no site do protótipo, a montagem (entregas/prototipo-funil-01/montar-site.mjs) troca por /quiz/. Nada é guardado no navegador.
- **Visita**: ao abrir, um POST para /api/evento com `{"evento":{"tipo":"visita","funil":"funil-01","entrega":"landing-page-01","versao_entrega":1,"utm_source":...,"utm_campaign":...,"id_sessao":"sessao-...","ocorrido_em":...}}`, no formato da porta /api/evento do garçom v4 (entregas/garcom/README.md). Sem dado de pessoa e sem aceite. A página não espera a resposta.
- **Nenhum pedido a outro endereço**: folhas de estilo, fonte e visita, tudo na mesma origem.

## O que mudou na versão 3

Etapa 34 (prompts/11-decisoes-de-09-11.md), 09/11/2026, com as respostas do Otávio de 09/11/2026 (decisão do Otávio, 09/11/2026). As duas variantes mudam juntas e o `<body>` continua igual, letra por letra.

- **Texto da copy v4** (etapa 31): o hero B ganha o subtítulo do wireframe, com a duração pela ficha e o trecho da recompra marcado "a definir: #16" (#108); saem as marcas da 8.3 e da prova real do título (#108, #109). O hero A, a promessa de 08/11 para o público frio, fica oculto, como comentário no lugar, até a 10.14 (pergunta 31.7). Saem as marcas já respondidas: 4.4 (nota de Deming), 8.11 (fases de cor), 8.12 (Inteligência Humana, entrega 06 e "Prioridade da semana") e 8.15 (título, passos 1 e 2 e itens 1 e 2 do cartão da 08) (#114).
- **Call de Direcionamento** no passo 3 da 08 (#107; texto da pergunta 31.8): "Se o seu perfil encaixa, a gente liga para marcar a Call de Direcionamento." e "60 minutos com o Junior Neves, com os seus números na mesa: ele mostra como o sistema ficaria no seu comercial.", com nome, duração e condutor em `<span class="fato">` pelos campos nome-call-de-venda:nome, duracao-call-de-venda:duracao e quem-faz-a-reuniao:condutor (partes da pergunta 31.9). Sai a marca de ficha-de-fatos#analise-quem-conduz.
- **Registro da visita** (18.5, 10.8, 10.9, 10.10; estrutura v4, "Caminho até o quiz"): ao abrir, a página cria o código de sessão no formato do banco (`sessao-` e até 60 letras minúsculas, números e hífen; só na memória da aba) e manda a visita ao garçom, em POST /api/evento na mesma origem, sem esperar resposta. Se a gravação falhar, nada muda na página e nada é tentado de novo. O mesmo código vai ao quiz no parâmetro id_sessao, com as utm presentes (10.5). Aberta do arquivo, não manda nada; sem o programa, a página continua legível e o botão da 08 abre o quiz sem origem. Sai o console.log da visita.
- **Doctype e charset antes do comentário de cabeçalho** (09.1): a página começa por `<!doctype html>`, `<html lang="pt-BR">`, `<head>` e `<meta charset="utf-8">`, e o comentário com o cabeçalho vem logo depois. Antes, o comentário vinha primeiro e passava de 1024 bytes; o montador punha a meta charset antes de tudo, inclusive do doctype, e a página montada no site rodava em modo de compatibilidade (document.compatMode "BackCompat"), sem que se notasse. Agora fica no modo padrão também no site.
- **Subtítulo do hero com largura máxima** (40em), para a linha não atravessar a tela no computador agora que o subtítulo tem texto. Única mudança de estilo comum às duas variantes.
- O filtro da seção 05 fica como está: a lista de peças por entrega é rascunho à parte, para o Otávio aprovar (17.5).
- depende_de com as versões atuais e com garcom 4 e planta-do-banco 4, que a visita usa.

## O que mudou na versão 2

Etapa 23 (prompts/08-fila-da-madrugada.md). Só o programa do botão da 08: repassa ao quiz as cinco utm que existirem no endereço (na v1, só utm_source e utm_campaign, e vazias quando faltavam) e explica que, no site do protótipo, o caminho do quiz vira /quiz/ pela montagem. Texto, marcação e visual sem mudança; o `<body>` continua igual nas duas variantes. O quiz-01 só lê utm_source e utm_campaign; as outras três vão no endereço, mas não chegam ao banco (pergunta 23.5).

## Como abrir

Abrir index.html no navegador: tudo funciona para revisão, só sem mandar a visita. No site do protótipo (entregas/prototipo-funil-01/), a página fica em /b/ e manda a visita ao garçom.

Prints em ../prints/ (variante-b-375.png e variante-b-1440.png), tirados do site montado (montar-site.mjs), servido em 127.0.0.1 com /api/evento respondido no lugar do garçom, em 375 pixels como celular (densidade 2) e em 1440, página inteira (etapa 34). Na versão 2 eram tirados do arquivo, com print.js, em 375 sem imitar celular.
