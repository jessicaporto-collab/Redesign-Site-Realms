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
    labelKey: 'pages.contact.phone',
    value: '(21) 3828-1475',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    accent: 'from-emerald-600 to-emerald-800',
  },
]

const HOURS = [
  { dayKey: 'contact_page.hours_weekdays', time: '9:00 – 18:00' },
]

// ─────────────────────────────────────────────────────────────────
//  Form + Sidebar
// ─────────────────────────────────────────────────────────────────
function FormSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  const INITIAL_FORM_STATE = { name: '', subject: '', message: '' }
  const [form, setForm] = useState(INITIAL_FORM_STATE)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingEmail, setPendingEmail] = useState(null)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const openEmailClient = ({ to, subject, body }) => {
    const encodedSubject = encodeURIComponent(subject)
    const encodedBody = encodeURIComponent(body)
    const mailtoUrl = `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`
    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}` +
      `&su=${encodedSubject}&body=${encodedBody}`

    const userAgent = globalThis.navigator?.userAgent || ''
    const isMobileByUA = /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(userAgent)
    const isMobileByClientHint = Boolean(globalThis.navigator?.userAgentData?.mobile)
    const isMobile = isMobileByUA || isMobileByClientHint

    // No mobile, chama diretamente o app de email padrao via mailto.
    if (isMobile) {
      globalThis.location.href = mailtoUrl
      return
    }

    // No desktop, mantem envio via Gmail web para evitar prompt de app mailto.
    const opened = globalThis.open(gmailUrl, '_blank')

    // Se popup estiver bloqueado, abre na aba atual sem acionar mailto.
    if (!opened) {
      globalThis.location.href = gmailUrl
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const to = 'comercial@realms.com.br'
    const subject = form.subject?.trim() || 'Contato pelo site Realms'
    const body = `Nome: ${form.name}\n\nMensagem:\n${form.message}`

    setPendingEmail({ to, subject, body })
    setConfirmOpen(true)
  }

  const handleConfirmSend = () => {
    if (!pendingEmail) return
    openEmailClient(pendingEmail)
    setConfirmOpen(false)
    setPendingEmail(null)
    setForm(INITIAL_FORM_STATE)
  }

  const handleCancelSend = () => {
    setConfirmOpen(false)
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

            <form onSubmit={handleSubmit} className="space-y-5">
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
                className="w-full sm:w-auto"
              >
                {t('pages.contact.send')}
              </Button>
            </form>

            {confirmOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <button
                  type="button"
                  className="absolute inset-0 bg-black/65 backdrop-blur-[1px]"
                  aria-label={t('contact_page.modal_cancel')}
                  onClick={handleCancelSend}
                />
                <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#111317] p-6 sm:p-7 shadow-2xl">
                  <h3 className="text-lg font-bold text-white mb-2">{t('contact_page.modal_title')}</h3>
                  <p className="text-sm text-white/65 leading-relaxed mb-6">
                    {t('contact_page.modal_description')}
                  </p>
                  <div className="flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCancelSend}
                      className="px-4 py-2.5 rounded-xl border border-white/15 text-white/80 hover:text-white hover:bg-white/[0.04] transition"
                    >
                      {t('contact_page.modal_cancel')}
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmSend}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition"
                    >
                      {t('contact_page.modal_confirm')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="reveal delay-2 flex flex-col gap-5">

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
      <FormSection />
      <FAQSection />
    </>
  )
}
