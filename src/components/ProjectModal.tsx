import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import type { SkylineCard } from '../data/content'

interface Props {
  project: SkylineCard | null
  onClose: () => void
  onLightbox: (src: string) => void
}

export default function ProjectModal({ project, onClose, onLightbox }: Props) {
  const { theme } = useTheme()
  const [galleryIndices, setGalleryIndices] = useState<Record<string, number>>({})
  useEffect(() => { setGalleryIndices({}) }, [project?.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [project])

  if (!project) return null

  const gallery = (project.images ?? []).slice(0, 3)

  const sectionLabel: React.CSSProperties = {
    fontSize: 11,
    fontFamily: 'monospace',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: theme.accent,
    marginBottom: 7,
  }

  function InlineImage({ img }: { img?: { src: string; caption?: string; fill?: boolean; filter?: string; cropBottom?: number; pairSrc?: string; pairCaption?: string } }) {
    if (!img) return null
    if (img.pairSrc) {
      return (
        <div style={{ marginTop: 12, width: '75%', margin: '12px auto 0' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ src: img.src, caption: img.caption }, { src: img.pairSrc, caption: img.pairCaption }].map((item, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div
                  style={{ borderRadius: 8, overflow: 'hidden', background: 'rgba(255,255,255,0.03)', cursor: 'zoom-in' }}
                  onClick={() => onLightbox(item.src)}
                >
                  <img src={item.src} alt={item.caption ?? ''} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
                </div>
                {item.caption && (
                  <p style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.38)', margin: '5px 2px 0', lineHeight: 1.4, textAlign: 'center' }}>
                    {item.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }
    return (
      <div style={{ marginTop: 12, width: '75%', margin: '12px auto 0' }}>
        <div
          style={{ borderRadius: 8, overflow: 'hidden', background: 'rgba(255,255,255,0.03)', cursor: 'zoom-in' }}
          onClick={() => onLightbox(img.src)}
        >
          <img
            src={img.src}
            alt={img.caption ?? ''}
            style={{ width: '100%', height: 'auto', display: 'block', ...(img.filter ? { filter: img.filter } : {}), ...(img.cropBottom ? { clipPath: `inset(0 0 ${img.cropBottom}% 0)`, marginBottom: `-${img.cropBottom}%` } : {}) }}
            loading="lazy"
          />
        </div>
        {img.caption && (
          <p style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.38)', margin: '5px 2px 0', lineHeight: 1.4, textAlign: 'center' }}>
            {img.caption}
          </p>
        )}
      </div>
    )
  }

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            style={{ position: 'fixed', inset: 0, zIndex: 1001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(8px, 3vw, 24px)', pointerEvents: 'none' }}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              pointerEvents: 'auto',
              width: '100%',
              maxWidth: 775,
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#0d0d18',
              border: `1px solid rgba(${theme.accentRgb},0.2)`,
              borderRadius: 14,
              boxShadow: `0 0 48px rgba(${theme.accentRgb},0.1)`,
            }}>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: 'clamp(14px, 3vw, 22px) clamp(14px, 3vw, 22px) clamp(12px, 2vw, 18px)', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
                <div>
                  <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.22em', textTransform: 'uppercase', color: theme.accent, marginBottom: 6 }}>
                    {project.category}
                  </div>
                  <h2 style={{ fontSize: 23, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 5px' }}>
                    {project.name}
                  </h2>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, margin: 0 }}>
                    {project.cardDescription}
                  </p>
                  {project.headerImage && (
                    <div style={{ marginTop: 10, borderRadius: 6, overflow: 'hidden', cursor: 'zoom-in', display: 'flex', justifyContent: 'center' }} onClick={() => onLightbox(project.headerImage!.src)}>
                      <img src={project.headerImage.src} alt={project.headerImage.caption ?? ''} style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />
                    </div>
                  )}
                </div>
                <button
                  onClick={onClose}
                  style={{ flexShrink: 0, marginLeft: 16, width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)' }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: 'clamp(14px, 3vw, 20px) clamp(14px, 3vw, 22px) clamp(18px, 3vw, 26px)', display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Problem + image */}
                {project.problem && (
                  <div>
                    <div style={sectionLabel}>Problem</div>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>
                      {project.problem}
                    </p>
                    <InlineImage img={gallery[0]} />
                  </div>
                )}

                {/* Approach + image */}
                {project.approach && (
                  <div>
                    <div style={sectionLabel}>Approach</div>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>
                      {project.approach}
                    </p>
                    <InlineImage img={gallery[1]} />
                  </div>
                )}

                {/* Galleries (carousel) */}
                {project.galleries && project.galleries.map((gallery) => {
                  const idx = galleryIndices[gallery.label] ?? 0
                  const item = gallery.images[idx]
                  const setIdx = (next: number) =>
                    setGalleryIndices(prev => ({ ...prev, [gallery.label]: next }))
                  const btnStyle: React.CSSProperties = {
                    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                    width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)',
                    background: 'rgba(0,0,0,0.55)', color: '#fff', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, lineHeight: 1, padding: 0, zIndex: 2,
                  }
                  return (
                    <div key={gallery.label}>
                      <div style={sectionLabel}>{gallery.label}</div>
                      <div style={{ position: 'relative' }}>
                        <div style={{ width: '75%', margin: '0 auto', borderRadius: 8, overflow: 'hidden', background: 'rgba(255,255,255,0.03)', cursor: 'zoom-in' }}
                          onClick={() => onLightbox(item.src)}>
                          <img src={item.src} alt={item.caption ?? ''} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
                        </div>
                        {gallery.images.length > 1 && (
                          <>
                            <button style={{ ...btnStyle, left: 0 }}
                              onClick={() => setIdx((idx - 1 + gallery.images.length) % gallery.images.length)}>‹</button>
                            <button style={{ ...btnStyle, right: 0 }}
                              onClick={() => setIdx((idx + 1) % gallery.images.length)}>›</button>
                          </>
                        )}
                      </div>
                      {item.caption && (
                        <p style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.38)', margin: '6px 0 0', lineHeight: 1.4, textAlign: 'center' }}>
                          {item.caption}
                        </p>
                      )}
                      {gallery.images.length > 1 && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 8 }}>
                          {gallery.images.map((_, i) => (
                            <button key={i} onClick={() => setIdx(i)} style={{
                              width: i === idx ? 18 : 6, height: 6, borderRadius: 3, border: 'none',
                              cursor: 'pointer', padding: 0, transition: 'all 0.2s',
                              background: i === idx ? theme.accent : 'rgba(255,255,255,0.2)',
                            }} />
                          ))}
                          <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.28)', marginLeft: 4 }}>
                            {idx + 1} / {gallery.images.length}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Result */}
                {project.result && (
                  <div style={{ padding: '12px 14px', borderRadius: 8, background: `rgba(${theme.accentRgb},0.07)`, border: `1px solid rgba(${theme.accentRgb},0.18)` }}>
                    <div style={{ ...sectionLabel, marginBottom: 4 }}>Result</div>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: 0 }}>
                      {project.result}
                    </p>
                  </div>
                )}

                {/* Key Successes 2×2 grid */}
                {project.successGrid && project.successGrid.length > 0 && (
                  <div>
                    <div style={sectionLabel}>Key Successes</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                      {project.successGrid.map(item => (
                        <div key={item.title} style={{ borderRadius: 8, overflow: 'hidden', position: 'relative', cursor: 'zoom-in' }} onClick={() => onLightbox(item.src)}>
                          <img
                            src={item.src}
                            alt={item.title}
                            style={{ width: '100%', height: 200, objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                            loading="lazy"
                          />
                          <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            padding: '18px 10px 8px',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)',
                            fontSize: 12, fontWeight: 600, color: '#fff',
                          }}>
                            {item.title}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.28)', marginTop: 6, textAlign: 'center', letterSpacing: '0.05em' }}>
                      Click on a GIF to enlarge
                    </p>
                  </div>
                )}

                {/* Highlights + optional side image */}
                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <div style={sectionLabel}>Highlights</div>
                    {project.sideImage ? (
                      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
                          {project.highlights.map((h, i) => (
                            <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                              <span style={{ color: theme.accent, flexShrink: 0, fontSize: 14, lineHeight: 1.2, marginTop: 1 }}>›</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                        <div style={{ flexShrink: 0, width: 130 }}>
                          <div
                            style={{ borderRadius: 8, overflow: 'hidden', background: 'rgba(255,255,255,0.03)', cursor: 'zoom-in' }}
                            onClick={() => onLightbox(project.sideImage!.src)}
                          >
                            <img
                              src={project.sideImage.src}
                              alt={project.sideImage.caption ?? ''}
                              style={{ width: '100%', display: 'block', objectFit: 'contain' }}
                            />
                          </div>
                          {project.sideImage.caption && (
                            <p style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.38)', margin: '5px 2px 0', lineHeight: 1.4 }}>
                              {project.sideImage.caption}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                          {project.highlights.map((h, i) => (
                            <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                              <span style={{ color: theme.accent, flexShrink: 0, fontSize: 14, lineHeight: 1.2, marginTop: 1 }}>›</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                        <InlineImage img={gallery[2]} />
                      </>
                    )}
                  </div>
                )}

                {/* Videos */}
                {project.videos && project.videos.length > 0 && (
                  <div>
                    <div style={sectionLabel}>Videos</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {project.videos.map((vid, i) => {
                        const videoId = vid.url.match(/[?&]v=([^&]+)/)?.[1] ?? vid.url.split('/').pop()
                        return (
                          <div key={i}>
                            <div style={{ borderRadius: 8, overflow: 'hidden', position: 'relative', paddingTop: '56.25%', background: '#000' }}>
                              <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title={vid.caption ?? 'Video'}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                              />
                            </div>
                            {vid.caption && (
                              <p style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.38)', margin: '5px 2px 0', lineHeight: 1.4 }}>
                                {vid.caption}
                              </p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 14 }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{ padding: '3px 9px', borderRadius: 999, fontSize: 11, fontFamily: 'monospace', border: `1px solid rgba(${theme.accentRgb},0.28)`, color: theme.accent, background: `rgba(${theme.accentRgb},0.06)` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* PDF preview */}
                {project.posterPdf && (
                  <div>
                    <div style={{ ...sectionLabel, marginBottom: 8 }}>{project.pdfLabel ?? 'Final Poster'}</div>
                    <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <iframe
                        src={project.posterPdf}
                        title={project.pdfLabel ?? 'PDF'}
                        style={{ width: '100%', height: 520, border: 'none', display: 'block', background: '#fff' }}
                      />
                    </div>
                  </div>
                )}

                {/* Press / article links */}
                {project.articles && project.articles.length > 0 && (
                  <div>
                    <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.22em', textTransform: 'uppercase', color: theme.accent, marginBottom: 8 }}>
                      As Featured In
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {project.articles.map(a => (
                        <a
                          key={a.url}
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            padding: '5px 12px', borderRadius: 999, fontSize: 13,
                            border: '1px solid rgba(255,255,255,0.12)',
                            color: 'rgba(255,255,255,0.7)',
                            background: 'rgba(255,255,255,0.04)',
                            textDecoration: 'none', transition: 'border-color 0.15s, color 0.15s',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = `rgba(${theme.accentRgb},0.4)`
                            ;(e.currentTarget as HTMLAnchorElement).style.color = '#fff'
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)'
                            ;(e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)'
                          }}
                        >
                          {a.label}
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
