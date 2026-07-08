import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Upload, Settings } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContactSection from '@/components/ContactSection.jsx';
import DecipherText from '@/components/DecipherText.jsx';
import CompanySectionsNav from '@/components/CompanySectionsNav.jsx';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';

const Contacto = () => {
  const { isEditorMode, cmsState, updateSettings, syncToCloud } = useCMS();
  const [showControls, setShowControls] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const heroImage = cmsState?.settings?.contactoHeroImage || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80';
  const heroOpacity = cmsState?.settings?.contactoHeroOpacity ?? 100;

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadFile(file);
      if (url) {
        updateSettings({ contactoHeroImage: url });
        await syncToCloud();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Contacto y Ubicaciones | SMQ 4.0</title>
        <meta name="description" content="Ponte en contacto con el equipo de ingeniería de Grupo SMQ para asesoría técnica, ventas y cotización de proyectos." />
      </Helmet>

      <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans select-none overflow-x-hidden">
        {/* HERO SECTION */}
        <section 
          className="relative h-[65vh] min-h-[500px] flex items-center justify-start px-[40px] md:px-[80px] border-b border-white/5 overflow-hidden pt-20 bg-[#030712]"
        >
          {/* Dynamic Background Image Layer */}
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: `url('${heroImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              opacity: heroOpacity / 100
            }}
          />
          
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#030712] via-[#030712]/70 to-[#030712]/20 z-0" />
          
          {/* Editor Controls */}
          {isEditorMode && (
            <div className="absolute bottom-10 right-8 z-40 flex flex-col items-end gap-2 pointer-events-auto">
              <button
                onClick={() => setShowControls(!showControls)}
                className="bg-[#0C1017]/90 hover:bg-black text-white hover:text-[#FFD700] border border-white/10 hover:border-[#FFD700]/50 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all flex items-center gap-2"
              >
                <ImageIcon size={14} className={showControls ? 'text-[#FFD700]' : ''} />
                <span>{showControls ? 'Cerrar Ajustes' : 'Ajustes de Fondo'}</span>
              </button>

              {showControls && (
                <div className="bg-[#0C1017]/95 border border-white/10 p-5 rounded-2xl backdrop-blur-xl shadow-2xl w-64 mt-2">
                  <h3 className="text-[#FFD700] text-[10px] font-black uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Ajustes de Hero</h3>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                        <span>Transparencia Fondo</span>
                        <span className="text-[#FFD700]">{heroOpacity}%</span>
                      </div>
                      <input 
                        type="range" min="0" max="100" 
                        value={heroOpacity} 
                        onChange={(e) => updateSettings({ contactoHeroOpacity: parseInt(e.target.value) })} 
                        className="w-full accent-[#FFD700] h-1 bg-white/10 appearance-none rounded-full cursor-pointer" 
                      />
                    </div>
                    
                    <label className="cursor-pointer flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#FFC000] text-black rounded-lg py-2 transition-colors text-[10px] font-bold mt-2">
                      <Upload size={14} />
                      {isUploading ? 'Subiendo...' : 'Cambiar Imagen'}
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(249,115,22,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.15)_1px,transparent_1px)] bg-[size:30px_30px] z-[2]" />
          
          <div className="max-w-[1400px] w-full mx-auto relative z-10 flex items-stretch justify-start">
            {/* Sci-fi Left Bracket Design */}
            <div className="relative flex items-center justify-center mr-6 md:mr-8 shrink-0">
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-[2px] h-[200px] bg-gradient-to-b from-[#F59E0B] via-[#F97316] to-[#EF4444] shadow-[0_0_15px_rgba(249,115,22,0.5)] origin-center relative"
              >
                <div className="absolute top-0 left-0 w-3 h-[2px] bg-[#F59E0B]" />
                <div className="absolute bottom-0 left-0 w-3 h-[2px] bg-[#EF4444]" />
              </motion.div>
            </div>
            
            <div className="flex flex-col items-start gap-4 py-2 justify-center">
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-[#F97316] font-mono">
                [ ATENCION_GLOBAL ]
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tight leading-none uppercase font-sans text-white">
                <DecipherText text="CONTACTO" delay={200} />
              </h1>
              <p className="text-white/80 text-lg md:text-xl tracking-wide max-w-[600px] font-sans mt-2">
                Oficinas de representación comercial y centros de servicio técnico para soporte local inmediato.
              </p>
            </div>
          </div>

          {/* Futuristic corner brackets */}
          <div className="absolute top-24 left-8 w-4 h-4 border-t-2 border-l-2 border-[#F97316]/30" />
          <div className="absolute top-24 right-8 w-4 h-4 border-t-2 border-r-2 border-[#F97316]/30" />
        </section>

        {/* CORE CONTACT FORM */}
        <div className="bg-[#030712] relative z-10">
          <ContactSection hideHeader={true} />
        </div>

        {/* SECTIONS NAVIGATION */}
        <CompanySectionsNav />

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
};

export default Contacto;
