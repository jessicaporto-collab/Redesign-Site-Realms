import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../../components/ui/Button'
import heroVideo from '../assets/EduxGenAI_Marketing.mp4'

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/realms',
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/realms.edtech',
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/realms_edtech',
    icon: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
]

export default function HeroSection() {
  const { t } = useTranslation()
  const contentRef = useRef(null)

  // Entrance animation — runs once on mount
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
      id="hero"
      className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center"
      aria-label="Hero"
    >
      {/* ── Background video ── */}
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

      {/* ── Overlays ── */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/65 to-black/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/75 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <div
        ref={contentRef}
        className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8 pt-24"
      >
        <div className="max-w-4xl">
          {/* Tagline */}
          <p className="hero-item flex items-center gap-3 text-white/45 text-[11px] font-semibold uppercase tracking-[0.25em] mb-7">
            <span className="w-8 h-px bg-white/35" aria-hidden="true" />
            {t('hero.tagline')}
          </p>

          {/* Heading */}
          <h1 className="hero-item text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.9] tracking-tight mb-6">
            {t('hero.line1')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400">
              {t('hero.line2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-item text-base sm:text-lg text-white/50 max-w-lg mb-10 leading-relaxed font-light">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="hero-item flex flex-wrap gap-4">
            <Button to="/contato" size="lg" variant="white">
              {t('hero.cta_contact')}
            </Button>
            <Button to="#products" size="lg" variant="outline-white">
              {t('hero.cta_products')}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Social links — left side ── */}
      <div className="absolute bottom-10 left-4 sm:left-8 z-10 flex flex-col gap-3">
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-200"
          >
            <svg className="w-4 h-4 text-white/50 hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {s.icon}
            </svg>
          </a>
        ))}
      </div>

      {/* ── Scroll indicator — bottom center ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2">
        <span className="text-[9px] text-white/25 tracking-[0.3em] uppercase font-medium">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" aria-hidden="true" />
      </div>
    </section>
  )
}
