import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/* ──────────────────────────────────────────────────────────────
   Educational world markers (lat/lng of each themed region)
────────────────────────────────────────────────────────────── */
const WORLD_MARKERS = [
  { lat: 19.82,  lng: -155.47, color: '#60a5fa', label: '🔭 Espaço',     pulse: 1   },
  { lat: 41.9,   lng:   12.5,  color: '#f59e0b', label: '🏛️ História',   pulse: 1.3 },
  { lat: 37.98,  lng:   23.73, color: '#34d399', label: '📐 Matemática', pulse: 0.9 },
  { lat: 51.51,  lng:   -0.13, color: '#f472b6', label: '📚 Literatura', pulse: 1.1 },
  { lat: 37.39,  lng: -122.08, color: '#a78bfa', label: '💻 Tecnologia', pulse: 0.8 },
  { lat: -3.47,  lng:  -62.22, color: '#10b981', label: '🌿 Natureza',   pulse: 1.2 },
]

/* Educational facts that cycle on the info card */
const FACTS = [
  'A rotação da Terra leva 24 horas para completar um giro, criando o dia e a noite.',
  'O EduxRealms tem +20 mundos 3D com conteúdos de ciências, história, matemática e muito mais.',
  'Salas de aula virtuais permitem que alunos explorem planetas, civilizações e ecossistemas.',
  'Com realidade virtual, o aprendizado se torna 4× mais eficaz que métodos tradicionais.',
]

/* lat/lng → THREE.Vector3 on unit sphere */
function latLngToVec3(lat, lng, r = 1.015) {
  const phi   = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  )
}

