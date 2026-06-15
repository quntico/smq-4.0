const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'IndustriaDetalle.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

const newSectorsData = `
  'inteligencia-artificial': {
    title: 'INTELIGENCIA ARTIFICIAL',
    subtitle: 'Aprendizaje profundo y optimización autónoma',
    description: 'Implementamos algoritmos de Inteligencia Artificial que aprenden de sus procesos históricos y en tiempo real para predecir fallas, optimizar variables de control complejas y detectar anomalías imposibles de ver a simple vista.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115213579_choco%20bN%202.png',
    stats: [
      { label: 'Reducción de Fallos', value: 'Hasta 60%' },
      { label: 'Precisión Predictiva', value: '> 98%' },
      { label: 'Tiempo de Procesamiento', value: '< 10 ms' },
      { label: 'ROI Estimado', value: '< 8 Meses' }
    ],
    items: [
      {
        id: 'vision',
        title: 'Visión Artificial (Deep Learning)',
        description: 'Inspección de defectos cosméticos complejos con redes neuronales.',
        longDescription: 'Sistemas de inspección óptica que superan la visión tradicional basada en reglas. Entrenamos modelos convolucionales (CNN) para detectar micro-fisuras, variaciones de color y defectos orgánicos a velocidades superiores a 1,000 piezas por minuto.',
        features: ['[icon:Shield] Tolerancia a variaciones de iluminación natural', '[icon:Zap] Clasificación de defectos con precisión superior humana', '[icon:Cpu] Integración directa a expulsores neumáticos de alta velocidad'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png',
        tableHeaders: ['Aplicación', 'Velocidad', 'Resolución', 'Hardware', 'Precisión'],
        equipmentTable: [
          { model: 'Inspección Superficial', width: '1200 ppm', capacity: 'Hasta 12 MP', power: 'NVIDIA Jetson / IPC', weight: '99.9%' },
          { model: 'Verificación de Ensambles', width: '800 ppm', capacity: 'Cámaras 3D', power: 'GPU Dedicada', weight: '99.5%' }
        ]
      },
      {
        id: 'mantenimiento',
        title: 'Mantenimiento Predictivo (PdM)',
        description: 'Prevención de paros no planeados mediante análisis de vibración espectral.',
        longDescription: 'Predecimos fallas catastróficas en motores, reductores y rodamientos semanas antes de que ocurran. Los modelos de IA analizan la firma espectral de vibración y temperatura en tiempo real para alertar sobre desbalanceo, cavitación o desgaste de rodamientos.',
        features: ['[icon:Shield] Modelos de Anomaly Detection y Random Forest', '[icon:Zap] Reducción drástica del MTTR (Mean Time to Repair)', '[icon:Cpu] Alertas automáticas directas al sistema CMMS / SAP PM'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png',
        tableHeaders: ['Falla Detectable', 'Sensor Requerido', 'Anticipación', 'Diagnóstico', 'Efectividad'],
        equipmentTable: [
          { model: 'Desgaste Rodamientos', width: 'Vibración Triaxial', capacity: '3 a 6 Semanas', power: 'Automático', weight: 'Alto' },
          { model: 'Cavitación en Bombas', width: 'Vibración + Acústico', capacity: 'Inmediata', power: 'Por Severidad', weight: 'Muy Alto' }
        ]
      }
    ]
  },
  'smart-factory': {
    title: 'SMART FACTORY',
    subtitle: 'Líneas totalmente interconectadas con toma de decisiones autónoma',
    description: 'Transformamos plantas convencionales en ecosistemas Cyber-Físicos donde la maquinaria, los sistemas logísticos y los operarios interactúan sin fricción, garantizando agilidad y personalización masiva sin sacrificar la eficiencia operativa.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
    stats: [
      { label: 'Aumento de Flexibilidad', value: '+40%' },
      { label: 'Tiempo de Cambio', value: '-80%' },
      { label: 'Reducción de Inventario', value: 'WIP -30%' },
      { label: 'Trazabilidad', value: 'Unitaria (Lote 1)' }
    ],
    items: [
      {
        id: 'agv',
        title: 'Robótica Móvil Autónoma (AMR/AGV)',
        description: 'Logística intralogística flexible y sin guías físicas.',
        longDescription: 'Eliminamos las cintas transportadoras rígidas. Desplegamos flotas de robots móviles que navegan mediante SLAM (Simultaneous Localization and Mapping), alimentando las líneas justo a tiempo (JIT) y adaptando sus rutas dinámicamente frente a obstáculos.',
        features: ['[icon:Shield] Navegación natural láser sin necesidad de cintas o reflectores', '[icon:Zap] Gestión de flotas (Fleet Management) centralizada', '[icon:Cpu] Integración con puertas automáticas y ascensores de carga'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png',
        tableHeaders: ['Tipo de Robot', 'Carga Útil', 'Velocidad Máxima', 'Precisión de Parada', 'Navegación'],
        equipmentTable: [
          { model: 'AMR Paletero', width: 'Hasta 1,500 kg', capacity: '1.5 m/s', power: '±10 mm', weight: 'LiDAR + 3D Camera' },
          { model: 'AGV Remolcador', width: 'Hasta 3,000 kg', capacity: '2.0 m/s', power: '±20 mm', weight: 'Magnética / Óptica' }
        ]
      },
      {
        id: 'mes',
        title: 'Sistemas de Ejecución MES / MOM',
        description: 'Orquestación de la producción, recetas y calidad desde el ERP hasta la máquina.',
        longDescription: 'El puente digital entre el negocio (IT) y la planta (OT). Un sistema MES ejecuta órdenes de trabajo, descarga recetas directamente al PLC, captura el consumo real de materiales y calcula el OEE global con una precisión absoluta.',
        features: ['[icon:Shield] Genealogía completa y trazabilidad "Forward & Backward"', '[icon:Zap] Control Estadístico de Proceso (SPC) en tiempo real', '[icon:Cpu] Cumplimiento normativo ISA-95 e ISA-88'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png',
        tableHeaders: ['Módulo', 'Función Principal', 'Interfaces', 'Reporte', 'Cumplimiento'],
        equipmentTable: [
          { model: 'Gestión de Órdenes', width: 'Secuenciación y Despacho', capacity: 'SAP / Oracle / MS Dynamics', power: 'WIP Actualizado', weight: 'ISA-95' },
          { model: 'Control de Calidad', width: 'Captura de Ensayos / SPC', capacity: 'LIMS / Instrumentos', power: 'Gráficos X-R', weight: 'CFR 21 Part 11' }
        ]
      }
    ]
  },
  'digital-twin': {
    title: 'DIGITAL TWIN',
    subtitle: 'Simulación inmersiva y comisionamiento virtual',
    description: 'El Gemelo Digital es una réplica exacta de sus activos físicos. Permite simular modificaciones de línea, validar lógicas de PLC antes de construir y monitorear el desgaste de equipos remotos en un entorno 3D hiperrealista.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png',
    stats: [
      { label: 'Tiempo de Arranque', value: '-60%' },
      { label: 'Riesgo de Colisión', value: '0%' },
      { label: 'Ahorro en Pruebas', value: 'Hasta 70%' },
      { label: 'Precisión Física', value: 'Alta Fidelidad' }
    ],
    items: [
      {
        id: 'virtual-commissioning',
        title: 'Comisionamiento Virtual (VC)',
        description: 'Pruebas del código PLC contra un modelo 3D con físicas reales.',
        longDescription: 'Validamos hasta el 90% del software de control en oficina. Conectamos el PLC real a un gemelo 3D que simula gravedad, fricción, sensores y actuadores. Esto elimina los retrasos en sitio y previene colisiones mecánicas costosas.',
        features: ['[icon:Shield] Simulación cinemática y dinámica de multi-cuerpos', '[icon:Zap] Emulación de señales I/O por protocolos como OPC-UA / Profinet', '[icon:Cpu] Validación de Safety (paros de emergencia) en entorno seguro'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png',
        tableHeaders: ['Fase', 'Técnica', 'Fidelidad', 'Hardware In Loop', 'Beneficio'],
        equipmentTable: [
          { model: 'Prueba de Lógica', width: 'Emulación I/O', capacity: 'Baja-Media', power: 'Software PLC Emulado', weight: 'Depuración de Secuencias' },
          { model: 'Prueba Cinemática', width: 'Simulación Dinámica', capacity: 'Alta (Físicas Reales)', power: 'Hardware PLC Real', weight: 'Prevención de Colisiones' }
        ]
      }
    ]
  },
  'plc-motion': {
    title: 'PLC + MOTION',
    subtitle: 'Determinismo de microsegundos para maquinarias ultra-rápidas',
    description: 'Dominamos las arquitecturas de control más exigentes del mundo. Implementamos plataformas que sincronizan docenas de servo-ejes en perfecta armonía, permitiendo velocidades de empaque y procesamiento que rompen récords de la industria.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png',
    stats: [
      { label: 'Jitter de Red', value: '< 1 µs' },
      { label: 'Tiempo de Ciclo', value: '125 µs' },
      { label: 'Sincronización', value: 'Nanosegundos' },
      { label: 'Safety Integrado', value: 'SIL 3 / PLe' }
    ],
    items: [
      {
        id: 'motion-control',
        title: 'Control de Ejes y Cinemática Compleja',
        description: 'Levas electrónicas, interpolación CNC y control robótico integrado.',
        longDescription: 'Sincronizamos ejes maestros y esclavos utilizando redes Ethernet en tiempo real (EtherCAT, Profinet IRT). Reemplazamos complejos trenes de engranajes mecánicos por perfiles de leva electrónica dinámicos, permitiendo cambios de formato con presionar un botón.',
        features: ['[icon:Shield] Perfiles de movimiento avanzados (Gearing, Camming, Flying Saw)', '[icon:Zap] Interpolación espacial para brazos Delta, SCARA y Antropomórficos', '[icon:Cpu] Regeneración de energía hacia el bus de DC continuo'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png',
        tableHeaders: ['Función', 'Aplicación Típica', 'Precisión de Posición', 'Red Requerida', 'Ventaja Mecánica'],
        equipmentTable: [
          { model: 'Leva Electrónica', width: 'Envolvedoras Flow-Pack', capacity: '±0.001 Grados', power: 'EtherCAT', weight: 'Cero Desgaste Mecánico' },
          { model: 'Corte al Vuelo', width: 'Líneas de Extrusión / Cartón', capacity: '±0.5 mm @ 300m/min', power: 'Profinet IRT', weight: 'Corte Sin Paro' }
        ]
      }
    ]
  },
  'iiot-edge': {
    title: 'IIOT + EDGE',
    subtitle: 'Conectividad ubicua y procesamiento distribuido',
    description: 'Libere los datos atrapados en el piso de planta. Nuestras arquitecturas IIoT conectan sensores antiguos e islas de maquinaria directamente a la nube mediante protocolos ligeros, procesando la telemetría crítica en el borde (Edge) para latencia cero.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
    stats: [
      { label: 'Carga de Red', value: '-80% Ancho Banda' },
      { label: 'Latencia Edge', value: '< 5 ms' },
      { label: 'Seguridad', value: 'TLS 1.3 / X.509' },
      { label: 'Conectividad', value: 'Global (5G/LTE)' }
    ],
    items: [
      {
        id: 'edge-computing',
        title: 'Nodos Edge Industriales',
        description: 'Computación potente directamente junto a la máquina.',
        longDescription: 'Evitamos la congestión hacia la nube filtrando y analizando datos en servidores Edge rugerizados. Ejecutan contenedores Docker con modelos analíticos locales, tomando decisiones de control en milisegundos, operando incluso si la conexión a internet se interrumpe.',
        features: ['[icon:Shield] Despliegue de aplicaciones vía contenedores (Kubernetes Edge)', '[icon:Zap] Protocolos OT/IT unificados: OPC-UA a MQTT Sparkplug B', '[icon:Cpu] Firewall industrial integrado con DPI (Deep Packet Inspection)'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png',
        tableHeaders: ['Capa', 'Tecnología Empleada', 'Función Primaria', 'Tiempo de Reacción', 'Dependencia Cloud'],
        equipmentTable: [
          { model: 'Data Ingestion', width: 'OPC-UA / Modbus / S7', capacity: 'Normalización de Datos', power: 'Milisegundos', weight: 'Ninguna' },
          { model: 'Analytics', width: 'Docker / Node-RED / Python', capacity: 'Inferencia de IA Local', power: '< 50 ms', weight: 'Solo para re-entrenamiento' }
        ]
      }
    ]
  },
  'energia-inteligente': {
    title: 'ENERGÍA INTELIGENTE',
    subtitle: 'Sostenibilidad cuantificable y eficiencia activa',
    description: 'Soluciones integrales de monitoreo energético para cumplir con normativas ISO 50001. Visibilidad en tiempo real del consumo de agua, aire comprimido, gas y electricidad (W.A.G.E.S.) para reducir costos y alcanzar la meta de Cero Emisiones.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115213579_choco%20bN%202.png',
    stats: [
      { label: 'Reducción de Costo', value: 'Hasta 25%' },
      { label: 'Retorno Inversión', value: '12-18 Meses' },
      { label: 'Precisión Medición', value: 'Clase 0.2s' },
      { label: 'Reporte de CO2', value: 'Automático' }
    ],
    items: [
      {
        id: 'ems',
        title: 'Energy Management System (EMS)',
        description: 'Dashboards analíticos de huella de carbono y calidad de energía.',
        longDescription: 'Correlacionamos el consumo energético con la producción real (kWh por tonelada producida). El EMS identifica fugas de aire comprimido, penalizaciones por factor de potencia bajo y arranques de motores fuera de pico, optimizando la factura eléctrica.',
        features: ['[icon:Shield] Analizadores de redes con detección de armónicos y micro-cortes', '[icon:Zap] Cálculo automático de línea base energética y objetivos (EnPIs)', '[icon:Cpu] Integración de microrredes (Paneles Solares y Sistemas BESS)'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png',
        tableHeaders: ['Variable WAGES', 'Tecnología de Medición', 'Precisión', 'Métrica Derivada', 'Oportunidad de Ahorro'],
        equipmentTable: [
          { model: 'Eléctrico', width: 'Analizador de Red Clase 0.2', capacity: '±0.2%', power: 'kWh / Lote', weight: 'Corrección Factor de Potencia' },
          { model: 'Aire Comprimido', width: 'Caudalímetro Másico Térmico', capacity: '±1.5%', power: 'Nm3 / min', weight: 'Detección de Fugas Fuera de Turno' }
        ]
      }
    ]
  },
  'smq-os': {
    title: 'PLATAFORMA SMQ OS™',
    subtitle: 'El Sistema Operativo definitivo para el sector industrial',
    description: 'SMQ OS™ centraliza todos los activos digitales de la planta en una plataforma web de alto desempeño. Combina SCADA, MES, mantenimiento y analítica ejecutiva en un solo cristal de vidrio, diseñado con la fluidez de las mejores aplicaciones modernas.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png',
    stats: [
      { label: 'Accesibilidad', value: '100% Web (HTML5)' },
      { label: 'Manejo de Datos', value: 'Big Data / Time-Series' },
      { label: 'Seguridad Auth', value: 'SSO / Active Directory' },
      { label: 'Integración', value: 'API RESTful / GraphQL' }
    ],
    items: [
      {
        id: 'platform',
        title: 'Módulos y Arquitectura Unificada',
        description: 'La convergencia total de los silos de información industrial.',
        longDescription: 'A diferencia de los engorrosos sistemas de escritorio heredados, SMQ OS™ está construido sobre arquitecturas web reactivas de última generación. Permite a los gerentes consultar reportes de OEE desde su smartphone, mientras los operadores controlan la máquina desde tablets industriales en el piso de planta.',
        features: ['[icon:Shield] Diseño UI/UX premium y modo oscuro nativo para reducir fatiga visual', '[icon:Zap] Sistema de gestión de alarmas por jerarquías y notificaciones Push/SMS', '[icon:Cpu] Motor de base de datos Time-Series capaz de millones de escrituras por segundo'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png',
        tableHeaders: ['Módulo SMQ OS™', 'Funcionalidad', 'Tipo de Usuario', 'Base de Datos', 'Dispositivo Óptimo'],
        equipmentTable: [
          { model: 'Centro de Comando', width: 'Visión Satelital Multi-Planta', capacity: 'Director / C-Level', power: 'Data Lake (Cloud)', weight: 'Monitor Ultrawide' },
          { model: 'Portal de Operador', width: 'Arranque/Paro, Recetas, Fallas', capacity: 'Operador de Línea', power: 'Time-Series (Edge)', weight: 'Panel Táctil IP65 (HMI)' }
        ]
      }
    ]
  },
  'economia-circular': {
    title: 'ECONOMÍA CIRCULAR',
    subtitle: 'Valorización de residuos y procesos sin desperdicio (Zero Waste)',
    description: 'Diseñamos sistemas que convierten los subproductos industriales en recursos valiosos. Soluciones de separación inteligente, tratamiento de efluentes y reciclaje de plásticos post-consumo que habilitan una manufactura genuinamente sostenible.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
    stats: [
      { label: 'Recuperación de Material', value: 'Hasta 95%' },
      { label: 'Cierre de Ciclo', value: 'Bottle-to-Bottle' },
      { label: 'Ahorro de Agua Fresca', value: '> 70%' },
      { label: 'Certificación', value: 'Cumplimiento ESG' }
    ],
    items: [
      {
        id: 'reciclaje-avanzado',
        title: 'Plantas de Reciclaje y Separación Óptica',
        description: 'Extracción de valor desde el flujo de residuos mixtos.',
        longDescription: 'Líneas completas de lavado, molienda y extrusión para plásticos (PET, HDPE). Incorporamos separadores ópticos NIR (Near Infrared) de alta resolución que discriminan polímeros por su firma química a velocidades increíbles, asegurando purezas grado alimenticio (FDA/EFSA).',
        features: ['[icon:Shield] Espectrometría NIR para clasificación de resinas por tipo y color', '[icon:Zap] Sistemas de lavado en caliente con recuperación química y térmica', '[icon:Cpu] Filtración de masa fundida ultra-fina automática (Melt Filtration)'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png',
        tableHeaders: ['Proceso Circular', 'Tecnología Clave', 'Eficiencia de Separación', 'Rendimiento', 'Aplicación Final'],
        equipmentTable: [
          { model: 'Clasificación', width: 'Sensor NIR + AI', capacity: '> 98% Pureza', power: 'Hasta 10 Ton/hora', weight: 'Separación por Polímero' },
          { model: 'Extrusión', width: 'Doble Husillo Co-rotante', capacity: 'Desgasificación Alto Vacío', power: 'Hasta 4 Ton/hora', weight: 'Pellet Grado Alimenticio' }
        ]
      }
    ]
  }
`;

