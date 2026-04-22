import * as THREE from 'three'
import type { PortfolioScene, Project } from './types'
import { WORKBENCH_TOOLS, SKYLINE_CARDS, type WorkbenchTool } from '../data/content'

// ─── Types ─────────────────────────────────────────────────────────────────

interface PolaroidEntry {
  group: THREE.Group
  data: WorkbenchTool
  allMeshes: THREE.Mesh[]
  glowMesh: THREE.Mesh
  hoverZ: number
  hovering: boolean
}

// ─── PegboardScene ─────────────────────────────────────────────────────────

export class PegboardScene implements PortfolioScene {
  private renderer!: THREE.WebGLRenderer
  private scene!: THREE.Scene
  private camera!: THREE.PerspectiveCamera
  private clock = new THREE.Clock()
  private animId = 0

  private polaroids: PolaroidEntry[] = []
  private meshToPolaroid = new Map<THREE.Mesh, PolaroidEntry>()
  private hoveredPolaroid: PolaroidEntry | null = null

  private raycaster = new THREE.Raycaster()
  private mouse = new THREE.Vector2(-9999, -9999)
  private mouseX = 0
  private mouseY = 0

  private camCurrentX = -9
  private camTargetX = -9

  private isDragging = false
  private dragStartX = 0
  private dragStartCamX = 0
  private dragPixelsMoved = 0
  private maxAnisotropy = 1

  private canvas!: HTMLCanvasElement
  private onCardClickCb!: (id: string) => void
  private tooltip!: HTMLDivElement

  private boundMouseDown!: (e: MouseEvent) => void
  private boundMouseMove!: (e: MouseEvent) => void
  private boundMouseUp!: () => void
  private boundClick!: (e: MouseEvent) => void
  private boundMouseLeave!: () => void
  private boundTouchStart!: (e: TouchEvent) => void
  private boundTouchMove!: (e: TouchEvent) => void
  private boundTouchEnd!: () => void

  // ─── Camera range constants ────────────────────────────────────────────
  private static readonly CAM_MIN = -9
  private static readonly CAM_MAX = +10

  // ─── init ─────────────────────────────────────────────────────────────

  init(canvas: HTMLCanvasElement, _projects: Project[], onCardClick: (id: string) => void): void {
    this.canvas = canvas
    this.onCardClickCb = onCardClick

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy()

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x141210)
    this.scene.fog = new THREE.FogExp2(0x141210, 0.012)

    this.camera = new THREE.PerspectiveCamera(65, canvas.clientWidth / canvas.clientHeight, 0.1, 120)
    this.camera.position.set(-9, 0.4, 8)
    this.camera.lookAt(-9, 0.1, 0)

    this.buildLighting()
    this.buildBackWall()
    this.buildPegboard()
    this.buildRail()
    this.buildShelf()
    this.buildShopLights()
    this.buildAllPolaroids()
    this.createTooltip()
    this.setupEvents()

