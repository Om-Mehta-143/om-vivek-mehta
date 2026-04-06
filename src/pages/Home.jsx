import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Sphere, Box, Plane, useTexture } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'

// Components

import ContactForm from '../components/ContactForm'


// Role Typer Animation Component
const RoleTyper = () => {
    const roles = ["Ethical Hacker", "Red Teamer", "Security Consultant", "Freelance Web Developer"];
    const [text, setText] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                setText(currentRole.substring(0, text.length - 1));
                if (text.length === 0) {
                    setIsDeleting(false);
                    setRoleIndex((roleIndex + 1) % roles.length);
                }
            } else {
                setText(currentRole.substring(0, text.length + 1));
                if (text.length === currentRole.length) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            }
        }, isDeleting ? 50 : 100);
        return () => clearTimeout(timeout);
    }, [text, isDeleting, roleIndex]);

    return (
        <span className="text-green-300 font-mono">
            {text}<span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1 align-middle"></span>
        </span>
    );
}

// Matrix Character Component
const MatrixChar = ({ initialX, initialY, initialZ }) => {
  const textRef = useRef()
  const [char] = useState(String.fromCharCode(0x30A0 + Math.random() * 96))
  const [speed] = useState(Math.random() * 0.03 + 0.02)

  useFrame(() => {
    if (textRef.current) {
      textRef.current.position.y -= speed
      if (textRef.current.position.y < -20) {
        textRef.current.position.y = 30
        textRef.current.position.x = (Math.random() - 0.5) * 50
      }
    }
  })

  return (
    <Text
      ref={textRef}
      position={[initialX, initialY, initialZ]}
      fontSize={0.5}
      color="#22c55e"
    >
      {char}
    </Text>
  )
}

// Interactive Matrix Rain Effect
const MatrixRain = () => {
  const [characters] = useState(() => {
    const chars = []
    for (let i = 0; i < 80; i++) {
      chars.push({
        id: i,
        x: (Math.random() - 0.5) * 50,
        y: Math.random() * 30 + 10,
        z: (Math.random() - 0.5) * 30
      })
    }
    return chars
  })

  return (
    <group>
      {characters.map((char) => (
        <MatrixChar
          key={char.id}
          initialX={char.x}
          initialY={char.y}
          initialZ={char.z}
        />
      ))}
    </group>
  )
}

// Interactive Neural Network
const NeuralNetwork = ({ mouse }) => {
  const groupRef = useRef()
  const [nodes] = useState(() => {
    const nodeArray = []
    for (let i = 0; i < 50; i++) {
      nodeArray.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15
        ],
        connections: []
      })
    }
    
    // Create connections between nearby nodes
    nodeArray.forEach((node, i) => {
      nodeArray.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.position[0] - otherNode.position[0], 2) +
            Math.pow(node.position[1] - otherNode.position[1], 2) +
            Math.pow(node.position[2] - otherNode.position[2], 2)
          )
          if (distance < 5 && Math.random() > 0.7) {
            node.connections.push(j)
          }
        }
      })
    })
    return nodeArray
  })

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
      groupRef.current.rotation.x = mouse.y * 0.1
      groupRef.current.rotation.z = mouse.x * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <Sphere key={`node-${i}`} position={node.position} args={[0.1, 8, 8]}>
          <meshStandardMaterial
            color="#00ff41"
            emissive="#00ff41"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}
      
      {/* Connections */}
      {nodes.map((node, i) => 
        node.connections.map((connectionIndex, j) => {
          const targetNode = nodes[connectionIndex]
          const start = new THREE.Vector3(...node.position)
          const end = new THREE.Vector3(...targetNode.position)
          const distance = start.distanceTo(end)
          
          return (
            <mesh key={`connection-${i}-${j}`} position={[
              (start.x + end.x) / 2,
              (start.y + end.y) / 2,
              (start.z + end.z) / 2
            ]} rotation={[0, 0, Math.atan2(end.y - start.y, end.x - start.x)]}>
              <boxGeometry args={[distance, 0.02, 0.02]} />
              <meshStandardMaterial
                color="#00ff41"
                emissive="#00ff41"
                emissiveIntensity={0.2}
                transparent
                opacity={0.3}
              />
            </mesh>
          )
        })
      )}
    </group>
  )
}

