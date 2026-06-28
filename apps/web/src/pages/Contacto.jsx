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
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-start px-[40px] border-b border-white/5 bg-gradient-to-b from-[#080b12] to-[#030712] overflow-hidden pt-20">
          {/* Sci-fi tech grid background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(249,115,22,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#F97316]/5 rounded-full filter blur-[120px] pointer-events-none z-[1]" />
          
          <div className="max-w-[1400px] w-full mx-auto relative z-10 flex items-stretch justify-start">
            {/* Animated Vertical Line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-[4px] bg-[#F97316] shadow-[0_0_15px_#F97316] origin-top shrink-0"
            />
            
            <div className="pl-6 md:pl-10 flex flex-col items-start gap-4 py-2">
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-[#F97316] font-mono">
                [ ATENCION_GLOBAL ]
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-[75px] font-black tracking-tight leading-none uppercase font-sans">
                <DecipherText text="CONTACTO" delay={200} />
              </h1>
              <p className="text-white/60 text-sm md:text-base tracking-wide max-w-[600px] font-mono mt-2 uppercase">
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
