import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Activity, Wifi, X, Shield, Brain, ArrowRight, Play, RefreshCw, Zap, Flame, Cpu as CpuIcon, Database, Lock, Unlock, Maximize2, ChevronLeft, ChevronRight, Sliders, Users, Eye, CheckSquare, FileText, Leaf } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';
import { useLocation } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center } from '@react-three/drei';

// --- 3D DIGITAL TWIN RENDERER HELPERS ---

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("3D Digital Twin Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400 font-mono text-[9px] p-4 text-center">
          <span>[ERROR_CARGA_3D]</span>
          <span className="text-white/50 mt-1">Archivo GLB inválido o corrupto.</span>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 px-2 py-0.5 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-[8px]"
          >
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const ModelRenderer = ({ url, rotationSpeed, rotate, scale, position }) => {
  const { scene } = useGLTF(url);
  const rotatingGroupRef = useRef();

  useFrame((state, delta) => {
    if (rotatingGroupRef.current && rotate) {
      // Rotation Y on the centered parent group so it spins on its own axis!
      rotatingGroupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group position={position} scale={[scale, scale, scale]}>
      <group ref={rotatingGroupRef}>
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
    </group>
  );
};

const FallbackMesh = ({ rotationSpeed, rotate, scale, position }) => {
  const rotatingGroupRef = useRef();

  useFrame((state, delta) => {
    if (rotatingGroupRef.current && rotate) {
      // Rotation Y on the centered parent group so it spins on its own axis!
      rotatingGroupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group position={position} scale={[scale, scale, scale]}>
      <group ref={rotatingGroupRef}>
        <Center>
          <mesh>
            <torusKnotGeometry args={[0.8, 0.24, 100, 16]} />
            <meshStandardMaterial 
              color="#00D2FF" 
              wireframe 
              emissive="#00D2FF" 
              emissiveIntensity={0.5} 
              roughness={0.1}
            />
          </mesh>
        </Center>
      </group>
    </group>
  );
};

const DigitalTwinViewer = ({ 
  glbUrl, 
  rotationSpeed, 
  rotate,
  scale,
  positionX,
  positionY,
  positionZ,
  gridVisible,
  lockY,
  isEditorMode, 
  onUpload, 
  onSpeedChange,
  onRotateToggle,
  onScaleChange,
  onPositionXChange,
  onPositionYChange,
  onPositionZChange,
  onGridVisibleToggle,
  onLockYToggle,
  onExpand,
  heightClass = "h-[280px]"
}) => {
  return (
    <div className="flex flex-col gap-4 w-full h-full justify-between">
      {/* Visualizer box - height customizable */}
      <div className={`relative w-full ${heightClass} bg-black/60 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center`}>
        {/* Sci-fi tech grid background inside canvas */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(0,210,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,210,255,0.2)_1px,transparent_1px)] bg-[size:12px_12px]" />
        
        <CanvasErrorBoundary>
          <Canvas camera={{ position: [0, 0, 4], fov: 45 }} className="w-full h-full cursor-grab active:cursor-grabbing">
            <ambientLight intensity={0.9} />
            <pointLight position={[10, 10, 10]} intensity={1.8} />
            <directionalLight position={[-5, 5, 5]} intensity={1.2} />
            
            <React.Suspense fallback={<FallbackMesh rotationSpeed={rotationSpeed} rotate={rotate} scale={scale} position={[positionX, positionY, positionZ]} />}>
              {glbUrl ? (
                <ModelRenderer 
                  url={glbUrl} 
                  rotationSpeed={rotationSpeed} 
                  rotate={rotate}
                  scale={scale} 
                  position={[positionX, positionY, positionZ]} 
                />
              ) : (
                <FallbackMesh rotationSpeed={rotationSpeed} rotate={rotate} scale={scale} position={[positionX, positionY, positionZ]} />
              )}
            </React.Suspense>

            {gridVisible && (
              <gridHelper args={[100, 100, '#00D2FF', '#222222']} position={[0, -1.2, 0]} />
            )}

            <OrbitControls enableZoom={true} enablePan={true} />
          </Canvas>
        </CanvasErrorBoundary>
        
        {/* Fullscreen Expand button */}
        <button
          onClick={onExpand}
          className="absolute top-4 right-4 p-1.5 bg-black/80 hover:bg-[#00D2FF]/20 border border-white/10 hover:border-[#00D2FF]/40 rounded text-white/60 hover:text-[#00D2FF] transition-all cursor-pointer z-10 flex items-center justify-center shadow-[0_0_8px_rgba(0,0,0,0.5)]"
          title="Pantalla Completa"
        >
          <Maximize2 size={10} />
        </button>
        
        {/* Futuristic corner brackets */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30" />
        
        {/* Controls indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[7px] text-white/30 tracking-widest pointer-events-none uppercase">
          Drag to Orbit • Scroll to Zoom • Right-Click + Drag to Pan
        </div>
      </div>

      {isEditorMode && (
        <div className="bg-white/[0.01] border border-white/5 rounded p-4 flex flex-col gap-4 font-mono text-[9px] w-full">
          <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
            <span className="text-[#FFD700] uppercase font-black tracking-wider text-[10px]">[ 3D_TWIN_EDITOR & CAD_ALIGNMENT ]</span>
            <div className="flex gap-2">
              <button 
                onClick={onRotateToggle}
                className={`px-2 py-0.5 border rounded text-[8px] font-bold transition-all cursor-pointer ${
                  rotate 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold' 
                    : 'border-white/10 text-white/40 hover:text-white'
                }`}
              >
                GIRAR Y: {rotate ? 'ON' : 'OFF'}
              </button>
              <button 
                onClick={onGridVisibleToggle}
                className={`px-2 py-0.5 border rounded text-[8px] font-bold transition-all cursor-pointer ${
                  gridVisible 
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                    : 'border-white/10 text-white/40 hover:text-white'
                }`}
              >
                PISO: {gridVisible ? 'ON' : 'OFF'}
              </button>
              <label className="px-2.5 py-0.5 bg-[#FFD700]/10 border border-[#FFD700]/30 hover:bg-[#FFD700]/25 rounded text-[#FFD700] transition-colors cursor-pointer font-bold">
                CARGAR GLB (.GLB)
                <input
                  type="file"
                  accept=".glb"
                  onChange={onUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-white/40">
                <span>ROTACIÓN Y:</span>
                <span className="text-cyan-400 font-bold">{rotationSpeed.toFixed(1)} rad/s</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="5.0"
                step="0.1"
                value={rotationSpeed}
                onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
                disabled={!rotate}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-white/40">
                <span>ESCALA:</span>
                <span className="text-cyan-400 font-bold">{scale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={scale}
                onChange={(e) => onScaleChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-white/40">
                <span>DESPLAZAR X:</span>
                <span className="text-cyan-400 font-bold">{positionX.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-15.0"
                max="15.0"
                step="0.05"
                value={positionX}
                onChange={(e) => onPositionXChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-white/40">
                <span className="flex items-center gap-1">
                  ELEVACIÓN Y:
                  <button 
                    onClick={onLockYToggle}
                    className={`p-0.5 rounded transition-colors cursor-pointer ${
                      lockY ? 'text-amber-400 hover:text-amber-300' : 'text-white/20 hover:text-white'
                    }`}
                    title={lockY ? "Unlock elevation" : "Lock elevation"}
                  >
                    {lockY ? <Lock size={9} /> : <Unlock size={9} />}
                  </button>
                </span>
                <span className={`${lockY ? 'text-amber-400' : 'text-cyan-400'} font-bold`}>{positionY.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-15.0"
                max="15.0"
                step="0.05"
                value={positionY}
                onChange={(e) => onPositionYChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FFD700] disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={lockY}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-white/40">
                <span>PROFUNDIDAD Z:</span>
                <span className="text-cyan-400 font-bold">{positionZ.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-15.0"
                max="15.0"
                step="0.05"
                value={positionZ}
                onChange={(e) => onPositionZChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const technologies = [
  {
    id: 'plc',
    icon: Cpu,
    title: 'AUTOMATIZACIÓN PLC & RTU',
    subtitle: 'Sistemas de tiempo real deterministas para procesos industriales críticos.',
    desc: 'Arquitecturas modulares de control en tiempo real (RTOS) con PLC de alto rendimiento y buses de campo redundantes como EtherCAT y Profinet. Garantizamos sincronización absoluta de alta velocidad, lógica de protección integrada y control preciso de actuadores en entornos demandantes.',
    telemetry: {
      unit: 'SYS_CORE // PLC_RTU_01',
      status: 'NOMINAL',
      metrics: 'TIEMPO_CICLO: 0.8ms | TASA_FALLAS: 0.0%',
      hardware: 'CPU S7-1500 REDUNDANTE'
    },
    color: '#06B6D4',
    bgClass: 'hover:border-[#06B6D4]/40 hover:shadow-[0_15px_40px_rgba(6,182,212,0.12)]',
    textClass: 'text-[#06B6D4]',
    glowClass: 'from-[#06B6D4]/20 to-transparent',
    borderClass: 'border-[#06B6D4]/20',
    number: '01',
    coverImage: '/plc_rtu_cover.png'
  },
  {
    id: 'sistemas-inteligentes',
    icon: Activity,
    title: 'SISTEMAS INTELIGENTES SCR',
    subtitle: 'El cerebro digital de la industria moderna y telemetría avanzada.',
    desc: 'Réplicas digitales interactivas en 3D que simulan el comportamiento físico e hidráulico de líneas de producción completas. Permiten realizar análisis de escenarios hipotéticos (what-if), optimizar flujos de material y diagnosticar desviaciones de forma virtual antes de realizar ajustes en el mundo real.',
    telemetry: {
      unit: 'SYS_CORE // SCR_HUB_02',
      status: 'ACTIVO',
      metrics: 'FPS: 60 | LATENCIA_RENDER: 1.5ms',
      hardware: 'RENDERER NÚCLEO WEBGL 3D'
    },
    color: '#10B981',
    bgClass: 'hover:border-[#10B981]/40 hover:shadow-[0_15px_40px_rgba(16,185,129,0.12)]',
    textClass: 'text-[#10B981]',
    glowClass: 'from-[#10B981]/20 to-transparent',
    borderClass: 'border-[#10B981]/20',
    number: '02',
    coverImage: '/scr_intelligent_cover.png'
  },
  {
    id: 'control',
    icon: Shield,
    title: 'CONTROL INDUSTRIAL DE POTENCIA',
    subtitle: 'Sistemas robustos de distribución, protección y filtrado de armónicos.',
    desc: 'Diseño e integración de tableros de control de potencia, arrancadores suaves, variadores de frecuencia y sistemas de filtrado activo de armónicos para garantizar la calidad de la energía y proteger los motores industriales.',
    telemetry: {
      unit: 'SYS_CORE // POWER_DIST_03',
      status: 'ESTABLE',
      metrics: 'THD_V: 1.8% | FACTOR_POTENCIA: 0.98',
      hardware: 'FILTRO ACTIVO DE POTENCIA 400A'
    },
    color: '#8B5CF6',
    bgClass: 'hover:border-[#8B5CF6]/40 hover:shadow-[0_15px_40px_rgba(139,92,246,0.12)]',
    textClass: 'text-[#8B5CF6]',
    glowClass: 'from-[#8B5CF6]/20 to-transparent',
    borderClass: 'border-[#8B5CF6]/20',
    number: '03',
    coverImage: '/power_dist_cover.png'
  },
  {
    id: 'ia',
    icon: Brain,
    title: 'INTELIGENCIA ARTIFICIAL APLICADA',
    subtitle: 'Algoritmos y analítica avanzada para optimizar decisiones y procesos industriales.',
    desc: 'Modelos de Inteligencia Artificial que procesan datos de visión multiespectral y cámaras de alta velocidad en el borde. Automatizamos la clasificación fina de materiales y plásticos por tipo de polímero, además de predecir fallas mecánicas en base a patrones de vibración.',
    telemetry: {
      unit: 'SYS_CORE // AI_APPLIED_04',
      status: 'APRENDIENDO',
      metrics: 'PRECISIÓN: 99.85% | INFERENCIA: 3.4ms',
      hardware: 'ACELERADOR NÚCLEO EDGE TPU'
    },
    color: '#F97316',
    bgClass: 'hover:border-[#F97316]/40 hover:shadow-[0_15px_40px_rgba(249,115,22,0.12)]',
    textClass: 'text-[#F97316]',
    glowClass: 'from-[#F97316]/20 to-transparent',
    borderClass: 'border-[#F97316]/20',
    number: '04',
    coverImage: '/ai_neural_cover.png'
  },
  {
    id: 'monitoreo',
    icon: Wifi,
    title: 'MONITOREO REMOTO & IIoT',
    subtitle: 'Conectividad segura, monitoreo en tiempo real y gestión remota desde cualquier lugar.',
    desc: 'Integración segura de Internet de las Cosas Industrial (IIoT), analítica en la nube y sensores inteligentes en tiempo real. Habilitamos la supervisión continua de indicadores clave de rendimiento (OEE), telemetría de variables operativas y monitoreo de eficiencia para un control industrial inteligente y descentralizado.',
    telemetry: {
      unit: 'SYS_CORE // REMOTE_05',
      status: 'EN LÍNEA',
      metrics: 'CARGA_SYS: 42.8% | ESTABILIDAD_CON: 100%',
      hardware: 'EDGE GATEWAY IIOT V5'
    },
    color: '#3B82F6',
    bgClass: 'hover:border-[#3B82F6]/40 hover:shadow-[0_15px_40px_rgba(59,130,246,0.12)]',
    textClass: 'text-[#3B82F6]',
    glowClass: 'from-[#3B82F6]/20 to-transparent',
    borderClass: 'border-[#3B82F6]/20',
    number: '05',
    coverImage: '/remote_monitoring_cover.png'
  },
  {
    id: 'colaborativa',
    icon: Users,
    title: 'TECNOLOGÍA COLABORATIVA & INDUSTRIA 5.0',
    subtitle: 'Arquitecturas industriales centradas en personas, potenciadas por IA y automatización colaborativa.',
    desc: 'Diseño de interfaces HMI/SCADA avanzadas y celdas de producción con robots colaborativos (Cobots) que interactúan de forma segura con los operadores para optimizar la productividad y ergonomía laboral.',
    telemetry: {
      unit: 'SYS_CORE // I5_COLLAB_06',
      status: 'CONECTADO',
      metrics: 'SENSIBILIDAD_COLISIÓN: ALTA | VELOCIDAD: 1.2 m/s',
      hardware: 'COBOT INDUSTRIAL KUKA/UR'
    },
    color: '#EAB308',
    bgClass: 'hover:border-[#EAB308]/40 hover:shadow-[0_15px_40px_rgba(234,179,8,0.12)]',
    textClass: 'text-[#EAB308]',
    glowClass: 'from-[#EAB308]/20 to-transparent',
    borderClass: 'border-[#EAB308]/20',
    number: '06',
    coverImage: '/collab_robotics_cover.png'
  }
];

const TechnologySection = () => {
  const { isEditorMode } = useCMS();
  const location = useLocation();
  const [viewMode, setViewMode] = useState('twin'); // default to 'twin' (digital twin viewer)
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [glbModels, setGlbModels] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlightedTechId, setHighlightedTechId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(1200);
  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    const timer = setTimeout(updateWidth, 150);
    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timer);
    };
  }, []);

  const [rotationSpeeds, setRotationSpeeds] = useState({
    plc: 1.2,
    'sistemas-inteligentes': 1.0,
    control: 0.8,
    monitoreo: 1.5,
    ia: 1.0,
    colaborativa: 1.0
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const foundIdx = technologies.findIndex(t => t.id === hash);
      if (foundIdx !== -1) {
        setActiveIndex(foundIdx);
        setHighlightedTechId(hash);
        setTimeout(() => {
          const cardElement = document.getElementById(hash);
          if (cardElement) {
            cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            const section = document.getElementById('tecnologia');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }, 150);
      }
    }
  }, [location.hash]);

  const [glbTransforms, setGlbTransforms] = useState({
    plc: { scale: 1.5, x: 0, y: 0, z: 0, grid: true, rotate: false, lockY: false },
    'sistemas-inteligentes': { scale: 1.5, x: 0, y: 0, z: 0, grid: true, rotate: false, lockY: false },
    control: { scale: 1.5, x: 0, y: 0, z: 0, grid: true, rotate: false, lockY: false },
    monitoreo: { scale: 1.5, x: 0, y: 0, z: 0, grid: true, rotate: false, lockY: false },
    ia: { scale: 1.5, x: 0, y: 0, z: 0, grid: true, rotate: false, lockY: false },
    colaborativa: { scale: 1.5, x: 0, y: 0, z: 0, grid: true, rotate: false, lockY: false }
  });

  const updateTransform = (key, value) => {
    if (!selectedTech) return;
    setGlbTransforms(prev => ({
      ...prev,
      [selectedTech.id]: {
        ...prev[selectedTech.id],
        [key]: value
      }
    }));
  };

  const getBtnStyle = (isActive, color) => {
    if (isActive) {
      return {
        backgroundColor: `${color}25`,
        borderColor: color,
        color: color,
        boxShadow: `0 0 10px ${color}26`,
        fontWeight: 'bold'
      };
    }
    return {
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.5)'
    };
  };

  const [selectedTech, setSelectedTech] = useState(null);
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const [diagnosticProgress, setDiagnosticProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  
  // Real-time simulated telemetry fluctuations
  const [activeTelemetry, setActiveTelemetry] = useState({
    cpu: 14.5,
    temp: 36.4,
    ping: 28,
    frequency: 60.00,
    voltage: 480
  });

  // Configurable Parameters State (Direct Simulation Variables)
  const [techParams, setTechParams] = useState({
    plc: {
      protocolo: 'Profinet',
      ciclo: 0.8,
      redundancia: 'Activa',
      seguridad: 'SIL3'
    },
    sistemas: {
      procesador: 'ARM A72',
      almacenamiento: '128 GB NVMe',
      entradas: '16 Canales',
      conectividad: '4G LTE'
    },
    control: {
      tension: '480V',
      enfriamiento: 'Líquido',
      filtrado: 'Activo',
      monitoreo: 'IR Temp'
    },
    monitoreo: {
      red: 'Starlink',
      encriptacion: 'AES-256',
      protocolos: 'MQTT',
      soporte: 'VPN Tunnel'
    },
    ia: {
      acelerador: 'Coral TPU',
      arquitectura: 'YOLOv8-Nano',
      inferencia: 3.4,
      camara: 'Sony IMX'
    },
    colaborativa: {
      seguridad: 'Activa',
      velocidad: 1.2,
      modo: 'Colaborativo',
      sensibilidad: 'Alta'
    }
  });

  // Computer Vision Simulation State
  const [confThreshold, setConfThreshold] = useState(75);
  const [isVisionGridOpen, setIsVisionGridOpen] = useState(true);
  const [sortedCounters, setSortedCounters] = useState({
    PET_BOTTLE: 14,
    ALUMINUM_CAN: 11,
    GLASS_BOTTLE: 7,
    total: 32
  });

  const [visionItems, setVisionItems] = useState([
    { id: 1, type: 'PET_BOTTLE', x: 5, y: 35, confidence: 94, speed: 0.9, label: 'Botella PET' },
    { id: 2, type: 'ALUMINUM_CAN', x: -35, y: 65, confidence: 82, speed: 0.9, label: 'Lata Aluminio' },
    { id: 3, type: 'GLASS_BOTTLE', x: -75, y: 15, confidence: 99, speed: 0.9, label: 'Envase Vidrio' }
  ]);

  // Frame ticker for dynamic graph calculations (oscilloscope and radar sweep)
  const [graphTicks, setGraphTicks] = useState(0);

  // Deterministic pseudo-random based on graphTicks to prevent high-frequency flickering of values
  const getSlowRandom = (offset) => {
    const slowTick = Math.floor(graphTicks / 45); // Updates every ~750ms (at 60fps)
    const x = Math.sin((slowTick + offset) * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  const terminalEndRef = useRef(null);

  // requestAnimationFrame hook for graphics loop
  useEffect(() => {
    let frameId;
    const renderLoop = () => {
      setGraphTicks(t => t + 1);
      frameId = requestAnimationFrame(renderLoop);
    };
    frameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Audio chirp synthesized signals
  const playBeep = (freq = 900, type = 'sine', duration = 0.05) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context blocked
    }
  };

  // Dynamic calculations for telemetry
  const getCalculatedMetrics = () => {
    if (!selectedTech) return {};

    if (selectedTech.id === 'plc') {
      const baseCpu = techParams.plc.redundancia === 'Activa' ? 32 : 18;
      const calculatedCpu = Math.min(99, +(baseCpu + (1.0 / techParams.plc.ciclo) * 12 + (getSlowRandom(1) - 0.5) * 2).toFixed(1));
      const calculatedTemp = +(34.0 + calculatedCpu * 0.38).toFixed(1);
      const calculatedPower = +(calculatedCpu * 0.85).toFixed(1);
      const jitter = +((techParams.plc.ciclo * 0.04) + (getSlowRandom(2) - 0.5) * 0.005).toFixed(3);
      const busLoad = techParams.plc.protocolo === 'Profinet' ? 42 : techParams.plc.protocolo === 'EtherCAT' ? 78 : 15;
      
      return {
        cpu: calculatedCpu,
        temp: calculatedTemp,
        power: calculatedPower,
        extraName1: 'Jitter de Ciclo',
        extraVal1: `${jitter} ms`,
        extraName2: 'Carga de Bus',
        extraVal2: `${busLoad}%`
      };
    }

    if (selectedTech.id === 'sistemas-inteligentes') {
      const cpuLoad = techParams.sistemas.procesador === 'ARM A72' ? 38.5 : techParams.sistemas.procesador === 'Intel i5' ? 14.2 : 62.0;
      const basePower = techParams.sistemas.procesador === 'ARM A72' ? 12.0 : techParams.sistemas.procesador === 'Intel i5' ? 35.0 : 4.5;
      const power = +(basePower + (getSlowRandom(3) - 0.5) * 0.8).toFixed(1);
      const temp = +(28.0 + cpuLoad * 0.42).toFixed(1);
      const channelsCount = techParams.sistemas.entradas === '16 Canales' ? 16 : 32;
      const sampleRate = channelsCount * 50;

      return {
        cpu: cpuLoad,
        temp: temp,
        power: power,
        extraName1: 'Tasa Muestreo',
        extraVal1: `${sampleRate} kS/s`,
        extraName2: 'Enlace Borde',
        extraVal2: techParams.sistemas.conectividad
      };
    }

    if (selectedTech.id === 'control') {
      const activeFilter = techParams.control.filtrado === 'Activo';
      const passiveFilter = techParams.control.filtrado === 'Pasivo';
      const thdi = activeFilter ? 3.4 : passiveFilter ? 8.2 : 18.5;
      
      const current = 148 + (getSlowRandom(4) - 0.5) * 4;
      const baseVoltage = techParams.control.tension === '480V' ? 480 : techParams.control.tension === '220V' ? 220 : 110;
      const powerKVA = +((baseVoltage * 1.732 * current) / 1000).toFixed(1);

      const coolingType = techParams.control.enfriamiento;
      const temp = coolingType === 'Líquido' ? 34.2 : coolingType === 'Aire' ? 48.6 : 65.8;

      return {
        cpu: +(current / 2.2).toFixed(1),
        temp: temp,
        power: powerKVA,
        powerUnit: 'kVA',
        extraName1: 'Distorsión THDi',
        extraVal1: `${thdi}%`,
        extraName2: 'Monitoreo Deck',
        extraVal2: techParams.control.monitoreo
      };
    }

    if (selectedTech.id === 'monitoreo') {
      const carrier = techParams.monitoreo.red;
      const latency = carrier === 'Starlink' ? 32 : carrier === 'Inmarsat' ? 680 : 54;
      const speed = carrier === 'Starlink' ? 220 : carrier === 'Inmarsat' ? 2.5 : 45;
      const loss = carrier === 'Starlink' ? 0.05 : carrier === 'Inmarsat' ? 1.4 : 0.2;

      return {
        cpu: +(10.0 + speed * 0.12).toFixed(1),
        temp: +(30.5 + speed * 0.04).toFixed(1),
        power: carrier === 'Starlink' ? 75.0 : 45.0,
        extraName1: 'Latencia Enlace',
        extraVal1: `${latency} ms`,
        extraName2: 'Tasa Pérdidas',
        extraVal2: `${loss}%`
      };
    }

    if (selectedTech.id === 'ia') {
      const fps = Math.round(250 / techParams.ia.inferencia);
      const isMedium = techParams.ia.arquitectura.includes('Medium') || techParams.ia.arquitectura.includes('Med');
      const isResNet = techParams.ia.arquitectura.includes('ResNet');
      const tflops = isResNet ? 4.2 : isMedium ? 1.85 : 0.35;

      const cpu = isResNet ? 82.4 : isMedium ? 44.2 : 12.8;
      const power = +(4.0 + tflops * 8.5 * (fps / 40)).toFixed(1);
      const temp = +(28.5 + power * 1.5).toFixed(1);
      const accuracy = isResNet ? 99.4 : isMedium ? 98.1 : 94.6;

      return {
        cpu: cpu,
        temp: temp,
        power: power,
        extraName1: 'Capacidad IA',
        extraVal1: `${tflops} TFLOPS`,
        extraName2: 'Precisión Red',
        extraVal2: `${accuracy}%`
      };
    }

    if (selectedTech.id === 'colaborativa') {
      const mode = techParams.colaborativa.modo;
      const speed = techParams.colaborativa.velocidad;
      const sensitivity = techParams.colaborativa.sensibilidad;
      const baseCpu = mode === 'Autónomo' ? 45 : mode === 'Colaborativo' ? 25 : 12;
      const cpu = +(baseCpu + speed * 15 + (getSlowRandom(5) - 0.5) * 2).toFixed(1);
      const power = +(45 + speed * 80 + (getSlowRandom(6) - 0.5) * 4).toFixed(1);
      const temp = +(26.0 + speed * 12 + (getSlowRandom(7) - 0.5) * 0.5).toFixed(1);
      const safetyLevel = sensitivity === 'Alta' ? '100% SECURE' : sensitivity === 'Media' ? '98.5% STABLE' : '92.0% WARN';

      return {
        cpu: cpu,
        temp: temp,
        power: power,
        extraName1: 'Seguridad',
        extraVal1: safetyLevel,
        extraName2: 'Velocidad Cobot',
        extraVal2: `${speed.toFixed(1)} m/s`
      };
    }

    return {};
  };

  // Fluctuating values loop
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTelemetry(prev => ({
        cpu: +(prev.cpu + (Math.random() - 0.5) * 1.8).toFixed(1),
        temp: +(prev.temp + (Math.random() - 0.5) * 0.3).toFixed(1),
        ping: Math.max(15, Math.min(120, Math.round(prev.ping + (Math.random() - 0.5) * 3))),
        frequency: +(prev.frequency + (Math.random() - 0.5) * 0.04).toFixed(2),
        voltage: Math.round(prev.voltage + (Math.random() - 0.5) * 2)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Computer Vision Engine Simulation Loop
  useEffect(() => {
    if (!selectedTech || selectedTech.id !== 'ia' || isDiagnosticRunning) return;
    
    const fps = Math.round(250 / techParams.ia.inferencia);
    
    const interval = setInterval(() => {
      setVisionItems(prev => prev.map(item => {
        let newX = item.x + item.speed * (15 / fps); 
        let newConf = item.confidence;
        
        if (Math.random() > 0.85) {
          newConf = Math.min(100, Math.max(40, item.confidence + Math.round((Math.random() - 0.5) * 6)));
        }

        if (newX > 105) {
          if (newConf >= confThreshold) {
            setSortedCounters(c => ({
              ...c,
              [item.type]: c[item.type] + 1,
              total: c.total + 1
            }));
            setLogs(l => [...l, `[AI_SORT] Classified ${item.type} (Conf: ${newConf}%) -> Actuator Triggered.`]);
          } else {
            setLogs(l => [...l, `[REJECT] Object below threshold (${newConf}% < ${confThreshold}%). Diverted to reject lane.`]);
          }
          
          return {
            ...item,
            x: -25 - Math.random() * 35,
            confidence: Math.round(65 + Math.random() * 34)
          };
        }
        
        return { ...item, x: newX, confidence: newConf };
      }));
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [selectedTech, techParams.ia.inferencia, confThreshold, isDiagnosticRunning]);

  // Generate dynamic path for high fidelity oscilloscope
  const generateWaveformPath = () => {
    const width = 200;
    const height = 80;
    const midY = height / 2;
    const points = [];

    // Default waveform properties
    let freq = 0.12;
    let amp = 18;
    let noiseLevel = 0.6;

    if (selectedTech) {
      if (selectedTech.id === 'plc') {
        // Lower cycle time = tighter frequency
        freq = 0.08 / techParams.plc.ciclo;
        noiseLevel = techParams.plc.redundancia === 'Inactiva' ? 2.8 : 0.3;
      } else if (selectedTech.id === 'control') {
        // Voltage governs amplitude
        amp = techParams.control.tension === '480V' ? 28 : techParams.control.tension === '220V' ? 16 : 9;
        const filter = techParams.control.filtrado;
        // No filter adds huge jagged noise spikes
        noiseLevel = filter === 'Ninguno' ? 6.2 : filter === 'Pasivo' ? 2.4 : 0.3;
      } else if (selectedTech.id === 'sistemas-inteligentes') {
        freq = techParams.sistemas.procesador === 'Intel i5' ? 0.30 : 0.16;
        noiseLevel = 0.5;
      } else if (selectedTech.id === 'monitoreo') {
        const carrier = techParams.monitoreo.red;
        amp = carrier === 'Inmarsat' ? 7 : 20;
        noiseLevel = carrier === 'Inmarsat' ? 4.8 : 0.7;
      }
    }

    for (let x = 0; x <= width; x += 1.5) {
      const angle = (x + graphTicks * 3) * freq;
      // Base sine wave + second harmonic
      let y = Math.sin(angle) * amp + Math.sin(angle * 2.2) * (amp * 0.18);
      
      // Inject random spike noise
      const spike = (Math.random() - 0.5) * noiseLevel;
      y += spike;

      points.push(`${x},${midY + y}`);
    }

    return `M ${points.join(' L ')}`;
  };

  // Generate dynamic sparkline path for realtime measurements dashboard
  const generateSparklinePath = (seed, amplitude) => {
    const points = [];
    for (let i = 0; i <= 12; i++) {
      const x = i * 8.5;
      const y = 10 + Math.sin(graphTicks * 0.15 + i + seed) * amplitude + (Math.random() - 0.5) * 0.4;
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return `M ${points.join(' L ')}`;
  };

  // Radar points and coordinate parameters
  const radarTargets = [
    { angle: 45, radius: 36, type: 'PET' },
    { angle: 165, radius: 24, type: 'CAN' },
    { angle: 280, radius: 46, type: 'GLASS' }
  ];

  // Get radar target sweeps opacity dynamically
  const getRadarTargetOpacity = (targetAngle) => {
    const sweepAngle = (graphTicks * 2.0) % 360;
    let diff = sweepAngle - targetAngle;
    if (diff < 0) diff += 360;

    // Sweeping fade out decay window
    if (diff < 90) {
      return +(1.0 - diff / 90).toFixed(2);
    }
    return 0.04;
  };

  // Graphic vectors for AI object classification simulation
  const renderItemGraphic = (type, color) => {
    if (type === 'ALUMINUM_CAN') {
      return (
        <svg viewBox="0 0 32 48" className="w-8 h-10 overflow-visible">
          <defs>
            <linearGradient id="canBodyGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4A4A4A" />
              <stop offset="25%" stopColor="#9B9B9B" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="75%" stopColor="#6C6C6C" />
              <stop offset="100%" stopColor="#2D2D2D" />
            </linearGradient>
            <linearGradient id="canAccGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E65100" />
              <stop offset="50%" stopColor="#FFB74D" />
              <stop offset="100%" stopColor="#F57C00" />
            </linearGradient>
          </defs>
          <ellipse cx="16" cy="4" rx="10" ry="2" fill="#757575" stroke="#BDBDBD" strokeWidth="0.5" />
          <ellipse cx="16" cy="4" rx="7" ry="1" fill="#424242" />
          <path d="M6,4 C6,5 10,6 16,6 C22,6 26,5 26,4 L26,42 C26,43 22,44 16,44 C10,44 6,43 6,42 Z" fill="url(#canBodyGrad)" />
          <path d="M6,12 C6,13 10,14 16,14 C22,14 26,13 26,12 L26,34 C26,35 22,36 16,36 C10,36 6,35 6,34 Z" fill="url(#canAccGrad)" opacity="0.85" />
          <line x1="6" y1="18" x2="26" y2="18" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.2" />
          <line x1="6" y1="28" x2="26" y2="28" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.2" />
          <rect x="13" y="4" width="3" height="40" fill="#FFFFFF" opacity="0.45" />
          <path d="M6,42 C6,43 10,44 16,44 C22,44 26,43 26,42 C26,43.5 22,44.5 16,44.5 C10,44.5 6,43.5 6,42 Z" fill="#757575" />
        </svg>
      );
    }
    
    if (type === 'PET_BOTTLE') {
      return (
        <svg viewBox="0 0 32 48" className="w-8 h-10 overflow-visible">
          <defs>
            <linearGradient id="petGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(34, 211, 238, 0.3)" />
              <stop offset="35%" stopColor="rgba(34, 211, 238, 0.7)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.9)" />
              <stop offset="75%" stopColor="rgba(14, 165, 233, 0.6)" />
              <stop offset="100%" stopColor="rgba(3, 105, 161, 0.3)" />
            </linearGradient>
            <linearGradient id="petCap" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          <rect x="13" y="1" width="6" height="3" rx="0.5" fill="url(#petCap)" />
          <path d="M13.5,4 L13.5,8 L18.5,8 L18.5,4 Z" fill="url(#petGrad)" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="0.5" />
          <path d="M13.5,8 C11,10 9,12 9,15 L9,43 C9,44.5 12,45 16,45 C20,45 23,44.5 23,43 L23,15 C23,12 21,10 18.5,8 Z" fill="url(#petGrad)" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="0.5" />
          <rect x="9.5" y="22" width="13" height="8" fill="#0284C7" opacity="0.8" rx="0.5" />
          <line x1="10" y1="34" x2="22" y2="34" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          <line x1="10" y1="38" x2="22" y2="38" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          <rect x="15" y="8" width="1.5" height="35" fill="#FFFFFF" opacity="0.4" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 32 48" className="w-8 h-10 overflow-visible">
        <defs>
          <linearGradient id="glassBodyGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
            <stop offset="30%" stopColor="rgba(52, 211, 153, 0.6)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.85)" />
            <stop offset="70%" stopColor="rgba(16, 185, 129, 0.5)" />
            <stop offset="100%" stopColor="rgba(4, 120, 87, 0.3)" />
          </linearGradient>
        </defs>
        <rect x="14" y="1" width="4" height="2.5" rx="0.5" fill="#FBBF24" />
        <path d="M14.5,3.5 L14.5,15 L17.5,15 L17.5,3.5 Z" fill="url(#glassBodyGrad)" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="0.5" />
        <path d="M14.5,15 C11,18 10,20 10,23 L10,43 C10,45 12,45.5 16,45.5 C20,45.5 22,45 22,43 L22,23 C22,20 21,18 17.5,15 Z" fill="url(#glassBodyGrad)" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="0.5" />
        <path d="M10.5,29 L10.5,42.5 C10.5,44 12,44.5 16,44.5 C20,44.5 21.5,44 21.5,42.5 L21.5,29 Z" fill="rgba(4, 120, 87, 0.6)" />
        <rect x="15.2" y="3.5" width="1.2" height="41" fill="#FFFFFF" opacity="0.45" />
      </svg>
    );
  };

  // Render bi-color title splitting at space or ampersand
  const renderBiColorTitle = (title) => {
    if (!title) return '';
    if (title.includes(' & ')) {
      const parts = title.split(' & ');
      return (
        <>
          {parts[0]} <span className="text-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,0.2)]">& {parts[1]}</span>
        </>
      );
    }
    const words = title.split(' ');
    if (words.length > 1) {
      const lastWord = words.pop();
      return (
        <>
          {words.join(' ')} <span className="text-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,0.2)]">{lastWord}</span>
        </>
      );
    }
    return title;
  };

  // Update configuration parameters and print outputs
  const updateParam = (techId, key, value) => {
    setTechParams(prev => {
      const updated = {
        ...prev,
        [techId]: {
          ...prev[techId],
          [key]: value
        }
      };

      let logMsg = `[CONFIG] Parámetro '${key.toUpperCase()}' ajustado a '${value}'`;
      
      // Respuestas dinámicas contextuales
      if (key === 'redundancia') {
        if (value === 'Inactiva') {
          logMsg = `[WARNING] Redundancia Hot-Standby primaria desactivada. Sistema operando en modo degradado.`;
        } else {
          logMsg = `[OK] Núcleo del controlador secundario sincronizado. Estado de redundancia: ACTIVO.`;
        }
      } else if (key === 'ciclo') {
        logMsg = `[SYSTEM] Ciclo de reloj RTOS establecido en ${value}ms. Interrupciones de hardware actualizadas.`;
      } else if (key === 'protocolo') {
        logMsg = `[BUS] Protocolo cambiado a ${value}. Reinicializando topología de red fieldbus...`;
      } else if (key === 'inferencia') {
        logMsg = `[AI_ENGINE] Latencia de inferencia del modelo Edge TPU ajustada a ${value}ms. Ajustando FPS en tiempo real.`;
      } else if (key === 'acelerador') {
        logMsg = `[HARDWARE] Coprocesador cambiado a ${value}. Actualizando pesos neuronales.`;
      } else if (key === 'filtrado') {
        logMsg = `[POWER] Filtro de armónicos configurado a ${value}. Parámetros de filtrado activo cargados.`;
      } else if (key === 'red') {
        logMsg = `[UPLINK] Proveedor de red cambiado a ${value}. Alineando antena de telemetría.`;
      } else if (key === 'encriptacion') {
        logMsg = `[SECURITY] Cifrado de flujo cambiado a ${value}. Regenerando claves de sesión.`;
      }

      setLogs(l => [...l, logMsg]);
      return updated;
    });
  };

  // Run diagnostics sequence
  const runDiagnostic = () => {
    if (isDiagnosticRunning) return;
    setIsDiagnosticRunning(true);
    setDiagnosticProgress(0);
    setLogs([`[INICIALIZANDO] Secuencia de protocolo de diagnóstico iniciada...`]);

    const steps = [
      'Estableciendo handshake seguro del túnel TLS...',
      'Mapeando pesos de los nodos de la red neuronal...',
      'Verificando ciclos redundantes PLC Hot-Standby...',
      'Midiendo balance de fases y estabilidad de voltaje...',
      'Comprobación de portadora a ruido de Satcom completada...',
      'Calibrando ciclos de reloj RTOS y vectores de interrupción...',
      'Diagnóstico completado. Sistemas totalmente operativos.'
    ];

    let currentStep = 0;
    const progressTimer = setInterval(() => {
      setDiagnosticProgress(prev => {
        const nextProgress = prev + 4;
        if (nextProgress >= 100) {
          clearInterval(progressTimer);
          setIsDiagnosticRunning(false);
          setLogs(l => [...l, `[SUCCESS] ${steps[steps.length - 1]}`]);
          return 100;
        }
        
        if (nextProgress % 16 === 0 && currentStep < steps.length - 1) {
          setLogs(l => [...l, `[OK] ${steps[currentStep]}`]);
          currentStep++;
        }
        
        return nextProgress;
      });
    }, 120);
  };

  // Scroll to bottom of terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Handle scroll lock when modal is open
  useEffect(() => {
    if (selectedTech) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedTech]);

  // Clear logs when selected technology changes to prevent cross-contamination
  useEffect(() => {
    setLogs([]);
  }, [selectedTech]);

  // Simulation Loop for Non-AI technology logs
  useEffect(() => {
    if (!selectedTech || selectedTech.id === 'ia' || isDiagnosticRunning) return;

    const interval = setInterval(() => {
      let logMsg = '';
      const rand = Math.random();

      if (selectedTech.id === 'plc') {
        const plcMsgs = [
          `[PLC] Tiempo de ejecución del ciclo: ${(techParams.plc.ciclo * 1.0 + (Math.random() - 0.5) * 0.05).toFixed(2)}ms (Estable)`,
          `[BUS] Comprobación de comunicación IO-Device ${techParams.plc.protocolo}: OK`,
          `[RTOS] Jitter del planificador de hilos: ${(0.003 + Math.random() * 0.001).toFixed(4)}ms`,
          `[PLC] Estado del enlace Hot-Standby redundante: ${techParams.plc.redundancia === 'Activa' ? 'SINCRONIZADO' : 'DEGRADADO'}`,
          `[PLC] Escaneo de E/S completado. Entradas: 128, Salidas: 64`
        ];
        logMsg = plcMsgs[Math.floor(rand * plcMsgs.length)];
      } else if (selectedTech.id === 'control') {
        const activeFilter = techParams.control.filtrado === 'Activo';
        const passiveFilter = techParams.control.filtrado === 'Pasivo';
        const thdi = activeFilter ? 3.4 : passiveFilter ? 8.2 : 18.5;
        
        const controlMsgs = [
          `[POWER] Balance de corriente de línea trifásica: ${(99.5 + Math.random() * 0.4).toFixed(1)}%`,
          `[HARMONICS] Atenuación del filtro activo: -${activeFilter ? 42 : passiveFilter ? 22 : 0}dB THDi (${thdi}% medido)`,
          `[THERMAL] Disipación térmica de la cubierta del tiristor: nominal (${techParams.control.enfriamiento === 'Líquido' ? '34.2' : techParams.control.enfriamiento === 'Aire' ? '48.6' : '65.8'}°C)`,
          `[GRID] Bloqueo de fase de referencia de voltaje: ESTABLE (${techParams.control.tension})`,
          `[POWER] Temperatura del disyuntor principal: ${(42.5 + Math.random() * 1.5).toFixed(1)}°C`
        ];
        logMsg = controlMsgs[Math.floor(rand * controlMsgs.length)];
      } else if (selectedTech.id === 'sistemas-inteligentes') {
        const sisMsgs = [
          `[SYS] Carga de CPU Core: ${(techParams.sistemas.procesador === 'ARM A72' ? 38 : techParams.sistemas.procesador === 'Intel i5' ? 14 : 62)}% (nominal)`,
          `[TELEMETRY] Escaneando ${techParams.sistemas.entradas} a 100kS/s`,
          `[UPLINK] Estado de transmisión MQTT: ${techParams.sistemas.conectividad.toUpperCase()} - CONECTADO`,
          `[SYS] Gestor de tareas RTOS: 24 tareas activas ejecutándose`,
          `[SYS] Tasa de escritura en disco: 1.2 MB/s. Rotación de logs activa`
        ];
        logMsg = sisMsgs[Math.floor(rand * sisMsgs.length)];
      } else if (selectedTech.id === 'monitoreo') {
        const monMsgs = [
          `[SATCOM] Estado del enlace de datos: ${techParams.monitoreo.red.toUpperCase()} (latencia: ${techParams.monitoreo.red === 'Starlink' ? '28ms' : techParams.monitoreo.red === 'Cellular' ? '54ms' : '680ms'})`,
          `[UPLINK] Paquete de carga útil enviado usando cifrado ${techParams.monitoreo.encriptacion}`,
          `[SECURITY] Handshake keepalive del túnel VPN: OK`,
          `[IIOT] Ciclo de consulta Modbus/TCP: 100ms. 48 registros escaneados`,
          `[UPLINK] Fuerza de señal: ${techParams.monitoreo.red === 'Starlink' ? '-54' : techParams.monitoreo.red === 'Cellular' ? '-72' : '-115'} dBm`
        ];
        logMsg = monMsgs[Math.floor(rand * monMsgs.length)];
      } else if (selectedTech.id === 'colaborativa') {
        const cobotMsgs = [
          `[COBOT] Distancia de seguridad de la burbuja: ${(1.2 + Math.random() * 1.5).toFixed(2)}m (Campo seguro)`,
          `[COBOT] Retroalimentación del bucle de corriente de juntas 1-6: estable`,
          `[RADAR] Estado del campo del escáner de seguridad: ${techParams.colaborativa.sensibilidad === 'Alta' ? 'MÁXIMA_SEGURIDAD' : techParams.colaborativa.sensibilidad === 'Media' ? 'ESTÁNDAR' : 'BAJA_SENSIBILIDAD'}`,
          `[COBOT] Velocidad objetivo limitada a ${techParams.colaborativa.velocidad.toFixed(1)} m/s (Modo: ${techParams.colaborativa.modo})`,
          `[COBOT] Vectores de fuerza cartesiana dentro de límites (< 150 N)`
        ];
        logMsg = cobotMsgs[Math.floor(rand * cobotMsgs.length)];
      }

      if (logMsg) {
        setLogs(l => {
          const truncated = l.length > 40 ? l.slice(l.length - 40) : l;
          return [...truncated, logMsg];
        });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [selectedTech, techParams, isDiagnosticRunning]);

  // Check if system is degraded
  const isSystemDegraded = () => {
    return techParams.plc.redundancia === 'Inactiva';
  };

  const calculatedMetrics = getCalculatedMetrics();

  const renderControlModalContent = () => {
    if (!selectedTech) return null;
    return (
      <>
        {/* Monospace Telemetry Header */}
        <div className="font-['Poppins'] text-[10px] text-white/30 uppercase tracking-widest mb-2.5 flex flex-wrap items-center justify-between border-b border-white/10 pb-2.5 gap-2">
          <div className="flex items-center gap-3">
            <span className="text-[#8B5CF6] font-bold">HUD_TACTICAL_DISPLAY //</span>
            <span className="font-bold">SYS_CORE // POWER_DIST_03</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
            <span className="font-bold text-[#10B981] border border-[#10B981]/30 rounded px-2 py-0.5 text-[8px] bg-[#10B981]/10">CORE_STATE: ESTABLE</span>
          </div>
        </div>

        {/* Top Row Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-3">
          {/* Left Box: Info + Cabinet render */}
          <div className="lg:col-span-7 border border-[#8B5CF6]/20 rounded-xl p-3.5 bg-black/40 relative flex justify-between gap-4">
            <div className="flex-grow max-w-[68%] flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-['Poppins'] text-[8px] font-black px-2 py-0.5 rounded bg-[#8B5CF6] text-white uppercase tracking-wider">
                  UL-508A
                </span>
                <span className="font-['Poppins'] text-[8px] font-black text-white/60 uppercase tracking-wider">
                  MULTI-BUS BAR
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-2 font-['Poppins']">
                CONTROL INDUSTRIAL DE <span className="text-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,0.2)]">POTENCIA</span>
              </h3>
              <p className="text-[9.5px] text-white/60 leading-normal font-['Poppins'] text-justify">
                {selectedTech.desc}
              </p>
            </div>
            <div className="w-[28%] flex items-center justify-center select-none pointer-events-none self-center">
              <img 
                src="/power_dist_cover.png" 
                alt="Industrial Cabinet" 
                className="max-h-[95px] object-contain mix-blend-screen opacity-90 filter drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              />
            </div>
          </div>

          {/* Right Box: Adjustable Parameters */}
          <div className="lg:col-span-5 border border-[#8B5CF6]/20 rounded-xl p-3.5 bg-black/30 flex flex-col justify-between">
            <h4 className="font-['Poppins'] text-[9px] font-black text-white/40 uppercase tracking-widest mb-2 pb-1 border-b border-white/5 flex items-center gap-1.5">
              <Sliders size={11} className="text-[#8B5CF6]" /> PARÁMETROS AJUSTABLES DEL SISTEMA
            </h4>
            
            <div className="flex flex-col gap-2 justify-center flex-grow">
              {/* Param 1: Tensión de red */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 min-w-[120px]">
                  <div className="w-5 h-5 rounded bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
                    <Zap size={10} className="text-[#8B5CF6]" />
                  </div>
                  <span className="font-['Poppins'] font-bold text-white/45 uppercase text-[8px]">Tensión de Red</span>
                </div>
                <div className="flex gap-1.5 flex-grow max-w-[220px]">
                  {['480V', '220V', '110V'].map((volt) => (
                    <button
                      key={volt}
                      onClick={() => {
                        playBeep(850, 'sine', 0.05);
                        updateParam('control', 'tension', volt);
                      }}
                      className="flex-1 py-1 rounded font-['Poppins'] font-bold text-[8px] tracking-wider border transition-all cursor-pointer"
                      style={getBtnStyle(techParams.control.tension === volt, '#8B5CF6')}
                    >
                      {volt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Param 2: Filtro de Armónicos */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 min-w-[120px]">
                  <div className="w-5 h-5 rounded bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
                    <Activity size={10} className="text-[#8B5CF6]" />
                  </div>
                  <span className="font-['Poppins'] font-bold text-white/45 uppercase text-[8px]">Filtro de Armónicos</span>
                </div>
                <div className="flex gap-1.5 flex-grow max-w-[220px]">
                  {['Activo', 'Pasivo', 'Ninguno'].map((filt) => (
                    <button
                      key={filt}
                      onClick={() => {
                        playBeep(800, 'sine', 0.05);
                        updateParam('control', 'filtrado', filt);
                      }}
                      className="flex-1 py-1 rounded font-['Poppins'] font-bold text-[8px] tracking-wider border transition-all cursor-pointer"
                      style={getBtnStyle(techParams.control.filtrado === filt, '#8B5CF6')}
                    >
                      {filt.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Param 3: Enfriamiento de Gabinete */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 min-w-[120px]">
                  <div className="w-5 h-5 rounded bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
                    <Flame size={10} className="text-[#8B5CF6]" />
                  </div>
                  <span className="font-['Poppins'] font-bold text-white/45 uppercase text-[8px]">Enfriamiento de GABINETE</span>
                </div>
                <div className="flex gap-1.5 flex-grow max-w-[220px]">
                  {['Líquido', 'Aire', 'Convección'].map((cool) => (
                    <button
                      key={cool}
                      onClick={() => {
                        playBeep(800, 'sine', 0.05);
                        updateParam('control', 'enfriamiento', cool);
                      }}
                      className="flex-1 py-1 rounded font-['Poppins'] font-bold text-[8px] tracking-wider border transition-all cursor-pointer"
                      style={getBtnStyle(techParams.control.enfriamiento === cool, '#8B5CF6')}
                    >
                      {cool.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Middle Row Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-3">
          {/* Left Box: Oscilloscope */}
          <div className="lg:col-span-7 border border-[#8B5CF6]/20 rounded-xl p-3.5 bg-black/40 flex flex-col justify-between gap-2">
            <div className="w-full font-['Poppins'] font-bold text-[8px] border-b border-white/5 pb-2 flex justify-between items-center text-white/30 tracking-widest uppercase">
              <span className="flex items-center gap-1 text-[#8B5CF6]">
                <Activity size={11} /> FASE HARMÓNICOS - OSCILOSCOPIO
              </span>
              <span className="flex items-center gap-1.5">
                ESTADO: <span className="text-[#10B981] font-bold">ACTIVO</span> | ENLACE: <span className="text-[#10B981] font-bold">SEGURO</span> <Lock size={9} className="text-[#10B981]" />
              </span>
            </div>
            
            {/* RIGEL OSCILLOSCOPE Graph */}
            <div className="flex-grow w-full bg-black/50 border border-white/5 rounded-lg p-2.5 relative h-[125px] flex flex-col justify-between">
              <div className="flex justify-between items-center text-[7px] text-white/30 uppercase tracking-widest mb-0.5">
                <span className="font-['Poppins'] font-bold">RIGEL OSCILLOSCOPE // <span className="text-[#8B5CF6]">ALINEACIÓN DE FASES</span></span>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]"></span> FASE A</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#EC4899]"></span> FASE B</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]"></span> FASE C</span>
                </div>
              </div>
              
              {/* SVG Sine Wave Canvas */}
              <div className="flex-grow w-full relative overflow-hidden h-[75px] flex items-center justify-center">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[size:10px_10px] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]" />
                
                <div className="absolute left-1 top-1 bottom-1 flex flex-col justify-between text-[5px] text-white/20 font-mono pointer-events-none select-none">
                  <span>400V</span>
                  <span>200V</span>
                  <span>0V</span>
                  <span>-200V</span>
                  <span>-400V</span>
                </div>
                
                <div className="absolute bottom-1 left-8 right-2 flex justify-between text-[5px] text-white/20 font-mono pointer-events-none select-none">
                  <span>0ms</span>
                  <span>10ms</span>
                  <span>20ms</span>
                </div>

                <svg className="w-full h-full overflow-visible px-8" viewBox="0 0 300 75">
                  {Array.from({ length: 3 }).map((_, idx) => {
                    const phaseOffset = idx * (Math.PI * 2 / 3);
                    const amp = techParams.control.tension === '480V' ? 24 : techParams.control.tension === '220V' ? 14 : 8;
                    const filter = techParams.control.filtrado;
                    const noiseLevel = filter === 'Ninguno' ? 5.0 : filter === 'Pasivo' ? 1.8 : 0.2;
                    const freq = 0.05;
                    const points = [];
                    
                    const phaseColor = idx === 0 ? '#EAB308' : idx === 1 ? '#EC4899' : '#22D3EE';
                    
                    // Simular desfases e inestabilidad de fase realista (cada onda se desplaza de forma independiente)
                    let speedFactor = 3.5;
                    let driftAngle = 0;
                    
                    if (idx === 0) {
                      speedFactor = 3.2;
                      driftAngle = Math.sin(graphTicks * 0.015) * 0.2;
                    } else if (idx === 1) {
                      speedFactor = 3.8;
                      driftAngle = Math.cos(graphTicks * 0.012) * 0.25;
                    } else {
                      speedFactor = 2.9;
                      driftAngle = Math.sin(graphTicks * 0.02) * 0.15;
                    }
                    
                    for (let x = 0; x <= 260; x += 3) {
                      const angle = (x + graphTicks * speedFactor) * freq + phaseOffset + driftAngle;
                      let y = Math.sin(angle) * amp;
                      
                      if (filter !== 'Activo') {
                        y += Math.sin(angle * 3) * (amp * (filter === 'Ninguno' ? 0.35 : 0.12));
                        y += Math.sin(angle * 5) * (amp * (filter === 'Ninguno' ? 0.20 : 0.06));
                      }
                      
                      const spike = (Math.random() - 0.5) * noiseLevel;
                      y += spike;
                      
                      points.push(`${x},${37.5 + y}`);
                    }
                    
                    return (
                      <path 
                        key={idx}
                        d={`M ${points.join(' L ')}`}
                        fill="none"
                        stroke={phaseColor}
                        strokeWidth="1.2"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* 3 Readout Metrics Box */}
            <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-1.5">
              <div className="flex flex-col items-center justify-center text-center">
                <span className="font-['Poppins'] font-bold text-[7px] text-white/30 uppercase tracking-widest mb-0.5">
                  THD (DISTORSIÓN)
                </span>
                <span className="font-['Poppins'] font-black text-xs text-[#8B5CF6]">
                  {techParams.control.filtrado === 'Activo' ? '1.2%' : techParams.control.filtrado === 'Pasivo' ? '4.8%' : '14.5%'}
                </span>
              </div>
              
              <div className="flex flex-col items-center justify-center text-center border-l border-r border-white/5 px-2">
                <span className="font-['Poppins'] font-bold text-[7px] text-white/30 uppercase tracking-widest mb-0.5">
                  FACTOR DE POTENCIA
                </span>
                <span className="font-['Poppins'] font-black text-xs text-[#EAB308]">
                  {techParams.control.filtrado === 'Activo' ? '0.99' : techParams.control.filtrado === 'Pasivo' ? '0.94' : '0.82'}
                </span>
              </div>
              
              <div className="flex flex-col items-center justify-center text-center">
                <span className="font-['Poppins'] font-bold text-[7px] text-white/30 uppercase tracking-widest mb-0.5">
                  VELOCIDAD ENFRIAMIENTO
                </span>
                <span className="font-['Poppins'] font-black text-xs text-[#8B5CF6]">
                  {techParams.control.enfriamiento === 'Líquido' ? '450 RPM' : techParams.control.enfriamiento === 'Aire' ? '820 RPM' : '0 RPM'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Box: Live Logs */}
          <div className="lg:col-span-5 border border-[#8B5CF6]/20 rounded-xl p-3.5 bg-black/40 flex flex-col justify-between gap-2">
            <div className="w-full font-['Poppins'] font-bold text-[8px] border-b border-white/5 pb-2 flex justify-between items-center text-white/30 tracking-widest uppercase">
              <span className="flex items-center gap-1.5 text-[#8B5CF6]">
                <FileText size={11} /> REGISTROS DEL SISTEMA EN VIVO
              </span>
              {isDiagnosticRunning && (
                <span className="text-[#FFD700] animate-pulse flex items-center gap-1">
                  <RefreshCw size={9} className="animate-spin" /> {diagnosticProgress}%
                </span>
              )}
            </div>
            
            {/* Logs Screen */}
            <div className="w-full h-[135px] bg-black/70 border border-white/5 rounded-lg p-2.5 font-mono text-[9px] text-emerald-400 overflow-y-auto leading-relaxed scrollbar-none shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] flex-grow">
              {logs.length === 0 ? (
                <>
                  <div className="text-white/20 flex gap-2">
                    <span className="text-white/35">10:24:40</span> <span>[INFO] Todos los parámetros dentro de rango óptimo.</span>
                  </div>
                  <div className="text-[#10B981] flex gap-2 font-bold mt-1">
                    <span className="text-white/35">10:24:42</span> <span>[SYSTEM] Estado del sistema: ESTABLE.</span>
                  </div>
                </>
              ) : (
                logs.map((log, lIdx) => {
                  const timeStr = new Date(Date.now() - (logs.length - 1 - lIdx) * 2500).toLocaleTimeString('es-ES');
                  
                  let displayLog = log;
                  if (log.includes('[AI_SORT]')) {
                    displayLog = log.replace('[AI_SORT] Classified PET_BOTTLE', '[AI_SORT] Clasificación PET_BOTTLE')
                                    .replace('Actuator Triggered.', 'Actuador activado.');
                  } else if (log.includes('[REJECT]')) {
                    displayLog = log.replace('[REJECT] Object below threshold', '[REJECT] Objeto por debajo de umbral')
                                    .replace('Diverted to reject lane.', 'Desviado al carril de rechazo.');
                  } else if (log.includes('Diagnostic complete.')) {
                    displayLog = `[OK] Diagnóstico completo. Sistema totalmente operativo.`;
                  } else if (log.includes('[SUCCESS]')) {
                    displayLog = log.replace('[SUCCESS] Diagnostic complete. Systems fully operational.', '[SYSTEM] Estado del sistema: EXCELENTE.');
                  } else if (log.includes('[INITIALIZING]')) {
                    displayLog = `[INICIANDO] Secuencia de protocolo de diagnóstico iniciada...`;
                  } else if (log.includes('[POWER] Three-phase line current balance')) {
                    displayLog = log.replace('[POWER] Three-phase line current balance', '[SISTEMA] Balance de corriente trifásica');
                  } else if (log.includes('[HARMONICS] Active filter attenuation')) {
                    displayLog = log.replace('[HARMONICS] Active filter attenuation', '[FILTRO] Atenuación del filtro activo')
                                    .replace('measured', 'medido');
                  } else if (log.includes('[THERMAL] Thyristor deck heat dissipation')) {
                    displayLog = log.replace('[THERMAL] Thyristor deck heat dissipation', '[TÉRMICO] Disipación del deck de tiristores');
                  } else if (log.includes('[GRID] Voltage reference phase lock')) {
                    displayLog = log.replace('[GRID] Voltage reference phase lock', '[RED] Bloqueo de fase de voltaje');
                  } else if (log.includes('[POWER] Main circuit breaker temperature')) {
                    displayLog = log.replace('[POWER] Main circuit breaker temperature', '[TÉRMICO] Temp de interruptor principal');
                  }

                  return (
                    <div 
                      key={lIdx} 
                      className={
                        displayLog.includes('[OK]') || displayLog.includes('[SYSTEM]') 
                          ? 'text-cyan-400 font-bold flex gap-2' 
                          : displayLog.includes('[WARNING]') || displayLog.includes('[REJECT]') 
                          ? 'text-[#FFD700] animate-pulse font-bold flex gap-2' 
                          : 'text-emerald-400/90 flex gap-2'
                      }
                    >
                      <span className="text-white/35">{timeStr}</span> <span>{displayLog}</span>
                    </div>
                  );
                })
              )}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>

        {/* Bottom Row Grid: Mediciones Físicas */}
        <div className="border border-[#8B5CF6]/20 rounded-xl p-3 bg-black/40 mb-3">
          <h4 className="font-['Poppins'] text-[8px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5 text-[#8B5CF6]">
            <Activity size={11} /> MEDICIONES FÍSICAS EN TIEMPO REAL
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {/* Card 1: Voltaje Línea-Línea */}
            <div className="flex flex-col justify-between gap-0.5 bg-black/30 border border-white/5 rounded-lg p-2 min-h-[58px]">
              <div className="flex items-center justify-between text-[7px] text-white/40 uppercase tracking-widest font-['Poppins'] font-bold">
                <span>VOLTAJE LÍNEA-LÍNEA</span>
                <div className="w-3.5 h-3.5 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] text-[7px] font-black">
                  V
                </div>
              </div>
              <span className="font-['Poppins'] font-black text-xs text-white my-0.5">
                {(techParams.control.tension === '480V' ? 478.6 : techParams.control.tension === '220V' ? 218.4 : 109.2).toFixed(1)} V <span className="text-[7px] text-white/45 font-mono">RMS</span>
              </span>
              <svg className="w-full h-2.5 opacity-40 overflow-visible" viewBox="0 0 100 10">
                <path 
                  d={`M 0,5 Q 25,${3 + Math.sin(graphTicks * 0.1) * 2} 50,5 T 100,5`} 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="1" 
                />
              </svg>
            </div>

            {/* Card 2: Corriente Total */}
            <div className="flex flex-col justify-between gap-0.5 bg-black/30 border border-white/5 rounded-lg p-2 min-h-[58px]">
              <div className="flex items-center justify-between text-[7px] text-white/40 uppercase tracking-widest font-['Poppins'] font-bold">
                <span>CORRIENTE TOTAL</span>
                <div className="w-3.5 h-3.5 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] text-[7px] font-black">
                  A
                </div>
              </div>
              <span className="font-['Poppins'] font-black text-xs text-white my-0.5">
                {(152.4 + (Math.sin(graphTicks * 0.05) * 0.8)).toFixed(1)} A <span className="text-[7px] text-white/45 font-mono">RMS</span>
              </span>
              <svg className="w-full h-2.5 opacity-40 overflow-visible" viewBox="0 0 100 10">
                <path 
                  d={`M 0,5 Q 25,${5 + Math.sin(graphTicks * 0.15) * 3} 50,5 T 100,5`} 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="1" 
                />
              </svg>
            </div>

            {/* Card 3: Frecuencia */}
            <div className="flex flex-col justify-between gap-0.5 bg-black/30 border border-white/5 rounded-lg p-2 min-h-[58px]">
              <div className="flex items-center justify-between text-[7px] text-white/40 uppercase tracking-widest font-['Poppins'] font-bold">
                <span>FRECUENCIA</span>
                <div className="w-3.5 h-3.5 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] text-[7px] font-black">
                  Hz
                </div>
              </div>
              <span className="font-['Poppins'] font-black text-xs text-white my-0.5">
                {(60.02 + (Math.sin(graphTicks * 0.02) * 0.01)).toFixed(2)} Hz
              </span>
              <svg className="w-full h-2.5 opacity-40 overflow-visible" viewBox="0 0 100 10">
                <path 
                  d={`M 0,5 Q 25,${5 + Math.sin(graphTicks * 0.08) * 1.5} 50,5 T 100,5`} 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="1" 
                />
              </svg>
            </div>

            {/* Card 4: Potencia Activa */}
            <div className="flex flex-col justify-between gap-0.5 bg-black/30 border border-white/5 rounded-lg p-2 min-h-[58px]">
              <div className="flex items-center justify-between text-[7px] text-white/40 uppercase tracking-widest font-['Poppins'] font-bold">
                <span>POTENCIA ACTIVA</span>
                <Zap size={9} className="text-[#8B5CF6]" />
              </div>
              <span className="font-['Poppins'] font-black text-xs text-white my-0.5">
                {(106.8 + (Math.sin(graphTicks * 0.05) * 0.5)).toFixed(1)} kW
              </span>
              <svg className="w-full h-2.5 opacity-40 overflow-visible" viewBox="0 0 100 10">
                <path 
                  d={`M 0,5 Q 25,${5 + Math.sin(graphTicks * 0.12) * 2} 50,5 T 100,5`} 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="1" 
                />
              </svg>
            </div>

            {/* Card 5: Temperatura Interna */}
            <div className="flex flex-col justify-between gap-0.5 bg-black/30 border border-white/5 rounded-lg p-2 min-h-[58px]">
              <div className="flex items-center justify-between text-[7px] text-white/40 uppercase tracking-widest font-['Poppins'] font-bold">
                <span>TEMPERATURA INTERNA</span>
                <Flame size={9} className="text-[#8B5CF6]" />
              </div>
              <span className="font-['Poppins'] font-black text-xs text-white my-0.5">
                {(techParams.control.enfriamiento === 'Líquido' ? 34.2 : techParams.control.enfriamiento === 'Aire' ? 48.6 : 65.8).toFixed(1)} °C
              </span>
              <svg className="w-full h-2.5 opacity-40 overflow-visible" viewBox="0 0 100 10">
                <path 
                  d={`M 0,5 Q 25,${5 + Math.sin(graphTicks * 0.05) * 2.5} 50,5 T 100,5`} 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="1" 
                />
              </svg>
            </div>

            {/* Card 6: Eficiencia del Sistema */}
            <div className="flex flex-col justify-between gap-0.5 bg-black/30 border border-white/5 rounded-lg p-2 min-h-[58px]">
              <div className="flex items-center justify-between text-[7px] text-white/40 uppercase tracking-widest font-['Poppins'] font-bold">
                <span>EFICIENCIA DEL SISTEMA</span>
                <Leaf size={9} className="text-[#8B5CF6]" />
              </div>
              <span className="font-['Poppins'] font-black text-xs text-white my-0.5">
                {(techParams.control.filtrado === 'Activo' && techParams.control.enfriamiento === 'Líquido' ? 96.4 : techParams.control.filtrado === 'Pasivo' ? 92.8 : 88.5).toFixed(1)} %
              </span>
              <svg className="w-full h-2.5 opacity-40 overflow-visible" viewBox="0 0 100 10">
                <path 
                  d={`M 0,5 Q 25,${5 + Math.sin(graphTicks * 0.2) * 1.5} 50,5 T 100,5`} 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="1" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Highlights Footer */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-white/10">
          <div className="flex gap-2 items-start">
            <Shield className="text-[#8B5CF6] shrink-0" size={14} />
            <div className="flex flex-col">
              <span className="font-['Poppins'] font-black text-[8px] text-white/80 uppercase">PROTECCIÓN INTELIGENTE</span>
              <span className="font-['Poppins'] text-[7px] text-white/45">Interruptores y relés de última generación</span>
            </div>
          </div>
          
          <div className="flex gap-2 items-start">
            <Eye className="text-[#8B5CF6] shrink-0" size={14} />
            <div className="flex flex-col">
              <span className="font-['Poppins'] font-black text-[8px] text-white/80 uppercase">MONITOREO CONTINUO</span>
              <span className="font-['Poppins'] text-[7px] text-white/45">Supervisión 24/7 en tiempo real</span>
            </div>
          </div>
          
          <div className="flex gap-2 items-start">
            <Leaf className="text-[#8B5CF6] shrink-0" size={14} />
            <div className="flex flex-col">
              <span className="font-['Poppins'] font-black text-[8px] text-white/80 uppercase">EFICIENCIA ENERGÉTICA</span>
              <span className="font-['Poppins'] text-[7px] text-white/45">Optimización y reducción de pérdidas</span>
            </div>
          </div>
          
          <div className="flex gap-2 items-start">
            <CpuIcon className="text-[#8B5CF6] shrink-0" size={14} />
            <div className="flex flex-col">
              <span className="font-['Poppins'] font-black text-[8px] text-white/80 uppercase">COMUNICACIÓN INTEGRADA</span>
              <span className="font-['Poppins'] text-[7px] text-white/45">Protocolos IEC 61850 / Modbus / Ethernet</span>
            </div>
          </div>
          
          <div className="flex gap-2 items-start col-span-2 md:col-span-1">
            <CheckSquare className="text-[#8B5CF6] shrink-0" size={14} />
            <div className="flex flex-col">
              <span className="font-['Poppins'] font-black text-[8px] text-white/80 uppercase">SEGURIDAD CERTIFICADA</span>
              <span className="font-['Poppins'] text-[7px] text-white/45">Cumplimiento UL 508A, IEC y normativas</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <section id="tecnologia" className="py-20 md:py-28 bg-[#06080B] relative overflow-hidden select-none font-['Poppins'] text-white">
      {/* Sci-Fi Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-80 z-0" />
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#06080B] to-transparent pointer-events-none z-0" />
      
      {/* SpaceX / Iron Man Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#00D2FF]/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#FFD700]/2 rounded-full blur-[180px] pointer-events-none" />

      {/* Embedded keyframe styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(0.95); opacity: 0.3; }
        }
        @keyframes conveyor {
          0% { background-position-x: 0px; }
          100% { background-position-x: 40px; }
        }
      `}} />

      <div className="container mx-auto px-6 relative z-10 max-w-[1400px]">
        
        {/* Telemetry Status Bar Header */}
        <div className="flex flex-col md:flex-row items-center justify-between border border-white/10 bg-white/[0.01] backdrop-blur-xl rounded-xl p-4 mb-16 gap-4 text-xs font-mono tracking-widest text-white/60">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-white/30 uppercase">SYS_MONITOR //</span>
            <span className="text-cyan-400 font-bold">EN LÍNEA</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px]">
            <div>
              <span className="text-white/30 mr-1.5 font-bold">CPU:</span>
              <span className="text-white font-mono">{activeTelemetry.cpu}%</span>
            </div>
            <div className="text-white/10 hidden sm:block">|</div>
            <div>
              <span className="text-white/30 mr-1.5 font-bold">TEMP:</span>
              <span className="text-white font-mono">{activeTelemetry.temp}°C</span>
            </div>
            <div className="text-white/10 hidden sm:block">|</div>
            <div>
              <span className="text-white/30 mr-1.5 font-bold">PING:</span>
              <span className="text-white font-mono">{activeTelemetry.ping}ms</span>
            </div>
            <div className="text-white/10 hidden sm:block">|</div>
            <div>
              <span className="text-white/30 mr-1.5 font-bold">FREQ:</span>
              <span className="text-white font-mono">{activeTelemetry.frequency}Hz</span>
            </div>
          </div>
          
          <div className="hidden lg:block text-white/30 uppercase text-[9px]">
            SMQ_TELEMETRY_PORTAL v2.5
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 font-['Poppins']">
            Tecnología de <span className="text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.15)]">Vanguardia</span>
          </h2>
          <div className="w-[80px] h-[3px] bg-[#FFD700] mx-auto mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed text-xs md:text-sm font-black uppercase tracking-tight font-['Poppins']">
            PRECISIÓN EN CONTROL. INTELIGENCIA EN DECISIÓN. CONFIABILIDAD EN OPERACIÓN.
          </p>
        </div>

        {/* 3x2 Grid for All 6 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full mb-24 select-none">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            const isHighlighted = highlightedTechId === tech.id;
            return (
              <div key={tech.id} className="relative">
                {/* Glowing Halo behind the card */}
                {isHighlighted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                      opacity: [0.5, 0.95, 0.5],
                      scale: [0.98, 1.04, 0.98]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -inset-4 rounded-2xl blur-[24px] pointer-events-none z-0"
                    style={{
                      background: `radial-gradient(circle, ${tech.color}80 0%, ${tech.color}22 60%, transparent 100%)`,
                    }}
                  />
                )}

                <motion.div
                  id={tech.id}
                  onClick={() => {
                    playBeep(950, 'sine', 0.05);
                    setSelectedTech(tech);
                    setHighlightedTechId(tech.id);
                  }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className={`group border ${tech.borderClass} bg-[#0B101D]/85 backdrop-blur-md p-6 rounded-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[360px] ${tech.bgClass} cursor-pointer z-10`}
                  style={isHighlighted ? { borderColor: tech.color, boxShadow: `0 0 25px ${tech.color}40` } : {}}
                >
                  {/* Neon Glow Lines */}
                  <div className={`absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-r from-transparent to-white/20 group-hover:to-[${tech.color}]/70 transition-all duration-500`} />
                  <div className={`absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-white/20 to-transparent group-hover:from-[${tech.color}]/70 transition-all duration-500`} />
                  
                  {/* Background Portada Cover Image */}
                  <div className="absolute right-0 bottom-0 top-0 w-[45%] pointer-events-none select-none overflow-hidden z-0">
                    <img 
                      src={tech.coverImage} 
                      alt="" 
                      className="w-full h-full object-cover object-center mix-blend-screen opacity-70 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500" 
                    />
                    {/* Masking gradient to blend the left side of the image into the card background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b101d] via-[#0b101d]/30 to-transparent pointer-events-none" />
                  </div>

                  <div className="relative z-10">
                    {/* Card Header: Badge + Subheader + Status */}
                    <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded flex items-center justify-center font-black text-xs text-black"
                          style={{ backgroundColor: tech.color }}
                        >
                          {tech.number}
                        </div>
                        <span className="font-mono text-[8px] text-white/40 tracking-widest uppercase">
                          {tech.telemetry.unit}
                        </span>
                      </div>
                      <span 
                        className="font-mono text-[8px] font-bold tracking-widest uppercase"
                        style={{ color: tech.color }}
                      >
                        {tech.telemetry.status}
                      </span>
                    </div>

                    {/* Icon Box */}
                    <div 
                      className="w-10 h-10 rounded bg-white/[0.02] border border-white/10 flex items-center justify-center mb-5 group-hover:bg-white/[0.04] transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.01)]"
                      style={{ borderColor: `${tech.color}25` }}
                    >
                      <Icon size={18} style={{ color: tech.color }} />
                    </div>

                    {/* Title & Subtitle styled with uppercase, heavy black font matching user requirements */}
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-tight mb-2.5 font-['Poppins']">
                      {renderBiColorTitle(tech.title)}
                    </h3>
                    <p className="text-[10px] text-white/50 leading-normal font-black uppercase tracking-tight max-w-[58%] font-['Poppins'] text-justify">
                      {tech.subtitle}
                    </p>
                  </div>

                  {/* Footer Metrics and Access Link */}
                  <div className="mt-8 pt-4 border-t border-white/5 relative z-10">
                    <div className="font-mono text-[8px] text-white/20 uppercase mb-3 tracking-widest">
                      {tech.telemetry.metrics}
                    </div>
                    
                    <div 
                      className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest transition-all"
                      style={{ color: tech.color }}
                    >
                      <span>{tech.id === 'sistemas-inteligentes' ? 'Acceder a Twin Digital' : 'Ver Detalles'}</span>
                      <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Tony Stark Holographic Telemetry Modal HUD */}
      <AnimatePresence>
        {selectedTech && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            {/* Backdrop Closer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                playBeep(600, 'sine', 0.1);
                setSelectedTech(null);
              }}
              className="absolute inset-0 cursor-pointer"
            />
            
            {/* Holographic Diagnostic HUD Container (Universal HUD for all sections) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              className="relative w-full max-w-5xl bg-[#03060B]/95 border rounded-2xl p-4 md:p-6 z-10 max-h-[92vh] overflow-y-auto"
              style={{
                borderColor: `${selectedTech.color}33`,
                boxShadow: `0 0 80px ${selectedTech.color}20`,
                '--scrollbar-color': `${selectedTech.color}66`,
                '--scrollbar-color-hover': selectedTech.color
              }}
            >
              {/* Scanline overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: `linear-gradient(rgba(18, 16, 16, 0) 50%, ${selectedTech.color}40 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`,
                  backgroundSize: '100% 4px, 6px 100%'
                }}
              />

              {/* Glowing Corner Brackets */}
              <div className="absolute top-3 left-3 w-2 h-2 border-t-2 border-l-2" style={{ borderColor: selectedTech.color }} />
              <div className="absolute top-3 right-3 w-2 h-2 border-t-2 border-r-2" style={{ borderColor: selectedTech.color }} />
              <div className="absolute bottom-3 left-3 w-2 h-2 border-b-2 border-l-2" style={{ borderColor: selectedTech.color }} />
              <div className="absolute bottom-3 right-3 w-2 h-2 border-b-2 border-r-2" style={{ borderColor: selectedTech.color }} />

              {/* Close Button */}
              <button
                onClick={() => {
                  playBeep(600, 'sine', 0.1);
                  setSelectedTech(null);
                }}
                className="absolute top-4 right-4 p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/70 hover:text-white z-20"
              >
                <X size={16} />
              </button>

              {selectedTech.id === 'control' ? (
                renderControlModalContent()
              ) : (
                <>
                  {/* Monospace Telemetry Header */}
                  <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-3 flex flex-wrap items-center justify-between border-b border-white/10 pb-2.5 gap-2">
                <div className="flex items-center gap-3">
                  <span style={{ color: selectedTech.color }}>HUD_TACTICAL_DISPLAY //</span>
                  <span>{selectedTech.telemetry.unit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: selectedTech.color }}></span>
                  <span className="font-bold" style={{ color: selectedTech.color }}>CORE_STATE: {selectedTech.telemetry.status}</span>
                </div>
              </div>

              {/* Main HUD Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Left Panel: Holographic Wireframes & Oscilloscope / Conveyor Simulator (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-3">
                  
                  {/* Title Area & Cover Image Row */}
                  <div className="flex gap-4 items-center">
                    <div className="flex-grow flex flex-col gap-1">
                      <div>
                        <span 
                          className="font-mono text-[8px] px-2 py-0.5 rounded uppercase tracking-widest inline-block mb-1 font-bold border"
                          style={{
                            backgroundColor: `${selectedTech.color}15`,
                            color: selectedTech.color,
                            borderColor: `${selectedTech.color}33`
                          }}
                        >
                          {selectedTech.telemetry.hardware}
                        </span>
                        <h3 className="text-lg md:text-xl font-extrabold text-white uppercase tracking-wider font-['Poppins']">
                          {renderBiColorTitle(selectedTech.title)}
                        </h3>
                      </div>
                      <p className="text-[10px] text-white/70 leading-normal font-sans border-l-2 pl-3 text-justify animate-fade-in" style={{ borderColor: selectedTech.color }}>
                        {selectedTech.desc}
                      </p>
                    </div>
                    {selectedTech.coverImage && (
                      <div 
                        className="shrink-0 w-[130px] h-[80px] rounded-lg overflow-hidden border bg-black/40 flex items-center justify-center relative shadow-[0_0_15px_rgba(0,210,255,0.1)]"
                        style={{ borderColor: `${selectedTech.color}2b` }}
                      >
                        <img src={selectedTech.coverImage} alt={selectedTech.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>
                    )}
                  </div>

                  {/* Visual Diagnostic Panel */}
                  <div className="flex flex-col gap-2 border border-white/10 rounded-xl p-3 bg-black/40">
                    <div className="w-full font-mono text-[9px] border-b border-white/10 pb-1.5 flex justify-between items-center text-white/30 tracking-widest uppercase">
                      <span>
                        [ {selectedTech.id === 'sistemas-inteligentes' 
                          ? '3D_DIGITAL_TWIN_DIAGNOSTIC' 
                          : selectedTech.id === 'plc' 
                          ? 'PLC_LOGIC_SEQUENCE_MONITOR' 
                          : selectedTech.id === 'control' 
                          ? 'PHASE_HARMONICS_OSCILLOSCOPE' 
                          : selectedTech.id === 'monitoreo' 
                          ? 'SATCOM_LINK_PATH_RADAR' 
                          : 'EDGE_AI_COMPUTER_VISION_SCAN'} ]
                      </span>
                      <span className="flex items-center gap-2" style={{ color: selectedTech.color }}>
                        {selectedTech.id === 'plc' ? (
                          <span className="flex items-center gap-1.5 text-[8px]">
                            <span>ESTADO: <span className="text-emerald-400 font-bold">ACTIVO</span></span>
                            <span className="opacity-30">|</span>
                            <span className="flex items-center gap-0.5">ENLACE: <span className="text-emerald-400 font-bold">SEGURO</span> <Lock size={8} className="text-emerald-400 inline" /></span>
                          </span>
                        ) : (
                          'ACTIVO // ENLACE_SEGURO'
                        )}
                      </span>
                    </div>
                    <div className="w-full">
                      {/* 1. Sistemas Inteligentes 3D View */}
                      {selectedTech.id === 'sistemas-inteligentes' && (
                        <DigitalTwinViewer
                          glbUrl={glbModels[selectedTech.id]}
                          rotationSpeed={rotationSpeeds[selectedTech.id] ?? 1.0}
                          rotate={isEditorMode ? (glbTransforms[selectedTech.id]?.rotate ?? false) : true}
                          scale={glbTransforms[selectedTech.id]?.scale ?? 1.5}
                          positionX={glbTransforms[selectedTech.id]?.x ?? 0}
                          positionY={glbTransforms[selectedTech.id]?.y ?? 0}
                          positionZ={glbTransforms[selectedTech.id]?.z ?? 0}
                          gridVisible={glbTransforms[selectedTech.id]?.grid ?? true}
                          lockY={glbTransforms[selectedTech.id]?.lockY ?? false}
                          isEditorMode={isEditorMode}
                          onUpload={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              setGlbModels(prev => ({ ...prev, [selectedTech.id]: url }));
                              setLogs(l => [...l, `[GLB_UPLOAD] Twin digital GLB loaded for ${selectedTech.id.toUpperCase()}.`]);
                            }
                          }}
                          onSpeedChange={(val) => {
                            setRotationSpeeds(prev => ({ ...prev, [selectedTech.id]: val }));
                          }}
                          onRotateToggle={() => {
                            updateTransform('rotate', !glbTransforms[selectedTech.id]?.rotate);
                          }}
                          onScaleChange={(val) => {
                            updateTransform('scale', val);
                          }}
                          onPositionXChange={(val) => {
                            updateTransform('x', val);
                          }}
                          onPositionYChange={(val) => {
                            updateTransform('y', val);
                          }}
                          onPositionZChange={(val) => {
                            updateTransform('z', val);
                          }}
                          onGridVisibleToggle={() => {
                            updateTransform('grid', !glbTransforms[selectedTech.id]?.grid);
                          }}
                          onLockYToggle={() => {
                            updateTransform('lockY', !glbTransforms[selectedTech.id]?.lockY);
                          }}
                          onExpand={() => setIsFullscreen(true)}
                          heightClass="h-[160px]"
                        />
                      )}

                      {/* 2. PLC Logic Sequence Monitor */}
                      {selectedTech.id === 'plc' && (
                        <div className="flex flex-col gap-1.5 w-full h-[165px] bg-black/60 rounded-lg overflow-hidden border border-white/10 p-2.5 font-mono text-[9px]">
                          {/* Animated Relay Ladder Logic Schema */}
                          <div className="flex-grow border border-white/5 rounded bg-black/40 p-2 flex flex-col justify-between relative h-[88px]">
                            <div className="absolute top-1 left-2 text-[7px] text-white/30 uppercase tracking-widest flex justify-between w-[92%] items-center">
                              <span>Network 1 // Cycle Execution</span>
                            </div>
                            
                            <div className="flex gap-2 flex-grow h-[55px] items-stretch mt-2.5">
                              {/* Ladder SVG */}
                              <svg className="w-[80%] h-full overflow-visible" viewBox="0 0 250 60">
                                <line x1="5" y1="2" x2="5" y2="58" stroke={selectedTech.color} strokeWidth="1.5" strokeDasharray="2 2" />
                                <line x1="245" y1="2" x2="245" y2="58" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                                
                                {/* Rung 1 */}
                                <path 
                                  d="M 5,18 L 45,18 M 55,18 L 115,18 M 125,18 L 205,18 M 221,18 L 245,18" 
                                  stroke={graphTicks % 40 < 20 ? selectedTech.color : 'rgba(255,255,255,0.1)'} 
                                  strokeWidth="1.2" 
                                  fill="none" 
                                />
                                
                                {/* Contact I:0 */}
                                <line x1="45" y1="12" x2="45" y2="24" stroke="#fff" strokeWidth="1.2" />
                                <line x1="55" y1="12" x2="55" y2="24" stroke="#fff" strokeWidth="1.2" />
                                <text x="46" y="8" fill="rgba(255,255,255,0.6)" className="text-[6.5px] font-bold">I:0</text>
                                
                                {/* Contact I:1 Box */}
                                <rect x="115" y="11" width="10" height="14" fill="black" stroke={selectedTech.color} strokeWidth="1.2" />
                                <text x="117" y="20" fill={selectedTech.color} className="text-[6.5px] font-bold">I:1</text>
                                
                                {/* Coil Q:2 */}
                                <circle cx="213" cy="18" r="8" fill="black" stroke="#FFD700" strokeWidth="1.2" />
                                <text x="210" y="21" fill="#FFD700" className="text-[6.5px] font-bold">Q:2</text>
                                
                                {/* Rung 2 */}
                                <path 
                                  d="M 5,42 L 85,42 M 95,42 L 205,42 M 221,42 L 245,42" 
                                  stroke={graphTicks % 60 < 30 ? selectedTech.color : 'rgba(255,255,255,0.1)'} 
                                  strokeWidth="1.2" 
                                  fill="none" 
                                />
                                
                                {/* Contact I:3 */}
                                <line x1="85" y1="36" x2="85" y2="48" stroke="#fff" strokeWidth="1.2" />
                                <line x1="95" y1="36" x2="95" y2="48" stroke="#fff" strokeWidth="1.2" />
                                <text x="86" y="32" fill="rgba(255,255,255,0.6)" className="text-[6.5px] font-bold">I:3</text>
                                
                                {/* Coil Q:0 */}
                                <circle cx="213" cy="42" r="8" fill="black" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
                                <text x="210" y="45" fill="rgba(255,255,255,0.6)" className="text-[6.5px] font-bold">Q:0</text>
                              </svg>
                              
                              {/* Legend */}
                              <div className="w-[20%] flex flex-col justify-center gap-1 font-mono text-[5.5px] text-white/50 border-l border-white/5 pl-2 select-none">
                                <div className="flex items-center gap-1">
                                  <div className="w-2.5 h-0.5" style={{ backgroundColor: selectedTech.color }} />
                                  <span>ENTRADAS (I)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 rounded-full border border-[#FFD700] flex items-center justify-center">
                                    <div className="w-0.5 h-0.5 bg-[#FFD700] rounded-full" />
                                  </div>
                                  <span>SALIDAS (Q)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-2.5 h-0.5 bg-white/25" />
                                  <span>MEMORIA (M)</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center text-[6.5px] border-t border-white/5 pt-1 mt-1" style={{ color: `${selectedTech.color}cc` }}>
                              <span>CYCLE JITTER: {((techParams.plc.ciclo * 0.04) + Math.sin(graphTicks * 0.1) * 0.002).toFixed(4)} ms</span>
                              <span className="animate-pulse">CPU_STATE: ACTIVE_RUN</span>
                            </div>
                          </div>

                          {/* Dynamic registers table */}
                          <div className="bg-black/40 border border-white/5 rounded px-2 py-1 h-[48px] overflow-hidden">
                            <table className="w-full text-left font-mono text-[7px] border-collapse">
                              <thead>
                                <tr className="text-white/30 border-b border-white/5 text-[6px]">
                                  <th className="pb-0.5 font-normal">DIRECCIÓN</th>
                                  <th className="pb-0.5 font-normal">DESCRIPCIÓN</th>
                                  <th className="pb-0.5 font-normal">VALOR</th>
                                  <th className="pb-0.5 font-normal">ESTADO</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-white/5">
                                  <td className="py-0.5 text-[#FFD700] font-bold">0xA0</td>
                                  <td className="py-0.5 text-white/70">DBW_0: {Math.floor(Math.sin(graphTicks * 0.05) * 40 + 200).toString(16).toUpperCase()}</td>
                                  <td className="py-0.5 text-white/70">16#00{Math.floor(Math.sin(graphTicks * 0.05) * 40 + 200).toString(16).toUpperCase()}</td>
                                  <td className="py-0.5 text-cyan-400 font-bold">[LOCK]</td>
                                </tr>
                                <tr>
                                  <td className="py-0.5 text-[#FFD700] font-bold">0xA2</td>
                                  <td className="py-0.5 text-white/70">DBW_2: {Math.floor(Math.cos(graphTicks * 0.03) * 40 + 200).toString(16).toUpperCase()}</td>
                                  <td className="py-0.5 text-white/70">16#00{Math.floor(Math.cos(graphTicks * 0.03) * 40 + 200).toString(16).toUpperCase()}</td>
                                  <td className="py-0.5 text-cyan-400 font-bold">[LOCK]</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* 3. Control Waveform Phase Oscilloscope */}
                      {selectedTech.id === 'control' && (
                        <div className="flex flex-col gap-2 w-full h-[210px] bg-black/60 rounded-lg overflow-hidden border border-white/10 p-4 font-mono text-[9px] relative justify-between">
                          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:15px_15px] m-4 border border-white/5" />
                          
                          <div className="absolute top-2 left-2 text-[7px] text-white/30 uppercase tracking-widest">
                            Rigel Oscilloscope // Phase Alignment
                          </div>
                          
                          <div className="flex-grow w-full flex items-center justify-center relative overflow-hidden h-28">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120">
                              {Array.from({ length: 3 }).map((_, idx) => {
                                const phaseOffset = idx * (Math.PI * 2 / 3);
                                const amp = techParams.control.tension === '480V' ? 36 : techParams.control.tension === '220V' ? 22 : 12;
                                const filter = techParams.control.filtrado;
                                const noiseLevel = filter === 'Ninguno' ? 8.5 : filter === 'Pasivo' ? 3.0 : 0.4;
                                const freq = 0.05;
                                const points = [];
                                
                                for (let x = 0; x <= 300; x += 3) {
                                  const angle = (x + graphTicks * 3.5) * freq + phaseOffset;
                                  let y = Math.sin(angle) * amp;
                                  
                                  if (filter !== 'Activo') {
                                    y += Math.sin(angle * 3) * (amp * (filter === 'Ninguno' ? 0.35 : 0.12));
                                    y += Math.sin(angle * 5) * (amp * (filter === 'Ninguno' ? 0.20 : 0.06));
                                  }
                                  
                                  y += (Math.sin(x * 1.5) + Math.cos(x * 2.8)) * (noiseLevel * 0.5);
                                  points.push(`${x},${60 + y}`);
                                }
                                
                                const colors = ['#FFD700', '#00D2FF', '#E11D48'];
                                return (
                                  <path 
                                    key={idx}
                                    d={`M ${points.join(' L ')}`}
                                    stroke={colors[idx]}
                                    strokeWidth="1.5"
                                    fill="none"
                                    className="opacity-80"
                                  />
                                );
                              })}
                              <line 
                                x1={(graphTicks * 4.5) % 300} 
                                y1="0" 
                                x2={(graphTicks * 4.5) % 300} 
                                y2="120" 
                                stroke="#fff" 
                                strokeWidth="1" 
                                className="opacity-40" 
                              />
                            </svg>
                          </div>

                          <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-2 text-[7px] text-white/50 text-center">
                            <div className="flex flex-col gap-0.5">
                                <span>THD (DISTORSIÓN)</span>
                                <span className={`font-bold ${techParams.control.filtrado === 'Ninguno' ? 'text-rose-400' : ''}`} style={techParams.control.filtrado === 'Ninguno' ? {} : { color: selectedTech.color }}>
                                  {techParams.control.filtrado === 'Ninguno' ? '18.4%' : techParams.control.filtrado === 'Pasivo' ? '7.9%' : '1.2%'}
                                </span>
                              </div>
                              <div className="flex flex-col gap-0.5 border-l border-white/5">
                                <span>FACTOR DE POTENCIA</span>
                                <span className="font-bold text-[#FFD700]">
                                  {techParams.control.filtrado === 'Ninguno' ? '0.86' : techParams.control.filtrado === 'Pasivo' ? '0.94' : '0.99'}
                                </span>
                              </div>
                              <div className="flex flex-col gap-0.5 border-l border-white/5">
                                <span>VELOCIDAD DE ENFRIAMIENTO</span>
                                <span className="font-bold" style={{ color: selectedTech.color }}>
                                  {techParams.control.enfriamiento === 'Líquido' ? '820 RPM' : techParams.control.enfriamiento === 'Aire' ? '3200 RPM' : '0 RPM (PASIVO)'}
                                </span>
                              </div>
                          </div>
                        </div>
                      )}

                      {/* 4. Satellite Constellation Radar Scanner */}
                      {selectedTech.id === 'monitoreo' && (
                        <div className="flex flex-col gap-1.5 w-full h-[165px] bg-black/60 rounded-lg overflow-hidden border border-white/10 p-2.5 font-mono text-[9px] relative justify-between">
                          <div className="absolute top-1 left-2 text-[7px] text-white/30 uppercase tracking-widest">
                            Satcom Link // Orbital Constellation Radar
                          </div>

                          <div className="flex-grow w-full flex items-center justify-center relative h-[90px]">
                            <svg className="h-full w-auto overflow-visible" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="45" fill="none" stroke={`${selectedTech.color}26`} strokeWidth="0.5" />
                              <circle cx="50" cy="50" r="30" fill="none" stroke={`${selectedTech.color}1a`} strokeWidth="0.5" />
                              <circle cx="50" cy="50" r="15" fill="none" stroke={`${selectedTech.color}14`} strokeWidth="0.5" />
                              
                              <line x1="5" y1="50" x2="95" y2="50" stroke={`${selectedTech.color}14`} strokeWidth="0.5" />
                              <line x1="50" y1="5" x2="50" y2="95" stroke={`${selectedTech.color}14`} strokeWidth="0.5" />

                              <line 
                                x1="50" 
                                y1="50" 
                                x2={50 + 45 * Math.cos((graphTicks * 2.2 * Math.PI) / 180)} 
                                y2={50 + 45 * Math.sin((graphTicks * 2.2 * Math.PI) / 180)} 
                                stroke={selectedTech.color} 
                                strokeWidth="1.2" 
                              />

                              <path
                                d={`M 50,50 L ${50 + 45 * Math.cos((graphTicks * 2.2 * Math.PI) / 180)} ${50 + 45 * Math.sin((graphTicks * 2.2 * Math.PI) / 180)} A 45,45 0 0,0 ${50 + 45 * Math.cos(((graphTicks * 2.2 - 35) * Math.PI) / 180)} ${50 + 45 * Math.sin(((graphTicks * 2.2 - 35) * Math.PI) / 180)} Z`}
                                fill={`${selectedTech.color}14`}
                              />

                              {[
                                { cx: 35, cy: 30, text: 'SAT_SMQ01', val: 45 },
                                { cx: 70, cy: 40, text: 'SAT_SMQ02', val: 165 },
                                { cx: 40, cy: 75, text: 'SAT_SMQ03', val: 280 }
                              ].map((sat, sIdx) => {
                                const opacity = getRadarTargetOpacity(sat.val);
                                return (
                                  <g key={sIdx} style={{ opacity }}>
                                    <circle cx={sat.cx} cy={sat.cy} r="4" fill="none" stroke="#FFD700" strokeWidth="0.5" className="animate-ping" style={{ animationDuration: '2s' }} />
                                    <circle cx={sat.cx} cy={sat.cy} r="1.5" fill="#FFD700" />
                                    <text x={sat.cx + 3} y={sat.cy + 2} fill="#FFD700" className="text-[5px] font-bold">{sat.text}</text>
                                    <line x1="50" y1="50" x2={sat.cx} y2={sat.cy} stroke="rgba(255,215,0,0.2)" strokeWidth="0.5" strokeDasharray="1 1" />
                                  </g>
                                );
                              })}

                              <rect x="48.5" y="48.5" width="3" height="3" fill={selectedTech.color} className="animate-pulse" />
                            </svg>
                          </div>

                          <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-1.5 text-[7px] text-white/50 text-center">
                            <div className="flex flex-col gap-0.5">
                              <span>PROVEEDOR DE RED</span>
                              <span className="font-bold" style={{ color: selectedTech.color }}>{techParams.monitoreo.red.toUpperCase()}</span>
                            </div>
                            <div className="flex flex-col gap-0.5 border-l border-white/5">
                              <span>CIFRADO</span>
                              <span className="font-bold text-[#FFD700]">{techParams.monitoreo.encriptacion}</span>
                            </div>
                            <div className="flex flex-col gap-0.5 border-l border-white/5">
                              <span>ESTADO DE PING</span>
                              <span className="font-bold" style={{ color: selectedTech.color }}>
                                {techParams.monitoreo.red === 'Starlink' ? '28 ms (ESTABLE)' : techParams.monitoreo.red === 'Cellular' ? '54 ms (CELULAR)' : '680 ms (LATENCIA)'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedTech.id === 'ia' && (
                        <div className="flex flex-col gap-1.5 w-full h-[165px] bg-black/60 rounded-lg overflow-hidden border border-white/10 p-2.5 font-mono text-[9px] relative justify-between">
                          <div className="absolute top-1 left-2 text-[7px] text-white/30 uppercase tracking-widest">
                            EdgeAI Detector // Conveyor Scanner Feed
                          </div>
 
                          <div className="flex-grow w-full border border-white/5 bg-black/80 rounded relative overflow-hidden h-[102px] flex items-center justify-center">
                            <div 
                              className="absolute inset-0 opacity-[0.08] bg-[size:10px_10px]"
                              style={{
                                backgroundImage: `linear-gradient(${selectedTech.color}4d 1px, transparent 1px), linear-gradient(90deg, ${selectedTech.color}4d 1px, transparent 1px)`
                              }}
                            />

                            {/* Conveyor belt dotted line */}
                            <div className="absolute left-0 right-0 top-[65%] h-[1px] border-b border-dashed border-white/10" />
                            
                            {/* Gate threshold lines */}
                            <div 
                              className="absolute top-0 bottom-0 w-[1px] bg-[#FFD700] shadow-[0_0_8px_#FFD700] opacity-80 pointer-events-none" 
                              style={{ left: '75%', borderLeft: '1px dotted #FFD700' }}
                            />
                            <div className="absolute left-[76%] top-1.5 text-[6px] text-[#FFD700] font-black uppercase tracking-wider bg-black/60 px-1 py-0.5 rounded border border-white/5">
                              GATE_THRESH: {confThreshold}%
                            </div>

                            {/* Legend on the right */}
                            <div className="absolute right-2 top-1.5 flex flex-col gap-1 text-[5px] text-white/50 font-mono select-none pointer-events-none bg-black/60 p-1 rounded border border-white/5 z-10">
                              <div className="flex items-center gap-1">
                                <span className="text-[#F97316] font-bold">―</span>
                                <span>DETECCIÓN (%)</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-[#FFD700] font-bold">―</span>
                                <span>CLASIFICACIÓN</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-white/40 font-bold">―</span>
                                <span>TRACKING</span>
                              </div>
                            </div>

                            {visionItems.map(item => {
                              const percentX = item.x;
                              const isScanning = percentX > 68 && percentX < 82;
                              return (
                                <div
                                  key={item.id}
                                  className="absolute top-[42%] -translate-y-1/2 flex flex-col items-center"
                                  style={{ left: `${percentX}%` }}
                                >
                                  <div 
                                    className={`w-14 h-[68px] border rounded-lg flex flex-col items-center justify-between p-1.5 relative transition-all duration-300 ${
                                      isScanning
                                        ? item.confidence >= confThreshold
                                          ? 'border-emerald-400 bg-emerald-500/15 shadow-[0_0_15px_rgba(52,211,153,0.4)] scale-105'
                                          : 'border-red-400 bg-red-500/15 shadow-[0_0_15px_rgba(248,113,113,0.4)] scale-105'
                                        : 'bg-black/40 border-white/10'
                                    }`}
                                    style={isScanning ? {} : { borderColor: `${selectedTech.color}33` }}
                                  >
                                    {/* Confidence Pill */}
                                    <span 
                                      className="absolute -top-2.5 px-1.5 py-0.5 rounded-full text-[6px] text-black font-black uppercase tracking-wider" 
                                      style={{ backgroundColor: item.confidence >= confThreshold ? selectedTech.color : '#FFD700' }}
                                    >
                                      {item.confidence}%
                                    </span>

                                    {/* Graphic element */}
                                    <div className="flex-grow flex items-center justify-center mt-1">
                                      {renderItemGraphic(item.type, selectedTech.color)}
                                    </div>
                                    
                                    {/* Item name inside box */}
                                    <span className="text-[7.5px] font-black text-white/95 uppercase tracking-wider mt-0.5">
                                      {item.type === 'PET_BOTTLE' ? 'PET' : item.type === 'ALUMINUM_CAN' ? 'CAN' : 'GLASS'}
                                    </span>
                                    
                                    {/* Laser scanning line overlay */}
                                    {isScanning && (
                                      <div 
                                        className="absolute left-0 right-0 h-[1.5px] opacity-75 shadow-[0_0_8px_currentColor] animate-bounce" 
                                        style={{ 
                                          color: item.confidence >= confThreshold ? '#10B981' : '#EF4444',
                                          backgroundColor: 'currentColor',
                                          animationDuration: '1.2s' 
                                        }} 
                                      />
                                    )}

                                    {/* Reticule corners */}
                                    <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white/60 rounded-tl" />
                                    <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-white/60 rounded-tr" />
                                    <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-white/60 rounded-bl" />
                                    <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white/60 rounded-br" />
                                  </div>
                                  <span className="text-[5.5px] text-white/40 uppercase mt-1 tracking-widest font-mono font-bold">{item.label}</span>
                                </div>
                              );
                            })}
                          </div>
 
                          <div className="grid grid-cols-4 gap-1 text-[7px] text-white/50 text-center border-t border-white/5 pt-1.5">
                            <div className="flex flex-col gap-0.5">
                              <span>CANTIDAD PET</span>
                              <span className="font-bold" style={{ color: selectedTech.color }}>{sortedCounters.PET_BOTTLE}</span>
                            </div>
                            <div className="flex flex-col gap-0.5 border-l border-white/5">
                              <span>CANTIDAD LATAS</span>
                              <span className="font-bold" style={{ color: selectedTech.color }}>{sortedCounters.ALUMINUM_CAN}</span>
                            </div>
                            <div className="flex flex-col gap-0.5 border-l border-white/5">
                              <span>CANTIDAD VIDRIO</span>
                              <span className="font-bold" style={{ color: selectedTech.color }}>{sortedCounters.GLASS_BOTTLE}</span>
                            </div>
                            <div className="flex flex-col gap-0.5 border-l border-white/5">
                              <span>ESCANEOS TOTALES</span>
                              <span className="font-bold text-[#FFD700]">{sortedCounters.total}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 6. Colaborativa Robot Safety Monitor */}
                      {selectedTech.id === 'colaborativa' && (
                        <div className="flex flex-col gap-1.5 w-full h-[165px] bg-black/60 rounded-lg overflow-hidden border border-white/10 p-2.5 font-mono text-[9px] relative justify-between">
                          <div className="absolute top-1 left-2 text-[7px] text-white/30 uppercase tracking-widest">
                            Cobot Radar // Safety Bubble Field Monitor
                          </div>
                          
                          <div className="flex-grow w-full flex items-center justify-center relative h-[90px]">
                            <svg className="h-full w-auto overflow-visible" viewBox="0 0 100 100">
                              {/* Glowing safety fields */}
                              <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(234, 179, 8, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
                              <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(234, 179, 8, 0.4)" strokeWidth="0.5" />
                              
                              {/* Center Cobot Base */}
                              <circle cx="50" cy="50" r="4" fill="#EAB308" />
                              <circle cx="50" cy="50" r="8" fill="none" stroke="#EAB308" strokeWidth="0.5" className="animate-pulse" />
                              
                              {/* Joint segments moving */}
                              {(() => {
                                const angle1 = (graphTicks * 1.5 * Math.PI) / 180;
                                const angle2 = (graphTicks * 0.8 * Math.PI) / 180;
                                const joint1X = 50 + 18 * Math.cos(angle1);
                                const joint1Y = 50 + 18 * Math.sin(angle1);
                                const joint2X = joint1X + 14 * Math.cos(angle1 + angle2);
                                const joint2Y = joint1Y + 14 * Math.sin(angle1 + angle2);
                                return (
                                  <>
                                    {/* Arm links */}
                                    <line x1="50" y1="50" x2={joint1X} y2={joint1Y} stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1={joint1X} y1={joint1Y} x2={joint2X} y2={joint2Y} stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
                                    
                                    {/* Joint articulations */}
                                    <circle cx={joint1X} cy={joint1Y} r="2.5" fill="#fff" stroke="#EAB308" strokeWidth="1" />
                                    <circle cx={joint2X} cy={joint2Y} r="2" fill="#fff" stroke="#EAB308" strokeWidth="1" />
                                    
                                    {/* Human presence detected */}
                                    <g className="animate-pulse" style={{ animationDuration: '2s' }}>
                                      <circle cx="78" cy="35" r="4.5" fill="none" stroke="#EAB308" strokeWidth="0.5" />
                                      <circle cx="78" cy="35" r="2" fill="#EAB308" />
                                      <text x="84" y="37" fill="#EAB308" className="text-[5px] font-bold">OPERADOR_DETECTADO</text>
                                      <line x1={joint2X} y1={joint2Y} x2="78" y2="35" stroke="rgba(234,179,8,0.2)" strokeWidth="0.5" strokeDasharray="1 1" />
                                    </g>
                                  </>
                                );
                              })()}
                            </svg>
                          </div>
 
                          <div className="grid grid-cols-6 gap-1 border-t border-white/5 pt-1.5 text-[6px] text-white/50 text-center">
                            {Array.from({ length: 6 }).map((_, jIdx) => {
                              const val = Math.floor(45 + Math.sin(graphTicks * 0.1 + jIdx) * 15);
                              return (
                                <div key={jIdx} className="flex flex-col gap-0.5">
                                  <span>PAR J{jIdx+1} (TORQUE)</span>
                                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#EAB308]" style={{ width: `${val}%` }} />
                                  </div>
                                  <span className="font-bold text-[#EAB308]">{val} N·m</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* REALTIME PHYSICAL MEASUREMENTS DASHBOARD (Tony Stark holographic readouts) */}
                  <div className="border rounded-xl p-3 bg-black/40" style={{ borderColor: `${selectedTech.color}1a` }}>
                    <h4 className="font-mono text-[9px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5" style={{ color: selectedTech.color }}>
                      <Zap size={11} className="text-[#FFD700]" /> [ REALTIME_PHYSICAL_MEASUREMENTS ]
                    </h4>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      
                      {/* Metric 1: CPU load */}
                      <div className="flex flex-col gap-0.5 border border-white/5 rounded-lg p-2 bg-black/20">
                        <div className="flex justify-between items-center text-[7px] text-white/40 uppercase tracking-widest font-mono">
                          <span>{selectedTech.id === 'control' ? 'CORRIENTE DE CARGA' : 'CARGA NÚCLEO CPU'}</span>
                          <CpuIcon size={9} style={{ color: selectedTech.color }} />
                        </div>
                        <span className="font-mono text-sm font-bold text-white mt-0.5">
                          {calculatedMetrics.cpu}%
                        </span>
                        <svg className="w-full h-4 mt-0.5 overflow-visible" viewBox="0 0 100 20">
                          <path 
                            d={generateSparklinePath(0, 4)} 
                            fill="none" 
                            stroke={selectedTech.color} 
                            strokeWidth="1" 
                            className="opacity-70" 
                          />
                        </svg>
                      </div>

                      {/* Metric 2: Dissipated Temperature */}
                      <div className="flex flex-col gap-0.5 border border-white/5 rounded-lg p-2 bg-black/20">
                        <div className="flex justify-between items-center text-[7px] text-white/40 uppercase tracking-widest font-mono">
                          <span>CUBIERTA TÉRMICA</span>
                          <Flame size={9} className="text-[#FFD700]" />
                        </div>
                        <span className="font-mono text-sm font-bold text-white mt-0.5">
                          {calculatedMetrics.temp}°C
                        </span>
                        <svg className="w-full h-4 mt-0.5 overflow-visible" viewBox="0 0 100 20">
                          <path 
                            d={generateSparklinePath(1, 3.5)} 
                            fill="none" 
                            stroke="#FFD700" 
                            strokeWidth="1" 
                            className="opacity-70" 
                          />
                        </svg>
                      </div>

                      {/* Metric 3: Power Draw */}
                      <div className="flex flex-col gap-0.5 border border-white/5 rounded-lg p-2 bg-black/20">
                        <div className="flex justify-between items-center text-[7px] text-white/40 uppercase tracking-widest font-mono">
                          <span>POTENCIA ABSORBIDA</span>
                          <Zap size={9} className="text-[#FFD700]" />
                        </div>
                        <span className="font-mono text-sm font-bold text-white mt-0.5">
                          {calculatedMetrics.power} {calculatedMetrics.powerUnit || 'W'}
                        </span>
                        <svg className="w-full h-4 mt-0.5 overflow-visible" viewBox="0 0 100 20">
                          <path 
                            d={generateSparklinePath(2, 4.5)} 
                            fill="none" 
                            stroke={selectedTech.color} 
                            strokeWidth="1" 
                            className="opacity-70" 
                          />
                        </svg>
                      </div>

                      {/* Metric 4: Custom Extra Metric / Jitter */}
                      <div className="flex flex-col gap-0.5 border border-white/5 rounded-lg p-2 bg-black/20">
                        <div className="flex justify-between items-center text-[7px] text-white/40 uppercase tracking-widest font-mono">
                          <span>{selectedTech.id === 'plc' ? 'JITTER DE CICLO' : (calculatedMetrics.extraName1 || 'SYSTEM STATUS').toUpperCase()}</span>
                          <Activity size={9} style={{ color: '#10B981' }} />
                        </div>
                        <span className="font-mono text-[11px] font-bold text-white mt-0.5 truncate">
                          {selectedTech.id === 'plc' 
                            ? `${((techParams.plc.ciclo * 0.04) + Math.sin(graphTicks * 0.1) * 0.002).toFixed(3)} ms` 
                            : calculatedMetrics.extraVal1}
                        </span>
                        <svg className="w-full h-4 mt-0.5 overflow-visible" viewBox="0 0 100 20">
                          <path 
                            d={generateSparklinePath(3, 3)} 
                            fill="none" 
                            stroke="#10B981" 
                            strokeWidth="1" 
                            className="opacity-70" 
                          />
                        </svg>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Right Panel: Advanced HUD Parameters, Logs Terminal & Mission Controls (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-3 border-l border-white/5 pl-0 lg:pl-4">
                  
                  {/* Configurable Parameters Panel */}
                  <div className="border border-white/5 rounded-xl p-3 bg-black/30">
                    <h4 className="font-mono text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4 pb-1.5 border-b border-white/5 flex items-center gap-1.5">
                      <Sliders size={11} style={{ color: selectedTech.color }} /> [ SYSTEM_ADJUSTABLE_PARAMETERS ]
                    </h4>
                    
                    <div className="flex flex-col gap-3">
                      {selectedTech.id === 'sistemas-inteligentes' && (
                        <>
                          <div className="flex flex-col gap-1.5">
                            <span className="text-white/40 uppercase text-[9px]">Procesador Edge</span>
                            <div className="flex gap-1.5">
                              {['ARM A72', 'ARM A53', 'Intel i5'].map((proc) => (
                                <button
                                  key={proc}
                                  onClick={() => {
                                    playBeep(850, 'sine', 0.05);
                                    updateParam('sistemas', 'procesador', proc);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded font-mono text-[9px] tracking-wider border transition-all cursor-pointer"
                                  style={getBtnStyle(techParams.sistemas.procesador === proc, selectedTech.color)}
                                >
                                  {proc.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-1.5 border-t border-white/5 pt-2">
                            <span className="text-white/40 uppercase text-[9px]">Canales de Entrada</span>
                            <div className="flex gap-1.5">
                              {['16 Canales', '32 Canales'].map((ch) => (
                                <button
                                  key={ch}
                                  onClick={() => {
                                    playBeep(800, 'sine', 0.05);
                                    updateParam('sistemas', 'entradas', ch);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded font-mono text-[9px] tracking-wider border transition-all cursor-pointer"
                                  style={getBtnStyle(techParams.sistemas.entradas === ch, selectedTech.color)}
                                >
                                  {ch.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {selectedTech.id === 'plc' && (
                        <>
                          <div className="flex flex-col gap-1.5">
                            <span className="text-white/40 uppercase text-[9px]">Protocolo Bus</span>
                            <div className="flex gap-1.5">
                              {['Profinet', 'EtherCAT', 'Modbus TCP'].map((proto) => (
                                <button
                                  key={proto}
                                  onClick={() => {
                                    playBeep(850, 'sine', 0.05);
                                    updateParam('plc', 'protocolo', proto);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded font-mono text-[9px] tracking-wider border transition-all cursor-pointer"
                                  style={getBtnStyle(techParams.plc.protocolo === proto, selectedTech.color)}
                                >
                                  {proto.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 border-t border-white/5 pt-2">
                            <span className="text-white/40 uppercase text-[9px]">Redundancia de Core</span>
                            <div className="flex gap-1.5">
                              {['Activa', 'Inactiva'].map((red) => (
                                <button
                                  key={red}
                                  onClick={() => {
                                    playBeep(800, 'sine', 0.05);
                                    updateParam('plc', 'redundancia', red);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded font-mono text-[9px] tracking-wider border transition-all cursor-pointer"
                                  style={getBtnStyle(techParams.plc.redundancia === red, selectedTech.color)}
                                >
                                  {red.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 border-t border-white/5 pt-2">
                            <div className="flex items-center justify-between">
                              <span className="text-white/40 uppercase text-[9px]">Tiempo de Ciclo RTOS</span>
                              <span className="font-bold font-mono text-[10px]" style={{ color: selectedTech.color }}>{techParams.plc.ciclo} ms</span>
                            </div>
                            <input 
                              type="range" 
                              min="0.1" 
                              max="5.0" 
                              step="0.1"
                              value={techParams.plc.ciclo}
                              onChange={(e) => {
                                playBeep(600 + e.target.value * 100, 'sine', 0.03);
                                updateParam('plc', 'ciclo', parseFloat(e.target.value));
                              }}
                              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                              style={{ accentColor: selectedTech.color }}
                            />
                            <span className="text-[7.5px] text-white/30 font-mono tracking-wide leading-tight">Tiempo de ciclo en tiempo real (RTOS). Valor óptimo: &lt; 1.00 ms</span>
                          </div>
                        </>
                      )}

                      {selectedTech.id === 'control' && (
                        <>
                          <div className="flex flex-col gap-1.5">
                            <span className="text-white/40 uppercase text-[9px]">Tensión de Red</span>
                            <div className="flex gap-1.5">
                              {['480V', '220V', '110V'].map((volt) => (
                                <button
                                  key={volt}
                                  onClick={() => {
                                    playBeep(850, 'sine', 0.05);
                                    updateParam('control', 'tension', volt);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded font-mono text-[9px] tracking-wider border transition-all cursor-pointer"
                                  style={getBtnStyle(techParams.control.tension === volt, selectedTech.color)}
                                >
                                  {volt}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 border-t border-white/5 pt-2">
                            <span className="text-white/40 uppercase text-[9px]">Filtro de Armónicos</span>
                            <div className="flex gap-1.5">
                              {['Activo', 'Pasivo', 'Ninguno'].map((filt) => (
                                <button
                                  key={filt}
                                  onClick={() => {
                                    playBeep(800, 'sine', 0.05);
                                    updateParam('control', 'filtrado', filt);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded font-mono text-[9px] tracking-wider border transition-all cursor-pointer"
                                  style={getBtnStyle(techParams.control.filtrado === filt, selectedTech.color)}
                                >
                                  {filt.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 border-t border-white/5 pt-2">
                            <span className="text-white/40 uppercase text-[9px]">Enfriamiento de GABINETE</span>
                            <div className="flex gap-1.5">
                              {['Líquido', 'Aire', 'Convección'].map((cool) => (
                                <button
                                  key={cool}
                                  onClick={() => {
                                    playBeep(800, 'sine', 0.05);
                                    updateParam('control', 'enfriamiento', cool);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded font-mono text-[9px] tracking-wider border transition-all cursor-pointer"
                                  style={getBtnStyle(techParams.control.enfriamiento === cool, selectedTech.color)}
                                >
                                  {cool.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {selectedTech.id === 'monitoreo' && (
                        <>
                          <div className="flex flex-col gap-1.5">
                            <span className="text-white/40 uppercase text-[9px]">Enlace Red</span>
                            <div className="flex gap-1.5">
                              {['Starlink', 'Cellular', 'Inmarsat'].map((carrier) => (
                                <button
                                  key={carrier}
                                  onClick={() => {
                                    playBeep(850, 'sine', 0.05);
                                    updateParam('monitoreo', 'red', carrier);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded font-mono text-[9px] tracking-wider border transition-all cursor-pointer"
                                  style={getBtnStyle(techParams.monitoreo.red === carrier, selectedTech.color)}
                                >
                                  {carrier.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 border-t border-white/5 pt-2">
                            <span className="text-white/40 uppercase text-[9px]">Cifrado Protocolo</span>
                            <div className="flex gap-1.5">
                              {['AES-256', 'ChaCha20', 'DES'].map((enc) => (
                                <button
                                  key={enc}
                                  onClick={() => {
                                    playBeep(800, 'sine', 0.05);
                                    updateParam('monitoreo', 'encriptacion', enc);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded font-mono text-[9px] tracking-wider border transition-all cursor-pointer"
                                  style={getBtnStyle(techParams.monitoreo.encriptacion === enc, selectedTech.color)}
                                >
                                  {enc.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 border-t border-white/5 pt-2">
                            <span className="text-white/40 uppercase text-[9px]">Protocolo IoT</span>
                            <div className="flex gap-1.5">
                              {['MQTT', 'OPC-UA', 'HTTPS'].map((proto) => (
                                <button
                                  key={proto}
                                  onClick={() => {
                                    playBeep(800, 'sine', 0.05);
                                    updateParam('monitoreo', 'protocolos', proto);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded font-mono text-[9px] tracking-wider border transition-all cursor-pointer"
                                  style={getBtnStyle(techParams.monitoreo.protocolos === proto, selectedTech.color)}
                                >
                                  {proto.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {selectedTech.id === 'ia' && (
                        <>
                          <div className="flex flex-col gap-1.5">
                            <span className="text-white/40 uppercase text-[9px]">Coprocesador AI</span>
                            <div className="flex gap-1.5">
                              {['Coral TPU', 'Jetson Orin', 'CPU Node'].map((acel) => (
                                <button
                                  key={acel}
                                  onClick={() => {
                                    playBeep(850, 'sine', 0.05);
                                    updateParam('ia', 'acelerador', acel);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded font-mono text-[9px] tracking-wider border transition-all cursor-pointer"
                                  style={getBtnStyle(techParams.ia.acelerador === acel, selectedTech.color)}
                                >
                                  {acel.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 border-t border-white/5 pt-2">
                            <span className="text-white/40 uppercase text-[9px]">Red de Backbone</span>
                            <div className="flex gap-1.5">
                              {['YOLOv8-Nano', 'YOLOv8-Medium', 'ResNet-50'].map((arch) => (
                                <button
                                  key={arch}
                                  onClick={() => {
                                    playBeep(800, 'sine', 0.05);
                                    updateParam('ia', 'arquitectura', arch);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded font-mono text-[9px] tracking-wider border transition-all cursor-pointer"
                                  style={getBtnStyle(techParams.ia.arquitectura === arch, selectedTech.color)}
                                >
                                  {arch.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 border-t border-white/5 pt-2">
                            <div className="flex items-center justify-between">
                              <span className="text-white/40 uppercase text-[9px]">Umbral de Filtro (Confianza)</span>
                              <span className="font-bold font-mono text-[10px]" style={{ color: selectedTech.color }}>{confThreshold}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="50" 
                              max="99" 
                              step="1"
                              value={confThreshold}
                              onChange={(e) => {
                                playBeep(600 + e.target.value * 2, 'sine', 0.03);
                                setConfThreshold(parseInt(e.target.value));
                              }}
                              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                              style={{ accentColor: selectedTech.color }}
                            />
                            <span className="text-[8px] text-white/30 font-mono italic tracking-wide mt-0.5">
                              Ajusta el umbral mínimo de confianza para detecciones.
                            </span>
                          </div>
                        </>
                      )}

                      {selectedTech.id === 'colaborativa' && (
                        <>
                          <div className="flex flex-col gap-1.5">
                            <span className="text-white/40 uppercase text-[9px]">Modo de Operación</span>
                            <div className="flex gap-1.5">
                              {['Colaborativo', 'Asistido', 'Autónomo'].map((m) => (
                                <button
                                  key={m}
                                  onClick={() => {
                                    playBeep(850, 'sine', 0.05);
                                    updateParam('colaborativa', 'modo', m);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded font-mono text-[9px] tracking-wider border transition-all cursor-pointer"
                                  style={getBtnStyle(techParams.colaborativa.modo === m, selectedTech.color)}
                                >
                                  {m.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 border-t border-white/5 pt-2">
                            <span className="text-white/40 uppercase text-[9px]">Sensibilidad Colisión</span>
                            <div className="flex gap-1.5">
                              {['Alta', 'Media', 'Baja'].map((sens) => (
                                <button
                                  key={sens}
                                  onClick={() => {
                                    playBeep(800, 'sine', 0.05);
                                    updateParam('colaborativa', 'sensibilidad', sens);
                                  }}
                                  className="flex-1 py-1.5 px-2 rounded font-mono text-[9px] tracking-wider border transition-all cursor-pointer"
                                  style={getBtnStyle(techParams.colaborativa.sensibilidad === sens, selectedTech.color)}
                                >
                                  {sens.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 border-t border-white/5 pt-2">
                            <div className="flex items-center justify-between">
                              <span className="text-white/40 uppercase text-[9px]">Velocidad Máxima Cobot</span>
                              <span className="font-bold font-mono text-[10px]" style={{ color: selectedTech.color }}>{techParams.colaborativa.velocidad} m/s</span>
                            </div>
                            <input 
                              type="range" 
                              min="0.1" 
                              max="2.0" 
                              step="0.1"
                              value={techParams.colaborativa.velocidad}
                              onChange={(e) => {
                                playBeep(600 + e.target.value * 200, 'sine', 0.03);
                                updateParam('colaborativa', 'velocidad', parseFloat(e.target.value));
                              }}
                              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                              style={{ accentColor: selectedTech.color }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Terminal Log Screen */}
                  <div className="mb-2 flex-grow flex flex-col justify-between">
                    <div className="flex items-center justify-between font-mono text-[10px] text-white/40 uppercase pb-1.5 border-b border-white/5 mb-1.5">
                      <span>[ LIVE_SYSTEM_LOGS ]</span>
                      {isDiagnosticRunning && (
                        <span className="text-[#FFD700] animate-pulse flex items-center gap-1.5">
                          <RefreshCw size={10} className="animate-spin" /> {diagnosticProgress}%
                        </span>
                      )}
                    </div>
                    
                    <div className="w-full h-20 bg-black/70 border border-white/5 rounded p-2.5 font-mono text-[9px] text-emerald-400 overflow-y-auto leading-relaxed shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
                      {logs.length === 0 ? (
                        <div className="text-white/20">System idle. Interactive parameter modifications will update telemetry logs...</div>
                      ) : (
                        logs.map((log, lIdx) => (
                          <div key={lIdx} className={log.includes('[SUCCESS]') || log.includes('[AI_SORT]') ? 'text-cyan-400 font-bold' : log.includes('[WARNING]') || log.includes('[REJECT]') ? 'text-[#FFD700] animate-pulse font-bold' : log.includes('[OK]') ? 'text-emerald-400 font-semibold' : 'text-emerald-400/90'}>
                            {log}
                          </div>
                        ))
                      )}
                      <div ref={terminalEndRef} />
                    </div>
                  </div>

                  {/* Diagnostics Controls Panel */}
                  <div>
                    <h4 className="font-mono text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 pb-1 border-b border-white/5">
                      [ HUD_MISSION_CONTROLS ]
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => {
                          playBeep(1000, 'sine', 0.1);
                          runDiagnostic();
                        }}
                        disabled={isDiagnosticRunning}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded font-mono text-[10px] tracking-widest uppercase border transition-all cursor-pointer ${
                          isDiagnosticRunning
                            ? 'bg-white/5 text-white/20 border-white/5'
                            : 'hover:bg-white/[0.04]'
                        }`}
                        style={isDiagnosticRunning ? {} : {
                          backgroundColor: `${selectedTech.color}1a`,
                          color: selectedTech.color,
                          borderColor: `${selectedTech.color}4d`,
                          boxShadow: `0 0 15px ${selectedTech.color}1a`
                        }}
                      >
                        <Play size={11} /> INI_DIAG
                      </button>
                      
                      <button
                        onClick={() => {
                          playBeep(600, 'sine', 0.1);
                          setSelectedTech(null);
                          setIsDiagnosticRunning(false);
                          setLogs([]);
                        }}
                        className="flex items-center justify-center gap-2 p-2.5 rounded font-mono text-[10px] tracking-widest uppercase border border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer"
                      >
                        <X size={11} /> ESC_HUD
                      </button>
                    </div>
                  </div>

                </div>

              </div>

                  {/* Telemetry Footer Info */}
                  <div className="mt-4 pt-2.5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-center font-mono text-[9px] text-white/30 uppercase tracking-widest gap-2">
                    {selectedTech.id === 'plc' ? (
                      <div className="flex flex-wrap items-center gap-4 text-[7.5px] font-bold">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />CONEXIÓN SEGURA: CONECTADA</span>
                        <span className="flex items-center gap-1 text-[#00D2FF]"><span className="w-1 h-1 rounded-full bg-[#00D2FF]" />PROTOCOLO: {techParams.plc.protocolo.toUpperCase()}</span>
                        <span className="flex items-center gap-1" style={{ color: techParams.plc.redundancia === 'Activa' ? '#10B981' : '#ef4444' }}>
                          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: techParams.plc.redundancia === 'Activa' ? '#10B981' : '#ef4444' }} />
                          REDUNDANCIA: {techParams.plc.redundancia.toUpperCase()}
                        </span>
                        <span className="flex items-center gap-1 text-emerald-400"><span className="w-1 h-1 rounded-full bg-emerald-400" />SINCRONIZACIÓN: OK</span>
                      </div>
                    ) : (
                      <span>CONEXIÓN SEGURA: CONECTADA</span>
                    )}
                    <span>SMQ SYSTEMS CORPORATION • DIAGNOSTICS DECK_V2</span>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl font-mono text-[10px]">
          {/* Header Bar */}
          <div className="absolute top-4 left-6 flex flex-col gap-1 select-none pointer-events-none">
            <span className="text-white/40 tracking-wider text-[8px] uppercase">SYSTEM // DIAGNOSTIC_THEATER_MODE</span>
            <span className="text-[#FFD700] text-sm font-bold tracking-widest uppercase">
              {selectedTech ? selectedTech.title : 'DIGITAL_TWIN'}
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-6 px-3 py-2 bg-black/80 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 rounded text-white/60 hover:text-red-400 transition-all cursor-pointer z-50 flex items-center justify-center font-bold text-[10px]"
            title="Cerrar (Esc)"
          >
            <X size={12} className="mr-1.5" /> CERRAR [ESC]
          </button>

          {/* Cinematic Canvas Container */}
          <div 
            className="relative w-[92vw] h-[82vh] border rounded-xl overflow-hidden bg-black/40 flex items-center justify-center"
            style={{ 
              borderColor: `${selectedTech?.color || '#00D2FF'}33`, 
              boxShadow: `0 0 50px ${(selectedTech?.color || '#00D2FF')}1a` 
            }}
          >
            {/* Tech grid overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[size:16px_16px]"
              style={{
                backgroundImage: `linear-gradient(${selectedTech?.color || '#00D2FF'}33 1px, transparent 1px), linear-gradient(90deg, ${selectedTech?.color || '#00D2FF'}33 1px, transparent 1px)`
              }}
            />
            
            <CanvasErrorBoundary>
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full cursor-grab active:cursor-grabbing">
                <ambientLight intensity={1.1} />
                <pointLight position={[10, 10, 10]} intensity={2.0} />
                <directionalLight position={[-5, 5, 5]} intensity={1.5} />
                
                <React.Suspense fallback={
                  <FallbackMesh 
                    rotationSpeed={rotationSpeeds[selectedTech?.id] ?? 1.0} 
                    rotate={isEditorMode ? (glbTransforms[selectedTech?.id]?.rotate ?? false) : true}
                    scale={glbTransforms[selectedTech?.id]?.scale ?? 1.5} 
                    position={[
                      glbTransforms[selectedTech?.id]?.x ?? 0,
                      glbTransforms[selectedTech?.id]?.y ?? 0,
                      glbTransforms[selectedTech?.id]?.z ?? 0
                    ]} 
                  />
                }>
                  {glbModels[selectedTech?.id] ? (
                    <ModelRenderer 
                      url={glbModels[selectedTech?.id]} 
                      rotationSpeed={rotationSpeeds[selectedTech?.id] ?? 1.0} 
                      rotate={isEditorMode ? (glbTransforms[selectedTech?.id]?.rotate ?? false) : true}
                      scale={glbTransforms[selectedTech?.id]?.scale ?? 1.5} 
                      position={[
                        glbTransforms[selectedTech?.id]?.x ?? 0,
                        glbTransforms[selectedTech?.id]?.y ?? 0,
                        glbTransforms[selectedTech?.id]?.z ?? 0
                      ]} 
                    />
                  ) : (
                    <FallbackMesh 
                      rotationSpeed={rotationSpeeds[selectedTech?.id] ?? 1.0} 
                      rotate={isEditorMode ? (glbTransforms[selectedTech?.id]?.rotate ?? false) : true}
                      scale={glbTransforms[selectedTech?.id]?.scale ?? 1.5} 
                      position={[
                        glbTransforms[selectedTech?.id]?.x ?? 0,
                        glbTransforms[selectedTech?.id]?.y ?? 0,
                        glbTransforms[selectedTech?.id]?.z ?? 0
                      ]} 
                    />
                  )}
                </React.Suspense>

                {(glbTransforms[selectedTech?.id]?.grid ?? true) && (
                  <gridHelper args={[100, 100, '#00D2FF', '#222222']} position={[0, -1.2, 0]} />
                )}

                <OrbitControls enableZoom={true} enablePan={true} />
              </Canvas>
            </CanvasErrorBoundary>

            {/* Corner decorative brackets in fullscreen */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#00D2FF]/40" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#00D2FF]/40" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#00D2FF]/40" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#00D2FF]/40" />
            
            {/* Controls help text */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-white/30 tracking-widest pointer-events-none uppercase">
              Arrastra con Clic Izq para Orbitar • Scroll para Zoom • Clic Der + Arrastrar para Desplazar
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TechnologySection;
