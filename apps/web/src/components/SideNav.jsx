import React, { useState, useEffect } from 'react';
import { Home, Building2, Settings, Box, Briefcase, Mail, ChevronRight } from 'lucide-react';

const SideNav = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');

    const menuItems = [
        { 
            id: 'inicio', 
            label: 'Inicio', 
            icon: Home,
            submenus: [
                { id: 'nosotros', label: 'Misión y Valores' },
                { id: 'historia-seccion', label: 'Nuestra Historia' },
                { id: 'inicio', label: 'Core Tecnológico' }
            ]
        },
        { 
            id: 'industrias', 
            label: 'Industrias', 
            icon: Building2,
            submenus: [
                { id: 'industrias', label: 'Alimentos y Bebidas', path: '/industrias/alimentos' },
                { id: 'industrias', label: 'Reciclaje Plástico', path: '/industrias/reciclaje' },
                { id: 'industrias', label: 'Petróleo y Gas', path: '/industrias/petroleo' }
            ]
        },
        { 
            id: 'maquinaria', 
            label: 'Maquinaria', 
            icon: Settings,
            submenus: [
                { id: 'maquinaria', label: 'Sistemas EPC' },
                { id: 'maquinaria', label: 'Líneas de Producción' },
                { id: 'maquinaria', label: 'Catálogo de Equipos', path: '/maquinaria' }
            ]
        },
        { 
            id: 'visualizador', 
            label: 'Visualizador 3D', 
            icon: Box,
            submenus: [
                { id: 'visualizador', label: 'Planta Interactiva' },
                { id: 'visualizador', label: 'Modelos Holográficos' }
            ]
        },
        { 
            id: 'proyectos', 
            label: 'Proyectos', 
            icon: Briefcase,
            submenus: [
                { id: 'proyectos', label: 'Casos de Éxito' },
                { id: 'proyectos', label: 'Galería de Instalaciones' }
            ]
        },
        { 
            id: 'contacto', 
            label: 'Contacto', 
            icon: Mail,
            submenus: [
                { id: 'contacto', label: 'Oficinas Globales' },
                { id: 'contacto', label: 'Formulario de Soporte' }
            ]
        },
    ];

    // Optional: Update active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const item of menuItems.slice().reverse()) {
                const element = document.getElementById(item.id);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(item.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setActiveSection(id);
        } else if (id.startsWith('/')) {
            window.location.href = id;
        }
    };

    return (
        <div
            className="fixed left-0 top-1/2 -translate-y-1/2 z-[990] hidden md:flex"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`flex flex-col gap-2 py-4 px-2 rounded-r-2xl transition-all duration-300 ease-in-out border-y border-r border-[#FFD700]/10 shadow-[4px_0_24px_rgba(0,0,0,0.5)] ${isHovered
                    ? 'bg-[#0A0F14]/90 backdrop-blur-md translate-x-0'
                    : 'bg-[#0A0F14]/30 backdrop-blur-sm -translate-x-[2px]'
                    }`}
            >
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                        <div key={item.id} className="relative group/navitem flex flex-col">
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => handleClick(e, item.id)}
                                className={`relative flex items-center h-10 px-2 rounded-xl transition-all duration-300 overflow-hidden cursor-pointer ${isActive
                                    ? 'bg-white/10 text-[#FFD700]'
                                    : 'text-white/40 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {/* Indicador activo pequeño */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-[#FFD700] rounded-r-full" />
                                )}

                                <div className={`min-w-[24px] flex justify-center transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'} ${isActive ? 'drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]' : ''}`}>
                                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                </div>

                                <div
                                    className={`overflow-hidden transition-all duration-300 whitespace-nowrap flex items-center justify-between ${isHovered ? 'w-[150px] ml-3 opacity-100' : 'w-0 ml-0 opacity-0'
                                        }`}
                                >
                                    <span className="font-medium text-sm tracking-wide">
                                        {item.label}
                                    </span>
                                    {item.submenus && (
                                        <ChevronRight size={14} className="text-white/30 mr-2 group-hover/navitem:text-white/60 transition-colors" />
                                    )}
                                </div>
                            </a>

                            {/* Flyout Submenu */}
                            {item.submenus && (
                                <div className="absolute left-full top-0 ml-2 py-2 px-1 w-48 bg-[#0A0F14]/95 backdrop-blur-xl rounded-xl border border-[#FFD700]/20 shadow-[8px_0_24px_rgba(0,0,0,0.6)] transition-all duration-300 pointer-events-none opacity-0 scale-95 origin-left group-hover/navitem:pointer-events-auto group-hover/navitem:opacity-100 group-hover/navitem:scale-100 z-50 flex flex-col gap-1">
                                    {/* Header of Submenu */}
                                    <div className="px-3 pb-2 mb-1 border-b border-white/5">
                                        <span className="text-[10px] font-bold text-[#FFD700] uppercase tracking-wider">{item.label}</span>
                                    </div>

                                    {item.submenus.map((sub, idx) => (
                                        <a 
                                            key={idx}
                                            href={sub.path || `#${sub.id}`}
                                            onClick={(e) => {
                                                if(!sub.path) handleClick(e, sub.id);
                                            }}
                                            className="text-xs text-white/60 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors flex items-center justify-between group/sub cursor-pointer"
                                        >
                                            <span>{sub.label}</span>
                                            <ChevronRight size={12} className="opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all text-[#FFD700]" />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SideNav;
