## MODIFIED Requirements

### Requirement: Página de preços reproduz os planos atuais

O sistema SHALL oferecer, em `/precos`, a listagem dos planos e preços com o mesmo conteúdo de `simplecote-front/src/site/planos.ts` (nome, preço mensal, descrição, quotas de cada plano) e o mesmo destaque visual do plano recomendado. O layout do grid SHALL ser plenamente responsivo sem quebrar componentes em telas menores. Os cards SHALL possuir distinção hierárquica clara: o plano de destaque (Essencial) usa um botão principal com fundo preenchido e escala ligeiramente maior, enquanto os planos secundários (Teste e Profissional) usam um botão de contorno (outline) e não possuem bordas ativas (apenas o border padrão), conferindo um visual minimalista e "premium".

#### Scenario: Planos exibidos correspondem à fonte de dados

- **WHEN** a página `/precos` carrega
- **THEN** cada plano listado tem nome, preço mensal e quotas idênticos aos definidos na cópia de `planos.ts` deste repositório

#### Scenario: Destaque visual hierárquico nos Planos

- **WHEN** o usuário visualiza o grid de planos
- **THEN** o plano em destaque chama mais atenção visualmente, enquanto os demais possuem um design secundário sem borda ativa colorida e com botão outline.

#### Scenario: CTA de cada plano leva ao cadastro

- **WHEN** o visitante clica no botão de qualquer plano
- **THEN** é levado ao cadastro do app (`site/seo` - "Botão Criar conta leva ao app")
