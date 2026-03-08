import React, { useState, useEffect } from 'react';
import { Home, Building2, Settings, Box, Briefcase, Mail } from 'lucide-react';

const SideNav = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');

    const menuItems = [
        { id: 'inicio', label: 'Inicio', icon: Home },
        { id: 'industrias', label: 'Industrias', icon: Building2 },
        { id: 'maquinaria', label: 'Maquinaria', icon: Settings },
        { id: 'visualizador', label: 'Visualizador 3D', icon: Box },
        { id: 'proyectos', label: 'Proyectos', icon: Briefcase },
        { id: 'contacto', label: 'Contacto', icon: Mail },
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
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => handleClick(e, item.id)}
                            className={`relative flex items-center h-10 px-2 rounded-xl transition-all duration-300 overflow-hidden group cursor-pointer ${isActive
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
                                className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${isHovered ? 'max-w-[150px] ml-3 opacity-100' : 'max-w-0 ml-0 opacity-0'
                                    }`}
                            >
                                <span className="font-medium text-sm tracking-wide">
                                    {item.label}
                                </span>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default SideNav;
