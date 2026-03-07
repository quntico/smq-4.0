
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import CustomCursor from '@/components/CustomCursor.jsx';
import HomePage from './pages/HomePage.jsx';
import AdminDashboard from '@/pages/AdminDashboard.jsx';
import Header from '@/components/Header.jsx';
import { Toaster } from '@/components/ui/toaster';
import { CMSProvider } from '@/context/CMSContext.jsx';

function AppContent() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
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
