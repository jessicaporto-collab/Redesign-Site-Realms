import { useTranslation } from 'react-i18next'
import PageHero from '../../components/ui/PageHero'
import Container from '../../components/ui/Container'
import Section from '../../components/ui/Section'
import Button from '../../components/ui/Button'

const PRESS_ITEMS = [
  {
    outlet: 'TechCrunch',
    date: 'February 2026',
    title: 'Vocaciona raises $10M to expand EdTech platform across Latin America',
    tag: 'Funding',
    logo: '📰',
  },
  {
    outlet: 'Forbes Brasil',
    date: 'January 2026',
    title: 'How Vocaciona is redefining education with AI in Brazil',
    tag: 'Feature',
    logo: '📋',
  },
  {
    outlet: 'G1 Educação',
    date: 'December 2025',
    title: 'EduXGen.ai alcança 50 mil alunos em primeiro ano de operação',
    tag: 'Growth',
    logo: '📡',
  },
  {
    outlet: 'Valor Econômico',
    date: 'November 2025',
    title: 'Startup brasileira de EdTech firma parceria com Google for Education',
    tag: 'Partnership',
    logo: '🤝',
  },
  {
    outlet: 'MIT Technology Review',
    date: 'October 2025',
    title: 'EduRealms: The immersive platform changing how Brazilian students learn',
    tag: 'Innovation',
    logo: '🔬',
  },
  {
    outlet: 'Folha de S.Paulo',
    date: 'September 2025',
    title: 'IP.TV Educacional leva conteúdo para regiões sem internet de qualidade',
    tag: 'Social Impact',
    logo: '🌍',
  },
]

const TAG_COLORS = {
  Funding: 'bg-green-100 text-green-700',
  Feature: 'bg-blue-100 text-blue-700',
  Growth: 'bg-violet-100 text-violet-700',
  Partnership: 'bg-orange-100 text-orange-700',
  Innovation: 'bg-cyan-100 text-cyan-700',
  'Social Impact': 'bg-rose-100 text-rose-700',
}

export default function NaImprensa() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero
        title={t('pages.press.hero_title')}
        subtitle={t('pages.press.hero_subtitle')}
        gradient="from-slate-700 via-slate-800 to-gray-950"
        icon="📰"
        label="Media"
      />

      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News grid */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-black text-gray-900 mb-8">
                {t('pages.press.content_title')}
              </h2>
              <div className="space-y-5">
                {PRESS_ITEMS.map((item) => (
                  <article
                    key={item.title}
                    className="card p-6 hover:-translate-y-0.5 transition-transform cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                        {item.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-xs font-bold text-gray-900">{item.outlet}</span>
                          <span className="text-xs text-gray-400">·</span>
                          <span className="text-xs text-gray-400">{item.date}</span>
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ml-auto ${
                              TAG_COLORS[item.tag] ?? 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {item.tag}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Press contact */}
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-3">{t('pages.press.press_contact')}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  For media inquiries, interviews and press materials, please reach out to our
                  communications team.
                </p>
                <Button to="/contato" size="sm" className="w-full justify-center">
                  {t('nav.contact')}
                </Button>
              </div>

              {/* Media kit */}
              <div className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                <div className="text-3xl mb-3">📦</div>
                <h3 className="font-bold text-gray-900 mb-2">{t('pages.press.download_kit')}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Logos, brand assets, executive photos and company fact sheet.
                </p>
                <Button href="#" size="sm" variant="outline" className="w-full justify-center">
                  Download Kit
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