// Floating Code Fragments
const CodeFragments = ({ mouse }) => {
  const [fragments] = useState(() => {
    const codeSnippets = [
      'const hack = () => {}',
      'function exploit() {',
      'while(true) {',
      'if(vulnerable) {',
      'system.access()',
      'decrypt(payload)',
      'sudo rm -rf',
      'nc -lvp 4444',
      'python exploit.py',
      'sqlmap -u target',
      '0x41414141',
      'buffer_overflow()'
    ]
    
    return Array.from({ length: 15 }, (_, i) => ({
      text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 20
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      speed: Math.random() * 0.02 + 0.01
    }))
  })
  
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.y += fragments[i].speed
        child.position.x += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.01
        child.position.y += Math.cos(state.clock.elapsedTime * 0.3 + i) * 0.005
      })
    }
  })
  
  return (
    <group ref={groupRef}>
      {fragments.map((fragment, i) => (
        <Text
          key={i}
          position={fragment.position}
          rotation={fragment.rotation}
          fontSize={0.3}
          color="#ff6b35"
          fontFamily="monospace"
          anchorX="center"
          anchorY="middle"
        >
          {fragment.text}
        </Text>
      ))}
    </group>
  )
}

// Interactive Rotating Cube with Shaders - Enhanced
const HackerCube = ({ mouse }) => {
  const meshRef = useRef()
  const materialRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 + mouse.y * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4 + mouse.x * 0.5
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      
      // Scale based on mouse proximity
      const scale = 1 + (Math.abs(mouse.x) + Math.abs(mouse.y)) * 0.3
      meshRef.current.scale.setScalar(scale)
    }
    
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#000000"
        emissive="#00ff41"
        emissiveIntensity={0.5}
        wireframe
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

