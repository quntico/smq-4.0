import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2, Sparkles, X, ArrowRight, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const SmartSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Keyboard Shortcuts (Ctrl+K to open, ESC to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults(null);
    }
  }, [isOpen]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResults(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults({
        route: null,
        name: 'Error de Búsqueda',
        explanation: 'Ocurrió un error al contactar al motor inteligente (SMQ-AI). Asegúrate de configurar la llave en Vercel.'
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleNavigate = () => {
    if (results?.route) {
      navigate(results.route);
      setIsOpen(false);
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99999] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-2xl bg-[#0B0F19]/90 border border-white/10 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col backdrop-blur-2xl"
          >
            {/* Spotlight Input */}
            <form onSubmit={handleSearch} className="flex items-center w-full px-6 py-5 border-b border-white/10 bg-white/[0.02]">
              <Search size={24} className="text-[#F5C400] mr-4 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pregúntale a SMQ-AI qué necesitas..."
                className="w-full bg-transparent border-none outline-none text-white text-xl placeholder:text-white/30 font-light"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(''); setResults(null); inputRef.current?.focus(); }}
                  className="p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              )}
              <div className="hidden sm:flex items-center ml-4 px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-mono tracking-widest border border-white/10 gap-1">
                <Command size={10} /> K
              </div>
            </form>

            {/* Spotlight Results */}
            <AnimatePresence>
              {(isSearching || results) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-col bg-black/40"
                >
                  {isSearching ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                      <Loader2 size={32} className="text-[#F5C400] animate-spin" />
                      <span className="text-sm text-white/50 font-mono animate-pulse tracking-widest uppercase">
                        Procesando consulta...
                      </span>
                    </div>
                  ) : results ? (
                    <div className="flex flex-col p-6 gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#F5C400]/10 flex items-center justify-center shrink-0 border border-[#F5C400]/20">
                          <Sparkles size={20} className="text-[#F5C400]" />
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                          <h4 className="text-white/60 text-xs font-bold tracking-widest uppercase">Respuesta de IA</h4>
                          <p className="text-lg text-white/90 leading-relaxed font-light">
                            {results.explanation}
                          </p>
                        </div>
                      </div>
                      
                      {results.route && (
                        <div className="pt-2">
                          <button
                            onClick={handleNavigate}
                            className="group flex items-center justify-between w-full bg-white/5 hover:bg-[#F5C400] border border-white/10 hover:border-[#F5C400] rounded-xl p-4 transition-all duration-300"
                          >
                            <div className="flex flex-col items-start gap-1">
                              <span className="text-[10px] text-white/40 group-hover:text-black/60 font-bold uppercase tracking-wider transition-colors">
                                Destino Sugerido
                              </span>
                              <span className="text-xl font-black text-white group-hover:text-black transition-colors">
                                {results.name}
                              </span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                              <ArrowRight size={20} className="text-[#F5C400] group-hover:text-black transition-colors transform group-hover:translate-x-1" />
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="w-full px-6 py-3 border-t border-white/5 bg-black/60 flex items-center justify-between">
              <span className="text-[10px] text-white/30 uppercase tracking-widest">
                SMQ Inteligencia Corporativa
              </span>
              <span className="text-[10px] text-white/30 uppercase tracking-widest flex items-center gap-1">
                ESC para cerrar
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center justify-center w-[36px] h-[36px] rounded-full transition-all duration-300 ml-4 bg-transparent text-white/70 hover:text-[#FFD700] hover:bg-white/5"
        title="Buscador Inteligente (Ctrl+K)"
      >
        <Search size={18} />
      </button>

      {/* Render modal at root level to prevent z-index issues */}
      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
};

export default SmartSearch;
