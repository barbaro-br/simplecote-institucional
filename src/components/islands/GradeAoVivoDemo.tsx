import { useEffect, useMemo, useRef, useState } from 'react'
import { moeda } from '../../lib/formatters'

// ── Dados de simulação ─────────────────────────────────────────────────────

const FORNECEDORES = ['Aurora', 'Meridiano', 'Litoral'] as const

type Produto = {
  nome: string
  ean: string
  embalagem: string
  itensPorEmbalagem: number
  medida: string
  precos: number[]
  volumeMes: number
}

const PRODUTOS: Produto[] = [
  { nome: 'Arroz tipo 1', ean: '7896006711234', embalagem: 'Fardo', itensPorEmbalagem: 6, medida: '5 kg', precos: [179.4, 174.0, 185.4], volumeMes: 28 },
  { nome: 'Feijão carioca', ean: '7891234500018', embalagem: 'Fardo', itensPorEmbalagem: 10, medida: '1 kg', precos: [84.0, 87.0, 82.0], volumeMes: 40 },
  { nome: 'Óleo de soja', ean: '7891107101235', embalagem: 'Caixa', itensPorEmbalagem: 20, medida: '900 ml', precos: [142.0, 138.0, 148.0], volumeMes: 52 },
  { nome: 'Açúcar refinado', ean: '7896015912346', embalagem: 'Fardo', itensPorEmbalagem: 10, medida: '1 kg', precos: [58.0, 60.5, 56.5], volumeMes: 24 },
  { nome: 'Café torrado', ean: '7896005213457', embalagem: 'Fardo', itensPorEmbalagem: 10, medida: '500 g', precos: [168.0, 159.0, 164.0], volumeMes: 32 },
]

const PISO_FRAC = 0.82
const INTERVALO_MS = 1500

const round2 = (n: number) => Math.round(n * 100) / 100
const idxMenor = (xs: number[]) => xs.indexOf(Math.min(...xs))

function eanFormatado(ean: string) {
  return ean.replace(/(\d{4})(\d{4})(\d{5})/, '$1 $2 $3')
}

function economiaProjetada(precos: number[][]): number {
  return PRODUTOS.reduce((soma, p, r) => {
    const queda = Math.min(...p.precos) - Math.min(...precos[r])
    return soma + Math.max(0, queda) * p.volumeMes
  }, 0)
}

function temMatchMedia(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
}

// ── Tween de número ───────────────────────────────────────────────────────

function useNumeroSuave(alvo: number, ativo: boolean): number {
  const [tween, setTween] = useState(alvo)
  const deRef = useRef(alvo)

  useEffect(() => {
    if (!ativo) return
    const inicio = performance.now()
    const de = deRef.current
    let raf = 0
    const passo = (agora: number) => {
      const t = Math.min(1, (agora - inicio) / 500)
      const v = de + (alvo - de) * (1 - Math.pow(1 - t, 3))
      setTween(v)
      deRef.current = v
      if (t < 1) raf = requestAnimationFrame(passo)
    }
    raf = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(raf)
  }, [alvo, ativo])

  return ativo ? tween : alvo
}

// ── Componente ────────────────────────────────────────────────────────────

/**
 * Grade ao vivo do produto rodando sozinha na home: os fornecedores vão cobrindo
 * o menor preço item a item. Roteirizada (sem back, sem dado real). Respeita
 * prefers-reduced-motion — sem timers, estado assentado.
 */
