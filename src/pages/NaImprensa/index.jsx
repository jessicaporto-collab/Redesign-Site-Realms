import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'

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

// ─────────────────────────────────────────────────────────────────
//  Data
// ─────────────────────────────────────────────────────────────────

const DESTAQUES = [
  {
    id: 1,
    imgColor: 'bg-slate-800',
    title: 'Convite interativo para minhas palestras na Bett Nordeste 4 e 5 de setembro de 2024:',
    excerpt:
      'Acompanhe nossas participações em eventos para ficar por dentro de todos os nossos lançamentos. Com a mais nova ferramenta Eduxgen.AI o professor ganhará um aliado para ajudar nas demandas de ensino. Nossa ferramenta será um grande aliado nessa nova era da educação.',
    link: '#',
  },
  {
    id: 2,
    imgColor: 'bg-slate-400',
    imgUrl: null,
    source: 'https://www.ultimahoraonline.com.br/noticia/eduardo-giraldezfala-sobre-a-inovadora-plataforma-de-inteligencia-artificial-para-professores',
    title: 'Eduardo Giraldez fala sobre a inovadora plataforma de inteligência artificial para professores',
    excerpt:
      'Estamos no Golfe Olímpico, onde está acontecendo um grande evento do cinturão de turismo. Hoje, tivemos o privilégio de conversar com Eduardo Giraldez, que recentemente deu uma palestra sobre inteligência artificial...',
    link: '#',
  },
]

const OUTRAS_MATERIAS = [
  {
    id: 1,
    imgColor: 'bg-blue-200',
    title: 'Metaverso na educação:',
    date: '10 de maio de 2023',
    excerpt:
      'Parem as máquinas! Ou melhor, liguem as máquinas. A educação digital, pela Internet, já é uma realidade para muitas pessoas...',
    link: '#',
  },
  {
    id: 2,
    imgColor: 'bg-yellow-300',
    title: 'Tecnologia brasileira leva conhecimento a regiões isoladas',
    date: 'Há 1 ano',
    excerpt:
      'O sistema une professores que vivem em cidades com mais estrutura e alunos de locais que vão do interior da Amazônia aos rincões da África.',
    link: '#',
  },
  {
    id: 3,
    imgColor: 'bg-green-300',
    title: 'Cariri, participa da experiência pioneira...',
    date: '16:54 | 19/09/2023',
    excerpt:
      'plataforma que será usada é resultado de uma aliança internacional com o aval do Instituto Federal do Amazonas e das Universidades Federais do Cariri e do Maranhão.',
    link: '#',
  },
  {
    id: 4,
    imgColor: 'bg-teal-300',
    title: 'Porteiras participa de experiência de inclusão do metaverso...',
    date: 'Quarta-feira, 20 de Setembro de 2023',
    excerpt:
      'A plataforma que será usada é resultado de uma aliança internacional com o aval do Instituto Federal do Amazonas',
    link: '#',
  },
]

const ULTIMAS_NOTICIAS = [
  {
    id: 1,
    imgColor: 'bg-slate-600',
    title: 'Eduardo Giráldez no Evento Anual do Grupo Cerc de Ensino',
    excerpt:
      'Tivemos o prazer de assistir nosso Chairman, iluminar o evento anual do Grupo Cerc de Ensino com sua palestra inspiradora sobre a transformação da educação através da inteligência artificial. Eduardo abordou um tema vital: a utilização da IA como um assistente...',
    link: '#',
    cta: 'Leia Mais',
  },
  {
    id: 2,
    imgColor: 'bg-blue-700',
    title: 'Liderança Visionária na Discussão sobre Soberania Digital no CGI.br',
    excerpt:
      'Em sua apresentação, Eduardo enfatizou a importância de abordar a tecnologia com cautela, especialmente em relação ao uso da inteligência artificial na educação. Ele destacou os desafios enfrentados pelos professores e a necessidade de ferramentas que apoiem sua produtividade, sem comprometer seu papel insubstituível...',
    link: '#',
    cta: 'Saiba Mais',
  },
  {
    id: 3,
    imgColor: 'bg-gray-900',
    title: 'Estamos entusiasmados em compartilhar nosso mais recente vídeo sobre o EduxGen.AI',
    excerpt:
      'No vídeo, exploramos: Funcionalidades Chave: Como o EduxGen.AI otimiza o gerenciamento de tarefas e avaliações, economizando tempo valioso para os professores. Benefícios para Professores e Alunos: Demonstramos como nossa tecnologia apoia...',
    link: '#',
    cta: 'Saiba Mais',
  },
  {
    id: 4,
    imgColor: 'bg-sky-200',
    title: 'Realms na Vanguarda da Educação Digital nas Escolas Públicas',
    excerpt:
      'Parceria inovadora leva tecnologia de ponta para estudantes de regiões remotas do Brasil, transformando a experiência de aprendizado com recursos digitais acessíveis...',
    link: '#',
    cta: 'Leia Mais',
  },
  {
    id: 5,
    imgColor: 'bg-indigo-200',
    title: 'Professores Ganham Aliado Poderoso com a IA da Realms',
    excerpt:
      'A plataforma EduxGen.AI está revolucionando a forma como professores planejam aulas e avaliam alunos, reduzindo em até 40% o tempo gasto em tarefas administrativas...',
    link: '#',
    cta: 'Leia Mais',
  },
  {
    id: 6,
    imgColor: 'bg-blue-100',
    title: 'Realms Expande Presença Internacional com Parceiros Educacionais',
    excerpt:
      'A empresa fecha acordos estratégicos com instituições de ensino em países da América Latina e África, levando soluções educacionais inovadoras para além das fronteiras do Brasil...',
    link: '#',
    cta: 'Leia Mais',
  },
]

