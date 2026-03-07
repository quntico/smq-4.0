
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Industrias', href: '#industrias' },
    { label: 'Maquinaria', href: '#maquinaria' },
    { label: 'Soluciones', href: '#soluciones' },
    { label: 'Tecnología', href: '#tecnologia' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-background border-t border-[#1F2937]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                SMQ Industrial Systems
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Soluciones industriales de alta ingeniería para reciclaje, procesamiento de alimentos y automatización.
            </p>
            <Button 
              onClick={() => scrollToSection('#cotizador')}
              className="bg-primary text-white hover:bg-primary-hover font-semibold w-full sm:w-auto transition-colors duration-300"
            >
              Solicitar Cotización
            </Button>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <span className="text-lg font-semibold text-foreground">Menú Principal</span>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-muted-foreground hover:text-primary transition-colors text-left text-sm py-1"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <span className="text-lg font-semibold text-foreground">Contacto Directo</span>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-3 text-muted-foreground text-sm">
                <Phone size={18} className="text-primary mt-0.5" />
                <div>
                  <p className="hover:text-primary transition-colors cursor-pointer">+52 (55) 1234-5678</p>
                  <p className="hover:text-primary transition-colors cursor-pointer">+52 (55) 8765-4321</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground text-sm">
                <Mail size={18} className="text-primary" />
                <span className="hover:text-primary transition-colors cursor-pointer">contacto@smqindustrial.com</span>
              </div>
              <div className="flex items-start space-x-3 text-muted-foreground text-sm">
                <MapPin size={18} className="text-primary mt-0.5" />
                <span>Av. Insurgentes Sur 1234, Col. Industrial, CDMX</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-6">
            <span className="text-lg font-semibold text-foreground">Redes Sociales</span>
            <p className="text-sm text-muted-foreground">Síguenos para conocer nuestros últimos proyectos y tecnologías.</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#1F2937] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {currentYear} SMQ Industrial Systems. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