/* ──────────────────────────────────────────────────────────────
   GlobeViz component
────────────────────────────────────────────────────────────── */
export default function GlobeViz() {
  const mountRef  = useRef(null)
  const [factIdx, setFactIdx] = useState(0)

  /* Cycle facts every 5 s */
  useEffect(() => {
    const id = setInterval(() => setFactIdx((i) => (i + 1) % FACTS.length), 5000)
    return () => clearInterval(id)
  }, [])

  /* Three.js scene */
  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.shadowMap.enabled = false
    el.appendChild(renderer.domElement)

    /* ── Scene / Camera ── */
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 200)
    camera.position.set(0, 0, 2.8)

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0x334466, 1.4))
    const sun = new THREE.DirectionalLight(0xffffff, 1.6)
    sun.position.set(6, 3, 5)
    scene.add(sun)
    const rimLight = new THREE.DirectionalLight(0x4466cc, 0.5)
    rimLight.position.set(-4, -2, -3)
    scene.add(rimLight)

    /* ── Stars (background particles) ── */
    const starGeo = new THREE.BufferGeometry()
    const starVerts = []
    for (let i = 0; i < 1800; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 80 + Math.random() * 20
      starVerts.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      )
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVerts, 3))
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.18, sizeAttenuation: true })))

    /* ── Earth ── */
    const loader  = new THREE.TextureLoader()
    const earthGeo = new THREE.SphereGeometry(1, 64, 64)

    /* Use CDN textures – same source globe.gl examples use */
    const earthMat = new THREE.MeshPhongMaterial({
      map:         loader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'),
      specularMap: loader.load('https://unpkg.com/three-globe/example/img/earth-water.png'),
      specular:    new THREE.Color('#223344'),
      shininess:   18,
    })
    const earth = new THREE.Mesh(earthGeo, earthMat)
    scene.add(earth)

    /* Clouds layer */
    const cloudsMat = new THREE.MeshPhongMaterial({
      map:         loader.load('https://unpkg.com/three-globe/example/img/earth-clouds.png'),
      transparent: true,
      opacity:     0.35,
      depthWrite:  false,
    })
    const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.012, 64, 64), cloudsMat)
    scene.add(clouds)

    /* Atmosphere glow (inner) */
    const atmMat = new THREE.MeshPhongMaterial({
      color:       0x1155cc,
      transparent: true,
      opacity:     0.08,
      side:        THREE.FrontSide,
      depthWrite:  false,
    })
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.03, 48, 48), atmMat))

    /* Atmosphere glow (outer halo) */
    const haloMat = new THREE.MeshPhongMaterial({
      color:       0x2266ff,
      transparent: true,
      opacity:     0.04,
      side:        THREE.BackSide,
      depthWrite:  false,
    })
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.18, 32, 32), haloMat))

    /* ── Markers ── */
    const markerGroup = new THREE.Group()
    const pulseRings   = []

    WORLD_MARKERS.forEach(({ lat, lng, color, pulse }) => {
      const pos   = latLngToVec3(lat, lng)
      const col   = new THREE.Color(color)

      /* Core dot */
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 10, 10),
        new THREE.MeshBasicMaterial({ color: col }),
      )
      dot.position.copy(pos)
      markerGroup.add(dot)

      /* Halo / pulsing ring */
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.028, 0.038, 24),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.7, side: THREE.DoubleSide }),
      )
      ring.position.copy(pos)
      ring.lookAt(pos.clone().multiplyScalar(3))
      ring.userData = { baseScale: pulse, phase: Math.random() * Math.PI * 2 }
      markerGroup.add(ring)
      pulseRings.push(ring)

      /* Spike line from surface */
      const spikeGeo = new THREE.BufferGeometry().setFromPoints([
        pos.clone().multiplyScalar(1 / 1.015),
        pos.clone().multiplyScalar(1.06 / 1.015),
      ])
      markerGroup.add(new THREE.Line(spikeGeo, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.5 })))
    })

    scene.add(markerGroup)

    /* ── Orbit Controls ── */
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping    = true
    controls.dampingFactor    = 0.06
    controls.enableZoom       = false
    controls.enablePan        = false
    controls.autoRotate       = true
    controls.autoRotateSpeed  = 0.45
    controls.minPolarAngle    = Math.PI * 0.2
    controls.maxPolarAngle    = Math.PI * 0.8

    /* ── Resize ── */
    const onResize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    /* ── Animation loop ── */
    let raf
    let t = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      t  += 0.016

      clouds.rotation.y += 0.0004

      pulseRings.forEach((ring) => {
        const s = 1 + 0.25 * Math.sin(t * 1.8 + ring.userData.phase)
        ring.scale.setScalar(s * ring.userData.baseScale)
        ring.material.opacity = 0.35 + 0.35 * Math.abs(Math.sin(t * 1.8 + ring.userData.phase))
      })

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      controls.dispose()
      renderer.dispose()
      earthMat.dispose()
      cloudsMat.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Three.js canvas mount */}
      <style>{`
        .globe-mount { cursor: grab; }
        .globe-mount:active { cursor: grabbing; }
      `}</style>
      <div ref={mountRef} className="globe-mount" style={{ width: '100%', height: '100%' }} />

      {/* Educational fact card — bottom overlay */}
      <div
        style={{
          position:       'absolute',
          bottom:         '1.25rem',
          left:           '50%',
          transform:      'translateX(-50%)',
          width:          'calc(100% - 2.5rem)',
          background:     'rgba(5,5,18,0.82)',
          backdropFilter: 'blur(16px)',
          border:         '1px solid rgba(255,255,255,0.08)',
          borderRadius:   '0.875rem',
          padding:        '0.85rem 1.1rem',
          pointerEvents:  'none',
          zIndex:         20,
          transition:     'opacity 0.4s',
        }}
      >
        <p
          style={{
            color:      'rgba(255,255,255,0.82)',
            fontSize:   '0.92rem',
            lineHeight: '1.55',
            fontStyle:  'italic',
            margin:     0,
            textAlign:  'center',
          }}
        >
          {FACTS[factIdx]}
        </p>
      </div>
    </div>
  )
}
