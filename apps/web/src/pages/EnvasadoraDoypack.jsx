import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Inbox, 
  Maximize2, 
  Eye, 
  Layers, 
  ArrowDownToLine, 
  Wind, 
  Flame, 
  LogOut, 
  Settings, 
  FileText, 
  Check,
  ChevronRight,
  TrendingUp,
  Cpu,
  Shield,
  Zap,
  Play,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  Palette,
  Upload
} from 'lucide-react';
import Footer from '@/components/Footer.jsx';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';

// Map of icons for dynamic rendering
const iconMap = {
  Inbox, 
  Maximize2, 
  Eye, 
  Layers, 
  ArrowDownToLine, 
  Wind, 
  Flame, 
  LogOut,
  Settings,
  FileText,
  Check,
  ChevronRight,
  TrendingUp,
  Cpu,
  Shield,
  Zap,
  Play
};

const defaultPageData = {
  // Hero
  heroTitle: 'ENVASADORA ROTATIVA DOYPACK',
  heroTitleColor: '#ffffff',
  heroSubtitle: '8 estaciones de trabajo para llenado y sellado automático de bolsas preformadas.',
  heroSubtitleColor: '#ffffff',
  heroDesc: 'Diseñada bajo estrictos estándares de ingeniería de gama alta (estándar europeo OEM). Apta para el envasado automatizado de café, chocolates, snacks, frutos secos, polvos y granulados de alta densidad en atmósfera modificada. Construcción ultra-higiénica que asegura cero contaminación cruzada y máxima repetibilidad.',
  heroDescColor: 'rgba(255, 255, 255, 0.6)',
  heroDescAlign: 'left',
  heroMedia: '/rotary_doypack_machine.png',
  heroPoster: '',
  
  // Sección 1: Cómo funciona
  s1Title: '¿CÓMO FUNCIONA?',
  s1TitleColor: '#ffffff',
  s1Desc: 'Secuencia de ingeniería síncrona en 8 estaciones indexadas mecánicamente por servo, optimizada para máxima velocidad y sellados herméticos a prueba de fugas.',
  s1DescColor: 'rgba(255, 255, 255, 0.5)',
  s1DescAlign: 'center',
  
  // Sección 2: Especificaciones KPI
  s2Title: 'ESPECIFICACIONES PRINCIPALES',
  s2TitleColor: '#ffffff',
  
  // Sección 3: Aplicaciones
  s3Title: 'APLICACIONES INDUSTRIALES',
  s3TitleColor: '#ffffff',
  s3Desc: 'Dosificadores modulares de cambio rápido y alta precisión mecánica, compatibles con múltiples viscosidades, densidades y morfologías de producto.',
  s3DescColor: 'rgba(255, 255, 255, 0.5)',
  s3DescAlign: 'center',
  
  // Sección 4: Ventajas
  s4Title: 'VENTAJAS DE CLASE MUNDIAL',
  s4TitleColor: '#ffffff',
  
  // Sección 5: Especificaciones Técnicas
  s5Title: 'ESPECIFICACIONES TÉCNICAS',
  s5TitleColor: '#ffffff',
  
  // Sección 6: Video Demostración
  s6Title: 'DEMOSTRACIÓN DE OPERACIÓN',
  s6TitleColor: '#ffffff',
  s6Desc: 'Ciclo dinámico continuo a velocidad real en planta de producción. Sistema de envasado sin fricciones mecánicas y mínima emisión de ruido.',
  s6DescColor: 'rgba(255, 255, 255, 0.5)',
  s6DescAlign: 'center',
  
  // Sección 7: Configuraciones
  s7Title: 'MÓDULOS DE DOSIFICACIÓN Y CONFIGURACIONES',
  s7TitleColor: '#ffffff',
  s7Desc: 'Versatilidad total. Sistema de cambio modular en bloque que permite alternar sistemas de dosificación en menos de 15 minutos sin interrumpir la consistencia operativa.',
  s7DescColor: 'rgba(255, 255, 255, 0.5)',
  s7DescAlign: 'center',
  
  // Sección Final: CTA
  ctaTitle: '¿LISTO PARA AUTOMATIZAR SU ENVASADO?',
  ctaTitleColor: '#ffffff',
  ctaDesc: 'Nuestro equipo de ingenieros de aplicaciones puede diseñar la solución a la medida exacta de su producto, velocidad requerida y capacidades físicas de su planta.',
  ctaDescColor: 'rgba(255, 255, 255, 0.6)',
  ctaDescAlign: 'center',

  // Listas
  stations: [
    { id: 1, title: 'Recepción de bolsa', desc: 'Alimentación automática de bolsas preformadas desde el almacén horizontal.', iconName: 'Inbox' },
    { id: 2, title: 'Apertura automática', desc: 'Sistema neumático y mecánico de ventosas de vacío que abre la bolsa por arriba y por abajo.', iconName: 'Maximize2' },
    { id: 3, title: 'Verificación de apertura', desc: 'Sensor de detección infrarrojo para asegurar apertura correcta antes de la dosificación.', iconName: 'Eye' },
    { id: 4, title: 'Dosificación', desc: 'Llenado preciso del producto mediante sistema sincronizado (balanza, tornillo o volumétrico).', iconName: 'Layers' },
    { id: 5, title: 'Asentamiento', desc: 'Mesa vibratoria que asienta el producto en el fondo de la bolsa para optimizar espacio.', iconName: 'ArrowDownToLine' },
    { id: 6, title: 'Inyección de nitrógeno', desc: 'Inyección opcional de gas inerte para eliminar oxígeno y extender la vida útil.', iconName: 'Wind' },
    { id: 7, title: 'Sellado térmico', desc: 'Barras de sellado caliente sellan la bolsa a presión constante, seguido de sellado por enfriamiento.', iconName: 'Flame' },
    { id: 8, title: 'Descarga', desc: 'Salida de la bolsa terminada a la banda transportadora de producto terminado.', iconName: 'LogOut' }
  ],

  kpis: [
    { value: '60', unit: 'BOLSAS/MIN', label: 'Rendimiento Máximo', desc: 'Producción continua a alta velocidad' },
    { value: '8', unit: 'ESTACIONES', label: 'Estaciones de Trabajo', desc: 'Secuencia optimizada de envasado' },
    { value: '10-2500 g', unit: 'RANGO DE LLENADO', label: 'Flexibilidad de Peso', desc: 'Múltiples volúmenes soportados' },
    { value: '±1%', unit: 'PRECISIÓN', label: 'Control de Margen', desc: 'Desperdicio de producto casi nulo' },
    { value: '304 SS', unit: 'ACERO INOXIDABLE', label: 'Estructura Robusta', desc: 'Sanidad y limpieza de grado alimenticio' },
    { value: '24/7', unit: 'OPERACIÓN INDUSTRIAL', label: 'Ciclo de Fatiga Extremo', desc: 'Diseñado para turnos continuos' }
  ],

  applications: [
    { name: 'Café', icon: '☕', desc: 'Café en grano o molido con válvula desgasificadora' },
    { name: 'Chocolate', icon: '🍫', desc: 'Chocolates, bombones y confitería fina' },
    { name: 'Nueces', icon: '🥜', desc: 'Frutos secos, almendras, pistaches y semillas' },
    { name: 'Snacks', icon: '🍪', desc: 'Papas fritas, galletas y botanas saladas' },
    { name: 'Pet Food', icon: '🐶', desc: 'Croquetas y alimento seco para mascotas' },
    { name: 'Granola', icon: '🌾', desc: 'Cereales, granola y mezclas de avena' },
    { name: 'Polvos', icon: '🧂', desc: 'Harinas, especias, proteínas y colágeno' },
    { name: 'Dulces', icon: '🍬', desc: 'Gomitas, caramelos y golosinas' }
  ],

  advantages: [
    { title: 'CAMBIO RÁPIDO DE FORMATO', desc: 'Ajuste de guías motorizadas desde el HMI. Configuración sencilla y sin herramientas mecánicas en menos de 10 minutos para distintos tamaños de bolsa.', highlight: 'Eficiencia Operativa' },
    { title: 'OPERACIÓN TOTALMENTE AUTOMÁTICA', desc: 'Monitoreo absoluto mediante PLC de gama alta. Detección inteligente de "no bolsa - no llenado" y "bolsa no abierta - no sellado" para evitar desperdicio.', highlight: 'Cero Desperdicio' },
    { title: 'ALTA PRECISIÓN DE DOSIFICADO', desc: 'Integración sincronizada con sistemas de pesaje multicabezal europeos, asegurando una dosificación exacta al gramo en cada ciclo de llenado.', highlight: 'Ingeniería Alemana' },
    { title: 'DISEÑO SANITARIO PREMIUM', desc: 'Construcción íntegra en acero inoxidable SUS304 sin rincones ciegos, facilitando procesos de limpieza rápida e higiene total en planta.', highlight: 'Certificación Alimenticia' }
  ],

  specs: [
    { param: 'Modelo', value: 'SMQ-DP8 PRO Series (European Standard)' },
    { param: 'Estaciones de trabajo', value: '8 estaciones rotativas de indexación sincrónica servoasistidas' },
    { param: 'Velocidad de envasado', value: '40 - 60 bolsas/min (Sincronizado dinámicamente según densidad)' },
    { param: 'Potencia instalada', value: '3.8 kW | Trifásico 220V / 380V / 440V | 50-60 Hz' },
    { param: 'Presión y flujo neumático', value: '0.6 - 0.8 MPa | Consumo estabilizado de 380 Nl/min' },
    { param: 'Materiales del chasis', value: 'Acero Inoxidable AISI 304 / 316L pulido espejo (Hygienic Design)' },
    { param: 'Formatos de bolsa compatibles', value: 'Doypack (Stand-up), Pillow, 3/4 Sellos, Zipper superior, Fuelle lateral' },
    { param: 'Rango dimensional de envase', value: 'Ancho: 90 - 220 mm | Altura: 100 - 350 mm (Ajuste motorizado)' },
    { param: 'Arquitectura de automatización', value: 'PLC Siemens/Omron + HMI Touchscreen a color de 10.1", Servomotores Yaskawa' },
    { param: 'Nivel de ruido operacional', value: '< 72 dB (Acoplamiento de indexador sumergido en baño de aceite)' },
    { param: 'Gabinete eléctrico', value: 'Diseño estanco IP65 con sistema de aire acondicionado integrado' }
  ],

  configurations: [
    { name: 'Tornillo sinfín para polvos', desc: 'Ideal para dosificación de polvos finos y harinas de forma hermética.' },
    { name: 'Balanza multicabezal', desc: 'Máxima velocidad para granulados, snacks y piezas irregulares.' },
    { name: 'Dosificador volumétrico', desc: 'Ideal para productos homogéneos, legumbres y granos.' },
    { name: 'Llenado de líquidos', desc: 'Válvulas antigoteo para salsas, cremas y fluidos de alta viscosidad.' },
    { name: 'Inyección de nitrógeno', desc: 'Preservación de atmósfera modificada para extender frescura.' },
    { name: 'Detector de metales', desc: 'Inspección de seguridad integrada antes de la salida final.' },
    { name: 'Checkweigher integrado', desc: 'Balanza dinámica de salida con rechazo automático por peso fuera de margen.' }
  ]
};

