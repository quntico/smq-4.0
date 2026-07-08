import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import CustomCursor from '@/components/CustomCursor.jsx';
import HomePage from './pages/HomePage.jsx';
import AdminDashboard from '@/pages/AdminDashboard.jsx';
import TecnologiaDetalle from './pages/TecnologiaDetalle.jsx';
import Header from '@/components/Header.jsx';
import SideNav from '@/components/SideNav.jsx';
import { Toaster } from '@/components/ui/toaster';
import { CMSProvider } from '@/context/CMSContext.jsx';
import DynamicPage from '@/pages/DynamicPage.jsx';
import EnvasadoraDoypack from '@/pages/EnvasadoraDoypack.jsx';
import Nosotros from '@/pages/Nosotros.jsx';
import IndustriaDetalle from '@/pages/IndustriaDetalle.jsx';
import ScrollToTopButton from '@/components/ScrollToTopButton.jsx';
import MachineryDetailPage from '@/pages/MachineryDetailPage.jsx';
import WasteToEnergy from '@/pages/WasteToEnergy.jsx';
import Projects from '@/pages/Projects.jsx';
import Capacidades from '@/pages/Capacidades.jsx';
import Certificaciones from '@/pages/Certificaciones.jsx';
import Alianzas from '@/pages/Alianzas.jsx';
import Innovacion from '@/pages/Innovacion.jsx';
import Carrera from '@/pages/Carrera.jsx';
import Contacto from '@/pages/Contacto.jsx';

import { useCMS } from '@/context/CMSContext.jsx';
import { getOptimizedImageUrl } from '@/lib/utils.js';

function AppContent() {
  const { cmsState } = useCMS();

  React.useEffect(() => {
    // 1. Critical local images (kept minimal)
    const localImages = [
      '/nosotros_industrial_hero.png',
      '/nosotros_futuro_industrial.png'
    ];
    
    localImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // NOTE: Aggressive global preloading of all CMS images has been removed 
    // because it floods the browser's network queue and significantly slows down 
    // the loading of images on the active page.
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <ScrollToTopButton />
      <Header />
      <SideNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/industria/:sector" element={<IndustriaDetalle />} />
        <Route path="/industrias/:sector" element={<IndustriaDetalle />} />
        <Route path="/soluciones/:sector" element={<IndustriaDetalle />} />
        <Route path="/solucion/:sector" element={<IndustriaDetalle />} />
        <Route path="/tecnologia/:sector" element={<TecnologiaDetalle />} />
        <Route path="/envasadoras" element={<EnvasadoraDoypack />} />
        <Route path="/maquinaria/:machineId" element={<MachineryDetailPage />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/capacidades" element={<Capacidades />} />
        <Route path="/certificaciones" element={<Certificaciones />} />
        <Route path="/alianzas" element={<Alianzas />} />
        <Route path="/innovacion" element={<Innovacion />} />
        <Route path="/carrera" element={<Carrera />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/waste-to-energy" element={<WasteToEnergy />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/*" element={<DynamicPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

import { LanguageProvider } from '@/context/LanguageContext.jsx';

function App() {
  return (
    <LanguageProvider>
      <CMSProvider>
        <Router>
          <AppContent />
        </Router>
      </CMSProvider>
    </LanguageProvider>
  );
}

export default App;
