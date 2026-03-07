
import React from 'react';
import { motion } from 'framer-motion';

const DropdownMenu = ({ isOpen, items, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="absolute top-full left-0 mt-2 w-56 bg-[#111827] border border-[#1F2937] rounded-xl shadow-[0_25px_50px_rgba(0,0,0,0.45)] py-2 z-50"
      onMouseLeave={onClose}
    >
      <ul className="flex flex-col">
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="block px-4 py-2 text-sm text-white/80 hover:text-[#0A84FF] hover:bg-white/5 transition-colors"
              onClick={onClose}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default DropdownMenu;
