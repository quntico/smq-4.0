
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Upload, Image as ImageIcon } from 'lucide-react';

const DesignEditor = () => {
  const { toast } = useToast();
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80');

  const handleSave = () => {
    toast({
      title: "Diseño actualizado",
      description: "Los cambios de diseño han sido guardados correctamente.",
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Editor de Diseño</h2>
      
      <div className="bg-[#1A1F2E] p-6 rounded-xl border border-white/10 space-y-6">
        <h3 className="text-lg font-semibold text-white">Imagen Hero Principal</h3>
        
        <div className="relative h-[200px] w-full rounded-lg overflow-hidden border border-white/10 group">
          <img src={heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
              <Upload size={18} /> Cambiar Imagen
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mt-8">Animaciones Globales</h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0A84FF]" />
              Activar animaciones de scroll
            </label>
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="bg-[#0A84FF] text-white px-6 py-2 rounded-lg hover:bg-[#0A84FF]/80 transition-colors mt-4"
        >
          Guardar Diseño
        </button>
      </div>
    </div>
  );
};

export default DesignEditor;
