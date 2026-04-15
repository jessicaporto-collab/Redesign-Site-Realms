import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PenLine, FileText, CheckSquare, Circle, Shuffle, CaseSensitive, ALargeSmall, SquareDashed, Paperclip } from 'lucide-react'
import Container from '../../components/ui/Container'
import AnimatedCounter from '../../components/ui/AnimatedCounter'
import img1Eduxgen from '../../assets/eduxgen/img1-eduxgen.jpg'
import img2Eduxgen from '../../assets/eduxgen/img2-eduxgen.jpg'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Feature cards metadata (marquee carousel)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const FEAT_META = [
  {
    id: 'f1', accent: '#2563eb', bg: '#eff6ff', tKey: 'feature_1',
    icon: (c) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
  },
  {
    id: 'f2', accent: '#0ea5e9', bg: '#f0f9ff', tKey: 'feature_2',
    icon: (c) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" />
      </svg>
    ),
  },
  {
    id: 'f3', accent: '#6366f1', bg: '#eef2ff', tKey: 'feature_3',
    icon: (c) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="12" y2="17" />
      </svg>
    ),
  },
  {
    id: 'f4', accent: '#16a34a', bg: '#f0fdf4', tKey: 'feature_4',
    icon: (c) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    id: 'f5', accent: '#f59e0b', bg: '#fffbeb', tKey: 'feature_5',
    icon: (c) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: 'f6', accent: '#2563eb', bg: '#eff6ff', tKey: 'feature_6',
    icon: (c) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
]

/* Scroll reveal ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => ob.observe(el))
    return () => ob.disconnect()
  }, [])
}

/* Check icon ─────────────────────────────────────────── */
function Check({ color = '#2563eb' }) {
  return (
    <div
      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
      style={{ background: `${color}18`, border: `1px solid ${color}50` }}
    >
      <svg className="w-3 h-3" style={{ color }} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  )
}

