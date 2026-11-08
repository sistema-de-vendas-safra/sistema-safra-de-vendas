# LEIA PRIMEIRO — Quiz de diagnóstico de vendas da Triad

Este pacote é para quem vai continuar e melhorar o trabalho (pessoa e a IA dela). Leia esta página, depois o CLAUDE.md e o MANUAL.

## O que é

Um quiz de captação de leads da Triad. A empresa responde perguntas e descobre em qual etapa do funil de vendas (semente → fruto) o time perde performance. Quem se qualifica é levado a falar com a equipe da Triad.

**Hoje é um PROTÓTIPO navegável.** Nada é enviado para lugar nenhum e todos os dados são de exemplo.

## Como abrir

1. Dois cliques em `mockups/quiz-diagnostico.html` (abre no navegador).
2. O botão "Telas", no canto, pula para qualquer tela.
3. Versão publicada: https://claude.ai/artifact/17JTWaexKKBRgP9A2D5P4M
4. No ar (Cloudflare, atualiza sozinho a cada envio ao GitHub): https://sistema-de-vendas-safra-quiz01.sistemadevendassafra.workers.dev

## Onde está cada coisa

| Arquivo | Para que serve |
|---|---|
| `CLAUDE.md` | As decisões já tomadas. **Ler antes de mexer em qualquer coisa.** |
| `MANUAL DO DIAGNÓSTICO (RASCUNHO).md` | A lógica do diagnóstico: metas, perguntas de causa, combinações entre etapas, dinheiro na mesa e tom da explicação. |
| `REA - FULL STACK MARKETING.md` | Engenharia reversa, peça por peça, do site de referência fullstackmarketing.com.br. É o modelo de estrutura do quiz. |
| `mockups/quiz-diagnostico.html` | O protótipo (um único arquivo). |
| `mockups/poster-junior.jpg` | Foto do Junior usada como cartaz no topo. |
| `docs/` | Cópia publicada no Cloudflare: o quiz (`index.html`) e a foto. Só esta pasta vai para a internet. Depois de mexer no mockup, atualizar esta cópia (ver CLAUDE.md). |
| `wrangler.jsonc` | Configuração do Cloudflare: publica só a pasta `docs/`. |

## Regras que não podem quebrar

1. **Metas do funil:** lead → pré-qualificado 50%; pré-qualificado → agendado 50%; agendado → reunião realizada 75%; reunião realizada → fechado 20%. No geral, cerca de 4%.
2. **Chamada pela dor**, sem nome de produto e sem a palavra "Safra". Texto do Junior: "Descubra onde sua equipe de vendas está perdendo performance". O copywriter ajusta o texto final.
3. **Identidade Triad:** capa escura, verde neon; abertura e conversa em fundo claro. Pergunta solta fora do balão, uma por vez, e tudo nascendo na mesma altura.
4. **Contato antes do resultado:** nome, e-mail e WhatsApp.
5. **Quem não se qualifica** (menos de 50 mil por mês ou sem vendedor) recebe o diagnóstico com uma chamada diferente: "Clique se você tem interesse que alguém da nossa equipe chame você...".
6. **O relatório mostra todos os pontos fracos**, não só o principal, e o "dinheiro na mesa" só no fim.
7. **Estrutura fiel ao site de referência** (ver a REA). Inspirar no formato, nunca copiar texto.
8. **Não inventar prova social** (depoimentos, números de clientes, logos).

## O que falta

- O Junior vai revisar o texto e a ordem das perguntas.
- Escrever as perguntas de causa das outras etapas (já estão no manual).
- Modo chute em todas as etapas, incluindo a pergunta de leads por mês no chute.
- Gravar o vídeo do Junior.
- Definir o critério final de pré-qualificado.
- A construção de verdade:
  - IA escrevendo o diagnóstico (a regra fixa acha a etapa fraca, a IA explica);
  - envio dos contatos para uma conta nova no Triad CRM, com a origem marcada;
  - validação real de telefone.

## Para a IA

Leia o CLAUDE.md e o MANUAL antes de mexer. Faça cópia de segurança antes de alterar. Mantenha a estrutura do mockup.
