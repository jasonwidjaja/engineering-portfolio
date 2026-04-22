export interface Project {
  id: string
  name: string
  tagline: string
  category: 'project' | 'experience'
  featured: boolean
  details: {
    problem?: string
    approach?: string
    result?: string
  }
}

export interface PortfolioScene {
  init(canvas: HTMLCanvasElement, projects: Project[], onCardClick: (id: string) => void): void
  onScroll(scrollProgress: number): void
  resize(width: number, height: number): void
  dispose(): void
}
