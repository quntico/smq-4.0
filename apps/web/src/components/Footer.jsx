import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Settings, Upload, X, Trash2 } from 'lucide-react';
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
    { label: 'Inicio', href: '#inicio' },
    { label: 'Industrias', href: '#industrias' },
    { label: 'Maquinaria', href: '#maquinaria' },
    { label: 'Soluciones', href: '#soluciones' },
    { label: 'Tecnología', href: '#tecnologia' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Contacto', href: '/contacto' },
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
    <footer className="bg-[#080B11] border-t border-white/5 relative">
      {/* Editor Trigger Overlay */}
      {isEditorMode && (
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-[#FFD700] hover:bg-[#FFC000] text-black px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(255,215,0,0.25)] border border-[#FFD700]/30"
          >
            <Settings size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
            <span>Editar Contacto & Redes</span>
          </button>
        </div>
      )}

      <div className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              {logoUrl ? (
                <img src={logoUrl} alt={companyName} className="h-10 w-auto object-contain" />
              ) : (
                <div className="w-10 h-10 bg-[#FFD700] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.15)]">
                  <span className="text-black font-black text-xl">S</span>
                </div>
              )}
              <span className="text-lg font-black text-white uppercase tracking-wider">
                {companyName}
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              {companyDesc}
            </p>
            <Button 
              onClick={() => scrollToSection('/contacto')}
              className="bg-[#FFD700] text-black hover:bg-[#FFC000] font-black uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl transition-all duration-300 w-full sm:w-auto shadow-[0_0_20px_rgba(255,215,0,0.1)] hover:shadow-[0_0_25px_rgba(255,215,0,0.2)]"
            >
              Solicitar Cotización
            </Button>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#FFD700] rounded-full"></div>
              <span className="text-xs font-black uppercase tracking-widest text-white/80">Menú Principal</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-white/50 hover:text-white hover:translate-x-1 transition-all text-left text-sm font-light py-1"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#FFD700] rounded-full"></div>
              <span className="text-xs font-black uppercase tracking-widest text-white/80">Contacto Directo</span>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-3 text-white/50 text-sm">
                <Phone size={18} className="text-[#FFD700] mt-0.5 shrink-0" />
                <div className="flex flex-col space-y-1">
                  {phones.map((phone, i) => (
                    <a key={i} href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#FFD700] transition-colors font-medium">
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-3 text-white/50 text-sm">
                <Mail size={18} className="text-[#FFD700] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-[#FFD700] transition-colors font-medium">
                  {email}
                </a>
              </div>
              <div className="flex items-start space-x-3 text-white/50 text-sm">
                <MapPin size={18} className="text-[#FFD700] mt-0.5 shrink-0" />
                <span className="font-light leading-relaxed">{address}</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#FFD700] rounded-full"></div>
              <span className="text-xs font-black uppercase tracking-widest text-white/80">Redes Sociales</span>
            </div>
            <p className="text-sm text-white/50 font-light leading-relaxed">
              Síguenos para conocer nuestros últimos proyectos y tecnologías.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#FFD700] hover:border-[#FFD700]/30 hover:bg-[#FFD700]/10 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs font-light text-center md:text-left">
            © {currentYear} {companyName}. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-xs text-white/40 font-light">
            <a href="#" className="hover:text-[#FFD700] transition-colors">Aviso de Privacidad</a>
            <a href="#" className="hover:text-[#FFD700] transition-colors">Términos de Servicio</a>
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
