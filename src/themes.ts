export interface Theme {
  id: string
  name: string
  accent: string
  accentDark: string
  accentRgb: string   // "r,g,b" for rgba() usage
  accentLight: string // lighter tint for text on dark bg
  bg: string
  bgNum: number       // bg as Three.js hex int for fog
  threePrimary: number
  threeSecondary: number
}

export const THEMES: Theme[] = [
  {
    id: 'emerald',
    name: 'Emerald',
    accent: '#22c55e',
    accentDark: '#16a34a',
    accentRgb: '34,197,94',
    accentLight: '#86efac',
    bg: '#0a0a0a',
    bgNum: 0x0a0a0a,
    threePrimary: 0x22c55e,
    threeSecondary: 0x3b82f6,
  },
  {
    id: 'violet',
    name: 'Violet',
    accent: '#8b5cf6',
    accentDark: '#6d28d9',
    accentRgb: '139,92,246',
    accentLight: '#c4b5fd',
    bg: '#07050f',
    bgNum: 0x07050f,
    threePrimary: 0x8b5cf6,
    threeSecondary: 0x06b6d4,
  },
  {
    id: 'amber',
    name: 'Amber',
    accent: '#f59e0b',
    accentDark: '#d97706',
    accentRgb: '245,158,11',
    accentLight: '#fcd34d',
    bg: '#0a0800',
    bgNum: 0x0a0800,
    threePrimary: 0xf59e0b,
    threeSecondary: 0xef4444,
  },
  {
    id: 'ocean',
    name: 'Ocean',
    accent: '#06b6d4',
    accentDark: '#0891b2',
    accentRgb: '6,182,212',
    accentLight: '#67e8f9',
    bg: '#030d1a',
    bgNum: 0x030d1a,
    threePrimary: 0x06b6d4,
    threeSecondary: 0x3b82f6,
  },
  {
    id: 'rose',
    name: 'Rose',
    accent: '#f43f5e',
    accentDark: '#e11d48',
    accentRgb: '244,63,94',
    accentLight: '#fda4af',
    bg: '#0f0508',
    bgNum: 0x0f0508,
    threePrimary: 0xf43f5e,
    threeSecondary: 0xfb923c,
  },
  // ── NYC-style themes ──────────────────────────────────────────────────────
  {
    id: 'blueprint',
    name: 'Blueprint',
    accent: '#67e8f9',
    accentDark: '#0891b2',
    accentRgb: '103,232,249',
    accentLight: '#a5f3fc',
    bg: '#0d1520',
    bgNum: 0x0d1520,
    threePrimary: 0x67e8f9,
    threeSecondary: 0x3b82f6,
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    accent: '#e85d04',
    accentDark: '#c2410c',
    accentRgb: '232,93,4',
    accentLight: '#fb923c',
    bg: '#141412',
    bgNum: 0x141412,
    threePrimary: 0xe85d04,
    threeSecondary: 0xfbbf24,
  },
  {
    id: 'neon',
    name: 'Neon District',
    accent: '#e879f9',
    accentDark: '#a21caf',
    accentRgb: '232,121,249',
    accentLight: '#f0abfc',
    bg: '#050a18',
    bgNum: 0x050a18,
    threePrimary: 0xe879f9,
    threeSecondary: 0xfde047,
  },
  {
    id: 'gold',
    name: 'Gold District',
    accent: '#c9a227',
    accentDark: '#92400e',
    accentRgb: '201,162,39',
    accentLight: '#fcd34d',
    bg: '#0f0e0c',
    bgNum: 0x0f0e0c,
    threePrimary: 0xc9a227,
    threeSecondary: 0xf59e0b,
  },
  {
    id: 'midnight',
    name: 'Midnight Steel',
    accent: '#60a5fa',
    accentDark: '#2563eb',
    accentRgb: '96,165,250',
    accentLight: '#93c5fd',
    bg: '#080c12',
    bgNum: 0x080c12,
    threePrimary: 0x60a5fa,
    threeSecondary: 0x818cf8,
  },
]

export const DEFAULT_THEME = THEMES[0]
