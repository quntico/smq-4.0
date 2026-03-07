
import React from 'react';
import { motion } from 'framer-motion';

const MegaMenuSolutions = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="absolute top-full left-0 mt-2 w-[600px] backdrop-blur-[12px] bg-[rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.18)] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6 z-50"
      onMouseLeave={onClose}
    >
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-[#FFD700] font-semibold mb-4 text-sm uppercase tracking-wider">Plantas</h3>
          <ul className="space-y-3">
            <li>
              <a href="#plantas-reciclaje" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>
                Plantas de reciclaje de plástico
              </a>
            </li>
            <li>
              <a href="#plantas-extrusion" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>
                Plantas de extrusión industrial
              </a>
            </li>
            <li>
              <a href="#plantas-alimentos" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>
                Plantas de procesamiento de alimentos
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-[#FFD700] font-semibold mb-4 text-sm uppercase tracking-wider">Automatización</h3>
          <ul className="space-y-3">
            <li>
              <a href="#automatizacion-industrial" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>
                Automatización industrial
              </a>
            </li>
            <li>
              <a href="#integracion-maquinaria" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>
                Integración de maquinaria
              </a>
            </li>
            <li>
              <a href="#ingenieria-procesos" className="text-white/80 hover:text-[#FFD700] hover:font-[600] transition-all duration-200 text-sm block" onClick={onClose}>
                Ingeniería de procesos
              </a>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenuSolutions;
