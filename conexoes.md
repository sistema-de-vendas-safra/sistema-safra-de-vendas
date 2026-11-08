# Conexões

Registro das contas e serviços do Sistema de Vendas Safra. Regras em nucleo/regras/seguranca.md.

**Nunca escreva senha, chave ou token neste arquivo.** Aqui só se diz onde a chave mora.

| Serviço | Para que serve | Login | Quem tem acesso | Onde a chave mora | Como revogar | Última troca |
|---|---|---|---|---|---|---|
| Gmail | Conta dona de todos os serviços do Safra | sistemadevendassafra@gmail.com (verificação em duas etapas ligada) | Otávio | a registrar (onde a senha está guardada) | Trocar a senha e encerrar sessões em myaccount.google.com, Segurança | a registrar |
| GitHub | Repositório do sistema | Organização do Safra, a criar; dona: conta otavio-gif | Otávio | Sem chave por enquanto (push pelo GitHub Desktop) | Remover membro ou token nas configurações da organização | a criar |
| Cloudflare | Hospedagem e domínio das entregas | sistemadevendassafra@gmail.com, a criar | a definir | Variáveis secretas da Cloudflare; .env no Mac | Painel da Cloudflare, API Tokens, revogar | a criar |
| Supabase | Banco de dados dos leads (região São Paulo) | sistemadevendassafra@gmail.com, a criar | a definir | Variáveis secretas da hospedagem; .env no Mac | Painel do Supabase, configurações de API, gerar nova chave | a criar |
| Google Drive | Arquivos do Safra (sem dado pessoal) | Dentro do Gmail do Safra | Otávio | Mesma conta do Gmail | Remover compartilhamentos; trocar a senha do Gmail | a registrar |
| Meta | Anúncios | Fora do MVP | · | · | · | · |
