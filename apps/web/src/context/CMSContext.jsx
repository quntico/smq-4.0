import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase.js';

const CMSContext = createContext();

const initialCMSState = {
    settings: {
        logoUrl: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1772916101912_LOGO%20ALUMINIO%20SMQ%20LIMPIO.png',
        faviconUrl: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1772938478587_FAVICON%20SMQ.png',
        logoSize: 98,
        headerHeight: 100,
        headerOpacity: 60,
        appVersion: '7.12',
        globalImageSharpness: 100,
        globalFilterColor: '#000000',
        globalFilterOpacity: 75,
        textJustify: true,
        disableImageFilters: false,
    },
    menus: [
        { id: '1', name: 'Industrias', componentName: 'IndustriesMenu', order: 1 },
        { id: '4', name: 'Tecnología', componentName: 'TechnologyMenu', order: 2 },
        { id: '3', name: 'Maquinaria', componentName: 'MachineryMenu', order: 3 },
        { id: '6', name: 'Valorización Energética', componentName: 'WasteToEnergyMenu', order: 4 },
        { id: '7', name: 'Proyectos', componentName: 'ProjectsMenu', order: 5 },
        { id: '5', name: 'Empresa', componentName: 'CompanyMenu', order: 6 },
    ],
    pages: [
    {
        "id": "home",
        "title": "Home",
        "slug": "/",
        "modules": [
            {
                "id": "hero-1",
                "type": "hero",
                "data": {
                    "title1": "Soluciones Industriales",
                    "title2": "de Alta Ingeniería",
                    "subtitle": "Maquinaria avanzada para reciclaje, procesamiento de alimentos y automatización industrial.",
                    "slides": [
                        {
                            "id": "slide-1",
                            "title1": "Soluciones Industriales",
                            "title2": "de Alta Ingeniería",
                            "subtitle": "Maquinaria avanzada para reciclaje, procesamiento de alimentos y automatización industrial.",
                            "backgroundMedia": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780095574453_cajas%20fast%20webm.webm",
                            "overlayOpacity": 27,
                            "posterUrl": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780095913256_AUTOMATIZACION.png"
                        },
                        {
                            "id": "slide-1780811107042",
                            "title1": "SISTEMAS AVANZADOS",
                            "title2": "DE  PELETIZADO.",
                            "subtitle": "Descripción breve de este nuevo banner industrial.",
                            "backgroundMedia": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780811371107_VID_PELLET_WEB.webm",
                            "overlayOpacity": 72
                        },
                        {
                            "id": "slide-1780811407090",
                            "title1": "ENVASADORAS",
                            "title2": "DE NUEVA GENERACIÓN",
                            "subtitle": "Envasadoras Doy Pack, Stand up pouch pre made, Sachet, VSSF 4.0 ",
                            "backgroundMedia": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780811567983_pouch_12345_optimized.webm",
                            "overlayOpacity": 50
                        }
                    ]
                }
            },
            {
                "id": "industries",
                "type": "industries",
                "data": {
                    "items": [
                        {
                            "id": 1,
                            "title": "Reciclaje",
                            "description": "Plantas de reciclaje de plásticos",
                            "image": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1772949246746_PLANTA%20DE%20RECICLAJE.png",
                            "titleAlign": "center",
                            "descAlign": "center"
                        },
                        {
                            "id": 2,
                            "title": "Alimentos",
                            "description": "Líneas de procesamiento alimentario",
                            "image": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1773020673672_CHOCOLATE%20A.jpg",
                            "titleAlign": "center",
                            "descAlign": "center",
                            "imageOpacity": 0.1
                        },
                        {
                            "id": 3,
                            "title": "Packaging",
                            "description": "Sistemas de llenado y envasado",
                            "image": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1772950025146_PREMIER.png",
                            "titleAlign": "center",
                            "descAlign": "center"
                        },
                        {
                            "id": 4,
                            "title": "Construcción",
                            "description": "Materiales composites y reciclados",
                            "image": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1772950033502_COSNTRUCCION.png",
                            "titleSize": 22,
                            "cardPadding": 25,
                            "descAlign": "center",
                            "titleAlign": "center"
                        },
                        {
                            "id": 5,
                            "title": "Automatización",
                            "description": "Sistemas inteligentes de control",
                            "image": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1772950043878_AUTOMATIZACION.png",
                            "titleAlign": "center",
                            "descAlign": "center",
                            "cardPadding": 15,
                            "titleSize": 22
                        }
                    ]
                }
            },
            {
                "id": "capabilities",
                "type": "capabilities",
                "data": {
                    "items": [
                        {
                            "id": 1,
                            "title": "Ingeniería de Procesos",
                            "description": "Diseño y optimización de procesos industriales para maximizar la eficiencia, reducir costos operativos y garantizar la máxima calidad en cada etapa de producción.",
                            "iconName": "Settings",
                            "descAlign": "justify"
                        },
                        {
                            "id": 2,
                            "title": "Fabricación Industrial",
                            "description": "Fabricación especializada de maquinaria y equipos robustos, utilizando materiales de alta resistencia y tecnología de vanguardia para entornos exigentes.",
                            "iconName": "Zap",
                            "descAlign": "justify"
                        },
                        {
                            "id": 3,
                            "title": "Automatización Inteligente",
                            "description": "Implementación de sistemas de control avanzados e inteligencia artificial para automatizar líneas de producción, mejorando la precisión y la seguridad.",
                            "iconName": "Bot",
                            "descAlign": "justify"
                        }
                    ]
                }
            },
            {
                "id": "visualizer",
                "type": "visualizer",
                "data": {
                    "backgroundMedia": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1772950089469_truper%2058.png",
                    "hotspots": [
                        {
                            "id": 1,
                            "x": -4.31749291691812,
                            "y": 42.21177078217271,
                            "name": "Banda en L de ENTRADA",
                            "specs": "Capacidad: 1000 kg/h",
                            "power": "2.2 kW",
                            "locked": true,
                            "z": 42.95965686328876
                        },
                        {
                            "id": 2,
                            "x": 74.17782811430718,
                            "y": 41.142916432489386,
                            "name": "Sistema de Enfriamiento",
                            "specs": "Capacidad : 1800 Kg/h",
                            "power": "2.2&nbsp; kW",
                            "locked": true,
                            "z": 50
                        },
                        {
                            "id": 3,
                            "x": 119.76835188639065,
                            "y": 44.85135152382843,
                            "name": "Eddy Current",
                            "specs": "Sistema de separación inteligente",
                            "power": "11 kW",
                            "locked": true,
                            "z": 50
                        },
                        {
                            "id": 4,
                            "x": 37.103183424086794,
                            "y": 39.263236585502426,
                            "name": "Trituradora SMX1500",
                            "specs": "Capacidad:&nbsp; 2 Toneladas",
                            "power": "105 kW",
                            "locked": true,
                            "z": 50
                        }
                    ],
                    "model3DMedia": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1772950255486_TRUPER%2057.dae",
                    "designTitle": "Sistema de Reducción y<font color=\"#ffd700\"> Valorización Inteligente</font>",
                    "modelAltitude": 2
                }
            },
            {
                "id": "proyectos",
                "type": "proyectos",
                "data": {
                    "title": "Proyectos <span class=\"text-[#F5C400]\">Destacados</span>",
                    "subtitle": "Casos de éxito y plantas industriales implementadas por nuestro equipo.",
                    "items": [
                        {
                            "id": 1,
                            "title": "Planta de Procesamiento RSU 600 TPD",
                            "desc": "Clasificación mecanizada, separación de reciclables y valorización de residuos sólidos urbanos para generación de combustibles alternativos.",
                            "specs": "Capacidad: 600 Ton/Día | Ubicación: Monterrey, MX",
                            "image": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png",
                            "image2": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png",
                            "specsTable": {
                                "capacidad": "600 Toneladas / Día",
                                "ubicacion": "Monterrey, Nuevo León, MX",
                                "aplicacion": "Clasificación y Separación de Residuos Sólidos Urbanos (RSU)",
                                "control": "PLC Siemens S7-1500 + SCADA WinCC",
                                "tecnologia": "Separación Óptica (NIR) + Clasificación por IA",
                                "material": "Acero Anti-abrasión de Alta Resistencia",
                                "consumo": "≈ 980 kW (Operación continua)",
                                "eficiencia": "95.0% Disponibilidad Operativa",
                                "estandares": "CE • ISO 14001 • ISO 45001"
                            }
                        },
                        {
                            "id": 2,
                            "title": "Línea de Procesamiento de Chocolate",
                            "desc": "Automatización integral para el control de temperatura, templado continuo y moldeado de chocolate de grado exportación.",
                            "specs": "Capacidad: 2000 kg/h | Ubicación: Bogotá, CO",
                            "image": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png",
                            "image2": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115213579_choco%20bN%202.png",
                            "specsTable": {
                                "capacidad": "2,000 kg/h",
                                "ubicacion": "Bogotá, Colombia",
                                "aplicacion": "Atemperado y Moldeado de Chocolate",
                                "control": "PLC Siemens + HMI Industrial + SCADA",
                                "tecnologia": "Industria 4.0 / SCR700 + Telemetría IoT",
                                "material": "AISI 304 / 316L Food Grade",
                                "consumo": "≈ 196 kW (Promedio de Operación)",
                                "eficiencia": "98.5% (Disponibilidad Operativa)",
                                "estandares": "CE • HACCP • GMP"
                            }
                        },
                        {
                            "id": 3,
                            "title": "Planta de Pelletizado de Plástico",
                            "desc": "Extrusión de alto rendimiento con desgasificación al vacío, filtrado hidráulico continuo y corte bajo agua.",
                            "specs": "Capacidad: 1200 kg/h | Ubicación: Lima, PE",
                            "image": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png",
                            "image2": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png",
                            "specsTable": {
                                "capacidad": "1,200 kg/h (PTCS185)",
                                "ubicacion": "Lima, Perú",
                                "aplicacion": "Extrusión y Pelletizado de Alto Rendimiento",
                                "control": "PLC + HMI / 440 VAC, 3F, 60 Hz",
                                "tecnologia": "Doble Desgasificación / Vacío Activo",
                                "material": "Tornillo de 185 mm / Relación L/D 18-42",
                                "consumo": "≈ 366 kW (Aproximado)",
                                "eficiencia": "Water Ring Die Face / Doble Pistón",
                                "estandares": "CE • ISO 9001 (Operadores: 2-4)"
                            }
                        }
                    ]
                }
            },
            {
                "id": "nosotros-final",
                "type": "nosotros-final",
                "data": {
                    "imageOpacity": 100,
                    "backgroundImageUrl": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780101709421_industria%204.0.png",
                    "filterOpacity": 47
                }
            },
            {
                "id": "nosotros-cards",
                "type": "nosotros-cards",
                "data": {
                    "card-image-0": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780102328210_1.%20auto%20industrial.png",
                    "card-image-opacity-0": 100,
                    "card-filter-opacity-0": 33,
                    "card-image-1": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780108959001_2..png",
                    "card-image-opacity-1": 100,
                    "card-filter-opacity-1": 46,
                    "card-image-2": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780109274450_3..png",
                    "card-filter-opacity-2": 26,
                    "card-image-opacity-2": 95,
                    "card-image-3": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780109303034_4..png",
                    "card-image-opacity-3": 91,
                    "card-filter-opacity-3": 8,
                    "card-image-4": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780109329322_5..png",
                    "card-image-opacity-4": 96,
                    "card-filter-opacity-4": 18,
                    "card-image-5": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780109347525_6..png",
                    "card-filter-opacity-5": 14,
                    "card-image-opacity-5": 95
                }
            }
        ]
    },
    {
        "id": "wte",
        "title": "Valorización Energética",
        "slug": "/waste-to-energy",
        "modules": [
            {
                "id": "content",
                "type": "content",
                "data": {
                    "sections": [
                        {
                            "id": "plantas-rsu",
                            "num": "01",
                            "title": "PLANTAS RSU",
                            "subtitle": "Tratamiento y Valorización Integral",
                            "desc": "Tratamiento y valorización integral de residuos sólidos urbanos mediante procesos mecánicos y automatizados.",
                            "longDesc": "Diseñamos y construimos sistemas robustos para la recepción, separación y clasificación de Residuos Sólidos Urbanos (RSU). Nuestras plantas combinan tolvas de alimentación de alta resistencia, trómeles de clasificación por tamaños, separadores balísticos y sistemas de aspiración para separar eficazmente la fracción orgánica de los materiales reciclables.",
                            "color": "#22C55E",
                            "iconName": "Factory",
                            "bgImage": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780809355262_RSU_2026_SMQ.png",
                            "specs": [
                                "Capacidad modular desde 10 hasta 100 Ton/hora",
                                "Clasificación automática de fracciones finas y orgánicas",
                                "Sistemas de control de olores y polvo integrados",
                                "Banda transportadora de alta resistencia con velocidad regulable"
                            ],
                            "disableFilters": true
                        },
                        {
                            "id": "cdr-rdf",
                            "num": "02",
                            "title": "PRODUCCIÓN DE CDR / RDF",
                            "subtitle": "Combustible Derivado de Residuos",
                            "desc": "Procesamiento de combustibles derivados de residuos de alto poder calorífico para uso industrial y energético.",
                            "longDesc": "Transformamos residuos no reciclables de origen comercial e industrial en Combustible Derivado de Residuos (CDR / RDF). Mediante trituración secundaria, secado térmico y separación de metales, producimos un combustible alternativo de alta calidad y poder calorífico constante, ideal para su uso en hornos de cemento y plantas termoeléctricas.",
                            "color": "#F59E0B",
                            "iconName": "Flame",
                            "bgImage": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780808319447_CDR_PAGE.png",
                            "specs": [
                                "Poder calorífico neto de hasta 18-22 MJ/kg",
                                "Humedad final controlada inferior al 15%",
                                "Sistemas de separación de cloro y metales pesados en línea",
                                "Granulometría homogénea ajustable a requerimiento del cliente"
                            ],
                            "disableFilters": true
                        },
                        {
                            "id": "clasificacion-inteligente",
                            "num": "03",
                            "title": "CLASIFICACIÓN INTELIGENTE",
                            "subtitle": "Separación Óptica por Inteligencia Artificial",
                            "desc": "Separación automatizada por NIR, inducción y sistemas multisensoriales con inteligencia artificial para máxima precisión y pureza.",
                            "longDesc": "Incorporamos tecnología de última generación en clasificación óptica (NIR) y visión artificial. Nuestros sistemas inteligentes detectan y separan plásticos por polímeros (PET, PEAD, PP, PS, PVC), cartón y metales a velocidades extremas, optimizando los rendimientos de pureza hasta en un 98% mediante soplado neumático de alta precisión.",
                            "color": "#06B6D4",
                            "iconName": "Eye",
                            "bgImage": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780809234570_fluo_ia.png",
                            "specs": [
                                "Resolución de escaneo NIR de hasta 320 canales de detección",
                                "Algoritmos de aprendizaje profundo para reconocimiento de formas y marcas",
                                "Tasa de eyección neumática precisa con respuesta en milisegundos",
                                "Monitoreo y telemetría de pureza en tiempo real en la nube"
                            ],
                            "disableFilters": true
                        },
                        {
                            "id": "recuperacion-materiales",
                            "num": "04",
                            "title": "RECUPERACIÓN DE MATERIALES",
                            "subtitle": "Tecnologías de Separación Avanzada",
                            "desc": "Extracción eficiente de metales, plásticos y materiales reciclables con tecnologías de separación avanzadas.",
                            "longDesc": "Desarrollamos soluciones integrales de separación física para la recuperación de valiosos metales ferrosos y no ferrosos (aluminio, cobre) mediante separadores de corrientes de Foucault (Eddy Current). Combinado con cribas magnéticas y separadores mecánicos de aire, logramos desviar toneladas de recursos útiles de los vertederos.",
                            "color": "#8B5CF6",
                            "iconName": "Recycle",
                            "bgImage": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780809061744_04_material_recovery.png",
                            "specs": [
                                "Separadores de corrientes de Foucault de alta frecuencia",
                                "Tambores magnéticos de tierras raras de gran poder de atracción",
                                "Sistemas de clasificación por corrientes de aire (Air Classifiers)",
                                "Máximo retorno de inversión gracias al alto índice de material recuperado"
                            ],
                            "disableFilters": true
                        },
                        {
                            "id": "conversion-energetica",
                            "num": "05",
                            "title": "CONVERSIÓN ENERGÉTICA",
                            "subtitle": "Gasificación, Pirólisis y Co-generación",
                            "desc": "Tecnologías de gasificación, pirólisis, biomasa y co-generación para transformar residuos en energía útil.",
                            "longDesc": "Implementamos sistemas avanzados de conversión térmica (Waste-to-Energy). Nuestras soluciones incluyen reactores de gasificación de lecho fluidizado y plantas de pirólisis para convertir fracciones de polímeros y biomasa en gas de síntesis (syngas), vapor de proceso y energía eléctrica limpia, respetando las más estrictas normativas ambientales globales.",
                            "color": "#EC4899",
                            "iconName": "Zap",
                            "bgImage": "https://images.unsplash.com/photo-1513828742140-ccaa34f3158e?auto=format&fit=crop&q=80&w=800",
                            "specs": [
                                "Reactores de conversión térmica de alta eficiencia termodinámica",
                                "Sistemas de lavado de gases de combustión multietapa (SCR/SnCR)",
                                "Generación combinada de calor y electricidad (CHP / Co-generación)",
                                "Cumplimiento con Directiva Europea de Emisiones Industriales (IED)"
                            ],
                            "images": [
                                {
                                    "url": "https://images.unsplash.com/photo-1513828742140-ccaa34f3158e?auto=format&fit=crop&q=80&w=800",
                                    "name": "CONVERSIÓN ENERGÉTICA"
                                },
                                {
                                    "url": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780809601884_pirolisis_1.png",
                                    "name": "Nombre del Equipo"
                                },
                                {
                                    "url": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780809824744_04_material_recovery.png",
                                    "name": "Nombre del Equipo"
                                },
                                {
                                    "url": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780810858568_pirolisis_1.png",
                                    "name": "Nombre del Equipo"
                                }
                            ],
                            "disableFilters": true
                        },
                        {
                            "id": "plantas-llave-en-mano",
                            "num": "06",
                            "title": "PLANTAS LLAVE EN MANO",
                            "subtitle": "Ingeniería, Fabricación e Instalación Integral",
                            "desc": "Ingeniería completa desde el diseño, fabricación, instalación y automatización hasta la puesta en marcha y soporte operativo.",
                            "longDesc": "Ofrecemos proyectos llave en mano (EPC) desde el diseño conceptual del layout hasta la instalación, automatización mediante PLC/SCADA y capacitación del personal operativo. Nos encargamos de todo el ciclo del proyecto para entregar plantas de valorización listas para producir valor de forma confiable, segura y rentable.",
                            "color": "#22C55E",
                            "iconName": "HardHat",
                            "bgImage": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
                            "specs": [
                                "Ingeniería civil, mecánica y eléctrica unificada en 3D (BIM)",
                                "Gabinetes de control centralizados con protocolos Profinet / Ethernet",
                                "Puesta en marcha y pruebas de rendimiento de planta (FAT / SAT)",
                                "Soporte técnico posventa garantizado y stock de repuestos"
                            ]
                        }
                    ]
                }
            }
        ]
    },
    {
        "id": "envasadoras",
        "title": "Envasadoras Rotativas",
        "slug": "/envasadoras",
        "modules": [
            {
                "id": "doypack-data",
                "type": "doypack-product",
                "data": {
                    "heroTitle": "ENVASADORA ROTATIVA DOYPACK",
                    "heroTitleColor": "#ffffff",
                    "heroSubtitle": "8 estaciones de trabajo para llenado y sellado automático de bolsas preformadas.",
                    "heroSubtitleColor": "#ffffff",
                    "heroDesc": "Diseñada con estándares de ingeniería de gama alta para café, chocolate, snacks, alimentos para mascotas, polvos y granulados. Automatización limpia y confiable para su planta de producción.",
                    "heroDescColor": "rgba(255, 255, 255, 0.6)",
                    "heroDescAlign": "justify",
                    "heroMedia": "/rotary_doypack_machine.png",
                    "heroPoster": "",
                    "s1Title": "¿CÓMO FUNCIONA?",
                    "s1TitleColor": "#00d2ff",
                    "s1Desc": "Secuencia automatizada sincronizada en 8 estaciones para máxima eficiencia y sellado hermético.",
                    "s1DescColor": "rgba(255, 255, 255, 0.5)",
                    "s1DescAlign": "center",
                    "s2Title": "ESPECIFICACIONES PRINCIPALES",
                    "s2TitleColor": "#ffffff",
                    "s3Title": "APLICACIONES INDUSTRIALES",
                    "s3TitleColor": "#00d2ff",
                    "s3Desc": "Módulo dosificador adaptable a todo tipo de densidades y formas de producto.",
                    "s3DescColor": "rgba(255, 255, 255, 0.5)",
                    "s3DescAlign": "center",
                    "s4Title": "VENTAJAS DE CLASE MUNDIAL",
                    "s4TitleColor": "#ffffff",
                    "s5Title": "ESPECIFICACIONES TÉCNICAS",
                    "s5TitleColor": "#ffffff",
                    "s6Title": "DEMOSTRACIÓN DE OPERACIÓN",
                    "s6TitleColor": "#ffffff",
                    "s6Desc": "Observe la velocidad constante y la precisión de giro en secuencia continua 24/7.",
                    "s6DescColor": "rgba(255, 255, 255, 0.5)",
                    "s6DescAlign": "center",
                    "s7Title": "MÓDULOS DE DOSIFICACIÓN Y CONFIGURACIONES",
                    "s7TitleColor": "#ffffff",
                    "s7Desc": "La envasadora puede equiparse de forma modular con diferentes cabezales según el tipo de producto.",
                    "s7DescColor": "rgba(255, 255, 255, 0.5)",
                    "s7DescAlign": "center",
                    "ctaTitle": "¿LISTO PARA AUTOMATIZAR SU ENVASADO?",
                    "ctaTitleColor": "#ffffff",
                    "ctaDesc": "Nuestro equipo de ingenieros puede diseñar la solución a la medida adecuada para su producto, velocidad requerida y capacidades físicas de planta.",
                    "ctaDescColor": "rgba(255, 255, 255, 0.6)",
                    "ctaDescAlign": "center",
                    "stations": [
                        {
                            "id": 1,
                            "title": "Recepción de bolsa",
                            "desc": "Alimentación automática de bolsas preformadas desde el almacén horizontal.",
                            "iconName": "Inbox"
                        },
                        {
                            "id": 2,
                            "title": "Apertura automática",
                            "desc": "Sistema neumático y mecánico de ventosas de vacío que abre la bolsa por arriba y por abajo.",
                            "iconName": "Maximize2"
                        },
                        {
                            "id": 3,
                            "title": "Verificación de apertura",
                            "desc": "Sensor de detección infrarrojo para asegurar apertura correcta antes de la dosificación.",
                            "iconName": "Eye"
                        },
                        {
                            "id": 4,
                            "title": "Dosificación",
                            "desc": "Llenado preciso del producto mediante sistema sincronizado (balanza, tornillo o volumétrico).",
                            "iconName": "Layers"
                        },
                        {
                            "id": 5,
                            "title": "Asentamiento",
                            "desc": "Mesa vibratoria que asienta el producto en el fondo de la bolsa para optimizar espacio.",
                            "iconName": "ArrowDownToLine"
                        },
                        {
                            "id": 6,
                            "title": "Inyección de nitrógeno",
                            "desc": "Inyección opcional de gas inerte para eliminar oxígeno y extender la vida útil.",
                            "iconName": "Wind"
                        },
                        {
                            "id": 7,
                            "title": "Sellado térmico",
                            "desc": "Barras de sellado caliente sellan la bolsa a presión constante, seguido de sellado por enfriamiento.",
                            "iconName": "Flame"
                        },
                        {
                            "id": 8,
                            "title": "Descarga",
                            "desc": "Salida de la bolsa terminada a la banda transportadora de producto terminado.",
                            "iconName": "LogOut"
                        }
                    ],
                    "kpis": [
                        {
                            "value": "60",
                            "unit": "BOLSAS/MIN",
                            "label": "Rendimiento Máximo",
                            "desc": "Producción continua a alta velocidad"
                        },
                        {
                            "value": "8",
                            "unit": "ESTACIONES",
                            "label": "Estaciones de Trabajo",
                            "desc": "Secuencia optimizada de envasado"
                        },
                        {
                            "value": "10-2500 g",
                            "unit": "RANGO DE LLENADO",
                            "label": "Flexibilidad de Peso",
                            "desc": "Múltiples volúmenes soportados"
                        },
                        {
                            "value": "±1%",
                            "unit": "PRECISIÓN",
                            "label": "Control de Margen",
                            "desc": "Desperdicio de producto casi nulo"
                        },
                        {
                            "value": "304 SS",
                            "unit": "ACERO INOXIDABLE",
                            "label": "Estructura Robusta",
                            "desc": "Sanidad y limpieza de grado alimenticio"
                        },
                        {
                            "value": "24/7",
                            "unit": "OPERACIÓN INDUSTRIAL",
                            "label": "Ciclo de Fatiga Extremo",
                            "desc": "Diseñado para turnos continuos"
                        }
                    ],
                    "applications": [
                        {
                            "name": "Café",
                            "icon": "☕",
                            "desc": "Café en grano o molido con válvula desgasificadora"
                        },
                        {
                            "name": "Chocolate",
                            "icon": "🍫",
                            "desc": "Chocolates, bombones y confitería fina"
                        },
                        {
                            "name": "Nueces",
                            "icon": "🥜",
                            "desc": "Frutos secos, almendras, pistaches y semillas"
                        },
                        {
                            "name": "Snacks",
                            "icon": "🍪",
                            "desc": "Papas fritas, galletas y botanas saladas"
                        },
                        {
                            "name": "Pet Food",
                            "icon": "🐶",
                            "desc": "Croquetas y alimento seco para mascotas"
                        },
                        {
                            "name": "Granola",
                            "icon": "🌾",
                            "desc": "Cereales, granola y mezclas de avena"
                        },
                        {
                            "name": "Polvos",
                            "icon": "🧂",
                            "desc": "Harinas, especias, proteínas y colágeno"
                        },
                        {
                            "name": "Dulces",
                            "icon": "🍬",
                            "desc": "Gomitas, caramelos y golosinas"
                        }
                    ],
                    "advantages": [
                        {
                            "title": "CAMBIO RÁPIDO DE FORMATO",
                            "desc": "Ajuste de guías motorizadas desde el HMI. Configuración sencilla y sin herramientas mecánicas en menos de 10 minutos para distintos tamaños de bolsa.",
                            "highlight": "Eficiencia Operativa"
                        },
                        {
                            "title": "OPERACIÓN TOTALMENTE AUTOMÁTICA",
                            "desc": "Monitoreo absoluto mediante PLC de gama alta. Detección inteligente de \"no bolsa - no llenado\" y \"bolsa no abierta - no sellado\" para evitar desperdicio.",
                            "highlight": "Cero Desperdicio"
                        },
                        {
                            "title": "ALTA PRECISIÓN DE DOSIFICADO",
                            "desc": "Integración sincronizada con sistemas de pesaje multicabezal europeos, asegurando una dosificación exacta al gramo en cada ciclo de llenado.",
                            "highlight": "Ingeniería Alemana"
                        },
                        {
                            "title": "DISEÑO SANITARIO PREMIUM",
                            "desc": "Construcción íntegra en acero inoxidable SUS304 sin rincones ciegos, facilitando procesos de limpieza rápida e higiene total en planta.",
                            "highlight": "Certificación Alimenticia"
                        }
                    ],
                    "specs": [
                        {
                            "param": "Modelo",
                            "value": "SMQ-DP8"
                        },
                        {
                            "param": "Estaciones de trabajo",
                            "value": "8 Estaciones"
                        },
                        {
                            "param": "Velocidad de envasado",
                            "value": "40 - 60 bolsas/min (Depende del producto y dimensiones)"
                        },
                        {
                            "param": "Potencia instalada",
                            "value": "2.5 kW / 3F / 220V o 380V"
                        },
                        {
                            "param": "Consumo de aire requerido",
                            "value": "0.6 MPa / Caudal de 350 L/min"
                        },
                        {
                            "param": "Material de construcción",
                            "value": "Estructura y contacto con producto de Acero Inoxidable SUS304"
                        },
                        {
                            "param": "Tipo de bolsas preformadas",
                            "value": "Doypack (Stand-up), con zipper, de 3 sellos, tipo fuelle"
                        },
                        {
                            "param": "Rango de dimensiones de bolsa",
                            "value": "Ancho: 100 - 210 mm | Largo: 100 - 350 mm"
                        },
                        {
                            "param": "Sistema de control integrado",
                            "value": "PLC Siemens / Omron + HMI Touchscreen a color de 10\""
                        }
                    ],
                    "configurations": [
                        {
                            "name": "Tornillo sinfín para polvos",
                            "desc": "Ideal para dosificación de polvos finos y harinas de forma hermética."
                        },
                        {
                            "name": "Balanza multicabezal",
                            "desc": "Máxima velocidad para granulados, snacks and piezas irregulares."
                        },
                        {
                            "name": "Dosificador volumétrico",
                            "desc": "Ideal para productos homogéneos, legumbres y granos."
                        },
                        {
                            "name": "Llenado de líquidos",
                            "desc": "Válvulas antigoteo para salsas, cremas y fluidos de alta viscosidad."
                        },
                        {
                            "name": "Inyección de nitrógeno",
                            "desc": "Preservación de atmósfera modificada para extender frescura."
                        },
                        {
                            "name": "Detector de metales",
                            "desc": "Inspección de seguridad integrada antes de la salida final."
                        },
                        {
                            "name": "Checkweigher integrado",
                            "desc": "Balanza dinámica de salida con rechazo automático por peso fuera de margen."
                        }
                    ]
                }
            }
        ]
    },
    {
        "id": "industria-reciclaje-y-plasticos",
        "title": "Reciclaje y Plásticos",
        "slug": "/industria/reciclaje-y-plasticos",
        "modules": [
            {
                "id": "sector-data",
                "type": "sector-detail",
                "data": {
                    "title": "Reciclaje y Plásticos",
                    "subtitle": "Tecnología líder para la economía circular",
                    "description": "Diseñamos y fabricamos sistemas llave en mano de alto rendimiento para el procesamiento, triturado, lavado y extrusión de polímeros. Nuestras soluciones maximizan la pureza del material recuperado y reducen el consumo energético operativo.",
                    "heroImage": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png",
                    "stats": [
                        {
                            "label": "Eficiencia de Lavado",
                            "value": "99.2%"
                        },
                        {
                            "label": "Rendimiento Máximo",
                            "value": "2.5 Ton/h"
                        },
                        {
                            "label": "Ahorro de Energía",
                            "value": "Hasta 30%"
                        },
                        {
                            "label": "Vida Útil Husillo",
                            "value": "25,000h+"
                        }
                    ],
                    "items": [
                        {
                            "id": "trituracion",
                            "title": "Trituradoras",
                            "description": "Trituradoras de alto rendimiento para plásticos y residuos. Configuración modular de 1 eje, 2 ejes y 4 ejes.",
                            "longDescription": "Nuestros sistemas de trituración industrial están optimizados para el procesamiento primario de purgas, bidones, tuberías y materiales post-consumo. Cuentan con cuchillas de aleación templada de alta resistencia y sistemas de empuje hidráulico inteligente.",
                            "features": [
                                "Corte multieje de baja velocidad y alto torque",
                                "Cuchillas rotativas de fácil sustitución",
                                "Ejes de transmisión con acoplamiento de seguridad"
                            ],
                            "image": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png"
                        },
                        {
                            "id": "pelletizado",
                            "title": "Sistemas de Pelletizado",
                            "description": "Corte por anillo de agua o bajo agua para una geometría de pellet perfecta, libre de polvo y con humedad inferior al 1%.",
                            "longDescription": "Integración automática desde el cabezal de extrusión. El sistema controla automáticamente la velocidad de las cuchillas en función del flujo de polímero, previniendo aglomeraciones y garantizando un tamaño homogéneo de pellet comercial.",
                            "features": [
                                "Ajuste automático de presión de cuchillas",
                                "Secadora centrífuga de acero inoxidable",
                                "Intercambiador térmico integrado de agua"
                            ],
                            "image": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png"
                        },
                        {
                            "id": "lavado",
                            "title": "Módulos de Lavado y Secado",
                            "description": "Plantas integradas de trituración húmeda, separación por densidad en tinas de flotación y lavado en caliente para eliminar adhesivos y contaminantes.",
                            "longDescription": "Desarrolladas para flujos post-consumo altamente contaminados (como botellas PET, film agrícola y envases rígidos). Ofrecemos secadoras mecánicas de alta velocidad y desgasificadores neumáticos para entregar material seco listo para extrusión directa.",
                            "features": [
                                "Separación gravimétrica de alta precisión",
                                "Lavado alcalino térmico continuo",
                                "Secadoras mecánicas con autolimpieza rotor"
                            ],
                            "image": "https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png"
                        }
                    ]
                }
            }
        ]
    }
]
};

