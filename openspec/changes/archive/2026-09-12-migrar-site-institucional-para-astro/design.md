## Context

Fonte de tudo: `simplecote-front/src/site/**` (repositório irmão, React). Este repositório (`simplecote-institucional`) já está inicializado com Astro + `@astrojs/react` + Tailwind v4, e `src/layouts/SiteLayout.astro` já resolve o problema de SEO (título/descrição reais no HTML). Falta portar o conteúdo real.

**Como acessar a fonte**: `simplecote-front` é um repositório separado, no mesmo diretório pai (`../simplecote-front/` a partir daqui, se ambos estiverem clonados lado a lado — confirme o caminho local antes de começar). Cada tarefa abaixo diz exatamente qual arquivo ler de lá.

## Goals / Non-Goals

**Goals:**
- Cada página nova bate o mesmo conteúdo textual e visual da página React equivalente — isso não é uma reescrita de copy, é uma migração de mecanismo.
- Seguir rigorosamente a classificação de 3 categorias (abaixo) — é o motivo inteiro desta migração existir.
- Ao final, `npm run build` gera HTML estático de todas as páginas, com título/descrição únicos por página, sem erro.

**Non-Goals:**
- Não é escopo desta change: apontar o domínio `simplecote.com.br` para cá (fica pra uma change de infraestrutura separada, só depois de revisão humana).
- Não é escopo: remover `src/site/` do `simplecote-front` (só depois que este site estiver no ar).
- Não é escopo: inventar copy nova além do que já existe nas páginas React — se uma página nova (`/como-funciona`, `/para-supermercados`) precisar de texto que não existe em lugar nenhum hoje, isso é uma tarefa de "escrever copy" que o humano faz, não o agente que implementa esta change.

## Decisions

### Decisão 1: tabela de classificação por arquivo (autoritativa — não reclassificar por conta própria)

Cada arquivo abaixo já foi lido e classificado. Um agente implementando as tarefas de `tasks.md` **não deve re-decidir a categoria** — só seguir esta tabela. Se encontrar um arquivo não listado aqui, pare e pergunte antes de decidir a categoria sozinho.

| Arquivo em `simplecote-front/src/site/` | Categoria | Motivo (confirmado lendo o código) |
|---|---|---|
| `tech/telas/TelaCard.tsx` | A (HTML puro) | Zero hooks, é wrapper de layout do mockup |
| `tech/telas/EmpresasDemo.tsx` | A | Zero hooks, markup estático |
| `tech/telas/RepresentantesDemo.tsx` | A | Zero hooks, markup estático |
| `tech/telas/ResultadoDemo.tsx` | A | Zero hooks, markup estático |
| `tech/Painel.tsx` | A | Só wrapper de layout, sem estado |
| `tech/EmbedYouTube.tsx` | A | Wrapper de iframe, sem estado |
| `BrandLogo.tsx` | A | Só imagem/SVG |
| `tech/BorderBeam.tsx` | **C (ilha React)** | Efeito complexo. Mantido como React original para fidelidade. |
| `tech/Marquee.tsx` | **C (ilha React)** | Idem. |
| `tech/GridAnimado.tsx` | **C (ilha React)** | Idem. |
| `tech/TextoGradiente.tsx` | **C (ilha React)** | Idem. |
| `tech/CardTilt.tsx` | **C (ilha React)** | Usa `motion/react`. Mantido em React para idêntica física de mola. |
| `tech/CursorMais.tsx` | **C (ilha React)** | Idem. |
| `tech/BotaoMagnetico.tsx` | **C (ilha React)** | Idem. |
| `tech/SpotlightCard.tsx` | **C (ilha React)** | Idem. |
| `tech/RevealSecao.tsx` | **C (ilha React)** | GSAP com React. Mantido para evitar refatoração com perda visual. |
| `tech/gsap-scroll.ts` | **C (suporte)** | Utilitário usado pelas ilhas de GSAP. |
| `tech/useReduzirMovimento.ts` | **C (suporte)** | Hook React original mantido para as ilhas. |
| `tech/useViewportLarga.ts` | **C (suporte)** | Idem. |
| `tech/DeckHero.tsx` | **C (ilha React)** | `useState`/`useEffect` de verdade: troca de slide, teclado, swipe, pausa. `client:load` (é o hero, primeiro conteúdo visível) |
| `tech/GradeAoVivoDemo.tsx` | **C** (dentro da ilha do DeckHero) | `useState`/timer simulando preço mudando — não precisa de ilha própria, é renderizado pelo `DeckHero` |
| `HeroFundo.tsx` | **C (ilha React)** | `useState` (detecção de WebGL, fallback de erro) + Error Boundary (feature de React) — `client:load`, é o fundo fixo da página inteira |
| `HeroShader.tsx` | **C** (dentro da ilha do HeroFundo, lazy) | `@react-three/fiber`/Three.js/GLSL — mantido como está na v1; reescrever sem React fica pra depois, não é bloqueador |
| `planos.ts` | Dado (copiar como `.ts`, sem mudança) | Array de dados puro, sem React |
| `seo.ts` | **Não portar** | Substituído inteiramente pelas props do `SiteLayout.astro` já existente aqui |

### Decisão 2: estrutura de ilha — uma ilha por "região da página", não por componente

`DeckHero` e `HeroFundo` viram **duas ilhas React separadas** (`client:load` as duas, uma é o fundo fixo, outra é o conteúdo do hero) — não uma ilha por componente filho. Os filhos de cada uma (`GradeAoVivoDemo`, os `telas/*Demo`, `HeroShader`) continuam sendo componentes React normais **dentro** dessas ilhas, importados normalmente — não precisam de `client:*` próprio.

### Decisão 3: uma pasta por categoria, para o próximo agente nunca ter dúvida de onde por um arquivo novo

```
src/components/
├── static/     Categoria A — .astro puro
├── enhanced/   Categoria B — .astro + <script>/CSS, ou .ts utilitário puro
└── islands/    Categoria C — .tsx, só aqui que client:load/visible aparece
```

### Decisão 4: dados de FAQ e planos são copiados, não importados entre repositórios

`planos.ts` (`simplecote-front/src/site/planos.ts`) e `faq.ts` (`simplecote-front/src/admin/ajuda/faq.ts`) são copiados como arquivo `.ts` de dados puro pra dentro deste repositório. Os dois repositórios não importam um do outro (são deploys/repos independentes) — se o conteúdo de planos ou FAQ mudar, é preciso atualizar os dois lugares manualmente. Aceito conscientemente (Risks abaixo).

## Risks / Trade-offs

- **Duas cópias de FAQ/planos podem divergir** com o tempo (editou um lado, esqueceu do outro). Mitigação futura possível (fora de escopo agora): mover pra uma API/CMS que os dois consomem. Por ora, aceito.
- **`HeroShader` continua com React-three-fiber** — não é o "Astro mais puro possível", mas reescrever Three.js vanilla é trabalho real (câmera, render loop, cleanup) pra um ganho de bundle pequeno frente ao próprio Three.js. Revisitar só se o tamanho do bundle virar problema medido de verdade.
- **Quem implementar isso sem ler `AGENTS.md`/este `design.md` primeiro vai, quase certamente, colocar tudo como ilha React "pra não ter que pensar"** — isso é o erro mais provável e mais caro (desfaz o motivo da migração). `tasks.md` repete a categoria de cada arquivo pra reduzir essa chance.
