
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Plus, Trash2, Image as ImageIcon, Box, X, Maximize2, Lock, Unlock } from 'lucide-react';
import { Html, TransformControls } from '@react-three/drei';

import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';
import ModelViewer from './ModelViewer.jsx';

const defaultHotspots = [
  { id: 1, x: 30, y: 40, name: 'Extrusora Principal', specs: 'Capacidad: 1000 kg/h', power: '150 kW' },
  { id: 2, x: 60, y: 30, name: 'Sistema de Enfriamiento', specs: 'Flujo: 500 L/min', power: '45 kW' },
  { id: 3, x: 75, y: 60, name: 'Pelletizadora', specs: 'Corte bajo agua', power: '30 kW' },
  { id: 4, x: 45, y: 70, name: 'Silo de Almacenamiento', specs: 'Capacidad: 5 Toneladas', power: '5 kW' },
  { id: 5, x: 20, y: 65, name: 'Panel de Control PLC', specs: 'Automatización Avanzada', power: '2 kW' },
];

function DraggableHotspot3D({ spot, isEditorMode, onUpdate, children }) {
  const ref = useRef();

  return (
    <>
      {isEditorMode && !spot.locked && (
        <TransformControls
          object={ref}
          mode="translate"
          onMouseUp={() => {
            if (ref.current) {
              const p = ref.current.position;
              // Revierten de las divisiones asumiendo la escala usada para Z.
              onUpdate(spot.id, {
                x: p.x * 10 + 50,
                y: 50 - p.y * 10,
                z: p.z * 10 + 50
              });
            }
          }}
        />
      )}
      <group
        ref={ref}
        position={[(spot.x - 50) / 10, (50 - spot.y) / 10, ((spot.z || 50) - 50) / 10]}
      >
        <Html center zIndexRange={[100, 0]}>
          <div id={`3d-hotspot-${spot.id}`} className="relative pointer-events-auto">
            {children}
          </div>
        </Html>
      </group>
    </>
  );
}

