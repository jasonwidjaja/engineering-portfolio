import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EXPERIENCE, Job, PairItem } from '../data/content'
import Lightbox from './Lightbox'

export default function Experience() {
  const [selected, setSelected] = useState<Job | null>(null)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  return (
    <section id="experience" className="py-14 px-6 border-t border-neutral-900 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-2">
            Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Where I've worked.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-neutral-800" />

          <div className="space-y-16">
            {EXPERIENCE.map((job, i) => {
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="relative grid grid-cols-1 md:grid-cols-2"
                >
                  <div
                    className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 z-10 w-3.5 h-3.5 rounded-full ring-[4px] ring-[#0a0a0a]"
                    style={{ backgroundColor: job.accent }}
                  />

                  {/* Text content */}
                  <div
                    className={`${
                      isEven ? 'md:pr-14' : 'md:pl-14 md:order-2'
                    } mb-6 md:mb-0`}
                  >
                    <div className="mb-1 flex items-center gap-2 md:hidden">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: job.accent }} />
                      <span className="text-xs text-neutral-500">{job.period}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-xl font-bold text-white">{job.company}</h3>
                      {job.featured && (
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px] font-bold border"
                          style={{
                            borderColor: job.accent + '40',
                            color: job.accent,
                            background: job.accent + '10',
                          }}
                        >
                          Highlight
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: job.accent }}>
                      {job.role}
                    </p>
                    <p className="text-xs text-neutral-500 mb-4 hidden md:block">
                      {job.period} · {job.location}
                    </p>
                    <p className="text-xs text-neutral-500 mb-4 md:hidden">{job.location}</p>

                    <ul className="space-y-2 mb-4">
                      {job.highlights.map((bullet, j) => (
                        <li key={j} className="flex gap-2.5 text-sm text-neutral-400 leading-relaxed">
                          <span
                            className="mt-2 flex-shrink-0 w-1 h-1 rounded-full"
                            style={{ backgroundColor: job.accent + '90' }}
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setSelected(job)}
                      className="inline-flex items-center gap-1 mt-1 text-xs font-medium transition-colors"
                      style={{ color: job.accent + 'cc' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = job.accent)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = job.accent + 'cc')}
                    >
                      View all projects →
                    </button>
                  </div>

                  {/* Image */}
                  <div className={`${isEven ? 'md:pl-14' : 'md:pr-14 md:order-1'}`}>
                    <div
                      className="overflow-hidden rounded-xl h-56 md:h-64"
                      style={job.featured ? { boxShadow: `0 0 0 1px ${job.accent}30, 0 8px 32px rgba(0,0,0,0.4)` } : undefined}
                    >
                      <img
                        src={job.image}
                        alt={job.company}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="fixed z-50 bg-[#111] border border-neutral-800 rounded-2xl overflow-hidden w-[calc(100vw-2rem)] max-w-2xl shadow-2xl"
              style={{
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                maxHeight: '85vh',
                overflowY: 'auto',
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            >
              {/* Header */}
              <div
                className="px-6 pt-6 pb-4 border-b border-neutral-800"
                style={{ borderTopColor: selected.accent, borderTopWidth: 3 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-0.5">{selected.company}</h3>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: selected.accent }}>
                      {selected.role}
                    </p>
                    <p className="text-xs text-neutral-500">{selected.period} · {selected.location}</p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-neutral-500 hover:text-white transition-colors text-2xl leading-none ml-4 mt-0.5"
                  >
                    ×
                  </button>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed mt-3">{selected.overview}</p>
                {selected.overviewImage && (
                  <img
                    src={selected.overviewImage}
                    alt={selected.company}
                    className="mt-4 w-full rounded-lg object-contain block mx-auto cursor-zoom-in"
                    loading="lazy"
                    onClick={() => setLightboxSrc(selected.overviewImage!)}
                  />
                )}
              </div>

              {/* Projects */}
              <div className="p-6 space-y-8">
                {selected.projects.map((proj, i) => (
                  <div key={i}>
                    <h4 className="text-white font-bold text-sm mb-0.5">{proj.name}</h4>
                    <p className="text-xs text-neutral-500 mb-3 leading-relaxed">{proj.description}</p>

                    {!proj.images && proj.image && (
                      <div className="rounded-lg mb-3 overflow-hidden">
                        <img src={proj.image} alt={proj.name} className="w-full h-auto" loading="lazy" />
                      </div>
                    )}

                    {proj.pairItems ? (
                      <div className="space-y-3 mt-1">
                        {proj.pairItems.map((item: PairItem, j: number) => (
                          <div key={j} className="flex items-center gap-3">
                            <p className="flex-1 text-sm text-neutral-400 leading-relaxed">{item.label}</p>
                            <div className="flex gap-2 flex-shrink-0">
                              {item.images?.map((img, k) => (
                                <div key={k} className="w-24 h-20 overflow-hidden rounded-lg bg-neutral-900 cursor-zoom-in flex-shrink-0" onClick={() => setLightboxSrc(img.src)}>
                                  <img src={img.src} alt="" className={`w-full h-full ${img.fit === 'contain' ? 'object-contain' : 'object-cover'}`} loading="lazy" />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-1.5">
                        {proj.bullets.map((b, j) => (
                          <li key={j} className="flex gap-2.5 text-sm text-neutral-400 leading-relaxed">
                            <span
                              className="mt-2 flex-shrink-0 w-1 h-1 rounded-full"
                              style={{ backgroundColor: selected.accent + '90' }}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {!proj.pairItems && proj.images && proj.images.length > 0 && (() => {
                      const hero    = proj.images!.filter(img => img.hero)
                      const regular = proj.images!.filter(img => !img.hero && !img.wide)
                      const wide    = proj.images!.filter(img => img.wide)
                      const imgCaption = (img: { src: string; caption?: string; fit?: string }) => img.caption && (
                        <p className="text-[11px] text-neutral-500 mt-1.5 text-center italic leading-tight px-1">{img.caption}</p>
                      )
                      return (
                        <div className="mt-4 space-y-3">
                          {hero.map((img, k) => (
                            <div key={k} className="flex flex-col items-center">
                              <div className={`w-full overflow-hidden rounded-lg bg-neutral-900 cursor-zoom-in ${img.fit === 'contain' ? '' : 'h-48'}`} onClick={() => setLightboxSrc(img.src)}>
                                <img src={img.src} alt={img.caption || proj.name} className={img.fit === 'contain' ? 'w-full h-auto block' : 'w-full h-full object-cover'} loading="lazy" />
                              </div>
                              {imgCaption(img)}
                            </div>
                          ))}
                          {regular.length > 0 && (
                            <div className={`grid gap-3 ${regular.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                              {regular.map((img, k) => (
                                <div key={k} className="flex flex-col items-center">
                                  <div className={`w-full overflow-hidden rounded-lg bg-neutral-900 cursor-zoom-in ${regular.length === 1 ? 'h-52' : 'h-64'}`} onClick={() => setLightboxSrc(img.src)}>
                                    <img src={img.src} alt={img.caption || proj.name} className={`w-full h-full ${img.fit === 'contain' ? 'object-contain' : 'object-cover'}`} loading="lazy" />
                                  </div>
                                  {imgCaption(img)}
                                </div>
                              ))}
                            </div>
                          )}
                          {wide.map((img, k) => (
                            <div key={k} className="flex flex-col items-center">
                              <div className="w-3/5 overflow-hidden rounded-lg bg-neutral-900 mx-auto cursor-zoom-in" onClick={() => setLightboxSrc(img.src)}>
                                <img src={img.src} alt={img.caption || proj.name} className="w-full block" loading="lazy" />
                              </div>
                              {imgCaption(img)}
                            </div>
                          ))}
                        </div>
                      )
                    })()}

                    {proj.note && (
                      <p className="mt-3 text-sm font-bold text-neutral-400 italic leading-relaxed">{proj.note}</p>
                    )}

                    {i < selected.projects.length - 1 && (
                      <div className="mt-6 border-t border-neutral-800/60" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </section>
  )
}
