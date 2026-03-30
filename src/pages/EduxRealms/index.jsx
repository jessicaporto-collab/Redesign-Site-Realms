import { useEffect, useRef } from 'react'
import Container from '../../components/ui/Container'
import CosmicCursor from '../../components/ui/CosmicCursor'

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

/* Ã¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€Â
   FLOATING NEBULA Ã¢â‚¬â€ orbs animados flutuando
Ã¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€ÂÃ¢â€Â */
function FloatingNebula() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}
    >
      <div style={{
        position: 'absolute', top: '8%', right: '5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)',
        animation: 'nebulaFloat1 18s ease-in-out infinite',
        filter: 'blur(2px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', left: '3%',
        width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)',
        animation: 'nebulaFloat2 22s ease-in-out infinite',
        filter: 'blur(2px)',
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '45%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.055) 0%, transparent 70%)',
        animation: 'nebulaFloat3 26s ease-in-out infinite',
        filter: 'blur(2px)',
      }} />
      <div style={{
        position: 'absolute', top: '65%', right: '20%',
        width: 340, height: 180, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(52,211,153,0.05) 0%, transparent 70%)',
        animation: 'nebulaFloat1 30s ease-in-out infinite reverse',
        filter: 'blur(2px)',
        transform: 'rotate(-20deg)',
      }} />

      <style>{`
        @keyframes nebulaFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.08); }
          66% { transform: translate(-20px, 25px) scale(0.95); }
        }
        @keyframes nebulaFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(40px, 30px) scale(1.1); }
          70% { transform: translate(-30px, -20px) scale(0.92); }
        }
        @keyframes nebulaFloat3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(calc(-50% + 50px), calc(-50% - 35px)) scale(1.15); }
        }
      `}</style>
    </div>
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
export default function EduxRealms() {
  useReveal()

  return (
    <div style={{ background: '#020207', color: 'white', position: 'relative' }}>
      <CosmicCursor />
      {/* Ã¢â€â‚¬Ã¢â€â‚¬ Efeitos globais de fundo Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <StarField />
      <FloatingNebula />
      {/* ?????????????????????????????????????????
          HERO
      ????????????????????????????????????????? */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden pt-24"
        style={{ background: 'radial-gradient(ellipse at 65% 45%, #0e0520 0%, #07030f 40%, #020207 70%)' }}
      >
        {/* Galaxy background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-25"
            style={{ backgroundImage: `url(${IMG.heroGalaxy})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #020207 35%, rgba(2,2,7,0.5) 65%, transparent 100%)' }} />
          {/* Nebula orbs */}
          <div className="absolute top-16 right-16 w-[520px] h-[520px] rounded-full blur-[130px]" style={{ background: 'rgba(139,92,246,0.2)' }} />
          <div className="absolute bottom-16 left-1/3 w-[380px] h-[380px] rounded-full blur-[100px]" style={{ background: 'rgba(59,130,246,0.12)' }} />
          <div className="absolute top-1/2 right-1/4 w-[280px] h-[280px] rounded-full blur-[80px]" style={{ background: 'rgba(236,72,153,0.09)' }} />
        </div>

        <Container className="relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* -- Left -- */}
            <div>
              {/* Pill badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
                style={{ background: 'rgba(139,92,246,0.12)', borderColor: 'rgba(139,92,246,0.35)' }}
              >
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-violet-300 text-xs font-semibold uppercase tracking-widest">
                  Realms Products · EduxRealms
                </span>
              </div>

              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.9] mb-6">
                O{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)' }}
                >
                  Multiverso
                </span>
                <br />
                da Educação
              </h1>

              <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl">
                Explore mundos 3D interativos, aprenda gamificando e mergulhe em experiências
                com Óculos de realidade virtual. Acessível pelo celular, computador ou headset VR.
              </p>



              {/* Available on */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-white/30 text-xs uppercase tracking-widest font-semibold">
                  Disponível em
                </span>
                {['🥽  VR Headset', '🖥️  Computador', '📱  Celular'].map((mode) => (
                  <span
                    key={mode}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-white/65 border border-white/10"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    {mode}
                  </span>
                ))}
              </div>
            </div>

            {/* -- Right: VR image -- */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div
                className="relative rounded-3xl overflow-hidden w-full aspect-[4/5]"
                style={{ boxShadow: '0 0 100px rgba(139,92,246,0.35), 0 0 40px rgba(99,102,241,0.2)' }}
              >
                <img
                  src={IMG.vrHeadset}
                  alt="Óculos de Realidade Virtual EduxRealms"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(2,2,7,0.7) 0%, transparent 60%)' }} />
              </div>

              {/* Floating chip · top right */}
              <div
                className="absolute -top-4 -right-6 rounded-2xl px-5 py-3 border border-white/10"
                style={{ background: 'rgba(8,8,28,0.92)', backdropFilter: 'blur(20px)' }}
              >
                <p className="text-sm font-bold text-white">3D Immersive</p>
                <p className="text-xs text-white/40">Interactive worlds</p>
              </div>

              {/* Floating chip · bottom left */}
              <div
                className="absolute -bottom-4 -left-6 rounded-2xl px-5 py-3 border border-violet-500/20"
                style={{ background: 'rgba(8,8,28,0.92)', backdropFilter: 'blur(20px)' }}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-sm font-bold text-white">VR Ready</p>
                </div>
                <p className="text-xs text-white/40">Meta Quest · Apple Vision · Pico</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ?????????????????????????????????????????
          O QUE É EDUXREALMS
      ????????????????????????????????????????? */}
      <section className="py-28 relative" style={{ background: '#020207' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full blur-[160px]"
            style={{ background: 'rgba(99,102,241,0.07)' }}
          />
        </div>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <div className="reveal relative">
              <div
                className="rounded-3xl overflow-hidden"
                style={{ boxShadow: '0 0 70px rgba(99,102,241,0.22)' }}
              >
                <img
                  src={IMG.vrPerson}
                  alt="Aluno usando EduxRealms em VR"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              {/* Chip · bottom right */}
              <div
                className="absolute -bottom-6 -right-6 rounded-2xl p-4 border border-white/10"
                style={{ background: 'rgba(8,8,28,0.95)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(139,92,246,0.2)' }}>🎮</div>
                  <div>
                    <p className="text-white font-bold text-sm">Sistema Jogável</p>
                    <p className="text-white/40 text-xs">Quests · Missões · Conquistas</p>
                  </div>
                </div>
              </div>
              {/* Chip · top left */}
              <div
                className="absolute -top-6 -left-6 rounded-2xl p-4 border border-white/10"
                style={{ background: 'rgba(8,8,28,0.95)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(52,211,153,0.2)' }}>🌐</div>
                  <div>
                    <p className="text-white font-bold text-sm">+20 Mundos 3D</p>
                    <p className="text-white/40 text-xs">Universos educacionais únicos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <Badge>O Multiverso da Educação</Badge>
              <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                Aprenda em{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #60a5fa)' }}
                >
                  Mundos Imersivos
                </span>
              </h2>
              <p className="reveal text-white/55 text-lg leading-relaxed mb-4">
                O EduxRealms é um sistema 3D interativo que transforma o aprendizado em uma
                aventura gamificada no multiverso. Explore salas de aula virtuais, complete quests
                e mergulhe em mundos que parecem jogos — mas ensinam de verdade.
              </p>
              <p className="reveal text-white/40 text-base leading-relaxed mb-10">
                Com suporte para Óculos de realidade virtual, você vê os elementos educacionais
                de perto com total imersão — como se estivesse dentro do universo. Tudo acessível
                pelo celular, computador ou headset VR.
              </p>

              <ul className="reveal space-y-3 mb-10">
                {[
                  'Salas de aula 3D totalmente interativas',
                  'Quests e missões de aprendizado gamificadas',
                  'Compatível com Óculos de realidade virtual',
                  'Mundos colaborativos e multijogador',
                  'Sistema de conquistas, badges e rankings',
                  'Acesso por celular, computador ou VR headset',
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <Check />
                    <span className="text-white/65 text-sm">{feat}</span>
                  </li>
                ))}
              </ul>


            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ?????????????????????????????????????????
          ACESSO · VR · COMPUTADOR · CELULAR
      ????????????????????????????????????????? */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #020207 0%, #06030d 50%, #020207 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full blur-[160px]"
            style={{ background: 'rgba(139,92,246,0.09)' }}
          />
        </div>
        <Container>
          <div className="text-center mb-16">
            <Badge>Acesso Universal</Badge>
            <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-4">
              Acesse de{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #60a5fa)' }}
              >
                Qualquer Lugar
              </span>
            </h2>
            <p className="reveal text-white/45 max-w-xl mx-auto leading-relaxed">
              Projetado para funcionar em todas as plataformas — da experiência mais imersiva
              possível no headset VR até o acesso rápido pelo smartphone.
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
                  ✨ Experiência Total
                </div>
              </div>
              <div className="p-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(167,139,250,0.25)' }}
                >
                  🥽
                </div>
                <h3 className="text-xl font-black text-white mb-2">Óculos de VR</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Imersão completa nos mundos 3D. Veja os elementos em tamanho real, interaja
                  com as mãos e sinta-se dentro do universo educacional.
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
                  🖥️ Acesso Completo
                </div>
              </div>
              <div className="p-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(96,165,250,0.25)' }}
                >
                  🖥️
                </div>
                <h3 className="text-xl font-black text-white mb-2">Computador</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Acesse todos os mundos 3D pelo navegador, sem instalação. Interface
                  completa com todos os recursos da plataforma.
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
                  📍 Em Qualquer Lugar
                </div>
              </div>
              <div className="p-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.25)' }}
                >
                  📱
                </div>
                <h3 className="text-xl font-black text-white mb-2">Celular</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Leve os mundos 3D no bolso. App nativo com realidade aumentada usando a
                  câmera do celular para sobrepor o conteúdo no mundo real.
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
          MUNDOS 3D · O MULTIVERSO
      ????????????????????????????????????????? */}
      <section className="py-28" style={{ background: '#020207' }}>
        <Container>
          <div className="text-center mb-16">
            <Badge>Os Universos</Badge>
            <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-4">
              Explore os{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #f472b6, #a78bfa, #60a5fa)' }}
              >
                Mundos 3D
              </span>
            </h2>
            <p className="reveal text-white/45 max-w-2xl mx-auto leading-relaxed">
              Cada disciplina tem seu próprio universo interativo. Viaje pelo sistema solar
              aprendendo ciências, explore civilizações antigas em história ou resolva equações
              em uma dimensão matemática.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Galáxia das Ciências',
                desc: 'Orbite planetas, observe reações químicas em 3D e explore o sistema solar em escala real.',
                image: IMG.spaceEarth,
                color: '#60a5fa',
                tag: 'Ciências',
                icon: '🔭',
              },
              {
                title: 'Civilizações Perdidas',
                desc: 'Caminhe pelas ruínas de Roma, Machu Picchu e as pirâmides do Egito em realidade virtual.',
                image: IMG.ruins,
                color: '#f59e0b',
                tag: 'História',
                icon: '🏛️',
              },
              {
                title: 'Dimensão Matemática',
                desc: 'Visualize equações tridimensionais, geometria e álgebra no espaço virtual interativo.',
                image: IMG.math,
                color: '#34d399',
                tag: 'Matemática',
                icon: '📐',
              },
              {
                title: 'Mundo das Letras',
                desc: 'Entre nos cenários dos clássicos da literatura e interaja com personagens históricos em 3D.',
                image: IMG.books,
                color: '#f472b6',
                tag: 'Linguagens',
                icon: '📚',
              },
              {
                title: 'Planeta da Tecnologia',
                desc: 'Explore circuitos por dentro, construa código e aprenda programação de forma visual e espacial.',
                image: IMG.tech,
                color: '#a78bfa',
                tag: 'Tecnologia',
                icon: '💻',
              },
              {
                title: 'Reino da Natureza',
                desc: 'Mergulhe nos oceanos, explore florestas tropicais e estude ecossistemas vivos em 3D.',
                image: IMG.nature,
                color: '#10b981',
                tag: 'Natureza',
                icon: '🌿',
              },
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
          FEATURES GRID
      ????????????????????????????????????????? */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #020207 0%, #06030d 50%, #020207 100%)' }}
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
          <Badge>Comece Hoje</Badge>
          <h2 className="reveal text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Embarque na{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #f472b6, #a78bfa, #60a5fa)' }}
            >
              Jornada Intergaláctica
            </span>
          </h2>
          <p className="reveal text-white/45 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Leve seus alunos para mundos que eles nunca imaginaram. O futuro da educação
            é imersivo, gamificado e incrível — e começa com o EduxRealms.
          </p>

        </Container>
      </section>
    </div>
  )
}

