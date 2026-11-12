---
id: planta-do-banco
versao: 4
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: funil-01
    versao: 3
  - id: lead-score
    versao: 3
  - id: ficha-de-fatos
    versao: 4
  - id: decisoes
    versao: 5
  - id: metodo
    versao: 4
  - id: provas-e-conformidade
    versao: 4
  - id: regra-seguranca
    versao: 3
  - id: lacunas
    versao: 6
desatualizado: true
---

# Planta do banco

O desenho do banco de dados dos leads do funil-01: o que se guarda, em que gaveta, com que nome, quem grava e quem lê. Só a descrição. Nada aqui é implementação, nenhum dado é real e nenhuma chave aparece neste documento: onde cada chave mora está em conexoes.md, e as regras, em nucleo/regras/seguranca.md.

**Status.** Rascunho, pendente do Otávio. A planta, o banco e o garçom são só dele para aprovar, depois da atualização em cascata (6.1; base/decisoes.md, #114). A planta serve ao funil-01, que o Otávio aprovou em 09/11/2026 e está pendente do Júnior e do Euclides (#90; #111), e usa o lead score, também pendente (#98). A versão 4 segue as decisões de 09/11/2026 (prompts/11-decisoes-de-09-11.md): caixa de aceite única (#104), canais (#105), prazo de guarda (#106), clique no fim do quiz, visita e início do quiz (18.4, 18.5, 10.6, 10.8), as colunas a mais da planilha (15.3, 15.4), a regra do estágio e do estado atuais (21.9), a nutrição e o produto vendido (5.3) e a contagem das análises gratuitas (5.7). O que muda no banco entra por migração nova sobre o esquema v2, sem apagar nada (etapa 32; 21.11), e no garçom, na versão nova dele (etapa 33); até lá, o esquema v2 e o garçom v3 ainda não fazem o que esta versão desenha nesses pontos. A versão 3 seguiu as decisões #99 e #100 (projeto do Supabase criado e duas chaves no garçom, uma por porta) e o esquema v2 (dados/banco/esquema.sql): muda quem lê o catálogo de entregas, a chave do garçom e da leitura da planilha, e a pessoa passa a ser única por telefone e por e-mail (prompts/08-fila-perguntas.md, Etapa 21).

**Como ler.** Fatos pelo id do campo em `ficha-de-fatos`; decisões por #n; pendências pelo id de `lacunas`. Tudo marcado **proposta** é escolha provisória e está em prompts/05-fila-perguntas.md (6.1 a 6.9) ou em prompts/11-fila-perguntas.md. As propostas 6.2, 6.4, 6.5 e 6.6 foram aceitas pelo Otávio em 09/11/2026 (#114) e deixaram de ser proposta. Os exemplos são fictícios de propósito: nomes como "Maria Exemplo", telefones só com zeros, e-mails no domínio exemplo.com.

**Nomes.** Os nomes de gaveta e de campo são em minúsculas, sem acento, com sublinhado no lugar do espaço. Os valores das listas fechadas seguem os nomes do funil-01, escritos sem acento no banco (por exemplo, pre-qualificado).

---

## As quatro gavetas

| Gaveta | O que guarda | Tem dado pessoal? | No MVP? |
|---|---|---|---|
| pessoas | Uma linha por lead: contato, consentimento e origem da primeira visita | Sim | Sim |
| eventos | Uma linha por acontecimento: visita, início e fim do quiz, lead score, clique no fim do quiz, contato do SDR, mudança de status, Call de Direcionamento, venda, perda | Sim, nas respostas do quiz e na ligação com a pessoa | Sim |
| entregas | O catálogo das entregas publicadas, com id e versão, espelho do repositório | Não | Sim |
| investimento | Quanto se gastou por canal e campanha | Não | **Não.** Desenhada, fora do MVP enquanto a Meta estiver fora (conexoes.md) |

O banco é o Supabase, região São Paulo (conexoes.md). No MVP, só o Otávio acessa o sistema (#95).

---

## Quem grava e quem lê

Cada uso tem a sua chave, com a menor permissão que resolve (nucleo/regras/seguranca.md, regra 2). Nenhuma chave é criada antes de o detector de chaves estar instalado (nucleo/regras/seguranca.md, "Detector de chaves"); cada uma entra em conexoes.md quando for criada, com onde mora e como revogar.

| Quem | Grava | Lê | Chave |
|---|---|---|---|
| **Garçom · porta pública** (função na Cloudflare entre a página e o banco; funil-01, "Caminho do dado") | pessoas e eventos vindos da landing e do quiz, só pela função registrar_fim_quiz; a visita, o início do quiz e o clique no fim do quiz entram pela mesma porta, com as mesmas travas, numa versão nova do banco e do garçom (etapas 32 e 33) | Nada. O catálogo de entregas é conferido pelo próprio banco (18.8) | A chave publicável do Supabase (papel anon), que só executa registrar_fim_quiz: nenhuma tabela, nenhuma visão, nenhuma outra função (#100) |
| **Planilha do SDR · leitura** | Nada | Só os leads da fila (faixas A e B de `lead-score`) e só os campos da lista "O que sai do banco", abaixo, pela função leads_para_planilha | A planilha não guarda chave do Supabase: guarda a CHAVE_PLANILHA, que só abre a porta privada do garçom. Lá, o garçom chama leads_para_planilha com a chave secreta do Supabase (papel service_role), que só executa essa função (#100) |
| **Planilha do SDR · volta do status** | Só eventos dos tipos do SDR (contato_sdr, mudanca_status, reuniao_marcada, reuniao_realizada, venda, perda), com valores da lista fechada; valor fora da lista não entra | Nada | Outra chave, só de gravação desses eventos, com o seu papel, numa versão nova do banco, registrada em conexoes.md (6.6; #114). Pendência até existir a volta do status |
| **Painel** | Nada | Só números agregados, sem identificar ninguém (nucleo/regras/seguranca.md, regra 4) | A do painel, que só lê, com o seu papel, numa versão nova do banco (nucleo/regras/seguranca.md, regra 2; 6.6). Pendência até existir o painel |
| **Contador de escassez** | Nada | Só a contagem de análises gratuitas usadas (ver "Contagem das análises gratuitas") | Outra chave, que só lê essa contagem, com o seu papel, numa versão nova do banco (6.6). Pendência até existir o contador |
| **Otávio** | Tudo, pelo painel do Supabase, incluindo o catálogo de entregas | Tudo | A dele, no Supabase (#95) |

Nenhuma chave vai para a página nem para o navegador (funil-01, "Caminho do dado"). A chave da planilha não é a do garçom (funil-01, passo 5): a porta pública usa a chave publicável e a porta privada, a secreta, e a planilha só tem a CHAVE_PLANILHA (#100). No banco, todas as permissões padrão são retiradas e só essas duas são dadas (#99); a conferência está em dados/banco/conferir.sql. A planilha do SDR mora no Drive do Safra, como exceção registrada à regra 4 de segurança, com acesso só do Otávio e de quem liga; quem liga abre só a planilha, e o acesso ao sistema continua só do Otávio (5.4; #95; #114).

**Dado pessoal.** Só no banco e na planilha do SDR; nunca no repositório, e no Google Drive só a planilha do SDR, pela exceção da regra 4 (nucleo/regras/seguranca.md, regra 4). Aprendizados e painéis no repositório só com números agregados.

---

## Gaveta pessoas

Uma linha por lead. O lead nasce quando o quiz termina e envia o contato com o consentimento (funil-01, "Caminho do lead", passo 2). Quem já está no banco e refaz o quiz não vira outra pessoa: o próprio banco reconhece o telefone ou o e-mail já gravado e liga os eventos novos à mesma linha, sem o garçom precisar ler nada (proposta, 6.3). O banco não aceita duas pessoas com o mesmo telefone (contado só pelos dígitos) nem com o mesmo e-mail (sem diferença de maiúscula), nem quando dois envios chegam no mesmo instante (#100). Se o telefone for de uma pessoa e o e-mail de outra, o banco recusa o envio, sem juntar nem escolher (proposta, 21.2).

| Campo | O que guarda | Exemplo fictício | Dado pessoal? |
|---|---|---|---|
| id_pessoa | Código interno que o banco dá à pessoa; é por ele que os eventos se ligam a ela | pessoa-exemplo-0001 | Indireto: sozinho não diz quem é, mas liga a pessoa aos dados dela. Não sai do banco nem da planilha |
| nome | Como a pessoa quer ser chamada | Maria Exemplo | Sim |
| telefone | WhatsApp com o código do país | +55 00 00000-0000 | Sim |
| email | E-mail | maria@example.com | Sim |
| empresa | Nome da empresa (o quiz atual pede) | Empresa Exemplo Ltda. | Sim, junto com o contato |
| consentimento_whatsapp | Se aceitou a caixa de aceite única (sim ou não); mesmo valor de consentimento_email (#104) | sim | Sim |
| consentimento_email | Se aceitou a caixa de aceite única (sim ou não); mesmo valor de consentimento_whatsapp (#104) | sim | Sim |
| consentimento_texto | O texto exato que a pessoa aceitou, com a finalidade dita (`provas-e-conformidade`, "LGPD"); o mesmo texto vale para os dois campos acima (#104) | "Aceito receber o meu diagnóstico e o contato da equipe por WhatsApp, por mensagem ou ligação, e por e-mail." (exemplo; vale o texto aceito, guardado letra por letra) | Sim, ligado à pessoa |
| consentimento_em | Data e hora do aceite | 2026-11-20 14:32 | Sim, ligado à pessoa |
| consentimento_retirado_em | Data e hora em que a pessoa retirou o consentimento; vazio enquanto não retirar | vazio | Sim, ligado à pessoa |
| primeira_utm_source | Origem da primeira visita, da tabela de origens do funil-01; vazio se a etiqueta veio fora da lista ou se o link não trazia etiqueta (5.5; 10.8) | stories | Não sozinho; ligado à pessoa, sim |
| primeira_utm_campaign | Campanha da primeira visita | funil-01 | Não sozinho; ligado à pessoa, sim |
| primeira_visita_em | Data e hora da primeira visita | 2026-11-20 14:05 | Não sozinho; ligado à pessoa, sim |
| criado_em | Data e hora em que a linha foi criada | 2026-11-20 14:32 | Não sozinho; ligado à pessoa, sim |

Os campos de primeira visita nunca são reescritos: se a pessoa volta por outro link, a origem nova fica só nos eventos.

**A caixa de aceite única** (#104): o quiz tem uma caixa só, que já vem marcada. Para não mexer na tabela agora, ela preenche consentimento_whatsapp e consentimento_email com o mesmo valor e consentimento_texto com o mesmo texto aceito. Quem aceitou pode ser contatado por WhatsApp, por ligação no número do WhatsApp e por e-mail (#105). Se a pessoa desmarcar, o diagnóstico aparece na tela e nada vai ao banco: nenhuma linha nesta gaveta e nenhum evento fim_quiz (escolha provisória, prompts/11-fila-perguntas.md, 30.3).

O estágio e o estado atuais do lead não moram nesta gaveta: saem dos eventos de status dele (ver "Gaveta eventos" e "O que sai do banco"). Assim, só existe um lugar com a verdade.

---

## Gaveta eventos

Uma linha por acontecimento, que nunca é apagada nem reescrita; uma correção é um evento novo.

### Tipos de evento

Lista fechada. Tipo fora da lista não entra.

| tipo | Quando acontece | Quem grava |
|---|---|---|
| visita | O lead abre a landing-page-01, com ou sem etiqueta no link (10.8) | Garçom |
| inicio_quiz | O quiz-01 abre: registrado na abertura do quiz, e não no clique da landing (10.6) | Garçom |
| fim_quiz | Termina o quiz-01 e envia o contato com a caixa de aceite marcada: leva as respostas, a nota e a faixa do lead score | Garçom |
| interesse_pos_relatorio | A pessoa clica num botão do fim do quiz, depois do diagnóstico: leva o que ela clicou (campo clique_fim_quiz), para quem liga saber (18.4, com 14.15, 15.16 e 16.13; #114) | Garçom |
| contato_sdr | O SDR liga ou manda mensagem | Volta do status |
| mudanca_status | O estágio ou o estado do lead muda (funil-01, "Status do SDR") | Volta do status |
| reuniao_marcada | Call de Direcionamento marcada (ficha-de-fatos#nome-call-de-venda) | Volta do status |
| reuniao_realizada | A Call de Direcionamento aconteceu | Volta do status |
| venda | Comprou; também leva o estágio venda | Volta do status |
| perda | Disse não; também leva o estado perdido ("perdido é quem falou não", `metodo`) | Volta do status |

A venda e a perda são tipos próprios, que também mudam o estágio ou o estado, para que o painel conte as duas sem procurar dentro das mudanças de status; reuniao_marcada leva o estágio agendado, e reuniao_realizada, o estágio realizado (6.5; #114). Os nomes reuniao_marcada e reuniao_realizada ficam como estão no banco; em público, a conversa se chama pelo nome de ficha-de-fatos#nome-call-de-venda (#107).

A visita e o início do quiz acontecem antes de a pessoa existir no banco. Ficam ligados só a um código de sessão, que a landing cria na visita, no formato do banco, e passa ao quiz; ele é esquecido quando a aba fecha, sem guardar nada no navegador. No fim do quiz, o banco liga esses eventos à pessoa. Visita sem fim de quiz fica sem pessoa. Quem visita hoje e volta amanhã por outro link aparece como duas visitas; o erro é pequeno e não pede consentimento extra (6.2, 18.5; #114). A visita e o início do quiz não levam dado de pessoa e por isso não pedem aceite (etapa 33).

O tipo interesse_pos_relatorio já está preparado e desligado no esquema v2 e no garçom v3 (18.4); ele é ligado na migração da etapa 32 e no garçom da etapa 33.

### Etiquetas obrigatórias em todo evento

Todo evento leva as cinco etiquetas. Evento sem alguma delas não entra. Etiqueta presente e vazia conta como etiqueta: a visita sem etiqueta no link entra com utm_source e utm_campaign vazios, para não se perder da contagem (10.8; #114).

| Campo | O que guarda | Exemplo fictício | Dado pessoal? |
|---|---|---|---|
| funil | O id do funil | funil-01 | Não |
| entrega | O id da entrega em que o evento aconteceu, do catálogo da gaveta entregas | quiz-01 | Não |
| versao_entrega | A versão dessa entrega, do mesmo catálogo | 1 | Não |
| utm_source | A origem, da tabela de origens do funil-01 (stories, bio, reels, email, whatsapp; meta-ads reservada, fora do MVP); vazio se a etiqueta veio fora da lista (5.5) | bio | Não sozinho; ligado à pessoa, sim |
| utm_campaign | A campanha, da mesma tabela | funil-01 | Não sozinho; ligado à pessoa, sim |

O banco confere, por chave estrangeira, se o par entrega e versão existe no catálogo; se não existe, o evento não entra. O garçom confere só o formato e não lê nenhuma tabela (18.8). Origem fora da lista é gravada em branco pelo garçom, e o banco é a última trava (5.5; #114).

Os eventos que não acontecem numa página (os do SDR, da Call de Direcionamento e da venda) levam o funil, a entrega e a versão do quiz que a pessoa respondeu e a origem da primeira visita dela. Assim, toda venda pode ser lida de volta até a peça e o link que a trouxeram. Etiqueta a mais para separar anúncios só quando a Meta entrar (6.4; #114).

### Outros campos do evento

| Campo | O que guarda | Em que tipos | Exemplo fictício | Dado pessoal? |
|---|---|---|---|---|
| id_evento | Código interno do evento | Todos | evento-exemplo-0001 | Não |
| tipo | Um valor da lista de tipos | Todos | fim_quiz | Não |
| id_pessoa | A pessoa do evento; vazio na visita e no início do quiz até o fim do quiz | Todos | pessoa-exemplo-0001 | Indireto, como na gaveta pessoas |
| id_sessao | O código da sessão da visita, criado pela landing no formato do banco (6.2; 18.5) | visita, inicio_quiz, fim_quiz, interesse_pos_relatorio | sessao-exemplo-0001 | Indireto |
| ocorrido_em | Data e hora em que aconteceu | Todos | 2026-11-20 14:32 | Não sozinho; ligado à pessoa, sim |
| gravado_em | Data e hora em que entrou no banco | Todos | 2026-11-20 14:32 | Não sozinho; ligado à pessoa, sim |
| gravado_por | Quem gravou: garcom ou volta-do-status | Todos | garcom | Não |
| respostas | As respostas do quiz, pergunta por pergunta | fim_quiz | Faturamento: "R$ 150 mil a R$ 500 mil"; Cargo: "Dono(a) ou sócio(a)" (respostas fictícias, com as opções de `lead-score`) | Sim |
| lead_score_nota | A nota do lead score, na escala de `lead-score` | fim_quiz | 72 | Sim, ligada à pessoa |
| lead_score_faixa | A faixa: a, b, c ou eliminatorio (`lead-score`, "Faixas" e "Eliminatórios") | fim_quiz | a | Sim, ligada à pessoa |
| lead_score_versao | A versão de `lead-score` usada no cálculo, para conferir as faixas depois (outros-22) | fim_quiz | 1 | Não |
| estagio | Um estágio da lista fechada do funil-01: captado, pre-qualificado, agendado, realizado, venda | mudanca_status, reuniao_marcada, reuniao_realizada, venda | agendado | Sim, ligado à pessoa |
| estado | Um estado da lista fechada do funil-01: conversando, tentativa, abandonado, stand-by, perdido, nutricao (5.3; #114; nutricao entra na lista do banco pela migração da etapa 32) | mudanca_status, perda, contato_sdr | tentativa | Sim, ligado à pessoa |
| data_volta | A data de volta ao contato; obrigatória no stand-by (funil-01, "Status do SDR") | mudanca_status | 2026-12-01 | Sim, ligado à pessoa |
| canal | Por onde o SDR falou: telefone ou whatsapp | contato_sdr | whatsapp | Não sozinho; ligado à pessoa, sim |
| reuniao_em | Data e hora da Call de Direcionamento | reuniao_marcada | 2026-11-25 10:00 | Sim, ligado à pessoa |
| produto | O que foi vendido: iasv ou essencial, lista fechada (5.3; #114); só a IASV conta para as vagas (ficha-de-fatos#vendas-que-contam) | venda | iasv | Sim, ligado à pessoa |
| clique_fim_quiz | O que a pessoa clicou no fim do quiz, numa lista fechada com um valor por botão do fim do quiz. **Proposta:** quero-conversa, chamar-whatsapp, tenho-interesse, agora-nao (prompts/11-fila-perguntas.md) | interesse_pos_relatorio | quero-conversa | Sim, ligado à pessoa |

O evento perda não guarda motivo: um texto livre do SDR pode trazer dado pessoal que não precisa estar ali. Se o motivo da perda for útil, ele entra como lista fechada nova, nunca texto livre, e nada de texto livre na planilha inteira (6.5, com 15.7; #114).

---

## Gaveta entregas

O catálogo das entregas publicadas, espelho do repositório: cada linha corresponde a uma entrega em entregas/ com o mesmo id e a mesma versão do cabeçalho dela. O Otávio grava uma linha nova a cada versão publicada; o garçom não lê o catálogo, quem confere o par entrega e versão é o próprio banco (18.8). Uma versão nunca é apagada do catálogo, para que os eventos antigos continuem apontando para ela.

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
- **O que conta como usada** (5.7, com 6.7; #114): uma por pessoa que terminou o quiz e recebeu o diagnóstico, inclusive eliminatórios e faixa C, sem contar de novo quem refaz o quiz; a planta permite essa conta porque a pessoa repetida é reconhecida (6.3). Quem desmarca a caixa de aceite não gera fim_quiz e não conta (30.3).
- **Quem lê.** Só o contador, com a chave que lê só esse número, e o painel. Nenhum dos dois vê quem foram as pessoas.
- **Onde aparece.** O contador só aparece acima do limite de ficha-de-fatos#barra-de-resgates e nunca no topo da página (5.7, com 10.11; #114).
- **Depois da última gratuita.** A cobrança da Análise fica para a versão 2 do funil, e o valor só aparece na página quando a cobrança existir (5.9; #114); quando for desenhada, a planta ganha o que for preciso para saber se a Análise de cada pessoa foi gratuita ou paga.

---

## O que sai do banco

**Para a planilha do SDR** (6.6; #114): só os leads das faixas A e B, com id_pessoa, nome, telefone, email, empresa, consentimento_whatsapp, consentimento_email, lead_score_nota, lead_score_faixa, as respostas que o SDR precisa confirmar na faixa B (`lead-score`, "Faixas": valor da venda, time e histórico; o histórico são as respostas de leads por mês e de CRM do quiz, 15.4), entrou_em, tentativas_feitas, o que a pessoa clicou no fim do quiz (clique_fim_quiz, só de leitura; 18.4, com 15.16), o estágio e o estado atuais e a data_volta. Lead que retirou o consentimento não vai para a planilha.

- **entrou_em** é a hora em que o banco recebeu o fim do quiz de entrada (o gravado_em desse fim_quiz, o mesmo horário do cursor); **tentativas_feitas** conta os eventos contato_sdr da pessoa (15.3, com 21.7 e 21.16; #114).
- **Estágio, estado e data_volta atuais** (21.9, com 24.4; #114): o estágio é o último estágio preenchido nos eventos da pessoa, e o estado, o último estado preenchido; a data_volta vem do mesmo evento que deu o estado. Enquanto não houver evento de status, a função manda os três vazios, e o lead chega à planilha como captado: quem escreve captado na linha nova é a planilha. Quem liga marca pré-qualificado nas duas faixas (15.5).
- **Quem retira o consentimento depois de entrar na planilha** continua na aba até o Otávio apagar a linha à mão, quando registrar a retirada; o caminho automático entra junto com a volta do status (21.10; #114).

Quem entrega é a função leads_para_planilha (dados/banco/esquema.sql), no máximo 200 leads por pedido, em ordem, a partir de um cursor (#100). Cada pessoa entra uma vez, pelo primeiro fim de quiz dela em faixa A ou B, e quem refaz o quiz não volta (21.5; #114). A função só devolve quem tem consentimento_whatsapp = sim (21.4); com a caixa única (#104), isso é o mesmo que ter aceitado. Hoje a função devolve das respostas só valor da venda e vendedores; as duas respostas do histórico (15.4) e o clique no fim do quiz (18.4) entram na migração da etapa 32.

**Para o painel:** só números agregados, por safra, por etapa, por faixa, por origem e por entrega e versão. Por exemplo: quantos captados, pré-qualificados, agendados, realizados e vendas no mês; quantos vieram de cada origem; quantos de cada versão da landing terminaram o quiz. Nenhum nome, telefone, e-mail, resposta nem id_pessoa. As metas por etapa que o painel compara estão em ficha-de-fatos#metas-por-etapa (funil-01, "Metas por etapa").

**Para aprendizados/:** só números agregados, com prova e status, e nada concluído abaixo da amostra mínima (aprendizados/README.md; CLAUDE.md).

**Para o contador:** só a contagem de análises gratuitas usadas.

---

## Prazo de guarda

Os dados de cada lead se guardam pelo prazo de ficha-de-fatos#prazo-de-guarda, contado como o campo diz (decisão do Otávio, 09/11/2026, 6.8; base/decisoes.md, #106). O banco não guarda nada além dos campos desta planta.

**O caminho de apagamento ainda não existe.** O que se apaga, o que vira anônimo, quem faz e como fica registrado, inclusive para quem pede para apagar os dados ou retira o consentimento, é pendência com prazo: escrito e testado antes de o primeiro dado real completar o prazo de ficha-de-fatos#prazo-de-guarda (#106; log.md, Pendências). Até lá, nada é apagado automaticamente, e a trava do esquema continua recusando apagar ou reescrever evento (18.10).

---

## Pendências que tocam a planta

| O que falta | Quem decide | Onde |
|---|---|---|
| Aprovação da planta | O Otávio, depois da atualização em cascata | 6.1 |
| Caminho de apagamento, antes de o primeiro dado real completar o prazo de guarda | O Otávio | #106; log.md, Pendências |
| Migração do banco e garçom novo para o que esta versão desenha (nutricao, produto, clique no fim do quiz, visita, início do quiz, histórico da faixa B) | O Otávio aprova; etapas 32 e 33 | 18.4; 18.5; 15.4; 5.3 |
| Lista de valores do clique no fim do quiz | O Otávio | 18.4; prompts/11-fila-perguntas.md |
| O que acontece quando a pessoa desmarca a caixa | O Otávio | 30.3 |
| Chaves do painel, do contador e da volta do status | O Otávio, quando cada um existir | 6.6 |
| Funil-01 e lead score | O Júnior e o Euclides | #90, #98 |
| Detector de chaves antes da primeira chave | O Otávio | nucleo/regras/seguranca.md; log.md, Pendências |
| Escolhas provisórias desta etapa | O Otávio | prompts/05-fila-perguntas.md, 6.1 a 6.9 |

---

## Fontes

- funis/funil-01/funil.md (v3): caminho do dado, status do SDR, origens e links, contador de escassez.
- base/decisoes.md (v5): #104, #105, #106, #107, #111, #114; base/ficha-de-fatos.md (v4): prazo-de-guarda, nome-call-de-venda; prompts/11-decisoes-de-09-11.md; prompts/11-respostas.md.
- base/lead-score.md (v1); base/ficha-de-fatos.md (v3): analises-gratuitas, barra-de-resgates, vendas-que-contam, metas-por-etapa; base/decisoes.md (v3): #90, #92, #93, #95, #98; base/metodo.md (v2); base/provas-e-conformidade.md (v2), "LGPD"; base/lacunas.md (v4).
- base/decisoes.md (v4): #99, #100; dados/banco/esquema.sql (v2); prompts/08-fila-perguntas.md, Etapa 21.
- nucleo/regras/seguranca.md (v2); conexoes.md; dados/planta/README.md; dados/paineis/README.md; aprendizados/README.md.
- Campos de contato do quiz atual: fontes/acervo-2026-11-08/safra-acervo/05-paginas/quiz-diagnostico-de-vendas/index.html (nome, e-mail, telefone, empresa).
- prompts/05-fila-de-trabalho.md, "Etapa 6 · Planta do banco"; prompts/05-fila-perguntas.md, 5.3 a 5.9.
