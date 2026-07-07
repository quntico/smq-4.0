import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Settings, Upload, X, Trash2, Home, Factory, Box, FileText, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const fileInputRef = useRef(null);

  const { isEditorMode, cmsState, updateSettings, syncToCloud } = useCMS();

  const [isEditing, setIsEditing] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const settings = cmsState?.settings || {};
  const logoUrl = settings.footerLogoUrl || settings.logoUrl || '';
  const companyName = settings.footerCompanyName || 'SMQ Industrial Systems';
  const companyDesc = settings.footerCompanyDesc || 'Soluciones industriales de alta ingeniería para reciclaje, procesamiento de alimentos y automatización.';
  const phones = settings.footerPhones || ['+52 (55) 1234-5678', '+52 (55) 8765-4321'];
  const email = settings.footerEmail || 'contacto@smqindustrial.com';
  const address = settings.footerAddress || 'Av. Insurgentes Sur 1234, Col. Industrial, CDMX';

  const fbLink = settings.footerFbLink || '#';
  const twLink = settings.footerTwLink || '#';
  const liLink = settings.footerLiLink || '#';
  const igLink = settings.footerIgLink || '#';

  const quickLinks = [
    { label: 'Inicio', href: '#inicio', icon: Home },
    { label: 'Industrias', href: '#industrias', icon: Factory },
    { label: 'Maquinaria', href: '#maquinaria', icon: Settings },
    { label: 'Soluciones', href: '#soluciones', icon: Box },
    { label: 'Proyectos', href: '#proyectos', icon: FileText },
    { label: 'Tecnología', href: '#tecnologia', icon: Cpu },
    { label: 'Contacto', href: '/contacto', icon: Mail },
  ];

  const socialLinks = [
    { icon: Facebook, href: fbLink, label: 'Facebook' },
    { icon: Twitter, href: twLink, label: 'Twitter' },
    { icon: Linkedin, href: liLink, label: 'LinkedIn' },
    { icon: Instagram, href: igLink, label: 'Instagram' },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('/')) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetId = href.replace('#', '');
    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const url = await uploadFile(file);
      if (url) {
        updateSettings({ footerLogoUrl: url });
      }
    } catch (err) {
      console.error("Error al subir logo del footer:", err);
      alert("No se pudo subir la imagen.");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleRemoveLogo = () => {
    updateSettings({ footerLogoUrl: '' });
  };

  return (
    <footer className="bg-[#070b13] border-t border-cyan-500/10 relative overflow-hidden text-sm">
      {/* Editor Trigger Overlay */}
      {isEditorMode && (
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#070b13] px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(0,240,255,0.25)] border border-cyan-400/30"
          >
            <Settings size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
            <span>Editar Contacto & Redes</span>
          </button>
        </div>
      )}

      {/* Dotted World Map Background (Decorative) */}
      <div className="absolute right-0 bottom-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* 1. Company Info */}
          <div className="space-y-6 flex flex-col items-start">
            <div className="flex flex-col">
              {logoUrl ? (
                <img src={logoUrl} alt={companyName} className="h-16 w-auto object-contain" />
              ) : (
                <span className="text-4xl font-black text-cyan-500 uppercase tracking-wider font-sans">
                  {companyName.split(' ')[0] || 'SMQ'}
                </span>
              )}
              <span className="text-sm font-bold text-white/80 tracking-widest mt-1 ml-2">
                SA DE CV
              </span>
            </div>
            <p className="text-white/60 text-[13px] leading-relaxed font-light mt-4">
              {companyDesc}
            </p>
            <div className="w-8 h-[1px] bg-cyan-500/50 mt-2 mb-4" />
            <button 
              onClick={() => scrollToSection('/contacto')}
              className="flex items-center gap-3 bg-transparent border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-lg transition-all duration-300"
            >
              <ArrowRight size={16} className="text-cyan-500" />
              Solicitar Cotización
            </button>
          </div>

          {/* 2. Quick Links */}
          <div className="space-y-6">
            <div className="flex items-center border-l-[3px] border-cyan-500 pl-3">
              <span className="text-[13px] font-bold uppercase tracking-wider text-cyan-400">Menú Principal</span>
            </div>
            <div className="flex flex-col gap-y-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="flex items-center gap-4 text-white/60 hover:text-white transition-all text-left group"
                  >
                    <Icon size={18} className="text-cyan-500/70 group-hover:text-cyan-400 transition-colors" />
                    <span className="text-sm font-light group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3. Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center border-l-[3px] border-cyan-500 pl-3">
              <span className="text-[13px] font-bold uppercase tracking-wider text-cyan-400">Contacto Directo</span>
            </div>
            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-4 text-white/60 text-[13px]">
                <Phone size={20} className="text-cyan-500 shrink-0" />
                <div className="flex flex-col space-y-1">
                  {phones.map((phone, i) => (
                    <a key={i} href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-cyan-400 transition-colors font-light">
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4 text-white/60 text-[13px]">
                <Mail size={20} className="text-cyan-500 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-cyan-400 transition-colors font-light">
                  {email}
                </a>
              </div>
              <div className="flex items-start space-x-4 text-white/60 text-[13px]">
                <MapPin size={20} className="text-cyan-500 mt-1 shrink-0" />
                <span className="font-light leading-relaxed max-w-[200px]">{address}</span>
              </div>
            </div>
          </div>

          {/* 4. Social Media */}
          <div className="space-y-6">
            <div className="flex items-center border-l-[3px] border-cyan-500 pl-3">
              <span className="text-[13px] font-bold uppercase tracking-wider text-cyan-400">Redes Sociales</span>
            </div>
            <p className="text-[13px] text-white/60 font-light leading-relaxed pr-8">
              Síguenos para conocer nuestros últimos proyectos y tecnologías.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-cyan-500/50 flex items-center justify-center text-cyan-500 hover:bg-cyan-500 hover:text-[#070b13] hover:border-cyan-400 transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Tech Lines */}
      <div className="relative border-t border-cyan-500/20 bg-[#0a0f18] py-6 px-6 md:px-12 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 z-10 overflow-hidden">
        {/* Decorative tech lines */}
        <div className="absolute right-0 bottom-0 w-64 h-full pointer-events-none">
           <svg width="100%" height="100%" viewBox="0 0 200 50" preserveAspectRatio="none">
             <path d="M 50 50 L 100 0 L 200 0" fill="none" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" />
             <path d="M 80 50 L 130 0 L 200 0" fill="none" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="2" />
           </svg>
        </div>

        <p className="text-white/40 text-[11px] font-light text-center md:text-left relative z-10">
          © {currentYear} <span className="font-bold text-cyan-500">{companyName.split(' ')[0] || 'SMQ'}</span> SA de CV. Todos los derechos reservados.
        </p>
        <div className="flex items-center space-x-6 text-[11px] text-white/50 font-light relative z-10">
          <a href="#" className="hover:text-cyan-400 transition-colors">Aviso de Privacidad</a>
          <span className="text-cyan-500/30">|</span>
          <a href="#" className="hover:text-cyan-400 transition-colors">Términos de Servicio</a>
          <ShieldCheck size={16} className="text-cyan-500 ml-2" />
        </div>
      </div>

      {/* Editor Modal Drawer */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[2500] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-md pointer-events-auto"
              onClick={() => setIsEditing(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0C1017]/95 border border-white/10 rounded-[28px] shadow-2xl p-6 md:p-8 backdrop-blur-xl overflow-y-auto max-h-[90vh] z-10 text-white pointer-events-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold tracking-wide uppercase">Ajustes del Footer</h3>
                  <p className="text-xs text-white/50 mt-1 font-light">Actualiza los datos corporativos, logotipo y enlaces del pie de página.</p>
                </div>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/70 hover:text-white cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {/* Logo & Company Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Logo uploader */}
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                    {logoUrl ? (
                      <div className="relative group w-16 h-16 bg-black/30 border border-white/10 rounded-xl flex items-center justify-center p-2">
                        <img src={logoUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                        <button 
                          onClick={handleRemoveLogo}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full text-white shadow-lg transition-colors cursor-pointer"
                          title="Remover Logo"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-white/5 border border-dashed border-white/20 rounded-xl flex items-center justify-center text-white/30 text-xs">
                        Sin Logo
                      </div>
                    )}
                    <div className="flex-grow">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-white/50 mb-1.5">Logotipo Footer</label>
                      <button
                        type="button"
                        disabled={uploadingLogo}
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-white/10 hover:bg-white/15 text-white text-xs font-bold py-2 px-4 rounded-xl transition-all flex items-center gap-2 border border-white/10 cursor-pointer"
                      >
                        <Upload size={14} />
                        {uploadingLogo ? 'Subiendo...' : 'Subir Imagen'}
                      </button>
                      <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                    </div>
                  </div>

                  {/* Right: Company Name */}
                  <div className="flex flex-col justify-end">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Nombre de la Empresa</label>
                    <input 
                      type="text" 
                      value={companyName}
                      onChange={(e) => updateSettings({ footerCompanyName: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
                    />
                  </div>
                </div>

                {/* Company Desc */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Descripción de la Empresa</label>
                  <textarea 
                    rows={2}
                    value={companyDesc}
                    onChange={(e) => updateSettings({ footerCompanyDesc: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FFD700] transition-colors resize-none font-light leading-relaxed"
                  />
                </div>

                {/* Contacts Grid */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-3.5 bg-[#FFD700] rounded-full"></div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-white/80">Información de Contacto</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Teléfono Principal</label>
                      <input 
                        type="text" 
                        value={phones[0] || ''}
                        onChange={(e) => {
                          const newPhones = [...phones];
                          newPhones[0] = e.target.value;
                          updateSettings({ footerPhones: newPhones });
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Teléfono Secundario</label>
                      <input 
                        type="text" 
                        value={phones[1] || ''}
                        onChange={(e) => {
                          const newPhones = [...phones];
                          newPhones[1] = e.target.value;
                          updateSettings({ footerPhones: newPhones });
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Correo Electrónico</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => updateSettings({ footerEmail: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Dirección Física</label>
                      <input 
                        type="text" 
                        value={address}
                        onChange={(e) => updateSettings({ footerAddress: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Networks Links */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-3.5 bg-[#FFD700] rounded-full"></div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-white/80">Enlaces de Redes Sociales</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Enlace Facebook</label>
                      <input 
                        type="text" 
                        value={fbLink}
                        onChange={(e) => updateSettings({ footerFbLink: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Enlace Twitter</label>
                      <input 
                        type="text" 
                        value={twLink}
                        onChange={(e) => updateSettings({ footerTwLink: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Enlace LinkedIn</label>
                      <input 
                        type="text" 
                        value={liLink}
                        onChange={(e) => updateSettings({ footerLiLink: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Enlace Instagram</label>
                      <input 
                        type="text" 
                        value={igLink}
                        onChange={(e) => updateSettings({ footerIgLink: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-white/40 text-xs">Los cambios se guardan localmente y se envían a la nube.</p>
                <button
                  onClick={async () => {
                    await syncToCloud();
                    setIsEditing(false);
                  }}
                  className="bg-[#FFD700] hover:bg-[#FFC000] text-black font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-[0_4px_20px_rgba(255,215,0,0.25)] cursor-pointer"
                >
                  Guardar y Sincronizar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
