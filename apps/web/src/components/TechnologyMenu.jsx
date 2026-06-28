import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Activity, Shield, BrainCircuit, Wifi, Factory, Zap, Recycle, ArrowRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';

const techItems = [
  {
    num: '01',
    title: 'Inteligencia Artificial',
    desc: 'ALGORITMOS DE APRENDIZAJE PROFUNDO Y OPTIMIZACIÓN DE PROCESOS PRODUCTIVOS.',
    color: '#8B5CF6',
    Icon: BrainCircuit,
    href: '/tecnologia/ia'
  },
  {
    num: '02',
    title: 'Smart Factory',
    desc: 'LÍNEAS TOTALMENTE INTERCONECTADAS CON TOMA DE DECISIONES AUTÓNOMA.',
    color: '#10B981',
    Icon: Factory,
    href: '/tecnologia/smart-factory'
  },
  {
    num: '03',
    title: 'Digital Twin',
    desc: 'REPLICACIÓN VIRTUAL Y SIMULACIÓN EN TIEMPO REAL DEL RENDIMIENTO DE PLANTA.',
    color: '#06B6D4',
    Icon: Activity,
    href: '/tecnologia/digital-twin'
  },
  {
    num: '04',
    title: 'PLC + Motion',
    desc: 'CONTROLADORES DE TIEMPO REAL Y CONTROL DE MOVIMIENTO DE EXTREMA PRECISIÓN.',
    color: '#EF4444',
    Icon: Cpu,
    href: '/tecnologia/plc-motion'
  },
  {
    num: '05',
    title: 'IIOT + Edge',
    desc: 'PROCESAMIENTO DE DATOS EN EL BORDE Y TELEMETRÍA DE ALTA SEGURIDAD.',
    color: '#3B82F6',
    Icon: Wifi,
    href: '/tecnologia/iiot-edge'
  },
  {
    num: '06',
    title: 'Energía Inteligente',
    desc: 'MONITOREO DE HUELLA DE CARBONO Y OPTIMIZACIÓN DE CONSUMO ENERGÉTICO.',
    color: '#F97316',
    Icon: Zap,
    href: '/tecnologia/energia-inteligente'
  },
  {
    num: '07',
    title: 'Plataforma SMQ OS™',
    desc: 'EL SISTEMA OPERATIVO PROPIETARIO PARA LA GESTIÓN DE PLANTAS INDUSTRIALES.',
    color: '#EAB308',
    Icon: Shield,
    href: '/tecnologia/smq-os'
  },
  {
    num: '08',
    title: 'Economía Circular',
    desc: 'VALORIZACIÓN DE RESIDUOS Y PROCESOS DE RECICLAJE SIN DESPERDICIO (ZERO WASTE).',
    color: '#14B8A6',
    Icon: Recycle,
    href: '/tecnologia/economia-circular'
  }
];

const TechnologyMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  const { cmsState } = useCMS();
  const headerHeight = cmsState?.settings?.headerHeight || 80;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -10, x: '-50%' }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed overflow-hidden rounded-b-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.8)] z-[999]"
          style={{
            left: '50%',
            top: `${headerHeight}px`,
            width: 'min(1150px, 95vw)',
            backgroundColor: 'rgba(8,11,18,0.97)',
            backdropFilter: 'blur(24px)',
            padding: '24px 28px'
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/[0.07]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FFD700] mb-1">
                INNOVACIÓN Y DESARROLLO
              </p>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Núcleo Tecnológico SMQ
              </h2>
            </div>
            {/* Opcional: un botón para ver todo */}
            <Link 
              to="/tecnologia/ia"
              className="px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 hover:text-[#FFD700] transition-colors text-white/70"
            >
              Explorar Ecosistema
            </Link>
          </div>

          {/* Grid de 7 tecnologías - 4 columnas para mejor simetría visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {techItems.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.num}
                  to={item.href}
                  className="group relative flex flex-col p-5 rounded-xl border transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    borderColor: 'rgba(255,255,255,0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${item.color}50`;
                    e.currentTarget.style.backgroundColor = `${item.color}0A`;
                    e.currentTarget.style.boxShadow = `0 10px 30px -10px ${item.color}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Top: Icon & Num */}
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="flex items-center justify-center w-8 h-8 rounded-lg border"
                      style={{ 
                        backgroundColor: `${item.color}10`,
                        borderColor: `${item.color}30`
                      }}
                    >
                      <Icon size={16} color={item.color} />
                    </div>
                    <span 
                      className="text-[13px] font-black tracking-widest font-mono"
                      style={{ color: item.color }}
                    >
                      {item.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-[13.5px] font-bold text-white mb-2 leading-tight uppercase tracking-wide group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[9.5px] text-white/40 leading-[1.6] font-semibold uppercase tracking-wider group-hover:text-white/60 transition-colors">
                      {item.desc}
                    </p>
                  </div>

                  {/* Footer interaction */}
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 opacity-50 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: item.color }}>
                      Ver Detalles
                    </span>
                    <ArrowRight size={12} color={item.color} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TechnologyMenu;
