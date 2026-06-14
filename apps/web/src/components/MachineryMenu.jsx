import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wheat, Package, Layers, Recycle, Bot, ChevronRight, Flame, ArrowRight, Eye, Factory } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';

const industriesData = [
  {
    key: 'alimentos',
    title: 'Alimentos y Bebidas',
    color: '#F97316',
    Icon: Wheat,
    desc: 'Maquinaria de grado alimentario para lavado, producción, empaque y separación.',
    families: [
      {
        name: '01 Lavado y Pelado',
        machines: [
          { code: 'LWF', name: 'LWF-500', desc: 'Línea de Lavado y Secado', route: '/maquinaria/alimentos-lwf-500' },
          { code: 'LWV', name: 'LWV-500', desc: 'Línea de Lavado y Corte', route: '/maquinaria/alimentos-lwv-500' },
          { code: 'LWL', name: 'LWL-500', desc: 'Línea de Lavado de Hojas', route: '/maquinaria/alimentos-lwl-500' },
          { code: 'LBW', name: 'LBW-500', desc: 'Tina de Lavado Burbujas', route: '/maquinaria/alimentos-lbw-500' },
          { code: 'GPL', name: 'GPL-300', desc: 'Peladora de Ajos', route: '/maquinaria/alimentos-gpl-300' }
        ]
      },
      {
        name: '02 Producción de Alimentos',
        machines: [
          { code: 'LPC', name: 'LPC-500', desc: 'Línea de Producción de Papas Fritas', route: '/maquinaria/alimentos-lpc-500' },
          { code: 'LCH', name: 'LCH-500', desc: 'Línea de Producción Chocolate en Polvo', route: '/maquinaria/alimentos-lch-500' },
          { code: 'LMC', name: 'LMC-100', desc: 'Línea de Producción de Pastas LMC-100', route: '/maquinaria/alimentos-lmc-100' },
          { code: 'LMC2', name: 'LMC-200', desc: 'Línea de Producción de Pastas LMC-200', route: '/maquinaria/alimentos-lmc-200' },
          { code: 'LFC', name: 'LFC-300', desc: 'Línea de Producción de Frutas Congeladas', route: '/maquinaria/alimentos-lfc-300' },
          { code: 'LCB', name: 'LCB-300', desc: 'Línea de Producción de Barras de Cereal', route: '/maquinaria/alimentos-lcb-300' },
          { code: 'LSN', name: 'LSN-250', desc: 'Línea de Snacks Inflados', route: '/maquinaria/alimentos-lsn-250' },
          { code: 'LPT', name: 'LPT-250', desc: 'Línea de Alimento para Mascotas', route: '/maquinaria/alimentos-lpt-250' }
        ]
      },
      {
        name: '03 Empaquetado y Llenado',
        machines: [
          { code: 'PKB', name: 'PKB-70', desc: 'Línea de Empaquetado y Llenado', route: '/maquinaria/alimentos-pkb-70' },
          { code: 'PKW', name: 'PKW-130', desc: 'Línea de Empaquetado Polvos', route: '/maquinaria/alimentos-pkw-130' },
          { code: 'PCP', name: 'PCP-40', desc: 'Llenado y Empaquetado Pouch', route: '/maquinaria/alimentos-pcp-40' },
          { code: 'PCT', name: 'PCT-80', desc: 'Empaquetado de Cartón', route: '/maquinaria/alimentos-pct-80' },
          { code: 'PBK', name: 'PBK-60', desc: 'Llenado y Empaquetado', route: '/maquinaria/alimentos-pbk-60' },
          { code: 'BTL', name: 'BTL-200', desc: 'Etiquetado Double Side', route: '/maquinaria/alimentos-btl-200' }
        ]
      },
      {
        name: '04 Sistemas de Separación',
        machines: [
          { code: 'CS', name: 'CS-500', desc: 'Separadora por Color', route: '/maquinaria/alimentos-cs-500' },
          { code: 'TS', name: 'TS-1000', desc: 'Separadora por Tamaño', route: '/maquinaria/alimentos-ts-1000' },
          { code: 'WS', name: 'WS-500', desc: 'Separadora por Peso', route: '/maquinaria/alimentos-ws-500' }
        ]
      }
    ]
  },
  {
    key: 'preparacion',
    title: 'Preparación',
    color: '#06B6D4',
    Icon: Layers,
    desc: 'Sistemas primarios de acondicionamiento y preparación de materia prima.',
    families: [
      {
        name: 'Equipamiento',
        machines: [
          { code: 'MIX', name: 'Mezclado', desc: 'Mezcladores de polvos, pastas y sólidos.', models: ['MIX-300', 'MIX-600', 'MIX-1000'] },
          { code: 'LAV', name: 'Lavado', desc: 'Sistemas de lavado por fricción y burbujas.', models: ['LWF-500', 'LBW-500'] },
          { code: 'SEC', name: 'Secado', desc: 'Secadores centrífugos e industriales térmicos.', models: ['DRY-300', 'DRY-1000'] },
          { code: 'COC', name: 'Cocción', desc: 'Sistemas térmicos continuos y marmitas de proceso.', models: ['COK-300', 'COK-600'] },
          { code: 'DOS', name: 'Dosificación', desc: 'Dosificadores gravimétricos y volumétricos.', models: ['DOS-10', 'DOS-50'] }
        ]
      }
    ]
  },
  {
    key: 'reciclaje',
    title: 'Reciclaje',
    color: '#84CC16',
    Icon: Recycle,
    desc: 'Sistemas avanzados para reducción, valorización, lavado y extrusión de polímeros.',
    families: [
      {
        name: 'Equipamiento',
        machines: [
          { code: 'MOL', name: 'Molinos', desc: 'Molinos de alta velocidad para molienda de termoplásticos rígidos and films.', route: '/maquinaria/reciclaje-molinos' },
          { code: 'TRT', name: 'Trituradoras', desc: 'Trituradores industriales de mono-eje y doble-eje para purgas y pacas.', route: '/maquinaria/reciclaje-trituradoras' },
          { code: 'PEL', name: 'Peletizadoras', desc: 'Sistemas de peletizado en cascada y corte al anillo para plástico reciclado.', route: '/maquinaria/reciclaje-peletizadoras' },
          { code: 'LAV', name: 'Líneas de Lavado', desc: 'Plantas integradas de pre-lavado, molienda húmeda e higienización.', route: '/maquinaria/reciclaje-lineas-de-lavado' },
          { code: 'DES', name: 'Desetiquetadoras', desc: 'Sistemas de remoción de etiquetas por fricción para botellas PET.', route: '/maquinaria/reciclaje-desetiquetadoras' },
          { code: 'SEC', name: 'Sistemas de Secado', desc: 'Secadoras mecánicas horizontales, centrífugas y squeezers.', route: '/maquinaria/reciclaje-sistemas-de-secado' },
          { code: 'SEP', name: 'Sistemas de Separación', desc: 'Clasificación óptica por color, tipo de polímero y Eddy Current.', route: '/maquinaria/reciclaje-sistemas-de-separacion' },
          { code: 'CRI', name: 'Cristalizadoras', desc: 'Cristalización IRD infrarroja continua para hojuelas de PET.', route: '/maquinaria/reciclaje-cristalizadoras' }
        ]
      }
    ]
  },
  {
    key: 'procesamiento',
    title: 'Procesamiento',
    color: '#F59E0B',
    Icon: Flame,
    desc: 'Maquinaria de transformación, extrusión y moldeo industrial.',
    families: [
      {
        name: 'Equipamiento',
        machines: [
          { code: 'EXT', name: 'Extrusión', desc: 'Extrusoras de un solo husillo y doble husillo.', models: ['EXF-300', 'CBL-3', 'CCS-3'] },
          { code: 'CNV', name: 'Conversión', desc: 'Sistemas de corte, embobinado y termoformado.', models: ['SLT-300', 'THF-60'] },
          { code: 'MLD', name: 'Moldeo', desc: 'Sopladoras de envases y máquinas de inyección.', models: ['EBM-500', 'SBM-3000'] },
          { code: 'TRT', name: 'Trituración', desc: 'Trituradoras primarias de alta resistencia.', models: ['SHD-500', 'GRN-300'] },
          { code: 'PEL', name: 'Pelletizado', desc: 'Sistemas de corte al anillo y bajo agua.', models: ['PEL-300', 'PLT-300'] }
        ]
      }
    ]
  },
  {
    key: 'separacion',
    title: 'Separación',
    color: '#84CC16',
    Icon: Eye,
    desc: 'Clasificación inteligente y separación de alta precisión.',
    families: [
      {
        name: 'Equipamiento',
        machines: [
          { code: 'OPT', name: 'Óptica', desc: 'Clasificadoras ópticas por color y NIR.', models: ['OPT-300', 'OPT-1000'] },
          { code: 'MAG', name: 'Magnética', desc: 'Separadores de metales ferrosos y no ferrosos.', models: ['CS-300', 'TS-400'] },
          { code: 'CLS', name: 'Clasificación', desc: 'Cribas y clasificadores mecánicos.', models: ['WS-500'] },
          { code: 'REC', name: 'Recuperación', desc: 'Módulos densimétricos de flotación.', models: ['FLT-500', 'FRI-500'] }
        ]
      }
    ]
  },
  {
    key: 'empaque',
    title: 'Empaque',
    color: '#FFD700',
    Icon: Package,
    desc: 'Sistemas integrados de envasado primario y secundario.',
    families: [
      {
        name: 'Equipamiento',
        machines: [
          { code: 'VRT', name: 'Vertical', desc: 'Envasadoras verticales formadoras y llenadoras.', models: ['VFS-60', 'VFS-120'] },
          { code: 'FLW', name: 'Flowpack', desc: 'Envasadoras flowpack horizontales rápidas.', models: ['HFS-150', 'HFS-300'] },
          { code: 'DYP', name: 'Doypack', desc: 'Llenadoras rotativas de bolsas preformadas.', models: ['RDP-60', 'RDP-120'] },
          { code: 'SCH', name: 'Sachet', desc: 'Envasadoras multipistas de sobres compactos.', models: ['MSH-4', 'MSH-8'] },
          { code: 'FIN', name: 'Fin de Línea', desc: 'Sistemas de encartonado y paletizado automático.', models: ['CSL-10', 'PAL-10'] }
        ]
      }
    ]
  },
  {
    key: 'automatizacion',
    title: 'Automatización',
    color: '#8B5CF6',
    Icon: Bot,
    desc: 'Tecnología e inteligencia digital para control de líneas.',
    families: [
      {
        name: 'Equipamiento',
        machines: [
          { code: 'ROB', name: 'Robótica', desc: 'Celdas robotizadas de manipulación y empaque.', models: ['ROB-5', 'ROB-20'] },
          { code: 'VIS', name: 'Visión Artificial', desc: 'Cámaras de inspección y control óptico en línea.', models: ['VIS-100', 'VIS-500'] },
          { code: 'GEM', name: 'Gemelo Digital', desc: 'Monitoreo y simulación 3D en tiempo real.', models: ['DGT-100', 'DGT-500'] }
        ]
      }
    ]
  },
  {
    key: 'plantas-completas',
    title: 'Plantas Completas',
    color: '#EF4444',
    Icon: Factory,
    desc: 'Líneas industriales integradas listas para operar.',
    families: [
      {
        name: 'Equipamiento',
        machines: [
          { code: 'INT', name: 'Integradas', desc: 'Plantas completas con control centralizado SCADA.', models: ['LPC-500', 'LCH-500', 'LMC-100'] },
          { code: 'MOD', name: 'Modulares', desc: 'Sistemas pre-ensamblados en contenedores/skids.', models: ['BTL-200', 'PKB-70'] }
        ]
      }
    ]
  }
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
          <div className="w-[220px] shrink-0 border-r border-white/[0.07] bg-white/[0.015] flex flex-col py-5 px-3 gap-1 overflow-y-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/20 px-2.5 mb-3">
              CATÁLOGO GLOBAL
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

                {/* Grid de familias y máquinas */}
                <div className="space-y-6">
                  {active?.families.map((family, fIdx) => (
                    <div key={fIdx} className="space-y-3">
                      {active?.families.length > 1 && (
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 border-l border-white/20 pl-2">
                          {family.name}
                        </h3>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {family.machines.map((machine, index) => {
                          const formattedNum = String(index + 1).padStart(2, '0');
                          return (
                            <Link
                              key={machine.code}
                              to={machine.route || `/maquinaria/${machine.code.toLowerCase()}`}
                              className="group relative flex flex-col p-4 rounded-xl border bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 shadow-lg"
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
                              <div className="flex items-center justify-between mb-3">
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
                                  className="text-[12px] font-black tracking-widest font-mono"
                                  style={{ color: active?.color }}
                                >
                                  {formattedNum}
                                </span>
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <h3 className="text-[13px] font-bold text-white mb-1 leading-tight uppercase tracking-wide group-hover:text-white transition-colors">
                                  {machine.name}
                                </h3>
                                <p className="text-[9.5px] text-white/40 leading-[1.5] font-semibold uppercase tracking-wider group-hover:text-white/60 transition-colors">
                                  {machine.desc}
                                </p>
                              </div>

                              {/* Footer interaction */}
                              <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5 opacity-50 group-hover:opacity-100 transition-opacity">
                                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: active?.color }}>
                                  Ver Detalles
                                </span>
                                <ArrowRight size={12} style={{ color: active?.color }} className="transform group-hover:translate-x-1 transition-transform" />
                              </div>
                            </Link>
                          );
                        })}
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
