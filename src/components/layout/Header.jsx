import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductsDropdown, { PRODUCTS } from '../navigation/ProductsDropdown'
import LanguageSwitcher from './LanguageSwitcher'
import Button from '../ui/Button'
import logoRealms from '../../assets/logo realms branca.svg'

const NAV_LINKS = [
  { key: 'about', path: '/sobre-nos' },
  { key: 'press', path: '/na-imprensa' },
]

const LIGHT_PAGES = new Set(['/eduxgen', '/myclass', '/conteudo-educacional'])

export default function Header() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isLightPage = LIGHT_PAGES.has(pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = () => {
    setMobileOpen(false)
    setMobileProductsOpen(false)
  }

  const pillBg = scrolled
    ? 'bg-dark-900/90 backdrop-blur-xl border-white/10'
    : 'bg-dark-900/60 backdrop-blur-md border-white/[0.08]'

  const pillShadow = scrolled
    ? '-20px 0 35px rgba(99,102,241,0.4), 20px 0 35px rgba(168,85,247,0.4), 0 8px 24px rgba(0,0,0,0.7)'
    : '-12px 0 28px rgba(99,102,241,0.25), 12px 0 28px rgba(168,85,247,0.25), 0 6px 18px rgba(0,0,0,0.55)'

  return (
    <>
      {/* ── Floating pill header ── */}
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div
          className={`pointer-events-auto w-full max-w-5xl border rounded-full transition-all duration-500 ${pillBg}`}
          style={{ boxShadow: pillShadow }}
          role="banner"
        >
          <div className="flex items-center justify-between h-14 px-5">

            {/* Logo */}
            <Link to="/" onClick={closeMobile} className="flex items-center flex-shrink-0">
              <img src={logoRealms} alt="Realms" className="h-8 w-auto" />
            </Link>

            {/* Desktop nav â€” centered */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/[0.07]'
                  }`
                }
              >
                {t('nav.home')}
              </NavLink>

              <ProductsDropdown />

              {NAV_LINKS.map(({ key, path }) => (
                <NavLink
                  key={key}
                  to={path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/[0.07]'
                    }`
                  }
                >
                  {t(`nav.${key}`)}
                </NavLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
              <Button to="/contato" size="sm" variant="white">
                {t('nav.contact')}
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>


      {/* Mobile full-screen menu – always mounted for smooth animation */}
      <div
        className={`fixed inset-0 z-40 bg-dark-900/98 backdrop-blur-xl flex flex-col pt-24 px-6 pb-10 overflow-y-auto
          transition-[opacity,transform] duration-300 ease-out
          ${mobileOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
          }`}
        style={{ willChange: 'opacity, transform' }}
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        onClick={closeMobile}
      >
        <nav className="flex flex-col gap-1 flex-1">
          <Link
            to="/"
            onClick={closeMobile}
            style={{ transitionDelay: mobileOpen ? '40ms' : '0ms', willChange: 'opacity, transform' }}
            className={`text-2xl font-bold py-3 border-b transition-[opacity,transform] duration-250
              ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
              ${isLightPage
                ? 'text-gray-900 border-gray-900/10 hover:text-blue-600'
                : 'text-white border-white/[0.06] hover:text-blue-400'
              }`}
          >
            {t('nav.home')}
          </Link>

          {/* Products accordion */}
          <div
            style={{ transitionDelay: mobileOpen ? '80ms' : '0ms', willChange: 'opacity, transform' }}
            className={`border-b transition-[opacity,transform] duration-250
              ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
              ${isLightPage ? 'border-gray-900/10' : 'border-white/[0.06]'}`}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setMobileProductsOpen((v) => !v); }}
              className={`w-full flex items-center justify-between text-2xl font-bold py-3 transition-colors ${
                isLightPage
                  ? 'text-gray-900 hover:text-blue-600'
                  : 'text-white hover:text-blue-400'
              }`}
            >
              {t('nav.products')}
              <svg
                className={`w-5 h-5 transition-transform duration-300 ease-in-out ${mobileProductsOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Products list – grid-rows for smooth height transition */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                mobileProductsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden min-h-0">
                <div className="pb-3 space-y-1 pl-4">
                  {PRODUCTS.map((product, i) => (
                    <Link
                      key={product.key}
                      to={product.path}
                      onClick={closeMobile}
                      style={{ transitionDelay: mobileProductsOpen ? `${i * 35}ms` : '0ms', willChange: 'opacity, transform' }}
                      className={`flex items-center gap-3 py-2.5 text-base transition-[opacity,transform] duration-200
                        ${mobileProductsOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                        ${isLightPage
                          ? 'text-gray-700 hover:text-gray-900'
                          : 'text-white/60 hover:text-white'
                        }`}
                    >
                      <span>{t(`products.${product.key}`)}</span>
                    </Link>
                  ))}
                  <a
                    href="https://vocaciona.ai/#como-funciona"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobile}
                    style={{ transitionDelay: mobileProductsOpen ? `${PRODUCTS.length * 35}ms` : '0ms', willChange: 'opacity, transform' }}
                    className={`flex items-center gap-3 py-2.5 text-base transition-[opacity,transform] duration-200
                      ${mobileProductsOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                      ${isLightPage
                        ? 'text-gray-700 hover:text-gray-900'
                        : 'text-white/60 hover:text-white'
                      }`}
                  >
                    <span>Vocaciona.AI</span>
                    <svg className="w-3.5 h-3.5 ml-auto opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {NAV_LINKS.map(({ key, path }, i) => (
            <Link
              key={key}
              to={path}
              onClick={closeMobile}
              style={{ transitionDelay: mobileOpen ? `${120 + i * 40}ms` : '0ms', willChange: 'opacity, transform' }}
              className={`text-2xl font-bold py-3 border-b transition-[opacity,transform] duration-250
                ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
                ${isLightPage
                  ? 'text-gray-900 border-gray-900/10 hover:text-blue-600'
                  : 'text-white border-white/[0.06] hover:text-blue-400'
                }`}
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
        </nav>

        {/* Bottom: language + CTA */}
        <div
          style={{ transitionDelay: mobileOpen ? '190ms' : '0ms', willChange: 'opacity, transform' }}
          className={`flex items-center gap-4 pt-8 transition-[opacity,transform] duration-250
            ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
        >
          <LanguageSwitcher dropUp />
          <Button to="/contato" size="lg" variant="white" onClick={closeMobile} className="flex-1">
            {t('nav.contact')}
          </Button>
        </div>
      </div>
    </>
  )
}
