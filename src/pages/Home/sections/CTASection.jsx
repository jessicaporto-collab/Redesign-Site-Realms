import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../../components/ui/Button'
import Container from '../../../components/ui/Container'

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
      if (window.particlesJS) {
        window.particlesJS(containerId, PARTICLES_CONFIG)
      }
    }

    if (window.particlesJS) {
      init()
      return () => {
        if (window.pJSDom && window.pJSDom.length > 0) {
          window.pJSDom.forEach((dom) => dom.pJS.fn.vendors.destroypJS())
          window.pJSDom = []
        }
      }
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
    script.async = true
    script.onload = init
    document.body.appendChild(script)

    return () => {
      if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom.forEach((dom) => dom.pJS.fn.vendors.destroypJS())
        window.pJSDom = []
      }
    }
  }, [containerId])
}

const ARTICLES = [
  {
    dateKey: 'Mar 2026',
    readTime: '3 min',
    titleKey: 'press.article1_title',
    gradient: 'from-blue-900 to-blue-700',
  },
  {
    dateKey: 'Fev 2026',
    readTime: '5 min',
    titleKey: 'press.article2_title',
    gradient: 'from-violet-900 to-violet-700',
  },
  {
    dateKey: 'Jan 2026',
    readTime: '4 min',
    titleKey: 'press.article3_title',
    gradient: 'from-emerald-900 to-emerald-700',
  },
]

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

export default function CTASection() {
  const { t } = useTranslation()
  const pressRef = useRef(null)
  const ctaRef = useRef(null)
  useReveal(pressRef)
  useReveal(ctaRef)
  useParticles('cta-particles')

  return (
    <>
      {/* ── Press / Media Highlights ── */}
      <section id="press" className="bg-[#0a0a0a] py-20 lg:py-28">
        <Container>
          <div ref={pressRef} className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16 items-start">

            {/* Left – heading + CTA */}
            <div className="lg:sticky lg:top-28">
              <span className="reveal section-badge mb-4 block">
                <span className="w-5 h-px bg-current" aria-hidden="true" />
                {t('press.badge')}
              </span>
              <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5 tracking-tight">
                {t('press.heading')}
              </h2>
              <p className="reveal delay-3 text-sm text-white/40 leading-relaxed mb-8 font-light max-w-xs">
                {t('press.sub')}
              </p>
              <div className="reveal delay-4">
                <Button to="/na-imprensa" size="md" variant="outline-white">
                  {t('press.cta')} →
                </Button>
              </div>
            </div>

            {/* Right – 3 articles */}
            <div className="space-y-4">
              {ARTICLES.map((article, i) => (
                <Link
                  key={i}
                  to="/na-imprensa"
                  className={`reveal delay-${i + 2} group flex items-start gap-5 card-dark p-5 hover:-translate-y-0.5 hover:border-white/10 transition-all duration-300`}
                >
                  {/* Thumbnail */}
                  <div
                    className={`bg-gradient-to-br ${article.gradient} w-20 h-[60px] rounded-xl flex-shrink-0`}
                    aria-hidden="true"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-white/28 font-semibold mb-1.5 uppercase tracking-[0.15em]">
                      <span>{article.dateKey}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime} leitura</span>
                    </div>
                    <h3 className="text-white/70 text-sm font-semibold leading-snug group-hover:text-white transition-colors line-clamp-2">
                      {t(article.titleKey)}
                    </h3>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="w-4 h-4 text-white/18 group-hover:text-white/45 flex-shrink-0 mt-0.5 transition-colors"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Final CTA ── */}
      <section id="cta" className="bg-[#080808] py-24 lg:py-36 relative overflow-hidden">
        {/* Particles / stars */}
        <div
          id="cta-particles"
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
          <div ref={ctaRef} className="text-center max-w-3xl mx-auto relative z-10">
            <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[0.95] tracking-tight mb-6">
              <span className="block">
                {t('cta.heading1')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400">
                  {t('cta.heading2')}
                </span>
              </span>
              <span className="block">{t('cta.heading3')}</span>
            </h2>

            <p className="reveal delay-2 text-base text-white/40 max-w-md mx-auto mb-10 leading-relaxed font-light">
              {t('cta.sub')}
            </p>

            <div className="reveal delay-3">
              <Button to="/contato" size="xl" variant="outline-white">
                {t('cta.button')}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
