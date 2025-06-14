import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OfflineContextType {
  isOnline: boolean;
  isOfflineModeEnabled: boolean;
  cachedData: any;
  enableOfflineMode: () => void;
  cacheData: (key: string, data: any) => void;
  getCachedData: (key: string) => any;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineContextProvider');
  }
  return context;
};

interface OfflineContextProviderProps {
  children: ReactNode;
}

export const OfflineContextProvider: React.FC<OfflineContextProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isOfflineModeEnabled, setIsOfflineModeEnabled] = useState(true); // Always enabled
  const [cachedData, setCachedData] = useState(() => {
    const saved = localStorage.getItem('cachedData');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Auto-cache essential data on initialization
    cacheEssentialData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const enableOfflineMode = () => {
    setIsOfflineModeEnabled(true);
  };

  const cacheData = (key: string, data: any) => {
    const newCachedData = { ...cachedData, [key]: data };
    setCachedData(newCachedData);
    localStorage.setItem('cachedData', JSON.stringify(newCachedData));
  };

  const getCachedData = (key: string) => {
    return cachedData[key] || null;
  };

  const cacheEssentialData = () => {
    // Cache weather data
    cacheData('weather', {
      temperature: 28,
      humidity: 65,
      rainfall: 0,
      condition: 'Partly Cloudy',
      forecast: [
        { day: 'Today', temp: '28°C', condition: '🌤️' },
        { day: 'Tomorrow', temp: '30°C', condition: '☀️' },
        { day: 'Day 3', temp: '26°C', condition: '🌧️' }
      ]
    });

    // Cache market prices
    cacheData('marketPrices', {
      cotton: { price: '₹5,800/quintal', change: '+2.5%' },
      rice: { price: '₹2,100/quintal', change: '-1.2%' },
      turmeric: { price: '₹8,500/quintal', change: '+5.8%' },
      chili: { price: '₹12,000/quintal', change: '+3.2%' }
    });

    // Cache farming tips
    cacheData('farmingTips', [
      'Check soil moisture before watering',
      'Monitor weather for pest activity',
      'Regular inspection of crop health',
      'Proper storage techniques for harvest'
    ]);
  };

  return (
    <OfflineContext.Provider 
      value={{ 
        isOnline, 
        isOfflineModeEnabled, 
        cachedData, 
        enableOfflineMode, 
        cacheData, 
        getCachedData 
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};