
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Image as ImageIcon, Maximize, Minimize } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';

const industries = [
  {
    id: 1,
    title: 'Reciclaje',
    description: 'Plantas de reciclaje de plásticos',
    image: 'https://images.unsplash.com/photo-1680214734782-48962f9c17eb'
  },
  {
    id: 2,
    title: 'Alimentos',
    description: 'Líneas de procesamiento alimentario',
    image: 'https://images.unsplash.com/photo-1535474035682-b50c07c2418f'
  },
  {
    id: 3,
    title: 'Packaging',
    description: 'Sistemas de llenado y envasado',
    image: 'https://images.unsplash.com/photo-1495716098472-4bd5c0382520'
  },
  {
    id: 4,
    title: 'Construcción',
    description: 'Materiales compuestos y reciclados',
    image: 'https://images.unsplash.com/photo-1576798815951-7c3ff46cf5f5'
  },
  {
    id: 5,
    title: 'Automatización',
    description: 'Sistemas inteligentes de control',
    image: 'https://images.unsplash.com/photo-1679986944940-c5001ec1c1da'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const ToolbarButton = ({ icon: Icon, active, onClick, title, loading }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onClick(e); }}
    title={title}
    className={`p-1.5 rounded-md transition-all duration-200 flex items-center justify-center h-[28px] ${active ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
  >
    {loading ? (
      <div className="w-[14px] h-[14px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
    ) : (
      <Icon size={16} strokeWidth={2} />
    )}
  </button>
);

const ToolbarTextButton = ({ text, onClick, title }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onClick(e); }}
    title={title}
    className="px-1.5 rounded-md transition-all duration-200 flex items-center justify-center h-[28px] text-white/70 hover:bg-white/10 hover:text-white"
  >
    <span className="font-bold leading-none mt-0.5" style={{ fontSize: text === 'A+' ? '13px' : '10px' }}>{text}</span>
  </button>
);

const ToolbarColorPicker = ({ value, onChange, title }) => (
  <div className="relative group flex items-center h-[28px] w-[28px] rounded-md overflow-hidden border border-white/20 hover:border-white/40 transition-colors" title={title}>
    <input
      type="color"
      value={value}
      onChange={onChange}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] cursor-pointer opacity-0 z-10"
    />
    <div className="w-full h-full pointer-events-none" style={{ backgroundColor: value }} />
  </div>
);

const IndustriesSection = () => {
  const { cmsState, isEditorMode, updatePageModule } = useCMS();
  const [activeUploadId, setActiveUploadId] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);
  const fileInputRef = useRef(null);

  const homePage = cmsState.pages.find(p => p.id === 'home');
  const industriesModule = homePage?.modules.find(m => m.id === 'industries') || {};
  const activeIndustries = industriesModule.data?.items || industries;

  const handleTriggerUpload = (id) => {
    setActiveUploadId(id);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && activeUploadId) {
      try {
        setUploadingId(activeUploadId);
        const url = await uploadFile(file, "media");
        const newItems = activeIndustries.map(item =>
          item.id === activeUploadId ? { ...item, image: url } : item
        );
        updatePageModule('home', 'industries', { items: newItems });
      } catch (err) {
        console.error("Error al subir imagen:", err);
      } finally {
        setUploadingId(null);
        setActiveUploadId(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  };

  return (
    <section id="industrias" className="bg-[#0B0F14] px-[20px] py-[40px] md:px-[30px] md:py-[60px] lg:px-[40px] lg:py-[80px] w-full relative">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <div className="max-w-[1400px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-[#FFFFFF] font-[700] text-[28px] md:text-[36px] lg:text-[48px] text-center mb-[60px]"
        >
          Sectores Industriales
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-[24px]"
        >
          {activeIndustries.map((industry) => (
            <motion.div
              key={industry.id}
              variants={itemVariants}
              className={`group relative h-[200px] md:h-[250px] lg:h-[300px] cursor-pointer shadow-lg z-0 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 z-10' : 'hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] z-0'} transition-all duration-250 ease-in-out`}
            >
              {/* Inner wrapper for rounding and clipping */}
              <div className={`absolute inset-0 rounded-[12px] overflow-hidden border-l-[4px] border-transparent transition-all duration-250 ease-in-out ${!isEditorMode ? 'group-hover:border-[#FFD700]' : ''}`}>
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-250 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${industry.image})` }}
                />

                {/* Dark Overlay */}
                <div
                  className="absolute inset-0 transition-colors duration-250 ease-in-out"
                  style={{ backgroundColor: `rgba(0,0,0,${industry.imageOpacity !== undefined ? industry.imageOpacity : 0.4})` }}
                />

                {/* Content */}
                <div
                  className="absolute inset-0 flex flex-col justify-end items-start z-10 w-full pointer-events-none"
                  style={{ padding: industry.cardPadding !== undefined ? `${industry.cardPadding}px` : '30px' }}
                >
                  <div className="w-full pointer-events-auto">
                    <h3
                      className={`font-[700] mb-[8px] transition-colors duration-250 ease-in-out ${(!isEditorMode && !industry.titleColor) ? 'group-hover:text-[#FFD700]' : ''} ${isEditorMode ? 'bg-black/40 backdrop-blur-md border border-white/10 shadow-lg px-3 py-2 rounded-lg outline-dashed outline-2 outline-blue-400 cursor-text' : ''} ${industry.titleSize ? '' : 'text-[18px] md:text-[22px] lg:text-[28px]'}`}
                      style={{
                        color: industry.titleColor || '#FFFFFF',
                        textAlign: industry.titleAlign || 'left',
                        fontSize: industry.titleSize ? `${industry.titleSize}px` : undefined
                      }}
                      contentEditable={isEditorMode}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, title: e.target.innerText } : item);
                        updatePageModule('home', 'industries', { items: newItems });
                      }}
                    >
                      {industry.title}
                    </h3>
                    <p
                      className={`font-[400] transition-opacity duration-250 ease-in-out mt-1 ${isEditorMode ? 'bg-black/40 backdrop-blur-md border border-white/10 shadow-lg px-3 py-2 rounded-lg outline-dashed outline-2 outline-blue-400 cursor-text' : 'opacity-80 group-hover:opacity-100'} ${industry.descSize ? '' : 'text-[11px] md:text-[12px] lg:text-[14px]'}`}
                      style={{
                        color: industry.descColor || '#D0D0D0',
                        textAlign: industry.descAlign || 'left',
                        fontSize: industry.descSize ? `${industry.descSize}px` : undefined
                      }}
                      contentEditable={isEditorMode}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, description: e.target.innerText } : item);
                        updatePageModule('home', 'industries', { items: newItems });
                      }}
                    >
                      {industry.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Editor mode top controls (Professional Toolbar) */}
              {isEditorMode && (
                <div className="absolute top-2 left-2 flex items-start z-30 pointer-events-none">
                  <div className="flex flex-col gap-1 pointer-events-auto bg-[#1A1A1A]/95 p-1.5 rounded-lg border border-[#333] shadow-2xl backdrop-blur-md w-max">
                    {/* Título Toolbar */}
                    <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                      <div className="flex items-center justify-center w-[24px] px-1 text-white/40"><strong className="text-[10px] uppercase">T</strong></div>
                      <ToolbarColorPicker
                        value={industry.titleColor || '#FFFFFF'}
                        onChange={e => {
                          const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, titleColor: e.target.value } : item);
                          updatePageModule('home', 'industries', { items: newItems });
                        }}
                        title="Color del Título"
                      />
                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                      <ToolbarTextButton text="A-" onClick={() => { const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, titleSize: (item.titleSize || 28) - 2 } : item); updatePageModule('home', 'industries', { items: newItems }); }} title="Reducir tamaño" />
                      <ToolbarTextButton text="A+" onClick={() => { const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, titleSize: (item.titleSize || 28) + 2 } : item); updatePageModule('home', 'industries', { items: newItems }); }} title="Aumentar tamaño" />
                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                      <ToolbarButton icon={AlignLeft} active={industry.titleAlign === 'left' || !industry.titleAlign} onClick={() => { const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, titleAlign: 'left' } : item); updatePageModule('home', 'industries', { items: newItems }); }} title="Alinear Izquierda" />
                      <ToolbarButton icon={AlignCenter} active={industry.titleAlign === 'center'} onClick={() => { const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, titleAlign: 'center' } : item); updatePageModule('home', 'industries', { items: newItems }); }} title="Alinear Centro" />
                      <ToolbarButton icon={AlignRight} active={industry.titleAlign === 'right'} onClick={() => { const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, titleAlign: 'right' } : item); updatePageModule('home', 'industries', { items: newItems }); }} title="Alinear Derecha" />
                      <ToolbarButton icon={AlignJustify} active={industry.titleAlign === 'justify'} onClick={() => { const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, titleAlign: 'justify' } : item); updatePageModule('home', 'industries', { items: newItems }); }} title="Justificar" />
                    </div>

                    {/* Descripción Toolbar */}
                    <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                      <div className="flex items-center justify-center w-[24px] px-1 text-white/40"><strong className="text-[10px] uppercase">D</strong></div>
                      <ToolbarColorPicker
                        value={industry.descColor || '#D0D0D0'}
                        onChange={e => {
                          const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, descColor: e.target.value } : item);
                          updatePageModule('home', 'industries', { items: newItems });
                        }}
                        title="Color de la Descripción"
                      />
                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                      <ToolbarTextButton text="A-" onClick={() => { const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, descSize: (item.descSize || 14) - 1 } : item); updatePageModule('home', 'industries', { items: newItems }); }} title="Reducir tamaño" />
                      <ToolbarTextButton text="A+" onClick={() => { const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, descSize: (item.descSize || 14) + 1 } : item); updatePageModule('home', 'industries', { items: newItems }); }} title="Aumentar tamaño" />
                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                      <ToolbarButton icon={AlignLeft} active={industry.descAlign === 'left' || !industry.descAlign} onClick={() => { const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, descAlign: 'left' } : item); updatePageModule('home', 'industries', { items: newItems }); }} title="Alinear Izquierda" />
                      <ToolbarButton icon={AlignCenter} active={industry.descAlign === 'center'} onClick={() => { const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, descAlign: 'center' } : item); updatePageModule('home', 'industries', { items: newItems }); }} title="Alinear Centro" />
                      <ToolbarButton icon={AlignRight} active={industry.descAlign === 'right'} onClick={() => { const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, descAlign: 'right' } : item); updatePageModule('home', 'industries', { items: newItems }); }} title="Alinear Derecha" />
                      <ToolbarButton icon={AlignJustify} active={industry.descAlign === 'justify'} onClick={() => { const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, descAlign: 'justify' } : item); updatePageModule('home', 'industries', { items: newItems }); }} title="Justificar" />
                    </div>

                    {/* Caja y Fondo Toolbar */}
                    <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                      <div className="flex items-center justify-center w-[24px] px-1 text-white/40"><strong className="text-[10px] uppercase">C/F</strong></div>

                      {/* Espaciado de caja */}
                      <ToolbarButton icon={Maximize} active={false} onClick={() => { const p = (industry.cardPadding !== undefined ? industry.cardPadding : 30); const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, cardPadding: Math.max(0, p - 5) } : item); updatePageModule('home', 'industries', { items: newItems }); }} title="Agrandar espacio de texto" />
                      <ToolbarButton icon={Minimize} active={false} onClick={() => { const p = (industry.cardPadding !== undefined ? industry.cardPadding : 30); const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, cardPadding: p + 5 } : item); updatePageModule('home', 'industries', { items: newItems }); }} title="Reducir espacio de texto" />

                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />

                      {/* Upload de Imagen */}
                      <ToolbarButton
                        icon={ImageIcon}
                        loading={uploadingId === industry.id}
                        active={false}
                        onClick={(e) => { e.stopPropagation(); handleTriggerUpload(industry.id); }}
                        title="Cambiar imagen de fondo"
                      />

                      {/* Opacidad del Overlay */}
                      <div className="flex items-center mx-1 group/slider relative" title="Oscurecer o aclarar fondo">
                        <input
                          type="range"
                          min="0" max="0.9" step="0.05"
                          value={industry.imageOpacity !== undefined ? industry.imageOpacity : 0.4}
                          onChange={(e) => {
                            e.stopPropagation();
                            const newItems = activeIndustries.map(item => item.id === industry.id ? { ...item, imageOpacity: parseFloat(e.target.value) } : item);
                            updatePageModule('home', 'industries', { items: newItems });
                          }}
                          className="w-[50px] md:w-[60px] h-[3px] bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-[#FFD700] [&::-webkit-slider-thumb]:rounded-full opacity-70 group-hover/slider:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}


            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;
