## Why

O site institucional já migrou para Astro (SEO real no HTML) e já tem uma base de efeitos "tech" (shader WebGL, scrollytelling, spotlight, botões magnéticos), mas a identidade visual ainda é fragmentada: tipografia é o `system-ui` padrão do navegador, as cores são aplicadas de forma ad hoc em cada componente, e não existe um sistema de design que garanta consistência entre as páginas. O objetivo é um **redesign de identidade visual completo** — tipografia, refinamento da paleta (mantendo o dark navy + mint), escala de espaçamento, raios e sombras — para elevar a percepção de produto premium, **mantendo a base Astro e os ganhos de SEO intactos**.

## What Changes

- **Sistema de design (tokens)**: centralizar em `global.css` os tokens de cor (paleta navy + mint refinada), tipografia, espaçamento, raios, sombras e duração/curvas de motion, substituindo os valores hardcoded espalhados pelos componentes.
- **Tipografia de marca**: trocar o `system-ui` por uma família tipográfica própria (sans de leitura + um acento mono para números/labels técnicos), auto-hospedada (sem request externo, preservando performance e SEO).
- **Refinamento da paleta dark**: ajustar a escala de tons de navy/mint (superfícies, bordas, texto com 3 níveis) para maior contraste e hierarquia, mantendo a identidade atual.
- **Aplicação consistente**: header, footer, hero, cards de planos, FAQ, scrollytelling e demais seções passam a consumir os tokens do design system em vez de valores soltos.
- **Motion consistente**: efeitos existentes (`visual-fx`) passam a usar as durações/curvas centralizadas e as cores de glow/accent do design system.

## Capabilities

### New Capabilities

- `site/design-system`: tokens e diretrizes da identidade visual (cor, tipografia, espaçamento, raios, sombras, motion) e a regra de que todas as páginas públicas consomem esses tokens de forma consistente, sem regressão de acessibilidade ou SEO.

### Modified Capabilities

- `site/home`: o requisito que hoje exige "a mesma experiência visual da home atual" passa a distinguir conteúdo/interação (preservados) da identidade visual (agora regida pelo `site/design-system`).
- `site/visual-fx`: os efeitos avançados passam a referenciar os tokens do design system (cores de glow/gradiente) e as diretrizes de motion centralizadas, em vez de valores próprios.

## Impact

- `src/styles/global.css` (tokens de design), `src/layouts/SiteLayout.astro` (header/footer/fonte) e os componentes/páginas que aplicam cores e tipografia.
- Nova dependência de fonte auto-hospedada (ex.: `@fontsource-variable/*`) — sem impacto em SEO, pois é asset local servido pelo próprio build.
- Ilhas de `visual-fx` (Spotlight, shader, scrollytelling, ScrubText) ganham referências aos tokens, sem mudança de comportamento observável além da aparência.
- Nenhuma mudança nos requisitos de SEO (`site/seo`), no conteúdo de planos/FAQ nem nos links pro app.
