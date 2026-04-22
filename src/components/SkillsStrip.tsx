import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const SKILLS = [
  'SolidWorks (CSWP)',
  'Creo',
  'Onshape',
  'MATLAB/Simulink',
  'Python',
  'GD&T (ASME Y14.5)',
  'DFM/DFA',
  'FEA',
  '3D Printing',
  'MuJoCo',
  'ROS',
]

export default function SkillsStrip() {
  const { theme } = useTheme()

  return (
    <section
      style={{
        padding: '60px 48px',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          style={{
            fontSize: 11,
            fontFamily: 'monospace',
            color: theme.accent,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 28,
            textAlign: 'center',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Skills &amp; Tools
        </motion.div>
        <motion.div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            justifyContent: 'center',
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04 } },
          }}
        >
          {SKILLS.map((skill) => (
            <motion.span
              key={skill}
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 260, damping: 20 },
                },
              }}
              style={{
                padding: '8px 16px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 500,
                fontFamily: 'monospace',
                background: `rgba(${theme.accentRgb},0.08)`,
                border: `1px solid rgba(${theme.accentRgb},0.25)`,
                color: theme.accent,
                cursor: 'default',
                transition: 'all 0.2s',
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
