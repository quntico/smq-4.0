import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContactSection from '@/components/ContactSection.jsx';
import DecipherText from '@/components/DecipherText.jsx';
import CompanySectionsNav from '@/components/CompanySectionsNav.jsx';

const Innovacion = () => {
  return (
    <>
      <Helmet>
        <title>Centros de Innovación I+D | SMQ 4.0</title>
        <meta name="description" content="Laboratorios de simulación avanzada, gemelos digitales y centros de I+D tecnológica de Grupo SMQ." />
      </Helmet>

      <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans select-none overflow-x-hidden">
        {/* HERO SECTION */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-start px-[40px] border-b border-white/5 bg-gradient-to-b from-[#080b12] to-[#030712] overflow-hidden pt-20">
          {/* Sci-fi tech grid background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#06B6D4]/5 rounded-full filter blur-[120px] pointer-events-none z-[1]" />
          
          <div className="max-w-[1400px] w-full mx-auto relative z-10 flex items-stretch justify-start">
            {/* Animated Vertical Line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-[4px] bg-[#06B6D4] shadow-[0_0_15px_#06B6D4] origin-top shrink-0"
            />
            
            <div className="pl-6 md:pl-10 flex flex-col items-start gap-4 py-2">
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-[#06B6D4] font-mono">
                [ INVESTIGACION_Y_DESARROLLO ]
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-[75px] font-black tracking-tight leading-none uppercase font-sans">
                <DecipherText text="INNOVACIÓN" delay={200} />
              </h1>
              <p className="text-white/60 text-sm md:text-base tracking-wide max-w-[600px] font-mono mt-2 uppercase">
                Laboratorios propios de simulación de procesos físicos y modelado digital de líneas de producción complejas.
              </p>
            </div>
          </div>

          {/* Futuristic corner brackets */}
          <div className="absolute top-24 left-8 w-4 h-4 border-t-2 border-l-2 border-[#06B6D4]/30" />
          <div className="absolute top-24 right-8 w-4 h-4 border-t-2 border-r-2 border-[#06B6D4]/30" />
        </section>

        {/* INNOVACIÓN CONTENT */}
        <section className="py-24 px-[40px] relative border-b border-white/5 bg-[#030712]">
          <div className="max-w-[1400px] w-full mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -50 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-start gap-6"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#06B6D4]">Próxima Generación</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight uppercase">
                  CENTROS DE INNOVACIÓN Y DESARROLLO (I+D)
                </h2>
                <div className="w-20 h-[2px] bg-[#06B6D4] shadow-[0_0_8px_#06B6D4] mb-2" />
                <div className="flex flex-col gap-5 text-[#A1A8B3] text-sm md:text-base leading-relaxed">
                  <p>
                    En SMQ no solo integramos tecnología existente; diseñamos las patentes e innovaciones que definirán la manufactura del mañana. Contamos con un laboratorio propio de simulación avanzada y pruebas de estrés mecánico.
                  </p>
                  <p className="border-l-2 border-[#06B6D4]/40 pl-4 italic">
                    Nuestra infraestructura de I+D permite simular el comportamiento de plantas completas mediante gemelos digitales y modelos en tiempo real antes de fabricar una sola pieza física.
                  </p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Gemelos Digitales',
                    desc: 'Simulaciones virtuales interactivas 3D que replican fielmente la física de las líneas de producción.'
                  },
                  {
                    title: 'Hardware-in-the-Loop',
                    desc: 'Pruebas de software de control conectando PLCs físicos a entornos simulados avanzados.'
                  },
                  {
                    title: 'IA y Visión Local',
                    desc: 'Desarrollo de algoritmos de deep learning que corren en edge devices dentro de la planta.'
                  },
                  {
                    title: 'Materiales Avanzados',
                    desc: 'Investigación en aleaciones de alta resistencia y tratamientos térmicos contra desgaste abrasivo.'
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="border border-white/5 bg-[#0e131b]/30 rounded-xl p-5 hover:border-[#06B6D4]/30 hover:bg-[#06B6D4]/5 transition-all group shadow-lg"
                  >
                    <h3 className="font-bold text-base text-white mb-2 group-hover:text-[#06B6D4] transition-colors">{item.title}</h3>
                    <p className="text-xs text-[#A1A8B3] leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

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

export default Innovacion;
