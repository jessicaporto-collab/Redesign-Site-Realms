import { useTranslation } from 'react-i18next'
import PageHero from '../../components/ui/PageHero'
import Container from '../../components/ui/Container'
import Section from '../../components/ui/Section'
import Button from '../../components/ui/Button'

const TEAM = [
  { name: 'Ana Costa', role: 'CEO & Co-founder', avatar: '👩‍💼' },
  { name: 'Carlos Silva', role: 'CTO & Co-founder', avatar: '👨‍💻' },
  { name: 'Marina Oliveira', role: 'Head of Product', avatar: '👩‍🎨' },
  { name: 'Rafael Santos', role: 'Head of Engineering', avatar: '👨‍🔬' },
]

export default function SobreNos() {
  const { t } = useTranslation()
  const values = t('pages.about.values', { returnObjects: true })

  return (
    <>
      <PageHero
        title={t('pages.about.hero_title')}
        subtitle={t('pages.about.hero_subtitle')}
        gradient="from-gray-800 via-gray-900 to-gray-950"
        icon="🎓"
        label="Company"
      />

      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                {t('pages.about.content_title')}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                {t('pages.about.content_text')}
              </p>
              <Button to="/contato" size="lg">
                {t('nav.contact')}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 card p-7">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold text-gray-900 mb-2">{t('pages.about.mission_title')}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t('pages.about.mission_text')}</p>
              </div>
              <div className="col-span-2 card p-7">
                <div className="text-3xl mb-3">🔭</div>
                <h3 className="font-bold text-gray-900 mb-2">{t('pages.about.vision_title')}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t('pages.about.vision_text')}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.isArray(values) &&
              values.map((value, i) => {
                const icons = ['💡', '♿', '🚀', '⭐']
                const colors = [
                  'from-blue-500 to-blue-700',
                  'from-emerald-500 to-emerald-700',
                  'from-violet-500 to-violet-700',
                  'from-orange-500 to-orange-700',
                ]
                return (
                  <div key={value} className="card p-8 text-center hover:-translate-y-1 transition-transform">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[i]} flex items-center justify-center text-2xl mx-auto mb-4`}
                    >
                      {icons[i]}
                    </div>
                    <h3 className="font-bold text-gray-900">{value}</h3>
                  </div>
                )
              })}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900">Meet the Team</h2>
            <p className="text-gray-500 mt-3">The people behind Vocaciona</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="card p-8 text-center hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{member.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
