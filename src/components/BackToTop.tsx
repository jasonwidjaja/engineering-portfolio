import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: `rgba(${theme.accentRgb},0.15)`, border: `1px solid rgba(${theme.accentRgb},0.3)` }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `rgba(${theme.accentRgb},0.25)`; e.currentTarget.style.borderColor = `rgba(${theme.accentRgb},0.5)` }}
          onMouseLeave={(e) => { e.currentTarget.style.background = `rgba(${theme.accentRgb},0.15)`; e.currentTarget.style.borderColor = `rgba(${theme.accentRgb},0.3)` }}
          aria-label="Back to top"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
