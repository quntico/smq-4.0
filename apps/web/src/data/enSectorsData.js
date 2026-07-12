export const enSectorsData = {
  'reciclaje': {
    title: 'Recycling and Circular Economy Industry',
    subtitle: 'Leading technology for circular economy and material recovery',
    description: 'We design and manufacture high-performance turnkey systems for processing, shredding, washing, and extrusion of polymers, metals, and waste. Our solutions maximize the purity of recovered material and reduce operational energy consumption.',
    stats: [
      { label: 'Washing Efficiency', value: '99.2%' },
      { label: 'Max Throughput', value: '2.5 Ton/h' },
      { label: 'Energy Savings', value: 'Up to 30%' },
      { label: 'Screw Lifespan', value: '25,000h+' }
    ],
    items: [
      {
        id: 'plasticos',
        title: 'Plastics Recycling Lines',
        description: 'Washing, extrusion, and pelletizing of high-purity polymers.',
        longDescription: 'Integrated modular modules for the complete removal of adhesives, contaminants, and labels in post-consumer PET bottles, and pelletizing with residual moisture below 1%.',
        features: ['[icon:Shield] High-friction wet shredding', '[icon:Zap] Density flotation in gravimetric tanks', '[icon:Cpu] Vacuum extrusion and degassing'],
        tableHeaders: ['Model', 'Capacity', 'Efficiency', 'Power', 'Material']
      },
      {
        id: 'metales',
        title: 'Metal Separation and Shredding',
        description: 'Magnetic separation and shredding of ferrous and non-ferrous scrap.',
        longDescription: 'Eddy current separators and magnetic overbelts for classifying and shredding aluminum, copper, and steel profiles with micrometric precision.',
        features: ['[icon:Shield] High Gauss neodymium rare earth magnet', '[icon:Zap] Multi-pole rotor for Eddy currents', '[icon:Cpu] Automated non-ferrous metal classification'],
        tableHeaders: ['Model', 'Separator Type', 'Capacity', 'Efficiency', 'Power']
      },
      {
        id: 'rsu',
        title: 'Municipal Solid Waste (MSW) Treatment',
        description: 'Separation, shredding, and preparation of alternative fuels.',
        longDescription: 'Turnkey mechanical and biological sorting systems combining screening trommels, NIR optical separators, and pneumatic degassers.',
        features: ['[icon:Shield] Rotary sizing trommels', '[icon:Zap] NIR optical polymer separation', '[icon:Cpu] Refuse-Derived Fuel (RDF) preparation'],
        tableHeaders: ['Model', 'MSW Component', 'Capacity', 'Sorting Grade', 'Power']
      },
      {
        id: 'recuperacion',
        title: 'Advanced Material Recovery',
        description: 'Automated sorting of dry byproducts such as paper, cardboard, and glass.',
        longDescription: 'Automatic sorting stations optimized for the reverse flow of municipal plants, using ballistic screening technology.',
        features: ['[icon:Shield] Ballistic separation of flat and rolling fractions', '[icon:Zap] High-resolution inductive optical sensors', '[icon:Cpu] SCADA network control integrated into control room'],
        tableHeaders: ['Model', 'Application', 'Throughput', 'Separation', 'Structure']
      },
      {
        id: 'economia-circular',
        title: 'Circular Economy Strategies',
        description: 'Compounding, special additives, and complete valorization of waste.',
        longDescription: 'Technical advisory and development for transforming production scrap into high-quality secondary raw materials ready for injection.',
        features: ['[icon:Shield] Pilot compounding of polymers and natural fibers', '[icon:Zap] Advanced additives for viscosity restoration', '[icon:Cpu] Custom modular micronization plants'],
        tableHeaders: ['Model', 'Service/Equipment', 'Capacity', 'Standard', 'Warranty']
      }
    ]
  },
  'alimentos': {
    title: 'Food & Beverage Industry',
    subtitle: 'Optimal hygiene, precision, and absolute control',
    description: 'Equipment designed under the strictest sanitation standards (HACCP / FDA) and food processing. We develop advanced technologies for high-efficiency processing, dosing, and packaging.',
    stats: [
      { label: 'Process Efficiency', value: '99.5%' },
      { label: 'Sanitary Grade', value: 'FDA / HACCP' },
      { label: 'Continuous Operation', value: '24/7' },
      { label: 'Autonomous Control', value: 'Yes' }
    ],
    items: [
      {
        id: 'lavado',
        title: 'WASHING AND PEELING LINES',
        description: 'Integrated systems for washing, disinfection, cutting, and peeling of vegetables and fruits.',
        longDescription: 'Our bubble washing equipment and peeling systems ensure delicate and optimal treatment of raw materials, reducing waste and complying with rigorous hygienic standards.',
        features: [
          '[icon:Shield] Full construction in AISI 304 stainless steel',
          '[icon:Zap] Efficient water consumption with recirculation system',
          '[icon:Cpu] Belt speed and air flow regulation'
        ],
        tableHeaders: ["Model", "Function", "Capacity", "Power", "Material"]
      },
      {
        id: 'produccion',
        title: 'FOOD PRODUCTION LINES',
        description: 'Complete processing lines for potato chips, chocolate, pasta, fruits, and snacks.',
        longDescription: 'Modular integrated lines designed for continuous processing with maximum energy efficiency and product consistency in every batch.',
        features: [
          '[icon:Shield] Full automatic control via touch PLC panel',
          '[icon:Zap] Efficient and smart heating systems',
          '[icon:Cpu] Easy cleaning with CIP (Clean in Place) standard'
        ],
        tableHeaders: ["Model", "Product", "Capacity", "Energy/Power", "Line Weight"]
      },
      {
        id: 'empaquetado',
        title: 'PACKAGING AND FILLING LINES',
        description: 'Automatic packaging systems for powders, liquids, pouches, cartons, and bottles.',
        longDescription: 'Advanced high-speed and hermetic sealing systems for all types of rigid and flexible formats.',
        features: [
          '[icon:Shield] Precision sensors for container presence detection',
          '[icon:Zap] High-precision servomotors from leading brands',
          '[icon:Cpu] Hygienic construction and maintenance-free'
        ],
        tableHeaders: ["Model", "Packaging Type", "Speed", "Power", "Precision"]
      },
      {
        id: 'separadoras',
        title: 'SEPARATION SYSTEMS',
        description: 'Smart sorting and separation systems by color, size, and weight.',
        longDescription: 'High-tech optical and gravimetric systems to ensure maximum purity of your final product, eliminating foreign bodies and out-of-spec pieces.',
        features: [
          '[icon:Shield] Ultra high-resolution CCD cameras (Full HD)',
          '[icon:Zap] Ultra-fast response pneumatic ejectors',
          '[icon:Cpu] Artificial intelligence algorithms for complex sorting'
        ],
        tableHeaders: ["Model", "Sorting Criteria", "Capacity", "Precision", "Cameras/Sensors"]
      }
    ]
  },
  'packaging': {
    title: 'Packaging & Conversion',
    subtitle: 'Speed, hermetic sealing, and smart packaging',
    description: 'Advanced primary and secondary packaging systems for rigid and flexible formats. We offer Doypack packaging machines, volumetric filling lines, and film conversion machinery.',
    stats: [
      { label: 'Filling Speed', value: '150 ppm' },
      { label: 'Seal Hermeticity', value: '99.99%' },
      { label: 'Adjustment Time', value: '< 15 min' },
      { label: 'Weight Precision', value: '±0.2%' }
    ],
    items: [
      {
        id: 'flexible',
        title: 'Premade Pouch (PMP)',
        description: 'Automatic rotary fillers for premade pouch, stand-up pouch, and zipper bags.',
        longDescription: 'Automatic packaging flow for premade pouch bags with vacuum opening, inkjet coding, volumetric/multi-head filling, and optional gas injection for extended product shelf life.',
        features: ['[icon:Shield] Servo-synchronized pneumatic opening and sealing', '[icon:Zap] Inert N2 gas injection for preservation', '[icon:Cpu] Full PLC control with pre-recorded recipes'],
        tableHeaders: ['Specification', 'PMP-180', 'PMP-250']
      },
      {
        id: 'rigido',
        title: 'Rigid Container Lines',
        description: 'Linear/rotary fillers and cappers for plastic and glass bottles.',
        longDescription: 'Gravity dosing systems or inductive flowmeters that guarantee spill-free filling. Automatic cappers adaptable to crown, plastic thread, or metal caps.',
        features: ['[icon:Shield] High-precision electromagnetic flowmeters', '[icon:Zap] Adjustable capping torque by magnetic clutch', '[icon:Cpu] Automatic CIP (Clean In Place) without disassembling parts'],
        tableHeaders: ['Model', 'Container Type', 'Capacity', 'Filling Precision', 'Hygiene Grade']
      },
      {
        id: 'impresion',
        title: 'Printing and Flexo Systems',
        description: 'Central drum flexographic and digital printing systems for plastic films.',
        longDescription: 'Advanced technology for high-speed printing on PE, PP, BOPP, PET, and paper films. Efficient hot air drying and UV curing systems.',
        features: ['[icon:Shield] Servo-motorized automatic color registration', '[icon:Zap] High thermal efficiency forced air dryers', '[icon:Cpu] Film tension control by load cell'],
        tableHeaders: ['Model', 'Max Width', 'Printing Speed', 'Colors', 'Resolution']
      },
      {
        id: 'etiquetado',
        title: 'Industrial Labelers',
        description: 'Self-adhesive label applicators and shrink sleeve tunnels.',
        longDescription: 'Precise and uniform placement of labels on bottles, jars, and boxes. Systems with high-torque stepper motors and high-speed photocell reading.',
        features: ['[icon:Shield] High-response servo-motorized dispensers', '[icon:Zap] Contrast and ultrasound sensors for clear labels', '[icon:Cpu] Top stabilizing belt for perfect alignment'],
        tableHeaders: ['Model', 'Applicator Type', 'Max Speed', 'Label Width', 'Tolerance']
      },
      {
        id: 'conversion',
        title: 'Film Conversion and Rewinding',
        description: 'Slitters, rewinders, and thermoformers for flexible film.',
        longDescription: 'Precision conversion machinery to fraction wide rolls, rewind films, and manufacture thermoformed packaging from rigid sheet.',
        features: ['[icon:Shield] Quick-change pneumatic expandable shafts', '[icon:Zap] Circular and shear cutting blades', '[icon:Cpu] Automatic blade positioning'],
        tableHeaders: ['Model', 'Roll Width', 'Unwind Diameter', 'Cutting Speed', 'Tension Control']
      }
    ]
  },
  'construccion': {
    title: 'Construction Materials & Infrastructure',
    subtitle: 'Robustness and consistency for highly demanding processes',
    description: 'We develop complete extrusion and shredding lines for manufacturing wood plastic composites (WPC), corrugated sheets, and structural aggregate shredding/dosing systems.',
    stats: [
      { label: 'Extruder L/D Ratio', value: '38:1' },
      { label: 'Hourly Output', value: '800 kg/h' },
      { label: 'Motor Power', value: '132 kW+' },
      { label: 'Alloy Structure', value: 'Hardox Steel' }
    ],
    items: [
      {
        id: 'materiales',
        title: 'Material Dosing Plants',
        description: 'Systems for mixing and dosing aggregates, cements, and additives.',
        longDescription: 'Comprehensive design of silos, dynamic weighing scales, and intensive twin-shaft mixers to ensure maximum homogeneity of ready-mix mortar and concrete.',
        features: ['[icon:Shield] High-precision self-cleaning load cells', '[icon:Zap] Planetary turbine mixers with carbide paddles', '[icon:Cpu] Automated batch dosing SCADA systems'],
        tableHeaders: ['Model', 'Mix Type', 'Capacity', 'Precision', 'Mixer Power']
      },
      {
        id: 'compuestos',
        title: 'WPC Extrusion Lines',
        description: 'Conical and parallel twin-screw extruders for wood-plastic composites.',
        longDescription: 'Our WPC co-extrusion systems achieve perfect dispersion of wood sawdust or rice husk with PE/PP/PVC, producing decks, facades, and frames with excellent mechanical properties and impermeability.',
        features: ['[icon:Shield] Co-rotating or conical screws with bimetallic barrel', '[icon:Zap] Gravimetric dosers with torque control', '[icon:Cpu] Fast vacuum cooling calibrators'],
        tableHeaders: ['Model', 'Extruder Type', 'Max Capacity', 'L/D Ratio', 'Motor Power']
      },
      {
        id: 'materiales-reciclados',
        title: 'Rubble and C&D Valorization',
        description: 'Shredders and screeners for rubble and recycled asphalt.',
        longDescription: 'Robust solutions for the recovery of recycled aggregates from C&D (Construction and Demolition) waste. Systems equipped with overbelt magnets and air separators.',
        features: ['[icon:Shield] High-torque jaw and impact crushers', '[icon:Zap] Ferrite/neodymium magnetic separation belts', '[icon:Cpu] Multi-deck fine screening vibrating screens'],
        tableHeaders: ['Model', 'Crusher Type', 'Input Capacity', 'Mouth Opening', 'Power']
      },
      {
        id: 'infraestructura',
        title: 'Precast Concrete',
        description: 'Automatic systems for manufacturing precast concrete and pipes.',
        longDescription: 'Dynamic formwork and accelerated curing machinery for beams, concrete pipes, and architectural panels. Includes telemetry and setting maturation monitoring.',
        features: ['[icon:Shield] Self-vibrating pneumatic molds with frequency control', '[icon:Zap] Fast overhead concrete transport systems', '[icon:Cpu] Wireless IoT setting temperature monitoring'],
        tableHeaders: ['Model', 'Precast Type', 'Production Cycle', 'Hydraulic Pressure', 'Max Dimensions']
      }
    ]
  },
  'agroindustria': {
    title: 'Agroindustry & Agricultural Processing',
    subtitle: 'Performance and optimization in the field and plant',
    description: 'Turnkey solutions for handling, cleaning, drying, and sorting grains, seeds, and coffee, as well as complete plants for feed production.',
    stats: [
      { label: 'Drying Capacity', value: '50 Ton/h' },
      { label: 'Mixing CV', value: '< 5%' },
      { label: 'Extruder Pressure', value: '120 Bar' },
      { label: 'Conditioning', value: 'Up to 95°C' }
    ],
    items: [
      {
        id: 'procesamiento',
        title: 'Grain Handling and Cleaning',
        description: 'Pneumatic cleaners and gravity tables for grains, seeds, and legumes.',
        longDescription: 'Primary and secondary cleaning that removes dust, straw, and foreign seeds. Gravity tables sort by specific weight, ensuring homogeneous batches.',
        features: ['[icon:Shield] Interchangeable double-level vibrating screens', '[icon:Zap] Integrated dust aspirators with bag filters', '[icon:Cpu] Gravity tables with VFD adjustable oscillation'],
        tableHeaders: ['Model', 'Cleaning Type', 'Capacity', 'Screening Efficiency', 'Fan Power']
      },
      {
        id: 'balanceados',
        title: 'Animal Feed Lines',
        description: 'Integrated milling, dosing, mixing, and pelletizing plants.',
        longDescription: 'Hygienic design for animal feed. Includes double-pass steam conditioner for cooking and starch gelatinization, and pelletizing dies in tempered alloy.',
        features: ['[icon:Shield] Hammer mills with quick screen change', '[icon:Zap] High-speed twin-shaft paddle mixers', '[icon:Cpu] Pelletizers with thermal injection conditioner'],
        tableHeaders: ['Model', 'Mixer/Pelletizer Type', 'Throughput', 'Pellet Diameter', 'Motor Power']
      },
      {
        id: 'postcosecha',
        title: 'Cooling and Calibration',
        description: 'Washing, waxing, disinfection, and optical sorting systems for fresh fruits.',
        longDescription: 'Precision post-harvest treatment. Optical sorting systems that analyze color, diameter, and external defects of the fruit to pack only premium product.',
        features: ['[icon:Shield] Rotary brush washers with UV disinfection', '[icon:Zap] Controlled hot air tunnel dryers', '[icon:Cpu] Multi-channel optical sorting by colorimetric cameras'],
        tableHeaders: ['Model', 'Fruit Type', 'Line Capacity', 'Sorting Channels', 'Structure']
      },
      {
        id: 'automatizacion',
        title: 'Silo and Loading Monitoring',
        description: 'Automatic temperature control and aeration systems for agricultural silos.',
        longDescription: 'Digitalization of grain storage. Multipoint digital thermometry that monitors temperature in real time and automatically activates aeration fans.',
        features: ['[icon:Shield] Hanging temperature probes with RS485 bus', '[icon:Zap] Capacitive and continuous radar level sensors', '[icon:Cpu] Control panel with SCADA and Telegram/Email alerts'],
        tableHeaders: ['Model', 'Sensor/Control Type', 'Probe Reach', 'Protocol', 'Cabinet Protection']
      }
    ]
  },
  'manufactura': {
    title: 'Health & Advanced Manufacturing',
    subtitle: 'Sterile precision and high-speed automation',
    description: 'Packaging, dosing, and assembly solutions under GMP standards and strict hygiene. We offer automated lines for medical devices, pharmaceuticals, and non-woven conversion.',
    stats: [
      { label: 'Room Class', value: 'Class 100 / ISO 5' },
      { label: 'Dosing Tolerance', value: '±0.1%' },
      { label: 'Average OEE', value: '95%' },
      { label: 'Standard', value: 'GMP / FDA' }
    ],
    items: [
      {
        id: 'medico',
        title: 'Medical Device Lines',
        description: 'Forming and packaging machinery for syringes, masks, and dressings.',
        longDescription: 'Automatic cleanroom assembly systems for medical supplies. They feature high-precision unwinding, ultrasonic welding, and hermetic Blister packaging.',
        features: ['[icon:Shield] High-frequency ultrasonic welding (20/40 kHz)', '[icon:Zap] Integrated thermoforming blister packers', '[icon:Cpu] Cognex artificial vision systems for defect rejection'],
        tableHeaders: ['Model', 'Device Manufactured', 'Throughput', 'Welding', 'Allowed Materials']
      },
      {
        id: 'farma',
        title: 'Dosing and Filling (GMP)',
        description: 'Automatic fillers for vials, ampoules, pre-filled syringes, and powder dosers.',
        longDescription: 'Sterile design free of blind corners, made of AISI 316L stainless steel with mirror polish. High-precision dosing using peristaltic or non-contact ceramic piston pumps.',
        features: ['[icon:Shield] Quick-change peristaltic dosing pumps', '[icon:Zap] Laminar flow and liquid nitrogen sealing systems', '[icon:Cpu] Connectivity for data validation compliant with CFR 21 Part 11'],
        tableHeaders: ['Model', 'Vial/Container Format', 'Filling Speed', 'Volumetric Range', 'Dosing Precision']
      },
      {
        id: 'conversion',
        title: 'Non-Woven Conversion',
        description: 'Slitters, folders, and rewinders for non-woven fabrics (Spunbond, Meltblown).',
        longDescription: 'Machinery designed for longitudinal cutting and automatic folding of wet wipes, non-woven gauze, and disposable surgical drapes with controlled wetting systems.',
        features: ['[icon:Shield] Longitudinal cutting by high-hardness rotary blades', '[icon:Zap] Automatic liquid lotion dosing systems', '[icon:Cpu] Multi-format mechanical folders (Z, C, W fold)'],
        tableHeaders: ['Model', 'Usable Width', 'Unwind Diameter', 'Folding Capacity', 'Installed Power']
      },
      {
        id: 'produccion',
        title: 'Assembly Systems',
        description: 'Multi-axis robotic lines for primary packaging and high-density packing.',
        longDescription: 'Robotic cells integrated with high-speed rotary indexers to mount, screw, glue, and test components in real time.',
        features: ['[icon:Shield] High-precision mechanical cam rotary indexers', '[icon:Zap] Articulated or SCARA robotic arms (Stäubli/Fanuc)', '[icon:Cpu] Integrated leak and electrical conductivity testing'],
        tableHeaders: ['Model', 'Automation Type', 'Assembly Cycle', 'Number of Axes', 'Communication Interface']
      }
    ]
  },
  'energia': {
    title: 'Energy & Industrial Utilities',
    description: 'Design and manufacture of industrial boilers, biomass pelletizing plants, and modular Waste-to-Energy (WTE) plants for waste energy valorization.',
    subtitle: 'Thermal generation, cogeneration, and energy efficiency systems',
    stats: [
      { label: 'Boiler Efficiency', value: '92%' },
      { label: 'Thermal Power', value: 'Up to 20 MW' },
      { label: 'Operating Pressure', value: '25 Bar' },
      { label: 'Fuel', value: 'Biomass / Gas / MSW' }
    ],
    items: [
      {
        id: 'wte',
        title: 'Energy Valorization (Waste-to-Energy)',
        description: 'Modular gasification and clean incineration plants for solid waste.',
        longDescription: 'Advanced controlled combustion systems that transform non-recyclable MSW fractions into thermal and electrical energy. Includes multi-cyclone flue gas cleaning and wet scrubbing compliant with Environmental Directives.',
        features: ['[icon:Shield] Air/water cooled reciprocating combustion grate', '[icon:Zap] High-pressure water-tube heat recovery boilers', '[icon:Cpu] Active carbon and chemical lime gas filtering systems'],
        tableHeaders: ['Model', 'Conversion Type', 'Daily Capacity', 'Electrical Efficiency', 'Emissions Standard']
      },
      {
        id: 'biomasa',
        title: 'Biomass Pelletizing',
        description: 'Industrial shredding, drying, and pelletizing lines for wood and byproducts.',
        longDescription: 'Conversion of forestry waste, husks, and straw into high-density pellets. Pelletizers feature reinforced die rings and automatic lubrication systems.',
        features: ['[icon:Shield] Triple-pass thermal rotary drum dryers', '[icon:Zap] High-speed refining mills with pneumatic deflectors', '[icon:Cpu] Heavy-duty pelletizers with forced roller lubrication'],
        tableHeaders: ['Model', 'Biomass Type', 'Pelletizing Yield', 'Pellet Diameter', 'Input Moisture']
      },
      {
        id: 'energia-industrial',
        title: 'Cogeneration and Boilers',
        description: 'Fire-tube and water-tube boilers for steam, hot water, or thermal fluid.',
        longDescription: 'High-efficiency industrial heat generation equipment. Modulating low NOx burners compatible with natural gas, LPG, biogas, and liquid fuels.',
        features: ['[icon:Shield] Integrated economizers for feedwater preheating', '[icon:Zap] Self-programmed low NOx industrial burners', '[icon:Cpu] Full automation of blowdown and water level by PLC'],
        tableHeaders: ['Model', 'Generation Type', 'Thermal Capacity', 'Operating Pressure', 'Primary Fuel']
      },
      {
        id: 'servicios',
        title: 'Efficiency Audits',
        description: 'Thermographic studies, thermal balance optimization, and heat recovery.',
        longDescription: 'Solutions aimed at reducing industrial carbon footprint. Waste heat recovery in stacks to preheat combustion air or boiler water.',
        features: ['[icon:Shield] High-resolution infrared thermography for insulation', '[icon:Zap] Continuous flue gas measurement and chemical efficiency', '[icon:Cpu] Custom design of exhaust gas heat exchangers'],
        tableHeaders: ['Model', 'Service Type', 'Execution Time', 'Potential Savings', 'Return Guarantee']
      }
    ]
  },
  'inteligencia-artificial': {
    title: 'ARTIFICIAL INTELLIGENCE',
    subtitle: 'Deep learning and autonomous optimization',
    description: 'We implement AI algorithms that learn from historical and real-time processes to predict failures, optimize complex control variables, and detect anomalies impossible to see with the naked eye.',
    stats: [
      { label: 'Failure Reduction', value: 'Up to 60%' },
      { label: 'Predictive Precision', value: '> 98%' },
      { label: 'Processing Time', value: '< 10 ms' },
      { label: 'Estimated ROI', value: '< 8 Months' }
    ],
    items: [
      {
        id: 'vision',
        title: 'Artificial Vision (Deep Learning)',
        description: 'Inspection of complex cosmetic defects with neural networks.',
        longDescription: 'Optical inspection systems that surpass traditional rule-based vision. We train convolutional models (CNN) to detect micro-cracks, color variations, and organic defects at speeds over 1,000 pieces per minute.',
        features: ['[icon:Shield] Tolerance to natural lighting variations', '[icon:Zap] Defect classification with superhuman precision', '[icon:Cpu] Direct integration to high-speed pneumatic ejectors'],
        tableHeaders: ['Application', 'Speed', 'Resolution', 'Hardware', 'Precision']
      },
      {
        id: 'mantenimiento',
        title: 'Predictive Maintenance (PdM)',
        description: 'Prevention of unplanned downtime through spectral vibration analysis.',
        longDescription: 'We predict catastrophic failures in motors, gearboxes, and bearings weeks before they occur. AI models analyze the spectral signature of vibration and temperature in real time to alert about unbalance, cavitation, or bearing wear.',
        features: ['[icon:Shield] Anomaly Detection and Random Forest models', '[icon:Zap] Drastic reduction of MTTR (Mean Time to Repair)', '[icon:Cpu] Automatic alerts directly to CMMS / SAP PM system'],
        tableHeaders: ['Detectable Failure', 'Required Sensor', 'Anticipation', 'Diagnosis', 'Effectiveness']
      }
    ]
  },
  'smart-factory': {
    title: 'SMART FACTORY',
    subtitle: 'Fully interconnected lines with autonomous decision making',
    description: 'We transform conventional plants into Cyber-Physical ecosystems where machinery, logistics systems, and operators interact frictionlessly, ensuring agility and mass customization without sacrificing operational efficiency.',
    stats: [
      { label: 'Flexibility Increase', value: '+40%' },
      { label: 'Changeover Time', value: '-80%' },
      { label: 'Inventory Reduction', value: 'WIP -30%' },
      { label: 'Traceability', value: 'Unitary (Lot 1)' }
    ],
    items: [
      {
        id: 'agv',
        title: 'Autonomous Mobile Robotics (AMR/AGV)',
        description: 'Flexible intralogistics without physical guides.',
        longDescription: 'We eliminate rigid conveyor belts. We deploy fleets of mobile robots that navigate using SLAM (Simultaneous Localization and Mapping), feeding lines just-in-time (JIT) and dynamically adapting their routes to obstacles.',
        features: ['[icon:Shield] Natural laser navigation without tapes or reflectors', '[icon:Zap] Centralized Fleet Management', '[icon:Cpu] Integration with automatic doors and freight elevators'],
        tableHeaders: ['Robot Type', 'Payload', 'Max Speed', 'Stopping Precision', 'Navigation']
      },
      {
        id: 'mes',
        title: 'MES / MOM Execution Systems',
        description: 'Orchestration of production, recipes, and quality from ERP to machine.',
        longDescription: 'The digital bridge between business (IT) and plant (OT). An MES system executes work orders, downloads recipes directly to the PLC, captures real material consumption, and calculates global OEE with absolute precision.',
        features: ['[icon:Shield] Full genealogy and Forward & Backward traceability', '[icon:Zap] Real-time Statistical Process Control (SPC)', '[icon:Cpu] ISA-95 and ISA-88 regulatory compliance'],
        tableHeaders: ['Module', 'Primary Function', 'Interfaces', 'Reporting', 'Compliance']
      }
    ]
  },
  'digital-twin': {
    title: 'DIGITAL TWIN',
    subtitle: 'Immersive simulation and virtual commissioning',
    description: 'The Digital Twin is an exact replica of your physical assets. It allows simulating line modifications, validating PLC logic before building, and monitoring the wear of remote equipment in a hyper-realistic 3D environment.',
    stats: [
      { label: 'Startup Time', value: '-60%' },
      { label: 'Collision Risk', value: '0%' },
      { label: 'Testing Savings', value: 'Up to 70%' },
      { label: 'Physical Precision', value: 'High Fidelity' }
    ],
    items: [
      {
        id: 'virtual-commissioning',
        title: 'Virtual Commissioning (VC)',
        description: 'PLC code testing against a 3D model with real physics.',
        longDescription: 'We validate up to 90% of the control software in the office. We connect the real PLC to a 3D twin that simulates gravity, friction, sensors, and actuators. This eliminates site delays and prevents costly mechanical collisions.',
        features: ['[icon:Shield] Kinematic and dynamic multi-body simulation', '[icon:Zap] I/O signal emulation via protocols like OPC-UA / Profinet', '[icon:Cpu] Safety validation (e-stops) in a secure environment'],
        tableHeaders: ['Phase', 'Technique', 'Fidelity', 'Hardware In Loop', 'Benefit']
      }
    ]
  },
  'plc-motion': {
    title: 'PLC + MOTION',
    subtitle: 'Microsecond determinism for ultra-fast machinery',
    description: 'We master the world\'s most demanding control architectures. We implement platforms that synchronize dozens of servo axes in perfect harmony, allowing packaging and processing speeds that break industry records.',
    stats: [
      { label: 'Network Jitter', value: '< 1 µs' },
      { label: 'Cycle Time', value: '125 µs' },
      { label: 'Synchronization', value: 'Nanoseconds' },
      { label: 'Integrated Safety', value: 'SIL 3 / PLe' }
    ],
    items: [
      {
        id: 'motion-control',
        title: 'Axis Control and Complex Kinematics',
        description: 'Electronic cams, CNC interpolation, and integrated robotic control.',
        longDescription: 'We synchronize master and slave axes using real-time Ethernet networks (EtherCAT, Profinet IRT). We replace complex mechanical gear trains with dynamic electronic cam profiles, allowing format changes at the push of a button.',
        features: ['[icon:Shield] Advanced motion profiles (Gearing, Camming, Flying Saw)', '[icon:Zap] Spatial interpolation for Delta, SCARA, and Anthropomorphic arms', '[icon:Cpu] Energy regeneration back to the continuous DC bus'],
        tableHeaders: ['Function', 'Typical Application', 'Position Precision', 'Required Network', 'Mechanical Advantage']
      }
    ]
  },
  'iiot-edge': {
    title: 'IIOT + EDGE',
    subtitle: 'Ubiquitous connectivity and distributed processing',
    description: 'Free the data trapped on the plant floor. Our IIoT architectures connect legacy sensors and machinery islands directly to the cloud via lightweight protocols, processing critical telemetry at the Edge for zero latency.',
    stats: [
      { label: 'Network Load', value: '-80% Bandwidth' },
      { label: 'Edge Latency', value: '< 5 ms' },
      { label: 'Security', value: 'TLS 1.3 / X.509' },
      { label: 'Connectivity', value: 'Global (5G/LTE)' }
    ],
    items: [
      {
        id: 'edge-computing',
        title: 'Industrial Edge Nodes',
        description: 'Powerful computing directly next to the machine.',
        longDescription: 'We prevent cloud congestion by filtering and analyzing data on ruggedized Edge servers. They run Docker containers with local analytical models, making control decisions in milliseconds, operating even if the internet connection drops.',
        features: ['[icon:Shield] Application deployment via containers (Kubernetes Edge)', '[icon:Zap] Unified OT/IT protocols: OPC-UA to MQTT Sparkplug B', '[icon:Cpu] Integrated industrial firewall with DPI (Deep Packet Inspection)'],
        tableHeaders: ['Layer', 'Technology Used', 'Primary Function', 'Reaction Time', 'Cloud Dependency']
      }
    ]
  },
  'energia-inteligente': {
    title: 'SMART ENERGY',
    subtitle: 'Quantifiable sustainability and active efficiency',
    description: 'Comprehensive energy monitoring solutions to comply with ISO 50001 standards. Real-time visibility of water, compressed air, gas, and electricity consumption (W.A.G.E.S.) to reduce costs and reach Zero Emissions goals.',
    stats: [
      { label: 'Cost Reduction', value: 'Up to 25%' },
      { label: 'ROI', value: '12-18 Months' },
      { label: 'Measurement Precision', value: 'Class 0.2s' },
      { label: 'CO2 Reporting', value: 'Automatic' }
    ],
    items: [
      {
        id: 'ems',
        title: 'Energy Management System (EMS)',
        description: 'Analytical dashboards for carbon footprint and power quality.',
        longDescription: 'We correlate energy consumption with actual production (kWh per ton produced). The EMS identifies compressed air leaks, penalties for low power factor, and out-of-peak motor starts, optimizing the electric bill.',
        features: ['[icon:Shield] Power analyzers with harmonic and micro-cut detection', '[icon:Zap] Automatic calculation of energy baseline and targets (EnPIs)', '[icon:Cpu] Integration of microgrids (Solar Panels and BESS Systems)'],
        tableHeaders: ['WAGES Variable', 'Measurement Technology', 'Precision', 'Derived Metric', 'Savings Opportunity']
      }
    ]
  },
  'smq-os': {
    title: 'SMQ OS™ PLATFORM',
    subtitle: 'The definitive Operating System for the industrial sector',
    description: 'SMQ OS™ centralizes all digital plant assets in a high-performance web platform. It combines SCADA, MES, maintenance, and executive analytics in a single pane of glass, designed with the fluidity of the best modern applications.',
    stats: [
      { label: 'Accessibility', value: '100% Web (HTML5)' },
      { label: 'Data Handling', value: 'Big Data / Time-Series' },
      { label: 'Security Auth', value: 'SSO / Active Directory' },
      { label: 'Integration', value: 'RESTful API / GraphQL' }
    ],
    items: [
      {
        id: 'platform',
        title: 'Modules and Unified Architecture',
        description: 'The total convergence of industrial information silos.',
        longDescription: 'Unlike cumbersome legacy desktop systems, SMQ OS™ is built on next-generation reactive web architectures. It allows managers to check OEE reports from their smartphones, while operators control the machine from industrial tablets on the plant floor.',
        features: ['[icon:Shield] Premium UI/UX design and native dark mode to reduce eye strain', '[icon:Zap] Alarm management system by hierarchies and Push/SMS notifications', '[icon:Cpu] Time-Series database engine capable of millions of writes per second'],
        tableHeaders: ['SMQ OS™ Module', 'Functionality', 'User Type', 'Database', 'Optimal Device']
      }
    ]
  },
  'economia-circular': {
    title: 'CIRCULAR ECONOMY',
    subtitle: 'Waste valorization and zero-waste processes (Zero Waste)',
    description: 'We design systems that convert industrial byproducts into valuable resources. Smart sorting solutions, effluent treatment, and post-consumer plastics recycling that enable genuinely sustainable manufacturing.',
    stats: [
      { label: 'Material Recovery', value: 'Up to 95%' },
      { label: 'Loop Closing', value: 'Bottle-to-Bottle' },
      { label: 'Fresh Water Savings', value: '> 70%' },
      { label: 'Certification', value: 'ESG Compliance' }
    ],
    items: [
      {
        id: 'reciclaje-avanzado',
        title: 'Recycling Plants and Optical Sorting',
        description: 'Value extraction from the mixed waste stream.',
        longDescription: 'Complete washing, grinding, and extrusion lines for plastics (PET, HDPE). We incorporate high-resolution NIR (Near Infrared) optical separators that discriminate polymers by their chemical signature at incredible speeds, ensuring food-grade purity (FDA/EFSA).',
        features: ['[icon:Shield] NIR spectrometry for resin classification by type and color', '[icon:Zap] Hot washing systems with chemical and thermal recovery', '[icon:Cpu] Automatic ultra-fine melt filtration'],
        tableHeaders: ['Circular Process', 'Key Technology', 'Separation Efficiency', 'Throughput', 'Final Application']
      }
    ]
  }
};
