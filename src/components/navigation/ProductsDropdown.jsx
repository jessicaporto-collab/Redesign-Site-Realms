import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const PRODUCTS = [
  {
    key: 'eduxgen',
    path: '/eduxgen',
    icon: '🤖',
    description: 'AI content generation',
    iconBg: 'bg-blue-100',
  },
  {
    key: 'myclass',
    path: '/myclass',
    icon: '🏫',
    description: 'Classroom management',
    iconBg: 'bg-purple-100',
  },
  {
    key: 'personas',
    path: '/realms-personas',
    icon: '👤',
    description: 'Adaptive learning profiles',
    iconBg: 'bg-green-100',
  },
  {
    key: 'edurealms',
    path: '/edurealms',
    icon: '🌐',
    description: 'Immersive 3D environments',
    iconBg: 'bg-orange-100',
  },
  {
    key: 'iptv',
    path: '/iptv-conteudo',
    icon: '📺',
    description: 'Educational broadcasting',
    iconBg: 'bg-red-100',
  },
]

export default function ProductsDropdown({ onClose }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger — hover-driven only, no click toggle */}
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        className={
          'flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ' +
          (open
            ? 'text-blue-600 bg-blue-50'
            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50')
        }
      >
        {t('nav.products')}
        <svg
          className={'w-4 h-4 transition-transform duration-200 ' + (open ? 'rotate-180' : '')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/*
        pt-2 instead of mt-2: the padding extends the hover area seamlessly
        from the button edge into the panel — the mouse never leaves the
        wrapper div when crossing the visual gap, so onMouseLeave won't fire.
      */}
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Section label */}
            <div className="px-4 py-3 border-b border-gray-50">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {t('nav.products')}
              </p>
            </div>

            {/* Product links */}
            <div className="p-2">
              {PRODUCTS.map((product) => (
                <Link
                  key={product.key}
                  to={product.path}
                  onClick={() => {
                    setOpen(false)
                    onClose?.()
                  }}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={
                      'w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ' +
                      product.iconBg
                    }
                  >
                    {product.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {t('products.' + product.key)}
                    </p>
                    <p className="text-xs text-gray-400">{product.description}</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-300 ml-auto group-hover:text-blue-400 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
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

export { PRODUCTS }
