
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IndustriesMenu from '@/components/IndustriesMenu.jsx';
import SolutionsMenu from '@/components/SolutionsMenu.jsx';
import MachineryMenu from '@/components/MachineryMenu.jsx';
import TechnologyMenu from '@/components/TechnologyMenu.jsx';
import CompanyMenu from '@/components/CompanyMenu.jsx';
import AdminModal from '@/components/AdminModal.jsx';
import { useCMS } from '@/context/CMSContext.jsx';

const componentMap = {
  IndustriesMenu,
  SolutionsMenu,
  MachineryMenu,
  TechnologyMenu,
  CompanyMenu,
};

const Header = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const { cmsState, isEditorMode, setIsEditorMode, updateMenus } = useCMS();
  const { logoUrl, logoSize, headerHeight, headerOpacity } = cmsState.settings;
  const timeoutRef = useRef(null);

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
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 250);
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
          className={`text-[15px] transition-all duration-200 relative py-2 ${activeMenu === menuName
            ? 'text-[#FFD700] font-[600]'
            : 'text-white hover:text-[#FFD700] hover:font-[600] font-medium'
            }`}
        >
          <span
            contentEditable={isEditorMode}
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            className={`${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 cursor-text' : ''}`}
          >
            {label}
          </span>
          {/* Active Indicator */}
          <span
            className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#FFD700] transition-transform duration-300 origin-left ${activeMenu === menuName ? 'scale-x-100' : 'scale-x-0'
              }`}
          />
        </button>

        {DropdownComponent && (
          <DropdownComponent
            isOpen={activeMenu === menuName}
            onMouseEnter={() => handleMouseEnter(menuName)}
            onMouseLeave={handleMouseLeave}
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
        <div className="flex items-center gap-8 ml-[114px]">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="focus:outline-none flex items-center select-none"
            aria-label="Go to home"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo SMQ"
                className="object-contain transition-all duration-300"
                style={{ maxHeight: `${logoSize}px` }}
              />
            ) : (
              <span
                className="text-white font-bold tracking-wider transition-all duration-300"
                style={{ fontSize: `${logoSize * 0.5}px` }}
              >
                SMQ
              </span>
            )}
          </button>

          {/* Admin Version Button */}
          <button
            onClick={() => setIsAdminOpen(true)}
            title="Abrir Panel de Administrador"
            className="flex items-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-full px-4 py-1.5 hover:bg-[#151515] transition-all shadow-[inset_0_1px_3px_rgba(255,255,255,0.05),_0_0_10px_rgba(0,0,0,0.5)] cursor-pointer group"
          >
            {/* LED Indicator */}
            <div className="relative flex items-center justify-center w-3 h-3">
              <div className="absolute w-full h-full bg-[#39FF14] rounded-full animate-ping opacity-60 group-hover:opacity-100"></div>
              <div className="relative w-2.5 h-2.5 bg-[#39FF14] rounded-full shadow-[0_0_10px_#39FF14]"></div>
            </div>
            {/* Text */}
            <span className="text-white font-black text-[12px] tracking-[0.2em] uppercase mt-[1px]">
              Ver 5.1
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center h-full gap-[40px]">
          {cmsState.menus.sort((a, b) => a.order - b.order).map(menu => (
            <NavItem
              key={menu.id}
              id={menu.id}
              label={menu.name}
              menuName={menu.name.toLowerCase()}
              DropdownComponent={componentMap[menu.componentName]}
            />
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => {
              if (isEditorMode) {
                // Apagado instantáneo sin pedir password ni abrir modal
                setIsEditorMode(false);
              } else {
                setIsAdminOpen(true);
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
          <a
            href="#cotizar"
            className="inline-block bg-[#FFD700] text-[#000000] font-[600] text-[15px] py-[12px] px-[24px] rounded-[8px] transition-all duration-200 hover:brightness-115 shadow-[0_0_15px_rgba(255,215,0,0.3)]"
          >
            Cotizar
          </a>
        </div>
      </header>
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </>
  );
};

export default Header;
