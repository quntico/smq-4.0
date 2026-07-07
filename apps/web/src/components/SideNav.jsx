import React, { useState, useEffect } from 'react';
import { Home, Factory, Box, FileText, Cpu, Layers, Mail, ChevronRight } from 'lucide-react';

const SideNav = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');

    const menuItems = [
        { 
            id: 'inicio', 
            label: 'Inicio', 
            icon: Home,
            submenus: [
                { id: 'inicio', label: 'Bienvenida' },
                { id: 'nosotros', label: 'Nosotros' }
            ]
        },
        { 
            id: 'industrias', 
            label: 'Industrias', 
            icon: Factory,
            submenus: [
                { id: 'industrias', label: 'Alimentos y Bebidas' },
                { id: 'industrias', label: 'Reciclaje' }
            ]
        },
        { 
            id: 'soluciones', 
            label: 'Soluciones', 
            icon: Box,
            submenus: [
                { id: 'soluciones', label: 'Llave en Mano' },
                { id: 'soluciones', label: 'Automatización' }
            ]
        },
        { 
            id: 'proyectos', 
            label: 'Proyectos', 
            icon: FileText,
            submenus: [
                { id: 'proyectos', label: 'Casos de Éxito' },
                { id: 'proyectos', label: 'Galería' }
            ]
        },
        { 
            id: 'tecnologia', 
            label: 'Tecnología', 
            icon: Cpu,
            submenus: [
                { id: 'tecnologia', label: 'Innovación' },
                { id: 'tecnologia', label: 'Investigación' }
            ]
        },
        { 
            id: 'visualizador', 
            label: 'Visualizador 3D', 
            icon: Layers,
            submenus: [
                { id: 'visualizador', label: 'Planta Interactiva' },
                { id: 'visualizador', label: 'Modelos' }
            ]
        },
        { 
            id: 'contacto', 
            label: 'Contacto', 
            icon: Mail,
            submenus: [
                { id: 'contacto', label: 'Soporte Directo', path: '/contacto' },
                { id: 'contacto', label: 'Oficinas', path: '/contacto' }
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
                className={`flex flex-col gap-2 py-4 px-2 rounded-r-2xl transition-all duration-300 ease-in-out border-y border-r border-[#009FE3]/20 shadow-[4px_0_24px_rgba(0,0,0,0.5)] ${isHovered
                    ? 'bg-[#050B12]/95 backdrop-blur-md translate-x-0'
                    : 'bg-[#050B12]/40 backdrop-blur-sm -translate-x-[2px]'
                    }`}
            >
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                        <div key={item.id} className="relative group/navitem flex flex-col">
                            <a
                                href={item.id === 'contacto' ? '/contacto' : `#${item.id}`}
                                onClick={(e) => handleClick(e, item.id === 'contacto' ? '/contacto' : item.id)}
                                className={`relative flex items-center h-10 px-2 rounded-xl transition-all duration-300 overflow-hidden cursor-pointer ${isActive
                                    ? 'bg-white/10 text-[#00D4FF]'
                                    : 'text-white/40 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {/* Indicador activo pequeño */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-[#00D4FF] rounded-r-full" />
                                )}

                                <div className={`min-w-[24px] flex justify-center transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'} ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]' : ''}`}>
                                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                </div>

                                <div
                                    className={`overflow-hidden transition-all duration-300 whitespace-nowrap flex items-center justify-between ${isHovered ? 'w-[150px] ml-3 opacity-100' : 'w-0 ml-0 opacity-0'
                                        }`}
                                >
                                    <span className="font-medium text-[13px] tracking-wide">
                                        {item.label}
                                    </span>
                                    {item.submenus && (
                                        <ChevronRight size={14} className="text-[#009FE3]/50 mr-2 group-hover/navitem:text-[#00D4FF] transition-colors" />
                                    )}
                                </div>
                            </a>

                            {/* Flyout Submenu */}
                            {item.submenus && (
                                <div className="absolute left-full top-0 ml-2 py-2 px-1 w-48 bg-[#050B12]/95 backdrop-blur-xl rounded-xl border border-[#009FE3]/20 shadow-[8px_0_24px_rgba(0,0,0,0.6)] transition-all duration-300 pointer-events-none opacity-0 scale-95 origin-left group-hover/navitem:pointer-events-auto group-hover/navitem:opacity-100 group-hover/navitem:scale-100 z-50 flex flex-col gap-1 before:content-[''] before:absolute before:-left-4 before:top-0 before:w-4 before:h-full">
                                    {/* Header of Submenu */}
                                    <div className="px-3 pb-2 mb-1 border-b border-[#009FE3]/10">
                                        <span className="text-[10px] font-bold text-[#00D4FF] uppercase tracking-wider">{item.label}</span>
                                    </div>

                                    {item.submenus.map((sub, idx) => (
                                        <a 
                                            key={idx}
                                            href={sub.path || `#${sub.id}`}
                                            onClick={(e) => {
                                                if(!sub.path) handleClick(e, sub.id);
                                            }}
                                            className="text-xs text-[#8E9BAA] hover:text-[#EAF4FF] hover:bg-[#009FE3]/10 px-3 py-2 rounded-lg transition-colors flex items-center justify-between group/sub cursor-pointer"
                                        >
                                            <span>{sub.label}</span>
                                            <ChevronRight size={12} className="opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all text-[#00D4FF]" />
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
