import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'

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

const CONTACT_INFO = [
  {
    labelKey: 'pages.contact.address',
    value: 'Av. Paulista, 1000 — São Paulo, SP 01310-100, Brasil',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accent: 'from-blue-600 to-blue-800',
  },
  {
    labelKey: 'pages.contact.phone',
    value: '+55 (11) 9 9999-0000',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    accent: 'from-emerald-600 to-emerald-800',
  },
  {
    labelKey: 'pages.contact.email_label',
    value: 'contato@realms.education',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    accent: 'from-violet-600 to-violet-800',
  },
]

const HOURS = [
  { dayKey: 'contact_page.hours_weekdays', time: '9:00 – 18:00' },
  { dayKey: 'contact_page.hours_saturday', time: '10:00 – 14:00' },
  { dayKey: 'contact_page.hours_sunday',   time: '—' },
]

// ─────────────────────────────────────────────────────────────────
//  Hero
// ─────────────────────────────────────────────────────────────────
function HeroSection() {
  const { t } = useTranslation()
  const contentRef = useRef(null)

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
      id="contact-hero"
      className="relative min-h-[72vh] w-full overflow-hidden flex items-center bg-[#0a0a0a]"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />
      {/* Cyan-blue radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.10)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20"
      >
        <div className="max-w-3xl">
          <p className="hero-item flex items-center gap-3 text-white/40 text-[11px] font-semibold uppercase tracking-[0.25em] mb-7">
            <span className="w-8 h-px bg-white/35" aria-hidden="true" />
            {t('contact_page.hero_tagline')}
          </p>

          <h1 className="hero-item text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.92] tracking-tight mb-6">
            {t('contact_page.hero_line1')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-blue-500">
              {t('contact_page.hero_line2')}
            </span>
          </h1>

          <p className="hero-item text-base sm:text-lg text-white/45 leading-relaxed max-w-xl mb-8 font-light">
            {t('contact_page.hero_description')}
          </p>

          {/* Info pills */}
          <div className="hero-item flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-2 text-xs text-white/50 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              {t('contact_page.hero_pill_response')}
            </span>
            <span className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-2 text-xs text-white/50 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" aria-hidden="true" />
              {t('contact_page.hero_pill_support')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Form + Sidebar
// ─────────────────────────────────────────────────────────────────
function FormSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  const inputClass =
    'w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-blue-500/60 focus:border-blue-500/40 transition'

  const labelClass = 'block text-xs font-semibold uppercase tracking-[0.12em] text-white/35 mb-2'

  return (
    <section id="contact-form" className="bg-[#0a0a0a] py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
        aria-hidden="true"
      />
      <Container>
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">

          {/* ── Form ── */}
          <div className="reveal card-dark p-8 lg:p-10">
            <div className="mb-8">
              <span className="section-badge mb-3 block">
                <span className="w-5 h-px bg-current" aria-hidden="true" />
                {t('contact_page.form_badge')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t('pages.contact.content_title')}
              </h2>
              <p className="text-white/40 mt-2 text-sm font-light leading-relaxed">
                {t('pages.contact.content_text')}
              </p>
            </div>

            {status === 'success' ? (
              <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-2xl p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-lg mb-2">{t('pages.contact.success')}</p>
                <p className="text-white/40 text-sm font-light">{t('contact_page.success_sub')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>
                      {t('pages.contact.name')}
                      <span className="text-blue-400 ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Maria Silva"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {t('pages.contact.email')}
                      <span className="text-blue-400 ml-0.5">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="maria@escola.com.br"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>{t('pages.contact.subject')}</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder={t('contact_page.subject_placeholder')}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    {t('pages.contact.message')}
                    <span className="text-blue-400 ml-0.5">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    placeholder={t('contact_page.message_placeholder')}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  disabled={status === 'sending'}
                  className="w-full sm:w-auto"
                >
                  {status === 'sending'
                    ? t('pages.contact.sending')
                    : t('pages.contact.send')}
                </Button>
              </form>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="reveal delay-2 space-y-5 lg:sticky lg:top-28">

            {/* Contact info */}
            <div className="card-dark p-6">
              <h3 className="text-sm font-bold text-white mb-5">{t('contact_page.info_title')}</h3>
              <div className="space-y-4">
                {CONTACT_INFO.map((info) => (
                  <div key={info.labelKey} className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${info.accent} flex items-center justify-center flex-shrink-0`}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/28 mb-0.5">
                        {t(info.labelKey)}
                      </p>
                      <p className="text-sm text-white/55 font-light">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office hours */}
            <div className="card-dark p-6">
              <h3 className="text-sm font-bold text-white mb-5">{t('contact_page.hours_title')}</h3>
              <div className="space-y-3">
                {HOURS.map(({ dayKey, time }) => (
                  <div key={dayKey} className="flex items-center justify-between text-sm">
                    <span className="text-white/40 font-light">{t(dayKey)}</span>
                    <span className={`font-medium ${time === '—' ? 'text-white/20' : 'text-white/65'}`}>
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Response time badge */}
            <div className="card-dark p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-white">{t('contact_page.response_title')}</h3>
              </div>
              <p className="text-sm text-white/40 font-light leading-relaxed">
                {t('contact_page.response_desc')}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  FAQ
// ─────────────────────────────────────────────────────────────────
const FAQ_KEYS = [
  { q: 'contact_page.faq1_q', a: 'contact_page.faq1_a' },
  { q: 'contact_page.faq2_q', a: 'contact_page.faq2_a' },
  { q: 'contact_page.faq3_q', a: 'contact_page.faq3_a' },
  { q: 'contact_page.faq4_q', a: 'contact_page.faq4_a' },
]

function FAQSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="bg-[#0d0d0d] py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />
      <Container>
        <div ref={sectionRef}>
          <div className="text-center mb-14">
            <span className="reveal section-badge mb-4 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              {t('contact_page.faq_badge')}
            </span>
            <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t('contact_page.faq_heading')}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ_KEYS.map(({ q, a }, i) => (
              <div
                key={q}
                className={`reveal delay-${Math.min(i + 2, 6)} card-dark overflow-hidden`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left group"
                  aria-expanded={open === i}
                >
                  <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors duration-200">
                    {t(q)}
                  </span>
                  <svg
                    className={`w-4 h-4 text-white/30 flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                {open === i && (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-white/40 font-light leading-relaxed">{t(a)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Page
// ─────────────────────────────────────────────────────────────────
export default function Contato() {
  return (
    <>
      <HeroSection />
      <FormSection />
      <FAQSection />
    </>
  )
}
