
import React from 'react';
import { useToast } from '@/hooks/use-toast';

const SettingsEditor = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Configuración guardada",
      description: "Los ajustes generales han sido actualizados.",
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Configuración General</h2>
      
      <div className="bg-[#1A1F2E] p-6 rounded-xl border border-white/10 space-y-6">
        <div>
          <label className="block text-sm text-white/60 mb-2">Color Principal de Marca</label>
          <div className="flex items-center gap-4">
            <input type="color" defaultValue="#FFD700" className="w-12 h-12 rounded cursor-pointer bg-transparent border-0 p-0" />
            <span className="text-white font-mono bg-[#0B0F14] px-3 py-1 rounded border border-white/10">#FFD700</span>
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">Email de Contacto</label>
          <input 
            type="email" 
            defaultValue="contacto@smq.com"
            className="w-full max-w-md bg-[#0B0F14] border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#0A84FF]"
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">Teléfono Principal</label>
          <input 
            type="text" 
            defaultValue="+52 123 456 7890"
            className="w-full max-w-md bg-[#0B0F14] border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#0A84FF]"
          />
        </div>

        <button 
          onClick={handleSave}
          className="bg-[#0A84FF] text-white px-6 py-2 rounded-lg hover:bg-[#0A84FF]/80 transition-colors mt-4"
        >
          Guardar Configuración
        </button>
      </div>
    </div>
  );
};

export default SettingsEditor;
