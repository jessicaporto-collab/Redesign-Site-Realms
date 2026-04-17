import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Video, Server, Users, Paperclip, ShieldCheck, CloudUpload, Radio, Lock, Link } from 'lucide-react'
import Container from '../../components/ui/Container'
import Button from '../../components/ui/Button'
import heroImg from '../../assets/iptv/img1-iptv.jpg'
import webinarImg from '../../assets/iptv/img2-iptv.jpg'

const IMG = {
  hero: heroImg,
  meeting: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=900&q=85&fit=crop',
  webinar: webinarImg,
  mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80&fit=crop',
  desktop: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=700&q=80&fit=crop',
  web: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&fit=crop',
  nebula: 'https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?w=1600&q=60&fit=crop',
}

function useReveal() {
  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => ob.observe(el))
    return () => ob.disconnect()
  }, [])
}

function useParticles(containerId) {
  useEffect(() => {
    const PARTICLES_CONFIG = {
      particles: {
        number: { value: 160, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
        opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1, opacity_min: 0, sync: false } },
        size: { value: 3, random: true, anim: { enable: false, speed: 4, size_min: 0.3, sync: false } },
        line_linked: { enable: false },
        move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'bubble' },
          onclick: { enable: true, mode: 'repulse' },
          resize: true,
        },
        modes: {
          bubble: { distance: 250, size: 0, duration: 2, opacity: 0, speed: 3 },
          repulse: { distance: 400, duration: 0.4 },
        },
      },
      retina_detect: true,
    }
    const init = () => {
      if (window.particlesJS) window.particlesJS(containerId, PARTICLES_CONFIG)
    }
    if (window.particlesJS) {
      init()
      return () => {
        if (window.pJSDom?.length > 0) {
          window.pJSDom.forEach((dom) => dom.pJS.fn.vendors.destroypJS())
          window.pJSDom = []
        }
      }
    }
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
    script.async = true
    script.onload = init
    document.body.appendChild(script)
    return () => {
      if (window.pJSDom?.length > 0) {
        window.pJSDom.forEach((dom) => dom.pJS.fn.vendors.destroypJS())
        window.pJSDom = []
      }
    }
  }, [containerId])
}

function StarField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }
    resize()
    window.addEventListener('resize', resize)
    const COLORS = ['rgba(59,130,246,', 'rgba(52,211,153,', 'rgba(255,255,255,', 'rgba(110,231,183,']
    const pick = () => { const r = Math.random(); return r > 0.88 ? COLORS[0] : r > 0.76 ? COLORS[1] : r > 0.65 ? COLORS[3] : COLORS[2] }
    const stars = Array.from({ length: 320 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.2, base: Math.random() * 0.7 + 0.15,
      speed: Math.random() * 0.012 + 0.003, phase: Math.random() * Math.PI * 2, color: pick(),
    }))
    const dust = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      rx: Math.random() * 180 + 60, ry: Math.random() * 40 + 12,
      angle: Math.random() * Math.PI, alpha: Math.random() * 0.035 + 0.008,
      color: Math.random() > 0.65 ? '59,130,246' : Math.random() > 0.4 ? '52,211,153' : '110,231,183',
    }))
    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dust.forEach((d) => {
        ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(d.angle)
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, d.rx)
        g.addColorStop(0, `rgba(${d.color},${d.alpha})`); g.addColorStop(1, `rgba(${d.color},0)`)
        ctx.scale(1, d.ry / d.rx); ctx.beginPath(); ctx.arc(0, 0, d.rx, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill(); ctx.restore()
      })
      stars.forEach((s) => {
        const alpha = s.base + Math.sin(t * s.speed * 60 + s.phase) * (s.base * 0.7)
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `${s.color}${alpha.toFixed(3)})`; ctx.fill()
        if (s.r > 1.2) {
          ctx.strokeStyle = `${s.color}${(alpha * 0.5).toFixed(3)})`; ctx.lineWidth = 0.5
          ctx.beginPath(); ctx.moveTo(s.x - s.r * 2.5, s.y); ctx.lineTo(s.x + s.r * 2.5, s.y)
          ctx.moveTo(s.x, s.y - s.r * 2.5); ctx.lineTo(s.x, s.y + s.r * 2.5); ctx.stroke()
        }
      })
      t += 0.016; raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.85 }} />
}

function FloatingNebula() { return null }

function Check({ color = '#60a5fa' }) {
  return (
    <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: `${color}20`, border: `1px solid ${color}60` }}>
      <svg className="w-3 h-3" style={{ color }} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  )
}

