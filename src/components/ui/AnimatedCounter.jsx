import { useState, useEffect, useRef } from 'react'

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4)
}

/**
 * AnimatedCounter — counts from 0 to `to` when it enters the viewport.
 * @param {number}  to        Target number
 * @param {number}  duration  Animation duration in ms (default 2200)
 * @param {string}  suffix    Text appended after the number (e.g. "K+", "M+")
 * @param {string}  prefix    Text prepended before the number
 */
export default function AnimatedCounter({ to, duration = 2200, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  const raf = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()

          const animate = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = easeOutQuart(progress)
            setCount(Math.round(eased * to))
            if (progress < 1) {
              raf.current = requestAnimationFrame(animate)
            }
          }

          raf.current = requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [to, duration])

  return (
    <span ref={ref} aria-label={`${prefix}${to}${suffix}`}>
      {prefix}
      {count.toLocaleString('pt-BR')}
      {suffix}
    </span>
  )
}
