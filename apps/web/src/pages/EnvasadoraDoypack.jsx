import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Inbox, 
  Maximize2, 
  Eye, 
  Layers, 
  ArrowDownToLine, 
  Wind, 
  Flame, 
  LogOut, 
  Settings, 
  FileText, 
  Check,
  ChevronRight,
  TrendingUp,
  Cpu,
  Shield,
  Zap,
  Play,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  Palette,
  Upload
} from 'lucide-react';
import Footer from '@/components/Footer.jsx';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';

// Map of icons for dynamic rendering
const iconMap = {
  Inbox, 
  Maximize2, 
  Eye, 
  Layers, 
  ArrowDownToLine, 
  Wind, 
  Flame, 
  LogOut,
  Settings,
  FileText,
  Check,
  ChevronRight,
  TrendingUp,
  Cpu,
  Shield,
  Zap,
  Play
};

const defaultPageData = {
  // Hero
  heroTitle: 'ENVASADORA ROTATIVA DOYPACK',
  heroTitleColor: '#ffffff',
  heroSubtitle: '8 estaciones de trabajo para llenado y sellado automático de bolsas preformadas.',
  heroSubtitleColor: '#ffffff',
  heroDesc: 'Diseñada bajo estrictos estándares de ingeniería de gama alta (estándar europeo OEM). Apta para el envasado automatizado de café, chocolates, snacks, frutos secos, polvos y granulados de alta densidad en atmósfera modificada. Construcción ultra-higiénica que asegura cero contaminación cruzada y máxima repetibilidad.',
  heroDescColor: 'rgba(255, 255, 255, 0.6)',
  heroDescAlign: 'left',
  heroMedia: '/rotary_doypack_machine.png',
  heroPoster: '',
  
  // Sección 1: Cómo funciona
  s1Title: '¿CÓMO FUNCIONA?',
  s1TitleColor: '#ffffff',
  s1Desc: 'Secuencia de ingeniería síncrona en 8 estaciones indexadas mecánicamente por servo, optimizada para máxima velocidad y sellados herméticos a prueba de fugas.',
  s1DescColor: 'rgba(255, 255, 255, 0.5)',
  s1DescAlign: 'center',
  
  // Sección 2: Especificaciones KPI
  s2Title: 'ESPECIFICACIONES PRINCIPALES',
  s2TitleColor: '#ffffff',
  
  // Sección 3: Aplicaciones
  s3Title: 'APLICACIONES INDUSTRIALES',
  s3TitleColor: '#ffffff',
  s3Desc: 'Dosificadores modulares de cambio rápido y alta precisión mecánica, compatibles con múltiples viscosidades, densidades y morfologías de producto.',
  s3DescColor: 'rgba(255, 255, 255, 0.5)',
  s3DescAlign: 'center',
  
  // Sección 4: Ventajas
  s4Title: 'VENTAJAS DE CLASE MUNDIAL',
  s4TitleColor: '#ffffff',
  
  // Sección 5: Especificaciones Técnicas
  s5Title: 'ESPECIFICACIONES TÉCNICAS',
  s5TitleColor: '#ffffff',
  
  // Sección 6: Video Demostración
  s6Title: 'DEMOSTRACIÓN DE OPERACIÓN',
  s6TitleColor: '#ffffff',
  s6Desc: 'Ciclo dinámico continuo a velocidad real en planta de producción. Sistema de envasado sin fricciones mecánicas y mínima emisión de ruido.',
  s6DescColor: 'rgba(255, 255, 255, 0.5)',
  s6DescAlign: 'center',
  
  // Sección 7: Configuraciones
  s7Title: 'MÓDULOS DE DOSIFICACIÓN Y CONFIGURACIONES',
  s7TitleColor: '#ffffff',
  s7Desc: 'Versatilidad total. Sistema de cambio modular en bloque que permite alternar sistemas de dosificación en menos de 15 minutos sin interrumpir la consistencia operativa.',
  s7DescColor: 'rgba(255, 255, 255, 0.5)',
  s7DescAlign: 'center',
  
  // Sección Final: CTA
  ctaTitle: '¿LISTO PARA AUTOMATIZAR SU ENVASADO?',
  ctaTitleColor: '#ffffff',
  ctaDesc: 'Nuestro equipo de ingenieros de aplicaciones puede diseñar la solución a la medida exacta de su producto, velocidad requerida y capacidades físicas de su planta.',
  ctaDescColor: 'rgba(255, 255, 255, 0.6)',
  ctaDescAlign: 'center',

  // Listas
  stations: [
    { id: 1, title: 'Recepción de bolsa', desc: 'Alimentación automática de bolsas preformadas desde el almacén horizontal.', iconName: 'Inbox' },
    { id: 2, title: 'Apertura automática', desc: 'Sistema neumático y mecánico de ventosas de vacío que abre la bolsa por arriba y por abajo.', iconName: 'Maximize2' },
    { id: 3, title: 'Verificación de apertura', desc: 'Sensor de detección infrarrojo para asegurar apertura correcta antes de la dosificación.', iconName: 'Eye' },
    { id: 4, title: 'Dosificación', desc: 'Llenado preciso del producto mediante sistema sincronizado (balanza, tornillo o volumétrico).', iconName: 'Layers' },
    { id: 5, title: 'Asentamiento', desc: 'Mesa vibratoria que asienta el producto en el fondo de la bolsa para optimizar espacio.', iconName: 'ArrowDownToLine' },
    { id: 6, title: 'Inyección de nitrógeno', desc: 'Inyección opcional de gas inerte para eliminar oxígeno y extender la vida útil.', iconName: 'Wind' },
    { id: 7, title: 'Sellado térmico', desc: 'Barras de sellado caliente sellan la bolsa a presión constante, seguido de sellado por enfriamiento.', iconName: 'Flame' },
    { id: 8, title: 'Descarga', desc: 'Salida de la bolsa terminada a la banda transportadora de producto terminado.', iconName: 'LogOut' }
  ],

  kpis: [
    { value: '60', unit: 'BOLSAS/MIN', label: 'Rendimiento Máximo', desc: 'Producción continua a alta velocidad' },
    { value: '8', unit: 'ESTACIONES', label: 'Estaciones de Trabajo', desc: 'Secuencia optimizada de envasado' },
    { value: '10-2500 g', unit: 'RANGO DE LLENADO', label: 'Flexibilidad de Peso', desc: 'Múltiples volúmenes soportados' },
    { value: '±1%', unit: 'PRECISIÓN', label: 'Control de Margen', desc: 'Desperdicio de producto casi nulo' },
    { value: '304 SS', unit: 'ACERO INOXIDABLE', label: 'Estructura Robusta', desc: 'Sanidad y limpieza de grado alimenticio' },
    { value: '24/7', unit: 'OPERACIÓN INDUSTRIAL', label: 'Ciclo de Fatiga Extremo', desc: 'Diseñado para turnos continuos' }
  ],

  applications: [
    { name: 'Café', icon: '☕', desc: 'Café en grano o molido con válvula desgasificadora' },
    { name: 'Chocolate', icon: '🍫', desc: 'Chocolates, bombones y confitería fina' },
    { name: 'Nueces', icon: '🥜', desc: 'Frutos secos, almendras, pistaches y semillas' },
    { name: 'Snacks', icon: '🍪', desc: 'Papas fritas, galletas y botanas saladas' },
    { name: 'Pet Food', icon: '🐶', desc: 'Croquetas y alimento seco para mascotas' },
    { name: 'Granola', icon: '🌾', desc: 'Cereales, granola y mezclas de avena' },
    { name: 'Polvos', icon: '🧂', desc: 'Harinas, especias, proteínas y colágeno' },
    { name: 'Dulces', icon: '🍬', desc: 'Gomitas, caramelos y golosinas' }
  ],

  advantages: [
    { title: 'CAMBIO RÁPIDO DE FORMATO', desc: 'Ajuste de guías motorizadas desde el HMI. Configuración sencilla y sin herramientas mecánicas en menos de 10 minutos para distintos tamaños de bolsa.', highlight: 'Eficiencia Operativa' },
    { title: 'OPERACIÓN TOTALMENTE AUTOMÁTICA', desc: 'Monitoreo absoluto mediante PLC de gama alta. Detección inteligente de "no bolsa - no llenado" y "bolsa no abierta - no sellado" para evitar desperdicio.', highlight: 'Cero Desperdicio' },
    { title: 'ALTA PRECISIÓN DE DOSIFICADO', desc: 'Integración sincronizada con sistemas de pesaje multicabezal europeos, asegurando una dosificación exacta al gramo en cada ciclo de llenado.', highlight: 'Ingeniería Alemana' },
    { title: 'DISEÑO SANITARIO PREMIUM', desc: 'Construcción íntegra en acero inoxidable SUS304 sin rincones ciegos, facilitando procesos de limpieza rápida e higiene total en planta.', highlight: 'Certificación Alimenticia' }
  ],

  specs: [
    { param: 'Modelo', value: 'SMQ-DP8 PRO Series (European Standard)' },
    { param: 'Estaciones de trabajo', value: '8 estaciones rotativas de indexación sincrónica servoasistidas' },
    { param: 'Velocidad de envasado', value: '40 - 60 bolsas/min (Sincronizado dinámicamente según densidad)' },
    { param: 'Potencia instalada', value: '3.8 kW | Trifásico 220V / 380V / 440V | 50-60 Hz' },
    { param: 'Presión y flujo neumático', value: '0.6 - 0.8 MPa | Consumo estabilizado de 380 Nl/min' },
    { param: 'Materiales del chasis', value: 'Acero Inoxidable AISI 304 / 316L pulido espejo (Hygienic Design)' },
    { param: 'Formatos de bolsa compatibles', value: 'Doypack (Stand-up), Pillow, 3/4 Sellos, Zipper superior, Fuelle lateral' },
    { param: 'Rango dimensional de envase', value: 'Ancho: 90 - 220 mm | Altura: 100 - 350 mm (Ajuste motorizado)' },
    { param: 'Arquitectura de automatización', value: 'PLC Siemens/Omron + HMI Touchscreen a color de 10.1", Servomotores Yaskawa' },
    { param: 'Nivel de ruido operacional', value: '< 72 dB (Acoplamiento de indexador sumergido en baño de aceite)' },
    { param: 'Gabinete eléctrico', value: 'Diseño estanco IP65 con sistema de aire acondicionado integrado' }
  ],

  configurations: [
    { name: 'Tornillo sinfín para polvos', desc: 'Ideal para dosificación de polvos finos y harinas de forma hermética.' },
    { name: 'Balanza multicabezal', desc: 'Máxima velocidad para granulados, snacks y piezas irregulares.' },
    { name: 'Dosificador volumétrico', desc: 'Ideal para productos homogéneos, legumbres y granos.' },
    { name: 'Llenado de líquidos', desc: 'Válvulas antigoteo para salsas, cremas y fluidos de alta viscosidad.' },
    { name: 'Inyección de nitrógeno', desc: 'Preservación de atmósfera modificada para extender frescura.' },
    { name: 'Detector de metales', desc: 'Inspección de seguridad integrada antes de la salida final.' },
    { name: 'Checkweigher integrado', desc: 'Balanza dinámica de salida con rechazo automático por peso fuera de margen.' }
  ]
};

