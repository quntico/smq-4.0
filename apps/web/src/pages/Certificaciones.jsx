import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContactSection from '@/components/ContactSection.jsx';
import DecipherText from '@/components/DecipherText.jsx';
import CompanySectionsNav from '@/components/CompanySectionsNav.jsx';
import HeroBackgroundEditor from '@/components/HeroBackgroundEditor.jsx';

const Certificaciones = () => {
  return (
    <>
      <Helmet>
        <title>Certificaciones Industriales | SMQ 4.0</title>
        <meta name="description" content="Estándares de calidad ISO, certificaciones de seguridad CE, UL y normativas internacionales de Grupo SMQ." />
      </Helmet>

      <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans select-none overflow-x-hidden">
        {/* HERO SECTION */}
        <section className="relative flex flex-col justify-center px-[40px] md:px-[80px] border-b border-white/5 bg-[#030712] overflow-hidden pt-40 pb-8 z-10">
          <HeroBackgroundEditor 
            pageId="certificaciones" 
            defaultMedia="" 
            defaultOpacity={10} 
            fogGradient="bg-gradient-to-b from-[#080b12] to-[#030712]"
          />
          {/* Sci-fi tech grid background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(16,185,129,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#10B981]/5 rounded-full filter blur-[120px] pointer-events-none z-[1]" />
          
          <div className="max-w-[1400px] w-full mx-auto relative z-10 flex items-stretch justify-start">
            {/* Animated Vertical Line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-[4px] bg-[#10B981] shadow-[0_0_15px_#10B981] origin-top shrink-0"
            />
            
            <div className="pl-6 md:pl-10 flex flex-col items-start gap-4 py-2">
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-[#10B981] font-mono">
                [ ESTANDARES_DE_CALIDAD ]
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-[75px] font-black tracking-tight leading-none uppercase font-sans">
                <DecipherText text="CERTIFICACIONES" delay={200} />
              </h1>
              <p className="text-white/60 text-sm tracking-wide max-w-[600px] font-mono mt-1 uppercase">
                Cumplimiento con normativas internacionales que respaldan la seguridad, calidad y confiabilidad de todos nuestros equipos industriales.
              </p>
            </div>
          </div>

          {/* Futuristic corner brackets */}
          <div className="absolute top-24 left-8 w-4 h-4 border-t-2 border-l-2 border-[#10B981]/30" />
          <div className="absolute top-24 right-8 w-4 h-4 border-t-2 border-r-2 border-[#10B981]/30" />
        </section>

        {/* CERTIFICACIONES GRID */}
        <section className="py-10 px-[40px] md:px-[80px] relative border-b border-white/5 bg-[#030712] z-10 flex-1 flex flex-col justify-center">
          <div className="max-w-[1400px] w-full mx-auto">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'ISO 9001:2015',
                  desc: 'Certificación internacional de sistemas de gestión de la calidad para el diseño, fabricación e integración de maquinaria industrial.',
                  badge: 'QMS_CERT_9001'
                },
                {
                  title: 'CE Compliance',
                  desc: 'Cumplimiento con las directivas de seguridad, salud y protección ambiental exigidas para la libre circulación en la Unión Europea.',
                  badge: 'EU_STANDARD_CE'
                },
                {
                  title: 'UL / CSA Panels',
                  desc: 'Ensambles de tableros de control eléctrico fabricados y certificados bajo normativas UL 508A para Norteamérica.',
                  badge: 'US_UL_CERT'
                },
                {
                  title: 'Normatividad NOM',
                  desc: 'Cumplimiento estricto con las Normas Oficiales Mexicanas de seguridad industrial, higiene y redes eléctricas.',
                  badge: 'MX_NOM_STANDARD'
                }
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border border-white/5 bg-[#0e131b]/40 backdrop-blur-xl rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[250px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#10B981]/40 group"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#10B981]/25 to-transparent" />
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center border border-[#10B981]/20 mb-4 group-hover:bg-[#10B981]/25 transition-all">
                      <Award size={20} className="text-[#10B981]" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>
                    <p className="text-xs text-[#A1A8B3] leading-relaxed">{cert.desc}</p>
                  </div>
                  <div className="text-[9px] font-mono text-white/30 mt-3 tracking-wider">{cert.badge}</div>
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

export default Certificaciones;
