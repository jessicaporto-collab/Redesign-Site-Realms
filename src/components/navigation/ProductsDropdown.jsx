import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const PRODUCTS = [
  { key: 'eduxgen',  path: '/eduxgen',        icon: 'âœ¦', accent: 'text-blue-400',   bg: 'bg-blue-500/10' },
  { key: 'myclass',  path: '/myclass',         icon: 'â—ˆ', accent: 'text-violet-400', bg: 'bg-violet-500/10' },
  { key: 'personas', path: '/realms-personas', icon: 'â—‰', accent: 'text-emerald-400',bg: 'bg-emerald-500/10' },
  { key: 'eduxrealms',path: '/eduxrealms',       icon: 'â—Ž', accent: 'text-orange-400', bg: 'bg-orange-500/10' },
  { key: 'iptv',     path: '/iptv-conteudo',   icon: 'â—', accent: 'text-rose-400',   bg: 'bg-rose-500/10' },
  { key: 'conteudo', path: '/iptv-conteudo',   icon: 'â—‘', accent: 'text-amber-400',  bg: 'bg-amber-500/10' },
]

export { PRODUCTS }

export default function ProductsDropdown({ onClose }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          open ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/[0.07]'
        }`}
      >
        {t('nav.products')}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72 z-50">
          <div className="bg-dark-800 rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/60 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/[0.06]">
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em]">
                {t('nav.products')}
              </p>
            </div>
            <div className="p-2">
              {PRODUCTS.map((product) => (
                <Link
                  key={product.key}
                  to={product.path}
                  onClick={() => { setOpen(false); onClose?.() }}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors truncate">
                      {t(`products.${product.key}`)}
                    </p>
                  </div>
                  <svg className="w-3.5 h-3.5 text-white/20 ml-auto flex-shrink-0 group-hover:text-white/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

