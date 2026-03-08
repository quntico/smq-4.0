
import React, { useEffect, useRef, useState } from 'react';
import { Lightbulb, Wrench, Shield, AlignLeft, AlignCenter, AlignRight, AlignJustify, Maximize, Minimize } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCMS } from '@/context/CMSContext.jsx';

const defaultSolutions = [
  {
    id: 1,
    iconName: 'Lightbulb',
    title: 'Consultoría Industrial',
    description: 'Análisis profundo de tus necesidades de producción y diseño de soluciones personalizadas que optimicen tus procesos industriales.',
    benefits: [
      'Evaluación técnica completa',
      'Diseño de procesos optimizados',
      'Análisis de retorno de inversión',
      'Recomendaciones de tecnología',
    ],
  },
  {
    id: 2,
    iconName: 'Wrench',
    title: 'Instalación y Puesta en Marcha',
    description: 'Servicio integral de instalación, configuración y arranque de maquinaria con capacitación completa para tu equipo operativo.',
    benefits: [
      'Instalación profesional certificada',
      'Calibración y ajuste fino',
      'Capacitación técnica especializada',
      'Documentación completa',
    ],
  },
  {
    id: 3,
    iconName: 'Shield',
    title: 'Mantenimiento Preventivo',
    description: 'Programas de mantenimiento diseñados para maximizar la vida útil de tu maquinaria y minimizar tiempos de inactividad.',
    benefits: [
      'Inspecciones programadas',
      'Reemplazo de componentes críticos',
      'Soporte técnico 24/7',
      'Garantía extendida disponible',
    ],
  },
];

const iconMap = { Lightbulb, Wrench, Shield };

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

