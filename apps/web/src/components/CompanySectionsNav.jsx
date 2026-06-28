import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, ShieldCheck, PhoneCall, ArrowRight, Briefcase, Globe, Cpu, Layers } from 'lucide-react';

const navItems = [
  {
    num: '01',
    title: 'NOSOTROS',
    desc: 'HISTORIA, VISIÓN Y VALORES DE NUESTRA TRAYECTORIA INDUSTRIAL.',
    color: '#3B82F6', // Blue
    Icon: Building2,
    href: '/nosotros'
  },
  {
    num: '02',
    title: 'CAPACIDADES',
    desc: 'NUESTRA INFRAESTRUCTURA DE FABRICACIÓN Y ALCANCE TECNOLÓGICO.',
    color: '#F59E0B', // Amber
    Icon: Layers,
    href: '/capacidades'
  },
  {
    num: '03',
    title: 'CERTIFICACIONES',
    desc: 'ESTÁNDARES DE CALIDAD ISO, CERTIFICACIONES DE SEGURIDAD Y NORMATIVAS.',
    color: '#10B981', // Green
    Icon: ShieldCheck,
    href: '/certificaciones'
  },
  {
    num: '04',
    title: 'ALIANZAS',
    desc: 'RED GLOBAL DE SOCIOS E INTEGRADORES DE MAQUINARIA INDUSTRIAL.',
    color: '#8B5CF6', // Purple
    Icon: Globe,
    href: '/alianzas'
  },
  {
    num: '05',
    title: 'INNOVACIÓN',
    desc: 'CENTROS DE I+D Y DESARROLLOS TECNOLÓGICOS DE PRÓXIMA GENERACIÓN.',
    color: '#06B6D4', // Cyan
    Icon: Cpu,
    href: '/innovacion'
  },
  {
    num: '06',
    title: 'CARRERA',
    desc: 'ÚNETE A NUESTRO EQUIPO GLOBAL DE INGENIERÍA Y MANUFACTURA.',
    color: '#EC4899', // Pink
    Icon: Briefcase,
    href: '/carrera'
  },
  {
    num: '07',
    title: 'CONTACTO',
    desc: 'ASISTENCIA TÉCNICA, OFICINAS REGIONALES Y COTIZACIÓN EXPRESS.',
    color: '#F97316', // Orange
    Icon: PhoneCall,
    href: '/contacto'
  }
];

const CompanySectionsNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <section className="py-24 px-[40px] relative border-t border-white/5 bg-[#030712] overflow-hidden">
      {/* Background Cyber-Grid Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-500/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <span className="text-[11px] font-black uppercase tracking-[0.35em] text-[#A1A8B3] font-mono">
            [ NAVEGACIÓN_INTERNA ]
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight uppercase font-sans">
            MÓDULOS DE LA EMPRESA
          </h2>
          <div className="w-20 h-[2px] bg-white/10 my-2" />
        </div>

        {/* Grid of Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navItems.map((item, idx) => {
            const Icon = item.Icon;
            const isActive = currentPath === item.href;

            return (
              <motion.div
                key={item.num}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link
                  to={item.href}
                  className={`group relative flex flex-col justify-between h-[250px] border rounded-xl p-6 transition-all duration-300 overflow-hidden ${
                    isActive 
                      ? 'border-white/20 bg-white/[0.04]' 
                      : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03]'
                  }`}
                  style={{
                    borderColor: isActive ? `${item.color}40` : undefined,
                    boxShadow: isActive ? `0 0 20px ${item.color}10` : undefined
                  }}
                >
                  {/* Subtle Hover Glow Line at top */}
                  <div 
                    className="absolute top-0 left-0 w-full h-[2px] transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left"
                    style={{ backgroundColor: item.color }}
                  />

                  {/* Top Bar: Icon & Number */}
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300"
                      style={{
                        backgroundColor: `${item.color}10`,
                        borderColor: `${item.color}35`,
                        boxShadow: `0 0 10px ${item.color}15`
                      }}
                    >
                      <Icon size={18} style={{ color: item.color }} />
                    </div>
                    <span 
                      className="text-xs font-black tracking-widest font-mono"
                      style={{ color: item.color }}
                    >
                      {item.num}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="mt-6 flex-1 flex flex-col justify-start">
                    <h3 className="text-sm font-black text-white leading-tight uppercase tracking-wider mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-white/40 leading-relaxed font-semibold uppercase tracking-wider group-hover:text-white/60 transition-colors">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom: CTA button */}
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
                    <span 
                      className="text-[9px] font-black uppercase tracking-widest transition-all duration-300 group-hover:tracking-[0.15em]"
                      style={{ color: item.color }}
                    >
                      {isActive ? 'SECCIÓN ACTUAL' : 'IR A LA SECCIÓN'}
                    </span>
                    <ArrowRight 
                      size={12} 
                      style={{ color: item.color }} 
                      className="transform group-hover:translate-x-1 transition-transform duration-300" 
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompanySectionsNav;
