---
id: funil-01
versao: 3
status: pendente-aprovacao
aprovado_por:
  otavio: 2026-11-09
  junior: pendente
  euclides: pendente
depende_de:
  - id: decisoes
    versao: 5
  - id: ficha-de-fatos
    versao: 4
  - id: lead-score
    versao: 3
  - id: metodo
    versao: 4
  - id: produto
    versao: 4
  - id: entregas-do-servico
    versao: 4
  - id: provas-e-conformidade
    versao: 4
  - id: lacunas
    versao: 6
  - id: regra-seguranca
    versao: 3
  - id: glossario
    versao: 4
desatualizado: false
---

# Funil-01

O caminho do lead e do dado no funil que a #90 propõe: landing-page-01, quiz-01, banco de dados, planilha do SDR e a Call de Direcionamento com o Júnior (ficha-de-fatos#nome-call-de-venda). Substitui a página das três portas (#66) e o CRM do Doc Mestre quando a #90 for aprovada.

**Status.** Pendente de aprovação. A #90 é do Otávio (08/11/2026) e está pendente do Júnior e do Euclides; enquanto isso, a #66 continua decidida, e este funil, a landing-page-01 e o quiz-01 só podem ser feitos como rascunho, avisando que podem mudar (base/decisoes.md, "Enquanto a #90 estiver pendente"; nucleo/regras/versionamento.md). O Otávio aprovou este documento em 09/11/2026 e manteve a data de lançamento de ficha-de-fatos#inicio-do-funil, aceitando alguns dias de atraso se precisar; o Júnior e o Euclides aprovam junto com o item 1 da pauta (decisão do Otávio, 09/11/2026, 5.1; base/decisoes.md, #111). A planilha e os roteiros de quem liga seguem a mesma aprovação (15.1). A porta de qualificação usa o lead score, também pendente (#98).

**Como ler.** Fatos pelo id do campo em `ficha-de-fatos`; decisões por #n; pendências pelo id de `lacunas`. Tudo marcado **proposta** é escolha provisória e está em prompts/05-fila-perguntas.md. As propostas 5.2, 5.3, 5.5, 5.7, 5.9 e 6.4 foram aceitas pelo Otávio em 09/11/2026 (base/decisoes.md, #114) e deixaram de ser proposta.

**De que não depende, de propósito.** Este funil não se apoia em `oferta` nem em `mecanismo` (que ficaram marcados de 08/11 até a etapa 31, pela 4.5): a Call de Direcionamento e o downsell são descritos só pelo que está em `decisoes`, `ficha-de-fatos` e `produto`.

---

## Caminho do lead

