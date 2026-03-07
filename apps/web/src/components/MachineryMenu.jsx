
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MachineryMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -10, x: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-full left-0 mt-0 w-[500px] backdrop-blur-[30px] bg-[rgba(10,15,20,0.70)] p-[30px] rounded-b-[12px] border-x border-b border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-[999]"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4 text-[15px]">Packaging</h3>
              <ul className="space-y-3">
                <li><a href="#envasadoras" className="block text-white/90 text-[13px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Envasadoras</a></li>
                <li><a href="#etiquetadoras" className="block text-white/90 text-[13px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Etiquetadoras</a></li>
                <li><a href="#encartonadoras" className="block text-white/90 text-[13px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Encartonadoras</a></li>
                <li><a href="#paletizadoras" className="block text-white/90 text-[13px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Paletizadoras</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 text-[15px]">Industrial</h3>
              <ul className="space-y-3">
                <li><a href="#extrusoras" className="block text-white/90 text-[13px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Extrusoras</a></li>
                <li><a href="#molinos" className="block text-white/90 text-[13px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Molinos</a></li>
                <li><a href="#mezcladoras" className="block text-white/90 text-[13px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Mezcladoras</a></li>
                <li><a href="#silos" className="block text-white/90 text-[13px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Silos</a></li>
                <li><a href="#transportadores" className="block text-white/90 text-[13px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200">Transportadores</a></li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MachineryMenu;
