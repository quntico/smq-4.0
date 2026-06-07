
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import CustomCursor from '@/components/CustomCursor.jsx';
import HomePage from './pages/HomePage.jsx';
import AdminDashboard from '@/pages/AdminDashboard.jsx';
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

import { useCMS } from '@/context/CMSContext.jsx';
import { getOptimizedImageUrl } from '@/lib/utils.js';

function AppContent() {
  const { cmsState } = useCMS();

  React.useEffect(() => {
    // 1. Critical local images
    const localImages = [
      '/nosotros_industrial_hero.png',
      '/nosotros_futuro_industrial.png',
      '/nosotros_planta_moderna.png',
      '/rotary_doypack_machine.png'
    ];
    
    localImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // 2. Preload dynamic CMS images in parallel
    if (cmsState?.pages) {
      cmsState.pages.forEach(page => {
        page.modules?.forEach(module => {
          // Check lists (collages, cards, grids)
          const items = module.data?.items || [];
          items.forEach(item => {
            const imgSrc = item.image || item.defaultImage || item.bgImage || item.imgUrl;
            if (imgSrc && typeof imgSrc === 'string') {
              const img = new Image();
              img.src = getOptimizedImageUrl(imgSrc, 800);
            }
          });

          // Check single dynamic images
          const singleImage = module.data?.backgroundMedia || module.data?.image || module.data?.bgImage;
          if (singleImage && typeof singleImage === 'string') {
            const img = new Image();
            img.src = getOptimizedImageUrl(singleImage, 1200);
          }
        });
      });
    }
  }, [cmsState]);

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
        <Route path="/soluciones/:sector" element={<IndustriaDetalle />} />
        <Route path="/solucion/:sector" element={<IndustriaDetalle />} />
        <Route path="/envasadoras" element={<EnvasadoraDoypack />} />
        <Route path="/maquinaria/:machineId" element={<MachineryDetailPage />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/waste-to-energy" element={<WasteToEnergy />} />
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
