import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import AnimatedCounter from '../../../components/ui/AnimatedCounter'
import Container from '../../../components/ui/Container'

const STATS = [
  { to: 10000, suffix: '+',  labelKey: 'stats.classrooms_label', display: '10.000' },
  { to: 98,    suffix: 'M+', labelKey: 'stats.tasks_label' },
  { to: 400,   suffix: 'K+', labelKey: 'stats.users_label' },
  { to: 9,     suffix: 'M+', labelKey: 'stats.students_label' },
  { to: 350,   suffix: 'K+', labelKey: 'stats.teachers_label' },
  { to: 14,    suffix: 'M+', labelKey: 'stats.exams_label' },
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
    <section id="stats" className="bg-[#0d0d0d] py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle blue radial glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(37,99,235,0.07)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef}>
          {/* Header */}
          <div className="text-center mb-14 lg:mb-16">
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
                  <AnimatedCounter to={stat.to} suffix={stat.suffix} duration={2000} />
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
