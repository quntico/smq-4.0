import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Settings, Activity, Wifi, X } from 'lucide-react';

const technologies = [
  {
    icon: Settings,
    title: 'Ingeniería Industrial',
    subtitle: 'Diseñamos la infraestructura que impulsa la industria del futuro.',
    desc: 'Convertimos desafíos complejos en soluciones industriales de alto desempeño mediante ingeniería avanzada, simulación digital y diseño de sistemas escalables. Cada proyecto es desarrollado para maximizar productividad, confiabilidad y crecimiento sostenible.'
  },
  {
    icon: Cpu,
    title: 'Automatización PLC',
    subtitle: 'Transformamos procesos complejos en operaciones inteligentes.',
    desc: 'Integramos control, supervisión y automatización en plataformas robustas capaces de sincronizar equipos, optimizar recursos y garantizar estabilidad operativa. El resultado es una producción más eficiente, precisa y predecible.'
  },
  {
    icon: Activity,
    title: 'Sistemas Inteligentes SCR',
    subtitle: 'El cerebro digital de la industria moderna.',
    desc: 'SCR700 conecta equipos, procesos y personas en una plataforma inteligente capaz de monitorear, analizar y optimizar operaciones en tiempo real. Mediante inteligencia artificial y analítica predictiva transformamos datos industriales en decisiones estratégicas.'
  },
  {
    icon: Wifi,
    title: 'Monitoreo Remoto',
    subtitle: 'Control total desde cualquier lugar del mundo.',
    desc: 'Acceda a información crítica, supervise indicadores clave y reciba alertas inteligentes en tiempo real desde cualquier dispositivo. Nuestra tecnología permite tomar decisiones rápidas, reducir tiempos de respuesta y mantener la operación siempre bajo control.'
  }
];

