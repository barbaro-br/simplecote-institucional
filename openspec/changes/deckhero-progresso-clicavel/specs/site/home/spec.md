## ADDED Requirements

### Requirement: Indicador de progresso do hero junto aos controles e clicável

O indicador de progresso segmentado do hero SHALL ficar posicionado na parte inferior do hero, junto aos controles de navegação (`‹`, play/pause, `›`), e não no topo (para não colidir com o header fixo). Cada segmento SHALL ser um controle clicável que navega diretamente para o slide correspondente, indicando visualmente qual é o slide atual.

#### Scenario: Segmentos ficam na base do hero

- **WHEN** o visitante abre a home
- **THEN** as barrinhas de progresso aparecem junto aos controles de navegação na parte de baixo do hero, sem sobrepor o header fixo

#### Scenario: Clicar num segmento leva ao slide correspondente

- **WHEN** o visitante clica no segmento referente a um slide
- **THEN** o hero exibe imediatamente aquele slide e o segmento clicado passa a ser o ativo, preenchendo conforme o progresso

#### Scenario: Progresso continua preenchendo o segmento ativo

- **WHEN** o hero está rodando automaticamente
- **THEN** o segmento do slide atual preenche de cor ao longo dos 6s e, ao avançar, o segmento anterior fica cheio e o próximo começa a preencher
