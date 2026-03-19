import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductsDropdown, { PRODUCTS } from '../navigation/ProductsDropdown'
import LanguageSwitcher from './LanguageSwitcher'
import Button from '../ui/Button'
import logoRealms from '../../assets/logo realms branca.svg'

const NAV_LINKS = [
  { key: 'about', path: '/sobre-nos' },
  { key: 'press', path: '/na-imprensa' },
]

export default function Header() {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
    ? 'bg-dark-900/90 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/40'
    : 'bg-dark-900/60 backdrop-blur-md border-white/[0.08]'

  return (
    <>
      {/* â”€â”€ Floating pill header â”€â”€ */}
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div
          className={`pointer-events-auto w-full max-w-5xl border rounded-full transition-all duration-500 ${pillBg}`}
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

      {/* â”€â”€ Mobile full-screen menu â”€â”€ */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-dark-900/98 backdrop-blur-xl flex flex-col pt-24 px-6 pb-10 overflow-y-auto"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col gap-1 flex-1">
            <Link
              to="/"
              onClick={closeMobile}
              className="text-2xl font-bold text-white py-3 border-b border-white/[0.06] hover:text-blue-400 transition-colors"
            >
              {t('nav.home')}
            </Link>

            {/* Products accordion */}
            <div className="border-b border-white/[0.06]">
              <button
                onClick={() => setMobileProductsOpen((v) => !v)}
                className="w-full flex items-center justify-between text-2xl font-bold text-white py-3 hover:text-blue-400 transition-colors"
              >
                {t('nav.products')}
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${mobileProductsOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileProductsOpen && (
                <div className="pb-3 space-y-1 pl-4">
                  {PRODUCTS.map((product) => (
                    <Link
                      key={product.key}
                      to={product.path}
                      onClick={closeMobile}
                      className="flex items-center gap-3 py-2.5 text-base text-white/60 hover:text-white transition-colors"
                    >
                      <span>{t(`products.${product.key}`)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {NAV_LINKS.map(({ key, path }) => (
              <Link
                key={key}
                to={path}
                onClick={closeMobile}
                className="text-2xl font-bold text-white py-3 border-b border-white/[0.06] hover:text-blue-400 transition-colors"
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </nav>

          {/* Bottom: language + CTA */}
          <div className="flex items-center gap-4 pt-8">
            <LanguageSwitcher />
            <Button to="/contato" size="lg" variant="white" onClick={closeMobile} className="flex-1">
              {t('nav.contact')}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
