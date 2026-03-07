
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';
import { 
  LayoutDashboard, 
  FileText, 
  Palette, 
  Blocks, 
  Image as ImageIcon, 
  Settings, 
  LogOut 
} from 'lucide-react';

import ContentEditor from '@/components/admin/ContentEditor.jsx';
import DesignEditor from '@/components/admin/DesignEditor.jsx';
import ModulesEditor from '@/components/admin/ModulesEditor.jsx';
import MediaManager from '@/components/admin/MediaManager.jsx';
import SettingsEditor from '@/components/admin/SettingsEditor.jsx';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('content');
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'content': return <ContentEditor />;
      case 'design': return <DesignEditor />;
      case 'modules': return <ModulesEditor />;
      case 'media': return <MediaManager />;
      case 'settings': return <SettingsEditor />;
      default: return <ContentEditor />;
    }
  };

  const navItems = [
    { id: 'content', label: 'Contenido', icon: FileText },
    { id: 'design', label: 'Diseño', icon: Palette },
    { id: 'modules', label: 'Módulos', icon: Blocks },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14] flex font-['Poppins']">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1F2E] border-r border-white/5 flex flex-col fixed h-full">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3 text-white font-bold text-xl">
            <LayoutDashboard className="text-[#0A84FF]" />
            <span>Admin Panel</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[#0A84FF]/10 text-[#0A84FF]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
