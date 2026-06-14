import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Factory, Tv, TrendingUp, DownloadCloud, BookOpen, ArrowUpRight, Calculator, FileText, CheckCircle2, Play, Pause, RefreshCw, Layers, Globe, Users, Headphones, Grid, Building2, MapPin, Hammer, Cpu } from 'lucide-react';
import Footer from '@/components/Footer.jsx';

const Projects = () => {
  // ROI Calculator State
  const [capacity, setCapacity] = useState(2.5); // ton/h
  const [energyCost, setEnergyCost] = useState(0.12); // USD/kWh
  const [opHours, setOpHours] = useState(6000); // horas/año
  const [calculated, setCalculated] = useState(true);

  // Simulation State
  const [simActive, setSimActive] = useState(false);
  const [simFlow, setSimFlow] = useState(75); // %
  const [simTemp, setSimTemp] = useState(82); // °C
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  // Calculamos ROI dinámicamente
  // Estimación: 1 ton/h ahorra aprox 15 kWh usando tecnología SMQ
  const energySavedKWh = capacity * 15 * opHours;
  const annualSavings = energySavedKWh * energyCost;
  const estInvestment = capacity * 45000; // Inversión aproximada
  const paybackMonths = Math.max(3, Math.round((estInvestment / annualSavings) * 12));

  return (
    <>
      <div className="min-h-screen bg-[#070A0F] text-white pt-24 font-sansSelection relative overflow-hidden">
        {/* Luces y gradientes cyberpunk */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#10B981]/5 rounded-full filter blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#3B82F6]/5 rounded-full filter blur-[180px] pointer-events-none" />

        {/* Hero Section */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-24 text-center relative z-10 border-b border-white/5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Centro de Recursos SMQ</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-none mb-6">
            Proyectos & <span className="text-[#FFD700]">Biblioteca</span>
          </h1>
          <p className="text-white/60 leading-relaxed text-sm md:text-lg max-w-3xl mx-auto">
            Explora nuestros casos de éxito a nivel global, interactúa con el simulador de procesos 3D, calcula el retorno de inversión de tu planta y descarga hojas técnicas de toda nuestra maquinaria.
          </p>
        </section>

        {/* Sub-navegación por anclas */}
        <div className="sticky top-[80px] bg-[#070A0F]/80 backdrop-blur-md border-b border-white/5 z-40 py-4">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 flex items-center justify-center gap-3 md:gap-6 flex-wrap text-xs font-bold uppercase tracking-wider">
            {[
              { label: 'Casos de Éxito', href: '#casos', icon: Award },
              { label: 'Instalaciones', href: '#instalaciones', icon: Factory },
              { label: 'Simulaciones', href: '#simulaciones', icon: Tv },
              { label: 'Calculadora ROI', href: '#roi', icon: Calculator },
              { label: 'Descargables', href: '#descargables', icon: DownloadCloud },
              { label: 'Biblioteca', href: '#biblioteca', icon: BookOpen }
            ].map((link, idx) => {
              const Icon = link.icon;
              return (
                <a
                  key={idx}
                  href={link.href}
                  className="flex items-center gap-2 bg-white/5 hover:bg-[#FFD700] hover:text-black border border-white/10 hover:border-transparent px-3 py-2 rounded-lg transition-all"
                >
                  <Icon size={12} />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* CONTENIDOS DE LAS 6 CATEGORÍAS */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 space-y-32 relative z-10">

          {/* 01. CASOS DE ÉXITO */}
          <section id="casos" className="scroll-mt-32 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch relative z-10">
              {/* Columna Izquierda: Selector de Casos de Éxito */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-[#84CC16]">
                        <Award size={20} className="stroke-[1.5]" />
                      </span>
                      <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40">Estudios de Campo</h2>
                    </div>
                    <span className="text-3xl font-black font-mono tracking-tighter opacity-15 text-[#84CC16]">01</span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.05] text-white">
                    Casos de Éxito
                  </h3>
                  
                  <p className="text-white/40 text-xs font-bold uppercase tracking-wider leading-relaxed">
                    ESTUDIOS DE CASOS REALES Y RESULTADOS OPERATIVOS DE NUESTROS CLIENTES.
                  </p>
                  
                  <div className="w-12 h-[3px] rounded-full bg-[#84CC16]" />

                  <p className="text-white/70 text-sm leading-relaxed">
                    En SMQ impulsamos la eficiencia y la innovación en la industria alimentaria a nivel global. Seleccione uno de nuestros casos emblemáticos en México para analizar los datos analíticos de rendimiento en tiempo real.
                  </p>
                </div>

                {/* Casos de Éxito Destacados en México */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#84CC16]">
                    CASOS DE ÉXITO DESTACADOS EN MÉXICO
                  </p>

                  <div className="space-y-3">
                    {[
                      {
                        company: 'BIMBO',
                        plant: 'Planta Azcapotzalco, CDMX',
                        desc: 'Modernización de línea de producción de panificación.',
                        val: '+28%',
                        metric: 'Eficiencia',
                        sub: 'Operativa'
                      },
                      {
                        company: 'HERDEZ',
                        plant: 'Planta Tecámac, Edo. de México',
                        desc: 'Automatización de proceso de envasado de alimentos.',
                        val: '+32%',
                        metric: 'Rendimiento',
                        sub: 'De Línea'
                      },
                      {
                        company: 'NESTLÉ',
                        plant: 'Planta Coatepec, Veracruz',
                        desc: 'Implementación de sistema de clasificación de granos por IA.',
                        val: '+24%',
                        metric: 'Clasificación',
                        sub: 'Automatizada'
                      }
                    ].map((proj, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => setActiveProjectIdx(pIdx)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
                          activeProjectIdx === pIdx
                            ? `bg-white/[0.03] border-white/15 shadow-[0_0_20px_rgba(255,255,255,0.03)]`
                            : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-10 rounded-lg flex items-center justify-center border transition-colors ${
                            activeProjectIdx === pIdx ? 'bg-black border-white/10' : 'bg-black/45 border-white/5'
                          }`}>
                            <span className="text-[11px] font-black text-white tracking-widest">{proj.company}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-white">{proj.plant}</span>
                            <span className="text-[10px] text-white/50">{proj.desc}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 text-right">
                          <TrendingUp size={16} style={{ color: activeProjectIdx === pIdx ? '#84CC16' : 'rgba(255,255,255,0.3)' }} />
                          <div className="flex flex-col leading-none">
                            <span className="text-sm font-black text-white" style={{ color: activeProjectIdx === pIdx ? '#84CC16' : 'white' }}>{proj.val}</span>
                            <span className="text-[7px] text-white/40 uppercase font-black tracking-wider">{proj.metric}</span>
                            <span className="text-[6px] text-white/30 uppercase font-bold">{proj.sub}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Consola de Rendimiento Operativo */}
              <div className="lg:col-span-7 bg-[#080B11]/85 border border-white/5 rounded-2xl p-6 md:p-8 relative flex flex-col justify-between min-h-[480px] shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />
                
                {/* Cabecera del Panel */}
                <div className="flex justify-between items-start border-b border-white/5 pb-4 relative z-10">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">MONITOR OPERATIVO</span>
                    <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                      {activeProjectIdx === 0 && "BIMBO - EFICIENCIA AZCAPOTZALCO"}
                      {activeProjectIdx === 1 && "HERDEZ - AUTOMATIZACIÓN TECÁMAC"}
                      {activeProjectIdx === 2 && "NESTLÉ - CLASIFICACIÓN COATEPEC"}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-lg px-2.5 py-1 text-[8px] font-bold text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
                    ANALÍTICA ACTIVA
                  </div>
                </div>

                {/* Gráfico de Rendimiento */}
                <div className="py-6 relative z-10 flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[9px] font-black uppercase text-white/40 tracking-wider">INCREMENTO OPERATIVO vs BASELINE</span>
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1.5 text-[8px] font-bold text-white/40">
                        <span className="w-2 h-0.5 border-t border-dashed border-white/30" /> BASELINE
                      </span>
                      <span className="flex items-center gap-1.5 text-[8px] font-black text-[#84CC16]">
                        <span className="w-2 h-0.5 rounded bg-[#84CC16]" /> OPTIMIZADO
                      </span>
                    </div>
                  </div>

                  {/* Gráfico Realista SVG */}
                  <div className="w-full bg-black/40 border border-white/5 rounded-xl p-4 relative overflow-hidden">
                    <svg viewBox="0 0 500 180" className="w-full h-auto overflow-visible">
                      <defs>
                        <linearGradient id="optGradientProj" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#84CC16" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#84CC16" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Rejilla de fondo */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="160" x2="500" y2="160" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      
                      {/* Curva de Baseline (Gris discontinua) */}
                      <path
                        d={
                          activeProjectIdx === 0 ? "M 20,130 Q 100,125 180,120 T 340,122 T 480,115" :
                          activeProjectIdx === 1 ? "M 20,140 Q 100,138 180,135 T 340,132 T 480,130" :
                          "M 20,120 Q 100,118 180,122 T 340,115 T 480,112"
                        }
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />

                      {/* Área debajo de la optimizada */}
                      <path
                        d={
                          activeProjectIdx === 0 ? "M 20,130 Q 100,85 180,60 T 340,45 T 480,35 L 480,160 L 20,160 Z" :
                          activeProjectIdx === 1 ? "M 20,140 Q 100,80 180,50 T 340,38 T 480,25 L 480,160 L 20,160 Z" :
                          "M 20,120 Q 100,88 180,70 T 340,55 T 480,48 L 480,160 L 20,160 Z"
                        }
                        fill="url(#optGradientProj)"
                      />

                      {/* Curva de Optimización SMQ (Verde brillante) */}
                      <path
                        d={
                          activeProjectIdx === 0 ? "M 20,130 Q 100,85 180,60 T 340,45 T 480,35" :
                          activeProjectIdx === 1 ? "M 20,140 Q 100,80 180,50 T 340,38 T 480,25" :
                          "M 20,120 Q 100,88 180,70 T 340,55 T 480,48"
                        }
                        fill="none"
                        stroke="#84CC16"
                        strokeWidth="3"
                      />

                      {/* Nodos de datos activos */}
                      {activeProjectIdx === 0 && (
                        <>
                          <circle cx="180" cy="60" r="5" fill="#080B11" stroke="#84CC16" strokeWidth="2" />
                          <circle cx="340" cy="45" r="5" fill="#080B11" stroke="#84CC16" strokeWidth="2" />
                          <circle cx="480" cy="35" r="5" fill="#84CC16" />
                        </>
                      )}
                      {activeProjectIdx === 1 && (
                        <>
                          <circle cx="180" cy="50" r="5" fill="#080B11" stroke="#84CC16" strokeWidth="2" />
                          <circle cx="340" cy="38" r="5" fill="#080B11" stroke="#84CC16" strokeWidth="2" />
                          <circle cx="480" cy="25" r="5" fill="#84CC16" />
                        </>
                      )}
                      {activeProjectIdx === 2 && (
                        <>
                          <circle cx="180" cy="70" r="5" fill="#080B11" stroke="#84CC16" strokeWidth="2" />
                          <circle cx="340" cy="55" r="5" fill="#080B11" stroke="#84CC16" strokeWidth="2" />
                          <circle cx="480" cy="48" r="5" fill="#84CC16" />
                        </>
                      )}
                    </svg>
                  </div>
                </div>

                {/* Métricas e Impacto del Proyecto */}
                <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4 relative z-10 bg-black/10 p-4 rounded-xl">
                  <div className="flex flex-col text-center">
                    <span className="text-[8px] font-black uppercase text-white/40 tracking-wider">Ahorro Energía</span>
                    <span className="text-xl font-black text-[#84CC16] mt-1">
                      {activeProjectIdx === 0 && "22%"}
                      {activeProjectIdx === 1 && "25%"}
                      {activeProjectIdx === 2 && "18%"}
                    </span>
                    <span className="text-[7px] text-white/30 uppercase mt-0.5">Certificado Anual</span>
                  </div>
                  
                  <div className="flex flex-col text-center border-x border-white/5">
                    <span className="text-[8px] font-black uppercase text-white/40 tracking-wider">OEE Alcanzado</span>
                    <span className="text-xl font-black text-white mt-1">
                      {activeProjectIdx === 0 && "94.5%"}
                      {activeProjectIdx === 1 && "96.2%"}
                      {activeProjectIdx === 2 && "93.8%"}
                    </span>
                    <span className="text-[7px] text-white/30 uppercase mt-0.5">Disponibilidad Planta</span>
                  </div>

                  <div className="flex flex-col text-center">
                    <span className="text-[8px] font-black uppercase text-white/40 tracking-wider">Retorno (ROI)</span>
                    <span className="text-xl font-black text-white mt-1">
                      {activeProjectIdx === 0 && "14 Meses"}
                      {activeProjectIdx === 1 && "11 Meses"}
                      {activeProjectIdx === 2 && "16 Meses"}
                    </span>
                    <span className="text-[7px] text-white/30 uppercase mt-0.5">Periodo Payback</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 02. INSTALACIONES */}
          <section id="instalaciones" className="scroll-mt-32 max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-24 border-t border-white/5 relative overflow-hidden font-['Poppins']">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch relative z-10">
              
              {/* Columna Izquierda (4/12): Encabezado de Instalaciones */}
              <div className="lg:col-span-4 flex flex-col justify-start space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[#3B82F6]">
                    <Factory size={20} className="stroke-[1.5]" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[20px] font-black text-[#3B82F6] font-mono leading-none">02</span>
                    <div className="w-6 h-[1.5px] bg-[#3B82F6] mt-1" />
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
                  Instalaciones
                </h2>

                <div className="space-y-4">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                    GALERÍA Y DETALLES DE PLANTAS EN FUNCIONAMIENTO A NIVEL MUNDIAL.
                  </p>
                  <div className="w-12 h-[3px] rounded-full bg-[#3B82F6]" />
                </div>

                <p className="text-white/60 text-xs md:text-sm leading-relaxed font-medium">
                  Contamos con instalaciones de clase mundial equipadas con tecnología de última generación, diseñadas para garantizar eficiencia, calidad y escalabilidad en cada proyecto que desarrollamos.
                </p>
              </div>

              {/* Columna Derecha (8/12): Imagen y Paneles de Información */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Gran Imagen Principal */}
                <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] group">
                  <img 
                    src="/smq_factory_night.png" 
                    alt="SMQ High-Tech Factory" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Grid de Paneles Lado a Lado */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Tarjeta 1: Planta Principal */}
                  <div className="bg-[#080B11]/85 border border-white/5 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[260px] shadow-lg">
                    {/* SVG Dotted Map de China de fondo sutil */}
                    <div className="absolute right-2 bottom-6 w-32 h-32 opacity-15 pointer-events-none z-0">
                      <svg viewBox="0 0 120 120" className="w-full h-full fill-white">
                        <circle cx="85" cy="55" r="1.5" />
                        <circle cx="95" cy="58" r="1.5" />
                        <circle cx="90" cy="63" r="1.5" />
                        <circle cx="80" cy="60" r="1.5" />
                        <circle cx="75" cy="65" r="1.5" />
                        <circle cx="70" cy="55" r="1.5" />
                        <circle cx="85" cy="70" r="1.5" />
                        <circle cx="72" cy="73" r="1.5" />
                        <circle cx="60" cy="65" r="1.5" />
                        <circle cx="65" cy="58" r="1.5" />
                        {/* Hotspot Pulsante de Shanghai */}
                        <circle cx="95" cy="58" r="3" fill="#3B82F6" className="animate-ping" />
                        <circle cx="95" cy="58" r="1.5" fill="#3B82F6" />
                      </svg>
                    </div>

                    <div className="relative z-10 space-y-4">
                      {/* Cabecera Tarjeta */}
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3B82F6]">
                          <Factory size={16} />
                        </span>
                        <div className="flex flex-col leading-none">
                          <span className="text-[8px] font-black uppercase text-white/40 tracking-wider">PLANTA PRINCIPAL</span>
                          <span className="text-sm font-black text-white tracking-tight mt-0.5">SHANGHAI, CHINA</span>
                        </div>
                      </div>

                      {/* Lista de Detalles */}
                      <ul className="space-y-2 text-[10px] text-white/70 font-semibold pl-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>5,000 m² de superficie total</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>Centro de manufactura y ensamblaje</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>Tecnología de producción de última generación</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>Capacidad instalada para más de 200 líneas/año</span>
                        </li>
                      </ul>
                    </div>

                    {/* Footer de la Tarjeta */}
                    <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-3.5 mt-4 text-center relative z-10">
                      <div className="flex flex-col items-center">
                        <Building2 size={12} className="text-[#3B82F6]" />
                        <span className="text-[10px] font-black text-white mt-1">5,000 m²</span>
                        <span className="text-[6px] text-white/30 uppercase font-bold">Superficie Total</span>
                      </div>
                      <div className="flex flex-col items-center border-x border-white/5">
                        <Hammer size={12} className="text-[#3B82F6]" />
                        <span className="text-[10px] font-black text-white mt-1">200+</span>
                        <span className="text-[6px] text-white/30 uppercase font-bold">Líneas/Año</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Users size={12} className="text-[#3B82F6]" />
                        <span className="text-[10px] font-black text-white mt-1">300+</span>
                        <span className="text-[6px] text-white/30 uppercase font-bold">Colaboradores</span>
                      </div>
                    </div>
                  </div>

                  {/* Tarjeta 2: Oficina Comercial */}
                  <div className="bg-[#080B11]/85 border border-white/5 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[260px] shadow-lg">
                    {/* SVG Dotted Map de América de fondo sutil */}
                    <div className="absolute right-2 bottom-6 w-32 h-32 opacity-15 pointer-events-none z-0">
                      <svg viewBox="0 0 120 120" className="w-full h-full fill-white">
                        <circle cx="30" cy="30" r="1.2" />
                        <circle cx="35" cy="40" r="1.2" />
                        <circle cx="40" cy="48" r="1.2" />
                        <circle cx="45" cy="55" r="1.2" />
                        <circle cx="50" cy="62" r="1.2" />
                        <circle cx="55" cy="70" r="1.2" />
                        <circle cx="60" cy="80" r="1.2" />
                        {/* Hotspot Pulsante de CDMX */}
                        <circle cx="40" cy="48" r="3" fill="#3B82F6" className="animate-ping" />
                        <circle cx="40" cy="48" r="1.2" fill="#3B82F6" />
                      </svg>
                    </div>

                    <div className="relative z-10 space-y-4">
                      {/* Cabecera Tarjeta */}
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3B82F6]">
                          <Building2 size={16} />
                        </span>
                        <div className="flex flex-col leading-none">
                          <span className="text-[8px] font-black uppercase text-white/40 tracking-wider">OFICINA COMERCIAL</span>
                          <span className="text-sm font-black text-white tracking-tight mt-0.5">CDMX, MÉXICO</span>
                          <span className="text-[7px] font-bold text-white/50 tracking-wide uppercase mt-0.5 font-mono">POLANCO | CARSO</span>
                        </div>
                      </div>

                      {/* Lista de Detalles */}
                      <ul className="space-y-2 text-[10px] text-white/70 font-semibold pl-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>Atención y soporte comercial</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>Desarrollo de soluciones a la medida</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>Relación cercana con nuestros clientes</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>Cobertura en toda Latinoamérica</span>
                        </li>
                      </ul>
                    </div>

                    {/* Footer de la Tarjeta */}
                    <div className="border-t border-white/5 pt-3.5 mt-4 flex justify-between items-center gap-4 text-left relative z-10">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#3B82F6] shrink-0" />
                        <div className="flex flex-col leading-none">
                          <span className="text-[8px] text-white/70 font-bold">Lago Zurich 245, Polanco, Miguel Hidalgo</span>
                          <span className="text-[6px] text-white/40 uppercase mt-0.5">11529, CDMX, México</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 border-l border-white/5 pl-2.5">
                        <Building2 size={12} className="text-[#3B82F6]" />
                        <div className="flex flex-col leading-none">
                          <span className="text-[8px] text-white/80 font-black tracking-tight">Corporativo Carso</span>
                          <span className="text-[6px] text-white/30 uppercase mt-0.5 font-bold">Grupo Carso</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* 03. SIMULACIONES */}
          <section id="simulaciones" className="scroll-mt-32 space-y-12">
            <div className="flex items-center gap-4 flex-wrap justify-between border-b border-white/5 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#06B6D4] text-xs font-black tracking-widest font-mono">03 / TECNOLOGÍA</span>
                  <Tv size={14} className="text-[#06B6D4]" />
                </div>
                <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight">Simulador de Procesos 3D</h2>
              </div>
              <p className="text-white/40 text-xs md:text-sm max-w-md">Interactúa con los controles del flujo de la planta para simular presiones y temperaturas en tiempo real.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Controles de Simulación */}
              <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-white/40">Consola de Control</span>
                    <button
                      onClick={() => setSimActive(!simActive)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                        simActive
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {simActive ? <Play size={10} className="fill-emerald-400" /> : <Pause size={10} className="fill-red-400" />}
                      <span>{simActive ? 'Operando' : 'Detenido'}</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50 uppercase tracking-wider">Flujo de Entrada</span>
                        <span className="font-bold text-white">{simFlow} %</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={simFlow}
                        onChange={(e) => setSimFlow(parseInt(e.target.value))}
                        disabled={!simActive}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#06B6D4]"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50 uppercase tracking-wider">Temperatura Reactor</span>
                        <span className="font-bold text-white">{simTemp} °C</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="150"
                        value={simTemp}
                        onChange={(e) => setSimTemp(parseInt(e.target.value))}
                        disabled={!simActive}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#06B6D4]"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-black/45 border border-white/5 rounded-xl space-y-2 text-xs">
                  <span className="font-bold text-white block uppercase tracking-wider">Estado de Diagnóstico:</span>
                  <p className="text-white/60 leading-relaxed">
                    {simActive 
                      ? `Flujo nominal ajustado a ${simFlow}%. Carga de trabajo estable sin riesgo de cavitación o acumulación térmica.`
                      : 'Presión en cero. Esperando pulso de arranque del motor principal para iniciar flujo volumétrico.'
                    }
                  </p>
                </div>
              </div>

              {/* Panel de Simulación Visual Animada */}
              <div className="lg:col-span-8 bg-black/60 border border-white/5 rounded-2xl p-8 flex flex-col justify-center items-center min-h-[300px] relative overflow-hidden group shadow-2xl">
                {/* Rejilla técnica de fondo */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08),transparent)] z-0" />
                
                {/* Elementos de simulación en movimiento */}
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="flex items-center gap-6">
                    {/* Reactor 1 */}
                    <div className="relative flex flex-col items-center">
                      <div className={`w-14 h-24 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                        simActive ? 'bg-[#06B6D4]/10 border-[#06B6D4]/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'bg-white/5 border-white/10'
                      }`}>
                        <div 
                          className="w-full bg-[#06B6D4]/20 transition-all duration-500 rounded-b-xl absolute bottom-0" 
                          style={{ height: simActive ? `${simFlow}%` : '0%' }}
                        />
                        <Layers size={24} className={simActive ? 'text-[#06B6D4] animate-pulse' : 'text-white/20'} />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-white/40 mt-2">Reactor A</span>
                    </div>

                    {/* Vía de comunicación / Tubería */}
                    <div className="w-16 h-1 bg-white/10 relative">
                      {simActive && (
                        <div 
                          className="h-full bg-[#06B6D4] animate-shimmer absolute left-0 top-0" 
                          style={{
                            width: '40px',
                            animation: 'shimmer 1.5s infinite linear'
                          }}
                        />
                      )}
                    </div>

                    {/* Reactor 2 */}
                    <div className="relative flex flex-col items-center">
                      <div className={`w-14 h-24 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                        simActive ? 'bg-amber-500/10 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'bg-white/5 border-white/10'
                      }`}>
                        <div 
                          className="w-full bg-amber-500/20 transition-all duration-500 rounded-b-xl absolute bottom-0" 
                          style={{ height: simActive ? `${(simTemp - 40) / 1.1}%` : '0%' }}
                        />
                        <RefreshCw size={24} className={simActive ? 'text-amber-500 animate-spin' : 'text-white/20'} style={{ animationDuration: simActive ? `${4 - (simFlow / 25)}s` : '0s' }} />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-white/40 mt-2">Reactor B</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                    {simActive ? 'FLUJO DINÁMICO EN EJECUCIÓN' : 'SISTEMA EN STANDBY'}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 04. CALCULADORA ROI */}
          <section id="roi" className="scroll-mt-32 space-y-12">
            <div className="flex items-center gap-4 flex-wrap justify-between border-b border-white/5 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#F97316] text-xs font-black tracking-widest font-mono">04 / RETORNO DE INVERSIÓN</span>
                  <Calculator size={14} className="text-[#F97316]" />
                </div>
                <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight">Calculadora ROI y Ahorro</h2>
              </div>
              <p className="text-white/40 text-xs md:text-sm max-w-md">Calcula de manera inmediata el beneficio económico y energético al integrar maquinaria SMQ.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Formulario */}
              <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-white/40">Configuración Operativa</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-white/60 font-semibold uppercase tracking-wider block">Capacidad Nominal (ton/h)</label>
                    <input
                      type="number"
                      value={capacity}
                      step="0.5"
                      min="0.5"
                      max="10"
                      onChange={(e) => setCapacity(parseFloat(e.target.value) || 0)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F97316] font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-white/60 font-semibold uppercase tracking-wider block">Costo de Energía (USD/kWh)</label>
                    <input
                      type="number"
                      value={energyCost}
                      step="0.01"
                      min="0.01"
                      max="0.5"
                      onChange={(e) => setEnergyCost(parseFloat(e.target.value) || 0)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F97316] font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-white/60 font-semibold uppercase tracking-wider block">Horas de Operación al Año</label>
                    <input
                      type="number"
                      value={opHours}
                      step="500"
                      min="1000"
                      max="8760"
                      onChange={(e) => setOpHours(parseInt(e.target.value) || 0)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F97316] font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Resultados */}
              <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 p-8 rounded-2xl flex flex-col justify-between space-y-8">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#F97316] mb-6">Resultados del Análisis Financiero</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <span className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Ahorro Anual de Energía Estimado:</span>
                      <span className="text-3xl md:text-4.5xl font-black text-white block">
                        ${annualSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })} <span className="text-xs text-white/50">USD</span>
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Tiempo de Recuperación de Capital:</span>
                      <span className="text-3xl md:text-4.5xl font-black text-[#10B981] block">
                        ~{paybackMonths} <span className="text-xs text-[#10B981]/70">Meses</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-xs leading-relaxed text-white/50">
                  <span className="font-bold text-white block mb-1">Nota Metodológica:</span>
                  El cálculo asume una eficiencia energética mejorada del 15% en motores con variador de frecuencia inteligente y una reducción del 8% de desperdicio operativo usando el sistema de control autónomo SMQ.
                </div>
              </div>
            </div>
          </section>

          {/* 05. DESCARGABLES */}
          <section id="descargables" className="scroll-mt-32 space-y-12">
            <div className="flex items-center gap-4 flex-wrap justify-between border-b border-white/5 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#8B5CF6] text-xs font-black tracking-widest font-mono">05 / DOCUMENTACIÓN COMERCIAL</span>
                  <DownloadCloud size={14} className="text-[#8B5CF6]" />
                </div>
                <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight">Fichas y Catálogos Descargables</h2>
              </div>
              <p className="text-white/40 text-xs md:text-sm max-w-md">Accede a las especificaciones completas de nuestra maquinaria en formato PDF de alta resolución.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Catálogo de Maquinaria de Alimentos', size: '12.4 MB', format: 'PDF', desc: 'Líneas completas de pelado, dosificación y empaque.' },
                { title: 'Dossier Técnico de Extrusión PET', size: '8.7 MB', format: 'PDF', desc: 'Detalles operativos de peletizado y desgasificación.' },
                { title: 'Guía de Integración SCADA / IoT', size: '4.2 MB', format: 'PDF', desc: 'Manual de interconexión ethernet para control de planta.' }
              ].map((doc, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 p-6 rounded-xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 flex items-center justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20 px-2 py-0.5 rounded uppercase">{doc.format} - {doc.size}</span>
                    <h3 className="text-sm font-bold text-white leading-tight">{doc.title}</h3>
                    <p className="text-xs text-white/40">{doc.desc}</p>
                  </div>
                  <button className="p-3 bg-white/5 hover:bg-[#8B5CF6] hover:text-black rounded-lg transition-colors flex items-center justify-center">
                    <DownloadCloud size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 06. BIBLIOTECA TÉCNICA */}
          <section id="biblioteca" className="scroll-mt-32 space-y-12">
            <div className="flex items-center gap-4 flex-wrap justify-between border-b border-white/5 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#EF4444] text-xs font-black tracking-widest font-mono">06 / LITERATURA CIENTÍFICA</span>
                  <BookOpen size={14} className="text-[#EF4444]" />
                </div>
                <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight">Biblioteca Técnica y Normas</h2>
              </div>
              <p className="text-white/40 text-xs md:text-sm max-w-md">Documentación oficial de cumplimiento normativo (HACCP, FDA, CE) y manuales operativos avanzados.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Cumplimiento FDA / HACCP en Acero Inoxidable', type: 'Guía de Diseño Sanitario', ref: 'SMQ-FDA-2026', desc: 'Directrices constructivas para soldaduras pulidas en tanques y mezcladoras.' },
                { title: 'Estándares de Seguridad Eléctrica CE y UL', type: 'Directiva de Seguridad', ref: 'SMQ-CE-2025', desc: 'Manual de protección en tableros eléctricos herméticos IP66 de acero.' }
              ].map((book, idx) => (
                <div key={idx} className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl flex items-start gap-4 hover:bg-white/[0.02] transition-colors duration-300">
                  <div className="p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl">
                    <FileText size={20} />
                  </div>
                  <div className="space-y-2 flex-1">
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{book.type} | Ref: {book.ref}</span>
                    <h3 className="text-sm font-bold text-white">{book.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed">{book.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        <Footer />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
    </>
  );
};

export default Projects;
