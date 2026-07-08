import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContactSection from '@/components/ContactSection.jsx';
import DecipherText from '@/components/DecipherText.jsx';
import CompanySectionsNav from '@/components/CompanySectionsNav.jsx';
import HeroBackgroundEditor from '@/components/HeroBackgroundEditor.jsx';

const Carrera = () => {
  return (
    <>
      <Helmet>
        <title>Carreras Profesionales | SMQ 4.0</title>
        <meta name="description" content="Únete al equipo global de ingeniería, desarrollo de software y manufactura avanzada de Grupo SMQ." />
      </Helmet>

      <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans select-none overflow-x-hidden">
        {/* HERO SECTION */}
        <section className="relative flex flex-col justify-center px-[40px] md:px-[80px] border-b border-white/5 bg-[#030712] overflow-hidden pt-28 pb-6 z-10">
          <HeroBackgroundEditor 
            pageId="carrera" 
            defaultMedia="" 
            defaultOpacity={10} 
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#080b12] to-[#030712] z-0" style={{ opacity: 0.9 }} />
          {/* Sci-fi tech grid background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(236,72,153,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#EC4899]/5 rounded-full filter blur-[120px] pointer-events-none z-[1]" />
          
          <div className="max-w-[1400px] w-full mx-auto relative z-10 flex items-stretch justify-start">
            {/* Animated Vertical Line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-[4px] bg-[#EC4899] shadow-[0_0_15px_#EC4899] origin-top shrink-0"
            />
            
            <div className="pl-6 md:pl-10 flex flex-col items-start gap-4 py-2">
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-[#EC4899] font-mono">
                [ UNETE_AL_EQUIPO ]
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-[75px] font-black tracking-tight leading-none uppercase font-sans">
                <DecipherText text="CARRERA" delay={200} />
              </h1>
              <p className="text-white/60 text-sm tracking-wide max-w-[600px] font-mono mt-1 uppercase">
                Buscamos ingenieros en mecatrónica, programadores de PLC, diseñadores mecánicos CAD y líderes de proyectos industriales.
              </p>
            </div>
          </div>

          {/* Futuristic corner brackets */}
          <div className="absolute top-24 left-8 w-4 h-4 border-t-2 border-l-2 border-[#EC4899]/30" />
          <div className="absolute top-24 right-8 w-4 h-4 border-t-2 border-r-2 border-[#EC4899]/30" />
        </section>

        {/* CARRERA DETAILS */}
        <section className="py-8 px-[40px] md:px-[80px] relative border-b border-white/5 bg-[#030712] flex-1 flex flex-col justify-center">
          <div className="max-w-[1000px] w-full mx-auto text-center flex flex-col items-center gap-4">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#EC4899]">Oportunidades</span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight uppercase">
              DESARROLLA EL FUTURO DE LA INGENIERÍA
            </h2>
            <div className="w-20 h-[2px] bg-[#EC4899] shadow-[0_0_8px_#EC4899] my-1" />
            
            <p className="text-[#A1A8B3] text-sm md:text-sm leading-relaxed max-w-[750px]">
              Forma parte de un equipo de ingenieros dedicados a resolver desafíos complejos en automatización e integración de maquinaria industrial. Ofrecemos un plan de desarrollo continuo, capacitación constante en tecnologías emergentes y participación en proyectos internacionales de gran escala.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left mt-4">
              <div className="border border-white/5 bg-[#0e131b]/30 p-4 rounded-xl hover:bg-[#0e131b]/50 transition-colors">
                <h3 className="font-bold text-white mb-1.5 text-sm">Ingeniería Mecatrónica</h3>
                <p className="text-xs text-[#A1A8B3] leading-relaxed">Diseño, programación de PLC, parametrización de variadores de frecuencia y puesta en marcha en sitio.</p>
              </div>
              <div className="border border-white/5 bg-[#0e131b]/30 p-4 rounded-xl hover:bg-[#0e131b]/50 transition-colors">
                <h3 className="font-bold text-white mb-1.5 text-sm">Diseño Mecánico CAD</h3>
                <p className="text-xs text-[#A1A8B3] leading-relaxed">Modelado tridimensional de estructuras, desarrollo de planos de manufactura y simulación CAE.</p>
              </div>
              <div className="border border-white/5 bg-[#0e131b]/30 p-4 rounded-xl hover:bg-[#0e131b]/50 transition-colors">
                <h3 className="font-bold text-white mb-1.5 text-sm">Soporte Técnico</h3>
                <p className="text-xs text-[#A1A8B3] leading-relaxed">Diagnóstico remoto y presencial de fallas eléctricas, neumáticas y calibraciones ópticas en campo.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <a 
                href="/contacto"
                className="bg-[#EC4899] text-white font-bold text-xs tracking-[0.15em] uppercase py-3 px-8 rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_#EC4899]"
              >
                Enviar currículum
              </a>
            </div>
          </div>
        </section>

        {/* SECTIONS NAVIGATION */}
        <CompanySectionsNav />

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
};

export default Carrera;
