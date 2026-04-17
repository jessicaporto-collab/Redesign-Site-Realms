import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../../components/ui/Button'
import Container from '../../../components/ui/Container'

function useReveal(ref) {
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal')
    if (!els) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

const METRICS = [
  { valueKey: 'about.years_value',    descKey: 'about.years',    suffix: '+' },
  { valueKey: 'about.students_value', descKey: 'about.students', suffix: '+' },
  { valueKey: 'about.teachers_value', descKey: 'about.teachers', suffix: '+' },
  { valueKey: 'about.tasks_value',    descKey: 'about.tasks',    suffix: 'M+' },
]

export default function AboutSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section id="about" className="bg-[#0a0a0a] py-24 lg:py-32 relative overflow-hidden">
      {/* Top divider line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
        aria-hidden="true"
      />
      <Container>
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: mission text ── */}
          <div>
            <span className="reveal section-badge mb-6 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              {t('about.badge')}
            </span>

            <h2 className="reveal delay-2 text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.06] mb-8 tracking-tight">
              {t('about.heading')}
            </h2>

            <p className="reveal delay-3 text-base text-white/45 leading-relaxed mb-5 font-light">
              {t('about.body1')}
            </p>

            <p className="reveal delay-4 text-base text-white/45 leading-relaxed mb-10 font-light">
              {t('about.body2')}
            </p>

            <div className="reveal delay-5">
              <Button to="/sobre-nos" size="lg" variant="outline-white">
                {t('about.cta')} &nbsp;→
              </Button>
            </div>
          </div>

          {/* ── Right: key metrics ── */}
          <div className="border-l border-white/[0.07] pl-10 lg:pl-16 divide-y divide-white/[0.05]">
            {[
              { value: '20', desc: t('about.years'),    prefix: '+', suffix: '',  delay: 3 },
              { value: '9',  desc: t('about.students'), prefix: '+', suffix: 'M', delay: 4 },
              { value: '350',desc: t('about.teachers'), prefix: '+', suffix: 'K', delay: 5 },
              { value: '98', desc: t('about.tasks'),    prefix: '+', suffix: 'M', delay: 6 },
            ].map(({ value, desc, prefix = '', suffix, delay }) => (
              <div
                key={value}
                className={`reveal delay-${delay} py-7 first:pt-0 last:pb-0 flex items-center gap-6`}
              >
                <span className="text-4xl lg:text-5xl font-extrabold text-white leading-none whitespace-nowrap tabular-nums">
                  {prefix}{value}{suffix}
                </span>
                <p className="text-sm text-white/35 leading-snug self-center max-w-[180px] font-light">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
