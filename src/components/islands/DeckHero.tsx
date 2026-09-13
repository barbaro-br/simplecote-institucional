import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { GradeAoVivoDemo } from './GradeAoVivoDemo'
import { EmpresasDemo } from './telas/EmpresasDemo'
import { RepresentantesDemo } from './telas/RepresentantesDemo'
import { ResultadoDemo } from './telas/ResultadoDemo'

// ── Hook BotaoMagnetico local (BotaoMagnetico.astro não pode ser importado em .tsx) ──
// Replica o efeito magnético via hook. Documentado: efeito presente na ilha mas
// sem o componente .astro (que serve as demais páginas fora de ilhas).
function useMagnetico(raio = 24) {
  const ref = useRef<HTMLDivElement>(null)
  const cx = useRef(0)
  const cy = useRef(0)
  const tx = useRef(0)
  const ty = useRef(0)
  const raf = useRef(0)

  const animate = useCallback(() => {
    const el = ref.current
    if (!el) return
    cx.current += (tx.current - cx.current) * 0.15
    cy.current += (ty.current - cy.current) * 0.15
    el.style.transform = `translate(${cx.current}px, ${cy.current}px)`
    if (Math.abs(tx.current - cx.current) > 0.1 || Math.abs(ty.current - cy.current) > 0.1) {
      raf.current = requestAnimationFrame(animate)
    } else {
      raf.current = 0
    }
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window.matchMedia !== 'function' || !window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    const dist = Math.hypot(dx, dy)
    const fator = Math.min(1, raio / (dist || 1))
    tx.current = dx * fator * 0.4
    ty.current = dy * fator * 0.4
    if (!raf.current) raf.current = requestAnimationFrame(animate)
  }, [animate, raio])

  const onPointerLeave = useCallback(() => {
    tx.current = 0
    ty.current = 0
    if (!raf.current) raf.current = requestAnimationFrame(animate)
  }, [animate])

  return { ref, onPointerMove, onPointerLeave }
}

// ── Componentes internos do deck ──────────────────────────────────────────

function BotaoMagneticoInline({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, onPointerMove, onPointerLeave } = useMagnetico()
  return (
    <div ref={ref} className={className} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      {children}
    </div>
  )
}

function LadoCopy({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">{titulo}</h2>
      <p className="max-w-md text-sm text-white/75 sm:text-base">{texto}</p>
    </div>
  )
}

function SlideTela({ copy, children }: { copy: ReactNode; children: ReactNode }) {
  return (
    <div className="grid w-full min-w-0 items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
      <div className="min-w-0">{copy}</div>
      <div className="flex min-w-0 justify-center lg:justify-end">{children}</div>
    </div>
  )
}

// Botão primário padrão (sem a classe ui-uppercase do simplecote-front)
const BTN =
  'inline-flex items-center justify-center gap-1.5 rounded-md text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50'
const BTN_PRIMARY = `${BTN} h-10 px-8 bg-primary text-primary-foreground shadow hover:bg-primary/90`
const BTN_OUTLINE = `${BTN} h-10 px-8 border border-white/30 bg-white/10 text-white hover:bg-white/20`

// Ícones inline (subset de phosphor)
const IconeStorefront = () => (
  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M232,96a7.89,7.89,0,0,0-.3-2.2L217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.8A7.89,7.89,0,0,0,24,96v16a40,40,0,0,0,16,32v64a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32ZM54,48H202l11.42,40H42.61ZM200,208H56V151.2A40.57,40.57,0,0,0,72,152H184a40.57,40.57,0,0,0,16-3.2ZM216,128a24,24,0,0,1-48,0,8,8,0,0,0-16,0,24,24,0,0,1-48,0,8,8,0,0,0-16,0,24,24,0,0,1-48,0V108H216Z"/>
  </svg>
)
const IconeCaretLeft = () => (
  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"/>
  </svg>
)
const IconeCaretRight = () => (
  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
  </svg>
)
const IconeCaretDown = () => (
  <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
  </svg>
)
const IconePause = () => (
  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"/>
  </svg>
)
const IconePlay = () => (
  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"/>
  </svg>
)
const IconeCheckCircle = () => (
  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/>
  </svg>
)

// ── Slides ────────────────────────────────────────────────────────────────

const DURACAO_MS = 6000

type Slide = { id: string; rotulo: string; render: (ativo: boolean) => ReactNode }

