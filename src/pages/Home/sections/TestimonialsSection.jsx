import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Container from '../../../components/ui/Container'
import imgAssespro from '../assets/Logo premio Assespro-RJ NOVA VERSAO.svg'
import imgGesa from '../assets/premio-internacional-gesa.png'
import imgTechLearning from '../assets/premio-internacional-techandlearning.png'
import imgQS from '../assets/premio-internacional-qs.png'
import imgNacional1 from '../assets/premio-nacional-1.png'
import imgNacional2 from '../assets/premio-nacional-2.png'
import imgNacional3 from '../assets/premio-nacional-3.png'
import imgNacional4 from '../assets/premio-nacional-4.png'
import imgNacional6 from '../assets/premio-nacional-6.png'
import imgNacional7 from '../assets/premio-nacional-7.png'
import imgNacional8 from '../assets/premio-nacional-8.png'
import imgUpscale from '../assets/upscalemedia-transformed (1).jpeg'

const TESTIMONIALS = [
  {
    quote:
      'A plataforma da Realms transformou completamente a forma como gerenciamos nossas salas de aula. Os professores economizam horas toda semana com o EduXGen.',
    author: 'Dra. Ana Ferreira',
    role: 'Diretora Pedagógica',
    org: 'Colégio São Paulo',
    initials: 'AF',
    accentClass: 'bg-blue-600',
  },
  {
    quote:
      'Em 5 minutos crio avaliações completas alinhadas ao currículo. É como ter um assistente pedagógico sempre disponível. Revolucionou minha prática.',
    author: 'Prof. Carlos Mendes',
    role: 'Coordenador de Ensino',
    org: 'Rede Municipal RJ',
    initials: 'CM',
    accentClass: 'bg-violet-600',
  },
  {
    quote:
      'A Realms nos ajudou a escalar de 500 para 50.000 alunos sem perder qualidade. A infraestrutura é robusta e o suporte é excepcional.',
    author: 'Fernanda Lima',
    role: 'CEO',
    org: 'EduTech Brasil',
    initials: 'FL',
    accentClass: 'bg-emerald-600',
  },
]

// Items must be duplicated so the marquee loops seamlessly
const BRANDS = [
  'Secretaria Educação SP',
  'Ministério da Educação',
  'Fundação Lemann',
  'Sebrae',
  'Prefeitura Rio de Janeiro',
  'Secretaria MG',
  'Cogna Educação',
  'Somos Educação',
]
const BRANDS_DOUBLED = [...BRANDS, ...BRANDS]

const AWARDS = [
  { src: imgAssespro,    alt: 'Prêmio Assespro RJ' },
  { src: imgGesa,        alt: 'Prêmio Internacional GESA' },
  { src: imgTechLearning,alt: 'Prêmio Internacional Tech & Learning'},
  { src: imgNacional1,   alt: 'Prêmio Nacional' },
  { src: imgNacional2,   alt: 'Prêmio Nacional' },
  { src: imgNacional3,   alt: 'Prêmio Nacional' },
  { src: imgNacional4,   alt: 'Prêmio Nacional' },
  { src: imgNacional6,   alt: 'Prêmio Nacional', cls: 'h-[53px]' },
  { src: imgNacional7,   alt: 'Prêmio Nacional', cls: 'h-[53px]' },
  { src: imgNacional8,   alt: 'Prêmio Nacional', cls: 'h-[53px]' },
  { src: imgUpscale,     alt: 'Prêmio' },
  { src: imgQS,          alt: 'Prêmio Internacional QS' , cls: 'h-20'  },
]
const AWARDS_DOUBLED = [...AWARDS, ...AWARDS]

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

export default function TestimonialsSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <>
      {/* ── Testimonials ── */}
      <section id="testimonials" className="bg-[#090909] py-20 lg:py-28">
        <Container>
          <div ref={sectionRef}>
            <div className="text-center mb-14">
              <span className="reveal section-badge mb-4 block">
                <span className="w-5 h-px bg-current" aria-hidden="true" />
                {t('testimonials.badge')}
              </span>
              <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {t('testimonials.heading')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((item, i) => (
                <article
                  key={i}
                  className={`reveal delay-${i + 2} card-dark p-7 hover:-translate-y-1 transition-transform duration-300`}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5" aria-label="5 de 5 estrelas">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg key={s} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-white/55 text-sm leading-relaxed mb-6 font-light">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${item.accentClass} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                      aria-hidden="true"
                    >
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-semibold">{item.author}</p>
                      <p className="text-white/35 text-xs font-light">
                        {item.role} · {item.org}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Brands marquee ── */}
      <div className="bg-[#0c0c0c] py-7 border-y border-white/[0.05] overflow-hidden">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-white/20 mb-5">
          {t('testimonials.brands_label')}
        </p>
        <div className="overflow-hidden">
          <div className="marquee-track gap-14" aria-hidden="true">
            {BRANDS_DOUBLED.map((brand, i) => (
              <span key={i} className="text-white/18 text-sm font-semibold whitespace-nowrap px-6 hover:text-white/40 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Awards marquee ── */}
      <div className="bg-[#090909] py-7 border-b border-white/[0.05] overflow-hidden">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-white/20 mb-5">
          {t('testimonials.awards_label')}
        </p>
        <div className="overflow-hidden">
          <div className="marquee-track-reverse gap-12" aria-hidden="true">
            {AWARDS_DOUBLED.map((award, i) => (
              <div key={i} className="flex-shrink-0 px-6 flex items-center justify-center">
                <img
                  src={award.src}
                  alt={award.alt}
                  className={`${award.cls ?? 'h-14'} w-auto object-contain opacity-50 hover:opacity-80 transition-opacity duration-200`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
