
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, Trash2 } from 'lucide-react';

const MediaManager = () => {
  const { toast } = useToast();
  const mockImages = [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1530893609608-31a1921698f8?auto=format&fit=crop&q=80&w=300'
  ];

  const handleDelete = () => {
    toast({
      title: "Imagen eliminada",
      description: "La imagen ha sido eliminada de la galería.",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Gestor de Media</h2>
      
      <div className="border-2 border-dashed border-white/20 rounded-xl p-12 flex flex-col items-center justify-center text-center bg-[#1A1F2E]/50 hover:bg-[#1A1F2E] transition-colors cursor-pointer">
        <UploadCloud size={48} className="text-[#0A84FF] mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">Arrastra tus imágenes aquí</h3>
        <p className="text-white/50 text-sm">o haz clic para seleccionar archivos</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        {mockImages.map((img, i) => (
          <div key={i} className="relative group rounded-xl overflow-hidden border border-white/10 aspect-video">
            <img src={img} alt={`Media ${i}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaManager;
