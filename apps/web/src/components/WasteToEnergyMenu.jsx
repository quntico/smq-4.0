import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Factory, Flame, Eye, Recycle, Zap, HardHat, Shield, Globe, ArrowRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';

const wasteItems = [
  {
    num: '01',
    title: 'PLANTAS RSU',
    desc: 'Tratamiento y valorización integral de residuos sólidos urbanos. Capacidades: 300 TPD, 600 TPD y 1200+ TPD.',
    color: '#22C55E', // Esmeralda / Verde
    Icon: Factory,
    bgImage: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=600',
    href: '/waste-to-energy#plantas-rsu'
  },
  {
    num: '02',
    title: 'RDF / CDR',
    desc: 'Procesamiento de combustibles derivados de residuos de alto poder calorífico para uso industrial y energético.',
    color: '#F59E0B', // Naranja
    Icon: Flame,
    bgImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600',
    href: '/waste-to-energy#cdr-rdf'
  },
  {
    num: '03',
    title: 'RECUPERACIÓN DE MATERIALES',
    desc: 'Extracción eficiente de metales, plásticos y materiales reciclables con tecnologías de separación avanzadas.',
    color: '#8B5CF6', // Morado
    Icon: Recycle,
    bgImage: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=600',
    href: '/waste-to-energy#recuperacion-materiales'
  },
  {
    num: '04',
    title: 'CLASIFICACIÓN INTELIGENTE',
    desc: 'Separación automatizada por NIR, inducción y sistemas multisensoriales con inteligencia artificial.',
    color: '#06B6D4', // Azul Cian
    Icon: Eye,
    bgImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    href: '/waste-to-energy#clasificacion-inteligente'
  },
  {
    num: '05',
    title: 'CONVERSIÓN ENERGÉTICA',
    desc: 'Tecnologías de gasificación, pirólisis, biomasa y co-generación para transformar residuos en energía útil.',
    color: '#EC4899', // Rosa
    Icon: Zap,
    bgImage: 'https://images.unsplash.com/photo-1513828742140-ccaa34f3158e?auto=format&fit=crop&q=80&w=600',
    href: '/waste-to-energy#conversion-energetica'
  },
  {
    num: '06',
    title: 'SENTINEL™',
    desc: 'Sistema inteligente de monitoreo térmico preventivo para la seguridad operativa de fosas y pilas de RSU.',
    color: '#3B82F6', // Azul
    Icon: Shield,
    bgImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
    href: '/waste-to-energy#sentinel'
  },
  {
    num: '07',
    title: 'ECONOMÍA CIRCULAR',
    desc: 'Modelos de negocio e ingeniería de procesos cerrados para reincorporar subproductos a la cadena de valor.',
    color: '#84CC16', // Verde lima
    Icon: Globe,
    bgImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=600',
    href: '/waste-to-energy#economia-circular'
  },
  {
    num: '08',
    title: 'CONSULTORÍA Y EPC',
    desc: 'Estudios de viabilidad, caracterización de residuos, diseño conceptual y ejecución completa de plantas.',
    color: '#F97316', // Naranja brillante
    Icon: HardHat,
    bgImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600',
    href: '/waste-to-energy#consultoria-epc'
  }
];

const WasteToEnergyMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
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
          className="fixed overflow-hidden rounded-b-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.85)] z-[999]"
          style={{
            left: '50%',
            top: `${headerHeight}px`,
            width: 'min(1150px, 95vw)',
            backgroundColor: 'rgba(6,8,12,0.98)',
            backdropFilter: 'blur(24px)',
            padding: '20px 24px'
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Top Header - Más compacto */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/[0.06]">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#22C55E] mb-1">
                VALORIZACIÓN ENERGÉTICA Y AMBIENTAL
              </p>
              <h2 className="text-xl font-black text-white tracking-tight leading-none mb-1.5">
                Soluciones Waste to Energy
              </h2>
              <p className="text-[11px] text-white/50 max-w-2xl leading-normal">
                Tecnologías y sistemas integrados para el tratamiento, valorización y conversión de residuos en energía y recursos.
              </p>
            </div>
            <Link 
              to="/waste-to-energy"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-[8.5px] font-bold tracking-widest uppercase hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-white transition-all text-white/80 group/btn"
            >
              <span>Ver Ecosistema WTE</span>
              <ArrowRight size={11} className="text-[#22C55E] group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid de 8 tecnologías - 4 columnas para simetría en 2 filas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {wasteItems.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.num}
                  to={item.href}
                  className="group relative flex flex-col justify-between p-4.5 rounded-xl border transition-all duration-300 overflow-hidden h-[165px]"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.01)',
                    borderColor: 'rgba(255,255,255,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${item.color}45`;
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.boxShadow = `0 8px 30px -10px ${item.color}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >

                  {/* Top: Icon & Num */}
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <div 
                      className="flex items-center justify-center w-8 h-8 rounded-lg border transition-colors"
                      style={{ 
                        backgroundColor: `${item.color}15`,
                        borderColor: `${item.color}30`
                      }}
                    >
                      <Icon size={14} color={item.color} />
                    </div>
                    <span 
                      className="text-[11px] font-black tracking-widest font-mono"
                      style={{ color: item.color }}
                    >
                      {item.num}
                    </span>
                  </div>

                  {/* Middle: Title & Line & Desc */}
                  <div className="flex-1 relative z-10">
                    <h3 className="text-[12px] font-extrabold text-white mb-1.5 leading-tight uppercase tracking-wide group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    {/* Small Colored Line */}
                    <div 
                      className="w-7 h-[2px] mb-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="text-[9.5px] text-white/70 leading-relaxed font-semibold tracking-wide group-hover:text-white/95 transition-colors line-clamp-3">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom: Ver Detalles interaction */}
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5 opacity-70 group-hover:opacity-100 transition-opacity relative z-10">
                    <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: item.color }}>
                      Ver Detalles
                    </span>
                    <ArrowRight size={10} color={item.color} className="transform group-hover:translate-x-1 transition-transform" />
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

export default WasteToEnergyMenu;
