
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

const initialModules = [
  { id: 1, name: 'HeroSection', active: true },
  { id: 2, name: 'IndustriesSection', active: true },
  { id: 3, name: 'MachinerySection', active: true },
  { id: 4, name: 'SolutionsSection', active: true },
  { id: 5, name: 'ContactSection', active: true },
];

const ModulesEditor = () => {
  const { toast } = useToast();
  const [modules, setModules] = useState(initialModules);

  const toggleModule = (id) => {
    setModules(modules.map(m => m.id === id ? { ...m, active: !m.active } : m));
    toast({
      title: "Módulo actualizado",
      description: "El estado del módulo ha sido cambiado.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Gestión de Módulos</h2>
        <button className="bg-[#FFD700] text-black px-4 py-2 rounded-lg font-medium hover:brightness-110 transition-all flex items-center gap-2">
          <Plus size={18} /> Agregar módulo
        </button>
      </div>

      <div className="bg-[#1A1F2E] rounded-xl border border-white/10 overflow-hidden">
        {modules.map((mod, index) => (
          <div 
            key={mod.id} 
            className={`flex items-center justify-between p-4 ${index !== modules.length - 1 ? 'border-b border-white/5' : ''}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${mod.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-white font-medium">{mod.name}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={mod.active}
                onChange={() => toggleModule(mod.id)}
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A84FF]"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesEditor;
