import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Globe, ShieldCheck, DownloadCloud, PhoneCall, ArrowRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';

const companyItems = [
  {
    num: '01',
    title: 'NOSOTROS',
    desc: 'HISTORIA, VISIÓN Y VALORES DE NUESTRA TRAYECTORIA INDUSTRIAL.',
    color: '#3B82F6', // Blue
    Icon: Building2,
    href: '#nosotros'
  },
  {
    num: '02',
    title: 'PROYECTOS',
    desc: 'EXPLORA CASOS DE ÉXITO Y PLANTAS INSTALADAS A NIVEL GLOBAL.',
    color: '#F59E0B', // Amber
    Icon: Globe,
    href: '#proyectos'
  },
  {
    num: '03',
    title: 'CERTIFICACIONES',
    desc: 'ESTÁNDARES DE CALIDAD Y NORMATIVAS INTERNACIONALES.',
    color: '#10B981', // Green
    Icon: ShieldCheck,
    href: '#certificaciones'
  },
  {
    num: '04',
    title: 'DESCARGABLES',
    desc: 'CATÁLOGOS, BROCHURES TÉCNICOS Y FICHAS DE MAQUINARIA.',
    color: '#8B5CF6', // Purple
    Icon: DownloadCloud,
    href: '#descargables'
  },
  {
    num: '05',
    title: 'CONTACTO',
    desc: 'ASISTENCIA TÉCNICA, COTIZACIONES Y OFICINAS REGIONALES.',
    color: '#F97316', // Orange
    Icon: PhoneCall,
    href: '#contacto'
  }
];

const CompanyMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
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
            width: 'min(1080px, 94vw)',
            backgroundColor: 'rgba(8,11,18,0.97)',
            backdropFilter: 'blur(24px)',
            padding: '28px 32px'
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.07]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FFD700] mb-1">
                CORPORATIVO
              </p>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Grupo SMQ
              </h2>
            </div>
            {/* Action button */}
            <a 
              href="#contacto"
              className="px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 hover:text-[#FFD700] transition-colors text-white/70"
            >
              Contactar Asesor
            </a>
          </div>

          {/* Grid de 5 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {companyItems.map((item) => {
              const Icon = item.Icon;
              return (
                <a
                  key={item.num}
                  href={item.href}
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
                      Ir a la sección
                    </span>
                    <ArrowRight size={12} color={item.color} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompanyMenu;
