import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Container from '../../components/ui/Container'
import musicGalaxy from './assets/music-galaxy.mp3'
import GlobeViz from './GlobeViz'
import img1EduxRealms from './assets/img1-eduxRealms.jpeg'
import img2EduxRealms from './assets/img2-eduxrealms.png'
import img3EduxRealms from './assets/img3-eduxrealms.png'
import img4EduxRealms from './assets/img4-eduxrealms.png'
import img5EduxRealms from './assets/img5-eduxrealms.png'
import img6EduxRealms from './assets/img6-eduxrealms.png'

/* ---------------------------------------------
   Unsplash images (free / no copyright)
   Serão trocadas por assets próprios depois.
--------------------------------------------- */
const IMG = {
  heroGalaxy:
    'https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=1600&q=70&fit=crop',
  vrHeadset:
    'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=900&q=85&fit=crop',
  vrPerson:
    'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=900&q=85&fit=crop',
  computer:
    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=700&q=80&fit=crop',
  mobile:
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80&fit=crop',
  spaceEarth:
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80&fit=crop',
  nebula:
    'https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?w=1600&q=60&fit=crop',
  ruins:
    'https://images.unsplash.com/photo-1519922639192-e73293ca430e?w=800&q=80&fit=crop',
  math:
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=75&fit=crop',
  tech:
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=75&fit=crop',
  nature:
    'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=75&fit=crop',
  books:
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=75&fit=crop',
}

/* ─────────────────────────────────────────────
   Mouse star trail effect  (canvas-based)
───────────────────────────────────────────── */
function useDustCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    let prevX = null
    let prevY = null

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const spawnParticles = (x, y, dx, dy) => {
      const speed = Math.hypot(dx, dy)
      const count = Math.min(Math.floor(speed * 0.8) + 5, 14)
      for (let i = 0; i < count; i++) {
        const spreadAngle = (Math.random() - 0.5) * Math.PI * 2.2
        const baseAngle = Math.atan2(dy, dx) + Math.PI + spreadAngle
        const velMag = Math.random() * 2.5 + 0.5
        const twinklePhase = Math.random() * Math.PI * 2
        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(baseAngle) * velMag,
          vy: Math.sin(baseAngle) * velMag,
          alpha: Math.random() * 0.55 + 0.3,
          size: Math.random() * 1.5 + 0.4,
          decay: Math.random() * 0.025 + 0.012,
          drag: Math.random() * 0.03 + 0.02,
          twinkle: twinklePhase,
          twinkleSpeed: Math.random() * 0.25 + 0.1,
        })
      }
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        const dx = prevX !== null ? x - prevX : 0
        const dy = prevY !== null ? y - prevY : 0
        prevX = x
        prevY = y
        spawnParticles(x, y, dx, dy)
      }
    }

    globalThis.addEventListener('mousemove', onMouseMove)

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles = particles.filter((p) => p.alpha > 0.01)
      for (const p of particles) {
        p.vx *= (1 - p.drag)
        p.vy *= (1 - p.drag)
        p.x += p.vx
        p.y += p.vy
        p.twinkle += p.twinkleSpeed
        p.alpha -= p.decay

        const twinkleMod = 1 + Math.sin(p.twinkle) * 0.15
        const a = Math.max(0, p.alpha * twinkleMod)

        // Halo suave
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5)
        grad.addColorStop(0,   `rgba(255,255,255,${(a * 0.55).toFixed(4)})`)
        grad.addColorStop(0.3, `rgba(220,235,255,${(a * 0.22).toFixed(4)})`)
        grad.addColorStop(1,   'rgba(255,255,255,0)')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Núcleo nítido
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${(a * 0.6).toFixed(4)})`
        ctx.fill()
      }
      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      globalThis.removeEventListener('mousemove', onMouseMove)
    }
  }, [])
}

/* -- scroll reveal -- */
function useReveal() {
  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => ob.observe(el))
    return () => ob.disconnect()
  }, [])
}

/* Ã¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€Â
   STARFIELD Ã¢â‚¬â€ canvas com estrelas piscando
Ã¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€Â */
function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Generate stars
    const STAR_COLORS = ['rgba(167,139,250,', 'rgba(96,165,250,', 'rgba(255,255,255,']
    const pickStarColor = () => {
      const r = Math.random()
      if (r > 0.85) return STAR_COLORS[0]
      if (r > 0.7) return STAR_COLORS[1]
      return STAR_COLORS[2]
    }
    const STAR_COUNT = 320
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.2,
      base: Math.random() * 0.7 + 0.15,
      speed: Math.random() * 0.012 + 0.003,
      phase: Math.random() * Math.PI * 2,
      color: pickStarColor(),
    }))

    // Cosmic dust ribbons (static smeared spots)
    const dust = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      rx: Math.random() * 180 + 60,
      ry: Math.random() * 40 + 12,
      angle: Math.random() * Math.PI,
      alpha: Math.random() * 0.035 + 0.008,
      color: Math.random() > 0.5 ? '139,92,246' : '96,165,250',
    }))

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw dust ribbons
      dust.forEach((d) => {
        ctx.save()
        ctx.translate(d.x, d.y)
        ctx.rotate(d.angle)
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, d.rx)
        g.addColorStop(0, `rgba(${d.color},${d.alpha})`)
        g.addColorStop(1, `rgba(${d.color},0)`)
        ctx.scale(1, d.ry / d.rx)
        ctx.beginPath()
        ctx.arc(0, 0, d.rx, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
        ctx.restore()
      })

      // Draw stars
      stars.forEach((s) => {
        const alpha = s.base + Math.sin(t * s.speed * 60 + s.phase) * (s.base * 0.7)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `${s.color}${alpha.toFixed(3)})`
        ctx.fill()

        // Tiny cross sparkle on bigger stars
        if (s.r > 1.2) {
          ctx.strokeStyle = `${s.color}${(alpha * 0.5).toFixed(3)})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(s.x - s.r * 2.5, s.y)
          ctx.lineTo(s.x + s.r * 2.5, s.y)
          ctx.moveTo(s.x, s.y - s.r * 2.5)
          ctx.lineTo(s.x, s.y + s.r * 2.5)
          ctx.stroke()
        }
      })

      t += 0.016
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  )
}