const PRESS_ITEMS = [
  {
    outlet: 'Forbes Brasil',
    date: 'Mar 2026',
    readTime: '4 min',
    titleKey: 'press_page.item1_title',
    tag: 'Feature',
    gradient: 'from-blue-900 to-blue-700',
    tagClass: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
  },
  {
    outlet: 'TechCrunch',
    date: 'Fev 2026',
    readTime: '3 min',
    titleKey: 'press_page.item2_title',
    tag: 'Funding',
    gradient: 'from-emerald-900 to-emerald-700',
    tagClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
  },
  {
    outlet: 'G1 Educação',
    date: 'Jan 2026',
    readTime: '5 min',
    titleKey: 'press_page.item3_title',
    tag: 'Growth',
    gradient: 'from-violet-900 to-violet-700',
    tagClass: 'bg-violet-500/15 text-violet-300 border-violet-500/20',
  },
  {
    outlet: 'Valor Econômico',
    date: 'Dez 2025',
    readTime: '4 min',
    titleKey: 'press_page.item4_title',
    tag: 'Partnership',
    gradient: 'from-orange-900 to-orange-700',
    tagClass: 'bg-orange-500/15 text-orange-300 border-orange-500/20',
  },
  {
    outlet: 'MIT Technology Review',
    date: 'Out 2025',
    readTime: '6 min',
    titleKey: 'press_page.item5_title',
    tag: 'Innovation',
    gradient: 'from-cyan-900 to-cyan-700',
    tagClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20',
  },
  {
    outlet: 'Folha de S.Paulo',
    date: 'Set 2025',
    readTime: '3 min',
    titleKey: 'press_page.item6_title',
    tag: 'Social Impact',
    gradient: 'from-rose-900 to-rose-700',
    tagClass: 'bg-rose-500/15 text-rose-300 border-rose-500/20',
  },
]

const AWARDS = [
  { icon: '🏆', label: 'EdTech Award 2024' },
  { icon: '⭐', label: 'Prêmio BETT Brasil' },
  { icon: '🎖', label: 'Top 100 Startups' },
  { icon: '🌟', label: 'Inovação Educacional MEC' },
  { icon: '🏅', label: 'Forbes Educa 2023' },
  { icon: '✨', label: 'Prêmio E‑Learning Brasil' },
]

const BRANDS = [
  'Secretaria de Educação SP',
  'Ministério da Educação',
  'Fundação Lemann',
  'Sebrae',
  'Prefeitura RJ',
  'Secretaria MG',
  'Cogna Educação',
  'Somos Educação',
]
const BRANDS_DOUBLED = [...BRANDS, ...BRANDS]

const STATS = [
  { value: '200+', labelKey: 'press_page.stat1_label' },
  { value: '50+', labelKey: 'press_page.stat2_label' },
  { value: '20+', labelKey: 'press_page.stat3_label' },
  { value: '8', labelKey: 'press_page.stat4_label' },
]

