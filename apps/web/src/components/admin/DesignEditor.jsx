import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Upload, Image as ImageIcon, Eye, Check, RefreshCw } from 'lucide-react';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';

const DesignEditor = () => {
  const { toast } = useToast();
  const { cmsState, updateSettings, syncToCloud } = useCMS();
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingFavicon, setIsUploadingFavicon] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  const {
    logoUrl,
    faviconUrl,
    logoSize = 98,
    headerHeight = 100,
    headerOpacity = 60,
    globalImageSharpness = 100,
    globalFilterColor = '#000000',
    globalFilterOpacity = 75,
    textJustify = true,
    disableImageFilters = false,
  } = cmsState.settings;

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await syncToCloud();
      toast({
        title: "Diseño Guardado",
        description: "La configuración de diseño ha sido sincronizada con éxito en la nube.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error al guardar",
        description: "No se pudo sincronizar el diseño con la nube.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUploadLogo = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingLogo(true);
      const url = await uploadFile(file, "media");
      updateSettings({ logoUrl: url });
      toast({
        title: "Logo Subido",
        description: "El nuevo logo ha sido cargado correctamente.",
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error de carga",
        description: "No se pudo subir la imagen del logo.",
      });
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleUploadFavicon = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingFavicon(true);
      const url = await uploadFile(file, "media");
      updateSettings({ faviconUrl: url });
      toast({
        title: "Favicon Subido",
        description: "El nuevo favicon ha sido cargado correctamente.",
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error de carga",
        description: "No se pudo subir la imagen del favicon.",
      });
    } finally {
      setIsUploadingFavicon(false);
    }
  };

  return (
    <div className="space-y-6 text-white font-['Poppins']">
      <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-wider">Editor de Identidad y Estilos</h2>
          <p className="text-xs text-white/50 mt-1">Configura colores, logotipos, favicon y alineación global del sitio.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#10B981] hover:bg-[#059669] disabled:bg-emerald-800 text-white px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-950/40"
        >
          {isSaving ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Check className="w-3.5 h-3.5" />
          )}
          <span>{isSaving ? 'Guardando...' : 'Sincronizar Nube'}</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bloque 1: Identidad Corporativa */}
        <div className="bg-[#101520]/80 p-5 rounded-xl border border-white/10 flex flex-col gap-4">
          <h3 className="text-xs font-black text-[#FFD700] uppercase tracking-widest border-b border-white/5 pb-2">Identidad de Marca</h3>
          
          {/* Logo Principal */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold text-white/60">Logo Principal de Cabecera</label>
            <div className="flex items-center gap-4 bg-black/30 p-3 rounded-lg border border-white/5">
              <div className="h-12 w-24 bg-black/40 rounded flex items-center justify-center p-1 border border-white/5 overflow-hidden">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="max-h-full max-w-full object-contain" />
                ) : (
                  <ImageIcon size={20} className="opacity-20" />
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <input 
                  type="text" 
                  value={logoUrl || ''} 
                  onChange={(e) => updateSettings({ logoUrl: e.target.value })}
                  placeholder="https://..."
                  className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-[#FFD700] transition-colors"
                />
                <input 
                  type="file" 
                  ref={logoInputRef}
                  onChange={handleUploadLogo} 
                  className="hidden" 
                  accept="image/*"
                />
                <button 
                  onClick={() => logoInputRef.current?.click()}
                  disabled={isUploadingLogo}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-bold py-1 px-2.5 rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer self-start"
                >
                  {isUploadingLogo ? <RefreshCw size={10} className="animate-spin" /> : <Upload size={10} />}
                  <span>Subir Archivo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Favicon del Navegador */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold text-white/60">Favicon del Navegador (.png/.ico)</label>
            <div className="flex items-center gap-4 bg-black/30 p-3 rounded-lg border border-white/5">
              <div className="h-10 w-10 bg-black/40 rounded flex items-center justify-center p-1 border border-white/5 overflow-hidden">
                {faviconUrl ? (
                  <img src={faviconUrl} alt="Favicon" className="max-h-full max-w-full object-contain" />
                ) : (
                  <ImageIcon size={18} className="opacity-20" />
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <input 
                  type="text" 
                  value={faviconUrl || ''} 
                  onChange={(e) => updateSettings({ faviconUrl: e.target.value })}
                  placeholder="https://..."
                  className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-[#FFD700] transition-colors"
                />
                <input 
                  type="file" 
                  ref={faviconInputRef}
                  onChange={handleUploadFavicon} 
                  className="hidden" 
                  accept="image/*"
                />
                <button 
                  onClick={() => faviconInputRef.current?.click()}
                  disabled={isUploadingFavicon}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-bold py-1 px-2.5 rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer self-start"
                >
                  {isUploadingFavicon ? <RefreshCw size={10} className="animate-spin" /> : <Upload size={10} />}
                  <span>Subir Archivo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tamaño del Logo */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[10px] font-bold text-white/60 uppercase">
              <span>Tamaño del Logo</span>
              <span className="text-[#FFD700]">{logoSize}px</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="200" 
              value={logoSize} 
              onChange={(e) => updateSettings({ logoSize: parseInt(e.target.value) })}
              className="w-full accent-[#FFD700] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none"
            />
          </div>
        </div>

        {/* Bloque 2: Estilos Globales */}
        <div className="bg-[#101520]/80 p-5 rounded-xl border border-white/10 flex flex-col gap-4">
          <h3 className="text-xs font-black text-[#FFD700] uppercase tracking-widest border-b border-white/5 pb-2">Estilos y Formatos Globales</h3>

          {/* Justificación de Texto */}
          <div className="flex flex-col gap-2 p-3 bg-black/20 rounded-lg border border-white/5">
            <label className="text-[10px] uppercase font-black tracking-wider text-[#FFD700]">Alineación del Texto de Párrafos</label>
            <div className="flex items-center gap-3 mt-1">
              <input 
                type="checkbox" 
                id="textJustify"
                checked={textJustify} 
                onChange={(e) => updateSettings({ textJustify: e.target.checked })}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#FFD700] accent-[#FFD700] focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="textJustify" className="text-xs text-white/80 cursor-pointer select-none leading-normal">
                Justificar párrafos globalmente (<code className="text-[10px] text-[#FFD700]/80 bg-white/5 px-1 rounded">text-align: justify</code>)
              </label>
            </div>
            <p className="text-[9px] text-white/40 mt-1 leading-normal">Habilita o deshabilita la alineación justificada para mejorar la legibilidad y formateo de los bloques de descripción en todo el portal.</p>
          </div>

          {/* Desactivar Filtros de Imagen */}
          <div className="flex flex-col gap-2 p-3 bg-black/20 rounded-lg border border-white/5">
            <label className="text-[10px] uppercase font-black tracking-wider text-[#FFD700]">Visualización de Media Real</label>
            <div className="flex items-center gap-3 mt-1">
              <input 
                type="checkbox" 
                id="disableImageFilters"
                checked={disableImageFilters} 
                onChange={(e) => updateSettings({ disableImageFilters: e.target.checked })}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#FFD700] accent-[#FFD700] focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="disableImageFilters" className="text-xs text-white/80 cursor-pointer select-none leading-normal">
                Desactivar filtros y superposiciones (Colores reales)
              </label>
            </div>
            <p className="text-[9px] text-white/40 mt-1 leading-normal">Remueve temporalmente filtros de color, oscurecimiento, contrastes y desenfoques sobre todas las imágenes y videos del sitio.</p>
          </div>

          {/* Nitidez de Imagen */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[10px] font-bold text-white/60 uppercase">
              <span>Nitidez de Imagen / Enfoque</span>
              <span className="text-[#FFD700]">{globalImageSharpness}%</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="150" 
              value={globalImageSharpness} 
              onChange={(e) => updateSettings({ globalImageSharpness: parseInt(e.target.value) })}
              className="w-full accent-[#FFD700] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none"
            />
          </div>

          {/* Filtro de Color Global */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-white/60">Color de Filtro Global</label>
              <div className="flex items-center gap-2 bg-black/20 p-2 rounded-lg border border-white/5 h-[34px]">
                <input 
                  type="color" 
                  value={globalFilterColor} 
                  onChange={(e) => updateSettings({ globalFilterColor: e.target.value })}
                  className="w-8 h-full bg-transparent border-0 cursor-pointer rounded overflow-hidden"
                />
                <span className="text-xs font-mono uppercase">{globalFilterColor}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[10px] font-bold text-white/60 uppercase">
                <span>Opacidad de Filtro</span>
                <span className="text-[#FFD700]">{globalFilterOpacity}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="95" 
                value={globalFilterOpacity} 
                onChange={(e) => updateSettings({ globalFilterOpacity: parseInt(e.target.value) })}
                className="w-full accent-[#FFD700] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none mt-2"
              />
            </div>
          </div>

          {/* Dimensiones de la cabecera */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[10px] font-bold text-white/60 uppercase">
                <span>Altura Cabecera</span>
                <span className="text-[#FFD700]">{headerHeight}px</span>
              </div>
              <input 
                type="range" 
                min="60" 
                max="150" 
                value={headerHeight} 
                onChange={(e) => updateSettings({ headerHeight: parseInt(e.target.value) })}
                className="w-full accent-[#FFD700] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[10px] font-bold text-white/60 uppercase">
                <span>Opacidad Cabecera</span>
                <span className="text-[#FFD700]">{headerOpacity}%</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="100" 
                value={headerOpacity} 
                onChange={(e) => updateSettings({ headerOpacity: parseInt(e.target.value) })}
                className="w-full accent-[#FFD700] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignEditor;
