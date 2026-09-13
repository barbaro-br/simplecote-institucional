## MODIFIED Requirements

### Requirement: Página de preços reproduz os planos atuais

O sistema SHALL oferecer, em `/precos`, a listagem dos planos e preços com o mesmo conteúdo de `simplecote-front/src/site/planos.ts` (nome, preço mensal, descrição, quotas de cada plano). A página SHALL manter o tema de "Spotlight" (cartões com bordas responsivas ao mouse) em todos os itens. Para destacar visualmente a hierarquia sem remover o efeito, o plano recomendado (Essencial) SHALL apresentar um destaque sutil de escala em relação aos demais. O título da página SHALL animar em opacidade durante a rolagem (efeito Scrub).

#### Scenario: Planos exibidos correspondem à fonte de dados

- **WHEN** a página `/precos` carrega
- **THEN** cada plano listado tem nome, preço mensal e quotas idênticos aos definidos na cópia de `planos.ts` deste repositório

#### Scenario: Destaque visual do plano recomendado

- **WHEN** o usuário visualiza o grid de planos
- **THEN** todos os planos possuem o brilho interativo, mas o plano recomendado apresenta uma leve ampliação em escala e/ou botão de maior ênfase visual, criando hierarquia.

#### Scenario: CTA de cada plano leva ao cadastro

- **WHEN** o visitante clica no botão de qualquer plano
- **THEN** é levado ao cadastro do app (`site/seo` - "Botão Criar conta leva ao app")
