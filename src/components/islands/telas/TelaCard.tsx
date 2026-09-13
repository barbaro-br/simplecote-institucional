/**
 * Versão React do TelaCard para uso interno dentro das ilhas.
 * A versão .astro (Categoria A) serve as páginas; esta serve o DeckHero (ilha React).
 */
import type { ReactNode } from 'react'

export function TelaCard({
  titulo,
  pulso = false,
  children,
  className,
}: {
  titulo: string
  pulso?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className="relative w-full min-w-0 max-w-2xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-[var(--brand-mint,#3fae7a)]/20 blur-3xl"
      />
      <div
        className={`overflow-hidden rounded-2xl border border-white/10 bg-[#12263f] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.75)] ring-1 ring-inset ring-white/[0.06] ${className ?? ''}`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 sm:px-5">
          <div className="flex min-w-0 items-center gap-2 text-[13px] font-medium text-white">
            <span className="relative flex size-2 shrink-0">
              {pulso && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-mint,#57bf8e)]/70" />}
              <span className="relative inline-flex size-2 rounded-full bg-[var(--brand-mint,#57bf8e)]" />
            </span>
            <span className="truncate">{titulo}</span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/50">
              Simulação
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
