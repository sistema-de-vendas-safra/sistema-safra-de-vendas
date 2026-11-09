---
id: garcom
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: banco-rascunho
    versao: 1
  - id: planta-do-banco
    versao: 2
  - id: funil-01
    versao: 2
  - id: quiz-01-pagina
    versao: 1
  - id: regra-seguranca
    versao: 1
  - id: lacunas
    versao: 5
desatualizado: true
---

# Garçom · rascunho

A função que fica entre a página do quiz e o banco (funis/funil-01/funil.md, "Caminho do dado", passo 2), escrita como um Cloudflare Worker em JavaScript, sem dependências externas. **Nunca foi publicada nem ligada a um banco real.**

**Status.** Rascunho, pendente do Otávio. Nasce desatualizado, porque se apoia em documentos marcados (planta-do-banco, funil-01, quiz-01-pagina; regra provisória 11.1).

**Destino dos contatos em conflito · bloqueado para entrega até a decisão** (conflito-17, em base/lacunas.md). Este código segue o lado 2 (#90: banco pelo garçom e planilha do SDR), como a planta e o funil-01, sem escolher. Se o lado 1 (Triad CRM) vencer, só a parte da gravação muda; as conferências continuam valendo.

## O que tem dentro

| Arquivo | O que é |
|---|---|
| garcom.mjs | O garçom: o handler `fetch` do Worker e a função `conferirPacote` |
| wrangler.toml.exemplo | Exemplo de configuração da Cloudflare, só com nomes de variáveis, sem valores e sem identificador de conta |
| teste/testar-garcom.mjs | Teste local, com um fetch falso que só registra o que seria gravado |

## O que faz

1. **Porta.** Só aceita pedidos da origem lida de `env.ORIGEM_PERMITIDA` (CORS restrito; pedido sem origem ou de outra origem é recusado). Responde ao pré-voo do navegador (OPTIONS) só para essa origem.
2. **Método, tamanho e formato.** Só POST, só corpo JSON declarado, no máximo 16 KB (conferido pelo cabeçalho e de novo pelo corpo lido), e só os campos que a planta tem: campo a mais é recusado.
3. **Etiquetas obrigatórias.** funil (da lista: funil-01), entrega e versao_entrega (formato do id e número inteiro), utm_source e utm_campaign presentes e, para valer, da tabela de origens do funil-01 (stories, bio, reels, email, whatsapp; funil-01). meta-ads está reservada e fica fora. O mesmo vale para a origem da primeira visita da pessoa. Utm fora da lista não recusa o pacote: é gravada vazia, como a planta manda (5.5), e o registro do garçom anota só o nome do campo esvaziado, nunca o valor (18.7). Utm que não é texto recusa o pacote. Se o par entrega e versão existe no catálogo, quem confere é o banco (18.8).
4. **Evento.** Só o fim do quiz (fim_quiz), com sessão, data, respostas, nota de 0 a 100, faixa (a, b, c ou eliminatorio) e versão do lead score. O clique em "Tenho interesse" fica preparado como proposta (`TIPOS_PROPOSTOS`), não ligado (14.15; 16.13; 18.4).
5. **Consentimento obrigatório.** Pelo menos um canal aceito (WhatsApp ou e-mail), com o texto aceito e a data do aceite. Sem isso, nada é gravado.
6. **Gravação.** Chama só a função `registrar_fim_quiz` de dados/banco/esquema.sql pela API REST do Supabase, com `env.SUPABASE_URL` e `env.SUPABASE_SERVICE_KEY`. O garçom não lê nenhuma tabela.
7. **Respostas sem detalhe interno.** Quem envia só recebe `{"ok":true}`, `pacote recusado` ou `servico indisponivel`, com o código HTTP. O motivo da recusa vai só para o registro da Cloudflare, sem nenhum dado do pacote.

## Segredos

Só os nomes aparecem no código. Os valores moram nas variáveis secretas da Cloudflare (o cofre) e nunca entram no repositório (nucleo/regras/seguranca.md, regra 3):

| Variável | O que é |
|---|---|
| SUPABASE_URL | Endereço do projeto no Supabase |
| SUPABASE_SERVICE_KEY | Chave do papel de serviço; nunca vai para a página nem para o navegador |
| ORIGEM_PERMITIDA | A única origem que pode enviar: o endereço da página do quiz |

Sem qualquer uma delas, o garçom responde `servico indisponivel` e não grava nada.

## O que falta para funcionar

1. **Conta na Cloudflare** do Safra registrada em conexoes.md, com verificação em duas etapas.
2. **Conta e banco no Supabase**, com dados/banco/esquema.sql aplicado e conferido (dados/banco/README.md).
3. **Detector de chaves ligado** antes da primeira chave (nucleo/regras/seguranca.md, "Detector de chaves").
4. **Segredos no cofre:** os três acima, como variáveis secretas da Cloudflare; registrar em conexoes.md onde moram e como revogar.
5. **Decisão do conflito-17** (Júnior e Euclides) e aprovação do Otávio.
6. **Ligar a página:** `enviarPacote` do quiz-01 passa a fazer o POST para o endereço do garçom, numa versão nova da página.
7. Trocar o papel de serviço por um papel só do garçom, se o Otávio aceitar a recomendação de 18.2.

## Como testar localmente, sem serviço real

```
node entregas/garcom/teste/testar-garcom.mjs
```

Precisa só do Node (18 ou mais novo), sem instalar nada. O teste importa o handler de garcom.mjs e troca o `fetch` por um falso, que só registra o que seria gravado e recusa qualquer endereço que não seja o de mentira. Os valores do ambiente são de mentira, num domínio `.invalid`, que não existe. Usa o pacote do exemplo do README do quiz-01 (entregas/quizzes/quiz-01/pagina/README.md, dados fictícios), lido do próprio README, e casos inválidos. Também confere que nenhuma resposta vaza detalhe interno e que o registro do garçom não leva dado pessoal.

### Resultado do teste (08/11/2026)

```
OK     · pacote do exemplo do quiz-01 (status 201, gravações 1, resposta {"ok":true})
OK     · sem consentimento (nenhum canal aceito) (status 422, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · consentimento sem texto (status 422, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · consentimento sem data (status 422, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · etiqueta faltando (funil) (status 422, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · etiqueta faltando (versao_entrega) (status 422, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · etiqueta faltando (utm_campaign) (status 422, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · utm_source que não é texto (status 422, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · funil fora da lista (status 422, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · tipo proposto, ainda não ligado (interesse_pos_relatorio) (status 422, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · faixa fora da lista (status 422, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · campo que a planta não tem (cpf) (status 422, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · utm_source fora da lista (tiktok) (status 201, gravações 1, resposta {"ok":true})
OK     · utm_source fora da lista (tiktok): gravada vazia e anotada no registro do garçom
OK     · utm_source reservada fora do MVP (meta-ads) (status 201, gravações 1, resposta {"ok":true})
OK     · utm_source reservada fora do MVP (meta-ads): gravada vazia e anotada no registro do garçom
OK     · primeira_utm_campaign fora da lista (status 201, gravações 1, resposta {"ok":true})
OK     · primeira_utm_campaign fora da lista: gravada vazia e anotada no registro do garçom
OK     · método GET (status 405, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · outra origem (status 403, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · sem origem (status 403, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · pré-voo do navegador (OPTIONS) (status 204, gravações 0)
OK     · corpo que não é JSON declarado (status 415, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · JSON quebrado (status 400, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · pacote grande demais (status 413, gravações 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · banco recusa (entrega fora do catálogo, simulado) (status 422, gravações 1, resposta {"ok":false,"erro":"pacote recusado"})
OK     · banco recusa a chave (simulado) (status 502, gravações 1, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · banco fora do ar (simulado) (status 502, gravações 1, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · cofre vazio (sem SUPABASE_SERVICE_KEY) (status 503, gravações 0, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · registro do garçom sem dado pessoal (24 linhas)

O que seria gravado no caso do exemplo (fetch falso, nada saiu da máquina):
  endereço: {SUPABASE_URL}/rest/v1/rpc/registrar_fim_quiz
  método: POST · cabeçalhos: Content-Type, apikey
  pessoa: nome, telefone, email, empresa, consentimento_whatsapp, consentimento_email, consentimento_texto, consentimento_em, primeira_utm_source, primeira_utm_campaign
  evento: tipo, funil, entrega, versao_entrega, utm_source, utm_campaign, id_sessao, ocorrido_em, respostas, lead_score_nota, lead_score_faixa, lead_score_versao
  etiquetas: funil-01, quiz-01, v1, bio, funil-01 · lead score 96, faixa a

Tudo certo: 30 de 30 conferências passaram
```

O teste não cobre o esquema do banco: não há Postgres nesta máquina, e esquema.sql não foi executado (dados/banco/README.md, "O que falta para funcionar", item 7).

## Perguntas

prompts/07-fila-perguntas.md, 18.1 a 18.10.
