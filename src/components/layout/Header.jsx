import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductsDropdown, { PRODUCTS } from '../navigation/ProductsDropdown'
import LanguageSwitcher from './LanguageSwitcher'
import Button from '../ui/Button'
import Container from '../ui/Container'
import logoRealms from '../../assets/logo realms azul.svg'

const NAV_LINKS = [
  { key: 'about', path: '/sobre-nos' },
  { key: 'press', path: '/na-imprensa' },
  { key: 'contact', path: '/contato' },
]

export default function Header() {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const closeMobile = () => {
    setMobileOpen(false)
    setMobileProductsOpen(false)
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <Container>
        {/* Desktop + mobile top row */}
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ── */}
          <Link to="/" onClick={closeMobile} className="flex items-center flex-shrink-0">
            <img src={logoRealms} alt="Realms" className="h-10 w-auto" />
          </Link>

          {/* ── Desktop Nav (centered) ── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
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
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`
                }
              >
                {t(`nav.${key}`)}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop Right Actions ── */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Button to="/contato" size="sm" variant="primary">
              {t('nav.login')}
            </Button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
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

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <nav
            className="lg:hidden border-t border-gray-100 py-3 space-y-0.5"
            aria-label="Mobile navigation"
          >
            <Link
              to="/"
              onClick={closeMobile}
              className="block px-4 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              {t('nav.home')}
            </Link>

            {/* Mobile Products accordion */}
            <div>
              <button
                onClick={() => setMobileProductsOpen((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {t('nav.products')}
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    mobileProductsOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileProductsOpen && (
                <div className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-gray-100 pl-3">
                  {PRODUCTS.map((product) => (
                    <Link
                      key={product.key}
                      to={product.path}
                      onClick={closeMobile}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg">{product.icon}</span>
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
                className="block px-4 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {t(`nav.${key}`)}
              </Link>
            ))}

            {/* Mobile bottom actions */}
            <div className="flex items-center gap-3 px-4 pt-3 pb-1 border-t border-gray-100 mt-2">
              <LanguageSwitcher />
              <Button to="/contato" size="sm" variant="primary" onClick={closeMobile}>
                {t('nav.login')}
              </Button>
            </div>
          </nav>
        )}
      </Container>
    </header>
  )
}
