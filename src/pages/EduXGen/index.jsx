import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import AnimatedCounter from '../../components/ui/AnimatedCounter'

// ── Shared hook: reveal on scroll ──────────────────────────────────────────
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

// ── Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  const { t } = useTranslation()
  const parallaxRef = useRef(null)
  const contentRef = useRef(null)

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.38}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Entrance animation
  useEffect(() => {
    const items = contentRef.current?.querySelectorAll('.hero-item')
    if (!items) return
    items.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      setTimeout(() => {
        el.style.transition =
          'opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 300 + i * 130)
    })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#05050f]">
      {/* Parallax layer */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 85% 65% at 15% 45%, rgba(37,99,235,0.42) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 85% 55%, rgba(99,60,255,0.28) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* Centre glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)' }}
      />

      <Container>
        <div
          ref={contentRef}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-32 pb-28"
        >
          {/* Left: copy */}
          <div>
            <p className="hero-item flex items-center gap-3 text-white/40 text-[11px] font-semibold uppercase tracking-[0.25em] mb-7">
              <span className="w-8 h-px bg-white/30" aria-hidden="true" />
              {t('eduxgen_page.hero_badge')}
            </p>

            <div className="hero-item flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-3xl">
                🤖
              </div>
              <span className="text-blue-400/80 text-sm font-semibold tracking-wide">{t('eduxgen_page.hero_product')}</span>
            </div>

            <h1 className="hero-item text-5xl sm:text-6xl lg:text-[4.25rem] font-extrabold text-white leading-[0.95] tracking-tight mb-6">
              {t('eduxgen_page.hero_h1_1')}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400">
                {t('eduxgen_page.hero_h1_2')}
              </span>
              <br />
              {t('eduxgen_page.hero_h1_3')}
            </h1>

            <p className="hero-item text-white/45 text-lg leading-relaxed max-w-xl mb-10 font-light">
              {t('eduxgen_page.hero_desc')}
            </p>

            <div className="hero-item flex flex-wrap gap-4">
              <Button to="/contato" size="lg" variant="primary">
                {t('eduxgen_page.hero_cta_primary')}
              </Button>
              <Button to="/contato" size="lg" variant="outline-white">
                {t('eduxgen_page.hero_cta_secondary')}
              </Button>
            </div>

            {/* Quick stats */}
            <div className="hero-item flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/[0.07]">
              {[
                { value: t('eduxgen_page.hero_stat1_value'), label: t('eduxgen_page.hero_stat1_label') },
                { value: t('eduxgen_page.hero_stat2_value'), label: t('eduxgen_page.hero_stat2_label') },
                { value: t('eduxgen_page.hero_stat3_value'), label: t('eduxgen_page.hero_stat3_label') },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-white text-xl font-extrabold leading-none">{value}</p>
                  <p className="text-white/35 text-xs mt-1 font-light">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: AI output preview */}
          <div className="hero-item relative hidden lg:block">
            <div className="relative rounded-3xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 to-violet-600/4 pointer-events-none" />

              {/* Prompt input */}
              <div className="bg-white/[0.04] rounded-2xl p-5 border border-white/[0.07] mb-6">
                <p className="text-white/25 text-[10px] font-mono uppercase tracking-widest mb-2">
                  Prompt
                </p>
                <p className="text-white/55 text-sm leading-relaxed italic">
                  "Crie um plano de aula sobre frações para o 5º ano do fundamental, com
                  exercícios práticos e avaliação diagnóstica alinhada à BNCC..."
                </p>
              </div>

              {/* AI output */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="w-2 h-2 rounded-full bg-green-400"
                    style={{ animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }}
                  />
                  <span className="text-green-400/70 text-xs font-mono">{t('eduxgen_page.hero_ai_status')}</span>
                </div>
                <div className="space-y-2">
                  {[
                    '📚 Plano de aula — Frações · 5º Ano',
                    '✅ Avaliação diagnóstica criada',
                    '📝 15 questões geradas (fácil → difícil)',
                    '🎯 Alinhamento BNCC EF05MA08',
                    '📊 Rubrica de correção com gabarito',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 bg-white/[0.035] rounded-xl px-4 py-2.5 border border-white/[0.05]"
                    >
                      <span className="text-sm text-white/65">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-violet-600 rounded-2xl px-4 py-2 shadow-2xl">
              <p className="text-white text-xs font-bold">{t('eduxgen_page.hero_chip1')}</p>
            </div>
            <div className="absolute -bottom-5 -left-4 bg-[#111] border border-white/10 rounded-2xl px-4 py-3 shadow-2xl">
              <p className="text-white text-sm font-extrabold">{t('eduxgen_page.hero_chip2_seconds')}</p>
              <p className="text-white/35 text-xs font-light">{t('eduxgen_page.hero_chip2_label')}</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  )
}

// ── Features ───────────────────────────────────────────────────────────────
function FeaturesSection() {
  const sectionRef = useRef(null)
  const { t } = useTranslation()
  useReveal(sectionRef)

  const FEATURES = [
    { icon: '📚', title: t('eduxgen_page.feature_1_title'), desc: t('eduxgen_page.feature_1_desc'), accent: 'border-blue-500/20 bg-blue-600/10 text-blue-400' },
    { icon: '📝', title: t('eduxgen_page.feature_2_title'), desc: t('eduxgen_page.feature_2_desc'), accent: 'border-violet-500/20 bg-violet-600/10 text-violet-400' },
    { icon: '✅', title: t('eduxgen_page.feature_3_title'), desc: t('eduxgen_page.feature_3_desc'), accent: 'border-emerald-500/20 bg-emerald-600/10 text-emerald-400' },
    { icon: '🎯', title: t('eduxgen_page.feature_4_title'), desc: t('eduxgen_page.feature_4_desc'), accent: 'border-amber-500/20 bg-amber-600/10 text-amber-400' },
    { icon: '📊', title: t('eduxgen_page.feature_5_title'), desc: t('eduxgen_page.feature_5_desc'), accent: 'border-sky-500/20 bg-sky-600/10 text-sky-400' },
    { icon: '🌐', title: t('eduxgen_page.feature_6_title'), desc: t('eduxgen_page.feature_6_desc'), accent: 'border-indigo-500/20 bg-indigo-600/10 text-indigo-400' },
  ]

  return (
    <section className="bg-[#0a0a0a] py-24 lg:py-32 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef}>
          <div className="text-center mb-16">
            <span className="reveal section-badge mb-4 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              {t('eduxgen_page.features_badge')}
            </span>
            <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
              {t('eduxgen_page.features_h2_1')}&nbsp;
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                {t('eduxgen_page.features_h2_2')}
              </span>
            </h2>
            <p className="reveal delay-3 text-white/40 mt-5 max-w-xl mx-auto font-light leading-relaxed">
              {t('eduxgen_page.features_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`reveal delay-${Math.min(i + 2, 6)} card-dark p-7 group hover:-translate-y-1.5 transition-all duration-300`}
              >
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center text-2xl mb-5 ${f.accent} transition-transform duration-300 group-hover:scale-110`}
                >
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ── How It Works ───────────────────────────────────────────────────────────
function HowItWorksSection() {
  const sectionRef = useRef(null)
  const { t } = useTranslation()
  useReveal(sectionRef)

  const STEPS = [
    { n: '01', icon: '✍️', title: t('eduxgen_page.step_1_title'), desc: t('eduxgen_page.step_1_desc') },
    { n: '02', icon: '⚡', title: t('eduxgen_page.step_2_title'), desc: t('eduxgen_page.step_2_desc') },
    { n: '03', icon: '🚀', title: t('eduxgen_page.step_3_title'), desc: t('eduxgen_page.step_3_desc') },
  ]

  return (
    <section className="bg-[#07070f] py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle aurora */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef}>
          <div className="text-center mb-16">
            <span className="reveal section-badge mb-4 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              {t('eduxgen_page.how_badge')}
            </span>
            <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t('eduxgen_page.how_h2')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            {/* Connector */}
            <div
              className="hidden lg:block absolute top-14 left-[33.3%] right-[33.3%] h-px bg-gradient-to-r from-blue-600/30 via-violet-600/30 to-blue-600/30"
              aria-hidden="true"
            />

            {STEPS.map((step, i) => (
              <div key={step.n} className={`reveal delay-${i + 2} relative`}>
                <div className="card-dark p-8 h-full group hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-3xl">{step.icon}</span>
                    <span className="text-[11px] font-bold text-white/18 font-mono tracking-widest">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light">{step.desc}</p>
                </div>

                {i < 2 && (
                  <div
                    className="hidden lg:flex absolute -right-3 top-14 z-10 w-6 h-6 rounded-full bg-[#0d0d0d] border border-white/[0.08] items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-3 h-3 text-white/25"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ── Teaching Levels ────────────────────────────────────────────────────────
function LevelsSection() {
  const sectionRef = useRef(null)
  const { t } = useTranslation()
  useReveal(sectionRef)

  const LEVELS = [
    { emoji: '🧒', title: t('eduxgen_page.level_1_title'), age: t('eduxgen_page.level_1_age'), tags: [t('eduxgen_page.level_1_tag1'), t('eduxgen_page.level_1_tag2'), t('eduxgen_page.level_1_tag3')], gradient: 'from-yellow-600/15 to-orange-600/8', border: 'border-yellow-500/15' },
    { emoji: '📖', title: t('eduxgen_page.level_2_title'), age: t('eduxgen_page.level_2_age'), tags: [t('eduxgen_page.level_2_tag1'), t('eduxgen_page.level_2_tag2'), t('eduxgen_page.level_2_tag3')], gradient: 'from-blue-600/15 to-blue-800/8', border: 'border-blue-500/15' },
    { emoji: '🎓', title: t('eduxgen_page.level_3_title'), age: t('eduxgen_page.level_3_age'), tags: [t('eduxgen_page.level_3_tag1'), t('eduxgen_page.level_3_tag2'), t('eduxgen_page.level_3_tag3')], gradient: 'from-violet-600/15 to-violet-800/8', border: 'border-violet-500/15' },
    { emoji: '🏛️', title: t('eduxgen_page.level_4_title'), age: t('eduxgen_page.level_4_age'), tags: [t('eduxgen_page.level_4_tag1'), t('eduxgen_page.level_4_tag2'), t('eduxgen_page.level_4_tag3')], gradient: 'from-emerald-600/15 to-emerald-800/8', border: 'border-emerald-500/15' },
    { emoji: '💼', title: t('eduxgen_page.level_5_title'), age: t('eduxgen_page.level_5_age'), tags: [t('eduxgen_page.level_5_tag1'), t('eduxgen_page.level_5_tag2'), t('eduxgen_page.level_5_tag3')], gradient: 'from-indigo-600/15 to-indigo-800/8', border: 'border-indigo-500/15' },
  ]

  return (
    <section className="bg-[#0a0a0a] py-24 lg:py-32 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-20 items-start">
          {/* Left sticky */}
          <div className="lg:sticky lg:top-28">
            <span className="reveal section-badge mb-6 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              {t('eduxgen_page.levels_badge')}
            </span>
            <h2 className="reveal delay-2 text-4xl sm:text-5xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
              {t('eduxgen_page.levels_h2_1')}
              <br />
              {t('eduxgen_page.levels_h2_2')}
            </h2>
            <p className="reveal delay-3 text-white/40 leading-relaxed mb-10 font-light">
              {t('eduxgen_page.levels_desc')}
            </p>
            <div className="reveal delay-4">
              <Button to="/contato" size="lg" variant="outline-white">
                {t('eduxgen_page.levels_cta')}
              </Button>
            </div>
          </div>

          {/* Right: level cards */}
          <div className="space-y-4">
            {LEVELS.map((level, i) => (
              <div
                key={level.title}
                className={`reveal delay-${Math.min(i + 2, 6)} flex items-start gap-5 p-5 rounded-2xl bg-gradient-to-r ${level.gradient} border ${level.border} hover:border-white/15 transition-all duration-300 cursor-default group`}
              >
                <div className="text-3xl pt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {level.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-bold">{level.title}</h3>
                    <span className="text-white/30 text-xs border border-white/10 px-2 py-0.5 rounded-full">
                      {level.age}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {level.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-white/50 text-xs bg-white/[0.05] px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ── Stats ──────────────────────────────────────────────────────────────────
function StatsSection() {
  const sectionRef = useRef(null)
  const { t } = useTranslation()
  useReveal(sectionRef)

  const STATS = [
    { to: 2, suffix: 'M+', label: t('eduxgen_page.stat_1_label') },
    { to: 50, suffix: 'K+', label: t('eduxgen_page.stat_2_label') },
    { to: 98, suffix: '%', label: t('eduxgen_page.stat_3_label') },
    { to: 120, suffix: '+', label: t('eduxgen_page.stat_4_label') },
    { to: 3, suffix: '+', label: t('eduxgen_page.stat_5_label') },
    { to: 5, suffix: 'seg', label: t('eduxgen_page.stat_6_label') },
  ]

  return (
    <section id="eduxgen-stats" className="bg-[#0d0d0d] py-20 lg:py-28 relative overflow-hidden">
      {/* Aurora blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 75% at 15% 50%, rgba(29,78,216,0.7) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 85% 50%, rgba(99,60,255,0.65) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef}>
          <div className="text-center mb-20 lg:mb-24">
            <span className="reveal section-badge mb-4 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              {t('eduxgen_page.stats_badge')}
            </span>
            <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t('eduxgen_page.stats_h2')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`reveal delay-${Math.min(i + 1, 6)} bg-[#0d0d0d] hover:bg-[#131313] transition-colors duration-300 p-8 lg:p-10 text-center group cursor-default`}
              >
                <div className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white mb-2 tabular-nums leading-none group-hover:text-blue-300 transition-colors duration-300">
                  <AnimatedCounter to={stat.to} suffix={stat.suffix} duration={2000} />
                </div>
                <p className="text-xs sm:text-sm text-white/35 font-light leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ── Testimonials ───────────────────────────────────────────────────────────
function TestimonialsSection() {
  const sectionRef = useRef(null)
  const { t } = useTranslation()
  useReveal(sectionRef)

  const TESTIMONIALS = [
    { quote: t('eduxgen_page.testimonial_1_quote'), author: 'Prof. Carlos Mendes', role: t('eduxgen_page.testimonial_1_role'), org: 'Rede Municipal RJ', initials: 'CM', accent: 'bg-blue-600' },
    { quote: t('eduxgen_page.testimonial_2_quote'), author: 'Profa. Ana Beatriz', role: t('eduxgen_page.testimonial_2_role'), org: 'Colégio Estadual MG', initials: 'AB', accent: 'bg-violet-600' },
    { quote: t('eduxgen_page.testimonial_3_quote'), author: 'Marcos Oliveira', role: t('eduxgen_page.testimonial_3_role'), org: 'Secretaria de Educação SP', initials: 'MO', accent: 'bg-emerald-600' },
  ]

  return (
    <section className="bg-[#090909] py-20 lg:py-28">
      <Container>
        <div ref={sectionRef}>
          <div className="text-center mb-14">
            <span className="reveal section-badge mb-4 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              {t('eduxgen_page.testimonials_badge')}
            </span>
            <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t('eduxgen_page.testimonials_h2')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((item, i) => (
              <article
                key={item.author}
                className={`reveal delay-${i + 2} card-dark p-7 hover:-translate-y-1 transition-transform duration-300`}
              >
                <div className="flex gap-1 mb-5" aria-label="5 de 5 estrelas">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg
                      key={`star-${item.author}-${s}`}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-white/55 text-sm leading-relaxed mb-6 font-light">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${item.accent} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                    aria-hidden="true"
                  >
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-semibold">{item.author}</p>
                    <p className="text-white/35 text-xs font-light">
                      {item.role} · {item.org}
                    </p>
                  </div>
                </div>
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
  const sectionRef = useRef(null)
  const { t } = useTranslation()
  useReveal(sectionRef)

  useEffect(() => {
    const PARTICLES_CONFIG = {
      particles: {
        number: { value: 130, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
        opacity: {
          value: 0.5,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
        },
        size: { value: 2.5, random: true, anim: { enable: false } },
        line_linked: { enable: false },
        move: {
          enable: true,
          speed: 0.9,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'bubble' },
          onclick: { enable: true, mode: 'repulse' },
          resize: true,
        },
        modes: {
          bubble: { distance: 220, size: 0, duration: 2, opacity: 0, speed: 3 },
          repulse: { distance: 350, duration: 0.4 },
        },
      },
      retina_detect: true,
    }

    const CONTAINER_ID = 'eduxgen-cta-particles'

    const init = () => {
      if (window.particlesJS) window.particlesJS(CONTAINER_ID, PARTICLES_CONFIG)
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

  return (
    <section className="relative bg-[#060610] py-28 lg:py-40 overflow-hidden">
      <div
        id="eduxgen-cta-particles"
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 65% at 50% 50%, rgba(37,99,235,0.22) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef} className="relative z-10 text-center max-w-3xl mx-auto">
          <span className="reveal section-badge mb-6 block justify-center">
            <span className="w-5 h-px bg-current" aria-hidden="true" />
            {t('eduxgen_page.cta_badge')}
          </span>

          <h2 className="reveal delay-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            {t('eduxgen_page.cta_h2_1')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              {t('eduxgen_page.cta_h2_2')}
            </span>
          </h2>

          <p className="reveal delay-3 text-white/40 text-lg mb-10 leading-relaxed font-light max-w-xl mx-auto">
            {t('eduxgen_page.cta_desc')}
          </p>

          <div className="reveal delay-4 flex flex-wrap gap-4 justify-center">
            <Button to="/contato" size="xl" variant="white">
              {t('eduxgen_page.cta_primary')}
            </Button>
            <Button to="/contato" size="xl" variant="outline-white">
              {t('eduxgen_page.cta_secondary')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ── Main export ────────────────────────────────────────────────────────────
export default function EduXGen() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <LevelsSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