/* -- check icon -- */
function Check({ color = '#a78bfa' }) {
  return (
    <div
      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
      style={{ background: `${color}20`, border: `1px solid ${color}60` }}
    >
      <svg className="w-3 h-3" style={{ color }} fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}

/* -- shooting stars -- */
function ShootingStars() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = []
    const spawn = () => {
      const x     = Math.random() * canvas.width * 1.4 - canvas.width * 0.2
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3
      const speed = Math.random() * 6 + 5
      const len   = Math.random() * 120 + 60
      const alpha = Math.random() * 0.6 + 0.4
      stars.push({ x, y: -10, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, len, alpha, fade: 0 })
    }

    let t = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 1
      if (t % 28 === 0) spawn()

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i]
        s.x  += s.vx
        s.y  += s.vy
        s.fade += 0.018

        const a = s.alpha * Math.max(0, 1 - s.fade)
        if (a <= 0 || s.y > canvas.height + 20) { stars.splice(i, 1); continue }

        const tailX = s.x - s.vx / speed(s) * s.len
        const tailY = s.y - s.vy / speed(s) * s.len

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
        grad.addColorStop(0, `rgba(255,255,255,0)`)
        grad.addColorStop(0.6, `rgba(200,220,255,${(a * 0.4).toFixed(3)})`)
        grad.addColorStop(1, `rgba(255,255,255,${a.toFixed(3)})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()

        // bright head dot
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`
        ctx.fill()
      }
    }

    function speed(s) {
      const m = Math.hypot(s.vx, s.vy)
      return m === 0 ? 1 : m
    }

    loop()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
      aria-hidden="true"
    />
  )
}

