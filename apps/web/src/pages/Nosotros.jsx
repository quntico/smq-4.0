import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Cpu, 
  Eye, 
  Settings, 
  Activity, 
  Zap, 
  Calendar,
  ChevronRight,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';
import Footer from '@/components/Footer.jsx';
import ContactSection from '@/components/ContactSection.jsx';
import { useCMS } from '@/context/CMSContext.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { uploadFile } from '@/lib/storage.js';
import DecipherText from '@/components/DecipherText.jsx';
import CompanySectionsNav from '@/components/CompanySectionsNav.jsx';
import HeroBackgroundEditor from '@/components/HeroBackgroundEditor.jsx';

// Reusable Stat Counter with Ease-Out Deceleration
const StatCounter = ({ target, suffix = '', duration = 2000, trigger = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const num = parseInt(target, 10);
    if (isNaN(num)) {
      setCount(target);
      return;
    }

    let start = 0;
    const end = num;
    setCount(0);

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOutQuad = percentage * (2 - percentage);
      const currentCount = Math.floor(easeOutQuad * (end - start) + start);
      
      setCount(currentCount);

      if (progress < duration) {
        window.requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const animId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animId);
  }, [target, duration, trigger]);

  const num = parseInt(target, 10);
  if (isNaN(num)) {
    return <span className="text-[#F5C400] tracking-wide animate-pulse">{target}</span>;
  }

  return <span>{count}{suffix}</span>;
};

