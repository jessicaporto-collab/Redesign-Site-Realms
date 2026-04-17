import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Container from '../../components/ui/Container'
import img1Persona from './assets/img1-persona.jpg'
import img2Persona from './assets/img2-persona.png'
import personaBannerBg from '../../assets/realms-personas/Persona.png'
import faleComPersonaBg from '../../assets/realms-personas/falecompersona.jpg'
import persona2Bg from '../../assets/realms-personas/Persona2.jpg'
import capImg1 from '../../assets/realms-persona/img1-persona.png'
import capImg2 from '../../assets/realms-persona/img 2-persona.png'
import capImg3 from '../../assets/realms-persona/img3-persona.png'
import capImg4 from '../../assets/realms-persona/img4-persona.png'
import capImg5 from '../../assets/realms-persona/img5-persona.png'
import capImg6 from '../../assets/realms-persona/img6-persona.png'

/* ─────────────────────────────────────────────
   Mouse dust / particle effect  (canvas-based)
───────────────────────────────────────────── */
const DUST_COLORS = [
  '#3b82f6', // blue-500
  '#6366f1', // indigo-500
  '#8b5cf6', // violet-500
  '#a855f7', // purple-500
  '#ec4899', // pink-500
  '#f472b6', // pink-400
  '#c084fc', // purple-400
]

function useDustCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const spawnParticles = (x, y) => {
      const count = 4 + Math.floor(Math.random() * 4)
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.4 + Math.random() * 1.4
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          alpha: 0.7 + Math.random() * 0.3,
          size: 2 + Math.random() * 4,
          color: DUST_COLORS[Math.floor(Math.random() * DUST_COLORS.length)],
          decay: 0.012 + Math.random() * 0.018,
        })
      }
    }

    // Listen on window so z-index of content never blocks the events
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        spawnParticles(x, y)
      }
    }

    globalThis.addEventListener('mousemove', onMouseMove)

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles = particles.filter((p) => p.alpha > 0.01)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.015 // gentle gravity
        p.vx *= 0.97
        p.alpha -= p.decay
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
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

