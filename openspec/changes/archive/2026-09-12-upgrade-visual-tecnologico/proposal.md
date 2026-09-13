## Why

O site institucional já está migrado para Astro e indexável, mas seu visual precisa transmitir uma experiência premium de software (estilo "Vale do Silício", inspirada em Linear, Stripe, Vercel) para passar mais credibilidade a supermercados e fornecedores. As ferramentas para isso já estão no projeto (Ilhas React, Framer Motion, GSAP), só precisamos implementar efeitos altamente visuais sem perder os ganhos de SEO.

## What Changes

- **Scrollytelling (`/como-funciona`)**: O passo a passo será conectado ao scroll da página, atualizando uma UI ou mockups visuais interativos dinamicamente ao rolar a página.
- **Tipografia "Scrub Reveal" (`/para-supermercados`)**: Textos de alto impacto (dores do cliente) iniciarão opacos e vão "acendendo" em gradiente à medida que o scroll avança.
- **Hover Glow / Spotlight Dinâmico (`/precos` e `SpotlightCard`)**: Os cards de preços e diferenciais terão uma borda magnética/luminosa que segue o cursor, reforçando o aspecto high-tech.
- **3D Network Shader (`HeroFundo`)**: Substituir o fundo abstrato do shader por uma rede de nós de conectividade (pontos ligando supermercados a fornecedores) que reagem ao movimento do mouse.

## Capabilities

### New Capabilities

- `site/visual-fx`: Efeitos avançados e scrollytelling baseados em interação e scroll do usuário no site institucional.

### Modified Capabilities

- `site/como-funciona`: Adição da mecânica interativa de scrollytelling na página.
- `site/para-supermercados`: Adição de scrubbing de texto no copy das dores do cliente.

## Impact

- Modificação nas Ilhas React existentes (`SpotlightCard`, `HeroFundo`, `HeroShader`).
- Impacto positivo no engajamento visual sem impacto negativo no SEO (todas as melhorias são em Ilhas React que executam SSR no Astro).
- Uso intensivo de `gsap` e `framer-motion`.
