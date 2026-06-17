import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer.jsx';
import { ChevronRight, ArrowLeft, Cpu, Compass, Settings, Zap, Shield, ArrowUpRight, Upload, Image as ImageIcon, Plus, Trash2, Minimize2, Maximize2, ArrowLeftRight, Cloud, Save, Layers, RefreshCw, Scissors, Package, Clock, Star, Leaf, Droplet, Grid, HardHat, Recycle, Wheat, HeartPulse, Bot, Award, TrendingUp, Globe, Users, BarChart3, Headphones, Briefcase, Building2, MapPin, Hammer, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMS } from '@/context/CMSContext.jsx';
import { uploadFile } from '@/lib/storage.js';
import { createPortal } from 'react-dom';
import { getOptimizedImageUrl } from '@/lib/utils.js';
import EditableIcon from '@/components/EditableIcon.jsx';
import { Helmet } from 'react-helmet';
import { machineryDataMap } from '@/data/machineryCatalog.js';
import { technologyDataMap } from '@/data/technologyData.js';

const reciclajeData = {
  title: 'Industria de Reciclaje y Economía Circular',
  subtitle: 'Tecnología líder para la economía circular y recuperación de materiales',
  description: 'Diseñamos y fabricamos sistemas llave en mano de alto rendimiento para el procesamiento, triturado, lavado y extrusión de polímeros, metales y residuos. Nuestras soluciones maximizan la pureza del material recuperado y reducen el consumo energético operativo.',
  heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png',
  stats: [
    { label: 'Eficiencia de Lavado', value: '99.2%' },
    { label: 'Rendimiento Máximo', value: '2.5 Ton/h' },
    { label: 'Ahorro de Energía', value: 'Hasta 30%' },
    { label: 'Vida Útil Husillo', value: '25,000h+' }
  ],
  items: [
    {
      id: 'plasticos',
      title: 'Líneas de Reciclaje de Plásticos',
      description: 'Lavado, extrusión y peletizado de polímeros de alta pureza.',
      longDescription: 'Módulos modulares integrados para la remoción completa de adhesivos, contaminantes y etiquetas en botellas PET post-consumo, y peletizado con humedad residual inferior al 1%.',
      features: ['[icon:Shield] Trituración en húmedo de alta fricción', '[icon:Zap] Flotación por densidad en tinas gravimétricas', '[icon:Cpu] Extrusión y desgasificación al vacío'],
      image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png',
      tableHeaders: ['Modelo', 'Capacidad', 'Eficiencia', 'Potencia', 'Material'],
      equipmentTable: [
        { model: 'PL-120', width: 'Lavado y Extrusión PET', capacity: '1.2 Ton/h', power: '99.2%', weight: '110 kW' },
        { model: 'PL-250', width: 'Planta PE/PP Film', capacity: '2.5 Ton/h', power: '98.8%', weight: '160 kW' }
      ]
    },
    {
      id: 'metales',
      title: 'Separación y Trituración de Metales',
      description: 'Separación magnética y trituración de chatarras ferrosas y no ferrosas.',
      longDescription: 'Separadores de corrientes de Foucault y overbelt magnéticos para clasificar y triturar perfiles de aluminio, cobre y acero con precisión micrométrica.',
      features: ['[icon:Shield] Imán de tierras raras de neodimio de alto Gauss', '[icon:Zap] Rotor de polos múltiples para corrientes Foucault', '[icon:Cpu] Clasificación automatizada de metales no ferrosos'],
      image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png',
      tableHeaders: ['Modelo', 'Tipo Separador', 'Capacidad', 'Eficiencia', 'Potencia'],
      equipmentTable: [
        { model: 'MS-800', width: 'Separador Overbelt Magnético', capacity: '1.5 Ton/h', power: '98.5%', weight: '5.5 kW' },
        { model: 'ECS-600', width: 'Corrientes de Foucault (Eddy)', capacity: '2.0 Ton/h', power: '99.1%', weight: '11 kW' }
      ]
    },
    {
      id: 'rsu',
      title: 'Tratamiento de Residuos Sólidos Urbanos (RSU)',
      description: 'Separación, trituración y preparación de combustibles alternativos.',
      longDescription: 'Sistemas llave en mano de clasificación mecánica y biológica combinando trómeles de cribado, separadores ópticos NIR y desgasificadores neumáticos.',
      features: ['[icon:Shield] Trómeles rotativos de clasificación por size', '[icon:Zap] Separación óptica de polímeros por espectrometría', '[icon:Cpu] Preparación de Combustibles Derivados de Residuo (CDR)'],
      image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
      tableHeaders: ['Modelo', 'Componente RSU', 'Capacidad', 'Grado Clasificación', 'Potencia'],
      equipmentTable: [
        { model: 'MSW-1500', width: 'Trómel Separador Rotativo', capacity: '15 Ton/h', power: '90%', weight: '45 kW' },
        { model: 'NIR-1200', width: 'Clasificador Óptico Infrarrojo', capacity: '8 Ton/h', power: '97%', weight: '15 kW' }
      ]
    },
    {
      id: 'recuperacion',
      title: 'Recuperación Avanzada de Materiales',
      description: 'Clasificación automatizada de subproductos secos como papel, cartón y vidrio.',
      longDescription: 'Estaciones de selección automática optimizadas para el flujo inverso de plantas municipales, utilizando tecnología de cribado balístico.',
      features: ['[icon:Shield] Separación balística de fracciones planas y rodantes', '[icon:Zap] Sensores ópticos inductivos de alta resolución', '[icon:Cpu] Control por red SCADA integrada en sala de control'],
      image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png',
      tableHeaders: ['Modelo', 'Aplicación', 'Rendimiento', 'Separación', 'Estructura'],
      equipmentTable: [
        { model: 'MR-600', width: 'Clasificador Balístico', capacity: '6 Ton/h', power: '95%', weight: 'Acero Soldado' },
        { model: 'VIS-400', width: 'Inspección Óptica Vidrio', capacity: '4 Ton/h', power: '99%', weight: 'Acero SUS304' }
      ]
    },
    {
      id: 'economia-circular',
      title: 'Estrategias de Economía Circular',
      description: 'Compounding, aditivos especiales y valorización completa de mermas.',
      longDescription: 'Asesoría y desarrollo técnico para la transformación de descartes de producción en materias primas secundarias de alta calidad listas para inyección.',
      features: ['[icon:Shield] Compounding piloto de polímeros y fibras naturales', '[icon:Zap] Aditivos avanzados para restauración de viscosidad', '[icon:Cpu] Plantas modulares de micronizado a medida'],
      image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png',
      tableHeaders: ['Modelo', 'Servicio/Equipo', 'Capacidad', 'Normativa', 'Garantía'],
      equipmentTable: [
        { model: 'EC-200', width: 'Línea Compounding Piloto', capacity: '200 kg/h', power: 'ISO 9001', weight: '2 Años' },
        { model: 'EC-500', width: 'Sistemas de Micronización', capacity: '500 kg/h', power: 'CE', weight: '2 Años' }
      ]
    }
  ]
};

