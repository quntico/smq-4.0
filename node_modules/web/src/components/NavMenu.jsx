
import React, { useState, useRef, useEffect } from 'react';
import MegaMenuSolutions from '@/components/MegaMenuSolutions.jsx';
import MegaMenuIndustries from '@/components/MegaMenuIndustries.jsx';
import DropdownMenu from '@/components/DropdownMenu.jsx';
import { ChevronDown } from 'lucide-react';

const NavMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navRef = useRef(null);

  const maquinariaItems = ['Extrusoras', 'Trituradores', 'Pelletizado', 'Líneas de lavado', 'Equipos para chocolate', 'Empaque industrial'];
  const tecnologiaItems = ['Ingeniería Industrial', 'Automatización PLC', 'Sistemas Inteligentes SCR', 'Monitoreo Remoto IoT'];
  const recursosItems = ['Catálogos', 'Brochures', 'Fichas técnicas', 'White papers', 'Videos técnicos'];
  const nosotrosItems = ['Quiénes somos', 'Ingeniería SMQ', 'Equipo', 'Certificaciones'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (menu) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    // We don't close immediately to allow moving to the dropdown
  };

  const closeMenu = () => setActiveMenu(null);

  const NavItem = ({ label, hasDropdown, menuName, href }) => (
    <div 
      className="relative h-full flex items-center"
      onMouseEnter={() => hasDropdown && handleMouseEnter(menuName)}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={href || `#${label.toLowerCase()}`}
        className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 px-2 py-2 ${
          activeMenu === menuName ? 'text-[#0A84FF]' : 'text-white hover:text-[#0A84FF]'
        }`}
        onClick={(e) => {
          if (!hasDropdown) closeMenu();
        }}
      >
        {label}
        {hasDropdown && <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === menuName ? 'rotate-180' : ''}`} />}
      </a>
      
      {menuName === 'soluciones' && <MegaMenuSolutions isOpen={activeMenu === 'soluciones'} onClose={closeMenu} />}
      {menuName === 'industrias' && <MegaMenuIndustries isOpen={activeMenu === 'industrias'} onClose={closeMenu} />}
      {menuName === 'maquinaria' && <DropdownMenu isOpen={activeMenu === 'maquinaria'} items={maquinariaItems} onClose={closeMenu} />}
      {menuName === 'tecnologia' && <DropdownMenu isOpen={activeMenu === 'tecnologia'} items={tecnologiaItems} onClose={closeMenu} />}
      {menuName === 'recursos' && <DropdownMenu isOpen={activeMenu === 'recursos'} items={recursosItems} onClose={closeMenu} />}
      {menuName === 'nosotros' && <DropdownMenu isOpen={activeMenu === 'nosotros'} items={nosotrosItems} onClose={closeMenu} />}
    </div>
  );

  return (
    <nav ref={navRef} className="hidden lg:flex items-center h-full space-x-1 xl:space-x-4">
      <NavItem label="Inicio" href="#inicio" />
      <NavItem label="Soluciones" hasDropdown menuName="soluciones" />
      <NavItem label="Industrias" hasDropdown menuName="industrias" />
      <NavItem label="Maquinaria" hasDropdown menuName="maquinaria" />
      <NavItem label="Tecnología" hasDropdown menuName="tecnologia" />
      <NavItem label="Proyectos" />
      <NavItem label="Recursos" hasDropdown menuName="recursos" />
      <NavItem label="Nosotros" hasDropdown menuName="nosotros" />
      <NavItem label="Contacto" />
    </nav>
  );
};

export default NavMenu;
