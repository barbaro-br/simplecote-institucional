# Design: Polimento Visual Seguro

## Architecture
- **Ilhas React (Islands Architecture)**: O polimento adicionará interatividade e animação através de ilhas React estritas e performáticas (`framer-motion` e `gsap`).
- **Nenhum bloqueio ao SSR**: Qualquer dependência de `window` deverá ser devidamente checada ou usada em um contexto client-side seguro (ex: `useEffect` em ilhas marcadas com `client:load` ou `client:visible`). 
- **Preservação de Navegação**: Nenhuma alteração no `SiteLayout.astro` que altere scroll e fluxo geral da página.

## Decisions

### 1. Hierarquia de Preços (Scale no grid)
- **Problem**: Destacar o plano Essencial sem destoar o layout e sem perder o efeito "Tech" do site.
- **Solution**: Manteremos a renderização dos cartões idêntica em `precos.astro` e `index.astro` com a ilha `SpotlightCard`. No entanto, envolveremos o cartão Destaque em uma classe `transform md:scale-105 z-10`, e faremos seu botão ser sólido (`bg-brand-mint text-black`), enquanto os demais usam `BotaoMagnetico` com estilo transparente e borda opaca.

### 2. Botão Magnético
- **Problem**: Trazer mais interação sofisticada aos botões.
- **Solution**: O arquivo `BotaoMagnetico.tsx` já portado para este repositório possui a implementação correta em `framer-motion` (react) de mola física (`stiffness`, `damping`). Substituiremos a chamada padrão `<a href="...">` pelo componente React `<BotaoMagnetico client:load />` em locais centrais (Navegação superior e Preços).

### 3. Títulos Animados (Scrub Text)
- **Problem**: Deixar as aberturas de `precos.astro` e `ajuda.astro` impressionantes.
- **Solution**: Usaremos a Ilha `ScrubText` já implementada para a página `para-supermercados.astro` envolvendo o `h1` destas páginas.

### 4. Reintrodução Segura do FAQ Accordion
- **Problem**: O Accordion criado na change anterior foi descartado no rollback de toda a interface.
- **Solution**: Criaremos e adicionaremos o componente `FaqAccordion.tsx` (Ilha React) diretamente dentro da página `ajuda.astro`, trocando a versão nativa `<details>`, garantindo uma interação suave usando `framer-motion`.

## Unresolved Questions
Nenhuma. Todo o impacto no SSR e UI core foi previamente mitigado pelo rollback da sessão anterior.
