import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Network, TrendingUp, Target, Cpu, ArrowLeft, Activity, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import Footer from '@/components/Footer.jsx';

const technologyData = {
  ia: {
    number: '01',
    title: 'INTELIGENCIA ARTIFICIAL',
    subtitle: 'ALGORITMOS DE APRENDIZAJE PROFUNDO\nY OPTIMIZACIÃ“N DE PROCESOS PRODUCTIVOS.',
    color: '#8B5CF6', // Purple from the design
    icon: Brain,
    bgImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80', // High tech background
    robotImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80', // Robot arm
    features: [
      {
        icon: Network,
        title: 'APRENDIZAJE PROFUNDO',
        desc: 'Modelos avanzados que analizan grandes volÃºmenes de datos para detectar patrones y mejorar continuamente.'
      },
      {
        icon: TrendingUp,
        title: 'OPTIMIZACIÃ“N',
        desc: 'Algoritmos que encuentran la mejor configuraciÃ³n de procesos para maximizar rendimiento y minimizar costos.'
      },
      {
        icon: Target,
        title: 'DECISIONES INTELIGENTES',
        desc: 'Sistemas que recomiendan acciones en tiempo real para una operaciÃ³n mÃ¡s eficiente y segura.'
      }
    ],
    applications: 'Control avanzado de procesos, detecciÃ³n de anomalÃ­as, mantenimiento predictivo, control de calidad visual y optimizaciÃ³n en tiempo real.'
  }
};

