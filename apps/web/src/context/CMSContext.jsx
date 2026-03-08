import React, { createContext, useContext, useState, useEffect } from 'react';

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

    useEffect(() => {
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
            setIsEditorMode
        }}>
            {children}
        </CMSContext.Provider>
    );
};

export const useCMS = () => useContext(CMSContext);
