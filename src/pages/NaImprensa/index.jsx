import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import fundoHero from '../../assets/na-imprensa/fundo na imprensa.jpg'
import logoRealms from '../../assets/na-imprensa/logo realms – branco.png'
import imgCerc from '../../assets/na-imprensa/Eduardo Giráldez no Evento Anual do Grupo Cerc de Ensino.png'
import imgCGI from '../../assets/na-imprensa/Liderança Visionária na Discussão sobre Soberania Digital no CGI.br.jpg'
import imgEduxGen from '../../assets/na-imprensa/Estamos entusiasmados em compartilhar nosso mais recente vídeo sobre o EduxGen.jpg'
import imgBett from '../../assets/na-imprensa/Convite interativo para minhas palestras na Bett Nordeste 4 e 5 de setembro de 2024.jpg'
import imgGiraldez from '../../assets/na-imprensa/Eduardo Giraldez fala sobre a inovadora plataforma de inteligência artificial para professores.png'
import imgPlataformaIA from '../../assets/na-imprensa/Plataforma de IA ajuda professores a criar aulas e vídeoaulas.png'
import imgNovaPlataforma from '../../assets/na-imprensa/Nova plataforma chega para melhorar rotina do professor.jpg'
import imgProfessorAliado from '../../assets/na-imprensa/Professor ganha forte aliado tecnológico, em sala de aula com a tecnologia.png'

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
    imgUrl: imgBett,
    title: 'Convite interativo para minhas palestras na Bett Nordeste 4 e 5 de setembro de 2024:',
    excerpt:
      'Acompanhe nossas participações em eventos para ficar por dentro de todos os nossos lançamentos. Com a mais nova ferramenta Eduxgen.AI o professor ganhará um aliado para ajudar nas demandas de ensino. Nossa ferramenta será um grande aliado nessa nova era da educação.',
    link: 'https://www.linkedin.com/posts/eduardo-giraldez-6140374b_convite-interativo-para-minhas-palestras-activity-7220166818064121858-OCpx/?utm_source=combined_share_message&utm_medium=member_android',
  },
  {
    id: 2,
    imgColor: 'bg-slate-400',
    imgUrl: imgGiraldez,
    source: 'https://www.ultimahoraonline.com.br/noticia/eduardo-giraldezfala-sobre-a-inovadora-plataforma-de-inteligencia-artificial-para-professores',
    title: 'Eduardo Giraldez fala sobre a inovadora plataforma de inteligência artificial para professores',
    excerpt:
      'Estamos no Golfe Olímpico, onde está acontecendo um grande evento do cinturão de turismo. Hoje, tivemos o privilégio de conversar com Eduardo Giraldez, que recentemente deu uma palestra sobre inteligência artificial...',
    link: 'https://www.ultimahoraonline.com.br/noticia/eduardo-giraldezfala-sobre-a-inovadora-plataforma-de-inteligencia-artificial-para-professores',
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
    imgUrl: imgCerc,
    titleKey: 'press_page.ultimas_n1_title',
    excerptKey: 'press_page.ultimas_n1_excerpt',
    link: 'https://www.linkedin.com/posts/realms-education_grupocercdeensino-educaaexaeto-inteligaeanciaartificial-activity-7218734719671115776-6DX-/?utm_source=share&utm_medium=member_desktop',
  },
  {
    id: 2,
    imgColor: 'bg-blue-700',
    imgUrl: imgCGI,
    titleKey: 'press_page.ultimas_n2_title',
    excerptKey: 'press_page.ultimas_n2_excerpt',
    link: 'https://www.youtube.com/watch?v=7GyYrLsQvhc',
  },
  {
    id: 3,
    imgColor: 'bg-gray-900',
    imgUrl: imgEduxGen,
    titleKey: 'press_page.ultimas_n3_title',
    excerptKey: 'press_page.ultimas_n3_excerpt',
    link: 'https://www.youtube.com/watch?v=EzRpdjtN-cs',
  },
  {
    id: 4,
    imgColor: 'bg-sky-200',
    imgUrl: imgPlataformaIA,
    titleKey: 'press_page.ultimas_n4_title',
    excerptKey: 'press_page.ultimas_n4_excerpt',
    link: 'https://d24am.com/tecnologia/plataforma-de-ia-ajuda-professores-a-criar-aulas-e-videoaulas-saiba-mais/',
  },
  {
    id: 5,
    imgColor: 'bg-indigo-200',
    imgUrl: imgNovaPlataforma,
    titleKey: 'press_page.ultimas_n5_title',
    excerptKey: 'press_page.ultimas_n5_excerpt',
    link: 'https://jornaldobelem.com.br/noticia/40098/nova-plataforma-chega-para-melhorar-rotina-do-professor',
  },
  {
    id: 6,
    imgColor: 'bg-blue-100',
    imgUrl: imgProfessorAliado,
    titleKey: 'press_page.ultimas_n6_title',
    excerptKey: 'press_page.ultimas_n6_excerpt',
    link: 'https://www.correiodobrasil.com.br/a/professor-ganha-forte-aliado-tecnologico-sala-aula',
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
  useParticles('press-hero-particles')

  return (
    <section
      id="press-hero"
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight: '75vh', maxHeight: '75vh' }}
    >
      {/* Partículas */}
      <div id="press-hero-particles" className="absolute inset-0 z-10" />

      {/* Fundo */}
      <img
        src={fundoHero}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      {/* Fade inferior */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Conteúdo centralizado */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 pt-20 pb-16">
        <img
          src={logoRealms}
          alt="Realms ip.tv"
          className="w-72 sm:w-96 md:w-[480px] lg:w-[560px] max-w-full object-contain mb-2 drop-shadow-2xl"
        />
        <p className="text-white text-2xl sm:text-3xl md:text-4xl font-black tracking-widest uppercase">
          {t('press_page.hero_tagline', 'Na Mídia')}
        </p>
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
//  CTA Final
// ─────────────────────────────────────────────────────────────────
function CTAFinalSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section id="press-cta" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Fundo */}
      <img
        src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1920&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      {/* Gradiente de baixo para cima */}
      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black via-black/70 via-40% to-transparent pointer-events-none" aria-hidden="true" />
      {/* Glow roxo */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(124,58,237,0.18)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />
      <Container>
        <div ref={sectionRef} className="text-center max-w-3xl mx-auto">
          <span className="reveal section-badge mb-6 justify-center block text-white/80">
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
          <p className="reveal delay-3 text-white/80 text-lg leading-relaxed mb-10 font-light drop-shadow-md">
            {t('press_page.cta_sub')}
          </p>
          <div className="reveal delay-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contato" size="lg" variant="outline-white">
              {t('press_page.cta_contact')}
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
                {item.imgUrl ? (
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="rounded-xl w-full h-full object-cover"
                  />
                ) : (
                  <ImgPlaceholder colorClass={item.imgColor} className="rounded-xl" />
                )}
              </div>
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
  const { t } = useTranslation()
  return (
    <section className="bg-[#0d0d0d] py-14 border-t border-white/[0.05]">
      <Container>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-10">
          {t('press_page.ultimas_heading')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ULTIMAS_NOTICIAS.map((item) => (
            <article key={item.id} className="flex flex-col">
              <div className="w-full aspect-video overflow-hidden rounded-xl mb-4">
                {item.imgUrl ? (
                  <img
                    src={item.imgUrl}
                    alt={t(item.titleKey)}
                    className="rounded-xl h-full w-full object-cover"
                    style={item.id === 2 ? { objectPosition: 'center 50%', marginTop: '4px' } : undefined}
                  />
                ) : (
                  <ImgPlaceholder colorClass={item.imgColor} className="rounded-xl h-full" />
                )}
              </div>
              <h3 className="text-base font-bold text-white leading-snug mb-2">{t(item.titleKey)}</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-3 line-clamp-4">{t(item.excerptKey)}</p>
              <a
                href={item.link}
                className="mt-auto text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
              >
                {t('press_page.ultimas_cta')}
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
      <UltimasNoticiasSection />
      <OutrasMaterialsSection />
      <CTAFinalSection />
    </>
  )
}
