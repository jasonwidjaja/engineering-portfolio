import { useTheme } from '../context/ThemeContext'

export default function ContactFooter() {
  const { theme } = useTheme()

  const links = [
    {
      label: 'Email',
      href: 'mailto:widjaja.ja@northeastern.edu',
      value: 'widjaja.ja@northeastern.edu',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/jason-matthew-widjaja/',
      value: 'linkedin.com/in/jason-matthew-widjaja',
    },
    {
      label: 'GitHub',
      href: '#',
      value: 'github.com/jasonwidjaja',
    },
  ]

  return (
    <footer
      id="contact"
      style={{
        padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 48px)',
        backgroundColor: '#080808',
        borderTop: `1px solid rgba(${theme.accentRgb},0.1)`,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            marginBottom: 12,
          }}
        >
          Let's build something.
        </h2>
        <p
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.45)',
            marginBottom: 40,
          }}
        >
          Open to full-time roles in mechanical engineering, robotics, and hardware development.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 56 }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 20px',
                borderRadius: 6,
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: `1px solid rgba(${theme.accentRgb},0.2)`,
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.backgroundColor = `rgba(${theme.accentRgb},0.08)`
                el.style.borderColor = theme.accent
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.backgroundColor = 'rgba(255,255,255,0.04)'
                el.style.borderColor = `rgba(${theme.accentRgb},0.2)`
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontFamily: 'monospace',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: theme.accent,
                  minWidth: 56,
                  flexShrink: 0,
                }}
              >
                {link.label}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontFamily: 'monospace',
                  color: 'rgba(255,255,255,0.55)',
                  wordBreak: 'break-all',
                }}
              >
                {link.value}
              </span>
            </a>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontFamily: 'monospace',
              color: 'rgba(255,255,255,0.2)',
            }}
          >
            Designed &amp; built by Jason Widjaja
          </p>
          <p
            style={{
              fontSize: 11,
              fontFamily: 'monospace',
              color: 'rgba(255,255,255,0.15)',
            }}
          >
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
