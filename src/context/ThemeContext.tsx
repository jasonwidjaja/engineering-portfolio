import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type ThemeConfig, THEMES, DEFAULT_THEME } from '../data/themes'

interface ThemeContextValue {
  theme: ThemeConfig
  setTheme: (t: ThemeConfig) => void
  themes: ThemeConfig[]
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  themes: THEMES,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme-v3')
      return THEMES.find((t) => t.id === saved) ?? DEFAULT_THEME
    } catch {
      return DEFAULT_THEME
    }
  })

  const setTheme = (t: ThemeConfig) => {
    setThemeState(t)
    try {
      localStorage.setItem('portfolio-theme-v3', t.id)
    } catch {}
  }

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--accent', theme.accent)
    root.style.setProperty('--accent-rgb', theme.accentRgb)
    root.style.setProperty('--bg', theme.background)
    document.body.style.backgroundColor = theme.background
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
