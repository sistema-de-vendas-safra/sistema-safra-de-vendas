---
id: quiz-01-pagina
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
  junior: pendente
  euclides: pendente
depende_de:
  - id: quiz-01-copy
    versao: 1
  - id: quiz-01-briefing
    versao: 1
  - id: lead-score
    versao: 2
  - id: ficha-de-fatos
    versao: 3
  - id: planta-do-banco
    versao: 2
  - id: funil-01
    versao: 2
  - id: lacunas
    versao: 5
desatualizado: true
---

# Quiz-01 · página

A página do quiz-01 do funil-01, em rascunho. Nada daqui vai ao ar.

**O que é.** Uma cópia do mockup do Júnior (fontes/quiz-01-repositorio-2026-11-08/mockups/quiz-diagnostico.html, que não foi alterado) com o texto de `quiz-01-copy` (mudanças M1 a M30) e a lógica pedida na etapa 14 (prompts/07-fila-da-noite.md). O mesmo cabeçalho está num comentário no topo do index.html.

**Status.** Rascunho, avisando que pode mudar. O quiz é do Júnior, e o fim dele depende do critério de qualificação (conflito-16) e do funil-01 (#90), os dois pendentes do Júnior e do Euclides. Nasce desatualizado, porque se apoia em documentos marcados (lead-score, funil-01, planta-do-banco, briefing e copy do quiz; regra provisória 11.1).

## O que tem dentro

| Arquivo | O que é |
|---|---|
| index.html | A página: HTML, CSS e o script, num arquivo só |
| poster-junior.jpg | A foto do Júnior que o mockup usa (cópia do arquivo em fontes/) |

No topo do script, quatro objetos concentram o que se ajusta:

- **FATOS:** os fatos da ficha que a página usa, cada um com o id do campo de base/ficha-de-fatos.md (v3). Campo em conflito aparece na tela como aviso visível "[a definir: ...]" (nome público da Análise, nome da agência). As metas por etapa saem daqui, e com elas os números das metas escritos no relatório ("pelo menos 5", "1 a cada 4", "1 a cada 5", "metade", a conversão geral e o rodapé), como pede a pergunta 13.13. O preço da Avançada só entra na conta do lead score; não aparece na tela.
- **LEAD_SCORE:** pontos, faixas e eliminatórios de base/lead-score.md (v2), comentados. A conta está em `calcularLeadScore()`, que só usa o que a pessoa respondeu.
- **CRITERIO_DO_FIM:** qual critério decide o final. Está em `'junior'`, o comportamento do mockup, porque o conflito-16 não foi decidido; os dois critérios aparecem lado a lado no console (13.6; 14.2).
- **ETIQUETAS e UTM_ACEITAS:** funil-01, entrega quiz-01, versão 1, e os valores de utm_source e utm_campaign aceitos, da tabela de origens do funil-01. Fora da lista, a etiqueta vai vazia.

**Pacote.** No envio do contato, `montarPacote()` monta o pacote no formato de dados/planta/planta.md (v2): a parte da gaveta pessoas (nome, telefone, email, empresa, os quatro campos de consentimento, com a frase da política no texto aceito, e primeira_utm_source e primeira_utm_campaign) e o evento fim_quiz (etiquetas, id_sessao, ocorrido_em, respostas, lead_score_nota, lead_score_faixa, lead_score_versao). Os campos que o banco e o garçom dão (id_pessoa, id_evento, gravado_em, gravado_por) não saem da página.

**Envio desligado.** `enviarPacote(pacote)` só escreve o pacote no console do navegador. Não há nenhum endereço de envio nem chave na página (conflito-17; #90).

**Consentimento.** Duas caixas desmarcadas (WhatsApp e e-mail) antes dos campos de e-mail e WhatsApp. Sem pelo menos uma marcada, o botão fica desligado, o aviso "Marque pelo menos um jeito de receber o diagnóstico." aparece e, mesmo com o clique forçado, nada é enviado (13.4).

**Visual.** Sem mudança: está em conflito (conflito-18). O CSS é o do mockup; só os comentários perderam o travessão. A página continua carregando as fontes do Google (Inter, Space Grotesk, Permanent Marker), como o mockup (14.1).

## Como abrir

Abrir entregas/quizzes/quiz-01/pagina/index.html no navegador. Para ver as etiquetas, abrir com o endereço terminado em `?utm_source=bio&utm_campaign=funil-01`. O pacote aparece no console do navegador (Ferramentas do desenvolvedor, aba Console) quando o contato é enviado.

O botão "Telas", no canto, é do protótipo: pula direto para qualquer tela, para revisão.

## Como testar

```
node nucleo/ferramentas/prints/testar-quiz-01.js
```

Usa o playwright-core de nucleo/ferramentas/prints/ (veja nucleo/ferramentas/README.md). Abre a página local em 375 e 1440 pixels e:

1. percorre o quiz com as respostas do exemplo de base/lead-score.md (faturamento de R$ 500 mil a R$ 1,5 milhão, venda média de R$ 10 mil, 2 ou 3 vendedores, 200 leads, CRM em dia, dono, dinheiro na mesa de 4 vezes o custo mensal, tentativas "1 ou 2" e sobra "Alguns") e confere que o pacote tem total 96 e faixa a;
2. percorre um caso eliminatório (faturamento "Menos de R$ 50 mil") e confere a faixa eliminatorio e a tela do relatório com "Tenho interesse";
3. confere que, sem consentimento, o botão fica desligado, o aviso aparece e nada é enviado.

Os prints ficam em entregas/quizzes/quiz-01/prints/: capa, pergunta, contato-consentimento, contato-sem-consentimento, resultado-a e resultado-eliminatorio, cada um com -375 e -1440. Os dados de pessoa do teste são fictícios (Marina, marina@example.com, telefone com zeros).

### Resultado do teste (08/11/2026)

```
· 375 pixels
OK     · exemplo: um pacote no console
OK     · exemplo: total 96 (veio 96)
OK     · exemplo: faixa a (veio a)
OK     · exemplo: lead_score_versao 2
OK     · exemplo: etiquetas funil-01, quiz-01, versão 1
OK     · exemplo: utm lidas do endereço (bio, funil-01)
OK     · exemplo: consentimento gravado no pacote
OK     · exemplo: nenhuma requisição externa além das fontes do mockup
OK     · eliminatório: faixa eliminatorio (veio eliminatorio, nota 81)
OK     · eliminatório: tela do relatório com "Tenho interesse"
OK     · sem consentimento: botão desligado
OK     · sem consentimento: aviso visível
OK     · sem consentimento: nenhum pacote enviado, mesmo forçando o clique
OK     · sem consentimento: continua na tela de contato

· 1440 pixels
OK     · exemplo: um pacote no console
OK     · exemplo: total 96 (veio 96)
OK     · exemplo: faixa a (veio a)
OK     · exemplo: lead_score_versao 2
OK     · exemplo: etiquetas funil-01, quiz-01, versão 1
OK     · exemplo: utm lidas do endereço (bio, funil-01)
OK     · exemplo: consentimento gravado no pacote
OK     · exemplo: nenhuma requisição externa além das fontes do mockup
  pacote do exemplo: {"pessoa":{"nome":"Marina","telefone":"+55 (00) 90000-0000","email":"marina@example.com","empresa":"","consentimento_whatsapp":"sim","consentimento_email":"sim","consentimento_texto":"Antes do seu contato, o combinado. Seu nome, e-mail e WhatsApp servem para duas coisas: mandar o seu diagnóstico e alguém da nossa equipe falar com você sobre ele. Nada além disso. Você pode retirar o aceite ou pedir para apagar seus dados quando quiser. Tudo explicado na política de privacidade [a definir: link da política de privacidade]. Aceito receber o diagnóstico e o contato da equipe por WhatsApp. Aceito receber o diagnóstico e o contato da equipe por e-mail.","consentimento_em":"2026-11-08T23:45:02.019Z","primeira_utm_source":"bio","primeira_utm_campaign":"funil-01"},"evento":{"tipo":"fim_quiz","funil":"funil-01","entrega":"quiz-01","versao_entrega":1,"utm_source":"bio","utm_campaign":"funil-01","id_sessao":"sessao-mw8hc704-1kk4g5dj","ocorrido_em":"2026-11-08T23:45:02.019Z","respostas":{"ramo":"Serviços para empresas","faturamento":"R$ 500 mil a R$ 1,5 milhão","vendedores":"2 ou 3","quem-marca":"Sim. O vendedor faz tudo","valor-medio":"R$ 10.000","origem":["Indicação de clientes"],"crm":"Sim, e o time atualiza todo dia","cargo":"Dono(a) ou sócio(a)","lembra":"Sim","numeros":[{"linha":"Leads por mês","valor":"200","unidade":"nº"},{"linha":"Pré-qualificados","valor":"50","unidade":"%"},{"linha":"Agendados","valor":"50","unidade":"nº"},{"linha":"Conversas realizadas","valor":"40","unidade":"nº"},{"linha":"Vendas fechadas","valor":"2","unidade":"nº"}],"causa":"Em até 1 hora","causa2":"1 ou 2","causa3":"Alguns"},"lead_score_nota":96,"lead_score_faixa":"a","lead_score_versao":2}}
OK     · eliminatório: faixa eliminatorio (veio eliminatorio, nota 81)
OK     · eliminatório: tela do relatório com "Tenho interesse"
OK     · sem consentimento: botão desligado
OK     · sem consentimento: aviso visível
OK     · sem consentimento: nenhum pacote enviado, mesmo forçando o clique
OK     · sem consentimento: continua na tela de contato

Tudo certo: todas as conferências passaram
```

## O que ainda falta para ir ao ar

- Decidir os conflitos 16 a 19 e o nome da Análise (conflito-02) e da agência (conflito-07).
- A política de privacidade (etapa 16) e o link dela no consentimento; o número do WhatsApp; os vídeos.
- O banco e o garçom (etapa 18), para `enviarPacote` passar a enviar de verdade.
- O relatório usar os números da pessoa no lugar dos cenários de exemplo do protótipo (14.7).
- Revisão de advogado do texto de consentimento (`provas-e-conformidade`).

## Perguntas

prompts/07-fila-perguntas.md, 14.1 a 14.13.
