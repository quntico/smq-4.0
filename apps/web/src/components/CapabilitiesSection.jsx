
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Zap, Bot } from 'lucide-react';

const capabilities = [
  {
    id: 1,
    title: 'Ingeniería de Procesos',
    description: 'Diseño y optimización de procesos industriales para maximizar la eficiencia, reducir costos operativos y garantizar la máxima calidad en cada etapa de producción.',
    icon: Settings
  },
  {
    id: 2,
    title: 'Fabricación Industrial',
    description: 'Fabricación especializada de maquinaria y equipos robustos, utilizando materiales de alta resistencia y tecnología de vanguardia para entornos exigentes.',
    icon: Zap
  },
  {
    id: 3,
    title: 'Automatización Inteligente',
    description: 'Implementación de sistemas de control avanzados e inteligencia artificial para automatizar líneas de producción, mejorando la precisión y la seguridad.',
    icon: Bot
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const CapabilitiesSection = () => {
  return (
    <section className="bg-[#0B0F14] px-[20px] py-[40px] md:px-[30px] md:py-[60px] lg:px-[40px] lg:py-[80px] w-full">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-[#FFFFFF] font-[700] text-[28px] md:text-[36px] lg:text-[48px] text-center mb-[60px]"
        >
          Nuestras Capacidades
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-[24px]"
        >
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={capability.id}
                variants={itemVariants}
                className="group bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[12px] p-[40px] min-h-[300px] transition-all duration-250 ease-in-out hover:bg-[rgba(255,255,255,0.1)] hover:border-[#FFD700] hover:-translate-y-[5px] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]"
              >
                <Icon 
                  className="w-[64px] h-[64px] text-[#FFD700] mb-[24px] transition-all duration-250 ease-in-out group-hover:text-[#FFFFFF] group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                  strokeWidth={1.5}
                />
                <h3 className="text-[#FFFFFF] font-[700] text-[18px] md:text-[20px] lg:text-[24px] mb-[16px] transition-colors duration-250 ease-in-out group-hover:text-[#FFD700]">
                  {capability.title}
                </h3>
                <p className="text-[#D0D0D0] font-[400] text-[12px] md:text-[13px] lg:text-[14px] leading-[1.6]">
                  {capability.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
