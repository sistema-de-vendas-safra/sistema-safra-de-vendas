# Perguntas da fila da noite

## Etapa 11

11.1. **Pode um documento sair de desatualizado se ainda se apoia em outro marcado?**
   - *Dúvida:* a regra de versionamento marca desatualizado só quando a versão citada é menor que a atual; não diz o que fazer quando a dependência está na versão atual mas marcada (mecanismo e oferta, pela pergunta 4.5).
   - *O que foi feito:* na cascata da 6.9, só voltaram a false os documentos sem nenhuma dependência marcada (persona, produto, metodo, entregas-do-servico, lead-score). promessa, tom-de-voz, provas-e-conformidade, design-system, glossario, funil-01, planta, pauta, briefing, copy e estrutura subiram de versão com o depende_de atualizado, mas continuam marcados, porque se apoiam, direto ou por cadeia, no mecanismo e na oferta. Antes, briefing, copy, estrutura, pauta e planta estavam sem a marca, embora se apoiassem nos dois.
   - *Recomendação:* manter assim e escrever em nucleo/regras/versionamento.md, na Cascata: "um documento só sai de desatualizado quando nenhuma dependência estiver desatualizada". Responder a 4.5 libera a cadeia inteira de uma vez.
   - *Se decidir diferente:* se a marca valer só pela versão, voltam a false promessa, tom-de-voz, provas-e-conformidade, design-system, glossario, funil-01, planta, pauta, briefing, copy e estrutura, numa correção de forma; só mecanismo e oferta ficam marcados.
   - *Observação, sem ação:* as etapas 8 a 10 escreveram briefing, copy e estrutura sobre documentos marcados, e a regra diz que documento marcado não serve de base para entrega nova. Como os três são rascunho e nada vai ao ar, nada foi mexido; fica registrado para você ver junto com a 11.1.
