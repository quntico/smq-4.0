
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const IndustriesMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleSubMenu = (e, menuKey) => {
    e.preventDefault();
    setOpenSubMenus(prev => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, x: "calc(-50% + 300px)" }}
          animate={{ opacity: 1, y: 0, x: "calc(-50% + 300px)" }}
          exit={{ opacity: 0, y: -10, x: "calc(-50% + 300px)" }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-full left-1/2 mt-0 w-[1000px] backdrop-blur-[30px] bg-[rgba(10,15,20,0.70)] p-[30px] rounded-b-[12px] border-x border-b border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-[999]"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="grid grid-cols-5 gap-6">
            <div>
              <h3 className="text-white font-bold mb-4 text-[15px]">Reciclaje y Plásticos</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={(e) => toggleSubMenu(e, 'extrusion')}
                    className="flex items-center justify-between w-full text-left text-white/90 text-[13px] hover:text-[#FFD700] transition-colors duration-200"
                  >
                    <span>Extrusión</span>
                    <svg className={`w-3 h-3 transition-transform ${openSubMenus['extrusion'] ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openSubMenus['extrusion'] && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-3 mt-2 border-l border-white/10 space-y-2 overflow-hidden"
                      >
                        <li><Link to="/extrusion" className="block text-white/70 text-[12px] hover:text-white transition-colors duration-200">Extrusión</Link></li>
                        <li><Link to="/coextrusion" className="block text-white/70 text-[12px] hover:text-white transition-colors duration-200">Coextrusión</Link></li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
                <li><Link to="/pelletizado" className="block text-white/90 text-[13px] hover:text-[#FFD700] transition-colors duration-200">Pelletizado</Link></li>
                <li><Link to="/lavado" className="block text-white/90 text-[13px] hover:text-[#FFD700] transition-colors duration-200">Lavado de plástico</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 text-[15px]">Alimentos</h3>
              <ul className="space-y-2">
                <li><a href="#chocolate" className="block text-white/90 text-[13px] hover:text-[#FFD700] transition-colors duration-200">Chocolate</a></li>
                <li><a href="#confiteria" className="block text-white/90 text-[13px] hover:text-[#FFD700] transition-colors duration-200">Confitería</a></li>
                <li><a href="#ingredientes" className="block text-white/90 text-[13px] hover:text-[#FFD700] transition-colors duration-200">Ingredientes industriales</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 text-[15px]">Packaging</h3>
              <ul className="space-y-2">
                <li><a href="#empaques-flexibles" className="block text-white/90 text-[13px] hover:text-[#FFD700] transition-colors duration-200">Empaques flexibles</a></li>
                <li><a href="#empaques-rigidos" className="block text-white/90 text-[13px] hover:text-[#FFD700] transition-colors duration-200">Empaques rígidos</a></li>
                <li><a href="#etiquetado" className="block text-white/90 text-[13px] hover:text-[#FFD700] transition-colors duration-200">Etiquetado</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 text-[15px]">Construcción</h3>
              <ul className="space-y-2">
                <li><a href="#materiales-compuestos" className="block text-white/90 text-[13px] hover:text-[#FFD700] transition-colors duration-200">Materiales compuestos</a></li>
                <li><a href="#materiales-reciclados" className="block text-white/90 text-[13px] hover:text-[#FFD700] transition-colors duration-200">Materiales reciclados</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 text-[15px]">Agroindustria</h3>
              <ul className="space-y-2">
                <li><a href="#procesamiento-agricola" className="block text-white/90 text-[13px] hover:text-[#FFD700] transition-colors duration-200">Procesamiento agrícola</a></li>
                <li><a href="#alimentos-balanceados" className="block text-white/90 text-[13px] hover:text-[#FFD700] transition-colors duration-200">Alimentos balanceados</a></li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IndustriesMenu;
