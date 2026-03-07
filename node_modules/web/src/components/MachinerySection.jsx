
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const MachinerySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const machinery = [
    {
      image: 'https://images.unsplash.com/photo-1659406661027-ac7dd0455011',
      title: 'Extrusoras de Plástico',
      capacity: '500-2000 kg/h',
      industry: 'Reciclaje',
    },
    {
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      title: 'Líneas de Pelletizado',
      capacity: '300-1500 kg/h',
      industry: 'Reciclaje',
    },
    {
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
      title: 'Trituradores Industriales',
      capacity: '1000-5000 kg/h',
      industry: 'Reciclaje',
    },
    {
      image: 'https://images.unsplash.com/photo-1659167889361-890c288f9dca',
      title: 'Sistemas de Lavado de Plástico',
      capacity: '800-3000 kg/h',
      industry: 'Reciclaje',
    },
    {
      image: 'https://images.unsplash.com/photo-1535474035682-b50c07c2418f',
      title: 'Procesamiento de Chocolate',
      capacity: '200-1000 kg/h',
      industry: 'Alimentos',
    },
    {
      image: 'https://images.unsplash.com/photo-1495716098472-4bd5c0382520',
      title: 'Maquinaria de Empaque Automático',
      capacity: '50-200 unidades/min',
      industry: 'Empaque',
    },
  ];

  const handleViewEquipment = (title) => {
    toast({
      title: "🚧 Función en desarrollo",
      description: "La página de detalles del equipo estará disponible pronto. ¡Solicítala en tu próximo mensaje! 🚀",
    });
  };

  return (
    <section id="maquinaria" ref={sectionRef} className="py-16 md:py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Nuestra <span className="text-primary">Maquinaria</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Equipos industriales de última generación para maximizar tu producción
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {machinery.map((machine, index) => (
            <motion.div
              key={machine.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-xl overflow-hidden group hover:scale-105 hover:border-primary/50 transition-all duration-300 border border-transparent"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={machine.image}
                  alt={machine.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {machine.industry}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {machine.title}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Capacidad:</span>
                  <span className="text-primary font-semibold border border-primary/30 px-2 py-1 rounded-md bg-primary/5">{machine.capacity}</span>
                </div>
                <Button
                  onClick={() => handleViewEquipment(machine.title)}
                  className="w-full bg-primary text-white hover:bg-primary-hover transition-colors duration-300 group/btn"
                >
                  Ver Equipo
                  <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachinerySection;
