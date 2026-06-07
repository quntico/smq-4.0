import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Factory, Layers, Cpu, ChevronRight, ArrowRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';

const solutionsData = [
  {
    key: 'llave-en-mano',
    title: 'Plantas Llave en Mano',
    color: '#F59E0B',
    Icon: Factory,
    desc: 'Diseño, fabricación y puesta en marcha de plantas industriales completas.',
    families: [
      {
        name: 'Procesamiento Industrial',
        links: [
          { code: 'REC', name: 'Plantas de Reciclaje', desc: 'Instalaciones completas para valorización.', href: '/solucion/plantas-reciclaje' },
          { code: 'EXT', name: 'Plantas de Extrusión', desc: 'Líneas de alta capacidad de producción.', href: '/solucion/plantas-extrusion' },
        ],
      },
      {
        name: 'Sector Alimentario',
        links: [
          { code: 'FOD', name: 'Plantas de Alimentos', desc: 'Sistemas con normatividad sanitaria estricta.', href: '/solucion/plantas-alimentos' },
        ],
      }
    ],
  },
  {
    key: 'sistemas-integrados',
    title: 'Sistemas Integrados',
    color: '#06B6D4',
    Icon: Layers,
    desc: 'Integración tecnológica para maximizar la eficiencia productiva.',
    families: [
      {
        name: 'Líneas de Empaque',
        links: [
          { code: 'PKG', name: 'Sistemas de Packaging', desc: 'Envasado, encartonado y paletizado automático.', href: '/solucion/sistemas-packaging' },
        ],
      },
      {
        name: 'Tecnología de Control',
        links: [
          { code: 'AUT', name: 'Automatización Industrial', desc: 'Robótica, PLCs y control de procesos.', href: '/solucion/automatizacion' },
        ],
      }
    ],
  },
  {
    key: 'ingenieria',
    title: 'Ingeniería Avanzada',
    color: '#8B5CF6',
    Icon: Cpu,
    desc: 'Servicios especializados de consultoría, diseño y mejora continua.',
    families: [
      {
        name: 'Consultoría y Diseño',
        links: [
          { code: 'ENG', name: 'Ingeniería de Procesos', desc: 'Optimización y diseño de layouts industriales.', href: '/solucion/ingenieria' },
        ],
      }
    ],
  },
];

const SolutionsMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  const [activeSolution, setActiveSolution] = useState('llave-en-mano');
  const { cmsState } = useCMS();
  const headerHeight = cmsState?.settings?.headerHeight || 80;
  const active = solutionsData.find(i => i.key === activeSolution);

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
            width: 'min(980px, 90vw)',
            maxHeight: '76vh',
            backgroundColor: 'rgba(8,11,18,0.97)',
            backdropFilter: 'blur(24px)',
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* ── LEFT: Solution Category Selector ── */}
          <div className="w-[210px] shrink-0 border-r border-white/[0.07] bg-white/[0.015] flex flex-col py-5 px-3 gap-1 overflow-y-auto scrollbar-none">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/20 px-2.5 mb-3">
              PORTAFOLIO DE SOLUCIONES
            </p>
            {solutionsData.map(sol => {
              const Icon = sol.Icon;
              const isAct = activeSolution === sol.key;
              return (
                <button
                  key={sol.key}
                  onMouseEnter={() => setActiveSolution(sol.key)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 border"
                  style={{
                    backgroundColor: isAct ? `${sol.color}12` : 'transparent',
                    borderColor:     isAct ? `${sol.color}35` : 'transparent',
                    boxShadow:       isAct ? `0 0 15px ${sol.color}10` : 'none',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 border"
                    style={{
                      backgroundColor: isAct ? `${sol.color}25` : 'rgba(255,255,255,0.03)',
                      color:           isAct ? sol.color : 'rgba(255,255,255,0.35)',
                      borderColor:     isAct ? `${sol.color}40` : 'rgba(255,255,255,0.05)'
                    }}
                  >
                    <Icon size={15} />
                  </div>
                  <span
                    className="text-[13px] font-bold tracking-wide transition-colors duration-200 flex-1 leading-tight"
                    style={{ color: isAct ? sol.color : 'rgba(255,255,255,0.55)' }}
                  >
                    {sol.title}
                  </span>
                  {isAct && (
                    <ChevronRight size={12} style={{ color: sol.color }} className="shrink-0 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── RIGHT: Families + Links ── */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSolution}
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
                      PORTAFOLIO TECNOLÓGICO
                    </p>
                    <h2 className="text-xl font-black text-white tracking-wide uppercase">
                      Soluciones de {active?.title}
                    </h2>
                  </div>
                </div>

                {/* Grid de soluciones estilo Waste to Energy */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {active?.families.flatMap(family => family.links).map((link, index) => {
                    const formattedNum = String(index + 1).padStart(2, '0');

                    return (
                      <Link
                        key={link.href}
                        to={link.href}
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
                            {link.code}
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
                            {link.name}
                          </h3>
                          <p className="text-[9.5px] text-white/40 leading-[1.6] font-semibold uppercase tracking-wider group-hover:text-white/60 transition-colors">
                            {link.desc}
                          </p>
                        </div>

                        {/* Footer interaction */}
                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 opacity-50 group-hover:opacity-100 transition-opacity">
                          <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: active?.color }}>
                            Ver Solución
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

export default SolutionsMenu;
