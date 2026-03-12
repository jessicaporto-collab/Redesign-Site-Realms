import { useTranslation } from 'react-i18next'
import PageHero from '../../components/ui/PageHero'
import Container from '../../components/ui/Container'
import Section from '../../components/ui/Section'
import Button from '../../components/ui/Button'

export default function RealmsPersonas() {
  const { t } = useTranslation()
  const features = t('pages.personas.features', { returnObjects: true })

  return (
    <>
      <PageHero
        title={t('pages.personas.hero_title')}
        subtitle={t('pages.personas.hero_subtitle')}
        gradient="from-emerald-600 via-teal-700 to-cyan-900"
        icon="👤"
        label="Realms Products"
      />

      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                {t('pages.personas.content_title')}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                {t('pages.personas.content_text')}
              </p>

              <ul className="space-y-3 mb-10">
                {Array.isArray(features) &&
                  features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <Button to="/contato" size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">
                  Get Started
                </Button>
                <Button to="/contato" size="lg" variant="outline">
                  Request Demo
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-3xl p-12 flex items-center justify-center aspect-square">
                <span className="text-[120px] leading-none select-none">👤</span>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-3">
                <p className="text-sm font-bold text-gray-900">Adaptive Learning</p>
                <p className="text-xs text-gray-400">Personalized paths</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-emerald-600">
        <Container className="text-center">
          <h3 className="text-3xl font-black text-white mb-4">Every student learns differently</h3>
          <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
            Let Realms Personas build the perfect learning journey for each of your students.
          </p>
          <Button to="/contato" size="lg" variant="white">
            Start Free Trial
          </Button>
        </Container>
      </Section>
    </>
  )
}
