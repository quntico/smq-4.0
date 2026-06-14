import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Upload,
  ArrowLeft,
  Grid,
  Droplet,
  Waves,
  RotateCw,
  Target,
  CircleDot,
  Sliders,
  Package,
  Leaf,
  Tag,
  Sun,
  Cable
} from 'lucide-react';
import Footer from '@/components/Footer.jsx';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';
import { machineryDataMap as catalogDataMap } from '@/data/machineryCatalog.js';

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
  Play,
  Grid,
  Droplet,
  Waves,
  RotateCw,
  Target,
  CircleDot,
  Sliders,
  Package,
  Leaf,
  Tag,
  Sun,
  Cable
};

// Default machinery datasets
const machineryDataMap = {
  ...catalogDataMap,
  envasadoras: {
    pageNumber: '01',
    theme: {
      accent: '#FFD700',
      accentGlow: 'rgba(255, 215, 0, 0.4)',
      bgStart: '#080B12',
      bgEnd: '#1A1608',
      glowColor: 'yellow'
    },
    heroTitle: 'ENVASADORAS ROTATIVAS DOYPACK',
    heroSubtitle: 'Llenado y sellado automático de alto rendimiento para bolsas preformadas.',
    heroDesc: 'Secuencias automatizadas de última tecnología con 8 estaciones de trabajo modulares. Diseñadas para empaque de café, snacks, granos, polvos y líquidos en atmósfera modificada con máxima precisión neumática y estructural.',
    heroMedia: 'https://images.unsplash.com/photo-1495716098472-4bd5c0382520',
    kpis: [
      { value: '60', unit: 'BOLSAS/MIN', label: 'Rendimiento Máximo', desc: 'Producción continua a alta velocidad' },
      { value: '8', unit: 'ESTACIONES', label: 'Estaciones de Trabajo', desc: 'Secuencia optimizada de envasado' },
      { value: '10-2500 g', unit: 'RANGO DE LLENADO', label: 'Flexibilidad de Peso', desc: 'Múltiples volúmenes soportados' },
      { value: '±1%', unit: 'PRECISIÓN', label: 'Control de Margen', desc: 'Desperdicio de producto casi nulo' }
    ],
    stations: [
      { id: 1, title: 'Recepción de bolsa', desc: 'Alimentación automática de bolsas preformadas desde el almacén horizontal.', iconName: 'Inbox' },
      { id: 2, title: 'Apertura de bolsa', desc: 'Sistema neumático y mecánico de ventosas de vacío que abre la bolsa por arriba y abajo.', iconName: 'Maximize2' },
      { id: 3, title: 'Verificación de apertura', desc: 'Sensor de detección infrarrojo para asegurar apertura correcta antes de la dosificación.', iconName: 'Eye' },
      { id: 4, title: 'Dosificación precisa', desc: 'Llenado preciso del producto mediante sistema sincronizado (balanza, tornillo o volumétrico).', iconName: 'Layers' }
    ],
    applications: [
      { name: 'Café y Granos', icon: '☕', desc: 'Café en grano o molido con válvula desgasificadora' },
      { name: 'Snacks y Dulces', icon: '🍪', desc: 'Chocolates, bombones, botanas saladas y confitería' },
      { name: 'Polvos finos', icon: '🧂', desc: 'Harinas, especias, proteínas y colágeno' }
    ],
    advantages: [
      { title: 'CAMBIO RÁPIDO DE FORMATO', desc: 'Ajuste de guías motorizadas desde el HMI. Configuración sencilla y sin herramientas mecánicas en menos de 10 minutos.', highlight: 'Eficiencia Operativa' },
      { title: 'DISEÑO SANITARIO PREMIUM', desc: 'Construcción íntegra en acero inoxidable SUS304 sin rincones ciegos, facilitando procesos de limpieza rápida e higiene total.', highlight: 'Certificación Alimenticia' }
    ],
    specs: [
      { param: 'Modelo', value: 'SMQ-DP8 PRO Series' },
      { param: 'Estaciones de trabajo', value: '8 estaciones rotativas de indexación sincrónica' },
      { param: 'Velocidad de envasado', value: '40 - 60 bolsas/min (Sincronizado dinámicamente)' },
      { param: 'Potencia instalada', value: '3.8 kW | Trifásico 220V/380V/440V' }
    ],
    configurations: [
      { name: 'Balanza multicabezal', desc: 'Máxima velocidad para granulados, snacks y piezas irregulares.' },
      { name: 'Tornillo sinfín para polvos', desc: 'Ideal para dosificación de polvos finos y harinas de forma hermética.' }
    ]
  },
  etiquetadoras: {
    pageNumber: '02',
    theme: {
      accent: '#06B6D4',
      accentGlow: 'rgba(6, 182, 212, 0.4)',
      bgStart: '#04101A',
      bgEnd: '#0A2A3A',
      glowColor: 'cyan'
    },
    heroTitle: 'ETIQUETADORAS INDUSTRIALES DE PRECISIÓN',
    heroSubtitle: 'Sistemas automáticos de etiquetado lineal y rotativo de precisión micrómetro.',
    heroDesc: 'Nuestros sistemas de etiquetado integran servomotores síncronos de alta respuesta para aplicar etiquetas autoadhesivas sobre envases cilíndricos, planos u ovalados. Garantizan una tolerancia menor a 0.5 mm en entornos de producción intensiva.',
    heroMedia: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    kpis: [
      { value: '150', unit: 'ENVASES/MIN', label: 'Velocidad Nominal', desc: 'Operación continua estabilizada' },
      { value: '±0.5 mm', unit: 'TOLERANCIA', label: 'Precisión de Aplicación', desc: 'Alineación perfecta por microservos' },
      { value: '10-300 mm', unit: 'ALTURA ETIQUETA', label: 'Rango Amplio', desc: 'Compatible con etiquetas mini y envolventes' },
      { value: 'IP65', unit: 'PROTECCIÓN', label: 'Gabinete Hermético', desc: 'Resistente a lavados y humedad en planta' }
    ],
    stations: [
      { id: 1, title: 'Separador de envases', desc: 'Rueda sinfín espaciadora que estabiliza el flujo de envases en la banda transportadora.', iconName: 'Inbox' },
      { id: 2, title: 'Detección por sensor', desc: 'Sensores ópticos ultrarrápidos leen la posición y el borde frontal del envase.', iconName: 'Eye' },
      { id: 3, title: 'Dispensado por servo', desc: 'Servomotor Yaskawa dispensa la etiqueta sincronizando velocidad milimétrica.', iconName: 'Layers' },
      { id: 4, title: 'Banda de alisado', desc: 'Sistema de rodillos amortiguados y bandas de envoltura que eliminan burbujas de aire.', iconName: 'ArrowDownToLine' }
    ],
    applications: [
      { name: 'Bebidas y Líquidos', icon: '🍼', desc: 'Botellas de PET, vidrio y latas con etiquetas envolventes' },
      { name: 'Alimentos y Conservas', icon: '🥫', desc: 'Frascos y tarros de vidrio con etiquetas de seguridad superior' },
      { name: 'Químicos y Farma', icon: '🧪', desc: 'Envases planos y cilíndricos con etiquetado de doble cara' }
    ],
    advantages: [
      { title: 'DISPENSADO DE ALTA VELOCIDAD', desc: 'Mapeo electrónico continuo del flujo de botellas que adapta automáticamente la aceleración de salida de la etiqueta.', highlight: 'Sincronización Total' },
      { title: 'PANEL HMI INTUITIVO', desc: 'Control centralizado de recetas para cambio de envase con almacenamiento de parámetros ópticos y mecánicos en memoria.', highlight: 'Cero Herramientas' }
    ],
    specs: [
      { param: 'Modelo', value: 'SMQ-ET200 High Speed' },
      { param: 'Tipo de Etiquetado', value: 'Lineal Autoadhesivo de doble cabezal (Rotativo opcional)' },
      { param: 'Velocidad de dispensado', value: 'Hasta 45 metros lineales por minuto' },
      { param: 'Buses de campo', value: 'EtherCAT con ciclo de sincronización de 250 µs' }
    ],
    configurations: [
      { name: 'Cabezal Doble Cara', desc: 'Aplica simultáneamente etiqueta frontal y trasera en envases ovalados.' },
      { name: 'Codificador Hot Stamping / Inkjet', desc: 'Impresión en tiempo real de lote y fecha de vencimiento sobre la etiqueta.' }
    ]
  },
  encartonadoras: {
    pageNumber: '03',
    theme: {
      accent: '#10B981',
      accentGlow: 'rgba(16, 185, 129, 0.4)',
      bgStart: '#04120B',
      bgEnd: '#0A2C18',
      glowColor: 'green'
    },
    heroTitle: 'ENCARTONADORAS INDUSTRIALES AUTOMÁTICAS',
    heroSubtitle: 'Formado, llenado y sellado robotizado de cajas de cartón en un único bloque.',
    heroDesc: 'Soluciones automáticas modulares para empaque secundario de alta velocidad. Equipadas con sistemas mecánicos de apertura positiva de cajas de cartón y sellado mediante Hot-Melt de precisión quirúrgica.',
    heroMedia: 'https://images.unsplash.com/photo-1659406661027-ac7dd0455011',
    kpis: [
      { value: '80', unit: 'CAJAS/MIN', label: 'Rendimiento Máximo', desc: 'Ciclo continuo de formado y cierre' },
      { value: '3 min', unit: 'CAMBIO FORMATO', label: 'Tiempos Mínimos', desc: 'Ajuste tridimensional rápido y manual' },
      { value: 'Nordson', unit: 'HOT MELT', label: 'Inyección Sincronizada', desc: 'Adhesivo aplicado con precisión por boquillas' },
      { value: 'SUS304', unit: 'CHASIS', label: 'Acero Estructural', desc: 'Larga durabilidad bajo esfuerzos de fatiga' }
    ],
    stations: [
      { id: 1, title: 'Alimentador de planos', desc: 'Almacén de cartones planos con sistema extractor rotativo por vacío.', iconName: 'Inbox' },
      { id: 2, title: 'Apertura positiva', desc: 'Brazos mecánicos de doble ventosa abren el cartón preformándolo con escuadra perfecta.', iconName: 'Maximize2' },
      { id: 3, title: 'Introducción del producto', desc: 'Empujador servocontrolado introduce el producto dentro del cartón con guías laterales.', iconName: 'Layers' },
      { id: 4, title: 'Aplicación de Hot Melt', desc: 'Pistolas aplicadoras inyectan el pegamento en las pestañas laterales de forma síncrona.', iconName: 'Flame' }
    ],
    applications: [
      { name: 'Cajas de Alimentos', icon: '🥣', desc: 'Empaque de bolsas de cereales, chocolates, botanas y barras nutricionales' },
      { name: 'Farmacéutica', icon: '💊', desc: 'Encartonado de blisters, viales, jarabes y cosméticos' },
      { name: 'Bienes de Consumo', icon: '🪥', desc: 'Empaque de tubos de pasta dental, jabones y repuestos mecánicos' }
    ],
    advantages: [
      { title: 'SISTEMA DE APERTURA POSITIVA', desc: 'Evita atascos mecánicos al abrir las cajas en dirección opuesta al pliegue natural, eliminando pérdidas por cartón defectuoso.', highlight: 'Confiabilidad Mecánica' },
      { title: 'PREPARADO PARA INDUSTRIA 4.0', desc: 'Sensores integrados de presión neumática y temperatura de adhesivo que previenen paradas imprevistas de línea.', highlight: 'Mantenimiento Predictivo' }
    ],
    specs: [
      { param: 'Modelo', value: 'SMQ-EC80 Vertical / Horizontal' },
      { param: 'Tipo de Cartón', value: 'Cartulina de 250 a 450 g/m² o microcorrugado flauta E' },
      { param: 'Sistema de Cierre', value: 'Sellado por adhesivo Hot-Melt o inserción mecánica (Tuck-in)' },
      { param: 'Voltaje y Control', value: '220V/440V 3F | PLC Siemens S7-1200 + Pantalla HMI 7"' }
    ],
    configurations: [
      { name: 'Alimentador Automático en Línea', desc: 'Conexión directa a la salida de envasadoras o envolvedoras sin manipulación manual.' },
      { name: 'Módulo de Inserción de Prospectos', desc: 'Introduce automáticamente folletos informativos o recetas dentro de la caja.' }
    ]
  },
  paletizadoras: {
    pageNumber: '04',
    theme: {
      accent: '#8B5CF6',
      accentGlow: 'rgba(139, 92, 246, 0.4)',
      bgStart: '#070514',
      bgEnd: '#160F35',
      glowColor: 'purple'
    },
    heroTitle: 'SISTEMAS DE PALETIZADO ROBOTIZADO Y PÓRTICO',
    heroSubtitle: 'Automatización del final de línea con apilado inteligente de precisión robotizada.',
    heroDesc: 'Nuestras paletizadoras robotizadas integran brazos articulados de alta velocidad y pinzas de sujeción neumático-magnéticas. Optimizan el patrón de estiba de cajas, sacos y bidones con absoluta repetibilidad mecánica.',
    heroMedia: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
    kpis: [
      { value: '15', unit: 'CICLOS/MIN', label: 'Rendimiento por Brazo', desc: 'Movimiento rápido con control de aceleración' },
      { value: '500 kg', unit: 'CARGA ÚTIL', label: 'Capacidad de Carga', desc: 'Soporta estiba pesada sin deformación' },
      { value: '0.1 mm', unit: 'REPETIBILIDAD', label: 'Precisión de Posición', desc: 'Colocación exacta en coordenadas X-Y-Z' },
      { value: '2.8 m', unit: 'ALTURA MÁXIMA', label: 'Estiba Elevada', desc: 'Optimización de espacio en almacenes' }
    ],
    stations: [
      { id: 1, title: 'Transportador de acumulación', desc: 'Banda transportadora inteligente que posiciona las cajas listas para el paletizado.', iconName: 'Inbox' },
      { id: 2, title: 'Centrador de estiba', desc: 'Ajuste neumático lateral que alinea las cajas respecto al punto de agarre.', iconName: 'Maximize2' },
      { id: 3, title: 'Sujeción de precisión', desc: 'Pinza multifuncional que toma cajas, coloca intercaladores y manipula tarimas vacías.', iconName: 'Layers' },
      { id: 4, title: 'Estiba en tarima', desc: 'Brazo articulado deposita la carga según el patrón programado en el HMI.', iconName: 'ArrowDownToLine' }
    ],
    applications: [
      { name: 'Cajas y Empaques', icon: '📦', desc: 'Apilamiento de cajas de cartón corrugado de diversas dimensiones' },
      { name: 'Sacos y Costales', icon: '🥡', desc: 'Paletizado de harinas, granos, cemento y materias primas químicas' },
      { name: 'Bidones y Garrafas', icon: '🛢️', desc: 'Manipulación segura de líquidos corrosivos y lubricantes en bidones' }
    ],
    advantages: [
      { title: 'FLEXIBILIDAD DE PATRÓN', desc: 'Software de estiba integrado que permite configurar y diseñar nuevos patrones de acomodo de tarima en minutos desde el HMI.', highlight: 'Software Inteligente' },
      { title: 'DISEÑO DE SEGURIDAD SIL3', desc: 'Barreras de luz de seguridad muting y escáneres láser perimetrales que detienen el robot en intrusiones humanas.', highlight: 'Máxima Seguridad' }
    ],
    specs: [
      { param: 'Modelo', value: 'SMQ-PAL Robotized Line' },
      { param: 'Grados de Libertad', value: '4 o 6 ejes articulados de alta dinámica' },
      { param: 'Tipo de Gripper', value: 'Neumático por vacío, mordaza de contacto o magnético a medida' },
      { param: 'Consumo Eléctrico', value: '≈ 8.5 kW | Trifásico 440 VAC' }
    ],
    configurations: [
      { name: 'Dispensador de Tarimas Automático', desc: 'Almacén de 15 tarimas que las alimenta a la base de estiba sin paradas.' },
      { name: 'Colocador de Intercaladores', desc: 'Módulo de succión que inserta láminas de cartón entre capas de cajas.' }
    ]
  },
  extrusoras: {
    pageNumber: '05',
    theme: {
      accent: '#F97316',
      accentGlow: 'rgba(249, 115, 22, 0.4)',
      bgStart: '#120702',
      bgEnd: '#2C1103',
      glowColor: 'orange'
    },
    heroTitle: 'EXTRUSORAS MONOTORNILLO Y DOBLE TORNILLO',
    heroSubtitle: 'Plastificación homogénea de plásticos reciclados y compuestos avanzados.',
    heroDesc: 'Sistemas de extrusión industrial con diseño optimizado de husillo y cañón bimetálicos. Equipada con zonas de desgasificación al vacío de alta eficiencia y sistemas de calentamiento cerámico de bajo consumo energético.',
    heroMedia: 'https://images.unsplash.com/photo-1659167889361-890c288f9dca',
    kpis: [
      { value: '1500', unit: 'KG/HORA', label: 'Capacidad Máxima', desc: 'Procesamiento continuo de alta densidad' },
      { value: 'L/D 36', unit: 'RELACIÓN HUSILLO', label: 'Geometría del Tornillo', desc: 'Mezcla perfecta y plastificación uniforme' },
      { value: '250 kW', unit: 'POTENCIA MOTOR', label: 'Fuerza de Extrusión', desc: 'Motores síncronos de imanes permanentes' },
      { value: '350 °C', unit: 'TEMPERATURA MÁX', label: 'Rango Térmico', desc: 'Control multizona PID en cañón bimetálico' }
    ],
    stations: [
      { id: 1, title: 'Alimentación forzada', desc: 'Tolva dosificadora de pérdida de peso que mantiene un flujo constante de material.', iconName: 'Inbox' },
      { id: 2, title: 'Zona de fundición', desc: 'Calentadores cerámicos y fricción mecánica controlada plastifican el polímero.', iconName: 'Flame' },
      { id: 3, title: 'Desgasificación activa', desc: 'Bomba de vacío elimina humedad y compuestos volátiles del material fundido.', iconName: 'Wind' },
      { id: 4, title: 'Cambiador de filtros', desc: 'Sistema hidráulico de doble pistón filtra impurezas sin detener la línea.', iconName: 'Shield' }
    ],
    applications: [
      { name: 'Pelletizado de PE/PP', icon: '♻️', desc: 'Reciclaje de botellas, bolsas y películas agrícolas post-consumo' },
      { name: 'Compounding', icon: '🧬', desc: 'Mezcla de resinas plásticas con cargas minerales, fibra de vidrio y aditivos' },
      { name: 'Tuberías y Perfiles', icon: '🚰', desc: 'Extrusión continua de perfiles técnicos y conductos de alta presión' }
    ],
    advantages: [
      { title: 'HUSILLO BIMETÁLICO ULTRA-RESISTENTE', desc: 'Recubrimiento de carburo de tungsteno en las crestas del tornillo que incrementa la vida útil contra materiales abrasivos.', highlight: 'Cero Desgaste' },
      { title: 'TECNOLOGÍA DE VACÍO ACTIVO', desc: 'Eliminación del 99% de compuestos volátiles y olores del plástico reciclado mediante doble puerto de desgasificación.', highlight: 'Pellets de Calidad' }
    ],
    specs: [
      { param: 'Modelo', value: 'SMQ-EXT120 Co-Rotativa' },
      { param: 'Diámetro de Husillo', value: '120 mm (Husillos segmentados intercambiables)' },
      { param: 'Sistema de Corte', value: 'Corte en cabezal por anillo de agua (Water ring) o bajo agua' },
      { param: 'Accionamiento', value: 'Motor AC con variador regenerativo Danfoss' }
    ],
    configurations: [
      { name: 'Dosificadores Gravimétricos', desc: 'Control de hasta 4 componentes con precisión del 0.2%.' },
      { name: 'Corte Bajo Agua (Under-Water Pelleting)', desc: 'Ideal para polímeros de baja viscosidad y gran rendimiento estético.' }
    ]
  },
  molinos: {
    pageNumber: '06',
    theme: {
      accent: '#9CA3AF',
      accentGlow: 'rgba(156, 163, 175, 0.4)',
      bgStart: '#0E1117',
      bgEnd: '#1F2937',
      glowColor: 'grey'
    },
    heroTitle: 'MOLINOS TRITURADORES DE ALTO TORQUE',
    heroSubtitle: 'Reducción de tamaño de plásticos rígidos, purgas y metales ligeros.',
    heroDesc: 'Trituradores industriales con cámaras de corte sobrediseñadas. Incorporan rotores de corte helicoidal y cuchillas de acero para herramientas de alta aleación que aseguran un molido uniforme con mínima generación de finos y polvo.',
    heroMedia: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
    kpis: [
      { value: '2200', unit: 'KG/HORA', label: 'Capacidad Máxima', desc: 'Molienda continua en circuito cerrado' },
      { value: '65 HRc', unit: 'DUREZA CUCHILLAS', label: 'Acero de Alta Aleación', desc: 'Resistencia extrema al desgaste por fricción' },
      { value: '110 kW', unit: 'POTENCIA MOTOR', label: 'Fuerza de Impacto', desc: 'Volante de inercia sobredimensionado' },
      { value: '< 85 dB', unit: 'CABINA ACÚSTICA', label: 'Aislamiento de Ruido', desc: 'Paneles fonoabsorbentes multicapa' }
    ],
    stations: [
      { id: 1, title: 'Alimentador inclinado', desc: 'Tolva de alimentación con cortinas de goma antirretorno de material.', iconName: 'Inbox' },
      { id: 2, title: 'Cámara de corte', desc: 'Cuchillas rotativas y fijas realizan un corte de cizalla continuo.', iconName: 'Flame' },
      { id: 3, title: 'Cribado calibrado', desc: 'Malla metálica de cambio rápido que define el tamaño final de la hojuela.', iconName: 'Maximize2' },
      { id: 4, title: 'Transporte neumático', desc: 'Ventilador de alta presión que succiona la hojuela hacia el ciclón de ensacado.', iconName: 'Wind' }
    ],
    applications: [
      { name: 'Molienda de Purgas', icon: '🪵', desc: 'Trituración de bloques de arranque de extrusoras de gran espesor' },
      { name: 'Reciclaje de PET', icon: '🥤', desc: 'Trituración de botellas de PET para producción de hojuelas grado botella' },
      { name: 'Neumáticos y Hule', icon: '🛞', desc: 'Molienda fina de caucho reciclado para aplicaciones deportivas y asfalto' }
    ],
    advantages: [
      { title: 'CORTE HELICOIDAL PROGRESIVO', desc: 'Disposición de cuchillas en el rotor que reduce el consumo eléctrico en un 30% en comparación con cortes planos.', highlight: 'Ahorro Energético' },
      { title: 'RODILLOS DE EXTRACCIÓN RÁPIDA', desc: 'Apertura hidráulica de la cámara de molienda y criba para facilitar cambios de cuchilla en menos de 40 minutos.', highlight: 'Facilidad de Servicio' }
    ],
    specs: [
      { param: 'Modelo', value: 'SMQ-M1200 Heavy Duty' },
      { param: 'Configuración de Rotor', value: 'Rotor escalonado tipo V de 3 o 5 filas de cuchillas' },
      { param: 'Cuchillas Rotativas / Fijas', value: '30 Cuchillas Rotativas / 4 Cuchillas Fijas' },
      { param: 'Apertura de Cámara', value: 'Actuador hidráulico independiente con switch de seguridad' }
    ],
    configurations: [
      { name: 'Cámara refrigerada por agua', desc: 'Evita la fusión de plásticos de bajo punto de ablandamiento durante molienda continua.' },
      { name: 'Detector de metales en banda', desc: 'Detiene automáticamente la banda de alimentación para proteger las cuchillas.' }
    ]
  },
  mezcladoras: {
    pageNumber: '07',
    theme: {
      accent: '#EC4899',
      accentGlow: 'rgba(236, 72, 153, 0.4)',
      bgStart: '#14020A',
      bgEnd: '#30071C',
      glowColor: 'rose'
    },
    heroTitle: 'MEZCLADORAS INDUSTRIALES DE LISTÓN Y PALETAS',
    heroSubtitle: 'Homogeneización perfecta de polvos, pastas y materiales de diferente densidad.',
    heroDesc: 'Equipos de mezcla de alto rendimiento diseñados con cintas helicoidales dobles. Su dinámica tridimensional asegura que las partículas se desplacen de forma radial y axial al mismo tiempo, logrando homogeneidades del 99.8% en tiempos récord.',
    heroMedia: 'https://images.unsplash.com/photo-1659406661027-ac7dd0455011',
    kpis: [
      { value: '4000 L', unit: 'CAPACIDAD MÁXIMA', label: 'Volumen de Mezcla', desc: 'Tanque de mezclado sobredimensionado' },
      { value: '99.8%', unit: 'HOMOGENEIDAD', label: 'Consistencia de Lote', desc: 'Distribución perfecta de ingredientes' },
      { value: '5 min', unit: 'TIEMPO DE CICLO', label: 'Rapidez de Mezcla', desc: 'Optimización de tiempos en planta' },
      { value: '316L SS', unit: 'ACERO SANITARIO', label: 'Grado Farmacéutico', desc: 'Acabado pulido espejo para fácil higienización' }
    ],
    stations: [
      { id: 1, title: 'Dosificación superior', desc: 'Entradas bridadas para dosificación de polvos e inyección de líquidos.', iconName: 'Inbox' },
      { id: 2, title: 'Mezcla por listón', desc: 'Eje de doble cinta mueve el material en direcciones opuestas.', iconName: 'Layers' },
      { id: 3, title: 'Inyección de aditivos', desc: 'Barra de aspersión a presión para integración de aceites y colorantes.', iconName: 'Wind' },
      { id: 4, title: 'Descarga neumática', desc: 'Válvula de compuerta tipo mariposa que evita zonas muertas de acumulación.', iconName: 'LogOut' }
    ],
    applications: [
      { name: 'Polvos Alimenticios', icon: '🌾', desc: 'Mezcla de harinas, azúcar, especias, aditivos y leches en polvo' },
      { name: 'Materiales de Construcción', icon: '🧱', desc: 'Homogeneización de adhesivos, yesos y morteros secos' },
      { name: 'Química y Plásticos', icon: '🧪', desc: 'Integración de masterbatch con resinas y aditivos secos' }
    ],
    advantages: [
      { title: 'DISEÑO DE DOBLE CINTA HELICOIDAL', desc: 'Garantiza que el material en la parte exterior se mueva hacia el centro, mientras que el interior se desplaza hacia los extremos.', highlight: 'Homogeneidad Total' },
      { title: 'VÁLVULA DE DESCARGA ZERO-POCKET', desc: 'Compuerta de descarga de fondo plano que copia la curvatura del tanque de mezcla, eliminando esquinas sin mezclar.', highlight: 'Cero Residuos' }
    ],
    specs: [
      { param: 'Modelo', value: 'SMQ-MX3000 Ribbon Blender' },
      { param: 'Estructura Interna', value: 'Eje robusto montado sobre rodamientos exteriores con sellado de purga de aire' },
      { param: 'Sistema de Descarga', value: 'Actuador neumático de compuerta circular con sello hermético de teflón' },
      { param: 'Terminación superficial', value: 'Pulido espejo interior Ra < 0.4 µm (FDA compliant)' }
    ],
    configurations: [
      { name: 'Camisa de Calentamiento / Enfriamiento', desc: 'Permite controlar la temperatura del producto mediante circulación de fluido térmico.' },
      { name: 'Intensificadores de mezcla (Choppers)', desc: 'Cuchillas de alta velocidad que rompen terrones de forma mecánica.' }
    ]
  },
  silos: {
    pageNumber: '08',
    theme: {
      accent: '#B45309',
      accentGlow: 'rgba(180, 83, 9, 0.4)',
      bgStart: '#140B04',
      bgEnd: '#301A09',
      glowColor: 'amber'
    },
    heroTitle: 'SILOS DE ALMACENAMIENTO Y DESCARGA ACTIVA',
    heroSubtitle: 'Sistemas de almacenamiento vertical herméticos con fluidización activa.',
    heroDesc: 'Silos industriales de acero inoxidable y aluminio para el acopio seguro de polvos y granulados. Equipados con cúpulas de descompresión asistida, filtros de venteo automáticos y fondos vibratorios que previenen la formación de bóvedas de material.',
    heroMedia: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
    kpis: [
      { value: '150 m³', unit: 'CAPACIDAD VOLUMÉTRICA', label: 'Almacenaje Vertical', desc: 'Estructuras modulares autoportantes' },
      { value: 'IP66', unit: 'FILTRACIÓN DE VENTEO', label: 'Control de Emisiones', desc: 'Cartuchos autolimpiantes por pulsos de aire' },
      { value: '4 Celdas', unit: 'PESAJE DINÁMICO', label: 'Monitoreo de Inventario', desc: 'Celdas de carga de alta precisión con HMI' },
      { value: 'Alum/SUS', unit: 'MATERIALES', label: 'Estructura Duradera', desc: 'Resistente a la intemperie y corrosión' }
    ],
    stations: [
      { id: 1, title: 'Carga neumática', desc: 'Alimentación mediante tubería de acero inoxidable con curvas de gran radio anti-desgaste.', iconName: 'Inbox' },
      { id: 2, title: 'Venteo e inspección', desc: 'Filtro automático que separa el polvo del aire de transporte neumático.', iconName: 'Wind' },
      { id: 3, title: 'Control de nivel', desc: 'Sensores rotativos y de radar continuo miden el nivel en tiempo real.', iconName: 'Eye' },
      { id: 4, title: 'Activación de fondo', desc: 'Cono vibrador activo que rompe la cohesión del material facilitando el flujo.', iconName: 'ArrowDownToLine' }
    ],
    applications: [
      { name: 'Resinas Plásticas', icon: '🧫', desc: 'Almacenamiento de pellets de PE, PP, PET y PVC para alimentación de extrusoras' },
      { name: 'Industria Alimenticia', icon: '🌾', desc: 'Acopio hermético de harinas, almidón, azúcar y sémolas' },
      { name: 'Cereales y Semillas', icon: '🌽', desc: 'Almacenamiento en atmósfera controlada para evitar hongos e insectos' }
    ],
    advantages: [
      { title: 'FLUIDIZACIÓN Y FONDO VIBRATORIO', desc: 'Elimina los problemas de flujo como el puenteo y la chimenea en materiales cohesivos o polvos finos.', highlight: 'Descarga Garantizada' },
      { title: 'MEDICIÓN CONTINUA POR RADAR', desc: 'Monitoreo de inventario con precisión milimétrica mediante radares de alta frecuencia sin contacto con el producto.', highlight: 'Control Total' }
    ],
    specs: [
      { param: 'Modelo', value: 'SMQ-SIL150 Modulares' },
      { param: 'Material de construcción', value: 'Acero Inoxidable AISI 304 o Aluminio AlMg3 anticorrosivo' },
      { param: 'Filtro de Venteo', value: 'Área de filtrado de 24 m² con limpieza neumática automática Jet-Pulse' },
      { param: 'Estructura de Soporte', value: 'Faldón de acero al carbono o estructura portante de perfiles estructurales H' }
    ],
    configurations: [
      { name: 'Módulo de pesaje continuo', desc: 'Montaje sobre celdas de carga basculantes con caja de suma inteligente.' },
      { name: 'Inyección de aire seco', desc: 'Soplador con secador desecante para mantener materiales higroscópicos secos.' }
    ]
  },
  transportadores: {
    pageNumber: '09',
    theme: {
      accent: '#3B82F6',
      accentGlow: 'rgba(59, 130, 246, 0.4)',
      bgStart: '#020A1A',
      bgEnd: '#061F4D',
      glowColor: 'blue'
    },
    heroTitle: 'SISTEMAS DE TRANSPORTE NEUMÁTICO Y MECÁNICO',
    heroSubtitle: 'Transferencia automática de materiales a lo largo de toda la planta de producción.',
    heroDesc: 'Sistemas neumáticos por vacío y presión positiva para el movimiento seguro de polvos y granulados. Diseños cerrados que eliminan el polvo en suspensión en planta y garantizan traslados sin degradación de material.',
    heroMedia: 'https://images.unsplash.com/photo-1659167889361-890c288f9dca',
    kpis: [
      { value: '12 Ton/h', unit: 'RENDIMIENTO MÁXIMO', label: 'Capacidad de Flujo', desc: 'Transporte a largas distancias en planta' },
      { value: '180 m', unit: 'DISTANCIA MÁXIMA', label: 'Rango de Traslado', desc: 'Trazados horizontales y verticales complejos' },
      { value: 'Cero', unit: 'EMISIONES POLVO', label: 'Línea Hermética', desc: 'Cuidado del ambiente laboral en planta' },
      { value: '< 1%', unit: 'ROTURA MATERIAL', label: 'Transporte Delicado', desc: 'Fase densa con velocidades controladas' }
    ],
    stations: [
      { id: 1, title: 'Punto de succión', desc: 'Lanza de succión o tolva de carga con válvula dosificadora rotativa.', iconName: 'Inbox' },
      { id: 2, title: 'Cámara de transporte', desc: 'Generador de vacío Roots o compresor impulsa el flujo a alta velocidad.', iconName: 'Wind' },
      { id: 3, title: 'Recepción y ciclón', desc: 'Separador ciclónico que deposita el material y extrae el aire de arrastre.', iconName: 'Layers' },
      { id: 4, title: 'Descarga y dosificado', desc: 'Válvula de descarga neumática entrega el material al punto de consumo.', iconName: 'LogOut' }
    ],
    applications: [
      { name: 'Alimentación de Extrusoras', icon: '🔌', desc: 'Alimentación automática de tolvas en líneas de extrusión y soplado' },
      { name: 'Dosificación de Reactores', icon: '🛢️', desc: 'Carga de polvos en reactores de mezcla herméticos' },
      { name: 'Descarga de Big-Bags', icon: '🏋️', desc: 'Sistemas automatizados de vaciado y transporte de super sacos de 1 Ton' }
    ],
    advantages: [
      { title: 'TRANSPORTE EN FASE DENSA', desc: 'Bajas velocidades de transporte mediante tapones de material que previenen el desgaste de tuberías y rotura de pellets.', highlight: 'Bajo Desgaste' },
      { title: 'LÍNEAS DE TRANSPORTE CERRADAS', desc: 'Evita la contaminación cruzada ambiental y pérdida de materia prima por derrames, garantizando una planta limpia.', highlight: 'Limpieza Total' }
    ],
    specs: [
      { param: 'Modelo', value: 'SMQ-TPV Vacuum Conveying System' },
      { param: 'Tipo de Generador', value: 'Bomba de vacío de garras o soplador trilobular de alta eficiencia' },
      { param: 'Diámetro de Tuberías', value: '2" a 6" en Acero Inoxidable AISI 304 pulido interior' },
      { param: 'Sistema de Limpieza', value: 'Pulsos inversos de aire comprimido sobre filtros de poliéster aluminizado' }
    ],
    configurations: [
      { name: 'Válvula Rotativa de Alta Presión', desc: 'Alimentación continua de líneas de transporte por presión sin fugas de aire.' },
      { name: 'Divertor de Vías Neumático', desc: 'Distribución automática de un punto de origen hacia múltiples destinos.' }
    ]
  },
  'reciclaje-molinos': {
    industry: 'reciclaje',
    machineCode: 'MOL',
    pageNumber: '15',
    theme: {
      accent: '#10B981',
      accentGlow: 'rgba(16, 185, 129, 0.4)',
      bgStart: '#080B12',
      bgEnd: '#0A0B10',
      glowColor: 'green'
    },
    heroTitle: 'MOLINOS TRITURADORES DE ALTA VELOCIDAD',
    heroSubtitle: 'Reducción y molienda precisa de termoplásticos rígidos, purgas y películas.',
    heroDesc: 'Nuestros molinos de la serie GX están diseñados para la reducción de tamaño de termoplásticos en circuito cerrado. Con un diseño de corte helicoidal progresivo tipo V y cámara de molienda optimizada, garantizan una alta densidad de hojuelas con una mínima generación de polvo y finos.',
    heroMedia: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
    kpis: [
      { value: '1200', unit: 'KG/H', label: 'Capacidad Máxima', desc: 'Molienda continua estabilizada' },
      { value: '3', unit: 'CUCHILLAS ROTOR', label: 'Corte Progresivo', desc: 'Disposición helicoidal tipo V' },
      { value: '55', unit: 'KW', label: 'Potencia Motor', desc: 'Transmisión robusta de alta inercia' },
      { value: '< 85', unit: 'DBA', label: 'Nivel Ruido', desc: 'Cabina insonorizada integrada' }
    ],
    stations: [
      { id: 1, title: 'Alimentación controlada', desc: 'Tolva inclinada con cortinas deflectoras anti-retorno de material.', iconName: 'Inbox' },
      { id: 2, title: 'Corte de cizalla', desc: 'Cuchillas del rotor helicoidal cortan contra cuchillas estatoras fijas.', iconName: 'Flame' },
      { id: 3, title: 'Cribado de control', desc: 'Criba inferior calibrada que asegura el tamaño homogéneo de hojuela.', iconName: 'Maximize2' },
      { id: 4, title: 'Evacuación neumática', desc: 'Extractor por soplador neumático que envía las hojuelas al ciclón.', iconName: 'Wind' }
    ],
    applications: [
      { name: 'Termoplásticos Rígidos', icon: '🧫', desc: 'Molienda de botellas, cajas, tubos y piezas de inyección' },
      { name: 'Películas y Films', icon: '🛍️', desc: 'Procesamiento de bolsas de PE y films estirables con agua' },
      { name: 'Purgas de Extrusión', icon: '🪵', desc: 'Trituración directa de bloques de arranque de máquinas extrusoras' }
    ],
    advantages: [
      { title: 'CORTE DE CIZALLA AVANZADO', desc: 'Diseño de rotor helicoidal que minimiza el consumo de energía y reduce la carga térmica sobre el polímero.', highlight: 'Eficiencia Térmica' },
      { title: 'APERTURA HIDRÁULICA RÁPIDA', desc: 'Acceso total a la cámara de corte y criba mediante cilindros hidráulicos en menos de 15 minutos.', highlight: 'Fácil Mantenimiento' }
    ],
    seriesSpecs: [
      {
        title: 'SERIE DE MOLINOS INDUSTRIALES GX',
        headers: ['Modelo', 'Diámetro Rotor (mm)', 'Ancho Rotor (mm)', 'Cuchillas Rotor', 'Cuchillas Estator', 'Potencia (kW)', 'Capacidad (kg/h)'],
        rows: [
          ['Molino GX32', '320', '500', '3', '2', '18.5', '250 - 450'],
          ['Molino GX42', '420', '800', '3', '2', '37', '500 - 800'],
          ['Molino GX45', '450', '1000', '5', '2', '55', '800 - 1200']
        ]
      }
    ],
    configurations: [
      { name: 'Alimentador de Rodillos Forzado', desc: 'Introduce de forma controlada películas de plástico en bobinas directamente.' },
      { name: 'Cámara refrigerada por agua', desc: 'Previene la deformación térmica de plásticos con bajo punto de fusión.' }
    ]
  },
  'reciclaje-trituradoras': {
    industry: 'reciclaje',
    machineCode: 'TRT',
    pageNumber: '16',
    theme: {
      accent: '#10B981',
      accentGlow: 'rgba(16, 185, 129, 0.4)',
      bgStart: '#080B12',
      bgEnd: '#0A0B10',
      glowColor: 'green'
    },
    heroTitle: 'TRITURADORAS INDUSTRIALES DE MONO-EJE Y DOBLE EJE',
    heroSubtitle: 'Triturado primario de pacas, purgas, contenedores y materiales gruesos.',
    heroDesc: 'Nuestras trituradoras (shredders) están diseñadas para procesar materiales de alta densidad y espesor con un elevado torque. Disponibles en versiones mono-eje de empuje hidráulico y doble-eje de corte cruzado para máxima reducción.',
    heroMedia: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
    kpis: [
      { value: '5000', unit: 'KG/H', label: 'Capacidad Máxima', desc: 'Trituración pesada continua' },
      { value: '110', unit: 'KW', label: 'Fuerza Total', desc: 'Motores síncronos de alto torque' },
      { value: '2', unit: 'EJES DE CORTE', label: 'Configuraciones', desc: 'Sistemas mono-eje y doble-eje' },
      { value: 'Auto', unit: 'REVERSA PLC', label: 'Anti-Atascamiento', desc: 'Inversión de marcha automática' }
    ],
    stations: [
      { id: 1, title: 'Alimentación por tolva', desc: 'Ingreso del material en pacas o bloques directamente por gravedad.', iconName: 'Inbox' },
      { id: 2, title: 'Empujador hidráulico', desc: 'Pistón inteligente que presiona el material contra el rotor en movimiento.', iconName: 'Maximize2' },
      { id: 3, title: 'Trituración y desgarre', desc: 'Cuchillas cuadriculadas atornilladas desgarran el material contra contracuchillas.', iconName: 'Flame' },
      { id: 4, title: 'Descarga en criba', desc: 'Criba de gran espesor filtra el triturado antes de su transporte neumático.', iconName: 'LogOut' }
    ],
    applications: [
      { name: 'Purgas y Bloques', icon: '🪵', desc: 'Trituración de bloques de plástico rígido y coladas de inyección' },
      { name: 'Pacas Compactadas', icon: '📦', desc: 'Apertura y triturado directo de pacas de botellas o films' },
      { name: 'Residuos Orgánicos / Madera', icon: '🌲', desc: 'Valorización y reducción de volumen de pallets y desechos' }
    ],
    advantages: [
      { title: 'SISTEMA HIDRÁULICO INTELIGENTE', desc: 'Control dinámico de presión del empujador que evita sobrecargas eléctricas y atascos del rotor.', highlight: 'Protección Mecánica' },
      { title: 'CUCHILLAS MULTICARA ROTATIVAS', desc: 'Cuchillas cuadradas atornilladas con 4 bordes de corte utilizables secuencialmente.', highlight: 'Bajo Costo Operativo' }
    ],
    seriesSpecs: [
      {
        title: 'SERIE ECO | MONO-EJE',
        headers: ['Modelo', 'Longitud Eje (mm)', 'Diámetro Eje (mm)', 'Cuchillas', 'Potencia (kW)', 'Capacidad (kg/h)'],
        rows: [
          ['ECO600', '600', '220', '24', '18.5', '300 - 500'],
          ['ECO800', '800', '220', '34', '30', '500 - 800'],
          ['ECO1000', '1000', '220', '44', '37', '800 - 1200']
        ]
      },
      {
        title: 'SERIE GXS | MEDIANA PRODUCCIÓN MONO-EJE',
        headers: ['Modelo', 'Longitud Eje (mm)', 'Diámetro Eje (mm)', 'Cuchillas', 'Potencia (kW)', 'Capacidad (kg/h)'],
        rows: [
          ['GXS250', '600', '250', '30', '22', '400 - 600'],
          ['GXS500', '800', '300', '40', '37', '600 - 1000'],
          ['GXS750', '1000', '350', '50', '45', '1000 - 1500'],
          ['GXS1000', '1200', '400', '60', '75', '1500 - 2500']
        ]
      },
      {
        title: 'SERIE MINI | DOBLE EJE',
        headers: ['Modelo', 'Cámara de Corte (mm)', 'Espesor Cuchilla (mm)', 'Cuchillas (pcs)', 'Potencia (kW)', 'Capacidad (kg/h)'],
        rows: [
          ['MINI400', '400 x 400', '20', '20', '7.5 x 2', '200 - 400'],
          ['MINI500', '500 x 500', '20', '25', '11 x 2', '400 - 600'],
          ['MINI600', '600 x 600', '30', '20', '15 x 2', '600 - 800']
        ]
      },
      {
        title: 'SERIE M | DOBLE EJE INDUSTRIAL',
        headers: ['Modelo', 'Cámara de Corte (mm)', 'Espesor Cuchilla (mm)', 'Cuchillas (pcs)', 'Potencia (kW)', 'Capacidad (kg/h)'],
        rows: [
          ['M400', '800 x 600', '40', '20', '30 x 2', '1000 - 1500'],
          ['M800', '1000 x 800', '50', '20', '45 x 2', '1500 - 3000'],
          ['M1200', '1200 x 1000', '60', '20', '75 x 2', '3000 - 5000']
        ]
      }
    ],
    configurations: [
      { name: 'Cribado Dinámico', desc: 'Permite calibrar la descarga a tamaños específicos de salida.' },
      { name: 'Tolva de Empuje Vertical', desc: 'Incrementa la velocidad de mordida para materiales de gran volumen y ligereza.' }
    ]
  },
  'reciclaje-peletizadoras': {
    industry: 'reciclaje',
    machineCode: 'PEL',
    pageNumber: '17',
    theme: {
      accent: '#10B981',
      accentGlow: 'rgba(16, 185, 129, 0.4)',
      bgStart: '#080B12',
      bgEnd: '#0A0B10',
      glowColor: 'green'
    },
    heroTitle: 'SISTEMAS DE PELETIZADO Y EXTRUSIÓN',
    heroSubtitle: 'Producción de resina plástica en pellets de alta calidad a partir de material reciclado.',
    heroDesc: 'Nuestras líneas de peletizado cuentan con extrusoras mono y doble tornillo con zonas de desgasificación activa y cambiadores de filtros automáticos. Ofrecen un corte homogéneo al anillo o bajo agua para pellets libres de humedad y olores.',
    heroMedia: 'https://images.unsplash.com/photo-1659167889361-890c288f9dca',
    kpis: [
      { value: '1200', unit: 'KG/H', label: 'Capacidad Máxima', desc: 'Extrusión y corte continuo' },
      { value: 'L/D 36', unit: 'GEOMETRÍA HUSILLO', label: 'Relación Husillo', desc: 'Máxima homogeneización y purga' },
      { value: '250', unit: 'KW', label: 'Potencia Motor', desc: 'Sistemas regenerativos de imán permanente' },
      { value: '99.5%', unit: 'EFICIENCIA', label: 'Pureza de Pellet', desc: 'Pellet grado botella y película' }
    ],
    stations: [
      { id: 1, title: 'Alimentación compactada', desc: 'Compactador-cortador integrado que precalienta y dosifica la película.', iconName: 'Inbox' },
      { id: 2, title: 'Extrusión bimetálica', desc: 'Husillo de diseño optimizado funde y plastifica el material sin quemarlo.', iconName: 'Flame' },
      { id: 3, title: 'Desgasificación activa', desc: 'Doble bomba de vacío elimina gases, humedad y olores de la masa fundida.', iconName: 'Wind' },
      { id: 4, title: 'Cambiador de filtros', desc: 'Sistema hidráulico de placas filtra contaminantes antes del cabezal de corte.', iconName: 'Shield' }
    ],
    applications: [
      { name: 'Película Plástica (LDPE/LLDPE)', icon: '🛍️', desc: 'Peletizado de mermas industriales y películas agrícolas' },
      { name: 'Plásticos Rígidos (HDPE/PP)', icon: '🛢️', desc: 'Procesamiento de hojuelas lavadas de tapas, botes y tarimas' },
      { name: 'Unicel y EPS', icon: '📦', desc: 'Compactación y peletizado de bloques de poliestireno expandido' }
    ],
    advantages: [
      { title: 'CAMBIADOR DE FILTROS SIN PARO', desc: 'Módulos hidráulicos de doble pistón que permiten reemplazar la malla sin interrumpir el flujo de extrusión.', highlight: 'Cero Paradas' },
      { title: 'COMPACTADOR INTEGRADO', desc: 'Sistema que pre-calienta, densifica y alimenta de forma forzada la extrusora en un solo proceso mecánico.', highlight: 'Eficiencia Operativa' }
    ],
    seriesSpecs: [
      {
        title: 'TABLA COMPARATIVA DE SERIES DE PELETIZADO',
        headers: ['Serie', 'Aplicación Principal', 'Sistema de Corte', 'Diámetro Husillo (mm)', 'L/D', 'Capacidad (kg/h)'],
        rows: [
          ['Serie ECO-M', 'Plásticos con humedad (cascada)', 'Corte en frío (tallarines)', '100 - 150', '28 - 32', '150 - 350'],
          ['Serie SP', 'Plásticos rígidos (HDPE/PP)', 'Corte al anillo de agua', '100 - 180', '30 - 36', '250 - 800'],
          ['Serie ZL', 'Películas plásticas (LDPE/LLDPE)', 'Compactador integrado + Anillo', '85 - 160', '32 - 38', '200 - 600'],
          ['Serie WP', 'Sistemas de cascada (alta humedad)', 'Corte al anillo de agua', '120 - 180', '32 / 28', '300 - 1000'],
          ['Serie EPS', 'Bloques de unicel (EPS compactado)', 'Corte al anillo de agua', '120 - 150', '28 - 30', '150 - 300'],
          ['Serie PT', 'Hojuelas de PET (botella a hojuela)', 'Peletizado bajo agua / Spagetti', '90 - 150', '36 - 42', '300 - 1200']
        ]
      }
    ],
    configurations: [
      { name: 'Dosificador de Aditivos Masterbatch', desc: 'Inyección volumétrica o gravimétrica de aditivos y colorantes.' },
      { name: 'Corte Bajo Agua (Under-water Pelleting)', desc: 'Ideal para resinas de baja viscosidad y máxima estética visual.' }
    ]
  },
  'reciclaje-lineas-de-lavado': {
    industry: 'reciclaje',
    machineCode: 'LAV',
    pageNumber: '18',
    theme: {
      accent: '#10B981',
      accentGlow: 'rgba(16, 185, 129, 0.4)',
      bgStart: '#080B12',
      bgEnd: '#0A0B10',
      glowColor: 'green'
    },
    heroTitle: 'LÍNEAS DE LAVADO INDUSTRIALES',
    heroSubtitle: 'Plantas llave en mano para pre-lavado, lavado térmico e higienización de polímeros.',
    heroDesc: 'Sistemas integrales de lavado y descontaminación para la industria de reciclaje de plásticos. Con configuraciones modulares que incluyen tinas de flotación, lavadores de fricción y secadores centrífugos automáticos.',
    heroMedia: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    kpis: [
      { value: '3000', unit: 'KG/H', label: 'Capacidad Máxima', desc: 'Lavado continuo a gran escala' },
      { value: '4', unit: 'ETAPAS DE LAVADO', label: 'Proceso de Pureza', desc: 'Pre-lavado, fricción, térmico y enjuague' },
      { value: '99.8%', unit: 'EFICIENCIA SEPARACIÓN', label: 'Remoción de Tapas', desc: 'Separación por densidad en tinas de flotación' },
      { value: '< 1%', unit: 'HUMEDAD FINAL', label: 'Eficiencia Secado', desc: 'Entrega de hojuelas secas para extrusión' }
    ],
    stations: [
      { id: 1, title: 'Pre-lavado y molienda', desc: 'Remoción primaria de tierras y etiquetas mediante molienda húmeda.', iconName: 'Inbox' },
      { id: 2, title: 'Lavado por fricción', desc: 'Turbina de alta velocidad elimina pegamento y suciedad adherida por fricción de agua.', iconName: 'Flame' },
      { id: 3, title: 'Separación densimétrica', desc: 'Tina de flotación que separa plásticos ligeros (tapas) de pesados (PET).', iconName: 'Maximize2' },
      { id: 4, title: 'Secado centrífugo', desc: 'Centrífuga horizontal elimina el 99% de humedad residual en la hojuela.', iconName: 'Wind' }
    ],
    applications: [
      { name: 'Botellas de PET post-consumo', icon: '🥤', desc: 'Lavado grado alimenticio para reciclaje botella a botella' },
      { name: 'Película Plástica PE/PP', icon: '🛍️', desc: 'Limpieza de películas agrícolas y bolsas post-industriales' },
      { name: 'Contenedores rígidos HDPE', icon: '🛢️', desc: 'Remoción de químicos, grasas y aceites de envases industriales' }
    ],
    advantages: [
      { title: 'LAVADO TÉRMICO Asistido', desc: 'Uso de sosa cáustica y surfactantes en caliente para disolver los pegamentos más difíciles.', highlight: 'Remoción Química' },
      { title: 'SISTEMA DE FILTRACIÓN DE AGUA', desc: 'Recirculación de agua de proceso en circuito cerrado con filtros de malla automáticos.', highlight: 'Ahorro Hídrico' }
    ],
    seriesSpecs: [
      {
        title: 'SERIES DE LÍNEAS DE LAVADO INDUSTRIALES',
        headers: ['Serie', 'Material de Proceso', 'Etapas del Sistema', 'Consumo Agua (m³/t)', 'Potencia Total (kW)', 'Capacidad (kg/h)'],
        rows: [
          ['Serie LPET', 'Botellas de PET post-consumo', 'Pre-lavado, Molienda húmeda, Separación, Lavado térmico', '3 - 5 (con filtración)', '180 - 350', '1000 - 3000'],
          ['Serie LRP', 'Películas plásticas (PE/PP)', 'Trituración, Lavado fricción, Tina flotación, Centrifugado', '4 - 6 (con filtración)', '150 - 280', '500 - 2000']
        ]
      }
    ],
    configurations: [
      { name: 'Separadora de Etiquetas por Aire (Zig-Zag)', desc: 'Módulo neumático para remover polvo y trozos de etiquetas secas.' },
      { name: 'Dosificador de Químicos Autónomo', desc: 'Regulación automática de pH, sosa y detergente en el lavado térmico.' }
    ]
  },
  'reciclaje-desetiquetadoras': {
    industry: 'reciclaje',
    machineCode: 'DES',
    pageNumber: '19',
    theme: {
      accent: '#10B981',
      accentGlow: 'rgba(16, 185, 129, 0.4)',
      bgStart: '#080B12',
      bgEnd: '#0A0B10',
      glowColor: 'green'
    },
    heroTitle: 'DESETIQUETADORAS INDUSTRIALES DE BOTELLAS',
    heroSubtitle: 'Remoción eficiente de etiquetas termoencogibles de botellas PET y PE.',
    heroDesc: 'Nuestras desetiquetadoras de la serie RC eliminan etiquetas autoadhesivas y sleeves mediante cuchillas especiales atornilladas en un rotor helicoidal. Evitan la fractura del cuello de la botella manteniendo la integridad del envase antes de la molienda.',
    heroMedia: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
    kpis: [
      { value: '98%', unit: 'EFICIENCIA', label: 'Tasa de Desetiquetado', desc: 'Remoción de etiquetas sleeve de alta adhesión' },
      { value: '< 2%', unit: 'ROTURA BOTELLA', label: 'Integridad del Envase', desc: 'Mantiene las botellas enteras' },
      { value: '37', unit: 'KW', label: 'Potencia Motor', desc: 'Tracción estable para flujos densos' },
      { value: '3000', unit: 'KG/H', label: 'Capacidad Máxima', desc: 'Alimentación continua automatizada' }
    ],
    stations: [
      { id: 1, title: 'Alimentación por tolva', desc: 'Ingreso continuo de botellas sopladas al compartimento del rotor.', iconName: 'Inbox' },
      { id: 2, title: 'Remoción por fricción', desc: 'Cuchillas del rotor rasgan y cortan la etiqueta sin romper la botella.', iconName: 'Flame' },
      { id: 3, title: 'Inyección de agua', desc: 'Rociadores interiores que lavan y facilitan el desprendimiento de etiquetas.', iconName: 'Wind' },
      { id: 4, title: 'Separación neumática', desc: 'Criba interna descarga las botellas y extrae las etiquetas por flujo de aire.', iconName: 'LogOut' }
    ],
    applications: [
      { name: 'Botellas de PET', icon: '🥤', desc: 'Remoción de sleeves de botellas de refrescos y agua post-consumo' },
      { name: 'Envases de HDPE', icon: '🛢️', desc: 'Desetiquetado de botellas de leche, detergente y envases de soplado' }
    ],
    advantages: [
      { title: 'CUCHILLAS CON DISEÑO EXCLUSIVO', desc: 'Cuchillas de aleación templada que enganchan la etiqueta sin penetrar el cuerpo de la botella.', highlight: 'Bajo Desperdicio' },
      { title: 'OPERACIÓN CONTINUA EN HÚMEDO', desc: 'Inyección de agua de proceso que lubrica la cámara de fricción, evitando el sobrecalentamiento del plástico.', highlight: 'Limpieza Asistida' }
    ],
    seriesSpecs: [
      {
        title: 'DESETIQUETADORAS INDUSTRIALES SERIE RC',
        headers: ['Modelo', 'Tasa de Remoción (%)', 'Tasa de Rotura (%)', 'Diámetro Rotor (mm)', 'Potencia Motor (kW)', 'Capacidad (kg/h)'],
        rows: [
          ['RC1000', '> 95%', '< 3%', '1000', '22', '1000 - 1500'],
          ['RC1500', '> 98%', '< 2%', '1200', '37', '2000 - 3000']
        ]
      }
    ],
    configurations: [
      { name: 'Rotor con Cuchillas de Recambio Rápido', desc: 'Cuchillas empernadas en lugar de soldadas para un reemplazo ágil.' },
      { name: 'Módulo de Extracción de Etiquetas por Viento', desc: 'Ciclón adicional para la separación física y ensacado de etiquetas.' }
    ]
  },
  'reciclaje-sistemas-de-secado': {
    industry: 'reciclaje',
    machineCode: 'SEC',
    pageNumber: '20',
    theme: {
      accent: '#10B981',
      accentGlow: 'rgba(16, 185, 129, 0.4)',
      bgStart: '#080B12',
      bgEnd: '#0A0B10',
      glowColor: 'green'
    },
    heroTitle: 'SISTEMAS DE SECADO DE ALTO RENDIMIENTO',
    heroSubtitle: 'Secadoras mecánicas horizontales, centrífugas y squeezers para hojuelas y films.',
    heroDesc: 'Sistemas industriales de deshidratación de polímeros. Ofrecen una reducción drástica de humedad residual para hojuelas rígidas y películas plásticas finas mediante procesos de centrifugado mecánico de alta inercia o exprimido por compresión.',
    heroMedia: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    kpis: [
      { value: '3000', unit: 'KG/H', label: 'Capacidad Máxima', desc: 'Secado dinámico continuo' },
      { value: '< 1%', unit: 'HUMEDAD FINAL', label: 'Secado en Rígidos', desc: 'Perfecto para hojuelas de PET y HDPE' },
      { value: '110', unit: 'KW', label: 'Potencia Squeezer', desc: 'Exprimido extremo para películas' },
      { value: 'Auto', unit: 'LIMPIEZA DE MALLA', label: 'Mantenimiento', desc: 'Sistema de autolavado por chorro de agua' }
    ],
    stations: [
      { id: 1, title: 'Alimentación húmeda', desc: 'Ingreso directo de hojuelas con alta humedad al rotor centrífugo.', iconName: 'Inbox' },
      { id: 2, title: 'Centrifugado dinámico', desc: 'Rotor gira a más de 1200 RPM lanzando el agua a través de una criba circular.', iconName: 'Flame' },
      { id: 3, title: 'Exprimido por tornillo (Squeezer)', desc: 'Tornillo cónico exprime mecánicamente películas plásticas finas.', iconName: 'Maximize2' },
      { id: 4, title: 'Descarga seca', desc: 'Material con humedad óptima es soplado hacia la tolva de ensacado.', iconName: 'LogOut' }
    ],
    applications: [
      { name: 'Hojuelas de PET / Rígidos', icon: '🥤', desc: 'Secado centrífugo de hojuelas lavadas de alta densidad' },
      { name: 'Film Plástico PE / PP', icon: '🛍️', desc: 'Exprimido mecánico de películas plásticas muy finas y húmedas' },
      { name: 'Rafia y Bolsas de Rafia', icon: '🌾', desc: 'Secado de fibras sintéticas y filamentos continuos' }
    ],
    advantages: [
      { title: 'CENTRIFUGADO DE ALTA VELOCIDAD', desc: 'Estructura balanceada dinámicamente que elimina el 99% de agua libre sin fundir el material.', highlight: 'Eficiencia Mecánica' },
      { title: 'EXPRIMIDOR TIPO SQUEEZER', desc: 'Reducción de humedad en películas del 40% a menos del 2% mediante compresión por fricción.', highlight: 'Películas Secas' }
    ],
    seriesSpecs: [
      {
        title: 'EQUIPOS DE SECADO DE ALTO RENDIMIENTO',
        headers: ['Serie / Modelo', 'Tipo de Secador', 'Material Recomendado', 'Humedad Residual (%)', 'Potencia (kW)', 'Capacidad (kg/h)'],
        rows: [
          ['Serie SC', 'Secadora horizontal', 'Film plástico / PE / PP', '< 5%', '45 - 75', '500 - 1500'],
          ['Serie HT', 'Centrífuga automática', 'Plásticos rígidos / HDPE / PET', '< 1%', '22 - 45', '1000 - 3000'],
          ['Serie SQ', 'Squeezer mecánico', 'Películas muy finas / Rafia', '< 2%', '90 - 160', '500 - 1200']
        ]
      }
    ],
    configurations: [
      { name: 'Calentador Térmico Final de Aire', desc: 'Módulo de aire caliente para reducir la humedad por debajo del 0.5%.' },
      { name: 'Sistema de Autolavado Automático de Criba', desc: 'Inyección de agua a presión que evita la colmatación de la malla.' }
    ]
  },
  'reciclaje-sistemas-de-separacion': {
    industry: 'reciclaje',
    machineCode: 'SEP',
    pageNumber: '21',
    theme: {
      accent: '#10B981',
      accentGlow: 'rgba(16, 185, 129, 0.4)',
      bgStart: '#080B12',
      bgEnd: '#0A0B10',
      glowColor: 'green'
    },
    heroTitle: 'SISTEMAS DE CLASIFICACIÓN Y SEPARACIÓN',
    heroSubtitle: 'Clasificación óptica por color, tipo de polímero y separación de metales.',
    heroDesc: 'Sistemas inteligentes de clasificación y separación de alta precisión. Integran cámaras ópticas de alta resolución, sensores NIR para identificación de polímeros y separadores de corrientes de Foucault (Eddy Current) para metales no ferrosos.',
    heroMedia: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
    kpis: [
      { value: '99.5%', unit: 'PUREZA', label: 'Precisión de Selección', desc: 'Separación exacta por tipo y color' }  ,
      { value: '5000', unit: 'KG/H', label: 'Capacidad Máxima', desc: 'Clasificación a gran velocidad' },
      { value: 'NIR', unit: 'TECNOLOGÍA SENSOR', label: 'Identificación Espectral', desc: 'Diferenciación instantánea de resinas' },
      { value: '128', unit: 'EJECTORES AIRE', label: 'Módulos Neumáticos', desc: 'Eyección milimétrica de contaminantes' }
    ],
    stations: [
      { id: 1, title: 'Alimentación por vibrador', desc: 'Distribución homogénea de hojuelas o botellas en una monocapa sobre la rampa.', iconName: 'Inbox' },
      { id: 2, title: 'Inspección óptica/NIR', desc: 'Cámaras y sensores de infrarrojo cercano escanean cada partícula en microsegundos.', iconName: 'Eye' },
      { id: 3, title: 'Cálculo de trayectoria', desc: 'Procesador FPGA calcula las coordenadas exactas de las impurezas detectadas.', iconName: 'Layers' },
      { id: 4, title: 'Eyección por aire', desc: 'Pistolas de aire comprimido ultrarrápidas soplan y desvían los contaminantes fuera del flujo.', iconName: 'LogOut' }
    ],
    applications: [
      { name: 'Separación por Color de PET', icon: '🥤', desc: 'Clasificación de hojuelas de PET transparentes de verdes y de color' },
      { name: 'Separación de Polímeros', icon: '🧫', desc: 'Detección y eyección de PVC en líneas de hojuela de PET' },
      { name: 'Recuperación de Metales', icon: '🔩', desc: 'Separación de aluminio y cobre en líneas de triturado electrónico y plásticos' }
    ],
    advantages: [
      { title: 'SENSÓRICA NIR MULTI-ESPECTRAL', desc: 'Identifica al instante resinas plásticas químicamente idénticas pero físicamente distintas (PET, PVC, PP, PE).', highlight: 'Pureza Química' },
      { title: 'EJECTORES NEUMÁTICOS MATRIX', desc: 'Válvulas de aire con tiempos de respuesta menores a 1 ms que reducen la pérdida de material útil.', highlight: 'Eyección Precisa' }
    ],
    seriesSpecs: [
      {
        title: 'TECNOLOGÍAS DE SEPARACIÓN Y PURIFICACIÓN',
        headers: ['Serie / Modelo', 'Principio de Operación', 'Tipo de Separación', 'Tasa de Pureza (%)', 'Potencia (kW)', 'Capacidad (kg/h)'],
        rows: [
          ['Serie SG', 'Separadora de hojuelas', 'Por color (RGB / NIR)', '99.5%', '8.5', '1000 - 2500'],
          ['Serie DX', 'Separadora de botellas', 'Por polímero (IA / Espectrometría)', '98.0%', '11.0', '1500 - 3500'],
          ['Serie DT', 'Eddy Current (Foucault)', 'Metales no ferrosos (Aluminio/Cobre)', '99.0%', '15.0', '2000 - 5000']
        ]
      }
    ],
    configurations: [
      { name: 'Cámara de Alta Resolución NIR Double-sided', desc: 'Escaneo por ambas caras para máxima precisión óptica.' },
      { name: 'Compresor de Aire Integrado de Bajo Ruido', desc: 'Alimentación de aire comprimido estable y libre de aceite.' }
    ]
  },
  'reciclaje-cristalizadoras': {
    industry: 'reciclaje',
    machineCode: 'CRI',
    pageNumber: '22',
    theme: {
      accent: '#10B981',
      accentGlow: 'rgba(16, 185, 129, 0.4)',
      bgStart: '#080B12',
      bgEnd: '#0A0B10',
      glowColor: 'green'
    },
    heroTitle: 'SISTEMAS DE CRISTALIZACIÓN INFRARROJA IRD',
    heroSubtitle: 'Cristalización y secado ultra rápido de hojuelas de PET para extrusión directa.',
    heroDesc: 'Nuestras cristalizadoras por tambor giratorio y radiación infrarroja de onda corta cristalizan y secan las hojuelas de PET en menos de 20 minutos. Previenen la hidrólisis del polímero durante la extrusión mejorando la viscosidad intrínseca.',
    heroMedia: 'https://images.unsplash.com/photo-1659167889361-890c288f9dca',
    kpis: [
      { value: '1500', unit: 'KG/H', label: 'Capacidad Máxima', desc: 'Cristalización continua rápida' },
      { value: '20 min', unit: 'TIEMPO PROCESO', label: 'Eficiencia Temporal', desc: 'Frente a las 6 horas de silos de aire caliente' },
      { value: '< 50 ppm', unit: 'HUMEDAD FINAL', label: 'Deshidratación Profunda', desc: 'Evita la degradación hidrolítica' },
      { value: '90', unit: 'KW', label: 'Potencia Calentador', desc: 'Mapeo térmico infrarrojo optimizado' }
    ],
    stations: [
      { id: 1, title: 'Alimentación volumétrica', desc: 'Ingreso continuo de hojuelas húmedas mediante tornillo dosificador.', iconName: 'Inbox' },
      { id: 2, title: 'Distribución y tambor', desc: 'Tambor giratorio con álabes internos mezcla continuamente el PET bajo la luz infrarroja.', iconName: 'Maximize2' },
      { id: 3, title: 'Calentamiento infrarrojo', desc: 'Lámparas infrarrojas calientan directamente la hojuela evaporando la humedad.', iconName: 'Flame' },
      { id: 4, title: 'Descarga y cristalizado', desc: 'Hojuelas de PET completamente cristalizadas listas para alimentar la extrusora.', iconName: 'LogOut' }
    ],
    applications: [
      { name: 'Hojuelas de PET post-consumo', icon: '🥤', desc: 'Cristalización de hojuelas lavadas de PET antes del peletizado' },
      { name: 'Película y fleje de PET', icon: '🛍️', desc: 'Precalentamiento y secado para líneas de extrusión de lámina PET' },
      { name: 'Plásticos Higroscópicos (PLA)', icon: '🌱', desc: 'Cristalización y secado rápido de polímeros biodegradables' }
    ],
    advantages: [
      { title: 'RADIACIÓN INFRARROJA DIRECTA', desc: 'Calienta el material de adentro hacia afuera, logrando evaporar el agua interna de forma instantánea sin aglomerar las hojuelas.', highlight: 'Tecnología IRD' },
      { title: 'CERO AGLOMERACIÓN DEL PET', desc: 'El giro continuo del tambor evita la fusión o pegado de las hojuelas amorfas durante la fase crítica de transición vítrea.', highlight: 'Flujo Continuo' }
    ],
    seriesSpecs: [
      {
        title: 'SISTEMAS DE CRISTALIZACIÓN INFRARROJA IRD',
        headers: ['Modelo', 'Diámetro Tambor (mm)', 'Longitud Tambor (mm)', 'Tiempo Residencia (min)', 'Potencia Calentador (kW)', 'Capacidad (kg/h)'],
        rows: [
          ['Cristalizadora IRD30', '600', '3000', '15 - 20', '30', '300 - 500'],
          ['Cristalizadora IRD100', '1000', '4500', '15 - 20', '90', '1000 - 1500']
        ]
      }
    ],
    configurations: [
      { name: 'Control de Temperatura Infrarrojo por Pirómetro', desc: 'Sensor óptico sin contacto que regula la potencia de las lámparas en tiempo real.' },
      { name: 'Tornillo de Descarga Enfriador', desc: 'Tornillo con camisa de refrigeración para bajar la temperatura del PET antes de su ensacado.' }
    ]
  }
};

