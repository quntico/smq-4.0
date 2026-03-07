
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SolutionsMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  const items = [
    { label: 'Plantas de reciclaje', href: '#plantas-reciclaje' },
    { label: 'Plantas de extrusión', href: '#plantas-extrusion' },
    { label: 'Plantas de procesamiento de alimentos', href: '#plantas-alimentos' },
    { label: 'Sistemas completos de packaging', href: '#sistemas-packaging' },
    { label: 'Automatización industrial', href: '#automatizacion' },
    { label: 'Ingeniería de procesos', href: '#ingenieria' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -10, x: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-full left-0 mt-0 w-[320px] backdrop-blur-[30px] bg-[rgba(10,15,20,0.70)] p-[30px] rounded-b-[12px] border-x border-b border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-[999]"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <ul className="flex flex-col space-y-3">
            {items.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="block text-white/90 text-[13px] hover:text-[#FFD700] transition-colors duration-200"
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

export default SolutionsMenu;