export function GradeAoVivoDemo({ ativo = true }: { ativo?: boolean }) {
  const prefersReduced =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  const anima = !prefersReduced && temMatchMedia() && ativo

  const [precos, setPrecos] = useState<number[][]>(() => PRODUTOS.map((p) => [...p.precos]))
  const [flash, setFlash] = useState<{ r: number; c: number; k: number } | null>(null)
  const flashK = useRef(0)

  useEffect(() => {
    if (!anima) return
    const id = window.setInterval(() => {
      setPrecos((atual) => {
        const r = Math.floor(Math.random() * atual.length)
        const linha = atual[r]
        const min = Math.min(...linha)
        const vencedor = linha.indexOf(min)
        const candidatos = linha
          .map((preco, c) => ({ preco, c }))
          .filter(({ preco, c }) => c !== vencedor && preco > PRODUTOS[r].precos[c] * PISO_FRAC + 0.02)
        if (!candidatos.length) return atual
        const { c } = candidatos[Math.floor(Math.random() * candidatos.length)]
        const alvo = Math.max(
          PRODUTOS[r].precos[c] * PISO_FRAC,
          min * (1 - (0.008 + Math.random() * 0.014)),
        )
        const proxima = atual.map((l) => [...l])
        proxima[r][c] = round2(alvo)
        flashK.current += 1
        setFlash({ r, c, k: flashK.current })
        return proxima
      })
    }, INTERVALO_MS)
    return () => window.clearInterval(id)
  }, [anima])

  const economia = useMemo(() => economiaProjetada(precos), [precos])
  const economiaSuave = useNumeroSuave(economia, anima)

  // TelaCard inline (não pode importar .astro em .tsx)
  return (
    <div className="relative w-full min-w-0 max-w-2xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-[var(--brand-mint,#3fae7a)]/20 blur-3xl"
      />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#12263f] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.75)] ring-1 ring-inset ring-white/[0.06]">
        {/* SecaoCabecalho */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 sm:px-5">
          <div className="flex min-w-0 items-center gap-2 text-[13px] font-medium text-white">
            <span className="relative flex size-2 shrink-0">
              {anima && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-mint,#57bf8e)]/70" />}
              <span className="relative inline-flex size-2 rounded-full bg-[var(--brand-mint,#57bf8e)]" />
            </span>
            <span className="truncate">Grade ao vivo</span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/50">
              Simulação
            </span>
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[340px] border-collapse text-left sm:min-w-[460px]">
            <thead>
              <tr className="text-[10px] uppercase tracking-wide text-white/40">
                <th className="px-4 py-2 font-medium sm:px-5">Item</th>
                {FORNECEDORES.map((f) => (
                  <th key={f} className="px-2 py-2 text-right font-medium">{f}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {precos.map((linha, r) => {
                const prod = PRODUTOS[r]
                const vencedor = idxMenor(linha)
                return (
                  <tr key={prod.nome} className="border-t border-white/[0.07] align-top">
                    <td className="whitespace-nowrap px-4 py-2 sm:px-5 sm:py-2.5">
                      <div className="text-[13px] font-semibold text-white">{prod.nome}</div>
                      <div className="text-[11px] text-white/45">
                        {prod.embalagem} c/ {prod.itensPorEmbalagem} · {prod.medida}
                      </div>
                      <div className="mt-0.5 hidden font-mono text-[10px] tracking-tight text-white/30 sm:block">
                        {eanFormatado(prod.ean)}
                      </div>
                    </td>
                    {linha.map((preco, c) => {
                      const vencendo = c === vencedor
                      const piscando = flash?.r === r && flash?.c === c
                      const unit = preco / prod.itensPorEmbalagem
                      return (
                        <td key={c} className="px-2 py-2 text-right sm:py-2.5">
                          <span
                            key={piscando ? flash!.k : 'x'}
                            className={`inline-flex flex-col items-end rounded-md px-2 py-1 text-[13px] tabular-nums transition-colors duration-500 ${
                              vencendo
                                ? 'bg-[var(--brand-mint,#3fae7a)]/15 font-semibold text-[var(--brand-mint-bright,#6fe6a8)] ring-1 ring-[var(--brand-mint,#3fae7a)]/40'
                                : 'text-white/60'
                            } ${piscando && vencendo ? 'flash-green' : ''}`}
                          >
                            <span className="inline-flex items-center gap-1">
                              {vencendo && (
                                <svg className="size-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
                                  <path d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"/>
                                </svg>
                              )}
                              {moeda(preco)}
                            </span>
                            <span className={`hidden text-[10px] font-normal sm:block ${vencendo ? 'text-[var(--brand-mint-bright,#6fe6a8)]/70' : 'text-white/30'}`}>
                              {moeda(unit)}/un
                            </span>
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-baseline justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-4 py-2.5 sm:px-5 sm:py-3">
          <span className="text-xs text-white/55">Economia projetada nesta cotação</span>
          <span className="text-lg font-bold text-[var(--brand-mint-bright,#6fe6a8)] tabular-nums sm:text-xl">
            {moeda(Math.round(economiaSuave))}
            <span className="ml-1 text-xs font-normal text-white/40">/ mês</span>
          </span>
        </div>
      </div>
    </div>
  )
}
