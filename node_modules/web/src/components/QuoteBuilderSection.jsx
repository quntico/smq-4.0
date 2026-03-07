
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Calculator, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QuoteBuilderSection = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState([]);

  const loadCart = () => {
    const saved = JSON.parse(localStorage.getItem('quoteCart') || '[]');
    setCart(saved);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('quoteCart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('quoteCart');
  };

  const handleRequestQuote = () => {
    if (cart.length === 0) return;
    toast({
      title: "Solicitud Enviada",
      description: "Tu solicitud de cotización formal ha sido enviada a nuestro equipo de ventas.",
    });
    clearCart();
  };

  const totalPower = cart.reduce((acc, item) => acc + (item.power * item.quantity), 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <section id="cotizador" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Cotizador de <span className="text-primary">Proyectos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Revisa los equipos seleccionados y solicita una cotización formal.
          </p>
        </div>

        <div className="glass-card rounded-xl overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-muted-foreground">
              <thead className="bg-card/50 text-foreground uppercase font-semibold border-b border-border">
                <tr>
                  <th className="px-6 py-4">Equipo</th>
                  <th className="px-6 py-4">Cant.</th>
                  <th className="px-6 py-4">Potencia (kW)</th>
                  <th className="px-6 py-4">Precio Est. (USD)</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">
                      El cotizador está vacío. Agrega equipos desde el configurador.
                    </td>
                  </tr>
                ) : (
                  cart.map((item, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-card/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{item.name}</td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">{item.power}</td>
                      <td className="px-6 py-4">${item.price.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => removeFromCart(idx)} className="text-destructive hover:text-destructive/80 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {cart.length > 0 && (
            <div className="bg-card/80 p-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex gap-6 text-sm">
                <div className="glass-card px-4 py-2 rounded-lg border-primary/30 bg-primary/5">
                  <span className="text-muted-foreground block text-xs">Potencia Total Instalada</span>
                  <span className="text-primary font-bold text-lg">{totalPower.toFixed(1)} kW</span>
                </div>
                <div className="glass-card px-4 py-2 rounded-lg border-primary/30 bg-primary/5">
                  <span className="text-muted-foreground block text-xs">Inversión Estimada</span>
                  <span className="text-primary font-bold text-lg">${totalPrice.toLocaleString()} USD</span>
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <Button onClick={clearCart} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300">
                  Limpiar
                </Button>
                <Button onClick={handleRequestQuote} className="bg-primary text-white hover:bg-primary-hover flex-1 md:flex-none transition-colors duration-300">
                  <Send size={16} className="mr-2" /> Solicitar Cotización Formal
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuoteBuilderSection;
