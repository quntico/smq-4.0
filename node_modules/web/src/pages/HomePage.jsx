
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import IndustriesSection from '@/components/IndustriesSection.jsx';
import CapabilitiesSection from '@/components/CapabilitiesSection.jsx';
import ProjectsSection from '@/components/ProjectsSection.jsx';
import MachinerySection from '@/components/MachinerySection.jsx';
import SolutionsSection from '@/components/SolutionsSection.jsx';
import PlantVisualizerSection from '@/components/PlantVisualizerSection.jsx';
import PlantConfiguratorSection from '@/components/PlantConfiguratorSection.jsx';
import QuoteBuilderSection from '@/components/QuoteBuilderSection.jsx';
import IndustrialProjectsSection from '@/components/IndustrialProjectsSection.jsx';
import TechnologySection from '@/components/TechnologySection.jsx';
import ContactSection from '@/components/ContactSection.jsx';

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
          <IndustriesSection />
          <CapabilitiesSection />
          <ProjectsSection />
          <MachinerySection />
          <SolutionsSection />
          <PlantVisualizerSection />
          <PlantConfiguratorSection />
          <QuoteBuilderSection />
          <IndustrialProjectsSection />
          <TechnologySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
