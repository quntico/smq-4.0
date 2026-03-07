
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TechnologyDropdown = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  const items = [
    { label: 'Automatización PLC', href: '#plc' },
    { label: 'Sistemas inteligentes', href: '#sistemas-inteligentes' },
    { label: 'Control industrial', href: '#control' },
    { label: 'Monitoreo remoto', href: '#monitoreo' },
    { label: 'IA industrial', href: '#ia' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-full left-0 mt-4 w-[280px] backdrop-blur-[30px] bg-[rgba(11,15,20,0.3)] py-[20px] rounded-[8px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-[999]"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <ul className="flex flex-col">
            {items.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="block px-[20px] py-[12px] text-[14px] text-[#E5E7EB] hover:bg-[rgba(10,132,255,0.1)] hover:text-[#0A84FF] transition-all duration-150"
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

export default TechnologyDropdown;
