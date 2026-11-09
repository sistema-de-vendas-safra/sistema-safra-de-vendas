---
id: landing-page-01-variante-b
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
  junior: pendente
  euclides: pendente
depende_de:
  - id: landing-page-01-copy
    versao: 3
  - id: landing-page-01-estrutura
    versao: 3
  - id: landing-page-01-briefing
    versao: 3
  - id: ficha-de-fatos
    versao: 3
  - id: design-system
    versao: 3
  - id: lacunas
    versao: 5
  - id: decisoes
    versao: 3
desatualizado: true
---

# Landing-page-01 · variante B · branco e verde, botões laranja

Uma das duas variantes de design da landing-page-01, feitas para o Júnior e o Euclides escolherem na reunião (pauta-aprovacao-01, item 6a). Rascunho: nada daqui vai ao ar. O mesmo cabeçalho está num comentário no topo do index.html.

**O que é.** A página com o texto de `landing-page-01-copy` (v3), na ordem e com o comportamento de `landing-page-01-estrutura` (v3), vestida com a paleta branco e verde aprovada na call de 07/11 (#81, "pela sequência, confirmar") e com os botões laranja de 03/11, como registra fontes/acervo-2026-11-08/safra-acervo/01-dossie/safra-landing.md ("Design system antigo"). A variante A (../variante-a-design-system-v1/) tem o mesmo `<body>`, letra por letra; só o `<head>` e o CSS mudam.

**Status.** Rascunho. O design está em conflito (conflito-08): a #81 pede confirmação do Júnior, e a página depende da #90, pendente do Júnior e do Euclides. Nasce desatualizado, porque se apoia em documentos marcados (copy, estrutura, briefing e design-system; regra provisória 11.1).

## O que tem dentro

| Arquivo | O que é |
|---|---|
| index.html | A página: HTML semântico, com o programa da página no fim (horta, abas, perguntas, botão do cabeçalho, ida ao quiz) |
| estilo.css | A estrutura comum às duas variantes (celular primeiro) e, no fim, o tema desta variante |

## O que vem do registro e o que foi escolhido aqui

- **Do registro (safra-landing.md):** fundo branco com verde; botões laranja #FF8400, texto preto, borda inferior em relevo, brilho e a seta num círculo; o verde #00FF87 em tríade com o laranja.
- **Escolhido aqui (pergunta 17.3):** o registro não dá os tons do branco e verde. O verde de texto (#0B6E3A), o verde escuro (#0E2318), os verdes claros e o marrom do relevo do botão (#A85400) foram escolhidos para passar no contraste AA. O #00FF87 não passa sobre branco: aparece só como marca-texto sob letra escura (o destaque "nunca disseram não" da copy) e em fios e detalhes sem texto. O grafismo do hero no computador (pivôs vistos de cima) vem do conceito da imagem do hero registrado no wireframe (sugestão, não confirmada).
- **Fora desta variante:** a tipografia "cyberpunk" do Júnior (referência não encontrada), as imagens em estilo cyberpunk e a colheitadeira laranja; a barra de resgates piscando (sai pela #93).
- **Letra:** a do sistema; nenhuma fonte de fora (pergunta 17.4).

## Como ler a página

- **Fatos** aparecem como estão em base/ficha-de-fatos.md (v3), cada um num `<span class="fato" data-campo="...">` com o campo; as partes (`:parte`, `:n`) seguem "Como ler" da copy.
- **"a definir"**: etiqueta tracejada no lugar de cada campo bloqueado, de cada trecho [PENDENTE] e de cada [PROVA REAL] da copy, com o nome do campo ou da pergunta.
- **Seções ocultas** (hero A, contador "Total gerado", faixa de bastidores, credenciais, PDV-90, preço riscado, barra de resgates, "Posso parcelar?") não ocupam lugar; ficam como comentário HTML onde voltariam.
- **Imagens**: bloco cinza com a descrição, igual nas duas variantes.
- **Botões**: os blocos de chamada levam à seção 08 (#destino) e põem o foco no título; o botão da 08 abre ../../../quizzes/quiz-01/pagina/index.html com utm_source, utm_campaign e um código de sessão. Nada é guardado no navegador; o registro da visita fica desligado (só no console). Nenhum endereço externo.

## Como abrir

Abrir index.html no navegador. Prints em ../prints/ (variante-b-375.png e variante-b-1440.png), tirados com nucleo/ferramentas/prints/print.js.
