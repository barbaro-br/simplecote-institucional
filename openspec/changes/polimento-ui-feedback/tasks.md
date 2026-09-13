## 1. Header (`SiteLayout.astro`)

- [x] 1.1 Remover a linha/borda inferior do header (`border-b border-border/40`). Verificar no `npm run dev` que não há mais a linha branca sob o header.
- [x] 1.2 Destacar a aba ativa no nav (Home, Como funciona, Preços, Ajuda, Sobre nós) via `Astro.url.pathname`, com classe de acento (verde cintilante) e `aria-current="page"`, e adicionar efeito de hover nos itens. Verificar que a aba da rota atual fica destacada ao navegar.

## 2. Progresso do hero (`DeckHero.tsx`)

- [x] 2.1 Remover o bloco de barrinhas segmentadas clicáveis do `DeckHero`.
- [x] 2.2 Fazer o botão de play/pause ganhar um anel de progresso (SVG) que enche ao longo de `DURACAO_MS` a cada slide, reiniciando na troca.
- [x] 2.3 Adicionar uma fileira de pontos marcando o slide ativo (clicáveis para navegar), respeitando `prefers-reduced-motion` (anel estático). Verificar no navegador que o anel enche e o ponto ativo acompanha o slide.

## 3. Como funciona (`PassosAutoPlay.tsx` / `como-funciona.astro`)

- [x] 3.1 Expandir os passos de 4 para ~6 (criar conta, abrir cotação, convidar, acompanhar respostas, comparar ao vivo, fechar pedidos), reusando os textos já existentes no projeto e marcando copy nova para revisão. Verificar no navegador que os 6 passos aparecem.
- [x] 3.2 Dar um estado de visual (`VisualPasso`) para cada passo e reorganizar o indicador de progresso (pontos) para uma linha própria, fora dos botões voltar/pausar/avançar. Verificar que o progresso não fica mais entre os botões.

## 4. Preços (`precos.astro`)

- [x] 4.1 Ajustar o tamanho dos cards (padding/largura) e reforçar o hover (leve scale + glow via `SpotlightCard`/`CardTilt`), sem estourar a viewport única. Verificar `/precos` e o efeito ao passar o mouse.

## 5. Revisão

- [x] 5.1 Rodar `npm run build` e inspecionar Home, Como funciona e Preços: sem linha no header, aba ativa destacada, anel de progresso no hero, 6 passos com progresso organizado e cards com hover melhorado.
