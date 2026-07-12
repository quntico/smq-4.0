
import React, { useEffect, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { useCMS } from '@/context/CMSContext.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';

const AlignLeft = LucideIcons.AlignLeft;
const AlignCenter = LucideIcons.AlignCenter;
const AlignRight = LucideIcons.AlignRight;
const AlignJustify = LucideIcons.AlignJustify;
const Maximize = LucideIcons.Maximize;
const Minimize = LucideIcons.Minimize;
const Lightbulb = LucideIcons.Lightbulb;
const Wrench = LucideIcons.Wrench;
const Shield = LucideIcons.Shield;
const Scissors = LucideIcons.Scissors;
const Droplets = LucideIcons.Droplets;
const Layers = LucideIcons.Layers;
const Zap = LucideIcons.Zap;
const Eye = LucideIcons.Eye;
const Factory = LucideIcons.Factory;

const industrialIconGroups = {
  tecnologia: {
    name: 'Tecnología',
    icons: [
      'Cpu', 'Database', 'Server', 'Network', 'Cloud', 'Wifi', 'HardDrive', 'Terminal', 'Code', 'FileCode', 
      'Binary', 'Globe', 'Orbit', 'Radio', 'Satellite', 'Layers', 'Grid', 'Hash', 'Workflow', 
      'GitBranch', 'GitCommit', 'GitMerge', 'Command', 'SquareTerminal', 'Share2', 'Link', 'QrCode',
      'Fingerprint', 'Shield', 'ShieldAlert', 'ShieldCheck', 'Lock', 'Key', 'Smartphone', 'Tablet', 'Monitor',
      'Laptop', 'Tv', 'Router', 'Power', 'MemoryStick', 'Microchip', 'RadioReceiver', 'Webcam'
    ]
  },
  alimentos: {
    name: 'Alimentos y Bebidas',
    icons: [
      'Wheat', 'Fish', 'Bean', 'Flame', 'Thermometer', 'Droplet', 'Scale', 'ChefHat', 'Milk', 'Egg', 
      'Refrigerator', 'Utensils', 'GlassWater', 'CupSoda', 'Apple', 'Salad', 'Soup', 'Pizza', 'Cake',
      'Wine', 'Beer', 'Filter', 'Container', 'Package', 'Sparkles', 'Clover', 'IceCream', 'Cookie',
      'Citrus', 'Banana', 'Nut', 'Carrot', 'Grape', 'Strawberry', 'Cherry'
    ]
  },
  pharma: {
    name: 'Pharma y Química',
    icons: [
      'Pills', 'FlaskConical', 'FlaskRound', 'Pipette', 'Syringe', 'TestTube', 'Microscope', 'Dna',
      'Biohazard', 'HeartPulse', 'Stethoscope', 'Activity', 'Brain', 'Eye', 'Heart', 'ShieldAlert',
      'Clipboard', 'Thermometer', 'Crosshair', 'FlameKindling', 'Gauge', 'Droplets', 'ShieldCheck',
      'BriefcaseMedical', 'PlusSquare', 'HeartHandshake', 'TestTubes', 'Bones', 'Bandage'
    ]
  },
  reciclado: {
    name: 'Reciclaje y Ambiente',
    icons: [
      'Recycle', 'Leaf', 'Sprout', 'TreePine', 'TreeDeciduous', 'Wind', 'Sun', 'Trash2', 'Trash',
      'RefreshCw', 'RefreshCcw', 'RotateCw', 'RotateCcw', 'Globe', 'Droplet', 'Droplets', 'Fuel',
      'BatteryCharging', 'Zap', 'Lightbulb', 'Gauge', 'Flame', 'Sparkles', 'Container', 'Workflow',
      'Battery', 'BatteryLow', 'BatteryMedium', 'BatteryWarning', 'SunDim', 'CloudSun', 'CloudRain'
    ]
  },
  acabados: {
    name: 'Acabados y Herramientas',
    icons: [
      'Paintbrush', 'PaintRoller', 'Palette', 'SprayCan', 'Sparkles', 'Scissors', 'Hammer', 'Ruler',
      'Wrench', 'Screwdriver', 'Layers', 'Grid', 'Spline', 'Brush', 'PenTool', 'Eraser', 'LayoutGrid',
      'Maximize', 'Minimize', 'Scale', 'Pipette', 'Contrast', 'Grid3X3', 'ScissorsLineDashed'
    ]
  },
  industria40: {
    name: 'Industria 4.0 e IoT',
    icons: [
      'Factory', 'Workflow', 'LineChart', 'BarChart3', 'TrendingUp', 'Presentation', 'ShieldCheck', 
      'Zap', 'Cog', 'Settings', 'Sliders', 'Gauge', 'Eye', 'Box', 'Package', 'Truck', 
      'Compass', 'MapPin', 'Activity', 'HeartPulse', 'Cpu', 'Database', 'CloudLightning',
      'HardHat', 'Construction', 'Tractor', 'Warehouse'
    ]
  },
  automatización: {
    name: 'Automatización y Control',
    icons: [
      'ToggleLeft', 'ToggleRight', 'Sliders', 'SlidersHorizontal', 'Play', 'Pause', 'Power', 
      'Fan', 'Gauge', 'ThermometerSnowflake', 'Repeat', 'RefreshCw', 'GitCommit', 'Target', 
      'Crosshair', 'Pointer', 'MousePointer', 'Compass', 'Hourglass', 'Timer', 'Watch',
      'KeyRound', 'Workflow', 'History', 'Infinity', 'Shuffle', 'Undo', 'Redo', 'RotateCw',
      'Scale3D', 'Axis3D', 'Move', 'Expand'
    ]
  }
};

const defaultSolutions = [
  {
    id: 1,
    iconName: 'Scissors',
    title: 'TRITURACIÓN INDUSTRIAL',
    description: 'Equipos diseñados para reducción eficiente de tamaño en plásticos, residuos sólidos urbanos, metales, materiales especiales y procesos de valorización industrial.',
    benefits: [
      'Trituración de alto torque',
      'Cuchillas de alta resistencia',
      'Configuraciones mono y doble rotor',
      'Control inteligente de sobrecarga'
    ],
  },
  {
    id: 2,
    iconName: 'Droplets',
    title: 'LAVADO INDUSTRIAL',
    description: 'Sistemas de limpieza, separación y acondicionamiento de materiales para reciclaje y recuperación de alto valor.',
    benefits: [
      'Eliminación de contaminantes',
      'Secado dinámico de alta velocidad',
      'Clarificación y recirculación de agua',
      'Acondicionamiento térmico'
    ],
  },
  {
    id: 3,
    iconName: 'Layers',
    title: 'PELETIZADO',
    description: 'Líneas completas para transformación de materiales reciclados en pellets industriales con alta estabilidad operacional.',
    benefits: [
      'Extrusión de alto rendimiento',
      'Corte en cabeza bajo agua',
      'Doble desgasificación activa',
      'Pellets homogéneos de alta densidad'
    ],
  },
  {
    id: 4,
    iconName: 'Zap',
    title: 'VALORIZACIÓN ENERGÉTICA',
    description: 'Tecnologías orientadas a recuperación energética, RDF, SRF, valorización térmica y aprovechamiento integral de residuos.',
    benefits: [
      'Generación de combustible alterno',
      'Sistemas de dosificación continua',
      'Control de emisiones integrado',
      'Maximización de eficiencia térmica'
    ],
  },
  {
    id: 5,
    iconName: 'Eye',
    title: 'SEPARACIÓN INTELIGENTE',
    description: 'Integración de tecnologías ópticas, magnéticas, IA industrial y automatización avanzada.',
    benefits: [
      'Separadores ópticos NIR de alta velocidad',
      'Clasificación robótica por IA',
      'Separación por corrientes de Foucault',
      'Detección multiespectral'
    ],
  },
  {
    id: 6,
    iconName: 'Factory',
    title: 'PLANTAS LLAVE EN MANO',
    description: 'Ingeniería, fabricación, instalación, puesta en marcha y acompañamiento técnico integral.',
    benefits: [
      'Ingeniería conceptual y a detalle',
      'Fabricación personalizada',
      'Puesta en marcha y puesta a punto',
      'Soporte postventa y refacciones'
    ],
  },
];

const iconMap = { Lightbulb, Wrench, Shield, Scissors, Droplets, Layers, Zap, Eye, Factory };

const solutionColors = [
  '#00f0ff', // 01 Trituración (Cian)
  '#00ff66', // 02 Lavado (Verde)
  '#b026ff', // 03 Peletizado (Morado)
  '#ffaa00', // 04 Waste to Energy (Naranja)
  '#0099ff', // 05 Separación Inteligente (Celeste)
  '#ffd700', // 06 Plantas Llave en mano (Amarillo)
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

const SolutionsSection = () => {
  const { cmsState, isEditorMode, updatePageModule } = useCMS();
  const { language, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);
  const [selectedSolutionForIcon, setSelectedSolutionForIcon] = useState(null);
  const [iconSearchQuery, setIconSearchQuery] = useState('');
  const [activeIconTab, setActiveIconTab] = useState('all');
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
  const sectionTitle = moduleData?.data?.title || 'Soluciones <span class="text-[#FFD700]">Industriales</span>';
  const sectionSubtitle = moduleData?.data?.subtitle || 'Desarrollamos e integramos tecnología industrial de alta eficiencia para optimizar tu planta';

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
            dangerouslySetInnerHTML={{ __html: language === 'en' && sectionTitle.includes('Soluciones') ? `${t('solutionsSection.title1')} <span class="text-[#FFD700]">${t('solutionsSection.title2')}</span>` : sectionTitle }}
            onBlur={(e) => {
              updatePageModule('home', 'solutions', { title: e.target.innerHTML, items: activeSolutions, subtitle: sectionSubtitle });
            }}
            contentEditable={isEditorMode}
            suppressContentEditableWarning={true}
          />
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/20 p-1 rounded backdrop-blur-sm' : ''}`}
            dangerouslySetInnerHTML={{ __html: language === 'en' && sectionSubtitle.includes('tecnología industrial') ? t('solutionsSection.subtitle') : sectionSubtitle }}
            onBlur={(e) => {
              updatePageModule('home', 'solutions', { subtitle: e.target.innerHTML, items: activeSolutions, title: sectionTitle });
            }}
            contentEditable={isEditorMode}
            suppressContentEditableWarning={true}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {activeSolutions.map((solution, index) => {
            const IconComponent = LucideIcons[solution.iconName] || LucideIcons.Lightbulb;
            const themeColor = solution.themeColor || solutionColors[index % solutionColors.length];
            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`glass-card rounded-xl relative group ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400' : 'hover:scale-[1.03]'} transition-all duration-300 flex flex-col`}
                style={{ 
                  padding: solution.cardPadding !== undefined ? `${solution.cardPadding}px` : '32px',
                  borderColor: hoveredIndex === index ? `${themeColor}4d` : 'rgba(255,255,255,0.08)',
                  boxShadow: hoveredIndex === index ? `0 0 30px ${themeColor}1a, inset 0 0 12px ${themeColor}0a` : 'none',
                  borderWidth: '1px'
                }}
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

                      {/* Fila del Tema de la Tarjeta */}
                      <div className="flex items-center gap-1 p-1 bg-black/20 rounded-md">
                        <div className="flex items-center justify-center w-[40px] px-1 text-white/40"><strong className="text-[9px] uppercase">Tema</strong></div>
                        <ToolbarColorPicker
                          value={solution.themeColor || solutionColors[index % solutionColors.length]}
                          onChange={e => {
                            const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, themeColor: e.target.value } : item);
                            updatePageModule('home', 'solutions', { items: newItems });
                          }}
                          title="Color del Tema de la Tarjeta"
                        />
                        <div className="w-[1px] h-[16px] bg-white/10 mx-1" />
                        <span className="text-[9px] text-white/50 leading-none">Color de Acento de la Tarjeta</span>
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

                <div className={`flex justify-between items-center mb-6 w-full ${isEditorMode ? 'mt-[170px]' : ''}`}>
                  <span 
                    className="font-mono text-3xl font-black tracking-widest select-none transition-all duration-300"
                    style={{ 
                      color: themeColor,
                      opacity: hoveredIndex === index ? 1 : 0.35 
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div 
                    onClick={() => {
                      if (isEditorMode) {
                        setSelectedSolutionForIcon(solution.id);
                        setIsIconModalOpen(true);
                      }
                    }}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.2)] ${isEditorMode ? 'cursor-pointer hover:scale-110 active:scale-95 hover:border-blue-400/80 outline-dashed outline-1 outline-blue-400' : ''}`}
                    title={isEditorMode ? "Haz clic para cambiar este icono" : undefined}
                    style={{
                      backgroundColor: hoveredIndex === index ? `${themeColor}33` : `${themeColor}12`,
                      borderColor: hoveredIndex === index ? `${themeColor}66` : `${themeColor}26`,
                      borderWidth: '1px'
                    }}
                  >
                    <IconComponent size={22} style={{ color: themeColor }} />
                  </div>
                </div>
                <h3
                  className={`font-bold mb-3 transition-all duration-300 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/20 p-1 rounded backdrop-blur-sm' : ''} ${solution.titleSize ? '' : 'text-2xl'}`}
                  style={{
                    color: solution.titleColor || (hoveredIndex === index ? themeColor : 'var(--foreground)'),
                    textAlign: solution.titleAlign || 'left',
                    fontSize: solution.titleSize ? `${solution.titleSize}px` : undefined
                  }}
                  dangerouslySetInnerHTML={{ __html: language === 'en' && solution.id === 1 && solution.title.includes('TRITURACIÓN') ? t('solutionsSection.card1_title') :
                                                     language === 'en' && solution.id === 2 && solution.title.includes('LAVADO') ? t('solutionsSection.card2_title') :
                                                     language === 'en' && solution.id === 3 && solution.title.includes('PELETIZADO') ? t('solutionsSection.card3_title') :
                                                     language === 'en' && solution.id === 4 && solution.title.includes('VALORIZACIÓN') ? t('solutionsSection.card4_title') :
                                                     language === 'en' && solution.id === 5 && solution.title.includes('SEPARACIÓN') ? t('solutionsSection.card5_title') :
                                                     language === 'en' && solution.id === 6 && solution.title.includes('LLAVE EN MANO') ? t('solutionsSection.card6_title') :
                                                     solution.title }}
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
                  dangerouslySetInnerHTML={{ __html: language === 'en' && solution.id === 1 && solution.description.includes('reducción eficiente') ? t('solutionsSection.card1_desc') :
                                                     language === 'en' && solution.id === 2 && solution.description.includes('limpieza') ? t('solutionsSection.card2_desc') :
                                                     language === 'en' && solution.id === 3 && solution.description.includes('transformación') ? t('solutionsSection.card3_desc') :
                                                     language === 'en' && solution.id === 4 && solution.description.includes('recuperación energética') ? t('solutionsSection.card4_desc') :
                                                     language === 'en' && solution.id === 5 && solution.description.includes('ópticas') ? t('solutionsSection.card5_desc') :
                                                     language === 'en' && solution.id === 6 && solution.description.includes('fabricación') ? t('solutionsSection.card6_desc') :
                                                     solution.description }}
                  contentEditable={isEditorMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const newItems = activeSolutions.map(item => item.id === solution.id ? { ...item, description: e.target.innerHTML } : item);
                    updatePageModule('home', 'solutions', { items: newItems });
                  }}
                />
                <div className="space-y-3 mt-auto">
                  <span className="text-sm font-semibold" style={{ color: solution.benColor || 'var(--foreground)' }}>{language === 'en' ? t('solutionsSection.benefitsLabel') : 'Beneficios:'}</span>
                  <ul className="space-y-2">
                    {solution.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div 
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: themeColor }}
                        />
                        <span
                          className={`w-full ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/20 p-1 rounded backdrop-blur-sm min-h-[24px]' : ''}`}
                          style={{
                            color: solution.benColor || 'var(--muted-foreground)',
                            fontSize: solution.benSize ? `${solution.benSize}px` : undefined,
                            textAlign: solution.descAlign || 'left'
                          }}
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? 
                            (benefit.includes('alto torque') ? t('solutionsSection.card1_b1') :
                             benefit.includes('alta resistencia') ? t('solutionsSection.card1_b2') :
                             benefit.includes('mono y doble') ? t('solutionsSection.card1_b3') :
                             benefit.includes('sobrecarga') ? t('solutionsSection.card1_b4') :
                             benefit.includes('Eliminación') ? t('solutionsSection.card2_b1') :
                             benefit.includes('dinámico') ? t('solutionsSection.card2_b2') :
                             benefit.includes('Clarificación') ? t('solutionsSection.card2_b3') :
                             benefit.includes('térmico') ? t('solutionsSection.card2_b4') :
                             benefit.includes('rendimiento') ? t('solutionsSection.card3_b1') :
                             benefit.includes('bajo agua') ? t('solutionsSection.card3_b2') :
                             benefit.includes('desgasificación') ? t('solutionsSection.card3_b3') :
                             benefit.includes('homogéneos') ? t('solutionsSection.card3_b4') :
                             benefit.includes('combustible alterno') ? t('solutionsSection.card4_b1') :
                             benefit.includes('dosificación') ? t('solutionsSection.card4_b2') :
                             benefit.includes('emisiones') ? t('solutionsSection.card4_b3') :
                             benefit.includes('Maximización') ? t('solutionsSection.card4_b4') :
                             benefit.includes('ópticos NIR') ? t('solutionsSection.card5_b1') :
                             benefit.includes('robótica por IA') ? t('solutionsSection.card5_b2') :
                             benefit.includes('Foucault') ? t('solutionsSection.card5_b3') :
                             benefit.includes('multiespectral') ? t('solutionsSection.card5_b4') :
                             benefit.includes('conceptual') ? t('solutionsSection.card6_b1') :
                             benefit.includes('personalizada') ? t('solutionsSection.card6_b2') :
                             benefit.includes('Puesta en marcha') ? t('solutionsSection.card6_b3') :
                             benefit.includes('Soporte') ? t('solutionsSection.card6_b4') : benefit)
                            : benefit
                          }}
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


      </div>

      {/* Icon Selector Modal */}
      {isIconModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-[#12141C] border border-[#2A2E3D] w-full max-w-4xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#2A2E3D] flex justify-between items-center bg-[#161924]">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-[#FFD700]">★</span>
                  Seleccionar Icono Industrial
                </h3>
                <p className="text-sm text-gray-400 mt-1">Elige un icono clasificado por sectores para representar esta solución.</p>
              </div>
              <button 
                onClick={() => {
                  setIsIconModalOpen(false);
                  setSelectedSolutionForIcon(null);
                  setIconSearchQuery('');
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <LucideIcons.X size={20} />
              </button>
            </div>

            {/* Search and Category Filter */}
            <div className="p-6 bg-[#141722] border-b border-[#2A2E3D] flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Buscar icono por nombre..."
                  value={iconSearchQuery}
                  onChange={(e) => setIconSearchQuery(e.target.value)}
                  className="w-full bg-[#1A1D2B] border border-[#2A2E3D] text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
                />
              </div>
              
              {/* Category tabs */}
              <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                <button
                  onClick={() => setActiveIconTab('all')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${activeIconTab === 'all' ? 'bg-[#FFD700] text-black' : 'bg-[#1A1D2B] text-gray-400 hover:text-white border border-[#2A2E3D]'}`}
                >
                  Todos
                </button>
                {Object.entries(industrialIconGroups).map(([key, group]) => (
                  <button
                    key={key}
                    onClick={() => setActiveIconTab(key)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${activeIconTab === key ? 'bg-[#FFD700] text-black' : 'bg-[#1A1D2B] text-gray-400 hover:text-white border border-[#2A2E3D]'}`}
                  >
                    {group.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Icons Grid */}
            <div className="flex-1 p-6 overflow-y-auto bg-[#10121A] custom-scrollbar">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {(() => {
                  let list = [];
                  if (activeIconTab === 'all') {
                    const allIcons = new Set();
                    Object.values(industrialIconGroups).forEach(group => {
                      group.icons.forEach(ico => allIcons.add(ico));
                    });
                    list = Array.from(allIcons);
                  } else {
                    list = industrialIconGroups[activeIconTab]?.icons || [];
                  }

                  if (iconSearchQuery.trim() !== '') {
                    list = list.filter(ico => ico.toLowerCase().includes(iconSearchQuery.toLowerCase()));
                  }

                  if (list.length === 0) {
                    return (
                      <div className="col-span-full py-12 text-center text-gray-500">
                        No se encontraron iconos que coincidan con la búsqueda.
                      </div>
                    );
                  }

                  return list.map(iconName => {
                    const TargetIcon = LucideIcons[iconName];
                    if (!TargetIcon) return null;

                    return (
                      <button
                        key={iconName}
                        onClick={() => {
                          const newItems = activeSolutions.map(item => item.id === selectedSolutionForIcon ? { ...item, iconName } : item);
                          updatePageModule('home', 'solutions', { items: newItems });
                          setIsIconModalOpen(false);
                          setSelectedSolutionForIcon(null);
                          setIconSearchQuery('');
                        }}
                        className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#161822] border border-[#2A2E3D] hover:border-[#FFD700] text-gray-300 hover:text-[#FFD700] hover:bg-[#1A1D2B] transition-all group"
                      >
                        <TargetIcon className="w-8 h-8 group-hover:scale-110 transition-transform mb-2" />
                        <span className="text-[10px] text-gray-500 group-hover:text-gray-300 text-center truncate w-full">{iconName}</span>
                      </button>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SolutionsSection;