const PlantVisualizerSection = () => {
  const { cmsState, isEditorMode, updatePageModule } = useCMS();
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [show3DModal, setShow3DModal] = useState(false);
  const imageInputRef = useRef(null);
  const modelInputRef = useRef(null);
  const containerRef = useRef(null);
  const expandScrollY = useRef(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Retrieve CMS Data
  const pageData = cmsState.pages.find(p => p.id === 'home');
  const moduleData = pageData?.modules?.find(m => m.id === 'visualizer');

  const sectionTitle = moduleData?.data?.title || 'Visualizador de <span class="text-primary">Planta 3D</span>';
  const sectionSubtitle = moduleData?.data?.subtitle || 'Explora nuestra configuración típica de planta industrial interactiva.';
  let backgroundMedia = moduleData?.data?.backgroundMedia || 'https://images.unsplash.com/photo-1698621193747-e8788c620dbc';
  let model3DMedia = moduleData?.data?.model3DMedia || null;
  const backgroundFilter = moduleData?.data?.backgroundFilter || 'none';
  const backgroundOpacity = moduleData?.data?.backgroundOpacity ?? 0;
  const activeHotspots = moduleData?.data?.hotspots || defaultHotspots;
  const designTitle = moduleData?.data?.designTitle || 'Planta Extrusora de Plástico';
  const designTitleFont = moduleData?.data?.designTitleFont || 'Inter, sans-serif';
  const bgFxMode = moduleData?.data?.bgFxMode ?? false;

  // Retrocompatibilidad: Si el fondo subido era 3D
  const bgExtension = backgroundMedia.split('.').pop()?.toLowerCase();
  const isBg3D = ['obj', 'gltf', 'glb', 'fbx', 'dae', 'stl', '3ds'].includes(bgExtension);
  if (isBg3D) {
    if (!model3DMedia) model3DMedia = backgroundMedia;
    backgroundMedia = 'https://images.unsplash.com/photo-1698621193747-e8788c620dbc';
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (show3DModal) {
          setShow3DModal(false);
        } else if (isExpanded) {
          setIsExpanded(false);
        }
      }
    };

    const handleScroll = () => {
      if (isExpanded && Math.abs(window.scrollY - expandScrollY.current) > (window.innerHeight * 0.5)) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isExpanded) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [show3DModal, isExpanded]);

  const handlePointerDown = (e, id) => {
    if (!isEditorMode) return;
    e.stopPropagation();
    setActiveHotspot(id);

    const hotspot = activeHotspots.find(h => h.id === id);
    if (hotspot?.locked) return;

    const container = containerRef.current;
    if (!container) return;

    const onPointerMove = (moveEvent) => {
      const rect = container.getBoundingClientRect();
      let x = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      let y = ((moveEvent.clientY - rect.top) / rect.height) * 100;
      x = Math.max(0, Math.min(100, x));
      y = Math.max(0, Math.min(100, y));

      const marker = document.getElementById(`hotspot-${id}`);
      if (marker) {
        marker.style.left = `${x}%`;
        marker.style.top = `${y}%`;
      }
    };

    const onPointerUp = (upEvent) => {
      const rect = container.getBoundingClientRect();
      let x = ((upEvent.clientX - rect.left) / rect.width) * 100;
      let y = ((upEvent.clientY - rect.top) / rect.height) * 100;
      x = Math.max(0, Math.min(100, x));
      y = Math.max(0, Math.min(100, y));

      const newItems = activeHotspots.map(h => h.id === id ? { ...h, x, y } : h);
      updatePageModule('home', 'visualizer', { hotspots: newItems });

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUploading('image');
        const url = await uploadFile(file);
        updatePageModule('home', 'visualizer', { backgroundMedia: url });
      } catch (err) {
        console.error("Error al subir imagen:", err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleModelChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUploading('model');
        const url = await uploadFile(file);
        updatePageModule('home', 'visualizer', { model3DMedia: url });
      } catch (err) {
        console.error("Error al subir modelo:", err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const addHotspot = () => {
    const newHotspot = {
      id: Date.now(),
      x: 50,
      y: 50,
      name: 'Nuevo Equipo',
      specs: 'Capacidad: 100 kg/h',
      power: '10 kW'
    };
    const newItems = [...activeHotspots, newHotspot];
    updatePageModule('home', 'visualizer', { hotspots: newItems });
    setActiveHotspot(newHotspot.id);
  };

  const removeHotspot = (id) => {
    const newItems = activeHotspots.filter(h => h.id !== id);
    updatePageModule('home', 'visualizer', { hotspots: newItems });
    setActiveHotspot(null);
  };

  const updateHotspot = (id, key, value) => {
    const newItems = activeHotspots.map(h => h.id === id ? { ...h, [key]: value } : h);
    updatePageModule('home', 'visualizer', { hotspots: newItems });
  };

  const handleDialogPointerDown = (e, spot, isTopHalf) => {
    if (!isEditorMode || spot.locked) return;
    // Prevent dragging if interacting with inputs, buttons or editable text
    if (e.target.closest('input, button, p, h4, h3, [contenteditable="true"], .cursor-text, .accent-\\[\\#FFD700\\]')) return;
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const initialLen = spot.arrowLength || 0;
    const initialAng = spot.arrowAngle || 0;

    let initialBoxX = 0;
    let initialBoxY = 0;

    if (initialLen === 0) {
      initialBoxY = isTopHalf ? 60 : -60;
    } else {
      const initialRad = initialAng * (Math.PI / 180);
      initialBoxX = Math.cos(initialRad) * initialLen;
      initialBoxY = Math.sin(initialRad) * initialLen;
    }

    const updatePosition = (moveEvent) => {
      // 3D canvas scales via dpr but pointers inside Html are standard CSS pixels
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      const newBoxX = initialBoxX + deltaX;
      const newBoxY = initialBoxY + deltaY;

      const newLen = Math.sqrt(newBoxX * newBoxX + newBoxY * newBoxY);
      let newAng = Math.atan2(newBoxY, newBoxX) * (180 / Math.PI);
      if (newAng < 0) newAng += 360;

      updateHotspot(spot.id, 'arrowLength', Math.round(newLen));
      updateHotspot(spot.id, 'arrowAngle', Math.round(newAng));
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', updatePosition);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', updatePosition);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const renderHotspotContent = (spot, in3D) => {
    const isTopHalf = spot.y < 50;
    const arrowLen = spot.arrowLength || 0;
    const arrowAng = spot.arrowAngle || 0;

    let boxClass = `absolute left-1/2 ${isTopHalf ? 'top-full mt-4' : 'bottom-full mb-4'} w-64 glass-card p-4 rounded-lg border border-primary shadow-xl bg-[#0A0F14]/95 backdrop-blur-md z-40`;
    let boxStyle = { pointerEvents: 'auto' };
    let pointerClass = `absolute ${isTopHalf ? '-top-2 border-t border-l' : '-bottom-2 border-b border-r'} left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0A0F14] border-primary transform rotate-45`;

    let motionInit = { opacity: 0, x: "-50%", y: isTopHalf ? -10 : 10, scale: 0.9 };
    let motionAnim = { opacity: 1, x: "-50%", y: 0, scale: 1 };
    let motionExit = { opacity: 0, x: "-50%", y: isTopHalf ? -10 : 10, scale: 0.9 };

    if (arrowLen > 0) {
      const rad = arrowAng * (Math.PI / 180);
      const boxX = Math.cos(rad) * arrowLen;
      const boxY = Math.sin(rad) * arrowLen;

      const normAngle = ((arrowAng % 360) + 360) % 360;
      let xTranslate = "-50%";
      let yTranslate = "-50%";
      let initialYOffset = 0;
      let initialXOffset = 0;

      if (normAngle >= 315 || normAngle < 45) { // Derecha
        xTranslate = "15px";
        yTranslate = "-50%";
        initialXOffset = -10;
        pointerClass = "absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#0A0F14] border-l border-b border-primary transform rotate-45";
      } else if (normAngle >= 45 && normAngle < 135) { // Abajo
        xTranslate = "-50%";
        yTranslate = "15px";
        initialYOffset = -10;
        pointerClass = "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#0A0F14] border-t border-l border-primary transform rotate-45";
      } else if (normAngle >= 135 && normAngle < 225) { // Izquierda
        xTranslate = "calc(-100% - 15px)";
        yTranslate = "-50%";
        initialXOffset = 10;
        pointerClass = "absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#0A0F14] border-r border-t border-primary transform rotate-45";
      } else { // Arriba
        xTranslate = "-50%";
        yTranslate = "calc(-100% - 15px)";
        initialYOffset = 10;
        pointerClass = "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-[#0A0F14] border-r border-b border-primary transform rotate-45";
      }

      boxClass = "absolute w-64 glass-card p-4 rounded-lg border border-primary shadow-xl bg-[#0A0F14]/95 backdrop-blur-md z-40";
      boxStyle = {
        pointerEvents: 'auto',
        left: `calc(50% + ${boxX}px)`,
        top: `calc(50% + ${boxY}px)`
      };

      motionInit = { opacity: 0, x: `calc(${xTranslate} + ${initialXOffset}px)`, y: `calc(${yTranslate} + ${initialYOffset}px)`, scale: 0.9 };
      motionAnim = { opacity: 1, x: xTranslate, y: yTranslate, scale: 1 };
      motionExit = { opacity: 0, x: `calc(${xTranslate} + ${initialXOffset}px)`, y: `calc(${yTranslate} + ${initialYOffset}px)`, scale: 0.9 };
    }

    return (
      <>
        <button
          onMouseEnter={() => !isEditorMode && setActiveHotspot(spot.id)}
          onMouseLeave={() => !isEditorMode && setActiveHotspot(null)}
          onClick={() => setActiveHotspot(spot.id === activeHotspot && !isEditorMode ? null : spot.id)}
          onPointerDown={(e) => !in3D && handlePointerDown(e, spot.id)}
          className={`relative w-8 h-8 -ml-4 -mt-4 bg-primary rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-[0_0_15px_rgba(10,132,255,0.6)] ${isEditorMode && !in3D ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'} ${isEditorMode && activeHotspot === spot.id ? 'ring-4 ring-white' : ''} z-20`}
        >
          <Info size={16} />
          <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-75 pointer-events-none"></span>
        </button>

        {/* Flecha indicadora (Aparece solo on hover/active y se conecta al rombo) */}
        {(activeHotspot === spot.id && spot.arrowLength > 0) && (
          <div
            className="absolute z-[1] pointer-events-none"
            style={{
              top: '0',
              left: '0',
              width: `${spot.arrowLength}px`,
              height: '2px',
              backgroundColor: '#FFD700',
              transformOrigin: 'left center',
              transform: `translate(0, -1px) rotate(${spot.arrowAngle || 0}deg)`
            }}
          />
        )}

        <AnimatePresence>
          {activeHotspot === spot.id && (
            <motion.div
              initial={motionInit}
              animate={motionAnim}
              exit={motionExit}
              className={isEditorMode ? `${boxClass} cursor-grab active:cursor-grabbing` : boxClass}
              onPointerDown={(e) => {
                if (isEditorMode) {
                  handleDialogPointerDown(e, spot, isTopHalf);
                } else {
                  e.stopPropagation();
                }
              }}
              style={boxStyle}
            >
              {isEditorMode && (
                <div className="mb-3 pb-3 border-b border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Mover Y/X {in3D && '/Z'}</span>
                    <div className="flex gap-2 items-center">
                      <button onClick={(e) => { e.stopPropagation(); updateHotspot(spot.id, 'locked', !spot.locked); }} className={`${spot.locked ? 'text-[#39FF14]' : 'text-gray-400 hover:text-white'} transition-colors`} title={spot.locked ? "Desbloquear Posición" : "Bloquear Posición (Evita mover por error)"}>
                        {spot.locked ? <Lock size={14} /> : <Unlock size={14} />}
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); removeHotspot(spot.id); }} className="text-red-400 hover:text-red-300 transition-colors" title="Borrar este marcador">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {!spot.locked && (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/40 w-4">X:</span>
                        <input type="range" min="0" max="100" value={spot.x} onChange={(e) => updateHotspot(spot.id, 'x', Number(e.target.value))} className="w-full accent-[#FFD700]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/40 w-4">Y:</span>
                        <input type="range" min="0" max="100" value={spot.y} onChange={(e) => updateHotspot(spot.id, 'y', Number(e.target.value))} className="w-full accent-[#FFD700]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/40 w-4">Z:</span>
                        <input type="range" min="0" max="100" value={spot.z || 50} onChange={(e) => updateHotspot(spot.id, 'z', Number(e.target.value))} className="w-full accent-[#FFD700]" title="Profundidad en Modelo 3D" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-[#FFD700] w-12 font-bold">L-Flecha:</span>
                        <input type="range" min="0" max="300" value={spot.arrowLength || 0} onChange={(e) => updateHotspot(spot.id, 'arrowLength', Number(e.target.value))} className="w-full accent-[#FFD700]" title="Largo de la flecha indicadora" />
                      </div>
                      {(spot.arrowLength > 0) && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-[#FFD700] w-12 font-bold">Ángulo:</span>
                          <input type="range" min="0" max="360" value={spot.arrowAngle || 0} step="1" onChange={(e) => updateHotspot(spot.id, 'arrowAngle', Number(e.target.value))} className="w-full accent-[#FFD700]" title="Ángulo de la flecha" />
                        </div>
                      )}
                    </>
                  )}
                  {spot.locked && (
                    <span className="text-[10px] text-[#39FF14]/80 italic mt-1 bg-[#39FF14]/10 p-1 rounded px-2 w-max">Bloqueado para prevenir ediciones accidentales.</span>
                  )}
                </div>
              )}

              <h4
                className={`font-bold text-primary text-sm mb-1 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text p-1 min-h-[24px]' : ''}`}
                dangerouslySetInnerHTML={{ __html: spot.name }}
                contentEditable={isEditorMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => updateHotspot(spot.id, 'name', e.target.innerHTML)}
              />

              <p
                className={`text-xs text-foreground/80 mb-1 ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text p-1 min-h-[20px]' : ''}`}
                dangerouslySetInnerHTML={{ __html: spot.specs }}
                contentEditable={isEditorMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => updateHotspot(spot.id, 'specs', e.target.innerHTML)}
              />

              <div className="flex items-center text-xs text-muted-foreground mt-2 border-t border-white/5 pt-2">
                <span className="mr-1">Potencia:</span>
                <span
                  className={`${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text p-0.5 min-h-[18px] inline-block min-w-[30px]' : ''}`}
                  dangerouslySetInnerHTML={{ __html: spot.power }}
                  contentEditable={isEditorMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => updateHotspot(spot.id, 'power', e.target.innerHTML)}
                />
              </div>

              <div className={pointerClass}></div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  return (
    <section id="visualizador" className="min-h-screen pt-12 pb-6 md:pt-16 md:pb-8 bg-background relative overflow-hidden flex flex-col justify-center">
      <div className="w-full px-4 md:pl-24 md:pr-8 mx-auto flex flex-col items-center">
        <div className="text-center mb-6 relative w-full">
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
            className={`text-3xl md:text-5xl font-bold text-foreground mb-4 ${isEditorMode ? 'outline-dashed outline-2 outline-blue-400 cursor-text bg-black/20 p-2 rounded-lg inline-block' : ''}`}
            dangerouslySetInnerHTML={{ __html: sectionTitle }}
            onBlur={(e) => {
              updatePageModule('home', 'visualizer', { title: e.target.innerHTML });
            }}
            contentEditable={isEditorMode}
            suppressContentEditableWarning={true}
          />
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text bg-black/20 p-1 rounded backdrop-blur-sm mt-2' : ''}`}
            dangerouslySetInnerHTML={{ __html: sectionSubtitle }}
            onBlur={(e) => {
              updatePageModule('home', 'visualizer', { subtitle: e.target.innerHTML });
            }}
            contentEditable={isEditorMode}
            suppressContentEditableWarning={true}
          />
        </div>

        <div
          ref={containerRef}
          onClick={() => {
            if (!isExpanded) {
              expandScrollY.current = window.scrollY;
              setIsExpanded(true);
            }
          }}
          className={`relative mx-auto rounded-xl overflow-hidden glass-card border ${isEditorMode ? 'border-blue-500/50 outline-dashed outline-2 outline-blue-500/50' : 'border-border/50'} shadow-2xl transition-all duration-700 ease-in-out origin-center ${isExpanded ? 'max-w-[1350px] w-full cursor-default' : 'max-w-[950px] w-full cursor-pointer hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] hover:scale-[1.01]'}`}
        >

          {/* Editor Mode Tools for Image and Adding Hotspots */}
          {isEditorMode && (
            <div className="absolute top-4 right-4 z-[50] flex flex-wrap items-center gap-3 bg-black/50 p-2 rounded-lg backdrop-blur-md">
              <select
                value={backgroundFilter}
                onChange={(e) => updatePageModule('home', 'visualizer', { backgroundFilter: e.target.value })}
                className="bg-black/80 text-white border border-white/20 rounded-md px-3 py-2 text-sm font-bold shadow-xl outline-none"
                title="Filtro de Fondo"
              >
                <option value="none">Filtro: Normal</option>
                <option value="grayscale(100%)">Blanco y Negro</option>
                <option value="sepia(100%)">Sepia</option>
                <option value="brightness(0.3)">Oscurecer Filtro</option>
                <option value="brightness(1.5)">Brillo</option>
                <option value="invert(100%)">Invertir Colores</option>
                <option value="blur(4px)">Desenfoque</option>
              </select>

              <div className="flex items-center gap-2 bg-black/80 px-2 py-1.5 rounded-md border border-white/20">
                <span className="text-[10px] text-white/50 uppercase font-bold">Oscurecer</span>
                <input
                  type="range"
                  min="0"
                  max="95"
                  value={backgroundOpacity}
                  onChange={(e) => updatePageModule('home', 'visualizer', { backgroundOpacity: Number(e.target.value) })}
                  className="w-20 accent-[#FFD700] cursor-pointer"
                  title="Oscurecer fondo u objeto 3D"
                />
              </div>

              <div className="flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded-md border border-white/20">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${bgFxMode ? 'text-[#00E5FF]' : 'text-white/50'}`}>Modo FX</span>
                <div
                  className={`w-7 h-3.5 rounded-full flex items-center p-0.5 cursor-pointer transition-colors shadow-inner box-border ${bgFxMode ? 'bg-[#00E5FF]/30 border border-[#00E5FF]' : 'bg-white/20 border-transparent'}`}
                  onClick={() => updatePageModule('home', 'visualizer', { bgFxMode: !bgFxMode })}
                >
                  <div className={`w-2.5 h-2.5 rounded-full transition-transform ${bgFxMode ? 'translate-x-[14px] bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]' : 'translate-x-0 bg-white'}`} />
                </div>
              </div>

              <button
                onClick={addHotspot}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-xl transition-all"
              >
                <Plus size={16} /> Añadir Marcador
              </button>

              <input type="file" accept="image/*" className="hidden" ref={imageInputRef} onChange={handleImageChange} />
              <button
                onClick={() => imageInputRef.current?.click()}
                disabled={isUploading}
                className="bg-[#FFD700] hover:brightness-110 text-black px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-xl transition-all cursor-pointer"
              >
                {isUploading === 'image' ? (
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <ImageIcon size={16} />
                )}
                <span>Subir Fondo 2D</span>
              </button>

              <input type="file" accept=".obj,.glb,.gltf,.fbx,.dae,.stl,.3ds" className="hidden" ref={modelInputRef} onChange={handleModelChange} />
              <button
                onClick={() => modelInputRef.current?.click()}
                disabled={isUploading}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-xl transition-all cursor-pointer"
              >
                {isUploading === 'model' ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Box size={16} />
                )}
                <span>Subir Objeto 3D</span>
              </button>
            </div>
          )}

          {/* Static rendering of Image & 2D Hotspots for buttery smooth scrolling */}
          <>
            <img
              src={backgroundMedia}
              alt="Planta Industrial Isométrica"
              className={`w-full h-auto object-cover transition-all duration-700 ${bgFxMode ? 'mix-blend-screen opacity-100' : 'opacity-80 mix-blend-luminosity'}`}
              style={{ filter: bgFxMode ? 'invert(1) sepia(1) saturate(5) hue-rotate(135deg) brightness(1.2)' : backgroundFilter }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none z-[4]"></div>

            {/* Título Flotante del Diseño (Editable) */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`absolute top-5 left-6 md:top-8 md:left-10 z-[20] ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-2 bg-black/40 backdrop-blur-sm rounded cursor-text' : ''}`}
            >
              {isEditorMode && (
                <div className="absolute -top-12 left-0 flex items-center gap-2 bg-[#1A1A1A]/95 p-1.5 rounded-lg border border-[#333] shadow-2xl backdrop-blur-md pointer-events-auto w-max z-50">
                  <span className="text-white/40 text-[10px] uppercase font-bold px-1">Título:</span>
                  <select
                    value={designTitleFont}
                    onChange={(e) => updatePageModule('home', 'visualizer', { designTitleFont: e.target.value })}
                    className="bg-black/80 text-white border border-white/20 rounded-md px-2 py-1 text-xs outline-none cursor-pointer"
                  >
                    <option value="Inter, sans-serif">Moderno</option>
                    <option value="Montserrat, sans-serif">Elegante</option>
                    <option value="Roboto Mono, monospace">Técnico</option>
                  </select>
                  <div className="w-[1px] h-4 bg-white/10 mx-1" />
                  <button
                    onMouseDown={(e) => { e.preventDefault(); document.execCommand('foreColor', false, '#FFFFFF') }}
                    className="hover:bg-white/10 text-white px-2 py-1 flex items-center gap-1 rounded text-xs transition-colors"
                    title="Pintar selección de Blanco"
                  >
                    <div className="w-2.5 h-2.5 bg-white rounded-full border border-gray-400"></div> Blanco
                  </button>
                  <button
                    onMouseDown={(e) => { e.preventDefault(); document.execCommand('foreColor', false, '#FFD700') }}
                    className="hover:bg-white/10 text-[#FFD700] px-2 py-1 flex items-center gap-1 rounded text-xs transition-colors"
                    title="Pintar selección de Acento"
                  >
                    <div className="w-2.5 h-2.5 bg-[#FFD700] rounded-full"></div> Acento
                  </button>
                </div>
              )}
              <h3
                className="text-white text-xl md:text-3xl lg:text-4xl font-black tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                style={{ fontFamily: designTitleFont }}
                dangerouslySetInnerHTML={{ __html: designTitle }}
                contentEditable={isEditorMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => updatePageModule('home', 'visualizer', { designTitle: e.target.innerHTML })}
              />
            </motion.div>

            {/* If there is a 3D model, show a button to enter the interactive 3D world */}
            {(model3DMedia || isEditorMode) && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[30] pointer-events-auto">
                <button
                  onClick={() => model3DMedia ? setShow3DModal(true) : modelInputRef.current?.click()}
                  className={`bg-[#FFD700]/90 hover:bg-[#FFD700] text-black px-6 py-3 rounded-full flex items-center gap-3 text-sm font-bold shadow-[0_0_20px_rgba(255,215,0,0.5)] transform hover:scale-105 transition-all ${!model3DMedia ? 'opacity-80' : ''}`}
                >
                  {model3DMedia ? (
                    <>
                      <Maximize2 size={18} /> Entrar a Modelo 3D Interactivo
                    </>
                  ) : (
                    <>
                      <Box size={18} /> Subir Archivo 3D para Activar
                    </>
                  )}
                </button>
              </div>
            )}
          </>

          {/* Capa de oscurecimiento global (Aplica a la foto y al 3D) */}
          <div
            className="absolute inset-0 pointer-events-none z-[5]"
            style={{
              backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity / 100})`,
              transition: 'background-color 0.2s ease-out'
            }}
          />

          <div className="absolute inset-0 pointer-events-none z-[10]">
            {activeHotspots.map((spot) => (
              <div
                key={spot.id}
                id={`hotspot-${spot.id}`}
                className="absolute z-20 pointer-events-auto"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              >
                {renderHotspotContent(spot, false)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen 3D Modal Overlay */}
      <AnimatePresence>
        {show3DModal && model3DMedia && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[99999] bg-black"
          >
            <div className="absolute top-4 right-4 z-[999999]">
              <button
                onClick={() => setShow3DModal(false)}
                className="bg-red-500 hover:bg-red-400 text-white rounded-full p-2 shadow-2xl transition-all"
              >
                <X size={24} />
              </button>
            </div>
            {/* Título Flotante del Diseño en 3D (Editable) */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`absolute top-5 left-6 md:top-8 md:left-10 z-[999999] pointer-events-none ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-2 bg-black/40 backdrop-blur-sm rounded cursor-text pointer-events-auto' : ''}`}
            >
              {isEditorMode && (
                <div className="absolute -top-12 left-0 flex items-center gap-2 bg-[#1A1A1A]/95 p-1.5 rounded-lg border border-[#333] shadow-2xl backdrop-blur-md pointer-events-auto w-max z-[1000000]">
                  <span className="text-white/40 text-[10px] uppercase font-bold px-1">Título:</span>
                  <select
                    value={designTitleFont}
                    onChange={(e) => updatePageModule('home', 'visualizer', { designTitleFont: e.target.value })}
                    className="bg-black/80 text-white border border-white/20 rounded-md px-2 py-1 text-xs outline-none cursor-pointer"
                  >
                    <option value="Inter, sans-serif">Moderno</option>
                    <option value="Montserrat, sans-serif">Elegante</option>
                    <option value="Roboto Mono, monospace">Técnico</option>
                  </select>
                  <div className="w-[1px] h-4 bg-white/10 mx-1" />
                  <button
                    onMouseDown={(e) => { e.preventDefault(); document.execCommand('foreColor', false, '#FFFFFF') }}
                    className="hover:bg-white/10 text-white px-2 py-1 flex items-center gap-1 rounded text-xs transition-colors"
                  >
                    <div className="w-2.5 h-2.5 bg-white rounded-full border border-gray-400"></div> Blanco
                  </button>
                  <button
                    onMouseDown={(e) => { e.preventDefault(); document.execCommand('foreColor', false, '#FFD700') }}
                    className="hover:bg-white/10 text-[#FFD700] px-2 py-1 flex items-center gap-1 rounded text-xs transition-colors"
                  >
                    <div className="w-2.5 h-2.5 bg-[#FFD700] rounded-full"></div> Acento
                  </button>
                </div>
              )}
              <h3
                className="text-white text-xl md:text-3xl lg:text-4xl font-black tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] pointer-events-auto"
                style={{ fontFamily: designTitleFont }}
                dangerouslySetInnerHTML={{ __html: designTitle }}
                contentEditable={isEditorMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => updatePageModule('home', 'visualizer', { designTitle: e.target.innerHTML })}
              />
            </motion.div>
            <div className="w-full h-full">
              <ModelViewer url={model3DMedia} moduleData={moduleData} updatePageModule={updatePageModule}>
                {activeHotspots.map(spot => (
                  <DraggableHotspot3D
                    key={spot.id}
                    spot={spot}
                    isEditorMode={isEditorMode}
                    onUpdate={updateHotspot}
                  >
                    {renderHotspotContent(spot, true)}
                  </DraggableHotspot3D>
                ))}
              </ModelViewer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section >
  );
};

export default PlantVisualizerSection;