const StatCounter = ({ target, suffix = '', duration = 2000, trigger = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const num = parseInt(target, 10);
    if (isNaN(num)) {
      setCount(target);
      return;
    }

    let start = 0;
    const end = num;
    // Reset back to 0 on trigger change
    setCount(0);

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth organic calculator deceleration
      const easeOutQuad = percentage * (2 - percentage);
      const currentCount = Math.floor(easeOutQuad * (end - start) + start);
      
      setCount(currentCount);

      if (progress < duration) {
        window.requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const animId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animId);
  }, [target, duration, trigger]);

  const num = parseInt(target, 10);
  if (isNaN(num)) {
    return <span className="text-[#FFD700] tracking-wide animate-pulse">{target}</span>;
  }

  return <span>{count}{suffix}</span>;
};

const StatCard = ({ target, suffix = '', label, colSpan = "col-span-1" }) => {
  const [trigger, setTrigger] = useState(0);
  
  return (
    <div 
      className={`flex flex-col items-center self-center cursor-pointer transition-all duration-300 transform hover:scale-110 group ${colSpan}`}
      onMouseEnter={() => setTrigger(prev => prev + 1)}
    >
      <span className="text-3xl md:text-4xl font-black text-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,0.4)] tracking-tight transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
        <StatCounter target={target} suffix={suffix} trigger={trigger} />
      </span>
      <span className="text-[10px] font-black uppercase tracking-wider text-white/70 mt-2 transition-colors duration-300 group-hover:text-[#FFD700]">
        {label}
      </span>
    </div>
  );
};

