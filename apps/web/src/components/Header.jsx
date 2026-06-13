
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IndustriesMenu from '@/components/IndustriesMenu.jsx';
import SolutionsMenu from '@/components/SolutionsMenu.jsx';
import MachineryMenu from '@/components/MachineryMenu.jsx';
import TechnologyMenu from '@/components/TechnologyMenu.jsx';
import CompanyMenu from '@/components/CompanyMenu.jsx';
import WasteToEnergyMenu from '@/components/WasteToEnergyMenu.jsx';
import AdminModal from '@/components/AdminModal.jsx';
import LanguageSelector from '@/components/LanguageSelector.jsx';
import { useCMS } from '@/context/CMSContext.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';

const componentMap = {
  IndustriesMenu,
  SolutionsMenu,
  MachineryMenu,
  TechnologyMenu,
  WasteToEnergyMenu,
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
  const [isGitPushing, setIsGitPushing] = useState(false);
  const { t } = useLanguage();
  const { logoUrl, logoSize, headerHeight, headerOpacity } = cmsState.settings;
  const timeoutRef = useRef(null);

  const handleGitPush = async () => {
    try {
      setIsGitPushing(true);
      // 1. Guardar cambios en la nube
      await syncToCloud();
      
      // 2. Ejecutar Git Upload local
      const res = await fetch('/api/git-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      
      if (data.success) {
        alert("¡GitHub Sync Exitoso! Tus cambios se han guardado localmente, en la nube y se han subido a GitHub de forma segura.");
      } else {
        alert(`Error al subir a GitHub: ${data.error || 'Inténtalo nuevamente.'}`);
      }
    } catch (err) {
      console.error(err);
      alert(`Error de red o servidor: ${err.message}`);
    } finally {
      setIsGitPushing(false);
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

  const NavItem = ({ id, label, menuName, DropdownComponent }) => {
    const handleBlur = (e) => {
      const val = e.target.innerText;
      const updatedMenus = cmsState.menus.map(menu =>
        menu.id === id ? { ...menu, name: val } : menu
      );
      updateMenus(updatedMenus);
    };

    return (
      <div
        className="relative h-full flex items-center"
        onMouseEnter={() => handleMouseEnter(menuName)}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={(e) => {
            if (!isEditorMode) {
              handleMenuClick(menuName);
            }
          }}
          onDoubleClick={(e) => {
            if (isEditorMode) {
              e.stopPropagation();
              e.preventDefault();
              handleOpenAdmin('menus');
            } else {
              const nameLower = menuName.toLowerCase();
              if (nameLower.includes('industria')) {
                navigate('/industria/reciclaje-y-plasticos');
              } else if (nameLower.includes('solucion')) {
                navigate('/industria/reciclaje-y-plasticos');
              } else if (nameLower.includes('maquinaria')) {
                navigate('/envasadoras');
              } else if (nameLower.includes('waste')) {
                navigate('/waste-to-energy');
              } else if (nameLower.includes('empresa')) {
                navigate('/nosotros');
              }
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
            onClick={(e) => { if (isEditorMode) e.stopPropagation(); }}
            onDoubleClick={(e) => {
              if (isEditorMode) {
                e.stopPropagation();
                e.preventDefault();
                handleOpenAdmin('menus');
              } else {
                const nameLower = menuName.toLowerCase();
                if (nameLower.includes('industria')) {
                  navigate('/industria/reciclaje-y-plasticos');
                } else if (nameLower.includes('solucion')) {
                  navigate('/industria/reciclaje-y-plasticos');
                } else if (nameLower.includes('maquinaria')) {
                  navigate('/envasadoras');
                } else if (nameLower.includes('waste')) {
                  navigate('/waste-to-energy');
                } else if (nameLower.includes('empresa')) {
                  navigate('/nosotros');
                }
              }
            }}
            className={`${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 cursor-text' : ''}`}
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
            onMouseEnter={() => handleMouseEnter(menuName)}
            onMouseLeave={handleMouseLeave}
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
        {/* Left Section: Logo & Version */}
        <div className="relative flex items-center h-full ml-[114px]">
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
                {cmsState.settings.appVersion ? cmsState.settings.appVersion.toUpperCase() : "VER 5.3"}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center h-full gap-[40px]">
          {cmsState.menus.sort((a, b) => a.order - b.order).map(menu => {
            const transKey = menu.componentName.replace('Menu', '').toLowerCase();
            return (
              <NavItem
                key={menu.id}
                id={menu.id}
                label={t(`header.${transKey}`) !== `header.${transKey}` ? t(`header.${transKey}`) : menu.name}
                menuName={menu.name.toLowerCase()}
                DropdownComponent={componentMap[menu.componentName]}
              />
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Sync Buttons (Only visible in Editor Mode to manually pull/push production data) */}
          {isEditorMode && (
            <div className="flex gap-2">
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
                onClick={handleGitPush}
                disabled={isGitPushing}
                className={`flex items-center gap-1.5 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full px-3 py-1.5 hover:bg-purple-500/30 hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider shadow-lg ${
                  isGitPushing ? 'animate-pulse cursor-not-allowed' : ''
                }`}
                title="Guardar en memoria/nube y subir todos los cambios de diseño y código a GitHub"
              >
                {isGitPushing ? (
                  <div className="w-3 h-3 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                )}
                {isGitPushing ? 'Subiendo...' : 'Git Push'}
              </button>

              <button
                onClick={() => {
                  syncToCloud().then(() => alert(`¡Deploy Exitoso! La nube ha sido actualizada como versión ${cmsState.settings.appVersion || 'oficial'}.`));
                }}
                className="flex items-center gap-1.5 bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40 rounded-full px-4 py-1.5 hover:bg-[#FFD700]/40 hover:text-white transition-all text-[11px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(255,215,0,0.4)] animate-pulse hover:animate-none"
                title="Lanzar este Diseño como la nueva versión de Producción"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13.5 10.5L21 3"></path>
                  <polygon points="12 22 17 14 22 19 22 2 5 2 10 7 2 12 12 22"></polygon>
                </svg>
                Deploy
              </button>
            </div>
          )}

          <LanguageSelector />

          <button
            onClick={() => {
              if (isEditorMode) {
                // Apagado instantáneo sin pedir password ni abrir modal
                setIsEditorMode(false);
              } else {
                handleOpenAdmin('ajustes');
              }
            }}
            className={`transition-colors p-2 rounded-full hover:bg-white/5 ${isEditorMode ? 'text-blue-400 bg-blue-400/10 shadow-[0_0_15px_rgba(96,165,250,0.5)] animate-pulse' : 'text-white/70 hover:text-[#FFD700]'
              }`}
            title={isEditorMode ? 'Desactivar Modo Editor' : 'Panel de Administración'}
          >
            {isEditorMode ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            )}
          </button>
        </div>
      </header>
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} defaultTab={adminTab} />
    </>
  );
};

export default Header;