1. **landing-page-01.** O lead chega por um link etiquetado (ver "Origens e links") e é levado ao quiz. A landing não pede contato: o contato é pedido só no quiz, atendendo o pedido do Júnior de 03/11 (8.14; #114).
2. **quiz-01.** Responde o quiz e deixa o contato, com o consentimento (ver "Caminho do dado"). O diagnóstico do quiz é a própria Análise (#92; ficha-de-fatos#analise-conteudo), gratuita segundo ficha-de-fatos#analise-gratuidade e ficha-de-fatos#analises-gratuitas, e depois cobrada pelo valor de ficha-de-fatos#analise-valor. A cobrança depois das gratuitas fica para a versão 2 deste funil, e o valor só aparece na página quando a cobrança existir (5.9; #114). Todo lead que termina o quiz recebe o diagnóstico, inclusive quem não entra na fila do SDR (`lead-score`, "Eliminatórios").
3. **Contato do SDR.** O SDR liga e agenda (#67; ficha-de-fatos#quem-agenda; quem é o SDR está em aberto). Quem aceitou a caixa do quiz pode ser contatado por WhatsApp, por ligação e por e-mail (#105); no primeiro contato, ligação primeiro e, sem resposta, WhatsApp no mesmo dia (15.10; #114). O que ele faz depende da faixa do lead (ver "Porta de qualificação").
4. **Call de Direcionamento.** É a conversa de venda, sem custo para o lead (#92; 15.14): nome em ficha-de-fatos#nome-call-de-venda, duração em ficha-de-fatos#duracao-call-de-venda e condutor em ficha-de-fatos#quem-faz-a-reuniao (decisão do Otávio, 09/11/2026, 7.9; base/decisoes.md, #107). É nela que fica a demonstração com os números do cliente (4.5; #114). Quem fecha no começo: ficha-de-fatos#quem-faz-a-reuniao (#51).
5. **Venda da IASV Safra, ou não.** O que a IASV é e entrega está em `produto` e `entregas-do-servico`. Só estas vendas contam para as vagas (ficha-de-fatos#vendas-que-contam; ficha-de-fatos#vagas).
6. **Depois do não, e só depois dele: a Implementação Essencial.** O downsell (ficha-de-fatos#downsell-nome) só é oferecido a quem disse não à IASV (ficha-de-fatos#downsell-desenho). O preço está em ficha-de-fatos#downsell-preco, **em conflito · bloqueado para entrega até a decisão**, e o desenho está em revisão desde 07/11 (lacuna-03). Quem oferece e em que momento não está escrito fora de `oferta`, que está desatualizada (prompts/05-fila-perguntas.md, 5.8). A venda da Essencial não conta para as vagas (ficha-de-fatos#vendas-que-contam).

Quem não entra na fila do SDR (eliminatórios e faixa C) fica em nutrição, que é um estado (ver "Status do SDR"; 5.3; #114) e ainda não tem canal nem conteúdo definidos.

---

## Caminho do dado

Só a descrição do caminho. Nada aqui é implementação, e nenhuma chave aparece neste documento: onde cada chave mora está em conexoes.md, e as regras, em nucleo/regras/seguranca.md. O desenho do banco está em `planta-do-banco` (dados/planta/planta.md).

1. **Landing e quiz.** A landing lê a etiqueta do link (ver "Origens e links") e a passa ao quiz. A landing registra a visita, e o quiz registra o início quando abre, ligados pelo mesmo código de sessão (18.5, 10.6; #114). No fim, o quiz envia as respostas, o contato, o aceite e a etiqueta, e também o que a pessoa clicou no fim do quiz (18.4; #114). Nenhum desses dois tem chave: a página não fala direto com o banco.
2. **Garçom.** Uma função na Cloudflare (conexoes.md) que fica entre a página e o banco. Ela guarda as chaves, que nunca vão para a página nem para o navegador, e confere as etiquetas: só aceita como origem os nomes fixos da tabela de origens; origem fora da lista é gravada em branco, e o banco é a última trava (5.5; #114). As chaves seguem `planta-do-banco`, "Quem grava e quem lê": a porta pública usa a chave publicável e a porta privada, a secreta, e a planilha só tem a CHAVE_PLANILHA (#100; 21.14).
3. **Supabase.** O banco de dados dos leads, região São Paulo (conexoes.md). Guarda a pessoa, o consentimento, a origem da primeira visita, as respostas, a nota e a faixa do lead score e cada mudança de estágio e de estado, com data. É de lá que sai a contagem do contador de escassez (ver abaixo).
4. **Planilha do SDR.** Recebe do banco os leads da fila (faixas A e B), com o que o SDR precisa para ligar, pela porta privada do garçom (`planta-do-banco`, "Quem grava e quem lê"; 21.14). A planilha mora no Drive do Safra, como exceção registrada à regra 4 de segurança, com acesso só do Otávio e de quem liga (5.4; #114; nucleo/regras/seguranca.md, regra 4).
5. **Status do SDR de volta ao Supabase.** O SDR marca na planilha o estágio e o estado de cada lead, só com os valores da lista fechada (ver "Status do SDR"). Cada mudança volta para o banco como um evento com data, por um caminho conferido como o do garçom: valor fora da lista não entra. A volta do status ainda não existe (log.md, Pendências); quando existir, ganha a sua chave, com o seu papel, numa versão nova do banco, registrada em conexoes.md (6.6; #114; nucleo/regras/seguranca.md, regra 2).

**Dado pessoal.** Nome, telefone, e-mail e respostas de lead só no banco e na planilha do SDR; nunca no repositório, e no Google Drive só a planilha do SDR, pela exceção da regra 4 (nucleo/regras/seguranca.md, regra 4; 5.4). Aprendizados e painéis no repositório só com números agregados.

**Consentimento.** O quiz tem uma caixa de aceite só, que já vem marcada; quem quiser, desmarca. O texto cobre o diagnóstico e o contato da equipe por WhatsApp (mensagem e ligação) e por e-mail (decisão do Otávio, 09/11/2026, 13.4 e 16.12; base/decisoes.md, #104 e #105) e o texto final foi listado para o Otávio conferir (prompts/11-fila-perguntas.md). A caixa única preenche consentimento_whatsapp e consentimento_email com o mesmo valor e o mesmo texto aceito (`planta-do-banco`). Quem desmarca vê o diagnóstico na tela, e nada vai ao banco nem à equipe (escolha provisória, prompts/11-fila-perguntas.md, 30.3). O banco guarda a data e o texto aceito, pelo prazo de ficha-de-fatos#prazo-de-guarda (#106). A posição do aceite no quiz fica como está, como exceção decidida pelo Otávio às regras de `provas-e-conformidade` (#110).

**Acesso.** No MVP, só o Otávio acessa o sistema (#95; conexoes.md).

---

## Porta de qualificação

A porta é o lead score de `lead-score` (#98), **pendente do Júnior e do Euclides**. Até a aprovação, serve só de rascunho, e ficha-de-fatos#criterio-de-qualificacao segue em conflito · bloqueado para entrega até a decisão (conflito-01, lacuna-12). Os eliminatórios, os pontos, as notas de cada faixa e os prazos de cada faixa estão em `lead-score`; este funil não os repete.

| Faixa (`lead-score`) | O que o SDR faz | Onde o lead fica |
|---|---|---|
| Eliminatórios | Nada: o lead não entra na fila. Recebe o diagnóstico normalmente. | Nutrição (5.3) |
| A | Liga no prazo da faixa A, marca pré-qualificado e marca a Call de Direcionamento. | Fila do SDR, primeiro |
| B | Liga no prazo da faixa B, confirma por telefone o que o quiz deixou em dúvida (valor da venda, time e histórico: as respostas de leads por mês e de CRM, 15.4) e só então marca. Se a confirmação cair num eliminatório, nutrição (15.11). | Fila do SDR, depois da A |
| C | Nada: não ocupa a agenda do Júnior. | Nutrição (5.3) |

Dentro de cada faixa, nota maior primeiro; no empate, quem entrou antes; quem estava em stand-by volta no dia marcado (15.6; #114). Depois das primeiras respostas reais, as faixas são conferidas contra quem agendou e comprou (`lead-score`, "Revisão programada"; outros-22). Nenhum aprendizado é tirado antes da amostra mínima.

---

## Status do SDR

Lista fechada, com os nomes do método (`metodo`, "As seis regras") e o estado nutrição (5.3; #114). Estágio e estado são duas colunas separadas: o estágio diz onde o lead parou no funil; o estado diz a situação do contato.

**Estágio** (só avança):

| Estágio | Quando, no funil-01 (5.2; #114) |
|---|---|
| captado | Terminou o quiz e deixou o contato. A faixa A também chega captada, e quem liga marca pré-qualificado (15.5) |
| pré-qualificado | Passou pela porta: faixa A, ou faixa B depois da confirmação do SDR |
| agendado | Call de Direcionamento marcada |
| realizado | A Call de Direcionamento aconteceu |
| venda | Comprou; o produto vendido vai num campo ao lado (ver abaixo) |

**Estado** (situação do contato):

| Estado | O que significa (o método só dá o nome; as definições abaixo são as de 5.2 e 5.3, aceitas em 09/11/2026, #114) |
|---|---|
| conversando | Há conversa em curso com o lead |
| tentativa | O SDR tenta contato e ainda não teve resposta |
| abandonado | Sumiu depois de esgotadas as tentativas (o número da operação do Júnior está em ficha-de-fatos#tentativas-ate-abandonado; no funil-01, vale só depois que o Júnior confirmar que a regra segue valendo, 5.3) |
| stand-by | Pausado, sempre com data de volta ao contato |
| perdido | Só quem disse não: "perdido é quem falou não". Sem motivo guardado; um motivo futuro só como lista fechada, nunca texto livre (6.5; #114) |
| nutrição | Fora da fila do SDR: eliminatórios, faixa C e a faixa B que cai num eliminatório na confirmação. É situação do contato, não posição no funil (5.3, 15.11; #114). Canal e conteúdo ainda não definidos |

Ao fim do relógio, nenhum lead da safra pode estar em conversando ou em tentativa (`metodo`). O relógio é contado da entrada do lead, que no funil-01 é o fim do quiz (#41; 5.2); o prazo do relógio é calibrado depois das primeiras safras, como manda o método (5.2).

**O que o método não nomeava** (5.3; #114):

- **Nutrição** entra na lista de estados (acima).
- **Não compareceu:** quem foi agendado e faltou continua em agendado, com estado tentativa, até remarcar, ser abandonado ou dizer não.
- **Qual produto foi vendido** (IASV ou Implementação Essencial) é um campo ao lado do estágio venda, e não um estágio novo: a venda da Essencial não conta para as vagas.

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
- A landing fica sem meta própria até haver uma amostra mínima de visitas; o tamanho da amostra também precisa ser decidido. Até lá, mede-se a passagem de visita para início do quiz e de início para fim do quiz, por versão e por origem (8.1; #114).
- Os nomes das etapas acima são os do método para uso interno e no corpo das peças; em títulos e chamadas de topo vale a regra de 22/10 (conflito-12, resolvido; `glossario`, verbete Etapas). "SDR" não vai para a comunicação de topo.

---

## Origens e links

Cada link do funil leva duas etiquetas fixas, em minúsculas e sem acento (5.5; #114): `utm_source` com o nome da origem e `utm_campaign` com `funil-01`. Origem fora da lista entra em branco. O banco grava a origem da primeira visita. Os eventos que não acontecem numa página (os do SDR, da Call e da venda) levam a entrega e a versão do quiz que a pessoa respondeu e a origem da primeira visita dela; etiqueta para separar anúncios só quando a Meta entrar (6.4; #114).

| Origem | utm_source | utm_campaign | Como o lead chega | MVP |
|---|---|---|---|---|
| Stories | stories | funil-01 | Link no stories | Sim |
| Bio | bio | funil-01 | Link da bio do perfil | Sim |
| Reels | reels | funil-01 | O reels não tem link clicável. O lead comenta uma palavra; o comentário dispara uma mensagem com o link etiquetado como reels, pela ferramenta de ficha-de-fatos#reels-ferramenta (#112) | **Reservada · fora do MVP até agora:** a ferramenta depende da ligação com o Instagram, que é da Meta (conexoes.md); quando entra é pergunta (prompts/11-fila-perguntas.md, 30.5) |
| E-mail | email | funil-01 | Link no e-mail | Sim |
| WhatsApp | whatsapp | funil-01 | Link na mensagem de WhatsApp | Sim |
| Meta Ads | meta-ads | funil-01 | Anúncio pago | **Reservada · fora do MVP** (a Meta está fora do MVP, conexoes.md) |

Forma do link: `[endereço da landing-page-01]?utm_source=stories&utm_campaign=funil-01`. O endereço da landing não está decidido neste documento.

**Palavra dos reels.** Fica para depois (ficha-de-fatos#reels-palavra; #112).

---

## Contador de escassez

Segue a regra de ficha-de-fatos#barra-de-resgates (#93), sem repeti-la aqui: a contagem é real, sai do Supabase, e o contador só aparece na página acima do limite registrado no campo. Até lá, nenhuma porcentagem de resgate e nenhuma barra de vagas.

- A contagem real depende deste funil, que está pendente (#90; conflito-04).
- Conta uma análise gratuita por pessoa que terminou o quiz e recebeu o diagnóstico, inclusive eliminatórios e faixa C, sem contar de novo quem refaz o quiz; e o contador nunca aparece no topo da página (5.7; #114). Quem desmarca a caixa de aceite não entra na contagem, porque nada vai ao banco (30.3).
- Não vale para o contador "Total gerado" do hero, que segue no conflito de credenciais com o Júnior e o Euclides (ficha-de-fatos#total-dos-dois; conflito-05).
- A urgência da oferta da IASV é outra coisa e segue ficha-de-fatos#urgencia (prompts/05-fila-perguntas.md, 4.9).

---

## Pendências que tocam o funil

| O que falta | Quem decide | Onde |
|---|---|---|
| Aprovação do funil-01 | O Júnior e o Euclides, com o item 1 da pauta (o Otávio aprovou este documento em 09/11/2026) | #90; #111; conflito-06, conflito-14 |
| Lead score como porta | O Júnior e o Euclides | #98; conflito-01, lacuna-12 |
| Consentimento e promessa percentual no quiz | Decididos pelo Otávio (#104; #110, exceção às regras de `provas-e-conformidade`); o item 29 da pauta continua com o Júnior e o Euclides | conflito-09; #104; #110 |
| O que acontece quando a pessoa desmarca a caixa | O Otávio | prompts/11-fila-perguntas.md, 30.3 |
| Nome público da Análise (nome, duração e condutor da Call de Direcionamento já decididos, #107) | O Otávio | conflito-02, lacuna-11; prompts/11-fila-perguntas.md, 30.1 |
| Preço e desenho da Implementação Essencial | Ver lacuna-03 | ficha-de-fatos#downsell-preco; ficha-de-fatos#downsell-desenho; 5.8 |
| Quem é o SDR | Não registrado | ficha-de-fatos#quem-agenda |
| Data de início do funil | Mantida pelo Otávio, aceitando alguns dias de atraso (#111) | ficha-de-fatos#inicio-do-funil; conflito-14 |
| Cobrança da Análise depois das gratuitas | O Otávio, na versão 2 do funil | 5.9 |
| Quando a ferramenta dos reels entra | O Otávio | #112; prompts/11-fila-perguntas.md, 30.5 |
| Meta da landing e tamanho da amostra mínima | O Otávio | 8.1 |

---

## Fontes

- Decisões #41, #51, #66, #67, #90, #92, #93, #95, #98, #100, #104 a #108, #110 a #112 e #114 (base/decisoes.md, v5).
- base/ficha-de-fatos.md (v4), base/lead-score.md (v3), base/metodo.md (v4), base/produto.md (v4), base/entregas-do-servico.md (v4), base/provas-e-conformidade.md (v4), base/lacunas.md (v6); dados/planta/planta.md (v4), "Quem grava e quem lê".
- conexoes.md; nucleo/regras/seguranca.md; GLOSSARY.md (verbetes Funil-01, Etapas, Barra de resgates).
- prompts/05-fila-de-trabalho.md, "Etapa 5 · Funil-01"; prompts/11-decisoes-de-09-11.md (respostas do Otávio de 09/11/2026); prompts/11-respostas.md.
