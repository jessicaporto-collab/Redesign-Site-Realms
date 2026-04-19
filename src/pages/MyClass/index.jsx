import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Container from '../../components/ui/Container'
import img1Myclass from '../../assets/myclass/img1-myclass.png'
import img2Myclass from '../../assets/myclass/img2-myclass.png'
import img3Myclass from '../../assets/myclass/img3-myclass.png'
import img4Myclass from '../../assets/myclass/img4-myclass.png'
import img5Myclass from '../../assets/myclass/img5-myclass.png'
import img6Myclass from '../../assets/myclass/img6-myclass.png'
import img7Myclass from '../../assets/myclass/img7-myclass.png'
import img8Myclass from '../../assets/myclass/img8-myclass.png'
import imgTrilha from '../../assets/myclass/img-trilha.jpg'
import imgProvaComToken from '../../assets/myclass/ProvaComToken.png'

/* ---------------------------------------------
   Unsplash images (free / no copyright)
--------------------------------------------- */
const IMG = {
  heroClassroom:
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=70&fit=crop',
  liveClass:
    'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=900&q=85&fit=crop',
  collaboration:
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=85&fit=crop',
  dashboard:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&fit=crop',
  mobile:
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80&fit=crop',
  learning:
    'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80&fit=crop',
  teacher:
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=75&fit=crop',
  students:
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=75&fit=crop',
  quiz:
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=75&fit=crop',
}

/* -- feature metadata (static, outside component) -- */
const FEAT_META = [
  {
    id: 'f1', accent: '#7c3aed', bg: '#f5f3ff', tKey: 'feat_1',
    icon: (c) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M5.636 18.364a9 9 0 1 0 12.728 0" />
        <path d="M8.464 15.536a5 5 0 1 0 7.072 0" />
        <circle cx="12" cy="12" r="1" fill={c} />
      </svg>
    ),
  },
  {
    id: 'f2', accent: '#a855f7', bg: '#faf5ff', tKey: 'feat_2',
    icon: (c) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M9 11V7a3 3 0 0 1 6 0v4" />
        <circle cx="9" cy="16" r="1" fill={c} stroke="none" />
        <circle cx="15" cy="16" r="1" fill={c} stroke="none" />
        <path d="M12 7v1m-3-1h6" />
      </svg>
    ),
  },
  {
    id: 'f3', accent: '#3b82f6', bg: '#eff6ff', tKey: 'feat_3',
    icon: (c) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-6 4 4 4-6" />
      </svg>
    ),
  },
  {
    id: 'f4', accent: '#ec4899', bg: '#fdf2f8', tKey: 'feat_4',
    icon: (c) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="12" y2="17" />
      </svg>
    ),
  },
  {
    id: 'f5', accent: '#f59e0b', bg: '#fffbeb', tKey: 'feat_5',
    icon: (c) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'f6', accent: '#10b981', bg: '#ecfdf5', tKey: 'feat_6',
    icon: (c) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    id: 'f7', accent: '#7c3aed', bg: '#f5f3ff', tKey: 'feat_7',
    icon: (c) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <rect x="7" y="14" width="3" height="3" rx="0.5" fill={c} stroke="none" />
      </svg>
    ),
  },
  {
    id: 'f8', accent: '#3b82f6', bg: '#eff6ff', tKey: 'feat_8',
    icon: (c) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'f9', accent: '#059669', bg: '#ecfdf5', tKey: 'feat_9',
    icon: (c) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
]

/* -- scroll reveal -- */
function useReveal() {
  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => ob.observe(el))
    return () => ob.disconnect()
  }, [])
}

