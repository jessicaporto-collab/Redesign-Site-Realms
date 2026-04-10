import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CosmicCursor from '../../components/ui/CosmicCursor'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import AnimatedCounter from '../../components/ui/AnimatedCounter'
import smileLearnLogo from '../../assets/conteudo-educacional/logo-Smile and Learn.png'

// ── Particles hook ────────────────────────────────────────────────────────
function useParticles(containerId) {
  useEffect(() => {
    const PARTICLES_CONFIG = {
      particles: {
        number: { value: 160, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
        opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1, opacity_min: 0, sync: false } },
        size: { value: 3, random: true, anim: { enable: false, speed: 4, size_min: 0.3, sync: false } },
        line_linked: { enable: false },
        move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'bubble' },
          onclick: { enable: true, mode: 'repulse' },
          resize: true,
        },
        modes: {
          bubble: { distance: 250, size: 0, duration: 2, opacity: 0, speed: 3 },
          repulse: { distance: 400, duration: 0.4 },
        },
      },
      retina_detect: true,
    }

    const init = () => {
      if (globalThis.particlesJS) {
        globalThis.particlesJS(containerId, PARTICLES_CONFIG)
      }
    }

    if (globalThis.particlesJS) {
      init()
      return () => {
        if (globalThis.pJSDom && globalThis.pJSDom.length > 0) {
          globalThis.pJSDom.forEach((dom) => dom.pJS.fn.vendors.destroypJS())
          globalThis.pJSDom = []
        }
      }
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
    script.async = true
    script.onload = init
    document.body.appendChild(script)

    return () => {
      if (globalThis.pJSDom && globalThis.pJSDom.length > 0) {
        globalThis.pJSDom.forEach((dom) => dom.pJS.fn.vendors.destroypJS())
        globalThis.pJSDom = []
      }
    }
  }, [containerId])
}

