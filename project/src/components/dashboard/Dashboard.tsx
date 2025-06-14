import React, { useState } from 'react';
import Sidebar from './Sidebar';
import WeatherTab from './tabs/WeatherTab';
import CropsTab from './tabs/CropsTab';
import MarketPricesTab from './tabs/MarketPricesTab';
import NewsTab from './tabs/NewsTab';
import FarmingToolsTab from './tabs/FarmingToolsTab';
import SettingsTab from './tabs/SettingsTab';
import ProfileTab from './tabs/ProfileTab';
import AIAssistant from './AIAssistant';
import Header from './Header';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('weather');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'weather':
        return <WeatherTab />;
      case 'crops':
        return <CropsTab />;
      case 'market':
        return <MarketPricesTab />;
      case 'news':
        return <NewsTab />;
      case 'tools':
        return <FarmingToolsTab />;
      case 'settings':
        return <SettingsTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <WeatherTab />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {renderActiveTab()}
        </main>
      </div>
      <AIAssistant />
    </div>
  );
};

export default Dashboard;