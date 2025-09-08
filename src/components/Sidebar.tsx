import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  FolderOpen, 
  Settings, 
  LogOut,
  Building2,
  Calculator
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Utilizatori', icon: Users },
    { id: 'tasks', label: 'Sarcini', icon: CheckSquare },
    { id: 'projects', label: 'Proiecte', icon: FolderOpen },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'settings', label: 'Setări', icon: Settings },
  ];

  return (
    <div className="bg-slate-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <Building2 className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold">ManageApp</h1>
            <p className="text-slate-400 text-sm">Sistem de Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Deconectare</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;