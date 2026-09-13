import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '../../lib/cn'
import { useDeveAnimar } from '../../lib/reduzir-movimento'
import { GradeAoVivoDemo } from './GradeAoVivoDemo'
import { ResultadoDemo } from './telas/ResultadoDemo'

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

function VisualPasso({ passo }: { passo: number }) {
  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden rounded-2xl border border-border bg-background/60 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {/* Passo 1 — preview do app (cadastro) */}
        {passo === 1 && (
          <motion.div
            key="passo1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <div className="w-full max-w-sm overflow-hidden rounded-xl border border-border bg-background shadow-lg">
              <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                <span className="size-2.5 rounded-full bg-border" />
                <span className="size-2.5 rounded-full bg-border" />
                <span className="size-2.5 rounded-full bg-border" />
                <span className="ml-2 text-[10px] text-text-3">app.simplecote.app</span>
              </div>
              <div className="space-y-3 p-4">
                <div className="h-2 w-1/3 rounded bg-accent/60" />
                <div className="h-8 rounded-md bg-surface-2" />
                <div className="h-8 rounded-md bg-surface-2" />
                <div className="rounded-md bg-accent py-2 text-center text-sm font-semibold text-accent-foreground">
                  Criar conta grátis
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Passo 2 — adicionando itens à cotação */}
        {passo === 2 && (
          <motion.div
            key="passo2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <div className="w-full max-w-sm space-y-2">
              <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2.5 text-xs text-text-3">
                Buscar item ou bipar código...
              </div>
              <div className="space-y-2">
                {['Arroz tipo 1', 'Feijão carioca', 'Óleo de soja'].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-md border border-accent/40 bg-accent/10 px-3 py-2">
                    <span className="text-sm font-medium text-text-1">{item}</span>
                    <span className="flex items-center gap-1 text-xs text-accent">
                      <IconeCheck className="size-3.5" /> adicionado
                    </span>
                  </div>
                ))}
              </div>
              <div className="rounded-md border border-dashed border-border px-3 py-2 text-center text-xs text-text-3">
                + adicionar mais itens
              </div>
            </div>
          </motion.div>
        )}

        {/* Passo 3 — convite fluindo por carta/e-mail */}
        {passo === 3 && (
          <motion.div
            key="passo3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="text-accent"
            >
              <IconeEnvelope className="size-20" />
            </motion.div>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm text-accent"
            >
              Convite por e-mail e WhatsApp
            </motion.div>
          </motion.div>
        )}

        {/* Passo 4 — grade ao vivo (preços mudando, mais barato verde) */}
        {passo === 4 && (
          <motion.div
            key="passo4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute inset-0 flex items-center justify-center p-4"
          >
            <GradeAoVivoDemo />
          </motion.div>
        )}

        {/* Passo 5 — vencedores / preços finais */}
        {passo === 5 && (
          <motion.div
            key="passo5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute inset-0 flex items-center justify-center p-4"
          >
            <ResultadoDemo />
          </motion.div>
        )}

        {/* Passo 6 — pedido vira carta enviada ao representante */}
        {passo === 6 && (
          <motion.div
            key="passo6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <div className="relative w-full max-w-sm">
              <div className="space-y-3 rounded-md border border-border bg-background p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-text-1">Pedido #1024</span>
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent">Gerado</span>
                </div>
                {['Arroz tipo 1', 'Feijão carioca'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-text-2">
                    <IconeCheck className="size-4 text-accent" />
                    {item}
                  </div>
                ))}
              </div>
              <motion.div
                initial={{ y: 0, x: 0, opacity: 1, scale: 1 }}
                animate={{ y: -56, x: 72, opacity: 0, scale: 0.6 }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeIn', repeatDelay: 0.4 }}
                className="absolute right-2 top-2 text-accent"
              >
                <IconeEnvelope className="size-8" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
          <AnimatePresence mode="wait">
            <motion.div
              key={passo.num}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-1 text-sm font-semibold text-accent">Passo {passo.num}</div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-1 sm:text-4xl">{passo.titulo}</h2>
              <p className="max-w-md text-lg text-text-2 leading-relaxed">{passo.resumo}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quadrinho do passo */}
        <div className="hidden h-[380px] sm:block md:h-[440px]">
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
