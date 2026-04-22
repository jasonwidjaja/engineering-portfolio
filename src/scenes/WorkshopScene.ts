import * as THREE from 'three'
import type { PortfolioScene, Project } from './types'
import { WORKBENCH_TOOLS, type WorkbenchTool } from '../data/content'

// ─── Types ─────────────────────────────────────────────────────────────────

interface ToolEntry {
  group: THREE.Group
  data: WorkbenchTool
  allMeshes: THREE.Mesh[]
  hoverTime: number
  hovering: boolean
  animateFn: (ht: number, dt: number) => void
  resetFn: () => void
}

interface SteamParticle {
  mesh: THREE.Mesh
  phase: number
  speed: number
  baseY: number
}

interface CalloutEntry {
  dotMesh: THREE.Mesh
  dotMat: THREE.MeshStandardMaterial
  lineMesh: THREE.Line
  lineMat: THREE.LineBasicMaterial
  tickMesh: THREE.Line
  tickMat: THREE.LineBasicMaterial
  labelMesh: THREE.Mesh
  labelMat: THREE.MeshBasicMaterial
  toolEntry: ToolEntry
}

// ─── WorkshopScene ─────────────────────────────────────────────────────────

export class WorkshopScene implements PortfolioScene {
  private renderer!: THREE.WebGLRenderer
  private scene!: THREE.Scene
  private camera!: THREE.PerspectiveCamera
  private clock = new THREE.Clock()
  private animId = 0

  private tools: ToolEntry[] = []
  private meshToTool = new Map<THREE.Mesh, ToolEntry>()
  private hoveredTool: ToolEntry | null = null

  private callouts: CalloutEntry[] = []
  private labelMeshToCallout = new Map<THREE.Mesh, CalloutEntry>()

  private raycaster = new THREE.Raycaster()
  private mouse = new THREE.Vector2(-9999, -9999)

  private onCardClickCb!: (id: string) => void
  private canvas!: HTMLCanvasElement

  private tooltip!: HTMLDivElement
  private mouseX = 0
  private mouseY = 0

  private lampLight!: THREE.PointLight
  private lampLightBaseX = -5.5
  private lampLightTargetX = -5.5

  private steam: SteamParticle[] = []

  private camCurrentX = -5
  private camTargetX = -5

  private boundMouseDown!: (e: MouseEvent) => void
  private boundMouseMove!: (e: MouseEvent) => void
  private boundMouseUp!: () => void
  private boundClick!: (e: MouseEvent) => void
  private boundMouseLeave!: () => void
  private boundTouchStart!: (e: TouchEvent) => void
  private boundTouchMove!: (e: TouchEvent) => void
  private boundTouchEnd!: () => void

  private isDragging = false
  private dragStartX = 0
  private dragStartCamX = 0
  private dragPixelsMoved = 0
  private maxAnisotropy = 1

  // ─── Shared materials ─────────────────────────────────────────────────

  private metalMat!: THREE.MeshStandardMaterial
  private darkMetalMat!: THREE.MeshStandardMaterial
  private brassMat!: THREE.MeshStandardMaterial
  private woodMat!: THREE.MeshStandardMaterial

  // ─── init ─────────────────────────────────────────────────────────────

  init(canvas: HTMLCanvasElement, _projects: Project[], onCardClick: (id: string) => void): void {
    this.canvas = canvas
    this.onCardClickCb = onCardClick

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x1e1408)
    this.scene.fog = new THREE.FogExp2(0x1e1408, 0.048)

    this.camera = new THREE.PerspectiveCamera(48, canvas.clientWidth / canvas.clientHeight, 0.1, 80)
    this.camera.position.set(-5, 5.5, 7.5)
    this.camera.lookAt(-5, 0.5, 0)

    this.makeMaterials()
    this.setupLighting()
    this.buildWorkbench()
    this.buildPegboard()
    this.buildDecorations()
    this.buildAllTools()
    this.buildAllCallouts()
    this.createTooltip()

