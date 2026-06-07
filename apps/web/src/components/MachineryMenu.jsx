import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wheat, Package, Layers, Recycle, HeartPulse, Bot, ChevronRight, Flame, ArrowRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';

const industriesData = [
  {
    key: 'alimentos',
    title: 'Alimentos',
    color: '#F59E0B',
    Icon: Wheat,
    desc: 'Procesamiento, transformación, empaque y automatización alimentaria.',
    families: [
      {
        name: 'Preparación de Producto',
        machines: [
          { code: 'MIX', name: 'Sistemas de Mezclado',         desc: 'Mezcla industrial para sólidos y formulaciones.',  models: ['MIX-300','MIX-500','MIX-1000'] },
          { code: 'COK', name: 'Sistemas de Cocción',          desc: 'Procesamiento térmico continuo.',                  models: ['COK-300','COK-600','COK-1000'] },
          { code: 'BLD', name: 'Sistemas de Homogeneización',  desc: 'Mezcla uniforme y control de calidad.',            models: ['BLD-300','BLD-600'] },
        ],
      },
      {
        name: 'Lavado Alimenticio',
        machines: [
          { code: 'FWS', name: 'Lavado Alimenticio',  desc: 'Lavado y sanitización.',             models: ['FWS-300','FWS-600','FWS-1000'] },
          { code: 'DRY', name: 'Secado Industrial',   desc: 'Remoción controlada de humedad.',    models: ['DRY-300','DRY-1000'] },
        ],
      },
      {
        name: 'Procesos Especiales',
        machines: [
          { code: 'CHX', name: 'Procesamiento de Chocolate', desc: 'Líneas completas para chocolate.', models: ['CHX-300','CHX-500','CHX-1000'] },
          { code: 'SNK', name: 'Producción de Snacks',       desc: 'Extrusión y formado.',             models: ['SNK-300','SNK-600'] },
          { code: 'BAR', name: 'Producción de Barras',       desc: 'Producción continua.',             models: ['BAR-300','BAR-1000'] },
        ],
      },
    ],
  },
  {
    key: 'packaging',
    title: 'Packaging',
    color: '#FFD700',
    Icon: Package,
    desc: 'Empaque primario, secundario y automatización de empaque.',
    families: [
      {
        name: 'Envasadoras',
        machines: [
          { code: 'VFS', name: 'Envasado Vertical',    desc: 'Formado, llenado y sellado vertical.',   models: ['VFS-60','VFS-120','VFS-180'],  route: '/envasadoras?type=vertical' },
          { code: 'HFS', name: 'Flowpack Horizontal',  desc: 'Empaque horizontal alta velocidad.',     models: ['HFS-150','HFS-300'],           route: '/envasadoras?type=flowpack' },
          { code: 'RDP', name: 'Doypack Rotativa',     desc: 'Bolsas preformadas.',                   models: ['RDP-60','RDP-120','RDP-180'],  route: '/envasadoras?type=doypack' },
          { code: 'MSH', name: 'Sachet Multipista',    desc: 'Producción paralela de sobres.',        models: ['MSH-4','MSH-8','MSH-12'],      route: '/envasadoras?type=multipistas' },
          { code: 'LFD', name: 'Llenado de Líquidos',  desc: 'Dosificación automática.',              models: ['LFD-100','LFD-300'],           route: '/envasadoras?type=llenadoras' },
        ],
      },
      {
        name: 'Fin de Línea',
        machines: [
          { code: 'CSL', name: 'Encajonado',  desc: 'Agrupado automático.',    models: ['CSL-10','CSL-20'] },
          { code: 'PAL', name: 'Paletizado',  desc: 'Paletizado robotizado.',  models: ['PAL-10','PAL-30'] },
        ],
      },
    ],
  },
  {
    key: 'conversion',
    title: 'Conversión',
    color: '#06B6D4',
    Icon: Layers,
    desc: 'Transformación de plástico, papel y materiales flexibles.',
    families: [
      {
        name: 'Extrusión',
        machines: [
          { code: 'EXF', name: 'Extrusión de Película',  desc: 'Producción monocapa.',       models: ['EXF-300','EXF-500','EXF-1000'] },
          { code: 'CBL', name: 'Coextrusión Soplada',    desc: 'Película multicapa.',        models: ['CBL-3','CBL-5','CBL-7'] },
          { code: 'CCS', name: 'Coextrusión Cast',       desc: 'Película plana multicapa.',  models: ['CCS-3','CCS-5'] },
        ],
      },
      {
        name: 'Soplado',
        machines: [
          { code: 'EBM', name: 'Extrusión Soplado',  desc: 'Fabricación de envases.',  models: ['EBM-500','EBM-1000','EBM-3000'] },
          { code: 'SBM', name: 'Soplado Estirado',   desc: 'Producción PET.',          models: ['SBM-3000','SBM-6000'] },
          { code: 'IBM', name: 'Inyección Soplado',  desc: 'Piezas técnicas.',         models: ['IBM-500','IBM-1500'] },
        ],
      },
      {
        name: 'Impresión',
        machines: [
          { code: 'FLX', name: 'Impresión Flexográfica',  desc: 'Impresión industrial.',     models: ['FLX-4','FLX-6','FLX-8','FLX-10'] },
          { code: 'GRV', name: 'Rotograbado',            desc: 'Alta calidad gráfica.',     models: ['GRV-6','GRV-8'] },
          { code: 'DIG', name: 'Impresión Digital',       desc: 'Producción flexible.',      models: ['DIG-300','DIG-600'] },
        ],
      },
      {
        name: 'Laminación y Conversión',
        machines: [
          { code: 'LAM', name: 'Laminación',          desc: 'Solvente y solventless.',  models: ['LAM-300','LAM-500'] },
          { code: 'SLT', name: 'Corte y Rebobinado',  desc: 'Conversión final.',        models: ['SLT-300','SLT-600'] },
          { code: 'THF', name: 'Termoformado',        desc: 'Conformado térmico.',      models: ['THF-60','THF-120'] },
        ],
      },
    ],
  },
  {
    key: 'reciclaje',
    title: 'Reciclaje',
    color: '#10B981',
    Icon: Recycle,
    desc: 'Recuperación, separación y valorización de materiales.',
    families: [
      {
        name: 'Trituración',
        machines: [
          { code: 'SHD', name: 'Trituración Industrial',  desc: 'Reducción y trituración primaria de alta capacidad.',  models: ['SHD-500','SHD-1000','SHD-3000'] },
          { code: 'GRN', name: 'Granulación',             desc: 'Molienda fina y granulado uniforme de termoplásticos.',  models: ['GRN-300','GRN-600'] },
        ],
      },
      {
        name: 'Lavado',
        machines: [
          { code: 'PWS', name: 'Lavado de Plástico',    desc: 'Lavado y sanitización intensiva de polímeros.',  models: ['PWS-300','PWS-500','PWS-1000'] },
          { code: 'FLT', name: 'Flotación',             desc: 'Separación densimétrica automática en tinas húmedas.',  models: ['FLT-500','FLT-1000'] },
          { code: 'FRI', name: 'Lavado por Fricción',   desc: 'Limpieza mecánica por centrífugas de fricción.',  models: ['FRI-500','FRI-1000'] },
        ],
      },
      {
        name: 'Separación',
        machines: [
          { code: 'SPR', name: 'Separación Industrial',  desc: 'Clasificación mecánica por peso, tamaño y geometría.',  models: ['SPR-500','SPR-1000'] },
          { code: 'OPT', name: 'Clasificación Óptica',   desc: 'Separación automática por NIR e inducción de alta precisión.',  models: ['OPT-300','OPT-1000'] },
        ],
      },
      {
        name: 'Peletizado',
        machines: [
          { code: 'PLT', name: 'Peletizado',    desc: 'Extrusión y peletizado para recuperación de resina.',  models: ['PLT-300','PLT-500'] },
          { code: 'BAL', name: 'Compactación',  desc: 'Prensas hidráulicas de compactación de pacas.',  models: ['BAL-500','BAL-1000'] },
        ],
      },
    ],
  },

  {
    key: 'medica',
    title: 'Médica',
    color: '#EF4444',
    Icon: HeartPulse,
    desc: 'Conversión sanitaria y manufactura médica.',
    families: [
      {
        name: 'Conversión Médica',
        machines: [
          { code: 'MED', name: 'Conversión Sanitaria',      desc: 'Líneas sanitarias para gasas, vendas y apósitos.',  models: ['MED-100','MED-300'] },
          { code: 'MSK', name: 'Producción de Cubrebocas',  desc: 'Líneas automatizadas para mascarillas quirúrgicas.',  models: ['MSK-40','MSK-100'] },
        ],
      },
    ],
  },
  {
    key: 'automatizacion',
    title: 'Automatización',
    color: '#8B5CF6',
    Icon: Bot,
    desc: 'Tecnología industrial avanzada.',
    families: [
      {
        name: 'Robótica',
        machines: [
          { code: 'ROB', name: 'Sistemas Robotizados',  desc: 'Brazos robóticos y celdas integradas de manipulación.',  models: ['ROB-5','ROB-20'] },
        ],
      },
      {
        name: 'Visión Artificial',
        machines: [
          { code: 'VIS', name: 'Sistemas de Visión',  desc: 'Cámaras de inspección y control de calidad óptico.',  models: ['VIS-100','VIS-500'] },
        ],
      },
      {
        name: 'Gemelo Digital',
        machines: [
          { code: 'DGT', name: 'Gemelo Digital',  desc: 'Simulación y monitoreo virtual de plantas en tiempo real.',  models: ['DGT-100','DGT-500'] },
        ],
      },
    ],
  },
];



const MachineryMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  const [activeIndustry, setActiveIndustry] = useState('reciclaje');
  const { cmsState } = useCMS();
  const headerHeight = cmsState?.settings?.headerHeight || 80;
  const active = industriesData.find(i => i.key === activeIndustry);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -10, x: '-50%' }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed flex overflow-hidden rounded-b-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.7)] z-[999]"
          style={{
            left: '50%',
            top: `${headerHeight}px`,
            width: 'min(1240px, 96vw)',
            maxHeight: '76vh',
            backgroundColor: 'rgba(8,11,18,0.97)',
            backdropFilter: 'blur(24px)',
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* ── LEFT: Industry Selector ── */}
          <div className="w-[220px] shrink-0 border-r border-white/[0.07] bg-white/[0.015] flex flex-col py-5 px-3 gap-1 overflow-y-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/20 px-2.5 mb-3">
              INDUSTRIAS SMQ
            </p>
            {industriesData.map(ind => {
              const Icon = ind.Icon;
              const isAct = activeIndustry === ind.key;
              return (
                <button
                  key={ind.key}
                  onMouseEnter={() => setActiveIndustry(ind.key)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 border"
                  style={{
                    backgroundColor: isAct ? `${ind.color}12` : 'transparent',
                    borderColor:     isAct ? `${ind.color}35` : 'transparent',
                    boxShadow:       isAct ? `0 0 15px ${ind.color}10` : 'none',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 border"
                    style={{
                      backgroundColor: isAct ? `${ind.color}25` : 'rgba(255,255,255,0.03)',
                      color:           isAct ? ind.color : 'rgba(255,255,255,0.35)',
                      borderColor:     isAct ? `${ind.color}40` : 'rgba(255,255,255,0.05)'
                    }}
                  >
                    <Icon size={15} />
                  </div>
                  <span
                    className="text-[13.5px] font-bold tracking-wide transition-colors duration-200 flex-1"
                    style={{ color: isAct ? ind.color : 'rgba(255,255,255,0.55)' }}
                  >
                    {ind.title}
                  </span>
                  {isAct && (
                    <ChevronRight size={12} style={{ color: ind.color }} className="shrink-0 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── RIGHT: Families + Machines ── */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.13 }}
                className="p-8"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.07]">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-1" style={{ color: active?.color }}>
                      CATEGORÍA MAQUINARIA
                    </p>
                    <h2 className="text-xl font-black text-white tracking-wide uppercase">
                      Equipos de {active?.title}
                    </h2>
                  </div>
                </div>

                {/* Grid de máquinas estilo Waste to Energy */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {active?.families.flatMap(family => family.machines).map((machine, index) => {
                    const formattedNum = String(index + 1).padStart(2, '0');

                    return (
                      <Link
                        key={machine.code}
                        to={machine.route || `/maquinaria/${machine.code.toLowerCase()}`}
                        className="group relative flex flex-col p-5 rounded-xl border bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 shadow-lg"
                        style={{
                          borderColor: 'rgba(255, 255, 255, 0.05)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `${active?.color}50`;
                          e.currentTarget.style.backgroundColor = `${active?.color}0A`;
                          e.currentTarget.style.boxShadow = `0 10px 30px -10px ${active?.color}25`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.01)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {/* Top: Code Box & Num */}
                        <div className="flex items-center justify-between mb-4">
                          <div 
                            className="flex items-center justify-center w-8 h-8 rounded-lg border font-mono font-black text-[11px] tracking-wider"
                            style={{ 
                              backgroundColor: `${active?.color}15`,
                              borderColor: `${active?.color}30`,
                              color: active?.color
                            }}
                          >
                            {machine.code}
                          </div>
                          <span 
                            className="text-[13px] font-black tracking-widest font-mono"
                            style={{ color: active?.color }}
                          >
                            {formattedNum}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-[13.5px] font-bold text-white mb-2 leading-tight uppercase tracking-wide group-hover:text-white transition-colors">
                            {machine.name}
                          </h3>
                          <p className="text-[9.5px] text-white/40 leading-[1.6] font-semibold uppercase tracking-wider group-hover:text-white/60 transition-colors">
                            {machine.desc}
                          </p>
                        </div>

                        {/* Footer interaction */}
                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 opacity-50 group-hover:opacity-100 transition-opacity">
                          <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: active?.color }}>
                            Ver Detalles
                          </span>
                          <ArrowRight size={12} style={{ color: active?.color }} className="transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MachineryMenu;
