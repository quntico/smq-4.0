
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TechnologyMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  const items = [
    { label: 'Automatización PLC', href: '#plc' },
    { label: 'Sistemas inteligentes', href: '#sistemas-inteligentes' },
    { label: 'Control industrial', href: '#control' },
    { label: 'Monitoreo remoto', href: '#monitoreo' },
    { label: 'Inteligencia artificial aplicada', href: '#ia' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -10, x: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-full left-0 mt-0 w-[280px] backdrop-blur-[30px] bg-[rgba(10,15,20,0.70)] p-[30px] rounded-b-[12px] border-x border-b border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-[999]"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <ul className="flex flex-col space-y-3">
            {items.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="block text-white/90 text-[13px] hover:text-[#FFD700] hover:font-[600] transition-all duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TechnologyMenu;
