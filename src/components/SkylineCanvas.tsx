import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import type { SkylineCard } from '../data/content'

interface Props {
  cards: SkylineCard[]
  scrollProgress: number
  onCardClick: (card: SkylineCard) => void
  reducedMotion: boolean
}

// ── Text rendering ─────────────────────────────────────────────────────────────
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lineH: number,
  maxLines = 3,
) {
  const words = text.split(' ')
  let line = ''
  let linesDrawn = 0
  for (const word of words) {
    const test = line ? line + ' ' + word : word
    if (ctx.measureText(test).width > maxW && line) {
      if (linesDrawn >= maxLines - 1) { ctx.fillText(line + '…', x, y); return }
      ctx.fillText(line, x, y)
      y += lineH; linesDrawn++; line = word
    } else { line = test }
  }
  if (line) ctx.fillText(line, x, y)
}

function drawCardText(ctx: CanvasRenderingContext2D, card: SkylineCard, CW: number, CH: number, textMaxW: number) {
  const accent = card.accent === 'blue' ? '#60a5fa' : '#4ade80'
  ctx.fillStyle = accent
  ctx.fillRect(0, 0, CW, 8)
  ctx.globalAlpha = 0.35; ctx.fillRect(0, 8, 4, CH - 8); ctx.globalAlpha = 1
  ctx.fillStyle = accent
  ctx.font = '800 20px sans-serif'
  ctx.fillText(card.category.toUpperCase(), 24, 50)
  ctx.fillStyle = '#ffffff'
  ctx.font = '900 42px sans-serif'
  wrapText(ctx, card.name, 24, 106, textMaxW, 48, 2)
  ctx.fillStyle = 'rgba(255,255,255,0.4)'
  ctx.fillRect(24, 168, textMaxW, 1)
  ctx.fillStyle = '#ffffff'
  ctx.font = '600 21px sans-serif'
  wrapText(ctx, card.cardDescription, 24, 200, textMaxW, 28, 3)
  let tx = 24
  const ty = CH - 24
  ctx.font = '700 15px sans-serif'
  for (const tag of card.tags.slice(0, 4)) {
    const tw = ctx.measureText(tag).width + 16
    ctx.fillStyle = 'rgba(255,255,255,0.22)'
    ctx.beginPath()
    ctx.roundRect(tx, ty - 13, tw, 22, 4)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.fillText(tag, tx + 8, ty + 3)
    tx += tw + 8
    if (tx > textMaxW - 10) break
  }
}

function createCardTexture(card: SkylineCard, img?: HTMLImageElement): THREE.CanvasTexture {
  const CW = 512, CH = 320
  const canvas = document.createElement('canvas')
  canvas.width = CW; canvas.height = CH
  const ctx = canvas.getContext('2d')!
  if (img) {
    ctx.save(); ctx.rect(0, 0, CW, CH); ctx.clip()
    const scale = Math.max(CW / img.width, CH / img.height)
    const sw = img.width * scale, sh = img.height * scale
    ctx.drawImage(img, (CW - sw) / 2, (CH - sh) / 2, sw, sh)
    ctx.restore()
    const grad = ctx.createLinearGradient(0, 0, CW, 0)
    grad.addColorStop(0,    'rgba(10,14,20,0.88)')
    grad.addColorStop(0.44, 'rgba(10,14,20,0.75)')
    grad.addColorStop(0.62, 'rgba(10,14,20,0.38)')
    grad.addColorStop(0.78, 'rgba(10,14,20,0.10)')
    grad.addColorStop(1,    'rgba(10,14,20,0.00)')
    ctx.fillStyle = grad; ctx.fillRect(0, 0, CW, CH)
    drawCardText(ctx, card, CW, CH, CW * 0.56)
  } else {
    const topColor = card.accent === 'blue' ? '#0a1828' : '#0a1a10'
    const bgGrad = ctx.createLinearGradient(0, 0, 0, CH)
    bgGrad.addColorStop(0, topColor); bgGrad.addColorStop(1, '#0c1117')
    ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, CW, CH)
    ctx.strokeStyle = card.accent === 'blue' ? 'rgba(59,130,246,0.55)' : 'rgba(34,197,94,0.55)'
    ctx.lineWidth = 2; ctx.strokeRect(1, 1, CW - 2, CH - 2)
    drawCardText(ctx, card, CW, CH, CW - 40)
  }
  return new THREE.CanvasTexture(canvas)
}

