
import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Plantas de Reciclaje',
    category: 'Reciclaje',
    image: 'https://images.unsplash.com/photo-1612479620013-1ec36413e07c',
    description: 'Sistemas completos de reciclaje de plásticos con capacidad de 50 toneladas/día'
  },
  {
    id: 2,
    title: 'Líneas de Chocolate',
    category: 'Alimentos',
    image: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed',
    description: 'Equipos especializados para procesamiento y envasado de chocolate'
  },
  {
    id: 3,
    title: 'Sistemas de Packaging',
    category: 'Packaging',
    image: 'https://images.unsplash.com/photo-1495716098472-4bd5c0382520',
    description: 'Soluciones integrales de llenado, etiquetado y encartonado'
  },
  {
    id: 4,
    title: 'Automatización Industrial',
    category: 'Automatización',
    image: 'https://images.unsplash.com/photo-1642721084699-1c3007e38d9e',
    description: 'Sistemas de control PLC con integración de sensores y actuadores'
  },
  {
    id: 5,
    title: 'Plantas de Procesamiento',
    category: 'Alimentos',
    image: 'https://images.unsplash.com/photo-1652211955971-7517ff03529d',
    description: 'Líneas completas de procesamiento de alimentos con automatización'
  },
  {
    id: 6,
    title: 'Sistemas Compuestos',
    category: 'Construcción',
    image: 'https://images.unsplash.com/photo-1684260756943-a4537398bb90',
    description: 'Fabricación de materiales compuestos para construcción sostenible'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const ProjectsSection = () => {
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
          Proyectos Destacados
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative h-[250px] md:h-[300px] lg:h-[350px] rounded-[12px] overflow-hidden cursor-pointer shadow-lg border-t-[3px] border-transparent hover:border-[#FFD700] hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all duration-250 ease-in-out"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center z-[1] transition-transform duration-250 ease-in-out group-hover:scale-108"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] z-[2] transition-colors duration-250 ease-in-out group-hover:bg-[rgba(0,0,0,0.3)]" />

              {/* Content */}
              <div className="relative z-[3] h-full p-[30px] flex flex-col justify-end items-start">
                <span className="text-[#FFD700] font-[600] text-[12px] uppercase tracking-[1px] mb-[8px] transition-colors duration-250 ease-in-out group-hover:text-[#FFFFFF]">
                  {project.category}
                </span>
                <h3 className="text-[#FFFFFF] font-[700] text-[18px] md:text-[22px] lg:text-[28px] mb-[8px] transition-colors duration-250 ease-in-out group-hover:text-[#FFD700]">
                  {project.title}
                </h3>
                <p className="text-[#D0D0D0] font-[400] text-[11px] md:text-[12px] lg:text-[13px] opacity-80 leading-[1.5]">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
