---
id: banco-rascunho
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: planta-do-banco
    versao: 2
  - id: funil-01
    versao: 2
  - id: lead-score
    versao: 2
  - id: funil-01-planilha-sdr
    versao: 1
  - id: ficha-de-fatos
    versao: 3
  - id: regra-seguranca
    versao: 1
  - id: lacunas
    versao: 5
desatualizado: true
---

# Banco · rascunho

O rascunho do banco de dados dos leads do funil-01, escrito a partir de dados/planta/planta.md, pronto para quando houver conta no Supabase. **Nunca foi executado em nenhum banco.** Nada daqui está no ar, e nenhum dado é real.

**Status.** Rascunho, pendente do Otávio. Nasce desatualizado, porque se apoia em documentos marcados (planta-do-banco, funil-01, lead-score, planilha do SDR; regra provisória 11.1).

**Destino dos contatos em conflito · bloqueado para entrega até a decisão** (conflito-17, em base/lacunas.md). O lado 1 manda os contatos do quiz para uma conta nova do Triad CRM; o lado 2 (#90) manda para este banco pelo garçom e para a planilha do SDR. Este rascunho segue o lado 2, como a planta e o funil-01, sem escolher: se o lado 1 vencer, ele vira só a especificação do que o CRM precisa guardar.

## O que tem dentro

| Arquivo | O que é |
|---|---|
| esquema.sql | As tabelas, as restrições, a função de gravação do garçom, a visão do painel, a contagem das análises gratuitas e as fechaduras, em Postgres para o Supabase. Comentários em português |

## O que o esquema faz

- **As quatro gavetas da planta**, com os mesmos nomes de tabela e de campo: `pessoas`, `eventos`, `entregas` e `investimento`. A gaveta `investimento` existe, mas está marcada como **fora do MVP** enquanto a Meta estiver fora (conexoes.md); nenhuma chave grava nem lê nela.
- **Etiquetas obrigatórias** (funil, entrega, versao_entrega, utm_source, utm_campaign) como NOT NULL em todo evento. As utm aceitam vazio, porque a planta manda gravar vazio o que veio fora da lista (5.5).
- **Listas fechadas como CHECK:** tipos de evento, estágios, estados, faixas do lead score, canais do SDR, sim ou não do consentimento, origens e campanhas da tabela de origens do funil-01, tipos de entrega. Valor fora da lista não entra. Nutrição fica de fora até a decisão de 5.3; `produto` existe e fica vazio até a mesma decisão.
- **Regras da planta como restrição:** pelo menos um canal aceito com texto e data do consentimento; fim do quiz sempre com pessoa, sessão, respostas e lead score; stand-by sempre com data_volta; venda leva o estágio venda e perda leva o estado perdido (6.5); o par entrega e versão precisa existir no catálogo (6.6); cada tipo de evento só pode ser gravado por quem a planta diz.
- **Evento não se apaga nem se reescreve:** uma trava recusa qualquer mudança, menos ligar à pessoa a visita e o início do quiz da mesma sessão no fim do quiz (6.2).
- **Pessoa repetida:** a função `registrar_fim_quiz` reconhece quem já está no banco pelo telefone ou pelo e-mail e liga o evento novo à mesma linha, sem o garçom ler nada (6.3).
- **Painel:** a visão `painel_numeros` só tem números agregados por mês, entrega e versão, origem, faixa e estágio. Nenhum nome, telefone, e-mail, resposta nem id_pessoa.
- **Análises gratuitas:** a visão `contagem_analises_gratuitas` devolve só quantas foram usadas, contando uma por pessoa que terminou o quiz (recomendação de 5.7, ainda não decidida). O total de ficha-de-fatos#analises-gratuitas e o limite de ficha-de-fatos#barra-de-resgates não são escritos no banco: quem compara é o contador, que não vai ao ar até a decisão de 5.7 (6.7).

## As fechaduras

- Row level security ligada nas quatro tabelas, **sem nenhuma política**: anon e authenticated, os papéis de quem vem de fora no Supabase, não leem nem gravam nada. As permissões padrão deles também são retiradas, por garantia.
- **Só o papel de serviço grava**, e só pela função `registrar_fim_quiz`, que é a única coisa que o garçom chama (proposta, 18.2).
- As visões do painel e do contador não têm leitor além do Otávio até as chaves delas existirem (18.3).

## O que falta para funcionar

1. **Conta no Supabase**, com o e-mail do Safra e região São Paulo (conexoes.md, nucleo/regras/seguranca.md, regra 1). Ainda não existe; esta fila não cria contas.
2. **Detector de chaves ligado** antes da primeira chave (nucleo/regras/seguranca.md, "Detector de chaves"). Sem ele, nenhuma chave é criada.
3. **Chave de serviço no cofre:** só nas variáveis secretas da Cloudflare, para o garçom, e no .env do Mac, fora do Git. Registrar em conexoes.md onde mora e como revogar.
4. **Decisão do conflito-17** pelo Júnior e pelo Euclides (aprovação da #90).
5. **Prazo de guarda** (outros-23): por quanto tempo os dados ficam, o que acontece no fim do prazo e como se atende o pedido de apagar. Até a decisão, nada é apagado automaticamente, e a trava dos eventos não deixa apagar nem pelo garçom (6.8; 18.10).
6. Aprovação da planta (6.1) e deste rascunho pelo Otávio.
7. Rodar esquema.sql num projeto de teste do Supabase, conferir as restrições com o pacote do exemplo do quiz e só então no projeto de verdade. Isso não foi feito: não há banco nesta máquina e esta fila não toca serviço real.

## Perguntas

prompts/07-fila-perguntas.md, 18.1 a 18.10.
