---
id: funil-01-planilha-sdr
versao: 2
status: pendente-aprovacao
aprovado_por:
  otavio: 2026-11-09
  junior: pendente
  euclides: pendente
depende_de:
  - id: funil-01
    versao: 3
  - id: lead-score
    versao: 3
  - id: planta-do-banco
    versao: 4
  - id: metodo
    versao: 4
  - id: ficha-de-fatos
    versao: 4
  - id: decisoes
    versao: 5
  - id: lacunas
    versao: 6
  - id: provas-e-conformidade
    versao: 4
  - id: regra-seguranca
    versao: 3
  - id: glossario
    versao: 4
  - id: quiz-01-copy
    versao: 2
desatualizado: true
---

# Planilha do SDR · funil-01

O desenho da planilha de quem liga para os leads do funil-01: as colunas, o que o SDR pode mudar e o que não pode, a lista fechada de status, a ordem da fila e o que volta para o banco. Só a descrição. Nenhum dado real e nenhuma chave aparece aqui: onde cada chave mora está em conexoes.md, e as regras, em nucleo/regras/seguranca.md.

**Status.** Pendente de aprovação. Serve ao funil-01, pendente do Júnior e do Euclides (#90), e usa o lead score, também pendente (#98). Segue a mesma aprovação do funil-01: o Otávio aprovou em 09/11/2026, e o Júnior e o Euclides aprovam junto com o item 1 da pauta (decisão do Otávio, 09/11/2026, 5.1 com 15.1; base/decisoes.md, #111). Enquanto isso, só serve como rascunho, avisando que pode mudar (nucleo/regras/versionamento.md).

**Continua desatualizado.** A versão 2 aplica as decisões de 09/11/2026, mas se apoia em `quiz-01-copy`, que continua marcado por cadeia (a pauta e a página do quiz, atualizadas nas etapas 34 e seguintes); pela regra de versionamento, só sai da marca quando nenhuma base estiver marcada (11.1; #114).

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

No lado 2, a planilha mora no Drive do Safra, como exceção registrada à regra 4 de segurança: acesso só do Otávio e de quem liga para os leads, sem outro compartilhamento. Quem liga abre só a planilha; o acesso ao sistema continua só do Otávio (decisão do Otávio, 09/11/2026, 5.4 com 16.8 e 24.1; base/decisoes.md, #114; nucleo/regras/seguranca.md, regra 4; #95). A planilha de teste do protótipo é apagada antes de qualquer lead de verdade (#102; log.md, Pendências). Quem é o SDR continua em aberto (ficha-de-fatos#quem-agenda).

---

## Colunas

Uma linha por lead da fila. "Banco" quer dizer que o valor vem do banco pela porta privada do garçom: a planilha não guarda chave do Supabase, guarda a CHAVE_PLANILHA, que só abre essa porta; lá, o garçom chama leads_para_planilha com a chave secreta do Supabase, que só executa essa função (`planta-do-banco`, "Quem grava e quem lê"; #100; 21.14). O SDR não muda esses valores. "SDR" quer dizer que o SDR preenche, e cada preenchimento volta ao banco como evento (ver "O que volta para o banco").

| Coluna | O que guarda | Quem preenche | O SDR edita? | Dado pessoal? |
|---|---|---|---|---|
| id_pessoa | O código que o banco dá à pessoa; liga a linha aos eventos | Banco | Não | Indireto: não sai do banco nem da planilha |
| nome | Como a pessoa quer ser chamada | Banco | Não | Sim |
| telefone | WhatsApp com o código do país | Banco | Não | Sim |
| email | E-mail | Banco | Não | Sim |
| empresa | Nome da empresa | Banco | Não | Sim, junto com o contato |
| consentimento_whatsapp | Se aceitou a caixa de aceite única (sim ou não); com a caixa única, sempre igual a consentimento_email (#104) | Banco | Não | Sim |
| consentimento_email | Se aceitou a caixa de aceite única (sim ou não) (#104) | Banco | Não | Sim |
| lead_score_faixa | a ou b (`lead-score`, "Faixas"); a planilha não recebe c nem eliminatorio | Banco | Não | Sim, ligada à pessoa |
| lead_score_nota | A nota de 0 a 100 | Banco | Não | Sim, ligada à pessoa |
| respostas_a_confirmar | As respostas que o SDR confirma na faixa B: valor da venda, time e histórico (`lead-score`, "Faixas"). O histórico são as respostas de leads por mês e de CRM do quiz (15.4; #114); as duas entram na função da planilha na etapa 32 | Banco | Não | Sim |
| entrou_em | Data e hora em que o banco recebeu o fim do quiz, para contar o prazo da faixa (15.3; #114; `planta-do-banco`, "O que sai do banco") | Banco | Não | Não sozinho; ligado à pessoa, sim |
| tentativas_feitas | Quantos contatos do SDR já foram registrados, contados dos eventos contato_sdr (15.3; #114) | Banco (conta) | Não | Não sozinho; ligado à pessoa, sim |
| clique_fim_quiz | O que a pessoa clicou no fim do quiz, só de leitura, para quem liga saber (18.4, com 15.16; #114; `planta-do-banco`). Entra quando o quiz, o banco e o garçom passarem a gravar o clique (etapas 32 a 34) | Banco | Não | Sim, ligado à pessoa |
| estagio | O estágio atual, da lista fechada; o SDR escolhe o próximo | Banco traz o atual; SDR muda | Sim, só com valor da lista e só para a frente | Sim, ligado à pessoa |
| estado | O estado atual, da lista fechada | Banco traz o atual; SDR muda | Sim, só com valor da lista | Sim, ligado à pessoa |
| data_volta | A data de volta ao contato | Banco traz a atual; SDR muda | Sim; obrigatória quando o estado é stand-by | Sim, ligada à pessoa |
| canal | Por onde foi o contato que o SDR acaba de fazer: telefone ou whatsapp | SDR | Sim, a cada contato | Não sozinho; ligado à pessoa, sim |
| contato_em | Data e hora desse contato | SDR | Sim, a cada contato | Não sozinho; ligado à pessoa, sim |
| reuniao_em | Data e hora da Call de Direcionamento marcada (ficha-de-fatos#nome-call-de-venda) | SDR | Sim, ao marcar | Sim, ligada à pessoa |
| produto | O que foi vendido: iasv ou essencial, lista fechada (5.3; #114) | SDR, ao marcar venda | Sim, só com valor da lista | Sim, ligado à pessoa |

**O que não tem coluna, de propósito.**

- **Texto livre** (anotações, motivo da perda): nada de texto livre na planilha inteira, porque pode trazer dado pessoal que não precisa estar ali; um motivo da perda, se for útil, entra como lista fechada nova (6.5, com 15.7; #114; `planta-do-banco`, "Outros campos do evento").
- **Origem do lead (UTM), entrega e versão:** os eventos do SDR levam esses valores pelo banco (`planta-do-banco`, "Etiquetas obrigatórias"), sem o SDR ver nem mexer.

**Quem retirou o consentimento** não entra na planilha (`planta-do-banco`, "O que sai do banco"). Quem retira depois de entrar continua na aba até o Otávio apagar a linha à mão, quando registrar a retirada; o caminho automático entra junto com a volta do status (21.10; #114). **Quem aceitou a caixa única** pode ser contatado por WhatsApp, por ligação no número do WhatsApp e por e-mail (#105); ver `funil-01-roteiros-sdr`, "Antes de qualquer contato".

---

## Lista fechada de status

Exatamente a de `funil-01`, "Status do SDR", com os nomes do método (`metodo`, "As seis regras"). Valor fora da lista não entra na planilha nem no banco. No banco, os valores vão sem acento (`planta-do-banco`, "Nomes").

**Estágio** (só avança):

| Na planilha | No banco | Quando, no funil-01 (5.2; #114; `funil-01`) |
|---|---|---|
| captado | captado | Terminou o quiz e deixou o contato |
| pré-qualificado | pre-qualificado | Passou pela porta: faixa A, ou faixa B depois da confirmação do SDR |
| agendado | agendado | Call de Direcionamento marcada |
| realizado | realizado | A Call de Direcionamento aconteceu |
| venda | venda | Comprou |

**Estado** (situação do contato):

| Na planilha | No banco | O que significa (`funil-01`; 5.2 e 5.3; #114) |
|---|---|---|
| conversando | conversando | Há conversa em curso com o lead |
| tentativa | tentativa | O SDR tenta contato e ainda não teve resposta |
| abandonado | abandonado | Sumiu depois de esgotadas as tentativas (número do funil-01 não escrito: ver `funil-01-roteiros-sdr`, "Tentativas até o abandono") |
| stand-by | stand-by | Pausado, sempre com data_volta |
| perdido | perdido | Só quem disse não: "perdido é quem falou não" (`metodo`) |
| nutrição | nutricao | Fora da fila do SDR. Na planilha, só para a faixa B que cai num eliminatório na confirmação (15.11); eliminatórios e faixa C nunca entram na planilha (5.3; #114) |

**Regras da lista** (`metodo`; `funil-01`):

- Estágio e estado são colunas separadas.
- O estágio nunca volta. A planilha recusa um estágio anterior ao atual.
- Stand-by sem data_volta não entra.
- Perdido só com o não dito pelo lead. Silêncio não é não: silêncio esgotado é abandonado.
- Ao fim do relógio, nenhum lead pode estar em conversando ou em tentativa. O relógio do funil-01 não está escrito (`funil-01`; 5.2).

**O que o método não nomeava** (5.3; #114; `funil-01`): nutrição entra na lista de estados (acima); quem faltou à Call de Direcionamento continua em agendado, com estado tentativa, até remarcar, ser abandonado ou dizer não; o produto vendido é a coluna produto. A lista fechada do estado (nutricao) e a coluna produto entram no programa da planilha e no banco nas etapas 32 a 34; até lá, a planilha do protótipo não oferece esses valores.

**Quem marca pré-qualificado na faixa A:** o lead chega à planilha como captado, e quem liga marca a passagem nas duas faixas, para toda mudança de status seguir o mesmo caminho; a meta de pré-qualificação mede o mesmo nas duas faixas (5.2, com 15.5; #114).

---

## Ordem da fila

Pelo lead score (`lead-score`, "Para que serve": ordenar a fila do SDR e proteger a agenda do Júnior; `funil-01`, "Porta de qualificação").

1. **Faixa A primeiro**, no prazo da faixa A (`lead-score`, "Faixas").
2. **Depois a faixa B**, no prazo da faixa B (`lead-score`, "Faixas").
3. **Dentro da faixa, nota maior primeiro** (15.6; #114).
4. **Empate de nota: quem entrou antes primeiro**, por entrou_em (15.6; #114).
5. **Lead em stand-by** volta à fila no dia de data_volta, na posição da faixa dele (15.6; #114).
6. **Saem da fila** os leads em abandonado, perdido, nutrição, os que chegaram a agendado (passam a ser acompanhados pela data de reuniao_em) e quem retirou o consentimento.

Eliminatórios e faixa C nunca entram na fila (`lead-score`, "Eliminatórios" e "Faixas"; `funil-01`). Do lado do critério do Júnior (conflito-16), quem clicou "Tenho interesse" receberia contato da equipe: **bloqueado para entrega até a decisão** (ver `funil-01-roteiros-sdr`, "Quem caiu nos eliminatórios"; 15.12).

A faixa e a nota nunca aparecem para o lead (`quiz-01-copy`, seção 10).

---

## O que volta para o banco

Só eventos dos tipos do SDR, com valores da lista fechada, pela chave que só grava esses eventos, com o seu papel, numa versão nova do banco (`planta-do-banco`, "Quem grava e quem lê"; 6.6; #114). A volta do status ainda não existe (log.md, Pendências). Valor fora da lista não entra. Cada evento é uma linha nova; nada é apagado nem reescrito, e uma correção é um evento novo (`planta-do-banco`, "Gaveta eventos"). A chave da volta do status não é a da porta pública do garçom nem a CHAVE_PLANILHA da leitura (`funil-01`, passo 5; `planta-do-banco`).

| O que o SDR faz na planilha | Evento que volta (`planta-do-banco`) | Campos |
|---|---|---|
| Registra um contato (preenche canal e contato_em) | contato_sdr | canal, ocorrido_em, estado |
| Muda o estágio, o estado ou a data_volta | mudanca_status | estagio, estado, data_volta, ocorrido_em |
| Marca a Call de Direcionamento (reuniao_em e estágio agendado) | reuniao_marcada | reuniao_em, estagio agendado |
| Marca o estágio realizado | reuniao_realizada | estagio realizado |
| Marca o estágio venda e o produto | venda | estagio venda, produto (5.3) |
| Marca o estado perdido | perda | estado perdido, sem motivo |

As ligações entre o que o SDR faz e cada tipo (reuniao_marcada leva agendado, reuniao_realizada leva realizado, venda e perda como tipos próprios) são as de 6.5 em `planta-do-banco`, aceitas em 09/11/2026 (#114).

Cada evento leva também id_pessoa, gravado_por = volta-do-status e as etiquetas que o banco já tem da pessoa (funil, entrega e versão do quiz respondido, origem da primeira visita), sem o SDR digitar nada (`planta-do-banco`; 6.4; #114).

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
| consentimento_email | sim | sim |
| lead_score_faixa | a | b |
| lead_score_nota | 96 (a do exemplo de conferência de `lead-score`) | 55 (fictícia) |
| respostas_a_confirmar | (respostas fictícias) | (respostas fictícias) |
| entrou_em | 2026-11-20 14:32 | 2026-11-20 15:10 |
| tentativas_feitas | 1 | 0 |
| clique_fim_quiz | quero-conversa (fictício; lista proposta) | agora-nao (fictício; lista proposta) |
| estagio | agendado | captado |
| estado | conversando | vazio |
| data_volta | vazio | vazio |
| canal | telefone | vazio |
| contato_em | 2026-11-20 15:01 | vazio |
| reuniao_em | 2026-11-25 10:00 | vazio |
| produto | vazio (sem venda) | vazio (sem venda) |

---

## Pendências que tocam a planilha

| O que falta | Quem decide | Onde |
|---|---|---|
| Destino dos contatos: Triad CRM ou banco e planilha | O Júnior e o Euclides | conflito-17; #90; 15.2 |
| Apagar a planilha de teste antes do primeiro lead de verdade | O Otávio | #102; log.md, Pendências |
| Quem é o SDR | Não registrado | ficha-de-fatos#quem-agenda |
| Critério que decide a fila | O Otávio com o Júnior e o Euclides | #98; conflito-16; conflito-01 |
| Prazo do relógio do funil-01 | Calibrado depois das primeiras safras | 5.2 |
| Número de tentativas até o abandono | O Júnior confirma o da operação dele | 5.3; ficha-de-fatos#tentativas-ate-abandonado |
| Programa da planilha com nutricao, produto, clique_fim_quiz e as duas respostas do histórico | O Otávio aprova; etapas 32 a 34 | 5.3; 15.4; 18.4 |
| Volta do status e retirada automática de quem retira o consentimento | O Otávio | 21.10; log.md, Pendências |
| Aprovação deste documento | O Júnior e o Euclides, com o item 1 da pauta (o Otávio aprovou em 09/11/2026) | 15.1; #111 |

---

## Fontes

- funis/funil-01/funil.md (v3): "Caminho do dado", "Porta de qualificação", "Status do SDR".
- base/lead-score.md (v3): "Para que serve", "Eliminatórios", "Faixas", "Exemplo de conferência".
- dados/planta/planta.md (v4): "Quem grava e quem lê", "Gaveta eventos", "O que sai do banco".
- base/metodo.md (v4), "As seis regras" e "Detalhes das regras de estado"; base/ficha-de-fatos.md (v4), quem-agenda, nome-call-de-venda; base/decisoes.md (v5), #67, #90, #95, #98, #100, #104, #105, #111, #114; base/lacunas.md (v6), conflito-16, conflito-17; base/provas-e-conformidade.md (v4), "LGPD"; GLOSSARY.md (v4), verbetes Estado e Funil-01.
- entregas/quizzes/quiz-01/copy.md (v2), seção 10; nucleo/regras/seguranca.md (v3), regra 4; conexoes.md.
- prompts/11-decisoes-de-09-11.md; prompts/11-respostas.md.
- prompts/05-fila-perguntas.md, 5.2 a 5.4 e 6.4 a 6.6; prompts/06-para-o-otavio.md; prompts/07-fila-da-noite.md, "Etapa 15".
