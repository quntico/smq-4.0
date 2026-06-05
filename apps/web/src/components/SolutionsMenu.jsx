import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Factory, Layers, Cpu, ChevronRight } from 'lucide-react';
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
          <div className="w-[190px] shrink-0 border-r border-white/[0.07] bg-white/[0.015] flex flex-col py-4 px-2.5 gap-0.5 overflow-y-auto scrollbar-none">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25 px-2 mb-2">
              PORTAFOLIO DE SOLUCIONES
            </p>
            {solutionsData.map(sol => {
              const Icon = sol.Icon;
              const isAct = activeSolution === sol.key;
              return (
                <button
                  key={sol.key}
                  onMouseEnter={() => setActiveSolution(sol.key)}
                  className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-left transition-all duration-150 border"
                  style={{
                    backgroundColor: isAct ? `${sol.color}12` : 'transparent',
                    borderColor:     isAct ? `${sol.color}30` : 'transparent',
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150"
                    style={{
                      backgroundColor: isAct ? `${sol.color}25` : 'rgba(255,255,255,0.05)',
                      color:           isAct ? sol.color : 'rgba(255,255,255,0.35)',
                    }}
                  >
                    <Icon size={14} />
                  </div>
                  <span
                    className="text-[12.5px] font-semibold transition-colors duration-150 flex-1 leading-tight"
                    style={{ color: isAct ? sol.color : 'rgba(255,255,255,0.6)' }}
                  >
                    {sol.title}
                  </span>
                  {isAct && (
                    <ChevronRight size={11} style={{ color: sol.color }} className="shrink-0" />
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
                className="p-7"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.07]">
                  <div
                    className="w-1 h-9 rounded-full shrink-0"
                    style={{ backgroundColor: active?.color }}
                  />
                  <div>
                    <h2
                      className="font-black text-[16px] tracking-wide"
                      style={{ color: active?.color }}
                    >
                      {active?.title}
                    </h2>
                    <p className="text-white/40 text-[12px] mt-0.5">{active?.desc}</p>
                  </div>
                </div>

                {/* Families grid */}
                <div
                  className="grid gap-x-8 gap-y-7"
                  style={{
                    gridTemplateColumns: active?.families.length >= 2
                      ? 'repeat(2, 1fr)'
                      : '1fr',
                  }}
                >
                  {active?.families.map(family => (
                    <div key={family.name}>
                      {/* Family label */}
                      <div className="flex items-center gap-2 mb-3.5">
                        <div
                          className="w-3 h-[2px] rounded-full"
                          style={{ backgroundColor: active?.color }}
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">
                          {family.name}
                        </span>
                      </div>

                      {/* Links list */}
                      <div className="space-y-2">
                        {family.links.map(link => (
                          <Link
                            key={link.href}
                            to={link.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.04] transition-all duration-150 group"
                          >
                            {/* Code badge */}
                            <span
                              className="mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-black tracking-wider shrink-0 font-mono"
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
                                className="block text-[13px] font-bold text-white/80 group-hover:text-white transition-colors leading-snug"
                                onMouseEnter={(e) => { e.currentTarget.style.color = active?.color ?? '#fff'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
                              >
                                {link.name}
                              </span>
                              {link.desc && (
                                <span className="block text-[11px] text-white/40 leading-snug mt-0.5">
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

export default SolutionsMenu;
