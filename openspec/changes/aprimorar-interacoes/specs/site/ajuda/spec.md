## ADDED Requirements

### Requirement: Painel de vídeo associado a cada pergunta

A página `/ajuda` SHALL exibir, ao lado do FAQ, um painel fixo de vídeo que mostra o vídeo correspondente à pergunta selecionada/clicada. Os vídeos SHALL ser embeds (ex.: YouTube) com link configurável, exibindo um placeholder enquanto o link real não for fornecido pelo humano.

#### Scenario: Painel de vídeo fixo ao lado do FAQ

- **WHEN** o visitante abre `/ajuda`
- **THEN** há um painel fixo de vídeo ao lado da lista de perguntas

#### Scenario: Clicar numa pergunta mostra o vídeo correspondente

- **WHEN** o visitante clica/seleciona uma pergunta (ex.: "Como criar uma cotação?")
- **THEN** o painel de vídeo exibe o vídeo daquela pergunta (ou um placeholder enquanto o link não existir)
