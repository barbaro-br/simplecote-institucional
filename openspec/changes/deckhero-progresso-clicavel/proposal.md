## Why

As barrinhas verdes de progresso do hero (DeckHero) ficam no topo da seção, encostando/atrás do header fixo e transparente — visualmente "estranhas lá em cima". Além disso, hoje são apenas decorativas: não dá para clicar num segmento e pular para aquele slide. Vamos mover o indicador para perto dos controles e torná-lo navegável.

## What Changes

- **Reposicionar** o indicador de progresso segmentado do topo do `DeckHero` para a parte de baixo, junto dos controles (`‹ ⏸ ›`), eliminando a sobreposição com o header fixo.
- **Tornar clicável**: cada segmento vira um botão que leva ao slide correspondente.
- **Preservar** o comportamento existente: auto-rotação a cada 6s, animação de preenchimento (`deck-fill`), teclado (setas), swipe no mobile, pausa no hover/foco e respeito a `prefers-reduced-motion`.

## Capabilities

### New Capabilities

(nenhuma)

### Modified Capabilities

- `site/home`: o indicador de progresso do hero deixa o topo e passa a ficar junto aos controles, e cada segmento passa a ser um controle clicável de navegação entre slides.

## Impact

- `src/components/islands/DeckHero.tsx` — reposicionar o bloco de progresso e trocar `<span>` por `<button>` por segmento (com `aria-label` e `aria-current`).
- `src/styles/global.css` — o `@keyframes deck-fill` existente é mantido e reutilizado (sem mudança).
- Sem novas dependências; sem mudança de conteúdo, SEO ou links pro app.
