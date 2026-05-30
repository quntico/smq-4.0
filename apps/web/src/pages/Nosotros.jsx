import React, { useState, useEffect } from 'react';
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
import { useCMS } from '@/context/CMSContext.jsx';

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
  const { isEditorMode } = useCMS();

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
        <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-[40px] border-b border-white/5 bg-gradient-to-b from-[#030712] via-[#080d1a] to-[#030712]">
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#F5C400]/5 rounded-full filter blur-[120px] pointer-events-none" />

          <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start gap-6"
            >
              {/* Badge */}
              <div className="flex items-center gap-2 bg-[#F5C400]/10 border border-[#F5C400]/30 rounded-full px-4 py-1.5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#F5C400] animate-ping"></span>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#F5C400]">Desde 2005</span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                INGENIERÍA PARA EL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C400] to-yellow-500 font-extrabold drop-shadow-[0_0_20px_rgba(245,196,0,0.2)]">
                  FUTURO INDUSTRIAL
                </span>
              </h1>

              {/* Divider */}
              <div className="w-24 h-[3px] bg-[#F5C400] shadow-[0_0_10px_#F5C400] my-2" />

              {/* Description */}
              <div className="flex flex-col gap-4 text-base md:text-lg text-[#A1A8B3] leading-relaxed max-w-[600px]">
                <p>
                  Durante más de 20 años hemos diseñado, automatizado e integrado soluciones industriales para empresas que buscan producir más, operar mejor y competir globalmente.
                </p>
                <p className="border-l-2 border-[#F5C400]/40 pl-4 italic text-white/95">
                  Diseñamos en México, desarrollamos tecnología propia y colaboramos con fabricantes internacionales para crear sistemas industriales preparados para los desafíos de la próxima generación.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mt-6">
                <a 
                  href="#historia"
                  className="bg-[#F5C400] text-black font-bold text-sm tracking-widest uppercase py-4 px-8 rounded-lg transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_#F5C400] transform hover:-translate-y-0.5"
                >
                  NUESTRA HISTORIA
                </a>
                <a 
                  href="/#proyectos"
                  className="bg-transparent border border-white/20 text-white font-bold text-sm tracking-widest uppercase py-4 px-8 rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-[#F5C400] transform hover:-translate-y-0.5"
                >
                  VER PROYECTOS
                </a>
              </div>
            </motion.div>

            {/* Right Media - SpaceX/Tesla style collage image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group"
            >
              {/* Beveled glass overlays */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
              <img 
                src="/nosotros_industrial_hero.png" 
                alt="SMQ High Tech Collage" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Technical CAD overlay label */}
              <div className="absolute top-4 right-4 z-20 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-[10px] text-white/90 font-mono tracking-wider">COLLAGE_SYS.V4.1</span>
              </div>
              <div className="absolute bottom-4 left-4 z-20 bg-black/80 backdrop-blur-md border border-white/15 px-4 py-2 rounded-lg font-mono text-[10px] text-[#F5C400]">
                ENGINEERED_IN_MEXICO // AUTOMATION_CORE
              </div>
            </motion.div>

          </div>
        </section>

        {/* STATS STRIP */}
        <section className="bg-black py-8 relative border-y border-white/5">
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
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border-t border-l border-white/20 border-b border-r border-white/5 bg-[#0e131b]/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[300px] transition-all duration-300 hover:-translate-y-2 hover:border-[#F5C400]/40 group"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C400]/30 to-transparent" />
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#F5C400]/10 flex items-center justify-center border border-[#F5C400]/30 mb-6 group-hover:bg-[#F5C400]/20 transition-all duration-300">
                    <Cpu size={24} className="text-[#F5C400]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">MISIÓN</h3>
                  <p className="text-[#A1A8B3] text-sm leading-relaxed">
                    Automatizar procesos industriales mediante soluciones de ingeniería que incrementen productividad, calidad y competitividad.
                  </p>
                </div>
                <div className="text-[9px] font-mono text-white/30 mt-6 tracking-widest uppercase">SMQ_CORE_MISSION</div>
              </motion.div>

              {/* Visión */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="border-t border-l border-white/20 border-b border-r border-white/5 bg-[#0e131b]/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[300px] transition-all duration-300 hover:-translate-y-2 hover:border-[#F5C400]/40 group"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C400]/30 to-transparent" />
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#F5C400]/10 flex items-center justify-center border border-[#F5C400]/30 mb-6 group-hover:bg-[#F5C400]/20 transition-all duration-300">
                    <Eye size={24} className="text-[#F5C400]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">VISIÓN</h3>
                  <p className="text-[#A1A8B3] text-sm leading-relaxed">
                    Convertirnos en la empresa referente de automatización e integración industrial en Latinoamérica.
                  </p>
                </div>
                <div className="text-[9px] font-mono text-white/30 mt-6 tracking-widest uppercase">SMQ_FUTURE_VISION</div>
              </motion.div>

              {/* Valores */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="border-t border-l border-white/20 border-b border-r border-white/5 bg-[#0e131b]/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[300px] transition-all duration-300 hover:-translate-y-2 hover:border-[#F5C400]/40 group"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C400]/30 to-transparent" />
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#F5C400]/10 flex items-center justify-center border border-[#F5C400]/30 mb-6 group-hover:bg-[#F5C400]/20 transition-all duration-300">
                    <Shield size={24} className="text-[#F5C400]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">VALORES</h3>
                  
                  {/* Values grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {['Innovación', 'Excelencia', 'Integridad', 'Ingeniería', 'Evolución', 'Impacto'].map((v, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
                        <span className="text-xs text-[#A1A8B3] font-bold group-hover:text-white transition-colors">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[9px] font-mono text-white/30 mt-6 tracking-widest uppercase">SMQ_ETHICAL_VALUES</div>
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
        <section className="py-24 px-[40px] relative border-b border-white/5 bg-[#030712]">
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
              href="/#contacto"
              className="bg-[#F5C400] text-black font-black text-xs tracking-[0.2em] uppercase py-4.5 px-10 rounded-lg shadow-[0_0_20px_rgba(245,196,0,0.3)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_25px_#F5C400] mt-6"
            >
              HABLAR CON UN INGENIERO
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
        </div>
      </div>
    </>
  );
};

export default Nosotros;
