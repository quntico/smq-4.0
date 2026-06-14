const fs = require('fs');
const path = require('path');

const themes = {
  alimentos: { accent: '#F97316', accentGlow: 'rgba(249, 115, 22, 0.4)', bgStart: '#120702', bgEnd: '#2C1103', glowColor: 'orange' },
  packaging: { accent: '#FFD700', accentGlow: 'rgba(255, 215, 0, 0.4)', bgStart: '#121001', bgEnd: '#262102', glowColor: 'yellow' },
  conversion: { accent: '#06B6D4', accentGlow: 'rgba(6, 182, 212, 0.4)', bgStart: '#011012', bgEnd: '#032329', glowColor: 'cyan' },
  reciclaje: { accent: '#84CC16', accentGlow: 'rgba(132, 204, 22, 0.4)', bgStart: '#01120c', bgEnd: '#022419', glowColor: 'lime' },
  medica: { accent: '#EF4444', accentGlow: 'rgba(239, 68, 68, 0.4)', bgStart: '#170404', bgEnd: '#2e0808', glowColor: 'red' },
  automatizacion: { accent: '#8B5CF6', accentGlow: 'rgba(139, 92, 246, 0.4)', bgStart: '#0e0917', bgEnd: '#1c122e', glowColor: 'violet' }
};

const machinesList = [
  // 01 LAVADO Y PELADO
  { ind: "alimentos", code: "alimentos-lwf-500", name: "Línea de Lavado y Secado LWF-500", desc: "Lavado y secado industrial continuo de frutas y hortalizas." },
  { ind: "alimentos", code: "alimentos-lwv-500", name: "Línea de Lavado y Corte LWV-500", desc: "Procesamiento y troceado automático de vegetales." },
  { ind: "alimentos", code: "alimentos-lwl-500", name: "Línea de Lavado de Hojas LWL-500", desc: "Lavado por inmersión y desinfección de hojas verdes." },
  { ind: "alimentos", code: "alimentos-lbw-500", name: "Tina de Lavado Burbujas LBW-500", desc: "Lavado hidrodinámico por burbujeo para productos delicados." },
  { ind: "alimentos", code: "alimentos-gpl-300", name: "Peladora de Ajos GPL-300", desc: "Peladora neumática de ajos de alta eficiencia." },
  
  // 02 PRODUCCIÓN DE ALIMENTOS
  { ind: "alimentos", code: "alimentos-lpc-500", name: "Línea de Producción de Papas Fritas LPC-500", desc: "Fritura industrial continua con control preciso de temperatura." },
  { ind: "alimentos", code: "alimentos-lch-500", name: "Línea de Producción Chocolate en Polvo LCH-500", desc: "Mezcla, dosificación e industrialización de chocolate." },
  { ind: "alimentos", code: "alimentos-lmc-100", name: "Línea de Producción de Pastas LMC-100", desc: "Extrusión y moldeado de pastas secas de alta calidad." },
  { ind: "alimentos", code: "alimentos-lmc-200", name: "Línea de Producción de Pastas LMC-200", desc: "Producción industrial continua de pastas frescas y rellenas." },
  { ind: "alimentos", code: "alimentos-lfc-300", name: "Línea de Producción de Frutas Congeladas LFC-300", desc: "Lavado, clasificación y congelación IQF para frutas." },
  { ind: "alimentos", code: "alimentos-lcb-300", name: "Línea de Producción de Barras de Cereal LCB-300", desc: "Laminado y corte de barras nutricionales." },
  { ind: "alimentos", code: "alimentos-lsn-250", name: "Línea de Snacks Inflados LSN-250", desc: "Extrusión y saborización de snacks de maíz y cereales." },
  { ind: "alimentos", code: "alimentos-lpt-250", name: "Línea de Alimento para Mascotas LPT-250", desc: "Extrusión de croquetas y alimento balanceado." },
  
  // 03 EMPAQUETADO Y LLENADO
  { ind: "alimentos", code: "alimentos-pkb-70", name: "Línea de Empaquetado y Llenado PKB-70", desc: "Dosificación y sellado de bolsas preformadas." },
  { ind: "alimentos", code: "alimentos-pkw-130", name: "Línea de Empaquetado Polvos PKW-130", desc: "Empacado vertical de productos pulverulentos." },
  { ind: "alimentos", code: "alimentos-pcp-40", name: "Llenado y Empaquetado Pouch PCP-40", desc: "Envasado automático de líquidos en formato pouch." },
  { ind: "alimentos", code: "alimentos-pct-80", name: "Empaquetado de Cartón PCT-80", desc: "Líneas de encartonado automático." },
  { ind: "alimentos", code: "alimentos-pbk-60", name: "Llenado y Empaquetado PBK-60", desc: "Llenado y sellado de sacos industriales." },
  { ind: "alimentos", code: "alimentos-btl-200", name: "Etiquetado Double Side BTL-200", desc: "Etiquetado autoadhesivo frontal y posterior para envases." },
  
  // 04 SISTEMAS DE SEPARACIÓN
  { ind: "alimentos", code: "alimentos-cs-500", name: "Separadora por Color CS-500", desc: "Clasificación óptica avanzada por sensores CCD." },
  { ind: "alimentos", code: "alimentos-ts-1000", name: "Separadora por Tamaño TS-1000", desc: "Clasificación calibradora rotativa o vibratoria." },
  { ind: "alimentos", code: "alimentos-ws-500", name: "Separadora por Peso WS-500", desc: "Clasificación por peso mediante celda de carga de alta velocidad." },
  
  { ind: "packaging", code: "csl", name: "Encajonado", desc: "Agrupado automático." },
  { ind: "packaging", code: "pal", name: "Paletizado", desc: "Paletizado robotizado." },

  { ind: "conversion", code: "exf", name: "Extrusión de Película", desc: "Producción monocapa." },
  { ind: "conversion", code: "cbl", name: "Coextrusión Soplada", desc: "Película multicapa." },
  { ind: "conversion", code: "ccs", name: "Coextrusión Cast", desc: "Película plana multicapa." },
  { ind: "conversion", code: "ebm", name: "Extrusión Soplado", desc: "Fabricación de envases." },
  { ind: "conversion", code: "sbm", name: "Soplado Estirado", desc: "Producción PET." },
  { ind: "conversion", code: "ibm", name: "Inyección Soplado", desc: "Piezas técnicas." },
  { ind: "conversion", code: "flx", name: "Impresión Flexográfica", desc: "Impresión industrial." },
  { ind: "conversion", code: "grv", name: "Rotograbado", desc: "Alta calidad gráfica." },
  { ind: "conversion", code: "dig", name: "Impresión Digital", desc: "Producción flexible." },
  { ind: "conversion", code: "lam", name: "Laminación", desc: "Solvente y solventless." },
  { ind: "conversion", code: "slt", name: "Corte y Rebobinado", desc: "Conversión final." },
  { ind: "conversion", code: "thf", name: "Termoformado", desc: "Conformado térmico." },
  
  { ind: "reciclaje", code: "shd", name: "Trituración Industrial", desc: "Reducción de tamaño." },
  { ind: "reciclaje", code: "grn", name: "Granulación", desc: "Molienda." },
  { ind: "reciclaje", code: "pws", name: "Lavado de Plástico", desc: "Lavado de polímeros." },
  { ind: "reciclaje", code: "flt", "name": "Flotación", desc: "Separación por densidad." },
  { ind: "reciclaje", code: "fri", "name": "Lavado por Fricción", desc: "Limpieza intensiva." },
  { ind: "reciclaje", code: "spr", "name": "Separación Industrial", desc: "Clasificación de materiales." },
  { ind: "reciclaje", code: "opt", "name": "Clasificación Óptica", desc: "Separación automatizada." },
  { ind: "reciclaje", code: "plt", "name": "Peletizado", desc: "Recuperación de resina." },
  { ind: "reciclaje", code: "bal", "name": "Compactación", "desc": "Prensado de materiales." },
  
  { ind: "medica", code: "med", "name": "Conversión Sanitaria", desc: "Equipos para productos médicos." },
  { ind: "medica", code: "msk", "name": "Producción de Cubrebocas", desc: "Líneas de mascarillas." },
  
  { ind: "automatizacion", code: "rob", name: "Sistemas Robotizados", desc: "Robótica industrial." },
  { ind: "automatizacion", code: "vis", name: "Sistemas de Visión", desc: "Inspección automatizada." },
  { ind: "automatizacion", code: "dgt", "name": "Gemelo Digital", desc: "Simulación y monitoreo." }
];

