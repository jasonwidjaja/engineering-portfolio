// @ts-nocheck
import { useTheme } from '../context/ThemeContext'

const sections = [
  { icon: '⎆', label: 'Hero', href: '#hero' },
  { icon: '⚙', label: 'Projects', href: '#projects' },
  { icon: '🏆', label: 'Awards', href: '#awards' },
  { icon: '⊞', label: 'Skills', href: '#skills' },
  { icon: '✉', label: 'Contact', href: '#contact' },
]

export default function CADSidebar() {
  const { theme } = useTheme()
  return (
    <div
      className="fixed left-0 top-0 bottom-0 w-60 z-40 overflow-y-auto text-sm"
      style={{ background: '#252525', borderRight: '1px solid #444' }}
    >
      {/* Header */}
      <div className="cad-toolbar px-3 py-2">
        <p className="text-[10px] font-mono text-neutral-400 leading-tight">FeatureManager Design Tree</p>
        <p className="text-[11px] font-mono text-neutral-300 font-semibold mt-0.5">JasonWidjaja.SLDASM</p>
      </div>

      {/* Origin + Annotations */}
      <div className="px-2 py-1 border-b border-[#3a3a3a]">
        {['Origin', 'Annotations', 'Material'].map((item) => (
          <div key={item} className="flex items-center gap-2 px-2 py-0.5">
            <span className="text-neutral-600 text-xs">━</span>
            <span className="text-[11px] font-mono text-neutral-500">{item}</span>
          </div>
        ))}
      </div>

      {/* Navigation sections */}
      <div className="px-2 py-2 space-y-0.5">
        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest px-2 py-1">Portfolio Sections</p>
        {sections.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-[12px] font-mono hover:bg-[#3a3a3a] transition-colors"
            style={{ color: theme.colors.text }}
          >
            <span className="text-neutral-500 text-xs">▸</span>
            <span className="text-base leading-none">{s.icon}</span>
            <span>{s.label}</span>
          </a>
        ))}
      </div>

      {/* Properties panel */}
      <div className="mt-4 border-t border-[#3a3a3a] px-3 py-3">
        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Custom Properties</p>
        {[
          ['Author', 'Jason Widjaja'],
          ['Degree', 'M.S. Robotics'],
          ['Version', '2025'],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between text-[11px] font-mono py-0.5">
            <span className="text-neutral-500">{k}</span>
            <span style={{ color: theme.colors.accent }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
