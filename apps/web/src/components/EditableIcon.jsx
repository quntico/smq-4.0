import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { createPortal } from 'react-dom';

// Catálogo curado de más de 200 iconos industriales y generales para SMQ Systems
const INDUSTRIAL_ICONS = [
  // MAQUINARIA Y HERRAMIENTAS (40 iconos)
  { name: 'Settings', tags: ['configuracion', 'ajustes', 'engranaje', 'maquinaria', 'motor', 'proceso', 'sistemas'], cat: 'Maquinaria' },
  { name: 'Cog', tags: ['engranaje', 'maquinaria', 'pinon', 'rueda dentada', 'mecanico', 'ajustes', 'motor'], cat: 'Maquinaria' },
  { name: 'Wrench', tags: ['herramienta', 'llave', 'mantenimiento', 'reparacion', 'soporte', 'mecanico', 'ajuste'], cat: 'Maquinaria' },
  { name: 'Hammer', tags: ['martillo', 'herramienta', 'forja', 'construccion', 'golpe', 'fabricacion'], cat: 'Maquinaria' },
  { name: 'Construction', tags: ['construccion', 'obra', 'mantenimiento', 'advertencia', 'reparacion'], cat: 'Maquinaria' },
  { name: 'HardHat', tags: ['casco', 'seguridad', 'operario', 'ingeniero', 'proteccion', 'construccion', 'planta'], cat: 'Maquinaria' },
  { name: 'Drill', tags: ['taladro', 'perforacion', 'herramienta', 'maquinaria', 'corte'], cat: 'Maquinaria' },
  { name: 'Nut', tags: ['tuerca', 'tornillo', 'sujecion', 'mecanico', 'herramienta', 'ensamble'], cat: 'Maquinaria' },
  { name: 'Disc', tags: ['disco', 'corte', 'sierra', 'molienda', 'pulido', 'rotacion', 'rotor'], cat: 'Maquinaria' },
  { name: 'Scissors', tags: ['tijeras', 'corte', 'cizalla', 'seccionamiento', 'separacion', 'cuchilla'], cat: 'Maquinaria' },
  { name: 'Tool', tags: ['herramienta', 'caja de herramientas', 'mantenimiento', 'soporte', 'reparacion'], cat: 'Maquinaria' },
  { name: 'Scale', tags: ['bascula', 'balanza', 'peso', 'dosificacion', 'pesaje', 'control', 'precision'], cat: 'Maquinaria' },
  { name: 'Key', tags: ['llave', 'seguridad', 'acceso', 'enclavamiento', 'bloqueo'], cat: 'Maquinaria' },
  { name: 'ShieldAlert', tags: ['proteccion', 'seguridad', 'alarma', 'resguardo', 'peligro', 'advertencia'], cat: 'Maquinaria' },
  { name: 'Tractor', tags: ['tractor', 'agroindustria', 'campo', 'maquinaria pesada', 'vehiculo'], cat: 'Maquinaria' },
  { name: 'Truck', tags: ['camion', 'transporte', 'logistica', 'despacho', 'entrega', 'materia prima'], cat: 'Maquinaria' },
  { name: 'Ruler', tags: ['regla', 'medicion', 'calibrado', 'dimensiones', 'plano', 'ingenieria'], cat: 'Maquinaria' },
  { name: 'Compass', tags: ['brujula', 'alineacion', 'geometria', 'trazado', 'diseno'], cat: 'Maquinaria' },
  { name: 'Paintbrush', tags: ['pintura', 'acabado', 'tratamiento superficial', 'recubrimiento'], cat: 'Maquinaria' },
  { name: 'SprayCan', tags: ['spray', 'pintura', 'lubricante', 'limpieza', 'mantenimiento'], cat: 'Maquinaria' },
  { name: 'UtilityPole', tags: ['poste', 'tendido electrico', 'alta tension', 'subestacion'], cat: 'Maquinaria' },
  { name: 'HardDrive', tags: ['disco duro', 'memoria', 'respaldo plc', 'historial datos'], cat: 'Maquinaria' },
  { name: 'Cpu', tags: ['procesador', 'cerebro plc', 'circuito', 'computadora industrial'], cat: 'Maquinaria' },
  { name: 'Boxes', tags: ['cajas', 'inventario', 'almacenamiento', 'ordenamiento', 'palets'], cat: 'Maquinaria' },
  { name: 'PackageOpen', tags: ['caja abierta', 'inspeccion', 'desembalaje', 'insumos'], cat: 'Maquinaria' },
  { name: 'Anchor', tags: ['anclaje', 'fijacion', 'cimentacion', 'estructura pesada'], cat: 'Maquinaria' },
  { name: 'Plug', tags: ['enchufe', 'conector', 'alimentacion electrica', 'toma de corriente'], cat: 'Maquinaria' },
  { name: 'Plug2', tags: ['conector rapido', 'manguera', 'hidraulica', 'neumatica'], cat: 'Maquinaria' },
  { name: 'Screwdriver', tags: ['destornillador', 'herramienta', 'ensamble', 'panel electrico'], cat: 'Maquinaria' },
  { name: 'Pin', tags: ['pasador', 'perno', 'bloqueo mecanico', 'posicionador'], cat: 'Maquinaria' },

  // ENERGÍA Y MOTORES (35 iconos)
  { name: 'Zap', tags: ['energia', 'electricidad', 'potencia', 'corriente', 'rayo', 'voltaje', 'motores', 'arranque'], cat: 'Energía' },
  { name: 'Power', tags: ['encendido', 'apagado', 'energia', 'arranque', 'boton', 'on', 'off'], cat: 'Energía' },
  { name: 'PowerOff', tags: ['apagado', 'desconexion', 'parada de emergencia', 'corte de energia'], cat: 'Energía' },
  { name: 'Battery', tags: ['bateria', 'acumulador', 'energia', 'carga', 'respaldo', 'ups'], cat: 'Energía' },
  { name: 'BatteryCharging', tags: ['cargando', 'bateria', 'alimentacion', 'respaldo activo'], cat: 'Energía' },
  { name: 'BatteryLow', tags: ['bateria baja', 'alerta de energia', 'reemplazo bateria'], cat: 'Energía' },
  { name: 'BatteryWarning', tags: ['falla de bateria', 'alerta ups', 'critico energia'], cat: 'Energía' },
  { name: 'Flame', tags: ['fuego', 'calor', 'combustion', 'quemador', 'horno', 'caldera', 'temperatura'], cat: 'Energía' },
  { name: 'Sun', tags: ['sol', 'calor', 'radiacion', 'secado', 'energia solar', 'termico'], cat: 'Energía' },
  { name: 'Sparkles', tags: ['chispa', 'soldadura', 'plasma', 'corte laser', 'acabado', 'pulido'], cat: 'Energía' },
  { name: 'Lightbulb', tags: ['bombilla', 'foco', 'iluminacion', 'idea', 'indicador', 'senal', 'luz'], cat: 'Energía' },
  { name: 'Fuel', tags: ['combustible', 'diesel', 'gasolina', 'tanque', 'quemador', 'alimentacion'], cat: 'Energía' },
  { name: 'Gauge', tags: ['manometro', 'presion', 'indicador', 'nivel', 'sensor', 'velocidad', 'tacometro'], cat: 'Energía' },
  { name: 'Fan', tags: ['ventilador', 'soplador', 'extractor', 'enfriamiento', 'aire', 'turbina', 'motor'], cat: 'Energía' },
  { name: 'Wind', tags: ['aire comprimido', 'neumatica', 'viento', 'soplado', 'desgasificacion', 'flujo'], cat: 'Energía' },
  { name: 'Orbit', tags: ['orbita', 'rotacion', 'centrifuga', 'giro', 'mezcladora', 'agitacion'], cat: 'Energía' },
  { name: 'RotateCw', tags: ['rotar derecha', 'sentido horario', 'giro motor', 'ciclo', 'recirculacion'], cat: 'Energía' },
  { name: 'RotateCcw', tags: ['rotar izquierda', 'sentido antihorario', 'giro inverso', 'retorno'], cat: 'Energía' },
  { name: 'RefreshCw', tags: ['reciclar', 'actualizar', 'ciclo continuo', 'lavado', 'recirculacion', 'proceso'], cat: 'Energía' },
  { name: 'Activity', tags: ['actividad', 'pulso', 'osciloscopio', 'frecuencia', 'vibracion', 'sensor', 'monitoreo'], cat: 'Energía' },
  { name: 'SunDim', tags: ['calor atenuado', 'precalentamiento', 'baja potencia'], cat: 'Energía' },
  { name: 'ZapOff', tags: ['apagon', 'cero energia', 'parada forzosa', 'seguridad electrica'], cat: 'Energía' },
  { name: 'Sparkle', tags: ['arco electrico', 'estatica', 'descarga'], cat: 'Energía' },
  { name: 'GaugeCircle', tags: ['indicador circular', 'presion de vacio', 'temperatura caldera'], cat: 'Energía' },
  { name: 'Heater', tags: ['resistencia electrica', 'calefactor', 'zona extrusion'], cat: 'Energía' },
  { name: 'Coil', tags: ['bobina', 'inductor', 'solenoide', 'electrovalvula'], cat: 'Energía' },
  { name: 'Radiator', tags: ['enfriador de aceite', 'intercambiador de placas', 'radiador'], cat: 'Energía' },

  // PLC Y CONTROL (35 iconos)
  { name: 'Cpu', tags: ['plc', 'procesador', 'control', 'electronica', 'computadora', 'cerebro', 'automatizacion'], cat: 'Control' },
  { name: 'Database', tags: ['base de datos', 'almacenamiento', 'historico', 'registros', 'scada', 'datos'], cat: 'Control' },
  { name: 'Server', tags: ['servidor', 'rack', 'nube', 'plc central', 'scada', 'red', 'sistema'], cat: 'Control' },
  { name: 'Network', tags: ['red', 'comunicacion', 'profinet', 'modbus', 'ethernet', 'bus de campo', 'conexion'], cat: 'Control' },
  { name: 'Cable', tags: ['cable', 'cableado', 'conexion', 'conexionado', 'electrico', 'bornes'], cat: 'Control' },
  { name: 'Terminal', tags: ['consola', 'terminal', 'comandos', 'codigo', 'programacion', 'plc'], cat: 'Control' },
  { name: 'Router', tags: ['router', 'switch', 'red', 'wifi', 'telemetria', 'remoto'], cat: 'Control' },
  { name: 'Binary', tags: ['binario', 'codigo', 'digital', 'datos', 'entradas salidas', 'plc'], cat: 'Control' },
  { name: 'Code', tags: ['codigo', 'programacion', 'script', 'plc', 'bloque de funcion'], cat: 'Control' },
  { name: 'Microchip', tags: ['microchip', 'circuito integrado', 'placa', 'tarjeta electronica'], cat: 'Control' },
  { name: 'Play', tags: ['iniciar', 'arrancar', 'marcha', 'run', 'ciclo', 'reproducir'], cat: 'Control' },
  { name: 'Pause', tags: ['pausar', 'detener temporalmente', 'pausa', 'espera'], cat: 'Control' },
  { name: 'Square', tags: ['parar', 'stop', 'detener', 'parada de proceso', 'cuadrado'], cat: 'Control' },
  { name: 'Eye', tags: ['vision artificial', 'camara', 'sensor optico', 'inspeccion', 'monitoreo', 'control de calidad'], cat: 'Control' },
  { name: 'Tv', tags: ['hmi', 'pantalla', 'monitor', 'interfaz', 'scada', 'panel de control'], cat: 'Control' },
  { name: 'Tablet', tags: ['tablet', 'hmi portatil', 'control remoto', 'operario', 'movil'], cat: 'Control' },
  { name: 'Smartphone', tags: ['celular', 'telefono', 'alertas', 'mensajes sms', 'notificacion remoto'], cat: 'Control' },
  { name: 'Sliders', tags: ['potenciometros', 'ajustes', 'parametros', 'variador de frecuencia', 'velocidad'], cat: 'Control' },
  { name: 'Radio', tags: ['antena', 'senal rf', 'telemetria', 'remoto', 'transmisor'], cat: 'Control' },
  { name: 'Code2', tags: ['lenguaje estructurado', 'ladder', 'diagrama de contactos'], cat: 'Control' },
  { name: 'Fingerprint', tags: ['biometrico', 'seguridad acceso', 'control de operarios'], cat: 'Control' },
  { name: 'KeyRound', tags: ['contrasena plc', 'proteccion de firmware', 'desbloqueo'], cat: 'Control' },
  { name: 'Keyboard', tags: ['consola de mando', 'teclado industrial', 'ingreso de datos'], cat: 'Control' },
  { name: 'MousePointer', tags: ['puntero', 'operacion scada', 'mouse trackball'], cat: 'Control' },
  { name: 'Bot', tags: ['robot', 'brazo robotico', 'automatizacion', 'cobot'], cat: 'Control' },
  { name: 'Joystick', tags: ['joystick', 'mando grua', 'control manual', 'remoto cobot'], cat: 'Control' },
  { name: 'ServerCrash', tags: ['falla de red', 'servidor caido', 'perdida de scada'], cat: 'Control' },
  { name: 'Settings2', tags: ['configuracion avanzada', 'calibrado fino', 'offset'], cat: 'Control' },
  { name: 'ToggleLeft', tags: ['interruptor off', 'entrada digital desactivada'], cat: 'Control' },

  // PROCESOS Y FLUJOS (35 iconos)
  { name: 'Layers', tags: ['capas', 'sistemas de pelletizado', 'extrusión multicapa', 'laminado', 'acumulacion'], cat: 'Procesos' },
  { name: 'Layers2', tags: ['capas', 'laminado', 'coextrusion', 'doble capa', 'soporte'], cat: 'Procesos' },
  { name: 'Split', tags: ['bifurcacion', 'separador', 'division', 'clasificacion', 'triaje', 'desvio'], cat: 'Procesos' },
  { name: 'Merge', tags: ['mezclador', 'union', 'fusion', 'ensamble', 'cooperacion', 'junta'], cat: 'Procesos' },
  { name: 'Repeat', tags: ['repetir', 'ciclo cerrado', 'lazo de control', 'recirculacion', 'automatico'], cat: 'Procesos' },
  { name: 'Shuffle', tags: ['mezcla aleatoria', 'distribucion', 'dosificador', 'homogeneizacion'], cat: 'Procesos' },
  { name: 'ArrowLeftRight', tags: ['intercambiador', 'flujo bidireccional', 'transferencia', 'valvula de desvio'], cat: 'Procesos' },
  { name: 'Waves', tags: ['ondas', 'vibracion', 'ultrasonido', 'fluidos', 'agitacion', 'sensor nivel'], cat: 'Procesos' },
  { name: 'Droplet', tags: ['gota', 'liquido', 'agua', 'humedad', 'aceite', 'lubricante', 'condensado'], cat: 'Procesos' },
  { name: 'Droplets', tags: ['condensacion', 'humedad alta', 'lavado por aspersion', 'agua de proceso'], cat: 'Procesos' },
  { name: 'Thermometer', tags: ['temperatura', 'sensor termico', 'calefaccion', 'enfriamiento', 'caldera'], cat: 'Procesos' },
  { name: 'ThermometerSnowflake', tags: ['enfriamiento de agua', 'chiller', 'intercambiador placas', 'refrigeracion'], cat: 'Procesos' },
  { name: 'Filter', tags: ['filtro', 'filtracion', 'malla', 'purificacion', 'separador de solidos'], cat: 'Procesos' },
  { name: 'FlaskConical', tags: ['matraz', 'laboratorio', 'quimico', 'analisis', 'aditivos', 'formulacion'], cat: 'Procesos' },
  { name: 'FlaskRound', tags: ['matraz redondo', 'reaccion quimica', 'laboratorio industrial'], cat: 'Procesos' },
  { name: 'Pipette', tags: ['pipeta', 'dosificacion minima', 'quimico', 'muestreo', 'control calidad'], cat: 'Procesos' },
  { name: 'Syringe', tags: ['jeringa', 'inyeccion', 'dosificacion', 'lubricante', 'aditivo'], cat: 'Procesos' },
  { name: 'GlassWater', tags: ['agua limpia', 'dosificado liquido', 'grado alimenticio'], cat: 'Procesos' },
  { name: 'Timer', tags: ['temporizador', 'ciclo de curado', 'tiempo de espera', 'reloj'], cat: 'Procesos' },
  { name: 'GitBranch', tags: ['desvio', 'bypass', 'flujo paralelo', 'derivacion'], cat: 'Procesos' },
  { name: 'GitMerge', tags: ['retorno de flujo', 'colector de retorno', 'retorno caldera'], cat: 'Procesos' },
  { name: 'GitPullRequest', tags: ['valvula solenoide', 'peticion de llenado', 'dosificar'], cat: 'Procesos' },
  { name: 'Funnel', tags: ['embudo', 'tolva de alimentacion', 'dosificador de polvo'], cat: 'Procesos' },
  { name: 'Atom', tags: ['reaccion molecular', 'polimerizacion', 'compounding', 'materiales'], cat: 'Procesos' },
  { name: 'Cylinder', tags: ['piston hidraulico', 'cilindro neumatico', 'prensa', 'actuador'], cat: 'Procesos' },
  { name: 'Layers3', tags: ['multicapa', 'coextrusion de pelicula', 'laminado plastico'], cat: 'Procesos' },
  { name: 'Feather', tags: ['material liviano', 'baja densidad', 'poliestireno'], cat: 'Procesos' },
  { name: 'Magnet', tags: ['separador magnetico', 'trampa de metales', 'iman industrial'], cat: 'Procesos' },
  { name: 'Torus', tags: ['anillo de agua', 'pelletizado en anillo', 'boquilla de extrusion'], cat: 'Procesos' },

  // LOGÍSTICA E INDUSTRIA (35 iconos)
  { name: 'Factory', tags: ['fabrica', 'planta', 'industria', 'nave industrial', 'produccion', 'manufactura'], cat: 'Industria' },
  { name: 'Package', tags: ['empaque', 'embalaje', 'caja', 'packaging', 'dosificado', 'producto terminado'], cat: 'Industria' },
  { name: 'Box', tags: ['caja', 'embalaje', 'almacenamiento', 'scrap', 'materia prima'], cat: 'Industria' },
  { name: 'Container', tags: ['silo', 'tolva', 'contenedor', 'tanque de almacenamiento', 'deposito'], cat: 'Industria' },
  { name: 'Warehouse', tags: ['almacen', 'bodega', 'centro de distribucion', 'logistica', 'stock'], cat: 'Industria' },
  { name: 'MapPin', tags: ['ubicacion', 'planta', 'geolocalizacion', 'direccion', 'destino'], cat: 'Industria' },
  { name: 'Shield', tags: ['seguridad', 'proteccion', 'epp', 'resguardo de maquina', 'normativa'], cat: 'Industria' },
  { name: 'ShieldCheck', tags: ['seguridad aprobada', 'inspeccion exitosa', 'verificacion', 'resguardo cerrado'], cat: 'Industria' },
  { name: 'Clipboard', tags: ['hoja de ruta', 'orden de trabajo', 'mantenimiento preventivo', 'receta'], cat: 'Industria' },
  { name: 'ClipboardList', tags: ['lista de chequeo', 'checklist', 'mantenimiento', 'inspeccion diaria'], cat: 'Industria' },
  { name: 'FileText', tags: ['reporte', 'hoja tecnica', 'manual de usuario', 'pdf', 'especificacion'], cat: 'Industria' },
  { name: 'CheckSquare', tags: ['tarea realizada', 'verificado', 'ok', 'inspeccion aprobada'], cat: 'Industria' },
  { name: 'BarChart3', tags: ['grafico', 'kpi', 'oee', 'rendimiento', 'productividad', 'eficiencia'], cat: 'Industria' },
  { name: 'TrendingUp', tags: ['aumento de produccion', 'eficiencia', 'mejora continua', 'kpi optimo'], cat: 'Industria' },
  { name: 'TrendingDown', tags: ['merma', 'perdida', 'reduccion de costos', 'scrap', 'desperdicio'], cat: 'Industria' },
  { name: 'Users', tags: ['operarios', 'personal', 'equipo de ingenieria', 'seguridad industrial'], cat: 'Industria' },
  { name: 'FileSpreadsheet', tags: ['excel', 'reporte de produccion', 'datos crudos', 'exportar kpi'], cat: 'Industria' },
  { name: 'Globe', tags: ['global', 'nube', 'conectividad iot', 'exportacion', 'red remota'], cat: 'Industria' },
  { name: 'Ship', tags: ['buque de carga', 'importacion maquinaria', 'aduana', 'transporte maritimo'], cat: 'Industria' },
  { name: 'Plane', tags: ['carga aerea', 'repuestos urgentes', 'importacion rapida'], cat: 'Industria' },
  { name: 'Train', tags: ['ferrocarril', 'transporte pesado', 'granel'], cat: 'Industria' },
  { name: 'ShoppingBag', tags: ['bolsa de empaque', 'sacos de resina', 'materia prima pp pe'], cat: 'Industria' },
  { name: 'ShoppingCart', tags: ['carro de compras', 'adquisiciones', 'procura de repuestos'], cat: 'Industria' },
  { name: 'Archive', tags: ['archivador', 'registro historico', 'planos de ingenieria', 'antiguos'], cat: 'Industria' },
  { name: 'ClipboardCheck', tags: ['calidad verificada', 'aprobacion haccp', 'fda aprobado'], cat: 'Industria' },
  { name: 'ClipboardX', tags: ['rechazado', 'inspeccion fallida', 'scrap registrado'], cat: 'Industria' },
  { name: 'Rss', tags: ['telemetria iot', 'transmisor de presion', 'senal remota'], cat: 'Industria' },
  { name: 'DollarSign', tags: ['costos de produccion', 'retorno de inversion', 'roi', 'presupuesto'], cat: 'Industria' },
  { name: 'EuroSign', tags: ['costo europeo', 'importacion de italia', 'maquinaria europea'], cat: 'Industria' },
  { name: 'Milestone', tags: ['hito de proyecto', 'cronograma de instalacion', 'comisionamiento'], cat: 'Industria' },
  { name: 'Award', tags: ['certificacion de calidad', 'iso 9001', 'reconocimiento industrial'], cat: 'Industria' },
  { name: 'Briefcase', tags: ['negocio', 'portafolio de proyectos', 'cotizaciones llave en mano'], cat: 'Industria' },
  { name: 'Luggage', tags: ['kit de puesta en marcha', 'herramientas de comisionamiento'], cat: 'Industria' },

  // ALERTAS Y SEÑALES (20 iconos)
  { name: 'AlertTriangle', tags: ['advertencia', 'peligro', 'alarma', 'falla de maquina', 'atencion'], cat: 'Alertas' },
  { name: 'AlertCircle', tags: ['error de comunicacion', 'alarma critica', 'fallo plc', 'parada'], cat: 'Alertas' },
  { name: 'Info', tags: ['informacion', 'ayuda', 'manual de operacion', 'ayuda de HMI'], cat: 'Alertas' },
  { name: 'HelpCircle', tags: ['soporte tecnico', 'dudas', 'ayuda interactiva'], cat: 'Alertas' },
  { name: 'Bell', tags: ['alarma audible', 'sirena', 'notificacion', 'aviso de arranque'], cat: 'Alertas' },
  { name: 'BellRing', tags: ['alarma sonando', 'aviso activo', 'alerta critica'], cat: 'Alertas' },
  { name: 'BellOff', tags: ['alarma silenciada', 'mantenimiento de bocina', 'desactivado'], cat: 'Alertas' },
  { name: 'Wifi', tags: ['senal wifi', 'telemetria', 'conexion inalambrica', 'iot'], cat: 'Alertas' },
  { name: 'WifiOff', tags: ['sin senal', 'desconectado', 'falla de comunicacion', 'offline'], cat: 'Alertas' },
  { name: 'Lock', tags: ['enclavamiento bloqueado', 'seguridad', 'candado', 'loto', 'bloqueo y etiquetado'], cat: 'Alertas' },
  { name: 'Unlock', tags: ['enclavamiento abierto', 'libre', 'candado abierto', 'mantenimiento'], cat: 'Alertas' },
  { name: 'Check', tags: ['correcto', 'verificado', 'exito', 'marcha ok'], cat: 'Alertas' },
  { name: 'X', tags: ['cancelar', 'cerrar', 'parar', 'incorrecto', 'error'], cat: 'Alertas' },
  { name: 'CheckCircle', tags: ['operativo', 'sistema normal', 'marcha continua'], cat: 'Alertas' },
  { name: 'CheckCircle2', tags: ['verificado por supervisor', 'control calidad ok'], cat: 'Alertas' },
  { name: 'XCircle', tags: ['falla critica', 'paro de emergencia presionado', 'estop'], cat: 'Alertas' },
  { name: 'ShieldX', tags: ['sin proteccion', 'puerta de seguridad abierta', 'peligro mecanico'], cat: 'Alertas' },
  { name: 'Skull', tags: ['riesgo de muerte', 'alta tension', 'gases toxicos'], cat: 'Alertas' },
  { name: 'Radiation', tags: ['radiacion gamma', 'sensor de espesor nucleo', 'medidor isotopos'], cat: 'Alertas' },
  { name: 'Biohazard', tags: ['riesgo biologico', 'desinfeccion cip', 'tratamiento efluentes'], cat: 'Alertas' },

  // DIRECCIONALES Y UI (25 iconos)
  { name: 'Plus', tags: ['agregar', 'nuevo item', 'sumar', 'incrementar'], cat: 'UI' },
  { name: 'Minus', tags: ['quitar', 'eliminar', 'restar', 'decrementar'], cat: 'UI' },
  { name: 'Search', tags: ['buscar', 'filtrar', 'localizar repuesto', 'buscador'], cat: 'UI' },
  { name: 'Edit3', tags: ['editar', 'modificar parametro', 'receta', 'escribir'], cat: 'UI' },
  { name: 'Save', tags: ['guardar', 'salvar receta', 'escribir en plc', 'memorizar'], cat: 'UI' },
  { name: 'Trash2', tags: ['eliminar', 'borrar', 'scrap', 'descartar'], cat: 'UI' },
  { name: 'ArrowUp', tags: ['subir', 'elevacion', 'incrementar', 'arriba'], cat: 'UI' },
  { name: 'ArrowDown', tags: ['bajar', 'descenso', 'decrementar', 'abajo'], cat: 'UI' },
  { name: 'ArrowLeft', tags: ['izquierda', 'retroceso', 'retorno'], cat: 'UI' },
  { name: 'ArrowRight', tags: ['derecha', 'avance', 'siguiente'], cat: 'UI' },
  { name: 'ChevronUp', tags: ['desplegar arriba', 'minimizar'], cat: 'UI' },
  { name: 'ChevronDown', tags: ['desplegar abajo', 'expandir'], cat: 'UI' },
  { name: 'ChevronLeft', tags: ['anterior', 'atras'], cat: 'UI' },
  { name: 'ChevronRight', tags: ['siguiente', 'adelante'], cat: 'UI' },
  { name: 'RefreshCcw', tags: ['actualizar', 'reiniciar alarma', 'reset', 'rearmar'], cat: 'UI' },
  { name: 'Link', tags: ['enlazar', 'vinculo', 'asociar variables', 'modbus link'], cat: 'UI' },
  { name: 'Link2Off', tags: ['desenlazar', 'desconexion', 'desvinculado'], cat: 'UI' },
  { name: 'ExternalLink', tags: ['enlace externo', 'abrir manual pdf', 'ir a pagina web'], cat: 'UI' },
  { name: 'Download', tags: ['descargar manual', 'bajar plano cad', 'guardar reporte'], cat: 'UI' },
  { name: 'Upload', tags: ['subir receta', 'cargar imagen', 'actualizar documento'], cat: 'UI' },
  { name: 'Menu', tags: ['menu principal', 'navegacion', 'abrir barra'], cat: 'UI' },
  { name: 'Home', tags: ['inicio', 'pantalla principal', 'hmi principal'], cat: 'UI' },
  { name: 'MoreHorizontal', tags: ['mas opciones', 'detalles adicionales', 'historicos'], cat: 'UI' },
  { name: 'MoreVertical', tags: ['menu opciones', 'configuraciones extra'], cat: 'UI' },
  { name: 'ZoomIn', tags: ['acercar vista', 'lupa', 'zoom plano'], cat: 'UI' }
];

