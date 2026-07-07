import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Cpu, 
  Eye, 
  Settings, 
  Activity, 
  Zap, 
  TrendingUp,
  X,
  Upload,
  ArrowUpRight,
  Lightbulb,
  Star,
  Handshake,
  Leaf
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';
import { getOptimizedImageUrl } from '@/lib/utils.js';
import DecipherText from '@/components/DecipherText.jsx';

// Stat Counter with Ease-Out Deceleration
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
    setCount(0);

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
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
    return <span className="text-[#F5C400] tracking-wide animate-pulse">{target}</span>;
  }

  return <span>{count}{suffix}</span>;
};

// Reusable Stat Card inside the section
const StatCard = ({ target, suffix = '', label }) => {
  const [trigger, setTrigger] = useState(0);
  
  return (
    <div 
      className="flex flex-col items-center self-center cursor-pointer transition-all duration-300 transform hover:scale-110 group py-4 px-2"
      onMouseEnter={() => setTrigger(prev => prev + 1)}
    >
      <span className="text-3xl md:text-5xl font-black text-[#F5C400] drop-shadow-[0_0_12px_rgba(245,196,0,0.4)] tracking-tight transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
        <StatCounter target={target} suffix={suffix} trigger={trigger} />
      </span>
      <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-[#A1A8B3] mt-2 transition-colors duration-300 group-hover:text-[#F5C400]">
        {label}
      </span>
    </div>
  );
};

const NosotrosSection = () => {
  const navigate = useNavigate();
  const { cmsState, isEditorMode, updatePageModule, updateMediaModule, updateMediaProp } = useCMS();

  // Extract page module data
  const homePage = cmsState.pages?.find(p => p.id === 'home');
  const nosotrosFinalData = homePage?.modules?.find(m => m.id === 'nosotros-final')?.data || {};
  const nosotrosCardsData = homePage?.modules?.find(m => m.id === 'nosotros-cards')?.data || {};

  const backgroundImageUrl = nosotrosFinalData.backgroundImageUrl || '/nosotros_futuro_industrial.png';
  const imageOpacity = nosotrosFinalData.imageOpacity ?? 100;
  const filterColor = nosotrosFinalData.filterColor || '#000000';
  const filterOpacity = nosotrosFinalData.filterOpacity ?? 75;

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const collageImage = nosotrosFinalData.collageImage || '/nosotros_industrial_hero.png';
  const collageVideo = nosotrosFinalData.collageVideo !== undefined ? nosotrosFinalData.collageVideo : 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780095574453_cajas%20fast%20webm.webm';

  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const collageImageInputRef = useRef(null);
  const collageVideoInputRef = useRef(null);
  const dialogFileInputRef = useRef(null);
  const [activeDialogCard, setActiveDialogCard] = useState(null);

  const dialogImages = {
    mision: nosotrosCardsData['dialog-image-mision'] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    vision: nosotrosCardsData['dialog-image-vision'] || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    valores: nosotrosCardsData['dialog-image-valores'] || 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80',
  };

  const handleDialogImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeDialogCard) return;
    try {
      setIsUploading(true);
      const url = await uploadFile(file);
      updatePageModule('home', 'nosotros-cards', {
        [`dialog-image-${activeDialogCard}`]: url
      });
    } catch (err) {
      console.error("Error al subir imagen del diálogo:", err);
      alert("Error al subir la imagen.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCollageImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadFile(file);
      updatePageModule('home', 'nosotros-final', { 
        ...nosotrosFinalData,
        collageImage: url,
        collageVideo: ''
      });
    } catch (error) {
      console.error("Error uploading collage image:", error);
      alert("Error al subir la imagen.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCollageVideoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadFile(file);
      updatePageModule('home', 'nosotros-final', { 
        ...nosotrosFinalData,
        collageVideo: url 
      });
    } catch (error) {
      console.error("Error uploading collage video:", error);
      alert("Error al subir el video.");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle video element play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isPlayingVideo) {
        videoRef.current.play().catch(err => console.error("Error playing video:", err));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isPlayingVideo]);

  // Card Flip States and Refs
  const [flippedCards, setFlippedCards] = useState({});
  const [uploadingCardIdx, setUploadingCardIdx] = useState(null);
  const cardFileInputRef = useRef(null);

  const defaultCards = [
    {
      title: 'Automatización Industrial',
      desc: 'Lógica de control avanzada y sistemas de supervisión estables.',
      tags: 'PLC · HMI · SCADA',
      icon: Cpu,
      defaultImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      color: '#0EA5E9',
      path: '/tecnologia/automatizacion'
    },
    {
      title: 'Robótica',
      desc: 'Celdas dinámicas de manipulación y paletizado de alta velocidad.',
      tags: 'Sistemas de manipulación',
      icon: Activity,
      defaultImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
      color: '#F97316',
      path: '/tecnologia/robotica'
    },
    {
      title: 'Visión Artificial',
      desc: 'Sistemas de inspección óptica con clasificación y detección micrométrica.',
      tags: 'Control de calidad inteligente',
      icon: Eye,
      defaultImage: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=600&q=80',
      color: '#8B5CF6',
      path: '/tecnologia/vision'
    },
    {
      title: 'Integración Mecánica',
      desc: 'Ingeniería CAD robusta de precisión y ensamble higiénico estructural.',
      tags: 'Diseño y fabricación',
      icon: Settings,
      defaultImage: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&w=600&q=80',
      color: '#10B981',
      path: '/tecnologia/mecanica'
    },
    {
      title: 'Industria 4.0',
      desc: 'Conectividad IIoT con análisis telemétrico de variables críticas de planta.',
      tags: 'Monitoreo y analítica',
      icon: TrendingUp,
      defaultImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
      color: '#3B82F6',
      path: '/tecnologia/industria40'
    },
    {
      title: 'Inteligencia Artificial',
      desc: 'Modelos de IA locales para balanceo dinámico y mantenimiento predictivo.',
      tags: 'Optimización de procesos',
      icon: Zap,
      defaultImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80',
      color: '#EAB308',
      path: '/tecnologia/ia'
    }
  ];

  // Preload all back side card images and section backgrounds for instant rendering
  useEffect(() => {
    // 1. Preload card images
    defaultCards.forEach((card, index) => {
      const cardImage = nosotrosCardsData[`card-image-${index}`] || card.defaultImage;
      if (cardImage) {
        const img = new Image();
        img.src = cardImage;
      }
    });

    // 2. Preload section background
    if (backgroundImageUrl) {
      const img = new Image();
      img.src = backgroundImageUrl;
    }
  }, [nosotrosCardsData, backgroundImageUrl]);

  // Handle ESC key press to reset all flipped cards, video, and modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setFlippedCards({});
        setIsPlayingVideo(false);
        setActiveDialogCard(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadFile(file);
      updatePageModule('home', 'nosotros-final', { backgroundImageUrl: url });
    } catch (error) {
      console.error("Error uploading background image:", error);
      alert("Error al subir la imagen. Por favor intente de nuevo.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCardImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingCardIdx(index);
      const url = await uploadFile(file);
      updatePageModule('home', 'nosotros-cards', {
        [`card-image-${index}`]: url
      });
    } catch (err) {
      console.error("Error uploading card image:", err);
      alert("Error al subir la imagen para la tarjeta.");
    } finally {
      setUploadingCardIdx(null);
    }
  };

  return (
    <div id="nosotros" className="relative bg-[#030712] text-white overflow-hidden font-['Poppins'] scroll-mt-[100px]">
      
      {/* 1. HERO NOSOTROS */}
      <section 
        className="relative min-h-[60vh] md:min-h-[75vh] flex items-center justify-start py-20 px-8 md:px-16 lg:px-[80px] border-b border-white/5 bg-cover bg-center bg-no-repeat overflow-hidden group"
        style={{ backgroundImage: `url('${collageImage || '/smq_nosotros.jpg'}')` }}
      >
        {/* Background Video Loop if present */}
        {collageVideo && (
          <video
            src={collageVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          />
        )}

        {/* Premium Gradient Overlay to completely hide baked-in text on the left and blend to the right */}
        <div 
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, #030712 0%, #030712 25%, rgba(3, 7, 18, 0.95) 45%, rgba(3, 7, 18, 0.6) 70%, rgba(3, 7, 18, 0) 100%)"
          }}
        />

        {/* Tech Grid overlay for micro-telemetry feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-[2]" />
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#3B82F6]/5 rounded-full filter blur-[100px] pointer-events-none z-[2]" />

        <div className="max-w-[1400px] w-full mx-auto relative z-10 flex items-stretch justify-start">
          {/* Animated Vertical Line */}
          <motion.div 
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="w-[4px] bg-[#3B82F6] shadow-[0_0_20px_#3B82F6] origin-top shrink-0"
          />
          
          <div className="pl-6 md:pl-10 flex flex-col items-start gap-4 md:gap-6 py-2">
            
            {/* Main Title - NOSOTROS */}
            <motion.h2 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tight text-white leading-none uppercase select-none font-sans drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            >
              NOSOTROS
            </motion.h2>

            {/* Subtitle - Empresa integradora y desarrolladora... */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-white/95 text-sm md:text-base lg:text-lg font-normal tracking-wide leading-relaxed max-w-[850px] font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            >
              SMQ Industrial Systems desarrolla maquinaria industrial especializada para reciclaje, procesamiento y valorización de materiales. Integramos sistemas completos para trituración, separación, lavado, peletizado, recuperación de recursos y soluciones de Valorización Energética. Nuestro enfoque combina ingeniería aplicada, automatización y plantas industriales llave en mano adaptadas a las necesidades de cada cliente.
            </motion.p>

            {/* Navigation links - Historia • Visión • Valores */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm font-bold uppercase tracking-wider text-white/50 mt-2 font-mono"
            >
              <a href="/nosotros#historia" className="hover:text-[#3B82F6] hover:text-white transition-colors duration-300">Historia</a>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"></span>
              <a href="/nosotros#mision" className="hover:text-[#3B82F6] hover:text-white transition-colors duration-300">Misión</a>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"></span>
              <a href="/nosotros#vision" className="hover:text-[#3B82F6] hover:text-white transition-colors duration-300">Visión</a>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"></span>
              <a href="/nosotros#valores" className="hover:text-[#3B82F6] hover:text-white transition-colors duration-300">Valores</a>
            </motion.div>

          </div>
        </div>

        {/* Technical HUD details in corners to align with SMQ 4.0 style */}
        <div className="absolute bottom-6 right-8 z-10 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded font-mono text-[9px] text-white/50 select-none hidden md:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
          <span>SISTEMA: EN LÍNEA // ASESORÍA ACTIVA</span>
        </div>

        {/* Editor upload triggers */}
        {isEditorMode && (
          <div className="absolute top-4 left-4 z-30 flex gap-2 pointer-events-auto" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => collageImageInputRef.current.click()}
              className="bg-[#F5C400] text-black font-black text-[9px] tracking-wider uppercase py-1.5 px-2.5 rounded-md hover:bg-white transition-all shadow-lg"
            >
              Cambiar Fondo
            </button>
            <button
              onClick={() => collageVideoInputRef.current.click()}
              className="bg-white/20 border border-white/30 text-white font-black text-[9px] tracking-wider uppercase py-1.5 px-2.5 rounded-md hover:bg-white hover:text-black transition-all shadow-lg backdrop-blur-md"
            >
              Subir Video
            </button>
            {collageVideo && (
              <button
                onClick={() => {
                  updatePageModule('home', 'nosotros-final', {
                    ...nosotrosFinalData,
                    collageVideo: ''
                  });
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-black text-[9px] tracking-wider uppercase py-1.5 px-2.5 rounded-md transition-all shadow-lg"
              >
                Eliminar Video
              </button>
            )}
            <input 
              type="file" 
              ref={collageImageInputRef} 
              onChange={handleCollageImageChange} 
              accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.gif,.bmp,.tiff,.heic,.heif,.jfif,.PNG,.JPG,.JPEG,.WEBP,.SVG,.GIF,.BMP,.TIFF,.HEIC,.HEIF,.JFIF" 
              className="hidden" 
            />
            <input 
              type="file" 
              ref={collageVideoInputRef} 
              onChange={handleCollageVideoChange} 
              accept="video/*,.mp4,.webm,.ogg,.mov,.avi,.MP4,.WEBM,.OGG,.MOV,.AVI" 
              className="hidden" 
            />
          </div>
        )}
      </section>

      {/* 2. BLOQUE DE ESTADÍSTICAS */}
      <section className="bg-[#030712] py-8 relative border-b border-white/5 mt-[-10px]">
        <div className="max-w-[1400px] mx-auto px-[40px] grid grid-cols-2 md:grid-cols-9 gap-4 text-center">
          
          <StatCard target="20" suffix="+" label="Años de experiencia" />
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent hidden md:block self-center justify-self-center animate-pulse" />
          
          <StatCard target="500" suffix="+" label="Equipos suministrados" />
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent hidden md:block self-center justify-self-center animate-pulse" />
          
          <StatCard target="100" suffix="+" label="Proyectos ejecutados" />
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent hidden md:block self-center justify-self-center animate-pulse" />
          
          <StatCard target="15" suffix="+" label="Industrias atendidas" />
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent hidden md:block self-center justify-self-center animate-pulse" />
          
          <StatCard target="24/7" label="Soporte técnico" colSpan="col-span-2 md:col-span-1" />

        </div>
      </section>

      {/* 3. NUESTRA HISTORIA */}
      <section id="historia-seccion" className="py-24 px-[40px] relative border-b border-white/5 bg-[#030712] scroll-mt-[100px]">
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left image */}
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
            <img 
              src={getOptimizedImageUrl("/nosotros_planta_moderna.png", 800)} 
              alt="Modern Industrial Plant Aerial View" 
              className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 z-20 bg-black/80 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-lg flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]"></span>
              <span className="text-[10px] text-white/90 font-mono tracking-wider">PLANTA DE PRODUCCIÓN SMQ</span>
            </div>
          </motion.div>

          {/* Right text content */}
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start gap-6"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">Nuestra Trayectoria</span>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[1.05]">
              <span className="text-white block">DOS DÉCADAS IMPULSANDO LA</span>
              <span className="text-[#F5C400] block">TRANSFORMACIÓN INDUSTRIAL</span>
            </h3>
            
            <div className="w-20 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400] mb-2" />

            <div className="flex flex-col gap-5 text-[#A1A8B3] text-base leading-relaxed">
              <p>
                SMQ Industrial Systems desarrolla maquinaria industrial especializada para reciclaje, procesamiento y valorización de materiales.
              </p>
              <p>
                Integramos sistemas completos para trituración, separación, lavado, peletizado, recuperación de recursos y soluciones de Valorización Energética.
              </p>
              <p>
                Nuestro enfoque combina ingeniería aplicada, automatización y plantas industriales llave en mano adaptadas a las necesidades de cada cliente.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. MISIÓN · VISIÓN · VALORES */}
      <section className="py-24 px-[40px] relative border-b border-white/5 bg-gradient-to-b from-[#030712] via-[#090e1b] to-[#030712]">
        <div className="max-w-[1400px] w-full mx-auto">
          
          <div className="flex flex-col items-center gap-4 text-center mb-16">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">Propósito Corporativo</span>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight text-center">
              <span className="text-white">NUESTRA </span>
              <span className="text-[#F5C400]">IDENTIDAD</span>
            </h3>
            <div className="w-24 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Misión */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="cursor-pointer border-t border-l border-white/20 border-b border-r border-white/5 bg-[#0e131b]/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-start min-h-[460px] transition-all duration-300 hover:-translate-y-2 hover:border-[#F5C400]/40 group active:scale-95 active:border-[#F5C400]"
            >
              <div 
                className="absolute bottom-0 left-0 right-0 h-[55%] bg-cover bg-center bg-no-repeat opacity-40 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"
                style={{ 
                  backgroundImage: "url('/nosotros_industrial_hero.png')",
                  maskImage: "linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)"
                }}
              />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C400]/30 to-transparent" />
              <div className="relative z-10 flex flex-col items-center flex-grow">
                <div className="w-12 h-12 rounded-lg bg-[#F5C400]/10 flex items-center justify-center border border-[#F5C400]/30 mb-6 group-hover:bg-[#F5C400]/20 transition-all duration-300 mx-auto">
                  <Cpu size={24} className="text-[#F5C400]" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4 text-center">MISIÓN</h4>
                <p className="text-[#A1A8B3] text-sm leading-relaxed text-center">
                  Automatizar procesos industriales mediante soluciones de ingeniería que incrementen productividad, calidad y competitividad.
                </p>
              </div>
              <div className="relative z-10 text-[9px] font-mono text-white/50 mt-auto pt-8 tracking-widest uppercase text-center flex justify-between items-center w-full">
                <span className="w-8"></span>
                <span>MISIÓN CORPORATIVA SMQ</span>
                <span className="w-4"></span>
              </div>
            </motion.div>

            {/* Visión */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="cursor-pointer border-t border-l border-white/20 border-b border-r border-white/5 bg-[#0e131b]/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-start min-h-[460px] transition-all duration-300 hover:-translate-y-2 hover:border-[#06B6D4]/40 group active:scale-95 active:border-[#06B6D4]"
            >
              <div 
                className="absolute bottom-0 left-0 right-0 h-[55%] bg-cover bg-center bg-no-repeat opacity-40 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"
                style={{ 
                  backgroundImage: "url('/nosotros_futuro_industrial.png')",
                  maskImage: "linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)"
                }}
              />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#06B6D4]/30 to-transparent" />
              <div className="relative z-10 flex flex-col items-center flex-grow">
                <div className="w-12 h-12 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center border border-[#06B6D4]/30 mb-6 group-hover:bg-[#06B6D4]/20 transition-all duration-300 mx-auto">
                  <Eye size={24} className="text-[#06B6D4]" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4 text-center">VISIÓN</h4>
                <p className="text-[#A1A8B3] text-sm leading-relaxed text-center">
                  Convertirnos en la empresa referente de automatización e integración industrial en Latinoamérica.
                </p>
              </div>
              <div className="relative z-10 text-[9px] font-mono text-white/50 mt-auto pt-8 tracking-widest uppercase text-center flex justify-between items-center w-full">
                <span className="w-8"></span>
                <span>VISIÓN DE FUTURO SMQ</span>
                <span className="w-4"></span>
              </div>
            </motion.div>

            {/* Valores */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="cursor-pointer border-t border-l border-white/20 border-b border-r border-white/5 bg-[#0e131b]/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-start min-h-[460px] transition-all duration-300 hover:-translate-y-2 hover:border-[#84CC16]/40 group active:scale-95 active:border-[#84CC16]"
            >
              <div 
                className="absolute bottom-0 left-0 right-0 h-[55%] bg-cover bg-center bg-no-repeat opacity-40 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"
                style={{ 
                  backgroundImage: "url('/ai_neural_cover.png')",
                  maskImage: "linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)"
                }}
              />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#84CC16]/30 to-transparent" />
              <div className="relative z-10 flex flex-col items-center flex-grow w-full">
                <div className="w-12 h-12 rounded-lg bg-[#84CC16]/10 flex items-center justify-center border border-[#84CC16]/30 mb-6 group-hover:bg-[#84CC16]/20 transition-all duration-300 mx-auto">
                  <Shield size={24} className="text-[#84CC16]" />
                </div>
                <h4 className="text-xl font-bold text-white mb-6 text-center">VALORES</h4>
                
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 max-w-[280px] w-full mx-auto">
                  {[
                    { name: 'Innovación', icon: Lightbulb },
                    { name: 'Excelencia', icon: Star },
                    { name: 'Integridad', icon: Handshake },
                    { name: 'Ingeniería', icon: Settings },
                    { name: 'Evolución', icon: TrendingUp },
                    { name: 'Impacto', icon: Leaf }
                  ].map((v, i) => {
                    const Icon = v.icon;
                    return (
                    <div key={i} className="flex items-center gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full border border-[#84CC16]/40 flex items-center justify-center bg-[#84CC16]/5">
                        <Icon size={14} className="text-[#84CC16]" />
                      </div>
                      <span className="text-sm text-white/90 font-medium">{v.name}</span>
                    </div>
                  )})}
                </div>
              </div>
              <div className="relative z-10 text-[9px] font-mono text-white/50 mt-auto pt-8 tracking-widest uppercase text-center flex justify-between items-center w-full">
                <span className="w-8"></span>
                <span>VALORES ÉTICOS SMQ</span>
                <ArrowUpRight size={16} className="text-white/60" />
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 5. TIMELINE CORPORATIVO */}
      <section className="py-24 px-[40px] relative border-b border-white/5 bg-[#030712] overflow-hidden">
        <div className="max-w-[1400px] w-full mx-auto">
          
          <div className="flex flex-col items-center gap-4 text-center mb-20">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">Línea de Tiempo Síncrona</span>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.05] text-center">
              <span className="text-white block">EVOLUCIÓN</span>
              <span className="text-[#F5C400] block">SMQ</span>
            </h3>
            <div className="w-24 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400]" />
          </div>

          {/* Horizontal Timeline */}
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C400]/40 to-transparent -translate-y-1/2 z-0 hidden lg:block" />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
              
              {/* 2005 */}
              <motion.div 
                whileInView={{ opacity: 1, scale: 1.05 }}
                initial={{ opacity: 0.4, scale: 0.85 }}
                viewport={{ margin: "-20% 0px -20% 0px", amount: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center font-black text-lg text-white mb-6 shadow-xl relative z-10 transition-all duration-300 group-hover:border-[#F5C400] group-hover:shadow-[0_0_15px_#F5C400] group-hover:scale-110">
                  2005
                </div>
                <div className="lg:h-4 w-[1px] bg-[#F5C400]/30 hidden lg:block" />
                <div className="bg-[#0e131b]/60 backdrop-blur-xl border border-white/5 rounded-xl p-5 shadow-lg max-w-[240px] mt-2 group-hover:border-white/20 transition-all">
                  <h4 className="font-bold text-sm text-[#F5C400] uppercase mb-1">Fundación</h4>
                  <p className="text-xs text-[#A1A8B3] leading-relaxed">SMQ inicia operaciones integrando sus primeros chasis mecánicos.</p>
                </div>
              </motion.div>

              {/* 2010 */}
              <motion.div 
                whileInView={{ opacity: 1, scale: 1.05 }}
                initial={{ opacity: 0.4, scale: 0.85 }}
                viewport={{ margin: "-20% 0px -20% 0px", amount: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center font-black text-lg text-white mb-6 shadow-xl relative z-10 transition-all duration-300 group-hover:border-[#F5C400] group-hover:shadow-[0_0_15px_#F5C400] group-hover:scale-110">
                  2010
                </div>
                <div className="lg:h-4 w-[1px] bg-[#F5C400]/30 hidden lg:block" />
                <div className="bg-[#0e131b]/60 backdrop-blur-xl border border-white/5 rounded-xl p-5 shadow-lg max-w-[240px] mt-2 group-hover:border-white/20 transition-all">
                  <h4 className="font-bold text-sm text-[#F5C400] uppercase mb-1">Primeros Proyectos</h4>
                  <p className="text-xs text-[#A1A8B3] leading-relaxed">Consolidación de las primeras líneas industriales integrales de ensamble.</p>
                </div>
              </motion.div>

              {/* 2015 */}
              <motion.div 
                whileInView={{ opacity: 1, scale: 1.05 }}
                initial={{ opacity: 0.4, scale: 0.85 }}
                viewport={{ margin: "-20% 0px -20% 0px", amount: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center font-black text-lg text-white mb-6 shadow-xl relative z-10 transition-all duration-300 group-hover:border-[#F5C400] group-hover:shadow-[0_0_15px_#F5C400] group-hover:scale-110">
                  2015
                </div>
                <div className="lg:h-4 w-[1px] bg-[#F5C400]/30 hidden lg:block" />
                <div className="bg-[#0e131b]/60 backdrop-blur-xl border border-white/5 rounded-xl p-5 shadow-lg max-w-[240px] mt-2 group-hover:border-white/20 transition-all">
                  <h4 className="font-bold text-sm text-[#F5C400] uppercase mb-1">Expansión</h4>
                  <p className="text-xs text-[#A1A8B3] leading-relaxed">Incorporación de servo-indexadores y celdas robotizadas complejas.</p>
                </div>
              </motion.div>

              {/* 2020 */}
              <motion.div 
                whileInView={{ opacity: 1, scale: 1.05 }}
                initial={{ opacity: 0.4, scale: 0.85 }}
                viewport={{ margin: "-20% 0px -20% 0px", amount: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center font-black text-lg text-white mb-6 shadow-xl relative z-10 transition-all duration-300 group-hover:border-[#F5C400] group-hover:shadow-[0_0_15px_#F5C400] group-hover:scale-110">
                  2020
                </div>
                <div className="lg:h-4 w-[1px] bg-[#F5C400]/30 hidden lg:block" />
                <div className="bg-[#0e131b]/60 backdrop-blur-xl border border-white/5 rounded-xl p-5 shadow-lg max-w-[240px] mt-2 group-hover:border-white/20 transition-all">
                  <h4 className="font-bold text-sm text-[#F5C400] uppercase mb-1">Integración Avanzada</h4>
                  <p className="text-xs text-[#A1A8B3] leading-relaxed">Migración a sistemas síncronos inteligentes con arquitectura PLC en red.</p>
                </div>
              </motion.div>

              {/* 2025+ */}
              <motion.div 
                whileInView={{ opacity: 1, scale: 1.05 }}
                initial={{ opacity: 0.4, scale: 0.85 }}
                viewport={{ margin: "-20% 0px -20% 0px", amount: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-black border border-[#F5C400] flex items-center justify-center font-black text-lg text-[#F5C400] mb-6 shadow-[0_0_15px_rgba(245,196,0,0.3)] relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_#F5C400]">
                  2025+
                </div>
                <div className="lg:h-4 w-[1px] bg-[#F5C400]/50 hidden lg:block" />
                <div className="bg-[#0e131b]/90 border border-[#F5C400]/30 rounded-xl p-5 shadow-2xl max-w-[240px] mt-2 transition-all">
                  <h4 className="font-bold text-sm text-[#F5C400] uppercase mb-1">Industria 4.0 & IA</h4>
                  <p className="text-xs text-white/95 leading-relaxed font-semibold">Integración de algoritmos predictivos e Inteligencia Artificial en tiempo real.</p>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. FILOSOFÍA */}
      <section className="py-24 px-[40px] relative border-b border-white/5 bg-[#070b13] overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,196,0,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1000px] mx-auto relative z-10 flex flex-col items-center gap-8">
          
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">Filosofía SMQ</span>
          
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-[#8d94a0] to-[#202530] leading-none uppercase select-none">
            PIENSA.<br />
            DISEÑA.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C400] via-yellow-400 to-[#F5C400] drop-shadow-[0_0_30px_rgba(245,196,0,0.15)] font-black">
              AUTOMATIZA.
            </span>
          </h3>

          <div className="w-24 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400] my-2" />

          <div className="flex flex-col gap-4 text-base md:text-lg text-[#A1A8B3] leading-relaxed max-w-[700px]">
            <p className="font-medium text-white">
              Creemos que la industria del futuro se construye combinando ingeniería de precisión, automatización, software robusto e inteligencia artificial aplicada.
            </p>
            <p>
              Cada proyecto desarrollado por SMQ tiene un objetivo simple: hacer que nuestros clientes produzcan más, desperdicien menos y crezcan más rápido.
            </p>
          </div>

        </div>
      </section>

      {/* 7. TECNOLOGÍAS */}
      <section className="py-24 px-[40px] relative border-b border-white/5 bg-[#030712]">
        <div className="max-w-[1400px] w-full mx-auto">
          
          <div className="flex flex-col items-center gap-4 text-center mb-16">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">Capacidades Tecnológicas</span>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.05] text-center">
              <span className="text-white block">CORE</span>
              <span className="text-[#F5C400] block">TECNOLÓGICO</span>
            </h3>
            <div className="w-24 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {defaultCards.map((card, index) => {
              const IconComponent = card.icon;
              const cardImage = nosotrosCardsData[`card-image-${index}`] || card.defaultImage;
              const localOpacity = nosotrosCardsData[`card-image-opacity-${index}`] ?? 80;
              const localFilterColor = nosotrosCardsData[`card-filter-color-${index}`] || '#000000';
              const localFilterOpacity = nosotrosCardsData[`card-filter-opacity-${index}`] ?? 80;
              const isFlipped = !!flippedCards[index];

              return (
                <div 
                  key={index}
                  onClick={() => { navigate(card.path || '#soluciones'); }}
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0A0D14] border border-white/5 hover:border-[var(--card-color-40)] transition-all duration-300 group cursor-pointer flex flex-col p-8 shadow-2xl"
                  style={{ 
                    '--card-color': card.color,
                    '--card-color-10': `${card.color}1A`,
                    '--card-color-20': `${card.color}33`,
                    '--card-color-40': `${card.color}66`,
                    '--card-color-50': `${card.color}80`
                  }}
                >
                  {/* Background image full width with heavy gradient masking on the left */}
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D14] via-[#0A0D14]/90 to-transparent w-[85%] z-10" />
                    <div className="absolute inset-0 bg-[#0A0D14] w-[45%] z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/20 to-transparent z-10" />
                    <div 
                      className="absolute inset-0 z-10 mix-blend-color pointer-events-none" 
                      style={{ 
                        backgroundColor: localFilterColor,
                        opacity: localFilterOpacity / 100 
                      }}
                    />
                    <img 
                      src={getOptimizedImageUrl(cardImage, 600)} 
                      alt={card.title}
                      className="w-full h-full object-cover object-right opacity-50 group-hover:opacity-80 transition-transform duration-700 mix-blend-screen group-hover:scale-105 origin-right"
                      style={{ opacity: localOpacity / 100 }}
                      loading="lazy"
                    />
                  </div>

                  {/* Top Left Icon */}
                  <div className="relative z-20 w-12 h-12 rounded-xl border border-[var(--card-color-40)] flex items-center justify-center bg-transparent mb-6 group-hover:bg-[var(--card-color-10)] transition-colors duration-300">
                    <IconComponent size={24} className="text-[var(--card-color)]" />
                  </div>

                  {/* Title */}
                  <h4 className="relative z-20 font-bold text-xl md:text-2xl text-white mb-4 leading-tight max-w-[80%] pr-4">
                    {card.title.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}
                  </h4>
                  
                  {/* Colored line */}
                  <div className="relative z-20 w-8 h-[2px] bg-[var(--card-color)] mb-4" />

                  {/* Description */}
                  <p className="relative z-20 text-xs md:text-sm text-[#A1A8B3] leading-relaxed max-w-[80%] mb-auto">
                    {card.desc}
                  </p>

                  {/* Footer: Tags and Arrow */}
                  <div className="relative z-20 flex items-end justify-between w-full mt-6">
                    <span className="text-[10px] md:text-xs font-mono font-bold text-[var(--card-color)] tracking-wider">
                      {card.tags}
                    </span>
                    <ArrowUpRight size={24} className="text-[var(--card-color)] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>

                  {/* Local Card controls in Editor Mode */}
                  {isEditorMode && (
                    <div 
                      className="absolute top-2 right-2 flex flex-col gap-1.5 min-w-[190px] bg-black/90 backdrop-blur border border-white/10 rounded-lg p-2 text-left text-[9px] z-50 shadow-2xl" 
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            cardFileInputRef.current.dataset.index = index;
                            cardFileInputRef.current.click();
                          }}
                          className="w-full text-black font-black text-[9px] tracking-wider uppercase py-1 px-2 rounded hover:brightness-110 transition-all text-center"
                          style={{ backgroundColor: card.color }}
                        >
                          {uploadingCardIdx === index ? 'Subiendo...' : 'Subir Imagen'}
                        </button>
                      </div>
                      
                      {/* Opacidad Imagen */}
                      <div className="flex flex-col gap-0.5">
                        <div className="flex justify-between text-white/70">
                          <span>Opacidad Img</span>
                          <span className="font-bold text-[var(--card-color)]">{localOpacity}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="10" 
                          max="100" 
                          value={localOpacity} 
                          onChange={(e) => {
                            updatePageModule('home', 'nosotros-cards', {
                              [`card-image-opacity-${index}`]: Number(e.target.value)
                            });
                          }}
                          className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer"
                          style={{ accentColor: card.color }}
                        />
                      </div>

                      {/* Opacidad Filtro */}
                      <div className="flex flex-col gap-0.5">
                        <div className="flex justify-between text-white/70">
                          <span>Opacidad Filtro</span>
                          <span className="font-bold text-[var(--card-color)]">{localFilterOpacity}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={localFilterOpacity} 
                          onChange={(e) => {
                            updatePageModule('home', 'nosotros-cards', {
                              [`card-filter-opacity-${index}`]: Number(e.target.value)
                            });
                          }}
                          className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer"
                          style={{ accentColor: card.color }}
                        />
                      </div>

                      {/* Color Filtro */}
                      <div className="flex items-center justify-between text-white/70">
                        <span>Color Filtro</span>
                        <input 
                          type="color" 
                          value={localFilterColor} 
                          onChange={(e) => {
                            updatePageModule('home', 'nosotros-cards', {
                              [`card-filter-color-${index}`]: e.target.value
                            });
                          }}
                          className="w-4 h-4 rounded border border-white/20 bg-transparent cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Hidden file input for card image upload */}
          <input 
            type="file" 
            ref={cardFileInputRef}
            accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.gif,.bmp,.tiff,.heic,.heif,.jfif,.PNG,.JPG,.JPEG,.WEBP,.SVG,.GIF,.BMP,.TIFF,.HEIC,.HEIF,.JFIF"
            className="hidden"
            onChange={(e) => {
              const index = parseInt(cardFileInputRef.current.dataset.index);
              handleCardImageUpload(e, index);
            }}
          />

        </div>
      </section>

      {/* 8. BLOQUE FINAL */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 z-10 pointer-events-none transition-all duration-300" 
            style={{ 
              backgroundColor: filterColor,
              opacity: filterOpacity / 100 
            }}
          />
          <img 
            src={backgroundImageUrl} 
            alt="Futuristic Industrial Plant Background" 
            className="w-full h-full object-cover transition-all duration-300"
            style={{ opacity: imageOpacity / 100 }}
          />
        </div>

        {/* Editor Panel inside Bloque Final */}
        {isEditorMode && (
          <div className="absolute top-6 right-6 z-40 bg-black/85 backdrop-blur-md border border-[#F5C400]/40 rounded-xl p-5 shadow-2xl flex flex-col gap-4 text-xs w-[260px] text-left select-none">
            <h4 className="font-black text-[#F5C400] uppercase tracking-wider mb-1 flex items-center gap-2 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400] animate-ping" />
              Fondo Bloque Final
            </h4>
            
            {/* Image upload */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[#A1A8B3] font-bold">Imagen de Fondo</span>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full bg-[#2A2F3A] hover:bg-[#3b4150] text-white font-bold py-2 px-3 rounded border border-white/10 transition-all flex items-center justify-center gap-2"
              >
                {isUploading ? 'Subiendo...' : 'Subir Imagen'}
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.gif,.bmp,.tiff,.heic,.heif,.jfif,.PNG,.JPG,.JPEG,.WEBP,.SVG,.GIF,.BMP,.TIFF,.HEIC,.HEIF,.JFIF" 
                className="hidden" 
                onChange={handleImageChange} 
              />
            </div>

            {/* Image Opacity */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between font-bold">
                <span className="text-[#A1A8B3]">Opacidad Imagen</span>
                <span className="text-[#F5C400]">{imageOpacity}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                value={imageOpacity}
                onChange={(e) => updatePageModule('home', 'nosotros-final', { imageOpacity: parseInt(e.target.value) })}
                className="w-full accent-[#F5C400] bg-white/10 rounded-lg appearance-none h-1.5 cursor-pointer"
              />
            </div>

            {/* Filter Color Picker */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between font-bold">
                <span className="text-[#A1A8B3]">Color del Filtro</span>
                <span className="text-white font-mono">{filterColor.toUpperCase()}</span>
              </div>
              <div className="flex gap-3 items-center">
                <input 
                  type="color"
                  value={filterColor}
                  onChange={(e) => updatePageModule('home', 'nosotros-final', { filterColor: e.target.value })}
                  className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer p-0 overflow-hidden"
                />
                <span className="text-[10px] text-white/50 leading-tight">Elige un color para teñir el fondo</span>
              </div>
            </div>

            {/* Filter Opacity */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between font-bold">
                <span className="text-[#A1A8B3]">Opacidad Filtro</span>
                <span className="text-[#F5C400]">{filterOpacity}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                value={filterOpacity}
                onChange={(e) => updatePageModule('home', 'nosotros-final', { filterOpacity: parseInt(e.target.value) })}
                className="w-full accent-[#F5C400] bg-white/10 rounded-lg appearance-none h-1.5 cursor-pointer"
              />
            </div>
          </div>
        )}

        <div className="relative z-20 max-w-[900px] mx-auto px-5 text-center flex flex-col items-center gap-6">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">El Compromiso SMQ</span>
          <h3 className="text-3xl md:text-6xl font-black tracking-tighter uppercase leading-[1.05] text-center">
            <span className="text-white block">LO QUE CONSTRUIMOS HOY DEFINE</span>
            <span className="text-[#F5C400] block">LA INDUSTRIA DEL MAÑANA</span>
          </h3>
          <div className="w-20 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400] my-2" />
          
          <div className="flex flex-col gap-3 text-base md:text-lg text-white/90 font-medium leading-relaxed">
            <p>No suministramos únicamente maquinaria.</p>
            <p className="text-[#A1A8B3] text-sm md:text-base font-normal">
              Diseñamos ecosistemas tecnológicos robustos y adaptables capaces de transformar procesos completos de producción.
            </p>
          </div>

          <a 
            href="#contacto"
            className="bg-[#F5C400] text-black font-black text-xs tracking-[0.2em] uppercase py-4 px-10 rounded-lg shadow-[0_0_20px_rgba(245,196,0,0.3)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_25px_#F5C400] mt-6"
          >
            HABLAR CON UN INGENIERO
          </a>
        </div>
      </section>

      {/* Dialog Modal for Misión, Visión, Valores */}
      <AnimatePresence>
        {activeDialogCard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveDialogCard(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative flex justify-center items-center max-w-[90vw] max-h-[85vh] mt-20"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative inline-block max-w-full max-h-full">
                <button 
                  onClick={() => setActiveDialogCard(null)}
                  className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/10 rounded-full border border-white/20 text-white transition-colors backdrop-blur-md shadow-xl"
                >
                  <X size={20} />
                </button>

                <img 
                  src={getOptimizedImageUrl(dialogImages[activeDialogCard], 1600)}
                  alt={`Imagen de ${activeDialogCard}`}
                  className="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/20 bg-black/80 backdrop-blur-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_20px_50px_rgba(0,0,0,0.8)]"
                />

                {isEditorMode && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
                    <button 
                      onClick={() => dialogFileInputRef.current?.click()}
                      disabled={isUploading}
                      className="flex items-center gap-2 bg-[#F5C400] text-black font-black uppercase tracking-wider px-6 py-3 rounded-lg shadow-xl hover:bg-white transition-colors"
                    >
                      <Upload size={18} />
                      {isUploading ? 'Subiendo...' : 'Cambiar Imagen'}
                    </button>
                    <input 
                      type="file" 
                      ref={dialogFileInputRef}
                      accept="image/*,.png,.jpg,.jpeg,.webp"
                      className="hidden"
                      onChange={handleDialogImageUpload}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default NosotrosSection;
