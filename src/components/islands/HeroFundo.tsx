import { Component, Suspense, lazy, useState, type ReactNode } from 'react'
import { deveAnimar } from '../../lib/reduzir-movimento'
import { viewportLarga } from '../../lib/viewport-larga'

const HeroShaderLazy = lazy(() => import('./HeroShader'))

/** Captura erro de montagem do R3F/WebGL e desliga o 3D. */
class LimiteShader extends Component<
  { onErro: () => void; children: ReactNode },
  { falhou: boolean }
> {
  state = { falhou: false }

  static getDerivedStateFromError() {
    return { falhou: true }
  }

  componentDidCatch() {
    this.props.onErro()
  }

  render() {
    return this.state.falhou ? null : this.props.children
  }
}

function webglDisponivel(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Camada FIXA de fundo da home — montada uma vez, atrás de toda a página
 * (`fixed inset-0 -z-10`). Em ordem de robustez:
 * (a) gradiente CSS brand-navy-deep → brand-navy SEMPRE presente;
 * (b) `<video>` de marca só com deveAnimar() e viewport >= md;
 * (c) HeroShader (R3F, lazy) só com deveAnimar(), viewport >= md e WebGL ok;
 * (d) scrim por cima para contraste do texto.
 *
 * variant="simples" (Preços, Ajuda) → só gradiente + scrim, sem vídeo nem shader.
 *
 * Ilha com client:load (está acima da dobra na home).
 */
export function HeroFundo({ variant = 'completo' }: { variant?: 'completo' | 'simples' }) {
  const animaOk = deveAnimar()
  const larga = viewportLarga()
  const [webglOk] = useState(() => (typeof window !== 'undefined' ? webglDisponivel() : false))
  const [sem3d, setSem3d] = useState(false)

  const podeVideo = variant === 'completo' && animaOk && larga
  const pode3d = podeVideo && webglOk && !sem3d

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, var(--bg-deep, #122040), var(--brand-navy, #1e3a5f))' }}
      />
      {podeVideo && (
        <video
          className="h-full w-full object-cover opacity-40"
          src="/midia/animacao-marca.mp4"
          poster="/hero.png"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
      )}
      {pode3d && (
        <LimiteShader onErro={() => setSem3d(true)}>
          <Suspense fallback={null}>
            <div className="absolute inset-0 mix-blend-screen">
              <HeroShaderLazy />
            </div>
          </Suspense>
        </LimiteShader>
      )}
      <div className="absolute inset-0 bg-[var(--bg-deep,#122040)]/65" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(125% 85% at 50% 0%, transparent 25%, var(--bg-deep, #122040) 100%)',
        }}
      />
    </div>
  )
}
