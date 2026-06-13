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
        appVersion: '6.84',
        globalImageSharpness: 100,
        globalFilterColor: '#000000',
        globalFilterOpacity: 75,
        textJustify: true,
        disableImageFilters: false,
    },
    menus: [
        { id: '1', name: 'Industrias', componentName: 'IndustriesMenu', order: 1 },
        { id: '2', name: 'Soluciones', componentName: 'SolutionsMenu', order: 2 },
        { id: '3', name: 'Maquinaria', componentName: 'MachineryMenu', order: 3 },
        { id: '4', name: 'Tecnología', componentName: 'TechnologyMenu', order: 4 },
        { id: '6', name: 'Waste to Energy', componentName: 'WasteToEnergyMenu', order: 5 },
        { id: '5', name: 'Empresa', componentName: 'CompanyMenu', order: 6 },
    ],
    pages: [
        {
            id: 'home',
            title: 'Home',
            slug: '/',
            modules: [
                {
                    id: 'hero-1',
                    type: 'hero',
                    data: {
                        title1: 'Soluciones Industriales',
                        title2: 'de Alta Ingeniería',
                        subtitle: 'Maquinaria avanzada para reciclaje, procesamiento de alimentos y automatización industrial.'
                    }
                },
                {
                    id: 'proyectos',
                    type: 'proyectos',
                    data: {
                        title: 'Proyectos <span class="text-[#F5C400]">Destacados</span>',
                        subtitle: 'Casos de éxito y plantas industriales implementadas por nuestro equipo.',
                        items: [
                            {
                                id: 1,
                                title: 'Planta de Procesamiento RSU 600 TPD',
                                desc: 'Clasificación mecanizada, separación de reciclables y valorización de residuos sólidos urbanos para generación de combustibles alternativos.',
                                specs: 'Capacidad: 600 Ton/Día | Ubicación: Monterrey, MX',
                                image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113554541_planta%20600%201.png',
                                image2: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780113700590_planta%20600%202.png',
                                specsTable: {
                                    capacidad: '600 Toneladas / Día',
                                    ubicacion: 'Monterrey, Nuevo León, MX',
                                    aplicacion: 'Clasificación y Separación de Residuos Sólidos Urbanos (RSU)',
                                    control: 'PLC Siemens S7-1500 + SCADA WinCC',
                                    tecnologia: 'Separación Óptica (NIR) + Clasificación por IA',
                                    material: 'Acero Anti-abrasión de Alta Resistencia',
                                    consumo: '≈ 980 kW (Operación continua)',
                                    eficiencia: '95.0% Disponibilidad Operativa',
                                    estandares: 'CE • ISO 14001 • ISO 45001'
                                }
                            },
                            {
                                id: 2,
                                title: 'Línea de Procesamiento de Chocolate',
                                desc: 'Automatización integral para el control de temperatura, templado continuo y moldeado de chocolate de grado exportación.',
                                specs: 'Capacidad: 2000 kg/h | Ubicación: Bogotá, CO',
                                image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115231575_choco%20color%202.png',
                                image2: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780115213579_choco%20bN%202.png',
                                specsTable: {
                                    capacidad: '2,000 kg/h',
                                    ubicacion: 'Bogotá, Colombia',
                                    aplicacion: 'Atemperado y Moldeado de Chocolate',
                                    control: 'PLC Siemens + HMI Industrial + SCADA',
                                    tecnologia: 'Industria 4.0 / SCR700 + Telemetría IoT',
                                    material: 'AISI 304 / 316L Food Grade',
                                    consumo: '≈ 196 kW (Promedio de Operación)',
                                    eficiencia: '98.5% (Disponibilidad Operativa)',
                                    estandares: 'CE • HACCP • GMP'
                                }
                            },
                            {
                                id: 3,
                                title: 'Planta de Pelletizado de Plástico',
                                desc: 'Extrusión de alto rendimiento con desgasificación al vacío, filtrado hidráulico continuo y corte bajo agua.',
                                specs: 'Capacidad: 1200 kg/h | Ubicación: Lima, PE',
                                image: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117410783_pellet%201.png',
                                image2: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1780117396267_pellet%20BN.png',
                                specsTable: {
                                    capacidad: '1,200 kg/h (PTCS185)',
                                    ubicacion: 'Lima, Perú',
                                    aplicacion: 'Extrusión y Pelletizado de Alto Rendimiento',
                                    control: 'PLC + HMI / 440 VAC, 3F, 60 Hz',
                                    tecnologia: 'Doble Desgasificación / Vacío Activo',
                                    material: 'Tornillo de 185 mm / Relación L/D 18-42',
                                    consumo: '≈ 366 kW (Aproximado)',
                                    eficiencia: 'Water Ring Die Face / Doble Pistón',
                                    estandares: 'CE • ISO 9001 (Operadores: 2-4)'
                                }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'wte',
            title: 'Waste to Energy',
            slug: '/waste-to-energy',
            modules: []
        }
    ]
};

export const CMSProvider = ({ children }) => {
    const [cmsState, setCmsState] = useState(() => {
        const saved = localStorage.getItem('smqCMS');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const parsedSettings = parsed.settings || {};
                
                // Si la versión local es diferente a la versión del código base, descartar caché antigua
                if (parsedSettings.appVersion !== initialCMSState.settings.appVersion) {
                    console.warn(`[CMS] Versión local obsoleta (${parsedSettings.appVersion} vs ${initialCMSState.settings.appVersion}). Reseteando caché.`);
                    localStorage.removeItem('smqCMS');
                    return initialCMSState;
                }

                return {
                    settings: {
                        ...initialCMSState.settings,
                        ...parsedSettings,
                        logoUrl: parsedSettings.logoUrl || initialCMSState.settings.logoUrl,
                        faviconUrl: parsedSettings.faviconUrl || initialCMSState.settings.faviconUrl,
                        appVersion: parsedSettings.appVersion || initialCMSState.settings.appVersion,
                        textJustify: parsedSettings.textJustify !== undefined ? parsedSettings.textJustify : initialCMSState.settings.textJustify,
                        disableImageFilters: parsedSettings.disableImageFilters !== undefined ? parsedSettings.disableImageFilters : initialCMSState.settings.disableImageFilters
                    },
                    menus: (() => {
                        let parsedMenus = parsed.menus || initialCMSState.menus;
                        if (!parsedMenus.some(m => m.componentName === 'WasteToEnergyMenu')) {
                            const hasCompany = parsedMenus.find(m => m.componentName === 'CompanyMenu');
                            const companyOrder = hasCompany ? hasCompany.order : 5;
                            parsedMenus = [
                                ...parsedMenus.filter(m => m.componentName !== 'CompanyMenu'),
                                { id: '6', name: 'Waste to Energy', componentName: 'WasteToEnergyMenu', order: companyOrder },
                                ...(hasCompany ? [{ ...hasCompany, order: companyOrder + 1 }] : [])
                            ].sort((a, b) => a.order - b.order);
                        }
                        return parsedMenus;
                    })(),
                    pages: parsed.pages || initialCMSState.pages
                };
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
    const syncFromCloud = async () => {
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
                    
                    // Si el estado en la nube pertenece a una versión anterior, usar el estado base inicial corregido
                    if (parsedSettings.appVersion !== initialCMSState.settings.appVersion) {
                        console.warn(`[CMS] Versión en la nube obsoleta (${parsedSettings.appVersion} vs ${initialCMSState.settings.appVersion}). Reseteando a inicial.`);
                        setCmsState(initialCMSState);
                        return;
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
                        menus: (() => {
                            let parsedMenus = parsed.menus || initialCMSState.menus;
                            if (!parsedMenus.some(m => m.componentName === 'WasteToEnergyMenu')) {
                                const hasCompany = parsedMenus.find(m => m.componentName === 'CompanyMenu');
                                const companyOrder = hasCompany ? hasCompany.order : 5;
                                parsedMenus = [
                                    ...parsedMenus.filter(m => m.componentName !== 'CompanyMenu'),
                                    { id: '6', name: 'Waste to Energy', componentName: 'WasteToEnergyMenu', order: companyOrder },
                                    ...(hasCompany ? [{ ...hasCompany, order: companyOrder + 1 }] : [])
                                ].sort((a, b) => a.order - b.order);
                            }
                            return parsedMenus;
                        })(),
                        pages: parsed.pages || initialCMSState.pages
                    };
                    setCmsState(cloudState);
                }
            } else {
                console.warn("CMS state no encontrado en nube o error. Cóodigo:", res.status);
            }
        } catch (e) {
            console.error("No se pudo cargar el CMS desde la nube:", e);
        } finally {
            setIsLoadedFromCloud(true);
        }
    };

    useEffect(() => {
        // Prevenir que una recarga o el Hot-Reload local borre el trabajo no guardado del Editor.
        const saved = localStorage.getItem('smqCMS');
        if (!isEditorMode || !saved) {
            syncFromCloud();
        } else {
            console.log("LocalHost/Editor detectado: reteniendo cambios locales no subidos. Usa el botón 'Bajar' para forzar sincronización de Nube.");
            setIsLoadedFromCloud(true);
        }
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
            settings: { ...prev.settings, ...updates }
        }));
    };

    const updateMenus = (menus) => {
        setCmsState(prev => ({ ...prev, menus }));
    };

    const updatePages = (pages) => {
        setCmsState(prev => ({ ...prev, pages }));
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
                        title: pageId === 'wte' ? 'Waste to Energy' : pageId,
                        slug: pageId === 'wte' ? '/waste-to-energy' : `/${pageId}`,
                        modules: [{ id: moduleId, type: moduleId, data: newData }]
                    }
                ];
            }

            return { ...prev, pages: updatedPages };
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
