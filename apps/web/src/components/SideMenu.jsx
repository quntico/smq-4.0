
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';

const SideMenu = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuStructure = [
    { title: 'Inicio', type: 'link', href: '#inicio' },
    { 
      title: 'Industrias', 
      type: 'expandable', 
      items: ['Plásticos', 'Reciclaje', 'Alimentos', 'Construcción'] 
    },
    { 
      title: 'Soluciones', 
      type: 'expandable', 
      items: ['Plantas industriales', 'Automatización', 'Ingeniería'] 
    },
    { title: 'Maquinaria', type: 'link', href: '#maquinaria' },
    { title: 'Tecnología', type: 'link', href: '#tecnologia' },
    { 
      title: 'Recursos', 
      type: 'expandable', 
      items: ['Descargables', 'Catálogos', 'Fichas técnicas'] 
    },
    { 
      title: 'Empresa', 
      type: 'expandable', 
      items: ['Nosotros', 'Proyectos'] 
    },
    { title: 'Contacto', type: 'link', href: '#contacto' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed left-0 top-0 w-[380px] max-w-[100vw] h-[100vh] bg-[#0B0F14] z-[9999] p-[40px_30px] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <span className="text-white text-[24px] font-bold">Menú</span>
            <button onClick={onClose} className="text-white hover:text-[#0A84FF] transition-colors duration-200">
              <X size={28} />
            </button>
          </div>

          <nav className="flex flex-col">
            {menuStructure.map((item, index) => (
              <div key={index} className="mb-2">
                {item.type === 'link' ? (
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="block text-[20px] text-white font-medium py-[12px] cursor-pointer transition-colors duration-200 ease-out hover:text-[#0A84FF]"
                  >
                    {item.title}
                  </a>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleSection(item.title)}
                      className="w-full flex justify-between items-center text-[20px] text-white font-semibold pt-[20px] pb-[12px] mt-[8px] border-b border-[#1F2937] cursor-pointer transition-colors duration-200 ease-out hover:text-[#0A84FF]"
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
                          <div className="flex flex-col py-2">
                            {item.items.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href={`#${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={onClose}
                                className="text-[16px] text-[#9CA3AF] py-[8px] pl-[20px] mt-[8px] cursor-pointer transition-colors duration-200 ease-out hover:text-[#0A84FF]"
                              >
                                {subItem}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;
