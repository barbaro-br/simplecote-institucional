# site/precos Specification

## Purpose
Página de planos e preços — reproduz `simplecote-front/src/site/PrecosPage.tsx`, alimentada pelos mesmos dados de planos.

## Requirements

### Requirement: Página de preços reproduz os planos atuais

O sistema SHALL oferecer, em `/precos`, a listagem dos planos e preços com o mesmo conteúdo de `simplecote-front/src/site/planos.ts` (nome, preço mensal, descrição, quotas de cada plano) e o mesmo destaque visual do plano recomendado, em uma única viewport (sem scroll), com o conteúdo compactado para caber na tela.

#### Scenario: Planos exibidos correspondem à fonte de dados

- **WHEN** a página `/precos` carrega
- **THEN** cada plano listado tem nome, preço mensal e quotas idênticos aos definidos na cópia de `planos.ts` deste repositório

#### Scenario: CTA de cada plano leva ao cadastro

- **WHEN** o visitante clica no botão de qualquer plano
- **THEN** é levado ao cadastro do app (`site/seo` - "Botão Criar conta leva ao app")

#### Scenario: Página sem rolagem

- **WHEN** a página `/precos` carrega
- **THEN** os três planos cabem em uma única viewport, sem rolagem de página
