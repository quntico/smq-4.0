import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase.js';

const CMSContext = createContext();

const initialCMSState = {
    settings: {
        logoUrl: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1772916101912_LOGO%20ALUMINIO%20SMQ%20LIMPIO.png',
        faviconUrl: 'https://xbubebonbivunzrqeidg.supabase.co/storage/v1/object/public/media/1772938478587_FAVICON%20SMQ.png',
        logoSize: 75,
        headerHeight: 100,
        headerOpacity: 60,
    },
    menus: [
        { id: '1', name: 'Industrias', componentName: 'IndustriesMenu', order: 1 },
        { id: '2', name: 'Soluciones', componentName: 'SolutionsMenu', order: 2 },
        { id: '3', name: 'Maquinaria', componentName: 'MachineryMenu', order: 3 },
        { id: '4', name: 'Tecnología', componentName: 'TechnologyMenu', order: 4 },
        { id: '5', name: 'Empresa', componentName: 'CompanyMenu', order: 5 },
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
                }
            ]
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
                return {
                    settings: {
                        ...initialCMSState.settings,
                        ...parsedSettings,
                        // Forzar a usar las URLs predeterminadas si el usuario tenía "null" guardado en caché antiguo
                        logoUrl: parsedSettings.logoUrl || initialCMSState.settings.logoUrl,
                        faviconUrl: parsedSettings.faviconUrl || initialCMSState.settings.faviconUrl
                    },
                    menus: parsed.menus || initialCMSState.menus,
                    pages: parsed.pages || initialCMSState.pages
                };
            } catch (e) {
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
            // Agregar cache-busting time a la URL si fuera fetch directo, o confiar en Supabase lib
            const { data, error } = await supabase.storage.from('media').download('cms-state.json');
            if (data && !error) {
                const text = await data.text();
                const parsed = JSON.parse(text);
                const parsedSettings = parsed.settings || {};
                const cloudState = {
                    settings: {
                        ...initialCMSState.settings,
                        ...parsedSettings,
                        logoUrl: parsedSettings.logoUrl || initialCMSState.settings.logoUrl,
                        faviconUrl: parsedSettings.faviconUrl || initialCMSState.settings.faviconUrl
                    },
                    menus: parsed.menus || initialCMSState.menus,
                    pages: parsed.pages || initialCMSState.pages
                };
                setCmsState(cloudState);
            }
        } catch (e) {
            console.error("No se pudo cargar el CMS desde la nube:", e);
        } finally {
            setIsLoadedFromCloud(true);
        }
    };

    useEffect(() => {
        syncFromCloud();
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

        // Guardado en la Nube con "Debounce" (espera 2 segundos de inactividad para no saturar Supabase)
        if (isEditorMode && isLoadedFromCloud) {
            const uploadTimeout = setTimeout(async () => {
                try {
                    const content = JSON.stringify(cmsState);
                    await supabase.storage.from('media').upload('cms-state.json', content, {
                        contentType: 'application/json',
                        upsert: true
                    });
                    console.log("Cambios de diseño guardados en la Nube.");
                } catch (err) {
                    console.error("Error subiendo Cambios a la Nube", err);
                }
            }, 2500);

            return () => clearTimeout(uploadTimeout);
        }
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
            const pages = prev.pages.map(page => {
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
            return { ...prev, pages };
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
            syncFromCloud
        }}>
            {children}
        </CMSContext.Provider>
    );
};

export const useCMS = () => useContext(CMSContext);