// ── Shared materials (reused across buildings) ─────────────────────────────────
function makeMats() {
  const bldg  = new THREE.MeshStandardMaterial({ color: 0x0c0f14, roughness: 0.88, metalness: 0.18 })
  const steel = new THREE.MeshStandardMaterial({ color: 0x4e6a7a, roughness: 0.68, metalness: 0.60 })
  const dark  = new THREE.MeshStandardMaterial({ color: 0x2c3d48, roughness: 0.82, metalness: 0.52 })
  const wood  = new THREE.MeshStandardMaterial({ color: 0x3a1e0c, roughness: 0.95, metalness: 0.00 })
  const galv  = new THREE.MeshStandardMaterial({ color: 0x586a72, roughness: 0.62, metalness: 0.42 })
  const lampE = new THREE.MeshBasicMaterial({ color: 0xffc855, transparent: true, opacity: 0.92 })
  const blueW = new THREE.MeshBasicMaterial({ color: 0x4488cc, transparent: true, opacity: 0.72 })
  const warmW = new THREE.MeshBasicMaterial({ color: 0xffcc66, transparent: true, opacity: 0.66 })
  return { bldg, steel, dark, wood, galv, lampE, blueW, warmW }
}

type Mats = ReturnType<typeof makeMats>

// ── Window lighting grid on south face ─────────────────────────────────────────
function addWindowGrid(
  scene: THREE.Scene, mats: Mats,
  bx: number, bz: number, bw: number, bd: number,
  yBase: number, yTop: number,
) {
  const h = yTop - yBase
  const rows = Math.max(1, Math.floor(h / 1.6))
  const cols = Math.max(1, Math.floor(bw / 0.85))
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() < 0.28) continue
      const win = new THREE.Mesh(
        new THREE.PlaneGeometry(0.18, 0.1),
        Math.random() > 0.42 ? mats.warmW : mats.blueW,
      )
      win.position.set(
        bx - bw / 2 + (c + 0.5) * bw / cols,
        yBase + (r + 0.5) * h / rows,
        bz + bd / 2 + 0.01,
      )
      scene.add(win)
    }
  }
}

// ── Simple box building ────────────────────────────────────────────────────────
interface BldgDef { x: number; z: number; w: number; d: number; h: number; waterTower?: boolean }

function addBuilding(scene: THREE.Scene, mats: Mats, def: BldgDef) {
  const geo = new THREE.BoxGeometry(def.w, def.h, def.d)
  const mesh = new THREE.Mesh(geo, mats.bldg)
  const baseY = -1
  mesh.position.set(def.x, baseY + def.h / 2, def.z)
  scene.add(mesh)
  addWindowGrid(scene, mats, def.x, def.z, def.w, def.d, baseY, baseY + def.h)
  if (def.waterTower) addWaterTower(scene, mats, def.x + def.w * 0.25, baseY + def.h, def.z - def.d * 0.2)
}

// ── Art-Deco setback building ─────────────────────────────────────────────────
interface Level { w: number; d: number; h: number }

function addSetbackBuilding(
  scene: THREE.Scene, mats: Mats,
  x: number, z: number,
  levels: Level[],
  spireH = 0,
  waterTower = false,
) {
  let y = -1
  for (const lv of levels) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(lv.w, lv.h, lv.d), mats.bldg)
    mesh.position.set(x, y + lv.h / 2, z)
    scene.add(mesh)
    addWindowGrid(scene, mats, x, z, lv.w, lv.d, y, y + lv.h)
    y += lv.h
  }
  if (spireH > 0) {
    const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.12, spireH, 8), mats.galv)
    spire.position.set(x, y + spireH / 2, z)
    scene.add(spire)
  }
  if (waterTower) addWaterTower(scene, mats, x + 0.3, y, z + 0.2)
  return y
}

