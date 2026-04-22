import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const StarIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const awards = [
  {
    title: 'NASA Big Idea Challenge',
    subtitle: '1st Place & Artemis Award · $170K+ Funding',
  },
  {
    title: 'MakeMIT Hardwarethon',
    subtitle: '3rd Place · 50+ competing teams',
  },
]

export default function AwardsBanner() {
  const { theme } = useTheme()

  return (
    <section
      style={{
        padding: 'clamp(32px, 5vw, 60px) clamp(16px, 4vw, 48px)',
        backgroundColor: '#080808',
        borderTop: `1px solid rgba(${theme.accentRgb},0.1)`,
        borderBottom: `1px solid rgba(${theme.accentRgb},0.1)`,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            fontSize: 11,
            fontFamily: 'monospace',
            color: theme.accent,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 32,
          }}
        >
          Recognition
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 48,
          }}
        >
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
              }}
            >
              <div style={{ flexShrink: 0, marginTop: 2 }}>
                <StarIcon color="#c9a227" />
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: '#ffffff',
                    marginBottom: 4,
                  }}
                >
                  {award.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: theme.accent,
                    fontFamily: 'monospace',
                  }}
                >
                  {award.subtitle}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
