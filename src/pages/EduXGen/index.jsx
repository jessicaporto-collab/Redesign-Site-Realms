import { useRef, useEffect } from 'react'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import AnimatedCounter from '../../components/ui/AnimatedCounter'

// ── Shared hook: reveal on scroll ──────────────────────────────────────────
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

// ── Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  const parallaxRef = useRef(null)
  const contentRef = useRef(null)

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.38}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Entrance animation
  useEffect(() => {
    const items = contentRef.current?.querySelectorAll('.hero-item')
    if (!items) return
    items.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      setTimeout(() => {
        el.style.transition =
          'opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 300 + i * 130)
    })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#05050f]">
      {/* Parallax layer */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 85% 65% at 15% 45%, rgba(37,99,235,0.42) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 85% 55%, rgba(99,60,255,0.28) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* Centre glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)' }}
      />

      <Container>
        <div
          ref={contentRef}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-32 pb-28"
        >
          {/* Left: copy */}
          <div>
            <p className="hero-item flex items-center gap-3 text-white/40 text-[11px] font-semibold uppercase tracking-[0.25em] mb-7">
              <span className="w-8 h-px bg-white/30" aria-hidden="true" />
              Realms Products
            </p>

            <div className="hero-item flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-3xl">
                🤖
              </div>
              <span className="text-blue-400/80 text-sm font-semibold tracking-wide">EduXGen.ai</span>
            </div>

            <h1 className="hero-item text-5xl sm:text-6xl lg:text-[4.25rem] font-extrabold text-white leading-[0.95] tracking-tight mb-6">
              Crie aulas,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400">
                tarefas e provas
              </span>
              <br />
              com IA
            </h1>

            <p className="hero-item text-white/45 text-lg leading-relaxed max-w-xl mb-10 font-light">
              A plataforma que transforma sua ideia em conteúdo educacional completo em segundos — para
              qualquer nível de ensino, disciplina e objetivo pedagógico.
            </p>

            <div className="hero-item flex flex-wrap gap-4">
              <Button to="/contato" size="lg" variant="primary">
                Começar Grátis
              </Button>
              <Button to="/contato" size="lg" variant="outline-white">
                Ver Demo
              </Button>
            </div>

            {/* Quick stats */}
            <div className="hero-item flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/[0.07]">
              {[
                { value: '2M+', label: 'conteúdos gerados' },
                { value: '50K+', label: 'educadores ativos' },
                { value: '< 5s', label: 'por plano de aula' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-white text-xl font-extrabold leading-none">{value}</p>
                  <p className="text-white/35 text-xs mt-1 font-light">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: AI output preview */}
          <div className="hero-item relative hidden lg:block">
            <div className="relative rounded-3xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 to-violet-600/4 pointer-events-none" />

              {/* Prompt input */}
              <div className="bg-white/[0.04] rounded-2xl p-5 border border-white/[0.07] mb-6">
                <p className="text-white/25 text-[10px] font-mono uppercase tracking-widest mb-2">
                  Prompt
                </p>
                <p className="text-white/55 text-sm leading-relaxed italic">
                  "Crie um plano de aula sobre frações para o 5º ano do fundamental, com
                  exercícios práticos e avaliação diagnóstica alinhada à BNCC..."
                </p>
              </div>

              {/* AI output */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="w-2 h-2 rounded-full bg-green-400"
                    style={{ animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }}
                  />
                  <span className="text-green-400/70 text-xs font-mono">IA gerando conteúdo…</span>
                </div>
                <div className="space-y-2">
                  {[
                    '📚 Plano de aula — Frações · 5º Ano',
                    '✅ Avaliação diagnóstica criada',
                    '📝 15 questões geradas (fácil → difícil)',
                    '🎯 Alinhamento BNCC EF05MA08',
                    '📊 Rubrica de correção com gabarito',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 bg-white/[0.035] rounded-xl px-4 py-2.5 border border-white/[0.05]"
                    >
                      <span className="text-sm text-white/65">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-violet-600 rounded-2xl px-4 py-2 shadow-2xl">
              <p className="text-white text-xs font-bold">AI-Powered</p>
            </div>
            <div className="absolute -bottom-5 -left-4 bg-[#111] border border-white/10 rounded-2xl px-4 py-3 shadow-2xl">
              <p className="text-white text-sm font-extrabold">5 segundos</p>
              <p className="text-white/35 text-xs font-light">para uma aula completa</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  )
}

// ── Features ───────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: '📚',
    title: 'Planos de Aula',
    desc: 'Gere planos completos com objetivos, metodologia, recursos e avaliação alinhados à BNCC em segundos.',
    accent: 'border-blue-500/20 bg-blue-600/10 text-blue-400',
  },
  {
    icon: '📝',
    title: 'Banco de Questões',
    desc: 'Crie exercícios, questões dissertativas e de múltipla escolha em qualquer nível de dificuldade.',
    accent: 'border-violet-500/20 bg-violet-600/10 text-violet-400',
  },
  {
    icon: '✅',
    title: 'Avaliações & Simulados',
    desc: 'Provas personalizadas com gabarito automático, rubrica de correção e análise de desempenho.',
    accent: 'border-emerald-500/20 bg-emerald-600/10 text-emerald-400',
  },
  {
    icon: '🎯',
    title: 'Tarefas & Atividades',
    desc: 'Atividades de fixação, projetos e desafios adaptados ao perfil e ao ritmo da turma.',
    accent: 'border-amber-500/20 bg-amber-600/10 text-amber-400',
  },
  {
    icon: '📊',
    title: 'Planos de Estudo',
    desc: 'Cronogramas personalizados baseados em objetivos pedagógicos, prazos e lacunas de aprendizado.',
    accent: 'border-sky-500/20 bg-sky-600/10 text-sky-400',
  },
  {
    icon: '🌐',
    title: 'Multilíngue',
    desc: 'Conteúdo gerado em português, inglês e espanhol com adaptações culturais automáticas.',
    accent: 'border-indigo-500/20 bg-indigo-600/10 text-indigo-400',
  },
]

function FeaturesSection() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section className="bg-[#0a0a0a] py-24 lg:py-32 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef}>
          <div className="text-center mb-16">
            <span className="reveal section-badge mb-4 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              O que a IA cria para você
            </span>
            <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
              Tudo que você precisa,&nbsp;
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                gerado em segundos
              </span>
            </h2>
            <p className="reveal delay-3 text-white/40 mt-5 max-w-xl mx-auto font-light leading-relaxed">
              Do ensino infantil ao ensino superior, o EduXGen.ai adapta conteúdo ao nível, disciplina
              e objetivo de cada educador.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`reveal delay-${Math.min(i + 2, 6)} card-dark p-7 group hover:-translate-y-1.5 transition-all duration-300`}
              >
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center text-2xl mb-5 ${f.accent} transition-transform duration-300 group-hover:scale-110`}
                >
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ── How It Works ───────────────────────────────────────────────────────────
const STEPS = [
  {
    n: '01',
    icon: '✍️',
    title: 'Descreva a necessidade',
    desc: 'Digite o tema, nível de ensino, disciplina e tipo de conteúdo. Nossa IA entende linguagem natural.',
  },
  {
    n: '02',
    icon: '⚡',
    title: 'IA gera o conteúdo',
    desc: 'Em segundos, você recebe material completo, estruturado e alinhado às diretrizes curriculares.',
  },
  {
    n: '03',
    icon: '🚀',
    title: 'Personalize e exporte',
    desc: 'Edite, ajuste o tom, insira sua marca e exporte em PDF, Word ou integre direto ao seu LMS.',
  },
]

function HowItWorksSection() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section className="bg-[#07070f] py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle aurora */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef}>
          <div className="text-center mb-16">
            <span className="reveal section-badge mb-4 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              Como funciona
            </span>
            <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Simples assim
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            {/* Connector */}
            <div
              className="hidden lg:block absolute top-14 left-[33.3%] right-[33.3%] h-px bg-gradient-to-r from-blue-600/30 via-violet-600/30 to-blue-600/30"
              aria-hidden="true"
            />

            {STEPS.map((step, i) => (
              <div key={step.n} className={`reveal delay-${i + 2} relative`}>
                <div className="card-dark p-8 h-full group hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-3xl">{step.icon}</span>
                    <span className="text-[11px] font-bold text-white/18 font-mono tracking-widest">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light">{step.desc}</p>
                </div>

                {i < 2 && (
                  <div
                    className="hidden lg:flex absolute -right-3 top-14 z-10 w-6 h-6 rounded-full bg-[#0d0d0d] border border-white/[0.08] items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-3 h-3 text-white/25"
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

// ── Teaching Levels ────────────────────────────────────────────────────────
const LEVELS = [
  {
    emoji: '🧒',
    title: 'Educação Infantil',
    age: '0–5 anos',
    tags: ['Histórias interativas', 'Atividades lúdicas', 'Jogos pedagógicos'],
    gradient: 'from-yellow-600/15 to-orange-600/8',
    border: 'border-yellow-500/15',
  },
  {
    emoji: '📖',
    title: 'Ensino Fundamental',
    age: '6–14 anos',
    tags: ['Planos de aula', 'Exercícios BNCC', 'Avaliações diagnósticas'],
    gradient: 'from-blue-600/15 to-blue-800/8',
    border: 'border-blue-500/15',
  },
  {
    emoji: '🎓',
    title: 'Ensino Médio',
    age: '15–17 anos',
    tags: ['Simulados ENEM', 'Redações', 'Projetos interdisciplinares'],
    gradient: 'from-violet-600/15 to-violet-800/8',
    border: 'border-violet-500/15',
  },
  {
    emoji: '🏛️',
    title: 'Ensino Superior',
    age: 'Graduação & Pós',
    tags: ['Estudos de caso', 'Rubricas acadêmicas', 'Planos de ensino'],
    gradient: 'from-emerald-600/15 to-emerald-800/8',
    border: 'border-emerald-500/15',
  },
  {
    emoji: '💼',
    title: 'Corporativo & Técnico',
    age: 'Treinamento profissional',
    tags: ['Trilhas LMS', 'Certificações T&D', 'Onboarding automatizado'],
    gradient: 'from-indigo-600/15 to-indigo-800/8',
    border: 'border-indigo-500/15',
  },
]

function LevelsSection() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section className="bg-[#0a0a0a] py-24 lg:py-32 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-20 items-start">
          {/* Left sticky */}
          <div className="lg:sticky lg:top-28">
            <span className="reveal section-badge mb-6 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              Para qualquer nível
            </span>
            <h2 className="reveal delay-2 text-4xl sm:text-5xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
              Do Infantil
              <br />
              ao Corporativo
            </h2>
            <p className="reveal delay-3 text-white/40 leading-relaxed mb-10 font-light">
              Nossa IA adapta automaticamente a linguagem, a profundidade e o formato do conteúdo de
              acordo com o nível de ensino, sem nenhuma configuração técnica.
            </p>
            <div className="reveal delay-4">
              <Button to="/contato" size="lg" variant="outline-white">
                Solicitar Demo &nbsp;→
              </Button>
            </div>
          </div>

          {/* Right: level cards */}
          <div className="space-y-4">
            {LEVELS.map((level, i) => (
              <div
                key={level.title}
                className={`reveal delay-${Math.min(i + 2, 6)} flex items-start gap-5 p-5 rounded-2xl bg-gradient-to-r ${level.gradient} border ${level.border} hover:border-white/15 transition-all duration-300 cursor-default group`}
              >
                <div className="text-3xl pt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {level.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-bold">{level.title}</h3>
                    <span className="text-white/30 text-xs border border-white/10 px-2 py-0.5 rounded-full">
                      {level.age}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {level.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-white/50 text-xs bg-white/[0.05] px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ── Stats ──────────────────────────────────────────────────────────────────
const STATS = [
  { to: 2, suffix: 'M+', label: 'Conteúdos gerados' },
  { to: 50, suffix: 'K+', label: 'Educadores ativos' },
  { to: 98, suffix: '%', label: 'Satisfação dos usuários' },
  { to: 120, suffix: '+', label: 'Tipos de conteúdo' },
  { to: 3, suffix: '+', label: 'Idiomas suportados' },
  { to: 5, suffix: 'seg', label: 'Para gerar um plano completo' },
]

function StatsSection() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section id="eduxgen-stats" className="bg-[#0d0d0d] py-20 lg:py-28 relative overflow-hidden">
      {/* Aurora blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 75% at 15% 50%, rgba(29,78,216,0.7) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 85% 50%, rgba(99,60,255,0.65) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef}>
          <div className="text-center mb-20 lg:mb-24">
            <span className="reveal section-badge mb-4 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              EduXGen em números
            </span>
            <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Resultados reais
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`reveal delay-${Math.min(i + 1, 6)} bg-[#0d0d0d] hover:bg-[#131313] transition-colors duration-300 p-8 lg:p-10 text-center group cursor-default`}
              >
                <div className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white mb-2 tabular-nums leading-none group-hover:text-blue-300 transition-colors duration-300">
                  <AnimatedCounter to={stat.to} suffix={stat.suffix} duration={2000} />
                </div>
                <p className="text-xs sm:text-sm text-white/35 font-light leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ── Testimonials ───────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      'Em 5 minutos crio avaliações completas alinhadas ao currículo. É como ter um assistente pedagógico sempre disponível. Revolucionou minha prática.',
    author: 'Prof. Carlos Mendes',
    role: 'Coordenador de Ensino',
    org: 'Rede Municipal RJ',
    initials: 'CM',
    accent: 'bg-blue-600',
  },
  {
    quote:
      'O EduXGen me economiza pelo menos 8 horas por semana. Consigo focar no que realmente importa: ensinar e interagir com meus alunos.',
    author: 'Profa. Ana Beatriz',
    role: 'Professora de Ciências',
    org: 'Colégio Estadual MG',
    initials: 'AB',
    accent: 'bg-violet-600',
  },
  {
    quote:
      'Implementamos o EduXGen em toda a rede e a padronização do conteúdo melhorou muito. Os professores adoram a facilidade de uso.',
    author: 'Marcos Oliveira',
    role: 'Diretor Pedagógico',
    org: 'Secretaria de Educação SP',
    initials: 'MO',
    accent: 'bg-emerald-600',
  },
]

function TestimonialsSection() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section className="bg-[#090909] py-20 lg:py-28">
      <Container>
        <div ref={sectionRef}>
          <div className="text-center mb-14">
            <span className="reveal section-badge mb-4 block">
              <span className="w-5 h-px bg-current" aria-hidden="true" />
              Depoimentos
            </span>
            <h2 className="reveal delay-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Quem usa, aprova
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((item, i) => (
              <article
                key={item.author}
                className={`reveal delay-${i + 2} card-dark p-7 hover:-translate-y-1 transition-transform duration-300`}
              >
                <div className="flex gap-1 mb-5" aria-label="5 de 5 estrelas">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg
                      key={`star-${item.author}-${s}`}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-white/55 text-sm leading-relaxed mb-6 font-light">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${item.accent} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                    aria-hidden="true"
                  >
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-semibold">{item.author}</p>
                    <p className="text-white/35 text-xs font-light">
                      {item.role} · {item.org}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ── CTA ────────────────────────────────────────────────────────────────────
function CTASection() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  useEffect(() => {
    const PARTICLES_CONFIG = {
      particles: {
        number: { value: 130, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
        opacity: {
          value: 0.5,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
        },
        size: { value: 2.5, random: true, anim: { enable: false } },
        line_linked: { enable: false },
        move: {
          enable: true,
          speed: 0.9,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'bubble' },
          onclick: { enable: true, mode: 'repulse' },
          resize: true,
        },
        modes: {
          bubble: { distance: 220, size: 0, duration: 2, opacity: 0, speed: 3 },
          repulse: { distance: 350, duration: 0.4 },
        },
      },
      retina_detect: true,
    }

    const CONTAINER_ID = 'eduxgen-cta-particles'

    const init = () => {
      if (window.particlesJS) window.particlesJS(CONTAINER_ID, PARTICLES_CONFIG)
    }

    if (window.particlesJS) {
      init()
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
      script.async = true
      script.onload = init
      document.body.appendChild(script)
    }

    return () => {
      if (window.pJSDom?.length > 0) {
        window.pJSDom.forEach((dom) => dom.pJS.fn.vendors.destroypJS())
        window.pJSDom = []
      }
    }
  }, [])

  return (
    <section className="relative bg-[#060610] py-28 lg:py-40 overflow-hidden">
      <div
        id="eduxgen-cta-particles"
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 65% at 50% 50%, rgba(37,99,235,0.22) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <Container>
        <div ref={sectionRef} className="relative z-10 text-center max-w-3xl mx-auto">
          <span className="reveal section-badge mb-6 block justify-center">
            <span className="w-5 h-px bg-current" aria-hidden="true" />
            Comece hoje mesmo
          </span>

          <h2 className="reveal delay-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Revolucione sua
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              criação de conteúdo
            </span>
          </h2>

          <p className="reveal delay-3 text-white/40 text-lg mb-10 leading-relaxed font-light max-w-xl mx-auto">
            Junte-se a mais de 50.000 educadores que já automatizaram a criação de conteúdo
            educacional com inteligência artificial.
          </p>

          <div className="reveal delay-4 flex flex-wrap gap-4 justify-center">
            <Button to="/contato" size="xl" variant="white">
              Começar Grátis
            </Button>
            <Button to="/contato" size="xl" variant="outline-white">
              Agendar Demo
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ── Main export ────────────────────────────────────────────────────────────
export default function EduXGen() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <LevelsSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
