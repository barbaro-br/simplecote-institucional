## Purpose

Página de planos e preços — reproduz `simplecote-front/src/site/PrecosPage.tsx`, alimentada pelos mesmos dados de planos.

## ADDED Requirements

### Requirement: Página de preços reproduz os planos atuais

O sistema SHALL oferecer, em `/precos`, a listagem dos planos e preços com o mesmo conteúdo de `simplecote-front/src/site/planos.ts` (nome, preço mensal, descrição, quotas de cada plano) e o mesmo destaque visual do plano recomendado.

#### Scenario: Planos exibidos correspondem à fonte de dados

- **WHEN** a página `/precos` carrega
- **THEN** cada plano listado tem nome, preço mensal e quotas idênticos aos definidos na cópia de `planos.ts` deste repositório

#### Scenario: CTA de cada plano leva ao cadastro

- **WHEN** o visitante clica no botão de qualquer plano
- **THEN** é levado ao cadastro do app (`site/seo` - "Botão Criar conta leva ao app")
