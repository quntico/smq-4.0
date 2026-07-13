import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2, Sparkles, X, ArrowRight, Command, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useCMS } from '@/context/CMSContext.jsx';

const SmartSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [pastedImage, setPastedImage] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { cmsState } = useCMS();

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
      setPastedImage(null);
      setChatHistory([]);
    }
  }, [isOpen]);

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          setPastedImage(event.target.result); // Base64 representation
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Auto-scroll al final del chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isSearching]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim() && !pastedImage) return;

    const currentQuery = query || "Mira esta foto. ¿Qué me puedes decir o a qué categoría pertenece?";
    const currentImage = pastedImage;
    setQuery('');
    setPastedImage(null);
    setIsSearching(true);
    
    // Agregar la pregunta del usuario al historial
    const newHistory = [...chatHistory, { role: 'user', content: currentQuery, image: currentImage }];
    setChatHistory(newHistory);

    try {
      // Filtrar el historial para la API
      const apiHistory = chatHistory.map(msg => ({ role: msg.role, content: msg.content, image: msg.image }));

      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: currentQuery, 
          image: currentImage,
          history: apiHistory,
          customPrompt: cmsState?.settings?.aiSystemPrompt
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: data.explanation,
        route: data.route,
        name: data.name
      }]);
    } catch (error) {
      console.error('Search error:', error);
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: 'Ocurrió un error al contactar al motor inteligente (SMQ-AI).',
        route: null,
        name: 'Error de Búsqueda'
      }]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleNavigate = (route) => {
    if (route) {
      navigate(route);
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
            {/* Chat Results Area */}
            <AnimatePresence>
              {(isSearching || chatHistory.length > 0) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-col bg-black/40 max-h-[60vh] overflow-y-auto custom-scrollbar"
                  ref={chatContainerRef}
                >
                  <div className="flex flex-col p-6 gap-6">
                    {chatHistory.map((msg, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${msg.role === 'user' ? 'bg-white/10 border-white/20' : 'bg-[#F5C400]/10 border-[#F5C400]/20'}`}>
                          {msg.role === 'user' ? <div className="text-white font-bold text-sm">TÚ</div> : <Sparkles size={20} className="text-[#F5C400]" />}
                        </div>
                        
                        <div className={`flex flex-col gap-1 mt-1 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                          <h4 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">
                            {msg.role === 'user' ? 'Tú' : 'Respuesta de IA'}
                          </h4>
                          <p className={`text-lg font-light leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-white/90'} ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                            {msg.content}
                          </p>
                          {msg.image && (
                            <img src={msg.image} alt="Imagen adjunta" className="mt-2 max-w-[200px] h-auto rounded-lg border border-white/20 shadow-lg object-contain bg-black/50" />
                          )}

                          {msg.role === 'assistant' && msg.route && (
                            <div className="pt-3 w-full max-w-sm">
                              <button
                                onClick={() => handleNavigate(msg.route)}
                                className="group flex items-center justify-between w-full bg-white/5 hover:bg-[#F5C400] border border-white/10 hover:border-[#F5C400] rounded-xl p-3 transition-all duration-300"
                              >
                                <div className="flex flex-col items-start gap-1">
                                  <span className="text-[9px] text-white/40 group-hover:text-black/60 font-bold uppercase tracking-wider transition-colors">
                                    Destino Sugerido
                                  </span>
                                  <span className="text-lg font-black text-white group-hover:text-black transition-colors">
                                    {msg.name}
                                  </span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                                  <ArrowRight size={16} className="text-[#F5C400] group-hover:text-black transition-colors transform group-hover:translate-x-1" />
                                </div>
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {isSearching && (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#F5C400]/10 flex items-center justify-center shrink-0 border border-[#F5C400]/20">
                          <Loader2 size={20} className="text-[#F5C400] animate-spin" />
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                          <span className="text-xs text-white/50 font-mono animate-pulse tracking-widest uppercase">
                            Escribiendo...
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Spotlight Input */}
            <form onSubmit={handleSearch} className="flex items-center w-full px-6 py-5 border-t border-white/10 bg-white/[0.02] relative z-10">
              
              {/* Image Preview Overlay */}
              {pastedImage && (
                <div className="absolute bottom-[100%] left-6 mb-3 z-20">
                  <div className="relative inline-block group">
                    <div className="absolute inset-0 bg-[#F5C400]/20 blur-md rounded-xl"></div>
                    <img src={pastedImage} alt="Pasted preview" className="relative w-24 h-24 object-cover rounded-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
                    <button 
                      type="button" 
                      onClick={() => setPastedImage(null)} 
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-1.5 text-white shadow-lg transition-transform transform hover:scale-110"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}

              <Search size={24} className="text-[#F5C400] mr-4 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onPaste={handlePaste}
                placeholder="Pregunta o pega una imagen (CTRL+V)..."
                className="w-full bg-transparent border-none outline-none text-white text-xl placeholder:text-white/30 font-light"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                  className="p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/10 shrink-0"
                >
                  <X size={20} />
                </button>
              )}
              {chatHistory.length > 0 && (
                <button
                  type="button"
                  onClick={() => { setChatHistory([]); inputRef.current?.focus(); }}
                  className="p-2 ml-1 text-white/30 hover:text-red-400 transition-colors rounded-full hover:bg-red-500/10 shrink-0"
                  title="Limpiar Chat"
                >
                  <Trash2 size={18} />
                </button>
              )}
              <div className="hidden sm:flex items-center ml-4 px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-mono tracking-widest border border-white/10 gap-1 shrink-0">
                <Command size={10} /> K
              </div>
            </form>

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
