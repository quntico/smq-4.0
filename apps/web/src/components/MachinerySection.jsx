
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlignLeft, AlignCenter, AlignRight, Maximize, Minimize, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';

const defaultMachinery = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1659406661027-ac7dd0455011',
    title: 'Extrusoras de Plástico',
    capacity: '500-2000 kg/h',
    industry: 'Reciclaje',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    title: 'Líneas de Pelletizado',
    capacity: '300-1500 kg/h',
    industry: 'Reciclaje',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
    title: 'Trituradores Industriales',
    capacity: '1000-5000 kg/h',
    industry: 'Reciclaje',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1659167889361-890c288f9dca',
    title: 'Sistemas de Lavado de Plástico',
    capacity: '800-3000 kg/h',
    industry: 'Reciclaje',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1535474035682-b50c07c2418f',
    title: 'Procesamiento de Chocolate',
    capacity: '200-1000 kg/h',
    industry: 'Alimentos',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1495716098472-4bd5c0382520',
    title: 'Maquinaria de Empaque Automático',
    capacity: '50-200 unidades/min',
    industry: 'Empaque',
  },
];

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

const MachinerySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const { cmsState, isEditorMode, updatePageModule } = useCMS();
  const [uploadingId, setUploadingId] = useState(null);

  // Find module data
  const pageData = cmsState.pages.find(p => p.id === 'home');
  const moduleData = pageData?.modules?.find(m => m.id === 'machinery');
  const activeMachinery = moduleData?.data?.items || defaultMachinery;
  const sectionTitle = moduleData?.data?.title || 'Nuestra <span class="text-primary">Maquinaria</span>';
  const sectionSubtitle = moduleData?.data?.subtitle || 'Equipos industriales de última generación para maximizar tu producción';

  const handleTriggerUpload = async (machineId) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*,video/*';
    fileInput.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        setUploadingId(machineId);
        const url = await uploadFile(file);

        const newItems = activeMachinery.map(item =>
          item.id === machineId ? { ...item, image: url } : item
        );

        updatePageModule('home', 'machinery', { items: newItems });
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error al subir el archivo. Por favor intenta de nuevo.');
      } finally {
        setUploadingId(null);
      }
    };
    fileInput.click();
  };

  const handleViewEquipment = (title) => {
    toast({
      title: "🚧 Función en desarrollo",
      description: "La página de detalles del equipo estará disponible pronto. ¡Solicítala en tu próximo mensaje! 🚀",
    });
  };

  return (
    <section id="maquinaria" ref={sectionRef} className="py-16 md:py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 relative"
        >
          {/* Editor mode top controls for the section title */}
          {isEditorMode && (
            <div className="flex justify-center mb-4 gap-4 w-full">
              <div className="bg-[#1A1A1A]/95 p-1.5 rounded-lg border border-[#333] shadow-2xl backdrop-blur-md flex gap-2">
                <span className="text-white/40 text-[10px] uppercase flex items-center px-2">Color por palabra:</span>
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
          <h2
            className={`text-3xl md:text-5xl font-bold text-foreground mb-4 ${isEditorMode ? 'outline-dashed outline-2 outline-blue-400 cursor-text bg-black/20 p-2 rounded-lg' : ''}`}
            dangerouslySetInnerHTML={{ __html: sectionTitle }}
            onBlur={(e) => {
              updatePageModule('home', 'machinery', { title: e.target.innerHTML, items: activeMachinery, subtitle: sectionSubtitle });
            }}
            contentEditable={isEditorMode}
            suppressContentEditableWarning={true}
          />
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/20 p-1 rounded backdrop-blur-sm' : ''}`}
            dangerouslySetInnerHTML={{ __html: sectionSubtitle }}
            onBlur={(e) => {
              updatePageModule('home', 'machinery', { subtitle: e.target.innerHTML, items: activeMachinery, title: sectionTitle });
            }}
            contentEditable={isEditorMode}
            suppressContentEditableWarning={true}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {activeMachinery.map((machine, index) => (
            <motion.div
              key={machine.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`glass-card rounded-xl relative group ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 mt-[160px]' : 'overflow-hidden hover:scale-105 hover:border-primary/50'} transition-all duration-300 border border-transparent`}
              style={{ padding: machine.padding !== undefined ? `${machine.padding}px` : '0px' }}
            >
              {/* Editor mode top controls (Professional Toolbar) */}
              {isEditorMode && (
                <div className="absolute -top-[160px] left-1/2 -translate-x-1/2 flex justify-center items-start z-30 pointer-events-none w-max">
                  <div className="flex flex-col gap-1 pointer-events-auto bg-[#1A1A1A]/95 p-1.5 rounded-lg border border-[#333] shadow-2xl backdrop-blur-md">
                    {/* Tarjeta - Imagen y Padding Toolbar */}
                    <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                      <div className="flex items-center justify-center w-[24px] px-1 text-white/40"><strong className="text-[10px] uppercase">C/F</strong></div>
                      <ToolbarButton
                        icon={ImageIcon}
                        active={false}
                        onClick={() => handleTriggerUpload(machine.id)}
                        title="Subir Fondo"
                        loading={uploadingId === machine.id}
                      />
                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                      <ToolbarButton icon={Maximize} active={false} onClick={() => { const p = (machine.padding !== undefined ? machine.padding : 0); const newItems = activeMachinery.map(item => item.id === machine.id ? { ...item, padding: Math.max(0, p - 6) } : item); updatePageModule('home', 'machinery', { items: newItems }); }} title="Agrandar espacio de tarjeta (Bordes)" />
                      <ToolbarButton icon={Minimize} active={false} onClick={() => { const p = (machine.padding !== undefined ? machine.padding : 0); const newItems = activeMachinery.map(item => item.id === machine.id ? { ...item, padding: p + 6 } : item); updatePageModule('home', 'machinery', { items: newItems }); }} title="Reducir espacio de tarjeta (Bordes)" />
                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                      <div className="flex items-center mx-1 gap-1">
                        <span className="text-[8px] text-white/50 w-8">Oscuro</span>
                        <input
                          type="range"
                          min="0" max="95"
                          value={machine.imageOpacity ?? 30}
                          onChange={(e) => {
                            const newItems = activeMachinery.map(item => item.id === machine.id ? { ...item, imageOpacity: Number(e.target.value) } : item);
                            updatePageModule('home', 'machinery', { items: newItems });
                          }}
                          className="w-12 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
                          title="Opacidad del filtro fotográfico"
                        />
                      </div>
                    </div>

                    {/* Título Toolbar */}
                    <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                      <div className="flex items-center justify-center w-[24px] px-1 text-white/40"><strong className="text-[10px] uppercase">T</strong></div>
                      <ToolbarColorPicker
                        value={machine.titleColor || '#FFFFFF'}
                        onChange={e => {
                          const newItems = activeMachinery.map(item => item.id === machine.id ? { ...item, titleColor: e.target.value } : item);
                          updatePageModule('home', 'machinery', { items: newItems });
                        }}
                        title="Color del Título"
                      />
                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                      <ToolbarTextButton text="A-" onClick={() => { const newItems = activeMachinery.map(item => item.id === machine.id ? { ...item, titleSize: (item.titleSize || 20) - 2 } : item); updatePageModule('home', 'machinery', { items: newItems }); }} title="Reducir tamaño" />
                      <ToolbarTextButton text="A+" onClick={() => { const newItems = activeMachinery.map(item => item.id === machine.id ? { ...item, titleSize: (item.titleSize || 20) + 2 } : item); updatePageModule('home', 'machinery', { items: newItems }); }} title="Aumentar tamaño" />
                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                      <ToolbarButton icon={AlignLeft} active={machine.titleAlign === 'left' || !machine.titleAlign} onClick={() => { const newItems = activeMachinery.map(item => item.id === machine.id ? { ...item, titleAlign: 'left' } : item); updatePageModule('home', 'machinery', { items: newItems }); }} title="Alinear Izquierda" />
                      <ToolbarButton icon={AlignCenter} active={machine.titleAlign === 'center'} onClick={() => { const newItems = activeMachinery.map(item => item.id === machine.id ? { ...item, titleAlign: 'center' } : item); updatePageModule('home', 'machinery', { items: newItems }); }} title="Alinear Centro" />
                      <ToolbarButton icon={AlignRight} active={machine.titleAlign === 'right'} onClick={() => { const newItems = activeMachinery.map(item => item.id === machine.id ? { ...item, titleAlign: 'right' } : item); updatePageModule('home', 'machinery', { items: newItems }); }} title="Alinear Derecha" />
                    </div>

                    {/* Capacidad Toolbar (using desc properties for simplicity) */}
                    <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                      <div className="flex items-center justify-center w-[24px] px-1 text-white/40"><strong className="text-[10px] uppercase">C</strong></div>
                      <ToolbarColorPicker
                        value={machine.descColor || '#D0D0D0'}
                        onChange={e => {
                          const newItems = activeMachinery.map(item => item.id === machine.id ? { ...item, descColor: e.target.value } : item);
                          updatePageModule('home', 'machinery', { items: newItems });
                        }}
                        title="Color de la Capacidad"
                      />
                      <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                      <ToolbarTextButton text="A-" onClick={() => { const newItems = activeMachinery.map(item => item.id === machine.id ? { ...item, descSize: (item.descSize || 14) - 1 } : item); updatePageModule('home', 'machinery', { items: newItems }); }} title="Reducir tamaño" />
                      <ToolbarTextButton text="A+" onClick={() => { const newItems = activeMachinery.map(item => item.id === machine.id ? { ...item, descSize: (item.descSize || 14) + 1 } : item); updatePageModule('home', 'machinery', { items: newItems }); }} title="Aumentar tamaño" />
                    </div>
                  </div>
                </div>
              )}

              <div className="relative h-56 overflow-hidden bg-black">
                <img
                  src={machine.image}
                  alt={machine.title}
                  className={`w-full h-full object-cover transition-transform duration-500 ${isEditorMode ? '' : 'group-hover:scale-110'}`}
                />
                <div
                  className="absolute inset-0 z-[1] transition-opacity duration-300"
                  style={{ backgroundColor: `rgba(0, 0, 0, ${(machine.imageOpacity ?? 0) / 100})` }}
                />
                <div
                  className={`absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-[2] ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text' : ''}`}
                  dangerouslySetInnerHTML={{ __html: machine.industry }}
                  contentEditable={isEditorMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const newItems = activeMachinery.map(item => item.id === machine.id ? { ...item, industry: e.target.innerHTML } : item);
                    updatePageModule('home', 'machinery', { items: newItems });
                  }}
                />
              </div>
              <div className="p-6 space-y-4">
                <h3
                  className={`font-bold transition-colors ${(!isEditorMode && !machine.titleColor) ? 'group-hover:text-primary' : ''} ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/20 p-1 rounded backdrop-blur-sm' : ''} ${machine.titleSize ? '' : 'text-xl'}`}
                  style={{
                    color: machine.titleColor || 'var(--foreground)',
                    textAlign: machine.titleAlign || 'left',
                    fontSize: machine.titleSize ? `${machine.titleSize}px` : undefined
                  }}
                  dangerouslySetInnerHTML={{ __html: machine.title }}
                  contentEditable={isEditorMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const newItems = activeMachinery.map(item => item.id === machine.id ? { ...item, title: e.target.innerHTML } : item);
                    updatePageModule('home', 'machinery', { items: newItems });
                  }}
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground mr-2">Capacidad:</span>
                  <span
                    className={`font-semibold border border-primary/30 px-2 py-1 rounded-md bg-primary/5 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/20 p-1 rounded backdrop-blur-sm inline-block min-w-[50px]' : ''}`}
                    style={{
                      color: machine.descColor || 'var(--primary)',
                      fontSize: machine.descSize ? `${machine.descSize}px` : undefined
                    }}
                    dangerouslySetInnerHTML={{ __html: machine.capacity }}
                    contentEditable={isEditorMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      const newItems = activeMachinery.map(item => item.id === machine.id ? { ...item, capacity: e.target.innerHTML } : item);
                      updatePageModule('home', 'machinery', { items: newItems });
                    }}
                  />
                </div>
                <Button
                  onClick={() => handleViewEquipment(machine.title)}
                  className="w-full bg-primary text-white hover:bg-primary-hover transition-colors duration-300 group/btn"
                >
                  Ver Equipo
                  <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section >
  );
};

export default MachinerySection;
