Convenção de todas as tarefas abaixo: "fonte" é sempre um caminho dentro de `simplecote-front` (repositório irmão); "destino" é sempre um caminho dentro deste repositório (`simplecote-institucional`). Categoria (A/B/C) conforme a tabela de `design.md` - Decisão 1. Depois de CADA tarefa: `npm run build` tem que passar limpo antes de marcar `[x]`.

## 1. Utilitários e dados (base para todo o resto)

- [ ] 1.1 Copiar `simplecote-front/src/site/tech/useReduzirMovimento.ts` → `src/lib/reduzir-movimento.ts`, adaptado pra não ser um hook React (é só uma checagem de `window.matchMedia('(prefers-reduced-motion: reduce)')` — vira uma função simples chamável de um `<script>` do Astro, ou mantém como hook só para uso dentro das ilhas de categoria C)
- [ ] 1.2 Copiar `tech/useViewportLarga.ts` → `src/lib/viewport-larga.ts`, mesma adaptação
- [ ] 1.3 Copiar `tech/gsap-scroll.ts` → `src/lib/gsap-scroll.ts` sem mudança (já é vanilla)
- [ ] 1.4 Copiar `simplecote-front/src/site/planos.ts` → `src/data/planos.ts` sem mudança de estrutura (é dado puro)
- [ ] 1.5 Copiar `simplecote-front/src/admin/ajuda/faq.ts` (array `PERGUNTAS_FREQUENTES`) → `src/data/faq.ts` sem mudança de estrutura
- [ ] 1.6 Copiar os assets referenciados (logo, imagens do hero, vídeo `/midia/animacao-marca.mp4`) de `simplecote-front/src/assets/` e `simplecote-front/public/` pra `public/` deste repositório, mantendo os mesmos nomes de arquivo usados no código copiado

## 2. Componentes Categoria A (HTML/CSS puro, `src/components/static/`)

Ler o `.tsx` fonte, portar o JSX pra `.astro` (sintaxe de template muda: `className`→`class`, sem `{}` de JS fora de expressão, sem hooks porque não têm nenhum) — o resultado visual tem que ficar pixel-idêntico.

- [ ] 2.1 `tech/telas/TelaCard.tsx` → `src/components/static/TelaCard.astro`
- [ ] 2.2 `tech/telas/EmpresasDemo.tsx` → `src/components/static/EmpresasDemo.astro`
- [ ] 2.3 `tech/telas/RepresentantesDemo.tsx` → `src/components/static/RepresentantesDemo.astro`
- [ ] 2.4 `tech/telas/ResultadoDemo.tsx` → `src/components/static/ResultadoDemo.astro`
- [ ] 2.5 `tech/Painel.tsx` → `src/components/static/Painel.astro`
- [ ] 2.6 `tech/EmbedYouTube.tsx` → `src/components/static/EmbedYouTube.astro`
- [ ] 2.7 `BrandLogo.tsx` → `src/components/static/BrandLogo.astro`

## 3. Componentes Categoria B (JS/CSS sem React, `src/components/enhanced/`)

Ler o `.tsx` fonte pra entender o EFEITO visual (não a implementação React) — reimplementar com CSS (`transition`/`@keyframes`) e, só quando o efeito exigir cálculo em tempo real (seguir o mouse, calcular ângulo de tilt), um `<script>` inline no `.astro` com vanilla JS. Testar visualmente comparando lado a lado com a versão React (`npm run dev` nos dois repos ao mesmo tempo, portas diferentes).

- [ ] 3.1 `tech/BorderBeam.tsx` → `src/components/enhanced/BorderBeam.astro` (efeito de borda animada)
- [ ] 3.2 `tech/Marquee.tsx` → `src/components/enhanced/Marquee.astro` (rolagem contínua horizontal)
- [ ] 3.3 `tech/GridAnimado.tsx` → `src/components/enhanced/GridAnimado.astro`
- [ ] 3.4 `tech/TextoGradiente.tsx` → `src/components/enhanced/TextoGradiente.astro`
- [ ] 3.5 `tech/CardTilt.tsx` → `src/components/enhanced/CardTilt.astro` (tilt 3D seguindo o mouse — `pointermove` + CSS `transform`, sem `motion/react`)
- [ ] 3.6 `tech/CursorMais.tsx` → `src/components/enhanced/CursorMais.astro` (cursor customizado)
- [ ] 3.7 `tech/BotaoMagnetico.tsx` → `src/components/enhanced/BotaoMagnetico.astro` (botão que "gruda" no cursor)
- [ ] 3.8 `tech/SpotlightCard.tsx` → `src/components/enhanced/SpotlightCard.astro`
- [ ] 3.9 `tech/RevealSecao.tsx` → `src/components/enhanced/RevealSecao.astro` (usa `gsap-scroll.ts` de 1.3 — chamar o GSAP direto num `<script>`, mesma lógica de animação de entrada no scroll)

## 4. Ilhas React (Categoria C, `src/components/islands/`)

Estes SIM continuam `.tsx` com React, importados nas páginas `.astro` com a diretiva `client:*` indicada. Copiar a lógica de estado inteira sem simplificar.