    this.clock.start()
    this.animate()
  }

  // ─── Lighting ─────────────────────────────────────────────────────────

  private buildLighting(): void {
    this.scene.add(new THREE.AmbientLight(0xfff8f0, 0.28))
    this.scene.add(new THREE.HemisphereLight(0xfff5e0, 0x1a1510, 0.18))

    const addSpot = (x: number) => {
      const spot = new THREE.SpotLight(0xfff5e0, 4.5, 30, Math.PI / 6, 0.45, 1.2)
      spot.position.set(x, 9, 5.5)
      spot.target.position.set(x, 0, 0)
      spot.castShadow = true
      spot.shadow.mapSize.set(1024, 1024)
      spot.shadow.camera.near = 1
      spot.shadow.camera.far = 20
      this.scene.add(spot)
      this.scene.add(spot.target)
    }
    addSpot(-8)
    addSpot(5)
  }

  // ─── Background wall ──────────────────────────────────────────────────

  private buildBackWall(): void {
    const mat = new THREE.MeshStandardMaterial({ color: 0x1c1814, roughness: 1.0 })
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(60, 20), mat)
    wall.position.set(0, 1, -0.2)
    wall.receiveShadow = true
    this.scene.add(wall)
  }

  // ─── Pegboard ─────────────────────────────────────────────────────────

  private pegboardTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 512; c.height = 512
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#c4a882'
    ctx.fillRect(0, 0, 512, 512)
    // Subtle wood grain
    for (let i = 0; i < 60; i++) {
      const y = Math.random() * 512
      const l = Math.random() * 0.06
      ctx.fillStyle = `rgba(${Math.floor(80 + l * 80)},${Math.floor(55 + l * 55)},${Math.floor(30 + l * 30)},0.22)`
      ctx.fillRect(0, y, 512, 1 + Math.random() * 3)
    }
    // Pegboard holes
    ctx.fillStyle = '#8a6a44'
    for (let px = 16; px < 512; px += 26) {
      for (let py = 16; py < 512; py += 26) {
        ctx.beginPath()
        ctx.arc(px, py, 3.8, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    const tex = new THREE.CanvasTexture(c)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(10, 4)
    tex.anisotropy = this.maxAnisotropy
    return tex
  }

  private buildPegboard(): void {
    const mat = new THREE.MeshStandardMaterial({
      color: 0xc4a882,
      roughness: 0.92,
      map: this.pegboardTexture(),
    })
    const board = new THREE.Mesh(new THREE.BoxGeometry(44, 8.4, 0.06), mat)
    board.position.set(0, 0.3, 0)
    board.receiveShadow = true
    this.scene.add(board)
  }

  private buildRail(): void {
    const mat = new THREE.MeshStandardMaterial({ color: 0x5c3d18, roughness: 0.88 })
    const rail = new THREE.Mesh(new THREE.BoxGeometry(44, 0.3, 0.14), mat)
    rail.position.set(0, 4.58, 0.04)
    rail.castShadow = true
    this.scene.add(rail)
  }

  // ─── Shelf ────────────────────────────────────────────────────────────

  private buildShelf(): void {
    const mat = new THREE.MeshStandardMaterial({ color: 0x5c3d18, roughness: 0.88 })

    // Shelf surface
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(44, 0.18, 0.5), mat)
    shelf.position.set(0, -3.88, 0.22)
    shelf.receiveShadow = true
    shelf.castShadow = true
    this.scene.add(shelf)

    // Shelf front lip
    const lip = new THREE.Mesh(new THREE.BoxGeometry(44, 0.1, 0.04), mat)
    lip.position.set(0, -3.93, 0.46)
    this.scene.add(lip)

    this.buildShelfProps()
  }

  private buildShelfProps(): void {
    const SY = -3.76  // shelf surface y

    // ── Helper: mug ────────────────────────────────────────────────
    const addMug = (x: number, color: number) => {
      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.7 })
      const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.13, 0.36, 16), mat)
      mug.position.set(x, SY + 0.18, 0.22); mug.castShadow = true; this.scene.add(mug)
      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.024, 8, 14), mat)
      handle.position.set(x + 0.18, SY + 0.18, 0.22)
      handle.rotation.y = Math.PI / 2; this.scene.add(handle)
    }

    // ── Helper: notebook + pencil ─────────────────────────────────
    const addNotebook = (x: number, color: number, rotY = 0.12) => {
      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.9 })
      const nb = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.04, 0.96), mat)
      nb.position.set(x, SY + 0.02, 0.22); nb.rotation.y = rotY; this.scene.add(nb)
      const pMat = new THREE.MeshStandardMaterial({ color: 0xf5c518, roughness: 0.7 })
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.8, 7), pMat)
      p.position.set(x + 0.28, SY + 0.03, 0.28)
      p.rotation.z = Math.PI / 2; p.rotation.y = rotY + 0.1; this.scene.add(p)
    }

    // ── Helper: polaroid stack ────────────────────────────────────
    const addPolaroidStack = (x: number) => {
      const mat = new THREE.MeshStandardMaterial({ color: 0xf5f5f0, roughness: 0.85 })
      for (let i = 0; i < 5; i++) {
        const card = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.025, 0.92), mat)
        card.position.set(x + i * 0.007, SY + 0.012 + i * 0.026, 0.18)
        card.rotation.y = (i % 2 === 0 ? 1 : -1) * 0.04
        this.scene.add(card)
      }
    }

    // ── Helper: tape roll ─────────────────────────────────────────
    const addTape = (x: number, color: number) => {
      const mat = new THREE.MeshStandardMaterial({ color, metalness: 0.25, roughness: 0.75 })
      const tape = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.09, 8, 16), mat)
      tape.position.set(x, SY + 0.09, 0.22); tape.rotation.x = Math.PI / 2; this.scene.add(tape)
    }

    // ── Helper: pencil cup ────────────────────────────────────────
    const addPencilCup = (x: number, cupColor: number) => {
      const mat = new THREE.MeshStandardMaterial({ color: cupColor, roughness: 0.82 })
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.16, 0.42, 12), mat)
      cup.position.set(x, SY + 0.21, 0.22); this.scene.add(cup)
      const colors = [0xf5c518, 0xff6b6b, 0x6bcfff]
      for (let i = 0; i < 3; i++) {
        const pm = new THREE.MeshStandardMaterial({ color: colors[i], roughness: 0.7 })
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.68, 7), pm)
        p.position.set(x + (i - 1) * 0.1, SY + 0.55, 0.22)
        p.rotation.z = (i - 1) * 0.2; this.scene.add(p)
      }
    }

    // ── Helper: wire spool ────────────────────────────────────────
    const addWireSpool = (x: number, spoolColor: number, wireColor: number) => {
      const smat = new THREE.MeshStandardMaterial({ color: spoolColor, roughness: 0.75 })
      const spool = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.28, 14), smat)
      spool.position.set(x, SY + 0.09, 0.22); spool.rotation.z = Math.PI / 2; this.scene.add(spool)
      const wmat = new THREE.MeshStandardMaterial({ color: wireColor, roughness: 0.6 })
      const wire = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.025, 6, 20), wmat)
      wire.position.set(x, SY + 0.09, 0.22); wire.rotation.z = Math.PI / 2; this.scene.add(wire)
    }

    // ── Helper: small box (3D-printed part) ──────────────────────
    const addBox = (x: number, color: number, rotY = 0.1) => {
      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.8 })
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.3, 0.46), mat)
      box.position.set(x, SY + 0.15, 0.22); box.rotation.y = rotY
      box.castShadow = true; this.scene.add(box)
    }

    // ── Distribute props across x = -9 to +10 ────────────────────
    addMug(-8.5, 0x8b2020)
    addNotebook(-7.0, 0xf0ebdb, 0.12)
    addPolaroidStack(-5.6)
    addTape(-4.2, 0x3a3a3a)
    addPencilCup(-2.8, 0x7a5230)
    addWireSpool(-1.3, 0x885533, 0xcc3333)
    addBox(0.3, 0x2a4a6b, 0.2)
    addNotebook(1.7, 0x1a2a3a, -0.1)
    addTape(3.1, 0x556b2f)
    addPencilCup(4.5, 0x4a3060)
    addMug(6.0, 0x1a4a6a)
    addWireSpool(7.4, 0x3a3a3a, 0x22c55e)
    addBox(8.8, 0x3a2a1a, -0.15)
    addPolaroidStack(9.8)
  }

  // ─── Shop light fixtures ───────────────────────────────────────────────

  private buildShopLights(): void {
    const fixtureMat = new THREE.MeshStandardMaterial({ color: 0x777777, roughness: 0.55 })
    const stripMat = new THREE.MeshStandardMaterial({
      color: 0xfff8e0,
      emissive: new THREE.Color(0xfff5e0),
      emissiveIntensity: 1.8,
    })
    for (const lx of [-8, 5]) {
      const body = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.14, 0.42), fixtureMat)
      body.position.set(lx, 6, 3)
      this.scene.add(body)
      const strip = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.01, 0.32), stripMat)
      strip.position.set(lx, 5.93, 3)
      this.scene.add(strip)
      // Hanging wires
      const wireMat2 = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.7 })
      for (const wx of [-1.5, 1.5]) {
        const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.5, 4), wireMat2)
        wire.position.set(lx + wx, 6.82, 3)
        this.scene.add(wire)
      }
    }
  }

  // ─── Polaroid photo texture ────────────────────────────────────────────

  private makePolaroidTexture(tool: WorkbenchTool, pxW: number, pxH: number): THREE.CanvasTexture {
    const S = 2
    const c = document.createElement('canvas')
    c.width = pxW * S; c.height = pxH * S
    const ctx = c.getContext('2d')!

    const photoH = Math.floor(pxH * 0.74)
    const pad = 10
    const label = tool.callout.line1.replace(' ★', '')

    const drawPolaroid = (img?: HTMLImageElement) => {
      ctx.setTransform(S, 0, 0, S, 0, 0)

      // White polaroid border
      ctx.fillStyle = '#f7f5ef'
      ctx.fillRect(0, 0, pxW, pxH)

      if (img) {
        // Real photo — cover-fit into photo area
        const dw = pxW - pad * 2, dh = photoH - pad
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          const scale = Math.max(dw / img.naturalWidth, dh / img.naturalHeight)
          const sw = dw / scale, sh = dh / scale
          const sx = (img.naturalWidth - sw) / 2, sy = (img.naturalHeight - sh) / 2
          ctx.drawImage(img, sx, sy, sw, sh, pad, pad, dw, dh)
        } else {
          ctx.drawImage(img, pad, pad, dw, dh)
        }
      } else {
        // Gradient placeholder
        const grad = ctx.createLinearGradient(pad, pad, pxW - pad, photoH)
        grad.addColorStop(0, lighten(tool.placeholderColor, 0.15))
        grad.addColorStop(1, tool.placeholderColor)
        ctx.fillStyle = grad
        ctx.fillRect(pad, pad, pxW - pad * 2, photoH - pad)

        // Center label on placeholder
        const fontSize = Math.max(10, Math.floor(pxW * 0.095))
        ctx.fillStyle = 'rgba(255,255,255,0.85)'
        ctx.font = `bold ${fontSize}px "Courier New", monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const midY = pad + (photoH - pad) / 2
        if (tool.featured) {
          ctx.font = `${Math.floor(pxW * 0.18)}px sans-serif`
          ctx.fillText('★', pxW / 2, midY - fontSize * 0.9)
          ctx.font = `bold ${fontSize}px "Courier New", monospace`
        }
        ctx.fillText(label, pxW / 2, tool.featured ? midY + fontSize * 0.7 : midY)
      }

      // Vignette over photo area
      const vig = ctx.createRadialGradient(pxW / 2, photoH / 2, pxW * 0.1, pxW / 2, photoH / 2, pxW * 0.7)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.22)')
      ctx.fillStyle = vig
      ctx.fillRect(pad, pad, pxW - pad * 2, photoH - pad)

      // Caption strip
      ctx.fillStyle = '#f7f5ef'
      ctx.fillRect(0, photoH, pxW, pxH - photoH)
      const capFontSize = Math.max(8, Math.floor(pxW * 0.078))
      ctx.fillStyle = '#222222'
      ctx.font = `bold ${capFontSize}px "Courier New", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(label, pxW / 2, photoH + (pxH - photoH) / 2)
    }

    drawPolaroid()

    const tex = new THREE.CanvasTexture(c)
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.generateMipmaps = false
    tex.anisotropy = this.maxAnisotropy

    if (tool.imagePath && !tool.imagePath.toLowerCase().endsWith('.gif')) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => { drawPolaroid(img); tex.needsUpdate = true }
      img.src = tool.imagePath
    }

    return tex
  }

  // ─── Polaroid card ────────────────────────────────────────────────────

  private buildPolaroid(
    tool: WorkbenchTool,
    x: number, y: number,
    rotZ: number,
    w: number,
    order = 0
  ): void {
    const h = w * 1.22
    const group = new THREE.Group()
    const meshes: THREE.Mesh[] = []

    // Card body (white, with slight depth)
    const cardMat = new THREE.MeshStandardMaterial({
      color: 0xf5f4ee,
      roughness: 0.88,
      transparent: true,
      opacity: 1,
    })
    const card = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.032), cardMat)
    card.castShadow = true
    card.receiveShadow = true
    group.add(card); meshes.push(card)

    // Photo texture on front face
    const texW = 220, texH = Math.floor(220 * 1.22)
    const tex = this.makePolaroidTexture(tool, texW, texH)
    const photoMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 1 })
    const photo = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.02, h - 0.02), photoMat)
    photo.position.z = 0.017
    group.add(photo); meshes.push(photo)

    // Subtle shadow plane on the pegboard (always slightly behind card)
    const shadowTex = this.makeShadowTexture(w, h)
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.28, depthWrite: false, depthTest: false })
    const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.18, h + 0.18), shadowMat)
    shadowPlane.position.set(0.05, -0.05, -0.09)
    shadowPlane.renderOrder = -1
    group.add(shadowPlane)

    // Glow plane (category color, behind card, visible on hover)
    const glowColor = tool.category === 'experience' ? 0x3b82f6 : 0x22c55e
    const glowMat = new THREE.MeshBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: false,
    })
    const glowMesh = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.12, h + 0.12), glowMat)
    glowMesh.position.z = -0.07
    glowMesh.renderOrder = -1
    group.add(glowMesh)

    // Attachment (pin or binder clip)
    this.addAttachment(group, tool, w, h)

    // Position and rotate group; start at z=0.06 (pinned to board)
    group.position.set(x, y, 0.06)
    group.rotation.z = rotZ
    group.renderOrder = order
    this.scene.add(group)

    // Give each polaroid its own material instances for independent opacity
    meshes.forEach(m => { m.material = (m.material as THREE.Material).clone() })

    const entry: PolaroidEntry = { group, data: tool, allMeshes: meshes, glowMesh, hoverZ: 0, hovering: false }
    meshes.forEach(m => this.meshToPolaroid.set(m, entry))
    this.polaroids.push(entry)
  }

  private makeShadowTexture(w: number, h: number): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 64; c.height = 64
    const ctx = c.getContext('2d')!
    const grad = ctx.createRadialGradient(28, 36, 4, 32, 32, 32)
    grad.addColorStop(0, 'rgba(0,0,0,0.55)')
    grad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)
    const tex = new THREE.CanvasTexture(c)
    tex.minFilter = THREE.LinearFilter
    tex.generateMipmaps = false
    void w; void h
    return tex
  }

  private addAttachment(group: THREE.Group, tool: WorkbenchTool, w: number, h: number): void {
    const topY = h / 2

    if (tool.featured) {
      // Binder clip (dark metallic jaws)
      const clipMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.65, roughness: 0.35 })
      const clipW = w * 0.3

      const jawF = new THREE.Mesh(new THREE.BoxGeometry(clipW, 0.058, 0.05), clipMat)
      jawF.position.set(0, topY + 0.032, 0.022)
      group.add(jawF)

      const jawB = new THREE.Mesh(new THREE.BoxGeometry(clipW, 0.058, 0.05), clipMat)
      jawB.position.set(0, topY + 0.032, -0.022)
      group.add(jawB)

      const handleMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.5 })
      for (const sx of [-1, 1]) {
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.15, 0.014), handleMat)
        arm.position.set(sx * clipW * 0.42, topY + 0.12, 0)
        arm.rotation.z = sx * 0.32
        group.add(arm)
      }
    } else {
      // Push pin (blue for experience, green for projects)
      const pinColor = tool.category === 'experience' ? 0x3b82f6 : 0x22c55e
      const pinMat = new THREE.MeshStandardMaterial({ color: pinColor, roughness: 0.55 })

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.058, 10, 10), pinMat)
      head.position.set(0, topY + 0.065, 0.09)
      group.add(head)

      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.007, 0.13, 6), pinMat)
      stem.position.set(0, topY + 0.008, -0.0)
      stem.rotation.x = Math.PI / 2
      group.add(stem)
    }
  }

  // ─── Zone labels ──────────────────────────────────────────────────────

  private buildZoneLabel(text: string, x: number, y: number): void {
    const W = 210, H = 54
    const S = 2
    const c = document.createElement('canvas')
    c.width = W * S; c.height = H * S
    const ctx = c.getContext('2d')!
    ctx.scale(S, S)

    ctx.fillStyle = '#fffde7'
    ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = '#d4c090'
    ctx.lineWidth = 1.5
    ctx.strokeRect(0.75, 0.75, W - 1.5, H - 1.5)

    ctx.fillStyle = '#2a2010'
    ctx.font = `bold 21px "Courier New", monospace`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, W / 2, H / 2)

    const tex = new THREE.CanvasTexture(c)
    tex.minFilter = THREE.LinearFilter
    tex.generateMipmaps = false
    tex.anisotropy = this.maxAnisotropy

    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.92 })
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.3), mat)
    mesh.position.set(x, y, 0.1)
    this.scene.add(mesh)

    // Red tack pin
    const tackMat = new THREE.MeshStandardMaterial({ color: 0xcc3333, roughness: 0.55 })
    const tack = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), tackMat)
    tack.position.set(x, y + 0.185, 0.14)
    this.scene.add(tack)
  }

  // ─── Layout of all polaroids ──────────────────────────────────────────

  // ─── Zone separator (thin wooden slat between zones) ─────────────────

  private buildZoneSeparator(x: number): void {
    const mat = new THREE.MeshStandardMaterial({ color: 0x7a5c38, roughness: 0.85 })
    const slat = new THREE.Mesh(new THREE.BoxGeometry(0.08, 8.0, 0.1), mat)
    slat.position.set(x, 0.3, 0.05)
    slat.castShadow = true
    this.scene.add(slat)

    // Small nail heads on the slat
    const nailMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.7, roughness: 0.4 })
    for (const ny of [2.8, 0.0, -2.4]) {
      const nail = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.04, 8), nailMat)
      nail.position.set(x, ny, 0.12)
      nail.rotation.x = Math.PI / 2
      this.scene.add(nail)
    }
  }

  private buildAllPolaroids(): void {
    const exp  = WORKBENCH_TOOLS.filter(t => t.category === 'experience')
    const feat = WORKBENCH_TOOLS.filter(t => t.category === 'project' && t.featured)
    const rest = WORKBENCH_TOOLS.filter(t => t.category === 'project' && !t.featured)

    const get = (list: WorkbenchTool[], id: string) => list.find(t => t.id === id)!
    let order = 0

    const W = 1.9  // uniform size for all polaroids

    // ── ZONE 1: Co-ops  (x ≈ -9 to -5.8) ────────────────────────────
    this.buildZoneLabel('CO-OPS', -7.5, 3.5)
    this.buildPolaroid(get(exp, 'berkshire-grey'), -8.5, 1.6,  -0.04, W, order++)
    this.buildPolaroid(get(exp, 'amazon'),          -6.7, 1.5,   0.03, W, order++)
    this.buildPolaroid(get(exp, 'draper'),          -7.7, -1.4, -0.02, W, order++)

    // Gap 1 midpoint: (-5.75 + -4.95) / 2 = -5.35
    this.buildZoneSeparator(-5.35)

    // ── ZONE 2: Highlights  (x ≈ -4.2 to -0.5) ───────────────────────
    this.buildZoneLabel('HIGHLIGHTS', -2.5, 3.5)
    this.buildPolaroid(get(feat, 'bourbot'),      -4.0, 1.7,  -0.05, W, order++)
    this.buildPolaroid(get(feat, 'cobra'),        -1.6, 1.5,   0.04, W, order++)
    this.buildPolaroid(get(feat, 'brailleforge'), -2.8, -1.7,  0.02, W, order++)

    // Gap 2 midpoint: (-0.65 + 0.85) / 2 = 0.10
    this.buildZoneSeparator(0.10)

    // ── ZONE 3: Generate PDC  (x ≈ 1.3 to 4.8) ───────────────────────
    this.buildZoneLabel('GENERATE PDC', 3.1, 3.5)
    const generateLayout: { id: string; x: number; y: number; r: number }[] = [
      { id: 'fitolux',  x: 1.8, y:  1.4, r: -0.04 },
      { id: 'wavewise', x: 4.0, y:  1.4, r:  0.03 },
      { id: 'cstar',    x: 2.9, y: -1.2, r:  0.02 },
    ]
    for (const { id, x, y, r } of generateLayout) {
      const tool = rest.find(t => t.id === id)
      if (tool) this.buildPolaroid(tool, x, y, r, W, order++)
    }

    // Gap 3 midpoint: (4.95 + 5.55) / 2 = 5.25
    this.buildZoneSeparator(5.25)

    // ── ZONE 4: Projects  (x ≈ 6.1 to 9.5) ──────────────────────────
    this.buildZoneLabel('PROJECTS', 7.8, 3.5)
    const projectLayout: { id: string; x: number; y: number; r: number }[] = [
      { id: 'golf-tee',     x: 6.5, y:  1.4, r:  0.05 },
      { id: 'hammer',       x: 8.5, y:  1.4, r: -0.04 },
      { id: 'robotic-hand', x: 7.1, y: -1.2, r: -0.03 },
      { id: 'ne-racing',    x: 9.1, y: -1.2, r:  0.04 },
    ]
    for (const { id, x, y, r } of projectLayout) {
      const tool = rest.find(t => t.id === id)
      if (tool) this.buildPolaroid(tool, x, y, r, W, order++)
    }
  }

  // ─── Decorative elements (hooks, tools, pegboard dressing) ────────────

  private buildDecorativeElements(): void {
    // intentionally empty — wall shows polaroids only
  }

  private buildWrench(x: number, y: number, z: number): void {
    const mat = new THREE.MeshStandardMaterial({ color: 0x7a7a7a, metalness: 0.75, roughness: 0.28 })
    // Handle
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.72, 0.06), mat)
    handle.position.set(x, y - 0.18, z)
    this.scene.add(handle)
    // Open end jaws
    const jaw1 = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.07, 0.06), mat)
    jaw1.position.set(x - 0.06, y + 0.22, z)
    this.scene.add(jaw1)
    const jaw2 = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.07, 0.06), mat)
    jaw2.position.set(x - 0.06, y + 0.32, z)
    this.scene.add(jaw2)
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.18, 0.06), mat)
    bridge.position.set(x - 0.12, y + 0.27, z)
    this.scene.add(bridge)
    // Hanging hook
    const hookMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.6 })
    const hkStem = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.2, 6), hookMat)
    hkStem.position.set(x, y + 0.57, z)
    this.scene.add(hkStem)
    const hkArm = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.09, 6), hookMat)
    hkArm.position.set(x, y + 0.47, z + 0.07)
    hkArm.rotation.x = Math.PI / 2
    this.scene.add(hkArm)
  }

  private buildScrewdrivers(x: number, y: number, z: number): void {
    const configs = [
      { dx: -0.16, handleColor: 0xcc2222, tipLen: 0.28 },
      { dx:  0.00, handleColor: 0x2255cc, tipLen: 0.24 },
      { dx:  0.16, handleColor: 0xdd8800, tipLen: 0.32 },
    ]
    for (const { dx, handleColor, tipLen } of configs) {
      const hMat = new THREE.MeshStandardMaterial({ color: handleColor, roughness: 0.65 })
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.022, 0.3, 10), hMat)
      handle.position.set(x + dx, y - 0.14, z)
      this.scene.add(handle)
      const sMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.8, roughness: 0.25 })
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.007, tipLen, 6), sMat)
      shaft.position.set(x + dx, y - 0.14 - 0.15 - tipLen / 2, z)
      this.scene.add(shaft)
    }
    // Shared hook
    const hookMat = new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.6 })
    const hkStem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.2, 6), hookMat)
    hkStem.position.set(x, y + 0.18, z)
    this.scene.add(hkStem)
    const hkArm = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.08, 6), hookMat)
    hkArm.position.set(x, y + 0.08, z + 0.06)
    hkArm.rotation.x = Math.PI / 2
    this.scene.add(hkArm)
  }

  private buildTapeMeasure(x: number, y: number, z: number): void {
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xdd8800, roughness: 0.7 })
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.28, 0.14), bodyMat)
    body.position.set(x, y, z)
    this.scene.add(body)
    const clipMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.7, roughness: 0.3 })
    const clip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.24, 0.016), clipMat)
    clip.position.set(x + 0.19, y, z + 0.07)
    this.scene.add(clip)
    const labelMat = new THREE.MeshStandardMaterial({ color: 0xffcc00, roughness: 0.85 })
    const label = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.002), labelMat)
    label.position.set(x - 0.02, y + 0.02, z + 0.071)
    this.scene.add(label)
  }

  private buildZipTies(x: number, y: number, z: number): void {
    const mat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.7 })
    // Small bundle of zip ties hanging on a hook
    for (let i = 0; i < 5; i++) {
      const zt = new THREE.Mesh(new THREE.TorusGeometry(0.048 + i * 0.004, 0.007, 6, 14), mat)
      zt.position.set(x + (i - 2) * 0.022, y - 0.08, z)
      zt.rotation.x = Math.PI / 2
      this.scene.add(zt)
    }
    const hookMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.6 })
    const hkStem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.18, 6), hookMat)
    hkStem.position.set(x, y + 0.1, z)
    this.scene.add(hkStem)
    const hkArm = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.07, 6), hookMat)
    hkArm.position.set(x, y + 0.01, z + 0.05)
    hkArm.rotation.x = Math.PI / 2
    this.scene.add(hkArm)
  }

  private buildPliers(x: number, y: number, z: number): void {
    const mat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.65, roughness: 0.4 })
    const hMat = new THREE.MeshStandardMaterial({ color: 0xcc2200, roughness: 0.72 })
    // Two jaw halves
    const jaw1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.04), mat)
    jaw1.position.set(x - 0.03, y + 0.1, z)
    jaw1.rotation.z = 0.12
    this.scene.add(jaw1)
    const jaw2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.04), mat)
    jaw2.position.set(x + 0.03, y + 0.1, z)
    jaw2.rotation.z = -0.12
    this.scene.add(jaw2)
    // Pivot pin
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.06, 8), mat)
    pin.position.set(x, y + 0.04, z)
    pin.rotation.x = Math.PI / 2
    this.scene.add(pin)
    // Handles
    const h1 = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.014, 0.46, 8), hMat)
    h1.position.set(x - 0.055, y - 0.28, z)
    h1.rotation.z = -0.18
    this.scene.add(h1)
    const h2 = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.014, 0.46, 8), hMat)
    h2.position.set(x + 0.055, y - 0.28, z)
    h2.rotation.z = 0.18
    this.scene.add(h2)
    // Hanging hook
    const hookMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.6 })
    const hkStem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.18, 6), hookMat)
    hkStem.position.set(x, y + 0.56, z)
    this.scene.add(hkStem)
    const hkArm = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.07, 6), hookMat)
    hkArm.position.set(x, y + 0.47, z + 0.05)
    hkArm.rotation.x = Math.PI / 2
    this.scene.add(hkArm)
  }

  private buildPegboardHooks(): void {
    const mat = new THREE.MeshStandardMaterial({ color: 0x8a8a8a, metalness: 0.72, roughness: 0.38 })
    const positions: [number, number][] = [
      [-6.2, 2.6], [-6.2, 1.0], [-4.5, -0.4], [-4.5, 1.8],
      [3.5, 2.8],   [4.5, 1.0],  [12.2, 0.6],  [13.0, 2.2],
    ]
    for (const [hx, hy] of positions) {
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.19, 6), mat)
      stem.position.set(hx, hy + 0.1, 0.07)
      this.scene.add(stem)
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.12, 6), mat)
      arm.position.set(hx, hy, 0.13)
      arm.rotation.x = Math.PI / 2
      this.scene.add(arm)
    }
  }

  private buildCaliperHang(): void {
    const mat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.88, roughness: 0.22 })
    const cx = -5.5, cy = 0.6, cz = 0.12

    const rail = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.05, 0.08), mat)
    rail.position.set(cx, cy, cz)
    this.scene.add(rail)

    const fixedJaw = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.5), mat)
    fixedJaw.position.set(cx - 0.92, cy, cz + 0.25)
    this.scene.add(fixedJaw)

    const movingJaw = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.36), mat)
    movingJaw.position.set(cx + 0.18, cy, cz + 0.2)
    this.scene.add(movingJaw)

    const hookMat = new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.6 })
    const hookStem = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.22, 6), hookMat)
    hookStem.position.set(cx, cy + 0.17, cz - 0.02)
    this.scene.add(hookStem)
    const hookArm = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.09, 6), hookMat)
    hookArm.position.set(cx, cy + 0.06, cz + 0.06)
    hookArm.rotation.x = Math.PI / 2
    this.scene.add(hookArm)
  }

  private buildAllenKeys(): void {
    const mat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.55, roughness: 0.5 })
    const ax = -12.6, ay = 2.6, az = 0.12
    const sizes = [0.52, 0.43, 0.36, 0.28, 0.22]
    for (let i = 0; i < sizes.length; i++) {
      const angle = -0.5 + i * 0.26
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, sizes[i], 6), mat)
      stem.position.set(ax + Math.sin(angle) * 0.16, ay - sizes[i] / 2 * 0.6, az)
      stem.rotation.z = angle
      this.scene.add(stem)
      const short = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.12, 6), mat)
      short.position.set(ax + Math.sin(angle) * 0.16, ay + 0.02, az)
      short.rotation.x = Math.PI / 2
      this.scene.add(short)
    }
    const hookMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.6 })
    const hk = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.22, 6), hookMat)
    hk.position.set(ax, ay + 0.16, az - 0.02)
    this.scene.add(hk)
  }

  private buildLevel(): void {
    const lx = 12.6, ly = 2.2, lz = 0.12
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xd4a820, roughness: 0.72 })
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.2, 0.09), bodyMat)
    body.position.set(lx, ly, lz)
    this.scene.add(body)

    const glassMat = new THREE.MeshStandardMaterial({ color: 0x88ccff, transparent: true, opacity: 0.48 })
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.065, 12), glassMat)
    glass.position.set(lx, ly, lz + 0.076)
    glass.rotation.x = Math.PI / 2
    this.scene.add(glass)

    const bubMat = new THREE.MeshStandardMaterial({ color: 0x00ee88, emissive: new THREE.Color(0x00ee88), emissiveIntensity: 0.35 })
    const bubble = new THREE.Mesh(new THREE.SphereGeometry(0.024, 6, 6), bubMat)
    bubble.position.set(lx, ly, lz + 0.1)
    this.scene.add(bubble)
  }

  private buildRulerLean(): void {
    const W = 160, H = 32
    const S = 2
    const c = document.createElement('canvas')
    c.width = W * S; c.height = H * S
    const ctx = c.getContext('2d')!
    ctx.scale(S, S)
    ctx.fillStyle = '#d4c870'
    ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = '#888'
    ctx.lineWidth = 0.8
    for (let i = 0; i <= 16; i++) {
      const rx = 6 + i * (W - 12) / 16
      const th = i % 4 === 0 ? H * 0.55 : H * 0.35
      ctx.beginPath(); ctx.moveTo(rx, H - 4); ctx.lineTo(rx, H - 4 - th); ctx.stroke()
    }
    ctx.fillStyle = '#333'
    ctx.font = '7px sans-serif'
    ctx.textAlign = 'center'
    for (let i = 0; i <= 4; i++) {
      const rx = 6 + i * 4 * (W - 12) / 16
      ctx.fillText(String(i * 4), rx, H - H * 0.6)
    }

    const tex = new THREE.CanvasTexture(c)
    tex.minFilter = THREE.LinearFilter
    tex.generateMipmaps = false
    tex.anisotropy = this.maxAnisotropy

    const mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide })
    const ruler = new THREE.Mesh(new THREE.PlaneGeometry(7.5, 0.22), mat)
    ruler.position.set(2.5, -3.54, 0.46)
    ruler.rotation.x = -0.62
    this.scene.add(ruler)
  }

  // ─── Sticky notes ─────────────────────────────────────────────────────

  private buildStickyNotes(): void {
    const notes: { x: number; y: number; color: string; text: string; rotZ: number }[] = [
      { x: -6.6, y: 2.2,  color: '#fef08a', text: 'NASA 1st Place!',  rotZ:  0.08 },
      { x:  3.6, y: -0.5, color: '#bbf7d0', text: 'MakeMIT 3rd',      rotZ: -0.06 },
      { x:  8.5, y: 2.6,  color: '#bfdbfe', text: 'Keep building!',   rotZ:  0.10 },
    ]
    for (const n of notes) this.buildStickyNote(n)
  }

  private buildStickyNote(n: { x: number; y: number; color: string; text: string; rotZ: number }): void {
    const W = 114, H = 106
    const S = 2
    const c = document.createElement('canvas')
    c.width = W * S; c.height = H * S
    const ctx = c.getContext('2d')!
    ctx.scale(S, S)

    // Folded-corner effect
    ctx.fillStyle = n.color
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = 'rgba(0,0,0,0.08)'
    ctx.beginPath(); ctx.moveTo(W - 14, 0); ctx.lineTo(W, 14); ctx.lineTo(W, 0); ctx.closePath(); ctx.fill()
    ctx.fillStyle = 'rgba(0,0,0,0.45)'
    ctx.font = `bold 14px "Courier New", monospace`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(n.text, W / 2, H / 2)

    const tex = new THREE.CanvasTexture(c)
    tex.minFilter = THREE.LinearFilter
    tex.generateMipmaps = false
    tex.anisotropy = this.maxAnisotropy

    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.9 })
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 0.68), mat)
    mesh.position.set(n.x, n.y, 0.09)
    mesh.rotation.z = n.rotZ
    this.scene.add(mesh)

    // Push pin on sticky
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xdd4444, roughness: 0.5 })
    const pin = new THREE.Mesh(new THREE.SphereGeometry(0.034, 8, 8), pinMat)
    pin.position.set(n.x, n.y + 0.38, 0.13)
    this.scene.add(pin)
  }

  // ─── Tooltip ──────────────────────────────────────────────────────────

  private createTooltip(): void {
    this.tooltip = document.createElement('div')
    Object.assign(this.tooltip.style, {
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: '200',
      display: 'none',
      background: 'rgba(13,10,7,0.94)',
      border: '1px solid rgba(245,158,11,0.28)',
      borderRadius: '10px',
      padding: '10px 14px',
      maxWidth: '220px',
      boxShadow: '0 6px 28px rgba(0,0,0,0.6)',
      backdropFilter: 'blur(10px)',
      fontFamily: 'system-ui, sans-serif',
    })
    document.body.appendChild(this.tooltip)
  }

  private showTooltip(tool: WorkbenchTool): void {
    const dot = tool.category === 'experience' ? '#3b82f6' : '#22c55e'
    const card = SKYLINE_CARDS.find(c => c.id === tool.id)
    const tags = card?.tags ?? []
    const tagsHtml = tags.length
      ? `<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:8px">${tags.map(t =>
          `<span style="padding:2px 7px;border-radius:99px;font-size:10px;font-family:monospace;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.65)">${t}</span>`
        ).join('')}</div>`
      : ''
    this.tooltip.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px">
        <span style="width:7px;height:7px;border-radius:50%;background:${dot};flex-shrink:0;display:block"></span>
        <strong style="color:#fff;font-size:13px;line-height:1.3">${tool.projectName}</strong>
      </div>
      <p style="color:rgba(255,255,255,0.62);font-size:11px;line-height:1.5;margin:0 0 4px 0">${tool.shortDescription}</p>
      ${tagsHtml}
      <div style="margin-top:8px"><span style="color:rgba(245,158,11,0.75);font-size:10px;font-family:monospace;letter-spacing:0.04em">${tool.category === 'experience' ? 'Click to see experience ↓' : 'Click to learn more →'}</span></div>
    `
    this.tooltip.style.display = 'block'
    this.positionTooltip()
  }

  private positionTooltip(): void {
    const W = this.tooltip.offsetWidth || 220
    const H = this.tooltip.offsetHeight || 80
    let x = this.mouseX + 18
    let y = this.mouseY - H / 2
    if (x + W > window.innerWidth - 8) x = this.mouseX - W - 18
    if (y < 8) y = 8
    if (y + H > window.innerHeight - 8) y = window.innerHeight - H - 8
    this.tooltip.style.left = x + 'px'
    this.tooltip.style.top = y + 'px'
  }

  private hideTooltip(): void { this.tooltip.style.display = 'none' }

  // ─── Events ───────────────────────────────────────────────────────────

  private setupEvents(): void {
    const canvas = this.canvas
    const clamp = (v: number) => Math.max(PegboardScene.CAM_MIN, Math.min(PegboardScene.CAM_MAX, v))

    this.boundMouseDown = (e: MouseEvent) => {
      this.isDragging = true
      this.dragStartX = e.clientX
      this.dragStartCamX = this.camCurrentX
      this.dragPixelsMoved = 0
    }
    this.boundMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      this.mouseX = e.clientX
      this.mouseY = e.clientY
      if (this.isDragging) {
        const dx = e.clientX - this.dragStartX
        this.dragPixelsMoved = Math.abs(dx)
        this.camTargetX = clamp(this.dragStartCamX - dx * 0.011)
      }
    }
    this.boundMouseUp = () => { this.isDragging = false }
    this.boundClick = () => {
      if (this.dragPixelsMoved < 5 && this.hoveredPolaroid) {
        const tool = this.hoveredPolaroid.data
        if (tool.category === 'experience') {
          document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
        } else {
          this.onCardClickCb(tool.id)
        }
      }
    }
    this.boundMouseLeave = () => {
      this.isDragging = false
      this.mouse.set(-9999, -9999)
      this.hideTooltip()
    }
    this.boundTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        this.isDragging = true
        this.dragStartX = e.touches[0].clientX
        this.dragStartCamX = this.camCurrentX
        this.dragPixelsMoved = 0
      }
    }
    this.boundTouchMove = (e: TouchEvent) => {
      if (this.isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - this.dragStartX
        this.dragPixelsMoved = Math.abs(dx)
        this.camTargetX = clamp(this.dragStartCamX - dx * 0.011)
        e.preventDefault()
      }
    }
    this.boundTouchEnd = () => { this.isDragging = false }

    canvas.addEventListener('mousedown', this.boundMouseDown)
    canvas.addEventListener('mousemove', this.boundMouseMove)
    canvas.addEventListener('mouseup', this.boundMouseUp)
    canvas.addEventListener('click', this.boundClick)
    canvas.addEventListener('mouseleave', this.boundMouseLeave)
    canvas.addEventListener('touchstart', this.boundTouchStart, { passive: true })
    canvas.addEventListener('touchmove', this.boundTouchMove, { passive: false })
    canvas.addEventListener('touchend', this.boundTouchEnd)
  }

  // ─── Animation ────────────────────────────────────────────────────────

  private animate(): void {
    this.animId = requestAnimationFrame(() => this.animate())
    const elapsed = this.clock.getElapsedTime()

    // Raycasting
    this.raycaster.setFromCamera(this.mouse, this.camera)
    const allMeshes = this.polaroids.flatMap(p => p.allMeshes)
    const hits = this.raycaster.intersectObjects(allMeshes)
    const hit = hits.length ? (this.meshToPolaroid.get(hits[0].object as THREE.Mesh) ?? null) : null

    if (hit !== this.hoveredPolaroid) {
      if (this.hoveredPolaroid) this.hoveredPolaroid.hovering = false
      this.hoveredPolaroid = hit
      if (hit) { hit.hovering = true; this.showTooltip(hit.data) }
      else this.hideTooltip()
    }

    this.canvas.style.cursor = this.isDragging ? 'grabbing' : hit ? 'pointer' : 'grab'

    for (const p of this.polaroids) {
      const targetZ = p.hovering ? 0.38 : 0
      p.hoverZ += (targetZ - p.hoverZ) * (p.hovering ? 0.14 : 0.09)
      p.group.position.z = 0.06 + p.hoverZ

      const targetScale = p.hovering ? 1.08 : 1.0
      const cs = p.group.scale.x
      p.group.scale.setScalar(cs + (targetScale - cs) * 0.12)

      const glowMat = p.glowMesh.material as THREE.MeshBasicMaterial
      glowMat.opacity += ((p.hovering ? 0.2 : 0) - glowMat.opacity) * 0.12

      const targetOp = !hit || p === hit ? 1.0 : 0.55
      for (const m of p.allMeshes) {
        const mat = m.material as THREE.Material
        mat.opacity += (targetOp - mat.opacity) * 0.09
      }
    }

    if (hit) this.positionTooltip()

    // Smooth camera + idle drift
    this.camCurrentX += (this.camTargetX - this.camCurrentX) * 0.055
    const driftX = Math.sin(elapsed * 0.18) * 0.035
    const driftY = Math.sin(elapsed * 0.24) * 0.022
    this.camera.position.x = this.camCurrentX + driftX
    this.camera.position.y = 0.4 + driftY
    this.camera.lookAt(this.camCurrentX, 0.1, 0)

    this.renderer.render(this.scene, this.camera)
  }

  // ─── PortfolioScene interface ─────────────────────────────────────────

  onScroll(scrollProgress: number): void {
    const range = PegboardScene.CAM_MAX - PegboardScene.CAM_MIN
    this.camTargetX = PegboardScene.CAM_MIN + scrollProgress * range
  }

  resize(width: number, height: number): void {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  dispose(): void {
    cancelAnimationFrame(this.animId)
    this.canvas.removeEventListener('mousedown', this.boundMouseDown)
    this.canvas.removeEventListener('mousemove', this.boundMouseMove)
    this.canvas.removeEventListener('mouseup', this.boundMouseUp)
    this.canvas.removeEventListener('click', this.boundClick)
    this.canvas.removeEventListener('mouseleave', this.boundMouseLeave)
    this.canvas.removeEventListener('touchstart', this.boundTouchStart)
    this.canvas.removeEventListener('touchmove', this.boundTouchMove)
    this.canvas.removeEventListener('touchend', this.boundTouchEnd)
    if (this.tooltip.parentNode) this.tooltip.parentNode.removeChild(this.tooltip)
    this.scene.traverse(obj => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose()
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        for (const m of mats) {
          if ((m as THREE.MeshStandardMaterial).map) (m as THREE.MeshStandardMaterial).map!.dispose()
          m.dispose()
        }
      }
    })
    this.renderer.dispose()
  }
}

// ─── Helper ───────────────────────────────────────────────────────────────

function lighten(hex: string, amount: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, ((n >> 16) & 0xff) + Math.floor(amount * 255))
  const g = Math.min(255, ((n >> 8)  & 0xff) + Math.floor(amount * 255))
  const b = Math.min(255,  (n        & 0xff) + Math.floor(amount * 255))
  return `rgb(${r},${g},${b})`
}
