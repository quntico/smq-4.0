import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wheat, Package, Layers, Recycle, HeartPulse, Bot, ChevronRight, HardHat, Zap, ArrowRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';

const industriesData = [
  {
    key: 'alimentos',
    title: 'Alimentos y Bebidas',
    color: '#F59E0B',
    Icon: Wheat,
    desc: 'Higiene óptima, precisión y control absoluto (Grado Alimentario y Orgánico).',
    families: [
      {
        name: 'Categorías',
        links: [
          { code: 'PRO', name: 'Procesamiento', desc: 'Sistemas térmicos y preparación mecánica.', href: '/industrias/alimentos#procesamiento' },
          { code: 'CON', name: 'Producción Continua', desc: 'Líneas automatizadas de flujo continuo.', href: '/industrias/alimentos#produccion' },
          { code: 'PKG', name: 'Empaque', desc: 'Envasado y embalaje de alta velocidad.', href: '/industrias/alimentos#empaque' },
          { code: 'ING', name: 'Ingredientes', desc: 'Dosificación, mezcla y formulación precisa.', href: '/industrias/alimentos#ingredientes' },
          { code: 'PLN', name: 'Plantas Integradas', desc: 'Soluciones integrales llave en mano.', href: '/industrias/alimentos#plantas-integradas' }
        ]
      }
    ]
  },
  {
    key: 'reciclaje',
    title: 'Reciclaje y Economía Circular',
    color: '#10B981',
    Icon: Recycle,
    desc: 'Tecnología líder para la economía circular y recuperación de materiales.',
    families: [
      {
        name: 'Categorías',
        links: [
          { code: 'PLA', name: 'Plásticos', desc: 'Lavado, extrusión y peletizado de polímeros.', href: '/industrias/reciclaje#plasticos' },
          { code: 'MET', name: 'Metales', desc: 'Separación magnética y trituración de chatarra.', href: '/industrias/reciclaje#metales' },
          { code: 'RSU', name: 'RSU', desc: 'Tratamiento de residuos sólidos urbanos.', href: '/industrias/reciclaje#rsu' },
          { code: 'REC', name: 'Recuperación de Materiales', desc: 'Clasificación automatizada de subproductos.', href: '/industrias/reciclaje#recuperacion' },
          { code: 'ECO', name: 'Economía Circular', desc: 'Estrategias de valorización de residuos.', href: '/industrias/reciclaje#economia-circular' }
        ]
      }
    ]
  },
  {
    key: 'packaging',
    title: 'Packaging y Conversión',
    color: '#FFD700',
    Icon: Package,
    desc: 'Velocidad, hermeticidad de empaque y conversión de película.',
    families: [
      {
        name: 'Categorías',
        links: [
          { code: 'FLX', name: 'Flexible', desc: 'Envasadoras doypack, vertical y flowpack.', href: '/industrias/packaging#flexible' },
          { code: 'RGD', name: 'Rígido', desc: 'Líneas de llenado y taponado de botellas.', href: '/industrias/packaging#rigido' },
          { code: 'PRN', name: 'Impresión', desc: 'Sistemas flexográficos y digitales.', href: '/industrias/packaging#impresion' },
          { code: 'LBL', name: 'Etiquetado', desc: 'Aplicadores de etiquetas autoadheribles.', href: '/industrias/packaging#etiquetado' },
          { code: 'CNV', name: 'Conversión', desc: 'Rebobinado, corte y termoformado.', href: '/industrias/packaging#conversion' }
        ]
      }
    ]
  },
  {
    key: 'construccion',
    title: 'Construcción e Infraestructura',
    color: '#06B6D4',
    Icon: HardHat,
    desc: 'Robustez y consistencia para procesos de alta exigencia.',
    families: [
      {
        name: 'Categorías',
        links: [
          { code: 'MAT', name: 'Materiales', desc: 'Dosificación y mezcla de áridos y agregados.', href: '/industrias/construccion#materiales' },
          { code: 'CMP', name: 'Compuestos', desc: 'Líneas de extrusión de madera plástica WPC.', href: '/industrias/construccion#compuestos' },
          { code: 'RCY', name: 'Materiales Reciclados', desc: 'Valorización de escombros y asfalto.', href: '/industrias/construccion#materiales-reciclados' },
          { code: 'INF', name: 'Infraestructura', desc: 'Maquinaria pesada y automatización civil.', href: '/industrias/construccion#infraestructura' }
        ]
      }
    ]
  },
  {
    key: 'agroindustria',
    title: 'Agroindustria',
    color: '#8B5CF6',
    Icon: Layers,
    desc: 'Rendimiento en el campo y la planta de procesamiento.',
    families: [
      {
        name: 'Categorías',
        links: [
          { code: 'PRO', name: 'Procesamiento', desc: 'Limpieza, cribado y descascarillado.', href: '/industrias/agroindustria#procesamiento' },
          { code: 'BAL', name: 'Balanceados', desc: 'Líneas de molienda y peletizado de alimento.', href: '/industrias/agroindustria#balanceados' },
          { code: 'PST', name: 'Postcosecha', desc: 'Enfriamiento, clasificación y almacenamiento.', href: '/industrias/agroindustria#postcosecha' },
          { code: 'AUT', name: 'Automatización', desc: 'Monitoreo de silos y dosificación remota.', href: '/industrias/agroindustria#automatizacion' }
        ]
      }
    ]
  },
  {
    key: 'manufactura',
    title: 'Salud y Manufactura Avanzada',
    color: '#EF4444',
    Icon: HeartPulse,
    desc: 'Precisión médica y manufactura de dispositivos estériles.',
    families: [
      {
        name: 'Categorías',
        links: [
          { code: 'MED', name: 'Médico', desc: 'Fabricación de mascarillas y apósitos quirúrgicos.', href: '/industrias/manufactura#medico' },
          { code: 'PHA', name: 'Farma', desc: 'Envasado y dosificación bajo norma GMP.', href: '/industrias/manufactura#farma' },
          { code: 'CNV', name: 'Conversión', desc: 'Corte de materiales no tejidos y films.', href: '/industrias/manufactura#conversion' },
          { code: 'PRD', name: 'Producción', desc: 'Líneas automatizadas de alta velocidad.', href: '/industrias/manufactura#produccion' }
        ]
      }
    ]
  },
  {
    key: 'energia',
    title: 'Energía y Utilidades',
    color: '#3B82F6',
    Icon: Zap,
    desc: 'Conversión energética y tecnologías limpias.',
    families: [
      {
        name: 'Categorías',
        links: [
          { code: 'WTE', name: 'Waste to Energy', desc: 'Conversión térmica y gasificación de RSU.', href: '/industrias/energia#wte' },
          { code: 'BIO', name: 'Biomasa', desc: 'Pelletizado de madera y residuos agrícolas.', href: '/industrias/energia#biomasa' },
          { code: 'IND', name: 'Energía Industrial', desc: 'Co-generación y calderas de vapor.', href: '/industrias/energia#energia-industrial' },
          { code: 'SRV', name: 'Servicios', desc: 'Eficiencia energética y auditorías térmicas.', href: '/industrias/energia#servicios' }
        ]
      }
    ]
  }
];

