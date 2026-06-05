import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer.jsx';
import { ChevronRight, ArrowLeft, Cpu, Compass, Settings, Zap, Shield, ArrowUpRight, Upload, Image as ImageIcon, Plus, Trash2, Minimize2, Maximize2, ArrowLeftRight, Cloud, Save, Layers, RefreshCw, Scissors, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';
import { createPortal } from 'react-dom';
import { getOptimizedImageUrl } from '@/lib/utils.js';

const sectorsData = {
  'reciclaje-y-plasticos': {
    title: 'Reciclaje y Plásticos',
    subtitle: 'Tecnología líder para la economía circular',
    description: 'Diseñamos y fabricamos sistemas llave en mano de alto rendimiento para el procesamiento, triturado, lavado y extrusión de polímeros. Nuestras soluciones maximizan la pureza del material recuperado y reducen el consumo energético operativo.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png',
    stats: [
      { label: 'Eficiencia de Lavado', value: '99.2%' },
      { label: 'Rendimiento Máximo', value: '2.5 Ton/h' },
      { label: 'Ahorro de Energía', value: 'Hasta 30%' },
      { label: 'Vida Útil Husillo', value: '25,000h+' }
    ],
    items: [
      {
        id: 'extrusion',
        title: 'Líneas de Extrusión',
        description: 'Extrusoras de alto rendimiento monohusillo y doble husillo co-rotativo. Configuración modular para desgasificación, filtrado de malla hidráulico y dosificación de precisión.',
        longDescription: 'Nuestros sistemas de extrusión están optimizados para procesar poliolefinas (PE, PP), PET, PS y plásticos de ingeniería. Cuentan con cilindros nitrurados bimetálicos y husillos diseñados a medida para garantizar una plastificación homogénea y controlada.',
        features: ['Zonas múltiples de calentamiento cerámico', 'Desgasificación activa al vacío doble', 'Cambiador de filtros de pistón continuo'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png'
      },
      {
        id: 'pelletizado',
        title: 'Sistemas de Pelletizado',
        description: 'Corte por anillo de agua o bajo agua para una geometría de pellet perfecta, libre de polvo y con humedad inferior al 1%.',
        longDescription: 'Integración automática desde el cabezal de extrusión. El sistema controla automáticamente la velocidad de las cuchillas en función del flujo de polímero, previniendo aglomeraciones y garantizando un tamaño homogéneo de pellet comercial.',
        features: ['Ajuste automático de presión de cuchillas', 'Secadora centrífuga de acero inoxidable', 'Intercambiador térmico integrado de agua'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png'
      },
      {
        id: 'lavado',
        title: 'Módulos de Lavado y Secado',
        description: 'Plantas integradas de trituración húmeda, separación por densidad en tinas de flotación y lavado en caliente para eliminar adhesivos y contaminantes.',
        longDescription: 'Desarrolladas para flujos post-consumo altamente contaminados (como botellas PET, film agrícola y envases rígidos). Ofrecemos secadoras mecánicas de alta velocidad y desgasificadores neumáticos para entregar material seco listo para extrusión directa.',
        features: ['Separación gravimétrica de alta precisión', 'Lavado alcalino térmico continuo', 'Secadoras mecánicas con autolimpieza rotor'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png'
      }
    ]
  },
  'alimentos': {
    title: 'Industria Alimentaria',
    subtitle: 'Higiene óptima, precisión y control absoluto',
    description: 'Equipos diseñados bajo los más estrictos estándares de sanidad (HACCP / FDA) en acero inoxidable. Desarrollamos tecnologías de mezclado, atemperado, cocción y transporte para los sectores de chocolate, confitería e ingredientes industriales.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png',
    stats: [
      { label: 'Cumplimiento Normativo', value: 'FDA / EHEDG' },
      { label: 'Acabado Sanitario', value: 'Ra < 0.4 μm' },
      { label: 'Limpieza In Situ', value: 'CIP Automatizado' },
      { label: 'Control de Temperatura', value: '±0.1°C' }
    ],
    items: [
      {
        id: 'chocolate',
        title: 'Procesamiento de Chocolate',
        description: 'Templadoras de chocolate continuas de varias etapas, tanques con chaqueta de agua y agitadores de raspado raspador.',
        longDescription: 'Nuestros sistemas garantizan la formación perfecta de cristales tipo V para lograr un chocolate con brillo premium, dureza óptima al quiebre y excelente estabilidad térmica.',
        features: ['Pantalla táctil de control de curvas térmicas', 'Bombas de desplazamiento positivo higiénicas', 'Desaireado por vacío integrado'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png'
      },
      {
        id: 'confiteria',
        title: 'Cocción y Moldeo de Confites',
        description: 'Líneas continuas para caramelos duros, suaves y gomitas de gelatina o pectina. Cocinas al vacío e inyectores de sabor.',
        longDescription: 'Sistemas de alta capacidad con dosificación de aditivos (colores, ácidos, sabores) en línea y desmolde neumático de precisión en moldes metálicos o de silicona.',
        features: ['Cocedores continuos de película delgada', 'Cadenas de moldeo de servo-mando', 'Túneles de enfriamiento de flujo controlado'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115213579_choco%20bN%202.png'
      },
      {
        id: 'ingredientes',
        title: 'Molienda e Ingredientes',
        description: 'Mezcladores de listón, molinos clasificadores de aire y silos con sistemas de fluidización sanitaria para ingredientes en polvo.',
        longDescription: 'Automatización completa para la dosificación por lotes o continua de aditivos alimentarios, garantizando homogeneidad y previniendo la contaminación cruzada.',
        features: ['Descarga asistida por vibración o fluidización', 'Construcción modular de fácil desarme', 'Sistemas de pesaje de alta precisión C3'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png'
      }
    ]
  },
  'packaging': {
    title: 'Packaging y Envasado',
    subtitle: 'Velocidad y hermeticidad de empaque garantizada',
    description: 'Soluciones inteligentes de envasado primario y secundario. Desde llenadoras rotativas de alta precisión hasta envasadoras horizontales VFFS para formatos Doypack flexibles con zipper.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png',
    stats: [
      { label: 'Velocidad de Llenado', value: '120 bpm' },
      { label: 'Error de Dosificación', value: '≤ 0.5%' },
      { label: 'Presión de Sellado', value: 'Servo-controlada' },
      { label: 'OEE Promedio', value: '92%+' }
    ],
    items: [
      {
        id: 'empaques-flexibles',
        title: 'Envasadoras Flexibles (Doypack)',
        description: 'Llenadoras rotativas automáticas de bolsas preformadas Doypack, Stand-up y pouches planos con zipper.',
        longDescription: 'Ideales para alimentos secos, congelados, polvos y líquidos. La máquina abre, dosifica, inyecta gas inerte (nitrógeno), realiza el termosellado y codifica la fecha en un flujo continuo y confiable.',
        features: ['Cambio rápido de formato sin herramientas', 'Sistemas multihusillo o balanzas multicabezal', 'Detector ultrasónico de bolsas mal abiertas'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png'
      },
      {
        id: 'empaques-rigidos',
        title: 'Líneas de Llenado Rígido',
        description: 'Sistemas de llenado rotativo o lineal por gravedad, presión o flujo electromagnético para botellas y frascos.',
        longDescription: 'Equipos diseñados para la manipulación precisa de envases de PET, PEAD y vidrio. Tapadoras automáticas para tapas roscadas, snap-on o de aluminio (Ropp), adaptables a diferentes viscosidades.',
        features: ['Caudalímetros de inducción magnética', 'Estaciones de tapado con torque servo-monitoreado', 'Cabinas de flujo laminar o atmósfera limpia'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png'
      },
      {
        id: 'etiquetado',
        title: 'Etiquetadoras Automáticas',
        description: 'Equipos aplicadores de etiquetas autoadhesivas de alta velocidad para envases redondos, planos u ovalados.',
        longDescription: 'Equipadas con motores paso a paso de alta resolución para asegurar una colocación milimétrica de la etiqueta, libre de burbujas o arrugas. Opción de túnel termoencogible para etiquetas tipo manga (Sleeve).',
        features: ['Alineadores automáticos de entrada de botellas', 'Codificadores Inkjet integrados para lotes', 'Sensores fotoeléctricos para etiquetas transparentes']
      }
    ]
  },
  'construccion': {
    title: 'Materiales de Construcción',
    subtitle: 'Robustez y consistencia para procesos de alta exigencia',
    description: 'Desarrollamos líneas completas de extrusión y trituración para la fabricación de compuestos de madera plástica (WPC), láminas corrugadas y sistemas de trituración/dosificación de agregados estructurales.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
    stats: [
      { label: 'Relación L/D Extrusor', value: '38:1' },
      { label: 'Producción Horaria', value: '800 kg/h' },
      { label: 'Potencia de Motor', value: '132 kW+' },
      { label: 'Estructura Robusta', value: 'Acero de Aleación' }
    ],
    items: [
      {
        id: 'materiales-compuestos',
        title: 'Líneas de Compuesto de Madera Plástica (WPC)',
        description: 'Extrusoras de doble husillo cónico y paralelo especialmente diseñadas para procesar combinaciones de polímeros y fibras naturales.',
        longDescription: 'Nuestros sistemas WPC logran una dispersión perfecta del aserrín de madera o cáscara de arroz con PE/PP/PVC, produciendo perfiles para decks, fachadas y marcos con excelentes propiedades mecánicas e impermeabilidad.',
        features: ['Cilindro con desgasificación por vacío forzado', 'Dosificadores gravimétricos multi-componentes', 'Mesas de calibración y enfriamiento de gran longitud'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png'
      },
      {
        id: 'materiales-reciclados',
        title: 'Procesamiento de Agregados Reciclados',
        description: 'Trituradoras de eje simple y doble, molinos de martillo y cribas de clasificación de mineral y escombro.',
        longDescription: 'Para la valorización de residuos de demolición y otros materiales de construcción. Sistemas equipados con cintas de separación magnética y clasificación por corrientes de Foucault para metales no ferrosos.',
        features: ['Ejes de corte de acero Hardox antidesgaste', 'Cribado rotativo de alta frecuencia', 'Separadores de partículas por aire densimétricos'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png'
      }
    ]
  },
  'agroindustria': {
    title: 'Agroindustria y Nutrición',
    subtitle: 'Rendimiento en el campo y la planta de procesamiento',
    description: 'Diseñamos sistemas avanzados para el manejo, limpieza, secado y procesamiento de granos y semillas, así como plantas llave en mano para la mezcla y peletizado de alimentos balanceados para animales.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png',
    stats: [
      { label: 'Capacidad de Secado', value: '50 Ton/h' },
      { label: 'Precisión de Mezclado', value: 'CV < 5%' },
      { label: 'Presión de Peletizado', value: 'Hasta 120 Bar' },
      { label: 'Opciones de Silo', value: '500 - 10,000 Ton' }
    ],
    items: [
      {
        id: 'procesamiento-agricola',
        title: 'Manejo y Limpieza de Granos',
        description: 'Limpiadoras de zaranda, clasificadoras de densidad y transportadores de cadena o elevadores de cangilones industriales.',
        longDescription: 'Sistemas completos de pre-limpieza y secado para proteger el grano almacenado contra plagas y hongos, garantizando que el producto final cumpla con los estándares comerciales internacionales.',
        features: ['Clasificadoras neumáticas de flujo cruzado', 'Secadores de flujo mixto eficientes', 'Transportadores de arrastre con bajo coeficiente de fricción'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png'
      },
      {
        id: 'alimentos-balanceados',
        title: 'Líneas de Alimento Balanceado',
        description: 'Plantas integradas de molienda por martillo, dosificadores gravimétricos por lotes, mezcladoras de doble eje y peletizadoras.',
        longDescription: 'Fabricamos líneas capaces de producir alimento balanceado para aves, porcinos, ganado y acuicultura con el acondicionamiento térmico (inyección de vapor) requerido para eliminar patógenos y gelatinizar almidones.',
        features: ['Acondicionadores sanitarios de doble paso', 'Matrices de peletizado de acero inoxidable forjado', 'Enfriadores a contracorriente con tamiz vibratorio'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png'
      }
    ]
  },
  'plantas-reciclaje': {
    title: 'Plantas de Reciclaje',
    subtitle: 'Ingeniería para la valorización de residuos y economía circular',
    description: 'Proporcionamos plantas completas llave en mano para el procesamiento de plásticos post-consumo y post-industrial. Diseñadas para maximizar la pureza del producto y optimizar el rendimiento energético.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
    stats: [
      { label: 'Eficiencia de Separación', value: '98.5%' },
      { label: 'Capacidad', value: '1.5 - 4 Ton/h' },
      { label: 'Recuperación de Agua', value: '90%' },
      { label: 'Pureza del Material', value: '99.9%' }
    ],
    items: [
      {
        id: 'lavado-pet',
        title: 'Líneas de Lavado de PET',
        description: 'Módulos integrados para la remoción completa de adhesivos, contaminantes y etiquetas en botellas PET post-consumo.',
        longDescription: 'Lavadoras en caliente alcalinas de alta fricción combinadas con tinas de flotación gravimétrica y secadores neumáticos centrifugados para entregar hojuelas limpias listas para grado alimentario.',
        features: ['Lavado alcalino en caliente', 'Separación de etiquetas NIR', 'Secado mecánico centrífugo'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png'
      },
      {
        id: 'reciclado-pe-pp',
        title: 'Plantas de Reciclaje de Película de PE/PP',
        description: 'Líneas de lavado y triturado para film flexible, bolsas y envases de pared delgada post-industriales.',
        longDescription: 'Trituración húmeda de alta resistencia con cuchillas antidesgaste, lavado intensivo por fricción y centrífugas deshidratadoras avanzadas para un porcentaje mínimo de humedad residual.',
        features: ['Trituración en húmedo de alta resistencia', 'Flotación por densidad', 'Desgasificación avanzada'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png'
      }
    ]
  },
  'plantas-extrusion': {
    title: 'Plantas de Extrusión',
    subtitle: 'Sistemas de extrusión de alto rendimiento y precisión molecular',
    description: 'Desarrollamos líneas completas de extrusión para tuberías, perfiles, láminas y compuestos especiales. Equipadas con automatización avanzada y control de espesor continuo.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png',
    stats: [
      { label: 'Precisión de Husillo', value: '±0.05 mm' },
      { label: 'Rendimiento', value: '1,200 kg/h' },
      { label: 'Zonas de Temperatura', value: '12 Zonas' },
      { label: 'Ahorro de Energía', value: '35%' }
    ],
    items: [
      {
        id: 'doble-husillo',
        title: 'Extrusoras de Doble Husillo',
        description: 'Sistemas de extrusión co-rotativa para compounding, mezcla y extrusión reactiva de polímeros.',
        longDescription: 'Husillos modulares autolimpiantes con diseño segmentado configurable. Caja de engranajes de alto torque y sistema de control de temperatura de alta sensibilidad.',
        features: ['Husillos co-rotativos autolimpiantes', 'Cilindro bimetálico nitrurado', 'Dosificadores gravimétricos multi-componente'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png'
      },
      {
        id: 'co-extrusion',
        title: 'Líneas de Co-extrusión',
        description: 'Tecnología para perfiles y tuberías multi-capa optimizando costos y propiedades mecánicas.',
        longDescription: 'Cabezales de extrusión de diseño avanzado que garantizan la distribución uniforme de capas, combinando plásticos vírgenes, reciclados y aditivos técnicos.',
        features: ['Cabezales de co-extrusión multi-capa', 'Enfriamiento de calibración rápida', 'Sistemas de bobinado inteligente'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png'
      }
    ]
  },
  'plantas-alimentos': {
    title: 'Plantas de Alimentos',
    subtitle: 'Estándares sanitarios de grado alimentario y procesamiento térmico preciso',
    description: 'Ingeniería integral para el procesamiento de alimentos con certificación sanitaria FDA y HACCP. Soluciones óptimas de atemperado, mezcla y cocción automatizada.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png',
    stats: [
      { label: 'Grado de Acero', value: 'AISI 316L' },
      { label: 'Higiene CIP', value: '100% Aut.' },
      { label: 'Control Térmico', value: '±0.1°C' },
      { label: 'Disponibilidad', value: '99.5%' }
    ],
    items: [
      {
        id: 'mezclado-sanitario',
        title: 'Sistemas de Mezclado Sanitario',
        description: 'Mezcladores continuos y por lotes para ingredientes secos, pastas y emulsiones alimenticias.',
        longDescription: 'Diseño higiénico con soldaduras pulidas sanitarias y pulido Ra < 0.4 μm. Sellos de prensaestopas de purga de aire y boquillas de limpieza CIP integradas.',
        features: ['Hélices de doble cinta helicoidal', 'Sello mecánico de carburo de silicio', 'Descarga de limpieza rápida'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png'
      },
      {
        id: 'atemperado-coccion',
        title: 'Líneas de Atemperado y Cocción',
        description: 'Sistemas para confitería, coberturas de chocolate y procesamiento de ingredientes térmicos.',
        longDescription: 'Curvas de temperatura precisas controladas por microprocesador PLC, chaquetas térmicas de doble pared con aislamiento y paletas rascadoras de teflón para evitar adherencias.',
        features: ['Control preciso de cristalización', 'Chaqueta de agua térmica regulada', 'Raspadores de teflón autoajustables'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png'
      }
    ]
  },
  'sistemas-packaging': {
    title: 'Sistemas de Packaging',
    subtitle: 'Velocidad, sellado hermético y empaque inteligente',
    description: 'Tecnología de punta para envasado primario y secundario de alta velocidad. Sistemas adaptables para formatos rígidos y flexibles con zipper.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115213579_choco%20bN%202.png',
    stats: [
      { label: 'Velocidad Máxima', value: '150 ppm' },
      { label: 'Hermeticidad', value: '99.99%' },
      { label: 'Tiempo de Cambio', value: '< 15 min' },
      { label: 'Precisión de Llenado', value: '±0.2%' }
    ],
    items: [
      {
        id: 'doypack-rotativas',
        title: 'Envasadoras Doypack Rotativas',
        description: 'Llenado y sellado automático de bolsas preformadas de tipo Stand-up y pouches planos con zipper.',
        longDescription: 'Flujo automático continuo que incluye: alimentación de bolsas, codificación Inkjet, apertura de zipper por vacío, dosificación precisa de producto y sellado térmico de alta resistencia.',
        features: ['Apertura y sellado neumático', 'Dosificación por balanza multicabezal', 'Inyección de gas inerte (N2)'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png'
      },
      {
        id: 'robotica-secundario',
        title: 'Robotizado de Empaque Secundario',
        description: 'Celdas robotizadas para formado, llenado de cajas y paletizado automático.',
        longDescription: 'Brazo robótico articulado equipado con cabezales de succión o pinzas mecánicas programadas para realizar patrones de estiba dinámicos a alta velocidad.',
        features: ['Grips de succión por vacío magnético', 'Control de movimiento multieje', 'Clasificación de cajas inteligente'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png'
      }
    ]
  },
  'automatizacion': {
    title: 'Automatización Industrial',
    subtitle: 'Sistemas SCADA, integración IoT e Industria 4.0',
    description: 'Automatizamos y digitalizamos procesos de manufactura completa. Diseñamos tableros de control con PLCs de última generación y visualización en tiempo real.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
    stats: [
      { label: 'Tiempo de Respuesta', value: '< 10 ms' },
      { label: 'Monitoreo IoT', value: 'Nube Activa' },
      { label: 'Norma de Tableros', value: 'UL508A' },
      { label: 'Reducción de Fallas', value: '40%' }
    ],
    items: [
      {
        id: 'scada-hmi',
        title: 'Sistemas SCADA y HMI',
        description: 'Visualización y control interactivo en tiempo real de todo el piso de producción.',
        longDescription: 'Interfaces gráficas intuitivas con tableros de control interactivos, registro histórico de alarmas, trazabilidad de lotes y conectividad en red de fábrica.',
        features: ['Visualización interactiva de variables', 'Historial de alarmas inteligente', 'Control remoto seguro'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png'
      },
      {
        id: 'celdas-roboticas',
        title: 'Integración de Celdas Robóticas',
        description: 'Robots colaborativos (Cobots) e industriales integrados a líneas de ensamblaje y maquinado.',
        longDescription: 'Programación de trayectorias complejas, sincronización con cintas transportadoras mediante sensores inteligentes y vallas ópticas de seguridad certificadas.',
        features: ['Sincronización por protocolo Profinet', 'Sensores de barrera de seguridad', 'Programación parametrizada'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png'
      }
    ]
  },
  'ingenieria': {
    title: 'Ingeniería de Procesos',
    subtitle: 'Optimización de flujos, diseño térmico y simulación avanzada',
    description: 'Consultoría e ingeniería avanzada para la optimización de flujos industriales, diseño de tuberías PID y cálculo estructural para plantas completas.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png',
    stats: [
      { label: 'Simulación CFD', value: 'Activa' },
      { label: 'Precisión CAD/BIM', value: '100%' },
      { label: 'Eficiencia Térmica', value: '+25%' },
      { label: 'Seguridad de Planta', value: 'HAZOP' }
    ],
    items: [
      {
        id: 'diseno-detalle',
        title: 'Diseño e Ingeniería de Detalle',
        description: 'Desarrollo técnico completo de planos constructivos y de ingeniería básica y de detalle.',
        longDescription: 'Planos constructivos P&ID interactivos, isométricos de tuberías, dimensionamiento de bombas, intercambiadores de calor y recipientes a presión bajo norma ASME.',
        features: ['Planos P&ID inteligentes', 'Modelado 3D de tuberías y ductos', 'Cálculo de pérdidas de carga'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png'
      },
      {
        id: 'auditorias-energia',
        title: 'Auditorías de Eficiencia Energética',
        description: 'Optimización de consumos eléctricos, térmicos y de fluidos de proceso.',
        longDescription: 'Detección de puntos de pérdida térmica, optimización de balances de masa y energía, y propuestas para recuperación de calor en chimeneas u otros flujos residuales.',
        features: ['Optimización de balances térmicos', 'Recuperación de calor residual', 'Monitoreo de consumos específicos'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png'
      }
    ]
  }
};

const EditableText = ({ value, onChange, className = '', tag: Tag = 'span', placeholder = '', isEditorMode }) => {
  if (isEditorMode) {
    return (
      <Tag
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const text = e.target.innerText;
          onChange(text);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && Tag !== 'p' && Tag !== 'div' && Tag !== 'h2' && Tag !== 'h1') {
            e.preventDefault();
            e.target.blur();
          }
        }}
        className={`${className} outline-none focus:ring-2 focus:ring-[#FFD700]/70 focus:bg-white/10 px-1 -mx-1 rounded transition-all cursor-text relative hover:bg-white/5 border border-dashed border-white/10`}
        title="Haz clic para editar este texto directamente"
      >
        {value}
      </Tag>
    );
  }
  return <Tag className={className}>{value}</Tag>;
};

const EditableMedia = ({ media, defaultOpacity = 1, className = '', onUpdate, isEditorMode, label = 'Multimedia' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Resolve media settings
  const isObj = typeof media === 'object' && media !== null;
  const currentUrl = isObj ? media.url : (media || '');
  const currentType = isObj ? (media.type || 'image') : 'image';
  const currentOpacity = isObj ? (media.opacity !== undefined ? media.opacity : defaultOpacity) : defaultOpacity;
  const currentBlur = isObj ? (media.blur !== undefined ? media.blur : 0) : 0;
  const currentBrightness = isObj ? (media.brightness !== undefined ? media.brightness : 100) : 100;
  const currentContrast = isObj ? (media.contrast !== undefined ? media.contrast : 100) : 100;

  // Local state for edits
  const [url, setUrl] = useState(currentUrl);
  const [type, setType] = useState(currentType);
  const [opacity, setOpacity] = useState(currentOpacity);
  const [blur, setBlur] = useState(currentBlur);
  const [brightness, setBrightness] = useState(currentBrightness);
  const [contrast, setContrast] = useState(currentContrast);

  // Sync state if media changes externally
  useEffect(() => {
    setUrl(currentUrl);
    setType(currentType);
    setOpacity(currentOpacity);
    setBlur(currentBlur);
    setBrightness(currentBrightness);
    setContrast(currentContrast);
  }, [media]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const uploadedUrl = await uploadFile(file, "media");
      setUrl(uploadedUrl);
      
      // Auto-detect type
      const isVideoFile = file.type.startsWith('video/') || file.name.endsWith('.mp4') || file.name.endsWith('.webm');
      setType(isVideoFile ? 'video' : 'image');
    } catch (err) {
      console.error(err);
      alert('Error al subir el archivo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    onUpdate({
      url,
      type,
      opacity: parseFloat(opacity),
      blur: parseFloat(blur),
      brightness: parseInt(brightness),
      contrast: parseInt(contrast)
    });
    setIsOpen(false);
  };

  // Helper to render current live preview inside modal
  const renderLivePreview = () => {
    const style = {
      opacity,
      filter: `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%)`,
    };
    const isVideo = type === 'video' || (url && (url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('/video/')));

    if (isVideo) {
      return <video src={url} className="w-full h-full object-cover" autoPlay loop muted playsInline style={style} />;
    }
    return <img src={getOptimizedImageUrl(url, 400) || 'https://via.placeholder.com/400x250'} className="w-full h-full object-cover" style={style} alt="Preview" />;
  };

  // Render the default view element
  const renderDefaultElement = () => {
    const style = {
      opacity: currentOpacity,
      filter: `blur(${currentBlur}px) brightness(${currentBrightness}%) contrast(${currentContrast}%)`,
    };
    const isVideo = currentType === 'video' || (currentUrl && (currentUrl.endsWith('.mp4') || currentUrl.endsWith('.webm') || currentUrl.includes('/video/')));

    if (isVideo) {
      return <video src={currentUrl} className={className} autoPlay loop muted playsInline style={style} />;
    }
    return <img src={getOptimizedImageUrl(currentUrl)} className={className} style={style} alt={label} loading="lazy" />;
  };

  if (!isEditorMode) {
    return renderDefaultElement();
  }

  return (
    <>
      <div 
        onDoubleClick={() => setIsOpen(true)}
        className="relative group cursor-pointer overflow-hidden rounded-[inherit] w-full h-full"
      >
        {renderDefaultElement()}
        
        {/* Subtle Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white text-xs select-none z-30 font-semibold rounded-[inherit]">
          <Upload size={20} className="text-[#FFD700] animate-bounce" />
          <span>Doble clic para editar</span>
        </div>
      </div>

      {isOpen && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#0A0F15]/95 border border-white/10 p-6 rounded-2xl shadow-2xl w-[450px] max-w-[95%] backdrop-blur-xl flex flex-col gap-4 text-white text-left font-['Poppins']">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-md font-bold text-[#FFD700] uppercase tracking-wider">{label}</h3>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors text-xs font-bold px-2 py-1 rounded bg-white/5">ESC / Cerrar</button>
            </div>

            {/* Preview Box */}
            <div className="w-full h-[150px] bg-black/40 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center relative">
              {url ? renderLivePreview() : <span className="text-white/30 text-xs">Sin archivo multimedia</span>}
              {isUploading && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-xs gap-2">
                  <RefreshCw size={16} className="animate-spin text-[#FFD700]" />
                  <span>Subiendo archivo...</span>
                </div>
              )}
            </div>

            {/* Input URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-black text-white/50 tracking-wider">URL del archivo</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)} 
                  placeholder="https://..." 
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#FFD700] transition-colors"
                />
                <label className="bg-[#FFD700] hover:bg-[#FFC000] text-black font-bold text-xs px-3 py-1.5 rounded-lg cursor-pointer flex items-center justify-center gap-1 transition-all">
                  <Upload size={14} />
                  <span>Subir</span>
                  <input type="file" onChange={handleFileUpload} accept="image/*,video/*" className="hidden" />
                </label>
              </div>
            </div>

            {/* Media Type Toggle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-black text-white/50 tracking-wider">Tipo de archivo</label>
              <div className="grid grid-cols-2 gap-2 bg-white/5 p-1 rounded-lg border border-white/5">
                <button 
                  onClick={() => setType('image')} 
                  className={`py-1 text-xs font-bold rounded-md transition-all ${type === 'image' ? 'bg-[#FFD700] text-black' : 'text-white/60 hover:text-white'}`}
                >
                  Imagen
                </button>
                <button 
                  onClick={() => setType('video')} 
                  className={`py-1 text-xs font-bold rounded-md transition-all ${type === 'video' ? 'bg-[#FFD700] text-black' : 'text-white/60 hover:text-white'}`}
                >
                  Video
                </button>
              </div>
            </div>

            {/* Controls sliders */}
            <div className="space-y-3">
              {/* Opacity */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px] uppercase font-black text-white/50 tracking-wider">
                  <span>Transparencia (Opacidad)</span>
                  <span className="text-[#FFD700]">{Math.round((1 - opacity) * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.05" 
                  max="1" 
                  step="0.05" 
                  value={opacity} 
                  onChange={(e) => setOpacity(parseFloat(e.target.value))} 
                  className="w-full accent-[#FFD700] cursor-pointer"
                />
              </div>

              {/* Blur */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px] uppercase font-black text-white/50 tracking-wider">
                  <span>Nitidez / Difuminado (Blur)</span>
                  <span className="text-[#FFD700]">{blur}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="15" 
                  step="0.5" 
                  value={blur} 
                  onChange={(e) => setBlur(parseFloat(e.target.value))} 
                  className="w-full accent-[#FFD700] cursor-pointer"
                />
              </div>

              {/* Brightness */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px] uppercase font-black text-white/50 tracking-wider">
                  <span>Brillo</span>
                  <span className="text-[#FFD700]">{brightness}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="180" 
                  step="5" 
                  value={brightness} 
                  onChange={(e) => setBrightness(parseInt(e.target.value))} 
                  className="w-full accent-[#FFD700] cursor-pointer"
                />
              </div>

              {/* Contrast */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px] uppercase font-black text-white/50 tracking-wider">
                  <span>Contraste</span>
                  <span className="text-[#FFD700]">{contrast}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="200" 
                  step="5" 
                  value={contrast} 
                  onChange={(e) => setContrast(parseInt(e.target.value))} 
                  className="w-full accent-[#FFD700] cursor-pointer"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
              <button 
                onClick={() => setIsOpen(false)} 
                className="py-2.5 text-xs font-bold bg-white/5 hover:bg-white/10 rounded-xl transition-all"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave} 
                className="py-2.5 text-xs font-bold bg-[#FFD700] hover:bg-[#FFC000] text-black rounded-xl transition-all shadow-[0_0_20px_rgba(255,215,0,0.15)]"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

const IndustriaDetalle = () => {
  const { sector } = useParams();
  const location = useLocation();
  const { cmsState, updatePages, isEditorMode, syncToCloud } = useCMS();
  
  const staticData = sectorsData[sector];
  
  // Find if this industry page exists in CMS
  const pageId = `industria-${sector}`;
  const industryPage = cmsState.pages.find(p => p.id === pageId);
  
  // Local active states for editor
  const [activeTab, setActiveTab] = useState('hero');
  const [editingItemIdx, setEditingItemIdx] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [panelPosition, setPanelPosition] = useState('right'); // 'right' or 'left'
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [position, setPosition] = useState({ x: 900, y: 112 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({ x: window.innerWidth - 410, y: 112 });
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.closest('.drag-handle')) {
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      initialPosRef.current = { x: position.x, y: position.y };
      e.preventDefault();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      
      const newX = Math.max(10, Math.min(window.innerWidth - 60, initialPosRef.current.x + dx));
      const newY = Math.max(10, Math.min(window.innerHeight - 60, initialPosRef.current.y + dy));
      
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]);

  const heroImageInputRef = useRef(null);
  const itemImageInputRef = useRef(null);

  const handleSaveToCloud = async () => {
    try {
      setIsSaving(true);
      await syncToCloud();
      alert('¡Cambios guardados con éxito en la nube!');
    } catch (err) {
      console.error(err);
      alert('Error al guardar en la nube.');
    } finally {
      setIsSaving(false);
    }
  };

  // If it doesn't exist yet in the CMS context, register it with the default static data
  useEffect(() => {
    if (staticData && !industryPage) {
      const initialPageData = {
        id: pageId,
        title: staticData.title,
        slug: `/industria/${sector}`,
        modules: [
          {
            id: 'sector-data',
            type: 'sector-detail',
            data: staticData
          }
        ]
      };
      updatePages([...cmsState.pages, initialPageData]);
    }
  }, [sector, industryPage, cmsState.pages, updatePages, staticData, pageId]);

  // Data to render
  const data = industryPage?.modules?.[0]?.data || staticData;

  const [activeItem, setActiveItem] = useState('');

  const getItemIcon = (title, index) => {
    const t = title.toLowerCase();
    if (t.includes('extru') || t.includes('trefi')) return <Cpu size={14} />;
    if (t.includes('pellet') || t.includes('granu')) return <Layers size={14} />;
    if (t.includes('lavad') || t.includes('recic')) return <RefreshCw size={14} />;
    if (t.includes('mol') || t.includes('tritur')) return <Scissors size={14} />;
    if (t.includes('aliment') || t.includes('mezcl')) return <Settings size={14} />;
    if (t.includes('envase') || t.includes('empac')) return <Package size={14} />;
    
    const defaultIcons = [<Cpu size={14} />, <Layers size={14} />, <Settings size={14} />, <Compass size={14} />];
    return defaultIcons[index % defaultIcons.length];
  };

  useEffect(() => {
    if (!data || !data.items) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveItem(entry.target.id);
          }
        });
      },
      { threshold: 0.15, rootMargin: '-20% 0px -50% 0px' }
    );

    data.items.forEach((item, idx) => {
      const el = document.getElementById(item.id || `item-${idx}`);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [data?.items]);

  useEffect(() => {
    // Scroll to hash element smoothly if exists
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = (cmsState?.settings?.headerHeight || 76) + 150; // 150px de margen adicional
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, [sector, location.hash, cmsState?.settings?.headerHeight]);

  const handleUpdate = (key, value) => {
    if (!industryPage) return;
    const updatedData = { ...data, [key]: value };
    const updatedPage = {
      ...industryPage,
      modules: [
        {
          ...industryPage.modules[0],
          data: updatedData
        }
      ]
    };
    const otherPages = cmsState.pages.filter(p => p.id !== pageId);
    updatePages([...otherPages, updatedPage]);
  };

  const handleItemUpdate = (index, key, value) => {
    if (!data.items) return;
    const updatedItems = [...data.items];
    updatedItems[index] = { ...updatedItems[index], [key]: value };
    handleUpdate('items', updatedItems);
  };

  const handleAddItem = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      title: 'Nueva Especialidad',
      description: 'Breve descripción de la nueva especialidad.',
      longDescription: 'Descripción técnica detallada y de alto rendimiento.',
      features: ['Especificación clave 1', 'Especificación clave 2'],
      image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png' // default placeholder
    };
    const updatedItems = [...(data.items || []), newItem];
    handleUpdate('items', updatedItems);
  };

  const handleDeleteItem = (index) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta especialidad de la página?')) {
      const updatedItems = [...data.items];
      updatedItems.splice(index, 1);
      handleUpdate('items', updatedItems);
    }
  };

  const handleItemFeaturesUpdate = (index, featuresString) => {
    const featuresArray = featuresString.split('\n').map(f => f.trim()).filter(Boolean);
    handleItemUpdate(index, 'features', featuresArray);
  };

  const handleStatUpdate = (index, field, value) => {
    if (!data.stats) return;
    const updatedStats = [...data.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    handleUpdate('stats', updatedStats);
  };

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUploading(true);
        const url = await uploadFile(file, "media");
        handleUpdate('heroImage', url);
      } catch (err) {
        console.error("Error al subir imagen de Hero:", err);
        alert('No se pudo subir la imagen.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleItemImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUploading(true);
        const url = await uploadFile(file, "media");
        handleItemUpdate(index, 'image', url);
      } catch (err) {
        console.error("Error al subir imagen de especialidad:", err);
        alert('No se pudo subir la imagen.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  if (!staticData) {
    return (
      <div className="min-h-screen bg-[#0B0F14] pt-[150px] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-black text-white mb-4">Industria no encontrada</h1>
        <p className="text-white/60 mb-8 max-w-md">El sector industrial "{sector}" no está registrado en nuestro sistema.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-[#FFD700] hover:bg-[#FFC000] text-black font-semibold px-6 py-3 rounded-lg transition-all">
          <ArrowLeft size={18} /> Volver al Inicio
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Sliding CMS control panel if isEditorMode is active */}
      {isEditorMode && industryPage && (
        isMinimized ? (
          <button
            onMouseDown={handleMouseDown}
            onClick={() => setIsMinimized(false)}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            className={`fixed z-[990] w-14 h-14 bg-[#0A0F15]/20 backdrop-blur-md border border-[#FFD700]/30 hover:border-[#FFD700] rounded-full shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 text-[#FFD700] drag-handle transition-shadow duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] ${
              isDragging ? 'shadow-3xl shadow-[#FFD700]/25' : ''
            }`}
            title="Abrir Editor de Sector (Arrastra para mover)"
          >
            <Settings size={24} className="animate-spin [animation-duration:15s] pointer-events-none" />
          </button>
        ) : (
          <div 
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            className={`fixed z-[990] w-[385px] bg-[#0A0F15]/20 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-2xl flex flex-col gap-4 text-left font-['Poppins'] text-white transition-shadow duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] ${
              isDragging ? 'shadow-3xl shadow-[#FFD700]/10 border-[#FFD700]/40' : ''
            }`}
          >
            {/* Header / Drag Handle */}
            <div 
              onMouseDown={handleMouseDown}
              className="drag-handle cursor-grab active:cursor-grabbing flex items-center justify-between border-b border-white/10 pb-3 select-none"
            >
              <div className="flex items-center gap-2 text-[#FFD700] pointer-events-none">
                <Settings size={18} className="animate-spin [animation-duration:15s]" />
                <span className="font-black text-xs uppercase tracking-widest">Editor de Sector</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Switch Position Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); const newPos = panelPosition === 'right' ? 'left' : 'right'; setPanelPosition(newPos); setPosition({ x: newPos === 'right' ? window.innerWidth - 410 : 24, y: 112 }); }}
                  className="p-1.5 hover:bg-white/5 rounded border border-white/5 text-white/60 hover:text-white transition-colors cursor-pointer"
                  title={panelPosition === 'right' ? 'Mover a la izquierda' : 'Mover a la derecha'}
                >
                  <ArrowLeftRight size={14} />
                </button>
                {/* Minimize Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                  className="p-1.5 hover:bg-white/5 rounded border border-white/5 text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Minimizar panel"
                >
                  <Minimize2 size={14} />
                </button>
                <span className="bg-[#FFD700]/20 text-[#FFD700] text-[9px] font-black uppercase px-2 py-0.5 rounded border border-[#FFD700]/30 pointer-events-none">SMQ Live</span>
              </div>
            </div>

            {/* Scrollable Form Content */}
            <div className="overflow-y-auto max-h-[50vh] pr-1 flex flex-col gap-4">
              {/* Editor Tabs Navigation */}
              <div className="flex bg-white/5 p-1 rounded-lg gap-1">
                {['hero', 'stats', 'items', 'cta'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 text-[10px] font-black uppercase tracking-wider py-1.5 rounded transition-all cursor-pointer ${
                      activeTab === tab ? 'bg-[#FFD700] text-black font-bold shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab === 'hero' ? 'Hero' : tab === 'stats' ? 'Kpis' : tab === 'items' ? 'Equipos' : 'Cta'}
                  </button>
                ))}
              </div>

              {/* Tab 1: Hero & Info */}
              {activeTab === 'hero' && (
                <div className="flex flex-col gap-4 text-xs">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Título de Sector</label>
                    <input
                      type="text"
                      value={data.title || ''}
                      onChange={(e) => handleUpdate('title', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FFD700] outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Subtítulo / Eslogan</label>
                    <input
                      type="text"
                      value={data.subtitle || ''}
                      onChange={(e) => handleUpdate('subtitle', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FFD700] outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Descripción del Sector</label>
                    <textarea
                      rows={4}
                      value={data.description || ''}
                      onChange={(e) => handleUpdate('description', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FFD700] outline-none resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 border-t border-white/10 pt-3">
                    <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Imagen de Fondo (Hero)</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={heroImageInputRef}
                      onChange={handleHeroImageUpload}
                    />
                    <button
                      onClick={() => heroImageInputRef.current?.click()}
                      disabled={isUploading}
                      className="bg-[#FFD700] hover:bg-[#FFC000] text-black font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md text-xs"
                    >
                      {isUploading ? (
                        <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      ) : (
                        <Upload size={14} />
                      )}
                      <span>Subir Nueva Imagen</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Stats */}
              {activeTab === 'stats' && (
                <div className="flex flex-col gap-4 text-xs">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Métricas de Desempeño (4 tarjetas)</span>
                  {data.stats && data.stats.map((stat, idx) => (
                    <div key={idx} className="border border-white/5 bg-white/[0.02] p-3 rounded-xl flex flex-col gap-2">
                      <div className="text-[10px] font-bold text-[#FFD700]">Métrica {idx + 1}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-white/40 text-[9px] uppercase font-bold">Valor</label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => handleStatUpdate(idx, 'value', e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-md p-1.5 text-xs text-white focus:border-[#FFD700] outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-white/40 text-[9px] uppercase font-bold">Etiqueta</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => handleStatUpdate(idx, 'label', e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-md p-1.5 text-xs text-white focus:border-[#FFD700] outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Especialidades */}
              {activeTab === 'items' && (
                <div className="flex flex-col gap-4 text-xs">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Seleccionar Especialidad</label>
                    <select
                      value={editingItemIdx}
                      onChange={(e) => setEditingItemIdx(Number(e.target.value))}
                      className="bg-[#0A0F15] border border-white/10 rounded-lg p-2 text-xs text-white focus:border-[#FFD700] outline-none cursor-pointer w-full"
                    >
                      {data.items && data.items.map((item, idx) => (
                        <option key={item.id || idx} value={idx}>
                          {idx + 1}. {item.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {data.items && data.items[editingItemIdx] && (
                    <div className="flex flex-col gap-3 border-t border-white/10 pt-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-white/50 text-[10px] uppercase font-bold">Título de la Especialidad</label>
                        <input
                          type="text"
                          value={data.items[editingItemIdx].title || ''}
                          onChange={(e) => handleItemUpdate(editingItemIdx, 'title', e.target.value)}
                          className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white focus:border-[#FFD700] outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-white/50 text-[10px] uppercase font-bold">Descripción Corta</label>
                        <input
                          type="text"
                          value={data.items[editingItemIdx].description || ''}
                          onChange={(e) => handleItemUpdate(editingItemIdx, 'description', e.target.value)}
                          className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white focus:border-[#FFD700] outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-white/50 text-[10px] uppercase font-bold">Descripción Técnica Larga</label>
                        <textarea
                          rows={4}
                          value={data.items[editingItemIdx].longDescription || ''}
                          onChange={(e) => handleItemUpdate(editingItemIdx, 'longDescription', e.target.value)}
                          className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white focus:border-[#FFD700] outline-none resize-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-white/50 text-[10px] uppercase font-bold">Especificaciones (Una por línea)</label>
                        <textarea
                          rows={3}
                          value={data.items[editingItemIdx].features ? data.items[editingItemIdx].features.join('\n') : ''}
                          onChange={(e) => handleItemFeaturesUpdate(editingItemIdx, e.target.value)}
                          className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white focus:border-[#FFD700] outline-none resize-none font-mono"
                          placeholder="Característica 1&#10;Característica 2"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 border-t border-white/10 pt-3">
                        <label className="text-white/50 text-[10px] uppercase font-bold">Imagen de Especialidad</label>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={itemImageInputRef}
                          onChange={(e) => handleItemImageUpload(e, editingItemIdx)}
                        />
                        <button
                          onClick={() => itemImageInputRef.current?.click()}
                          disabled={isUploading}
                          className="bg-[#FFD700] hover:bg-[#FFC000] text-black font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md text-xs"
                        >
                          {isUploading ? (
                            <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                          ) : (
                            <Upload size={14} />
                          )}
                          <span>Subir Nueva Imagen</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: CTA Section */}
              {activeTab === 'cta' && (
                <div className="flex flex-col gap-4 text-xs">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Título de Cierre (CTA)</label>
                    <input
                      type="text"
                      value={data.ctaTitle || '¿Tienes un proyecto industrial en mente?'}
                      onChange={(e) => handleUpdate('ctaTitle', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FFD700] outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Descripción del Cierre</label>
                    <textarea
                      rows={4}
                      value={data.ctaDesc || ''}
                      onChange={(e) => handleUpdate('ctaDesc', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FFD700] outline-none resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cloud Sync Button */}
            <div className="border-t border-white/10 pt-4 mt-auto">
              <button
                onClick={handleSaveToCloud}
                disabled={isSaving}
                className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-900/30 text-xs uppercase tracking-wider animate-pulse hover:animate-none"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Cloud size={16} />
                )}
                <span>{isSaving ? 'Guardando...' : 'Guardar en la Nube'}</span>
              </button>
            </div>
          </div>
        )
      )}

      <div className="min-h-screen bg-[#0B0F14] text-white font-['Poppins'] pt-[100px] overflow-x-hidden">
        <div className="md:pl-[76px] transition-all duration-300">
          {/* Fixed Sub-Header Menu */}
          <div 
            style={{ 
              top: `${cmsState?.settings?.headerHeight || 76}px`
            }}
            className="fixed left-0 md:left-[76px] right-0 z-[80] bg-gradient-to-b from-[#080B11]/95 to-[#080B11]/90 backdrop-blur-2xl border-b border-white/5 py-4 px-6 md:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all select-none"
          >
            <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-6">
              {/* Left Side: Back & Breadcrumb Unified */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                  </span>
                  <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase hidden md:inline">SYS_ACTIVE</span>
                </div>
                
                <Link 
                  to="/" 
                  className="border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 px-3 py-1.5 rounded text-[10px] font-mono tracking-widest text-white/60 hover:text-white transition-all uppercase flex items-center gap-1.5"
                >
                  <ArrowLeft size={12} /> ESC.INICIO
                </Link>
                
                <span className="text-white/10 hidden sm:inline">|</span>
                
                <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] text-white/30 uppercase tracking-widest">
                  <span>SYS.ID</span>
                  <span>//</span>
                  <span className="text-[#FFD700] font-bold">{data.title}</span>
                </div>
              </div>
              
              {/* Right Side: Horizontal Category Buttons */}
              {data.items && data.items.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 -my-0.5 pr-2 max-w-full">
                  <div className="flex items-center gap-2">
                    {data.items.map((item, idx) => {
                      const targetId = item.id || `item-${idx}`;
                      const isActive = activeItem === targetId;
                      const numberPrefix = idx + 1 < 10 ? `0${idx + 1}` : idx + 1;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            const el = document.getElementById(targetId);
                            if (el) {
                              const headerOffset = (cmsState?.settings?.headerHeight || 76) + 150; // 150px de margen adicional para la animación
                              const elementPosition = el.getBoundingClientRect().top;
                              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                              
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                              });
                            }
                          }}
                          className={`flex items-center gap-2 px-4 py-2 rounded font-mono text-[10px] tracking-widest uppercase cursor-pointer border transition-all ${
                            isActive 
                              ? 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/40 shadow-[0_0_15px_rgba(255,215,0,0.15)] font-bold' 
                              : 'bg-white/[0.01] text-white/40 border-white/5 hover:text-white hover:bg-white/[0.03] hover:border-white/10'
                          }`}
                        >
                          <span className={isActive ? 'text-[#FFD700]' : 'text-white/20'}>{numberPrefix} //</span>
                          <span>{item.title}</span>
                        </button>
                      );
                    })}
                    
                    {isEditorMode && (
                      <button
                        onClick={handleAddItem}
                        className="flex items-center gap-1.5 px-3 py-2 rounded transition-all font-mono text-[10px] tracking-widest uppercase cursor-pointer border border-dashed border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/10 hover:border-[#FFD700] flex-shrink-0"
                        title="Agregar nueva especialidad"
                      >
                        <Plus size={12} />
                        <span>CMD.ADD_SECTION</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Spacer to push content down below the fixed sub-header */}
          <div className="h-[68px] w-full" />

          {/* Hero Section */}
          <section className="relative w-full py-16 md:py-24 px-6 md:px-8 overflow-hidden border-b border-white/5">
            {/* Background overlay */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14] via-[#0B0F14]/90 to-transparent z-10" />
              {data.heroImage && (
                <EditableMedia
                  media={data.heroImage}
                  defaultOpacity={0.2}
                  className="w-full h-full object-cover scale-105"
                  onUpdate={(newMedia) => handleUpdate('heroImage', newMedia)}
                  isEditorMode={isEditorMode}
                  label="Imagen/Video de Fondo Hero"
                />
              )}
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <motion.span 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block text-[#FFD700] border border-[#FFD700]/30 bg-[#FFD700]/5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest"
                >
                  Sector Industrial
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.05]"
                >
                  <EditableText 
                    value={data.title} 
                    onChange={(val) => handleUpdate('title', val)} 
                    tag="span" 
                    isEditorMode={isEditorMode} 
                  />
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl text-[#FFD700] font-medium"
                >
                  <EditableText 
                    value={data.subtitle} 
                    onChange={(val) => handleUpdate('subtitle', val)} 
                    tag="span" 
                    isEditorMode={isEditorMode} 
                  />
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/70 leading-relaxed max-w-2xl text-[15px] md:text-[16px]"
                >
                  <EditableText 
                    value={data.description} 
                    onChange={(val) => handleUpdate('description', val)} 
                    tag="span" 
                    isEditorMode={isEditorMode} 
                  />
                </motion.p>
              </div>

              {/* Stats Panel */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4 bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-md shadow-2xl">
                {data.stats && data.stats.map((stat, i) => (
                  <motion.div 
                    key={stat.label || i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="p-4 bg-black/40 border border-white/5 rounded-xl flex flex-col justify-center animate-pulse-once"
                  >
                    <span className="text-[24px] md:text-[32px] font-black text-[#FFD700] tracking-tight leading-none mb-2 block">
                      <EditableText 
                        value={stat.value} 
                        onChange={(val) => handleStatUpdate(i, 'value', val)} 
                        tag="span" 
                        isEditorMode={isEditorMode} 
                      />
                    </span>
                    <span className="text-[11px] text-white/50 uppercase tracking-wider font-bold leading-tight">
                      <EditableText 
                        value={stat.label} 
                        onChange={(val) => handleStatUpdate(i, 'label', val)} 
                        tag="span" 
                        isEditorMode={isEditorMode} 
                      />
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Sub-sections Detail Grid */}
          <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-24 space-y-16">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">Especialidades e Ingeniería</h2>
              <p className="text-white/50 text-sm max-w-xl">Explora nuestras soluciones técnicas para cada una de las ramificaciones operativas de este sector.</p>
            </div>

            <div className="space-y-24">
              {data.items && data.items.map((item, index) => (
                <motion.div 
                  id={item.id || `item-${index}`}
                  key={item.id || index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center border-b border-white/5 pb-16 md:pb-24 last:border-b-0`}
                >
                  {/* Text Content */}
                  <div className={`lg:col-span-6 space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/25 flex items-center justify-center text-[#FFD700] font-black text-sm">{index + 1}</span>
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                          <EditableText 
                            value={item.title} 
                            onChange={(val) => handleItemUpdate(index, 'title', val)} 
                            tag="span" 
                            isEditorMode={isEditorMode} 
                          />
                        </h3>
                      </div>
                      {isEditorMode && (
                        <button
                          onClick={() => handleDeleteItem(index)}
                          className="flex items-center gap-1 text-red-400 hover:text-red-500 hover:bg-red-500/10 px-2.5 py-1 rounded-md text-xs font-bold transition-all border border-red-500/20"
                          title="Eliminar especialidad"
                        >
                          <Trash2 size={13} />
                          <span>Eliminar</span>
                        </button>
                      )}
                    </div>
                    <p className="text-[#FFD700]/90 font-medium text-[15px]">
                      <EditableText 
                        value={item.description} 
                        onChange={(val) => handleItemUpdate(index, 'description', val)} 
                        tag="span" 
                        isEditorMode={isEditorMode} 
                      />
                    </p>
                    <p className="text-white/60 leading-relaxed text-sm md:text-[15px]">
                      <EditableText 
                        value={item.longDescription} 
                        onChange={(val) => handleItemUpdate(index, 'longDescription', val)} 
                        tag="span" 
                        isEditorMode={isEditorMode} 
                      />
                    </p>
                    
                    {/* Features List */}
                    {item.features && item.features.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold">Especificaciones Clave:</h4>
                        <ul className="space-y-2">
                          {item.features.map((feat, fIdx) => (
                            <li key={feat || fIdx} className="flex items-center gap-2.5 text-white/80 text-sm font-medium">
                              <Zap size={14} className="text-[#FFD700]" />
                              <span>
                                <EditableText 
                                  value={feat} 
                                  onChange={(val) => {
                                    const updatedFeatures = [...item.features];
                                    updatedFeatures[fIdx] = val;
                                    handleItemUpdate(index, 'features', updatedFeatures);
                                  }} 
                                  tag="span" 
                                  isEditorMode={isEditorMode} 
                                />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Media Container */}
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    {item.image ? (
                      <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10 pointer-events-none" />
                        <EditableMedia
                          media={item.image}
                          defaultOpacity={1}
                          className="w-full aspect-[16/10] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          onUpdate={(newMedia) => handleItemUpdate(index, 'image', newMedia)}
                          isEditorMode={isEditorMode}
                          label={`Imagen/Video de ${item.title}`}
                        />
                        {/* Technical Blueprint Accent overlay */}
                        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-[#0B0F14]/90 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg text-xs text-white/80 font-bold uppercase tracking-wider pointer-events-none">
                          <Cpu size={14} className="text-[#FFD700] animate-pulse" />
                          <span>Esquema Técnico Activo</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-[16/10] bg-white/5 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-6 text-white/40">
                        <Settings size={48} className="mb-4 stroke-[1.2] animate-spin-slow" />
                        <p className="font-semibold text-sm">Visualización técnica en preparación</p>
                        <p className="text-xs text-white/20 mt-1">Contacta con soporte para hojas de especificación</p>
                      </div>
                    )}
                  </div>

                </motion.div>
              ))}
            </div>
          </section>

          {/* Global CTA Section */}
          <section id="cotizar" className="bg-black/40 border-t border-b border-white/5 py-20 px-6 md:px-8 text-center relative overflow-hidden">
            {/* Subtle light ring accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#FFD700]/5 rounded-full filter blur-[120px] pointer-events-none z-0" />
            
            <div className="max-w-3xl mx-auto space-y-8 relative z-10">
              <Shield size={48} className="mx-auto text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] animate-pulse" />
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                <EditableText 
                  value={data.ctaTitle || '¿Tienes un proyecto industrial en mente?'} 
                  onChange={(val) => handleUpdate('ctaTitle', val)} 
                  tag="span" 
                  isEditorMode={isEditorMode} 
                />
              </h2>
              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                <EditableText 
                  value={data.ctaDesc || `Nuestros ingenieros especialistas en ${data.title} están listos para asesorarte en la configuración de la planta, dimensionamiento de maquinaria y cotizaciones llave en mano.`} 
                  onChange={(val) => handleUpdate('ctaDesc', val)} 
                  tag="span" 
                  isEditorMode={isEditorMode} 
                />
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="#contacto" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#FFC000] text-black font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:shadow-[0_0_40px_rgba(255,215,0,0.35)]"
                >
                  Solicitar Cotización <ArrowUpRight size={18} />
                </a>
                <Link 
                  to="/nosotros" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/15 font-bold px-8 py-4 rounded-xl transition-all"
                >
                  Conoce SMQ Systems
                </Link>
              </div>
            </div>
          </section>



          <Footer />
        </div>
      </div>
    </>
  );
};

export default IndustriaDetalle;
