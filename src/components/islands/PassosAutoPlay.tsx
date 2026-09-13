import { useEffect, useState } from 'react'
import { useDeveAnimar } from '../../lib/reduzir-movimento'
import { moeda } from '../../lib/formatters'
import { PRODUTOS_DEMO } from '../../lib/produtos-demo'
import { GradeAoVivoDemo } from './GradeAoVivoDemo'
import { ResultadoDemo } from './telas/ResultadoDemo'

const QUANTIDADES_PASSO2 = [3, 2, 4, 2] as const
const ITENS_PASSO2 = PRODUTOS_DEMO.map((p, i) => ({ ...p, quantidade: QUANTIDADES_PASSO2[i] }))

/** 3 pedidos — um por fornecedor vencedor (mesmos vencedores do Passo 5). */
const PEDIDOS_DEMO = [
  { empresa: 'Distribuidora Aurora', resumo: 'Achocolatado Toddy, Bombom Garoto', total: 3 * 259.2 + 2 * 149.0 },
  { empresa: 'Comercial Meridiano', resumo: 'Leite em pó Ninho', total: 2 * 484.8 },
  { empresa: 'Atacadão Litoral', resumo: 'Coco ralado Menina', total: 4 * 92.0 },
] as const

interface Passo {
  num: number
  titulo: string
  resumo: string
}

const INTERVALO_MS = 7000

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

function IconeTelefone({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M231.88,175.08A56.26,56.26,0,0,1,176,224C96.6,224,32,159.4,32,80A56.26,56.26,0,0,1,80.92,24.12a16,16,0,0,1,16.62,9.51l21.12,47.15.13.32A16,16,0,0,1,117,96.25c-.18.27-.37.53-.57.78L96,121.45c7.49,15.22,23.41,31,38.83,38.51l24.34-20.35c.25-.21.51-.4.78-.57a16,16,0,0,1,15.17-1.4l.32.13,47.15,21.12A16,16,0,0,1,231.88,175.08Z"/>
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

function IconePlus({ className = 'size-2' }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"/>
    </svg>
  )
}
function IconeMinus({ className = 'size-2' }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z"/>
    </svg>
  )
}

const NOME_DEMO_CADASTRO = 'Mercado Bom Preço'
const EMAIL_DEMO_CADASTRO = 'contato@mercadobompreco.com'
const SENHA_DEMO_LEN = 10
const DURACAO_ESTAGIO_CADASTRO_MS = [900, 3400, 1900] as const

/** Revela `texto` progressivamente (efeito de digitação) enquanto `ativo`. */
function useDigitacao(texto: string, ativo: boolean, velocidadeMs = 45): string {
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (!ativo) {
      setChars(0)
      return
    }
    if (chars >= texto.length) return
    const t = window.setTimeout(() => setChars((c) => c + 1), velocidadeMs)
    return () => window.clearTimeout(t)
  }, [ativo, chars, texto, velocidadeMs])

  return texto.slice(0, chars)
}

function IconeCursor({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M213.66,120.11,90.15,26.53A16,16,0,0,0,64.14,39.42L48.06,214.32a16,16,0,0,0,27.32,13l40.51-38.32,25.9,59.32a16,16,0,0,0,14.66,9.6,16.15,16.15,0,0,0,3-.28,16,16,0,0,0,12-11.55l19.53-77.36,26.6-16.79A16,16,0,0,0,213.66,120.11Z"/>
    </svg>
  )
}

/** Cursor pisca em texto (indica campo "focado" enquanto digita). */
function CursorDigitando() {
  return <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-text-2 align-middle" />
}

/**
 * Passo 1 — preview do app: mouse clica no formulário → nome/e-mail/senha
 * são "digitados" um de cada vez → "confira seu e-mail".
 */
