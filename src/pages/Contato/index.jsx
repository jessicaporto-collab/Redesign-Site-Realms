import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageHero from '../../components/ui/PageHero'
import Container from '../../components/ui/Container'
import Section from '../../components/ui/Section'
import Button from '../../components/ui/Button'

const CONTACT_INFO = [
  {
    icon: '📍',
    labelKey: 'address',
    value: 'Av. Paulista, 1000 — São Paulo, SP 01310-100, Brasil',
  },
  {
    icon: '📞',
    labelKey: 'phone',
    value: '+55 (11) 9 9999-0000',
  },
  {
    icon: '✉️',
    labelKey: 'email_label',
    value: 'contato@vocaciona.com.br',
  },
]

export default function Contato() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  return (
    <>
      <PageHero
        title={t('pages.contact.hero_title')}
        subtitle={t('pages.contact.hero_subtitle')}
        gradient="from-blue-600 via-blue-700 to-indigo-900"
        icon="💬"
        label="Get in touch"
      />

      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-black text-gray-900 mb-2">
                {t('pages.contact.content_title')}
              </h2>
              <p className="text-gray-500 mb-8">{t('pages.contact.content_text')}</p>

              {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <p className="text-green-800 font-semibold">{t('pages.contact.success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t('pages.contact.name')}
                        <span className="text-blue-600 ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Maria Silva"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t('pages.contact.email')}
                        <span className="text-blue-600 ml-0.5">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="maria@escola.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t('pages.contact.subject')}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="Demo request, Partnership, Support..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t('pages.contact.message')}
                      <span className="text-blue-600 ml-0.5">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'sending'}
                    className="w-full sm:w-auto"
                  >
                    {status === 'sending' ? t('pages.contact.sending') : t('pages.contact.send')}
                  </Button>
                </form>
              )}
            </div>

            <div className="lg:col-span-2 space-y-5">
              <div className="bg-gray-50 rounded-3xl p-8">
                <h3 className="font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-5">
                  {CONTACT_INFO.map((info) => (
                    <div key={info.labelKey} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                          {t(`pages.contact.${info.labelKey}`)}
                        </p>
                        <p className="text-sm text-gray-700">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-4">🕐 Office Hours</h3>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="font-medium text-gray-700">9:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-gray-700">10:00 – 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-gray-400">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
