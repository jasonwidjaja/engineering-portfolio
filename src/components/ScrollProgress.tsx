// @ts-nocheck
import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)
  const { theme } = useTheme()

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      setPct(scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none">
      <div style={{
        width: `${pct * 100}%`,
        background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentDark})`,
        boxShadow: `0 0 8px rgba(${theme.accentRgb},0.7)`,
        height: '100%',
        transition: 'background 0.5s, box-shadow 0.5s',
      }} />
    </div>
  )
}