/* Animated blobs ─────────────────────────────────────── */
function AnimatedBlob({ style }) {
  const ref = useRef(null)
  const p = useRef({
    ax: 90 + Math.random() * 140, ay: 90 + Math.random() * 140,
    fx: 0.00025 + Math.random() * 0.0002, fy: 0.00025 + Math.random() * 0.0002,
    px: Math.random() * Math.PI * 2, py: Math.random() * Math.PI * 2,
    fsx: 0.00015 + Math.random() * 0.00012, fsy: 0.00013 + Math.random() * 0.0001,
    psx: Math.random() * Math.PI * 2, psy: Math.random() * Math.PI * 2,
  })
  useEffect(() => {
    let raf
    const tick = (t) => {
      if (!ref.current) return
      const { ax, ay, fx, fy, px, py, fsx, fsy, psx, psy } = p.current
      const x = ax * Math.sin(fx * t + px) + (ax * 0.4) * Math.sin(fx * 2.3 * t + px + 1.1)
      const y = ay * Math.sin(fy * t + py) + (ay * 0.4) * Math.sin(fy * 1.7 * t + py + 2.3)
      const sx = 1 + 0.12 * Math.sin(fsx * t + psx)
      const sy = 1 + 0.1 * Math.sin(fsy * t + psy)
      ref.current.style.transform = `translate(${x}px, ${y}px) scale(${sx}, ${sy})`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <div ref={ref} style={{ willChange: 'transform', ...style }} />
}

/* Section divider ─────────────────────────────────────── */
function SectionDivider() {
  return <div aria-hidden="true" style={{ height: 1, background: '#e2e8f0' }} />
}

/* Blue light badge ───────────────────────────────────── */
function Badge({ children, dark = false }) {
  const color = dark ? 'rgba(147,197,253,0.90)' : '#2563eb'
  const lineColor = dark ? 'rgba(147,197,253,0.6)' : '#2563eb'
  return (
    <p
      className="reveal flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] mb-4"
      style={{ color }}
    >
      <span className="w-8 h-px" style={{ background: lineColor }} />
      {children}
      <span className="w-8 h-px" style={{ background: lineColor }} />
    </p>
  )
}

/* Phone frame wrapper ────────────────────────────────── */
function PhoneFrame({ src, alt, className = '' }) {
  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{ width: '220px' }}
    >
      {/* Phone shell */}
      <div
        style={{
          borderRadius: '36px',
          border: '8px solid #1e293b',
          background: '#1e293b',
          boxShadow: '0 30px 60px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.06)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Notch */}
        <div style={{
          position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
          width: '70px', height: '18px', background: '#1e293b', borderRadius: '12px', zIndex: 2,
        }} />
        <img
          src={src} alt={alt}
          style={{ display: 'block', width: '100%', aspectRatio: '9/20', objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
    </div>
  )
}

/* Browser frame wrapper ──────────────────────────────── */
function BrowserFrame({ src, alt }) {
  return (
    <div
      className="reveal"
      style={{
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(37,99,235,0.10), 0 4px 20px rgba(0,0,0,0.07)',
      }}
    >
      {/* Chrome bar */}
      <div style={{ background: '#f1f5f9', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fca5a5' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fcd34d' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#86efac' }} />
        <div style={{ flex: 1, marginLeft: '8px', background: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb', flexShrink: 0 }} />
          <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>eduxgen.ai/dashboard</span>
        </div>
      </div>
      <img src={src} alt={alt} style={{ display: 'block', width: '100%' }} />
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO  — dark navy + blob + centered + YouTube embed
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HeroSection() {
  const { t } = useTranslation()

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden pt-32 pb-20"
      style={{ background: '#ffffff' }}
    >
      {/* Blue blobs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Textura granulada */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.6,
        }} />
        {/* Azul royal — top left */}
        <AnimatedBlob style={{ position: 'absolute', top: '-160px', left: '-180px', width: '900px', height: '900px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.30) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        {/* Ciano — top right */}
        <AnimatedBlob style={{ position: 'absolute', top: '-100px', right: '-140px', width: '760px', height: '760px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.26) 0%, transparent 70%)', filter: 'blur(55px)' }} />
        {/* Azul claro — top center */}
        <AnimatedBlob style={{ position: 'absolute', top: '-40px', left: '25%', width: '560px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.22) 0%, transparent 72%)', filter: 'blur(48px)' }} />
        {/* Índigo — centro esquerda */}
        <AnimatedBlob style={{ position: 'absolute', top: '32%', left: '2%', width: '580px', height: '580px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.24) 0%, transparent 70%)', filter: 'blur(52px)' }} />
        {/* Azul médio — centro direita */}
        <AnimatedBlob style={{ position: 'absolute', top: '22%', right: '4%', width: '620px', height: '620px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.20) 0%, transparent 70%)', filter: 'blur(55px)' }} />
        {/* Grid dots */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      <Container className="relative z-10 text-center">
        {/* Pill */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
          style={{ background: 'rgba(37,99,235,0.08)', borderColor: 'rgba(37,99,235,0.25)' }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#2563eb' }} />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#2563eb' }}>
            {t('eduxgen_page.hero_badge')} &middot; {t('eduxgen_page.hero_product')}
          </span>
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.92] tracking-tight mb-6"
          style={{ color: '#0f172a' }}
        >
          {t('eduxgen_page.hero_h1_1')}{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 50%, #6366f1 100%)' }}
          >
            {t('eduxgen_page.hero_h1_2')}
          </span>
          <br />
          {t('eduxgen_page.hero_h1_3')}
        </h1>

        <p className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: '#64748b' }}>
          {t('eduxgen_page.hero_desc')}
        </p>

        <a
          href="/contato"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ background: '#2563eb', color: '#ffffff', boxShadow: '0 0 32px rgba(37,99,235,0.45)' }}
          onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
          onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
        >
          {t('eduxgen_page.hero_cta_primary')}
        </a>

        {/* YouTube video embed */}
        <div className="mt-14 mx-auto" style={{ maxWidth: '780px' }}>
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(37,99,235,0.15)',
              boxShadow: '0 24px 64px rgba(37,99,235,0.12), 0 0 0 1px rgba(37,99,235,0.08)',
              aspectRatio: '16/9',
              background: '#e2e8f0',
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/EzRpdjtN-cs?autoplay=0&controls=0"
              title="EduXGen.AI — Demonstração"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex flex-wrap justify-center gap-10 mt-14 pt-10 border-t" style={{ borderColor: 'rgba(37,99,235,0.12)' }}>
          {[
            { value: t('eduxgen_page.hero_stat1_value'), label: t('eduxgen_page.hero_stat1_label') },
            { value: t('eduxgen_page.hero_stat2_value'), label: t('eduxgen_page.hero_stat2_label') },
            { value: t('eduxgen_page.hero_stat3_value'), label: t('eduxgen_page.hero_stat3_label') },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-extrabold" style={{ color: '#0f172a' }}>{value}</p>
              <p className="text-xs mt-1" style={{ color: '#64748b' }}>{label}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Bottom fade to white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #ffffff)' }}
      />
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   AVA — phone mockups + centered text (from PDF)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function AVASection() {
  const { t } = useTranslation()

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#ffffff' }}>

      {/* SVG turbulence smoke */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="smoke1" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.008" numOctaves="5" seed="2" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
            <feComponentTransfer in="grey" result="cloud">
              <feFuncA type="linear" slope="0.35" intercept="-0.1" />
            </feComponentTransfer>
            <feFlood floodColor="#3b82f6" result="color" />
            <feComposite in="color" in2="cloud" operator="in" />
          </filter>
          <filter id="smoke2" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.009 0.013" numOctaves="4" seed="8" result="noise2" />
            <feColorMatrix type="saturate" values="0" in="noise2" result="grey2" />
            <feComponentTransfer in="grey2" result="cloud2">
              <feFuncA type="linear" slope="0.25" intercept="-0.05" />
            </feComponentTransfer>
            <feFlood floodColor="#93c5fd" result="color2" />
            <feComposite in="color2" in2="cloud2" operator="in" />
          </filter>
          <filter id="smoke3" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.006" numOctaves="6" seed="14" result="noise3" />
            <feColorMatrix type="saturate" values="0" in="noise3" result="grey3" />
            <feComponentTransfer in="grey3" result="cloud3">
              <feFuncA type="linear" slope="0.2" intercept="-0.08" />
            </feComponentTransfer>
            <feFlood floodColor="#bfdbfe" result="color3" />
            <feComposite in="color3" in2="cloud3" operator="in" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#smoke1)" opacity="0.45" />
        <rect width="100%" height="100%" filter="url(#smoke2)" opacity="0.35" />
        <rect width="100%" height="100%" filter="url(#smoke3)" opacity="0.3" />
      </svg>

      <Container>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_1fr] gap-8 items-center">
          {/* Left phone */}
          <div className="reveal flex justify-center lg:justify-end">
            <PhoneFrame
              src={img2Eduxgen}
              alt="App AVA aluno 2"
            />
          </div>

          {/* Centre text */}
          <div className="text-center">
            <p className="reveal flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] mb-4" style={{ color: '#2563eb' }}>
              <span className="flex-1 h-px" style={{ background: '#2563eb', maxWidth: '50px' }} />
              {t('eduxgen_page.ava_badge')}
              <span className="flex-1 h-px" style={{ background: '#2563eb', maxWidth: '50px' }} />
            </p>
            <h2 className="reveal text-3xl lg:text-4xl font-black mb-5 leading-tight" style={{ color: '#0f172a' }}>
              {t('eduxgen_page.ava_h2_1')}{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #2563eb, #38bdf8)' }}>
                {t('eduxgen_page.ava_h2_2')}
              </span>
            </h2>
            <p className="reveal text-base leading-relaxed mb-8" style={{ color: '#64748b' }}>
              {t('eduxgen_page.ava_desc')}
            </p>
            <a
              href="/contato"
              className="reveal inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2 transition-all duration-300 hover:scale-105"
              style={{ borderColor: '#2563eb', color: '#2563eb', background: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2563eb' }}
            >
              Saiba mais
            </a>
          </div>

          {/* Right phone — slightly behind */}
          <div className="reveal flex justify-center lg:justify-start" style={{ marginTop: '40px' }}>
            <PhoneFrame
              src={img1Eduxgen}
              alt="App AVA aluno 1"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONTEÚDO — text right + UI screenshot left
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ContentSection() {
  const { t } = useTranslation()

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#ffffff' }}>
      {/* Blob decorativo */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <AnimatedBlob style={{ position: 'absolute', top: '-100px', right: '-200px', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        <AnimatedBlob style={{ position: 'absolute', bottom: '-80px', left: '-150px', width: '550px', height: '550px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.09) 0%, transparent 70%)', filter: 'blur(65px)' }} />
      </div>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: UI screenshot */}
          <div className="reveal order-last lg:order-first">
            <BrowserFrame
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80&fit=crop"
              alt="Geração de conteúdo EduXGen"
            />
          </div>

          {/* Right: text */}
          <div>
            <p className="reveal flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] mb-4" style={{ color: '#2563eb' }}>
              <span className="h-px w-8" style={{ background: '#2563eb' }} />
              {t('eduxgen_page.content_badge')}
            </p>
            <h2 className="reveal text-3xl lg:text-4xl font-black mb-6 leading-tight" style={{ color: '#0f172a' }}>
              {t('eduxgen_page.content_h2')}
            </h2>
            <p className="reveal text-base leading-relaxed mb-8" style={{ color: '#64748b' }}>
              {t('eduxgen_page.content_desc')}
            </p>
            <ul className="space-y-4">
              {[
                t('eduxgen_page.content_feat_1'),
                t('eduxgen_page.content_feat_2'),
                t('eduxgen_page.content_feat_3'),
                t('eduxgen_page.content_feat_4'),
              ].map((item) => (
                <li key={item} className="reveal flex items-start gap-3">
                  <Check color="#2563eb" />
                  <span className="text-base" style={{ color: '#374151' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TAREFAS — text left + UI screenshot right
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function TasksSection() {
  const { t } = useTranslation()

  const TASKS = [
    { icon: PenLine, label: t('eduxgen_page.tasks_item_1') },
    { icon: FileText, label: t('eduxgen_page.tasks_item_2') },
    { icon: CheckSquare, label: t('eduxgen_page.tasks_item_3') },
    { icon: Circle, label: t('eduxgen_page.tasks_item_4') },
    { icon: Shuffle, label: t('eduxgen_page.tasks_item_5') },
    { icon: CaseSensitive, label: t('eduxgen_page.tasks_item_6') },
    { icon: ALargeSmall, label: t('eduxgen_page.tasks_item_7') },
    { icon: SquareDashed, label: t('eduxgen_page.tasks_item_8') },
    { icon: Paperclip, label: t('eduxgen_page.tasks_item_9') },
  ]

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#f8fafc' }}>
      {/* Blob decorativo */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <AnimatedBlob style={{ position: 'absolute', top: '-80px', left: '-180px', width: '650px', height: '650px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)', filter: 'blur(65px)' }} />
        <AnimatedBlob style={{ position: 'absolute', bottom: '-60px', right: '-120px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.11) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <p className="reveal flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] mb-4" style={{ color: '#2563eb' }}>
              <span className="h-px w-8" style={{ background: '#2563eb' }} />
              {t('eduxgen_page.tasks_badge')}
            </p>
            <h2 className="reveal text-3xl lg:text-4xl font-black mb-4 leading-tight" style={{ color: '#0f172a' }}>
              {t('eduxgen_page.tasks_h2')}
            </h2>
            <p className="reveal text-base mb-8" style={{ color: '#64748b' }}>
              {t('eduxgen_page.tasks_desc')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TASKS.map((task) => (
                <div
                  key={task.label}
                  className="reveal flex items-center gap-3 rounded-xl p-4 border"
                  style={{ background: '#ffffff', borderColor: '#e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  <task.icon size={20} strokeWidth={1.6} style={{ color: '#2563eb', flexShrink: 0 }} />
                  <span className="text-sm font-medium" style={{ color: '#374151' }}>{task.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: UI screenshot */}
          <div className="reveal">
            <BrowserFrame
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&fit=crop"
              alt="Tarefas EduXGen"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DASHBOARD — centered title + full-width browser mockup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function DashboardSection() {
  const { t } = useTranslation()

  return (
    <section className="py-24" style={{ background: '#ffffff' }}>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge>{t('eduxgen_page.dashboard_badge')}</Badge>
          <h2 className="reveal text-3xl lg:text-4xl font-black mb-4" style={{ color: '#0f172a' }}>
            {t('eduxgen_page.dashboard_h2')}
          </h2>
          <p className="reveal text-base leading-relaxed" style={{ color: '#64748b' }}>
            {t('eduxgen_page.dashboard_desc')}
          </p>
        </div>

        {/* Extra-wide browser mockup */}
        <div
          className="reveal"
          style={{
            borderRadius: '14px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(37,99,235,0.10), 0 4px 24px rgba(0,0,0,0.08)',
          }}
        >
          {/* Chrome */}
          <div style={{ background: '#f1f5f9', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#fca5a5' }} />
            <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#fcd34d' }} />
            <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#86efac' }} />
            <div style={{ flex: 1, marginLeft: '10px', background: '#ffffff', borderRadius: '7px', border: '1px solid #e2e8f0', padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '280px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '11px', height: '11px', flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>eduxgen.ai/dashboard</span>
            </div>
            {/* Nav pill */}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
              {['Início', 'Turmas', 'Conteúdo', 'Análises'].map((item) => (
                <span key={item} style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '6px', background: item === 'Conteúdo' ? '#dbeafe' : 'transparent', color: item === 'Conteúdo' ? '#2563eb' : '#64748b', fontWeight: item === 'Conteúdo' ? 600 : 400 }}>{item}</span>
              ))}
            </div>
          </div>

          {/* Dashboard body — gradient placeholder with inline UI sketch */}
          <div style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 50%, #eef2ff 100%)', padding: '32px', minHeight: '360px', position: 'relative', overflow: 'hidden' }}>
            {/* Sidebar */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '180px', background: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '20px 14px' }}>
              <div style={{ width: '100px', height: '12px', borderRadius: '6px', background: '#dbeafe', marginBottom: '24px' }} />
              {['Dashboard', 'Turmas', 'Conteúdo', 'Avaliações', 'Análises'].map((item, i) => (
                <div key={item} style={{ padding: '8px 10px', borderRadius: '8px', background: i === 0 ? '#eff6ff' : 'transparent', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: i === 0 ? '#2563eb' : '#cbd5e1' }} />
                  <span style={{ fontSize: '11px', color: i === 0 ? '#2563eb' : '#64748b', fontWeight: i === 0 ? 700 : 400 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Main content area */}
            <div style={{ marginLeft: '196px' }}>
              {/* Top stat row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '20px' }}>
                {[
                  { label: 'Conteúdos gerados', value: '248', color: '#2563eb' },
                  { label: 'Turmas ativas', value: '12', color: '#0ea5e9' },
                  { label: 'Alunos', value: '380', color: '#6366f1' },
                  { label: 'Tempo economizado', value: '96h', color: '#16a34a' },
                ].map((s) => (
                  <div key={s.label} style={{ background: '#ffffff', borderRadius: '10px', padding: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Table area */}
              <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>Últimos conteúdos gerados</span>
                  <span style={{ fontSize: '10px', color: '#2563eb', fontWeight: 600 }}>Ver todos</span>
                </div>
                {[
                  { title: 'Plano de Aula — Frações 5º Ano', type: 'Plano', date: 'Hoje', status: '#22c55e' },
                  { title: 'Simulado ENEM — Matemática', type: 'Simulado', date: 'Ontem', status: '#2563eb' },
                  { title: 'Banco Questões — Ciências 6º Ano', type: 'Questões', date: '12 abr', status: '#f59e0b' },
                  { title: 'Avaliação Diagnóstica — Língua Portuguesa', type: 'Avaliação', date: '10 abr', status: '#6366f1' },
                ].map((row) => (
                  <div key={row.title} style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.status, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: '11px', color: '#374151' }}>{row.title}</span>
                    <span style={{ fontSize: '10px', color: '#94a3b8', width: '60px', textAlign: 'center', padding: '2px 8px', borderRadius: '4px', background: '#f8fafc' }}>{row.type}</span>
                    <span style={{ fontSize: '10px', color: '#94a3b8', width: '48px', textAlign: 'right' }}>{row.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   VANTAGENS — icon grid (from PDF)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ADV_ICONS = [
  (c) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  (c) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  (c) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M12 2L2 9l10 13L22 9z" /><path d="M2 9h20" />
    </svg>
  ),
  (c) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
]

function VantagensSection() {
  const { t } = useTranslation()

  const ADVS = [
    { title: t('eduxgen_page.adv_1_title'), sub: t('eduxgen_page.adv_1_sub'), desc: t('eduxgen_page.adv_1_desc'), accent: '#2563eb', bg: '#eff6ff' },
    { title: t('eduxgen_page.adv_2_title'), sub: t('eduxgen_page.adv_2_sub'), desc: t('eduxgen_page.adv_2_desc'), accent: '#0ea5e9', bg: '#f0f9ff' },
    { title: t('eduxgen_page.adv_3_title'), sub: t('eduxgen_page.adv_3_sub'), desc: t('eduxgen_page.adv_3_desc'), accent: '#6366f1', bg: '#eef2ff' },
    { title: t('eduxgen_page.adv_4_title'), sub: t('eduxgen_page.adv_4_sub'), desc: t('eduxgen_page.adv_4_desc'), accent: '#16a34a', bg: '#f0fdf4' },
  ]

  return (
    <section className="py-24" style={{ background: '#f8fafc' }}>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge>{t('eduxgen_page.adv_badge')}</Badge>
          <h2 className="reveal text-3xl lg:text-4xl font-black mb-3" style={{ color: '#0f172a' }}>
            {t('eduxgen_page.adv_h2')}
          </h2>
          <p className="reveal text-base" style={{ color: '#64748b' }}>
            {t('eduxgen_page.adv_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ADVS.map((adv, i) => (
            <div
              key={adv.title}
              className={`reveal delay-${i + 1} rounded-3xl p-7 border text-center hover:-translate-y-2 transition-all duration-300`}
              style={{ background: '#ffffff', borderColor: '#e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: adv.bg, border: `1px solid ${adv.accent}25` }}
              >
                {ADV_ICONS[i](adv.accent)}
              </div>
              <h3 className="font-bold text-base mb-1" style={{ color: '#0f172a' }}>{adv.title}</h3>
              <p className="text-xs font-semibold mb-2" style={{ color: adv.accent }}>{adv.sub}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{adv.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FEATURES MARQUEE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FeaturesMarqueeSection() {
  const { t } = useTranslation()

  return (
    <section className="py-14 overflow-hidden" style={{ background: '#ffffff' }}>
      <Container>
        <div className="text-center mb-10">
          <Badge>{t('eduxgen_page.features_badge')}</Badge>
          <h2 className="reveal text-3xl lg:text-4xl font-black mb-3" style={{ color: '#0f172a' }}>
            {t('eduxgen_page.features_h2_1')}{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #2563eb, #0ea5e9)' }}>
              {t('eduxgen_page.features_h2_2')}
            </span>
          </h2>
        </div>
      </Container>

      <div
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0px, black 100px, black calc(100% - 100px), transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0px, black 100px, black calc(100% - 100px), transparent 100%)',
          overflow: 'hidden',
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
              style={{ width: '260px', background: '#ffffff', borderColor: '#e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: feat.bg, border: `1px solid ${feat.accent}25` }}>
                {feat.icon(feat.accent)}
              </div>
              <h4 className="font-bold mb-2 text-sm leading-snug" style={{ color: '#0f172a' }}>
                {t(`eduxgen_page.${feat.tKey}_title`)}
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>
                {t(`eduxgen_page.${feat.tKey}_desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STATS (light)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function StatsSection() {
  const { t } = useTranslation()
  const STATS = [
    { to: 2, prefix: '+', suffix: 'M', label: t('eduxgen_page.stat_1_label') },
    { to: 50, prefix: '+', suffix: 'K', label: t('eduxgen_page.stat_2_label') },
    { to: 98, suffix: '%', label: t('eduxgen_page.stat_3_label') },
    { to: 120, prefix: '+', suffix: '', label: t('eduxgen_page.stat_4_label') },
    { to: 3, prefix: '+', suffix: '', label: t('eduxgen_page.stat_5_label') },
    { to: 5, suffix: 's', label: t('eduxgen_page.stat_6_label') },
  ]
  return (
    <section className="py-24" style={{ background: '#eff6ff' }}>
      <Container>
        <div className="text-center mb-14">
          <Badge>{t('eduxgen_page.stats_badge')}</Badge>
          <h2 className="reveal text-3xl lg:text-4xl font-black" style={{ color: '#0f172a' }}>
            {t('eduxgen_page.stats_h2')}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`reveal delay-${Math.min(i + 1, 6)} rounded-2xl p-8 border text-center hover:-translate-y-1 transition-all duration-300`}
              style={{ background: '#ffffff', borderColor: '#bfdbfe', boxShadow: '0 2px 12px rgba(37,99,235,0.06)' }}
            >
              <div className="text-3xl lg:text-4xl font-extrabold mb-2 tabular-nums leading-none" style={{ color: '#2563eb' }}>
                <AnimatedCounter to={stat.to} prefix={stat.prefix} suffix={stat.suffix} duration={2000} />
              </div>
              <p className="text-xs sm:text-sm leading-snug" style={{ color: '#64748b' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DEPOIMENTOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function TestimonialsSection() {
  const { t } = useTranslation()
  const TESTIMONIALS = [
    { quote: t('eduxgen_page.testimonial_1_quote'), author: 'Prof. Carlos Mendes', role: t('eduxgen_page.testimonial_1_role'), org: 'Rede Municipal RJ', initials: 'CM', accent: '#2563eb' },
    { quote: t('eduxgen_page.testimonial_2_quote'), author: 'Profa. Ana Beatriz', role: t('eduxgen_page.testimonial_2_role'), org: 'Colégio Estadual MG', initials: 'AB', accent: '#0ea5e9' },
    { quote: t('eduxgen_page.testimonial_3_quote'), author: 'Marcos Oliveira', role: t('eduxgen_page.testimonial_3_role'), org: 'Secretaria de Educação SP', initials: 'MO', accent: '#6366f1' },
  ]
  return (
    <section className="py-20 lg:py-24" style={{ background: '#f8fafc' }}>
      <Container>
        <div className="text-center mb-12">
          <Badge>{t('eduxgen_page.testimonials_badge')}</Badge>
          <h2 className="reveal text-3xl lg:text-4xl font-black" style={{ color: '#0f172a' }}>
            {t('eduxgen_page.testimonials_h2')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((item, i) => (
            <article
              key={item.author}
              className={`reveal delay-${i + 2} rounded-3xl p-7 border hover:-translate-y-1 transition-all duration-300`}
              style={{ background: '#ffffff', borderColor: '#e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
            >
              <div className="flex gap-1 mb-5" aria-label="5 de 5 estrelas">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={`star-${item.author}-${s}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed mb-6" style={{ color: '#64748b' }}>
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: item.accent }} aria-hidden="true">
                  {item.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>{item.author}</p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>{item.role} &middot; {item.org}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CTA FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CTASection() {
  const { t } = useTranslation()
  return (
    <section
      className="py-32 relative overflow-hidden"
      style={{ background: '#f8fafc' }}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Textura granulada */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.5,
        }} />
        <AnimatedBlob style={{ position: 'absolute', top: '-160px', left: '-180px', width: '900px', height: '900px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.26) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <AnimatedBlob style={{ position: 'absolute', top: '-100px', right: '-140px', width: '750px', height: '750px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.22) 0%, transparent 70%)', filter: 'blur(55px)' }} />
        <AnimatedBlob style={{ position: 'absolute', top: '30%', left: '20%', width: '600px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 72%)', filter: 'blur(50px)' }} />
        <AnimatedBlob style={{ position: 'absolute', bottom: '-80px', right: '30%', width: '500px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 72%)', filter: 'blur(48px)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>
      <Container className="relative z-10 text-center">
        <Badge>{t('eduxgen_page.cta_badge')}</Badge>
        <h2 className="reveal text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: '#0f172a' }}>
          {t('eduxgen_page.cta_h2_1')}{' '}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #2563eb, #0ea5e9, #6366f1)' }}>
            {t('eduxgen_page.cta_h2_2')}
          </span>
        </h2>
        <p className="reveal text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: '#64748b' }}>
          {t('eduxgen_page.cta_desc')}
        </p>
        <a
          href="/contato"
          className="reveal inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg border-2 transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ borderColor: '#2563eb', color: '#2563eb', background: 'transparent' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2563eb' }}
        >
          {t('eduxgen_page.cta_primary')}
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </Container>
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function EduXGen() {
  useReveal()
  return (
    <div style={{ background: '#f8fafc', color: '#0f172a', position: 'relative' }}>
      <HeroSection />
      <AVASection />
      <SectionDivider />
      <ContentSection />
      <SectionDivider />
      <TasksSection />
      <SectionDivider />
      <DashboardSection />
      <SectionDivider />
      <VantagensSection />
      <FeaturesMarqueeSection />
      <SectionDivider />
      <StatsSection />
      <SectionDivider />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
