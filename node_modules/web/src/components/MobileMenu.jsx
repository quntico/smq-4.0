
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';

const MobileMenu = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({});

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

  const menuStructure = [
    { 
      title: 'Industrias', 
      type: 'expandable', 
      items: ['Reciclaje y Plásticos', 'Alimentos', 'Construcción', 'Agroindustria'] 
    },
    { 
      title: 'Soluciones', 
      type: 'expandable', 
      items: ['Plantas industriales completas', 'Automatización industrial', 'Ingeniería de procesos', 'Integración de maquinaria', 'Equipos industriales'] 
    },
    { 
      title: 'Tecnología', 
      type: 'expandable', 
      items: ['Automatización PLC', 'Sistemas inteligentes', 'Control industrial', 'Monitoreo remoto', 'IA industrial'] 
    },
    { 
      title: 'Empresa', 
      type: 'expandable', 
      items: ['Nosotros', 'Proyectos', 'Certificaciones', 'Descargables', 'Contacto'] 
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-[998] lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm backdrop-blur-[30px] bg-[rgba(11,15,20,0.6)] border-r border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-[999] lg:hidden flex flex-col p-[20px] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <img 
                src="https://horizons-cdn.hostinger.com/97ce7f08-d33c-4278-88dd-69ce1a127c81/18cd38f968eed96d842606d6f02d0311.png" 
                alt="SMQ Logo" 
                className="h-[40px] w-auto object-contain"
              />
              <button onClick={onClose} className="text-white hover:text-[#0A84FF] transition-colors p-2" aria-label="Cerrar menú">
                <X size={28} />
              </button>
            </div>
            
            <nav className="flex-1 flex flex-col gap-2">
              {menuStructure.map((item, index) => (
                <div key={index} className="border-b border-white/10 pb-2">
                  <button
                    onClick={() => toggleSection(item.title)}
                    className="w-full flex justify-between items-center text-[18px] text-white font-medium py-[12px] transition-colors hover:text-[#0A84FF]"
                  >
                    {item.title}
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform duration-200 ${expandedSections[item.title] ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections[item.title] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col py-2 pl-4 space-y-3">
                          {item.items.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={`#${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={onClose}
                              className="text-[15px] text-[#9CA3AF] hover:text-[#0A84FF] transition-colors"
                            >
                              {subItem}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              <div className="mt-8">
                <a
                  href="#cotizar"
                  className="block w-full text-center bg-[#FFD700] text-[#1A1F2E] font-semibold text-[16px] py-[14px] rounded-[10px] transition-all hover:brightness-110 shadow-lg"
                  onClick={onClose}
                >
                  Cotizar
                </a>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
