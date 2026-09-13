# site/ajuda Specification

## Purpose
Página pública de FAQ — reproduz `simplecote-front/src/site/AjudaPage.tsx`, com a lista de perguntas frequentes.

## Requirements

### Requirement: Página de ajuda reproduz o FAQ público atual

O sistema SHALL oferecer, em `/ajuda`, a mesma lista de perguntas e respostas frequentes hoje usada em `simplecote-front/src/admin/ajuda/faq.ts` (copiada para este repositório — os dois arquivos SHALL ser mantidos manualmente em sincronia; não há import entre os dois repositórios), em uma única viewport (sem scroll), com o conteúdo compactado (ex.: FAQ em accordion/painel interno).

#### Scenario: Perguntas e respostas correspondem à fonte copiada

- **WHEN** a página `/ajuda` carrega
- **THEN** cada pergunta/resposta exibida corresponde exatamente ao array `PERGUNTAS_FREQUENTES` copiado para este repositório

#### Scenario: Cada pergunta é um heading próprio (SEO)

- **WHEN** a página é renderizada
- **THEN** cada pergunta usa um elemento de heading (`h2`/`h3`), permitindo que a pergunta específica seja indexada e encontrada em busca

#### Scenario: Página sem rolagem

- **WHEN** a página `/ajuda` carrega
- **THEN** o conteúdo cabe em uma única viewport sem rolagem de página (o FAQ pode expandir/recolher dentro do próprio painel)
