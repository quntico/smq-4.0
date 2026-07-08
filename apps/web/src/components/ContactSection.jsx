import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck, Settings, Upload, X, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';
import { motion, AnimatePresence } from 'framer-motion';

const ContactSection = ({ hideHeader = false }) => {
  const { isEditorMode, cmsState, updateSettings, syncToCloud } = useCMS();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingBg, setUploadingBg] = useState(false);

  const settings = cmsState?.settings || {};
  const contactTitle = settings.contactTitle || 'Información de contacto';
  const contactSubtitle = settings.contactSubtitle || 'Estamos listos para ayudarte a transformar tu operación.';
  const contactPhone1 = settings.contactPhone1 || '+52 (55) 1234-5678';
  const contactPhone2 = settings.contactPhone2 || '+52 (55) 8765-4321';
  const contactEmail1 = settings.contactEmail1 || 'contacto@smqindustrial.com';
  const contactEmail2 = settings.contactEmail2 || 'ventas@smqindustrial.com';
  const contactLocation = settings.contactLocation || 'Ciudad de México, México';
  const contactAddress = settings.contactAddress || 'Av. Insurgentes Sur 1234, Col. Industrial';
  const contactHoursWeek = settings.contactHoursWeek || 'Lunes a Viernes: 8:00 - 18:00 h';
  const contactHoursSat = settings.contactHoursSat || 'Sábados: 9:00 - 13:00 h';
  const contactBottomText = settings.contactBottomText || 'Más de 20 años integrando soluciones industriales de clase mundial.';
  const contactBgImage = settings.contactBgImage || '/ai_neural_cover.png';

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    industria: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido.",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push({
      ...formData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

    // Success message
    toast({
      title: "¡Mensaje enviado!",
      description: "Gracias por contactarnos. Nos pondremos en contacto contigo pronto.",
    });

    // Reset form
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      industria: '',
      mensaje: '',
    });
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-[#030712] relative overflow-hidden">
      {/* Sci-fi tech grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(249,115,22,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px] relative z-10">
        
        {/* Left-Aligned Premium Header matching the screenshot */}
        {!hideHeader && (
          <div className="text-left mb-12 max-w-3xl">
            <span className="text-[#3b82f6] text-xs font-black tracking-[0.25em] uppercase font-mono">
              Hablemos de tu próximo proyecto
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-2 mb-3 tracking-tight uppercase">
              Contáctanos
            </h2>
            {/* Yellow accent line */}
            <div className="w-16 h-[3px] bg-[#F59E0B] rounded shadow-[0_0_10px_#F59E0B] mb-6" />
            
            <p className="text-white/60 text-sm md:text-base leading-relaxed font-sans max-w-2xl">
              Soluciones industriales integrales para aumentar la eficiencia, la productividad y la competitividad de tu planta.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Form Card (Spans 6 cols on lg) */}
          <div className="lg:col-span-6 bg-[#040914]/80 border border-[#3b82f6]/30 hover:border-[#3b82f6]/50 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.1)] flex flex-col justify-between transition-all duration-300 relative group">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center border border-[#3b82f6]/20">
                  <Send size={18} className="text-[#3b82f6]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Envíanos un mensaje</h3>
                  <p className="text-xs text-white/50">Completa el formulario y nos pondremos en contacto contigo.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="nombre" className="text-xs text-white/80 font-semibold">
                      Nombre completo *
                    </Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Juan Pérez"
                      className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/30 text-xs focus-visible:ring-[#3b82f6]/50 focus-visible:border-[#3b82f6] h-10 transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs text-white/80 font-semibold">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="juan@empresa.com"
                      className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/30 text-xs focus-visible:ring-[#3b82f6]/50 focus-visible:border-[#3b82f6] h-10 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="telefono" className="text-xs text-white/80 font-semibold">
                      Teléfono
                    </Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+52 (55) 1234-5678"
                      className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/30 text-xs focus-visible:ring-[#3b82f6]/50 focus-visible:border-[#3b82f6] h-10 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="industria" className="text-xs text-white/80 font-semibold">
                      Industria
                    </Label>
                    <select
                      id="industria"
                      name="industria"
                      value={formData.industria}
                      onChange={handleChange}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-md text-white/95 px-3 text-xs focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] h-10 transition-colors cursor-pointer outline-none"
                    >
                      <option value="" className="bg-[#0c101a] text-white/40">Reciclaje, Alimentos, Empaque, etc.</option>
                      <option value="Reciclaje" className="bg-[#0c101a] text-white">Reciclaje e Industria Plástica</option>
                      <option value="Alimentos" className="bg-[#0c101a] text-white">Alimentos y Bebidas</option>
                      <option value="Pharma" className="bg-[#0c101a] text-white">Farma y Química</option>
                      <option value="Empaque" className="bg-[#0c101a] text-white">Empaque y Embalaje</option>
                      <option value="Otra" className="bg-[#0c101a] text-white">Otro Sector Industrial</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="mensaje" className="text-xs text-white/80 font-semibold">
                    Mensaje *
                  </Label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Cuéntanos sobre tu proyecto o requerimiento..."
                    rows={4}
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/30 text-xs resize-none focus-visible:ring-[#3b82f6]/50 focus-visible:border-[#3b82f6] transition-colors"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] font-bold text-xs tracking-wider uppercase py-5 transition-colors duration-300 flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                >
                  <Send size={14} />
                  Enviar mensaje
                </Button>
              </form>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 text-[10px] text-white/40 font-mono">
              <span>🔒</span>
              <span>Tu información está protegida y no será compartida.</span>
            </div>
          </div>

          {/* Contact Information Card with Tech Visual overlay (Spans 6 cols on lg) */}
          <div 
            className="lg:col-span-6 bg-[#040914]/80 border border-[#3b82f6]/30 hover:border-[#3b82f6]/50 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.1)] relative overflow-hidden flex flex-col justify-between transition-all duration-300 group"
            style={{
              backgroundImage: "radial-gradient(circle at 100% 50%, rgba(59, 130, 246, 0.12) 0%, transparent 70%)"
            }}
          >
            {isEditorMode && (
              <div className="absolute top-4 right-4 z-30">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-[#FFD700] hover:bg-[#FFC000] text-black px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-[0_4px_15px_rgba(255,215,0,0.25)] border border-[#FFD700]/30 cursor-pointer"
                >
                  <Settings size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Editar Tarjeta</span>
                </button>
              </div>
            )}

            {/* Tech Wireframe Graphic Overlay on the right */}
            {contactBgImage && (
              <div 
                className="absolute right-0 top-0 bottom-0 w-[45%] opacity-35 pointer-events-none bg-no-repeat bg-cover bg-right"
                style={{
                  backgroundImage: `url('${contactBgImage}')`,
                  maskImage: "linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)"
                }}
              />
            )}

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center border border-[#3b82f6]/20">
                  <Mail size={18} className="text-[#3b82f6]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{contactTitle}</h3>
                  <p className="text-xs text-white/50">{contactSubtitle}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-9 h-9 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0 border border-[#3b82f6]/20">
                    <Phone size={16} className="text-[#3b82f6]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block mb-0.5">Teléfono</span>
                    {contactPhone1 && <p className="text-white text-xs md:text-sm font-semibold hover:text-[#3b82f6] transition-colors cursor-pointer">{contactPhone1}</p>}
                    {contactPhone2 && <p className="text-white text-xs md:text-sm font-semibold hover:text-[#3b82f6] transition-colors cursor-pointer">{contactPhone2}</p>}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-9 h-9 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0 border border-[#3b82f6]/20">
                    <Mail size={16} className="text-[#3b82f6]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block mb-0.5">Email</span>
                    {contactEmail1 && <p className="text-white text-xs md:text-sm font-semibold hover:text-[#3b82f6] transition-colors cursor-pointer">{contactEmail1}</p>}
                    {contactEmail2 && <p className="text-white text-xs md:text-sm font-semibold hover:text-[#3b82f6] transition-colors cursor-pointer">{contactEmail2}</p>}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-9 h-9 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0 border border-[#3b82f6]/20">
                    <MapPin size={16} className="text-[#3b82f6]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block mb-0.5">Ubicación</span>
                    <p className="text-white text-xs md:text-sm font-semibold">{contactLocation}</p>
                    <p className="text-white/60 text-xs mt-0.5">
                      {contactAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-9 h-9 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0 border border-[#3b82f6]/20">
                    <Clock size={16} className="text-[#3b82f6]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block mb-0.5">Horario de atención</span>
                    <p className="text-white text-xs font-semibold">{contactHoursWeek}</p>
                    <p className="text-white text-xs font-semibold">{contactHoursSat}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-8 p-3 bg-white/[0.02] border border-white/5 rounded-lg relative z-10">
              <ShieldCheck size={18} className="text-[#3b82f6] flex-shrink-0" />
              <span className="text-[10px] text-white/70">
                {contactBottomText}
              </span>
            </div>
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
                  <h3 className="text-xl font-bold tracking-wide uppercase">Editar Tarjeta de Contacto</h3>
                  <p className="text-xs text-white/50 mt-1 font-light">Actualiza los textos e imagen de fondo de la tarjeta de contacto.</p>
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
                
                {/* Background Image Upload */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                  {contactBgImage ? (
                    <div className="relative group w-20 h-12 bg-black/30 border border-white/10 rounded-lg overflow-hidden flex items-center justify-center">
                      <img src={contactBgImage} alt="Fondo" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => updateSettings({ contactBgImage: '' })}
                        className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 rounded-full text-white shadow-lg transition-colors cursor-pointer"
                        title="Remover Imagen"
                      >
                        <Trash2 size={8} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-12 bg-white/5 border border-dashed border-white/20 rounded-lg flex items-center justify-center text-white/30 text-[10px]">
                      Sin Fondo
                    </div>
                  )}
                  <div className="flex-grow">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-white/50 mb-1.5">Imagen de Fondo (Derecha)</label>
                    <button
                      type="button"
                      disabled={uploadingBg}
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white/10 hover:bg-white/15 text-white text-xs font-bold py-2 px-4 rounded-xl transition-all flex items-center gap-2 border border-white/10 cursor-pointer"
                    >
                      <Upload size={14} />
                      {uploadingBg ? 'Subiendo...' : 'Subir Imagen'}
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploadingBg(true);
                        try {
                          const url = await uploadFile(file);
                          if (url) {
                            updateSettings({ contactBgImage: url });
                          }
                        } catch (err) {
                          console.error("Error uploading bg:", err);
                          alert("No se pudo subir la imagen.");
                        } finally {
                          setUploadingBg(false);
                        }
                      }} 
                      className="hidden" 
                      accept="image/*" 
                    />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Título de la Tarjeta</label>
                    <input 
                      type="text" 
                      value={contactTitle}
                      onChange={(e) => updateSettings({ contactTitle: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Subtítulo de la Tarjeta</label>
                    <input 
                      type="text" 
                      value={contactSubtitle}
                      onChange={(e) => updateSettings({ contactSubtitle: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
                    />
                  </div>
                </div>

                {/* Phones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Teléfono 1</label>
                    <input 
                      type="text" 
                      value={contactPhone1}
                      onChange={(e) => updateSettings({ contactPhone1: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Teléfono 2</label>
                    <input 
                      type="text" 
                      value={contactPhone2}
                      onChange={(e) => updateSettings({ contactPhone2: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
                    />
                  </div>
                </div>

                {/* Emails */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Email 1</label>
                    <input 
                      type="email" 
                      value={contactEmail1}
                      onChange={(e) => updateSettings({ contactEmail1: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Email 2</label>
                    <input 
                      type="email" 
                      value={contactEmail2}
                      onChange={(e) => updateSettings({ contactEmail2: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
                    />
                  </div>
                </div>

                {/* Location & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Ubicación (Ciudad, País)</label>
                    <input 
                      type="text" 
                      value={contactLocation}
                      onChange={(e) => updateSettings({ contactLocation: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Dirección Física (Calle, Colonia)</label>
                    <input 
                      type="text" 
                      value={contactAddress}
                      onChange={(e) => updateSettings({ contactAddress: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
                    />
                  </div>
                </div>

                {/* Hours */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Horario Entre Semana</label>
                    <input 
                      type="text" 
                      value={contactHoursWeek}
                      onChange={(e) => updateSettings({ contactHoursWeek: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Horario Sábados</label>
                    <input 
                      type="text" 
                      value={contactHoursSat}
                      onChange={(e) => updateSettings({ contactHoursSat: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
                    />
                  </div>
                </div>

                {/* Bottom text */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Texto de Certificación / Pie de Tarjeta</label>
                  <input 
                    type="text" 
                    value={contactBottomText}
                    onChange={(e) => updateSettings({ contactBottomText: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3b82f6] transition-colors"
                  />
                </div>

              </div>

              {/* Action Buttons Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-white/40 text-xs">Los cambios se guardan localmente y se envían a la nube.</p>
                <button
                  type="button"
                  onClick={async () => {
                    await syncToCloud();
                    setIsEditing(false);
                  }}
                  className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-[0_4px_20px_rgba(59,130,246,0.25)] cursor-pointer"
                >
                  Guardar y Sincronizar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactSection;
