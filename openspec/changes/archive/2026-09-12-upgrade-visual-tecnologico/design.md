## Context

Veja `proposal.md` para a motivação. O projeto já suporta Astro com SSR e possui ilhas React (usando framer-motion e gsap instalados). A arquitetura atual de componentes permite criar efeitos visuais avançados através dessas ilhas React.

## Goals / Non-Goals

**Goals:**
- Implementar o scrollytelling na página `/como-funciona` usando `gsap` com `ScrollTrigger`.
- Substituir animações simples por um "Scrub Reveal" dinâmico usando o `ScrollTrigger.create` e framer-motion ou gsap em `/para-supermercados`.
- Atualizar a estética do `SpotlightCard` (hoje baseado em tracking rudimentar) e aplicar um efeito de radial glow contínuo que usa custom properties (`--x`, `--y`) para criar a iluminação que segue o cursor.
- Transformar o WebGL de fundo em algo reativo (como um sistema de partículas ou conexões nodais em `@react-three/fiber`).

**Non-Goals:**
- Não reescrever toda a base do site ou abandonar o Astro SSR.
- Não introduzir bibliotecas pesadas de animação diferentes das que já estão (GSAP e Framer Motion).

## Decisions

### Decisão 1: Scrollytelling via GSAP e `position: sticky`
Para criar o painel interativo de `/como-funciona`, usaremos CSS `position: sticky` no contêiner visual (lado direito), e `gsap.ScrollTrigger` monitorando os "trigger elements" do texto (lado esquerdo).
- **Alternativa (framer-motion `useScroll`)**: Poderia ser usado, mas o GSAP `ScrollTrigger` tem mecanismos superiores de pinagem e scrub para layouts de scrollytelling. O projeto já usa `gsap`.

### Decisão 2: CSS Custom Properties para Spotlight
Para o hover glow dinâmico dos cards de preço, usaremos React apenas para capturar o `pointermove` em um contêiner pai e injetar `--mouse-x` e `--mouse-y`. O brilho (glow) será feito totalmente via CSS (`background: radial-gradient(...)`) para performance, já que re-renderizar o React a cada pixel movido seria custoso.
- **Alternativa**: Usar framer-motion `useMotionValue` atrelado ao `style`. (Também válido e performático). Vamos padronizar em `useMotionValue` para maior compatibilidade com as abstrações atuais do framer-motion, injetando no `motion.div`.

### Decisão 3: 3D Network Points via Drei (`@react-three/drei`)
O HeroFundo será melhorado utilizando `@react-three/drei` (ex: `Points` e `PointMaterial`) para criar uma malha rápida de nós. React Three Fiber é excelente para isso. Se `@react-three/drei` não estiver instalado, será adicionado.
- **Alternativa**: Escrever shaders GLSL manuais puros. Descartado para agilizar o desenvolvimento, a não ser que os shaders atuais já sejam suficientes com leves ajustes.

## Risks / Trade-offs

- **[Risk] Peso extra no client-side**: Shaders 3D complexos podem gastar muita bateria de dispositivos móveis.
- **Mitigação**: O `HeroFundo` e demais componentes deverão desligar ou simplificar substancialmente se `window.matchMedia('(prefers-reduced-motion: reduce)')` for ativado (usando os utilitários criados na migração). O 3D pode ser substituído por um fallback estático em celulares ou modo economia de dados.
