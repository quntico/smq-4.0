
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    title: 'Planta Reciclaje Plástico 600 TPD',
    desc: 'Sistema completo llave en mano para procesamiento de PET post-consumo.',
    specs: 'Capacidad: 600 Ton/Día | Ubicación: Monterrey, MX',
    image: 'https://images.unsplash.com/photo-1567516847971-81df16eefa90'
  },
  {
    id: 2,
    title: 'Línea de Procesamiento de Chocolate',
    desc: 'Automatización integral para atemperado y moldeado de chocolate industrial.',
    specs: 'Capacidad: 2000 kg/h | Ubicación: Bogotá, CO',
    image: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed'
  },
  {
    id: 3,
    title: 'Planta de Pelletizado de Plástico',
    desc: 'Extrusión de alto rendimiento con sistema de filtrado continuo.',
    specs: 'Capacidad: 1500 kg/h | Ubicación: Lima, PE',
    image: 'https://images.unsplash.com/photo-1557344380-3aa0c8009ddd'
  }
];

const IndustrialProjectsSection = () => {
  return (
    <section id="proyectos" className="py-16 md:py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Proyectos <span className="text-primary">Destacados</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Casos de éxito y plantas industriales implementadas por nuestro equipo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group relative rounded-xl overflow-hidden glass-card aspect-[4/5] border border-transparent hover:border-primary/50 transition-colors duration-300"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80 group-hover:from-primary/80 group-hover:via-background/80 transition-all duration-500"></div>
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-primary group-hover:text-white text-sm font-semibold mb-3 transition-colors duration-300">{project.specs}</p>
                <p className="text-white/80 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {project.desc}
                </p>
                <Button className="w-full bg-primary text-white hover:bg-primary-hover opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                  Ver Detalles <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrialProjectsSection;
