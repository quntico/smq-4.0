import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import DecipherText from '@/components/DecipherText.jsx';
import CompanySectionsNav from '@/components/CompanySectionsNav.jsx';

const Capacidades = () => {
  return (
    <>
      <Helmet>
        <title>Capacidades Tecnológicas | SMQ 4.0</title>
        <meta name="description" content="Nuestra infraestructura de fabricación y alcance tecnológico en automatización, robótica, visión artificial e integración." />
      </Helmet>

      <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans select-none overflow-x-hidden">
        {/* HERO SECTION */}
        <section 
          className="relative h-[85vh] min-h-[600px] flex items-center justify-start px-[40px] md:px-[80px] border-b border-white/5 overflow-hidden pt-20"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(3, 7, 18, 0.95) 0%, rgba(3, 7, 18, 0.6) 45%, rgba(3, 7, 18, 0.1) 75%, transparent 100%), url('/capacidades_hero.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(249,115,22,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.15)_1px,transparent_1px)] bg-[size:30px_30px] z-[2]" />
          
          <div className="max-w-[1400px] w-full mx-auto relative z-10 flex items-stretch justify-start">
            {/* Sci-fi Left Bracket Design */}
            <div className="relative flex items-center justify-center mr-6 md:mr-8 shrink-0">
              {/* Outer orange line with horizontal endpoints */}
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-[2px] h-[300px] bg-gradient-to-b from-[#F59E0B] via-[#F97316] to-[#EF4444] shadow-[0_0_15px_rgba(249,115,22,0.5)] origin-center relative"
              >
                {/* Horizontal endpoints */}
                <div className="absolute top-0 left-0 w-3 h-[2px] bg-[#F59E0B]" />
                <div className="absolute bottom-0 left-0 w-3 h-[2px] bg-[#EF4444]" />
              </motion.div>
            </div>
            
            <div className="flex flex-col items-start justify-center gap-6 py-4">
              <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tight leading-none uppercase font-sans text-white">
                <DecipherText text="CAPACIDADES" delay={200} />
              </h1>
              
              <div className="flex flex-col gap-2">
                <p className="text-white/90 text-lg md:text-2xl font-medium tracking-wide uppercase">
                  Infraestructura de fabricación y alcance tecnológico
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#F59E0B] font-semibold text-sm md:text-lg tracking-widest uppercase">
                    Ingeniería
                  </span>
                  <span className="text-white/30 text-sm md:text-lg">•</span>
                  <span className="text-[#F59E0B] font-semibold text-sm md:text-lg tracking-widest uppercase">
                    Integración
                  </span>
                  <span className="text-white/30 text-sm md:text-lg">•</span>
                  <span className="text-[#F59E0B] font-semibold text-sm md:text-lg tracking-widest uppercase">
                    Ejecución
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Futuristic corner highlights */}
          <div className="absolute top-24 left-8 w-4 h-4 border-t-2 border-l-2 border-[#F59E0B]/30 pointer-events-none" />
          <div className="absolute top-24 right-8 w-4 h-4 border-t-2 border-r-2 border-[#F59E0B]/30 pointer-events-none" />
        </section>

        {/* SECTIONS NAVIGATION */}
        <CompanySectionsNav />

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
};

export default Capacidades;