const SLIDES: Slide[] = [
  {
    id: 'intro',
    rotulo: 'Início',
    render: () => (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
          <IconeStorefront />
          Leilão reverso para supermercados
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Cotações competitivas, sem planilha.
        </h1>
        <p className="max-w-xl text-lg text-white/80">
          Você abre a cotação, os fornecedores disputam preço item a item e você economiza em cada
          compra — com a grade ao vivo mostrando tudo em tempo real.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <BotaoMagneticoInline>
            <a href="https://app.simplecote.app/cadastro" className={BTN_PRIMARY} data-cursor="mais">
              Criar conta
            </a>
          </BotaoMagneticoInline>
          <BotaoMagneticoInline>
            <a href="https://app.simplecote.app/login" className={BTN_OUTLINE} data-cursor="mais">
              Entrar
            </a>
          </BotaoMagneticoInline>
        </div>
      </div>
    ),
  },
  {
    id: 'grade',
    rotulo: 'Grade ao vivo',
    render: (ativo) => (
      <SlideTela
        copy={
          <LadoCopy
            titulo="Preço disputado item a item"
            texto="Cada fornecedor cobre o menor lance da embalagem. A grade ao vivo mostra quem está ganhando cada item — sem você atualizar nada."
          />
        }
      >
        <GradeAoVivoDemo ativo={ativo} />
      </SlideTela>
    ),
  },
  {
    id: 'representantes',
    rotulo: 'Representantes',
    render: () => (
      <SlideTela
        copy={
          <LadoCopy
            titulo="Convide por link, acompanhe a resposta"
            texto="O fornecedor recebe o convite por e-mail ou WhatsApp e responde pelo link. Você vê quem abriu, quem respondeu e reenvia com um clique."
          />
        }
      >
        <RepresentantesDemo />
      </SlideTela>
    ),
  },
  {
    id: 'empresas',
    rotulo: 'Empresas',
    render: () => (
      <SlideTela
        copy={
          <LadoCopy
            titulo="Seus fornecedores, organizados por ramo"
            texto="Cadastre uma vez e monte cotações direcionadas: convide só quem fornece hortifruti, bebidas, carnes — o que a cotação pedir."
          />
        }
      >
        <EmpresasDemo />
      </SlideTela>
    ),
  },
  {
    id: 'resultado',
    rotulo: 'Resultado',
    render: () => (
      <SlideTela
        copy={
          <LadoCopy
            titulo="No fim, o vencedor de cada item"
            texto="O SimpleCote apura a cotação, mostra quanto você economizou e gera os pedidos já separados por fornecedor."
          />
        }
      >
        <ResultadoDemo />
      </SlideTela>
    ),
  },
  {
    id: 'comecar',
    rotulo: 'Começar',
    render: () => (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Comece grátis</h2>
        <p className="max-w-md text-white/80">
          Crie sua conta em minutos, monte a primeira cotação e veja o produto funcionando — sem
          cartão de crédito.
        </p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70">
          {['Teste grátis', 'Sem cartão', 'Cancele quando quiser'].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <IconeCheckCircle />
              {item}
            </li>
          ))}
        </ul>
        <BotaoMagneticoInline>
          <a href="https://app.simplecote.app/cadastro" className={BTN_PRIMARY} data-cursor="mais">
            Criar conta
          </a>
        </BotaoMagneticoInline>
      </div>
    ),
  },
]

const N = SLIDES.length

// ── DeckHero ──────────────────────────────────────────────────────────────

/**
 * Home em formato "stories": os slides passam de lado (auto a cada 6s), com
 * barra de progresso segmentada no topo e controles ‹ ⏸ › embaixo. Teclado
 * (setas), swipe no mobile, pausa no hover/foco. Sob prefers-reduced-motion
 * não gira sozinho — vira um deck manual.
 *
 * Ilha React com client:load (está acima da dobra, precisa interatividade imediata).
 * Nota: BotaoMagnetico é reimplementado via hook local (não pode importar .astro em .tsx).
 */
