import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/ui/Container'

/* ─────────────────────────────────────────────
   Mouse dust / particle effect  (canvas-based)
───────────────────────────────────────────── */
const DUST_COLORS = [
  '#3b82f6', // blue-500
  '#6366f1', // indigo-500
  '#8b5cf6', // violet-500
  '#a855f7', // purple-500
  '#ec4899', // pink-500
  '#f472b6', // pink-400
  '#c084fc', // purple-400
]

function useDustCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const spawnParticles = (x, y) => {
      const count = 4 + Math.floor(Math.random() * 4)
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.4 + Math.random() * 1.4
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          alpha: 0.7 + Math.random() * 0.3,
          size: 2 + Math.random() * 4,
          color: DUST_COLORS[Math.floor(Math.random() * DUST_COLORS.length)],
          decay: 0.012 + Math.random() * 0.018,
        })
      }
    }

    // Listen on window so z-index of content never blocks the events
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        spawnParticles(x, y)
      }
    }

    globalThis.addEventListener('mousemove', onMouseMove)

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles = particles.filter((p) => p.alpha > 0.01)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.015 // gentle gravity
        p.vx *= 0.97
        p.alpha -= p.decay
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      globalThis.removeEventListener('mousemove', onMouseMove)
    }
  }, [])
}

/* ─────────────────────────────────────────────
   Scroll reveal hook
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Entrance anim hook (for hero)
───────────────────────────────────────────── */
function useEntrance(ref) {
  useEffect(() => {
    const items = ref.current?.querySelectorAll('.hero-item')
    if (!items) return
    items.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      const timer = setTimeout(() => {
        el.style.transition =
          'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 200 + i * 140)
      return () => clearTimeout(timer)
    })
  }, [])
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const CAPABILITIES = [
  {
    icon: '💬',
    title: 'Conversa Fluida e Natural',
    desc: 'Cada Persona mantém diálogos contextuais de forma contínua, respondendo em linguagem natural como um humano faria.',
    accent: '#3b82f6',
  },
  {
    icon: '🧠',
    title: 'Treinado com Seu Conteúdo',
    desc: 'Você alimenta a Persona com materiais, apostilas e dados da sua instituição. Ela aprende e responde com sua identidade.',
    accent: '#8b5cf6',
  },
  {
    icon: '🎭',
    title: 'Personalidade Customizável',
    desc: 'Defina tom, nome, avatar e comportamento. Crie uma Persona que combine com a identidade da sua escola ou curso.',
    accent: '#ec4899',
  },
  {
    icon: '📚',
    title: 'Assistente de Aula',
    desc: 'Responde dúvidas dos alunos sobre conteúdo didático a qualquer hora, aliviando a carga do professor.',
    accent: '#6366f1',
  },
  {
    icon: '🗂️',
    title: 'Assistente de Conteúdo',
    desc: 'Guia alunos e professores por materiais, playlists e recursos educacionais de forma interativa e inteligente.',
    accent: '#a855f7',
  },
  {
    icon: '📊',
    title: 'Insights e Analytics',
    desc: 'Monitore as interações para descobrir as dúvidas mais frequentes e identificar gaps de aprendizado em tempo real.',
    accent: '#f472b6',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Crie sua Persona',
    desc: 'Defina nome, personalidade e o tipo de assistente ideal para sua necessidade.',
    color: '#3b82f6',
  },
  {
    num: '02',
    title: 'Treine com seus dados',
    desc: 'Faça upload de PDFs, vídeos, apostilas e conteúdos. A IA aprende do seu material.',
    color: '#8b5cf6',
  },
  {
    num: '03',
    title: 'Publique e interaja',
    desc: 'Disponibilize para alunos e professores. A Persona já está pronta para conversar.',
    color: '#ec4899',
  },
]

const USE_CASES = [
  {
    tag: 'Para Alunos',
    title: 'Persona Assistente de Aula',
    desc: 'Disponível 24/7, a Persona responde dúvidas sobre conteúdo, explica conceitos com exemplos e sugere materiais complementares — igual a ter um tutor particular sempre ao lado.',
    points: [
      'Tira dúvidas em linguagem natural',
      'Explica conteúdo com analogias e exemplos',
      'Sugere exercícios personalizados',
      'Disponível em qualquer horário',
    ],
    gradient: 'from-blue-900/60 to-indigo-900/60',
    border: 'border-blue-500/20',
    accent: '#3b82f6',
    emoji: '🎓',
  },
  {
    tag: 'Para Educadores',
    title: 'Persona Assistente de Conteúdo',
    desc: 'Professores e gestores treinam a Persona com seus materiais e ela se torna uma extensão inteligente da equipe, distribuindo conteúdo e orientações de forma automática e escalável.',
    points: [
      'Distribui conteúdo de forma inteligente',
      'Organiza e navega bibliotecas de materiais',
      'Responde perguntas frequentes automaticamente',
      'Libera o professor para aulas mais ricas',
    ],
    gradient: 'from-violet-900/60 to-purple-900/60',
    border: 'border-violet-500/20',
    accent: '#8b5cf6',
    emoji: '🏫',
  },
]

/* ─────────────────────────────────────────────
   Page component
───────────────────────────────────────────── */
export default function RealmsPersonas() {
  const canvasRef = useRef(null)
  const heroRef = useRef(null)
  const capRef = useRef(null)
  const stepsRef = useRef(null)
  const casesRef = useRef(null)

  useDustCanvas(canvasRef)
  useEntrance(heroRef)
  useReveal(capRef)
  useReveal(stepsRef)
  useReveal(casesRef)

  return (
    <div className="bg-[#0a0a0a] min-h-screen">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        className="relative h-screen min-h-[680px] w-full overflow-hidden flex items-center"
        aria-label="Realms Personas Hero"
      >
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(99,60,255,0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(236,72,153,0.25) 0%, transparent 55%), radial-gradient(ellipse 50% 70% at 50% 80%, rgba(59,130,246,0.2) 0%, transparent 60%), #0a0a0a',
          }}
          aria-hidden="true"
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        {/* Mouse dust canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Content */}
        <div ref={heroRef} className="relative z-20 w-full container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="max-w-4xl">
            <p className="hero-item flex items-center gap-3 text-white/40 text-[11px] font-semibold uppercase tracking-[0.25em] mb-7">
              <span className="w-8 h-px bg-white/30" aria-hidden="true"></span>
              {' '}Realms Products
            </p>

            <h1 className="hero-item text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.92] tracking-tight mb-6">
              Realms
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 40%, #ec4899 80%)',
                }}
              >
                Personas
              </span>
            </h1>

            <p className="hero-item text-lg sm:text-xl text-white/55 font-light leading-relaxed mb-10 max-w-xl">
              Avatares de IA conversacional que você treina com seu próprio conteúdo.
              Assistentes inteligentes prontos para dialogar com alunos, professores e equipes.
            </p>

            <div className="hero-item flex flex-wrap gap-4">
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:brightness-110"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                }}
              >
                Criar minha Persona →
              </Link>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-300"
              >
                Solicitar Demo
              </Link>
            </div>

            {/* Floating tags */}
            <div className="hero-item flex flex-wrap gap-3 mt-12">
              {['IA Conversacional', 'Treinável', 'Assistente de Aula', 'Multi-idioma', 'Customizável'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider text-white/50 border border-white/10"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INTRO — O QUE SÃO PERSONAS
      ══════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-24 lg:py-32 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
          aria-hidden="true"
        />
        {/* Glow blob */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '600px',
            height: '600px',
            right: '-100px',
            top: '-100px',
            background:
              'radial-gradient(ellipse 60% 60% at 70% 30%, rgba(139,92,246,0.12) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left */}
            <div ref={capRef}>
              <span className="reveal section-badge mb-6 block">
                <span className="w-5 h-px bg-current" aria-hidden="true"></span>
                {' '}Conversação inteligente
              </span>
              <h2 className="reveal delay-2 text-4xl sm:text-5xl font-extrabold text-white leading-[1.06] mb-6 tracking-tight">
                Avatares que conversam,{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                  }}
                >
                  aprendem
                </span>{' '}
                e evoluem
              </h2>
              <p className="reveal delay-3 text-white/45 text-base leading-relaxed mb-5 font-light">
                Realms Personas são assistentes de IA conversacional com personalidade própria. Cada Persona pode ser treinada com o conteúdo da sua instituição — apostilas, vídeos, documentos e materiais de aula — e passa a responder perguntas como um especialista humano.
              </p>
              <p className="reveal delay-4 text-white/45 text-base leading-relaxed mb-10 font-light">
                Diferente de chatbots genéricos, as Personas carregam sua identidade, seu contexto e sua pedagogia. O resultado: conversas fluidas, respostas precisas e alunos mais engajados em qualquer hora do dia.
              </p>
              <div className="reveal delay-5 flex flex-wrap gap-4">
                <Link
                  to="/contato"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white border border-white/15 hover:border-white/30 hover:text-white transition-all duration-300"
                >
                  Saiba mais →
                </Link>
              </div>
            </div>

            {/* Right — avatar visual */}
            <div className="relative flex items-center justify-center">
              <div
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full flex items-center justify-center"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(139,92,246,0.25) 0%, rgba(59,130,246,0.1) 50%, transparent 70%)',
                  boxShadow: '0 0 80px 20px rgba(139,92,246,0.15)',
                }}
              >
                {/* Orbit ring 1 */}
                <div
                  className="absolute inset-4 rounded-full border border-white/[0.07]"
                  style={{ animation: 'spin 14s linear infinite' }}
                  aria-hidden="true"
                />
                {/* Orbit ring 2 */}
                <div
                  className="absolute inset-12 rounded-full border border-white/[0.05]"
                  style={{ animation: 'spin 22s linear infinite reverse' }}
                  aria-hidden="true"
                />

                {/* Center avatar */}
                <div
                  className="relative z-10 w-32 h-32 rounded-full flex items-center justify-center text-6xl select-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99,60,255,0.3), rgba(236,72,153,0.3))',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 0 40px rgba(139,92,246,0.3)',
                  }}
                >
                  🤖
                </div>

                {/* Floating chat bubble 1 */}
                <div
                  className="absolute -right-4 top-12 bg-[#111] border border-white/10 rounded-2xl rounded-tl-none px-4 py-3 max-w-[180px]"
                  style={{ animation: 'floatY 4s ease-in-out infinite' }}
                  aria-hidden="true"
                >
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    "Explique fotossíntese para mim de forma simples."
                  </p>
                </div>

                {/* Floating chat bubble 2 */}
                <div
                  className="absolute -left-4 bottom-16 bg-[#111] border border-violet-500/20 rounded-2xl rounded-tr-none px-4 py-3 max-w-[180px]"
                  style={{ animation: 'floatY 5s ease-in-out infinite 1s' }}
                  aria-hidden="true"
                >
                  <p className="text-[11px] text-violet-300/80 leading-relaxed">
                    "Claro! Fotossíntese é o processo pelo qual plantas convertem luz solar em energia..."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          CAPABILITIES
      ══════════════════════════════════════ */}
      <section className="bg-[#0d0d0d] py-24 lg:py-32 relative overflow-hidden">
        {/* Background blobs */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            background:
              'radial-gradient(ellipse 55% 60% at 15% 50%, rgba(59,130,246,0.08) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            background:
              'radial-gradient(ellipse 50% 55% at 85% 50%, rgba(236,72,153,0.07) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
          aria-hidden="true"
        />

        <Container>
          <div ref={capRef}>
            <div className="text-center mb-16 lg:mb-20">
              <span className="reveal section-badge mb-4 block">
                <span className="w-5 h-px bg-current" aria-hidden="true"></span>
                {' '}Capacidades
              </span>
              <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Tudo que uma Persona pode fazer
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CAPABILITIES.map((cap, i) => (
                <div
                  key={cap.title}
                  className={`reveal delay-${(i % 6) + 1} relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:border-white/15 transition-all duration-400 group overflow-hidden`}
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${cap.accent}18 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 flex-shrink-0"
                    style={{ background: `${cap.accent}20`, border: `1px solid ${cap.accent}30` }}
                  >
                    {cap.icon}
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{cap.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-24 lg:py-32 relative">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
          aria-hidden="true"
        />
        <Container>
          <div ref={stepsRef}>
            <div className="text-center mb-16">
              <span className="reveal section-badge mb-4 block">
                <span className="w-5 h-px bg-current" aria-hidden="true"></span>
                {' '}Como funciona
              </span>
              <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Em 3 passos simples
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              {/* Connector line (desktop) */}
              <div
                className="hidden lg:block absolute top-10 left-[16.66%] right-[16.66%] h-px pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                  opacity: 0.25,
                }}
                aria-hidden="true"
              />

              {STEPS.map((step, i) => (
                <div key={step.num} className={`reveal delay-${i + 2} text-center`}>
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-extrabold text-white mx-auto mb-6 relative"
                    style={{
                      background: `radial-gradient(circle, ${step.color}30, transparent 70%)`,
                      border: `1px solid ${step.color}40`,
                      boxShadow: `0 0 30px ${step.color}20`,
                    }}
                  >
                    <span
                      className="text-transparent bg-clip-text text-3xl font-black"
                      style={{ backgroundImage: `linear-gradient(135deg, ${step.color}, #fff)` }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-white font-extrabold text-xl mb-3">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          USE CASES
      ══════════════════════════════════════ */}
      <section className="bg-[#0d0d0d] py-24 lg:py-32 relative overflow-hidden">
        {/* Gradient blobs */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '800px',
            height: '800px',
            left: '-200px',
            top: 0,
            background:
              'radial-gradient(ellipse 50% 50% at 20% 50%, rgba(59,130,246,0.1) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: '800px',
            height: '800px',
            right: '-200px',
            bottom: 0,
            background:
              'radial-gradient(ellipse 50% 50% at 80% 50%, rgba(139,92,246,0.1) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <Container>
          <div ref={casesRef}>
            <div className="text-center mb-16">
              <span className="reveal section-badge mb-4 block">
                <span className="w-5 h-px bg-current" aria-hidden="true"></span>
                {' '}Casos de uso
              </span>
              <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Uma Persona para cada contexto
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {USE_CASES.map((uc, i) => (
                <div
                  key={uc.title}
                  className={`reveal delay-${i + 2} relative rounded-3xl p-8 lg:p-10 overflow-hidden border ${uc.border}`}
                  style={{
                    background: `linear-gradient(135deg, rgba(13,13,13,0.9), rgba(13,13,13,0.95))`,
                  }}
                >
                  {/* Bg gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${uc.gradient} pointer-events-none`}
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-4xl">{uc.emoji}</span>
                      <span
                        className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider"
                        style={{
                          background: `${uc.accent}20`,
                          color: uc.accent,
                          border: `1px solid ${uc.accent}30`,
                        }}
                      >
                        {uc.tag}
                      </span>
                    </div>
                    <h3 className="text-white font-extrabold text-2xl mb-4">{uc.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed mb-7 font-light">{uc.desc}</p>
                    <ul className="space-y-3">
                      {uc.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: `${uc.accent}25`, border: `1px solid ${uc.accent}40` }}
                          >
                            <svg
                              className="w-2.5 h-2.5"
                              fill="none"
                              stroke={uc.accent}
                              strokeWidth="3"
                              viewBox="0 0 12 12"
                            >
                              <polyline points="1.5,6 4.5,9 10.5,3" />
                            </svg>
                          </div>
                          <span className="text-white/60 text-sm font-light">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-24 lg:py-32 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
          aria-hidden="true"
        />
        {/* Center glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,60,255,0.12) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />

        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-6">
              <span className="w-5 h-px bg-white/20"></span>
              {' '}Comece agora
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Sua Persona está a{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                }}
              >
                um clique
              </span>
            </h2>
            <p className="text-white/40 text-lg mb-10 font-light leading-relaxed">
              Junte-se a milhares de instituições que já usam Realms Personas para transformar a experiência de aprendizado.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:brightness-110"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                }}
              >
                Criar minha Persona gratuitamente →
              </Link>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white/60 border border-white/12 hover:border-white/25 hover:text-white transition-all duration-300"
              >
                Falar com especialista
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </div>
  )
}
