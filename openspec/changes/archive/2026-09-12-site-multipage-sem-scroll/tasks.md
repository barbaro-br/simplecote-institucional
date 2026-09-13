## 1. Shell global (`SiteLayout.astro`)

- [x] 1.1 Reestruturar o `<body>` em coluna flex de tela cheia (`flex h-dvh flex-col overflow-hidden`), tornar o header estático (remover `fixed` e o script de esconder ao rolar) e o `<main>` em `flex-1 min-h-0 overflow-hidden`. Verificar no `npm run dev` que as páginas não rolam verticalmente.
- [x] 1.2 Adicionar "Sobre nós" à navegação do header (desktop e menu mobile), ficando Home, Como funciona, Preços, Ajuda, Sobre nós. Verificar o link presente e navegável.
- [x] 1.3 Mover a faixa marquee (Sem fidelidade / Cancele quando quiser / Suporte em português / Grade ao vivo) de `precos.astro` para a base do `SiteLayout.astro` (persistente), removendo-a de `precos.astro`. Verificar a faixa visível em todas as páginas.
- [x] 1.4 Remover o `<footer>` global do `SiteLayout.astro`. Verificar que nenhuma página exibe rodapé.

## 2. Home (`index.astro`)

- [x] 2.1 Remover as seções "Como funciona" e "Planos" da home e deixar apenas `HeroFundo` + `DeckHero` preenchendo `h-full` do main. Verificar a home em tela cheia, sem scroll.

## 3. Como funciona em auto-play (`como-funciona.astro`)

- [x] 3.1 Criar a ilha `src/components/islands/PassosAutoPlay.tsx` com estado de passo ativo, avanço automático por timer, controles de pausar/voltar/avançar e respeito a `prefers-reduced-motion` (vira navegação manual). Verificar `npm run build` compila.
- [x] 3.2 Refazer `como-funciona.astro` para usar `PassosAutoPlay` em `h-full`, alinhando os 4 passos de texto com um mockup por passo. Verificar no navegador que os passos avançam sozinhos e os controles funcionam.

## 4. Preços compactado (`precos.astro`)

- [x] 4.1 Compactar tipografia/espaçamentos de `precos.astro` para os 3 planos caberem em `100vh`, mantendo o destaque do plano Essencial e os CTAs. Verificar `/precos` sem rolagem de página.

## 5. Ajuda compactada (`ajuda.astro`)

- [x] 5.1 Compactar `ajuda.astro` para caber em `100vh`, mantendo o FAQ em `FaqAccordion` com scroll interno (`overflow-y-auto`) no painel. Verificar `/ajuda` sem rolagem de página e perguntas expansíveis.

## 6. Página Sobre nós (`sobre-nos.astro`)

- [x] 6.1 Criar `src/pages/sobre-nos.astro` com `<title>`/`<meta description>` próprios e seções de intuito, história e contato ("fale aqui"), usando placeholders claros de copy (texto final a ser fornecido pelo humano). Verificar a página renderiza e as tags de SEO estão no HTML.

## 7. Revisão geral

- [x] 7.1 Rodar `npm run build` e inspecionar as 5 páginas (Home, Como funciona, Preços, Ajuda, Sobre nós): navegação ok, sem scroll de página, marquee fixa, sem footer.
- [x] 7.2 Buscar cada página com `curl` e confirmar que `<title>`, `<meta name="description">` e o conteúdo (planos, FAQ, passos, Sobre nós) estão no HTML sem JavaScript (sem regressão de SEO).
