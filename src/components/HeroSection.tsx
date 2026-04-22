import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { PERSONAL, SKILLS } from '../data/content'

export default function HeroSection() {
  const { theme } = useTheme()

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '136px 48px 120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(${theme.accentRgb},0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(${theme.accentRgb},0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative' }}>
        {/* Two-column: left = all text, right = photo */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'start',
          }}
        >
          {/* Left: eyebrow + name + tagline + bio + credentials + companies */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
          >
            <div>
              <div
                style={{
                  fontSize: 'clamp(11px, 1.5vw, 14px)',
                  fontFamily: 'monospace',
                  color: theme.accent,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                Mechanical Engineer &amp; Roboticist
              </div>
              <h1
                style={{
                  fontSize: 'clamp(48px, 10vw, 120px)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.9,
                  margin: 0,
                  marginBottom: 24,
                  color: '#ffffff',
                }}
              >
                JASON
                <br />
                <span style={{ color: theme.accent }}>WIDJAJA</span>
              </h1>
              <p
                style={{
                  fontSize: 'clamp(15px, 2vw, 20px)',
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.6,
                }}
              >
                From Queens, NY — I build robots that move heavy things, explore the moon, and make the impossible feel inevitable.
              </p>
            </div>
            <div>
              <p
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 14,
                  lineHeight: 1.8,
                  marginBottom: 12,
                }}
              >
                {PERSONAL.bio[0]}
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: 14,
                  lineHeight: 1.8,
                }}
              >
                {PERSONAL.bio[1]}
              </p>
            </div>

            {/* Seeking notice */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: 999,
                border: `1px solid rgba(${theme.accentRgb},0.35)`,
                background: `rgba(${theme.accentRgb},0.07)`,
                width: 'fit-content',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: theme.accent, flexShrink: 0, boxShadow: `0 0 8px ${theme.accent}` }} />
              <span style={{ fontSize: 12, color: theme.accent, fontFamily: 'monospace', letterSpacing: '0.04em' }}>
                Currently seeking full-time opportunities — Summer 2026
              </span>
            </div>

            <div>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: 'monospace',
                  color: theme.accent,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                Credentials
              </div>
              {[
                "M.S. Robotics — Northeastern '26",
                "B.S. Mechanical Engineering — Northeastern '25",
                'SolidWorks CSWP',
              ].map((cred) => (
                <div
                  key={cred}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 12,
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  <span style={{ color: theme.accent, fontSize: 18, lineHeight: 1 }}>›</span>
                  {cred}
                </div>
              ))}
            </div>

            <div>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: 'monospace',
                  color: theme.accent,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                Experience
              </div>
              {['Amazon Robotics', 'Draper Laboratory', 'Berkshire Grey'].map((company) => (
                <div
                  key={company}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 12,
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      backgroundColor: theme.accent,
                      flexShrink: 0,
                    }}
                  />
                  {company}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: large photo filling the column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                borderRadius: 16,
                border: `1px solid rgba(${theme.accentRgb},0.25)`,
                overflow: 'hidden',
                backgroundColor: `rgba(${theme.accentRgb},0.06)`,
                position: 'relative',
              }}
            >
              <img
                src="/headshot.jpg"
                alt="Jason Widjaja"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 10%',
                  transform: 'scale(1.15)',
                  transformOrigin: 'center top',
                }}
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                }}
              />
              {/* Edge vignette — darkens background, keeps subject */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse 70% 80% at 50% 30%, transparent 40%, rgba(0,0,0,0.65) 100%)',
                  pointerEvents: 'none',
                }}
              />
              {/* Bottom fade into page */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '35%',
                  background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </motion.div>
        </div>
        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ marginTop: 48 }}
        >
          <div
            style={{
              fontSize: 11,
              fontFamily: 'monospace',
              color: theme.accent,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Skills &amp; Tools
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SKILLS.map((skill) => (
              <span
                key={skill}
                style={{
                  padding: '6px 12px',
                  borderRadius: 9999,
                  fontSize: 13,
                  fontWeight: 500,
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  background: 'rgba(255,255,255,0.04)',
                  cursor: 'default',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: 'rgba(255,255,255,0.3)',
          fontSize: 11,
          fontFamily: 'monospace',
          letterSpacing: '0.12em',
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>SCROLL</span>
        <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
          <path
            d="M8 0v18M2 12l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  )
}
