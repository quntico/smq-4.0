import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '@/context/CMSContext.jsx';
import MenuManager from '@/components/cms/MenuManager.jsx';
import PageManager from '@/components/cms/PageManager.jsx';
import { uploadFile } from '@/lib/storage.js';

const AdminModal = ({ isOpen, onClose }) => {
    const fileInputRef = useRef(null);
    const faviconInputRef = useRef(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [activeTab, setActiveTab] = useState('ajustes');
    const [saveStatus, setSaveStatus] = useState('idle');
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [uploadingFavicon, setUploadingFavicon] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

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
        setIsMinimized(false);
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
        if (fileInputRef.current && !uploadingLogo) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                setUploadingLogo(true);
                // Subir a Supabase usando nuestra función helper
                const url = await uploadFile(file, "media");

                // Actualizar localmente y en el CMS context para usar la URL pública
                localStorage.setItem('siteLogo', url);
                updateSettings({ logoUrl: url });
            } catch (err) {
                console.error("Error al subir archivo a Supabase:", err);
                alert('No se pudo subir la imagen. Verifica tu conexión a Supabase y los permisos del bucket "media".');
            } finally {
                setUploadingLogo(false);
            }
        }
    };

    const handleFaviconUploadClick = () => {
        if (faviconInputRef.current && !uploadingFavicon) {
            faviconInputRef.current.click();
        }
    };

    const handleFaviconChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                setUploadingFavicon(true);
                const url = await uploadFile(file, "media");

                localStorage.setItem('siteFavicon', url);
                updateSettings({ faviconUrl: url });

                // Actualizar Favicon en vivo en el navegador
                const link = document.querySelector("link[rel~='icon']");
                if (link) {
                    link.href = url;
                } else {
                    const newLink = document.createElement('link');
                    newLink.rel = 'icon';
                    newLink.href = url;
                    document.head.appendChild(newLink);
                }
            } catch (err) {
                console.error("Error al subir favicon a Supabase:", err);
                alert('No se pudo subir el icono. Verifica tu conexión.');
            } finally {
                setUploadingFavicon(false);
            }
        }
    };

    const toggleEditorMode = () => {
        setIsEditorMode(!isEditorMode);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={`fixed inset-0 z-[2000] ${isMinimized ? 'pointer-events-none' : 'flex items-center justify-center p-4'}`}>

                    {!isMinimized && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                            onClick={!isAuthenticated ? handleClose : undefined}
                        />
                    )}

                    {!isMinimized ? (
                        <motion.div
                            key="main-modal"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={`relative w-full ${!isAuthenticated ? 'max-w-[420px] bg-black/50 border-t border-l border-white/20 border-b border-r border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_25px_50px_-12px_rgba(0,0,0,1)] min-h-[auto]' : 'max-w-4xl bg-[rgba(10,15,20,0.50)] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[500px]'} backdrop-blur-[30px] rounded-[24px] flex overflow-hidden pointer-events-auto`}
                        >
                            {!isAuthenticated ? (
                                <div className="w-full flex flex-col items-center justify-center p-10 py-12 m-auto">
                                    <div className="flex flex-col items-center w-full">
                                        {/* Shield Icon in Box */}
                                        <div className="w-[72px] h-[72px] rounded-[1.25rem] border-[1.5px] border-[#FFD700]/80 bg-[#151300] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,215,0,0.15)] relative">
                                            <div className="absolute inset-0 bg-[#FFD700]/10 rounded-[1.25rem]"></div>
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                            </svg>
                                        </div>

                                        {/* Titles */}
                                        <h2 className="text-[26px] font-black italic text-white uppercase tracking-wider text-center mb-4 leading-tight">
                                            Acceso de<br />Administrador
                                        </h2>
                                        <p className="text-[#888888] text-[10px] font-bold tracking-[0.2em] uppercase mb-10 text-center">
                                            Ingresa las credenciales de control
                                        </p>

                                        {/* Form */}
                                        <form onSubmit={handleLogin} className="w-full flex flex-col items-center space-y-6">
                                            <div className="w-full relative">
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className={`w-full bg-[#0a0a0a] border-[2px] ${error ? 'border-red-500' : 'border-[#FFD700]'} rounded-full px-6 py-3.5 text-white text-center text-4xl tracking-[0.2em] font-black focus:outline-none focus:ring-4 focus:ring-[#FFD700]/20 transition-all placeholder:text-[#333] placeholder:tracking-normal placeholder:text-sm placeholder:font-normal shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]`}
                                                    autoFocus
                                                />
                                                {error && <p className="absolute -bottom-6 left-0 right-0 text-center text-xs text-red-500 font-medium tracking-wide">Credenciales incorrectas</p>}
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full bg-[#FFD700] hover:bg-[#FFC000] text-white font-black text-[14px] tracking-wider uppercase rounded-xl py-4 transition-all shadow-[0_0_25px_rgba(255,215,0,0.25)] mt-2"
                                                style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.3)" }}
                                            >
                                                Acceder al Panel
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleClose}
                                                className="text-[#666666] hover:text-white font-bold text-[11px] tracking-[0.2em] uppercase mt-4 pb-2 transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                        </form>
                                    </div>
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

                                        <button onClick={toggleEditorMode} className={`mt-auto w-full flex items-center justify-between p-3.5 rounded-xl transition-all ${isEditorMode ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
                                            <div className="flex items-center gap-2">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isEditorMode ? "#60A5FA" : "currentColor"} className={isEditorMode ? "" : "text-white/70"} strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                                <span className={`text-sm font-semibold ${isEditorMode ? 'text-blue-400' : 'text-white/70'}`}>Modo Editor</span>
                                            </div>
                                            {/* Switch Track */}
                                            <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 shadow-inner ${isEditorMode ? 'bg-blue-500' : 'bg-black/50 border border-white/20'}`}>
                                                {/* Switch Thumb */}
                                                <div className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-300 ease-out flex items-center justify-center ${isEditorMode ? 'translate-x-6' : 'translate-x-0'}`}>
                                                </div>
                                            </div>
                                        </button>
                                    </div>

                                    {/* Main Content Area */}
                                    <div className="flex-1 p-8 overflow-y-auto relative">
                                        <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
                                            <button onClick={() => setIsMinimized(true)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white" title="Minimizar para previsualizar">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                            </button>
                                            <button onClick={handleClose} className="p-2 bg-white/5 hover:bg-red-500/20 rounded-full transition-colors text-white/70 hover:text-red-400" title="Cerrar y Salir CMS">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                            </button>
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {activeTab === 'ajustes' && (
                                                <motion.div key="ajustes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 max-w-xl">
                                                    <h3 className="text-xl font-medium text-white mb-6">Ajustes Generales y Marca</h3>

                                                    {/* Subir Logotipo y Favicon */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="w-full">
                                                            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                                                            <button onClick={handleLogoUploadClick} disabled={uploadingLogo} className="w-full h-full group flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-center">
                                                                <div className="p-2 mb-3 bg-purple-500/20 text-purple-400 rounded-lg group-hover:bg-purple-500/30 transition-colors flex items-center justify-center min-w-[40px] min-h-[40px]">
                                                                    {uploadingLogo ? (
                                                                        <div className="w-5 h-5 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
                                                                    ) : (
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                                                    )}
                                                                </div>
                                                                <h3 className="text-white font-medium text-sm">{uploadingLogo ? 'Subiendo...' : 'Subir Logotipo'}</h3>
                                                                <p className="text-white/40 text-xs mt-1">Navbar Superior</p>
                                                            </button>
                                                        </div>

                                                        <div className="w-full">
                                                            <input type="file" accept="image/png, image/jpeg, image/ico, image/svg+xml" className="hidden" ref={faviconInputRef} onChange={handleFaviconChange} />
                                                            <button onClick={handleFaviconUploadClick} disabled={uploadingFavicon} className="w-full h-full group flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-center">
                                                                <div className="p-2 mb-3 bg-blue-500/20 text-blue-400 rounded-lg group-hover:bg-blue-500/30 transition-colors flex items-center justify-center min-w-[40px] min-h-[40px]">
                                                                    {uploadingFavicon ? (
                                                                        <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
                                                                    ) : (
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                                                                    )}
                                                                </div>
                                                                <h3 className="text-white font-medium text-sm">{uploadingFavicon ? 'Subiendo...' : 'Subir Favicon'}</h3>
                                                                <p className="text-white/40 text-xs mt-1">Pestaña Navegador</p>
                                                            </button>
                                                        </div>
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
                    ) : (
                        <motion.div
                            key="minimized-bar"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="fixed bottom-6 right-6 pointer-events-auto bg-[rgba(10,15,20,0.85)] backdrop-blur-md border border-[#FFD700]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl p-4 flex items-center gap-4 z-[2500]"
                        >
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-sm tracking-wide">Panel CMS</span>
                                <span className="text-[#FFD700] text-xs capitalize">Vista previa en vivo</span>
                            </div>
                            <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                                <button onClick={() => setIsMinimized(false)} className="bg-[#FFD700] hover:brightness-110 text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm transition-all shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6"></path><path d="M9 21H3v-6"></path><path d="M21 3l-7 7"></path><path d="M3 21l7-7"></path></svg>
                                    Maximizar
                                </button>
                                <button onClick={handleClose} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors border border-red-500/20" title="Cerrar CMS">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            )}
        </AnimatePresence>
    );
};

export default AdminModal;
