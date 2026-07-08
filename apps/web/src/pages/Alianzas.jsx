import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContactSection from '@/components/ContactSection.jsx';
import DecipherText from '@/components/DecipherText.jsx';
import CompanySectionsNav from '@/components/CompanySectionsNav.jsx';
import HeroBackgroundEditor from '@/components/HeroBackgroundEditor.jsx';

const Alianzas = () => {
  return (
    <>
      <Helmet>
        <title>Alianzas e Integraciones | SMQ 4.0</title>
        <meta name="description" content="Red global de socios tecnológicos e integradores de maquinaria industrial como Siemens, Rockwell, Festo y Fanuc." />
      </Helmet>

      <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans select-none overflow-x-hidden">
        {/* HERO SECTION */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-start px-[40px] border-b border-white/5 bg-[#030712] overflow-hidden pt-32 z-10">
          <HeroBackgroundEditor 
            pageId="alianzas" 
            defaultMedia="" 
            defaultOpacity={10} 
            fogGradient="bg-gradient-to-b from-[#080b12] to-[#030712]"
          />
          {/* Sci-fi tech grid background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(139,92,246,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full filter blur-[120px] pointer-events-none z-[1]" />
          
          <div className="max-w-[1400px] w-full mx-auto relative z-10 flex items-stretch justify-start">
            {/* Animated Vertical Line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-[4px] bg-[#8B5CF6] shadow-[0_0_15px_#8B5CF6] origin-top shrink-0"
            />
            
            <div className="pl-6 md:pl-10 flex flex-col items-start gap-4 py-2">
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-[#8B5CF6] font-mono">
                [ SOCIOS_Y_TECNOLOGIAS ]
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-[75px] font-black tracking-tight leading-none uppercase font-sans">
                <DecipherText text="ALIANZAS" delay={200} />
              </h1>
              <p className="text-white/60 text-sm md:text-base tracking-wide max-w-[600px] font-mono mt-2 uppercase">
                Colaboración estratégica con los fabricantes y proveedores de componentes líderes a nivel internacional.
              </p>
            </div>
          </div>

          {/* Futuristic corner brackets */}
          <div className="absolute top-24 left-8 w-4 h-4 border-t-2 border-l-2 border-[#8B5CF6]/30" />
          <div className="absolute top-24 right-8 w-4 h-4 border-t-2 border-r-2 border-[#8B5CF6]/30" />
        </section>

        {/* ALIANZAS GRID */}
        <section className="py-24 px-[40px] relative border-b border-white/5 bg-[#030712]">
          <div className="max-w-[1400px] w-full mx-auto">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Siemens Partner', type: 'PLC & AUTOMATION SYSTEM', desc: 'Soluciones integrales de hardware de control y buses de comunicación Profinet.', logo: '/alianzas/siemens.svg' },
                { name: 'Rockwell Integration', type: 'ALLEN-BRADLEY HARDWARE', desc: 'Desarrollo en arquitecturas Logix para sistemas redundantes de alta disponibilidad.', logo: '/alianzas/rockwell.svg' },
                { name: 'Festo Partner', type: 'PNEUMATICS & MOTION CONTROL', desc: 'Integración neumática proporcional de alta eficiencia y actuadores servocontrolados.', logo: '/alianzas/festo.svg' },
                { name: 'ABB Systems', type: 'DRIVES & INDUSTRIAL ROBOTICS', desc: 'Variadores de frecuencia regenerativos y controladores robóticos multieje.', logo: '/alianzas/abb.svg' },
                { name: 'Schneider Certified', type: 'POWER DISTRIBUTION & SAFETY', desc: 'Equipamiento electromecánico robusto y sistemas de seguridad intrínseca.', logo: '/alianzas/schneider.svg' },
                { name: 'Fanuc Integrator', type: 'ARTICULATED ROBOTIC ARMS', desc: 'Diseño de garras mecánicas y programación nativa para celdas robotizadas complejas.', logo: '/alianzas/fanuc.svg' }
              ].map((partner, index) => (
                <motion.div
                  key={index}
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-[#0e131b]/30 border border-white/5 rounded-xl p-6 flex flex-col justify-between min-h-[260px] transition-all duration-300 hover:border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/5 group cursor-pointer"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-full h-16 rounded bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#8B5CF6]/10 transition-all p-3">
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        className="max-h-full max-w-[65%] object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#8B5CF6] transition-colors text-center">{partner.name}</h3>
                    <p className="text-[10px] font-mono text-white/40 mt-1 uppercase tracking-wider text-center">{partner.type}</p>
                    <p className="text-xs text-[#A1A8B3] leading-relaxed mt-3 text-center">{partner.desc}</p>
                  </div>
                  <div className="text-[8px] font-mono text-[#8B5CF6]/70 mt-5 tracking-wider uppercase text-center">[ VERIFIED_INTEGRATION_PARTNER ]</div>
                </motion.div>
              ))}
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

export default Alianzas;
