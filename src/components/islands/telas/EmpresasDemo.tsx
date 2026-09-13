/**
 * Versão React de EmpresasDemo para uso interno no DeckHero (ilha).
 * Portado de simplecote-front/src/site/tech/telas/EmpresasDemo.tsx
 */
import { TelaCard } from './TelaCard'

const RAMOS = ['Hortifruti', 'Mercearia', 'Bebidas', 'Carnes', 'Limpeza'] as const

const EMPRESAS: { nome: string; ramo: string; contato: string }[] = [
  { nome: 'Hortifruti Boa Safra', ramo: 'Hortifruti', contato: '(38) 9 9911-2200' },
  { nome: 'Distribuidora Aurora', ramo: 'Mercearia', contato: '(11) 9 8123-4455' },
  { nome: 'Meridiano Atacado', ramo: 'Bebidas', contato: '(31) 9 9740-1188' },
  { nome: 'Rede Litoral', ramo: 'Mercearia', contato: '(27) 9 9666-0432' },
  { nome: 'Frigorífico Serra', ramo: 'Carnes', contato: '(34) 9 9502-7781' },
  { nome: 'CleanMax Suprimentos', ramo: 'Limpeza', contato: '(11) 9 9333-1290' },
]

const WaIcon = () => (
  <svg className="size-3.5 text-[var(--brand-mint,#3fae7a)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72,24,24,0,0,1,19.29-23.54l12.12,24.24-9.82,14.73a8,8,0,0,0-.56,7.62,56.38,56.38,0,0,0,26.92,26.92,8,8,0,0,0,7.62-.56l14.73-9.82,24.24,12.12A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a88,88,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216l12.48-37.4a8,8,0,0,0-.67-6.54A88,88,0,1,1,128,216Z"/>
  </svg>
)

export function EmpresasDemo() {
  return (
    <TelaCard titulo="Empresas">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-[11px] text-white/50 sm:px-5">
        <span>Fornecedores cadastrados</span>
        <span className="text-white/70">{EMPRESAS.length} · 5 ramos</span>
      </div>
      <div className="flex flex-wrap gap-1.5 border-b border-white/[0.07] px-4 py-3 sm:px-5">
        {RAMOS.map((ramo, i) => (
          <span
            key={ramo}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
              i === 0
                ? 'bg-[var(--brand-mint,#3fae7a)]/15 text-[var(--brand-mint-bright,#6fe6a8)] ring-1 ring-inset ring-[var(--brand-mint,#3fae7a)]/30'
                : 'bg-white/[0.06] text-white/55'
            }`}
          >
            {ramo}
          </span>
        ))}
      </div>
      <ul className="divide-y divide-white/[0.07]">
        {EMPRESAS.map(({ nome, ramo, contato }) => (
          <li key={nome} className="flex items-center gap-3 px-4 py-3 sm:px-5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-semibold text-white/70">
              {nome.slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium text-white">{nome}</div>
              <div className="text-[11px] text-white/40">{ramo}</div>
            </div>
            <span className="hidden items-center gap-1.5 text-[11px] tabular-nums text-white/45 sm:inline-flex">
              <WaIcon />
              {contato}
            </span>
          </li>
        ))}
      </ul>
    </TelaCard>
  )
}
