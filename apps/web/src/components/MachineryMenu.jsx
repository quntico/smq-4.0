import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wheat, Package, Layers, Recycle, HeartPulse, Bot, ChevronRight } from 'lucide-react';
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
          { code: 'SHD', name: 'Trituración Industrial',  desc: '',  models: ['SHD-500','SHD-1000','SHD-3000'] },
          { code: 'GRN', name: 'Granulación',             desc: '',  models: ['GRN-300','GRN-600'] },
        ],
      },
      {
        name: 'Lavado',
        machines: [
          { code: 'PWS', name: 'Lavado de Plástico',    desc: '',  models: ['PWS-300','PWS-500','PWS-1000'] },
          { code: 'FLT', name: 'Flotación',             desc: '',  models: ['FLT-500','FLT-1000'] },
          { code: 'FRI', name: 'Lavado por Fricción',   desc: '',  models: ['FRI-500','FRI-1000'] },
        ],
      },
      {
        name: 'Separación',
        machines: [
          { code: 'SPR', name: 'Separación Industrial',  desc: '',  models: ['SPR-500','SPR-1000'] },
          { code: 'OPT', name: 'Clasificación Óptica',   desc: '',  models: ['OPT-300','OPT-1000'] },
        ],
      },
      {
        name: 'Peletizado',
        machines: [
          { code: 'PLT', name: 'Peletizado',    desc: '',  models: ['PLT-300','PLT-500'] },
          { code: 'BAL', name: 'Compactación',  desc: '',  models: ['BAL-500','BAL-1000'] },
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
          { code: 'MED', name: 'Conversión Sanitaria',      desc: '',  models: ['MED-100','MED-300'] },
          { code: 'MSK', name: 'Producción de Cubrebocas',  desc: '',  models: ['MSK-40','MSK-100'] },
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
          { code: 'ROB', name: 'Sistemas Robotizados',  desc: '',  models: ['ROB-5','ROB-20'] },
        ],
      },
      {
        name: 'Visión Artificial',
        machines: [
          { code: 'VIS', name: 'Sistemas de Visión',  desc: '',  models: ['VIS-100','VIS-500'] },
        ],
      },
      {
        name: 'Gemelo Digital',
        machines: [
          { code: 'DGT', name: 'Gemelo Digital',  desc: '',  models: ['DGT-100','DGT-500'] },
        ],
      },
    ],
  },
];

const MachineryMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  const [activeIndustry, setActiveIndustry] = useState('alimentos');
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
          <div className="w-[170px] shrink-0 border-r border-white/[0.07] bg-white/[0.015] flex flex-col py-4 px-2.5 gap-0.5 overflow-y-auto">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25 px-2 mb-2">
              INDUSTRIAS SMQ
            </p>
            {industriesData.map(ind => {
              const Icon = ind.Icon;
              const isAct = activeIndustry === ind.key;
              return (
                <button
                  key={ind.key}
                  onMouseEnter={() => setActiveIndustry(ind.key)}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all duration-150 border"
                  style={{
                    backgroundColor: isAct ? `${ind.color}12` : 'transparent',
                    borderColor:     isAct ? `${ind.color}30` : 'transparent',
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150"
                    style={{
                      backgroundColor: isAct ? `${ind.color}25` : 'rgba(255,255,255,0.05)',
                      color:           isAct ? ind.color : 'rgba(255,255,255,0.35)',
                    }}
                  >
                    <Icon size={14} />
                  </div>
                  <span
                    className="text-[12.5px] font-semibold transition-colors duration-150 flex-1"
                    style={{ color: isAct ? ind.color : 'rgba(255,255,255,0.6)' }}
                  >
                    {ind.title}
                  </span>
                  {isAct && (
                    <ChevronRight size={11} style={{ color: ind.color }} className="shrink-0" />
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
                className="p-6"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.07]">
                  <div
                    className="w-1 h-9 rounded-full shrink-0"
                    style={{ backgroundColor: active?.color }}
                  />
                  <div>
                    <h2
                      className="font-black text-[15px] tracking-wide"
                      style={{ color: active?.color }}
                    >
                      {active?.title}
                    </h2>
                    <p className="text-white/40 text-[11.5px] mt-0.5">{active?.desc}</p>
                  </div>
                </div>

                {/* Families grid */}
                <div
                  className="grid gap-x-7 gap-y-6"
                  style={{
                    gridTemplateColumns: active?.families.length >= 3
                      ? 'repeat(3, 1fr)'
                      : active?.families.length === 2
                        ? 'repeat(2, 1fr)'
                        : '1fr',
                  }}
                >
                  {active?.families.map(family => (
                    <div key={family.name}>
                      {/* Family label */}
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-3 h-[2px] rounded-full"
                          style={{ backgroundColor: active?.color }}
                        />
                        <span className="text-[9.5px] font-black uppercase tracking-[0.22em] text-white/35">
                          {family.name}
                        </span>
                      </div>

                      {/* Machine list */}
                      <div className="space-y-1.5">
                        {family.machines.map(machine => (
                          <Link
                            key={machine.code}
                            to={machine.route || `/maquinaria/${machine.code.toLowerCase()}`}
                            className="flex items-start gap-2.5 p-2 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/[0.04] transition-all duration-150 group"
                          >
                            {/* Code badge */}
                            <span
                              className="mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider shrink-0 font-mono"
                              style={{
                                backgroundColor: `${active?.color}18`,
                                color: active?.color,
                              }}
                            >
                              {machine.code}
                            </span>

                            {/* Name + desc + models */}
                            <div className="flex-1 min-w-0">
                              <span
                                className="block text-[12.5px] font-semibold text-white/80 group-hover:text-white transition-colors leading-snug"
                                onMouseEnter={(e) => { e.currentTarget.style.color = active?.color ?? '#fff'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
                              >
                                {machine.name}
                              </span>
                              {machine.desc && (
                                <span className="block text-[10.5px] text-white/35 leading-snug">
                                  {machine.desc}
                                </span>
                              )}
                              {/* Model pills */}
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {machine.models.map(model => (
                                  <span
                                    key={model}
                                    className="text-[9.5px] px-1.5 py-0.5 rounded border border-white/10 text-white/40 font-mono hover:border-white/25 hover:text-white/70 transition-colors"
                                  >
                                    {model}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
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
