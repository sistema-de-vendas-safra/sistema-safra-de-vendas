---
id: aviso-de-cookies
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: politica-de-privacidade
    versao: 3
  - id: decisoes
    versao: 6
desatualizado: true
---

# Aviso de cookies · rascunho

## Para a equipe (não vai para a página)

**Para que serve.** Pedir a quem visita a escolha entre aceitar e recusar a medição com o Google Analytics, antes de qualquer coisa do Google carregar (decisão do Otávio, 12/11/2026; base/decisoes.md, #116). Até o "Aceitar", a página não guarda nada no navegador e não fala com ninguém de fora; depois da escolha, a página guarda só a escolha (com o aceite, o Google Analytics grava os cookies dele, como diz a política). O que fica guardado, o que o Google Analytics registra e como mudar a escolha estão na política (`politica-de-privacidade` v3, item 7); este documento tem só o texto do aviso.

**Onde aparece.** No protótipo do funil-01, no topo de / (landing-page-02) e de /quiz/, sem cobrir nada: nem o botão "Fazer a Análise" nem a barra fixa do rodapé do quiz no celular. Entra pela montagem do site (entregas/prototipo-funil-01/montar-site.mjs, parte 17.2 do pedido 17), nunca nas entregas. Aparece enquanto não há escolha guardada; com a escolha guardada, não aparece de novo, também na outra página. O link discreto do fim da página (chave `reabrir`) abre o aviso de novo para mudar a escolha.

**Regras do aviso** (#116; prompts/17-medicao-google.md): "Aceitar" e "Recusar" com o mesmo peso visual; nada do Google antes do "Aceitar"; o consentimento de anúncio fica sempre negado; o código da visita (id_sessao) não vai ao Google.

**Status.** Rascunho: o texto é do Claude, para o Otávio aprovar ("O texto do aviso é rascunho até o Otávio aprovar", prompts/17-medicao-google.md; #116). Desatualizado porque a política, de que depende, está marcada (nucleo/regras/versionamento.md v3, 11.1).

**Como ler o bloco.** A montagem do protótipo lê o texto do bloco `aviso` abaixo. Uma chave por linha, no formato `chave: valor`, com o valor numa linha só e sem aspas. As chaves são fixas: titulo, texto, aceitar, recusar, politica e reabrir. Mudar o texto é mudar aqui, subir a versão e montar o site de novo. `{{a definir: ...}}` é dado que ainda não existe; na página, aparece como o texto visível "[a definir: ...]", como no quiz. A chave termina no primeiro dois-pontos seguido de espaço; o resto da linha é o valor, mesmo com outros dois-pontos. O `texto` cita o link "Cookies": se o valor de `reabrir` mudar, o `texto` muda junto.

## Texto do aviso

```aviso
titulo: Cookies e medição
texto: A gente quer medir como este site é usado, com o Google Analytics, do Google. Ele usa cookies e só entra se você aceitar. Se você recusar, nada muda na página. Dá para mudar a escolha depois, no link Cookies, no fim da página.
aceitar: Aceitar
recusar: Recusar
politica: Como a gente cuida dos seus dados: política de privacidade {{a definir: link da politica de privacidade}}.
reabrir: Cookies
```

## Fontes

- base/decisoes.md (`decisoes` v6), #116: o aviso com "Aceitar" e "Recusar" do mesmo peso, o Google Analytics só depois do "Aceitar", o texto como rascunho até o Otávio aprovar.
- entregas/documentos/politica-de-privacidade.md (`politica-de-privacidade` v3), item 7: Google Analytics com cookies, só depois do "Aceitar"; recusar não muda nada na página; o link "Cookies" no fim da página para mudar a escolha.
- prompts/17-medicao-google.md (pedido 17), partes 17.1 e 17.2: onde o aviso aparece, o que ele não pode cobrir e o link para reabrir.
