import Container from './Container'

export default function PageHero({
  title,
  subtitle,
  gradient = 'from-blue-600 via-blue-700 to-indigo-800',
  icon,
  label,
  children,
}) {
  return (
    <section
      className={`relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br ${gradient} overflow-hidden`}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl">
          {label && (
            <p className="text-blue-200 font-semibold text-sm uppercase tracking-widest mb-4">
              {label}
            </p>
          )}
          {icon && <div className="text-6xl mb-6">{icon}</div>}
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg lg:text-xl text-white/75 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  )
}
