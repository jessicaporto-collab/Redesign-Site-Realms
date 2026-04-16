import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Container from '../../../components/ui/Container'
import personaBg from '../../../assets/home/Persona.png'
import eduxgenBg from '../../../assets/home/EduxGenAi.png'
import myclassBg from '../../../assets/home/myclass.png'
import eduxrealmsBg from '../../../assets/home/eduxrealms.png'
import iptvBg from '../../../assets/home/iptv.png'
import conteudoBg from '../../../assets/home/conteudoeducacional.png'

const PRODUCTS = [
  {
    key: 'eduxgen',
    path: '/eduxgen',
    gradientFrom: '#2e1065',
    gradientTo: '#7c3aed',
    gridColor: 'rgba(124,58,237,0.15)',
    accent: '#a78bfa',
    symbol: '✦',
    bgImage: eduxgenBg,
    bgPosition: '35% center',
  },
  {
    key: 'myclass',
    path: '/myclass',
    gradientFrom: '#1e3a5f',
    gradientTo: '#2563eb',
    gridColor: 'rgba(59,130,246,0.15)',
    accent: '#60a5fa',
    symbol: '◈',
    bgImage: myclassBg,
    bgPosition: 'center +80%',
  },
  {
    key: 'personas',
    path: '/realms-personas',
    gradientFrom: '#052e16',
    gradientTo: '#059669',
    gridColor: 'rgba(5,150,105,0.12)',
    accent: '#34d399',
    symbol: '◉',
    bgImage: personaBg,
    bgPosition: 'center',
  },
  {
    key: 'eduxrealms',
    path: '/eduxrealms',
    gradientFrom: '#431407',
    gradientTo: '#ea580c',
    gridColor: 'rgba(234,88,12,0.12)',
    accent: '#fb923c',
    symbol: '◎',
    bgImage: eduxrealmsBg,
    bgPosition: 'center',
    bgScale: 1.18,
  },
  {
    key: 'iptv',
    path: '/iptv-conteudo',
    gradientFrom: '#4c0519',
    gradientTo: '#e11d48',
    gridColor: 'rgba(225,29,72,0.12)',
    accent: '#fb7185',
    symbol: '◐',
    bgImage: iptvBg,
    bgPosition: 'center',
  },
  {
    key: 'conteudo',
    path: '/iptv-conteudo',
    gradientFrom: '#451a03',
    gradientTo: '#d97706',
    gridColor: 'rgba(217,119,6,0.12)',
    accent: '#fbbf24',
    symbol: '◑',
    bgImage: conteudoBg,
    bgPosition: 'center',
    bgScale: 1,
    bgSize: '110%',
  },
]

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

export default function ProductsSection() {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const intervalRef = useRef(null)
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  const next = useCallback(() => setActive((v) => (v + 1) % PRODUCTS.length), [])
  const prev = useCallback(() => setActive((v) => (v - 1 + PRODUCTS.length) % PRODUCTS.length), [])

  const resetInterval = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(next, 5000)
  }, [next])

  useEffect(() => {
    resetInterval()
    return () => clearInterval(intervalRef.current)
  }, [resetInterval])

  const handleNav = (fn) => {
    fn()
    resetInterval()
  }

  const current = PRODUCTS[active]

  return (
    <section id="products" className="bg-[#0a0a0a] py-20 lg:py-28">
      <Container>
        <div ref={sectionRef}>
          {/* ── Header ── */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <span className="reveal section-badge mb-4 block">
                <span className="w-5 h-px bg-current" aria-hidden="true" />
                {t('products.badge')}
              </span>
              <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-xl tracking-tight">
                {t('products.heading')}
              </h2>
            </div>
            <p className="reveal delay-3 text-sm text-white/35 max-w-xs leading-relaxed font-light flex-shrink-0 pb-1">
              {t('products.sub')}
            </p>
          </div>

          {/* ── Showcase carousel ── */}
          <div className="reveal delay-2 relative rounded-3xl overflow-hidden" style={{ minHeight: '560px' }}>
            {PRODUCTS.map((product, i) => (
              <div
                key={product.key}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
                aria-hidden={i !== active}
              >
                {/* Background: image or gradient */}
                <div
                  className="absolute inset-0"
                  style={
                    product.bgImage
                      ? {
                          backgroundImage: `url(${product.bgImage})`,
                          backgroundSize: product.bgSize ?? 'cover',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: product.bgPosition ?? 'center',
                          transform: `scale(${product.bgScale ?? 1.08})`,
                          transformOrigin: 'center',
                        }
                      : {
                          background: `linear-gradient(135deg, ${product.gradientFrom} 0%, ${product.gradientTo} 100%)`,
                        }
                  }
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/45" />
                {/* Grid pattern — not shown when card uses an image background */}
                {!product.bgImage && (
                  <div
                    className="absolute inset-0 opacity-100"
                    style={{
                      backgroundImage: `linear-gradient(${product.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${product.gridColor} 1px, transparent 1px)`,
                      backgroundSize: '52px 52px',
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Giant number — not shown when card uses an image background */}
                {!product.bgImage && (
                  <span
                    className="absolute top-6 right-8 text-[160px] lg:text-[200px] font-black leading-none select-none tabular-nums"
                    style={{ color: `${product.accent}08` }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end h-full p-8 lg:p-12 min-h-[560px]">
                  {/* Symbol */}
                  <span
                    className="text-2xl mb-5 font-bold"
                    style={{ color: product.accent }}
                    aria-hidden="true"
                  >
                    {product.symbol}
                  </span>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['tag1', 'tag2'].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full border"
                        style={{
                          color: product.accent,
                          borderColor: `${product.accent}35`,
                          background: `${product.accent}12`,
                        }}
                      >
                        {t(`products.${product.key}_${tag}`)}
                      </span>
                    ))}
                  </div>

                  {/* Name */}
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight tracking-tight">
                    {t(`products.${product.key}_name`)}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-white/50 max-w-lg mb-8 leading-relaxed font-light">
                    {t(`products.${product.key}_desc`)}
                  </p>

                  {/* CTA + dots */}
                  <div className="flex items-center gap-8 flex-wrap">
                    <Link
                      to={product.path}
                      className="inline-flex items-center gap-2 text-white text-sm font-semibold border border-white/25 rounded-full px-6 py-3 hover:bg-white hover:text-gray-900 transition-all duration-200 min-h-[44px]"
                    >
                      {t('products.cta')}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>

                    {/* Progress dots */}
                    <div className="flex gap-2" role="tablist" aria-label="Products carousel">
                      {PRODUCTS.map((_, di) => (
                        <button
                          key={di}
                          role="tab"
                          aria-selected={di === active}
                          onClick={() => handleNav(() => setActive(di))}
                          className={`rounded-full transition-all duration-300 min-w-[12px] min-h-[12px] ${
                            di === active ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/55'
                          }`}
                          aria-label={`Produto ${di + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Prev / Next */}
            <button
              onClick={() => handleNav(prev)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/70 transition-all min-w-[40px]"
              aria-label="Produto anterior"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleNav(next)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/70 transition-all min-w-[40px]"
              aria-label="Próximo produto"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
