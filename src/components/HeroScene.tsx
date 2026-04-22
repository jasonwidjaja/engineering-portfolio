// @ts-nocheck
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  // Keep a ref to current theme so setup effect can read initial value without it as dep
  const themeRef = useRef(theme)
  themeRef.current = theme

  // Refs to live Three.js materials/fog for theme updates
  const matRef = useRef<{
    greenWire: THREE.MeshBasicMaterial
    blueWire: THREE.MeshBasicMaterial
    ringMat1: THREE.MeshBasicMaterial
    ringMat2: THREE.MeshBasicMaterial
    ptMat: THREE.PointsMaterial
    fog: THREE.FogExp2
  } | null>(null)

  // ── One-time scene setup ──────────────────────────────────────────────────
  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    const t = themeRef.current

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const fog = new THREE.FogExp2(t.bgNum, 0.038)
    scene.fog = fog

    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 9)

    const greenWire = new THREE.MeshBasicMaterial({ color: t.threePrimary,   wireframe: true, transparent: true, opacity: 0.18 })
    const blueWire  = new THREE.MeshBasicMaterial({ color: t.threeSecondary, wireframe: true, transparent: true, opacity: 0.13 })
    const ringMat1  = new THREE.MeshBasicMaterial({ color: t.threePrimary,   transparent: true, opacity: 0.20 })
    const ringMat2  = new THREE.MeshBasicMaterial({ color: t.threeSecondary, transparent: true, opacity: 0.13 })

    matRef.current = { greenWire, blueWire, ringMat1, ringMat2, ptMat: null as unknown as THREE.PointsMaterial, fog }

    type ShapeData = { mesh: THREE.Mesh; rx: number; ry: number; rz: number; floatPhase: number; floatAmp: number }
    const shapeDefs: { geo: THREE.BufferGeometry; mat: THREE.MeshBasicMaterial; pos: [number,number,number]; rx: number; ry: number; rz: number }[] = [
      { geo: new THREE.IcosahedronGeometry(0.90, 0), mat: greenWire, pos: [-4.5,  2.0, -2.5], rx: 0.15, ry: 0.22, rz: 0.08 },
      { geo: new THREE.OctahedronGeometry(0.70, 0),  mat: blueWire,  pos: [ 4.2, -1.5, -1.5], rx: 0.10, ry: 0.30, rz: 0.12 },
      { geo: new THREE.IcosahedronGeometry(0.55, 1), mat: greenWire, pos: [ 3.0,  2.5, -3.0], rx: 0.25, ry: 0.10, rz: 0.20 },
      { geo: new THREE.TetrahedronGeometry(0.65, 0), mat: blueWire,  pos: [-3.2, -2.2, -1.5], rx: 0.20, ry: 0.15, rz: 0.25 },
      { geo: new THREE.OctahedronGeometry(1.10, 0),  mat: greenWire, pos: [-1.2,  3.2, -4.0], rx: 0.08, ry: 0.20, rz: 0.10 },
      { geo: new THREE.BoxGeometry(0.90, 0.90, 0.90),mat: blueWire,  pos: [ 1.5, -3.0, -2.0], rx: 0.18, ry: 0.12, rz: 0.22 },
      { geo: new THREE.IcosahedronGeometry(0.40, 0), mat: greenWire, pos: [-2.0,  0.8, -1.0], rx: 0.30, ry: 0.18, rz: 0.12 },
    ]

    const shapes: ShapeData[] = shapeDefs.map(({ geo, mat, pos, rx, ry, rz }, i) => {
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(...pos)
      scene.add(mesh)
      return { mesh, rx, ry, rz, floatPhase: i * 0.9, floatAmp: 0.18 + Math.random() * 0.18 }
    })

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.012, 8, 80), ringMat1)
    ring1.position.set(3.5, -1.2, -3)
    ring1.rotation.x = Math.PI / 3
    scene.add(ring1)

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.01, 6, 90), ringMat2)
    ring2.position.set(-4.0, 1.8, -4)
    scene.add(ring2)

    const COUNT = 340
    const positions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 28
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    const ptGeo = new THREE.BufferGeometry()
    ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const ptMat = new THREE.PointsMaterial({ color: t.threePrimary, size: 0.055, sizeAttenuation: true, transparent: true, opacity: 0.45 })
    const particles = new THREE.Points(ptGeo, ptMat)
    scene.add(particles)

    matRef.current.ptMat = ptMat

    const mouse = { x: 0, y: 0 }
    const camTarget = { x: 0, y: 0 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      if (!el) return
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let rafId: number
    let last = performance.now()

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const now  = performance.now()
      const dt   = Math.min((now - last) / 1000, 0.05)
      last = now
      const t = now / 1000

      shapes.forEach(({ mesh, rx, ry, rz, floatPhase, floatAmp }) => {
        mesh.rotation.x += dt * rx
        mesh.rotation.y += dt * ry
        mesh.rotation.z += dt * rz
        mesh.position.y += Math.sin(t * 0.6 + floatPhase) * floatAmp * dt
      })

      ring1.rotation.z += dt * 0.08
      ring2.rotation.y += dt * 0.05
      ring2.rotation.x += dt * 0.03

      particles.rotation.y += dt * 0.018

      camTarget.x += (mouse.x - camTarget.x) * dt * 1.5
      camTarget.y += (mouse.y - camTarget.y) * dt * 1.5
      camera.position.x = camTarget.x * 1.4
      camera.position.y = camTarget.y * 0.8
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Live theme updates without rebuilding the scene ───────────────────────
  useEffect(() => {
    const m = matRef.current
    if (!m) return
    m.greenWire.color.setHex(theme.threePrimary)
    m.blueWire.color.setHex(theme.threeSecondary)
    m.ringMat1.color.setHex(theme.threePrimary)
    m.ringMat2.color.setHex(theme.threeSecondary)
    m.ptMat.color.setHex(theme.threePrimary)
    m.fog.color.setHex(theme.bgNum)
  }, [theme])

  return <div ref={mountRef} className="absolute inset-0 z-0" aria-hidden />
}