// ── Scroll reveal hook ──────────────────────────────────────────────────────
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
      { threshold: 0.08 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ── Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  const { t } = useTranslation()
  const contentRef = useRef(null)
  const orbRef = useRef(null)

  // Subtle mouse-tracking parallax on the orbs
  useEffect(() => {
    const handleMove = (e) => {
      if (!orbRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      orbRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    globalThis.addEventListener('mousemove', handleMove, { passive: true })
    return () => globalThis.removeEventListener('mousemove', handleMove)
  }, [])

  // Staggered entrance
  useEffect(() => {
    const items = contentRef.current?.querySelectorAll('.hero-item')
    if (!items) return
    items.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(32px)'
      setTimeout(() => {
        el.style.transition =
          'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 200 + i * 120)
    })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#f0f7ff' }}>
      {/* ── Background gradient ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 110% 80% at 50% 35%, #dbeafe 0%, #eff6ff 55%, #f0f7ff 100%)',
          }}
        />
        {/* Soft dot grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* ── Friendly floating emojis / symbols ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {[
          { sym: '⭐', top: '7%',  left: '5%',   size: '2rem',   delay: '0s',   dur: '7s',  op: 0.55 },
          { sym: '🔢', top: '20%', left: '2%',   size: '1.9rem', delay: '1.5s', dur: '9s',  op: 0.45 },
          { sym: '📚', top: '42%', left: '1%',   size: '1.8rem', delay: '0.8s', dur: '8s',  op: 0.4 },
          { sym: '✏️', top: '63%', left: '4%',   size: '1.9rem', delay: '2s',   dur: '10s', op: 0.45 },
          { sym: '🌟', top: '80%', left: '2%',   size: '2rem',   delay: '0.5s', dur: '8s',  op: 0.5 },
          { sym: '🎯', top: '10%', left: '90%',  size: '1.9rem', delay: '1.2s', dur: '9s',  op: 0.45 },
          { sym: '🧩', top: '28%', left: '93%',  size: '1.8rem', delay: '0.3s', dur: '7s',  op: 0.4 },
          { sym: '🔭', top: '50%', left: '95%',  size: '1.9rem', delay: '1.8s', dur: '11s', op: 0.4 },
          { sym: '🎨', top: '70%', left: '91%',  size: '2rem',   delay: '0.7s', dur: '8s',  op: 0.45 },
          { sym: '🏆', top: '87%', left: '89%',  size: '1.8rem', delay: '2.2s', dur: '9s',  op: 0.4 },
          { sym: '💡', top: '4%',  left: '32%',  size: '1.7rem', delay: '1s',   dur: '10s', op: 0.38 },
          { sym: '🚀', top: '4%',  left: '62%',  size: '1.8rem', delay: '0.4s', dur: '8s',  op: 0.42 },
          { sym: '🌈', top: '92%', left: '22%',  size: '1.9rem', delay: '1.6s', dur: '9s',  op: 0.4 },
          { sym: '🔬', top: '90%', left: '58%',  size: '1.8rem', delay: '0.9s', dur: '11s', op: 0.38 },
          { sym: '⭐', top: '48%', left: '97%',  size: '1.6rem', delay: '2.5s', dur: '7s',  op: 0.35 },
          { sym: '🎵', top: '35%', left: '97%',  size: '1.7rem', delay: '1.1s', dur: '9s',  op: 0.38 },
        ].map(({ sym, top, left, size, delay, dur, op }) => (
          <span
            key={`${sym}-${top}-${left}`}
            className="absolute"
            style={{
              top, left,
              fontSize: size,
              opacity: op,
              animation: `symFloat ${dur} ease-in-out ${delay} infinite`,
            }}
          >
            {sym}
          </span>
        ))}
      </div>

      {/* ── Colorful orbs ── */}
      <div
        ref={orbRef}
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
      >
        <div
          className="absolute rounded-full blur-[130px]"
          style={{
            width: 650,
            height: 650,
            top: '0%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(129,140,248,0.35) 0%, transparent 70%)',
            animation: 'orbFloat1 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: 420,
            height: 420,
            bottom: '8%',
            left: '10%',
            background: 'radial-gradient(circle, rgba(251,146,60,0.30) 0%, transparent 70%)',
            animation: 'orbFloat2 11s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full blur-[90px]"
          style={{
            width: 380,
            height: 380,
            bottom: '12%',
            right: '8%',
            background: 'radial-gradient(circle, rgba(52,211,153,0.28) 0%, transparent 70%)',
            animation: 'orbFloat3 9s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: 300,
            height: 300,
            top: '30%',
            left: '5%',
            background: 'radial-gradient(circle, rgba(251,191,36,0.28) 0%, transparent 70%)',
            animation: 'orbFloat2 13s ease-in-out 2s infinite',
          }}
        />
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50%       { transform: translateX(-50%) translateY(-30px); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(22px); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-20px); }
        }
        @keyframes symFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33%       { transform: translateY(-14px) rotate(6deg) scale(1.08); }
          66%       { transform: translateY(10px) rotate(-5deg) scale(0.94); }
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.35); }
          50%       { box-shadow: 0 0 0 10px rgba(99,102,241,0); }
        }
      `}</style>

      {/* ── Content ── */}
      <Container>
        <div
          ref={contentRef}
          className="relative z-10 flex flex-col items-center text-center pt-24 pb-8 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div
            className="hero-item flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-indigo-300 bg-indigo-100 shadow-sm"
            style={{ animation: 'badgePulse 3s ease-in-out infinite' }}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
            <span className="text-indigo-600 text-xs font-semibold tracking-wide uppercase">
              {t('conteudo_page.hero_badge')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-item text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-extrabold text-gray-900 leading-[1] tracking-tight mb-6">
            {t('conteudo_page.hero_h1_1')}&nbsp;
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500">
              {t('conteudo_page.hero_h1_2')}
            </span>
            <br />
            {t('conteudo_page.hero_h1_3')}
          </h1>

          {/* Subtitle */}
          <p className="hero-item text-gray-600 text-lg sm:text-xl leading-relaxed max-w-2xl mb-16">
            {t('conteudo_page.hero_desc')}
          </p>

          {/* CTA phrase */}
          <div className="hero-item pt-10 border-t border-gray-200 w-full">
            <p className="text-gray-700 text-lg sm:text-xl font-semibold text-center max-w-3xl mx-auto leading-relaxed">
              Explore um dos jogos disponiveis na plataforma e veja, na pratica, como o aprendizado pode ser mais envolvente, divertido e eficaz.
            </p>
          </div>

          {/* Game only */}
          <div className="hero-item w-full mt-8">
            <div
              className="relative w-full overflow-hidden rounded-3xl border-4 border-amber-300"
              style={{ paddingBottom: '62.25%' }}
            >
              <iframe
                className="absolute top-0 h-full border-none"
                style={{ width: '160%', left: '-29%' }}
                src="https://play.smileandlearn.com/webgl/2515?payload=_3yk67aq5MQJvZ8MS1X6S6r5o84GU0Sy4UIvvALL4ER0BCBHvnYSw2xZWCJJvPvzY9bZBqY9H22ULYxPsMglcRuTJoWrZWY-px5g3V0TpAFH7LMO_UYBBmON-ZYDkwaBP6x7M4KPqCBBo1977Pzf7mXUlGjysCYFBxiaM4PtWUmTN6IsWegoz4nzvnpzkGXLUZTgX84XidJqCOqhJPfpWnMIc820CwQMpru1qioUSyWboJx8c1vnlRTB1E_kB9nzPuJ53_8aVCD6Cr5M08CDmTMEyxPCqlJzjmx1Z-OIgkE&state=NA8w0ZVfqihqMmDPhxa3DRUBkEsEZhGaaHhvpd95W7A"
                title="Smile and Learn - VOWELSI"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                scrolling="no"
              />
            </div>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f0f7ff] to-transparent pointer-events-none" />
    </section>
  )
}
// ── Video Section ──────────────────────────────────────────────────────────
function VideoSection() {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden">
      {/* ── Unsplash background image ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&auto=format&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Blue overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(37, 99, 235, 0.82)' }}
      />
      {/* Radial highlight center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(99,179,237,0.25) 0%, transparent 70%)',
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(0,0,30,0.4) 100%)',
        }}
      />

      {/* ── Wave top ── */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 lg:h-20">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      <Container>
        {/* Heading */}
        <div className="relative z-10 text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
            A melhor plataforma para uma{' '}
            <span className="text-sky-200">educação 360°</span>
          </h2>
          <p className="mt-4 text-white/90 text-lg max-w-2xl mx-auto">
            Veja como o Smile and Learn junto com a Realms transforma o aprendizado com jogos, vídeos e histórias interativas.
          </p>
        </div>

        {/* Video card */}
        <div className="relative z-10 max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
          {/* Browser bar */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/20 backdrop-blur-sm border-b border-white/20">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-300" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="flex-1 mx-3 h-5 rounded-full bg-white/20 text-[10px] font-mono text-white/70 flex items-center px-3">
              youtube.com/watch?v=bnm0vTkyOPs
            </span>
          </div>

          {/* 16:9 iframe */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/bnm0vTkyOPs?rel=0&modestbranding=1"
              title="Conteúdo Educacional Smile and Learn × Realms"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </Container>

      {/* ── Wave bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden leading-none">
        <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-20 lg:h-28">
          <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,50 1440,40 L1440,100 L0,100 Z" fill="white" />
          <path d="M0,80 C300,50 600,100 900,70 C1100,50 1300,80 1440,65 L1440,100 L0,100 Z" fill="white" opacity="0.5" />
        </svg>
      </div>
    </section>
  )
}

// ── Stats ──────────────────────────────────────────────────────────────────

function StatsSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  const stats = [
    { value: 600, suffix: '+', label: t('conteudo_page.stat_1_label'), desc: t('conteudo_page.stat_1_sub') },
    { value: 800, suffix: '+', label: t('conteudo_page.stat_2_label'), desc: t('conteudo_page.stat_2_sub') },
    { value: 1400, suffix: '+', label: t('conteudo_page.stat_3_label'), desc: t('conteudo_page.stat_3_sub') },
  ]

  return (
    <section className="bg-indigo-50 py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent"
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((s, i) => (
            <div key={s.label} className={`reveal delay-${i + 2} text-center`}>
              <p className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 leading-none">
                <AnimatedCounter to={s.value} />
                <span className="text-indigo-500">{s.suffix}</span>
              </p>
              <p className="text-gray-800 font-semibold mb-1">{s.label}</p>
              <p className="text-gray-500 text-xs font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ── Levels ────────────────────────────────────────────────────────────────

function LevelsSection() {
  const { t } = useTranslation()
  const BENEFITS = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z"/><path d="M12 14c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z"/>
        </svg>
      ),
      title: t('conteudo_page.benefit_1_title'),
      desc: t('conteudo_page.benefit_1_desc'),
      accent: '#5AABD4',
      iconBg: 'rgba(90,171,212,0.12)',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <rect x="3" y="3" width="18" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
          <path d="M7 8l3 3 2-2 3 3"/>
        </svg>
      ),
      title: t('conteudo_page.benefit_2_title'),
      desc: t('conteudo_page.benefit_2_desc'),
      accent: '#0EA5A7',
      iconBg: 'rgba(14,165,167,0.12)',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
        </svg>
      ),
      title: t('conteudo_page.benefit_3_title'),
      desc: t('conteudo_page.benefit_3_desc'),
      accent: '#7C63B8',
      iconBg: 'rgba(107,82,168,0.12)',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      ),
      title: t('conteudo_page.benefit_4_title'),
      desc: t('conteudo_page.benefit_4_desc'),
      accent: '#4CAAE0',
      iconBg: 'rgba(76,170,224,0.12)',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M9.5 2A6.5 6.5 0 0 1 16 8.5c0 3.58-2.92 6.5-6.5 6.5S3 12.08 3 8.5 5.92 2 9.5 2z"/><path d="M14.5 2A6.5 6.5 0 0 1 21 8.5c0 3.58-2.92 6.5-6.5 6.5"/><path d="M9.5 15v7"/><path d="M14.5 15v7"/>
        </svg>
      ),
      title: t('conteudo_page.benefit_5_title'),
      desc: t('conteudo_page.benefit_5_desc'),
      accent: '#E8890A',
      iconBg: 'rgba(232,137,10,0.12)',
    },
  ]
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section className="bg-white py-24 lg:py-36 relative overflow-hidden">
      {/* Subtle bottom glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 50% at 50% 110%, rgba(238,242,255,0.9) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
        aria-hidden="true"
      />

      <style>{`
        .benefit-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .benefit-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.10);
        }
        .benefit-icon-wrap {
          transition: background 0.3s ease;
        }
        .benefit-card:hover .benefit-icon-wrap {
          filter: brightness(1.08);
        }
      `}</style>

      <Container>
        <div ref={sectionRef} className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="reveal flex justify-center mb-5">
            <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-500">
              <span className="w-6 h-px bg-current" aria-hidden="true" />
              {t('conteudo_page.levels_badge')}
              <span className="w-6 h-px bg-current" aria-hidden="true" />
            </span>
          </div>

          {/* Heading */}
          <h2 className="reveal delay-2 text-center text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-4">
            {t('conteudo_page.levels_h2_1')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-500">
              {t('conteudo_page.levels_h2_2')}
            </span>
          </h2>

          {/* Sub-description */}
          <p className="reveal delay-3 text-center text-gray-500 text-lg leading-relaxed mb-20 max-w-lg mx-auto">
            {t('conteudo_page.levels_desc')}
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {BENEFITS.map((item, i) => (
              <article
                key={i}
                className={`benefit-card reveal delay-${Math.min(i + 2, 6)} flex flex-col bg-white rounded-2xl border border-gray-100 p-6 shadow-sm cursor-default`}
                style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
              >
                {/* Icon */}
                <div
                  className="benefit-icon-wrap w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: item.iconBg, color: item.accent }}
                >
                  {item.icon}
                </div>

                {/* Divider accent */}
                <div
                  className="w-8 h-[3px] rounded-full mb-4"
                  style={{ background: item.accent }}
                  aria-hidden="true"
                />

                {/* Title */}
                <h3
                  className="text-gray-900 text-sm font-extrabold uppercase leading-snug mb-3"
                  style={{ letterSpacing: '0.06em' }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mt-auto">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ── CTA ────────────────────────────────────────────────────────────────────
function CTASection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)
  useParticles('conteudo-cta-particles')

  return (
    <section className="bg-[#080808] py-24 lg:py-36 relative overflow-hidden" data-no-cursor>
      {/* Wave top divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none z-[2]">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>
      {/* Particles / stars */}
      <div
        id="conteudo-cta-particles"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />
      {/* Radial blue glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(37,99,235,0.13)_0%,transparent_70%)] pointer-events-none z-[1]"
        aria-hidden="true"
      />
      {/* Top line accent */}
      <div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent z-[1]"
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef} className="text-center max-w-3xl mx-auto relative z-10">
          {/* Smile and Learn logo */}
          <div className="reveal flex justify-center mb-10">
            <img
              src={smileLearnLogo}
              alt="Smile and Learn"
              className="h-24 sm:h-28 w-auto object-contain drop-shadow-2xl"
            />
          </div>
          <h2 className="reveal delay-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            {t('conteudo_page.cta_h2_1')}&nbsp;
            <span className="text-blue-400">
              {t('conteudo_page.cta_h2_2')}
            </span>
          </h2>
          <p className="reveal delay-3 text-white/70 text-lg leading-relaxed mb-10">
            {t('conteudo_page.cta_desc')}
          </p>
          <div className="reveal delay-4 flex flex-wrap justify-center gap-4">
            <Button to="/contato" size="lg" variant="outline-white">
              {t('conteudo_page.cta_secondary')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ── Page Decorations ───────────────────────────────────────────────────────
function PageDecorations() {
  return (
    <>
      <style>{`
        @keyframes bobble { 0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-14px) rotate(6deg);} }
        @keyframes bobble2 { 0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(12px) rotate(-5deg);} }
        @keyframes bobble3 { 0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-10px) scale(1.07);} }
        @keyframes spin-slow { from{transform:rotate(0deg);}to{transform:rotate(360deg);} }
        .deco-bobble  { animation: bobble  7s ease-in-out infinite; }
        .deco-bobble2 { animation: bobble2 9s ease-in-out infinite; }
        .deco-bobble3 { animation: bobble3 6s ease-in-out infinite; }
        .deco-spin    { animation: spin-slow 20s linear infinite; }
      `}</style>

      {/* ── left edge ── */}
      {/* big circle top-left */}
      <div className="fixed top-24 -left-14 w-36 h-36 rounded-full bg-yellow-300 opacity-70 pointer-events-none z-0 deco-bobble" />
      {/* small circle left mid */}
      <div className="fixed top-[42%] -left-8 w-20 h-20 rounded-full bg-sky-300 opacity-60 pointer-events-none z-0 deco-bobble2" />
      {/* tiny dot left low */}
      <div className="fixed bottom-48 -left-5 w-12 h-12 rounded-full bg-pink-300 opacity-55 pointer-events-none z-0 deco-bobble3" />

      {/* ── right edge ── */}
      {/* big circle top-right */}
      <div className="fixed top-32 -right-16 w-40 h-40 rounded-full bg-sky-300 opacity-65 pointer-events-none z-0 deco-bobble2" />
      {/* medium circle right mid */}
      <div className="fixed top-[50%] -right-10 w-24 h-24 rounded-full bg-green-300 opacity-60 pointer-events-none z-0 deco-bobble" />
      {/* small circle right low */}
      <div className="fixed bottom-56 -right-6 w-14 h-14 rounded-full bg-orange-300 opacity-60 pointer-events-none z-0 deco-bobble3" />

      {/* ── floating shapes ── */}
      {/* star top-left */}
      <div className="fixed top-56 left-8 text-3xl pointer-events-none z-0 deco-bobble select-none opacity-70">⭐</div>
      {/* heart top-right area */}
      <div className="fixed top-72 right-10 text-2xl pointer-events-none z-0 deco-bobble2 select-none opacity-65">💛</div>
      {/* pencil left */}
      <div className="fixed top-[55%] left-6 text-2xl pointer-events-none z-0 deco-bobble3 select-none opacity-60">✏️</div>
      {/* rocket right */}
      <div className="fixed top-[38%] right-7 text-2xl pointer-events-none z-0 deco-bobble select-none opacity-60">🚀</div>
      {/* star bottom-right */}
      <div className="fixed bottom-36 right-8 text-3xl pointer-events-none z-0 deco-bobble2 select-none opacity-65">🌟</div>
      {/* book bottom-left */}
      <div className="fixed bottom-40 left-7 text-2xl pointer-events-none z-0 deco-bobble select-none opacity-60">📚</div>

      {/* spinning dotted ring left-center */}
      <svg
        className="fixed top-[30%] -left-10 w-28 h-28 opacity-20 pointer-events-none z-0 deco-spin"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="44" stroke="#6366f1" strokeWidth="3" strokeDasharray="8 6" />
      </svg>
      {/* spinning dotted ring right-bottom */}
      <svg
        className="fixed bottom-32 -right-10 w-32 h-32 opacity-20 pointer-events-none z-0 deco-spin"
        viewBox="0 0 100 100"
        fill="none"
        style={{ animationDirection: 'reverse' }}
      >
        <circle cx="50" cy="50" r="44" stroke="#f59e0b" strokeWidth="3" strokeDasharray="8 6" />
      </svg>

      {/* small dots scattered */}
      <div className="fixed top-44 left-20 w-4 h-4 rounded-full bg-indigo-400 opacity-40 pointer-events-none z-0 deco-bobble3" />
      <div className="fixed top-96 right-20 w-5 h-5 rounded-full bg-pink-400 opacity-40 pointer-events-none z-0 deco-bobble2" />
      <div className="fixed bottom-64 left-16 w-3 h-3 rounded-full bg-green-400 opacity-45 pointer-events-none z-0 deco-bobble" />
      <div className="fixed bottom-80 right-16 w-4 h-4 rounded-full bg-yellow-400 opacity-45 pointer-events-none z-0 deco-bobble3" />
    </>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ConteudoEducacional() {
  return (
    <>
      <CosmicCursor />
      <PageDecorations />
      <HeroSection />
      <VideoSection />
      <StatsSection />
      <LevelsSection />
      <CTASection />
    </>
  )
}
