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
    { type: 'timeline', name: 'Timeline', icon: 'M12 2v20 M8 6h8 M8 12h8 M8 18h8' },
    { type: 'testimonials', name: 'Testimonials', icon: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z' }
];

const preDefinedPages = [
    { title: 'Extrusión', slug: '/extrusion' },
    { title: 'Coextrusión', slug: '/coextrusion' },
    { title: 'Pelletizado', slug: '/pelletizado' },
    { title: 'Lavado de plástico', slug: '/lavado' },
    { title: 'Chocolate', slug: '/chocolate' },
    { title: 'Confitería', slug: '/confiteria' },
    { title: 'Ingredientes industriales', slug: '/ingredientes' },
    { title: 'Empaques flexibles', slug: '/empaques-flexibles' },
    { title: 'Empaques rígidos', slug: '/empaques-rigidos' },
    { title: 'Etiquetado', slug: '/etiquetado' },
    { title: 'Materiales compuestos', slug: '/materiales-compuestos' },
    { title: 'Materiales reciclados', slug: '/materiales-reciclados' },
    { title: 'Procesamiento agrícola', slug: '/procesamiento-agricola' },
    { title: 'Alimentos balanceados', slug: '/alimentos-balanceados' },
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

    const handleCreatePredefined = (e) => {
        const slug = e.target.value;
        if (!slug) return;

        // Si la página ya existe, la abre para editar
        const existing = pages.find(p => p.slug === slug);
        if (existing) {
            setEditingPage(existing.id);
            return;
        }

        // Si no existe, la crea con sus nombres ya listos
        const template = preDefinedPages.find(p => p.slug === slug);
        const newPage = {
            id: `page-${Date.now()}`,
            title: template.title,
            slug: template.slug,
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
            <div className="flex justify-between items-center bg-black/40 border border-[#FFD700]/20 p-6 rounded-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white tracking-tight">Páginas de la Web</h3>
                    <p className="text-white/50 text-sm mt-1">Crea o vincula las secciones de tus menús.</p>
                </div>
                <div className="relative z-10 flex flex-col sm:flex-row gap-3">
                    <select
                        onChange={handleCreatePredefined}
                        value=""
                        className="bg-black/60 border border-white/20 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#FFD700] hover:border-white/40 transition-colors text-sm font-medium cursor-pointer"
                    >
                        <option value="" disabled>Seleccionar del menú...</option>
                        {preDefinedPages.map(p => {
                            const isCreated = pages.some(existing => existing.slug === p.slug);
                            return (
                                <option key={p.slug} value={p.slug}>
                                    {isCreated ? `✏️ Editar: ${p.title}` : `➕ Crear: ${p.title}`}
                                </option>
                            );
                        })}
                    </select>

                    <button onClick={addPage} className="bg-[#FFD700] hover:brightness-110 text-black px-5 py-2.5 rounded-lg transition-all text-sm font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Página en Blanco
                    </button>
                </div>
                {/* Decorative background glow */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#FFD700]/10 rounded-full blur-[40px]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pages.map(page => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={page.id}
                        className="bg-white/5 border border-white/10 hover:border-[#FFD700]/30 hover:bg-white/10 p-5 rounded-2xl transition-all group flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700]">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    </div>
                                    <h4 className="text-white font-semibold text-[17px] truncate max-w-[150px]" title={page.title}>{page.title}</h4>
                                </div>
                                <span className="text-[10px] font-mono tracking-wider text-white/40 bg-black/40 px-2 py-1 rounded-full uppercase border border-white/10">
                                    {page.modules?.length || 0} Bloques
                                </span>
                            </div>
                            <div className="mb-4">
                                <code className="text-xs text-[#FFD700]/80 bg-black/40 px-2 py-1 rounded select-all font-mono">
                                    {page.slug}
                                </code>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                            <div className="flex gap-2">
                                <button onClick={() => setEditingPage(page.id)} className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                    Diseñar
                                </button>
                                <a href={page.slug} target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 text-white/70 hover:text-white px-2 py-1.5 rounded-lg transition-colors flex items-center justify-center tooltip-trigger group/link relative" title="Visitar subpágina">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </a>
                            </div>

                            <button onClick={() => deletePage(page.id)} className="p-1.5 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {pages.length === 0 && (
                <div className="text-center py-12 bg-black/20 rounded-2xl border border-dashed border-white/20">
                    <svg className="mx-auto h-12 w-12 text-white/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="text-sm font-medium text-white">No tienes subpáginas creadas</h3>
                    <p className="mt-1 text-sm text-white/50">Comienza creando tu primera subpágina para que los menús naveguen hacia ellas.</p>
                </div>
            )}
        </div>
    );
};

export default PageManager;
