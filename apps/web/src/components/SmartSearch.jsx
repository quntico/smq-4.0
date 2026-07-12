import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2, Sparkles, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SmartSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Search Submission (Mock for now)
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
      setQuery('');
      setResults(null);
    }
  };

  const toggleSearch = (e) => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      if (query.trim()) {
        handleSearch(e);
      } else {
        setIsOpen(false);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative flex items-center h-full ml-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-[50px] right-0 flex flex-col bg-[#111620]/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[100] w-[350px] overflow-hidden"
          >
            {/* Search Input Bar */}
            <form onSubmit={handleSearch} className="flex items-center w-full h-[50px] px-4 border-b border-white/10 bg-black/20">
              <Sparkles size={16} className="text-[#F5C400] mr-3 shrink-0 animate-pulse" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca por sección o tecnología..."
                className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-white/40 h-full"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(''); setResults(null); inputRef.current?.focus(); }}
                  className="p-1 text-white/50 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </form>

            {/* Dropdown Results Box */}
            <AnimatePresence>
              {(isSearching || results) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-col gap-3 p-4 bg-black/40"
                >
                  {isSearching ? (
                    <div className="flex flex-col items-center justify-center py-6 gap-3">
                      <Loader2 size={24} className="text-[#F5C400] animate-spin" />
                      <span className="text-xs text-white/70 font-mono animate-pulse">SMQ-AI analizando concepto...</span>
                    </div>
                  ) : results ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-2">
                        <Sparkles size={16} className="text-[#F5C400] shrink-0 mt-0.5" />
                        <p className="text-sm text-white/90 leading-relaxed">
                          {results.explanation}
                        </p>
                      </div>
                      <div className="w-full h-[1px] bg-white/10" />
                      <button
                        onClick={handleNavigate}
                        className="group flex items-center justify-between w-full bg-[#1A2130] hover:bg-[#F5C400] border border-white/5 rounded-lg p-3 transition-colors duration-300"
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-[10px] text-white/50 group-hover:text-black/60 font-bold uppercase tracking-wider transition-colors">
                            Ir a Sección
                          </span>
                          <span className="text-sm font-black text-white group-hover:text-black transition-colors">
                            {results.name}
                          </span>
                        </div>
                        <ArrowRight size={18} className="text-[#F5C400] group-hover:text-black transition-colors transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lupa Trigger Icon */}
      <button
        onClick={toggleSearch}
        className={`relative flex items-center justify-center w-[36px] h-[36px] rounded-full transition-all duration-300 ${
          isOpen ? 'bg-[#F5C400] text-black shadow-[0_0_15px_rgba(245,196,0,0.4)]' : 'bg-transparent text-white/70 hover:text-[#FFD700] hover:bg-white/5'
        }`}
        title="Buscador Inteligente con IA"
      >
        <Search size={18} className={isOpen ? 'scale-110' : ''} />
      </button>
    </div>
  );
};

export default SmartSearch;
