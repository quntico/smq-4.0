import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCMS } from '@/context/CMSContext.jsx';

const IndustriesMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  const [openSubMenus, setOpenSubMenus] = useState({});
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { cmsState } = useCMS();
  
  const headerHeight = cmsState?.settings?.headerHeight || 100;

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSubMenu = (e, menuKey) => {
    e.preventDefault();
    setOpenSubMenus(prev => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -10, x: "-50%" }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed left-1/2 mt-0 w-[95vw] max-w-[1280px] backdrop-blur-[18px] bg-[rgba(10,10,10,0.82)] py-[28px] px-[42px] rounded-[18px] border border-white/[0.08] shadow-[0_16px_36px_rgba(0,0,0,0.3)] z-[999]"
          style={{ 
            left: '50%',
            top: `${headerHeight}px`
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[28px] lg:gap-[32px] justify-center mx-auto"
            style={isLargeScreen ? { gridTemplateColumns: 'repeat(5, minmax(150px, 210px))' } : {}}
          >
            {/* Columna 1 */}
            <div className="flex flex-col">
              <h3 className="text-white font-bold mb-4 text-[18px] tracking-wide">Reciclaje y Plásticos</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={(e) => toggleSubMenu(e, 'extrusion')}
                    className="flex items-center justify-between w-full text-left text-white/80 text-[14px] leading-[1.7] hover:text-[#FFD700] transition-colors duration-200 ease-in-out font-medium"
                  >
                    <span>Extrusión</span>
                    <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${openSubMenus['extrusion'] ? 'rotate-180 text-[#FFD700]' : 'text-white/50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openSubMenus['extrusion'] && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="pl-3 mt-1.5 border-l border-white/10 space-y-1.5 overflow-hidden"
                      >
                        <li>
                          <Link to="/extrusion" className="block text-white/60 text-[13px] hover:text-white transition-colors duration-150">
                            Extrusión
                          </Link>
                        </li>
                        <li>
                          <Link to="/coextrusion" className="block text-white/60 text-[13px] hover:text-white transition-colors duration-150">
                            Coextrusión
                          </Link>
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
                <li>
                  <Link to="/pelletizado" className="block text-white/80 text-[14px] leading-[1.7] hover:text-[#FFD700] transition-colors duration-200 ease-in-out font-medium">
                    Pelletizado
                  </Link>
                </li>
                <li>
                  <Link to="/lavado" className="block text-white/80 text-[14px] leading-[1.7] hover:text-[#FFD700] transition-colors duration-200 ease-in-out font-medium">
                    Lavado de plástico
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 2 */}
            <div className="flex flex-col">
              <h3 className="text-white font-bold mb-4 text-[18px] tracking-wide">Alimentos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#chocolate" className="block text-white/80 text-[14px] leading-[1.7] hover:text-[#FFD700] transition-colors duration-200 ease-in-out font-medium">
                    Chocolate
                  </a>
                </li>
                <li>
                  <a href="#confiteria" className="block text-white/80 text-[14px] leading-[1.7] hover:text-[#FFD700] transition-colors duration-200 ease-in-out font-medium">
                    Confitería
                  </a>
                </li>
                <li>
                  <a href="#ingredientes" className="block text-white/80 text-[14px] leading-[1.7] hover:text-[#FFD700] transition-colors duration-200 ease-in-out font-medium">
                    Ingredientes industriales
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 3 */}
            <div className="flex flex-col">
              <h3 className="text-white font-bold mb-4 text-[18px] tracking-wide">Packaging</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#empaques-flexibles" className="block text-white/80 text-[14px] leading-[1.7] hover:text-[#FFD700] transition-colors duration-200 ease-in-out font-medium">
                    Empaques flexibles
                  </a>
                </li>
                <li>
                  <a href="#empaques-rigidos" className="block text-white/80 text-[14px] leading-[1.7] hover:text-[#FFD700] transition-colors duration-200 ease-in-out font-medium">
                    Empaques rígidos
                  </a>
                </li>
                <li>
                  <a href="#etiquetado" className="block text-white/80 text-[14px] leading-[1.7] hover:text-[#FFD700] transition-colors duration-200 ease-in-out font-medium">
                    Etiquetado
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 4 */}
            <div className="flex flex-col">
              <h3 className="text-white font-bold mb-4 text-[18px] tracking-wide">Construcción</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#materiales-compuestos" className="block text-white/80 text-[14px] leading-[1.7] hover:text-[#FFD700] transition-colors duration-200 ease-in-out font-medium">
                    Materiales compuestos
                  </a>
                </li>
                <li>
                  <a href="#materiales-reciclados" className="block text-white/80 text-[14px] leading-[1.7] hover:text-[#FFD700] transition-colors duration-200 ease-in-out font-medium">
                    Materiales reciclados
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 5 */}
            <div className="flex flex-col">
              <h3 className="text-white font-bold mb-4 text-[18px] tracking-wide">Agroindustria</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#procesamiento-agricola" className="block text-white/80 text-[14px] leading-[1.7] hover:text-[#FFD700] transition-colors duration-200 ease-in-out font-medium">
                    Procesamiento agrícola
                  </a>
                </li>
                <li>
                  <a href="#alimentos-balanceados" className="block text-white/80 text-[14px] leading-[1.7] hover:text-[#FFD700] transition-colors duration-200 ease-in-out font-medium">
                    Alimentos balanceados
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IndustriesMenu;