export function DeckHero() {
  const prefersReduced =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  const deveAnimar = !prefersReduced

  const [indice, setIndice] = useState(0)
  const [pausadoManual, setPausadoManual] = useState(false)
  const [hover, setHover] = useState(false)
  const [foco, setFoco] = useState(false)
  const toqueRef = useRef<{ x: number; y: number } | null>(null)

  const rodando = deveAnimar && !pausadoManual && !hover && !foco
  const mostrarPlay = pausadoManual || !deveAnimar

  const ir = (n: number) => setIndice(((n % N) + N) % N)

  useEffect(() => {
    if (!rodando) return
    const t = window.setTimeout(() => setIndice((v) => (v + 1) % N), DURACAO_MS)
    return () => window.clearTimeout(t)
  }, [rodando, indice])

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      const alvo = e.target as HTMLElement | null
      if (alvo && (alvo.tagName === 'INPUT' || alvo.tagName === 'TEXTAREA' || alvo.isContentEditable)) return
      if (e.key === 'ArrowRight') { e.preventDefault(); setIndice((v) => (v + 1) % N) }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); setIndice((v) => (v - 1 + N) % N) }
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [])

  function aoSoltar(e: React.PointerEvent) {
    const ini = toqueRef.current
    toqueRef.current = null
    if (!ini) return
    const dx = e.clientX - ini.x
    const dy = e.clientY - ini.y
    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy)) return
    ir(indice + (dx < 0 ? 1 : -1))
  }

  return (
    <section
      aria-label="Tour do SimpleCote"
      aria-roledescription="carrossel"
      className="relative flex h-full flex-col"
    >
      {/* Viewport dos slides */}
      <div
        className="relative flex-1 overflow-hidden"
        onPointerDown={(e) => { toqueRef.current = { x: e.clientX, y: e.clientY } }}
        onPointerUp={aoSoltar}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocusCapture={() => setFoco(true)}
        onBlurCapture={() => setFoco(false)}
      >
        <div
          className="flex h-full"
          style={{
            transform: `translateX(-${indice * 100}%)`,
            transition: deveAnimar ? 'transform 500ms ease-out' : 'none',
          }}
        >
          {SLIDES.map((s, i) => {
            const inativo = i !== indice
            return (
              <div
                key={s.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${N} — ${s.rotulo}`}
                aria-hidden={inativo}
                // @ts-expect-error — inert é atributo HTML5, não reconhecido pelo TS do React
                inert={inativo || undefined}
                className="h-full w-full shrink-0 overflow-y-auto"
              >
                <div className="mx-auto flex min-h-full max-w-6xl flex-col justify-center px-4 pb-10 pt-8">
                  {s.render(i === indice)}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Controles */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-2 px-4 pb-6 pt-2">
        <button
          type="button"
          onClick={() => ir(indice - 1)}
          aria-label="Slide anterior"
          className="flex size-9 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-text-1 transition-colors hover:bg-surface"
        >
          <IconeCaretLeft />
        </button>
        <button
          type="button"
          onClick={() => setPausadoManual((p) => !p)}
          aria-label={mostrarPlay ? 'Retomar apresentação' : 'Pausar apresentação'}
          className="relative flex size-10 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-text-1 transition-colors hover:bg-surface"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40" aria-hidden="true">
            <circle cx="20" cy="20" r="16" fill="none" stroke="var(--border-strong)" strokeWidth="2.5" />
          </svg>
          {rodando && (
            <svg
              key={`anel-${indice}`}
              className="absolute inset-0 -rotate-90"
              viewBox="0 0 40 40"
              aria-hidden="true"
            >
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray={100}
                style={{ animation: `deck-ring ${DURACAO_MS}ms linear forwards` }}
              />
            </svg>
          )}
          {mostrarPlay ? <IconePlay /> : <IconePause />}
        </button>
        <button
          type="button"
          onClick={() => ir(indice + 1)}
          aria-label="Próximo slide"
          className="flex size-9 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-text-1 transition-colors hover:bg-surface"
        >
          <IconeCaretRight />
        </button>
      </div>

      {/* Marcador de slide ativo */}
      <div className="mx-auto flex items-center gap-2 px-4 pb-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => ir(i)}
            aria-label={`Ir para o slide ${i + 1}: ${s.rotulo}`}
            aria-current={i === indice ? 'true' : undefined}
            className={
              i === indice
                ? 'h-2 w-2 rounded-full bg-accent'
                : 'h-2 w-2 rounded-full bg-border transition-colors hover:bg-text-3'
            }
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Slide {indice + 1} de {N}: {SLIDES[indice].rotulo}
      </p>

      <a
        href="/como-funciona"
        data-cursor="mais"
        className="absolute bottom-6 right-4 hidden items-center gap-1.5 text-[11px] font-medium text-white/45 transition-colors hover:text-white/80 sm:flex"
      >
        Planos e detalhes
        <IconeCaretDown />
      </a>
    </section>
  )
}
