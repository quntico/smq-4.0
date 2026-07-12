import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import DecipherText from '@/components/DecipherText.jsx';
import CompanySectionsNav from '@/components/CompanySectionsNav.jsx';
import HeroBackgroundEditor from '@/components/HeroBackgroundEditor.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';

const Innovacion = () => {
  const { t } = useLanguage();

  const innovationsList = [
    {
      title: t('innovacion.items.0.title'),
      desc: t('innovacion.items.0.desc')
    },
    {
      title: t('innovacion.items.1.title'),
      desc: t('innovacion.items.1.desc')
    },
    {
      title: t('innovacion.items.2.title'),
      desc: t('innovacion.items.2.desc')
    },
    {
      title: t('innovacion.items.3.title'),
      desc: t('innovacion.items.3.desc')
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('companyNav.items.innovacionTitle')} | SMQ 4.0</title>
        <meta name="description" content={t('companyNav.items.innovacionDesc')} />
      </Helmet>

      <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans select-none overflow-x-hidden">
        {/* MAIN INTEGRATED SECTION */}
        <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-[40px] border-b border-white/5 bg-[#030712] overflow-hidden pt-40 pb-16 z-10">
          <HeroBackgroundEditor 
            pageId="innovacion" 
            defaultMedia="" 
            defaultOpacity={10} 
            fogGradient="bg-gradient-to-b from-[#080b12] to-[#030712]"
          />
          {/* Sci-fi tech grid background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#06B6D4]/5 rounded-full filter blur-[120px] pointer-events-none z-[1]" />
          
          <div className="max-w-[1400px] w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Title & Description */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 flex items-stretch justify-start"
            >
              {/* Animated Vertical Line */}
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-[4px] bg-[#06B6D4] shadow-[0_0_15px_#06B6D4] origin-top shrink-0"
              />
              
              <div className="pl-6 md:pl-10 flex flex-col items-start gap-4 py-2">
                <span className="text-[11px] font-black uppercase tracking-[0.35em] text-[#06B6D4] font-mono">
                  {t('innovacion.subtitle')}
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-[70px] font-black tracking-tight leading-none uppercase font-sans">
                  <DecipherText text={t('innovacion.title')} delay={200} />
                </h1>
                <p className="text-[#06B6D4] text-[11px] font-black uppercase tracking-[0.3em] mt-2">
                  {t('innovacion.label')}
                </p>
                <div className="w-16 h-[2px] bg-[#06B6D4] shadow-[0_0_8px_#06B6D4] mb-2" />
                <div className="flex flex-col gap-4 text-[#A1A8B3] text-sm md:text-base leading-relaxed max-w-[550px]">
                  <p>
                    {t('innovacion.p1')}
                  </p>
                  <p className="border-l-2 border-[#06B6D4]/40 pl-4 italic text-sm">
                    {t('innovacion.p2')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {innovationsList.map((item, idx) => (
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

          {/* Futuristic corner brackets */}
          <div className="absolute top-28 left-8 w-4 h-4 border-t-2 border-l-2 border-[#06B6D4]/30 pointer-events-none" />
          <div className="absolute top-28 right-8 w-4 h-4 border-t-2 border-r-2 border-[#06B6D4]/30 pointer-events-none" />
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
