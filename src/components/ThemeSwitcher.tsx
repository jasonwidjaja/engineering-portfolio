// @ts-nocheck
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col-reverse items-start gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col gap-0.5 p-1.5 rounded-2xl border border-white/[0.07]"
            style={{
              background: 'rgba(12,12,12,0.94)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTheme(t); setOpen(false) }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all text-left w-full"
                style={{
                  background: theme.id === t.id ? `rgba(${t.accentRgb},0.14)` : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (theme.id !== t.id)
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={(e) => {
                  if (theme.id !== t.id)
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                }}
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    background: t.accent,
                    boxShadow: theme.id === t.id ? `0 0 6px ${t.accent}80` : 'none',
                  }}
                />
                <span className="text-xs font-medium text-neutral-300 whitespace-nowrap">
                  {t.name}
                </span>
                {theme.id === t.id && (
                  <svg className="ml-auto flex-shrink-0" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke={t.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
        style={{
          background: `rgba(${theme.accentRgb},0.10)`,
          border: `1px solid rgba(${theme.accentRgb},0.22)`,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.background = `rgba(${theme.accentRgb},0.20)`
          el.style.borderColor = `rgba(${theme.accentRgb},0.40)`
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.background = `rgba(${theme.accentRgb},0.10)`
          el.style.borderColor = `rgba(${theme.accentRgb},0.22)`
        }}
        aria-label="Switch color theme"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      </button>
    </div>
  )
}
