// @ts-nocheck
import { useTheme } from '../context/ThemeContext'
import { SKILLS } from '../data/content'

const BOM_PARTS: { id: string; description: string; level: string }[] = SKILLS.map((s, i) => ({
  id: `SKL-${String(i + 1).padStart(3, '0')}`,
  description: s,
  level: ['Expert', 'Expert', 'Proficient', 'Expert', 'Proficient', 'Expert', 'Expert', 'Proficient', 'Proficient', 'Proficient', 'Proficient', 'Proficient', 'Familiar', 'Familiar'][i] ?? 'Proficient',
}))

// ── BOM Table (Exploded View) ──────────────────────────────────────────────────
function BOMSkills({ theme }: { theme: ReturnType<typeof useTheme>['theme'] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs font-mono border-collapse">
        <thead>
          <tr style={{ borderBottom: `1px solid ${theme.colors.accent}40` }}>
            {['PART NO.', 'DESCRIPTION', 'QTY', 'LEVEL'].map((h) => (
              <th key={h} className="text-left py-2 px-3 font-semibold tracking-widest uppercase" style={{ color: theme.colors.accent }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BOM_PARTS.map((p, i) => (
            <tr
              key={p.id}
              style={{
                borderBottom: `1px solid ${theme.colors.cardBorder}`,
                background: i % 2 === 0 ? theme.colors.cardBackground : 'transparent',
              }}
            >
              <td className="py-1.5 px-3" style={{ color: theme.colors.accent }}>{p.id}</td>
              <td className="py-1.5 px-3" style={{ color: theme.colors.text }}>{p.description}</td>
              <td className="py-1.5 px-3 text-center" style={{ color: theme.colors.textMuted }}>1</td>
              <td className="py-1.5 px-3" style={{ color: theme.colors.textMuted }}>{p.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Feature Control Frames (Blueprint HUD) ────────────────────────────────────
function BlueprintSkills({ theme }: { theme: ReturnType<typeof useTheme>['theme'] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {SKILLS.map((s) => (
        <div
          key={s}
          className="flex items-center gap-0 font-mono text-xs"
          style={{ border: `1px solid ${theme.colors.cardBorder}` }}
        >
          <div
            className="w-7 h-7 flex items-center justify-center flex-shrink-0"
            style={{ background: `${theme.colors.accent}15`, borderRight: `1px solid ${theme.colors.cardBorder}` }}
          >
            <span style={{ color: theme.colors.accent }}>⊕</span>
          </div>
          <span className="px-2 py-1.5 flex-1 truncate" style={{ color: theme.colors.text }}>{s}</span>
        </div>
      ))}
    </div>
  )
}

// ── Mono Terminal List (Digital Twin) ─────────────────────────────────────────
function HoloSkills({ theme }: { theme: ReturnType<typeof useTheme>['theme'] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 font-mono">
      {SKILLS.map((s, i) => (
        <div key={s} className="flex items-center gap-2 py-1">
          <span className="text-[10px] opacity-40" style={{ color: theme.colors.accent }}>{String(i + 1).padStart(2, '0')}</span>
          <span className="opacity-60" style={{ color: theme.colors.accent }}>{'>'}</span>
          <span className="text-xs" style={{ color: theme.colors.text }}>{s}</span>
        </div>
      ))}
    </div>
  )
}

// ── Property Manager (CAD Viewport) ───────────────────────────────────────────
function CADSkills({ theme }: { theme: ReturnType<typeof useTheme>['theme'] }) {
  const groups = [
    { label: 'CAD Software', items: ['SolidWorks (CSWP)', 'Creo', 'Onshape'] },
    { label: 'Analysis & Simulation', items: ['MATLAB / Simulink', 'FEA', 'MuJoCo', 'Simscape'] },
    { label: 'Programming', items: ['Python', 'Arduino', 'LTSpice', 'ROS'] },
    { label: 'Engineering Standards', items: ['GD&T (ASME Y14.5)', 'DFM / DFA', '3D Printing'] },
  ]
  return (
    <div className="space-y-0 border font-mono text-xs" style={{ borderColor: theme.colors.cardBorder }}>
      {groups.map((g) => (
        <div key={g.label}>
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{ background: theme.colors.cardBackground, borderBottom: `1px solid ${theme.colors.cardBorder}` }}
          >
            <span className="text-neutral-500 text-[11px]">▾</span>
            <span className="font-semibold" style={{ color: theme.colors.accent }}>{g.label}</span>
          </div>
          {g.items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 px-4 py-1.5"
              style={{ borderBottom: `1px solid ${theme.colors.cardBorder}30` }}
            >
              <span style={{ color: theme.colors.textMuted }}>Property:</span>
              <span style={{ color: theme.colors.text }}>{item}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ── Neon Node Chips ────────────────────────────────────────────────────────────
function NeonSkills({ theme }: { theme: ReturnType<typeof useTheme>['theme'] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {SKILLS.map((s) => (
        <span
          key={s}
          className="px-3 py-1.5 text-xs font-mono rounded-md cursor-default transition-all"
          style={{
            color: theme.colors.accent,
            border: `1px solid ${theme.colors.accent}50`,
            background: theme.colors.cardBackground,
            textShadow: `0 0 8px ${theme.colors.accent}80`,
            boxShadow: `0 0 6px ${theme.colors.accentGlow}`,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLSpanElement
            el.style.background = `${theme.colors.accent}15`
            el.style.boxShadow = `0 0 14px ${theme.colors.accentGlow}, inset 0 0 6px ${theme.colors.accentGlow}`
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLSpanElement
            el.style.background = theme.colors.cardBackground
            el.style.boxShadow = `0 0 6px ${theme.colors.accentGlow}`
          }}
        >{s}</span>
      ))}
    </div>
  )
}

// ── Section header ─────────────────────────────────────────────────────────────
function SectionHeader() {
  const { theme } = useTheme()
  const cs = theme.cardStyle
  if (cs === 'exploded-assembly') return (
    <div className="flex items-center gap-4 mb-10">
      <div className="dl-segment" />
      <span className="text-[10px] font-mono tracking-[0.3em] uppercase whitespace-nowrap" style={{ color: theme.colors.accent }}>Skills</span>
      <div className="dl-segment right" />
    </div>
  )
  if (cs === 'floating-holo') return (
    <div className="mb-10">
      <span className="text-[11px] font-mono tracking-widest uppercase" style={{ color: theme.colors.accent }}>
        <span className="opacity-50">{'> '}</span>Skills
      </span>
      <div className="mt-1.5 h-px w-32" style={{ background: `linear-gradient(90deg, ${theme.colors.accent}, transparent)` }} />
    </div>
  )
  if (cs === 'neon-node') return (
    <div className="flex items-center gap-4 mb-10">
      <div className="flex-1 h-px" style={{ background: theme.colors.accent, boxShadow: `0 0 8px ${theme.colors.accent}` }} />
      <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: theme.colors.accent, textShadow: `0 0 12px ${theme.colors.accent}` }}>Skills</span>
      <div className="flex-1 h-px" style={{ background: theme.colors.accent, boxShadow: `0 0 8px ${theme.colors.accent}` }} />
    </div>
  )
  if (cs === 'blueprint-panel') return (
    <div className="mb-10">
      <div className="inline-flex items-center gap-2 px-4 py-2" style={{ border: `1px solid ${theme.colors.accent}60` }}>
        <span className="text-[10px] font-mono" style={{ color: theme.colors.accent }}>⊕</span>
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase" style={{ color: theme.colors.accent }}>Skills</span>
      </div>
    </div>
  )
  return (
    <div className="cad-toolbar flex items-center gap-2 px-3 py-2 mb-6">
      <span className="text-lg">⊞</span>
      <span className="text-sm font-medium" style={{ color: theme.colors.text }}>Skills</span>
    </div>
  )
}

export default function SkillsSection() {
  const { theme } = useTheme()

  return (
    <section
      id="skills"
      className="px-6 md:px-16 lg:px-24 py-20"
      style={{ background: theme.colors.background }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader />
        {theme.cardStyle === 'exploded-assembly' && <BOMSkills theme={theme} />}
        {theme.cardStyle === 'blueprint-panel'   && <BlueprintSkills theme={theme} />}
        {theme.cardStyle === 'floating-holo'     && <HoloSkills theme={theme} />}
        {theme.cardStyle === 'cad-viewport'      && <CADSkills theme={theme} />}
        {theme.cardStyle === 'neon-node'         && <NeonSkills theme={theme} />}
      </div>
    </section>
  )
}