export const EditableIcon = ({ 
  name, 
  onChange, 
  isEditorMode = false, 
  size = 14, 
  className = '', 
  style = {} 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  // Cerrar el modal al presionar Escape
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

  // Si el componente Lucide no existe, usar 'Zap' como fallback
  const resolvedName = name && LucideIcons[name] ? name : 'Zap';
  const IconComponent = LucideIcons[resolvedName];

  // Filtrado de iconos según búsqueda y categoría
  const filteredIcons = INDUSTRIAL_ICONS.filter(item => {
    const matchesCategory = activeCategory === 'Todos' || item.cat === activeCategory;
    const searchLower = search.toLowerCase().trim();
    if (!searchLower) return matchesCategory;
    
    // Buscar en el nombre en inglés o en las palabras clave en español
    const matchesName = item.name.toLowerCase().includes(searchLower);
    const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(searchLower));
    
    return matchesCategory && (matchesName || matchesTags);
  });

  const handleSelectIcon = (iconName) => {
    onChange(iconName);
    setIsOpen(false);
  };

  const categories = ['Todos', 'Maquinaria', 'Energía', 'Control', 'Procesos', 'Industria', 'Alertas', 'UI'];

  return (
    <>
      <span 
        onClick={(e) => {
          if (isEditorMode) {
            e.stopPropagation();
            setIsOpen(true);
          }
        }}
        className={`inline-flex items-center justify-center transition-all ${
          isEditorMode 
            ? 'cursor-pointer hover:bg-white/10 p-1 -m-1 border border-dashed border-blue-400/50 hover:border-blue-400 rounded bg-blue-500/5 animate-pulse hover:animate-none' 
            : ''
        } ${className}`}
        style={style}
        title={isEditorMode ? 'Haz clic para cambiar este icono' : ''}
      >
        <IconComponent size={size} />
      </span>

      {isOpen && isEditorMode && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div 
            className="bg-[#0A0F15]/95 border border-white/10 rounded-2xl shadow-2xl w-[600px] max-w-[95%] max-h-[85vh] backdrop-blur-xl flex flex-col gap-4 text-white text-left font-['Poppins']"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="flex justify-between items-center border-b border-white/5 p-5 pb-3">
              <div>
                <h3 className="text-md font-bold text-[#FFD700] uppercase tracking-wider flex items-center gap-2">
                  <LucideIcons.Settings size={18} className="animate-spin [animation-duration:15s] text-[#FFD700]" />
                  <span>Selector de Iconos Industriales</span>
                </h3>
                <p className="text-[10px] text-white/50 mt-1 uppercase tracking-widest">SMQ 4.0 // Modo Edición Activo</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/40 hover:text-white transition-colors text-xs font-bold px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10"
              >
                ESC / Cerrar
              </button>
            </div>

            {/* Input de Busqueda en Español */}
            <div className="px-5 flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-black text-white/50 tracking-wider">Buscar en Español o Inglés</label>
              <div className="relative flex items-center">
                <LucideIcons.Search className="absolute left-3 text-white/40" size={16} />
                <input 
                  type="text" 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                  placeholder="Ej: motor, presión, plc, válvula, silo, tolva, corte, sensor..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/30 transition-all placeholder-white/20"
                  autoFocus
                />
                {search && (
                  <button 
                    onClick={() => setSearch('')} 
                    className="absolute right-3 text-white/40 hover:text-white text-xs bg-white/5 px-1.5 py-0.5 rounded"
                  >
                    Borrar
                  </button>
                )}
              </div>
            </div>

            {/* Categorías Rápidas */}
            <div className="px-5 flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-md border transition-all cursor-pointer ${
                    activeCategory === cat 
                      ? 'bg-[#FFD700] text-black border-[#FFD700] font-bold shadow-md' 
                      : 'bg-white/5 text-white/60 border-white/5 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid de Iconos */}
            <div className="flex-1 overflow-y-auto px-5 pb-5 grid grid-cols-6 sm:grid-cols-8 gap-2 min-h-[200px] max-h-[40vh] scrollbar-thin">
              {filteredIcons.length > 0 ? (
                filteredIcons.map((item) => {
                  const Icon = LucideIcons[item.name] || LucideIcons.Zap;
                  const isCurrent = resolvedName === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleSelectIcon(item.name)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer group hover:scale-105 ${
                        isCurrent 
                          ? 'bg-[#FFD700]/20 border-[#FFD700] text-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.15)] font-bold' 
                          : 'bg-white/[0.02] border-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/15'
                      }`}
                      title={`${item.name} - Tags: ${item.tags.join(', ')}`}
                    >
                      <Icon size={20} className="transition-transform group-hover:rotate-6" />
                      <span className="text-[7.5px] mt-1.5 font-mono text-center truncate w-full text-white/40 group-hover:text-white/80">
                        {item.name}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center text-center p-8 text-white/30 gap-2">
                  <LucideIcons.AlertTriangle size={32} className="text-[#FFD700]/70" />
                  <p className="font-semibold text-xs text-white/80">No se encontraron iconos</p>
                  <p className="text-[10px] text-white/40">Prueba con términos similares (ej: en vez de 'prensa' busca 'maquinaria' o 'corte')</p>
                </div>
              )}
            </div>

            {/* Footer de Estado */}
            <div className="bg-black/40 px-5 py-3 border-t border-white/5 text-[9px] font-mono text-white/40 flex justify-between rounded-b-2xl">
              <span>LISTADO: {filteredIcons.length} DE {INDUSTRIAL_ICONS.length} ICONOS</span>
              <span className="text-[#FFD700] font-bold">SMQ SYSTEMS CUSTOM EDITOR</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
export default EditableIcon;