// ─────────────────────────────────────────────────────────────────
//  Image placeholder helper
// ─────────────────────────────────────────────────────────────────
function ImgPlaceholder({ colorClass, className = '' }) {
  return (
    <div
      className={`${colorClass} ${className} w-full h-full flex items-center justify-center`}
      aria-hidden="true"
    >
      <svg className="w-10 h-10 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Hero
// ─────────────────────────────────────────────────────────────────
function HeroSection() {
  const { t } = useTranslation()
  const contentRef = useRef(null)

  useEffect(() => {
    const items = contentRef.current?.querySelectorAll('.hero-item')
    if (!items) return
    items.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      const delay = 300 + i * 130
      const timer = setTimeout(() => {
        el.style.transition =
          'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, delay)
      return () => clearTimeout(timer)
    })
  }, [])

  return (
    <section
      id="press-hero"
      className="relative min-h-[75vh] w-full overflow-hidden flex items-center bg-[#0a0a0a]"
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        ref={contentRef}
        className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20"
      >
        <div className="max-w-4xl">
          <p className="hero-item flex items-center gap-3 text-white/40 text-[11px] font-semibold uppercase tracking-[0.25em] mb-7">
            <span className="w-8 h-px bg-white/35" aria-hidden="true" />
            {t('press_page.hero_tagline')}
          </p>
          <h1 className="hero-item text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.92] tracking-tight mb-6">
            {t('press_page.hero_line1')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-300 to-blue-400">
              {t('press_page.hero_line2')}
            </span>
          </h1>
          <p className="hero-item text-base sm:text-lg text-white/45 leading-relaxed max-w-2xl mb-10 font-light">
            {t('press_page.hero_description')}
          </p>
          <div className="hero-item flex flex-wrap gap-4">
            <Button to="/contato" size="lg" variant="primary">
              {t('press_page.hero_cta_contact')}
            </Button>
            <Button href="#" size="lg" variant="outline-white">
              {t('press_page.hero_cta_kit')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Brands marquee
// ─────────────────────────────────────────────────────────────────
function BrandsSection() {
  const { t } = useTranslation()

  return (
    <section className="bg-[#0d0d0d] py-14 overflow-hidden border-y border-white/[0.05]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/25">
          {t('press_page.brands_label')}
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="marquee-track gap-12">
          {BRANDS_DOUBLED.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="whitespace-nowrap text-sm text-white/25 font-medium mx-8 select-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  News grid + sidebar (dark)
// ─────────────────────────────────────────────────────────────────
function NewsSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section id="news" className="bg-[#0a0a0a] py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
        aria-hidden="true"
      />
      <Container>
        <div ref={sectionRef}>
          <div className="text-center mb-14">
            <span className="reveal section-badge mb-4 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              {t('press_page.news_badge')}
            </span>
            <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t('press_page.news_heading')}
            </h2>
            <p className="reveal delay-3 text-white/40 mt-4 max-w-xl mx-auto font-light">
              {t('press_page.news_sub')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
            {/* Articles */}
            <div className="space-y-4">
              {PRESS_ITEMS.map((item, i) => (
                <article
                  key={item.titleKey}
                  className={`reveal delay-${Math.min(i + 1, 6)} group flex items-start gap-5 card-dark p-5 hover:-translate-y-0.5 hover:border-white/10 transition-all duration-300 cursor-pointer`}
                >
                  <div
                    className={`bg-gradient-to-br ${item.gradient} w-20 h-[60px] rounded-xl flex-shrink-0`}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-white/28 font-semibold mb-1.5 uppercase tracking-[0.15em]">
                      <span className="text-white/50">{item.outlet}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.readTime} read</span>
                      <span
                        className={`ml-auto border text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-widest ${item.tagClass}`}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-violet-300 transition-colors duration-200">
                      {t(item.titleKey)}
                    </h3>
                  </div>
                  <svg
                    className="w-4 h-4 text-white/20 flex-shrink-0 mt-1 group-hover:text-white/50 transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <div className="reveal delay-3 space-y-5 lg:sticky lg:top-28">
              <div className="card-dark p-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">{t('pages.press.press_contact')}</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-5 font-light">
                  {t('press_page.contact_desc')}
                </p>
                <Button to="/contato" size="sm" variant="outline-white" className="w-full justify-center">
                  {t('nav.contact')}
                </Button>
              </div>

              <div className="card-dark p-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">{t('pages.press.download_kit')}</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-5 font-light">
                  {t('press_page.kit_desc')}
                </p>
                <Button href="#" size="sm" variant="outline-white" className="w-full justify-center">
                  {t('press_page.kit_btn')}
                </Button>
              </div>

              <div className="card-dark p-6">
                <h3 className="font-bold text-white mb-4">{t('press_page.awards_title')}</h3>
                <ul className="space-y-3">
                  {AWARDS.map((a) => (
                    <li key={a.label} className="flex items-center gap-3 text-sm text-white/45 font-light">
                      <span className="text-base">{a.icon}</span>
                      {a.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Stats bar
// ─────────────────────────────────────────────────────────────────
function StatsBarSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section className="bg-[#0d0d0d] py-16 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(124,58,237,0.06)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />
      <Container>
        <div
          ref={sectionRef}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden"
        >
          {STATS.map((s, i) => (
            <div
              key={s.labelKey}
              className={`reveal delay-${i + 1} bg-[#0d0d0d] hover:bg-[#131313] transition-colors duration-300 p-8 text-center group cursor-default`}
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tabular-nums leading-none group-hover:text-violet-300 transition-colors duration-300">
                {s.value}
              </div>
              <p className="text-xs text-white/35 font-light leading-snug">{t(s.labelKey)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  CTA Final
// ─────────────────────────────────────────────────────────────────
function CTAFinalSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section id="press-cta" className="bg-[#0a0a0a] py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(124,58,237,0.09)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
        aria-hidden="true"
      />
      <Container>
        <div ref={sectionRef} className="text-center max-w-3xl mx-auto">
          <span className="reveal section-badge mb-6 justify-center block">
            <span className="w-5 h-px bg-current" aria-hidden="true" />
            {t('press_page.cta_badge')}
          </span>
          <h2 className="reveal delay-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.0] tracking-tight mb-6">
            {t('press_page.cta_line1')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-300 to-blue-400">
              {t('press_page.cta_line2')}
            </span>
          </h2>
          <p className="reveal delay-3 text-white/40 text-lg leading-relaxed mb-10 font-light">
            {t('press_page.cta_sub')}
          </p>
          <div className="reveal delay-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contato" size="lg" variant="primary">
              {t('press_page.cta_contact')}
            </Button>
            <Button to="/sobre-nos" size="lg" variant="outline-white">
              {t('press_page.cta_about')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Destaques
// ─────────────────────────────────────────────────────────────────
function DestaquesSection() {
  return (
    <section className="bg-[#0d0d0d] py-14 border-t border-white/[0.05]">
      <Container>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-10">
          Destaques
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DESTAQUES.map((item) => (
            <article key={item.id} className="flex flex-col">
              {/* image */}
              <div className="w-full aspect-[16/9] overflow-hidden rounded-xl mb-4">
                <ImgPlaceholder colorClass={item.imgColor} className="rounded-xl" />
              </div>
              {/* source URL for second card */}
              {item.source && (
                <p className="text-xs text-white/30 break-all mb-2">{item.source}</p>
              )}
              <h3 className="text-lg font-bold text-white leading-snug mb-2">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-3">{item.excerpt}</p>
              <a
                href={item.link}
                className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
              >
                Leia Mais
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Veja outras matérias
// ─────────────────────────────────────────────────────────────────
function OutrasMaterialsSection() {
  return (
    <section className="bg-[#0a0a0a] py-14 border-t border-white/[0.05]">
      <Container>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-10">
          Veja outras matérias
        </h2>
        <div className="border border-white/[0.07] rounded-2xl divide-y divide-white/[0.06]">
          {OUTRAS_MATERIAS.map((item) => (
            <article key={item.id} className="flex gap-5 p-5 hover:bg-white/[0.02] transition-colors duration-200">
              {/* thumbnail */}
              <div className="flex-shrink-0 w-36 h-24 overflow-hidden rounded-xl">
                <ImgPlaceholder colorClass={item.imgColor} className="rounded-xl h-24" />
              </div>
              {/* content */}
              <div className="flex flex-col justify-between min-w-0">
                <div>
                  <h3 className="text-base font-bold text-white leading-snug mb-1">{item.title}</h3>
                  <p className="text-xs text-white/35 mb-2">{item.date}</p>
                  <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{item.excerpt}</p>
                </div>
                <a
                  href={item.link}
                  className="mt-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Leia Mais
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Últimas notícias
// ─────────────────────────────────────────────────────────────────
function UltimasNoticiasSection() {
  return (
    <section className="bg-[#0d0d0d] py-14 border-t border-white/[0.05]">
      <Container>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-10">
          Últimas notícias
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ULTIMAS_NOTICIAS.map((item) => (
            <article key={item.id} className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-video overflow-hidden rounded-xl mb-4">
                <ImgPlaceholder colorClass={item.imgColor} className="rounded-xl h-full" />
              </div>
              <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-violet-300 transition-colors duration-200">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-3 line-clamp-4">{item.excerpt}</p>
              <a
                href={item.link}
                className="mt-auto text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
              >
                {item.cta}
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Page
// ─────────────────────────────────────────────────────────────────
export default function NaImprensa() {
  return (
    <>
      <HeroSection />
      <BrandsSection />
      <DestaquesSection />
      <OutrasMaterialsSection />
      <UltimasNoticiasSection />
      <NewsSection />
      <StatsBarSection />
      <CTAFinalSection />
    </>
  )
}
