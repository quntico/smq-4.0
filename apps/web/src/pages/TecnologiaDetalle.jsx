import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, Network, TrendingUp, Target, Cpu, ArrowLeft, Activity, 
  AlertTriangle, Info, CheckCircle2, Factory, BarChart2, Settings,
  DollarSign, Clock, ShieldCheck, Image as ImageIcon, Wifi, Zap, Shield,
  Box, LineChart, TrendingDown, Database, Gauge, Leaf, Cloud, ClipboardCheck, ArrowDownCircle,
  Star, LayoutDashboard, Sliders, Bell, Maximize, Recycle
} from 'lucide-react';
import Footer from '@/components/Footer.jsx';
import DecipherText from '@/components/DecipherText.jsx';
import { useCMS } from '@/context/CMSContext.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { uploadFile } from '@/lib/storage.js';

const techList = [
  { id: 'ia', label: 'Inteligencia Artificial', icon: BrainCircuit, color: '#8B5CF6' },
  { id: 'smart-factory', label: 'Smart Factory', icon: Factory, color: '#10B981' },
  { id: 'digital-twin', label: 'Digital Twin', icon: Activity, color: '#06B6D4' },
  { id: 'plc-motion', label: 'PLC + Motion', icon: Cpu, color: '#EF4444' },
  { id: 'iiot-edge', label: 'IIoT + Edge', icon: Wifi, color: '#3B82F6' },
  { id: 'energia-inteligente', label: 'Energía Inteligente', icon: Zap, color: '#F97316' },
  { id: 'smq-os', label: 'SMQ OS™', icon: Shield, color: '#EAB308' },
  { id: 'economia-circular', label: 'Economía Circular', icon: Recycle, color: '#14B8A6' },
];