const sectorsData = {
  'reciclaje': reciclajeData,
  'reciclaje-y-plasticos': reciclajeData,
  'alimentos': {
    title: 'Industria de Alimentos y Bebidas',
    subtitle: 'Higiene óptima, precisión y control absoluto',
    description: 'Equipos diseñados bajo los más estrictos estándares de sanidad (HACCP / FDA) y procesamiento de alimentos. Desarrollamos tecnologías avanzadas para procesamiento, dosificación y empaque de alta eficiencia.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png',
    stats: [
      { label: 'Eficiencia de Proceso', value: '99.5%' },
      { label: 'Grado Sanitario', value: 'FDA / HACCP' },
      { label: 'Operación Continua', value: '24/7' },
      { label: 'Control Autónomo', value: 'Sí' }
    ],
    items: [
      {
        id: 'lavado',
        title: 'LÍNEAS DE LAVADO Y PELADO',
        description: 'Sistemas integrados de lavado, desinfección, corte y pelado para vegetales y frutas.',
        longDescription: 'Nuestros equipos de lavado por burbujas y sistemas de pelado garantizan un tratamiento delicado y óptimo de la materia prima, reduciendo mermas y cumpliendo rigurosos estándares higiénicos.',
        features: [
          '[icon:Shield] Construcción completa en acero inoxidable AISI 304',
          '[icon:Zap] Consumo eficiente de agua con sistema de recirculación',
          '[icon:Cpu] Regulación de velocidad de banda y flujo de aire'
        ],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png',
        tableHeaders: ["Modelo", "Función", "Capacidad", "Potencia", "Material"],
        equipmentTable: [
          { model: 'LWF-500', width: 'Lavado y Secado', capacity: '500 kg/h', power: '3.2 kW', weight: 'AISI 304' },
          { model: 'LWV-500', width: 'Lavado y Corte', capacity: '500 kg/h', power: '4.5 kW', weight: 'AISI 304' },
          { model: 'LWL-500', width: 'Lavado de Hojas', capacity: '400 kg/h', power: '2.8 kW', weight: 'AISI 304' },
          { model: 'LBW-500', width: 'Tina de Lavado Burbujas', capacity: '600 kg/h', power: '3.5 kW', weight: 'AISI 304' },
          { model: 'GPL-300', width: 'Peladora de Ajos', capacity: '300 kg/h', power: '1.5 kW', weight: 'AISI 304' }
        ]
      },
      {
        id: 'produccion',
        title: 'LÍNEAS DE PRODUCCIÓN DE ALIMENTOS',
        description: 'Líneas completas de procesamiento para papas fritas, chocolate, pastas, frutas y snacks.',
        longDescription: 'Líneas integradas modulares diseñadas para procesamiento continuo con máxima eficiencia energética y consistencia de producto en cada lote.',
        features: [
          '[icon:Shield] Control total automático vía panel PLC touch',
          '[icon:Zap] Sistemas de calentamiento eficientes e inteligentes',
          '[icon:Cpu] Fácil limpieza con estándar CIP (Clean in Place)'
        ],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png',
        tableHeaders: ["Modelo", "Producto", "Capacidad", "Energía/Potencia", "Peso Línea"],
        equipmentTable: [
          { model: 'LPC-500', width: 'Papas Fritas', capacity: '500 kg/h', power: 'GLP / Vapor', weight: '4,200 kg' },
          { model: 'LCH-500', width: 'Chocolate en Polvo', capacity: '500 kg/h', power: '18.5 kW', weight: '2,800 kg' },
          { model: 'LMC-100', width: 'Pastas', capacity: '100 kg/h', power: '11.0 kW', weight: '1,200 kg' },
          { model: 'LMC-200', width: 'Pastas', capacity: '200 kg/h', power: '15.0 kW', weight: '1,800 kg' },
          { model: 'LFC-300', width: 'Frutas Congeladas', capacity: '300 kg/h', power: 'IQF / Nitrógeno', weight: '2,100 kg' },
          { model: 'LCB-300', width: 'Barras de Cereal', capacity: '300 kg/h', power: '12.0 kW', weight: '1,600 kg' },
          { model: 'LSN-250', width: 'Snacks Inflados', capacity: '250 kg/h', power: '22.0 kW', weight: '2,300 kg' },
          { model: 'LPT-250', width: 'Alimento para Mascotas', capacity: '250 kg/h', power: '30.0 kW', weight: '3,100 kg' }
        ]
      },
      {
        id: 'empaquetado',
        title: 'LÍNEAS DE EMPAQUETADO Y LLENADO',
        description: 'Sistemas automáticos de empaque para polvos, líquidos, pouches, cartón y botellas.',
        longDescription: 'Sistemas avanzados de alta velocidad y hermeticidad de sellado para todo tipo de formatos rígidos y flexibles.',
        features: [
          '[icon:Shield] Sensores de precisión para detección de presencia de envase',
          '[icon:Zap] Servomotores de alta precisión de marca líder',
          '[icon:Cpu] Construcción higiénica y libre de mantenimiento constante'
        ],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115213579_choco%20bN%202.png',
        tableHeaders: ["Modelo", "Tipo de Empaque", "Velocidad", "Potencia", "Precisión"],
        equipmentTable: [
          { model: 'PKB-70', width: 'Empaquetado y Llenado', capacity: '70 bpm', power: '4.2 kW', weight: '±0.5%' },
          { model: 'PKW-130', width: 'Empaquetado Polvos', capacity: '130 bpm', power: '5.5 kW', weight: '±0.2%' },
          { model: 'PCP-40', width: 'Llenado y Empaquetado Pouch', capacity: '40 bpm', power: '3.8 kW', weight: '±0.4%' },
          { model: 'PCT-80', width: 'Empaquetado de Cartón', capacity: '80 cpm', power: '7.5 kW', weight: '±0.1%' },
          { model: 'PBK-60', width: 'Llenado y Empaquetado', capacity: '60 bpm', power: '4.0 kW', weight: '±0.5%' },
          { model: 'BTL-200', width: 'Etiquetado Double Side', capacity: '200 bpm', power: '2.2 kW', weight: '±0.5 mm' }
        ]
      },
      {
        id: 'separadoras',
        title: 'SISTEMAS DE SEPARACIÓN',
        description: 'Sistemas inteligentes de clasificación y separación por color, tamaño y peso.',
        longDescription: 'Sistemas ópticos y gravimétricos de alta tecnología para garantizar la máxima pureza de su producto final, eliminando cuerpos extraños y piezas fuera de especificación.',
        features: [
          '[icon:Shield] Cámaras CCD de ultra alta resolución (Full HD)',
          '[icon:Zap] Eyectores neumáticos de respuesta ultrarrápida',
          '[icon:Cpu] Algoritmos de inteligencia artificial para clasificación compleja'
        ],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png',
        tableHeaders: ["Modelo", "Criterio Separación", "Capacidad", "Precisión", "Cámaras/Sensores"],
        equipmentTable: [
          { model: 'CS-500', width: 'Separadora por Color', capacity: '500 kg/h', power: '99.9%', weight: 'Cámaras CCD HD' },
          { model: 'TS-1000', width: 'Separadora por Tamaño', capacity: '1000 kg/h', power: '99.5%', weight: 'Sensores Láser' },
          { model: 'WS-500', width: 'Separadora por Peso', capacity: '500 kg/h', power: '99.8%', weight: 'Celdas de Carga C3' }
        ]
      }
    ]
  },
  'packaging': {
    title: 'Packaging y Conversión',
    subtitle: 'Velocidad, sellado hermético y empaque inteligente',
    description: 'Sistemas avanzados de envasado primario y secundario para formatos rígidos y flexibles. Ofrecemos envasadoras Doypack, líneas de llenado volumétrico y maquinaria de conversión de film.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115213579_choco%20bN%202.png',
    stats: [
      { label: 'Velocidad de Llenado', value: '150 ppm' },
      { label: 'Hermeticidad de Sello', value: '99.99%' },
      { label: 'Tiempo de Ajuste', value: '< 15 min' },
      { label: 'Precisión de Peso', value: '±0.2%' }
    ],
    items: [
      {
        id: 'flexible',
        title: 'Formatos Flexibles (Doypack)',
        description: 'Llenadoras automáticas rotativas de pouches Stand-up y bolsas con zipper.',
        longDescription: 'Flujo de envasado automático con apertura positiva de zipper por vacío, codificación por chorro de tinta, llenado volumétrico/multicabezal e inyección de gas para mayor vida útil del producto.',
        features: ['[icon:Shield] Apertura y sellado neumático servo-sincronizado', '[icon:Zap] Inyección de gas inerte N2 para conservación', '[icon:Cpu] Control total por PLC con recetas pregrabadas'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png',
        tableHeaders: ['Modelo', 'Tipo de Pouch', 'Velocidad', 'Presión Aire', 'Potencia'],
        equipmentTable: [
          { model: 'DP8-PRO', width: 'Doypack Rotativa 8 Estaciones', capacity: '60 bpm', power: '0.6 MPa', weight: '4.5 kW' },
          { model: 'VP-100', width: 'Vertical Form-Fill-Seal (VFFS)', capacity: '100 bpm', power: '0.6 MPa', weight: '5.5 kW' }
        ]
      },
      {
        id: 'rigido',
        title: 'Líneas de Envases Rígidos',
        description: 'Llenadoras y tapadoras lineales/rotativas para botellas de plástico y vidrio.',
        longDescription: 'Sistemas de dosificación por gravedad o caudalímetros inductivos que garantizan un llenado sin derrames. Tapadoras automáticas adaptables a tapas corona, rosca plástica o metálica.',
        features: ['[icon:Shield] Caudalímetros electromagnéticos de alta precisión', '[icon:Zap] Torque de tapado regulable por embrague magnético', '[icon:Cpu] CIP (Clean In Place) automático sin desmontaje de piezas'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
        tableHeaders: ['Modelo', 'Tipo Envase', 'Capacidad', 'Precisión Llenado', 'Grado Higiene'],
        equipmentTable: [
          { model: 'RF-200', width: 'Llenadora Rotativa 24 Válvulas', capacity: '180 bpm', power: '±0.2%', weight: 'Grado Alimentario/GMP' },
          { model: 'LT-120', width: 'Tapadora Lineal Automática', capacity: '120 bpm', power: '±0.5%', weight: 'Acero AISI 304' }
        ]
      },
      {
        id: 'impresion',
        title: 'Sistemas de Impresión y Flexo',
        description: 'Sistemas flexográficos de tambor central e impresión digital para películas plásticas.',
        longDescription: 'Tecnología avanzada para impresión de alta velocidad sobre películas de PE, PP, BOPP, PET y papel. Sistemas de secado eficiente por aire caliente y curado UV.',
        features: ['[icon:Shield] Registro de color automático servomotorizado', '[icon:Zap] Secadores de alta eficiencia térmica por aire forzado', '[icon:Cpu] Control de tensión de película por celda de carga'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png',
        tableHeaders: ['Modelo', 'Ancho Máximo', 'Velocidad Impresión', 'Colores', 'Resolución'],
        equipmentTable: [
          { model: 'FL-4', width: 'Flexográfica 4 Colores', capacity: '1200 mm', power: '150 m/min', weight: '80 LPI' },
          { model: 'FL-8', width: 'Flexo Tambor Central 8 Colores', capacity: '1600 mm', power: '250 m/min', weight: '120 LPI' }
        ]
      },
      {
        id: 'etiquetado',
        title: 'Etiquetadoras Industriales',
        description: 'Aplicadoras de etiquetas autoadhesivas y túneles de manga termoencogible (Sleeve).',
        longDescription: 'Colocación precisa y uniforme de etiquetas en botellas, tarros y cajas. Sistemas con motores paso a paso de gran par y lectura por fotoceldas de alta velocidad.',
        features: ['[icon:Shield] Dispensadores servomotorizados de alta respuesta', '[icon:Zap] Sensores de contraste y ultrasonido para etiquetas transparentes', '[icon:Cpu] Banda superior estabilizadora de envase para alineación perfecta'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png',
        tableHeaders: ['Modelo', 'Tipo Aplicador', 'Velocidad Máxima', 'Ancho Etiqueta', 'Tolerancia'],
        equipmentTable: [
          { model: 'ET-200', width: 'Etiquetadora Doble Cara', capacity: '200 bpm', power: '150 mm', weight: '±0.5 mm' },
          { model: 'SLV-150', width: 'Aplicadora de Sleeve Termoencogible', capacity: '150 bpm', power: '200 mm', weight: '±1.0 mm' }
        ]
      },
      {
        id: 'conversion',
        title: 'Conversión y Rebobinado de Film',
        description: 'Cortadoras, rebobinadoras y termoformadoras de film flexible.',
        longDescription: 'Maquinaria de conversión de precisión para fraccionar bobinas anchas, rebobinar películas y fabricar empaques termoformados a partir de lámina rígida.',
        features: ['[icon:Shield] Ejes expansibles neumáticos de cambio rápido', '[icon:Zap] Cuchillas circulares y de corte por cizalla', '[icon:Cpu] Posicionamiento automático de cuchillas'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png',
        tableHeaders: ['Modelo', 'Ancho Bobina', 'Diámetro Desbobinado', 'Velocidad Corte', 'Tensión control'],
        equipmentTable: [
          { model: 'CV-1200', width: 'Cortadora Rebobinadora', capacity: '1200 mm', power: '800 mm', weight: '400 m/min' },
          { model: 'TF-600', width: 'Termoformadora Industrial', capacity: '600 mm', power: '600 mm', weight: '35 ciclos/min' }
        ]
      }
    ]
  },
  'construccion': {
    title: 'Materiales de Construcción e Infraestructura',
    subtitle: 'Robustez y consistencia para procesos de alta exigencia',
    description: 'Desarrollamos líneas completas de extrusión y trituración para la fabricación de compuestos de madera plástica (WPC), láminas corrugadas y sistemas de trituración/dosificación de agregados estructurales.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
    stats: [
      { label: 'Relación L/D Extrusor', value: '38:1' },
      { label: 'Producción Horaria', value: '800 kg/h' },
      { label: 'Potencia de Motor', value: '132 kW+' },
      { label: 'Estructura de Aleación', value: 'Acero Hardox' }
    ],
    items: [
      {
        id: 'materiales',
        title: 'Plantas de Dosificación de Materiales',
        description: 'Sistemas para mezcla y dosificación de áridos, cementos y aditivos.',
        longDescription: 'Diseño integral de silos, básculas de pesaje dinámico y mezcladoras intensivas de doble eje para asegurar la máxima homogeneidad del mortero y hormigón preparado.',
        features: ['[icon:Shield] Celdas de carga autolimpiantes de alta precisión', '[icon:Zap] Mezcladoras planetarias de turbina con paletas de carburo', '[icon:Cpu] Sistemas SCADA de dosificación automatizada por lotes'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png',
        tableHeaders: ['Modelo', 'Tipo Mezcla', 'Capacidad', 'Precisión', 'Potencia Mezclador'],
        equipmentTable: [
          { model: 'BM-800', width: 'Mezcladora de Turbina', capacity: '800 L/lote', power: '±0.5%', weight: '37 kW' },
          { model: 'BM-1500', width: 'Mezclador Planetario', capacity: '1500 L/lote', power: '±0.3%', weight: '55 kW' }
        ]
      },
      {
        id: 'compuestos',
        title: 'Líneas de Extrusión WPC',
        description: 'Extrusoras de doble husillo cónico y paralelo para compuestos de madera y plástico.',
        longDescription: 'Nuestros sistemas de co-extrusión WPC logran una dispersión perfecta del aserrín de madera o cáscara de arroz con PE/PP/PVC, produciendo decks, fachadas y marcos con excelentes propiedades mecánicas e impermeabilidad.',
        features: ['[icon:Shield] Husillos co-rotativos o cónicos con camisa bimetálica', '[icon:Zap] Dosificadores gravimétricos con control de par', '[icon:Cpu] Calibradores de enfriamiento rápido por vacío'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png',
        tableHeaders: ['Modelo', 'Tipo Extrusor', 'Capacidad Máxima', 'Relación L/D', 'Potencia Motor'],
        equipmentTable: [
          { model: 'WPC-120', width: 'Doble Husillo Cónico', capacity: '450 kg/h', power: '28:1', weight: '75 kW' },
          { model: 'WPC-200', width: 'Doble Husillo Paralelo', capacity: '800 kg/h', power: '36:1', weight: '132 kW' }
        ]
      },
      {
        id: 'materiales-reciclados',
        title: 'Valorización de Escombros y RCD',
        description: 'Trituradoras y clasificadoras para escombros y asfalto reciclado.',
        longDescription: 'Soluciones robustas para la recuperación de agregados reciclados de RCD (Residuos de Construcción y Demolición). Sistemas equipados con imanes overbelt y separadores de aire.',
        features: ['[icon:Shield] Trituradoras de mandíbula y de impacto de gran par', '[icon:Zap] Cintas magnéticas de separación de ferrita/neodimio', '[icon:Cpu] Cribas vibratorias multideck de clasificación fina'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
        tableHeaders: ['Modelo', 'Tipo Triturador', 'Capacidad Entrada', 'Abertura Boca', 'Potencia'],
        equipmentTable: [
          { model: 'RCD-500', width: 'Trituradora de Mandíbula', capacity: '50 Ton/h', power: '600x400 mm', weight: '55 kW' },
          { model: 'RCD-800', width: 'Trituradora de Impacto', capacity: '100 Ton/h', power: '800x600 mm', weight: '110 kW' }
        ]
      },
      {
        id: 'infraestructura',
        title: 'Prefabricados de Hormigón',
        description: 'Sistemas automáticos para la fabricación de prefabricados de hormigón y tuberías.',
        longDescription: 'Maquinaria de encofrado dinámico y curado acelerado para vigas, tuberías de hormigón y paneles arquitectónicos. Incluye telemetría y monitoreo de maduración de fraguado.',
        features: ['[icon:Shield] Moldes neumáticos autovibrantes con control de frecuencia', '[icon:Zap] Sistemas de transporte de hormigón aéreo rápido', '[icon:Cpu] Monitoreo inalámbrico IoT de temperatura de fraguado'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png',
        tableHeaders: ['Modelo', 'Tipo Prefabricación', 'Ciclo Producción', 'Presión Hidráulica', 'Dimensiones Máx'],
        equipmentTable: [
          { model: 'AP-300', width: 'Prensa Bloquera Automática', capacity: '15 s/ciclo', power: '16 MPa', weight: '1200x800 mm' },
          { model: 'AP-600', width: 'Moldeadora de Tuberías', capacity: '4 min/tubo', power: '20 MPa', weight: 'Diám. 1500 mm' }
        ]
      }
    ]
  },
  'agroindustria': {
    title: 'Agroindustria y Procesamiento Agrícola',
    subtitle: 'Rendimiento y optimización en el campo y la planta',
    description: 'Soluciones llave en mano para el manejo, limpieza, secado y clasificación de granos, semillas y café, así como plantas completas para la producción de alimentos balanceados.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png',
    stats: [
      { label: 'Capacidad Secado', value: '50 Ton/h' },
      { label: 'CV Mezclado', value: '< 5%' },
      { label: 'Presión Extrusor', value: '120 Bar' },
      { label: 'Acondicionamiento', value: 'Hasta 95°C' }
    ],
    items: [
      {
        id: 'procesamiento',
        title: 'Manejo y Limpieza de Granos',
        description: 'Limpiadoras neumáticas y mesas densimétricas para granos, semillas y leguminosas.',
        longDescription: 'Limpieza primaria y secundaria que elimina polvo, paja y semillas extrañas. Las mesas densimétricas clasifican por peso específico, garantizando lotes homogéneos.',
        features: ['[icon:Shield] Zarandas vibratorias de doble nivel intercambiables', '[icon:Zap] Aspiradores de polvo integrados con filtros de mangas', '[icon:Cpu] Mesas densimétricas de oscilación regulable por variador'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png',
        tableHeaders: ['Modelo', 'Tipo Limpieza', 'Capacidad', 'Eficiencia Cribado', 'Potencia Ventilador'],
        equipmentTable: [
          { model: 'GC-120', width: 'Limpiadora de Zaranda', capacity: '12 Ton/h', power: '99%', weight: '5.5 kW' },
          { model: 'GC-250', width: 'Limpiadora Neumática Combinada', capacity: '25 Ton/h', power: '99.5%', weight: '11 kW' }
        ]
      },
      {
        id: 'balanceados',
        title: 'Líneas de Alimento Balanceado',
        description: 'Plantas integradas de molienda, dosificación, mezcla y peletizado.',
        longDescription: 'Diseño higiénico para alimentación animal. Incluye acondicionador de vapor de doble paso para cocción y gelatinización de almidones, y matrices de peletizado en aleación templada.',
        features: ['[icon:Shield] Molinos de martillos con cambio rápido de cribas', '[icon:Zap] Mezcladoras de doble eje de paletas de alta velocidad', '[icon:Cpu] Peletizadoras con acondicionador térmico de inyección'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png',
        tableHeaders: ['Modelo', 'Tipo Mezclador/Peletizadora', 'Rendimiento', 'Diámetro Pellet', 'Potencia Motor'],
        equipmentTable: [
          { model: 'AB-500', width: 'Mezcladora de Paletas', capacity: '2.5 Ton/h', power: 'Mezcla homogénea', weight: '22 kW' },
          { model: 'AB-1000', width: 'Peletizadora de Matriz Plana', capacity: '5.0 Ton/h', power: '2 - 12 mm', weight: '110 kW' }
        ]
      },
      {
        id: 'postcosecha',
        title: 'Enfriamiento y Calibración',
        description: 'Sistemas de lavado, encerado, desinfección y clasificación óptica para frutas frescas.',
        longDescription: 'Tratamiento postcosecha de precisión. Sistemas ópticos de clasificación que analizan el color, diámetro y defectos externos del fruto para embalar únicamente producto premium.',
        features: ['[icon:Shield] Lavadoras de cepillos rotativos con desinfección UV', '[icon:Zap] Secadores de túnel por aire caliente controlado', '[icon:Cpu] Clasificación óptica multicanal por cámaras colorimétricas'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
        tableHeaders: ['Modelo', 'Tipo Fruto', 'Capacidad Línea', 'Canales Clasificación', 'Estructura'],
        equipmentTable: [
          { model: 'FC-400', width: 'Línea Cítricos / Manzanas', capacity: '4 Ton/h', power: '2 Canales Ópticos', weight: 'Acero Inoxidable/PE' },
          { model: 'FC-800', width: 'Línea de Selección de Berries', capacity: '8 Ton/h', power: '4 Canales NIR', weight: 'Grado Alimentario' }
        ]
      },
      {
        id: 'automatizacion',
        title: 'Monitoreo de Silos y Carga',
        description: 'Sistemas automáticos de control de temperatura y aireación de silos agrícolas.',
        longDescription: 'Digitalización del almacenamiento de granos. Termometría digital multipunto que monitorea la temperatura en tiempo real y activa automáticamente ventiladores de aireación.',
        features: ['[icon:Shield] Sondas de temperatura colgantes con bus RS485', '[icon:Zap] Sensores de nivel capacitivos y de radar continuo', '[icon:Cpu] Tablero de control con SCADA y alertas vía Telegram/Email'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png',
        tableHeaders: ['Modelo', 'Tipo Sensor/Control', 'Alcance Sondas', 'Protocolo', 'Protección Gabinete'],
        equipmentTable: [
          { model: 'SM-100', width: 'Módulo Termometría Silos', capacity: 'Hasta 30m altura', power: 'Modbus RTU', weight: 'IP66' },
          { model: 'SM-200', width: 'Controlador de Aireación Automático', capacity: 'Hasta 4 silos', power: 'Ethernet / IoT', weight: 'IP66' }
        ]
      }
    ]
  },
  'manufactura': {
    title: 'Salud y Manufactura Avanzada',
    subtitle: 'Precisión estéril y automatización de alta velocidad',
    description: 'Soluciones de envasado, dosificación y ensamblaje bajo normas GMP e higiene estricta. Ofrecemos líneas automatizadas para dispositivos médicos, farmacéutica y conversión de no tejidos.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png',
    stats: [
      { label: 'Clasificación Sala', value: 'Clase 100 / ISO 5' },
      { label: 'Tolerancia Dosif.', value: '±0.1%' },
      { label: 'OEE Promedio', value: '95%' },
      { label: 'Estándar Norma', value: 'GMP / FDA' }
    ],
    items: [
      {
        id: 'medico',
        title: 'Líneas de Dispositivos Médicos',
        description: 'Maquinaria de conformado y empaque de jeringas, mascarillas y apósitos.',
        longDescription: 'Sistemas automáticos de ensamblaje en sala limpia para insumos médicos. Cuentan con desbobinado de alta precisión, soldadura por ultrasonidos y empaque hermético Blíster.',
        features: ['[icon:Shield] Soldadura ultrasónica de alta frecuencia (20/40 kHz)', '[icon:Zap] Empacadoras blíster termoformadoras integradas', '[icon:Cpu] Sistemas de visión artificial Cognex para rechazo de fallas'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png',
        tableHeaders: ['Modelo', 'Dispositivo Fabricado', 'Rendimiento', 'Soldadura', 'Materiales Permitidos'],
        equipmentTable: [
          { model: 'MM-300', width: 'Fabricación Mascarillas Quirúrgicas', capacity: '300 ppm', power: 'Ultrasonido Integrado', weight: 'TNT PP' },
          { model: 'MM-120', width: 'Ensamblaje Jeringas Descartables', capacity: '120 ppm', power: 'Servocontrolado', weight: 'PP / Agujas Metal' }
        ]
      },
      {
        id: 'farma',
        title: 'Dosificación y Llenado (GMP)',
        description: 'Llenadoras automáticas de viales, ampollas, jeringas prellenadas y dosificadoras de polvos.',
        longDescription: 'Diseño estéril libre de rincones ciegos, fabricado en acero inoxidable AISI 316L con pulido espejo. Dosificación de alta precisión mediante bombas peristálticas o de pistón cerámico sin contacto.',
        features: ['[icon:Shield] Bombas dosificadoras peristálticas de cambio rápido', '[icon:Zap] Sistemas de flujo laminar y sellado con nitrógeno líquido', '[icon:Cpu] Conectividad para validación de datos conforme a CFR 21 Parte 11'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
        tableHeaders: ['Modelo', 'Formato Vial/Envase', 'Velocidad Llenado', 'Rango Volumétrico', 'Precisión Dosificación'],
        equipmentTable: [
          { model: 'FM-200', width: 'Llenadora Viales Estéril', capacity: '120 vpm', power: '2 - 100 mL', weight: '±0.1%' },
          { model: 'FM-100', width: 'Dosificadora Polvos Farmacéuticos', capacity: '80 vpm', power: '0.5 - 50 g', weight: '±0.2%' }
        ]
      },
      {
        id: 'conversion',
        title: 'Conversión de No Tejidos',
        description: 'Cortadoras, plegadoras y bobinadoras de telas no tejidas (Spunbond, Meltblown).',
        longDescription: 'Maquinaria diseñada para el corte longitudinal y plegado automático de toallitas húmedas, gasas no tejidas y sábanas quirúrgicas desechables con sistemas de humectación controlada.',
        features: ['[icon:Shield] Corte longitudinal por cuchillas rotativas de alta dureza', '[icon:Zap] Sistemas de dosificación de loción líquida automáticos', '[icon:Cpu] Plegadores mecánicos multiformato (plegado en Z, C, W)'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png',
        tableHeaders: ['Modelo', 'Ancho Útil', 'Diámetro Desbobinador', 'Capacidad Plegado', 'Potencia Instalada'],
        equipmentTable: [
          { model: 'CN-800', width: 'Cortadora Toallitas Húmedas', capacity: '800 mm', power: '1000 mm', weight: '12 kW' },
          { model: 'CN-1200', width: 'Línea Sábanas Quirúrgicas', capacity: '1200 mm', power: '1200 mm', weight: '18.5 kW' }
        ]
      },
      {
        id: 'produccion',
        title: 'Sistemas de Ensamblaje',
        description: 'Líneas robotizadas multieje para embalaje primario y empaque de alta densidad.',
        longDescription: 'Celdas robotizadas e integradas con indexadores rotativos de alta velocidad para montar, atornillar, pegar y probar componentes en tiempo real.',
        features: ['[icon:Shield] Indexadores rotativos de levas mecánicas de gran precisión', '[icon:Zap] Brazos robóticos articulados o tipo SCARA (Stäubli/Fanuc)', '[icon:Cpu] Pruebas integradas de estanqueidad y conductividad eléctrica'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png',
        tableHeaders: ['Modelo', 'Tipo Automatización', 'Ciclo Ensamblaje', 'Número Ejes', 'Interfaz Comunicación'],
        equipmentTable: [
          { model: 'AS-150', width: 'Celda Robótica SCARA', capacity: '1.2 s/pieza', power: '4 Ejes', weight: 'Profinet / OPC UA' },
          { model: 'AS-80', width: 'Línea de Ensamblaje Rotativa', capacity: '0.8 s/pieza', power: 'Indexador 8 Estaciones', weight: 'EtherNet/IP' }
        ]
      }
    ]
  },
  'energia': {
    title: 'Energía y Utilidades Industriales',
    subtitle: 'Sistemas de generación térmica, cogeneración y eficiencia energética',
    description: 'Diseño y fabricación de calderas industriales, plantas de peletizado de biomasa y plantas modulares Waste-to-Energy (WTE) para la valorización energética de residuos.',
    heroImage: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
    stats: [
      { label: 'Eficiencia Caldera', value: '92%' },
      { label: 'Potencia Térmica', value: 'Hasta 20 MW' },
      { label: 'Presión Operativa', value: '25 Bar' },
      { label: 'Combustible', value: 'Biomasa / Gas / RSU' }
    ],
    items: [
      {
        id: 'wte',
        title: 'Valorización Energética (Waste-to-Energy)',
        description: 'Plantas modulares de gasificación e incineración limpia de residuos sólidos.',
        longDescription: 'Sistemas avanzados de combustión controlada que transforman fracciones no reciclables de RSU en energía térmica y eléctrica. Incluye sistemas de depuración de humos multiciclón y lavado húmedo conforme a Directivas Ambientales.',
        features: ['[icon:Shield] Parrilla de combustión reciprocante refrigerada por aire/agua', '[icon:Zap] Calderas de recuperación de vapor acuotubulares de alta presión', '[icon:Cpu] Sistemas de filtrado de gases activos de carbón y cal química'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
        tableHeaders: ['Modelo', 'Tipo Conversión', 'Capacidad Diaria', 'Eficiencia Eléctrica', 'Emisiones Norma'],
        equipmentTable: [
          { model: 'WTE-10', width: 'Planta Incineradora Modular', capacity: '10 Ton/día', power: '24%', weight: 'Directiva 2010/75/UE' },
          { model: 'WTE-50', width: 'Gasificador de Residuos', capacity: '50 Ton/día', power: '28%', weight: 'US EPA CFR 60' }
        ]
      },
      {
        id: 'biomasa',
        title: 'Peletizado de Biomasa',
        description: 'Líneas industriales de trituración, secado y peletizado de madera y subproductos.',
        longDescription: 'Conversión de mermas forestales, cáscaras y pajas en pellets de alta densidad. Las peletizadoras cuentan con anillos de matriz reforzados y sistemas de lubricación automáticos.',
        features: ['[icon:Shield] Secadores de tambor rotativo de triple pase térmico', '[icon:Zap] Molinos refinadores de alta velocidad con deflectores neumáticos', '[icon:Cpu] Peletizadoras de gran robustez con lubricación forzada de rodillos'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png',
        tableHeaders: ['Modelo', 'Tipo Biomasa', 'Rendimiento Peletizado', 'Diámetro Pellet', 'Humedad Entrada'],
        equipmentTable: [
          { model: 'BP-500', width: 'Línea Astillas / Aserrín', capacity: '1.5 Ton/h', power: '6 - 8 mm', weight: '< 12% requerido' },
          { model: 'BP-1000', width: 'Línea Residuos Agrícolas', capacity: '3.0 Ton/h', power: '6 - 10 mm', weight: '< 15% requerido' }
        ]
      },
      {
        id: 'energia-industrial',
        title: 'Cogeneración y Calderas',
        description: 'Calderas pirotubulares y acuotubulares de vapor, agua caliente o fluido térmico.',
        longDescription: 'Equipos de generación de calor industrial de alta eficiencia. Quemadores modulantes de bajo NOx compatibles con gas natural, GLP, biogás y combustibles líquidos.',
        features: ['[icon:Shield] Economizadores integrados para precalentamiento de agua de alimentación', '[icon:Zap] Quemadores industriales autoprogramados de bajo NOx', '[icon:Cpu] Automatización total de purgas y nivel de agua por PLC'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png',
        tableHeaders: ['Modelo', 'Tipo Generación', 'Capacidad Térmica', 'Presión Operación', 'Combustible Principal'],
        equipmentTable: [
          { model: 'CG-3000', width: 'Caldera Vapor Pirotubular', capacity: '3 Ton/h (2.0 MW)', power: '12 Bar', weight: 'Gas / Biogás' },
          { model: 'CG-6000', width: 'Caldera de Fluido Térmico', capacity: '6 Ton/h (4.0 MW)', power: '10 Bar', weight: 'Biomasa / Astillas' }
        ]
      },
      {
        id: 'servicios',
        title: 'Auditorías de Eficiencia',
        description: 'Estudios termográficos, optimización de balances térmicos y recuperación de calor.',
        longDescription: 'Soluciones orientadas a reducir la huella de carbono industrial. Recuperación de calor residual en chimeneas para precalentar aire de combustión o agua de calderas.',
        features: ['[icon:Shield] Termografía infrarroja de alta resolución para aislamientos', '[icon:Zap] Medición de gases de combustión continua y eficiencia química', '[icon:Cpu] Diseño de intercambiadores de calor a medida para gases de escape'],
        image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png',
        tableHeaders: ['Modelo', 'Tipo Servicio', 'Tiempo Ejecución', 'Ahorro Potencial', 'Garantía Retorno'],
        equipmentTable: [
          { model: 'EA-100', width: 'Auditoría Energética Integral', capacity: '3 Semanas', power: 'Hasta 20%', weight: 'Retorno < 18 Meses' },
          { model: 'EA-200', width: 'Ingeniería Recuperador Calor', capacity: '4 Semanas', power: 'Hasta 15%', weight: 'Retorno < 24 Meses' }
        ]
      }
    ]
  },
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

const EditableMedia = ({ 
  media, 
  defaultOpacity = 1, 
  className = '', 
  onUpdate, 
  isEditorMode, 
  label = 'Multimedia', 
  logCMS, 
  aspectClass = 'aspect-[16/10]',
  defaultObjectFit = 'contain',
  defaultBgColor = 'transparent'
}) => {
  const { cmsState } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Resolve media settings
  const isObj = typeof media === 'object' && media !== null;
  const currentUrl = isObj ? media.url : (media || '');
  const currentType = isObj ? (media.type || 'image') : 'image';
  const currentOpacity = isObj ? (media.opacity !== undefined ? media.opacity : defaultOpacity) : defaultOpacity;
  const currentBlur = isObj ? (media.blur !== undefined ? media.blur : 0) : 0;
  const currentBrightness = isObj ? (media.brightness !== undefined ? media.brightness : 100) : 100;
  const currentContrast = isObj ? (media.contrast !== undefined ? media.contrast : 100) : 100;
  const currentScale = isObj ? (media.scale !== undefined ? media.scale : 1) : 1;
  const currentPositionX = isObj ? (media.positionX !== undefined ? media.positionX : 0) : 0;
  const currentPositionY = isObj ? (media.positionY !== undefined ? media.positionY : 0) : 0;
  const currentObjectFit = isObj ? (media.objectFit !== undefined ? media.objectFit : defaultObjectFit) : defaultObjectFit;
  const currentBgColor = isObj ? (media.bgColor !== undefined ? media.bgColor : defaultBgColor) : defaultBgColor;

  // Local state for edits
  const [url, setUrl] = useState(currentUrl);
  const [type, setType] = useState(currentType);
  const [opacity, setOpacity] = useState(currentOpacity);
  const [blur, setBlur] = useState(currentBlur);
  const [brightness, setBrightness] = useState(currentBrightness);
  const [contrast, setContrast] = useState(currentContrast);
  const [scale, setScale] = useState(currentScale);
  const [positionX, setPositionX] = useState(currentPositionX);
  const [positionY, setPositionY] = useState(currentPositionY);
  const [objectFit, setObjectFit] = useState(currentObjectFit);
  const [bgColor, setBgColor] = useState(currentBgColor);

  // Drag & drop state for the modal window
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Backup of original media to allow "Cancel" to restore previous state
  const [backupMedia, setBackupMedia] = useState(null);
  const [modalTab, setModalTab] = useState('layout'); // 'layout' or 'filters'

  // Sync state if media changes externally
  useEffect(() => {
    setUrl(currentUrl);
    setType(currentType);
    setOpacity(currentOpacity);
    setBlur(currentBlur);
    setBrightness(currentBrightness);
    setContrast(currentContrast);
    setScale(currentScale);
    setPositionX(currentPositionX);
    setPositionY(currentPositionY);
    setObjectFit(currentObjectFit);
    setBgColor(currentBgColor);
  }, [media]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCancel();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, backupMedia, url, type, opacity, blur, brightness, contrast, scale, positionX, positionY, objectFit, bgColor]);

  // Drag and drop event listeners
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setDragPos({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleMouseDown = (e) => {
    const header = e.target.closest('.modal-drag-header');
    if (!header) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - dragPos.x,
      y: e.clientY - dragPos.y
    });
  };

  const handleOpen = () => {
    // Save backup of original settings
    setBackupMedia({
      url: currentUrl,
      type: currentType,
      opacity: currentOpacity,
      blur: currentBlur,
      brightness: currentBrightness,
      contrast: currentContrast,
      scale: currentScale,
      positionX: currentPositionX,
      positionY: currentPositionY,
      objectFit: currentObjectFit,
      bgColor: currentBgColor
    });
    setDragPos({ x: 0, y: 0 }); // reset drag pos
    setIsOpen(true);
  };

  const updateMediaProps = (propsObj) => {
    let nextUrl = url;
    let nextType = type;
    let nextOpacity = opacity;
    let nextBlur = blur;
    let nextBrightness = brightness;
    let nextContrast = contrast;
    let nextScale = scale;
    let nextPositionX = positionX;
    let nextPositionY = positionY;
    let nextObjectFit = objectFit;
    let nextBgColor = bgColor;

    if (propsObj.url !== undefined) { setUrl(propsObj.url); nextUrl = propsObj.url; }
    if (propsObj.type !== undefined) { setType(propsObj.type); nextType = propsObj.type; }
    if (propsObj.opacity !== undefined) { setOpacity(propsObj.opacity); nextOpacity = propsObj.opacity; }
    if (propsObj.blur !== undefined) { setBlur(propsObj.blur); nextBlur = propsObj.blur; }
    if (propsObj.brightness !== undefined) { setBrightness(propsObj.brightness); nextBrightness = propsObj.brightness; }
    if (propsObj.contrast !== undefined) { setContrast(propsObj.contrast); nextContrast = propsObj.contrast; }
    if (propsObj.scale !== undefined) { setScale(propsObj.scale); nextScale = propsObj.scale; }
    if (propsObj.positionX !== undefined) { setPositionX(propsObj.positionX); nextPositionX = propsObj.positionX; }
    if (propsObj.positionY !== undefined) { setPositionY(propsObj.positionY); nextPositionY = propsObj.positionY; }
    if (propsObj.objectFit !== undefined) { setObjectFit(propsObj.objectFit); nextObjectFit = propsObj.objectFit; }
    if (propsObj.bgColor !== undefined) { setBgColor(propsObj.bgColor); nextBgColor = propsObj.bgColor; }

    onUpdate({
      url: nextUrl,
      type: nextType,
      opacity: parseFloat(nextOpacity),
      blur: parseFloat(nextBlur),
      brightness: parseInt(nextBrightness),
      contrast: parseInt(nextContrast),
      scale: parseFloat(nextScale),
      positionX: parseInt(nextPositionX),
      positionY: parseInt(nextPositionY),
      objectFit: nextObjectFit,
      bgColor: nextBgColor
    });
  };

  const updateMediaProp = (key, val) => {
    updateMediaProps({ [key]: val });
  };

  // Helper to robustly check if media is video, handling URLs with query parameters/tokens
  const isVideoUrl = (mediaUrl, mediaType) => {
    if (mediaType === 'video') return true;
    if (!mediaUrl) return false;
    const cleanUrl = mediaUrl.split('?')[0].toLowerCase();
    return cleanUrl.endsWith('.mp4') || 
           cleanUrl.endsWith('.webm') || 
           cleanUrl.endsWith('.ogg') || 
           cleanUrl.endsWith('.mov') || 
           cleanUrl.includes('/video/');
  };

  const [isDragOver, setIsDragOver] = useState(false);

  const processFile = async (file) => {
    if (!file) return;
    const startMsg = `Iniciado: ${file.name} (${(file.size/1024).toFixed(1)} KB)`;
    if (logCMS) logCMS(startMsg, "info");
    try {
      setIsUploading(true);
      if (logCMS) logCMS("⏳ Subiendo a Supabase Storage...", "info");
      const uploadedUrl = await uploadFile(file, "media");
      if (logCMS) logCMS(`✅ Subido con éxito. URL: ${uploadedUrl}`, "success");
      
      // Auto-detect type including webm
      const cleanName = file.name.split('?')[0].toLowerCase();
      const isVideoFile = file.type.startsWith('video/') || 
                          cleanName.endsWith('.mp4') || 
                          cleanName.endsWith('.webm') ||
                          cleanName.endsWith('.ogg') ||
                          cleanName.endsWith('.mov');
      const mediaType = isVideoFile ? 'video' : 'image';

      // Actualizar URL y Tipo atómicamente, y resetear las transformaciones para que no se hereden recortes anteriores
      updateMediaProps({
        url: uploadedUrl,
        type: mediaType,
        scale: 1,
        positionX: 0,
        positionY: 0,
        objectFit: defaultObjectFit,
        bgColor: defaultBgColor,
        opacity: defaultOpacity,
        blur: 0,
        brightness: 100,
        contrast: 100
      });
      if (logCMS) logCMS(`➡️ Tipo establecido como: ${mediaType}`, "info");
    } catch (err) {
      const errMsg = err.message || err.error_description || JSON.stringify(err);
      if (logCMS) logCMS(`❌ Falló subida: ${errMsg}`, "error");
      alert('Error al subir el archivo: ' + errMsg);
    } finally {
      setIsUploading(false);
      if (logCMS) logCMS("🏁 Proceso de subida finalizado.", "info");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    await processFile(file);
    e.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (isEditorMode) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!isEditorMode) return;
    
    const file = e.dataTransfer.files[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleSave = () => {
    // Save is already done in real-time, just close
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (backupMedia) {
      // Revert in real-time to the backup copy
      onUpdate(backupMedia);
      // Sync state variables back to original values
      setUrl(backupMedia.url);
      setType(backupMedia.type);
      setOpacity(backupMedia.opacity);
      setBlur(backupMedia.blur);
      setBrightness(backupMedia.brightness);
      setContrast(backupMedia.contrast);
      setScale(backupMedia.scale);
      setPositionX(backupMedia.positionX);
      setPositionY(backupMedia.positionY);
      setObjectFit(backupMedia.objectFit);
      setBgColor(backupMedia.bgColor);
    }
    setIsOpen(false);
  };

  // Helper to render current live preview inside modal
  const renderLivePreview = () => {
    const disableFilters = cmsState?.settings?.disableImageFilters ?? false;
    const style = {
      opacity: disableFilters ? 1 : opacity,
      filter: disableFilters ? 'none' : `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%)`,
      objectFit: objectFit,
      transform: `translate(${positionX}%, ${positionY}%) scale(${scale})`,
      transition: 'transform 0.15s ease-out',
      backgroundColor: bgColor || 'transparent'
    };

    if (isVideoUrl(url, type)) {
      return (
        <video 
          key={url}
          src={url} 
          className="w-full h-full object-cover" 
          autoPlay 
          loop 
          muted 
          playsInline 
          controls={false}
          preload="auto"
          style={style} 
        />
      );
    }
    return <img src={getOptimizedImageUrl(url, 400) || 'https://via.placeholder.com/400x250'} className="w-full h-full" style={style} alt="Preview" />;
  };

  // Render the default view element
  const renderDefaultElement = () => {
    const disableFilters = cmsState?.settings?.disableImageFilters ?? false;
    const style = {
      opacity: disableFilters ? 1 : currentOpacity,
      filter: disableFilters ? 'none' : `blur(${currentBlur}px) brightness(${currentBrightness}%) contrast(${currentContrast}%)`,
      objectFit: currentObjectFit,
      transform: `translate(${currentPositionX}%, ${currentPositionY}%) scale(${currentScale})`,
      backgroundColor: currentBgColor || 'transparent'
    };

    // Separate hover / transition classes from functional layout classes to prevent scale transitions from overriding custom crop adjustments
    const classes = (className || '').split(' ');
    const hoverClasses = classes.filter(c => c.includes('hover:') || c.includes('transition') || c.includes('duration') || c.includes('ease')).join(' ');
    const layoutClasses = classes.filter(c => !c.includes('hover:') && !c.includes('transition') && !c.includes('duration') && !c.includes('ease')).join(' ');

    const mediaElement = isVideoUrl(currentUrl, currentType) ? (
      <video 
        key={currentUrl}
        src={currentUrl} 
        className={`${layoutClasses} origin-center`} 
        autoPlay 
        loop 
        muted 
        playsInline 
        controls={false}
        preload="auto"
        style={style} 
      />
    ) : (
      <img src={getOptimizedImageUrl(currentUrl)} className={`${layoutClasses} origin-center`} style={style} alt={label} loading="lazy" />
    );

    if (hoverClasses) {
      return (
        <div className={`w-full h-full overflow-hidden ${hoverClasses}`}>
          {mediaElement}
        </div>
      );
    }
    return mediaElement;
  };

  if (!isEditorMode) {
    return renderDefaultElement();
  }

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileUpload} 
        accept="image/*,video/*,.png,.jpg,.jpeg,.webp,.svg,.gif,.bmp,.tiff,.heic,.heif,.jfif,.mp4,.webm,.ogg,.mov,.avi,.PNG,.JPG,.JPEG,.WEBP,.SVG,.GIF,.BMP,.TIFF,.HEIC,.HEIF,.JFIF,.MP4,.WEBM,.OGG,.MOV,.AVI" 
        className="hidden" 
      />
      <div 
        onDoubleClick={handleOpen}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative group cursor-pointer overflow-hidden rounded-[inherit] w-full h-full border-2 transition-all duration-300 ${
          isDragOver ? 'border-[#FFD700] bg-[#FFD700]/20 scale-[1.02]' : 'border-transparent'
        }`}
      >
        {renderDefaultElement()}
        
        {/* Subtle Hover overlay */}
        <div className={`absolute inset-0 bg-black/50 transition-opacity flex flex-col items-center justify-center gap-1 text-white text-xs select-none z-30 font-semibold rounded-[inherit] ${
          isDragOver ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <Upload size={20} className="text-[#FFD700] animate-bounce" />
          <span>{isDragOver ? 'Soltar para subir' : 'Arrastra un archivo aquí / Doble clic'}</span>
        </div>
      </div>

      {isOpen && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-transparent pointer-events-none">
          <div 
            style={{
              transform: `translate(${dragPos.x}px, ${dragPos.y}px)`,
            }}
            className="bg-[#0A0F15]/95 border border-white/15 p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-[440px] max-w-[95%] backdrop-blur-xl flex flex-col gap-3 text-white text-left font-['Poppins'] pointer-events-auto select-none transition-all duration-75"
          >
            {/* Drag Handle Header */}
            <div 
              onMouseDown={handleMouseDown}
              className="modal-drag-header flex justify-between items-center border-b border-white/5 pb-2 cursor-move hover:bg-white/5 p-1.5 -m-1.5 rounded-lg transition-colors select-none"
              title="Haz clic y arrastra para mover este cuadro de diálogo"
            >
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-0.5 opacity-40">
                  <div className="w-3 h-[1.5px] bg-white"></div>
                  <div className="w-3 h-[1.5px] bg-white"></div>
                  <div className="w-3 h-[1.5px] bg-white"></div>
                </div>
                <h3 className="text-[10px] font-black text-[#FFD700] uppercase tracking-wider">{label}</h3>
              </div>
              <button 
                onClick={handleCancel} 
                className="text-white/40 hover:text-white transition-colors text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/5 pointer-events-auto"
              >
                ESC / Cerrar
              </button>
            </div>

            {/* Preview Box */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full ${aspectClass} bg-black/40 rounded-lg overflow-hidden border flex items-center justify-center relative transition-all duration-300 ${
                isDragOver ? 'border-[#FFD700] bg-[#FFD700]/10 scale-[1.01]' : 'border-white/5'
              }`}
            >
              {url ? renderLivePreview() : <span className="text-white/30 text-[10px]">Sin archivo multimedia</span>}
              
              {isDragOver && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm border-2 border-dashed border-[#FFD700] rounded-[inherit] flex flex-col items-center justify-center gap-2 z-50 text-[#FFD700] font-bold text-xs pointer-events-none animate-pulse">
                  <Upload size={20} className="animate-bounce" />
                  <span>Soltar para subir archivo</span>
                </div>
              )}

              {isUploading && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-[10px] gap-2 z-50">
                  <RefreshCw size={12} className="animate-spin text-[#FFD700]" />
                  <span>Subiendo archivo...</span>
                </div>
              )}
            </div>

            {/* URL y Tipo en una sola fila compacta */}
            <div className="grid grid-cols-12 gap-3 items-end">
              {/* URL */}
              <div className="col-span-8 flex flex-col gap-1">
                <label className="text-[9px] uppercase font-black text-white/50 tracking-wider">URL del archivo</label>
                <div className="flex gap-1.5">
                  <input 
                    type="text" 
                    value={url} 
                    onChange={(e) => updateMediaProp('url', e.target.value)} 
                    placeholder="https://..." 
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#FFD700] transition-colors"
                  />
                   <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#FFD700] hover:bg-[#FFC000] text-black font-bold text-[10px] px-2.5 py-1 rounded-lg cursor-pointer flex items-center justify-center gap-1 transition-all"
                  >
                    <Upload size={12} />
                    <span>Subir</span>
                  </button>
                </div>
              </div>

              {/* Tipo de archivo */}
              <div className="col-span-4 flex flex-col gap-1">
                <label className="text-[9px] uppercase font-black text-white/50 tracking-wider">Tipo</label>
                <div className="grid grid-cols-2 gap-1 bg-white/5 p-0.5 rounded-lg border border-white/5 h-[28px] items-center">
                  <button 
                    onClick={() => updateMediaProp('type', 'image')} 
                    className={`py-0.5 text-[10px] font-bold rounded transition-all ${type === 'image' ? 'bg-[#FFD700] text-black' : 'text-white/60 hover:text-white'}`}
                  >
                    Img
                  </button>
                  <button 
                    onClick={() => updateMediaProp('type', 'video')} 
                    className={`py-0.5 text-[10px] font-bold rounded transition-all ${type === 'video' ? 'bg-[#FFD700] text-black' : 'text-white/60 hover:text-white'}`}
                  >
                    Vid
                  </button>
                </div>
              </div>
            </div>

            {/* Selector de Pestañas internas del Modal */}
            <div className="grid grid-cols-2 gap-1 bg-white/5 p-0.5 rounded-lg border border-white/5 mt-1">
              <button 
                onClick={() => setModalTab('layout')} 
                className={`py-1 text-[10px] font-black uppercase rounded transition-all ${modalTab === 'layout' ? 'bg-[#FFD700] text-black' : 'text-white/60 hover:text-white'}`}
              >
                Escala y Posición
              </button>
              <button 
                onClick={() => setModalTab('filters')} 
                className={`py-1 text-[10px] font-black uppercase rounded transition-all ${modalTab === 'filters' ? 'bg-[#FFD700] text-black' : 'text-white/60 hover:text-white'}`}
              >
                Filtros de Color
              </button>
            </div>

            {/* Pestaña: Escala y Posición */}
            {modalTab === 'layout' && (
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase text-[#FFD700] tracking-wider block">Ajustes de Vista</span>
                  <button
                    onClick={() => {
                      updateMediaProps({
                        scale: 1,
                        positionX: 0,
                        positionY: 0,
                        objectFit: defaultObjectFit,
                        bgColor: defaultBgColor
                      });
                    }}
                    className="bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase transition-all"
                  >
                    Resetear
                  </button>
                </div>
                
                {/* Object Fit */}
                <div className="flex flex-col gap-0.5">
                  <label className="text-[8px] uppercase font-bold text-white/40 tracking-wider">Ajuste de Imagen (Object Fit)</label>
                  <div className="grid grid-cols-2 gap-1 bg-white/5 p-0.5 rounded-lg border border-white/5">
                    <button 
                      onClick={() => {
                        updateMediaProps({
                          objectFit: 'cover',
                          scale: 1,
                          positionX: 0,
                          positionY: 0
                        });
                      }}
                      className={`py-0.5 text-[9px] font-bold rounded transition-all ${objectFit === 'cover' ? 'bg-[#FFD700] text-black' : 'text-white/60 hover:text-white'}`}
                    >
                      Rellenar (Cover)
                    </button>
                    <button 
                      onClick={() => {
                        updateMediaProps({
                          objectFit: 'contain',
                          scale: 1,
                          positionX: 0,
                          positionY: 0
                        });
                      }}
                      className={`py-0.5 text-[9px] font-bold rounded transition-all ${objectFit === 'contain' ? 'bg-[#FFD700] text-black' : 'text-white/60 hover:text-white'}`}
                    >
                      Ajustar (Contain)
                    </button>
                  </div>
                </div>

                {/* Color de Fondo */}
                <div className="flex flex-col gap-0.5">
                  <label className="text-[8px] uppercase font-bold text-white/40 tracking-wider">Color de Fondo (Background Color)</label>
                  <div className="grid grid-cols-3 gap-1 bg-white/5 p-0.5 rounded-lg border border-white/5">
                    <button 
                      onClick={() => updateMediaProp('bgColor', 'transparent')}
                      className={`py-0.5 text-[9px] font-bold rounded transition-all ${(!bgColor || bgColor === 'transparent') ? 'bg-[#FFD700] text-black' : 'text-white/60 hover:text-white'}`}
                    >
                      Transp.
                    </button>
                    <button 
                      onClick={() => updateMediaProp('bgColor', 'white')}
                      className={`py-0.5 text-[9px] font-bold rounded transition-all ${bgColor === 'white' ? 'bg-[#FFD700] text-black' : 'text-white/60 hover:text-white'}`}
                    >
                      Blanco
                    </button>
                    <button 
                      onClick={() => updateMediaProp('bgColor', 'black')}
                      className={`py-0.5 text-[9px] font-bold rounded transition-all ${bgColor === 'black' ? 'bg-[#FFD700] text-black' : 'text-white/60 hover:text-white'}`}
                    >
                      Negro
                    </button>
                  </div>
                </div>

                {/* Scale */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                    <span>Zoom / Escala</span>
                    <span className="text-[#FFD700]">{Math.round(scale * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="3.0" 
                    step="0.05" 
                    value={scale} 
                    onChange={(e) => updateMediaProp('scale', parseFloat(e.target.value))} 
                    className="w-full accent-[#FFD700] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none"
                  />
                </div>

                {/* Grid X e Y */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                      <span>Mover X</span>
                      <span className="text-[#FFD700]">{positionX}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="-100" 
                      max="100" 
                      step="1" 
                      value={positionX} 
                      onChange={(e) => updateMediaProp('positionX', parseInt(e.target.value))} 
                      className="w-full accent-[#FFD700] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none"
                    />
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                      <span>Mover Y</span>
                      <span className="text-[#FFD700]">{positionY}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="-100" 
                      max="100" 
                      step="1" 
                      value={positionY} 
                      onChange={(e) => updateMediaProp('positionY', parseInt(e.target.value))} 
                      className="w-full accent-[#FFD700] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Pestaña: Filtros de Color */}
            {modalTab === 'filters' && (
              <div className="space-y-2 pt-1">
                {/* Opacity */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                    <span>Transparencia (Opacidad)</span>
                    <span className="text-[#FFD700]">{Math.round((1 - opacity) * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.05" 
                    max="1" 
                    step="0.05" 
                    value={opacity} 
                    onChange={(e) => updateMediaProp('opacity', parseFloat(e.target.value))} 
                    className="w-full accent-[#FFD700] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none"
                  />
                </div>

                {/* Blur */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                    <span>Nitidez / Difuminado (Blur)</span>
                    <span className="text-[#FFD700]">{blur}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="15" 
                    step="0.5" 
                    value={blur} 
                    onChange={(e) => updateMediaProp('blur', parseFloat(e.target.value))} 
                    className="w-full accent-[#FFD700] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none"
                  />
                </div>

                {/* Brightness */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                    <span>Brillo</span>
                    <span className="text-[#FFD700]">{brightness}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="180" 
                    step="5" 
                    value={brightness} 
                    onChange={(e) => updateMediaProp('brightness', parseInt(e.target.value))} 
                    className="w-full accent-[#FFD700] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none"
                  />
                </div>

                {/* Contrast */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[8px] uppercase font-black text-white/50 tracking-wider">
                    <span>Contraste</span>
                    <span className="text-[#FFD700]">{contrast}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="200" 
                    step="5" 
                    value={contrast} 
                    onChange={(e) => updateMediaProp('contrast', parseInt(e.target.value))} 
                    className="w-full accent-[#FFD700] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none"
                  />
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5 mt-1">
              <button 
                onClick={handleCancel} 
                className="py-1.5 text-xs font-bold bg-white/5 hover:bg-white/10 rounded-lg transition-all pointer-events-auto"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave} 
                className="py-1.5 text-xs font-bold bg-[#FFD700] hover:bg-[#FFC000] text-black rounded-lg transition-all shadow-[0_0_20px_rgba(255,215,0,0.15)] pointer-events-auto"
              >
                Aceptar
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
  const { sector: rawSector } = useParams();
  
  // Normalizar sector
  const normalizeSector = (sec) => {
    if (!sec) return 'reciclaje';
    const s = sec.toLowerCase();
    if (s === 'reciclaje-y-plasticos' || s === 'reciclaje') return 'reciclaje';
    if (s === 'alimentos-y-bebidas' || s === 'alimentos') return 'alimentos';
    if (s === 'packaging-y-conversion' || s === 'packaging') return 'packaging';
    if (s === 'construccion-e-infraestructura' || s === 'construccion') return 'construccion';
    if (s === 'agroindustria-y-procesamiento' || s === 'agroindustria') return 'agroindustria';
    if (s === 'salud-y-manufactura' || s === 'manufactura') return 'manufactura';
    if (s === 'energia-y-utilidades' || s === 'energia') return 'energia';
    return s;
  };
  
  const sector = normalizeSector(rawSector);

  // Resolver ruta de maquinaria de forma segura previniendo 404
  const getMachineLink = (modelStr) => {
    if (!modelStr) return '/';
    const cleanModel = modelStr.trim().toLowerCase();
    const withSector = `${sector}-${cleanModel}`;
    if (machineryDataMap && machineryDataMap[withSector]) {
      return `/maquinaria/${withSector}`;
    }
    if (sector === 'reciclaje') {
      const withAlt = `reciclaje-y-plasticos-${cleanModel}`;
      if (machineryDataMap && machineryDataMap[withAlt]) {
        return `/maquinaria/${withAlt}`;
      }
    }
    if (machineryDataMap && machineryDataMap[cleanModel]) {
      return `/maquinaria/${cleanModel}`;
    }
    const keys = Object.keys(machineryDataMap || {});
    const partialMatch = keys.find(key => key.endsWith(`-${cleanModel}`) || key === cleanModel);
    if (partialMatch) {
      return `/maquinaria/${partialMatch}`;
    }
    return `/maquinaria/${sector === 'alimentos' ? 'alimentos-' + cleanModel : cleanModel}`;
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { cmsState, updatePages, isEditorMode, syncToCloud } = useCMS();
  
  const combinedData = { ...sectorsData, ...technologyDataMap };
  const staticData = combinedData[sector];
  
  // Find if this industry page exists in CMS
  const pageId = `industria-${sector}`;
  const industryPage = cmsState?.pages?.find(p => p.id === pageId);
  
  // Local active states for editor
  const [activeTab, setActiveTab] = useState('hero');
  const [editingItemIdx, setEditingItemIdx] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [cmsLogs, setCmsLogs] = useState([]);
  const logCMS = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setCmsLogs(prev => [...prev.slice(-15), { id: Date.now() + Math.random(), text: message, type, time: timestamp }]);
    if (type === 'error') console.error(`[CMS] ${message}`);
    else console.log(`[CMS] ${message}`);
  };
  const [panelPosition, setPanelPosition] = useState('right'); // 'right' or 'left'
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCmsDebugMinimized, setIsCmsDebugMinimized] = useState(false);
  
  const [position, setPosition] = useState({ x: 900, y: 112 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialPosRef = useRef({ x: 0, y: 0 });
  const lastScrolledHashRef = useRef('');

  useEffect(() => {
    setPosition({ x: window.innerWidth - 410, y: 112 });
  }, []);

  useEffect(() => {
    const handleAutoSavedEvent = (e) => {
      const { success, error } = e.detail;
      if (success) {
        logCMS("☁️ [Autoguardado] Sincronización en la nube exitosa.", "success");
      } else {
        logCMS(`❌ [Autoguardado] Falló la sincronización: ${error}`, "error");
      }
    };

    window.addEventListener('cmsAutoSaved', handleAutoSavedEvent);
    return () => {
      window.removeEventListener('cmsAutoSaved', handleAutoSavedEvent);
    };
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
  const instalacionesImageInputRef = useRef(null);

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

  // Autoclean compostaje & normalize IDs if they exist in the saved CMS data for Alimentos
  useEffect(() => {
    if (sector === 'alimentos' && industryPage?.modules?.[0]?.data?.items) {
      const items = industryPage.modules[0].data.items;
      const hasCompostaje = items.some(item => item.id === 'compostaje');
      let needsIdUpdate = false;
      const updatedItems = items
        .filter(item => item.id !== 'compostaje')
        .map(item => {
          let newId = item.id;
          if (item.id === 'lavado-y-pelado') { newId = 'lavado'; needsIdUpdate = true; }
          else if (item.id === 'produccion-de-alimentos') { newId = 'produccion'; needsIdUpdate = true; }
          else if (item.id === 'empaquetado-y-llenado') { newId = 'empaquetado'; needsIdUpdate = true; }
          else if (item.id === 'sistemas-de-separacion') { newId = 'separadoras'; needsIdUpdate = true; }
          return { ...item, id: newId };
        });

      if (hasCompostaje || needsIdUpdate) {
        const updatedPage = {
          ...industryPage,
          modules: [
            {
              ...industryPage.modules[0],
              data: {
                ...industryPage.modules[0].data,
                title: industryPage.modules[0].data.title === 'Industria de Alimentos y Compostaje' ? 'Industria de Alimentos y Bebidas' : industryPage.modules[0].data.title,
                items: updatedItems
              }
            }
          ]
        };
        const otherPages = cmsState.pages.filter(p => p.id !== pageId);
        updatePages([...otherPages, updatedPage]);
      }
    }
  }, [sector, industryPage, pageId, cmsState.pages, updatePages]);

  // Data to render
  let data = industryPage?.modules?.[0]?.data || staticData;
  if (sector === 'alimentos' && data && data.items) {
    const cleanedItems = data.items
      .filter(item => item.id !== 'compostaje')
      .map(item => {
        let newId = item.id;
        if (item.id === 'lavado-y-pelado') newId = 'lavado';
        else if (item.id === 'produccion-de-alimentos') newId = 'produccion';
        else if (item.id === 'empaquetado-y-llenado') newId = 'empaquetado';
        else if (item.id === 'sistemas-de-separacion') newId = 'separadoras';
        return { ...item, id: newId };
      });
    data = {
      ...data,
      items: cleanedItems
    };
  }

  const sectorColors = {
    'automatizacion': {
      bg: 'bg-[#0EA5E9]/10',
      border: 'border-[#0EA5E9]/30',
      borderActive: 'border-[#0EA5E9]/50',
      text: 'text-[#0EA5E9]',
      textHover: 'hover:text-[#0EA5E9]',
      accent: '#0EA5E9',
      glow: 'rgba(14,165,233,0.2)'
    },
    'robotica': {
      bg: 'bg-[#F97316]/10',
      border: 'border-[#F97316]/30',
      borderActive: 'border-[#F97316]/50',
      text: 'text-[#F97316]',
      textHover: 'hover:text-[#F97316]',
      accent: '#F97316',
      glow: 'rgba(249,115,22,0.2)'
    },
    'vision': {
      bg: 'bg-[#8B5CF6]/10',
      border: 'border-[#8B5CF6]/30',
      borderActive: 'border-[#8B5CF6]/50',
      text: 'text-[#8B5CF6]',
      textHover: 'hover:text-[#8B5CF6]',
      accent: '#8B5CF6',
      glow: 'rgba(139,92,246,0.2)'
    },
    'mecanica': {
      bg: 'bg-[#10B981]/10',
      border: 'border-[#10B981]/30',
      borderActive: 'border-[#10B981]/50',
      text: 'text-[#10B981]',
      textHover: 'hover:text-[#10B981]',
      accent: '#10B981',
      glow: 'rgba(16,185,129,0.2)'
    },
    'industria40': {
      bg: 'bg-[#3B82F6]/10',
      border: 'border-[#3B82F6]/30',
      borderActive: 'border-[#3B82F6]/50',
      text: 'text-[#3B82F6]',
      textHover: 'hover:text-[#3B82F6]',
      accent: '#3B82F6',
      glow: 'rgba(59,130,246,0.2)'
    },
    'ia': {
      bg: 'bg-[#EAB308]/10',
      border: 'border-[#EAB308]/30',
      borderActive: 'border-[#EAB308]/50',
      text: 'text-[#EAB308]',
      textHover: 'hover:text-[#EAB308]',
      accent: '#EAB308',
      glow: 'rgba(234,179,8,0.2)'
    },
    'alimentos': {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      borderActive: 'border-orange-500/50',
      text: 'text-[#F97316]',
      textHover: 'hover:text-[#F97316]',
      accent: '#F97316',
      glow: 'rgba(249,115,22,0.2)'
    },
    'reciclaje': {
      bg: 'bg-lime-500/10',
      border: 'border-lime-500/30',
      borderActive: 'border-lime-500/50',
      text: 'text-[#84CC16]',
      textHover: 'hover:text-[#84CC16]',
      accent: '#84CC16',
      glow: 'rgba(132,204,22,0.2)'
    },
    'reciclaje-y-plasticos': {
      bg: 'bg-lime-500/10',
      border: 'border-lime-500/30',
      borderActive: 'border-lime-500/50',
      text: 'text-[#84CC16]',
      textHover: 'hover:text-[#84CC16]',
      accent: '#84CC16',
      glow: 'rgba(132,204,22,0.2)'
    },
    'packaging': {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      borderActive: 'border-yellow-500/50',
      text: 'text-[#FFD700]',
      textHover: 'hover:text-[#FFD700]',
      accent: '#FFD700',
      glow: 'rgba(255,215,0,0.2)'
    },
    'construccion': {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      borderActive: 'border-cyan-500/50',
      text: 'text-[#06B6D4]',
      textHover: 'hover:text-[#06B6D4]',
      accent: '#06B6D4',
      glow: 'rgba(6,182,212,0.2)'
    },
    'agroindustria': {
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      borderActive: 'border-violet-500/50',
      text: 'text-[#8B5CF6]',
      textHover: 'hover:text-[#8B5CF6]',
      accent: '#8B5CF6',
      glow: 'rgba(139,92,246,0.2)'
    },
    'manufactura': {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      borderActive: 'border-red-500/50',
      text: 'text-[#EF4444]',
      textHover: 'hover:text-[#EF4444]',
      accent: '#EF4444',
      glow: 'rgba(239,68,68,0.2)'
    },
    'energia': {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      borderActive: 'border-blue-500/50',
      text: 'text-[#3B82F6]',
      textHover: 'hover:text-[#3B82F6]',
      accent: '#3B82F6',
      glow: 'rgba(59,130,246,0.2)'
    },
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
      bg: 'bg-lime-500/10',
      border: 'border-lime-500/30',
      borderActive: 'border-lime-500/50',
      text: 'text-[#84CC16]',
      textHover: 'hover:text-[#84CC16]',
      accent: '#84CC16',
      glow: 'rgba(132,204,22,0.2)'
    }
  };
  const colorScheme = sectorColors[sector] || sectorColors['default'];

  const [activeItem, setActiveItem] = useState('');
  const [activeMediaTabs, setActiveMediaTabs] = useState({});
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  // Lógica para rotar las pestañas automáticamente según el intervalo configurado
  useEffect(() => {
    const intervals = [];

    if (data && data.items && data.items.length > 0) {
      data.items.forEach((item, index) => {
        const seconds = parseInt(item.mediaRotationInterval || 0);
        if (seconds > 0) {
          const intervalId = setInterval(() => {
            setActiveMediaTabs(prev => {
              const currentTab = prev[index] || 'tab1';
              let nextTab = 'tab1';
              
              if (currentTab === 'tab1') {
                if (item.image2) nextTab = 'tab2';
                else if (item.video) nextTab = 'tab3';
              } else if (currentTab === 'tab2') {
                if (item.video) nextTab = 'tab3';
                else nextTab = 'tab1';
              } else {
                nextTab = 'tab1';
              }

              return {
                ...prev,
                [index]: nextTab
              };
            });
          }, seconds * 1000);
          intervals.push(intervalId);
        }
      });
    }

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [data, isEditorMode]);

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
      const currentHash = location.hash;
      if (lastScrolledHashRef.current === currentHash) return;

      const id = currentHash.substring(1);
      
      // Esperar 300ms a que el layout de la página y la animación de Framer Motion se estabilicen
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          lastScrolledHashRef.current = currentHash;
          const headerOffset = (cmsState?.settings?.headerHeight || 76) + 165;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);

      return () => clearTimeout(timer);
    } else {
      lastScrolledHashRef.current = '';
      window.scrollTo(0, 0);
    }
  }, [sector, location.hash, data]);

  useEffect(() => {
    if (activeItem && data?.items) {
      const idx = data.items.findIndex(item => item.id === activeItem);
      if (idx !== -1) {
        setEditingItemIdx(idx);
      }
    }
  }, [activeItem, data?.items]);

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
    const currentItem = { ...updatedItems[index] };

    // Inicializar images si no existe
    let currentImages = [];
    if (Array.isArray(currentItem.images)) {
      currentImages = [...currentItem.images];
    } else {
      // Migración del esquema antiguo al array images
      currentImages = [
        currentItem.image || '',
        currentItem.image2 || ''
      ];
    }

    if (key === 'image') {
      currentImages[0] = value;
      currentItem.images = currentImages;
      currentItem.image = value;
    } else if (key === 'image2') {
      currentImages[1] = value;
      currentItem.images = currentImages;
      currentItem.image2 = value;
    } else {
      currentItem[key] = value;
    }

    updatedItems[index] = currentItem;
    handleUpdate('items', updatedItems);
  };

  const handleAddItem = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      title: 'Nueva Especialidad',
      description: 'Breve descripción de la nueva especialidad.',
      longDescription: 'Descripción técnica detallada y de alto rendimiento.',
      features: ['Especificación clave 1', 'Especificación clave 2'],
      image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png', // default placeholder
      images: ['https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png', '']
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
      logCMS(`Iniciada subida de Hero: ${file.name}`, "info");
      try {
        setIsUploading(true);
        const url = await uploadFile(file, "media");
        logCMS(`✅ Hero subido con éxito: ${url}`, "success");
        handleUpdate('heroImage', url);
      } catch (err) {
        const errMsg = err.message || err.error_description || JSON.stringify(err);
        logCMS(`❌ Error Hero: ${errMsg}`, "error");
        alert('No se pudo subir la imagen: ' + errMsg);
      } finally {
        setIsUploading(false);
        e.target.value = '';
      }
    }
  };

  const handleInstalacionesImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      logCMS(`Iniciada subida de Instalaciones: ${file.name}`, "info");
      try {
        setIsUploading(true);
        const url = await uploadFile(file, "media");
        logCMS(`✅ Imagen de Instalaciones subida con éxito: ${url}`, "success");
        handleUpdate('instalacionesImage', url);
      } catch (err) {
        const errMsg = err.message || err.error_description || JSON.stringify(err);
        logCMS(`❌ Error Instalaciones: ${errMsg}`, "error");
        alert('No se pudo subir la imagen: ' + errMsg);
      } finally {
        setIsUploading(false);
        e.target.value = '';
      }
    }
  };

  const handleItemImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      logCMS(`Iniciada subida de Item ${index + 1}: ${file.name}`, "info");
      try {
        setIsUploading(true);
        const url = await uploadFile(file, "media");
        logCMS(`✅ Item ${index + 1} subido con éxito: ${url}`, "success");
        handleItemUpdate(index, 'image', url);
      } catch (err) {
        const errMsg = err.message || err.error_description || JSON.stringify(err);
        logCMS(`❌ Error Item ${index + 1}: ${errMsg}`, "error");
        alert('No se pudo subir la imagen: ' + errMsg);
      } finally {
        setIsUploading(false);
        e.target.value = '';
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
      <Helmet>
        <title>{data.title ? `${data.title} | SMQ Industrial Systems` : 'SMQ Industrial Systems'}</title>
      </Helmet>
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
                    <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Imagen de Fondo (Banner Superior)</label>
                    <span className="text-[10px] text-white/40 block mt-0.5 leading-normal">(Esta imagen de fondo se aplica al inicio superior de la página, NO en las especialidades/equipos individuales)</span>
                    <input
                      type="file"
                      accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.gif,.bmp,.tiff,.heic,.heif,.jfif,.PNG,.JPG,.JPEG,.WEBP,.SVG,.GIF,.BMP,.TIFF,.HEIC,.HEIF,.JFIF"
                      className="hidden"
                      ref={heroImageInputRef}
                      onChange={handleHeroImageUpload}
                    />
                    <button
                      onClick={() => heroImageInputRef.current?.click()}
                      disabled={isUploading}
                      className="bg-[#FFD700] hover:bg-[#FFC000] text-black font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md text-xs mt-1"
                    >
                      {isUploading ? (
                        <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      ) : (
                        <Upload size={14} />
                      )}
                      <span>Subir Imagen de Cabecera</span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-1.5 border-t border-white/10 pt-3">
                    <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Imagen de Instalaciones</label>
                    <span className="text-[10px] text-white/40 block mt-0.5 leading-normal">(Esta imagen se aplica en la galería de instalaciones y detalles de plantas)</span>
                    <button
                      onClick={() => instalacionesImageInputRef.current?.click()}
                      disabled={isUploading}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md text-xs mt-1"
                    >
                      {isUploading ? (
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <Upload size={14} />
                      )}
                      <span>Subir Imagen de Instalaciones</span>
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
                        <label className="text-white/50 text-[10px] uppercase font-bold">Foto del Equipo ({data.items[editingItemIdx]?.title || 'Seleccionado'})</label>
                        <span className="text-[10px] text-white/40 block mt-0.5 leading-normal">(Esta imagen se aplica directamente al equipo/especialidad de la izquierda)</span>
                        <input
                          type="file"
                          accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.gif,.bmp,.tiff,.heic,.heif,.jfif,.PNG,.JPG,.JPEG,.WEBP,.SVG,.GIF,.BMP,.TIFF,.HEIC,.HEIF,.JFIF"
                          className="hidden"
                          ref={itemImageInputRef}
                          onChange={(e) => handleItemImageUpload(e, editingItemIdx)}
                        />
                        <button
                          onClick={() => itemImageInputRef.current?.click()}
                          disabled={isUploading}
                          className="bg-[#FFD700] hover:bg-[#FFC000] text-black font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md text-xs mt-1"
                        >
                          {isUploading ? (
                            <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                          ) : (
                            <Upload size={14} />
                          )}
                          <span>Subir Imagen de Equipo</span>
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
          {(() => {
            const getShortTitleLines = (title) => {
              const cleanTitle = title.trim().toUpperCase();
              if (cleanTitle.includes("LÍNEAS DE COMPOSTAJE") || cleanTitle.includes("LINEAS DE COMPOSTAJE")) {
                return ["LÍNEAS DE", "COMPOSTAJE"];
              }
              if (cleanTitle.includes("LÍNEAS DE LAVADO Y PELADO") || cleanTitle.includes("LINEAS DE LAVADO Y PELADO") || cleanTitle.includes("LÍNEAS DE LAVADO") || cleanTitle.includes("LINEAS DE LAVADO")) {
                return ["LÍNEAS DE", "LAVADO"];
              }
              if (cleanTitle.includes("LÍNEAS DE PRODUCCIÓN DE ALIMENTOS") || cleanTitle.includes("LINEAS DE PRODUCCION DE ALIMENTOS") || cleanTitle.includes("PRODUCCIÓN DE ALIMENTOS") || cleanTitle.includes("PRODUCCION DE ALIMENTOS")) {
                return ["PRODUCCIÓN DE", "ALIMENTOS"];
              }
              if (cleanTitle.includes("LÍNEAS DE EMPAQUETADO Y LLENADO") || cleanTitle.includes("LINEAS DE EMPAQUETADO Y LLENADO") || cleanTitle.includes("EMPAQUETADO Y LLENADO") || cleanTitle.includes("EMPAQUETADO Y LLENADO")) {
                return ["EMPAQUETADO", "Y LLENADO"];
              }
              if (cleanTitle.includes("SISTEMAS DE SEPARACIÓN") || cleanTitle.includes("SISTEMAS DE SEPARACION")) {
                return ["SISTEMAS DE", "SEPARACIÓN"];
              }
              const words = title.split(" ");
              if (words.length > 1) {
                const mid = Math.ceil(words.length / 2);
                return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
              }
              return [title, ""];
            };
            const getSectionIcon = (idx) => {
              if (sector === 'alimentos') {
                const icons = [Droplet, Layers, Package, Grid];
                const IconComponent = icons[idx] || Settings;
                return <IconComponent className="w-4.5 h-4.5 stroke-[1.5] transition-colors" />;
              }
              const defaultIcons = [Settings, Cpu, Compass, Shield, Layers];
              const IconComponent = defaultIcons[idx] || Settings;
              return <IconComponent className="w-4.5 h-4.5 stroke-[1.5] transition-colors" />;
            };

            return (
              <div 
                style={{ 
                  top: `${cmsState?.settings?.headerHeight || 76}px`
                }}
                className="fixed left-0 md:left-[76px] right-0 z-[80] bg-[#080B11]/95 backdrop-blur-2xl border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all select-none font-['Poppins']"
              >
                {/* Upper Row: Breadcrumb & Return navigation */}
                <div className="border-b border-white/5 py-2 px-4 md:px-8">
                  <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <button 
                      onClick={() => navigate(-1)} 
                      className="border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 px-3.5 py-1.5 rounded-full text-[10px] font-bold text-white/80 hover:text-white transition-all flex items-center gap-1.5 group"
                    >
                      <ArrowLeft size={11} className="transition-transform group-hover:-translate-x-0.5" />
                      <span>Volver</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider">
                      <span>Sector:</span>
                      <span className={`${colorScheme.text} font-black`}>{sector === 'alimentos' ? 'Alimentos' : data.title}</span>
                    </div>
                  </div>
                </div>

                {/* Lower Row: Category access shortcuts */}
                {data.items && data.items.length > 0 && (
                  <div className="py-2.5 px-4 md:px-8 overflow-x-auto scrollbar-none">
                    <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-2.5 min-w-max">
                      {data.items.map((item, idx) => {
                        const targetId = item.id || `item-${idx}`;
                        const isActive = activeItem === targetId;
                        const numberPrefix = idx + 1 < 10 ? `0${idx + 1}` : idx + 1;
                        const [line1, line2] = getShortTitleLines(item.title);
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              const el = document.getElementById(targetId);
                              if (el) {
                                const headerOffset = (cmsState?.settings?.headerHeight || 76) + 195;
                                const elementPosition = el.getBoundingClientRect().top;
                                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                  
                                window.scrollTo({
                                  top: offsetPosition,
                                  behavior: 'smooth'
                                });
                              }
                            }}
                            style={isActive ? { borderTopColor: colorScheme.accent, borderTopWidth: '2px' } : {}}
                            className={`flex items-center gap-3.5 px-4.5 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border h-[52px] w-[185px] flex-shrink-0 ${
                              isActive 
                                ? `bg-white/[0.03] ${colorScheme.text} ${colorScheme.borderActive} shadow-[0_0_20px_${colorScheme.glow}]` 
                                : 'bg-white/[0.01] text-white/40 border-white/5 hover:text-white hover:bg-white/[0.03] hover:border-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className={isActive ? colorScheme.text : 'text-white/30'}>
                                {getSectionIcon(idx)}
                              </span>
                              <span className={`text-[8px] px-1 py-0.5 rounded font-black ${isActive ? colorScheme.bg + ' ' + colorScheme.text : 'bg-[#0B0F14] text-white/50'}`}>
                                {numberPrefix}
                              </span>
                            </div>
                            <div className="flex flex-col text-left leading-[1.2] tracking-wide">
                              <span>{line1}</span>
                              {line2 && <span className={isActive ? 'text-white/80 font-medium' : 'text-white/30 font-medium'}>{line2}</span>}
                            </div>
                          </button>
                        );
                      })}
                      
                      {isEditorMode && (
                        <button
                          onClick={handleAddItem}
                          className="flex items-center justify-center gap-1.5 px-4 rounded-lg transition-all text-[10px] font-bold cursor-pointer border border-dashed border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500 h-[52px] w-[150px] flex-shrink-0"
                          title="Agregar nueva especialidad"
                        >
                          <Plus size={12} />
                          <span>Nueva Sección</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
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
                  defaultObjectFit="cover"
                  className="w-full h-full object-cover scale-105"
                  onUpdate={(newMedia) => handleUpdate('heroImage', newMedia)}
                  isEditorMode={isEditorMode}
                  label="Imagen/Video de Fondo Hero"
                  aspectClass="aspect-[21/9]"
                />
              )}
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <motion.span 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ borderColor: `${colorScheme.accent}33`, backgroundColor: `${colorScheme.accent}0d`, color: colorScheme.accent }}
                  className="inline-block border px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest"
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
                  style={{ color: colorScheme.accent }}
                  className="text-lg md:text-xl font-medium"
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
                    <span 
                      style={{ color: colorScheme.accent }}
                      className="text-[24px] md:text-[32px] font-black tracking-tight leading-none mb-2 block"
                    >
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
              {data.items && data.items.map((item, index) => {
                const formattedNum = index + 1 < 10 ? `0${index + 1}` : index + 1;

                return (
                  <motion.div 
                    id={item.id || `item-${index}`}
                    key={item.id || index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`scroll-mt-[175px] grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center border-b border-white/5 pb-16 md:pb-24 last:border-b-0`}
                  >
                    {/* Text Content */}
                    <div className={`lg:col-span-6 space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-lg ${colorScheme.bg} border ${colorScheme.border} flex items-center justify-center ${colorScheme.text} font-black text-xs`}>
                            {formattedNum}
                          </span>
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
                      <p 
                        style={{ color: colorScheme.accent }}
                        className="font-medium text-[15px] opacity-90"
                      >
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
                            {item.features.map((feat, fIdx) => {
                              const match = typeof feat === 'string' ? feat.match(/^\[icon:(\w+)\]\s*(.*)/) : null;
                              const iconName = match ? match[1] : 'Zap';
                              const textOnly = match ? match[2] : feat;
                              return (
                                <li key={fIdx} className="flex items-center gap-2.5 text-white/80 text-sm font-medium">
                                  <EditableIcon
                                    name={iconName}
                                    isEditorMode={isEditorMode}
                                    size={14}
                                    className={colorScheme.text}
                                    onChange={(newIconName) => {
                                      const updatedFeatures = [...item.features];
                                      updatedFeatures[fIdx] = `[icon:${newIconName}] ${textOnly}`;
                                      handleItemUpdate(index, 'features', updatedFeatures);
                                    }}
                                  />
                                  <span>
                                    <EditableText 
                                      value={textOnly} 
                                      onChange={(val) => {
                                        const updatedFeatures = [...item.features];
                                        const currentIcon = match ? `[icon:${match[1]}] ` : '';
                                        updatedFeatures[fIdx] = `${currentIcon}${val}`;
                                        handleItemUpdate(index, 'features', updatedFeatures);
                                      }} 
                                      tag="span" 
                                      isEditorMode={isEditorMode} 
                                    />
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                      {/* Tabla de Equipos / Especificaciones */}
                      {item.equipmentTable && item.equipmentTable.length > 0 && (
                        <div className="mt-6 space-y-3">
                          <h4 className={`text-xs uppercase tracking-widest ${colorScheme.text} font-black`}>Tabla de Equipos / Especificaciones:</h4>
                          <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className={`border-b border-white/10 bg-white/[0.04] text-[10px] uppercase tracking-wider ${colorScheme.text} font-bold`}>
                                  {(() => {
                                    const defaultHeaders = ["Modelo", "Ancho Pila", "Capacidad", "Potencia", "Peso"];
                                    const currentHeaders = item.tableHeaders || defaultHeaders;
                                    return currentHeaders.map((headerText, hIdx) => (
                                      <th key={hIdx} className="p-3">
                                        <EditableText
                                          value={headerText}
                                          onChange={(val) => {
                                            const newHeaders = [...(item.tableHeaders || defaultHeaders)];
                                            newHeaders[hIdx] = val;
                                            handleItemUpdate(index, 'tableHeaders', newHeaders);
                                          }}
                                          isEditorMode={isEditorMode}
                                        />
                                      </th>
                                    ));
                                  })()}
                                  {isEditorMode && <th className="p-3 text-center w-12">Acciones</th>}
                                </tr>
                              </thead>
                            <tbody>
                              {item.equipmentTable.map((row, rIdx) => (
                                <tr key={rIdx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-white/90">
                                  <td className="p-3 font-semibold">
                                    {isEditorMode ? (
                                      <EditableText
                                        value={row.model}
                                        onChange={(val) => {
                                          const newTable = [...item.equipmentTable];
                                          newTable[rIdx].model = val;
                                          handleItemUpdate(index, 'equipmentTable', newTable);
                                        }}
                                        isEditorMode={isEditorMode}
                                      />
                                    ) : (
                                      <Link
                                        to={getMachineLink(row.model)}
                                        onClick={() => {
                                          localStorage.setItem('last_sector_path', window.location.pathname + '#' + item.id);
                                          localStorage.setItem('last_sector_name', data.title || 'Sector');
                                        }}
                                        className={`inline-flex items-center gap-1.5 font-bold hover:underline decoration-2 underline-offset-4 cursor-pointer transition-all duration-300 ${colorScheme.text} hover:opacity-85 hover:scale-[1.02]`}
                                      >
                                        <span>{row.model}</span>
                                        <ArrowUpRight size={12} className="opacity-70 transition-transform duration-300" />
                                      </Link>
                                    )}
                                  </td>
                                  <td className="p-3">
                                    <EditableText
                                      value={row.width}
                                      onChange={(val) => {
                                        const newTable = [...item.equipmentTable];
                                        newTable[rIdx].width = val;
                                        handleItemUpdate(index, 'equipmentTable', newTable);
                                      }}
                                      isEditorMode={isEditorMode}
                                    />
                                  </td>
                                  <td className="p-3">
                                    <EditableText
                                      value={row.capacity}
                                      onChange={(val) => {
                                        const newTable = [...item.equipmentTable];
                                        newTable[rIdx].capacity = val;
                                        handleItemUpdate(index, 'equipmentTable', newTable);
                                      }}
                                      isEditorMode={isEditorMode}
                                    />
                                  </td>
                                  <td className="p-3">
                                    <EditableText
                                      value={row.power}
                                      onChange={(val) => {
                                        const newTable = [...item.equipmentTable];
                                        newTable[rIdx].power = val;
                                        handleItemUpdate(index, 'equipmentTable', newTable);
                                      }}
                                      isEditorMode={isEditorMode}
                                    />
                                  </td>
                                  <td className="p-3">
                                    <EditableText
                                      value={row.weight}
                                      onChange={(val) => {
                                        const newTable = [...item.equipmentTable];
                                        newTable[rIdx].weight = val;
                                        handleItemUpdate(index, 'equipmentTable', newTable);
                                      }}
                                      isEditorMode={isEditorMode}
                                    />
                                  </td>
                                  {isEditorMode && (
                                    <td className="p-3 text-center">
                                      <button
                                        onClick={() => {
                                          const newTable = item.equipmentTable.filter((_, i) => i !== rIdx);
                                          handleItemUpdate(index, 'equipmentTable', newTable);
                                        }}
                                        className="text-red-400 hover:text-red-500 hover:bg-red-500/10 p-1.5 rounded transition-all cursor-pointer"
                                        title="Eliminar fila"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {isEditorMode && (
                          <button
                            onClick={() => {
                              const newRow = { model: 'Modelo-TG', width: '0.0 m', capacity: '0 m³/h', power: '0 HP', weight: '0 kg' };
                              const newTable = [...(item.equipmentTable || []), newRow];
                              handleItemUpdate(index, 'equipmentTable', newTable);
                            }}
                            className="flex items-center gap-1 bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                          >
                            <Plus size={12} />
                            <span>Añadir Fila</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Media Container */}
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    {((item.image || item.image2 || item.video || (item.images && item.images.length > 0)) || isEditorMode) ? (
                      <div className="flex flex-col shadow-2xl">
                        {/* Contenedor Superior de la Imagen/Video */}
                        <div className="relative group overflow-hidden rounded-t-2xl border-t border-l border-r border-white/10 bg-white/5 aspect-[16/10]">
                          {isUploading && (
                            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center text-xs gap-2 z-50">
                              <RefreshCw size={24} className="animate-spin text-[#FFD700]" />
                              <span className="font-bold text-white/90">Subiendo archivo...</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10 pointer-events-none" />
                          {(() => {
                            let currentTab = activeMediaTabs[index] || item.defaultMediaTab || 'tab1';
                            const hasImage2 = (item.images && item.images[1]?.url) || item.image2?.url;
                            if (!isEditorMode) {
                              if (currentTab === 'tab2' && !hasImage2) {
                                currentTab = 'tab1';
                              } else if (currentTab === 'tab3' && !item.video?.url) {
                                currentTab = 'tab1';
                              }
                            }
                            let activeMedia = (item.images && item.images[0]) ? item.images[0] : item.image;
                            let activeLabel = `Foto Real de ${item.title}`;
                            let updateKey = 'image';
                            let mediaType = 'image';

                            if (currentTab === 'tab2') {
                              activeMedia = (item.images && item.images[1]) ? item.images[1] : item.image2;
                              activeLabel = `Twin Digital de ${item.title}`;
                              updateKey = 'image2';
                            } else if (currentTab === 'tab3') {
                              activeMedia = item.video;
                              activeLabel = `Animación de ${item.title}`;
                              updateKey = 'video';
                              mediaType = 'video';
                            }

                            return (
                              <>
                                <EditableMedia
                                  media={activeMedia || { url: '', type: mediaType }}
                                  defaultOpacity={1}
                                  defaultObjectFit="contain"
                                  className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                                  onUpdate={(newMedia) => handleItemUpdate(index, updateKey, newMedia)}
                                  isEditorMode={isEditorMode}
                                  label={activeLabel}
                                  logCMS={logCMS}
                                />

                                {/* Botón flotante superior con z-[60] para evitar overlays */}
                                {isEditorMode && (
                                  <div className="absolute top-4 right-4 z-[60]">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const inputId = `file-upload-input-${index}-${currentTab}`;
                                        document.getElementById(inputId)?.click();
                                      }}
                                      className="flex items-center gap-2 bg-[#0B0F14]/90 hover:bg-[#FFD700] hover:text-black text-white/90 backdrop-blur border border-white/15 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95 pointer-events-auto"
                                    >
                                      <Upload size={12} />
                                      <span>Subir</span>
                                    </button>
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>

                        {/* Contenedor Inferior de Botones/Tabs (Fuera del overlay de la imagen) */}
                        {(() => {
                          let currentTab = activeMediaTabs[index] || item.defaultMediaTab || 'tab1';
                          const hasImage2 = (item.images && item.images[1]?.url) || item.image2?.url;
                          if (!isEditorMode) {
                            if (currentTab === 'tab2' && !hasImage2) {
                              currentTab = 'tab1';
                            } else if (currentTab === 'tab3' && !item.video?.url) {
                              currentTab = 'tab1';
                            }
                          }
                          let updateKey = 'image';
                          if (currentTab === 'tab2') updateKey = 'image2';
                          else if (currentTab === 'tab3') updateKey = 'video';

                          return (
                            <div className="bg-[#0A0E13]/95 border-b border-l border-r border-white/10 p-2 rounded-b-2xl shadow-xl flex items-center justify-between gap-2 z-40 relative">
                              {/* Las Pestañas Repartidas */}
                              <div className="flex-1 flex items-center justify-between gap-1.5">
                                {/* Botón Tab 1 */}
                                <button
                                  onClick={() => setActiveMediaTabs(prev => ({ ...prev, [index]: 'tab1' }))}
                                  style={currentTab === 'tab1' ? { backgroundColor: `${colorScheme.accent}1a`, color: colorScheme.accent, borderColor: `${colorScheme.accent}4d` } : {}}
                                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                                    currentTab === 'tab1'
                                      ? 'shadow-md font-extrabold'
                                      : 'text-white/60 border-transparent hover:text-white hover:bg-white/5'
                                  }`}
                                >
                                  <EditableIcon
                                    name={item.blueprintIcon || 'Image'}
                                    isEditorMode={isEditorMode}
                                    size={12}
                                    className={currentTab === 'tab1' ? colorScheme.text : 'text-white/40'}
                                    onChange={(newIconName) => handleItemUpdate(index, 'blueprintIcon', newIconName)}
                                  />
                                  <EditableText
                                    value={item.mediaLabel1 || 'Foto Real'}
                                    onChange={(val) => handleItemUpdate(index, 'mediaLabel1', val)}
                                    isEditorMode={isEditorMode}
                                    tag="span"
                                  />
                                </button>

                                {/* Botón Tab 2 */}
                                {(isEditorMode || hasImage2) && (
                                  <button
                                    onClick={() => setActiveMediaTabs(prev => ({ ...prev, [index]: 'tab2' }))}
                                    style={currentTab === 'tab2' ? { backgroundColor: `${colorScheme.accent}1a`, color: colorScheme.accent, borderColor: `${colorScheme.accent}4d` } : {}}
                                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                                      !hasImage2 ? 'border-dashed border-white/20 opacity-50 hover:opacity-100' : ''
                                    } ${
                                      currentTab === 'tab2'
                                        ? 'shadow-md font-extrabold'
                                        : 'text-white/60 border-transparent hover:text-white hover:bg-white/5'
                                    }`}
                                  >
                                    <EditableIcon
                                      name={item.tab2Icon || 'Cpu'}
                                      isEditorMode={isEditorMode}
                                      size={12}
                                      className={currentTab === 'tab2' ? colorScheme.text : 'text-white/40'}
                                      onChange={(newIconName) => handleItemUpdate(index, 'tab2Icon', newIconName)}
                                    />
                                    <EditableText
                                      value={item.mediaLabel2 || 'Twin Digital'}
                                      onChange={(val) => handleItemUpdate(index, 'mediaLabel2', val)}
                                      isEditorMode={isEditorMode}
                                      tag="span"
                                    />
                                  </button>
                                )}

                                {/* Botón Tab 3 */}
                                {(isEditorMode || !!item.video?.url) && (
                                  <button
                                    onClick={() => setActiveMediaTabs(prev => ({ ...prev, [index]: 'tab3' }))}
                                    style={currentTab === 'tab3' ? { backgroundColor: `${colorScheme.accent}1a`, color: colorScheme.accent, borderColor: `${colorScheme.accent}4d` } : {}}
                                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                                      !item.video ? 'border-dashed border-white/20 opacity-50 hover:opacity-100' : ''
                                    } ${
                                      currentTab === 'tab3'
                                        ? 'shadow-md font-extrabold'
                                        : 'text-white/60 border-transparent hover:text-white hover:bg-white/5'
                                    }`}
                                  >
                                    <EditableIcon
                                      name={item.tab3Icon || 'Play'}
                                      isEditorMode={isEditorMode}
                                      size={12}
                                      className={currentTab === 'tab3' ? colorScheme.text : 'text-white/40'}
                                      onChange={(newIconName) => handleItemUpdate(index, 'tab3Icon', newIconName)}
                                    />
                                    <EditableText
                                      value={item.mediaVideoLabel || 'Animación'}
                                      onChange={(val) => handleItemUpdate(index, 'mediaVideoLabel', val)}
                                      isEditorMode={isEditorMode}
                                      tag="span"
                                    />
                                  </button>
                                )}
                              </div>

                              {/* Temporizador de rotación, Fijar inicio e Input/Botón de subida */}
                              {isEditorMode && (
                                <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                                  {/* Control de Temporizador */}
                                  <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-white/50">
                                    <Clock size={11} className="text-[#FFD700] animate-pulse" />
                                    <span>Auto-rotar:</span>
                                    <input 
                                      type="number"
                                      min="0"
                                      max="60"
                                      placeholder="0"
                                      value={item.mediaRotationInterval || 0}
                                      onChange={(e) => handleItemUpdate(index, 'mediaRotationInterval', parseInt(e.target.value) || 0)}
                                      className="w-10 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-center text-xs text-white focus:outline-none focus:border-[#FFD700] transition-colors font-bold"
                                      title="Segundos de intervalo para rotación (0 = desactivado)"
                                    />
                                    <span>s</span>
                                  </div>

                                  {/* Botón para fijar pestaña inicial */}
                                  <button
                                    onClick={() => {
                                      handleItemUpdate(index, 'defaultMediaTab', currentTab);
                                    }}
                                    className={`flex items-center gap-1 border px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                                      (item.defaultMediaTab || 'tab1') === currentTab
                                        ? 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                                        : 'bg-[#0A0E13]/90 hover:bg-[#FFD700] hover:text-black text-white/50 border-white/10 hover:border-transparent'
                                    }`}
                                    title="Establecer esta pestaña como la vista inicial por defecto"
                                  >
                                    <Star size={10} className={(item.defaultMediaTab || 'tab1') === currentTab ? "fill-[#FFD700] text-[#FFD700]" : "text-white/40"} />
                                    <span>{(item.defaultMediaTab || 'tab1') === currentTab ? 'Inicio' : 'Fijar Inicio'}</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      const inputId = `file-upload-input-${index}-${currentTab}`;
                                      document.getElementById(inputId)?.click();
                                    }}
                                    className="flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500 hover:text-black text-emerald-400 border border-emerald-500/30 hover:border-transparent px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer hover:scale-105 active:scale-95 pointer-events-auto"
                                    title="Subir archivo para la pestaña seleccionada"
                                  >
                                    <Upload size={10} />
                                    <span>Subir</span>
                                  </button>
                                  <input
                                    id={`file-upload-input-${index}-${currentTab}`}
                                    type="file"
                                    className="hidden"
                                    accept="image/*,video/*,.png,.jpg,.jpeg,.webp,.svg,.gif,.bmp,.tiff,.heic,.heif,.jfif,.mp4,.webm,.ogg,.mov,.avi,.PNG,.JPG,.JPEG,.WEBP,.SVG,.GIF,.BMP,.TIFF,.HEIC,.HEIF,.JFIF,.MP4,.WEBM,.OGG,.MOV,.AVI"
                                    onChange={async (e) => {
                                      const file = e.target.files[0];
                                      if (!file) {
                                        logCMS("⚠️ No se seleccionó archivo en tarjeta.", "warning");
                                        return;
                                      }
                                      logCMS(`Iniciando subida desde tarjeta (${currentTab}): ${file.name}`, "info");
                                      try {
                                        setIsUploading(true);
                                        const uploadedUrl = await uploadFile(file, "media");
                                        logCMS(`✅ Subida de tarjeta exitosa: ${uploadedUrl}`, "success");
                                        const isVideoFile = file.type.startsWith('video/') || file.name.endsWith('.mp4') || file.name.endsWith('.webm');
                                        handleItemUpdate(index, updateKey, { 
                                          url: uploadedUrl, 
                                          type: isVideoFile ? 'video' : 'image',
                                          scale: 1,
                                          positionX: 0,
                                          positionY: 0,
                                          objectFit: 'contain',
                                          bgColor: 'transparent',
                                          opacity: 1,
                                          blur: 0,
                                          brightness: 100,
                                          contrast: 100
                                        });
                                      } catch (err) {
                                        const errMsg = err.message || err.error_description || JSON.stringify(err);
                                        logCMS(`❌ Error en tarjeta: ${errMsg}`, "error");
                                        alert("Error al subir archivo: " + errMsg);
                                      } finally {
                                        setIsUploading(false);
                                        e.target.value = '';
                                      }
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    ) : (
                      <div className="w-full aspect-[16/10] bg-white/5 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-6 text-white/40">
                        <EditableIcon
                          name={item.placeholderIcon || 'Settings'}
                          isEditorMode={isEditorMode}
                          size={48}
                          className="mb-4 stroke-[1.2]"
                          onChange={(newIconName) => handleItemUpdate(index, 'placeholderIcon', newIconName)}
                        />
                        <p className="font-semibold text-sm">Visualización técnica en preparación</p>
                        <p className="text-xs text-white/20 mt-1">Contacta con soporte para hojas de especificación</p>
                      </div>
                    )}
                  </div>

                </motion.div>
              );
            })}
            </div>
          </section>

          {/* Sección de Casos de Éxito */}
          <section id="casos-exito" className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-24 border-t border-white/5 relative overflow-hidden font-['Poppins']">
            {/* Fondo de red digital sutil */}
            <div className="absolute inset-0 bg-[#080B11]/50 pointer-events-none z-0" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch relative z-10">
              {/* Columna Izquierda: Selector de Casos de Éxito */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-10 h-10 rounded-xl ${colorScheme.bg} border ${colorScheme.border} flex items-center justify-center ${colorScheme.text}`}>
                        <Award size={20} className="stroke-[1.5]" />
                      </span>
                      <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40">Estudios de Campo</h2>
                    </div>
                    <span className={`text-3xl font-black font-mono tracking-tighter opacity-15 ${colorScheme.text}`}>01</span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.05] text-white">
                    Casos de Éxito
                  </h3>
                  
                  <p className="text-white/40 text-xs font-bold uppercase tracking-wider leading-relaxed">
                    ESTUDIOS DE CASOS REALES Y RESULTADOS OPERATIVOS DE NUESTROS CLIENTES.
                  </p>
                  
                  <div className="w-12 h-[3px] rounded-full" style={{ backgroundColor: colorScheme.accent }} />

                  <p className="text-white/70 text-sm leading-relaxed">
                    En SMQ impulsamos la eficiencia y la innovación en la industria alimentaria a nivel global. Seleccione uno de nuestros casos emblemáticos en México para analizar los datos analíticos de rendimiento en tiempo real.
                  </p>
                </div>

                {/* Casos de Éxito Destacados en México */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: colorScheme.accent }}>
                    CASOS DE ÉXITO DESTACADOS EN MÉXICO
                  </p>

                  <div className="space-y-3">
                    {[
                      {
                        company: 'BIMBO',
                        plant: 'Planta Azcapotzalco, CDMX',
                        desc: 'Modernización de línea de producción de panificación.',
                        val: '+28%',
                        metric: 'Eficiencia',
                        sub: 'Operativa'
                      },
                      {
                        company: 'HERDEZ',
                        plant: 'Planta Tecámac, Edo. de México',
                        desc: 'Automatización de proceso de envasado de alimentos.',
                        val: '+32%',
                        metric: 'Rendimiento',
                        sub: 'De Línea'
                      },
                      {
                        company: 'NESTLÉ',
                        plant: 'Planta Coatepec, Veracruz',
                        desc: 'Implementación de sistema de clasificación de granos por IA.',
                        val: '+24%',
                        metric: 'Clasificación',
                        sub: 'Automatizada'
                      }
                    ].map((proj, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => setActiveProjectIdx(pIdx)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
                          activeProjectIdx === pIdx
                            ? `bg-white/[0.03] border-white/15 shadow-[0_0_20px_rgba(255,255,255,0.03)]`
                            : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-10 rounded-lg flex items-center justify-center border transition-colors ${
                            activeProjectIdx === pIdx ? 'bg-black border-white/10' : 'bg-black/45 border-white/5'
                          }`}>
                            <span className="text-[11px] font-black text-white tracking-widest">{proj.company}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-white">{proj.plant}</span>
                            <span className="text-[10px] text-white/50">{proj.desc}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 text-right">
                          <TrendingUp size={16} style={{ color: activeProjectIdx === pIdx ? colorScheme.accent : 'rgba(255,255,255,0.3)' }} />
                          <div className="flex flex-col leading-none">
                            <span className="text-sm font-black text-white" style={{ color: activeProjectIdx === pIdx ? colorScheme.accent : 'white' }}>{proj.val}</span>
                            <span className="text-[7px] text-white/40 uppercase font-black tracking-wider">{proj.metric}</span>
                            <span className="text-[6px] text-white/30 uppercase font-bold">{proj.sub}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <Link to="/proyectos" className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider ${colorScheme.text} hover:opacity-80 transition-opacity mt-2 cursor-pointer`}>
                    <span>VER TODOS LOS CASOS DE ÉXITO</span>
                    <span className="text-xs">➔</span>
                  </Link>
                </div>
              </div>

              {/* Columna Derecha: Consola de Rendimiento Operativo */}
              <div className="lg:col-span-7 bg-[#080B11]/85 border border-white/5 rounded-2xl p-6 md:p-8 relative flex flex-col justify-between min-h-[480px] shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />
                
                {/* Cabecera del Panel */}
                <div className="flex justify-between items-start border-b border-white/5 pb-4 relative z-10">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">MONITOR OPERATIVO</span>
                    <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                      {activeProjectIdx === 0 && "BIMBO - EFICIENCIA AZCAPOTZALCO"}
                      {activeProjectIdx === 1 && "HERDEZ - AUTOMATIZACIÓN TECÁMAC"}
                      {activeProjectIdx === 2 && "NESTLÉ - CLASIFICACIÓN COATEPEC"}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-lg px-2.5 py-1 text-[8px] font-bold text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
                    ANALÍTICA ACTIVA
                  </div>
                </div>

                {/* Gráfico de Rendimiento */}
                <div className="py-6 relative z-10 flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[9px] font-black uppercase text-white/40 tracking-wider">INCREMENTO OPERATIVO vs BASELINE</span>
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1.5 text-[8px] font-bold text-white/40">
                        <span className="w-2 h-0.5 border-t border-dashed border-white/30" /> BASELINE
                      </span>
                      <span className="flex items-center gap-1.5 text-[8px] font-black text-white" style={{ color: colorScheme.accent }}>
                        <span className="w-2 h-0.5 rounded" style={{ backgroundColor: colorScheme.accent }} /> OPTIMIZADO
                      </span>
                    </div>
                  </div>

                  {/* Gráfico Realista SVG */}
                  <div className="w-full bg-black/40 border border-white/5 rounded-xl p-4 relative overflow-hidden">
                    <svg viewBox="0 0 500 180" className="w-full h-auto overflow-visible">
                      <defs>
                        <linearGradient id="optGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colorScheme.accent} stopOpacity="0.25" />
                          <stop offset="100%" stopColor={colorScheme.accent} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Rejilla de fondo */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="160" x2="500" y2="160" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      
                      {/* Curva de Baseline (Gris discontinua) */}
                      <path
                        d={
                          activeProjectIdx === 0 ? "M 20,130 Q 100,125 180,120 T 340,122 T 480,115" :
                          activeProjectIdx === 1 ? "M 20,140 Q 100,138 180,135 T 340,132 T 480,130" :
                          "M 20,120 Q 100,118 180,122 T 340,115 T 480,112"
                        }
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />

                      {/* Área debajo de la optimizada */}
                      <path
                        d={
                          activeProjectIdx === 0 ? "M 20,130 Q 100,85 180,60 T 340,45 T 480,35 L 480,160 L 20,160 Z" :
                          activeProjectIdx === 1 ? "M 20,140 Q 100,80 180,50 T 340,38 T 480,25 L 480,160 L 20,160 Z" :
                          "M 20,120 Q 100,88 180,70 T 340,55 T 480,48 L 480,160 L 20,160 Z"
                        }
                        fill="url(#optGradient)"
                      />

                      {/* Curva de Optimización SMQ (Verde brillante) */}
                      <path
                        d={
                          activeProjectIdx === 0 ? "M 20,130 Q 100,85 180,60 T 340,45 T 480,35" :
                          activeProjectIdx === 1 ? "M 20,140 Q 100,80 180,50 T 340,38 T 480,25" :
                          "M 20,120 Q 100,88 180,70 T 340,55 T 480,48"
                        }
                        fill="none"
                        stroke={colorScheme.accent}
                        strokeWidth="3"
                      />

                      {/* Nodos de datos activos */}
                      {activeProjectIdx === 0 && (
                        <>
                          <circle cx="180" cy="60" r="5" fill="#080B11" stroke={colorScheme.accent} strokeWidth="2" />
                          <circle cx="340" cy="45" r="5" fill="#080B11" stroke={colorScheme.accent} strokeWidth="2" />
                          <circle cx="480" cy="35" r="5" fill={colorScheme.accent} />
                        </>
                      )}
                      {activeProjectIdx === 1 && (
                        <>
                          <circle cx="180" cy="50" r="5" fill="#080B11" stroke={colorScheme.accent} strokeWidth="2" />
                          <circle cx="340" cy="38" r="5" fill="#080B11" stroke={colorScheme.accent} strokeWidth="2" />
                          <circle cx="480" cy="25" r="5" fill={colorScheme.accent} />
                        </>
                      )}
                      {activeProjectIdx === 2 && (
                        <>
                          <circle cx="180" cy="70" r="5" fill="#080B11" stroke={colorScheme.accent} strokeWidth="2" />
                          <circle cx="340" cy="55" r="5" fill="#080B11" stroke={colorScheme.accent} strokeWidth="2" />
                          <circle cx="480" cy="48" r="5" fill={colorScheme.accent} />
                        </>
                      )}
                    </svg>
                  </div>
                </div>

                {/* Métricas e Impacto del Proyecto */}
                <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4 relative z-10 bg-black/10 p-4 rounded-xl">
                  <div className="flex flex-col text-center">
                    <span className="text-[8px] font-black uppercase text-white/40 tracking-wider">Ahorro Energía</span>
                    <span className="text-xl font-black text-white mt-1" style={{ color: colorScheme.accent }}>
                      {activeProjectIdx === 0 && "22%"}
                      {activeProjectIdx === 1 && "25%"}
                      {activeProjectIdx === 2 && "18%"}
                    </span>
                    <span className="text-[7px] text-white/30 uppercase mt-0.5">Certificado Anual</span>
                  </div>
                  
                  <div className="flex flex-col text-center border-x border-white/5">
                    <span className="text-[8px] font-black uppercase text-white/40 tracking-wider">OEE Alcanzado</span>
                    <span className="text-xl font-black text-white mt-1">
                      {activeProjectIdx === 0 && "94.5%"}
                      {activeProjectIdx === 1 && "96.2%"}
                      {activeProjectIdx === 2 && "93.8%"}
                    </span>
                    <span className="text-[7px] text-white/30 uppercase mt-0.5">Disponibilidad Planta</span>
                  </div>

                  <div className="flex flex-col text-center">
                    <span className="text-[8px] font-black uppercase text-white/40 tracking-wider">Retorno (ROI)</span>
                    <span className="text-xl font-black text-white mt-1">
                      {activeProjectIdx === 0 && "14 Meses"}
                      {activeProjectIdx === 1 && "11 Meses"}
                      {activeProjectIdx === 2 && "16 Meses"}
                    </span>
                    <span className="text-[7px] text-white/30 uppercase mt-0.5">Periodo Payback</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Barra de Estadísticas Horizontales Inferiores */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border-t border-white/10 pt-10 mt-12 relative z-10">
              {[
                { icon: Grid, value: '+540', label: 'PROYECTOS EXITOSOS', sublabel: 'A NIVEL MUNDIAL' },
                { icon: Globe, value: '+60', label: 'PAÍSES CON', sublabel: 'PRESENCIA ACTIVA' },
                { icon: Users, value: '+300', label: 'CLIENTES', sublabel: 'SATISFECHOS' },
                { icon: TrendingUp, value: '+98%', label: 'EFICIENCIA OPERATIVA', sublabel: 'PROMEDIO ALCANZADA' },
                { icon: Headphones, value: '24/7', label: 'SOPORTE TÉCNICO', sublabel: 'GLOBAL' }
              ].map((metric, mIdx) => {
                const MetricIcon = metric.icon;
                return (
                  <div key={mIdx} className="flex items-center gap-3.5 group/metric">
                    <div className={`w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/50 group-hover/metric:text-white group-hover/metric:border-white/15 transition-all duration-300`}>
                      <MetricIcon size={18} className="stroke-[1.5]" style={{ color: colorScheme.accent }} />
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className={`text-xl font-black text-white group-hover/metric:${colorScheme.text} transition-colors tracking-tight`}>{metric.value}</span>
                      <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider mt-0.5">{metric.label}</span>
                      <span className="text-[8px] text-white/20 uppercase tracking-widest mt-0.5">{metric.sublabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 02. INSTALACIONES */}
          <section id="instalaciones" className="scroll-mt-32 max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-24 border-t border-white/5 relative overflow-hidden font-['Poppins']">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch relative z-10">
              
              {/* Columna Izquierda (4/12): Encabezado de Instalaciones */}
              <div className="lg:col-span-4 flex flex-col justify-start space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[#3B82F6]">
                    <Factory size={20} className="stroke-[1.5]" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[20px] font-black text-[#3B82F6] font-mono leading-none">02</span>
                    <div className="w-6 h-[1.5px] bg-[#3B82F6] mt-1" />
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
                  Instalaciones
                </h2>

                <div className="space-y-4">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                    GALERÍA Y DETALLES DE PLANTAS EN FUNCIONAMIENTO A NIVEL MUNDIAL.
                  </p>
                  <div className="w-12 h-[3px] rounded-full bg-[#3B82F6]" />
                </div>

                <p className="text-white/60 text-xs md:text-sm leading-relaxed font-medium">
                  Contamos con instalaciones de clase mundial equipadas con tecnología de última generación, diseñadas para garantizar eficiencia, calidad y escalabilidad en cada proyecto que desarrollamos.
                </p>
              </div>

              {/* Columna Derecha (8/12): Imagen y Paneles de Información */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Gran Imagen Principal */}
                <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] group">
                  <img 
                    src={data.instalacionesImage || "/smq_factory_night.png"} 
                    alt="SMQ High-Tech Factory" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {isEditorMode && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                      <input 
                        type="file" 
                        className="hidden" 
                        ref={instalacionesImageInputRef}
                        accept="image/*" 
                        onChange={handleInstalacionesImageUpload} 
                      />
                      <button 
                        onClick={() => instalacionesImageInputRef.current?.click()}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg cursor-pointer"
                      >
                        <Upload size={14} /> Cambiar Fachada
                      </button>
                    </div>
                  )}
                </div>

                {/* Grid de Paneles Lado a Lado */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Tarjeta 1: Planta Principal */}
                  <div className="bg-[#080B11]/85 border border-white/5 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[260px] shadow-lg">
                    {/* SVG Dotted Map de China de fondo sutil */}
                    <div className="absolute right-2 bottom-6 w-32 h-32 opacity-15 pointer-events-none z-0">
                      <svg viewBox="0 0 120 120" className="w-full h-full fill-white">
                        <circle cx="85" cy="55" r="1.5" />
                        <circle cx="95" cy="58" r="1.5" />
                        <circle cx="90" cy="63" r="1.5" />
                        <circle cx="80" cy="60" r="1.5" />
                        <circle cx="75" cy="65" r="1.5" />
                        <circle cx="70" cy="55" r="1.5" />
                        <circle cx="85" cy="70" r="1.5" />
                        <circle cx="72" cy="73" r="1.5" />
                        <circle cx="60" cy="65" r="1.5" />
                        <circle cx="65" cy="58" r="1.5" />
                        {/* Hotspot Pulsante de Shanghai */}
                        <circle cx="95" cy="58" r="3" fill="#3B82F6" className="animate-ping" />
                        <circle cx="95" cy="58" r="1.5" fill="#3B82F6" />
                      </svg>
                    </div>

                    <div className="relative z-10 space-y-4">
                      {/* Cabecera Tarjeta */}
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3B82F6]">
                          <Factory size={16} />
                        </span>
                        <div className="flex flex-col leading-none">
                          <span className="text-[8px] font-black uppercase text-white/40 tracking-wider">PLANTA PRINCIPAL</span>
                          <span className="text-sm font-black text-white tracking-tight mt-0.5">SHANGHAI, CHINA</span>
                        </div>
                      </div>

                      {/* Lista de Detalles */}
                      <ul className="space-y-2 text-[10px] text-white/70 font-semibold pl-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>5,000 m² de superficie total</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>Centro de manufactura y ensamblaje</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>Tecnología de producción de última generación</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>Capacidad instalada para más de 200 líneas/año</span>
                        </li>
                      </ul>
                    </div>

                    {/* Footer de la Tarjeta */}
                    <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-3.5 mt-4 text-center relative z-10">
                      <div className="flex flex-col items-center">
                        <Building2 size={12} className="text-[#3B82F6]" />
                        <span className="text-[10px] font-black text-white mt-1">5,000 m²</span>
                        <span className="text-[6px] text-white/30 uppercase font-bold">Superficie Total</span>
                      </div>
                      <div className="flex flex-col items-center border-x border-white/5">
                        <Hammer size={12} className="text-[#3B82F6]" />
                        <span className="text-[10px] font-black text-white mt-1">200+</span>
                        <span className="text-[6px] text-white/30 uppercase font-bold">Líneas/Año</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Users size={12} className="text-[#3B82F6]" />
                        <span className="text-[10px] font-black text-white mt-1">300+</span>
                        <span className="text-[6px] text-white/30 uppercase font-bold">Colaboradores</span>
                      </div>
                    </div>
                  </div>

                  {/* Tarjeta 2: Oficina Comercial */}
                  <div className="bg-[#080B11]/85 border border-white/5 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[260px] shadow-lg">
                    {/* SVG Dotted Map de América de fondo sutil */}
                    <div className="absolute right-2 bottom-6 w-32 h-32 opacity-15 pointer-events-none z-0">
                      <svg viewBox="0 0 120 120" className="w-full h-full fill-white">
                        <circle cx="30" cy="30" r="1.2" />
                        <circle cx="35" cy="40" r="1.2" />
                        <circle cx="40" cy="48" r="1.2" />
                        <circle cx="45" cy="55" r="1.2" />
                        <circle cx="50" cy="62" r="1.2" />
                        <circle cx="55" cy="70" r="1.2" />
                        <circle cx="60" cy="80" r="1.2" />
                        {/* Hotspot Pulsante de CDMX */}
                        <circle cx="40" cy="48" r="3" fill="#3B82F6" className="animate-ping" />
                        <circle cx="40" cy="48" r="1.2" fill="#3B82F6" />
                      </svg>
                    </div>

                    <div className="relative z-10 space-y-4">
                      {/* Cabecera Tarjeta */}
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3B82F6]">
                          <Building2 size={16} />
                        </span>
                        <div className="flex flex-col leading-none">
                          <span className="text-[8px] font-black uppercase text-white/40 tracking-wider">OFICINA COMERCIAL</span>
                          <span className="text-sm font-black text-white tracking-tight mt-0.5">CDMX, MÉXICO</span>
                          <span className="text-[7px] font-bold text-white/50 tracking-wide uppercase mt-0.5 font-mono">POLANCO | CARSO</span>
                        </div>
                      </div>

                      {/* Lista de Detalles */}
                      <ul className="space-y-2 text-[10px] text-white/70 font-semibold pl-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>Atención y soporte comercial</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>Desarrollo de soluciones a la medida</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>Relación cercana con nuestros clientes</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          <span>Cobertura en toda Latinoamérica</span>
                        </li>
                      </ul>
                    </div>

                    {/* Footer de la Tarjeta */}
                    <div className="border-t border-white/5 pt-3.5 mt-4 flex justify-between items-center gap-4 text-left relative z-10">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#3B82F6] shrink-0" />
                        <div className="flex flex-col leading-none">
                          <span className="text-[8px] text-white/70 font-bold">Lago Zurich 245, Polanco, Miguel Hidalgo</span>
                          <span className="text-[6px] text-white/40 uppercase mt-0.5">11529, CDMX, México</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 border-l border-white/5 pl-2.5">
                        <Building2 size={12} className="text-[#3B82F6]" />
                        <div className="flex flex-col leading-none">
                          <span className="text-[8px] text-white/80 font-black tracking-tight">Corporativo Carso</span>
                          <span className="text-[6px] text-white/30 uppercase mt-0.5 font-bold">Grupo Carso</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* Global CTA Section */}
          <section id="cotizar" className="bg-black/40 border-t border-b border-white/5 py-20 px-6 md:px-8 text-center relative overflow-hidden">
            {/* Subtle light ring accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#FFD700]/5 rounded-full filter blur-[120px] pointer-events-none z-0" />
            
            <div className="max-w-3xl mx-auto space-y-8 relative z-10 flex flex-col items-center">
              <EditableIcon
                name={data.ctaIcon || 'Shield'}
                isEditorMode={isEditorMode}
                size={48}
                className="text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] animate-pulse"
                onChange={(newIconName) => handleUpdate('ctaIcon', newIconName)}
              />
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
      {isEditorMode && (
        <div 
          className={`fixed bottom-4 left-4 z-[99999] bg-[#0A0F15]/95 border border-white/10 p-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl flex flex-col gap-2 font-mono text-[10px] pointer-events-auto transition-all duration-300 select-none ${
            isCmsDebugMinimized ? 'w-[180px] h-[32px] overflow-hidden' : 'w-[360px] max-h-[200px] overflow-hidden'
          }`}
        >
          <div className="flex justify-between items-center border-b border-white/5 pb-1">
            <span 
              onClick={() => setIsCmsDebugMinimized(!isCmsDebugMinimized)}
              className="text-[#FFD700] font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              {isCmsDebugMinimized ? 'CMS Logs' : 'CMS Debug Console'}
            </span>
            <div className="flex items-center gap-2">
              {!isCmsDebugMinimized && (
                <button 
                  onClick={() => setCmsLogs([])}
                  className="text-white/40 hover:text-white transition-colors"
                  title="Clear Logs"
                >
                  Clear
                </button>
              )}
              <button 
                onClick={() => setIsCmsDebugMinimized(!isCmsDebugMinimized)}
                className="text-white/40 hover:text-white transition-colors flex items-center justify-center"
                title={isCmsDebugMinimized ? "Expand" : "Minimize"}
              >
                {isCmsDebugMinimized ? <Maximize2 size={10} /> : <Minimize2 size={10} />}
              </button>
            </div>
          </div>
          {!isCmsDebugMinimized && (
            <div className="flex-1 overflow-y-auto flex flex-col gap-1 pr-1 custom-scrollbar max-h-[150px]">
              {cmsLogs.length === 0 ? (
                <span className="text-white/30 italic">No hay logs registrados aún. Prueba a subir un archivo.</span>
              ) : (
                cmsLogs.map(log => (
                  <div key={log.id} className="flex gap-1.5 leading-relaxed">
                    <span className="text-white/30">[{log.time}]</span>
                    <span className={log.type === 'error' ? 'text-red-400 font-bold' : log.type === 'success' ? 'text-emerald-400 font-bold' : log.type === 'warning' ? 'text-amber-400' : 'text-white/70'}>
                      {log.text}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default IndustriaDetalle;
