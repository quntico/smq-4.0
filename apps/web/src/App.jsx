
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

function AppContent() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Header />
      <SideNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/envasadoras" element={<EnvasadoraDoypack />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/*" element={<DynamicPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

function App() {
  return (
    <CMSProvider>
      <Router>
        <AppContent />
      </Router>
    </CMSProvider>
  );
}

export default App;