const technologyData = {
  ia: {
    number: '01',
    title: 'INTELIGENCIA ARTIFICIAL',
    subtitle: 'ALGORITMOS DE APRENDIZAJE PROFUNDO\nY OPTIMIZACIÓN DE PROCESOS PRODUCTIVOS.',
    color: '#8B5CF6', // Purple
    icon: BrainCircuit,
    robotImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    features: [
      { icon: Network, title: 'APRENDIZAJE PROFUNDO', desc: 'Modelos avanzados que analizan grandes volúmenes de datos para detectar patrones y mejorar continuamente.' },
      { icon: TrendingUp, title: 'OPTIMIZACIÓN', desc: 'Algoritmos que encuentran la mejor configuración de procesos para maximizar rendimiento y minimizar costos.' },
      { icon: Target, title: 'DECISIONES INTELIGENTES', desc: 'Sistemas que recomiendan acciones en tiempo real para una operación más eficiente y segura.' }
    ],
    footerType: 'applications',
    applications: 'Control avanzado de procesos, detección de anomalías, mantenimiento predictivo, control de calidad visual y optimización en tiempo real.'
  },
  'smart-factory': {
    number: '02',
    title: 'SMART FACTORY',
    subtitle: 'LÍNEAS TOTALMENTE INTERCONECTADAS\nCON TOMA DE DECISIONES AUTÓNOMA.',
    color: '#10B981', // Emerald
    icon: Factory,
    robotImage: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=1200&q=80',
    features: [
      { icon: Network, title: 'INTERCONECTIVIDAD TOTAL', desc: 'Máquinas, sensores y sistemas comunicados en tiempo real a través de IIoT y protocolos industriales.' },
      { icon: BarChart2, title: 'DECISIONES AUTÓNOMAS', desc: 'Sistemas inteligentes que analizan datos y toman decisiones para optimizar la producción sin intervención humana.' },
      { icon: Settings, title: 'PRODUCCIÓN ADAPTABLE', desc: 'Líneas flexibles que se adaptan a cambios de demanda, productos y condiciones operativas.' }
    ],
    footerType: 'metrics',
    footerTitle: 'RESULTADOS CLAVE',
    metrics: [
      { icon: TrendingUp, value: '+15%', label: 'Eficiencia\nOperativa' },
      { icon: DollarSign, value: '-20%', label: 'Costos de\nProducción' },
      { icon: Clock, value: '+25%', label: 'Disponibilidad\nde Activos' },
      { icon: ShieldCheck, value: '100%', label: 'Trazabilidad\nen tiempo real' }
    ]
  },
  'digital-twin': {
    number: '03',
    title: 'DIGITAL TWIN',
    subtitle: 'REPLICACIÓN VIRTUAL Y SIMULACIÓN EN\nTIEMPO REAL DEL RENDIMIENTO DE PLANTA.',
    color: '#06B6D4', // Cyan
    icon: Activity,
    robotImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    features: [
      { icon: Box, title: 'RÉPLICA VIRTUAL', desc: 'Modelos 3D exactos de activos y procesos para simular condiciones reales de operación.' },
      { icon: LineChart, title: 'SIMULACIÓN AVANZADA', desc: 'Pruebas de escenarios "what-if" para anticipar resultados y optimizar decisiones.' },
      { icon: Target, title: 'RENDIMIENTO EN TIEMPO REAL', desc: 'Monitoreo continuo que compara el comportamiento real contra el modelo virtual para detección de desviaciones.' }
    ],
    footerType: 'metrics',
    footerTitle: 'BENEFICIOS CLAVE',
    metrics: [
      { icon: TrendingUp, value: '+20%', label: 'Disponibilidad\nde planta' },
      { icon: TrendingDown, value: '-15%', label: 'Paros no\nplanificados' },
      { icon: Settings, value: '+25%', label: 'Eficiencia\noperativa' },
      { icon: Shield, value: '', label: 'Mayor vida útil\nde activos' },
      { icon: DollarSign, value: '', label: 'Reducción de\ncostos de\nmantenimiento' }
    ]
  },
  'plc-motion': {
    number: '04',
    title: 'PLC + MOTION',
    subtitle: 'CONTROLADORES DE TIEMPO REAL Y CONTROL\nDE MOVIMIENTO DE EXTREMA PRECISIÓN.',
    color: '#EF4444', // Red
    icon: Cpu,
    robotImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80',
    features: [
      { icon: Cpu, title: 'CONTROL EN TIEMPO REAL', desc: 'Ejecución determinística con ciclos de control ultrarrápidos y alta confiabilidad.' },
      { icon: Target, title: 'MOTION CONTROL AVANZADO', desc: 'Sincronización precisa de ejes, interpolación compleja y control de trayectoria de alto desempeño.' },
      { icon: Network, title: 'INTEGRACIÓN TOTAL', desc: 'PLCs, drives y redes industriales trabajando en conjunto para máxima adaptabilidad.' }
    ],
    footerType: 'metrics',
    footerTitle: 'BENEFICIOS CLAVE',
    metrics: [
      { icon: Target, value: '', label: 'Precisión extrema\nen cada movimiento' },
      { icon: Clock, value: '', label: 'Respuesta en\ntiempo real' },
      { icon: ShieldCheck, value: '', label: 'Máxima confiabilidad\ny seguridad' },
      { icon: TrendingUp, value: '', label: 'Mayor productividad\ny eficiencia' }
    ]
  },
  'iiot-edge': {
    number: '05',
    title: 'IIOT + EDGE',
    subtitle: 'PROCESAMIENTO DE DATOS EN EL BORDE Y\nTELEMETRÍA DE ALTA SEGURIDAD.',
    color: '#3B82F6', // Blue
    icon: Wifi,
    robotImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    features: [
      { icon: Database, title: 'DATOS EN EL BORDE', desc: 'Procesamiento local para reducir latencia y dependencia de la nube.' },
      { icon: Shield, title: 'TELEMETRÍA SEGURA', desc: 'Transmisión cifrada y autenticada para garantizar integridad y disponibilidad.' },
      { icon: Network, title: 'CONECTIVIDAD INDUSTRIAL', desc: 'Integración con IIoT, 5G, VPN y protocolos industriales.' }
    ],
    footerType: 'metrics',
    footerTitle: 'BENEFICIOS CLAVE',
    metrics: [
      { icon: Gauge, value: '', label: 'Menor latencia en\nla toma de decisiones' },
      { icon: ShieldCheck, value: '', label: 'Mayor seguridad\nde la información' },
      { icon: DollarSign, value: '', label: 'Reducción de costos\noperativos' },
      { icon: TrendingUp, value: '', label: 'Alta disponibilidad\ny escalabilidad' }
    ]
  },
  'energia-inteligente': {
    number: '06',
    title: 'ENERGÍA INTELIGENTE',
    subtitle: 'MONITOREO DE HUELLA DE CARBONO Y\nOPTIMIZACIÓN DE CONSUMO ENERGÉTICO.',
    color: '#F97316', // Orange
    icon: Zap,
    robotImage: 'https://images.unsplash.com/photo-1509391366360-1e97d5261688?auto=format&fit=crop&w=1200&q=80',
    features: [
      { icon: Gauge, title: 'MONITOREO INTELIGENTE', desc: 'Supervisión continua de consumo energético en tiempo real con integración de múltiples fuentes.' },
      { icon: BarChart2, title: 'OPTIMIZACIÓN DE CONSUMO', desc: 'Algoritmos avanzados que ajustan automáticamente el consumo para maximizar la eficiencia.' },
      { icon: Leaf, title: 'SOSTENIBILIDAD MEDIBLE', desc: 'Cálculo y reducción de huella de carbono con reportes y cumplimiento ambiental.' }
    ],
    footerType: 'metrics',
    footerTitle: 'BENEFICIOS CLAVE',
    footerIcon: Leaf,
    metrics: [
      { icon: ArrowDownCircle, value: '', label: 'Reducción de costos\nenergéticos' },
      { icon: Cloud, value: '', label: 'Menor huella\nde carbono' },
      { icon: Settings, value: '', label: 'Mayor eficiencia\noperativa' },
      { icon: ClipboardCheck, value: '', label: 'Cumplimiento normativo\ny reportes automáticos' }
    ]
  },
  'smq-os': {
    number: '07',
    title: 'PLATAFORMA SMQ OS™',
    subtitle: 'EL SISTEMA OPERATIVO PROPIETARIO PARA\nLA GESTIÓN DE PLANTAS INDUSTRIALES.',
    color: '#EAB308', // Yellow
    icon: Shield,
    robotImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    features: [
      { icon: LayoutDashboard, title: 'INTERFAZ UNIFICADA', desc: 'Control centralizado de todos los procesos de la planta desde una única plataforma.' },
      { icon: Sliders, title: 'CONTROL EN TIEMPO REAL', desc: 'Supervisión y ajuste de parámetros críticos con respuesta inmediata.' },
      { icon: Bell, title: 'ALARMAS INTELIGENTES', desc: 'Detección avanzada de anomalías y notificaciones según prioridad.' },
      { icon: Database, title: 'DATOS HISTÓRICOS', desc: 'Almacenamiento seguro y análisis de datos para mejora continua y trazabilidad.' }
    ],
    footerType: 'metrics',
    footerTitle: 'BENEFICIOS CLAVE',
    footerIcon: Star,
    metrics: [
      { icon: Gauge, value: '', label: 'Visibilidad total\nde la operación' },
      { icon: BrainCircuit, value: '', label: 'Toma de decisiones\nbasada en datos' },
      { icon: Clock, value: '', label: 'Reducción de paros\nno planificados' },
      { icon: Maximize, value: '', label: 'Escalabilidad y\nadaptabilidad' }
    ]
  },
  'economia-circular': {
    number: '08',
    title: 'ECONOMÍA CIRCULAR',
    subtitle: 'VALORIZACIÓN DE RESIDUOS Y PROCESOS\nSIN DESPERDICIO (ZERO WASTE).',
    color: '#14B8A6', // Teal
    icon: Recycle,
    robotImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
    features: [
      { icon: Leaf, title: 'VALORIZACIÓN', desc: 'Diseñamos sistemas que convierten los subproductos industriales en recursos valiosos.' },
      { icon: Network, title: 'SEPARACIÓN ÓPTICA', desc: 'Espectrometría NIR de alta resolución para clasificar polímeros por firma química.' },
      { icon: Settings, title: 'SOSTENIBILIDAD ESG', desc: 'Procesos de lavado, molienda y extrusión alineados con las normas y estándares de cumplimiento global.' }
    ],
    footerType: 'metrics',
    footerTitle: 'BENEFICIOS CLAVE',
    footerIcon: Leaf,
    metrics: [
      { icon: Leaf, value: '95%', label: 'Recuperación\nde Material' },
      { icon: Activity, value: 'Circular', label: 'Cierre de Ciclo\n(Bottle-to-Bottle)' },
      { icon: Zap, value: '>70%', label: 'Ahorro de Agua\nFresca' },
      { icon: ShieldCheck, value: 'ESG', label: 'Cumplimiento y\nCertificación' }
    ]
  }
};

