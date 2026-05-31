import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';

const VideoBackground = ({ src, isActive, poster, onVideoEnded }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isLoaded) {
        videoRef.current.play().catch(e => {
          console.log('Autoplay play error on activation:', e);
        });
      } else if (!isActive) {
        videoRef.current.pause();
      }
    }
  }, [isActive, isLoaded]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(e => {
        console.log('Autoplay play error on loaded data:', e);
      });
    }
  };

  // Removemos el seek #t=0.001 para evitar stutters y freezes al iniciar en Chrome
  const optimizedSrc = src;
  const defaultPoster = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=50';
  const posterUrl = poster || defaultPoster;

  return (
    <div className="relative w-full h-full bg-[#0a0f14] overflow-hidden">
      {/* 1. Miniatura Estática de Precarga (Sin filtro de brillo estático para que responda 100% al slider de opacidad general) */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
          isLoaded ? 'opacity-0 scale-95 blur-md pointer-events-none' : 'opacity-100 scale-100 blur-0'
        }`}
        style={{ 
          backgroundImage: `url(${posterUrl})`
        }}
      />

      {/* 2. Video de Fondo */}
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay={isActive}
        preload={isActive ? "auto" : "metadata"}
        onLoadedData={handleLoadedData}
        onEnded={onVideoEnded}
        className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'
        }`}
        src={optimizedSrc}
      />

      {/* 3. Indicador de Carga Optimizado (Pill de Esquina) */}
      {!isLoaded && (
        <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 select-none animate-pulse">
          <div className="w-3.5 h-3.5 border-2 border-[#FFD700]/30 border-t-[#FFD700] rounded-full animate-spin"></div>
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-wider">Sincronizando...</span>
        </div>
      )}
    </div>
  );
};