// Reusable Stat Card
const StatCard = ({ target, suffix = '', label }) => {
  const [trigger, setTrigger] = useState(0);
  
  return (
    <div 
      className="flex flex-col items-center self-center cursor-pointer transition-all duration-300 transform hover:scale-110 group py-4 px-2"
      onMouseEnter={() => setTrigger(prev => prev + 1)}
    >
      <span className="text-3xl md:text-5xl font-black text-[#F5C400] drop-shadow-[0_0_12px_rgba(245,196,0,0.4)] tracking-tight transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
        <StatCounter target={target} suffix={suffix} trigger={trigger} />
      </span>
      <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-[#A1A8B3] mt-2 transition-colors duration-300 group-hover:text-[#F5C400]">
        {label}
      </span>
    </div>
  );
};

const Nosotros = () => {
  const { t } = useLanguage();
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('about.metaTitle')}</title>
        <meta
          name="description"
          content={t('about.metaDesc')}
        />
      </Helmet>

      <div className="min-h-screen bg-[#030712] text-white pt-[100px] overflow-x-hidden font-['Poppins']">
        <div className="md:pl-[76px] transition-all duration-300">
        {/* HERO SECTION */}
        <section 
          className="relative min-h-[60vh] md:min-h-[75vh] flex items-center justify-start pt-32 pb-20 px-8 md:px-16 lg:px-[80px] border-b border-white/5 overflow-hidden group bg-[#030712]"
        >
          {/* Dynamic Background */}
          <HeroBackgroundEditor 
            pageId="nosotros" 
            defaultMedia="https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780095574453_cajas%20fast%20webm.webm" 
            defaultOpacity={100} 
            fogGradient="bg-gradient-to-r from-[#030712] via-[#030712]/90 to-transparent"
          />
          
          {/* Tech Grid overlay for micro-telemetry feel */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-[1]" />
          <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#3B82F6]/5 rounded-full filter blur-[100px] pointer-events-none z-[1]" />

          <div className="max-w-[1400px] w-full mx-auto relative z-10 flex items-stretch justify-start">
            {/* Animated Vertical Line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-[4px] bg-[#3B82F6] shadow-[0_0_15px_#3B82F6] origin-top shrink-0"
            />
            
            <div className="pl-6 md:pl-10 flex flex-col items-start gap-4 md:gap-6 py-2">
              
              {/* Main Title - NOSOTROS */}
              <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tight text-white leading-none uppercase select-none font-sans drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <DecipherText text={t('about.title')} delay={200} />
              </h1>

              {/* Subtitle - Empresa integradora y desarrolladora... */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-white/95 text-base md:text-xl lg:text-2xl font-bold tracking-wide leading-relaxed max-w-[650px] font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              >
                {t('about.subtitle')}
              </motion.p>

              {/* Navigation links - Historia • Visión • Valores */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm font-bold uppercase tracking-wider text-white/50 mt-2 font-mono"
              >
                <a href="#historia" className="hover:text-[#3B82F6] hover:text-white transition-colors duration-300">{t('about.navHistory')}</a>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"></span>
                <a href="#mision" className="hover:text-[#3B82F6] hover:text-white transition-colors duration-300">{t('about.navMission')}</a>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"></span>
                <a href="#vision" className="hover:text-[#3B82F6] hover:text-white transition-colors duration-300">{t('about.navVision')}</a>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"></span>
                <a href="#valores" className="hover:text-[#3B82F6] hover:text-white transition-colors duration-300">{t('about.navValores')}</a>
              </motion.div>

            </div>
          </div>

          {/* Technical HUD details in corners to align with SMQ 4.0 style */}
          <div className="absolute bottom-6 right-8 z-10 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded font-mono text-[9px] text-white/50 select-none hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
            <span>{t('about.systemOnline')}</span>
          </div>
        </section>

        {/* STATS STRIP */}
        <section className="bg-[#030712] py-8 relative border-b border-white/5 mt-[-10px]">
          <div className="max-w-[1400px] mx-auto px-[40px] grid grid-cols-2 md:grid-cols-9 gap-4 text-center">
            
            <StatCard target="20" suffix="+" label={t('about.expYears')} />
            <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent hidden md:block self-center justify-self-center animate-pulse" />
            
            <StatCard target="500" suffix="+" label={t('about.equipments')} />
            <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent hidden md:block self-center justify-self-center animate-pulse" />
            
            <StatCard target="100" suffix="+" label={t('about.projects')} />
            <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent hidden md:block self-center justify-self-center animate-pulse" />
            
            <StatCard target="15" suffix="+" label={t('about.industries')} />
            <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent hidden md:block self-center justify-self-center animate-pulse" />
            
            <StatCard target="24/7" label={t('about.support')} colSpan="col-span-2 md:col-span-1" />

          </div>
        </section>

        {/* NUESTRA HISTORIA SECTION */}
        <section id="historia" className="py-24 px-[40px] relative border-b border-white/5 bg-[#030712]">
          <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left image */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
              <img 
                src="/nosotros_planta_moderna.png" 
                alt="Modern Industrial Plant Aerial View" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 z-20 bg-black/80 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-lg flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]"></span>
                <span className="text-[10px] text-white/90 font-mono tracking-wider">{t('about.productionPlant')}</span>
              </div>
            </motion.div>

            {/* Right text content */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start gap-6"
            >
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">{t('about.trajectory')}</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                {t('about.trajectoryTitle')}
              </h2>
              
              <div className="w-20 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400] mb-2" />

              <div className="flex flex-col gap-5 text-[#A1A8B3] text-base leading-relaxed">
                <p>
                  {t('about.trajectoryP1')}
                </p>
                <p>
                  {t('about.trajectoryP2')}
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* MISIÓN · VISIÓN · VALORES */}
        <section className="py-24 px-[40px] relative border-b border-white/5 bg-gradient-to-b from-[#030712] via-[#090e1b] to-[#030712]">
          <div className="max-w-[1400px] w-full mx-auto">
            
            {/* Header */}
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">{t('about.purpose')}</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{t('about.identity')}</h2>
              <div className="w-24 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Misión */}
              <motion.div 
                id="mision"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border-t border-l border-white/20 border-b border-r border-white/5 bg-[#0e131b]/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[300px] transition-all duration-300 hover:-translate-y-2 hover:border-[#F5C400]/40 group scroll-mt-24"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C400]/30 to-transparent" />
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#F5C400]/10 flex items-center justify-center border border-[#F5C400]/30 mb-6 group-hover:bg-[#F5C400]/20 transition-all duration-300 mx-auto">
                    <Cpu size={24} className="text-[#F5C400]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">{t('about.misionTitle')}</h3>
                  <p className="text-[#A1A8B3] text-sm leading-relaxed text-justify">
                    {t('about.misionDesc')}
                  </p>
                </div>
                <div className="text-[9px] font-mono text-white/30 mt-6 tracking-widest uppercase text-center">{t('about.misionLabel')}</div>
              </motion.div>

              {/* Visión */}
              <motion.div 
                id="vision"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="border-t border-l border-white/20 border-b border-r border-white/5 bg-[#0e131b]/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[300px] transition-all duration-300 hover:-translate-y-2 hover:border-[#06B6D4]/40 group scroll-mt-24"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#06B6D4]/30 to-transparent" />
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center border border-[#06B6D4]/30 mb-6 group-hover:bg-[#06B6D4]/20 transition-all duration-300 mx-auto">
                    <Eye size={24} className="text-[#06B6D4]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">{t('about.visionTitle')}</h3>
                  <p className="text-[#A1A8B3] text-sm leading-relaxed text-justify">
                    {t('about.visionDesc')}
                  </p>
                </div>
                <div className="text-[9px] font-mono text-white/30 mt-6 tracking-widest uppercase text-center">{t('about.visionLabel')}</div>
              </motion.div>

              {/* Valores */}
              <motion.div 
                id="valores"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="border-t border-l border-white/20 border-b border-r border-white/5 bg-[#0e131b]/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[300px] transition-all duration-300 hover:-translate-y-2 hover:border-[#10B981]/40 group scroll-mt-24"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#10B981]/30 to-transparent" />
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#10B981]/10 flex items-center justify-center border border-[#10B981]/30 mb-6 group-hover:bg-[#10B981]/20 transition-all duration-300 mx-auto">
                    <Shield size={24} className="text-[#10B981]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">{t('about.valoresTitle')}</h3>
                  
                  {/* Values grid */}
                  <div className="grid grid-cols-2 gap-3 max-w-[240px] mx-auto">
                    {['about.valoresList.0', 'about.valoresList.1', 'about.valoresList.2', 'about.valoresList.3', 'about.valoresList.4', 'about.valoresList.5'].map((key, i) => (
                      <div key={i} className="flex items-center gap-2 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        <span className="text-xs text-[#A1A8B3] font-bold group-hover:text-white transition-colors">{t(key)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[9px] font-mono text-white/30 mt-6 tracking-widest uppercase text-center">{t('about.valoresLabel')}</div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* TIMELINE CORPORATIVO */}
        <section className="py-24 px-[40px] relative border-b border-white/5 bg-[#030712] overflow-hidden">
          <div className="max-w-[1400px] w-full mx-auto">
            
            {/* Header */}
            <div className="flex flex-col items-center gap-4 text-center mb-20">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">{t('about.timelineLabel')}</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{t('about.timelineTitle')}</h2>
              <div className="w-24 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400]" />
            </div>

            {/* Horizontal Timeline Container */}
            <div className="relative">
              
              {/* Continuous Glowing Beam */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C400]/40 to-transparent -translate-y-1/2 z-0 hidden lg:block" />
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
                
                {/* 2005 */}
                <motion.div 
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center font-black text-lg text-white mb-6 shadow-xl relative z-10 transition-all duration-300 group-hover:border-[#F5C400] group-hover:shadow-[0_0_15px_#F5C400] group-hover:scale-110">
                    2005
                  </div>
                  <div className="lg:h-4 w-[1px] bg-[#F5C400]/30 hidden lg:block" />
                  <div className="bg-[#0e131b]/60 backdrop-blur-xl border border-white/5 rounded-xl p-5 shadow-lg max-w-[240px] mt-2 group-hover:border-white/20 transition-all">
                    <h4 className="font-bold text-sm text-[#F5C400] uppercase mb-1">{t('about.timeline.t2005Title')}</h4>
                    <p className="text-xs text-[#A1A8B3] leading-relaxed">{t('about.timeline.t2005Desc')}</p>
                  </div>
                </motion.div>

                {/* 2010 */}
                <motion.div 
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center font-black text-lg text-white mb-6 shadow-xl relative z-10 transition-all duration-300 group-hover:border-[#F5C400] group-hover:shadow-[0_0_15px_#F5C400] group-hover:scale-110">
                    2010
                  </div>
                  <div className="lg:h-4 w-[1px] bg-[#F5C400]/30 hidden lg:block" />
                  <div className="bg-[#0e131b]/60 backdrop-blur-xl border border-white/5 rounded-xl p-5 shadow-lg max-w-[240px] mt-2 group-hover:border-white/20 transition-all">
                    <h4 className="font-bold text-sm text-[#F5C400] uppercase mb-1">{t('about.timeline.t2010Title')}</h4>
                    <p className="text-xs text-[#A1A8B3] leading-relaxed">{t('about.timeline.t2010Desc')}</p>
                  </div>
                </motion.div>

                {/* 2015 */}
                <motion.div 
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center font-black text-lg text-white mb-6 shadow-xl relative z-10 transition-all duration-300 group-hover:border-[#F5C400] group-hover:shadow-[0_0_15px_#F5C400] group-hover:scale-110">
                    2015
                  </div>
                  <div className="lg:h-4 w-[1px] bg-[#F5C400]/30 hidden lg:block" />
                  <div className="bg-[#0e131b]/60 backdrop-blur-xl border border-white/5 rounded-xl p-5 shadow-lg max-w-[240px] mt-2 group-hover:border-white/20 transition-all">
                    <h4 className="font-bold text-sm text-[#F5C400] uppercase mb-1">{t('about.timeline.t2015Title')}</h4>
                    <p className="text-xs text-[#A1A8B3] leading-relaxed">{t('about.timeline.t2015Desc')}</p>
                  </div>
                </motion.div>

                {/* 2020 */}
                <motion.div 
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center font-black text-lg text-white mb-6 shadow-xl relative z-10 transition-all duration-300 group-hover:border-[#F5C400] group-hover:shadow-[0_0_15px_#F5C400] group-hover:scale-110">
                    2020
                  </div>
                  <div className="lg:h-4 w-[1px] bg-[#F5C400]/30 hidden lg:block" />
                  <div className="bg-[#0e131b]/60 backdrop-blur-xl border border-white/5 rounded-xl p-5 shadow-lg max-w-[240px] mt-2 group-hover:border-white/20 transition-all">
                    <h4 className="font-bold text-sm text-[#F5C400] uppercase mb-1">{t('about.timeline.t2020Title')}</h4>
                    <p className="text-xs text-[#A1A8B3] leading-relaxed">{t('about.timeline.t2020Desc')}</p>
                  </div>
                </motion.div>

                {/* 2025+ */}
                <motion.div 
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-black border border-[#F5C400] flex items-center justify-center font-black text-lg text-[#F5C400] mb-6 shadow-[0_0_15px_rgba(245,196,0,0.3)] relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_#F5C400]">
                    2025+
                  </div>
                  <div className="lg:h-4 w-[1px] bg-[#F5C400]/50 hidden lg:block" />
                  <div className="bg-[#0e131b]/90 border border-[#F5C400]/30 rounded-xl p-5 shadow-2xl max-w-[240px] mt-2 transition-all">
                    <h4 className="font-bold text-sm text-[#F5C400] uppercase mb-1">{t('about.timeline.t2025Title')}</h4>
                    <p className="text-xs text-white/95 leading-relaxed font-semibold">{t('about.timeline.t2025Desc')}</p>
                  </div>
                </motion.div>

              </div>

            </div>

          </div>
        </section>

        {/* FILOSOFÍA SECTION */}
        <section className="py-24 px-[40px] relative border-b border-white/5 bg-[#070b13] overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,196,0,0.03)_0%,transparent_70%)] pointer-events-none" />
          <div className="max-w-[1000px] mx-auto relative z-10 flex flex-col items-center gap-8">
            
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">{t('about.philosophyLabel')}</span>
            
            {/* Huge typographic visual */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-[#8d94a0] to-[#202530] leading-none uppercase select-none">
              {t('hero.think')}<br />
              {t('hero.design')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C400] via-yellow-400 to-[#F5C400] drop-shadow-[0_0_30px_rgba(245,196,0,0.15)] font-black">
                {t('hero.automate')}
              </span>
            </h2>

            <div className="w-24 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400] my-2" />

            <div className="flex flex-col gap-4 text-base md:text-lg text-[#A1A8B3] leading-relaxed max-w-[700px]">
              <p className="font-medium text-white">
                {t('about.philosophyP1')}
              </p>
              <p>
                {t('about.philosophyP2')}
              </p>
            </div>
          </div>
        </section>

        {/* BLOQUE FINAL */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/75 z-10 pointer-events-none" />
            <img 
              src="/nosotros_futuro_industrial.png" 
              alt="Futuristic Industrial Plant Background" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-20 max-w-[900px] mx-auto px-5 text-center flex flex-col items-center gap-6">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5C400]">{t('about.commitmentLabel')}</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight uppercase">
              {t('about.commitmentTitle')}
            </h2>
            <div className="w-20 h-[2px] bg-[#F5C400] shadow-[0_0_8px_#F5C400] my-2" />
            
            <div className="flex flex-col gap-3 text-base md:text-lg text-white/90 font-medium leading-relaxed">
              <p>{t('about.commitmentP1')}</p>
              <p className="text-[#A1A8B3] text-sm md:text-base font-normal">
                {t('about.commitmentP2')}
              </p>
            </div>

            <a 
              href="/contacto"
              className="bg-[#F5C400] text-black font-black text-xs tracking-[0.2em] uppercase py-4.5 px-10 rounded-lg shadow-[0_0_20px_rgba(245,196,0,0.3)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_25px_#F5C400] mt-6"
            >
              {t('about.talkToEngineer')}
            </a>
          </div>
        </section>

        {/* SECTIONS NAVIGATION */}
        <CompanySectionsNav />

        {/* FOOTER */}
        <Footer />
        </div>
      </div>
    </>
  );
};

export default Nosotros;
