
import React from 'react';
import { motion } from 'framer-motion';

const MegaMenuIndustries = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] backdrop-blur-[12px] bg-[rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.18)] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6 z-50"
      onMouseLeave={onClose}
    >
      <div className="grid grid-cols-4 gap-6">
        <div>
          <h3 className="text-[#FFD700] font-semibold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
            <span>♻</span> Reciclaje de Plásticos
          </h3>
          <ul className="space-y-3">
            <li><a href="#extrusion" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>Extrusión</a></li>
            <li><a href="#pelletizado" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>Pelletizado</a></li>
            <li><a href="#lavado" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>Lavado de plástico</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[#FFD700] font-semibold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
            <span>🍫</span> Procesamiento de Alimentos
          </h3>
          <ul className="space-y-3">
            <li><a href="#chocolate" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>Chocolate</a></li>
            <li><a href="#confiteria" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>Confitería</a></li>
            <li><a href="#ingredientes" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>Ingredientes industriales</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[#FFD700] font-semibold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
            <span>🏗</span> Construcción
          </h3>
          <ul className="space-y-3">
            <li><a href="#materiales-compuestos" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>Materiales compuestos</a></li>
            <li><a href="#materiales-reciclados" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>Materiales reciclados</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[#FFD700] font-semibold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
            <span>🌾</span> Agroindustria
          </h3>
          <ul className="space-y-3">
            <li><a href="#procesamiento-agricola" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>Procesamiento agrícola</a></li>
            <li><a href="#alimentos-balanceados" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>Alimentos balanceados</a></li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenuIndustries;
