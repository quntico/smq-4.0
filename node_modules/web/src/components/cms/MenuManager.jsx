import React, { useState } from 'react';
import { useCMS } from '@/context/CMSContext.jsx';

const componentOptions = [
    { id: 'IndustriesMenu', name: 'Menú de Industrias' },
    { id: 'SolutionsMenu', name: 'Menú de Soluciones' },
    { id: 'MachineryMenu', name: 'Menú de Maquinaria' },
    { id: 'TechnologyMenu', name: 'Menú de Tecnología' },
    { id: 'CompanyMenu', name: 'Menú de Empresa' },
    { id: 'none', name: 'Sin submenú (Solo Link)' }
];

const MenuManager = () => {
    const { cmsState, updateMenus } = useCMS();
    const menus = [...cmsState.menus].sort((a, b) => a.order - b.order);

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editComponent, setEditComponent] = useState('');

    const startEdit = (menu) => {
        setEditingId(menu.id);
        setEditName(menu.name);
        setEditComponent(menu.componentName || 'none');
    };

    const saveEdit = (id) => {
        const updated = menus.map(m => m.id === id ? { ...m, name: editName, componentName: editComponent === 'none' ? null : editComponent } : m);
        updateMenus(updated);
        setEditingId(null);
    };

    const deleteMenu = (id) => {
        if (confirm('¿Eliminar este menú?')) {
            const updated = menus.filter(m => m.id !== id);
            updateMenus(updated);
        }
    };

    const addMenu = () => {
        const newMenu = {
            id: Date.now().toString(),
            name: 'Nuevo Menú',
            componentName: null,
            order: menus.length > 0 ? Math.max(...menus.map(m => m.order)) + 1 : 1
        };
        updateMenus([...menus, newMenu]);
        startEdit(newMenu);
    };

    const moveUp = (index) => {
        if (index === 0) return;
        const newMenus = [...menus];
        [newMenus[index - 1].order, newMenus[index].order] = [newMenus[index].order, newMenus[index - 1].order];
        updateMenus(newMenus);
    };

    const moveDown = (index) => {
        if (index === menus.length - 1) return;
        const newMenus = [...menus];
        [newMenus[index + 1].order, newMenus[index].order] = [newMenus[index].order, newMenus[index + 1].order];
        updateMenus(newMenus);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-white">Administrador de Menús</h3>
                <button onClick={addMenu} className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Nuevo Menú
                </button>
            </div>

            <div className="space-y-3">
                {menus.map((menu, index) => (
                    <div key={menu.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 transition-all hover:bg-white/10">
                        {/* Controles de orden */}
                        <div className="flex flex-col gap-1 text-white/30">
                            <button onClick={() => moveUp(index)} disabled={index === 0} className="hover:text-white disabled:opacity-30"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"></polyline></svg></button>
                            <button onClick={() => moveDown(index)} disabled={index === menus.length - 1} className="hover:text-white disabled:opacity-30"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
                        </div>

                        {editingId === menu.id ? (
                            <div className="flex-1 flex gap-2">
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="flex-1 bg-black/50 border border-white/20 rounded px-3 py-1.5 text-white focus:outline-none focus:border-[#FFD700]"
                                    autoFocus
                                />
                                <select
                                    value={editComponent}
                                    onChange={(e) => setEditComponent(e.target.value)}
                                    className="bg-black/50 border border-white/20 rounded px-3 py-1.5 text-white/70 focus:outline-none focus:border-[#FFD700]"
                                >
                                    {componentOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
                                </select>
                                <button onClick={() => saveEdit(menu.id)} className="bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded hover:bg-blue-500/30">OK</button>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1">
                                    <h4 className="text-white font-medium">{menu.name}</h4>
                                    <p className="text-white/50 text-xs mt-1">Componente: {menu.componentName ? componentOptions.find(o => o.id === menu.componentName)?.name : 'Ninguno (Link)'}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button onClick={() => startEdit(menu)} className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                                    <button onClick={() => deleteMenu(menu.id)} className="p-2 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
                {menus.length === 0 && (
                    <div className="text-center py-8 text-white/50 border border-dashed border-white/20 rounded-xl">
                        No hay menús registrados. Crea el primero.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuManager;
