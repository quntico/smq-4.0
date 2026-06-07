import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';
import { getOptimizedImageUrl } from '@/lib/utils.js';

const defaultProjects = [
  {
    id: 1,
    title: 'Planta de Procesamiento RSU 600 TPD',
    desc: 'Clasificación mecanizada, separación de reciclables y valorización de residuos sólidos urbanos para generación de combustibles alternativos.',
    specs: 'Capacidad: 600 Ton/Día | Ubicación: Monterrey, MX',
    image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
    image2: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png',
    specsTable: {
      capacidad: '600 Toneladas / Día',
      ubicacion: 'Monterrey, Nuevo León, MX',
      aplicacion: 'Clasificación y Separación de Residuos Sólidos Urbanos (RSU)',
      control: 'PLC Siemens S7-1500 + SCADA WinCC',
      tecnologia: 'Separación Óptica (NIR) + Clasificación por IA',
      material: 'Acero Anti-abrasión de Alta Resistencia',
      consumo: '≈ 980 kW (Operación continua)',
      eficiencia: '95.0% Disponibilidad Operativa',
      estandares: 'CE • ISO 14001 • ISO 45001'
    }
  },
  {
    id: 2,
    title: 'Línea de Procesamiento de Chocolate',
    desc: 'Automatización integral para el control de temperatura, templado continuo y moldeado de chocolate de grado exportación.',
    specs: 'Capacidad: 2000 kg/h | Ubicación: Bogotá, CO',
    image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png',
    image2: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115213579_choco%20bN%202.png',
    specsTable: {
      capacidad: '2,000 kg/h',
      ubicacion: 'Bogotá, Colombia',
      aplicacion: 'Atemperado y Moldeado de Chocolate',
      control: 'PLC Siemens + HMI Industrial + SCADA',
      tecnologia: 'Industria 4.0 / SCR700 + Telemetría IoT',
      material: 'AISI 304 / 316L Food Grade',
      consumo: '≈ 196 kW (Promedio de Operación)',
      eficiencia: '98.5% (Disponibilidad Operativa)',
      estandares: 'CE • HACCP • GMP'
    }
  },
  {
    id: 3,
    title: 'Planta de Pelletizado de Plástico',
    desc: 'Extrusión de alto rendimiento con desgasificación al vacío, filtrado hidráulico continuo y corte bajo agua.',
    specs: 'Capacidad: 1200 kg/h | Ubicación: Lima, PE',
    image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png',
    image2: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png',
    specsTable: {
      capacidad: '1,200 kg/h (PTCS185)',
      ubicacion: 'Lima, Perú',
      aplicacion: 'Extrusión y Pelletizado de Alto Rendimiento',
      control: 'PLC + HMI / 440 VAC, 3F, 60 Hz',
      tecnologia: 'Doble Desgasificación / Vacío Activo',
      material: 'Tornillo de 185 mm / Relación L/D 18-42',
      consumo: '≈ 366 kW (Aproximado)',
      eficiencia: 'Water Ring Die Face / Doble Pistón',
      estandares: 'CE • ISO 9001 (Operadores: 2-4)'
    }
  }
];

