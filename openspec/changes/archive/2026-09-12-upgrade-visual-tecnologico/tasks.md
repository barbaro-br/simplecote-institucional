## 1. Setup e Dependências

- [x] 1.1 Instalar pacotes 3D adicionais: `npm install @react-three/drei --legacy-peer-deps` e verificar se a instalação ocorreu sem erros no package.json.
- [x] 1.2 Verificar utilitários GSAP e framer-motion: assegurar que `gsap` (e os plugins ScrollTrigger/SplitText) estão corretamente configurados no projeto. Validar importando o utilitário em um script vazio e rodando npm run build.

## 2. Implementação do Scrub Reveal (Tipografia)

- [x] 2.1 Criar componente React `ScrubText.tsx` (Ilha React) em `src/components/islands/` que recebe um texto e usa `gsap.SplitText` para separá-lo em palavras, aplicando `gsap.to` e `ScrollTrigger` para mudar a opacidade de cada palavra com base no scroll. Testar renderização isolada na home.
- [x] 2.2 Substituir textos fixos da seção de dores em `/para-supermercados.astro` (e em qualquer header principal compatível) pelas instâncias de `<ScrubText client:visible>`. Verificar visualmente rolando a página.

## 3. Implementação do Spotlight e Glow Dinâmico

- [x] 3.1 Refatorar a Ilha `SpotlightCard.tsx` para adicionar um contêiner global magnético (ou usar `motion.div` com `useMotionValue` para a posição X/Y). O gradiente CSS interno deve seguir o ponteiro continuamente através dos cards.
- [x] 3.2 Atualizar as instâncias de cards de preço na página `/precos.astro` e na seção de planos de `index.astro` para utilizar a nova versão da `SpotlightCard`. Passar o mouse pelo grid de planos e verificar visualmente se a "luz" viaja por debaixo dos limites dos componentes vizinhos.

## 4. Implementação do Scrollytelling

- [x] 4.1 Refatorar a seção `como-funciona` dentro de `src/pages/como-funciona.astro` separando o layout em duas colunas fixas: esquerda (texto longo rolável) e direita (espaço fixo/sticky). Verificar visualmente o comportamento "sticky" descendo a barra de rolagem.
- [x] 4.2 Criar `ScrollytellingMockups.tsx` (Ilha React) e injetar na coluna direita. Essa ilha usará `ScrollTrigger` (ou React Intersection Observer) atrelado a marcadores (`id="passo-1"`, etc) nos parágrafos da esquerda, trocando de estado (UI 1, UI 2, UI 3) com base no elemento visível.
- [x] 4.3 Verificar se o scroll aciona as trocas da Ilha sem quebrar o layout e se o efeito respeita os limites da seção.

## 5. Implementação do 3D Network Interativo (Hero)

- [x] 5.1 Refatorar `HeroShader.tsx` em `src/components/islands/` utilizando `@react-three/drei` (ou shaders GLSL melhorados) para gerar a nuvem/nós de rede em substituição à forma geométrica passiva anterior.
- [x] 5.2 Implementar captura de `pointer` no hook `useFrame` do `@react-three/fiber` para empurrar, puxar ou colorir os nós de acordo com o cursor do mouse. Testar passando o mouse no Hero da home page e confirmando no visual.
- [x] 5.3 Garantir a redução de movimento: Se `useDeveAnimar()` for falso, o canvas 3D deve cair para a versão estática e não iniciar o loop. Testar ativando o "Reduzir movimento" no SO do desenvolvedor.

## 6. Revisão Final e Build

- [x] 6.1 Rodar `npm run build` confirmando que todas as páginas constroem sem erros.
- [x] 6.2 Revisão visual ponta a ponta com `npm run preview` testando interações, scrolls e transições nos layouts `/`, `/precos`, `/como-funciona` e `/para-supermercados`.
