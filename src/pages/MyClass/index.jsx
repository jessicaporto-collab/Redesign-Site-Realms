import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Container from '../../components/ui/Container'

/* ---------------------------------------------
   Unsplash images (free / no copyright)
--------------------------------------------- */
const IMG = {
  heroClassroom:
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=70&fit=crop',
  liveClass:
    'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=900&q=85&fit=crop',
  collaboration:
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=85&fit=crop',
  dashboard:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&fit=crop',
  mobile:
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80&fit=crop',
  learning:
    'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80&fit=crop',
  nebula:
    'https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?w=1600&q=60&fit=crop',
  teacher:
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=75&fit=crop',
  students:
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=75&fit=crop',
  quiz:
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=75&fit=crop',
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

/* ─────────────────────────────────────────────
   STARFIELD – canvas com estrelas piscando
───────────────────────────────────────────── */
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

      stars.forEach((s) => {
        const alpha = s.base + Math.sin(t * s.speed * 60 + s.phase) * (s.base * 0.7)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `${s.color}${alpha.toFixed(3)})`
        ctx.fill()

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

/* ─────────────────────────────────────────────
   FLOATING NEBULA – orbs animados flutuando
───────────────────────────────────────────── */
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
        background: 'radial-gradient(circle, rgba(167,139,250,0.055) 0%, transparent 70%)',
        animation: 'nebulaFloat3 26s ease-in-out infinite',
        filter: 'blur(2px)',
      }} />
      <div style={{
        position: 'absolute', top: '65%', right: '20%',
        width: 340, height: 180, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(168,85,247,0.05) 0%, transparent 70%)',
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
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        background: 'linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.55) 20%, rgba(96,165,250,0.45) 45%, rgba(168,85,247,0.4) 65%, rgba(139,92,246,0.45) 85%, transparent 100%)',
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
export default function MyClass() {
  const { t } = useTranslation()
  useReveal()

  return (
    <div style={{ background: '#020207', color: 'white', position: 'relative' }}>
      {/* ── Efeitos globais de fundo ── */}
      <StarField />
      <FloatingNebula />

      {/* ═══════════════════════════════
          HERO
      ═══════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden pt-24"
        style={{ background: 'radial-gradient(ellipse at 65% 45%, #0e0520 0%, #07030f 40%, #020207 70%)' }}
      >
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: `url(${IMG.heroClassroom})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #020207 35%, rgba(2,2,7,0.5) 65%, transparent 100%)' }} />
          <div className="absolute top-16 right-16 w-[520px] h-[520px] rounded-full blur-[130px]" style={{ background: 'rgba(139,92,246,0.22)' }} />
          <div className="absolute bottom-16 left-1/3 w-[380px] h-[380px] rounded-full blur-[100px]" style={{ background: 'rgba(168,85,247,0.12)' }} />
          <div className="absolute top-1/2 right-1/4 w-[280px] h-[280px] rounded-full blur-[80px]" style={{ background: 'rgba(167,139,250,0.09)' }} />
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
                  {t('myclass_page.hero_badge')}
                </span>
              </div>

              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.9] mb-6">
                {t('myclass_page.hero_h1_1')}{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 50%, #60a5fa 100%)' }}
                >
                  {t('myclass_page.hero_h1_2')}
                </span>
                <br />
                {t('myclass_page.hero_h1_3')}
              </h1>

              <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl">
                {t('myclass_page.hero_desc')}
              </p>

              {/* Available on */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-white/30 text-xs uppercase tracking-widest font-semibold">
                  {t('myclass_page.hero_available_label')}
                </span>
                {[t('myclass_page.hero_platform_1'), t('myclass_page.hero_platform_2'), t('myclass_page.hero_platform_3')].map((mode) => (
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

            {/* -- Right: classroom image -- */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div
                className="relative rounded-3xl overflow-hidden w-full aspect-[4/5]"
                style={{ boxShadow: '0 0 100px rgba(139,92,246,0.35), 0 0 40px rgba(168,85,247,0.2)' }}
              >
                <img
                  src={IMG.liveClass}
                  alt="Aula ao vivo MyClass"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(2,2,7,0.7) 0%, transparent 60%)' }} />
              </div>

              {/* Floating chip · top right */}
              <div
                className="absolute -top-4 -right-6 rounded-2xl px-5 py-3 border border-white/10"
                style={{ background: 'rgba(8,8,28,0.92)', backdropFilter: 'blur(20px)' }}
              >
                <p className="text-sm font-bold text-white">{t('myclass_page.hero_chip1_title')}</p>
                <p className="text-xs text-white/40">{t('myclass_page.hero_chip1_sub')}</p>
              </div>

              {/* Floating chip · bottom left */}
              <div
                className="absolute -bottom-4 -left-6 rounded-2xl px-5 py-3 border border-violet-500/20"
                style={{ background: 'rgba(8,8,28,0.92)', backdropFilter: 'blur(20px)' }}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  <p className="text-sm font-bold text-white">{t('myclass_page.hero_chip2_title')}</p>
                </div>
                <p className="text-xs text-white/40">{t('myclass_page.hero_chip2_sub')}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════
          O QUE É MYCLASS
      ═══════════════════════════════ */}
      <section className="py-28 relative" style={{ background: '#020207' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full blur-[160px]"
            style={{ background: 'rgba(139,92,246,0.07)' }}
          />
        </div>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <div className="reveal relative">
              <div
                className="rounded-3xl overflow-hidden"
                style={{ boxShadow: '0 0 70px rgba(139,92,246,0.22)' }}
              >
                <img
                  src={IMG.collaboration}
                  alt="Colaboração em sala de aula com MyClass"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              {/* Chip · bottom right */}
              <div
                className="absolute -bottom-6 -right-6 rounded-2xl p-4 border border-white/10"
                style={{ background: 'rgba(8,8,28,0.95)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(139,92,246,0.2)' }}>📡</div>
                  <div>
                    <p className="text-white font-bold text-sm">Aulas ao Vivo</p>
                    <p className="text-white/40 text-xs">Interação em tempo real</p>
                  </div>
                </div>
              </div>
              {/* Chip · top left */}
              <div
                className="absolute -top-6 -left-6 rounded-2xl p-4 border border-white/10"
                style={{ background: 'rgba(8,8,28,0.95)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(167,139,250,0.2)' }}>👩‍🏫</div>
                  <div>
                    <p className="text-white font-bold text-sm">Gestão Completa</p>
                    <p className="text-white/40 text-xs">Turmas · Alunos · Conteúdo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <Badge>{t('myclass_page.intro_badge')}</Badge>
              <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                {t('myclass_page.intro_h2_1')}{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #c084fc)' }}
                >
                  {t('myclass_page.intro_h2_2')}
                </span>
              </h2>
              <p className="reveal text-white/55 text-lg leading-relaxed mb-4">
                {t('myclass_page.intro_p1')}
              </p>
              <p className="reveal text-white/40 text-base leading-relaxed mb-10">
                {t('myclass_page.intro_p2')}
              </p>

              <ul className="reveal space-y-3 mb-10">
                {[
                  t('myclass_page.intro_feat_1'),
                  t('myclass_page.intro_feat_2'),
                  t('myclass_page.intro_feat_3'),
                  t('myclass_page.intro_feat_4'),
                  t('myclass_page.intro_feat_5'),
                  t('myclass_page.intro_feat_6'),
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

      {/* ═══════════════════════════════
          PLATAFORMAS
      ═══════════════════════════════ */}
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
            <Badge>{t('myclass_page.platforms_badge')}</Badge>
            <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-4">
              {t('myclass_page.platforms_h2_1')}{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #c084fc)' }}
              >
                {t('myclass_page.platforms_h2_2')}
              </span>
            </h2>
            <p className="reveal text-white/45 max-w-xl mx-auto leading-relaxed">
              {t('myclass_page.platforms_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dashboard */}
            <div
              className="reveal relative rounded-3xl overflow-hidden border group"
              style={{ background: 'rgba(139,92,246,0.05)', borderColor: 'rgba(139,92,246,0.2)' }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={IMG.dashboard}
                  alt="Dashboard Web MyClass"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #06030d 0%, rgba(6,3,13,0.5) 60%, rgba(0,0,0,0.35) 100%)' }} />
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(10,6,30,0.82)', color: '#c4b5fd', backdropFilter: 'blur(12px)', border: '1px solid rgba(167,139,250,0.45)' }}
                >
                  {t('myclass_page.platform_web_label')}
                </div>
              </div>
              <div className="p-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(167,139,250,0.25)' }}
                >
                  🖥️
                </div>
                <h3 className="text-xl font-black text-white mb-2">{t('myclass_page.platform_web_title')}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {t('myclass_page.platform_web_desc')}
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

            {/* Live Classes */}
            <div
              className="reveal relative rounded-3xl overflow-hidden border group"
              style={{ background: 'rgba(168,85,247,0.05)', borderColor: 'rgba(168,85,247,0.2)' }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={IMG.liveClass}
                  alt="Aulas ao vivo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #06030d 0%, rgba(6,3,13,0.5) 60%, rgba(0,0,0,0.35) 100%)' }} />
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(20,6,30,0.82)', color: '#e879f9', backdropFilter: 'blur(12px)', border: '1px solid rgba(232,121,249,0.45)' }}
                >
                  {t('myclass_page.platform_live_label')}
                </div>
              </div>
              <div className="p-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(232,121,249,0.25)' }}
                >
                  🎥
                </div>
                <h3 className="text-xl font-black text-white mb-2">{t('myclass_page.platform_live_title')}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {t('myclass_page.platform_live_desc')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Vídeo HD', 'Quadro Branco', 'Gravação', 'Chat'].map((d) => (
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
              style={{ background: 'rgba(96,165,250,0.05)', borderColor: 'rgba(96,165,250,0.2)' }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={IMG.mobile}
                  alt="App Mobile MyClass"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #06030d 0%, rgba(6,3,13,0.5) 60%, rgba(0,0,0,0.35) 100%)' }} />
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(4,12,30,0.82)', color: '#93c5fd', backdropFilter: 'blur(12px)', border: '1px solid rgba(96,165,250,0.45)' }}
                >
                  {t('myclass_page.platform_mobile_label')}
                </div>
              </div>
              <div className="p-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.25)' }}
                >
                  📱
                </div>
                <h3 className="text-xl font-black text-white mb-2">{t('myclass_page.platform_mobile_title')}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {t('myclass_page.platform_mobile_desc')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['iOS', 'Android', 'Notificações', 'Offline'].map((d) => (
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

      {/* ═══════════════════════════════
          FUNCIONALIDADES PARA PROFESSORES & ALUNOS
      ═══════════════════════════════ */}
      <section className="py-28" style={{ background: '#020207' }}>
        <Container>
          <div className="text-center mb-16">
            <Badge>{t('myclass_page.users_badge')}</Badge>
            <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-4">
              {t('myclass_page.users_h2_1')}{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #f472b6, #a78bfa, #60a5fa)' }}
              >
                {t('myclass_page.users_h2_2')}
              </span>
            </h2>
            <p className="reveal text-white/45 max-w-2xl mx-auto leading-relaxed">
              {t('myclass_page.users_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Professores */}
            <div
              className="reveal relative rounded-3xl overflow-hidden border"
              style={{ background: 'rgba(139,92,246,0.04)', borderColor: 'rgba(139,92,246,0.18)' }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={IMG.teacher} alt="Professor usando MyClass" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #06030d 0%, rgba(6,3,13,0.4) 60%, rgba(0,0,0,0.2) 100%)' }} />
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(10,6,30,0.82)', color: '#c4b5fd', backdropFilter: 'blur(12px)', border: '1px solid rgba(167,139,250,0.45)' }}
                >
                  {t('myclass_page.teacher_label')}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-white mb-4">{t('myclass_page.teacher_title')}</h3>
                <ul className="space-y-3">
                  {[
                    t('myclass_page.teacher_feat_1'),
                    t('myclass_page.teacher_feat_2'),
                    t('myclass_page.teacher_feat_3'),
                    t('myclass_page.teacher_feat_4'),
                    t('myclass_page.teacher_feat_5'),
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check color="#a78bfa" />
                      <span className="text-white/60 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Alunos */}
            <div
              className="reveal relative rounded-3xl overflow-hidden border"
              style={{ background: 'rgba(96,165,250,0.04)', borderColor: 'rgba(96,165,250,0.18)' }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={IMG.students} alt="Alunos usando MyClass" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #06030d 0%, rgba(6,3,13,0.4) 60%, rgba(0,0,0,0.2) 100%)' }} />
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(6,12,30,0.82)', color: '#93c5fd', backdropFilter: 'blur(12px)', border: '1px solid rgba(96,165,250,0.45)' }}
                >
                  {t('myclass_page.student_label')}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-white mb-4">{t('myclass_page.student_title')}</h3>
                <ul className="space-y-3">
                  {[
                    t('myclass_page.student_feat_1'),
                    t('myclass_page.student_feat_2'),
                    t('myclass_page.student_feat_3'),
                    t('myclass_page.student_feat_4'),
                    t('myclass_page.student_feat_5'),
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check color="#60a5fa" />
                      <span className="text-white/60 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════
          FEATURES GRID
      ═══════════════════════════════ */}
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
            <Badge>{t('myclass_page.features_badge')}</Badge>
            <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-4">
              {t('myclass_page.features_h2_1')}{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #c084fc)' }}
              >
                {t('myclass_page.features_h2_2')}
              </span>
            </h2>
            <p className="reveal text-white/45 max-w-xl mx-auto">
              {t('myclass_page.features_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '📡', title: t('myclass_page.feat_1_title'), desc: t('myclass_page.feat_1_desc'), glow: '#a78bfa' },
              { icon: '🤖', title: t('myclass_page.feat_2_title'), desc: t('myclass_page.feat_2_desc'), glow: '#c084fc' },
              { icon: '📊', title: t('myclass_page.feat_3_title'), desc: t('myclass_page.feat_3_desc'), glow: '#60a5fa' },
              { icon: '📝', title: t('myclass_page.feat_4_title'), desc: t('myclass_page.feat_4_desc'), glow: '#f472b6' },
              { icon: '👥', title: t('myclass_page.feat_5_title'), desc: t('myclass_page.feat_5_desc'), glow: '#f59e0b' },
              { icon: '🔔', title: t('myclass_page.feat_6_title'), desc: t('myclass_page.feat_6_desc'), glow: '#10b981' },
              { icon: '📅', title: t('myclass_page.feat_7_title'), desc: t('myclass_page.feat_7_desc'), glow: '#a78bfa' },
              { icon: '📁', title: t('myclass_page.feat_8_title'), desc: t('myclass_page.feat_8_desc'), glow: '#60a5fa' },
              { icon: '🔒', title: t('myclass_page.feat_9_title'), desc: t('myclass_page.feat_9_desc'), glow: '#34d399' },
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

      {/* ═══════════════════════════════
          CTA FINAL
      ═══════════════════════════════ */}
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
          <Badge>{t('myclass_page.cta_badge')}</Badge>
          <h2 className="reveal text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {t('myclass_page.cta_h2_1')}{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #f472b6, #a78bfa, #c084fc)' }}
            >
              {t('myclass_page.cta_h2_2')}
            </span>
          </h2>
          <p className="reveal text-white/45 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('myclass_page.cta_desc')}
          </p>
        </Container>
      </section>
    </div>
  )
}
