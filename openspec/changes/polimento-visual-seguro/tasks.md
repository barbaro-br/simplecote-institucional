# Tasks: Polimento Visual Seguro

## 1. Botões Magnéticos e Header
- [x] 1.1 Injetar o `<BotaoMagnetico client:load />` em `src/layouts/SiteLayout.astro`, para o botão principal da barra superior ("Criar conta").

## 2. Página de Preços & Grid da Home
- [x] 2.1 Refatorar o grid de planos na `src/pages/index.astro`. Manter o `SpotlightCard` em todos. Adicionar a classe `md:scale-105 z-10` ao cartão destaque e injetar `<BotaoMagnetico client:load />` em todos os CTAs de plano, usando a variação solid/outline (destaque vs normal).
- [x] 2.2 Replicar o mesmo refinamento do grid de planos (item 2.1) em `src/pages/precos.astro`.
- [x] 2.3 Substituir o `h1` e o `p` estático do Header de `src/pages/precos.astro` pelo componente `<ScrubText client:load>`.

## 3. Página de Ajuda & Accordion
- [x] 3.1 Criar componente React `FaqAccordion.tsx` dentro de `src/components/islands/` contendo a animação `AnimatePresence` do framer-motion.
- [x] 3.2 Em `src/pages/ajuda.astro`, importar e utilizar `<FaqAccordion client:load />` em vez da marcação `<details>` nativa.
- [x] 3.3 Em `src/pages/ajuda.astro`, substituir o `h1` de título principal pelo componente `<ScrubText client:load>`.

## 4. Revisão
- [x] 4.1 Rodar `npm run build` para garantir que o SSR destas novas ilhas ou scripts não geram falhas, checar na visualização se o Scroll e Navegação originais permanecem íntegros.