/* -- check icon -- */
function Check({ color = '#7c3aed' }) {
  return (
    <div
      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
      style={{ background: `${color}18`, border: `1px solid ${color}50` }}
    >
      <svg className="w-3 h-3" style={{ color }} fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}

/* -- blob animado com ondas seno independentes (movimento orgânico) -- */
function AnimatedBlob({ style }) {
  const ref = useRef(null)
  // Parâmetros gerados uma vez por instância (fase e frequência únicas)
  const p = useRef({
    ax: 90 + Math.random() * 140,
    ay: 90 + Math.random() * 140,
    fx: 0.00025 + Math.random() * 0.00020,
    fy: 0.00025 + Math.random() * 0.00020,
    px: Math.random() * Math.PI * 2,
    py: Math.random() * Math.PI * 2,
    fsx: 0.00015 + Math.random() * 0.00012,
    fsy: 0.00013 + Math.random() * 0.00010,
    psx: Math.random() * Math.PI * 2,
    psy: Math.random() * Math.PI * 2,
  })

  useEffect(() => {
    let raf
    const tick = (t) => {
      if (!ref.current) return
      const { ax, ay, fx, fy, px, py, fsx, fsy, psx, psy } = p.current
      // Duas ondas somadas em cada eixo = trajetória nunca se repete exatamente
      const x = ax * Math.sin(fx * t + px) + (ax * 0.4) * Math.sin(fx * 2.3 * t + px + 1.1)
      const y = ay * Math.sin(fy * t + py) + (ay * 0.4) * Math.sin(fy * 1.7 * t + py + 2.3)
      const sx = 1 + 0.12 * Math.sin(fsx * t + psx)
      const sy = 1 + 0.10 * Math.sin(fsy * t + psy)
      ref.current.style.transform = `translate(${x}px, ${y}px) scale(${sx}, ${sy})`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <div ref={ref} style={{ willChange: 'transform', ...style }} />
}

/* -- section divider -- */
function SectionDivider() {
  return (
    <div aria-hidden="true" style={{ height: 1, background: '#e5e7eb' }} />
  )
}

/* -- section badge -- */
function Badge({ children }) {
  return (
    <p className="reveal flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] mb-4" style={{ color: '#7c3aed' }}>
      <span className="w-8 h-px" style={{ background: '#7c3aed' }} />
      {children}
      <span className="w-8 h-px" style={{ background: '#7c3aed' }} />
    </p>
  )
}

/* -- intro image grid com gaveta individual -- */
const INTRO_IMGS = [
  { src: img2Myclass, alt: 'Colaboração', titleKey: 'intro_img1_title', descKey: 'intro_img1_desc', accent: '#7c3aed' },
  { src: img3Myclass, alt: 'Professor', titleKey: 'intro_img2_title', descKey: 'intro_img2_desc', accent: '#ec4899' },
  { src: img4Myclass, alt: 'Alunos', titleKey: 'intro_img3_title', descKey: 'intro_img3_desc', accent: '#3b82f6' },
]

function IntroImageGrid({ t }) {
  const [hovered, setHovered] = useState(null)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {INTRO_IMGS.map((item, i) => {
        const open = hovered === i
        return (
          <div
            key={item.alt}
            className="reveal cursor-default"
            style={{ position: 'relative' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Imagem + Gaveta dentro do mesmo container */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: open
                ? `0 8px 32px ${item.accent}35`
                : '0 4px 24px rgba(0,0,0,0.08)',
              transition: 'box-shadow 0.4s ease',
            }}>
              <img
                src={item.src}
                alt={item.alt}
                className="w-full aspect-[4/3] object-cover block"
                style={{
                  transition: 'transform 0.6s ease, filter 0.4s ease',
                  transform: open ? 'scale(1.06)' : 'scale(1)',
                  filter: open ? 'brightness(0.75)' : 'brightness(1)',
                }}
              />

              {/* Gaveta — desliza de baixo para cima, dentro da imagem */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden',
                maxHeight: '160px',
                transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)',
              }}>
                <div style={{
                  background: `linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.88) 100%)`,
                  padding: '16px 20px 18px',
                  borderLeft: `3px solid ${item.accent}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: item.accent,
                      flexShrink: 0,
                      boxShadow: `0 0 6px ${item.accent}80`,
                    }} />
                    <h4 style={{ color: '#111827', fontWeight: 800, fontSize: '1.05rem', margin: 0 }}>
                      {t(`myclass_page.${item.titleKey}`)}
                    </h4>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '0.92rem', lineHeight: 1.6, margin: 0, paddingLeft: '14px' }}>
                    {t(`myclass_page.${item.descKey}`)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------ */
export default function MyClass() {
  const { t } = useTranslation()
  useReveal()
  const [trilhaOpen, setTrilhaOpen] = useState(false)

  return (
    <div style={{ background: '#ffffff', color: '#111827', position: 'relative' }}>

      {/* ═══════════════════════════════
          HERO
      ═══════════════════════════════ */}
      <section
        className="relative flex items-start justify-center overflow-hidden pt-32"
        style={{ paddingBottom: '120px' }}
      >
        {/* Blobs coloridos de fundo */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {/* Camada base — gradiente de textura granulada via SVG */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            opacity: 0.5,
          }} />

          {/* Roxo grande — top left */}
          <AnimatedBlob style={{
            position: 'absolute', top: '-160px', left: '-180px',
            width: '850px', height: '850px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.32) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }} />
          {/* Azul ciano — top right */}
          <AnimatedBlob style={{
            position: 'absolute', top: '-100px', right: '-140px',
            width: '720px', height: '720px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.28) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }} />
          {/* Rosa choque — top center */}
          <AnimatedBlob style={{
            position: 'absolute', top: '-40px', left: '25%',
            width: '560px', height: '500px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,114,182,0.26) 0%, transparent 72%)',
            filter: 'blur(45px)',
          }} />
          {/* Violeta médio — centro esquerda */}
          <AnimatedBlob style={{
            position: 'absolute', top: '32%', left: '2%',
            width: '580px', height: '580px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.28) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }} />
          {/* Azul royal — centro direita */}
          <AnimatedBlob style={{
            position: 'absolute', top: '22%', right: '4%',
            width: '620px', height: '620px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }} />
          {/* Laranja suave — centro */}
          <AnimatedBlob style={{
            position: 'absolute', top: '38%', left: '34%',
            width: '500px', height: '420px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251,146,60,0.22) 0%, transparent 72%)',
            filter: 'blur(40px)',
          }} />
          {/* Verde água — bottom center */}
          <AnimatedBlob style={{
            position: 'absolute', bottom: '-60px', left: '22%',
            width: '680px', height: '520px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(52,211,153,0.26) 0%, transparent 70%)',
            filter: 'blur(45px)',
          }} />
          {/* Índigo — bottom left */}
          <AnimatedBlob style={{
            position: 'absolute', bottom: '-100px', left: '-120px',
            width: '560px', height: '560px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 70%)',
            filter: 'blur(45px)',
          }} />
          {/* Rosa claro — bottom right */}
          <AnimatedBlob style={{
            position: 'absolute', bottom: '-80px', right: '-100px',
            width: '540px', height: '540px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)',
            filter: 'blur(45px)',
          }} />
          {/* Overlay branco suave para não saturar demais */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(255,255,255,0.22)',
          }} />
        </div>
        <Container className="relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            {/* Pill badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
              style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.3)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#7c3aed' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#7c3aed' }}>
                {t('myclass_page.hero_badge')}
              </span>
            </div>

            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] mb-6" style={{ color: '#111827' }}>
              {t('myclass_page.hero_h1_1')}{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #3b82f6 100%)' }}
              >
                {t('myclass_page.hero_h1_2')}
              </span>
              <br />
              {t('myclass_page.hero_h1_3')}
            </h1>

            <p className="text-lg leading-relaxed mb-0 max-w-2xl" style={{ color: '#6b7280' }}>
              O MyClass é uma solução completa de gestão de sala de aula e aprendizagem colaborativa. Centralize turmas, materiais, avaliações e comunicação em um único ambiente inteligente.
            </p>
          </div>

          {/* Hero image — aparece saindo de baixo da seção */}
          <div
            className="relative mx-auto"
            style={{ maxWidth: '1100px' }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 6px 20px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={img1Myclass}
                alt="MyClass plataforma"
                className="w-full object-cover object-top"
                style={{ display: 'block', maxHeight: '520px' }}
              />
              {/* Gradiente embaixo dando a sensação de "cortado" */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '140px',
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.95) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════
          O QUE É MYCLASS
      ═══════════════════════════════ */}
      <section className="py-28 relative" style={{ background: '#ffffff', marginTop: '-160px', paddingTop: '60px', position: 'relative', zIndex: 10 }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full blur-[160px]"
            style={{ background: 'rgba(124,58,237,0.04)' }}
          />
        </div>
        <Container>
          {/* Título e descrição centralizados */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="reveal flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] mb-4" style={{ color: '#7c3aed' }}>
              <span className="flex-1 h-px" style={{ background: '#7c3aed', maxWidth: '60px' }} />
              {t('myclass_page.intro_badge')}
              <span className="flex-1 h-px" style={{ background: '#7c3aed', maxWidth: '60px' }} />
            </p>
            <h2 className="reveal text-4xl lg:text-5xl font-black mb-6 leading-tight" style={{ color: '#111827' }}>
              {t('myclass_page.intro_h2_1')}{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
              >
                {t('myclass_page.intro_h2_2')}
              </span>
            </h2>
            <p className="reveal text-base leading-relaxed" style={{ color: '#6b7280' }}>
              {t('myclass_page.intro_p2')}
            </p>
          </div>

          {/* Grid de 3 imagens */}
          <IntroImageGrid t={t} />
        </Container>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════
          FUNCIONALIDADES PARA PROFESSORES & ALUNOS
      ═══════════════════════════════ */}
      <section className="py-28" style={{ background: '#ffffff' }}>
        <Container>
          <div className="text-center mb-16">
            <Badge>{t('myclass_page.users_badge')}</Badge>
            <h2 className="reveal text-4xl lg:text-5xl font-black mb-4" style={{ color: '#111827' }}>
              {t('myclass_page.users_h2_1')}<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
              >
                {t('myclass_page.users_h2_2')}
              </span>
            </h2>
            <p className="reveal max-w-2xl mx-auto leading-relaxed" style={{ color: '#6b7280' }}>
              {t('myclass_page.users_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Professores */}
            <div
              className="reveal relative rounded-3xl overflow-hidden border"
              style={{ background: '#ffffff', borderColor: '#ddd6fe', boxShadow: '0 14px 35px rgba(124,58,237,0.10)' }}
            >
              <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f5f3ff 0%, #eef2ff 100%)' }}>
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -left-20 h-52 w-52 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0) 70%)' }}
                />
                <img
                  src={img5Myclass}
                  alt="Professor usando MyClass"
                  className="relative z-[1] w-full h-auto object-contain p-3 md:p-4"
                />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-black mb-4" style={{ color: '#111827' }}>{t('myclass_page.teacher_title')}</h3>
                <ul className="space-y-3">
                  {[
                    t('myclass_page.teacher_feat_1'),
                    t('myclass_page.teacher_feat_2'),
                    t('myclass_page.teacher_feat_3'),
                    t('myclass_page.teacher_feat_4'),
                    t('myclass_page.teacher_feat_5'),
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check color="#7c3aed" />
                      <span className="text-base" style={{ color: '#4b5563' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Alunos */}
            <div
              className="reveal relative rounded-3xl overflow-hidden border"
              style={{ background: '#ffffff', borderColor: '#bfdbfe', boxShadow: '0 14px 35px rgba(59,130,246,0.12)' }}
            >
              <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #eff6ff 0%, #ecfeff 100%)' }}>
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 h-52 w-52 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0) 70%)' }}
                />
                <img
                  src={img6Myclass}
                  alt="Alunos usando MyClass"
                  className="relative z-[1] w-full h-auto object-contain p-3 md:p-4"
                />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-black mb-4" style={{ color: '#111827' }}>{t('myclass_page.student_title')}</h3>
                <ul className="space-y-3">
                  {[
                    t('myclass_page.student_feat_1'),
                    t('myclass_page.student_feat_2'),
                    t('myclass_page.student_feat_3'),
                    t('myclass_page.student_feat_4'),
                    t('myclass_page.student_feat_5'),
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check color="#3b82f6" />
                      <span className="text-base" style={{ color: '#4b5563' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════
          FEATURES CAROUSEL
      ═══════════════════════════════ */}
      <section
        className="py-14 relative overflow-hidden"
        style={{ background: '#f9fafb' }}
      >
        <Container>
          <div className="text-center mb-10">
            <Badge>{t('myclass_page.features_badge')}</Badge>
            <h2 className="reveal text-4xl lg:text-5xl font-black mb-4" style={{ color: '#111827' }}>
              {t('myclass_page.features_h2_1')}{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
              >
                {t('myclass_page.features_h2_2')}
              </span>
            </h2>
            <p className="reveal max-w-xl mx-auto" style={{ color: '#6b7280' }}>
              {t('myclass_page.features_desc')}
            </p>
          </div>
        </Container>

        {/* Carrossel infinito — full width */}
        <div
          className="overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0px, black 100px, black calc(100% - 100px), transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0px, black 100px, black calc(100% - 100px), transparent 100%)',
          }}
        >
          <div className="marquee-track" style={{ gap: '20px', paddingBlock: '8px' }}>
            {[
              ...FEAT_META.map((m) => ({ ...m, uid: m.id })),
              ...FEAT_META.map((m) => ({ ...m, uid: `${m.id}b` })),
            ].map((feat) => (
              <div
                key={feat.uid}
                className="flex-shrink-0 rounded-2xl p-6 border"
                style={{
                  width: '260px',
                  background: '#ffffff',
                  borderColor: '#e5e7eb',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: feat.bg, border: `1px solid ${feat.accent}25` }}
                >
                  {feat.icon(feat.accent)}
                </div>
                <h4 className="font-bold mb-2 text-sm leading-snug" style={{ color: '#111827' }}>
                  {t(`myclass_page.${feat.tKey}_title`)}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>
                  {t(`myclass_page.${feat.tKey}_desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          BANNER TRILHA
      ═══════════════════════════════ */}
      <section style={{ padding: '0 12px' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div
            className="reveal relative overflow-hidden"
            style={{ borderRadius: '20px', background: '#0b0622' }}
          >
            {/* Imagem de fundo */}
            <img
              src={imgTrilha}
              alt="Trilha MyClass"
              className="absolute top-0 bottom-0 right-0 h-full w-full md:w-[82%] object-cover"
              style={{ objectPosition: '90% 74%' }}
            />

            {/* Overlay mobile: escurece tudo para legibilidade */}
            <div
              aria-hidden="true"
              className="absolute inset-0 md:hidden"
              style={{ background: 'rgba(12,8,38,0.78)', pointerEvents: 'none' }}
            />

            {/* Gradiente desktop: esq → dir */}
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden md:block"
              style={{
                background: 'linear-gradient(90deg, rgba(12,8,38,1) 0%, rgba(12,8,38,1) 20%, rgba(12,8,38,0.5) 35%, rgba(12,8,38,0.3) 55%, rgba(12,8,38,0.1) 68%, transparent 80%)',
                pointerEvents: 'none',
              }}
            />

            {/* Conteúdo de texto */}
            <div className="relative z-10 flex flex-col justify-center px-6 py-14 md:py-0 md:absolute md:inset-y-0 md:left-0 md:w-[42%] md:px-14">
              <div style={{ marginBottom: '16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 9l10 13L22 9z" stroke="#a78bfa" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M2 9h20" stroke="#a78bfa" strokeWidth="1.8" />
                </svg>
              </div>

              {/* Pill */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <span style={{
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
                  padding: '5px 14px', borderRadius: '999px',
                  border: '1px solid rgba(167,139,250,0.45)',
                  color: '#c4b5fd',
                }}>
                  TRILHA DE APRENDIZAGEM
                </span>
              </div>

              {/* Título */}
              <h2 className="text-4xl md:text-[3.4rem]" style={{ fontWeight: 900, lineHeight: 1.05, color: '#ffffff', marginBottom: '20px' }}>
                Aprender virou<br />
                <span style={{ color: '#a78bfa' }}>um jogo de verdade</span>
              </h2>

              {/* Descrição */}
              <p style={{
                fontSize: '1rem', color: 'rgba(255,255,255,0.60)',
                lineHeight: 1.75, marginBottom: '36px',
              }}>
                O MyClass agora conta com trilhas educacionais gamificadas, que transformam o aprendizado em uma experiência interativa e envolvente.
              </p>

              {/* CTA */}
              <div>
                <button
                  onClick={() => setTrilhaOpen(true)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/35 bg-transparent text-white text-[0.95rem] font-semibold cursor-pointer transition-all duration-200 hover:bg-white hover:text-gray-900"
                >
                  Explorar Trilhas
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </button>
              </div>
            </div>

            {/* Espaçador invisível para manter altura no desktop */}
            <div className="hidden md:block pointer-events-none" style={{ height: '538px' }} aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Lightbox — imagem da trilha */}
      {trilhaOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Imagem da Trilha de Aprendizagem"
          onClick={() => setTrilhaOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', maxWidth: '960px', width: '100%' }}
          >
            <img
              src={imgTrilha}
              alt="Trilha de Aprendizagem MyClass"
              style={{ width: '100%', borderRadius: '16px', display: 'block', boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}
            />
            <button
              onClick={() => setTrilhaOpen(false)}
              aria-label="Fechar"
              style={{
                position: 'absolute', top: '-14px', right: '-14px',
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)', padding: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════
          GESTÃO ESCOLAR COMPLETA
      ═══════════════════════════════ */}
      <section className="py-28" style={{ background: '#ffffff' }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Conteúdo */}
            <div>
              <Badge>{t('myclass_page.management_badge')}</Badge>
              <h2 className="reveal text-4xl lg:text-5xl font-black mb-6 leading-tight" style={{ color: '#111827' }}>
                {t('myclass_page.management_h2_1')}{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
                >
                  {t('myclass_page.management_h2_2')}
                </span>
              </h2>
              <p className="reveal text-base leading-relaxed mb-8" style={{ color: '#6b7280' }}>
                {t('myclass_page.management_desc')}
              </p>
              <ul className="space-y-4">
                {[
                  t('myclass_page.management_feat_1'),
                  t('myclass_page.management_feat_2'),
                  t('myclass_page.management_feat_3'),
                  t('myclass_page.management_feat_4'),
                  t('myclass_page.management_feat_5'),
                ].map((item) => (
                  <li key={item} className="reveal flex items-start gap-3">
                    <Check color="#7c3aed" />
                    <span className="text-base" style={{ color: '#4b5563' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div className="reveal relative">
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 20px 60px rgba(124,58,237,0.12), 0 4px 20px rgba(0,0,0,0.08)',
                }}
              >
                <img
                  src={img7Myclass}
                  alt="Gestão Escolar MyClass"
                  className="w-full h-auto block"
                />
              </div>
              {/* Decoração */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', top: '-24px', right: '-24px',
                  width: '180px', height: '180px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                  zIndex: -1,
                }}
              />
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════
          ANALYTICS & BI
      ═══════════════════════════════ */}
      <section className="py-28" style={{ background: '#f9fafb' }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual — imagem do dashboard à esquerda */}
            <div className="reveal relative order-last lg:order-first">
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 20px 60px rgba(59,130,246,0.12), 0 4px 20px rgba(0,0,0,0.08)',
                }}
              >
                <img
                  src={img8Myclass}
                  alt="Analytics e BI MyClass"
                  className="w-full h-auto block"
                />
              </div>
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', bottom: '-24px', left: '-24px',
                  width: '200px', height: '200px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)',
                  filter: 'blur(35px)',
                  zIndex: -1,
                }}
              />
            </div>

            {/* Conteúdo */}
            <div>
              <Badge>{t('myclass_page.analytics_badge')}</Badge>
              <h2 className="reveal text-4xl lg:text-5xl font-black mb-6 leading-tight" style={{ color: '#111827' }}>
                {t('myclass_page.analytics_h2_1')}{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
                >
                  {t('myclass_page.analytics_h2_2')}
                </span>
              </h2>
              <p className="reveal text-base leading-relaxed mb-8" style={{ color: '#6b7280' }}>
                {t('myclass_page.analytics_desc')}
              </p>
              <ul className="space-y-4">
                {[
                  { text: t('myclass_page.analytics_feat_1'), color: '#3b82f6' },
                  { text: t('myclass_page.analytics_feat_2'), color: '#7c3aed' },
                  { text: t('myclass_page.analytics_feat_3'), color: '#3b82f6' },
                  { text: t('myclass_page.analytics_feat_4'), color: '#7c3aed' },
                ].map(({ text, color }) => (
                  <li key={text} className="reveal flex items-start gap-3">
                    <Check color={color} />
                    <span className="text-base" style={{ color: '#4b5563' }}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════
          REALMS SAFE TASK
      ═══════════════════════════════ */}
      <section className="py-28" style={{ background: '#ffffff' }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Conteúdo */}
            <div>
              <Badge>REALMS SAFE TASK</Badge>
              <h2 className="reveal text-4xl lg:text-5xl font-black mb-6 leading-tight" style={{ color: '#111827' }}>
                Segurança para aplicação de{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
                >
                  avaliações
                </span>
              </h2>
              <p className="reveal text-base leading-relaxed mb-8" style={{ color: '#6b7280' }}>
                Controle de ambiente para garantir integridade em provas e atividades digitais. Redução de fraudes e padronização do processo avaliativo.
              </p>
              <ul className="space-y-4">
                {[
                  'Acesso às provas com token único e validade controlada',
                  'Bloqueio de tentativas não autorizadas e compartilhamento indevido',
                  'Rastreabilidade completa de início, envio e conclusão da avaliação',
                  'Padronização do processo avaliativo entre turmas e disciplinas',
                  'Mais segurança e confiabilidade nos resultados de aprendizagem',
                ].map((item) => (
                  <li key={item} className="reveal flex items-start gap-3">
                    <Check color="#7c3aed" />
                    <span className="text-base" style={{ color: '#4b5563' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div className="reveal relative">
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 20px 60px rgba(124,58,237,0.12), 0 4px 20px rgba(0,0,0,0.08)',
                  aspectRatio: '1205 / 727',
                }}
              >
                <img
                  src={imgProvaComToken}
                  alt="Realms Safe Task"
                  className="w-full block"
                  style={{ height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', top: '-24px', right: '-24px',
                  width: '180px', height: '180px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                  zIndex: -1,
                }}
              />
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════
          PLATAFORMAS
      ═══════════════════════════════ */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: '#f9fafb' }}
      >
        <Container>
          <div className="text-center mb-16">
            <Badge>{t('myclass_page.platforms_badge')}</Badge>
            <h2 className="reveal text-4xl lg:text-5xl font-black mb-4" style={{ color: '#111827' }}>
              {t('myclass_page.platforms_h2_1')}{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
              >
                {t('myclass_page.platforms_h2_2')}
              </span>
            </h2>
            <p className="reveal max-w-xl mx-auto leading-relaxed" style={{ color: '#6b7280' }}>
              {t('myclass_page.platforms_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dashboard */}
            <div
              className="reveal relative rounded-3xl overflow-hidden border group"
              style={{ background: '#ffffff', borderColor: '#e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={IMG.dashboard}
                  alt="Dashboard Web MyClass"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black mb-2" style={{ color: '#111827' }}>{t('myclass_page.platform_web_title')}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b7280' }}>
                  {t('myclass_page.platform_web_desc')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Chrome', 'Firefox', 'Safari', 'Edge'].map((d) => (
                    <span
                      key={d}
                      className="text-xs px-2.5 py-1 rounded-lg border"
                      style={{ background: '#f3f4f6', borderColor: '#e5e7eb', color: '#374151' }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Classes */}
            <div
              className="reveal relative rounded-3xl overflow-hidden border group"
              style={{ background: '#ffffff', borderColor: '#e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={IMG.liveClass}
                  alt="Aulas ao vivo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black mb-2" style={{ color: '#111827' }}>{t('myclass_page.platform_live_title')}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b7280' }}>
                  {t('myclass_page.platform_live_desc')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Vídeo HD', 'Quadro Branco', 'Gravação', 'Chat'].map((d) => (
                    <span
                      key={d}
                      className="text-xs px-2.5 py-1 rounded-lg border"
                      style={{ background: '#f3f4f6', borderColor: '#e5e7eb', color: '#374151' }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div
              className="reveal relative rounded-3xl overflow-hidden border group"
              style={{ background: '#ffffff', borderColor: '#e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={IMG.mobile}
                  alt="App Mobile MyClass"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black mb-2" style={{ color: '#111827' }}>{t('myclass_page.platform_mobile_title')}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b7280' }}>
                  {t('myclass_page.platform_mobile_desc')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['iOS', 'Android', 'Notificações', 'Offline'].map((d) => (
                    <span
                      key={d}
                      className="text-xs px-2.5 py-1 rounded-lg border"
                      style={{ background: '#f3f4f6', borderColor: '#e5e7eb', color: '#374151' }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════
          CTA FINAL
      ═══════════════════════════════ */}
      <section
        className="py-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 40%, #f0f9ff 100%)' }}
      >
        <Container className="relative z-10 text-center">
          <Badge>{t('myclass_page.cta_badge')}</Badge>
          <h2 className="reveal text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: '#111827' }}>
            {t('myclass_page.cta_h2_1')}{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #7c3aed, #a855f7, #3b82f6)' }}
            >
              {t('myclass_page.cta_h2_2')}
            </span>
          </h2>
          <p className="reveal text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: '#6b7280' }}>
            {t('myclass_page.cta_desc')}
          </p>
          <a
            href="/contato"
            className="reveal group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg border-2 transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              borderColor: '#7c3aed',
              color: '#7c3aed',
              background: 'transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#7c3aed'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#7c3aed'
            }}
          >
            {t('myclass_page.cta_button')}
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </a>
        </Container>
      </section>
    </div>
  )
}
