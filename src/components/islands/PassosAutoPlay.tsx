import { useEffect, useState } from 'react'
import { cn } from '../../lib/cn'
import { useDeveAnimar } from '../../lib/reduzir-movimento'
import { moeda } from '../../lib/formatters'
import { PRODUTOS_DEMO, eanFormatado } from '../../lib/produtos-demo'
import { GradeAoVivoDemo } from './GradeAoVivoDemo'
import { ResultadoDemo } from './telas/ResultadoDemo'

const QUANTIDADES_PASSO2 = [3, 2, 4, 2] as const
const ITENS_PASSO2 = PRODUTOS_DEMO.map((p, i) => ({ ...p, quantidade: QUANTIDADES_PASSO2[i] }))

const ITENS_PEDIDO_DEMO = [
  { item: 'Achocolatado Toddy 750g', embalagem: 'Fardo c/ 12', quantidade: 3, precoFardo: 259.2 },
  { item: 'Bombom Garoto 1kg', embalagem: 'Fardo c/ 10', quantidade: 2, precoFardo: 149.0 },
] as const
const TOTAL_PEDIDO_DEMO = ITENS_PEDIDO_DEMO.reduce((s, i) => s + i.precoFardo * i.quantidade, 0)

interface Passo {
  num: number
  titulo: string
  resumo: string
}

const INTERVALO_MS = 4000

function IconeCaretLeft() {
  return (
    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"/>
    </svg>
  )
}
function IconeCaretRight() {
  return (
    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
    </svg>
  )
}
function IconePause() {
  return (
    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"/>
    </svg>
  )
}
function IconePlay() {
  return (
    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"/>
    </svg>
  )
}

function IconeEnvelope({ className = 'size-8' }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"/>
    </svg>
  )
}

function IconeCheck({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/>
    </svg>
  )
}

const DURACAO_ESTAGIO_CADASTRO_MS = [1400, 1300, 1900] as const

