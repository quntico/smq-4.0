import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContactSection from '@/components/ContactSection.jsx';
import DecipherText from '@/components/DecipherText.jsx';
import CompanySectionsNav from '@/components/CompanySectionsNav.jsx';

const Contacto = () => {
  return (
    <>
      <Helmet>
        <title>Contacto y Ubicaciones | SMQ 4.0</title>
        <meta name="description" content="Ponte en contacto con el equipo de ingeniería de Grupo SMQ para asesoría técnica, ventas y cotización de proyectos." />
      </Helmet>

      <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans select-none overflow-x-hidden">
        {/* HERO SECTION */}
        <section 
          className="relative h-[65vh] min-h-[500px] flex items-center justify-start px-[40px] md:px-[80px] border-b border-white/5 overflow-hidden pt-20"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(3, 7, 18, 0.95) 0%, rgba(3, 7, 18, 0.7) 45%, rgba(3, 7, 18, 0.2) 75%, transparent 100%), url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(249,115,22,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.15)_1px,transparent_1px)] bg-[size:30px_30px] z-[2]" />
          
          <div className="max-w-[1400px] w-full mx-auto relative z-10 flex items-stretch justify-start">
            {/* Sci-fi Left Bracket Design */}
            <div className="relative flex items-center justify-center mr-6 md:mr-8 shrink-0">
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-[2px] h-[200px] bg-gradient-to-b from-[#F59E0B] via-[#F97316] to-[#EF4444] shadow-[0_0_15px_rgba(249,115,22,0.5)] origin-center relative"
              >
                <div className="absolute top-0 left-0 w-3 h-[2px] bg-[#F59E0B]" />
                <div className="absolute bottom-0 left-0 w-3 h-[2px] bg-[#EF4444]" />
              </motion.div>
            </div>
            
            <div className="flex flex-col items-start gap-4 py-2 justify-center">
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-[#F97316] font-mono">
                [ ATENCION_GLOBAL ]
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tight leading-none uppercase font-sans text-white">
                <DecipherText text="CONTACTO" delay={200} />
              </h1>
              <p className="text-white/80 text-lg md:text-xl tracking-wide max-w-[600px] font-sans mt-2">
                Oficinas de representación comercial y centros de servicio técnico para soporte local inmediato.
              </p>
            </div>
          </div>

          {/* Futuristic corner brackets */}
          <div className="absolute top-24 left-8 w-4 h-4 border-t-2 border-l-2 border-[#F97316]/30" />
          <div className="absolute top-24 right-8 w-4 h-4 border-t-2 border-r-2 border-[#F97316]/30" />
        </section>

        {/* CORE CONTACT FORM */}
        <div className="bg-[#030712] relative z-10">
          <ContactSection hideHeader={true} />
        </div>

        {/* SECTIONS NAVIGATION */}
        <CompanySectionsNav />

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
};

export default Contacto;