function SectionDivider() {
  return (
    <div aria-hidden="true" style={{ position: 'relative', zIndex: 10, height: 2, overflow: 'hidden' }}>
      <style>{`@keyframes dividerSweep{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.55) 20%, rgba(52,211,153,0.50) 45%, rgba(110,231,183,0.4) 65%, rgba(59,130,246,0.45) 85%, transparent 100%)', animation: 'dividerSweep 7s linear infinite', filter: 'drop-shadow(0 0 4px rgba(52,211,153,0.4)) drop-shadow(0 0 10px rgba(59,130,246,0.3))' }} />
    </div>
  )
}

function Badge({ children, align = 'center' }) {
  return (
    <p className={`reveal flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
      <span className="w-8 h-px" style={{ background: 'linear-gradient(90deg, rgba(59,130,246,0.7), rgba(52,211,153,0.7))' }} />
      {children}
      {align === 'center' && <span className="w-8 h-px" style={{ background: 'linear-gradient(90deg, rgba(52,211,153,0.7), rgba(59,130,246,0.7))' }} />}
    </p>
  )
}

export default function IPTVConteudo() {
  const { t } = useTranslation()
  useReveal()
  useParticles('iptv-cta-particles')

  return (
    <div style={{ background: '#020a14', color: 'white', position: 'relative', overflowX: 'hidden' }}>
      <StarField />

      {/* HERO */}
      <section className="relative overflow-visible pb-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, #031428 0%, #060e1a 40%, #020a14 100%)' }}>
        {/* Glows de fundo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/3 w-[700px] h-[500px] rounded-full blur-[160px]" style={{ background: 'rgba(37,99,235,0.15)' }} />
          <div className="absolute top-0 right-1/3 w-[500px] h-[400px] rounded-full blur-[140px]" style={{ background: 'rgba(16,185,129,0.12)' }} />
        </div>

        {/* Texto centralizado */}
        <Container className="relative z-10 pt-28 pb-16">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-5" style={{ background: 'rgba(37,99,235,0.10)', borderColor: 'rgba(59,130,246,0.30)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-300 text-xs font-semibold uppercase tracking-widest">{t('iptv_page.hero_badge')}</span>
            </div>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight">
              <span>
                {t('iptv_page.hero_h1_1')}{' '}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #34d399 60%, #6ee7b7 100%)' }}>
                  {t('iptv_page.hero_h1_2')}
                </span>
              </span>
              <br />
              {t('iptv_page.hero_h1_3')}
            </h1>
          </div>
        </Container>

        {/* Imagem produto — de ponta a ponta, estilo "app screenshot" */}
        <div className="relative z-10 w-full px-3 sm:px-6 md:px-16 lg:px-24 xl:px-32">
          <div
            className="relative w-full overflow-hidden"
            style={{
              borderRadius: '16px 16px 0 0',
              border: '1px solid rgba(255,255,255,0.10)',
              borderBottom: 'none',
              boxShadow: '0 -20px 80px rgba(37,99,235,0.22), 0 -8px 32px rgba(0,0,0,0.6)',
            }}
          >
            {/* Barra de "janela" decorativa */}
            <div className="flex items-center gap-2 px-5 py-3" style={{ background: 'rgba(4,10,20,0.97)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
              <div className="flex-1 mx-4 h-5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', maxWidth: 260 }} />
              {/* Chip "Ao Vivo" na barra */}
              <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full" style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-300 text-xs font-semibold">{t('iptv_page.hero_chip2_title')}</span>
              </div>
            </div>
            <img
              src={IMG.hero}
              alt="Videoconferência IP.TV"
              className="w-full block"
              style={{ height: 'clamp(220px, 52vw, 72vh)', objectFit: 'cover', objectPosition: 'center 20%' }}
            />
            {/* Gradiente na base para cortar suavemente */}
            <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to bottom, transparent 0%, #020a14 100%)' }} />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* INTRO */}
      <section className="py-28 relative" style={{ background: '#020a14' }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal relative">
              <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 0 70px rgba(37,99,235,0.25)' }}>
                <img src={IMG.webinar} alt="Webinar IP.TV" className="w-full object-contain" />
              </div>

              <div className="hidden sm:block absolute -top-6 -left-6 rounded-2xl p-4 border border-white/10" style={{ background: 'rgba(8,8,28,0.95)', backdropFilter: 'blur(20px)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(96,165,250,0.2)' }}>
                    <Lock size={20} strokeWidth={2} className="text-blue-300" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t('iptv_page.intro_chip2_title')}</p>
                    <p className="text-white/40 text-xs">{t('iptv_page.intro_chip2_sub')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Badge align="left">{t('iptv_page.intro_badge')}</Badge>
              <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                {t('iptv_page.intro_h2_1')}{' '}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa, #34d399)' }}>
                  {t('iptv_page.intro_h2_2')}
                </span>
              </h2>
              <p className="reveal text-white/55 text-lg leading-relaxed mb-4">{t('iptv_page.intro_p1')}</p>
              <p className="reveal text-white/40 text-base leading-relaxed">{t('iptv_page.intro_p2')}</p>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* CASOS DE USO */}
      <section className="py-28 relative" style={{ background: '#020a14' }}>
        <Container>
          <div className="text-center mb-16">
            <Badge>{t('iptv_page.usecases_badge')}</Badge>
            <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-4">
              {t('iptv_page.usecases_h2_1')}{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #34d399, #60a5fa)' }}>{t('iptv_page.usecases_h2_2')}</span>
            </h2>
            <p className="reveal text-white/40 text-lg max-w-2xl mx-auto">{t('iptv_page.usecases_desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: t('iptv_page.usecase_1_title'), desc: t('iptv_page.usecase_1_desc'), tag: t('iptv_page.usecase_1_tag'), color: '#60a5fa' },
              { title: t('iptv_page.usecase_2_title'), desc: t('iptv_page.usecase_2_desc'), tag: t('iptv_page.usecase_2_tag'), color: '#34d399' },
              { title: t('iptv_page.usecase_3_title'), desc: t('iptv_page.usecase_3_desc'), tag: t('iptv_page.usecase_3_tag'), color: '#6ee7b7' },
              { title: t('iptv_page.usecase_4_title'), desc: t('iptv_page.usecase_4_desc'), tag: t('iptv_page.usecase_4_tag'), color: '#f472b6' },
              { title: t('iptv_page.usecase_5_title'), desc: t('iptv_page.usecase_5_desc'), tag: t('iptv_page.usecase_5_tag'), color: '#f59e0b' },
              { title: t('iptv_page.usecase_6_title'), desc: t('iptv_page.usecase_6_desc'), tag: t('iptv_page.usecase_6_tag'), color: '#a78bfa' },
            ].map((uc) => (
              <div key={uc.title} className="reveal group relative rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider" style={{ background: `${uc.color}15`, color: uc.color }}>{uc.tag}</span>
                </div>
                <h3 className="text-white font-bold mb-2 leading-snug">{uc.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{uc.desc}</p>
                <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `${uc.color}25` }} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* RECURSOS */}
      <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #020a14 0%, #020e1c 50%, #020a14 100%)' }}>
        <Container>
          <div className="text-center mb-16">
            <Badge>{t('iptv_page.features_badge')}</Badge>
            <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-4">
              {t('iptv_page.features_h2_1')}{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa, #34d399)' }}>{t('iptv_page.features_h2_2')}</span>
            </h2>
            <p className="reveal text-white/40 text-lg max-w-2xl mx-auto">{t('iptv_page.features_desc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Video, title: t('iptv_page.feat_1_title'), desc: t('iptv_page.feat_1_desc'), glow: '#60a5fa' },
              { icon: Server, title: t('iptv_page.feat_2_title'), desc: t('iptv_page.feat_2_desc'), glow: '#34d399' },
              { icon: Users, title: t('iptv_page.feat_3_title'), desc: t('iptv_page.feat_3_desc'), glow: '#6ee7b7' },
              { icon: Paperclip, title: t('iptv_page.feat_4_title'), desc: t('iptv_page.feat_4_desc'), glow: '#60a5fa' },
              { icon: ShieldCheck, title: t('iptv_page.feat_5_title'), desc: t('iptv_page.feat_5_desc'), glow: '#34d399' },
              { icon: CloudUpload, title: t('iptv_page.feat_6_title'), desc: t('iptv_page.feat_6_desc'), glow: '#10b981' },
              { icon: Radio, title: t('iptv_page.feat_7_title'), desc: t('iptv_page.feat_7_desc'), glow: '#60a5fa' },
              { icon: Lock, title: t('iptv_page.feat_8_title'), desc: t('iptv_page.feat_8_desc'), glow: '#34d399' },
              { icon: Link, title: t('iptv_page.feat_9_title'), desc: t('iptv_page.feat_9_desc'), glow: '#6ee7b7' },
            ].map((feat) => (
              <div key={feat.title} className="reveal group relative rounded-2xl p-6 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${feat.glow}18`, border: `1px solid ${feat.glow}30` }}><feat.icon size={22} style={{ color: feat.glow }} strokeWidth={1.6} /></div>
                <h4 className="text-white font-bold mb-2 text-sm leading-snug">{feat.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{feat.desc}</p>
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `${feat.glow}20` }} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* NUMEROS */}
      <section className="py-20 relative overflow-hidden" style={{ background: '#020a14' }}>
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '+15k', label: 'Sessões simultâneas', color: '#60a5fa' },
              { value: '+100k', label: 'Usuários', color: '#34d399' },
              { value: '4', label: 'Plataformas (iOS, Android, Web, Desktop)', color: '#6ee7b7' },
              { value: '99,9%', label: 'Uptime garantido', color: '#60a5fa' },
            ].map((stat) => (
              <div key={stat.label} className="reveal text-center px-6 py-8 rounded-2xl border" style={{ background: `${stat.color}06`, borderColor: `${stat.color}20` }}>
                <p className="text-4xl font-black mb-2" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-white/40 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* PLATAFORMAS */}
      <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #020a14 0%, #020e1c 50%, #020a14 100%)' }}>
        <Container>
          <div className="text-center mb-16">
            <Badge>{t('iptv_page.platforms_badge')}</Badge>
            <h2 className="reveal text-4xl lg:text-5xl font-black text-white mb-4">
              {t('iptv_page.platforms_h2_1')}{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa, #34d399, #6ee7b7)' }}>{t('iptv_page.platforms_h2_2')}</span>
            </h2>
            <p className="reveal text-white/40 text-lg max-w-2xl mx-auto">{t('iptv_page.platforms_desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: IMG.web,     label: t('iptv_page.platform_web_label'),     title: t('iptv_page.platform_web_title'),     desc: t('iptv_page.platform_web_desc'),     color: '#60a5fa' },
              { img: IMG.mobile,  label: t('iptv_page.platform_mobile_label'),  title: t('iptv_page.platform_mobile_title'),  desc: t('iptv_page.platform_mobile_desc'),  color: '#34d399' },
              { img: IMG.desktop, label: t('iptv_page.platform_desktop_label'), title: t('iptv_page.platform_desktop_title'), desc: t('iptv_page.platform_desktop_desc'), color: '#6ee7b7' },
            ].map((p) => (
              <div key={p.title} className="reveal group relative rounded-3xl overflow-hidden" style={{ border: `1px solid ${p.color}20` }}>
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(2,2,7,0.9) 0%, rgba(2,2,7,0.3) 60%, transparent 100%)' }} />
                  <span className="top-4 left-43TOP4_z-10 left-4 z-102x-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}40` }}>{p.label}</span>
                </div>
                <div className="p-6" style={{ background: `${p.color}06` }}>
                  <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* CTA */}
      <section className="py-32 relative overflow-hidden" style={{ background: '#080808' }}>
        {/* Particles */}
        <div id="iptv-cta-particles" className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} aria-hidden="true" />
        {/* Radial blue glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(37,99,235,0.13)_0%,transparent_70%)] pointer-events-none z-[1]" aria-hidden="true" />
        {/* Top line accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent z-[1]" aria-hidden="true" />
        <Container className="relative z-10 text-center">
          <Badge>{t('iptv_page.cta_badge')}</Badge>
          <h2 className="reveal text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {t('iptv_page.cta_h2_1')}{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa, #34d399, #6ee7b7)' }}>{t('iptv_page.cta_h2_2')}</span>
          </h2>
          <p className="reveal text-white/45 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">{t('iptv_page.cta_desc')}</p>
          <div className="reveal flex flex-wrap justify-center gap-3 mb-12">
            {['Multiplataforma', 'Gravação automática', 'Breakout Rooms', 'Chat multimídia', 'Moderação inteligente', 'E2E seguro'].map((pill) => (
              <span key={pill} className="px-4 py-2 rounded-full text-sm font-medium text-white/60 border border-white/10" style={{ background: 'rgba(255,255,255,0.04)' }}>{pill}</span>
            ))}
          </div>
          <Button to="/contato" size="xl" variant="outline-white" className="reveal">
            Solicitar Demo
          </Button>
        </Container>
      </section>
    </div>
  )
}