const migrateCMSState = (state) => {
    if (!state) return state;
    
    // Ensure SolutionsMenu is removed and TechnologyMenu has order 2
    if (state.menus && Array.isArray(state.menus)) {
        const hasSolutions = state.menus.some(m => m.componentName === 'SolutionsMenu');
        if (hasSolutions) {
            state.menus = state.menus
                .filter(m => m.componentName !== 'SolutionsMenu')
                .map(m => {
                    if (m.componentName === 'TechnologyMenu') {
                        return { ...m, name: 'Tecnología', order: 2 };
                    }
                    if (m.order > 2) {
                        return { ...m, order: m.order - 1 };
                    }
                    return m;
                });
        }
    }

    if (!state.pages) return state;
    try {
        let serialized = JSON.stringify(state);
        // Reemplazar de forma masiva los colores esmeralda/verde por verde lima
        serialized = serialized
            .replace(/#10B981/g, '#84CC16')
            .replace(/#10b981/g, '#84CC16')
            .replace(/#34D399/g, '#84CC16')
            .replace(/#34d399/g, '#84CC16')
            .replace(/rgba\(16,\s*185,\s*129/g, 'rgba(132, 204, 22')
            .replace(/rgba\(52,\s*211,\s*153/g, 'rgba(132, 204, 22')
            .replace(/"glowColor":\s*"emerald"/g, '"glowColor": "lime"')
            .replace(/"glowColor":\s*"green"/g, '"glowColor": "lime"');
        return JSON.parse(serialized);
    } catch (e) {
        console.error("[CMS] Error migrando estado del CMS:", e);
        return state;
    }
};

export const CMSProvider = ({ children }) => {
    const [cmsState, setCmsState] = useState(() => {
        const saved = localStorage.getItem('smqCMS');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const parsedSettings = parsed.settings || {};
                
                // Si la versión local es diferente a la versión del código base, actualizar versión sin descartar caché
                if (parsedSettings.appVersion !== initialCMSState.settings.appVersion) {
                    console.warn(`[CMS] Versión local obsoleta (${parsedSettings.appVersion} vs ${initialCMSState.settings.appVersion}). Actualizando versión.`);
                    parsedSettings.appVersion = initialCMSState.settings.appVersion;
                }

                const loadedState = {
                    settings: {
                        ...initialCMSState.settings,
                        ...parsedSettings,
                        logoUrl: parsedSettings.logoUrl || initialCMSState.settings.logoUrl,
                        faviconUrl: parsedSettings.faviconUrl || initialCMSState.settings.faviconUrl,
                        appVersion: parsedSettings.appVersion || initialCMSState.settings.appVersion,
                        textJustify: parsedSettings.textJustify !== undefined ? parsedSettings.textJustify : initialCMSState.settings.textJustify,
                        disableImageFilters: parsedSettings.disableImageFilters !== undefined ? parsedSettings.disableImageFilters : initialCMSState.settings.disableImageFilters
                    },
                    menus: parsed.menus || initialCMSState.menus,
                    pages: parsed.pages || initialCMSState.pages
                };
                return migrateCMSState(loadedState);
            } catch (e) {
                localStorage.removeItem('smqCMS');
                return initialCMSState;
            }
        }
        return initialCMSState;
    });

    const [isEditorMode, setIsEditorMode] = useState(() => {
        return localStorage.getItem('editorMode') === 'true';
    });

    const [isLoadedFromCloud, setIsLoadedFromCloud] = useState(false);

    // 1. Función para Descargar estado global desde Nube
    const syncFromCloud = async (force = true) => {
        try {
            // Utilizamos la URL pública directa con cache-busting (timestamp) para forzar la actualización en Producción sin esperar horas de caché
            const { data: urlData } = supabase.storage.from('media').getPublicUrl('cms-state.json');
            const url = `${urlData.publicUrl}?t=${Date.now()}`;

            const res = await fetch(url, { cache: 'no-store' });
            if (res.ok) {
                const text = await res.text();
                // Check if not empty
                if (text) {
                    const parsed = JSON.parse(text);
                    const parsedSettings = parsed.settings || {};
                    
                    // Si el estado en la nube pertenece a una versión anterior, actualizar versión en el estado sin resetear a inicial
                    if (parsedSettings.appVersion !== initialCMSState.settings.appVersion) {
                        console.warn(`[CMS] Versión en la nube obsoleta (${parsedSettings.appVersion} vs ${initialCMSState.settings.appVersion}). Actualizando versión.`);
                        parsedSettings.appVersion = initialCMSState.settings.appVersion;
                    }

                    const cloudState = {
                        settings: {
                            ...initialCMSState.settings,
                            ...parsedSettings,
                            logoUrl: parsedSettings.logoUrl || initialCMSState.settings.logoUrl,
                            faviconUrl: parsedSettings.faviconUrl || initialCMSState.settings.faviconUrl,
                            appVersion: parsedSettings.appVersion || initialCMSState.settings.appVersion,
                            textJustify: parsedSettings.textJustify !== undefined ? parsedSettings.textJustify : initialCMSState.settings.textJustify,
                            disableImageFilters: parsedSettings.disableImageFilters !== undefined ? parsedSettings.disableImageFilters : initialCMSState.settings.disableImageFilters
                        },
                        menus: parsed.menus || initialCMSState.menus,
                        pages: parsed.pages || initialCMSState.pages
                    };

                    const saved = localStorage.getItem('smqCMS');
                    let localState = null;
                    if (saved) {
                        try {
                            localState = JSON.parse(saved);
                        } catch (e) {}
                    }

                    const cloudTime = cloudState.settings?.updatedAt || 0;
                    const localTime = localState?.settings?.updatedAt || 0;

                    if (force || !localState || cloudTime >= localTime) {
                        console.log(`[CMS] Sincronización: Cargando estado desde la Nube (force=${force}, cloudTime=${cloudTime}, localTime=${localTime}).`);
                        setCmsState(migrateCMSState(cloudState));
                    } else {
                        console.log(`[CMS] Sincronización: Reteniendo cambios locales más recientes (localTime=${localTime} > cloudTime=${cloudTime}).`);
                    }
                }
            } else {
                console.warn("CMS state no encontrado en nube o error. Código:", res.status);
            }
        } catch (e) {
            console.error("No se pudo cargar el CMS desde la nube:", e);
        } finally {
            setIsLoadedFromCloud(true);
        }
    };

    useEffect(() => {
        // Sincronización inicial inteligente en lugar de sobreescritura ciega
        syncFromCloud(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 2. Guardar cambios en LocalStorage y EN LA NUBE (Solo si es editor)
    useEffect(() => {
        // Guardado local inmediato
        localStorage.setItem('smqCMS', JSON.stringify(cmsState));

        // Actualizar favicon en vivo para todos los visitantes
        if (cmsState.settings.faviconUrl) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = cmsState.settings.faviconUrl;
        }
    }, [cmsState]);

    // 2.5 Inject Dynamic Global Image Filters and Overlay CSS custom variables
    useEffect(() => {
        const root = document.documentElement;
        const sharpness = cmsState.settings.globalImageSharpness ?? 100;
        const disableFilters = cmsState.settings.disableImageFilters ?? false;
        
        // If sharpness is 100%, blur is 0px. If less than 100%, we add soft blur.
        const blurValue = (!disableFilters && sharpness < 100) ? Math.max(0, (100 - sharpness) / 10) : 0;
        // Contrast scales up as sharpness is higher than 100%
        const contrastValue = (!disableFilters && sharpness > 100) ? sharpness : 100;

        root.style.setProperty('--global-image-blur', `${blurValue}px`);
        root.style.setProperty('--global-image-contrast', `${contrastValue}%`);
        root.style.setProperty('--global-filter-color', disableFilters ? 'transparent' : (cmsState.settings.globalFilterColor || '#000000'));
        root.style.setProperty('--global-filter-opacity', disableFilters ? '0' : `${(cmsState.settings.globalFilterOpacity ?? 75) / 100}`);
        root.style.setProperty('--global-text-align', cmsState.settings.textJustify ? 'justify' : 'left');
    }, [cmsState.settings.globalImageSharpness, cmsState.settings.globalFilterColor, cmsState.settings.globalFilterOpacity, cmsState.settings.textJustify, cmsState.settings.disableImageFilters]);

    const syncToCloud = async (stateOverride = null) => {
        try {
            const targetState = stateOverride || cmsState;
            const content = JSON.stringify(targetState);
            const { data, error } = await supabase.storage.from('media').upload('cms-state.json', content, {
                contentType: 'application/json',
                upsert: true,
                cacheControl: '0'
            });
            if (error) {
                console.error("Error subiendo Cambios a la Nube:", error);
                window.dispatchEvent(new CustomEvent('cmsAutoSaved', { detail: { success: false, error: error.message || JSON.stringify(error) } }));
                throw error;
            } else {
                console.log("Cambios de diseño guardados (FORZADO) en la Nube.");
                window.dispatchEvent(new CustomEvent('cmsAutoSaved', { detail: { success: true } }));
            }
        } catch (err) {
            console.error("Error subiendo Cambios a la Nube", err);
            window.dispatchEvent(new CustomEvent('cmsAutoSaved', { detail: { success: false, error: err.message || JSON.stringify(err) } }));
            throw err;
        }
    };

    // Autoguardado en la Nube con Debounce (solo en modo Editor y una vez cargado de la nube)
    useEffect(() => {
        if (!isEditorMode || !isLoadedFromCloud) return;

        const timer = setTimeout(() => {
            console.log("[CMS] Guardando cambios de forma automática en la nube...");
            syncToCloud(cmsState).catch(() => {
                // Capturar el error del catch de syncToCloud de forma silenciosa en el autoguardado
            });
        }, 1500);

        return () => clearTimeout(timer);
    }, [cmsState, isEditorMode, isLoadedFromCloud]);

    useEffect(() => {
        localStorage.setItem('editorMode', isEditorMode.toString());
        window.dispatchEvent(new Event('editorModeChangedGlobal'));
    }, [isEditorMode]);

    const updateSettings = (updates) => {
        setCmsState(prev => ({
            ...prev,
            settings: { ...prev.settings, ...updates, updatedAt: Date.now() }
        }));
    };

    const updateMenus = (menus) => {
        setCmsState(prev => ({
            ...prev,
            menus,
            settings: { ...prev.settings, updatedAt: Date.now() }
        }));
    };

    const updatePages = (pages) => {
        setCmsState(prev => ({
            ...prev,
            pages,
            settings: { ...prev.settings, updatedAt: Date.now() }
        }));
    };

    const updatePageModule = (pageId, moduleId, newData) => {
        setCmsState(prev => {
            const pageExists = prev.pages.some(page => page.id === pageId);
            let updatedPages = prev.pages.map(page => {
                if (page.id === pageId) {
                    let found = false;
                    const modules = page.modules.map(mod => {
                        if (mod.id === moduleId) {
                            found = true;
                            return { ...mod, data: { ...mod.data, ...newData } };
                        }
                        return mod;
                    });
                    if (!found) {
                        modules.push({ id: moduleId, type: moduleId, data: newData });
                    }
                    return { ...page, modules };
                }
                return page;
            });

            if (!pageExists) {
                updatedPages = [
                    ...updatedPages,
                    {
                        id: pageId,
                        title: pageId === 'wte' ? 'Valorización Energética' : pageId,
                        slug: pageId === 'wte' ? '/waste-to-energy' : `/${pageId}`,
                        modules: [{ id: moduleId, type: moduleId, data: newData }]
                    }
                ];
            }

            return {
                ...prev,
                pages: updatedPages,
                settings: { ...prev.settings, updatedAt: Date.now() }
            };
        });
    };

    return (
        <CMSContext.Provider value={{
            cmsState,
            updateSettings,
            updateMenus,
            updatePages,
            updatePageModule,
            isEditorMode,
            setIsEditorMode,
            syncFromCloud,
            syncToCloud
        }}>
            {children}
        </CMSContext.Provider>
    );
};

export const useCMS = () => useContext(CMSContext);
