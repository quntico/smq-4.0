
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

const hotspots = [
  { id: 1, x: 30, y: 40, name: 'Extrusora Principal', specs: 'Capacidad: 1000 kg/h', power: '150 kW' },
  { id: 2, x: 60, y: 30, name: 'Sistema de Enfriamiento', specs: 'Flujo: 500 L/min', power: '45 kW' },
  { id: 3, x: 75, y: 60, name: 'Pelletizadora', specs: 'Corte bajo agua', power: '30 kW' },
  { id: 4, x: 45, y: 70, name: 'Silo de Almacenamiento', specs: 'Capacidad: 5 Toneladas', power: '5 kW' },
  { id: 5, x: 20, y: 65, name: 'Panel de Control PLC', specs: 'Automatización Avanzada', power: '2 kW' },
];

const PlantVisualizerSection = () => {
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <section id="visualizador" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Visualizador de <span className="text-primary">Planta 3D</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra configuración típica de planta industrial interactiva.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto rounded-xl overflow-hidden glass-card border border-border/50 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1698621193747-e8788c620dbc" 
            alt="Planta Industrial Isométrica" 
            className="w-full h-auto object-cover opacity-80 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none"></div>

          {hotspots.map((spot) => (
            <div 
              key={spot.id}
              className="absolute"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              <button
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => setActiveHotspot(spot.id === activeHotspot ? null : spot.id)}
                className="relative w-8 h-8 -ml-4 -mt-4 bg-primary rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform z-10 shadow-[0_0_15px_rgba(10,132,255,0.6)]"
              >
                <Info size={16} />
                <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-75"></span>
              </button>

              <AnimatePresence>
                {activeHotspot === spot.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-48 glass-card p-4 rounded-lg z-20 border border-primary shadow-xl"
                  >
                    <h4 className="font-bold text-primary text-sm mb-1">{spot.name}</h4>
                    <p className="text-xs text-foreground/80 mb-1">{spot.specs}</p>
                    <p className="text-xs text-muted-foreground">Potencia: {spot.power}</p>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-b border-r border-primary transform rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlantVisualizerSection;
