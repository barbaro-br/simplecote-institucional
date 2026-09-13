## Why

O usuário pediu uma rodada de aprimoramento de interações: a animação do card de preço do meio está "por dentro" do card (quebra a tela) e deveria contornar o card todo; os 6 passos do "Como funciona" merecem previews interativos de verdade (preview do app, telinha de itens, carta de convite, lista de preços ao vivo, resultado e animação do pedido virando carta); a página de Ajuda pode ganhar um painel de vídeo fixo ligado a cada pergunta; e, em vez de pular de página sozinho para todos, um "modo apresentação" opcional.

## What Changes

- **Preços**: reposicionar a animação de borda do card destacado para contornar o card inteiro (não mais "por dentro").
- **Modo apresentação (opcional)**: adicionar um controle (ex.: botão/toggle no header) que, quando ativo, cicla automaticamente Home → Como funciona → Preços → Ajuda → Sobre nós a cada ~20–30s. Desligado por padrão — a navegação manual continua a regra.
- **Como funciona**: reconstruir os 6 previews interativos do painel visual — (1) preview do app no cadastro, (2) telinha adicionando itens à cotação, (3) carta/e-mail fluindo no convite, (4) lista de produtos com preços mudando ao vivo (mais barato em verde), (5) tela com os vencedores/preços finais, (6) animação do pedido virando carta enviada ao representante.
- **Ajuda**: layout em dois painéis — FAQ (textos) à esquerda e um painel fixo de vídeo à direita, que exibe o vídeo da pergunta clicada (embed do YouTube; link é placeholder até o humano gravar).

## Capabilities

### New Capabilities

(nenhuma)

### Modified Capabilities

- `site/como-funciona`: os passos passam a exibir previews interativos específicos por passo (não mais visuais estáticos).
- `site/navegacao`: adição de um modo de apresentação opcional que cicla as páginas automaticamente (desligado por padrão).
- `site/ajuda`: adição de um painel fixo de vídeo associado a cada pergunta do FAQ.

## Impact

- `src/pages/precos.astro` (reposicionar `BorderBeam`), `src/components/islands/PassosAutoPlay.tsx` (novos previews), `src/layouts/SiteLayout.astro` (toggle do modo apresentação + script de ciclo), `src/pages/ajuda.astro` + `src/components/islands/FaqAccordion.tsx` (painel de vídeo).
- Reutiliza componentes existentes (`GradeAoVivoDemo`, `ResultadoDemo`, `EmbedYouTube`) onde couber.
- **Fora de escopo**: o texto do "Sobre nós" (o usuário vai criar depois) e os links reais dos vídeos do YouTube (placeholder até serem gravados).
- Os nomes de produtos do passo 4 são dados fictícios de demonstração (como os "Fornecedor A/B/C" já existentes).
