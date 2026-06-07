import React, { useEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Factory, Flame, Eye, Recycle, Zap, HardHat, ArrowRight, Shield, Settings, CheckCircle2, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Footer from '@/components/Footer.jsx';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';

const sectionsData = [
  {
    id: 'plantas-rsu',
    num: '01',
    title: 'PLANTAS RSU',
    subtitle: 'Tratamiento y Valorización Integral',
    desc: 'Tratamiento y valorización integral de residuos sólidos urbanos mediante procesos mecánicos y automatizados.',
    longDesc: 'Diseñamos y construimos sistemas robustos para la recepción, separación y clasificación de Residuos Sólidos Urbanos (RSU). Nuestras plantas combinan tolvas de alimentación de alta resistencia, trómeles de clasificación por tamaños, separadores balísticos y sistemas de aspiración para separar eficazmente la fracción orgánica de los materiales reciclables.',
    color: '#22C55E', // Verde
    iconName: 'Factory',
    bgImage: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=800',
    specs: [
      'Capacidad modular desde 10 hasta 100 Ton/hora',
      'Clasificación automática de fracciones finas y orgánicas',
      'Sistemas de control de olores y polvo integrados',
      'Banda transportadora de alta resistencia con velocidad regulable'
    ]
  },
  {
    id: 'cdr-rdf',
    num: '02',
    title: 'PRODUCCIÓN DE CDR / RDF',
    subtitle: 'Combustible Derivado de Residuos',
    desc: 'Procesamiento de combustibles derivados de residuos de alto poder calorífico para uso industrial y energético.',
    longDesc: 'Transformamos residuos no reciclables de origen comercial e industrial en Combustible Derivado de Residuos (CDR / RDF). Mediante trituración secundaria, secado térmico y separación de metales, producimos un combustible alternativo de alta calidad y poder calorífico constante, ideal para su uso en hornos de cemento y plantas termoeléctricas.',
    color: '#F59E0B', // Naranja
    iconName: 'Flame',
    bgImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800',
    specs: [
      'Poder calorífico neto de hasta 18-22 MJ/kg',
      'Humedad final controlada inferior al 15%',
      'Sistemas de separación de cloro y metales pesados en línea',
      'Granulometría homogénea ajustable a requerimiento del cliente'
    ]
  },
  {
    id: 'clasificacion-inteligente',
    num: '03',
    title: 'CLASIFICACIÓN INTELIGENTE',
    subtitle: 'Separación Óptica por Inteligencia Artificial',
    desc: 'Separación automatizada por NIR, inducción y sistemas multisensoriales con inteligencia artificial para máxima precisión y pureza.',
    longDesc: 'Incorporamos tecnología de última generación en clasificación óptica (NIR) y visión artificial. Nuestros sistemas inteligentes detectan y separan plásticos por polímeros (PET, PEAD, PP, PS, PVC), cartón y metales a velocidades extremas, optimizando los rendimientos de pureza hasta en un 98% mediante soplado neumático de alta precisión.',
    color: '#06B6D4', // Azul Cian
    iconName: 'Eye',
    bgImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
    specs: [
      'Resolución de escaneo NIR de hasta 320 canales de detección',
      'Algoritmos de aprendizaje profundo para reconocimiento de formas y marcas',
      'Tasa de eyección neumática precisa con respuesta en milisegundos',
      'Monitoreo y telemetría de pureza en tiempo real en la nube'
    ]
  },
  {
    id: 'recuperacion-materiales',
    num: '04',
    title: 'RECUPERACIÓN DE MATERIALES',
    subtitle: 'Tecnologías de Separación Avanzada',
    desc: 'Extracción eficiente de metales, plásticos y materiales reciclables con tecnologías de separación avanzadas.',
    longDesc: 'Desarrollamos soluciones integrales de separación física para la recuperación de valiosos metales ferrosos y no ferrosos (aluminio, cobre) mediante separadores de corrientes de Foucault (Eddy Current). Combinado con cribas magnéticas y separadores mecánicos de aire, logramos desviar toneladas de recursos útiles de los vertederos.',
    color: '#8B5CF6', // Morado
    iconName: 'Recycle',
    bgImage: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=800',
    specs: [
      'Separadores de corrientes de Foucault de alta frecuencia',
      'Tambores magnéticos de tierras raras de gran poder de atracción',
      'Sistemas de clasificación por corrientes de aire (Air Classifiers)',
      'Máximo retorno de inversión gracias al alto índice de material recuperado'
    ]
  },
  {
    id: 'conversion-energetica',
    num: '05',
    title: 'CONVERSIÓN ENERGÉTICA',
    subtitle: 'Gasificación, Pirólisis y Co-generación',
    desc: 'Tecnologías de gasificación, pirólisis, biomasa y co-generación para transformar residuos en energía útil.',
    longDesc: 'Implementamos sistemas avanzados de conversión térmica (Waste-to-Energy). Nuestras soluciones incluyen reactores de gasificación de lecho fluidizado y plantas de pirólisis para convertir fracciones de polímeros y biomasa en gas de síntesis (syngas), vapor de proceso y energía eléctrica limpia, respetando las más estrictas normativas ambientales globales.',
    color: '#EC4899', // Rosa
    iconName: 'Zap',
    bgImage: 'https://images.unsplash.com/photo-1513828742140-ccaa34f3158e?auto=format&fit=crop&q=80&w=800',
    specs: [
      'Reactores de conversión térmica de alta eficiencia termodinámica',
      'Sistemas de lavado de gases de combustión multietapa (SCR/SnCR)',
      'Generación combinada de calor y electricidad (CHP / Co-generación)',
      'Cumplimiento con Directiva Europea de Emisiones Industriales (IED)'
    ]
  },
  {
    id: 'plantas-llave-en-mano',
    num: '06',
    title: 'PLANTAS LLAVE EN MANO',
    subtitle: 'Ingeniería, Fabricación e Instalación Integral',
    desc: 'Ingeniería completa desde el diseño, fabricación, instalación y automatización hasta la puesta en marcha y soporte operativo.',
    longDesc: 'Ofrecemos proyectos llave en mano (EPC) desde el diseño conceptual del layout hasta la instalación, automatización mediante PLC/SCADA y capacitación del personal operativo. Nos encargamos de todo el ciclo del proyecto para entregar plantas de valorización listas para producir valor de forma confiable, segura y rentable.',
    color: '#22C55E', // Verde
    iconName: 'HardHat',
    bgImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    specs: [
      'Ingeniería civil, mecánica y eléctrica unificada en 3D (BIM)',
      'Gabinetes de control centralizados con protocolos Profinet / Ethernet',
      'Puesta en marcha y pruebas de rendimiento de planta (FAT / SAT)',
      'Soporte técnico posventa garantizado y stock de repuestos'
    ]
  }
];

const iconMap = {
  Factory: Factory,
  Flame: Flame,
  Eye: Eye,
  Recycle: Recycle,
  Zap: Zap,
  HardHat: HardHat,
  Settings: Settings
};

const availableIcons = ['Factory', 'Flame', 'Eye', 'Recycle', 'Zap', 'HardHat', 'Settings'];

const WasteToEnergy = () => {
  const { hash } = useLocation();
  const lastScrolledHashRef = useRef('');
  const { cmsState, isEditorMode, updatePageModule } = useCMS();

  // Índices de imágenes activas en los carruseles de cada sección
  const [activeImageIndices, setActiveImageIndices] = useState({});

  // Estados locales para carga
  const [uploadingHeroBg, setUploadingHeroBg] = useState(false);
  const [uploadingSectionId, setUploadingSectionId] = useState(null);

  // Obtener datos del CMS o usar fallback estático
  const pageData = cmsState?.pages?.find(p => p.id === 'wte');
  const moduleData = pageData?.modules?.find(m => m.id === 'content');
  const wteData = moduleData?.data || {};

  const activeHero = {
    title1: wteData.hero?.title1 ?? 'Soluciones',
    title2: wteData.hero?.title2 ?? 'Waste to Energy',
    subtitle: wteData.hero?.subtitle ?? 'Tecnologías y sistemas integrados para el tratamiento, valorización y conversión de residuos en energía y recursos. Desarrollamos soluciones de alta ingeniería para mitigar el impacto ambiental y maximizar la rentabilidad operativa.',
    bgImage: wteData.hero?.bgImage ?? 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    stats: wteData.hero?.stats ?? [
      { val: '99.2%', lbl: 'Eficiencia del Proceso' },
      { val: 'WTE-60', lbl: 'Estándar Tecnológico' },
      { val: '100%', lbl: 'Cumplimiento Ambiental' },
      { val: 'CO2-Neg', lbl: 'Reducción de Huella' }
    ]
  };

  const activeSections = wteData.sections ?? sectionsData;

  const activeFooterBanner = {
    title: wteData.footerBanner?.title ?? '¿Listo para Configurar tu Proyecto WTE?',
    subtitle: wteData.footerBanner?.subtitle ?? 'Nuestro equipo de ingeniería avanzada está disponible para realizar layouts integrales, simulaciones de flujo de proceso y cotizaciones optimizadas a la medida de tus necesidades de valorización.',
  };

  // Obtener índice activo para el carrusel de una sección dada
  const getActiveIndex = (secId, maxIndex) => {
    const idx = activeImageIndices[secId] ?? 0;
    if (idx >= maxIndex) return 0;
    return idx;
  };

  const handleNextImage = (secId, imagesCount) => {
    setActiveImageIndices(prev => ({
      ...prev,
      [secId]: ((prev[secId] ?? 0) + 1) % imagesCount
    }));
  };

  const handlePrevImage = (secId, imagesCount) => {
    setActiveImageIndices(prev => ({
      ...prev,
      [secId]: ((prev[secId] ?? 0) - 1 + imagesCount) % imagesCount
    }));
  };

  // Subida de imagen de fondo del Hero
  const handleUploadHeroBg = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        setUploadingHeroBg(true);
        const url = await uploadFile(file);
        updatePageModule('wte', 'content', {
          hero: { ...activeHero, bgImage: url }
        });
      } catch (error) {
        console.error('Error uploading hero bg:', error);
        alert('Error al subir la imagen. Por favor intente de nuevo.');
      } finally {
        setUploadingHeroBg(false);
      }
    };
    fileInput.click();
  };

  // Agregar imagen al carrusel de una sección
  const handleAddSectionImage = async (sectionId) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        setUploadingSectionId(sectionId);
        const url = await uploadFile(file);
        
        const sec = activeSections.find(s => s.id === sectionId);
        const currentImages = sec.images || [{ url: sec.bgImage, name: sec.title }];
        
        const updatedImages = [...currentImages, { url, name: 'Nombre del Equipo' }];
        
        const updatedSections = activeSections.map(s =>
          s.id === sectionId ? { ...s, images: updatedImages } : s
        );
        updatePageModule('wte', 'content', { sections: updatedSections });
        
        // Mover el índice al último agregado
        setActiveImageIndices(prev => ({
          ...prev,
          [sectionId]: updatedImages.length - 1
        }));
      } catch (error) {
        console.error('Error adding section image:', error);
        alert('Error al subir la imagen. Por favor intente de nuevo.');
      } finally {
        setUploadingSectionId(null);
      }
    };
    fileInput.click();
  };

  // Eliminar la imagen activa del carrusel de una sección
  const handleDeleteSectionImage = (sectionId, indexToDelete) => {
    const sec = activeSections.find(s => s.id === sectionId);
    const currentImages = sec.images || [{ url: sec.bgImage, name: sec.title }];
    
    if (currentImages.length <= 1) return;
    
    const updatedImages = currentImages.filter((_, idx) => idx !== indexToDelete);
    
    const updatedSections = activeSections.map(s =>
      s.id === sectionId ? { ...s, images: updatedImages } : s
    );
    updatePageModule('wte', 'content', { sections: updatedSections });
    
    setActiveImageIndices(prev => ({
      ...prev,
      [sectionId]: Math.max(0, (prev[sectionId] ?? 0) - 1)
    }));
  };

  // Actualizar el nombre de una imagen
  const handleUpdateImageName = (sectionId, indexToUpdate, newName) => {
    const sec = activeSections.find(s => s.id === sectionId);
    const currentImages = sec.images || [{ url: sec.bgImage, name: sec.title }];
    
    const updatedImages = currentImages.map((img, idx) =>
      idx === indexToUpdate ? { ...img, name: newName } : img
    );
    
    const updatedSections = activeSections.map(s =>
      s.id === sectionId ? { ...s, images: updatedImages } : s
    );
    updatePageModule('wte', 'content', { sections: updatedSections });
  };

  // Rotación interactiva de iconos
  const handleNextIcon = (sectionId, currentIconName) => {
    const iconName = currentIconName || 'Factory';
    const currentIndex = availableIcons.indexOf(iconName);
    const nextIndex = (currentIndex + 1) % availableIcons.length;
    const nextIcon = availableIcons[nextIndex];

    const updatedSections = activeSections.map(s =>
      s.id === sectionId ? { ...s, iconName: nextIcon } : s
    );
    updatePageModule('wte', 'content', { sections: updatedSections });
  };

  // Efecto para scroll suave dinámico al hash
  useEffect(() => {
    if (hash) {
      const currentHash = hash;
      if (lastScrolledHashRef.current === currentHash) return;

      const id = currentHash.substring(1);
      
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          lastScrolledHashRef.current = currentHash;
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 350);

      return () => clearTimeout(timer);
    } else {
      lastScrolledHashRef.current = '';
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="bg-[#05070a] text-white min-h-screen font-sans selection:bg-[#22C55E]/30 selection:text-[#22C55E] overflow-x-hidden">
      <Helmet>
        <title>Soluciones Waste to Energy | SMQ Industrial Systems</title>
        <meta name="description" content="Tecnologías y sistemas integrados para el tratamiento, valorización y conversión de residuos sólidos urbanos e industriales en energía y recursos de alto valor." />
      </Helmet>

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[75vh] flex items-center pt-24 pb-16 overflow-hidden">
        {/* Background Parallax Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={activeHero.bgImage} 
            alt="Waste to Energy Industrial Plant" 
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-transparent to-[#05070a]" />
        </div>

        {isEditorMode && (
          <button
            onClick={handleUploadHeroBg}
            disabled={uploadingHeroBg}
            className="absolute top-28 right-8 bg-[#22C55E] text-black hover:bg-[#1f9d4b] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all z-20 flex items-center gap-2"
          >
            {uploadingHeroBg ? (
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <ImageIcon size={14} />
            )}
            <span>Cambiar Fondo Hero</span>
          </button>
        )}

        <div className="max-w-[1400px] mx-auto px-6 md:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#22C55E] uppercase hover:text-white transition-colors"
            >
              <ArrowLeft size={12} />
              <span>Volver a Inicio</span>
            </Link>
            
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#22C55E]">
              VALORIZACIÓN ENERGÉTICA Y AMBIENTAL
            </p>
            
            <div className="space-y-2">
              <h1 
                className={`text-4xl md:text-6xl font-black tracking-tight uppercase leading-[1.05] ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 bg-black/25 rounded cursor-text' : ''}`}
                contentEditable={isEditorMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  updatePageModule('wte', 'content', {
                    hero: { ...activeHero, title1: e.target.innerText }
                  });
                }}
              >
                {activeHero.title1}
              </h1>
              <h2 
                className={`text-3xl md:text-5xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 bg-black/25 rounded cursor-text' : ''}`}
                contentEditable={isEditorMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  updatePageModule('wte', 'content', {
                    hero: { ...activeHero, title2: e.target.innerText }
                  });
                }}
              >
                {activeHero.title2}
              </h2>
            </div>
            
            <p 
              className={`text-white/75 text-base md:text-lg leading-relaxed max-w-2xl ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 bg-black/25 rounded cursor-text' : ''}`}
              contentEditable={isEditorMode}
              suppressContentEditableWarning={true}
              onBlur={(e) => {
                updatePageModule('wte', 'content', {
                  hero: { ...activeHero, subtitle: e.target.innerText }
                });
              }}
            >
              {activeHero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#plantas-rsu"
                className="px-6 py-3 bg-[#22C55E] hover:bg-[#1f9d4b] text-black font-black text-xs tracking-widest uppercase rounded-full transition-all shadow-[0_4px_20px_rgba(34,197,94,0.3)] flex items-center gap-2"
              >
                <span>Explorar Soluciones</span>
                <ArrowRight size={14} />
              </a>
              <Link 
                to="/nosotros"
                className="px-6 py-3 border border-white/10 hover:border-white/30 text-white font-black text-xs tracking-widest uppercase rounded-full transition-all bg-white/5 hover:bg-white/10"
              >
                Nuestra Ingeniería
              </Link>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-2xl">
            {activeHero.stats.map((stat, i) => (
              <div 
                key={i} 
                className="p-4 bg-black/40 border border-white/5 rounded-2xl flex flex-col justify-center"
              >
                <span 
                  className={`text-2xl md:text-3xl font-black text-[#22C55E] tracking-tight leading-none mb-1 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-0.5 rounded cursor-text' : ''}`}
                  contentEditable={isEditorMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const newStats = [...activeHero.stats];
                    newStats[i] = { ...newStats[i], val: e.target.innerText };
                    updatePageModule('wte', 'content', {
                      hero: { ...activeHero, stats: newStats }
                    });
                  }}
                >
                  {stat.val}
                </span>
                <span 
                  className={`text-[10px] text-white/50 uppercase tracking-wider font-bold leading-tight ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-0.5 rounded cursor-text' : ''}`}
                  contentEditable={isEditorMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const newStats = [...activeHero.stats];
                    newStats[i] = { ...newStats[i], lbl: e.target.innerText };
                    updatePageModule('wte', 'content', {
                      hero: { ...activeHero, stats: newStats }
                    });
                  }}
                >
                  {stat.lbl}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── DETAILED SOLUTIONS SECTIONS ── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 space-y-32">
        {activeSections.map((sec, idx) => {
          const Icon = iconMap[sec.iconName] || Factory;
          const sectionImages = sec.images || [{ url: sec.bgImage, name: sec.title }];
          const activeIdx = getActiveIndex(sec.id, sectionImages.length);
          const currentImage = sectionImages[activeIdx] || { url: sec.bgImage, name: sec.title };
          return (
            <div 
              key={sec.id}
              id={sec.id}
              className="scroll-mt-[100px] grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center border-b border-white/5 pb-20 md:pb-28 last:border-b-0 last:pb-0 relative"
            >
              {/* Text Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div 
                    onClick={() => {
                      if (isEditorMode) {
                        handleNextIcon(sec.id, sec.iconName);
                      }
                    }}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center ${isEditorMode ? 'cursor-pointer hover:bg-white/10 border-blue-400 border-dashed animate-pulse' : ''}`}
                    style={{ 
                      backgroundColor: `${sec.color}15`, 
                      borderColor: isEditorMode ? undefined : `${sec.color}30` 
                    }}
                    title={isEditorMode ? "Haga clic para cambiar de ícono" : undefined}
                  >
                    <Icon size={18} color={sec.color} />
                  </div>
                  <div className="flex flex-col">
                    <span 
                      className="text-[10px] font-black uppercase tracking-[0.3em]"
                      style={{ color: sec.color }}
                    >
                      TECNOLOGÍA {sec.num}
                    </span>
                    <h2 
                      className={`text-2xl md:text-3xl font-black tracking-tight text-white uppercase ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-0.5 rounded cursor-text' : ''}`}
                      contentEditable={isEditorMode}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const updatedSections = activeSections.map(s =>
                          s.id === sec.id ? { ...s, title: e.target.innerText } : s
                        );
                        updatePageModule('wte', 'content', { sections: updatedSections });
                      }}
                    >
                      {sec.title}
                    </h2>
                  </div>
                </div>

                {/* Highlighted short desc */}
                <p 
                  className={`font-bold text-[15px] leading-relaxed border-l-2 pl-4 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-0.5 rounded cursor-text' : ''}`}
                  style={{ borderColor: sec.color }}
                  contentEditable={isEditorMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const updatedSections = activeSections.map(s =>
                      s.id === sec.id ? { ...s, desc: e.target.innerText } : s
                    );
                    updatePageModule('wte', 'content', { sections: updatedSections });
                  }}
                >
                  {sec.desc}
                </p>

                {/* Long detailed desc */}
                <p 
                  className={`text-white/60 text-sm leading-relaxed ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-0.5 rounded cursor-text' : ''}`}
                  contentEditable={isEditorMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const updatedSections = activeSections.map(s =>
                      s.id === sec.id ? { ...s, longDesc: e.target.innerText } : s
                    );
                    updatePageModule('wte', 'content', { sections: updatedSections });
                  }}
                >
                  {sec.longDesc}
                </p>

                {/* Specifications list */}
                <div className="space-y-3 pt-3">
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                    Especificaciones Clave:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sec.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5 text-white/80 text-xs font-semibold">
                        <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: sec.color }} />
                        <span 
                          className={`leading-tight ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-0.5 rounded w-full cursor-text' : ''}`}
                          contentEditable={isEditorMode}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => {
                            const newSpecs = [...sec.specs];
                            newSpecs[sIdx] = e.target.innerText;
                            const updatedSections = activeSections.map(s =>
                              s.id === sec.id ? { ...s, specs: newSpecs } : s
                            );
                            updatePageModule('wte', 'content', { sections: updatedSections });
                          }}
                        >
                          {spec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to Action buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/[0.05]">
                  <a 
                    href="mailto:ventas@smq.com?subject=Cotizacion%20-%20Plantas%20RSU"
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold text-[10px] tracking-widest uppercase rounded-lg transition-all flex items-center gap-2"
                  >
                    <span>Cotizar Solución</span>
                    <ArrowRight size={12} style={{ color: sec.color }} />
                  </a>
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Shield size={12} className="text-white/30" />
                    Ingeniería Certificada
                  </span>
                </div>
              </div>

              {/* Media Column (Image carousel) */}
              <div className="lg:col-span-6 relative group">
                {/* Outer Glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-10 blur-3xl transition-opacity group-hover:opacity-20 duration-500"
                  style={{ backgroundColor: sec.color }}
                />
                
                {/* Photo frame */}
                <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#090b0f]">
                  <img 
                    src={currentImage.url} 
                    alt={currentImage.name} 
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Color Tint Overlay */}
                  {!sec.disableFilters && (
                    <div 
                      className="absolute inset-0 opacity-20 mix-blend-color transition-opacity group-hover:opacity-30 pointer-events-none" 
                      style={{ backgroundColor: sec.color }}
                    />
                  )}
                  
                  {/* Gradient Overlay for text contrast */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pt-16 pointer-events-none transition-all duration-300 ${
                      sec.disableFilters ? 'opacity-80' : 'opacity-100'
                    }`} 
                  />
                  
                  {/* Controles del Editor sobre la imagen */}
                  {isEditorMode && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                      {/* Botón para activar/desactivar filtros */}
                      <button
                        onClick={() => {
                          const updatedSections = activeSections.map(s =>
                            s.id === sec.id ? { ...s, disableFilters: !s.disableFilters } : s
                          );
                          updatePageModule('wte', 'content', { sections: updatedSections });
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border shadow-lg transition-all ${
                          sec.disableFilters 
                            ? 'bg-[#22C55E] text-black border-[#22C55E]' 
                            : 'bg-black/80 hover:bg-black text-white/90 border-white/20'
                        }`}
                        title={sec.disableFilters ? "Filtros desactivados (Imagen Real). Clic para activarlos." : "Filtros activos. Clic para desactivarlos."}
                      >
                        {sec.disableFilters ? 'Original' : 'Con Filtro'}
                      </button>

                      <button
                        onClick={() => handleAddSectionImage(sec.id)}
                        disabled={uploadingSectionId === sec.id}
                        className="bg-black/80 hover:bg-black text-[#22C55E] px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-white/20 shadow-lg transition-all flex items-center gap-1"
                        title="Agregar nueva imagen de equipo"
                      >
                        {uploadingSectionId === sec.id ? (
                          <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <span className="text-xs font-bold">+</span>
                        )}
                        <span>Subir</span>
                      </button>
                      
                      {sectionImages.length > 1 && (
                        <button
                          onClick={() => handleDeleteSectionImage(sec.id, activeIdx)}
                          className="bg-black/80 hover:bg-red-600 hover:text-white text-white/70 px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-white/20 shadow-lg transition-all"
                          title="Eliminar esta imagen"
                        >
                          ✕ Quitar
                        </button>
                      )}
                    </div>
                  )}

                  {/* Flechas de Navegación del Carrusel (si hay más de 1 imagen) */}
                  {sectionImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage(sec.id, sectionImages.length);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white border border-white/10 hover:border-white/30 flex items-center justify-center transition-all z-20"
                        title="Equipo anterior"
                      >
                        ←
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage(sec.id, sectionImages.length);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white border border-white/10 hover:border-white/30 flex items-center justify-center transition-all z-20"
                        title="Siguiente equipo"
                      >
                        →
                      </button>
                    </>
                  )}

                  {/* Indicador de posición (Puntos de carrusel) */}
                  {sectionImages.length > 1 && (
                    <div className="absolute top-4 left-4 flex gap-1.5 z-20 bg-black/40 px-2 py-1 rounded-full border border-white/5">
                      {sectionImages.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setActiveImageIndices(prev => ({ ...prev, [sec.id]: dotIdx }))}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${dotIdx === activeIdx ? 'w-3' : 'opacity-40'}`}
                          style={{ backgroundColor: dotIdx === activeIdx ? sec.color : 'white' }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Nombre del Equipo en la parte baja */}
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent pt-12 flex flex-col z-10">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">
                      Equipo Técnico
                    </span>
                    <div className="flex items-center justify-between gap-4">
                      <h5 
                        className={`text-sm md:text-base font-bold text-white tracking-tight leading-tight w-full ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-0.5 rounded cursor-text bg-white/5' : ''}`}
                        contentEditable={isEditorMode}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          handleUpdateImageName(sec.id, activeIdx, e.target.innerText);
                        }}
                      >
                        {currentImage.name}
                      </h5>
                      {sectionImages.length > 1 && (
                        <span className="text-[10px] font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/5 shrink-0">
                          {activeIdx + 1} / {sectionImages.length}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Floating Big Index Number */}
                <span 
                  className="absolute -top-10 -right-6 text-[110px] font-black leading-none opacity-[0.03] select-none font-mono"
                  style={{ color: sec.color }}
                >
                  {sec.num}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── CONCLUDING CALL TO ACTION BANNER ── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent p-8 md:p-16 text-center space-y-6">
          {/* Background overlay */}
          <div className="absolute inset-0 z-0 bg-[#07090d]/80 backdrop-blur-sm" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#22C55E]">
              CONSTRUIBLE BAJO ESPECIFICACIÓN
            </p>
            <h2 
              className={`text-3xl md:text-5xl font-black tracking-tight uppercase ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 bg-black/25 rounded cursor-text' : ''}`}
              contentEditable={isEditorMode}
              suppressContentEditableWarning={true}
              onBlur={(e) => {
                updatePageModule('wte', 'content', {
                  footerBanner: { ...activeFooterBanner, title: e.target.innerText }
                });
              }}
            >
              {activeFooterBanner.title}
            </h2>
            <p 
              className={`text-white/60 text-sm md:text-base leading-relaxed ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 bg-black/25 rounded cursor-text' : ''}`}
              contentEditable={isEditorMode}
              suppressContentEditableWarning={true}
              onBlur={(e) => {
                updatePageModule('wte', 'content', {
                  footerBanner: { ...activeFooterBanner, subtitle: e.target.innerText }
                });
              }}
            >
              {activeFooterBanner.subtitle}
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a 
                href="mailto:ingenieria@smq.com?subject=Consulta%20Waste%20to%20Energy"
                className="px-6 py-3 bg-[#22C55E] hover:bg-[#1f9d4b] text-black font-black text-xs tracking-widest uppercase rounded-full transition-all shadow-[0_4px_20px_rgba(34,197,94,0.3)] flex items-center gap-2"
              >
                <span>Contactar a un Experto</span>
                <ArrowRight size={14} />
              </a>
              <Link 
                to="/nosotros"
                className="px-6 py-3 border border-white/10 hover:border-white/30 text-white font-black text-xs tracking-widest uppercase rounded-full transition-all bg-white/5 hover:bg-white/10"
              >
                Explorar Más Sectores
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WasteToEnergy;