const StatCounter = ({ target, suffix = '', duration = 2000, trigger = 0, accent = '#FFD700' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const num = parseInt(target, 10);
    if (isNaN(num)) {
      setCount(target);
      return;
    }

    let start = 0;
    const end = num;
    setCount(0);

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
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
    return <span className="tracking-wide animate-pulse" style={{ color: accent }}>{target}</span>;
  }

  return <span>{count}{suffix}</span>;
};

const StatCard = ({ target, suffix = '', label, colSpan = "col-span-1", accent = '#FFD700' }) => {
  const [trigger, setTrigger] = useState(0);
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className={`flex flex-col items-center self-center cursor-pointer transition-all duration-300 transform hover:scale-110 group ${colSpan}`}
      onMouseEnter={() => {
        setTrigger(prev => prev + 1);
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <span 
        className="text-3xl md:text-4xl font-black tracking-tight transition-all duration-300"
        style={{
          color: hovered ? '#FFFFFF' : accent,
          filter: hovered ? 'drop-shadow(0 0 15px rgba(255,255,255,0.6))' : `drop-shadow(0 0 12px ${accent}60)`
        }}
      >
        <StatCounter target={target} suffix={suffix} trigger={trigger} accent={accent} />
      </span>
      <span 
        className="text-[10px] font-black uppercase tracking-wider mt-2 transition-colors duration-300"
        style={{
          color: hovered ? accent : 'rgba(255, 255, 255, 0.7)'
        }}
      >
        {label}
      </span>
    </div>
  );
};

const MachineryDetailPage = () => {
  const { machineId } = useParams();
  const { cmsState, updatePages, isEditorMode } = useCMS();
  const fileInputRef = useRef(null);

  // Fallback defaults or dynamic models
  const resolvedId = machineId || 'etiquetadoras';
  
  // Dynamic defaults generator
  const getDynamicDefaults = (id) => {
    if (machineryDataMap[id]) {
      return machineryDataMap[id];
    }
    
    // Create a high-fidelity dynamic fallback for any custom model (e.g. lwf-500)
    const modelName = id.toUpperCase();
    return {
      pageNumber: '00',
      theme: {
        accent: '#FFD700',
        accentGlow: 'rgba(255, 215, 0, 0.4)',
        bgStart: '#080B12',
        bgEnd: '#0A0B10',
        glowColor: 'yellow'
      },
      heroTitle: `MODELO ${modelName}`,
      heroSubtitle: `Especificaciones de ingeniería y desempeño para el equipo ${modelName}.`,
      heroDesc: `Línea de maquinaria industrial SMQ optimizada para máxima eficiencia, precisión y control absoluto en flujos de trabajo continuos.`,
      heroMedia: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      kpis: [
        { value: '99.2%', unit: 'EFICIENCIA', label: 'Rendimiento', desc: 'Producción continua' },
        { value: '24/7', unit: 'OPERACIÓN', label: 'Disponibilidad', desc: 'Sistemas redundantes' },
        { value: 'Auto', unit: 'CONTROL', label: 'Precisión', desc: 'Control avanzado por PLC' },
        { value: 'Premium', unit: 'CALIDAD', label: 'Estándar', desc: 'Materiales duraderos' }
      ],
      stations: [
        { id: 1, title: 'Alimentación', desc: 'Ingreso del material al sistema automatizado.', iconName: 'Inbox' },
        { id: 2, title: 'Procesamiento', desc: 'Transformación del producto bajo estrictos controles.', iconName: 'Layers' },
        { id: 3, title: 'Control de Calidad', desc: 'Verificación en línea del producto final.', iconName: 'Eye' },
        { id: 4, title: 'Descarga', desc: 'Salida del material terminado y empacado.', iconName: 'LogOut' }
      ],
      applications: [
        { name: 'Sector Industrial', icon: '🏭', desc: 'Diseñado para entornos exigentes' }
      ],
      advantages: [
        { title: 'CONSTRUCCIÓN PREMIUM', desc: 'Estructura sólida anticorrosiva con materiales de alta calidad.', highlight: 'Durabilidad' }
      ],
      specs: [
        { param: 'Modelo', value: modelName },
        { param: 'Capacidad', value: 'Configurable según requerimiento' },
        { param: 'Material', value: 'Acero Inoxidable' }
      ],
      configurations: [
        { name: 'Automatización Completa', desc: 'Módulos adicionales para operación desatendida.' }
      ]
    };
  };

  const defaults = getDynamicDefaults(resolvedId);

  // Try to find the page inside the CMS context
  const pageId = `machinery-${resolvedId}`;
  const cmsPage = cmsState.pages.find(p => p.id === pageId);

  // Initialize page in CMS if not present
  useEffect(() => {
    if (!cmsPage) {
      const initialPageData = {
        id: pageId,
        title: defaults.heroTitle,
        slug: `/maquinaria/${resolvedId}`,
        modules: [
          {
            id: `machinery-data-${resolvedId}`,
            type: 'machinery-product',
            data: defaults
          }
        ]
      };
      updatePages([...cmsState.pages, initialPageData]);
    }
  }, [cmsPage, resolvedId, pageId, cmsState.pages, updatePages]);

  const baseData = cmsPage?.modules?.[0]?.data || defaults;
  
  // Sanitizar temas para que todas las páginas de maquinaria usen el fondo oscuro neutral oficial del sitio
  const data = React.useMemo(() => {
    return {
      ...baseData,
      theme: {
        ...(baseData?.theme || {}),
        bgStart: '#080B12',
        bgEnd: '#0A0B10'
      }
    };
  }, [baseData]);

  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState('hero');
  const [isUploading, setIsUploading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const [backPath, setBackPath] = useState('/industria/alimentos');
  const [backName, setBackName] = useState('Sector Alimentos');

  useEffect(() => {
    const savedPath = localStorage.getItem('last_sector_path');
    const savedName = localStorage.getItem('last_sector_name');
    if (savedPath) {
      setBackPath(savedPath);
    } else {
      // Deducir del sector de la máquina si no hay localStorage
      const currentIndustry = data.industry || defaults.industry;
      if (currentIndustry === 'reciclaje' || currentIndustry === 'reciclaje-y-plasticos') {
        setBackPath('/industria/reciclaje-y-plasticos');
      } else {
        setBackPath('/industria/alimentos');
      }
    }

    if (savedName) {
      setBackName(savedName);
    } else {
      const currentIndustry = data.industry || defaults.industry;
      if (currentIndustry === 'reciclaje' || currentIndustry === 'reciclaje-y-plasticos') {
        setBackName('Sector Reciclaje');
      } else {
        setBackName('Sector Alimentos');
      }
    }
  }, [data.industry, defaults.industry]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [resolvedId]);

  const handleUpdate = (key, value) => {
    const updatedData = { ...data, [key]: value };
    const updatedPage = {
      id: pageId,
      title: data.heroTitle,
      slug: `/maquinaria/${resolvedId}`,
      modules: [
        {
          id: `machinery-data-${resolvedId}`,
          type: 'machinery-product',
          data: updatedData
        }
      ]
    };
    const otherPages = cmsState.pages.filter(p => p.id !== pageId);
    updatePages([...otherPages, updatedPage]);
  };

  const handleMediaUpload = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUploading(true);
        const url = await uploadFile(file, "media");
        handleUpdate(field, url);
      } catch (err) {
        console.error("Error al subir archivo:", err);
        alert('No se pudo subir el archivo. Verifica tu conexión.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const stationsList = data.stations || defaults.stations;
  const kpisList = data.kpis || defaults.kpis;
  const applicationsList = data.applications || defaults.applications;
  const advantagesList = data.advantages || defaults.advantages;
  const specsList = data.specs || defaults.specs;
  const configurationsList = data.configurations || defaults.configurations;

  const currentMedia = data.heroMedia || defaults.heroMedia;
  const isVideo = !!(currentMedia.match(/\.(mp4|webm|ogg|mov|mkv)$/i) || currentMedia.includes('video/'));

  return (
    <>
      <Helmet>
        <title>{data.heroTitle} | SMQ Industrial Systems</title>
        <meta name="description" content={data.heroSubtitle} />
      </Helmet>

      {/* Styled dynamic page container with HSL gradient tailored colors */}
      <div 
        className="min-h-screen text-white overflow-hidden font-['Poppins'] flex flex-col relative transition-colors duration-1000"
        style={{
          background: `linear-gradient(135deg, ${data.theme.bgStart} 0%, ${data.theme.bgEnd} 100%)`
        }}
      >
        {/* Glows Ambientales Decorativos */}
        <div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none -z-10 transition-all duration-1000" 
          style={{ backgroundColor: `${data.theme.accent}10` }}
        />
        <div 
          className="absolute top-[40%] right-10 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none -z-10 transition-all duration-1000" 
          style={{ backgroundColor: `${data.theme.accent}08` }}
        />

        {/* ========================================================================= */}
        {/* SLIDING premium cms panel on the right side if isEditorMode is active */}
        {/* ========================================================================= */}
        {isEditorMode && (
          <div className="fixed top-28 right-6 z-[990] w-[380px] bg-[#0B0F19]/95 border border-white/10 p-5 rounded-2xl shadow-2xl backdrop-blur-md overflow-y-auto max-h-[75vh] flex flex-col gap-4 text-left animate-slide-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2" style={{ color: data.theme.accent }}>
                <Settings size={18} className="animate-spin [animation-duration:15s]" />
                <span className="font-black text-xs uppercase tracking-widest text-white">Editor de Maquinaria</span>
              </div>
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded border" style={{ backgroundColor: `${data.theme.accent}20`, color: data.theme.accent, borderColor: `${data.theme.accent}30` }}>PÁG. {data.pageNumber}</span>
            </div>

            {/* Editor Tabs Navigation */}
            <div className="flex bg-white/5 p-1 rounded-lg gap-1">
              {['hero', 'listas'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-[11px] font-black uppercase tracking-wider py-1.5 rounded transition-all cursor-pointer ${
                    activeTab === tab ? 'bg-white text-black font-bold shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  style={activeTab === tab ? { backgroundColor: data.theme.accent, color: '#000000' } : {}}
                >
                  {tab === 'hero' ? 'General' : 'Detalles'}
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
                    style={{ focusBorderColor: data.theme.accent }}
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
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Descripción</label>
                  <textarea
                    rows={3}
                    value={data.heroDesc}
                    onChange={(e) => handleUpdate('heroDesc', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FFD700] outline-none resize-none"
                  />
                </div>

                {/* Hero Media Upload */}
                <div className="flex flex-col gap-1.5 border-t border-white/10 pt-3">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Imagen de Fondo</label>
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
                    className="text-black font-bold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    style={{ backgroundColor: data.theme.accent }}
                  >
                    {isUploading ? (
                      <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    ) : (
                      <Upload size={14} />
                    )}
                    <span>Subir Imagen</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'listas' && (
              <div className="text-white/70 text-xs py-4 text-center">
                <span>Edita el contenido haciendo doble clic en los textos directamente en la interfaz.</span>
              </div>
            )}
          </div>
        )}

        <div className="md:pl-[76px] transition-all duration-300">
          {/* Fila de navegación superior (Regresar) */}
          <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 pt-6 pb-2 flex items-center justify-between z-30">
            <Link
              to={backPath}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-pointer group bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/5 hover:border-white/10 shadow-lg backdrop-blur-sm"
            >
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Regresar a {backName}</span>
            </Link>
          </div>

          {/* STICKY SUBMENU PARA NAVEGACIÓN Y MAQUINARIA RELACIONADA */}
          {(() => {
            const currentIndustry = data.industry || defaults.industry;
            const isRecycling = currentIndustry === 'reciclaje' || currentIndustry === 'reciclaje-y-plasticos';

            // 17 opciones específicas de Reciclaje tomadas de la captura
            const recyclingMenuItems = [
              { label: 'TRITURACIÓN INDUSTRIAL', href: '/industria/reciclaje-y-plasticos#trituracion', icon: Settings },
              { label: 'GRANULACIÓN', href: '/industria/reciclaje-y-plasticos#granulacion', icon: Grid },
              { label: 'LAVADO DE PLÁSTICO', href: '/industria/reciclaje-y-plasticos#lavado', icon: Droplet },
              { label: 'FLOTACIÓN', href: '/industria/reciclaje-y-plasticos#flotacion', icon: Waves },
              { label: 'LAVADO POR FRICCIÓN', href: '/industria/reciclaje-y-plasticos#friccion', icon: RotateCw },
              { label: 'SEPARACIÓN INDUSTRIAL', href: '/industria/reciclaje-y-plasticos#separacion', icon: Grid },
              { label: 'CLASIFICACIÓN ÓPTICA', href: '/industria/reciclaje-y-plasticos#clasificacion-optica', icon: Target },
              { label: 'PELETIZADO', href: '/industria/reciclaje-y-plasticos#peletizado', icon: CircleDot },
              { label: 'COMPACTACIÓN', href: '/industria/reciclaje-y-plasticos#compactacion', icon: Sliders },
              { label: 'MOLINOS TRITURADORES DE ALTA VELOCIDAD', href: '/maquinaria/reciclaje-molinos', icon: Zap, isMachine: true, code: 'reciclaje-molinos' },
              { label: 'TRITURADORAS INDUSTRIALES DE MONO-EJE Y DOBLE EJE', href: '/maquinaria/reciclaje-trituradoras', icon: Package, isMachine: true, code: 'reciclaje-trituradoras' },
              { label: 'PELETIZADO Y EXTRUSIÓN', href: '/maquinaria/reciclaje-peletizadoras', icon: Cable, isMachine: true, code: 'reciclaje-peletizadoras' },
              { label: 'LÍNEAS DE LAVADO INDUSTRIALES', href: '/maquinaria/reciclaje-lineas-de-lavado', icon: Leaf, isMachine: true, code: 'reciclaje-lineas-de-lavado' },
              { label: 'DESETIQUETADORAS INDUSTRIALES DE BOTELLAS', href: '/maquinaria/reciclaje-desetiquetadoras', icon: Tag, isMachine: true, code: 'reciclaje-desetiquetadoras' },
              { label: 'SECADO DE ALTO RENDIMIENTO', href: '/maquinaria/reciclaje-sistemas-de-secado', icon: Wind, isMachine: true, code: 'reciclaje-sistemas-de-secado' },
              { label: 'CLASIFICACIÓN Y SEPARACIÓN', href: '/maquinaria/reciclaje-sistemas-de-separacion', icon: Sliders, isMachine: true, code: 'reciclaje-sistemas-de-separacion' },
              { label: 'CRISTALIZACIÓN INFRARROJA IRD', href: '/maquinaria/reciclaje-cristalizadoras', icon: Sun, isMachine: true, code: 'reciclaje-cristalizadoras' }
            ];

            // Generar dinámicamente las opciones para otras industrias (ej. Alimentos)
            const relatedMachines = Object.values(machineryDataMap)
              .filter(m => m.industry && m.industry === currentIndustry && m.machineCode);

            const otherMenuItems = relatedMachines.map(m => {
              const key = Object.keys(machineryDataMap).find(k => machineryDataMap[k].machineCode === m.machineCode) || m.machineCode;
              
              // Asignar iconos lógicos basados en el código de máquina
              let IconComponent = Settings;
              if (m.machineCode === 'MIX') IconComponent = Grid;
              else if (m.machineCode === 'LAV') IconComponent = Droplet;
              else if (m.machineCode === 'SEC') IconComponent = Wind;
              else if (m.machineCode === 'COC') IconComponent = Flame;
              else if (m.machineCode === 'DOS') IconComponent = Sliders;
              else if (m.machineCode === 'EXT') IconComponent = Cable;
              else if (m.machineCode === 'MLD') IconComponent = Package;
              else if (m.machineCode === 'TRT') IconComponent = Zap;

              return {
                label: m.heroTitle.replace('PRODUCCIÓN DE ', '').replace('SISTEMAS DE ', '').replace('INDUSTRIALES', ''),
                href: `/maquinaria/${key}`,
                icon: IconComponent,
                isMachine: true,
                code: key
              };
            });

            const menuItems = isRecycling ? recyclingMenuItems : otherMenuItems;

            return (
              <div className="w-full bg-[#04060A]/95 backdrop-blur-md border-y border-[#84CC16]/30 sticky top-[90px] z-40 shadow-[0_0_35px_rgba(132,204,22,0.08)] transition-all duration-300">
                {/* Fila de cabecera del submenú pegajoso */}
                <div className="max-w-[1400px] mx-auto px-6 py-2.5 flex items-center justify-between gap-4 border-b border-[#84CC16]/10">
                  <div className="flex items-center gap-3">
                    <Link
                      to={backPath}
                      className="px-3.5 py-2 rounded text-[10px] font-black uppercase tracking-widest text-white bg-black/40 border border-[#84CC16]/25 hover:border-[#84CC16] hover:bg-[#84CC16]/10 hover:shadow-[0_0_10px_rgba(132,204,22,0.15)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer group"
                    >
                      <ArrowLeft size={12} className="text-[#84CC16] group-hover:scale-110 transition-transform duration-300" />
                      <span>Volver</span>
                    </Link>
                    <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider hidden sm:inline-block">
                      Sector Activo: <span className="text-[#84CC16]">{backName.replace('Sector ', '')}</span>
                    </span>
                  </div>

                  {/* Toggle para abrir/cerrar la botonera */}
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest text-white bg-black/40 border border-[#84CC16]/40 hover:border-[#84CC16] hover:bg-[#84CC16]/20 transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_10px_rgba(132,204,22,0.1)]"
                  >
                    <Sliders size={12} className="text-[#84CC16] animate-pulse" />
                    <span>{isMenuOpen ? 'Ocultar Panel' : 'Mostrar Panel de Navegación'}</span>
                    <ChevronRight 
                      size={12} 
                      className={`text-[#84CC16] transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} 
                    />
                  </button>
                </div>

                {/* Botonera expandible con Framer Motion */}
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="max-w-[1400px] mx-auto py-4 px-6 flex flex-wrap justify-center items-center gap-x-2.5 gap-y-3">
                        {menuItems.map((item, index) => {
                          const isActive = item.isMachine && item.code === resolvedId;
                          const Icon = item.icon;

                          return (
                            <Link
                              key={index}
                              to={item.href}
                              onClick={() => {
                                // Cerramos el panel al seleccionar un elemento para maximizar el espacio de lectura
                                setIsMenuOpen(false);
                              }}
                              className={`px-4 py-2 rounded text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 cursor-pointer border whitespace-nowrap bg-black/45 ${
                                isActive 
                                  ? 'border-[#84CC16] text-white shadow-[0_0_15px_rgba(132,204,22,0.25)] bg-[#84CC16]/10 font-black scale-[1.03]' 
                                  : 'border-[#84CC16]/20 text-white/90 hover:border-[#84CC16] hover:bg-[#84CC16]/10 hover:shadow-[0_0_10px_rgba(132,204,22,0.15)] hover:scale-[1.02]'
                              }`}
                            >
                              <Icon 
                                size={13} 
                                className={`text-[#84CC16] shrink-0 transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_3px_#84CC16]' : ''}`} 
                              />
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })()}

          <main className="flex-grow">
            {/* HERO SECTION */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-[140px] pb-16 px-[40px] max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
                
                {/* Left Column */}
                <div className="lg:col-span-6 flex flex-col gap-6 text-left lg:pl-[30px]">
                  
                  {/* Page Indicator Tag */}
                  <div className="flex items-center gap-3">
                    <span 
                      className="text-xs font-black px-3 py-1 rounded border tracking-[0.2em] font-mono shadow-md"
                      style={{ 
                        color: data.theme.accent, 
                        borderColor: `${data.theme.accent}30`,
                        backgroundColor: `${data.theme.accent}12`
                      }}
                    >
                      PÁG. {data.pageNumber}
                    </span>
                    <div className="h-[1px] w-12 bg-white/20" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/50">Línea de Producción Industrial</span>
                  </div>

                  {/* Title */}
                  <h1 
                    className="font-bold text-[36px] md:text-[50px] lg:text-[58px] leading-[1.1] tracking-[-1px] text-white transition-all duration-500 hover:scale-[1.01] cursor-pointer select-none"
                    style={{ textShadow: `0 0 30px ${data.theme.accent}20` }}
                  >
                    {isEditorMode ? (
                      <input
                        type="text"
                        value={data.heroTitle}
                        onChange={(e) => handleUpdate('heroTitle', e.target.value)}
                        className="bg-transparent border-b border-dashed border-white/20 text-white outline-none w-full font-bold focus:border-white"
                      />
                    ) : (
                      data.heroTitle
                    )}
                  </h1>

                  {/* Subtitle */}
                  {isEditorMode ? (
                    <textarea
                      rows={2}
                      value={data.heroSubtitle}
                      onChange={(e) => handleUpdate('heroSubtitle', e.target.value)}
                      className="bg-transparent border-l-2 pl-4 text-white font-medium text-[17px] md:text-[20px] leading-[1.4] outline-none w-full border-y border-r border-dashed border-white/10"
                      style={{ borderLeftColor: data.theme.accent }}
                    />
                  ) : (
                    <p 
                      className="font-semibold text-[17px] md:text-[20px] leading-[1.4] border-l-2 pl-4 text-white/90"
                      style={{ borderLeftColor: data.theme.accent }}
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
                      className="bg-transparent border border-dashed border-white/10 rounded p-2 text-white/70 font-normal text-[15px] leading-[1.6] outline-none w-full"
                    />
                  ) : (
                    <p className="font-normal text-[15px] leading-[1.6] max-w-[520px] text-white/75">
                      {data.heroDesc}
                    </p>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
                    <a
                      href="#contacto-cotizar"
                      className="inline-flex items-center justify-center font-bold text-[15px] py-4 px-8 rounded-lg transition-all duration-300 scale-100 hover:scale-[1.02] text-black"
                      style={{ 
                        backgroundColor: data.theme.accent,
                        boxShadow: `0 0 25px ${data.theme.accent}40`
                      }}
                    >
                      Solicitar Cotización
                    </a>
                    <a
                      href="#como-funciona"
                      className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-semibold text-[15px] py-4 px-8 rounded-lg transition-all duration-300 backdrop-blur-sm"
                    >
                      <FileText size={16} className="mr-2" />
                      Ver Funcionamiento
                    </a>
                  </div>
                </div>

                {/* Right Column: Media Frame */}
                <div className="lg:col-span-6 flex justify-center items-center relative h-full">
                  <div 
                    className="absolute w-[450px] h-[450px] rounded-full blur-[90px] animate-pulse -z-10" 
                    style={{ backgroundColor: `${data.theme.accent}12` }}
                  />

                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="relative max-w-[550px] w-full border border-white/10 bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 shadow-[0_25px_50px_rgba(0,0,0,0.5)] group overflow-hidden"
                  >
                    {/* Glowing top line */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-[2px]" 
                      style={{ background: `gradient(linear, left top, right top, from(transparent), to(transparent), color-stop(0.5, ${data.theme.accent}))`, backgroundColor: data.theme.accent }}
                    />
                    
                    {isVideo ? (
                      <video
                        src={currentMedia}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto object-contain rounded-xl"
                      />
                    ) : (
                      <img
                        src={currentMedia}
                        alt={data.heroTitle}
                        className="w-full h-auto object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}

                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                      <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider">Diseño Sanitario Industrial</span>
                    </div>
                  </motion.div>
                </div>

              </div>
            </section>

            {/* CINTA DE ESTADÍSTICAS */}
            <section className="relative z-20 -mt-10 max-w-[1400px] mx-auto px-[40px]">
              <div className="border border-white/10 bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden grid grid-cols-2 md:grid-cols-7 gap-4 text-center">
                <div 
                  className="absolute top-0 left-0 right-0 h-[1px]" 
                  style={{ background: `linear-gradient(to right, transparent, ${data.theme.accent}50, transparent)` }}
                />
                
                <StatCard target={kpisList[0].value} suffix={` ${kpisList[0].unit}`} label={kpisList[0].label} accent={data.theme.accent} />
                <div className="h-12 w-[1px] bg-white/10 hidden md:block self-center justify-self-center" />
                <StatCard target={kpisList[1].value} suffix={` ${kpisList[1].unit}`} label={kpisList[1].label} accent={data.theme.accent} />
                <div className="h-12 w-[1px] bg-white/10 hidden md:block self-center justify-self-center" />
                <StatCard target={kpisList[2].value} suffix={` ${kpisList[2].unit}`} label={kpisList[2].label} accent={data.theme.accent} />
                <div className="h-12 w-[1px] bg-white/10 hidden md:block self-center justify-self-center" />
                <StatCard target={kpisList[3].value} suffix={` ${kpisList[3].unit}`} label={kpisList[3].label} accent={data.theme.accent} />
              </div>
            </section>

            {/* INTERACTIVE TIMELINE */}
            <section id="como-funciona" className="py-20 bg-transparent border-y border-white/5 mt-16 relative">
              <div className="max-w-[1400px] mx-auto px-[40px] text-center">
                
                <div className="flex flex-col items-center gap-3 mb-16">
                  <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: data.theme.accent }}>Ingeniería de Procesos</span>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">¿CÓMO FUNCIONA?</h2>
                  <div 
                    className="w-48 h-[3px] rounded-full mt-2 mx-auto" 
                    style={{ 
                      backgroundColor: data.theme.accent,
                      boxShadow: `0 0 15px ${data.theme.accent}`
                    }}
                  />
                </div>

                <div className="relative flex flex-col gap-10">
                  <div className="absolute top-[38px] left-[5%] right-[5%] h-[2px] bg-white/10 hidden lg:block -z-10">
                    <div 
                      className="h-full transition-all duration-500 ease-out"
                      style={{ 
                        width: `${(activeStep / (stationsList.length - 1)) * 100}%`,
                        backgroundColor: data.theme.accent,
                        boxShadow: `0 0 10px ${data.theme.accent}`
                      }}
                    />
                  </div>

                  <div className="hidden lg:grid grid-cols-4 gap-4 px-4 max-w-4xl mx-auto w-full">
                    {stationsList.map((step, idx) => {
                      const StepIcon = iconMap[step.iconName] || Settings;
                      const isActive = idx <= activeStep;
                      const isCurrent = idx === activeStep;

                      return (
                        <button
                          key={step.id}
                          onClick={() => setActiveStep(idx)}
                          className="flex flex-col items-center focus:outline-none group cursor-pointer"
                        >
                          <div 
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                              isCurrent 
                                ? 'border-transparent text-black scale-110' 
                                : isActive
                                  ? 'bg-[#0B0F19] text-white shadow-md'
                                  : 'bg-[#0B0F19] border-white/10 text-white/30 hover:border-white/30 hover:text-white'
                            }`}
                            style={isCurrent ? { backgroundColor: data.theme.accent, boxShadow: `0 0 20px ${data.theme.accent}60` } : (isActive ? { borderColor: `${data.theme.accent}40`, color: data.theme.accent } : {})}
                          >
                            <StepIcon size={20} strokeWidth={2} />
                          </div>

                          <span className={`text-[12px] font-bold mt-4 transition-colors tracking-wide ${
                            isCurrent ? 'text-white' : 'text-white/60 group-hover:text-white'
                          }`}
                          style={isCurrent ? { color: data.theme.accent } : {}}
                          >
                            Etapa {step.id}
                          </span>

                          <span className="text-[11px] text-white/40 mt-1">
                            {step.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8 max-w-[850px] mx-auto w-full">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="border border-white/10 bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative text-left"
                    >
                      <div 
                        className="absolute top-0 left-0 right-0 h-[2px]" 
                        style={{ background: `linear-gradient(to right, transparent, ${data.theme.accent}, transparent)` }}
                      />
                      
                      <div 
                        className="w-20 h-20 rounded-2xl border flex items-center justify-center shrink-0"
                        style={{ 
                          backgroundColor: `${data.theme.accent}08`, 
                          borderColor: `${data.theme.accent}20`,
                          color: data.theme.accent
                        }}
                      >
                        {React.createElement(iconMap[stationsList[activeStep].iconName] || Settings, { size: 36, strokeWidth: 1.5 })}
                      </div>

                      <div className="text-left flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span 
                            className="font-bold text-[10px] uppercase px-2.5 py-1 rounded-md border tracking-wider"
                            style={{ 
                              backgroundColor: `${data.theme.accent}15`, 
                              color: data.theme.accent, 
                              borderColor: `${data.theme.accent}30` 
                            }}
                          >
                            Etapa {stationsList[activeStep].id} de {stationsList.length}
                          </span>
                          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                            {stationsList[activeStep].title}
                          </h3>
                        </div>
                        <p className="text-white/70 text-[14px] leading-relaxed">
                          {stationsList[activeStep].desc}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                </div>

              </div>
            </section>

            {/* APPLICATIONS */}
            <section className="py-20 max-w-[1400px] mx-auto px-[40px]">
              <div className="flex flex-col items-center gap-3 mb-16 text-center">
                <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: data.theme.accent }}>Sectores de Aplicación</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">APLICACIONES INDUSTRIALES</h2>
                <div 
                  className="w-48 h-[3px] rounded-full mt-2 mx-auto" 
                  style={{ 
                    backgroundColor: data.theme.accent,
                    boxShadow: `0 0 15px ${data.theme.accent}`
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {applicationsList.map((app, idx) => (
                  <div 
                    key={idx}
                    className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] backdrop-blur-md rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] text-left group"
                  >
                    <div className="text-3xl mb-4">{app.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors" style={{ groupHoverColor: data.theme.accent }}>
                      {app.name}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {app.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* TECHNICAL SPECIFICATIONS & CONFIGURATIONS */}
            <section className="py-20 bg-transparent border-t border-white/5">
              <div className="max-w-[1400px] mx-auto px-[40px] grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left: Specs Table */}
                <div className={data.seriesSpecs ? "lg:col-span-12 flex flex-col gap-6 text-left" : "lg:col-span-7 flex flex-col gap-6 text-left"}>
                  <h2 className="text-2xl font-bold tracking-tight text-white mb-2 uppercase">Especificaciones Técnicas</h2>
                  {data.seriesSpecs ? (
                    <div className="flex flex-col gap-8 w-full">
                      {data.seriesSpecs.map((series, sIdx) => (
                        <div key={sIdx} className="flex flex-col gap-4 w-full">
                          <h3 className="text-sm font-black tracking-widest uppercase border-l-2 pl-3" style={{ color: data.theme.accent, borderColor: data.theme.accent }}>
                            {series.title}
                          </h3>
                          <div className="border border-white/10 rounded-xl bg-white/[0.01] overflow-x-auto shadow-2xl w-full">
                            <table className="w-full text-left border-collapse min-w-[700px]">
                              <thead>
                                <tr className="border-b border-white/10 bg-white/[0.03]">
                                  {series.headers.map((h, hIdx) => (
                                    <th key={hIdx} className="p-4 text-[10px] font-black uppercase tracking-wider text-white/50 border-r border-white/5 last:border-none">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {series.rows.map((row, rIdx) => (
                                  <tr 
                                    key={rIdx} 
                                    className={`border-b border-white/5 last:border-none hover:bg-white/[0.02] transition-colors ${
                                      rIdx % 2 === 0 ? 'bg-white/[0.01]' : 'bg-transparent'
                                    }`}
                                  >
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="p-4 text-xs font-bold text-white/80 border-r border-white/5 last:border-none">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.01] w-full">
                      {specsList.map((spec, idx) => (
                        <div 
                          key={idx} 
                          className={`grid grid-cols-12 p-4 text-sm ${
                            idx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                          } border-b border-white/5 last:border-none`}
                        >
                          <div className="col-span-5 font-semibold text-white/50">{spec.param}</div>
                          <div className="col-span-7 text-white font-medium">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Configurations */}
                <div className={data.seriesSpecs ? "lg:col-span-12 flex flex-col gap-6 text-left mt-6" : "lg:col-span-5 flex flex-col gap-6 text-left"}>
                  <h2 className="text-2xl font-bold tracking-tight text-white mb-2 uppercase">Módulos Adicionales</h2>
                  <div className={data.seriesSpecs ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "flex flex-col gap-4"}>
                    {configurationsList.map((config, idx) => (
                      <div 
                        key={idx}
                        className="border border-white/10 rounded-xl p-5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex items-start gap-4"
                      >
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" 
                          style={{ 
                            backgroundColor: `${data.theme.accent}12`,
                            color: data.theme.accent
                          }}
                        >
                          <Check size={16} />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm mb-1">{config.name}</h3>
                          <p className="text-white/60 text-xs leading-relaxed">{config.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* CTA SECTION */}
            <section id="contacto-cotizar" className="py-24 max-w-[1400px] mx-auto px-[40px]">
              <div 
                className="border border-white/10 bg-white/[0.02] backdrop-blur-xl rounded-2xl p-12 text-center shadow-2xl relative overflow-hidden max-w-4xl mx-auto"
                style={{ boxShadow: `0 0 50px ${data.theme.accent}10` }}
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px]" 
                  style={{ background: `linear-gradient(to right, transparent, ${data.theme.accent}, transparent)` }}
                />

                <span 
                  className="text-[11px] font-black uppercase tracking-[0.2em] block mb-4"
                  style={{ color: data.theme.accent }}
                >
                  Asesoría en Ingeniería
                </span>
                
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 uppercase tracking-tight">
                  ¿Desea cotizar esta línea de producción?
                </h2>
                
                <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
                  Nuestro equipo de ingenieros de aplicaciones puede diseñar y configurar la solución a la medida exacta de su producto, espacio físico de planta y velocidades deseadas.
                </p>

                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:ventas@smq.com.mx"
                    className="inline-flex items-center justify-center font-bold text-sm py-4 px-8 rounded-lg transition-all text-black"
                    style={{ backgroundColor: data.theme.accent }}
                  >
                    Contactar Ventas
                  </a>
                  <Link
                    to={backPath}
                    className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-semibold text-sm py-4 px-8 rounded-lg transition-all"
                  >
                    Regresar a {backName}
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5 hover:border-white/10 font-medium text-sm py-4 px-8 rounded-lg transition-all"
                  >
                    Volver a Inicio
                  </Link>
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

export default MachineryDetailPage;