const TechnologySection = () => {
  const [selectedTech, setSelectedTech] = useState(null);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedTech(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="tecnologia" className="py-16 md:py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Tecnología de <span className="text-primary">Vanguardia</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Integramos los últimos avances tecnológicos para garantizar eficiencia y confiabilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              onClick={() => setSelectedTech(tech)}
              className="glass-card p-8 rounded-xl hover:-translate-y-2 hover:border-primary transition-all duration-300 group cursor-pointer flex flex-col items-center text-center relative overflow-hidden border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors glow-blue shadow-[0_0_15px_rgba(245,196,0,0.05)]">
                <tech.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{tech.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tech.subtitle}
              </p>
              
              <div className="mt-4 text-xs font-bold text-[#F5C400] opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 uppercase tracking-wider">
                Ver más información
                <span className="text-[14px] transition-transform group-hover:translate-x-1 duration-300">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cristal Biselado Modal */}
      <AnimatePresence>
        {selectedTech && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            {/* Backdrop Closer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTech(null)}
              className="absolute inset-0 cursor-pointer"
            />
            
            {/* Beveled Crystal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white/[0.03] backdrop-blur-2xl rounded-2xl p-5 md:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),_inset_0_1px_0_rgba(255,255,255,0.15)] flex flex-col items-center text-center select-none z-10 max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-hidden"
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.25)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.25)',
                borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Refraction Accent Light Glows */}
              <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-[#F5C400]/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-[#F5C400]/5 rounded-full blur-[80px] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedTech(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/70 hover:text-white z-20"
              >
                <X size={18} />
              </button>

              {/* Animated Icon Container */}
              <div className="w-14 h-14 rounded-xl bg-[#F5C400]/10 flex items-center justify-center mb-4 border border-[#F5C400]/30 shadow-[0_0_30px_rgba(245,196,0,0.15)] overflow-hidden">
                {selectedTech.title === 'Ingeniería Industrial' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                  >
                    <Settings size={28} className="text-[#F5C400]" />
                  </motion.div>
                )}
                {selectedTech.title === 'Automatización PLC' && (
                  <svg 
                    viewBox="0 0 24 24" 
                    width="28" 
                    height="28" 
                    className="text-[#F5C400]"
                  >
                    {/* CPU Pins (Light up first) */}
                    <motion.g
                      animate={{ opacity: [0.15, 1, 1, 1, 0.15] }}
                      transition={{ repeat: Infinity, duration: 2.2, times: [0, 0.2, 0.7, 0.85, 1], ease: "easeInOut" }}
                    >
                      {/* Top Pins */}
                      <path d="M9 1v3" stroke="#F5C400" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M15 1v3" stroke="#F5C400" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Bottom Pins */}
                      <path d="M9 20v3" stroke="#F5C400" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M15 20v3" stroke="#F5C400" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Left Pins */}
                      <path d="M1 9h3" stroke="#F5C400" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M1 15h3" stroke="#F5C400" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Right Pins */}
                      <path d="M20 9h3" stroke="#F5C400" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M20 15h3" stroke="#F5C400" strokeWidth="2.5" strokeLinecap="round" />
                    </motion.g>

                    {/* CPU Body & Core (Lights up second, like booted by electricity) */}
                    <motion.g
                      animate={{ 
                        opacity: [0.1, 0.1, 1, 1, 0.1],
                        scale: [0.95, 0.95, 1, 1, 0.95]
                      }}
                      transition={{ repeat: Infinity, duration: 2.2, times: [0, 0.25, 0.55, 0.85, 1], ease: "easeInOut" }}
                      style={{ transformOrigin: 'center' }}
                    >
                      {/* Outer Square Body */}
                      <rect x="4" y="4" width="16" height="16" rx="2" stroke="#F5C400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      {/* Center Processor Core */}
                      <rect x="9" y="9" width="6" height="6" rx="1" stroke="#F5C400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </motion.g>
                  </svg>
                )}
                {selectedTech.title === 'Sistemas Inteligentes SCR' && (
                  <svg 
                    viewBox="0 0 24 24" 
                    width="28" 
                    height="28" 
                    className="text-[#F5C400]"
                  >
                    <motion.path
                      d="M2 12h4l3-9 6 18 3-9h4"
                      stroke="#F5C400"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 1 }}
                      animate={{ pathLength: [0, 1, 1, 0], opacity: [1, 1, 0, 0] }}
                      transition={{ repeat: Infinity, duration: 2, times: [0, 0.7, 0.85, 1], ease: "easeInOut" }}
                    />
                  </svg>
                )}
                {selectedTech.title === 'Monitoreo Remoto' && (
                  <svg 
                    viewBox="0 0 24 24" 
                    width="28" 
                    height="28" 
                    className="text-[#F5C400]"
                  >
                    {/* Dot */}
                    <motion.path 
                      d="M12 20h.01" 
                      stroke="#F5C400" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                      animate={{ opacity: [0.2, 1, 1, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1.8, times: [0, 0.15, 0.6, 0.8, 1], ease: "easeInOut" }}
                    />
                    {/* Arch 1 (Small) */}
                    <motion.path 
                      d="M8.5 16.5a5 5 0 0 1 7 0" 
                      stroke="#F5C400" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      fill="none" 
                      animate={{ opacity: [0.2, 0.2, 1, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1.8, times: [0, 0.25, 0.4, 0.8, 1], ease: "easeInOut" }}
                    />
                    {/* Arch 2 (Medium) */}
                    <motion.path 
                      d="M5 13a10 10 0 0 1 14 0" 
                      stroke="#F5C400" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      fill="none" 
                      animate={{ opacity: [0.2, 0.2, 0.2, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1.8, times: [0, 0.45, 0.6, 0.8, 1], ease: "easeInOut" }}
                    />
                    {/* Arch 3 (Large) */}
                    <motion.path 
                      d="M1.5 9.5a15 15 0 0 1 21 0" 
                      stroke="#F5C400" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      fill="none" 
                      animate={{ opacity: [0.2, 0.2, 0.2, 0.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.8, times: [0, 0.65, 0.8, 0.95, 1], ease: "easeInOut" }}
                    />
                  </svg>
                )}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white mb-2">
                {selectedTech.title}
              </h3>
              <p className="text-sm font-semibold text-[#F5C400] mb-4 max-w-lg leading-relaxed uppercase tracking-wider text-center">
                {selectedTech.subtitle}
              </p>

              {/* Beveled Divider Line */}
              <div 
                className="w-full h-[1px] mb-5" 
                style={{
                  background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)'
                }}
              />

              {/* Deep Details (Biselado Inner Box) */}
              <div 
                className="w-full bg-black/25 rounded-xl p-4 md:p-6 text-sm md:text-base text-white/80 leading-relaxed text-justify border border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRight: '1px solid rgba(0,0,0,0.2)',
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
              >
                {selectedTech.desc}
              </div>

              {/* Premium Footer Accent */}
              <div className="mt-5 text-[10px] font-mono tracking-widest text-white/30 uppercase">
                SMQ ADVANCED INDUSTRIAL TECHNOLOGY
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TechnologySection;
