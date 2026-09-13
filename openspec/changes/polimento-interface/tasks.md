## 1. Header Global e Navegação

- [x] 1.1 Criar componente React `Navbar.tsx` (Ilha React opcional para mobile menu ou CSS puro em `SiteLayout.astro`) com fundo translúcido, fixado no topo da tela. Incluir Logo (com link para `/`), "Como funciona", "Preços", "Ajuda" e "Entrar" (CTA primário pequeno). Substituir/injetar no topo do `<SiteLayout>`. Rodar `npm run dev` e testar a navegação.

## 2. Scroll Snapping (Home)

- [x] 2.1 Envolver o conteúdo da `src/pages/index.astro` em um contêiner com `h-screen overflow-y-auto snap-y snap-mandatory` (apenas em `md:`).
- [x] 2.2 Ajustar as seções principais da Home (Hero, Como funciona, Planos, Footer) para terem a classe `snap-start` e garantirem que ocupem a tela de forma harmoniosa. Testar rolando o scroll na página inicial.

## 3. Redesign dos Planos (Preços e Home)

- [x] 3.1 Em `src/pages/precos.astro`, refatorar o botão do CTA: o plano Essencial (destaque) recebe fundo preenchido e cor de destaque, e os outros (Teste/Prof) recebem `border border-border` sem fundo.
- [x] 3.2 Remover a borda visível "ativa" (ou desativar SpotlightCard de fundo intenso) dos planos laterais para aumentar a importância hierárquica do plano do meio. Ajustar o grid de `index.astro` e `precos.astro`. Inspecionar visualmente.

## 4. Accordion FAQ (Ajuda)

- [x] 4.1 Criar a Ilha React `FaqAccordion.tsx` na pasta `src/components/islands/` que recebe a lista de `PERGUNTAS_FREQUENTES` e utiliza o `framer-motion` para expandir/recolher as respostas ao clicar.
- [x] 4.2 Em `src/pages/ajuda.astro`, adicionar um micro-hero com título "Como podemos ajudar?" e texto de apoio, e renderizar `<FaqAccordion client:load />` abaixo, em vez do HTML estático atual. Testar cliques na página de ajuda.

## 5. Revisão Geral

- [x] 5.1 Executar `npm run build` para garantir que as páginas renderizam sem problemas em SSR (sem erros de dependência global como `window`).
- [x] 5.2 Testar toda a navegação (Home -> Como funciona -> Ajuda -> Preços) e certificar que a Navbar persiste, o snap da Home é agradável, e o layout mobile não está quebrado.