technologyData['inteligencia-artificial'] = technologyData.ia;
technologyData['economia-circular-alias'] = technologyData['economia-circular'];

const enTechnologyData = {
  ia: {
    title: 'ARTIFICIAL INTELLIGENCE',
    subtitle: 'DEEP LEARNING ALGORITHMS\nAND PRODUCTIVE PROCESS OPTIMIZATION.',
    features: [
      { title: 'DEEP LEARNING', desc: 'Advanced models that analyze large data volumes to detect patterns and improve continuously.' },
      { title: 'OPTIMIZATION', desc: 'Algorithms that find the best process configuration to maximize performance and minimize costs.' },
      { title: 'SMART DECISIONS', desc: 'Systems that recommend real-time actions for a safer and more efficient operation.' }
    ],
    footerTitle: 'APPLICATIONS',
    applications: 'Advanced process control, anomaly detection, predictive maintenance, visual quality control, and real-time optimization.'
  },
  'smart-factory': {
    title: 'SMART FACTORY',
    subtitle: 'FULLY INTERCONNECTED LINES\nWITH AUTONOMOUS DECISION MAKING.',
    features: [
      { title: 'TOTAL INTERCONNECTIVITY', desc: 'Machines, sensors, and systems communicating in real-time through IIoT and industrial protocols.' },
      { title: 'AUTONOMOUS DECISIONS', desc: 'Smart systems that analyze data and make decisions to optimize production without human intervention.' },
      { title: 'ADAPTABLE PRODUCTION', desc: 'Flexible lines that adapt to changes in demand, products, and operational conditions.' }
    ],
    footerTitle: 'KEY RESULTS',
    metrics: [
      { label: 'Operational\nEfficiency' },
      { label: 'Production\nCosts' },
      { label: 'Asset\nAvailability' },
      { label: 'Real-time\nTraceability' }
    ]
  },
  'digital-twin': {
    title: 'DIGITAL TWIN',
    subtitle: 'VIRTUAL REPLICATION AND REAL-TIME\nPLANT PERFORMANCE SIMULATION.',
    features: [
      { title: 'VIRTUAL REPLICA', desc: 'Exact 3D models of assets and processes to simulate real operational conditions.' },
      { title: 'ADVANCED SIMULATION', desc: 'What-if scenario testing to anticipate results and optimize decisions.' },
      { title: 'REAL-TIME PERFORMANCE', desc: 'Continuous monitoring comparing real behavior against the virtual model for deviation detection.' }
    ],
    footerTitle: 'KEY BENEFITS',
    metrics: [
      { label: 'Plant\nAvailability' },
      { label: 'Unplanned\nDowntime' },
      { label: 'Operational\nEfficiency' },
      { label: 'Longer Asset\nLifespan' },
      { label: 'Maintenance Cost\nReduction' }
    ]
  },
  'plc-motion': {
    title: 'PLC + MOTION',
    subtitle: 'REAL-TIME CONTROLLERS AND\nEXTREME PRECISION MOTION CONTROL.',
    features: [
      { title: 'REAL-TIME CONTROL', desc: 'Deterministic execution with ultra-fast control cycles and high reliability.' },
      { title: 'ADVANCED MOTION CONTROL', desc: 'Precise axis synchronization, complex interpolation, and high-performance trajectory control.' },
      { title: 'TOTAL INTEGRATION', desc: 'PLCs, drives, and industrial networks working together for maximum adaptability.' }
    ],
    footerTitle: 'KEY BENEFITS',
    metrics: [
      { label: 'Extreme precision\nin every movement' },
      { label: 'Real-time\nresponse' },
      { label: 'Maximum reliability\nand safety' },
      { label: 'Higher productivity\nand efficiency' }
    ]
  },
  'iiot-edge': {
    title: 'IIOT + EDGE',
    subtitle: 'EDGE DATA PROCESSING AND\nHIGH-SECURITY TELEMETRY.',
    features: [
      { title: 'DATA AT THE EDGE', desc: 'Local processing to reduce latency and cloud dependency.' },
      { title: 'SECURE TELEMETRY', desc: 'Encrypted and authenticated transmission to ensure integrity and availability.' },
      { title: 'INDUSTRIAL CONNECTIVITY', desc: 'Integration with IIoT, 5G, VPN, and industrial protocols.' }
    ],
    footerTitle: 'KEY BENEFITS',
    metrics: [
      { label: 'Lower latency in\ndecision making' },
      { label: 'Higher information\nsecurity' },
      { label: 'Operational cost\nreduction' },
      { label: 'High availability\nand scalability' }
    ]
  },
  'energia-inteligente': {
    title: 'SMART ENERGY',
    subtitle: 'CARBON FOOTPRINT MONITORING AND\nENERGY CONSUMPTION OPTIMIZATION.',
    features: [
      { title: 'SMART MONITORING', desc: 'Continuous real-time energy consumption supervision with multi-source integration.' },
      { title: 'CONSUMPTION OPTIMIZATION', desc: 'Advanced algorithms that automatically adjust consumption to maximize efficiency.' },
      { title: 'MEASURABLE SUSTAINABILITY', desc: 'Carbon footprint calculation and reduction with reports and environmental compliance.' }
    ],
    footerTitle: 'KEY BENEFITS',
    metrics: [
      { label: 'Energy cost\nreduction' },
      { label: 'Lower carbon\nfootprint' },
      { label: 'Higher operational\nefficiency' },
      { label: 'Regulatory compliance\n& automated reports' }
    ]
  },
  'smq-os': {
    title: 'SMQ OS™ PLATFORM',
    subtitle: 'THE PROPRIETARY OPERATING SYSTEM\nFOR INDUSTRIAL PLANT MANAGEMENT.',
    features: [
      { title: 'UNIFIED INTERFACE', desc: 'Centralized control of all plant processes from a single platform.' },
      { title: 'REAL-TIME CONTROL', desc: 'Supervision and adjustment of critical parameters with immediate response.' },
      { title: 'SMART ALARMS', desc: 'Advanced anomaly detection and priority-based notifications.' },
      { title: 'HISTORICAL DATA', desc: 'Secure storage and data analysis for continuous improvement and traceability.' }
    ],
    footerTitle: 'KEY BENEFITS',
    metrics: [
      { label: 'Total operation\nvisibility' },
      { label: 'Data-driven\ndecision making' },
      { label: 'Unplanned downtime\nreduction' },
      { label: 'Scalability and\nadaptability' }
    ]
  },
  'economia-circular': {
    title: 'CIRCULAR ECONOMY',
    subtitle: 'WASTE VALORIZATION AND\nZERO WASTE PROCESSES.',
    features: [
      { title: 'VALORIZATION', desc: 'We design systems that turn industrial byproducts into valuable resources.' },
      { title: 'OPTICAL SORTING', desc: 'High-resolution NIR spectrometry to classify polymers by chemical signature.' },
      { title: 'ESG SUSTAINABILITY', desc: 'Washing, milling, and extrusion processes aligned with global compliance standards.' }
    ],
    footerTitle: 'KEY BENEFITS',
    metrics: [
      { label: 'Material\nRecovery' },
      { label: 'Closed Loop\n(Bottle-to-Bottle)' },
      { label: 'Fresh Water\nSavings' },
      { label: 'Compliance &\nCertification' }
    ]
  }
};
enTechnologyData['inteligencia-artificial'] = enTechnologyData.ia;
enTechnologyData['economia-circular-alias'] = enTechnologyData['economia-circular'];

