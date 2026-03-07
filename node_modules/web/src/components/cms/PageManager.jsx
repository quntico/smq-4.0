import React, { useState } from 'react';
import { useCMS } from '@/context/CMSContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const availableModules = [
    { type: 'hero', name: 'Hero Section', icon: 'M4 4h16v8H4z' },
    { type: 'text', name: 'Text Section', icon: 'M4 6h16M4 12h16M4 18h10' },
    { type: 'image', name: 'Image Block', icon: 'M4 4h16v16H4zM8 12l3 3 5-5' },
    { type: 'video', name: 'Video Block', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { type: 'cards', name: 'Industrial Cards', icon: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z' },
    { type: 'machinery', name: 'Machinery List', icon: 'M4 6h16M4 12h16M4 18h16' },
    { type: 'gallery', name: 'Gallery', icon: 'M4 4h4v4H4zM10 4h4v4h-4zM16 4h4v4h-4zM4 10h4v4H4zM10 10h4v4h-4zM16 10h4v4h-4z' },
    { type: 'cta', name: 'CTA Section', icon: 'M15 14l5-5-5-5 M20 9H4' },
    { type: 'table', name: 'Technical Table', icon: 'M3 3h18v18H3z M3 9h18 M9 3v18' },
    { type: 'grid', name: 'Industrial Grid', icon: 'M4 4h16v16H4z' },
    { type: 'timeline', name: 'Timeline', icon: 'M12 2v20 M8 6h8 M8 12h8 M8 18h8' },
    { type: 'testimonials', name: 'Testimonials', icon: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z' }
];

const PageManager = () => {
    const { cmsState, updateSettings, updatePages } = useCMS();
    const [pages, setPages] = useState(cmsState.pages || []);
    const [editingPage, setEditingPage] = useState(null);

    const persistPages = (newPages) => {
        setPages(newPages);
        updatePages(newPages);
    };

    const addPage = () => {
        const newPage = {
            id: `page-${Date.now()}`,
            title: 'Nueva Página',
            slug: `/nueva-pagina`,
            modules: []
        };
        persistPages([...pages, newPage]);
        setEditingPage(newPage.id);
    };

    const deletePage = (id) => {
        if (confirm('¿Eliminar esta página de forma permanente?')) {
            persistPages(pages.filter(p => p.id !== id));
        }
    };

    if (editingPage) {
        const page = pages.find(p => p.id === editingPage);
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => setEditingPage(null)} className="text-white/50 hover:text-white transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </button>
                    <h3 className="text-xl font-medium text-white">Editando: {page?.title}</h3>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-4">
                    <div>
                        <label className="text-sm text-white/50 block mb-1">Título de la Página</label>
                        <input
                            type="text"
                            value={page?.title || ''}
                            onChange={(e) => {
                                const newPages = pages.map(p => p.id === page.id ? { ...p, title: e.target.value } : p);
                                persistPages(newPages);
                            }}
                            className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white w-full focus:outline-none focus:border-[#FFD700]"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-white/50 block mb-1">Ruta (Slug)</label>
                        <input
                            type="text"
                            value={page?.slug || ''}
                            onChange={(e) => {
                                const newPages = pages.map(p => p.id === page.id ? { ...p, slug: e.target.value } : p);
                                persistPages(newPages);
                            }}
                            className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white w-full focus:outline-none focus:border-[#FFD700]"
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <h4 className="text-lg font-medium text-white mb-4">Módulos de la Página</h4>
                    <div className="space-y-3 mb-6">
                        {page?.modules.map((mod, idx) => (
                            <div key={mod.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="text-white/50 bg-black/50 p-2 rounded">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={availableModules.find(m => m.type === mod.type)?.icon || 'M4 6h16M4 12h16'}></path></svg>
                                    </div>
                                    <span className="text-white">{availableModules.find(m => m.type === mod.type)?.name || `Módulo ${mod.type}`}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        const newPages = pages.map(p => p.id === page.id ? { ...p, modules: p.modules.filter(m => m.id !== mod.id) } : p);
                                        persistPages(newPages);
                                    }}
                                    className="text-red-400 hover:bg-red-500/10 p-2 rounded"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                        ))}
                        {page?.modules.length === 0 && (
                            <div className="text-white/30 text-center py-6 border border-dashed border-white/10 rounded-xl">
                                No hay módulos en esta página. Añade uno abajo.
                            </div>
                        )}
                    </div>

                    <h5 className="text-sm font-medium text-white/50 mb-3">Añadir Módulo:</h5>
                    <div className="grid grid-cols-2 gap-3">
                        {availableModules.map(mod => (
                            <button
                                key={mod.type}
                                onClick={() => {
                                    const newMod = { id: `${mod.type}-${Date.now()}`, type: mod.type, data: {} };
                                    const newPages = pages.map(p => p.id === page.id ? { ...p, modules: [...p.modules, newMod] } : p);
                                    persistPages(newPages);
                                }}
                                className="bg-white/5 hover:bg-[#FFD700]/10 hover:border-[#FFD700]/50 border border-white/10 p-3 rounded-lg flex items-center gap-3 transition-colors text-left"
                            >
                                <svg className="text-white/50" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={mod.icon}></path></svg>
                                <span className="text-white text-sm">{mod.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium text-white">Administrador de Páginas</h3>
                <button onClick={addPage} className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Crear Página
                </button>
            </div>

            <div className="space-y-3">
                {pages.map(page => (
                    <div key={page.id} className="bg-white/5 border border-white/10 p-5 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors">
                        <div>
                            <h4 className="text-white font-medium text-lg">{page.title}</h4>
                            <p className="text-white/40 text-sm mt-1">{page.slug} • {page.modules?.length || 0} módulos</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setEditingPage(page.id)} className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                Editar
                            </button>
                            <button onClick={() => deletePage(page.id)} className="p-2 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageManager;
