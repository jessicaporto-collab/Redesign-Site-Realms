import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import Section from '../../components/ui/Section'
import heroVideo from './assets/EduxGenAI_Marketing.mp4'

function useRevealOnScroll(ref) {
  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-reveal]')
    if (!els) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

const PRODUCTS = [
  {
    key: 'eduxgen',
    path: '/eduxgen',
    icon: '🤖',
    gradient: 'from-blue-500 to-blue-700',
    light: 'bg-blue-50',
    desc: 'AI-powered educational content generation at scale',
  },
  {
    key: 'myclass',
    path: '/myclass',
    icon: '🏫',
    gradient: 'from-violet-500 to-violet-700',
    light: 'bg-violet-50',
    desc: 'Complete virtual classroom management solution',
  },
  {
    key: 'personas',
    path: '/realms-personas',
    icon: '👤',
    gradient: 'from-emerald-500 to-emerald-700',
    light: 'bg-emerald-50',
    desc: 'Adaptive personalized learning profiles',
  },
  {
    key: 'edurealms',
    path: '/edurealms',
    icon: '🌐',
    gradient: 'from-orange-500 to-orange-700',
    light: 'bg-orange-50',
    desc: 'Immersive 3D educational environments',
  },
  {
    key: 'iptv',
    path: '/iptv-conteudo',
    icon: '📺',
    gradient: 'from-rose-500 to-rose-700',
    light: 'bg-rose-50',
    desc: 'Broadcast-quality educational streaming',
  },
]

const STATS = [
  { value: '50K+', labelKey: 'stats_students', color: 'text-blue-600' },
  { value: '5K+', labelKey: 'stats_educators', color: 'text-violet-600' },
  { value: '200+', labelKey: 'stats_institutions', color: 'text-emerald-600' },
  { value: '15+', labelKey: 'stats_countries', color: 'text-orange-600' },
]

const TECH_FEATURES = ['tech_ai', 'tech_cloud', 'tech_analytics', 'tech_gamification']

const PARTNERS = ['Google for Education', 'Microsoft', 'AWS Educate', 'Meta', 'Salesforce']