// ── Chrysler-style crown ───────────────────────────────────────────────────────
function addChryslerCrown(scene: THREE.Scene, mats: Mats, x: number, baseY: number, z: number) {
  // Stainless Art Deco sunburst tiers
  const tiers = [
    { w: 1.1, h: 1.8 }, { w: 0.85, h: 1.6 }, { w: 0.64, h: 1.4 },
    { w: 0.46, h: 1.2 }, { w: 0.3,  h: 1.0 },
  ]
  let y = baseY
  for (const t of tiers) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(t.w * 0.5, t.w * 0.52, t.h, 16), mats.galv)
    mesh.position.set(x, y + t.h / 2, z)
    scene.add(mesh)
    // Triangular window cutout effect (small emissive plane)
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const win = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.22), mats.blueW)
      win.position.set(
        x + Math.cos(angle) * t.w * 0.52,
        y + t.h * 0.4,
        z + Math.sin(angle) * t.w * 0.52,
      )
      win.rotation.y = angle + Math.PI / 2
      scene.add(win)
    }
    y += t.h
  }
  // Needle
  const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.08, 8, 8), mats.galv)
  needle.position.set(x, y + 4, z)
  scene.add(needle)
}

// ── Rooftop water tower ────────────────────────────────────────────────────────
function addWaterTower(scene: THREE.Scene, mats: Mats, x: number, y: number, z: number) {
  const legH = 0.55
  // Three support legs
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, legH, 6), mats.galv)
    leg.position.set(x + Math.cos(angle) * 0.28, y + legH / 2, z + Math.sin(angle) * 0.28)
    scene.add(leg)
  }
  // Tank
  const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 0.65, 10), mats.wood)
  tank.position.set(x, y + legH + 0.33, z)
  scene.add(tank)
  // Cone roof
  const roof = new THREE.Mesh(new THREE.ConeGeometry(0.40, 0.32, 10), mats.galv)
  roof.position.set(x, y + legH + 0.65 + 0.16, z)
  scene.add(roof)
  // Cross brace between legs
  for (let i = 0; i < 3; i++) {
    const a1 = (i / 3) * Math.PI * 2
    const a2 = ((i + 1) / 3) * Math.PI * 2
    const p1 = new THREE.Vector3(x + Math.cos(a1) * 0.28, y + legH * 0.55, z + Math.sin(a1) * 0.28)
    const p2 = new THREE.Vector3(x + Math.cos(a2) * 0.28, y + legH * 0.55, z + Math.sin(a2) * 0.28)
    const geo = new THREE.BufferGeometry().setFromPoints([p1, p2])
    scene.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x445566 })))
  }
}

