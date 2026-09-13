/**
 * Catálogo fictício de produtos de supermercado usado nas demos de
 * "Como funciona" (passos 2, 4, 5 e 6) — mesmos 4 itens em todos os passos
 * para a narrativa fazer sentido de ponta a ponta.
 */
export type ProdutoDemo = {
  nome: string
  ean: string
  embalagem: string
  itensPorEmbalagem: number
  medida: string
}

export const PRODUTOS_DEMO: ProdutoDemo[] = [
  { nome: 'Achocolatado Toddy', ean: '7891000100103', embalagem: 'Fardo', itensPorEmbalagem: 12, medida: '750 g' },
  { nome: 'Leite em pó Ninho', ean: '7891000053508', embalagem: 'Fardo', itensPorEmbalagem: 24, medida: '380 g' },
  { nome: 'Coco ralado Menina', ean: '7896004400155', embalagem: 'Caixa', itensPorEmbalagem: 40, medida: '100 g' },
  { nome: 'Bombom Garoto', ean: '7891151020254', embalagem: 'Fardo', itensPorEmbalagem: 10, medida: '1 kg' },
]

export function eanFormatado(ean: string): string {
  return ean.replace(/(\d{4})(\d{4})(\d{5})/, '$1 $2 $3')
}
