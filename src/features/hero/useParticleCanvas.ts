import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
}

const PARTICLE_COUNT = 45
const CONNECTION_DISTANCE = 120

export function useParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let animationFrame = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight ?? window.innerHeight
    }

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? '#FF3722' : '#FFFFFF',
      alpha: Math.random() * 0.5 + 0.2,
    })

    const resetParticle = (p: Particle) => {
      p.x = Math.random() * canvas.width
      p.y = Math.random() * canvas.height
      p.vx = (Math.random() - 0.5) * 0.8
      p.vy = (Math.random() - 0.5) * 0.8
      p.radius = Math.random() * 2 + 1
      p.color = Math.random() > 0.4 ? '#FF3722' : '#FFFFFF'
      p.alpha = Math.random() * 0.5 + 0.2
    }

    const drawConnections = (a: Particle, b: Particle, dist: number) => {
      ctx.save()
      ctx.globalAlpha = (1 - dist / CONNECTION_DISTANCE) * 0.25
      ctx.strokeStyle = '#FF3722'
      ctx.lineWidth = 0.8
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
      ctx.restore()
    }

    const drawParticle = (p: Particle) => {
      ctx.save()
      ctx.globalAlpha = p.alpha
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const update = (p: Particle) => {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
        resetParticle(p)
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        update(particles[i])
        drawParticle(particles[i])

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DISTANCE) {
            drawConnections(particles[i], particles[j], dist)
          }
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }

    resizeCanvas()
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle)

    /**
     * Con movimiento reducido se dibuja un único fotograma estático y el bucle
     * no arranca: 60 redesir por segundo de movimiento de fondo es exactamente
     * el tipo de estímulo que este ajuste existe para desactivar (WCAG 2.3.3).
     */
    if (prefersReducedMotion()) {
      for (const particle of particles) drawParticle(particle)
      window.addEventListener('resize', resizeCanvas)
      return () => {
        window.removeEventListener('resize', resizeCanvas)
      }
    }

    animate()

    window.addEventListener('resize', resizeCanvas)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return canvasRef
}
