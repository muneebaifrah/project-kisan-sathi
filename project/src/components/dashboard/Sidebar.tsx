import React from 'react';
import { Cloud, Wheat, TrendingUp, Newspaper, Wrench, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'weather', icon: Cloud, label: 'Weather', emoji: '🌤️' },
    { id: 'crops', icon: Wheat, label: 'Crops', emoji: '🌾' },
    { id: 'market', icon: TrendingUp, label: 'Market Prices', emoji: '💰' },
    { id: 'news', icon: Newspaper, label: 'Agri News', emoji: '📰' },
    { id: 'tools', icon: Wrench, label: 'Farming Tools', emoji: '🔧' },
    { id: 'settings', icon: Settings, label: 'Settings', emoji: '⚙️' },
    { id: 'profile', icon: User, label: 'My Profile', emoji: '👤' },
  ];

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🌱</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">कृषि सहायक</h2>
            <p className="text-xs text-gray-600">Agricultural Assistant</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-green-100 text-green-800 shadow-sm border-l-4 border-green-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{item.label}</div>
                </div>
                <item.icon className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-4 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <span className="text-2xl">🚪</span>
          <span className="font-medium">Logout</span>
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;