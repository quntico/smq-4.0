
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    industria: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido.",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push({
      ...formData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

    // Success message
    toast({
      title: "¡Mensaje enviado!",
      description: "Gracias por contactarnos. Nos pondremos en contacto contigo pronto.",
    });

    // Reset form
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      industria: '',
      mensaje: '',
    });
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Contáctanos <span className="text-primary">Hoy</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos listos para ayudarte a transformar tu planta industrial
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="glass-card rounded-xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-6">Envíanos un mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-primary font-medium">
                  Nombre completo *
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Juan Pérez"
                  className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="juan@empresa.com"
                  className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono" className="text-primary font-medium">
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+52 (55) 1234-5678"
                  className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industria" className="text-primary font-medium">
                  Industria
                </Label>
                <Input
                  id="industria"
                  name="industria"
                  value={formData.industria}
                  onChange={handleChange}
                  placeholder="Reciclaje, Alimentos, Empaque, etc."
                  className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensaje" className="text-primary font-medium">
                  Mensaje *
                </Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={5}
                  className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground resize-none focus-visible:ring-primary focus-visible:border-primary transition-colors"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary-hover font-semibold text-lg py-6 group transition-colors duration-300"
              >
                Enviar Mensaje
                <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-8 border border-border/50">
              <h3 className="text-2xl font-bold text-foreground mb-6">Información de contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 glow-blue">
                    <Phone size={24} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Teléfono</span>
                    <p className="text-foreground font-semibold hover:text-primary transition-colors cursor-pointer">+52 (55) 1234-5678</p>
                    <p className="text-foreground font-semibold hover:text-primary transition-colors cursor-pointer">+52 (55) 8765-4321</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 glow-blue">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Email</span>
                    <p className="text-foreground font-semibold hover:text-primary transition-colors cursor-pointer">contacto@smqindustrial.com</p>
                    <p className="text-foreground font-semibold hover:text-primary transition-colors cursor-pointer">ventas@smqindustrial.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 glow-blue">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Ubicación</span>
                    <p className="text-foreground font-semibold">Ciudad de México, México</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Av. Insurgentes Sur 1234, Col. Industrial
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-8 border border-border/50">
              <h3 className="text-xl font-bold text-foreground mb-4">Horario de atención</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                <p>Sábado: 9:00 AM - 2:00 PM</p>
                <p>Domingo: Cerrado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
