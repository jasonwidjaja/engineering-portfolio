import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { SKYLINE_CARDS, type SkylineCard } from '../data/content'

// ─── Category definitions ─────────────────────────────────────────────────────

const GROUPS: { label: string; ids: string[] }[] = [
  { label: 'Co-Ops',       ids: ['berkshire-grey', 'amazon', 'draper'] },
  { label: 'Highlights',   ids: ['bourbot', 'cobra', 'brailleforge'] },
  { label: 'Generate Product Development', ids: ['fitolux', 'wavewise', 'cstar'] },
  { label: 'Projects',     ids: ['rl-grasping', 'ankle-exo', 'robotic-hand', 'hammer', 'golf-tee', 'ne-racing', 'whisk', 'motor-control', 'robotic-manipulator', 'jordan-shoe', 'jet-engine'] },
]

const TABS = ['All', ...GROUPS.map(g => g.label)]

function groupOf(id: string): string {
  return GROUPS.find(g => g.ids.includes(id))?.label ?? ''
}

function accentFor(card: SkylineCard) {
  switch (card.accent) {
    case 'blue':   return { color: '#3b82f6', rgb: '59,130,246' }
    case 'purple': return { color: '#a855f7', rgb: '168,85,247' }
    case 'amber':  return { color: '#f59e0b', rgb: '245,158,11' }
    default:       return { color: '#22c55e', rgb: '34,197,94' }
  }
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({ card, onClick }: { card: SkylineCard; onClick: () => void }) {
  const acc = accentFor(card)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22 }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      onClick={onClick}
      style={{
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.025)',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${acc.rgb},0.4)`
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 24px rgba(${acc.rgb},0.1)`
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      {/* Image */}
      {card.image ? (
        <div style={{ height: 160, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
          <img
            src={card.image}
            alt={card.name}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', filter: 'brightness(0.78)', transform: `scale(${card.imageZoom ?? 1})` }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 35%, rgba(10,10,10,0.75))',
          }} />
        </div>
      ) : (
        <div style={{
          height: 80, flexShrink: 0,
          background: `linear-gradient(135deg, rgba(${acc.rgb},0.12), transparent)`,
        }} />
      )}

      {/* Body */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Category */}
        <div style={{
          fontSize: 11,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: acc.color,
          marginBottom: 6,
        }}>
          {groupOf(card.id)}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: 15,
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 8px',
          lineHeight: 1.3,
        }}>
          {card.name}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.52)',
          lineHeight: 1.6,
          margin: '0 0 12px',
          flexGrow: 1,
        }}>
          {card.cardDescription}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {card.tags.slice(0, 4).map(tag => (
            <span key={tag} style={{
              padding: '2px 7px',
              borderRadius: 999,
              fontSize: 10,
              fontFamily: 'monospace',
              fontWeight: 600,
              border: `1px solid rgba(${acc.rgb},0.22)`,
              color: acc.color,
              background: `rgba(${acc.rgb},0.06)`,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Group header ─────────────────────────────────────────────────────────────

function GroupHeader({ label, accentRgb, accent }: { label: string; accentRgb: string; accent: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 20,
      marginTop: 8,
    }}>
      <span style={{
        fontSize: 13,
        fontFamily: 'monospace',
        fontWeight: 800,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: accent,
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: `rgba(${accentRgb},0.15)` }} />
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ProjectsGrid({ onCardClick }: { onCardClick: (id: string) => void }) {
  const { theme } = useTheme()
  const [active, setActive] = useState('All')

  const handleClick = (card: SkylineCard) => {
    if (card.accent === 'blue') {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      onCardClick(card.id)
    }
  }

  // Cards to show for filtered (non-All) view
  const filteredCards = SKYLINE_CARDS.filter(c =>
    GROUPS.find(g => g.label === active)?.ids.includes(c.id)
  )

  return (
    <section
      id="projects"
      style={{
        backgroundColor: '#0a0a0a',
        padding: '60px clamp(16px, 4vw, 48px) 80px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{
            fontSize: 11,
            fontFamily: 'monospace',
            color: theme.accent,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            Work
          </div>
          <h2 style={{
            fontSize: 'clamp(30px, 5vw, 52px)',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            margin: '0 0 28px',
          }}>
            Projects &amp; Experience
          </h2>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {TABS.map(tab => {
              const isActive = active === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  style={{
                    padding: '7px 18px',
                    borderRadius: 999,
                    border: `1px solid ${isActive ? theme.accent : 'rgba(255,255,255,0.1)'}`,
                    background: isActive ? `rgba(${theme.accentRgb},0.1)` : 'transparent',
                    color: isActive ? theme.accent : 'rgba(255,255,255,0.5)',
                    fontSize: 13,
                    fontWeight: isActive ? 700 : 400,
                    fontFamily: 'monospace',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.25)'
                      ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.8)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)'
                      ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)'
                    }
                  }}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence>
          {active === 'All' ? (
            // Grouped view
            <motion.div
              key="all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {GROUPS.map(group => {
                const isExp = group.label === 'Co-Ops'
                const acc = isExp
                  ? { color: '#3b82f6', rgb: '59,130,246' }
                  : { color: '#22c55e', rgb: '34,197,94' }
                const cards = SKYLINE_CARDS.filter(c => group.ids.includes(c.id))
                return (
                  <div key={group.label} style={{ marginBottom: 48 }}>
                    <GroupHeader label={group.label} accent={acc.color} accentRgb={acc.rgb} />
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                      gap: 16,
                    }}>
                      {cards.map(card => (
                        <Card key={card.id} card={card} onClick={() => handleClick(card)} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </motion.div>
          ) : (
            // Flat filtered view
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 16,
              }}
            >
              {filteredCards.map(card => (
                <Card key={card.id} card={card} onClick={() => handleClick(card)} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
