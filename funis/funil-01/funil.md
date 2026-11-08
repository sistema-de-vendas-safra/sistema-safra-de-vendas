---
id: funil-01
versao: 1
status: pendente-aprovacao
aprovado_por:
  otavio: pendente
  junior: pendente
  euclides: pendente
depende_de:
  - id: decisoes
    versao: 3
  - id: ficha-de-fatos
    versao: 3
  - id: lead-score
    versao: 1
  - id: metodo
    versao: 2
  - id: produto
    versao: 2
  - id: entregas-do-servico
    versao: 2
  - id: provas-e-conformidade
    versao: 2
  - id: lacunas
    versao: 3
  - id: regra-seguranca
    versao: 1
  - id: glossario
    versao: 2
desatualizado: false
---

# Funil-01

O caminho do lead e do dado no funil que a #90 propõe: landing-page-01, quiz-01, banco de dados, planilha do SDR e reunião com o Júnior. Substitui a página das três portas (#66) e o CRM do Doc Mestre quando a #90 for aprovada.

**Status.** Pendente de aprovação. A #90 é do Otávio (08/11/2026) e está pendente do Júnior e do Euclides; enquanto isso, a #66 continua decidida, e este funil, a landing-page-01 e o quiz-01 só podem ser feitos como rascunho, avisando que podem mudar (base/decisoes.md, "Enquanto a #90 estiver pendente"; nucleo/regras/versionamento.md). O documento em si ainda não foi aprovado por ninguém (prompts/05-fila-perguntas.md, 5.1). A porta de qualificação usa o lead score, também pendente (#98).

**Como ler.** Fatos pelo id do campo em `ficha-de-fatos`; decisões por #n; pendências pelo id de `lacunas`. Tudo marcado **proposta** é escolha provisória desta etapa e está em prompts/05-fila-perguntas.md.

**De que não depende, de propósito.** `oferta` e `mecanismo` estão com desatualizado: true desde a #92 (prompts/05-fila-perguntas.md, 4.5) e não servem de base para entrega nova. Por isso este funil não se apoia neles: a reunião com o Júnior e o downsell são descritos só pelo que está em `decisoes`, `ficha-de-fatos` e `produto`.

---

## Caminho do lead

