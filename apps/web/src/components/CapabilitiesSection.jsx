
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Zap, Bot, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';

const defaultCapabilities = [
  {
    id: 1,
    title: 'Ingeniería de Procesos',
    description: 'Diseño y optimización de procesos industriales para maximizar la eficiencia, reducir costos operativos y garantizar la máxima calidad en cada etapa de producción.',
    iconName: 'Settings'
  },
  {
    id: 2,
    title: 'Fabricación Industrial',
    description: 'Fabricación especializada de maquinaria y equipos robustos, utilizando materiales de alta resistencia y tecnología de vanguardia para entornos exigentes.',
    iconName: 'Zap'
  },
  {
    id: 3,
    title: 'Automatización Inteligente',
    description: 'Implementación de sistemas de control avanzados e inteligencia artificial para automatizar líneas de producción, mejorando la precisión y la seguridad.',
    iconName: 'Bot'
  }
];

const iconMap = {
  Settings,
  Zap,
  Bot
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
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
    className={`p-1.5 rounded-md transition-all duration-200 flex items-center justify-center h-[28px] max-w-[28px] ${active ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
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

const CapabilitiesSection = () => {
  const { cmsState, isEditorMode, updatePageModule } = useCMS();

  // Find module data
  const pageData = cmsState.pages.find(p => p.id === 'home');
  const moduleData = pageData?.modules?.find(m => m.id === 'capabilities');
  const activeCapabilities = moduleData?.data?.items || defaultCapabilities;
  const sectionTitle = moduleData?.data?.title || 'Nuestras Capacidades';

  return (
    <section className="bg-[#0B0F14] px-[20px] py-[40px] md:px-[30px] md:py-[60px] lg:px-[40px] lg:py-[80px] w-full pt-[60px]">
      <div className="max-w-[1400px] mx-auto relative">
        {/* Editor mode top controls for the section title */}
        {isEditorMode && (
          <div className="flex justify-center mb-4 gap-4 w-full">
            <div className="bg-[#1A1A1A]/95 p-1.5 rounded-lg border border-[#333] shadow-2xl backdrop-blur-md flex gap-2">
              <span className="text-white/40 text-[10px] uppercase flex items-center px-2">Color por palabra seleccionada:</span>
              <button
                onMouseDown={(e) => { e.preventDefault(); document.execCommand('foreColor', false, '#FFFFFF') }}
                className="hover:bg-white/10 text-white px-3 py-1 flex items-center gap-2 rounded text-xs transition-colors"
                title="Pintar selección de Blanco"
              >
                <div className="w-3 h-3 bg-white rounded-full border border-gray-400"></div> Blanco
              </button>
              <div className="w-[1px] h-full bg-white/10 mx-1" />
              <button
                onMouseDown={(e) => { e.preventDefault(); document.execCommand('foreColor', false, '#FFD700') }}
                className="hover:bg-white/10 text-[#FFD700] px-3 py-1 flex items-center gap-2 rounded text-xs transition-colors"
                title="Pintar selección de Acento"
              >
                <div className="w-3 h-3 bg-[#FFD700] rounded-full"></div> Acento
              </button>
            </div>
          </div>
        )}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className={`text-[#FFFFFF]  font-[700] text-[28px] md:text-[36px] lg:text-[48px] text-center mb-[40px] ${isEditorMode ? 'outline-dashed outline-2 outline-blue-400 cursor-text bg-black/20 p-2 rounded-lg' : ''}`}
          dangerouslySetInnerHTML={{ __html: sectionTitle }}
          onBlur={(e) => {
            updatePageModule('home', 'capabilities', { title: e.target.innerHTML, items: activeCapabilities });
          }}
          contentEditable={isEditorMode}
          suppressContentEditableWarning={true}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-[24px]"
        >
          {activeCapabilities.map((capability) => {
            const Icon = iconMap[capability.iconName] || Settings;
            return (
              <motion.div
                key={capability.id}
                variants={itemVariants}
                className={`group relative bg-[rgba(255,255,255,0.05)] border ${isEditorMode ? 'border-dashed border-blue-400' : 'border-[rgba(255,255,255,0.1)]'} rounded-[12px] p-[40px] pt-[60px] min-h-[300px] transition-all duration-250 ease-in-out hover:bg-[rgba(255,255,255,0.1)] hover:border-[#FFD700] hover:-translate-y-[5px] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] flex flex-col items-center`}
              >
                {/* Editor mode top controls (Professional Toolbar) */}
                {isEditorMode && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 flex justify-center items-start z-30 pointer-events-none w-max">
                    <div className="flex flex-col gap-1 pointer-events-auto bg-[#1A1A1A]/95 p-1.5 rounded-lg border border-[#333] shadow-2xl backdrop-blur-md">
                      {/* Título Toolbar */}
                      <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                        <div className="flex items-center justify-center w-[24px] px-1 text-white/40"><strong className="text-[10px] uppercase">T</strong></div>
                        <ToolbarColorPicker
                          value={capability.titleColor || '#FFFFFF'}
                          onChange={e => {
                            const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, titleColor: e.target.value } : item);
                            updatePageModule('home', 'capabilities', { items: newItems });
                          }}
                          title="Color del Título"
                        />
                        <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                        <ToolbarTextButton text="A-" onClick={() => { const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, titleSize: (item.titleSize || 24) - 2 } : item); updatePageModule('home', 'capabilities', { items: newItems }); }} title="Reducir tamaño" />
                        <ToolbarTextButton text="A+" onClick={() => { const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, titleSize: (item.titleSize || 24) + 2 } : item); updatePageModule('home', 'capabilities', { items: newItems }); }} title="Aumentar tamaño" />
                        <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                        <ToolbarButton icon={AlignLeft} active={capability.titleAlign === 'left'} onClick={() => { const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, titleAlign: 'left' } : item); updatePageModule('home', 'capabilities', { items: newItems }); }} title="Alinear Izquierda" />
                        <ToolbarButton icon={AlignCenter} active={capability.titleAlign === 'center' || !capability.titleAlign} onClick={() => { const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, titleAlign: 'center' } : item); updatePageModule('home', 'capabilities', { items: newItems }); }} title="Alinear Centro" />
                        <ToolbarButton icon={AlignRight} active={capability.titleAlign === 'right'} onClick={() => { const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, titleAlign: 'right' } : item); updatePageModule('home', 'capabilities', { items: newItems }); }} title="Alinear Derecha" />
                        <ToolbarButton icon={AlignJustify} active={capability.titleAlign === 'justify'} onClick={() => { const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, titleAlign: 'justify' } : item); updatePageModule('home', 'capabilities', { items: newItems }); }} title="Justificar" />
                      </div>

                      {/* Descripción Toolbar */}
                      <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                        <div className="flex items-center justify-center w-[24px] px-1 text-white/40"><strong className="text-[10px] uppercase">D</strong></div>
                        <ToolbarColorPicker
                          value={capability.descColor || '#D0D0D0'}
                          onChange={e => {
                            const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, descColor: e.target.value } : item);
                            updatePageModule('home', 'capabilities', { items: newItems });
                          }}
                          title="Color de la Descripción"
                        />
                        <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                        <ToolbarTextButton text="A-" onClick={() => { const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, descSize: (item.descSize || 14) - 1 } : item); updatePageModule('home', 'capabilities', { items: newItems }); }} title="Reducir tamaño" />
                        <ToolbarTextButton text="A+" onClick={() => { const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, descSize: (item.descSize || 14) + 1 } : item); updatePageModule('home', 'capabilities', { items: newItems }); }} title="Aumentar tamaño" />
                        <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                        <ToolbarButton icon={AlignLeft} active={capability.descAlign === 'left'} onClick={() => { const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, descAlign: 'left' } : item); updatePageModule('home', 'capabilities', { items: newItems }); }} title="Alinear Izquierda" />
                        <ToolbarButton icon={AlignCenter} active={capability.descAlign === 'center' || !capability.descAlign} onClick={() => { const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, descAlign: 'center' } : item); updatePageModule('home', 'capabilities', { items: newItems }); }} title="Alinear Centro" />
                        <ToolbarButton icon={AlignRight} active={capability.descAlign === 'right'} onClick={() => { const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, descAlign: 'right' } : item); updatePageModule('home', 'capabilities', { items: newItems }); }} title="Alinear Derecha" />
                        <ToolbarButton icon={AlignJustify} active={capability.descAlign === 'justify'} onClick={() => { const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, descAlign: 'justify' } : item); updatePageModule('home', 'capabilities', { items: newItems }); }} title="Justificar" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="w-full h-full flex flex-col items-center">
                  <Icon
                    className="w-[64px] h-[64px] text-[#FFD700] mb-[24px] mx-auto transition-all duration-250 ease-in-out group-hover:text-[#FFFFFF] group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    strokeWidth={1.5}
                  />
                  <h3
                    className={`font-[700] mb-[16px] w-full transition-colors duration-250 ease-in-out group-hover:text-[#FFD700] ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/20 p-1 rounded' : ''} ${capability.titleSize ? '' : 'text-[18px] md:text-[20px] lg:text-[24px]'}`}
                    style={{
                      color: capability.titleColor || '#FFFFFF',
                      textAlign: capability.titleAlign || 'center',
                      fontSize: capability.titleSize ? `${capability.titleSize}px` : undefined
                    }}
                    dangerouslySetInnerHTML={{ __html: capability.title }}
                    contentEditable={isEditorMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, title: e.target.innerHTML } : item);
                      updatePageModule('home', 'capabilities', { items: newItems });
                    }}
                  />
                  <p
                    className={`font-[400] leading-[1.6] w-full ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/20 p-1 rounded' : ''} ${capability.descSize ? '' : 'text-[12px] md:text-[13px] lg:text-[14px]'}`}
                    style={{
                      color: capability.descColor || '#D0D0D0',
                      textAlign: capability.descAlign || 'center',
                      fontSize: capability.descSize ? `${capability.descSize}px` : undefined
                    }}
                    dangerouslySetInnerHTML={{ __html: capability.description }}
                    contentEditable={isEditorMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      const newItems = activeCapabilities.map(item => item.id === capability.id ? { ...item, description: e.target.innerHTML } : item);
                      updatePageModule('home', 'capabilities', { items: newItems });
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
