import * as THREE from 'three'
import type { Project } from './types'

export function createCardTexture(
  project: Project,
  accent: string,
  lightBackground: boolean = false
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 320
  const ctx = canvas.getContext('2d')!

  if (lightBackground) {
    // Workshop theme - light background
    ctx.fillStyle = '#f5f5f0'
    ctx.fillRect(0, 0, 512, 320)

    // Top accent bar
    ctx.fillStyle = accent
    ctx.fillRect(0, 0, 512, 8)

    // Category label
    ctx.fillStyle = accent
    ctx.font = 'bold 18px monospace'
    ctx.fillText(project.category.toUpperCase(), 24, 40)

    // Project name
    ctx.fillStyle = '#1a1a1a'
    ctx.font = 'bold 32px sans-serif'
    const name = project.name
    ctx.fillText(name.length > 18 ? name.slice(0, 18) + '…' : name, 24, 85)

    // Tagline
    ctx.fillStyle = '#444444'
    ctx.font = '18px sans-serif'
    const words = project.tagline.split(' ')
    let line = ''
    let y = 120
    for (const word of words) {
      const test = line + word + ' '
      if (ctx.measureText(test).width > 460 && line !== '') {
        ctx.fillText(line.trim(), 24, y)
        line = word + ' '
        y += 26
        if (y > 200) break
      } else {
        line = test
      }
    }
    if (y <= 200) ctx.fillText(line.trim(), 24, y)

    // Featured badge
    if (project.featured) {
      ctx.fillStyle = accent
      ctx.fillRect(24, 260, 120, 28)
      ctx.fillStyle = '#1a1a1a'
      ctx.font = 'bold 16px monospace'
      ctx.fillText('FEATURED', 34, 279)
    }
  } else {
    // Dark background (Exploded / Holographic)
    ctx.fillStyle = '#0d0d1a'
    ctx.fillRect(0, 0, 512, 320)

    // Scan-line effect
    ctx.fillStyle = `rgba(${hexToRgb(accent)},0.03)`
    for (let i = 0; i < 320; i += 8) {
      ctx.fillRect(0, i, 512, 4)
    }

    // Top accent bar
    ctx.fillStyle = accent
    ctx.fillRect(0, 0, 512, 6)

    // Category label
    ctx.fillStyle = accent
    ctx.font = 'bold 18px monospace'
    ctx.fillText(project.category.toUpperCase(), 24, 38)

    // Project name
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 30px sans-serif'
    const name = project.name
    ctx.fillText(name.length > 20 ? name.slice(0, 20) + '…' : name, 24, 80)

    // Tagline
    ctx.fillStyle = 'rgba(255,255,255,0.7)'
    ctx.font = '17px sans-serif'
    const words = project.tagline.split(' ')
    let line = ''
    let y = 115
    for (const word of words) {
      const test = line + word + ' '
      if (ctx.measureText(test).width > 464 && line !== '') {
        ctx.fillText(line.trim(), 24, y)
        line = word + ' '
        y += 25
        if (y > 200) break
      } else {
        line = test
      }
    }
    if (y <= 200) ctx.fillText(line.trim(), 24, y)

    // Featured badge
    if (project.featured) {
      ctx.strokeStyle = accent
      ctx.lineWidth = 2
      ctx.strokeRect(24, 258, 120, 28)
      ctx.fillStyle = accent
      ctx.font = 'bold 16px monospace'
      ctx.fillText('FEATURED', 34, 277)
    }

    // Bottom border line
    ctx.fillStyle = `rgba(${hexToRgb(accent)},0.3)`
    ctx.fillRect(0, 314, 512, 2)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
