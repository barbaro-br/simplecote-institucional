# AGENTS.md — simplecote-institucional

Lido por qualquer agente de código que trabalhe neste repositório (Antigravity, Claude Code, Gemini CLI, opencode…).
Regras curtas e duras. Se uma bater de frente com o que você "acha melhor": as regras ganham.

**Idioma da conversa:** responda sempre em pt-BR (texto de chat, updates, resumos, perguntas) — nunca em inglês, mesmo que a saída de uma tool venha em inglês.

## O que é este projeto

Site institucional (marketing) do SimpleCote — uma plataforma de **cotação competitiva (leilão reverso)**: um Comprador (supermercado) abre uma cotação e convida Representantes (fornecedores) a dar preço nos mesmos itens. Este repositório **não é o produto** — é a landing page pública (`simplecote.com.br`), separada de propósito do app de verdade (`simplecote-front`, React, roda em `app.simplecote.app`).

**Por que este repo existe separado, em Astro, e não dentro do `simplecote-front`:** o site institucional antigo era uma página React SPA (Vite) — funcional, mas com um problema real de SEO: os `<title>`/`<meta description>` de cada página eram escritos via `useEffect` (depois que o JavaScript carregava no navegador do visitante). Google até consegue renderizar JS às vezes, mas devagar e sem garantia; e ferramentas que **não** rodam JS (preview de link do WhatsApp, LinkedIn, muitos crawlers) não viam absolutamente nada de título/descrição. Astro resolve isso na raiz: cada página é HTML já pronto no momento do build, com as tags corretas — sem depender de JS rodar no cliente para existir.

**O app de verdade (`simplecote-front`) não muda nada com isso** — continua 100% React, é onde vive o login, cadastro, o painel do admin, a tela do representante. Este repo só cobre as páginas públicas de marketing (hoje: home, preços, ajuda; mais as novas descritas abaixo). Os botões "Criar conta"/"Entrar" daqui são links comuns (`<a href="https://app.simplecote.app/...">`), não redirects especiais.

## Regras de disciplina (toda change)

1. **Faça só o que a tarefa pede.** Nada de melhoria em código adjacente, arquivo novo, dependência ou abstração que a tarefa não exige.
2. **Edite o código ANTES de marcar `[x]`.** Nunca marque tarefa concluída sem um diff correspondente.
3. **Checagem de Saúde OBRIGATÓRIA:** depois de cada tarefa rode `npm run build` (o build do Astro já falha em erro de TS/markup). **Vermelho = pare.**
4. **Resolução de Erros e Limite de Tentativas:** se algo quebrar após sua alteração, no máximo **3 tentativas** de correção. Se falhar na 3ª, desfaça a alteração daquela tarefa (`git restore`/`checkout`) e chame o humano.
5. **Sem Commits:** não commite nem pushe. Deixe as mudanças no working tree, a menos que a tarefa diga explicitamente pra commitar.
6. **Nunca invente conteúdo/copy novo além do que a tarefa descreve** — texto de marketing é decisão do humano, não do agente. Se uma página pede um texto que a tarefa não forneceu, pare e pergunte.

## Regra central: o que vira HTML puro, o que vira JS sem React, o que vira ilha React

Esta é a decisão mais importante do projeto — errar aqui desfaz o motivo de migrar pro Astro. Antes de portar qualquer componente do `simplecote-front` (`src/site/`), confira em qual categoria ele cai:

### Categoria A — HTML/CSS puro no Astro, ZERO JavaScript
Componentes que hoje são React só por estarem dentro de uma SPA, mas não têm nenhum `useState`/`useEffect` — são markup estático. Viram `.astro` puro (ou componente `.astro` reutilizável), **nunca** ilha React:

- `tech/telas/TelaCard.tsx`, `tech/telas/EmpresasDemo.tsx`, `tech/telas/RepresentantesDemo.tsx`, `tech/telas/ResultadoDemo.tsx` — são mockups estáticos de telas do produto (nenhum hook, só JSX condicional). Confirmado lendo o código: zero `useState`/`useEffect`.
- `tech/Painel.tsx`, `tech/EmbedYouTube.tsx` — wrappers de layout/iframe, sem estado.
- `BrandLogo.tsx` — provavelmente só SVG/imagem; confirme lendo antes de portar.

### Categoria B — precisa de JS no navegador, mas NÃO precisa de React
Componentes com interatividade real (hover, tilt, cursor customizado, scroll-reveal), mas cuja lógica não depende de React especificamente — hoje usam `motion/react` (Framer Motion) ou GSAP só pela conveniência de já estar num app React. Reescrever com CSS (`transition`/`@keyframes`) + um `<script>` inline no `.astro`, ou a mesma lib (GSAP é framework-agnostic) chamada direto, sem React:

