
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const sections = [
  'HeroSection', 'IndustriesSection', 'MachinerySection', 'SolutionsSection', 
  'PlantVisualizerSection', 'PlantConfiguratorSection', 'QuoteBuilderSection', 
  'IndustrialProjectsSection', 'TechnologySection', 'ContactSection'
];

const ContentEditor = () => {
  const { toast } = useToast();
  const [content, setContent] = useState(
    sections.reduce((acc, section) => ({
      ...acc,
      [section]: { title: `Título de ${section}`, description: `Descripción de ${section}` }
    }), {})
  );

  const handleChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleSave = (section) => {
    toast({
      title: "Guardado exitoso",
      description: `Los cambios en ${section} han sido guardados.`,
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Editor de Contenido</h2>
      <div className="grid gap-6">
        {sections.map((section) => (
          <div key={section} className="bg-[#1A1F2E] p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-[#0A84FF] mb-4">{section}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">Título</label>
                <input 
                  type="text" 
                  value={content[section].title}
                  onChange={(e) => handleChange(section, 'title', e.target.value)}
                  className="w-full bg-[#0B0F14] border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#0A84FF]"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Descripción</label>
                <textarea 
                  value={content[section].description}
                  onChange={(e) => handleChange(section, 'description', e.target.value)}
                  className="w-full bg-[#0B0F14] border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#0A84FF] min-h-[100px]"
                />
              </div>
              <button 
                onClick={() => handleSave(section)}
                className="bg-[#0A84FF] text-white px-6 py-2 rounded-lg hover:bg-[#0A84FF]/80 transition-colors"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentEditor;
