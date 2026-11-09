---
id: landing-page-01-variante-a
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

# Landing-page-01 · variante A · design system v1.0

Uma das duas variantes de design da landing-page-01, feitas para o Júnior e o Euclides escolherem na reunião (pauta-aprovacao-01, item 6a). Rascunho: nada daqui vai ao ar. O mesmo cabeçalho está num comentário no topo do index.html.

**O que é.** A página com o texto de `landing-page-01-copy` (v3), na ordem e com o comportamento de `landing-page-01-estrutura` (v3), vestida com o design system v1.0 (fontes/design-system-v1.0/, sem nenhuma alteração lá). A variante B (../variante-b-branco-e-verde/) tem o mesmo `<body>`, letra por letra; só o `<head>` e o CSS mudam.

**Status.** Rascunho. O design está em conflito (conflito-08; conflito-18 para o quiz): a adoção do design system v1.0 não está decidida, e a página depende da #90, pendente do Júnior e do Euclides. Nasce desatualizado, porque se apoia em documentos marcados (copy, estrutura, briefing e design-system; regra provisória 11.1).

## O que tem dentro

| Arquivo | O que é |
|---|---|
| index.html | A página: HTML semântico, com o programa da página no fim (horta, abas, perguntas, botão do cabeçalho, ida ao quiz) |
| tokens.css | Cópia de fontes/design-system-v1.0/safra-tokens.css; a única mudança é o travessão do comentário, trocado por ponto médio (regra 5) |
| estilo.css | A estrutura comum às duas variantes (celular primeiro) e, no fim, o tema desta variante, só com os tokens |

## Regras do design system seguidas

- Fundo Verde-noite, superfícies em Carvão, texto em Gelo; nenhuma sombra, brilho ou gradiente; separação por borda fina.
- Menta só na ação primária (texto Verde-noite) e no destaque da copy no título; foco de 2 px em Menta, com 3 px de afastamento.
- Família Geist pelos tokens. A pasta fontes/design-system-v1.0/ não tem os arquivos da Geist; a página não carrega nada de fora e cai na letra do sistema (pergunta 17.4).
- Títulos Bold, texto Regular, números e rótulos Light; rótulos em caixa alta com tracking aberto; raio sm nos botões, md nos cartões, lg nos blocos de destaque.
- Grafismo: curvas concêntricas de traço fino, ancoradas no canto do hero.
- O logotipo oficial não entra: o nome de quem assina está em conflito (ficha-de-fatos#nome-agencia); no lugar, um aviso "a definir".

## Como ler a página

- **Fatos** aparecem como estão em base/ficha-de-fatos.md (v3), cada um num `<span class="fato" data-campo="...">` com o campo; as partes (`:parte`, `:n`) seguem "Como ler" da copy.
- **"a definir"**: etiqueta tracejada no lugar de cada campo bloqueado, de cada trecho [PENDENTE] e de cada [PROVA REAL] da copy, com o nome do campo ou da pergunta.
- **Seções ocultas** (hero A, contador "Total gerado", faixa de bastidores, credenciais, PDV-90, preço riscado, barra de resgates, "Posso parcelar?") não ocupam lugar; ficam como comentário HTML onde voltariam.
- **Imagens**: bloco cinza com a descrição, igual nas duas variantes.
- **Botões**: os blocos de chamada levam à seção 08 (#destino) e põem o foco no título; o botão da 08 abre ../../../quizzes/quiz-01/pagina/index.html com utm_source, utm_campaign e um código de sessão. Nada é guardado no navegador; o registro da visita fica desligado (só no console). Nenhum endereço externo.

## Como abrir

Abrir index.html no navegador. Prints em ../prints/ (variante-a-375.png e variante-a-1440.png), tirados com nucleo/ferramentas/prints/print.js.
