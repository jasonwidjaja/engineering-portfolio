import { useEffect, useRef, useState, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'
import { SCENE_PROJECTS } from '../data/themes'

function isMobile(): boolean {
  return (navigator.hardwareConcurrency ?? 4) < 4 || window.innerWidth < 768
}

export default function ThreeSceneSection({ onCardClick }: { onCardClick: (id: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null)
  const [loading, setLoading] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [optedIn, setOptedIn] = useState(false)
  const { theme } = useTheme()

  const disposeScene = useCallback(() => {
    if (sceneRef.current) {
      sceneRef.current.dispose()
      sceneRef.current = null
    }
  }, [])

  const loadScene = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    setLoading(true)
    disposeScene()

    try {
      const m = await import('../scenes/PegboardScene')
      const SceneClass = m.PegboardScene

      const scene = new SceneClass()
      sceneRef.current = scene
      scene.init(canvas, SCENE_PROJECTS, onCardClick)
    } catch (err) {
      console.error('Scene load error:', err)
    } finally {
      setLoading(false)
    }
  }, [theme, onCardClick, disposeScene])

  // Detect mobile on mount
  useEffect(() => {
    setMobile(isMobile())
  }, [])

  // Load scene when theme changes or user opts in
  useEffect(() => {
    if (mobile && !optedIn) return
    loadScene()
    return () => {
      disposeScene()
    }
  }, [theme, mobile, optedIn, loadScene, disposeScene])

  // Resize observer
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry && sceneRef.current) {
        const { width, height } = entry.contentRect
        sceneRef.current.resize(width, height)
      }
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!sceneRef.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const viewH = window.innerHeight
      const scrollable = rect.height - viewH
      const scrollProgress = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0
      sceneRef.current.onScroll(scrollProgress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (mobile && !optedIn) {
    return (
      <section
        style={{
          minHeight: '100vh',
          backgroundColor: theme.background,
          padding: '40px 24px',
          position: 'relative',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 16, fontSize: 14 }}>
            3D scenes require a capable GPU
          </p>
          <button
            onClick={() => setOptedIn(true)}
            style={{
              padding: '12px 28px',
              border: `1px solid ${theme.accent}`,
              color: theme.accent,
              background: 'transparent',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 14,
              fontFamily: 'monospace',
            }}
          >
            Try 3D View
          </button>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {SCENE_PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => onCardClick(project.id)}
              style={{
                border: `1px solid rgba(${theme.accentRgb},0.3)`,
                borderRadius: 8,
                padding: 20,
                cursor: 'pointer',
                backgroundColor: 'rgba(255,255,255,0.03)',
                transition: 'border-color 0.2s',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: theme.accent,
                  fontFamily: 'monospace',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                }}
              >
                {project.category}
                {project.featured && ' · Featured'}
              </div>
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>{project.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.5 }}>
                {project.tagline}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      style={{ height: '550vh', position: 'relative' }}
    >
      {/* Sticky canvas that pans as user scrolls through the section */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
        {/* Scroll hint */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.38)',
            fontSize: 11,
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          SCROLL TO EXPLORE →
        </div>
        {loading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.6)',
              zIndex: 10,
            }}
          >
            <div className="loading-spinner" />
          </div>
        )}
      </div>
    </section>
  )
}