const IndustrialProjectsSection = () => {
  const { cmsState, isEditorMode, updatePageModule } = useCMS();
  
  // States
  const [uploadingIdx, setUploadingIdx] = useState(null);
  const [uploadingSlot, setUploadingSlot] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState(1); // 1 = Image 1, 2 = Image 2
  
  const fileInputRef = useRef(null);

  // Extract CMS data
  const homePage = cmsState.pages?.find(p => p.id === 'home');
  const projectsData = homePage?.modules?.find(m => m.id === 'proyectos')?.data || {};

  const rawProjects = projectsData.items || defaultProjects;
  const activeProjects = rawProjects.map(project => {
    if (project.id === 1 && (project.title?.includes('Plástico') || !project.title || project.title === 'Planta Reciclaje Plástico 600 TPD')) {
      return {
        ...project,
        title: 'Planta de Procesamiento RSU 600 TPD',
        desc: 'Clasificación mecanizada, separación de reciclables y valorización de residuos sólidos urbanos para generación de combustibles alternativos.',
        specs: 'Capacidad: 600 Ton/Día | Ubicación: Monterrey, MX',
        specsTable: defaultProjects[0].specsTable
      };
    }
    if (project.id === 3 && (project.specs?.includes('1500') || !project.specs)) {
      return {
        ...project,
        specs: 'Capacidad: 1200 kg/h | Ubicación: Lima, PE',
        specsTable: defaultProjects[2].specsTable
      };
    }
    return project;
  });
  const sectionTitle = projectsData.title || 'Proyectos <span class="text-[#F5C400]">Destacados</span>';
  const sectionSubtitle = projectsData.subtitle || 'Casos de éxito y plantas industriales implementadas por nuestro equipo.';

  // Handle ESC closing key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUploadClick = (idx, slot) => {
    setSelectedIdx(idx);
    setSelectedSlot(slot);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingIdx(selectedIdx);
      setUploadingSlot(selectedSlot);
      const url = await uploadFile(file);
      
      const newItems = activeProjects.map((item, idx) => {
        if (idx === selectedIdx) {
          return selectedSlot === 1 
            ? { ...item, image: url } 
            : { ...item, image2: url };
        }
        return item;
      });
      
      updatePageModule('home', 'proyectos', {
        title: sectionTitle,
        subtitle: sectionSubtitle,
        items: newItems
      });

      // Sync active modal project visual state if open
      if (selectedProject && selectedProject.index === selectedIdx) {
        setSelectedProject(prev => ({
          ...prev,
          image: selectedSlot === 1 ? url : prev.image,
          image2: selectedSlot === 2 ? url : prev.image2
        }));
      }

    } catch (err) {
      console.error("Error uploading project image:", err);
      alert("Error al subir la imagen.");
    } finally {
      setUploadingIdx(null);
      setSelectedIdx(null);
      setSelectedSlot(null);
    }
  };

  const handleTableSpecChange = (projectIdx, field, value) => {
    const newItems = activeProjects.map((item, idx) => {
      if (idx === projectIdx) {
        return {
          ...item,
          specsTable: {
            ...(item.specsTable || {}),
            [field]: value
          }
        };
      }
      return item;
    });

    updatePageModule('home', 'proyectos', {
      title: sectionTitle,
      subtitle: sectionSubtitle,
      items: newItems
    });
  };

  return (
    <section id="proyectos" className="py-16 md:py-24 bg-card/30 relative">
      <div className="container mx-auto px-4">
        
        {/* Hidden File Input for uploading */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.gif,.bmp,.tiff,.heic,.heif,.jfif,.PNG,.JPG,.JPEG,.WEBP,.SVG,.GIF,.BMP,.TIFF,.HEIC,.HEIF,.JFIF" 
          className="hidden" 
        />

        <div className="text-center mb-12 relative">
          <h2 
            className={`text-3xl md:text-5xl font-bold text-foreground mb-4 ${isEditorMode ? 'outline-dashed outline-2 outline-blue-400 cursor-text bg-black/20 p-2 rounded-lg' : ''}`}
            dangerouslySetInnerHTML={{ __html: sectionTitle }}
            contentEditable={isEditorMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              updatePageModule('home', 'proyectos', {
                title: e.target.innerHTML,
                subtitle: sectionSubtitle,
                items: activeProjects
              });
            }}
          />
          <p 
            className={`text-lg text-muted-foreground max-w-2xl mx-auto ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/20 p-1 rounded backdrop-blur-sm' : ''}`}
            dangerouslySetInnerHTML={{ __html: sectionSubtitle }}
            contentEditable={isEditorMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              updatePageModule('home', 'proyectos', {
                title: sectionTitle,
                subtitle: e.target.innerHTML,
                items: activeProjects
              });
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeProjects.map((project, idx) => (
            <motion.div 
              key={project.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              onClick={() => {
                setActiveTab(2);
                setSelectedProject({ ...project, index: idx });
              }}
              className="group relative rounded-xl overflow-hidden glass-card aspect-[4/5] border border-transparent hover:border-primary/50 transition-colors duration-300 cursor-pointer"
            >
              <img 
                src={getOptimizedImageUrl(project.image, 600)} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80 group-hover:from-primary/80 group-hover:via-background/80 transition-all duration-500"></div>
              
              {/* Image upload triggers in Editor Mode */}
              {isEditorMode && (
                <div className="absolute top-4 left-4 right-4 z-30 flex gap-2 pointer-events-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadClick(idx, 1);
                    }}
                    className="flex-1 bg-[#F5C400] text-black font-black text-[9px] tracking-wider uppercase py-1.5 px-2 rounded-md hover:bg-white hover:text-black transition-all shadow-lg text-center"
                  >
                    {uploadingIdx === idx && uploadingSlot === 1 ? 'Subiendo...' : 'Subir Img 1'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadClick(idx, 2);
                    }}
                    className="flex-1 bg-white/20 border border-white/30 text-white font-black text-[9px] tracking-wider uppercase py-1.5 px-2 rounded-md hover:bg-white hover:text-black transition-all shadow-lg text-center backdrop-blur-md"
                  >
                    {uploadingIdx === idx && uploadingSlot === 2 ? 'Subiendo...' : 'Subir Img 2'}
                  </button>
                </div>
              )}

              <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                <h3 
                  className={`text-2xl font-bold text-white mb-2 min-h-[56px] flex items-end ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 p-1 rounded backdrop-blur-sm' : ''}`}
                  contentEditable={isEditorMode}
                  suppressContentEditableWarning={true}
                  onClick={e => e.stopPropagation()}
                  onBlur={(e) => {
                    const newItems = activeProjects.map((item, i) => 
                      i === idx ? { ...item, title: e.target.innerText } : item
                    );
                    updatePageModule('home', 'proyectos', {
                      title: sectionTitle,
                      subtitle: sectionSubtitle,
                      items: newItems
                    });
                  }}
                >
                  {project.title}
                </h3>
                
                <p 
                  className={`text-primary group-hover:text-white text-sm font-semibold mb-3 transition-colors duration-300 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 p-1 rounded backdrop-blur-sm' : ''}`}
                  contentEditable={isEditorMode}
                  suppressContentEditableWarning={true}
                  onClick={e => e.stopPropagation()}
                  onBlur={(e) => {
                    const newItems = activeProjects.map((item, i) => 
                      i === idx ? { ...item, specs: e.target.innerText } : item
                    );
                    updatePageModule('home', 'proyectos', {
                      title: sectionTitle,
                      subtitle: sectionSubtitle,
                      items: newItems
                    });
                  }}
                >
                  {project.specs}
                </p>
                
                <p 
                  className={`text-white/80 text-sm mb-6 line-clamp-2 min-h-[40px] max-h-[40px] opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 p-1 rounded backdrop-blur-sm opacity-100 min-h-0 max-h-none line-clamp-none' : ''}`}
                  contentEditable={isEditorMode}
                  suppressContentEditableWarning={true}
                  onClick={e => e.stopPropagation()}
                  onBlur={(e) => {
                    const newItems = activeProjects.map((item, i) => 
                      i === idx ? { ...item, desc: e.target.innerText } : item
                    );
                    updatePageModule('home', 'proyectos', {
                      title: sectionTitle,
                      subtitle: sectionSubtitle,
                      items: newItems
                    });
                  }}
                >
                  {project.desc}
                </p>
                
                <Button className="w-full bg-[#F5C400] text-black hover:bg-[#F5C400]/90 font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                  Ver Detalles <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PORTAL DIALOG MODAL (Crystal Bevel Specification) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md">
            
            {/* Modal Backdrop Click Close */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 cursor-default"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative bg-[#080c14]/30 border border-white/30 rounded-2xl max-w-5xl w-full max-h-[82vh] flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-8 overflow-y-auto scrollbar-hidden shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)] backdrop-blur-2xl z-10"
            >
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-40 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all"
                title="Cerrar (ESC)"
              >
                <X size={18} />
              </button>

              {/* LEFT COLUMN: VISUALS WITH SWAPPER */}
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                
                {/* Active Tab Image Frame */}
                <div className="relative aspect-video md:aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-[#03060a] shadow-inner group mt-[54px]">
                  <img 
                    src={getOptimizedImageUrl(activeTab === 1 ? selectedProject.image : (selectedProject.image2 || selectedProject.image), 800)} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover transition-all duration-500"
                    loading="lazy"
                  />
                  
                  {/* Inside Modal Image Upload Overlay */}
                  {isEditorMode && (
                    <button
                      onClick={() => handleUploadClick(selectedProject.index, activeTab)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 text-white font-black text-xs tracking-wider uppercase transition-all"
                    >
                      <Upload size={24} className="text-[#F5C400]" />
                      {uploadingIdx === selectedProject.index && uploadingSlot === activeTab ? 'Subiendo...' : `Subir Imagen ${activeTab}`}
                    </button>
                  )}

                  {/* Overlay tags */}
                  <div className="absolute top-3 left-3 bg-black/90 border border-white/15 px-2 py-0.5 rounded-md flex items-center gap-1.5 shadow-md">
                    <span className="w-1 h-1 rounded-full bg-[#F5C400] animate-pulse"></span>
                    <span className="text-[7.8px] text-white/90 font-mono tracking-wider">PROJECT_SYS_V6.5</span>
                  </div>
                </div>

                {/* Tab Switcher Pills */}
                <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10 w-max self-center">
                  <button 
                    onClick={() => setActiveTab(1)} 
                    className={`px-4 py-2 rounded-md text-xs font-black tracking-wider uppercase transition-all ${activeTab === 1 ? 'bg-[#F5C400] text-black shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                  >
                    VISTA PRINCIPAL
                  </button>
                  <button 
                    onClick={() => setActiveTab(2)} 
                    className={`px-4 py-2 rounded-md text-xs font-black tracking-wider uppercase transition-all ${activeTab === 2 ? 'bg-[#F5C400] text-black shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                  >
                    VISTA TÉCNICA / LAYOUT
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: SPECS & FICHA TÉCNICA */}
              <div className="w-full md:w-1/2 flex flex-col justify-between gap-6">
                <div>
                  
                  {/* Category Pill */}
                  <div className="bg-[#F5C400]/10 border border-[#F5C400]/30 rounded-full px-3 py-1 w-max mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F5C400]">PROYECTO COMPLETADO</span>
                  </div>

                  {/* Title */}
                  <h3 
                    className={`text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-2 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 p-1 rounded' : ''}`}
                    contentEditable={isEditorMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      const newItems = activeProjects.map((item, i) => 
                        i === selectedProject.index ? { ...item, title: e.target.innerText } : item
                      );
                      updatePageModule('home', 'proyectos', {
                        title: sectionTitle,
                        subtitle: sectionSubtitle,
                        items: newItems
                      });
                      setSelectedProject(prev => ({ ...prev, title: e.target.innerText }));
                    }}
                  >
                    {selectedProject.title}
                  </h3>

                  {/* Specs short line */}
                  <p 
                    className={`text-[#F5C400] text-sm font-semibold mb-4 tracking-wide ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 p-1 rounded' : ''}`}
                    contentEditable={isEditorMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      const newItems = activeProjects.map((item, i) => 
                        i === selectedProject.index ? { ...item, specs: e.target.innerText } : item
                      );
                      updatePageModule('home', 'proyectos', {
                        title: sectionTitle,
                        subtitle: sectionSubtitle,
                        items: newItems
                      });
                      setSelectedProject(prev => ({ ...prev, specs: e.target.innerText }));
                    }}
                  >
                    {selectedProject.specs}
                  </p>

                  {/* Long description text (Justified) */}
                  <p 
                    className={`text-[#A1A8B3] text-sm leading-relaxed text-justify mb-6 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 p-1 rounded' : ''}`}
                    contentEditable={isEditorMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      const newItems = activeProjects.map((item, i) => 
                        i === selectedProject.index ? { ...item, desc: e.target.innerHTML } : item
                      );
                      updatePageModule('home', 'proyectos', {
                        title: sectionTitle,
                        subtitle: sectionSubtitle,
                        items: newItems
                      });
                      setSelectedProject(prev => ({ ...prev, desc: e.target.innerHTML }));
                    }}
                    dangerouslySetInnerHTML={{ __html: selectedProject.desc }}
                  />

                  {/* FICHA TÉCNICA GRID */}
                  <div className="border border-white/10 rounded-xl overflow-hidden bg-black/40">
                    <div className="bg-white/5 border-b border-white/10 px-4 py-2.5">
                      <span className="text-[11px] font-black uppercase tracking-wider text-white">Especificaciones Técnicas</span>
                    </div>
                    
                    <div className="divide-y divide-white/5 max-h-[320px] overflow-y-auto scrollbar-hidden">
                      
                      {/* Capacidad Row */}
                      <div className="grid grid-cols-3 px-4 py-2 text-xs">
                        <span className="text-[#A1A8B3] font-medium self-center">Capacidad Nominal</span>
                        <span 
                          className={`col-span-2 text-white font-semibold self-center justify-self-start ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 px-1 rounded min-w-[120px]' : ''}`}
                          contentEditable={isEditorMode}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleTableSpecChange(selectedProject.index, 'capacidad', e.target.innerText)}
                        >
                          {selectedProject.specsTable?.capacidad || defaultProjects[selectedProject.index]?.specsTable?.capacidad || 'N/A'}
                        </span>
                      </div>

                      {/* Ubicación Row */}
                      <div className="grid grid-cols-3 px-4 py-2 text-xs">
                        <span className="text-[#A1A8B3] font-medium self-center">Ubicación Planta</span>
                        <span 
                          className={`col-span-2 text-white font-semibold self-center justify-self-start ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 px-1 rounded min-w-[120px]' : ''}`}
                          contentEditable={isEditorMode}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleTableSpecChange(selectedProject.index, 'ubicacion', e.target.innerText)}
                        >
                          {selectedProject.specsTable?.ubicacion || defaultProjects[selectedProject.index]?.specsTable?.ubicacion || 'N/A'}
                        </span>
                      </div>

                      {/* Aplicación Row */}
                      <div className="grid grid-cols-3 px-4 py-2 text-xs">
                        <span className="text-[#A1A8B3] font-medium self-center">Aplicación</span>
                        <span 
                          className={`col-span-2 text-white font-semibold self-center justify-self-start ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 px-1 rounded min-w-[120px]' : ''}`}
                          contentEditable={isEditorMode}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleTableSpecChange(selectedProject.index, 'aplicacion', e.target.innerText)}
                        >
                          {selectedProject.specsTable?.aplicacion || defaultProjects[selectedProject.index]?.specsTable?.aplicacion || 'N/A'}
                        </span>
                      </div>

                      {/* Control Row */}
                      <div className="grid grid-cols-3 px-4 py-2 text-xs">
                        <span className="text-[#A1A8B3] font-medium self-center">Arquitectura Control</span>
                        <span 
                          className={`col-span-2 text-white font-semibold self-center justify-self-start ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 px-1 rounded min-w-[120px]' : ''}`}
                          contentEditable={isEditorMode}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleTableSpecChange(selectedProject.index, 'control', e.target.innerText)}
                        >
                          {selectedProject.specsTable?.control || defaultProjects[selectedProject.index]?.specsTable?.control || 'N/A'}
                        </span>
                      </div>

                      {/* Tecnología Row */}
                      <div className="grid grid-cols-3 px-4 py-2 text-xs">
                        <span className="text-[#A1A8B3] font-medium self-center">Monitoreo / IoT</span>
                        <span 
                          className={`col-span-2 text-white font-semibold self-center justify-self-start ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 px-1 rounded min-w-[120px]' : ''}`}
                          contentEditable={isEditorMode}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleTableSpecChange(selectedProject.index, 'tecnologia', e.target.innerText)}
                        >
                          {selectedProject.specsTable?.tecnologia || defaultProjects[selectedProject.index]?.specsTable?.tecnologia || 'N/A'}
                        </span>
                      </div>

                      {/* Material Row */}
                      <div className="grid grid-cols-3 px-4 py-2 text-xs">
                        <span className="text-[#A1A8B3] font-medium self-center">Material Construcción</span>
                        <span 
                          className={`col-span-2 text-white font-semibold self-center justify-self-start ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 px-1 rounded min-w-[120px]' : ''}`}
                          contentEditable={isEditorMode}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleTableSpecChange(selectedProject.index, 'material', e.target.innerText)}
                        >
                          {selectedProject.specsTable?.material || defaultProjects[selectedProject.index]?.specsTable?.material || 'N/A'}
                        </span>
                      </div>

                      {/* Consumo Row */}
                      <div className="grid grid-cols-3 px-4 py-2 text-xs">
                        <span className="text-[#A1A8B3] font-medium self-center">Consumo Energético</span>
                        <span 
                          className={`col-span-2 text-white font-semibold self-center justify-self-start ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 px-1 rounded min-w-[120px]' : ''}`}
                          contentEditable={isEditorMode}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleTableSpecChange(selectedProject.index, 'consumo', e.target.innerText)}
                        >
                          {selectedProject.specsTable?.consumo || defaultProjects[selectedProject.index]?.specsTable?.consumo || 'N/A'}
                        </span>
                      </div>

                      {/* Eficiencia Row */}
                      <div className="grid grid-cols-3 px-4 py-2 text-xs">
                        <span className="text-[#A1A8B3] font-medium self-center">Eficiencia / Uptime</span>
                        <span 
                          className={`col-span-2 text-[#F5C400] font-black self-center justify-self-start ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 px-1 rounded min-w-[120px]' : ''}`}
                          contentEditable={isEditorMode}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleTableSpecChange(selectedProject.index, 'eficiencia', e.target.innerText)}
                        >
                          {selectedProject.specsTable?.eficiencia || defaultProjects[selectedProject.index]?.specsTable?.eficiencia || '98.5%'}
                        </span>
                      </div>

                      {/* Estándares Row */}
                      <div className="grid grid-cols-3 px-4 py-2 text-xs">
                        <span className="text-[#A1A8B3] font-medium self-center">Certificaciones</span>
                        <span 
                          className={`col-span-2 text-white font-semibold self-center justify-self-start ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/40 px-1 rounded min-w-[120px]' : ''}`}
                          contentEditable={isEditorMode}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleTableSpecChange(selectedProject.index, 'estandares', e.target.innerText)}
                        >
                          {selectedProject.specsTable?.estandares || defaultProjects[selectedProject.index]?.specsTable?.estandares || 'N/A'}
                        </span>
                      </div>

                    </div>
                  </div>

                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <Button 
                    onClick={() => setSelectedProject(null)}
                    className="bg-transparent border border-white/10 hover:bg-white/5 text-white font-semibold"
                  >
                    Cerrar Detalle
                  </Button>
                  <a 
                    href="#contacto"
                    onClick={() => setSelectedProject(null)}
                    className="bg-[#F5C400] text-black hover:bg-[#F5C400]/90 font-bold px-6 py-2 rounded-lg flex items-center justify-center transition-all shadow-lg text-sm"
                  >
                    Cotizar Proyecto Equiv.
                  </a>
                </div>

              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default IndustrialProjectsSection;
