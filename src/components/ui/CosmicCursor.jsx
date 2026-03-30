import { useEffect, useRef, useCallback } from 'react'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COSMIC DUST CURSOR
   Poeira cósmica que segue o mouse em qualquer página.
   Renderizado via canvas fixo z:9999, sem impacto no layout.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function CosmicCursor() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const prevMouseRef = useRef({ x: -9999, y: -9999 })

  // Paleta: majoritariamente violeta/roxo com toques de azul e branco
  const DUST_COLORS = [
    [167, 139, 250], // violet   — mais frequente
    [167, 139, 250],
    [139,  92, 246], // purple
    [139,  92, 246],
    [196, 181, 253], // lavender claro
    [ 96, 165, 250], // blue
    [224, 214, 255], // quase branco violeta
    [255, 255, 255], // branco raro
  ]

  const spawnDust = useCallback((x, y, dx, dy) => {
    const speed = Math.hypot(dx, dy)
    const count = Math.min(Math.floor(speed * 0.45) + 2, 10)

    for (let i = 0; i < count; i++) {
      const [r, g, b] = DUST_COLORS[Math.floor(Math.random() * DUST_COLORS.length)]
      const spreadAngle = (Math.random() - 0.5) * Math.PI * 0.9
      const baseAngle = Math.atan2(dy, dx) + Math.PI + spreadAngle
      const velMag = Math.random() * 1.1 + 0.15

      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: Math.cos(baseAngle) * velMag,
        vy: Math.sin(baseAngle) * velMag - Math.random() * 0.3,
        r: Math.random() * 1.1 + 0.15,
        halo: Math.random() * 5 + 2.5,
        alpha: Math.random() * 0.55 + 0.25,
        decay: Math.random() * 0.018 + 0.009,
        drag: Math.random() * 0.012 + 0.02,
        gravity: Math.random() * 0.012 + 0.003,
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
      spawnDust(e.clientX, e.clientY, dx, dy)
    }
    globalThis.addEventListener('mousemove', onMouseMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Aura suave ao redor do cursor
      const { x, y } = mouseRef.current
      if (x > 0) {
        const aura = ctx.createRadialGradient(x, y, 0, x, y, 14)
        aura.addColorStop(0,   'rgba(196,181,253,0.10)')
        aura.addColorStop(0.4, 'rgba(139,92,246,0.04)')
        aura.addColorStop(1,   'rgba(139,92,246,0.00)')
        ctx.beginPath()
        ctx.arc(x, y, 14, 0, Math.PI * 2)
        ctx.fillStyle = aura
        ctx.fill()
      }

      // Partículas de poeira
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.005)

      particlesRef.current.forEach((p) => {
        p.vx *= (1 - p.drag)
        p.vy *= (1 - p.drag)
        p.vy += p.gravity
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay
        p.halo *= 0.994

        const a = Math.max(0, p.alpha)
        const { cr, cg, cb } = p

        // Halo difuso — simula blur com gradiente radial
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.halo)
        grad.addColorStop(0,   `rgba(${cr},${cg},${cb},${(a * 0.5).toFixed(4)})`)
        grad.addColorStop(0.3, `rgba(${cr},${cg},${cb},${(a * 0.22).toFixed(4)})`)
        grad.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.halo, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Núcleo minúsculo
        if (p.r > 0.05) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${Math.min(a * 0.9, 0.9).toFixed(4)})`
          ctx.fill()
        }
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      globalThis.removeEventListener('mousemove', onMouseMove)
    }
  }, [spawnDust])

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
