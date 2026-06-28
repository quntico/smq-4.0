import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Cpu, 
  Eye, 
  Settings, 
  Activity, 
  Zap, 
  Calendar,
  ChevronRight,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';
import Footer from '@/components/Footer.jsx';
import ContactSection from '@/components/ContactSection.jsx';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';

// Reusable Stat Counter with Ease-Out Deceleration
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

// Reusable Stat Card
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

const Nosotros = () => {
  const { cmsState, isEditorMode, updatePageModule } = useCMS();
  const collageImageInputRef = useRef(null);
  const collageVideoInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  // Extract page module data
  const homePage = cmsState.pages?.find(p => p.id === 'home');
  const nosotrosFinalData = homePage?.modules?.find(m => m.id === 'nosotros-final')?.data || {};

  const collageImage = nosotrosFinalData.collageImage || '/smq_nosotros.jpg';
  const collageVideo = nosotrosFinalData.collageVideo || '';

  const handleCollageImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadFile(file);
      updatePageModule('home', 'nosotros-final', { 
        ...nosotrosFinalData,
        collageImage: url 
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Nosotros | SMQ - Ingeniería para el Futuro Industrial</title>
        <meta
          name="description"
          content="Conoce a SMQ. Diseñamos, automatizamos e integramos soluciones industriales de alta tecnología inspiradas en estándares de clase mundial."
        />
      </Helmet>

      <div className="min-h-screen bg-[#030712] text-white pt-[100px] overflow-x-hidden font-['Poppins']">
        <div className="md:pl-[76px] transition-all duration-300">
        {/* HERO SECTION */}
        <section 
          className="relative min-h-[60vh] md:min-h-[75vh] flex items-center justify-start py-20 px-8 md:px-16 lg:px-[80px] border-b border-white/5 bg-cover bg-center bg-no-repeat overflow-hidden group"
          style={{ backgroundImage: `url('${collageImage}')` }}
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
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, #030712 0%, #030712 25%, rgba(3, 7, 18, 0.95) 45%, rgba(3, 7, 18, 0.6) 70%, rgba(3, 7, 18, 0) 100%)"
            }}
          />
          
          {/* Tech Grid overlay for micro-telemetry feel */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-[1]" />
          <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#3B82F6]/5 rounded-full filter blur-[100px] pointer-events-none z-[1]" />

          <div className="max-w-[1400px] w-full mx-auto relative z-10 flex items-center justify-start">
            {/* Border-l accent line like Image 2 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="pl-6 md:pl-10 border-l-[4px] border-[#3B82F6] flex flex-col items-start gap-4 md:gap-6 py-2"
            >
              
              {/* Main Title - NOSOTROS */}
              <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tight text-white leading-none uppercase select-none font-sans drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                NOSOTROS
              </h1>

              {/* Subtitle - Empresa integradora y desarrolladora... */}
              <p className="text-white/95 text-base md:text-xl lg:text-2xl font-bold tracking-wide leading-relaxed max-w-[650px] font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                Empresa integradora y desarrolladora de proyectos para la industria
              </p>

              {/* Navigation links - Historia • Visión • Valores */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm font-bold uppercase tracking-wider text-white/50 mt-2 font-mono">
                <a href="#historia" className="hover:text-[#3B82F6] hover:text-white transition-colors duration-300">Historia</a>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"></span>
                <a href="#mision" className="hover:text-[#3B82F6] hover:text-white transition-colors duration-300">Misión</a>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"></span>
                <a href="#vision" className="hover:text-[#3B82F6] hover:text-white transition-colors duration-300">Visión</a>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"></span>
                <a href="#valores" className="hover:text-[#3B82F6] hover:text-white transition-colors duration-300">Valores</a>
              </div>

            </motion.div>
          </div>

          {/* Technical HUD details in corners to align with SMQ 4.0 style */}
          <div className="absolute bottom-6 right-8 z-10 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded font-mono text-[9px] text-white/50 select-none hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
            <span>SYSTEM: ONLINE // ADVISORY ACTIVE</span>
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

        {/* STATS STRIP */}
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

        {/* NUESTRA HISTORIA SECTION */}
        <section id="historia" className="py-24 px-[40px] relative border-b border-white/5 bg-[#030712]">
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
                src="/nosotros_planta_moderna.png" 
                alt="Modern Industrial Plant Aerial View" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 z-20 bg-black/80 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-lg flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]"></span>
                <span className="text-[10px] text-white/90 font-mono tracking-wider">SMQ_PRODUCTION_PLANT</span>
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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                DOS DÉCADAS IMPULSANDO LA TRANSFORMACIÓN INDUSTRIAL
              </h2>
              
              <div className="w-20 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400] mb-2" />

              <div className="flex flex-col gap-5 text-[#A1A8B3] text-base leading-relaxed">
                <p>
                  SMQ nació con una visión clara: acercar tecnologías industriales avanzadas a empresas que buscan crecer mediante automatización, eficiencia e innovación.
                </p>
                <p>
                  Desde nuestros inicios hemos participado en proyectos de reciclaje, alimentos, empaque, manufactura y automatización industrial, integrando ingeniería, software y maquinaria en una sola solución integral de vanguardia.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* MISIÓN · VISIÓN · VALORES */}
        <section className="py-24 px-[40px] relative border-b border-white/5 bg-gradient-to-b from-[#030712] via-[#090e1b] to-[#030712]">
          <div className="max-w-[1400px] w-full mx-auto">
            
            {/* Header */}
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">Propósito Corporativo</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">NUESTRA IDENTIDAD</h2>
              <div className="w-24 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Misión */}
              <motion.div 
                id="mision"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border-t border-l border-white/20 border-b border-r border-white/5 bg-[#0e131b]/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[300px] transition-all duration-300 hover:-translate-y-2 hover:border-[#F5C400]/40 group scroll-mt-24"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C400]/30 to-transparent" />
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#F5C400]/10 flex items-center justify-center border border-[#F5C400]/30 mb-6 group-hover:bg-[#F5C400]/20 transition-all duration-300 mx-auto">
                    <Cpu size={24} className="text-[#F5C400]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">MISIÓN</h3>
                  <p className="text-[#A1A8B3] text-sm leading-relaxed text-justify">
                    Automatizar procesos industriales mediante soluciones de ingeniería que incrementen productividad, calidad y competitividad.
                  </p>
                </div>
                <div className="text-[9px] font-mono text-white/30 mt-6 tracking-widest uppercase text-center">SMQ_CORE_MISSION</div>
              </motion.div>

              {/* Visión */}
              <motion.div 
                id="vision"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="border-t border-l border-white/20 border-b border-r border-white/5 bg-[#0e131b]/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[300px] transition-all duration-300 hover:-translate-y-2 hover:border-[#06B6D4]/40 group scroll-mt-24"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#06B6D4]/30 to-transparent" />
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center border border-[#06B6D4]/30 mb-6 group-hover:bg-[#06B6D4]/20 transition-all duration-300 mx-auto">
                    <Eye size={24} className="text-[#06B6D4]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">VISIÓN</h3>
                  <p className="text-[#A1A8B3] text-sm leading-relaxed text-justify">
                    Convertirnos en la empresa referente de automatización e integración industrial en Latinoamérica.
                  </p>
                </div>
                <div className="text-[9px] font-mono text-white/30 mt-6 tracking-widest uppercase text-center">SMQ_FUTURE_VISION</div>
              </motion.div>

              {/* Valores */}
              <motion.div 
                id="valores"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="border-t border-l border-white/20 border-b border-r border-white/5 bg-[#0e131b]/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[300px] transition-all duration-300 hover:-translate-y-2 hover:border-[#10B981]/40 group scroll-mt-24"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#10B981]/30 to-transparent" />
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#10B981]/10 flex items-center justify-center border border-[#10B981]/30 mb-6 group-hover:bg-[#10B981]/20 transition-all duration-300 mx-auto">
                    <Shield size={24} className="text-[#10B981]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">VALORES</h3>
                  
                  {/* Values grid */}
                  <div className="grid grid-cols-2 gap-3 max-w-[240px] mx-auto">
                    {['Innovación', 'Excelencia', 'Integridad', 'Ingeniería', 'Evolución', 'Impacto'].map((v, i) => (
                      <div key={i} className="flex items-center gap-2 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        <span className="text-xs text-[#A1A8B3] font-bold group-hover:text-white transition-colors">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[9px] font-mono text-white/30 mt-6 tracking-widest uppercase text-center">SMQ_ETHICAL_VALUES</div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* TIMELINE CORPORATIVO */}
        <section className="py-24 px-[40px] relative border-b border-white/5 bg-[#030712] overflow-hidden">
          <div className="max-w-[1400px] w-full mx-auto">
            
            {/* Header */}
            <div className="flex flex-col items-center gap-4 text-center mb-20">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">Línea de Tiempo Síncrona</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">EVOLUCIÓN SMQ</h2>
              <div className="w-24 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400]" />
            </div>

            {/* Horizontal Timeline Container */}
            <div className="relative">
              
              {/* Continuous Glowing Beam */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C400]/40 to-transparent -translate-y-1/2 z-0 hidden lg:block" />
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
                
                {/* 2005 */}
                <motion.div 
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
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
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
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
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
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
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
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
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
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

        {/* FILOSOFÍA SECTION */}
        <section className="py-24 px-[40px] relative border-b border-white/5 bg-[#070b13] overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,196,0,0.03)_0%,transparent_70%)] pointer-events-none" />
          <div className="max-w-[1000px] mx-auto relative z-10 flex flex-col items-center gap-8">
            
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">Filosofía SMQ</span>
            
            {/* Huge typographic visual */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-[#8d94a0] to-[#202530] leading-none uppercase select-none">
              THINK.<br />
              DESIGN.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C400] via-yellow-400 to-[#F5C400] drop-shadow-[0_0_30px_rgba(245,196,0,0.15)] font-black">
                AUTOMATE.
              </span>
            </h2>

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

        {/* TECNOLOGÍAS GRID */}
        <section id="capacidades" className="py-24 px-[40px] relative border-b border-white/5 bg-[#030712] scroll-mt-24">
          <div className="max-w-[1400px] w-full mx-auto">
            
            {/* Header */}
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">Capacidades Tecnológicas</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">CORE TECNOLÓGICO</h2>
              <div className="w-24 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Tech 1 */}
              <div className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] rounded-xl p-8 transition-all duration-300 hover:border-[#F5C400]/40 group flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#F5C400]/10 group-hover:border-[#F5C400]/30 transition-all duration-300">
                  <Cpu size={20} className="text-[#A1A8B3] group-hover:text-[#F5C400] transition-colors" />
                </div>
                <h4 className="font-bold text-lg text-white">Automatización Industrial</h4>
                <p className="text-xs text-[#A1A8B3] leading-relaxed">Lógica de control avanzada y sistemas de supervisión estables.</p>
                <div className="text-[10px] font-mono text-[#F5C400] mt-2">PLC · HMI · SCADA</div>
              </div>

              {/* Tech 2 */}
              <div className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] rounded-xl p-8 transition-all duration-300 hover:border-[#F5C400]/40 group flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#F5C400]/10 group-hover:border-[#F5C400]/30 transition-all duration-300">
                  <Activity size={20} className="text-[#A1A8B3] group-hover:text-[#F5C400] transition-colors" />
                </div>
                <h4 className="font-bold text-lg text-white">Robótica</h4>
                <p className="text-xs text-[#A1A8B3] leading-relaxed">Celdas dinámicas de manipulación y paletizado de alta velocidad.</p>
                <div className="text-[10px] font-mono text-[#F5C400] mt-2">Sistemas de manipulación</div>
              </div>

              {/* Tech 3 */}
              <div className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] rounded-xl p-8 transition-all duration-300 hover:border-[#F5C400]/40 group flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#F5C400]/10 group-hover:border-[#F5C400]/30 transition-all duration-300">
                  <Eye size={20} className="text-[#A1A8B3] group-hover:text-[#F5C400] transition-colors" />
                </div>
                <h4 className="font-bold text-lg text-white">Visión Artificial</h4>
                <p className="text-xs text-[#A1A8B3] leading-relaxed">Sistemas de inspección óptica con clasificación y detección micrométrica.</p>
                <div className="text-[10px] font-mono text-[#F5C400] mt-2">Control de calidad inteligente</div>
              </div>

              {/* Tech 4 */}
              <div className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] rounded-xl p-8 transition-all duration-300 hover:border-[#F5C400]/40 group flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#F5C400]/10 group-hover:border-[#F5C400]/30 transition-all duration-300">
                  <Settings size={20} className="text-[#A1A8B3] group-hover:text-[#F5C400] transition-colors" />
                </div>
                <h4 className="font-bold text-lg text-white">Integración Mecánica</h4>
                <p className="text-xs text-[#A1A8B3] leading-relaxed">Ingeniería CAD robusta de precisión y ensamble higiénico estructural.</p>
                <div className="text-[10px] font-mono text-[#F5C400] mt-2">Diseño y fabricación</div>
              </div>

              {/* Tech 5 */}
              <div className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] rounded-xl p-8 transition-all duration-300 hover:border-[#F5C400]/40 group flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#F5C400]/10 group-hover:border-[#F5C400]/30 transition-all duration-300">
                  <TrendingUp size={20} className="text-[#A1A8B3] group-hover:text-[#F5C400] transition-colors" />
                </div>
                <h4 className="font-bold text-lg text-white">Industria 4.0</h4>
                <p className="text-xs text-[#A1A8B3] leading-relaxed">Conectividad IIoT con análisis telemétrico de variables críticas de planta.</p>
                <div className="text-[10px] font-mono text-[#F5C400] mt-2">Monitoreo y analítica</div>
              </div>

              {/* Tech 6 */}
              <div className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] rounded-xl p-8 transition-all duration-300 hover:border-[#F5C400]/40 group flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#F5C400]/10 group-hover:border-[#F5C400]/30 transition-all duration-300">
                  <Zap size={20} className="text-[#A1A8B3] group-hover:text-[#F5C400] transition-colors" />
                </div>
                <h4 className="font-bold text-lg text-white">Inteligencia Artificial</h4>
                <p className="text-xs text-[#A1A8B3] leading-relaxed">Modelos de IA locales para balanceo dinámico y mantenimiento predictivo.</p>
                <div className="text-[10px] font-mono text-[#F5C400] mt-2">Optimización de procesos</div>
              </div>

            </div>

          </div>
        </section>

        {/* CERTIFICACIONES SECTION */}
        <section id="certificaciones" className="py-24 px-[40px] relative border-b border-white/5 bg-gradient-to-b from-[#030712] via-[#090e1b] to-[#030712] scroll-mt-24">
          <div className="max-w-[1400px] w-full mx-auto">
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#10B981]">Calidad Garantizada</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">CERTIFICACIONES</h2>
              <div className="w-24 h-[2px] bg-[#10B981] shadow-[0_0_8px_#10B981]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'ISO 9001:2015',
                  desc: 'Certificación internacional de sistemas de gestión de la calidad para el diseño e integración de maquinaria.',
                  badge: 'QMS_CERT'
                },
                {
                  title: 'CE Compliance',
                  desc: 'Cumplimiento con las directivas de seguridad, salud y protección ambiental de la Unión Europea.',
                  badge: 'EU_STANDARD'
                },
                {
                  title: 'UL / CSA Panels',
                  desc: 'Ensambles de tableros de control certificados bajo normativas de seguridad eléctrica de Norteamérica.',
                  badge: 'US_CERT'
                },
                {
                  title: 'Normatividad NOM',
                  desc: 'Cumplimiento estricto con las Normas Oficiales Mexicanas de seguridad industrial e instalaciones eléctricas.',
                  badge: 'MX_STANDARD'
                }
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border border-white/5 bg-[#0e131b]/40 backdrop-blur-xl rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#10B981]/40 group"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#10B981]/25 to-transparent" />
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center border border-[#10B981]/20 mb-4 group-hover:bg-[#10B981]/25 transition-all">
                      <Award size={20} className="text-[#10B981]" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>
                    <p className="text-xs text-[#A1A8B3] leading-relaxed">{cert.desc}</p>
                  </div>
                  <div className="text-[8px] font-mono text-white/30 mt-4 tracking-wider">{cert.badge}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ALIANZAS SECTION */}
        <section id="alianzas" className="py-24 px-[40px] relative border-b border-white/5 bg-[#030712] scroll-mt-24">
          <div className="max-w-[1400px] w-full mx-auto">
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#8B5CF6]">Red Global</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">ALIANZAS E INTEGRADORES</h2>
              <div className="w-24 h-[2px] bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: 'Siemens Partner', type: 'PLC & Automation' },
                { name: 'Rockwell Integration', type: 'Allen-Bradley Systems' },
                { name: 'Festo Partner', type: 'Pneumatics & Motion' },
                { name: 'ABB Systems', type: 'Drives & Robotics' },
                { name: 'Schneider Certified', type: 'Power & Controls' },
                { name: 'Fanuc Integrator', type: 'Robotic Arms' }
              ].map((partner, index) => (
                <motion.div
                  key={index}
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-[#0e131b]/30 border border-white/5 rounded-xl p-5 flex flex-col justify-center items-center text-center transition-all duration-300 hover:border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/5 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center mb-3 group-hover:bg-[#8B5CF6]/20 transition-all">
                    <Users size={16} className="text-white/60 group-hover:text-[#8B5CF6]" />
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-[#8B5CF6] transition-colors">{partner.name}</span>
                  <span className="text-[9px] font-mono text-white/40 mt-1 uppercase tracking-wider">{partner.type}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* INNOVACIÓN SECTION */}
        <section id="innovacion" className="py-24 px-[40px] relative border-b border-white/5 bg-gradient-to-b from-[#030712] via-[#080d1a] to-[#030712] scroll-mt-24">
          <div className="max-w-[1400px] w-full mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -50 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-start gap-6"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#06B6D4]">Próxima Generación</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight uppercase">
                  CENTROS DE INNOVACIÓN Y DESARROLLO (I+D)
                </h2>
                <div className="w-20 h-[2px] bg-[#06B6D4] shadow-[0_0_8px_#06B6D4] mb-2" />
                <div className="flex flex-col gap-4 text-[#A1A8B3] text-sm md:text-base leading-relaxed">
                  <p>
                    En SMQ no solo integramos tecnología existente; diseñamos las patentes e innovaciones que definirán la manufactura del mañana. Contamos con un laboratorio propio de simulación avanzada y pruebas de estrés mecánico.
                  </p>
                  <p className="border-l-2 border-[#06B6D4]/40 pl-4 italic">
                    Nuestra infraestructura de I+D permite simular el comportamiento de plantas completas mediante gemelos digitales y modelos en tiempo real antes de fabricar una sola pieza física.
                  </p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Gemelos Digitales',
                    desc: 'Simulaciones virtuales interactivas 3D que replican fielmente la física de las líneas de producción.'
                  },
                  {
                    title: 'Hardware-in-the-Loop',
                    desc: 'Pruebas de software de control conectando PLCs físicos a entornos simulados avanzados.'
                  },
                  {
                    title: 'IA y Visión Local',
                    desc: 'Desarrollo de algoritmos de deep learning que corren en edge devices dentro de la planta.'
                  },
                  {
                    title: 'Materiales Avanzados',
                    desc: 'Investigación en aleaciones de alta resistencia y tratamientos térmicos contra desgaste abrasivo.'
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="border border-white/5 bg-[#0e131b]/30 rounded-xl p-5 hover:border-[#06B6D4]/30 hover:bg-[#06B6D4]/5 transition-all group"
                  >
                    <h4 className="font-bold text-sm text-white mb-2 group-hover:text-[#06B6D4] transition-colors">{item.title}</h4>
                    <p className="text-xs text-[#A1A8B3] leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CARRERA SECTION */}
        <section id="carrera" className="py-24 px-[40px] relative border-b border-white/5 bg-[#030712] scroll-mt-24">
          <div className="max-w-[1000px] w-full mx-auto text-center flex flex-col items-center gap-6">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#EC4899]">Únete al Equipo</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight uppercase">
              DESARROLLA EL FUTURO DE LA INGENIERÍA
            </h2>
            <div className="w-20 h-[2px] bg-[#EC4899] shadow-[0_0_8px_#EC4899] my-2" />
            
            <p className="text-[#A1A8B3] text-sm md:text-base leading-relaxed max-w-[700px]">
              Buscamos ingenieros en mecatrónica, programadores de PLC, diseñadores mecánicos CAD y líderes de proyectos apasionados por la precisión, la robótica y la industria 4.0.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <a 
                href="#contacto"
                className="bg-[#EC4899] text-white font-bold text-xs tracking-[0.15em] uppercase py-4 px-8 rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_#EC4899]"
              >
                Ver Vacantes Activas
              </a>
            </div>
          </div>
        </section>

        {/* BLOQUE FINAL */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/75 z-10 pointer-events-none" />
            <img 
              src="/nosotros_futuro_industrial.png" 
              alt="Futuristic Industrial Plant Background" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-20 max-w-[900px] mx-auto px-5 text-center flex flex-col items-center gap-6">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">El Compromiso SMQ</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight uppercase">
              LO QUE CONSTRUIMOS HOY DEFINE LA INDUSTRIA DEL MAÑANA
            </h2>
            <div className="w-20 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400] my-2" />
            
            <div className="flex flex-col gap-3 text-base md:text-lg text-white/90 font-medium leading-relaxed">
              <p>No suministramos únicamente maquinaria.</p>
              <p className="text-[#A1A8B3] text-sm md:text-base font-normal">
                Diseñamos ecosistemas tecnológicos robustos y adaptables capaces de transformar procesos completos de producción.
              </p>
            </div>

            <a 
              href="#contacto"
              className="bg-[#F5C400] text-black font-black text-xs tracking-[0.2em] uppercase py-4.5 px-10 rounded-lg shadow-[0_0_20px_rgba(245,196,0,0.3)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_25px_#F5C400] mt-6"
            >
              HABLAR CON UN INGENIERO
            </a>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <div id="contacto" className="scroll-mt-24">
          <ContactSection />
        </div>

        {/* FOOTER */}
        <Footer />
        </div>
      </div>
    </>
  );
};

export default Nosotros;
