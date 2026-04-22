import { useState, useCallback } from 'react'
import { useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectsGrid from './components/ProjectsGrid'
import Experience from './components/Experience'
import OffDutyAdventures from './components/OffDutyAdventures'
import ResumeSection from './components/ResumeSection'
import ProjectModal from './components/ProjectModal'
import AwardsBanner from './components/AwardsBanner'
import ContactFooter from './components/ContactFooter'
import Lightbox from './components/Lightbox'
import { SKYLINE_CARDS } from './data/content'

export default function App() {
  const { theme } = useTheme()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const selectedProject = selectedId
    ? SKYLINE_CARDS.find((p) => p.id === selectedId) ?? null
    : null

  const handleCardClick = useCallback((id: string) => {
    setSelectedId(id)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedId(null)
  }, [])

  return (
    <div style={{ backgroundColor: theme.background, color: '#ffffff', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <ProjectsGrid onCardClick={handleCardClick} />
      <Experience />
      <OffDutyAdventures />
      <ResumeSection />
      <AwardsBanner />
      <ContactFooter />
      {selectedProject && <ProjectModal project={selectedProject} onClose={handleClose} onLightbox={setLightboxSrc} />}
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  )
}
