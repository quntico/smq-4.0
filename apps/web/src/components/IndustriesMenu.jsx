import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wheat, Package, Layers, Recycle, HeartPulse, Bot, ChevronRight, HardHat, Zap } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';

const industriesData = [
  {
    key: 'reciclaje',
    title: 'Reciclaje',
    color: '#10B981',
    Icon: Recycle,
    desc: 'Tecnología líder para la economía circular y recuperación de plásticos.',
    families: [
      {
        name: 'Sistemas de Recuperación',
        links: [
          { code: 'EXT', name: 'Líneas de Extrusión', desc: 'Monohusillo y doble husillo.', href: '/industria/reciclaje-y-plasticos#extrusion' },
          { code: 'PEL', name: 'Sistemas de Pelletizado', desc: 'Corte bajo agua y anillo.', href: '/industria/reciclaje-y-plasticos#pelletizado' },
          { code: 'WSH', name: 'Lavado y Secado', desc: 'Separación por densidad.', href: '/industria/reciclaje-y-plasticos#lavado' },
        ],
      }
    ],
  },
  {
    key: 'alimentos',
    title: 'Alimentos',
    color: '#F59E0B',
    Icon: Wheat,
    desc: 'Higiene óptima, precisión y control absoluto (Grado Alimentario).',
    families: [
      {
        name: 'Procesamiento Alimentario',
        links: [
          { code: 'CHX', name: 'Procesamiento de Chocolate', desc: 'Templadoras y tanques.', href: '/industria/alimentos#chocolate' },
          { code: 'CNF', name: 'Cocción y Confitería', desc: 'Caramelos duros y suaves.', href: '/industria/alimentos#confiteria' },
          { code: 'MIX', name: 'Molienda e Ingredientes', desc: 'Mezcladores y dosificadores.', href: '/industria/alimentos#ingredientes' },
        ],
      }
    ],
  },
  {
    key: 'packaging',
    title: 'Packaging',
    color: '#FFD700',
    Icon: Package,
    desc: 'Velocidad y hermeticidad de empaque garantizada.',
    families: [
      {
        name: 'Sistemas de Envasado',
        links: [
          { code: 'FLX', name: 'Empaques Flexibles', desc: 'Envasadoras Doypack y VFFS.', href: '/industria/packaging#empaques-flexibles' },
          { code: 'RGD', name: 'Empaques Rígidos', desc: 'Líneas de llenado rotativo.', href: '/industria/packaging#empaques-rigidos' },
          { code: 'LBL', name: 'Etiquetado Automático', desc: 'Aplicadores alta velocidad.', href: '/industria/packaging#etiquetado' },
        ],
      }
    ],
  },
  {
    key: 'construccion',
    title: 'Construcción',
    color: '#06B6D4',
    Icon: HardHat,
    desc: 'Robustez y consistencia para procesos de alta exigencia.',
    families: [
      {
        name: 'Materiales y Procesamiento',
        links: [
          { code: 'WPC', name: 'Materiales Compuestos', desc: 'Extrusoras de madera plástica.', href: '/industria/construccion#materiales-compuestos' },
          { code: 'AGG', name: 'Agregados Reciclados', desc: 'Trituradoras y molinos.', href: '/industria/construccion#materiales-reciclados' },
        ],
      }
    ],
  },
  {
    key: 'agroindustria',
    title: 'Agroindustria',
    color: '#8B5CF6',
    Icon: Zap,
    desc: 'Rendimiento en el campo y la planta de procesamiento.',
    families: [
      {
        name: 'Sistemas Agrícolas',
        links: [
          { code: 'AGR', name: 'Procesamiento Agrícola', desc: 'Limpieza y manejo de granos.', href: '/industria/agroindustria#procesamiento-agricola' },
          { code: 'FDB', name: 'Alimentos Balanceados', desc: 'Molienda y peletizado.', href: '/industria/agroindustria#alimentos-balanceados' },
        ],
      }
    ],
  },
];

const IndustriesMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
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
          <div className="w-[170px] shrink-0 border-r border-white/[0.07] bg-white/[0.015] flex flex-col py-4 px-2.5 gap-0.5 overflow-y-auto scrollbar-none">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25 px-2 mb-2">
              SECTORES SMQ
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

          {/* ── RIGHT: Families + Links ── */}
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
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.07]">
                  <div className="flex items-center gap-3">
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
                  {/* Link to main industry page */}
                  <Link 
                    to={`/industria/${activeIndustry === 'reciclaje' ? 'reciclaje-y-plasticos' : activeIndustry}`}
                    className="px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 transition-colors"
                    style={{ color: active?.color }}
                  >
                    Ver Sector Completo
                  </Link>
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

                      {/* Links list */}
                      <div className="space-y-1.5">
                        {family.links.map(link => (
                          <Link
                            key={link.href}
                            to={link.href}
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
                              {link.code}
                            </span>

                            {/* Name + desc */}
                            <div className="flex-1 min-w-0">
                              <span
                                className="block text-[12.5px] font-semibold text-white/80 group-hover:text-white transition-colors leading-snug"
                                onMouseEnter={(e) => { e.currentTarget.style.color = active?.color ?? '#fff'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
                              >
                                {link.name}
                              </span>
                              {link.desc && (
                                <span className="block text-[10.5px] text-white/35 leading-snug">
                                  {link.desc}
                                </span>
                              )}
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

export default IndustriesMenu;
