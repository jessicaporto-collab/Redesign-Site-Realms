import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import logoRealmsWhite from '../../assets/logo realms branca.svg'

const PRODUCT_LINKS = [
  { key: 'eduxgen',  path: '/eduxgen' },
  { key: 'myclass',  path: '/myclass' },
  { key: 'personas', path: '/realms-personas' },
  { key: 'edurealms',path: '/edurealms' },
  { key: 'iptv',     path: '/iptv-conteudo' },
  { key: 'conteudo', path: '/iptv-conteudo' },
]

const COMPANY_LINKS = [
  { key: 'about',   path: '/sobre-nos' },
  { key: 'press',   path: '/na-imprensa' },
  { key: 'contact', path: '/contato' },
]

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn', href: '#',
    icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
  },
  {
    label: 'Instagram', href: '#',
    icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />,
  },
  {
    label: 'Twitter / X', href: '#',
    icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
  },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark-950 text-white/40 border-t border-white/[0.06]">
      <Container>
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/[0.06]">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex mb-5">
              <img src={logoRealmsWhite} alt="Realms" className="h-9 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-white/35 max-w-sm mb-6 font-light">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] flex items-center justify-center transition-all duration-200">
                  <svg className="w-4 h-4 text-white/40 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white/70 text-[11px] mb-4 uppercase tracking-wider">{t('footer.products')}</h4>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map(({ key, path }) => (
                <li key={key}>
                  <Link to={path} className="text-sm text-white/35 hover:text-white transition-colors font-light">
                    {t(`products.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white/70 text-[11px] mb-4 uppercase tracking-wider">{t('footer.company')}</h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ key, path }) => (
                <li key={key}>
                  <Link to={path} className="text-sm text-white/35 hover:text-white transition-colors font-light">
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <p> {year} Realms. {t('footer.rights')}</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white/50 transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white/50 transition-colors">Termos de Uso</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
