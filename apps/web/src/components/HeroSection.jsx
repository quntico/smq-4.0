import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';

const VideoBackground = ({ src, isActive }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      // Forzar la reproducción programáticamente (salta bloqueos de navegador y retrasos de render)
      videoRef.current.play().catch(e => console.log('Autoplay prevent or delayed:', e));
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive, src]);

  // Se añade #t=0.001 para que Safari y Chrome carguen el primer cuadro INSTANTÁNEAMENTE antes de decodificar todo el buffer.
  const optimizedSrc = src.includes('#') ? src : `${src}#t=0.001`;

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload={isActive ? "auto" : "metadata"}
      className="w-full h-full object-cover"
      src={optimizedSrc}
    />
  );
};

const HeroSection = () => {
  const { cmsState, isEditorMode, updatePageModule } = useCMS();

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
  const fileInputRef = useRef(null);

  // Ensure currentSlideIdx is valid
  const activeIndex = Math.min(currentSlideIdx, slides.length - 1 < 0 ? 0 : slides.length - 1);
  const activeSlide = slides[activeIndex];

  // Auto-play timer
  useEffect(() => {
    if (isEditorMode) return; // Disable auto-play in editor mode
    const timer = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % slides.length);
    }, 8000); // 8 seconds per slide
    return () => clearInterval(timer);
  }, [slides.length, isEditorMode]);

  const handleNext = useCallback(() => {
    setCurrentSlideIdx((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentSlideIdx((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const updateSlides = (newSlides) => {
    updatePageModule('home', 'hero-1', { slides: newSlides });
  };

  const handleMediaChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUploading(true);
        const url = await uploadFile(file, "media");
        const newSlides = [...slides];
        newSlides[activeIndex] = { ...activeSlide, backgroundMedia: url };
        updateSlides(newSlides);
      } catch (err) {
        console.error("Error al subir video/imagen:", err);
        alert('No se pudo subir el archivo. Verifica tu conexión.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const addSlide = () => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      title1: 'Nuevo Título',
      title2: 'Principal',
      subtitle: 'Descripción breve de este nuevo banner industrial.',
      backgroundMedia: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      overlayOpacity: 50
    };
    updateSlides([...slides, newSlide]);
    setCurrentSlideIdx(slides.length);
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

  return (
    <section id="inicio" className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">

      {/* Editor Upload Overlay */}
      {isEditorMode && (
        <div className="absolute top-20 right-10 z-[100] flex flex-col items-end gap-4 animate-bounce hover:animate-none">
          {/* Banner Controls */}
          <div className="bg-[#1A1A1A]/95 p-3 rounded-xl border border-[#333] shadow-2xl backdrop-blur-md flex flex-col gap-3 w-max">
            <div className="flex items-center gap-3 justify-center mb-1">
              <span className="text-white/70 text-xs font-bold uppercase tracking-wider">Banner {activeIndex + 1} de {slides.length}</span>
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
          </div>
        </div>
      )}

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 z-50 flex items-center px-4 w-24">
        <button
          onClick={handlePrev}
          className="bg-black/30 hover:bg-[#FFD700] text-white hover:text-black w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all border border-white/10 hover:border-[#FFD700] hover:scale-110"
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
              <VideoBackground src={bgMedia} isActive={isActive} />
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
              className="absolute inset-0"
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
            <h1 className="font-bold text-[36px] md:text-[48px] lg:text-[72px] leading-[1.2] tracking-[-0.5px] m-0 p-0">
              <span
                className={`text-white block ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 cursor-text' : ''}`}
                contentEditable={isEditorMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleSlideChange('title1', e.target.innerText)}
              >
                {activeSlide.title1}
              </span>
              <span
                className={`text-[#FFD700] block ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 mt-1 cursor-text' : ''}`}
                contentEditable={isEditorMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleSlideChange('title2', e.target.innerText)}
              >
                {activeSlide.title2}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-[#D0D0D0] font-normal text-[14px] md:text-[16px] lg:text-[18px] leading-[1.6] mt-6 max-w-[700px] m-0 p-0 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 cursor-text' : ''}`}
              contentEditable={isEditorMode}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleSlideChange('subtitle', e.target.innerText)}
            >
              {activeSlide.subtitle}
            </p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mt-10 flex-wrap justify-center">
              <button className="bg-[#FFD700] text-black px-8 py-3.5 rounded-md font-semibold text-[14px] hover:brightness-110 transition-all duration-200 shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                Explorar Maquinaria →
              </button>
              <button className="bg-transparent border border-[#FFD700] text-[#FFD700] px-8 py-3.5 rounded-md font-semibold text-[14px] hover:bg-[#FFD700]/10 hover:border-white transition-all duration-200">
                ⚙ Configurar Planta
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;
