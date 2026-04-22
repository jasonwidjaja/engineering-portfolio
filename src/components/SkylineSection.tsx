// @ts-nocheck
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { SKYLINE_CARDS, type SkylineCard } from '../data/content'
import ProjectModal from './ProjectModal'

// ── Mobile fallback: static skyline silhouette + 2D card grid ─────────────────
function MobileFallback({ onCardClick }: { onCardClick: (c: SkylineCard) => void }) {
  return (
    <div className="w-full py-8 px-4">
      {/* Simple skyline silhouette via CSS */}
      <div className="relative h-24 mb-8 overflow-hidden opacity-30" aria-hidden>
        {[...Array(18)].map((_, i) => {
          const h = 24 + Math.sin(i * 1.7) * 40 + (i === 3 ? 40 : 0) + (i === 7 ? 55 : 0) + (i === 11 ? 30 : 0)
          return (
            <div
              key={i}
              className="absolute bottom-0 bg-neutral-600"
              style={{ left: `${(i / 18) * 100}%`, width: '4.5%', height: `${h}px` }}
            />
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SKYLINE_CARDS.map((card) => (
          <button
            key={card.id}
            onClick={() => onCardClick(card)}
            className="text-left p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-600 transition-colors"
          >
            <span
              className="text-[11px] font-semibold tracking-wider uppercase block mb-1"
              style={{ color: card.accent === 'blue' ? '#3b82f6' : '#22c55e' }}
            >
              {card.category}
            </span>
            <p className="text-white font-bold text-sm mb-1">{card.name}</p>
            <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2">{card.cardDescription}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = React.ComponentType<any>

// ── Lazy-loaded Three.js scene ─────────────────────────────────────────────────
function LazyCanvas({ scrollProgress, onCardClick, reducedMotion }: {
  scrollProgress: number
  onCardClick: (c: SkylineCard) => void
  reducedMotion: boolean
}) {
  const [Canvas, setCanvas] = useState<AnyComponent | null>(null)

  useEffect(() => {
    import('./SkylineCanvas').then((mod) => setCanvas(() => mod.default))
  }, [])

  if (!Canvas) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-neutral-700 border-t-neutral-400 animate-spin" />
      </div>
    )
  }

  return (
    <Canvas
      cards={SKYLINE_CARDS}
      scrollProgress={scrollProgress}
      onCardClick={onCardClick}
      reducedMotion={reducedMotion}
    />
  )
}

// ── Section component ──────────────────────────────────────────────────────────
export default function SkylineSection() {
  const [selectedCard, setSelectedCard] = useState<SkylineCard | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)

  // Detect mobile / reduced motion
  useEffect(() => {
    const mobile =
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency < 4)
    setIsMobile(mobile)
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Lazy init Three.js scene when section enters viewport
  useEffect(() => {
    if (isMobile) return
    const el = canvasWrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSceneReady(true); observer.disconnect() } },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isMobile])

  // Scroll-driven camera progress
  useEffect(() => {
    if (isMobile) return
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const totalScrollable = section.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      setScrollProgress(Math.min(1, scrolled / totalScrollable))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  const handleCardClick = useCallback((card: SkylineCard) => setSelectedCard(card), [])

  return (
    <>
      <ProjectModal card={selectedCard} onClose={() => setSelectedCard(null)} />

      <section id="skyline" ref={sectionRef} aria-label="NYC skyline with project showcase">
        {isMobile ? (
          // Mobile: flat card grid
          <div className="bg-[#0a0a0a] border-t border-neutral-900 py-12 px-4">
            <p className="text-center text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-8">
              Projects &amp; Experience
            </p>
            <MobileFallback onCardClick={handleCardClick} />
          </div>
        ) : (
          // Desktop: 300vh scroll-pinned Three.js scene
          <div style={{ height: '300vh' }}>
            <div className="sticky top-0 h-screen overflow-hidden" ref={canvasWrapRef}>
              {/* Section label */}
              <div className="absolute top-8 left-0 right-0 z-10 text-center pointer-events-none">
                <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase">
                  Projects &amp; Experience
                </p>
              </div>

              {/* Instruction hint */}
              <div className="absolute bottom-8 left-0 right-0 z-10 text-center pointer-events-none">
                <p className="text-[11px] text-neutral-700 tracking-wide">
                  Hover to highlight · Click to explore · Scroll to move through the scene
                </p>
              </div>

              {/* Three.js canvas */}
              <div className="absolute inset-0">
                {sceneReady && (
                  <LazyCanvas
                    scrollProgress={scrollProgress}
                    onCardClick={handleCardClick}
                    reducedMotion={reducedMotion}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