    this.maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy()

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
        this.camTargetX = Math.max(-5, Math.min(6.5, this.dragStartCamX - dx * 0.01))
      }
    }
    this.boundMouseUp = () => { this.isDragging = false }
    this.boundClick = () => {
      if (this.dragPixelsMoved < 5 && this.hoveredTool) this.onCardClickCb(this.hoveredTool.data.id)
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
        this.camTargetX = Math.max(-5, Math.min(6.5, this.dragStartCamX - dx * 0.01))
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

    this.clock.start()
    this.animate()
  }

  // ─── Materials ────────────────────────────────────────────────────────

  private makeMaterials(): void {
    this.metalMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.88, roughness: 0.22 })
    this.darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.7, roughness: 0.45 })
    this.brassMat = new THREE.MeshStandardMaterial({ color: 0xb08020, metalness: 0.82, roughness: 0.3 })
    this.woodMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.82 })
  }

  // ─── Lighting ─────────────────────────────────────────────────────────

  private setupLighting(): void {
    this.scene.add(new THREE.AmbientLight(0xffa060, 0.22))
    this.scene.add(new THREE.HemisphereLight(0x3a2010, 0x1e1408, 0.38))

    this.lampLight = new THREE.PointLight(0xffb070, 3.8, 28)
    this.lampLight.position.set(-5.5, 3.1, 0)
    this.lampLight.castShadow = true
    this.lampLight.shadow.mapSize.set(1024, 1024)
    this.scene.add(this.lampLight)

    const fill = new THREE.PointLight(0x334466, 0.35, 20)
    fill.position.set(5, 4, 3)
    this.scene.add(fill)
  }

  // ─── Workbench ────────────────────────────────────────────────────────

  private woodTexture(w = 512, h = 128): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = w; c.height = h
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#7a4520'
    ctx.fillRect(0, 0, w, h)
    let y = 0
    while (y < h) {
      const hh = 3 + Math.random() * 5
      const l = Math.random() * 0.28
      ctx.fillStyle = `rgb(${Math.floor(122 + l * 80)},${Math.floor(69 + l * 50)},${Math.floor(32 + l * 22)})`
      ctx.fillRect(0, y, w, hh)
      y += hh
    }
    return new THREE.CanvasTexture(c)
  }

  private buildWorkbench(): void {
    const topMat = new THREE.MeshStandardMaterial({ color: 0x7a4520, roughness: 0.85, map: this.woodTexture() })
    const top = new THREE.Mesh(new THREE.BoxGeometry(14, 0.12, 5.6), topMat)
    top.receiveShadow = true
    this.scene.add(top)

    // Front edge
    const edgeMat = new THREE.MeshStandardMaterial({ color: 0x6a3818, roughness: 0.8, map: this.woodTexture(128, 64) })
    const edge = new THREE.Mesh(new THREE.BoxGeometry(14, 0.09, 0.06), edgeMat)
    edge.position.set(0, -0.105, 2.83)
    this.scene.add(edge)

    // Visible front legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0x5a3215, roughness: 0.95 })
    for (const lx of [-6.5, 6.5]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 3.2, 0.14), legMat)
      leg.position.set(lx, -1.66, 2.42)
      leg.castShadow = true
      this.scene.add(leg)
    }

    // Floor / shadow catcher
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x1a1008, roughness: 1.0 })
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -3.25
    floor.receiveShadow = true
    this.scene.add(floor)
  }

  // ─── Pegboard ─────────────────────────────────────────────────────────

  private buildPegboard(): void {
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x251508, roughness: 1.0 })
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(14, 7), wallMat)
    wall.position.set(0, 2.7, -2.95)
    this.scene.add(wall)

    // Pegboard panel texture
    const pegC = document.createElement('canvas')
    pegC.width = 512; pegC.height = 256
    const pctx = pegC.getContext('2d')!
    pctx.fillStyle = '#3d2210'
    pctx.fillRect(0, 0, 512, 256)
    pctx.fillStyle = '#28160a'
    for (let px = 12; px < 512; px += 16) {
      for (let py = 12; py < 256; py += 16) {
        pctx.beginPath(); pctx.arc(px, py, 2.5, 0, Math.PI * 2); pctx.fill()
      }
    }
    const pegMat = new THREE.MeshStandardMaterial({ color: 0x3d2210, roughness: 0.9, map: new THREE.CanvasTexture(pegC) })
    const peg = new THREE.Mesh(new THREE.PlaneGeometry(12, 4), pegMat)
    peg.position.set(0, 2.0, -2.87)
    this.scene.add(peg)

    // Tool silhouette outlines on pegboard
    this.addPegboardOutlines()
  }

  private addPegboardOutlines(): void {
    const mat = new THREE.LineBasicMaterial({ color: 0x9a7a3a, transparent: true, opacity: 0.75 })

    const drawLines = (pts: number[], pos: [number, number, number]) => {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3))
      const line = new THREE.LineSegments(geo, mat.clone())
      line.position.set(...pos)
      this.scene.add(line)
    }

    // Hammer silhouette
    drawLines([
      0, 0, 0, 0, 1.0, 0,
      0, 1.0, 0, -0.12, 1.0, 0,
      -0.12, 1.0, 0, -0.12, 1.35, 0,
      -0.12, 1.35, 0, 0.12, 1.35, 0,
      0.12, 1.35, 0, 0.12, 1.0, 0,
      0.12, 1.0, 0, 0, 1.0, 0,
    ], [-3.5, 0.5, -2.87])

    // Caliper silhouette
    drawLines([
      -0.8, 0, 0, 0.8, 0, 0,
      -0.8, 0, 0, -0.8, -0.35, 0,
      0.3, 0, 0, 0.3, -0.28, 0,
      -0.1, 0.06, 0, -0.1, -0.06, 0,
    ], [1.5, 1.5, -2.87])

    // Screwdriver silhouette
    drawLines([
      -0.05, 0, 0, 0.05, 0, 0,
      0.05, 0, 0, 0.1, 0.7, 0,
      0.1, 0.7, 0, 0.1, 1.3, 0,
      0.1, 1.3, 0, -0.1, 1.3, 0,
      -0.1, 1.3, 0, -0.1, 0.7, 0,
      -0.1, 0.7, 0, -0.05, 0, 0,
    ], [4.5, 0.6, -2.87])
  }

  // ─── Decorations ──────────────────────────────────────────────────────

  private buildDecorations(): void {
    this.buildDeskLamp()
    this.buildCoffeeMug()
    this.buildNotebook()
  }

  private buildDeskLamp(): void {
    const m = new THREE.MeshStandardMaterial({ color: 0x6a4820, metalness: 0.65, roughness: 0.4 })

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.27, 0.065, 16), m)
    base.position.set(-5.5, 0.065, 0)
    this.scene.add(base)

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.82, 8), m)
    stem.position.set(-5.5, 0.49, 0)
    this.scene.add(stem)

    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 1.05, 8), m)
    arm.position.set(-5.5, 1.31, 0)
    arm.rotation.z = -Math.PI / 5
    this.scene.add(arm)

    const shadeMat = new THREE.MeshStandardMaterial({ color: 0x4a3800, roughness: 0.6 })
    const shade = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.38, 12, 1, true), shadeMat)
    shade.position.set(-5.16, 1.87, 0)
    this.scene.add(shade)

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.06, 8), m)
    cap.position.set(-5.16, 2.05, 0)
    this.scene.add(cap)
  }

  private buildCoffeeMug(): void {
    const mugMat = new THREE.MeshStandardMaterial({ color: 0x8b2020, roughness: 0.7 })
    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.11, 0.32, 16), mugMat)
    mug.position.set(5.5, 0.22, -1.8)
    mug.castShadow = true
    this.scene.add(mug)

    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.022, 8, 14), mugMat)
    handle.position.set(5.63, 0.22, -1.8)
    handle.rotation.y = Math.PI / 2
    this.scene.add(handle)

    // Steam particles
    const steamMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.09, roughness: 1.0 })
    for (let i = 0; i < 4; i++) {
      const sm = new THREE.Mesh(new THREE.SphereGeometry(0.04 + i * 0.012, 5, 5), steamMat.clone())
      const baseY = 0.42 + i * 0.13
      sm.position.set(5.5 + (Math.random() - 0.5) * 0.08, baseY, -1.8)
      this.scene.add(sm)
      this.steam.push({ mesh: sm, phase: i * (Math.PI / 2), speed: 0.38 + Math.random() * 0.28, baseY })
    }
  }

  private buildNotebook(): void {
    const nbMat = new THREE.MeshStandardMaterial({ color: 0xf2eddd, roughness: 0.9 })
    const nb = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.025, 0.67), nbMat)
    nb.position.set(-4.8, 0.02, -1.5)
    nb.rotation.y = 0.18
    nb.receiveShadow = true
    this.scene.add(nb)

    // Sketch lines texture
    const sc = document.createElement('canvas')
    sc.width = 256; sc.height = 192
    const sctx = sc.getContext('2d')!
    sctx.fillStyle = '#f2eddd'
    sctx.fillRect(0, 0, 256, 192)
    sctx.strokeStyle = 'rgba(0,0,0,0.1)'
    sctx.lineWidth = 1
    for (let l = 18; l < 192; l += 14) {
      sctx.beginPath(); sctx.moveTo(14, l); sctx.lineTo(242, l); sctx.stroke()
    }
    sctx.strokeStyle = 'rgba(0,0,0,0.18)'
    sctx.lineWidth = 1.5
    sctx.strokeRect(28, 30, 90, 70)
    sctx.beginPath(); sctx.moveTo(28, 65); sctx.lineTo(118, 65); sctx.stroke()
    const sketchMat = new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(sc), roughness: 0.9 })
    const page = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.65), sketchMat)
    page.position.set(-4.8, 0.037, -1.5)
    page.rotation.x = -Math.PI / 2
    page.rotation.z = 0.18
    this.scene.add(page)

    // Pencil
    const pencilMat = new THREE.MeshStandardMaterial({ color: 0xf5c518, roughness: 0.7 })
    const pencil = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.78, 7), pencilMat)
    pencil.position.set(-4.34, 0.045, -1.5)
    pencil.rotation.z = Math.PI / 2
    pencil.rotation.y = 0.22
    this.scene.add(pencil)

    const tipMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0a, roughness: 0.5 })
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.065, 7), tipMat)
    tip.position.set(-3.94, 0.045, -1.43)
    tip.rotation.z = Math.PI / 2
    tip.rotation.y = 0.22
    this.scene.add(tip)
  }

  // ─── Tool registration ────────────────────────────────────────────────

  private registerTool(
    group: THREE.Group,
    data: WorkbenchTool,
    meshes: THREE.Mesh[],
    animateFn: (ht: number, dt: number) => void,
    resetFn: () => void
  ): ToolEntry {
    group.position.set(data.benchPosition.x, 0.08, data.benchPosition.z)
    group.rotation.y = data.benchPosition.rotationY
    if (data.featured) group.scale.setScalar(1.22)

    // Clone materials so opacity can be independently animated
    meshes.forEach(m => {
      if (!Array.isArray(m.material)) {
        m.material = (m.material as THREE.MeshStandardMaterial).clone()
      }
      m.castShadow = true
    })

    const entry: ToolEntry = { group, data, allMeshes: meshes, hoverTime: 0, hovering: false, animateFn, resetFn }
    meshes.forEach(m => this.meshToTool.set(m, entry))
    this.scene.add(group)
    this.tools.push(entry)
    return entry
  }

  // ─── Build all tools ──────────────────────────────────────────────────

  private buildAllTools(): void {
    for (const tool of WORKBENCH_TOOLS) {
      switch (tool.toolType) {
        case 'calipers':        this.buildCalipers(tool);        break
        case 'sheet-metal':     this.buildSheetMetal(tool);      break
        case 'conveyor-roller': this.buildConveyorRoller(tool);  break
        case 'ball-screw':      this.buildBallScrew(tool);       break
        case 'snake-linkage':   this.buildSnakeLinkage(tool);    break
        case 'embossing-punch': this.buildEmbossingPunch(tool);  break
        case 'sensor-strap':    this.buildSensorStrap(tool);     break
        case 'gripper':         this.buildGripper(tool);         break
        case 'propeller':       this.buildPropeller(tool);       break
        case 'work-glove':      this.buildWorkGlove(tool);       break
        case 'hammer':          this.buildHammer(tool);          break
        case 'golf-tee':        this.buildGolfTee(tool);         break
        case 'roll-bar':        this.buildRollBar(tool);         break
      }
    }
  }

  // ─── Individual tool builders ─────────────────────────────────────────

  // Calipers — Draper Laboratory
  private buildCalipers(data: WorkbenchTool): void {
    const group = new THREE.Group()
    const mat = this.metalMat.clone()
    const meshes: THREE.Mesh[] = []

    // Main rail
    const rail = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.055, 0.085), mat)
    group.add(rail); meshes.push(rail)

    // Fixed jaw (left end, extends in Z)
    const fixedJaw = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.055, 0.52), mat)
    fixedJaw.position.set(-0.89, 0, 0.27)
    group.add(fixedJaw); meshes.push(fixedJaw)

    // Moving jaw (slider group — animated)
    const slider = new THREE.Group()
    slider.position.set(0.22, 0, 0)
    const sliderBody = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.09, 0.1), mat)
    slider.add(sliderBody); meshes.push(sliderBody)
    const movingJaw = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.055, 0.38), mat)
    movingJaw.position.set(0, 0, 0.2)
    slider.add(movingJaw); meshes.push(movingJaw)
    group.add(slider)

    // Thumb wheel
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.038, 8), mat)
    wheel.position.set(0.22, 0.055, -0.04)
    wheel.rotation.x = Math.PI / 2
    group.add(wheel); meshes.push(wheel)

    const baseX = 0.22
    this.registerTool(group, data, meshes,
      (ht) => { slider.position.x = baseX + Math.sin(ht * 2.6) * 0.38 },
      () => { slider.position.x = baseX }
    )
  }

  // Sheet Metal Bend — Berkshire Grey
  private buildSheetMetal(data: WorkbenchTool): void {
    const group = new THREE.Group()
    const mat = new THREE.MeshStandardMaterial({ color: 0xc4c4c4, metalness: 0.72, roughness: 0.38 })
    const meshes: THREE.Mesh[] = []

    // Flat base
    const flat = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.04, 0.78), mat)
    group.add(flat); meshes.push(flat)

    // Pivot group: the bent flange rotates around the edge (x=0.625)
    const pivot = new THREE.Group()
    pivot.position.set(0.625, 0.02, 0)
    const bent = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.04, 0.78), mat)
    bent.position.set(0.36, 0.36, 0)
    bent.rotation.z = -Math.PI / 2
    pivot.add(bent); meshes.push(bent)
    group.add(pivot)

    // Second sample piece
    const flat2 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.04, 0.52), mat)
    flat2.position.set(0.2, 0, -0.56)
    flat2.rotation.y = -0.32
    group.add(flat2); meshes.push(flat2)

    const base = -Math.PI / 2
    this.registerTool(group, data, meshes,
      (ht) => { bent.rotation.z = base + Math.sin(ht * 2.0) * (Math.PI / 4) },
      () => { bent.rotation.z = base }
    )
  }

  // Conveyor Roller — Amazon Robotics
  private buildConveyorRoller(data: WorkbenchTool): void {
    const group = new THREE.Group()
    const cradleMat = new THREE.MeshStandardMaterial({ color: 0x7a6a5a, metalness: 0.6, roughness: 0.5 })
    const rollerMat = new THREE.MeshStandardMaterial({ color: 0x504030, metalness: 0.5, roughness: 0.55 })
    const meshes: THREE.Mesh[] = []

    const bottom = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.065, 0.36), cradleMat)
    bottom.position.set(0, -0.17, 0)
    group.add(bottom); meshes.push(bottom)

    for (const lx of [-0.41, 0.41]) {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.32, 0.36), cradleMat)
      wall.position.set(lx, -0.03, 0)
      group.add(wall); meshes.push(wall)
    }

    const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.78, 12), rollerMat)
    roller.rotation.z = Math.PI / 2
    group.add(roller); meshes.push(roller)

    // Roller caps
    for (const rx of [-0.39, 0.39]) {
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 8), cradleMat)
      cap.position.set(rx, 0, 0)
      cap.rotation.z = Math.PI / 2
      group.add(cap)
    }

    this.registerTool(group, data, meshes,
      (_ht, dt) => { roller.rotation.y += dt * 3.8 },
      () => {}
    )
  }

  // Ball Screw — Bourbot
  private buildBallScrew(data: WorkbenchTool): void {
    const group = new THREE.Group()
    const rodMat = new THREE.MeshStandardMaterial({ color: 0xbbbbbb, metalness: 0.88, roughness: 0.22 })
    const nutMat = new THREE.MeshStandardMaterial({ color: 0x7a5820, metalness: 0.72, roughness: 0.35 })
    const meshes: THREE.Mesh[] = []

    // Rod
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.046, 0.046, 2.3, 12), rodMat)
    rod.rotation.z = Math.PI / 2
    group.add(rod); meshes.push(rod)

    // Thread rings
    for (let i = -5; i <= 5; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.009, 4, 10), rodMat)
      ring.position.x = i * 0.19
      ring.rotation.y = Math.PI / 2
      group.add(ring)
    }

    // Nut block
    const nut = new THREE.Group()
    nut.position.set(-0.45, 0, 0)
    const nutBody = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.24, 0.24), nutMat)
    nut.add(nutBody); meshes.push(nutBody)
    const holeCore = new THREE.Mesh(new THREE.CylinderGeometry(0.046, 0.046, 0.3, 10), new THREE.MeshStandardMaterial({ color: 0x3a2808, metalness: 0.5, roughness: 0.6 }))
    holeCore.rotation.z = Math.PI / 2
    nut.add(holeCore)
    group.add(nut)

    // End caps
    for (const ex of [-1.15, 1.15]) {
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.072, 0.045, 8), rodMat)
      cap.position.x = ex
      cap.rotation.z = Math.PI / 2
      group.add(cap)
    }

    const baseX = -0.45
    this.registerTool(group, data, meshes,
      (ht) => { nut.position.x = baseX + Math.sin(ht * 2.3) * 0.68 },
      () => { nut.position.x = baseX }
    )
  }

  // Snake Linkage — COBRA
  private buildSnakeLinkage(data: WorkbenchTool): void {
    const group = new THREE.Group()
    const segMat = new THREE.MeshStandardMaterial({ color: 0x4a3520, metalness: 0.5, roughness: 0.6 })
    const jointMat = new THREE.MeshStandardMaterial({ color: 0xb08020, metalness: 0.82, roughness: 0.3 })
    const meshes: THREE.Mesh[] = []

    const N = 6
    const baseAngles = [0.32, -0.52, 0.42, -0.42, 0.5, -0.32]
    const segGroups: THREE.Group[] = []

    // Compute cumulative positions along the S-curve
    const cx = [0], cz = [0]
    for (let i = 0; i < N - 1; i++) {
      cx.push(cx[i] + Math.cos(baseAngles[i]) * 0.33)
      cz.push(cz[i] + Math.sin(baseAngles[i]) * 0.33)
    }

    for (let i = 0; i < N; i++) {
      const sg = new THREE.Group()
      sg.position.set(cx[i] - 0.82, 0, cz[i])
      sg.rotation.y = baseAngles[i]

      const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.28, 10), segMat)
      seg.rotation.z = Math.PI / 2
      sg.add(seg); meshes.push(seg)

      if (i < N - 1) {
        const jt = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), jointMat)
        jt.position.x = 0.16
        sg.add(jt); meshes.push(jt)
      }

      segGroups.push(sg)
      group.add(sg)
    }

    const snap = [...baseAngles]
    this.registerTool(group, data, meshes,
      (ht) => {
        for (let i = 0; i < N; i++) {
          segGroups[i].rotation.y = snap[i] + Math.sin(ht * 3.5 + i * 1.05) * 0.42
        }
      },
      () => {
        for (let i = 0; i < N; i++) segGroups[i].rotation.y = snap[i]
      }
    )
  }

  // Embossing Punch — BrailleForge
  private buildEmbossingPunch(data: WorkbenchTool): void {
    const group = new THREE.Group()
    const handleMat = this.woodMat.clone()
    const tipMat = this.metalMat.clone()
    const plateMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.6, roughness: 0.4 })
    const dotMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.5 })
    const meshes: THREE.Mesh[] = []

    // Punch assembly (animated up/down)
    const punchGrp = new THREE.Group()
    punchGrp.position.set(-0.42, 0, 0)

    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.075, 0.52, 10), handleMat)
    handle.position.y = 0.37
    punchGrp.add(handle); meshes.push(handle)

    const tipCone = new THREE.Mesh(new THREE.ConeGeometry(0.036, 0.19, 8), tipMat)
    tipCone.position.y = 0.02
    tipCone.rotation.z = Math.PI
    punchGrp.add(tipCone); meshes.push(tipCone)

    group.add(punchGrp)

    // Braille plate
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.03, 0.52), plateMat)
    plate.position.set(0.2, 0, 0)
    group.add(plate); meshes.push(plate)

    // Braille dots (2 cells)
    const dotRow = [[-0.08, 0.08], [0.08, 0.08], [0.16, 0.02], [0.16, -0.1], [-0.08, -0.08], [0.08, -0.08]]
    for (const [dx, dz] of dotRow) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.023, 5, 5), dotMat)
      dot.position.set(0.1 + dx, 0.026, dz)
      group.add(dot); meshes.push(dot)
    }

    this.registerTool(group, data, meshes,
      (ht) => { punchGrp.position.y = -Math.abs(Math.sin(ht * 3.2)) * 0.24 },
      () => { punchGrp.position.y = 0 }
    )
  }

  // Sensor Strap — Fitolux
  private buildSensorStrap(data: WorkbenchTool): void {
    const group = new THREE.Group()
    const strapMat = new THREE.MeshStandardMaterial({ color: 0x1a1830, roughness: 0.9 })
    const sensorMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2a, roughness: 0.6, metalness: 0.4 })
    const ledMat = new THREE.MeshStandardMaterial({ color: 0x00ff44, emissive: new THREE.Color(0x00ff44), emissiveIntensity: 0 })
    const meshes: THREE.Mesh[] = []

    // 4 strap segments in slight arc
    const angles = [-0.3, -0.1, 0.1, 0.3]
    let sx = -0.46
    for (const a of angles) {
      const seg = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.042, 0.11), strapMat)
      seg.position.set(sx, 0, Math.sin(a) * 0.1)
      seg.rotation.y = a
      group.add(seg); meshes.push(seg)
      sx += 0.29
    }

    // Sensor module
    const sensor = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.1, 0.16), sensorMat)
    sensor.position.set(0, 0.07, 0)
    group.add(sensor); meshes.push(sensor)

    // LED
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.019, 5, 5), ledMat)
    led.position.set(-0.07, 0.12, 0.045)
    group.add(led); meshes.push(led)

    this.registerTool(group, data, meshes,
      (ht) => { ledMat.emissiveIntensity = (Math.sin(ht * 6) + 1) * 1.6 },
      () => { ledMat.emissiveIntensity = 0 }
    )
  }

  // Gripper — C-STAR
  private buildGripper(data: WorkbenchTool): void {
    const group = new THREE.Group()
    const grayMat = new THREE.MeshStandardMaterial({ color: 0x5a6858, metalness: 0.52, roughness: 0.6 })
    const meshes: THREE.Mesh[] = []

    const base = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.15, 0.3), grayMat)
    group.add(base); meshes.push(base)

    const lf = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.075, 0.44), grayMat)
    lf.position.set(-0.17, 0, 0.37)
    group.add(lf); meshes.push(lf)

    const rf = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.075, 0.44), grayMat)
    rf.position.set(0.17, 0, 0.37)
    group.add(rf); meshes.push(rf)

    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.3, 8), grayMat)
    rod.position.set(0, 0.085, 0)
    group.add(rod); meshes.push(rod)

    const blx = -0.17, brx = 0.17
    this.registerTool(group, data, meshes,
      (ht) => {
        const close = Math.max(0, Math.sin(ht * 3)) * 0.1
        lf.position.x = blx + close
        rf.position.x = brx - close
      },
      () => { lf.position.x = blx; rf.position.x = brx }
    )
  }

  // Propeller — WaveWise
  private buildPropeller(data: WorkbenchTool): void {
    const group = new THREE.Group()
    const propMat = this.brassMat.clone()
    const meshes: THREE.Mesh[] = []

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.11, 10), propMat)
    group.add(hub); meshes.push(hub)

    // 3 blades at 120° intervals
    for (let i = 0; i < 3; i++) {
      const bladeGrp = new THREE.Group()
      bladeGrp.rotation.y = (i / 3) * Math.PI * 2
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.042, 0.12), propMat)
      blade.position.set(0, 0.022, 0.3)
      bladeGrp.add(blade)
      group.add(bladeGrp); meshes.push(blade)
    }

    this.registerTool(group, data, meshes,
      (_ht, dt) => { group.rotation.y += dt * 5.2 },
      () => {}
    )
  }

  // Work Glove — Robotic Hand
  private buildWorkGlove(data: WorkbenchTool): void {
    const group = new THREE.Group()
    const gloveMat = new THREE.MeshStandardMaterial({ color: 0xc8a47a, roughness: 0.85 })
    const meshes: THREE.Mesh[] = []

    const palm = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.052, 0.44), gloveMat)
    group.add(palm); meshes.push(palm)

    // 4 fingers
    const fingerDefs: [number, number, number, number][] = [
      [-0.19, 0.22, 0.24, -0.08],
      [-0.065, 0.22, 0.26, -0.02],
      [0.065, 0.22, 0.25, 0.02],
      [0.19, 0.22, 0.22, 0.08],
    ]
    const fingerGroups: THREE.Group[] = []
    for (const [fx, fz, fl, ry] of fingerDefs) {
      const fg = new THREE.Group()
      fg.position.set(fx, 0, fz)
      fg.rotation.y = ry
      const f = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.052, fl), gloveMat)
      f.position.z = fl / 2
      fg.add(f); meshes.push(f)
      group.add(fg)
      fingerGroups.push(fg)
    }

    // Thumb
    const tg = new THREE.Group()
    tg.position.set(-0.29, 0, 0.06)
    tg.rotation.y = -0.52
    const tf = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.052, 0.19), gloveMat)
    tf.position.z = 0.095
    tg.add(tf); meshes.push(tf)
    group.add(tg)
    fingerGroups.push(tg)

    this.registerTool(group, data, meshes,
      (ht) => {
        const curl = Math.max(0, Math.sin(ht * 2.6)) * 0.62
        for (const fg of fingerGroups) fg.rotation.x = curl
      },
      () => { for (const fg of fingerGroups) fg.rotation.x = 0 }
    )
  }

  // Hammer
  private buildHammer(data: WorkbenchTool): void {
    const group = new THREE.Group()
    const handleMat = this.woodMat.clone()
    const headMat = this.metalMat.clone()
    const meshes: THREE.Mesh[] = []

    // Handle along Z axis
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.056, 1.15, 10), handleMat)
    handle.rotation.x = Math.PI / 2
    handle.position.z = -0.28
    group.add(handle); meshes.push(handle)

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.17, 0.42), headMat)
    head.position.z = 0.38
    group.add(head); meshes.push(head)

    // Claws
    for (const cx of [-0.055, 0.055]) {
      const claw = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.052, 0.18), headMat)
      claw.position.set(cx, 0.065, 0.56)
      claw.rotation.x = -0.3
      group.add(claw); meshes.push(claw)
    }

    this.registerTool(group, data, meshes,
      (ht) => { group.rotation.z = Math.sin(ht * 2.6) * 0.19 },
      () => { group.rotation.z = 0 }
    )
  }

  // Golf Tee — Automatic Golf Tee
  private buildGolfTee(data: WorkbenchTool): void {
    const group = new THREE.Group()
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x3a2814, roughness: 0.8 })
    const teeMat = new THREE.MeshStandardMaterial({ color: 0xee2222, roughness: 0.7 })
    const ballMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.5 })
    const meshes: THREE.Mesh[] = []

    const base = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.042, 0.38), baseMat)
    base.position.y = 0.021
    group.add(base); meshes.push(base)

    // Tee + ball group (animated)
    const teeGrp = new THREE.Group()
    const tee = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.046, 0.29, 10), teeMat)
    tee.position.y = 0.19
    teeGrp.add(tee); meshes.push(tee)
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.088, 10, 10), ballMat)
    ball.position.y = 0.39
    teeGrp.add(ball); meshes.push(ball)
    group.add(teeGrp)

    this.registerTool(group, data, meshes,
      (ht) => { teeGrp.position.y = Math.abs(Math.sin(ht * 2.3)) * 0.24 },
      () => { teeGrp.position.y = 0 }
    )
  }

  // Roll Bar — NE Electric Racing
  private buildRollBar(data: WorkbenchTool): void {
    const group = new THREE.Group()
    const tubeMat = new THREE.MeshStandardMaterial({ color: 0x2a3848, roughness: 0.68, metalness: 0.52 })
    const bracketMat = this.metalMat.clone()
    const meshes: THREE.Mesh[] = []

    // Quarter-arc tube
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.55, 0.55, 0),
      new THREE.Vector3(0.72, 1.05, 0)
    )
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 18, 0.055, 8, false), tubeMat)
    group.add(tube); meshes.push(tube)

    // Mounting bracket
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.042, 0.13), bracketMat)
    bracket.position.set(0.14, -0.022, 0)
    group.add(bracket); meshes.push(bracket)

    const boltMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8 })
    for (const bx of [-0.07, 0.07]) {
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.065, 6), boltMat)
      bolt.position.set(bx, 0.02, 0)
      group.add(bolt)
    }

    let vph = 0
    const baseGroupX = data.benchPosition.x
    this.registerTool(group, data, meshes,
      (_ht, dt) => { vph += dt * 26; group.position.x = baseGroupX + Math.sin(vph) * 0.016 },
      () => { vph = 0; group.position.x = baseGroupX }
    )
  }

  // ─── Callout annotations ─────────────────────────────────────────────

  private makeCalloutTexture(line1: string, line2: string, accent: string, featured: boolean): THREE.CanvasTexture {
    const S = 3
    const LW = featured ? 320 : 260
    const LH = featured ? 68 : 60
    const c = document.createElement('canvas')
    c.width = LW * S; c.height = LH * S
    const ctx = c.getContext('2d')!
    ctx.scale(S, S)

    ctx.clearRect(0, 0, LW, LH)
    ctx.fillStyle = 'rgba(13,10,7,0.92)'
    ctx.beginPath()
    ctx.roundRect(0, 0, LW, LH, 6)
    ctx.fill()

    ctx.strokeStyle = accent
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.roundRect(0.75, 0.75, LW - 1.5, LH - 1.5, 6)
    ctx.stroke()

    ctx.fillStyle = accent
    ctx.font = `bold ${featured ? 15 : 13}px "Courier New", monospace`
    ctx.fillText(line1, 13, featured ? 26 : 23)

    ctx.fillStyle = 'rgba(255,255,255,0.72)'
    ctx.font = `${featured ? 12 : 11}px system-ui, sans-serif`
    ctx.fillText(line2, 13, featured ? 48 : 44)

    const tex = new THREE.CanvasTexture(c)
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.generateMipmaps = false
    tex.anisotropy = this.maxAnisotropy
    return tex
  }

  private buildCallout(toolEntry: ToolEntry): void {
    const data = toolEntry.data
    const accent = new THREE.Color(data.accentColor)
    const bx = data.benchPosition.x
    const bz = data.benchPosition.z
    const dotY = 0.28
    const tipY = dotY + data.labelHeight
    const labelH = data.featured ? 0.26 : 0.22
    const labelW = data.featured ? 1.6 : 1.3
    const labelY = tipY + labelH / 2 + 0.05

    // Anchor dot
    const dotMat = new THREE.MeshStandardMaterial({
      color: accent,
      emissive: accent,
      emissiveIntensity: 0.6,
      roughness: 0.4,
    })
    const dotMesh = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), dotMat)
    dotMesh.position.set(bx, dotY, bz)
    this.scene.add(dotMesh)

    // Leader line
    const lineMat = new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.4 })
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(bx, dotY, bz),
      new THREE.Vector3(bx, tipY, bz),
    ])
    const lineMesh = new THREE.Line(lineGeo, lineMat)
    this.scene.add(lineMesh)

    // Horizontal tick
    const tickMat = new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.4 })
    const tickGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(bx - 0.12, tipY, bz),
      new THREE.Vector3(bx + 0.12, tipY, bz),
    ])
    const tickMesh = new THREE.Line(tickGeo, tickMat)
    this.scene.add(tickMesh)

    // Label plane
    const tex = this.makeCalloutTexture(data.callout.line1, data.callout.line2, data.accentColor, data.featured)
    const labelMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.7, depthWrite: false })
    const labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(labelW, labelH), labelMat)
    labelMesh.position.set(bx, labelY, bz)
    this.scene.add(labelMesh)

    const entry: CalloutEntry = { dotMesh, dotMat, lineMesh, lineMat, tickMesh, tickMat, labelMesh, labelMat, toolEntry }
    this.callouts.push(entry)
    this.labelMeshToCallout.set(labelMesh, entry)
  }

  private buildAllCallouts(): void {
    for (const toolEntry of this.tools) {
      this.buildCallout(toolEntry)
    }
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
      maxWidth: '210px',
      boxShadow: '0 6px 28px rgba(0,0,0,0.6)',
      backdropFilter: 'blur(10px)',
      fontFamily: 'system-ui, sans-serif',
    })
    document.body.appendChild(this.tooltip)
  }

  private showTooltip(tool: WorkbenchTool): void {
    const dot = tool.category === 'experience' ? '#3b82f6' : '#22c55e'
    this.tooltip.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px">
        <span style="width:7px;height:7px;border-radius:50%;background:${dot};flex-shrink:0;display:block"></span>
        <strong style="color:#fff;font-size:13px;line-height:1.3">${tool.projectName}</strong>
      </div>
      <p style="color:rgba(255,255,255,0.62);font-size:11px;line-height:1.5;margin:0 0 6px 0">${tool.shortDescription}</p>
      <span style="color:rgba(245,158,11,0.75);font-size:10px;font-family:monospace;letter-spacing:0.04em">Click to learn more →</span>
    `
    this.tooltip.style.display = 'block'
    this.positionTooltip()
  }

  private positionTooltip(): void {
    const W = this.tooltip.offsetWidth || 210
    const H = this.tooltip.offsetHeight || 80
    let x = this.mouseX + 18
    let y = this.mouseY - H / 2
    if (x + W > window.innerWidth - 8) x = this.mouseX - W - 18
    if (y < 8) y = 8
    if (y + H > window.innerHeight - 8) y = window.innerHeight - H - 8
    this.tooltip.style.left = x + 'px'
    this.tooltip.style.top = y + 'px'
  }

  private hideTooltip(): void {
    this.tooltip.style.display = 'none'
  }

  // ─── Animation loop ───────────────────────────────────────────────────

  private animate(): void {
    this.animId = requestAnimationFrame(() => this.animate())
    const dt = Math.min(this.clock.getDelta(), 0.05)
    const elapsed = this.clock.getElapsedTime()

    // Raycasting — tool meshes + label planes
    this.raycaster.setFromCamera(this.mouse, this.camera)
    const allMeshes = this.tools.flatMap(t => t.allMeshes)
    const allLabels = this.callouts.map(c => c.labelMesh)
    const hits = this.raycaster.intersectObjects([...allMeshes, ...allLabels])

    let hitTool: ToolEntry | null = null
    if (hits.length) {
      const obj = hits[0].object as THREE.Mesh
      hitTool = this.meshToTool.get(obj) ?? this.labelMeshToCallout.get(obj)?.toolEntry ?? null
    }

    // Hover state changes
    if (hitTool !== this.hoveredTool) {
      if (this.hoveredTool) {
        this.hoveredTool.hovering = false
        this.hoveredTool.resetFn()
        this.hoveredTool.hoverTime = 0
      }
      this.hoveredTool = hitTool
      if (hitTool) {
        hitTool.hovering = true
        this.showTooltip(hitTool.data)
      } else {
        this.hideTooltip()
      }
    }

    this.canvas.style.cursor = this.isDragging ? 'grabbing' : hitTool ? 'pointer' : 'grab'

    // Lamp light drifts toward hovered tool
    this.lampLightTargetX = hitTool ? hitTool.group.position.x : this.lampLightBaseX
    this.lampLight.position.x += (this.lampLightTargetX - this.lampLight.position.x) * 0.04

    // Animate tools + dimming
    for (const tool of this.tools) {
      if (tool.hovering) {
        tool.hoverTime += dt
        tool.animateFn(tool.hoverTime, dt)
      }

      const targetOpacity = !hitTool || tool === hitTool ? 1.0 : 0.5
      for (const m of tool.allMeshes) {
        const mat = m.material as THREE.MeshStandardMaterial
        if (targetOpacity < 1.0 && !mat.transparent) mat.transparent = true
        mat.opacity += (targetOpacity - mat.opacity) * 0.08
        if (targetOpacity >= 1.0 && Math.abs(mat.opacity - 1.0) < 0.01) {
          mat.opacity = 1.0
          mat.transparent = false
        }
      }
    }

    // Billboard labels + callout opacity
    for (const co of this.callouts) {
      // Billboard
      co.labelMesh.lookAt(this.camera.position)

      const isHovered = hitTool === co.toolEntry
      const anyHovered = hitTool !== null

      const targetLabelOpacity = anyHovered ? (isHovered ? 1.0 : 0.3) : 0.7
      const targetLineOpacity  = anyHovered ? (isHovered ? 1.0 : 0.2) : 0.4

      co.labelMat.opacity += (targetLabelOpacity - co.labelMat.opacity) * 0.1
      co.lineMat.opacity  += (targetLineOpacity  - co.lineMat.opacity)  * 0.1
      co.tickMat.opacity  += (targetLineOpacity  - co.tickMat.opacity)  * 0.1

      // Label scale emphasis on hover
      const targetScale = isHovered ? 1.15 : 1.0
      co.labelMesh.scale.x += (targetScale - co.labelMesh.scale.x) * 0.1
      co.labelMesh.scale.y += (targetScale - co.labelMesh.scale.y) * 0.1

      // Dot pulse on hover
      if (isHovered) {
        const pulse = 1.0 + Math.sin(elapsed * 8) * 0.3
        co.dotMesh.scale.setScalar(pulse)
        co.dotMat.emissiveIntensity = 0.6 + Math.sin(elapsed * 8) * 0.4
      } else {
        co.dotMesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
        co.dotMat.emissiveIntensity = 0.6
      }
    }

    if (hitTool) this.positionTooltip()

    // Steam
    for (const sp of this.steam) {
      const t = elapsed * sp.speed + sp.phase
      sp.mesh.position.y = sp.baseY + ((Math.sin(t) + 1) / 2) * 0.42
      sp.mesh.position.x = 5.5 + Math.sin(t * 1.4) * 0.035
      const normY = (sp.mesh.position.y - sp.baseY) / 0.42
      ;(sp.mesh.material as THREE.MeshStandardMaterial).opacity = 0.11 * (1 - normY)
    }

    // Smooth camera X (scroll-driven)
    this.camCurrentX += (this.camTargetX - this.camCurrentX) * 0.04
    this.camera.position.x = this.camCurrentX
    this.camera.lookAt(this.camCurrentX, 0.5, 0)

    this.renderer.render(this.scene, this.camera)
  }

  // ─── PortfolioScene interface ─────────────────────────────────────────

  onScroll(scrollProgress: number): void {
    // Camera trucks from -5 (left/experience side) to +6.5 (right)
    this.camTargetX = -5 + scrollProgress * 11.5
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
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose()
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        for (const m of mats) {
          const ms = m as THREE.MeshStandardMaterial
          if (ms.map) ms.map.dispose()
          ms.dispose()
        }
      }
    })
    this.renderer.dispose()
  }
}
