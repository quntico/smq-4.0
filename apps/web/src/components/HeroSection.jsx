import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { useCMS } from '@/context/CMSContext.jsx';

const HeroSection = () => {
  const { cmsState, isEditorMode, updatePageModule } = useCMS();

  // Extraemos datos del CMS
  const homePage = cmsState.pages.find(p => p.id === 'home');
  const heroModule = homePage?.modules.find(m => m.id === 'hero-1') || {};
  const { title1, title2, subtitle } = heroModule.data || {
    title1: 'Soluciones Industriales',
    title2: 'de Alta Ingeniería',
    subtitle: 'Maquinaria avanzada para reciclaje, procesamiento de alimentos y automatización industrial.'
  };

  const handleBlur = (key) => (e) => {
    const val = e.target.innerText;
    updatePageModule('home', 'hero-1', { [key]: val });
  };

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image (z-index: 0) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://horizons-cdn.hostinger.com/97ce7f08-d33c-4278-88dd-69ce1a127c81/2a7549f6d515bf92a288feb2d14143f3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Dark Overlay (z-index: 1) */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Content Container (z-index: 2) */}
      <div className="relative z-[2] flex flex-col items-center text-center px-5 py-16 md:px-8 md:py-20 lg:px-10 lg:py-24 w-full max-w-[900px] mx-auto">

        {/* Single Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-bold text-[36px] md:text-[48px] lg:text-[72px] leading-[1.2] tracking-[-0.5px] m-0 p-0"
        >
          <span
            className={`text-white block ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 cursor-text' : ''}`}
            contentEditable={isEditorMode}
            suppressContentEditableWarning={true}
            onBlur={handleBlur('title1')}
          >
            {title1}
          </span>
          <span
            className={`text-[#FFD700] block ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 mt-1 cursor-text' : ''}`}
            contentEditable={isEditorMode}
            suppressContentEditableWarning={true}
            onBlur={handleBlur('title2')}
          >
            {title2}
          </span>
        </motion.h1>

        {/* Single Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className={`text-[#D0D0D0] font-normal text-[14px] md:text-[16px] lg:text-[18px] leading-[1.6] mt-6 max-w-[700px] m-0 p-0 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 cursor-text' : ''}`}
          contentEditable={isEditorMode}
          suppressContentEditableWarning={true}
          onBlur={handleBlur('subtitle')}
        >
          {subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-4 mt-10 flex-wrap justify-center"
        >
          <button
            className="bg-[#FFD700] text-black px-8 py-3.5 rounded-md font-semibold text-[14px] hover:brightness-110 transition-all duration-200 shadow-[0_0_20px_rgba(255,215,0,0.3)]"
          >
            Explorar Maquinaria →
          </button>

          <button
            className="bg-transparent border border-[#FFD700] text-[#FFD700] px-8 py-3.5 rounded-md font-semibold text-[14px] hover:bg-[#FFD700]/10 hover:border-white transition-all duration-200"
          >
            ⚙ Configurar Planta
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
