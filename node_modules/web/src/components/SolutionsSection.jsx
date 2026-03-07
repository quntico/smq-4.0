
import React, { useEffect, useRef, useState } from 'react';
import { Lightbulb, Wrench, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const SolutionsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const solutions = [
    {
      icon: Lightbulb,
      title: 'Consultoría Industrial',
      description: 'Análisis profundo de tus necesidades de producción y diseño de soluciones personalizadas que optimicen tus procesos industriales.',
      benefits: [
        'Evaluación técnica completa',
        'Diseño de procesos optimizados',
        'Análisis de retorno de inversión',
        'Recomendaciones de tecnología',
      ],
    },
    {
      icon: Wrench,
      title: 'Instalación y Puesta en Marcha',
      description: 'Servicio integral de instalación, configuración y arranque de maquinaria con capacitación completa para tu equipo operativo.',
      benefits: [
        'Instalación profesional certificada',
        'Calibración y ajuste fino',
        'Capacitación técnica especializada',
        'Documentación completa',
      ],
    },
    {
      icon: Shield,
      title: 'Mantenimiento Preventivo',
      description: 'Programas de mantenimiento diseñados para maximizar la vida útil de tu maquinaria y minimizar tiempos de inactividad.',
      benefits: [
        'Inspecciones programadas',
        'Reemplazo de componentes críticos',
        'Soporte técnico 24/7',
        'Garantía extendida disponible',
      ],
    },
  ];

  return (
    <section id="soluciones" ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Soluciones <span className="text-primary">Personalizadas</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Acompañamiento integral desde la consultoría hasta el mantenimiento continuo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-card rounded-xl p-8 hover:scale-105 hover:brightness-110 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <solution.icon size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {solution.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {solution.description}
              </p>
              <div className="space-y-3">
                <span className="text-sm font-semibold text-foreground">Beneficios:</span>
                <ul className="space-y-2">
                  {solution.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 md:mt-16 glass-card rounded-xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            ¿Necesitas una solución a medida?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Nuestro equipo de ingenieros está listo para diseñar la solución perfecta para tu planta industrial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <span className="text-primary font-semibold text-lg">
              Contáctanos y recibe una consultoría gratuita
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;