const newSectorColors = `
    'inteligencia-artificial': {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      borderActive: 'border-purple-500/50',
      text: 'text-[#8B5CF6]',
      textHover: 'hover:text-[#8B5CF6]',
      accent: '#8B5CF6',
      glow: 'rgba(139,92,246,0.2)'
    },
    'smart-factory': {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      borderActive: 'border-emerald-500/50',
      text: 'text-[#10B981]',
      textHover: 'hover:text-[#10B981]',
      accent: '#10B981',
      glow: 'rgba(16,185,129,0.2)'
    },
    'digital-twin': {
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      borderActive: 'border-sky-500/50',
      text: 'text-[#0EA5E9]',
      textHover: 'hover:text-[#0EA5E9]',
      accent: '#0EA5E9',
      glow: 'rgba(14,165,233,0.2)'
    },
    'plc-motion': {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      borderActive: 'border-red-500/50',
      text: 'text-[#EF4444]',
      textHover: 'hover:text-[#EF4444]',
      accent: '#EF4444',
      glow: 'rgba(239,68,68,0.2)'
    },
    'iiot-edge': {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      borderActive: 'border-blue-500/50',
      text: 'text-[#3B82F6]',
      textHover: 'hover:text-[#3B82F6]',
      accent: '#3B82F6',
      glow: 'rgba(59,130,246,0.2)'
    },
    'energia-inteligente': {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      borderActive: 'border-amber-500/50',
      text: 'text-[#F59E0B]',
      textHover: 'hover:text-[#F59E0B]',
      accent: '#F59E0B',
      glow: 'rgba(245,158,11,0.2)'
    },
    'smq-os': {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      borderActive: 'border-yellow-500/50',
      text: 'text-[#EAB308]',
      textHover: 'hover:text-[#EAB308]',
      accent: '#EAB308',
      glow: 'rgba(234,179,8,0.2)'
    },
    'economia-circular': {
      bg: 'bg-teal-500/10',
      border: 'border-teal-500/30',
      borderActive: 'border-teal-500/50',
      text: 'text-[#14B8A6]',
      textHover: 'hover:text-[#14B8A6]',
      accent: '#14B8A6',
      glow: 'rgba(20,184,166,0.2)'
    },
    'default': {
`;

// Replace sectorsData
// Find the start of epc and the end of servicio in sectorsData
let newContent = content.replace(/'epc': \{[\s\S]*?'servicio': \{[\s\S]*?\}\n    \]\n  \}/g, newSectorsData.trim());

// Replace sectorColors
newContent = newContent.replace(/'epc': \{[\s\S]*?'servicio': \{[\s\S]*?\}\n    \},\n    'default': \{/g, newSectorColors.trim());

fs.writeFileSync(filePath, newContent);
console.log('IndustriaDetalle.jsx updated successfully!');
