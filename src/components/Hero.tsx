// @ts-nocheck
import { motion } from 'framer-motion'
import HeroScene from './HeroScene'
import { PERSONAL, CREDENTIALS, PREVIOUS_COMPANIES, AWARDS } from '../data/content'
import { useTheme } from '../context/ThemeContext'

export default function Hero() {
  const { theme } = useTheme()
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 py-20 overflow-hidden"
    >
      {/* 3-D background canvas */}
      <HeroScene />

      {/* Subtle radial glow behind card */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% 50%, rgba(${theme.accentRgb},0.055) 0%, transparent 70%)`,
        }}
      />

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-xl w-full"
      >
        {/* Glassmorphism card */}
        <div
          className="rounded-3xl px-8 py-10 sm:px-12 sm:py-12 border border-white/[0.06]"
          style={{
            background: 'rgba(10,10,10,0)',
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            boxShadow: `0 0 0 1px rgba(${theme.accentRgb},0.08), 0 32px 80px rgba(0,0,0,0.6)`,
          }}
        >
          {/* Profile photo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-40"
                style={{ background: `radial-gradient(circle, ${theme.accent}, transparent 70%)` }}
              />
              <img
                src={PERSONAL.headshotSrc}
                alt={PERSONAL.name}
                className="relative w-[210px] h-[210px] rounded-full object-cover object-top ring-[2.5px]"
                style={{ boxShadow: `0 0 0 2.5px rgba(${theme.accentRgb},0.35)` }}
              />
            </div>
          </div>

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
            {PERSONAL.name}
          </h1>

          {/* Title */}
          <p className="text-neutral-400 text-base sm:text-lg font-medium mb-4">
            {PERSONAL.title}
          </p>

          {/* Credential badges */}
          <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
            {CREDENTIALS.map((cred) => (
              <span
                key={cred}
                className="px-3 py-1 rounded-full text-xs font-medium border"
                style={{
                  background: `rgba(${theme.accentRgb},0.08)`,
                  borderColor: `rgba(${theme.accentRgb},0.25)`,
                  color: theme.accentLight,
                }}
              >
                {cred}
              </span>
            ))}
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-1.5 text-neutral-600 text-sm mb-6">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{PERSONAL.location}</span>
          </div>

          {/* Previously at */}
          <div className="mb-5">
            <p className="text-xs text-neutral-600 uppercase tracking-[0.2em] mb-3">
              Previously at
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {PREVIOUS_COMPANIES.map((name) => (
                <span
                  key={name}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-neutral-700 text-neutral-300 bg-neutral-900/60"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Awards strip */}
          {AWARDS.length > 0 && (
            <div className="mb-6">
              <p className="text-xs text-neutral-600 uppercase tracking-[0.2em] mb-3">Recognition</p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {AWARDS.map((award) => (
                  <div
                    key={award.label}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-yellow-900/30"
                    style={{ background: 'rgba(234,179,8,0.04)' }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#eab308" stroke="none" className="flex-shrink-0">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-neutral-200 leading-tight">{award.label}</p>
                      <p className="text-[10px] text-yellow-600/80 leading-tight mt-0.5">{award.sublabel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tagline */}
          <div className="inline-block border border-neutral-600 rounded-lg px-4 py-2.5 mb-7 mx-auto">
            <p className="text-white font-bold text-sm sm:text-base leading-relaxed max-w-md">
              {PERSONAL.tagline}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href={PERSONAL.resumePdf}
              download
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                color: '#fff',
                boxShadow: `0 0 20px rgba(${theme.accentRgb},0.35)`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 30px rgba(${theme.accentRgb},0.55)`)}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `0 0 20px rgba(${theme.accentRgb},0.35)`)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="px-5 py-2.5 rounded-full border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white transition-colors text-sm font-medium"
            >
              Email
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white transition-colors text-sm font-medium"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs text-neutral-700 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-neutral-700">
            <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