// Terminal loading sequence component
const LoadingSequence = () => {
  const [percent, setPercent] = useState(1)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let start = performance.now()
    const durationMs = 5000

    let raf
    const tick = (now) => {
      const elapsed = Math.min(now - start, durationMs)
      const p = Math.round((elapsed / durationMs) * 100)
      setPercent(Math.max(1, Math.min(100, p)))
      if (elapsed < durationMs) {
        raf = requestAnimationFrame(tick)
      } else {
        setDone(true)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (done) {
    return (
      <div className="text-green-300 space-y-2 text-sm">
        <div>Scanning vulnerabilities... <span className="text-green-400">[✓]</span></div>
        <div>Analyzing skills... <span className="text-green-400">[✓]</span></div>
        <div className="text-green-400 font-semibold">PROFILE LOADED SUCCESSFULLY ! SCROLL TO CONTINUE</div>
      </div>
    )
  }

  // Build a 10-segment bar based on percent
  const filledSegments = Math.floor(percent / 10)
  const bar = '●'.repeat(filledSegments) + '○'.repeat(10 - filledSegments)

  return (
    <div className="text-green-300 space-y-1 text-sm">
      <div>Scanning vulnerabilities... <span className="text-green-400">[✓]</span></div>
      <div>Analyzing skills... <span className="text-green-400">[✓]</span></div>
      <div>Loading portfolio... <span className="text-yellow-400">[{bar}]</span> {percent}%</div>
    </div>
  )
}

// Advanced Professional Hacker 3D Scene
const HackerScene = () => {
  const [error, setError] = useState(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  
  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
      setError('WebGL not supported')
    }
    
    // Mouse tracking for interactivity
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  if (error) {
    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 flex items-center justify-center">
        <div className="text-center border border-green-400 p-8 bg-black/50">
          <h1 className="text-4xl font-bold text-green-400 mb-4 font-mono">SYSTEM ERROR</h1>
          <p className="text-green-300 mb-8 font-mono">[!] {error}</p>
          <div className="text-6xl text-red-500">⚠</div>
        </div>
      </div>
    )
  }
  
  return (
    <div 
      className="relative w-full h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Matrix-style background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/8 to-black/90 pointer-events-none" />
      
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 15], fov: 60 }}
        onError={(error) => {
          console.error('Three.js Canvas Error:', error)
          setError('3D rendering failed')
        }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Calmer Lighting Setup */}
        <ambientLight intensity={0.12} color="#6ee7b7" />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#86efac" />
        <pointLight position={[-10, -10, -5]} intensity={0.25} color="#22d3ee" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#00d4ff"
          castShadow
        />
        
        {/* Interactive Elements */}
        <MatrixRain />
        
        {/* Post-processing Effects (softened) */}
        <EffectComposer>
          <Bloom intensity={0.3} width={300} height={300} kernelSize={5} luminanceThreshold={0.2} luminanceSmoothing={0.02} />
          <ChromaticAberration offset={[0.0008, 0.0008]} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={0.3} />
        </EffectComposer>
      </Canvas>
      
      {/* Interactive HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Terminal-style header */}
        <div className="absolute top-14 left-4 font-mono text-green-400 text-xs md:text-sm">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span>[SECURE_CONNECTION_ESTABLISHED]</span>
          </div>
          <div className="h-10" />
          <div className="text-green-300">
            root@hackersystem:~$ whoami
          </div>
        </div>
        
        {/* System stats - moved down to avoid overlap */}
        <div className="absolute top-20 right-4 font-mono text-green-400 text-xs">
          <div className="border border-green-400/30 bg-black/50 p-3 space-y-1">
            <div>CPU: {Math.floor(mouse.x * 50 + 50)}%</div>
            <div>MEM: {Math.floor(mouse.y * 30 + 70)}%</div>
            <div>NET: {isHovered ? 'ACTIVE' : 'IDLE'}</div>
            <div className="text-yellow-400">STATUS: ONLINE</div>
          </div>
        </div>
        
        {/* Central Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-5xl px-6 flex flex-col md:flex-row items-center justify-center gap-12 mt-16 md:mt-0">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-green-500/30 glow-border shadow-[0_0_30px_rgba(34,197,94,0.3)] z-10 shrink-0">
              <div className="absolute inset-0 bg-green-500/20 mix-blend-overlay z-10 pointer-events-none"></div>
              <img src="/my_official_pic.png" alt="Om Vivek Mehta" className="w-full h-full object-cover filter contrast-125 hover:filter-none transition-all duration-500" />
            </motion.div>
            <div className="text-center md:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold font-mono mb-4 text-white">
                &gt; OM VIVEK MEHTA
              </h1>
              
              <div className="text-xl md:text-2xl font-mono mb-4">
                                <span className="text-white animate-pulse">[</span>
                                <RoleTyper />
                                <span className="text-white animate-pulse">]</span>
                            </div>
              
              <div className="text-sm text-red-600 font-mono mb-6">
                → Ethical Hacker | Red Teamer | Security Consultant
              </div>
            </motion.div>
            
            {/* Interactive command prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="border border-green-400/50 bg-black/70 p-4 font-mono text-left max-w-2xl mx-auto"
            >
              <div className="text-green-400 mb-2">
                <span className="text-red-500">root@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">$ ./scan_portfolio.sh</span>
              </div>
              <LoadingSequence />
            </motion.div>
                    </div>
          </div>
        </div>
        
        {/* Scroll indicator - Matrix style */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-green-400 font-mono text-xs animate-pulse">
              [SCROLL_TO_EXPLORE]
            </div>
            <div className="w-6 h-10 border-2 border-green-400/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
        
        {/* Corner decorations */}
        <div className="absolute bottom-4 left-4 font-mono text-green-500/50 text-xs">
          <div>COORDINATES: [{mouse.x.toFixed(3)}, {mouse.y.toFixed(3)}]</div>
        </div>
        
        <div className="absolute bottom-4 right-4 font-mono text-green-500/50 text-xs">
          <div>ENCRYPTION: AES-256 | STATUS: SECURE</div>
        </div>
      </div>
    </div>
  )
}