const SolutionsSection = () => {
  const { cmsState, isEditorMode, updatePageModule } = useCMS();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  // Find module data
  const pageData = cmsState.pages.find(p => p.id === 'home');
  const moduleData = pageData?.modules?.find(m => m.id === 'solutions');
  const activeSolutions = moduleData?.data?.items || defaultSolutions;
  const sectionTitle = moduleData?.data?.title || 'Soluciones <span class="text-primary">Personalizadas</span>';
  const sectionSubtitle = moduleData?.data?.subtitle || 'Acompañamiento integral desde la consultoría hasta el mantenimiento continuo';

  return (
    <section id="soluciones" ref={sectionRef} className="py-16 md:py-24 bg-background">
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
              updatePageModule('home', 'solutions', { title: e.target.innerHTML, items: activeSolutions, subtitle: sectionSubtitle });
            }}
            contentEditable={isEditorMode}
            suppressContentEditableWarning={true}
          />
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/20 p-1 rounded backdrop-blur-sm' : ''}`}
            dangerouslySetInnerHTML={{ __html: sectionSubtitle }}
            onBlur={(e) => {
              updatePageModule('home', 'solutions', { subtitle: e.target.innerHTML, items: activeSolutions, title: sectionTitle });
            }}
            contentEditable={isEditorMode}
            suppressContentEditableWarning={true}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {activeSolutions.map((solution, index) => {
            const Icon = iconMap[solution.iconName] || Lightbulb;
            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`glass-card rounded-xl relative group ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400' : 'hover:scale-105 hover:brightness-110'} transition-all duration-300 flex flex-col`}
                style={{ padding: solution.cardPadding !== undefined ? `${solution.cardPadding}px` : '32px' }}
              >
                {/* Editor mode top controls (Professional Toolbar) */}
                {isEditorMode && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 flex justify-center items-start z-30 pointer-events-none w-max">
                    <div className="flex flex-col gap-1 pointer-events-auto bg-[#1A1A1A]/95 p-1.5 rounded-lg border border-[#333] shadow-2xl backdrop-blur-md">
                      {/* Título Toolbar */}
                      <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                        <div className="flex items-center justify-center w-[24px] px-1 text-white/40"><strong className="text-[10px] uppercase">T</strong></div>
                        <ToolbarColorPicker
                          value={solution.titleColor || '#FFFFFF'}
                          onChange={e => {
                            const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, titleColor: e.target.value } : item);
                            updatePageModule('home', 'solutions', { items: newItems });
                          }}
                          title="Color del Título"
                        />
                        <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                        <ToolbarTextButton text="A-" onClick={() => { const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, titleSize: (item.titleSize || 24) - 2 } : item); updatePageModule('home', 'solutions', { items: newItems }); }} title="Reducir tamaño" />
                        <ToolbarTextButton text="A+" onClick={() => { const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, titleSize: (item.titleSize || 24) + 2 } : item); updatePageModule('home', 'solutions', { items: newItems }); }} title="Aumentar tamaño" />
                        <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                        <ToolbarButton icon={AlignLeft} active={solution.titleAlign === 'left' || !solution.titleAlign} onClick={() => { const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, titleAlign: 'left' } : item); updatePageModule('home', 'solutions', { items: newItems }); }} title="Alinear Izquierda" />
                        <ToolbarButton icon={AlignCenter} active={solution.titleAlign === 'center'} onClick={() => { const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, titleAlign: 'center' } : item); updatePageModule('home', 'solutions', { items: newItems }); }} title="Alinear Centro" />
                        <ToolbarButton icon={AlignRight} active={solution.titleAlign === 'right'} onClick={() => { const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, titleAlign: 'right' } : item); updatePageModule('home', 'solutions', { items: newItems }); }} title="Alinear Derecha" />
                      </div>

                      {/* Descripción Toolbar */}
                      <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                        <div className="flex items-center justify-center w-[24px] px-1 text-white/40"><strong className="text-[10px] uppercase">D</strong></div>
                        <ToolbarColorPicker
                          value={solution.descColor || '#D0D0D0'}
                          onChange={e => {
                            const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, descColor: e.target.value } : item);
                            updatePageModule('home', 'solutions', { items: newItems });
                          }}
                          title="Color de la Descripción"
                        />
                        <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                        <ToolbarTextButton text="A-" onClick={() => { const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, descSize: (item.descSize || 16) - 1 } : item); updatePageModule('home', 'solutions', { items: newItems }); }} title="Reducir tamaño" />
                        <ToolbarTextButton text="A+" onClick={() => { const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, descSize: (item.descSize || 16) + 1 } : item); updatePageModule('home', 'solutions', { items: newItems }); }} title="Aumentar tamaño" />
                        <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                        <ToolbarButton icon={AlignLeft} active={solution.descAlign === 'left' || !solution.descAlign} onClick={() => { const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, descAlign: 'left' } : item); updatePageModule('home', 'solutions', { items: newItems }); }} title="Alinear Izquierda" />
                        <ToolbarButton icon={AlignCenter} active={solution.descAlign === 'center'} onClick={() => { const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, descAlign: 'center' } : item); updatePageModule('home', 'solutions', { items: newItems }); }} title="Alinear Centro" />
                        <ToolbarButton icon={AlignRight} active={solution.descAlign === 'right'} onClick={() => { const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, descAlign: 'right' } : item); updatePageModule('home', 'solutions', { items: newItems }); }} title="Alinear Derecha" />
                      </div>

                      {/* Beneficios Toolbar */}
                      <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                        <div className="flex items-center justify-center w-[24px] px-1 text-white/40"><strong className="text-[10px] uppercase">B</strong></div>
                        <ToolbarColorPicker
                          value={solution.benColor || '#D0D0D0'}
                          onChange={e => {
                            const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, benColor: e.target.value } : item);
                            updatePageModule('home', 'solutions', { items: newItems });
                          }}
                          title="Color de Beneficios"
                        />
                        <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                        <ToolbarTextButton text="A-" onClick={() => { const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, benSize: (item.benSize || 14) - 1 } : item); updatePageModule('home', 'solutions', { items: newItems }); }} title="Reducir tamaño" />
                        <ToolbarTextButton text="A+" onClick={() => { const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, benSize: (item.benSize || 14) + 1 } : item); updatePageModule('home', 'solutions', { items: newItems }); }} title="Aumentar tamaño" />
                      </div>

                      {/* Espaciado de caja */}
                      <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                        <div className="flex items-center justify-center w-[24px] px-1 text-white/40"><strong className="text-[10px] uppercase">Caja</strong></div>
                        <ToolbarButton icon={Maximize} active={false} onClick={() => { const p = (solution.cardPadding !== undefined ? solution.cardPadding : 32); const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, cardPadding: Math.max(0, p - 6) } : item); updatePageModule('home', 'solutions', { items: newItems }); }} title="Agrandar espacio" />
                        <ToolbarButton icon={Minimize} active={false} onClick={() => { const p = (solution.cardPadding !== undefined ? solution.cardPadding : 32); const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, cardPadding: p + 6 } : item); updatePageModule('home', 'solutions', { items: newItems }); }} title="Reducir espacio" />
                      </div>
                    </div>
                  </div>
                )}

                <div className={`w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors ${isEditorMode ? 'mt-[135px]' : ''}`}>
                  <Icon size={32} className="text-primary" />
                </div>
                <h3
                  className={`font-bold mb-3 transition-colors ${(!isEditorMode && !solution.titleColor) ? 'group-hover:text-primary' : ''} ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/20 p-1 rounded backdrop-blur-sm' : ''} ${solution.titleSize ? '' : 'text-2xl'}`}
                  style={{
                    color: solution.titleColor || 'var(--foreground)',
                    textAlign: solution.titleAlign || 'left',
                    fontSize: solution.titleSize ? `${solution.titleSize}px` : undefined
                  }}
                  dangerouslySetInnerHTML={{ __html: solution.title }}
                  contentEditable={isEditorMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, title: e.target.innerHTML } : item);
                    updatePageModule('home', 'solutions', { items: newItems });
                  }}
                />
                <p
                  className={`mb-6 leading-relaxed ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/20 p-1 rounded backdrop-blur-sm' : ''}`}
                  style={{
                    color: solution.descColor || 'var(--muted-foreground)',
                    textAlign: solution.descAlign || 'left',
                    fontSize: solution.descSize ? `${solution.descSize}px` : undefined
                  }}
                  dangerouslySetInnerHTML={{ __html: solution.description }}
                  contentEditable={isEditorMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, description: e.target.innerHTML } : item);
                    updatePageModule('home', 'solutions', { items: newItems });
                  }}
                />
                <div className="space-y-3 mt-auto">
                  <span className="text-sm font-semibold" style={{ color: solution.benColor || 'var(--foreground)' }}>Beneficios:</span>
                  <ul className="space-y-2">
                    {solution.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                        <span
                          className={`w-full ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/20 p-1 rounded backdrop-blur-sm min-h-[24px]' : ''}`}
                          style={{
                            color: solution.benColor || 'var(--muted-foreground)',
                            fontSize: solution.benSize ? `${solution.benSize}px` : undefined,
                            textAlign: solution.descAlign || 'left'
                          }}
                          dangerouslySetInnerHTML={{ __html: benefit }}
                          contentEditable={isEditorMode}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => {
                            const newItems = activeSolutions.map(item => {
                              if (item.id === solution.id) {
                                const newBenefits = [...item.benefits];
                                newBenefits[idx] = e.target.innerHTML;
                                return { ...item, benefits: newBenefits };
                              }
                              return item;
                            });
                            updatePageModule('home', 'solutions', { items: newItems });
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 md:mt-16 glass-card rounded-xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            ¿Necesitas una solución a medida?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Nuestro equipo de ingenieros está listo para diseñar la solución perfecta para tu planta industrial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <span className="text-primary font-semibold text-lg">
              Contáctanos y recibe una consultoría gratuita
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;
