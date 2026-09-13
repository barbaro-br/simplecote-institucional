## Context

Veja `proposal.md` para a motivação (polimento de layout e navegação a partir do feedback). 
Já possuímos as bibliotecas de animação (`framer-motion`) e SSR do Astro rodando bem.

## Goals / Non-Goals

**Goals:**
- Implementar um header flutuante com blur para toda a navegação do site em `/src/layouts/SiteLayout.astro`.
- Aplicar `scroll-snap-type: y mandatory` na Home (`/index.astro`), certificando-se de que seções muito altas em telas pequenas não sejam corrompidas (utilizando verificações de view height ou desabilitando snap em mobile se for agressivo demais).
- Polir a grade CSS em `/precos.astro` para empilhar em colunas simples no mobile e destacar o elemento principal.
- Criar a ilha React `FaqAccordion.tsx` para `/ajuda.astro` utilizando `framer-motion` para animação suave de `height` (Animar de 0 para `auto`).

**Non-Goals:**
- Nenhuma dependência nova será introduzida, usaremos o Tailwind v4 atual e o `framer-motion` (motion/react).

## Decisions

### Decisão 1: Scroll Snapping Puramente CSS
Na Home, usaremos CSS nativo (`scroll-snap-type`) no contêiner principal e `scroll-snap-align: start` nas seções. Isso é 100% nativo e performático.
- **Alternativa (GSAP ScrollTrigger)**: Fazer pin via JS pode conflitar com o scroll livre e ser pior em performance de rolagem em dispositivos de baixo custo. O CSS Snap é fluido e "barato". Para evitar quebra em celulares muito pequenos, podemos habilitar o snap primariamente para viewports `md` ou maiores, ou garantir que a seção não exceda 100vh usando overflow control.

### Decisão 2: Acordeão de FAQ (Sanfona)
Utilizaremos `AnimatePresence` e `motion.div` em um novo componente React `FaqAccordion.tsx` que itera sobre `PERGUNTAS_FREQUENTES`. 
- **Alternativa (HTML nativo details/summary)**: Muito leve e sem JS, mas a animação nativa não pode interpolar altura perfeitamente em todos os browsers. Usaremos React para o padrão premium suave exigido na task.

### Decisão 3: Header Flutuante
O componente de navegação será encapsulado no `SiteLayout.astro`. Ele consistirá em um nav `fixed` (ou `sticky`) com `backdrop-blur` do Tailwind.

## Risks / Trade-offs

- **[Risk] Snap Scroll em telas pequenas**: Em telas de celular, se uma seção (como os 3 passos de Como Funciona) for maior que a tela, o snap impede a leitura do final do conteúdo.
- **Mitigação**: Habilitar o Scroll Snapping nas classes utilitárias apenas a partir do breakpoint `md:` (`md:snap-y md:snap-mandatory`), deixando a rolagem livre no celular onde telas são imprevisíveis.