function Passo1Preview() {
  const [estagio, setEstagio] = useState(0)
  const deveAnimar = useDeveAnimar()

  useEffect(() => {
    if (!deveAnimar) return
    const t = window.setTimeout(() => setEstagio((e) => (e + 1) % 3), DURACAO_ESTAGIO_CADASTRO_MS[estagio])
    return () => window.clearTimeout(t)
  }, [estagio, deveAnimar])

  const digitando = estagio === 1
  const nome = useDigitacao(NOME_DEMO_CADASTRO, digitando)
  const nomeCompleto = nome.length === NOME_DEMO_CADASTRO.length
  const email = useDigitacao(EMAIL_DEMO_CADASTRO, digitando && nomeCompleto)
  const emailCompleto = email.length === EMAIL_DEMO_CADASTRO.length
  const senha = useDigitacao('•'.repeat(SENHA_DEMO_LEN), digitando && emailCompleto, 60)

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border border-border bg-background shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 text-[10px] text-text-3">app.simplecote.app</span>
      </div>
      <div key={estagio} className="passo-entra space-y-3 p-4">
        {estagio === 2 ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <IconeEnvelope className="size-10 text-accent" />
            <div>
              <p className="text-sm font-semibold text-text-1">Confira seu e-mail</p>
              <p className="mt-1 text-xs text-text-3">
                Enviamos um link de verificação para <span className="text-text-2">{EMAIL_DEMO_CADASTRO}</span>
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-1 pb-1 text-center">
              <span className="flex size-7 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                S
              </span>
              <div className="text-sm font-bold text-text-1">SimpleCote</div>
              <div className="text-[10px] text-text-3">Crie a conta do seu supermercado</div>
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-medium text-text-3">Nome do supermercado</label>
              <div className="relative flex h-7 items-center rounded-md bg-surface-2 px-2.5 text-xs text-text-2">
                {estagio === 0 ? (
                  <span className="text-text-3">Supermercado do Zé</span>
                ) : (
                  <>
                    {nome}
                    {!nomeCompleto && <CursorDigitando />}
                  </>
                )}
                {estagio === 0 && (
                  <span className="cursor-clica absolute -right-1 -top-1 text-text-1">
                    <IconeCursor />
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-medium text-text-3">E-mail</label>
              <div className="flex h-7 items-center rounded-md bg-surface-2 px-2.5 text-xs text-text-2">
                {estagio === 0 ? (
                  <span className="text-text-3">voce@empresa.com.br</span>
                ) : (
                  <>
                    {email}
                    {nomeCompleto && !emailCompleto && <CursorDigitando />}
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-medium text-text-3">Senha</label>
              <div className="flex h-7 items-center gap-1.5 rounded-md bg-surface-2 px-2.5">
                {estagio === 0 ? (
                  <span className="text-xs text-text-3">Mínimo 8 caracteres</span>
                ) : (
                  senha.split('').map((_, i) => <span key={i} className="size-1.5 rounded-full bg-text-2" />)
                )}
              </div>
            </div>

            <div
              className={`rounded-md bg-accent py-2 text-center text-sm font-semibold text-accent-foreground transition-shadow ${
                estagio === 0 ? 'ring-4 ring-accent/30' : ''
              }`}
            >
              Criar conta grátis
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function IconeBusca({ className = 'size-3.5' }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M229.66,218.34,182.06,170.7a92.15,92.15,0,1,0-11.31,11.31l47.63,47.65a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/>
    </svg>
  )
}

const QUERY_BUSCA_DEMO = 'achocolatado'
const DURACAO_REVELAR_ITEM_MS = 550

/**
 * Passo 2 — busca ("achocolatado" digitado) → resultado aparece → itens vão
 * sendo adicionados um por um (spinner → confirmado, como no app real).
 */
function Passo2Preview() {
  const deveAnimar = useDeveAnimar()
  const [fase, setFase] = useState<'buscando' | 'resultado' | 'lista'>('buscando')
  const query = useDigitacao(QUERY_BUSCA_DEMO, fase === 'buscando', 70)
  const queryCompleta = query.length === QUERY_BUSCA_DEMO.length

  useEffect(() => {
    if (!deveAnimar) return
    if (fase === 'buscando' && queryCompleta) {
      const t = window.setTimeout(() => setFase('resultado'), 500)
      return () => window.clearTimeout(t)
    }
    if (fase === 'resultado') {
      const t = window.setTimeout(() => setFase('lista'), 700)
      return () => window.clearTimeout(t)
    }
  }, [fase, queryCompleta, deveAnimar])

  const [revelados, setRevelados] = useState(0)
  useEffect(() => {
    if (!deveAnimar || fase !== 'lista') return
    if (revelados >= ITENS_PASSO2.length) return
    const t = window.setTimeout(() => setRevelados((r) => r + 1), DURACAO_REVELAR_ITEM_MS)
    return () => window.clearTimeout(t)
  }, [fase, revelados, deveAnimar])

  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex h-8 items-center gap-2 rounded-md border border-border bg-background px-3 text-xs text-text-3">
        <IconeBusca className="size-3.5 shrink-0" />
        {fase === 'buscando' ? (
          <span className="text-text-2">
            {query}
            <CursorDigitando />
          </span>
        ) : (
          <span>Buscar item ou bipar código...</span>
        )}
      </div>

      {fase === 'resultado' && (
        <div className="passo-entra flex items-center justify-between gap-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-text-1">Achocolatado Toddy</div>
            <div className="text-[10px] text-text-3">Fardo c/ 12 · 750 g</div>
          </div>
          <IconePlus className="size-3.5 shrink-0 text-accent" />
        </div>
      )}

      {fase === 'lista' && (
        <div className="passo-entra space-y-1.5">
          {ITENS_PASSO2.map((item, i) => {
            const confirmado = i < revelados
            const emProgresso = i === revelados
            return (
              <div
                key={item.nome}
                className={`flex items-center justify-between gap-2 rounded-md border px-3 py-1.5 transition-opacity ${
                  confirmado || emProgresso ? 'border-accent/40 bg-accent/10 opacity-100' : 'border-border bg-background opacity-40'
                }`}
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-text-1">{item.nome}</div>
                  <div className="text-[10px] text-text-3">
                    {item.embalagem} c/ {item.itensPorEmbalagem} · {item.medida}
                  </div>
                </div>
                {confirmado ? (
                  <div className="flex shrink-0 items-center gap-0.5">
                    <div className="flex h-7 w-9 items-center justify-center rounded-l border border-border bg-background text-sm font-semibold tabular-nums text-text-1">
                      {item.quantidade}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex h-3.5 w-5 items-center justify-center rounded-tr border border-border bg-surface-2 text-text-2">
                        <IconePlus />
                      </div>
                      <div className="-mt-px flex h-3.5 w-5 items-center justify-center rounded-br border border-border bg-surface-2 text-text-2">
                        <IconeMinus />
                      </div>
                    </div>
                  </div>
                ) : emProgresso ? (
                  <span className="size-4 shrink-0 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                ) : null}
              </div>
            )
          })}
        </div>
      )}

      <div className="rounded-md border border-dashed border-border px-3 py-2 text-center text-xs text-text-3">
        + adicionar mais itens
      </div>
    </div>
  )
}

const REPRESENTANTES_DEMO = [
  { nome: 'Distribuidora Aurora', email: 'joao@distribuidoraaurora.com.br', contato: '(11) 98888-1234' },
  { nome: 'Comercial Meridiano', email: 'vendas@comercialmeridiano.com.br', contato: '(11) 97777-5678' },
  { nome: 'Atacadão Litoral', email: 'contato@atacadaolitoral.com.br', contato: '(11) 96666-9012' },
] as const
const DURACAO_ESTAGIO_CONVITE_MS = [700, 700, 700, 900, 2200] as const

/** Passo 3 — seleciona representantes um por um (como no app real) → convida → envelope. */
function Passo3Preview() {
  const [estagio, setEstagio] = useState(0)
  const deveAnimar = useDeveAnimar()

  useEffect(() => {
    if (!deveAnimar) return
    const t = window.setTimeout(() => setEstagio((e) => (e + 1) % 5), DURACAO_ESTAGIO_CONVITE_MS[estagio])
    return () => window.clearTimeout(t)
  }, [estagio, deveAnimar])

  if (estagio === 4) {
    return (
      <div className="passo-entra flex flex-col items-center gap-5">
        <div className="animate-bounce text-accent">
          <IconeEnvelope className="size-20" />
        </div>
        <div className="animate-pulse flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm text-accent">
          Convite por e-mail e WhatsApp
        </div>
      </div>
    )
  }

  const marcados = Math.min(estagio, REPRESENTANTES_DEMO.length)
  return (
    <div key={estagio === 3 ? 'convidar' : 'lista'} className="passo-entra w-full max-w-sm space-y-2">
      {REPRESENTANTES_DEMO.map((rep, i) => (
        <div
          key={rep.nome}
          className={`flex items-center gap-3 rounded-md border px-3 py-2 transition-colors ${
            i < marcados ? 'border-accent/40 bg-accent/10' : 'border-border bg-background'
          }`}
        >
          <span
            className={`relative flex size-5 shrink-0 items-center justify-center rounded border ${
              i < marcados ? 'border-accent bg-accent text-accent-foreground' : 'border-border-strong'
            }`}
          >
            {i < marcados && <IconeCheck className="size-3.5" />}
            {i === marcados && estagio < 3 && (
              <span key={estagio} className="cursor-clica absolute -right-2 -top-2 text-text-1">
                <IconeCursor className="size-3.5" />
              </span>
            )}
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-text-1">{rep.nome}</div>
            <div className="flex items-center gap-1 truncate text-[10px] text-text-3">
              <IconeEnvelope className="size-2.5 shrink-0" />
              {rep.email}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-text-3">
              <IconeTelefone className="size-2.5 shrink-0" />
              {rep.contato}
            </div>
          </div>
        </div>
      ))}
      <div className="relative">
        <div
          className={`rounded-md py-2 text-center text-sm font-semibold transition-colors ${
            estagio === 3 ? 'bg-accent text-accent-foreground' : 'border border-dashed border-border text-text-3'
          }`}
        >
          Convidar {marcados > 0 ? `${marcados} ` : ''}
          {marcados === 1 ? 'representante' : 'representantes'}
        </div>
        {estagio === 3 && (
          <span className="cursor-clica absolute -right-2 -top-2 text-text-1">
            <IconeCursor className="size-3.5" />
          </span>
        )}
      </div>
    </div>
  )
}

const DURACAO_ENVIO_PEDIDO_MS = 1000

/** Passo 6 — os 3 pedidos (um por fornecedor vencedor) são "enviados" um por um. */
function Passo6Preview() {
  const deveAnimar = useDeveAnimar()
  const [enviados, setEnviados] = useState(0)

  useEffect(() => {
    if (!deveAnimar) return
    if (enviados >= PEDIDOS_DEMO.length) return
    const t = window.setTimeout(() => setEnviados((e) => e + 1), DURACAO_ENVIO_PEDIDO_MS)
    return () => window.clearTimeout(t)
  }, [enviados, deveAnimar])

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-text-1">3 pedidos gerados</span>
        <span
          key={Math.min(enviados, PEDIDOS_DEMO.length)}
          className="pop rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent"
        >
          {Math.min(enviados, PEDIDOS_DEMO.length)}/{PEDIDOS_DEMO.length} enviados
        </span>
      </div>
      <div className="space-y-2">
        {PEDIDOS_DEMO.map((p, i) => {
          const enviado = i < enviados
          const enviando = i === enviados
          return (
            <div
              key={p.empresa}
              className={`flex items-center justify-between gap-2 rounded-md border px-3 py-2.5 transition-all duration-300 ${
                enviado
                  ? `border-accent/40 bg-accent/10 ${i === enviados - 1 ? 'flash-green' : ''}`
                  : enviando
                    ? 'border-accent/50 bg-accent/5 opacity-100 ring-1 ring-accent/30'
                    : 'border-border bg-background opacity-45'
              }`}
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-text-1">{p.empresa}</div>
                <div className="truncate text-[10px] text-text-3">{p.resumo}</div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-xs font-semibold tabular-nums text-text-2">{moeda(p.total)}</span>
                {enviado ? (
                  <IconeCheck key="check" className="pop size-4 text-accent" />
                ) : enviando ? (
                  <span className="size-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                ) : (
                  <IconeEnvelope className="size-4 text-text-3" />
                )}
              </div>
            </div>
          )
        })}
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

      {/* Passo 2 — busca → resultado → itens sendo adicionados um por um */}
      {passo === 2 && (
        <div key="passo2" className="passo-entra absolute inset-0 flex items-center justify-center p-6">
          <Passo2Preview />
        </div>
      )}

      {/* Passo 3 — seleciona representantes, depois convite fluindo por carta/e-mail */}
      {passo === 3 && (
        <div key="passo3" className="passo-entra absolute inset-0 flex flex-col items-center justify-center gap-5 p-6">
          <Passo3Preview />
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

      {/* Passo 6 — os 3 pedidos sendo enviados aos fornecedores vencedores */}
      {passo === 6 && (
        <div key="passo6" className="passo-entra absolute inset-0 flex items-center justify-center p-6">
          <Passo6Preview />
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

      {/* Controles */}
      <div className="flex shrink-0 items-center justify-center gap-3 pb-4 pt-2">
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
          className="relative flex size-10 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-text-1 transition-colors hover:bg-surface"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40" aria-hidden="true">
            <circle cx="20" cy="20" r="16" fill="none" stroke="var(--border-strong)" strokeWidth="2.5" />
          </svg>
          {!pausado && deveAnimar && (
            <svg key={`anel-${indice}`} className="absolute inset-0 -rotate-90" viewBox="0 0 40 40" aria-hidden="true">
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
                style={{ animation: `deck-ring ${INTERVALO_MS}ms linear forwards` }}
              />
            </svg>
          )}
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