const envasadorasTypesData = {
  doypack: defaultPageData,
  vertical: {
    heroTitle: 'ENVASADORAS VERTICALES (VFFS)',
    heroTitleColor: '#ffffff',
    heroSubtitle: 'Formado, llenado y sellado automático a partir de bobina.',
    heroSubtitleColor: '#ffffff',
    heroDesc: 'Sistemas de empaque vertical continuo de alta velocidad para bolsas tipo almohadilla, fuelle o de fondo plano. Equipadas con servomotores Yaskawa y control de tensión constante para el arrastre de película sin fricción ni rupturas.',
    heroDescColor: 'rgba(255, 255, 255, 0.6)',
    heroDescAlign: 'left',
    heroMedia: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    heroPoster: '',
    s1Title: '¿CÓMO FUNCIONA EL SISTEMA VERTICAL?',
    s1TitleColor: '#ffffff',
    s1Desc: 'Secuencia de ingeniería síncrona en 8 etapas que transforma bobinas de película plana en bolsas terminadas, llenadas y selladas herméticamente en fracciones de segundo.',
    s1DescColor: 'rgba(255, 255, 255, 0.5)',
    s1DescAlign: 'center',
    s2Title: 'ESPECIFICACIONES DE RENDIMIENTO VFFS',
    s2TitleColor: '#ffffff',
    s3Title: 'APLICACIONES EN ALIMENTOS Y GRANULADOS',
    s3TitleColor: '#ffffff',
    s3Desc: 'Dosificadores verticales de cambio rápido y alta precisión mecánica, compatibles con productos a granel, congelados y polvos finos.',
    s3DescColor: 'rgba(255, 255, 255, 0.5)',
    s3DescAlign: 'center',
    s4Title: 'VENTAJAS DE INGENIERÍA VERTICAL',
    s4TitleColor: '#ffffff',
    s5Title: 'ESPECIFICACIONES TÉCNICAS VFFS',
    s5TitleColor: '#ffffff',
    s6Title: 'VIDEO DEMOSTRACIÓN VFFS',
    s6TitleColor: '#ffffff',
    s6Desc: 'Ciclo dinámico continuo a velocidad real en planta de producción. Sistema de envasado vertical sin fricciones mecánicas.',
    s6DescColor: 'rgba(255, 255, 255, 0.5)',
    s6DescAlign: 'center',
    s7Title: 'MÓDULOS DE DOSIFICACIÓN Y CONFIGURACIONES',
    s7TitleColor: '#ffffff',
    s7Desc: 'Versatilidad total. Sistema de cambio modular en bloque que permite alternar balanzas multicabezal y sinfines en minutos.',
    s7DescColor: 'rgba(255, 255, 255, 0.5)',
    s7DescAlign: 'center',
    ctaTitle: '¿DESEA COTIZAR UNA LÍNEA VERTICAL?',
    ctaTitleColor: '#ffffff',
    ctaDesc: 'Diseñamos el formador de bolsa y el sistema de dosificación a la medida exacta de su producto y velocidad requerida.',
    ctaDescColor: 'rgba(255, 255, 255, 0.6)',
    ctaDescAlign: 'center',
    stations: [
      { id: 1, title: 'Desenrollado de película', desc: 'Soporte neumático desenrolla la película de la bobina con control de tensión constante.', iconName: 'Inbox' },
      { id: 2, title: 'Arrastre por correa', desc: 'Correas de vacío accionadas por servomotores tiran del film de forma constante.', iconName: 'Maximize2' },
      { id: 3, title: 'Formado de tubo', desc: 'La película plana pasa a través del hombro formador doblándose en forma de tubo.', iconName: 'Layers' },
      { id: 4, title: 'Sellado longitudinal', desc: 'Barra calefactoradora vertical sella los dos extremos de la película formando el cilindro.', iconName: 'Flame' },
      { id: 5, title: 'Dosificación en caída', desc: 'El producto cae de forma sincronizada desde el dosificador a través del tubo formador.', iconName: 'ArrowDownToLine' },
      { id: 6, title: 'Inyección de nitrógeno', desc: 'Inyección de gas inerte dentro de la bolsa para desplazar el oxígeno residual.', iconName: 'Wind' },
      { id: 7, title: 'Sellado transversal', desc: 'Mordazas horizontales sellan el extremo superior e inferior cortando la bolsa terminada.', iconName: 'Flame' },
      { id: 8, title: 'Descarga de bolsas', desc: 'Salida de la bolsa a la rampa y transportador inclinado de producto terminado.', iconName: 'LogOut' }
    ],
    kpis: [
      { value: '100', unit: 'BOLSAS/MIN', label: 'Velocidad Máxima', desc: 'Alta productividad en ciclo continuo' },
      { value: '3 servos', unit: 'CONTROL SÍNCRONO', label: 'Ejes Motorizados', desc: 'Precisión absoluta en arrastre de film' },
      { value: '50-420 mm', unit: 'ANCHO BOBINA', label: 'Flexibilidad de Ancho', desc: 'Formatos de bolsa versátiles' },
      { value: '±1 g', unit: 'TOLERANCIA', label: 'Dosificación Exacta', desc: 'Cero desperdicios de material' },
      { value: '304 SS', unit: 'ACERO INOXIDABLE', label: 'Sanidad Total', desc: 'Construcción de grado alimentario' },
      { value: '24/7', unit: 'OPERACIÓN CONTINUA', label: 'Industrial Heavy Duty', desc: 'Diseño para turnos ininterrumpidos' }
    ],
    applications: [
      { name: 'Snacks y Papas', icon: '🍪', desc: 'Papas fritas, botanas extruidas y frituras' },
      { name: 'Granos y Cereales', icon: '🌾', desc: 'Arroz, frijol, lenteja, avena y cereales de desayuno' },
      { name: 'Congelados', icon: '❄️', desc: 'Verduras picadas, fresas congeladas y cubos de hielo' },
      { name: 'Polvos finos', icon: '🧂', desc: 'Harinas, leche en polvo, chocolate y condimentos' },
      { name: 'Alimento de Mascotas', icon: '🐶', desc: 'Croquetas secas para perros y gatos' },
      { name: 'Café en Grano', icon: '☕', desc: 'Café tostado con descarga de gas' },
      { name: 'Confitería', icon: '🍬', desc: 'Caramelos, gomitas y dulces envueltos' },
      { name: 'Productos Secos', icon: '🍪', desc: 'Pastas cortas, sopas instantáneas y condimentos' }
    ],
    advantages: [
      { title: 'CAMBIO DE TUBO RÁPIDO', desc: 'Tubo formador de una sola pieza que se puede cambiar en menos de 5 minutos sin necesidad de herramientas manuales complejas.', highlight: 'Facilidad Operativa' },
      { title: 'CONTROL DE TENSIÓN ACTIVO', desc: 'Detección por rodillo bailarín y freno neumático proporcional que mantiene la tensión del film constante durante aceleraciones.', highlight: 'Cero Arrugas' },
      { title: 'SELLADO TÉRMICO INTELIGENTE', desc: 'Control PID de temperatura en las mordazas rotativas que adapta el calor a la velocidad de la máquina.', highlight: 'Sellado Hermético' },
      { title: 'DISEÑO COMPACTO VERTICAL', desc: 'Optimización de espacio en planta en comparación con líneas horizontales, ideal para alturas de techo de hasta 4.5 metros.', highlight: 'Ahorro de Espacio' }
    ],
    specs: [
      { param: 'Modelo', value: 'SMQ-V420 Heavy Duty VFFS' },
      { param: 'Servomotores', value: '3 Servos Yaskawa de alta dinámica' },
      { param: 'Velocidad de envasado', value: '60 - 100 bolsas/min (Variable según producto)' },
      { param: 'Potencia instalada', value: '4.5 kW | Trifásico 220V/380V/440V' },
      { param: 'Presión neumática', value: '0.6 MPa | Consumo 420 Nl/min' },
      { param: 'Ancho máximo de bobina', value: '420 mm (Diámetro máximo 400 mm)' },
      { param: 'Tipos de bolsa', value: 'Almohadilla, fuelle lateral, fondo plano, 4 sellos (Quad seal)' },
      { param: 'Controlador de sistema', value: 'PLC Siemens S7-1200 con pantalla táctil HMI color de 10"' },
      { param: 'Material de estructura', value: 'Acero Inoxidable SUS304 / Aluminio anodizado' },
      { param: 'Precisión de fotocelda', value: '±0.2 mm mediante lectura de marca de contraste óptico' },
      { param: 'Protección de gabinete', value: 'Gabinete estanco IP65 para lavado a presión' }
    ],
    configurations: [
      { name: 'Inyección de Nitrógeno', desc: 'Eliminación del oxígeno dentro de la bolsa para aumentar la frescura del producto.' },
      { name: 'Dispositivo de Fuelle Lateral', desc: 'Forma pliegues en los laterales de la bolsa para un aspecto más compacto.' },
      { name: 'Muesca Abre-Fácil (Easy Open)', desc: 'Corte neumático en esquina o borde que facilita la apertura manual.' },
      { name: 'Perforación de Colgador (Euroslot)', desc: 'Perfora un gancho tipo Euro en el sellado superior para exhibición vertical.' }
    ]
  },
  flowpack: {
    heroTitle: 'ENVASADORAS HORIZONTALES FLOWPACK',
    heroTitleColor: '#ffffff',
    heroSubtitle: 'Empaque horizontal continuo de alta velocidad para piezas sólidas individuales.',
    heroSubtitleColor: '#ffffff',
    heroDesc: 'Solución automática para envoltura flowpack de galletas, barras de chocolate, panadería, jabones y dispositivos médicos. Alimentación indexada inteligente por cadena y mordazas rotativas de sellado hermético.',
    heroDescColor: 'rgba(255, 255, 255, 0.6)',
    heroDescAlign: 'left',
    heroMedia: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
    heroPoster: '',
    s1Title: '¿CÓMO FUNCIONA EL SISTEMA FLOWPACK?',
    s1TitleColor: '#ffffff',
    s1Desc: 'Proceso de envoltura horizontal síncrona en el que la película se pliega continuamente alrededor del producto antes del sellado rotativo transversal.',
    s1DescColor: 'rgba(255, 255, 255, 0.5)',
    s1DescAlign: 'center',
    s2Title: 'ESPECIFICACIONES FLOWPACK DE ALTO RENDIMIENTO',
    s2TitleColor: '#ffffff',
    s3Title: 'APLICACIONES EN CONSUMO MASIVO Y PANADERÍA',
    s3TitleColor: '#ffffff',
    s3Desc: 'Envolvedoras flowpack ideales para el sellado higiénico e individual de piezas sólidas y agrupaciones.',
    s3DescColor: 'rgba(255, 255, 255, 0.5)',
    s3DescAlign: 'center',
    s4Title: 'VENTAJAS DE ENVOLTURA FLOWPACK',
    s4TitleColor: '#ffffff',
    s5Title: 'ESPECIFICACIONES TÉCNICAS FLOWPACK',
    s5TitleColor: '#ffffff',
    s6Title: 'VIDEO DEMOSTRACIÓN FLOWPACK',
    s6TitleColor: '#ffffff',
    s6Desc: 'Ciclo dinámico de envasado flowpack horizontal a velocidad real en planta.',
    s6DescColor: 'rgba(255, 255, 255, 0.5)',
    s6DescAlign: 'center',
    s7Title: 'MÓDULOS DE ENVOLTURA ADICIONALES',
    s7TitleColor: '#ffffff',
    s7Desc: 'Sistemas de dosificación rotativa y alimentadores inteligentes en línea.',
    s7DescColor: 'rgba(255, 255, 255, 0.5)',
    s7DescAlign: 'center',
    ctaTitle: '¿DESEA COTIZAR UNA LÍNEA FLOWPACK?',
    ctaTitleColor: '#ffffff',
    ctaDesc: 'Diseñamos la envolvedora horizontal exacta para sus dimensiones de producto, velocidad deseada y tipo de película.',
    ctaDescColor: 'rgba(255, 255, 255, 0.6)',
    ctaDescAlign: 'center',
    stations: [
      { id: 1, title: 'Alimentación lineal', desc: 'Banda transportadora de cadena con empujadores regulables introduce el producto.', iconName: 'Inbox' },
      { id: 2, title: 'Formación del túnel', desc: 'La película plana pasa a través de la caja formadora envolviendo el producto por arriba.', iconName: 'Maximize2' },
      { id: 3, title: 'Detección por fotocelda', desc: 'Sensor lee la marca óptica del film para sincronizar el corte del sachet.', iconName: 'Eye' },
      { id: 4, title: 'Sellado inferior', desc: 'Rodillos calefactados giran y sellan longitudinalmente la aleta inferior de la película.', iconName: 'Flame' },
      { id: 5, title: 'Arrastre de film', desc: 'Rodillos motrices avanzan de forma continua la película junto con los productos.', iconName: 'Layers' },
      { id: 6, title: 'Inyección de alcohol/nitrógeno', desc: 'Inyección opcional de gas o alcohol microdosificado para extender conservación.', iconName: 'Wind' },
      { id: 7, title: 'Sellado rotativo transversal', desc: 'Mordazas rotativas transversales sellan y cortan los extremos del empaque.', iconName: 'Flame' },
      { id: 8, title: 'Salida de producto', desc: 'Banda inclinada entrega el producto flowpack terminado a la línea de encartonado.', iconName: 'LogOut' }
    ],
    kpis: [
      { value: '200', unit: 'ENVASES/MIN', label: 'Rendimiento Máximo', desc: 'Envoltura continua ultrarrápida' },
      { value: 'Rotativo', unit: 'TIPO DE SELLADO', label: 'Mordazas Síncronas', desc: 'Corte térmico en movimiento continuo' },
      { value: '350 mm', unit: 'ANCHO BOBINA', label: 'Ancho Máximo', desc: 'Formatos versátiles de film plástico' },
      { value: 'Cero film', unit: 'NO PROD - NO BAG', label: 'Control Inteligente', desc: 'Evita desperdiciar película vacía' },
      { value: '304 SS', unit: 'ACERO INOXIDABLE', label: 'Higiene y Limpieza', desc: 'Banda desmontable y diseño sanitario' },
      { value: '24/7', unit: 'OPERACIÓN CONTINUA', label: 'Ciclo de Fatiga Extremo', desc: 'Componentes de alta durabilidad' }
    ],
    applications: [
      { name: 'Panadería y Galletas', icon: '🍞', desc: 'Pan de molde, panqués, tortillas, galletas y barras de cereal' },
      { name: 'Barras y Chocolates', icon: '🍫', desc: 'Chocolates individuales, mazapanes y barras de proteína' },
      { name: 'Jabones y Cosméticos', icon: '🪥', desc: 'Jabones de tocador, esponjas, toallitas húmedas y cosméticos' },
      { name: 'Dispositivos Médicos', icon: '🧪', desc: 'Jeringas, gasas, mascarillas y material quirúrgico individual' },
      { name: 'Cubiertos Desechables', icon: '🍴', desc: 'Kits de cubiertos para aerolíneas o comida rápida' },
      { name: 'Dulces y Confitería', icon: '🍬', desc: 'Gomitas agrupadas, malvaviscos y alfajores' },
      { name: 'Tarjetas y Promociones', icon: '💳', desc: 'Empaque individual de folletos, tarjetas y juguetes' },
      { name: 'Repuestos mecánicos', icon: '🔩', desc: 'Tornillos, juntas de hule y pequeñas piezas ferrosas' }
    ],
    advantages: [
      { title: 'SISTEMA NO PRODUCTO - NO BOLSA', desc: 'Los sensores detienen la dispensación de film si se detecta un hueco en la alimentación de productos, eliminando mermas.', highlight: 'Cero Mermas' },
      { title: 'CAMBIO DE FORMATO DIGITAL', desc: 'Parámetros guardados en receta dentro de la HMI: longitud de bolsa, velocidad y temperaturas se ajustan con un botón.', highlight: 'Ajuste Electrónico' },
      { title: 'MORDACAS ROTATIVAS DOBLES', desc: 'Opción de colocar mordazas dobles o triples en el cabezal para duplicar la velocidad sin aumentar el desgaste físico de los ejes.', highlight: 'Alta Velocidad' },
      { title: 'FACILIDAD DE HIGIENIZACIÓN', desc: 'La banda de alimentación lineal cuenta con empujadores desmontables y bandejas de recolección de migas de acero inoxidable.', highlight: 'Limpieza Rápida' }
    ],
    specs: [
      { param: 'Modelo', value: 'SMQ-FP350 Horizontal Flowpack' },
      { param: 'Servomotores', value: '2 o 3 Servomotores independientes sincronizados' },
      { param: 'Velocidad de envasado', value: '40 - 200 bolsas/min (Según dimensiones del producto)' },
      { param: 'Potencia instalada', value: '3.2 kW | Monofásico 220V | 50-60 Hz' },
      { param: 'Ancho máximo de bobina', value: '350 mm (Película OPP, CPP, aluminizada, coextruida)' },
      { param: 'Longitud de bolsa', value: '65 - 330 mm (Ajustable desde HMI)' },
      { param: 'Dimensiones máx. de producto', value: 'Ancho: 140 mm | Altura: 60 mm' },
      { param: 'Controlador de sistema', value: 'Control electrónico por microprocesador integrado / PLC Siemens' },
      { param: 'Materiales del chasis', value: 'Acero Inoxidable SUS304 en contacto con producto' },
      { param: 'Precisión de corte', value: '±0.5 mm mediante lectura por fotocelda óptica de alta velocidad' },
      { param: 'Peso de la máquina', value: '≈ 650 kg' }
    ],
    configurations: [
      { name: 'Alimentador Inteligente (Smart Belt)', desc: 'Banda acumuladora inteligente que alimenta las piezas en el paso exacto del flowpack.' },
      { name: 'Codificador Térmico / Hot Stamping', desc: 'Imprime lote y fecha de caducidad en el área especificada del film.' },
      { name: 'Módulo de Inyección de Alcohol', desc: 'Pulveriza alcohol grado alimenticio dentro del envase para conservar frescura.' },
      { name: 'Mordazas Especiales de Alta Costura', desc: 'Mordazas diseñadas para sellar películas gruesas o con recubrimiento de aluminio.' }
    ]
  },
  llenadoras: {
    heroTitle: 'LLENADORAS ROTATIVAS DE LÍQUIDOS',
    heroTitleColor: '#ffffff',
    heroSubtitle: 'Dosificación de alta precisión para líquidos, cremas y geles en botellas rígidas.',
    heroSubtitleColor: '#ffffff',
    heroDesc: 'Líneas automáticas rotativas de envasado de fluidos de media y alta viscosidad. Sistemas de pistón servocontrolado y boquillas sumergibles que aseguran un envasado higiénico con cero goteo y limpieza CIP automatizada.',
    heroDescColor: 'rgba(255, 255, 255, 0.6)',
    heroDescAlign: 'left',
    heroMedia: 'https://images.unsplash.com/photo-1659406661027-ac7dd0455011',
    heroPoster: '',
    s1Title: '¿CÓMO FUNCIONA LA LLENADORA ROTATIVA?',
    s1TitleColor: '#ffffff',
    s1Desc: 'Proceso continuo de posicionamiento de botellas, dosificación por pistón volumétrico y taponado automático en estrella síncrona.',
    s1DescColor: 'rgba(255, 255, 255, 0.5)',
    s1DescAlign: 'center',
    s2Title: 'ESPECIFICACIONES DE ENVASADO DE FLUIDOS',
    s2TitleColor: '#ffffff',
    s3Title: 'APLICACIONES EN ALIMENTOS, LÁCTEOS Y COSMÉTICA',
    s3TitleColor: '#ffffff',
    s3Desc: 'Llenadoras rotativas de alta eficiencia diseñadas para envases de PET, PEAD y Vidrio.',
    s3DescColor: 'rgba(255, 255, 255, 0.5)',
    s3DescAlign: 'center',
    s4Title: 'VENTAJAS DE DOSIFICACIÓN ROTATIVA',
    s4TitleColor: '#ffffff',
    s5Title: 'ESPECIFICACIONES TÉCNICAS DE LLENADO',
    s5TitleColor: '#ffffff',
    s6Title: 'VIDEO DEMOSTRACIÓN LLENADORA',
    s6TitleColor: '#ffffff',
    s6Desc: 'Demostración de llenado rotativo a alta velocidad con boquillas antigoteo.',
    s6DescColor: 'rgba(255, 255, 255, 0.5)',
    s6DescAlign: 'center',
    s7Title: 'SISTEMAS DE TAPONADO Y LIMPIEZA',
    s7TitleColor: '#ffffff',
    s7Desc: 'Cabezales de taponado magnético multiformato y sistemas CIP integrados.',
    s7DescColor: 'rgba(255, 255, 255, 0.5)',
    s7DescAlign: 'center',
    ctaTitle: '¿DESEA COTIZAR UNA LÍNEA DE LLENADO?',
    ctaTitleColor: '#ffffff',
    ctaDesc: 'Diseñamos la llenadora y taponadora exacta según la viscosidad de su producto, velocidad en botella y formato de tapa.',
    ctaDescColor: 'rgba(255, 255, 255, 0.6)',
    ctaDescAlign: 'center',
    stations: [
      { id: 1, title: 'Alimentación por sinfín', desc: 'Tornillo espaciador lateral alinea y espacia las botellas de entrada.', iconName: 'Inbox' },
      { id: 2, title: 'Estrella de indexación', desc: 'Estrella giratoria transfiere las botellas directamente debajo de las boquillas.', iconName: 'Maximize2' },
      { id: 3, title: 'Descenso de boquillas', desc: 'Boquillas descienden automáticamente hasta el fondo de la botella antes de dosificar.', iconName: 'ArrowDownToLine' },
      { id: 4, title: 'Dosificación por pistón', desc: 'Pistón servocontrolado inyecta el volumen exacto de producto sin espuma.', iconName: 'Layers' },
      { id: 5, title: 'Corte antigoteo', desc: 'Sistema neumático aspira la gota residual al finalizar el llenado.', iconName: 'Wind' },
      { id: 6, title: 'Orientación de tapas', desc: 'Tolva vibradora externa entrega las tapas orientadas a la rampa de recogida.', iconName: 'Maximize2' },
      { id: 7, title: 'Taponado magnético', desc: 'Cabezal magnético coloca la tapa y aplica el torque de rosca exacto.', iconName: 'Flame' },
      { id: 8, title: 'Salida de botellas', desc: 'Estrella de salida deposita las botellas envasadas en la banda de etiquetado.', iconName: 'LogOut' }
    ],
    kpis: [
      { value: '120', unit: 'BOTELLAS/MIN', label: 'Capacidad de Llenado', desc: 'Operación continua estable' },
      { value: '12 boquillas', unit: 'SISTEMA ROTATIVO', label: 'Boquillas de Precisión', desc: 'Llenado paralelo sincronizado' },
      { value: '±0.5%', unit: 'PRECISIÓN', label: 'Control Volumétrico', desc: 'Mínimo desperdicio de producto' },
      { value: 'CIP Ready', unit: 'AUTO-LAVADO', label: 'Diseño Sanitario', desc: 'Conexión fácil a líneas de limpieza CIP' },
      { value: '316L SS', unit: 'ACERO SANITARIO', label: 'Grado Quirúrgico', desc: 'Acero inoxidable de alta resistencia química' },
      { value: 'HMI 10"', unit: 'CONTROL TOUCH', label: 'Recetas de Producto', desc: 'Cambios de volumen sencillos' }
    ],
    applications: [
      { name: 'Jugos y Bebidas', icon: '🍼', desc: 'Jugos de frutas, agua purificada, tés e isotónicos' },
      { name: 'Salsas y Aderezos', icon: '🥫', desc: 'Mayonesa, aderezos para ensalada, kétchup y aceites comestibles' },
      { name: 'Lácteos Líquidos', icon: '🥛', desc: 'Leche fresca, yogur bebible y cremas para café' },
      { name: 'Cosméticos y Champú', icon: '🧴', desc: 'Champú, cremas corporales, jabón de manos y acondicionador' },
      { name: 'Líquidos Corrosivos', icon: '🧪', desc: 'Limpiadores domésticos, detergentes líquidos y cloro' },
      { name: 'Aceites Lubricantes', icon: '🛢️', desc: 'Aceites de motor, aditivos y lubricantes industriales' },
      { name: 'Mieles y Jabeas', icon: '🍯', desc: 'Miel de abeja, jarabes farmacéuticos y jarabe de maíz' },
      { name: 'Vinos y Licores', icon: '🍷', desc: 'Llenado por gravedad asistido de licores y vinos' }
    ],
    advantages: [
      { title: 'SISTEMA DE BOQUILLAS SUMERGIBLES', desc: 'Las boquillas descienden al fondo de la botella y suben conforme se llena el envase, evitando turbulencias y espuma.', highlight: 'Llenado Limpio' },
      { title: 'TORQUE DE TAPADO CONSTANTE', desc: 'Cabezales con embrague magnético ajustable que aplican la misma fuerza de cierre en cada botella sin dañar la rosca.', highlight: 'Taponado Perfecto' },
      { title: 'CONEXIÓN CIP DE AUTO-LAVADO', desc: 'Copas de lavado CIP basculantes que se colocan bajo las boquillas para recircular solución de limpieza de forma automática.', highlight: 'Sanidad Garantizada' },
      { title: 'DOSIFICADO POR SERVO-PISTÓN', desc: 'Permite regular el volumen de dosificación directamente desde la pantalla táctil eliminando ajustes mecánicos manuales.', highlight: 'Cambio Digital' }
    ],
    specs: [
      { param: 'Modelo', value: 'SMQ-LF12 Rotary Filling Line' },
      { param: 'Número de boquillas', value: '12 boquillas de dosificación síncrona (Opción 16-24)' },
      { param: 'Velocidad nominal', value: '80 - 120 botellas/min (Formatos de 250 ml a 1000 ml)' },
      { param: 'Precisión de dosificado', value: '±0.5% del volumen objetivo' },
      { param: 'Rango de llenado', value: '100 ml - 1,500 ml' },
      { param: 'Consumo y potencia', value: '5.5 kW | Trifásico 3F 220V/380V/440V' },
      { param: 'Suministro de aire', value: '0.6 MPa | Consumo neumático 280 Nl/min' },
      { param: 'Material de contacto', value: 'Acero Inoxidable AISI 316L / Sellados de Vitón aprobados FDA' },
      { param: 'Diámetro de cuello de botella', value: '20 mm - 55 mm' },
      { param: 'Controlador de sistema', value: 'PLC Siemens S7-1500 con HMI Touch de 10"' },
      { param: 'Tipo de taponado', value: 'Pick & Place con torque magnético ajustable' }
    ],
    configurations: [
      { name: 'Alimentador de Tapas Elevador', desc: 'Elevador de banda que alimenta la tolva de tapas de forma automática.' },
      { name: 'Módulo de Inyección de Nitrógeno Líquido', desc: 'Dosifica una gota de nitrógeno líquido para rigidizar botellas PET delgadas.' },
      { name: 'Boquillas Antigoteo de Vacío', desc: 'Sistema de vacío asistido que succiona la última gota tras el llenado.' },
      { name: 'Cabina de Flujo Laminar HEPA', desc: 'Crea un ambiente estéril sobre la zona de llenado para empaque higiénico.' }
    ]
  },
  multipistas: {
    heroTitle: 'ENVASADORAS MULTIPISTAS DE SACHETS',
    heroTitleColor: '#ffffff',
    heroSubtitle: 'Empaque vertical multipistas de alta velocidad para formatos stick pack y sachet monodosis.',
    heroSubtitleColor: '#ffffff',
    heroDesc: 'Envasadora industrial multipistas para el sellado a 4 caras o formato stick de polvos, geles, líquidos y granulados. Operación paralela de hasta 10 pistas para máxima eficiencia en empaques monodosis.',
    heroDescColor: 'rgba(255, 255, 255, 0.6)',
    heroDescAlign: 'left',
    heroMedia: 'https://images.unsplash.com/photo-1659167889361-890c288f9dca',
    heroPoster: '',
    s1Title: '¿CÓMO FUNCIONA EL SISTEMA MULTIPISTAS?',
    s1TitleColor: '#ffffff',
    s1Desc: 'Proceso automático de corte longitudinal de bobina, formado de múltiples mangas paralelas, sellado vertical y dosificación simultánea.',
    s1DescColor: 'rgba(255, 255, 255, 0.5)',
    s1DescAlign: 'center',
    s2Title: 'ESPECIFICACIONES MULTIPISTAS DE ALTA VELOCIDAD',
    s2TitleColor: '#ffffff',
    s3Title: 'APLICACIONES EN ALIMENTOS, FARMA Y COSMÉTICA',
    s3TitleColor: '#ffffff',
    s3Desc: 'Formatos monodosis stick pack y sachet de cambio rápido para geles, cremas y polvos.',
    s3DescColor: 'rgba(255, 255, 255, 0.5)',
    s3DescAlign: 'center',
    s4Title: 'VENTAJAS DE PRODUCCIÓN MULTIPISTAS',
    s4TitleColor: '#ffffff',
    s5Title: 'ESPECIFICACIONES TÉCNICAS MULTIPISTAS',
    s5TitleColor: '#ffffff',
    s6Title: 'VIDEO DEMOSTRACIÓN MULTIPISTAS',
    s6TitleColor: '#ffffff',
    s6Desc: 'Ciclo dinámico de envasado multipistas a alta velocidad en paralelo.',
    s6DescColor: 'rgba(255, 255, 255, 0.5)',
    s6DescAlign: 'center',
    s7Title: 'MÓDULOS DE DOSIFICACIÓN EN PARALELO',
    s7TitleColor: '#ffffff',
    s7Desc: 'Sistemas de dosificación oscilante por pistón o tazas volumétricas para múltiples pistas.',
    s7DescColor: 'rgba(255, 255, 255, 0.5)',
    s7DescAlign: 'center',
    ctaTitle: '¿DESEA COTIZAR UNA LÍNEA MULTIPISTAS?',
    ctaTitleColor: '#ffffff',
    ctaDesc: 'Diseñamos la envasadora multipistas a la medida de su cantidad de pistas requerida, tipo de sachet y velocidad de salida.',
    ctaDescColor: 'rgba(255, 255, 255, 0.6)',
    ctaDescAlign: 'center',
    stations: [
      { id: 1, title: 'Bobina autocentrada', desc: 'Desenrollado automático de bobina de película ancha con sensor de borde.', iconName: 'Inbox' },
      { id: 2, title: 'Corte longitudinal', desc: 'Cuchillas circulares rotativas cortan el film en múltiples tiras paralelas.', iconName: 'Maximize2' },
      { id: 3, title: 'Cuello formador', desc: 'Cada tira de película pasa por un hombro individual formando el sachet.', iconName: 'Layers' },
      { id: 4, title: 'Sellado vertical', desc: 'Mordazas térmicas verticales oscilantes sellan los laterales de cada pista.', iconName: 'Flame' },
      { id: 5, title: 'Dosificación en paralelo', desc: 'Múltiples inyectores o tazas dosifican simultáneamente en cada manga.', iconName: 'ArrowDownToLine' },
      { id: 6, title: 'Impresión por láser/inkjet', desc: 'Marcación de fecha y lote individual por pista de forma integrada.', iconName: 'Wind' },
      { id: 7, title: 'Sellado transversal', desc: 'Mordazas horizontales realizan el sellado final superior e inferior.', iconName: 'Flame' },
      { id: 8, title: 'Guillotina y salida', desc: 'Cuchillas mecánicas cortan los sobres individuales depositándolos en la salida.', iconName: 'LogOut' }
    ],
    kpis: [
      { value: '320', unit: 'SACHETS/MIN', label: 'Capacidad de Salida', desc: 'Alta productividad en tirajes masivos' },
      { value: '8 pistas', unit: 'TRABAJO PARALELO', label: 'Estructura Modular', desc: 'Multiplica la eficiencia productiva' },
      { value: '4 sellos', unit: 'TIPO DE ENVASE', label: 'Stick Pack o Sachet', desc: 'Acabado estético y hermético' },
      { value: '±1.5%', unit: 'TOLERANCIA', label: 'Dosificación Precisa', desc: 'Cero desperdicios de ingrediente' },
      { value: '304/316 SS', unit: 'ACERO SANITARIO', label: 'Grado Alimentario/Farma', desc: 'Sanidad extrema y limpieza garantizada' },
      { value: 'HMI 10"', unit: 'CONTROL DEDICADO', label: 'Parámetros Síncronos', desc: 'Ajuste de velocidad y temperaturas general' }
    ],
    applications: [
      { name: 'Endulzantes y Café', icon: '☕', desc: 'Stevia, azúcar, splenda y café soluble stick pack' },
      { name: 'Aderezos Monodosis', icon: '🍟', desc: 'Kétchup, mayonesa, mostaza y aderezos líquidos para ensalada' },
      { name: 'Polvos Farmacéuticos', icon: '💊', desc: 'Medicamentos solubles en sobre, analgésicos y sales de hidratación' },
      { name: 'Cosméticos y Geles', icon: '🧴', desc: 'Crema facial en sachet, champú de muestra, gel sanitizante' },
      { name: 'Colágeno y Proteínas', icon: '🌾', desc: 'Suplementos alimenticios secos en empaque stick' },
      { name: 'Líquidos y Jarabes', icon: '🍼', desc: 'Jaras para la tos y suplementos líquidos monodosis' },
      { name: 'Especias y Condimentos', icon: '🧂', desc: 'Sal de mesa, pimienta, orégano y chiles secos' },
      { name: 'Productos en Polvo', icon: '🧂', desc: 'Polvos finos e ingredientes secos varios' }
    ],
    advantages: [
      { title: 'ALTA EFICIENCIA EN PARALELO', desc: 'Multiplica por 8 o 10 la capacidad productiva de una envasadora monopista convencional, reduciendo costos operativos.', highlight: 'Alta Velocidad' },
      { title: 'CORTE EN ZIGZAG CON MUESCA', desc: 'Corte de guillotina especial que proporciona un acabado estético profesional y una apertura fácil sin esfuerzo.', highlight: 'Experiencia de Uso' },
      { title: 'GABINETE ELÉCTRICO DE SEGURIDAD', desc: 'Gabinete estanco hermético aislado térmicamente para resistir los lavados a alta presión característicos de plantas farmacéuticas.', highlight: 'Certificación Farma' },
      { title: 'CAMBIO DE PISTAS SENCILLO', desc: 'Diseño modular que permite anular pistas de forma digital desde el HMI si alguna bobina presenta defectos.', highlight: 'Operación Inteligente' }
    ],
    specs: [
      { param: 'Modelo', value: 'SMQ-MS8 Multi-lane Sachet' },
      { param: 'Número de pistas', value: '8 pistas de envasado síncrono (Configurable de 4 a 10)' },
      { param: 'Velocidad de envasado', value: '40 - 60 ciclos/min por pista (Hasta 480 sachets/min)' },
      { param: 'Potencia instalada', value: '6.0 kW | Trifásico 220V/380V/440V' },
      { param: 'Presión de aire comprimido', value: '0.6 - 0.8 MPa | Consumo neumático 350 Nl/min' },
      { param: 'Ancho máximo de bobina', value: '600 mm (Bobina única que se corta en tiras)' },
      { param: 'Ancho de sachet individual', value: '15 mm - 100 mm' },
      { param: 'Longitud de sachet', value: '50 mm - 180 mm (Ajustable dinámicamente)' },
      { param: 'Material de contacto', value: 'Acero Inoxidable AISI 316L pulido espejo' },
      { param: 'Precisión de la dosificación', value: '±1.5% del volumen objetivo por pista' },
      { param: 'Dimensiones físicas', value: '≈ 1650 x 1400 x 2400 mm' }
    ],
    configurations: [
      { name: 'Dosificador de Pistón para Líquidos', desc: 'Múltiples cilindros neumáticos de dosificación de geles y fluidos.' },
      { name: 'Corte con formas redondeadas', desc: 'Cuchillas especiales para redondear las esquinas de los sachets.' },
      { name: 'Alimentador de polvo por vacío', desc: 'Sistemas neumáticos que rellenan automáticamente la tolva de polvos.' },
      { name: 'Sistema de Muesca Abre-Fácil (Tear Notch)', desc: 'Corta un pequeño corte transversal para fácil rasgado.' }
    ]
  }
};

