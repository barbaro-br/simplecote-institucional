# Proposal: Polimento de Interface e Navegação

## Motivation
**Why are we making this change?**
Após a implementação das fundações em Astro e dos efeitos visuais avançados (3D, scrollytelling), a interface geral ainda precisa de polimento para atingir o padrão ouro (estilo "Vercel/Stripe/Linear"). O usuário sentiu falta de clareza na navegação (ausência de um botão Home explícito e do link "Como funciona" no cabeçalho), notou problemas de fluidez na rolagem da home page (ficando "preso" entre seções), e sentiu que os cards de preço e a página de ajuda estavam pouco estilizados para telas variadas.

**What value does it provide?**
- **Navegação imersiva e clara**: Um "Floating Glass Header" garante que as opções principais (incluindo "Como funciona" e retorno à Home via Logo) estejam sempre acessíveis.
- **Leitura fluida na Home**: A adoção de "Scroll Snapping" nas seções principais da Home transforma a página em um "deck de apresentação", eliminando a quebra visual de seções divididas na tela.
- **Clareza de Preços**: Cards de plano bem hierarquizados (plano central destacado, laterais minimalistas) facilitam a decisão e escalam melhor em dispositivos móveis.
- **FAQ amigável**: Um Accordion interativo na página de ajuda economiza espaço e deixa o site muito mais profissional.

## Proposed Change
**What exactly are we building?**
1. **Header Global (Glassmorphism)**: Substituir o menu estático por um header flutuante (`sticky top-4`) em forma de pílula translúcida. A Logo servirá como link para a Home (`/`), e adicionaremos "Como funciona" aos links.
2. **Scroll Snapping (Home)**: Transformar a estrutura da `index.astro` para usar CSS Scroll Snap. Cada seção (Hero, Como funciona, Planos) ocupará `100vh` e forçará o alinhamento da rolagem (`scroll-snap-type: y mandatory`).
3. **Redesign de Planos (`/precos`)**: Ajustar o CSS Grid da grade de planos para garantir flexibilidade em telas menores. Estilizar o plano "Essencial" com maior escala, e botões primários. Os planos laterais não terão borda ativa e terão botões transparentes com outline.
4. **Accordion FAQ (`/ajuda`)**: Criar um componente interativo (`FaqAccordion.tsx`) que substitui a lista crua de perguntas. Adicionar um micro-hero "Como podemos ajudar?" no topo da página.

## Affected Area
- **Capabilities**:
  - `site/navegacao` (Nova - Regras de header e navegação global)
  - `site/home` (Modificada - Adição do Scroll Snapping)
  - `site/precos` (Modificada - Estilização dos cards)
  - `site/ajuda` (Modificada - Acordeão de FAQ)
