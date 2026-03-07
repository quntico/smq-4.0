
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IndustriesMegaMenu = ({ isOpen, onMouseEnter, onMouseLeave, onClose }) => {
  const handleLinkClick = (e, href) => {
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-full left-0 mt-4 w-[600px] backdrop-blur-[12px] bg-[rgba(0,0,0,0.35)] p-[30px] rounded-[8px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-[999]"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="grid grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="space-y-6">
              <div>
                <h3 className="text-[14px] font-semibold text-[#FFD700] uppercase tracking-[0.5px] mb-3">
                  Reciclaje y Plásticos
                </h3>
                <ul className="space-y-1">
                  <li><a href="#extrusion" onClick={(e) => handleLinkClick(e, '#extrusion')} className="block text-[14px] text-[#E5E7EB] py-[8px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Extrusión</a></li>
                  <li><a href="#pelletizado" onClick={(e) => handleLinkClick(e, '#pelletizado')} className="block text-[14px] text-[#E5E7EB] py-[8px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Pelletizado</a></li>
                  <li><a href="#lavado" onClick={(e) => handleLinkClick(e, '#lavado')} className="block text-[14px] text-[#E5E7EB] py-[8px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Lavado de plástico</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-[#FFD700] uppercase tracking-[0.5px] mb-3">
                  Construcción
                </h3>
                <ul className="space-y-1">
                  <li><a href="#materiales-compuestos" onClick={(e) => handleLinkClick(e, '#materiales-compuestos')} className="block text-[14px] text-[#E5E7EB] py-[8px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Materiales compuestos</a></li>
                  <li><a href="#materiales-reciclados" onClick={(e) => handleLinkClick(e, '#materiales-reciclados')} className="block text-[14px] text-[#E5E7EB] py-[8px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Materiales reciclados</a></li>
                </ul>
              </div>
            </div>
            
            {/* Column 2 */}
            <div className="space-y-6">
              <div>
                <h3 className="text-[14px] font-semibold text-[#FFD700] uppercase tracking-[0.5px] mb-3">
                  Alimentos
                </h3>
                <ul className="space-y-1">
                  <li><a href="#chocolate" onClick={(e) => handleLinkClick(e, '#chocolate')} className="block text-[14px] text-[#E5E7EB] py-[8px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Chocolate</a></li>
                  <li><a href="#confiteria" onClick={(e) => handleLinkClick(e, '#confiteria')} className="block text-[14px] text-[#E5E7EB] py-[8px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Confitería</a></li>
                  <li><a href="#ingredientes" onClick={(e) => handleLinkClick(e, '#ingredientes')} className="block text-[14px] text-[#E5E7EB] py-[8px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Ingredientes industriales</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-[#FFD700] uppercase tracking-[0.5px] mb-3">
                  Agroindustria
                </h3>
                <ul className="space-y-1">
                  <li><a href="#procesamiento-agricola" onClick={(e) => handleLinkClick(e, '#procesamiento-agricola')} className="block text-[14px] text-[#E5E7EB] py-[8px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Procesamiento agrícola</a></li>
                  <li><a href="#alimentos-balanceados" onClick={(e) => handleLinkClick(e, '#alimentos-balanceados')} className="block text-[14px] text-[#E5E7EB] py-[8px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Alimentos balanceados</a></li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IndustriesMegaMenu;