let generatedCode = `// Autogenerated machinery data map
export const machineryDataMap = {
`;

machinesList.forEach((m, idx) => {
  const t = themes[m.ind];
  generatedCode += `  '${m.code}': {
    industry: '${m.ind}',
    machineCode: '${m.code}',
    pageNumber: '${String(idx + 10).padStart(2, '0')}',
    theme: {
      accent: '${t.accent}',
      accentGlow: '${t.accentGlow}',
      bgStart: '${t.bgStart}',
      bgEnd: '${t.bgEnd}',
      glowColor: '${t.glowColor}'
    },
    heroTitle: '${m.name.toUpperCase()}',
    heroSubtitle: '${m.desc}',
    heroDesc: 'Descripción detallada para ${m.name}. El sistema está diseñado para cumplir con los estándares industriales más exigentes. Puedes editar este contenido desde el CMS para especificar el funcionamiento exacto y los beneficios de esta línea.',
    heroMedia: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    kpis: [
      { value: '100%', unit: 'EFICIENCIA', label: 'Rendimiento', desc: 'Producción continua' },
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
      { name: 'Sector Primario', icon: '🏭', desc: 'Aplicación en las industrias de mayor demanda' },
      { name: 'Aplicación Especial', icon: '⚙️', desc: 'Procesos personalizados para este equipo' }
    ],
    advantages: [
      { title: 'ALTA CONFIABILIDAD', desc: 'Equipos diseñados para funcionar sin interrupciones con mínimo mantenimiento.', highlight: 'Durabilidad' },
      { title: 'INTEGRACIÓN 4.0', desc: 'Monitoreo remoto y conexión con sistemas de gestión de planta.', highlight: 'Tecnología' }
    ],
    specs: [
      { param: 'Modelo Base', value: 'Serie SMQ-${m.code.toUpperCase().replace('ALIMENTOS-', '')}' },
      { param: 'Capacidad', value: 'Configurable según requerimientos' },
      { param: 'Controlador', value: 'PLC de última generación con pantalla HMI' }
    ],
    configurations: [
      { name: 'Automatización Completa', desc: 'Módulos adicionales para operación desatendida.' },
      { name: 'Sensores Avanzados', desc: 'Sistemas de inspección óptica y láser.' }
    ]
  },
`;
});

generatedCode += `};
`;

fs.writeFileSync(path.join(__dirname, 'apps/web/src/data/machineryCatalog.js'), generatedCode);
console.log('Catalog generated!');