const IndustriesMenu = ({ isOpen, onMouseEnter, onMouseLeave, onClose }) => {
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
          <div className="w-[220px] shrink-0 border-r border-white/[0.07] bg-white/[0.015] flex flex-col py-5 px-3 gap-1 overflow-y-auto scrollbar-none">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/20 px-2.5 mb-3">
              SECTORES SMQ
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

          {/* ── RIGHT: Families + Links ── */}
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
                      SECTOR INDUSTRIAL
                    </p>
                    <h2 className="text-xl font-black text-white tracking-wide uppercase">
                      Industria de {active?.title}
                    </h2>
                  </div>
                  {/* Link to main industry page */}
                  <Link 
                    to={`/industrias/${activeIndustry}`}
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full border text-[10px] font-black tracking-widest uppercase hover:bg-white/10 transition-colors shadow-sm"
                    style={{ 
                      color: active?.color, 
                      borderColor: `${active?.color}40`, 
                      backgroundColor: `${active?.color}08` 
                    }}
                  >
                    Ver Sector Completo
                  </Link>
                </div>

                {/* Grid de links estilo Waste to Energy */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {active?.families.flatMap(family => family.links).map((link, index) => {
                    const formattedNum = String(index + 1).padStart(2, '0');

                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={onClose}
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

export default IndustriesMenu;
