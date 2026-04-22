import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CARDS, ProjectCard } from '../data/projects'

export default function ProjectGrid() {
  const [selected, setSelected] = useState<ProjectCard | null>(null)

  return (
    <section id="project-gallery" className="py-20 px-6 border-t border-neutral-900">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-2">
            Project Gallery
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Take a closer look.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map((card, i) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
              viewport={{ once: true }}
              onClick={() => setSelected(card)}
              className="text-left bg-[#111] border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-600 hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-600"
            >
              {/* Image or placeholder */}
              {card.image ? (
                <div className="h-44 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined}
                  />
                </div>
              ) : (
                <div
                  className="h-44 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, #0d1a0d 0%, #111 100%)`,
                    borderBottom: `1px solid ${card.accent}25`,
                  }}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={card.accent + '40'}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>
              )}

              {/* Card content */}
              <div className="p-4">
                <h3 className="text-white font-bold text-sm leading-snug mb-0.5">
                  {card.title}
                </h3>
                <p className="text-neutral-600 text-xs mb-3 leading-snug line-clamp-2">
                  {card.subtitle}
                </p>
                <div className="flex flex-wrap gap-1">
                  {card.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs border border-neutral-800 text-neutral-500"
                    >
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
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="fixed z-50 bg-[#111] border border-neutral-800 rounded-2xl overflow-hidden w-[calc(100vw-2rem)] max-w-lg shadow-2xl"
              style={{
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                maxHeight: '85vh',
                overflowY: 'auto',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            >
              {/* Hero image */}
              {selected.image && (
                <div className="h-52 overflow-hidden flex-shrink-0">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                    style={selected.imagePosition ? { objectPosition: selected.imagePosition } : undefined}
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <span
                    className="text-xs font-bold tracking-[0.2em] uppercase"
                    style={{ color: selected.accent }}
                  >
                    Project
                  </span>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-neutral-500 hover:text-white transition-colors text-xl leading-none -mt-0.5 ml-4"
                  >
                    ×
                  </button>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{selected.title}</h3>
                <p className="text-xs text-neutral-500 mb-4">{selected.subtitle}</p>
                <p className="text-neutral-300 text-sm leading-relaxed mb-5">
                  {selected.description}
                </p>

                {/* Additional images */}
                {selected.images && selected.images.length > 0 && (
                  <div
                    className={`grid gap-2 mb-5 ${
                      selected.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                    }`}
                  >
                    {selected.images.map((src, j) => (
                      <div key={j} className="overflow-hidden rounded-lg h-32">
                        <img
                          src={src}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs border border-neutral-700 text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
