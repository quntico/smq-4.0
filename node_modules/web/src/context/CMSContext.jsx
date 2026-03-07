import React, { createContext, useContext, useState, useEffect } from 'react';

const CMSContext = createContext();

const initialCMSState = {
    settings: {
        logoUrl: null,
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
                return {
                    settings: { ...initialCMSState.settings, ...(parsed.settings || {}) },
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
                    const modules = page.modules.map(mod => {
                        if (mod.id === moduleId) {
                            return { ...mod, data: { ...mod.data, ...newData } };
                        }
                        return mod;
                    });
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