/* -- section divider -- */
function SectionDivider() {
  return (
    <div aria-hidden="true" style={{ position: 'relative', zIndex: 10, height: 2, overflow: 'hidden' }}>
      <style>{`
        @keyframes dividerSweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      {/* trilho base apagado */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
      }} />
      {/* brilho que varre da esquerda pra direita */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        background: 'linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.55) 20%, rgba(96,165,250,0.45) 45%, rgba(52,211,153,0.4) 65%, rgba(244,114,182,0.45) 85%, transparent 100%)',
        animation: 'dividerSweep 7s linear infinite',
        filter: 'drop-shadow(0 0 4px rgba(167,139,250,0.5)) drop-shadow(0 0 10px rgba(96,165,250,0.3))',
      }} />
    </div>
  )
}

/* -- section badge -- */
function Badge({ children }) {
  return (
    <p className="reveal flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-4">
      <span className="w-8 h-px" style={{ background: 'rgba(167,139,250,0.5)' }} />
      {children}
    </p>
  )
}

/* ------------------------------------------------ */
function useGlobeParticles() {
  useEffect(() => {
    const CONTAINER_ID = 'eduxrealms-globe-particles'
    const CONFIG = {
      particles: {
        number: { value: 110, density: { enable: true, value_area: 900 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
        opacity: {
          value: 0.45,
          random: true,
          anim: { enable: true, speed: 0.8, opacity_min: 0, sync: false },
        },
        size: { value: 2, random: true, anim: { enable: false } },
        line_linked: { enable: false },
        move: {
          enable: true,
          speed: 0.7,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: false }, onclick: { enable: false }, resize: true },
      },
      retina_detect: true,
    }

    const init = () => {
      if (window.particlesJS) window.particlesJS(CONTAINER_ID, CONFIG)
    }

    if (window.particlesJS) {
      init()
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
      script.async = true
      script.onload = init
      document.body.appendChild(script)
    }

    return () => {
      if (window.pJSDom?.length > 0) {
        window.pJSDom.forEach((dom) => dom.pJS.fn.vendors.destroypJS())
        window.pJSDom = []
      }
    }
  }, [])
}

/* ------------------------------------------------ */
export default function EduxRealms() {
  const { t } = useTranslation()
  const canvasRef = useRef(null)
  const audioRef = useRef(null)
  useReveal()
  useDustCanvas(canvasRef)
  useGlobeParticles()

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return
    audioEl.volume = 0.1

    const tryPlay = () => {
      const playPromise = audioEl.play()
      if (playPromise?.catch) {
        playPromise.catch(() => {
          // Browsers may block autoplay with sound until user interaction.
        })
      }
    }

    const unlockAudio = () => {
      if (!audioEl.paused) return
      tryPlay()
    }

    tryPlay()
    window.addEventListener('pointerdown', unlockAudio, { once: true })

    return () => {
      window.removeEventListener('pointerdown', unlockAudio)
      audioEl.pause()
      audioEl.currentTime = 0
    }
  }, [])

  return (
    <div style={{ color: 'white', position: 'relative' }}>

      <audio ref={audioRef} src={musicGalaxy} autoPlay loop preload="auto" />

      {/* ── Efeitos globais de fundo ── */}
      <StarField />
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
      {/* ?????????????????????????????????????????
          HERO
      ????????????????????????????????????????? */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden pt-24"
        style={{ background: 'transparent' }}
      >
        <ShootingStars />
        {/* Galaxy background */}
        <div className="overflow-hidden pointer-events-none" aria-hidden="true"
          style={{ position: 'fixed', inset: 0, zIndex: -1 }}
        >
          <div
            className="absolute inset-0 opacity-25"
            style={{ backgroundImage: `url(${IMG.heroGalaxy})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #020207 35%, rgba(2,2,7,0.5) 65%, transparent 100%)' }} />
        </div>

        <Container className="relative z-10 py-20">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto -mt-20">
            {/* Pill badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
              style={{ background: 'rgba(139,92,246,0.12)', borderColor: 'rgba(139,92,246,0.35)' }}
            >
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-violet-300 text-xs font-semibold uppercase tracking-widest">
                {t('eduxrealms_page.hero_badge')}
              </span>
            </div>

            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.9] mb-6">
              {t('eduxrealms_page.hero_h1_1')}{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)' }}
              >
                {t('eduxrealms_page.hero_h1_2')}
              </span>
              <br />
              {t('eduxrealms_page.hero_h1_3')}
            </h1>

            <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-2xl">
              {t('eduxrealms_page.hero_desc')}
            </p>

          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
          <span className="text-white/30 text-[10px] uppercase tracking-[0.22em] font-semibold">Scroll</span>
          <div
            className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2"
            style={{ boxShadow: '0 0 12px rgba(167,139,250,0.15)' }}
          >
            <div
              className="w-1 h-2.5 rounded-full"
              style={{
                background: 'linear-gradient(180deg, #a78bfa, #60a5fa)',
                animation: 'scrollDot 1.6s ease-in-out infinite',
              }}
            />
          </div>
          <style>{`
            @keyframes scrollDot {
              0%   { transform: translateY(0);   opacity: 1; }
              60%  { transform: translateY(10px); opacity: 0.2; }
              100% { transform: translateY(0);   opacity: 1; }
            }
          `}</style>
        </div>
      </section>

      <SectionDivider />

      {/* ?????????????????????????????????????????
          O QUE É EDUXREALMS
      ????????????????????????????????????????? */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: '#020207' }}
      >
        <div
          id="eduxrealms-globe-particles"
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        />
        <Container className="relative" style={{ zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Globe 3D */}
            <div className="reveal relative">
              <div
                className="rounded-3xl overflow-hidden"
                style={{ boxShadow: '0 0 70px rgba(0,0,0,0.45)', background: '#020209' }}
              >
                <div className="w-full aspect-square">
                  <GlobeViz />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="relative">
              {/* Glows ambientes — fora da caixa, no fundo da seção */}
              <div className="absolute -inset-10 pointer-events-none">
                <div
                  className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px]"
                  style={{ background: 'rgba(99,102,241,0.18)' }}
                />
                <div
                  className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[120px]"
                  style={{ background: 'rgba(14,165,233,0.14)' }}
                />
              </div>

              <div className="relative z-10">
                <Badge>{t('eduxrealms_page.intro_badge')}</Badge>
                <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                  {t('eduxrealms_page.intro_h2_1')}{' '}
                  <span
                    className="text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #60a5fa)' }}
                  >
                    {t('eduxrealms_page.intro_h2_2')}
                  </span>
                </h2>
                <p className="reveal text-white/70 text-lg leading-relaxed mb-4">
                  {t('eduxrealms_page.intro_p1')}
                </p>
                <p className="reveal text-white/55 text-base leading-relaxed mb-10">
                  {t('eduxrealms_page.intro_p2')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ?????????????????????????????????????????
          MUNDOS 3D · O MULTIVERSO
      ????????????????????????????????????????? */}
      <section className="py-28" style={{ background: '#020207' }}>
        <Container>
          <div className="text-center mb-16">
            <Badge>{t('eduxrealms_page.worlds_badge')}</Badge>
            <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-4">
              {t('eduxrealms_page.worlds_h2_1')}{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #f472b6, #a78bfa, #60a5fa)' }}
              >
                {t('eduxrealms_page.worlds_h2_2')}
              </span>
            </h2>
            <p className="reveal text-white/45 max-w-2xl mx-auto leading-relaxed">
              {t('eduxrealms_page.worlds_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: t('eduxrealms_page.world_1_title'), desc: t('eduxrealms_page.world_1_desc'), image: img1EduxRealms, color: '#60a5fa', tag: t('eduxrealms_page.world_1_tag'), icon: '' },
              { title: t('eduxrealms_page.world_2_title'), desc: t('eduxrealms_page.world_2_desc'), image: img2EduxRealms, color: '#f59e0b', tag: t('eduxrealms_page.world_2_tag'), icon: '' },
              { title: t('eduxrealms_page.world_3_title'), desc: t('eduxrealms_page.world_3_desc'), image: img3EduxRealms, color: '#34d399', tag: t('eduxrealms_page.world_3_tag'), icon: '' },
              { title: t('eduxrealms_page.world_4_title'), desc: t('eduxrealms_page.world_4_desc'), image: img4EduxRealms, color: '#f472b6', tag: t('eduxrealms_page.world_4_tag'), icon: '' },
              { title: t('eduxrealms_page.world_5_title'), desc: t('eduxrealms_page.world_5_desc'), image: img5EduxRealms, color: '#a78bfa', tag: t('eduxrealms_page.world_5_tag'), icon: '' },
              { title: t('eduxrealms_page.world_6_title'), desc: t('eduxrealms_page.world_6_desc'), image: img6EduxRealms, color: '#10b981', tag: t('eduxrealms_page.world_6_tag'), icon: '' },
            ].map((world) => (
              <div
                key={world.title}
                className="reveal group relative rounded-3xl overflow-hidden cursor-pointer"
                style={{ background: '#050510', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={world.image}
                    alt={world.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #050510 0%, rgba(5,5,16,0.5) 50%, rgba(0,0,0,0.3) 100%)' }} />
                  <div
                    className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(5,5,16,0.80)', color: world.color, border: `1px solid ${world.color}55`, backdropFilter: 'blur(12px)' }}
                  >
                    {world.icon} {world.tag}
                  </div>
                </div>
                <div className="p-5 relative">
                  <h3 className="text-base font-black text-white mb-1.5">{world.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{world.desc}</p>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-b-3xl"
                    style={{ boxShadow: `inset 0 0 40px ${world.color}18` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ?????????????????????????????????????????
          ACESSO · VR · COMPUTADOR · CELULAR
      ????????????????????????????????????????? */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, rgba(2,2,7,0.85) 0%, rgba(6,3,13,0.85) 50%, rgba(2,2,7,0.85) 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full blur-[160px]"
            style={{ background: 'rgba(139,92,246,0.09)' }}
          />
        </div>
        <Container>
          <div className="text-center mb-16">
            <Badge>{t('eduxrealms_page.platforms_badge')}</Badge>
            <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-4">
              {t('eduxrealms_page.platforms_h2_1')}{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #60a5fa)' }}
              >
                {t('eduxrealms_page.platforms_h2_2')}
              </span>
            </h2>
            <p className="reveal text-white/45 max-w-xl mx-auto leading-relaxed">
              {t('eduxrealms_page.platforms_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* VR */}
            <div
              className="reveal relative rounded-3xl overflow-hidden border group"
              style={{ background: 'rgba(139,92,246,0.05)', borderColor: 'rgba(139,92,246,0.2)' }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={IMG.vrHeadset}
                  alt="Óculos de Realidade Virtual"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #06030d 0%, rgba(6,3,13,0.5) 60%, rgba(0,0,0,0.35) 100%)' }} />
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(10,6,30,0.82)', color: '#c4b5fd', backdropFilter: 'blur(12px)', border: '1px solid rgba(167,139,250,0.45)' }}
                >
                  {t('eduxrealms_page.platform_vr_label')}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-white mb-2">{t('eduxrealms_page.platform_vr_title')}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {t('eduxrealms_page.platform_vr_desc')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Meta Quest', 'Apple Vision', 'Pico 4'].map((d) => (
                    <span
                      key={d}
                      className="text-xs px-2.5 py-1 rounded-lg text-white/50 border border-white/10"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Computer */}
            <div
              className="reveal relative rounded-3xl overflow-hidden border group"
              style={{ background: 'rgba(59,130,246,0.05)', borderColor: 'rgba(59,130,246,0.2)' }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={IMG.computer}
                  alt="Computador"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #06030d 0%, rgba(6,3,13,0.5) 60%, rgba(0,0,0,0.35) 100%)' }} />
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(6,12,30,0.82)', color: '#93c5fd', backdropFilter: 'blur(12px)', border: '1px solid rgba(96,165,250,0.45)' }}
                >
                  {t('eduxrealms_page.platform_pc_label')}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-white mb-2">{t('eduxrealms_page.platform_pc_title')}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {t('eduxrealms_page.platform_pc_desc')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Chrome', 'Firefox', 'Safari', 'Edge'].map((d) => (
                    <span
                      key={d}
                      className="text-xs px-2.5 py-1 rounded-lg text-white/50 border border-white/10"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div
              className="reveal relative rounded-3xl overflow-hidden border group"
              style={{ background: 'rgba(52,211,153,0.05)', borderColor: 'rgba(52,211,153,0.2)' }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={IMG.mobile}
                  alt="Celular"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #06030d 0%, rgba(6,3,13,0.5) 60%, rgba(0,0,0,0.35) 100%)' }} />
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(4,20,14,0.82)', color: '#6ee7b7', backdropFilter: 'blur(12px)', border: '1px solid rgba(52,211,153,0.45)' }}
                >
                  {t('eduxrealms_page.platform_mobile_label')}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-white mb-2">{t('eduxrealms_page.platform_mobile_title')}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {t('eduxrealms_page.platform_mobile_desc')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['iOS', 'Android', 'AR Mode'].map((d) => (
                    <span
                      key={d}
                      className="text-xs px-2.5 py-1 rounded-lg text-white/50 border border-white/10"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ?????????????????????????????????????????
          FEATURES GRID
      ????????????????????????????????????????? */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, rgba(2,2,7,0.85) 0%, rgba(6,3,13,0.85) 50%, rgba(2,2,7,0.85) 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute bottom-0 left-1/4 w-[700px] h-[300px] rounded-full blur-[130px]"
            style={{ background: 'rgba(139,92,246,0.08)' }}
          />
        </div>
        <Container>
          <div className="text-center mb-16">
            <Badge>Recursos</Badge>
            <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-4">
              Tecnologia de{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #60a5fa)' }}
              >
                Ponta
              </span>
            </h2>
            <p className="reveal text-white/45 max-w-xl mx-auto">
              Tudo que você precisa para transformar o aprendizado em uma aventura inesquecível.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🎮', title: 'Sistema Totalmente Jogável', desc: 'Quests, boss battles de conhecimento e puzzles educacionais para engajar alunos no aprendizado.', glow: '#a78bfa' },
              { icon: '🥽', title: 'Realidade Virtual Completa', desc: 'Suporte nativo para Meta Quest, Apple Vision Pro, Pico e outros headsets do mercado.', glow: '#60a5fa' },
              { icon: '🌐', title: 'Mundos 3D Interativos', desc: 'Ambientes completamente interativos onde cada objeto pode ser explorado e analisado.', glow: '#34d399' },
              { icon: '👥', title: 'Colaboração Multijogador', desc: 'Estude com colegas no mesmo mundo virtual com avatares 3D e colaboração em tempo real.', glow: '#f472b6' },
              { icon: '🏆', title: 'Conquistas & Rankings', desc: 'Sistema completo de gamificação com troféus, medalhas, leaderboard e progressão de nível.', glow: '#f59e0b' },
              { icon: '📊', title: 'Analytics de Aprendizado', desc: 'Professores acompanham o progresso e engajamento individual de cada aluno em tempo real.', glow: '#10b981' },
              { icon: '🤖', title: 'IA Adaptativa', desc: 'O sistema aprende com cada aluno e adapta os desafios ao nível e ritmo de aprendizado.', glow: '#a78bfa' },
              { icon: '🗺️', title: 'Excursões Virtuais', desc: 'Visite museus, monumentos históricos, fundo do oceano e outros lugares sem sair da escola.', glow: '#60a5fa' },
              { icon: '📱', title: 'App Mobile com AR', desc: 'Aplicativo iOS e Android com realidade aumentada integrada usando a câmera do celular.', glow: '#34d399' },
            ].map((feat) => (
              <div
                key={feat.title}
                className="reveal group relative rounded-2xl p-6 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: `${feat.glow}18`, border: `1px solid ${feat.glow}30` }}
                >
                  {feat.icon}
                </div>
                <h4 className="text-white font-bold mb-2 text-sm leading-snug">{feat.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{feat.desc}</p>
                <div
                  className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `${feat.glow}30` }}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ?????????????????????????????????????????
          CTA FINAL
      ????????????????????????????????????????? */}
      <section
        className="py-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #020207 0%, #06030d 50%, #020207 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-15"
            style={{ backgroundImage: `url(${IMG.nebula})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, #020207 0%, rgba(2,2,7,0.65) 50%, #020207 100%)' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] rounded-full blur-[160px]"
            style={{ background: 'rgba(139,92,246,0.13)' }}
          />
        </div>
        <Container className="relative z-10 text-center">
          <Badge>{t('eduxrealms_page.cta_badge')}</Badge>
          <h2 className="reveal text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {t('eduxrealms_page.cta_h2_1')}{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #f472b6, #a78bfa, #60a5fa)' }}
            >
              {t('eduxrealms_page.cta_h2_2')}
            </span>
          </h2>
          <p className="reveal text-white/45 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('eduxrealms_page.cta_desc')}
          </p>

        </Container>
      </section>
    </div>
  )
}

