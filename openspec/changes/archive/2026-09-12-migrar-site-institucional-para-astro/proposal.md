## Why

O site institucional hoje é uma página React SPA (dentro de `simplecote-front`, `src/site/`) com um problema real de SEO: título/descrição de cada página só existem depois que o JavaScript roda no navegador (`useSEO`, via `useEffect`) — invisível pra crawlers que não executam JS e mais lento pra indexar mesmo nos que executam. Este repositório (`simplecote-institucional`, Astro) já nasceu resolvendo isso na raiz: cada página é HTML pronto no build. Falta portar o conteúdo real (hoje é só um placeholder) e criar as duas páginas novas que o dicionário de palavras-chave de SEO pede.

## What Changes

- Portar as 3 páginas existentes (`/`, `/precos`, `/ajuda`) do `simplecote-front` pra cá, mantendo o conteúdo e o visual, mudando só o mecanismo (Astro nativo em vez de React SPA).
- Criar 2 páginas novas: `/como-funciona` (hoje é só uma âncora dentro da home) e `/para-supermercados` (não existe ainda).
- Classificar cada componente visual reaproveitado em 3 categorias (documentado em `AGENTS.md` e detalhado em `design.md`): HTML/CSS puro sem JS, JS sem React, ou ilha React de verdade — e portar cada um pra sua categoria certa, não simplesmente "virar tudo ilha React" (isso desfaria o ganho de SEO/performance que motivou a migração).
- CTAs ("Criar conta", "Entrar") viram links comuns pro app real (`app.simplecote.app`), não redirects — o app não muda nada.

## Capabilities

### New Capabilities
- `site/seo`: comportamento comum de todas as páginas — título/descrição/og:image reais no HTML (via `SiteLayout.astro`), sem depender de JS; CTAs linkando pro app.
- `site/home`: página inicial — hero "stories" (`DeckHero`) + seções de conteúdo.
- `site/como-funciona`: página nova, mecanismo do leilão reverso explicado em detalhe (hoje é só uma seção da home).
- `site/para-supermercados`: página nova, foco na dor do comprador (custo de compras) + CTA.
- `site/precos`: planos e preços.
- `site/ajuda`: FAQ pública.

## Impact

- **Este repositório**: todo o conteúdo de página vem daqui pra frente; nada aqui depende de rodar autenticado nem de chamar a API do produto.
- **`simplecote-front`**: nenhuma mudança nesta change — o repo React continua sendo a fonte original de onde se copia o conteúdo/visual. Uma change futura, separada, vai *remover* `src/site/` de lá depois que este site estiver no ar e o domínio for trocado (fora de escopo aqui).
- **Sem trocar domínio ainda**: `simplecote.com.br` continua apontando pro `simplecote-front` até essa migração estar completa e revisada — ver `AGENTS.md`, seção Deploy.