const StatCounter = ({ target, suffix = '', duration = 2000, trigger = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const num = parseInt(target, 10);
    if (isNaN(num)) {
      setCount(target);
      return;
    }

    let start = 0;
    const end = num;
    // Reset back to 0 on trigger change
    setCount(0);

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth organic calculator deceleration
      const easeOutQuad = percentage * (2 - percentage);
      const currentCount = Math.floor(easeOutQuad * (end - start) + start);
      
      setCount(currentCount);

      if (progress < duration) {
        window.requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const animId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animId);
  }, [target, duration, trigger]);

  const num = parseInt(target, 10);
  if (isNaN(num)) {
    return <span className="text-[#FFD700] tracking-wide animate-pulse">{target}</span>;
  }

  return <span>{count}{suffix}</span>;
};

const StatCard = ({ target, suffix = '', label, colSpan = "col-span-1" }) => {
  const [trigger, setTrigger] = useState(0);
  
  return (
    <div 
      className={`flex flex-col items-center self-center cursor-pointer transition-all duration-300 transform hover:scale-110 group ${colSpan}`}
      onMouseEnter={() => setTrigger(prev => prev + 1)}
    >
      <span className="text-3xl md:text-4xl font-black text-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,0.4)] tracking-tight transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
        <StatCounter target={target} suffix={suffix} trigger={trigger} />
      </span>
      <span className="text-[10px] font-black uppercase tracking-wider text-white/70 mt-2 transition-colors duration-300 group-hover:text-[#FFD700]">
        {label}
      </span>
    </div>
  );
};

