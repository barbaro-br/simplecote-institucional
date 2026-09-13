# Proposal: Polimento Visual Seguro

## Motivation
**Why are we making this change?**
Após uma tentativa de redesenhar a navegação (que causou sobreposição no Hero) e alterar a física de rolagem do site (com CSS Scroll Snapping), revertemos a interface para preservar a fluidez original. No entanto, o objetivo de deixar o site com uma aparência e interação mais modernas ("tech") continua válido, desde que as alterações sejam *seguras* e não interfiram no layout, navegação ou rolagem natural.

**What value does it provide?**
Um visual polido e tecnológico (estilo Vercel/Stripe) que aumenta a percepção de valor do produto, através de micro-interações elegantes que recompensam a navegação do usuário, sem criar frustrações.

## Proposed Change
**What exactly are we building?**
1. **Hierarquia de Preços Suave**: Manter o uso do `SpotlightCard` (brilho tecnológico) em todos os cartões de preço, mas dar ao cartão do meio (Essencial) um destaque sutil de escala (`scale-105` ou similar) e um botão principal ligeiramente mais vibrante.
2. **Botões Magnéticos**: Integrar a ilha React `BotaoMagnetico.tsx` (já existente no repositório) nos botões de CTA principais (como "Criar conta") para que acompanhem sutilmente o movimento do mouse em *hover*.
3. **Scrub Text em Títulos Internos**: Aplicar o efeito de opacidade ao rolar (`ScrubText.tsx`) aos títulos principais das páginas `/precos` e `/ajuda`, aumentando a coerência visual com a página "Para Supermercados".
4. **Accordion de Ajuda**: Reintroduzir a ilha `FaqAccordion.tsx` na página de `/ajuda`, substituindo o `<details>` HTML por uma animação suave via `framer-motion`, mantendo a página limpa e esteticamente moderna.

## Affected Area
- **Capabilities**:
  - `site/precos` (Modificada - Hierarquia nos cards)
  - `site/ajuda` (Modificada - Accordion e Scrub Text)
  - `site/componentes-visuais` (Nova - Botões Magnéticos e aplicação de Scrub Text global)
