
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IndustriesMenu from '@/components/IndustriesMenu.jsx';
import MachineryMenu from '@/components/MachineryMenu.jsx';
import TechnologyMenu from '@/components/TechnologyMenu.jsx';
import CompanyMenu from '@/components/CompanyMenu.jsx';
import WasteToEnergyMenu from '@/components/WasteToEnergyMenu.jsx';
import ProjectsMenu from '@/components/ProjectsMenu.jsx';
import AdminModal from '@/components/AdminModal.jsx';
import LanguageSelector from '@/components/LanguageSelector.jsx';
import { useCMS } from '@/context/CMSContext.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';
import MobileMenu from '@/components/MobileMenu.jsx';
import SmartSearch from '@/components/SmartSearch.jsx';
import TrainAIModal from '@/components/TrainAIModal.jsx';
import { Menu, Eye, EyeOff, Brain, Unlock, Lock } from 'lucide-react';

const componentMap = {
  IndustriesMenu,
  MachineryMenu,
  TechnologyMenu,
  WasteToEnergyMenu,
  ProjectsMenu,
  CompanyMenu,
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [lockedMenu, setLockedMenu] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminTab, setAdminTab] = useState('ajustes');
  const { cmsState, isEditorMode, setIsEditorMode, updateMenus, syncFromCloud, syncToCloud, updateSettings } = useCMS();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTrainModalOpen, setIsTrainModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const { t } = useLanguage();
  const { logoUrl, logoSize, headerHeight, headerOpacity } = cmsState.settings;
  const timeoutRef = useRef(null);

  const handleUnifiedPublish = async () => {
    try {
      setIsPublishing(true);
      // 1. Guardar cambios en la nube (Supabase)
      await syncToCloud();
      
      // Detectar si estamos en LocalHost o en Producción
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isLocal) {
        // 2. Sincronizar repositorio local y GitHub (solo en LocalHost)
        try {
          const res = await fetch('/api/git-upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cmsState })
          });
          const text = await res.text();
          if (text) {
            const data = JSON.parse(text);
            if (data.success) {
              alert("¡Guardado y Sincronización Exitosos! Tus cambios se han guardado en la nube (Supabase) y sincronizado con el código local/GitHub.");
            } else {
              alert(`Guardado en la nube de Supabase, pero hubo un detalle al sincronizar con GitHub: ${data.error || 'Inténtalo nuevamente.'}`);
            }
          } else {
            alert("¡Guardado Exitoso! Los cambios se subieron a la nube (Supabase), pero el servidor local no devolvió respuesta para la sincronización git.");
          }
        } catch (gitErr) {
          console.error("Error al sincronizar con git:", gitErr);
          alert(`Guardado en la nube de Supabase, pero no se pudo sincronizar localmente con git: ${gitErr.message}`);
        }
      } else {
        // En Producción (Vercel)
        alert("¡Guardado y Publicación Exitosos! Tus cambios se han guardado permanentemente en la nube (Supabase) y están en vivo para todos los visitantes.");
      }
    } catch (err) {
      console.error(err);
      alert(`Error de red al guardar y publicar: ${err.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleOpenAdmin = (tab = 'ajustes') => {
    setAdminTab(tab);
    setIsAdminOpen(true);
  };

  useEffect(() => {
    setActiveMenu(null);
    setLockedMenu(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLockedMenu(null);
        setActiveMenu(null);
      }
    };
    const handleClickOutside = (e) => {
      if (!e.target.closest('header')) {
        setLockedMenu(null);
        setActiveMenu(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Escuchar el evento del CMS o local
    const handleEditorChange = () => {
      // El contexto ya maneja el estado isEditorMode
    };

    window.addEventListener('editorModeChangedGlobal', handleEditorChange);
    return () => window.removeEventListener('editorModeChangedGlobal', handleEditorChange);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (lockedMenu) {
        setActiveMenu(lockedMenu);
      } else {
        setActiveMenu(null);
      }
    }, 320);
  };

  const handleMenuClick = (menu) => {
    if (lockedMenu === menu) {
      setLockedMenu(null);
      setActiveMenu(null);
    } else {
      setLockedMenu(menu);
      setActiveMenu(menu);
    }
  };

  const NavItem = ({ id, label, menuName, componentName, DropdownComponent, isHidden }) => {
    const handleBlur = (e) => {
      const val = e.target.innerText;
      const updatedMenus = cmsState.menus.map(menu =>
        menu.id === id ? { ...menu, name: val } : menu
      );
      updateMenus(updatedMenus);
    };

    const toggleVisibility = (e) => {
      e.stopPropagation();
      e.preventDefault();
      const updatedMenus = cmsState.menus.map(menu =>
        menu.id === id ? { ...menu, isHidden: !menu.isHidden } : menu
      );
      updateMenus(updatedMenus);
    };

    return (
      <div
        className={`relative h-full flex items-center ${isHidden ? 'opacity-40 grayscale' : ''}`}
      >
        {isEditorMode && (
          <button
            onClick={toggleVisibility}
            className="absolute top-[28%] right-[-14px] text-gray-400 hover:text-white transition-colors z-50 bg-black/60 rounded-full p-1"
            title={isHidden ? "Mostrar Menú" : "Ocultar Menú"}
          >
            {isHidden ? <EyeOff size={12} /> : <Eye size={12} />}
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isEditorMode) {
              if (activeMenu === menuName || lockedMenu === menuName) {
                // If already open, navigate to the section
                if (componentName === 'IndustriesMenu' || componentName === 'SolutionsMenu' || id === '2' || id === '3' || menuName.includes('industr') || menuName.includes('soluc')) {
                  navigate('/industria/reciclaje-y-plasticos');
                } else if (componentName === 'MachineryMenu' || id === '4' || menuName.includes('maquin')) {
                  navigate('/envasadoras');
                } else if (componentName === 'WasteToEnergyMenu' || id === '6' || menuName.includes('waste') || menuName.includes('valoriz') || menuName.includes('wte') || menuName.includes('wt')) {
                  navigate('/waste-to-energy');
                } else if (componentName === 'ProjectsMenu' || id === '7' || menuName.includes('proy')) {
                  navigate('/proyectos');
                } else if (componentName === 'CompanyMenu' || id === '5' || menuName.includes('empr') || menuName.includes('nosot')) {
                  navigate('/nosotros');
                }
                setLockedMenu(null);
                setActiveMenu(null);
              } else {
                // If closed, open the menu
                handleMenuClick(menuName);
              }
            }
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            if (isEditorMode) {
              e.preventDefault();
              handleOpenAdmin('menus');
            }
          }}
          className={`text-[15px] transition-all duration-200 relative py-2 ${(activeMenu === menuName || lockedMenu === menuName)
            ? 'text-[#FFD700] font-[600]'
            : 'text-white hover:text-[#FFD700] hover:font-[600] font-medium'
            }`}
        >
          <span
            contentEditable={isEditorMode}
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            onClick={(e) => { 
              e.stopPropagation(); 
              if (!isEditorMode) {
                if (activeMenu === menuName || lockedMenu === menuName) {
                  if (componentName === 'IndustriesMenu' || menuName.includes('industr')) {
                    navigate('/industria/reciclaje-y-plasticos');
                  } else if (componentName === 'TechnologyMenu' || menuName.includes('tecnol') || menuName.includes('soluc')) {
                    navigate('/tecnologia/ia');
                  } else if (componentName === 'MachineryMenu' || menuName.includes('maquin')) {
                    navigate('/envasadoras');
                  } else if (componentName === 'WasteToEnergyMenu' || menuName.includes('waste') || menuName.includes('valoriz') || menuName.includes('wte') || menuName.includes('wt')) {
                    navigate('/waste-to-energy');
                  } else if (componentName === 'ProjectsMenu' || menuName.includes('proy')) {
                    navigate('/proyectos');
                  } else if (componentName === 'CompanyMenu' || menuName.includes('empr') || menuName.includes('nosot')) {
                    navigate('/nosotros');
                  }
                  setLockedMenu(null);
                  setActiveMenu(null);
                } else {
                  handleMenuClick(menuName);
                }
              }
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              if (isEditorMode) {
                e.preventDefault();
                handleOpenAdmin('menus');
              }
            }}
            className={`${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 cursor-text' : ''} select-none`}
          >
            {label}
          </span>
          {/* Active Indicator */}
          <span
            className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#FFD700] transition-transform duration-300 origin-left ${(activeMenu === menuName || lockedMenu === menuName) ? 'scale-x-100' : 'scale-x-0'
              }`}
          />
        </button>

        {DropdownComponent && (
          <DropdownComponent
            isOpen={activeMenu === menuName || lockedMenu === menuName}
            onClose={() => {
              setActiveMenu(null);
              setLockedMenu(null);
            }}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[1000] backdrop-blur-[30px] px-[40px] flex items-center justify-between border-b border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] font-['Poppins'] transition-all duration-300"
        style={{
          height: `${headerHeight}px`,
          backgroundColor: `rgba(10, 15, 20, ${headerOpacity / 100})`
        }}
      >
        {/* Admin Toggle Padlock (Far Left - SOLO EN MODO EDITOR) */}
        {isEditorMode && (
          <div className="absolute left-[50px] hidden lg:flex items-center z-[1001]">
            <button
              onClick={() => setIsEditorMode(false)}
              className="shrink-0 flex items-center justify-center transition-colors p-2 rounded-full hover:bg-white/5 text-[#F5C400] bg-[#F5C400]/10 shadow-[0_0_15px_rgba(245,196,0,0.5)] animate-pulse"
              title="Cerrar Modo Editor"
            >
              <Unlock size={20} />
            </button>
          </div>
        )}

        {/* Left Section: Logo & Version */}
        <div className="relative flex items-center h-full lg:ml-[114px] ml-0">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <button
              onClick={handleLogoClick}
              className="focus:outline-none flex items-center select-none"
              aria-label="Go to home"
              style={{ height: `${logoSize * 1.2}px` }}
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Logo SMQ"
                  className="object-contain transition-all duration-300"
                  style={{ maxHeight: `${logoSize * 1.2}px` }}
                />
              ) : (
                <span
                  className="text-white font-bold tracking-wider transition-all duration-300"
                  style={{ fontSize: `${(logoSize * 1.2) * 0.5}px` }}
                >
                  SMQ
                </span>
              )}
            </button>

            {/* Admin Version Button - Posicionado en línea con el logo */}
            <button
              onClick={() => handleOpenAdmin('ajustes')}
              title="Abrir Panel de Administrador"
              className="flex items-center gap-1.5 bg-[#0a0a0a] border border-white/10 rounded-full px-2 py-0.5 hover:bg-[#151515] transition-all shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),_0_0_8px_rgba(0,0,0,0.5)] cursor-pointer group"
            >
              {/* LED Indicator */}
              <div className="relative flex items-center justify-center w-2 h-2">
                <div className="absolute w-full h-full bg-[#39FF14] rounded-full animate-ping opacity-60 group-hover:opacity-100"></div>
                <div className="relative w-1.5 h-1.5 bg-[#39FF14] rounded-full shadow-[0_0_6px_#39FF14]"></div>
              </div>
              {/* Text */}
              <span
                className={`text-white font-black text-[8px] tracking-[0.15em] uppercase mt-[0.5px] ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 cursor-text px-1' : ''}`}
                contentEditable={isEditorMode}
                suppressContentEditableWarning={true}
                onClick={(e) => { if (isEditorMode) e.stopPropagation(); }}
                onBlur={(e) => {
                  const newVersion = e.target.innerText;
                  updateSettings({ appVersion: newVersion });
                }}
              >
                {cmsState.settings.appVersion ? cmsState.settings.appVersion.toUpperCase() : "VER 7.30"}
              </span>
            </button>

          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center h-full gap-[40px]">
          {cmsState.menus.sort((a, b) => a.order - b.order).map(menu => {
            if (!isEditorMode && menu.isHidden) return null;
            const transKey = menu.componentName.replace('Menu', '').toLowerCase();
            return (
              <NavItem
                key={menu.id}
                id={menu.id}
                label={t(`header.${transKey}`) !== `header.${transKey}` ? t(`header.${transKey}`) : menu.name}
                menuName={menu.name.toLowerCase()}
                componentName={menu.componentName}
                DropdownComponent={componentMap[menu.componentName]}
                isHidden={menu.isHidden}
              />
            );
          })}
          
          {/* Contacto menu item */}
          <button
            onClick={() => navigate('/contacto')}
            className={`text-[15px] transition-all duration-200 relative py-2 ${
              location.pathname === '/contacto'
                ? 'text-[#FFD700] font-[600]'
                : 'text-white hover:text-[#FFD700] hover:font-[600] font-medium'
            }`}
          >
            <span>{t('header.contacto')}</span>
            <span
              className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#FFD700] transition-transform duration-300 origin-left ${
                location.pathname === '/contacto' ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Sync Buttons (Only visible in Editor Mode to manually pull/push production data) */}
          {isEditorMode && (
            <div className="flex gap-2">
              <button
                onClick={() => handleOpenAdmin('ajustes')}
                className="flex items-center gap-1.5 bg-purple-500/20 text-purple-400 border border-purple-500/40 rounded-full px-3 py-1.5 hover:bg-purple-500/40 hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                title="Abrir Panel CMS y Ajustes"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
                </svg>
                Panel CMS
              </button>

              <button
                onClick={() => setIsTrainModalOpen(true)}
                className="flex items-center gap-1.5 bg-[#F5C400]/20 text-[#F5C400] border border-[#F5C400]/40 rounded-full px-3 py-1.5 hover:bg-[#F5C400]/40 hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                title="Entrenar Inteligencia Artificial con PDFs"
              >
                <Brain size={12} />
                Entrenar IA
              </button>
              
              <button
                onClick={() => {
                  syncFromCloud().then(() => alert("Descarga de la Nube Completa. Tu pantalla se ha actualizado."));
                }}
                className="flex items-center gap-1.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full px-3 py-1.5 hover:bg-blue-500/30 hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider shadow-lg"
                title="Descargar Diseño de Producción a Local"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Bajar
              </button>

              <button
                onClick={handleUnifiedPublish}
                disabled={isPublishing}
                className={`flex items-center gap-1.5 bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40 rounded-full px-4 py-1.5 hover:bg-[#FFD700]/40 hover:text-white transition-all text-[11px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(255,215,0,0.4)] ${
                  isPublishing ? 'animate-pulse cursor-not-allowed' : ''
                }`}
                title="Guardar todos los cambios en la nube y subirlos a GitHub"
              >
                {isPublishing ? (
                  <div className="w-3.5 h-3.5 border-2 border-[#FFD700]/30 border-t-[#FFD700] rounded-full animate-spin"></div>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.3-2-1.9-3.6-3.9-3.9C16.5 3.5 12.5 3.5 11 7 9 6.5 7 7.5 6 9c-2 1-3 3-2.5 5.5.3 1.5 1.5 2.5 3 2.5h11c1.8 0 3.3-1.2 3.7-2.8z"></path>
                    <polyline points="16 16 12 12 8 16"></polyline>
                    <line x1="12" y1="12" x2="12" y2="21"></line>
                  </svg>
                )}
                {isPublishing ? 'Publicando...' : 'Guardar y Publicar'}
              </button>
            </div>
          )}

          <SmartSearch />
          <LanguageSelector />
          
          {/* Admin Toggle Padlock (Lado Derecho - MODO NORMAL) */}
          {!isEditorMode && (
            <button
              onClick={() => handleOpenAdmin('ajustes')}
              className="shrink-0 flex items-center justify-center transition-colors p-2 rounded-full text-white/70 hover:text-[#FFD700] hover:bg-white/5"
              title="Panel de Administración"
            >
              <Lock size={20} />
            </button>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex lg:hidden items-center gap-3">
          <SmartSearch />
          <LanguageSelector />
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white hover:text-[#FFD700] transition-colors p-2 rounded-full hover:bg-white/5"
            aria-label="Abrir menú de navegación"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} defaultTab={adminTab} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <TrainAIModal isOpen={isTrainModalOpen} onClose={() => setIsTrainModalOpen(false)} />
    </>
  );
};

export default Header;
