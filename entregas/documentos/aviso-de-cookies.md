---
id: aviso-de-cookies
versao: 4
status: decidido
aprovado_por:
  otavio: 2026-11-18
depende_de:
  - id: politica-de-privacidade
    versao: 7
  - id: decisoes
    versao: 12
desatualizado: true
---

# Aviso de cookies · rascunho

## Para a equipe (não vai para a página)

**Para que serve.** Pedir a quem visita a escolha entre aceitar e recusar as duas medições, a do Google Analytics e a do Pixel da Meta, antes de qualquer coisa do Google ou da Meta carregar (decisão do Otávio, 12/11/2026, #116, revista pela #122 em 18/11/2026). Um "Aceitar" só cobre as duas; "Recusar" recusa as duas. Até o "Aceitar", a página não guarda nada no navegador e não fala com ninguém de fora; depois da escolha, a página guarda só a escolha (com o aceite, o Google Analytics grava os cookies dele, como diz a política). O que fica guardado, o que o Google Analytics registra e como mudar a escolha estão na política (`politica-de-privacidade` v3, item 7); este documento tem só o texto do aviso.

**Onde aparece.** No protótipo do funil-01, no topo de / (landing-page-02), de /analise/ (o quiz; até 14/11/2026, em /quiz/; #120) e da página da política, sem cobrir nada: nem o botão "Fazer a Análise" nem a barra fixa do rodapé do quiz no celular. Entra pela montagem do site (entregas/prototipo-funil-01/montar-site.mjs, parte 17.2 do pedido 17), nunca nas entregas. Aparece enquanto não há escolha guardada; com a escolha guardada, não aparece de novo, também na outra página. O link discreto do fim da página (chave `reabrir`) abre o aviso de novo para mudar a escolha.

**Regras do aviso** (#116 e #122; prompts/17-medicao-google.md): "Aceitar" e "Recusar" com o mesmo peso visual; nada do Google nem da Meta antes do "Aceitar" (o Pixel entra só pelo Google Tag Manager); o consentimento de anúncio do Google fica sempre negado; o código da visita (id_sessao) não vai ao Google nem à Meta.

**Status.** Decidido: o texto da v4 é o do pacote v7, aprovado pelo Otávio e pelo jurídico em 18/11/2026 (#122). Desatualizado porque a política, de que depende, está marcada (nucleo/regras/versionamento.md v3, 11.1).

**Como ler o bloco.** A montagem do protótipo lê o texto do bloco `aviso` abaixo. Uma chave por linha, no formato `chave: valor`, com o valor numa linha só e sem aspas. As chaves são fixas: titulo, texto, aceitar, recusar, politica e reabrir. Mudar o texto é mudar aqui, subir a versão e montar o site de novo. Um link vai no formato `[texto](/caminho/)`, só para um endereço do próprio site, começando por "/"; na página, ele abre numa aba nova (desde a v2, a política, em /politica-de-privacidade/; #117). `{{a definir: ...}}` é dado que ainda não existe; na página, aparece como o texto visível "[a definir: ...]", como no quiz. A chave termina no primeiro dois-pontos seguido de espaço; o resto da linha é o valor, mesmo com outros dois-pontos. O `texto` cita o link "Cookies": se o valor de `reabrir` mudar, o `texto` muda junto.

## Texto do aviso

```aviso
titulo: Cookies e medição
texto: A gente quer medir como este site é usado, com o Google Analytics, e medir os nossos anúncios no Facebook e no Instagram, com o Pixel da Meta. Os dois usam cookies e só entram se você aceitar. Se você recusar, nada muda na página. Dá para mudar a escolha depois, no link Cookies, no fim da página.
aceitar: Aceitar
recusar: Recusar
politica: Como a gente cuida dos seus dados: [política de privacidade](/politica-de-privacidade/).
reabrir: Cookies
```

## O que mudou na versão 4

Decisão do Otávio, 18/11/2026 (base/decisoes.md, #122, revisão da #116; pacote v7, aprovado pelo Otávio e pelo jurídico). Só a chave `texto` do bloco: o aviso passa a pedir a escolha também para o Pixel da Meta. As outras chaves não mudaram. O aviso sai do rascunho: decidido, com o Otávio em aprovado_por. depende_de: politica-de-privacidade 7 e decisoes 12.

## O que mudou na versão 3

Decisão do Otávio, 13/11/2026 (base/decisoes.md, #120; pedido 21, parte 21.2). Só a frase "Onde aparece": o quiz passa de /quiz/ a /analise/ no site do protótipo, e a página da política, onde o aviso também aparece desde a v11 do protótipo, entra na lista. O texto do aviso não mudou.

## O que mudou na versão 2

Respostas do Otávio aos "a definir" do funil, 13/11/2026 (base/decisoes.md, #117): a política de privacidade saiu do rascunho e ganhou página no protótipo. A linha `politica` passa a ter o link para ela, no lugar de "{{a definir: link da politica de privacidade}}", e "política" ganha o acento que faltava. O resto do texto não mudou. depende_de: politica-de-privacidade 4 e decisoes 7.

## Fontes

- base/decisoes.md (`decisoes` v12), #122: o "Aceitar" cobre o Google Analytics e o Pixel da Meta; o texto do bloco, do pacote v7.
- entregas/documentos/politica-de-privacidade.md (`politica-de-privacidade` v7), item 7: as duas medições, os cookies de cada uma e como mudar a escolha.

- base/decisoes.md (`decisoes` v6), #116: o aviso com "Aceitar" e "Recusar" do mesmo peso, o Google Analytics só depois do "Aceitar", o texto como rascunho até o Otávio aprovar.
- entregas/documentos/politica-de-privacidade.md (`politica-de-privacidade` v3), item 7: Google Analytics com cookies, só depois do "Aceitar"; recusar não muda nada na página; o link "Cookies" no fim da página para mudar a escolha.
- prompts/17-medicao-google.md (pedido 17), partes 17.1 e 17.2: onde o aviso aparece, o que ele não pode cobrir e o link para reabrir.