- `tech/BorderBeam.tsx`, `tech/Marquee.tsx`, `tech/GridAnimado.tsx`, `tech/TextoGradiente.tsx` — só leem `useDeveAnimar` (checagem de `prefers-reduced-motion`), sem estado próprio. Viram CSS puro + a mesma checagem de `prefers-reduced-motion` via media query.
- `tech/CardTilt.tsx`, `tech/CursorMais.tsx`, `tech/BotaoMagnetico.tsx`, `tech/SpotlightCard.tsx` — usam `motion/react` pra seguir o mouse com física de mola. Dá pra fazer com `pointermove` + CSS `transform`/`transition` num `<script>` do próprio `.astro`, sem framework.
- `tech/RevealSecao.tsx` — usa GSAP puro (`gsap-scroll.ts`) pra animar entrada no scroll. GSAP já é framework-agnostic — só mover a chamada pra um `<script>` do Astro, sem precisar de React nem reescrever a lógica de animação.

### Categoria C — fica como ilha React de verdade (`client:*`)
Componentes com estado real que genuinamente precisam de um framework de UI — confirmados lendo o código, têm `useState`/`useEffect` fazendo trabalho de verdade:

- **`tech/DeckHero.tsx`** — o hero em formato "stories": troca de slide automática, teclado, swipe, pausa no hover/foco, barra de progresso. Usa `useState`/`useEffect` de verdade. Vira ilha com `client:load` (é o primeiro conteúdo visível da home, não dá pra esperar `client:visible`). Já embute `GradeAoVivoDemo` e os `telas/*Demo` como filhos — **não precisam virar ilha própria**, viajam junto na mesma ilha do `DeckHero`.
- **`tech/GradeAoVivoDemo.tsx`** — simula preços mudando sozinhos (setInterval/timer com `useState`). Genuinamente interativo. Fica dentro da ilha do `DeckHero` (é renderizado por ele, não precisa de ilha própria separada).
- **`HeroShader.tsx`** — fundo em WebGL (`@react-three/fiber` + Three.js + GLSL). Reescrever sem React é possível (Three.js puro), mas é trabalho real pra ganho pequeno (o peso é do Three.js, não do React-three-fiber). Manter como ilha `client:visible` na primeira versão; **não** é bloqueador pra lançar.

**Nunca** transforme um componente da Categoria A ou B em ilha React "pra não ter que pensar" — isso reintroduz o problema de JS desnecessário que motivou a migração inteira.

## Stack e comandos

- Astro (static output) + `@astrojs/react` (só pras ilhas da Categoria C) + Tailwind v4 (`@tailwindcss/vite`).
- `npm run dev` (porta 4321) · `npm run build` (gera `dist/`, estático) · `npm run preview`.
- SEO de cada página: `<title>`/`<meta name="description">`/`<meta property="og:*">` são **props do layout** (`src/layouts/SiteLayout.astro`), nunca `useEffect` nem string solta espalhada — sempre passe por ele.
- Reaproveitar assets (logo, ícones) do `simplecote-front` copiando o arquivo — não importe entre os dois repositórios.

## Arquitetura (alvo)

```
src/
├── layouts/
│   └── SiteLayout.astro       título/descrição/og:image por página, importa global.css
├── pages/
│   ├── index.astro            home (categoria 1/2 do dicionário de palavras-chave)
│   ├── precos.astro
│   ├── ajuda.astro
│   ├── como-funciona.astro    nova — mecanismo (categoria 3)
│   └── para-supermercados.astro   nova — dor + categoria (categoria 1+2)
├── components/
│   ├── tech/                  Categoria A/B — .astro + CSS/script inline, sem React
│   └── islands/                Categoria C — .tsx, importados nas páginas com client:load|visible
└── styles/global.css
```

## Como rodar

`npm install && npm run dev` — sem backend, sem `.env` (site estático, nenhuma chamada autenticada de API). Se alguma página precisar mostrar dado real do produto no futuro (não previsto agora), isso é uma decisão nova, não assuma.

## Deploy

Vercel, projeto `simplecote-institucional`, deploy automático a cada push em `main` (Git integration nativa da Vercel — **diferente** do `simplecote-front`, que usa GitHub Actions; aqui não tem workflow de CI configurado ainda). Domínio de produção (`simplecote.com.br`) **ainda não foi apontado pra cá** — enquanto isso não acontece, o domínio real continua servindo o site antigo (React) sem nenhum risco. Não mexa em domínio/DNS sem confirmar com o humano antes — é mudança de infraestrutura de produção, não de código.

## OpenSpec

Mudanças planejadas usam OpenSpec (`openspec/`): `propose` → `apply` → `archive`. Specs canônicas em `openspec/specs/**`. A change `migrar-site-institucional-para-astro` (se existir em `openspec/changes/`) é o roteiro completo de portação — leia `proposal.md`, `design.md` e `tasks.md` inteiros antes de tocar em qualquer página, e siga `tasks.md` **na ordem**, uma tarefa por vez, marcando `[x]` só depois do diff correspondente.
