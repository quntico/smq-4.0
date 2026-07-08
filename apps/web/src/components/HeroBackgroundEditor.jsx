import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Upload, Video } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';

const HeroBackgroundEditor = ({ pageId, defaultMedia = '', defaultOpacity = 100, fogGradient = 'bg-gradient-to-b from-[#080b12] to-[#030712]' }) => {
  const { isEditorMode, cmsState, updateSettings, syncToCloud } = useCMS();
  const [showControls, setShowControls] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const mediaKey = `${pageId}HeroMedia`;
  const opacityKey = `${pageId}HeroOpacity`;
  const fogKey = `${pageId}HeroFogOpacity`;
  const brightnessKey = `${pageId}HeroBrightness`;

  const heroMedia = cmsState?.settings?.[mediaKey] || defaultMedia;
  const heroOpacity = cmsState?.settings?.[opacityKey] ?? defaultOpacity;
  const fogOpacity = cmsState?.settings?.[fogKey] ?? 80;
  const heroBrightness = cmsState?.settings?.[brightnessKey] ?? 100;

  const isVideo = heroMedia && (heroMedia.endsWith('.mp4') || heroMedia.endsWith('.webm'));

  const handleMediaUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadFile(file);
      if (url) {
        updateSettings({ [mediaKey]: url });
        await syncToCloud();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Dynamic Background Media Layer */}
      {heroMedia && (
        isVideo ? (
          <video 
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
            style={{ opacity: heroOpacity / 100, filter: `brightness(${heroBrightness}%)` }}
            src={heroMedia}
          />
        ) : (
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: `url('${heroMedia}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              opacity: heroOpacity / 100,
              filter: `brightness(${heroBrightness}%)`
            }}
          />
        )
      )}

      {/* Fog Layer */}
      <div 
        className={`absolute inset-0 pointer-events-none z-0 ${fogGradient}`}
        style={{ opacity: fogOpacity / 100 }}
      />
      
      {/* Editor Controls */}
      {isEditorMode && (
        <div className="absolute bottom-10 right-8 z-40 flex flex-col items-end gap-2 pointer-events-auto">
          <button
            onClick={() => setShowControls(!showControls)}
            className="bg-[#0C1017]/90 hover:bg-black text-white hover:text-[#FFD700] border border-white/10 hover:border-[#FFD700]/50 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all flex items-center gap-2"
          >
            {isVideo ? <Video size={14} className={showControls ? 'text-[#FFD700]' : ''} /> : <ImageIcon size={14} className={showControls ? 'text-[#FFD700]' : ''} />}
            <span>{showControls ? 'Cerrar Ajustes' : 'Fondo Hero'}</span>
          </button>

          {showControls && (
            <div className="bg-[#0C1017]/95 border border-white/10 p-5 rounded-2xl backdrop-blur-xl shadow-2xl w-64 mt-2">
              <h3 className="text-[#FFD700] text-[10px] font-black uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Ajustes de Fondo ({pageId})</h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                    <span>Visibilidad (Opacidad)</span>
                    <span className="text-[#FFD700]">{heroOpacity}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" 
                    value={heroOpacity} 
                    onChange={(e) => updateSettings({ [opacityKey]: parseInt(e.target.value) })} 
                    className="w-full accent-[#FFD700] h-1 bg-white/10 appearance-none rounded-full cursor-pointer" 
                  />
                </div>

                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                    <span>Niebla (Fog)</span>
                    <span className="text-[#FFD700]">{fogOpacity}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" 
                    value={fogOpacity} 
                    onChange={(e) => updateSettings({ [fogKey]: parseInt(e.target.value) })} 
                    className="w-full accent-[#FFD700] h-1 bg-white/10 appearance-none rounded-full cursor-pointer" 
                  />
                </div>

                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                    <span>Brillo</span>
                    <span className="text-[#FFD700]">{heroBrightness}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="200" 
                    value={heroBrightness} 
                    onChange={(e) => updateSettings({ [brightnessKey]: parseInt(e.target.value) })} 
                    className="w-full accent-[#FFD700] h-1 bg-white/10 appearance-none rounded-full cursor-pointer" 
                  />
                </div>
                
                <label className="cursor-pointer flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#FFC000] text-black rounded-lg py-2 transition-colors text-[10px] font-bold mt-2">
                  <Upload size={14} />
                  {isUploading ? 'Subiendo...' : 'Cambiar Imagen/Video'}
                  <input type="file" className="hidden" accept="image/*,video/mp4,video/webm" onChange={handleMediaUpload} disabled={isUploading} />
                </label>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HeroBackgroundEditor;
