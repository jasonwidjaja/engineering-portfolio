import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS, ProjectCard } from '../data/content'

// ── Story modal content ────────────────────────────────────────────────────────
function StoryContent({ selected }: { selected: ProjectCard }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const highlights = selected.highlights ?? []
  const images = selected.images ?? []

  type TextBlock = { type: 'text'; items: string[]; startIndex: number }
  type ImageBlock = { type: 'image'; src: string; caption?: string }
  const blocks: (TextBlock | ImageBlock)[] = []
  let hIdx = 0
  let iIdx = 0
  while (hIdx < highlights.length || iIdx < images.length) {
    if (hIdx < highlights.length) {
      blocks.push({ type: 'text', items: [highlights[hIdx]], startIndex: hIdx })
      hIdx++
    }
    if (iIdx < images.length) {
      blocks.push({ type: 'image', src: images[iIdx].src, caption: images[iIdx].caption })
      iIdx++
    }
  }

  const slideUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <div ref={scrollRef} className="overflow-y-auto" style={{ maxHeight: 'calc(85vh - 0px)' }}>
      {/* Hero image */}
      {selected.image ? (
        <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0">
          <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <span className="text-xs font-bold tracking-[0.2em] uppercase mb-2 block" style={{ color: selected.accent }}>
              {selected.category}
            </span>
            <h3 className="text-2xl font-black text-white leading-tight">{selected.title}</h3>
            <p className="text-sm text-neutral-400 mt-1">{selected.subtitle}</p>
          </div>
        </div>
      ) : (
        <div className="p-6 pb-2">
          <span className="text-xs font-bold tracking-[0.2em] uppercase mb-1 block" style={{ color: selected.accent }}>
            {selected.category}
          </span>
          <h3 className="text-xl font-black text-white">{selected.title}</h3>
          <p className="text-xs text-neutral-500 mt-0.5">{selected.subtitle}</p>
        </div>
      )}

      {/* Story body */}
      <div className="px-6 pb-8 space-y-6 mt-6">

        {/* Description */}
        <motion.p
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, root: scrollRef, amount: 0.2 }}
          className="text-neutral-300 text-sm sm:text-base leading-relaxed"
        >
          {selected.description}
        </motion.p>

        {/* The Problem callout */}
        {selected.problem && (
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, root: scrollRef, amount: 0.2 }}
            className="rounded-xl p-4 border border-amber-900/40"
            style={{ background: 'rgba(251,191,36,0.04)' }}
          >
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-amber-500 mb-2">
              The Problem
            </p>
            <p className="text-sm text-neutral-300 leading-relaxed">{selected.problem}</p>
          </motion.div>
        )}

        {/* My Approach label */}
        {selected.problem && (
          <motion.p
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, root: scrollRef, amount: 0.2 }}
            className="text-xs font-bold tracking-[0.18em] uppercase"
            style={{ color: selected.accent }}
          >
            My Approach
          </motion.p>
        )}

        {/* Interleaved highlights + images */}
        {blocks.map((block, bi) =>
          block.type === 'text' ? (
            <motion.div
              key={`text-${bi}`}
              variants={slideUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, root: scrollRef, amount: 0.15 }}
              className="space-y-4"
            >
              {(block as TextBlock).items.map((h, j) => {
                const num = (block as TextBlock).startIndex + j + 1
                return (
                  <div key={j} className="flex gap-4">
                    <span
                      className="flex-shrink-0 text-xs font-black mt-0.5 w-6 text-right"
                      style={{ color: selected.accent + '70' }}
                    >
                      {String(num).padStart(2, '0')}
                    </span>
                    <p className="text-sm text-neutral-300 leading-relaxed">{h}</p>
                  </div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              key={`img-${bi}`}
              variants={slideUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, root: scrollRef, amount: 0.15 }}
            >
              <div className="overflow-hidden rounded-xl flex justify-center bg-neutral-900/40" style={{ borderTop: `2px solid ${selected.accent}30` }}>
                <img src={(block as ImageBlock).src} alt="" className="max-h-[260px] max-w-full w-auto" loading="lazy" />
              </div>
              {(block as ImageBlock).caption && (
                <p className="text-xs text-neutral-500 mt-2 text-center italic">{(block as ImageBlock).caption}</p>
              )}
            </motion.div>
          )
        )}

        {/* Key Successes grid */}
        {selected.successGrid && selected.successGrid.length > 0 && (
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, root: scrollRef, amount: 0.1 }}
          >
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-white mb-3">Key Successes</p>
            <div className="grid grid-cols-2 gap-2">
              {selected.successGrid.map((item, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden">
                  <img src={item.src} alt={item.title} className="w-full h-auto" loading="lazy" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2">
                    <p className="text-[10px] text-white font-semibold leading-tight">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Videos */}
        {selected.videos && selected.videos.length > 0 && (
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, root: scrollRef, amount: 0.1 }}
            className="space-y-4"
          >
            {selected.videos.map((url, i) => (
              <div key={i} className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </motion.div>
        )}

        {/* The Result callout */}
        {selected.result && (
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, root: scrollRef, amount: 0.2 }}
            className="rounded-xl p-4 border border-green-900/40"
            style={{ background: 'rgba(34,197,94,0.05)' }}
          >
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-green-400 mb-2">
              The Result
            </p>
            <p className="text-sm text-neutral-300 leading-relaxed">{selected.result}</p>
          </motion.div>
        )}

        {/* Result image */}
        {selected.resultImage && (
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, root: scrollRef, amount: 0.15 }}
          >
            <div className="overflow-hidden rounded-xl flex justify-center bg-neutral-900/40">
              <img src={selected.resultImage.src} alt="" className="max-h-[280px] max-w-full w-auto" loading="lazy" />
            </div>
            {selected.resultImage.caption && (
              <p className="text-xs text-neutral-500 mt-2 text-center italic">{selected.resultImage.caption}</p>
            )}
          </motion.div>
        )}

        {/* Poster PDF link */}
        {selected.posterPdf && (
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, root: scrollRef, amount: 0.2 }}
          >
            <a
              href={selected.posterPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors"
              style={{
                borderColor: selected.accent + '40',
                color: selected.accent,
                background: selected.accent + '0d',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = selected.accent + '1a')}
              onMouseLeave={(e) => (e.currentTarget.style.background = selected.accent + '0d')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              View Final Capstone Poster
            </a>
          </motion.div>
        )}

        {/* Tags */}
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, root: scrollRef, amount: 0.2 }}
          className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-800"
        >
          {selected.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-xs border border-neutral-800 text-neutral-500">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// ── Card with 3D tilt + shine ──────────────────────────────────────────────────
function CardItem({ card, delay, onClick }: { card: ProjectCard; delay: number; onClick: () => void }) {
  const cardRef = useRef<HTMLButtonElement>(null)
  const [tiltStyle, setTiltStyle] = useState('')
  const [shine, setShine] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = cardRef.current!.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setTiltStyle(`perspective(700px) rotateX(${(py - 0.5) * -9}deg) rotateY(${(px - 0.5) * 9}deg) translateZ(6px)`)
    setShine({ x: px * 100, y: py * 100 })
  }

  const onMouseEnter = () => setHovered(true)

  const onMouseLeave = () => {
    setHovered(false)
    setTiltStyle('')
    setShine({ x: 50, y: 50 })
  }

  return (
    <motion.button
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        transform: tiltStyle || 'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transition: hovered ? 'transform 0.12s ease, box-shadow 0.2s ease' : 'transform 0.5s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px ${card.accent}22` : '0 2px 8px rgba(0,0,0,0.3)',
      }}
      className="relative text-left bg-[#111] border border-neutral-800 rounded-xl overflow-hidden group focus:outline-none"
    >
      {/* Mouse-follow shine */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-xl transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.07) 0%, transparent 55%)`,
        }}
      />

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-xl transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1px ${card.accent}30`,
        }}
      />

      {/* Featured badge */}
      {card.featured && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-yellow-500/30">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="#eab308" stroke="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-[10px] font-bold text-yellow-400 leading-none">Featured</span>
        </div>
      )}

      {/* Thumbnail */}
      {card.image ? (
        <div className="h-44 overflow-hidden relative">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm">
            <span className="text-[10px] font-semibold text-neutral-300 tracking-wide">{card.category}</span>
          </div>
        </div>
      ) : (
        <div
          className="h-44 flex items-center justify-center relative"
          style={{ background: 'linear-gradient(135deg, #0d1a0d 0%, #111 100%)', borderBottom: `1px solid ${card.accent}20` }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={card.accent + '40'} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm">
            <span className="text-[10px] font-semibold text-neutral-300 tracking-wide">{card.category}</span>
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <h3 className="text-white font-bold text-sm leading-snug">{card.title}</h3>
          {card.problem && (
            <span className="flex-shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-amber-500 opacity-70" title="Includes challenge narrative" />
          )}
        </div>
        <p className="text-neutral-600 text-xs mb-3 line-clamp-1">{card.subtitle}</p>
        <div className="flex flex-wrap gap-1">
          {card.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded text-xs border border-neutral-800 text-neutral-500">
              {tag}
            </span>
          ))}
          {card.tags.length > 3 && (
            <span className="px-2 py-0.5 rounded text-xs border border-neutral-800 text-neutral-600">
              +{card.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}

// ── Main section ───────────────────────────────────────────────────────────────
export default function PhysicsGallery() {
  const [selected, setSelected] = useState<ProjectCard | null>(null)

  const sorted = [...PROJECTS].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

  return (
    <section id="projects" className="py-14 px-6 border-t border-neutral-900 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-2">Projects</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Things I've built.</h2>
          <p className="text-neutral-600 text-xs mt-3 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 opacity-70" />
            Amber dot = challenge &amp; solution story inside
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((card, i) => (
            <CardItem
              key={card.id}
              card={card}
              delay={(i % 3) * 0.08}
              onClick={() => setSelected(card)}
            />
          ))}
        </div>
      </div>

      {/* Story modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="fixed z-50 bg-[#111] border border-neutral-800 rounded-2xl overflow-hidden w-[calc(100vw-2rem)] max-w-xl shadow-2xl"
              style={{ top: '50%', left: '50%', x: '-50%', y: '-50%', maxHeight: '85vh' }}
              initial={{ opacity: 0, scale: 0.92, y: '-45%' }}
              animate={{ opacity: 1, scale: 1, y: '-50%' }}
              exit={{ opacity: 0, scale: 0.94, y: '-48%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-neutral-300 hover:text-white flex items-center justify-center text-lg leading-none backdrop-blur-sm transition-colors"
              >
                ×
              </button>
              <StoryContent selected={selected} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
