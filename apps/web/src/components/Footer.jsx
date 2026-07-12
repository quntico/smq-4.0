import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Settings, Upload, X, Trash2, Home, Factory, Box, FileText, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext.jsx';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const fileInputRef = useRef(null);
  const bgFileInputRef = useRef(null);

  const { isEditorMode, cmsState, updateSettings, syncToCloud } = useCMS();
  const { t } = useLanguage();

  const [isEditing, setIsEditing] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBg, setUploadingBg] = useState(false);

  const settings = cmsState?.settings || {};
  const logoUrl = settings.footerLogoUrl || settings.logoUrl || '';
  const bgUrl = settings.footerBgUrl || '';
  const bgOpacity = settings.footerBgOpacity !== undefined ? settings.footerBgOpacity : 40;
  
  const companyName = settings.footerCompanyName || 'SMQ Industrial Systems';
  const companyDesc = settings.footerCompanyDesc || t('footer.desc');
  const phones = settings.footerPhones || ['+52 (55) 1234-5678', '+52 (55) 8765-4321'];
  const email = settings.footerEmail || 'contacto@smqindustrial.com';
  const address = settings.footerAddress || 'Av. Insurgentes Sur 1234, Col. Industrial, CDMX';

  const fbLink = settings.footerFbLink || '#';
  const twLink = settings.footerTwLink || '#';
  const liLink = settings.footerLiLink || '#';
  const igLink = settings.footerIgLink || '#';

  const quickLinks = [
    { label: t('footer.menuItems.inicio'), href: '#inicio', icon: Home },
    { label: t('footer.menuItems.industrias'), href: '#industrias', icon: Factory },
    { label: t('footer.menuItems.soluciones'), href: '#soluciones', icon: Box },
    { label: t('footer.menuItems.proyectos'), href: '#proyectos', icon: FileText },
    { label: t('footer.menuItems.tecnologia'), href: '#tecnologia', icon: Cpu },
    { label: t('footer.menuItems.contacto'), href: '/contacto', icon: Mail },
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

  const handleBgUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingBg(true);
    try {
      const url = await uploadFile(file);
      if (url) {
        updateSettings({ footerBgUrl: url });
      }
    } catch (err) {
      console.error("Error al subir fondo del footer:", err);
      alert("No se pudo subir la imagen.");
    } finally {
      setUploadingBg(false);
    }
  };

  const handleRemoveBg = () => {
    updateSettings({ footerBgUrl: '' });
  };

  return (
    <footer className="bg-[#050B12] border-t border-[#009FE3]/20 relative overflow-hidden font-['Poppins']">
      {/* Editor Trigger Overlay */}
      {isEditorMode && (
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-[#009FE3] hover:bg-[#00D4FF] text-[#EAF4FF] px-4 py-2.5 rounded text-xs font-black uppercase tracking-wider transition-all shadow-[0_4px_15px_rgba(0,159,227,0.25)] border border-[#009FE3]/30"
          >
            <Settings size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
            <span>Editar Configuración Footer</span>
          </button>
        </div>
      )}

      {/* Background layer */}
      {bgUrl ? (
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none" 
          style={{ backgroundImage: `url(${bgUrl})`, opacity: bgOpacity / 100 }} 
        />
      ) : (
        <div 
          className="absolute inset-0 bg-[#07111C] pointer-events-none" 
          style={{ opacity: bgOpacity / 100 }} 
        />
      )}

      <div className="container mx-auto px-6 md:px-12 pt-10 pb-8 relative z-10">
        {/* 4-Column Grid Desktop, 2 Tablet, 1 Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 items-start">
          
          {/* 1. Company Info (Brand Anchor) */}
          <div className="flex flex-col items-start w-full">
            <div className="flex flex-col items-start mb-3">
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt={companyName} 
                  className="w-[130px] md:w-[150px] max-h-[60px] object-contain object-left" 
                  style={{ imageRendering: 'high-quality' }}
                />
              ) : (
                <span className="text-4xl font-black text-[#009FE3] tracking-widest font-sans">
                  {companyName.split(' ')[0] || 'SMQ'}
                </span>
              )}
              <span className="text-[10px] font-bold text-[#8E9BAA] tracking-[0.2em] uppercase mt-1 ml-1">
                SA DE CV
              </span>
            </div>
            
            <p className="text-[#8E9BAA] text-[13px] leading-relaxed font-light mb-5 max-w-[280px]">
              {t('footer.desc')}
            </p>
            
            <button 
              onClick={() => scrollToSection('/contacto')}
              className="group flex items-center justify-center gap-2 bg-transparent border border-[#00D4FF] text-[#00D4FF] hover:bg-[#009FE3] hover:border-[#009FE3] hover:text-[#EAF4FF] font-semibold uppercase tracking-wider text-[11px] px-5 py-2 rounded transition-all duration-300"
            >
              {t('footer.getQuote')}
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* 2. Quick Links */}
          <div className="flex flex-col w-full">
            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#00D4FF]">{t('footer.mainMenu')}</span>
              <div className="w-6 h-[2px] bg-[#009FE3]/40 mt-2.5" />
            </div>
            <div className="flex flex-col gap-y-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="flex items-center gap-3 text-[#8E9BAA] hover:text-[#EAF4FF] transition-all text-left group w-max"
                  >
                    <Icon size={15} strokeWidth={1.5} className="text-[#009FE3] group-hover:text-[#00D4FF] transition-colors" />
                    <span className="text-[13px] font-light">{link.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3. Contact Info */}
          <div className="flex flex-col w-full">
            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#00D4FF]">{t('footer.directContact')}</span>
              <div className="w-6 h-[2px] bg-[#009FE3]/40 mt-2.5" />
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-3 text-[#8E9BAA]">
                <Phone size={15} strokeWidth={1.5} className="text-[#009FE3] shrink-0 mt-[2px]" />
                <div className="flex flex-col space-y-1">
                  {phones.map((phone, i) => (
                    <a key={i} href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-[13px] hover:text-[#EAF4FF] transition-colors font-light">
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-3 text-[#8E9BAA]">
                <Mail size={15} strokeWidth={1.5} className="text-[#009FE3] shrink-0" />
                <a href={`mailto:${email}`} className="text-[13px] hover:text-[#EAF4FF] transition-colors font-light">
                  {email}
                </a>
              </div>
              <div className="flex items-start space-x-3 text-[#8E9BAA]">
                <MapPin size={15} strokeWidth={1.5} className="text-[#009FE3] shrink-0 mt-[3px]" />
                <span className="text-[13px] font-light leading-relaxed max-w-[220px]">{address}</span>
              </div>
            </div>
          </div>

          {/* 4. Social Media */}
          <div className="flex flex-col w-full">
            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#00D4FF]">{t('footer.socialMedia')}</span>
              <div className="w-6 h-[2px] bg-[#009FE3]/40 mt-2.5" />
            </div>
            <p className="text-[13px] text-[#8E9BAA] font-light leading-relaxed mb-4 max-w-[240px]">
              {t('footer.followUs')}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded border border-[#009FE3]/30 flex items-center justify-center text-[#00D4FF] hover:bg-[#009FE3] hover:text-[#EAF4FF] hover:border-[#009FE3] transition-all duration-300 bg-[#050B12]"
                >
                  <social.icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Compact, clean, 1 line */}
      <div className="border-t border-[#009FE3]/20 bg-[#050B12] py-4 px-6 md:px-12 relative z-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#8E9BAA] text-[11px] font-light">
            {t('footer.allRights')}
          </p>
          <div className="flex items-center space-x-4 text-[11px] text-[#8E9BAA] font-light">
            <a href="#" className="hover:text-[#EAF4FF] transition-colors">{t('footer.privacy')}</a>
            <span className="text-[#009FE3]/30">|</span>
            <a href="#" className="hover:text-[#EAF4FF] transition-colors">{t('footer.terms')}</a>
          </div>
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
              className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
              onClick={() => setIsEditing(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#07111C] border border-[#009FE3]/30 rounded-xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh] z-10 text-[#EAF4FF] pointer-events-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6 border-b border-[#009FE3]/20 pb-4">
                <div>
                  <h3 className="text-xl font-bold tracking-wide uppercase text-[#00D4FF]">Ajustes del Footer</h3>
                  <p className="text-xs text-[#8E9BAA] mt-1 font-light">Actualiza los datos corporativos, logotipo y enlaces del pie de página.</p>
                </div>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="p-2 hover:bg-white/5 rounded transition-colors text-[#8E9BAA] hover:text-[#EAF4FF] cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {/* Logo & Company Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Logo uploader */}
                  <div className="flex items-center gap-4 bg-[#050B12] p-4 rounded border border-[#009FE3]/20">
                    {logoUrl ? (
                      <div className="relative group w-24 h-24 bg-black/40 border border-[#009FE3]/20 rounded flex items-center justify-center p-2">
                        <img src={logoUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                        <button 
                          onClick={handleRemoveLogo}
                          className="absolute -top-2 -right-2 p-1.5 bg-red-500 hover:bg-red-600 rounded text-white shadow transition-colors cursor-pointer"
                          title="Remover Logo"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-black/40 border border-dashed border-[#009FE3]/20 rounded flex items-center justify-center text-[#8E9BAA] text-xs">
                        Sin Logo
                      </div>
                    )}
                    <div className="flex-grow">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8E9BAA] mb-2">Logotipo Azul SMQ</label>
                      <button
                        type="button"
                        disabled={uploadingLogo}
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-[#009FE3]/10 hover:bg-[#009FE3]/20 text-[#00D4FF] text-xs font-semibold py-2 px-4 rounded transition-all flex items-center gap-2 border border-[#009FE3]/30 cursor-pointer w-full justify-center"
                      >
                        <Upload size={14} />
                        {uploadingLogo ? 'Subiendo...' : 'Subir Imagen'}
                      </button>
                      <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                    </div>
                  </div>

                  {/* Right: Company Name */}
                  <div className="flex flex-col justify-end">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8E9BAA] mb-2">Nombre de la Empresa</label>
                    <input 
                      type="text" 
                      value={companyName}
                      onChange={(e) => updateSettings({ footerCompanyName: e.target.value })}
                      className="w-full bg-[#050B12] border border-[#009FE3]/20 rounded px-4 py-2 text-[13px] focus:outline-none focus:border-[#00D4FF] transition-colors text-[#EAF4FF]"
                    />
                  </div>
                </div>

                {/* Background Settings */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2 border-b border-[#009FE3]/10 pb-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#00D4FF]">Fondo del Footer</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Background Uploader */}
                    <div className="flex items-center gap-4 bg-[#050B12] p-4 rounded border border-[#009FE3]/20">
                      {bgUrl ? (
                        <div className="relative group w-24 h-24 bg-black/40 border border-[#009FE3]/20 rounded flex items-center justify-center p-1">
                          <img src={bgUrl} alt="Bg Preview" className="max-w-full max-h-full object-cover rounded" />
                          <button 
                            onClick={handleRemoveBg}
                            className="absolute -top-2 -right-2 p-1.5 bg-red-500 hover:bg-red-600 rounded text-white shadow transition-colors cursor-pointer"
                            title="Remover Fondo"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="w-24 h-24 bg-black/40 border border-dashed border-[#009FE3]/20 rounded flex items-center justify-center text-[#8E9BAA] text-[10px] text-center p-2 uppercase font-bold tracking-wider">
                          Sin Imagen
                        </div>
                      )}
                      <div className="flex-grow">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8E9BAA] mb-2">Imagen de Fondo</label>
                        <button
                          type="button"
                          disabled={uploadingBg}
                          onClick={() => bgFileInputRef.current?.click()}
                          className="bg-[#009FE3]/10 hover:bg-[#009FE3]/20 text-[#00D4FF] text-xs font-semibold py-2 px-4 rounded transition-all flex items-center gap-2 border border-[#009FE3]/30 cursor-pointer w-full justify-center"
                        >
                          <Upload size={14} />
                          {uploadingBg ? 'Subiendo...' : 'Subir Fondo'}
                        </button>
                        <input type="file" ref={bgFileInputRef} onChange={handleBgUpload} className="hidden" accept="image/*" />
                      </div>
                    </div>
                    {/* Opacity Slider */}
                    <div className="flex flex-col justify-center bg-[#050B12] p-4 rounded border border-[#009FE3]/20">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8E9BAA] mb-4 flex justify-between">
                        <span>Transparencia / Opacidad</span>
                        <span className="text-[#00D4FF]">{bgOpacity}%</span>
                      </label>
                      <input 
                        type="range" 
                        min="0" max="100" 
                        value={bgOpacity}
                        onChange={(e) => updateSettings({ footerBgOpacity: parseInt(e.target.value) })}
                        className="w-full h-1.5 bg-black/60 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #009FE3 ${bgOpacity}%, #000 ${bgOpacity}%)`
                        }}
                      />
                      <p className="text-[9.5px] text-[#8E9BAA] mt-4 font-light leading-relaxed">Ajusta la visibilidad de la imagen o del color secundario para no opacar el contenido del footer.</p>
                    </div>
                  </div>
                </div>

                {/* Company Desc */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8E9BAA] mb-2">Descripción de la Empresa</label>
                  <textarea 
                    rows={2}
                    value={companyDesc}
                    onChange={(e) => updateSettings({ footerCompanyDesc: e.target.value })}
                    className="w-full bg-[#050B12] border border-[#009FE3]/20 rounded px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#00D4FF] transition-colors resize-none font-light leading-relaxed text-[#EAF4FF]"
                  />
                </div>

                {/* Contacts Grid */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2 border-b border-[#009FE3]/10 pb-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#00D4FF]">Información de Contacto</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8E9BAA] mb-2">Teléfono Principal</label>
                      <input 
                        type="text" 
                        value={phones[0] || ''}
                        onChange={(e) => {
                          const newPhones = [...phones];
                          newPhones[0] = e.target.value;
                          updateSettings({ footerPhones: newPhones });
                        }}
                        className="w-full bg-[#050B12] border border-[#009FE3]/20 rounded px-4 py-2 text-[13px] focus:outline-none focus:border-[#00D4FF] transition-colors text-[#EAF4FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8E9BAA] mb-2">Teléfono Secundario</label>
                      <input 
                        type="text" 
                        value={phones[1] || ''}
                        onChange={(e) => {
                          const newPhones = [...phones];
                          newPhones[1] = e.target.value;
                          updateSettings({ footerPhones: newPhones });
                        }}
                        className="w-full bg-[#050B12] border border-[#009FE3]/20 rounded px-4 py-2 text-[13px] focus:outline-none focus:border-[#00D4FF] transition-colors text-[#EAF4FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8E9BAA] mb-2">Correo Electrónico</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => updateSettings({ footerEmail: e.target.value })}
                        className="w-full bg-[#050B12] border border-[#009FE3]/20 rounded px-4 py-2 text-[13px] focus:outline-none focus:border-[#00D4FF] transition-colors text-[#EAF4FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8E9BAA] mb-2">Dirección Física</label>
                      <input 
                        type="text" 
                        value={address}
                        onChange={(e) => updateSettings({ footerAddress: e.target.value })}
                        className="w-full bg-[#050B12] border border-[#009FE3]/20 rounded px-4 py-2 text-[13px] focus:outline-none focus:border-[#00D4FF] transition-colors text-[#EAF4FF]"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Networks Links */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2 border-b border-[#009FE3]/10 pb-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#00D4FF]">Enlaces de Redes Sociales</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8E9BAA] mb-2">Facebook</label>
                      <input 
                        type="text" 
                        value={fbLink}
                        onChange={(e) => updateSettings({ footerFbLink: e.target.value })}
                        className="w-full bg-[#050B12] border border-[#009FE3]/20 rounded px-4 py-2 text-[13px] focus:outline-none focus:border-[#00D4FF] transition-colors text-[#EAF4FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8E9BAA] mb-2">Twitter (X)</label>
                      <input 
                        type="text" 
                        value={twLink}
                        onChange={(e) => updateSettings({ footerTwLink: e.target.value })}
                        className="w-full bg-[#050B12] border border-[#009FE3]/20 rounded px-4 py-2 text-[13px] focus:outline-none focus:border-[#00D4FF] transition-colors text-[#EAF4FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8E9BAA] mb-2">LinkedIn</label>
                      <input 
                        type="text" 
                        value={liLink}
                        onChange={(e) => updateSettings({ footerLiLink: e.target.value })}
                        className="w-full bg-[#050B12] border border-[#009FE3]/20 rounded px-4 py-2 text-[13px] focus:outline-none focus:border-[#00D4FF] transition-colors text-[#EAF4FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8E9BAA] mb-2">Instagram</label>
                      <input 
                        type="text" 
                        value={igLink}
                        onChange={(e) => updateSettings({ footerIgLink: e.target.value })}
                        className="w-full bg-[#050B12] border border-[#009FE3]/20 rounded px-4 py-2 text-[13px] focus:outline-none focus:border-[#00D4FF] transition-colors text-[#EAF4FF]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-8 pt-6 border-t border-[#009FE3]/20 flex items-center justify-between">
                <p className="text-[#8E9BAA] text-[11px]">Los cambios se guardan localmente y se envían a la nube.</p>
                <button
                  onClick={async () => {
                    await syncToCloud();
                    setIsEditing(false);
                  }}
                  className="bg-[#009FE3] hover:bg-[#00D4FF] text-[#EAF4FF] font-bold text-[11px] uppercase tracking-wider py-2.5 px-6 rounded transition-all shadow-[0_4px_15px_rgba(0,159,227,0.25)] cursor-pointer"
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
