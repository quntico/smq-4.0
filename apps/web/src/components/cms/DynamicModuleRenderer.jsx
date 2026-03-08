import React from 'react';

// Common module imports mapping
// For now, mapping standard components that might exist or generic text
import HeroSection from '@/components/HeroSection.jsx';

const DynamicModuleRenderer = ({ module, pageId }) => {
    switch (module.type) {
        case 'hero':
            return <HeroSection {...module.data} />;
        case 'text':
            return (
                <div className="py-20 px-10 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl text-white font-bold mb-6">{module.data?.title || 'Título de Texto'}</h2>
                    <p className="text-white/70 leading-relaxed text-lg">{module.data?.content || 'Contenido del bloque de texto...'}</p>
                </div>
            );
        case 'image':
            return (
                <div className="py-10 px-10 flex justify-center">
                    {module.data?.url ? (
                        <img src={module.data.url} alt="Module Content" className="rounded-xl w-full max-w-5xl h-auto object-cover" />
                    ) : (
                        <div className="w-full max-w-5xl h-[400px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/50">
                            [Bloque de Imagen - Agrega una URL en el Editor]
                        </div>
                    )}
                </div>
            )
        default:
            return (
                <div className="py-10 px-10">
                    <div className="bg-[#FFD700]/10 border border-[#FFD700]/50 rounded-xl p-6 text-center">
                        <p className="text-[#FFD700] mb-2 font-medium">Módulo de tipo <strong>{module.type}</strong></p>
                        <p className="text-white/60 text-sm">El diseño para este bloque estará disponible próximamente en el código base.</p>
                    </div>
                </div>
            );
    }
};

export default DynamicModuleRenderer;
