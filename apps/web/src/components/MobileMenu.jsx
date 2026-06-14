import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';

const MobileMenu = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const { cmsState } = useCMS();
  const { t } = useLanguage();
  const { logoUrl, logoSize } = cmsState.settings;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Definimos la estructura de sub-ítems según los menús reales
  const menuStructure = [
    {
      title: 'Industrias',
      key: 'industries',
      type: 'expandable',
      items: [
        {
          name: 'Alimentos',
          href: '/industrias/alimentos',
          subItems: [
            { name: '01 Procesamiento', href: '/industrias/alimentos#procesamiento' },
            { name: '02 Producción Continua', href: '/industrias/alimentos#produccion' },
            { name: '03 Empaque', href: '/industrias/alimentos#empaque' },
            { name: '04 Ingredientes', href: '/industrias/alimentos#ingredientes' },
            { name: '05 Plantas Integradas', href: '/industrias/alimentos#plantas-integradas' }
          ]
        },
        { name: 'Reciclaje y Plásticos', href: '/industrias/reciclaje-y-plasticos' },
        { name: 'Salud y Manufactura Avanzada', href: '/industrias/salud-manufactura-avanzada' },
        { name: 'Energía y Utilidades', href: '/industrias/energia-utilidades' },
        { name: 'Química y Petroquímica', href: '/industrias/quimica-petroquimica' }
      ]
    },
    {
      title: 'Soluciones',
      key: 'solutions',
      type: 'expandable',
      items: [
        { name: 'Plantas Llave en Mano', href: '/soluciones/plantas-llave-en-mano' },
        { name: 'Líneas de Producción', href: '/soluciones/lineas-produccion' },
        { name: 'Infraestructura Industrial', href: '/soluciones/infraestructura-industrial' },
        { name: 'Automatización', href: '/soluciones/automatizacion' },
        { name: 'Operación y Soporte', href: '/soluciones/operacion-soporte' }
      ]
    },
    {
      title: 'Maquinaria',
      key: 'machinery',
      type: 'expandable',
      items: [
        { name: 'Preparación', href: '/maquinaria/preparacion' },
        { name: 'Procesamiento', href: '/maquinaria/procesamiento' },
        { name: 'Separación', href: '/maquinaria/separacion' },
        { name: 'Empaque', href: '/maquinaria/empaque' },
        { name: 'Automatización', href: '/maquinaria/automatizacion' },
        { name: 'Plantas Completas', href: '/maquinaria/plantas-completas' }
      ]
    },
    {
      title: 'Tecnología',
      key: 'technology',
      type: 'expandable',
      items: [
        { name: 'Inteligencia Artificial', href: '/tecnologia#ia' },
        { name: 'Smart Factory', href: '/tecnologia#smart-factory' },
        { name: 'Digital Twin', href: '/tecnologia#digital-twin' },
        { name: 'PLC + Motion', href: '/tecnologia#plc-motion' },
        { name: 'IIOT + Edge', href: '/tecnologia#iiot-edge' },
        { name: 'Energía Inteligente', href: '/tecnologia#energia-inteligente' },
        { name: 'Plataforma SMQ OS™', href: '/tecnologia#smq-os' }
      ]
    },
    {
      title: 'Waste to Energy',
      key: 'wastetoenergy',
      type: 'expandable',
      items: [
        { name: 'Plantas RSU', href: '/waste-to-energy#plantas-rsu' },
        { name: 'RDF / CDR', href: '/waste-to-energy#cdr-rdf' },
        { name: 'Recuperación de Materiales', href: '/waste-to-energy#recuperacion-materiales' },
        { name: 'Clasificación Inteligente', href: '/waste-to-energy#clasificacion-inteligente' },
        { name: 'Conversión Energética', href: '/waste-to-energy#conversion-energetica' },
        { name: 'Sentinel™', href: '/waste-to-energy#sentinel' },
        { name: 'Economía Circular', href: '/waste-to-energy#economia-circular' },
        { name: 'Consultoría y EPC', href: '/waste-to-energy#consultoria-epc' }
      ]
    },
    {
      title: 'Proyectos',
      key: 'projects',
      type: 'expandable',
      items: [
        { name: 'Casos de Éxito', href: '/proyectos#casos' },
        { name: 'Instalaciones', href: '/proyectos#instalaciones' },
        { name: 'Simulaciones', href: '/proyectos#simulaciones' },
        { name: 'ROI', href: '/proyectos#roi' },
        { name: 'Descargables', href: '/proyectos#descargables' },
        { name: 'Biblioteca Técnica', href: '/proyectos#biblioteca' }
      ]
    },
    {
      title: 'Empresa',
      key: 'company',
      type: 'expandable',
      items: [
        { name: 'Nosotros', href: '/empresa#nosotros' },
        { name: 'Capacidades', href: '/empresa#capacidades' },
        { name: 'Certificaciones', href: '/empresa#certificaciones' },
        { name: 'Alianzas', href: '/empresa#alianzas' },
        { name: 'Innovación', href: '/empresa#innovacion' },
        { name: 'Carrera', href: '/empresa#carrera' },
        { name: 'Contacto', href: '/empresa#contacto' }
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/80 z-[9998] lg:hidden"
            onClick={onClose}
          />

          {/* Drawer Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm backdrop-blur-[35px] bg-[#070b12]/95 border-l border-white/10 shadow-[-10px_0_50px_rgba(0,0,0,0.8)] z-[9999] lg:hidden flex flex-col p-[24px] overflow-y-auto"
          >
            {/* Header Area */}
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <Link to="/" onClick={onClose} className="flex items-center select-none">
                {logoUrl ? (
                  <img 
                    src={logoUrl} 
                    alt="SMQ Logo" 
                    className="h-[36px] w-auto object-contain"
                  />
                ) : (
                  <span className="text-white font-black tracking-wider text-xl">
                    SMQ
                  </span>
                )}
              </Link>
              <button 
                onClick={onClose} 
                className="text-white/70 hover:text-[#FFD700] transition-colors p-1.5 bg-white/5 hover:bg-white/10 rounded-full" 
                aria-label="Cerrar menú"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col gap-1">
              {menuStructure.map((item, index) => {
                const label = t(`header.${item.key}`) !== `header.${item.key}` ? t(`header.${item.key}`) : item.title;
                const isExpanded = !!expandedSections[item.title];

                return (
                  <div key={index} className="border-b border-white/5 pb-1">
                    <button
                      onClick={() => toggleSection(item.title)}
                      className="w-full flex justify-between items-center text-[16px] text-white font-bold py-[12px] transition-colors hover:text-[#FFD700] uppercase tracking-wide text-left"
                    >
                      <span>{label}</span>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-300 text-white/50 ${isExpanded ? 'rotate-180 text-[#FFD700]' : ''}`} 
                      />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col py-2 pl-3 space-y-2 border-l border-white/10 ml-1 mb-2">
                            {item.items.map((subItem, subIndex) => {
                              const hasSub = subItem.subItems && subItem.subItems.length > 0;
                              return (
                                <div key={subIndex} className="flex flex-col">
                                  {hasSub ? (
                                    <div className="flex flex-col">
                                      <Link
                                        to={subItem.href}
                                        onClick={onClose}
                                        className="text-[14px] text-white/80 font-bold py-1.5 uppercase tracking-wider text-left hover:text-[#FFD700] transition-colors"
                                      >
                                        {subItem.name}
                                      </Link>
                                      <div className="flex flex-col pl-3 border-l border-white/5 space-y-1 mt-1">
                                        {subItem.subItems.map((subSub, ssIdx) => (
                                          <Link
                                            key={ssIdx}
                                            to={subSub.href}
                                            onClick={onClose}
                                            className="text-[13px] text-white/50 hover:text-[#FFD700] transition-colors py-1 font-medium"
                                          >
                                            {subSub.name}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  ) : (
                                    <Link
                                      to={subItem.href}
                                      onClick={onClose}
                                      className="text-[14px] text-white/60 hover:text-[#FFD700] transition-colors py-1.5 font-medium"
                                    >
                                      {subItem.name}
                                    </Link>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              
              {/* Call to Action Button */}
              <div className="mt-8">
                <Link
                  to="/#contacto"
                  className="block w-full text-center bg-[#FFD700] text-[#1A1F2E] font-black uppercase tracking-wider text-[13px] py-[14px] rounded-full transition-all hover:brightness-110 shadow-[0_4px_20px_rgba(255,215,0,0.25)]"
                  onClick={onClose}
                >
                  Cotizar Planta
                </Link>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
