# Perguntas da fila da noite

## Etapa 11

11.1. **Pode um documento sair de desatualizado se ainda se apoia em outro marcado?**
   - *Dúvida:* a regra de versionamento marca desatualizado só quando a versão citada é menor que a atual; não diz o que fazer quando a dependência está na versão atual mas marcada (mecanismo e oferta, pela pergunta 4.5).
   - *O que foi feito:* na cascata da 6.9, só voltaram a false os documentos sem nenhuma dependência marcada (persona, produto, metodo, entregas-do-servico, lead-score). promessa, tom-de-voz, provas-e-conformidade, design-system, glossario, funil-01, planta, pauta, briefing, copy e estrutura subiram de versão com o depende_de atualizado, mas continuam marcados, porque se apoiam, direto ou por cadeia, no mecanismo e na oferta. Antes, briefing, copy, estrutura, pauta e planta estavam sem a marca, embora se apoiassem nos dois.
   - *Recomendação:* manter assim e escrever em nucleo/regras/versionamento.md, na Cascata: "um documento só sai de desatualizado quando nenhuma dependência estiver desatualizada". Responder a 4.5 libera a cadeia inteira de uma vez.
   - *Se decidir diferente:* se a marca valer só pela versão, voltam a false promessa, tom-de-voz, provas-e-conformidade, design-system, glossario, funil-01, planta, pauta, briefing, copy e estrutura, numa correção de forma; só mecanismo e oferta ficam marcados.
   - *Observação, sem ação:* as etapas 8 a 10 escreveram briefing, copy e estrutura sobre documentos marcados, e a regra diz que documento marcado não serve de base para entrega nova. Como os três são rascunho e nada vai ao ar, nada foi mexido; fica registrado para você ver junto com a 11.1.

## Etapa 12

- mecanismo e oferta seguem desatualizados e sem mudança: a atualização pede mudança de sentido. É o caso da pergunta 4.5 (prompts/05-fila-perguntas.md); nada novo a decidir aqui.

12.1. **As seções "Fontes" do briefing, da copy e da estrutura citam as versões antigas.**
   - *Dúvida:* no fim de cada um dos três documentos, a lista "Fontes" registra as versões lidas quando o texto foi escrito (por exemplo, persona v2, pauta v1, briefing v1). O cabeçalho já aponta para as versões atuais.
   - *O que foi feito:* a lista ficou como estava, como registro do que foi lido na escrita; só o cabeçalho e a nota "Documentos desatualizados" do topo mudaram (forma).
   - *Recomendação:* manter assim; o cabeçalho é o lugar da versão vigente, e a lista mostra a origem do texto.
   - *Se decidir diferente:* se a lista tiver de acompanhar o cabeçalho, os três sobem mais uma versão numa correção de forma, trocando as versões da lista pelas do depende_de.