1. **landing-page-01.** O lead chega por um link etiquetado (ver "Origens e links") e é levado ao quiz.
2. **quiz-01.** Responde o quiz e deixa o contato, com o consentimento (ver "Caminho do dado"). O diagnóstico do quiz é a própria Análise (#92; ficha-de-fatos#analise-conteudo), gratuita segundo ficha-de-fatos#analise-gratuidade e ficha-de-fatos#analises-gratuitas, e depois cobrada pelo valor de ficha-de-fatos#analise-valor (prompts/05-fila-perguntas.md, 5.9). Todo lead que termina o quiz recebe o diagnóstico, inclusive quem não entra na fila do SDR (`lead-score`, "Eliminatórios").
3. **Contato do SDR.** O SDR liga e agenda (#67; ficha-de-fatos#quem-agenda; quem é o SDR está em aberto). O que ele faz depende da faixa do lead (ver "Porta de qualificação").
4. **Reunião com o Júnior.** É a conversa de venda, sem preço (#92). Quem faz e fecha no começo: ficha-de-fatos#quem-faz-a-reuniao (#51). A duração e quem conduz continuam em aberto (ficha-de-fatos#analise-duracao, ficha-de-fatos#analise-quem-conduz; conflito-02).
5. **Venda da IASV Safra, ou não.** O que a IASV é e entrega está em `produto` e `entregas-do-servico`. Só estas vendas contam para as vagas (ficha-de-fatos#vendas-que-contam; ficha-de-fatos#vagas).
6. **Depois do não, e só depois dele: a Implementação Essencial.** O downsell (ficha-de-fatos#downsell-nome) só é oferecido a quem disse não à IASV (ficha-de-fatos#downsell-desenho). O preço está em ficha-de-fatos#downsell-preco, **em conflito · bloqueado para entrega até a decisão**, e o desenho está em revisão desde 07/11 (lacuna-03). Quem oferece e em que momento não está escrito fora de `oferta`, que está desatualizada (prompts/05-fila-perguntas.md, 5.8). A venda da Essencial não conta para as vagas (ficha-de-fatos#vendas-que-contam).

Quem não entra na fila do SDR (eliminatórios e faixa C) vai para a nutrição, que ainda não tem canal nem conteúdo definidos (prompts/05-fila-perguntas.md, 5.3).

---

## Caminho do dado

Só a descrição do caminho. Nada aqui é implementação, e nenhuma chave aparece neste documento: onde cada chave mora está em conexoes.md, e as regras, em nucleo/regras/seguranca.md. A planta do banco é a etapa 6.

1. **Landing e quiz.** A landing lê a etiqueta do link (ver "Origens e links") e a passa ao quiz. No fim, o quiz envia as respostas, o contato, o consentimento e a etiqueta. Nenhum desses dois tem chave: a página não fala direto com o banco.
2. **Garçom.** Uma função na Cloudflare (conexoes.md) que fica entre a página e o banco. Ela guarda a chave, que nunca vai para a página nem para o navegador, e confere as etiquetas: só aceita como origem os nomes fixos da tabela de origens (proposta para etiqueta fora da lista: prompts/05-fila-perguntas.md, 5.5). A chave do garçom só grava leads e eventos; não lê o banco inteiro (nucleo/regras/seguranca.md, regra 2).
3. **Supabase.** O banco de dados dos leads, região São Paulo (conexoes.md). Guarda a pessoa, o consentimento, a origem da primeira visita, as respostas, a nota e a faixa do lead score e cada mudança de estágio e de estado, com data. É de lá que sai a contagem do contador de escassez (ver abaixo).
4. **Planilha do SDR.** Recebe do banco os leads da fila (faixas A e B), com o que o SDR precisa para ligar. Onde a planilha mora e como o SDR a acessa estão em aberto (prompts/05-fila-perguntas.md, 5.4).
5. **Status do SDR de volta ao Supabase.** O SDR marca na planilha o estágio e o estado de cada lead, só com os valores da lista fechada (ver "Status do SDR"). Cada mudança volta para o banco como um evento com data, por um caminho conferido como o do garçom: valor fora da lista não entra. A leitura do banco para a planilha e a volta do status não usam a chave do garçom, que só grava: pedem outra chave, de permissão mínima, a definir na etapa 6 e em conexoes.md (nucleo/regras/seguranca.md, regra 2; 5.4).

**Dado pessoal.** Nome, telefone, e-mail e respostas de lead só no banco e na planilha do SDR; nunca no repositório nem no Google Drive (nucleo/regras/seguranca.md, regra 4; CLAUDE.md). Aprendizados e painéis no repositório só com números agregados.

**Consentimento.** O quiz pede consentimento explícito para WhatsApp e e-mail, com a finalidade dita, antes de enviar o contato (`provas-e-conformidade`, "LGPD"). Hoje o quiz pede e-mail e WhatsApp sem esse texto: conflito-09, que trava a publicação do quiz-01. O banco guarda a data e o texto aceito.

**Acesso.** No MVP, só o Otávio acessa o sistema (#95; conexoes.md).

---

## Porta de qualificação

A porta é o lead score de `lead-score` (#98), **pendente do Júnior e do Euclides**. Até a aprovação, serve só de rascunho, e ficha-de-fatos#criterio-de-qualificacao segue em conflito · bloqueado para entrega até a decisão (conflito-01, lacuna-12). Os eliminatórios, os pontos, as notas de cada faixa e os prazos de cada faixa estão em `lead-score`; este funil não os repete.

| Faixa (`lead-score`) | O que o SDR faz | Onde o lead fica |
|---|---|---|
| Eliminatórios | Nada: o lead não entra na fila. Recebe o diagnóstico normalmente. | Nutrição (proposta, 5.3) |
| A | Liga no prazo da faixa A e marca a reunião com o Júnior. | Fila do SDR, primeiro |
| B | Liga no prazo da faixa B, confirma por telefone o que o quiz deixou em dúvida e só então marca. | Fila do SDR, depois da A |
| C | Nada: não ocupa a agenda do Júnior. | Nutrição (proposta, 5.3) |

Depois das primeiras respostas reais, as faixas são conferidas contra quem agendou e comprou (`lead-score`, "Revisão programada"; outros-22). Nenhum aprendizado é tirado antes da amostra mínima.

---

## Status do SDR

Lista fechada, só com os nomes do método (`metodo`, "As seis regras"). Estágio e estado são duas colunas separadas: o estágio diz onde o lead parou no funil; o estado diz a situação do contato.

**Estágio** (só avança):

| Estágio | Quando, no funil-01 (proposta, 5.2) |
|---|---|
| captado | Terminou o quiz e deixou o contato |
| pré-qualificado | Passou pela porta: faixa A, ou faixa B depois da confirmação do SDR |
| agendado | Reunião com o Júnior marcada |
| realizado | A reunião aconteceu |
| venda | Comprou |

**Estado** (situação do contato):

| Estado | O que significa (o método só dá o nome; as definições de conversando, tentativa e o "pausado" de stand-by são proposta, 5.2) |
|---|---|
| conversando | Há conversa em curso com o lead |
| tentativa | O SDR tenta contato e ainda não teve resposta |
| abandonado | Sumiu depois de esgotadas as tentativas (o número da operação do Júnior está em ficha-de-fatos#tentativas-ate-abandonado; o do funil-01 não está escrito, 5.3) |
| stand-by | Pausado, sempre com data de volta ao contato |
| perdido | Só quem disse não: "perdido é quem falou não" |

Ao fim do relógio, nenhum lead da safra pode estar em conversando ou em tentativa (`metodo`). O relógio é contado do dia em que o lead entra (#41); qual é o relógio do funil-01 não está escrito (5.2).

**Passos que faltam na lista (proposta, 5.3).** O método não tem nome para três situações do funil-01. Ficam propostos aqui, sem entrar na lista fechada até a decisão:

- **Nutrição**, para eliminatórios e faixa C (hoje ficariam em captado, sem estado que diga que estão fora da fila).
- **Não compareceu**, para quem foi agendado e faltou (proposta: continua em agendado, com estado tentativa, até remarcar, ser abandonado ou dizer não).
- **Qual produto foi vendido** (IASV ou Implementação Essencial), como um campo ao lado do estágio venda, e não como estágio novo: a venda da Essencial não conta para as vagas.

---

## Metas por etapa

As metas são as do método, com os valores do Júnior em ficha-de-fatos#metas-por-etapa. Cada meta mede uma passagem entre estágios:

| Etapa | Passagem | Meta |
|---|---|---|
| Pré-qualificação | captado para pré-qualificado | ficha-de-fatos#metas-por-etapa, primeira meta |
| Agendamento | pré-qualificado para agendado | ficha-de-fatos#metas-por-etapa, segunda meta |
| Comparecimento | agendado para realizado | ficha-de-fatos#metas-por-etapa, terceira meta |
| Fechamento | realizado para venda | ficha-de-fatos#metas-por-etapa, quarta meta |

- A conversão total de lead em venda é o produto das quatro metas e nunca é apresentada como métrica de mercado (`metodo`, "A conversão de lead em venda").
- A leitura é por safra e de trás para frente: começa no fechamento e recua até a etapa que quebrou (`metodo`).
- A meta de vendas do funil está em ficha-de-fatos#meta-de-vendas; com poucos leads por mês, a leitura por etapa fica ruidosa (ficha-de-fatos#volume-minimo, hipótese).
- Os nomes das etapas acima são os do método para uso interno e no corpo das peças; em títulos e chamadas de topo vale a regra de 22/10 (conflito-12, resolvido; `glossario`, verbete Etapas). "SDR" não vai para a comunicação de topo.

---

## Origens e links

Cada link do funil leva duas etiquetas fixas, em minúsculas e sem acento (proposta, 5.5): `utm_source` com o nome da origem e `utm_campaign` com `funil-01`. O banco grava a origem da primeira visita.

| Origem | utm_source | utm_campaign | Como o lead chega | MVP |
|---|---|---|---|---|
| Stories | stories | funil-01 | Link no stories | Sim |
| Bio | bio | funil-01 | Link da bio do perfil | Sim |
| Reels | reels | funil-01 | O reels não tem link clicável. O lead comenta uma palavra-chave; o comentário dispara uma mensagem com o link etiquetado como reels | Sim, se a ferramenta for registrada em conexoes.md (palavra-chave e ferramenta em aberto, 5.6) |
| E-mail | email | funil-01 | Link no e-mail | Sim |
| WhatsApp | whatsapp | funil-01 | Link na mensagem de WhatsApp | Sim |
| Meta Ads | meta-ads | funil-01 | Anúncio pago | **Reservada · fora do MVP** (a Meta está fora do MVP, conexoes.md) |

Forma do link: `[endereço da landing-page-01]?utm_source=stories&utm_campaign=funil-01`. O endereço da landing não está decidido neste documento.

**Palavra-chave dos reels.** Não está decidida (prompts/05-fila-perguntas.md, 5.6).

---

## Contador de escassez

Segue a regra de ficha-de-fatos#barra-de-resgates (#93), sem repeti-la aqui: a contagem é real, sai do Supabase, e o contador só aparece na página acima do limite registrado no campo. Até lá, nenhuma porcentagem de resgate e nenhuma barra de vagas.

- A contagem real depende deste funil, que está pendente (#90; conflito-04).
- O que conta como uma análise gratuita usada não está escrito (proposta, prompts/05-fila-perguntas.md, 5.7).
- Não vale para o contador "Total gerado" do hero, que segue no conflito de credenciais com o Júnior e o Euclides (ficha-de-fatos#total-dos-dois; conflito-05).
- A urgência da oferta da IASV é outra coisa e segue ficha-de-fatos#urgencia (prompts/05-fila-perguntas.md, 4.9).

---

## Pendências que tocam o funil

| O que falta | Quem decide | Onde |
|---|---|---|
| Aprovação do funil-01 | O Júnior e o Euclides; o Otávio, este documento | #90; conflito-06, conflito-14; 5.1 |
| Lead score como porta | O Júnior e o Euclides | #98; conflito-01, lacuna-12 |
| Consentimento LGPD e promessa percentual no quiz | O Otávio com o Júnior | conflito-09 |
| Nome público da Análise; duração e quem conduz a reunião com o Júnior | Ver conflito-02 | conflito-02, lacuna-11 |
| Preço e desenho da Implementação Essencial | Ver lacuna-03 | ficha-de-fatos#downsell-preco; ficha-de-fatos#downsell-desenho; 5.8 |
| Quem é o SDR | Não registrado | ficha-de-fatos#quem-agenda |
| Data de início do funil | O Otávio | ficha-de-fatos#inicio-do-funil; conflito-14 |
| Escolhas provisórias desta etapa | O Otávio | prompts/05-fila-perguntas.md, 5.1 a 5.9 |

---

## Fontes

- Decisões #41, #51, #66, #67, #90, #92, #93, #95, #98 (base/decisoes.md, v3).
- base/ficha-de-fatos.md (v3), base/lead-score.md (v1), base/metodo.md (v2), base/produto.md (v2), base/entregas-do-servico.md (v2), base/provas-e-conformidade.md (v2), base/lacunas.md (v3).
- conexoes.md; nucleo/regras/seguranca.md; GLOSSARY.md (verbetes Funil-01, Etapas, Barra de resgates).
- prompts/05-fila-de-trabalho.md, "Etapa 5 · Funil-01".
