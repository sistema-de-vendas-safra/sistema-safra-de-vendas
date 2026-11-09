# 12 · Apresentação visual do funil-01

Escrito em 09/11/2026, 11h30, pelo mentor. **Rodar só depois que a fila 11 terminar** (prompts/11-decisoes-de-09-11.md), para a apresentação já sair com as decisões de 09/11 aplicadas.

## Para que serve

Uma apresentação que mostra o funil-01 inteiro, do primeiro clique à venda, para o Otávio levar à reunião com o Júnior e o Euclides e para quem entrar no projeto depois. O público entende de vendas e não entende de tecnologia: tudo em português de gente, uma ideia por slide, mais desenho do que texto.

## Como trabalhar

- Leia CLAUDE.md. Valem todas as regras da casa, inclusive a Regra de pausas (dúvidas em prompts/12-perguntas.md, pelo caminho conservador) e nunca travessão (use ponto médio).
- Um subagente escreve, outro, que não viu a escrita, revisa (conteúdo contra a base; visual nos prints de cada slide). Commit no fim ("12 · apresentacao do funil-01"). Este arquivo entra no commit.
- **Fonte de tudo é a base**, na versão em vigor depois da fila 11: funis/funil-01/funil.md, base/lead-score.md, base/ficha-de-fatos.md, base/metodo.md, base/decisoes.md, funis/funil-01/planilha-sdr.md e roteiros-sdr.md, dados/planta/planta.md, conexoes.md, entregas/prototipo-funil-01/. Fato não se copia de memória: cada número sai da ficha de fatos, e o rodapé de cada slide cita os ids e versões de onde veio. Fato em conflito ou bloqueado aparece como selo "a definir", nunca como número.
- Nenhum dado pessoal real, nenhuma chave, nenhum endereço de painel. O endereço do protótipo pode aparecer (é de teste e tem noindex). Exemplos de lead só com as pessoas de mentira do LIGAR.md.

## Formato

- entregas/apresentacoes/funil-01-visao-geral/: um index.html só, slides 16:9 (1920×1080), navegação por setas e por clique, número do slide no canto, modo de impressão com um slide por página. Sem dependência externa: fontes servidas junto (a mesma solução da 10.7), nenhuma chamada a terceiros.
- Visual no design system v1.0 da casa (base/design-system/design-system.md e fontes/design-system-v1.0/). Diagramas desenhados em SVG no próprio arquivo: setas, caixas, trilhas, funil em barras. Imagens só os prints que o projeto já tem (entregas/prototipo-funil-01/prints/ e os prints do quiz). Contraste nível AA.
- README.md com o cabeçalho da casa (id funil-01-apresentacao, versao 1, rascunho, otavio pendente, depende_de com as versões usadas) e o mapa de slides.
- Prints de cada slide em 1920×1080 com a ferramenta de prints, numa pasta prints/. Um PDF gerado na hora para o Otávio revisar, fora do Git (pasta saida/ no .gitignore): o PDF final só vai ao Drive depois de aprovado.

## Roteiro dos slides

Um slide por linha. O desenho sugerido é linha geral: o escritor pode juntar ou dividir se ficar mais claro, e registra o que mudou.

1. **Capa.** "Funil-01 · do primeiro clique à Call de Direcionamento". Data e "rascunho para a reunião".
2. **Para que serve o funil.** Quatro verbos em quatro blocos: atrair, diagnosticar, qualificar, conversar. Uma frase em cada.
3. **O caminho do lead, inteiro.** Trilha horizontal com os passos do funil.md: origem, landing, quiz e diagnóstico, contato de quem liga, Call de Direcionamento, venda da IASV ou, só depois do não, a Implementação Essencial. Ramal para nutrição (eliminatórios e faixa C).
4. **De onde vêm os leads.** As origens com etiqueta (stories, bio, reels pelo ManyChat com palavra a definir, e-mail, WhatsApp) e a Meta Ads como reservada. Um exemplo de link etiquetado, desenhado como etiqueta.
5. **A landing.** Prints das duas variantes lado a lado (A e B), com o que cada bloco da página faz em uma linha. Selo "escolher uma na reunião" (pauta, 6a).
6. **O quiz.** Os blocos de perguntas (perfil, números do funil, causas, contato e aceite) e o que a pessoa recebe no fim. Print da capa do quiz.
7. **A porta de qualificação.** A nota do lead: eliminatórios, os quatro grupos de pontos e as faixas A, B e C numa régua de 0 a 100. Selo "pendente do Júnior e do Euclides" e a regra provisória do corte mais restritivo (14.2).
8. **O que acontece em cada faixa.** Quatro colunas: eliminatório, A, B, C, com o que quem liga faz e para onde o lead vai.
9. **O caminho do dado.** Landing, quiz, garçom, banco, planilha. Explicar o garçom com a analogia de sempre (ele leva o pedido à cozinha; a página nunca entra na cozinha) e as duas portas (uma que só grava, outra que só a planilha abre). Cadeados onde há chave, sem nome de chave.
10. **Privacidade em uma tela.** O aceite do quiz como ficou na fila 11, o prazo de guarda de 12 meses, onde o dado pessoal mora e onde nunca mora, e o noindex.
11. **A planilha de quem liga.** As colunas principais, a ordem da fila (15.6), o primeiro contato (15.10) e o tempo de chegada (de 1 a 6 minutos). Exemplo com as pessoas de mentira.
12. **O status do lead.** Estágios que só avançam (captado, pré-qualificado, agendado, realizado, venda) e os estados do contato (conversando, tentativa, abandonado, stand-by, perdido), num desenho de trilho com placas.
13. **As metas por etapa.** O funil em barras com as quatro metas da ficha e a conversão total como produto delas, com a leitura de trás para frente do método. Deixar claro que não é métrica de mercado.
14. **A Call de Direcionamento.** 60 minutos com o Junior Neves, sem custo, com a demonstração dos números do cliente (4.5); o que vem depois: IASV ou, só depois do não, a Implementação Essencial (preço em conflito vira selo "a definir").
15. **O que já está no ar.** O protótipo de teste (endereço, as três páginas) e o resultado dos testes de 09/11 em quatro marcas de conferido. Selo "só leads de teste".
16. **O que falta para ir ao ar.** Duas colunas: o que é dos sócios (itens da pauta que travam o funil, o destino dos contatos da #90 e conflito-17, a nota do lead) e o que é técnico (proteção contra robô, chaves antigas, doctype, limpeza dos dados de teste, Supabase Pro).
17. **Próximos passos.** Três, com dono e data quando houver.

## Ao terminar

prompts/12-apresentacao-resposta.md com: onde está, o mapa de slides, o que ficou como "a definir" e as perguntas. Responda em até 5 linhas, com o comando para abrir a apresentação no navegador.
