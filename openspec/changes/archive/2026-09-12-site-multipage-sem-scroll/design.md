## Context

Motivação: ver `proposal.md`. Estado atual relevante:

- `SiteLayout.astro` tem header `fixed top-0` (com JS de esconder ao rolar), `main` normal e um `footer` global. A marquee existe só dentro de `precos.astro`.
- Cada página é longa e rola: `index.astro` (hero + seções), `precos.astro` (hero + 3 cards + marquee), `ajuda.astro` (hero + vídeos + FAQ), `como-funciona.astro` (hero + scrollytelling com `ScrollytellingMockups` acionado por `ScrollTrigger`).
- Constraint dura do projeto: Astro static output, SEO no HTML (sem JS), ilhas React só onde há estado real. O "sem scroll" não pode esconder conteúdo do HTML (FAQ, planos, textos devem continuar no HTML gerado).

## Goals / Non-Goals

**Goals:**

- Shell de "app" em tela cheia: header no topo, marquee no rodapé, conteúdo central em `100vh` sem rolagem de página.
- Home = só o `DeckHero`; Como funciona = passos em auto-play; Preços/Ajuda = conteúdo compactado; nova página Sobre nós.
- Remover o footer e tornar a marquee persistente.

**Non-Goals:**

- Não tocar em `/para-supermercados` (landing de SEO separada, fora do header).
- Não remover conteúdo nem alterar dados de planos/FAQ; só redistribuir/compactar.
- Não inventar a copy da página Sobre nós (vem do humano).

## Decisions

### 1. Shell em flex column (sem `position: fixed` no header)

`SiteLayout.astro` vira uma coluna flex de altura de tela:

```
<body class="flex h-dvh flex-col overflow-hidden">
  <header>            <!-- estático, no topo -->
  <main class="flex-1 min-h-0 overflow-hidden"> <!-- conteúdo por página -->
  <marquee strip>     <!-- faixa persistente, na base -->
</body>
```

O header deixa de ser `fixed` (o JS de esconder-ao-rolar é removido, pois não há scroll). Assim o `<main>` ocupa exatamente o espaço entre header e marquee, e cada página usa `h-full` sem rolagem.

**Alternativa:** manter header/marquee `fixed` e dar `padding` no main — descartado por exigir calcular alturas e sobreposições manualmente.

### 2. Home = DeckHero preenchendo o main

`index.astro` passa a renderizar só `<HeroFundo>` + `<DeckHero>` preenchendo `h-full`. O `DeckHero` já é `h-[calc(100svh-4rem)]`; ajusta para `h-full` dentro do `main`.

### 3. Como funciona: ilha de auto-play (substitui o scrollytelling)

Nova ilha `PassosAutoPlay.tsx` substitui o par "coluna de passos + `ScrollytellingMockups`". Ela mantém estado `passoAtivo` e um `setTimeout`/interval que avança o passo a cada N segundos (auto-play), renderizando o texto do passo (esquerda) e o mockup (direita) com animação de troca, mais controles de pausa/voltar/avançar. Os visuais dos passos reutilizam os componentes `telas/*Demo` já existentes.

- **Atenção de alinhamento**: hoje `ScrollytellingMockups` cobre 3 estados enquanto a coluna de texto de `como-funciona.astro` tem 4 passos. A ilha nova deve alinhar o número de passos (4, reutilizando o 4º texto já existente) e dar um mockup para cada passo.
- `prefers-reduced-motion`: com a preferência ativa, o auto-play não avança sozinho — vira navegação manual pelos controles (mesma filosofia do `DeckHero`).

**Alternativa:** manter o `ScrollytellingMockups` e apenas remover o `ScrollTrigger` — descartado, pois o componente foi desenhado para scroll; uma ilha nova de timer é mais simples e clara.

### 4. Preços e Ajuda compactados (com fallback de scroll interno)

`precos.astro` e `ajuda.astro` compactam espaçamentos/tipografia para caber em `100vh`. O FAQ da Ajuda continua em `FaqAccordion` (expandir/recolher no próprio painel); se muitas perguntas abertas excederem a altura, o painel do FAQ ganha `overflow-y-auto` (scroll interno) — sem rolar a página em si. O conteúdo (perguntas, planos) permanece no HTML gerado (SEO preservado).

### 5. Marquee persistente no layout

A faixa marquee (`Sem fidelidade`, `Cancele quando quiser`, `Suporte em português`, `Grade ao vivo`) sai de `precos.astro` e entra em `SiteLayout.astro` como a faixa de base persistente. O componente `Marquee` continua sendo reutilizado.

### 6. Header com Sobre nós + remoção do footer

Header ganha o link "Sobre nós" (nav: Home, Como funciona, Preços, Ajuda, Sobre nós). O `<footer>` é removido; suas informações (sobre o projeto, contato) migram conceitualmente para a nova `src/pages/sobre-nos.astro`.

### 7. Página Sobre nós (estrutura, copy TBD)

`sobre-nos.astro` usa `SiteLayout`, com `<title>`/`description` próprios e seções: intuito, história/backstory e contato ("fale aqui"). A copy não existe ainda (README atual é o starter padrão) — as tarefas entregam a estrutura com placeholders claros, e o texto final é fornecido pelo humano (não inventar).

## Risks / Trade-offs

- **[Risk] Conteúdo não caber em 100vh em telas baixas (notebook/mobile)** → Mitigação: compactar com tipografia/espaçamento responsivos e, onde fizer sentido (FAQ), permitir scroll interno no painel; validar em viewport baixa.
- **[Risk] Remover o header `fixed` quebrar páginas que ainda assumem offset** → Mitigação: revisar `pt-32`/`scroll-mt` das páginas para o novo shell em flex.
- **[Risk] Auto-play incomodar usuários** → Mitigação: controles de pausa/voltar e respeito a `prefers-reduced-motion`.
- **[Risk] Regressão de SEO ao compactar/esconder conteúdo** → Mitigação: todo texto (planos, FAQ, passos) continua no HTML do build; nada passa a depender de JS para existir.

## Migration Plan

1. Reestruturar `SiteLayout.astro` (shell flex, header estático com Sobre nós, marquee fixa, remover footer).
2. Ajustar `index.astro` para só o `DeckHero` preenchendo o `main`.
3. Criar `PassosAutoPlay.tsx` e refazer `como-funciona.astro`.
4. Compactar `precos.astro` e `ajuda.astro`.
5. Criar `sobre-nos.astro` (estrutura + placeholders de copy).
6. `npm run build` + inspeção visual nas 5 páginas; rollback = reverter os commits por página (cada etapa é independente).

## Open Questions

- Copy final da página "Sobre nós" (intuito, backstory, contato) — a ser fornecida pelo humano; não bloqueia a estrutura/tarefas (fica como placeholder).
