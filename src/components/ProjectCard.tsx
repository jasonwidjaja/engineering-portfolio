// @ts-nocheck
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import type { SkylineCard } from '../data/content'

interface CardProps {
  card: SkylineCard
  onOpen: (card: SkylineCard) => void
}

function cardAccent(accent: string, themeAccent: string): string {
  if (accent === 'blue')   return '#60a5fa'
  if (accent === 'purple') return '#a855f7'
  if (accent === 'amber')  return '#f59e0b'
  return themeAccent
}

// ── Exploded Assembly ──────────────────────────────────────────────────────────
function ExplodedCard({ card, onOpen }: CardProps) {
  const { theme } = useTheme()
  const accent = cardAccent(card.accent, theme.colors.accent)
  return (
    <div
      className="exploded-card cursor-pointer rounded-sm overflow-hidden"
      style={{ background: theme.colors.cardBackground, border: `1px solid ${theme.colors.cardBorder}` }}
      onClick={() => onOpen(card)}
    >
      {/* Layer 1: Image */}
      <div className="exploded-layer exploded-layer-image">
        {card.image ? (
          <div className="relative overflow-hidden" style={{ height: '110px' }}>
            <img src={card.image} alt={card.name} className="w-full h-full object-cover" style={{ filter: 'brightness(0.75)' }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 30%, ${theme.colors.background}cc)` }} />
          </div>
        ) : (
          <div className="h-10" style={{ background: `linear-gradient(135deg, ${accent}15, transparent)` }} />
        )}
        <div className="exploded-connector" />
      </div>

      {/* Layer 2: Title + description */}
      <div className="exploded-layer exploded-layer-body px-4 py-3 relative">
        <span className="text-[10px] font-mono tracking-widest uppercase block mb-1" style={{ color: accent }}>
          {card.category}
        </span>
        <h3 className="font-semibold text-sm leading-snug mb-2" style={{ color: theme.colors.text, fontFamily: theme.font.heading }}>
          {card.name}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: theme.colors.textMuted }}>
          {card.cardDescription}
        </p>
        <div className="exploded-connector" />
      </div>

      {/* Layer 3: Tags */}
      <div className="exploded-layer exploded-layer-tags px-4 pb-4">
        <div className="flex flex-wrap gap-1 mt-1">
          {card.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[9px] font-mono rounded"
              style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}30` }}
            >{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Blueprint Panel ────────────────────────────────────────────────────────────
function BlueprintCard({ card, onOpen }: CardProps) {
  const { theme } = useTheme()
  const accent = cardAccent(card.accent, theme.colors.accent)
  const drawingId = `DWG-${card.id.slice(0, 4).toUpperCase()}`

  return (
    <div
      className="blueprint-card cursor-pointer rounded-sm p-5 relative"
      style={{ background: theme.colors.cardBackground, border: `1px solid ${theme.colors.cardBorder}` }}
      onClick={() => onOpen(card)}
    >
      {/* Scan lines overlay */}
      <div className="scan-lines absolute inset-0 pointer-events-none" aria-hidden />

      {/* Content above scan lines */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[9px] font-mono opacity-50" style={{ color: accent }}>{drawingId}</span>
          <div className="flex-1 h-px" style={{ background: `${accent}25` }} />
        </div>
        <span className="text-[10px] font-mono tracking-widest uppercase block mb-1" style={{ color: accent }}>
          {card.category}
        </span>
        <h3 className="text-sm font-semibold mb-2.5 leading-snug" style={{ color: theme.colors.text, fontFamily: theme.font.heading }}>
          {card.name}
        </h3>
        {card.image && (
          <div className="overflow-hidden mb-3 opacity-70" style={{ height: '80px', borderLeft: `2px solid ${accent}50` }}>
            <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
          </div>
        )}
        <p className="text-xs leading-relaxed mb-3" style={{ color: theme.colors.textMuted }}>
          {card.cardDescription}
        </p>
        <div className="flex flex-wrap gap-1">
          {card.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[9px] font-mono"
              style={{ color: accent, border: `1px solid ${accent}40`, background: `${accent}08` }}
            >{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Holographic (Digital Twin) ─────────────────────────────────────────────────
function HoloCard({ card, onOpen }: CardProps) {
  const { theme } = useTheme()
  const [flickering, setFlickering] = useState(false)
  const accent = theme.colors.accent

  const handleMouseEnter = () => {
    setFlickering(true)
    setTimeout(() => setFlickering(false), 500)
  }

  return (
    <div
      className={`holo-card cursor-pointer rounded-md overflow-hidden ${flickering ? 'flickering' : ''}`}
      style={{ background: theme.colors.cardBackground }}
      onMouseEnter={handleMouseEnter}
      onClick={() => onOpen(card)}
    >
      {card.image && (
        <div className="relative" style={{ height: '110px' }}>
          <img src={card.image} alt={card.name} className="w-full h-full object-cover" style={{ filter: 'brightness(0.55) saturate(0.7)' }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 20%, ${theme.colors.background}dd)` }} />
        </div>
      )}
      <div className="p-4">
        <span className="text-[10px] font-mono tracking-widest uppercase block mb-1" style={{ color: accent }}>
          {card.category}
        </span>
        <h3 className="text-sm font-bold mb-2 leading-snug" style={{ color: theme.colors.text, fontFamily: theme.font.mono }}>
          {card.name}
        </h3>
        <p className="text-xs leading-relaxed mb-3" style={{ color: theme.colors.textMuted, fontFamily: theme.font.mono }}>
          {card.cardDescription}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {card.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[9px] font-mono rounded"
              style={{ color: accent, border: `1px solid ${theme.colors.cardBorder}` }}
            >{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Neon Node ──────────────────────────────────────────────────────────────────
function NeonCard({ card, onOpen }: CardProps) {
  const { theme } = useTheme()
  const nodeDot = card.accent === 'blue' ? '#00ffff' : '#ff00ff'

  return (
    <div
      className="neon-node-card cursor-pointer p-5 relative"
      style={{ background: theme.colors.cardBackground }}
      onClick={() => onOpen(card)}
    >
      <div
        className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
        style={{ background: nodeDot, boxShadow: `0 0 8px ${nodeDot}` }}
        aria-hidden
      />
      <span className="text-[10px] font-mono tracking-widest uppercase block mb-2" style={{ color: theme.colors.textMuted }}>
        {card.category}
      </span>
      <h3 className="text-sm font-bold mb-2 leading-snug" style={{ color: theme.colors.text, fontFamily: theme.font.mono }}>
        {card.name}
      </h3>
      <p className="text-xs leading-relaxed mb-3" style={{ color: theme.colors.textMuted }}>
        {card.cardDescription}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {card.tags.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 text-[9px] font-mono"
            style={{
              color: theme.colors.accent,
              border: `1px solid ${theme.colors.accent}55`,
              textShadow: `0 0 6px ${theme.colors.accent}`,
              borderRadius: '3px',
            }}
          >{t}</span>
        ))}
      </div>
    </div>
  )
}

// ── CAD Feature Tree Item ──────────────────────────────────────────────────────
function CADCard({ card, onOpen }: CardProps) {
  const { theme } = useTheme()
  const [expanded, setExpanded] = useState(false)
  const icon = card.accent === 'blue' ? '🏗' : '⚙'

  return (
    <div
      className="font-mono text-sm"
      style={{ borderBottom: `1px solid ${theme.colors.cardBorder}` }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors"
        style={{ background: 'transparent' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = theme.colors.cardHover }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-neutral-500 text-[11px] w-3 flex-shrink-0">{expanded ? '▾' : '▸'}</span>
        <span className="text-base leading-none flex-shrink-0">{icon}</span>
        <span className="flex-1 truncate text-[13px]" style={{ color: theme.colors.text }}>{card.name}</span>
        <span
          className="text-[9px] tracking-widest uppercase px-1.5 py-0.5 flex-shrink-0"
          style={{ color: theme.colors.accent, border: `1px solid ${theme.colors.accent}40` }}
        >{card.category}</span>
      </div>
      {expanded && (
        <div className="px-8 pb-4 pt-1 space-y-1.5">
          <p className="text-xs leading-relaxed" style={{ color: theme.colors.textMuted }}>{card.cardDescription}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {card.tags.map((t) => (
              <span key={t} className="flex items-center gap-1 text-[11px]" style={{ color: theme.colors.textMuted }}>
                <span className="text-neutral-600">└</span>
                <span style={{ color: theme.colors.accent }}>{t}</span>
              </span>
            ))}
          </div>
          <button
            className="text-[10px] px-2.5 py-1 mt-2 transition-opacity hover:opacity-80"
            style={{
              color: theme.colors.accent,
              border: `1px solid ${theme.colors.accent}50`,
              borderRadius: '2px',
              background: `${theme.colors.accent}10`,
            }}
            onClick={(e) => { e.stopPropagation(); onOpen(card) }}
          >
            OPEN DETAILS →
          </button>
        </div>
      )}
    </div>
  )
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function ProjectCard({ card, onOpen }: CardProps) {
  const { theme } = useTheme()
  switch (theme.cardStyle) {
    case 'exploded-assembly': return <ExplodedCard card={card} onOpen={onOpen} />
    case 'blueprint-panel':   return <BlueprintCard card={card} onOpen={onOpen} />
    case 'floating-holo':     return <HoloCard card={card} onOpen={onOpen} />
    case 'neon-node':         return <NeonCard card={card} onOpen={onOpen} />
    case 'cad-viewport':      return <CADCard card={card} onOpen={onOpen} />
    default:                  return <ExplodedCard card={card} onOpen={onOpen} />
  }
}
