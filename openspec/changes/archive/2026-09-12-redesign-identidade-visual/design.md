## Context

Motivação: ver `proposal.md` (seção "Why"). Estado atual relevante:

- `src/styles/global.css` já define variáveis de marca (`--brand-navy`, `--brand-mint`, etc.) e um conjunto `--pnl-*` usado pelos "painéis" de demo, além de tokens `oklch` de compat com shadcn/ui e classes utilitárias (`@utility`) mapeadas para Tailwind v4.
- A tipografia é `system-ui` (sem fonte própria).
- Componentes (`.astro` puros e ilhas React) usam cores em parte via `var(--brand-*)`, em parte hardcoded (`text-white/80`, `bg-[var(--brand-mint)]`), sem uma escala única.
- Efeitos em `visual-fx` (Spotlight, shader, ScrubText, Marquee, BorderBeam) têm cores/durações próprias em `global.css`.
- Constraint dura do projeto: Astro static output, SEO no HTML (sem JS), ilhas React só onde há estado real. O redesign não pode reintroduzir JS desnecessário nem quebrar o HTML indexável.

## Goals / Non-Goals

**Goals:**

- Centralizar em `global.css` uma escala única de tokens (cor, tipografia, espaçamento, raios, sombras, motion) e mapeá-la para utilitários Tailwind consumidos por todo o site.
- Trocar `system-ui` por fontes variáveis auto-hospedadas (sans + mono de acento), sem requisição externa.
- Migrar os componentes/páginas de valores ad hoc para os tokens, mantendo a identidade dark navy + mint.

**Non-Goals:**

- Não mudar conteúdo, estrutura de navegação, dados de planos/FAQ, links pro app nem tags de SEO.
- Não trocar a stack de animação (GSAP/framer-motion) nem adicionar libs pesadas — só as fontes novas.
- Não reescrever componentes da Categoria A/B para ilhas React (regra central do projeto).

## Decisions

### 1. Escala de tokens unificada em `:root`

Substituir os tokens soltos por uma escala com nomes semânticos e manter o mapeamento `@utility`:

- Cor: `--bg` (fundo), `--surface`/`--surface-2` (painéis), `--border`/`--border-strong`, `--text-1`/`--text-2`/`--text-3` (três níveis de texto), `--accent` (mint), `--accent-bright` (mint claro). Os `--brand-*` atuais viram aliases desses tokens (mantidos por compat), e o `--pnl-*` passa a derivar de `--surface`/`--text-*`.
- Espaçamento/raio/sombra: tokens `--space-*` (opcional; Tailwind já cobre), `--radius-card`, `--radius-btn`, `--shadow-card`, `--shadow-glow`.
- Motion: `--motion-fast` (150ms), `--motion-base` (250ms), `--motion-slow` (400ms) e `--ease-soft`.

**Alternativa considerada:** manter os `--pnl-*` e adicionar novos nomes sem unificar — descartado, pois deixaria dois sistemas de cor convivendo e a inconsistência que motivou a mudança.

### 2. Fontes auto-hospedadas via `@fontsource-variable`

Adicionar `@fontsource-variable/inter` (corpo/títulos) e `@fontsource-variable/geist-mono` (números/labels técnicos), importadas no `global.css`. Fontsource empacota os arquivos `.woff2` como assets do próprio build (servidos pela Vercel), com `font-display: swap` — sem request externo, sem prejuízo de performance/SEO.

**Alternativa considerada:** Google Fonts via `<link>` — descartado por adicionar uma origem externa (request a mais, dependência de terceiros) e potencialmente prejudicar o LCP.

### 3. Migração de cores hardcoded para tokens

Trocar valores como `text-white/80` → `text-text-2` (utilitário mapeado a `--text-2`) e `bg-[var(--brand-mint)]` → `bg-accent`, em `SiteLayout.astro` (header/footer), nas páginas e nos componentes. Nos componentes `.astro` estáticos isso é markup; nas ilhas React é só trocar as classes Tailwind (sem mudar comportamento).

**Alternativa considerada:** aplicar tokens só nos novos componentes e deixar os antigos — descartado, violaria o requisito de "aplicação consistente".

### 4. Efeitos passam a ler tokens

`global.css` passa a usar `var(--accent)`/`var(--accent-bright)` e `var(--motion-*)` nas definições de `BorderBeam`, `Marquee`, `GridAnimado`, `TextoGradiente` (shimmer) e `flash-green`. Os shaders/glow das ilhas (`HeroFundo`, `SpotlightCard`, `ScrubText`) leem a cor de acento do design system em vez de hex próprio.

**Alternativa considerada:** expor os tokens via CSS modules/JS para as ilhas — desnecessário; basta ler as custom properties do DOM (as mesmas variáveis `:root`) nos pontos que já injetam estilo inline.

### 5. Acessibilidade/motion

Durações centralizadas em tokens e mantidas as checagens de `prefers-reduced-motion` já existentes (`reduzir-movimento.ts` e media queries). Nenhuma animação nova obrigatória; o redesign só refina o que já existe.

## Risks / Trade-offs

- **[Risk] Refatorar cores em muitos arquivos pode introduzir regressão visual** → Mitigação: migrar token a token (fundo → superfícies → texto → acento), rodando `npm run build` e inspecionando a home após cada passo (tarefas em chunks pequenos).
- **[Risk] Fontes novas podem mudar métricas e quebrar quebras de linha** → Mitigação: `font-display: swap` e conferência visual do header/hero/cards; ajuste pontual de `max-w`/`leading` só onde necessário.
- **[Risk] Shader/glow lendo token pode ter fallback quebrado se a variável faltar** → Mitigação: definir fallback estático no `var(--accent, #3fae7a)` e no CSS dos efeitos.
- **[Risk] `motion` e `framer-motion` coexistem no projeto (redundância)** → fora de escopo desta change (não remover dependência não exigida pela tarefa).

## Migration Plan

1. Consolidar tokens em `global.css` (aditivo, sem quebrar `--brand-*` existentes).
2. Adicionar fontes `@fontsource-variable/*` e aplicar no `body`.
3. Migrar `SiteLayout.astro` (header/footer) para os tokens.
4. Migrar páginas e componentes, uma página por vez (home → precos → ajuda → como-funciona → para-supermercados).
5. Migrar efeitos (`visual-fx`) para os tokens de cor/motion.
6. `npm run build` + inspeção visual; rollback = reverter o commit da etapa que quebrou (tokens são aditivos, então cada etapa é independentemente reversível).

## Open Questions

Nenhuma — as decisões de fonte e paleta refinada são diretas e não alteram specs nem a quebra de tarefas. (A escolha exata dos nomes de token pode variar levemente na implementação, sem efeito observável.)
