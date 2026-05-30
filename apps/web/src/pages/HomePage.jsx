
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import IndustriesSection from '@/components/IndustriesSection.jsx';
import CapabilitiesSection from '@/components/CapabilitiesSection.jsx';
import MachinerySection from '@/components/MachinerySection.jsx';
import SolutionsSection from '@/components/SolutionsSection.jsx';
import PlantVisualizerSection from '@/components/PlantVisualizerSection.jsx';
import IndustrialProjectsSection from '@/components/IndustrialProjectsSection.jsx';
import TechnologySection from '@/components/TechnologySection.jsx';
import ContactSection from '@/components/ContactSection.jsx';
import NosotrosSection from '@/components/NosotrosSection.jsx';

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
    // Reset back to 0 on trigger change
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
    return <span className="text-[#FFD700] tracking-wide animate-pulse">{target}</span>;
  }

  return <span>{count}{suffix}</span>;
};

const StatCard = ({ target, suffix = '', label, colSpan = "col-span-1" }) => {
  const [trigger, setTrigger] = useState(0);
  
  return (
    <div 
      className={`flex flex-col items-center self-center cursor-pointer transition-all duration-300 transform hover:scale-110 group ${colSpan}`}
      onMouseEnter={() => setTrigger(prev => prev + 1)}
    >
      <span className="text-3xl md:text-4xl font-black text-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,0.4)] tracking-tight transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
        <StatCounter target={target} suffix={suffix} trigger={trigger} />
      </span>
      <span className="text-[10px] font-black uppercase tracking-wider text-white/70 mt-2 transition-colors duration-300 group-hover:text-[#FFD700]">
        {label}
      </span>
    </div>
  );
};

const HomePage = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>SMQ Industrial Systems - Soluciones Industriales de Alta Ingeniería</title>
        <meta
          name="description"
          content="Maquinaria avanzada para reciclaje de plásticos, procesamiento de alimentos y automatización industrial. Soluciones completas con consultoría, instalación y mantenimiento."
        />
      </Helmet>

      <div className="min-h-screen bg-background pt-[100px]">
        <main>
          <HeroSection />

          <div className="md:pl-[76px] transition-all duration-300">
            <IndustriesSection />
            <NosotrosSection />
            <CapabilitiesSection />
            <MachinerySection />
            <SolutionsSection />
            <PlantVisualizerSection />
            <IndustrialProjectsSection />
            <TechnologySection />
            <ContactSection />
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;
