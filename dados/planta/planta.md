---
id: planta-do-banco
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: funil-01
    versao: 1
  - id: lead-score
    versao: 1
  - id: ficha-de-fatos
    versao: 3
  - id: decisoes
    versao: 3
  - id: metodo
    versao: 2
  - id: provas-e-conformidade
    versao: 2
  - id: regra-seguranca
    versao: 1
  - id: lacunas
    versao: 4
desatualizado: false
---

# Planta do banco

O desenho do banco de dados dos leads do funil-01: o que se guarda, em que gaveta, com que nome, quem grava e quem lê. Só a descrição. Nada aqui é implementação, nenhum dado é real e nenhuma chave aparece neste documento: onde cada chave mora está em conexoes.md, e as regras, em nucleo/regras/seguranca.md.

**Status.** Rascunho, pendente do Otávio (prompts/05-fila-perguntas.md, 6.1). A planta serve ao funil-01, que está pendente do Júnior e do Euclides (#90), e usa o lead score, também pendente (#98). Desde a versão 4 de `lacunas`, `funil-01`, `lead-score`, `metodo` e `provas-e-conformidade` estão marcados como desatualizados só por causa da versão de `lacunas` no depende_de deles (6.9); o conteúdo que esta planta usa não mudou.

**Como ler.** Fatos pelo id do campo em `ficha-de-fatos`; decisões por #n; pendências pelo id de `lacunas`. Tudo marcado **proposta** é escolha provisória desta etapa e está em prompts/05-fila-perguntas.md (6.1 a 6.9). Os exemplos são fictícios de propósito: nomes como "Maria Exemplo", telefones só com zeros, e-mails no domínio exemplo.com.

**Nomes.** Os nomes de gaveta e de campo são em minúsculas, sem acento, com sublinhado no lugar do espaço. Os valores das listas fechadas seguem os nomes do funil-01, escritos sem acento no banco (por exemplo, pre-qualificado).

---

## As quatro gavetas

| Gaveta | O que guarda | Tem dado pessoal? | No MVP? |
|---|---|---|---|
| pessoas | Uma linha por lead: contato, consentimento e origem da primeira visita | Sim | Sim |
| eventos | Uma linha por acontecimento: visita, quiz, lead score, contato do SDR, mudança de status, reunião, venda, perda | Sim, nas respostas do quiz e na ligação com a pessoa | Sim |
| entregas | O catálogo das entregas publicadas, com id e versão, espelho do repositório | Não | Sim |
| investimento | Quanto se gastou por canal e campanha | Não | **Não.** Desenhada, fora do MVP enquanto a Meta estiver fora (conexoes.md) |

O banco é o Supabase, região São Paulo (conexoes.md). No MVP, só o Otávio acessa o sistema (#95).

---

## Quem grava e quem lê

Cada uso tem a sua chave, com a menor permissão que resolve (nucleo/regras/seguranca.md, regra 2). Nenhuma chave é criada antes de o detector de chaves estar instalado (nucleo/regras/seguranca.md, "Detector de chaves"); cada uma entra em conexoes.md quando for criada, com onde mora e como revogar.

| Quem | Grava | Lê | Chave |
|---|---|---|---|
| **Garçom** (função na Cloudflare entre a página e o banco; funil-01, "Caminho do dado") | pessoas e eventos vindos da landing e do quiz | Só a gaveta entregas, para conferir a etiqueta (proposta, 6.6). Não lê pessoas nem eventos | A do garçom: grava pessoas e eventos e lê só o catálogo de entregas (proposta, 6.6) |
| **Planilha do SDR · leitura** | Nada | Só os leads da fila (faixas A e B de `lead-score`) e só os campos da lista "O que vai para a planilha", abaixo | Outra chave, só de leitura da fila (proposta, 6.6) |
| **Planilha do SDR · volta do status** | Só eventos dos tipos do SDR (contato_sdr, mudanca_status, reuniao_marcada, reuniao_realizada, venda, perda), com valores da lista fechada; valor fora da lista não entra | Nada | Outra chave, só de gravação desses eventos (proposta, 6.6) |
| **Painel** | Nada | Só números agregados, sem identificar ninguém (nucleo/regras/seguranca.md, regra 4) | A do painel, que só lê (nucleo/regras/seguranca.md, regra 2) |
| **Contador de escassez** | Nada | Só a contagem de análises gratuitas usadas (ver "Contagem das análises gratuitas") | Outra chave, que só lê essa contagem (proposta, 6.6) |
| **Otávio** | Tudo, pelo painel do Supabase, incluindo o catálogo de entregas | Tudo | A dele, no Supabase (#95) |

Nenhuma chave vai para a página nem para o navegador (funil-01, "Caminho do dado"). A chave da planilha não é a do garçom (funil-01, passo 5). Onde a planilha mora e como o SDR a acessa seguem em aberto (prompts/05-fila-perguntas.md, 5.4).

**Dado pessoal.** Só no banco e na planilha do SDR; nunca no repositório nem no Google Drive (nucleo/regras/seguranca.md, regra 4). Aprendizados e painéis no repositório só com números agregados.

---

## Gaveta pessoas

Uma linha por lead. O lead nasce quando o quiz termina e envia o contato com o consentimento (funil-01, "Caminho do lead", passo 2). Quem já está no banco e refaz o quiz não vira outra pessoa: o próprio banco reconhece o telefone ou o e-mail já gravado e liga os eventos novos à mesma linha, sem o garçom precisar ler nada (proposta, 6.3).

| Campo | O que guarda | Exemplo fictício | Dado pessoal? |
|---|---|---|---|
| id_pessoa | Código interno que o banco dá à pessoa; é por ele que os eventos se ligam a ela | pessoa-exemplo-0001 | Indireto: sozinho não diz quem é, mas liga a pessoa aos dados dela. Não sai do banco nem da planilha |
| nome | Como a pessoa quer ser chamada | Maria Exemplo | Sim |
| telefone | WhatsApp com o código do país | +55 00 00000-0000 | Sim |
| email | E-mail | maria@example.com | Sim |
| empresa | Nome da empresa (o quiz atual pede) | Empresa Exemplo Ltda. | Sim, junto com o contato |
| consentimento_whatsapp | Se aceitou contato por WhatsApp (sim ou não) | sim | Sim |
| consentimento_email | Se aceitou contato por e-mail (sim ou não) | sim | Sim |
| consentimento_texto | O texto exato que a pessoa aceitou, com a finalidade dita (`provas-e-conformidade`, "LGPD") | "Aceito receber contato por WhatsApp e e-mail sobre o meu diagnóstico." (fictício; o texto real depende do conflito-09) | Sim, ligado à pessoa |
| consentimento_em | Data e hora do aceite | 2026-11-20 14:32 | Sim, ligado à pessoa |
| consentimento_retirado_em | Data e hora em que a pessoa retirou o consentimento; vazio enquanto não retirar | vazio | Sim, ligado à pessoa |
| primeira_utm_source | Origem da primeira visita, da tabela de origens do funil-01; vazio se a etiqueta veio fora da lista (prompts/05-fila-perguntas.md, 5.5) | stories | Não sozinho; ligado à pessoa, sim |
| primeira_utm_campaign | Campanha da primeira visita | funil-01 | Não sozinho; ligado à pessoa, sim |
| primeira_visita_em | Data e hora da primeira visita | 2026-11-20 14:05 | Não sozinho; ligado à pessoa, sim |
| criado_em | Data e hora em que a linha foi criada | 2026-11-20 14:32 | Não sozinho; ligado à pessoa, sim |

Os campos de primeira visita nunca são reescritos: se a pessoa volta por outro link, a origem nova fica só nos eventos.

O estágio e o estado atuais do lead não moram nesta gaveta: saem do último evento de status dele (ver "Gaveta eventos"). Assim, só existe um lugar com a verdade.

---

## Gaveta eventos

Uma linha por acontecimento, que nunca é apagada nem reescrita; uma correção é um evento novo.

### Tipos de evento

Lista fechada. Tipo fora da lista não entra.

| tipo | Quando acontece | Quem grava |
|---|---|---|
| visita | O lead abre a landing-page-01 por um link etiquetado | Garçom |
| inicio_quiz | Começa o quiz-01 | Garçom |
| fim_quiz | Termina o quiz-01 e envia o contato: leva as respostas, a nota e a faixa do lead score | Garçom |
| contato_sdr | O SDR liga ou manda mensagem | Volta do status |
| mudanca_status | O estágio ou o estado do lead muda (funil-01, "Status do SDR") | Volta do status |
| reuniao_marcada | Reunião com o Júnior marcada | Volta do status |
| reuniao_realizada | A reunião aconteceu | Volta do status |
| venda | Comprou; também leva o estágio venda | Volta do status |
| perda | Disse não; também leva o estado perdido ("perdido é quem falou não", `metodo`) | Volta do status |

A venda e a perda são tipos próprios, que também mudam o estágio ou o estado, para que o painel conte as duas sem procurar dentro das mudanças de status (proposta, 6.5). Também é proposta: reuniao_marcada leva o estágio agendado, e reuniao_realizada, o estágio realizado.

A visita e o início do quiz acontecem antes de a pessoa existir no banco. Ficam ligados só a um código de sessão, que a página cria na visita e esquece quando a aba fecha, sem guardar nada no navegador; no fim do quiz, o banco liga esses eventos à pessoa. Visita sem fim de quiz fica sem pessoa (proposta, 6.2).

### Etiquetas obrigatórias em todo evento

Todo evento leva as cinco etiquetas. Evento sem alguma delas não entra.

| Campo | O que guarda | Exemplo fictício | Dado pessoal? |
|---|---|---|---|
| funil | O id do funil | funil-01 | Não |
| entrega | O id da entrega em que o evento aconteceu, do catálogo da gaveta entregas | quiz-01 | Não |
| versao_entrega | A versão dessa entrega, do mesmo catálogo | 1 | Não |
| utm_source | A origem, da tabela de origens do funil-01 (stories, bio, reels, email, whatsapp; meta-ads reservada, fora do MVP); vazio se a etiqueta veio fora da lista (5.5) | bio | Não sozinho; ligado à pessoa, sim |
| utm_campaign | A campanha, da mesma tabela | funil-01 | Não sozinho; ligado à pessoa, sim |

O garçom confere se o par entrega e versão existe no catálogo; se não existe, o evento não entra (proposta, 6.6).

Os eventos que não acontecem numa página (os do SDR, da reunião e da venda) levam o funil, a entrega e a versão do quiz que a pessoa respondeu e a origem da primeira visita dela. Assim, toda venda pode ser lida de volta até a peça e o link que a trouxeram (proposta, 6.4).

### Outros campos do evento

| Campo | O que guarda | Em que tipos | Exemplo fictício | Dado pessoal? |
|---|---|---|---|---|
| id_evento | Código interno do evento | Todos | evento-exemplo-0001 | Não |
| tipo | Um valor da lista de tipos | Todos | fim_quiz | Não |
| id_pessoa | A pessoa do evento; vazio na visita e no início do quiz até o fim do quiz | Todos | pessoa-exemplo-0001 | Indireto, como na gaveta pessoas |
| id_sessao | O código da sessão da visita (6.2) | visita, inicio_quiz, fim_quiz | sessao-exemplo-0001 | Indireto |
| ocorrido_em | Data e hora em que aconteceu | Todos | 2026-11-20 14:32 | Não sozinho; ligado à pessoa, sim |
| gravado_em | Data e hora em que entrou no banco | Todos | 2026-11-20 14:32 | Não sozinho; ligado à pessoa, sim |
| gravado_por | Quem gravou: garcom ou volta-do-status | Todos | garcom | Não |
| respostas | As respostas do quiz, pergunta por pergunta | fim_quiz | Faturamento: "R$ 150 mil a R$ 500 mil"; Cargo: "Dono(a) ou sócio(a)" (respostas fictícias, com as opções de `lead-score`) | Sim |
| lead_score_nota | A nota do lead score, na escala de `lead-score` | fim_quiz | 72 | Sim, ligada à pessoa |
| lead_score_faixa | A faixa: a, b, c ou eliminatorio (`lead-score`, "Faixas" e "Eliminatórios") | fim_quiz | a | Sim, ligada à pessoa |
| lead_score_versao | A versão de `lead-score` usada no cálculo, para conferir as faixas depois (outros-22) | fim_quiz | 1 | Não |
| estagio | Um estágio da lista fechada do funil-01: captado, pre-qualificado, agendado, realizado, venda | mudanca_status, reuniao_marcada, reuniao_realizada, venda | agendado | Sim, ligado à pessoa |
| estado | Um estado da lista fechada do funil-01: conversando, tentativa, abandonado, stand-by, perdido. Nutrição fica reservada até a decisão de 5.3 | mudanca_status, perda, contato_sdr | tentativa | Sim, ligado à pessoa |
| data_volta | A data de volta ao contato; obrigatória no stand-by (funil-01, "Status do SDR") | mudanca_status | 2026-12-01 | Sim, ligado à pessoa |
| canal | Por onde o SDR falou: telefone ou whatsapp | contato_sdr | whatsapp | Não sozinho; ligado à pessoa, sim |
| reuniao_em | Data e hora da reunião com o Júnior | reuniao_marcada | 2026-11-25 10:00 | Sim, ligado à pessoa |
| produto | O que foi vendido: iasv ou essencial. **Proposta** de 5.3, ainda fora da lista fechada; só a IASV conta para as vagas (ficha-de-fatos#vendas-que-contam) | venda | iasv | Sim, ligado à pessoa |

O evento perda não guarda motivo: um texto livre do SDR pode trazer dado pessoal que não precisa estar ali (proposta, 6.5).

---

## Gaveta entregas

O catálogo das entregas publicadas, espelho do repositório: cada linha corresponde a uma entrega em entregas/ com o mesmo id e a mesma versão do cabeçalho dela. O Otávio grava uma linha nova a cada versão publicada; o garçom só lê (proposta, 6.6). Uma versão nunca é apagada do catálogo, para que os eventos antigos continuem apontando para ela.

| Campo | O que guarda | Exemplo fictício | Dado pessoal? |
|---|---|---|---|
| id_entrega | O id fixo da entrega, igual ao do cabeçalho no repositório | landing-page-01 | Não |
| versao | A versão publicada, igual à do cabeçalho | 1 | Não |
| tipo_entrega | landing, quiz ou email | landing | Não |
| funil | O funil a que a entrega serve | funil-01 | Não |
| caminho_no_repositorio | Onde a entrega mora no repositório | entregas/landings/landing-page-01 | Não |
| publicada_em | Data e hora em que essa versão foi ao ar | 2026-11-18 09:00 | Não |
| retirada_em | Data e hora em que saiu do ar; vazio enquanto está no ar | vazio | Não |

A planilha do SDR não é uma entrega e não entra no catálogo (6.4).

---

## Gaveta investimento

**Desenhada, fora do MVP enquanto a Meta estiver fora** (conexoes.md; funil-01, "Origens e links", linha meta-ads). Nenhuma chave é criada para ela até lá.

| Campo | O que guarda | Exemplo fictício | Dado pessoal? |
|---|---|---|---|
| dia | O dia do gasto | 2026-12-01 | Não |
| utm_source | O canal pago, da tabela de origens | meta-ads | Não |
| utm_campaign | A campanha | funil-01 | Não |
| valor_investido | Quanto se gastou no dia, em reais | 0,00 (fictício) | Não |
| impressoes | Quantas vezes o anúncio apareceu | 0 (fictício) | Não |
| cliques | Quantos cliques | 0 (fictício) | Não |
| importado_em | Data e hora em que o número entrou no banco | 2026-12-02 08:00 | Não |

Se a Meta entrar, a tabela de origens e esta gaveta talvez precisem de uma etiqueta a mais para separar os anúncios; fica para quando a Meta sair da reserva (6.4).

---

## Contagem das análises gratuitas

O número de análises gratuitas está em ficha-de-fatos#analises-gratuitas, e a regra do contador, em ficha-de-fatos#barra-de-resgates (#93): a contagem é real e sai do banco. Esta planta não escreve nenhum dos dois números.

- **De onde sai.** Da gaveta eventos: é uma conta feita sobre os eventos fim_quiz, porque o diagnóstico do quiz é a própria Análise (#92; funil-01, "Caminho do lead", passo 2). Não há campo guardado com a contagem; ela é refeita a cada leitura, a partir dos eventos.
- **O que conta como usada.** Não está decidido (prompts/05-fila-perguntas.md, 5.7). A recomendação de 5.7 conta uma por pessoa que terminou o quiz e recebeu o diagnóstico, inclusive eliminatórios e faixa C, sem contar de novo quem refaz o quiz; a planta permite essa conta porque a pessoa repetida é reconhecida (6.3). Como a contagem é feita sobre os eventos, a regra pode ser decidida depois sem perder nada: a conta é refeita com os eventos já gravados (6.7).
- **Quem lê.** Só o contador, com a chave que lê só esse número, e o painel. Nenhum dos dois vê quem foram as pessoas.
- **Até a decisão de 5.7, o contador não vai ao ar** (proposta, 6.7), e de todo modo só aparece acima do limite de ficha-de-fatos#barra-de-resgates.
- **Depois da última gratuita.** A cobrança da Análise ainda não está desenhada (prompts/05-fila-perguntas.md, 5.9); quando for, a planta ganha o que for preciso para saber se a Análise de cada pessoa foi gratuita ou paga.

---

## O que sai do banco

**Para a planilha do SDR** (proposta, 6.6): só os leads das faixas A e B, com id_pessoa, nome, telefone, email, empresa, consentimento_whatsapp, consentimento_email, lead_score_nota, lead_score_faixa, as respostas que o SDR precisa confirmar na faixa B (`lead-score`, "Faixas": valor da venda, time, histórico), o estágio e o estado atuais e a data_volta. Lead que retirou o consentimento não vai para a planilha.

**Para o painel:** só números agregados, por safra, por etapa, por faixa, por origem e por entrega e versão. Por exemplo: quantos captados, pré-qualificados, agendados, realizados e vendas no mês; quantos vieram de cada origem; quantos de cada versão da landing terminaram o quiz. Nenhum nome, telefone, e-mail, resposta nem id_pessoa. As metas por etapa que o painel compara estão em ficha-de-fatos#metas-por-etapa (funil-01, "Metas por etapa").

**Para aprendizados/:** só números agregados, com prova e status, e nada concluído abaixo da amostra mínima (aprendizados/README.md; CLAUDE.md).

**Para o contador:** só a contagem de análises gratuitas usadas.

---

## Prazo de guarda

**Não está decidido** (outros-23, em `lacunas`). Falta decidir por quanto tempo o banco guarda os dados de cada lead, o que acontece no fim do prazo e como se atende quem pede para apagar os dados ou retira o consentimento. Até a decisão, nada é apagado automaticamente, e o banco não guarda nada além dos campos desta planta (6.8).

---

## Pendências que tocam a planta

| O que falta | Quem decide | Onde |
|---|---|---|
| Aprovação da planta | O Otávio | 6.1 |
| Prazo de guarda e pedido de apagamento | Não registrado; a fonte pede revisão de advogado (CTX §8; lacuna-10) | outros-23; 6.8 |
| O que conta como análise gratuita usada | O Otávio | 5.7; 6.7 |
| Texto de consentimento do quiz-01 | O Otávio com o Júnior | conflito-09 |
| Onde mora a planilha do SDR e como o SDR a acessa | O Otávio | 5.4 |
| Nutrição, não compareceu e produto vendido | O Otávio | 5.3 |
| Funil-01 e lead score | O Júnior e o Euclides | #90, #98 |
| Detector de chaves antes da primeira chave | O Otávio | nucleo/regras/seguranca.md; log.md, Pendências |
| Escolhas provisórias desta etapa | O Otávio | prompts/05-fila-perguntas.md, 6.1 a 6.9 |

---

## Fontes

- funis/funil-01/funil.md (v1): caminho do dado, status do SDR, origens e links, contador de escassez.
- base/lead-score.md (v1); base/ficha-de-fatos.md (v3): analises-gratuitas, barra-de-resgates, vendas-que-contam, metas-por-etapa; base/decisoes.md (v3): #90, #92, #93, #95, #98; base/metodo.md (v2); base/provas-e-conformidade.md (v2), "LGPD"; base/lacunas.md (v4).
- nucleo/regras/seguranca.md (v1); conexoes.md; dados/planta/README.md; dados/paineis/README.md; aprendizados/README.md.
- Campos de contato do quiz atual: fontes/acervo-2026-11-08/safra-acervo/05-paginas/quiz-diagnostico-de-vendas/index.html (nome, e-mail, telefone, empresa).
- prompts/05-fila-de-trabalho.md, "Etapa 6 · Planta do banco"; prompts/05-fila-perguntas.md, 5.3 a 5.9.
