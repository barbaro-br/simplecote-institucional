# site/seo Specification

## Purpose
Comportamento comum a toda página do site institucional: SEO real (sem depender de JavaScript) e navegação pro app de verdade.

## Requirements

### Requirement: Título e descrição reais no HTML, sem JavaScript

Toda página SHALL definir `<title>` e `<meta name="description">` únicos (não genéricos, não repetidos entre páginas) através de props passadas ao layout comum (`SiteLayout.astro`), presentes no HTML retornado pelo servidor/build — NÃO SHALL depender de `useEffect` ou qualquer execução de JavaScript no navegador para essas tags existirem.

#### Scenario: HTML sem JavaScript já tem título e descrição

- **WHEN** qualquer página do site é buscada sem executar JavaScript (ex.: `curl`, ou um crawler que não roda JS)
- **THEN** o HTML retornado já contém `<title>` e `<meta name="description">` preenchidos com o conteúdo daquela página específica

#### Scenario: Cada página tem título e descrição próprios

- **WHEN** duas páginas diferentes do site são comparadas
- **THEN** o `<title>` e a `<meta name="description">` de cada uma são distintos e específicos ao conteúdo daquela página — nenhuma usa o texto genérico de outra

### Requirement: Chamadas para ação levam ao app real, não a este site

Toda chamada para ação de "Criar conta" ou "Entrar" (em qualquer página) SHALL ser um link comum apontando para o domínio do app (`app.simplecote.app`) — NÃO SHALL ser tratada como rota interna deste site nem disparar nenhum redirecionamento via JavaScript.

#### Scenario: Botão "Criar conta" leva ao app

- **WHEN** o visitante clica em "Criar conta" em qualquer página
- **THEN** o navegador é levado a `https://app.simplecote.app/cadastro` via link comum (`<a href>`)

#### Scenario: Botão "Entrar" leva ao app

- **WHEN** o visitante clica em "Entrar" em qualquer página
- **THEN** o navegador é levado a `https://app.simplecote.app/login` via link comum (`<a href>`)
