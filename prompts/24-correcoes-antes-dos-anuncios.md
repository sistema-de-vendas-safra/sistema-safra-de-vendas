# 24 · As correções antes dos anúncios

Pedido do Otávio, colado na conversa com o Claude em 25/11/2026. O texto abaixo é o do pedido, como veio. Resposta: prompts/24-correcoes-antes-dos-anuncios-resposta.md.

---

Contexto: o funil-01 vai ao ar com anúncios da Meta em 30/11/2026, com o anúncio levando direto ao quiz em https://svsafra.gotriad.com.br/analise/ (a landing sai do caminho do anúncio). Antes disso, cinco correções. Leia o CLAUDE.md e o log.md e siga as regras do repositório (versionamento, segurança, dados de teste, registro de decisões). Faça cada item com teste, registre no log.md e só prepare a publicação no fim, numa vez só.

1. RELATÓRIO DO QUIZ COM DADOS DE EXEMPLO
O teste de 18/11 mostrou de novo "Empresa Exemplo" e "400 leads no mês" no relatório (pendência "Relatório do eliminatório com números que não batem", 14.7). A causa registrada: o telaRelatorio usa sempre os CENARIOS fixos e, com a empresa vazia, o nome de exemplo. Corrija para que o relatório:
- use os números que a pessoa respondeu;
- quando ela não lembrar dos números, mostre o funil pelas metas do método, dizendo que são as metas, e não números dela;
- nunca mostre "Empresa Exemplo" (sem empresa, use "sua empresa").
Teste com três perfis: qualificado com números, faixa c sem números e não qualificado. Descreva o que cada um vê.

2. PROTEÇÃO CONTRA ROBÔ E LIMITE DE PEDIDOS NO GARÇOM
O log.md marca essa pendência como obrigatória antes de tráfego real. Proponha e implemente a proteção mais leve que funcione nas portas públicas (/api/fim-quiz e /api/evento). Considere: campo-armadilha invisível, tempo mínimo entre a abertura e o fim do quiz, validação de tamanho e formato do pacote, envio repetido com o mesmo e-mail em poucos minutos e limite de pedidos por IP (regra de limite de taxa no painel da Cloudflare ou no próprio Worker). Prefira o que não traz novo operador de dados. Se a melhor saída for o Turnstile, diga o impacto na política de privacidade antes de implementar. Nenhum lead verdadeiro pode ser recusado em silêncio: registre a contagem de recusas, sem dado pessoal. Liste o que eu preciso configurar no painel da Cloudflare.

3. ANÁLISE SEMPRE GRATUITA
Decisão do Otavio em 25/11/2026: a Análise Estratégica é sempre gratuita. Atualize a ficha-de-fatos#analise-gratuidade e todos os lugares que dependem dela, a começar pelo quiz ("Sem custo na promoção de lançamento" sugere uma promoção que acaba). Tire qualquer menção a cobrança da Análise depois da 10ª venda. Não mude o nome da Análise: o site usa "Análise Estratégica do Sistema de Vendas" e os OKRs usam "Análise Estratégica do seu Comercial". Liste onde cada nome aparece, que eu decido.

4. UTM_CONTENT NA ABERTURA DO QUIZ
Hoje o evento inicio_quiz guarda só utm_source e utm_campaign. Para medir a taxa de abertura do quiz para quiz completo por criativo (KR 2.1 dos OKRs), a abertura precisa guardar também utm_content, utm_term e utm_medium, lidos do endereço e saneados como no fim do quiz. Faça a migração nova (004), ajuste o registrar_evento, a página do quiz e o conferir.sql, e teste no PGlite.

5. LIMPEZA DOS DADOS DE TESTE
Amplie o roteiro de limpeza para tirar também a linha real do Otavio de 09/11/2026 (id_pessoa f794c36d-7116-4ab3-aec3-54a147de97bc), que não tem as marcas TESTE e @teste.invalid, junto com os eventos dela. O roteiro precisa contar antes e depois, no banco e nas duas abas da planilha (fila e respostas). Eu rodo depois do teste de ponta a ponta.

NÃO FAZER AGORA
- O bloco com as condições da garantia no /analise: ele espera os termos por escrito do Júnior e do Euclides. Deixe anotado no log.md.

PUBLICAÇÃO
Prepare tudo, rode os testes locais e me dê o passo a passo da publicação. A chave da Cloudflare nunca vem para a conversa: ela entra pela variável de ambiente, e no fim eu apago a variável e revogo o token. No mesmo passo a passo, lembre o que ainda está aberto no log.md sobre o token de 12/11 e sobre as chaves antigas (JWT) do Supabase, que precisam ser aposentadas antes de ir ao ar.

FORMATO DA RESPOSTA
1. Tabela com os itens 1 a 5: o que mudou · arquivos e versões · teste feito · situação.
2. O que eu faço no painel da Cloudflare e no Supabase, em passos numerados.
3. O que depende de decisão minha.