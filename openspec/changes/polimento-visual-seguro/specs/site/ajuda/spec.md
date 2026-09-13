## MODIFIED Requirements

### Requirement: Página de ajuda reproduz o FAQ público atual

O sistema SHALL oferecer, em `/ajuda`, a mesma lista de perguntas e respostas frequentes hoje usada em `simplecote-front/src/admin/ajuda/faq.ts`. A exibição das respostas SHALL utilizar o padrão interativo Accordion (Sanfona), onde apenas a pergunta é inicialmente visível e a resposta desliza suavemente ao ser clicada. O título principal da página SHALL possuir o efeito visual de Scrub Text (aparecimento gradual das letras atrelado à rolagem do mouse).

#### Scenario: Perguntas e respostas correspondem à fonte copiada

- **WHEN** a página `/ajuda` carrega
- **THEN** cada pergunta/resposta exibida corresponde exatamente ao array `PERGUNTAS_FREQUENTES` copiado para este repositório

#### Scenario: Cada pergunta é um heading próprio (SEO)

- **WHEN** a página é renderizada
- **THEN** cada pergunta usa um elemento de heading (`h2`/`h3`), permitindo que a pergunta específica seja indexada e encontrada em busca

#### Scenario: Interação via Accordion (Sanfona)

- **WHEN** o usuário visualiza a lista e clica em uma pergunta específica
- **THEN** o conteúdo da resposta daquela pergunta desliza na tela, substituindo o comportamento nativo não animado do HTML details/summary.