const EnvasadoraDoypack = () => {
  const { cmsState, updatePages, isEditorMode } = useCMS();
  const fileInputRef = useRef(null);
  const posterInputRef = useRef(null);

  // Intentamos obtener la página de la envasadora del CMS
  const envasadorasPage = cmsState.pages.find(p => p.id === 'envasadoras');
  
  // Si no existe, inicializarla en el CMS con los datos por defecto
  useEffect(() => {
    if (!envasadorasPage) {
      const initialPageData = {
        id: 'envasadoras',
        title: 'Envasadoras Rotativas',
        slug: '/envasadoras',
        modules: [
          {
            id: 'doypack-data',
            type: 'doypack-product',
            data: defaultPageData
          }
        ]
      };
      updatePages([...cmsState.pages, initialPageData]);
    }
  }, [envasadorasPage, cmsState.pages, updatePages]);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeType = searchParams.get('type') || 'doypack';

  const activeColor = '#FFD700';
  const activeColorLight = 'rgba(255, 215, 0, 0.15)';
  const activeColorText = 'text-[#FFD700]';
  const activeColorBorder = 'border-[#FFD700]';
  const activeColorBg = 'bg-[#FFD700]';

  // Si aún no se inicializa, usar local
  const baseData = envasadorasPage?.modules?.[0]?.data || defaultPageData;
  const data = activeType === 'doypack'
    ? baseData
    : (baseData.subtypes?.[activeType] || envasadorasTypesData[activeType] || defaultPageData);

  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState('hero');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingPoster, setIsUploadingPoster] = useState(false);

  useEffect(() => {
    setActiveStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeType]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const handleUpdate = (key, value) => {
    let updatedData;
    if (activeType === 'doypack') {
      updatedData = { ...baseData, [key]: value };
    } else {
      const subtypes = baseData.subtypes || {};
      const currentSubtypeData = subtypes[activeType] || envasadorasTypesData[activeType] || {};
      const updatedSubtypeData = { ...currentSubtypeData, [key]: value };
      updatedData = {
        ...baseData,
        subtypes: {
          ...subtypes,
          [activeType]: updatedSubtypeData
        }
      };
    }
    const updatedPage = {
      id: 'envasadoras',
      title: 'Envasadoras Rotativas',
      slug: '/envasadoras',
      modules: [
        {
          id: 'doypack-data',
          type: 'doypack-product',
          data: updatedData
        }
      ]
    };
    const otherPages = cmsState.pages.filter(p => p.id !== 'envasadoras');
    updatePages([...otherPages, updatedPage]);
  };

  const handleMediaUpload = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        if (field === 'heroMedia') setIsUploading(true);
        if (field === 'heroPoster') setIsUploadingPoster(true);

        const url = await uploadFile(file, "media");
        handleUpdate(field, url);
      } catch (err) {
        console.error("Error al subir archivo:", err);
        alert('No se pudo subir el archivo. Verifica tu conexión.');
      } finally {
        setIsUploading(false);
        setIsUploadingPoster(false);
      }
    }
  };

  const handleAppImageUpload = async (e, idx) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUploading(true);
        const url = await uploadFile(file, "media");
        
        const newApps = [...applicationsList];
        newApps[idx] = { ...newApps[idx], imageUrl: url };
        handleUpdate('applications', newApps);
      } catch (err) {
        console.error("Error al subir imagen de aplicación:", err);
        alert('No se pudo subir la imagen.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Listas de datos recuperadas del CMS
  const stationsList = data.stations || defaultPageData.stations;
  const kpisList = data.kpis || defaultPageData.kpis;
  const applicationsList = data.applications || defaultPageData.applications;
  const advantagesList = data.advantages || defaultPageData.advantages;
  const specsList = data.specs || defaultPageData.specs;
  const configurationsList = data.configurations || defaultPageData.configurations;

  const currentMedia = data.heroMedia || '/rotary_doypack_machine.png';
  const isVideo = !!(currentMedia.match(/\.(mp4|webm|ogg|mov|mkv)$/i) || currentMedia.includes('video/'));

  return (
    <>
      <Helmet>
        <title>Envasadoras Industriales de Alto Rendimiento | SMQ Industrial Systems</title>
        <meta
          name="description"
          content="Líneas automáticas de envasado industrial. Soluciones premium Doypack, Vertical VFFS, Flowpack, Llenadoras de Líquidos y Multipistas Stick Pack bajo estándares OEM."
        />
      </Helmet>

      <style>{`
        .dynamic-hover-card:hover {
          border-color: ${activeColor}4D !important;
          box-shadow: 0 0 30px ${activeColor}1F !important;
        }
        .dynamic-hover-text:hover {
          color: ${activeColor} !important;
          text-shadow: 0 0 15px ${activeColor}60 !important;
        }
        .dynamic-group:hover .dynamic-group-icon {
          background-color: ${activeColor}1A !important;
          border-color: ${activeColor}33 !important;
          color: ${activeColor} !important;
        }
        .dynamic-group:hover .dynamic-group-title {
          color: ${activeColor} !important;
        }
        .dynamic-table-row {
          border-left: 4px solid transparent !important;
        }
        .dynamic-table-row:hover {
          border-left-color: ${activeColor} !important;
          background-color: ${activeColor}0A !important;
        }
      `}</style>

      <div className="min-h-screen bg-[#080B12] text-white overflow-hidden font-['Poppins'] flex flex-col relative">
        {/* Glows Ambientales Decorativos (Dinamizados) */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none -z-10 transition-all duration-1000" style={{ backgroundColor: `${activeColor}08` }} />
        <div className="absolute top-[40%] right-10 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none -z-10 transition-all duration-1000" style={{ backgroundColor: `${activeColor}08` }} />
        <div className="absolute bottom-[10%] left-5 w-[400px] h-[400px] rounded-full blur-[130px] pointer-events-none -z-10 transition-all duration-1000" style={{ backgroundColor: `${activeColor}08` }} />

        {/* ========================================================================= */}
        {/* SLIDING premium cms panel on the right side if isEditorMode is active */}
        {/* ========================================================================= */}
        {isEditorMode && (
          <div className="fixed top-28 right-6 z-[990] w-[380px] bg-[#0B0F19]/95 border border-white/10 p-5 rounded-2xl shadow-2xl backdrop-blur-md overflow-y-auto max-h-[75vh] flex flex-col gap-4 text-left animate-slide-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-[#FFD700]">
                <Settings size={18} className="animate-spin [animation-duration:15s]" />
                <span className="font-black text-xs uppercase tracking-widest text-white">Editor de Envasadoras</span>
              </div>
              <span className="bg-[#FFD700]/20 text-[#FFD700] text-[9px] font-black uppercase px-2 py-0.5 rounded border border-[#FFD700]/30">SMQ Live</span>
            </div>

            {/* Editor Tabs Navigation */}
            <div className="flex bg-white/5 p-1 rounded-lg gap-1">
              {['hero', 'secciones', 'datos'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-[11px] font-black uppercase tracking-wider py-1.5 rounded transition-all cursor-pointer ${
                    activeTab === tab ? 'bg-[#FFD700] text-black font-bold shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab === 'hero' ? 'Hero' : tab === 'secciones' ? 'Títulos' : 'Listas'}
                </button>
              ))}
            </div>

            {/* Tab content 1: Hero Customization */}
            {activeTab === 'hero' && (
              <div className="flex flex-col gap-4">
                {/* Hero Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Título Principal</label>
                  <input
                    type="text"
                    value={data.heroTitle}
                    onChange={(e) => handleUpdate('heroTitle', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FFD700] outline-none"
                  />
                </div>

                {/* Hero Subtitle */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Subtítulo</label>
                  <textarea
                    rows={2}
                    value={data.heroSubtitle}
                    onChange={(e) => handleUpdate('heroSubtitle', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FFD700] outline-none resize-none"
                  />
                </div>

                {/* Hero Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Descripción Larga</label>
                  <textarea
                    rows={3}
                    value={data.heroDesc}
                    onChange={(e) => handleUpdate('heroDesc', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FFD700] outline-none resize-none"
                  />
                </div>

                {/* Hero Media Upload */}
                <div className="flex flex-col gap-1.5 border-t border-white/10 pt-3">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Imagen / Video Principal</label>
                  <input
                    type="file"
                    accept="image/*,video/*,.png,.jpg,.jpeg,.webp,.svg,.gif,.bmp,.tiff,.heic,.heif,.jfif,.mp4,.webm,.ogg,.mov,.avi,.PNG,.JPG,.JPEG,.WEBP,.SVG,.GIF,.BMP,.TIFF,.HEIC,.HEIF,.JFIF,.MP4,.WEBM,.OGG,.MOV,.AVI"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(e) => handleMediaUpload(e, 'heroMedia')}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="bg-[#FFD700] hover:bg-[#FFC107] text-black font-bold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    {isUploading ? (
                      <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    ) : (
                      <Upload size={14} />
                    )}
                    <span>Subir Render o Video</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab content 2: Sections customization */}
            {activeTab === 'secciones' && (
              <div className="flex flex-col gap-4">
                {/* Section 1 Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Título Sección 1</label>
                  <input
                    type="text"
                    value={data.s1Title}
                    onChange={(e) => handleUpdate('s1Title', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white focus:border-[#FFD700] outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="md:pl-[76px] transition-all duration-300">
          {/* Selector de Tipos de Envasadoras */}
          <div className="w-full bg-[#080B12]/80 backdrop-blur-md border-b border-white/5 sticky top-[90px] z-40 py-3.5 px-4 flex flex-wrap justify-center gap-2.5 shadow-lg">
            {Object.keys(envasadorasTypesData).map((typeKey) => {
              const isActive = activeType === typeKey;
              const typeLabel = {
                doypack: 'Rotativa Doypack',
                vertical: 'Vertical (VFFS)',
                flowpack: 'Flowpack (HFFS)',
                llenadoras: 'Llenadora de Líquidos',
                multipistas: 'Multipistas (Sachet)'
              }[typeKey];
              
              const colors = {
                doypack: '#FFD700',
                vertical: '#10B981',
                flowpack: '#06B6D4',
                llenadoras: '#3B82F6',
                multipistas: '#8B5CF6'
              };

              return (
                <button
                  key={typeKey}
                  onClick={() => setSearchParams({ type: typeKey })}
                  className={`px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2.5 cursor-pointer border ${
                    isActive 
                      ? 'text-black shadow-lg scale-105' 
                      : 'text-white/80 bg-white/5 hover:bg-white/10 hover:text-white hover:scale-[1.02]'
                  }`}
                  style={isActive ? { 
                    backgroundColor: colors[typeKey], 
                    borderColor: colors[typeKey],
                    boxShadow: `0 0 20px ${colors[typeKey]}40`
                  } : {
                    borderColor: `${colors[typeKey]}40`,
                    boxShadow: `0 0 10px ${colors[typeKey]}10 inset`
                  }}
                >
                  <span 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ 
                      backgroundColor: isActive ? '#000000' : colors[typeKey],
                      boxShadow: isActive ? 'none' : `0 0 8px ${colors[typeKey]}`
                    }} 
                  />
                  {typeLabel}
                </button>
              );
            })}
          </div>

          <main className="flex-grow">
          {/* HERO SECTION */}
          <section id="doypack-hero" className="relative min-h-[90vh] flex items-center justify-center pt-[140px] pb-16 px-[40px] max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-6 flex flex-col gap-6 text-left lg:pl-[30px]">
                {/* Tech Tag */}
                <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 w-max">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: activeColor }}></span>
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: activeColor }}></span>
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: activeColor }}>Línea de Envasado Premium</span>
                </div>

                {/* Title (Forzado a Blanco Puro con hover dinámico) */}
                <h1 
                  className="font-bold text-[36px] md:text-[52px] lg:text-[64px] leading-[1.1] tracking-[-1px] text-white transition-all duration-500 hover:scale-[1.02] cursor-pointer select-none"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = activeColor;
                    e.currentTarget.style.textShadow = `0 0 20px ${activeColor}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  {isEditorMode ? (
                    <input
                      type="text"
                      value={data.heroTitle}
                      onChange={(e) => handleUpdate('heroTitle', e.target.value)}
                      className="bg-transparent border-b border-dashed text-white outline-none w-full font-bold text-[32px] md:text-[46px] lg:text-[56px]"
                      style={{ borderColor: activeColor }}
                    />
                  ) : (
                    data.heroTitle.split('\\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < data.heroTitle.split('\\n').length - 1 && <br />}
                      </React.Fragment>
                    ))
                  )}
                </h1>

                {/* Subtitle */}
                {isEditorMode ? (
                  <textarea
                    rows={2}
                    value={data.heroSubtitle}
                    onChange={(e) => handleUpdate('heroSubtitle', e.target.value)}
                    className="bg-transparent pl-4 text-white font-bold text-[18px] md:text-[22px] leading-[1.4] outline-none w-full border-y border-r border-dashed border-white/10"
                    style={{ borderLeft: `2px solid ${activeColor}` }}
                  />
                ) : (
                  <p 
                    className="font-bold text-[18px] md:text-[22px] leading-[1.4] pl-4 text-white"
                    style={{ borderLeft: `2px solid ${activeColor}` }}
                  >
                    {data.heroSubtitle}
                  </p>
                )}

                {/* Description */}
                {isEditorMode ? (
                  <textarea
                    rows={4}
                    value={data.heroDesc}
                    onChange={(e) => handleUpdate('heroDesc', e.target.value)}
                    className="bg-transparent border border-dashed border-white/10 rounded p-2 text-white/70 font-normal text-[15px] md:text-[16px] leading-[1.6] outline-none w-full"
                    style={{ textAlign: data.heroDescAlign }}
                  />
                ) : (
                  <p 
                    className="font-normal text-[15px] md:text-[16px] leading-[1.6] max-w-[520px] text-white/70"
                    style={{ textAlign: data.heroDescAlign }}
                  >
                    {data.heroDesc}
                  </p>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
                  <a
                    href="#contacto-cotizar"
                    id="hero-btn-quote"
                    className="inline-flex items-center justify-center text-black font-bold text-[15px] py-4 px-8 rounded-lg transition-all duration-300 scale-100 hover:scale-[1.02]"
                    style={{
                      backgroundColor: activeColor,
                      boxShadow: `0 0 25px ${activeColor}50`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 35px ${activeColor}80`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 25px ${activeColor}50`;
                    }}
                  >
                    Solicitar Cotización
                  </a>
                  <a
                    href="#especificaciones"
                    id="hero-btn-spec"
                    className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-semibold text-[15px] py-4 px-8 rounded-lg transition-all duration-300 backdrop-blur-sm"
                  >
                    <FileText size={16} className="mr-2" />
                    Ficha Técnica
                  </a>
                </div>
              </div>

              {/* Right Column: Dynamic Media Frame - VIDRIO BISELADO AL 30% */}
              <div className="lg:col-span-6 flex justify-center items-center relative h-full">
                {/* Glow circular dorado dinámico */}
                <div className="absolute w-[450px] h-[450px] rounded-full blur-[90px] animate-pulse -z-10" style={{ backgroundColor: `${activeColor}15` }} />

                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="relative max-w-[550px] w-full border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 shadow-[0_25px_50px_rgba(0,0,0,0.4)] group overflow-hidden"
                >
                  {/* Borde neón superior dorado dinámico */}
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundImage: `linear-gradient(to right, transparent, ${activeColor}B3, transparent)` }} />
                  
                  {/* Video or Image based on parsed source */}
                  {isVideo ? (
                    <video
                      src={currentMedia}
                      poster={data.heroPoster || '/rotary_doypack_machine.png'}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto object-contain rounded-xl transition-all duration-300"
                      style={{ filter: `drop-shadow(0 15px 30px ${activeColor}20)` }}
                    />
                  ) : (
                    <img
                      src={currentMedia}
                      alt="SMQ Rotary Doypack Packaging Machine 8 Stations"
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: `drop-shadow(0 15px 30px ${activeColor}20)` }}
                    />
                  )}

                  {/* Machine technical specs corner tags */}
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                    <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider">SUS304 Acero Inoxidable</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: activeColor }}>PLC INTEGRADO</span>
                  </div>
                </motion.div>
              </div>

            </div>
          </section>

          {/* CINTA DE ESTADÍSTICAS (Calculadora que va sumando) */}
          <section className="relative z-20 -mt-10 max-w-[1400px] mx-auto px-[40px]">
            <div className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden grid grid-cols-2 md:grid-cols-9 gap-4 text-center">
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundImage: `linear-gradient(to right, transparent, ${activeColor}4D, transparent)` }} />
              
              {/* Stat 1 */}
              <StatCard target="20" suffix="+" label="Años de experiencia" />

              {/* Divider */}
              <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block self-center justify-self-center animate-pulse" />

              {/* Stat 2 */}
              <StatCard target="500" suffix="+" label="Equipos suministrados" />

              {/* Divider */}
              <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block self-center justify-self-center animate-pulse" />

              {/* Stat 3 */}
              <StatCard target="100" suffix="+" label="Proyectos ejecutados" />

              {/* Divider */}
              <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block self-center justify-self-center animate-pulse" />

              {/* Stat 4 */}
              <StatCard target="15" suffix="+" label="Sectores industriales" />

              {/* Divider */}
              <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block self-center justify-self-center animate-pulse" />

              {/* Stat 5 */}
              <StatCard target="24/7" label="Soporte e integración" colSpan="col-span-2 md:col-span-1" />

            </div>
          </section>

          {/* SECCIÓN 1: ¿CÓMO FUNCIONA? - Horizontal Futuristic Timeline */}
          <section id="como-funciona" className="py-20 bg-black/40 border-y border-white/5 relative">
            <div className="max-w-[1400px] mx-auto px-[40px] text-center">
              
              {/* Header */}
              <div className="flex flex-col items-center gap-3 mb-16">
                <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: activeColor }}>Ingeniería Secuencial</span>
                {/* Title (Forzado a Blanco Puro) */}
                <h2 
                  className="text-3xl md:text-4xl font-bold tracking-tight text-white transition-all duration-500 hover:scale-105 hover:tracking-wide cursor-pointer select-none"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = activeColor;
                    e.currentTarget.style.textShadow = `0 0 15px ${activeColor}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  {data.s1Title}
                </h2>
                <div className="w-48 h-[4px] rounded-full mt-4 transition-all duration-500 hover:w-64 mx-auto" style={{ backgroundColor: activeColor, boxShadow: `0 0 15px ${activeColor}99` }} />
                <p 
                  className="text-sm max-w-lg mt-2 leading-relaxed text-white/70"
                  style={{ textAlign: data.s1DescAlign }}
                >
                  {data.s1Desc}
                </p>
              </div>

              {/* Interactive Timeline Container */}
              <div className="relative flex flex-col gap-10">
                {/* Horizontal Line Bar */}
                <div className="absolute top-[38px] left-[5%] right-[5%] h-[2px] bg-white/10 hidden lg:block -z-10">
                  <div 
                    className="h-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${(activeStep / (stationsList.length - 1)) * 100}%`,
                      backgroundColor: activeColor,
                      boxShadow: `0 0 10px ${activeColor}`
                    }}
                  />
                </div>

                {/* Horizontal Circle Nodes (Desktop) */}
                <div className="hidden lg:grid grid-cols-8 gap-4 px-4">
                  {stationsList.map((step, idx) => {
                    const StepIcon = iconMap[step.iconName] || Settings;
                    const isActive = idx <= activeStep;
                    const isCurrent = idx === activeStep;

                    return (
                      <button
                        key={step.id}
                        id={`timeline-node-${step.id}`}
                        onClick={() => setActiveStep(idx)}
                        className="flex flex-col items-center focus:outline-none group cursor-pointer"
                      >
                        <div 
                          className="w-20 h-20 rounded-2xl flex items-center justify-center border transition-all duration-300"
                          style={
                            isCurrent
                              ? {
                                  backgroundColor: activeColor,
                                  borderColor: activeColor,
                                  color: '#000000',
                                  boxShadow: `0 0 25px ${activeColor}80`,
                                  transform: 'scale(1.1)'
                                }
                              : isActive
                                ? {
                                    backgroundColor: '#0B0F19',
                                    borderColor: `${activeColor}80`,
                                    color: activeColor,
                                    boxShadow: `0 0 15px ${activeColor}24`
                                  }
                                : {
                                    backgroundColor: '#0B0F19',
                                    borderColor: 'rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.4)'
                                  }
                          }
                        >
                          <StepIcon size={24} strokeWidth={isCurrent ? 2.5 : 2} />
                        </div>

                        <span className="text-[12px] font-bold mt-4 transition-colors tracking-wide" style={{ color: isCurrent ? activeColor : undefined }}>
                          Estación {step.id}
                        </span>

                        <span className="text-[11px] text-white/40 mt-1 max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {step.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Focused Content Card - VIDRIO BISELADO AL 30% */}
                <div className="mt-8 max-w-[850px] mx-auto w-full">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-xl rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative text-left"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundImage: `linear-gradient(to right, transparent, ${activeColor}, transparent)` }} />
                    
                    <div className="w-24 h-24 rounded-2xl border flex items-center justify-center shrink-0" style={{ backgroundColor: `${activeColor}1a`, borderColor: `${activeColor}33`, color: activeColor, boxShadow: `inset 0 0 15px ${activeColor}0d` }}>
                      {React.createElement(iconMap[stationsList[activeStep].iconName] || Settings, { size: 44, strokeWidth: 1.5 })}
                    </div>

                    <div className="text-left flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-xs uppercase px-2.5 py-1 rounded-md border tracking-wider" style={{ backgroundColor: `${activeColor}26`, borderColor: `${activeColor}4d`, color: activeColor }}>
                          Estación {stationsList[activeStep].id} de 8
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                          {stationsList[activeStep].title}
                        </h3>
                      </div>
                      <p className="text-white/70 text-[15px] leading-relaxed">
                        {stationsList[activeStep].desc}
                      </p>
                    </div>

                    {/* Step selection indicators (Mobile) */}
                    <div className="flex gap-2 mt-4 md:hidden">
                      {stationsList.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveStep(idx)}
                          className="w-2.5 h-2.5 rounded-full transition-all"
                          style={
                            idx === activeStep 
                              ? { backgroundColor: activeColor, width: '24px' } 
                              : { backgroundColor: 'rgba(255,255,255,0.2)' }
                          }
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>

              </div>

            </div>
          </section>

          {/* SECCIÓN 2: ESPECIFICACIONES PRINCIPALES - KPI Cards */}
          <section id="especificaciones" className="py-20 max-w-[1400px] mx-auto px-[40px] relative">
            <div className="flex flex-col items-center gap-3 mb-16 text-center">
              <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: activeColor }}>Rendimiento Garantizado</span>
              {/* Title (Forzado a Blanco Puro) */}
              <h2 
                className="text-3xl md:text-4xl font-bold tracking-tight text-white transition-all duration-500 hover:scale-105 hover:tracking-wide cursor-pointer select-none"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = activeColor;
                  e.currentTarget.style.textShadow = `0 0 15px ${activeColor}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                {data.s2Title}
              </h2>
              <div className="w-48 h-[4px] rounded-full mt-4 transition-all duration-500 hover:w-64 mx-auto" style={{ backgroundColor: activeColor, boxShadow: `0 0 15px ${activeColor}99` }} />
            </div>

            {/* KPI Grid - VIDRIO BISELADO AL 30% */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpisList.map((kpi, idx) => (
                <div 
                  key={idx}
                  id={`kpi-card-${idx}`}
                  className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-md rounded-2xl p-8 text-left transition-all duration-300 hover:bg-white/[0.06] shadow-lg group relative overflow-hidden"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = activeColor;
                    e.currentTarget.style.boxShadow = `0 0 25px ${activeColor}26`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-xl transition-all duration-300 opacity-20 group-hover:opacity-40" style={{ backgroundColor: activeColor }} />
                  
                  <span className="text-[11px] font-black uppercase tracking-wider block mb-2" style={{ color: activeColor }}>{kpi.unit}</span>
                  
                  <h3 className="text-4xl md:text-5xl font-extrabold text-white leading-none tracking-tight mb-3">
                    {kpi.value}
                  </h3>

                  <h4 className="text-white/80 font-bold text-sm tracking-wide mb-1">
                    {kpi.label}
                  </h4>

                  <p className="text-white/40 text-xs leading-relaxed">
                    {kpi.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECCIÓN 3: APLICACIONES - Grid with Glow effect */}
          <section id="aplicaciones" className="py-20 bg-black/20 border-y border-white/5 relative">
            <div className="max-w-[1400px] mx-auto px-[40px] text-center">
              
              {/* Header */}
              <div className="flex flex-col items-center gap-3 mb-16">
                <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: activeColor }}>Flexibilidad de Envasado</span>
                {/* Title (Forzado a Blanco Puro) */}
                <h2 
                  className="text-3xl md:text-4xl font-bold tracking-tight text-white transition-all duration-500 hover:scale-105 hover:tracking-wide cursor-pointer select-none"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = activeColor;
                    e.currentTarget.style.textShadow = `0 0 15px ${activeColor}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  {data.s3Title}
                </h2>
                <div className="w-48 h-[4px] rounded-full mt-4 transition-all duration-500 hover:w-64 mx-auto" style={{ backgroundColor: activeColor, boxShadow: `0 0 15px ${activeColor}99` }} />
                <p 
                  className="text-sm max-w-lg mt-2 leading-relaxed text-white/70"
                  style={{ textAlign: data.s3DescAlign }}
                >
                  {data.s3Desc}
                </p>
              </div>

              {/* Grid Layout - VIDRIO BISELADO AL 30% */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {applicationsList.map((app, idx) => (
                  <div
                    key={idx}
                    id={`app-card-${idx}`}
                    className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-md rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 shadow-lg group cursor-default dynamic-group dynamic-hover-card"
                  >
                    {/* Circle Frame */}
                    {isEditorMode ? (
                      <div className="relative group/circle cursor-pointer mb-4">
                        <input
                          type="file"
                          accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.gif,.bmp,.tiff,.heic,.heif,.jfif,.PNG,.JPG,.JPEG,.WEBP,.SVG,.GIF,.BMP,.TIFF,.HEIC,.HEIF,.JFIF"
                          id={`app-file-input-${idx}`}
                          className="hidden"
                          onChange={(e) => handleAppImageUpload(e, idx)}
                        />
                        <div 
                          onClick={() => document.getElementById(`app-file-input-${idx}`).click()}
                          className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl transition-all duration-300 relative overflow-hidden dynamic-group-icon"
                        >
                          {app.imageUrl ? (
                            <img src={app.imageUrl} alt={app.name} className="w-full h-full object-cover" />
                          ) : (
                            <span>{app.icon}</span>
                          )}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/circle:opacity-100 flex items-center justify-center transition-opacity">
                            <Upload size={14} className="text-white animate-pulse" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-4 transition-all duration-300 overflow-hidden dynamic-group-icon">
                        {app.imageUrl ? (
                          <img src={app.imageUrl} alt={app.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>{app.icon}</span>
                        )}
                      </div>
                    )}

                    <h3 className="text-white font-bold text-base tracking-wide mb-1.5 transition-colors dynamic-group-title">
                      {app.name}
                    </h3>

                    <p className="text-white/40 text-xs leading-normal">
                      {app.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* SECCIÓN 4: VENTAJAS - European OEM design */}
          <section id="ventajas" className="py-20 max-w-[1400px] mx-auto px-[40px] relative">
            <div className="flex flex-col items-center gap-3 mb-16 text-center">
              <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: activeColor }}>Diseño e Ingeniería OEM</span>
              {/* Title (Forzado a Blanco Puro) */}
              <h2 
                className="text-3xl md:text-4xl font-bold tracking-tight text-white transition-all duration-500 hover:scale-105 hover:tracking-wide cursor-pointer select-none"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = activeColor;
                  e.currentTarget.style.textShadow = `0 0 15px ${activeColor}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                {data.s4Title}
              </h2>
              <div className="w-48 h-[4px] rounded-full mt-4 transition-all duration-500 hover:w-64 mx-auto" style={{ backgroundColor: activeColor, boxShadow: `0 0 15px ${activeColor}99` }} />
            </div>

            {/* Advantages Cards Grid - VIDRIO BISELADO AL 30% */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {advantagesList.map((adv, idx) => (
                <div
                  key={idx}
                  id={`adv-card-${idx}`}
                  className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-md rounded-2xl p-8 text-left relative overflow-hidden group transition-all duration-300 hover:shadow-2xl dynamic-hover-card"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundImage: `linear-gradient(to right, transparent, ${activeColor}4D, transparent)` }} />
                  
                  <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-xl transition-all duration-300 opacity-20" style={{ backgroundColor: activeColor }} />

                  <span className="font-bold text-[10px] uppercase px-3 py-1 rounded-full border tracking-wider mb-4 inline-block" style={{ backgroundColor: `${activeColor}1A`, borderColor: `${activeColor}33`, color: activeColor }}>
                    {adv.highlight}
                  </span>

                  <h3 className="text-lg md:text-xl font-bold text-white tracking-wide mb-3">
                    {adv.title}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECCIÓN 5: ESPECIFICACIONES TÉCNICAS - Table with hover */}
          <section id="tabla-tecnica" className="py-20 bg-black/40 border-y border-white/5 relative">
            <div className="max-w-[900px] mx-auto px-[40px]">
              
              <div className="flex flex-col items-center gap-3 mb-12 text-center">
                <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: activeColor }}>Detalles Mecánicos</span>
                {/* Title (Forzado a Blanco Puro) */}
                <h2 
                  className="text-3xl font-bold tracking-tight text-white transition-all duration-500 hover:scale-105 hover:tracking-wide cursor-pointer select-none"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = activeColor;
                    e.currentTarget.style.textShadow = `0 0 15px ${activeColor}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  {data.s5Title}
                </h2>
                <div className="w-48 h-[4px] rounded-full mt-4 transition-all duration-500 hover:w-64 mx-auto" style={{ backgroundColor: activeColor, boxShadow: `0 0 15px ${activeColor}99` }} />
              </div>

              {/* Table Wrapper - VIDRIO BISELADO AL 30% */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider" style={{ color: activeColor }}>Hoja de datos de Ingeniería OEM</span>
                  <button 
                    onClick={() => alert("Generando Ficha Técnica Completa en formato PDF de alta resolución...")}
                    className="inline-flex items-center gap-2 bg-white/5 text-white border border-white/10 font-bold text-xs py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md cursor-pointer"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = activeColor;
                      e.currentTarget.style.borderColor = activeColor;
                      e.currentTarget.style.color = '#000000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                      e.currentTarget.style.borderColor = '';
                      e.currentTarget.style.color = '';
                    }}
                  >
                    <ArrowDownToLine size={14} />
                    Descargar Ficha Completa (PDF)
                  </button>
                </div>

                <div className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="py-4 px-6 text-xs font-black uppercase tracking-wider text-white">Parámetro</th>
                        <th className="py-4 px-6 text-xs font-black uppercase tracking-wider" style={{ color: activeColor }}>Valor Técnico</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specsList.map((spec, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-white/5 transition-all duration-300 group dynamic-table-row"
                        >
                          <td className="py-4 px-6 text-sm font-semibold text-white/80 transition-transform duration-300 group-hover:translate-x-1">{spec.param}</td>
                          <td className="py-4 px-6 text-sm font-normal text-white">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </section>

          {/* SECCIÓN 6: VIDEO DE OPERACIÓN - Large visual placeholder */}
          <section id="video-operacion" className="py-20 max-w-[1100px] mx-auto px-[40px] text-center">
            
            <div className="flex flex-col items-center gap-3 mb-12">
              <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: activeColor }}>Visualización en Planta</span>
              {/* Title (Forzado a Blanco Puro) */}
              <h2 
                className="text-3xl md:text-4xl font-bold tracking-tight text-white transition-all duration-500 hover:scale-105 hover:tracking-wide cursor-pointer select-none"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = activeColor;
                  e.currentTarget.style.textShadow = `0 0 15px ${activeColor}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                {data.s6Title}
              </h2>
              <div className="w-48 h-[4px] rounded-full mt-4 transition-all duration-500 hover:w-64 mx-auto" style={{ backgroundColor: activeColor, boxShadow: `0 0 15px ${activeColor}99` }} />
              <p 
                className="text-sm mt-2 leading-relaxed text-white/70"
                style={{ textAlign: data.s6DescAlign }}
              >
                {data.s6Desc}
              </p>
            </div>

            {/* Video Player - VIDRIO BISELADO AL 30% */}
            <div className="relative border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-xl rounded-2xl aspect-video overflow-hidden shadow-2xl flex items-center justify-center group cursor-pointer max-w-[850px] mx-auto">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60" />
              
              <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${activeColor}0D` }}>
                <div className="w-[300px] h-[300px] rounded-full animate-spin [animation-duration:15s] flex items-center justify-center" style={{ border: `1px solid ${activeColor}1A` }}>
                  <div className="w-[200px] h-[200px] border border-dashed rounded-full" style={{ borderColor: `${activeColor}0D` }} />
                </div>
              </div>

              <div className="absolute top-4 left-4 bg-black/60 border border-white/10 rounded-full px-3.5 py-1.5 flex items-center gap-2 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="text-[10px] text-white/80 font-black tracking-wider uppercase">SIMULACIÓN EN VIVO</span>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full text-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20" style={{ backgroundColor: activeColor, boxShadow: `0 0 40px ${activeColor}66` }}>
                  <Play size={32} className="ml-1.5" />
                </div>
                <span 
                  className="bg-black/70 border border-white/15 px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest text-white shadow-xl transition-all duration-300"
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = activeColor; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = ''; }}
                >
                  ▶ Ver máquina trabajando
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundImage: `linear-gradient(to right, ${activeColor}, ${activeColor}CC, ${activeColor})` }} />
            </div>

          </section>

          {/* SECCIÓN 7: CONFIGURACIONES DISPONIBLES */}
          <section id="configuraciones" className="py-20 bg-black/40 border-y border-white/5 relative">
            <div className="max-w-[1400px] mx-auto px-[40px] text-center">
              
              <div className="flex flex-col items-center gap-3 mb-16">
                <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: activeColor }}>Diseño Modular</span>
                {/* Title (Forzado a Blanco Puro) */}
                <h2 
                  className="text-3xl md:text-4xl font-bold tracking-tight text-white transition-all duration-500 hover:scale-105 hover:tracking-wide cursor-pointer select-none"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = activeColor;
                    e.currentTarget.style.textShadow = `0 0 15px ${activeColor}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  {data.s7Title}
                </h2>
                <div className="w-48 h-[4px] rounded-full mt-4 transition-all duration-500 hover:w-64 mx-auto" style={{ backgroundColor: activeColor, boxShadow: `0 0 15px ${activeColor}99` }} />
                <p 
                  className="text-sm max-w-lg mt-3 text-white/70 leading-relaxed"
                  style={{ textAlign: data.s7DescAlign }}
                >
                  {data.s7Desc}
                </p>
              </div>

              {/* Grid - VIDRIO BISELADO AL 30% */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto text-left">
                {configurationsList.map((item, idx) => (
                  <div
                    key={idx}
                    id={`config-card-${idx}`}
                    className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-md rounded-xl p-6 flex items-start gap-4 transition-all duration-300 hover:translate-x-1 dynamic-hover-card"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border" style={{ backgroundColor: `${activeColor}1A`, borderColor: `${activeColor}33`, color: activeColor }}>
                      <Settings size={18} className="animate-spin [animation-duration:10s]" />
                    </div>

                    <div>
                      <h3 className="text-white font-bold text-[15px] tracking-wide mb-1">{item.name}</h3>
                      <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* SECCIÓN FINAL: CTA futurista */}
          <section id="contacto-cotizar" className="py-24 max-w-[1000px] mx-auto px-[40px] text-center relative">
            <div className="absolute inset-0 rounded-full blur-[100px] pointer-events-none -z-10" style={{ backgroundColor: `${activeColor}08` }} />

            {/* Block - VIDRIO BISELADO AL 30% */}
            <div className="border-t border-l border-white/30 border-b border-r border-white/5 bg-white/[0.03] backdrop-blur-xl rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundImage: `linear-gradient(to right, transparent, ${activeColor}, transparent)`, boxShadow: `0 0 15px ${activeColor}` }} />
              
              <span className="text-[11px] font-black uppercase tracking-[0.4em] block mb-4" style={{ color: activeColor }}>Ingeniería Personalizada</span>

              {/* Title (Forzado a Blanco Puro) */}
              <h2 
                className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white"
              >
                {data.ctaTitle}
              </h2>

              <p 
                className="text-sm md:text-base leading-relaxed max-w-[620px] mx-auto mb-10 text-white/80"
                style={{ textAlign: data.ctaDescAlign }}
              >
                {data.ctaDesc}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-[500px] mx-auto">
                <button
                  id="final-btn-quote"
                  onClick={() => alert("¡Solicitud enviada! Un ingeniero de SMQ se pondrá en contacto con usted de inmediato.")}
                  className="text-black font-bold text-[15px] py-4 px-8 rounded-lg transition-all duration-300 w-full cursor-pointer"
                  style={{
                    backgroundColor: activeColor,
                    boxShadow: `0 0 20px ${activeColor}4D`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 30px ${activeColor}80`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 20px ${activeColor}4D`;
                  }}
                >
                  SOLICITAR COTIZACIÓN
                </button>
                <button
                  id="final-btn-chat"
                  onClick={() => alert("Conectando con el departamento técnico...")}
                  className="bg-transparent hover:bg-white/5 text-white border border-white/15 hover:border-white/30 font-semibold text-[15px] py-4 px-8 rounded-lg transition-all duration-300 w-full cursor-pointer"
                >
                  HABLAR CON UN INGENIERO
                </button>
              </div>
            </div>
          </section>

        </main>
        <Footer />
        </div>
      </div>
    </>
  );
};

export default EnvasadoraDoypack;