const HeroSection = () => {
  const { cmsState, isEditorMode, updatePageModule, syncToCloud } = useCMS();

  // Extraemos datos del CMS
  const homePage = cmsState.pages.find(p => p.id === 'home');
  const heroModule = homePage?.modules.find(m => m.id === 'hero-1') || {};

  // Retro-compatibility handling
  const legacyData = heroModule.data || {};
  const defaultSlides = [
    {
      id: 'slide-1',
      title1: legacyData.title1 || 'Soluciones Industriales',
      title2: legacyData.title2 || 'de Alta Ingeniería',
      subtitle: legacyData.subtitle || 'Maquinaria avanzada para reciclaje, procesamiento de alimentos y automatización industrial.',
      backgroundMedia: legacyData.backgroundMedia || 'https://horizons-cdn.hostinger.com/97ce7f08-d33c-4278-88dd-69ce1a127c81/2a7549f6d515bf92a288feb2d14143f3.png',
      overlayOpacity: legacyData.overlayOpacity ?? 50
    }
  ];

  const slides = heroModule.data?.slides || defaultSlides;

  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingPoster, setIsUploadingPoster] = useState(false);
  const [showIntro, setShowIntro] = useState(!isEditorMode);
  const fileInputRef = useRef(null);
  const posterInputRef = useRef(null);

  useEffect(() => {
    if (isEditorMode) return;
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4200);
    return () => clearTimeout(timer);
  }, [isEditorMode]);

  // Ensure currentSlideIdx is valid
  const activeIndex = Math.min(currentSlideIdx, slides.length - 1 < 0 ? 0 : slides.length - 1);
  const activeSlide = slides[activeIndex];

  const title1Lines = ((activeSlide && activeSlide.title1) || '').split('\n').filter(line => line.trim() !== '');
  const title2Lines = ((activeSlide && activeSlide.title2) || '').split('\n').filter(line => line.trim() !== '');

  const slideDuration = heroModule.data?.slideDuration ?? 3;

  // Auto-play timer (only for images, suspended when active slide is a video)
  useEffect(() => {
    if (isEditorMode) return; // Disable auto-play in editor mode
    
    const bgMedia = activeSlide?.backgroundMedia || '';
    const isVideo = !!(bgMedia.match(/\.(mp4|webm|ogg|mov|mkv)$/i) || bgMedia.includes('video/'));
    
    if (isVideo) {
      // Natural video length handles the transition, suspend interval!
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % slides.length);
    }, slideDuration * 1000);
    return () => clearInterval(timer);
  }, [slides.length, isEditorMode, activeSlide, slideDuration]);

  const handleVideoEnded = useCallback(() => {
    if (isEditorMode) return;
    setCurrentSlideIdx((prev) => (prev + 1) % slides.length);
  }, [slides.length, isEditorMode]);

  const updateSlides = useCallback((newSlides) => {
    updatePageModule('home', 'hero-1', { slides: newSlides });
  }, [updatePageModule]);

  const addSlide = useCallback(() => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      title1: 'Nuevo Título',
      title2: 'Principal',
      subtitle: 'Descripción breve de este nuevo banner industrial.',
      backgroundMedia: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      overlayOpacity: 50
    };
    const newSlides = [...slides, newSlide];
    updateSlides(newSlides);
    setCurrentSlideIdx(slides.length);
  }, [slides, updateSlides]);

  const handleNext = useCallback(() => {
    if (isEditorMode && activeIndex === slides.length - 1) {
      addSlide();
    } else {
      setCurrentSlideIdx((prev) => (prev + 1) % slides.length);
    }
  }, [slides.length, isEditorMode, activeIndex, addSlide]);

  const handlePrev = useCallback(() => {
    setCurrentSlideIdx((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleMediaChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUploading(true);
        const url = await uploadFile(file, "media");
        const newSlides = [...slides];
        newSlides[activeIndex] = { ...activeSlide, backgroundMedia: url };
        updateSlides(newSlides);
        
        // Auto-save instantly to cloud using the override state to bypass React async delay
        const nextState = {
          ...cmsState,
          pages: cmsState.pages.map(page => {
            if (page.id === 'home') {
              return {
                ...page,
                modules: page.modules.map(mod => {
                  if (mod.id === 'hero-1') {
                    return { ...mod, data: { ...mod.data, slides: newSlides } };
                  }
                  return mod;
                })
              };
            }
            return page;
          })
        };
        await syncToCloud(nextState);
        alert("¡Archivo de fondo subido y guardado permanentemente en la nube!");
      } catch (err) {
        console.error("Error al subir video/imagen:", err);
        alert('No se pudo subir el archivo. Verifica tu conexión.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handlePosterChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUploadingPoster(true);
        const url = await uploadFile(file, "media");
        const newSlides = [...slides];
        newSlides[activeIndex] = { ...activeSlide, posterUrl: url };
        updateSlides(newSlides);

        // Auto-save instantly to cloud using the override state
        const nextState = {
          ...cmsState,
          pages: cmsState.pages.map(page => {
            if (page.id === 'home') {
              return {
                ...page,
                modules: page.modules.map(mod => {
                  if (mod.id === 'hero-1') {
                    return { ...mod, data: { ...mod.data, slides: newSlides } };
                  }
                  return mod;
                })
              };
            }
            return page;
          })
        };
        await syncToCloud(nextState);
        alert("¡Miniatura subida y guardada permanentemente en la nube!");
      } catch (err) {
        console.error("Error al subir poster:", err);
        alert('No se pudo subir la miniatura. Verifica tu conexión.');
      } finally {
        setIsUploadingPoster(false);
      }
    }
  };

  const removeSlide = () => {
    if (slides.length <= 1) {
      alert("No puedes borrar el único banner.");
      return;
    }
    const newSlides = slides.filter((_, i) => i !== activeIndex);
    updateSlides(newSlides);
    setCurrentSlideIdx(0);
  };

  const handleSlideChange = (key, value) => {
    const newSlides = [...slides];
    newSlides[activeIndex] = { ...activeSlide, [key]: value };
    updateSlides(newSlides);
  };

  const currentBgMedia = activeSlide?.backgroundMedia || '';
  const isVideoCurrent = !!(currentBgMedia.match(/\.(mp4|webm|ogg|mov|mkv)$/i) || currentBgMedia.includes('video/'));

  return (
    <section id="inicio" className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">

      {/* 0. CINEMATIC THINK DESIGN AUTOMATE INTRO OVERLAY */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-black z-[90] flex flex-col items-center justify-center select-none"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              {/* THINK. */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                className="text-white font-black text-5xl md:text-7xl tracking-tighter uppercase leading-none m-0 p-0"
              >
                THINK.
              </motion.h1>

              {/* DESIGN. */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                className="text-transparent bg-clip-text bg-gradient-to-b from-[#A1A8B3] via-[#8d94a0] to-[#606773] font-black text-5xl md:text-7xl tracking-tighter uppercase leading-none m-0 p-0"
              >
                DESIGN.
              </motion.h1>

              {/* AUTOMATE. + PULSING LED */}
              <div className="flex items-center gap-4 relative justify-center">
                <motion.h1
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.0, duration: 0.6, ease: "easeOut" }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C400] via-yellow-400 to-[#F5C400] drop-shadow-[0_0_30px_rgba(245,196,0,0.25)] font-black text-5xl md:text-7xl tracking-tighter uppercase leading-none m-0 p-0"
                >
                  AUTOMATE.
                </motion.h1>
                
                {/* Green Pulsing LED next to AUTOMATE. */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.3, duration: 0.4 }}
                  className="relative flex items-center justify-center w-10 h-10 border border-white/10 rounded-full bg-black/60 shadow-xl"
                >
                  <div className="absolute w-4 h-4 bg-[#39FF14] rounded-full animate-ping opacity-60"></div>
                  <div className="relative w-3.5 h-3.5 bg-[#39FF14] rounded-full shadow-[0_0_12px_#39FF14]"></div>
                </motion.div>
              </div>

              {/* Sub-line bar indicator */}
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 100, opacity: 1 }}
                transition={{ delay: 2.6, duration: 0.6 }}
                className="h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400] mt-6"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editor Upload Overlay */}
      {isEditorMode && (
        <div className="absolute top-20 right-10 z-[100] flex flex-col items-end gap-4">
          {/* Banner Controls */}
          <div className="bg-[#1A1A1A]/95 p-3 rounded-xl border border-[#333] shadow-2xl backdrop-blur-md flex flex-col gap-3 w-max">
            <div className="flex flex-col items-center gap-1 justify-center mb-1">
              <span className="text-white/70 text-xs font-bold uppercase tracking-wider">Banner {activeIndex + 1} de {slides.length}</span>
              {activeIndex > 0 && (
                <button
                  onClick={() => setCurrentSlideIdx(0)}
                  className="text-[#FFD700] hover:text-white transition-colors text-[9px] uppercase font-black tracking-wider flex items-center gap-1 justify-center mt-0.5"
                  title="Regresar al Primer Banner"
                >
                  ⬅ Regresar al Inicio
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={addSlide} className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors flex items-center justify-center" title="Añadir nuevo banner">
                <Plus size={18} />
              </button>
              <button onClick={removeSlide} className="bg-red-500/20 hover:bg-red-500/40 text-red-500 p-2 rounded-lg transition-colors flex items-center justify-center" title="Eliminar este banner">
                <Trash2 size={18} />
              </button>
              <div className="w-[1px] h-6 bg-white/20 mx-1" />
              <input type="file" accept="image/*,video/*" className="hidden" ref={fileInputRef} onChange={handleMediaChange} />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-[#FFD700] hover:brightness-110 text-black px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.3)] flex items-center gap-2 transition-all font-bold text-sm"
              >
                {isUploading ? (
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <ImageIcon size={18} />
                )}
                <span>Subir Fondo</span>
              </button>
            </div>

            {isVideoCurrent && (
              <div className="flex flex-col gap-1.5 mt-1 pt-2 border-t border-white/10 w-full">
                <span className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Miniatura de Precarga</span>
                <input type="file" accept="image/*" className="hidden" ref={posterInputRef} onChange={handlePosterChange} />
                <button
                  onClick={() => posterInputRef.current?.click()}
                  disabled={isUploadingPoster}
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-all font-bold text-xs flex items-center gap-2 justify-center w-full"
                >
                  {isUploadingPoster ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <ImageIcon size={14} />
                  )}
                  <span>{activeSlide.posterUrl ? 'Cambiar Miniatura' : 'Subir Miniatura'}</span>
                </button>
              </div>
            )}

            <div className="flex flex-col gap-1 mt-2">
              <span className="text-white/50 text-[10px] uppercase">Oscuridad ({activeSlide.overlayOpacity ?? 50}%)</span>
              <input
                type="range"
                min="0" max="95"
                value={activeSlide.overlayOpacity ?? 50}
                onChange={(e) => handleSlideChange('overlayOpacity', Number(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
              />
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <span className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Intervalo Banner ({slideDuration}s)</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1" max="15" step="1"
                  value={slideDuration}
                  onChange={(e) => {
                    updatePageModule('home', 'hero-1', { slideDuration: Number(e.target.value) });
                  }}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
                />
                <span className="text-[#FFD700] text-xs font-bold w-6 text-right">{slideDuration}s</span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/10 my-1" />

            <button
              onClick={async () => {
                try {
                  await syncToCloud();
                  alert("¡Guardado Exitoso! Los cambios se han guardado permanentemente en la nube.");
                } catch (e) {
                  alert("Error al guardar: " + e.message);
                }
              }}
              className="bg-green-600 hover:bg-green-500 text-white font-bold text-[11px] uppercase tracking-wider py-2.5 px-3 rounded-lg flex items-center gap-2 justify-center w-full transition-colors shadow-[0_0_15px_rgba(22,163,74,0.3)] hover:shadow-[0_0_25px_rgba(22,163,74,0.5)] cursor-pointer"
              title="Guardar todos los cambios del sitio permanentemente en la nube"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.3-2-1.5-3.8-3.4-4.5-1.2-2.2-3.6-3.6-6.1-3.5-3.4.1-6.3 2.7-6.8 6.1-.2 1.3-.1 2.6.4 3.8"></path>
                <path d="M16 16l-4-4-4 4"></path>
                <path d="M12 12v9"></path>
              </svg>
              <span>Guardar en Nube</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 md:left-16 z-50 flex items-center px-4 w-24 pointer-events-none">
        <button
          onClick={handlePrev}
          className="pointer-events-auto bg-black/30 hover:bg-[#FFD700] text-white hover:text-black w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all border border-white/10 hover:border-[#FFD700] hover:scale-110"
        >
          <ChevronLeft size={28} className="mr-1" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 z-50 flex items-center justify-end px-4 w-24 h-full pointer-events-none">
        <button
          onClick={handleNext}
          className="pointer-events-auto bg-black/30 hover:bg-[#FFD700] text-white hover:text-black w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all border border-white/10 hover:border-[#FFD700] hover:scale-110"
        >
          <ChevronRight size={28} className="ml-1" />
        </button>
      </div>

      {/* Background Media (All slides rendered, only active is visible) */}
      {slides.map((slide, index) => {
        const bgMedia = slide.backgroundMedia;
        const isVideo = !!(bgMedia.match(/\.(mp4|webm|ogg|mov|mkv)$/i) || bgMedia.includes('video/'));
        const isActive = index === activeIndex;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-[#0a0f14] transition-opacity duration-1000 ease-in-out z-0 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            {isVideo ? (
              <VideoBackground src={bgMedia} isActive={isActive} poster={slide.posterUrl} onVideoEnded={handleVideoEnded} />
            ) : (
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${bgMedia})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            )}
            {/* Dynamic Dark Overlay for each slide */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ backgroundColor: `rgba(0, 0, 0, ${(slide.overlayOpacity ?? 50) / 100})` }}
            />
          </div>
        );
      })}

      {/* Content Container (z-index: 2) */}
      <div className="relative z-[2] flex flex-col items-center text-center px-5 py-16 md:px-8 md:py-20 lg:px-10 lg:py-24 w-full max-w-[900px] mx-auto pointer-events-none">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center pointer-events-auto"
          >
            {/* Title */}
            <h1 className="font-black text-[36px] md:text-[54px] lg:text-[76px] leading-[1.05] tracking-tighter uppercase m-0 p-0">
              {isEditorMode ? (
                <motion.span
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-white block outline-dashed outline-1 outline-blue-400 p-1 cursor-text"
                  contentEditable={isEditorMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleSlideChange('title1', e.target.innerText)}
                >
                  {activeSlide.title1}
                </motion.span>
              ) : (
                <span className="block">
                  {title1Lines.map((line, idx) => (
                    <motion.span
                      key={`t1-${idx}`}
                      initial={{ opacity: 0, y: -45 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.22 }}
                      className="text-white block"
                    >
                      {line}
                    </motion.span>
                  ))}
                </span>
              )}

              {isEditorMode ? (
                <motion.span
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  className="text-[#FFD700] block outline-dashed outline-1 outline-blue-400 p-1 mt-1 cursor-text"
                  contentEditable={isEditorMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleSlideChange('title2', e.target.innerText)}
                >
                  {activeSlide.title2}
                </motion.span>
              ) : (
                <span className="block mt-1">
                  {title2Lines.map((line, idx) => {
                    const delay = (title1Lines.length + idx) * 0.22;
                    return (
                      <motion.span
                        key={`t2-${idx}`}
                        initial={{ opacity: 0, y: -45 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
                        className="text-[#FFD700] block"
                      >
                        {line}
                      </motion.span>
                    );
                  })}
                </span>
              )}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (title1Lines.length + title2Lines.length) * 0.22 + 0.1 }}
              className={`text-[#D0D0D0] font-normal text-[14px] md:text-[16px] lg:text-[18px] leading-[1.6] mt-6 max-w-[700px] m-0 p-0 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 cursor-text' : ''}`}
              contentEditable={isEditorMode}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleSlideChange('subtitle', e.target.innerText)}
            >
              {activeSlide.subtitle}
            </motion.p>


          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;
