
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Settings2, Plus } from 'lucide-react';

const PlantConfiguratorSection = () => {
  const { toast } = useToast();
  const [industry, setIndustry] = useState('Reciclaje Plástico');
  const [capacity, setCapacity] = useState(500);
  const [automation, setAutomation] = useState('Intermedio');
  const [recommendations, setRecommendations] = useState([]);

  const handleGenerate = () => {
    // Simulated logic for generating recommendations
    const newRecs = [
      { id: Date.now() + 1, name: `Sistema ${industry} Base`, specs: `Capacidad: ${capacity} kg/h`, price: capacity * 120, power: capacity * 0.2 },
      { id: Date.now() + 2, name: `Módulo de Automatización ${automation}`, specs: `Control PLC y Sensores`, price: automation === 'Avanzado' ? 45000 : 25000, power: 5 },
    ];
    setRecommendations(newRecs);
    toast({ title: "Propuesta Generada", description: "Se han calculado las recomendaciones basadas en tus selecciones." });
  };

  const addToQuote = (item) => {
    const cart = JSON.parse(localStorage.getItem('quoteCart') || '[]');
    cart.push({ ...item, quantity: 1 });
    localStorage.setItem('quoteCart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage')); // Trigger update in QuoteBuilder
    toast({ title: "Agregado al Cotizador", description: `${item.name} ha sido agregado.` });
  };

  return (
    <section id="configurador" className="py-16 md:py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Configurador de <span className="text-primary">Planta</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Diseña tu línea de producción ideal y obtén recomendaciones de equipos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="glass-card p-6 rounded-xl space-y-6 lg:col-span-1 border border-border/50">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Tipo de Industria</label>
              <select 
                value={industry} 
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-background border border-border rounded-md p-2 text-foreground focus:ring-primary focus:border-primary transition-all duration-300 ease-in-out"
              >
                <option>Reciclaje Plástico</option>
                <option>Procesamiento Alimentos</option>
                <option>Empaque</option>
                <option>Sistemas Completos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Capacidad: {capacity} kg/h
              </label>
              <input 
                type="range" 
                min="50" max="1000" step="50"
                value={capacity} 
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full accent-primary transition-all duration-300 ease-in-out"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Nivel de Automatización</label>
              <div className="space-y-2">
                {['Básico', 'Intermedio', 'Avanzado'].map(level => (
                  <label key={level} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer">
                    <input 
                      type="radio" 
                      name="automation" 
                      value={level}
                      checked={automation === level}
                      onChange={(e) => setAutomation(e.target.value)}
                      className="text-primary focus:ring-primary bg-background border-border transition-all duration-300 ease-in-out"
                    />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button onClick={handleGenerate} className="w-full bg-primary text-white hover:bg-primary-hover transition-colors duration-300 ease-in-out">
              <Settings2 className="mr-2" size={18} /> Generar Propuesta
            </Button>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">
            {recommendations.length === 0 ? (
              <div className="h-full flex items-center justify-center glass-card rounded-xl p-8 text-muted-foreground text-center border-dashed border-border/50">
                Configura tus parámetros y haz clic en "Generar Propuesta" para ver los equipos recomendados.
              </div>
            ) : (
              recommendations.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.id} 
                  className="glass-card p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-border/50 hover:border-primary/50 transition-colors duration-300"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground text-lg">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.specs}</p>
                    <p className="text-xs text-primary mt-1">Potencia Est.: {item.power} kW</p>
                  </div>
                  <Button onClick={() => addToQuote(item)} className="bg-primary text-white hover:bg-primary-hover whitespace-nowrap transition-colors duration-300 ease-in-out">
                    <Plus size={16} className="mr-2" /> Agregar al Cotizador
                  </Button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlantConfiguratorSection;