const TecnologiaDetalle = () => {
  const { sector } = useParams();
  const navigate = useNavigate();
  
  // Default to IA for now as requested
  const data = technologyData[sector] || technologyData.ia;
  const Icon = data.icon;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sector]);

  return (
    <div className="min-h-screen bg-[#080B11] text-white font-['Poppins'] pt-[100px] flex flex-col">
      {/* Return Navigation */}
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 px-4 py-2 rounded-full text-[11px] font-bold text-white/80 hover:text-white transition-all flex items-center gap-2 group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          <span>Volver al MenÃº</span>
        </button>
      </div>

      <main className="flex-grow flex items-center justify-center px-6 md:px-12 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[1400px] bg-[#0C1017] border border-white/5 rounded-[32px] overflow-hidden relative shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
        >
          {/* Subtle Background Glow */}
          <div 
            className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
            style={{ backgroundColor: data.color }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Column: Content */}
            <div className="lg:col-span-7 p-10 md:p-16 flex flex-col justify-between relative z-10">
              
              {/* Header Section */}
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div 
                    className="w-14 h-14 rounded-2xl border bg-[#0C1017] flex items-center justify-center shadow-lg"
                    style={{ borderColor: `${data.color}40` }}
                  >
                    <Icon size={28} style={{ color: data.color }} strokeWidth={1.5} />
                  </div>
                  <span className="text-xl font-light" style={{ color: data.color }}>{data.number}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black uppercase leading-[1.1] tracking-tight mb-6">
                  {data.title.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word} <br className="hidden md:block" />
                    </React.Fragment>
                  ))}
                </h1>

                <div 
                  className="w-16 h-1 mb-8 rounded-full"
                  style={{ backgroundColor: data.color }}
                />

                <p className="text-white/60 text-lg md:text-xl font-medium tracking-wide max-w-xl leading-relaxed whitespace-pre-line">
                  {data.subtitle}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
                      <FeatureIcon size={32} style={{ color: data.color }} className="mb-5 stroke-[1.5]" />
                      <h3 className="text-[13px] font-bold uppercase tracking-wider mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-[13px] text-white/50 leading-relaxed font-light">
                        {feature.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer Applications Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full bg-[#12161E] border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <div className="flex items-center gap-3 shrink-0">
                  <div 
                    className="w-10 h-10 rounded-xl border bg-[#0C1017] flex items-center justify-center"
                    style={{ borderColor: `${data.color}30` }}
                  >
                    <Cpu size={18} style={{ color: data.color }} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: data.color }}>
                    APLICACIONES
                  </span>
                </div>
                <p className="text-[12px] text-white/50 leading-relaxed font-light">
                  {data.applications}
                </p>
              </motion.div>

            </div>

            {/* Right Column: Image and Floating Panels */}
            <div className="lg:col-span-5 relative min-h-[500px] lg:min-h-full bg-[#080B11] overflow-hidden">
              {/* Main Robot Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
                style={{ backgroundImage: `url(${data.robotImage})` }}
              />
              {/* Fade gradient from left to blend with content */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0C1017] via-[#0C1017]/80 to-transparent" />
              
              {/* Floating UI Elements (Recreating the image mockup in pure HTML/CSS) */}
              <div className="absolute inset-0 p-8 flex flex-col items-end justify-center gap-4 z-20 pointer-events-none">
                
                {/* Panel 1: AnÃ¡lisis Predictivo */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-80 bg-[#06090E]/95 border border-white/[0.08] rounded-xl p-4 shadow-[0_0_40px_rgba(0,0,0,0.5)] font-mono"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-[9px] text-white/50 uppercase tracking-widest font-sans font-bold">AnÃ¡lisis Predictivo</h4>
                    <span className="text-[8px] text-white border border-white/20 px-1.5 py-0.5 rounded" style={{ backgroundColor: `${data.color}30`, borderColor: `${data.color}50`, color: data.color }}>LIVE</span>
                  </div>
                  
                  {/* Chart Container */}
                  <div className="relative h-24 w-full bg-[#020408] rounded border border-white/5 overflow-hidden">
                    {/* Grid Lines */}
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
                    
                    {/* SVG Telemetry Wave */}
                    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                      <defs>
                        <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={data.color} stopOpacity="0.4" />
                          <stop offset="100%" stopColor={data.color} stopOpacity="0.0" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="2" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      {/* Fill under the curve */}
                      <path 
                        d="M0,70 Q15,40 30,60 T60,50 T90,80 T120,30 T150,50 T180,20 T200,40 L200,100 L0,100 Z" 
                        fill="url(#waveGradient)" 
                      />
                      {/* The glowing line */}
                      <path 
                        d="M0,70 Q15,40 30,60 T60,50 T90,80 T120,30 T150,50 T180,20 T200,40" 
                        fill="none" 
                        stroke={data.color} 
                        strokeWidth="1.5"
                        filter="url(#glow)"
                        vectorEffect="non-scaling-stroke" 
                      />
                    </svg>

                    {/* Scanning Crosshair */}
                    <div className="absolute top-0 bottom-0 left-[65%] border-l border-dashed w-px" style={{ borderColor: `${data.color}80` }}>
                      <div className="absolute top-1/3 -left-[3px] w-1.5 h-1.5 rounded-full shadow-[0_0_8px_2px]" style={{ backgroundColor: data.color, color: data.color }} />
                    </div>
                  </div>
                  
                  {/* Axis values */}
                  <div className="flex justify-between mt-2 text-[8px] text-white/30">
                    <span>-100ms</span>
                    <span>-50ms</span>
                    <span>0ms</span>
                  </div>
                </motion.div>

                {/* Panel 2: Rendimiento */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-72 bg-[#06090E]/95 border border-white/[0.08] rounded-xl p-4 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <h4 className="text-[9px] text-white/50 font-sans uppercase tracking-widest font-bold mb-1">OEE Rendimiento</h4>
                    <span className="text-[10px] text-white/30 font-mono">SYS_EFFICIENCY_IDX</span>
                  </div>
                  <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                    {/* Decorative outer dashed ring */}
                    <svg viewBox="0 0 60 60" className="absolute inset-0 w-full h-full transform -rotate-90 opacity-20">
                      <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="1" fill="none" strokeDasharray="2 4" />
                    </svg>
                    {/* Main gauge */}
                    <svg viewBox="0 0 60 60" className="w-full h-full transform -rotate-90">
                      <circle cx="30" cy="30" r="24" stroke="rgba(255,255,255,0.03)" strokeWidth="3" fill="none" />
                      <circle cx="30" cy="30" r="24" stroke={data.color} strokeWidth="3" fill="none" strokeDasharray="150" strokeDashoffset="12" strokeLinecap="square" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-[13px] font-mono font-bold text-white tracking-tighter leading-none">92<span className="text-[9px]">%</span></span>
                    </div>
                  </div>
                </motion.div>

                {/* Panel 3: Alertas */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="w-80 bg-[#06090E]/95 border border-white/[0.08] rounded-xl p-4 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                    <h4 className="text-[9px] text-white/50 font-sans uppercase tracking-widest font-bold">Registro de Alertas</h4>
                    <span className="flex items-center gap-1.5 text-[8px] font-mono text-white/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                      3 DETECTADAS
                    </span>
                  </div>
                  
                  <div className="space-y-2 font-mono">
                    <div className="flex items-start gap-3 p-2 bg-gradient-to-r from-red-500/10 to-transparent border-l-2 border-red-500 rounded-r">
                      <AlertTriangle size={12} className="text-red-400 mt-0.5 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-white/90 leading-tight">Temperatura CrÃ­tica</span>
                        <span className="text-[8px] text-white/40 mt-0.5">[ERR-102] Eje de servo 4 &gt; 85Â°C</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-2 bg-gradient-to-r from-yellow-500/10 to-transparent border-l-2 border-yellow-500 rounded-r">
                      <Activity size={12} className="text-yellow-400 mt-0.5 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-white/90 leading-tight">VibraciÃ³n Anormal</span>
                        <span className="text-[8px] text-white/40 mt-0.5">[WRN-405] ArmÃ³nico detectado 120Hz</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-2 bg-gradient-to-r from-blue-500/10 to-transparent border-l-2 border-blue-500 rounded-r">
                      <Info size={12} className="text-blue-400 mt-0.5 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-white/90 leading-tight">Mantenimiento Sugerido</span>
                        <span className="text-[8px] text-white/40 mt-0.5">[INF-890] InspecciÃ³n visual requerida</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TecnologiaDetalle;