const TecnologiaDetalle = () => {
  const { sector } = useParams();
  const navigate = useNavigate();
  const { isEditorMode, cmsState, updatePageModule, syncToCloud } = useCMS();
  const { language } = useLanguage();
  const [isUploading, setIsUploading] = React.useState(false);
  const [showControls, setShowControls] = React.useState(false);
  
  const rawData = technologyData[sector] || technologyData.ia;
  const enData = enTechnologyData[sector] || enTechnologyData.ia;
  
  // Merge language data
  const data = language === 'en' ? {
    ...rawData,
    ...enData,
    features: rawData.features.map((f, i) => ({ ...f, ...enData.features[i] })),
    metrics: rawData.metrics?.map((m, i) => ({ ...m, ...enData.metrics[i] }))
  } : rawData;

  const Icon = data.icon;

  // Unify ia and inteligencia-artificial pages, and migrate customized background configurations
  useEffect(() => {
    if (sector === 'inteligencia-artificial') {
      const oldPageId = 'tecnologia-inteligencia-artificial';
      const oldPageData = cmsState?.pages?.find(p => p.id === oldPageId);
      const oldHeroBg = oldPageData?.modules?.find(m => m.id === 'hero-bg')?.data;
      
      if (oldHeroBg && oldHeroBg.imageUrl) {
        const newPageId = 'tecnologia-ia';
        const newPageData = cmsState?.pages?.find(p => p.id === newPageId);
        const newHeroBg = newPageData?.modules?.find(m => m.id === 'hero-bg')?.data;
        
        if (!newHeroBg || !newHeroBg.imageUrl || newHeroBg.imageUrl.includes('unsplash.com')) {
          updatePageModule(newPageId, 'hero-bg', {
            ...oldHeroBg
          });
        }
      }
      navigate('/tecnologia/ia', { replace: true });
    }
  }, [sector, cmsState, navigate, updatePageModule]);

  const pageId = `tecnologia-${sector}`;
  const pageData = cmsState?.pages?.find(p => p.id === pageId);
  const heroBgModule = pageData?.modules?.find(m => m.id === 'hero-bg');
  
  const currentBgImage = heroBgModule?.data?.imageUrl || data.robotImage;
  const scale = heroBgModule?.data?.scale || 1;
  const positionX = heroBgModule?.data?.positionX ?? 50;
  const positionY = heroBgModule?.data?.positionY ?? 50;
  const opacity = heroBgModule?.data?.opacity ?? 40;
  const brightness = heroBgModule?.data?.brightness ?? 100;
  const fogOpacity = heroBgModule?.data?.fogOpacity ?? 100;
  const fogDirection = heroBgModule?.data?.fogDirection ?? 'to-r';
  const objectFit = heroBgModule?.data?.objectFit || 'cover';

  const [bgImageToRender, setBgImageToRender] = React.useState(currentBgImage);
  const [isBgTransitioning, setIsBgTransitioning] = React.useState(false);

  const updateMediaProp = (prop, value) => {
    updatePageModule(pageId, 'hero-bg', {
      imageUrl: currentBgImage,
      scale, positionX, positionY, opacity, brightness, fogOpacity, fogDirection, objectFit,
      [prop]: value
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const publicUrl = await uploadFile(file);
      if (publicUrl) {
        updateMediaProp('imageUrl', publicUrl);
        await syncToCloud();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  // Preload image intelligently on hover instead of all at once to save bandwidth
  const preloadImage = (sec) => {
    if (!cmsState?.pages) return;
    const pId = `tecnologia-${sec}`;
    const pData = cmsState.pages.find(p => p.id === pId);
    const bgMod = pData?.modules?.find(m => m.id === 'hero-bg');
    const url = bgMod?.data?.imageUrl || technologyData[sec]?.robotImage;
    if (url) {
      const img = new Image();
      img.src = url;
    }
  };

  // Handle smooth background image transition on URL change
  useEffect(() => {
    if (currentBgImage === bgImageToRender) return;

    setIsBgTransitioning(true);

    const timer = setTimeout(() => {
      setBgImageToRender(currentBgImage);
      setIsBgTransitioning(false);
    }, 200); // 200ms fast fade out

    return () => clearTimeout(timer);
  }, [currentBgImage, bgImageToRender]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sector]);

  return (
    <div className="min-h-screen bg-[#080B11] text-white font-['Poppins'] pt-[100px] flex flex-col">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 mb-8 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <button 
          onClick={() => navigate(-1)} 
          className="border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 px-4 py-2 rounded-full text-[11px] font-bold text-white/80 hover:text-white transition-all flex items-center gap-2 group shrink-0"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          <span>{language === 'en' ? 'Back to Menu' : 'Volver al Menú'}</span>
        </button>

        {/* Smart Technology Menu */}
        <div className="flex items-center gap-2 overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0" style={{ scrollbarWidth: 'none' }}>
          {techList.map((tech) => {
            const TechIcon = tech.icon;
            const isActive = sector === tech.id;
            return (
              <button
                key={tech.id}
                onClick={() => navigate(`/tecnologia/${tech.id}`)}
                onMouseEnter={() => preloadImage(tech.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap shrink-0 group ${
                  isActive 
                    ? 'bg-white/10 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                    : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                }`}
              >
                <div 
                  className={`flex items-center justify-center w-6 h-6 rounded-md transition-colors ${
                    isActive ? 'bg-black/20' : 'bg-transparent group-hover:bg-white/5'
                  }`}
                >
                  <TechIcon size={14} style={{ color: isActive ? tech.color : '#666' }} className="transition-colors group-hover:text-white" />
                </div>
                <span 
                  className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-white' : 'text-white/40 group-hover:text-white/80'
                  }`}
                >
                  {language === 'en' && tech.id === 'ia' ? 'Artificial Intelligence' : 
                   language === 'en' && tech.id === 'energia-inteligente' ? 'Smart Energy' : 
                   language === 'en' && tech.id === 'economia-circular' ? 'Circular Economy' : 
                   tech.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <main className="flex-grow flex items-center justify-center px-6 md:px-12 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[1400px] bg-[#0C1017] border border-white/5 rounded-[32px] overflow-hidden relative shadow-[0_20px_60px_rgba(0,0,0,0.8)] min-h-[600px] flex items-stretch"
        >
          {/* CMS Background Image Layer (Full Card) */}
          <div 
            className="absolute inset-0 overflow-hidden group/bg z-0"
            onDoubleClick={() => isEditorMode && setShowControls(!showControls)}
          >
            <div 
              className="absolute inset-0 mix-blend-luminosity"
              style={{ 
                backgroundImage: `url(${bgImageToRender})`,
                backgroundSize: objectFit === 'cover' ? 'cover' : 'contain',
                backgroundPosition: `${positionX}% ${positionY}%`,
                backgroundRepeat: 'no-repeat',
                opacity: isBgTransitioning ? 0 : (opacity / 100),
                filter: `brightness(${brightness}%)`,
                transform: `scale(${scale})`,
                transformOrigin: `${positionX}% ${positionY}%`,
                transition: 'opacity 0.2s ease-in-out, filter 0.5s ease, transform 0.5s ease'
              }}
            />
            {/* Fog Layer */}
            <div 
              className="absolute inset-0 pointer-events-none transition-all duration-500" 
              style={{
                background: fogDirection === 'to-r' 
                  ? 'linear-gradient(to right, #0C1017 0%, rgba(12,16,23,0.85) 45%, transparent 100%)'
                  : 'linear-gradient(to left, #0C1017 0%, rgba(12,16,23,0.85) 45%, transparent 100%)',
                opacity: fogOpacity / 100
              }}
            />
          </div>

          {/* Floating Edit Button when in editor mode */}
          {isEditorMode && (
            <div className="absolute top-6 right-6 z-40 flex items-center gap-2 pointer-events-auto">
              <button
                onClick={() => setShowControls(!showControls)}
                className="bg-black/85 hover:bg-black text-white hover:text-[#FFD700] border border-white/10 hover:border-[#FFD700]/30 px-4 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-wider shadow-2xl backdrop-blur-md transition-all flex items-center gap-2"
              >
                <ImageIcon size={14} className={showControls ? 'text-[#FFD700]' : ''} />
                <span>{showControls ? 'Cerrar Ajustes' : 'Ajustes de Imagen'}</span>
              </button>
            </div>
          )}

          {/* CMS Image Controls Panel */}
          {isEditorMode && showControls && (
            <div 
              className="absolute top-20 right-6 z-50 bg-[#0C1017]/95 border border-white/10 p-5 rounded-2xl backdrop-blur-xl shadow-2xl w-64 cursor-default pointer-events-auto" 
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <h3 className="text-[#FFD700] text-[10px] font-black uppercase tracking-widest">Ajustes de Imagen</h3>
                <button onClick={() => setShowControls(false)} className="text-white/40 hover:text-white transition-colors">✕</button>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                    <span>Opacidad</span>
                    <span className="text-[#FFD700]">{opacity}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={opacity} onChange={(e) => updateMediaProp('opacity', parseInt(e.target.value))} className="w-full accent-[#FFD700] h-1 bg-white/10 appearance-none rounded-full" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                    <span>Brillo</span>
                    <span className="text-[#FFD700]">{brightness}%</span>
                  </div>
                  <input type="range" min="50" max="200" value={brightness} onChange={(e) => updateMediaProp('brightness', parseInt(e.target.value))} className="w-full accent-[#FFD700] h-1 bg-white/10 appearance-none rounded-full" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                    <span>Fog Intensidad</span>
                    <span className="text-[#FFD700]">{fogOpacity}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={fogOpacity} onChange={(e) => updateMediaProp('fogOpacity', parseInt(e.target.value))} className="w-full accent-[#FFD700] h-1 bg-white/10 appearance-none rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[8px] uppercase font-black text-white/50 tracking-wider">Dirección Fog</span>
                  <button 
                    onClick={() => updateMediaProp('fogDirection', fogDirection === 'to-r' ? 'to-l' : 'to-r')}
                    className="text-[9px] font-bold bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-[#FFD700] transition-colors"
                  >
                    {fogDirection === 'to-r' ? 'Izq a Der ⇾' : '⇽ Der a Izq'}
                  </button>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                    <span>Escala</span>
                    <span className="text-[#FFD700]">{Math.round(scale * 100)}%</span>
                  </div>
                  <input type="range" min="1" max="3" step="0.05" value={scale} onChange={(e) => updateMediaProp('scale', parseFloat(e.target.value))} className="w-full accent-[#FFD700] h-1 bg-white/10 appearance-none rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                      <span>Pos X</span>
                      <span className="text-[#FFD700]">{positionX}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={positionX} onChange={(e) => updateMediaProp('positionX', parseInt(e.target.value))} className="w-full accent-[#FFD700] h-1 bg-white/10 appearance-none rounded-full" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                      <span>Pos Y</span>
                      <span className="text-[#FFD700]">{positionY}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={positionY} onChange={(e) => updateMediaProp('positionY', parseInt(e.target.value))} className="w-full accent-[#FFD700] h-1 bg-white/10 appearance-none rounded-full" />
                  </div>
                </div>
                <label className="cursor-pointer flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#FFC000] text-black border border-white/10 rounded py-2 mt-2 transition-colors text-[10px] font-bold">
                  <ImageIcon size={14} />
                  {isUploading ? 'Subiendo...' : 'Cambiar Imagen'}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                </label>
              </div>
            </div>
          )}

          <div 
            className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none z-0"
            style={{ backgroundColor: data.color }}
          />

          {/* Content Overlay Layer */}
          <div className="w-full min-h-[600px] h-full p-8 md:p-10 flex flex-col justify-between relative z-10 pointer-events-none">
            
            {/* Top Content (Restricted Width) */}
            <div className="w-full lg:w-[65%] xl:w-[55%] flex flex-col pointer-events-auto">
              <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-14 h-14 rounded-2xl border bg-[#0C1017] flex items-center justify-center shadow-lg"
                    style={{ borderColor: `${data.color}40` }}
                  >
                    <Icon size={28} style={{ color: data.color }} strokeWidth={1.5} />
                  </div>
                  <span className="text-xl font-mono font-light" style={{ color: data.color }}>{data.number}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-black uppercase leading-[1.1] tracking-tight mb-5">
                  {data.title.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      <DecipherText text={word} delay={i * 150 + 100} /> <br className="hidden md:block" />
                    </React.Fragment>
                  ))}
                </h1>

                <div 
                  className="w-16 h-1 mb-6 rounded-full"
                  style={{ backgroundColor: data.color }}
                />

                <p className="text-white/60 text-base md:text-lg font-medium tracking-wide max-w-xl leading-relaxed whitespace-pre-line">
                  {data.subtitle}
                </p>
              </div>

              <div className={`grid grid-cols-2 gap-4 md:gap-6 mb-4 ${data.features?.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
                {data.features.map((feature, idx) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.1) }}
                      className="flex flex-col"
                    >
                      <FeatureIcon size={26} style={{ color: data.color }} className="mb-4 stroke-[1.5]" />
                      <h3 className="text-[12px] font-bold uppercase tracking-wider mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-[12px] text-white/50 leading-relaxed font-light pr-2">
                        {feature.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Footer Section (Full Width) */}
            <div className="pointer-events-auto w-full xl:w-[95%] mt-auto pt-8">
              {data.footerType === 'applications' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="w-full bg-[#12161E] border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-6"
                >
                  <div className="flex items-center gap-4 shrink-0 md:pr-8 md:border-r border-white/10">
                    <div 
                      className="w-14 h-14 rounded-2xl border bg-[#0C1017] flex items-center justify-center shadow-lg"
                      style={{ borderColor: `${data.color}40` }}
                    >
                      <Cpu size={24} style={{ color: data.color }} strokeWidth={2} />
                    </div>
                    <span className="text-[13px] font-black uppercase tracking-widest" style={{ color: data.color }}>
                      {data.footerTitle || (language === 'en' ? 'APPLICATIONS' : 'APLICACIONES')}
                    </span>
                  </div>
                  <p className="text-[13px] text-white/60 leading-relaxed font-medium">
                    {data.applications}
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="w-full bg-[#12161E] border border-white/5 rounded-2xl p-5 md:p-6"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
                    {/* Left title */}
                    <div className="flex items-center gap-4 shrink-0 md:pr-8 md:border-r border-white/10">
                      <div 
                        className="w-14 h-14 rounded-2xl border bg-[#0C1017] flex items-center justify-center shadow-lg"
                        style={{ borderColor: `${data.color}40` }}
                      >
                        {data.footerIcon ? (
                          <data.footerIcon size={24} style={{ color: data.color }} strokeWidth={2} />
                        ) : (
                          <CheckCircle2 size={24} style={{ color: data.color }} strokeWidth={2} />
                        )}
                      </div>
                      <span className="text-[13px] font-black uppercase tracking-widest" style={{ color: data.color }}>
                        {data.footerTitle}
                      </span>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 md:flex md:flex-row gap-6 md:gap-10 flex-grow justify-around">
                      {data.metrics.map((metric, idx) => {
                        const MetricIcon = metric.icon;
                        return (
                          <div key={idx} className="flex flex-col gap-2">
                            <div className="flex items-center gap-2.5">
                              <MetricIcon size={20} style={{ color: data.color }} strokeWidth={2.5} />
                              {metric.value && (
                                <span className="text-[18px] lg:text-[22px] font-black tracking-tight text-white">
                                  {metric.value}
                                </span>
                              )}
                            </div>
                            <span className="text-[12px] text-white/60 leading-snug whitespace-pre-line font-medium">
                              {metric.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
              </div>
            </div>
          </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TecnologiaDetalle;
