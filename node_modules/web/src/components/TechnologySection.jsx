
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Settings, Activity, Wifi } from 'lucide-react';

const technologies = [
  {
    icon: Settings,
    title: 'Ingeniería Industrial',
    desc: 'Diseño mecánico avanzado y simulación de fluidos para optimizar cada componente de la línea de producción.'
  },
  {
    icon: Cpu,
    title: 'Automatización PLC',
    desc: 'Sistemas de control lógico programable de última generación para sincronización perfecta de equipos.'
  },
  {
    icon: Activity,
    title: 'Sistemas Inteligentes SCR',
    desc: 'Control de potencia preciso y eficiente energéticamente para sistemas de calentamiento industrial.'
  },
  {
    icon: Wifi,
    title: 'Monitoreo Remoto',
    desc: 'Telemetría IoT para supervisión en tiempo real, diagnóstico predictivo y soporte técnico a distancia.'
  }
];

const TechnologySection = () => {
  return (
    <section id="tecnologia" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Tecnología de <span className="text-primary">Vanguardia</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Integramos los últimos avances tecnológicos para garantizar eficiencia y confiabilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="glass-card p-8 rounded-xl hover:-translate-y-2 hover:border-primary transition-all duration-300 group border border-transparent"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors glow-blue">
                <tech.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{tech.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tech.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
