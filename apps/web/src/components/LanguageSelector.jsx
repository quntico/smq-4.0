import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext.jsx';

const flags = {
  es: () => (
    <svg viewBox="0 0 3 2" className="w-full h-full">
      <rect width="3" height="2" fill="#006847"/>
      <rect width="2" height="2" x="1" fill="#fff"/>
      <rect width="1" height="2" x="2" fill="#ce1126"/>
      <circle cx="1.5" cy="1" r="0.25" fill="#8b5e3c"/>
    </svg>
  ),
  en: () => (
    <svg viewBox="0 0 3 2" className="w-full h-full">
      <rect width="3" height="2" fill="#b22234"/>
      <rect width="3" height="0.15" y="0.15" fill="#fff"/>
      <rect width="3" height="0.15" y="0.45" fill="#fff"/>
      <rect width="3" height="0.15" y="0.75" fill="#fff"/>
      <rect width="3" height="0.15" y="1.05" fill="#fff"/>
      <rect width="3" height="0.15" y="1.35" fill="#fff"/>
      <rect width="3" height="0.15" y="1.65" fill="#fff"/>
      <rect width="3" height="0.15" y="1.95" fill="#fff"/>
      <rect width="1.2" height="1.05" fill="#3c3b6e"/>
    </svg>
  )
};

const languages = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' }
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#0a0a0a] border border-white/10 rounded-full pl-3 pr-2 py-1.5 hover:bg-[#151515] transition-all shadow-[inset_0_1px_3px_rgba(255,255,255,0.05),_0_0_10px_rgba(0,0,0,0.3)] cursor-pointer group"
      >
        <div className="w-3.5 h-auto rounded-[2px] opacity-90 group-hover:opacity-100 transition-opacity overflow-hidden">
          {flags[activeLang.code]()}
        </div>
        <span className="text-white font-bold text-[11px] tracking-wider uppercase mt-[1px]">
          {activeLang.code}
        </span>
        <ChevronDown size={12} className={`text-white/40 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-3 w-36 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[1001]"
          >
            <div className="py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-[12px] font-semibold transition-colors ${
                    language === lang.code 
                      ? 'bg-white/10 text-[#FFD700]' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="tracking-wide">{lang.label}</span>
                  <div className="w-4 h-auto rounded-[2px] overflow-hidden">
                    {flags[lang.code]()}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
