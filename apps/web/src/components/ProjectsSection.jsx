
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Image as ImageIcon, Maximize, Minimize } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';

const projects = [
  {
    id: 1,
    title: 'Plantas de Reciclaje',
    category: 'Reciclaje',
    image: 'https://images.unsplash.com/photo-1612479620013-1ec36413e07c',
    description: 'Sistemas completos de reciclaje de plásticos con capacidad de 50 toneladas/día'
  },
  {
    id: 2,
    title: 'Líneas de Chocolate',
    category: 'Alimentos',
    image: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed',
    description: 'Equipos especializados para procesamiento y envasado de chocolate'
  },
  {
    id: 3,
    title: 'Sistemas de Packaging',
    category: 'Packaging',
    image: 'https://images.unsplash.com/photo-1495716098472-4bd5c0382520',
    description: 'Soluciones integrales de llenado, etiquetado y encartonado'
  },
  {
    id: 4,
    title: 'Automatización Industrial',
    category: 'Automatización',
    image: 'https://images.unsplash.com/photo-1642721084699-1c3007e38d9e',
    description: 'Sistemas de control PLC con integración de sensores y actuadores'
  },
  {
    id: 5,
    title: 'Plantas de Procesamiento',
    category: 'Alimentos',
    image: 'https://images.unsplash.com/photo-1652211955971-7517ff03529d',
    description: 'Líneas completas de procesamiento de alimentos con automatización'
  },
  {
    id: 6,
    title: 'Sistemas Compuestos',
    category: 'Construcción',
    image: 'https://images.unsplash.com/photo-1684260756943-a4537398bb90',
    description: 'Fabricación de materiales compuestos para construcción sostenible'
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

const ProjectsSection = () => {
  const { cmsState, isEditorMode, updatePageModule } = useCMS();
  const [uploadingId, setUploadingId] = useState(null);

  // Find module data
  const pageData = cmsState.pages.find(p => p.id === 'home');
  const moduleData = pageData?.modules?.find(m => m.id === 'projects');
  const activeProjects = moduleData?.data?.items || projects;
  const sectionTitle = moduleData?.data?.title || 'Proyectos Destacados';

  const handleTriggerUpload = async (projectId) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*,video/*';
    fileInput.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        setUploadingId(projectId);
        const url = await uploadFile(file);

        const newItems = activeProjects.map(item =>
          item.id === projectId ? { ...item, image: url } : item
        );

        updatePageModule('home', 'projects', { items: newItems });
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error al subir el archivo. Por favor intenta de nuevo.');
      } finally {
        setUploadingId(null);
      }
    };
    fileInput.click();
  };

  return (
    <section className="bg-[#0B0F14] px-[20px] py-[40px] md:px-[30px] md:py-[60px] lg:px-[40px] lg:py-[80px] w-full relative pt-[60px]">
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
          className={`text-[#FFFFFF] font-[700] text-[28px] md:text-[36px] lg:text-[48px] text-center mb-[40px] ${isEditorMode ? 'outline-dashed outline-2 outline-blue-400 cursor-text bg-black/20 p-2 rounded-lg' : ''}`}
          dangerouslySetInnerHTML={{ __html: sectionTitle }}
          onBlur={(e) => {
            updatePageModule('home', 'projects', { title: e.target.innerHTML, items: activeProjects });
          }}
          contentEditable={isEditorMode}
          suppressContentEditableWarning={true}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]"
        >
          {activeProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group relative h-[250px] md:h-[300px] lg:h-[350px] cursor-pointer shadow-lg z-0 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 z-10' : 'hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] z-0'} transition-all duration-250 ease-in-out`}
            >
              {/* Inner wrapper for rounding and clipping */}
              <div className={`absolute inset-0 rounded-[12px] overflow-hidden border-t-[3px] border-transparent transition-all duration-250 ease-in-out ${!isEditorMode ? 'group-hover:border-[#FFD700]' : ''}`}>
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center z-[1] transition-transform duration-250 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />

                {/* Dark Overlay */}
                <div
                  className="absolute inset-0 z-[2] transition-colors duration-250 ease-in-out"
                  style={{ backgroundColor: `rgba(0,0,0,${project.imageOpacity !== undefined ? project.imageOpacity : 0.5})` }}
                />

                {/* Content */}
                <div
                  className="relative z-[3] h-full flex flex-col justify-end items-start pointer-events-none"
                  style={{ padding: project.cardPadding !== undefined ? `${project.cardPadding}px` : '30px' }}
                >
                  <div className="w-full pointer-events-auto">
                    <span
                      className={`font-[600] uppercase tracking-[1px] mb-[8px] transition-colors duration-250 ease-in-out inline-block ${(!isEditorMode && !project.catColor) ? 'group-hover:text-[#FFFFFF]' : ''} ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/20 p-1 rounded backdrop-blur-sm' : ''} ${project.catSize ? '' : 'text-[12px]'}`}
                      style={{
                        color: project.catColor || '#FFD700',
                        textAlign: project.catAlign || 'left',
                        fontSize: project.catSize ? `${project.catSize}px` : undefined,
                        display: project.catAlign === 'center' ? 'block' : 'inline-block'
                      }}
                      dangerouslySetInnerHTML={{ __html: project.category }}
                      contentEditable={isEditorMode}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const newItems = activeProjects.map(item => item.id === project.id ? { ...item, category: e.target.innerHTML } : item);
                        updatePageModule('home', 'projects', { items: newItems });
                      }}
                    />
                    <h3
                      className={`font-[700] mb-[8px] transition-colors duration-250 ease-in-out ${(!isEditorMode && !project.titleColor) ? 'group-hover:text-[#FFD700]' : ''} ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 backdrop-blur-md border border-white/10 shadow-lg px-3 py-2 rounded-lg' : 'bg-black/40 backdrop-blur-md border border-white/10 shadow-lg px-3 py-2 rounded-lg'} ${project.titleSize ? '' : 'text-[18px] md:text-[22px] lg:text-[28px]'}`}
                      style={{
                        color: project.titleColor || '#FFFFFF',
                        textAlign: project.titleAlign || 'left',
                        fontSize: project.titleSize ? `${project.titleSize}px` : undefined
                      }}
                      dangerouslySetInnerHTML={{ __html: project.title }}
                      contentEditable={isEditorMode}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const newItems = activeProjects.map(item => item.id === project.id ? { ...item, title: e.target.innerHTML } : item);
                        updatePageModule('home', 'projects', { items: newItems });
                      }}
                    />
                    <p
                      className={`font-[400] leading-[1.5] transition-opacity duration-250 ease-in-out mt-1 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 backdrop-blur-md border border-white/10 shadow-lg px-3 py-2 rounded-lg' : 'opacity-80 group-hover:opacity-100 bg-black/40 backdrop-blur-md border border-white/10 shadow-lg px-3 py-2 rounded-lg'} ${project.descSize ? '' : 'text-[11px] md:text-[12px] lg:text-[13px]'}`}
                      style={{
                        color: project.descColor || '#D0D0D0',
                        textAlign: project.descAlign || 'left',
                        fontSize: project.descSize ? `${project.descSize}px` : undefined
                      }}
                      dangerouslySetInnerHTML={{ __html: project.description }}
                      contentEditable={isEditorMode}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const newItems = activeProjects.map(item => item.id === project.id ? { ...item, description: e.target.innerHTML } : item);
                        updatePageModule('home', 'projects', { items: newItems });
                      }}
                    />
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
                        value={project.titleColor || '#FFFFFF'}
                        onChange={e => {
                          const newItems = activeProjects.map(item => item.id === project.id ? { ...item, titleColor: e.target.value } : item);
                          updatePageModule('home', 'projects', { items: newItems });
                        }}
                        title="Color del Título"
                      />
                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                      <ToolbarTextButton text="A-" onClick={() => { const newItems = activeProjects.map(item => item.id === project.id ? { ...item, titleSize: (item.titleSize || 28) - 2 } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Reducir tamaño" />
                      <ToolbarTextButton text="A+" onClick={() => { const newItems = activeProjects.map(item => item.id === project.id ? { ...item, titleSize: (item.titleSize || 28) + 2 } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Aumentar tamaño" />
                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                      <ToolbarButton icon={AlignLeft} active={project.titleAlign === 'left' || !project.titleAlign} onClick={() => { const newItems = activeProjects.map(item => item.id === project.id ? { ...item, titleAlign: 'left' } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Alinear Izquierda" />
                      <ToolbarButton icon={AlignCenter} active={project.titleAlign === 'center'} onClick={() => { const newItems = activeProjects.map(item => item.id === project.id ? { ...item, titleAlign: 'center' } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Alinear Centro" />
                      <ToolbarButton icon={AlignRight} active={project.titleAlign === 'right'} onClick={() => { const newItems = activeProjects.map(item => item.id === project.id ? { ...item, titleAlign: 'right' } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Alinear Derecha" />
                      <ToolbarButton icon={AlignJustify} active={project.titleAlign === 'justify'} onClick={() => { const newItems = activeProjects.map(item => item.id === project.id ? { ...item, titleAlign: 'justify' } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Justificar" />
                    </div>

                    {/* Descripción Toolbar */}
                    <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                      <div className="flex items-center justify-center w-[24px] px-1 text-white/40"><strong className="text-[10px] uppercase">D</strong></div>
                      <ToolbarColorPicker
                        value={project.descColor || '#D0D0D0'}
                        onChange={e => {
                          const newItems = activeProjects.map(item => item.id === project.id ? { ...item, descColor: e.target.value } : item);
                          updatePageModule('home', 'projects', { items: newItems });
                        }}
                        title="Color de la Descripción"
                      />
                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                      <ToolbarTextButton text="A-" onClick={() => { const newItems = activeProjects.map(item => item.id === project.id ? { ...item, descSize: (item.descSize || 13) - 1 } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Reducir tamaño" />
                      <ToolbarTextButton text="A+" onClick={() => { const newItems = activeProjects.map(item => item.id === project.id ? { ...item, descSize: (item.descSize || 13) + 1 } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Aumentar tamaño" />
                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                      <ToolbarButton icon={AlignLeft} active={project.descAlign === 'left' || !project.descAlign} onClick={() => { const newItems = activeProjects.map(item => item.id === project.id ? { ...item, descAlign: 'left' } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Alinear Izquierda" />
                      <ToolbarButton icon={AlignCenter} active={project.descAlign === 'center'} onClick={() => { const newItems = activeProjects.map(item => item.id === project.id ? { ...item, descAlign: 'center' } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Alinear Centro" />
                      <ToolbarButton icon={AlignRight} active={project.descAlign === 'right'} onClick={() => { const newItems = activeProjects.map(item => item.id === project.id ? { ...item, descAlign: 'right' } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Alinear Derecha" />
                      <ToolbarButton icon={AlignJustify} active={project.descAlign === 'justify'} onClick={() => { const newItems = activeProjects.map(item => item.id === project.id ? { ...item, descAlign: 'justify' } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Justificar" />
                    </div>

                    {/* Categoría Toolbar */}
                    <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                      <div className="flex items-center justify-center w-[24px] px-1 text-white/40"><strong className="text-[10px] uppercase">Cat</strong></div>
                      <ToolbarColorPicker
                        value={project.catColor || '#FFD700'}
                        onChange={e => {
                          const newItems = activeProjects.map(item => item.id === project.id ? { ...item, catColor: e.target.value } : item);
                          updatePageModule('home', 'projects', { items: newItems });
                        }}
                        title="Color de Categoría"
                      />
                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                      <ToolbarTextButton text="A-" onClick={() => { const newItems = activeProjects.map(item => item.id === project.id ? { ...item, catSize: (item.catSize || 12) - 1 } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Reducir tamaño" />
                      <ToolbarTextButton text="A+" onClick={() => { const newItems = activeProjects.map(item => item.id === project.id ? { ...item, catSize: (item.catSize || 12) + 1 } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Aumentar tamaño" />
                    </div>

                    {/* Caja y Fondo Toolbar */}
                    <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                      <div className="flex items-center justify-center w-[24px] px-1 text-white/40"><strong className="text-[10px] uppercase">C/F</strong></div>

                      {/* Espaciado de caja */}
                      <ToolbarButton icon={Maximize} active={false} onClick={() => { const p = (project.cardPadding !== undefined ? project.cardPadding : 30); const newItems = activeProjects.map(item => item.id === project.id ? { ...item, cardPadding: Math.max(0, p - 5) } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Agrandar espacio de texto" />
                      <ToolbarButton icon={Minimize} active={false} onClick={() => { const p = (project.cardPadding !== undefined ? project.cardPadding : 30); const newItems = activeProjects.map(item => item.id === project.id ? { ...item, cardPadding: p + 5 } : item); updatePageModule('home', 'projects', { items: newItems }); }} title="Reducir espacio de texto" />

                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />

                      {/* Upload de Imagen */}
                      <ToolbarButton
                        icon={ImageIcon}
                        loading={uploadingId === project.id}
                        active={false}
                        onClick={(e) => { e.stopPropagation(); handleTriggerUpload(project.id); }}
                        title="Cambiar imagen de fondo"
                      />

                      {/* Opacidad del Overlay */}
                      <div className="flex items-center mx-1 group/slider relative" title="Oscurecer o aclarar fondo">
                        <input
                          type="range"
                          min="0" max="0.9" step="0.05"
                          value={project.imageOpacity !== undefined ? project.imageOpacity : 0.5}
                          onChange={(e) => {
                            e.stopPropagation();
                            const newItems = activeProjects.map(item => item.id === project.id ? { ...item, imageOpacity: parseFloat(e.target.value) } : item);
                            updatePageModule('home', 'projects', { items: newItems });
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

export default ProjectsSection;
