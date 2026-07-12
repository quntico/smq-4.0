import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Factory, Tv, TrendingUp, DownloadCloud, BookOpen, ArrowRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';

const projectItems = [
  {
    num: '01',
    title: 'CASOS DE ÉXITO',
    desc: 'ESTUDIOS DE CASOS REALES Y RESULTADOS OPERATIVOS DE NUESTROS CLIENTES.',
    color: '#10B981', // Green
    Icon: Award,
    href: '/proyectos#casos'
  },
  {
    num: '02',
    title: 'INSTALACIONES',
    desc: 'GALERÍA Y DETALLES DE PLANTAS EN FUNCIONAMIENTO A NIVEL MUNDIAL.',
    color: '#3B82F6', // Blue
    Icon: Factory,
    href: '/proyectos#instalaciones'
  },
  {
    num: '03',
    title: 'SIMULACIONES',
    desc: 'MODELOS DE PROCESOS INDUSTRIALES EN 3D Y ANÁLISIS DE CAPACIDAD.',
    color: '#06B6D4', // Cyan
    Icon: Tv,
    href: '/proyectos#simulaciones'
  },
  {
    num: '04',
    title: 'ROI',
    desc: 'HERRAMIENTAS DE CÁLCULO DE RETORNO DE INVERSIÓN Y AHORRO ENERGÉTICO.',
    color: '#F97316', // Orange
    Icon: TrendingUp,
    href: '/proyectos#roi'
  },
  {
    num: '05',
    title: 'DESCARGABLES',
    desc: 'CATÁLOGOS COMPLETOS, PLANOS DE EQUIPOS Y GUÍAS DE PROCESOS.',
    color: '#8B5CF6', // Purple
    Icon: DownloadCloud,
    href: '/proyectos#descargables'
  },
  {
    num: '06',
    title: 'BIBLIOTECA TÉCNICA',
    desc: 'DOCUMENTACIÓN CIENTÍFICA, NORMAS INDUSTRIALES Y MANUALES DE OPERACIÓN.',
    color: '#EF4444', // Red
    Icon: BookOpen,
    href: '/proyectos#biblioteca'
  }
];

const enProjectItems = {
  '01': { title: 'SUCCESS STORIES', desc: 'REAL CASE STUDIES AND OPERATIONAL RESULTS FROM OUR CLIENTS.' },
  '02': { title: 'INSTALLATIONS', desc: 'GALLERY AND DETAILS OF PLANTS IN OPERATION WORLDWIDE.' },
  '03': { title: 'SIMULATIONS', desc: '3D INDUSTRIAL PROCESS MODELS AND CAPACITY ANALYSIS.' },
  '04': { title: 'ROI', desc: 'RETURN ON INVESTMENT AND ENERGY SAVINGS CALCULATION TOOLS.' },
  '05': { title: 'DOWNLOADS', desc: 'COMPLETE CATALOGS, EQUIPMENT DRAWINGS, AND PROCESS GUIDES.' },
  '06': { title: 'TECHNICAL LIBRARY', desc: 'SCIENTIFIC DOCUMENTATION, INDUSTRIAL STANDARDS, AND OPERATION MANUALS.' }
};

const ProjectsMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  const { cmsState } = useCMS();
  const { language } = useLanguage();
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
            width: 'min(1150px, 95vw)',
            backgroundColor: 'rgba(8,11,18,0.97)',
            backdropFilter: 'blur(24px)',
            padding: '24px 28px'
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/[0.07]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FFD700] mb-1">
                {language === 'en' ? 'SOCIAL PROOF & RESOURCES' : 'PRUEBA SOCIAL Y RECURSOS'}
              </p>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {language === 'en' ? 'Projects & Library' : 'Proyectos & Biblioteca'}
              </h2>
            </div>
            {/* Action button */}
            <Link 
              to="/proyectos"
              className="px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 hover:text-[#FFD700] transition-colors text-white/70"
            >
              {language === 'en' ? 'View All Projects' : 'Ver Todos los Proyectos'}
            </Link>
          </div>

          {/* Grid de 6 items - 3 columnas para excelente balance visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectItems.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.num}
                  to={item.href}
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
                      {language === 'en' && enProjectItems[item.num] ? enProjectItems[item.num].title : item.title}
                    </h3>
                    <p className="text-[9.5px] text-white/40 leading-[1.6] font-semibold uppercase tracking-wider group-hover:text-white/60 transition-colors">
                      {language === 'en' && enProjectItems[item.num] ? enProjectItems[item.num].desc : item.desc}
                    </p>
                  </div>

                  {/* Footer interaction */}
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 opacity-50 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: item.color }}>
                      {language === 'en' ? 'Go to Resource' : 'Ir al recurso'}
                    </span>
                    <ArrowRight size={12} color={item.color} className="transform group-hover:translate-x-1 transition-transform" />
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

export default ProjectsMenu;
