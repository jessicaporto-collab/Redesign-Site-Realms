import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../../components/ui/Button'
import Container from '../../../components/ui/Container'

function useReveal(ref) {
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal')
    if (!els) return
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.12 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function FinalCTASection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section id="home-cta" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(37,99,235,0.14) 0%, transparent 68%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.28) 35%, rgba(34,211,238,0.38) 50%, rgba(96,165,250,0.28) 65%, transparent)' }}
        aria-hidden="true"
      />
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
            {t('about_page.cta_line1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400">
              {t('about_page.cta_line2')}
            </span>
          </h2>
          <p className="reveal delay-3 text-white/40 text-lg leading-relaxed mb-10 font-light">
            {t('about_page.cta_sub')}
          </p>
          <div className="reveal delay-4 flex justify-center">
            <Button to="/contato" size="lg" variant="outline-white">
              {t('about_page.cta_contact')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}