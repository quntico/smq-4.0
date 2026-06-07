import React, { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Factory, Flame, Eye, Recycle, Zap, HardHat, ArrowRight, Shield, Settings, CheckCircle2, ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer.jsx';

const sectionsData = [
  {
    id: 'plantas-rsu',
    num: '01',
    title: 'PLANTAS RSU',
    subtitle: 'Tratamiento y Valorización Integral',
    desc: 'Tratamiento y valorización integral de residuos sólidos urbanos mediante procesos mecánicos y automatizados.',
    longDesc: 'Diseñamos y construimos sistemas robustos para la recepción, separación y clasificación de Residuos Sólidos Urbanos (RSU). Nuestras plantas combinan tolvas de alimentación de alta resistencia, trómeles de clasificación por tamaños, separadores balísticos y sistemas de aspiración para separar eficazmente la fracción orgánica de los materiales reciclables.',
    color: '#22C55E', // Verde
    Icon: Factory,
    bgImage: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=800',
    specs: [
      'Capacidad modular desde 10 hasta 100 Ton/hora',
      'Clasificación automática de fracciones finas y orgánicas',
      'Sistemas de control de olores y polvo integrados',
      'Banda transportadora de alta resistencia con velocidad regulable'
    ]
  },
  {
    id: 'cdr-rdf',
    num: '02',
    title: 'PRODUCCIÓN DE CDR / RDF',
    subtitle: 'Combustible Derivado de Residuos',
    desc: 'Procesamiento de combustibles derivados de residuos de alto poder calorífico para uso industrial y energético.',
    longDesc: 'Transformamos residuos no reciclables de origen comercial e industrial en Combustible Derivado de Residuos (CDR / RDF). Mediante trituración secundaria, secado térmico y separación de metales, producimos un combustible alternativo de alta calidad y poder calorífico constante, ideal para su uso en hornos de cemento y plantas termoeléctricas.',
    color: '#F59E0B', // Naranja
    Icon: Flame,
    bgImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800',
    specs: [
      'Poder calorífico neto de hasta 18-22 MJ/kg',
      'Humedad final controlada inferior al 15%',
      'Sistemas de separación de cloro y metales pesados en línea',
      'Granulometría homogénea ajustable a requerimiento del cliente'
    ]
  },
  {
    id: 'clasificacion-inteligente',
    num: '03',
    title: 'CLASIFICACIÓN INTELIGENTE',
    subtitle: 'Separación Óptica por Inteligencia Artificial',
    desc: 'Separación automatizada por NIR, inducción y sistemas multisensoriales con inteligencia artificial para máxima precisión y pureza.',
    longDesc: 'Incorporamos tecnología de última generación en clasificación óptica (NIR) y visión artificial. Nuestros sistemas inteligentes detectan y separan plásticos por polímeros (PET, PEAD, PP, PS, PVC), cartón y metales a velocidades extremas, optimizando los rendimientos de pureza hasta en un 98% mediante soplado neumático de alta precisión.',
    color: '#06B6D4', // Azul Cian
    Icon: Eye,
    bgImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
    specs: [
      'Resolución de escaneo NIR de hasta 320 canales de detección',
      'Algoritmos de aprendizaje profundo para reconocimiento de formas y marcas',
      'Tasa de eyección neumática precisa con respuesta en milisegundos',
      'Monitoreo y telemetría de pureza en tiempo real en la nube'
    ]
  },
  {
    id: 'recuperacion-materiales',
    num: '04',
    title: 'RECUPERACIÓN DE MATERIALES',
    subtitle: 'Tecnologías de Separación Avanzada',
    desc: 'Extracción eficiente de metales, plásticos y materiales reciclables con tecnologías de separación avanzadas.',
    longDesc: 'Desarrollamos soluciones integrales de separación física para la recuperación de valiosos metales ferrosos y no ferrosos (aluminio, cobre) mediante separadores de corrientes de Foucault (Eddy Current). Combinado con cribas magnéticas y separadores mecánicos de aire, logramos desviar toneladas de recursos útiles de los vertederos.',
    color: '#8B5CF6', // Morado
    Icon: Recycle,
    bgImage: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=800',
    specs: [
      'Separadores de corrientes de Foucault de alta frecuencia',
      'Tambores magnéticos de tierras raras de gran poder de atracción',
      'Sistemas de clasificación por corrientes de aire (Air Classifiers)',
      'Máximo retorno de inversión gracias al alto índice de material recuperado'
    ]
  },
  {
    id: 'conversion-energetica',
    num: '05',
    title: 'CONVERSIÓN ENERGÉTICA',
    subtitle: 'Gasificación, Pirólisis y Co-generación',
    desc: 'Tecnologías de gasificación, pirólisis, biomasa y co-generación para transformar residuos en energía útil.',
    longDesc: 'Implementamos sistemas avanzados de conversión térmica (Waste-to-Energy). Nuestras soluciones incluyen reactores de gasificación de lecho fluidizado y plantas de pirólisis para convertir fracciones de polímeros y biomasa en gas de síntesis (syngas), vapor de proceso y energía eléctrica limpia, respetando las más estrictas normativas ambientales globales.',
    color: '#EC4899', // Rosa
    Icon: Zap,
    bgImage: 'https://images.unsplash.com/photo-1513828742140-ccaa34f3158e?auto=format&fit=crop&q=80&w=800',
    specs: [
      'Reactores de conversión térmica de alta eficiencia termodinámica',
      'Sistemas de lavado de gases de combustión multietapa (SCR/SnCR)',
      'Generación combinada de calor y electricidad (CHP / Co-generación)',
      'Cumplimiento con Directiva Europea de Emisiones Industriales (IED)'
    ]
  },
  {
    id: 'plantas-llave-en-mano',
    num: '06',
    title: 'PLANTAS LLAVE EN MANO',
    subtitle: 'Ingeniería, Fabricación e Instalación Integral',
    desc: 'Ingeniería completa desde el diseño, fabricación, instalación y automatización hasta la puesta en marcha y soporte operativo.',
    longDesc: 'Ofrecemos proyectos llave en mano (EPC) desde el diseño conceptual del layout hasta la instalación, automatización mediante PLC/SCADA y capacitación del personal operativo. Nos encargamos de todo el ciclo del proyecto para entregar plantas de valorización listas para producir valor de forma confiable, segura y rentable.',
    color: '#22C55E', // Verde
    Icon: HardHat,
    bgImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    specs: [
      'Ingeniería civil, mecánica y eléctrica unificada en 3D (BIM)',
      'Gabinetes de control centralizados con protocolos Profinet / Ethernet',
      'Puesta en marcha y pruebas de rendimiento de planta (FAT / SAT)',
      'Soporte técnico posventa garantizado y stock de repuestos'
    ]
  }
];

const WasteToEnergy = () => {
  const { hash } = useLocation();
  const lastScrolledHashRef = useRef('');

  // Efecto para scroll suave dinámico al hash
  useEffect(() => {
    if (hash) {
      const currentHash = hash;
      if (lastScrolledHashRef.current === currentHash) return;

      const id = currentHash.substring(1);
      
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          lastScrolledHashRef.current = currentHash;
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 350);

      return () => clearTimeout(timer);
    } else {
      lastScrolledHashRef.current = '';
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="bg-[#05070a] text-white min-h-screen font-sans selection:bg-[#22C55E]/30 selection:text-[#22C55E] overflow-x-hidden">
      <Helmet>
        <title>Soluciones Waste to Energy | SMQ Industrial Systems</title>
        <meta name="description" content="Tecnologías y sistemas integrados para el tratamiento, valorización y conversión de residuos sólidos urbanos e industriales en energía y recursos de alto valor." />
      </Helmet>

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[75vh] flex items-center pt-24 pb-16 overflow-hidden">
        {/* Background Parallax Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop" 
            alt="Waste to Energy Industrial Plant" 
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-transparent to-[#05070a]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#22C55E] uppercase hover:text-white transition-colors"
            >
              <ArrowLeft size={12} />
              <span>Volver a Inicio</span>
            </Link>
            
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#22C55E]">
              VALORIZACIÓN ENERGÉTICA Y AMBIENTAL
            </p>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[1.05]">
              Soluciones <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
                Waste to Energy
              </span>
            </h1>
            
            <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl">
              Tecnologías y sistemas integrados para el tratamiento, valorización y conversión de residuos en energía y recursos. Desarrollamos soluciones de alta ingeniería para mitigar el impacto ambiental y maximizar la rentabilidad operativa.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#plantas-rsu"
                className="px-6 py-3 bg-[#22C55E] hover:bg-[#1f9d4b] text-black font-black text-xs tracking-widest uppercase rounded-full transition-all shadow-[0_4px_20px_rgba(34,197,94,0.3)] flex items-center gap-2"
              >
                <span>Explorar Soluciones</span>
                <ArrowRight size={14} />
              </a>
              <Link 
                to="/nosotros"
                className="px-6 py-3 border border-white/10 hover:border-white/30 text-white font-black text-xs tracking-widest uppercase rounded-full transition-all bg-white/5 hover:bg-white/10"
              >
                Nuestra Ingeniería
              </Link>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-2xl">
            {[
              { val: '99.2%', lbl: 'Eficiencia del Proceso' },
              { val: 'WTE-60', lbl: 'Estándar Tecnológico' },
              { val: '100%', lbl: 'Cumplimiento Ambiental' },
              { val: 'CO2-Neg', lbl: 'Reducción de Huella' }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="p-4 bg-black/40 border border-white/5 rounded-2xl flex flex-col justify-center"
              >
                <span className="text-2xl md:text-3xl font-black text-[#22C55E] tracking-tight leading-none mb-1">
                  {stat.val}
                </span>
                <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold leading-tight">
                  {stat.lbl}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── DETAILED SOLUTIONS SECTIONS ── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 space-y-32">
        {sectionsData.map((sec, idx) => {
          const Icon = sec.Icon;
          const isEven = idx % 2 === 0;
          return (
            <div 
              key={sec.id}
              id={sec.id}
              className="scroll-mt-[100px] grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center border-b border-white/5 pb-20 md:pb-28 last:border-b-0 last:pb-0"
            >
              {/* Media Column (Image) */}
              <div className={`lg:col-span-6 relative group ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                {/* Outer Glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-10 blur-3xl transition-opacity group-hover:opacity-20 duration-500"
                  style={{ backgroundColor: sec.color }}
                />
                
                {/* Photo frame */}
                <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#090b0f]">
                  <img 
                    src={sec.bgImage} 
                    alt={sec.title} 
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Color Tint Overlay */}
                  <div 
                    className="absolute inset-0 opacity-20 mix-blend-color transition-opacity group-hover:opacity-30" 
                    style={{ backgroundColor: sec.color }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                {/* Floating Big Index Number */}
                <span 
                  className="absolute -top-10 -right-6 text-[110px] font-black leading-none opacity-[0.03] select-none font-mono"
                  style={{ color: sec.color }}
                >
                  {sec.num}
                </span>
              </div>

              {/* Text Column */}
              <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl border flex items-center justify-center"
                    style={{ 
                      backgroundColor: `${sec.color}15`, 
                      borderColor: `${sec.color}30` 
                    }}
                  >
                    <Icon size={18} color={sec.color} />
                  </div>
                  <div className="flex flex-col">
                    <span 
                      className="text-[9px] font-black uppercase tracking-widest font-mono"
                      style={{ color: sec.color }}
                    >
                      TECNOLOGÍA {sec.num}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
                      {sec.title}
                    </h2>
                  </div>
                </div>

                {/* Highlighted short desc */}
                <p 
                  className="font-bold text-[15px] leading-relaxed border-l-2 pl-4"
                  style={{ borderColor: sec.color }}
                >
                  {sec.desc}
                </p>

                {/* Long detailed desc */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {sec.longDesc}
                </p>

                {/* Specifications list */}
                <div className="space-y-3 pt-3">
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                    Especificaciones Clave:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sec.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5 text-white/80 text-xs font-semibold">
                        <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: sec.color }} />
                        <span className="leading-tight">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to Action buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/[0.05]">
                  <a 
                    href="mailto:ventas@smq.com?subject=Cotizacion%20-%20Plantas%20RSU"
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold text-[10px] tracking-widest uppercase rounded-lg transition-all flex items-center gap-2"
                  >
                    <span>Cotizar Solución</span>
                    <ArrowRight size={12} style={{ color: sec.color }} />
                  </a>
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Shield size={12} className="text-white/30" />
                    Ingeniería Certificada
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── CONCLUDING CALL TO ACTION BANNER ── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent p-8 md:p-16 text-center space-y-6">
          {/* Background overlay */}
          <div className="absolute inset-0 z-0 bg-[#07090d]/80 backdrop-blur-sm" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#22C55E]">
              CONSTRUIBLE BAJO ESPECIFICACIÓN
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
              ¿Listo para Configurar tu Proyecto WTE?
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Nuestro equipo de ingeniería avanzada está disponible para realizar layouts integrales, simulaciones de flujo de proceso y cotizaciones optimizadas a la medida de tus necesidades de valorización.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a 
                href="mailto:ingenieria@smq.com?subject=Consulta%20Waste%20to%20Energy"
                className="px-6 py-3 bg-[#22C55E] hover:bg-[#1f9d4b] text-black font-black text-xs tracking-widest uppercase rounded-full transition-all shadow-[0_4px_20px_rgba(34,197,94,0.3)] flex items-center gap-2"
              >
                <span>Contactar a un Experto</span>
                <ArrowRight size={14} />
              </a>
              <Link 
                to="/nosotros"
                className="px-6 py-3 border border-white/10 hover:border-white/30 text-white font-black text-xs tracking-widest uppercase rounded-full transition-all bg-white/5 hover:bg-white/10"
              >
                Explorar Más Sectores
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WasteToEnergy;
