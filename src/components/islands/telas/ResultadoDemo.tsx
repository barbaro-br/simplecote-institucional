/**
 * Versão React de ResultadoDemo para uso interno no DeckHero (ilha).
 * Portado de simplecote-front/src/site/tech/telas/ResultadoDemo.tsx
 */
import { moeda } from '../../../lib/formatters'
import { TelaCard } from './TelaCard'

const ITENS: { item: string; vencedor: string; preco: number; economia: number }[] = [
  { item: 'Achocolatado Toddy 750g', vencedor: 'Aurora', preco: 259.2, economia: 24.0 },
  { item: 'Leite em pó Ninho 380g', vencedor: 'Meridiano', preco: 484.8, economia: 34.0 },
  { item: 'Coco ralado Menina 100g', vencedor: 'Litoral', preco: 92.0, economia: 7.0 },
  { item: 'Bombom Garoto 1kg', vencedor: 'Aurora', preco: 149.0, economia: 16.0 },
]

const total = ITENS.reduce((s, i) => s + i.economia, 0)

const TrophyIcon = () => (
  <svg className="size-3 text-[var(--brand-mint,#3fae7a)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40H55.36A88.09,88.09,0,0,0,120,207.62V232H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V207.62A88.09,88.09,0,0,0,200.64,136H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120a24,24,0,0,1-24-24V80H48v40Zm80,72a72,72,0,0,1-72-72V56H200v64A72.08,72.08,0,0,1,128,192Zm80-96V80h24V96a24,24,0,0,1-24,24Z"/>
  </svg>
)

export function ResultadoDemo() {
  return (
    <TelaCard titulo="Resultado da cotação">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-[11px] text-white/50 sm:px-5">
        <span>Vencedor de cada item</span>
        <span className="text-white/70">4 itens · 3 fornecedores</span>
      </div>
      <ul className="divide-y divide-white/[0.07]">
        {ITENS.map(({ item, vencedor, preco, economia }) => (
          <li key={item} className="flex items-center gap-3 px-4 py-2.5 sm:px-5">
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium text-white">{item}</div>
              <div className="flex items-center gap-1 text-[11px] text-white/45">
                <TrophyIcon />
                {vencedor}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[13px] font-semibold text-white tabular-nums">{moeda(preco)}</div>
              <div className="text-[11px] font-medium text-[var(--brand-mint-bright,#6fe6a8)] tabular-nums">
                −{moeda(economia)}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-4 py-3 sm:px-5">
        <div>
          <div className="text-[11px] text-white/50">Economia total nesta cotação</div>
          <div className="text-lg font-bold text-[var(--brand-mint-bright,#6fe6a8)] tabular-nums">{moeda(total)}</div>
        </div>
        <span className="rounded-lg bg-[var(--brand-mint,#3fae7a)] px-3 py-1.5 text-xs font-semibold text-[var(--brand-navy-deep,#122040)]">
          Gerar pedidos
        </span>
      </div>
    </TelaCard>
  )
}
