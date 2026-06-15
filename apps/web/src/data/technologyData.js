export const technologyDataMap = {
  automatizacion: {
    title: 'Automatización Industrial',
    subtitle: 'Lógica de control avanzada y sistemas de supervisión estables',
    description: 'Implementamos ecosistemas de control integral para maximizar la eficiencia productiva. Desde la programación de Controladores Lógicos Programables (PLC) hasta interfaces hombre-máquina (HMI) y sistemas SCADA para monitoreo en tiempo real, garantizando líneas de producción ininterrumpidas y de máxima precisión.',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    stats: [
      { label: 'Tiempo de Actividad', value: '99.9%' },
      { label: 'Latencia de Control', value: '< 10ms' },
      { label: 'Integración', value: '100% IIoT' },
      { label: 'Protocolos', value: 'PROFINET / EIP' }
    ],
    items: [
      {
        id: 'sistemas-plc',
        title: 'Arquitectura de Control (PLC & PAC)',
        description: 'Cerebros industriales de alta velocidad para sincronización perfecta.',
        longDescription: 'Diseño e integración de armarios de control equipados con procesadores de última generación. Desarrollamos lógica secuencial, control PID de lazos cerrados y sincronización de ejes (Motion Control) para procesos críticos.',
        features: [
          '[icon:Cpu] Procesamiento determinístico de microsegundos',
          '[icon:Shield] Seguridad funcional (Safety) integrada',
          '[icon:Workflow] Topologías de anillo redundante'
        ],
        image: 'https://images.unsplash.com/photo-1610491462702-42e6ecd4f2dd?auto=format&fit=crop&q=80',
        tableHeaders: ['Plataforma', 'Protocolo Base', 'Motion Control', 'Nivel SIL'],
        equipmentTable: [
          { model: 'Siemens S7-1500', width: 'PROFINET', capacity: 'Avanzado', power: 'SIL 3 / PLe', weight: 'Integrada' },
          { model: 'Allen-Bradley ControlLogix', width: 'Ethernet/IP', capacity: 'CIP Motion', power: 'SIL 3', weight: 'Integrada' },
          { model: 'Beckhoff CX', width: 'EtherCAT', capacity: 'Nanosegundos', power: 'TwinSAFE', weight: 'PC-Based' }
        ]
      },
      {
        id: 'supervision-scada',
        title: 'Supervisión y Adquisición de Datos (SCADA)',
        description: 'Visibilidad total y control centralizado de toda la planta.',
        longDescription: 'Desarrollamos interfaces gráficas inmersivas para centros de control operativo. Permiten el análisis de tendencias, gestión de alarmas ISA 18.2, trazabilidad de lotes y almacenamiento en bases de datos SQL para auditorías.',
        features: [
          '[icon:Eye] Dashboards de KPIs en tiempo real',
          '[icon:Database] Registro histórico de variables analógicas',
          '[icon:Globe] Acceso web seguro y autenticación LDAP'
        ],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
        tableHeaders: ['Módulo', 'Función Principal', 'Frecuencia de Muestreo', 'Estándar'],
        equipmentTable: [
          { model: 'HMI Local', width: 'Control en máquina', capacity: '100ms', power: 'IP65', weight: 'Táctil' },
          { model: 'SCADA Central', width: 'Visión global de planta', capacity: '1s', power: 'ISA 101', weight: 'Redundante' }
        ]
      }
    ]
  },
  robotica: {
    title: 'Robótica Aplicada',
    subtitle: 'Celdas dinámicas de manipulación y paletizado de alta velocidad',
    description: 'Transformamos los cuellos de botella del final de línea en flujos continuos y predecibles. Nuestros sistemas robóticos antropomórficos y colaborativos aseguran ciclos rápidos, levantamiento de cargas pesadas y flexibilidad para cambiar formatos en minutos.',
    heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80',
    stats: [
      { label: 'Carga Máxima (Payload)', value: 'Hasta 1,200 kg' },
      { label: 'Precisión (Repetibilidad)', value: '± 0.02 mm' },
      { label: 'Ejes de Libertad', value: '4 a 6 Ejes' },
      { label: 'Eficiencia OEE', value: '> 95%' }
    ],
    items: [
      {
        id: 'paletizado-inteligente',
        title: 'Celdas de Paletizado Robotizado',
        description: 'Sistemas de fin de línea para cajas, sacos, cuñetes y fardos.',
        longDescription: 'Diseñamos celdas completas que incluyen dispensadores de tarimas, formadores de mosaico mediante software generador de patrones, garras multifunción diseñadas a medida (vacío, mecánicas, magnéticas) y envolvedoras automáticas.',
        features: [
          '[icon:Package] Manejo múltiple (cajas y pallets simultáneos)',
          '[icon:Zap] Cambios rápidos de formato (SMED)',
          '[icon:Shield] Vallados de seguridad con escáneres láser'
        ],
        image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80',
        tableHeaders: ['Tipo de Robot', 'Payload', 'Alcance (Reach)', 'Aplicación Ideal'],
        equipmentTable: [
          { model: 'Robot Articulado 4 Ejes', width: '180 kg', capacity: '3,150 mm', power: 'Paletizado Cajas', weight: 'Alta Velocidad' },
          { model: 'Robot Articulado 6 Ejes', width: '300 kg', capacity: '2,800 mm', power: 'Manipulación Compleja', weight: 'Versatilidad' },
          { model: 'Robot Cobot', width: '25 kg', capacity: '1,500 mm', power: 'Trabajo con Operarios', weight: 'Seguridad' }
        ]
      },
      {
        id: 'pick-and-place',
        title: 'Sistemas Pick & Place Delta',
        description: 'Robótica cinemática paralela para empaque primario de alta cadencia.',
        longDescription: 'Integración de robots tipo araña (Delta) guiados por visión artificial en tiempo real. Ideales para la industria alimentaria y farmacéutica, donde la velocidad y la delicadeza en el manejo del producto son críticas.',
        features: [
          '[icon:Activity] Aceleraciones de hasta 15 G',
          '[icon:Eye] Seguimiento de cinta (Conveyor Tracking)',
          '[icon:Droplets] Clasificación sanitaria Washdown (IP69K)'
        ],
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80',
        tableHeaders: ['Arquitectura', 'Ciclos por Minuto', 'Visión Integrada', 'Ambiente'],
        equipmentTable: [
          { model: 'Robot Delta 3 Ejes', width: '150 - 200 CPM', capacity: 'Reconocimiento Forma', power: 'Alimentario', weight: '1-3 kg' },
          { model: 'Robot SCARA', width: '80 - 100 CPM', capacity: 'Inspección Calidad', power: 'Ensamblaje', weight: '5-10 kg' }
        ]
      }
    ]
  },
  vision: {
    title: 'Visión Artificial',
    subtitle: 'Sistemas de inspección óptica con clasificación y detección micrométrica',
    description: 'Nuestros sistemas de visión industrial otorgan "ojos" y "criterio" a las líneas de producción. Capaces de medir, contar, leer códigos y detectar defectos imperceptibles a gran velocidad, asegurando que el 100% de la producción cumpla con los estándares de calidad.',
    heroImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
    stats: [
      { label: 'Resolución de Análisis', value: '< 10 micras' },
      { label: 'Velocidad de Inspección', value: '1,000 pz/min' },
      { label: 'Tasa de Falsos Rechazos', value: '< 0.01%' },
      { label: 'Iluminación', value: 'Multiespectral' }
    ],
    items: [
      {
        id: 'control-calidad',
        title: 'Inspección de Calidad Defectológica',
        description: 'Detección instantánea de anomalías superficiales y dimensionales.',
        longDescription: 'Utilizamos cámaras de alta velocidad matriciales y lineales, junto con iluminación estroboscópica LED de longitudes de onda específicas, para revelar rayones, porosidad, ensambles incorrectos o niveles de llenado en fracciones de segundo.',
        features: [
          '[icon:Search] Verificación de tapado y nivel de líquido',
          '[icon:CheckCircle] Control de presencia / ausencia de componentes',
          '[icon:Maximize] Metrología óptica sin contacto'
        ],
        image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80',
        tableHeaders: ['Tecnología', 'Resolución', 'Tipo de Sensor', 'Aplicación Principal'],
        equipmentTable: [
          { model: 'Cámara Matricial 2D', width: '5 - 20 MP', capacity: 'CMOS Global Shutter', power: 'Inspección General', weight: 'GigeVision' },
          { model: 'Cámara Lineal (Linescan)', width: '8K / 16K', capacity: 'Sensor de línea', power: 'Superficies continuas', weight: 'CameraLink' },
          { model: 'Perfilometría 3D', width: 'Micrométrica', capacity: 'Láser Triangulación', power: 'Medición de volumen', weight: 'GigE' }
        ]
      },
      {
        id: 'lectura-trazabilidad',
        title: 'Lectura OCR/OCV y Trazabilidad',
        description: 'Identificación óptica de caracteres y códigos DPM.',
        longDescription: 'Sistemas que aseguran que las fechas de caducidad, números de lote, y códigos de barras (1D) o Datamatrix (2D) impresos directamente en el material (DPM) sean completamente legibles y correctos antes del envío.',
        features: [
          '[icon:Hash] Lectura omnidireccional a alta velocidad',
          '[icon:Grid] Decodificación de códigos dañados o degradados',
          '[icon:Database] Integración directa con ERP / MES'
        ],
        image: 'https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?auto=format&fit=crop&q=80',
        tableHeaders: ['Función', 'Simbologías', 'Contraste Mínimo', 'Velocidad de Lectura'],
        equipmentTable: [
          { model: 'Lector Fijo Industrial', width: '1D, 2D, QR, DPM', capacity: 'Bajo contraste (20%)', power: '60+ decodificaciones/s', weight: 'IP67' },
          { model: 'Sistema OCR/OCV', width: 'Alfanumérico', capacity: 'Tipografías variadas', power: 'Milisegundos', weight: 'Deep Learning' }
        ]
      }
    ]
  },
  mecanica: {
    title: 'Integración Mecánica',
    subtitle: 'Ingeniería CAD robusta de precisión y ensamble higiénico estructural',
    description: 'La base física de cualquier solución industrial exitosa. Diseñamos, maquinamos y ensamblamos estructuras, mecanismos y transportadores bajo estrictos cálculos de ingeniería, utilizando aceros de alta resistencia y grado sanitario según requiera el sector.',
    heroImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80',
    stats: [
      { label: 'Precisión de Maquinado', value: 'Tolerancias CNC' },
      { label: 'Grado Alimenticio', value: 'AISI 304 / 316L' },
      { label: 'Análisis Estructural', value: 'Simulación FEA' },
      { label: 'Soldadura', value: 'TIG Sanitaria' }
    ],
    items: [
      {
        id: 'diseno-fabricacion',
        title: 'Ingeniería y Diseño CAD/CAM',
        description: 'De la conceptualización a la fabricación con tolerancia cero.',
        longDescription: 'Modelado en software 3D paramétrico para evaluar interferencias y funcionalidad antes del corte. Aplicamos Análisis de Elementos Finitos (FEA) para asegurar que las estructuras soporten cargas dinámicas, vibraciones y estrés térmico.',
        features: [
          '[icon:PenTool] Modelado 3D (SolidWorks, Inventor)',
          '[icon:Shield] Evaluación estructural (Fatiga y Tensión)',
          '[icon:Layers] Integración electromecánica P&ID'
        ],
        image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80',
        tableHeaders: ['Proceso', 'Software', 'Precisión / Tolerancia', 'Salida'],
        equipmentTable: [
          { model: 'Modelado y Ensamble', width: 'CAD Paramétrico', capacity: 'Milimétrica', power: 'Planos de fabricación', weight: 'BOM Generada' },
          { model: 'Simulación de Esfuerzos', width: 'FEA/CAE', capacity: 'Alta Fidelidad', power: 'Validación estructural', weight: 'Factor de Seguridad' }
        ]
      },
      {
        id: 'sistemas-transporte',
        title: 'Sistemas de Transporte y Mecanismos',
        description: 'El sistema vascular de su línea de producción.',
        longDescription: 'Construcción a medida de transportadores de banda (sanitarios), rodillos vivos, cadenas modulares plásticas, cangilones y tornillos sinfín. Mecanismos accionados por servomotores para posicionamiento exacto y sincronización de etapas.',
        features: [
          '[icon:Move] Bandas modulares de bajo coeficiente de fricción',
          '[icon:RefreshCw] Sinfines dosificadores de precisión volumétrica',
          '[icon:Droplets] Lavabilidad y drenaje rápido (Diseño Sanitario)'
        ],
        image: 'https://images.unsplash.com/photo-1563770660-3af7b8b42261?auto=format&fit=crop&q=80',
        tableHeaders: ['Tipo de Transportador', 'Material Constructivo', 'Aplicación', 'Limpieza'],
        equipmentTable: [
          { model: 'Banda Sanitaria PU', width: 'Acero Inox AISI 304', capacity: 'Alimentos Directos', power: 'Desarme rápido sin htas.', weight: 'Motor IP69K' },
          { model: 'Cadena Modular (Intralox)', width: 'Acero Inox / Aluminio', capacity: 'Cajas, Botellas, Pallets', power: 'Lavado a presión', weight: 'Larga duración' },
          { model: 'Tornillo Sinfín', width: 'Acero al Carbón / Inox', capacity: 'Polvos y Granulados', power: 'Tapas de inspección', weight: 'Alto torque' }
        ]
      }
    ]
  },
  industria40: {
    title: 'Industria 4.0 & IIoT',
    subtitle: 'Conectividad con análisis telemétrico de variables críticas de planta',
    description: 'Llevamos la digitalización al piso de producción. Interconectamos máquinas, sensores y sistemas corporativos mediante el Internet Industrial de las Cosas (IIoT), convirtiendo datos aislados en inteligencia de negocios accionable desde la nube.',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
    stats: [
      { label: 'Interconexión', value: 'Edge Computing' },
      { label: 'Protocolos IoT', value: 'MQTT / OPC-UA' },
      { label: 'Disponibilidad Datos', value: '24/7 Nube/Local' },
      { label: 'Ciberseguridad', value: 'Encriptación TLS' }
    ],
    items: [
      {
        id: 'telemetria-edge',
        title: 'Edge Computing y Adquisición IIoT',
        description: 'Recolección de datos masivos directamente en la máquina.',
        longDescription: 'Instalación de Gateways IoT industriales que extraen variables de PLC, sensores de vibración, consumo energético (Smart Meters) y temperatura. Procesan datos en el borde (Edge) para enviar solo información valiosa a servidores, ahorrando ancho de banda.',
        features: [
          '[icon:Cloud] Envío seguro a servidores Cloud (AWS, Azure) o Locales',
          '[icon:Cpu] Análisis descentralizado para respuestas rápidas',
          '[icon:Wifi] Soporte para conectividad 5G, LoRaWAN y Wi-Fi Industrial'
        ],
        image: 'https://images.unsplash.com/photo-1614064641913-6b17c60ca211?auto=format&fit=crop&q=80',
        tableHeaders: ['Tecnología', 'Protocolo', 'Procesamiento', 'Seguridad'],
        equipmentTable: [
          { model: 'Edge Gateway IoT', width: 'OPC-UA / Modbus TCP', capacity: 'Filtro y Agregación', power: 'Firewall Integrado', weight: 'Almacenamiento Local' },
          { model: 'Sensores Inalámbricos', width: 'IO-Link Wireless / LoRa', capacity: 'Raw Data', power: 'Batería larga vida', weight: 'Fácil instalación' }
        ]
      },
      {
        id: 'mes-analitica',
        title: 'Sistemas MES y Analítica de Producción',
        description: 'Gestión de la ejecución de manufactura de extremo a extremo.',
        longDescription: 'Software avanzado que conecta la planta con el sistema ERP de gerencia. Provee cálculo automatizado de OEE (Eficiencia General de los Equipos), rastreo genealógico del producto, y gestión de órdenes de producción sin papel.',
        features: [
          '[icon:TrendingUp] Dashboards interactivos y reportes gerenciales',
          '[icon:Layers] Trazabilidad bidireccional (Del proveedor al cliente)',
          '[icon:Clock] Medición automática de micro-paros y mermas'
        ],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
        tableHeaders: ['Módulo MES', 'Beneficio Operativo', 'Integración ERP', 'Visualización'],
        equipmentTable: [
          { model: 'Módulo OEE en vivo', width: 'Identificación de cuellos de botella', capacity: 'SAP, Oracle, Dynamics', power: 'Pantallas Andon en Planta', weight: 'Métricas claras' },
          { model: 'Gestión de Lotes (Batch)', width: 'Cumplimiento normativo estricto', capacity: 'Sincronización de inventario', power: 'Tablet Operador', weight: 'Recetas seguras' }
        ]
      }
    ]
  },
  ia: {
    title: 'Inteligencia Artificial',
    subtitle: 'Modelos de IA locales para balanceo dinámico y mantenimiento predictivo',
    description: 'La próxima frontera tecnológica. Entrenamos y desplegamos algoritmos de Machine Learning y Deep Learning especializados en entornos industriales para predecir fallos mecánicos antes de que ocurran y optimizar recetas de producción mediante IA adaptativa.',
    heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80',
    stats: [
      { label: 'Reducción de Paros', value: 'Hasta 70%' },
      { label: 'Aumento Vida Útil', value: '20% - 30%' },
      { label: 'Ejecución de Redes', value: 'Inferencia Local' },
      { label: 'ROI Estimado', value: '< 12 Meses' }
    ],
    items: [
      {
        id: 'mantenimiento-predictivo',
        title: 'Mantenimiento Predictivo (PdM)',
        description: 'La máquina le avisa semanas antes de fallar.',
        longDescription: 'Análisis espectral continuo mediante sensores de vibración tridimensional y acústica ultrasónica. La IA detecta patrones anómalos microscópicos indicativos de desgaste de rodamientos, desbalanceo o cavitación, enviando alertas tempranas.',
        features: [
          '[icon:Activity] Monitoreo de condición vibracional y térmica',
          '[icon:Brain] Algoritmos de detección de anomalías (Unsupervised Learning)',
          '[icon:Bell] Alertas preventivas automatizadas a mantenimiento'
        ],
        image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80',
        tableHeaders: ['Sistema Analizado', 'Sensores Empleados', 'Horizonte de Predicción', 'Acción Recomendada'],
        equipmentTable: [
          { model: 'Motores y Reductores', width: 'Vibración 3-Ejes, Temp', capacity: 'Días / Semanas', power: 'Engrase / Cambio Rodamiento', weight: 'Prevención Catástrofe' },
          { model: 'Bombas y Compresores', width: 'Presión, Ultrasonido', capacity: 'Semanas', power: 'Ajuste de sellos', weight: 'Eficiencia energética' }
        ]
      },
      {
        id: 'optimizacion-procesos',
        title: 'Optimización Neuronal de Procesos',
        description: 'Toma de decisiones en milisegundos basadas en redes neuronales.',
        longDescription: 'Modelos de IA que ajustan dinámicamente los parámetros de la máquina (temperaturas, velocidades, tensiones) reaccionando en tiempo real a las variaciones de la materia prima, reduciendo desperdicios y elevando la calidad al máximo nivel.',
        features: [
          '[icon:Sliders] Deep Learning para Visión Artificial Avanzada',
          '[icon:TrendingUp] Control predictivo basado en modelos (MPC)',
          '[icon:Cpu] Computación acelerada por hardware (Nvidia Jetson / TPU)'
        ],
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80',
        tableHeaders: ['Aplicación IA', 'Tipo de Algoritmo', 'Variable de Ajuste', 'Impacto Producción'],
        equipmentTable: [
          { model: 'Inspección Orgánica (Alimentos)', width: 'Redes Neuronales Convolucionales (CNN)', capacity: 'Rechazo neumático', power: 'Cero Falsos Positivos', weight: 'Adaptable a variaciones' },
          { model: 'Control de Extrusión', width: 'Reinforcement Learning', capacity: 'RPM y Temperaturas', power: 'Estabilidad de calibre', weight: 'Reducción Scrap' }
        ]
      }
    ]
  }
};
