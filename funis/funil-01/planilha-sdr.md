---
id: funil-01-planilha-sdr
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
  junior: pendente
  euclides: pendente
depende_de:
  - id: funil-01
    versao: 2
  - id: lead-score
    versao: 2
  - id: planta-do-banco
    versao: 2
  - id: metodo
    versao: 3
  - id: ficha-de-fatos
    versao: 3
  - id: decisoes
    versao: 3
  - id: lacunas
    versao: 5
  - id: provas-e-conformidade
    versao: 3
  - id: regra-seguranca
    versao: 1
  - id: glossario
    versao: 3
  - id: quiz-01-copy
    versao: 1
desatualizado: true
---

# Planilha do SDR · funil-01

O desenho da planilha de quem liga para os leads do funil-01: as colunas, o que o SDR pode mudar e o que não pode, a lista fechada de status, a ordem da fila e o que volta para o banco. Só a descrição. Nenhum dado real, nenhuma ferramenta escolhida e nenhuma chave aparece aqui: onde cada chave mora está em conexoes.md, e as regras, em nucleo/regras/seguranca.md.

**Status.** Rascunho. Serve ao funil-01, pendente do Júnior e do Euclides (#90), e usa o lead score, também pendente (#98). Por isso pede a aprovação dos três (prompts/07-fila-perguntas.md, 15.1). Enquanto isso, é só rascunho e pode mudar (nucleo/regras/versionamento.md).

**Desatualizado desde o nascimento.** Apoia-se em `funil-01`, `lead-score`, `planta-do-banco`, `metodo`, `provas-e-conformidade` e `glossario`, todos marcados; segue a regra provisória 11.1 (prompts/07-fila-perguntas.md, 11.1 e 15.15).

**Destino dos contatos em conflito · bloqueado para entrega até a decisão** (conflito-17). Ver "Onde a planilha mora", abaixo.

**Como ler.** Fatos pelo id do campo em `ficha-de-fatos`; decisões por #n; pendências pelo id de `lacunas`. Nomes de coluna como os campos de `planta-do-banco`. Tudo marcado **proposta** é escolha provisória desta etapa e está em prompts/07-fila-perguntas.md (15.1 a 15.16). Os exemplos são fictícios de propósito, no padrão da planta: "Maria Exemplo", telefone só com zeros, e-mail no domínio example.com.

---

## Onde a planilha mora

**Em conflito · bloqueado para entrega até a decisão** (conflito-17). Os dois lados, sem escolha:

| Lado | O que diz | Fonte |
|---|---|---|
| 1 · Triad CRM | Os contatos do quiz vão para uma conta nova do Triad CRM, só da agência, com a origem marcada; automação no CRM depois | CLAUDE.md do quiz (fontes/quiz-01-repositorio-2026-11-08/); conflito-17 |
| 2 · Banco e planilha (#90) | O quiz grava no banco pelo garçom; a planilha recebe as faixas A e B e devolve o status ao banco | #90 (pendente do Júnior e do Euclides); `funil-01`, "Caminho do dado"; `planta-do-banco` |

Este documento descreve o lado 2, porque é o que a base tem desenhado. Se o lado 1 vencer, a lista fechada de status e as colunas continuam valendo como especificação do que o CRM precisa guardar, e a seção "O que volta para o banco" muda inteira (15.2).

Mesmo no lado 2, onde a planilha mora e como o SDR a acessa estão em aberto (prompts/05-fila-perguntas.md, 5.4; prompts/06-para-o-otavio.md, 5.4): dado pessoal não entra no Google Drive (nucleo/regras/seguranca.md, regra 4), e no MVP só o Otávio acessa o sistema (#95). Quem é o SDR também está em aberto (ficha-de-fatos#quem-agenda).

---

## Colunas

Uma linha por lead da fila. "Banco" quer dizer que o valor vem do banco pela chave só de leitura da planilha (`planta-do-banco`, "Quem grava e quem lê"); o SDR não muda esses valores. "SDR" quer dizer que o SDR preenche, e cada preenchimento volta ao banco como evento (ver "O que volta para o banco").

| Coluna | O que guarda | Quem preenche | O SDR edita? | Dado pessoal? |
|---|---|---|---|---|
| id_pessoa | O código que o banco dá à pessoa; liga a linha aos eventos | Banco | Não | Indireto: não sai do banco nem da planilha |
| nome | Como a pessoa quer ser chamada | Banco | Não | Sim |
| telefone | WhatsApp com o código do país | Banco | Não | Sim |
| email | E-mail | Banco | Não | Sim |
| empresa | Nome da empresa | Banco | Não | Sim, junto com o contato |
| consentimento_whatsapp | Se aceitou contato por WhatsApp (sim ou não) | Banco | Não | Sim |
| consentimento_email | Se aceitou contato por e-mail (sim ou não) | Banco | Não | Sim |
| lead_score_faixa | a ou b (`lead-score`, "Faixas"); a planilha não recebe c nem eliminatorio | Banco | Não | Sim, ligada à pessoa |
| lead_score_nota | A nota de 0 a 100 | Banco | Não | Sim, ligada à pessoa |
| respostas_a_confirmar | As respostas que o SDR confirma na faixa B: valor da venda, time, histórico (`lead-score`, "Faixas"). Quais perguntas do quiz são o "histórico" não está escrito (proposta, 15.4) | Banco | Não | Sim |
| entrou_em | Data e hora do fim do quiz, para contar o prazo da faixa | Banco | Não | Não sozinho; ligado à pessoa, sim. **Proposta**, fora da lista de `planta-do-banco` (15.3) |
| tentativas_feitas | Quantos contatos do SDR já foram registrados, contados dos eventos contato_sdr | Banco (conta) | Não | Não sozinho; ligado à pessoa, sim. **Proposta**, fora da lista de `planta-do-banco` (15.3) |
| estagio | O estágio atual, da lista fechada; o SDR escolhe o próximo | Banco traz o atual; SDR muda | Sim, só com valor da lista e só para a frente | Sim, ligado à pessoa |
| estado | O estado atual, da lista fechada | Banco traz o atual; SDR muda | Sim, só com valor da lista | Sim, ligado à pessoa |
| data_volta | A data de volta ao contato | Banco traz a atual; SDR muda | Sim; obrigatória quando o estado é stand-by | Sim, ligada à pessoa |
| canal | Por onde foi o contato que o SDR acaba de fazer: telefone ou whatsapp | SDR | Sim, a cada contato | Não sozinho; ligado à pessoa, sim |
| contato_em | Data e hora desse contato | SDR | Sim, a cada contato | Não sozinho; ligado à pessoa, sim |
| reuniao_em | Data e hora da conversa marcada com o Júnior | SDR | Sim, ao marcar | Sim, ligada à pessoa |
| produto | O que foi vendido: iasv ou essencial. **Proposta** de 5.3, fora da lista fechada: a coluna existe, mas fica vazia e não volta ao banco até a decisão | Ninguém, até a decisão | Não | Sim, ligado à pessoa |

**O que não tem coluna, de propósito.**

- **Texto livre** (anotações, motivo da perda): pode trazer dado pessoal que não precisa estar ali, como a planta já decidiu para o motivo da perda (`planta-do-banco`, "Outros campos do evento"; proposta, 15.7).
- **Origem do lead (UTM), entrega e versão:** os eventos do SDR levam esses valores pelo banco (`planta-do-banco`, "Etiquetas obrigatórias"), sem o SDR ver nem mexer.
- **O que o lead clicou no fim do quiz** ("Quero marcar uma conversa", "Tenho interesse", "Agora não"): o quiz não grava esse clique (prompts/07-fila-perguntas.md, 14.15). Ver 15.16.

**Quem retirou o consentimento** sai da planilha (`planta-do-banco`, "O que sai do banco"). **Canal sem consentimento** não é usado: ver `funil-01-roteiros-sdr`, "Antes de qualquer contato" (15.8).

---

## Lista fechada de status

Exatamente a de `funil-01`, "Status do SDR", com os nomes do método (`metodo`, "As seis regras"). Valor fora da lista não entra na planilha nem no banco. No banco, os valores vão sem acento (`planta-do-banco`, "Nomes").

**Estágio** (só avança):

| Na planilha | No banco | Quando, no funil-01 (proposta de 5.2, em `funil-01`) |
|---|---|---|
| captado | captado | Terminou o quiz e deixou o contato |
| pré-qualificado | pre-qualificado | Passou pela porta: faixa A, ou faixa B depois da confirmação do SDR |
| agendado | agendado | Conversa com o Júnior marcada |
| realizado | realizado | A conversa aconteceu |
| venda | venda | Comprou |

**Estado** (situação do contato):

| Na planilha | No banco | O que significa (`funil-01`; definições de conversando, tentativa e stand-by são proposta de 5.2) |
|---|---|---|
| conversando | conversando | Há conversa em curso com o lead |
| tentativa | tentativa | O SDR tenta contato e ainda não teve resposta |
| abandonado | abandonado | Sumiu depois de esgotadas as tentativas (número do funil-01 não escrito: ver `funil-01-roteiros-sdr`, "Tentativas até o abandono") |
| stand-by | stand-by | Pausado, sempre com data_volta |
| perdido | perdido | Só quem disse não: "perdido é quem falou não" (`metodo`) |

**Regras da lista** (`metodo`; `funil-01`):

- Estágio e estado são colunas separadas.
- O estágio nunca volta. A planilha recusa um estágio anterior ao atual.
- Stand-by sem data_volta não entra.
- Perdido só com o não dito pelo lead. Silêncio não é não: silêncio esgotado é abandonado.
- Ao fim do relógio, nenhum lead pode estar em conversando ou em tentativa. O relógio do funil-01 não está escrito (`funil-01`; 5.2).

**Fora da lista, até a decisão** (`funil-01`, "Passos que faltam na lista", proposta de 5.3; prompts/06-para-o-otavio.md, 5.3): nutrição, não compareceu e o produto vendido. A planilha não oferece esses valores. Quem faltou à conversa fica como `funil-01` propõe (agendado, com estado tentativa), que já cabe na lista.

**Quem marca pré-qualificado na faixa A** não está escrito: o lead chega à planilha como captado, e até a decisão o SDR marca a passagem nas duas faixas, para toda mudança de status seguir o mesmo caminho (proposta, 15.5).

---

## Ordem da fila

Pelo lead score (`lead-score`, "Para que serve": ordenar a fila do SDR e proteger a agenda do Júnior; `funil-01`, "Porta de qualificação").

1. **Faixa A primeiro**, no prazo da faixa A (`lead-score`, "Faixas").
2. **Depois a faixa B**, no prazo da faixa B (`lead-score`, "Faixas").
3. **Dentro da faixa, nota maior primeiro** (proposta, 15.6).
4. **Empate de nota: quem entrou antes primeiro**, por entrou_em (proposta, 15.6).
5. **Lead em stand-by** volta à fila no dia de data_volta, na posição da faixa dele (proposta, 15.6).
6. **Saem da fila** os leads em abandonado, perdido, os que chegaram a agendado (passam a ser acompanhados pela data de reuniao_em) e quem retirou o consentimento.

Eliminatórios e faixa C nunca entram na fila (`lead-score`, "Eliminatórios" e "Faixas"; `funil-01`). Do lado do critério do Júnior (conflito-16), quem clicou "Tenho interesse" receberia contato da equipe: **bloqueado para entrega até a decisão** (ver `funil-01-roteiros-sdr`, "Quem caiu nos eliminatórios"; 15.12).

A faixa e a nota nunca aparecem para o lead (`quiz-01-copy`, seção 10).

---

## O que volta para o banco

Só eventos dos tipos do SDR, com valores da lista fechada, pela chave que só grava esses eventos (`planta-do-banco`, "Quem grava e quem lê"; proposta 6.6). Valor fora da lista não entra. Cada evento é uma linha nova; nada é apagado nem reescrito, e uma correção é um evento novo (`planta-do-banco`, "Gaveta eventos"). A chave da planilha não é a do garçom (`funil-01`, passo 5).

| O que o SDR faz na planilha | Evento que volta (`planta-do-banco`) | Campos |
|---|---|---|
| Registra um contato (preenche canal e contato_em) | contato_sdr | canal, ocorrido_em, estado |
| Muda o estágio, o estado ou a data_volta | mudanca_status | estagio, estado, data_volta, ocorrido_em |
| Marca a conversa com o Júnior (reuniao_em e estágio agendado) | reuniao_marcada | reuniao_em, estagio agendado |
| Marca o estágio realizado | reuniao_realizada | estagio realizado |
| Marca o estágio venda | venda | estagio venda; produto só depois da decisão de 5.3 |
| Marca o estado perdido | perda | estado perdido, sem motivo |

As ligações entre o que o SDR faz e cada tipo (reuniao_marcada leva agendado, reuniao_realizada leva realizado, venda e perda como tipos próprios) são as propostas de 6.5 em `planta-do-banco`.

Cada evento leva também id_pessoa, gravado_por = volta-do-status e as etiquetas que o banco já tem da pessoa (funil, entrega e versão do quiz respondido, origem da primeira visita), sem o SDR digitar nada (`planta-do-banco`, proposta 6.4).

**Não volta para o banco:** nada das colunas que vêm do banco (o SDR não as edita), nenhum texto livre, e nada fora da lista fechada.

---

## Exemplo fictício

**Fictício.** Duas linhas inventadas, só para mostrar a forma. Nenhuma pessoa, empresa, telefone ou e-mail real.

| Coluna | Linha 1 (fictícia) | Linha 2 (fictícia) |
|---|---|---|
| id_pessoa | pessoa-exemplo-0001 | pessoa-exemplo-0002 |
| nome | Maria Exemplo | João Exemplo |
| telefone | +55 00 00000-0000 | +55 00 00000-0000 |
| email | maria@example.com | joao@example.com |
| empresa | Empresa Exemplo Ltda. | Outra Exemplo Ltda. |
| consentimento_whatsapp | sim | sim |
| consentimento_email | sim | não |
| lead_score_faixa | a | b |
| lead_score_nota | 96 (a do exemplo de conferência de `lead-score`) | 55 (fictícia) |
| respostas_a_confirmar | (respostas fictícias) | (respostas fictícias) |
| entrou_em | 2026-11-20 14:32 | 2026-11-20 15:10 |
| tentativas_feitas | 1 | 0 |
| estagio | agendado | captado |
| estado | conversando | vazio |
| data_volta | vazio | vazio |
| canal | telefone | vazio |
| contato_em | 2026-11-20 15:01 | vazio |
| reuniao_em | 2026-11-25 10:00 | vazio |
| produto | vazio (5.3) | vazio (5.3) |

---

## Pendências que tocam a planilha

| O que falta | Quem decide | Onde |
|---|---|---|
| Destino dos contatos: Triad CRM ou banco e planilha | O Júnior e o Euclides | conflito-17; #90; 15.2 |
| Onde a planilha mora e como o SDR a acessa | O Otávio | 5.4; 15.2 |
| Quem é o SDR | Não registrado | ficha-de-fatos#quem-agenda |
| Critério que decide a fila | O Otávio com o Júnior e o Euclides | #98; conflito-16; conflito-01 |
| Nutrição, não compareceu e produto vendido | O Otávio | 5.3 |
| Relógio do funil-01 e o que é cada estágio | O Otávio | 5.2 |
| Colunas a mais, ordem dentro da faixa, quem marca a faixa A, sem texto livre | O Otávio | 15.3 a 15.7 |
| Aprovação deste documento | O Otávio, o Júnior e o Euclides | 15.1 |

---

## Fontes

- funis/funil-01/funil.md (v2): "Caminho do dado", "Porta de qualificação", "Status do SDR".
- base/lead-score.md (v2): "Para que serve", "Eliminatórios", "Faixas", "Exemplo de conferência".
- dados/planta/planta.md (v2): "Quem grava e quem lê", "Gaveta eventos", "O que sai do banco".
- base/metodo.md (v3), "As seis regras" e "Detalhes das regras de estado"; base/ficha-de-fatos.md (v3), quem-agenda; base/decisoes.md (v3), #67, #90, #95, #98; base/lacunas.md (v5), conflito-16, conflito-17; base/provas-e-conformidade.md (v3), "LGPD"; GLOSSARY.md (v3), verbetes Estado e Funil-01.
- entregas/quizzes/quiz-01/copy.md (v1), seção 10; nucleo/regras/seguranca.md (v1); conexoes.md.
- prompts/05-fila-perguntas.md, 5.2 a 5.4 e 6.4 a 6.6; prompts/06-para-o-otavio.md; prompts/07-fila-da-noite.md, "Etapa 15".