// Main App Component
function Home() {
  const [performanceMode, setPerformanceMode] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check WebGL support immediately
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    const hasWebGL = !!gl
    
    if (!hasWebGL) {
      setIsLoading(false)
      return
    }
    
    // Short loading time for WebGL
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Toggles removed from UI per request

  if (isLoading) {
    return (
      <div className="webgl-fallback">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full mx-auto mb-8"
          />
          <h1 className="text-4xl font-bold text-gradient mb-4">Loading...</h1>
          <p className="text-white/60">Preparing 3D experience</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      {/* Main 3D Scene */}
      <section id="hero">
        <HackerScene />
      </section>

      {/* About Me Section */}
      <section id="about" className="min-h-screen bg-gradient-to-b from-black via-blue-900/10 to-black flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-bold font-mono mb-4">
              <span className="text-blue-500">[</span>
              <span className="text-white">ABOUT_ME</span>
              <span className="text-blue-500">]</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border border-green-400/30 bg-black/80 p-8 rounded-lg font-mono glow-border shadow-[0_0_15px_rgba(34,197,94,0.1)]"
            >
              <div className="border-b border-green-400/30 pb-4 mb-6">
                <span className="text-red-500">root@hackersystem</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~/profile</span>
                <span className="text-white">$ cat about.txt</span>
              </div>

              <div className="space-y-4 text-green-300 text-sm leading-relaxed mb-8">
                <div><span className="text-yellow-400 w-32 inline-block">NAME:</span> OM VIVEK MEHTA</div>
                <div><span className="text-yellow-400 w-32 inline-block">ROLE:</span> Ethical Hacker | Red Teamer | Security Consultant</div>
                <div><span className="text-yellow-400 w-32 inline-block">LOCATION:</span> India (Open to Remote)</div>
                <div><span className="text-yellow-400 w-32 inline-block">SPECIALIZATION:</span> Web App Pentesting, Network Security, Automation</div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-blue-400 font-bold mb-2">[MISSION_STATEMENT]</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  I'm an ambitious cybersecurity student with a vision to become one of the youngest elite ethical hackers.
                  Currently pursuing a BTech in Cybersecurity, I'm focused on mastering networking, penetration testing,
                  and automation. My mission is to identify vulnerabilities before attackers do, sharpen my technical
                  expertise daily, and build a portfolio that demonstrates real-world execution.
                </p>
              </div>

              <div>
                <h3 className="text-purple-400 font-bold mb-2">[ACHIEVEMENTS]</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start"><span className="text-green-400 mr-2">✓</span>Completed multiple networking & cybersecurity lab projects</li>
                  <li className="flex items-start"><span className="text-green-400 mr-2">✓</span>Built custom scripts for automating assignments & workflows</li>
                  <li className="flex items-start"><span className="text-green-400 mr-2">✓</span>Hands-on with penetration testing tools: Nmap, Wireshark, Burp Suite, Metasploit</li>
                  <li className="flex items-start"><span className="text-green-400 mr-2">✓</span>Active in CTFs & bug bounty practice</li>
                  <li className="flex items-start"><span className="text-green-400 mr-2">✓</span>Founder of Anom Shield</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-bold font-mono mb-4">
              <span className="text-purple-500">[</span>
              <span className="text-white">SKILL_MATRIX</span>
              <span className="text-purple-500">]</span>
            </h2>
            <div className="text-purple-400 font-mono text-xl">
              → Comprehensive cybersecurity skill assessment
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="border border-red-400/30 bg-black/80 p-8 rounded-lg">
                <h3 className="text-3xl font-bold text-red-400 font-mono mb-8">
                  [OFFENSIVE_SECURITY]
                </h3>
                
                <div className="space-y-6">
                  {[
                    { skill: 'Web Application Testing', level: 75, color: 'red' },
                    { skill: 'Network Penetration', level: 72, color: 'orange' },
                    { skill: 'Social Engineering', level: 55, color: 'yellow' },
                    { skill: 'Mobile App Security', level: 45, color: 'green' },
                    { skill: 'Wireless Security', level: 60, color: 'blue' },
                    { skill: 'Binary Exploitation', level: 35, color: 'purple' }
                  ].map((item, index) => (
                    <div key={item.skill} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-mono text-sm">{item.skill}</span>
                        <span className={`text-${item.color}-400 font-mono text-sm`}>{item.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                          className={`h-full bg-${item.color}-500 rounded-full relative`}
                        >
                          <div className={`absolute inset-0 bg-${item.color}-400 opacity-50 animate-pulse`}></div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Defensive Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="border border-blue-400/30 bg-black/80 p-8 rounded-lg">
                <h3 className="text-3xl font-bold text-blue-400 font-mono mb-8">
                  [DEFENSIVE_SECURITY]
                </h3>
                
                <div className="space-y-6">
                  {[
                    { skill: 'Incident Response', level: 55, color: 'blue' },
                    { skill: 'Threat Hunting', level: 50, color: 'cyan' },
                    { skill: 'Malware Analysis', level: 35, color: 'green' },
                    { skill: 'Forensics', level: 45, color: 'yellow' },
                    { skill: 'SIEM Management', level: 30, color: 'purple' },
                    { skill: 'Risk Assessment', level: 55, color: 'red' }
                  ].map((item, index) => (
                    <div key={item.skill} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-mono text-sm">{item.skill}</span>
                        <span className={`text-${item.color}-400 font-mono text-sm`}>{item.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.7 }}
                          className={`h-full bg-${item.color}-500 rounded-full relative`}
                        >
                          <div className={`absolute inset-0 bg-${item.color}-400 opacity-50 animate-pulse`}></div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tools & Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="border border-green-400/30 bg-black/80 p-8 rounded-lg mb-12"
          >
            <h3 className="text-3xl font-bold text-green-400 font-mono mb-8 text-center">
              [ARSENAL_&_TOOLS]
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[
                { name: 'Burp Suite', category: 'Web Testing', icon: '🕷️', link: 'https://portswigger.net/burp' },
                { name: 'Metasploit', category: 'Exploitation', icon: '💥', link: 'https://www.metasploit.com/' },
                { name: 'Volatility', category: 'Memory Forensics', icon: '🧠', link: 'https://www.varonis.com/blog/how-to-use-volatility' },
                { name: 'Wireshark', category: 'Network Analysis', icon: '📡', link: 'https://www.wireshark.org/' },
                { name: 'Nmap', category: 'Scanning', icon: '🔍', link: 'https://nmap.org/' },
                { name: 'Nessus', category: 'Vulnerability Scanner', icon: '🛡️', link: 'https://www.tenable.com/products/nessus' },
                { name: 'SQLMap', category: 'Database', icon: '🗄️', link: 'http://sqlmap.org/' },
                { name: 'Hydra', category: 'Brute Force', icon: '🗝️', link: 'https://github.com/vanhauser-thc/thc-hydra' },
                { name: 'Aircrack-ng', category: 'Wireless', icon: '📶', link: 'https://www.aircrack-ng.org/' },
                { name: 'John the Ripper', category: 'Password Cracking', icon: '🔓', link: 'https://www.openwall.com/john/' }
              ].map((tool, index) => (
                <motion.a
                  key={tool.name}
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glow-border border-cyan-400/30 bg-gray-900/50 p-4 rounded-lg text-center hover:border-green-400 transition-all duration-300 group cursor-pointer block"
                >
                  <div className="text-3xl mb-2 group-hover:animate-bounce">{tool.icon}</div>
                  <div className="text-white font-mono text-sm font-bold mb-1">{tool.name}</div>
                  <div className="text-gray-400 text-xs">{tool.category}</div>
                  <div className="text-green-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to learn →
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="border border-yellow-400/30 bg-black/80 p-8 rounded-lg"
          >
            <h3 className="text-3xl font-bold text-yellow-400 font-mono mb-8 text-center">
              [CERTIFICATIONS_&_CREDENTIALS]
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                // Completed Certificates
                { cert: 'Deloitte Cybersecurity Job Simulation', full: 'Deloitte Cybersecurity Job Simulation Certificate', status: 'COMPLETED', color: 'green', link: '/certs/Deloitte Cyber Internship Certificate.pdf' },
                { cert: 'Palo Alto Security Ops', full: 'Palo Alto Security Operations Certificate', status: 'COMPLETED', color: 'blue', link: '/certs/fycs _ 25_ pa-cert-security operations.pdf' },
                { cert: 'Palo Alto Cloud Security', full: 'Palo Alto Cloud Security Fundamentals', status: 'COMPLETED', color: 'cyan', link: '/certs/fycs_25_pa-cert-clod security fundamentals.pdf' },
                { cert: 'Leadership Certificate', full: 'Leadership Development Certificate', status: 'COMPLETED', color: 'purple', link: '/certs/Leadership cert.pdf' },
                { cert: 'Canva Design', full: 'Learn Canva - Udemy Certificate', status: 'COMPLETED', color: 'pink', link: '/certs/Learn Canva _ Udemy.pdf' },
                { cert: 'Mastercard Cybersecurity Job Simulation', full: 'Mastercard Cybersecurity Job Simulation Certificate', status: 'COMPLETED', color: 'red', link: '/certs/mastercard cyber job sim cert.pdf' },
                { cert: 'Palo Alto Network', full: 'Palo Alto Network Security Certificate', status: 'COMPLETED', color: 'orange', link: '/certs/palo-alto-network-sec-cert.pdf' },
                { cert: 'Prompt Engineering', full: 'Prompt Engineering Certificate', status: 'COMPLETED', color: 'yellow', link: '/certs/prompt enginering  cert.pdf' },
                // In Progress & Planned
                { cert: 'CompTIA Security+', full: 'Security+ Certification', status: 'IN_PROGRESS', color: 'gray' },
                { cert: 'CCNA', full: 'Cisco Certified Network Associate', status: 'PLANNED', color: 'indigo' },
                { cert: 'OSCP', full: 'Offensive Security Certified Professional', status: 'PLANNED', color: 'red' },
                { cert: 'CEH', full: 'Certified Ethical Hacker', status: 'PLANNED', color: 'green' },
                { cert: 'GPEN', full: 'GIAC Penetration Tester', status: 'PLANNED', color: 'purple' },
                { cert: 'OSWE', full: 'Offensive Security Web Expert', status: 'PLANNED', color: 'yellow' }
              ].map((cert, index) => 
                cert.link ? (
                  <motion.a
                    key={cert.cert}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, rotateY: 90 }}
                    whileInView={{ opacity: 1, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`border border-${cert.color}-400/30 bg-black/60 p-4 rounded-lg hover:border-${cert.color}-400 transition-all duration-300 group cursor-pointer block`}
                  >
                    <div className="text-center">
                      <div className={`text-2xl font-bold text-${cert.color}-400 font-mono mb-2 group-hover:text-${cert.color}-300`}>
                        {cert.cert}
                      </div>
                      <div className="text-gray-300 text-xs mb-3 leading-tight">
                        {cert.full}
                      </div>
                      <div className={`text-xs font-mono px-2 py-1 rounded ${
                        cert.status === 'COMPLETED' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : cert.status === 'IN_PROGRESS'
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}>
                        {cert.status}
                      </div>
                      <div className="text-green-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to view →
                      </div>
                    </div>
                  </motion.a>
                ) : (
                  <motion.div
                    key={cert.cert}
                    initial={{ opacity: 0, rotateY: 90 }}
                    whileInView={{ opacity: 1, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`border border-${cert.color}-400/30 bg-black/60 p-4 rounded-lg hover:border-${cert.color}-400 transition-all duration-300 group`}
                  >
                    <div className="text-center">
                      <div className={`text-2xl font-bold text-${cert.color}-400 font-mono mb-2 group-hover:text-${cert.color}-300`}>
                        {cert.cert}
                      </div>
                      <div className="text-gray-300 text-xs mb-3 leading-tight">
                        {cert.full}
                      </div>
                      <div className={`text-xs font-mono px-2 py-1 rounded ${
                        cert.status === 'IN_PROGRESS'
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}>
                        {cert.status}
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Section - Hacker Projects */}
      <section id="work" className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Projects Section */}
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
          >
              <h2 className="text-6xl font-bold font-mono mb-4 text-white">
                  <span className="text-red-500">[</span>PROJECTS_EXPLOITS<span className="text-red-500">]</span>
              </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {[
                  { title: 'ITGE — Identity & Trust Graph Engine', desc: 'Attack Path Dashboard focusing on visual reasoning.', tags: ['Neo4j', 'Python', 'FastAPI', 'D3.js'], link: '#', status: 'ACTIVE', color: 'red' },
                  { title: 'Defense Validation Platform', desc: 'Secure evaluation and validation of defensive configurations.', tags: ['Python', 'FastAPI'], link: '#', status: 'COMPLETE', color: 'green' },
                  { title: 'Car Evaluator', desc: 'Automated evaluation platform for embedded vehicle security.', tags: ['Hardware', 'Security'], link: '#', status: 'COMPLETE', color: 'blue' },
                  { title: 'Polyglot Code Analyser', desc: 'Static code analysis framework to detect vulnerabilities.', tags: ['Python', 'VS Code', 'Chrome Ext'], link: '#', status: 'DEVELOPING', color: 'yellow' },
                  { title: 'Personal AI Browser', desc: 'Privacy-focused custom browsing environment with local AI.', tags: ['AI', 'Browser Tech'], link: '#', status: 'DEVELOPING', color: 'purple' },
                  { title: 'AURUM Password Manager', desc: 'Zero-knowledge encrypted password vault.', tags: ['Cryptography', 'Secure Storage'], link: '#', status: 'COMPLETE', color: 'cyan' },
              ].map((proj, i) => (
                  <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`border border-${proj.color}-400/30 bg-black/80 rounded-lg p-6 glow-border group flex flex-col`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <h3 className={`text-lg font-bold text-${proj.color}-400 font-mono`}>{proj.title}</h3>
                          <div className={`text-${proj.color}-500 text-[10px] font-mono border border-${proj.color}-500/50 px-2 rounded`}>{proj.status}</div>
                      </div>
                      <p className="text-gray-300 text-sm font-mono mb-4 flex-1">{proj.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                          {proj.tags.map(tag => (
                              <span key={tag} className="text-xs font-mono bg-gray-800 text-gray-300 px-2 py-0.5 rounded">{tag}</span>
                          ))}
                      </div>
                      <div>
                          <a href={proj.link} className={`text-${proj.color}-400 hover:text-${proj.color}-300 font-mono text-sm underline`}>GitHub/Demo →</a>
                      </div>
                  </motion.div>
              ))}
          </div>

          {/* Hackathons & CTFs */}
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
          >
              <h2 className="text-4xl font-bold font-mono mb-4 text-white">
                  <span className="text-orange-500">[</span>HACKATHONS_&_CTFS<span className="text-orange-500">]</span>
              </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
              {[
                  { name: '[HACKATHON_1]', position: 'Winner / Finalist', date: 'Oct 2025', org: 'Organizer Name' },
                  { name: '[CTF_1]', position: 'Top 10', date: 'Aug 2025', org: 'Organizer Name' },
                  { name: '[CTF_2]', position: 'Participant', date: 'Jan 2024', org: 'Organizer Name' }
              ].map((event, i) => (
                  <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="border-l-2 border-orange-500 bg-gray-900/50 p-4 font-mono group hover:bg-gray-800/80 transition-colors"
                  >
                      <div className="text-orange-400 font-bold mb-1">{event.name}</div>
                      <div className="text-white text-sm mb-2">{event.position}</div>
                      <div className="flex justify-between text-xs text-gray-400">
                          <span>{event.org}</span>
                          <span>{event.date}</span>
                      </div>
                  </motion.div>
              ))}
          </div>

          {/* Content Section removed */}
        </div>
      </section>

      {/* Methodology Section */}
      <section id="process" className="min-h-screen bg-gradient-to-b from-black via-red-900/10 to-black flex items-center justify-center py-20">
        <div className="text-center max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-6xl font-bold font-mono mb-4">
              <span className="text-red-500">[</span>
              <span className="text-white">METHODOLOGY</span>
              <span className="text-red-500">]</span>
            </h2>
            <div className="text-red-400 font-mono text-xl">
              → Systematic approach to ethical hacking & penetration testing
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: 'RECONNAISSANCE',
                icon: '🔍',
                color: 'blue',
                description: 'Information gathering and target enumeration using OSINT techniques'
              },
              {
                step: 'SCANNING',
                icon: '⚡',
                color: 'yellow', 
                description: 'Network and service discovery with automated vulnerability scanning'
              },
              {
                step: 'EXPLOITATION',
                icon: '🔥',
                color: 'red',
                description: 'Weaponizing vulnerabilities and gaining initial system access'
              },
              {
                step: 'POST_EXPLOITATION',
                icon: '🎯',
                color: 'purple',
                description: 'Privilege escalation, lateral movement, and persistence'
              },
              {
                step: 'REPORTING',
                icon: '📄',
                color: 'green',
                description: 'Comprehensive documentation with remediation recommendations'
              }
            ].map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`border border-${phase.color}-400/30 bg-black/80 p-6 rounded-lg hover:border-${phase.color}-400 transition-all duration-300 group relative overflow-hidden`}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="font-mono text-xs leading-tight">
                    {Array.from({ length: 50 }, (_, i) => '01').join('')}
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-${phase.color}-500/20 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    {phase.icon}
                  </div>
                  <div className={`text-${phase.color}-400 font-mono text-lg font-bold mb-2 group-hover:text-${phase.color}-300`}>
                    [{index + 1}] {phase.step}
                  </div>
                  <p className="text-gray-300 text-sm font-mono leading-relaxed">
                    {phase.description}
                  </p>
                  
                  {/* Step indicator */}
                  <div className="mt-4 flex justify-center">
                    <div className={`w-full h-1 bg-${phase.color}-500/20 rounded-full overflow-hidden`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                        className={`h-full bg-${phase.color}-500 rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Kill chain visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 border border-red-400/30 bg-black/70 p-8 rounded-lg"
          >
            <h3 className="text-2xl font-bold text-red-400 font-mono mb-6">
              [CYBER_KILL_CHAIN]
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-mono">
              {['RECONNAISSANCE', 'WEAPONIZATION', 'DELIVERY', 'EXPLOITATION', 'INSTALLATION', 'C2', 'ACTIONS'].map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className="bg-red-500/20 border border-red-500/50 px-3 py-2 rounded text-red-400">
                    {step}
                  </div>
                  {i < 6 && <div className="text-red-500 mx-2">→</div>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 bg-black">
        <ContactForm />
      </section>

      {/* Footer */}
      {/* Bottom-right UI toggles removed as requested */}
    </div>
  )
}

export default Home
