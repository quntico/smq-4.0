import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '@/context/CMSContext.jsx';
import MenuManager from '@/components/cms/MenuManager.jsx';
import PageManager from '@/components/cms/PageManager.jsx';

const AdminModal = ({ isOpen, onClose }) => {
    const fileInputRef = useRef(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [activeTab, setActiveTab] = useState('ajustes');
    const [saveStatus, setSaveStatus] = useState('idle');

    const { cmsState, updateSettings, isEditorMode, setIsEditorMode } = useCMS();
    const { logoSize, headerHeight, headerOpacity } = cmsState.settings;

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === '2020') {
            setIsAuthenticated(true);
            setError(false);
            setPassword('');
        } else if (password === '2021') {
            setError(false);
            setPassword('');
            setIsEditorMode(true);
            onClose(); // Cierra el modal, pero la sesión de editor queda en background
        } else {
            setError(true);
        }
    };

    const handleClose = () => {
        setIsAuthenticated(false);
        setPassword('');
        setError(false);
        setSaveStatus('idle');
        onClose();
    };

    const handleSaveAll = () => {
        setSaveStatus('saving');
        // El auto-guardado ya ocurre en el Contexto vía useEffect,
        // pero damos una confirmación visual al usuario.
        setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 3000);
        }, 800);
    };

    const handleLogoSizeChange = (e) => {
        updateSettings({ logoSize: Number(e.target.value) });
    };

    const handleHeaderHeightChange = (e) => {
        updateSettings({ headerHeight: Number(e.target.value) });
    };

    const handleHeaderOpacityChange = (e) => {
        updateSettings({ headerOpacity: Number(e.target.value) });
    };

    const handleLogoUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                try {
                    localStorage.setItem('siteLogo', base64String); // Keep localStorage string for large images until we add full JSON support avoiding huge quota. But we notify CMS:
                    updateSettings({ logoUrl: base64String });
                } catch (err) {
                    alert('El logo es muy grande para guardarse en la memoria del navegador. Por favor sube una imagen optimizada (menor a 2MB).');
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleEditorMode = () => {
        setIsEditorMode(!isEditorMode);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-[rgba(10,15,20,0.50)] backdrop-blur-[30px] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl flex overflow-hidden min-h-[500px]"
                    >
                        {!isAuthenticated ? (
                            <div className="p-10 w-full max-w-md mx-auto my-auto">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-2xl font-bold text-white">Acceso Administrador</h2>
                                    <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded-full transition-colors" title="Cerrar">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/70 hover:text-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>
                                <form onSubmit={handleLogin} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-2">Contraseña de Administrador</label>
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors" placeholder="••••" autoFocus />
                                        {error && <p className="mt-2 text-sm text-red-400">Contraseña incorrecta. Inténtalo de nuevo.</p>}
                                    </div>
                                    <button type="submit" className="w-full bg-[#FFD700] text-black font-semibold rounded-lg py-3 hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,215,0,0.2)]">Ingresar</button>
                                </form>
                            </div>
                        ) : (
                            <div className="flex w-full">
                                {/* Sidebar Panel */}
                                <div className="w-64 bg-black/40 border-r border-white/10 p-6 flex flex-col">
                                    <h2 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">Panel CMS</h2>
                                    <nav className="flex flex-col gap-2 flex-grow">
                                        <button onClick={() => setActiveTab('ajustes')} className={`text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'ajustes' ? 'bg-[#FFD700]/20 text-[#FFD700] font-medium' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>⚙️ Ajustes de Marca</button>
                                        <button onClick={() => setActiveTab('menus')} className={`text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'menus' ? 'bg-[#FFD700]/20 text-[#FFD700] font-medium' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>📋 Admin de Menús</button>
                                        <button onClick={() => setActiveTab('paginas')} className={`text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'paginas' ? 'bg-[#FFD700]/20 text-[#FFD700] font-medium' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>📄 Admin de Páginas</button>
                                    </nav>

                                    <button onClick={toggleEditorMode} className={`mt-auto w-full group flex items-center justify-between border p-3 rounded-lg transition-all ${isEditorMode ? 'bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30 text-blue-300' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70'}`}>
                                        <span className="text-sm font-medium">{isEditorMode ? 'Editor Activo' : 'Editor Visual'}</span>
                                        {isEditorMode ? (
                                            <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse"></div>
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                        )}
                                    </button>
                                </div>

                                {/* Main Content Area */}
                                <div className="flex-1 p-8 overflow-y-auto relative">
                                    <button onClick={handleClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>

                                    <AnimatePresence mode="wait">
                                        {activeTab === 'ajustes' && (
                                            <motion.div key="ajustes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 max-w-xl">
                                                <h3 className="text-xl font-medium text-white mb-6">Ajustes Generales y Marca</h3>

                                                {/* Subir Logotipo */}
                                                <div>
                                                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                                                    <button onClick={handleLogoUploadClick} className="w-full group flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl transition-all">
                                                        <div className="flex items-center gap-4">
                                                            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                                            </div>
                                                            <div className="text-left">
                                                                <h3 className="text-white font-medium">Subir Logotipo</h3>
                                                                <p className="text-white/50 text-sm">Cambia la imagen de la marca</p>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>

                                                {/* Control de tamaño de logo */}
                                                <div className="bg-white/5 border border-white/10 p-4 rounded-xl mt-4">
                                                    <div className="flex justify-between text-white mb-2">
                                                        <label className="font-medium text-sm">Tamaño del Logotipo</label>
                                                        <span className="text-[#FFD700] font-bold text-sm">{logoSize}px</span>
                                                    </div>
                                                    <input type="range" min="30" max="150" value={logoSize} onChange={handleLogoSizeChange} className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FFD700]" />
                                                    <div className="flex justify-between text-white/50 text-xs mt-1">
                                                        <span>Pequeño</span>
                                                        <span>Grande</span>
                                                    </div>
                                                </div>

                                                {/* Control de altura del Header */}
                                                <div className="bg-white/5 border border-white/10 p-4 rounded-xl mt-4">
                                                    <div className="flex justify-between text-white mb-2">
                                                        <label className="font-medium text-sm">Altura del Encabezado</label>
                                                        <span className="text-[#FFD700] font-bold text-sm">{headerHeight}px</span>
                                                    </div>
                                                    <input type="range" min="60" max="200" value={headerHeight} onChange={handleHeaderHeightChange} className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FFD700]" />
                                                    <div className="flex justify-between text-white/50 text-xs mt-1">
                                                        <span>Menos (60px)</span>
                                                        <span>Más (200px)</span>
                                                    </div>
                                                </div>

                                                {/* Control de opacidad del Header */}
                                                <div className="bg-white/5 border border-white/10 p-4 rounded-xl mt-4">
                                                    <div className="flex justify-between text-white mb-2">
                                                        <label className="font-medium text-sm">Opacidad del Fondo</label>
                                                        <span className="text-[#FFD700] font-bold text-sm">{headerOpacity}%</span>
                                                    </div>
                                                    <input type="range" min="0" max="100" value={headerOpacity} onChange={handleHeaderOpacityChange} className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FFD700]" />
                                                    <div className="flex justify-between text-white/50 text-xs mt-1">
                                                        <span>Transparente</span>
                                                        <span>Sólido</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {activeTab === 'menus' && (
                                            <motion.div key="menus" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                                <MenuManager />
                                            </motion.div>
                                        )}

                                        {activeTab === 'paginas' && (
                                            <motion.div key="paginas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                                <PageManager />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Action Buttons Footer */}
                                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                                        <p className="text-white/50 text-sm">Los cambios se aplican y guardan en tiempo real.</p>
                                        <button
                                            onClick={handleSaveAll}
                                            disabled={saveStatus === 'saving'}
                                            className={`px-6 py-2 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(255,215,0,0.1)] flex items-center gap-2 ${saveStatus === 'saved'
                                                    ? 'bg-green-500 text-white shadow-green-500/20'
                                                    : 'bg-[#FFD700] text-black hover:brightness-110'
                                                }`}
                                        >
                                            {saveStatus === 'idle' && 'Guardar Cambios'}
                                            {saveStatus === 'saving' && (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                                    Guardando...
                                                </>
                                            )}
                                            {saveStatus === 'saved' && (
                                                <>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    ¡Guardado Exitosamente!
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AdminModal;
