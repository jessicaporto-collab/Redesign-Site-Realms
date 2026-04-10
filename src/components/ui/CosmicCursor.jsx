import { useEffect, useRef, useCallback } from 'react'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FUMAÇA INFANTIL CURSOR
   Bolhas de fumaça rosa, azul e amarelo que seguem o mouse.
   Renderizado via canvas fixo z:9999, sem impacto no layout.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function CosmicCursor() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const prevMouseRef = useRef({ x: -9999, y: -9999 })

  // Paleta infantil saturada: rosa choque, azul elétrico e amarelo neon
  const SMOKE_COLORS = [
    [255,  20, 147], // rosa choque
    [255,  80, 180], // rosa vibrante
    [255,   0, 120], // rosa forte
    [  0, 140, 255], // azul elétrico
    [ 30, 100, 255], // azul vibrante
    [  0, 200, 255], // azul ciano saturado
    [255, 210,   0], // amarelo neon
    [255, 180,   0], // amarelo dourado
    [255, 240,  10], // amarelo vibrante
  ]

  const spawnSmoke = useCallback((x, y, dx, dy) => {
    const speed = Math.hypot(dx, dy)
    const count = Math.min(Math.floor(speed * 0.5) + 3, 8)

    for (let i = 0; i < count; i++) {
      const [r, g, b] = SMOKE_COLORS[Math.floor(Math.random() * SMOKE_COLORS.length)]
      // Fumaça sobe levemente e se espalha para os lados
      const spreadAngle = (Math.random() - 0.5) * Math.PI * 1.2
      const baseAngle = Math.atan2(dy, dx) + Math.PI + spreadAngle
      const velMag = Math.random() * 0.7 + 0.2

      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: Math.cos(baseAngle) * velMag + (Math.random() - 0.5) * 0.4,
        vy: Math.sin(baseAngle) * velMag - Math.random() * 0.8 - 0.3,
        size: Math.random() * 6 + 3,     // menores
        alpha: Math.random() * 0.7 + 0.4,
        decay: Math.random() * 0.018 + 0.01,
        drag: Math.random() * 0.02 + 0.015,
        grow: Math.random() * 0.08 + 0.02, // cresce pouco
        cr: r, cg: g, cb: b,
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      const dx = e.clientX - prevMouseRef.current.x
      const dy = e.clientY - prevMouseRef.current.y
      prevMouseRef.current = { x: e.clientX, y: e.clientY }
      mouseRef.current = { x: e.clientX, y: e.clientY }
      // Não spawna sobre seções com fundo escuro
      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (el && el.closest('[data-no-cursor]')) return
      spawnSmoke(e.clientX, e.clientY, dx, dy)
    }
    globalThis.addEventListener('mousemove', onMouseMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Brilhinho suave ao redor do cursor
      const { x, y } = mouseRef.current
      if (x > 0) {
        const aura = ctx.createRadialGradient(x, y, 0, x, y, 18)
        aura.addColorStop(0,   'rgba(255,182,217,0.18)')
        aura.addColorStop(0.5, 'rgba(147,210,255,0.07)')
        aura.addColorStop(1,   'rgba(255,240,120,0.00)')
        ctx.beginPath()
        ctx.arc(x, y, 18, 0, Math.PI * 2)
        ctx.fillStyle = aura
        ctx.fill()
      }

      // Bolhas de fumaça
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.01)

      particlesRef.current.forEach((p) => {
        p.vx *= (1 - p.drag)
        p.vy *= (1 - p.drag)
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay
        p.size  += p.grow  // expande como fumaça real

        const a = Math.max(0, p.alpha)
        const { cr, cg, cb } = p

        // Bolha de fumaça com gradiente radial suave
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        grad.addColorStop(0,   `rgba(${cr},${cg},${cb},${(a * 0.6).toFixed(4)})`)
        grad.addColorStop(0.4, `rgba(${cr},${cg},${cb},${(a * 0.3).toFixed(4)})`)
        grad.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      globalThis.removeEventListener('mousemove', onMouseMove)
    }
  }, [spawnSmoke])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}



