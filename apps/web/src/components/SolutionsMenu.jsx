import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BrainCircuit, Factory, Activity, Cpu, Wifi, Zap, Shield, Recycle, ArrowRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';

const solutionsGrid = [
  {
    id: '01',
    key: 'inteligencia-artificial',
    title: 'INTELIGENCIA ARTIFICIAL',
    desc: 'Algoritmos de aprendizaje profundo y optimización de procesos productivos.',
    color: '#8B5CF6',
    borderClass: 'border-purple-500/20',
    bgClass: 'bg-purple-500/10',
    textClass: 'text-purple-500',
    Icon: BrainCircuit
  },
  {
    id: '02',
    key: 'smart-factory',
    title: 'SMART FACTORY',
    desc: 'Líneas totalmente interconectadas con toma de decisiones autónoma.',
    color: '#10B981',
    borderClass: 'border-emerald-500/20',
    bgClass: 'bg-emerald-500/10',
    textClass: 'text-emerald-500',
    Icon: Factory
  },
  {
    id: '03',
    key: 'digital-twin',
    title: 'DIGITAL TWIN',
    desc: 'Replicación virtual y simulación en tiempo real del rendimiento de planta.',
    color: '#0EA5E9',
    borderClass: 'border-sky-500/20',
    bgClass: 'bg-sky-500/10',
    textClass: 'text-sky-500',
    Icon: Activity
  },
  {
    id: '04',
    key: 'plc-motion',
    title: 'PLC + MOTION',
    desc: 'Controladores de tiempo real y control de movimiento de extrema precisión.',
    color: '#EF4444',
    borderClass: 'border-red-500/20',
    bgClass: 'bg-red-500/10',
    textClass: 'text-red-500',
    Icon: Cpu
  },
  {
    id: '05',
    key: 'iiot-edge',
    title: 'IIOT + EDGE',
    desc: 'Procesamiento de datos en el borde y telemetría de alta seguridad.',
    color: '#3B82F6',
    borderClass: 'border-blue-500/20',
    bgClass: 'bg-blue-500/10',
    textClass: 'text-blue-500',
    Icon: Wifi
  },
  {
    id: '06',
    key: 'energia-inteligente',
    title: 'ENERGÍA INTELIGENTE',
    desc: 'Monitoreo de huella de carbono y optimización de consumo energético.',
    color: '#F59E0B',
    borderClass: 'border-amber-500/20',
    bgClass: 'bg-amber-500/10',
    textClass: 'text-amber-500',
    Icon: Zap
  },
  {
    id: '07',
    key: 'smq-os',
    title: 'PLATAFORMA SMQ OS™',
    desc: 'El sistema operativo propietario para la gestión de plantas industriales.',
    color: '#EAB308',
    borderClass: 'border-yellow-500/20',
    bgClass: 'bg-yellow-500/10',
    textClass: 'text-yellow-500',
    Icon: Shield
  },
  {
    id: '08',
    key: 'economia-circular',
    title: 'ECONOMÍA CIRCULAR',
    desc: 'Soluciones para reciclaje, valorización de residuos y sostenibilidad industrial.',
    color: '#14B8A6',
    borderClass: 'border-teal-500/20',
    bgClass: 'bg-teal-500/10',
    textClass: 'text-teal-500',
    Icon: Recycle
  }
];

const SolutionsMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
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
          className="fixed overflow-hidden rounded-b-2xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.9)] z-[999]"
          style={{
            left: '50%',
            top: `${headerHeight}px`,
            width: 'min(1280px, 95vw)',
            backgroundColor: '#0A0D14',
            backdropFilter: 'blur(24px)',
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="p-6 pb-6">
            {/* Header Area */}
            <div className="flex justify-between items-start mb-5 pb-4 border-b border-white/[0.05]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#3B82F6] mb-1.5 flex gap-2">
                  <span>INNOVACIÓN</span>
                  <span className="text-white/20">•</span>
                  <span>TECNOLOGÍA</span>
                  <span className="text-white/20">•</span>
                  <span>RESULTADOS</span>
                </p>
                <h2 className="text-[26px] font-bold text-white mb-1.5 tracking-tight">Soluciones Industriales SMQ</h2>
                <p className="text-white/40 text-xs max-w-xl leading-relaxed font-medium">
                  Tecnología avanzada y sistemas integrados para optimizar cada etapa de tu proceso productivo y asegurar resultados sostenibles.
                </p>
              </div>
              <Link to="/soluciones" className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 text-white/80 hover:text-white hover:bg-white/5 transition-all text-[11px] font-black uppercase tracking-wider">
                Explorar Ecosistema <ArrowRight size={14} />
              </Link>
            </div>

            {/* Grid Area */}
            <div className="grid grid-cols-4 gap-3">
              {solutionsGrid.map((sol) => {
                const Icon = sol.Icon;
                return (
                  <Link
                    to={`/soluciones/${sol.key}`}
                    key={sol.key}
                    className="group bg-[#11141C] border border-white/[0.05] rounded-xl p-4 hover:border-white/10 hover:bg-[#161A24] hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between"
                  >
                    <div className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: sol.color }} />
                    
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${sol.borderClass} ${sol.bgClass} shadow-inner`}>
                          <Icon size={18} style={{ color: sol.color }} />
                        </div>
                        <span className="font-black text-lg opacity-[0.85] tracking-tighter" style={{ color: sol.color }}>{sol.id}</span>
                      </div>
                      <h3 className="text-[13px] font-black text-white mb-1.5 tracking-wide">{sol.title}</h3>
                      <p className="text-[11px] text-white/40 leading-relaxed mb-4 h-8 font-medium">{sol.desc}</p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider transition-all" style={{ color: sol.color }}>
                      Ver Detalles <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SolutionsMenu;