// ── Queensboro / Ed Koch Bridge (cantilever truss) ─────────────────────────────
function addNYCBridge(scene: THREE.Scene, mats: Mats) {
  const cableMat = new THREE.LineBasicMaterial({ color: 0x6e8491, transparent: true, opacity: 0.65 })
  const BY = 2.8    // deck base Y
  const BZ = -6.0   // bridge Z

  // ── Two-level deck ────────────────────────────────────────────────────────
  const upperDeck = new THREE.Mesh(new THREE.BoxGeometry(40, 0.30, 1.80), mats.steel)
  upperDeck.position.set(0, BY + 1.65, BZ)
  scene.add(upperDeck)

  const lowerDeck = new THREE.Mesh(new THREE.BoxGeometry(40, 0.24, 1.50), mats.steel)
  lowerDeck.position.set(0, BY, BZ)
  scene.add(lowerDeck)

  // Side railings (both decks, both sides)
  for (const dy of [BY, BY + 1.65]) {
    for (const dz of [BZ - 0.92, BZ + 0.92]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(40, 0.22, 0.10), mats.dark)
      rail.position.set(0, dy + 0.22, dz)
      scene.add(rail)
    }
  }

  // ── Top chord (spine connecting tower tops) ────────────────────────────────
  const TRUSS_TOP = BY + 5.8
  for (const dz of [BZ - 0.75, BZ + 0.75]) {
    const chord = new THREE.Mesh(new THREE.BoxGeometry(38, 0.20, 0.20), mats.dark)
    chord.position.set(0, TRUSS_TOP, dz)
    scene.add(chord)
  }

  // ── Truss panels (diagonal Warren-truss pattern) ──────────────────────────
  const PW = 2.2   // panel width
  const TH = TRUSS_TOP - BY  // truss height
  const diagLen = Math.sqrt(PW * PW + TH * TH)

  for (let xi = -18; xi < 18; xi += PW) {
    const pi = Math.round(xi / PW)
    const dir = pi % 2 === 0 ? 1 : -1

    for (const dz of [BZ - 0.75, BZ + 0.75]) {
      // Diagonal
      const diag = new THREE.Mesh(new THREE.BoxGeometry(0.10, diagLen, 0.12), mats.dark)
      diag.position.set(xi + PW / 2, (BY + TRUSS_TOP) / 2, dz)
      diag.rotation.z = Math.atan2(TH, PW) * dir
      scene.add(diag)

      // Vertical post at each panel node
      const vert = new THREE.Mesh(new THREE.BoxGeometry(0.10, TH, 0.12), mats.dark)
      vert.position.set(xi, (BY + TRUSS_TOP) / 2, dz)
      scene.add(vert)
    }

    // Horizontal cross member at top (connecting front/back trusses)
    const crossTop = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 1.52), mats.dark)
    crossTop.position.set(xi, TRUSS_TOP - 0.05, BZ)
    scene.add(crossTop)

    // Cross member at lower deck
    const crossBot = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 1.42), mats.dark)
    crossBot.position.set(xi, BY + 0.04, BZ)
    scene.add(crossBot)
  }

  // ── Four towers (2 main + 2 anchor) ──────────────────────────────────────
  const towers = [
    { x: -9.5, h: 13.0, w: 0.88, anchor: false },
    { x:  9.5, h: 13.0, w: 0.88, anchor: false },
    { x: -16.5, h: 8.5, w: 0.68, anchor: true  },
    { x:  16.5, h: 8.5, w: 0.68, anchor: true  },
  ]

  for (const td of towers) {
    // Twin pillar shafts (front + back of bridge)
    for (const dz of [BZ - 0.68, BZ + 0.68]) {
      const shaft = new THREE.Mesh(new THREE.BoxGeometry(td.w, td.h, td.w * 0.65), mats.steel)
      shaft.position.set(td.x, BY + td.h / 2, dz)
      scene.add(shaft)
    }

    // Arch-bridge connecting beam at top between the two shafts
    const arch = new THREE.Mesh(new THREE.BoxGeometry(td.w * 0.9, td.h * 0.13, td.w * 2.1), mats.steel)
    arch.position.set(td.x, BY + td.h - td.h * 0.055, BZ)
    scene.add(arch)

    // Horizontal tie beams at 1/3, 2/3, and near top
    for (const frac of [0.32, 0.60, 0.84]) {
      const tie = new THREE.Mesh(new THREE.BoxGeometry(td.w + 0.2, 0.25, td.w * 2.3), mats.steel)
      tie.position.set(td.x, BY + td.h * frac, BZ)
      scene.add(tie)
    }

    // Pointed Queensboro-style tower caps (two per tower)
    for (const dz of [BZ - 0.68, BZ + 0.68]) {
      const capA = new THREE.Mesh(new THREE.BoxGeometry(td.w * 0.70, td.h * 0.13, td.w * 0.48), mats.steel)
      capA.position.set(td.x, BY + td.h + td.h * 0.065, dz)
      scene.add(capA)

      const capB = new THREE.Mesh(new THREE.BoxGeometry(td.w * 0.40, td.h * 0.08, td.w * 0.28), mats.steel)
      capB.position.set(td.x, BY + td.h + td.h * 0.13 + td.h * 0.04, dz)
      scene.add(capB)
    }
  }

  // ── Suspension cables (fan pattern from main towers) ──────────────────────
  for (const towerX of [-9.5, 9.5]) {
    const top = new THREE.Vector3(towerX, BY + 13, BZ)
    for (let dx = -20; dx <= 20; dx += 2.2) {
      const deckX = towerX + dx
      if (Math.abs(deckX) > 21) continue
      const bot = new THREE.Vector3(deckX, BY + 1.67, BZ)
      const geo = new THREE.BufferGeometry().setFromPoints([top, bot])
      scene.add(new THREE.Line(geo, cableMat))
    }
  }

  // Anchor cables from anchor towers
  for (const { x: ax } of [{ x: -16.5 }, { x: 16.5 }]) {
    const top = new THREE.Vector3(ax, BY + 8.5, BZ)
    for (let dx = -8; dx <= 8; dx += 2) {
      const deckX = ax + dx
      if (Math.abs(deckX) > 21) continue
      const bot = new THREE.Vector3(deckX, BY + 1.67, BZ)
      const geo = new THREE.BufferGeometry().setFromPoints([top, bot])
      scene.add(new THREE.Line(geo, cableMat))
    }
  }

  // ── Approach ramps ────────────────────────────────────────────────────────
  for (const side of [-1, 1] as const) {
    const ramp = new THREE.Mesh(new THREE.BoxGeometry(8, 0.24, 1.6), mats.steel)
    ramp.position.set(side * 24, BY + 1.65, BZ)
    scene.add(ramp)
    // Ramp support column
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.45, BY + 1.3, 0.45), mats.steel)
    col.position.set(side * 22.5, (BY + 1.3) / 2, BZ)
    scene.add(col)
  }

  // ── Bridge lamp posts (upper deck) ────────────────────────────────────────
  for (let bx = -18; bx <= 18; bx += 3.2) {
    for (const dz of [BZ - 0.94, BZ + 0.94]) {
      // Post
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.60, 5), mats.dark)
      post.position.set(bx, BY + 1.90, dz)
      scene.add(post)
      // Globe
      const globe = new THREE.Mesh(new THREE.SphereGeometry(0.07, 7, 7), mats.lampE)
      globe.position.set(bx, BY + 2.25, dz)
      scene.add(globe)
    }
  }

  // ── Red warning lights at tower tops ─────────────────────────────────────
  const redLight = new THREE.MeshBasicMaterial({ color: 0xff2200, transparent: true, opacity: 0.85 })
  for (const { x: tx, h: th } of towers) {
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 6), redLight)
    beacon.position.set(tx, BY + th + th * 0.20, BZ)
    scene.add(beacon)
  }
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function SkylineCanvas({ cards, scrollProgress, onCardClick, reducedMotion }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<{
    rafId: number
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    cardMeshes: THREE.Mesh[]
    cardData: SkylineCard[]
    hoveredIdx: number
    pointer: THREE.Vector2
    raycaster: THREE.Raycaster
    waterGeo: THREE.PlaneGeometry
    starField: THREE.Points
    beacons: THREE.Mesh[]
  } | null>(null)

  const progressRef = useRef(scrollProgress)
  progressRef.current = scrollProgress

  const onCardClickRef = useRef(onCardClick)
  onCardClickRef.current = onCardClick

  const handleClick = useCallback(() => {
    const s = stateRef.current
    if (!s || s.hoveredIdx < 0) return
    onCardClickRef.current(s.cardData[s.hoveredIdx])
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') handleClick()
  }, [handleClick])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const s = stateRef.current
    if (!s || !mountRef.current) return
    const rect = mountRef.current.getBoundingClientRect()
    s.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    s.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
  }, [])

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const mats = makeMats()

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setClearColor(0x08060c)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)

    // ── Scene ──────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0c0a10, 0.013)
    scene.background = new THREE.Color(0x08060c)

    // ── Camera ─────────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(58, el.clientWidth / el.clientHeight, 0.1, 220)
    camera.position.set(0, 8, 28)
    camera.lookAt(0, 4, 0)

    // ── Lighting ──────────────────────────────────────────────────────────────
    // NYC sky: slightly blue-purple overhead, warm amber from streets below
    const hemi = new THREE.HemisphereLight(0x0a0814, 0x3a1a04, 0.9)
    scene.add(hemi)

    // Blue-purple moonlight from upper right
    const moonLight = new THREE.DirectionalLight(0x8899cc, 0.35)
    moonLight.position.set(18, 50, 20)
    scene.add(moonLight)

    // Warm amber city glow on the buildings (from street level)
    const cityAmber = new THREE.PointLight(0xff8c00, 1.8, 80)
    cityAmber.position.set(0, -2, -15)
    scene.add(cityAmber)

    // Cool blue key light (from East River / sky)
    const riverBlue = new THREE.PointLight(0x3b82f6, 0.7, 60)
    riverBlue.position.set(-5, 18, -12)
    scene.add(riverBlue)

    // Warm fill from right (streetlights on Queens side)
    const queensWarm = new THREE.PointLight(0xf59e0b, 0.4, 50)
    queensWarm.position.set(14, 4, 10)
    scene.add(queensWarm)

    // ── Moon ──────────────────────────────────────────────────────────────────
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0xddd8c8 }),
    )
    moon.position.set(-38, 55, -70)
    scene.add(moon)

    // Subtle moon halo (slightly larger, very transparent)
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(3.2, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x8899aa, transparent: true, opacity: 0.06, side: THREE.BackSide }),
    )
    halo.position.copy(moon.position)
    scene.add(halo)

    // ── Stars ──────────────────────────────────────────────────────────────────
    const starCount = 1100
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 0.5
      const r = 90 + Math.random() * 30
      starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      starPos[i * 3 + 1] = Math.abs(r * Math.cos(phi)) + 8
      starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 20
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const starField = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xddeeff, size: 0.14, sizeAttenuation: true, transparent: true, opacity: 0.65 }),
    )
    scene.add(starField)

    // ── MANHATTAN SKYLINE ──────────────────────────────────────────────────────
    //
    // Empire State Building  (x≈-1, z≈-34): iconic stepped pyramid, tall antenna
    addSetbackBuilding(scene, mats, -1, -34, [
      { w: 3.4, d: 2.8, h: 8  },
      { w: 2.8, d: 2.3, h: 8  },
      { w: 2.2, d: 1.8, h: 8  },
      { w: 1.6, d: 1.4, h: 12 },
      { w: 1.0, d: 0.9, h: 10 },
    ], 14, false)  // 14-unit antenna spire

    // Chrysler Building (x≈5, z≈-29): Art Deco sunburst crown
    {
      const cTop = addSetbackBuilding(scene, mats, 5, -29, [
        { w: 2.2, d: 1.9, h: 7  },
        { w: 1.8, d: 1.6, h: 7  },
        { w: 1.4, d: 1.2, h: 7  },
        { w: 1.1, d: 1.0, h: 10 },
        { w: 0.9, d: 0.8, h: 8  },
      ], 0, false)
      addChryslerCrown(scene, mats, 5, cTop, -29)
    }

    // One WTC / Freedom Tower (tallest, slight taper, x≈-6, z≈-42)
    addSetbackBuilding(scene, mats, -6, -42, [
      { w: 3.0, d: 2.6, h: 10 },
      { w: 2.6, d: 2.2, h: 12 },
      { w: 2.2, d: 1.9, h: 12 },
      { w: 1.8, d: 1.6, h: 14 },
    ], 18, false)

    // 432 Park Ave-style (supertall slender tower, x≈3, z≈-38)
    addSetbackBuilding(scene, mats, 3, -38, [
      { w: 1.0, d: 0.9, h: 45 },
    ], 8, false)

    // 30 Rock / Rockefeller (stepped, warm windows, x≈-7, z≈-27)
    addSetbackBuilding(scene, mats, -7, -27, [
      { w: 3.0, d: 2.4, h: 7  },
      { w: 2.4, d: 2.0, h: 8  },
      { w: 1.8, d: 1.5, h: 10 },
      { w: 1.2, d: 1.0, h: 8  },
    ], 4, true)

    // Midtown cluster (left side)
    addBuilding(scene, mats, { x: -11, z: -24, w: 2.8, d: 2.5, h: 22, waterTower: true })
    addBuilding(scene, mats, { x: -13, z: -29, w: 2.0, d: 2.0, h: 30 })
    addBuilding(scene, mats, { x: -9,  z: -20, w: 2.4, d: 2.0, h: 16, waterTower: true })
    addBuilding(scene, mats, { x: -15, z: -22, w: 2.6, d: 2.8, h: 14 })
    addBuilding(scene, mats, { x: -17, z: -27, w: 3.2, d: 3.2, h: 10 })
    addBuilding(scene, mats, { x: -4,  z: -25, w: 1.8, d: 1.6, h: 26 })

    // Midtown cluster (right side)
    addBuilding(scene, mats, { x: 10,  z: -26, w: 2.2, d: 2.0, h: 24, waterTower: true })
    addBuilding(scene, mats, { x: 13,  z: -23, w: 2.6, d: 2.4, h: 18 })
    addBuilding(scene, mats, { x: 15,  z: -28, w: 2.0, d: 2.0, h: 22 })
    addBuilding(scene, mats, { x: 17,  z: -24, w: 2.4, d: 2.6, h: 14 })
    addBuilding(scene, mats, { x: 19,  z: -20, w: 3.0, d: 3.2, h: 10 })
    addBuilding(scene, mats, { x: 8,   z: -23, w: 1.6, d: 1.5, h: 20 })

    // Background deep fill
    addBuilding(scene, mats, { x: -5,  z: -46, w: 3.5, d: 4.0, h: 18 })
    addBuilding(scene, mats, { x: 4,   z: -48, w: 3.0, d: 3.5, h: 16 })
    addBuilding(scene, mats, { x: -14, z: -38, w: 3.5, d: 4.0, h: 12 })
    addBuilding(scene, mats, { x: 11,  z: -40, w: 3.2, d: 3.5, h: 14 })
    addBuilding(scene, mats, { x: 0,   z: -52, w: 4.5, d: 5.0, h: 9  })
    addBuilding(scene, mats, { x: -20, z: -34, w: 2.8, d: 3.0, h: 8  })
    addBuilding(scene, mats, { x: 20,  z: -33, w: 2.8, d: 3.0, h: 8  })

    // Short foreground Manhattan (waterfront, facing river)
    addBuilding(scene, mats, { x: -3,  z: -18, w: 3.2, d: 2.8, h: 8, waterTower: true })
    addBuilding(scene, mats, { x: 4,   z: -18, w: 2.6, d: 2.4, h: 10 })
    addBuilding(scene, mats, { x: -9,  z: -16, w: 2.2, d: 2.0, h: 6  })
    addBuilding(scene, mats, { x: 8,   z: -16, w: 2.4, d: 2.2, h: 7  })

    // Queens side (our side — lower skyline)
    addBuilding(scene, mats, { x: -14, z: 8,  w: 3.0, d: 3.0, h: 8, waterTower: true })
    addBuilding(scene, mats, { x: -18, z: 6,  w: 4.0, d: 4.0, h: 6  })
    addBuilding(scene, mats, { x: -22, z: 4,  w: 4.0, d: 4.0, h: 5  })
    addBuilding(scene, mats, { x: -25, z: 2,  w: 5.0, d: 4.5, h: 4  })
    addBuilding(scene, mats, { x: 14,  z: 8,  w: 3.0, d: 3.0, h: 9, waterTower: true })
    addBuilding(scene, mats, { x: 18,  z: 6,  w: 4.0, d: 4.0, h: 6  })
    addBuilding(scene, mats, { x: 22,  z: 4,  w: 4.0, d: 4.0, h: 5  })
    addBuilding(scene, mats, { x: 25,  z: 2,  w: 5.0, d: 4.5, h: 4  })

    // ── NYC Bridge ─────────────────────────────────────────────────────────────
    addNYCBridge(scene, mats)

    // ── East River water ───────────────────────────────────────────────────────
    const waterGeo = new THREE.PlaneGeometry(90, 30, 56, 32)
    waterGeo.rotateX(-Math.PI / 2)
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x040c12,
      roughness: 0.12,
      metalness: 0.72,
      transparent: true,
      opacity: 0.94,
    })
    const water = new THREE.Mesh(waterGeo, waterMat)
    water.position.set(0, -1, -2)
    scene.add(water)

    // Warm city-glow reflection strip on water surface
    const reflStrip = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 6),
      new THREE.MeshBasicMaterial({ color: 0x2a1205, transparent: true, opacity: 0.35, side: THREE.DoubleSide }),
    )
    reflStrip.rotation.x = -Math.PI / 2
    reflStrip.position.set(0, -0.95, -8)
    scene.add(reflStrip)

    // ── Horizon amber glow band ────────────────────────────────────────────────
    // A large faint plane behind the buildings to simulate light pollution glow
    const glowGeo = new THREE.PlaneGeometry(120, 25)
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x1a0900,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
    })
    const glowPlane = new THREE.Mesh(glowGeo, glowMat)
    glowPlane.position.set(0, 12, -55)
    scene.add(glowPlane)

    // ── Card layout ────────────────────────────────────────────────────────────
    const PROJECT_W = 2.6, PROJECT_H = 1.625
    const EXP_W = 3.2, EXP_H = 2.0

    const projectDefs = [
      { x: -9,    z: 14 }, { x: -4.5, z: 14 }, { x: 0,    z: 14 },
      { x:  4.5,  z: 14 }, { x:  9,   z: 14 },
      { x: -7.5,  z: 10 }, { x: -3,   z: 10 }, { x:  1.5, z: 10 },
      { x:  6,    z: 10 }, { x:  10.5,z: 10 },
    ]
    const expDefs = [{ x: -4, z: 17 }, { x: 0, z: 17 }, { x: 4, z: 17 }]
    const allCardDefs = [...projectDefs, ...expDefs]

    const cardMeshes: THREE.Mesh[] = []
    const cardBaseY: number[] = []

    cards.forEach((card, ci) => {
      if (ci >= allCardDefs.length) return
      const def = allCardDefs[ci]
      const isExp = ci >= 10
      const texture = createCardTexture(card)
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
      const cw = isExp ? EXP_W : PROJECT_W
      const ch = isExp ? EXP_H : PROJECT_H
      const mat = new THREE.MeshBasicMaterial({ map: texture })
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(cw, ch), mat)
      const baseY = isExp ? 7.5 : 4.2
      mesh.position.set(def.x, baseY, def.z)
      mesh.rotation.y = def.x * -0.028
      mesh.userData = { cardIdx: ci }
      scene.add(mesh)
      cardMeshes.push(mesh)
      cardBaseY.push(baseY)
    })

    // Async image loading
    cards.forEach((card, ci) => {
      if (ci >= cardMeshes.length || !card.image) return
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const mesh = cardMeshes[ci]
        if (!mesh) return
        const mat = mesh.material as THREE.MeshBasicMaterial
        const old = mat.map
        const tex = createCardTexture(card, img)
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
        mat.map = tex; mat.needsUpdate = true
        old?.dispose()
      }
      img.onerror = () => {}
      img.src = card.image
    })

    // ── Raycaster + resize ─────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2(9999, 9999)

    const onResize = () => {
      if (!el) return
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // Beacon meshes to animate (red warning lights)
    const beacons: THREE.Mesh[] = []
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.material instanceof THREE.MeshBasicMaterial
          && (obj.material.color as THREE.Color).r > 0.9
          && (obj.material.color as THREE.Color).g < 0.2) {
        beacons.push(obj)
      }
    })

    const camPos  = new THREE.Vector3(0, 8, 28)
    const camLook = new THREE.Vector3(0, 4, 0)
    const targetPos  = new THREE.Vector3()
    const targetLook = new THREE.Vector3()

    stateRef.current = {
      rafId: 0, camera, renderer, scene,
      cardMeshes, cardData: cards,
      hoveredIdx: -1, pointer, raycaster, waterGeo, starField, beacons,
    }

    // ── Animation loop ─────────────────────────────────────────────────────────
    let last = performance.now()
    const animate = () => {
      stateRef.current!.rafId = requestAnimationFrame(animate)
      const now = performance.now()
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const t = now / 1000
      const progress = progressRef.current

      targetPos.set(progress * 1.5, 8 - progress * 1.5, 28 - progress * 16)
      targetLook.set(progress * 0.5, 4 - progress * 1.2, 0 - progress * 8)

      if (!reducedMotion) {
        camPos.lerp(targetPos, dt * 2.5)
        camLook.lerp(targetLook, dt * 2.5)
      } else {
        camPos.copy(targetPos); camLook.copy(targetLook)
      }
      camera.position.copy(camPos)
      camera.lookAt(camLook)

      if (!reducedMotion) {
        // Bob + sway cards
        cardMeshes.forEach((mesh, i) => {
          const phase = i * 1.1
          mesh.position.y = cardBaseY[i] + Math.sin(t * 0.55 + phase) * 0.12
          const def = allCardDefs[i]
          mesh.rotation.y = def.x * -0.035 + Math.sin(t * 0.28 + phase) * 0.045
        })

        // Water ripple
        const pos = waterGeo.attributes.position as THREE.BufferAttribute
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i), z = pos.getZ(i)
          pos.setY(i, Math.sin(x * 0.28 + t * 0.6) * 0.09 + Math.cos(z * 0.22 + t * 0.8) * 0.06)
        }
        pos.needsUpdate = true

        // Slowly drift stars
        starField.rotation.y = t * 0.0015

        // Beacon blink
        beacons.forEach((b) => {
          const mat = b.material as THREE.MeshBasicMaterial
          mat.opacity = 0.5 + 0.5 * Math.abs(Math.sin(t * 1.2))
        })
      }

      // Hover raycasting
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects(cardMeshes)
      const newHovered = hits.length > 0 ? (hits[0].object.userData.cardIdx as number) : -1

      if (newHovered !== stateRef.current!.hoveredIdx) {
        stateRef.current!.hoveredIdx = newHovered
        cardMeshes.forEach((mesh, i) => {
          const mat = mesh.material as THREE.MeshBasicMaterial
          if (i === newHovered) {
            mesh.scale.setScalar(1.1)
            mat.color.setHex(0xffffff)
          } else {
            mesh.scale.setScalar(newHovered >= 0 ? 0.94 : 1)
            mat.color.setHex(newHovered >= 0 ? 0x888888 : 0xffffff)
          }
        })
        el.style.cursor = newHovered >= 0 ? 'pointer' : 'default'
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(stateRef.current?.rafId ?? 0)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
      stateRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      role="region"
      aria-label="Interactive NYC skyline with project cards"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
    />
  )
}