export default function Home() {
  const { t } = useTranslation()
  const propositoRef = useRef(null)
  useRevealOnScroll(propositoRef)

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO — Fullscreen video background
      ═══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Multi-layer overlay for readability */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-900/80 to-gray-900/50"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent"
          aria-hidden="true"
        />

        {/* Hero Content */}
        <Container className="relative z-10 pt-16">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 text-blue-400 font-semibold text-xs uppercase tracking-[0.2em] mb-6">
              <span className="w-8 h-px bg-blue-400" />
              {t('hero.tagline')}
            </p>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.88] tracking-tight mb-8">
              {t('hero.title')}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300">
                {t('hero.title2')}
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-lg mb-10 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button to="/eduxgen" size="lg" variant="primary">
                {t('hero.cta1')}
              </Button>
              <Button to="/contato" size="lg" variant="secondary">
                {t('hero.cta2')}
              </Button>
            </div>
          </div>
        </Container>

        {/* Bottom-right: numbered product list (agency style) */}
        <div
          className="absolute bottom-10 right-6 sm:right-12 lg:right-16 text-right space-y-1.5"
          aria-hidden="true"
        >
          {PRODUCTS.map((p, i) => (
            <p key={p.key} className="text-gray-400 text-xs sm:text-sm leading-snug">
              <span className="text-gray-600 italic text-xs mr-2 font-light">
                ({String(i + 1).padStart(2, '0')})
              </span>
              {t(`products.${p.key}`)}
            </p>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hidden sm:flex">
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROPÓSITO & SOBRE NÓS
      ═══════════════════════════════════════════ */}
      <style>{`
        [data-reveal] {
          opacity: 0;
          filter: blur(8px);
          transform: translateY(16px);
          transition: opacity 0.7s ease, filter 0.7s ease, transform 0.7s ease;
        }
        [data-reveal].revealed {
          opacity: 1;
          filter: blur(0);
          transform: translateY(0);
        }
        [data-reveal][data-delay='1'] { transition-delay: 0.1s; }
        [data-reveal][data-delay='2'] { transition-delay: 0.2s; }
        [data-reveal][data-delay='3'] { transition-delay: 0.35s; }
        [data-reveal][data-delay='4'] { transition-delay: 0.5s; }
        [data-reveal][data-delay='5'] { transition-delay: 0.65s; }
        [data-reveal][data-delay='6'] { transition-delay: 0.8s; }
        [data-reveal][data-delay='7'] { transition-delay: 0.95s; }
        [data-reveal][data-delay='8'] { transition-delay: 1.1s; }
      `}</style>
      <Section className="bg-white" id="proposito">
        <Container>
          <div ref={propositoRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left — texto */}
            <div>
              <p data-reveal data-delay="1" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 mb-6">
                <span className="text-base">✦</span> Nosso propósito
              </p>
              <h2 data-reveal data-delay="2" className="text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05] mb-8">
                Vamos transformar as{' '}
                <span className="font-serif italic font-normal">Salas de Aula</span>
                {' '}com Educação Potencializada por IA!.
              </h2>
              <p data-reveal data-delay="3" className="text-base text-gray-500 leading-relaxed mb-5">
                Capacitamos professores a <strong className="text-gray-800 font-semibold">fazer mais em menos tempo</strong> e a cativar alunos como nunca antes.
              </p>
              <p data-reveal data-delay="4" className="text-base text-gray-500 leading-relaxed mb-10">
                A Realms não tem como objetivo substituir educadores. Pelo contrário, foi construída sobre a crença fundamental de que os professores são — e devem continuar sendo — os protagonistas da educação. O que a Realms oferece é um poderoso conjunto de ferramentas que <strong className="text-gray-800 font-semibold">amplia a capacidade criativa e pedagógica dos educadores</strong>.
              </p>
              <div data-reveal data-delay="5">
                <Button to="/sobre-nos" size="lg" variant="dark">
                  Saiba mais sobre nós &nbsp;→
                </Button>
              </div>
            </div>

            {/* Right — métricas */}
            <div className="divide-y divide-gray-100">
              {[
                { value: '350K+', desc: 'Professores atendidos pela plataforma',              delay: '5' },
                { value: '400K+', desc: 'Pico de usuários únicos simultâneos na plataforma',  delay: '6' },
                { value: '9M+',   desc: 'Alunos atendidos em todo o Brasil',                   delay: '7' },
                { value: '98M+',  desc: 'Tarefas aplicadas somente em 2023',                   delay: '8' },
              ].map(({ value, desc, delay }) => (
                <div
                  key={value}
                  data-reveal
                  data-delay={delay}
                  className="flex items-start gap-6 py-7 first:pt-0 last:pb-0"
                >
                  <span className="text-5xl lg:text-6xl font-black text-gray-900 leading-none whitespace-nowrap flex-shrink-0">
                    {value}
                  </span>
                  <p className="text-sm text-gray-400 leading-relaxed self-center max-w-[160px]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          PRODUCTS OVERVIEW
      ═══════════════════════════════════════════ */}
      <Section className="bg-white" id="products">
        <Container>
          <div className="text-center mb-14">
            <p className="section-label mb-3">{t('hero.tagline')}</p>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              {t('home.products_title')}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {t('home.products_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((product) => (
              <Link
                key={product.key}
                to={product.path}
                className="group relative card p-7 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                <div
                  className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                >
                  {product.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {t(`products.${product.key}`)}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{product.desc}</p>
                <div className="mt-5 flex items-center gap-1.5 text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-1">
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          TECHNOLOGY SECTION
      ═══════════════════════════════════════════ */}
      <Section className="bg-gray-50" id="technology">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-3">{t('home.tech_title')}</p>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mt-2 mb-6 leading-tight">
                {t('home.tech_subtitle')}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">{t('home.tech_body')}</p>
              <div className="grid grid-cols-2 gap-3">
                {TECH_FEATURES.map((key) => (
                  <div key={key} className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{t(`home.${key}`)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.labelKey}
                  className="card p-7 text-center hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className={`text-4xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{t(`home.${stat.labelKey}`)}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          PARTNERS
      ═══════════════════════════════════════════ */}
      <Section className="bg-white" id="partners">
        <Container>
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">
            {t('home.partners_title')}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-14">
            {PARTNERS.map((partner) => (
              <span
                key={partner}
                className="text-xl lg:text-2xl font-black text-gray-200 hover:text-gray-400 transition-colors cursor-default select-none"
              >
                {partner}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════ */}
      <Section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-5 leading-tight">
            {t('home.cta_title')}
          </h2>
          <p className="text-blue-100 text-lg lg:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            {t('home.cta_subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button to="/contato" size="xl" variant="white">
              {t('home.cta_button')}
            </Button>
            <Button to="/sobre-nos" size="xl" variant="secondary">
              {t('nav.about')}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
