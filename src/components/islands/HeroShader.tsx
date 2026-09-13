import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useDeveAnimar } from '../../lib/reduzir-movimento'

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const FRAGMENT = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.0 + vec2(13.7, 5.1);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = vUv;
    float t = uTime * 0.06;
    float n = fbm(p * 2.2 + vec2(t, t * 0.6));
    float wave = sin(p.x * 3.14159 * 1.5 + t * 1.4) * 0.5 + 0.5;

    vec3 navy = vec3(0.071, 0.145, 0.247);
    vec3 navyHi = vec3(0.118, 0.227, 0.373);
    vec3 mint = vec3(0.341, 0.749, 0.557);
    vec3 bright = vec3(0.435, 0.902, 0.675);

    float m = mix(n, wave, 0.55);
    vec3 col = mix(navy, navyHi, smoothstep(0.2, 0.8, p.y));
    col = mix(col, mint, smoothstep(0.45, 0.85, m));
    col = mix(col, bright, smoothstep(0.7, 0.98, m) * 0.6);

    float vig = smoothstep(1.1, 0.35, distance(p, vec2(0.5)));
    col *= 0.85 + 0.15 * vig;

    gl_FragColor = vec4(col, 1.0);
  }
`

function ShaderPlano() {
  const material = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame(({ clock }) => {
    if (material.current) material.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <mesh position={[0, 0, -2]}>
      {/* 20, 20 cover full screen far behind */}
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        ref={material}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  )
}

function NetworkParticles() {
  const count = 250
  const points = useRef<THREE.Points>(null)
  const { mouse, viewport } = useThree()

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const init = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 2
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      init[i * 3] = x
      init[i * 3 + 1] = y
      init[i * 3 + 2] = z
    }
    return [pos, init]
  }, [count])

  useFrame((state) => {
    if (!points.current) return

    const time = state.clock.getElapsedTime()
    const targetX = (mouse.x * viewport.width) / 2
    const targetY = (mouse.y * viewport.height) / 2

    const positionsArray = points.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      
      const initX = initialPositions[ix]
      const initY = initialPositions[iy]

      const floatX = Math.sin(time * 0.3 + i) * 0.2
      const floatY = Math.cos(time * 0.4 + i) * 0.2

      const curX = initX + floatX
      const curY = initY + floatY

      const dx = curX - targetX
      const dy = curY - targetY
      const dist = Math.sqrt(dx * dx + dy * dy)

      const repelDist = 2.5
      if (dist < repelDist) {
        // Empurrar
        const force = (repelDist - dist) / repelDist
        positionsArray[ix] = curX + (dx / dist) * force * 0.8
        positionsArray[iy] = curY + (dy / dist) * force * 0.8
      } else {
        // Voltar à posição com lerp
        positionsArray[ix] += (curX - positionsArray[ix]) * 0.1
        positionsArray[iy] += (curY - positionsArray[iy]) * 0.1
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#57BF8E" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

export default function HeroShader({ onCriado }: { onCriado?: () => void }) {
  const deveAnimar = useDeveAnimar()

  if (typeof window === 'undefined') return null
  if (!deveAnimar) return null

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: 'low-power', failIfMajorPerformanceCaveat: true }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      onCreated={onCriado}
      fallback={null}
      aria-hidden
    >
      <ShaderPlano />
      <NetworkParticles />
    </Canvas>
  )
}
