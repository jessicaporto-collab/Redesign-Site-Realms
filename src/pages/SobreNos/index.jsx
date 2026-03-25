import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import AnimatedCounter from '../../components/ui/AnimatedCounter'

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
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─────────────────────────────────────────────────────────────────
//  Tech Particles Background (canvas)
// ─────────────────────────────────────────────────────────────────
function TechParticlesBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = 0, h = 0
    let pts = []
    let raf

    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
      rebuildPts()
    }

    const rebuildPts = () => {
      const n = Math.min(Math.floor((w * h) / 9000), 110)
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.6 + 0.4,
        cyan: Math.random() > 0.55,
        alpha: Math.random() * 0.55 + 0.25,
      }))
    }

    const LINK = 145

    const tick = () => {
      ctx.clearRect(0, 0, w, h)

      // connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(96,165,250,${(1 - d / LINK) * 0.22})`
            ctx.lineWidth = 0.55
            ctx.stroke()
          }
        }
      }

      // dots
      pts.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.cyan
          ? `rgba(34,211,238,${p.alpha})`
          : `rgba(96,165,250,${p.alpha})`
        ctx.fill()
      })

      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.65 }}
    />
  )
}

// ─────────────────────────────────────────────────────────────────
//  Hero
// ─────────────────────────────────────────────────────────────────
function HeroSection() {
  const { t } = useTranslation()
  const contentRef = useRef(null)

  useEffect(() => {
    const items = contentRef.current?.querySelectorAll('.hero-item')
    if (!items) return
    items.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      const delay = 300 + i * 130
      const timer = setTimeout(() => {
        el.style.transition =
          'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, delay)
      return () => clearTimeout(timer)
    })
  }, [])

  return (
    <section
      id="about-hero"
      className="relative min-h-[92vh] w-full overflow-hidden flex items-center"
      style={{ background: '#0a0a0a' }}
    >
      {/* Animated particle network */}
      <TechParticlesBg />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(96,165,250,0.75) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          opacity: 0.13,
        }}
        aria-hidden="true"
      />

      {/* Multi-layer depth gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 85% 60% at 12% 48%, rgba(37,99,235,0.22) 0%, transparent 60%)',
            'radial-gradient(ellipse 65% 50% at 88% 18%, rgba(124,58,237,0.16) 0%, transparent 58%)',
            'radial-gradient(ellipse 55% 55% at 58% 88%, rgba(6,182,212,0.13) 0%, transparent 60%)',
            'radial-gradient(ellipse 40% 35% at 72% 55%, rgba(37,99,235,0.10) 0%, transparent 55%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* Pulsing glow orb – top left */}
      <div
        className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full pointer-events-none animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.16) 0%, transparent 70%)',
          animationDuration: '5s',
        }}
        aria-hidden="true"
      />

      {/* Pulsing glow orb – bottom right */}
      <div
        className="absolute -bottom-28 -right-28 w-[600px] h-[600px] rounded-full pointer-events-none animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%)',
          animationDuration: '7s',
          animationDelay: '2.5s',
        }}
        aria-hidden="true"
      />

      {/* Cyan accent orb – top right */}
      <div
        className="absolute top-8 right-8 w-72 h-72 rounded-full pointer-events-none animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)',
          animationDuration: '9s',
          animationDelay: '1s',
        }}
        aria-hidden="true"
      />

      {/* Corner circuit decoration – top right */}
      <svg
        className="absolute top-0 right-0 w-72 h-72 pointer-events-none opacity-[0.06]"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <path d="M200 0 L200 80 L140 80 L140 140 L80 140 L80 200" stroke="rgba(96,165,250,1)" strokeWidth="1" />
        <path d="M200 30 L170 30 L170 110 L110 110 L110 200" stroke="rgba(34,211,238,1)" strokeWidth="1" />
        <circle cx="140" cy="80" r="4" fill="rgba(96,165,250,1)" />
        <circle cx="110" cy="110" r="4" fill="rgba(34,211,238,1)" />
        <circle cx="80" cy="140" r="3" fill="rgba(96,165,250,1)" />
      </svg>

      {/* Corner circuit decoration – bottom left */}
      <svg
        className="absolute bottom-0 left-0 w-56 h-56 pointer-events-none opacity-[0.05]"
        viewBox="0 0 160 160"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 160 L0 80 L60 80 L60 40 L120 40 L120 0" stroke="rgba(124,58,237,1)" strokeWidth="1" />
        <circle cx="60" cy="80" r="4" fill="rgba(124,58,237,1)" />
        <circle cx="120" cy="40" r="3" fill="rgba(96,165,250,1)" />
      </svg>

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-14 lg:gap-20 items-center">
          {/* Left: text */}
          <div className="max-w-3xl">
            <p className="hero-item flex items-center gap-3 text-white/40 text-[11px] font-semibold uppercase tracking-[0.25em] mb-7">
              <span className="w-8 h-px bg-white/35" aria-hidden="true" />
              {t('about_page.hero_tagline')}
            </p>

            <h1 className="hero-item text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.92] tracking-tight mb-6">
              {t('about_page.hero_line1')}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400">
                {t('about_page.hero_line2')}
              </span>
            </h1>

            <p className="hero-item text-base sm:text-lg text-white/45 leading-relaxed max-w-2xl mb-10 font-light">
              {t('about_page.hero_description')}
            </p>

            <div className="hero-item flex flex-wrap gap-4">
              <Button to="/contato" size="lg" variant="primary">
                {t('about_page.hero_cta_contact')}
              </Button>
              <Button to="/" size="lg" variant="outline-white">
                {t('about_page.hero_cta_products')}
              </Button>
            </div>
          </div>

          {/* Right: metrics */}
          <div className="hero-item hidden lg:grid grid-cols-2 gap-4 min-w-[340px]">
            {[
              { value: 20,  suffix: '+',  label: t('about.years') },
              { value: 9,   suffix: 'M+', label: t('about.students') },
              { value: 350, suffix: 'K+', label: t('about.teachers') },
              { value: 14,  suffix: 'M+', label: t('about_page.hero_stat4') },
            ].map(({ value, suffix, label }) => (
              <div
                key={label}
                className="card-dark p-6 text-center hover:-translate-y-0.5 transition-transform duration-300"
              >
                <div className="text-3xl font-extrabold text-white tabular-nums leading-none mb-2">
                  <AnimatedCounter to={value} suffix={suffix} duration={1800} />
                </div>
                <p className="text-xs text-white/35 font-light leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Mission, Vision & Story
// ─────────────────────────────────────────────────────────────────
function MissionSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section id="mission" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Top border glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.25) 40%, rgba(34,211,238,0.3) 50%, rgba(96,165,250,0.25) 60%, transparent)' }}
        aria-hidden="true"
      />
      {/* Subtle hexagonal dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(96,165,250,0.4) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          opacity: 0.07,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(37,99,235,0.09) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef}>
          <div className="text-center mb-16">
            <span className="reveal section-badge mb-4 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              {t('about_page.mission_badge')}
            </span>
            <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t('about_page.mission_heading')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mission */}
            <div className="reveal delay-2 card-dark p-8 group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t('pages.about.mission_title')}</h3>
              <p className="text-sm text-white/45 leading-relaxed font-light">{t('pages.about.mission_text')}</p>
            </div>

            {/* Vision */}
            <div className="reveal delay-3 card-dark p-8 group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t('pages.about.vision_title')}</h3>
              <p className="text-sm text-white/45 leading-relaxed font-light">{t('pages.about.vision_text')}</p>
            </div>

            {/* Story */}
            <div className="reveal delay-4 card-dark p-8 group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t('pages.about.content_title')}</h3>
              <p className="text-sm text-white/45 leading-relaxed font-light">{t('pages.about.content_text')}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Timeline
// ─────────────────────────────────────────────────────────────────
const MILESTONES = [
  { year: '2004', titleKey: 'about_page.tl_2004_title', descKey: 'about_page.tl_2004_desc', accent: 'bg-blue-600' },
  { year: '2008', titleKey: 'about_page.tl_2008_title', descKey: 'about_page.tl_2008_desc', accent: 'bg-violet-600' },
  { year: '2014', titleKey: 'about_page.tl_2014_title', descKey: 'about_page.tl_2014_desc', accent: 'bg-emerald-600' },
  { year: '2018', titleKey: 'about_page.tl_2018_title', descKey: 'about_page.tl_2018_desc', accent: 'bg-cyan-600' },
  { year: '2021', titleKey: 'about_page.tl_2021_title', descKey: 'about_page.tl_2021_desc', accent: 'bg-orange-600' },
  { year: '2024', titleKey: 'about_page.tl_2024_title', descKey: 'about_page.tl_2024_desc', accent: 'bg-blue-500' },
]

function TimelineSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section id="timeline" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#0d0d0d' }}>
      {/* Top border glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.22) 40%, rgba(96,165,250,0.28) 50%, rgba(124,58,237,0.22) 60%, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(37,99,235,0.10) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(96,165,250,0.35) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.06,
        }}
        aria-hidden="true"
      />
      <Container>
        <div ref={sectionRef}>
          <div className="text-center mb-16">
            <span className="reveal section-badge mb-4 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              {t('about_page.timeline_badge')}
            </span>
            <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t('about_page.timeline_heading')}
            </h2>
            <p className="reveal delay-3 text-white/40 mt-4 max-w-xl mx-auto font-light leading-relaxed">
              {t('about_page.timeline_sub')}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div
              className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.25) 8%, rgba(255,255,255,0.25) 92%, transparent 100%)' }}
              aria-hidden="true"
            />

            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className={`reveal delay-${Math.min(i + 1, 6)} relative pl-12 lg:pl-0 ${
                    i % 2 === 0
                      ? 'lg:pr-[calc(50%+2.5rem)]'
                      : 'lg:pl-[calc(50%+2.5rem)]'
                  }`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-2 lg:left-1/2 lg:-translate-x-1/2 top-6 w-4 h-4 rounded-full z-10 bg-transparent border-2 border-white/70"
                    aria-hidden="true"
                  />

                  <div className="card-dark p-6 hover:-translate-y-0.5 transition-transform duration-300">
                    <span className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-2 block">
                      {m.year}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2">{t(m.titleKey)}</h3>
                    <p className="text-sm text-white/40 font-light leading-relaxed">{t(m.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Values
// ─────────────────────────────────────────────────────────────────
const VALUES = [
  {
    gradient: 'from-blue-600 to-blue-800',
    titleKey: 'about_page.val_innovation_title',
    descKey: 'about_page.val_innovation_desc',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    gradient: 'from-emerald-600 to-emerald-800',
    titleKey: 'about_page.val_access_title',
    descKey: 'about_page.val_access_desc',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    gradient: 'from-violet-600 to-violet-800',
    titleKey: 'about_page.val_impact_title',
    descKey: 'about_page.val_impact_desc',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    gradient: 'from-orange-600 to-orange-800',
    titleKey: 'about_page.val_excellence_title',
    descKey: 'about_page.val_excellence_desc',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
]

function ValuesSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section id="values" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Top border glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.18) 35%, rgba(96,165,250,0.28) 50%, rgba(34,211,238,0.18) 65%, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 60%, rgba(124,58,237,0.08) 0%, transparent 60%)' }}
        aria-hidden="true"
      />
      <Container>
        <div ref={sectionRef}>
          <div className="text-center mb-14">
            <span className="reveal section-badge mb-4 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              {t('about_page.values_badge')}
            </span>
            <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t('about_page.values_heading')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <div
                key={v.titleKey}
                className={`reveal delay-${i + 2} card-dark p-7 group hover:-translate-y-1 transition-transform duration-300`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{t(v.titleKey)}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">{t(v.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Team
// ─────────────────────────────────────────────────────────────────
const TEAM = [
  { name: 'Ana Costa',       role: 'CEO & Co-founder',    initials: 'AC', accent: 'bg-blue-600' },
  { name: 'Carlos Silva',    role: 'CTO & Co-founder',    initials: 'CS', accent: 'bg-violet-600' },
  { name: 'Marina Oliveira', role: 'Head of Product',     initials: 'MO', accent: 'bg-emerald-600' },
  { name: 'Rafael Santos',   role: 'Head of Engineering', initials: 'RS', accent: 'bg-orange-600' },
  { name: 'Juliana Lima',    role: 'Head of Design',      initials: 'JL', accent: 'bg-pink-600' },
  { name: 'Bruno Ferreira',  role: 'Head of Data & AI',   initials: 'BF', accent: 'bg-cyan-600' },
]

function TeamSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section id="team" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#0d0d0d' }}>
      {/* Top border glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.22) 40%, rgba(34,211,238,0.28) 50%, rgba(96,165,250,0.22) 60%, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 100%, rgba(37,99,235,0.09) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      <Container>
        <div ref={sectionRef}>
          <div className="text-center mb-14">
            <span className="reveal section-badge mb-4 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              {t('about_page.team_badge')}
            </span>
            <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t('about_page.team_heading')}
            </h2>
            <p className="reveal delay-3 text-white/40 mt-4 max-w-lg mx-auto font-light">
              {t('about_page.team_sub')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className={`reveal delay-${Math.min(i + 2, 6)} card-dark p-6 text-center group hover:-translate-y-1 transition-transform duration-300`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${member.accent} flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {member.initials}
                </div>
                <h3 className="text-sm font-semibold text-white leading-tight mb-1">{member.name}</h3>
                <p className="text-xs text-white/35 font-light">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Final CTA
// ─────────────────────────────────────────────────────────────────
function CTAFinalSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section id="about-cta" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Deep glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(37,99,235,0.14) 0%, transparent 68%)' }}
        aria-hidden="true"
      />
      {/* Top border glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.28) 35%, rgba(34,211,238,0.38) 50%, rgba(96,165,250,0.28) 65%, transparent)' }}
        aria-hidden="true"
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(96,165,250,0.6) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          opacity: 0.07,
        }}
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef} className="text-center max-w-3xl mx-auto">
          <span className="reveal section-badge mb-6 justify-center block">
            <span className="w-5 h-px bg-current" aria-hidden="true" />
            {t('about_page.cta_badge')}
          </span>
          <h2 className="reveal delay-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.0] tracking-tight mb-6">
            {t('about_page.cta_line1')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400">
              {t('about_page.cta_line2')}
            </span>
          </h2>
          <p className="reveal delay-3 text-white/40 text-lg leading-relaxed mb-10 font-light">
            {t('about_page.cta_sub')}
          </p>
          <div className="reveal delay-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contato" size="lg" variant="primary">
              {t('about_page.cta_contact')}
            </Button>
            <Button to="/" size="lg" variant="outline-white">
              {t('about_page.cta_home')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Page
// ─────────────────────────────────────────────────────────────────
export default function SobreNos() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <TimelineSection />
      <ValuesSection />
      <TeamSection />
      <CTAFinalSection />
    </>
  )
}