/** Passo 1 — preview do app: formulário vazio → preenchendo → "confira seu e-mail". */
function Passo1Preview() {
  const [estagio, setEstagio] = useState(0)
  const deveAnimar = useDeveAnimar()

  useEffect(() => {
    if (!deveAnimar) return
    const t = window.setTimeout(() => setEstagio((e) => (e + 1) % 3), DURACAO_ESTAGIO_CADASTRO_MS[estagio])
    return () => window.clearTimeout(t)
  }, [estagio, deveAnimar])

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border border-border bg-background shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 text-[10px] text-text-3">app.simplecote.app</span>
      </div>
      <div key={estagio} className="passo-entra space-y-3 p-4">
        {estagio === 0 && (
          <>
            <div className="h-2 w-1/3 rounded bg-accent/60" />
            <div className="h-8 rounded-md bg-surface-2" />
            <div className="h-8 rounded-md bg-surface-2" />
            <div className="rounded-md bg-accent py-2 text-center text-sm font-semibold text-accent-foreground ring-4 ring-accent/30">
              Criar conta grátis
            </div>
          </>
        )}
        {estagio === 1 && (
          <>
            <div className="h-2 w-1/3 rounded bg-accent/60" />
            <div className="flex h-8 items-center rounded-md bg-surface-2 px-3 text-xs text-text-2">
              supermercado@email.com
            </div>
            <div className="flex h-8 items-center gap-1.5 rounded-md bg-surface-2 px-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="size-2 rounded-full bg-text-2" />
              ))}
            </div>
            <div className="rounded-md bg-accent py-2 text-center text-sm font-semibold text-accent-foreground">
              Criar conta grátis
            </div>
          </>
        )}
        {estagio === 2 && (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <IconeEnvelope className="size-10 text-accent" />
            <div>
              <p className="text-sm font-semibold text-text-1">Confira seu e-mail</p>
              <p className="mt-1 text-xs text-text-3">Enviamos um link de confirmação pra você continuar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Preview visual de cada passo. CSS puro (classe `.passo-entra`, remonta via
 * `key`) em vez de `AnimatePresence` — o `mode="wait"` do framer-motion trava
 * esperando o exit terminar, e isso nunca acontece se o rAF para (ex.: aba em
 * segundo plano), congelando o conteúdo no passo antigo.
 */
function VisualPasso({ passo }: { passo: number }) {
  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden rounded-2xl border border-border bg-background/60 backdrop-blur-sm">
      {/* Passo 1 — preview do app (cadastro) */}
      {passo === 1 && (
        <div key="passo1" className="passo-entra absolute inset-0 flex items-center justify-center p-6">
          <Passo1Preview />
        </div>
      )}

      {/* Passo 2 — adicionando itens à cotação */}
      {passo === 2 && (
        <div key="passo2" className="passo-entra absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full max-w-sm space-y-2">
            <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2.5 text-xs text-text-3">
              Buscar item ou bipar código...
            </div>
            <div className="space-y-1.5">
              {ITENS_PASSO2.map((item) => (
                <div key={item.nome} className="flex items-center justify-between gap-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-1.5">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-text-1">{item.nome}</div>
                    <div className="text-[10px] text-text-3">
                      {item.embalagem} c/ {item.itensPorEmbalagem} · {item.medida} · {item.quantidade}x
                    </div>
                    <div className="font-mono text-[9px] text-text-3/80">{eanFormatado(item.ean)}</div>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-xs text-accent">
                    <IconeCheck className="size-3.5" /> adicionado
                  </span>
                </div>
              ))}
            </div>
            <div className="rounded-md border border-dashed border-border px-3 py-2 text-center text-xs text-text-3">
              + adicionar mais itens
            </div>
          </div>
        </div>
      )}

      {/* Passo 3 — convite fluindo por carta/e-mail */}
      {passo === 3 && (
        <div key="passo3" className="passo-entra absolute inset-0 flex flex-col items-center justify-center gap-5 p-6">
          <div className="animate-bounce text-accent">
            <IconeEnvelope className="size-20" />
          </div>
          <div className="animate-pulse flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm text-accent">
            Convite por e-mail e WhatsApp
          </div>
        </div>
      )}

      {/* Passo 4 — grade ao vivo (preços mudando, mais barato verde) */}
      {passo === 4 && (
        <div key="passo4" className="passo-entra absolute inset-0 flex items-center justify-center p-4">
          <GradeAoVivoDemo />
        </div>
      )}

      {/* Passo 5 — vencedores / preços finais */}
      {passo === 5 && (
        <div key="passo5" className="passo-entra absolute inset-0 flex items-center justify-center p-4">
          <ResultadoDemo />
        </div>
      )}

      {/* Passo 6 — pedido vira carta enviada ao representante */}
      {passo === 6 && (
        <div key="passo6" className="passo-entra absolute inset-0 flex items-center justify-center p-6">
          <div className="relative w-full max-w-sm">
            <div className="space-y-3 rounded-md border border-border bg-background p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-text-1">Pedido #1024</span>
                  <p className="text-[11px] text-text-3">Distribuidora Aurora</p>
                </div>
                <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent">Gerado</span>
              </div>
              <div className="space-y-2 border-t border-border pt-3">
                {ITENS_PEDIDO_DEMO.map(({ item, embalagem, quantidade, precoFardo }) => (
                  <div key={item} className="flex items-start justify-between gap-2 text-xs">
                    <div className="flex items-start gap-2 text-text-2">
                      <IconeCheck className="mt-0.5 size-3.5 shrink-0 text-accent" />
                      <div>
                        <div className="text-text-1">{item}</div>
                        <div className="text-[11px] text-text-3">
                          {embalagem} · {quantidade}x
                        </div>
                      </div>
                    </div>
                    <span className="shrink-0 tabular-nums text-text-2">{moeda(precoFardo * quantidade)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
                <span className="font-medium text-text-1">Total</span>
                <span className="font-bold tabular-nums text-accent">{moeda(TOTAL_PEDIDO_DEMO)}</span>
              </div>
            </div>
            <div className="animate-bounce absolute right-2 top-2 text-accent">
              <IconeEnvelope className="size-8" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Passo a passo em auto-play: os passos avançam sozinhos (a cada ~4s) com o
 * painel lateral mostrando um preview interativo por passo. Controles de
 * voltar/pausar/avançar e um indicador de progresso (pontos) separado.
 * Sob prefers-reduced-motion não avança sozinho — vira navegação manual.
 */
export function PassosAutoPlay({ passos }: { passos: Passo[] }) {
  const [indice, setIndice] = useState(0)
  const [pausado, setPausado] = useState(false)
  const deveAnimar = useDeveAnimar()
  const N = passos.length
  const passo = passos[indice]

  useEffect(() => {
    if (!deveAnimar || pausado) return
    const t = window.setTimeout(() => setIndice((v) => (v + 1) % N), INTERVALO_MS)
    return () => window.clearTimeout(t)
  }, [deveAnimar, pausado, indice, N])

  const ir = (n: number) => setIndice(((n % N) + N) % N)

  return (
    <section className="flex h-full flex-col" aria-label="Como funciona">
      <div className="grid flex-1 min-h-0 items-center gap-8 px-4 md:grid-cols-2 md:gap-12">
        {/* Texto do passo */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div key={passo.num} className="passo-entra">
            <div className="mb-1 text-sm font-semibold text-accent">Passo {passo.num}</div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-1 sm:text-4xl">{passo.titulo}</h2>
            <p className="max-w-md text-lg text-text-2 leading-relaxed">{passo.resumo}</p>
          </div>
        </div>

        {/* Quadrinho do passo */}
        <div className="hidden h-[400px] sm:block md:h-[460px]">
          <VisualPasso passo={passo.num} />
        </div>
      </div>

      {/* Indicador de progresso (pontos) */}
      <div className="flex shrink-0 items-center justify-center gap-2 pb-1 pt-2" aria-hidden="true">
        {passos.map((p, i) => (
          <button
            key={p.num}
            type="button"
            onClick={() => ir(i)}
            aria-label={`Ir para o passo ${p.num}`}
            className={cn(
              'h-2 rounded-full transition-all',
              i === indice ? 'w-6 bg-accent' : 'w-2 bg-border hover:bg-text-3',
            )}
          />
        ))}
      </div>

      {/* Controles */}
      <div className="flex shrink-0 items-center justify-center gap-3 pb-4 pt-1">
        <button
          type="button"
          onClick={() => ir(indice - 1)}
          aria-label="Passo anterior"
          className="flex size-9 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-text-1 transition-colors hover:bg-surface"
        >
          <IconeCaretLeft />
        </button>

        <button
          type="button"
          onClick={() => setPausado((p) => !p)}
          aria-label={pausado ? 'Retomar apresentação' : 'Pausar apresentação'}
          className="flex size-9 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-text-1 transition-colors hover:bg-surface"
        >
          {pausado ? <IconePlay /> : <IconePause />}
        </button>

        <button
          type="button"
          onClick={() => ir(indice + 1)}
          aria-label="Próximo passo"
          className="flex size-9 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-text-1 transition-colors hover:bg-surface"
        >
          <IconeCaretRight />
        </button>
      </div>
    </section>
  )
}
