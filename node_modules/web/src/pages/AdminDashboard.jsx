
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { LayoutDashboard, FileText, Palette, Blocks, Image as ImageIcon, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ContentEditor from '@/components/admin/ContentEditor.jsx';
import DesignEditor from '@/components/admin/DesignEditor.jsx';
import ModulesEditor from '@/components/admin/ModulesEditor.jsx';
import MediaManager from '@/components/admin/MediaManager.jsx';
import SettingsEditor from '@/components/admin/SettingsEditor.jsx';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('contenido');
  const navigate = useNavigate();

  const menuItems = [
    { id: 'contenido', label: 'Contenido', icon: FileText },
    { id: 'diseno', label: 'Diseño', icon: Palette },
    { id: 'modulos', label: 'Módulos', icon: Blocks },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'contenido': return <ContentEditor />;
      case 'diseno': return <DesignEditor />;
      case 'modulos': return <ModulesEditor />;
      case 'media': return <MediaManager />;
      case 'configuracion': return <SettingsEditor />;
      default: return <ContentEditor />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Panel de Administración - SMQ</title>
      </Helmet>
      
      <div className="min-h-screen bg-[#0B0F14] flex pt-[100px]">
        {/* Sidebar */}
        <aside className="w-[250px] bg-[#0B0F14] border-r border-white/10 p-[20px] flex flex-col fixed h-[calc(100vh-100px)]">
          <div className="flex items-center gap-3 text-white mb-8 px-4">
            <LayoutDashboard className="text-[#0A84FF]" />
            <h1 className="font-bold text-lg">Admin Panel</h1>
          </div>
          
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[#0A84FF]/10 text-[#0A84FF]' 
                      : 'text-white hover:bg-white/5 hover:text-[#0A84FF]'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors mt-auto"
          >
            <LogOut size={20} />
            <span className="font-medium">Salir</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-[250px] p-10 text-white overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
