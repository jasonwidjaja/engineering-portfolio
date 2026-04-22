// @ts-nocheck
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { SKYLINE_CARDS, type SkylineCard } from '../data/content'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

function SectionHeader({ title }: { title: string }) {
  const { theme } = useTheme()
  const cs = theme.cardStyle

  if (cs === 'exploded-assembly') return (
    <div className="flex items-center gap-4 mb-10">
      <div className="dl-segment" />
      <span className="text-[10px] font-mono tracking-[0.3em] uppercase whitespace-nowrap" style={{ color: theme.colors.accent }}>{title}</span>
      <div className="dl-segment right" />
    </div>
  )
  if (cs === 'floating-holo') return (
    <div className="mb-10">
      <span className="text-[11px] font-mono tracking-widest uppercase" style={{ color: theme.colors.accent }}>
        <span className="opacity-50">{'> '}</span>{title}
      </span>
      <div className="mt-1.5 h-px w-40" style={{ background: `linear-gradient(90deg, ${theme.colors.accent}, transparent)` }} />
    </div>
  )
  if (cs === 'neon-node') return (
    <div className="flex items-center gap-4 mb-10">
      <div className="flex-1 h-px" style={{ background: theme.colors.accent, boxShadow: `0 0 8px ${theme.colors.accent}` }} />
      <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: theme.colors.accent, textShadow: `0 0 12px ${theme.colors.accent}` }}>{title}</span>
      <div className="flex-1 h-px" style={{ background: theme.colors.accent, boxShadow: `0 0 8px ${theme.colors.accent}` }} />
    </div>
  )
  if (cs === 'blueprint-panel') return (
    <div className="mb-10">
      <div className="inline-flex items-center gap-2 px-4 py-2" style={{ border: `1px solid ${theme.colors.accent}60` }}>
        <span className="text-[10px] font-mono" style={{ color: theme.colors.accent }}>⊕</span>
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase" style={{ color: theme.colors.accent }}>{title}</span>
      </div>
      <div className="mt-1 ml-4 h-px w-24" style={{ background: `${theme.colors.accent}40` }} />
    </div>
  )
  return (
    <div className="cad-toolbar flex items-center gap-2 px-3 py-2 mb-6">
      <span className="text-lg">⚙</span>
      <span className="text-sm font-medium" style={{ color: theme.colors.text }}>{title}</span>
    </div>
  )
}

const projects = SKYLINE_CARDS.filter((c) => c.accent === 'green')
const experience = SKYLINE_CARDS.filter((c) => c.accent === 'blue')

export default function ProjectsSection() {
  const { theme } = useTheme()
  const [selected, setSelected] = useState<SkylineCard | null>(null)
  const isCad = theme.cardStyle === 'cad-viewport'

  const gridClass = isCad
    ? 'space-y-0'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'

  return (
    <>
      <ProjectModal card={selected} onClose={() => setSelected(null)} />

      <section
        id="projects"
        className="px-6 md:px-16 lg:px-24 py-20"
        style={{ background: theme.colors.background }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Projects */}
          <SectionHeader title="Projects" />
          <div className={gridClass}>
            {projects.map((card) => (
              <ProjectCard key={card.id} card={card} onOpen={setSelected} />
            ))}
          </div>

          {/* Experience */}
          <div className="mt-16">
            <SectionHeader title="Work Experience" />
            <div className={isCad ? 'space-y-0 border border-[#525252] rounded' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'}>
              {experience.map((card) => (
                <ProjectCard key={card.id} card={card} onOpen={setSelected} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