const EnvasadoraDoypack = () => {
  const { cmsState, updatePages, isEditorMode } = useCMS();
  const fileInputRef = useRef(null);
  const posterInputRef = useRef(null);

  // Intentamos obtener la página de la envasadora del CMS
  const envasadorasPage = cmsState.pages.find(p => p.id === 'envasadoras');
  
  // Si no existe, inicializarla en el CMS con los datos por defecto
  useEffect(() => {
    if (!envasadorasPage) {
      const initialPageData = {
        id: 'envasadoras',
        title: 'Envasadoras Rotativas',
        slug: '/envasadoras',
        modules: [
          {
            id: 'doypack-data',
            type: 'doypack-product',
            data: defaultPageData
          }
        ]
      };
      updatePages([...cmsState.pages, initialPageData]);
    }
  }, [envasadorasPage, cmsState.pages, updatePages]);

  // Si aún no se inicializa, usar local
  const data = envasadorasPage?.modules?.[0]?.data || defaultPageData;

  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState('hero');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingPoster, setIsUploadingPoster] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const handleUpdate = (key, value) => {
    const updatedData = { ...data, [key]: value };
    const updatedPage = {
      id: 'envasadoras',
      title: 'Envasadoras Rotativas',
      slug: '/envasadoras',
      modules: [
        {
          id: 'doypack-data',
          type: 'doypack-product',
          data: updatedData
        }
      ]
    };
    const otherPages = cmsState.pages.filter(p => p.id !== 'envasadoras');
    updatePages([...otherPages, updatedPage]);
  };

  const handleMediaUpload = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        if (field === 'heroMedia') setIsUploading(true);
        if (field === 'heroPoster') setIsUploadingPoster(true);

        const url = await uploadFile(file, "media");
        handleUpdate(field, url);
      } catch (err) {
        console.error("Error al subir archivo:", err);
        alert('No se pudo subir el archivo. Verifica tu conexión.');
      } finally {
        setIsUploading(false);
        setIsUploadingPoster(false);
      }
    }
  };

  const handleAppImageUpload = async (e, idx) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUploading(true);
        const url = await uploadFile(file, "media");
        
        const newApps = [...applicationsList];
        newApps[idx] = { ...newApps[idx], imageUrl: url };
        handleUpdate('applications', newApps);
      } catch (err) {
        console.error("Error al subir imagen de aplicación:", err);
        alert('No se pudo subir la imagen.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Listas de datos recuperadas del CMS
  const stationsList = data.stations || defaultPageData.stations;
  const kpisList = data.kpis || defaultPageData.kpis;
  const applicationsList = data.applications || defaultPageData.applications;
  const advantagesList = data.advantages || defaultPageData.advantages;
  const specsList = data.specs || defaultPageData.specs;
  const configurationsList = data.configurations || defaultPageData.configurations;

  const currentMedia = data.heroMedia || '/rotary_doypack_machine.png';
  const isVideo = !!(currentMedia.match(/\.(mp4|webm|ogg|mov|mkv)$/i) || currentMedia.includes('video/'));

  return (
    <>
      <Helmet>
        <title>Envasadora Rotativa Doypack 8 Estaciones | SMQ Industrial Systems</title>
        <meta
          name="description"
          content="Envasadora rotativa automática Doypack de 8 estaciones. Solución premium para empaque de alimentos, granos, polvos y snacks bajo estándares europeos."
        />
      </Helmet>

      <div className="min-h-screen bg-[#080B12] text-white overflow-hidden font-['Poppins'] flex flex-col relative">
        {/* Glows Ambientales Decorativos (Dorado/Ámbar Premium) */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[150px] pointer-events-none -z-10" />
        <div className="absolute top-[40%] right-10 w-[600px] h-[600px] bg-[#FFD700]/5 rounded-full blur-[180px] pointer-events-none -z-10" />
        <div className="absolute bottom-[10%] left-5 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />

        {/* ========================================================================= */}
        {/* SLIDING premium cms panel on the right side if isEditorMode is active */}
        {/* ========================================================================= */}
        {isEditorMode && (
          <div className="fixed top-28 right-6 z-[990] w-[380px] bg-[#0B0F19]/95 border border-white/10 p-5 rounded-2xl shadow-2xl backdrop-blur-md overflow-y-auto max-h-[75vh] flex flex-col gap-4 text-left animate-slide-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-[#FFD700]">
                <Settings size={18} className="animate-spin [animation-duration:15s]" />
                <span className="font-black text-xs uppercase tracking-widest text-white">Editor de Envasadoras</span>
              </div>
              <span className="bg-[#FFD700]/20 text-[#FFD700] text-[9px] font-black uppercase px-2 py-0.5 rounded border border-[#FFD700]/30">SMQ Live</span>
            </div>

            {/* Editor Tabs Navigation */}
            <div className="flex bg-white/5 p-1 rounded-lg gap-1">
              {['hero', 'secciones', 'datos'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-[11px] font-black uppercase tracking-wider py-1.5 rounded transition-all cursor-pointer ${
                    activeTab === tab ? 'bg-[#FFD700] text-black font-bold shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab === 'hero' ? 'Hero' : tab === 'secciones' ? 'Títulos' : 'Listas'}
                </button>
              ))}
            </div>

            {/* Tab content 1: Hero Customization */}
            {activeTab === 'hero' && (
              <div className="flex flex-col gap-4">
                {/* Hero Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Título Principal</label>
                  <input
                    type="text"
                    value={data.heroTitle}
                    onChange={(e) => handleUpdate('heroTitle', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FFD700] outline-none"
                  />
                </div>

                {/* Hero Subtitle */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Subtítulo</label>
                  <textarea
                    rows={2}
                    value={data.heroSubtitle}
                    onChange={(e) => handleUpdate('heroSubtitle', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FFD700] outline-none resize-none"
                  />
                </div>

                {/* Hero Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Descripción Larga</label>
                  <textarea
                    rows={3}
                    value={data.heroDesc}
                    onChange={(e) => handleUpdate('heroDesc', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FFD700] outline-none resize-none"
                  />
                </div>

                {/* Hero Media Upload */}
                <div className="flex flex-col gap-1.5 border-t border-white/10 pt-3">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Imagen / Video Principal</label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(e) => handleMediaUpload(e, 'heroMedia')}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="bg-[#FFD700] hover:bg-[#FFC107] text-black font-bold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    {isUploading ? (
                      <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    ) : (
                      <Upload size={14} />
                    )}
                    <span>Subir Render o Video</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab content 2: Sections customization */}
            {activeTab === 'secciones' && (
              <div className="flex flex-col gap-4">
                {/* Section 1 Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Título Sección 1</label>
                  <input
                    type="text"
                    value={data.s1Title}
                    onChange={(e) => handleUpdate('s1Title', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white focus:border-[#FFD700] outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="md:pl-[76px] transition-all duration-300">
          <main className="flex-grow">
          {/* HERO SECTION */}
          <section id="doypack-hero" className="relative min-h-[90vh] flex items-center justify-center pt-[140px] pb-16 px-[40px] max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-6 flex flex-col gap-6 text-left lg:pl-[30px]">
                {/* Tech Tag (Dorado/Ámbar) */}
                <div className="inline-flex items-center gap-2 border border-yellow-500/30 bg-yellow-500/5 rounded-full px-4 py-1.5 w-max">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD700]"></span>
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FFD700]">Línea de Envasado Premium</span>
                </div>

                {/* Title (Forzado a Blanco Puro) */}
                <h1 
                  className="font-bold text-[36px] md:text-[52px] lg:text-[64px] leading-[1.1] tracking-[-1px] text-white transition-all duration-500 hover:text-[#FFD700] hover:scale-[1.02] hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.4)] cursor-pointer select-none"
                >
                  {isEditorMode ? (
                    <input
                      type="text"
                      value={data.heroTitle}
                      onChange={(e) => handleUpdate('heroTitle', e.target.value)}
                      className="bg-transparent border-b border-dashed border-[#FFD700]/30 text-white outline-none w-full font-bold text-[32px] md:text-[46px] lg:text-[56px] focus:border-[#FFD700]"
                    />
                  ) : (
                    data.heroTitle.split('\\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < data.heroTitle.split('\\n').length - 1 && <br />}
                      </React.Fragment>
                    ))
                  )}
                </h1>

                {/* Subtitle */}
                {isEditorMode ? (
                  <textarea
                    rows={2}
                    value={data.heroSubtitle}
                    onChange={(e) => handleUpdate('heroSubtitle', e.target.value)}
                    className="bg-transparent border-l-2 border-[#FFD700] pl-4 text-white font-bold text-[18px] md:text-[22px] leading-[1.4] outline-none w-full border-y border-r border-dashed border-white/10"
                  />
                ) : (
                  <p 
                    className="font-bold text-[18px] md:text-[22px] leading-[1.4] border-l-2 border-[#FFD700] pl-4 text-white"
                  >
                    {data.heroSubtitle}
                  </p>
                )}

                {/* Description */}
                {isEditorMode ? (
                  <textarea
                    rows={4}
                    value={data.heroDesc}
                    onChange={(e) => handleUpdate('heroDesc', e.target.value)}
                    className="bg-transparent border border-dashed border-white/10 rounded p-2 text-white/70 font-normal text-[15px] md:text-[16px] leading-[1.6] outline-none w-full"
                    style={{ textAlign: data.heroDescAlign }}
                  />
                ) : (
                  <p 
                    className="font-normal text-[15px] md:text-[16px] leading-[1.6] max-w-[520px] text-white/70"
                    style={{ textAlign: data.heroDescAlign }}
                  >
                    {data.heroDesc}
                  </p>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
                  <a
                    href="#contacto-cotizar"
                    id="hero-btn-quote"
                    className="inline-flex items-center justify-center bg-[#FFD700] hover:bg-[#FFC107] text-black font-bold text-[15px] py-4 px-8 rounded-lg transition-all duration-300 shadow-[0_0_25px_rgba(255,215,0,0.3)] hover:shadow-[0_0_35px_rgba(255,215,0,0.5)] scale-100 hover:scale-[1.02]"
                  >
                    Solicitar Cotización
                  </a>
                  <a
                    href="#especificaciones"
                    id="hero-btn-spec"
                    className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-semibold text-[15px] py-4 px-8 rounded-lg transition-all duration-300 backdrop-blur-sm"
                  >
                    <FileText size={16} className="mr-2" />
                    Ficha Técnica
                  </a>
                </div>
              </div>

              {/* Right Column: Dynamic Media Frame - VIDRIO BISELADO AL 30% */}
              <div className="lg:col-span-6 flex justify-center items-center relative h-full">
                {/* Glow circular dorado */}
                <div className="absolute w-[450px] h-[450px] bg-[#FFD700]/5 rounded-full blur-[90px] animate-pulse -z-10" />

                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="relative max-w-[550px] w-full border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 shadow-[0_25px_50px_rgba(0,0,0,0.4)] group overflow-hidden"
                >
                  {/* Borde neón superior dorado */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/70 to-transparent" />
                  
                  {/* Video or Image based on parsed source */}
                  {isVideo ? (
                    <video
                      src={currentMedia}
                      poster={data.heroPoster || '/rotary_doypack_machine.png'}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto object-contain rounded-xl drop-shadow-[0_15px_30px_rgba(255,215,0,0.15)]"
                    />
                  ) : (
                    <img
                      src={currentMedia}
                      alt="SMQ Rotary Doypack Packaging Machine 8 Stations"
                      className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(255,215,0,0.15)] transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {/* Machine technical specs corner tags */}
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                    <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider">SUS304 Acero Inoxidable</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                    <span className="text-[10px] text-[#FFD700] font-bold uppercase tracking-wider">PLC INTEGRADO</span>
                  </div>
                </motion.div>
              </div>

            </div>
          </section>

          {/* CINTA DE ESTADÍSTICAS (Calculadora que va sumando) */}
          <section className="relative z-20 -mt-10 max-w-[1400px] mx-auto px-[40px]">
            <div className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden grid grid-cols-2 md:grid-cols-9 gap-4 text-center">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />
              
              {/* Stat 1 */}
              <StatCard target="20" suffix="+" label="Años de experiencia" />

              {/* Divider */}
              <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block self-center justify-self-center animate-pulse" />

              {/* Stat 2 */}
              <StatCard target="500" suffix="+" label="Equipos suministrados" />

              {/* Divider */}
              <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block self-center justify-self-center animate-pulse" />

              {/* Stat 3 */}
              <StatCard target="100" suffix="+" label="Proyectos ejecutados" />

              {/* Divider */}
              <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block self-center justify-self-center animate-pulse" />

              {/* Stat 4 */}
              <StatCard target="15" suffix="+" label="Sectores industriales" />

              {/* Divider */}
              <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block self-center justify-self-center animate-pulse" />

              {/* Stat 5 */}
              <StatCard target="24/7" label="Soporte e integración" colSpan="col-span-2 md:col-span-1" />

            </div>
          </section>

          {/* SECCIÓN 1: ¿CÓMO FUNCIONA? - Horizontal Futuristic Timeline */}
          <section id="como-funciona" className="py-20 bg-black/40 border-y border-white/5 relative">
            <div className="max-w-[1400px] mx-auto px-[40px] text-center">
              
              {/* Header */}
              <div className="flex flex-col items-center gap-3 mb-16">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#FFD700]">Ingeniería Secuencial</span>
                {/* Title (Forzado a Blanco Puro) */}
                <h2 
                  className="text-3xl md:text-4xl font-bold tracking-tight text-white transition-all duration-500 hover:text-[#FFD700] hover:scale-105 hover:tracking-wide hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] cursor-pointer select-none"
                >
                  {data.s1Title}
                </h2>
                <div className="w-48 h-[4px] bg-[#FFD700] rounded-full mt-4 shadow-[0_0_15px_rgba(255,215,0,0.6)] transition-all duration-500 hover:w-64 mx-auto" />
                <p 
                  className="text-sm max-w-lg mt-2 leading-relaxed text-white/70"
                  style={{ textAlign: data.s1DescAlign }}
                >
                  {data.s1Desc}
                </p>
              </div>

              {/* Interactive Timeline Container */}
              <div className="relative flex flex-col gap-10">
                {/* Horizontal Line Bar */}
                <div className="absolute top-[38px] left-[5%] right-[5%] h-[2px] bg-white/10 hidden lg:block -z-10">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FFD700] to-yellow-400 transition-all duration-500 ease-out shadow-[0_0_10px_#FFD700]"
                    style={{ width: `${(activeStep / (stationsList.length - 1)) * 100}%` }}
                  />
                </div>

                {/* Horizontal Circle Nodes (Desktop) */}
                <div className="hidden lg:grid grid-cols-8 gap-4 px-4">
                  {stationsList.map((step, idx) => {
                    const StepIcon = iconMap[step.iconName] || Settings;
                    const isActive = idx <= activeStep;
                    const isCurrent = idx === activeStep;

                    return (
                      <button
                        key={step.id}
                        id={`timeline-node-${step.id}`}
                        onClick={() => setActiveStep(idx)}
                        className="flex flex-col items-center focus:outline-none group cursor-pointer"
                      >
                        <div 
                          className={`w-20 h-20 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                            isCurrent 
                              ? 'bg-[#FFD700] border-[#FFD700] shadow-[0_0_25px_rgba(255,215,0,0.5)] text-black scale-110' 
                              : isActive
                                ? 'bg-[#0B0F19] border-yellow-500/50 text-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.15)]'
                                : 'bg-[#0B0F19] border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          <StepIcon size={24} strokeWidth={isCurrent ? 2.5 : 2} />
                        </div>

                        <span className={`text-[12px] font-bold mt-4 transition-colors tracking-wide ${
                          isCurrent ? 'text-[#FFD700]' : 'text-white/60 group-hover:text-white'
                        }`}>
                          Estación {step.id}
                        </span>

                        <span className="text-[11px] text-white/40 mt-1 max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {step.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Focused Content Card - VIDRIO BISELADO AL 30% */}
                <div className="mt-8 max-w-[850px] mx-auto w-full">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-xl rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative text-left"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
                    
                    <div className="w-24 h-24 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-[#FFD700] shrink-0 shadow-[inset_0_0_15px_rgba(255,215,0,0.05)]">
                      {React.createElement(iconMap[stationsList[activeStep].iconName] || Settings, { size: 44, strokeWidth: 1.5 })}
                    </div>

                    <div className="text-left flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-[#FFD700]/20 text-[#FFD700] font-bold text-xs uppercase px-2.5 py-1 rounded-md border border-[#FFD700]/30 tracking-wider">
                          Estación {stationsList[activeStep].id} de 8
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                          {stationsList[activeStep].title}
                        </h3>
                      </div>
                      <p className="text-white/70 text-[15px] leading-relaxed">
                        {stationsList[activeStep].desc}
                      </p>
                    </div>

                    {/* Step selection indicators (Mobile) */}
                    <div className="flex gap-2 mt-4 md:hidden">
                      {stationsList.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveStep(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            idx === activeStep ? 'bg-[#FFD700] w-6' : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>

              </div>

            </div>
          </section>

          {/* SECCIÓN 2: ESPECIFICACIONES PRINCIPALES - KPI Cards */}
          <section id="especificaciones" className="py-20 max-w-[1400px] mx-auto px-[40px] relative">
            <div className="flex flex-col items-center gap-3 mb-16 text-center">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#FFD700]">Rendimiento Garantizado</span>
              {/* Title (Forzado a Blanco Puro) */}
              <h2 
                className="text-3xl md:text-4xl font-bold tracking-tight text-white transition-all duration-500 hover:text-[#FFD700] hover:scale-105 hover:tracking-wide hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] cursor-pointer select-none"
              >
                {data.s2Title}
              </h2>
              <div className="w-48 h-[4px] bg-[#FFD700] rounded-full mt-4 shadow-[0_0_15px_rgba(255,215,0,0.6)] transition-all duration-500 hover:w-64 mx-auto" />
            </div>

            {/* KPI Grid - VIDRIO BISELADO AL 30% */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpisList.map((kpi, idx) => (
                <div 
                  key={idx}
                  id={`kpi-card-${idx}`}
                  className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-md rounded-2xl p-8 text-left transition-all duration-300 hover:border-yellow-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_25px_rgba(255,215,0,0.05)] shadow-lg group relative overflow-hidden"
                >
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-yellow-500/5 rounded-full blur-xl group-hover:bg-[#FFD700]/10 transition-all duration-300" />
                  
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#FFD700] block mb-2">{kpi.unit}</span>
                  
                  <h3 className="text-4xl md:text-5xl font-extrabold text-white leading-none tracking-tight mb-3">
                    {kpi.value}
                  </h3>

                  <h4 className="text-white/80 font-bold text-sm tracking-wide mb-1">
                    {kpi.label}
                  </h4>

                  <p className="text-white/40 text-xs leading-relaxed">
                    {kpi.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECCIÓN 3: APLICACIONES - Grid with Glow effect */}
          <section id="aplicaciones" className="py-20 bg-black/20 border-y border-white/5 relative">
            <div className="max-w-[1400px] mx-auto px-[40px] text-center">
              
              {/* Header */}
              <div className="flex flex-col items-center gap-3 mb-16">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#FFD700]">Flexibilidad de Envasado</span>
                {/* Title (Forzado a Blanco Puro) */}
                <h2 
                  className="text-3xl md:text-4xl font-bold tracking-tight text-white transition-all duration-500 hover:text-[#FFD700] hover:scale-105 hover:tracking-wide hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] cursor-pointer select-none"
                >
                  {data.s3Title}
                </h2>
                <div className="w-48 h-[4px] bg-[#FFD700] rounded-full mt-4 shadow-[0_0_15px_rgba(255,215,0,0.6)] transition-all duration-500 hover:w-64 mx-auto" />
                <p 
                  className="text-sm max-w-lg mt-2 leading-relaxed text-white/70"
                  style={{ textAlign: data.s3DescAlign }}
                >
                  {data.s3Desc}
                </p>
              </div>

              {/* Grid Layout - VIDRIO BISELADO AL 30% */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {applicationsList.map((app, idx) => (
                  <div
                    key={idx}
                    id={`app-card-${idx}`}
                    className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-md rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD700]/30 hover:bg-white/[0.06] hover:shadow-[0_0_25px_rgba(255,215,0,0.1)] group cursor-default"
                  >
                    {/* Circle Frame */}
                    {isEditorMode ? (
                      <div className="relative group/circle cursor-pointer mb-4">
                        <input
                          type="file"
                          accept="image/*"
                          id={`app-file-input-${idx}`}
                          className="hidden"
                          onChange={(e) => handleAppImageUpload(e, idx)}
                        />
                        <div 
                          onClick={() => document.getElementById(`app-file-input-${idx}`).click()}
                          className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl transition-all duration-300 relative overflow-hidden group-hover/circle:bg-[#FFD700]/20 group-hover/circle:border-yellow-500/40"
                        >
                          {app.imageUrl ? (
                            <img src={app.imageUrl} alt={app.name} className="w-full h-full object-cover" />
                          ) : (
                            <span>{app.icon}</span>
                          )}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/circle:opacity-100 flex items-center justify-center transition-opacity">
                            <Upload size={14} className="text-white animate-pulse" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-4 group-hover:bg-[#FFD700]/10 group-hover:border-[#FFD700]/20 transition-all duration-300 overflow-hidden">
                        {app.imageUrl ? (
                          <img src={app.imageUrl} alt={app.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>{app.icon}</span>
                        )}
                      </div>
                    )}

                    <h3 className="text-white font-bold text-base tracking-wide mb-1.5 group-hover:text-[#FFD700] transition-colors">
                      {app.name}
                    </h3>

                    <p className="text-white/40 text-xs leading-normal">
                      {app.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* SECCIÓN 4: VENTAJAS - European OEM design */}
          <section id="ventajas" className="py-20 max-w-[1400px] mx-auto px-[40px] relative">
            <div className="flex flex-col items-center gap-3 mb-16 text-center">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#FFD700]">Diseño e Ingeniería OEM</span>
              {/* Title (Forzado a Blanco Puro) */}
              <h2 
                className="text-3xl md:text-4xl font-bold tracking-tight text-white transition-all duration-500 hover:text-[#FFD700] hover:scale-105 hover:tracking-wide hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] cursor-pointer select-none"
              >
                {data.s4Title}
              </h2>
              <div className="w-48 h-[4px] bg-[#FFD700] rounded-full mt-4 shadow-[0_0_15px_rgba(255,215,0,0.6)] transition-all duration-500 hover:w-64 mx-auto" />
            </div>

            {/* Advantages Cards Grid - VIDRIO BISELADO AL 30% */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {advantagesList.map((adv, idx) => (
                <div
                  key={idx}
                  id={`adv-card-${idx}`}
                  className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-md rounded-2xl p-8 text-left relative overflow-hidden group hover:border-[#FFD700]/30 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />
                  
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-yellow-500/5 rounded-full blur-xl group-hover:bg-[#FFD700]/10 transition-all duration-300" />

                  <span className="bg-yellow-500/10 text-[#FFD700] font-bold text-[10px] uppercase px-3 py-1 rounded-full border border-yellow-500/20 tracking-wider mb-4 inline-block">
                    {adv.highlight}
                  </span>

                  <h3 className="text-lg md:text-xl font-bold text-white tracking-wide mb-3">
                    {adv.title}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECCIÓN 5: ESPECIFICACIONES TÉCNICAS - Table with hover */}
          <section id="tabla-tecnica" className="py-20 bg-black/40 border-y border-white/5 relative">
            <div className="max-w-[900px] mx-auto px-[40px]">
              
              <div className="flex flex-col items-center gap-3 mb-12 text-center">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#FFD700]">Detalles Mecánicos</span>
                {/* Title (Forzado a Blanco Puro) */}
                <h2 
                  className="text-3xl font-bold tracking-tight text-white transition-all duration-500 hover:text-[#FFD700] hover:scale-105 hover:tracking-wide hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] cursor-pointer select-none"
                >
                  {data.s5Title}
                </h2>
                <div className="w-48 h-[4px] bg-[#FFD700] rounded-full mt-4 shadow-[0_0_15px_rgba(255,215,0,0.6)] transition-all duration-500 hover:w-64 mx-auto" />
              </div>

              {/* Table Wrapper - VIDRIO BISELADO AL 30% */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#FFD700]">Hoja de datos de Ingeniería OEM</span>
                  <button 
                    onClick={() => alert("Generando Ficha Técnica Completa en formato PDF de alta resolución...")}
                    className="inline-flex items-center gap-2 bg-white/5 hover:bg-[#FFD700] hover:text-black text-white border border-white/10 hover:border-[#FFD700] font-bold text-xs py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <ArrowDownToLine size={14} />
                    Descargar Ficha Completa (PDF)
                  </button>
                </div>

                <div className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="py-4 px-6 text-xs font-black uppercase tracking-wider text-white">Parámetro</th>
                        <th className="py-4 px-6 text-xs font-black uppercase tracking-wider text-[#FFD700]">Valor Técnico</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specsList.map((spec, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-white/5 hover:bg-yellow-500/5 transition-all duration-300 group border-l-0 hover:border-l-4 hover:border-l-[#FFD700]"
                        >
                          <td className="py-4 px-6 text-sm font-semibold text-white/80 transition-transform duration-300 group-hover:translate-x-1">{spec.param}</td>
                          <td className="py-4 px-6 text-sm font-normal text-white">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </section>

          {/* SECCIÓN 6: VIDEO DE OPERACIÓN - Large visual placeholder */}
          <section id="video-operacion" className="py-20 max-w-[1100px] mx-auto px-[40px] text-center">
            
            <div className="flex flex-col items-center gap-3 mb-12">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#FFD700]">Visualización en Planta</span>
              {/* Title (Forzado a Blanco Puro) */}
              <h2 
                className="text-3xl md:text-4xl font-bold tracking-tight text-white transition-all duration-500 hover:text-[#FFD700] hover:scale-105 hover:tracking-wide hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] cursor-pointer select-none"
              >
                {data.s6Title}
              </h2>
              <div className="w-48 h-[4px] bg-[#FFD700] rounded-full mt-4 shadow-[0_0_15px_rgba(255,215,0,0.6)] transition-all duration-500 hover:w-64 mx-auto" />
              <p 
                className="text-sm mt-2 leading-relaxed text-white/70"
                style={{ textAlign: data.s6DescAlign }}
              >
                {data.s6Desc}
              </p>
            </div>

            {/* Video Player - VIDRIO BISELADO AL 30% */}
            <div className="relative border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-xl rounded-2xl aspect-video overflow-hidden shadow-2xl flex items-center justify-center group cursor-pointer max-w-[850px] mx-auto">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60" />
              
              <div className="absolute inset-0 bg-yellow-900/5 flex items-center justify-center">
                <div className="w-[300px] h-[300px] border border-yellow-500/10 rounded-full animate-spin [animation-duration:15s] flex items-center justify-center">
                  <div className="w-[200px] h-[200px] border border-yellow-500/5 border-dashed rounded-full" />
                </div>
              </div>

              <div className="absolute top-4 left-4 bg-black/60 border border-white/10 rounded-full px-3.5 py-1.5 flex items-center gap-2 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="text-[10px] text-white/80 font-black tracking-wider uppercase">SIMULACIÓN EN VIVO</span>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[#FFD700] text-black flex items-center justify-center shadow-[0_0_40px_rgba(255,215,0,0.4)] group-hover:scale-110 transition-transform duration-300 border border-white/20">
                  <Play size={32} className="ml-1.5" />
                </div>
                <span className="bg-black/70 border border-white/15 px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest text-white shadow-xl transition-all duration-300 group-hover:border-[#FFD700]/40">
                  ▶ Ver máquina trabajando
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700] via-yellow-400 to-[#FFD700]" />
            </div>

          </section>

          {/* SECCIÓN 7: CONFIGURACIONES DISPONIBLES */}
          <section id="configuraciones" className="py-20 bg-black/40 border-y border-white/5 relative">
            <div className="max-w-[1400px] mx-auto px-[40px] text-center">
              
              <div className="flex flex-col items-center gap-3 mb-16">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#FFD700]">Diseño Modular</span>
                {/* Title (Forzado a Blanco Puro) */}
                <h2 
                  className="text-3xl md:text-4xl font-bold tracking-tight text-white transition-all duration-500 hover:text-[#FFD700] hover:scale-105 hover:tracking-wide hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] cursor-pointer select-none"
                >
                  {data.s7Title}
                </h2>
                <div className="w-48 h-[4px] bg-[#FFD700] rounded-full mt-4 shadow-[0_0_15px_rgba(255,215,0,0.6)] transition-all duration-500 hover:w-64 mx-auto" />
                <p 
                  className="text-sm max-w-lg mt-3 text-white/70 leading-relaxed"
                  style={{ textAlign: data.s7DescAlign }}
                >
                  {data.s7Desc}
                </p>
              </div>

              {/* Grid - VIDRIO BISELADO AL 30% */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto text-left">
                {configurationsList.map((item, idx) => (
                  <div
                    key={idx}
                    id={`config-card-${idx}`}
                    className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-md rounded-xl p-6 flex items-start gap-4 transition-all duration-300 hover:border-yellow-500/25 hover:bg-white/[0.06] hover:translate-x-1"
                  >
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-[#FFD700] shrink-0">
                      <Settings size={18} className="animate-spin [animation-duration:10s]" />
                    </div>

                    <div>
                      <h3 className="text-white font-bold text-[15px] tracking-wide mb-1">{item.name}</h3>
                      <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* SECCIÓN FINAL: CTA futurista */}
          <section id="contacto-cotizar" className="py-24 max-w-[1000px] mx-auto px-[40px] text-center relative">
            <div className="absolute inset-0 bg-[#FFD700]/3 rounded-full blur-[100px] pointer-events-none -z-10" />

            {/* Block - VIDRIO BISELADO AL 30% */}
            <div className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-xl rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent shadow-[0_0_15px_#FFD700]" />
              
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FFD700] block mb-4">Ingeniería Personalizada</span>

              {/* Title (Forzado a Blanco Puro) */}
              <h2 
                className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white"
              >
                {data.ctaTitle}
              </h2>

              <p 
                className="text-sm md:text-base leading-relaxed max-w-[620px] mx-auto mb-10 text-white/80"
                style={{ textAlign: data.ctaDescAlign }}
              >
                {data.ctaDesc}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-[500px] mx-auto">
                <button
                  id="final-btn-quote"
                  onClick={() => alert("¡Solicitud enviada! Un ingeniero de SMQ se pondrá en contacto con usted de inmediato.")}
                  className="bg-[#FFD700] hover:bg-[#FFC107] text-black font-bold text-[15px] py-4 px-8 rounded-lg transition-all duration-300 w-full shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] cursor-pointer"
                >
                  SOLICITAR COTIZACIÓN
                </button>
                <button
                  id="final-btn-chat"
                  onClick={() => alert("Conectando con el departamento técnico...")}
                  className="bg-transparent hover:bg-white/5 text-white border border-white/15 hover:border-white/30 font-semibold text-[15px] py-4 px-8 rounded-lg transition-all duration-300 w-full cursor-pointer"
                >
                  HABLAR CON UN INGENIERO
                </button>
              </div>
            </div>
          </section>

        </main>
        <Footer />
        </div>
      </div>
    </>
  );
};

export default EnvasadoraDoypack;