/* ─────────────────────────────────────────────
   Scroll reveal hook
───────────────────────────────────────────── */
function useReveal(ref) {
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal')
    if (!els) return
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        }),
      { threshold: 0.1 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ─────────────────────────────────────────────
   Entrance anim hook (for hero)
───────────────────────────────────────────── */
function useEntrance(ref) {
  useEffect(() => {
    const items = ref.current?.querySelectorAll('.hero-item')
    if (!items) return
    items.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      const timer = setTimeout(() => {
        el.style.transition =
          'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 200 + i * 140)
      return () => clearTimeout(timer)
    })
  }, [])
}

/* ─────────────────────────────────────────────
   Full-width banner slides data
───────────────────────────────────────────── */
const PERSONA_SLIDES = [
  {
    id: 'ia',
    image: personaBannerBg,
    accent: '#60a5fa',
    symbol: '✦',
    title: 'Tutor que aprende\ncom o aluno',
    subtitle: 'IA Personalizada',
    desc: 'A persona adapta ritmo, tom e nível de cada resposta ao perfil único de quem aprende.',
    cta: 'Conhecer Personas',
    ctaPath: '/contato',
  },
  {
    id: 'identidade',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80&fit=crop',
    accent: '#c084fc',
    symbol: '◈',
    title: 'Personas com\npersonalidade própria',
    subtitle: 'Identidade Visual',
    desc: 'Nome, avatar e estilo totalmente personalizáveis para reforçar a marca da sua instituição.',
    cta: 'Ver planos',
    ctaPath: '/contato',
  },
  {
    id: 'multilingue',
    image: persona2Bg,
    accent: '#22d3ee',
    symbol: '◉',
    title: 'Comunicação\nsem fronteiras',
    subtitle: 'Multilíngue',
    desc: 'Suporte nativo a múltiplos idiomas para cada aluno interagir no idioma em que aprende melhor.',
    cta: 'Falar com vendas',
    ctaPath: '/contato',
  },
]

const BANNER_TOTAL = PERSONA_SLIDES.length
// Clone last slide at start, first slide at end — enables seamless infinite right loop
const LOOPED_SLIDES = [
  PERSONA_SLIDES[BANNER_TOTAL - 1],
  ...PERSONA_SLIDES,
  PERSONA_SLIDES[0],
]

/* ─────────────────────────────────────────────
   Badge component
───────────────────────────────────────────── */
function Badge({ children }) {
  return (
    <p className="reveal flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-4">
      <span className="w-8 h-px" style={{ background: 'rgba(167,139,250,0.5)' }} />
      {children}
      <span className="w-8 h-px" style={{ background: 'rgba(167,139,250,0.5)' }} />
    </p>
  )
}

/* ─────────────────────────────────────────────
   Page component
───────────────────────────────────────────── */
export default function RealmsPersonas() {
  const { t } = useTranslation()
  const canvasRef = useRef(null)
  const ctaCanvasRef = useRef(null)
  const heroRef = useRef(null)
  const capRef = useRef(null)
  const stepsRef = useRef(null)
  const casesRef = useRef(null)
  // bannerActive: 1..BANNER_TOTAL are real slides; 0 = clone of last; BANNER_TOTAL+1 = clone of first
  const [bannerActive, setBannerActive] = useState(1)
  const [bannerTransition, setBannerTransition] = useState(true)
  const bannerIntervalRef = useRef(null)

  const bannerNext = useCallback(() => setBannerActive((v) => v + 1), [])
  const bannerPrev = useCallback(() => setBannerActive((v) => v - 1), [])
  const bannerResetInterval = useCallback(() => {
    clearInterval(bannerIntervalRef.current)
    bannerIntervalRef.current = setInterval(bannerNext, 6000)
  }, [bannerNext])

  useEffect(() => {
    bannerResetInterval()
    return () => clearInterval(bannerIntervalRef.current)
  }, [bannerResetInterval])

  // Seamless loop: after transition to a clone, silently reset to the real counterpart
  useEffect(() => {
    if (bannerActive === LOOPED_SLIDES.length - 1) {
      const t = setTimeout(() => { setBannerTransition(false); setBannerActive(1) }, 630)
      return () => clearTimeout(t)
    }
    if (bannerActive === 0) {
      const t = setTimeout(() => { setBannerTransition(false); setBannerActive(BANNER_TOTAL) }, 630)
      return () => clearTimeout(t)
    }
  }, [bannerActive])

  // Re-enable transition one frame after the silent reset
  useEffect(() => {
    if (!bannerTransition) {
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setBannerTransition(true)))
      return () => cancelAnimationFrame(raf)
    }
  }, [bannerTransition])



  useDustCanvas(canvasRef)
  useDustCanvas(ctaCanvasRef)
  useEntrance(heroRef)
  useReveal(capRef)
  useReveal(stepsRef)
  useReveal(casesRef)

  const CAPABILITIES = [
    { icon: '💬', tag: t('personas_page.cap_1_tag'), title: t('personas_page.cap_1_title'), desc: t('personas_page.cap_1_desc'), accent: '#3b82f6', image: capImg1 },
    { icon: '🧠', tag: t('personas_page.cap_2_tag'), title: t('personas_page.cap_2_title'), desc: t('personas_page.cap_2_desc'), accent: '#8b5cf6', image: capImg2 },
    { icon: '🎭', tag: t('personas_page.cap_3_tag'), title: t('personas_page.cap_3_title'), desc: t('personas_page.cap_3_desc'), accent: '#ec4899', image: capImg3 },
    { icon: '📚', tag: t('personas_page.cap_4_tag'), title: t('personas_page.cap_4_title'), desc: t('personas_page.cap_4_desc'), accent: '#6366f1', image: capImg4 },
    { icon: '🗂️', tag: t('personas_page.cap_5_tag'), title: t('personas_page.cap_5_title'), desc: t('personas_page.cap_5_desc'), accent: '#a855f7', image: capImg5 },
    { icon: '📊', tag: t('personas_page.cap_6_tag'), title: t('personas_page.cap_6_title'), desc: t('personas_page.cap_6_desc'), accent: '#f472b6', image: capImg6 },
  ]

  const STEPS = [
    { num: '01', title: t('personas_page.step_1_title'), desc: t('personas_page.step_1_desc'), color: '#3b82f6' },
    { num: '02', title: t('personas_page.step_2_title'), desc: t('personas_page.step_2_desc'), color: '#8b5cf6' },
    { num: '03', title: t('personas_page.step_3_title'), desc: t('personas_page.step_3_desc'), color: '#ec4899' },
  ]

  const USE_CASES = [
    {
      tag: t('personas_page.case_1_tag'), title: t('personas_page.case_1_title'), desc: t('personas_page.case_1_desc'),
      points: [t('personas_page.case_1_pt1'), t('personas_page.case_1_pt2'), t('personas_page.case_1_pt3'), t('personas_page.case_1_pt4')],
      gradient: 'from-blue-900/60 to-indigo-900/60', border: 'border-blue-500/20', accent: '#3b82f6', emoji: '🎓',
    },
    {
      tag: t('personas_page.case_2_tag'), title: t('personas_page.case_2_title'), desc: t('personas_page.case_2_desc'),
      points: [t('personas_page.case_2_pt1'), t('personas_page.case_2_pt2'), t('personas_page.case_2_pt3'), t('personas_page.case_2_pt4')],
      gradient: 'from-violet-900/60 to-purple-900/60', border: 'border-violet-500/20', accent: '#8b5cf6', emoji: '🏫',
    },
  ]

  return (
    <div className="bg-[#0a0a0a] min-h-screen">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        className="relative h-auto sm:h-screen sm:min-h-[680px] w-full overflow-hidden flex items-start sm:items-center"
        aria-label="Realms Personas Hero"
      >
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(99,60,255,0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(236,72,153,0.25) 0%, transparent 55%), radial-gradient(ellipse 50% 70% at 50% 80%, rgba(59,130,246,0.2) 0%, transparent 60%), #0a0a0a',
          }}
          aria-hidden="true"
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        {/* Mouse dust canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Content */}
        <div ref={heroRef} className="relative z-20 w-full container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-24 sm:pb-0">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div
              className="hero-item inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
              style={{ background: 'rgba(99,60,255,0.1)', borderColor: 'rgba(139,92,246,0.35)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#a78bfa' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#a78bfa' }}>
                {t('personas_page.hero_badge')}
              </span>
            </div>

            <h1 className="hero-item text-[2rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              <span className="text-white">
                {t('personas_page.hero_h1_prefix')}{' '}
              </span>
              <span
                className="text-transparent bg-clip-text sm:whitespace-nowrap"
                style={{ backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 40%, #ec4899 80%)' }}
              >
                {t('personas_page.hero_h1_brand')}
              </span>
              {t('personas_page.hero_h1_2') && (
                <>
                  <br />
                  <span className="text-white whitespace-nowrap">
                    {t('personas_page.hero_h1_2')}
                  </span>
                </>
              )}
            </h1>

            <p className="hero-item text-lg sm:text-xl text-white/55 font-light leading-relaxed mb-10 max-w-xl">
              {t('personas_page.hero_desc')}
            </p>

            <div className="hero-item flex flex-wrap gap-4 justify-center">
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white/70 border border-white/15 hover:bg-white hover:border-white hover:text-gray-900 transition-all duration-300"
              >
                {t('personas_page.hero_cta_secondary')}
              </Link>
            </div>

            {/* Floating tags */}
            <div className="hero-item flex flex-wrap gap-3 mt-12 justify-center">
              {[t('personas_page.hero_tag1'), t('personas_page.hero_tag2'), t('personas_page.hero_tag3'), t('personas_page.hero_tag4'), t('personas_page.hero_tag5')].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider text-white/50 border border-white/10"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CAPABILITIES
      ══════════════════════════════════════ */}
      <section className="bg-[#0d0d0d] py-24 lg:py-32 relative overflow-hidden">
        {/* Background blobs */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            background:
              'radial-gradient(ellipse 55% 60% at 15% 50%, rgba(59,130,246,0.08) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            background:
              'radial-gradient(ellipse 50% 55% at 85% 50%, rgba(236,72,153,0.07) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
          aria-hidden="true"
        />

        <Container>
          <div ref={capRef}>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CAPABILITIES.map((cap, i) => (
                <div
                  key={cap.title}
                  className={`reveal delay-${(i % 6) + 1} group relative rounded-3xl overflow-hidden cursor-pointer`}
                  style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={cap.image}
                      alt={cap.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.15) 40%, transparent 100%)' }}
                    />

                  </div>
                  <div className="p-5 relative">
                    <h3 className="text-base font-black text-white mb-1.5">{cap.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{cap.desc}</p>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-b-3xl"
                      style={{ boxShadow: `inset 0 0 40px ${cap.accent}18` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] pt-10 pb-24 lg:pt-14 lg:pb-32 relative">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
          aria-hidden="true"
        />
        <Container>
          <div ref={stepsRef}>
            <div className="text-center mb-16">
              <Badge>{t('personas_page.how_badge')}</Badge>
              <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-4">
                {t('personas_page.how_h2_1')}{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)' }}
                >
                  {t('personas_page.how_h2_2')}
                </span>
                {' '}{t('personas_page.how_h2_3')}
              </h2>
              <p className="reveal text-white/45 max-w-xl mx-auto leading-relaxed">
                {t('personas_page.how_desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              {/* Connector line segment 1: circle 01 → circle 02 */}
              <div
                className="hidden lg:block absolute top-10 h-px pointer-events-none"
                style={{
                  left: 'calc(16.66% + 2.5rem)',
                  right: 'calc(50% + 2.5rem)',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                  opacity: 0.25,
                }}
                aria-hidden="true"
              />
              {/* Connector line segment 2: circle 02 → circle 03 */}
              <div
                className="hidden lg:block absolute top-10 h-px pointer-events-none"
                style={{
                  left: 'calc(50% + 2.5rem)',
                  right: 'calc(16.66% + 2.5rem)',
                  background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)',
                  opacity: 0.25,
                }}
                aria-hidden="true"
              />

              {STEPS.map((step, i) => (
                <div key={step.num} className={`reveal delay-${i + 2} text-center`}>
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-extrabold text-white mx-auto mb-6 relative"
                    style={{
                      background: `radial-gradient(circle, ${step.color}30, transparent 70%)`,
                      border: `1px solid ${step.color}40`,
                      boxShadow: `0 0 30px ${step.color}20`,
                    }}
                  >
                    <span
                      className="text-transparent bg-clip-text text-3xl font-black"
                      style={{ backgroundImage: `linear-gradient(135deg, ${step.color}, #fff)` }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-white font-extrabold text-xl mb-3">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          CARDS – FALE COM O PERSONA
      ══════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-6">
        <div ref={casesRef} className="px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Card 1 – Fale com o Persona */}
            <div className="reveal delay-2 group rounded-3xl overflow-hidden bg-white/5 transition-colors duration-300">
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={faleComPersonaBg}
                  alt="Fale com o Persona"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="px-8 py-7">
                <h3 className="text-white font-extrabold text-2xl mb-2">
                  {t('personas_page.card_talk_title')}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed font-light">
                  {t('personas_page.card_talk_desc')}
                </p>
              </div>
            </div>

            {/* Card 2 – Use onde quiser */}
            <div className="reveal delay-3 group rounded-3xl overflow-hidden bg-white/5 transition-colors duration-300">
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={img2Persona}
                  alt="Use onde quiser"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="px-8 py-7">
                <h3 className="text-white font-extrabold text-2xl mb-2">
                  {t('personas_page.card_anywhere_title')}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed font-light">
                  {t('personas_page.card_anywhere_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FULL-WIDTH BANNER CAROUSEL
      ══════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] relative overflow-hidden" style={{ height: '520px' }}>
        {/* Sliding track */}
        <div
          style={{
            display: 'flex',
            height: '100%',
            gap: '12px',
            transform: `translateX(calc(7.5vw - ${bannerActive} * (85vw + 12px)))`,
            transition: bannerTransition ? 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
            willChange: 'transform',
          }}
        >
          {LOOPED_SLIDES.map((slide, i) => (
            <div
              key={`${slide.id}-${i}`}
              className="flex-shrink-0 relative overflow-hidden"
              style={{
                width: '85vw',
                height: '100%',
                borderRadius: '16px',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: i === bannerActive ? 1 : 0.45,
              cursor: i === bannerActive ? 'default' : 'pointer',
              transition: 'opacity 600ms ease',
            }}
            >
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-10 lg:px-14">
                {/* Symbol */}
                <span className="text-2xl mb-4 font-bold" style={{ color: slide.accent }} aria-hidden="true">
                  {slide.symbol}
                </span>
                {/* Subtitle tag */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full border"
                    style={{ color: slide.accent, borderColor: `${slide.accent}35`, background: `${slide.accent}12` }}
                  >
                    {slide.subtitle}
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.0] tracking-tight mb-3 max-w-2xl">
                  {slide.title.split('\n').map((line) => (
                    <span key={line}>{line}<br /></span>
                  ))}
                </h2>
                <p className="text-white/50 text-base leading-relaxed mb-8 max-w-lg font-light">
                  {slide.desc}
                </p>

                {/* CTA + indicators — só no slide ativo */}
                {i === bannerActive && (
                  <div className="flex items-center gap-6 flex-wrap">
                    <Link
                      to={slide.ctaPath}
                      className="inline-flex items-center gap-2 text-white text-sm font-semibold border border-white/30 rounded-full px-6 py-3 hover:bg-white hover:text-gray-900 transition-all duration-200"
                    >
                      {slide.cta}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <div className="flex gap-2" role="tablist" aria-label="Banner carousel">
                      {PERSONA_SLIDES.map((s, di) => (
                        <button
                          key={s.id}
                          role="tab"
                          aria-selected={di === (bannerActive - 1 + BANNER_TOTAL) % BANNER_TOTAL}
                          onClick={() => { setBannerActive(di + 1); bannerResetInterval() }}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: di === (bannerActive - 1 + BANNER_TOTAL) % BANNER_TOTAL ? '24px' : '6px',
                            height: '6px',
                            background: di === (bannerActive - 1 + BANNER_TOTAL) % BANNER_TOTAL ? '#fff' : 'rgba(255,255,255,0.35)',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                          }}
                          aria-label={`Slide ${di + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Prev arrow */}
        <button
          onClick={() => { bannerPrev(); bannerResetInterval() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/70 transition-all"
          aria-label="Slide anterior"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {/* Next arrow */}
        <button
          onClick={() => { bannerNext(); bannerResetInterval() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/70 transition-all"
          aria-label="Próximo slide"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>



      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-24 lg:py-32 relative overflow-hidden">
        {/* Mouse dust canvas */}
        <canvas
          ref={ctaCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
          aria-hidden="true"
        />
        {/* Center glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,60,255,0.12) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />

        <Container className="relative z-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-6">
              <span className="w-5 h-px bg-white/20"></span>
              {' '}{t('personas_page.cta_badge')}{' '}
              <span className="w-5 h-px bg-white/20"></span>
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              {t('personas_page.cta_h2')}
            </h2>
            <p className="text-white/40 text-lg mb-10 font-light leading-relaxed">
              {t('personas_page.cta_desc')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white border border-white/25 hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                {t('personas_page.cta_secondary')}
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </div>
  )
}
