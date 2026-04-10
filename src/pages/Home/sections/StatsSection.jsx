import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import AnimatedCounter from '../../../components/ui/AnimatedCounter'
import Container from '../../../components/ui/Container'

const STATS = [
  { to: 10000, prefix: '+', suffix: '',  labelKey: 'stats.classrooms_label', display: '10.000' },
  { to: 98,    prefix: '+', suffix: 'M', labelKey: 'stats.tasks_label' },
  { to: 400,   prefix: '+', suffix: 'K', labelKey: 'stats.users_label' },
  { to: 9,     prefix: '+', suffix: 'M', labelKey: 'stats.students_label' },
  { to: 350,   prefix: '+', suffix: 'K', labelKey: 'stats.teachers_label' },
  { to: 14,    prefix: '+', suffix: 'M', labelKey: 'stats.exams_label' },
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

export default function StatsSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section id="stats" className="bg-[#0d0d0d] py-20 lg:py-28 relative">
      {/* ── Aurora background ── */}
      {/* Blob 1: azul → roxo */}
      <div
        className="stats-blob-1 absolute pointer-events-none"
        style={{
          width: '100%', height: '100%',
          left: '0', top: '0',
          background: 'radial-gradient(ellipse 70% 80% at 15% 50%, rgba(29,78,216,0.75) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      {/* Blob 2: índigo → rosa */}
      <div
        className="stats-blob-2 absolute pointer-events-none"
        style={{
          width: '100%', height: '100%',
          left: '0', top: '0',
          background: 'radial-gradient(ellipse 65% 75% at 85% 50%, rgba(99,60,255,0.7) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      {/* Blob 3: ciano → verde */}
      <div
        className="stats-blob-3 absolute pointer-events-none"
        style={{
          width: '100%', height: '100%',
          left: '0', top: '0',
          background: 'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(56,189,248,0.4) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Dot grid subtle overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
        aria-hidden="true"
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef}>
          {/* Header */}
          <div className="text-center mb-20 lg:mb-24">
            <span className="reveal section-badge mb-4 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              {t('stats.badge')}
            </span>
            <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t('stats.heading')}
            </h2>
          </div>

          {/* Stats grid — separated by thin lines */}
          <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {STATS.map((stat, i) => (
              <div
                key={stat.labelKey}
                className={`reveal delay-${Math.min(i + 1, 6)} bg-[#0d0d0d] hover:bg-[#131313] transition-colors duration-300 p-8 lg:p-10 text-center group cursor-default`}
              >
                <div className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white mb-2 tabular-nums leading-none group-hover:text-blue-300 transition-colors duration-300">
                  <AnimatedCounter to={stat.to} prefix={stat.prefix} suffix={stat.suffix} duration={2000} />
                </div>
                <p className="text-xs sm:text-sm text-white/35 font-light leading-snug">
                  {t(stat.labelKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
