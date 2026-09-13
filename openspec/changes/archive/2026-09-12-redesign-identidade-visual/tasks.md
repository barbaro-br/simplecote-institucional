## 1. Tokens de design em `global.css`

- [x] 1.1 Definir em `src/styles/global.css` a escala unificada de tokens no `:root` (fundo/superfícies/bordas, três níveis de texto, acento/accento-bright, raios/sombras, motion) mantendo `--brand-*` e `--pnl-*` como aliases, e mapear os utilitários `@utility` correspondentes. Verificar com `npm run build` que compila sem erro.
- [x] 1.2 Trocar as referências de cor hardcoded existentes no próprio `global.css` (shimmer, border-beam, scrollbar) para usarem `var(--accent)`/`var(--accent-bright)`/`var(--bg)`. Verificar no `npm run dev` que o gradiente do texto e a scrollbar mantêm o tom mint.

## 2. Tipografia de marca

- [x] 2.1 Adicionar as dependências `@fontsource-variable/inter` e `@fontsource-variable/geist-mono` ao `package.json` e importá-las no topo de `src/styles/global.css`. Verificar que `npm install` conclui e o build não reclama de asset de fonte.
- [x] 2.2 Aplicar a família sans no `body` e criar utilitário/token para a fonte mono de acento (números/labels). Verificar no navegador que o site deixa de usar `system-ui` e não dispara requisição externa de fonte (conferir aba Network).

## 3. Header e Footer (`SiteLayout.astro`)

- [x] 3.1 Migrar as classes de cor do header (nav, botão "Criar conta", menu mobile) de `text-white/80`/`bg-[var(--brand-mint)]` para os utilitários de token (texto/acento/borda). Verificar visualmente header no topo e após rolar a página.
- [x] 3.2 Migrar o footer (fundo, textos, links, divisórias) para os tokens de superfície/texto/borda. Verificar visualmente o footer na home.

## 4. Páginas (aplicação consistente dos tokens)

- [x] 4.1 Migrar `src/pages/index.astro` (hero e seções) para os tokens de cor/raio/sombra, mantendo o comportamento do DeckHero. Verificar `npm run build` e a home renderizando sem cores fora da paleta.
- [x] 4.2 Migrar `src/pages/precos.astro` (cards de plano e CTAs) para os tokens, preservando o destaque do plano recomendado. Verificar a página `/precos` visualmente.
- [x] 4.3 Migrar `src/pages/ajuda.astro` (micro-hero, FAQ/accordion) para os tokens. Verificar a página `/ajuda` visualmente.
- [x] 4.4 Migrar `src/pages/como-funciona.astro` (scrollytelling e mockups) para os tokens. Verificar a página `/como-funciona` e o scroll dos passos.
- [x] 4.5 Migrar `src/pages/para-supermercados.astro` (dores/scrub reveal) para os tokens. Verificar a página `/para-supermercados` e o scrub do texto.

## 5. Efeitos (`visual-fx`) alinhados aos tokens

- [x] 5.1 Fazer os efeitos de `global.css` (BorderBeam, Marquee, GridAnimado, TextoGradiente, flash-green) lerem as cores e durações de `var(--motion-*)`/`var(--accent)`. Verificar `npm run build` e as animações mantendo o mesmo ritmo/aparência.
- [x] 5.2 Fazer as ilhas (`HeroFundo`, `SpotlightCard`, `ScrubText`) lerem a cor de acento do design system (com fallback) em vez de hex próprio. Verificar o glow dos cards e o gradiente do scrub seguindo o token.

## 6. Revisão e acessibilidade

- [x] 6.1 Rodar `npm run build` e inspecionar as 5 páginas no navegador (home, precos, ajuda, como-funciona, para-supermercados) confirmando que nenhuma cor/texto ficou fora da paleta e que o layout não quebrou.
- [x] 6.2 Ativar `prefers-reduced-motion: reduce` e confirmar que animações decorativas são desativadas/simplificadas, e que o conteúdo continua legível.
- [x] 6.3 Buscar uma página com `curl` e confirmar que `<title>`, `<meta name="description">` e o conteúdo textual continuam presentes no HTML sem JS (sem regressão de SEO).
