
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MenuOverlay = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed top-0 left-0 w-full h-[100vh] bg-[rgba(0,0,0,0.5)] z-[9998]"
          onClick={onClose}
        />
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