- [ ] 4.1 Copiar `tech/GradeAoVivoDemo.tsx` → `src/components/islands/GradeAoVivoDemo.tsx`, ajustando imports (ex.: `moeda` de `@/shared/format/formatters` precisa ser copiado como utilitário local — é só uma função de formatação de moeda, sem dependência de API)
- [ ] 4.2 `src/components/islands/DeckHero.tsx`: copiar `tech/DeckHero.tsx`, trocando os imports dos filhos pra apontar aos componentes já portados (2.2, 2.3, 2.4 de Categoria A, e 4.1 de Categoria C) e `BotaoMagnetico` pro de 3.7 (categoria B — vira um componente `.astro` importado num contexto React precisa virar `<a>` comum com a classe/efeito CSS aplicado diretamente, já que `.astro` não pode ser importado dentro de `.tsx`; replique o efeito de "magnético" com um pequeno hook local dentro da própria ilha, ou aceite CTA sem esse efeito nesta ilha especificamente — decisão de quem implementar, documentar no PR)
- [ ] 4.3 Copiar `HeroFundo.tsx` → `src/components/islands/HeroFundo.tsx`, mantendo a detecção de WebGL, o Error Boundary e o `<video>` de fallback
- [ ] 4.4 Copiar `HeroShader.tsx` → `src/components/islands/HeroShader.tsx` sem mudança de lógica (mantém `@react-three/fiber`); instalar `@react-three/fiber`+`three` como dependência deste projeto
- [ ] 4.5 Confirmar que `DeckHero` é usado com `client:load` e `HeroFundo` também com `client:load` (ambos acima da dobra, precisam estar interativos/visíveis desde o primeiro paint)

## 5. Layout e página Home (`/`)

- [ ] 5.1 Revisar `src/layouts/SiteLayout.astro` (já existe) contra `simplecote-front/src/site/SiteLayout.tsx` — portar qualquer elemento de casca (rodapé, header de navegação entre páginas, se houver) que faça sentido em todas as páginas
- [ ] 5.2 `src/pages/index.astro`: portar o conteúdo de `simplecote-front/src/site/HomePage.tsx` — hero (`HeroFundo` + `DeckHero`, ilhas de 4.2/4.3), seção "Como funciona" (3 passos, com link pra `/como-funciona`), seção "Planos" (usando `src/data/planos.ts` de 1.4); `titulo`/`descricao` do `SiteLayout` idênticos ao `useSEO` atual da home (spec `site/home`)
- [ ] 5.3 Teste manual: abrir `/` no `npm run dev`, comparar visualmente com a home atual em `simplecote-front` (`npm run dev` lá), navegar o hero por teclado e swipe, conferir que a seção Planos bate com os dados de `planos.ts`

## 6. Página `/precos`

- [ ] 6.1 `src/pages/precos.astro`: portar `simplecote-front/src/site/PrecosPage.tsx`, usando `src/data/planos.ts`, `HeroFundo` (variant simples), e os componentes de Categoria A/B já portados (`Painel`, `BorderBeam`, `CardTilt`, `Marquee`, `RevealSecao`); `titulo`/`descricao` iguais ao `useSEO` atual (spec `site/precos`)
- [ ] 6.2 Teste manual: comparar visualmente com `/precos` do `simplecote-front`, conferir que cada plano/preço/quota bate

## 7. Página `/ajuda`

- [ ] 7.1 `src/pages/ajuda.astro`: portar `simplecote-front/src/site/AjudaPage.tsx`, usando `src/data/faq.ts` (de 1.5), `HeroFundo` (variant simples), `Painel`, `EmbedYouTube`, `RevealSecao`; cada pergunta em um heading próprio (spec `site/ajuda` - "Cada pergunta é um heading próprio"); `titulo`/`descricao` iguais ao `useSEO` atual (spec `site/ajuda`)
- [ ] 7.2 Teste manual: comparar visualmente e conferir que todas as perguntas de `faq.ts` aparecem

## 8. Página nova `/como-funciona`

- [ ] 8.1 `src/pages/como-funciona.astro`: conteúdo baseado na seção "Como funciona" da home atual (os mesmos 3 passos), expandido com mais detalhe textual sobre o mecanismo do leilão reverso — **se precisar de texto que não existe em nenhuma página atual, PARE e peça o texto ao invés de inventar** (design.md - Non-Goals); `titulo` específico do mecanismo (ex.: "Como funciona a cotação competitiva | SimpleCote"), diferente do título da home; CTA "Criar conta" ao final (spec `site/como-funciona`)
- [ ] 8.2 Link da seção "Como funciona" da home (5.2) atualizado para apontar pra esta página em vez da âncora `#como-funciona`

## 9. Página nova `/para-supermercados`

- [ ] 9.1 `src/pages/para-supermercados.astro`: **conteúdo/copy inteiramente novo — PARE e peça o texto ao humano antes de escrever esta página** (não existe fonte nenhuma pra copiar; design.md - Non-Goals). Estrutura esperada: abre pela dor (custo de compras, tempo perdido cotando por telefone/planilha), depois introduz o produto, termina com CTA pra `/precos` ou "Criar conta" (spec `site/para-supermercados`)

## 10. Verificação final

- [ ] 10.1 `npm run build` gera as 5 páginas em `dist/` sem erro
- [ ] 10.2 Pra cada uma das 5 páginas, `curl` no HTML do build (sem JS) e confirmar visualmente que `<title>`/`<meta name="description">` estão presentes e são diferentes entre páginas (spec `site/seo`)
- [ ] 10.3 Conferir que todo botão "Criar conta"/"Entrar" em todas as páginas aponta pra `app.simplecote.app` (spec `site/seo`)
- [ ] 10.4 Rodar o Lighthouse (ou `npm run build` + `npx serve dist` + Chrome DevTools) numa página com ilha (`/`) e confirmar que o JS enviado é sensivelmente menor que o bundle da SPA React equivalente — não precisa de número exato, é uma checagem de sanidade de que a categorização (design.md) foi seguida
